# Can Postgres replace Redis as a cache

* **Platform**: YouTube
* **Channel/Creator**: Coding with Raphael De Lio
* **Duration**: 00:13:23
* **Release Date**: Jul 14, 2024
* **Video Link**: [https://www.youtube.com/watch?v=acvYlXZn18g](https://www.youtube.com/watch?v=acvYlXZn18g)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Can%20Postgres%20replace%20Redis%20as%20a%20cache) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Can%20Postgres%20replace%20Redis%20as%20a%20cache) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Can%20Postgres%20replace%20Redis%20as%20a%20cache) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Can%20Postgres%20replace%20Redis%20as%20a%20cache) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Can%20Postgres%20replace%20Redis%20as%20a%20cache) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Can%20Postgres%20replace%20Redis%20as%20a%20cache) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Can%20Postgres%20replace%20Redis%20as%20a%20cache) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Can%20Postgres%20replace%20Redis%20as%20a%20cache) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Can%20Postgres%20replace%20Redis%20as%20a%20cache) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Can%20Postgres%20replace%20Redis%20as%20a%20cache) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Can%20Postgres%20replace%20Redis%20as%20a%20cache) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Can%20Postgres%20replace%20Redis%20as%20a%20cache)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Can%20Postgres%20replace%20Redis%20as%20a%20cache) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Can%20Postgres%20replace%20Redis%20as%20a%20cache) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Can%20Postgres%20replace%20Redis%20as%20a%20cache) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Can%20Postgres%20replace%20Redis%20as%20a%20cache)
<!-- LH-BUTTONS:END -->

## Introduction to Using Postgres as a Cache
**Summary**: The video explores the idea of using Postgres as a message broker and cache to replace Redis, sparked by a Twitter response and an article by Stefan Schmid. It questions whether Postgres, a relational database, can effectively substitute for Redis, which is known for its speed and is often used as a primary database or cache.
**Key Takeaway/Example**: Redis handles millions of operations per second, making it ideal for caching, but the article suggests Postgres could reduce complexity by consolidating tools.
**Link for More Details**: [Ask AI: Postgres as Cache](https://alisol.ir/?ai=Postgres%20as%20Cache|Coding%20with%20Raphael%20De%20Lio|Can%20Postgres%20replace%20Redis%20as%20a%20cache)

## Reasons to Replace Redis with Postgres
**Summary**: Postgres can simplify your tech stack if you're already using it, offering a familiar SQL interface for complex queries and potentially better cost efficiency by leveraging existing resources without adding new systems.
**Key Takeaway/Example**: It reduces maintenance of multiple databases, improves resource utilization in budget-constrained setups, and keeps everything in one tool for faster development.
**Link for More Details**: [Ask AI: Benefits of Postgres Cache](https://alisol.ir/?ai=Benefits%20of%20Postgres%20Cache|Coding%20with%20Raphael%20De%20Lio|Can%20Postgres%20replace%20Redis%20as%20a%20cache)

## Essential Features of a Caching Service
**Summary**: A good cache needs high performance for fast data access, expiration to remove outdated data, eviction policies for memory management, and simple key-value storage for efficient retrieval.
**Key Takeaway/Example**: The goal is quick, up-to-date data access; Redis excels here with sub-millisecond responses and high throughput.
**Link for More Details**: [Ask AI: Caching Service Features](https://alisol.ir/?ai=Caching%20Service%20Features|Coding%20with%20Raphael%20De%20Lio|Can%20Postgres%20replace%20Redis%20as%20a%20cache)

## Turning Postgres into a Cache with Unlogged Tables
**Summary**: Use unlogged tables in Postgres to disable write-ahead logging (WAL), which boosts write performance by avoiding double writes and disk flushes, similar to turning off Redis's append-only file (AOF) for caching.
**Key Takeaway/Example**: Unlogged tables sacrifice persistence for speed, as there's no WAL to recover from crashes, but this is acceptable for non-critical cache data.
**Link for More Details**: [Ask AI: Unlogged Tables in Postgres](https://alisol.ir/?ai=Unlogged%20Tables%20in%20Postgres|Coding%20with%20Raphael%20De%20Lio|Can%20Postgres%20replace%20Redis%20as%20a%20cache)

## Handling Expiration and Eviction in Postgres
**Summary**: Expiration requires stored procedures and the PG Cron extension for scheduling cleanups; eviction is optional but can be implemented with a last_read timestamp column and another procedure for LRU policy.
**Key Takeaway/Example**: This adds complexity, as stored procedures can leak business logic into the database, unlike Redis's built-in eight eviction policies.
**Link for More Details**: [Ask AI: Expiration and Eviction in Postgres](https://alisol.ir/?ai=Expiration%20and%20Eviction%20in%20Postgres|Coding%20with%20Raphael%20De%20Lio|Can%20Postgres%20replace%20Redis%20as%20a%20cache)

## Performance Comparison Between Postgres and Redis
**Summary**: Benchmarks show unlogged tables double write speed over logged ones, but read speeds are similar due to shared buffers; Redis is 85% faster overall, with much higher request rates.
**Key Takeaway/Example**: Even running Postgres in memory (via tmpfs) doesn't match Redis, due to overhead like locks and buffer management. PG Bench results confirm comparable read performance between logged and unlogged tables.
**Link for More Details**: [Ask AI: Postgres vs Redis Performance](https://alisol.ir/?ai=Postgres%20vs%20Redis%20Performance|Coding%20with%20Raphael%20De%20Lio|Can%20Postgres%20replace%20Redis%20as%20a%20cache)

## Conclusion: Should You Replace Redis with Postgres?
**Summary**: Postgres unlogged tables help with writes but not reads, and lack built-in features like easy expiration/eviction; Redis is superior for caching to prevent database overload and ensure fast retrieval.
**Key Takeaway/Example**: Stick with Redis for dedicated caching—it's simpler, faster, and more feature-rich than trying to adapt Postgres.
**Link for More Details**: [Ask AI: Replacing Redis with Postgres](https://alisol.ir/?ai=Replacing%20Redis%20with%20Postgres|Coding%20with%20Raphael%20De%20Lio|Can%20Postgres%20replace%20Redis%20as%20a%20cache)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
