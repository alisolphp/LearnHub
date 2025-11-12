# System Design Mock Interview: Design Netflix System
- *Channel*: Tech Dummies - Narendra Lakshmana Gowda
- *Duration*: 00:51:27
- *Original Video*: https://www.youtube.com/watch?v=psQzyFfsUGU

> This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.

---

## One-Page Executive Summary (2–3 min skim)

**Problem Prompt (One-liner)**: Design Netflix’s end-to-end system to stream video at scale with smooth UX worldwide.

**Primary Scope**
- In-scope: Client apps, API/gateway, microservices, load balancing, video ingestion/transcoding, CDN (Open Connect), data stores (MySQL & Cassandra), caching (EVCache/memcached), stream/log pipeline (Chukwa → Kafka → Samza → S3/Elasticsearch), recommendations (Spark/ML), observability usage.
- Out-of-scope: Detailed security model, billing internals beyond mention, exact API schemas.

**Non-Functional Priorities**: Low latency playback, high availability, global scalability, cost efficiency.

**High-Level Architecture (Text)**
- Clients (web, mobile, TV/console) talk to AWS frontends via ELB (two-tier: DNS RR across zones, then instance LB).
- API Gateway (Zuul) handles routing, auth, shaping, filters; Hystrix for isolation/circuit-breaking.   [Personal note: Hystrix is archived; prefer Resilience4j in 2025 for JVM circuit breaking due to active maintenance and modular design.]
- Microservices (REST/gRPC) for login, homepage, search, recommendations, billing, etc.
- Data: MySQL (ACID for users/billing) with master–master + read replicas; Cassandra for viewing history/big data.   [Personal note: Consider managed multi-AZ/region databases (e.g., Aurora, Vitess, or modern MySQL HA) to simplify failover and reduce operational risk.]
- Caching: EVCache (memcached-based) clusters; SSD-backed optimization; write to all clusters, read from nearest.   [Personal note: Evaluate Redis for richer data structures and built-in replication; memcached remains fine for simple key-value with low overhead.]
- Video pipeline: Studio ingest → chunking → distributed transcoding → variants/resolutions → push to Netflix Open Connect CDN. Client selects/auto-switches via ABR.   [Personal note: For codecs, modern deployments lean on AV1/HEVC; verify codec support for your device mix.]
- Data pipeline: Chukwa logs → Kafka topics → Samza routers → sinks (S3, Elasticsearch) → dashboards (Kibana/Grafana).   [Personal note: Chukwa/Samza are older choices; many stacks now standardize on Kafka + Flink/Kafka Streams; verify for your org.]
- Open Connect: Netflix-owned CDN boxes at ISPs, consistent hashing across cluster nodes, proactive caching via popularity/location.

**Top Trade-offs**
- Global cache hit ratio vs. storage cost at edges.
- ACID guarantees (MySQL) vs. scale/throughput (Cassandra).
- Client simplicity vs. smart client for server selection/ABR switching.
- Operational complexity (many services) vs. agility and failure isolation.

**Biggest Risks/Failure Modes**
- Hot shards/hot keys (popular titles), cache stampedes.
- Cascading failures between microservices; timeouts not tuned.
- Regional ISP/CDN outages, ELB misconfiguration across zones.

**5-Min Review Flashcards**
- Q: What handles routing and filters at the edge? A: Zuul gateway.   [Personal note: Consider Envoy/API Gateway alternatives for active ecosystems and HTTP/3.]
- Q: What prevents cascading failures? A: Hystrix with timeouts, bulkheads, fallbacks.
- Q: Where are user/billing vs. viewing history stored? A: MySQL vs. Cassandra.
- Q: How is playback delivered? A: From nearest Open Connect server with ABR switching.
- Q: What accelerates API throughput/latency? A: EVCache (memcached) + nearest-cluster reads.
- Q: What ingests logs/events? A: Chukwa → Kafka → Samza → S3/Elasticsearch.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

---

## Interview Tags

- **Domain/Industry**: `vod`, `streaming`, `analytics`
- **Product Pattern**: `video-on-demand`, `recommendation`, `cdn`, `caching`, `search-index`, `queue`, `job-scheduler`, `pub-sub`, `notification`
- **System Concerns**: `high-availability`, `low-latency`, `geo-replication`, `eventual-consistency`, `hot-key`, `backpressure`, `autoscaling`
- **Infra/Tech**: `microservices`, `grpc`, `rest`, `kafka`, `mysql`, `cassandra`, `memcached`, `s3`, `elasticsearch`, `spark`, `cdn`

[Personal note: Verify whether to use OpenSearch instead of Elasticsearch depending on licensing and managed options.]

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

---

## Problem Understanding

**Original Prompt**: Build Netflix to stream movies/TV worldwide with seamless UX; non-streaming control plane in AWS, video delivery via Open Connect.

