# System Design Mock Interview: Notification Service

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.* 

- **System Design Mock Interview**: **Notification Service System Design Interview Question to handle Billions of users & Notifications**.   
- **Channel/Interviewer**: **codeKarle**.   
- **Duration**: **00:20:14** 
- **Original Video**: `https://www.youtube.com/watch?v=CUwt9_l0DOg`.

---

## 1) One-Page Executive Summary (2–3 min skim)

- **Problem Prompt (one-liner):** Design a scalable notification service used across products, supporting multiple channels (SMS, email; easily pluggable to add more like in-app/WhatsApp). 
- **Primary Scope (as stated):**  
  - In-scope: sending notifications; prioritization (OTP/transactional/promotional), rate-limiting (per-client and per-user), user preferences/unsubscribe, delivery via channel handlers, tracking/auditing, bulk notifications via a query engine.      
  - Out-of-scope: Not explicitly stated. **(Not stated in video)**
- **Non-Functional Priorities:** High availability (SaaS offering), scalability, easy multi-tenant attribution, and graceful handling of spikes. 
- **Key Constraints & Numbers:** None explicitly quantified (QPS/latency/etc.). **(Not stated in video)**
- **High-Level Architecture (text):**  
  1. **Clients** call **Notification Service** (ingress).   
  2. **Validator & Prioritizer** classifies message (OTP > transactional > promo) and fans out to **priority Kafka topics**.   
  3. **Rate Limiter** (client/user caps; Redis counters).   
  4. **Notification Handler + User Preferences** (unsub, channel choice; user-service lookup).    
  5. **Channel Handlers** (SMS/Email/…); **Notification Tracker** (audit store).   
  6. **Bulk Notification UI/Service** + **Transaction Data Parser** + **Query Engine** over ES/Mongo for audience selection.    
- **Top Trade-offs:**  
  - Latency vs. throughput (priority queues).   
  - Strict throttling vs. customer experience (drop vs. queue).   
  - Single deployable vs. micro-components (throughput dependent).   
  - “Many Kafkas”/separate topics per flow vs. operational complexity.   
  [Personal note: For production-grade fairness/accuracy, sliding-window or token-bucket algorithms often outperform fixed counters for rate limits—verify with your traffic pattern.]  
  [Personal note: Consider logical separation via topics/partitions or managed Pub/Sub instead of multiple physical Kafka clusters to reduce ops overhead.]
- **Biggest Risks/Failure Modes:** hot keys (OTP spikes), misconfigured rate limits, backpressure on slow channels (e.g., SMS), and audit gaps if tracking fails.   
- **5-Min Review Flashcards (Q→A):**  
  - *Q:* Why separate priority topics? *A:* To keep OTP/critical flows lag-free under load.   
  - *Q:* Two kinds of rate limiting? *A:* Per-client subscription caps + per-user messaging caps.   
  - *Q:* Where are user contact details fetched? *A:* From a user service by user ID.   
  - *Q:* What does the tracker store? *A:* All sent notifications (audit/compliance) in its own store.   
  - *Q:* How do bulk notifications pick audiences? *A:* Query Engine over parsed transactional data (ES/Mongo).   
  - *Q:* How to add WhatsApp? *A:* Add a handler and topic; rest of the pipeline remains. 

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

---

## 2) Interview Tags (based on video)

- **Domain/Industry:** messaging, ecommerce (examples), SaaS platform.   
- **Product Pattern:** notification, rate-limit, pub-sub (Kafka), bulk campaigns.    
- **System Concerns:** high-availability, throttling/backpressure handling, multi-tenancy attribution.   
- **Infra/Tech (mentioned):** Kafka, Redis (rate limits), Elasticsearch/Mongo (audience queries), Cassandra (tracker).   

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

---

## 3) Problem Understanding

- **Original Prompt (paraphrase):** Build a scalable, pluggable notification platform used by many clients; support multiple channels; enforce priorities and rate limits; provide auditability.     
- **Use Cases:** OTP login; order status; promos; bulk campaigns (e.g., post-purchase install reminders).    
- **Out of Scope:** Not stated in video.  
- **APIs:** Not detailed. **Not stated in video.**

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

---

## 4) Requirements & Constraints

### Functional (given)
- Multi-channel sending; easy pluggability (e.g., add WhatsApp handler).   
- Priority handling: OTP > transactional > promotional with dedicated queues.   
- Rate limiting: per-client and per-user caps; request counting for billing.    
- User preferences & unsubscribe; user lookup for destinations.    
- Audit/log of sent notifications. 

