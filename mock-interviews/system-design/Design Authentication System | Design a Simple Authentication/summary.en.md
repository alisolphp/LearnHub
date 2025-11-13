# System Design Mock Interview: Design a Simple Authentication System | System Design Interview Prep

* Design Authentication System | Design a Simple Authentication*

* **Channel/Interviewer**: Interview Pen
* **Duration**: 00:17:17
* **Original Video**: https://www.youtube.com/watch?v=uj_4vxm9u90

> *This document summarizes the key content of a system design mock interview. I highly recommend watching the full video if you can.*

---

# One-Page Executive Summary

**Problem Prompt (One-liner)**: Design a simple authentication system allowing users to register, log in, and sign out, with emphasis on secure login to distinguish legitimate users from impersonators.

**Primary Scope**: Focus on login and sign-out mechanisms, session management, centralized vs. decentralized approaches, and security; registration is basic and de-emphasized.

**Non-Functional Priorities**: Security (preventing impersonation, data integrity), scalability (handling database load from session checks), and resilience to attacks like CSRF or denial of service.

**Key Constraints & Numbers**: Not stated in video—no specific users, QPS, latencies, or data sizes mentioned.

**High-Level Architecture (Text)**:
- Client sends login credentials to API, which verifies against database.
- Generate session token or JWT for subsequent requests.
- Centralized: Store sessions in database for lookup on each request.
- Decentralized: Use JWTs signed with secret for stateless verification across services.
- Store tokens client-side (cookies or local storage).
- Handle sign-out by expiring tokens or clearing client storage.
- Ensure HTTPS for secure transmission.

**Top Trade-offs**:
- Centralized sessions: Easier logout but higher database load and scaling needs.
- Decentralized (JWT): Better scalability, no database hits per request, but harder instant logout.
- Cookies: Automatic inclusion but vulnerable to CSRF/XSS.
- Local storage: More secure against CSRF but requires manual header inclusion.
- Human factors: Users leaking tokens remain a risk regardless of tech.

**Biggest Risks/Failure Modes**:
- Token guessing or forgery if not cryptographically secure.
- CSRF attacks with cookie-based storage.
- Database overload from session lookups in centralized setup.
- Secret key leakage allowing JWT forgery.
- Inability to force immediate logout in decentralized systems without short expirations.
- Denial of service amplifying database hits.

**5-Min Review Flashcards**:
- Q: Why is HTTP stateless? → A: Each request is independent; no built-in memory of prior interactions.
- Q: Purpose of session tokens? → A: To identify authenticated users across requests without re-verifying credentials.
- Q: Centralized auth drawback? → A: Every request hits database, increasing load and scaling needs.
- Q: Decentralized auth benefit? → A: No central database; services verify tokens independently.
- Q: Cookie vs. local storage? → A: Cookies auto-sent but CSRF-vulnerable; local storage manual but safer.
- Q: JWT structure? → A: Header (algo/type), payload (data like username), signature (for integrity).
- Q: JWT verification? → A: Use server secret to check signature matches header+payload.
- Q: Logout in JWT? → A: Relies on expiration; no central revocation without extra checks.
- Q: Security mindset? → A: Never fully trust client-side data; use HTTPS and secure generation.
- Q: When to use centralized? → A: For simple services needing easy logout.
- Q: When to use decentralized? → A: Microservices or high-scale to avoid database bottlenecks.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep)

---

# Interview Tags

* **Domain/Industry**: Not stated in video
* **Product Pattern**: Not stated in video
* **System Concerns**: high-availability
* **Infra/Tech (only if mentioned)**: microservices, rest

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep)

---

# Problem Understanding

**Original Prompt**: Design an authentication system where users can register, log in, and sign out, ensuring differentiation between legitimate users and bad actors impersonating them.

**Use Cases**: Primary: User login to perform authorized actions (e.g., admin deleting users); secondary: Sign-out to end sessions securely.

