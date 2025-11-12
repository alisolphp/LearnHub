# System Design Mock Interview: Design TikTok | ft. Google TPM

- **Channel/Interviewer:** Exponent  
- **Duration:** 00:33:12  
- **Original Video:** https://www.youtube.com/watch?v=Z-0g_aJL5Fw

> This document summarizes the key content of a system design mock interview. Consider watching the full video for tone and nuance.

---

## One-Page Executive Summary (2–3 min skim)

- **Problem Prompt (One-liner):** Design the backend for a TikTok-like app where users upload short videos and consume a personalized feed; support follow/like/favorite and basic interactions.
- **Primary Scope:** Backend services, storage, caching, feed generation, scalability.  
  **Out of Scope:** Mobile client details; full recommendation algorithm internals; tagging; deep auth model.
- **Non-Functional Priorities:** Very high availability (~99.999% target), low-latency feed loads, global scale, efficient read-heavy patterns, CDN offload for video delivery.
- **Key Constraints & Numbers (from the interview):**
  - Up to ~1 minute videos; assume ~5 MB/min compressed (H.264) *(assumption stated in interview)*.  
    [Personal note: For modern delivery, use adaptive HLS/DASH with multiple bitrates and codecs; H.264 baseline is fine but evaluate HEVC/AV1 where device/rights allow.]
  - ~1M daily active users.
  - Example creator behavior: ~2 uploads/user/day ⇒ ~10 MB user/day (video payload only) *(assumption stated in interview)*.
- **High-Level Architecture (Text):**
  1. API Gateway + Load Balancer in front of microservices.
  2. **Upload Service** writes video metadata to a relational DB; video blobs to object storage (e.g., S3).  
     [Personal note: Store only signed URLs in DB; keep blobs immutable. Lifecycle rules for cold tiers.]
  3. **Feed Service** serves a GET /feed that returns precomputed video links for a user.
  4. **Pre-cache Service** builds per-user playlists into a cache (e.g., Redis).
  5. **Read Replicas** for heavy read traffic; primary handles writes.
  6. **CDN** in front of object storage for global delivery.
  7. Optional **Sharding Layer** for write scaling (e.g., region-based or hash-based).
- **Top Trade-offs:**
  - Precompute feed vs on-demand ranking (latency vs freshness).
  - RDBMS simplicity vs NoSQL scale/read patterns.
  - Global replication (consistency) vs regional autonomy (latency).
  - Cost of CDN egress vs origin hits & user experience.
- **Biggest Risks/Failure Modes:**
  - Hot-video “thundering herd” without CDN.
  - Cache staleness / invalidation lag affecting “freshness” of feed.
  - Primary DB saturation on spikes (uploads, likes, follows).
  - Cross-region data movement and compliance.
- **5-Min Review Flashcards:**
  - Q: Where do video bytes live? A: Object storage (blob store); DB stores metadata + URLs.  
  - Q: How do we keep feed fast? A: Pre-cache N videos/user in Redis, refreshed by a background service.  
  - Q: Read vs write path split? A: Primary for writes; read replicas for feed/builders.  
  - Q: Global spikes mitigation? A: CDN fronting blobs; LB for APIs; autoscaling; precompute to shift load.  
  - Q: When do we shard? A: When write DB becomes bottleneck; shard by region or key.  
  - Q: Consistency for counters/likes? A: Eventual consistency acceptable; design idempotent updates.  
    [Personal note: If using RDBMS for counters at scale, consider write-behind via queue/stream to avoid hot rows.]

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM)

---

## Interview Tags (for later filtering)

- **Domain/Industry:** `social-media, streaming`
- **Product Pattern:** `feed, recommendation, object-storage, cdn, caching, job-scheduler`
- **System Concerns:** `high-availability, low-latency, eventual-consistency, geo-replication, hot-key, autoscaling`
- **Infra/Tech (mentioned):** `microservices, rest, postgres, redis, s3, cdn, load-balancer`  
  [Personal note: For very large event streams (likes, follows) consider a durable log (e.g., Kafka/Pulsar) to decouple writes from materialized views.]

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM)

---

## Problem Understanding

- **Original Prompt:** Design the backend of TikTok focusing on short-video upload and a scrollable feed; include following, favoriting/liking, and commenting. Prioritize backend over mobile client.
- **Use Cases:**
  - Upload short videos with optional caption text.
  - View a feed (initially: accounts you follow; optional trending/recs).
  - Interact: follow/unfollow, like/favorite, comment (high level).
