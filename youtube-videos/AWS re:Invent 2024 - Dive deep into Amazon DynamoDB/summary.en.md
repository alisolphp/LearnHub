# AWS re:Invent 2024 - Dive deep into Amazon DynamoDB

* **Platform**: YouTube
* **Channel/Creator**: AWS Events
* **Duration**: 01:03:18
* **Release Date**: Dec 4, 2024
* **Video Link**: [https://www.youtube.com/watch?v=Qzs8mU5dgx4](https://www.youtube.com/watch?v=Qzs8mU5dgx4)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=005796ea -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/AWS%20re%3AInvent%202024%20-%20Dive%20deep%20into%20Amazon%20DynamoDB) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/AWS%20re%3AInvent%202024%20-%20Dive%20deep%20into%20Amazon%20DynamoDB) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/AWS%20re%3AInvent%202024%20-%20Dive%20deep%20into%20Amazon%20DynamoDB) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/AWS%20re%3AInvent%202024%20-%20Dive%20deep%20into%20Amazon%20DynamoDB) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/AWS%20re%3AInvent%202024%20-%20Dive%20deep%20into%20Amazon%20DynamoDB) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/AWS%20re%3AInvent%202024%20-%20Dive%20deep%20into%20Amazon%20DynamoDB) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/AWS%20re%3AInvent%202024%20-%20Dive%20deep%20into%20Amazon%20DynamoDB) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/AWS%20re%3AInvent%202024%20-%20Dive%20deep%20into%20Amazon%20DynamoDB) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/AWS%20re%3AInvent%202024%20-%20Dive%20deep%20into%20Amazon%20DynamoDB) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/AWS%20re%3AInvent%202024%20-%20Dive%20deep%20into%20Amazon%20DynamoDB)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/AWS%20re%3AInvent%202024%20-%20Dive%20deep%20into%20Amazon%20DynamoDB) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/AWS%20re%3AInvent%202024%20-%20Dive%20deep%20into%20Amazon%20DynamoDB) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/AWS%20re%3AInvent%202024%20-%20Dive%20deep%20into%20Amazon%20DynamoDB)
<!-- LH-BUTTONS:END -->

## DynamoDB Architecture Fundamentals
DynamoDB focuses on delivering predictable low-latency performance at any scale through horizontal partitioning of data. Tables (and indexes) are divided based on a hash of the primary key, with each partition around 10GB and replicated across three AZs for durability and availability. One replica acts as the leader for writes and strongly consistent reads. Partitions split automatically for size or heat (e.g., over 3,000 reads or 1,000 writes per second). Requests flow from SDKs through load balancers to request routers, which handle auth, limits, and forwarding to storage nodes.
* **Key Takeaway**: Always design for multi-AZ distribution in your apps for high availability—DynamoDB handles replication, but sharing infrastructure means respecting per-partition limits to avoid impacting others.
* **Link for More Details**: [Ask AI: DynamoDB Architecture](https://alisol.ir/?ai=DynamoDB%20Architecture|AWS%20Events|AWS%20re%3AInvent%202024%20-%20Dive%20deep%20into%20Amazon%20DynamoDB)

## MemDS: Efficient Partition Lookup at Scale
MemDS is an in-memory, distributed system for fast partition metadata lookups, enabling tens of microsecond responses for routing requests. It avoids central databases or simple caches by using hundreds of synchronized MemDS nodes, polled by a partition publisher from storage nodes. Versioning detects stale data, and request routers cache results with eventual consistency. To ensure predictability, requests are hedged (duplicated for faster response) and constant work keeps MemDS under steady load.
* **Key Takeaway**: Embrace eventual consistency in your systems where possible—it reduces locking and variability. Use hedging for low-latency queries and maintain long-lived connections to leverage caching.
* **Link for More Details**: [Ask AI: MemDS Partition Lookup](https://alisol.ir/?ai=MemDS%20Partition%20Lookup|AWS%20Events|AWS%20re%3AInvent%202024%20-%20Dive%20deep%20into%20Amazon%20DynamoDB)

## Warm Throughput: Preparing Tables for Traffic Spikes
Warm throughput is a new feature to query and set the sustainable throughput a table or index can handle without throttling during spikes. Use DescribeTable to check current levels, and set via CreateTable or UpdateTable (e.g., up to 20,000 RCUs). It allows concurrent updates on tables and indexes, independent of autoscaling or on-demand billing—ideal for predictable events like holidays.
* **Key Takeaway**: Automate this in infrastructure as code (e.g., CloudFormation) to pre-split partitions ahead of peaks, avoiding manual provisioning hacks that could interfere with autoscaling.
```sql
-- Example using DynamoDB Shell (open-source tool for SQL-like interface)
ALTER TABLE customers SET WARM THROUGHPUT 20000 READ, 10000 WRITE;
```
* **Link for More Details**: [Ask AI: Warm Throughput in DynamoDB](https://alisol.ir/?ai=Warm%20Throughput%20in%20DynamoDB|AWS%20Events|AWS%20re%3AInvent%202024%20-%20Dive%20deep%20into%20Amazon%20DynamoDB)

## Multi-Region Strong Consistency in Global Tables
New multi-region strong consistency (mRSC) for global tables uses a Multi-Region Journal (MRJ) for asynchronous writes with strict ordering. Limited to three regions, it ensures global read-after-write consistency via heartbeats on consistent reads, and RPO=0 even on region isolation. Writes are replicated async but ordered per key, resolving conflicts deterministically unlike async global tables.
* **Key Takeaway**: Use for apps needing unique global sequences or financial transactions—do consistent reads for guarantees, but note EC reads may still be stale within a region.
* **Link for More Details**: [Ask AI: Multi-Region Strong Consistency](https://alisol.ir/?ai=Multi-Region%20Strong%20Consistency|AWS%20Events|AWS%20re%3AInvent%202024%20-%20Dive%20deep%20into%20Amazon%20DynamoDB)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
