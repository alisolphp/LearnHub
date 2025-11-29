# System Design Mock Interview: Notification Service

*(title: "Design Notification Service System | Handle Billions of users & Notifications")*

**Channel/Interviewer**: codeKarle  
**Duration**: 00:20:14
**Original Video**: https://www.youtube.com/watch?v=CUwt9_l0DOg

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.*

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=mock-interviews/system-design/Design%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=mock-interviews/system-design/Design%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=mock-interviews/system-design/Design%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=mock-interviews/system-design/Design%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=mock-interviews/system-design/Design%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=mock-interviews/system-design/Design%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=mock-interviews/system-design/Design%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=mock-interviews/system-design/Design%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=mock-interviews/system-design/Design%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=mock-interviews/system-design/Design%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=mock-interviews/system-design/Design%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=mock-interviews/system-design/Design%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=mock-interviews/system-design/Design%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=mock-interviews/system-design/Design%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=mock-interviews/system-design/Design%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=mock-interviews/system-design/Design%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications)
<!-- LH-BUTTONS:END -->

# One-Page Executive Summary

**Problem Prompt (One-liner)**: Design a scalable notification service capable of handling billions of users and notifications, often embedded in larger systems like e-commerce or booking platforms.

**Primary Scope**: Focuses on sending notifications via pluggable channels (e.g., SMS, email, in-app), with support for rate limiting, prioritization, user preferences, and bulk notifications based on filters; in-scope includes validations, handling, and tracking.

**Non-Functional Priorities**: High availability to minimize downtime costs, scalability for adding clients and notification types, and ease of attribution for billing or monitoring.

**Key Constraints & Numbers**: Handles enormous clients and notifications at scale; no specific QPS, latencies, or data sizes stated—assumes billions of users but focuses on architectural flexibility.

**High-Level Architecture (Text)**:
- Clients send requests to a Notification Service, which queues them asynchronously in Kafka.
- Validator & Prioritizer assigns priorities and routes to priority-specific Kafka topics.
- Rate Limiter enforces client and user limits using Redis counters.
- Notification Handler resolves user preferences and details via a Preferences DB and User Service.
- Final requests queued to channel-specific handlers (e.g., SMS, Email, In-App, IVRS) that integrate with vendors.
- Notification Tracker logs all sent notifications in Cassandra for auditing.
- For bulk: UI and Bulk Notification Service query a data store (e.g., Elasticsearch/MongoDB) fed by transaction parsers to filter users and send via the main service.

**Top Trade-offs**:
- Asynchronous queuing with Kafka for low client latency vs. synchronous API calls for critical scenarios.
- Separate deployable services for scalability in SaaS vs. monolithic for small use cases.
- Prioritizing high-priority messages first to ensure timely delivery vs. potential delays for low-priority ones.
- Placement of rate limiter before or after handler based on operation weight.
- Multiple vendor integrations per channel for global coverage vs. single vendor simplicity.
- Building custom query engine for bulk filters vs. leveraging existing company tools.

**Biggest Risks/Failure Modes**:
- Downtime in SaaS leading to client losses; mitigate with high availability.
- Overwhelming users with notifications without rate limits, causing poor experience.
- Delays in high-priority messages (e.g., OTP) due to spikes in low-priority traffic.
- Vendor failures or spikes causing backlogs; handle with independent scaling and queues.
- Data parsing errors from varied transaction formats leading to incorrect bulk targeting.
- Audit failures if tracker misses logs; ensure write-only reliability.

