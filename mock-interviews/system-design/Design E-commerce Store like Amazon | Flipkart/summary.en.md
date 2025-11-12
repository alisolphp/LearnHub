# System Design Mock Interview: Design E-commerce Store like Amazon | Flipkart  
- **Channel:** codeKarle
- **Duration:** 00:32:36
- **Original Video:** https://www.youtube.com/watch?v=EpASu_1dUdE  

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.*

---

## One-Page Executive Summary (2–3 min skim)

- **Problem Prompt (one-liner):** Design an e-commerce platform similar to Amazon/Flipkart supporting search, serviceability (can we deliver and when), cart/wishlist, checkout and orders history.
- **Primary Scope:**  
  - *In-scope:* Home/search flows; serviceability & ETA; catalog; cart/wishlist; checkout & payments integration (at a high level); order lifecycle; recommendations; notifications; analytics; archival of historical orders.  
  - *Out-of-scope:* Deep payment gateway internals; logistics algorithms in depth (only interfaces/caching); fine-grained security/compliance details.
- **Non-Functional Priorities:**  
  - Low latency for user-facing flows; high availability for search/browsing; high consistency for inventory and payments; scalable analytics/recommendations.
- **High-Level Architecture:**  
  1) Inbound/Supplier → Kafka;  
  2) Item Service (catalog, MongoDB);  
  3) Search Consumer → Elasticsearch; Search Service APIs;  
  4) Serviceability & TAT Service (precomputed, cached);  
  5) User Service (MySQL + Redis cache);  
  6) Wishlist & Cart Services (MySQL);  
  7) Order Management (Order Taking/Processing in MySQL, Inventory locking, Payment Service, Redis TTL for pending orders, Reconciliation);  
  8) Event streams (Kafka) → Spark streaming → Hadoop + Recommendation Service (Cassandra) → Home/category recommendations;  
  9) Archival to Cassandra via Historical Orders;  
  10) Notifications abstraction (SMS/Email/etc.).
- **Top Trade-offs:**  
  - Availability vs consistency: search highly available; inventory & payments strongly consistent.  
  - Rich text search (Elasticsearch) vs relational queries (MySQL) for catalog facets.  
  - Operational simplicity vs scale elasticity across MySQL/Cassandra/ES/Kafka/Spark.  
  - Precompute serviceability vs runtime pathfinding (latency vs freshness).
- **Biggest Risks/Failure Modes:**  
  - Oversold inventory under race conditions; payment–timeout races; stale serviceability cache; ES index lag; MySQL becoming a write hotspot; reconciliation drift.
- **5-Min Review Flashcards:**  
  - Q: Why MongoDB for items? A: Heterogeneous attributes per category, flexible schema.  
  - Q: Why Elasticsearch for search? A: Full-text, filters, fuzzy, relevance.  
  - Q: Where is strong consistency required? A: Inventory count & order state transitions.  
  - Q: How do we handle payment no-response? A: Redis TTL + expiry callback → cancel + inventory rollback.  
  - Q: How do recommendations get built? A: Kafka events → Spark/Hadoop → Recommendation Service (Cassandra).  
  - Q: How do we keep MySQL small? A: Archival of terminal orders to Cassandra.  
  - Q: How does search hide undeliverable items? A: Search Service consults Serviceability/TAT and filters results.  
  - Q: What prevents negative stock? A: DB constraint on inventory count + transactional decrement.  
  - Q: How do we fan out notifications? A: Notification Service abstraction for channels.  
  - Q: How do we merge order history? A: Live (Processing) + Historical service → consolidated Orders View.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

---

## Interview Tags (for later filtering)

- **Domain/Industry:** `ecommerce`, `search`, `payments`, `analytics`, `maps`
- **Product Pattern:** `search-index`, `recommendation`, `notification`, `queue`, `job-scheduler`, `caching`
- **System Concerns:** `high-availability`, `low-latency`, `eventual-consistency`, `autoscaling`
- **Infra/Tech (mentioned):** `microservices`, `kafka`, `mysql`, `mongodb`, `cassandra`, `redis`, `hdfs`, `spark`, `elasticsearch`
  - *[Personal note: Kafka still fits well here, but managed cloud alternatives (e.g., vendor pub/sub) can reduce ops in 2025—verify for your stack.]*  
  - *[Personal note: Consider OpenSearch or current Elasticsearch versions; licensing and operability differ—choose based on org constraints.]*

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

