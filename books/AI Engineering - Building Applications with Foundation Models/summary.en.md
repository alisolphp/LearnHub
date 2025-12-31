# Book Summary: AI Engineering - Building Applications with Foundation Models
* **Author**: Chip Huyen
* **Genre**: AI Engineering
* **Publication Date**: 2024
* **Book Link**: https://www.amazon.com/dp/1098166302

This document summarizes the key lessons and insights extracted from the book.
I highly recommend reading the original book for the full depth and author's perspective.

## Before You Get Started
* I summarize key points from useful books to learn and review quickly.
* Simply click on `Ask AI` links after each section to dive deeper.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=books/AI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=books/AI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=books/AI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=books/AI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=books/AI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=books/AI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=books/AI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=books/AI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=books/AI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=books/AI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=books/AI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=books/AI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=books/AI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=books/AI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=books/AI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=books/AI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=books/AI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models)
<!-- LH-BUTTONS:END -->

## Introduction to Building AI Applications with Foundation Models

**Summary**: The book kicks off by explaining how the massive scale of modern AI models has sparked a boom in applications, making it easier for anyone to build useful tools without starting from scratch. It traces the evolution from early language models in the 1950s to today's large language models (LLMs) and foundation models, which handle text, images, and more through self-supervision on huge datasets. You'll get a sense of what these models excel at—like coding assistance, writing, conversational bots, data organization, education, image/video production, and workflow automation—while acknowledging limitations like hallucinations or inconsistency. The chapter also contrasts AI engineering with traditional ML engineering, highlighting the new stack: infrastructure for models, interfaces for prompts and evaluation, and app development on top.

**Example**: Imagine foundation models as a powerful engine you can plug into your car—instead of building the whole vehicle, you focus on the drive, making apps faster and more accessible, much like how smartphones democratized software development.