**5-Min Review Flashcards**:
- Q: What makes the service pluggable? → A: Easy addition of new channels like WhatsApp via new handlers and Kafka topics.
- Q: Why use priority-specific Kafka topics? → A: To process high-priority (e.g., OTP) messages before low-priority (e.g., promotions).
- Q: How is rate limiting implemented? → A: Redis keys for client/user IDs with increments and thresholds per time window.
- Q: What's the role of User Preferences? → A: Handles unsubscribes, channel choices (e.g., email over SMS), and fetches contact details.
- Q: For bulk notifications, how are users filtered? → A: Query Engine on a data store parsed from transaction Kafkas, supporting aggregations and filters.
- Q: Why track notifications? → A: For auditing, legal compliance, and reporting in case of disputes.
- Q: When to use synchronous flow? → A: For very critical scenarios, bypassing Kafka queues.
- Q: How to handle global SMS? → A: Integrate multiple vendors per region in the SMS Handler.
- Q: What's the difference in request types? → A: Specify channel/content vs. user ID and let service decide based on preferences.
- Q: Why build as SaaS? → A: Enables billing tiers, client attribution, and external usage.
- Q: How to scale handlers? → A: Independently based on traffic per channel (e.g., more for SMS than IVRS).
- Q: What databases are suggested? → A: Redis for rate limiting, Cassandra for tracking, Elasticsearch/MongoDB for queryable transaction data.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

# Interview Tags

**Domain/Industry**: ecommerce, delivery  
**Product Pattern**: notification, rate-limit  
**System Concerns**: high-availability, multi-tenancy  
**Infra/Tech**: kafka, redis, cassandra, elasticsearch, mongodb  

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

# Problem Understanding

**Original Prompt**: Design a notification service that is scalable enough to handle billions of users and notifications, embedded in other systems like e-commerce or booking applications.

**Use Cases**: Primary: Sending individual notifications (e.g., OTP, transactional updates, promotions) via SMS, email, in-app, or IVRS; secondary: Bulk notifications based on filters like recent orders.

**Out of Scope**: Standalone system; focuses on integration into larger platforms; no details on UI implementation beyond bulk UI mention.

**APIs**: Requests include content + recipient (e.g., email/phone) or user ID + content (service decides channel); responses acknowledge queuing; no full shapes stated.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

# Requirements & Constraints

**Functional Requirements**:
- Send notifications via pluggable channels (SMS, email, in-app, WhatsApp, IVRS).
- Support prioritization (high for OTP/transactional, low for promotional).
- Implement rate limiting at client, user, and promotional levels.
- Handle user preferences (e.g., channel choices, unsubscribes).
- Track sent notifications for auditing.
- Support bulk notifications via filter criteria on transaction data.

**Non-Functional Requirements**: High availability (downtime costly for SaaS); scalability for adding clients/channels; attribution for request counting/billing; low latency for high-priority via async queuing.

**Capacity Inputs**: Not stated in video—skipping numerical estimation.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

# Back-of-the-Envelope Estimation

*“Not stated in video—skipping numerical estimation.”*

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

# High-Level Architecture

- Clients (internal/external) send requests to Notification Service for individual or user-ID-based notifications.
- Notification Service performs basic validations and queues to Kafka asynchronously (or sync for critical).
- Validator & Prioritizer assigns priorities based on message type and routes to priority-specific Kafka topics.
- Rate Limiter checks client subscriptions and user limits using Redis increments/thresholds; also counts for billing.
- Notification Handler fetches preferences from Preferences DB and contact details from User Service; applies additional user-level limits if needed.
- Queues finalized requests (content + channel + recipient) to channel-specific Kafka topics.
- Channel Handlers (SMS, Email, In-App, IVRS) consume and integrate with vendors (e.g., regional SMS vendors, SMTP, Firebase/APNS).
- Notification Tracker logs all sent notifications to Cassandra for write-heavy auditing.
- For bulk: Bulk Notification UI/Service applies filters via Query Engine on Elasticsearch/MongoDB data store, populated by Transaction Data Parser from business transaction Kafkas; then sends to Notification Service.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

# Deep Dives by Subsystem

## Subsystem: Notification Service

**Role & Responsibilities**: Entry point for client requests; basic validations (e.g., non-null fields); queues to Kafka for async processing.

**Data Model**: Not stated in video.

**APIs/Contracts**: Accepts content + channel + recipient or user ID + content; responds with acknowledgment.

