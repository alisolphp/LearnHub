# **System Design Mock Interview: Design Content Delivery Network | CDN**

- **Channel/Interviewer:** Gaurav Sen
- **Duration:** 00:11:01
- **Original Video:** `https://www.youtube.com/watch?v=8zX0rue2Hic`

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.*

---

## 2) One-Page Executive Summary (2–3 min skim)

- **Problem Prompt (One-liner):** How to serve static content (e.g., HTML pages) quickly and efficiently to users across countries by using caching and a content delivery network (CDN).
- **Primary Scope:** Static content delivery, geo-distributed caching, and reducing latency. Out of scope: dynamic data writes and database design beyond using origin as the single source of truth.
- **Non-Functional Priorities:** Low latency via proximity caches; availability by avoiding single points of failure; cost efficiency through shared infrastructure; simplicity of invalidation via provider tools.
- **Key Constraints & Numbers:** Regions mentioned: India, USA, Netherlands/Europe; device-aware variants of pages; rough combinatorics example (device × country) kept “manageable” for caching. (No concrete QPS/latency targets stated.)
- **High-Level Architecture (Text):**
  - Clients (mobile/desktop) request pages.
  - Requests for static assets first hit a global/edge cache layer (CDN).
  - Cache serves hits; cache misses go to origin server.
  - Origin server accesses the database (system-of-record) for dynamic data; CDN holds copies only (not the source of truth).
  - Caches are geographically distributed and possibly sharded by location.
  - Provider UI/controls manage TTLs and invalidations.
- **Top Trade-offs:**
  - **Latency vs. Consistency:** Edge speed vs. ensuring updated content; solved via TTL/invalidation.
  - **Build vs. Buy:** Roll your own distributed caches vs. using a CDN provider with global footprint and compliance.
  - **Coverage vs. Cost:** More PoPs/regions reduce latency but raise spend/complexity. (Implied by multiple regional caches.)
- **Biggest Risks/Failure Modes:**
  - Single cache node as a bottleneck or SPOF → fix with distribution/sharding.
  - Incorrect cache invalidation leading to stale content.
  - Users far from origin still suffering high latency if caches aren’t close.
- **5-Min Review Flashcards:**
  1. **Q:** Why a CDN? **A:** Reduce latency by serving static content from nearby caches.
  2. **Q:** What stays in origin? **A:** The “single source of truth” (dynamic data).
  3. **Q:** How avoid SPOF in caching? **A:** Use distributed/sharded caches.
  4. **Q:** What if content changes? **A:** Invalidate/version and push new assets; use TTLs.
  5. **Q:** Do devices get different pages? **A:** Yes—device/location customized variants can be cached.
  6. **Q:** Who provides the infra/UI? **A:** CDN providers (example named: Akamai).
  7. **Q:** Is S3 called out? **A:** S3 is mentioned as used for hosting files. [Personal note: For CDN features like global edge caching and advanced invalidations, pair object storage (e.g., S3) with a CDN (e.g., CloudFront or equivalent); storage alone isn’t a CDN.]

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN)

---

## 3) Interview Tags (for later filtering)

- **Domain/Industry:** `ecommerce`
- **Product Pattern:** `cdn, caching, object-storage`
- **System Concerns:** `low-latency, geo-replication, high-availability, gdpr` *(compliance noted in spirit via “country regulations”)*
- **Infra/Tech (mentioned):** `cdn, edge, s3`
  - *[Personal note: Consider a CDN layer in front of S3 for true edge delivery and cache controls.]*

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN)

---

## 4) Problem Understanding

- **Original Prompt (paraphrase):** Serve static HTML pages to users in India, USA, and Netherlands with minimal latency, handling device/location variants, while treating origin as the source of truth.
- **Use Cases:**
  - Deliver desktop/mobile variants of pages.
  - Regionalized content (e.g., per-country/state variants).
- **Out of Scope:** Database schema design; dynamic write paths; full application logic. (Implied—focus is on static delivery.)
- **APIs:** Not stated in video.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN)

---

## 5) Requirements & Constraints

**Given in Video**
- **Functional:**
  - Cache and serve static pages near users; route dynamic data to origin.
  - Support device/location-specific variants.
- **Non-Functional:**
  - **Latency:** Lower latency via geo-near caches.
  - **Availability:** Avoid single cache bottlenecks/points of failure.
  - **Operability:** TTL + invalidation via provider UI.
  - **Compliance:** Provider handles regional regulations.