**Use Cases**
- Discover content (homepage rows, search), play video with adaptive bitrate, resume/continue watching.
- Personalization: curated rows, artwork thumbnails per user.
- Support operations: logging, customer support debugging.

**Out of Scope**: Detailed auth flows, DRM specifics, ads; only high-level mentions of billing.

**APIs**: Not stated in video.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

---

## Requirements & Constraints

**Given in Video**
- Low startup time, smooth playback; serve from nearest edge; continuous best-server selection.
- Two “clouds”: AWS control-plane; Open Connect for streaming.
- ELB two-tier balancing; Zuul + Hystrix; EVCache; MySQL (ACID) + Cassandra (scale); Spark ML for recommendations; Chukwa/Kafka/Samza → ES/S3.

**Assumptions** (kept conservative)
- Multi-region AWS deployment with Route 53; autoscaling for spikes; CDN boxes at ISPs worldwide. *(Assumption)*

[Ask AI: Requirements and Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

---

## Back-of-the-Envelope Estimation

*Not stated in video—skipping numerical estimation.*

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

---

## High-Level Architecture

- **Clients**: Web (React), iOS/Android/TV; smart clients continuously probe for best Open Connect server and switch dynamically.
- **Edge/Gateway**: ELB (DNS RR across zones → per-instance LB); Zuul filters (inbound/endpoint/outbound) for auth/routing/metrics/headers.   [Personal note: Consider HTTP/3/QUIC at the edge for improved startup on flaky networks.]
- **Services**: Microservices via HTTP/gRPC; Hystrix isolates dependencies with timeouts, bulkheads, fallbacks.
- **Storage**: MySQL master–master with replicas; Cassandra for high-write/large history; EVCache for read acceleration (SSD-backed).
- **Ingest/Transcode**: Split source movie into chunks; enqueue tasks; EC2 workers transcode into many formats/resolutions/bitrates; write to S3; push to Open Connect.
- **Open Connect**: Proactive caching by global vs. regional popularity; consistent hashing distributes objects across cluster nodes.
- **Data/Logs**: Chukwa collects events (UI activity, playback, errors) → Kafka → Samza routes to S3/Elasticsearch; dashboards for support/ops.
- **ML/Personalization**: Spark trains models for row selection, sorting, artwork selection.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

---

## Deep Dives by Subsystem

### 8.1 Client Applications
**Role**: Cross-platform apps (TV, mobile, web); React on web for startup speed/runtime/modularity.
**Scaling**: Smart selection of Open Connect server; ABR adapts bitrate based on bandwidth.
**Failure Handling**: Switches providers mid-stream if a better server is detected.

[Ask AI: Subsystem - Client](https://alisol.ir/?ai=Subsystem%20-%20Client%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

### 8.2 API Gateway (Zuul)
**Role**: Dynamic routing, auth, shaping, security; filters before/after proxying; metrics/header manipulation.
**Mitigations**: Traffic splitting for load testing or canaries; filtering bad requests by user-agent, etc.
[Personal note: Modern gateways (Envoy, Kong, Spring Cloud Gateway) may offer richer HTTP/2/3 and service-mesh integration.]

[Ask AI: Subsystem - API Gateway](https://alisol.ir/?ai=Subsystem%20-%20API%20Gateway%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

### 8.3 Resilience (Hystrix)
**Role**: Latency/fault tolerance, isolate remote calls; timeouts; thread-pool bulkheads; error-rate based tripping; fallbacks; metrics dashboards.
[Personal note: Prefer Resilience4j or service-mesh rate limiting/circuit breaking for active support and polyglot stacks.]

[Ask AI: Subsystem - Resilience](https://alisol.ir/?ai=Subsystem%20-%20Resilience%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

### 8.4 Caching (EVCache/memcached)
**Role**: Write to all clusters; reads from nearest; boosts throughput, cuts latency/cost. SSDs used to extend cache capacity.
**Threats**: Hot keys on trending titles; mitigate with sharding/replication and request coalescing. *(Summarized from caching discussion.)*

[Ask AI: Subsystem - Caching](https://alisol.ir/?ai=Subsystem%20-%20Caching%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

### 8.5 Datastores
**MySQL**: ACID for users/billing; master–master replication; read replicas per DC; failover by DNS (Route 53).   [Personal note: DNS-based failover can be slow; consider managed HA with fast failover and read/write endpoints.]
**Cassandra**: Distributed store for viewing history; periodic compression of older history to reduce footprint while keeping fresh data hot.

[Ask AI: Subsystem - Datastores](https://alisol.ir/?ai=Subsystem%20-%20Datastores%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

### 8.6 Transcoding & Delivery
**Flow**: Ingest large source → split into chunks → queue tasks → EC2 workers transcode into many resolutions/bitrates (~1200 copies mentioned) → store on S3 → push to Open Connect nodes. Clients use ABR.
[Personal note: Validate modern codec ladder (AV1/HEVC) and per-device profiles to optimize quality-per-bit.]

[Ask AI: Subsystem - Transcoding](https://alisol.ir/?ai=Subsystem%20-%20Transcoding%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

### 8.7 Data/Log Pipeline & Observability
**Ingest**: Chukwa collects logs/events → Kafka; Samza filters/routes to S3/Elasticsearch. Support dashboards use ES to debug user playback issues, sign-up/login errors, resource usage.
[Personal note: Many stacks consolidate on Kafka + Flink/Streams; pick based on team expertise and tooling.]

[Ask AI: Subsystem - Data Pipeline](https://alisol.ir/?ai=Subsystem%20-%20Data%20Pipeline%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

### 8.8 Recommendations & Personalization
**Models**: Collaborative filtering and content-based filtering; Spark clusters for training; output drives row selection/sorting and artwork selection experiments.
**Artwork Personalization**: Multiple thumbnails per title; show variants, track CTR/watch-time; pick winners for segments.

[Ask AI: Subsystem - Recommendations](https://alisol.ir/?ai=Subsystem%20-%20Recommendations%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

### 8.9 Open Connect (CDN)
**Model**: Netflix-owned appliances hosted by ISPs (free to partners); reduces transit bandwidth and improves QoE; HA via redundant components.
**Caching Strategy**: Globally popular content cached everywhere; location-specific content staged based on historical viewing; cluster uses consistent hashing to place and locate objects.

[Ask AI: Subsystem - Open Connect](https://alisol.ir/?ai=Subsystem%20-%20Open%20Connect%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

---

## Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
| --- | --- | --- | --- | --- |
| Gateway | Zuul | Envoy/others | Zuul | Mature filters/routing at Netflix at the time.  |
| Fault Tolerance | Hystrix | Resilience4j/mesh | Hystrix | Rich timeout/bulkhead/fallback model.  |
| OLTP | MySQL | Postgres/Managed | MySQL | ACID & existing tooling.  |
| Big Data Store | Cassandra | HBase/Dynamo-like | Cassandra | Scale for history/log-like workloads.  |
| Stream Proc | Samza | Flink/Streams | Samza | Routing/filtering of Kafka topics.  |

[Personal note: Likely outdated; consider Envoy/Resilience4j/Flink — verify for your stack.]

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

---

## Reliability, Availability, and Performance

- **Replication/Consistency**: MySQL master–master with replicas for reads; Cassandra distributed for scale; EVCache replicates writes to all clusters and serves reads locally.
- **Latency Budget**: Reduce client startup via nearest edge + caching; ABR avoids stalls by adapting to bandwidth.
- **Load Shedding/Degradation**: Hystrix fallbacks; route splitting at gateway; cache-first reads where safe.

[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

---

## Security & Privacy

Not stated in video (beyond generic mention of gateway security).

[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

---

## Observability

- Metrics/Logs/Tracing: Hystrix metrics; Elasticsearch + dashboards used by support/ops to trace user issues and system errors (e.g., signups, logins).

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

---

## Follow-up Questions (from interviewer)

Not stated in video.

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

---

## Candidate Questions (if modeled)

Not stated in video.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

---

## Key Takeaways

- Separate control plane (AWS) from data plane (Open Connect) for scale.
- Use smart clients + ABR to mask network variability.
- Gateway + circuit breakers prevent cascading failures.
- Cache aggressively with locality-aware reads to cut cost/latency.
- Blend ACID (MySQL) with scale-out (Cassandra) appropriately.
- Proactive CDN caching and consistent hashing improve hit ratios.
[Personal note: Revisit gateway/circuit-breaker choices and the stream-processing stack to align with 2025 best practices.]

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

---

## Glossary

- **Open Connect**: Netflix-operated CDN appliances at ISPs serving video.
- **ABR (Adaptive Bitrate)**: Streaming technique that adjusts video quality to current bandwidth.
- **Zuul**: API gateway for routing/filters and traffic shaping.
- **Hystrix**: Library for latency/fault tolerance (timeouts, bulkheads, fallbacks).
- **EVCache**: Netflix’s memcached-based distributed cache.
- **Chukwa/Kafka/Samza**: Log/stream ingest, pub-sub, and routing stack.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

---

## Study Plan from This Interview (Optional)

- Review gateway patterns and circuit-breaking.
- Prototype ABR streaming and CDN caching strategies.
- Practice trade-off discussions: SQL vs. NoSQL; cache policies; edge vs. origin delivery. *(Assumption)*

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System)

---

## Attribution

- Source Video: https://www.youtube.com/watch?v=psQzyFfsUGU
- Channel: Tech Dummies - Narendra Lakshmana Gowda
- Note: This document is a summary of the linked mock interview.

---

## About the summarizer

I'm *Ali Sol*, a PHP Developer. Learn more:

- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

