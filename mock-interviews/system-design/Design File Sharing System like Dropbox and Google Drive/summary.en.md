# System Design Mock Interview: Design file-sharing system like Google Drive / Dropbox (System design interview with EM)

**Channel/Interviewer**: IGotAnOffer: Engineering  
**Duration**: 00:48:42  
**Original Video**: https://www.youtube.com/watch?v=4_qu1F9BXow

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.*

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=mock-interviews/system-design/Design%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=mock-interviews/system-design/Design%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=mock-interviews/system-design/Design%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=mock-interviews/system-design/Design%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=mock-interviews/system-design/Design%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=mock-interviews/system-design/Design%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=mock-interviews/system-design/Design%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=mock-interviews/system-design/Design%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=mock-interviews/system-design/Design%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=mock-interviews/system-design/Design%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=mock-interviews/system-design/Design%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=mock-interviews/system-design/Design%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=mock-interviews/system-design/Design%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=mock-interviews/system-design/Design%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=mock-interviews/system-design/Design%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=mock-interviews/system-design/Design%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=mock-interviews/system-design/Design%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive)
<!-- LH-BUTTONS:END -->

## One-Page Executive Summary

**Problem Prompt (One-liner)**: Design a file-sharing system like Dropbox, iCloud, or Google Drive, focusing on uploading, downloading, syncing files across devices, and notifying clients of changes.

**Primary Scope**: Uploading and downloading files of any type (up to 10 GB per file, 15 GB per user), syncing across mobile, web, and desktop clients, and notifications for updates. System is blind to file contents—no previews for videos or photos.

**Non-Functional Priorities**: High availability and speed, low bandwidth usage, data consistency without loss, simplicity for ease of use, and trust through reliable syncing.

**Key Constraints & Numbers**: 100 million signed-up users, 1 million daily active users; average 1 file upload per user per day at 5 MB each; peak QPS around 20; total potential storage 1.5 PB; daily traffic 5 TB.

**High-Level Architecture (Text)**: 
- Clients (mobile, web, desktop) connect via load balancer to API servers.
- API servers handle metadata in a relational DB like MySQL.
- File storage in cloud object store like S3 with multipart uploads and pre-signed URLs for direct client access.
- Notification service using a message queue like Kafka to push metadata changes via WebSockets or long polling.
- Chunking files for efficient uploads/downloads, with MD5 hashes for deduplication.
- Regional replication for scalability, CDN for faster delivery.

**Top Trade-offs**:
- Direct S3 access vs. proxying through API servers: Favors direct for bandwidth efficiency but requires pre-signed URLs for security.
- Long polling vs. WebSockets for notifications: Long polling simpler initially, but WebSockets better for real-time.
- Single-region vs. multi-region: Starts single but replicates for availability and latency.
- Relational DB vs. NoSQL: Relational for metadata consistency, but scales with read replicas.

**Biggest Risks/Failure Modes**:
- Data loss during sync conflicts: Mitigate with conflict resolution (e.g., duplicate files with timestamps).
- High upload/download traffic overwhelming servers: Use chunking and direct cloud storage access.
- Notification delays or misses: Queue-based system ensures reliability, with retries.
- Database bottlenecks: Read replicas and sharding by user ID.
- S3 partitioning delays: Prefix file paths with random strings to preempt issues.
- Offline client reconciliation: Use timestamps and revisions for eventual consistency.

**5-Min Review Flashcards**:
- Q: Core features? A: Upload/download files, sync across devices, notify changes.
- Q: User scale? A: 1M DAU, 100M total; 1 file/day/user at 5 MB.
- Q: File limits? A: 10 GB/file, 15 GB/account.
- Q: Storage choice? A: S3 for blobs, MySQL for metadata.
- Q: Upload optimization? A: Multipart resumable uploads, chunking with MD5 hashes. [Personal note: Instead of MD5, prefer SHA-256 for file chunk hashing due to better collision resistance.]
- Q: Download flow? A: API returns pre-signed S3 URL for direct client fetch.
- Q: Sync mechanism? A: Clients poll or subscribe for metadata changes via queue.
- Q: Notification tech? A: Kafka queue to fan out changes, delivered via WebSockets/long polling. [Personal note: Instead of long polling, prefer WebSockets for real-time notifications in 2025 due to better efficiency and lower latency.]
- Q: Scaling? A: Regional data centers, CDN, DB replicas.
- Q: Conflict handling? A: Create duplicates with timestamps instead of overwriting.
- Q: Out-of-scope? A: File previews, editing, sharing, versioning/backups.
- Q: Trust focus? A: No data loss, high availability, encryption on client side.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CIGotAnOffer%3A%20Engineering%7CDesign%20file-sharing%20system%20like%20Google%20Drive%20%2F%20Dropbox%20%28System%20design%20interview%20with%20EM%29)

