# System Design Mock Interview: Design Payment System
- *Channel/Interviewer*: High-Performance Programming
- *Duration*: **00:31:40**
- *Original Video*: https://www.youtube.com/watch?v=olfaBgJrUBI

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.*

---

## One-Page Executive Summary

**Problem Prompt (One-liner)**
Design a reliable, highly available, and scalable online payment system that coordinates with a Payment Service Provider (PSP) to process card payments end-to-end.

**Primary Scope**
- **In scope:** PSP integration, payment coordination, wallet/ledger updates, async vs sync communication, reliability patterns (retries, timeouts, circuit breakers), idempotency, poison pills & dead-letter queues (DLQ), security basics (encryption, TLS), distributed scaling.
- **Out of scope:** Direct card-network integrations, detailed fraud models, settlement/chargebacks, KYC/AML specifics, multi-region reconciliation, PCI program details.

**Non-Functional Priorities**
Availability, correctness, durability, and resilience > latency (except POS-style flows needing immediate auth); scalability and backpressure handling for spikes.

**Key Constraints & Numbers**
Not stated in video.

**High-Level Architecture (Text)**
- Client places order → **Payment Service** (coordinator) persists event.
- Payment Service calls **PSP** to authorize/capture.
- On success → update **Wallet** (merchant balance) and append **Ledger** (append-only).
- Use **message queues/streams (e.g., Kafka)** for decoupling, buffering, retries, and fan-out.
- **DLQ** for poison messages; **idempotency keys** to prevent duplicates.
- **Observability & reconciliation** over persisted events.

**Top Trade-offs**
- Sync (simple UX) vs async (resilience & smoothing spikes).
- Idempotency vs exactly-once complexities.
- Strict fraud checks vs graceful degradation with fallbacks.
- Central DB simplicity vs distributed scale & consistency nuance.
- Operational simplicity vs Kafka-like streaming durability.

**Biggest Risks/Failure Modes**
Network partitions/timeouts; PSP outages; duplicate charges without idempotency; message loss without durable queues; inconsistent wallet/ledger without reconciliation; retry storms without jitter.

**5-Min Review Flashcards**
- **Q:** Why prefer async for payments? **A:** Decouples services, tolerates spikes/failures, buffers with durable queues.
- **Q:** When is sync mandatory? **A:** POS/real-time auth where immediate success/failure is required.
- **Q:** How to avoid double charges? **A:** Use idempotency keys stored with unique constraints; return prior result on duplicate. [Personal note: Idempotency yields an “exactly-once effect” atop at-least-once delivery; ensure downstream de-duplication.]
- **Q:** What’s a poison pill? **A:** Non-processable message → isolate to DLQ for later inspection.
- **Q:** Good retry policy? **A:** Exponential backoff with jitter; cap attempts; respect timeouts.
- **Q:** Ledger purpose? **A:** Immutable audit trail for reconciliation, revenue accounting, audits.
- **Q:** Wallet vs ledger? **A:** Wallet is current balance state; ledger is the source of truth events.
- **Q:** Timeout ambiguity? **A:** Client sees failure, but backend may succeed—combine idempotency and backend retries.
- **Q:** Circuit breaker use? **A:** Fail fast with fallback or cancel to prevent cascading failures.
- **Q:** Security basics? **A:** Encrypt at rest/in transit; TLS; access control; patches; backups. [Personal note: Target TLS 1.3 in 2025 for performance and modern cipher suites.]

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

---

## Interview Tags

**Domain/Industry:** `fintech, payments, ecommerce`
**Product Pattern:** `queue, job-scheduler, notification`
**System Concerns:** `high-availability, backpressure, throttling, autoscaling, privacy, gdpr, eventual-consistency`
**Infra/Tech (mentioned):** `microservices, rest, kafka, postgres/mysql (implied relational), tls, https`

[Personal note: Kafka still fits well, but consider managed streaming services if ops complexity is a concern.]

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

---

## Problem Understanding

**Original Prompt**
Implement a payment system for an online store that sends customers to a PSP-hosted payment page, processes results, updates merchant balances, and keeps an auditable ledger.

**Use Cases**
- Customer pays order → authorize/capture via PSP.
- Handle spikes (sales events), transient failures, and third-party outages.
- Prevent duplicates on retries/user re-submits.
- Post-payment: update wallet & ledger; expose transaction status to merchant/customer.

**Out of Scope**
Direct bank/card scheme integrations (rare, complex compliance), storing raw card data (delegated to PSP).

