# System Design Mock Interview: Twitter system design | twitter Software architecture | twitter interview questions

*title: "Design Twitter | x.com"*

**Channel/Interviewer**: Tech Dummies - Narendra Lakshmana Gowda  
**Duration**: 00:36:53  
**Original Video**: https://www.youtube.com/watch?v=wYk0xPP_P_8  

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.*

---

# One-Page Executive Summary

**Problem Prompt (One-liner)**: Design a system like Twitter, focusing on fast tweeting to followers, timelines (home, user, search), and trending hashtags by location.

**Primary Scope**: In-scope includes tweeting, generating timelines, calculating trends, and data flow; out-of-scope is specific technologies beyond core concepts like caching and streaming.

**Non-Functional Priorities**: Read-heavy system with high availability for reads, low latency (e.g., home timeline under 200ms), scalability for 600 tweets/sec writes and 600K views/sec reads, and eventual consistency (delays of 1-2 seconds acceptable).

**Key Constraints & Numbers**: 300M+ users; 600 tweets/sec (writes); 600K views/sec (reads, ~1:1000 write:read ratio); 140-character tweets; eventual consistency; no strict data consistency like banking.

**High-Level Architecture (Text)**:  
- Clients connect via load balancer to APIs for writes (tweeting) and reads (timelines/search).  
- Writes save to DB and fan out to Redis caches for timelines, with streaming to Kafka-like queues for trends and search indexing.  
- Reads fetch from Redis for timelines (hybrid push/pull for efficiency).  
- Trending uses stream processing (e.g., Storm/Heron) for hashtag counting and geo-ranking, stored in Redis.  
- Search employs inverted indexing (Earlybird) with scatter-gather across nodes.  
- Coordination via Zookeeper; DB sharding with Gizzard on MySQL; analytics in Cassandra.  
- Real-time via WebSocket for mobile/web.

**Top Trade-offs**:  
- Push (fan-out) vs. pull for home timelines: Push is fast for normal users but inefficient for celebrities; pull handles high fan-out but increases read latency.  
- Caching in Redis vs. DB queries: Reduces DB load but requires invalidation and memory management.  
- Eventual consistency vs. strong: Allows delays for scalability but may show stale data briefly.  
- Precomputing timelines vs. on-demand: Saves reads but wastes compute for inactive users.  
- Stream processing for trends: Handles real-time volume but adds complexity over batch jobs.

**Biggest Risks/Failure Modes**:  
- Hot keys for celebrities overwhelming Redis during fan-out or pulls.  
- High read volume (600K/sec) causing cache misses and DB overload.  
- Stream processing failures dropping tweets from trend calculations.  
- Inactive user data bloating Redis memory.  
- Single point of failure in Zookeeper or load balancers.  
- Geo-tagging inaccuracies leading to irrelevant trends.

**5-Min Review Flashcards**:  
- Q: What makes Twitter read-heavy? A: 1:1000 write:read ratio with 600 tweets/sec and 600K views/sec.  
- Q: Key timelines? A: Home (followed users), user (own tweets/retweets), search (keyword-related).  
- Q: Fan-out approach? A: Push tweets to followers' home timelines in Redis for normal users.  
- Q: Handling celebrities? A: Pull from their user timeline on read to avoid updating millions of caches.  
- Q: Inactive users? A: Skip precomputing timelines if not logged in >15 days to save resources.  
- Q: Trending calculation? A: Volume over time (e.g., 1K tweets in 5 min > 10K in a month) via stream processing.  
- Q: Stream pipeline? A: Filter (remove common words/violations), parse (NLP for hashtags), window (count rates), rank (by location).  
- Q: Search mechanism? A: Inverted index in Earlybird; scatter-gather queries across nodes.  
- Q: Data flow for tweet? A: Save to DB, fan-out to Redis, index for search, stream for trends.  
- Q: Caching strategy? A: Redis lists for tweet IDs and followers; in-memory for fast reads.  
- Q: Consistency model? A: Eventual, as tweet delays are acceptable.  
- Q: Coordination tool? A: Zookeeper for cluster management and master election.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions)

---

# Interview Tags

**Domain/Industry**: social-media  

**Product Pattern**: feed, timeline, newsfeed, search  

**System Concerns**: low-latency, eventual-consistency, hot-key  

**Infra/Tech (only if mentioned)**: websocket, kafka, mysql, cassandra, redis, zookeeper  

[Personal note: Apache Storm is somewhat outdated; consider Apache Flink or Spark Streaming for better fault tolerance and processing guarantees in 2025.] (for stream processing like Storm/Heron)

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions)

---

# Problem Understanding

**Original Prompt**: Design a system for Twitter, emphasizing fast tweeting to millions of followers, generating home/user/search timelines, calculating location-based trending hashtags, and overall data flow.