- **Out of Scope:** Deep client UX, tagging system, full recommendation algorithm details.
- **APIs (discussed at a high level):**
  - `POST /videos` (upload metadata + blob link).
  - `GET /feed?user_id=...` (returns next N video links).
  - `POST /user-activity` (like, follow, etc.); and `GET /user-activity` (reads user’s likes/follows).  
    [Personal note: Prefer separate, explicitly named resources (`POST /likes`, `POST /follows`) for clarity and observability.]

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM)

---

## Requirements & Constraints

**Given in Video**
- **Functional:** Upload video (+caption), view feed one video at a time (scroll), follow creators, like/favorite, comment (lightly).
- **Non-Functional:** “Highly available” (~5 nines stated as an aim), low feed latency, handle read-heavy workloads, scale to spikes.
- **Capacity Inputs:** ~1M DAU; up to 1-minute videos; assumed ~5 MB/min and ~2 uploads/day/user; store video bytes in blob store; CDN for delivery.

**Assumptions (made by the candidate in-video)**
- 5 MB/min H.264 compression and “2 uploads/day/user” used only for rough sizing.  
  [Personal note: Treat as placeholders; actual production must size using observed telemetry and A/B-proven prefetch depths.]

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM)

---

## Back-of-the-Envelope Estimation

- Using interview’s numbers:  
  - **Per-user/day video writes:** ~10 MB (2 × 5 MB).  
  - **Metadata footprint:** ~1 KB per user per day (rough order given).  
  - **Implication:** Storage dominated by blobs; prioritize lifecycle + CDN.  
- Peak QPS/egress not quantified.

If more precise figures are needed: *Not stated in video—skipping numerical estimation.*

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM)

---

## High-Level Architecture

- **Ingress:** Client → API Gateway/Load Balancer → services.  
  [Personal note: Prefer blue-green/rolling behind LB; canary where feasible.]
- **Upload Service:** Accepts video + caption; persists metadata (user_id, video_id UUID, URL to blob, caption) to relational DB; uploads blob to object storage.
- **Feed Service:** `GET /feed` returns next 10 preselected video URLs for user; pulls from Redis list keyed by user.
- **Pre-cache Service:** Background/batch job compiling per-user playlists into Redis (schedule or on-demand triggers).
- **Data Layer:** Primary relational DB (e.g., Postgres) for writes; read replicas feed heavy read paths and pre-cache builder.  
  [Personal note: If joins multiply, consider denormalized read models/materialized views to reduce fan-out.]
- **CDN + Object Storage:** CDN fronts blob storage for hot content and global routing.  
- **Scale-Out:** Autoscaling for services; add DB sharding service when write saturation appears (e.g., region-shard).  
  [Personal note: Choose shard keys that avoid hot creators; consider consistent hashing with rebalancing.]

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM)

---

## Deep Dives by Subsystem

### 8.1 Uploads

- **Role:** Receive user video + text; store metadata; place bytes in blob store; return success.
- **Data Model (relational):**  
  - `users(user_id UUID, ...)`  
  - `videos(video_id UUID, user_id FK, blob_url TEXT, caption TEXT, created_at TIMESTAMP, ...)`
- **Scaling:** Horizontally scale stateless API; origin writes go to object store; DB handles metadata only.  
- **Bottlenecks:** DB write spikes; large multipart uploads.  
  - Mitigation: Pre-signed PUT directly to object storage; service only commits metadata.  
    [Personal note: Enforce content-type/size on presigned policy; virus scan/abuse pipelines async.]

