# System Design Mock Interview: Airline Reservation System - Distributed Transactions, Serialisation, Linearisation, Consistency

- **Channel/Interviewer**: Vinayak Sangar
- **Duration**: 01:01:53
- **Original Video**: https://www.youtube.com/watch?v=qsGcfVGvFSs

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.*

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=mock-interviews/system-design/Design%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=mock-interviews/system-design/Design%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=mock-interviews/system-design/Design%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=mock-interviews/system-design/Design%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=mock-interviews/system-design/Design%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=mock-interviews/system-design/Design%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=mock-interviews/system-design/Design%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=mock-interviews/system-design/Design%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=mock-interviews/system-design/Design%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=mock-interviews/system-design/Design%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=mock-interviews/system-design/Design%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=mock-interviews/system-design/Design%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=mock-interviews/system-design/Design%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=mock-interviews/system-design/Design%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=mock-interviews/system-design/Design%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=mock-interviews/system-design/Design%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=mock-interviews/system-design/Design%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)
<!-- LH-BUTTONS:END -->

---

# One-Page Executive Summary

- **Problem Prompt (One-liner)**: Design an airline reservation system handling limited seats, parallel booking requests, flight search, and payment failures.
- **Primary Scope**: Focus on client-side search and booking capabilities, admin flight addition, with payments via third-party APIs; optional extensions like notifications and analytics.
- **Non-Functional Priorities**: High availability for search (eventual consistency acceptable), high consistency for booking; low latency for search; support for concurrent users and global access.
- **Key Constraints & Numbers**: 100k active searches per day (~1 TPS), 100 daily flights with 100-200 seats each, leading to 10-20k daily bookings (~0.1 TPS); read-heavy system.
- **High-Level Architecture (Text)**:
  - Clients interact via search and book APIs.
  - Admin portal adds flights.
  - Backend: MySQL for consistent booking and seat data, Elasticsearch for available flight search.
  - Change Data Capture (CDC) syncs MySQL to Elasticsearch for eventual consistency.
  - Third-party payment integration (e.g., Stripe/PayPal).
  - Cache (Redis) for hot flight data.
  - Offline refund service for failure handling.
- **Top Trade-offs**:
  - Availability over consistency for search to ensure users can always query flights.
  - Consistency over availability for booking to prevent inconsistent status reads.
  - Pessimistic locking for serialization in high-contention scenarios vs. optimistic locking to avoid wasted compute on failed transactions.
  - Relational DB (MySQL) for ACID transactions in booking vs. NoSQL for scalability in search.
  - Eventual consistency via CDC for search index vs. strong consistency impacting performance.
  - TTL on locks to handle network failures vs. indefinite locks causing resource starvation.
- **Biggest Risks/Failure Modes**:
  - Overbooking due to concurrent requests without proper serialization.
  - Deadlocks in multi-seat bookings, mitigated by DB detection and killing transactions.
  - Network failures during payment or booking, handled by TTL on locks and offline refunds.
  - Inconsistent reads in replicas for booking status, requiring strong consistency.
  - Search index lag after admin adds flights, acceptable as eventual consistency.
  - High contention on popular flights leading to transaction failures.
- **5-Min Review Flashcards**:
  - Q: Why is this problem tricky? A: Limited seats, parallel requests, search needs, and failure handling with payments.
  - Q: Functional requirements? A: Search flights by source/dest/date, book flight/seat, integrate payments.
  - Q: Non-functional split? A: Search: highly available/eventual; Booking: highly consistent.
  - Q: API examples? A: GET /search?source=X&dest=Y&date=Z; POST /book with flight_id and seat_id.
  - Q: DB choices? A: MySQL for seats/bookings (consistency, locks); Elasticsearch for search (availability).
  - Q: Handling concurrency? A: Pessimistic locking (FOR UPDATE) with TTL in transactions.
  - Q: Deadlock mitigation? A: DB auto-detects and kills one transaction.
  - Q: Distributed transactions? A: Lock seats, call payment, add booking, mark booked; use TTL and refunds for failures.
  - Q: Optimistic vs. pessimistic? A: Pessimistic better for high parallelism to avoid wasted work.
  - Q: Failure example? A: Payment succeeds but booking fails: offline refund service processes.
  - Q: Consistency vs. serialization? A: Serialization via locks for writes; consistency for reads across replicas.
  - Q: Similar problems? A: Train/hotels/movies reservations, flash sales.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CVinayak%20Sangar%7CAirline%20Reservation%20System%20-%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

# Interview Tags

- **Domain/Industry**: ecommerce
- **Product Pattern**: recommendation, notification, queue
- **System Concerns**: high-availability, eventual-consistency, geo-replication, backpressure, throttling, autoscaling
- **Infra/Tech (only if mentioned)**: microservices, rest, mysql, cassandra, redis, elasticsearch, kafka

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CVinayak%20Sangar%7CAirline%20Reservation%20System%20-%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