**Out of Scope**: Detailed registration implementation, password hashing/salting specifics.

**APIs (if discussed)**: 
- POST /login: {username, password} → Response with session token or JWT.
- DELETE /user: {session_id or JWT, target_user} → Deletes user if authorized.
- Not stated in video for others.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep)

---

# Requirements & Constraints

**Functional Requirements**:
- Users register with secure data storage.
- Users log in with username/password verification.
- Users sign out, invalidating sessions.
- Differentiate authenticated users for actions like admin privileges.

**Non-Functional Requirements**: 
- Security: Prevent impersonation, ensure token integrity, resist guessing attacks.
- Scalability: Handle increasing requests without excessive database load.
- Availability: Resilient to denial of service.
- Consistency: Strong for auth checks.

**Assumptions**: 
- Assumption: Database for user credentials and sessions.
- Assumption: HTTPS for all communications.
- Assumption: Cryptographically secure random generation for tokens.

**Capacity Inputs**: Not stated in video.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep)

---

# Back-of-the-Envelope Estimation

*“Not stated in video—skipping numerical estimation.”*

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep)

---

# High-Level Architecture

- Client (browser/machine) sends login request with credentials to API.
- API verifies credentials against user database (username, hashed password).
- For centralized: Generate secure session ID, store in sessions database linked to user.
- Client stores token (cookie or local storage) and includes in future requests (e.g., authorization header).
- API lookups session in database to identify user and privileges for actions like delete user.
- For decentralized: Login API generates signed JWT with payload (username, admin status), stored on client.
- Other services verify JWT signature using shared secret, no database hit.
- Sign-out: Clear client token; for JWT, rely on expiration timestamp in payload.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep)

---

# Deep Dives by Subsystem

## Subsystem: Centralized Session Management

**Role & Responsibilities**: Store and verify session tokens to maintain state over stateless HTTP, enabling user identification without re-authentication.

**Data Model (from video only)**: Sessions table: {user_id, session_id (e.g., xf1de)}.

**APIs/Contracts**: Login: Generate and return session_id; subsequent requests include session_id.

**Scaling & Partitioning**: Database scales horizontally; every request reads sessions table, potential bottleneck.

**Caching Strategy**: Not stated in video.

**Consistency Model**: Strong consistency for session lookups.

**Bottlenecks & Hot Keys**: High read load on sessions table; mitigate with scaling or decentralization.

**Failure Handling**: Reject invalid sessions; handle database downtime with replicas.

**Cost Considerations**: Increased database costs from frequent reads.