[Ask AI: Subsystem - Uploads](https://alisol.ir/?ai=Subsystem%20-%20Uploads%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM)

### 8.2 Feed & Pre-cache

- **Role:** Serve a fast feed; keep a precomputed queue of video URLs per user.
- **Cache Strategy:** Redis list/set keyed by `feed:<user_id>` with ~10 items preloaded; refresh on consumption or schedule.
- **Consistency:** Eventual; slight staleness acceptable for UX.  
- **Bottlenecks/Hot Keys:** Popular creator videos; mitigate via CDN and distributing recommendation work off request path.  
  [Personal note: If many users consume at once, avoid rebuilding lists synchronously—use work queues and idempotent builders.]

[Ask AI: Subsystem - Feed](https://alisol.ir/?ai=Subsystem%20-%20Feed%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM)

### 8.3 User Activity (Likes, Follows)

- **Role:** Record likes/favorites; follow/unfollow; expose read API for builder.
- **Data Model (relational):**  
  - `follows(follower_id, followee_id, created_at, PK(follower_id, followee_id))`  
  - `likes(user_id, video_id, created_at, PK(user_id, video_id))`
- **Scaling:** Reads served from replicas; writes are idempotent with upserts.  
  [Personal note: For large counter displays, maintain materialized counts asynchronously to avoid hot rows.]

[Ask AI: Subsystem - User Activity](https://alisol.ir/?ai=Subsystem%20-%20User%20Activity%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM)

---

## Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
| --- | --- | --- | --- | --- |
| Feed generation | Precompute into cache | Compute on-demand per request | Precompute | Reduce latency & DB load; handle read-heavy pattern. |
| Metadata store | Relational DB | NoSQL KV/doc | Relational | Structured relationships (users↔videos, FKs) and queries. |
| Delivery | CDN in front of blobs | Origin-only reads | CDN | Offload bandwidth; handle hot content and global users. |
| Scaling writes | Single primary + replicas | Shard by region / key | Start with primary; add sharding | Shard when write bottlenecks appear. |
| Availability | LB across stateless services | Monolith instance | LB | Zero-downtime deploys and spike handling. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM)

---

## Reliability, Availability, and Performance

- **Availability Target:** ~99.999% discussed as an aspiration.  
  [Personal note: Budget per-tier error budgets; multi-AZ + fast failover more impactful than a single number.]
- **Latency:** Keep feed under a quick, scroll-friendly threshold via prefetching 3–10 items; background fetch.
- **Backpressure/Shedding:** Prefer serving slightly stale feed over failing; size caches appropriately.
- **DR/Regions:** Consider geo-routing; replicate blobs via CDN + origin cross-region if needed (not detailed in video).

[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM)

---

## Security & Privacy (if discussed)

Not stated in video.  
[Personal note: Enforce auth on all mutating APIs; object storage access via short-lived signed URLs; strict content moderation pipeline.]

[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM)

---

## Observability (if discussed)

Not stated in video.  
[Personal note: Capture p95/p99 for `/feed` and upload success; cache hit rate; CDN offload; top hot keys; per-region error rates.]

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM)

---

## Follow-up Questions (from interviewer)

- How would the cache affect latency and freshness?
- What are the bottlenecks if traffic 10x’s in a day?
- How would you think about regions and global routing/CDN?

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM)

---

## Candidate Questions (modeled)

- Which portion of the feed should be personalized vs purely follower-based initially?
- What freshness target do we need for new uploads to appear for followers?
- Any compliance constraints influencing region sharding or data residency?

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM)

---

## Key Takeaways

- Separate **video bytes** (object storage) from **metadata** (relational DB).  
- **CDN** is essential for hot content and global performance.  
- Build **precomputed feeds** to keep scroll latency low and offload read pressure.  
- Use **read replicas** for heavy reads; **shard writes** when necessary.  
- Expect **eventual consistency** for social signals; design idempotent writes & counters.  
- Engineer **zero-downtime deploys** via LB and multi-instance services.  
[Personal note: Introduce a streaming backbone when interactions scale; it simplifies fan-out and materialized views.]

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM)

---

## Glossary

- **Blob/Object Storage:** Durable store for large binary files; addressed by URL.
- **CDN:** Global edge caching and routing layer to reduce latency and origin load.
- **Read Replica:** Read-only copy of a primary DB for scaling reads.
- **Pre-cache Service:** Background job that prepares per-user feed items ahead of time.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM)

---

## Study Plan from This Interview (Optional)

- Practice sketching **upload → blob → metadata** patterns.  
- Drill trade-offs of **precompute vs on-demand** feeds.  
- Whiteboard **global rollout**: CDN, region routing, replication.  
[Personal note: Validate password storage guidance in any follow-up auth design—prefer Argon2id/bcrypt with proper cost tuning.]

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM)

---

## Attribution

- **Source Video:** https://www.youtube.com/watch?v=Z-0g_aJL5Fw  
- **Channel:** Exponent  
- **Note:** This document is a summary of the linked mock interview.

---

## About the summarizer

I'm **Ali Sol**, a PHP Developer.

- Website: [alisol.ir](https://alisol.ir)  
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

