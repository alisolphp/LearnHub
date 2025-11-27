# How to Add & Manage Stripe Subscription Payments in Bubble.io (Including Paywall Feature)

* **Platform**: YouTube  
* **Channel/Creator**: Building With Bubble  
* **Duration**: 00:48:59  
* **Release Date**: Sep 29, 2022  
* **Video Link**: [https://www.youtube.com/watch?v=EAhrfR62q1c](https://www.youtube.com/watch?v=EAhrfR62q1c)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b47981dc -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20(Including%20Paywall%20Feature)) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20(Including%20Paywall%20Feature)) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20(Including%20Paywall%20Feature)) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer) 

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20(Including%20Paywall%20Feature)) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20(Including%20Paywall%20Feature)) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20(Including%20Paywall%20Feature)) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20(Including%20Paywall%20Feature)) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20(Including%20Paywall%20Feature)) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20(Including%20Paywall%20Feature)) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20(Including%20Paywall%20Feature))

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20(Including%20Paywall%20Feature)) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20(Including%20Paywall%20Feature)) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20(Including%20Paywall%20Feature))
<!-- LH-BUTTONS:END -->

## What You’ll Build
You’ll end up with a complete subscription system where:
- New or non-paying users hit a paywall and are forced to subscribe.
- Users pick monthly or yearly plans and pay via Stripe Checkout.
- Users can upgrade, downgrade, or cancel anytime through Stripe’s customer portal.
- Your Bubble database stays perfectly in sync even when users make changes inside Stripe.
All of this without writing a single line of code.

