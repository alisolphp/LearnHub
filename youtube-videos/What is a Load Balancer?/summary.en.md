# What is a Load Balancer?

* **Platform**: YouTube
* **Channel/Creator**: IBM Technology
* **Duration**: 00:08:23
* **Release Date**: Oct 4, 2021
* **Video Link**: [https://www.youtube.com/watch?v=sCR3SAVdyCc](https://www.youtube.com/watch?v=sCR3SAVdyCc)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=4ea0b5d0 -->

### AI-Powered buttons

Teach Me:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/What%20is%20a%20Load%20Balancer%3F) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/What%20is%20a%20Load%20Balancer%3F) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/What%20is%20a%20Load%20Balancer%3F) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/What%20is%20a%20Load%20Balancer%3F) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/What%20is%20a%20Load%20Balancer%3F) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/What%20is%20a%20Load%20Balancer%3F) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/What%20is%20a%20Load%20Balancer%3F) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/What%20is%20a%20Load%20Balancer%3F) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/What%20is%20a%20Load%20Balancer%3F) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/What%20is%20a%20Load%20Balancer%3F) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/What%20is%20a%20Load%20Balancer%3F) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/What%20is%20a%20Load%20Balancer%3F)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/What%20is%20a%20Load%20Balancer%3F) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/What%20is%20a%20Load%20Balancer%3F) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/What%20is%20a%20Load%20Balancer%3F) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/What%20is%20a%20Load%20Balancer%3F) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/What%20is%20a%20Load%20Balancer%3F)
<!-- LH-BUTTONS:END -->

## Introduction to Load Balancers
Load balancers handle traffic for high-traffic websites by distributing requests across multiple servers to prevent any single one from getting overwhelmed.
Key takeaway: For a site expecting millions of users, a load balancer sits between the internet and your app servers, routing traffic intelligently.
[Ask AI: Introduction to Load Balancers](https://alisol.ir/?ai=Introduction%20to%20Load%20Balancers%7CIBM%20Technology%7CWhat%20is%20a%20Load%20Balancer%3F)

## Scaling Application Servers
When one app server can't handle the load from thousands of users, scale horizontally by adding more servers instead of making one bigger.
Key takeaway: Limits exist on vertical scaling, so horizontal scaling with multiple app servers ensures the site can serve concurrent users without saturation.
[Ask AI: Scaling Application Servers](https://alisol.ir/?ai=Scaling%20Application%20Servers%7CIBM%20Technology%7CWhat%20is%20a%20Load%20Balancer%3F)

## Role and Functions of a Load Balancer
A load balancer intercepts incoming traffic, distributes it to app servers, monitors their utilization, and enables auto-scaling to add or remove servers based on load.
Key takeaway: App servers report their status to the balancer, which can spin up new ones at high utilization (e.g., 85-90%) or shut down idle ones to cut costs, while all servers connect to a shared database to avoid data inconsistencies.
[Ask AI: Role and Functions of a Load Balancer](https://alisol.ir/?ai=Role%20and%20Functions%20of%20a%20Load%20Balancer%7CIBM%20Technology%7CWhat%20is%20a%20Load%20Balancer%3F)

## Load Balancing Algorithms: Round Robin
Round robin assigns traffic sequentially to each app server in a cycle, like user 1 to server 1, user 2 to server 2, and so on, restarting after the last one.
Key takeaway: It's simple but can lead to imbalances if session lengths vary, with some servers overloaded while others are underused.
[Ask AI: Load Balancing Algorithms: Round Robin](https://alisol.ir/?ai=Load%20Balancing%20Algorithms%3A%20Round%20Robin%7CIBM%20Technology%7CWhat%20is%20a%20Load%20Balancer%3F)

## Load Balancing Algorithms: Smart Load Balancing
Smart balancing monitors app server loads in real-time and routes new connections to the least busy server.
Key takeaway: Servers communicate their utilization to the balancer, making it more effective but requiring more setup and potentially higher costs than basic methods.
[Ask AI: Load Balancing Algorithms: Smart Load Balancing](https://alisol.ir/?ai=Load%20Balancing%20Algorithms%3A%20Smart%20Load%20Balancing%7CIBM%20Technology%7CWhat%20is%20a%20Load%20Balancer%3F)

## Load Balancing Algorithms: Other Methods
Beyond round robin and smart balancing, options like random selection distribute traffic unpredictably to avoid patterns, with about nine algorithms available to balance simplicity and control.
Key takeaway: Random assign mixes things up without full monitoring, offering a middle ground for scenarios needing more than sequential routing but less complexity than load-aware setups.
[Ask AI: Load Balancing Algorithms: Other Methods](https://alisol.ir/?ai=Load%20Balancing%20Algorithms%3A%20Other%20Methods%7CIBM%20Technology%7CWhat%20is%20a%20Load%20Balancer%3F)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
