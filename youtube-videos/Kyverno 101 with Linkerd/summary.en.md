# Kyverno 101 with Linkerd

* **Platform**: YouTube
* **Channel/Creator**: Buoyant
* **Duration**: 01:28:20
* **Release Date**: September 19, 2025
* **Video Link**: [https://www.youtube.com/watch?v=mQ7h6f6wNCc](https://www.youtube.com/watch?v=mQ7h6f6wNCc)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Kyverno%20101%20with%20Linkerd) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Kyverno%20101%20with%20Linkerd) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Kyverno%20101%20with%20Linkerd) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Kyverno%20101%20with%20Linkerd) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Kyverno%20101%20with%20Linkerd) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Kyverno%20101%20with%20Linkerd) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Kyverno%20101%20with%20Linkerd) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Kyverno%20101%20with%20Linkerd) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Kyverno%20101%20with%20Linkerd) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Kyverno%20101%20with%20Linkerd) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Kyverno%20101%20with%20Linkerd) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Kyverno%20101%20with%20Linkerd)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Kyverno%20101%20with%20Linkerd) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Kyverno%20101%20with%20Linkerd) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Kyverno%20101%20with%20Linkerd) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Kyverno%20101%20with%20Linkerd)
<!-- LH-BUTTONS:END -->

## Introduction to Policy as Code
Policy as code means defining infrastructure rules in declarative formats like YAML or CEL, treating them like application code. This allows version control, automated enforcement, and consistency across environments, avoiding manual checks or outdated spreadsheets.

Key takeaway: Policies stored in Git enable GitOps practices, making audits and compliance reproducible without relying on human oversight.

[Ask AI: Introduction to Policy as Code](https://alisol.ir/?ai=Introduction%20to%20Policy%20as%20Code|Buoyant|Kyverno%20101%20with%20Linkerd)

## Why Policies Matter in Kubernetes
As Kubernetes scales, policies standardize configurations like labels and resource limits, preventing issues like high cloud costs from excessive CPU settings. They empower developers with guardrails, reduce manual reviews, and ensure governance without bottlenecks.

Key takeaway: Platform teams use policies for self-service developer experiences, catching problems early to avoid troubleshooting chaos in large clusters.

[Ask AI: Why Policies Matter in Kubernetes](https://alisol.ir/?ai=Why%20Policies%20Matter%20in%20Kubernetes|Buoyant|Kyverno%20101%20with%20Linkerd)

## Kyverno Overview and Architecture
Kyverno is a Kubernetes-native policy engine that runs inside clusters, using CRDs and YAML. It supports admission control for real-time enforcement, background scans for ongoing compliance, and policy reports for visibility.

Key takeaway: The architecture involves API server webhooks, admission controllers, and a policy engine that validates, mutates, or generates resources, ending with reports to track pass/fail status.

[Ask AI: Kyverno Overview and Architecture](https://alisol.ir/?ai=Kyverno%20Overview%20and%20Architecture|Buoyant|Kyverno%20101%20with%20Linkerd)

## Kyverno Policy Types
Kyverno offers five types: validate (checks requirements like labels), mutate (adds/adjusts fields automatically), generate (clones resources like network policies), verify images (ensures signed/trusted containers), and cleanup (removes stale resources on schedules).

Key takeaway: These types cover everything from basic config enforcement to supply chain security, making lifecycle management automated and clutter-free.

[Ask AI: Kyverno Policy Types](https://alisol.ir/?ai=Kyverno%20Policy%20Types|Buoyant|Kyverno%20101%20with%20Linkerd)

## Role of CEL in Kyverno
CEL (Common Expression Language) adds expressiveness to policies, aligning with Kubernetes' validating/mutating admission APIs. Kyverno uses CEL for dynamic decisions like image verification and resource fetching.

Key takeaway: Transitioning from YAML to CEL enhances compatibility and power, though readability improves with proper formatting like line breaks.

[Ask AI: Role of CEL in Kyverno](https://alisol.ir/?ai=Role%20of%20CEL%20in%20Kyverno|Buoyant|Kyverno%20101%20with%20Linkerd)

## Using Kyverno Beyond Kubernetes
Kyverno isn't limited to Kubernetes; it handles any JSON payloads, governing infrastructure like Terraform or pipelines to prevent exposures in EKS clusters or databases.

Key takeaway: This universality means one tool for consistent policies across environments, simplifying adoption without needing multiple integrations.

[Ask AI: Using Kyverno Beyond Kubernetes](https://alisol.ir/?ai=Using%20Kyverno%20Beyond%20Kubernetes|Buoyant|Kyverno%20101%20with%20Linkerd)

## Common Use Cases for Kyverno Policies
Use cases include enforcing labels for ownership, setting naming conventions, applying resource limits to control costs, ensuring service mesh coverage, protecting RBAC policies, and verifying TLS certificates.

Key takeaway: Policies prevent unauthorized changes and rotate certs automatically, scaling security and observability without manual effort.

[Ask AI: Common Use Cases for Kyverno Policies](https://alisol.ir/?ai=Common%20Use%20Cases%20for%20Kyverno%20Policies|Buoyant|Kyverno%20101%20with%20Linkerd)

## Advantages of Using Kyverno
Kyverno provides strong API machinery, version control integration, comprehensive enforcement across lifecycles, and cross-platform governance for safer, automated platforms.

Key takeaway: It automates compliance, reduces human error, and scales efficiently, turning governance into a seamless part of workflows.

[Ask AI: Advantages of Using Kyverno](https://alisol.ir/?ai=Advantages%20of%20Using%20Kyverno|Buoyant|Kyverno%20101%20with%20Linkerd)

## Getting Started with Kyverno
Begin with the Kyverno Playground to test policies without a cluster. Start small with 3-5 policies in audit mode, focusing on impactful use cases in staging.

Key takeaway: Gradually build buy-in by showing actionable feedback, accelerating adoption once basics are in place.

[Ask AI: Getting Started with Kyverno](https://alisol.ir/?ai=Getting%20Started%20with%20Kyverno|Buoyant|Kyverno%20101%20with%20Linkerd)

## Common Pitfalls and Best Practices
Avoid starting with dozens of restrictive policies; use audit mode first to observe impacts. Integrate into CI/CD for early catches, preventing runtime issues.

Key takeaway: Shift left on misconfigurations and security to save costs and time, ensuring policies empower rather than overwhelm teams.

[Ask AI: Common Pitfalls and Best Practices](https://alisol.ir/?ai=Common%20Pitfalls%20and%20Best%20Practices|Buoyant|Kyverno%20101%20with%20Linkerd)

## Linkerd Introduction
Linkerd is a service mesh providing security, reliability, and observability without app changes, using lightweight Rust proxies to mediate microservices communication.

Key takeaway: It handles insecure networks transparently, outperforming sidecar-heavy meshes for better performance and ease.

[Ask AI: Linkerd Introduction](https://alisol.ir/?ai=Linkerd%20Introduction|Buoyant|Kyverno%20101%20with%20Linkerd)

## Demo: Integrating Kyverno with Linkerd
The demo installs Linkerd and Kyverno, then applies policies to enforce memory limits and mutate deployments automatically. It uses `kyverno test` for validation and shows policy reports tracking fixes.

Key takeaway: Policies ensure mesh inclusion and clean up old replica sets, with audit mode preventing disruptions during testing.

[Ask AI: Demo: Integrating Kyverno with Linkerd](https://alisol.ir/?ai=Demo%3A%20Integrating%20Kyverno%20with%20Linkerd|Buoyant|Kyverno%20101%20with%20Linkerd)

## Gotchas and Lessons Learned
Use both `kyverno test` and Playground for debugging, as silent skips can hide issues like invalid resources. Be precise with resource types to avoid unexpected behaviors.

Key takeaway: Computers follow instructions exactly, so double-check details like pod vs. deployment mutations for reliable policies.

[Ask AI: Gotchas and Lessons Learned](https://alisol.ir/?ai=Gotchas%20and%20Lessons%20Learned|Buoyant|Kyverno%20101%20with%20Linkerd)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
