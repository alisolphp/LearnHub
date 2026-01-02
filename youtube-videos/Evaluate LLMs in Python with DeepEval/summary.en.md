# Evaluate LLMs in Python with DeepEval

* **Platform**: YouTube
* **Channel/Creator**: NeuralNine
* **Duration**: 00:34:08
* **Release Date**: Sep 15, 2025
* **Video Link**: [https://www.youtube.com/watch?v=HAoKJT3af7Y](https://www.youtube.com/watch?v=HAoKJT3af7Y)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Evaluate%20LLMs%20in%20Python%20with%20DeepEval) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Evaluate%20LLMs%20in%20Python%20with%20DeepEval) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Evaluate%20LLMs%20in%20Python%20with%20DeepEval) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Evaluate%20LLMs%20in%20Python%20with%20DeepEval) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Evaluate%20LLMs%20in%20Python%20with%20DeepEval) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Evaluate%20LLMs%20in%20Python%20with%20DeepEval) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Evaluate%20LLMs%20in%20Python%20with%20DeepEval) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Evaluate%20LLMs%20in%20Python%20with%20DeepEval) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Evaluate%20LLMs%20in%20Python%20with%20DeepEval) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Evaluate%20LLMs%20in%20Python%20with%20DeepEval) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Evaluate%20LLMs%20in%20Python%20with%20DeepEval) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Evaluate%20LLMs%20in%20Python%20with%20DeepEval)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Evaluate%20LLMs%20in%20Python%20with%20DeepEval) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Evaluate%20LLMs%20in%20Python%20with%20DeepEval) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/Evaluate%20LLMs%20in%20Python%20with%20DeepEval) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Evaluate%20LLMs%20in%20Python%20with%20DeepEval) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Evaluate%20LLMs%20in%20Python%20with%20DeepEval)
<!-- LH-BUTTONS:END -->

## Introduction to DeepEval
**Summary**: DeepEval is an open-source framework for evaluating large language models (LLMs) in Python, using LLMs as judges to assess outputs based on criteria like correctness or professionalism, especially useful for handling varied responses that aren't strictly identical but semantically equivalent.
**Key Takeaway/Example**: For a prompt like "What is 5 / 2?", responses such as "2.5" or "The result is 2.5" can both be valid, making traditional strict metrics insufficient—DeepEval uses LLM-judged metrics to evaluate these flexibly.
[Ask AI: Introduction to DeepEval](https://alisol.ir/?ai=Introduction%20to%20DeepEval|NeuralNine|Evaluate%20LLMs%20in%20Python%20with%20DeepEval)

## Setting Up DeepEval
**Summary**: Install DeepEval via pip or UV, set up an OpenAI API key in a .env file, and structure test files starting with "test_" to run evaluations using commands like "deepeval test run".
**Key Takeaway/Example**: Use imports like `from deepeval import assert_test` and `from deepeval.metrics import GEval` to start building tests; the framework integrates with OpenAI for judgments and promotes a paid service called Confident AI, but the open-source version works standalone.
[Ask AI: Setting Up DeepEval](https://alisol.ir/?ai=Setting%20Up%20DeepEval|NeuralNine|Evaluate%20LLMs%20in%20Python%20with%20DeepEval)

## G-Eval Metric for Correctness
**Summary**: The G-Eval metric allows custom criteria for evaluation, scoring outputs from 0 to 1 based on how well they match expectations, with a threshold like 0.5 to pass tests.
**Key Takeaway/Example**: Define a metric with criteria like "Check if the actual output has the same meaning as the expected output" and use it in an LLMTestCase; for input "What is 5 / 2?", "The result is 2.5" scores 1.0 if semantic match is allowed, but 0 if exact match is required.
```python
from deepeval.metrics import GEval
from deepeval.test_case import LLMTestCase, LLMTestCaseParams

correctness_metric = GEval(
    name="correctness",
    criteria="Check if the actual output is the same as the expected output. If the meaning is the same, that's fine.",
    evaluation_params=[LLMTestCaseParams.ACTUAL_OUTPUT, LLMTestCaseParams.EXPECTED_OUTPUT],
    threshold=0.5
)

test_case = LLMTestCase(
    input="What is 5 / 2?",
    actual_output="The result is 2.5",
    expected_output="2.5"
)

assert_test(test_case, [correctness_metric])
```
[Ask AI: G-Eval Metric for Correctness](https://alisol.ir/?ai=G-Eval%20Metric%20for%20Correctness|NeuralNine|Evaluate%20LLMs%20in%20Python%20with%20DeepEval)

## Evaluating Conversations for Professionalism
**Summary**: Use conversational G-Eval to assess entire dialogues for traits like professionalism and politeness, evaluating turns between user and assistant.
**Key Takeaway/Example**: A rude response like "Damn, you really know nothing" fails with a low score, while polite ones like "Yes, Python is an interpreted language" pass; run evaluations in parallel for multiple conversations.
```python
from deepeval.metrics import ConversationalGEval
from deepeval.test_case import ConversationalTestCase, Turn

professionalism_metric = ConversationalGEval(
    name="professionalism",
    criteria="Determine whether the assistant answered the questions of the user in a professional and polite manner."
)

conversation = ConversationalTestCase(
    actual_turns=[
        Turn(role="user", content="Is Python an interpreted language?"),
        Turn(role="assistant", content="Yes, Python is an interpreted language.")
    ]
)

evaluate([conversation], [professionalism_metric])
```
[Ask AI: Evaluating Conversations for Professionalism](https://alisol.ir/?ai=Evaluating%20Conversations%20for%20Professionalism|NeuralNine|Evaluate%20LLMs%20in%20Python%20with%20DeepEval)

## Answer Relevancy Metric
**Summary**: This predefined metric calculates relevancy as the ratio of relevant statements to total statements in the output, useful for ensuring responses stick to the query without fluff.
**Key Takeaway/Example**: For "What is the capital of France?", "Paris" scores 1.0, but adding irrelevant comments like "This is a good question. It is one of the most beautiful cities in Europe." drops it to 0.25.
```python
from deepeval.metrics import AnswerRelevancyMetric

metric = AnswerRelevancyMetric(threshold=0.5, include_reason=True)

test_case = LLMTestCase(
    input="What is the capital of France?",
    actual_output="This is a good question. The capital of France is Paris. It is one of the most beautiful cities in Europe."
)

evaluate([test_case], [metric])
```
[Ask AI: Answer Relevancy Metric](https://alisol.ir/?ai=Answer%20Relevancy%20Metric|NeuralNine|Evaluate%20LLMs%20in%20Python%20with%20DeepEval)

## Faithfulness Metric
**Summary**: Measures how well the output aligns with provided retrieval context, treating the context as "truth" regardless of real-world accuracy.
**Key Takeaway/Example**: If context states "The capital of France is Madrid", answering "Madrid" scores 1.0 for faithfulness, even if factually wrong; deviating to "Paris" should fail but may not always due to model biases.
```python
from deepeval.metrics import FaithfulnessMetric

metric = FaithfulnessMetric(threshold=0.5, include_reason=True)

test_case = LLMTestCase(
    input="What is the capital of France?",
    actual_output="Madrid",
    retrieval_context=["The capital of France is Madrid."]
)

evaluate([test_case], [metric])
```
[Ask AI: Faithfulness Metric](https://alisol.ir/?ai=Faithfulness%20Metric|NeuralNine|Evaluate%20LLMs%20in%20Python%20with%20DeepEval)

## Working with Datasets
**Summary**: Create evaluation datasets from ground truth "goldens" (inputs and expected outputs), simulate LLM responses, and evaluate multiple test cases in parallel.
**Key Takeaway/Example**: Use a list of goldens to generate test cases, then evaluate against metrics; for example, testing math and geography queries yields high scores if responses match semantically.
```python
from deepeval.data_sets import EvaluationDataset, Golden

goldens = [
    Golden(input="What is the capital of France?", expected_output="Paris"),
    Golden(input="What is 12 * 3?", expected_output="36")
]

dataset = EvaluationDataset(goldens=goldens)

test_cases = [
    LLMTestCase(
        input=golden.input,
        expected_output=golden.expected_output,
        actual_output=simulate_llm_answer(golden.input)
    ) for golden in dataset.goldens
]

evaluate(test_cases, [correctness_metric])
```
[Ask AI: Working with Datasets](https://alisol.ir/?ai=Working%20with%20Datasets|NeuralNine|Evaluate%20LLMs%20in%20Python%20with%20DeepEval)

## Practical Example: Invoice Data Extraction
**Summary**: Demonstrate evaluating LLMs on real tasks like extracting data from PDFs (e.g., invoices), using custom G-Eval to score accuracy on fields like date, total, and taxes, especially when notes alter values (e.g., amounts in thousands).
**Key Takeaway/Example**: Models like GPT-4o-mini often miss nuances like "all prices in thousands", leading to 60% accuracy; use PDFPlumber for text extraction and Pydantic for data modeling, then evaluate filled fields.
[Ask AI: Practical Example: Invoice Data Extraction](https://alisol.ir/?ai=Practical%20Example%3A%20Invoice%20Data%20Extraction|NeuralNine|Evaluate%20LLMs%20in%20Python%20with%20DeepEval)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
