# Stripe Recurring Payments With Stripe API & PHP Part 2

* **Platform**: YouTube
* **Channel/Creator**: Senaid Bacinovic
* **Duration**: 00:33:51
* **Release Date**: Dec 10, 2018
* **Video Link**: [https://www.youtube.com/watch?v=2NQNYQqImO0](https://www.youtube.com/watch?v=2NQNYQqImO0)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b47981dc -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer) 

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202)
<!-- LH-BUTTONS:END -->

## Overview of the Tutorial
* **Summary**: This video continues from part 1, focusing on processing payments after the user submits credit card details on the pricing page. It covers verifying inputs, creating a user account in the database, sending login details via email, and redirecting to a thank you page.
* **Key Takeaway/Example**: The flow starts with a pricing page offering three plans, each with a "Buy Now" button that posts to paymentProcess.php for handling subscriptions and account creation.
* **Link for More Details**: [Ask AI: Tutorial Overview](https://alisol.ir/?ai=Tutorial%20Overview|Senaid%20Bacinovic|Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202)

## Verifying Payment Details
* **Summary**: In paymentProcess.php, check for required POST data like product ID, Stripe token, and email. Redirect back to the pricing page (index.php) if anything is missing or invalid.
* **Key Takeaway/Example**: Use an array to validate product IDs (e.g., [1 => 'plan_id_27', 2 => 'plan_id_67', 3 => 'plan_id_97']). 
  ```php
  $products = [1 => 'plan_id_27', 2 => 'plan_id_67', 3 => 'plan_id_97'];
  if (!isset($_GET['product_id']) || !in_array($_GET['product_id'], array_keys($products)) || !isset($_POST['stripeToken']) || !isset($_POST['stripeEmail'])) {
      header('Location: index.php');
      exit;
  }
  ```
* **Link for More Details**: [Ask AI: Verifying Payment Details](https://alisol.ir/?ai=Verifying%20Payment%20Details|Senaid%20Bacinovic|Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202)

## Subscribing to the Plan
* **Summary**: Once details are verified, use the Stripe API to create a customer and subscribe them to the selected plan based on the product ID.
* **Key Takeaway/Example**: Dynamically select the plan ID from the array and create the subscription.
  ```php
  $plan_id = $products[$_GET['product_id']];
  // Assuming Stripe setup from part 1, create customer and subscription
  $customer = \Stripe\Customer::create([...]);
  $subscription = \Stripe\Subscription::create(['customer' => $customer->id, 'items' => [['plan' => $plan_id]]]);
  ```
* **Link for More Details**: [Ask AI: Subscribing to Plans](https://alisol.ir/?ai=Subscribing%20to%20Plans|Senaid%20Bacinovic|Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202)

## Setting Up the Database
* **Summary**: Create a database (e.g., 'stripe_recurring') and a 'users' table to store user details like email, plan, password, and registration date.
* **Key Takeaway/Example**: Use phpMyAdmin or SQL to set up the table with fields: id (INT, auto_increment), email (VARCHAR 50), plan (VARCHAR 10), password (VARCHAR 255), registration_date (DATETIME).
  ```sql
  CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(50),
      plan VARCHAR(10),
      password VARCHAR(255),
      registration_date DATETIME
  );
  ```
* **Link for More Details**: [Ask AI: Database Setup](https://alisol.ir/?ai=Database%20Setup|Senaid%20Bacinovic|Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202)

## Generating and Hashing Passwords
* **Summary**: Generate a random 10-character password, shuffle it, and hash it using password_hash() before storing in the database.
* **Key Takeaway/Example**: Create a random string from a character set, shuffle, and take a substring.
  ```php
  $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  $password = substr(str_shuffle($chars), 0, 10);
  $hashed_password = password_hash($password, PASSWORD_BCRYPT);
  ```
* **Link for More Details**: [Ask AI: Password Generation and Hashing](https://alisol.ir/?ai=Password%20Generation%20and%20Hashing|Senaid%20Bacinovic|Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202)

## Inserting User into Database
* **Summary**: After subscription, insert the user's email, plan ID, hashed password, and current datetime into the users table.
* **Key Takeaway/Example**: Use mysqli to connect and insert.
  ```php
  $conn = new mysqli('localhost', 'root', '', 'stripe_recurring');
  $escaped_email = $conn->real_escape_string($_POST['stripeEmail']);
  $conn->query("INSERT INTO users (email, plan, password, registration_date) VALUES ('$escaped_email', '{$_GET['product_id']}', '$hashed_password', NOW())");
  ```
* **Link for More Details**: [Ask AI: Inserting Users](https://alisol.ir/?ai=Inserting%20Users|Senaid%20Bacinovic|Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202)

## Sending Email with PHPMailer
* **Summary**: Use PHPMailer to send an email with login details (email as username, generated password, and login link).
* **Key Takeaway/Example**: Set up PHPMailer for Gmail SMTP.
  ```php
  use PHPMailer\PHPMailer\PHPMailer;
  $mail = new PHPMailer(true);
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'your@gmail.com';
  $mail->Password = 'yourpassword';
  $mail->SMTPSecure = 'ssl'; // or 'tls'
  $mail->Port = 465; // or 587 for tls
  $mail->setFrom('your@gmail.com', 'Your Name');
  $mail->addAddress($escaped_email);
  $mail->isHTML(true);
  $mail->Subject = 'Your Login Details';
  $mail->Body = "Hey,<br><br>Thank you for the purchase. Your login details:<br>Username: $escaped_email<br>Password: $password<br><br>Click here to login: <a href='login.php'>Login</a><br><br>Thanks";
  $mail->send();
  ```
* **Link for More Details**: [Ask AI: Sending Emails with PHPMailer](https://alisol.ir/?ai=Sending%20Emails%20with%20PHPMailer|Senaid%20Bacinovic|Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202)

## Handling Email Errors
* **Summary**: Catch email sending errors, like SMTP connection issues, and handle Gmail's less secure apps setting. Also, note potential port issues on shared hosting.
* **Key Takeaway/Example**: If send fails, set an error flag and display details on the thank you page. Enable less secure apps in Gmail settings if needed.
* **Link for More Details**: [Ask AI: Email Error Handling](https://alisol.ir/?ai=Email%20Error%20Handling|Senaid%20Bacinovic|Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202)

## Redirecting to Thank You Page
* **Summary**: After processing, redirect to thank_you.php, passing error status, password, email, and product ID via GET for fallback display if email fails.
* **Key Takeaway/Example**: 
  ```php
  header("Location: thank_you.php?error=$error&password=$password&user_email=$escaped_email&product_id={$_GET['product_id']}");
  exit;
  ```
* **Link for More Details**: [Ask AI: Redirecting to Thank You](https://alisol.ir/?ai=Redirecting%20to%20Thank%20You|Senaid%20Bacinovic|Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202)

## Creating the Thank You Page
* **Summary**: On thank_you.php, display a thank you message. If email failed (error=1), show login details directly; otherwise, instruct to check inbox/spam.
* **Key Takeaway/Example**: Use Bootstrap for simple layout.
  ```html
  <div class="container">
      <div class="row">
          <div class="col-md-12 text-center">
              <h2>Thank you for your purchase!</h2>
              <?php if ($_GET['error'] == 1): ?>
                  <p>Your login details are included below:</p>
                  <p>Username: <?php echo $_GET['user_email']; ?></p>
                  <p>Password: <?php echo $_GET['password']; ?></p>
                  <p>Click here to login: <a href="login.php">Login</a></p>
              <?php else: ?>
                  <p>Please check your inbox/spam folder.</p>
              <?php endif; ?>
          </div>
      </div>
  </div>
  ```
* **Link for More Details**: [Ask AI: Thank You Page](https://alisol.ir/?ai=Thank%20You%20Page|Senaid%20Bacinovic|Stripe%20Recurring%20Payments%20With%20Stripe%20API%20%26%20PHP%20Part%202)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
