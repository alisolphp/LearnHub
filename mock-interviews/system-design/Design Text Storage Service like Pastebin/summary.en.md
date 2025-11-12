# System Design Mock Interview: Design Text Storage Service like Pastebin

* **Channel/Interviewer**: System Design Fight Club  
* **Duration**: 01:03:56  
* **Original Video**: https://www.youtube.com/watch?v=9wAj-5IMdyU

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.*

---

## One-Page Executive Summary

- **Problem Prompt (one-liner)**: Build a Pastebin-style text storage and sharing service with upload, download, and text search. 
- **Primary Scope**
  - **In scope**: Text upload & retrieval; durable storage; public link sharing; text search; basic analytics/metadata; scaling considerations; latency budgeting.  
  - **Out of scope**: Rich auth, ML features, moderation pipelines (not discussed).
- **Non-Functional Priorities**: High availability; predictable P99 latencies; horizontal scalability (traffic “10,000×” stress thought experiment); cost awareness. 
- **Key Constraints & Numbers (from video)**
  - Uses back-of-the-envelope latency budgeting (e.g., disk seek/read, DC hops) to hit reasonable P99s for download path. 
- **High-Level Architecture (text)**
  1. **Browsers**: Text uploader + downloader UIs. 
  2. **Upload Service**: Issues presigned-URL for object store; records metadata.  
  3. **Object Store (e.g., S3)**: Stores the raw text blobs. 
  4. **Metadata Store**: Tracks paste ID, location (S3 URL), counts, uploader, etc. 
  5. **Search**: Elasticsearch-based text search (plus alternatives discussed).  
  6. **Download Service**: Looks up metadata → redirects to object store for direct fetch. 
- **Top Trade-offs**
  - **Naïve single-tier vs. split (object store + metadata)**: simplicity vs. bandwidth bottlenecks on app tier. 
  - **Elasticsearch as primary store vs. index only**: convenience vs. size/operational risks. 
  - **CDC from Postgres to Elasticsearch**: index freshness vs. complexity. 
- **Biggest Risks/Failure Modes**
  - Hot partitions/keys; search index drift; presigned URL misuse; app servers becoming bandwidth-bound. 
- **5-Min Review Flashcards**
  - **Q**: Why presigned URLs? **A**: Offload data plane to object store/CDN and avoid app-tier bandwidth bottlenecks.   
  - **Q**: What does Elasticsearch provide? **A**: Inverted index for fast text search on paste content/metadata.   
  - **Q**: Where is the paste text stored? **A**: In object storage; DB keeps metadata + location.   
  - **Q**: How to keep search fresh? **A**: CDC from Postgres to Elasticsearch.   
  - **Q**: What creates IDs? **A**: A key generation service; pre-generates IDs; HA with a backup instance (Snowflake/ZK mentioned).    
  - **Q**: Where do naïve bottlenecks show up? **A**: App server bandwidth on upload/download. 

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin)

---

## Interview Tags

- **Domain/Industry**: `storage`
- **Product Pattern**: `object-storage, search-index, cdn, caching`
- **System Concerns**: `high-availability, low-latency, eventual-consistency, hot-key`
- **Infra/Tech (mentioned)**: `s3, postgres, dynamodb, elasticsearch, zookeeper`   

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin)

---

## Problem Understanding

- **Original Prompt**: Support pasting text, getting a shareable key/URL, retrieving text by key, and searching public pastes. Scale the system and set latency expectations.  
- **Use Cases**
  - Create paste (public/unlisted).  
  - View/download paste via key.  
  - Search text and/or titles across public pastes.  
  - Track metadata (uploader, hit counts).
- **Out of Scope**: Full auth model, rate-limited abuse handling details, content moderation (not covered).
- **APIs (as discussed implicitly)**
  - `POST /pastes` → returns `{id, upload_url}` (presigned); client PUTs to object store.   
  - `GET /pastes/{id}` → returns redirect or signed URL to object.   
  - `GET /search?q=…` → full-text over index. 

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin)

---

## Architecture & Data Flow

### Components
- **Web clients (two “browsers”)** for upload and download. 
- **Upload Service** (stateless API; issues presigned URLs; writes metadata). 
- **Download Service** (lookup then redirect). 
- **Object Store (S3)** for blob storage. 
- **Metadata DB** (Postgres or DynamoDB; see trade-offs). 
- **Search Index (Elasticsearch)** via CDC pipeline. 

[Personal note: Prefer a CDN in front of object storage for popular reads; use short-lived, scoped signed URLs and cache-control headers to protect origin.]

