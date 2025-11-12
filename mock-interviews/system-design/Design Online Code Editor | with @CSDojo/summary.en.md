# System Design of an Online Code Editor with @CSDojo  
*(System Design Mock Interview Summary)*

- **System Design Mock Interview**: **System Design of an Online Code Editor with @CSDojo**  
- **Channel**: **Gaurav Sen**  
- **Duration**: **00:24:39**
- **Original Video**: https://www.youtube.com/watch?v=07jkn4jUtso  

> *This document summarizes the key content of a system design mock interview. Watching the full video is still recommended if you have the time.*  

---

## 2) One-Page Executive Summary (2–3 min skim)

**Problem Prompt (One-liner)**  
Design the backend for a remote code execution engine that powers an online IDE, supporting thousands of concurrent users, low latency, and interactive interpreter-like sessions.

**Primary Scope (in-scope as stated)**

- Turning “batch-style” competitive programming execution into a **request/response** online IDE experience.
- Handling **remote code execution** safely via containers.
- Managing **job scheduling** and **queues** to avoid overloading servers.
- Supporting both **file-style execution** and **interactive interpreter** behavior.
- Maintaining **session state** for long IDE sessions (e.g., Python shell style).
- Handling **container crashes**, health checks, and recovery.

**Out of Scope (as explicitly de-emphasized)**

- Detailed **front-end product UX** (spinners, ads, UI polish) — offloaded to the “product team”.
- Detailed **database schema design** beyond simple mappings (session → code, request → metadata).
- Concrete **security hardening details** beyond stating the need for isolation via containers.
- Full **multi-language runtime installation details** (only discussed conceptually).

**Non-Functional Priorities (from the video)**

- **Low latency**: Execution should “feel like” local compilation/execution.
- **Scalability**: Must handle spikes like thousands of simultaneous users.
- **Isolation & security**: User code must not compromise other users or infrastructure.
- **Fault tolerance**: Containers and servers **will** crash; the system must recover gracefully.
- **Cost awareness**: Per-user containers may be too expensive; consider sharing containers.
- **User experience**: Avoid long hangs; communicate timeouts and errors clearly.

**Key Constraints & Numbers (stated)**

- Up to **5,000 concurrent users** in the example scenario.
- A **queue time-to-live (TTL)** / overall execution timeout of about **10 seconds** is suggested for jobs.
- Code is treated as **text** plus metadata: language (Python, Java, C++), profile/session ID, timestamp.
- Responses include **stdout**, **stderr**, and an indication of **timeout**.

**High-Level Architecture (Text)**

1. **Browser-based IDE**  
   - Sends code text, language, and profile/session identifiers to the backend.

2. **API Server / Gateway**  
   - Accepts requests, returns quick **acknowledgements**, and later returns results.  
   - May be **stateful** (for mapping request IDs to metadata and/or session state) in some designs.

3. **Task Queue / Job Scheduler**  
   - Decouples incoming request rate from available compute.  
   - Stores tasks, enforces TTL (e.g., 10 seconds), and handles timeouts.

4. **Worker Fleet in Containers**  
   - A pool of pre-warmed **Linux containers** executing user code.  
   - Each worker pulls tasks, executes code, produces stdout/stderr or timeout.

5. **Result Event Channel**  
   - Workers emit events back to the server: `(request_id, result)`.

6. **Persistent Storage**  
   - Stores **session → code so far** and possibly **request → metadata** for crash recovery.  
   - Used to reconstruct interpreter state by replaying code if containers die.

7. **Health Service**  
   - Performs **/health** checks on containers.  
   - Recreates containers and updates mappings if a container fails.

8. **Horizontal Partitioning**  
   - Users partitioned by ID ranges across different server “regions” or clusters to reduce blast radius.

**Top Trade-offs**

