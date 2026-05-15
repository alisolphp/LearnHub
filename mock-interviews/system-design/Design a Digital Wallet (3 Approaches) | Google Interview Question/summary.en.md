# Design a Digital Wallet (3+ Approaches) | Google Interview Question

* **Channel/Interviewer**: System Design Fight Club  
* **Duration**: 01:48:58  
* **Original Video**: https://www.youtube.com/watch?v=4ijjIUeq6hE

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.*

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=mock-interviews/system-design/Design%20a%20Digital%20Wallet%20(3%20Approaches)%20%7C%20Google%20Interview%20Question) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=mock-interviews/system-design/Design%20a%20Digital%20Wallet%20(3%20Approaches)%20%7C%20Google%20Interview%20Question) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=mock-interviews/system-design/Design%20a%20Digital%20Wallet%20(3%20Approaches)%20%7C%20Google%20Interview%20Question) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=mock-interviews/system-design/Design%20a%20Digital%20Wallet%20(3%20Approaches)%20%7C%20Google%20Interview%20Question) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=mock-interviews/system-design/Design%20a%20Digital%20Wallet%20(3%20Approaches)%20%7C%20Google%20Interview%20Question) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=mock-interviews/system-design/Design%20a%20Digital%20Wallet%20(3%20Approaches)%20%7C%20Google%20Interview%20Question) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=mock-interviews/system-design/Design%20a%20Digital%20Wallet%20(3%20Approaches)%20%7C%20Google%20Interview%20Question) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=mock-interviews/system-design/Design%20a%20Digital%20Wallet%20(3%20Approaches)%20%7C%20Google%20Interview%20Question) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=mock-interviews/system-design/Design%20a%20Digital%20Wallet%20(3%20Approaches)%20%7C%20Google%20Interview%20Question) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=mock-interviews/system-design/Design%20a%20Digital%20Wallet%20(3%20Approaches)%20%7C%20Google%20Interview%20Question) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=mock-interviews/system-design/Design%20a%20Digital%20Wallet%20(3%20Approaches)%20%7C%20Google%20Interview%20Question) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=mock-interviews/system-design/Design%20a%20Digital%20Wallet%20(3%20Approaches)%20%7C%20Google%20Interview%20Question)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=mock-interviews/system-design/Design%20a%20Digital%20Wallet%20(3%20Approaches)%20%7C%20Google%20Interview%20Question) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=mock-interviews/system-design/Design%20a%20Digital%20Wallet%20(3%20Approaches)%20%7C%20Google%20Interview%20Question) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=mock-interviews/system-design/Design%20a%20Digital%20Wallet%20(3%20Approaches)%20%7C%20Google%20Interview%20Question) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=mock-interviews/system-design/Design%20a%20Digital%20Wallet%20(3%20Approaches)%20%7C%20Google%20Interview%20Question) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=mock-interviews/system-design/Design%20a%20Digital%20Wallet%20(3%20Approaches)%20%7C%20Google%20Interview%20Question)
<!-- LH-BUTTONS:END -->

---

# One-Page Executive Summary

**Problem Prompt (One-liner)**: Design a digital wallet system like Venmo for transferring money between user accounts at scale, handling up to 1 million TPS.

**Primary Scope**: Focus on internal money transfers between wallets, including transaction logging, balance updates, auditing, and handling high throughput; out-of-scope includes external payment gateways, fraud detection, or currency conversion.

**Non-Functional Priorities**: High availability and scalability for 1M TPS, low latency for transactions, eventual consistency where possible, with options for strong consistency; cost not emphasized.

**Key Constraints & Numbers**: 1M TPS for transfers; assumes simple balance checks without complex fraud; no specific user counts or data sizes stated, but implies sharding for hot accounts.

**High-Level Architecture (Text)**:
- Client sends transfer request to transaction service.
- Transaction logged in a sharded transaction DB (e.g., DynamoDB).
- Use CDC (e.g., Debezium) to trigger updates to wallet DB for balances.
- Saga pattern for distributed transactions across sender/receiver balances.
- Auditing data pushed to OLAP warehouse via streams like Kafka.
- Sharded counters for high-volume accounts to avoid hot keys.
- Read path: Query wallet DB for balances, transaction DB for history.
- Variations include ledger-style logging, direct balance updates, or Spanner for strong consistency.

**Top Trade-offs**:
- Eventual vs. strong consistency: Sagas offer scalability but risk temporary inconsistencies; Spanner provides strong reads at higher cost/latency.
- Ledger vs. balance tables: Ledgers ensure auditability but require summation for balances; direct updates are faster but risk inconsistencies without proper locking.
- Sharding balances: Handles hot accounts but complicates balance checks (scatter-gather for totals).
- CDC vs. direct writes: Decouples services for reliability but adds latency and complexity.
- Idempotency: Essential for retries, handled via unique keys, but increases storage needs.
- Auditing separation: OLAP for heavy queries avoids OLTP overload, but requires data syncing.