---

## Problem Understanding

- **Original Prompt:** Build an Amazon/Flipkart-like platform where users search products, see deliverability/ETA, add to cart/wishlist, checkout, and view order history.
- **Use Cases:**  
  - Search & filter products; show deliverability & TAT for user address/pincode.  
  - Add to wishlist/cart; checkout and pay.  
  - View live and historical orders; receive notifications for status changes.  
  - Suppliers onboard items; system ingests catalog updates continuously.
- **Out of Scope:** Payment gateway internals; deep logistics routing logic (only referenced for precomputation/caching).
- **APIs (discussed at a high level):** Search (text/filter); Item Service (CRUD, bulk get); User (get/update with Redis cache); Wishlist/Cart (add/get/delete); Order services (create, update status); Serviceability/TAT (deliverable? ETA); Recommendations (get by user/category); Notifications (send).

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

---

## Requirements & Constraints

### Given in Video
- **Functional:** Search; serviceability & TAT on search page; wishlist; cart; checkout; payments success/failure/timeout handling; order history; notifications; recommendations; supplier inbound.
- **Non-Functional:**  
  - Low latency for user pages;  
  - High availability for search;  
  - High consistency for inventory counters & order state;  
  - Scalable analytics and storage (archival strategy).
- **Consistency Strategy:**  
  - Inventory & orders: strong consistency/transactions (MySQL).  
  - Search & recommendations: eventually consistent, highly available.

### Assumptions (conservative)
- Regional deployment with separate warehouse catalogs per region.
- Read-heavy search; write-sensitive inventory; eventual consistency acceptable for search listings and recommendations.
- Background jobs maintain indices, caches, and archives.  
  - *[Personal note: If strict, near-real-time serviceability freshness is needed, add a lightweight invalidation channel from Warehouse/Logistics to Serviceability cache.]*

