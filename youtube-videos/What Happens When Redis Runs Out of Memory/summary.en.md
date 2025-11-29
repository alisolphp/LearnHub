# What Happens When Redis Runs Out of Memory

* **Platform**: YouTube
* **Channel/Creator**: Redis
* **Duration**: 00:14:02
* **Release Date**: Apr 15, 2019
* **Video Link**: https://www.tovideo.org/

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/What%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/What%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/What%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/What%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/What%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/What%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/What%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/What%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/What%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/What%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/What%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/What%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/What%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/What%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/What%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/What%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory)
<!-- LH-BUTTONS:END -->

## Understanding Cache and Early Redis Usage
* **Summary**: Cache stores data for faster future access, ideally keeping needed data and evicting what's unlikely to be requested. When Redis first launched in March 2009, it lacked eviction features, so developers used TTL (time to live) on keys to manage memory by matching data inflow and outflow, hoping keys expired at the right time.
* **Key Takeaway/Example**: This approach left a lot of work to developers, as the server should handle memory management automatically.
* **Link for More Details**: [Ask AI: Early Redis Cache Management](https://alisol.ir/?ai=Early%20Redis%20Cache%20Management%7CRedis%7CWhat%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory)

## Introduction of Maxmemory and First Eviction Policy
* **Summary**: A few months after release, the maxmemory directive was added to set a memory limit. When reached, Redis sampled three keys and evicted the one with the shortest TTL, but only if keys had TTL set; otherwise, it returned an error. This became known as the volatile-ttl policy and was the default initially.
* **Key Takeaway/Example**: It avoided unnecessary deletions but wasn't optimal, as it only targeted expirable keys and could lead to errors if no such keys existed.
* **Link for More Details**: [Ask AI: Redis Maxmemory and Volatile-TTL](https://alisol.ir/?ai=Redis%20Maxmemory%20and%20Volatile-TTL%7CRedis%7CWhat%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory)

## LRU Eviction Policy Basics
* **Summary**: LRU (least recently used) assumes recently used keys are likely to be reused soon, while long-idle keys probably won't be. Redis tracks last use time in a 24-bit field per key object, using a server-start-relative clock that overflows after 194 days to save space.
* **Key Takeaway/Example**: To find idle keys in the flat keyspace, it initially sampled three random keys (later configurable via maxmemory-samples) and evicted the one with the longest idle time.
* **Link for More Details**: [Ask AI: Redis LRU Tracking](https://alisol.ir/?ai=Redis%20LRU%20Tracking%7CRedis%7CWhat%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory)

## LRU Variants and Random Eviction
* **Summary**: LRU came in allkeys-lru (evicts from entire keyspace) and volatile-lru (only keys with TTL). For uniform access patterns, random eviction was added: allkeys-random (any key) and volatile-random (TTL keys only). Noeviction was introduced for database use, returning errors without evicting.
* **Key Takeaway/Example**: LRU suits skewed access (e.g., 20% keys in 80% accesses), while random saves processing for uniform distributions. Noeviction fits non-cache scenarios.
* **Link for More Details**: [Ask AI: Redis Eviction Policy Variants](https://alisol.ir/?ai=Redis%20Eviction%20Policy%20Variants%7CRedis%7CWhat%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory)

## Improving LRU with Eviction Pool
* **Summary**: In March 2014, the algorithm was enhanced to reduce thrashing good keys by using a pool of best candidates instead of evicting from small samples each time. It loops through all databases, samples keys (per maxmemory-samples), calculates idle scores (current clock minus key's LRU stamp), and inserts into a 16-key pool ordered by idle time.
* **Key Takeaway/Example**: Keys with lower idle times are discarded; others shift the pool, dropping the worst if full. Eviction starts from the highest idle end. This improved approximation, getting close to ideal LRU with 10 samples, as shown in benchmarks from Redis 2.8 to post-pool versions.
* **Link for More Details**: [Ask AI: Redis LRU Eviction Pool](https://alisol.ir/?ai=Redis%20LRU%20Eviction%20Pool%7CRedis%7CWhat%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory)

## Cross-Database Eviction and Volatile-TTL Pool
* **Summary**: Initially, eviction was per-database, but issues led to scanning all databases for fairer eviction. The pool approach was also applied to volatile-ttl for better sampling of shortest TTL keys.
* **Key Takeaway/Example**: This ensured balanced memory freeing across databases, addressing debates in the community.
* **Link for More Details**: [Ask AI: Redis Cross-Database Eviction](https://alisol.ir/?ai=Redis%20Cross-Database%20Eviction%7CRedis%7CWhat%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory)

## Introduction to LFU Eviction
* **Summary**: In July 2016, LFU (least frequently used) was added, focusing on access frequency rather than recency, useful for different workloads.
* **Key Takeaway/Example**: It evicts keys used least often, complementing LRU for scenarios where frequency matters more than recent use.
* **Link for More Details**: [Ask AI: Redis LFU Eviction](https://alisol.ir/?ai=Redis%20LFU%20Eviction%7CRedis%7CWhat%20Happens%20When%20Redis%20Runs%20Out%20of%20Memory)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
