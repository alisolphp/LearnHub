# Engineering Stories: How Four Engineering Teams Use AI Coding Agents: Where Do You Put the Human?
* **Companies**: Sanity, Spotify, Checkout.com, Assembled
* **Publication Dates**: Sanity, September 2, 2025 | Spotify, November 2025 | Checkout.com, June 17, 2026 | Assembled, August 7, 2026
* **Source Links**:
  * Sanity Engineering: [https://www.sanity.io/engineering/first-attempt-will-be-95-garbage](https://www.sanity.io/engineering/first-attempt-will-be-95-garbage)
  * Spotify Engineering: [https://engineering.atspotify.com/2025/11/spotifys-background-coding-agent-part-1](https://engineering.atspotify.com/2025/11/spotifys-background-coding-agent-part-1)
  * Checkout.com: [https://www.checkout.com/blog/how-agent-hal-ships-software-checkout-com](https://www.checkout.com/blog/how-agent-hal-ships-software-checkout-com)
  * Assembled: [https://www.assembled.com/blog/code-review-bottlenecks-how-we-hill-climbed-our-way-to-higher-pr-throughput](https://www.assembled.com/blog/code-review-bottlenecks-how-we-hill-climbed-our-way-to-higher-pr-throughput)

This document combines four public engineering blog posts into one story. It is a personal summary, not official material, and not endorsed by the companies. All rights remain with the respective authors. The companies describe their own results; none of the numbers are independently verified. I highly recommend reading the original posts.

*Four teams, one question: where do you put the human? From an engineer who writes with AI, to an agent inside an existing pipeline, to an agent with a narrow contract, to the moment when review itself becomes the bottleneck.*

## Before You Get Started
* I summarize key points from useful engineering posts to learn and review quickly.
* Simply click on `Ask AI` links after each section to dive deeper.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## 1. Sanity: Three Attempts, and the Engineer Stays Responsible

**Summary**: A staff engineer at Sanity says he wrote every line himself until 18 months before his post; now AI writes 80% of his initial implementations while he focuses on architecture, review and steering several threads. He describes four pivots in his career: books and SDK docs, googling, Cursor, and recently Claude Code for full delegation. His mental model for the AI is a junior developer who does not learn: it cannot retain learning between sessions, so he gives it context files and tool access.

**Example**: Expect three attempts. The first has a 95% garbage rate, the second 50%, and only the third is workable, and even that is a starting point, not final code. Sanity's policy is that the engineer is responsible for the code they ship, even if AI generated it, and the author warns that AI confidently writes broken code and calls it great. He estimates he ships features 2-3x faster (his own estimate) and suggests budgeting $1000-1500 per month for a senior engineer going all-in.

**Link for More Details**:
[Ask AI: Three attempts and the engineer stays responsible](https://alisol.ir/?ai=Three%20attempts%20and%20the%20engineer%20stays%20responsible%7CSanity%7CHow%20Four%20Engineering%20Teams%20Use%20AI%20Coding%20Agents)

## 2. Spotify: An Agent Inside a Machine That Already Worked

**Summary**: Spotify already had Fleet Management, a system that applies code transformations across all repositories and opens pull requests; since mid-2024 around half of Spotify's pull requests have been automated by it. Its limit: one dependency updater's script grew to over 20,000 lines, so most automated changes stayed simple. Their change was small and precise: replace the deterministic migration scripts with an agent that follows a prompt, while targeting repositories, opening pull requests, reviews and merging stay exactly the same.

**Example**: They built a small internal CLI around existing agents and LLMs so they can swap them freely. The agents generated more than 1,500 pull requests that teams merged into production, with a total time saving of 60-90% on those migrations compared to writing the code by hand. The authors are open about the trade-offs: agents can be slow, their output unpredictable, and they need validation, guardrails, sandboxing and cost control. Note that the "half of pull requests" figure belongs to the older script-based system, not to the agents.

**Link for More Details**:
[Ask AI: An agent inside Fleet Management](https://alisol.ir/?ai=An%20agent%20inside%20Fleet%20Management%7CSpotify%7CHow%20Four%20Engineering%20Teams%20Use%20AI%20Coding%20Agents)

## 3. Checkout.com: A Narrow Agent That Never Auto-Merges

**Summary**: Checkout's in-house agent, HAL, generates 18% of all pull requests opened across the company. The authors say they got there by making HAL narrow, event-driven and a little mundane on purpose: it works through small, well-scoped tickets, reviews its own changes, fixes failing CI and rebases when main moves. A separate review persona with fresh context checks the work, because an agent grading its own reading of a spec could be confidently wrong twice over.

**Example**: One Friday, vulnerability alerts landed on a service. HAL updated the dependencies, ran the tests, opened a pull request and cleared the alerts; the engineer only confirmed the changes were dependency-only, glanced at the tests and merged. The post insists HAL is not autonomous: its pull requests clear the same gates as any human's, with a named approver and nothing auto-merged. It also names a risk, automation complacency: the more a team trusts the agent, the easier it is to wave its pull requests through.

**Link for More Details**:
[Ask AI: A narrow agent that never auto-merges](https://alisol.ir/?ai=A%20narrow%20agent%20that%20never%20auto-merges%7CCheckout.com%7CHow%20Four%20Engineering%20Teams%20Use%20AI%20Coding%20Agents)

## 4. Assembled: When Agents Write More, Review Becomes the Bottleneck

**Summary**: After adopting coding agents, Assembled's engineers felt faster, but delivery metrics improved much less: more code and more pull requests, only slightly more merged. Time to first review rose from a median of 3.5 hours in December 2025 to over 16 hours in May 2026. The CTO's conclusion: agents produce more code, but it still goes through the same number of human reviewers. He says vibe coding without verifying correctness was never an option for them.

**Example**: They built an automated reviewer for low-risk pull requests: two independent agent reviews, then an orchestrator applies an approval policy with deterministic rules (for example only PRs under 1000 lines) and exclusions (authentication, billing, permissions). Engineers began shaping their PRs to qualify, so whatever the policy rewards, you get more of. Pull requests merged rose to 2.4 times the pre-agent baseline and auto-approvals reached 43% of merges within three weeks. The team calls these observational results, not a randomized trial, and says the bug data window is too short to be conclusive.

**Link for More Details**:
[Ask AI: Review becomes the bottleneck](https://alisol.ir/?ai=Review%20becomes%20the%20bottleneck%7CAssembled%7CHow%20Four%20Engineering%20Teams%20Use%20AI%20Coding%20Agents)

## What the Four Stories Teach Together

**Summary**: Read in order, they answer one question: where do you put the human? Sanity keeps the engineer in every step and accountable for the result. Spotify drops the agent into a pipeline whose review and merge steps did not change. Checkout narrows the agent's job and refuses to auto-merge. Assembled shows what happens when code gets cheap: human review becomes the constraint, and the answer is a strict, narrow automated reviewer, not skipping review.

**Example**: The same ideas repeat in all four: keep a human or a deterministic gate where a mistake is expensive; keep the old review and merge process around the agent; keep tasks small and scoped; and expect the bottleneck to move to the next stage as soon as you speed up one. Assembled states it directly: speeding up one stage of a pipeline tends to move the constraint to the next stage.

**Link for More Details**:
[Ask AI: Where do you put the human?](https://alisol.ir/?ai=Where%20do%20you%20put%20the%20human%3F%7CSanity%2C%20Spotify%2C%20Checkout.com%2C%20Assembled%7CHow%20Four%20Engineering%20Teams%20Use%20AI%20Coding%20Agents)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
* Website: [alisol.ir](https://alisol.ir)
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
