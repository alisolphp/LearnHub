# System Design Mock Interview: System Design Interview - Distributed Message Queue
* Design Distributed Message Queue like Kafka *

**Channel/Interviewer**: System Design Interview  
**Duration**: 00:26:27  
**Original Video**: https://www.youtube.com/watch?v=iJLL-KPqBpM  

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.*

## One-Page Executive Summary (2–3 min skim)

* **Problem Prompt (One-liner)**: Design a distributed message queue that enables asynchronous communication between producers and consumers, where messages are delivered to exactly one consumer.
* **Primary Scope**: Focus on core APIs like send and receive messages; in-scope includes handling scalability, availability, performance, and durability; out-of-scope includes advanced features like delete message API unless specified.
* **Non-Functional Priorities**: Scalability to handle load increases, high availability to tolerate hardware/network failures, high performance for fast send/receive operations, and durability to persist submitted data.
* **Key Constraints & Numbers**: Not stated in video.
* **High-Level Architecture (Text)**: 
  - Clients connect via VIP to load balancers.
  - Load balancers route to FrontEnd web service for validation, auth, encryption, caching, throttling, and dispatching.
  - Metadata service (caching layer over database) stores queue info like name, creation date, and config.
  - Backend service handles message persistence, replication, and retrieval across distributed hosts.
  - In-cluster or out-cluster managers manage leader elections or queue-to-cluster assignments.
  - Components are deployed across multiple data centers for redundancy.
* **Top Trade-offs**:
  - Synchronous vs. asynchronous communication: Sync is simpler but harder for failures; async decouples services but adds complexity.
  - Leader-based vs. leaderless backend: Leader simplifies coordination but requires election; leaderless uses clusters but needs queue partitioning.
  - Synchronous vs. asynchronous replication: Sync offers higher durability but increases latency; async is faster but risks data loss.
  - Pull vs. push model: Pull is easier to implement but requires consumer polling; push notifies but is more complex.
  - FIFO ordering: Strict order limits throughput due to coordination; relaxed order improves performance.
  - Message deletion: Immediate delete vs. delayed (e.g., via visibility timeout) balances simplicity and at-least-once delivery.
* **Biggest Risks/Failure Modes**:
  - Load balancer as single point of failure: Mitigated by primary/secondary nodes and VIP partitioning.
  - Backend host failures leading to data loss: Addressed via replication and multi-data-center deployment.
  - High latency from replication or throttling: Balanced by async options and rate limiting.
  - Duplicate messages in at-least-once semantics: Handled by request deduplication and idempotency.
  - Overloaded clusters or queues: Managed by partitioning and monitoring utilization.
  - Network partitions: Tolerated through redundancy but may affect consistency.
* **5-Min Review Flashcards**:
  - Q: What distinguishes a queue from a topic? → A: Queue delivers to one consumer; topic to all subscribers.
  - Q: Core non-functional requirements? → A: Scalable, highly available, performant, durable.
  - Q: Role of FrontEnd service? → A: Handles validation, auth, encryption, caching, throttling, dispatching.
  - Q: How to store messages? → A: In memory for recent, on disk for durability; replicated across hosts.
  - Q: Leader election purpose? → A: Designates host for handling queue requests and replication.
  - Q: Synchronous replication pros/cons? → A: High durability but higher latency.
  - Q: Asynchronous replication pros/cons? → A: Lower latency but potential data loss on failure.
  - Q: Delivery guarantees? → A: At-most-once (may lose), at-least-once (may duplicate), exactly-once (hard to achieve).
  - Q: Pull vs. push model? → A: Pull polls; push notifies.
  - Q: FIFO challenges? → A: Hard in distributed systems; limits throughput.
  - Q: Monitoring importance? → A: Track service health and queue states for alerts and dashboards.
  - Q: Scalability approach? → A: Add hosts, shards, clusters; partition large queues.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue)

## Interview Tags (for later filtering)

* **Domain/Industry**: messaging
* **Product Pattern**: queue
* **System Concerns**: high-availability, low-latency, eventual-consistency, geo-replication, backpressure, throttling, autoscaling, multi-tenancy
* **Infra/Tech (only if mentioned)**: microservices, rest, kafka, redis, memcached

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue)

## Problem Understanding

* **Original Prompt**: Design a distributed message queue.
* **Use Cases**: Primary: Asynchronous communication between producer and consumer services to decouple them and handle failures; secondary: Support for scalability under high load, data persistence, and potential extensions like queue creation/deletion.
* **Out of Scope**: Specific SLAs, cost-effectiveness, duplicate prevention unless required, security details beyond basics, strict ordering guarantees.
* **APIs (if discussed)**: Send message (producer submits data); receive message (consumer retrieves data); potential create/delete queue, delete message.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue)