# Problem Understanding

- **Original Prompt**: Design a reservation system, especially an airline reservation system, handling limited seats, parallel requests, flight search, and payments with failure scenarios.
- **Use Cases**: Primary: Users search and book flights globally; admins add flights. Secondary: Handle concurrent bookings, payments, notifications, analytics.
- **Out of Scope**: In-house payment processing (use third-party like Stripe/PayPal); detailed implementation of optional services like notifications or analytics.
- **APIs (if discussed)**: 
  - Search: GET with params source, destination, date; returns list of flights with details (id, times, duration, airline, booking_open).
  - Book: POST with flight_id, seat_id; returns success/failure after locking, payment, and updating status.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CVinayak%20Sangar%7CAirline%20Reservation%20System%20-%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

# Requirements & Constraints

- **Functional Requirements**
  - Given in Video: Search flights by source, destination, date; book specific flight and seat; integrate third-party payments; admin adds flights.
  - Assumptions: Optional scopes like notifications (e.g., email/WhatsApp on confirmation) and user analytics (for ads/discounts) are extensible but not core.

- **Non-Functional Requirements**: Support global users; revenue-generating service requires high uptime; search prioritizes availability (eventual consistency for new flights); booking prioritizes consistency (strong reads after confirmation); low search latency; handle concurrent bookings without overbooking.
- **Capacity Inputs**: 100k active searches/day (~1 TPS); 100 daily flights; 10-20k bookings/day (~0.1 TPS); read-heavy (search > bookings).

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CVinayak%20Sangar%7CAirline%20Reservation%20System%20-%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

# Back-of-the-Envelope Estimation

- Storage: Flight info ~100 flights/day, small rows (few KB each); seats ~100-200/flight; bookings 10-20k/day; assume 5-year retention leads to moderate storage (e.g., GB scale for MySQL).
- Bandwidth: Low due to text-based APIs; search responses list ~10-20 flights with metadata.
- Cache sizing: Redis for hot flights/seats; size for top 100 flights (MB scale).
- Shard keys & partition counts: Partition flight info by departure_date; shard seats by flight_id.
- Peak throughput & concurrency: Search ~1 TPS average, but peaks during sales; bookings ~0.1 TPS, high contention on popular flights.

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CVinayak%20Sangar%7CAirline%20Reservation%20System%20-%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

# High-Level Architecture

- Client entry: Web/mobile users via REST APIs for search/book; admin portal for adding flights.
- Services / business layer: Search service queries Elasticsearch; booking service handles locks/transactions in MySQL, integrates payments.
- Data stores: MySQL (OLTP) for flight seats and bookings (strong consistency); Elasticsearch (search) for available flights (eventual consistency).
- Caches: Redis for caching hot flight data and seat availability to reduce DB load.
- Async: CDC (e.g., via Kafka) to sync MySQL changes to Elasticsearch; queues for notifications if extended.
- Batch jobs/workers: Offline refund service to scan failed bookings and process refunds daily.
- Observability: Not stated in video.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CVinayak%20Sangar%7CAirline%20Reservation%20System%20-%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

## Subsystem: Search

