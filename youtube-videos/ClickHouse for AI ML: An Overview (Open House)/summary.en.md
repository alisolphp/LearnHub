# ClickHouse for AI/ML: An Overview (Open House)

* **Platform**: YouTube
* **Channel/Creator**: ClickHouse
* **Duration**: 00:32:50
* **Release Date**: Jun 11, 2025
* **Video Link**: [https://www.youtube.com/watch?v=GfvZHSdJ4CU](https://www.youtube.com/watch?v=GfvZHSdJ4CU)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=47fdb3b8 -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/ClickHouse%20for%20AI%20ML%3A%20An%20Overview%20(Open%20House)) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/ClickHouse%20for%20AI%20ML%3A%20An%20Overview%20(Open%20House)) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/ClickHouse%20for%20AI%20ML%3A%20An%20Overview%20(Open%20House)) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/ClickHouse%20for%20AI%20ML%3A%20An%20Overview%20(Open%20House)) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/ClickHouse%20for%20AI%20ML%3A%20An%20Overview%20(Open%20House)) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/ClickHouse%20for%20AI%20ML%3A%20An%20Overview%20(Open%20House)) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/ClickHouse%20for%20AI%20ML%3A%20An%20Overview%20(Open%20House)) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/ClickHouse%20for%20AI%20ML%3A%20An%20Overview%20(Open%20House)) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/ClickHouse%20for%20AI%20ML%3A%20An%20Overview%20(Open%20House)) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/ClickHouse%20for%20AI%20ML%3A%20An%20Overview%20(Open%20House)) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/ClickHouse%20for%20AI%20ML%3A%20An%20Overview%20(Open%20House)) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/ClickHouse%20for%20AI%20ML%3A%20An%20Overview%20(Open%20House))

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/ClickHouse%20for%20AI%20ML%3A%20An%20Overview%20(Open%20House)) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/ClickHouse%20for%20AI%20ML%3A%20An%20Overview%20(Open%20House)) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/ClickHouse%20for%20AI%20ML%3A%20An%20Overview%20(Open%20House))
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/ClickHouse%20for%20AI%20ML%3A%20An%20Overview%20(Open%20House))
<!-- LH-BUTTONS:END -->