**Scaling & Partitioning**: Scalable as a service; Kafka handles partitioning.

**Caching Strategy**: Not stated in video.

**Consistency Model**: Not stated in video.

**Bottlenecks & Hot Keys**: Potential spikes from clients; mitigated by async queuing.

**Failure Handling**: Basic validations prevent invalid queues; sync option for critical.

**Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Notification Service](https://alisol.ir/?ai=Subsystem%20-%20Notification%20Service%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

## Subsystem: Validator & Prioritizer

**Role & Responsibilities**: Advanced validations; assigns priority based on message type (e.g., high for OTP, low for promotions); routes to priority Kafka topics.

**Data Model**: Message attributes include type identifier.

**APIs/Contracts**: Internal; consumes from initial Kafka.

**Scaling & Partitioning**: Not stated in video.

**Caching Strategy**: Not stated in video.

**Consistency Model**: Not stated in video.

**Bottlenecks & Hot Keys**: Heavy validations; placed early to filter invalid requests.

**Failure Handling**: Drops invalid messages.

**Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Validator & Prioritizer](https://alisol.ir/?ai=Subsystem%20-%20Validator%20%26%20Prioritizer%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

## Subsystem: Rate Limiter

**Role & Responsibilities**: Enforces limits on client calls (e.g., 10/sec) and user notifications (e.g., 3 promos/day); counts requests for pay-per-use billing.

**Data Model**: Redis keys as client/user ID + time window; increment counters.

**APIs/Contracts**: Internal; checks before heavier operations.

**Scaling & Partitioning**: Redis handles high throughput.

**Caching Strategy**: Redis as the store.

**Consistency Model**: Not stated in video.

**Bottlenecks & Hot Keys**: Hot clients/users; mitigated by time-based keys.

**Failure Handling**: Drops requests exceeding thresholds.

**Cost Considerations**: Enables tiered billing.

[Ask AI: Subsystem - Rate Limiter](https://alisol.ir/?ai=Subsystem%20-%20Rate%20Limiter%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

## Subsystem: Notification Handler & User Preferences

**Role & Responsibilities**: Resolves user preferences (e.g., no SMS, unsub promo); fetches contacts from User Service; applies user-specific limits if configured.

**Data Model**: Preferences DB for choices; User Service for IDs to contacts.

**APIs/Contracts**: Calls to DB and service.

**Scaling & Partitioning**: Not stated in video.

**Caching Strategy**: Not stated in video.

**Consistency Model**: Not stated in video.

**Bottlenecks & Hot Keys**: DB/service calls; placed after limiter to reduce load.

**Failure Handling**: Not stated in video.

**Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Notification Handler & User Preferences](https://alisol.ir/?ai=Subsystem%20-%20Notification%20Handler%20%26%20User%20Preferences%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

## Subsystem: Channel Handlers

**Role & Responsibilities**: Consume from channel Kafkas; integrate with vendors (e.g., multiple SMS by region, SMTP for email, Firebase/APNS for in-app, IVRS providers).

**Data Model**: Not stated in video.

**APIs/Contracts**: Sync calls to vendors.

**Scaling & Partitioning**: Independent scaling per channel based on traffic.

**Caching Strategy**: Not stated in video.

**Consistency Model**: Not stated in video.

**Bottlenecks & Hot Keys**: Vendor spikes; Kafka buffers allow pacing.

**Failure Handling**: Not stated in video.

**Cost Considerations**: Vendor costs vary by region/volume.

[Ask AI: Subsystem - Channel Handlers](https://alisol.ir/?ai=Subsystem%20-%20Channel%20Handlers%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

## Subsystem: Notification Tracker

**Role & Responsibilities**: Logs all sent notifications for auditing and compliance.

**Data Model**: Cassandra for write-heavy storage.

**APIs/Contracts**: Internal write after sending.

**Scaling & Partitioning**: Cassandra scales for high writes.

**Caching Strategy**: Not stated in video.

**Consistency Model**: Not stated in video.

**Bottlenecks & Hot Keys**: High throughput; write-only design.

**Failure Handling**: Not stated in video.

**Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Notification Tracker](https://alisol.ir/?ai=Subsystem%20-%20Notification%20Tracker%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

## Subsystem: Bulk Notification

**Role & Responsibilities**: UI/Service takes filter criteria and message; queries users via Query Engine; sends to Notification Service.

**Data Model**: Elasticsearch/MongoDB for transaction data with aggregations/nested queries.

**APIs/Contracts**: DSL for queries; parses from varied transaction formats.

**Scaling & Partitioning**: Data store handles large queries.

**Caching Strategy**: Not stated in video.

**Consistency Model**: Not stated in video.

**Bottlenecks & Hot Keys**: Complex filters; leverage existing rule/fraud engines if available.

**Failure Handling**: Not stated in video.

**Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Bulk Notification](https://alisol.ir/?ai=Subsystem%20-%20Bulk%20Notification%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

# Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
| --- | --- | --- | --- | --- |
| Processing Flow | Asynchronous with Kafka queues | Synchronous API calls | Asynchronous | Reduces client blocking; allows pacing during spikes. |
| Service Structure | Separate deployable units per component | Monolithic service | Separate for SaaS | Better scalability and independent scaling for high traffic. |
| Rate Limiter Placement | Before Notification Handler | After Notification Handler | Before | Avoids heavy DB/service calls on limited requests. |
| Priority Handling | Separate Kafka topics per priority | Single topic with in-consumer sorting | Separate topics | Ensures high-priority processed first without lag. |
| Bulk Query Engine | Build custom with parser and data store | Leverage existing company tools | Leverage if available | Avoids redundancy; supports broader use like fraud detection. |
| Channel Integration | Multiple vendors per channel | Single vendor | Multiple | Handles global/regional differences for better delivery. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

# Reliability, Availability, and Performance

- High availability emphasized for SaaS to avoid costly downtime; no specific replication details.
- Async Kafka for backpressure handling during spikes.
- Prioritization ensures low latency for critical messages (e.g., no delays for OTP).
- No explicit disaster recovery or RPO/RTO stated.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

# Security & Privacy

Not stated in video.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

# Observability

Not stated in video.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

# Follow-up Questions

Not stated in video.

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

# Candidate Questions

Not stated in video.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

# Key Takeaways

- Build notifications as pluggable for easy extension to new channels.
- Use prioritization and separate queues to protect critical messages from promotional spikes.
- Implement multi-level rate limiting to prevent abuse and enable billing.
- Respect user preferences to improve experience and compliance.
- Track all sends for legal and audit needs.
- For bulk, parse transaction data into a queryable store for flexible filtering.
- Prefer async flows for scalability in high-traffic SaaS.
- Scale components independently based on throughput.
- Consider syncing for ultra-critical paths only.
- Leverage existing query engines if available for efficiency.
- Club services for small-scale; separate for large SaaS.
- Global vendor integrations enhance reliability across regions.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

# Glossary

- **SaaS**: Software as a Service; model for offering the notification system to external clients with billing.
- **Kafka**: Distributed event streaming platform used for queuing and decoupling components.
- **Redis**: In-memory data store for rate limiting counters.
- **Cassandra**: Distributed NoSQL database for high-write logging.
- **Elasticsearch/MongoDB**: Search and document databases for queryable transaction storage.
- **Firebase/APNS**: Services for push notifications on Android/iOS.
- **IVRS**: Interactive Voice Response System for voice-based confirmations.
- **OTP**: One-Time Password; high-priority notification example.
- **DSL**: Domain-Specific Language; for structuring queries in the engine.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications)

# Attribution

* Source Video: https://www.youtube.com/watch?v=CUwt9_l0DOg
* Channel: codeKarle
* Note: This document is a summary of the linked mock interview.

# About the summarizer

I'm *Ali Sol*, a Backend Developer. Learn more:

* Website: [alisol.ir](https://alisol.ir)
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
