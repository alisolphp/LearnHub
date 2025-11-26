# Course Summary: Laravel Queue Mastery

* **Platform**: Laracasts
* **Instructor**: Mohamed Said
* **Duration**: 01:41:00
* **Release Date**: June 7, 2021
* **Course Link**: https://laracasts.com/series/laravel-queue-mastery

*This document summarizes the key points from the course. I highly recommend watching the full course if you have the opportunity.*

## Before You Get Started
- I summarize key points from useful courses to learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## Dispatching and Running Jobs

* **Summary**: This section kicks things off by explaining how to handle long-running tasks asynchronously in Laravel. You'll learn to create a job, dispatch it to the queue, set up a database queue driver, and start a worker to process jobs in the background, ensuring your app responds quickly to users.
* **Example**: Imagine sending a welcome email that takes a few seconds—create a `SendWelcomeEmail` job with `php artisan make:job SendWelcomeEmail`, add logic like `sleep(3)` to simulate work, dispatch it with `dispatch(new SendWelcomeEmail())`, and run `php artisan queue:work` to process it without delaying the HTTP response.
* **Link for More Details**: [Ask AI: Dispatching and Running Jobs](https://alisol.ir/?ai=Dispatching%20and%20Running%20Jobs%7CMohamed%20Said%7CLaravel%20Queue%20Mastery)

## Configuring Jobs

* **Summary**: Here, we dive into customizing job behavior, like adding delays before processing, setting timeouts to prevent stuck jobs, configuring retries for failures, and using backoffs to space out retries intelligently.
* **Example**: For a job that might hang, set `public $timeout = 1;` and use `sleep(3)` in the handle method—when dispatched, the worker will terminate it after one second, marking it as failed, showing how timeouts protect your system.
* **Link for More Details**: [Ask AI: Configuring Jobs](https://alisol.ir/?ai=Configuring%20Jobs%7CMohamed%20Said%7CLaravel%20Queue%20Mastery)

## Handling Attempts Failures

* **Summary**: This part focuses on managing job failures gracefully, including automatic retries with backoffs, releasing jobs back to the queue manually, distinguishing between exception-based failures and releases, and running custom code when a job ultimately fails.
* **Example**: Throw an exception in your job's handle method and set `public $tries = 3;` with `public $backoff = 2;”—the worker will retry it three times, waiting two seconds between each attempt, and if it still fails, trigger a `failed` method to log the issue.
* **Link for More Details**: [Ask AI: Handling Attempts Failures](https://alisol.ir/?ai=Handling%20Attempts%20Failures%7CMohamed%20Said%7CLaravel%20Queue%20Mastery)

## Dispatching Workflows

* **Summary**: Learn to group jobs into workflows: chains for sequential execution (stopping if one fails) and batches for parallel processing, with options to handle failures and track progress in the database.
* **Example**: For a deployment, use `Bus::chain([new PullRepo(), new RunTests(), new Deploy()])->dispatch();`—if tests fail, the deploy won't run, ensuring the process halts on errors.
* **Link for More Details**: [Ask AI: Dispatching Workflows](https://alisol.ir/?ai=Dispatching%20Workflows%7CMohamed%20Said%7CLaravel%20Queue%20Mastery)

## More Complex Workflows

* **Summary**: Build on basics by adding callbacks for failures (catch), success (then), or completion (finally) in chains and batches, plus nesting chains inside batches or vice versa for advanced setups.
* **Example**: Dispatch a batch with two chains: `Bus::batch([[new PullRepoProject1(), new RunTestsProject1()], [new PullRepoProject2(), new RunTestsProject2()]])->dispatch();`—both projects process in parallel, but steps within each are sequential.
* **Link for More Details**: [Ask AI: More Complex Workflows](https://alisol.ir/?ai=More%20Complex%20Workflows%7CMohamed%20Said%7CLaravel%20Queue%20Mastery)

## Controlling and Limiting Jobs

* **Summary**: Prevent race conditions with atomic locks, Redis funnels for concurrency limits, throttles for rate limiting, and middleware like `WithoutOverlapping` to avoid simultaneous runs.
* **Example**: In a deployment job, use `Cache::lock('deployments')->block(10, function () { // deployment code });`—if another worker tries to deploy simultaneously, it waits or fails, avoiding file conflicts.
* **Link for More Details**: [Ask AI: Controlling and Limiting Jobs](https://alisol.ir/?ai=Controlling%20and%20Limiting%20Jobs%7CMohamed%20Said%7CLaravel%20Queue%20Mastery)

## More Job Configurations

* **Summary**: Explore uniqueness to avoid duplicate jobs in the queue, circuit breakers with `ThrottlesExceptions` middleware to pause on repeated failures, and when to release locks for uniqueness.
* **Example**: Implement `ShouldBeUnique` on a job class—dispatching it multiple times adds only one to the queue, perfect for tasks like syncing data where duplicates waste resources.
* **Link for More Details**: [Ask AI: More Job Configurations](https://alisol.ir/?ai=More%20Job%20Configurations%7CMohamed%20Said%7CLaravel%20Queue%20Mastery)

## Designing Reliable Jobs

* **Summary**: Tips for robust jobs: delay dispatch until after database commits, keep jobs self-contained without external state, minimize dependencies, and encrypt sensitive data in payloads.
* **Example**: Inside a DB transaction, dispatch a job with `->afterCommit()`—it only queues after the transaction succeeds, preventing issues like emailing about a user that wasn't saved yet.
* **Link for More Details**: [Ask AI: Designing Reliable Jobs](https://alisol.ir/?ai=Designing%20Reliable%20Jobs%7CMohamed%20Said%7CLaravel%20Queue%20Mastery)

## Deployments

* **Summary**: Manage workers during deployments using Supervisor for monitoring, `queue:restart` to reload code, or Supervisor controls for graceful shutdowns to avoid breaking running jobs.
* **Example**: Add `php artisan queue:restart` to your deployment script—after new code deploys, workers exit gracefully and restart with the updates, ensuring consistency.
* **Link for More Details**: [Ask AI: Deployments](https://alisol.ir/?ai=Deployments%7CMohamed%20Said%7CLaravel%20Queue%20Mastery)

## Scaling Workers

* **Summary**: Scale dynamically with Cron for scheduled extra workers, Supervisor for fixed pools, or Horizon for auto-balancing based on queue load and clear times.
* **Example**: Set a Cron job to run `php artisan queue:work --stop-when-empty --max-time=540` every 10 minutes—it starts a worker that exits if the queue is empty or after 9 minutes, adapting to load without overwhelming the server.
* **Link for More Details**: [Ask AI: Scaling Workers](https://alisol.ir/?ai=Scaling%20Workers%7CMohamed%20Said%7CLaravel%20Queue%20Mastery)

## Configurations Reference

* **Summary**: A comprehensive overview of all queue:work options (like timeouts, sleep, memory limits) and job properties (connections, retries, uniqueness) for fine-tuning your setup.
* **Example**: Use `--sleep=1` on `queue:work` to check for new jobs more frequently, reducing latency but increasing CPU use—great for high-priority queues.
* **Link for More Details**: [Ask AI: Configurations Reference](https://alisol.ir/?ai=Configurations%20Reference%7CMohamed%20Said%7CLaravel%20Queue%20Mastery)

## Under the Hood

* **Summary**: Peek into Laravel's queue internals: how dispatch serializes jobs, workers process them with timeouts and events, and the flow from dispatch to execution.
* **Example**: The `dispatch` helper uses the `Dispatchable` trait to create a pending dispatch, which serializes the job payload (including handlers) for storage, then workers unserialize and fire it via `CallQueuedHandler`.
* **Link for More Details**: [Ask AI: Under the Hood](https://alisol.ir/?ai=Under%20the%20Hood%7CMohamed%20Said%7CLaravel%20Queue%20Mastery)

For the full course, visit [Laravel Queue Mastery on Laracasts](https://laracasts.com/series/laravel-queue-mastery).

---

**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