## Introduction to AI Creativity and Data's Role
* **Summary**: The talk kicks off with an AI-generated song from Suno to highlight how AI can creatively produce content, turning hallucinations into a feature for music generation. It emphasizes that while models are accessible via papers and blogs, the true edge in AI comes from the quality and volume of training data, like all human-produced music for Suno or vast text for language models.
* **Key Takeaway/Example**: Data differentiates AI performance—models trained on massive, high-quality datasets outperform others. For instance, Anthropic feeds models with premium data assets.
* **Link for More Details**: [Ask AI: AI Creativity and Data Role](https://alisol.ir/?ai=AI%20Creativity%20and%20Data%20Role%7CClickHouse%7CClickHouse%20for%20AI%2FML%3A%20An%20Overview%20%28Open%20House%29)

## Data Sources for Building AI Models
* **Summary**: AI is built from enormous datasets scraped from the internet, including Common Crawl (2.5 billion web pages, half a petabyte uncompressed), Wikipedia, Reddit, GitHub code, and pre-processed sets like FineWeb or The Pile, which filter and deduplicate data for LLM pre-training.
* **Key Takeaway/Example**: Choose datasets based on desired model traits—Wikipedia for clear but dry content, Reddit for unconventional styles. Common Crawl offers monthly snapshots at 100TB compressed.
* **Link for More Details**: [Ask AI: Data Sources for AI Models](https://alisol.ir/?ai=Data%20Sources%20for%20AI%20Models%7CClickHouse%7CClickHouse%20for%20AI%2FML%3A%20An%20Overview%20%28Open%20House%29)

## Loading Large Datasets into ClickHouse
* **Summary**: To explore datasets, load them into ClickHouse using Hugging Face's Parquet files via URL table functions. For FineWeb (26,000 files, 46TB), schema inference creates tables automatically, and parallel inserts (50 processes) load 81TB uncompressed in about an hour on ClickHouse Cloud, compressing to 33TB.
* **Key Takeaway/Example**: ClickHouse outperforms Parquet in compression. Example query for file list:
  ```sql
  SELECT * FROM url('https://huggingface.co/api/datasets/...', 'JSONEachRow')
  ```
  It handles foundational datasets representing all human knowledge efficiently.
* **Link for More Details**: [Ask AI: Loading Datasets into ClickHouse](https://alisol.ir/?ai=Loading%20Datasets%20into%20ClickHouse%7CClickHouse%7CClickHouse%20for%20AI%2FML%3A%20An%20Overview%20%28Open%20House%29)

## Exploring and Querying Datasets in ClickHouse
* **Summary**: Once loaded, run fast queries (250GB/s) to analyze domains—Wikipedia tops the list, followed by news sites like The Guardian. Load multiple datasets like Wikipedia (seconds), arXiv, Reddit, Twitter, and GitHub (310TB for all repos) into a single ClickHouse Cloud service.
* **Key Takeaway/Example**: All these fit in one scalable service, enabling quick insights. Query example for domains:
  ```sql
  SELECT domain, count() FROM fine_web GROUP BY domain ORDER BY count() DESC
  ```
* **Link for More Details**: [Ask AI: Exploring Datasets in ClickHouse](https://alisol.ir/?ai=Exploring%20Datasets%20in%20ClickHouse%7CClickHouse%7CClickHouse%20for%20AI%2FML%3A%20An%20Overview%20%28Open%20House%29)

## Comparing Dataset Styles and Fingerprints
* **Summary**: Extract tokens and n-grams using functions like `tokens()` and `arrayShingles()` to compare styles. Blue Sky emphasizes emotional words (she, love, fun), while Hacker News focuses on tech (data, system). Wikipedia avoids "you," and Reddit has casual terms.
* **Key Takeaway/Example**: Style fingerprints via 1,024-dimensional vectors and cosine distance reveal similar domains to ClickHouse, like Red Panda or Confluent. Query for contrasting tokens:
  ```sql
  SELECT token, ratio_blue_sky, ratio_hacker_news FROM ...
  ```
* **Link for More Details**: [Ask AI: Comparing Dataset Styles](https://alisol.ir/?ai=Comparing%20Dataset%20Styles%7CClickHouse%7CClickHouse%20for%20AI%2FML%3A%20An%20Overview%20%28Open%20House%29)

## Analyzing Trends and Visualizing Data
* **Summary**: Track word trends over time—"love" remains strong, "ClickHouse" grows, "Hadoop" declines, "blockchain" stabilizes post-2018. For Flickr's billion photos, load and visualize geotagged images in real-time, showing popular or beautiful photos by location.
* **Key Takeaway/Example**: ClickHouse enables real-time reports and visualizations, making large datasets interactive and faster than the internet itself.
* **Link for More Details**: [Ask AI: Analyzing Trends and Visualizations](https://alisol.ir/?ai=Analyzing%20Trends%20and%20Visualizations%7CClickHouse%7CClickHouse%20for%20AI%2FML%3A%20An%20Overview%20%28Open%20House%29)

## ClickHouse in AI/ML Pipelines
* **Summary**: ClickHouse supports AI/ML at various stages: local exploration with ClickHouse Local or CHDB in Python notebooks, feature stores for training, vector storage for semantic search, and UDFs for extending SQL to external APIs/models. New HNSW similarity index with quantization (BF16, Int8) boosts vector efficiency.
* **Key Takeaway/Example**: Use for data prep, feature engineering, training/inference. Prominent users leverage it as an online/offline feature store.
* **Link for More Details**: [Ask AI: ClickHouse in AI/ML Pipelines](https://alisol.ir/?ai=ClickHouse%20in%20AI%2FML%20Pipelines%7CClickHouse%7CClickHouse%20for%20AI%2FML%3A%20An%20Overview%20%28Open%20House%29)

## Agentic Workloads and Database Interactivity
* **Summary**: Traditional SQL suits experts, but agents enable natural language queries, triggering 10-100 queries per prompt via reasoning models. ClickHouse's speed (low latency, high throughput) makes it ideal for interactive agentic flows, unlike slower databases.
* **Key Takeaway/Example**: Dwayne agent at ClickHouse averages 15 queries per prompt; one day used 15M tokens (20-40 novels). High performance supports concurrent users and autonomous agents.
* **Link for More Details**: [Ask AI: Agentic Workloads](https://alisol.ir/?ai=Agentic%20Workloads%7CClickHouse%7CClickHouse%20for%20AI%2FML%3A%20An%20Overview%20%28Open%20House%29)

## New Agent Experience in ClickHouse Cloud
* **Summary**: Prototyping an in-console agent reduces time to insight by auto-discovering tables/schemas and answering prompts quickly. Demos include flight route delays, airline performance analysis, and correlating YouTube/Reddit data (regex extraction over billions of rows in 30 minutes).
* **Key Takeaway/Example**: Condenses days of analysis into seconds; handles errors via self-correction. Coming soon to ClickHouse instances.
* **Link for More Details**: [Ask AI: New Agent Experience](https://alisol.ir/?ai=New%20Agent%20Experience%7CClickHouse%7CClickHouse%20for%20AI%2FML%3A%20An%20Overview%20%28Open%20House%29)

## Model Context Protocol (MCP) Integration
* **Summary**: MCP extends LLMs to third-party data sources. ClickHouse announces a remote MCP server for Cloud services, enabling developers to query data via clients like Cursor without SQL expertise—e.g., adding investment insights to a React app.
* **Key Takeaway/Example**: Expands access beyond database pros to developers and anyone via chatbots. Supports multilingual queries; in private preview at clickhouse.ai.
* **Link for More Details**: [Ask AI: MCP Integration](https://alisol.ir/?ai=MCP%20Integration%7CClickHouse%7CClickHouse%20for%20AI%2FML%3A%20An%20Overview%20%28Open%20House%29)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
