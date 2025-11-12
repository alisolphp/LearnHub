# Design a Digital Wallet (3+ Approaches) — Summary & Prep Notes

**System Design Mock Interview:** Design a Digital Wallet (3+ Approaches) | Google Interview Question  
**Channel/Interviewer:** System Design Fight Club  
**Duration:** 01:48:59  
**Original Video:** https://www.youtube.com/watch?v=4ijjIUeq6hE

---

## TL;DR (what to remember)
- Split the system into **Transaction Service/DB** and **Wallet Service/DB**.
- Use **Sagas** for debit→credit coordination and compensations.
- Enforce **idempotency** via a transaction key recorded with balance updates.
- Feed **CDC** into an **OLAP/Audit** warehouse.
- Prefer **single-leader stores** (DynamoDB, Postgres/Cockroach/Cosmos) for consistent debits/credits.  
[Ask AI: TL;DR](https://alisol.ir/?ai=TL%3BDR%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

---

## Functional Requirements
- P2P transfer creation and submission.
- Transaction status reads and balance reads with sensible consistency.
- **No double charges** and safe retries (idempotency).
- Auditing that doesn’t burden OLTP.  
[Ask AI: Functional Requirements](https://alisol.ir/?ai=Functional%20Requirements%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

---

## Non-Functional Requirements
- **Throughput:** hundreds of thousands to ~1M TPS.
- Low tail latency; horizontally scalable.
- Resilience: retries, backoff, compensations.  
[Ask AI: Non-Functional Requirements](https://alisol.ir/?ai=Non-Functional%20Requirements%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

---

## High-Level Components
- **API Gateway / Transaction Receiver**
- **Transaction DB** (status/intent)
- **Wallet DB** (authoritative balances + applied txn ids)
- **Saga Orchestrator** (e.g., Step Functions/Conductor)
- **CDC/Stream** (Kafka/Kinesis) → **Audit/OLAP**  
[Ask AI: High-Level Components](https://alisol.ir/?ai=High-Level%20Components%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

---

## Data Models (sketch)
**Transaction (OLTP):** `txn_id, from_account, to_account, amount, created_at, status`  
**Wallet (OLTP):** `account_id, balance_minor_units, applied_txn_ids[]`  
**Audit (OLAP):** CDC-fed facts per transaction/status transition.  
[Ask AI: Data Models](https://alisol.ir/?ai=Data%20Models%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

---

## Core Write Flow (Orchestrated Saga)
1. **Receive** request with idempotency key → write txn `received`.
2. **Debit** sender wallet (conditional decrement + append `txn_id`).
3. **Credit** receiver wallet (idempotent increment + append `txn_id`).
4. **Mark complete/failed** on Transaction DB.
5. **CDC** to Audit warehouse.  
[Ask AI: Core Write Flow](https://alisol.ir/?ai=Core%20Write%20Flow%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

---

## Reads & Consistency
- **Transactions list/status:** from Transaction DB.
- **Balances:** strong reads where possible; pending vs. posted semantics as needed.  
[Ask AI: Reads & Consistency](https://alisol.ir/?ai=Reads%20%26%20Consistency%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

---

## Idempotency & “Exactly-Once” Effects
- Client provides an idempotency key / server issues `txn_id`.
- Wallet updates check for presence of `txn_id` to avoid double-apply.
- Retries/out-of-order deliveries become safe no-ops.  
[Ask AI: Idempotency & Exactly-Once Effects](https://alisol.ir/?ai=Idempotency%20%26%20Exactly-Once%20Effects%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

---

## Concurrency & Ordering
- No global order required; partitioned streams/stores OK.
- Concurrent debits: first conditional debit wins; second fails for insufficient funds.  
[Ask AI: Concurrency & Ordering](https://alisol.ir/?ai=Concurrency%20%26%20Ordering%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

---

## Failure Handling (examples)
- **Debit OK, credit fails:** compensate by re-crediting sender; mark failed.
- **Receiver frozen/missing:** compensate and fail with reason.
- **Dropped ACKs:** idempotency prevents duplicates.  
[Ask AI: Failure Handling](https://alisol.ir/?ai=Failure%20Handling%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

---

## Auditing via CDC
- Use triggers/CDC to stream OLTP facts to Kafka/Kinesis and ingest into an OLAP warehouse.
- Keeps investigative key-range scans off the OLTP path.  
[Ask AI: Auditing via CDC](https://alisol.ir/?ai=Auditing%20via%20CDC%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

---

## Storage Choices (discussed in video)
- Prefer **single-leader** databases: DynamoDB, Postgres/Cockroach, Cosmos.
- Avoid leaderless Cassandra for wallet invariants.  
[Ask AI: Storage Choices](https://alisol.ir/?ai=Storage%20Choices%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

---

## Partitioning / Keys
- **Transaction DB:** partition by `txn_id` to spread load.
- **Wallet DB:** partition by `account_id`; manage growth of applied ids.
- **Streams:** partition for throughput; no reliance on global order.  
[Ask AI: Partitioning / Keys](https://alisol.ir/?ai=Partitioning%20%2F%20Keys%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

---

## Three Approaches (as presented)

### Approach 1 — DynamoDB + Inlined Idempotency
- Txn table (status) + Wallet table with `applied_txn_ids[]`.
- Saga: Debit → Credit → Mark Complete.
- CDC to OLAP via stream/processors.  
[Ask AI: Approach 1](https://alisol.ir/?ai=Approach%201%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

### Approach 2 — Manually Sharded Postgres (Split Transactions)
- Idempotency entries in a **separate** table co-sharded with wallets.
- Multi-row transactions within a shard; same Saga pattern.  
[Ask AI: Approach 2](https://alisol.ir/?ai=Approach%202%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

### Approach 3 — Remove Redundant Transaction Table (Variant)
- Slim/optional central Txn table; rely on per-wallet logs + triggers.
- Keep a minimal Txn table if product/ops need discovery & disputes.  
[Ask AI: Approach 3](https://alisol.ir/?ai=Approach%203%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

---

## API Sketch
```http
POST /transfers
Idempotency-Key: <client-uuid>
{ "from":"acct_456", "to":"acct_678", "amount_minor":5000 }

GET /transfers/{txn_id}
GET /wallets/{account_id}/balance
```
[Ask AI: API Sketch](https://alisol.ir/?ai=API%20Sketch%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

---

## Interview Talking Points / Trade-offs
- **Sagas vs. 2PC/Raft**, where you accept availability vs. strict coordination.
- **Consistency choices** and where you need strong vs. eventual.
- **Idempotency** on the server, not just client headers.
- **CDC** to isolate OLTP from analytics.
- **Hot keys & partitioning** strategies.
- **Compensations** for partial failures.  
[Ask AI: Interview Talking Points / Trade-offs](https://alisol.ir/?ai=Interview%20Talking%20Points%20%2F%20Trade-offs%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

---

## Freshness Review (2025 quick notes)
- Cassandra still a poor fit for wallet invariants without extra coordination.  
- Inline `applied_txn_ids[]` likely needs offloading once churn grows.  
- Step Functions/Conductor remain standard; ensure per-step idempotency + DLQs.  
- Strong reads: use primary/strong/serializable/ bounded-staleness modes per store.  
[Ask AI: Freshness Review](https://alisol.ir/?ai=Freshness%20Review%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)

---

## What to draw on a whiteboard (fast)
1. Client → Transaction API (Idempotency-Key).  
2. Txn DB + Wallet DB (balance + idempotency).  
3. **Saga** box: Debit → Credit → Complete (+ dashed compensate).  
4. **CDC/Triggers → Stream → Audit Warehouse**.  
5. Notes: single-leader store, conditional updates, strong reads, retries + DLQ.  
[Ask AI: What to draw on a whiteboard](https://alisol.ir/?ai=What%20to%20draw%20on%20a%20whiteboard%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question)
