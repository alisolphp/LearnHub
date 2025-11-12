# System Design Mock Interview: Design Autocomplete for Search Engines | Typeahead Suggestions for Google search

- **System Design Mock Interview**: Design Autocomplete for Search Engines | Typeahead Suggestions for Google search  
- **Channel/Interviewer**: Tushar Roy - Coding Made Simple  
- **Duration**: 00:19:43  
- **Original Video**: https://www.youtube.com/watch?v=us0qySiUsGU  

> *This document summarizes the key content of a system design talk on building an autocomplete (typeahead) system for a search engine. Watching the full video is still worthwhile if you have time.*  

---

## 2) One-Page Executive Summary (2–3 min skim)

**Problem Prompt (One-liner)**  
Design a highly available, low-latency autocomplete (typeahead) system that, given a query prefix, returns the most relevant search suggestions in real time.

**Primary Scope**

- **In scope**
  - Request path from user typing in the search box to receiving autocomplete suggestions.
  - Data model and trie-based indexing of phrases.
  - Distribution of the trie across multiple machines using prefix ranges.
  - Data collection pipeline for (phrase, weight) events.
  - Aggregation and periodic application of phrase weights into the trie.
  - Caching strategies (distributed cache, CDN, client prefetch).

- **Out of scope (explicitly mentioned)**
  - Spell check / spelling correction.
  - Locality-specific results (no per-city/region differences).
  - Personalization using user history or profile.
  - Multi-language support (English only).
  - Details of how the weights are computed or machine learning models.
  - Exact internal implementation of Google/Bing (this is a reasonable design, not “the” design).

**Non-Functional Priorities (stated & implied)**

- **Availability**: System should keep serving autocomplete even with node failures (replication across nodes).
- **Low latency**: Suggestions need to feel instant as the user types (few tens of ms in practice, though no exact SLO is stated).
- **Scalability**: Must support millions/billions of phrases and a very high query rate.
- **Durability**: Autocomplete data (popular phrases) must not be lost on node failure; hence replicated tries + persistent storage (e.g., Cassandra).
- **Freshness**: New/trending queries should surface quickly; hence time-bucketed data and periodic rebuilds.
- **Cost considerations**: Implied rather than explicit—splitting trie ranges and pruning low-weight phrases protects memory and storage.

**Key Constraints & Numbers**

- Explicit numerical constraints (QPS, latency targets, storage size, regions, etc.): **Not stated in video**.

**High-Level Architecture (Text)**

1. **Client (Browser/APP)**: Sends keystroke prefixes to backend as the user types.
2. **Load Balancer**: Distributes incoming autocomplete requests across stateless frontend nodes.
3. **Frontend Autocomplete Service Node**:
   - Checks a **distributed cache** (e.g., Memcached-like) for prefix → suggestions.
   - If cache miss, uses **Zookeeper-like config store** to find which trie shard owns the prefix.
4. **Trie Shard Nodes**:
   - Each node holds an in-memory trie for a specific prefix range.
   - Every trie node stores its children plus top-*K* suggestions for its prefix.
5. **Coordination / Metadata Service (Zookeeper)**:
   - Stores mapping from prefix ranges (e.g., `[a, k)`, `[k, $)`, further subdivided) to groups of trie nodes (for replication).
6. **Data Collection Pipeline**:
   - Streams of `(phrase, weight)` from various sources feed into **aggregator** workers.
7. **Aggregators + Cassandra (or similar NoSQL store)**:
   - Aggregators batch and aggregate phrase weights into a time-bucketed table in a scalable NoSQL store.
8. **Applier Jobs**:
   - Periodically read aggregated data by prefix range, compute updated weights, rebuild tries, and push them into trie shards.
9. **CDN + Client Prefetch (Optimizations)**:
   - Popular prefix results cached at the edge and prefetch of longer prefixes to avoid repeated round-trips.

**Top Trade-offs (3–6 bullets)**

- **Precomputed top-*K* per trie node vs. computing top-*K* at query time**  
  Precomputing makes lookups O(length-of-prefix) but requires heavier background computation and memory at each node.
- **Single huge trie vs. sharded tries by prefix ranges**  
  Single trie is operationally simple but not scalable; sharding improves scalability and durability but adds routing and config complexity.
