# System Design Mock Interview: System Design of Doordash: Geo-Hashing and WebSockets for Location Based Services

* Design Food Delivery App like Doordash | Geo-Hashing and WebSockets for Location Based Services *

**Channel/Interviewer**: Gaurav Sen  
**Duration**: 00:50:28  
**Original Video**: https://www.youtube.com/watch?v=iRhSAR3ldTw

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.*

---

# One-Page Executive Summary

**Problem Prompt (One-liner)**: Design a food delivery system like DoorDash, focusing on matching customers with nearby delivery personnel (dashers) and enabling real-time location tracking.

**Primary Scope**: In-scope includes order placement, dasher matching based on proximity to restaurants, and real-time location sharing via WebSockets. Out-of-scope covers user onboarding, restaurant onboarding, payments (assumed outsourced to Stripe), and non-delivery aspects.

**Non-Functional Priorities**: Scalability to handle 10 million active users and orders per day; low-latency matching and updates; high availability through replication; cost efficiency by using in-memory stores like Redis for geo-data.

**Key Constraints & Numbers**: 10 million active users in the US; 10 million orders per day; ~500,000 dashers (assuming 20 deliveries per dasher daily); user data storage ~5 GB; focus on geo-proximity for matching within reasonable distances.

**High-Level Architecture (Text)**:
- Clients (mobile/web) connect to API endpoints for account creation and order placement.
- Backend services handle requests, with a relational DB (MySQL) for user/dasher info.
- Geo-sharded in-memory store (Redis) uses geo-hashing to index and query nearby dashers based on restaurant locations.
- Matching service notifies available dashers via pub-sub or push notifications.
- Real-time location tracking via WebSockets, with load-balanced servers relaying updates between customer and dasher.
- Replication (single-leader) for data durability, coordinated by tools like ZooKeeper.
- Asynchronous notifications for order acceptance.

**Top Trade-offs**:
- Relational (MySQL) vs. NoSQL (Cassandra): Chose MySQL for simplicity and potential ACID needs, but Cassandra offers faster writes and better geo-distribution.
- In-memory (Redis) for speed vs. persistent storage: Prioritizes low-latency queries over durability for transient location data.
- Geo-hashing precision: Balances query speed with accuracy by adjusting hash lengths to cover nearby areas without excessive false positives.
- WebSockets vs. long polling: WebSockets for efficient real-time bidirectional updates, avoiding header overhead but requiring connection management.
- Direct peer-to-peer (WebRTC) vs. server-mediated: Server-mediated for reliability and potential logging, though peer-to-peer reduces server load.
- Sharding by geo-hash vs. other structures (e.g., quad trees): Geo-hashing leverages string prefixes for range queries in sorted indexes.

**Biggest Risks/Failure Modes**:
- Hotspots in popular areas overwhelming shards; mitigate with dynamic re-sharding or load balancing.
- Inaccurate matching due to geo-hash boundary issues; handle by querying adjacent hashes.
- High connection load from WebSockets; scale with load balancers and terminate connections post-delivery.
- Data loss in replication failover; use consensus tools like ZooKeeper for smooth leader election.
- Scalability limits (e.g., 65K connections per server); horizontal scaling and monitoring.
- Privacy leaks in location sharing; ensure only matched parties access data.

**5-Min Review Flashcards**:
- Q: What's the core focus? → A: Delivery matching and tracking, not payments or onboarding.
- Q: User scale? → A: 10M active users, 10M orders/day, 500K dashers.
- Q: DB choice for users? → A: MySQL with single-leader replication for simplicity.
- Q: Alternative DB? → A: Cassandra for faster writes and masterless setup.
- Q: How to match dashers? → A: Geo-hashing on restaurant lat/long to find nearby dashers in Redis.
- Q: Geo-hash benefit? → A: Prefix-based range queries for efficient proximity search.
- Q: Notification to dashers? → A: Pub-sub or push to available ones in the geo-area.
- Q: Real-time tracking? → A: WebSockets for bidirectional location pings via a load-balanced server.
- Q: Alternative to WebSockets? → A: Long polling (but higher overhead) or SSE for uni-directional.
- Q: Peer-to-peer option? → A: WebRTC for direct updates, reducing server load but adding auth complexity.
- Q: Coordination tool? → A: ZooKeeper or etcd for failover handling.
- Q: Geo alternatives? → A: Quad trees or Hilbert curves for more accurate distance queries.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services)

---

# Interview Tags

**Domain/Industry**: delivery  
**Product Pattern**: pub-sub, notification  
**System Concerns**: low-latency, geo-replication  
**Infra/Tech**: microservices, rest, websocket, mysql, cassandra, redis, kafka, zookeeper

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services)

---

# Problem Understanding

**Original Prompt**: Design DoorDash (similar to Swiggy/Zomato in India), where users order food from restaurants, dashers pick up and deliver, focusing on matching and tracking.