## Interview Tags

**Domain/Industry**: storage  
**Product Pattern**: object-storage  
**System Concerns**: high-availability, eventual-consistency, geo-replication, multi-tenancy  
**Infra/Tech (only if mentioned)**: microservices, rest, websocket, kafka, mysql, redis, s3, kubernetes, cdn  

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CIGotAnOffer%3A%20Engineering%7CDesign%20file-sharing%20system%20like%20Google%20Drive%20%2F%20Dropbox%20%28System%20design%20interview%20with%20EM%29)

## Problem Understanding

**Original Prompt**: "Design a system like Dropbox, iCloud, or Google Drive."

**Use Cases**: Primary—uploading/downloading files from one device and syncing to others (e.g., upload on phone, download on desktop). Secondary—notifications to trigger syncs; supports any file type without content-specific handling.

**Out of Scope**: File previews (e.g., video playback, photo thumbnails), in-app editing (e.g., Google Docs), sharing with non-users, versioning/backups (only latest file version kept).

**APIs (if discussed)**: 
- POST /upload/{file_id}: Sends file data; response 200 OK for resumable uploads.
- GET /download/{file_id}: Returns redirect to pre-signed S3 URL.
- GET /revisions/{file_id}: Returns list of changes with timestamps for sync reconciliation.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CIGotAnOffer%3A%20Engineering%7CDesign%20file-sharing%20system%20like%20Google%20Drive%20%2F%20Dropbox%20%28System%20design%20interview%20with%20EM%29)

## Requirements & Constraints

**Functional Requirements** (Given in Video):
- Upload and download files up to 10 GB.
- Sync files across multiple clients/devices.
- Notify clients of file changes for automatic downloads.
- Support any file type; no previews or content processing.

**Non-Functional Requirements** (Given in Video):
- High availability: Service always up for access.
- Low latency and bandwidth: Fast syncs without hogging resources.
- Data consistency: No loss, eventual consistency across devices.
- Scalability: Handle 1M DAU, 5 TB daily traffic.
- Simplicity and trust: Easiest/most reliable platform.

**Assumptions**:
- Average file size 5 MB; 1 upload per user per day (conservative for traffic estimation).
- Clients handle offline reconciliation using timestamps.
- No need for strong global consistency; eventual is sufficient.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CIGotAnOffer%3A%20Engineering%7CDesign%20file-sharing%20system%20like%20Google%20Drive%20%2F%20Dropbox%20%28System%20design%20interview%20with%20EM%29)

## Back-of-the-Envelope Estimation

- Total storage: 100M users × 15 GB limit = 1.5 PB (but actual usage lower).
- Daily uploads: 1M DAU × 1 file × 5 MB = 5 TB traffic.
- QPS: 1M DAU / 86,400 seconds ≈ 11 average; peak 20–22.
- Notification throughput: Matches upload rate, fanned out to connected devices per user.

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CIGotAnOffer%3A%20Engineering%7CDesign%20file-sharing%20system%20like%20Google%20Drive%20%2F%20Dropbox%20%28System%20design%20interview%20with%20EM%29)

## High-Level Architecture

- Clients (mobile/web/desktop) interact with load balancer (e.g., AWS ELB) routing to API servers (e.g., EC2/Kubernetes).
- API servers manage requests, authenticate users, and handle metadata ops.
- Metadata stored in relational DB (MySQL/RDS) with user ID sharding, read replicas for scale.
- File blobs in object storage (S3) with direct client uploads/downloads via pre-signed URLs.
- Notification system: API servers publish changes to message queue (Kafka), which fans out to clients via WebSockets or long polling.
- Chunking: Break files into 5 MB pieces with hashes for dedup and resumability.
- CDN (e.g., CloudFront) caches frequent downloads regionally.
- Regional replication: Duplicate API/DB setups across data centers for HA and low latency.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CIGotAnOffer%3A%20Engineering%7CDesign%20file-sharing%20system%20like%20Google%20Drive%20%2F%20Dropbox%20%28System%20design%20interview%20with%20EM%29)

## Subsystem: Client-Side Logic

**Role & Responsibilities**: Handle local file monitoring, uploads/downloads, sync reconciliation, and notifications.

**Data Model (from video only)**: Local file state with paths, timestamps, revisions.

