# **System Design Mock Interview**: Design Spotify | ex-Google EM | Google System Design Interview 
- **Channel/Interviewer**: IGotAnOffer: Engineering 
- **Duration**: 00:42:04 
- **Original Video**: https://www.youtube.com/watch?v=_K-eupuDVEc

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.* 

---

## 1) One-Page Executive Summary (2–3 min skim)

**Problem Prompt (One-liner)** 
Design a simplified Spotify focusing on **finding** and **playing** music (mobile-first).

**Primary Scope** 
- **In scope:** search/browse songs, play a selected track, high-level infra (LB, web tier, storage), caching (client/web/CDN), hot-content handling, basic geo strategy, quick sizing. 
- **Out of scope:** recommendations, ads, social, playlists, podcasts, rights/DRM, offline licensing, analytics, billing.

**Non-Functional Priorities** 
- Low latency playback start; scalable distribution; availability via replication; cost-aware caching.

**Key Constraints & Numbers (stated/derived in-video)** 
- ~**1B users**, **100M songs**. 
- Avg song ≈ **5 MB** → ~**500 TB** audio; with **3×** replication ≈ **1.5 PB**. 
- Song metadata O(10–100 GB); user metadata O(1 TB). 
- Client = mobile app; no exact QPS/latency targets given.

**High-Level Architecture (Text)** 
- Mobile app → **Load Balancer** → **Web/App servers**. 
- **Metadata DB** (relational; e.g., Amazon RDS/MySQL). 
- **Audio object storage** (e.g., Amazon S3). 
- **CDN/Edge cache** for hot songs (e.g., CloudFront). 
- **Multi-layer caching:** device cache ↔ web tier memory cache ↔ CDN. 
- **Geo-aware replicas** for proximity and resiliency.

**Top Trade-offs** 
- Simplicity (relational metadata) vs. search flexibility. 
- Web tier streaming vs. direct client ↔ CDN fetch. 
- Preload vs. on-demand caching of hot tracks. 
- Uniform LB vs. bandwidth/stream-aware LB.

**Biggest Risks/Failure Modes** 
- **Hot-key** storms on new releases; origin overload. 
- Bandwidth saturation at web tier; cache misses cascade. 
- Cross-region latency if replicas aren’t geo-aware. 
- Inefficient cache policy → high egress cost and stalls.

**5-Min Review Flashcards** 
- Q: Why split **audio** and **metadata** storage? 
- A: Different access patterns/size; immutable blobs vs. query-heavy rows. 
- Q: What makes **CDN** essential here? 
- A: Offloads origin & shortens latency for hot content. 
- Q: What should the **load balancer** consider beyond CPU? 
- A: **Network bandwidth**, active streams, possibly memory. 
- Q: Where are the **caches**? 
- A: Client device, web/app memory, CDN edge. 
- Q: Why keep **web-tier memory** copies briefly? 
- A: Fast replays while CDN warms; reduces origin trips. 
- Q: What’s a **geo-aware** replication benefit? 
- A: Lower RTT and better regional resilience. 
- Q: When do we touch **S3**? 
- A: On cold start or CDN miss; otherwise edge/ram hits. 
- Q: What are typical **metadata** fields? 
- A: song_id, title, artist, genre, cover_url, audio_url. 
- Q: How to mitigate **hot-key** storms? 
- A: Push to CDN proactively; redirect clients; local caching.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview)

---

## 2) Interview Tags (for later filtering)

- **Domain/Industry:** `streaming` 
- **Product Pattern:** `cdn, caching, search-index, object-storage` 
- **System Concerns:** `high-availability, low-latency, geo-replication, hot-key, autoscaling` 
- **Infra/Tech (mentioned):** `mysql, s3, cdn, websocket, caching, load-balancer` 

[Personal note: WebSocket isn’t typically required for audio playback; HTTP range requests or HLS/DASH are the common choices for resilience and CDN friendliness.] 

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview)

---

## 3) Problem Understanding

**Original Prompt (paraphrase):** Design Spotify; **constrain** to “**finding** and **playing** music.” 

**Use Cases** 
- Search/browse songs by artist/genre. 
- Select and play a song; pause/resume; continue where you left off.

**Out of Scope** 
- Playlists, recommendations, social features, podcasts, uploads, ads, auth fine points.

**APIs** 
- Not stated in video.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview)

---

## 4) Requirements & Constraints

