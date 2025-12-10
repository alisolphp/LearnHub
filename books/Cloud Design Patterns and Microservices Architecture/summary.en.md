# Book Summary: Cloud Design Patterns and Microservices Architecture

* **Author**: Danial Khosravi
* **Genre**: Software Engineering, Cloud Computing, Microservices
* **Publication Date**: 2025
* **Book Link**: https://github.com/DannyRavi/cloud_software_farsi

This document summarizes the key lessons and insights extracted from the book.
I highly recommend reading the original book for the full depth and author's perspective.

## Before You Get Started
* I summarize key points from useful books to learn and review quickly.
* Simply click on `Ask AI` links after each section to dive deeper.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## Introduction and Guide

**Summary**: System design involves defining elements, interactions, and relationships to meet specific requirements, breaking down problems into smaller components for effective collaboration. In software engineering, it focuses on high-level architecture and components, crucial for interviews where candidates design systems including architecture, interactions, and trade-offs. The book is structured so each chapter can be studied independently, with explanations in footnotes where needed, minimizing dependencies. Code examples are on GitHub. It covers over 40 patterns and 10 anti-patterns in cloud and microservices architectures, primarily from Microsoft articles.

**Example**: Imagine designing a large software system; you analyze existing setups, identify needs, create a detailed plan, and iterate through testing and refinement, much like piecing together a puzzle where each part fits seamlessly.

