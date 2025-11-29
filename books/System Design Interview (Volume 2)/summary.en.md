# Book Summary: System Design Interview (Volume 2)
* **Author**: Alex Xu
* **Genre**: Software Engineering
* **Publication Date**: March 11, 2022
* **Book Link**: https://amazon.com/dp/1736049119

This document summarizes the key lessons and insights extracted from the book.
I highly recommend reading the original book for the full depth and author's perspective.

## Before You Get Started
* I summarize key points from useful books to learn and review quickly.
* Simply click on `Ask AI` links after each section to dive deeper.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=books/System%20Design%20Interview%20(Volume%202)) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=books/System%20Design%20Interview%20(Volume%202)) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=books/System%20Design%20Interview%20(Volume%202)) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=books/System%20Design%20Interview%20(Volume%202)) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=books/System%20Design%20Interview%20(Volume%202)) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=books/System%20Design%20Interview%20(Volume%202)) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=books/System%20Design%20Interview%20(Volume%202)) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=books/System%20Design%20Interview%20(Volume%202)) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=books/System%20Design%20Interview%20(Volume%202)) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=books/System%20Design%20Interview%20(Volume%202)) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=books/System%20Design%20Interview%20(Volume%202)) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=books/System%20Design%20Interview%20(Volume%202))

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=books/System%20Design%20Interview%20(Volume%202)) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=books/System%20Design%20Interview%20(Volume%202)) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=books/System%20Design%20Interview%20(Volume%202)) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=books/System%20Design%20Interview%20(Volume%202))
<!-- LH-BUTTONS:END -->

## Proximity Service

**Summary**: This chapter dives into building a service that finds nearby places like restaurants or gas stations based on a user's location and a specified radius. It covers understanding requirements like low latency and data privacy, then proposes APIs for searching and managing businesses. The high-level design splits into location-based and business services, with a focus on scaling databases and using geospatial indexes. Different algorithms like geohash, quadtree, and Google S2 are compared for fetching nearby spots, handling edge cases like boundaries. Deep dive includes sharding the business table, caching with Redis for geohashes and business info, and deploying across regions for better availability. Filtering by time or type happens after fetching results.

**Example**: Imagine you're using Yelp to find cafes within 1km; the system calculates your geohash, grabs businesses from that grid and neighbors, then filters open ones to show on your map.

