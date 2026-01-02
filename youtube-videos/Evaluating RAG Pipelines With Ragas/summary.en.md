# Evaluating RAG Pipelines With Ragas

* **Platform**: YouTube
* **Channel/Creator**: David Hundley
* **Duration**: 01:17:00
* **Release Date**: Jun 29, 2024
* **Video Link**: https://www.youtube.com/watch?v=2ReYkiz2Jyc

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## Stream Introduction and RAG Series Overview
* **Summary**: The speaker kicks off by apologizing for rescheduling the stream due to needing extra time for polish and getting caught up with the Elden Ring DLC. This is part of the "summer of RAG" series, where they previously generated a synthetic dataset of fake knowledge items for company help desks and gave a high-level intro to RAG. Streams are available on YouTube, LinkedIn, or X.
* **Key Takeaway**: The series builds on synthetic data for experimenting with RAG pipelines, starting with basics before diving into optimizations.
* **Link for More Details**: [Ask AI: Stream Introduction and RAG Series Overview](https://alisol.ir/?ai=Stream%20Introduction%20and%20RAG%20Series%20Overview|David%20Hundley|Evaluating%20RAG%20Pipelines%20With%20Ragas)

## Importance of Evaluating RAG Pipelines
* **Summary**: Before optimizing RAG, focus on evaluation to measure how adjustments perform over time. In a real-world setup, you'd pull from logs, but here they're synthesizing data to simulate user questions, AI responses, and ground truth.
* **Key Takeaway**: Evaluation is crucial for tracking improvements in RAG, similar to monitoring model performance in traditional ML.
* **Link for More Details**: [Ask AI: Importance of Evaluating RAG Pipelines](https://alisol.ir/?ai=Importance%20of%20Evaluating%20RAG%20Pipelines|David%20Hundley|Evaluating%20RAG%20Pipelines%20With%20Ragas)

## Challenges in Evaluating LLMs vs Traditional ML
* **Summary**: Traditional ML uses metrics like F1 score, precision, recall, RMSE, or stability indexes. Deep learning and generative AI are black boxes, making these calculations impossible. Ragas uses an LLM to evaluate another LLM, which has pros (fast, scalable) and cons (turtles all the way down). Human evaluation is biased and time-consuming.
* **Key Takeaway**: Suggest a hybrid approach: use Ragas for programmatic eval and humans for a subset until models improve.
* **Link for More Details**: [Ask AI: Challenges in Evaluating LLMs vs Traditional ML](https://alisol.ir/?ai=Challenges%20in%20Evaluating%20LLMs%20vs%20Traditional%20ML|David%20Hundley|Evaluating%20RAG%20Pipelines%20With%20Ragas)

## Introduction to Ragas Framework
* **Summary**: Ragas evaluates RAG at multiple levels using generator and critic LLMs. It synthesizes test data with evolutions like simple questions, reasoning, conditioning, and multi-context to vary the dataset.
* **Key Takeaway**: Flow involves creating a vector store from documents, selecting random nodes, critic checking suitability, generating/evolving questions, and validating outputs.
* **Link for More Details**: [Ask AI: Introduction to Ragas Framework](https://alisol.ir/?ai=Introduction%20to%20Ragas%20Framework|David%20Hundley|Evaluating%20RAG%20Pipelines%20With%20Ragas)

## Synthesizing Test Data with Ragas
* **Summary**: Demo in Kaggle notebook: Load synthetic knowledge items as LangChain docs, set up OpenAI chat model and embeddings. Use TestsetGenerator to create questions from docs, with distributions for evolutions. Output includes question, contexts, evolution type, but ground truth needs separate generation.
* **Key Takeaway**: Ragas chunks docs arbitrarily (e.g., 400 tokens), so customize for your strategy. It can get expensive with multiple LLM calls.
```python
from ragas.testset.generator import TestsetGenerator
from ragas.testset.evolutions import simple, reasoning, multi_context

generator_llm = ChatOpenAI(model="gpt-4o")
critic_llm = ChatOpenAI(model="gpt-4o")
embeddings = OpenAIEmbeddings()

test_generator = TestsetGenerator.from_langchain(
    generator_llm,
    critic_llm,
    embeddings
)

distributions = {simple: 1.0}  # For simple questions only

testset = test_generator.generate_with_langchain_docs(documents=ki_docs, test_size=1, distributions=distributions)
```
* **Link for More Details**: [Ask AI: Synthesizing Test Data with Ragas](https://alisol.ir/?ai=Synthesizing%20Test%20Data%20with%20Ragas|David%20Hundley|Evaluating%20RAG%20Pipelines%20With%20Ragas)

## Generating Ground Truth and Preparing Data
* **Summary**: Ragas testset lacks separate ground truth, so rename 'ground_truth' to 'answer' and generate actual ground truth using a different model like Llama 3 via Perplexity API to avoid duplication. Format as Hugging Face dataset for Ragas.
* **Key Takeaway**: Custom function to apply prompt for ground truth per row; handle NaNs and list formats for contexts.
```python
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI

llama_model = ChatOpenAI(
    base_url="https://api.perplexity.ai",
    api_key=os.getenv("PERPLEXITY_API_KEY"),
    model="llama-3-70b-instruct"
)

prompt = PromptTemplate(
    template="""<|begin_of_text|><|start_header_id|>system<|end_header_id|>
    You are a world class AI model who answers questions based on provided context.
    You must come up with a comprehensive and long answer to the question based on the provided context.
    Don't hallucinate and make up answers. Stick to the provided context.
    <|{eot_id}><|start_header_id|>user<|end_header_id|>
    Question: {question}
    Context: {context}
    Answer:<|eot_id|>""",
    input_variables=["question", "context"],
)
```
* **Link for More Details**: [Ask AI: Generating Ground Truth and Preparing Data](https://alisol.ir/?ai=Generating%20Ground%20Truth%20and%20Preparing%20Data|David%20Hundley|Evaluating%20RAG%20Pipelines%20With%20Ragas)

## Calculating and Explaining Ragas Metrics
* **Summary**: Use evaluate function with metrics list. Component-wise: Faithfulness (claims inferred from context), Answer Relevancy (relevance to question via generated questions and cosine), Context Recall/Precision/Relevancy/Entity Recall. End-to-end: Semantic Similarity (cosine on embeddings), Answer Correctness (F1 + semantic sim). Each metric's calculation involves 1-4 LLM/embed calls.
* **Key Takeaway**: Watch for rate limits (use GPT-3.5 for larger sets) and costs; sample data for enterprise scale.
```python
from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_recall,
    context_precision,
    context_relevancy,
    context_entity_recall,
    answer_semantic_similarity,
    answer_correctness,
)

ragas_scores = evaluate(
    dataset=ragas_test_set,
    metrics=[
        faithfulness,
        answer_relevancy,
        context_recall,
        context_precision,
        context_relevancy,
        context_entity_recall,
        answer_semantic_similarity,
        answer_correctness,
    ],
    llm=ChatOpenAI(model="gpt-4o"),
)
```
* **Link for More Details**: [Ask AI: Calculating and Explaining Ragas Metrics](https://alisol.ir/?ai=Calculating%20and%20Explaining%20Ragas%20Metrics|David%20Hundley|Evaluating%20RAG%20Pipelines%20With%20Ragas)

## Aspect Critiques in Ragas
* **Summary**: Pass all data to critique on aspects: harmfulness, maliciousness (want 0), coherence, correctness, conciseness (want 1). Uses prompts to score binary verdicts.
* **Key Takeaway**: Ideal for checking if outputs are safe and quality.
* **Link for More Details**: [Ask AI: Aspect Critiques in Ragas](https://alisol.ir/?ai=Aspect%20Critiques%20in%20Ragas|David%20Hundley|Evaluating%20RAG%20Pipelines%20With%20Ragas)

## Considerations, Gotchas, and Future Plans
* **Summary**: Ragas can hit rate limits and get expensive with many calls; use sampling. Documentation lacks details—read source code. Future streams will use Ragas for optimizing RAG pipelines. Notebook and blog post available on GitHub.
* **Key Takeaway**: Hybrid eval is key; refine based on what metrics matter most.
* **Link for More Details**: [Ask AI: Considerations, Gotchas, and Future Plans](https://alisol.ir/?ai=Considerations%2C%20Gotchas%2C%20and%20Future%20Plans|David%20Hundley|Evaluating%20RAG%20Pipelines%20With%20Ragas)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