[Ask AI: Requirements and Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

---

## Back-of-the-Envelope Estimation

*Not stated in video—skipping numerical estimation.*

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

---

## High-Level Architecture

- **Clients & Edge:** Web/mobile → AuthN/AuthZ + reverse proxy layer.
- **Supplier Ingestion:** Inbound Service aggregates supplier feeds → publishes item events to Kafka.
- **Catalog:** Item Service (source of truth; MongoDB) with CRUD + bulk-get APIs.
- **Search:** Search Consumer writes to Elasticsearch; Search Service exposes search/filter/fuzzy APIs; consults Serviceability/TAT and User Service (default address).
  - *[Personal note: Consider vector/semantic search augmentation for recall; maintain classic keyword + filters for precision.]*  
- **Serviceability & TAT:** Precomputed matrix (warehouses × pincodes), cached; returns deliverable? and ETA; periodically refreshed from Warehouse/Logistics data.
  - *[Personal note: For dynamic SLAs, add a fast path for carrier outages or weather alerts to invalidate affected routes.]*  
- **User Profile:** User Service on MySQL with Redis cache (read-through pattern).
- **Wishlist & Cart:** Separate services/databases (MySQL) to scale independently; emit events for analytics/recs.
- **Order Management:**  
  - Order Taking (create order in MySQL, status=CREATED); write (orderID, expiry) to Redis.  
  - Inventory Service decrements with DB constraint (no negatives).  
  - Payment Service abstraction handles gateways → success/failure/no-response.  
  - Reconciliation Service checks inventory/order parity; expiry callback cancels timed-out orders and restores stock.
  - *[Personal note: Redis keyspace notifications are approximate; for precise timers, use a dedicated scheduler or delayed queue (e.g., a jobs system) and idempotent handlers.]*  
- **Streams & Analytics:** Kafka events → Spark streaming → reports + Hadoop data lake → batch ML (ALS) → Recommendation Service (Cassandra) per user & per category.  
  - *[Personal note: Many teams now use lakehouse formats (Iceberg/Delta) and may prefer Flink/Spark Structured Streaming—verify with your data platform.]*  
  - *[Personal note: Two-tower or deep retrieval recommenders often outperform plain ALS in 2025 for large catalogs—evaluate for your traffic.]*  
- **Search De-listing:** Inventory out-of-stock event triggers removal from ES index.
- **Archival:** Orders that reach terminal states (DELIVERED/CANCELLED) → Archival Service moves from MySQL to Cassandra via Historical Orders; deletes originals post-replication.
  - *[Personal note: Consider managed, horizontally scalable OLTP (e.g., cloud MySQL with read/write splitting) and/or region sharding before moving to a second datastore.]*  
- **Notifications:** Unified service for SMS/Email/etc. on key events.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

---

## Deep Dives by Subsystem

### 8.1 Item Service (Catalog; MongoDB)
- **Role:** Source of truth for item metadata; heterogeneous attributes per category.  
- **Data Model:** Item(id, name, description, category, attributes:{…}, status, seller, warehouseRefs…).  
- **APIs:** Get by ID; Bulk get; Add/Update/Delete item.  
- **Scaling:** Partition by item ID/category; read-heavy via cache or ES for search use.  
- **Consistency:** Strong for writes within service; downstream ES eventually consistent.

[Ask AI: Subsystem - Item Service](https://alisol.ir/?ai=Subsystem%20-%20Item%20Service%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

### 8.2 Search (ES + Search Service)
- **Role:** Full-text and filtered product discovery; integrates serviceability filtering.  
- **Data Model:** ES index with tokenized fields; attributes mapped for filtering; stock flags.  
- **APIs:** Query string + filters; pagination; sort.  
- **Consistency:** Eventual; updates via Kafka consumers.  
- *[Personal note: Keep hot shards balanced; monitor high-cardinality fields.]*

[Ask AI: Subsystem - Search](https://alisol.ir/?ai=Subsystem%20-%20Search%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

### 8.3 Serviceability & TAT
- **Role:** Determine deliverability and ETA given user pincode and warehouses.  
- **Approach:** Offline precomputation (MxN pin/warehouse combos), cached; query is read-only and fast.  
- **Refresh:** Periodic sync from Warehouse/Logistics; cached graph of routes/capabilities.

[Ask AI: Subsystem - Serviceability and TAT](https://alisol.ir/?ai=Subsystem%20-%20Serviceability%20and%20TAT%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

### 8.4 User Service (MySQL + Redis)
- **Role:** User profile, default address lookup for serviceability checks.  
- **Cache Strategy:** Read-through (Redis first, then MySQL; populate on miss).  
- **Consistency:** Eventual between cache and DB.

[Ask AI: Subsystem - User Service](https://alisol.ir/?ai=Subsystem%20-%20User%20Service%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

### 8.5 Wishlist & Cart (MySQL)
- **Role:** Add/get/delete items; signals for recommendations.  
- **Scaling:** Separate hardware to scale independently; emit events to Kafka.

[Ask AI: Subsystem - Wishlist and Cart](https://alisol.ir/?ai=Subsystem%20-%20Wishlist%20and%20Cart%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

### 8.6 Order Management (MySQL + Redis + Payment)
- **Flow:**  
  1) Create order (status=CREATED) → write (orderID, expiry) to Redis.  
  2) Inventory decrement (DB constraint prevents negatives).  
  3) Payment Service → success/failure/no-response.  
  4) On success: mark PLACED; publish event.  
  5) On failure: cancel order + restore inventory; reconcile.  
  6) On no-response: Redis expiry callback → cancel + restore inventory.  
  - *[Personal note: Prefer idempotent order state machine with outbox/inbox to guard against duplicate events.]*