- **Stateless vs stateful server** for interpreter sessions.
- **Per-session container** vs **shared containers with per-session processes**.
- **Synchronous request/response** vs **queued, potentially delayed execution**.
- **Strict isolation (one user per container)** vs **multi-tenancy** for cost efficiency.
- **Single-region deployment** vs **user-ID-based partitioning across regions**.

**Biggest Risks / Failure Modes**

- **Container crashes** mid-session causing state loss if not recovered from persisted code.
- **Queue overload** leading to extended wait times and timeouts.
- **Health-check overhead** when thousands of containers must be monitored.
- **Multi-tenant containers** leading to noisy-neighbor issues (CPU/memory contention).
- **Network partitions or slow networks** delaying requests and making timeouts ambiguous.

**5-Min Review Flashcards**

1. **Q:** Why use a **queue** between the API server and execution containers?  
   **A:** To decouple incoming request rate from compute capacity and apply backpressure instead of overloading workers.

2. **Q:** What does the **request** from the IDE contain?  
   **A:** Code text, profile/session ID, language, and possibly a timestamp.

3. **Q:** What does the **response** contain?  
   **A:** stdout, stderr, and possibly a timeout/exception status.

4. **Q:** When is a **stateful server** preferred in this design?  
   **A:** When supporting interpreter-like sessions where the server keeps session state (e.g., “code so far”) instead of the browser resending everything.

5. **Q:** How can we **recover** from a container crash?  
   **A:** Use persisted session code, spin up a new container, replay the code, and relink the session to the new container.

6. **Q:** Why is a **per-session container** appealing?  
   **A:** It simplifies execution semantics: each user has a tiny “OS-like” sandbox with its own files, network, and runtime.

7. **Q:** Why might per-session containers be **too expensive**?  
   **A:** With thousands of concurrent users, container startup, resource consumption, and health-checking overhead can become a bottleneck.

8. **Q:** How does **horizontal partitioning** by user ID help?  
   **A:** Failures or overload in one partition affect only that subset of users, not everyone.

9. **Q:** What is the key **non-functional priority** compared to a batch judge?  
    **A:** Real-time feel (low latency) dominates over massive batch throughput.

10. **Q:** Why might engineers prefer **stateless** services in general?  
    **A:** Statelessness simplifies scaling and crash recovery, as any instance can serve any request using externalized state.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

## 3) Interview Tags (for later filtering)

**Domain/Industry**

- `collaboration`

**Product Pattern**

- `queue`
- `job-scheduler`

**System Concerns**

- `low-latency`
- `high-availability`
- `backpressure`
- `autoscaling`
- `multi-tenancy`

**Infra/Tech (only as explicitly mentioned/conceptually present)**

- `container` (conceptually; Linux containers discussed, though not in the provided tag list name)
- The video also describes a **task queue** and **workers**, and mentions **Celery** as an example of an open-source task system (Python-based).

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

## 4) Problem Understanding

**Original Prompt (paraphrased)**  
Start from a remote code execution engine used for programming competitions and extend/redesign it into an **online IDE** backend where thousands of users execute code concurrently and expect **fast, interactive results**, similar to running code locally.

**Use Cases (from the video)**

- Run code written in a browser-based editor, get output quickly.
- Support multiple languages (Python, Java, C++).
- Provide an **interactive interpreter** experience (e.g., Python REPL in the browser).
- Handle long-lived sessions where users type for tens of minutes and repeatedly run code.
- Continue to function with reasonable behavior under heavy load.

**Secondary Use Cases (hinted)**

- Competitive programming style use (batch evaluation) still possible with the same execution engine.
- Supporting different user regions/segments through partitioning.

**Out of Scope (from discussion)**

- Detailed UI/UX decisions like what to show while “thinking” (spinner, ad, other products).
- Detailed authentication, authorization, and billing.
- Detailed data analytics, logging, and metrics beyond simple health checks.

**APIs (as discussed)**

- **Request (from browser to server)**  
  - `profile_id` or `session_id`  
  - `code_text` (entire file or incremental snippet)  
  - `language` (e.g., "python", "java", "cpp")  
  - Possible additional metadata like timestamps.

