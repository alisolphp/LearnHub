# System Design Mock Interview: Design Flight Booking System | Airline Reservation System | Distributed Transactions, Serialisation, Linearisation, Consistency

- **Channel/Interviewer**: Vinayak Sangar.   
- **Duration**: 01:01:53
- **Original Video**: https://www.youtube.com/watch?v=qsGcfVGvFSs

> *This document summarizes a system design mock interview. Watching the full video is still recommended for nuance.* 

---

## One-Page Executive Summary (2–3 min skim)

**Problem Prompt (One-liner).** Build an airline reservation system where users can search flights and book seats; admins can add flights. Handle limited seats, high contention, and payments. 

**Primary Scope.**  
- **In-scope:** Flight search, seat booking, payment-tied confirmation, core data modeling, and concurrency/consistency discussion.    
- **Out-of-scope (mention as optional):** Notifications, analytics/ads/discounts—acknowledge for extensibility but not required to implement in the interview. 

**Non-Functional Priorities.** Global reach, correctness under contention, and predictable performance; justify “do we even need distributed systems here?” based on scale.  

**Key Constraints & Numbers.** Not stated in video.

**High-Level Architecture (text).**  
- Clients (search/book) and Admin portal (add flights).   
- API interfaces for clients/admin; internal “airline reservation system” behind them.   
- Services: Search, Booking, Payment, Inventory/Seat Management (+ optional Notification/Analytics).   
- Data stores: Flight metadata, seat/inventory, bookings, payments. 

**Top Trade-offs.**  
- Strong consistency for seat inventory vs. availability/latency. (Linearisation/serialisation discussion expected.)   
- 2PC/distributed transactions vs. operational complexity and coupling.   
  [Personal note: Prefer saga/outbox patterns for cross-service workflows in 2025 to reduce coordinator coupling and improve failure isolation.]  
- Monolith first vs. microservices upfront depending on realistic scale.   
  [Personal note: Start simple; split only when independent scaling/ownership or reliability boundaries are clear.]

**Biggest Risks/Failure Modes.**  
- Double-booking under concurrency.  
- Payments succeeding while inventory fails (and vice versa).   
  [Personal note: Ensure idempotency keys on booking/payment requests to guard against retries and duplicates.]  
- Over-engineering for scale not present in the prompt. 

**5-Min Review Flashcards.**  
- **Q:** Why is flight booking tricky? **A:** Limited seats + parallel requests + payment coupling.   
- **Q:** Core client capabilities? **A:** Search and book. **Admin?** Add flights.   
- **Q:** When do you need distributed storage? **A:** To scale reads/writes, storage size, or availability (read replicas, partitioning).    
- **Q:** What’s the “four-step” booking flow? **A:** Reserve/lock seat → create booking → take payment → confirm/issue ticket (atomic intent).   
- **Q:** One way to do cross-service atomicity? **A:** 2-phase commit (2PC)—know pros/cons.   
  [Personal note: Likely outdated for cloud microservices; prefer saga/outbox with compensations for partial failures.]  
- **Q:** Key flight search index? **A:** Source + destination + date. 

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

## Interview Tags (for later filtering)

- **Domain/Industry:** travel-booking  
- **Data/Storage:** RDBMS, partitioning by date, read replicas, indexing (src/dst/date).    
- **Consistency:** linearisation, serialisation, distributed transactions.   
- **Architecture:** monolith vs. microservices, extensibility for optional services.  

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

## Functional Requirements

- **Client:** Search flights; book flights.   
- **Admin:** Add flights (metadata & schedule).   
- **Booking finalizes only on successful payment; otherwise release seat.**   
- **Optional (state but don’t overbuild):** Notifications (email/WhatsApp), user analytics/discounts—design for extensibility.   
  [Personal note: Use event-driven notifications (outbox → consumer) to decouple booking latency from messaging.]