[Ask AI: Subsystem - Order Management](https://alisol.ir/?ai=Subsystem%20-%20Order%20Management%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

### 8.7 Recommendations (Kafka → Spark/Hadoop → Cassandra)
- **Signals:** Searches, wishlist/cart events, orders.  
- **Models:** Collaborative filtering (ALS); similar-user and similar-item logic; per user and per category lists stored for fast retrieval.  
  - *[Personal note: Also evaluate retrieval+ranking pipelines (e.g., two-tower retrieval + lightweight ranker) to improve CTR in 2025.]*

[Ask AI: Subsystem - Recommendations](https://alisol.ir/?ai=Subsystem%20-%20Recommendations%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

### 8.8 Archival & Historical Orders (Cassandra)
- **Role:** Move terminal orders out of OLTP to scalable store.  
- **Process:** Archival service queries current orders, inserts into historical store, verifies replication, then deletes from OLTP.  
- **Queries:** By order ID, by user ID, by seller; limited patterns suit Cassandra.

[Ask AI: Subsystem - Archival and Historical Orders](https://alisol.ir/?ai=Subsystem%20-%20Archival%20and%20Historical%20Orders%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

### 8.9 Notifications
- **Role:** Abstraction over SMS/Email etc.; triggered on key order and system events.

[Ask AI: Subsystem - Notifications](https://alisol.ir/?ai=Subsystem%20-%20Notifications%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

---

## Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale |
| --- | --- | --- | --- | --- |
| Catalog Store | MongoDB | Relational + EAV | MongoDB | Flexible per-category attributes. |
| Search | Elasticsearch | SQL + LIKE | Elasticsearch | Full-text, filters, fuzzy support. |
| Inventory Consistency | MySQL tx + constraint | Eventual + retries | MySQL tx | Prevents negative stock. |
| Serviceability Calc | Precompute cache | On-the-fly pathfinding | Precompute | Latency & predictability. |
| Orders OLTP | Single MySQL cluster | Sharded or cloud OLTP | Single + archival | Simpler, then offload historical. *[Personal note: Evaluate sharding/managed OLTP earlier if growth is steep.]* |
| Historical Store | Cassandra | Keep all in MySQL | Cassandra | Limited query shapes, large volume. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

---

## Reliability, Availability, and Performance

- **Consistency Zones:** Strong for inventory/order; eventual for search/recs.  
- **Race Handling:** Payment success vs TTL expiry → delete TTL on success/failure; on late success after expiry: refund or create new order and mark placed.  
- **Reconciliation:** Periodic verification of inventory vs orders; retry-safe/idempotent updates.  
- **Performance:** Cached serviceability; Redis cache for user reads; ES for search; bulk item reads from Item Service.

[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

---

## Security & Privacy *(limited in video)*

- AuthN/AuthZ at edge; PII in User Service; payments via external gateways; notifications abstracted. *Not deeply discussed.*

[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

---

## Observability *(limited in video)*

- Track search queries, conversion, inventory anomalies, payment outcomes; streaming metrics for “top items/category revenue” dashboards. *Details not expanded.*

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

---

## Follow-up Questions (from interviewer, if any)

- Not stated in video.

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

---

## Candidate Questions (if modeled)

- Not stated in video.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

---

## Key Takeaways

- Separate availability and consistency concerns by domain (search vs inventory).  
- Precompute serviceability to keep search fast; refresh from Warehouse/Logistics.  
- Use MySQL transactions + constraints for inventory correctness.  
- TTL-based order holds require careful race handling and idempotency. *[Personal note: Prefer an outbox pattern and durable delayed jobs for predictability at scale.]*  
- Stream events early; recommendations and reporting benefit from all user signals.  
- Archive terminal orders to keep OLTP lean; query historical via Cassandra.  
- Keep ES index in sync with inventory events to avoid surfacing out-of-stock items.  
- Use bulk APIs for catalog to minimize chattiness.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

---

## Glossary

- **Serviceability/TAT:** Whether an item can be delivered to a pincode and how soon.  
- **ALS:** Alternating Least Squares collaborative filtering for recommendations.  
- **Terminal Order State:** Order no longer mutates (DELIVERED/CANCELLED).  
- **Reconciliation:** Periodic process aligning inventory records with actual orders.  
- **TTL Expiry Callback:** Hook when a Redis key expires, used here to time out pending orders.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

---

## Study Plan from This Interview *(Optional)*

- Practice modeling “consistency vs availability” per subsystem.  
- Drill inventory race scenarios and idempotent state transitions.  
- Build a small ES index from a mock catalog; wire a serviceability cache.  
- Implement an order hold with TTL + a precise delayed job as a comparison.

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart)

---

## Attribution

- **Source Video:** https://www.youtube.com/watch?v=EpASu_1dUdE  
- **Channel:** codeKarle  
- **Note:** This document is a summary of the linked mock interview.

---

## About the summarizer

I’m *Ali Sol*, a PHP Developer.

- Website: [alisol.ir](https://alisol.ir)  
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
