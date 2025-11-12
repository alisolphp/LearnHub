# System Design Mock Interview: Design WhatsApp | Chat Messaging Systems

- **Channel/Interviewer**: Gaurav Sen 
- **Duration**: 00:25:12 
- **Original Video**: https://www.youtube.com/watch?v=vvhC64hQZMk 

*This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.* 

---

## One-Page Executive Summary (2–3 min skim)

- **Problem Prompt (One-liner)**: Design a WhatsApp-style chat app supporting 1:1 messaging, groups, media messages, and read/delivered receipts, with online/last-seen indicators.
- **Primary Scope**
 - **In scope**: 1:1 chat; group messaging (fan-out to members); message persistence/retry; sent/delivered/read receipts; “online/last seen”; gateways; session routing; decoupled microservices; basic load-balancing and retries; idempotency.
 - **Out of scope**: Deep auth details; full image/video pipeline (referenced to a separate video); global search; heavy analytics; group delivery receipts per member (called “expensive” and often omitted).
- **Non-Functional Priorities**: Real-time delivery, horizontal scalability, high availability (no single points of failure), graceful degradation under load, cost awareness (minimize memory on gateways).
- **Key Constraints & Numbers** (as stated): Group size capped (example: ≈200) to avoid unbounded fan-out; “temporary” vs “permanent” chat retention discussed conceptually (no hard numbers).
- **High-Level Architecture (Text)**
 1. **Mobile client** maintains a **WebSocket** with a **Gateway**.
 2. Gateways are “dumb” TCP endpoints—offload logic to services.
 3. **Session Service** tracks user↔connection (box) mappings and routes messages.
 4. **Group Service** maps group→members; queried by Session for fan-out.
 5. **Parser/Unparser Service** converts external payloads (e.g., JSON over HTTP/WebSocket) to internal RPC objects (e.g., **Thrift**).
 - [Personal note: Consider gRPC/Protobuf over Thrift in 2025 for broader ecosystem support and first-class HTTP/2.] 
 6. **Message Store/Queue** persists messages and handles retries/idempotency.
 7. **Last-Seen Service** updates and serves online/last-seen timestamps.
 8. **Load balancer + service discovery/heartbeats** across all tiers.
- **Top Trade-offs**
 - WebSockets vs HTTP long-polling (real-time vs simplicity).
 - Fan-out at send time vs pull/batching (latency vs cost/pressure).
 - “Dumb” gateways vs richer edges (memory/scale vs features).
 - Transient (device-only) storage vs durable server store (privacy/cost vs reliability/compliance).
 - Strict receipts (per member) vs partial/omitted receipts (accuracy vs performance).
- **Biggest Risks/Failure Modes**
 - Gateway memory pressure from many TCP connections.
 - Hot groups causing bursty fan-out and backpressure.
 - Coupling session state into gateways → duplication & failures.
 - Retry storms without idempotency keys.
 - Over-prioritizing non-essential signals (e.g., last-seen) during global spikes.
- **5-Min Review Flashcards**
 - **Q:** Why WebSockets for chat? **A:** True server→client pushes with low latency; avoids polling. 
 - **Q:** What does the Session service store? **A:** User→gateway/connection mapping to route messages. 
 - **Q:** Where is group membership stored? **A:** Group Service (decoupled from Session). 
 - **Q:** How do you reduce gateway memory/CPU? **A:** Keep them “dumb”; offload parsing/auth; externalize session state. 
 - **Q:** How to avoid single points of failure? **A:** Replicate services, use service discovery/heartbeats and load balancers. 
 - **Q:** How are receipts implemented? **A:** ACKs from client propagate back; store/persist for retries. 
 - **Q:** What to de-prioritize during New Year spikes? **A:** Last-seen, delivery/read receipts—focus on message send/ACK. 
 - **Q:** How to tame fan-out for big groups? **A:** Cap group size; consider batching/pull for extremes. 
 - **Q:** Why idempotency here? **A:** Retries are common; idempotent sends prevent duplicates. 
 - **Q:** Consistent hashing usage? **A:** Route group lookups to the right shard to reduce duplication. 
 - **Q:** Parser/Unparser value? **A:** Converts external payloads to compact internal RPC objects at a separate tier. 
 - **Q:** Why not HTTP long-polling? **A:** It’s not real-time enough for chat at scale. 
 - [Personal note: If WebSockets are blocked or flaky on some networks, fallback to HTTP/2 server-push or SSE as a compatibility layer.]

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

---

## Interview Tags (for later filtering)

- **Domain/Industry**: `messaging`, `social-media`, `collaboration`
- **Product Pattern**: `realtime-chat`, `notification`, `queue`, `rate-limit`
- **System Concerns**: `high-availability`, `low-latency`, `throttling`, `backpressure`, `privacy`
- **Infra/Tech (mentioned)**: `microservices`, `websocket`, `thrift`, `rest`
 - [Personal note: Prefer gRPC/Protobuf over Thrift in modern stacks due to ecosystem/tooling and HTTP/2 support.]

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

---

## Problem Understanding