**Use Cases**: Primary: Tweeting and delivering to followers quickly; viewing home timelines (followed tweets), user timelines (own tweets/retweets), search results; seeing trends. Secondary: Handling retweets as copies or references; geo-specific trends.

**Out of Scope**: Specific technologies beyond core concepts; strict data consistency; high storage costs for tweets.

**APIs (if discussed)**: Not stated in video.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions)

---

# Requirements & Constraints

**Functional Requirements**  
- Users tweet and deliver to followers in seconds, even for millions.  
- Generate home timeline (tweets from followed users/pages).  
- Generate user timeline (own tweets/retweets).  
- Support search timeline for keywords/hashtags.  
- Compute trending hashtags/topics by location/worldwide.

**Non-Functional Requirements**:  
Given in Video:  
- Read-heavy (1:1000 write:read); fast reads via in-memory caching.  
- Low latency (e.g., home timeline <200ms).  
- Scalability for 300M users, 600 tweets/sec writes, 600K views/sec reads.  
- Eventual consistency (1-2s delays OK).  
- No high storage concerns due to cheap data costs and 140-char limits.  

Assumptions:  
- Assumption: Hybrid push/pull for timelines to handle fan-out scale.  
- Assumption: Stream processing for real-time trends.

**Capacity Inputs**: 300M+ users; 600 tweets/sec (writes); 600K views/sec (reads); average 150 follows per user; no regions/retention specified beyond scaling storage.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions)

---

# Back-of-the-Envelope Estimation

**Storage**: 140 chars/tweet ~ low cost; scale via sharding; no numerical sizing.  

**Bandwidth**: Not stated in video.  

**Cache Sizing**: Redis for timelines/followers; per-user lists (e.g., tweet IDs); memory for 300M users but skip inactive (>15 days).  

**Shard Keys & Partition Counts**: User ID for Redis/DB sharding; thousands of Redis nodes in clusters.  

**Peak Throughput & Concurrency**: 600 writes/sec; 600K reads/sec; fan-out up to millions but hybrid to mitigate; WebSocket for millions of connections.

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions)

---

# High-Level Architecture

- Clients (web/mobile) connect via load balancer to APIs.  
- Write API handles tweets: Saves to DB (Gizzard on MySQL), fans out to Redis timelines, sends to search index (Earlybird), and streams to Kafka for trends.  
- Timeline service fetches from Redis (push for normal, pull for celebs); uses user/follower lists.  
- Search service uses inverted index with scatter-gather across distributed nodes.  
- Trending via stream processing (Storm/Heron with Kafka): Filters, parses, windows, ranks by geo; results in Redis.  
- WebSocket/HTTP push for real-time updates.  
- Zookeeper coordinates Redis/DB clusters.  
- Cassandra for analytics/big data.

[Personal note: Apache Storm is somewhat outdated; consider Apache Flink or Spark Streaming for better fault tolerance and processing guarantees in 2025.] (for stream processing)

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions)

---

## Subsystem: Timelines

**Role & Responsibilities**: Generate and serve home (followed tweets), user (own/retweets), and search timelines quickly.

**Data Model (from video only)**: Users table (ID, profile); Tweets table (ID, content, timestamp, user ID); Follows table (user ID to followed IDs, one-to-many). Retweets as copies or references in tweets table.

**APIs/Contracts**: Not stated in video.

**Scaling & Partitioning**: Shard by user ID; Redis clusters for horizontal scale.

**Caching Strategy**: Redis lists: user_id:tweets (tweet IDs); user_id:followers (IDs). Precompute for active users; TTL/implicit via inactivity.

**Consistency Model**: Eventual (delays OK).

**Bottlenecks & Hot Keys**: Celebrity fan-out (millions); mitigate with pull on read.

**Failure Handling**: Cache misses fall back to DB; eventual sync.

**Cost Considerations**: Memory in Redis vs. cheap storage.

