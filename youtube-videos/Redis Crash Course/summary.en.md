# Redis Crash Course

* **Platform**: YouTube
* **Channel/Creator**: Piyush Garg
* **Duration**: 01:23:37
* **Release Date**: Sep 2, 2023
* **Video Link**: [https://www.youtube.com/watch?v=Vx2zPMPvmug](https://www.youtube.com/watch?v=Vx2zPMPvmug)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Redis%20Crash%20Course) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Redis%20Crash%20Course) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Redis%20Crash%20Course) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Redis%20Crash%20Course) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Redis%20Crash%20Course) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Redis%20Crash%20Course) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Redis%20Crash%20Course) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Redis%20Crash%20Course) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Redis%20Crash%20Course) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Redis%20Crash%20Course) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Redis%20Crash%20Course) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Redis%20Crash%20Course)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Redis%20Crash%20Course) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Redis%20Crash%20Course) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/Redis%20Crash%20Course) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Redis%20Crash%20Course) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Redis%20Crash%20Course)
<!-- LH-BUTTONS:END -->

## What is Redis and Why Use It?
* **Summary**: Redis is an open-source, in-memory data store used by millions of developers to solve issues like repeated database queries and slow response times. It acts as a cache to store frequently accessed data in RAM for faster retrieval, reducing load on the main database and improving app performance.
* **Key Takeaway/Example**: Without Redis, refreshing a page triggers expensive queries across multiple tables, increasing wait times and costs. With Redis, data is cached after the first query, making subsequent requests much faster—like dropping vulnerabilities in Android by switching to Rust.
* **Link for More Details**: [Ask AI: What is Redis](https://alisol.ir/?ai=What%20is%20Redis%7CPiyush%20Garg%7CRedis%20Crash%20Course)

## Redis Architecture and Caching Basics
* **Summary**: In a typical setup, users hit a server that queries a database like PostgreSQL or MongoDB. Redis sits between the server and database as an in-memory cache: on first request, fetch from DB and store in Redis; on subsequent requests, serve from Redis for speed.
* **Key Takeaway/Example**: For computed data like unread message counts, store the result (e.g., "10") in Redis and increment it on new messages, avoiding repeated DB computations. This optimizes reads and reduces unnecessary bills.
* **Link for More Details**: [Ask AI: Redis Architecture](https://alisol.ir/?ai=Redis%20Architecture%7CPiyush%20Garg%7CRedis%20Crash%20Course)

## Installation with Docker
* **Summary**: Install Redis using Docker for easy setup and production-like environment. Use Redis Stack for additional tools like a GUI client. Run a container exposing ports 6379 (Redis server) and 8001 (GUI).
* **Key Takeaway/Example**: Command: `docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest`. Access GUI at localhost:8001 to visualize data, and connect via CLI with `docker exec -it redis-stack redis-cli`.
```bash
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```
* **Link for More Details**: [Ask AI: Redis Installation](https://alisol.ir/?ai=Redis%20Installation%7CPiyush%20Garg%7CRedis%20Crash%20Course)

## Redis CLI and Basic Commands
* **Summary**: Redis runs as a server on port 6379. Use the CLI to interact: ping for connection check, set/get for storing/retrieving values. The GUI helps visualize keys and values but isn't needed in production.
* **Key Takeaway/Example**: Test connection with `PING` (returns "PONG"). Store with `SET name "Piyush"` and retrieve with `GET name`.
```bash
SET name "Piyush"  # Returns OK
GET name  # Returns "Piyush"
```
* **Link for More Details**: [Ask AI: Redis CLI](https://alisol.ir/?ai=Redis%20CLI%7CPiyush%20Garg%7CRedis%20Crash%20Course)

## Data Types: Strings
* **Summary**: Strings are simple key-value pairs for basic data storage. Use SET to store and GET to retrieve.
* **Key Takeaway/Example**: Ideal for caching simple values. Set a key with `SET key value` and fetch with `GET key`.
```bash
SET user:name "Piyush"
GET user:name  # Returns "Piyush"
```
* **Link for More Details**: [Ask AI: Redis Strings](https://alisol.ir/?ai=Redis%20Strings%7CPiyush%20Garg%7CRedis%20Crash%20Course)

## Data Types: Lists
* **Summary**: Lists are ordered collections allowing push/pop from both ends, useful for queues or stacks.
* **Key Takeaway/Example**: Add with `LPUSH` or `RPUSH`, retrieve range with `LRANGE`. Great for task queues.
```bash
LPUSH tasks "task1"
LPUSH tasks "task2"
LRANGE tasks 0 -1  # Returns ["task2", "task1"]
```
* **Link for More Details**: [Ask AI: Redis Lists](https://alisol.ir/?ai=Redis%20Lists%7CPiyush%20Garg%7CRedis%20Crash%20Course)

## Data Types: Sets
* **Summary**: Unordered, unique collections for membership checks and set operations like unions.
* **Key Takeaway/Example**: Add with `SADD`, check members with `SMEMBERS`. Useful for unique tags or friends lists.
```bash
SADD fruits "apple" "banana" "apple"
SMEMBERS fruits  # Returns ["apple", "banana"]
```
* **Link for More Details**: [Ask AI: Redis Sets](https://alisol.ir/?ai=Redis%20Sets%7CPiyush%20Garg%7CRedis%20Crash%20Course)

## Data Types: Sorted Sets
* **Summary**: Like sets but sorted by scores, perfect for leaderboards or priority queues.
* **Key Takeaway/Example**: Add with `ZADD` (value then score), get range with `ZRANGE`. Reverse with `ZREVRANGE`.
```bash
ZADD scores 10 "Piyush" 1 "John" 6 "Jane"
ZRANGE scores 0 -1  # Returns ["John", "Jane", "Piyush"]
```
* **Link for More Details**: [Ask AI: Redis Sorted Sets](https://alisol.ir/?ai=Redis%20Sorted%20Sets%7CPiyush%20Garg%7CRedis%20Crash%20Course)

## Data Types: Streams
* **Summary**: Append-only logs for high-throughput data like events or sensor readings. Supports reading ranges and blocking.
* **Key Takeaway/Example**: Add with `XADD`, read with `XREAD` or `XRANGE`. Ideal for event sourcing or notifications.
```bash
XADD temperature * fahrenheit 72 pressure 1013 humidity 45
XRANGE temperature - +  # Returns entries with timestamps
```
* **Link for More Details**: [Ask AI: Redis Streams](https://alisol.ir/?ai=Redis%20Streams%7CPiyush%20Garg%7CRedis%20Crash%20Course)

## Data Types: Geospatial Data
* **Summary**: Stores latitude/longitude for location-based queries like finding nearby points.
* **Key Takeaway/Example**: Add with `GEOADD` (longitude first), search with `GEOSEARCH`. Useful for apps like food delivery.
```bash
GEOADD hotels 13.361389 38.115556 "Hotel1"
GEOSEARCH hotels FROMLONLAT 15 37 BYRADIUS 5 km WITHDIST
```
* **Link for More Details**: [Ask AI: Redis Geospatial](https://alisol.ir/?ai=Redis%20Geospatial%7CPiyush%20Garg%7CRedis%20Crash%20Course)

## Data Types: Bitmaps and Others
* **Summary**: Bitmaps for efficient bit operations; time series for timestamped data like stock prices. Less common in basic production but useful for specific cases.
* **Key Takeaway/Example**: Set bits with `SETBIT`, get with `GETBIT`. Time series uses separate module for metrics.
```bash
SETBIT planes 1 1  # Sets bit for plane tracking
GETBIT planes 1  # Returns 1
```
* **Link for More Details**: [Ask AI: Redis Bitmaps](https://alisol.ir/?ai=Redis%20Bitmaps%7CPiyush%20Garg%7CRedis%20Crash%20Course)

## Pub/Sub Messaging
* **Summary**: Publish messages to channels and subscribe to receive them, enabling real-time communication.
* **Key Takeaway/Example**: Subscribe with `SUBSCRIBE`, publish with `PUBLISH`. Scales WebSockets in microservices.
```bash
SUBSCRIBE notifications  # In one terminal
PUBLISH notifications "Hello"  # In another, receives message
```
* **Link for More Details**: [Ask AI: Redis Pub Sub](https://alisol.ir/?ai=Redis%20Pub%20Sub%7CPiyush%20Garg%7CRedis%20Crash%20Course)

## Practical Implementation: Caching in Node.js
* **Summary**: Build a Node.js server with Express, cache API responses from a slow endpoint like JSONPlaceholder using Redis client.
* **Key Takeaway/Example**: Check cache first; if miss, fetch, store with expiration, and return. Speeds up from seconds to milliseconds.
```javascript
const redis = require('redis');
const client = redis.createClient();
app.get('/', async (req, res) => {
  const cacheValue = await client.get('todo');
  if (cacheValue) return res.json(JSON.parse(cacheValue));
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  await client.set('todo', JSON.stringify(data), 'EX', 30);
  res.json(data);
});
```
* **Link for More Details**: [Ask AI: Redis Node.js Caching](https://alisol.ir/?ai=Redis%20Node.js%20Caching%7CPiyush%20Garg%7CRedis%20Crash%20Course)

## Real-World Usage
* **Summary**: In production, cache computed values like review counts or star ratings to speed up websites. Invalidate cache on updates for fresh data.
* **Key Takeaway/Example**: For a course site, cache review stats; new reviews trigger cache purge. Boosts load times significantly.
* **Link for More Details**: [Ask AI: Redis Production Usage](https://alisol.ir/?ai=Redis%20Production%20Usage%7CPiyush%20Garg%7CRedis%20Crash%20Course)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
