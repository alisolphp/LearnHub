# System Design Mock Interview: Design Distributed Cache
- *Channel/Interviewer*: System Design Interview
- *Duration*: 00:34:32
- *Original Video*: https://www.youtube.com/watch?v=iuqZvajTOyA

> This document summarizes the key content of a system design mock interview. Watching the full video is still recommended.

---

## One-Page Executive Summary (2–3 min skim)

- **Problem Prompt (One-liner)**: Design a fast, scalable, highly available distributed cache that supports `PUT(key, value)` and `GET(key)` for string keys and values.
- **Primary Scope**: Local LRU cache → sharded distributed cache → consistent hashing → replication (leader/follower) → discovery/config service → client/proxy variations → TTL/expiration → observability and security notes.
- **Non-Functional Priorities**: Performance first, plus scalability and availability; durability is secondary because it’s “just a cache.”
- **Key Constraints & Numbers**: No specific QPS/latency numbers provided. *Not stated in video.*

**High-Level Architecture (Text)**
1. App calls cache client; client checks local-cache (LRU).
2. On miss, client selects shard with consistent hashing and calls remote cache (TCP/UDP).
3. Shards run LRU store; writes go to leader; reads can go to leader or replicas.
4. Configuration service discovers servers, monitors health, and (optionally) performs leader election/failover.
5. Optional proxy or server-side routing instead of client-side hashing.

**Top Trade-offs**
- Client-side hashing vs proxy/server-side routing
- Dedicated cache cluster vs co-located cache
- Asynchronous replication (availability/perf) vs synchronous (consistency)
- Simplicity of host-list files vs dynamic discovery service

**Biggest Risks/Failure Modes**
- Hot shards / hot keys
- Domino effect on node failure with vanilla consistent hashing
- Inconsistency across replicas (async replication)
- Clients holding divergent server lists
- Data loss on leader crash before replicate (acceptable: treated as misses)

**5-Min Review Flashcards**
- Q: Why LRU needs a linked list plus hashmap?
  A: Hashmap for O(1) lookups; doubly linked list to reorder recency in O(1).
- Q: Why not simple `hash % N`?
  A: Rehash storm on membership changes -> many misses. Use consistent hashing.
- Q: What improves availability and hot-shard handling?
  A: Leader/follower replication; add read replicas.
- Q: Who knows shard membership?
  A: Cache client (or a proxy/servers); kept in sync via file, shared storage polling, or config service.
- Q: Two flaws of vanilla consistent hashing?
  A: Domino effect on failure; uneven ring split. Mitigate with virtual nodes, Jump Hash, proportional hashing.
- Q: Why async replication is acceptable here?
  A: Cache prioritizes speed; occasional loss → cache miss only.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

---

## Interview Tags (for later filtering)

- **Product Pattern**: `caching`
- **System Concerns**: `high-availability`, `low-latency`, `eventual-consistency`, `hot-key`
- **Infra/Tech (mentioned)**: `microservices`, `redis`, `memcached`, `zookeeper`
  [Personal note: Many stacks today prefer etcd or Consul for service discovery/coordination in cloud/Kubernetes environments due to operational fit.]

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

---

## Problem Understanding

- **Original Prompt**: Add a distributed in-memory cache to speed reads and shield the datastore from latency/outages. Support `PUT` and `GET`.
- **Use Cases**: Faster repeated reads; resilience during datastore slowness/outages; reduced backend load.
- **Out of Scope**: Persistent storage guarantees beyond typical cache semantics. Exact API schemas not specified.
- **APIs**: *Not stated in video.*

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

---

## Requirements & Constraints

**Given in Video**
- Functional: `PUT(key, value)`, `GET(key)`; strings for both.
- Non-Functional: Performance (top priority), scalability, availability; durability lower priority.
- Consistency: Eventual (async replication, multi-replica reads).

