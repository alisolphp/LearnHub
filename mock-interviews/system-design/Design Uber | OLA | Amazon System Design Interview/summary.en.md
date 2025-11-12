# System Design Mock Interview: Design Uber | OLA | Amazon System Design Interview
**Channel/Interviewer:** Tech Dummies - Narendra Lakshmana Gowda  
**Duration:** 00:36:51  
**Original Video:** https://www.youtube.com/watch?v=umWABit-wbk

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.*

---

## One-Page Executive Summary (2–3 min skim)

**Problem Prompt (One-liner):**  
Design a ridesharing platform (e.g., Uber/Ola/Lyft/Grab) that matches riders to nearby drivers in real time, at global scale.

**Primary Scope:**  
Real-time dispatch (supply–demand matching), location ingestion, ETA calculation, geo-indexing, messaging between clients and backend, data storage/analytics, logging, and disaster recovery. Out-of-scope fine details: pricing, surge strategy, payments internals, full auth design.

**Non-Functional Priorities:**  
Always-on availability, low-latency mobile experience, horizontal scalability across regions, resiliency to data center failures.

**High-Level Architecture (Text):**  
- Mobile apps (rider/driver) send frequent GPS updates.  
- Edge: Web Application Firewall → Load Balancer (L3/L4/L7).  
- Ingestion via REST → buffer/stream to Kafka.  
- Real-time state fan-out to: NoSQL storage, dispatch optimization service, and other consumers.  
- Dispatch ring (Node.js services) with consistent hashing + gossip for responsibility; RPC between nodes.  
- Mapping/ETA service (uses map provider + S2-like cell library).  
- WebSockets for bidirectional, event-driven updates to riders/drivers.  
- Analytics: batch on HDFS/Hadoop; real-time via Spark/Storm; centralized logging via ELK.  
- Backup data center that reconstructs trip state from driver apps’ state digests on primary DC failure.  
  _Note: For real-time stream processing, Apache Flink or Kafka Streams are common 2025 choices due to unified batch/stream semantics and operational simplicity._

**Top Trade-offs:**  
- Freshest driver locations vs. network/battery cost (GPS push cadence).  
- Global consistency vs. availability/latency (favor eventual where safe).  
- In-house ETA modeling vs. map-provider ETA APIs.  
- Fine-grained sharding (S2 cells) vs. cross-shard coordination overhead.  
- Simpler monolith vs. scalable microservices (operational complexity).

**Biggest Risks/Failure Modes:**  
- Hotspots during peak demand (stadiums/airports).  
- Stale driver positions leading to bad matches/ETAs.  
- Message loss or consumer lag in streams.  
- Data center outage mid-trip.  
- Fraud: payment misuse, incentive abuse, account compromise.

**5-Min Review Flashcards:**  
- **Why WebSockets here?** To push server-initiated updates (offers, accept/decline, status) with low latency.  
- **What’s the unit of geo-partitioning?** S2-like cells (unique IDs per cell) for indexing and routing.  
- **How do dispatch nodes scale?** Consistent hashing (ring) + gossip to learn responsibilities; RPC among nodes.  
- **Core ingestion path?** App → WAF/LB → REST → Kafka; consumers update NoSQL + dispatch state.  
- **Who computes ETA?** Mapping/ETA service using road network and traffic; not simple Euclidean distance.  
- **DC failure playbook?** Fail over to backup DC and rebuild live trip state from driver apps’ “state digest.”  
- **Logging stack?** Elasticsearch + Logstash + Kibana (ELK).  
  _Note: Consider OpenTelemetry + vendor-neutral backends to reduce lock-in in 2025._

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

---

## Interview Tags (for later filtering)

**Domain/Industry:** `ridesharing, delivery, maps, analytics`  
**Product Pattern:** `realtime-chat, pub-sub, notification, queue, job-scheduler`  
**System Concerns:** `high-availability, low-latency, eventual-consistency, geo-replication, hot-key, backpressure, throttling, autoscaling`  
**Infra/Tech (mentioned):** `microservices, rest, websocket, kafka, mysql, cassandra, mongodb, hdfs, elasticsearch, spark, storm`  
_Note: Apache Storm is largely legacy; prefer Flink/Kafka Streams unless your org already runs Storm._

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

---

## Problem Understanding

**Original Prompt:** Build a ride-hailing platform whose dispatch system functions as a real-time marketplace to match riders to drivers, show nearby cars, and estimate arrival times.

**Use Cases:**  
- Rider requests a trip (vehicle class, solo/pool).  
- Show nearby cars and ETAs.  
- Driver location updates every few seconds.  
- Offer/accept/timeout flow; assign the first accepting driver.  
- Handle high-demand regions; add/remove cities and servers seamlessly.

**Out of Scope (explicit/implicit):** full pricing/surge details, payments internals, full auth/PII design.

