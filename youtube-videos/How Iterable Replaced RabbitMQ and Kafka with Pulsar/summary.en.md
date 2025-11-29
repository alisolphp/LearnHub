# How Iterable Replaced RabbitMQ and Kafka with Pulsar

* **Platform**: YouTube
* **Channel/Creator**: StreamNative
* **Duration**: 00:22:27
* **Release Date**: Aug 8, 2025
* **Video Link**: https://www.youtube.com/watch?v=nlQK9qCQ8Eo

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=4ea0b5d0 -->

### AI-Powered buttons

Teach Me:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/How%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/How%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/How%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/How%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/How%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/How%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/How%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/How%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/How%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/How%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/How%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/How%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/How%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/How%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/How%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/How%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/How%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar)
<!-- LH-BUTTONS:END -->

## What Iterable Actually Does
Iterable is a SaaS customer-lifecycle / marketing-automation platform. Everything that happens between a brand and its users (ingesting events, storing profiles, deciding what to send, actually sending emails/SMS/WhatsApp/push/etc., and tracking results) flows through their system.

All of that data movement is powered by Pulsar today — roughly 50 billion messages per day across all environments, with ~1–1.25 million messages per second at peak.

[Ask AI: Iterable platform overview](https://alisol.ir/?ai=Iterable%20platform%20overview%7CStreamNative%7CHow%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar)

## Workloads = One Customer’s Distinct Use-Case
A “workload” at Iterable is a single customer’s specific campaign or flow (e.g. abandoned-cart series, scheduled concert reminder, post-purchase transactional flow, monthly newsletter, etc.).

Key characteristics:
- Hundreds of thousands of workloads run in parallel
- Each can have wildly different volume, latency, and priority requirements
- Transactional messages (order confirmations, password resets) get higher priority than bulk/marketing sends

This workload concept drives almost every architectural decision they made with Pulsar.

[Ask AI: Multi-tenant workloads in messaging systems](https://alisol.ir/?ai=Multi-tenant%20workloads%20in%20messaging%20systems%7CStreamNative%7CHow%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar)

## The Three Core Queuing Principles at Iterable
1. **Scalable** – must handle hundreds of thousands of parallel workloads and massive spikes (top-of-hour sends, Black Friday, elections, holidays)
2. **Flexible** – new channels, new features, delayed delivery up to 60 days, per-user send-time-optimization delays
3. **Fair** – no big customer should starve a small one; strict isolation and resource dedication per customer

These three words decided the migration away from RabbitMQ (and earlier Kafka usage) toward Pulsar.

[Ask AI: Scalable Flexible Fair queuing principles](https://alisol.ir/?ai=Scalable%20Flexible%20Fair%20queuing%20principles%7CStreamNative%7CHow%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar)

## Why Pulsar Won the Selection Process
- Native delayed/scheduled delivery (critical for STO and long-term scheduling)
- First-class multi-tenancy (tenants → namespaces → topics per customer)
- Millions of topics without pain
- Built-in Dead Letter Queues
- Topic-level retention & easy replay
- Shared subscriptions + multiple subscriptions per topic
- Geo-replication and tiered storage basically for free

They started migrating from RabbitMQ ~5 years ago and have been 100% on Pulsar for the last ~3 years.

[Ask AI: Why companies choose Pulsar over RabbitMQ Kafka](https://alisol.ir/?ai=Why%20companies%20choose%20Pulsar%20over%20RabbitMQ%20Kafka%7CStreamNative%7CHow%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar)

## Real Numbers from Production (normal day)
- ~50 billion messages/day total
- ~1.25 M msg/s publish peak
- ~100 k active topics
- ~500 k producers
- ~2 million consumers
- Outbound sends are “only” ~1 billion/day; the rest is internal events and tracking

During holiday peaks the numbers go much higher and Pulsar just scales out by adding brokers/bookies.

[Ask AI: Pulsar production numbers at scale](https://alisol.ir/?ai=Pulsar%20production%20numbers%20at%20scale%7CStreamNative%7CHow%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar)

## Handling Spiky & Seasonal Traffic
Daily pattern → huge spikes at top-of-hour sends  
Seasonal → Black Friday → Christmas multiplies volume many times over

With Pulsar they simply add brokers/bookies when needed and remove them in January. No rebalancing nightmares, no pre-provisioning for peak.

[Ask AI: Handling Black Friday spikes with Pulsar](https://alisol.ir/?ai=Handling%20Black%20Friday%20spikes%20with%20Pulsar%7CStreamNative%7CHow%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar)

## Topic Architecture = Isolation + Control
- Each customer gets their own namespace (sometimes multiple)
- Individual topics per-campaign or per-channel topics
- Transactional vs bulk topics separated
- Consumers use regex subscriptions (e.g. “.*-transactional$”) so one consumer fleet can serve every customer
- Shared subscriptions only (gives back-pressure flexibility)
- Multiple subscriptions per topic (one for sending, one for analytics, one for DLQ handling, etc.)

This layout lets them:
- Enforce per-customer rate limits
- Prioritize transactional over bulk
- Guarantee fairness so no single customer can flood the cluster

[Ask AI: Pulsar multi-tenancy and regex subscriptions in production](https://alisol.ir/?ai=Pulsar%20multi-tenancy%20and%20regex%20subscriptions%20in%20production%7CStreamNative%7CHow%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar)

## Real Wins After Switching to Pulsar
- Much lower infrastructure cost than RabbitMQ days (same or less $ for 10–20× the traffic)
- Engineering time saved → new use-cases onboard in days instead of months
- No more worrying that queuing will bottleneck product growth
- Delayed delivery works perfectly at scale (60-day schedules + per-user Send-Time-Optimization)
- DLQ + retention → easy replay when an ESP has an outage
- Connectors (S3 sink, SQS source, Snowflake sink, etc.) used heavily

Bottom line from Asher: most of Iterable’s growth in the last few years would not have been possible (or would have been dramatically more expensive) without Pulsar’s architecture.

[Ask AI: Business impact of switching to Pulsar](https://alisol.ir/?ai=Business%20impact%20of%20switching%20to%20Pulsar%7CStreamNative%7CHow%20Iterable%20Iterable%20Replaced%20RabbitMQ%20and%20Kafka%20with%20Pulsar)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
