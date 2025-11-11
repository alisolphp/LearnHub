# System Design Mock Interview: Design Google Search — How Google searches one document among billions quickly
* **Channel/Interviewer**: Tech Dummies - Narendra Lakshmana Gowda  
* **Duration**: 00:41:31  
* **Original Video**: https://www.youtube.com/watch?v=CeGtqouT8eA  

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.*

---

## One-Page Executive Summary (2–3 min skim)

**Problem Prompt (One-liner)**: Why and how do web-scale search engines (e.g., Google) return relevant pages from billions of documents in milliseconds, while your laptop often takes seconds to find a local file?

**Primary Scope**
- In-scope: Core concepts behind search engines—crawling, indexing, querying; inverted indexes; preprocessing (stop words, stemming/lemmatization); ranking at a high level; prefix/suffix/wildcard search strategies.
- Out-of-scope: Exact Google internals, PageRank math, distributed storage internals, hardware specs, full ranking pipelines.

**Non-Functional Priorities (from video)**
- Low latency (millisecond-level lookups).
- High throughput (handle many concurrent queries).
- Scalability (billions of pages).
- Near real-time indexing (freshness).

**Key Constraints & Numbers**  
Not stated in video.

**High-Level Architecture (Text)**
- Distributed crawlers fetch pages and store raw content.  
- Indexing pipeline cleans and tokenizes text, removes stop words, stems/lemmatizes tokens, and builds an **inverted index** (term → [docIDs, frequencies, positions]).  
  [Personal note: Aggressive stop-word removal can hurt phrase queries; modern analyzers often keep or downweight stop words rather than drop them entirely.]  
  [Personal note: Stemming is simplistic; lemmatization or language-specific analyzers usually preserve meaning better in 2025.]  
- Metadata and postings lists persisted in storage (with compressed structures for space).  
- Query engine parses queries (single-term, multi-term, conjunctive/disjunctive, phrase), intersects/merges postings, and ranks results.  
- Optional features: prefix/suffix/wildcard search via sorted term dictionaries or specialized structures.

**Top Trade-offs**
- Precision vs. recall (conjunctive AND vs. disjunctive OR).
- Space vs. speed (richer positional data and frequencies vs. smaller bitmaps).  
- Preprocessing aggressiveness (stemming/stop-words) vs. semantic fidelity.

**Biggest Risks/Failure Modes**
- Hot terms causing large postings scans.
- Index bloat from storing positions/frequencies for every term.
- Poor tokenizer choices hurting relevance.
- Wildcard queries leading to expensive scans if not carefully supported.

**5-Min Review Flashcards**
- Q: What’s the core data structure powering fast text search?  
  A: The inverted index (term → documents, with optional frequency/positions).
- Q: Why store positions?  
  A: To support phrase/proximity queries and better ranking.
- Q: AND vs. OR queries—what’s the difference?  
  A: AND (conjunctive) intersects postings; OR (disjunctive) unions postings.
- Q: Why preprocess text (stop words, stemming)?  
  A: Reduce noise and vocabulary size for faster, more relevant search.  
  [Personal note: Prefer lemmatization or modern analyzers; dropping stop words entirely can degrade phrases/snippets.]
- Q: How to support prefix search efficiently?  
  A: Maintain a sorted term dictionary and binary search ranges (or tries/k-gram indexes).  
  [Personal note: Leading-wildcard (“*term”) is still expensive; consider specialized indexes or n-grams.]
- Q: Why laptop search feels slow vs. Google?  
  A: Lack of robust indexing and metadata on the client; web search hits prebuilt distributed indexes.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly)

---

## Interview Tags (for later filtering)

**Domain/Industry**: `search`  
**Product Pattern**: `search-index`  
**System Concerns**: `low-latency`, `high-availability`, `scalability`  
**Infra/Tech (mentioned)**: `elasticsearch`, `solr`, `lucene`  
[Personal note: All three remain widely used; managed alternatives exist if ops burden is a concern.]

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly)

---

## Problem Understanding