[Ask AI: Subsystem - Timelines](https://alisol.ir/?ai=Subsystem%20-%20Timelines%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions)

---

## Subsystem: Trending

**Role & Responsibilities**: Compute trending hashtags/topics by volume over time, geo-specific.

**Data Model (from video only)**: Hashtags from parsed tweets; counts/rates per window (e.g., 1min/10min); mapped to locations.

**APIs/Contracts**: Not stated in video.

**Scaling & Partitioning**: Distributed stream operators; Kafka topics for queuing.

**Caching Strategy**: Results stored in Redis for fast API reads.

**Consistency Model**: Eventual.

**Bottlenecks & Hot Keys**: High tweet volume; window operations handle bursts.

**Failure Handling**: Drop violating tweets; async processing.

**Cost Considerations**: Not stated in video.

[Personal note: Apache Storm is somewhat outdated; consider Apache Flink or Spark Streaming for better fault tolerance and processing guarantees in 2025.]

[Ask AI: Subsystem - Trending](https://alisol.ir/?ai=Subsystem%20-%20Trending%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions)

---

## Subsystem: Search

**Role & Responsibilities**: Handle keyword/hashtag searches via inverted indexing.

**Data Model (from video only)**: Words/hashtags mapped to tweet IDs in distributed tables.

**APIs/Contracts**: Not stated in video.

**Scaling & Partitioning**: Distributed nodes; scatter-gather queries.

**Caching Strategy**: Not stated in video.

**Consistency Model**: Eventual.

**Bottlenecks & Hot Keys**: Popular queries; distributed to avoid.

**Failure Handling**: Gather partial results if nodes fail.

**Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Search](https://alisol.ir/?ai=Subsystem%20-%20Search%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions)

---

## Subsystem: Data Flow

**Role & Responsibilities**: Route tweets through system for persistence, fan-out, indexing, and processing.

**Data Model (from video only)**: Tweets flow to DB, Redis, search, streaming.

**APIs/Contracts**: Write API for tweets; timeline/search APIs for reads.

**Scaling & Partitioning**: Load balancer; clustered services.

**Caching Strategy**: Redis for timelines.

**Consistency Model**: Eventual.

**Bottlenecks & Hot Keys**: Write spikes; queues buffer.

**Failure Handling**: Async sends; retries implied.

**Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Data Flow](https://alisol.ir/?ai=Subsystem%20-%20Data%20Flow%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions)

---

# Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
|-------|----------|----------|-----------------|------------------------|
| Home Timeline Generation | Push (fan-out on write) | Pull (on read) | Hybrid: Push for normal, pull for celebs | Push is fast but scales poorly for millions of followers; pull avoids write amplification but adds read compute. |
| Consistency | Strong | Eventual | Eventual | Delays OK for social feeds, enables scalability over strict sync. |
| Storage | MySQL (Gizzard) | Cassandra | Both: MySQL for core, Cassandra for analytics | MySQL for relational needs; Cassandra for big data scale. |
| Stream Processing | Batch jobs | Real-time (Storm/Heron) | Real-time | Captures bursty trends (volume over short time) efficiently. [Personal note: Apache Storm is somewhat outdated; consider Apache Flink or Spark Streaming for better fault tolerance and processing guarantees in 2025.] |
| Caching | Full DB reliance | Redis in-memory | Redis | Faster reads for read-heavy app; horizontal scale but needs persistence backup. |
| User Activity | Precompute all | Skip inactive | Skip if >15 days inactive | Saves memory/compute; no waste on unused data. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions)

---

# Reliability, Availability, and Performance

- Eventual consistency for tweets/timelines (no quorum needed).  
- Low latency via Redis in-memory reads (<200ms for timelines).  
- No explicit backpressure/throttling discussed.  
- No load shedding/degradation mentioned.  
- No disaster recovery (RPO/RTO) stated.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions)

---

# Security & Privacy

Not stated in video.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions)

---

# Observability

Not stated in video.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions)

---

# Follow-up Questions

Not stated in video.

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions)

---

# Candidate Questions

Not stated in video.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions)

---

# Key Takeaways

- Twitter is read-heavy; optimize for fast reads with in-memory caching like Redis.  
- Use hybrid fan-out: Push for normal users, pull for celebrities to handle scale.  
- Skip precomputing for inactive users to save resources.  
- Trends focus on velocity (volume over short time) via stream processing.  
- Search relies on inverted indexes with distributed queries.  
- Eventual consistency enables scalability for non-critical data.  
- Data flow: Writes to DB/cache/stream/search for comprehensive handling.  
- Coordination with Zookeeper for large clusters.  
- Pitfall: Overlooking hot keys can overload systems.  
- Trade-off: Preprocessing (fan-out) shifts work from reads to writes.  
- Emphasis on core concepts over specific tech for design flexibility.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions)

---

# Glossary

- Fan-out: Distributing a tweet to all followers' timelines on write.  
- Home Timeline: Aggregated tweets from followed users/pages.  
- User Timeline: A user's own tweets and retweets.  
- Trending: Hashtags/topics with high volume in short time, geo-specific.  
- Inverted Index: Mapping words/hashtags to tweets for fast search.  
- Scatter-Gather: Querying multiple nodes and aggregating results.  
- Eventual Consistency: Data syncs over time, allowing temporary delays.  
- Stream Processing: Real-time handling of tweet streams for trends.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions)

---

# Attribution

* Source Video: https://www.youtube.com/watch?v=wYk0xPP_P_8  
* Channel: Tech Dummies - Narendra Lakshmana Gowda  
* Note: This document is a summary of the linked mock interview.

---

# About the summarizer

I'm *Ali Sol*, a PHP Developer. Learn more:  

* Website: [alisol.ir](https://alisol.ir)  
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
