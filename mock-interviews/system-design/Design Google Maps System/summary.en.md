# System Design Mock Interview: Design Google Maps System  
- *Channel/Interviewer*: codeKarle  
- *Duration*: **01:00:50**  
- *Original Video*: https://www.youtube.com/watch?v=jk3yvVfNvds

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.* 

---

## One-Page Executive Summary (2–3 min skim)

- **Problem Prompt (One-liner)**: Design a Google-Maps–like navigation platform that returns routes, distance, and ETA between two points, and remains extensible for traffic, weather, incidents, and new road discovery.   
- **Primary Scope**  
  - In-scope: routing between two points, ETA computation, traffic/weather inputs, segment/mega-segment model, data ingestion from user pings, new-road discovery, multi-tenant APIs for users/companies.   
  - Out-of-scope: deep geo-politics handling beyond a short note, full ML detail, perfect “best path in milliseconds,” global authoritative road datasets. 
- **Non-Functional Priorities**: high availability, “good-enough” accuracy, seconds-level response (≈1–3s acceptable), horizontal scalability. 
- **Key Constraints & Numbers (as stated by speaker)**: ~1B MAU (anecdotal), 5–10B route requests/month, ~5M companies consuming APIs. (Speaker notes these are not authoritative.) 
- **High-Level Architecture (Text)**  
  1. Devices stream location via WebSocket handlers; manager tracks device↔handler mapping (cached in Redis).  
  2. Location Service persists pings (Cassandra) and publishes to Kafka.  
  3. Stream processing (Spark Streaming) derives average speeds, hotspots, and new-road detection; services update a graph store (Cassandra) via Graph Processing/Map Update/Traffic Update.  
  4. Area Search resolves place→lat/long (Elasticsearch & address resolver).  
  5. Map Service fronts Graph Processing which builds a subgraph and runs routing.  
  6. Historical Data Service (Cassandra) backfills ETA when live data is weak.  
  7. Navigation Tracking monitors adherence to route and emits analytics.   
  [Personal note: Spark Streaming is workable, but many teams in 2025 prefer Flink or Spark Structured Streaming for lower latency and simpler exactly-once semantics—verify for your stack.]
- **Top Trade-offs**  
  - Accuracy vs. latency (good-enough routes within seconds).  
  - Rich edge weights vs. pluggable “speed modifiers” model.  
  - Global Dijkstra vs. segmented hierarchical routing.  
  - Real-time traffic vs. historical backfill.   
  [Personal note: For routing, A*/ALT/Contraction Hierarchies/Multi-Level Dijkstra typically outperform plain Dijkstra on large graphs.]
- **Biggest Risks/Failure Modes**  
  - Stale cached segment/mega-segment paths during sudden incidents.  
  - Hot partitions for dense urban segments.  
  - Third-party data quality drift.  
  - Privacy/PII handling of location pings (implied). 
- **5-Min Review Flashcards**  
  - Q: Why segments? A: To bound search and cache intra-segment all-pairs paths.   
  - Q: How are traffic/weather incorporated? A: As factors that modify average speed, not as new graph weights.   
  - Q: Inter-segment routing trick? A: Connect segment exit points and search a reduced graph; bubble updates upward.   
  - Q: When to recompute caches? A: On ETA deltas above a threshold (e.g., +30%) within a segment.   
  - Q: Where does historical ETA help? A: When live traffic is weak or unavailable; keyed by day-of-week/hour.   
  - Q: Device connectivity? A: Persistent WebSockets; manager + Redis tracks assignments.   
  [Personal note: Consider adding A* with an admissible heuristic (e.g., haversine) to reduce search without sacrificing optimality.]

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

## Interview Tags (for later filtering)

- **Domain/Industry**: `maps`, `analytics`   
- **Product Pattern**: `search-index`, `caching`, `pub-sub`, `job-scheduler`, `notification` (rerouting), `rate-limit` (API)   
- **System Concerns**: `high-availability`, `low-latency`, `geo-replication` (implied global), `privacy`, `throttling`, `autoscaling`   
- **Infra/Tech (mentioned)**: `websocket`, `kafka`, `spark`, `hadoop`, `cassandra`, `redis`, `elasticsearch`   
  [Personal note: HDFS-centric Hadoop stacks are less common in 2025; many teams consolidate on lakehouse/object storage with Spark/Flink/Trino—verify for your environment.]  
  [Personal note: Kafka remains solid; managed cloud equivalents can reduce ops if you don’t need advanced features.]

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

## Problem Understanding

- **Original Prompt**: Build a navigation application that, given A→B, returns route(s), distance, ETA, and supports pluggable inputs (traffic, weather, incidents) and organic discovery of roads.   
- **Use Cases**  
  - Turn-by-turn navigation with rerouting on deviation.  
  - Offer multiple routes (minimize time vs. distance).  
  - Ingest and learn from user motion to discover/characterize roads.  
  - Support third-party consumers (e.g., ride-hailing). 
