# Design File Sharing System like Dropbox and Google Drive

- *Official link:* https://www.youtube.com/watch?v=4_qu1F9BXow
- *Channel:* IGotAnOffer: Engineering
- *Interviewee:* “Alex, senior developer and engineering manager; worked at Shopify for over 10 years.”
- *Duration:* **00:48:41** 

---

## 1) One-Page Executive Summary (2–3 min skim)

**Problem Prompt (one-liner).** Design a file syncing/sharing system like Dropbox, iCloud, or Google Drive: upload/download files, sync across devices, and notify clients of changes.   

**Primary Scope.**  
- In-scope: uploads, downloads, multi-device sync, change notifications, metadata storage, direct object storage access, CDN.    
- Mentioned but not deeply covered: database setup details, client-side encryption, S3 versioning/backups.   

**Non-Functional Priorities (as discussed).**  
- Consistency for metadata (pick relational DB to keep metadata strongly consistent).   
- Low latency for API; long-running data transfers bypass API servers.   
- Regional performance via CDN. 

**Key Constraints & Numbers (if any).** Not stated in video.

**High-Level Architecture (text).**  
- Clients (web/mobile/desktop) call APIs for auth and metadata; bulk data flows directly to object storage (e.g., S3) using client→storage paths.   
- Metadata stored in relational DB (e.g., RDS MySQL/Postgres).   
- CDN sits in front of storage for faster, regional reads and cost/perf benefits.   
- DB replicas for reads and failover (speaker used “slave” + read replicas).   
  [Personal note: Prefer **primary/replica** terminology and managed failover in 2025 for clarity and automation.]  
- Optional: client-side encryption; optional S3 versioning/backups as product features.  

**Top Trade-offs.**  
- **Relational vs NoSQL** for metadata: chose relational for strong consistency & familiarity.   
- **API throughput vs data path**: keep APIs snappy; move bulk bytes off the API tier.   
- **CDN vs multi-DC** for read perf: CDN can deliver regional speed without full multi-DC complexity. 

**Biggest Risks / Failure Modes.**  
- DB single-primary failure; need replicas/failover.   
- Data breach risk if objects are compromised; mitigated via client-side encryption.   
- Cost growth from storing multiple versions/backups.   
  [Personal note: S3 versioning/backups are **not free**; apply lifecycle policies to control cost.]

**5-Min Review Flashcards.**  
- Q: Why direct-to-S3 for uploads/downloads? A: Prevents API servers from being blocked by long transfers.   
  [Personal note: Use **presigned URLs** with short TTL for direct access in 2025.]  
- Q: Why relational DB for metadata? A: Strong consistency and wide team familiarity.   
- Q: What improves regional read latency? A: CDN in front of object storage.   
- Q: What’s the purpose of read replicas? A: Scale reads and support failover.   
- Q: Why client-side encryption? A: Mitigates breach/leak risk if storage or devices are compromised.   
  [Personal note: Prefer envelope encryption with managed KMS and per-object keys in 2025.]

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive)

---

## 2) Interview Tags

**Domain/Industry.** `storage, collaboration`  
**Product Pattern.** `object-storage, cdn, caching, queue (implied by notifications)`  
**System Concerns.** `high-availability, low-latency, geo-replication (via CDN), privacy`  
**Infra/Tech (mentioned).** `s3, cdn, mysql/postgres, rds`  

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive)

---

## 3) Problem Understanding

**Original Prompt.** Build a Dropbox/iCloud/Google Drive-like system: upload/download, sync across devices, notify clients of updates.   

**Use Cases.**  
- Upload file → store object bytes; track metadata.  
- Download file (often via CDN).   
- Sync across user’s devices; receive change notifications.   
- Optional: restore earlier versions/backups. 

**Out of Scope (explicitly not detailed).** Deep database setup internals; extensive client features beyond core flows. 

**APIs (if discussed).** APIs are mentioned at a high level; detailed request/response not specified.   
→ **APIs:** *Not stated in video* (beyond generic login/metadata operations). 

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive)

---

## 4) Requirements & Constraints

**Functional (from video).**  
- Upload/download files.   
- Sync across devices & notify clients of updates.   
- Store metadata (names, owners, versions).  

**Non-Functional (from video).**  
- Strong consistency for metadata (relational DB chosen).   
- Keep API latency low; move bulk data off API servers.   
- Regional performance via CDN. 