**APIs (if discussed)**
- PSP call includes amount & currency; client includes **Idempotency-Key** (UUID) in HTTP header.
- Other request/response shapes: Not stated in video.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

---

## Requirements & Constraints

### Given in Video
- **Functional:** Create payment events; call PSP; update wallet and ledger; report status; reconcile; DLQ poison messages.
- **Non-Functional:** High availability; correctness; resilience to partial failure; scalability; fault isolation; durable messaging; predictable behavior under load.
- **Consistency:** Wallet/ledger must converge via persisted events and reconciliation.

### Assumptions (Conservative)
- Soft real-time UX for web checkout; strict real-time only where mandated (e.g., POS).
- Single region to start; multi-AZ replication for durability.
- Relational storage for wallet/ledger with unique constraints for idempotency.

[Ask AI: Requirements and Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

---

## Back-of-the-Envelope Estimation

Not stated in video—skipping numerical estimation.

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

---

## High-Level Architecture

- **Client (Web/Mobile)** → **Checkout** → PSP-hosted **payment form** for PCI/GDPR compliance.
- **Payment Service (Coordinator):** Persist event; call PSP; interpret status; publish events.
- **Async Backbone (Kafka or similar):** Persist events for durability, retries, fan-out; buffer spikes.
- **Wallet Service:** Update merchant balances (state).
- **Ledger Service:** Append immutable transaction records for audits/analytics.
- **DLQ:** Quarantine non-processable messages.
- **Reconciliation Jobs:** Detect and repair inconsistencies (wallet vs ledger vs PSP).
- **Observability:** Metrics/logs/tracing around PSP calls, retries, DLQ rates (conceptually referenced).

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

---

## Deep Dives by Subsystem

### 8.1 Payment Service (Coordinator)
- **Role:** Orchestrates payment flow; persists initial event; calls PSP; publishes outcomes.
- **Data Model:** `payments(idempotency_key UNIQUE, order_id, amount, currency, status, psp_reference, created_at, updated_at)`
- **APIs:** Receives `Idempotency-Key` header; PSP call includes amount/currency.
- **Scaling:** Stateless workers behind load balancer; horizontal scale; backpressure via queue.
- **Failure Handling:** Timeouts; exponential backoff + jitter; circuit breaker to PSP; idempotent writes.
- **Consistency:** Write ledger/wallet via events to guarantee durability and retriability.
- **Notes:** On timeout ambiguity, treat as unknown → rely on idempotent retry + reconciliation.

[Ask AI: Subsystem - Payment Service](https://alisol.ir/?ai=Subsystem%20-%20Payment%20Service%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

### 8.2 Wallet Service
- **Role:** Tracks merchant balances; applies credits on successful payments.
- **Data Model:** `wallets(merchant_id PK, balance)` + `wallet_adjustments(id, payment_id, delta, created_at)`
- **Consistency:** Source-of-truth is ledger; wallet is a materialized balance; reconcile on divergence.
- **Bottlenecks:** Hot merchants; mitigate with sharding by merchant_id and batched updates.

[Ask AI: Subsystem - Wallet Service](https://alisol.ir/?ai=Subsystem%20-%20Wallet%20Service%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

### 8.3 Ledger Service
- **Role:** Immutable, append-only record of all financial events.
- **Data Model:** `ledger_entries(id, payment_id, type, amount, currency, status, at)`; indexed by `payment_id`/`at`.
- **Scaling:** Partition by time or payment_id; avoid in-place updates; support audit queries.

[Ask AI: Subsystem - Ledger Service](https://alisol.ir/?ai=Subsystem%20-%20Ledger%20Service%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

### 8.4 Messaging & DLQ
- **Role:** Durable pub/sub for events; retry queues; DLQ for poison pills.
- **Practices:** Acknowledge only after success; use consumer groups; monitor lag/DLQ rates.

[Ask AI: Subsystem - Messaging & DLQ](https://alisol.ir/?ai=Subsystem%20-%20Messaging%20%26%20DLQ%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

### 8.5 Resilience Patterns
- **Retries:** Exponential backoff + jitter; cap attempts; idempotent endpoints.
- **Timeouts:** Tune per endpoint to avoid indefinite waits; treat as unknown outcome.
- **Circuit Breakers:** Trip on persistent errors; provide fallbacks (e.g., allow small payments) or cancel.

[Ask AI: Subsystem - Resilience Patterns](https://alisol.ir/?ai=Subsystem%20-%20Resilience%20Patterns%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

---

## Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale |
|------|----------|----------|-----------------|-----------|
| Client payment UI | PSP-hosted form | In-house form (store PANs) | PSP-hosted | Offload PCI/GDPR; reduce risk. |
| Coordination | Sync calls | Async with queue | Async | Failure isolation, buffering. |
| Messaging | Kafka-like log | In-memory queue | Kafka-like | Durability & replay. |
| Fraud outage | Block all payments | Fallback for small amounts | Fallback allowed | Balance risk vs revenue. |
| Data truth | Wallet balance | Ledger events | Ledger | Auditability & reconciliation. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

---

## Reliability, Availability, and Performance

- **Replication/Redundancy:** Multi-instance services; DB replicas; message replication.
- **Backpressure & Throttling:** Queue buffers; consumer autoscaling; limit concurrent PSP calls.
- **Load Shedding:** Circuit breakers + graceful degradation (e.g., bypass noncritical checks).
- **Recovery:** Reconciliation jobs to fix inconsistent states after incidents.

[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

---

## Security & Privacy

- **Data at Rest:** Disk/DB encryption.
- **In Transit:** VPN (internal), **TLS** on public traffic, HTTPS for clients. [Personal note: Prefer TLS 1.3 in 2025 for forward secrecy and modern cipher suites.]
- **Access Control:** Least privilege; 2FA/MFA for operators.
- **Patching:** Keep OS/libs updated; remediate CVEs promptly.
- **Backups:** Regular, encrypted, restore-tested.
- **Passwords:** Use long, unique passwords; mitigate rainbow-table attacks. [Personal note: Prefer Argon2id (or bcrypt) for password hashing due to memory hardness and adaptive cost.]

[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

---

## Observability

- **Metrics:** PSP latency/success rate; retry counts; DLQ rates; consumer lag; wallet/ledger drift.
- **Logs/Tracing:** Correlate by `payment_id`/`idempotency_key`; trace PSP round-trips.
- **SLOs/Alerts:** Error budgets for PSP calls; alert on DLQ spikes and reconciliation backlog.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

---

## Follow-up Questions (from interviewer)

- When would you insist on synchronous authorization?
- How would you handle PSP outages during major sales events?
- What’s your reconciliation strategy if wallet and ledger diverge?
- How do you guarantee idempotency across multiple services?

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

---

## Candidate Questions (to ask)

- What PSP(s) and regions are in scope? Any failover PSP?
- Target SLOs for auth latency and success rate?
- Ledger integrity requirements (immutability, retention, audit export)?
- Allowed degradation paths (e.g., fraud fallback thresholds)?

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

---

## Key Takeaways

- Prefer **PSP-hosted** payment pages to offload PCI/GDPR risk.
- Use **durable queues** (Kafka-like) to decouple and survive spikes.
- Combine **idempotency keys** + DB unique constraints to prevent double charges. [Personal note: Idempotency must be end-to-end; dedupe at ledger/wallet too.]
- Apply **exponential backoff with jitter** and **timeouts**; add **circuit breakers** with safe fallbacks.
- Maintain an **append-only ledger**; reconcile wallet from events.
- Plan for **poison pills** via **DLQ** and manual/automated remediation.
- **Encrypt** at rest and in transit; prefer **TLS 1.3** in 2025.
- Monitor **DLQ, lag, PSP SLIs**, and **reconciliation backlog** to catch issues early.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

---

## Glossary

- **PSP (Payment Service Provider):** Third party that processes card payments and often hosts the payment form.
- **Wallet:** Derived balance for a merchant.
- **Ledger:** Immutable event log of financial transactions.
- **Idempotency Key:** UUID token to safely retry without duplicate effects.
- **Poison Pill:** Message that cannot be processed; moved to DLQ.
- **DLQ (Dead-Letter Queue):** Holding area for poison messages.
- **Circuit Breaker:** Pattern to fail fast after repeated upstream errors.
- **Exponential Backoff with Jitter:** Retry strategy that adds randomness to avoid thundering herds.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

---

## Study Plan from This Interview (Optional)

- Implement a toy payment coordinator with idempotency in PHP + a relational DB.
- Add Kafka (or a mock) to practice durable events, retries, and DLQ.
- Build reconciliation scripts to compare wallet vs ledger vs PSP mock.
- Run chaos experiments: PSP timeouts, network partitions, poison pills.

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CHigh-Performance%20Programming%7CDesign%20Payment%20System)

---

## Attribution

- Source Video: https://www.youtube.com/watch?v=olfaBgJrUBI
- Channel: High-Performance Programming
- Note: This document is a summary of the linked mock interview.

---

## About the summarizer

I'm *Ali Sol*, a PHP Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

