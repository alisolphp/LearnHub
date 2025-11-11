# System Design Mock Interview: Design Facebook / Instagram (News Feed)

* **System Design Mock Interview**: Design Facebook / Instagram (News Feed)
* **Channel/Interviewer**: CodeKarle
* **Duration**: 00:46:33
* **Original Video**: `https://www.youtube.com/watch?v=9-hjBGxuiEs`

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.* 

---

## One-Page Executive Summary (2–3 min skim)

**Problem Prompt (One-liner)**  
Design a social network like Facebook (also adaptable to Instagram/LinkedIn/Twitter) with posts (text/images/videos), likes, comments, shares, friends, timelines/feeds, user profiles, activity logs, and search—at massive scale. 

**Primary Scope**  
- In-scope: posts, likes, comments, shares, add friend (undirected), user/profile pages, timelines (self + friends), activity tracking, search, trends, relevance tags, live updates.   
- Out-of-scope (explicit): nested comments; chat is mentioned as *not part of this build*.  

**Non-Functional Priorities**  
- Read-heavy system; low latency rendering (some propagation lag acceptable); global reach (multi-geo); cost-aware; horizontally scalable services and storage. 

**Key Constraints & Numbers (as stated)**  
- Very large DAU/MAU (billion-scale cited as motivating assumptions), mobile-dominant access; heavy minute-wise write volumes: images, statuses, comments. 

**High-Level Architecture (Text)**  
- Clients (mobile/web) → LB/Reverse proxy/Auth → microservices (User, Graph, Post Injection, Post, Timeline, Like, Comment, Search, Live User) → caches (Redis) → stores (MySQL for users/graph; Cassandra for posts/likes/comments; S3 for assets; ElasticSearch for search) → streams (Kafka) → batch/stream analytics (Spark/Hadoop) → CDN/asset pipeline.  

**Top Trade-offs**  
- **Push vs Pull feed**: pre-materialize timelines in Redis for “normal” users; merge on read for “famous” users to avoid massive fan-out writes.   
- **Hot content lifecycle**: serve recent media via CDN; demote to S3 as interest decays; promote back if popularity resurges.   
- **Relational vs wide-column**: MySQL for relatively static, relational user/graph data vs Cassandra/HBase for high-write post/engagement data.   
- **Latency vs freshness**: allow seconds of propagation lag for analytics/relevance tagging to complete, but keep UI render latency low. 

**Biggest Risks/Failure Modes**  
- Hot partitions/hot keys in Cassandra due to poor partitioning (e.g., date-key).   
- Cache pressure if Redis timelines store too much history (mitigated via daily archival to Cassandra).   
- Global performance variability without regionally distributed infra/CDN. 