### Given in Video
- **Users/Songs:** ~1B users, ~100M songs. 
- **Avg song size:** ~5 MB; **3×** replication considered for durability/availability. 
- **Metadata vs. audio:** Different storage and access characteristics. 
- **Performance:** Fast start; handle hot releases; mobile-first. 
- **Resiliency:** Replication and geo-aware placement discussed.

### Assumptions (conservative)
- Playback start target: sub-second to a few seconds buffer. *(No explicit SLA given.)* 
- Read-dominant workloads on audio; mixed reads/writes on metadata (e.g., resume point). 
- Basic auth/session handling exists. 

[Personal note: For hot releases, proactive edge pre-warm and signed-URL redirects typically beat server-streaming for both cost and latency.] 

[Ask AI: Requirements and Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview)

---

## 5) Back-of-the-Envelope Estimation

- **Audio storage:** 100M × 5 MB ≈ **500 TB**; with **3×** replication ≈ **1.5 PB**. 
- **Song metadata:** O(10–100 GB). 
- **User metadata:** ~1 KB × 1B ≈ **1 TB**. 
- **Traffic/QPS:** Not stated in video—skipping numerical estimation.

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview)

---

## 6) High-Level Architecture

- **Client:** Mobile app issues search/play requests. 
- **Edge:** CDN caches audio objects; client may fetch from edge on redirect. 
- **Front Door:** Load Balancer distributes to web/app servers using stream-aware signals (bandwidth/active streams). 
- **Web/App Tier:** Handles search queries, play commands, progress updates; keeps short-lived in-memory cache of recently served tracks. 
- **Metadata Store:** Relational DB (e.g., RDS/MySQL) for songs/users and query needs. 
- **Audio Store (Origin):** Object storage (e.g., S3) for immutable MP3 blobs. 
- **Geo Strategy:** Replicate data closer to listeners; CDN POPs do the heavy lifting for delivery. 
[Personal note: Consider HTTP-based adaptive streaming (HLS/DASH) with multi-bitrate renditions to improve startup and midstream resilience on mobile.] 

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview)

---

## 7) Deep Dives by Subsystem

### 7.1 Subsystem: Search & Discovery
- **Role:** Find songs by artist/genre and return a results list. 
- **Data Model (from video):** `song_id`, `title`, `artist`, `genre`, `cover_url`, `audio_url`. 
- **Scaling:** Relational queries over indexed fields; metadata volume relatively small. 
- **Caching:** Web-tier metadata caching is implied (expandable) to reduce DB load. 
- **Consistency:** Strong for metadata reads/updates (e.g., resume position). 
- **Bottlenecks:** Full scans on unindexed fields; surge from popular queries. 
- **Failure Handling:** Fallback to partial results; degrade to fewer fields if necessary.

