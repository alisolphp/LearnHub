# System Design Mock Interview: Design Distributed Locking Service | With Ex-Google SWE

- **Channel/Interviewer**: Jordan has no life
- **Duration**: 00:28:14
- **Original Video**: https://www.youtube.com/watch?v=Lp8oITg0MiI

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.*

---

# One-Page Executive Summary

- **Problem Prompt (One-liner)**: Design a distributed locking service that ensures mutual exclusion across multiple nodes, even in the presence of hardware failures.
- **Primary Scope**: Building a fault-tolerant lock for coordinating access to shared resources like S3 files; focuses on consistency, replication, and failure handling. Out-of-scope: Detailed capacity planning beyond abstract handling of up to 100 nodes.
- **Non-Functional Priorities**: Strong consistency, fault tolerance, low load on the system; no specific latency or cost targets stated.
- **Key Constraints & Numbers**: Up to 100 nodes potentially competing for a lock; no QPS, data sizes, or regions specified.
- **High-Level Architecture (Text)**:
  - Clients connect via WebSocket to a distributed consensus cluster (e.g., Raft-based) for lock acquisition and heartbeats.
  - Leader node handles proposals, replicates to followers for majority approval.
  - Use fencing tokens (monotonically increasing sequences) to prevent stale writes.
  - Queue waiting clients to avoid thundering herd; notify next in line on release.
  - In-memory hashmap for fast lock state reads, backed by distributed log.
  - Expire locks via TTL and heartbeats for failure recovery.
- **Top Trade-offs**:
  - Strong consistency requires consensus, trading off some performance for correctness.
  - Single-leader replication risks data loss on failover; multi-leader quorums risk stale reads or failed rollbacks.
  - Synchronous replication blocks on all nodes, reducing availability; asynchronous allows progress but risks inconsistency.
  - Larger cluster size increases fault tolerance but slows operations.
  - Polling vs. push notifications: Polling adds load; push (WebSocket) is efficient but requires persistent connections.
- **Biggest Risks/Failure Modes**:
  - Stale reads allowing multiple lock holders, corrupting shared resources.
  - Garbage collection pauses or node failures leading to premature lock expiration.
  - Failover in single-leader setups losing un-replicated writes, duplicating fencing tokens.
  - Thundering herd from simultaneous notifications overwhelming the system.
  - Network partitions causing split-brain or unresolvable quorums.
  - Lack of heartbeats falsely expiring active locks.
- **5-Min Review Flashcards**:
  - Q: What is a distributed lock? A: A mechanism for mutual exclusion across multiple nodes to prevent concurrent access to shared resources.
  - Q: Why strong consistency? A: To avoid stale reads where multiple nodes think they hold the lock.
  - Q: What are fencing tokens? A: Monotonically increasing sequences assigned to lock grabs to reject stale writes.
  - Q: Why not single-leader async replication? A: Risk of lost writes during failover, leading to duplicate tokens.
  - Q: Why not full synchronous replication? A: No fault tolerance; single node failure blocks all writes.
  - Q: Are quorums strongly consistent? A: No, they can fail to rollback partial writes or lack linearizability.
  - Q: How does Raft ensure no lost writes? A: Leader election favors nodes with the most up-to-date logs from prior epoch.
  - Q: How to avoid thundering herd? A: Queue waiting clients and notify only the next one on release.
  - Q: Why WebSockets? A: For efficient heartbeats and push notifications without repeated HTTP overhead.
  - Q: What backs the lock state? A: Distributed log for persistence, in-memory hashmap for fast reads.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE)

---

# Interview Tags

- **Domain/Industry**: Not stated in video
- **Product Pattern**: Not stated in video
- **System Concerns**: high-availability, eventual-consistency
- **Infra/Tech (only if mentioned)**: websocket, cassandra

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE)

---

# Problem Understanding

- **Original Prompt**: Design a distributed locking service.
- **Use Cases**: Primary: Ensure only one node accesses a shared resource (e.g., writing to an S3 file) at a time to prevent corruption. Secondary: Handle up to 100 nodes competing for the lock.
- **Out of Scope**: Not stated in video.
- **APIs (if discussed)**: “Not stated in video”

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE)

---

# Requirements & Constraints

- **Functional Requirements**:
  - Acquire and release locks with mutual exclusion.
  - Assign fencing tokens to prevent stale writes.
  - Queue and notify waiting clients.
  - Heartbeat to detect failures and expire locks via TTL.
- **Non-Functional Requirements**: Strong (linearizable) consistency to avoid multiple holders; fault tolerance against node failures; minimize load from polling.
- **Capacity Inputs**: Abstract handling for up to 100 concurrent nodes; no QPS, read/write mix, or other metrics stated.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE)

---

# Back-of-the-Envelope Estimation

*“Not stated in video—skipping numerical estimation.”*

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE)

---

# High-Level Architecture

- Clients establish WebSocket connections to the locking service for requests, heartbeats, and notifications.
- Service uses a distributed consensus cluster (e.g., 3-5 nodes with Raft) where the leader handles lock proposals.
- Proposals replicate to followers; majority approval commits the lock to the distributed log.
- In-memory hashmap maintains current lock states for quick reads.
- Fencing tokens (increasing sequences) are assigned on acquisition.
- Waiting clients are queued per lock; only the next is notified on release to avoid overload.
- Heartbeats over WebSocket detect failures; TTL expires dead locks.
- On write to shared resource (e.g., S3), include token; reject lower tokens.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE)