## Requirements & Constraints

Separate **Given in Video** vs **Assumptions** (conservative, justified).

* **Functional Requirements**
  - Given in Video: Send message (producer to queue), receive message (queue to one consumer); distinguish from topics (one-to-many).
  - Assumptions: Support queue creation; potential delete queue/message; no duplicates if exactly-once semantics required.
* **Non-Functional Requirements**: 
  - Given in Video: Scalability for load increases; high availability for hardware/network failures; high performance for low-latency send/receive; durability for persisted data.
  - Assumptions: At-least-once delivery as balance; pull model for simplicity.
* **Capacity Inputs** (only if stated): Not stated in video.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue)

## Back-of-the-Envelope Estimation (only if numbers exist)

*“Not stated in video—skipping numerical estimation.”*

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue)

## High-Level Architecture

Textual, diagram-like bullets based strictly on the video:

* Client entry via VIP (symbolic hostname) resolving to load balancers for request routing.
* Load balancers (with primary/secondary for HA, VIP partitioning for scale) distribute to FrontEnd web service.
* FrontEnd (stateless, multi-DC): Validates requests, handles auth/authz, TLS termination, server-side encryption, caching (queue metadata/user info), rate limiting (e.g., leaky bucket), dispatching to backend/metadata, deduplication, usage collection.
* Metadata service (caching facade over DB): Stores queue info (name, creation, config); handles high reads/low writes; options: full replication per node, sharded with direct access, or sharded with forwarding.
* Backend service: Persists messages (memory for recent, disk for durability); replicates data; two options: leader-based (with in-cluster manager for elections) or cluster-based (with out-cluster manager for assignments).
* Async components: Replication (sync/async); message cleanup (delayed jobs or visibility timeouts).
* Observability: Metrics/logs from services for dashboards/alerts; customer queue monitoring.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue)

## Deep Dives by Subsystem (repeat as needed)

## Subsystem: FrontEnd Web Service

* **Role & Responsibilities**: Initial request processing: validation (params/constraints), auth/authz, TLS termination (via proxy), server-side encryption, caching, rate limiting, dispatching to metadata/backend, deduplication (via cache), usage collection.
* **Data Model (from video only)**: Not stated in video.
* **APIs/Contracts**: Send/receive message dispatching.
* **Scaling & Partitioning**: Stateless hosts across data centers; add more for load.
* **Caching Strategy**: Queue metadata and user info; saves DB calls.
* **Consistency Model**: Not strictly required for metadata.
* **Bottlenecks & Hot Keys** + mitigations: Slow remote calls isolated via bulkhead/circuit breakers.
* **Failure Handling**: Retries, deduplication for failed responses.
* **Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - FrontEnd Web Service](https://alisol.ir/?ai=Subsystem%20-%20FrontEnd%20Web%20Service%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue)

## Subsystem: Metadata Service

* **Role & Responsibilities**: Caching layer for queue metadata (name, creation, config) between FrontEnd and DB; high reads, low writes.
* **Data Model (from video only)**: Queue name, creation date/time, owner, config settings.
* **APIs/Contracts**: Query for queue leader/cluster.
* **Scaling & Partitioning**: Full data per node (small cache), or sharded (consistent hashing ring).
* **Caching Strategy**: In-memory shards; prefer strong consistency but not required.
* **Consistency Model**: Strongly consistent preferred to avoid concurrent updates.
* **Bottlenecks & Hot Keys** + mitigations: Load balancer for equal nodes; sharding for large data.
* **Failure Handling**: Replicated across nodes.
* **Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Metadata Service](https://alisol.ir/?ai=Subsystem%20-%20Metadata%20Service%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue)

## Subsystem: Backend Service

* **Role & Responsibilities**: Message persistence (memory/disk), replication, retrieval, cleanup.
* **Data Model (from video only)**: Messages with offsets; queues partitioned for large ones.
* **APIs/Contracts**: Store/retrieve messages.
* **Scaling & Partitioning**: Leader-based (per queue/partition) or cluster-based (3-4 nodes per cluster, queues assigned/split).
* **Caching Strategy**: Not stated in video.
* **Consistency Model**: Depends on replication (sync for durability).
* **Bottlenecks & Hot Keys** + mitigations: Large queues partitioned; overheated clusters avoided.
* **Failure Handling**: Replication (sync/async); leader election or random node selection.
* **Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Backend Service](https://alisol.ir/?ai=Subsystem%20-%20Backend%20Service%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue)

## Trade-offs & Alternatives

| Topic                                             | Option A | Option B | Video’s Leaning | Rationale (from video) |
| ------------------------------------------------- | -------- | -------- | --------------- | ---------------------- |
| Communication Style | Synchronous | Asynchronous | Asynchronous | Async decouples services, easier failure handling. |
| Backend Organization | Leader-based (in-cluster manager) | Leaderless (out-cluster manager) | Both viable | Leader simplifies but needs election; leaderless avoids election but manages clusters. |
| Data Replication | Synchronous | Asynchronous | Depends on needs | Sync for durability; async for performance. |
| Message Delivery | At-most-once | At-least-once | At-least-once | Balances durability/performance; exactly-once hard due to failures. |
| Consumer Model | Pull | Push | Pull | Easier to implement. |
| Message Ordering | Strict FIFO | Relaxed | Relaxed | Strict limits throughput in distributed systems. |
| Message Deletion | Immediate | Delayed (e.g., visibility timeout) | Delayed | Supports at-least-once; prevents duplicates. |
| Storage | Database | File system + memory | File system + memory | Better for high throughput than offloading to DB. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue)