[Ask AI: Subsystem - Search & Discovery](https://alisol.ir/?ai=Subsystem%20-%20Search%20%26%20Discovery%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview)

### 7.2 Subsystem: Playback & Delivery
- **Role:** Start and maintain audio playback with minimal stalls. 
- **Flow (cold):** Client → LB → Web → lookup `audio_url` in metadata → fetch from S3 → serve; CDN warms. 
- **Flow (warm):** Client redirected to CDN edge; web/app freed from streaming burden. 
- **Caching:** 
 - **Client**: keep frequently played tracks locally. 
 - **Web**: short-lived RAM cache of recent tracks to bridge CDN warmup. 
 - **CDN**: primary distribution cache for hot content. 
- **LB Strategy:** Prefer servers with spare **bandwidth** and fewer active streams; CPU is secondary. 
- **Hot-Key Mitigation:** Proactive CDN load; promote redirect-to-edge early; consider server-side coalescing. 
[Personal note: Replace server streaming via WebSocket with HTTP byte-range or HLS/DASH to leverage CDN segment caching and avoid sticky connections.] 

[Ask AI: Subsystem - Playback & Delivery](https://alisol.ir/?ai=Subsystem%20-%20Playback%20%26%20Delivery%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview)

### 7.3 Subsystem: Storage & Replication
- **Audio:** Immutable blobs in object storage; **3×** replication discussed. 
- **Metadata:** Relational rows; frequent reads/writes (e.g., resume point). 
- **Geo-Awareness:** Place replicas closer to demand centers; reduce cross-ocean hops. 
- **Cost:** CDN hit ratio and cache TTLs are main egress and origin cost levers. 

[Ask AI: Subsystem - Storage & Replication](https://alisol.ir/?ai=Subsystem%20-%20Storage%20%26%20Replication%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview)

---

## 8) Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
|---------------------------------|-------------------------------------------|-------------------------------------------|-----------------|------------------------|
| Audio delivery path | Web tier streams to client | Redirect client to CDN edge | B (implied) | Offload origin; lower latency/cost via edge |
| Audio origin | S3 (object storage) | Monolithic FS/cluster | A | Immutable blobs; scales linearly |
| Metadata store | Relational (RDS/MySQL) | NoSQL KV/Doc | A | Querying across fields; moderate size |
| LB metrics | CPU-based | Bandwidth/active-stream aware | B | Streaming is I/O-bound |
| Client caching | None | Local track cache | B | Offline-ish resilience, instant replays |
| CDN warmup | Passive (on first user hit) | Proactive (promote on hotness) | B (implied) | Handle hot releases |

[Personal note: For large catalogs and fuzzy search, pairing relational metadata with a search index (e.g., inverted index) is common—verify for your stack.] 

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview)

---

## 9) Reliability, Availability, and Performance

- **Replication:** Both audio (object storage) and metadata (DB) replicated for durability/HA. 
- **Geo:** Place replicas near listeners; CDN covers last-mile performance. 
- **Backpressure:** LB avoids bandwidth-saturated hosts; reduce allocations and redirect to edge. 
- **Degradation:** Serve from closest cache; delay non-critical writes (e.g., resume position) if needed.

[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview)

---

## 10) Security & Privacy

- Not stated in video. 

[Personal note: Likely include signed URLs for CDN/object access and TLS 1.3; verify for your stack.] 

[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview)

---

## 11) Observability

- Not stated in video. 

[Personal note: Define SLOs for start-up latency and rebuffer ratio; trace play flows across LB/web/CDN/origin.] 

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview)

---

## 12) Follow-up Questions (from interviewer)

- “How would you think about **load balancing** for this app?” 
- “Anything else you want to add?” (led to geo-replication and wrap-up)

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview)

---

## 13) Candidate Questions (modeled/implicit)

- Can we **limit scope** to searching and playing music? 
- Are there any **scale** expectations (users/songs)? 
- Acceptable **audio quality** targets and formats? *(Not answered in detail.)* 
- Are we targeting **mobile-first**? (Assumed yes in the discussion.)

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview)

---

## 14) Key Takeaways

- Constrain scope early to make the problem solvable. 
- Separate **audio blobs** from **queryable metadata**. 
- Use **multi-layer caching** (client ↔ web ↔ CDN) to crush tail latency/cost. 
- **Edge-first delivery** is critical for hot tracks. 
- **Bandwidth-aware LB** beats CPU-only for streaming-heavy tiers. 
- **Geo-aware replication** reduces RTT and blast radius. 
[Personal note: Consider adaptive streaming and segment-based delivery for modern mobile networks.] 

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview)

---

## 15) Glossary (terms used)

- **CDN (Content Delivery Network):** Edge cache network for static assets. 
- **Object Storage (e.g., S3):** Highly durable blob store for files. 
- **Relational DB (e.g., RDS/MySQL):** Structured, queryable metadata store. 
- **Load Balancer:** Front door distributing client traffic to servers. 
- **Hot Key:** Disproportionately requested object (e.g., new hit single). 
- **Geo-Replication:** Placing data replicas in multiple regions. 
- **WebSocket:** Persistent full-duplex connection between client and server. 

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview)

---

## 16) Freshness Review (inline notes recap)

- WebSocket suggested for streaming → 
 [Personal note: Prefer HTTP range requests or HLS/DASH for audio in 2025; they play nicer with CDNs and intermittent networks.] 

- MP3 at fixed bitrate assumed → 
 [Personal note: Likely outdated; consider adaptive bitrate streaming—verify for your stack.] 

- CDN/CloudFront, S3, RDS choices → 
 [Personal note: Still widely acceptable; consider managed, regionalized services to reduce ops overhead.]

---

## 17) Attribution

- **Source Video:** https://www.youtube.com/watch?v=_K-eupuDVEc 
- **Channel:** IGotAnOffer: Engineering 
- **Note:** This document is a summary of the linked mock interview. 

---

## 18) About the summarizer

I’m **Ali Sol**, a PHP Developer.

- Website: [alisol.ir](https://alisol.ir) 
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