**Assumptions** (conservative)
- Values are moderately sized (<1 MB) and compressible.
- Read-heavy workload (e.g., 90/10).
- Latency budgets in low ms for p50/p95.
- Multi-DC deployment for resilience.
*Assumption—validate per stack.*

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

---

## Back-of-the-Envelope Estimation

*Not stated in video—skipping numerical estimation.*

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

---

## High-Level Architecture

- **Local Cache**: In-process LRU (hashmap + doubly linked list). TTL support via passive/active expiration.
- **Remote Cache Cluster**: Sharded nodes (LRU per node). Client-side consistent hashing. TCP or UDP transport.
  [Personal note: Prefer TCP for reliability; if using UDP, application-level retries/ordering are required.]
- **Replication**: Leader/follower per shard; writes to leader; reads from any. Cross-DC replicas.
  [Personal note: The video uses “master-slave” as an alias; prefer “leader/follower” terminology.]
- **Discovery & Failover**: File/shared storage polling or configuration service (e.g., ZooKeeper; Redis Sentinel).
  [Personal note: Where you already run Kubernetes, controller-based discovery or etcd-backed coordination often reduces extra infra.]
- **Client vs Proxy**: Either client library does hashing/routing or use a proxy (e.g., twemproxy) / server-side routing (Redis Cluster).
- **Observability & Security**: Metrics (latency, hit/miss, CPU/mem, I/O), access logging; network ACLs; optional at-rest/in-flight encryption (perf impact).

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

---

## Deep Dives by Subsystem

### Subsystem: Local LRU Cache
- **Role**: Fast in-process hits; reduces remote calls.
- **Core Idea**: Hashmap for O(1) key→node; doubly linked list for O(1) move-to-head/tail eviction.
- **Eviction**: Remove tail on capacity; on GET/PUT move to head.
- **TTL/Expiration**: Passive on access; active via periodic sampler to avoid scanning all entries.

