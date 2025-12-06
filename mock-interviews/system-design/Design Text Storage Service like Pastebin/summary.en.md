# System Design Mock Interview: System Design: Pastebin

* **Channel/Interviewer**: System Design Fight Club  
* **Duration**: 01:03:57  
* **Original Video**: https://www.youtube.com/watch?v=9wAj-5IMdyU

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.*

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

---

# One-Page Executive Summary

**Problem Prompt (One-liner)**: Design a service like Pastebin for uploading and viewing text blobs, with added text search functionality.

**Primary Scope**: Handle text uploads up to 10MB (avg 10KB), viewing, and text search; support 1M pastes/day with 5:1 read/write ratio.  
**Out of Scope**: Hit counters, user accounts.

**Non-Functional Priorities**: Scalability for bandwidth-bound scenarios, low latency for reads/writes, high availability with redundancy; no specific SLOs mentioned.

**Key Constraints & Numbers**: 10 writes/sec, 50 reads/sec; storage: 10GB/day, 3.65TB/year, plan for 10 years permanent storage (36.5TB base + replicas); bandwidth: 0.5MB/sec average.

**High-Level Architecture (Text)**:  
- Clients upload via pre-signed URLs directly to object store (e.g., S3).  
- Metadata stored in DB (Postgres or DynamoDB) with key generation service.  
- Downloads direct from object store to avoid bandwidth bottlenecks.  
- For search: Index in Elasticsearch, potentially via DB triggers or task runners to handle large texts.  
- Redundancy: 2-3 machines per service, 3+ disks for storage.  
- Optional: Load balancers for scaled scenarios.

**Top Trade-offs**:  
- Bandwidth-bound vs. optimized: Proxying through services increases latency/bottlenecks vs. direct client-object store access.  
- Search integration: Storing full text in Elasticsearch simplifies but risks size limits vs. separate object store with triggers adds complexity.  
- DB choice: Postgres for strong consistency vs. DynamoDB for scalability/eventual consistency.  
- Naive vs. optimal upload: Inline text in DB bloats records vs. object store separation.  

**Biggest Risks/Failure Modes**:  
- Bandwidth bottlenecks in high-scale reads/writes leading to slow responses.  
- Race conditions in search indexing if triggers fire before upload completes.  
- Storage overflow without proper sharding/replication.  
- Key collisions in generation service.  
- Elasticsearch record size limits (though supports up to 200MB).  

**5-Min Review Flashcards**:  
- Q: What's the core functionality? → A: Upload/view text; search as extra.  
- Q: Key numbers? → A: 1M pastes/day, 10KB avg, 10MB max.  
- Q: Why object store? → A: Handles large blobs efficiently vs. DB inline.  
- Q: Naive approach issue? → A: Bandwidth bound through upload/download services.  
- Q: Optimized upload? → A: Pre-signed URLs direct to S3.  
- Q: Search challenge? → A: Indexing large texts; use ES with triggers.  
- Q: Storage estimate? → A: 36.5TB for 10 years + 2x replicas.  
- Q: DB options? → A: Postgres for small scale; DynamoDB for large.  
- Q: Redundancy? → A: 2-3 machines/services, multiple disks.  
- Q: Out of scope? → A: Users, hit counts.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CSystem%20Design%20Fight%20Club%7CSystem%20Design%3A%20Pastebin)

---

# Interview Tags

**Domain/Industry**: storage  
**Product Pattern**: object-storage, url-shortener  
**System Concerns**: high-availability, low-latency, eventual-consistency  
**Infra/Tech (only if mentioned)**: microservices, postgres, dynamodb, redis, s3, elasticsearch

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CSystem%20Design%20Fight%20Club%7CSystem%20Design%3A%20Pastebin)

---

# Problem Understanding

**Original Prompt**: Design a text storage service like Pastebin, supporting upload and view of text blobs, with text search as an added feature not typically in scope.

**Use Cases**: Primary: Upload large text blobs (e.g., code snippets) and view them via unique URLs. Secondary: Search across pastes for keywords.

**Out of Scope**: Hit counters, user account systems.

**APIs (if discussed)**: Not stated in video.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CSystem%20Design%20Fight%20Club%7CSystem%20Design%3A%20Pastebin)

---

# Requirements & Constraints

