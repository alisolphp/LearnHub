# Engineering Stories: How Account Pre-hijacking Hits Sites With Password and Google Sign-In

* **Authors**: Avinash Sudhodanan (independent researcher) and Andrew Paverd (Microsoft Security Response Center)
* **Publication Date**: August 2022 (31st USENIX Security Symposium)
* **Source Link**: [https://www.usenix.org/conference/usenixsecurity22/presentation/sudhodanan](https://www.usenix.org/conference/usenixsecurity22/presentation/sudhodanan)

This document summarizes one public research paper and adds my own experience from reviewing the login code of a web service I run. It is a personal summary, not official material, and not endorsed by the authors. All rights remain with the respective authors. I highly recommend reading the original paper.

*Most sites now offer "Sign in with Google" next to a password form. This paper, and one developer's own login review, ask who owns the account when both doors lead to the same email address. (This opening line is my own framing, not from the paper.)*

## Before You Get Started
* I summarize key points from useful engineering posts to learn and review quickly.
* Simply click on `Ask AI` links after each section to dive deeper.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## 1. The Paper: Attacks That Start Before You Even Sign Up

**Summary**: The paper describes a class of attacks it calls account pre-hijacking. The distinctive feature is that the attacker acts before the victim creates an account. The attacker is assumed to know only the victim's email address, and the authors identify five types of such attacks. The root cause they name is that the service fails to verify that the user actually owns the supplied identifier (the email address) before allowing use of the account.

**Example**: The authors analyzed 75 popular services and found that at least 35 were vulnerable to one or more of these attacks. Some could be noticed by an attentive user, while others were completely undetectable from the victim's perspective. There is no risk to the attacker if the victim has already created an account, so the attacker only needs to guess which services a victim will join. Many services do send a verification email, but the vast majority let the user begin using the account before that verification is completed.

**Link for More Details**:
[Ask AI: Attacks that start before you sign up](https://alisol.ir/?ai=Account%20pre-hijacking%20and%20unverified%20email%7CUSENIX%20Security%20paper%7CHow%20Account%20Pre-hijacking%20Hits%20Sites%20With%20Password%20and%20Google%20Sign-In)

## 2. Three of the Five Attacks

**Summary**: Classic-federated merge: the attacker signs up the classic way with the victim's email address and a password of their choice. Later the victim signs up with single sign-on. If the service merges the two accounts, the victim's login is correctly linked, but the password is still the one the attacker chose. Unexpired session: the attacker keeps a session alive on an account created with the victim's email; the victim resets the password, but if the service does not invalidate all active sessions, the attacker is still in.

**Example**: In the merge attack the attacker signs in with the password while the victim keeps signing in through single sign-on, and the victim may not notice unless the service notifies users about sign-in events. The authors assume the victim ignores emails from services where they have no account. The third attack, the non-verifying identity provider, is the mirror image: the attacker creates a federated identity with the victim's email at a provider that does not verify email ownership, and waits for the victim to sign up the classic way.

**Link for More Details**:
[Ask AI: Merge, unexpired session and non-verifying provider](https://alisol.ir/?ai=Classic-federated%20merge%2C%20unexpired%20session%2C%20non-verifying%20identity%20provider%7CUSENIX%20Security%20paper%7CHow%20Account%20Pre-hijacking%20Hits%20Sites%20With%20Password%20and%20Google%20Sign-In)

## 3. My Own Review: The Same Pattern in a Small Web Service

**Summary**: While reviewing the login code of a web service I run, I found the same pattern in three places. The service has email and password signup plus Google and GitHub sign-in. An attacker could sign up with a victim's email and any password and never confirm the email, so the account stayed unverified. When the real owner later signed in with Google, the site linked them to that account, and the attacker's password and sessions were still alive on it. I found this in review and have no evidence that anyone exploited it.

**Example**: The fixes: social sign-in is accepted only if the provider says the email is verified (Google and GitHub send that flag). When a social sign-in lands on an existing unverified account, the service changes its password, closes its old sessions and personal access tokens, and marks the email as verified; the real owner does nothing and a Google user sees no extra step. The email verification link now works only for its owner and returns a 403 error for anyone else. A password reset now closes all other sessions and personal tokens. These match the paper's verification requirement and its defenses for the unexpired session attack. This section is my own experience, not from the paper.

**Link for More Details**:
[Ask AI: A small web service with the same pattern](https://alisol.ir/?ai=Account%20pre-hijacking%20fixes%20in%20a%20login%20system%7CPersonal%20experience%7CHow%20Account%20Pre-hijacking%20Hits%20Sites%20With%20Password%20and%20Google%20Sign-In)

## 4. Four Rules to Check in Your Own Site

**Summary**: The paper's main fix is to send a verification email and require it to be completed before allowing any further actions on the account. If a service relies on the identity provider for verification, it should require a strong guarantee from the provider that the verification has been performed. The paper's defense in depth: on a password reset, sign out all other sessions and invalidate all other authentication tokens; when merging a classic account with a federated one, make sure the user currently controls both accounts.

**Example**: Four rules to take away: do not let an account be used until its email is verified (or trust only the provider's verified-email flag); when two sign-in methods meet on one email, make sure the person signing in controls both; when a password is reset or an unverified account is taken over by its real owner, close every old session and token; and make verification links work only for the account they were meant for. A question to ask yourself: if someone signed up with your email on a site you have not joined yet, would you ever know?

**Link for More Details**:
[Ask AI: Four rules to check in your own site](https://alisol.ir/?ai=Verified%20email%2C%20account%20merging%2C%20sessions%20and%20verification%20links%7CUSENIX%20Security%20paper%7CHow%20Account%20Pre-hijacking%20Hits%20Sites%20With%20Password%20and%20Google%20Sign-In)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
* Website: [alisol.ir](https://alisol.ir)
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