**APIs:** Not stated in video.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

---

## Requirements & Constraints

**Given in Video — Functional:**  
- Ingest high-rate GPS pings from drivers.  
- Maintain latest driver state for dispatch.  
- Compute ETAs using road network (turn costs, traffic).  
- Run a bidirectional message channel to apps (offers, status).  
- Scale to many regions/cities; easy server add/remove (gossip).  
- Provide analytics and fraud detection.

**Given in Video — Non-Functional:**  
- Highly available (no planned downtime visible to users).  
- Low latency for offers/accept and map updates.  
- Horizontal scalability across data centers/regions.  
- Robust disaster recovery.

**Assumptions (conservative):**  
- Rider request latency budget in low seconds end-to-end.  
- Driver GPS update cadence ~4s (as stated).  
- Eventual consistency acceptable for map/nearby lists; stronger consistency for trip state.

[Ask AI: Requirements and Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

---

## Back-of-the-Envelope Estimation

_Not stated in video—skipping numerical estimation._

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

---

## High-Level Architecture

- **Clients:** Rider and driver mobile apps send/receive via WebSockets and call REST endpoints for location posting.  
- **Edge:** Web Application Firewall (blocks bots/regions) → L3/L4/L7 Load Balancers route traffic.  
- **Ingestion:** REST → buffer to Kafka topics (location stream). Copies to NoSQL, dispatch state, and other consumers.  
- **Dispatch Ring:** Node.js services; consistent hashing assigns cell ranges; gossip protocol shares responsibilities; RPC calls between nodes when a rider’s search radius spans multiple owners.  
  _Note: Uber historically used Ringpop/TChannel; in 2025 many teams standardize on gRPC over HTTP/2 for service-to-service RPC._  
- **Geo/ETA:** Mapping service uses S2-like cell coverage to find candidate drivers, then road-network ETA (turn costs, traffic), not straight-line distance.  
- **Data:** “Schemaless” NoSQL built on MySQL concepts, plus alternatives cited (Cassandra/MongoDB/Bigtable). High read/write availability; online operations (index, backup) without downtime.  
  _Note: For new large-scale OLTP in 2025, consider cloud-native, horizontally scalable SQL (e.g., Spanner/CockroachDB) when strong consistency across regions is needed._  
- **Analytics:** Batch (HDFS/Hadoop; periodic DB dumps), plus real-time (Spark/Storm) for trends and model inputs.  
- **Observability:** Centralized logs → Elasticsearch/Logstash/Kibana dashboards.  
- **DR:** Backup DC with empty data; on failover, driver apps upload “state digest” to reconstruct live trips.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

---

## Deep Dives by Subsystem

### Supply (Driver) Service  
**Role:** Accept GPS updates (~every 4s), maintain latest driver state, push to Kafka and dispatch.  
**Scaling:** Horizontally behind LB; partitions by driverId or cellId.  
**Consistency:** Eventual for map views; stronger for assigned-trip state.  
**Failure:** Retry with idempotent writes; drop stale pings.

[Ask AI: Subsystem - Supply](https://alisol.ir/?ai=Subsystem%20-%20Supply%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

### Demand (Rider) Service  
**Role:** Receives ride requests (vehicle class, pooling), forwards to dispatch with rider’s cellId.  
**Contracts:** Send search radius; receive candidate drivers sorted by ETA.  
**Failure:** Timeouts; re-query with expanded radius.

[Ask AI: Subsystem - Demand](https://alisol.ir/?ai=Subsystem%20-%20Demand%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

### Dispatch Optimization (Node.js Ring)  
**Role:** For a given rider cell, compute nearby drivers by drawing a circle, enumerating S2 cells, fetching candidates, and ranking by road ETA. Sends offers to top N via WebSockets; first accept wins.  
**Scaling/Partitioning:** Consistent hashing over cell IDs; gossip to learn ownership; RPC to contact peer owners for overlapping search areas.

[Ask AI: Subsystem - Dispatch](https://alisol.ir/?ai=Subsystem%20-%20Dispatch%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

### WebSockets Gateway  
**Role:** Persistent, bidirectional messaging with riders/drivers for offers, accepts, cancellations, trip updates.  
**Why WS:** Event-driven, low-overhead, server-initiated pushes.

[Ask AI: Subsystem - WebSockets](https://alisol.ir/?ai=Subsystem%20-%20WebSockets%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

### Geo/Mapping & ETA  
**Role:** S2-like cell modeling; coverage queries for a given radius; ETA via road graph (turn costs, traffic).  
**Note:** Sometimes a finishing-soon trip near the rider beats an idle but farther driver.

[Ask AI: Subsystem - Mapping & ETA](https://alisol.ir/?ai=Subsystem%20-%20Mapping%20%26%20ETA%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

### Data Platform & Analytics  
**Batch:** Periodic dumps to HDFS; query with Hadoop “big query tools.”  
**Streaming:** Spark/Storm for real-time trends and detection.  
**Use Cases:** ETA improvement, map enhancement, traffic modeling.  
_Note: Modern lakehouse stacks (e.g., Apache Iceberg/Delta Lake) can simplify historical + streaming unification in 2025._

[Ask AI: Subsystem - Analytics](https://alisol.ir/?ai=Subsystem%20-%20Analytics%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

### Logging & Observability  
**Stack:** ELK—forward logs to a cluster; dashboards show errors and health.

[Ask AI: Subsystem - Logging](https://alisol.ir/?ai=Subsystem%20-%20Logging%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

### Fraud Detection (ML)  
**Threats:** Payment fraud (stolen cards), incentive abuse (fake GPS/bookings to hit quotas), compromised accounts (phishing).  
**Signals:** Historical trip patterns, altitude/speed traces, behavioral anomalies. Actions: warn/ban on repeated abuse.

[Ask AI: Subsystem - Fraud](https://alisol.ir/?ai=Subsystem%20-%20Fraud%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

---

## Trade-offs & Alternatives

| Topic | Option A | Option B | Leaning | Rationale |
| --- | --- | --- | --- | --- |
| Messaging to apps | WebSockets | Long-polling/HTTP/2 SSE | WebSockets | Bi-directional, lower latency for pushes. |
| Geo index | S2 cells | Raw lat/lon grids | S2 cells | Unique IDs, good coverage queries, routing/sharding. |
| ETA | Provider APIs | In-house model | Provider APIs (lean) | Road graph + traffic complexity; provider maintained. |
| Storage | MySQL-based “schemaless” | Cassandra/Mongo/Bigtable | Mixed | Must stay highly available & horizontally scalable. |
| Stream proc. | Spark/Storm | Flink/Kafka Streams | Depends | Existing mention; org choice varies. _Note: Favor Flink/Kafka Streams in 2025 for mature stateful streaming._ |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

---

## Reliability, Availability, and Performance

- **Replication/Consistency:** Emphasis on availability; eventual consistency acceptable for nearby lists; stricter for trip state.  
- **Backpressure:** Kafka absorbs bursty GPS updates; downstream consumers process at pace.  
- **Degradation:** Expand search radius or relax matching in sparse supply.  
- **DR:** Backup DC boots with no data; driver apps upload “state digest” so trips continue.

[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

---

## Security & Privacy

- WAF blocks known-bad IPs/bots and unsupported regions.  
- Account compromise detection via behavioral anomalies.  
- Payment fraud monitoring.  
_Note: Target TLS 1.3 and strong mobile certificate pinning in 2025._

[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

---

## Observability

- Centralized log ingestion; dashboards for error rates and system health (Kibana).

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

---

## Follow-up Questions (to ask interviewer)

- How do we tune GPS upload cadence for latency vs. battery?  
- What’s the acceptable ETA error and success rate targets?  
- Which failure modes are most common in production incidents?  
- What’s the plan for stadium/airport special handling (preferred access points)?

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

---

## Key Takeaways

- Treat dispatch as a real-time marketplace optimized for low latency.  
- Geo-partition by S2-like cells; use consistent hashing to split compute.  
- WebSockets for push-heavy workflows between servers and mobile apps.  
- Use road-network ETAs; straight-line distance misleads.  
- Design for DC failure: rebuild live state from clients when needed.  
- Centralize logs and invest in analytics to improve ETA and catch fraud.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

---

## Glossary

- **S2 Cells:** Hierarchical geospatial index dividing the globe into addressable cells.  
- **Gossip Protocol:** Peer-to-peer membership/health dissemination so nodes learn each other’s responsibilities.  
- **Consistent Hashing:** Partitioning scheme that minimizes remapping on node add/remove.  
- **WebSockets:** Full-duplex TCP-based protocol for real-time app messaging.  
- **ELK:** Elasticsearch + Logstash + Kibana logging/visualization stack.  
- **State Digest:** Compact snapshot on driver app used to reconstruct live trip state during DC failover.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

---

## Study Plan (Optional)

- Revisit consistent hashing & gossip basics.  
- Implement a toy S2-cell radius search and candidate ranking.  
- Build a small WebSocket demo (offer → accept → assign).  
- Run a Kafka pipeline ingesting mock GPS and fanning out to two consumers.

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview)

---

## Attribution

- Source Video: `https://www.youtube.com/watch?v=umWABit-wbk`  
- Channel: Tech Dummies - Narendra Lakshmana Gowda  
- Note: This document is a summary of the linked mock interview.

---

## About the summarizer

I'm **Ali Sol**, a PHP Developer. Learn more:

- Website: https://alisol.ir  
- LinkedIn: https://www.linkedin.com/in/alisolphp