- **Time-bucketed weights vs. simple cumulative counts**  
  Time buckets allow boosting recent trends; cumulative counts are simpler but can make trending queries slow to surface.
- **Cache/CDN/client-side prefetch vs. always going to the trie cluster**  
  Caching and prefetch reduce latency and backend load but introduce staleness and complexity in cache invalidation.

**Biggest Risks / Failure Modes**

- **Hot prefixes / hot keys**: Very popular prefixes (e.g. “f”, “face”) can overload specific trie shards or cache keys.
- **Coordination/config errors**: Incorrect prefix-range mappings in Zookeeper can cause requests to hit the wrong shard or no shard.
- **Applier failures**: If periodic trie rebuilds fail, autocomplete quality degrades (stale results, missing trends).
- **Cache inconsistency**: Cached results may lag behind new trie dumps; TTL or versioning must be handled carefully.
- **Data skew**: Some letters/ranges may have far more phrases than others, leading to imbalanced shards.

**5-Min Review Flashcards (Q → A)**

1. **Q:** What is the core data structure powering autocomplete?  
   **A:** A trie where each node stores its children and the top-*K* phrases for that prefix.

2. **Q:** Why store top-*K* suggestions at each trie node?  
   **A:** So a request for a prefix can be answered in O(length-of-prefix) without scanning the entire subtree.

3. **Q:** How is the trie distributed across machines?  
   **A:** By splitting the prefix space into lexicographic ranges (e.g. `[a, k)`, `[k, $)`) and mapping each range to a replicated group of trie nodes stored in Zookeeper.

4. **Q:** How does the frontend know which shard to call?  
   **A:** It looks up the prefix in Zookeeper’s configuration to find the owning trie range and its nodes.

5. **Q:** How do we keep autocomplete suggestions up to date with real user behavior?  
   **A:** By collecting `(phrase, weight)` events, aggregating them in time buckets into Cassandra, then periodically rebuilding tries via applier jobs.

6. **Q:** Why is phrase data stored with timestamps (e.g., hourly buckets)?  
   **A:** To allow the ranking algorithm to give more weight to recent activity than to old searches.

7. **Q:** What role does the distributed cache play?  
   **A:** It caches prefix → suggestions so many requests can be served without hitting trie nodes.

8. **Q:** What is the main benefit of using a CDN for autocomplete?  
   **A:** Popular prefixes can be served very close to users, reducing latency and load on data centers.

9. **Q:** What are the two main flows in the system?  
   **A:** Request flow (serving autocomplete queries) and data collection flow (collecting and applying phrase weights).

10. **Q:** Is this design strongly consistent with respect to user behavior?  
    **A:** No, it’s **eventually consistent**; new trends appear after aggregators and applier jobs run.

---

## 3) Interview Tags (for later filtering)

- **Domain/Industry**: `search`
- **Product Pattern**: `search-index`, `caching`, `cdn`
- **System Concerns**: `high-availability`, `low-latency`, `eventual-consistency`, `hot-key`
- **Infra/Tech (mentioned or directly implied)**: `cassandra`, `cdn`, `caching`

---

## 4) Problem Understanding

**Original Prompt (paraphrased)**  
Design an autocomplete feature for a search engine (like Google or Bing) that suggests likely query completions as the user types into the search box.

**Use Cases**

- **Primary**
  - As a user types in the search box (“how does…”, “ba…”, etc.), they see a list of suggested query completions and can either:
    - Select one suggestion, or
    - Keep typing and see updated suggestions.

- **Secondary**
  - Support huge vocabularies (millions/billions of possible phrases).
  - Keep suggestions in sync with evolving user search behavior (e.g., news, trends).

**Out of Scope (explicitly)**

- Spell-check/spelling correction while typing.
- Locality-based suggestions (no difference between, e.g., Seattle vs. London).
- Personalization using user profile/history.
- Non-English languages.

**APIs (from the video)**

- **Request (Autocomplete Service)**
  - Input: `prefix` (string).
  - Output: `list<phrase>` (top-*K* autocomplete suggestions for that prefix).

- **Data Collection Ingest**
  - Input: `(phrase, weight)` events from background systems.
  - Output: A stream into the aggregation system (details of transport not specified).

Any more specific schema (e.g., JSON structure, HTTP method, error handling): **Not stated in video**.

---