- **Out of Scope**: Full global ground-truth road datasets; perfect prediction of unpredictable events; deep border disputes (noted briefly). 
- **APIs (if discussed)**: High-level interfaces (Map Service for devices/companies) and Area Search (place→lat/long). Exact request/response schemas not stated. 

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

## Requirements & Constraints

**Given in Video**  
- **Functional**  
  - Compute route(s), distance, and ETA for A→B; optional X and Y on arbitrary road points.  
  - Pluggable model: traffic, weather, accidents, construction, closures.  
  - Organic road discovery from user trajectories; classify lane count/one-way over time.  
  - Navigation tracking with deviation alerts and analytics. 
- **Non-Functional**  
  - Always available; seconds-level latency (≈1–3s OK); good-enough accuracy; scale to billions of requests/month. 

**Assumptions**  
- Global multi-region deployment; eventual consistency acceptable for analytics; strong consistency for routing reads within a region. *Assumption.*  
- PII governance (data minimization/retention) required given location history. *Assumption.*

[Ask AI: Requirements and Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

## Back-of-the-Envelope Estimation

*Not stated in video—skipping numerical estimation.* 

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

## High-Level Architecture

- **Clients & Edge**: Mobile/web apps maintain persistent WebSockets to handlers; a WebSocket Manager tracks handler assignments (cache in Redis). AuthN/AuthZ and reverse proxies front the services.   
- **Ingestion & Storage**: Location Service persists user pings to Cassandra and publishes to Kafka. Historical pings land in Hadoop (batch analytics/ML).   
- **Stream Processing**: Spark Streaming calculates average speeds, detects hotspots, identifies candidate new roads, and publishes events; Map Update/Traffic Update apply changes into Graph Processing Service’s stores (Cassandra).   
  [Personal note: Consider Flink for continuous, low-latency pipelines; Spark Structured Streaming also works—choose based on team expertise.]  
- **Search/Geo**: Area Search (Elasticsearch + resolver) turns names/addresses into lat/long.   
- **Routing Plane**: Map Service → Graph Processing Service which builds a reduced graph (via segment exit nodes) and runs the path algorithm; results cached at multiple granularities (junction↔junction, exit↔exit, segment↔segment, mega-segment↔mega-segment).   
  [Personal note: Contraction Hierarchies or Multi-Level Dijkstra typically reduce query time dramatically for road networks.]  
- **Historical ETA**: Queried for day-of-week/hour-of-day backfill when live data is weak.   
- **Rerouting & Telemetry**: Navigation Tracking monitors live positions, alerts on deviation, and emits analytics. 

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

## Deep Dives by Subsystem

### Subsystem: Segment & Mega-Segment Model
- **Role**: Partition the world into 1×1 km “segments” (ID + four corner coordinates); group into “mega-segments” for inter-city/state routing.   
- **Data Model**:  
  - Segment(id, corners, exits[], cached_all_pairs[], cached_exit_pairs[]).  
  - MegaSegment(id, segments[], exits[], cached_exit_pairs[]).   
- **Scaling**: Limit search window using aerial distance heuristic (e.g., ±N segments); recursively rise to mega-segments for long trips.   
- **Caching**: Precompute intra-segment all-pairs shortest paths (e.g., Floyd–Warshall) and cache exit↔exit costs; bubble updates upward on changes.   
  [Personal note: Floyd–Warshall is O(n³); for dense junctions, consider repeated Dijkstra, CH preprocessing, or partition-based APSP.]  
- **Failure/Hotspots**: Recompute when ETA shift exceeds threshold (e.g., +30%); throttle recompute storms. 

[Ask AI: Subsystem - Segments](https://alisol.ir/?ai=Subsystem%20-%20Segments%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

### Subsystem: Graph Processing Service
- **Role**: Owns graph storage and routing; builds reduced graphs from exits; runs pathfinding; returns route + distance + ETA; applies third-party and streaming updates.   
- **Weights**: Base length + nominal time; traffic/weather/roadwork modify average speed → ETA; do **not** bake every factor as new edge weights.   
  [Personal note: Keep the “speed modifiers” pluggable; it avoids re-architecting the core router for each new signal.]  
- **APIs**: Internal to Map Service; cache lookups first; otherwise compute on reduced graph.   
- **Consistency**: Live updates eventually applied; routing queries read the latest regional snapshot. *Assumption.*

[Ask AI: Subsystem - Graph Processing](https://alisol.ir/?ai=Subsystem%20-%20Graph%20Processing%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

### Subsystem: Stream Intelligence (New Roads, Speeds, Hotspots)
- **Role**: Spark Streaming consumes Kafka pings to infer new roads (trajectories), estimate average speed per road, and detect crowd hotspots.   
- **Outputs**: Events into Kafka topics; Map Update/Traffic Update services write to Cassandra via Graph Processing.   
- **ML Add-ons**: Classify lane count and one-way/two-way; vehicle type heuristics from motion patterns. 

[Ask AI: Subsystem - Streaming](https://alisol.ir/?ai=Subsystem%20-%20Streaming%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

### Subsystem: Area Search & Geocoding
- **Role**: Fuzzy search over places (Elasticsearch) and address→lat/long resolution; returns coordinates for routing. 

[Ask AI: Subsystem - Area Search](https://alisol.ir/?ai=Subsystem%20-%20Area%20Search%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

### Subsystem: Navigation Tracking
- **Role**: During guidance, track user vs. planned path; notify on deviation; stream telemetry for ETA accuracy audits and route-choice analytics. 

[Ask AI: Subsystem - Navigation Tracking](https://alisol.ir/?ai=Subsystem%20-%20Navigation%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

## Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
| --- | --- | --- | --- | --- |
| Real-time factors | Edge weights for traffic/weather | Speed modifiers over base weights | **Modifiers** | Keeps routing core stable and pluggable.  |
| Global routing | Single global Dijkstra | Segments/mega-segments + reduced graph | **Segments** | Bound search; cache intra-segment/exit pairs.  |
| Intra-segment APSP | Floyd–Warshall | Repeated Dijkstra / precomputation | **FW in video** | Simplicity for small segments.  |
| Stream engine | Spark Streaming | Flink/others | **Spark in video** | Familiarity; batch ecosystem.  [Personal note: Consider Flink for continuous, low-latency use cases.] |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

## Reliability, Availability, and Performance

- **Availability**: Horizontally scale WebSocket handlers; stateless services behind LBs; Redis for ephemeral mappings.   
- **Performance**: Seconds-level target via reduced graphs + caching; recompute on significant ETA drift.   
- **Backpressure/Throttling**: Kafka buffers spikes; API rate limits per company account. *Partially implied.*   
- **Degradation**: Fall back to historical ETA when live traffic missing. 

[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

## Security & Privacy (if discussed)

- Not explicitly detailed in video; location data implies need for privacy controls, retention policies, and access governance. **Not stated in video** (details). 

[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

## Observability (if discussed)

- Analyze ETA accuracy vs. actuals; route-recommendation acceptance; third-party signal correctness; area search popularity. Logs/metrics/tracing not explicitly specified. 

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

## Follow-up Questions (from interviewer, if any)

- Not modeled as a Q&A interview in the transcript. **Not stated in video**. 

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

## Candidate Questions (if modeled in video)

- Not modeled in the transcript. **Not stated in video**. 

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

## Key Takeaways

- Use segments/mega-segments to bound routing search; cache intra-segment and exit-to-exit costs.   
- Treat traffic/weather/incidents as speed modifiers, not primary edge weights—keeps the router pluggable.   
- Recompute paths when ETA shifts cross a threshold; bubble updates up the hierarchy as needed.   
- Blend live telemetry with historical (DOW/HOD) ETA to withstand data gaps.   
- WebSocket ingestion → Kafka → streaming jobs → graph store is a clean spine for real-time maps.   
- Analytics loops (ETA accuracy, route adoption, third-party signal trust) are critical for quality.   
  [Personal note: For large-scale road graphs, consider Contraction Hierarchies or A* with landmarks to meet tight P99s.]

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

## Glossary

- **Segment**: 1×1 km grid cell with exits and cached intra-segment routes.   
- **Mega-segment**: Aggregation of segments for long-distance routing.   
- **Exit Point**: Junction where roads cross segment boundaries; used to stitch segments.   
- **Reduced Graph**: Graph built from exits (and start/end) across a bounded window for fast routing.   
- **Speed Modifiers**: Traffic/weather/incident signals that change average speed (and thus ETA). 

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

## Study Plan from This Interview (Optional)

- Practice hierarchical routing: segmenting cities, defining exits, and reduced-graph search.  
- Implement a toy router with Dijkstra + A* heuristic; add a traffic “speed modifier” layer.  
- Build a streaming pipeline prototype (pings → Kafka → speed estimates → cache update). *Assumption.*  
  [Personal note: Likely outdated to anchor on HDFS; modernize your lab with object storage and lakehouse engines.]

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CcodeKarle%7CDesign%20Google%20Maps%20System)

---

## Attribution

- Source Video: https://www.youtube.com/watch?v=jk3yvVfNvds  
- Channel: codeKarle  
- Note: This document is a summary of the linked mock interview. 

---

## About the summarizer

I’m **Ali Sol**, a PHP Developer.

- Website: [alisol.ir](https://alisol.ir)  
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