- **Role & Responsibilities**: Provide fast flight search by source, destination, date; filter open bookings; support client-side filters (e.g., time, duration, airline).
- **Data Model (from video only)**: Flight: id (PK), source+dest (index), departure_date (partition key), departure_time, duration, airline, booking_open (boolean).
- **APIs/Contracts**: GET /search with source, dest, date; returns flight list.
- **Scaling & Partitioning**: Partition by departure_date; use Elasticsearch for indexes on source/dest/date.
- **Caching Strategy**: Redis for hot searches; invalidate on CDC updates.
- **Consistency Model**: Eventual consistency via CDC from MySQL.
- **Bottlenecks & Hot Keys**: Popular routes; mitigate with sharding and caching.
- **Failure Handling**: Fallback to stale data if index lag; retries on queries.
- **Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Search](https://alisol.ir/?ai=Subsystem%20-%20Search%7CVinayak%20Sangar%7CAirline%20Reservation%20System%20-%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

## Subsystem: Booking

- **Role & Responsibilities**: Handle seat booking with concurrency, payments, and failures; ensure no overbooking.
- **Data Model (from video only)**: Flight seats: flight_id+seat_num (PK), status (available/booked), lock_ttl; Bookings: booking_id (PK), user_id, flight_id, seat_num, status.
- **APIs/Contracts**: POST /book with flight_id, seat_id; integrates payment.
- **Scaling & Partitioning**: Shard by flight_id; use MySQL for transactions.
- **Caching Strategy**: Redis for seat availability checks; invalidate post-booking.
- **Consistency Model**: Strong consistency for reads after writes (linearization).
- **Bottlenecks & Hot Keys**: High-contention flights; use pessimistic locks.
- **Failure Handling**: TTL on locks for network drops; offline refunds if payment succeeds but booking fails; rollbacks on payment failure.
- **Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Booking](https://alisol.ir/?ai=Subsystem%20-%20Booking%7CVinayak%20Sangar%7CAirline%20Reservation%20System%20-%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

# Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
| --- | --- | --- | --- | --- |
| Consistency vs. Availability | High availability with eventual consistency | High consistency with potential downtime | A for search, B for booking | Search can tolerate lag for new flights; booking must ensure consistent status reads. |
| Locking Mechanism | Pessimistic locking (FOR UPDATE) | Optimistic locking (version check at commit) | Pessimistic | Better for high parallelism to avoid wasted compute on failed transactions. |
| Database for Search | MySQL (relational) | Elasticsearch (search engine) | Elasticsearch | Faster complex queries; synced via CDC for availability. |
| Database for Booking | NoSQL (e.g., Cassandra) | MySQL (relational) | MySQL | Supports ACID, locks, and strong consistency needed for transactions. |
| Failure Handling | Indefinite locks | TTL on locks + refunds | TTL + refunds | Prevents resource starvation; offline service handles edge cases like payment success but booking failure. |
| Sync Mechanism | Direct writes to both stores | CDC (e.g., Kafka) | CDC | Ensures eventual consistency without blocking writes. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CVinayak%20Sangar%7CAirline%20Reservation%20System%20-%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

# Reliability, Availability, and Performance

- Replication/quorum/consistency: MySQL replicas with strong consistency for booking; eventual for search via CDC.
- Latency budget across tiers: Low for search (Elasticsearch); booking accepts higher due to locks/transactions.
- Backpressure & throttling: Not stated in video.
- Load shedding & degradation: Not stated in video.
- Disaster recovery (RPO/RTO if stated): Not stated in video.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CVinayak%20Sangar%7CAirline%20Reservation%20System%20-%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

# Security & Privacy

Not stated in video.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CVinayak%20Sangar%7CAirline%20Reservation%20System%20-%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

# Observability

Not stated in video.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CVinayak%20Sangar%7CAirline%20Reservation%20System%20-%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

# Follow-up Questions

Not stated in video.

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CVinayak%20Sangar%7CAirline%20Reservation%20System%20-%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

# Candidate Questions

Not stated in video.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CVinayak%20Sangar%7CAirline%20Reservation%20System%20-%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

# Key Takeaways

- Start with high-level diagram: clients (search/book), admin (add flights), backend system.
- Clarify functional (search/book/payments) and non-functional (availability for search, consistency for booking).
- Estimate scale: read-heavy with low TPS, but focus on contention.
- Use MySQL for booking with pessimistic locks, TTL, and transactions to handle concurrency.
- Employ Elasticsearch for search with CDC sync for eventual consistency.
- Discuss failure modes: network drops (TTL), payment fails (rollback), partial successes (refunds).
- Differentiate serialization (locks for writes) from consistency (linear reads across replicas).
- Avoid optimistic locks in high-contention scenarios to save compute.
- Design for extensibility: add notifications/analytics later.
- Similar to flash sales: limited resources, parallelism, search, failures.
- Read "Designing Data-Intensive Applications" for deep dives on these concepts.
- Lead the interview by peeling layers: high-level, requirements, estimates, deep dives.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CVinayak%20Sangar%7CAirline%20Reservation%20System%20-%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

# Glossary

- Serialization: Ensuring concurrent transactions execute as if sequential via locks.
- Linearization: Strong consistency where operations appear to happen in a single global order.
- Pessimistic Locking: Acquire exclusive lock before operations to prevent conflicts.
- Optimistic Locking: Proceed without lock, check for changes at commit.
- Change Data Capture (CDC): Mechanism to capture DB changes and propagate to other systems.
- TTL (Time-to-Live): Expiration time on locks to free resources on failures.
- Distributed Transactions: Coordinating actions across multiple systems (e.g., DB + payment).
- Eventual Consistency: Replicas eventually converge without immediate guarantees.
- Strong Consistency: All reads see the latest write immediately.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CVinayak%20Sangar%7CAirline%20Reservation%20System%20-%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

# Attribution

- Source Video: https://www.youtube.com/watch?v=qsGcfVGvFSs
- Channel: Vinayak Sangar
- Note: This document is a summary of the linked mock interview.

---

# About the summarizer

I'm *Ali Sol*, a Backend Developer. Learn more:

- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