## 5) Requirements & Constraints

### Given in Video

**Functional Requirements**

- Given a prefix, return a ranked list of autocomplete suggestions.
- Suggestions should be based on phrases and their popularity/weights.
- System must support:
  - A request flow for live queries.
  - A data collection flow that aggregates phrase weights and updates the trie.

**Non-Functional Requirements**

- **Availability**: Multiple replicas of trie data so a single node failure doesn’t break autocomplete.
- **Low latency**: Autocomplete must feel instant; implemented via:
  - Precomputed top-*K* in trie nodes.
  - In-memory tries.
  - Distributed caching, and optionally CDN and client-side caching.
- **Scalability**:
  - Support up to millions/billions of phrases.
  - Shard the trie across ranges as the dataset grows.
- **Durability**:
  - Persistent storage of aggregated phrase weights (Cassandra).
  - Replication of trie data across multiple nodes.
- **Freshness / eventual consistency**:
  - New data is collected continuously but applied periodically; suggestions converge to recent data over time.

**Capacity Inputs (explicit)**

- QPS, exact latency SLOs, data size, regions, etc.: **Not stated in video**.

### Assumptions (clearly labeled)

- **Assumption**: The number of suggestions per prefix (*K*) is moderate (e.g., 5–10), making it reasonable to store them per trie node.
- **Assumption**: Trie nodes, shard nodes, and aggregators are deployed across multiple machines/zones for fault tolerance beyond what’s mentioned.

---

## 6) Back-of-the-Envelope Estimation

*Not stated in video—skipping numerical estimation.*

---

## 7) High-Level Architecture

**Components & Data Flow**

1. **Client (Browser/App)**
   - Sends keystroke prefixes to backend as the user types.

2. **Load Balancer**
   - Distributes incoming autocomplete requests across multiple frontend nodes (e.g., round-robin).

3. **Frontend Autocomplete Service**
   - Receives `prefix`.
   - Looks up `prefix` in a **distributed cache** (memcache-like) for recently computed suggestions.  
     *Personal note: Many teams in 2025 standardize on Redis for distributed caching instead of Memcached due to richer data structures and strong ecosystem support, but either works for simple key-value results.*
   - On **cache hit**: returns suggestions directly to client.
   - On **cache miss**:
     - Consults **Zookeeper** to find which trie range/shard is responsible for the prefix.
     - Calls one of the trie shard nodes (replicas) for that range.

4. **Coordination / Config Store (Zookeeper)**
   - Maintains the mapping from prefix ranges to sets of trie shard nodes.
   - Example mappings:
     - Initially: `[a, $)` → `{T1, T2, T3}`.
     - Later splits: `[a, k)` → `{T1, T2, T3}`, `[k, $)` → `{T4, T5, T6}`, etc.
   - Supports **many reads** and relatively **few writes** (only when splitting ranges).

5. **Trie Shard Nodes**
   - Each shard holds a trie for its assigned prefix range.
   - Trie nodes:
     - Store children edges (standard trie).
     - Store top-*K* autocomplete terms for that prefix.
   - On query:
     - Traverse down the trie according to prefix characters.
     - Return the stored top-*K* suggestions from the node corresponding to that prefix.

6. **Distributed Cache**
   - Stores prefix → suggestion list for recent or popular prefixes.
   - Filled by frontend nodes after they query trie shards.

7. **Data Collection Pipeline**
   - Accepts `(phrase, weight)` events from search logs, news, etc.
   - Uses **aggregator workers** to batch and aggregate these events.

8. **Aggregators & Cassandra (or similar NoSQL)**
   - Each aggregator:
     - Receives events for a subset of phrases based on hashing.
     - Maintains temporary in-memory counters.
     - Periodically flushes aggregated sums into Cassandra.
   - Cassandra table holds:
     - `phrase`
     - `time` (e.g., hourly bucket)
     - `sum_of_weights` for that phrase and time bucket.

9. **Applier Jobs**
   - One applier per prefix range (e.g., `[a, bc)`, `[bc, k)`, `[k, $)`).
   - Periodically (e.g., every 15–30 minutes):
     - Reads all phrases in its range from Cassandra.
     - Applies a time-aware weighting formula to compute current weights.
     - Builds a new trie with updated top-*K* per node.
     - Pushes the new trie into each shard in that range (replicas).

