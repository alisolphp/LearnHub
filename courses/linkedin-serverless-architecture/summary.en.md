# Course Summary: Serverless Architecture

* **Platform**: LinkedIn Learning
* **Instructor**: Lynn Langit
* **Rating**: 4.7 out of 5 (103 ratings)
* **Duration**: 2h 2m
* **Skill level**: Intermediate
* **Release Date**: 11/16/2023 
* **Course Link**: https://www.linkedin.com/learning/serverless-architecture-19870153

> This document summarizes the key points from the course. I highly recommend watching the full course if you have the opportunity.

## Before You Get Started

- I summarize key points from useful courses to learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

---

## 1. Getting started with the course

**Summary**: The course opens by explaining why serverless matters for business agility: you want to be able to start up and scale cloud applications quickly, easily, and at low cost. Lynn positions serverless as a set of flexible, scalable patterns that help you focus on delivering value instead of managing servers. She also briefly introduces her background as a cloud architect and sets expectations for what you’ll learn.

**Example**: Imagine a small team launching a new product. Instead of buying servers and configuring load balancers, they can deploy a serverless web backend and automatically scale only when users appear—perfect for an uncertain launch.

**Link for More Details**: [Ask AI: Getting started with the course](https://alisol.ir/?ai=Getting%20started%20with%20the%20course%7CLynn%20Langit%7CServerless%20Architecture)

---

## 2. Core serverless concepts

**Summary**: Serverless architecture is about **not managing servers directly** while still using compute, storage, and other cloud services. Lynn emphasizes separating **data** (persistent: files, tables) from **compute** (ephemeral: short‑lived functions or containers). She compares IaaS (VMs), PaaS/containers, and FaaS (functions) and highlights that serverless functions are billed per invocation and can unlock 10–100x cost savings when designed well.

**Example**: Instead of a VM that runs 24/7 to resize uploaded images, you use a function that runs *only* when a user uploads an image, does the resize, and shuts down again—no idle cost.

**Link for More Details**: [Ask AI: Core serverless concepts](https://alisol.ir/?ai=Core%20serverless%20concepts%7CLynn%20Langit%7CServerless%20Architecture)

---

## 3. Serverless use cases and patterns

**Summary**: Lynn walks through core serverless patterns using Google Cloud and AWS. For Google Cloud, a serverless website might use Cloud Storage and Firestore for persistence, Cloud Functions or Cloud Run for compute, and API Gateway/Endpoints for access. On AWS, a classic pattern uses S3, DynamoDB, Lambda, and API Gateway. Vendors also provide many additional serverless services (streaming, security, analytics) that remove “undifferentiated heavy lifting.”

**Example**: A dynamic web app where static assets live in a bucket, user data in Firestore/DynamoDB, and backend logic in Cloud Functions/Lambda behind an API gateway—all scaling automatically based on traffic.

**Link for More Details**: [Ask AI: Serverless use cases and patterns](https://alisol.ir/?ai=Serverless%20use%20cases%20and%20patterns%7CLynn%20Langit%7CServerless%20Architecture)

---

## 4. Cost control with serverless

**Summary**: Cost control is one of the big promises of serverless, but it’s not automatic. You pay only for what you use, especially for compute that spins up on demand. Lynn stresses starting with small proof‑of‑concepts, using free tiers, setting billing alerts, and always cleaning up resources after experiments. She uses BigQuery as an example of a powerful serverless analytics service that can be cheap when used carefully—or surprisingly expensive if you don’t understand how billing by data scanned works.

**Example**: A team runs a simple SQL query over 1 GB of data in BigQuery; the cost is tiny. But if they accidentally scan tens of terabytes repeatedly without filters, they can generate a big bill in a single afternoon.

**Link for More Details**: [Ask AI: Cost control with serverless](https://alisol.ir/?ai=Cost%20control%20with%20serverless%7CLynn%20Langit%7CServerless%20Architecture)

---

## 5. Risks and challenges of serverless

**Summary**: Serverless also comes with risks. Tooling and local dev experiences are still maturing. The *services* may be cheap, but migrating legacy monoliths, retraining teams, and rewriting code can be costly. It’s non‑trivial to split a big app into many small pieces and then secure and test them. Cold starts can hurt latency‑sensitive apps, and higher‑level services increase vendor lock‑in. Lynn highlights that teams often underestimate the effort and recommends starting with small, low‑risk projects.

**Example**: A company tries to convert a huge legacy ERP system directly into serverless functions. The project drags on, budgets explode, and they eventually realize they should have started with one small module—like generating PDF invoices—before touching the rest.

**Link for More Details**: [Ask AI: Risks and challenges of serverless](https://alisol.ir/?ai=Risks%20and%20challenges%20of%20serverless%7CLynn%20Langit%7CServerless%20Architecture)

---

## 6. Security and observability in serverless

**Summary**: Security in serverless starts with good **IAM**: role‑based access, least privilege, no wildcard (“*”) permissions, and enforced MFA. Lynn stresses reducing the attack surface by disabling services you don’t need. The core mindset is **observability**—monitor and respond rather than trying to block every possible threat in advance. Logs, metrics, and alerts (at both service and project level) are crucial to see who is doing what, and when.

**Example**: Instead of allowing “storage.admin” on all buckets, you create a role that can read from only one specific bucket and then set up logs and alerts whenever that bucket is accessed from an unusual location or at an unusual rate.

**Link for More Details**: [Ask AI: Security and observability in serverless](https://alisol.ir/?ai=Security%20and%20observability%20in%20serverless%7CLynn%20Langit%7CServerless%20Architecture)

---

## 7. Key serverless services and history

**Summary**: Lynn puts serverless services into historical context. AWS S3 (2006) and Google App Engine (2008) were early serverless‑style services. BigQuery (2011) brought serverless analytics, and AWS Lambda (2014) popularized FaaS. Google Cloud Functions arrived later and is still catching up in some areas, but now integrates deeply with Cloud Run. She shows examples where functions are “second‑generation,” meaning they are backed by Cloud Run and can smoothly evolve toward more advanced container‑based deployments when needed.

**Example**: A function that processes images via Cloud Vision can start life as a simple HTTP Cloud Function. Later, as requirements grow, the same workload can be managed through Cloud Run or even Kubernetes using the auto‑generated YAML from the function deployment.

**Link for More Details**: [Ask AI: Key serverless services and history](https://alisol.ir/?ai=Key%20serverless%20services%20and%20history%7CLynn%20Langit%7CServerless%20Architecture)

---

## 8. Object storage, data lakes, and data design

**Summary**: Object storage (buckets) is often the backbone of serverless data. Lynn explains that teams frequently underestimate bucket design: permissions, auditing, monitoring, lifecycle policies, and cost optimization. She then introduces modern patterns like **data lakes**, **lakehouses**, and **data meshes** built on top of buckets with technologies such as BigQuery, Dataproc Serverless, Dataplex, and BigLake. The idea is to keep data in cheap, durable storage and attach various serverless compute engines to it.

**Example**: A company stores raw logs and CSV data in Cloud Storage, exposes them as BigLake tables, uses serverless Spark jobs for heavy transformations, and then queries everything via BigQuery and Looker dashboards—without moving data between different storage systems.

**Link for More Details**: [Ask AI: Object storage, data lakes, and data design](https://alisol.ir/?ai=Object%20storage%2C%20data%20lakes%2C%20and%20data%20design%7CLynn%20Langit%7CServerless%20Architecture)

---

## 9. Events, messaging, and streams

**Summary**: Serverless architectures are naturally **event‑driven**. Typical event sources include file uploads, database changes, HTTP requests, or resource state changes. On GCP, Pub/Sub and Eventarc are key players; Eventarc can directly trigger Cloud Functions from many services without manually wiring Pub/Sub topics. Lynn demonstrates patterns where dropping a file in a bucket triggers a function, which then calls Cloud Vision and writes annotations back to storage.

**Example**: Upload a photo to a “vision‑input” bucket. Eventarc triggers a function that calls the Vision API, detects labels like “water” or “mountain,” and writes the results as a JSON file into an “annotations” bucket, ready for downstream analytics.

**Link for More Details**: [Ask AI: Events, messaging, and streams](https://alisol.ir/?ai=Events%2C%20messaging%2C%20and%20streams%7CLynn%20Langit%7CServerless%20Architecture)

---

## 10. Microservices and database design

**Summary**: Many teams mix up **microservices** and **serverless**. Lynn clarifies that true microservices are thin end‑to‑end slices of an application, each with its own compute and its own data store. A common anti‑pattern is the “serverless monolith,” where functions talk to a single shared database that becomes a bottleneck. Instead, you aim for small, independently deployable units that bundle function(s) and their own persistence, sometimes complemented by specialized search or analytics engines.

**Example**: Instead of one shared relational database for everything, a “user profile” microservice might own a small NoSQL database and a couple of functions; a separate “billing” microservice might own its own data store and functions, communicating through APIs or events rather than sharing tables.

**Link for More Details**: [Ask AI: Microservices and database design](https://alisol.ir/?ai=Microservices%20and%20database%20design%7CLynn%20Langit%7CServerless%20Architecture)

---

## 11. Cloud functions and compute choices

**Summary**: Cloud functions are a core compute primitive. Lynn walks through creating functions (with Gen 1 vs. Gen 2 on GCP), choosing runtimes (Node, Python, Go, .NET, Java, PHP, Ruby), configuring memory/CPU, timeouts, concurrency, autoscaling, and connections. She emphasizes that the configuration strongly affects both performance and cost, and that logs, metrics, and generated infrastructure YAML are essential for tuning and for future migrations to Cloud Run or Kubernetes.

**Example**: You start with a Node.js function at 256 MB RAM and 1 concurrent request. Under load tests, latency spikes; by analyzing metrics you increase memory to 1 GB and allow 50 concurrent requests per instance, dramatically improving throughput without over‑provisioning VMs.

**Link for More Details**: [Ask AI: Cloud functions and compute choices](https://alisol.ir/?ai=Cloud%20functions%20and%20compute%20choices%7CLynn%20Langit%7CServerless%20Architecture)

---

## 12. Deploying functions and infrastructure as code

**Summary**: Deploying serverless by clicking around in the console doesn’t scale. Lynn recommends using **Terraform** or similar tools as the standard for infrastructure as code. She shows how Jumpstart solutions and Terraform templates stand up full architectures (buckets, functions, APIs, IAM, etc.) as a unit, and how logs from Cloud Build or CodeBuild help diagnose deployment issues. Infrastructure code should live in source control, follow coding standards, and be deployed frequently, ideally via a CI/CD pipeline.

**Example**: Instead of manually creating a bucket, function, and API gateway, you run `terraform apply` on a template that defines everything. When you need to replicate the environment in another region or project, you just apply the same code with different variables.

**Link for More Details**: [Ask AI: Deploying functions and infrastructure as code](https://alisol.ir/?ai=Deploying%20functions%20and%20infrastructure%20as%20code%7CLynn%20Langit%7CServerless%20Architecture)

---

## 13. Serverless containers and Kubernetes

**Summary**: “Serverless containers” bridge the gap between pure functions and full Kubernetes clusters. Under the hood, all serverless compute runs in containers on servers. Services like Cloud Run (with Knative under the hood) and AWS Fargate let you bring your own container images while still benefiting from automatic scaling and managed infrastructure. Kubernetes (GKE/EKS) sits at a lower level with more control and complexity. Lynn shows how you might start with Cloud Run and later move to Kubernetes if you need fine‑grained control.

**Example**: A REST API that needs a custom runtime and native libraries runs in a container on Cloud Run. As the system grows and you need multi‑region traffic shaping and complex networking, you migrate the same container image into a Kubernetes cluster for full control.

**Link for More Details**: [Ask AI: Serverless containers and Kubernetes](https://alisol.ir/?ai=Serverless%20containers%20and%20Kubernetes%7CLynn%20Langit%7CServerless%20Architecture)

---

## 14. AWS serverless architectures in practice

**Summary**: Using an Australian genomics search project, Lynn illustrates a classic AWS serverless web architecture: S3 + DynamoDB + Lambda + API Gateway, with SNS for async processing and CloudFront for global distribution. She shows how enabling detailed logging and using AWS X‑Ray to visualize traces and service maps revealed performance bottlenecks. Refactoring the Lambda logic and architecture led to an ~80% performance improvement with relatively little time investment.

**Example**: X‑Ray highlights one Lambda function in red as the slowest part of a pipeline. By splitting that function into two smaller, focused functions and optimizing data access, the team cuts response time for critical requests by more than half.

**Link for More Details**: [Ask AI: AWS serverless architectures in practice](https://alisol.ir/?ai=AWS%20serverless%20architectures%20in%20practice%7CLynn%20Langit%7CServerless%20Architecture)

---

## 15. GCP serverless architectures in practice

**Summary**: Lynn shares phased modernization journeys on AWS and GCP. Instead of jumping straight from on‑prem monoliths to fully serverless, she designs **milestones**: lift‑and‑shift to VMs, then add managed databases and storage, then introduce serverless pieces like Lambda/Fargate, and finally build out CI/CD pipelines with CodeCommit, CodePipeline, and CodeBuild. The same phased thinking applies to GCP with Cloud Build, Artifact Registry, Cloud Run, and GKE.

**Example**: A time‑based events app first moves as‑is to EC2 and RDS. Next, the team replaces background cron jobs with Lambdas triggered on schedules, then moves part of the app into Fargate, and only later replaces the legacy DB table by table with DynamoDB and Timestream.

**Link for More Details**: [Ask AI: GCP serverless architectures in practice](https://alisol.ir/?ai=GCP%20serverless%20architectures%20in%20practice%7CLynn%20Langit%7CServerless%20Architecture)

---

## 16. Serverless data lakes and data mesh

**Summary**: For data‑heavy workloads, Lynn explores serverless **data lakes**, lakehouses, and data meshes on GCP. Buckets hold raw data; Dataplex manages logical lakes and zones; BigLake and external tables expose bucket data to BigQuery; Dataproc Serverless runs Spark jobs; Looker provides dashboards. Dataplex adds governance, cataloging, and policy enforcement across many datasets—“microservices for analytics.” Jumpstart templates make it feasible to stand up these complex architectures quickly.

**Example**: A company deploys the analytics lakehouse Jumpstart: raw event data lands in Cloud Storage, a Spark job writes partitioned Parquet / Iceberg tables, Dataplex catalogs them into zones, BigQuery queries them via BigLake, and product managers explore everything in Looker without worrying about the underlying buckets.

**Link for More Details**: [Ask AI: Serverless data lakes and data mesh](https://alisol.ir/?ai=Serverless%20data%20lakes%20and%20data%20mesh%7CLynn%20Langit%7CServerless%20Architecture)

---

## 17. Planning your own serverless journey

**Summary**: The course closes with practical advice: keep architectures as simple as possible, secure and observe everything (including costs), and adopt DevOps practices so you “develop in the cloud for the cloud.” Model your data services first, always separate compute from data, and choose the right level of abstraction—functions, VMs, containers—based on your team’s readiness and workload needs. Lynn points to her GitHub repositories for ongoing resources and encourages iterative learning.

**Example**: Instead of trying to redesign your entire system, you pick one small workload—say, nightly report generation—and rebuild it with a bucket, a function, and a scheduled trigger. You monitor cost, performance, and logs, learn from the experience, and then tackle the next slice.

**Link for More Details**: [Ask AI: Planning your own serverless journey](https://alisol.ir/?ai=Planning%20your%20own%20serverless%20journey%7CLynn%20Langit%7CServerless%20Architecture)

---

**Original Course**: [Serverless Architecture on LinkedIn Learning](https://www.linkedin.com/learning/serverless-architecture-19870153)

---
**About the summarizer**

I'm *Ali Sol*, a PHP Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