[Ask AI: Architecture](https://alisol.ir/?ai=Architecture%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin)

---

## Write Path (Upload)

1. **Client** requests a new paste.  
2. **Key Generation Service** returns a unique ID (pre-generated pool to avoid latency spikes; HA with a backup instance; Snowflake/ZK referenced).    
   [Personal note: In 2025, ULIDs/KSUIDs are common choices for sortable, low-coordination IDs; they simplify multi-region patterns.]  
3. **Upload Service** writes metadata (ID, object URL, uploader, counters) to DB.   
4. **Client** uploads the text directly to **S3** using the **presigned URL**.   
5. **CDC** streams metadata changes to **Elasticsearch** for searchability. 

[Ask AI: Write Path](https://alisol.ir/?ai=Write%20Path%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin)

---

## Read Path (Download)

1. **Client** hits **Download Service** with paste ID.  
2. Service looks up **S3 location** in DB and responds with a redirect/signed URL.   
3. Client fetches the object directly from **S3** (optionally via CDN).  
4. **Counts/analytics** updated asynchronously in metadata store. 

[Ask AI: Read Path](https://alisol.ir/?ai=Read%20Path%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin)

---

## Search Design

**Option A — “Combo Store” in Elasticsearch**  
- Store full paste documents directly in Elasticsearch (single record per paste; inverted index for text search).   
- Presenter notes ES can accept **large records** (claimed ~200 MB per record) but flags practical concerns.   
  [Personal note: Storing primary blobs in ES is generally discouraged due to operational cost/risk; prefer index-only + object store.]

**Option B — Metadata DB + ES Index (recommended)**  
- **Postgres/DynamoDB** holds canonical metadata; **CDC** feeds **Elasticsearch** for search.   
- Avoids bandwidth hotspots on app tier; keeps blobs in S3. 

**Edge Considerations**  
- ES not directly exposed to browsers; front it with services and auth.   
- If ES limits/packetization become issues, a custom inverted index was discussed as a thought experiment. 

[Ask AI: Search](https://alisol.ir/?ai=Search%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin)

---

## Data Model (Metadata)

- **Paste**: `{ id (PK), s3_url, title?, created_at, uploader?, view_count, visibility }`  
  - Presenter emphasizes keeping **text out of the metadata row**; store only the S3 URL + attributes. 

[Ask AI: Data Model](https://alisol.ir/?ai=Data%20Model%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin)

---

## Scaling & Capacity Notes

- **Naïve design**: App servers become **bandwidth-bound** when proxying large uploads/downloads.   
- **Optimized**: Presigned URLs + object storage remove app from the data path; CDN handles fan-out for hot pastes.   
- **Key Generation**: Keep a pool; ensure HA (backup generator, ZK/Snowflake pattern mentioned).    
  [Personal note: If using DynamoDB, design partition keys to avoid hot shards; consider time-bucketed prefixes for trending keys.]  
- **Search Index**: Size growth driven by paste volume + tokenization; CDC keeps it fresh at write cost. 

[Ask AI: Scaling](https://alisol.ir/?ai=Scaling%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin)

---

## Latency Budget (P99 Sketch)

- Presenter walks through an approximate P99 budget combining disk **seek/read** + ~**data center hops** to estimate user-perceived latency on the download path (example figures add up to several seconds depending on IO).    
  [Personal note: For large pastes, use **multipart** uploads and **range** reads; place buckets region-close to users; cache popular items at the edge.]

[Ask AI: Latency Budget](https://alisol.ir/?ai=Latency%20Budget%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin)

---

## Caching, CDN, and TTLs

- Use **CDN** in front of object storage with cache-control tuned to paste visibility.  
- Consider **short TTLs** on metadata lookup responses to absorb read bursts; invalidate on delete/visibility change.  
- Avoid caching **search** results for logged-in/private cases; safe to cache popular public queries briefly.

[Ask AI: Caching/CDN](https://alisol.ir/?ai=Caching%20and%20CDN%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin)

---

## Reliability & Failure Handling

- **Upload**: If presigned URL expires, reissue; verify object size/type on callback.  
- **Indexing**: On CDC lag/outage, allow reads from DB by title/ID; rebuild ES from DB + objects if needed.   
- **Keys**: If primary generator fails, **failover** to backup instance; ensure no ID collisions (Snowflake/ZK call-out). 

[Ask AI: Reliability](https://alisol.ir/?ai=Reliability%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin)

---

## Security & Abuse Notes

- **Signed URLs** with narrow scope (PUT for specific key, short expiry).  
- **Content controls** (basic) and **rate limiting** at API & CDN edge.  
- **Access**: Do not expose Elasticsearch directly to browsers. 

[Ask AI: Security](https://alisol.ir/?ai=Security%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin)

---

## Alternatives & Extensions

- **Store blobs in ES** (simple, risky at scale; large-record support discussed but contested).    
  [Personal note: Likely outdated; consider ES as **index only** and keep blobs in object storage for durability and cost.]  
- **Roll your own inverted index** if ES constraints bite (advanced). 

[Ask AI: Alternatives](https://alisol.ir/?ai=Alternatives%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin)

---

## Open Questions (Not stated in video)

- Authentication/visibility policies (private vs. unlisted vs. public).  
- Retention policies and auto-expiry.  
- Multi-region write/read strategy; eventual vs. strong consistency preferences.  
- Moderation and legal compliance for public content.

[Ask AI: Open Questions](https://alisol.ir/?ai=Open%20Questions%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin)

---

### Appendix: Quick Notes from the Conversation

- Hosting static sites directly from S3 is feasible; thought experiment pushes to “10,000×” to exercise design trade-offs.    
- ES was chosen for inverted-index text search; **CDC** from Postgres to ES suggested for freshness.    
- Final minutes confirm coverage and invite feedback on latency estimates. 

[Ask AI: Appendix](https://alisol.ir/?ai=Appendix%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin)