**5-Min Review Flashcards**  
- Q: Why Redis for timelines? A: Fast reads for a read-heavy feed; push filtered post IDs per user.   
- Q: Why not always push for celebrities? A: Fan-out becomes unscalable; merge-on-read for famous users.   
- Q: Where are assets stored? A: S3 + CDN with transcoding/resizing via Asset Service.   
- Q: What powers search? A: Kafka → Elasticsearch → Search service.   
- Q: How are likes counted fast? A: Cassandra for durability + Redis atomic counters for recent posts.   
- Q: How are user interests inferred? A: Stream to Hadoop/Spark; classify posts; derive per-user relevance tags.   
[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

---

## Interview Tags (for later filtering)

**Domain/Industry**: `social-media`, `analytics`, `search`  
**Product Pattern**: `feed`, `timeline`, `newsfeed`, `url-shortener`, `object-storage`, `cdn`, `caching`, `search-index`, `pub-sub`, `recommendation`, `notification`  
**System Concerns**: `high-availability`, `low-latency`, `eventual-consistency`, `geo-replication`, `hot-key`, `autoscaling`  
**Infra/Tech (mentioned)**: `microservices`, `rest`, `websocket`, `kafka`, `mysql`, `cassandra`, `redis`, `s3`, `hdfs`, `elasticsearch`, `spark`, `cdn`  
[Personal note: Using classic Hadoop/HDFS is less common in 2025; many teams use cloud object storage + Spark/Flink on managed platforms—consider if you’re in the cloud.]  
[Personal note: Elasticsearch remains fine; OpenSearch or managed cloud search can reduce ops burden.]  
[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

---

## Problem Understanding

**Original Prompt**  
Design a scalable Facebook-like social network that supports posts (text/images/videos), likes, comments, shares, adding friends, viewing timelines (self + friends), and tracking user activity; optimize for read-heavy workloads and global users. 

**Use Cases**  
- Create post (text/image/video; URL shortener for links).   
- View personal profile/timeline; view others’ profiles and posts.   
- Like/comment/share posts; count likes; fetch comments.   
- Add friend (undirected relationship).  
- Activity log of user actions (post/like/comment/search). 

**Out of Scope**  
- Nested comments (limited to comments-on-posts).   
- Chat (referenced only as possible consumer of “last accessed” data). 

**APIs (high level, as implied)**  
- User: get/update by userId; bulk fetch.  
- Graph: fetch friends; relationship weights.  
- Post: create/read by id; bulk read; timeline reads.  
- Like/Comment: add; fetch counts/list.  
- Search: query posts. *(Detailed request/response shapes not stated.)*  
[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

---

## Requirements & Constraints

**Given in Video — Functional**  
- Post (text/image/video with URL shortener).  
- Like, Comment, Share.  
- Add friend (non-directional).  
- View timelines (self; friends-aggregated).  
- View profiles.  
- Activity log; Search; Trends; Relevance tags.  

**Given in Video — Non-Functional**  
- Read-dominant; low render latency; tolerate seconds of propagation lag; global availability; mobile-first optimization; horizontal scalability; comprehensive monitoring/alerting.  

**Assumptions (conservative)**  
- Soft real-time feed freshness (≤ ~tens of seconds).  
- Best-effort relevance (ML-driven tags + graph weights).  
[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

---

## Back-of-the-Envelope Estimation

*Not stated in video—skipping numerical estimation.*  
[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

---

## High-Level Architecture

1. **Clients & Edge**: Mobile apps/web → LB/Reverse Proxy/Auth.  
2. **User Service (MySQL + Redis)**: source of truth for user profiles; cache user data; publish account events to Kafka.   
3. **Graph Service (MySQL + Redis)**: friendships (non-directional) and relationship weights; fast friend list lookups.   
4. **Asset & ShortURL Services**: media ingest, transcoding/resizing, CDN/S3 tiering; shorten outbound links.   
5. **Post Injection → Cassandra → Kafka**: persist new posts; emit events.   
6. **Analytics (Streaming + ML)**: classify posts; add tags; republish to Kafka.   
7. **Post Processor**: compute recipients via friends + relevance tags; push post IDs into per-user Redis timelines.   
8. **Timeline Service**:  
   - “Others’ profile” view = read posts by author from Post Service.  
   - “Home” = merge (Redis normal users + live query for famous users) and return; periodically refresh and archive daily slices to Cassandra.   
9. **Engagement**: Like Service (Cassandra + Redis counters), Comment Service (Cassandra).   
10. **Search**: Kafka → Elasticsearch; Search Service on top (+ optional Redis result cache).   
11. **Live Updates**: Live User Service holds WebSocket connections; pushes new content to currently-online users.   
12. **Observability**: monitor latency/throughput/cpu/mem/disk across services, DBs, caches, Kafka; alert on thresholds.   
[Personal note: Cassandra remains a solid choice; in managed-cloud contexts, consider Bigtable/DynamoDB for simpler ops if they fit your consistency and query patterns.]  
[Personal note: Elasticsearch is fine; OpenSearch/managed search are common to reduce cluster ops in 2025.]  
[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

---

## Deep Dives by Subsystem

### 8.1 User Service
- **Role**: user CRUD, profile data, last-access times, user type (active/live/passive/famous), relevance tags.   
- **Data Model**: MySQL tables for users; Redis cache keyed by userId storing profile, userType, lastAccess, tags, friends list (also stored by Graph Service).   
- **Consistency**: strong for profile writes (MySQL), eventual for cached reads.  
- **Events**: publish to Kafka on create/update for fraud checks, notifications, analytics.   
[Personal note: If you need stronger PII guarantees, add at-rest encryption/key management and fine-grained auth around profile reads.]

[Ask AI: Subsystem - User Service](https://alisol.ir/?ai=Subsystem%20-%20User%20Service%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

### 8.2 Graph Service
- **Role**: friendship graph (undirected); expose friend lists; maintain directional “weight of friendship” for ranking.   
- **Storage**: MySQL (sharded); Redis for fast “friends-of-user” set lookups.   
- **Hot Keys**: beware famous users; consider separate caches/partitions.  
[Ask AI: Subsystem - Graph Service](https://alisol.ir/?ai=Subsystem%20-%20Graph%20Service%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

### 8.3 Asset Service & CDN
- **Role**: transcode images/videos to multiple aspect ratios/bitrates; mobile-friendly sizes; CDN promotion/demotion based on access patterns; S3 as origin.   
[Personal note: Modern media stacks often use chunked streaming (HLS/DASH) and per-geo caching; align with your client capabilities and CDN features.]

[Ask AI: Subsystem - Asset & CDN](https://alisol.ir/?ai=Subsystem%20-%20Asset%20%26%20CDN%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

### 8.4 Post Injection & Post Service
- **Role**: ingest posts (apply URL shortener & asset processing), persist to Cassandra, emit Kafka events; Post Service is source of truth and bulk fetcher.   
- **Scaling**: horizontal; write path sized for “thousands per second”.  
[Ask AI: Subsystem - Post Service](https://alisol.ir/?ai=Subsystem%20-%20Post%20Service%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

### 8.5 Analytics & Relevance
- **Streaming Classifier**: tag posts by topic; publish to Kafka.   
- **User Profiling**: Spark on Hadoop aggregates activity (posts/likes/comments) → per-user interest tags stored back via User Service.   
[Personal note: Classic Hadoop clusters are often replaced by cloud data lakes + Spark/Flink; choose based on your environment.]

[Ask AI: Subsystem - Analytics & Relevance](https://alisol.ir/?ai=Subsystem%20-%20Analytics%20%26%20Relevance%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

### 8.6 Feed Fan-out / Timeline Service
- **Push to Redis**: Post Processor filters recipients (friends ∩ relevance) and appends post IDs to users’ Redis timelines.   
- **Merge-on-read for Famous Users**: fetch their latest posts from Post Service at request time to avoid massive fan-out.   
- **Archival**: move per-user *daily* feed slices from Redis to Cassandra; clear Redis to keep cache bounded.   
[Ask AI: Subsystem - Timeline](https://alisol.ir/?ai=Subsystem%20-%20Timeline%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

### 8.7 Likes & Comments
- **Likes**: Cassandra table keyed by (postId,userId); Redis maintains recent-like counters via atomic increments.   
- **Comments**: Cassandra keyed by postId; no cache needed (ID-based lookups are fast).   
[Ask AI: Subsystem - Engagement](https://alisol.ir/?ai=Subsystem%20-%20Engagement%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

### 8.8 Live Users
- **Role**: WebSocket connections to online users; when new content relevant to them arrives, push update events.   
[Ask AI: Subsystem - Live Updates](https://alisol.ir/?ai=Subsystem%20-%20Live%20Updates%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

### 8.9 Activity Tracker
- **Role**: consume Kafka events (post/like/comment/search); write userId, timestamp, action, attributes to Cassandra; provide read APIs for user activity.   
[Ask AI: Subsystem - Activity Tracker](https://alisol.ir/?ai=Subsystem%20-%20Activity%20Tracker%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

### 8.10 Search
- **Pipeline**: Kafka → Elasticsearch index; Search Service executes queries; optional cache of results in Redis.   
[Personal note: Consider OpenSearch or managed search if you prefer not to operate clusters.]  
[Ask AI: Subsystem - Search](https://alisol.ir/?ai=Subsystem%20-%20Search%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

---

## Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
| --- | --- | --- | --- | --- |
| Feed delivery | Push to per-user Redis | Pull/merge on read | Hybrid | Push for normal users; merge for famous users to avoid huge fan-outs.  |
| Post store | Cassandra | HBase | Cassandra | Easier setup; handles high write/read throughput.  |
| Assets | CDN + S3 tiering | Always CDN | CDN+S3 | Cost and hotness-aware lifecycle.  |
| Search | Elasticsearch | RDBMS LIKE | Elasticsearch | Text search efficiency & scalability.  |

[Personal note: HBase is less common today unless you’re already on that ecosystem; consider managed Bigtable/DynamoDB if you want wide-column semantics without ops overhead.]  
[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

---

## Reliability, Availability, and Performance

- **Replication/Consistency**:  
  - MySQL for user/graph (strong writes); Redis caches (eventual).  
  - Cassandra for posts/likes/comments (distributed, partitioned; choose partition keys carefully to avoid hot spots).   
- **Latency Budget**: fast UI render; allow seconds of feed propagation for analytics/relevance.   
- **Backpressure & Load Shedding**: Kafka buffers write spikes; TTL-based cache entries for likes/trends; archival to keep Redis small.   
- **Disaster Recovery**: Not explicitly discussed.  
[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

---

## Security & Privacy

- AuthN/AuthZ via edge layer (reverse proxy/auth).  
- PII mainly in User Service (MySQL).  
- Abuse/spam: fraud checks on new accounts via Kafka consumers.   
*(Further details not stated in video.)*  
[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

---

## Observability

- Track latency, throughput, CPU, memory, disk across services, DBs, caches, Kafka; alert on thresholds to preserve SLOs.   
[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

---

## Key Takeaways

- Read-heavy social feeds benefit from **push + merge** hybrid delivery.   
- **Redis timelines** provide low-latency reads; **Cassandra** offers durable, scalable write-heavy stores.   
- **Relevance** = content tags + user interest profiles + graph weights.    
- **Media lifecycle**: use CDN for hot content; demote to S3 when cold; re-promote on new spikes.   
- **Avoid hot partitions**: choose partition keys carefully (avoid date as partition key).   
[Personal note: Consider Argon2id/bcrypt for any password storage in 2025; adaptive costs and built-in salting are table stakes.]  
[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

---

## Glossary

- **Famous Users**: users whose posts would cause extreme fan-out; handled by merge-on-read.   
- **Relevance Tags**: ML-derived per-user/content topics used to filter/score feed.   
- **Graph Weight**: directional affinity between friends based on interactions.   
- **Archival Service**: compacts daily feed slices into Cassandra to keep Redis small.   
[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

---

## Study Plan from This Interview (Optional)

- Rehearse trade-off of **push vs pull** for feeds.  
- Practice **partition key** design on Cassandra-like stores.  
- Implement a toy **Kafka → ES** search pipeline.  
- Build a **WebSocket** notifier for live updates.  
[Personal note: If you’re cloud-first, map each component to a managed equivalent to reduce ops and focus on design trade-offs.]  
[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram)

---

## Attribution

- Source Video: `https://www.youtube.com/watch?v=9-hjBGxuiEs`  
- Channel: CodeKarle  
- Note: This document is a summary of the linked mock interview.

---

## About the summarizer

I'm *Ali Sol*, a PHP Developer. Learn more:

- Website: [alisol.ir](https://alisol.ir)  
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