[Ask AI: Stripe Subscriptions in Bubble.io Overview](https://alisol.ir/?ai=Stripe%20Subscriptions%20in%20Bubble.io%20Overview|Building%20With%20Bubble|How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20%28Including%20Paywall%20Feature%29)

## 1. Create Products & Prices in Stripe
1. Sign up / log into stripe.com (test mode is fine while building).
2. Go to Products → Create product.
3. Create two recurring prices:
   - Monthly Magic – £40/month (recurring, monthly interval)
   - Annual Magic – £400/year (recurring, yearly interval)
4. Save each product and copy the Price ID for each one (you’ll see it on the price detail page, e.g. price_1LHiCy…).

[Ask AI: Creating Recurring Prices in Stripe](https://alisol.ir/?ai=Creating%20Recurring%20Prices%20in%20Stripe|Building%20With%20Bubble|How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20%28Including%20Paywall%20Feature%29)

## 2. Install & Configure the Two Required Plugins
Install these two official plugins:
- Stripe (by Bubble)
- Stripe Customer Portal

In the Stripe plugin settings (development tab):
- Publishable key → your test publishable key
- Secret key → your test secret key  
- Client ID → found in Stripe → Developers → Multi-party payments → Testing → “Test your development client ID”

In the Stripe Customer Portal plugin:
- API key → Bearer + your test secret key (format: Bearer sk_test_…)

Make sure Stripe Checkout version is set to v3.

[Ask AI: Configuring Stripe Plugins in Bubble](https://alisol.ir/?ai=Configuring%20Stripe%20Plugins%20in%20Bubble|Building%20With%20Bubble|How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20%28Including%20Paywall%20Feature%29)

## 3. Database: Payments Data Type
Create a new data type called Payments with these fields (all text except dates):
- Last payment date (Date)
- Payment frequency (text – “month” or “year”)
- Product ID (text – the Stripe Price ID)
- Stripe Customer ID (text – auto-filled by Stripe)
- Subscription end date (Date)
- Status (text – “active” or “canceled”)

Keep it as a separate table (not on User) for flexibility and cleaner privacy rules.

[Ask AI: Bubble Database Structure for Stripe Subscriptions](https://alisol.ir/?ai=Bubble%20Database%20Structure%20for%20Stripe%20Subscriptions|Building%20With%20Bubble|How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20%28Including%20Paywall%20Feature%29)

## 4. Subscription Checkout Workflow
On your subscription page:
- Dropdown (option set) → “Monthly” / “Yearly”
- “Subscribe” button → Start/Edit workflow

Workflow (monthly example):
1. Plugins → Stripe - Subscribe user to plan → choose the monthly Price ID
   - Untick “Create new customer if none exists” (we let Stripe handle it)
   - No trial period in this demo
2. Only when result of step 1’s status is “active” → Make changes to a thing → Create a new Payments
   - Last payment date = Result of step 1: Current period start
   - Payment frequency = Result of step 1: Interval
   - Product ID = Result of step 1: Plan ID
   - Stripe Customer ID = Result of step 1: Customer ID
   - Subscription end date = Result of step 1: Current period end
   - Status = Result of step 1: Status
3. Still only when step 1 is active → Go to page “App” (or dashboard)

Duplicate the workflow for yearly, just change the Price ID. Add a condition on the button so the correct workflow runs based on the dropdown value.

[Ask AI: Stripe Checkout Workflow in Bubble](https://alisol.ir/?ai=Stripe%20Checkout%20Workflow%20in%20Bubble|Building%20With%20Bubble|How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20%28Including%20Paywall%20Feature%29)

## 5. Paywall on Login
When a user logs/signs up:
- Go to page “App” only when Search for Payments (Created by = Current User, first item)’s Status is “active”
- Otherwise → Go to page “Subscription”

This automatically redirects non-subscribers to the paywall.

[Ask AI: Creating a Paywall in Bubble](https://alisol.ir/?ai=Creating%20a%20Paywall%20in%20Bubble|Building%20With%20Bubble|How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20%28Including%20Paywall%20Feature%29)

## 6. Let Users Manage Their Subscription (Upgrade / Cancel)
In Stripe Dashboard → Customer portal → Configuration:
- Allow customers to update subscription and cancel subscription
- Add both of your prices so they can switch between them
- Save

In Bubble, add a “Manage subscription” button:
1. Plugins → Stripe Customer Portal → Create portal session (use Current User’s Payments → Stripe Customer ID)
2. Account → Open external website → Result of step 1: URL

Add your app’s return URL in the plugin settings (e.g. your dashboard page) so users can come back after changes.

[Ask AI: Stripe Customer Portal Setup](https://alisol.ir/?ai=Stripe%20Customer%20Portal%20Setup|Building%20With%20Bubble|How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20%28Including%20Paywall%20Feature%29)

## 7. Keep Your Database in Sync – Webhook Setup
Without a webhook, canceling or upgrading inside the portal won’t update your Bubble DB → users keep access.

Steps:
1. Backend workflows → API workflows → New API workflow → name it “stripe-webhook”
2. Tick “Expose as a public API” and “This workflow can be run without authentication”
3. Click “Detect request data” → copy the endpoint URL
4. In Stripe → Developers → Webhooks → Add endpoint → paste the Bubble URL
5. Select events:
   - customer.subscription.updated
   - customer.subscription.deleted
6. Test a subscription + cancel → go back to Bubble → click “Detect data” → save
7. Remove “/initialize” from the endpoint URL in Stripe and update the endpoint
8. In the workflow add action “Make changes to a thing”:
   - Thing to change = Search for Payments: Stripe Customer ID = Request Data’s object → customer : first item
   - Last payment date ← Request Data → object → current_period_start (Unix)
   - Payment frequency ← Request Data → object → plan → interval
   - Product ID ← Request Data → object → plan → id
   - Status ← Request Data → object → status
   - Subscription end date ← Request Data → object → current_period_end (Unix)

Now every change in the portal instantly reflects in your Bubble database.

[Ask AI: Stripe Webhook to Bubble Backend Workflow](https://alisol.ir/?ai=Stripe%20Webhook%20to%20Bubble%20Backend%20Workflow|Building%20With%20Bubble|How%20to%20Add%20%26%20Manage%20Stripe%20Subscription%20Payments%20in%20Bubble.io%20%28Including%20Paywall%20Feature%29)

## Final Tips
- Test everything in test mode with cards like 4242 4242 4242 4242
- Add extra logic on page load to kick users out if status ≠ active
- You can add more webhook events later (payment failed, invoice paid, etc.)
- Consider separate “basic” vs “premium” privacy rules or groups for more complex plans

That’s the entire flow. Once you’ve followed these steps you’ll have a rock-solid subscription system that handles signup, upgrades, downgrades, cancellations, and keeps your data perfectly in sync.

---

**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