**Link for More Details**:
[Ask AI: Introduction and Guide](https://alisol.ir/?ai=Introduction%20and%20Guide%7CDanial%20Khosravi%7CCloud%20Design%20Patterns%20and%20Microservices%20Architecture)

## Data Management Patterns

**Summary**: These patterns help manage data in cloud environments efficiently. Cache-Aside loads data into cache on demand from a data store. CQRS separates read and update operations using different interfaces. Event Sourcing uses an append-only store for sequences of events on domain data. Index Table creates indexes on frequently queried fields for better query performance. Materialized View uses pre-populated views for optimized queries when data isn't ideally formatted. Sharding divides a data store into horizontal partitions. Static Content Hosting deploys static content to cloud storage for direct delivery. Valet Key provides limited direct access to resources.

**Example**: For a high-traffic e-commerce site, use Cache-Aside to fetch product details from a database only when not in cache, reducing load times like grabbing a snack from the fridge instead of going to the store every time.

**Link for More Details**:
[Ask AI: Data Management Patterns](https://alisol.ir/?ai=Data%20Management%20Patterns%7CDanial%20Khosravi%7CCloud%20Design%20Patterns%20and%20Microservices%20Architecture)

## Design and Implementation Patterns

**Summary**: Good designs emphasize consistency, maintainability, and reusability. Ambassador acts as a proxy for client connections, handling tasks like monitoring and security. Anti-Corruption Layer translates between modern and legacy systems. Backends for Frontends creates dedicated backends for specific UIs. CQRS separates reads and writes. Compute Resource Consolidation bundles operations into one unit. Edge Workload Configuration manages diverse workloads. External Configuration Store centralizes config outside deployments. Gateway patterns (Aggregation, Offloading, Routing) handle requests efficiently. Leader Election coordinates distributed tasks. Pipes and Filters break complex tasks into reusable elements. Sidecar deploys components in separate processes for isolation. Static Content Hosting serves static files directly. Strangler Fig gradually replaces legacy with new services.

**Example**: In migrating an old banking app, Strangler Fig lets you swap out outdated login modules with secure new ones piece by piece, like vines slowly overtaking an old wall without tearing it down all at once.

**Link for More Details**:
[Ask AI: Design and Implementation Patterns](https://alisol.ir/?ai=Design%20and%20Implementation%20Patterns%7CDanial%20Khosravi%7CCloud%20Design%20Patterns%20and%20Microservices%20Architecture)

## Messaging Patterns

**Summary**: Distributed cloud apps need messaging infrastructure for loose coupling and scalability. Asynchronous messaging brings benefits but challenges like message ordering and idempotency. Asynchronous Request-Reply decouples frontend from async backend. Claim Check splits large messages. Choreography lets components decide workflows independently. Competing Consumers process messages concurrently. Pipes and Filters reuse elements. Priority Queue prioritizes higher-priority requests. Publisher-Subscriber announces events async without coupling. Queue-Based Load Leveling buffers tasks. Saga manages distributed transactions. Scheduler Agent Supervisor coordinates remote actions. Sequential Convoy processes related messages in order.

**Example**: For an order processing system, Saga coordinates steps like payment and shipping across services, rolling back if one fails, similar to a group hike where everyone adjusts if someone twists an ankle.

**Link for More Details**:
[Ask AI: Messaging Patterns](https://alisol.ir/?ai=Messaging%20Patterns%7CDanial%20Khosravi%7CCloud%20Design%20Patterns%20and%20Microservices%20Architecture)

## Other Cloud Architecture Patterns

**Summary**: Additional patterns for cloud architectures include Throttling to control resource use during high demand. Retry handles transient failures resiliently. Rate Limiting prevents abuse. Messaging Bridge connects heterogeneous systems. Geode deploys services across geographies. Gatekeeper controls access with authentication. Federated Identity simplifies user auth across systems. Deployment Stamp routes traffic for testing. Circuit Breaker pauses on repeated failures. Bulkhead isolates components. Compensating Transaction undoes incomplete transactions. Health Endpoint Monitoring checks service health.

**Example**: Circuit Breaker in a payment gateway stops retrying a failing bank API after a few tries, like flipping a switch to prevent overload, giving time for recovery.

**Link for More Details**:
[Ask AI: Other Cloud Architecture Patterns](https://alisol.ir/?ai=Other%20Cloud%20Architecture%20Patterns%7CDanial%20Khosravi%7CCloud%20Design%20Patterns%20and%20Microservices%20Architecture)

## Cloud Anti-Patterns

**Summary**: Anti-patterns are common flawed processes increasing scalability issues. Busy Database offloads too much to the DB. Busy Front End moves heavy tasks to background. Chatty I/O sends many small network requests. Extraneous Fetching retrieves excess data. Improper Instantiation recreates shareable objects. Monolithic Persistence uses one DB for diverse patterns. No Caching skips temporary storage. Noisy Neighbor overuses resources. Retry Storm retries failures excessively. Synchronous I/O blocks threads.

**Example**: Noisy Neighbor in a shared cloud tenant setup where one user's heavy queries slow everyone else, like a loud party next door disrupting the neighborhood.

**Link for More Details**:
[Ask AI: Cloud Anti-Patterns](https://alisol.ir/?ai=Cloud%20Anti-Patterns%7CDanial%20Khosravi%7CCloud%20Design%20Patterns%20and%20Microservices%20Architecture)

## Ambassador Pattern

**Summary**: Create helper services that send network requests on behalf of a consumer service or app. Ambassador acts as an out-of-process proxy co-located with the client, useful for offloading common client connectivity tasks like monitoring, logging, routing, and security (e.g., TLS). Often used with legacy apps to extend networking capabilities without modification.

**Example**: In a microservices setup, an Ambassador proxy handles retries and circuit breaking for calls to a remote service, freeing the main app from these details, like a personal assistant managing your calls.

**Link for More Details**:
[Ask AI: Ambassador Pattern](https://alisol.ir/?ai=Ambassador%20Pattern%7CDanial%20Khosravi%7CCloud%20Design%20Patterns%20and%20Microservices%20Architecture)

## Anti-Corruption Layer Pattern

**Summary**: Implement a facade or adapter between subsystems with different semantics. This layer translates requests, ensuring one subsystem's design isn't compromised by external dependencies. Useful in gradual migrations from legacy to modern systems.

**Example**: When integrating a new CRM with an old inventory system, the layer converts modern API calls to legacy formats, acting as a translator in a bilingual conversation.

**Link for More Details**:
[Ask AI: Anti-Corruption Layer Pattern](https://alisol.ir/?ai=Anti-Corruption%20Layer%20Pattern%7CDanial%20Khosravi%7CCloud%20Design%20Patterns%20and%20Microservices%20Architecture)

## Asynchronous Request-Reply Pattern

**Summary**: Decouple backend processing from the frontend host when backend must be async but frontend needs a clear response. This handles scenarios where immediate replies aren't feasible due to async nature.

**Example**: A web app submits a long-running job; the frontend gets an immediate acknowledgment, polling later for results, like ordering food online and getting a tracking link.

**Link for More Details**:
[Ask AI: Asynchronous Request-Reply Pattern](https://alisol.ir/?ai=Asynchronous%20Request-Reply%20Pattern%7CDanial%20Khosravi%7CCloud%20Design%20Patterns%20and%20Microservices%20Architecture)

## Noisy Neighbor Anti-Pattern

**Summary**: In multitenant systems, one tenant disproportionately uses resources, impacting others. Monitor usage, apply governance like throttling or quotas, reserve capacity, or migrate to single-tenant for sensitive workloads.

**Example**: In a shared database, one app's massive queries slow queries for all, like a neighbor blasting music late at night.

**Link for More Details**:
[Ask AI: Noisy Neighbor Anti-Pattern](https://alisol.ir/?ai=Noisy%20Neighbor%20Anti-Pattern%7CDanial%20Khosravi%7CCloud%20Design%20Patterns%20and%20Microservices%20Architecture)

## Retry Storm Anti-Pattern

**Summary**: Excessive, frequent retries by clients when a service is unavailable can hinder recovery and worsen issues. Limit retries, add delays (e.g., exponential backoff), handle errors properly, and use circuit breakers.

**Example**: During a brief outage, clients retry immediately and endlessly, overwhelming the recovering server, like a crowd pushing at a jammed door.

**Link for More Details**:
[Ask AI: Retry Storm Anti-Pattern](https://alisol.ir/?ai=Retry%20Storm%20Anti-Pattern%7CDanial%20Khosravi%7CCloud%20Design%20Patterns%20and%20Microservices%20Architecture)

## Synchronous I/O Anti-Pattern

**Summary**: Blocking the calling thread until I/O completes reduces efficiency and vertical scalability. Replace with async I/O to free threads for other work, improving resource utilization.

**Example**: Uploading a file synchronously waits idle; async lets the thread handle other requests meantime, like multitasking while waiting for coffee to brew.

**Link for More Details**:
[Ask AI: Synchronous I/O Anti-Pattern](https://alisol.ir/?ai=Synchronous%20I%2FO%20Anti-Pattern%7CDanial%20Khosravi%7CCloud%20Design%20Patterns%20and%20Microservices%20Architecture)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
* Website: [alisol.ir](https://alisol.ir)
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