[Ask AI: Functional Requirements](https://alisol.ir/?ai=Functional%20Requirements%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

## Non-Functional Requirements (NFRs)

- **Availability & Global Reach:** Users should book from anywhere.   
- **Correctness under Contention:** Avoid double-booking when parallel requests target the same seat.   
- **Latency:** Fast search; bounded booking path.   
- **Scalability (justify):** Only introduce partitioning/distribution if scale demands it.   
  [Personal note: “Monolith until it hurts” remains a practical default for modest traffic.]

[Ask AI: Non-Functional Requirements](https://alisol.ir/?ai=Non-Functional%20Requirements%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

## High-Level Architecture (Text)

1. **Interfaces:** Client API (search/book), Admin API (add/update flights).   
2. **Core Services:**  
   - **Search Service** (reads flight metadata with filters).   
   - **Booking Service** (orchestrates seat lock → payment → confirmation).   
   - **Inventory/Seat Manager** (authoritative seat state).  
   - **Payment Service** (third-party gateways).  
   - **Refund/Compensation Service** (handles failures).   
3. **Optional Services:** Notification, Analytics.   
4. **Data Stores:**  
   - **Flight Metadata** (indexed on source, destination, date; partition by departure date).    
   - **Booking & Seat State** (transactional).  
   - **Payments** (status, transaction refs).  
5. **Scaling Aids:** Read replicas; consider partitioning; cache hot search results. 

[Ask AI: Architecture](https://alisol.ir/?ai=Architecture%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

## Data Modeling (essentials)

**Flights** (metadata): `flight_id` (PK), `src`, `dst`, `departure_date` (partition key), `departure_time`, `duration`, `airline`, `booking_open` (+ indices on `src,dst,date`).  

**Seat/Inventory**: per-flight seat map + availability state.

**Bookings**: `booking_id`, `user_id`, `flight_id`, `seats`, `status` (PENDING/CONFIRMED/CANCELED), `payment_id`.

**Payments**: gateway txn refs, status, amount, currency; link to `booking_id`.

[Ask AI: Data Modeling](https://alisol.ir/?ai=Data%20Modeling%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

## Search Flow (read path)

1. User submits (src, dst, date) + filters (airline, duration, time windows). Backend uses the composite index; many UI filters can remain client-side.    
2. System returns matching flights with pricing/availability snapshot.  
3. Caching of popular routes/dates; paginate results.  
   [Personal note: Keep cache TTLs short for near-term dates due to volatile availability.]

[Ask AI: Search Flow](https://alisol.ir/?ai=Search%20Flow%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

## Booking Flow (happy path, then reality)

**Intent:** Lock seat(s) and charge payment—commit all or compensate cleanly.

**Canonical steps (from video narrative):**  
1) Reserve/lock seat(s) in inventory.  
2) Create booking record.  
3) Execute payment.  
4) Confirm booking (ticket) or roll back/compensate. 

**Cross-service atomicity:** 2-phase commit is one discussed approach—know when and why, and its complexity in distributed systems.    
[Personal note: Prefer saga/outbox with idempotent operations and compensations; 2PC often couples services to a coordinator and struggles across heterogeneous infra.]

**Payment edge cases:** If payment fails after seat lock, release lock; if payment succeeds but confirmation fails, trigger refund/compensation flow.   
[Personal note: Enforce idempotency keys on “Create Booking” and “Charge” to de-duplicate retries.]

[Ask AI: Booking Flow](https://alisol.ir/?ai=Booking%20Flow%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

## Concurrency & Consistency

- **High contention:** Multiple users may target the same seat at once—design for contention.   
- **Techniques (discuss):** short-lived locks, optimistic concurrency with compare-and-swap, and idempotency for retries.  
  [Personal note: Favor optimistic concurrency + retries for throughput; keep locks narrowly scoped and time-boxed.]  
- **Consistency models:** Be explicit about linearisation vs. serialisation trade-offs across services. 

[Ask AI: Concurrency & Consistency](https://alisol.ir/?ai=Concurrency%20%26%20Consistency%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

## Scale Strategy (when the interviewer asks “Do you need distributed systems?”)

- **Start from needs:** If API QPS/storage is low, a simple design may suffice; justify upgrades only when necessary.   
- **Reads:** Add read replicas to scale search.   
- **Sharding/Partitioning:** Partition flights by `departure_date`; discuss pros/cons and rebalancing.   
- **Microservices:** Split when teams/SLIs or scaling characteristics diverge; otherwise keep cohesive.   
  [Personal note: Prefer asynchronous messaging between services to cap synchronous fan-out and reduce tail latency.]

[Ask AI: Scale Strategy](https://alisol.ir/?ai=Scale%20Strategy%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

## Failure Handling & Compensations

- **Partial failure:** Payment or confirmation can fail—define compensations (refunds, seat release).   
- **Retries:** Make operations idempotent; store dedupe keys.  
- **Observability:** Log correlation IDs across booking/payment/inventory.

[Ask AI: Failure Handling](https://alisol.ir/?ai=Failure%20Handling%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

## Interviewer-Friendly Walkthrough (how to lead)

1. Start with the high-level diagram and interfaces so you and the interviewer align.   
2. List FRs then NFRs (search, book, payments; global reach, correctness, latency).    
3. Clarify data model for flights and why you chose those indices/partition keys.   
4. Walk through the four booking steps and discuss distributed transactions at a high level.   
5. Close with scale justification—when to keep it simple vs. distribute. 

[Ask AI: Interview Walkthrough](https://alisol.ir/?ai=Interview%20Walkthrough%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

---

### Appendix: Optional Services (call out, don’t overbuild)

- **Notifications:** Email/WhatsApp on confirmation; keep async.   
- **User Analytics/Discounts:** Track for marketing/UX—but not core to MVP.   
  [Personal note: Route events via a queue and process downstream to avoid impacting booking latency.]

[Ask AI: Optional Services](https://alisol.ir/?ai=Optional%20Services%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency)

