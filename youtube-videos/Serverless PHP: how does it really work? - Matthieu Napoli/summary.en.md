# Serverless PHP: how does it really work? - Matthieu Napoli

* **Platform**: YouTube
* **Channel/Creator**: PHP UK Conference
* **Duration**: 01:03:22
* **Release Date**: Feb 15, 2024
* **Video Link**: [https://www.youtube.com/watch?v=r8fgR0lTV-k](https://www.youtube.com/watch?v=r8fgR0lTV-k)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=31acc7b2 -->

### AI-Powered buttons

Start teaching this to a:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Serverless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Serverless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Serverless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Serverless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Serverless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli) | 
[Story](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Serverless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Serverless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Serverless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Serverless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Serverless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Serverless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Serverless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Serverless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Serverless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Serverless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Serverless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli)
<!-- LH-BUTTONS:END -->

## Introduction to Serverless
Serverless is another way to host PHP apps, alongside servers, containers, or shared hosting. It shines for easier scaling by offloading work to cloud providers and offers simplicity for secure, redundant setups. The talk focuses on AWS Lambda, which doesn't natively support PHP, so tools like Bref or Laravel Vapor are needed to run custom runtimes.
* **Key Takeaway**: Serverless isn't about no servers—it's about caring less about them, making it ideal when you need scale without heavy management.
* **Link for More Details**: [Ask AI: Serverless Introduction](https://alisol.ir/?ai=Serverless%20Introduction%7CPHP%20UK%20Conference%7CServerless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli)

## What is Bref?
Bref is an open-source project started 6-7 years ago to bring PHP support to AWS Lambda. It's matured from experimental to reliable, with over 150 contributors, powering 20,000+ functions, 100,000+ deployments, and 20 billion+ invocations monthly across companies.
* **Key Takeaway**: Bref abstracts the complexity, letting you deploy PHP apps easily without deep AWS knowledge—it's used at scale by real businesses.
* **Link for More Details**: [Ask AI: What is Bref](https://alisol.ir/?ai=What%20is%20Bref%7CPHP%20UK%20Conference%7CServerless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli)

## Deploying with Bref
Install Bref via Composer, create a bref.yaml file specifying AWS, PHP version (e.g., 8.3 with FPM), request handling (e.g., to public/index.php), and options like URL. Deploy with `serverless deploy`—it takes seconds for updates, minutes first time.
```yaml
provider: aws
php: 8.3-fpm
functions:
  web:
    handler: public/index.php
    url: true
```
* **Key Takeaway**: Deployment is straightforward; no provisioning needed—your app idles until requests hit.
* **Link for More Details**: [Ask AI: Deploying with Bref](https://alisol.ir/?ai=Deploying%20with%20Bref%7CPHP%20UK%20Conference%7CServerless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli)

## Demo: Real-time Scaling
A live demo showed an API scaling instantly from zero instances to handle multiple requests (up to 50 concurrent via audience participation). Instances spin up on demand, process requests, and idle or shut down.
* **Key Takeaway**: Scaling happens automatically—no pre-provisioning; it handled spikes without crashing, limited to 50 for the demo.
* **Link for More Details**: [Ask AI: Real-time Scaling Demo](https://alisol.ir/?ai=Real-time%20Scaling%20Demo%7CPHP%20UK%20Conference%7CServerless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli)

## How Serverless Works Under the Hood
On deploy, nothing runs until a request. Invocations go through AWS Lambda API as JSON payloads. Add a web server like Function URL (free, scalable) to translate HTTP to Lambda format. First request boots a "micro VM" instance.
* **Key Takeaway**: Regions deploy across multiple data centers for redundancy; Lambda runs on EC2 servers using Firecracker for VM-container hybrid isolation and fast starts (~100ms).
* **Link for More Details**: [Ask AI: Serverless Under the Hood](https://alisol.ir/?ai=Serverless%20Under%20the%20Hood%7CPHP%20UK%20Conference%7CServerless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli)

## Startup Process
On boot, runtime and app code (zip or container image) mount into a Linux environment. A Go-based runtime API starts, Bref's bootstrap shell runs PHP, connects back via local HTTP for requests.
```php
// Simplified bootstrap.php
require __DIR__ . '/vendor/autoload.php';
(new Bref\Runtime\LambdaRuntime('lambda.sock'))->start();
```
* **Key Takeaway**: HTTP uses PHP-FPM for familiar $_GET/$_POST/sessions; translations add <1ms latency.
* **Link for More Details**: [Ask AI: Startup Process](https://alisol.ir/?ai=Startup%20Process%7CPHP%20UK%20Conference%7CServerless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli)

## Scaling and Concurrency
One instance handles one request at a time—no overlap, no concurrency issues. Spikes boot new instances instantly. Self-healing: Crashes restart in other data centers.
* **Key Takeaway**: PHP's single-process model fits perfectly; no overload worries, but scale databases too.
* **Link for More Details**: [Ask AI: Scaling and Concurrency](https://alisol.ir/?ai=Scaling%20and%20Concurrency%7CPHP%20UK%20Conference%7CServerless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli)

## Cold Starts
New instances take 200-800ms (up to 1s for large apps). Rare (0.01% of requests) due to pre-warming based on traffic patterns. Not for real-time apps, but trades predictability for scalability.
* **Key Takeaway**: Subsequent requests are instant; November updates reduced cold starts drastically.
* **Link for More Details**: [Ask AI: Cold Starts](https://alisol.ir/?ai=Cold%20Starts%7CPHP%20UK%20Conference%7CServerless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli)

## Costs and Billing
Pay per ms of execution (blue bars), not idle time (gray). Set budgets, alerts, scaling limits. Spikes like Hacker News or TV appearances cost $0.01-$2. Free tier: 1M invocations/month.
* **Key Takeaway**: Parallel jobs cost the same as sequential but faster; watch long-term high traffic.
* **Link for More Details**: [Ask AI: Costs and Billing](https://alisol.ir/?ai=Costs%20and%20Billing%7CPHP%20UK%20Conference%7CServerless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli)

## Non-HTTP Events and Workers
Use function runtime for S3 (file uploads), SQS (queues), EventBridge (events). Bref invokes your class directly. Native integrations for Laravel queues/Symfony Messenger.
```php
class S3Handler extends Bref\Event\S3\S3Handler {
    public function handleS3Event(S3Event $event): void {
        // Process file
    }
}
```
* **Key Takeaway**: Deploy queues/workers in bref.yaml; keep processes alive like Octane for performance.
* **Link for More Details**: [Ask AI: Non-HTTP Events](https://alisol.ir/?ai=Non-HTTP%20Events%7CPHP%20UK%20Conference%7CServerless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli)

## Use Cases and Examples
Great for small sites (e.g., blogs at $0), large ones (bcast.fm: 100M req/month; Swaap: 1B req/month, saved money from EC2). Monoliths or microservices (Treezor migrated legacy to Lambda, then split).
* **Key Takeaway**: Fits teams needing scale/security without server ops; not for real-time or if you love Kubernetes.
* **Link for More Details**: [Ask AI: Use Cases](https://alisol.ir/?ai=Use%20Cases%7CPHP%20UK%20Conference%7CServerless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli)

## Q&A Highlights
OPCache persists like on servers; no native PHP likely. Limits: 1K instances default (request more), 250MB/10GB app size, 6MB response. Vapor: More user-friendly for Laravel/AWS newbies. Local dev: Like usual servers. Long tasks: 15min max, costs scale with duration. Extensions: Common ones included, others via community repo. Credentials: Env vars or runtime secrets. Telemetry: Anonymous for stats.
* **Key Takeaway**: Cold starts slow requests, not errors; AWS balances load, idles after ~15-60min.
* **Link for More Details**: [Ask AI: Q&A Highlights](https://alisol.ir/?ai=Q%26A%20Highlights%7CPHP%20UK%20Conference%7CServerless%20PHP%3A%20how%20does%20it%20really%20work%3F%20-%20Matthieu%20Napoli)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
