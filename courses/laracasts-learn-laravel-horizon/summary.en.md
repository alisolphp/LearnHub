# Course Summary: Learn Laravel Horizon

* **Platform**: Laracasts
* **Instructor**: Andre Madarang
* **Duration**: 38 minutes
* **Release Date**: November 2, 2020
* **Course Link**: https://laracasts.com/series/learn-laravel-horizon

*This document summarizes the key points from the course. I highly recommend watching the full course if you have the opportunity.*

## Before You Get Started
- I summarize key points from useful courses to learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=4ea0b5d0 -->

### AI-Powered buttons

Teach Me:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=courses/laracasts-learn-laravel-horizon) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=courses/laracasts-learn-laravel-horizon) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=courses/laracasts-learn-laravel-horizon) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=courses/laracasts-learn-laravel-horizon) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=courses/laracasts-learn-laravel-horizon) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=courses/laracasts-learn-laravel-horizon) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=courses/laracasts-learn-laravel-horizon) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=courses/laracasts-learn-laravel-horizon) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=courses/laracasts-learn-laravel-horizon) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=courses/laracasts-learn-laravel-horizon) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=courses/laracasts-learn-laravel-horizon) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=courses/laracasts-learn-laravel-horizon)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=courses/laracasts-learn-laravel-horizon) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=courses/laracasts-learn-laravel-horizon) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=courses/laracasts-learn-laravel-horizon) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=courses/laracasts-learn-laravel-horizon) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=courses/laracasts-learn-laravel-horizon)
<!-- LH-BUTTONS:END -->

## Topic 1: Installation, Usage, and Features

* **Summary**: This opening episode gets you started with Laravel Horizon by covering the basics of installation, setting up Redis as your queue driver, and exploring the dashboard's main features. Andre explains how to configure queues, monitor jobs, handle failures, and use tools like metrics and tags to keep an eye on your application's performance. It's all about making queue management straightforward and visual.
* **Example**: For instance, after installing Horizon and firing up the worker with `php artisan horizon`, you can dispatch 50 jobs to process emails or user tasks, and watch them appear in real-time on the dashboard—showing pending, completed, and any failed ones with stack traces for easy debugging.
* **Link for More Details**: [Ask AI: Installation, Usage, and Features](https://alisol.ir/?ai=Installation%2C%20Usage%2C%20and%20Features%7CAndre%20Madarang%7CLearn%20Laravel%20Horizon)

## Topic 2: Horizon Notifications

* **Summary**: Here, Andre dives into setting up notifications to stay on top of queue issues, like when jobs are waiting too long or failing. You'll learn how to configure alerts via email, SMS, or Slack for things like excessive wait times, and how to hook into Laravel's failed job events to send custom notifications. It's a practical way to ensure your queues don't cause downtime without you knowing.
* **Example**: Imagine a spike in traffic causing your queue wait time to exceed 2 seconds—Horizon can automatically email you details, so you can scale up processes. Or, if a job fails due to a third-party service outage, you'll get an alert with the job class, body, and exception trace to fix it quickly.
* **Link for More Details**: [Ask AI: Horizon Notifications](https://alisol.ir/?ai=Horizon%20Notifications%7CAndre%20Madarang%7CLearn%20Laravel%20Horizon)

## Topic 3: Using Horizon with Laravel Forge

* **Summary**: The final part focuses on deploying Horizon to a production environment using Laravel Forge. Andre shows how to set up authentication for the dashboard, configure daemons to keep workers running, and integrate termination commands into your deploy script. It's geared toward making sure your queues run smoothly in a live setting without manual intervention.
* **Example**: On Forge, you add a daemon for `php artisan horizon` to run continuously as the 'forge' user. Then, in your deploy script, include `php artisan horizon:terminate` so that after pushing new code, the workers restart automatically, picking up changes without downtime.
* **Link for More Details**: [Ask AI: Using Horizon with Laravel Forge](https://alisol.ir/?ai=Using%20Horizon%20with%20Laravel%20Forge%7CAndre%20Madarang%7CLearn%20Laravel%20Horizon)

For the full experience, check out the original course here: [Learn Laravel Horizon on Laracasts](https://laracasts.com/series/learn-laravel-horizon)

---

**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
