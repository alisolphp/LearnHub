# System Design Mock Interview: Design Rate Limiter | Token Bucket, Leaky Bucket, Sliding Logs

- **Channel/Interviewer:** Tech Dummies - Narendra Lakshmana Gowda  
- **Duration:** 00:35:55  
- **Original Video:** https://www.youtube.com/watch?v=mhUQe4BKZXs

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.* 

---

## One-Page Executive Summary (2–3 min skim)

- **Problem Prompt (One-liner):** Design a rate limiter that protects APIs from abuse, supports paid vs. free quotas, and works in distributed deployments.
- **Primary Scope:** Core rate-limiting algorithms (token bucket, leaky bucket, fixed window counter, sliding logs, sliding-window counter) and their behavior under bursty traffic and multi-region setups.  
  **Out of Scope:** Exact API contracts, production SLAs/metrics, vendor-specific configs.
- **Non-Functional Priorities:** Consistent enforcement, low latency overhead, memory efficiency, fair usage, resilience to DDoS/brute force, and cost control.
- **Key Constraints & Numbers (as examples in video):** per-user limits like 5 req/min or 10 req/min; developer trial quotas; concurrency limits (parallel sessions); geo/IP scoping.
- **High-Level Architecture (Text):**
  1. Clients → Load Balancer(s)  
  2. Rate Limiter service (enforcement)  
  3. Shared store for counters/logs (e.g., Redis/Cassandra)  
  4. Application servers  
  5. Optional: local in-memory cache + background sync to shared store  
  6. Optional: sticky sessions or distributed locks to reduce races (with trade-offs)
- **Top Trade-offs:**
  - Burst tolerance vs. smoothness (token bucket vs. leaky bucket)  
  - Precision vs. memory (sliding logs vs. sliding-window counter)  
  - Strict global accuracy vs. latency/availability (locks vs. relaxed limits)  
  - Simplicity vs. multi-region consistency
- **Biggest Risks/Failure Modes:**
  - Race conditions across regions causing over-allow  
  - Hot keys (popular users/tenants) overloading storage  
  - Overly strict locks increasing tail latency  
  - Fixed windows causing boundary spikes (“double dip” at minute edges)  
  - Unbounded queues in leaky bucket causing memory pressure
- **5-Min Review Flashcards:**
  - **Q:** Why rate limit? **A:** Protect UX, security (brute force), and cost.  
  - **Q:** Token bucket in one line? **A:** Tokens refill over time; requests spend tokens to allow bursts up to bucket size.  
  - **Q:** Leaky bucket in one line? **A:** Queue + constant drain rate; smooths bursts, drops when queue full.  
  - **Q:** Fixed window pitfall? **A:** Boundary spikes allow ~2× near window edges.  
  - **Q:** Sliding logs advantage? **A:** Real-time window accuracy by tracking recent timestamps.  
  - **Q:** Sliding-window counter benefit? **A:** Similar accuracy with fewer entries via per-second counters.  
  - **Q:** Distributed consistency options? **A:** Sticky sessions, locks, or relax enforcement slightly.  
  - **Q:** Operational win from local cache? **A:** Fewer store round trips at the cost of eventual consistency.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

## Interview Tags (for later filtering)

- **Product Pattern:** `rate-limit`
- **System Concerns:** `throttling, backpressure, high-availability, geo-replication, hot-key`
- **Infra/Tech (mentioned):** `redis, cassandra, load-balancer`

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

## Problem Understanding

- **Original Prompt (paraphrase):** Build rate limiting to curb bot spikes and monetize APIs by tiering quotas; support per-user, concurrency, IP/location, and server-level limits.
- **Use Cases:**  
  - Free developer tier (e.g., 10 req/min) vs. enterprise tier  
  - Brute-force prevention on login/promo/booking  
  - Cost containment for autoscaling/pay-as-you-go services  
  - Location/IP-based throttles during targeted campaigns  