**APIs/Contracts**: Call API for upload initiation, download URLs, revision checks.

**Scaling & Partitioning**: N/A (client-side).

**Caching Strategy**: Local storage for metadata/offline access.

**Consistency Model**: Eventual; reconcile on reconnect using timestamps.

**Bottlenecks & Hot Keys**: Large files; mitigated by chunking.

**Failure Handling**: Resumable uploads/downloads; retry on network issues.

**Cost Considerations**: Minimize bandwidth with delta syncs (chunks only).

[Ask AI: Subsystem - Client-Side Logic](https://alisol.ir/?ai=Subsystem%20-%20Client-Side%20Logic%7CIGotAnOffer%3A%20Engineering%7CDesign%20file-sharing%20system%20like%20Google%20Drive%20%2F%20Dropbox%20%28System%20design%20interview%20with%20EM%29)

## Subsystem: API Servers

**Role & Responsibilities**: Authenticate, generate pre-signed URLs, update metadata, publish changes to queue.

**Data Model (from video only)**: Tables for users (ID, storage used), files (ID, user ID, path, size, timestamp, is_folder boolean).

**APIs/Contracts**: Upload/init, download/url, revisions/list.

**Scaling & Partitioning**: Horizontal scaling with load balancer; shard DB by user ID.

**Caching Strategy**: Redis for hot metadata (e.g., recent revisions).

**Consistency Model**: Strong for metadata writes.

**Bottlenecks & Hot Keys**: High QPS users; shard and cache.

**Failure Handling**: Idempotent ops, retries to DB/queue.

**Cost Considerations**: Offload file transfer to S3/CDN.

[Ask AI: Subsystem - API Servers](https://alisol.ir/?ai=Subsystem%20-%20API%20Servers%7CIGotAnOffer%3A%20Engineering%7CDesign%20file-sharing%20system%20like%20Google%20Drive%20%2F%20Dropbox%20%28System%20design%20interview%20with%20EM%29)

## Subsystem: Storage

**Role & Responsibilities**: Durable file blob storage with direct access.

**Data Model (from video only)**: Buckets with prefixed paths (e.g., app/random/user_id/file).

**APIs/Contracts**: Multipart upload, pre-signed GET/PUT.

**Scaling & Partitioning**: S3 handles auto-partitioning; prefix with random strings to avoid hot partitions.

**Caching Strategy**: CDN for reads.

**Consistency Model**: Eventual for S3.

**Bottlenecks & Hot Keys**: Large directories; random prefixes mitigate.

**Failure Handling**: Multi-region replication.

**Cost Considerations**: Pay-per-use; enable versioning for premiums.

[Ask AI: Subsystem - Storage](https://alisol.ir/?ai=Subsystem%20-%20Storage%7CIGotAnOffer%3A%20Engineering%7CDesign%20file-sharing%20system%20like%20Google%20Drive%20%2F%20Dropbox%20%28System%20design%20interview%20with%20EM%29)

## Subsystem: Notifications

**Role & Responsibilities**: Detect changes and push to clients for sync.

**Data Model (from video only)**: Metadata changes (file ID, timestamp).

**APIs/Contracts**: Subscribe endpoint for WebSockets/long polling.

**Scaling & Partitioning**: Kafka topics sharded by user ID.

**Caching Strategy**: N/A.

**Consistency Model**: At-least-once delivery.

**Bottlenecks & Hot Keys**: Fan-out for active users; queue buffers.

**Failure Handling**: Retries, dead-letter queues.

**Cost Considerations**: Managed Kafka for ops ease.

[Ask AI: Subsystem - Notifications](https://alisol.ir/?ai=Subsystem%20-%20Notifications%7CIGotAnOffer%3A%20Engineering%7CDesign%20file-sharing%20system%20like%20Google%20Drive%20%2F%20Dropbox%20%28System%20design%20interview%20with%20EM%29)

## Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
|-------|----------|----------|-----------------|------------------------|
| Notification delivery | Long polling | WebSockets | WebSockets | Long polling wastes resources; WebSockets enable real-time push. [Personal note: Instead of long polling, prefer WebSockets for real-time notifications in 2025 due to better efficiency and lower latency.] |
| File transfer | Proxy through API | Direct to S3 | Direct to S3 | Proxy ties up servers; direct offloads bandwidth with security via pre-signed URLs. |
| Database | MySQL (relational) | NoSQL (e.g., DynamoDB) | MySQL | Relational ensures consistency for metadata; scales with replicas. |
| Chunk hashing | MD5 | SHA-256 | MD5 | MD5 sufficient for dedup; simple and fast. [Personal note: Instead of MD5, prefer SHA-256 for file chunk hashing due to better collision resistance.] |
| Scaling | Single region | Multi-region | Multi-region | Single for start; multi for HA and low latency across geographies. |
| Conflict resolution | Overwrite | Duplicate with timestamp | Duplicate | Prevents data loss; user can manually resolve. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CIGotAnOffer%3A%20Engineering%7CDesign%20file-sharing%20system%20like%20Google%20Drive%20%2F%20Dropbox%20%28System%20design%20interview%20with%20EM%29)

## Reliability, Availability, and Performance

- Replication: DB master-slave with read replicas; S3 multi-region.
- Latency budget: API <100ms, downloads via CDN for regional speed.
- Backpressure & throttling: Queue for notifications; rate-limit uploads.
- Load shedding & degradation: Prioritize writes; fallback to long polling.
- Disaster recovery: Regional failovers; no RPO/RTO stated.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CIGotAnOffer%3A%20Engineering%7CDesign%20file-sharing%20system%20like%20Google%20Drive%20%2F%20Dropbox%20%28System%20design%20interview%20with%20EM%29)

## Security & Privacy

- AuthN/AuthZ: User authentication for API access; pre-signed URLs for files.
- Encryption: Client-side encryption to protect against breaches.
- PII handling: Metadata isolated; no content scanning.
- Abuse prevention: Storage quotas, rate limits.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CIGotAnOffer%3A%20Engineering%7CDesign%20file-sharing%20system%20like%20Google%20Drive%20%2F%20Dropbox%20%28System%20design%20interview%20with%20EM%29)

## Observability

Not stated in video.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CIGotAnOffer%3A%20Engineering%7CDesign%20file-sharing%20system%20like%20Google%20Drive%20%2F%20Dropbox%20%28System%20design%20interview%20with%20EM%29)

