# How to Setup a Stripe Webhook in PHP to Automate Payments

* **Platform**: YouTube
* **Channel/Creator**: BluerSky TV
* **Duration**: 00:13:58
* **Release Date**: Sep 29, 2022
* **Video Link**: [Watch on YouTube](https://www.youtube.com/watch?v=nfjLXve3yS4)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=005796ea -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/How%20to%20Setup%20a%20Stripe%20Webhook%20in%20PHP%20to%20Automate%20Payments) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/How%20to%20Setup%20a%20Stripe%20Webhook%20in%20PHP%20to%20Automate%20Payments) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/How%20to%20Setup%20a%20Stripe%20Webhook%20in%20PHP%20to%20Automate%20Payments) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/How%20to%20Setup%20a%20Stripe%20Webhook%20in%20PHP%20to%20Automate%20Payments) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/How%20to%20Setup%20a%20Stripe%20Webhook%20in%20PHP%20to%20Automate%20Payments) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/How%20to%20Setup%20a%20Stripe%20Webhook%20in%20PHP%20to%20Automate%20Payments) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/How%20to%20Setup%20a%20Stripe%20Webhook%20in%20PHP%20to%20Automate%20Payments) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/How%20to%20Setup%20a%20Stripe%20Webhook%20in%20PHP%20to%20Automate%20Payments) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/How%20to%20Setup%20a%20Stripe%20Webhook%20in%20PHP%20to%20Automate%20Payments) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/How%20to%20Setup%20a%20Stripe%20Webhook%20in%20PHP%20to%20Automate%20Payments)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/How%20to%20Setup%20a%20Stripe%20Webhook%20in%20PHP%20to%20Automate%20Payments) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/How%20to%20Setup%20a%20Stripe%20Webhook%20in%20PHP%20to%20Automate%20Payments) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/How%20to%20Setup%20a%20Stripe%20Webhook%20in%20PHP%20to%20Automate%20Payments)
<!-- LH-BUTTONS:END -->

## Why Use a Custom Stripe Webhook?
Stripe Checkout is great, but the default success page is very limited. A webhook lets you run your own code the moment a payment succeeds — send custom emails, create accounts, grant access to a Telegram group, add users to a course platform, send WhatsApp confirmations, update your own database… basically anything you want.

The video shows a real-world example: when someone pays €15 for access to a private Telegram club, the webhook catches the payment and automatically sends the buyer the invitation links.

[Ask AI: Stripe Webhooks for Custom Payment Automation](https://alisol.ir/?ai=Stripe%20Webhooks%20for%20Custom%20Payment%20Automation%7CBluerSky%20TV%7CHow%20to%20setup%20a%20Stripe%20Webhook%20in%20PHP%20to%20automate%20payment)

## Creating the Webhook Endpoint in Stripe Dashboard
1. Log into your Stripe dashboard (live mode is fine — no need for test keys).
2. Go to Developers → Webhooks → “Add endpoint”.
3. Enter your public URL, e.g. `https://yourdomain.com/stripe_webhooks.php`
4. Choose the events you care about (the video uses `checkout.session.completed`).
5. Save — Stripe will immediately shows you the recommended PHP code and gives you the signing secret (`whsec_…`).

You can do all of this directly in production. No separate test environment is required.

[Ask AI: Adding a Webhook Endpoint in Stripe Dashboard](https://alisol.ir/?ai=Adding%20a%20Webhook%20Webhook%20Endpoint%20in%20Stripe%20Dashboard%7CBluerSky%20TV%7CHow%20to%20setup%20a%20Stripe%20Webhook%20in%20PHP%20to%20automate%20payment)

## Installing the Official Stripe PHP Library
You need the Stripe PHP library and Composer.

```bash
composer require stripe/stripe-php
```

This creates a `vendor/` folder with `autoload.php`.  
If Composer isn’t installed on your server yet (common on fresh Ubuntu VPS), just follow the official Composer installer — it’s a few commands and you’re done.

Once installed, every PHP file that uses Stripe simply starts with:

```php
require_once 'vendor/autoload.php';
```

[Ask AI: Installing stripe/stripe-php with Composer](https://alisol.ir/?ai=Installing%20stripe%2Fstripe-php%20with%20Composer%7CBluerSky%20TV%7CHow%20to%20setup%20a%20Stripe%20Webhook%20in%20PHP%20to%20automate%20payment)

## The Webhook Handler (stripe_webhooks.php)
Stripe already gives you almost the complete, secure code when you create the endpoint. You just copy-paste and extend it.

Here is the real-world version the presenter ended up with (slightly cleaned for readability):

```php
<?php
require_once 'vendor/autoload.php';

$stripe = new \Stripe\StripeClient('sk_live_************************');
$endpoint_secret = 'whsec_************************';

$payload = @file_get_contents('php://input');
$sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
$event = null;

try {
    $event = \Stripe\Webhook::constructEvent($payload, $sig_header, $endpoint_secret);
} catch(\UnexpectedValueException $e) {
    // Invalid payload
    http_response_code(400);
    exit();
} catch(\Stripe\Exception\SignatureVerificationException $e) {
    // Invalid signature
    http_response_code(400);
    exit();
}

// Handle the event
if ($event->type == 'checkout.session.completed') {
    $session = $event->data->object;

    $payment_id = $session->id;
    $amount_total = $session->amount_total / 100; // Stripe sends cents → convert to euros/dollars
    $email = $session->customer_details->email;
    $phone = $session->customer_details->phone ?? '';

    // Optional: log everything for debugging
    file_put_contents('stripe.log', date('Y-m-d H:i:s') . ' ' . print_r($session, true) . PHP_EOL, FILE_APPEND);

    // ── Your custom logic starts here ─────────────────────
    // Example 1: send mail directly
    // mail($email, 'Thank you!', 'Your access links: …');

    // Example 2 (what the video does): forward to your own confirmation script
    $confirm_url = 'https://yourdomain.com/stripe_confirmation.php';
    $post_data = http_build_query([
        'email' => $email,
        'amount' => $amount_total,
        'payment_id' => $payment_id
    ]);

    $ch = curl_init($confirm_url);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    curl_close($ch);
    // ─────────────────────────────────────────────────────
}

http_response_code(200); // Stripe needs 2xx response
```

That’s literally it — less than 100 lines for full automation.

[Ask AI: Full Stripe Webhook Handler Example in PHP](https://alisol.ir/?ai=Full%20Stripe%20Webhook%20Handler%20Example%20in%20PHP%7CBluerSky%20TV%7CHow%20to%20setup%20a%20Stripe%20Webhook%20in%20PHP%20to%20automate%20payment)

## Testing & Debugging (Even in Production)
You don’t need test mode or the Stripe CLI for basic testing.

1. Make one real purchase (or buy your own product — Stripe lets you refund instantly).
2. Go to the webhook in Stripe dashboard → you’ll see the delivered event.
3. Click “Resend” as many times as you want — it will hit your endpoint again with the exact same payload.
4. Check your `stripe.log` file or database to see exactly what arrived.

This trick lets you iterate 50–100 times in minutes without waiting for new customers.

[Ask AI: Testing Stripe Webhooks in Production](https://alisol.ir/?ai=Testing%20Stripe%20Webhooks%20in%20Production%7CBluerSky%20TV%7CHow%20to%20setup%20a%20Stripe%20Webhook%20in%20PHP%20to%20automate%20payment)

## What You Can Automate (Ideas from the Video)
- Send beautifully formatted confirmation emails
- Create user accounts automatically
- Add buyer to Telegram/Discord/group chats
- Grant course/platform access
- Send SMS/WhatsApp notifications
- Insert order into your own database
- Trigger Zapier/Make.com webhooks
- Anything PHP can do

All with just a few lines inside the `checkout.session.completed` block.

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
