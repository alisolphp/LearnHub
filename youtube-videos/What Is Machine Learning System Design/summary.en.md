# What Is Machine Learning System Design

* **Platform**: YouTube
* **Channel/Creator**: The ML Tech Lead
* **Duration**: 00:33:50
* **Release Date**: Jul 2, 2024
* **Video Link**: [https://www.youtube.com/watch?v=MpwrCrI_Gds](https://www.youtube.com/watch?v=MpwrCrI_Gds)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/What%20Is%20Machine%20Learning%20System%20Design) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/What%20Is%20Machine%20Learning%20System%20Design) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/What%20Is%20Machine%20Learning%20System%20Design) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/What%20Is%20Machine%20Learning%20System%20Design) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/What%20Is%20Machine%20Learning%20System%20Design) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/What%20Is%20Machine%20Learning%20System%20Design) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/What%20Is%20Machine%20Learning%20System%20Design) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/What%20Is%20Machine%20Learning%20System%20Design) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/What%20Is%20Machine%20Learning%20System%20Design) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/What%20Is%20Machine%20Learning%20System%20Design) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/What%20Is%20Machine%20Learning%20System%20Design) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/What%20Is%20Machine%20Learning%20System%20Design)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/What%20Is%20Machine%20Learning%20System%20Design) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/What%20Is%20Machine%20Learning%20System%20Design) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/What%20Is%20Machine%20Learning%20System%20Design) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/What%20Is%20Machine%20Learning%20System%20Design) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/What%20Is%20Machine%20Learning%20System%20Design)
<!-- LH-BUTTONS:END -->

## Introduction to Machine Learning System Design
Machine learning system design starts with a business or product idea and breaks it down into technical requirements to build an ML solution. It involves architecting at a high level for an overview or diving into details, but here we focus on the big picture. This approach is key for ML system design interviews, where you translate business needs into technical specs.

**Key Takeaway**: Use a playbook to go from business requirements to a full ML setup, illustrated by designing Facebook's friend suggestion feature.

[Ask AI: Introduction to Machine Learning System Design](https://alisol.ir/?ai=Introduction%20to%20Machine%20Learning%20System%20Design|The%20ML%20Tech%20Lead|What%20Is%20Machine%20Learning%20System%20Design)

## The Playbook for Designing ML Solutions
Start with business requirements, then reframe them as an ML problem—like supervised learning, classification, or ranking. Define business KPIs to measure impact, online metrics for production experiments, architectural components, training data sources, offline metrics, features, and finally the model algorithm. Focus more on the surrounding system than the algorithm itself—treat the model as a black box initially.

**Key Takeaway**: Junior engineers often jump to algorithms, but the real value is in data handling, metrics, and architecture. For example, tie ML outcomes back to business goals, even if correlations aren't perfect.

[Ask AI: The Playbook for Designing ML Solutions](https://alisol.ir/?ai=The%20Playbook%20for%20Designing%20ML%20Solutions|The%20ML%20Tech%20Lead|What%20Is%20Machine%20Learning%20System%20Design)

## Example: Facebook Friend Suggestion Feature
To build friend suggestions on Facebook, maximize feed engagement (where ads live) by recommending potential friends. Constraints include 1 billion daily users and responses under 100ms. The system selects candidates (e.g., second-degree friends), ranks them, filters for privacy, and adds diversity for better UX.

**Key Takeaway**: From 3 billion users, narrow to ~100 suggestions via candidate selection (e.g., 1 million from network graph), light and heavy ranking stages, filtering, and diversity. Reloads show varied lists to encourage interactions.

[Ask AI: Facebook Friend Suggestion Feature](https://alisol.ir/?ai=Facebook%20Friend%20Suggestion%20Feature|The%20ML%20Tech%20Lead|What%20Is%20Machine%20Learning%20System%20Design)

## Reframing as an ML Problem
Reframe friend suggestions as a supervised learning task: predict if a user will add a suggested profile (binary—click or not). Use classification or learning-to-rank to score and prioritize relevant profiles at the top.

**Key Takeaway**: Focus on ranking profiles by relevancy to increase add-friend likelihood, based on user feedback from clicks.

[Ask AI: Reframing as an ML Problem](https://alisol.ir/?ai=Reframing%20as%20an%20ML%20Problem|The%20ML%20Tech%20Lead|What%20Is%20Machine%20Learning%20System%20Design)

## Business Metrics
Measure success with metrics like average time on platform, user churn, or engagement (clicks, comments, reel watches). These tie back to long-term goals like ad revenue from increased feed interaction.

**Key Takeaway**: Adding friends boosts engagement, but linking ML improvements directly to these metrics can be challenging—requires waiting days or weeks for results.

[Ask AI: Business Metrics in ML](https://alisol.ir/?ai=Business%20Metrics%20in%20ML|The%20ML%20Tech%20Lead|What%20Is%20Machine%20Learning%20System%20Design)

## Online Metrics and Experiments
Use online metrics like average new friends added per session to compare models in production via A/B tests. Route a subset of users to a new model and statistically compare performance.

**Key Takeaway**: Online metrics use real-time data but may not perfectly correlate with business metrics—build a narrative on why they should align, like more friends leading to higher engagement.

[Ask AI: Online Metrics and Experiments](https://alisol.ir/?ai=Online%20Metrics%20and%20Experiments|The%20ML%20Tech%20Lead|What%20Is%20Machine%20Learning%20System%20Design)

## Architectural Components
Decide on real-time, batch, or streaming inference based on user activity—batch for low-active users, real-time for high. Include candidate selection, filtering, ranking (light for many candidates, heavy for accuracy), and diversity modules.

**Key Takeaway**: For real-time: Handle requests instantly but costly for scale. Batch: Precompute daily but wasteful. Streaming: Queue requests for delayed processing. Hybrid often works best. Cache results to avoid reranking.

[Ask AI: Architectural Components in ML Systems](https://alisol.ir/?ai=Architectural%20Components%20in%20ML%20Systems|The%20ML%20Tech%20Lead|What%20Is%20Machine%20Learning%20System%20Design)

## Acquiring Training Data
Capture user interactions (clicks on suggestions) to build training data. Address cold start by starting random and iterating. Consider device differences (mobile vs. desktop) and select instances shown to users, weighting by position.

**Key Takeaway**: Training instances are binary (click/no click). In batch/streaming, features may be outdated vs. real-time. Include only seen profiles; adjust for list position bias.

[Ask AI: Acquiring Training Data](https://alisol.ir/?ai=Acquiring%20Training%20Data|The%20ML%20Tech%20Lead|What%20Is%20Machine%20Learning%20System%20Design)

## Offline Metrics
Evaluate models on historical data using metrics like AUC, log loss, or precision-recall AUC. These are easy for binary responses but may not correlate well with online or business metrics.

**Key Takeaway**: Offline metrics help select models before production, but mismatches (e.g., log loss vs. revenue) can lead to failed online tests. Research better correlating metrics.

[Ask AI: Offline Metrics](https://alisol.ir/?ai=Offline%20Metrics|The%20ML%20Tech%20Lead|What%20Is%20Machine%20Learning%20System%20Design)

## Features for the Model
Focus on minimal viable features from actors: requesting user (ID, profile, visited pages), potential friend (similar), context (time, location, season), and interactions (common friends, likes, groups).

**Key Takeaway**: Translate to sparse features or vectors. Start with essentials like user-user affinities (e.g., fraction of common friends) for an MVP, avoiding thousands of unnecessary ones.

[Ask AI: Features for ML Models](https://alisol.ir/?ai=Features%20for%20ML%20Models|The%20ML%20Tech%20Lead|What%20Is%20Machine%20Learning%20System%20Design)

## Model Selection and Algorithms
Choose models last—deep learning often excels for recommenders. Light ranker: logistic regression or simple neural net for speed. Heavy ranker: complex neural net for accuracy. Iterate on sub-modules like convolutions vs. attention.

**Key Takeaway**: Model is least important initially; focus on framework (e.g., deep learning for automation). No single best model—test recommenders known for performance.

[Ask AI: Model Selection and Algorithms](https://alisol.ir/?ai=Model%20Selection%20and%20Algorithms|The%20ML%20Tech%20Lead|What%20Is%20Machine%20Learning%20System%20Design)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