10. **CDN & Client Prefetch (Optimizations)**
    - CDN: cache popular prefixes near users by region.
    - Client prefetch:
      - When serving prefix “ba”, also return suggestions for “bat”, “bal”, etc.
      - Store these in the client so subsequent keystrokes don’t always hit backend.

---

## 8) Deep Dives by Subsystem

### 8.1 Subsystem: Request Flow

**Role & Responsibilities**

- Serve autocomplete suggestions for a given prefix with very low latency.
- Handle high read QPS reliably.
- Provide resilience via replication and caching.

**Data Model**

- Request/response only:
  - Input: `prefix`.
  - Output: `list<phrase>` (top-*K* suggestions).
- No persistent data is written directly by this subsystem; it relies on trie and cache.

**Flow**

1. Client sends `prefix` to load balancer.
2. Load balancer forwards to a frontend node.
3. Frontend checks distributed cache for `prefix`:
   - On hit: returns suggestions.
   - On miss:
     - Queries Zookeeper for responsible trie range and its nodes.
     - Picks one trie node (replica) and sends `prefix`.
4. Trie node:
   - Traverses trie for characters in `prefix`.
   - Reads top-*K* suggestions from node.
   - Returns them.
5. Frontend:
   - Stores result in distributed cache for `prefix`.
   - Returns suggestions to client (displayed in dropdown).

**Scaling & Partitioning**

- Frontend nodes are stateless; scale horizontally behind load balancer.
- Cache layer is distributed; keys are the prefixes themselves.
- Actual partitioning of data is delegated to trie nodes via prefix ranges.

**Caching Strategy**

- Distributed cache:
  - Key: `prefix`.
  - Value: list of suggestions.
  - TTL: **Not stated in video** (assumed reasonably short).
- Client prefetch:
  - Optionally, fetch suggestions for likely next prefixes in one shot.

**Consistency Model**

- Cache is eventually consistent with trie contents.
- Trie contents are eventually consistent with aggregated data in Cassandra.

**Bottlenecks & Hot Keys**

- Very common prefixes (“a”, “b”, “ba”, etc.) can become hot keys.
- Mitigations:
  - Strong cache utilization (fewer hits to trie).
  - Possibly more aggressive prefetch / CDN use.

**Failure Handling**

- If a trie node is down:
  - Frontend can choose another replica for same prefix range.
- If cache is down:
  - All requests go to trie; higher latency but still correct.
- If Zookeeper is temporarily unavailable:
  - Range lookup fails; request may fail or need retry (details not specified).

**Cost Considerations**

- Cache and trie memory grows with number of prefixes and suggestions.
- Sharding and pruning low-weight phrases help control memory usage.

---

### 8.2 Subsystem: Data Collection & Aggregation

**Role & Responsibilities**

- Collect raw `(phrase, weight)` events from multiple sources.
- Aggregate and store time-based statistics per phrase.
- Provide the applier jobs with enough data to compute rankings.

**Data Model (Cassandra Example)**

- Table columns:
  - `phrase` (partition / clustering key).
  - `time` (e.g., hourly bucket).
  - `sum_of_weights` (aggregated weight for that phrase in that hour).

**Flow**

1. Data collection system receives a continuous stream of `(phrase, weight)` events.
2. A hashing scheme (consistent hashing or modulo-based) routes each event to an **aggregator** instance responsible for that phrase.
3. Aggregators:
   - Maintain in-memory counters for phrases over a time window.
   - At periodic intervals (e.g., every 2–5 minutes or upon reaching threshold):
     - Flush aggregated weights into Cassandra:
       - Locate row `(phrase, time_bucket)` and add to `sum_of_weights`.
4. Once a day (or after a period passes):
   - System can aggregate hourly data into daily data and delete older hourly rows to save space.
5. Additional optimizations:
   - If a phrase’s total weight is below a threshold, drop it entirely as it is unlikely to appear among top-*K* suggestions.

**Why Time-based Storage?**

- It allows giving **more weight to recent activity**.
- Appliers can decide to prioritize last few hours/days over older data.

**Scaling & Partitioning**

- Aggregators scale horizontally; each handles a subset of phrases.
- Cassandra itself is horizontally scalable and good for large write volumes.

**Caching Strategy**

- No caching in this subsystem beyond aggregator in-memory buffers.

