# System Design Mock Interview: Design Distributed Job Scheduler | Systems Design Interview Questions With Ex-Google SWE

- **Channel/Interviewer:** Jordan has no life  
- **Duration:** 00:30:29  
- **Original Video:** https://www.youtube.com/watch?v=pzDwYHRzEnk

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.*

---

## 1) One-Page Executive Summary (2–3 min skim)

- **Problem Prompt (One-liner):** Build a distributed job scheduler that executes uploaded binaries on a cluster, supports cron-like schedules and DAGs, exposes per-job status, and runs millions of jobs per day.

- **Primary Scope**
  - **In-scope:** Cron scheduling; DAG scheduling; job execution on executors; status tracking; retries/timeouts; load balancing via a broker; “at-least-once” execution with best-effort single concurrency per job.
  - **Out-of-scope (implicit):** Fine-grained auth, multi-region geo-consistency, UI, cost modeling, autoscaling details, advanced security, SLAs.

- **Non-Functional Priorities:** High availability of scheduling path; low latency from “due” to “dispatched”; scalable to millions of jobs/day; operational simplicity.

- **Key Constraints & Numbers (stated):** “Millions of jobs a day”; polling-period examples: ~30–60s; timeout bumping in minutes; multi-level priority queues with example timeouts (10s → 1m → 1h).

- **High-Level Architecture (Text)**
  - Object store (e.g., S3) holds uploaded binaries.
  - Metadata stores: **Cron table** and **DAG table** define schedules and dependencies.
  - **Scheduling table** contains runnable tasks, indexed by `(status, run_at)`; polled periodically.
  - **Change Data Capture (CDC)** propagates new/updated Cron/DAG entries into the scheduling table.
  - **Message broker** holds ready-to-run tasks; executors pull when idle.
  - **Executors** fetch binaries from object store, run, update status.
  - **Read replicas** (eventually consistent) serve user status queries.

- **Top Trade-offs**
  - CDC vs 2PC for getting initial/next runs into the scheduler.
  - In-memory broker vs log-based broker for work-stealing and stragglers.
  - Exact-once vs at-least-once semantics; idempotent jobs vs distributed locks.
  - Single-node transactional updates (per-DAG sharding) vs distributed transactions.

- **Biggest Risks/Failure Modes**
  - Duplicate execution due to retries, broker redelivery, node failures.
  - Lock contention and index churn in scheduling table (frequent updates to `run_at`).
  - Hot partitions (long-running tasks starving other work).
  - Eventual-consistency delays on status replicas.

- **5-Min Review Flashcards**
  - **Q:** What tables back cron vs DAG? **A:** Separate **Cron** and **DAG** metadata tables; runnable instances live in a **Scheduling** table.
  - **Q:** How do DAGs advance? **A:** Mark child dependency epochs; when all deps match current epoch, enqueue child.
  - **Q:** Why CDC? **A:** Avoid 2PC; propagate new/next runs from metadata tables to scheduler asynchronously.
  - **Q:** What drives fairness? **A:** Idle executors pull from broker; multi-level priority queues handle stragglers and “big” tasks.
  - **Q:** How to curb double-running? **A:** Best-effort distributed lock (e.g., ZK) + idempotent jobs + run_at timeouts.  
    [Personal note: Instead of ZooKeeper, consider etcd/Consul or Redis-based leases in 2025 for simpler ops and native cloud support.]
  - **Q:** How to scale scheduler reads/writes? **A:** Partition the scheduling table; index on `(status, run_at)`; optionally read via replicas with eventual consistency.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

## 2) Interview Tags (for later filtering)

- **Product Pattern:** `job-scheduler`, `queue`
- **System Concerns:** `high-availability`, `eventual-consistency`, `multi-tenancy`, `backpressure`, `throttling`
- **Infra/Tech (mentioned):** `kafka`, `rabbitmq`, `activemq`, `mysql`, `mongodb`, `s3`
  - [Personal note: If choosing a log broker, Apache Kafka/Pulsar now support cooperative rebalancing and richer consumer groups; still validate against your executor pull model.]

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

## 3) Problem Understanding

- **Original Prompt (paraphrase):** Execute uploaded binaries on a distributed set of executors. Support cron schedules and DAG workflows. Users can check job status. System should scale (millions/day) and be fast and highly available.
- **Use Cases**
  - Schedule one-off or recurring (cron) jobs.
  - Build DAGs where downstream tasks start after parents succeed (or propagate failures).
  - Query job history/status/errors.
- **Out of Scope:** UI/console design, authZ policy models, cost metering, multi-region failover specifics.
- **APIs:** Not stated in video.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

## 4) Requirements & Constraints

**Given in Video**

- Run uploaded binaries from object storage on executors.
- Cron and DAG scheduling.
- “At least once” delivery with mitigations (locks/idempotency) to avoid concurrent duplicates.
- Status tracking; read replicas acceptable (eventual consistency).
- Scale to millions of jobs/day.
- Poll-driven scheduler using `(status, run_at)` index; bump `run_at` as job progresses to implement timeouts.

