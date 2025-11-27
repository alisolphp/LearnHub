# Building AI Into Observability Workflows: Automating Dashboards, Alerts with MCP & Agents

* **Platform**: YouTube
* **Channel/Creator**: Grafana
* **Duration**: 00:25:17
* **Release Date**: Jun 7, 2025
* **Video Link**: [https://www.youtube.com/watch?v=qipWEGaTWsg](https://www.youtube.com/watch?v=qipWEGaTWsg)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b47981dc -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Building%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Building%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Building%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer) 

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Building%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Building%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Building%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Building%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Building%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Building%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Building%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Building%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Building%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Building%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents)
<!-- LH-BUTTONS:END -->

## Introduction to AI at Grafana
Yas introduces himself and sets the stage for discussing how Grafana is integrating AI, moving from simple text responses to actionable workflows with agentic LLMs. He mentions using Slido for questions and shares fun facts about Belgium.
* **Summary**: The talk focuses on evolving AI from basic queries to driving Grafana tasks, with a demo glimpse from the previous day.
* **Key Takeaway**: AI in Grafana aims to automate observability, like creating dashboards or handling incidents directly.
* **Link for More Details**: [Ask AI: AI at Grafana](https://alisol.ir/?ai=AI%20at%20Grafana%7CGrafana%7CBuilding%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents)

## Historical Context: From Curve Fitting to LLMs
Tracing back to Babylonian astronomers using curve fitting for star movements, Yas fast-forwards to modern LLMs like ChatGPT, enabled by massive data and GPUs.
* **Summary**: LLMs provide natural language access to internet knowledge, useful for tasks like explaining profiles in Pyroscope with code recommendations.
* **Key Takeaway**: Single-call LLMs lower barriers but are limited to training data, lacking access to your specific Grafana setup.
* **Link for More Details**: [Ask AI: History of LLMs](https://alisol.ir/?ai=History%20of%20LLMs%7CGrafana%7CBuilding%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents)

## Introducing Tool Calling and MCP
To overcome LLM limitations, tool calling allows defining APIs or functions for LLMs to use, enabling access to private contexts and actions beyond text.
* **Summary**: Initially vendor-specific, the Model Context Protocol (MCP) standardizes this, like USB-C for AI, simplifying integrations for apps like Slack or Gmail.
* **Key Takeaway**: MCP lets product owners define interactions, reducing custom work for developers and users.
* **Link for More Details**: [Ask AI: Tool Calling and MCP](https://alisol.ir/?ai=Tool%20Calling%20and%20MCP%7CGrafana%7CBuilding%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents)

## Grafana's MCP Server
Grafana adopted MCP early, open-sourcing a server that exposes core features to LLMs, such as searching dashboards, querying data, and managing incidents.
* **Summary**: This enables LLMs to interact with your Grafana instance, like listing active incidents via tool selection.
* **Key Takeaway**: Setup is simple with binaries or Docker; configure clients like Cursor or Claude, and stack with other MCP servers like GitHub.
* **Link for More Details**: [Ask AI: Grafana MCP Server](https://alisol.ir/?ai=Grafana%20MCP%20Server%7CGrafana%7CBuilding%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents)

## Demo: Automating Dashboards with MCP
In a live demo, Yas uses Cursor with Grafana MCP to create a dashboard from Node.js code metrics, then adds latency metrics to the code and updates the dashboard.
* **Summary**: Starting with a blank Grafana, the agent queries metrics, builds panels, and handles updates via hot-reloading.
* **Key Takeaway**: Combines code changes with observability automation, speeding up development.
```javascript
// Example snippet implied: Adding latency metric
app.get('/', (req, res) => {
  const start = Date.now();
  // ... (existing code)
  const latency = Date.now() - start;
  // Export latency metric to Prometheus
});
```
* **Link for More Details**: [Ask AI: Automating Dashboards Demo](https://alisol.ir/?ai=Automating%20Dashboards%20Demo%7CGrafana%7CBuilding%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents)

## Advancing to LLM Agents
Beyond tool calling, agents allow LLMs to "drive" Grafana like users, navigating, querying, and editing for complex workflows.
* **Summary**: Observability is tough due to system complexity; agents enable natural language interactions for tasks like SLO setup or debugging.
* **Key Takeaway**: Agents handle multi-step tasks dynamically, adapting to varied setups without standard recipes.
* **Link for More Details**: [Ask AI: LLM Agents in Grafana](https://alisol.ir/?ai=LLM%20Agents%20in%20Grafana%7CGrafana%7CBuilding%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents)

## Building Reliable Agents: Evaluations
From a hackathon prototype, challenges include ensuring reliability via evals, testing tool usage, reducing token noise, and end-to-end flows.
* **Summary**: Evals fix issues like missing filters in queries and optimize by using natural language outputs over JSON, cutting tokens by 4x.
* **Key Takeaway**: Mocked environments allow reproducible testing at agent, tool, and sub-agent levels.
* **Link for More Details**: [Ask AI: Agent Evaluations](https://alisol.ir/?ai=Agent%20Evaluations%7CGrafana%7CBuilding%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents)

## Agent Architectures: Multi-Agent Approach
Evolving from a single bloated agent to a coordinator delegating to specialized sub-agents for modularity and extensibility.
* **Summary**: Coordinator handles user input, routes to experts like support or dashboard agents, keeping prompts smaller and histories separate.
* **Key Takeaway**: Adds some overhead but makes it easier to add features as Grafana evolves.
* **Link for More Details**: [Ask AI: Multi-Agent Architectures](https://alisol.ir/?ai=Multi-Agent%20Architectures%7CGrafana%7CBuilding%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents)

## Future Directions and Preview
Upcoming expansions include more MCP tools, knowledge graphs for finding Grafana items, specialized agents for alerts, and community-contributed evals.
* **Summary**: Sign up for private preview; focus on query generation and observability-specific agents.
* **Key Takeaway**: Aims to make AI more integrated and community-driven in Grafana workflows.
* **Link for More Details**: [Ask AI: Future of AI in Grafana](https://alisol.ir/?ai=Future%20of%20AI%20in%20Grafana%7CGrafana%7CBuilding%20AI%20Into%20Observability%20Workflows%3A%20Automating%20Dashboards%2C%20Alerts%20with%20MCP%20%26%20Agents)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
