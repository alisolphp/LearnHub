# Building Fast APIs and Middlewares: Mezzio   Swoole

* **Platform**: YouTube
* **Channel/Creator**: GrUSP
* **Duration**: 00:39:42
* **Release Date**: Dec 5, 2024
* **Video Link**: [https://www.youtube.com/watch?v=NIUKeTKu9ik](https://www.youtube.com/watch?v=NIUKeTKu9ik)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=47fdb3b8 -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Building%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Building%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Building%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Building%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Building%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Building%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Building%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Building%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Building%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Building%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Building%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Building%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Building%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Building%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Building%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Building%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole)
<!-- LH-BUTTONS:END -->

## Speaker Introduction and Background
The speaker, Barar Dei from Nigeria, shares his experience as a senior software architect at ABA and King Systems and founder of Inability. He leads a team building end-to-end software for digital insurance companies, focusing on seamless, low-bug products. This is his second talk to PHP developers, covering Mezzio and Swoole for fast APIs.
* **Key Takeaway**: Contributions to projects like Oku Shad for Kubernetes highlight practical expertise in building systems that ease daily life.
* **Link for More Details**: [Ask AI: Speaker Background](https://alisol.ir/?ai=Speaker%20Background%7CGrUSP%7CBuilding%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole)

## Why APIs Need to Be Fast
In today's digital world, users demand quick responses—attention spans are short, and modern frontend frameworks like Angular, Vue, and React push for speed. Fast APIs serve impatient customers, supporting both private frontends and public external clients, plus long-running jobs.
* **Key Takeaway**: Mezzio and Swoole combo powers private/public APIs and tasks, ensuring efficiency without waiting for processes like loading spinners.
* **Link for More Details**: [Ask AI: Importance of Fast APIs](https://alisol.ir/?ai=Importance%20of%20Fast%20APIs%7CGrUSP%7CBuilding%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole)

## Introduction to Mezzio
Mezzio, evolved from Zend Expressive, builds PSR-15 middleware applications with layered architecture. It handles PSR-7 messages, supports routers like FastRoute, Aura Router, and Laminas Router, and enables dependency injection via PSR-11 (e.g., Laminas Service Manager). Templating options include Twig, Plates, and Laminas View, with error handling via Whoops.
* **Key Takeaway**: Focus on API-building without deep templating dives, but it's great for structured, middleware-based projects.
* **Link for More Details**: [Ask AI: Mezzio Overview](https://alisol.ir/?ai=Mezzio%20Overview%7CGrUSP%7CBuilding%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole)

## Understanding Middlewares in Mezzio
Middlewares sit between requests and responses, processing incoming requests, taking actions, and either returning responses or delegating to the next layer. They follow PSR-15 interfaces: Handle method for requests/responses, Process for delegation. This enables neat workflows like authentication followed by access control.
* **Key Takeaway**: Benefits include composable building blocks, lightweight organization, reusable code across endpoints, and interoperability. Pipelines route requests, dispatching matches or falling to 404 handlers.
```php
// Sample PSR-15 RequestHandlerInterface
public function handle(ServerRequestInterface $request): ResponseInterface;
```
* **Link for More Details**: [Ask AI: Mezzio Middlewares](https://alisol.ir/?ai=Mezzio%20Middlewares%7CGrUSP%7CBuilding%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole)

## Code Examples with Mezzio Middlewares
Routes define HTTP methods (POST, GET, etc.) with reusable middlewares. For instance, a "find user by email" middleware checks databases, adds attributes to requests for next layers (e.g., create user if not found, or check password for login). Callable middlewares allow inline functions matching PSR-15 signatures.
* **Key Takeaway/Example**: In signup, if user exists (from attribute), throw exception; else create. In login, if not found, throw exception. This reuse keeps code DRY.
```php
// Sample route with reusable middleware
$app->post('/api/users/signup', [
    FindUserByEmail::class,
    CreateUser::class,
]);
```
* **Link for More Details**: [Ask AI: Mezzio Code Examples](https://alisol.ir/?ai=Mezzio%20Code%20Examples%7CGrUSP%7CBuilding%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole)

## Getting Started and Additional Mezzio Features
Start with `composer create-project laminas/laminas-mezzio-skeleton`. Additional middlewares cover problem details for structured errors, OAuth2 for authorization.
* **Key Takeaway**: Skeleton provides a quick setup for middleware pipelines.
* **Link for More Details**: [Ask AI: Starting with Mezzio](https://alisol.ir/?ai=Starting%20with%20Mezzio%7CGrUSP%7CBuilding%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole)

## Introduction to Swoole
Swoole is an event-driven, async, coroutine-based concurrency library for high-performance PHP. It creates servers for HTTP, WebSocket, TCP, UDP. Unlike traditional PHP (e.g., Apache), it loads apps once in memory, avoiding repeated bootstrapping for faster requests.
* **Key Takeaway**: Directions include Swoole and OpenSwoole; choose based on needs.
* **Link for More Details**: [Ask AI: Swoole Basics](https://alisol.ir/?ai=Swoole%20Basics%7CGrUSP%7CBuilding%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole)

## Swoole Architecture and Features
Manager process bootstraps the app in memory, forking to event/web workers for requests (isolated, one request per worker). Task workers handle long-running jobs. Scale workers for traffic. Supports Docker, Xdebug (from v5.0).
* **Key Takeaway**: Persistent memory state speeds up subsequent requests compared to traditional PHP.
* **Link for More Details**: [Ask AI: Swoole Architecture](https://alisol.ir/?ai=Swoole%20Architecture%7CGrUSP%7CBuilding%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole)

## Coroutines and Concurrency in Swoole
Coroutines enable concurrent execution (e.g., 10,000 MySQL queries in 0.2s). Channels share data between coroutines; wait groups/barriers sync multiple ones. Connection pools for MySQL/PostgreSQL/Redis auto-reconnect on timeouts.
* **Key Takeaway/Example**: Run two calls concurrently and join results.
```php
// Sample coroutine
go(function () { /* task1 */ });
go(function () { /* task2 */ });
```
* **Link for More Details**: [Ask AI: Swoole Coroutines](https://alisol.ir/?ai=Swoole%20Coroutines%7CGrUSP%7CBuilding%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole)

## Combining Mezzio and Swoole
Install via Composer/PECL, configure for coroutines, workers, host/port. Enable task coroutines. Start server to bootstrap Mezzio in memory.
* **Key Takeaway**: Simple setup: `composer require mezzio/mezzio-swoole`.
* **Link for More Details**: [Ask AI: Mezzio with Swoole](https://alisol.ir/?ai=Mezzio%20with%20Swoole%7CGrUSP%7CBuilding%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole)

## Practical Examples: Async Tasks and Cron Jobs
Use coroutines for async emails (e.g., OTP via SendGrid) without blocking responses. Delegate long-running tasks (e.g., Azure image recognition) to task workers via delegators. For cron jobs, use timers/event loops to schedule and dispatch events/classes.
* **Key Takeaway/Example**: In middleware, `Co\run(function() { sendOtp(); });` returns response fast, email sends async. For tasks: `$server->task($model);`.
```php
// Sample task delegator
$server->on('task', function ($server, $taskId, $reactorId, $data) { /* process */ });
```
* **Link for More Details**: [Ask AI: Swoole Async Examples](https://alisol.ir/?ai=Swoole%20Async%20Examples%7CGrUSP%7CBuilding%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole)

## Benchmarks, Considerations, and Challenges
Benchmarks show Swoole outperforming regular PHP, NGINX combos (links provided). Considerations: Scale workers for load, keep services stateless (avoid sessions), use factories for lazy instantiation (e.g., Azure blobs). Wrap Doctrine connections in delegators to handle timeouts.
* **Key Takeaway**: Learned lessons: Factory factories prevent timeouts; decorators reopen closed connections.
* **Link for More Details**: [Ask AI: Swoole Benchmarks and Challenges](https://alisol.ir/?ai=Swoole%20Benchmarks%20and%20Challenges%7CGrUSP%7CBuilding%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole)

## Resources and Q&A
Resources: Mezzio docs, Swoole English docs, Doctrine integration. Q&A covers: Manager recreates crashed workers on 500s; coroutines are C-extension based (not fibers); Xdebug essential for Swoole dev, restart server on code changes (or use hot reload).
* **Key Takeaway**: Slides available online; rate the talk positively.
* **Link for More Details**: [Ask AI: Mezzio Swoole Resources](https://alisol.ir/?ai=Mezzio%20Swoole%20Resources%7CGrUSP%7CBuilding%20Fast%20APIs%20and%20Middlewares%3A%20Mezzio%20%20%20Swoole)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