- **Response (from server back to browser)**  
  - `stdout` (standard output of the program)  
  - `stderr` (error output, including exceptions)  
  - `status` (success, error, timeout)  
  - In timeout cases, a message along the lines of “too much server load” or network problems.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

## 5) Requirements & Constraints

### 5.1 Functional Requirements

**Given in Video**

- Accept code from users via a web-based IDE.
- Execute code remotely inside isolated containers.
- Support multiple languages (Python, Java, C++).
- For “file-style” execution, run the entire code base and return its output.
- For interpreter-style behavior:
  - Maintain **state** across multiple commands in a session.
  - Allow users to type a line, execute, see result, and continue.
- Manage **many concurrent sessions** (thousands).
- Handle **timeouts**, surfacing clear timeout errors to users.
- Detect container crashes and recover.

**Assumptions (explicitly labeled)**

- **Assumption:** User authentication exists, but the video does not detail how it works.
- **Assumption:** File persistence (saving/opening projects) is outside the core execution design discussed here.

### 5.2 Non-Functional Requirements

**Given in Video**

- Low latency: the experience should feel close to local execution.
- System must not overload: job scheduling and container management must throttle work.
- Simple, scalable mental model: queues decouple “request arrival rate” from “compute capacity”.
- High availability: failures in one partition or region should not take down all users.
- Support for horizontal scaling: adding more servers or containers as user count grows.

**Assumptions**

- **Assumption:** Latency target is within “a few seconds” of user action, but no strict numeric SLO is specified.
- **Assumption:** Consistency can be “session-strong” (each session sees its own state correctly) without cross-session consistency requirements.

### 5.3 Capacity Inputs

**Given in Video**

- Example of **5,000 concurrent users**.
- Jobs may be timed out after around **10 seconds** in the queue/execution path.

**Missing / Not Stated**

- Exact QPS, read/write ratios.
- Daily data volume, retention periods.
- Per-session memory/CPU budgets.
- Number of regions or data centers.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

## 6) Back-of-the-Envelope Estimation

- **Numerical details (beyond the 5,000 concurrent users example) are not provided in the video.**  
- No explicit storage sizes, bandwidths, or cache hit rates are discussed.
- Shard counts, partition sizes, and specific throughput targets are not given.

**Conclusion:** *Not stated in video—skipping numerical estimation.*  

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

## 7) High-Level Architecture

1. **Client (Browser IDE)**  
   - Hosts editor and optional shell view.  
   - Sends code to backend via HTTP or similar request/response protocol.  
   - Displays spinner / “thinking” state while waiting for results.

2. **API Gateway / Reverse Proxy**  
   - Receives execution requests.  
   - Immediately **acknowledges** that the request is received.  
   - Stores or looks up mapping from `request_id` to user/session.  
   - Eventually returns results when computation finishes.

3. **Task Queue**  
   - Holds pending execution jobs.  
   - Isolates arrival rate from worker processing rate.  
   - Enforces **TTL** for jobs, dropping jobs and returning **timeout** after ~10 seconds.

4. **Worker Containers**  
   - Pre-warmed **Linux containers** hosting language runtimes (Python, Java, C++).  
   - Pull jobs from the queue, run the code in isolation, capture `stdout` and `stderr`.  
   - Emit result events: `(request_id, result)` back to the main server.

5. **Session State Store**  
   - For interpreter-style sessions, maps `session_id → code_so_far` (and potentially other metadata).  
   - Used to append new lines and maintain state for the interpreter.  
   - Used to **replay code** when a container crashes, recreating state.

6. **Container Manager + Health Service**  
   - Monitors containers periodically via `/health`.  
   - Recreates containers on failures.  
   - Updates mappings: `session_id → container_address` when a new container is spawned.

7. **Horizontal Partitioning Layer**  
   - Assigns ranges of user IDs to clusters/regions.  
   - Ensures that failures are localized to subsets of users.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