## Follow-up Questions

- Does this design account for folders?
- How to handle read traffic vs. write traffic?
- Improvements for scaling?

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CIGotAnOffer%3A%20Engineering%7CDesign%20file-sharing%20system%20like%20Google%20Drive%20%2F%20Dropbox%20%28System%20design%20interview%20with%20EM%29)

## Candidate Questions

- How many users and traffic estimates?
- File type restrictions?
- Client platforms?

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CIGotAnOffer%3A%20Engineering%7CDesign%20file-sharing%20system%20like%20Google%20Drive%20%2F%20Dropbox%20%28System%20design%20interview%20with%20EM%29)

## Key Takeaways

- Start with requirements clarification to scope the problem.
- Use cloud storage like S3 from day one for trust and scalability.
- Offload heavy lifting (uploads/downloads) to clients via pre-signed URLs.
- Handle sync with metadata notifications and timestamps for reconciliation.
- Chunk files for efficiency and deduplication. [Personal note: Instead of MD5, prefer SHA-256 for file chunk hashing due to better collision resistance.]
- Prefer WebSockets for real-time over long polling. [Personal note: Instead of long polling, prefer WebSockets for real-time notifications in 2025 due to better efficiency and lower latency.]
- Scale regionally with replication and CDN.
- Resolve conflicts conservatively to avoid data loss.
- Focus on non-functional goals like trust and simplicity.
- Know component features (e.g., S3 multipart) to leverage them.
- Discuss trade-offs openly with interviewer.
- Practice drawing and explaining flows quickly.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CIGotAnOffer%3A%20Engineering%7CDesign%20file-sharing%20system%20like%20Google%20Drive%20%2F%20Dropbox%20%28System%20design%20interview%20with%20EM%29)

## Glossary

- Multipart upload: Breaking files into parts for resumable transfers.
- Pre-signed URL: Temporary secure link to access S3 objects.
- Message queue: System like Kafka for async event distribution.
- Sharding: Partitioning data (e.g., by user ID) for scale.
- CDN: Content Delivery Network for caching and regional speed.
- Eventual consistency: Data syncs over time, not instantly.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CIGotAnOffer%3A%20Engineering%7CDesign%20file-sharing%20system%20like%20Google%20Drive%20%2F%20Dropbox%20%28System%20design%20interview%20with%20EM%29)

## Attribution

* Source Video: https://www.youtube.com/watch?v=4_qu1F9BXow
* Channel: IGotAnOffer: Engineering
* Note: This document is a summary of the linked mock interview.

## About the summarizer

I'm *Ali Sol*, a Backend Developer. Learn more:

* Website: [alisol.ir](https://alisol.ir)
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
