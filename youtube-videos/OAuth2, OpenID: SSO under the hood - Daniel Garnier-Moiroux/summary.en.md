# OAuth2, OpenID: SSO under the hood - Daniel Garnier-Moiroux

* **Platform**: YouTube
* **Channel/Creator**: Devoxx 
* **Duration**: 00:42:14
* **Release Date**: Mar 31, 2025
* **Video Link**: [https://www.youtube.com/watch?v=bH5PxcJzwME](https://www.youtube.com/watch?v=bH5PxcJzwME)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b47981dc -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/OAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/OAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/OAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer) 

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/OAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/OAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/OAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/OAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/OAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/OAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/OAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/OAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/OAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/OAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux)
<!-- LH-BUTTONS:END -->

## Introduction to the Speaker and Talk
**Summary**: Daniel Garnier-Moiroux introduces himself as a member of the Spring team, focusing on Spring Security, authorization servers, and related technologies. He shares contact details and encourages interaction for feedback. The talk is an introductory overview of OAuth2 and OpenID Connect, with hands-on code examples in Java, JavaScript, and Python, but the demo uses Java based on audience preference.
**Key Takeaway/Example**: The session aims to explain SSO mechanics under the hood, starting with concepts and moving to implementation, assuming basic familiarity for about half the audience.
**Link for More Details**: [Ask AI: Introduction to OAuth2 and OpenID Connect](https://alisol.ir/?ai=Introduction%20to%20OAuth2%20and%20OpenID%20Connect%7CDevoxx%20%7COAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux)

## What is OAuth2?
**Summary**: OAuth2 serves as an authorization framework that lets developers request user permissions to access remote resources without sharing credentials. Permissions are handled via access tokens, which can be self-contained or reference server-side data. It's defined by specs like RFC 6749, enabling interoperability across providers like GitHub, Microsoft, and Okta.
**Key Takeaway/Example**: For instance, an app like photobook.example.com can access Google Photos without full Google account credentials, focusing only on scoped permissions.
**Link for More Details**: [Ask AI: OAuth2 Authorization Framework](https://alisol.ir/?ai=OAuth2%20Authorization%20Framework%7CDevoxx%20%7COAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux)

## What is OpenID Connect?
**Summary**: OpenID Connect builds on OAuth2 for authentication and identity verification, enabling single sign-on (SSO). It introduces ID tokens containing user identity data like email or profile info, standardizing access to user details across providers.
**Key Takeaway/Example**: Unlike OAuth2's optional user info endpoints (e.g., GitHub's /users), OpenID Connect mandates standardized ID tokens for consistent identity handling.
**Link for More Details**: [Ask AI: OpenID Connect for Authentication](https://alisol.ir/?ai=OpenID%20Connect%20for%20Authentication%7CDevoxx%20%7COAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux)

## Why Use OAuth2 Instead of Sharing Passwords?
**Summary**: Sharing passwords for access is insecure, granting excessive permissions, lacking revocation options, and risking breaches. OAuth2 provides scoped, time-bound, revocable tokens, avoiding full credential exposure.
**Key Takeaway/Example**: Tokens limit access (e.g., only to photos, not email), expire automatically, and can be revoked without changing passwords across sites.
**Link for More Details**: [Ask AI: Security Risks of Password Sharing vs OAuth2](https://alisol.ir/?ai=Security%20Risks%20of%20Password%20Sharing%20vs%20OAuth2%7CDevoxx%20%7COAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux)

## How OAuth2 Works: Entities and Flows
**Summary**: OAuth2 involves four roles: resource owner (user), authorization server (issues tokens), client (your app), and resource server (holds data). Flows include implicit (direct tokens, less secure) and authorization code (uses short-lived codes for backend token exchange).
**Key Takeaway/Example**: In authorization code flow, the user gets a code from the auth server, which the client exchanges for tokens, minimizing browser exposure risks.
**Link for More Details**: [Ask AI: OAuth2 Entities and Authorization Code Flow](https://alisol.ir/?ai=OAuth2%20Entities%20and%20Authorization%20Code%20Flow%7CDevoxx%20%7COAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux)

## Implementing SSO Manually in Java (With Warnings)
**Summary**: A basic Spring Boot app starts with hardcoded login; SSO is added manually by redirecting to Google's auth endpoint, handling callbacks, and exchanging codes for tokens. This skips security checks like signature verification and is not for production.
**Key Takeaway/Example**: Use a simple controller to build the login URI and process the callback, but always use libraries like Spring Security in real apps.
```java
// Example: Building login URI
UriComponentsBuilder.fromUriString("https://accounts.google.com/o/oauth2/v2/auth")
    .queryParam("client_id", clientId)
    .queryParam("redirect_uri", redirectUri)
    .queryParam("response_type", "code")
    .queryParam("scope", "openid email profile")
    .build().toUriString();
```
**Link for More Details**: [Ask AI: Manual OAuth2 Implementation in Java](https://alisol.ir/?ai=Manual%20OAuth2%20Implementation%20in%20Java%7CDevoxx%20%7COAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux)

## Registering the Application with Google
**Summary**: Register your app in Google Cloud Console to get client ID and secret, specifying redirect URIs for secure callbacks.
**Key Takeaway/Example**: Choose web application type, add localhost redirect, and store credentials securely.
**Link for More Details**: [Ask AI: Registering OAuth2 App with Google](https://alisol.ir/?ai=Registering%20OAuth2%20App%20with%20Google%7CDevoxx%20%7COAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux)

## Building the Authorization Request
**Summary**: Construct the authorization URI with client_id, redirect_uri, response_type=code, and scopes like openid, email, profile. Use OpenID discovery endpoint for auth server details.
**Key Takeaway/Example**: Scopes define permissions; openid triggers ID token issuance.
**Link for More Details**: [Ask AI: Building OAuth2 Authorization Request](https://alisol.ir/?ai=Building%20OAuth2%20Authorization%20Request%7CDevoxx%20%7COAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux)

## Handling the Callback and Exchanging Code for Token
**Summary**: On callback, extract the code from the query param and POST it to the token endpoint with client credentials, grant_type=authorization_code.
**Key Takeaway/Example**: Use RestClient for the exchange, including basic auth header with client_id:secret.
```java
// Example: Exchanging code
restClient.post()
    .uri("https://oauth2.googleapis.com/token")
    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
    .body("code=" + code + "&redirect_uri=" + redirectUri + "&grant_type=authorization_code")
    .headers(h -> h.setBasicAuth(clientId, clientSecret))
    .retrieve().body(String.class);
```
**Link for More Details**: [Ask AI: OAuth2 Code Exchange for Tokens](https://alisol.ir/?ai=OAuth2%20Code%20Exchange%20for%20Tokens%7CDevoxx%20%7COAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux)

## Decoding the ID Token
**Summary**: ID tokens are JWTs; split, base64-decode the payload, and parse JSON for user claims like name, email, and picture.
**Key Takeaway/Example**: Tools like jwt.io or step CLI help inspect; store extracted data in session for logged-in state.
```java
// Example: Decoding JWT payload
String[] parts = idToken.split("\\.");
byte[] decodedPayload = Base64.getUrlDecoder().decode(parts[1]);
Map<String, String> payload = objectMapper.readValue(decodedPayload, Map.class);
```
**Link for More Details**: [Ask AI: Decoding JWT ID Tokens](https://alisol.ir/?ai=Decoding%20JWT%20ID%20Tokens%7CDevoxx%20%7COAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux)

## Secure Implementation Using Spring Security
**Summary**: For production, use Spring Security's OAuth2 client starter; configure security filters, properties for client_id, secret, scopes, and issuer URI. It handles redirects, token validation, and user info automatically.
**Key Takeaway/Example**: Defaults manage redirect URIs; access decoded user info via OidcUser.
```yaml
# Example application.yml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: your-client-id
            client-secret: your-secret
            scope: openid, email, profile
```
**Link for More Details**: [Ask AI: OAuth2 with Spring Security](https://alisol.ir/?ai=OAuth2%20with%20Spring%20Security%7CDevoxx%20%7COAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux)

## Conclusion and Resources
**Summary**: The talk wraps with a reminder to use libraries for secure implementations, shares a repo for JavaScript/Python versions, and opens for questions.
**Key Takeaway/Example**: Explore reference implementations in the provided GitHub repo for other languages.
**Link for More Details**: [Ask AI: Secure SSO Best Practices](https://alisol.ir/?ai=Secure%20SSO%20Best%20Practices%7CDevoxx%20%7COAuth2%2C%20OpenID%3A%20SSO%20under%20the%20hood%20-%20Daniel%20Garnier-Moiroux)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