## 8) Deep Dives by Subsystem

### 8.1 Subsystem: Request/Response Execution

**Role & Responsibilities**

- Front-door for execution requests from the browser.
- Translates HTTP requests into tasks placed on the execution queue.
- Relays results back to the user upon task completion.

**Data Model (from video)**

- `Request`  
  - `request_id`  
  - `profile_id` / `session_id`  
  - `language`  
  - `code_text`  
  - `timestamp` (optional example given)

- `Result`  
  - `request_id`  
  - `stdout`  
  - `stderr`  
  - `status` (success/exception/timeout)

**APIs / Contracts (implied)**

- **POST /execute**  
  - Body: request fields above.  
  - Response: immediate acknowledgment (`request_id`) + later result.

- Exact endpoint paths and formats: **Not stated in video**.

**Scaling & Partitioning**

- API tier can be scaled horizontally by adding more instances behind a load balancer.
- Requests may be routed based on user ID to specific partitions for locality.

**Failure Handling**

- If queue TTL expires, server returns **timeout** to user.  
- If server receives a very delayed request (e.g., network delay), it may treat it as timed out.

[Ask AI: Subsystem - Request/Response Execution](https://alisol.ir/?ai=Subsystem%20-%20Request%2FResponse%20Execution%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

### 8.2 Subsystem: Task Queue & Workers

**Role & Responsibilities**

- Queue: buffers jobs when there are more incoming requests than available worker capacity.
- Workers: pull, execute, and publish results.

**Data Model**

- **Queue entry**: `(request_id, code_text, language, session_id, metadata)`.
- **Result event**: `(request_id, result)` with stdout/stderr/status.

**Mentioned Technologies**

- A generic “task queue” abstraction.  
- Example: **Celery** (referred to as a Python-based task assignment system).

**Scaling & Partitioning**

- Increase worker count to handle more jobs.  
- Scale queue infrastructure separately from the API servers.

**Bottlenecks & Hot Spots**

- Queue congestion when execution jobs are long or workers are saturated.
- Potentially large job backlogs causing timeouts.

**Failure Handling**

- Jobs that exceed TTL are dropped and turned into user-visible timeouts.
- Workers may fail mid-execution; the system decides whether to retry or surface an error.

[Ask AI: Subsystem - Task Queue & Workers](https://alisol.ir/?ai=Subsystem%20-%20Task%20Queue%20%26%20Workers%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

### 8.3 Subsystem: Session State & Containers

**Role & Responsibilities**

- Preserve session-specific code state for interpreter-style workflows.
- Provide each user (or group of users) with a logical execution environment.

**Design Variants Discussed**

1. **Stateless Server Variant**  
   - Browser keeps all past commands (lines of code).  
   - Each request sends **all commands so far** to the server.  
   - Execution remains correct even if server loses state.  
   - Drawback: sending thousands of lines each time hurts latency and UX.

2. **Stateful Server Variant (Chosen for Interpreter Case)**  
   - Server keeps a mapping: `session_id → code_so_far`.  
   - Browser sends only the **new line(s)**.  
   - Server appends and executes them in a container linked to that session.  
   - Better UX for long-running sessions.

**Per-Session Container vs Shared Container**

- **Per-session container**  
  - Simple mental model: one tiny OS per user.  
  - Strong isolation.  
  - Expensive if there are thousands of concurrent users.

- **Shared containers with multiple sessions**  
  - Each container runs multiple processes / languages.  
  - Sessions `s1, s2, ...` mapped to the same container.  
  - More efficient resource usage but increased complexity and potential interference.

**Crash Recovery**

- Persist `code_so_far` in a database or stable store.  
- On container crash:
  - Spin up a new container.
  - Replay all stored code sequentially to reestablish interpreter state.
  - Rebind `session_id` → new container.

[Ask AI: Subsystem - Session State & Containers](https://alisol.ir/?ai=Subsystem%20-%20Session%20State%20%26%20Containers%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

### 8.4 Subsystem: Health Monitoring & Recovery

**Role & Responsibilities**

- Detect failing or unhealthy containers.
- Replace failed containers and update session mappings.

**Mechanics**

- Each container exposes a **`/health`** endpoint.
- A dedicated **Health Service** periodically pings containers:
  - If `/health` is OK, container is considered alive.
  - If not, after one or more failed checks, container is considered dead.

**Remediation**

- Spin up a new container instance.
- Update any `session_id → container_address` mappings that pointed to the failed container.
- Use persisted code to reconstruct interpreter state in the new container if needed.

**Cost & Complexity**

- With thousands of containers, health checks become a heavy background load.  
- The video suggests careful health-check frequency and potentially sharing containers to reduce the number of endpoints.

[Ask AI: Subsystem - Health Monitoring & Recovery](https://alisol.ir/?ai=Subsystem%20-%20Health%20Monitoring%20%26%20Recovery%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

### 8.5 Subsystem: Horizontal Partitioning & Multi-tenancy

**Role & Responsibilities**

- Avoid single points of failure that impact all users.
- Localize failures to subsets of users.

**Approach**

- Partition users by **user ID ranges**, e.g.:  
  - Users 1–200 → Region/Cluster A  
  - Users 201–400 → Region/Cluster B  
  - Users 401+ → Region/Cluster C  
- Each region has its own:
  - API servers
  - Containers
  - Queues

**Benefits**

- If one cluster crashes, only users mapped to that cluster are affected.
- Makes it easier to scale subsets of users independently.

**Multi-tenancy Consideration**

- Within each cluster, multiple sessions can map to the same container to reduce cost.
- Needs careful resource management inside containers to avoid interference.

[Ask AI: Subsystem - Horizontal Partitioning & Multi-tenancy](https://alisol.ir/?ai=Subsystem%20-%20Horizontal%20Partitioning%20%26%20Multi-tenancy%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

## 9) Trade-offs & Alternatives

| Topic                                   | Option A                                 | Option B                                    | Video’s Leaning                  | Rationale (from video)                                                                 |
| --------------------------------------- | ---------------------------------------- | ------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------- |
| Server state for interpreter sessions   | Stateless server; browser resends all code | Stateful server keeps `code_so_far`       | **Stateful for interpreter**     | Stateless is robust but hurts UX with large code; stateful is more practical.         |
| Container per user vs shared containers | One container per user/session           | Many sessions per container                 | **Leans toward sharing**         | Per-user containers are expensive at 5,000 concurrency; sharing reduces overhead.      |
| Sync vs async execution                 | Pure request/response, no queue          | Async via queue, with acknowledgments       | **Queue-based architecture**     | Queue isolates request rate from compute capacity and prevents overload.              |
| Mapping users to clusters               | Single global cluster                     | Partition by user ID / region               | **Partitioned by user ID ranges**| Localizes failures and supports independent scaling.                                   |
| State reconstruction after crash        | Don’t reconstruct; ask user to retry      | Replay persisted session code in new container | **Reconstruction via replay** | Better UX: user doesn’t lose work; uses persisted code as the source of truth.        |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

## 10) Reliability, Availability, and Performance

**Reliability**

- Containers and servers are assumed to **crash occasionally**.
- Reliability is achieved by:
  - Persisting session code.
  - Health checks and automatic container recreation.
  - Using TTLs on queue entries to avoid stuck tasks.

**Availability**

- Horizontal partitioning by user ID ensures that a crash in one cluster doesn’t affect all users.
- Adding more servers/containers increases capacity for both execution and availability.

**Performance & Latency**

- Queue separates front-door latency from execution time:
  - Immediate ack: “We got your job.”
  - Later result: could be fast, or could timeout.
- Use of pre-warmed containers reduces cold-start latency.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

## 11) Security & Privacy

- The video emphasizes **isolation via containers** to avoid overloading or compromising host services.
- Specific security measures (resource limits, network isolation, file system restrictions, sandboxing policies, PII handling) are **not detailed**.

**Security Details:** *Not stated in video.*  

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

## 12) Observability

**Metrics & Health**

- Primary observability mechanism discussed is **health checking** containers via `/health`.
- No explicit mention of logs, traces, or dashboards.

**Observability Details:** *Not stated in video beyond health checks.*  

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

## 13) Follow-up Questions (from interviewer)

Intent of the follow-ups in the conversation:

- **“How would you make this suitable for an online IDE where thousands of people use it at the same time?”**  
  → Pushes candidate to move from batch evaluation to real-time latency concerns.

- **“Will this architecture be stateless?”**  
  → Forces candidate to reason about stateful vs stateless designs, especially for interpreter sessions.

- **“How often will these containers crash?”**  
  → Encourages thinking about fault tolerance and system reliability assumptions.

- **“If we have 5,000 concurrent users, do we need 5,000 containers?”**  
  → Probes candidate’s scaling strategy and cost awareness.

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

## 14) Candidate Questions (modeled from the video)

These represent the kinds of clarifying questions the interviewee effectively explores:

- “Are we designing for **batch evaluation** (like coding competitions) or a **real-time online IDE** experience?”
- “Is the code execution pattern more like a **compiler** (whole file) or an **interpreter** (line by line)?”
- “Can we assume users have long-lived sessions, potentially up to **30 minutes** or more?”
- “Are we allowed to maintain **state on the server** for each session, or must we keep everything stateless?”
- “Is it acceptable to spin up a **container per session**, or should we consider **multi-tenant containers** due to cost?”

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

## 15) Key Takeaways

1. **Online IDEs prioritize real-time latency** over batch throughput — design choices follow that priority.
2. **Task queues** are crucial to separate traffic spikes from compute capacity, preventing overload.
3. **Containers** provide a strong isolation boundary and are central to secure code execution.
4. For **interpreters**, **stateful servers** with session state are often more practical than purely stateless designs.
5. **Per-session containers** are conceptually clean but can be prohibitively expensive at scale; sharing containers is often necessary.
6. Persisting **session code** enables robust recovery after container crashes via replay.
7. **Health checks** plus auto-recreation of containers form the backbone of runtime reliability.
8. **Horizontal partitioning** of users limits the blast radius of failures and simplifies scaling.
9. Balancing **UX, cost, and safety** is the underlying theme: every design choice trades these off in different ways.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

## 16) Glossary

- **Remote Code Execution Engine**  
  A backend system that receives source code, executes it on servers, and returns output.

- **Container**  
  A lightweight, isolated environment (like a tiny OS) that runs code with its own filesystem, network, and processes.

- **Task Queue**  
  A service where jobs are enqueued and later picked up by workers, decoupling producers and consumers.

- **Worker**  
  A process (often inside a container) that pulls tasks from a queue and executes them.

- **Stateless Service**  
  A service that does not retain session-specific data between requests; state is externalized.

- **Stateful Service**  
  A service that keeps session-specific data in memory or local storage across multiple requests.

- **Session ID**  
  An identifier for a user’s ongoing interaction with the system (e.g., one tab in the IDE).

- **Health Check (`/health`)**  
  A lightweight endpoint used to verify that a container or service is alive and functioning.

- **Horizontal Partitioning**  
  Splitting users or data into ranges (shards) and assigning each range to different clusters or regions.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo)

---

## 18) Attribution

- **Source Video**: https://www.youtube.com/watch?v=07jkn4jUtso  
- **Channel**: **Gaurav Sen**  
- **Note**: This document is a summary of the linked mock interview. All architectural details are derived from the conversation in the video.

---

## 19) About the summarizer

I'm **Ali Sol**, a PHP Developer. Learn more:

- Website: [alisol.ir](https://alisol.ir)  
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)  