**Link for More Details**:
[Ask AI: Introduction to Building AI Applications with Foundation Models](https://alisol.ir/?ai=Introduction%20to%20Building%20AI%20Applications%20with%20Foundation%20Models%7CChip%20Huyen%7CAI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models)

## Understanding Foundation Models

**Summary**: Diving into what makes foundation models tick, this chapter breaks down their creation: from curating massive training data (like web text for multilingual or domain-specific models) to architectures like transformers, scaling laws for optimal size, and post-training alignment to match human preferences. It explains generation as probabilistic sampling, which leads to quirks like hallucinations or inconsistency, and how tweaking settings like temperature or top-k can improve outputs without retraining.

**Example**: Think of a foundation model like a chef trained on every recipe book ever— it predicts the next ingredient based on patterns, but sometimes improvises oddly, like adding chocolate to soup, which is why sampling strategies help steer it toward sensible meals.

**Link for More Details**:
[Ask AI: Understanding Foundation Models](https://alisol.ir/?ai=Understanding%20Foundation%20Models%7CChip%20Huyen%7CAI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models)

## Evaluation Methodology

**Summary**: Evaluation is tough but essential, and here the book lays out challenges like lack of standards, scalability issues, and shifting from comparative rankings to absolute performance. It covers language modeling metrics (entropy, perplexity, cross-entropy) and methods like exact evaluation for functional correctness or similarity against references, plus using AI judges for complex tasks while watching for biases.

**Example**: Evaluating an AI is like grading a student's essay—you might check for exact facts with multiple-choice, but for creativity, you need a rubric; AI judges act as quick graders, but they can be lenient or positional, so mix in human checks.

**Link for More Details**:
[Ask AI: Evaluation Methodology](https://alisol.ir/?ai=Evaluation%20Methodology%7CChip%20Huyen%7CAI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models)

## Evaluating AI Systems

**Summary**: Building on basics, this chapter guides designing an evaluation pipeline: define criteria (generation quality, instruction-following, domain capability), evaluate all system parts, annotate data, and iterate. It stresses tying metrics to business goals, using rubrics, and selecting methods like pairwise comparisons or reward models, while handling model selection via benchmarks and data contamination.

**Example**: Picture your AI system as a restaurant kitchen—evaluate not just the final dish (output) but ingredients (data), tools (models), and process (pipeline); a good rubric ensures the meal meets customer tastes without over-relying on one chef's opinion.

**Link for More Details**:
[Ask AI: Evaluating AI Systems](https://alisol.ir/?ai=Evaluating%20AI%20Systems%7CChip%20Huyen%7CAI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models)

## Prompt Engineering

**Summary**: Prompts are key to guiding models, so the book explores basics like zero/few-shot learning, context limits, and best practices: clear instructions, breaking tasks into subtasks, giving time to think, and iterating. It also covers defenses against attacks like jailbreaking or prompt injection, from prompt-level tweaks to system safeguards, plus protecting proprietary prompts.

**Example**: A prompt is like giving directions to a driver—vague ones lead to wrong turns (hallucinations), but detailed steps with examples get you there smoothly, just as few-shot prompts help the model mimic the right style.

**Link for More Details**:
[Ask AI: Prompt Engineering](https://alisol.ir/?ai=Prompt%20Engineering%7CChip%20Huyen%7CAI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models)

## Context Construction and Application Patterns

**Summary**: Context shapes responses, so this chapter focuses on building it via retrieval-augmented generation (RAG) for accuracy and agentic patterns for complex reasoning. RAG involves chunking, embedding/term-based retrieval, optimization like reranking or query rewriting, and extensions to multimodal or tabular data. Agents add planning, tool use, and reflection for tasks beyond simple queries.

**Example**: RAG is like a student pulling notes from a library before answering—without it, they rely on memory (which fades); agents go further, like calling experts (tools) or double-checking work to handle multi-step problems.

**Link for More Details**:
[Ask AI: Context Construction and Application Patterns](https://alisol.ir/?ai=Context%20Construction%20and%20Application%20Patterns%7CChip%20Huyen%7CAI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models)

## Finetuning

**Summary**: When prompts aren't enough, finetune models for specific needs—this chapter covers when to (or not to) finetune, overview of supervised/preference approaches, techniques like LoRA for efficiency, memory math for bottlenecks, quantization, and merging models for multi-tasking.

**Example**: Finetuning is like tailoring a suit off the rack—it fits better for your body (task), using low-rank adaptations to adjust without remaking the whole thing, saving time and resources.

**Link for More Details**:
[Ask AI: Finetuning](https://alisol.ir/?ai=Finetuning%7CChip%20Huyen%7CAI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models)

## Dataset Engineering

**Summary**: Data is crucial for finetuning, so focus on quality, quantity, coverage, curation, acquisition/annotation, processing (cleaning, deduping, formatting), and synthesis via rules, simulation, or AI—while watching for collapse, imitation issues, or lineage problems.

**Example**: Building a dataset is like curating a playlist—you need diverse tracks (coverage), remove duplicates, and maybe generate remixes (synthesis) to keep it fresh, ensuring the AI "listens" well without echoing superficially.

**Link for More Details**:
[Ask AI: Dataset Engineering](https://alisol.ir/?ai=Dataset%20Engineering%7CChip%20Huyen%7CAI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models)

## Inference Optimization

**Summary**: To make models faster and cheaper, optimize at model (compression, attention redesign, speculative decoding) and service levels (batching, parallelism, caching). Cover accelerators' compute/memory/power, performance metrics like latency/throughput, and bottlenecks.

**Example**: Inference optimization is like tuning a race car—trim weight (quantization), streamline the engine (kernels), and batch rides (batching) to hit top speeds without guzzling fuel.

**Link for More Details**:
[Ask AI: Inference Optimization](https://alisol.ir/?ai=Inference%20Optimization%7CChip%20Huyen%7CAI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models)

## AI Engineering Architecture and User Feedback

**Summary**: Pulling it all together, this chapter walks through end-to-end app building: enhancing context, guardrails for inputs/outputs, routers/gateways, caches for speed, and agent patterns. It emphasizes feedback loops—collecting explicit/implicit signals like sentiment or errors—to iterate, while avoiding biases or degenerate loops.

**Example**: An AI app is like a smart home system—add sensors (feedback) to adjust lights automatically, but watch for loops where one faulty bulb dims everything; guardrails keep doors secure.

**Link for More Details**:
[Ask AI: AI Engineering Architecture and User Feedback](https://alisol.ir/?ai=AI%20Engineering%20Architecture%20and%20User%20Feedback%7CChip%20Huyen%7CAI%20Engineering%20-%20Building%20Applications%20with%20Foundation%20Models)

---

**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
* Website: [alisol.ir](https://alisol.ir)
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