- **Out of Scope:** Detailed auth, billing integration, analytics dashboards.
- **APIs:** Not stated in video.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

## Requirements & Constraints

**Given in Video**
- Per-identity throttling: user-based, concurrent session caps, IP/location-based, and server-scope limits.  
- Distributed setup with multiple regions and shared state introduces races; sticky sessions and locks are options with downsides.  
- Optional local cache + async sync to shared store improves performance but allows slight drift.

**Assumptions (conservative)**
- Sub-millisecond to low-millisecond overhead target for the limiter path.  
- Quotas configurable per tenant/endpoint; enforcement returns 429 on reject.  
- Observability events on allow/deny for audits.

[Ask AI: Requirements and Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

## Back-of-the-Envelope Estimation

*Not stated in video—skipping numerical estimation.*

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

## High-Level Architecture

- **Ingress:** Clients → regional Load Balancers (LBs).  
- **Enforcement:** Regional Rate Limiter services apply algorithm-specific checks.  
- **State:** Shared datastore for counters/logs (examples shown: Redis or Cassandra).  
- **App Tier:** Requests that pass are forwarded to App Servers.  
- **Optional Consistency Helpers:** Sticky sessions (per-user affinity) or distributed locks on shared keys.  
  - *Sticky sessions trade off balance & fault tolerance.*  
  - *Locks serialize updates but add latency under contention.*  
- **Optional Performance Path:** Each limiter keeps a local cache of recent keys; a background sync service reconciles with the shared store asynchronously (slight over-allow tolerated).

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

## Deep Dives by Subsystem

### 8.1 Token Bucket
- **Role:** Allow bursts up to bucket size; tokens refill at a fixed rate; requests consume tokens.  
- **State per key:** last refill time, available tokens.  
- **Behavior:** If tokens ≥ 1 → allow & decrement; else reject.  
- **Distributed Concerns:** Concurrent updates to the same key can race in shared storage.

[Ask AI: Subsystem - Token Bucket](https://alisol.ir/?ai=Subsystem%20-%20Token%20Bucket%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

### 8.2 Leaky Bucket
- **Role:** Smooth bursts via FIFO queue drained at constant rate; overflow is dropped.  
- **Tuning:** Queue capacity (burst tolerance) and drain rate (throughput ceiling).  
- **Risk:** Excessive queueing under spikes increases latency or memory usage.

[Ask AI: Subsystem - Leaky Bucket](https://alisol.ir/?ai=Subsystem%20-%20Leaky%20Bucket%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

### 8.3 Fixed Window Counter
- **Role:** Count requests per fixed intervals (e.g., per minute); allow until threshold then reject.  
- **Pitfall:** Edge “double dip” lets near-window-boundary bursts exceed target rate.

[Ask AI: Subsystem - Fixed Window Counter](https://alisol.ir/?ai=Subsystem%20-%20Fixed%20Window%20Counter%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

### 8.4 Sliding Logs
- **Role:** Track timestamps for each request; at decision time, count events within last *T*.  
- **Pros:** Accurate real-time windows.  
- **Cons:** Memory heavy (stores many timestamps).

[Ask AI: Subsystem - Sliding Logs](https://alisol.ir/?ai=Subsystem%20-%20Sliding%20Logs%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

### 8.5 Sliding-Window Counter
- **Role:** Reduce memory by aggregating counts per small buckets (e.g., per second) within rolling window.  
- **Behavior:** Sum counts of buckets within last *T*; drop if ≥ limit.  
- **Benefit:** Near sliding-log accuracy with far fewer entries.

[Ask AI: Subsystem - Sliding-Window Counter](https://alisol.ir/?ai=Subsystem%20-%20Sliding-Window%20Counter%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

### 8.6 Distributed Enforcement (Multi-Region)
- **Problem:** Same user hitting different regions simultaneously → race updates in shared store → over-allow.  
- **Options:**  
  - Sticky sessions (per-user affinity to a region/app). *Trade-off:* imbalance/fault tolerance.  
  - Distributed locks per key when reading/updating. *Trade-off:* extra latency, potential contention.  
  - Relax limits slightly; accept small error margins for performance.  
  - Local cache + async reconciliation to shared DB.

[Ask AI: Subsystem - Distributed Enforcement](https://alisol.ir/?ai=Subsystem%20-%20Distributed%20Enforcement%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

## Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
| --- | --- | --- | --- | --- |
| Burst Handling | Token Bucket | Leaky Bucket | Both presented | Token allows short bursts; leaky smooths strictly. |
| Windowing | Fixed Window | Sliding (logs/counter) | Sliding | Avoid boundary spikes; better fairness. |
| Consistency | Locks | Relaxed limits | Mixed | Locks add latency; small drift may be acceptable. |
| Affinity | Sticky Sessions | Any-region | Mixed | Affinity reduces races but hurts balance/failover. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

## Reliability, Availability, and Performance

- **Consistency:** Global strictness is hard in multi-region; eventual reconciliation or affinity/locks are discussed.  
- **Latency Budget:** Locks and cross-region calls add latency; local caches reduce datastore trips.  
- **Backpressure:** Leaky bucket provides steady processing; fixed window can cause sudden load spikes.  
- **Degradation:** When buckets empty or queues full → shed load (429) to protect core services.

[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

## Security & Privacy

- **Abuse Prevention:** Throttle brute-force attempts (login, promo, booking).  
- **PII/Encryption:** Not stated in video.

[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

## Observability

- **Metrics/Logs/Tracing:** Not stated in video. (Would track allow/deny counts, latency, hot keys in practice—assumption.)

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

## Follow-up Questions (from interviewer, if any)

Not stated in video.

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

## Candidate Questions (if modeled)

Not stated in video.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

## Key Takeaways

- Pick algorithm by desired **burstiness vs. smoothness** characteristics.  
- **Fixed window** is simple but unfair at edges; prefer **sliding** approaches for accuracy.  
- **Sliding-window counter** is a strong default: accurate enough and memory efficient.  
- **Distributed** enforcement is non-trivial; accept small drift or pay with locks/affinity.  
- **Local caches + async sync** lower latency but require careful error budgets.  
- IP/location and concurrency limits complement per-user quotas.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

## Glossary

- **Token Bucket:** Refillable tokens; spend to pass.  
- **Leaky Bucket:** FIFO queue drained at a constant rate.  
- **Fixed Window:** Counter in fixed intervals (minute/hour).  
- **Sliding Logs:** Per-request timestamps; real-time window count.  
- **Sliding-Window Counter:** Per-bucket aggregates within a rolling window.  
- **Sticky Sessions:** LB keeps a user bound to a region/instance.  
- **Hot Key:** Disproportionately active identity causing contention.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs)

---

## Freshness Review (inline notes)

- Locks and sticky sessions are presented as options.  
  [Personal note: Prefer algorithms that minimize cross-region coordination (e.g., approximate counters or per-edge enforcement) to reduce lock contention in 2025.]  
- Fixed window counter is shown for simplicity.  
  [Personal note: Likely outdated; consider sliding-window counter to avoid boundary spikes — verify for your stack.]  
- Local cache + async sync proposed to reduce latency.  
  [Personal note: Add guardrails (per-key error budgets and periodic reconciliation) to bound drift in modern deployments.]

---

## Attribution

- **Source Video:** https://www.youtube.com/watch?v=mhUQe4BKZXs  
- **Channel:** Tech Dummies - Narendra Lakshmana Gowda  
- **Note:** This document is a summary of the linked mock interview.

---

## About the summarizer

I'm *Ali Sol*, a PHP Developer. Learn more:

- Website: [alisol.ir](https://alisol.ir)  
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

