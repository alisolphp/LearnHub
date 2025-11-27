# Course Summary: System design in Microsoft Azure Cloud

* **Platform**: Udemy
* **Instructor**: Mayesh
* **Rating**: 4.8/5
* **Update Date**: February 2024
* **Course Link**: https://www.udemy.com/course/system-design-in-microsoft-azure-cloud/

*This document summarizes the key points from the course. I highly recommend watching the full course if you have the opportunity.*

## Before You Get Started
- I summarize key points from useful courses to learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b47981dc -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer) 

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=courses/udemy-system-design-in-microsoft-azure-cloud)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=courses/udemy-system-design-in-microsoft-azure-cloud)
<!-- LH-BUTTONS:END -->

## Topic 1: Course Introduction

* **Summary**: The instructor introduces himself as a senior IT consultant with over 15 years of experience, focusing on digital transformation. The course covers fundamentals of system design using Azure services for applications like Facebook, YouTube, and WhatsApp. It emphasizes that designs evolve with technology and encourages applying personal logic to enhance them. No actual deployments are done; it's about architectural choices.
* **Example**: Using Netflix as a hypothetical to illustrate starting from assumptions, hiring developers, and needing a structured architecture framework like TOGAF.
* **Link for More Details**: [Ask AI: Course Introduction](https://alisol.ir/?ai=Course%20Introduction%7CMayesh%7CSystem%20design%20in%20Microsoft%20Azure%20Cloud)

## Topic 2: Software Development Life Cycle (SDLC)

* **Summary**: Explains SDLC's six phases: planning, analysis, design, implementation, testing/integration, and maintenance. It ensures quality, risk management, better communication, efficiency, and high-quality products. Models like Waterfall, Agile, Scrum, V-model, and DevOps are mentioned. Design phase includes High-Level Design (HLD) for overall architecture and Low-Level Design (LLD) for detailed components.
* **Example**: In the design phase, HLD outlines the system's blueprint, while LLD breaks it into modules like algorithms and data structures, using diagrams and flowcharts.
* **Link for More Details**: [Ask AI: Software Development Life Cycle (SDLC)](https://alisol.ir/?ai=Software%20Development%20Life%20Cycle%20%28SDLC%29%7CMayesh%7CSystem%20design%20in%20Microsoft%20Azure%20Cloud)

## Topic 3: Domain Name System (DNS) in System Design

* **Summary**: DNS translates human-readable domain names to IP addresses for easier access. It involves hierarchical resolution, caching in browsers, and establishing TCP connections. A typical URL breakdown includes scheme, domain, path, and resource.
* **Example**: Typing www.google.com in a browser checks cache, resolves via DNS if needed, establishes connection, and sends HTTP requests—like saving contacts by name instead of numbers for simplicity.
* **Link for More Details**: [Ask AI: Domain Name System (DNS) in System Design](https://alisol.ir/?ai=Domain%20Name%20System%20%28DNS%29%20in%20System%20Design%7CMayesh%7CSystem%20design%20in%20Microsoft%20Azure%20Cloud)

## Topic 4: Load Balancer in System Design

* **Summary**: Load balancers distribute traffic across servers for better performance and availability. Benefits include availability, scalability, security (e.g., DDoS protection), and performance. Algorithms are static (round-robin, weighted) or dynamic (least connections, least response time). Compared to OSI/TCP models, with Layer 4 (TCP/UDP) and Layer 7 (HTTP/HTTPS) types.
* **Example**: In a high-traffic scenario, round-robin rotates requests sequentially, but sticky round-robin keeps user sessions on the same server to avoid bottlenecks.
* **Link for More Details**: [Ask AI: Load Balancer in System Design](https://alisol.ir/?ai=Load%20Balancer%20in%20System%20Design%7CMayesh%7CSystem%20design%20in%20Microsoft%20Azure%20Cloud)

## Topic 5: Facebook System Design Building Blocks

* **Summary**: Breaks down Facebook's architecture from user access via DNS and load balancers to three-tier setup (UI, business logic, DB). Includes caching, scaling (horizontal/vertical), external storage for media, content filtering, NoSQL for posts/likes, analytics for recommendations, and separate handling for mobile users with CDN.
* **Example**: User uploads a photo; it's filtered for content, stored externally, compressed for mobile, and served via CDN to reduce latency for global users.
* **Link for More Details**: [Ask AI: Facebook System Design Building Blocks](https://alisol.ir/?ai=Facebook%20System%20Design%20Building%20Blocks%7CMayesh%7CSystem%20design%20in%20Microsoft%20Azure%20Cloud)

## Topic 6: Facebook System Design Requirements

* **Summary**: Functional requirements include user profiles, timelines, friend requests, posts (images/videos/text), likes/comments, and chats. Non-functional cover read-heavy nature, fast rendering, acceptable lag, access patterns (decaying posts), global access with multi-language support, and scalability for massive daily uploads and users.
* **Example**: One post write leads to 10 reads (likes/views), emphasizing read-heavy design; posts decay over time, moving to archive storage based on access patterns.
* **Link for More Details**: [Ask AI: Facebook System Design Requirements](https://alisol.ir/?ai=Facebook%20System%20Design%20Requirements%7CMayesh%7CSystem%20design%20in%20Microsoft%20Azure%20Cloud)

## Topic 7: Facebook System Design in Azure

* **Summary**: Maps building blocks to Azure services: DNS, Traffic Manager/Application Gateway for HA/DR, App Service for hosting (three-tier with managed identities), AKS for microservices/APIs, Cosmos DB for NoSQL, Stream Analytics/Event Hubs for user activity, Databricks/HDInsight for big data, Data Factory for ETL, Cognitive Services/ML for content filtering, and storage/CDN for media.
* **Example**: User activity captured via Stream Analytics, processed in Databricks (bronze/silver/gold layers), and reported via Synapse/Power BI for recommendations; content filtered using Cognitive Services before storage in Blob for third-party access.
* **Link for More Details**: [Ask AI: Facebook System Design in Azure](https://alisol.ir/?ai=Facebook%20System%20Design%20in%20Azure%7CMayesh%7CSystem%20design%20in%20Microsoft%20Azure%20Cloud)

## Topic 8: YouTube System Design in Azure

* **Summary**: Functional requirements: search, like/share/download videos, comments/replies. Architecture for content creators (upload/encoding via Functions/Batch, filtering with Cognitive Services) and users (three-tier App Service, AKS APIs, Stream Analytics for recommendations/ads). ETL with Databricks/Synapse for analytics.
* **Example**: Content creator uploads raw video; it's encoded in Batch nodes (one for video, one for thumbnails), filtered, and stored in NetApp; users get recommendations based on ML-analyzed activity from Cosmos DB.
* **Link for More Details**: [Ask AI: YouTube System Design in Azure](https://alisol.ir/?ai=YouTube%20System%20Design%20in%20Azure%7CMayesh%7CSystem%20design%20in%20Microsoft%20Azure%20Cloud)

## Topic 9: Chat Application System Design

* **Summary**: Functional: one-to-one/group chats, read receipts, online status, notifications, media sharing. NFR: low latency, high reliability/global availability, secure end-to-end encryption. Uses WebSocket for persistent connections, services like messaging/session/relay/last seen/asset, NoSQL/SQL DBs, and Kafka for group handling.
* **Example**: User A sends message to offline User B; relay service stores it in SQL until B comes online, then delivers via WebSocket; group messages use Kafka producer/consumer to broadcast to connected users.
* **Link for More Details**: [Ask AI: Chat Application System Design](https://alisol.ir/?ai=Chat%20Application%20System%20Design%7CMayesh%7CSystem%20design%20in%20Microsoft%20Azure%20Cloud)

For the full course experience, check out the [original course on Udemy](https://www.udemy.com/course/system-design-in-microsoft-azure-cloud/).

---

**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