**Original Prompt (paraphrased)**: Build a search system that retrieves documents containing user-provided words/phrases with very low latency and high throughput, at massive scale.

**Use Cases**
- Single word lookup (“quick”).  
- Multi-keyword query (AND/OR).  
- Phrase/proximity search (“quick brown fox”).  
- Prefix/suffix/wildcard queries (“jum*”, “*lazy*”).

**Out of Scope**  
Exact ranking algorithms (e.g., PageRank math), ad systems, UI, internationalization details.

**APIs**  
Not stated in video.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly)

---

## Requirements & Constraints

**Given in Video**
- Functional: Crawl documents; preprocess text; build/search an inverted index; support AND/OR; phrase search via positions; prefix/wildcard variants.  
- Non-Functional: Low-latency queries; high throughput; scalable storage of indexes; near real-time indexing pipeline.

**Assumptions**
- Query traffic and data sizes are large enough that compression and careful data-structure choices matter. *(Assumption)*

[Ask AI: Requirements and Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly)

---

## Back-of-the-Envelope Estimation

Not stated in video—skipping numerical estimation.

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly)

---

## High-Level Architecture

- **Crawlers**: Distributed fetchers that follow links to collect pages and store raw content.  
- **Indexing Pipeline**:  
  - Noise removal (HTML tags, URLs, etc.), stop-word handling, case folding, tokenization.  
    [Personal note: Instead of dropping stop words entirely, modern analyzers often keep them for phrase/proximity relevance.]  
  - Stemming/lemmatization to normalize word forms.  
    [Personal note: Prefer lemmatization or lighter stemming for better relevance in 2025.]  
  - Build inverted index: for each term, store docIDs, term frequencies, and **positions** for phrase queries.  
  - Optional compression for postings.  
    [Personal note: Use compressed postings/bitmaps to reduce memory and IO at scale.]  
- **Storage**: Persistent store for term dictionary and postings lists (plus metadata).  
- **Query Engine**: Parses query; resolves terms; executes **AND/OR** set operations; evaluates phrases via positional checking; returns ranked results.  
- **Admin & Refresh**: Periodic/streaming re-index to keep data fresh.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly)

---

## Deep Dives by Subsystem