**Biggest Risks/Failure Modes**:
- Double-spending due to failed sagas or network partitions; mitigated by idempotency and compensating transactions.
- Hot shards from high-volume accounts (e.g., merchants); use sharded counters.
- Inconsistent balances from eventual consistency; option for strong consistency via Spanner.
- High latency in scatter-gather for sharded balances; assume merchants have sufficient funds to avoid overdrafts.
- Data loss in CDC streams; use at-least-once delivery with deduplication.
- Scalability bottlenecks in DB triggers or orchestrators at 1M TPS.

**5-Min Review Flashcards**:
- Q: Core components? → A: Transaction DB for logs, wallet DB for balances, CDC for syncing, sagas for coordination.
- Q: Handling 1M TPS? → A: Sharded DBs, asynchronous updates via CDC/Kafka, sharded counters for hot keys.
- Q: Consistency model? → A: Eventual with sagas; strong via Spanner for balance reads.
- Q: Idempotency? → A: Use unique transaction keys to prevent duplicates.
- Q: Auditing? → A: CDC to OLAP warehouse for analytical queries.
- Q: Money storage? → A: As strings or integers (cents) to avoid floating-point errors.
- Q: Approach 1 (Ledger)? → A: Append-only transactions; sum for balances (high read cost).
- Q: Approach 2 (Direct updates)? → A: Update balances in transaction; use locks or sagas.
- Q: Approach 3 (Saga with CDC)? → A: Log transaction, trigger balance debits/credits asynchronously.
- Q: Sharded counters? → A: Split balance across multiple records for high TPS accounts.
- Q: Rollbacks? → A: Compensating transactions in sagas.
- Q: Why avoid Raft? → A: Prefers sagas for simplicity over Raft's consensus.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29)

---

# Interview Tags

**Domain/Industry**: fintech, payments  
**Product Pattern**: notification  
**System Concerns**: high-availability, low-latency, eventual-consistency, geo-replication, hot-key  
**Infra/Tech (only if mentioned)**: microservices, kafka, postgres, cassandra, dynamodb, redis

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29)

---

# Problem Understanding

**Original Prompt**: Design a digital wallet as a Google interview question, focusing on transferring money between accounts at 1M TPS.

**Use Cases**: Primary: Peer-to-peer money transfers (e.g., send $50 from user A to B). Secondary: Balance queries, transaction history, auditing.

**Out of Scope**: External payment processing (e.g., Stripe integration), fraud detection, currency handling beyond basics.

**APIs (if discussed)**: Not stated in video.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29)

---

# Requirements & Constraints

**Functional Requirements**:
- Log transactions with sender, receiver, amount, timestamp, status.
- Update sender/receiver balances atomically.
- Support idempotent requests to handle duplicates.
- Provide auditing via separate warehouse.
- Handle rollbacks for failed transfers.

**Non-Functional Requirements**: Scale to 1M TPS with low latency; eventual consistency preferred for scalability, with strong consistency option; high availability via sharding and replication.

**Capacity Inputs**: 1M TPS for transfers; no specific users or data sizes, but implies high write throughput.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29)

---

# Back-of-the-Envelope Estimation

*“Not stated in video—skipping numerical estimation.”*

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29)

---

# High-Level Architecture

- Client (browser/mobile) sends transfer request with sender ID, receiver ID, amount, idempotency key.
- Transaction service receives and logs to sharded transaction DB (e.g., DynamoDB/Postgres).
- CDC triggers (e.g., Debezium) send events to Kafka for async processing.
- Saga orchestrator (e.g., Lambda) coordinates debit from sender and credit to receiver in wallet DB.
- Wallet DB stores balances, sharded by user ID; uses sharded counters for high-volume users.
- Auditing: CDC pushes transaction logs to OLAP warehouse (e.g., ClickHouse) for queries.
- Read flow: Direct queries to wallet DB for balances; transaction DB for history.
- Variations: Ledger for append-only logs, direct updates with locks, or Spanner for strong consistency.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29)

---

## Subsystem: Transaction Service

**Role & Responsibilities**: Handles incoming transfer requests, logs transactions, ensures idempotency, and initiates sagas.

**Data Model (from video only)**: Transaction table with ID (e.g., snowflake), sender ID, receiver ID, amount (string/int cents), timestamp, status (pending/completed/failed), idempotency key; sharded by transaction ID.

**APIs/Contracts**: Not stated in video.