- **Original Prompt**: Build a WhatsApp-like chat with 1:1 and group messaging, image/video sharing, read/delivered receipts, and online/last-seen; finish within interview time by prioritizing.
- **Use Cases**
 - Send/receive 1:1 messages with sent/delivered/read receipts.
 - Create/join groups; sender’s message fans out to all group members.
 - See “online” or “last seen” for contacts.
 - Handle network/server failures with retries and durability where required.
- **Out of Scope (stated/implicit)**
 - Per-member group delivery/read receipts (too expensive at scale).
 - Full media pipeline details (covered elsewhere).
 - Deep auth flows and email/SMS notifications (generic services).
- **APIs**: Not stated in video.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

---

## Requirements & Constraints

### Given in Video
- **Functional**
 - 1:1 chat with sent/delivered/read receipts.
 - Group chat with capped membership (~200).
 - Online/last-seen status.
 - Message persistence and retry until delivered.
- **Non-Functional**
 - Real-time message delivery (WebSockets).
 - Scale horizontally; avoid single points of failure.
 - Minimize gateway memory/logic; decouple services.
 - Graceful degradation: deprioritize non-essential features during spikes.

### Assumptions (conservative)
- Durable server-side storage when compliance/official comms required; otherwise device-only storage acceptable for privacy/cost.
 - [Personal note: For modern privacy expectations, pair E2E encryption with server-side encrypted, short-retention storage if durability is required—verify for your product/regulatory needs.]
- Client maintains exponential backoff on reconnects and retries; server uses capped retries with DLQs.
- Idempotency keys on message sends to tolerate retries.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

---

## Back-of-the-Envelope Estimation

*Not stated in video—skipping numerical estimation.*

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

---

## High-Level Architecture

- **Clients**: Mobile apps with persistent **WebSocket** to Gateways. 
- **Gateways**: Terminate TCP/WebSocket; minimal logic; forward raw payloads to Parser/Unparser; ask Session for routing. 
- **Parser/Unparser**: Converts external JSON to internal RPC objects (e.g., **Thrift**), then forwards. 
 - [Personal note: Consider gRPC for streaming RPCs, built-in deadlines, and observability with modern tooling.] 
- **Session Service**: Central router; stores user→connection (box) mappings; queries Group Service for fan-out targets. 
- **Group Service**: Stores group→members; sharded via **consistent hashing** on groupId to reduce duplication. 
- **Message Queue/Store**: Persists messages, handles retries and idempotency; notifies senders of “sent” immediately and “delivered” on ACK. 
 - [Personal note: Managed pub/sub (e.g., cloud-native) can simplify ops vs self-hosting; verify latency/SLA needs.] 
- **Last-Seen Service**: Updates timestamp on user-initiated activities; answers online vs last-seen queries. 
- **Load Balancing & Discovery**: LBs at edges; heartbeats/service discovery among services.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

---

## Deep Dives by Subsystem

### 8.1 Subsystem: Gateway
- **Role & Responsibilities**: Maintain TCP/WebSocket; accept frames; forward unparsed payloads; avoid heavy parsing/auth logic to conserve memory.
- **Scaling & Partitioning**: Horizontally scale; stateless beyond connection tables; fronted by LB.
- **Failure Handling**: If overloaded, shed non-essential work (last-seen/receipt updates).
- **Bottlenecks**: Connection memory; CPU for parsing (hence offload).