**Use Cases**: Primary: User places order, system matches nearby dasher to restaurant, dasher accepts, real-time tracking of dasher location. Secondary: Account creation, location updates from dashers.

**Out of Scope**: User/restaurant onboarding, payment processing (outsourced), finding restaurant locations.

**APIs (if discussed)**:  
- Create account: POST with user info (email, location, preferences).  
- Place order: POST with restaurant ID, customer lat/long; returns matched dasher.  
- Real-time updates handled via WebSockets, not explicit REST endpoints.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services)

---

# Requirements & Constraints

**Functional Requirements** (Given in Video):  
- Users create accounts and place orders from restaurants.  
- Match orders with nearby available dashers based on restaurant proximity.  
- Dashers accept/decline orders via notifications.  
- Real-time sharing of dasher and customer locations post-matching.

**Non-Functional Requirements** (Given in Video):  
- Scalability: Handle 10M users/orders per day; geo-sharding for location-based queries.  
- Latency: Fast matching and updates (in-memory for geo-data).  
- Availability: Replication to prevent data loss; failover coordination.  
- Consistency: Eventual for location data; stronger for user info if needed.

**Functional Requirements** (Assumptions):  
- Assume dashers periodically update their locations.  
- Assume restaurant locations are pre-onboarded with lat/long.

**Non-Functional Requirements** (Assumptions):  
- Focus on US region; no global latency specifics.  
- Cost: Use efficient in-memory stores to minimize compute.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services)

---

# Back-of-the-Envelope Estimation

- User storage: ~200-500 bytes per user × 10M users = ~5 GB (fits in single DB, but shard for growth).  
- Dasher storage: Similar, ~500K dashers = smaller footprint.  
- Orders/day: 10M, assuming peak QPS ~115 (10M / 86,400 sec), but matching queries per order ~1-10.  
- Location updates: Dashers update every few seconds; ~500K dashers × 1 update/min = ~8K QPS, handled in-memory.  
- Shard count: Geo-based, potentially hundreds by region to balance load.  
- Bandwidth: Minimal for text-based APIs; higher for WebSocket pings (~few KB per session).

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services)

---

# High-Level Architecture

- **Client Layer**: Mobile/web apps send REST requests for orders and establish WebSockets for tracking.  
- **API Gateway/Load Balancer**: Routes to backend services; handles auth.  
- **Backend Services**: Order service processes placements, matching service uses geo-data to find dashers.  
- **Data Stores**: MySQL (replicated) for persistent user/dasher/order data; Redis (geo-sharded) for real-time location indexes.  
- **Geo-Indexing**: Convert lat/long to geo-hashes; store in Redis for range queries.  
- **Async Components**: Pub-sub (e.g., Kafka) for notifying dashers of available orders.  
- **Real-Time Layer**: WebSocket servers relay location updates between matched pairs.  
- **Coordination**: ZooKeeper/etcd for DB failover and shard management.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services)

---

## Subsystem: Matching Service

**Role & Responsibilities**: Matches orders to nearby available dashers based on restaurant location; notifies dashers.

**Data Model (from video only)**: Dashers: ID, lat/long (geo-hashed), availability status. Restaurants: ID, lat/long (geo-hashed). Orders: ID, restaurant ID, customer lat/long.

**APIs/Contracts**: Place order endpoint triggers matching; internal query to Redis for dashers in geo-range.

**Scaling & Partitioning**: Geo-shard Redis by hash prefixes; horizontal scale for high-traffic areas.

**Caching Strategy**: In-memory Redis for locations (transient, no TTL needed as updates overwrite).

**Consistency Model**: Eventual for location data (dashers update periodically).

**Bottlenecks & Hot Keys**: Popular areas cause shard overload; mitigate by querying adjacent hashes or re-sharding.

**Failure Handling**: Retry notifications; idempotent acceptance to handle duplicates.

**Cost Considerations**: In-memory efficient for high reads; scale shards as needed.