### 8.1 Subsystem: Crawling
- **Role & Responsibilities**: Fetch pages from the web using distributed workers, follow links, and persist raw content for indexing.  
- **Data Model**: Not detailed beyond storing fetched pages.  
- **APIs/Contracts**: Not stated in video.  
- **Scaling & Partitioning**: Distributed by URL frontier/shards (implied).  
- **Caching/Consistency**: Not stated in video.  
- **Bottlenecks & Mitigations**: Politeness, rate limits, duplicates (implied concerns).  
- **Failure Handling**: Retries implied; details not discussed.  
- **Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Crawling](https://alisol.ir/?ai=Subsystem%20-%20Crawling%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly)

### 8.2 Subsystem: Indexing
- **Role & Responsibilities**: Clean and normalize text; build the term dictionary and postings with frequencies and positions.  
- **Data Model**:  
  - **Dictionary**: Sorted list or searchable map of unique terms.  
  - **Postings**: For each term → list of (docID, freq, [positions…]).  
- **APIs/Contracts**: Not stated in video.  
- **Scaling & Partitioning**: By term ranges or hash; merge segments as needed (implied).  
- **Caching Strategy**: Hot term dictionaries cached; details not stated.  
- **Consistency Model**: Eventual across segments (implied).  
- **Bottlenecks & Hot Keys**: Very frequent terms (e.g., “the”) produce long postings; handled via preprocessing/weighting.  
- **Failure Handling**: Segment rebuild/merge retries (implied).  
- **Cost Considerations**: Store compressed postings to reduce disk and RAM.  
[Personal note: Many large-scale indexes use log-structured designs to favor write/merge throughput in 2025.]

[Ask AI: Subsystem - Indexing](https://alisol.ir/?ai=Subsystem%20-%20Indexing%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly)

### 8.3 Subsystem: Query Processing
- **Role & Responsibilities**: Interpret query; fetch postings; execute set operations; evaluate phrase/proximity; assemble results.  
- **Query Types**:
  - **Single-term**: O(1) dictionary lookup → postings list.  
  - **Conjunctive (AND)**: Intersect postings of all terms to return docs containing every term.  
  - **Disjunctive (OR)**: Union postings to broaden recall.  
  - **Phrase**: Verify adjacent positions across terms (e.g., 2,3,4).  
  - **Prefix/Suffix/Wildcard**: Use sorted dictionary + binary search or additional structures (tries/k-grams).  
  [Personal note: Leading-wildcard and mid-word wildcards are still costly; consider specialized indexes or n-gram approaches.]

[Ask AI: Subsystem - Query Processing](https://alisol.ir/?ai=Subsystem%20-%20Query%20Processing%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly)

---

## Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
| --- | --- | --- | --- | --- |
| Stop words | Remove common words | Keep/weight lightly | Remove | Reduce noise and index size.  |
| Normalization | Stemming | Lemmatization | Both mentioned | Normalize variants to a root for better matches.  [Personal note: Prefer lemmatization/light stemming for better relevance in 2025.] |
| Postings storage | Simple bitsets | Postings with (docID, freq, positions) | Rich postings | Support phrase/proximity queries and ranking signals.  |
| Multi-term queries | Conjunctive (AND) | Disjunctive (OR) | Both | AND for precision; OR for recall. |
| Prefix search | Sorted term dict + binary search | Trie/k-gram index | Sorted dict | Keep keys sorted to enable efficient range lookups.  |
| Index lookup | B-tree/dictionary | Hash map | Both | Fast term→postings resolution.  [Personal note: Many modern engines favor LSM-style index segments for write throughput and compaction.] |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly)

---

## Reliability, Availability, and Performance

Not stated in video (beyond goals of low latency and high throughput).

[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly)

---

## Security & Privacy

Not stated in video.

[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly)

---

## Observability

Not stated in video.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly)

---

## Follow-up Questions (from interviewer)

Not stated in video.

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly)

---

## Candidate Questions (modeled)

Not stated in video.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly)

---

## Key Takeaways

- Inverted index is the heart of fast search.  
- Positions inside postings enable phrase/proximity queries.  
- Conjunctive vs. disjunctive queries balance precision and recall.  
- Preprocessing (stop words, stemming/lemmatization) shrinks vocabulary and improves matches—used judiciously.  
  [Personal note: Favor lemmatization or language-aware analyzers; dropping stop words entirely can backfire on phrase queries.]  
- Sorted dictionaries support efficient prefix lookups; wildcards need special care.  
- Space/time trade-offs drive choices in postings storage and compression.  
- Lucene/Solr/Elasticsearch implement these ideas in production-grade systems.  
  [Personal note: Managed/hosted search stacks can reduce ops complexity without changing core concepts.]

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly)

---

## Glossary (terms used in the video)

- **Inverted Index**: Mapping from terms to the documents in which they appear (with frequency/positions).  
- **Postings List**: The list of (docID, term frequency, positions) for a term.  
- **Stop Words**: Very common words often filtered or downweighted (e.g., “the”).  
- **Stemming**: Heuristic removal of suffixes to reach a root form (may not be a real word).  
- **Lemmatization**: Normalize to dictionary form using linguistic knowledge.  
- **Conjunctive Query (AND)**: Return documents containing all query terms.  
- **Disjunctive Query (OR)**: Return documents containing any query term.  
- **Phrase Query**: Match terms occurring adjacently in order.  
- **Prefix/Wildcard Search**: Match terms by prefixes or patterns using specialized dictionary lookups.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly)

---

## Attribution
- **Source Video**: https://www.youtube.com/watch?v=CeGtqouT8eA  
- **Channel**: Tech Dummies - Narendra Lakshmana Gowda  
- *(Provided title: "Design Google Search | How Google searches one document among Billions of documents quickly")*

---

## About the summarizer
I'm *Ali Sol*, a PHP Developer. Learn more:  
- Website: [alisol.ir](https://www.alisol.ir)  
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