[Ask AI: Subsystem - Centralized Session Management](https://alisol.ir/?ai=Subsystem%20-%20Centralized%20Session%20Management%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep)

## Subsystem: Decentralized Token Management (JWT)

**Role & Responsibilities**: Enable stateless auth across services by embedding verifiable user data in client-stored tokens.

**Data Model (from video only)**: JWT: Header {alg, typ: JWT}, Payload {username, admin}, Signature (HMAC of header+payload with secret).

**APIs/Contracts**: Login API generates JWT; other APIs verify signature and extract payload.

**Scaling & Partitioning**: No central storage; scales easily as verification is local to each service.

**Caching Strategy**: Not stated in video.

**Consistency Model**: Eventual, as no central state; relies on expiration for revocation.

**Bottlenecks & Hot Keys**: Secret management; leakage allows forgery.

**Failure Handling**: Reject invalid signatures or expired tokens.

**Cost Considerations**: Lower database costs; higher compute for signature verification.

[Ask AI: Subsystem - Decentralized Token Management (JWT)](https://alisol.ir/?ai=Subsystem%20-%20Decentralized%20Token%20Management%20%28JWT%29%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep)

## Subsystem: Client-Side Token Storage

**Role & Responsibilities**: Securely store and include auth tokens in requests.

**Data Model (from video only)**: Cookies: {domain, duration, data: token}; Local storage: Key-value for token.

**APIs/Contracts**: Include in headers (e.g., Authorization: Bearer <token>).

**Scaling & Partitioning**: Not applicable.

**Caching Strategy**: Not stated in video.

**Consistency Model**: Not applicable.

**Bottlenecks & Hot Keys**: CSRF with cookies; manual inclusion with local storage.

**Failure Handling**: Expire cookies; clear local storage on logout.

**Cost Considerations**: Not stated in video.

[Ask AI: Subsystem - Client-Side Token Storage](https://alisol.ir/?ai=Subsystem%20-%20Client-Side%20Token%20Storage%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep)

---

# Trade-offs & Alternatives

| Topic | Option A | Option B | Video’s Leaning | Rationale (from video) |
| --- | --- | --- | --- | --- |
| Session Storage | Centralized (database) | Decentralized (JWT) | Decentralized for scale | Centralized easy for logout but database-heavy; decentralized reduces load but complicates revocation. |
| Token Storage | Cookies | Local Storage | Local Storage for security | Cookies easy but CSRF-vulnerable; local storage manual but prevents auto-inclusion attacks. |
| Token Generation | Systematic/Predictable | Cryptographically Secure Random | Secure Random | Predictable allows guessing; secure reduces impersonation risk statistically. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep)

---

# Reliability, Availability, and Performance

- Replication: Database replicas for session/user data to handle failures.
- Latency budget: Added delay from database reads in centralized; minimal in decentralized.
- Backpressure & throttling: Not stated in video.
- Load shedding & degradation: Not stated in video.
- Disaster recovery: Not stated in video.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep)

---

# Security & Privacy

- AuthN: Username/password verification with hashing/salting.
- AuthZ: Check user privileges (e.g., admin) post-verification.
- Encryption: HTTPS for transmission; signatures for JWT integrity.
- Abuse prevention: Secure token generation to prevent guessing; avoid trusting client data.
- PII handling: Store hashed passwords; minimize client-side sensitive data.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep)

---

# Observability

Not stated in video.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep)

---

# Follow-up Questions

Not stated in video.

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep)

---

# Candidate Questions

Not stated in video.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep)

---

# Key Takeaways

- HTTP is stateless, requiring mechanisms like sessions or tokens for authentication.
- Session tokens differentiate users; generate securely to prevent guessing.
- Centralized auth uses database for sessions, enabling easy logout but increasing load.
- Decentralized auth with JWTs scales better, verifies via signatures, but logout relies on expiration.
- Cookies simplify but introduce CSRF risks; local storage is safer but more work.
- Always use HTTPS and distrust client data to enhance security.
- Humans (e.g., leaking tokens) are often the weakest link.
- For microservices, prefer decentralized to avoid database bottlenecks.
- Consider denial of service impacts on database in centralized setups.
- JWTs include header, payload, and signature; secret leakage allows forgery.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep)

---

# Glossary

- **HTTP Stateless**: Protocol handles requests independently without retaining prior context.
- **Session Token**: Identifier linking requests to a authenticated user session.
- **CSRF (Cross-Site Request Forgery)**: Attack exploiting auto-sent cookies to forge requests.
- **XSS (Cross-Site Scripting)**: Injection attack stealing cookies or data.
- **JWT (JSON Web Token)**: Compact token with header, payload, and signature for stateless auth.
- **Signature**: Checksum ensuring data integrity using a secret key.
- **Asymmetric Encryption**: Mentioned for verification, but JWT typically uses symmetric HMAC.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep)

---

# Attribution

* Source Video: https://www.youtube.com/watch?v=uj_4vxm9u90
* Channel: Interview Pen
* Note: This document is a summary of the linked mock interview.

---

# About the summarizer

I'm *Ali Sol*, a PHP Developer. Learn more:

* Website: [alisol.ir](https://alisol.ir)
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
