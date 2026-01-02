# DeepEval Tutorial - Unit Testing LLM AI applications

* **Platform**: YouTube
* **Channel/Creator**: Coders Academy
* **Duration**: 00:20:43
* **Release Date**: Jul 15, 2025
* **Video Link**: [https://www.youtube.com/watch?v=ZHiJ12MhfQ8](https://www.youtube.com/watch?v=ZHiJ12MhfQ8)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/DeepEval%20Tutorial%20-%20Unit%20Testing%20LLM%20AI%20applications) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/DeepEval%20Tutorial%20-%20Unit%20Testing%20LLM%20AI%20applications) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/DeepEval%20Tutorial%20-%20Unit%20Testing%20LLM%20AI%20applications) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/DeepEval%20Tutorial%20-%20Unit%20Testing%20LLM%20AI%20applications) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/DeepEval%20Tutorial%20-%20Unit%20Testing%20LLM%20AI%20applications) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/DeepEval%20Tutorial%20-%20Unit%20Testing%20LLM%20AI%20applications) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/DeepEval%20Tutorial%20-%20Unit%20Testing%20LLM%20AI%20applications) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/DeepEval%20Tutorial%20-%20Unit%20Testing%20LLM%20AI%20applications) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/DeepEval%20Tutorial%20-%20Unit%20Testing%20LLM%20AI%20applications) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/DeepEval%20Tutorial%20-%20Unit%20Testing%20LLM%20AI%20applications) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/DeepEval%20Tutorial%20-%20Unit%20Testing%20LLM%20AI%20applications) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/DeepEval%20Tutorial%20-%20Unit%20Testing%20LLM%20AI%20applications)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/DeepEval%20Tutorial%20-%20Unit%20Testing%20LLM%20AI%20applications) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/DeepEval%20Tutorial%20-%20Unit%20Testing%20LLM%20AI%20applications) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/DeepEval%20Tutorial%20-%20Unit%20Testing%20LLM%20AI%20applications) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/DeepEval%20Tutorial%20-%20Unit%20Testing%20LLM%20AI%20applications) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/DeepEval%20Tutorial%20-%20Unit%20Testing%20LLM%20AI%20applications)
<!-- LH-BUTTONS:END -->

## Introduction to DeepEval
* **Summary**: DeepEval is an open-source framework for testing and evaluating large language models, helping ensure accuracy, safety, and reliability in applications like chatbots, RAG pipelines, or agentic systems. It offers metrics for issues like hallucinations and toxicity, with over half a million monthly downloads.
* **Key Takeaway/Example**: Think of it as pytest for LLMs—plug-and-play tools to measure performance before deployment.
* **Link for More Details**: [Ask AI: Introduction to DeepEval](https://alisol.ir/?ai=Introduction%20to%20DeepEval%7CCoders%20Academy%7CDeepEval%20Tutorial%3A%20Unit%20Testing%20LLM%20AI%20applications)

## Setup and Installation
* **Summary**: Start by creating a project folder, initializing with UV for virtual environment and dependencies. Install DeepEval, pandas, numpy, pytest, and Google Generative AI. Verify installation by importing DeepEval in Python.
* **Key Takeaway/Example**: Use commands like `uv init`, `uv add deepeval`, and `uv add google-generativeai`. In VS Code, check the project.toml for dependencies and run a simple import test.
```python
# Verification example
uv python -c "import deepeval; print('DeepEval installed successfully')"
```
* **Link for More Details**: [Ask AI: DeepEval Setup and Installation](https://alisol.ir/?ai=DeepEval%20Setup%20and%20Installation%7CCoders%20Academy%7CDeepEval%20Tutorial%3A%20Unit%20Testing%20LLM%20AI%20applications)

## Configuring the LLM Model
* **Summary**: Configure Google's Gemini 2.0 Flash model using the CLI with your API key. This setup ensures the model is used for evaluations without needing to specify it in code every time.
* **Key Takeaway/Example**: Run `deepeval set gemini --model-name=gemini-2.0-flash --gemini-api-key=YOUR_API_KEY`. CLI config works reliably, unlike environment variables.
* **Link for More Details**: [Ask AI: Configuring LLM in DeepEval](https://alisol.ir/?ai=Configuring%20LLM%20in%20DeepEval%7CCoders%20Academy%7CDeepEval%20Tutorial%3A%20Unit%20Testing%20LLM%20AI%20applications)

## Basic Test: Answer Relevancy
* **Summary**: Create a simple test using the answer relevancy metric to check if outputs match inputs accurately. Structure tests with setup (input/output), execution (measure metric), and assertion (check score and success).
* **Key Takeaway/Example**: For input "What is the capital of France?" and output "The capital of France is Paris...", set a threshold of 0.7. A score of 1.0 means perfect relevance.
```python
from deepeval import evaluate
from deepeval.metrics import AnswerRelevancyMetric
from deepeval.test_case import LLMTestCase

def test_answer_relevancy():
    input_text = "What is the capital of France?"
    output_text = "The capital of France is Paris which is located to the northern part of the country."
    test_case = LLMTestCase(input=input_text, actual_output=output_text)
    metric = AnswerRelevancyMetric(threshold=0.7)
    metric.measure(test_case)
    assert metric.score > 0.7
    assert metric.success is True
```
* **Link for More Details**: [Ask AI: Answer Relevancy Metric in DeepEval](https://alisol.ir/?ai=Answer%20Relevancy%20Metric%20in%20DeepEval%7CCoders%20Academy%7CDeepEval%20Tutorial%3A%20Unit%20Testing%20LLM%20AI%20applications)

## Advanced Test: Hallucination with Fictional Data
* **Summary**: Test for hallucinations by providing context that contradicts the output, like describing a fictional city as real. Use the hallucination metric with a lower threshold to detect inconsistencies.
* **Key Takeaway/Example**: Input: "What is the population of Atlantic City?" Output claims it's real with details, but context states it's fictional (Atlantis). Score of 1.0 indicates full hallucination, success False.
```python
from deepeval.metrics import HallucinationMetric
from deepeval.test_case import LLMTestCase

def test_hallucination():
    input_text = "What is the population of Atlantic City?"
    output_text = "Atlantic City has a population of 2.5 million people as of 2023. It is located in the Mediterranean Sea..."
    context = ["Atlantis is a fictional city... no real place of that name exists."]
    test_case = LLMTestCase(input=input_text, actual_output=output_text, context=context)
    metric = HallucinationMetric(threshold=0.5)
    metric.measure(test_case)
    assert metric.score > 0.5
    assert metric.success is False
```
* **Link for More Details**: [Ask AI: Hallucination Metric with Fictional Data](https://alisol.ir/?ai=Hallucination%20Metric%20with%20Fictional%20Data%7CCoders%20Academy%7CDeepEval%20Tutorial%3A%20Unit%20Testing%20LLM%20AI%20applications)

## Advanced Test: Hallucination with Factual Data
* **Summary**: Validate factual accuracy by aligning output and context, resulting in low hallucination scores. This confirms the model sticks to provided information without inventing details.
* **Key Takeaway/Example**: Input: "What is the population of Tokyo?" Output and context both state accurate facts (e.g., 14 million residents). Score of 0.0 means no hallucination, success True.
```python
def test_hallucination_factual():
    input_text = "What is the population of Tokyo?"
    output_text = "Tokyo has a population of approximately 14 million..."
    context = ["Tokyo is the capital of Japan... metropolitan area having 14 million residents..."]
    test_case = LLMTestCase(input=input_text, actual_output=output_text, context=context)
    metric = HallucinationMetric(threshold=0.5)
    metric.measure(test_case)
    assert metric.score == 0.0
    assert metric.success is True
```
* **Link for More Details**: [Ask AI: Hallucination Metric with Factual Data](https://alisol.ir/?ai=Hallucination%20Metric%20with%20Factual%20Data%7CCoders%20Academy%7CDeepEval%20Tutorial%3A%20Unit%20Testing%20LLM%20AI%20applications)

## Available Metrics and Conclusion
* **Summary**: DeepEval offers over 14 metrics across categories like RAG, agentic, and conversational. The tutorial covers setup to running tests, emphasizing its role in unit testing LLMs.
* **Key Takeaway/Example**: Explore metrics like toxicity or bias in the documentation for broader evaluations.
* **Link for More Details**: [Ask AI: DeepEval Metrics Overview](https://alisol.ir/?ai=DeepEval%20Metrics%20Overview%7CCoders%20Academy%7CDeepEval%20Tutorial%3A%20Unit%20Testing%20LLM%20AI%20applications)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