**Consistency Model**

- Eventual consistency:
  - Events → aggregator memory → Cassandra → trie appliers → trie nodes.
  - There is a natural delay between user behavior and its influence on suggestions.

**Bottlenecks & Hot Keys**

- Very popular phrases can dominate a single aggregator.
- Hashing by phrase may require careful tuning to avoid skew (not deeply discussed in video).

**Failure Handling**

- If aggregator crashes:
  - In-memory data for current window may be lost (not deeply addressed).
- If Cassandra is unavailable:
  - Aggregators may need to buffer or fail writes (not discussed).

**Cost Considerations**

- A lot of time-series data; pruning:
  - Old data beyond a horizon.
  - Low-weight phrases.

---

### 8.3 Subsystem: Trie Storage & Sharding

**Role & Responsibilities**

- Store autocomplete data in memory in a way that supports:
  - Fast prefix lookup.
  - Distributed storage across many machines.
  - Replication for availability.

**Data Model**

- **Trie node**:
  - Children: mapping from character → child node.
  - `top_k_terms`: array/list of the top-*K* phrases (strings) for that prefix.

**Scaling & Partitioning**

- **Initial design**:
  - Entire trie fits in memory on one node; replicate across 3 nodes `{T1, T2, T3}` for availability.
- **Sharded design**:
  - Split the lexicographic range into segments, e.g.:
    - `[a, k)` → `{T1, T2, T3}`
    - `[k, $)` → `{T4, T5, T6}`
  - Later:
    - `[a, bc)` → `{T1, T2, T3}`
    - `[bc, k)` → `{T7, T8, T9}`
    - `[k, $)` → `{T4, T5, T6}`
  - These mappings live in Zookeeper and can be refined over time.

**Caching Strategy**

- Trie nodes themselves hold `top_k_terms` for each prefix, effectively acting as a structured in-memory cache over underlying data.

**Consistency Model**

- Applier rebuilds are periodic:
  - Trie snapshots are updated in batches.
  - During rebuilds, system is eventually consistent with respect to new data.
- Replicas hold the same trie for a given range.

**Bottlenecks & Hot Keys**

- Popular ranges (e.g., prefixes starting with certain letters) may require:
  - Further partitioning.
  - More replicas for that range.

**Failure Handling**

- If a trie node (T*) is lost:
  - Other replicas can continue serving the same range.
- Rebuilding / replacing nodes is possible by reloading trie from the applier’s latest version.

**Cost Considerations**

- Memory footprint grows with number of phrases and `K`.
- Splitting ranges and pruning low-weight phrases help keep tries within manageable size.

---

## 9) Trade-offs & Alternatives

| Topic                                           | Option A (from video)                                          | Option B (from video or implied)                                      | Video’s Leaning     | Rationale (from video)                                                                 |
| ---------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------- | -------------------------------------------------------------------------------------- |
| How to find top-*K* suggestions for a prefix   | Store `top_k_terms` at each trie node                         | Compute top-*K* by scanning entire subtree on each request            | Option A            | Avoids walking the whole subtree, so latency is O(length-of-prefix).                  |
| Storing phrase popularity                      | Time-bucketed weights (hourly/daily)                          | Single cumulative count per phrase                                    | Option A            | Time allows giving more weight to recent events vs. old ones.                         |
| Trie deployment                                | Single trie replicated across a few nodes                     | Multiple tries sharded by prefix ranges                               | Sharded (as it scales) | Single trie is okay early (small data), but sharding is needed as data grows.      |
| Config / metadata storage                      | Zookeeper for prefix ranges → node mappings                   | Hard-coded configs or app-level mapping                               | Zookeeper           | Zookeeper supports many reads, few writes, and high availability.                     |
| Serving requests                               | Cache → trie → persistent data (multi-layer approach)         | Always hit trie (no cache/CDN)                                        | Cache + trie        | Cache/CDN reduces latency and load; trie only might be too slow or expensive.         |
| Handling trending vs. long-term popularity     | Combine weights with time-decay / more weight to recent data  | Treat all historical data equally                                     | Time-weighted       | To surface current/trending topics more prominently than old spikes.                  |

---

## 10) Reliability, Availability, and Performance

**Replication & Availability**