**Functional Requirements**  
- Upload text up to 10MB and generate unique key/URL.  
- View/download text by key.  
- Search text across pastes (extra scope).

**Non-Functional Requirements**:  
- Scalability: Handle 1M pastes/day (10 writes/sec, 50 reads/sec).  
- Availability: Redundancy with failovers (2-3 machines per service).  
- Latency: Low for reads/writes; avoid bandwidth bounds.  
- Durability: Permanent storage with replicas.  
- Consistency: Eventual for DynamoDB option; strong for Postgres.

**Capacity Inputs**: QPS: 10 write/50 read; object sizes: avg 10KB, max 10MB; daily data: 10GB; retention: 10 years permanent; no regions specified.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CSystem%20Design%20Fight%20Club%7CSystem%20Design%3A%20Pastebin)

---

# Back-of-the-Envelope Estimation

- Storage: 1M pastes/day × 10KB avg = 10GB/day; ×365 = 3.65TB/year; ×10 years = 36.5TB base. With 2 replicas: ~110TB total, ~3 hard disks (assuming 100TB/disk).  
- Bandwidth: 0.5MB/sec avg; at 10Kx scale, potential bottlenecks without direct object store access.  
- Shard keys & partition counts: Key by unique ID (e.g., UUID); single machine suffices at base scale, shard DB for growth.  
- Peak throughput & concurrency: 50 reads/sec; 1-2 machines per service.

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CSystem%20Design%20Fight%20Club%7CSystem%20Design%3A%20Pastebin)

---

# High-Level Architecture

- Client browsers for upload/download.  
- Upload service: Generates pre-signed URLs for direct S3 upload; stores metadata (key, S3 URL) in DB.  
- Key generation service: Outsourced for unique IDs (e.g., UUID).  
- Download service: Retrieves S3 URL from DB, client downloads directly.  
- Data stores: Metadata in Postgres/DynamoDB; blobs in S3 object store.  
- Search: Elasticsearch for indexing; optional DB triggers/task runners to sync from S3.  
- Load balancers: Optional for scaled services.  
- Redundancy: 2 machines for services, 3+ for storage.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CSystem%20Design%20Fight%20Club%7CSystem%20Design%3A%20Pastebin)

---

## Subsystem: Upload Service

**Role & Responsibilities**: Handle text uploads, generate keys, store metadata, provide pre-signed URLs for direct S3 access.

**Data Model (from video only)**: Metadata: text_key (primary, unique ID), s3_url; optional: uploader, hit count.

**APIs/Contracts**: Not stated in video.

**Scaling & Partitioning**: Single machine at base; add load balancers for 10Kx scale.

**Caching Strategy**: Not stated in video.

**Consistency Model**: Strong for Postgres; eventual for DynamoDB.

**Bottlenecks & Hot Keys**: Bandwidth if proxying text; mitigated by direct S3.

**Failure Handling**: Failovers with 2-3 machines.

**Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Upload Service](https://alisol.ir/?ai=Subsystem%20-%20Upload%20Service%7CSystem%20Design%20Fight%20Club%7CSystem%20Design%3A%20Pastebin)

---

## Subsystem: Download Service

**Role & Responsibilities**: Retrieve metadata, enable direct S3 downloads.

**Data Model (from video only)**: Same as upload: key to S3 URL mapping.

**APIs/Contracts**: Not stated in video.

**Scaling & Partitioning**: Single machine base; scale with balancers.

**Caching Strategy**: Redis possible for metadata mappings.

**Consistency Model**: Same as DB choice.

**Bottlenecks & Hot Keys**: Bandwidth on popular pastes; use CDN if needed.

**Failure Handling**: Redundant machines.

**Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Download Service](https://alisol.ir/?ai=Subsystem%20-%20Download%20Service%7CSystem%20Design%20Fight%20Club%7CSystem%20Design%3A%20Pastebin)

---

## Subsystem: Search Service

**Role & Responsibilities**: Index and query text across pastes.

**Data Model (from video only)**: Full text in Elasticsearch (up to 200MB/record); or inverted index via triggers.

**APIs/Contracts**: Not stated in video.

**Scaling & Partitioning**: Elasticsearch clusters; handle large records.

**Caching Strategy**: Not stated in video.

**Consistency Model**: Eventual, synced via DB triggers.

**Bottlenecks & Hot Keys**: Indexing large blobs; bandwidth on sync from S3.

**Failure Handling**: Task runners for retries; avoid race conditions by triggering on upload complete.

**Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Search Service](https://alisol.ir/?ai=Subsystem%20-%20Search%20Service%7CSystem%20Design%20Fight%20Club%7CSystem%20Design%3A%20Pastebin)

---

## Subsystem: Storage

**Role & Responsibilities**: Persist metadata and blobs.

**Data Model (from video only)**: Metadata DB: key, S3 URL; blobs in S3.

**APIs/Contracts**: Not stated in video.

**Scaling & Partitioning**: Sharded DB; replicated S3.

**Caching Strategy**: Not stated in video.

**Consistency Model**: Per DB.

**Bottlenecks & Hot Keys**: Disk I/O; 3+ disks with replicas.

**Failure Handling**: Replication (2x).

**Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Storage](https://alisol.ir/?ai=Subsystem%20-%20Storage%7CSystem%20Design%20Fight%20Club%7CSystem%20Design%3A%20Pastebin)

---

# Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
| --- | --- | --- | --- | --- |
| Upload Path | Proxy through service | Pre-signed direct to S3 | Option B | Avoids bandwidth bounds in service. |
| DB Choice | Postgres | DynamoDB | Either (Postgres for small) | Postgres for consistency; DynamoDB for scale. |
| Search Storage | Full text in Elasticsearch | Separate S3 with triggers | Option B | Handles size limits; avoids ES bloat. |
| Bandwidth Handling | Inline in DB | Object store | Option B | Better for large blobs. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CSystem%20Design%20Fight%20Club%7CSystem%20Design%3A%20Pastebin)

---

# Reliability, Availability, and Performance

- Replication/quorum/consistency: 2 replicas for storage; eventual in DynamoDB.  
- Latency budget across tiers: Not stated in video.  
- Backpressure & throttling: Not stated in video.  
- Load shedding & degradation: Not stated in video.  
- Disaster recovery (RPO/RTO if stated): Not stated in video.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CSystem%20Design%20Fight%20Club%7CSystem%20Design%3A%20Pastebin)

---

# Security & Privacy

Not stated in video.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CSystem%20Design%20Fight%20Club%7CSystem%20Design%3A%20Pastebin)

---

# Observability

Not stated in video.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CSystem%20Design%20Fight%20Club%7CSystem%20Design%3A%20Pastebin)

---

# Follow-up Questions

Not stated in video.

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CSystem%20Design%20Fight%20Club%7CSystem%20Design%3A%20Pastebin)

---

# Candidate Questions

Not stated in video.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CSystem%20Design%20Fight%20Club%7CSystem%20Design%3A%20Pastebin)

---

# Key Takeaways

- Use object stores like S3 for large blobs to avoid DB bloat.  
- Pre-signed URLs optimize uploads/downloads by bypassing services.  
- Bandwidth bounds arise in proxying; direct access mitigates.  
- Search adds complexity; Elasticsearch works but sync carefully.  
- Scale estimates: Base needs minimal machines; plan redundancy.  
- Naive approaches work small-scale but fail at high throughput.  
- Key generation is outsourced to avoid collisions.  
- Storage planning: Factor retention and replicas early.  
- Postgres suits small; DynamoDB for large/eventual.  
- Triggers/task runners ensure search indexing post-upload.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CSystem%20Design%20Fight%20Club%7CSystem%20Design%3A%20Pastebin)

---

# Glossary

- Object Store: Durable storage for blobs (e.g., S3).  
- Pre-signed URL: Temporary access link for direct uploads.  
- Inverted Index: Structure for efficient text search (in Elasticsearch).  
- Bandwidth Bound: Limited by data transfer rates.  
- DB Trigger: Event-based sync (e.g., to Elasticsearch).  
- Task Runner: Processes background jobs (e.g., indexing).

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CSystem%20Design%20Fight%20Club%7CSystem%20Design%3A%20Pastebin)

---

# Attribution

* Source Video: https://www.youtube.com/watch?v=9wAj-5IMdyU  
* Channel: System Design Fight Club  
* Note: This document is a summary of the linked mock interview.

---

# About the summarizer

I'm *Ali Sol*, a Backend Developer. Learn more:  

* Website: [alisol.ir](https://alisol.ir)  
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