**Assumptions (conservative)**
- Static assets include HTML/CSS/JS/images; dynamic data remains behind app servers. (Assumption consistent with transcript framing.)
- DNS-based geo-routing to nearest PoP. (Assumption—typical CDN behavior; not stated verbatim.)

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN)

---

## 6) Back-of-the-Envelope Estimation

*Not stated in video—skipping numerical estimation.*

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN)

---

## 7) High-Level Architecture

- **Clients:** Desktop and mobile.
- **Edge/CDN Layer:** Geo-distributed caches; requests for static content terminate here when possible.
- **Origin/App Server:** Serves cache misses and all dynamic content; authoritative source of truth.
- **Database:** Stores dynamic/user/session data.
- **Control Plane:** TTLs, invalidations via provider UI (e.g., Akamai-like controls).
- **Sharding by Region/Location:** Traffic segmented to appropriate regional caches.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN)

---

## 8) Deep Dives by Subsystem

### 8.1 CDN / Edge Cache

- **Role & Responsibilities:** Serve static content from nearest cache; reduce round-trips to origin.
- **Data Model:** Cached objects are replicas, not authoritative; origin remains source of truth.
- **Scaling & Partitioning:** Horizontally distribute caches; shard by geography/users.
- **Caching Strategy:** TTL-based expiry; invalidation/versioning when pages change.
  - *[Personal note: Prefer cache headers (Cache-Control/ETag) with versioned asset URLs to make invalidations safer and predictable.]*
- **Failure Handling:** Avoid SPOF by multiple cache nodes/regions; fall back to origin on misses/errors.
- **Cost Considerations:** CDN providers offer shared infra and UI; cheaper than building global caches in-house (implied).

[Ask AI: Subsystem - CDN](https://alisol.ir/?ai=Subsystem%20-%20CDN%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN)

---

## 9) Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
| --- | --- | --- | --- | --- |
| Edge Delivery | Build your own distributed caches | Use a CDN provider | CDN provider | Global presence, TTL UI, compliance, easier ops.  |
| Content Updates | Long TTLs, risk of staleness | Short TTLs + explicit invalidation | TTL + invalidation | Balance freshness and latency.  |
| Origin Location | Single US origin | Regional origins/PoPs | Edge caches near users | Keep origin authoritative; use edge for speed.  |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN)

---

## 10) Reliability, Availability, and Performance

- **Replication/Consistency:** CDN stores replicas; origin is the single source of truth.
- **Latency:** Reduced via geo-near caches; users in India/US/Netherlands get served locally/regionally.
- **Degradation Path:** On invalidation/expiry or cache miss, fetch from origin.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN)

---

## 11) Security & Privacy

Not stated in video.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN)

---

## 12) Observability

Not stated in video.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN)

---

## 13) Follow-up Questions (from interviewer)

Not stated in video.

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN)

---

## 14) Candidate Questions

Not stated in video.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN)

---

## 15) Key Takeaways

- Push static content to the edge; keep origin authoritative for dynamic data.
- Avoid single cache bottlenecks; distribute and shard geographically.
- Use provider UI for TTLs/invalidation to simplify ops.
- Device/location-specific variants can still be cached effectively.
- Storage like S3 is useful for hosting, but real CDN capabilities are delivered by edge networks. *[Personal note: Pair storage with a CDN layer for global edge caching and controls.]*

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN)

---

## 16) Glossary

- **CDN (Content Delivery Network):** A distributed cache layer that serves static content from locations near users.
- **TTL (Time To Live):** How long an item stays cached before expiring.
- **Origin:** The authoritative server hosting the canonical content/data.
- **PoP (Point of Presence):** A cache location serving a geographic area. *(Concept implied via regional caches.)*

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN)

---

## 17) Study Plan from This Interview (Optional)

- Practice explaining origin vs. edge responsibilities and how invalidation works.
- Sketch diagrams for multi-region cache sharding and failover paths.

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN)

---

## 18) Attribution

- **Source Video:** `https://www.youtube.com/watch?v=8zX0rue2Hic`
- **Channel:** Gaurav Sen
- **Note:** This document is a summary of the linked mock interview.

---

## 19) About the summarizer

I'm *Ali Sol*, a PHP Developer. Learn more:

- Website: [alisol.ir](https://www.alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
