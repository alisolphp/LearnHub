# System Design Mock Interview: Design Distributed Key-Value Store
- **Channel/Interviewer**: Tushar Roy - Coding Made Simple  
- **Duration**: 00:40:51  
- **Original Video**: https://www.youtube.com/watch?v=rnZmdmlR-2M

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.*

---

## One-Page Executive Summary (2–3 min skim)

**Problem Prompt (One-liner)**  
Design a horizontally scalable, strongly consistent distributed key–value database that supports basic table and key operations.

**Primary Scope**  
- In-scope: durability first, then availability over performance; strong consistency; leader-based replication; partitioning/splitting hot tables; metadata service; request routing; append-only log + index store; read/write paths; control-plane operations (leader election, node replacement, live splitting/migration); failure modes.  
- Out-of-scope: full ACID transactions (no multi-key atomicity or isolation), table/row locks, deep security design (assume client-side encryption), cross–data center performance tuning details.

**Non-Functional Priorities**  
1) Durability → 2) Availability → 3) Performance. Strong consistency over availability when partitions occur.

**Key Constraints & Numbers (as stated)**  
- Replication groups of 3 (or 5) nodes with a single leader.  
- Node capacity example: ~5 TB per node; 100 replication groups ≈ ~5 PB logical data (since replicas store identical copies).  
- Key size guideline: ~30 bytes metadata (includes a 16-byte sequencer).  
- Value size cap example: 1 MB (larger objects should go to blob storage).  
- Throughput example: ~2,000 IOPS per replication group (illustrative).  
- Sequencer: 16 bytes (timestamp ns, per-node counter, node id); “last write wins.”  

**High-Level Architecture (Text)**  
- **Load Balancer → Request Managers** (stateless): route ops using cached metadata.  
- **Metadata Manager** (consensus-backed): leader election per replication group; mapping from table ranges to replication groups.  
- **Replication Groups (3 or 5 nodes)**: one leader, two/four followers; quorum writes; followers tail leader.  
- **Node Storage Engine**: append-only log (durability) + in-memory + on-disk index (B+ tree or LSM-tree).  
- **Controller**: health checks; replaces lagging nodes; splits hot/large tables and orchestrates live migration.  
- **Clients**: basic CRUD-like API for tables/keys and ranged iteration.

**Top Trade-offs**  
- Strong consistency vs availability during partitions (choose consistency).  
- B+ tree (read-friendly) vs LSM-tree (write-heavy). [Personal note: LSM-tree engines remain the norm for write-heavy KV stores in 2025 due to better write amplification characteristics for sequential logging.]  
- 3 replicas (lower cost) vs 5 (higher durability/availability).  
- Single-leader simplicity vs multi-leader complexity and potential availability gains.

**Biggest Risks/Failure Modes**  
- Split brain (two leaders) → mitigated by majority acknowledgment and leader confirmation.  
- Leader unavailability window during re-election.  
- Metadata manager network splits causing stale routing at request managers → replication groups reject misrouted ops; request managers refresh metadata.  
- Lagging followers → controller replaces unhealthy nodes.  
- Live table splits → dual-read phase until migration finishes (sequencer resolves conflicts).

**5-Min Review Flashcards**  
- Q: What is prioritized: durability, availability, or performance?  
  A: Durability → Availability → Performance.  
- Q: Why a single leader per replication group?  
  A: To provide strong consistency; all reads/writes go through the leader.  
- Q: When is a write acknowledged?  
  A: After the leader and at least one follower (majority) persist to their logs.  
- Q: What resolves concurrent writes to the same key?  
  A: A 16-byte monotonically increasing sequencer; higher wins (“last write wins”).  
- Q: Why append-only log?  
  A: Durable sequential writes; on reboot you can replay into the index.  
- Q: How are hot tables handled?  
  A: Controller splits table ranges across groups; dual reads during migration; sequencer reconciles.  
- Q: What protects against two leaders acting at once?  
  A: New leader must gain majority acceptance; followers only accept from the recognized leader.  
- Q: What if metadata is stale at a request manager?  
  A: Replication group rejects; RM refreshes metadata and retries to the correct leader.  
- Q: B+ tree vs LSM-tree?  
  A: B+ for read-heavy, LSM for write-heavy. [Personal note: Defaulting to LSM-based engines is common for modern distributed KV stores.]  
- Q: Why cap value size at ~1 MB?  
  A: Large blobs belong in blob/object storage to avoid hot partitions and heavy I/O.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

---

## Interview Tags (for later filtering)

