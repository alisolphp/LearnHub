# How Prometheus Works - How to Collect Metrics

* **Platform**: YouTube
* **Channel/Creator**: That DevOps Guy
* **Duration**: 00:30:26
* **Release Date**: May 01, 2025
* **Video Link**: [https://www.youtube.com/watch?v=q4fr0p-6JO0](https://www.youtube.com/watch?v=q4fr0p-6JO0)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/How%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/How%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/How%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/How%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/How%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/How%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/How%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/How%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/How%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/How%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/How%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/How%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/How%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/How%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/How%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/How%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics)
<!-- LH-BUTTONS:END -->

## Introduction to Prometheus
Prometheus is an open-source monitoring tool that gathers, queries, and stores metrics from applications, VMs, open-source software, and more. It simplifies monitoring by handling everything from metric generation to insights, with demos showing its setup and usage.

Key takeaway: It's popular for its efficiency in storing dimensional data and tracking metrics over time, like requests per second or latency.

[Ask AI: Introduction to Prometheus](https://alisol.ir/?ai=Introduction%20to%20Prometheus%7CThat%20DevOps%20Guy%7CHow%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics)

## Key Features and Data Model
Prometheus uses a multi-dimensional data model with metric names and key-value pairs, making it lightweight and efficient. It's a time series database for tracking changes over time, with client libraries for many languages and integrations for tools like HAProxy, NGINX, Kubernetes, and cloud infrastructure like EC2.

Key takeaway: It operates mainly on a pull model over HTTP, scraping metrics from endpoints, but also supports pushing via a gateway.

[Ask AI: Key Features and Data Model](https://alisol.ir/?ai=Key%20Features%20and%20Data%20Model%7CThat%20DevOps%20Guy%7CHow%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics)

## What Are Metrics?
Metrics are time series recordings of changes, such as requests per second on a web server, query counts on a database, or CPU/memory usage on VMs. They help identify bottlenecks when applications slow down.

Key takeaway: Use metrics to track performance indicators like request latency or active connections.

[Ask AI: What Are Metrics](https://alisol.ir/?ai=What%20Are%20Metrics%7CThat%20DevOps%20Guy%7CHow%20Prometheus%20Works%20-%20to%20Collect%20Metrics)

## Prometheus Components
The core is the Prometheus server, which scrapes and stores metrics in memory or on disk without needing external databases. Client libraries exist for languages like Go, Python, Node.js, Java, and more. Push gateway handles metrics from jobs or services not scrapeable directly. Exporters add metrics to unsupported software, and Alert Manager sends alerts to Slack, Teams, or email.

Key takeaway: Components make Prometheus flexible for various setups, including distributed instances for high availability.

[Ask AI: Prometheus Components](https://alisol.ir/?ai=Prometheus%20Components%7CThat%20DevOps%20Guy%7CHow%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics)

## Architecture Overview
Prometheus server includes retrieval for scraping from exporters, microservices, containers, pods, or VMs via /metrics endpoints. It has a time series database, HTTP server for tools like Grafana, and a web UI for queries and troubleshooting. Service discovery integrates with Kubernetes, and remote write sends data to external storage or other instances.

Key takeaway: Apps, VMs, or Kubernetes expose metrics; Prometheus scrapes them, or uses push gateway for inaccessible sources.

[Ask AI: Architecture Overview](https://alisol.ir/?ai=Architecture%20Overview%7CThat%20DevOps%20Guy%7CHow%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics)

## Metrics Types
Counters are for monotonically increasing values, like request counts. Gauges handle values that go up and down, such as memory usage or concurrent requests. Histograms sample observations into buckets for calculating latencies, percentiles, or averages, often used for function execution times.

Key takeaway: Use client libraries to implement these in code; for example, counters for requests, gauges for temperatures, histograms for request durations.

[Ask AI: Metrics Types](https://alisol.ir/?ai=Metrics%20Types%7CThat%20DevOps%20Guy%7CHow%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics)

## Scrape Configuration
Configure scraping via Prometheus.yaml, defining jobs with targets (endpoints like IPs or service names). Supports HTTP/HTTPS, TLS, authentication, and service discovery for Kubernetes, AWS, Azure, etc. In Kubernetes, use service monitors for automatic config updates.

Key takeaway: Scrape intervals balance accuracy and network load; 30 seconds is common in Kubernetes.

[Ask AI: Scrape Configuration](https://alisol.ir/?ai=Scrape%20Configuration%7CThat%20DevOps%20Guy%7CHow%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics)

## Setting Up Prometheus with Docker Compose
Run Prometheus easily via binaries or Docker. Use Docker Compose to start Prometheus, Grafana, and example apps in Go, Python, .NET, Node.js. Build and run apps exposing /metrics on port 5000 internally.

Key takeaway: Mount Prometheus.yaml into the container; use container names for internal networking.

[Ask AI: Setting Up Prometheus with Docker Compose](https://alisol.ir/?ai=Setting%20Up%20Prometheus%20with%20Docker%20Compose%7CThat%20DevOps%20Guy%7CHow%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics)

## Application Instrumentation Examples
Instrument apps in various languages using client libraries to expose metrics. Generate traffic to endpoints to populate data, then scrape with Prometheus.

Key takeaway: Examples include Go on port 80, Python on 81, .NET on 82, Node.js on 83; each runs on internal port 5000 for metrics.

[Ask AI: Application Instrumentation Examples](https://alisol.ir/?ai=Application%20Instrumentation%20Examples%7CThat%20DevOps%20Guy%7CHow%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics)

## Prometheus Configuration File
In Prometheus.yaml, set global scrape/evaluation intervals. Define scrape configs with jobs and static targets pointing to app endpoints. For demo, one job scrapes all apps.

Key takeaway: Targets use container names like go-app:5000; adjust for Kubernetes services.

[Ask AI: Prometheus Configuration File](https://alisol.ir/?ai=Prometheus%20Configuration%20File%7CThat%20DevOps%20Guy%7CHow%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics)

## Querying Metrics in Prometheus UI
Access UI at localhost:9091 to search and query metrics (e.g., type "go" for Golang metrics). Check target health under status for troubleshooting.

Key takeaway: UI helps verify scraping; green targets mean healthy, with error messages for issues like connection refused.

[Ask AI: Querying Metrics in Prometheus UI](https://alisol.ir/?ai=Querying%20Metrics%20in%20Prometheus%20UI%7CThat%20DevOps%20Guy%7CHow%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics)

## Integrating with Grafana
Use Docker Compose to run Grafana on port 3000. Import data sources and dashboards via scripts. View pre-made dashboards for app telemetry, editing panels to see PromQL queries for counters, gauges, histograms.

Key takeaway: Grafana enhances visualization; connect to Prometheus at prometheus:9090.

[Ask AI: Integrating with Grafana](https://alisol.ir/?ai=Integrating%20with%20Grafana%7CThat%20DevOps%20Guy%7CHow%20Prometheus%20Works%20-%20How%20to%20Collect%20Metrics)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