[Ask AI: Subsystem - Gateway](https://alisol.ir/?ai=Subsystem%20-%20Gateway%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

### 8.2 Subsystem: Session Service
- **Role**: Source of truth for user→box mapping; routes 1:1 and group sends to the correct gateways.
- **Data Model**: `userId -> connection(boxId)`; transient; frequently updated; heavily cached.
- **Consistency**: Eventually consistent is acceptable; frequent heartbeats keep freshness.
- **Failure Handling**: Replicated instances; no SPOF.

[Ask AI: Subsystem - Session Service](https://alisol.ir/?ai=Subsystem%20-%20Session%20Service%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

### 8.3 Subsystem: Group Service
- **Role**: Maintain `groupId -> [memberUserIds]`.
- **Scaling**: **Consistent hashing** on `groupId` to route to shards; cache toplists locally.
- **Fan-out**: Session queries Group to list targets, then pushes via their mapped gateways.
- **Limits**: Cap group sizes to avoid excessive fan-out (≈200 discussed).

[Ask AI: Subsystem - Group Service](https://alisol.ir/?ai=Subsystem%20-%20Group%20Service%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

### 8.4 Subsystem: Parser/Unparser
- **Role**: Convert JSON/HTTP/WebSocket payloads into compact internal RPC objects (e.g., **Thrift**); centralizes payload evolution.
- **Notes**: Keeps gateways lean; allows schema-validated internal interfaces.
 - [Personal note: Favor Protobuf schemas with gRPC for stronger tooling and streaming; thrift remains viable if already invested.]

[Ask AI: Subsystem - Parser/Unparser](https://alisol.ir/?ai=Subsystem%2FUnparser%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

### 8.5 Subsystem: Messaging & Receipts
- **Flow**: Sender→Gateway→Session→ReceiverGateway→Receiver; receiver ACKs; ACK propagates to mark “delivered”; “read” fires when chat opened.
- **Idempotency**: MessageId or client token to dedupe on retries.
- **Queues/Retries**: Message queues guarantee eventual send; configurable retry counts and delays.
 - [Personal note: Ensure DLQs and bounded retries to avoid retry storms under partial outages.]

[Ask AI: Subsystem - Messaging & Receipts](https://alisol.ir/?ai=Subsystem%20-%20Messaging%20%26%20Receipts%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

### 8.6 Subsystem: Last-Seen/Presence
- **Role**: Track latest user activity timestamps from **user-initiated** requests; serve “online” (within small threshold) or “last seen <ts>”.
- **Client Flags**: Distinguish user activity vs app/system requests so background polls don’t flip presence.
- **Thresholds**: e.g., ≤10–15s → “online”; else show timestamp.

[Ask AI: Subsystem - Last Seen](https://alisol.ir/?ai=Subsystem%20-%20Last%20Seen%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

---

## Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
| ---------------------------- | --------------------------------- | ------------------------------ | ----------------------- | ------------------------------------------------------- |
| Server push | WebSockets | HTTP long-polling | WebSockets | Real-time and bidirectional vs periodic polling. |
| Gateway logic | “Dumb” gateways | Feature-rich edge | “Dumb” | Conserve memory/CPU per connection. |
| Group delivery receipts | Per-member | Omit/partial | Omit/partial | Too expensive for large groups. |
| Group delivery model | Immediate fan-out | Pull/batching | Immediate (with cap) | Chat wants low latency; cap group size to bound cost. |
| Payload conversion | Parser/Unparser (Thrift) | Parse at gateways | Parser/Unparser | Centralize compute; keep edges light. |
| Storage model | Device-only (temporary) | Server-durable | Depends on needs | Privacy/cost vs compliance/reliability trade-off. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

---

## Reliability, Availability, and Performance

- **Replication/No SPOF**: Multiple instances for Session, Group, Last-Seen, Parser, Queues.
- **Backpressure & Throttling**: Rate-limit/queue; shed non-essentials (last-seen, receipts) during global spikes.
- **Load Shedding & Degradation**: Prioritize “send + ACK” path over secondary signals.
- **Retries**: Server-side retry with idempotency keys; surface failure after N attempts.

[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

---

## Security & Privacy (if discussed)

- **Auth**: Mentioned as separate/simple service; details not covered. 
- **Privacy**: “Temporary” chats possible (device-only) but consider compliance needs for durability.

[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

---

## Observability (if discussed)

- **Service discovery/heartbeats** noted; detailed metrics/tracing not covered.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

---

## Follow-up Questions (from interviewer, if any)

- Not stated in video.

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

---

## Candidate Questions (if modeled)

- Not stated in video.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

---

## Key Takeaways

- Use **WebSockets** for real-time bidirectional chat; avoid HTTP long-polling latency. 
- Keep **gateways “dumb”**; move logic to services to conserve memory/CPU. 
- Centralize **session routing** (user→box) in a **Session service**. 
- Decouple **group membership** into a **Group service**; shard via **consistent hashing**. 
- Employ **message queues** and **idempotency** for reliable delivery with retries. 
- **Prioritize core delivery** paths; **deprioritize** last-seen/receipt signals during global spikes. 
- Consider **temporary vs durable** storage based on privacy vs compliance. 
- Use a **Parser/Unparser** tier to standardize internal RPC objects. 
 - [Personal note: Modern stacks frequently standardize on gRPC/Protobuf; choose what your team/infra supports best.] 
- Cap **group sizes** to keep fan-out bounded and predictable.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

---

## Glossary

- **WebSocket**: Persistent, bidirectional client-server channel over TCP. 
- **Session Service**: Router storing user→connection mappings. 
- **Group Service**: Service holding group→member lists. 
- **Consistent Hashing**: Sharding method minimizing remaps on node changes. 
- **Idempotency**: Property where repeated operations have single effect. 
- **Load Shedding**: Dropping/deprioritizing work to protect core functions. 
- **Parser/Unparser**: Translator between external payloads and internal RPC objects. 
- **ACK (Acknowledgement)**: Receiver’s confirmation used for receipts.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

---

## Study Plan from This Interview (Optional)

- Review: WebSockets vs SSE vs HTTP/2 push; retries/backoff; idempotency keys; consistent hashing; fan-out patterns; service discovery/heartbeats; graceful degradation strategies. 
 - [Personal note: TLS 1.2+ minimum and aim for TLS 1.3 today; older versions are deprecated.]

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems)

---

## Attribution

- **Source Video**: https://www.youtube.com/watch?v=vvhC64hQZMk 
- **Channel**: Gaurav Sen 
- **Note**: This document is a summary of the linked mock interview.

---

## About the summarizer

I’m *Ali Sol*, a PHP Developer. Learn more:

- Website: [alisol.ir](https://www.alisol.ir) 
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

