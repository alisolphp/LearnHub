# System Design Mock Interview: Design Instagram

- **Channel/Interviewer**: Not stated in video  
- **Duration**: 00:31:09  
- **Original Video**: https://www.youtube.com/watch?v=VJpfO6KdyWE

> This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.

---

## One-Page Executive Summary (2–3 min skim)

- **Problem Prompt (One-liner)**: Build a scalable, reliable, reduced-scope Instagram that supports photo upload, following, and a news feed.
- **Primary Scope**:  
  - **In-scope**: mobile photo uploads; follow graph; feed generation; storage of photo metadata; scalable read-heavy serving; caching; load balancing; object storage; basic capacity planning.  
  - **Out-of-scope**: comments/likes, advanced ranking/recommendations, full privacy model, search, analytics, stories, videos, ads.
- **Non-Functional Priorities**: High read throughput, low-latency feed reads, reliable media storage, horizontal scalability.
- **Key Constraints & Numbers (from video)**:  
  - Target **10M monthly active users (MAU)**.  
  - Average **2 photos/user/month**, ~**5 MB** each → ~**100 TB/month**, ~**1.2 PB/year**.  
  - Read-heavy usage; many more feed reads than uploads.
- **High-Level Architecture (Text)**:  
  1) Mobile clients → API (behind a load balancer).  
  2) Split **read** and **write/upload** services.  
  3) **Relational DB** for metadata (users, photos, followers) + **read replicas**.  
  4) **Distributed object storage** (e.g., S3) for images; DB stores paths/URLs.  
  5) **CDN** in front of object storage for low-latency image delivery.  
  6) **Distributed cache** (e.g., Redis) to serve hot reads and precomputed feeds.  
  7) **Feed generation service** (periodic) writes to feed cache.
- **Top Trade-offs**:  
  - RDBMS vs NoSQL for relational access patterns.  
  - Precomputed feed vs on-demand computation.  
  - Cache freshness vs complexity of invalidation.  
  - Monolith first vs early microservices split along read/write paths.
- **Biggest Risks/Failure Modes**:  
  - Hot keys (celebrity feeds) overloading cache/database.  
  - Cache inconsistency on writes/invalidations.  
  - Object store latency without CDN.  
  - Read-replica lag causing stale feeds.

**5-Min Review Flashcards**
- Q: Why a relational DB?  
  A: Strongly relational entities (users/photos/follows) and frequent joins for “photos by user” and “follow graph” queries.
- Q: Where are images stored?  
  A: Distributed object storage; DB holds the reference path/URL.  
  [Personal note: Favor signed, short-lived URLs to object storage for direct client downloads to reduce backend load.]
- Q: Why read replicas?  
  A: Read-heavy system; replicas scale reads independently from writes.
- Q: Why a separate feed generation service?  
  A: Precompute to avoid per-request heavy fan-out and to meet latency goals.
- Q: What’s the role of CDN?  
  A: Reduce latency and egress cost by caching images close to users.
- Q: How to keep cache fresh on writes?  
  A: Write-through or write-back policies with targeted invalidations.  
  [Personal note: Prefer write-through + explicit key invalidation for simpler correctness in distributed caches.]

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

## Interview Tags (for later filtering)

- **Domain/Industry**: `social-media`
- **Product Pattern**: `feed, newsfeed, object-storage, cdn, caching`
- **System Concerns**: `high-availability, low-latency, eventual-consistency, geo-replication, hot-key`
- **Infra/Tech (mentioned)**: `microservices, rest, mysql, postgres, redis, s3, cdn`  
  [Personal note: If starting today, managed Postgres/MySQL and managed Redis reduce ops overhead and speed iteration.]

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

## Problem Understanding

- **Original Prompt**: Design Instagram with a reduced feature set: upload photos from mobile, follow other users, and provide a photo feed. Think for scale (10M users) and reliability.
- **Use Cases**:  
  - Upload a photo with caption/location from mobile.  
  - Follow/unfollow users.  
  - View a feed of photos from followed users.
- **Out of Scope**: Comments/likes, algorithmic ranking, search, complex privacy, notifications, stories/video, analytics.
- **APIs (if discussed)**: Not stated in video.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

## Requirements & Constraints

**Given in Video**
- Functional: user registration basics; photo upload; follow graph; fetch feed.  
- Non-Functional: handle read-heavy traffic; low-latency feed reads; reliable object storage; horizontal scale; load balancing.  
- Capacity Inputs: 10M MAU; 2×5 MB photos per user per month; ~100 TB/month; ~1.2 PB/year; read >> write.
- Consistency: Cache freshness vs DB as source of truth; acceptable eventual consistency for feed.