- Trie ranges are replicated across multiple nodes (e.g., 3 per range).
- If one node fails, others still serve the range.
- Zookeeper is used as a highly available source of mapping configs.

**Latency Budget (Qualitative)**

- **Main contributors**:
  - Network hop from client to frontend.
  - Cache lookup (ideally in-memory, very fast).
  - Possibly one network hop to trie node, plus O(length-of-prefix) traversal.
- CDN and client prefetch can further reduce observed latency.

**Backpressure & Throttling**

- Not explicitly discussed in the video.

**Load Shedding & Graceful Degradation**

- Not explicitly discussed; but:
  - Loss of cache/CDN leads to higher latency but not total failure.
  - Failure in appliers leads to stale suggestions rather than total outage.

**Disaster Recovery (RPO/RTO)**

- Not specified (beyond replication).

---

## 11) Security & Privacy

- Authentication/authorization for internal services: **Not stated in video**.
- Protection of user PII: **Not stated in video**.
- Abuse/spam prevention: **Not stated in video**.

---

## 12) Observability

- Metrics, logging, tracing, alerting, canaries, etc.: **Not stated in video**.

---

## 13) Follow-up Questions (from interviewer)

- This is a talk-style video, not a Q&A mock, so **no explicit interviewer follow-ups** are present.

---

## 14) Candidate Questions (if this were an interview)

These are **not** from the video, but are natural questions a candidate might ask.  
(If you prefer to stick strictly to the video, you can skip this section.)

- **Clarification on scale**: “Roughly how many autocomplete queries per second and how many unique phrases do we expect?”
- **Latency goal**: “What’s the target latency budget for suggestions per keystroke?”
- **Freshness expectations**: “How quickly should trending queries start appearing in autocomplete?”
- **Failure tolerance**: “What happens if Zookeeper or Cassandra are temporarily unavailable?”
- **Ranking details**: “Is the ranking purely click/usage-based, or are there ML models involved?”

---

## 15) Key Takeaways

1. **Autocomplete is more than “just a trie”**: you need both a fast request path and a robust data collection pipeline.
2. **Storing top-*K* suggestions at each trie node** makes queries very fast, at the cost of heavier background processing.
3. **Sharding by prefix ranges** (e.g. `[a, k)`, `[k, $)`) is a natural way to distribute trie data across machines.
4. **Zookeeper-style coordination** is useful for maintaining the mapping between prefix ranges and shard nodes.
5. **Data collection is continuous, but trie updates are batched**, leading to eventual (not immediate) reflection of user behavior.
6. **Time-bucketed phrase weights** enable the system to prioritize recent trends over old spikes.
7. **Caching at multiple levels** (distributed cache, CDN, client prefetch) is essential to keep latency low under heavy load.
8. **Pruning low-weight phrases and old data** keeps the trie and storage from growing without bound.
9. **Availability comes from replication**—each prefix range is backed by multiple trie nodes.

---

## 16) Glossary

- **Autocomplete / Typeahead**: Feature that suggests queries as the user types a prefix.
- **Trie**: Tree-like data structure where each edge represents a character; paths from root to nodes represent prefixes/words.
- **Prefix range**: A lexicographic interval over strings (e.g. strings starting with letters between `a` and `k`).
- **Top-*K***: The K highest-ranked items according to some scoring function.
- **Zookeeper**: A distributed coordination service often used to store configuration and metadata for distributed systems.
- **Distributed cache**: A cache layer spread across multiple machines, used to store frequently accessed data in memory.
- **CDN (Content Delivery Network)**: Geographically distributed servers that cache content close to users to reduce latency.
- **Aggregator**: A worker that receives raw events and aggregates them (e.g., sums weights per phrase per time bucket).
- **Cassandra**: A distributed NoSQL database used for storing large volumes of time-series or key-value data (in this design, phrase statistics).

---

## 17) Attribution

- **Source Video**: https://www.youtube.com/watch?v=us0qySiUsGU  
- **Channel**: Tushar Roy - Coding Made Simple  
- **Note**: This document is a summary of the linked system design talk. All design details are taken from the video unless explicitly labeled as an assumption or personal note.

---

## 18) About the summarizer

I’m *Ali Sol*, a PHP developer. Learn more:

- Website: https://alisol.ir  
- LinkedIn: https://www.linkedin.com/in/alisolphp