- **Domain/Industry**: `storage`  
- **Product Pattern**: `caching` *(as a KV core use case)*  
- **System Concerns**: `high-availability`, `hot-key`  
- **Infra/Tech (mentioned)**: `cassandra`  
[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

---

## Problem Understanding

**Original Prompt**  
Design a distributed KV database emphasizing strong consistency, durability, and scalable partitioning.

**Use Cases**  
- Store and retrieve key→value pairs in tables.  
- Sorted list/scan of keys within a table (with pagination).  
- Robustness under node failures, hot partitions, and leader changes.

**Out of Scope**  
- Multi-key transactions, table/row-level locking, deep security specifics (assume client-side encryption before sending).

**APIs (discussed at a high level)**  
- Create/Delete table; Put/Get/Delete key; List/Scan (sorted keys) with pagination. Exact request/response schemas are not specified → **Not stated in video**.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

---

## Requirements & Constraints

**Given in Video**  
- Strong consistency via single-leader per replication group; quorum write ack.  
- Durability via append-only logs; indices rebuilt if needed.  
- Availability favored over performance but below durability; temporary unavailability during leader election acceptable.  
- Metadata manager for (range → group) mapping and leader tracking.  
- Controller for node replacement and range splitting/migration.  
- Value size cap (~1 MB); suggest blob storage for larger.  
- Key metadata includes a 16-byte sequencer (ns timestamp, per-node counter, node id).  
- Request managers cache metadata; refresh on rejection.

**Assumptions**  
- Client libraries handle retries/idempotency for write timeouts.  
- Metrics/alerts exist for lagging followers and migration progress.  
- Single region by default; cross-DC adds latency trade-offs.

[Ask AI: Requirements and Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

---

## Back-of-the-Envelope Estimation

*Not stated in video—skipping numerical estimation.*

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

---

## High-Level Architecture

- **Client → Load Balancer → Request Manager (RM)**: RM uses cached metadata to locate the correct replication group and leader for the requested key range. On cache miss or rejection, RM consults metadata manager and updates its view.  
- **Metadata Manager**: Small, highly consistent store (consensus-backed). Tracks leaders and range ownership; pushes updates to RMs; frequently backed up.  
  - Options named: ZooKeeper / etcd / custom Raft/Paxos implementation. [Personal note: Likely outdated; prefer mature, managed Raft-based coordination (e.g., etcd/Consul) over ZooKeeper in 2025—verify for your stack.]  
- **Replication Groups (RG)**: 3 or 5 nodes; one leader handles all reads/writes; followers replicate from leader; majority quorum for writes.  
- **Storage Engine per Node**: append-only log for durability; index via B+ tree (read-optimized) or LSM-tree (write-optimized). [Personal note: LSM-based engines are common for high-ingest KV stores; choose based on your read/write mix.]  
- **Controller**: monitors I/O and size; replaces lagging nodes; triggers and orchestrates live range splits with dual-read reconciliation until migration completes.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

---

## Deep Dives by Subsystem

### Subsystem: Metadata Manager
- **Role**: Leader election for each RG; mapping of (table, key-range) → RG; disseminate updates to RMs; frequent backups.  
- **Data Model**: Records for tables, ranges (e.g., `[A,C)`, `[C,L)`), RG ids, and current leader per RG.  
- **Scaling/Consistency**: Highly consistent, small dataset; consensus-based majority writes.  
- **Failures**: Network partition → minority side stale; RMs connected to minority may misroute, but RG rejects and forces refresh.  
[Ask AI: Subsystem - Metadata Manager](https://alisol.ir/?ai=Subsystem%20-%20Metadata%20Manager%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

### Subsystem: Replication Group (Leader/Follower)
- **Role**: Owns table ranges; handles Get/Put/Delete/List through a single leader.  
- **Write Path**: Leader appends to its log → replicates to followers → on majority ack (incl. leader) → success.  
- **Read Path**: Routed to leader for strongly consistent view.  
- **Failure Handling**: If leader fails, metadata manager elects a new leader; new leader must be accepted by majority followers; followers accept writes only from recognized leader (prevents split brain).  
[Ask AI: Subsystem - Replication Group](https://alisol.ir/?ai=Subsystem%20-%20Replication%20Group%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

### Subsystem: Request Manager (Frontdoor)
- **Role**: Stateless router with an in-memory view of metadata; retries on rejection; streams list/scan results with pagination.  
- **Dual Reads During Migration**: When a range is being moved, RM queries both source and destination RGs and reconciles via the sequencer (higher wins).  
[Ask AI: Subsystem - Request Manager](https://alisol.ir/?ai=Subsystem%20-%20Request%20Manager%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

### Subsystem: Controller (Control Plane)
- **Role**: Monitors health and lag; replaces falling-behind followers from a spare pool; selects split points (heuristics to avoid heavy mid-range rebalancing); orchestrates copy then cutover.  
- **Split/Migration Flow**: Stop writes for the moving subrange on source RG → update metadata → direct new writes to destination RG → bulk copy reads continue with dual-read reconciliation → complete and remove special-range marker.  
[Ask AI: Subsystem - Controller](https://alisol.ir/?ai=Subsystem%20-%20Controller%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

### Subsystem: Storage Engine
- **Role**: Append-only log on disk for durability; index using B+ tree or LSM-tree; replay on restart if index not flushed.  
- **Choice**: B+ tree for read-heavy; LSM-tree for write-heavy workloads.  
[Ask AI: Subsystem - Storage Engine](https://alisol.ir/?ai=Subsystem%20-%20Storage%20Engine%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

---

## Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
|---|---|---|---|---|
| Consistency under partition | Strong (CP) | High availability (AP) | Strong | Single leader; quorum writes; accept brief unavailability. |
| Index structure | B+ tree | LSM-tree | Depends on workload | Choose read vs write optimization. [Personal note: LSM engines are typically preferred for write-heavy KV stores in 2025.] |
| Replica count | 3 nodes | 5 nodes | 3 by default | 3 offers quorum and durability at lower cost; 5 increases resilience. |
| Metadata tech | ZooKeeper | etcd / Custom Raft | Not fixed | Any consensus-backed store works. [Personal note: Prefer managed Raft-based metadata stores in 2025; ZooKeeper is often legacy—verify fit.] |
| Value storage | Inline (≤1 MB) | External blob store | Blob for large | Keep KV lean; avoid oversized values. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

---

## Reliability, Availability, and Performance

- **Replication/Quorum**: Majority-based commits provide durability and enable safe leader changes.  
- **Leader Election Window**: Brief unavailability until new leader confirmed by majority; can tune heartbeat thresholds.  
- **Follower Lag**: Controller auto-replaces lagging followers to maintain quorum health.  
- **Backfill & Rebuild**: Logs allow replay to rebuild indexes after crashes.  
- **Table Splits**: Dual reads during migration ensure correct results; sequencer resolves concurrent updates.  

[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

---

## Security & Privacy (if discussed)

- Assumed client-side encryption before sending to the system; no further details provided → **Not stated in video**.

[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

---

## Observability (if discussed)

- Health checks and monitoring by the controller implied; specific metrics, tracing, or alerting not detailed → **Not stated in video**.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

---

## Follow-up Questions (from interviewer, if any)

Not stated in video.

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

---

## Candidate Questions (if modeled in video)

Not stated in video.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

---

## Key Takeaways

- Strong consistency via a single leader per range is simple and predictable.  
- Durability first: append-only logs make crashes survivable; rebuild indices by replay.  
- Quorum writes guarantee no acknowledged data loss across leader changes.  
- Hot tables must be detected and split; dual reads ensure correctness during migration.  
- Metadata freshness at clients is critical; build rejection + refresh loops to self-heal.  
- Choose storage engine (B+ vs LSM) based on read/write mix; avoid large values in KV. [Personal note: For new deployments, LSM-based engines are often a safer default for high-ingest KV workloads.]  
- ZooKeeper/hand-rolled consensus are options but come with ops complexity. [Personal note: Prefer modern Raft-based, well-managed coordination services in 2025—verify operations and ecosystem fit.]

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

---

## Glossary

- **Replication Group (RG)**: A set of nodes (3 or 5) owning a key-range with one leader and follower replicas.  
- **Sequencer**: 16-byte, monotonically increasing identifier (ns timestamp + per-node counter + node id) used to resolve concurrent writes.  
- **Dual Read**: During migration, read from both source and destination RGs and reconcile by sequencer.  
- **Append-Only Log**: Storage of operations in write-ahead form for durability and replay.  
- **B+ Tree / LSM-tree**: On-disk index structures; B+ suited to reads; LSM suited to writes.  
- **Split Brain**: Two nodes both act as leader; avoided by majority recognition protocol.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

---

## Study Plan from This Interview (Optional)

- Review consensus basics (Raft vs Paxos) and leader election internals.  
- Practice designing range-splitting strategies and dual-read migrations.  
- Implement a toy KV with an append-only log + LSM index to internalize trade-offs.  
- Drill failure-mode handling: leader loss, follower lag, stale metadata, network partitions.  
[Personal note: Likely outdated; consider modern managed coordination services and cloud-native storage engines—verify for your stack.]

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store)

---

## Attribution

- **Source Video**: https://www.youtube.com/watch?v=rnZmdmlR-2M  
- **Channel**: Tushar Roy - Coding Made Simple  
- **Note**: This document is a summary of the linked mock interview.

---

## About the summarizer

I'm *Ali Sol*, a PHP Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)  
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

