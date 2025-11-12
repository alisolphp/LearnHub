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


