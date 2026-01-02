# Improving RAG Systems with Hybrid Search and Re-ranking with LanceDB

- **Platform**: YouTube
- **Channel/Creator**: Jason Liu
- **Duration**: 00:15:17
- **Release Date**: Nov 25, 2024
- **Video Link**: [https://www.youtube.com/watch?v=aJ4xVx1zkaY](https://www.youtube.com/watch?v=aJ4xVx1zkaY)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Improving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Improving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Improving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Improving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Improving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Improving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Improving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Improving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Improving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Improving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Improving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Improving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Improving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Improving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/Improving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Improving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Improving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB)
<!-- LH-BUTTONS:END -->

## The Demo-to-Production Gap in RAG
Building RAG applications is easy for demos (often hitting 50-60% retrieval accuracy with basic vector search), but reaching production-grade quality (90%+) requires continuous iteration.  
There's no single magic jump to perfection — treat your RAG system as a composable, self-improving loop with tunable components (chunking, retrieval, embeddings, storage) and feedback from evals + user signals.

[Ask AI: RAG demo to production gap](https://alisol.ir/?ai=RAG%20demo%20to%20production%20gap%7CJason%20Liu%7CImproving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB)

## Start with BM25 as Your Strong Baseline
Surprisingly, **BM25** (full-text search) often outperforms basic vector search as a starting baseline across many tasks and datasets.  
It's extremely cheap to implement and has been the gold standard for text search since the mid-90s — it still hasn't been reliably beaten for pure keyword-based retrieval.

BM25 scores documents using two main signals:
- **Term Frequency** — how often the query terms appear
- **IDF** (Inverse Document Frequency) — rarity of terms across the corpus (rare terms boost score heavily)

This makes it excellent for exact/syntactic matches.

[Ask AI: Why BM25 is a strong baseline](https://alisol.ir/?ai=Why%20BM25%20is%20a%20strong%20baseline%7CJason%20Liu%7CImproving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB)

## Vector Search vs BM25 — Complementary Strengths
BM25 excels at keyword precision but completely misses semantic similarity (searching "person" won't match "customer" or "user").

Vector search shines here: it captures meaning and synonyms, and it provides more consistent query latency (dense vectors behave predictably, unlike sparse BM25).

**Key insight**: They're not competitors — they're highly complementary. Best results come from combining both.

[Ask AI: Vector search vs BM25](https://alisol.ir/?ai=Vector%20search%20vs%20BM25%7CJason%20Liu%7CImproving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB)

## Combining Results with Hybrid Search
When using multiple retrievers (BM25 + vector), you get separate ranked result lists. Hybrid search merges them effectively.

### Reciprocal Rank Fusion (RRF)
Super simple & fast — no extra models needed.  
It uses this formula:

Score = Σ (1 / (k + rankᵢ))

(k is usually 60).  
It rewards documents that rank highly across multiple retrievers — no need to compare raw similarity scores.

### Model-based Reranking
For maximum quality, take the top candidates (e.g., 30 docs from multiple retrievers) and rerank them with a specialized model:
- Open-source cross-encoders (e.g., BGE-reranker)
- Commercial APIs (Cohere, Google)
- Even prompted LLMs (e.g., GPT as reranker)

This step is expensive but applied to a tiny subset, so it's efficient.

Real results (SQuAD & other datasets) show hybrid + Cohere reranking boosting hit rate by ~10-11 points over plain vector search.

[Ask AI: Reciprocal Rank Fusion](https://alisol.ir/?ai=Reciprocal%20Rank%20Fusion%7CJason%20Liu%7CImproving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB)

[Ask AI: Model-based reranking](https://alisol.ir/?ai=Model-based%20reranking%7CJason%20Liu%7CImproving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB)

## Using Hybrid Search & Reranking in LanceDB
LanceDB makes this practical with a clean API:

```python
# Example snippet
table.search(query, query_type="hybrid") \
     .rerank(ranker="cohere")  # or other supported rankers
```

Just set `hybrid` mode and attach your preferred reranker.

[Ask AI: Hybrid search implementation in LanceDB](https://alisol.ir/?ai=Hybrid%20search%20implementation%20in%20LanceDB%7CJason%20Liu%7CImproving%20RAG%20Systems%20with%20Hybrid%20Search%20and%20Re-ranking%20with%20LanceDB)

---

**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:  
- Website: [alisol.ir](https://alisol.ir)  
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
