# OWASP Top 10 for LLMs

* **Platform**: YouTube
* **Channel/Creator**: OWASP Foundation
* **Duration**: 00:28:34
* **Release Date**: Jul 2, 2025
* **Video Link**: [https://www.youtube.com/watch?v=de9UPN7yD5U](https://www.youtube.com/watch?v=de9UPN7yD5U)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=4ea0b5d0 -->

### AI-Powered buttons

Teach Me:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/OWASP%20Top%2010%20for%20LLMs) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/OWASP%20Top%2010%20for%20LLMs) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/OWASP%20Top%2010%20for%20LLMs) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/OWASP%20Top%2010%20for%20LLMs) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/OWASP%20Top%2010%20for%20LLMs) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/OWASP%20Top%2010%20for%20LLMs) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/OWASP%20Top%2010%20for%20LLMs) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/OWASP%20Top%2010%20for%20LLMs) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/OWASP%20Top%2010%20for%20LLMs) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/OWASP%20Top%2010%20for%20LLMs) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/OWASP%20Top%2010%20for%20LLMs) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/OWASP%20Top%2010%20for%20LLMs)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/OWASP%20Top%2010%20for%20LLMs) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/OWASP%20Top%2010%20for%20LLMs) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/OWASP%20Top%2010%20for%20LLMs) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/OWASP%20Top%2010%20for%20LLMs) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/OWASP%20Top%2010%20for%20LLMs)
<!-- LH-BUTTONS:END -->

## Introduction to OWASP Top 10 for LLMs
The speaker kicks off by outlining the OWASP Top 10 vulnerabilities for Large Language Models (LLMs), noting the rapid evolution of AI and the need for secure architectures. They share their background in app security and highlight real-world headlines, hype, and actual attacks like data leaks in tools such as ChatGPT and Copilot. OWASP's resources, including the Gen AI Security Project, are recommended for governance, red teaming, and secure implementation.
* **Key Takeaway**: The Top 10 includes familiar issues like prompt injection (similar to SQL injection), excessive agency, and misinformation, emphasizing that AI security builds on traditional concepts but adapts to LLM specifics.
* **Link for More Details**: [Ask AI: OWASP Top 10 for LLMs](https://alisol.ir/?ai=OWASP%20Top%2010%20for%20LLMs|OWASP%20Foundation|OWASP%20Top%2010%20for%20LLMs)

## Architecture of LLM Applications
Early LLM apps typically featured a front-end, application code interacting with an LLM, and embeddings stored in vector databases for proprietary data. Now, agentic AI (essentially LLM-powered automation) dominates, using web fronts, control planes, message buses, and agents that handle tasks autonomously via prompts. Model Context Protocol (MCP) enables LLMs to interact with external systems, but it raises concerns about unverified servers and rapid adoption.
* **Key Takeaway**: Shift from simple embeddings to event-driven architectures with agents requires careful evaluation of MCP threats, like data exfiltration from untrusted sources.
* **Link for More Details**: [Ask AI: LLM Application Architecture](https://alisol.ir/?ai=LLM%20Application%20Architecture|OWASP%20Foundation|OWASP%20Top%2010%20for%20LLMs)

## Prompt Injection Vulnerability
Prompt injection occurs when attackers craft inputs to override system prompts, leading to unintended actions like data disclosure. Early ChatGPT versions were vulnerable, and libraries have had CVEs enabling remote code execution. A basic code example shows concatenating user input directly into prompts, making it easy to exploit.
```python
# Vulnerable example (Python with concatenation)
prompt = f"You are a helpful assistant. User query: {user_input}"
response = llm_service.generate(prompt)
```
Mitigations include parameterization (separating system and user inputs) and sanitization libraries like Rebuff for heuristic filtering.
* **Key Takeaway**: Combine techniques like Ollama's control characters for system prompts with libraries to block injections—testing shows even simple changes can strengthen defenses.
* **Link for More Details**: [Ask AI: Prompt Injection in LLMs](https://alisol.ir/?ai=Prompt%20Injection%20in%20LLMs|OWASP%20Foundation|OWASP%20Top%2010%20for%20LLMs)

## Sensitive Information Disclosure
LLMs can leak sensitive data due to their non-deterministic nature, especially in Retrieval-Augmented Generation (RAG) setups where queries access embedded data without proper controls. A simple RAG query might return all data indiscriminately.
```python
# Vulnerable RAG query example
embeddings = embed_text(user_query)
results = vector_db.query(embeddings)
```
Fix by passing user roles to the vector database for role-based access, applying data filters during embedding, and sanitizing outputs with pattern matching (e.g., regex for sensitive info).
* **Key Takeaway**: Implement access controls at the data level, anonymization, and minimization—crucial for sectors like healthcare to prevent record leaks.
* **Link for More Details**: [Ask AI: Sensitive Information Disclosure in LLMs](https://alisol.ir/?ai=Sensitive%20Information%20Disclosure%20in%20LLMs|OWASP%20Foundation|OWASP%20Top%2010%20for%20LLMs)

## Excessive Agency in Agentic Systems
Excessive agency lets LLMs perform unauthorized actions, like sending unintended emails or executing commands. Research from Pillar Security shows hidden characters in rule files for AI coding tools (e.g., Cursor, Replit) can bypass restrictions. In event-driven setups, agents with broad access via MCP pose risks.
```python
# Unsafe execution example
if "execute:" in prompt:
    os.system(command_after_colon)
```
Secure by filtering allowed commands (e.g., list/read but not delete), sandboxing execution, and controlling agent permissions.
* **Key Takeaway**: In vibe coding or server-side agents, always use allowlists and sandboxes to limit actions—prevent things like accidental file deletion or external interactions.
* **Link for More Details**: [Ask AI: Excessive Agency in LLMs](https://alisol.ir/?ai=Excessive%20Agency%20in%20LLMs|OWASP%20Foundation|OWASP%20Top%2010%20for%20LLMs)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
