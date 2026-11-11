# Engineering Stories: How Four Engineering Teams Move From Autocomplete to AI Agents

* **Companies**: GoDaddy, Rokt, Checkout.com, Assembled
* **Publication Dates**: GoDaddy, March 26, 2026 | Rokt, March 25, 2026 (last updated) | Checkout.com, June 17, 2026 | Assembled, August 7, 2026
* **Source Links**:
  * GoDaddy Engineering: [https://www.godaddy.com/resources/news/from-autocomplete-to-autopilot-how-i-adopted-full-agentic-development](https://www.godaddy.com/resources/news/from-autocomplete-to-autopilot-how-i-adopted-full-agentic-development)
  * Rokt: [https://rokt.com/blog/from-craft-to-orchestration-how-rokts-engineering-teams-learned-to-build-with-ai](https://rokt.com/blog/from-craft-to-orchestration-how-rokts-engineering-teams-learned-to-build-with-ai)
  * Checkout.com: [https://www.checkout.com/blog/how-agent-hal-ships-software-checkout-com](https://www.checkout.com/blog/how-agent-hal-ships-software-checkout-com)
  * Assembled: [https://www.assembled.com/blog/code-review-bottlenecks-how-we-hill-climbed-our-way-to-higher-pr-throughput](https://www.assembled.com/blog/code-review-bottlenecks-how-we-hill-climbed-our-way-to-higher-pr-throughput)

This document combines four public engineering blog posts into one story. It is a personal summary, not official material, and not endorsed by the companies. All rights remain with the respective authors. The companies describe their own results; none of the numbers are independently verified. I highly recommend reading the original posts.

*People work with AI in very different ways: autocomplete only, chat and copy-paste, vibe coding, or a full multi-agent workflow where you only review reports. Four teams describe, from the inside, what moving up costs and where they disagree. (This opening line is my own framing, not from the posts.)*

## Before You Get Started
* I summarize key points from useful engineering posts to learn and review quickly.
* Simply click on `Ask AI` links after each section to dive deeper.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## 1. GoDaddy: One Engineer's Phased Path From Autocomplete to Agents

**Summary**: A software engineer at GoDaddy says that in mid-2025 they were spending as much time correcting AI output as it saved. So they started delegating whole tasks to agents, from understanding requirements to submitting a pull request. They describe four stages: autocomplete, chat assistant, task executor, and agent-as-colleague, where the AI drives whole workflows while you guide and review. Most teams plateau at stage two or three. The key shift: in AI-assisted mode you fix the agent's output; in agentic mode you coach the agent to fix its own output.

**Example**: Their phases start with the foundation: feedback loops such as test suites, documentation written for an agent with zero context, and bounded tasks like bug fixes, test generation and migration scripts. Then more autonomy: explain why something is wrong instead of dictating the fix, and run parallel sessions. One morning three sessions (a new API endpoint, integration tests, a config format migration) all had pull requests ready by standup. No single task was faster than doing it by hand, but three at once turned a full day's work into a couple of hours. Last comes review: agent review as a first pass, and for well-tested, low-risk changes the author says to consider skipping human review. Their lesson: infrastructure beats prompts. Costs range from $20-100 per engineer per month, and productivity dips for the first couple of weeks.

**Link for More Details**:
[Ask AI: From autocomplete to agents, one engineer's phased path](https://alisol.ir/?ai=From%20autocomplete%20to%20agents%2C%20one%20engineer%27s%20phased%20path%7CGoDaddy%7CHow%20Four%20Engineering%20Teams%20Move%20From%20Autocomplete%20to%20AI%20Agents)

## 2. Rokt: The Same Stages, Seen From the Organization

**Summary**: Rokt's VP of Developer Experiences names four stages: autocomplete, co-pilot, co-author and supervisor. Autocomplete is where almost everyone starts and many organizations quietly stop; she calls it efficiency, not transformation. Co-pilot is about the conversation: asking AI to review your approach and find edge cases, not just to write a function. At co-author, agents run the full lifecycle and the human role moves from writing to directing. Most organizations stall here, not because the tools fail but because culture has not caught up: what is evaluated is no longer your code but your judgment about code someone else wrote.

**Example**: At the supervisor stage you are not reviewing lines of code but governing a fleet of agents: setting intent, enforcing standards and watching for drift. The skills that matter are precise communication, spotting the three wrong things in 400 lines of generated output, and catching a technically correct solution that is architecturally wrong. Two things made the transitions stick: a paved road with approved tooling (not fifteen different setups) and measurement with control groups instead of "it feels faster". One prerequisite is architecture: independently deployable services that own their data are safe for agents; tightly coupled systems are not. The post gives no productivity numbers, and says technology is moving faster than culture.

**Link for More Details**:
[Ask AI: Four stages from autocomplete to supervisor](https://alisol.ir/?ai=Four%20stages%20from%20autocomplete%20to%20supervisor%7CRokt%7CHow%20Four%20Engineering%20Teams%20Move%20From%20Autocomplete%20to%20AI%20Agents)

## 3. Checkout.com: A Narrow Agent That Never Auto-Merges

**Summary**: Checkout's in-house agent, HAL, generates 18% of all pull requests opened across the company. The authors say they got there by making HAL narrow, event-driven and a little mundane on purpose: it works through small, well-scoped tickets, reviews its own changes, fixes failing CI and rebases when main moves. A separate review persona with fresh context checks the work, because an agent grading its own reading of a spec could be confidently wrong twice over.

**Example**: One Friday, vulnerability alerts landed on a service. HAL updated the dependencies, ran the tests, opened a pull request and cleared the alerts; the engineer only confirmed the changes were dependency-only, glanced at the tests and merged. The post insists HAL is not autonomous: its pull requests clear the same gates as any human's, with a named approver and nothing auto-merged. It also names a risk, automation complacency: the more a team trusts the agent, the easier it is to wave its pull requests through.

**Link for More Details**:
[Ask AI: A narrow agent that never auto-merges](https://alisol.ir/?ai=A%20narrow%20agent%20that%20never%20auto-merges%7CCheckout.com%7CHow%20Four%20Engineering%20Teams%20Move%20From%20Autocomplete%20to%20AI%20Agents)

## 4. Assembled: When Agents Write More, Review Becomes the Bottleneck

**Summary**: After adopting coding agents, Assembled's engineers felt faster, but delivery metrics improved much less: more code and more pull requests, only slightly more merged. Time to first review rose from a median of 3.5 hours in December 2025 to over 16 hours in May 2026. The CTO's conclusion: agents produce more code, but it still goes through the same number of human reviewers. He says vibe coding without verifying correctness was never an option for them.

**Example**: They built an automated reviewer for low-risk pull requests: two independent agent reviews, then an orchestrator applies an approval policy with deterministic rules (for example only PRs under 1000 lines) and exclusions (authentication, billing, permissions). Engineers began shaping their PRs to qualify, so whatever the policy rewards, you get more of. Pull requests merged rose to 2.4 times the pre-agent baseline and auto-approvals reached 43% of merges within three weeks. The team calls these observational results, not a randomized trial, and says the bug data window is too short to be conclusive.

**Link for More Details**:
[Ask AI: Review becomes the bottleneck](https://alisol.ir/?ai=Review%20becomes%20the%20bottleneck%7CAssembled%7CHow%20Four%20Engineering%20Teams%20Move%20From%20Autocomplete%20to%20AI%20Agents)

## What the Four Stories Teach Together

**Summary**: Read in order, they answer one question: which way of working should you move to, and what does it cost? GoDaddy shows one engineer's practical path, Rokt shows the same stages as an organization problem, Checkout shows the far end with a hard limit (nothing auto-merges), and Assembled shows the bill: when code gets cheap, human review becomes the constraint. They disagree on one point: for low-risk changes, GoDaddy's author says consider skipping human review, Checkout keeps a human gate on every pull request, and Assembled approves only low-risk pull requests automatically and keeps humans for the rest.

**Example**: What they share: build a feedback loop (tests) first, keep tasks small and scoped, and measure instead of trusting the feeling of speed. And as Assembled puts it, speeding up one stage of a pipeline tends to move the constraint to the next stage.

**Link for More Details**:
[Ask AI: Which way of working with AI should you move to?](https://alisol.ir/?ai=Which%20way%20of%20working%20with%20AI%20should%20you%20move%20to%3F%7CGoDaddy%2C%20Rokt%2C%20Checkout.com%2C%20Assembled%7CHow%20Four%20Engineering%20Teams%20Move%20From%20Autocomplete%20to%20AI%20Agents)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
* Website: [alisol.ir](https://alisol.ir)
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