## Reliability, Availability, and Performance

* Replication/quorum/consistency: Data replicated sync/async across hosts/clusters; no quorum mentioned.
* Latency budget across tiers: Higher for sync replication; FrontEnd keeps simple for speed.
* Backpressure & throttling: Rate limiting (leaky bucket) protects from overload.
* Load shedding & degradation: Circuit breakers isolate failures.
* Disaster recovery (RPO/RTO if stated): Not stated in video; redundancy across DCs for HA.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue)

## Security & Privacy (if discussed)

* AuthN/AuthZ: FrontEnd verifies registered users and queue access.
* PII handling: Not stated in video.
* Encryption: TLS for transit; server-side for storage.
* Abuse prevention: Rate limiting, validation.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue)

## Observability (if discussed)

* Metrics, logs, tracing: Each service emits for dashboards/alerts.
* SLO/SLA, alerting: Monitor health and queue states; customer integration.
* Canaries: Not stated in video.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue)

## Follow-up Questions (from interviewer, if any)

Not stated in video.

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue)

## Candidate Questions (if modeled in video)

* What are the expected throughput and latency SLAs?
* Should we support exactly-once delivery?
* Any requirements for message ordering or retention periods?
* How to handle very large queues or messages?

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue)

## Key Takeaways

* Clarify ambiguous requirements early, focusing on core send/receive APIs.
* Use standard distributed patterns: VIP + LB + FrontEnd + Metadata + Backend.
* FrontEnd handles common web tasks to keep backend focused on storage/replication.
* Backend options trade coordination complexity for simplicity (leader vs. clusters).
* Replication choices balance durability and performance.
* Delivery semantics: At-least-once is practical; exactly-once is challenging.
* Pull model simpler than push; relaxed FIFO for better throughput.
* Queue creation via API for control; deletion cautious to avoid harm.
* Monitor everything: Services and customer queues for reliability.
* System is scalable/available via horizontal adds and multi-DC.
* Avoid databases for core storage; prefer file system for high throughput.
* Always consider failures: Replicas, isolations, deduplication.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue)

## Glossary (terms used in the video)

* Distributed Message Queue: Component for asynchronous one-to-one communication across machines.
* VIP: Virtual IP, symbolic hostname resolving to load balancer.
* Load Balancer: Routes requests across servers; uses primary/secondary for HA.
* FrontEnd Service: Handles initial processing like validation, auth, encryption.
* Metadata Service: Caches queue info over DB.
* Backend Service: Persists and replicates messages.
* Leader Election: Assigns primary host for queue handling.
* Replication: Copies data for durability (sync/async).
* Delivery Semantics: Guarantees like at-least-once.
* Pull/Push Model: Consumer polls or gets notified.
* FIFO: First-in, first-out ordering.
* Rate Limiting: Controls request volume (e.g., leaky bucket).

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue)

## Attribution

* Source Video: https://www.youtube.com/watch?v=iJLL-KPqBpM
* Channel: System Design Interview
* Note: This document is a summary of the linked mock interview.

## About the summarizer

I'm *Ali Sol*, a PHP Developer. Learn more:

* Website: [alisol.ir](https://alisol.ir)
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