### Non-functional (given)
- High availability (SaaS), scalability, and tenant attribution; handle uneven spikes.   
[Personal note: For noisy-neighbor isolation, consider per-tenant quotas + circuit breakers at ingress.]

### Assumptions (conservative)
- Global delivery latencies/SLOs not specified; expect OTP P95 to be tighter than promotional. **Assumption**

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

---

## 5) Back-of-the-Envelope Estimation
*Not stated in video—skipping numerical estimation.* 

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CcodeKarle%7CNotification%20Service%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

---

## 6) High-Level Design

**Data flow (priority path):**  
1) Client → Notification Service → Validator & Prioritizer → Kafka topics (high/med/low).   
2) Consumers process by priority; Rate Limiter enforces caps; non-conforming requests dropped.    
3) Handler consults Preferences + User Service; prepares channel-specific payload.   
4) Per-channel Kafka buffers delivery to SMS/Email/etc.; slow channels don’t block others.   
5) Tracker persists “sent” records for audit. 

**Bulk/segmentation path:**  
UI → Bulk Notification Service → Query Engine (on parsed transactional data) → audience list → Notification Service.     
[Personal note: For ad-hoc segmentation at scale, columnar stores (e.g., analytical DBs) often yield faster aggregations than general-purpose search DBs—evaluate with your dataset.]

[Ask AI: High-Level Design](https://alisol.ir/?ai=High-Level%20Design%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

---

## 7) Data Model (from video)

- **Tracker Store:** append-heavy records of sent notifications (minimal reads).   
- **Audience Data Store (bulk):** parsed transactional events into ES/Mongo-like store; queried via DSL. 

[Ask AI: Data Model](https://alisol.ir/?ai=Data%20Model%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

---

## 8) API Design (only what’s in video)
- Request/response shapes are not defined. **Not stated in video.**

[Ask AI: API Design](https://alisol.ir/?ai=API%20Design%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

---

## 9) Reliability, Availability & Performance

- **Isolation by priority:** consuming high-priority first prevents OTP lag.   
- **Backpressure points:** channel handlers and external providers; use queues to absorb spikes.   
- **Load shedding:** drop requests exceeding configured thresholds.   
- **Deployment shape:** can collapse components for low throughput.   
[Personal note: Consider per-queue concurrency caps + circuit breakers to keep slow channels from starving others.]

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

---

## 10) Security & Privacy

- Authentication/authorization, PII handling, and abuse prevention are **not discussed**. **Not stated in video.**

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

---

## 11) Observability

- Metrics/logging/tracing/SLOs are **not discussed**. **Not stated in video.**

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

---

## 12) Follow-up Questions (interviewer)
- None captured. **Not stated in video.**

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

---

## 13) Candidate Questions (if modeled)
- Not modeled. **Not stated in video.**

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

---

## 14) Key Takeaways

- Treat notifications as a **platform/SaaS** with tenant attribution and caps.   
- **Prioritize** OTP/transactional over promos via separate topics/consumers.   
- **Rate-limit** at client and user levels; **count** for billing/reporting.    
- Keep channel handlers **pluggable** (e.g., add WhatsApp with a new handler/topic).   
- Maintain an **audit trail** in a write-optimized store.   
[Personal note: For the tracker, evaluate low-cost object storage or append-only analytics tables for long-term retention vs. running a hot OLTP cluster.]

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

---

## 15) Glossary (terms used)

- **OTP:** One-Time Password; most time-critical notifications.   
- **Kafka:** Distributed log used here for fan-out, priority queues, and buffering.   
- **Rate Limiter (Redis):** Counter-based caps by client/user over a time window.   
- **Notification Tracker:** Append-only log of sent messages for audits/compliance.   
- **Query Engine (bulk):** DSL to select audiences from parsed transactional data. 

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

---

## 16) Study Plan from This Interview (optional)

- Practice sketching the **priority + rate-limit** path in <3 minutes.  
- Drill one **bulk segmentation** example end-to-end (parser → store → query → send).  
- Mock a **pluggability** addition (e.g., add WhatsApp handler) and call out the minimal changes. 

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

---

## 17) Attribution

- **Source Video:** `https://www.youtube.com/watch?v=CUwt9_l0DOg`  
- **Channel:** `codeKarle`  
- **Note:** This document is a summary of the linked mock interview. 

[Ask AI: Attribution](https://alisol.ir/?ai=Attribution%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

---

## 18) About Summarizer

I'm *Ali Sol*, a PHP Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)  
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
