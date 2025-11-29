# API security OWASP top 10 : TryHackMe

* **Platform**: YouTube
* **Channel/Creator**: stuffy24
* **Duration**: 00:37:33
* **Release Date**: Jul 10, 2025
* **Video Link**: [https://www.youtube.com/watch?v=d-3z_9Vx4e0](https://www.youtube.com/watch?v=d-3z_9Vx4e0)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/API%20security%20OWASP%20top%2010%20%3A%20TryHackMe) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/API%20security%20OWASP%20top%2010%20%3A%20TryHackMe) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/API%20security%20OWASP%20top%2010%20%3A%20TryHackMe) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/API%20security%20OWASP%20top%2010%20%3A%20TryHackMe) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/API%20security%20OWASP%20top%2010%20%3A%20TryHackMe) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/API%20security%20OWASP%20top%2010%20%3A%20TryHackMe) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/API%20security%20OWASP%20top%2010%20%3A%20TryHackMe) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/API%20security%20OWASP%20top%2010%20%3A%20TryHackMe) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/API%20security%20OWASP%20top%2010%20%3A%20TryHackMe) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/API%20security%20OWASP%20top%2010%20%3A%20TryHackMe) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/API%20security%20OWASP%20top%2010%20%3A%20TryHackMe) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/API%20security%20OWASP%20top%2010%20%3A%20TryHackMe)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/API%20security%20OWASP%20top%2010%20%3A%20TryHackMe) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/API%20security%20OWASP%20top%2010%20%3A%20TryHackMe) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/API%20security%20OWASP%20top%2010%20%3A%20TryHackMe) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/API%20security%20OWASP%20top%2010%20%3A%20TryHackMe)
<!-- LH-BUTTONS:END -->

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

## Introduction to API Security
* **Summary**: APIs need to be treated with the same sensitivity as credentials or passwords due to their role in major attacks, like those affecting LinkedIn, Twitter, and Peloton users. The video covers the OWASP Top 10 for API security using a TryHackMe box, emphasizing that API documentation is crucial and not trivial.
* **Key Takeaway/Example**: Major breaches involved millions of users' data exposed via APIs, such as 700 million LinkedIn records. Always reference API documentation for endpoints, required inputs, and expected outputs.
* **Link for More Details**: [Ask AI: API Security Introduction](https://alisol.ir/?ai=API%20Security%20Introduction%7Cstuffy24%7CAPI%20security%20OWASP%20top%2010%20%3A%20TryHackMe)

## What is an API?
* **Summary**: An API acts as a middleman for communication between applications, like a phone app talking to DoorDash or a script fetching data from Shodan. It simplifies data retrieval without needing complex user interactions, using requests to endpoints with authorization like tokens or headers.
* **Key Takeaway/Example**: Without APIs, scripts would mimic user actions on websites, which is complex. APIs validate requests and return data in formats like JSON, but must be secured to prevent unauthorized access.
* **Link for More Details**: [Ask AI: What is an API](https://alisol.ir/?ai=What%20is%20an%20API%7Cstuffy24%7CAPI%20security%20OWASP%20top%2010%20%3A%20TryHackMe)

## Broken Object Level Authorization (BOLA/IDOR)
* **Summary**: BOLA, or Insecure Direct Object Reference (IDOR), occurs when APIs allow direct access to objects via identifiers without proper authorization, enabling attackers to enumerate users or data they shouldn't access.
* **Key Takeaway/Example**: Using curl or tools like Burp, an attacker can iterate through user IDs (e.g., /user/1, /user/2) to list all users, facilitating password sprays. Fix by implementing authorization tokens that validate user access.
* **Link for More Details**: [Ask AI: Broken Object Level Authorization](https://alisol.ir/?ai=Broken%20Object%20Level%20Authorization%7Cstuffy24%7CAPI%20security%20OWASP%20top%2010%20%3A%20TryHackMe)

## Broken User Authentication
* **Summary**: This vulnerability arises from flawed authentication mechanisms, like not validating passwords, allowing attackers to obtain tokens easily if they have user lists from other flaws.
* **Key Takeaway/Example**: An endpoint might check only email, returning a token without password verification. Use the token in subsequent requests to access user details. Fix by validating both email and password in login queries.
* **Link for More Details**: [Ask AI: Broken User Authentication](https://alisol.ir/?ai=Broken%20User%20Authentication%7Cstuffy24%7CAPI%20security%20OWASP%20top%2010%20%3A%20TryHackMe)

## Excessive Data Exposure
* **Summary**: APIs return more data than necessary, such as device IDs, latitudes, and longitudes in comments, due to assumptions that front-end will filter it, leading to privacy risks.
* **Key Takeaway/Example**: Querying a comment endpoint exposes unnecessary fields like location. Mitigate by ensuring back-end only returns required data, not relying on front-end filtering or network-level controls alone.
* **Link for More Details**: [Ask AI: Excessive Data Exposure](https://alisol.ir/?ai=Excessive%20Data%20Exposure%7Cstuffy24%7CAPI%20security%20OWASP%20top%2010%20%3A%20TryHackMe)

## Lack of Resources and Rate Limiting
* **Summary**: Without rate limits, APIs can be abused for denial-of-service attacks, like flooding email resets, causing crashes, resource exhaustion, or reputational harm from spam flags.
* **Key Takeaway/Example**: Repeatedly calling an OTP send endpoint without limits can send millions of emails. Implement limits like waiting periods (e.g., 2 minutes) and define max data sizes to prevent overuse.
* **Link for More Details**: [Ask AI: Lack of Resources and Rate Limiting](https://alisol.ir/?ai=Lack%20of%20Resources%20and%20Rate%20Limiting%7Cstuffy24%7CAPI%20security%20OWASP%20top%2010%20%3A%20TryHackMe)

## Broken Function Level Authorization
* **Summary**: Low-privilege users can access admin functions by manipulating headers, like setting "is_admin" to true, due to lack of proper role checks against the database.
* **Key Takeaway/Example**: Adding a header allows listing all users as admin. Use role-based access control, deny by default, and verify roles in the backend, not just headers or hidden fields.
* **Link for More Details**: [Ask AI: Broken Function Level Authorization](https://alisol.ir/?ai=Broken%20Function%20Level%20Authorization%7Cstuffy24%7CAPI%20security%20OWASP%20top%2010%20%3A%20TryHackMe)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