[Ask AI: Subsystem - Matching Service](https://alisol.ir/?ai=Subsystem%20-%20Matching%20Service%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services)

---

## Subsystem: Real-Time Tracking

**Role & Responsibilities**: Shares live locations between customer and dasher post-matching.

**Data Model (from video only)**: Session: Order ID, dasher ID, customer ID; periodic lat/long updates.

**APIs/Contracts**: WebSocket connect with order ID; bidirectional pings.

**Scaling & Partitioning**: Load balance WebSocket servers; route matched pairs to same instance.

**Caching Strategy**: Not applicable; in-memory session state.

**Consistency Model**: Eventual; lost pings tolerable.

**Bottlenecks & Hot Keys**: Connection limits per server; horizontal scaling.

**Failure Handling**: Reconnect on drop; fallback to polling if needed.

**Cost Considerations**: Connection-based; terminate post-delivery to free resources.

[Ask AI: Subsystem - Real-Time Tracking](https://alisol.ir/?ai=Subsystem%20-%20Real-Time%20Tracking%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services)

---

## Subsystem: Data Storage

**Role & Responsibilities**: Stores user, dasher, and order info persistently.

**Data Model (from video only)**: Users: ID, email, preferences, location. Dashers: Similar + availability. Orders: ID, status, timestamps.

**APIs/Contracts**: CRUD for accounts/orders.

**Scaling & Partitioning**: Shard by user ID or region; replicate for HA.

**Caching Strategy**: Not detailed; potential for user prefs.

**Consistency Model**: Strong via ACID for orders.

**Bottlenecks & Hot Keys**: Write spikes during peaks; use replication.

**Failure Handling**: Failover with ZooKeeper; async replication.

**Cost Considerations**: Relational for simplicity over NoSQL speed.

[Ask AI: Subsystem - Data Storage](https://alisol.ir/?ai=Subsystem%20-%20Data%20Storage%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services)

---

# Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
|-------|----------|----------|-----------------|------------------------|
| Database for Users | MySQL (relational) | Cassandra (NoSQL) | MySQL | Simpler development, ACID for potential payments; Cassandra for faster writes but less relational needs here. |
| Geo-Indexing | Geo-hashing | Quad trees/Hilbert curves | Geo-hashing | Efficient prefix-based queries in sorted DBs; alternatives for better distance accuracy but more complexity. |
| Real-Time Protocol | WebSockets | Long polling | WebSockets | Bidirectional and persistent; polling adds header overhead and server strain for frequent updates. |
| Connection Style | Server-mediated | Peer-to-peer (WebRTC) | Server-mediated | Easier logging and reliability; peer-to-peer reduces load but needs extra auth. |
| Notification | Pub-sub (e.g., Kafka) | Direct push | Pub-sub | Scalable for broadcasting to nearby dashers; direct for simplicity but less flexible. |
| Replication | Single-leader | Masterless | Single-leader | Simpler conflict resolution; masterless for better availability but more complex. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services)

---

# Reliability, Availability, and Performance

- Replication: Single-leader for user DB to avoid conflicts; async followers.  
- Latency Budget: In-memory Redis for <1s matching; WebSockets for near-real-time updates.  
- Backpressure & Throttling: Limit notifications to available dashers; queue overflows.  
- Load Shedding & Degradation: Prioritize matching over non-critical updates.  
- Disaster Recovery: Failover via ZooKeeper; RPO low with replication.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services)

---

# Security & Privacy

Not stated in video.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services)

---

# Observability

Not stated in video.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services)

---

# Follow-up Questions

- How to handle dasher location updates? (Assumed periodic pings.)  
- Why focus on restaurant-dasher proximity over customer? (Customer-restaurant distance is fixed.)  
- Alternatives to geo-hashing? (Quad trees, Hilbert curves, or off-the-shelf like PostGIS.)  
- WebSockets vs. other real-time options? (Long polling inefficient; WebRTC for peer-to-peer.)  
- How many connections per server? (Scale horizontally to handle limits.)

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services)

---

# Candidate Questions

- What are the peak order times and regional variations?  
- How do we handle dasher unavailability or declines?  
- Any SLOs for matching latency?  
- Integration with mapping APIs for routes?  
- Data retention for orders/locations?

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services)

---

# Key Takeaways

- Focus on one subsystem (delivery) allows deeper design exploration.  
- Geo-hashing enables efficient proximity queries via prefix matching in indexes.  
- Prioritize restaurant-dasher distance for matching efficiency.  
- Use in-memory stores like Redis for low-latency geo operations.  
- WebSockets ideal for real-time tracking; consider load balancing for scale.  
- Relational DBs suffice for user data; NoSQL for high-write scenarios.  
- Shard by geo for location-heavy systems to avoid hotspots.  
- Notifications via pub-sub scale better than direct pushes.  
- Failover tools like ZooKeeper ensure high availability.  
- Alternatives like quad trees or PostGIS could enhance accuracy.  
- Trade speed vs. complexity in real-time protocols.  
- Always check open-source/off-the-shelf before custom builds.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services)

---

# Glossary

- **Geo-hashing**: Algorithm to encode lat/long into strings for proximity searches via prefixes.  
- **WebSockets**: Protocol for full-duplex communication over a single TCP connection.  
- **Pub-sub**: Pattern for asynchronous messaging where publishers send to topics, subscribers receive.  
- **Sharding**: Dividing data across servers for scalability.  
- **Replication**: Copying data for availability and fault tolerance.  
- **ZooKeeper**: Distributed coordination service for leader election and config management.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services)

---

# Attribution

* Source Video: https://www.youtube.com/watch?v=iRhSAR3ldTw  
* Channel: Gaurav Sen  
* Note: This document is a summary of the linked mock interview.

---

# About the summarizer

I'm *Ali Sol*, a PHP Developer. Learn more:  

* Website: [alisol.ir](https://alisol.ir)  
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
