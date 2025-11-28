# Memcached Architecture - Crash Course with Docker, Telnet

* **Platform**: YouTube
* **Channel/Creator**: Hussein Nasser
* **Duration**: 01:04:52
* **Release Date**: Aug 27, 2022
* **Video Link**: [https://www.youtube.com/watch?v=NCePGsRZFus](https://www.youtube.com/watch?v=NCePGsRZFus)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=005796ea -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Memcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Memcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Memcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Memcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Memcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Memcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Memcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Memcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Memcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Memcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Memcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Memcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Memcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet)
<!-- LH-BUTTONS:END -->

## Introduction to Memcached
Memcached is a straightforward in-memory key-value store, originally written in Perl and later rewritten in C back in 2003. It's gained popularity with big players like Facebook, Netflix, and Wikipedia due to its simplicity. The main goal was to ease the load on databases by caching query results, though fixing slow queries directly is often better than just adding a cache layer. Unlike more feature-rich options like Redis, Memcached keeps things basic—no guarantees on persistence, and it's transient by design.
* **Key Takeaway**: It's not meant for advanced features; simplicity means limits like 250-char keys and 1MB values (configurable but not ideal to push). Values can expire with TTLs, but don't count on them sticking around if memory fills up.
* [Ask AI: Introduction to Memcached](https://alisol.ir/?ai=Introduction%20to%20Memcached%7CHussein%20Nasser%7CMemcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet)

## Memory Management in Memcached
Everything lives in memory to avoid fragmentation issues common in random allocations. Memcached uses slabs (large memory portions) divided into pages (typically 1MB) and further into fixed-size chunks based on slab classes. Items (key-value pairs) fit into the smallest suitable chunk, but if your item is smaller, the rest of the chunk goes unused—leading to some waste but preventing fragmentation.
* **Key Takeaway**: Slab classes determine chunk sizes (e.g., 72 bytes or 1MB), and new pages get allocated as needed. This setup caps values at 1MB by default and ensures efficient memory use, but plan your item sizes to minimize waste.
* [Ask AI: Memory Management in Memcached](https://alisol.ir/?ai=Memory%20Management%20in%20Memcached%7CHussein%20Nasser%7CMemcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet)

## LRU Eviction Mechanism
To handle limited memory, Memcached uses Least Recently Used (LRU) eviction per slab class. Items are tracked in a linked list: accessed ones move to the head, unused ones drift to the tail and get evicted when memory is tight. A crawler daemon handles this. It's a feature for preventing unbounded growth, but it adds overhead like locks and complexity—personally, I'd prefer an option to disable it and manage expirations client-side for even simpler ops.
* **Key Takeaway**: Don't rely on keys persisting, even with TTLs; LRU can kick in anytime. Newer versions split into hot/warm/cold tiers to optimize, but the core linked list setup means access costs for reordering.
* [Ask AI: LRU Eviction Mechanism](https://alisol.ir/?ai=LRU%20Eviction%20Mechanism%7CHussein%20Nasser%7CMemcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet)

## Threading Model
Memcached handles multiple clients via a listener thread on TCP port 11211 (UDP supported but disabled by default for security). It accepts connections and hands them off to worker threads, each managing its own. This scales for high concurrency but can bloat resources if connections explode—there's a 1024-connection limit by default.
* **Key Takeaway**: Avoids single-thread bottlenecks for networking, but aggressive clients on one thread can slow things. No shared connections across threads in the basic model.
* [Ask AI: Threading Model](https://alisol.ir/?ai=Threading%20Model%7CHussein%20Nasser%7CMemcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet)

## Locking Model
Early versions used a global lock, serializing all access even for unrelated items—inefficient for multi-threading. Now it's per-item locking: threads can access different items concurrently, but same-item conflicts serialize. LRU updates still require locks, adding some overhead. Ref counting prevents garbage collection issues during access.
* **Key Takeaway**: Per-item locks improve throughput over global ones, but high contention (e.g., hot keys) can still bottleneck. Keeps things simple without full ACID isolation.
* [Ask AI: Locking Model](https://alisol.ir/?ai=Locking%20Model%7CHussein%20Nasser%7CMemcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet)

## Hash Tables for Storage and Retrieval
Items are stored via hash tables for O(1) lookups: hash the key, mod by table size to get an index pointing to the item's memory location. Collisions chain into buckets, which can slow reads if chains grow long—leading to resizes with consistent hashing to minimize disruption.
* **Key Takeaway**: Resizing shifts items around, so monitor load factors. For reads/writes: hash to find/allocate, then update LRU and pointers to slabs.
* [Ask AI: Hash Tables for Storage and Retrieval](https://alisol.ir/?ai=Hash%20Tables%20for%20Storage%20and%20Retrieval%7CHussein%20Nasser%7CMemcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet)

## Distributed Caching
Memcached isn't inherently distributed—servers don't communicate or know about each other. Clients handle distribution via consistent hashing, routing keys to specific servers. Adding/removing servers requires client awareness, but no automatic data migration since it's transient.
* **Key Takeaway**: Keeps servers simple and isolated; client libraries (e.g., Node.js) do the heavy lifting. Avoid sharding unless at massive scale—prefer single instances or replicas first.
* [Ask AI: Distributed Caching](https://alisol.ir/?ai=Distributed%20Caching%7CHussein%20Nasser%7CMemcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet)

## Demo with Docker, Telnet, and Node.js
Spin up Memcached instances via Docker (e.g., `docker run -d -p 11211:11211 memcached`), connect with Telnet for commands like `set`, `get`, `stats slabs` to inspect memory/chunks. Use Node.js with the memcached library to connect to a server pool, set/read keys—demonstrates client-side distribution across multiple containers.
* **Key Takeaway/Example**: For Node.js setup:
  ```javascript
  const Memcached = require('memcached');
  const serverPool = new Memcached(['host:11211', 'host:11212']);
  serverPool.set('foo', 'bar', 3600, (err) => { if (err) console.error(err); });
  serverPool.get('foo', (err, data) => { console.log(data); });
  ```
  Stats show active slabs, chunks used—great for verifying architecture in action. No built-in security, so add TLS/SASL in production.
* [Ask AI: Demo with Docker, Telnet, and Node.js](https://alisol.ir/?ai=Demo%20with%20Docker%2C%20Telnet%2C%20and%20Node.js%7CHussein%20Nasser%7CMemcached%20Architecture%20-%20Crash%20Course%20with%20Docker%2C%20Telnet)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
