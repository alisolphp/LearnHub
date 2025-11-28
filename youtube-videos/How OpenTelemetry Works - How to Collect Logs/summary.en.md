# How OpenTelemetry Works - How to Collect Logs

* **Platform**: YouTube
* **Channel/Creator**: That DevOps Guy
* **Duration**: 00:34:35
* **Release Date**: April 24, 2025
* **Video Link**: [https://www.youtube.com/watch?v=bIxt1b0GOU4](https://www.youtube.com/watch?v=bIxt1b0GOU4)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=005796ea -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/How%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/How%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/How%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/How%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/How%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/How%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/How%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/How%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/How%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/How%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/How%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/How%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/How%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs)
<!-- LH-BUTTONS:END -->

## Introduction to OpenTelemetry
OpenTelemetry is a framework and toolkit for handling monitoring and observability, covering generation, collection, processing, and export of telemetry data like traces, metrics, and logs. It's open-source and vendor-agnostic, providing standards to make switching between monitoring systems easier. The landscape can feel overwhelming due to varied ways applications generate and handle data, but OpenTelemetry simplifies this with a unified approach.
* **Key Takeaway**: Focus on basics like terminology, documentation navigation, and log collection to get started without vendor lock-in.
* **Link for More Details**: [Ask AI: Introduction to OpenTelemetry](https://alisol.ir/?ai=Introduction%20to%20OpenTelemetry%7CThat%20DevOps%20Guy%7CHow%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs)

## Why OpenTelemetry Exists
With complex microservices and diverse technologies, observability is crucial for spotting bottlenecks. Different systems produce logs in varied formats, leading to fragmented pipelines and difficulty switching vendors. OpenTelemetry solves this by offering standards for telemetry shaping, semantic conventions, and no vendor lock-in, allowing easier transitions and a single set of APIs to learn.
* **Key Takeaway**: It reduces the burden on devs and ops teams by avoiding reinvented wheels for logging in languages, OSes, and databases.
* **Link for More Details**: [Ask AI: Why OpenTelemetry Exists](https://alisol.ir/?ai=Why%20OpenTelemetry%20Exists%7CThat%20DevOps%20Guy%7CHow%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs)

## Telemetry Correlation and Challenges Without Standards
Without standards, you end up with separate pipelines for logs, metrics, and traces, making correlation hard. OpenTelemetry uses a single instrumentation framework to collect all signals, enrich them, and stitch them together for correlated telemetry, like linking CPU usage to logs at specific times.
* **Key Takeaway**: Signals (traces, metrics, logs, baggage) allow contextual info to pass between them, enabling better debugging across services.
* **Link for More Details**: [Ask AI: Telemetry Correlation](https://alisol.ir/?ai=Telemetry%20Correlation%7CThat%20DevOps%20Guy%7CHow%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs)

## OpenTelemetry Logs Data Model
The logs data model represents logs from any source, like apps or systems, in a standardized way. It includes fields like timestamps, trace/span IDs, flags, and attributes to stitch logs with metrics and traces. The log body holds the actual content, even from legacy formats.
* **Key Takeaway**: This model ensures uniformity, making it easier to parse, store, and correlate data regardless of origin.
* **Link for More Details**: [Ask AI: OpenTelemetry Logs Data Model](https://alisol.ir/?ai=OpenTelemetry%20Logs%20Data%20Model%7CThat%20DevOps%20Guy%7CHow%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs)

## Installing the OpenTelemetry Collector
To use OpenTelemetry, install a collector to fetch telemetry. Options include Docker, Kubernetes, Linux packages, Mac, or Windows. For simplicity, use Docker Compose to run the collector image locally, mounting volumes for config and data.
```yaml
services:
  otel-collector:
    image: otel/opentelemetry-collector:latest
    volumes:
      - ./config.yaml:/etc/otelcol/config.yaml
      - ./.data:/etc/otelcol/.data
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
```
* **Key Takeaway**: This setup allows collecting Docker container logs, like from an NGINX server.
* **Link for More Details**: [Ask AI: Installing OpenTelemetry Collector](https://alisol.ir/?ai=Installing%20OpenTelemetry%20Collector%7CThat%20DevOps%20Guy%7CHow%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs)

## Configuring Receivers for Log Collection
Receivers collect telemetry (pull or push-based) and are defined in the config's receivers section. For file logs, use the filelog receiver from the contrib repo, specifying include paths like Docker log patterns (/var/lib/docker/containers/*/log.log) and start_at (e.g., end) to avoid duplicates.
* **Key Takeaway**: Community-maintained receivers like filelog handle common sources; check contrib repo for options like Apache or AWS.
* **Link for More Details**: [Ask AI: Configuring Receivers](https://alisol.ir/?ai=Configuring%20Receivers%7CThat%20DevOps%20Guy%7CHow%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs)

## Using Extensions for Persistent Storage
Extensions add capabilities, like storage for persisting file offsets to resume reading after restarts. Use file_storage extension, defining it in extensions section with a directory (e.g., /etc/otelcol/.data/storage) and create_dir: true. Reference it in the receiver's storage field.
* **Key Takeaway**: Without storage, offsets are in-memory only, risking duplicates or missed logs on restart.
* **Link for More Details**: [Ask AI: Extensions for Storage](https://alisol.ir/?ai=Extensions%20for%20Storage%7CThat%20DevOps%20Guy%7CHow%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs)

## Setting Up Pipelines, Processors, and Exporters
Pipelines in the service section enable components: list receivers, processors (for enrichment), and exporters. Exporters send data to backends like files, Elasticsearch, or other collectors. For testing, use file exporter with a path (e.g., /var/lib/docker/containers/output_logs.log).
* **Key Takeaway**: Define everything declaratively, then enable in service > pipelines > logs with arrays of components.
* **Link for More Details**: [Ask AI: Pipelines and Exporters](https://alisol.ir/?ai=Pipelines%20and%20Exporters%7CThat%20DevOps%20Guy%7CHow%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs)

## Running and Testing the Collector
Run with docker compose up; fix errors like permissions by running as root or adjusting groups. Monitor output_logs for collected data in OpenTelemetry's structured format, with logs in the body field. Test by running an NGINX container and checking ingested access logs.
* **Key Takeaway**: Use file exporter initially to verify collection before forwarding to production backends.
* **Link for More Details**: [Ask AI: Running and Testing Collector](https://alisol.ir/?ai=Running%20and%20Testing%20Collector%7CThat%20DevOps%20Guy%7CHow%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs)

## Conclusion and Next Steps
OpenTelemetry standardizes telemetry handling to solve fragmentation, enabling better observability. It covers collection, processing, and export via configurable components.
* **Key Takeaway**: Great for evolving systems; explore further with the documentation and contrib repo.
* **Link for More Details**: [Ask AI: OpenTelemetry Conclusion](https://alisol.ir/?ai=OpenTelemetry%20Conclusion%7CThat%20DevOps%20Guy%7CHow%20OpenTelemetry%20Works%20-%20How%20to%20Collect%20Logs)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
