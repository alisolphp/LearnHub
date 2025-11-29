# Stripe Recurring Payments With Stripe API & PHP Part 1

* **Platform**: YouTube
* **Channel/Creator**: Senaid Bacinovic
* **Duration**: 00:27:39
* **Release Date**: Dec 3, 2018
* **Video Link**: [Watch on YouTube](https://www.youtube.com/watch?v=oESOtH1cEZM)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=31acc7b2 -->

### AI-Powered buttons

Start teaching this to a:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201) | 
[Story](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201)
<!-- LH-BUTTONS:END -->

## What This Series Will Cover
The tutorial is a three-part series that goes beyond just creating a recurring subscription. You’ll build a complete mini SaaS flow:
- Pricing page with multiple packages
- Stripe Checkout → create customer + subscription
- Save user account in your database
- Send login credentials via email
- Protected dashboard that shows content based on the purchased plan
- Automatic subscription renewal + access extension
- Webhook handler to handle renewal/cancellation events

This first part focuses on the pricing page and the initial successful payment that creates the Stripe customer + subscription.

[Ask AI: Stripe recurring payments full flow PHP](https://alisol.ir/?ai=Stripe%20recurring%20payments%20full%20flow%20PHP%7CSenaid%20Bacinovic%7CStripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201)

## Building the Pricing Page (HTML + Bootstrap + Stripe Checkout)
Create a clean pricing page with three cards (or more) packages using Bootstrap cards.

Key points from the demo:
- Use Bootstrap CDN for fast styling
- Each card has header (price), body (features list), and footer (Stripe Checkout button)
- Add a little hover scale effect with CSS for polish
- Use Stripe’s prebuilt Checkout (the simple <form> version that was current in 2018)

```html
<div class="container mt-5">
    <div class="row">
        <div class="col-md-4">
            <div class="card text-center">
                <div class="card-header"><h2 class="price">€27<span class="currency">€</span></h2></div>
                <div class="card-body">
                    <h5>Basic Plan</h5>
                    <ul class="list-unstyled">
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <!-- ... -->
                    </ul>
                </div>
                <div class="card-footer">
                    <form action="paymentprocess.php?product_id=1" method="POST">
                      <script src="https://checkout.stripe.com/checkout.js" class="stripe-button"
                              data-key="pk_test_XXXXXXXXXXXXXXXXXXXXXXXX"
                              data-amount="2700"
                              data-currency="eur"
                              data-name="Basic Plan"
                              data-description="Monthly subscription"
                              data-locale="auto">
                      </script>
                    </form>
                </div>
            </div>
        </div>
        <!-- Repeat for other plans (product_id=2,3 with 6700, 9700 cents) -->
    </div>
</div>
```

Amount is in cents → €27.00 = 2700.  
The publishable key is automatically filled when you are logged into your Stripe account and visit the docs.

[Ask AI: Stripe Checkout legacy form integration](https://alisol.ir/?ai=Stripe%20Checkout%20legacy%20form%20integration%7CSenaid%20Bacinovic%7CStripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201)

## Create Recurring Pricing Plans in Stripe Dashboard
Before the checkout button works for subscriptions you need actual plans:

1. Dashboard → Billing → Products → Add product
2. Give it a name (e.g., “27 bucks subscription”)
3. Add a recurring price → set interval (monthly, weekly, …), price per unit, trial days (0 in the video)
4. Save → copy the Price ID (looks like price_1....)

Repeat for each tier. These Price IDs will be used on the server side.

[Ask AI: Creating recurring pricing plans in Stripe](https://alisol.ir/?ai=Creating%20recurring%20pricing%20plans%20in%20Stripe%7CSenaid%20Bacinovic%7CStripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201)

## Server-Side: paymentprocess.php
Download the Stripe PHP library manually (or via Composer) and include init.php.

```php
<?php
require_once('stripe/init.php');

\Stripe\Stripe::setApiKey('sk_test_XXXXXXXXXXXXXXXXXXXXXXXX');

$token  = $_POST['stripeToken'];
$email  = $_POST['stripeEmail'];
$product_id = $_GET['product_id'];

// Map your product_id → Stripe Price ID
$priceIds = [
    1 => 'price_1ABC...',
    2 => 'price_1DEF...',
    3 => 'price_1GHI...',
];

$customer = \Stripe\Customer::create([
    'email' => $email,
    'source' => $token,
]);

$subscription = \Stripe\Subscription::create([
    'customer' => $customer->id,
    'items' => [['price' => $priceIds[$product_id]]],
]);

// TODO in part 2:
// - Save user to your DB
// - Generate password + send login email
// - Redirect to thank-you page
```

This creates a real Stripe customer and attaches an active recurring subscription immediately. The first charge happens right away (no trial in this example).

[Ask AI: Create Stripe subscription after Checkout PHP](https://alisol.ir/?ai=Create%20Stripe%20subscription%20after%20Checkout%20PHP%7CSenaid%20Bacinovic%7CStripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%201)

## Testing the Flow
Use Stripe’s test card 4242 4242 4242 4242 → any future expiry → any CVC.  
After submission you’ll see:
- A new customer in Dashboard → Customers
- An active subscription with the correct plan
- First invoice marked “Paid”

Everything up to this point works perfectly in test mode.

## What’s Coming in Part 2 & 3
- Save the user in your own database when subscription is created
- Generate and email login credentials
- Build a protected member dashboard that checks the Stripe subscription status
- Handle webhook events (invoice.payment_succeeded, customer.subscription.deleted, etc.) to automatically extend or revoke access

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