**Assumptions (conservative)**
- Basic auth and access control to private images if later added.  
- P99 feed read latency in low hundreds of ms with cache; object fetch via CDN under regional targets.  
[Personal note: Likely outdated; consider setting explicit SLOs (e.g., p95/p99 latencies) early to guide cache and replica counts—verify for your stack.]

[Ask AI: Requirements and Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

## Back-of-the-Envelope Estimation

- **Storage**: ~100 TB/month of images; ~1.2 PB/year growth (images only). Metadata (users/photos/follows) is comparatively small.  
- **Bandwidth**: Dominated by reads of images via CDN; backhaul reduced by edge caching.  
- **Cache Sizing**: Hot feeds + recent photos. Exact hit ratios not stated.  
- **Shard Keys/Partitions**: Not stated in video—likely by user_id or photo_id for metadata tables.  
- **Throughput**: Read-heavy; write path must not block feed reads.

If more numbers are needed: *Not stated in video—skipping numerical estimation.*

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

## High-Level Architecture

- **Entry & Routing**: Mobile clients → Internet → **Load Balancer/Proxy** → routes to read or write service.  
- **Services**:  
  - **Read service**: serves feeds and metadata lookups.  
  - **Write/upload service**: handles new photo metadata + orchestrates media upload.  
  [Personal note: Start monolith with clear module boundaries; split read/write services once hotspots are clear.]
- **Data Stores**:  
  - **Relational DB** (e.g., MySQL/Postgres) for users/photos/followers with **read replicas**.  
  - **Object Storage** (e.g., S3) for images; DB stores object paths.  
  - **Distributed Cache** (e.g., Redis) for hot keys and precomputed feeds.  
  [Personal note: Prefer Argon2id/bcrypt for any future password storage, not raw SHA hashing.]
- **Feed Generation**: Periodic/batch **feed generation service** writes per-user feed results to cache.  
- **CDN**: Fronts object storage for image delivery; signed URLs recommended.  
- **Consistency**: DB is source of truth; cache updated/invalidated on writes; eventual consistency for feeds acceptable.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

## Deep Dives by Subsystem

### 8.1 Subsystem: Data Model

- **Role & Responsibilities**: Persist users, photos (metadata only), and directed follow relationships.
- **Entities & Key Fields**:  
  - **users**: `id` (PK, int), `name`, `email`, optional `location`, `timezone`, etc.  
  - **photos**: `id` (PK), `user_id` (FK→users.id), `caption`, `location`, `object_path_or_url` (reference to object store).  
  - **followers**: `from_user_id` (FK→users.id), `to_user_id` (FK→users.id) — directed follow.
- **Indexes**: users by email; photos by user_id, created_at; followers by from_user_id and to_user_id.
- **Scaling & Partitioning**: Initial single-writer RDBMS + read replicas; later shard by user_id if needed.
- **Consistency Model**: Strong in DB; eventual in caches/feeds.
- **Bottlenecks & Hot Keys**: Celebrity accounts (high fan-out). Mitigate via per-user feed caches and rate limits.
- **Failure Handling**: Idempotent writes (e.g., retry-safe uploads), fall back to DB on cache miss.

[Ask AI: Subsystem - Data Model](https://alisol.ir/?ai=Subsystem%20-%20Data%20Model%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

### 8.2 Subsystem: Write/Upload Path

- **Responsibilities**: Accept metadata, coordinate media upload, persist references, and refresh relevant caches.
- **Flow**: Client sends metadata → server records photo row → client uploads to object storage (direct or proxied) → server updates caches (write-through) and invalidates affected feed keys.  
  [Personal note: Use direct-to-object-storage uploads with pre-signed PUT URLs to avoid saturating app servers.]
- **Caching Strategy**: Write-through for user/photo lookups; targeted invalidation of feed keys for followers.
- **Failure Handling**: Timeouts, resumable uploads, idempotency keys.

[Ask AI: Subsystem - Write Path](https://alisol.ir/?ai=Subsystem%20-%20Write%20Path%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

### 8.3 Subsystem: Read/Feed Path

- **Responsibilities**: Low-latency retrieval of user feeds and photo metadata.
- **Flow**: Client → read service → cache (hit) → return feed entries incl. image URLs; on miss, fetch from DB/feed cache, then populate cache.
- **Feed Generation**: Periodic job computes per-user feed from follow graph + recent photos; writes compact feed objects to cache.  
  [Personal note: If freshness requirements tighten, switch to a hybrid: precompute + incremental fan-out-on-write via a lightweight queue.]
- **Caching Strategy**: TTL for feed lists; manual invalidation on new posts from followed users.
- **Hot Keys**: Celebrity feeds; mitigate via sharded cache keys and short TTLs.

[Ask AI: Subsystem - Read/Feed Path](https://alisol.ir/?ai=Subsystem%20-%20Read%2FFeed%20Path%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

### 8.4 Subsystem: CDN & Object Storage

- **Responsibilities**: Durable storage of original images; fast global delivery of variants via CDN.
- **Notes from Video**: Use object storage (e.g., S3); keep references in DB; put a CDN in front for latency.  
  [Personal note: Generate responsive sizes (variants) asynchronously to optimize bandwidth and cache hit ratios.]

[Ask AI: Subsystem - CDN & Storage](https://alisol.ir/?ai=Subsystem%20-%20CDN%20%26%20Storage%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

## Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
| --- | --- | --- | --- | --- |
| Metadata Store | Relational DB | NoSQL doc/column | Relational | Strongly relational entities and frequent joins. |
| Feed Strategy | Precompute (periodic) | On-demand (per request) | Precompute | Avoid heavy per-request compute; cache results. |
| Cache Updates | Write-through | Write-back | Write-through/Back discussed | Keep cache fresh near writes; policy implementation detail. |
| Image Delivery | CDN in front of object storage | Direct object storage | CDN | Lower latency + edge caching. |
| Service Shape | Monolith → split | Microservices early | Monolith-first | Evolve services after identifying hotspots. |  
[Personal note: For feed freshness under spikes, consider hybrid fan-out-on-write using a light queue; verify ops complexity vs benefit.]

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

## Reliability, Availability, and Performance

- **Replication**: DB read replicas for scale; object storage handles internal replication.  
- **Latency Budget**: Cache-first for feed; image bytes via CDN; metadata via read replicas.  
- **Backpressure & Throttling**: Rate-limit hot endpoints (feed for large followings).  
- **Degradation**: Serve stale caches on DB trouble; placeholder images if object store/CDN hiccups.  
- **Disaster Recovery**: Not specified.  
[Personal note: Aim for multi-AZ by default; DR plan depends on RPO/RTO—define early.]

[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

## Security & Privacy (if discussed)

- **AuthN/AuthZ**: Not stated in video.  
- **PII Handling**: Not stated in video.  
- **Encryption**: Not stated in video.  
[Personal note: Enforce TLS 1.3 end-to-end; store passwords with Argon2id/bcrypt + per-user salts; sign image URLs.]

[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

## Observability (if discussed)

- Metrics, logs, tracing, SLOs: Not stated in video.  
[Personal note: At minimum, instrument cache hit ratio, replica lag, CDN hit ratio, p95/p99 latencies for feed and image fetch.]

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

## Follow-up Questions (from interviewer, if any)

Not stated in video.

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

## Candidate Questions (if modeled)

Not stated in video.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

## Key Takeaways

- Start with clear scope: upload, follow, feed.  
- Model metadata relationally; keep images in object storage.  
- Use CDN for image delivery; DB stores object paths.  
- Split reads and writes as load grows; scale reads with replicas.  
- Cache aggressively for hot feeds; precompute feeds periodically.  
- Plan for cache invalidation on writes and hot-key mitigation.  
- Capacity planning reveals storage scale (~100 TB/month at given assumptions).  
[Personal note: Introduce feature flags and gradual rollouts for feed changes to protect latency.]

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

## Glossary

- **CDN**: Content Delivery Network to cache and serve static assets near users.  
- **Object Storage**: Distributed storage for blobs (e.g., images).  
- **Read Replica**: DB replica serving reads to scale throughput.  
- **Write-through Cache**: Updates cache at the time of DB write.  
- **Hot Key**: A frequently accessed cache key causing uneven load.  
- **Precomputed Feed**: Feed entries generated ahead of time and cached.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

## Study Plan from This Interview (Optional)

- Rehearse capacity estimation from first principles (users, objects, sizes).  
- Practice designing cache keys, TTLs, and invalidation strategies.  
- Drill trade-offs of precompute vs on-demand feeds.  
- Plan a staged evolution: monolith → split read/write services → further microservices as needed.  
[Personal note: Revisit modern managed services (DB, cache, CDN) to reduce ops toil and speed up iteration.]

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CNot%20stated%20in%20video%7CDesign%20Instagram)

---

## Attribution

- Source Video: https://www.youtube.com/watch?v=VJpfO6KdyWE  
- Channel: Not stated in video  
- Note: This document is a summary of the linked mock interview.

---

## About the summarizer

I'm *Ali Sol*, a PHP Developer. Learn more:

- Website: [alisol.ir](https://alisol.ir)  
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