---

# Deep Dives by Subsystem

## Subsystem: Consistency and Replication

- **Role & Responsibilities**: Ensure strong consistency and fault tolerance for lock states across nodes.
- **Data Model (from video only)**: Distributed log for lock events (acquire/release); in-memory hashmap for current states.
- **APIs/Contracts**: Not stated in video.
- **Scaling & Partitioning**: Cluster size 3-5 nodes; larger for more tolerance, but slower.
- **Caching Strategy**: In-memory hashmap with log as backing store; no TTL mentioned for cache.
- **Consistency Model**: Strong/linearizable via consensus.
- **Bottlenecks & Hot Keys** + mitigations: High contention on popular locks; mitigated by queuing and push notifications.
- **Failure Handling**: Majority quorum for commits; leader election favors up-to-date logs; TTL and heartbeats for expiration.
- **Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Consistency and Replication](https://alisol.ir/?ai=Subsystem%20-%20Consistency%20and%20Replication%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE)

## Subsystem: Client Interaction

- **Role & Responsibilities**: Handle lock requests, queuing, notifications, and heartbeats.
- **Data Model (from video only)**: Queue per lock for waiting clients.
- **APIs/Contracts**: Not stated in video.
- **Scaling & Partitioning**: Not stated in video.
- **Caching Strategy**: Not stated in video.
- **Consistency Model**: Not applicable.
- **Bottlenecks & Hot Keys** + mitigations: Thundering herd on release; mitigated by notifying only next in queue.
- **Failure Handling**: WebSocket for persistent connections; expire on missed heartbeats.
- **Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Client Interaction](https://alisol.ir/?ai=Subsystem%20-%20Client%20Interaction%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE)

## Subsystem: Fencing Tokens

- **Role & Responsibilities**: Prevent stale or expired lock holders from writing to shared resources.
- **Data Model (from video only)**: Monotonically increasing integer per lock grab.
- **APIs/Contracts**: Include token in writes to resources like S3.
- **Scaling & Partitioning**: Not stated in video.
- **Caching Strategy**: Not stated in video.
- **Consistency Model**: Linearizable via consensus.
- **Bottlenecks & Hot Keys** + mitigations: Not stated in video.
- **Failure Handling**: Resource rejects writes with lower tokens.
- **Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Fencing Tokens](https://alisol.ir/?ai=Subsystem%20-%20Fencing%20Tokens%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE)

---

# Trade-offs & Alternatives

- Strong vs. eventual consistency: Strong needed to prevent multiple holders, but requires consensus overhead.
- Single-leader async replication: Simple but risks lost writes on failover.
- Full synchronous replication: Fault-intolerant as single failure blocks writes.
- Quorum-based (leaderless): Appears consistent but vulnerable to partial write failures and non-linearizable.
- Polling vs. push: Polling loads system; push (WebSocket/long-poll) efficient for notifications and heartbeats.
- Cluster size: Smaller is faster; larger tolerates more failures.

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE)

---

# Reliability, Availability, and Performance

- Replication/quorum/consistency: Raft-style consensus with majority quorum for writes; linearizable reads/writes.
- Latency budget across tiers: Not stated in video.
- Backpressure & throttling: Queueing to manage contention; no explicit throttling.
- Load shedding & degradation: Not stated in video.
- Disaster recovery (RPO/RTO if stated): Distributed log ensures no committed writes lost; leader election recovers from failures.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE)

---

# Security & Privacy

Not stated in video.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE)

---

# Observability

Not stated in video.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE)

---

# Follow-up Questions

Not stated in video.

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE)

---

# Candidate Questions

Not stated in video.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE)

---

# Key Takeaways

- Distributed locks require strong consistency to prevent multiple holders corrupting shared resources.
- Fencing tokens ensure expired locks cannot write by rejecting lower sequences.
- Single-leader async replication fails on failover due to potential lost writes.
- Synchronous replication lacks fault tolerance as it blocks on all nodes.
- Quorums are not truly strongly consistent due to rollback issues and non-linearizability.
- Use distributed consensus like Raft for linearizable, fault-tolerant storage.
- Backfill logs in Raft ensure new leaders have all committed writes.
- Queue waiting clients and use push notifications to avoid thundering herd.
- WebSockets enable efficient heartbeats for failure detection without polling overhead.
- Always include TTL on locks to handle permanent client failures.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE)

---

# Glossary

- **Distributed Lock**: Mechanism for mutual exclusion across multiple physical nodes.
- **Fencing Token**: Increasing sequence number to validate current lock holder.
- **Linearizability**: Consistency model ensuring a single, cohesive ordering of operations.
- **Quorum**: Majority agreement for reads/writes in replicated systems.
- **Raft**: Consensus algorithm for fault-tolerant, linearizable replication.
- **Thundering Herd**: Simultaneous rushes causing overload, e.g., on lock release.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE)

---

# Attribution

- Source Video: https://www.youtube.com/watch?v=Lp8oITg0MiI
- Channel: Jordan has no life
- Note: This document is a summary of the linked mock interview.

---

# About the summarizer

I'm *Ali Sol*, a PHP Developer. Learn more:

- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