**Link for More Details**:
[Ask AI: Proximity Service](https://alisol.ir/?ai=Proximity%20Service%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29)

## Nearby Friends

**Summary**: Here, the focus is on a feature like finding friends nearby on social apps, emphasizing real-time updates for moving users. Requirements include handling high QPS in dense areas and privacy controls. APIs allow sharing locations and querying friends within a radius. High-level design uses WebSockets for live updates, with services for location storage and friend graphs. Geohashing helps query nearby friends efficiently, with background jobs for periodic checks. Deep dive covers scaling with Redis for recent locations, Kafka for event streaming, and handling privacy by anonymizing data.

**Example**: Think of a ride-sharing app where drivers see nearby riders; it pings locations every few seconds, uses geohash to bucket them, and pushes updates via WebSocket so the map refreshes smoothly.

**Link for More Details**:
[Ask AI: Nearby Friends](https://alisol.ir/?ai=Nearby%20Friends%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29)

## Google Maps

**Summary**: This chapter tackles designing a mapping service like Google Maps, covering navigation, traffic, and ETA calculations. Key requirements are accurate routing with low latency and handling massive data. APIs include directions and map tiles. High-level design involves tile servers for rendering, graph databases for roads, and services for traffic aggregation. Shortest-path algorithms like Dijkstra or A* compute routes, with preprocessing for speed. Deep dive discusses partitioning map data, using CDNs for tiles, and real-time traffic via Kafka streams.

**Example**: When you request directions from home to work, the system builds a graph of roads, factors in live traffic from user data, and sends tiled images plus turn-by-turn instructions for your app to display.

**Link for More Details**:
[Ask AI: Google Maps](https://alisol.ir/?ai=Google%20Maps%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29)

## Distributed Message Queue

**Summary**: The design here is for a scalable queue system like Kafka, supporting pub-sub with high throughput and durability. Requirements include at-least-once delivery and partitioning for scale. APIs for publish, subscribe, and offset management. High-level setup uses brokers with topics and partitions, leaders for writes, and replicas for fault tolerance. Deep dive covers leader election with ZooKeeper, consumer groups for parallelism, and compaction for storage efficiency.

**Example**: In a logging system, services publish events to a topic; consumers in a group pull from partitions, process in parallel, and commit offsets to resume from failures without missing data.

**Link for More Details**:
[Ask AI: Distributed Message Queue](https://alisol.ir/?ai=Distributed%20Message%20Queue%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29)
[Personal note: Kafka remains solid for this, but I've found Apache Pulsar handy in 2025 for its built-in tiered storage and easier multi-tenancy in cloud setups.]

## Metrics Monitoring and Alerting System

**Summary**: This covers building a system to monitor app metrics and alert on issues, like Datadog. Focus on collecting time-series data at scale with low overhead. APIs for pushing metrics and querying dashboards. High-level design has collectors aggregating data, time-series DB like InfluxDB for storage, and alerting rules. Deep dive includes downsampling for long-term storage, sharding by time or host, and integrating with PagerDuty for notifications.

**Example**: Your web app sends request counts every minute; the system stores them, detects spikes over thresholds, and pages the on-call engineer to check for outages.

**Link for More Details**:
[Ask AI: Metrics Monitoring and Alerting System](https://alisol.ir/?ai=Metrics%20Monitoring%20and%20Alerting%20System%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29)
[Personal note: InfluxDB is still useful, but for larger scales in 2025, I lean toward Prometheus with Thanos for better federation and long-term storage in Kubernetes environments.]

## Ad Click Event Aggregation

**Summary**: The chapter designs aggregation for ad clicks, like counting views for billing. Handles high-volume events with windows for accuracy. Uses Kafka for ingestion, Flink for processing, and Druid for queries. High-level flow: events stream in, aggregate by ad and time, store in OLAP DB. Deep dive on window types, watermarks for late events, and lambda architecture for reprocessing.

**Example**: An ad platform logs each click; the system groups them hourly by campaign, computes totals, and serves queries for advertisers to see performance.

**Link for More Details**:
[Ask AI: Ad Click Event Aggregation](https://alisol.ir/?ai=Ad%20Click%20Event%20Aggregation%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29)
[Personal note: Flink works well here, but in 2025, I've seen more teams using Apache Beam on cloud runners for unified batch and stream processing without much rework.]

## Hotel Reservation System

**Summary**: Focuses on a booking system like Airbnb, managing inventory and reservations without overbooking. Requirements: atomic updates and idempotency. APIs for search, book, and cancel. High-level design uses databases with constraints, services for inventory and payments. Deep dive on locking for concurrency, saga for distributed transactions, and caching availability.

**Example**: You search for rooms on dates; it checks real-time slots, reserves on payment, and updates inventory so no one else books the same room.

**Link for More Details**:
[Ask AI: Hotel Reservation System](https://alisol.ir/?ai=Hotel%20Reservation%20System%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29)

## Distributed Email Service

**Summary**: Designs an email system like Gmail, handling send/receive with spam filtering. Covers SMTP/IMAP protocols, storage for attachments. High-level: inbound/outbound servers, databases for mailboxes. Deep dive on sharding by user, inverted indexes for search, and DKIM/SPF for authenticity.

**Example**: You send an email; it routes via SMTP, gets stored, and the recipient pulls it via IMAP, with filters catching junk before delivery.

**Link for More Details**:
[Ask AI: Distributed Email Service](https://alisol.ir/?ai=Distributed%20Email%20Service%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29)

## S3-like Object Storage

**Summary**: Builds blob storage like S3, for files with durability and availability. APIs for put/get/delete. High-level: metadata DB, storage nodes with replication. Deep dive on consistent hashing for placement, erasure coding over RAID, and checksums for integrity.

**Example**: Upload a photo; it splits into chunks, replicates across nodes, and metadata tracks locations for quick retrieval later.

**Link for More Details**:
[Ask AI: S3-like Object Storage](https://alisol.ir/?ai=S3-like%20Object%20Storage%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29)

## Real-time Gaming Leaderboard

**Summary**: For leaderboards in games, updating scores in real-time with rankings. Uses Redis sorted sets for fast queries. High-level: event ingestion, scoring service, DB for persistence. Deep dive on sharding by game, TTL for old data, and handling ties.

**Example**: In a mobile game, your score updates; it pushes to Redis, ranks you against others, and shows top 100 instantly.

**Link for More Details**:
[Ask AI: Real-time Gaming Leaderboard](https://alisol.ir/?ai=Real-time%20Gaming%20Leaderboard%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29)

## Payment System

**Summary**: Designs a system like PayPal for transactions, with security and idempotency. APIs for pay/refund. High-level: gateways, processors, ledgers with double-entry. Deep dive on PCI compliance, sagas for consistency, and webhooks for notifications.

**Example**: You pay online; it authorizes card, debits/credits accounts atomically, and notifies merchant on success.

**Link for More Details**:
[Ask AI: Payment System](https://alisol.ir/?ai=Payment%20System%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29)

## Digital Wallet

**Summary**: For wallets like Apple Pay, managing balances and transfers. Emphasizes security and audits. Uses event sourcing for transactions, Kafka for streams. High-level: services for top-up/transfer, ledgers. Deep dive on idempotency keys, reconciliation, and anti-fraud.

**Example**: Transfer money to a friend; it checks balance, records events, updates both wallets without double-spending.

**Link for More Details**:
[Ask AI: Digital Wallet](https://alisol.ir/?ai=Digital%20Wallet%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29)

## Stock Exchange

**Summary**: Covers building an exchange like NYSE, with low-latency trading. Requirements: millisecond responses, fairness. APIs for orders and data. High-level: gateways, matching engine, market data pub. Data models include order books and charts. Deep dive on single-server optimization, event sourcing for determinism, Raft for HA, and multicast for fair data distribution.

**Example**: Place a buy order; it sequences, matches against sells in FIFO, updates book, and broadcasts fills to all.

**Link for More Details**:
[Ask AI: Stock Exchange](https://alisol.ir/?ai=Stock%20Exchange%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
* Website: [alisol.ir](https://alisol.ir)
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