**Scaling & Partitioning**: Horizontal scaling with sharding by transaction ID to avoid hot partitions.

**Caching Strategy**: Not stated in video.

**Consistency Model**: Eventual; relies on sagas for coordination.

**Bottlenecks & Hot Keys**: High TPS on logs; mitigated by sharding and async processing.

**Failure Handling**: Idempotency keys for duplicates; sagas for rollbacks.

**Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Transaction Service](https://alisol.ir/?ai=Subsystem%20-%20Transaction%20Service%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29)

---

## Subsystem: Wallet DB

**Role & Responsibilities**: Stores and updates user balances; handles debits/credits from transactions.

**Data Model (from video only)**: Account table with user ID, balance (string/int cents); sharded counters with counter ID for hot accounts.

**APIs/Contracts**: Not stated in video.

**Scaling & Partitioning**: Sharded by user ID + counter ID; random shard selection for updates.

**Caching Strategy**: Not stated in video.

**Consistency Model**: Eventual via CDC; strong via Spanner option.

**Bottlenecks & Hot Keys**: High-volume merchants; use sharded counters to distribute load.

**Failure Handling**: Saga compensations for failed updates; assume sufficient funds for merchants.

**Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Wallet DB](https://alisol.ir/?ai=Subsystem%20-%20Wallet%20DB%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29)

---

## Subsystem: Auditing

**Role & Responsibilities**: Stores transaction logs for analytical queries and compliance.

**Data Model (from video only)**: Mirrors transaction table in OLAP format.

**APIs/Contracts**: Not stated in video.

**Scaling & Partitioning**: OLAP warehouse handles range queries; no sharding specified.

**Caching Strategy**: Not stated in video.

**Consistency Model**: Eventual.

**Bottlenecks & Hot Keys**: Large range queries; separated from OLTP to avoid impact.

**Failure Handling**: CDC with at-least-once delivery.

**Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Auditing](https://alisol.ir/?ai=Subsystem%20-%20Auditing%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29)

---

# Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
| --- | --- | --- | --- | --- |
| Consistency | Sagas (eventual) | Spanner (strong) | Sagas | Scalability over strict reads; strong only if needed for balances. |
| Balance Management | Ledger (sum transactions) | Direct updates | Direct with sagas | Ledgers good for audit but slow reads; direct faster with coordination. |
| Hot Key Handling | Single record | Sharded counters | Sharded counters | Distributes load for merchants; assumes no overdrafts on shards. |
| Sync Mechanism | CDC/DB triggers | Direct service calls | CDC | Decouples for reliability; avoids 2PC unreliability. |
| Transaction ID | User ID sharding | Transaction ID sharding | Transaction ID | Avoids hot partitions from popular users. |
| Auditing | In OLTP DB | Separate OLAP | Separate OLAP | Prevents analytical queries from slowing transactions. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29)

---

# Reliability, Availability, and Performance

- Replication via DB sharding and multi-region if needed.
- Latency: Async sagas keep writes fast; reads from wallet DB.
- Backpressure: Not stated in video.
- Load shedding: Not stated in video.
- Disaster recovery: Not stated in video.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29)

---

# Security & Privacy

Not stated in video.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29)

---

# Observability

Not stated in video.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29)

---

# Follow-up Questions

Not stated in video.

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29)

---

# Candidate Questions

Not stated in video.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29)

---

# Key Takeaways

- Use separate transaction and wallet DBs for clarity and scaling.
- Sagas preferred over Raft for distributed transactions.
- Idempotency keys essential for handling retries.
- Sharded counters mitigate hot keys in high-volume accounts.
- CDC decouples syncing, enabling async updates.
- Ledger approach great for auditing but costly for balance reads.
- Strong consistency via Spanner for critical balance checks.
- Money as strings/ints to avoid rounding issues.
- Auditing in OLAP avoids OLTP overload.
- Assume merchants won't overdraw shards.
- Event sourcing not used; prefer simple status updates.
- Transaction ID as shard key balances load.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29)

---

# Glossary

- Saga: Pattern for managing distributed transactions with compensations.
- CDC: Change Data Capture for syncing DB changes.
- Sharded Counter: Splitting a counter across records to handle high updates.
- Idempotency: Operation that can be repeated without changing results.
- OLTP: Online Transaction Processing for fast writes/reads.
- OLAP: Online Analytical Processing for complex queries.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29)

---

# Attribution

* Source Video: https://www.youtube.com/watch?v=4ijjIUeq6hE
* Channel: System Design Fight Club
* Note: This document is a summary of the linked mock interview.

---

# About the summarizer

I'm *Ali Sol*, a Backend Developer. Learn more:

* Website: [alisol.ir](https://alisol.ir)
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