**Assumptions (conservative).**  
- Use presigned URLs for client↔storage access (implied by direct S3 path).   
  [Personal note: Use short-TTL v4 signatures and restrict method/object scope.]

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive)

---

## 5) Back-of-the-Envelope Estimation

*Not stated in video — skipping numerical estimation.* 

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive)

---

## 6) High-Level Architecture

- **Clients** (desktop/mobile/web) authenticate and call metadata APIs; long file transfers do **not** traverse API servers.   
- **Object Storage** (e.g., S3) stores file bytes; clients upload/download directly.   
  [Personal note: Prefer multipart/resumable uploads to improve reliability on large files.]  
- **CDN** fronts storage for faster regional reads and lower origin load.   
- **Metadata DB** on RDS (MySQL/Postgres) for strong consistency and team familiarity.    
- **Replicas** for read scaling and failover (speaker mentions “slave” + read replicas).   
  [Personal note: Use “primary/replica” and enable managed failover in 2025.]  
- **Security**: Client-side encryption proposed to reduce breach impact.   
  [Personal note: Envelope encryption with managed KMS and per-object keys is common in 2025.]

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive)

---

## 7) Deep Dives by Subsystem

### 7.1 Storage & CDN
**Role.** Store and serve file bytes; accelerate reads regionally.  
**Flow.** Client uploads/downloads directly to storage; CDN caches objects to reduce latency/cost.    
[Personal note: Configure cache-control/ETags and signed URLs at the edge for secure sharing in 2025.]

**Extras.** Versioning/backups are called out as attractive add-ons (especially for paid tiers).   
[Personal note: Versioning increases storage costs; apply lifecycle rules (e.g., transition older versions).]

[Ask AI: Storage & CDN](https://alisol.ir/?ai=Storage%20%26%20CDN%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive)

---

### 7.2 Metadata Service / Database
**Role.** Track users, files, ownership, versions, and relationships.  
**Tech choice.** RDS (MySQL/Postgres) to ensure strong consistency and operational familiarity.    
**Scaling.** Use replicas for reads; plan for failover.   
[Personal note: Consider row-level ACLs and composite indexes on (owner_id, path/name, version).]

[Ask AI: Metadata Service](https://alisol.ir/?ai=Metadata%20Service%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive)

---

### 7.3 Sync & Notifications
**Role.** Keep devices up to date; notify clients when changes occur.  
**Notes.** Explicitly called out as a requirement; specific protocol/queue not detailed.   
[Personal note: In practice, use pub/sub (e.g., push notifications + long-poll/websocket channel) with back-off and dedupe in 2025.]

[Ask AI: Sync & Notifications](https://alisol.ir/?ai=Sync%20%26%20Notifications%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive)

---

## 8) Data Model Hints (from the video)

**Files table (excerpt).** Includes name, type, owner_id referencing users; used to represent uploaded files.  

**File_Versions table.** Contains id, file_id, version_number (discussed as needed for multiple versions).  

[Ask AI: Data Model](https://alisol.ir/?ai=Data%20Model%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive)

---

## 9) Freshness Review (inline notes)

A few items in the video may warrant 2025-era nuances:

- **“Slave / read replicas” wording** → [Personal note: Use **primary/replica** terminology and enable managed failover.]   
- **S3 versioning/backups “sort of for free”** → [Personal note: Versioning costs accumulate; add lifecycle rules to control spend.]   
- **Client-side encryption** → [Personal note: Prefer envelope encryption with managed KMS; rotate keys and scope per object.]   
- **Direct client↔S3 transfers** → [Personal note: Use presigned URLs with short TTL; enforce least-privilege and content length constraints.] 

[Ask AI: Freshness Review](https://alisol.ir/?ai=Freshness%20Review%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive)

---

## 10) Biggest Risks & Mitigations

- **Primary DB failure** → replicas and failover.   
- **Data breaches (storage/device theft)** → client-side encryption.   
- **Regional latency** → CDN to avoid cross-region RTTs for common reads. 

[Ask AI: Risks](https://alisol.ir/?ai=Risks%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive)

---

## 11) Credits / Notes

- Interview hosted on IGotAnOffer: Engineering; guest “Alex” (Shopify background).   
- This write-up follows the video’s content only; unspecified details are intentionally left as *Not stated in video* or clearly marked *Assumption*.

[Ask AI: Credits](https://alisol.ir/?ai=Credits%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive)