**Assumptions** *(conservative)*

- Authenticated tenants; per-tenant isolation at queue/topic or partition level.
- Soft SLO: seconds-to-minutes from due time to dispatch under load.
- Reasonable binary sizes (tens to hundreds of MB) stored in S3-like store.

[Ask AI: Requirements and Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

## 5) Back-of-the-Envelope Estimation

*Not stated in video—skipping numerical estimation.*

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

## 6) High-Level Architecture

- **Upload Path**
  1. User uploads binary to S3; registers a **Cron** or **DAG** definition.
  2. Metadata lands in **Cron table** or **DAG table**.
  3. **CDC** streams these changes into a **Scheduling table** by creating the first (and subsequent) runnable instances.

- **Scheduling Path**
  1. A **scheduler process** polls the **Scheduling table** every N seconds, fetching tasks with `status in (null|ready|in_progress)` and `run_at <= now`.
  2. On assignment, the scheduler bumps `run_at` forward to set a timeout window and pushes a job record into the **broker** (with a priority level based on retry count).

- **Execution Path**
  1. **Executors** pull when idle; fetch binary from S3; execute.
  2. Update **status/history** in the Scheduling table (or separate history table).
  3. If DAG: update child dependency epochs; when all deps for a node match, enqueue child for that epoch.
  4. On completion/failure, mark terminal status to stop retries.

- **Status Path**
  - Users query **read replicas** of the Scheduling table for job status/logs.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

## 7) Deep Dives by Subsystem

### 7.1 Cron Scheduling

- **Role:** Define cron expressions; seed next runnable instance.
- **Data Model (from video)**
  - `cron_jobs(id, schedule_spec, parent_job_id, ...)`
  - On creation, also insert **the next** occurrence into the **Scheduling** table.
  - Executor that completes the current run is responsible for creating the *next* occurrence. (Implemented via transaction/CDC.)
- **Indexes:** `(id)`, consider `(next_run)` in cron table if needed; primary scheduling index on `(status, run_at)`.
- **Failure Handling:** If executor crashes before scheduling the next, the bumped `run_at` timeout causes a retry; duplicates tolerated via idempotence.

[Ask AI: Subsystem - Cron Scheduling](https://alisol.ir/?ai=Subsystem%20-%20Cron%20Scheduling%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

### 7.2 DAG Scheduling

- **Role:** Track dependencies and epochs so children run when all parents for the same epoch have completed.
- **Data Model (from video)**
  - `dag_nodes(job_id, cron_if_root?, children[], dependency_epochs{dep_job_id: epoch_seen}, current_epoch)`
  - Root nodes may have cron schedules; completion of roots advances dependent nodes’ epochs; when all deps align, enqueue child for that epoch.
  - To avoid concurrent DAG runs, treat roots as “children” of leaves to re-trigger roots only after leaves finish.
- **Scaling & Partitioning:** Shard so each DAG’s metadata fits within a single database node to keep dependency updates transactional.
- **Store Choice:** Initially MySQL (transactions), later preferring MongoDB for JSON flexibility in modeling children/deps.  
  [Personal note: If strong transactional semantics across multiple nodes are needed, consider sticking with a relational DB with JSON support (e.g., Postgres JSONB) to keep transactions robust while preserving flexibility.]

[Ask AI: Subsystem - DAG Scheduling](https://alisol.ir/?ai=Subsystem%20-%20DAG%20Scheduling%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

### 7.3 Scheduling Table & Poller

- **Role:** Single source of “runnable instances.”
- **Key Fields:** `job_id (PK)`, `s3_url`, `run_at (indexed)`, `status`, `retry_count`, `priority_level`.
- **Behavior:** Poller queries `status != (completed|failed)` and `run_at <= now`, pushes to broker, and bumps `run_at` to a future timeout window.
- **Performance**
  - Partition by time range + hash(job_id) to spread writes/reads.
  - Read via replicas to reduce lock contention on leader.  
    [Personal note: Replica lag can cause extra retries; acceptable if idempotent and bounded by backoff.]

[Ask AI: Subsystem - Scheduling Table & Poller](https://alisol.ir/?ai=Subsystem%20-%20Scheduling%20Table%20%26%20Poller%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

### 7.4 Message Broker & Load Balancing

- **Role:** Distribute tasks to idle executors; support multi-level priority queues.
- **Approach (from video):**
  - Prefers **in-memory broker** (ActiveMQ/RabbitMQ) over **log-based** (Kafka) to avoid partition stickiness (one consumer per partition) that can starve tasks when a large job sits ahead.  
    [Personal note: Modern Kafka/Pulsar patterns can mitigate head-of-line blocking (more partitions, cooperative rebalancing, fair scheduling), but a pull-from-queue model with per-message acks remains simpler for executors.]
  - Multi-level priority queues (e.g., L1 10s, L2 1m, L3 1h). Big jobs bubble up; strongest executors read L3..L1.

[Ask AI: Subsystem - Broker & Load Balancing](https://alisol.ir/?ai=Subsystem%20-%20Broker%20%26%20Load%20Balancing%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

### 7.5 Executors

- **Role:** Pull, download binary from S3, execute, update status/history.
- **Failure Handling:** On crash or ack loss, broker may redeliver to another executor → duplicates possible; rely on idempotence and best-effort locking.
- **Locking:** Attempt distributed lock per `job_id` to prevent *concurrent* duplicates; TTL required to avoid deadlocks if executor dies.  
  [Personal note: Use heartbeat-based leases (renewed before expiry) to reduce accidental lock loss; monitor lease skew in GC pauses/outages.]

[Ask AI: Subsystem - Executors](https://alisol.ir/?ai=Subsystem%20-%20Executors%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

### 7.6 Job Status/History

- **Role:** Track `completed/failed/in_progress`, error messages, timestamps.
- **Serving:** Users read from **read replicas**; eventual consistency is OK for UX, protects the leader from heavy reads.

[Ask AI: Subsystem - Job Status](https://alisol.ir/?ai=Subsystem%20-%20Job%20Status%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

## 8) Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
| --- | --- | --- | --- | --- |
| Getting runs into scheduler | CDC from Cron/DAG to Scheduler | 2PC across tables | **CDC** | Avoids slow 2PC on uploads/updates. |
| Broker style | Log-based (Kafka) | In-memory queue (RabbitMQ/ActiveMQ) | **In-memory** | Executor pull avoids partition HoL blocking. |
| Data store for DAG | MySQL (relational) | MongoDB (JSON flexibility) | **MongoDB (final)** | Easier to store children/dep maps as JSON. |
| Preventing duplicates | Idempotent jobs + best-effort locks | Strong global transactions | **Idempotence + locks** | Strong consistency harms performance; duplicates acceptable in practice. |
| Status serving | Leader reads | Read replicas | **Replicas** | Reduce contention; tolerate eventual consistency. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

## 9) Reliability, Availability, and Performance

- **Replication/Consistency:** Eventual consistency acceptable for status reads; strong consistency not required on read path.
- **Backpressure & Throttling:** Priority queues plus executor pull model naturally backpressure; retries gated by `run_at` bumping.
- **Degradation:** If replicas lag, worst case is more retries (still safe if idempotent).
- **Failure Cases Considered:** Broker down, executor down, ack loss, scheduler node down → all handled via retries; duplicates expected.

[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

## 10) Security & Privacy

Not stated in video.

[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

## 11) Observability

- **User-Visible:** Status/history with errors.
- **Internal:** (Implied) metrics for queue depth, executor utilization, retry counts, and schedule latency; no specific stack named.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

## 12) Follow-up Questions (from interviewer)

Not stated in video.

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

## 13) Candidate Questions (modeled)

- What SLOs do we target for “due → started” latency under peak load?
- Are binaries trusted or sandboxed? Any language runtimes or containers required?
- Do we need per-tenant quotas/priorities?
- Should we provide per-job secrets management and environment injection?

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

## 14) Key Takeaways

- Separate **metadata** (Cron/DAG) from **runnable instances** (Scheduling table).
- Use **CDC** to flow metadata changes into runnable tasks.
- Index scheduler by `(status, run_at)` and **bump timeouts** through the job lifecycle.
- Prefer **executor pull** + **priority queues** for fair sharing and straggler handling.
- Aim for **idempotent jobs**; use **best-effort distributed locks** to avoid concurrent duplicates.  
  [Personal note: For new deployments, evaluate Redis Streams or cloud-managed queues (SQS, Pub/Sub) for reduced ops vs self-hosting AMQP brokers—verify fit for your workload.]
- Shard DAG metadata so each DAG’s updates are **transactional on one node**.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

## 15) Glossary

- **CDC (Change Data Capture):** Streaming DB changes to downstream consumers.
- **Epoch (in DAG):** Versioned “run” of a node; children advance when all parent epochs match.
- **HoL Blocking:** Head-of-line blocking—slow item prevents progress behind it.
- **Idempotent Job:** Re-running produces the same result without side effects.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

## 16) Study Plan from This Interview (Optional)

- Practice modeling DAG dependency tracking with epochs.
- Implement a toy scheduler: `(status, run_at)` index + poller + in-memory queue + worker.
- Add duplicate-suppression via idempotent writes and a lease-based lock.

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE)

---

## 17) Attribution

- Source Video: https://www.youtube.com/watch?v=pzDwYHRzEnk  
- Channel: Not stated in video  
- Note: This document is a summary of the linked mock interview.

---

## 18) About the summarizer

I'm *Ali Sol*, a PHP Developer. Learn more:

- Website: [alisol.ir](https://alisol.ir)  
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

