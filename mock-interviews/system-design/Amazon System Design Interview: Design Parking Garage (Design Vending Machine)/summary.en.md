# System Design Mock Interview: Amazon System Design Interview: Design Parking Garage (Design Vending Machine)

* **Channel/Interviewer**: Exponent
* **Duration**: 00:30:00
* **Original Video**: [https://www.youtube.com/watch?v=NtMvNh0WFVM](https://www.youtube.com/watch?v=NtMvNh0WFVM)

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.* 

---

## One-Page Executive Summary (2–3 min skim)

* **Problem Prompt (One-liner)**: Design a reservation and payment system for a parking garage supporting spot types (compact, regular, large), flat rates by vehicle size, and the ability to reserve, pay, and cancel. 
* **Primary Scope**

  * **In-scope**: Reserve/allocate a spot, compute price, pay via third-party processor, cancel reservation, optional accounts/login, basic data model and high-level architecture with strong consistency lean. 
  * **Out-of-scope**: Physical gate hardware, LPR (license plate recognition), dynamic pricing, fraud, coupons, detailed payment processor internals. 
* **Non-Functional Priorities** (as discussed):

  * Favor **strong consistency** to avoid double-booking over ultra-low latency.
  * **Read-heavy** pattern; add **read replicas** behind a load balancer.
  * **Simplicity** over distributed complexity; a single relational DB (Postgres/MySQL) is sufficient at this scale. 
* **Key Constraints & Numbers**: No concrete QPS/latency numbers provided; back-of-the-envelope notes that per-garage scale is modest (e.g., thousands of spots) and not “big data.” 
* **High-Level Architecture (Text)**

  1. Web/Mobile client ↔ Backend service (single app or split later).
  2. Core OLTP DB (Postgres preferred by speaker) + read replicas.
  3. Load balancer for distributing read traffic.
  4. Third-party payment processor (e.g., Stripe/Square).
  5. Optional auth/users table for recurring use. 
* **Top Trade-offs**

  * Strong consistency (avoid double-booking) vs. higher latency.
  * DB enums (performance) vs. varchar (flexibility).
  * Coarse “read-locking” replicas for read-your-writes vs. higher throughput. [Personal note: Rather than “read-locking” replicas, prefer reading from the primary for critical paths or use synchronous replication/read-your-writes session semantics to keep UX consistent without stalling global reads.] 
* **Biggest Risks/Failure Modes**

  * Race conditions during allocation.
  * Mis-sizing read/write mix leading to stale availability in UI.
  * Payment/booking split-brain if external callbacks aren’t idempotent. 
* **5-Min Review Flashcards**

  * **Q:** What are the three spot types? **A:** Compact, regular, large.
  * **Q:** What pricing model? **A:** Flat rate by vehicle size and time.
  * **Q:** Priority: consistency or latency? **A:** Consistency.
  * **Q:** Core DB? **A:** Relational (Postgres/MySQL).
  * **Q:** Payment integration? **A:** Third-party (e.g., Stripe/Square).
  * **Q:** What avoids double-booking? **A:** Strong consistency, careful allocation, and read-your-writes.
  * **Q:** Can small cars use large spots? **A:** Yes, if smaller spots are full (policy consideration).
  * **Q:** Are accounts required? **A:** Optional (email/password or SSO). [Personal note: Instead of SHA-256, prefer bcrypt or Argon2id for password hashing due to adaptive cost and built-in salting.] 

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

---

## Interview Tags (for later filtering)

* **Domain/Industry**: `iot`, `payments`
* **Product Pattern**: `reservation`, `payment`, `notification`
* **System Concerns**: `high-availability`, `strong-consistency`, `geo-replication` (future), `throttling` (implied), `autoscaling` (future)
* **Infra/Tech (mentioned/leaned)**: `rest`, `mysql`, `postgres`, `load-balancer`
  [Personal note: Password hashing should be `bcrypt/Argon2id` rather than raw `sha256` in 2025 for better security posture.] 

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

---

## Problem Understanding

* **Original Prompt**: “Design a reservation and payment system for a parking garage.” 
* **Use Cases**

  * Reserve a spot for a time window (vehicle type aware).
  * See free spots for a garage/time.
  * Pay for reservation via third party.
  * Cancel reservation.
  * Optional: create account/login for repeat use. 
* **Out of Scope**

  * Hardware gates, cameras, dynamic surge pricing, detailed billing disputes. 
* **APIs (as discussed at a high level)**

  * **Public**: `/reserve`, `/pay`, `/cancel`
  * **Internal**: `/calculate_payment`, `/free_spots`, `/allocate_spot`
  * **Optional**: `/create_account`, `/login`
    *(Shapes discussed conceptually—garage ID, times, vehicle type, reservation ID)*. 

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

---

## Requirements & Constraints

**Given in Video**

* **Functional**

  * Reserve a spot → returns spot & reservation ID.
  * Pay by reservation ID through a payment provider.
  * Cancel by reservation ID.
  * Query free spots by garage, time, vehicle type.
  * Optional account creation (email/password or SSO) and login. 
* **Non-Functional**

  * Strong consistency to prevent double-booking.
  * Read-heavy load; employ read replicas + load balancing.
  * Single-region or location-aware sharding is acceptable; scale considered modest. 

**Assumptions (conservative)**

* Reservation holds are short-lived until payment; idempotent operations on `/pay` and `/cancel`.
* Basic rate limiting per account/IP to avoid abuse.
* Simple flat rates per size per garage (no promotions/taxes modeled).
  [Personal note: Store money as integer cents or DECIMAL(…); many teams prefer integer cents to simplify arithmetic across services.] 

[Ask AI: Requirements and Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

---

## Back-of-the-Envelope Estimation

*Not stated in video—skipping numerical estimation.* 

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

---

## High-Level Architecture

* **Clients**: Web or mobile app.
* **Backend**: Single service (can later split reservations vs. slot allocation).
* **DB**: Postgres (speaker’s preference) or MySQL; one primary, multiple read replicas.
* **LB**: Load balancer distributes read traffic; potential locality-aware routing (zip code).
* **Payments**: Integrate with Stripe/Square; backend owns idempotency and state transitions.
* **Consistency**: Favor strong consistency; ensure reads reflect recent writes during allocation. [Personal note: Consider transactions/advisory locks and reading from primary on allocate→confirm to eliminate staleness.] 

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

---

## Deep Dives by Subsystem

### 8.1 Reservation Service

* **Role**: Validate request (garage, time, vehicle type), allocate a spot, create reservation, return reservation ID & spot.
* **Data Model**: `reservations(id, garage_id, spot_id, start_time, end_time, paid)`; `spots(id, garage_id, vehicle_type, status)`; `garages(id, zipcode, compact_rate, regular_rate, large_rate)`; optional `users` and `vehicles`. 
* **Consistency**: Strong; allocation should be transactional to avoid double assignment.
* **Scaling**: Reads on availability can hit replicas; allocation reads/writes go to primary.
* **Failures**: If payment fails, auto-release spot (timeout/cron). 
  [Personal note: Use DB row locks or application-level advisory locks keyed by `(garage_id, time_bucket, vehicle_type)` during allocation.]

[Ask AI: Subsystem - Reservation](https://alisol.ir/?ai=Subsystem%20-%20Reservation%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

### 8.2 Payment Service (Integration)

* **Role**: Compute price, create payment intent with provider, confirm/settle, update `paid` flag.
* **APIs**: Internal `/calculate_payment(reservation_id)`; public `/pay(reservation_id)`. 
* **Idempotency**: Payment callbacks and retries must be idempotent.
* **Storage**: Record payment attempts/receipts for audit. 

[Ask AI: Subsystem - Payment](https://alisol.ir/?ai=Subsystem%20-%20Payment%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

### 8.3 Availability/Discovery

* **Role**: `/free_spots(garage_id, time, vehicle_type)` computes available spaces; consider “fit-down” (compact→regular→large when needed).
* **Caching**: Short-TTL cache for popular time windows per garage for UI snappiness (reads can be stale if not guarded during allocation). 

[Ask AI: Subsystem - Availability](https://alisol.ir/?ai=Subsystem%20-%20Availability%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

### 8.4 Accounts & Auth (Optional)

* **Role**: Store user, optional vehicles, login.
* **Password Storage**: Speaker mentions hashing (example: SHA-256).
  [Personal note: Instead of sha256, prefer bcrypt/argon2 for password hashing in 2025 due to built-in salting and adaptive cost parameters.] 

[Ask AI: Subsystem - Accounts](https://alisol.ir/?ai=Subsystem%20-%20Accounts%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

---

## Trade-offs & Alternatives

| Topic              | Option A                            | Option B                            | Video’s Leaning | Rationale                                                                                                                |
| ------------------ | ----------------------------------- | ----------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Consistency        | Strong (primary reads for critical) | Eventual (faster, risk of stale UI) | Strong          | Avoid double-booking.                                                                                                    |
| DB Type            | Relational (Postgres/MySQL)         | NoSQL                               | Relational      | Simpler schemaed data & transactions.                                                                                    |
| Spot Type Storage  | `ENUM`                              | `VARCHAR` + app validation          | Lean to ENUM    | Performance vs. flexibility (ENUMs hard to remove).                                                                      |
| Reads After Writes | “Read-lock” replicas                | Primary read on critical path       | Mixed/lock idea | Keep UI accuracy under writes. [Personal note: Prefer session consistency or primary reads for allocate→confirm flows.]  |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

---

## Reliability, Availability, and Performance

* **Replication**: Primary + read replicas; locality-aware read routing by garage zip code considered.
* **Backpressure**: Rate-limit reserve attempts; fall back to fewer candidate spots.
* **Graceful Degradation**: If payment provider down, allow reservation hold and notify user.
* **DR**: Not discussed; assumed single-region baseline. 

[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

---

## Security & Privacy (if discussed)

* **AuthN/Z**: Optional accounts with email/password or SSO.
* **PII**: Email, optional name, license plate; store minimally.
* **Secrets**: Keep payment keys out of code; rotate regularly.
* **Password hashing**: Replace raw SHA-256 with bcrypt/Argon2id. [Personal note: Prefer Argon2id over bcrypt for new deployments due to memory-hard resistance and tunable cost.] 

[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

---

## Observability (if discussed)

* Not explicitly covered; assume standard metrics (reservations/sec, allocation failures, payment errors), tracing around allocate→pay→confirm. 

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

---

## Follow-up Questions (from interviewer)

* Trade-offs of strong vs. eventual consistency for this domain.
* Whether to shard by location and how that affects locking.
* Where to separate services (reservation vs. slot allocation). 

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

---

## Candidate Questions (modeled)

* Do we allow spot “up-sizing” (compact taking large) and when?
* What’s the reservation hold timeout before payment?
* Are partial refunds or grace periods required on cancel?
* Any SLAs during event peaks (concerts, games)? 

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

---

## Key Takeaways

* Optimize for **no double-booking**; consistency outweighs sub-second latency for reservations.
* A **single relational DB** with **row/advisory locks** and **read replicas** is plenty at this scale.
* Keep **allocation transactional**; read from primary for allocate→confirm.
* **Third-party payments** simplify PCI scope; make callbacks idempotent.
* **Model money carefully** and avoid floating point pitfalls.
* **Password hashing** must be modern (bcrypt/Argon2id), not raw SHA-256. [Personal note: Instead of sha256, prefer bcrypt/argon2 for password hashing in 2025 due to built-in salting and adaptive cost parameters.] 

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

---

## Glossary

* **Strong Consistency**: Reads reflect the most recent writes (no stale reads).
* **Read Replica**: A follower DB that serves read traffic.
* **Advisory Lock**: Application-controlled DB lock for coordinating access.
* **Idempotency**: Repeating the same request yields the same result (safe retries). 

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

---

## Study Plan from This Interview (Optional)

* Practice modeling small, consistent OLTP systems (tickets, reservations).
* Implement allocation with transactions/locks in a toy Postgres project.
* Add idempotent payment flows with a mock payment provider. 

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29)

---

## Attribution

* Source Video: [https://www.youtube.com/watch?v=NtMvNh0WFVM](https://www.youtube.com/watch?v=NtMvNh0WFVM)
* Channel: Exponent
* Note: This document is a summary of the linked mock interview. 

---

## About the summarizer

I’m **Ali Sol**, a PHP Developer.

* Website: [alisol.ir](https://alisol.ir)
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

---