[Ask AI: Subsystem - Local LRU Cache](https://alisol.ir/?ai=Subsystem%20-%20Local%20LRU%20Cache%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

### Subsystem: Sharding & Consistent Hashing
- **Role**: Distribute keys across nodes; minimize rehash on membership change.
- **Mechanics**: Place servers on a ring; each owns keys until next clockwise server.
- **Hot/Failure Mitigation**: Virtual nodes; Jump Hash; proportional hashing.
- **Client List Sync**: All clients must share same server list to avoid split-brain routing.

[Ask AI: Subsystem - Sharding & Hashing](https://alisol.ir/?ai=Subsystem%20-%20Sharding%20%26%20Hashing%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

### Subsystem: Replication & Consistency
- **Protocol**: Leader/follower; async replication favored. Reads from replicas allowed.
- **Consistency**: Eventual; possible divergent reads across leader vs replica.
- **Failure**: Promote follower on leader failure (via config service or intra-cluster election).
  [Personal note: If requirements change to strong consistency, quorum writes/reads or synchronous replication with fewer replicas can be considered—expect higher latency.]

[Ask AI: Subsystem - Replication & Consistency](https://alisol.ir/?ai=Subsystem%20-%20Replication%20%26%20Consistency%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

### Subsystem: Discovery & Health Monitoring
- **Options**: (1) Static file deployed with app; (2) Shared storage polling (e.g., S3) via daemon; (3) Config service with heartbeats and auto-un/register.
- **Leader Election**: Config service can monitor leaders and promote followers.
- **Topology Source of Truth**: Clients query config service for up-to-date membership.

[Ask AI: Subsystem - Discovery](https://alisol.ir/?ai=Subsystem%20-%20Discovery%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

### Subsystem: Client/Proxy Routing
- **Client Library**: Lightweight; binary search over sorted ring; handles failures; emits metrics.
- **Proxy**: e.g., twemproxy—de-shards clients, centralizes routing.
- **Server-side Routing**: Client connects to any node; node forwards to correct shard (Redis Cluster).

[Ask AI: Subsystem - Client/Proxy Routing](https://alisol.ir/?ai=Subsystem%20-%20Client%2FProxy%20Routing%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

---

## Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale |
| --- | --- | --- | --- | --- |
| Deployment | Dedicated cache cluster | Co-located per service | Both viable | Dedicated: isolation and scaling independence; Co-located: cheaper & auto-scales with service. |
| Routing | Client-side hashing | Proxy/server-side | Neutral | Client is simpler infra; proxy centralizes logic and reduces client complexity. |
| Replication | Async | Sync | Async | Lower latency; accepts eventual consistency and rare loss. |
| Discovery | Static/shared file | Config service | Config service for automation | Automatic health-based membership, failover, and single source of truth. |
| Hashing | Vanilla ring | Virtual nodes / Jump Hash | Enhanced | Better balance; reduces domino effect. |
[Personal note: Jump Hash (2014) is still a solid choice in 2025 for simple, well-balanced distribution.]

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

---

## Reliability, Availability, and Performance

- **Replication/Quorum**: Leader/follower; async; failover via config service.
- **Latency Budget**: Emphasis on constant-time cache ops; TCP/UDP network overhead minimal compared to datastore.
- **Degradation**: Treat missing/unavailable shard as cache miss; rely on backing store.
- **Hot Shards**: Add read replicas; advanced hashing; potential app-level key splitting.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

---

## Security & Privacy

- **Network**: Restrict cache ports with firewalls; don’t expose directly to the internet unless required.
- **Data**: Optional client-side encryption before storing (with performance caveats).
[Personal note: If encrypting, ensure keys are managed outside the cache path and weigh CPU/memory overhead.]

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

---

## Observability

- **Metrics**: Faults, latency, hit/miss rate, CPU/memory, network I/O.
- **Logs**: Who/when/key/status; keep entries small but informative.
- **Why**: Many dependent services will blame cache during incidents—be ready with data.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

---

## Follow-up Questions (from interviewer, if any)

- None explicitly modeled; video instead proposes future topic: heavy hitters / Top-K frequent items.

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

---

## Candidate Questions

- What are the read/write ratios and latency targets that define “fast enough”?
- Are hot keys expected (e.g., trending content)? Should we pre-split or cache-bust?
- Do we require cross-region reads/writes, or is replication within region sufficient?
- Who owns membership truth—config service or orchestration layer (e.g., Kubernetes)?
- Is data sensitivity high enough to justify encryption overhead in cache?

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

---

## Key Takeaways

- Start simple: local LRU with hashmap + DLL gives O(1) operations.
- Scale out via sharding and consistent hashing to avoid rehash storms.
- Availability and hot shards improve with leader/follower replication and more read replicas.
- Keep clients’ server lists consistent—prefer dynamic discovery and health monitoring.
- Consider proxy/server-side routing to simplify clients.
- Embrace eventual consistency; treat cache loss as acceptable misses for speed.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

---

## Glossary

- **LRU**: Eviction policy that removes least recently accessed items first.
- **Consistent Hashing**: Hashing scheme minimizing key movement on membership changes.
- **Leader/Follower Replication**: Writes go to leader; followers replicate and serve reads.
- **Virtual Nodes**: Multiple positions per server on ring to balance load.
- **Domino Effect**: Cascading failures when one node’s load overwhelms the next after failure.
- **TTL**: Time-to-live; expiry metadata for entries.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

---

## Study Plan from This Interview (Optional)

- Implement LRU (hashmap + doubly linked list).
- Prototype a toy consistent hashing ring with virtual nodes and Jump Hash.
- Add async replication to a toy cache; simulate failures and failover.
- Build a tiny config service (heartbeats, membership, client sync).
- Measure hit/miss/latency with and without local cache layer.

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache)

---

## Attribution

- **Source Video**: https://www.youtube.com/watch?v=iuqZvajTOyA
- **Channel**: System Design Interview
- **Note**: This document is a summary of the linked mock interview.

---

## About the summarizer

I’m **Ali Sol**, a PHP Developer.
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
