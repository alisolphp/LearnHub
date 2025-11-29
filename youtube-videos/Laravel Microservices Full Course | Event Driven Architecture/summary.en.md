# Laravel Microservices Full Course | Event Driven Architecture

* **Platform**: YouTube
* **Channel/Creator**: Scalable Scripts
* **Duration**: 01:28:06
* **Release Date**: Oct 22, 2020
* **Video Link**: [https://www.youtube.com/watch?v=SzsPe_QX__c](https://www.youtube.com/watch?v=SzsPe_QX__c)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Laravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Laravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Laravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Laravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Laravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Laravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Laravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Laravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Laravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Laravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Laravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Laravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Laravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Laravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Laravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Laravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture)
<!-- LH-BUTTONS:END -->

## Introduction to the Microservices Example
**Summary**: The app demonstrates a simple microservices setup using Laravel for two backends (admin and main), each with its own database. They communicate via RabbitMQ events, with one internal API call from main to admin. Frontends can be in Angular, React, or Vue, but the focus is on the backend. The admin handles product creation, while the main app handles likes, syncing data through events.

**Key Takeaway/Example**: When liking a product in the main app, it triggers a RabbitMQ event to update likes in the admin app. Creating a product in admin fires an event to replicate it in main. There's also an internal call to get a random user from admin for likes.

[Ask AI: Introduction to the Microservices Example](https://alisol.ir/?ai=Introduction%20to%20the%20Microservices%20Example%7CScalable%20Scripts%7CLaravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture)

## Setting Up the Admin Laravel App with Docker
**Summary**: Start with a new Laravel 8 project named 'admin'. Install barryvdh/laravel-ide-helper for better IDE support. Create a Dockerfile based on PHP 7.4, installing necessary packages and Composer. Set up docker-compose.yaml with services for the app and MySQL database, mapping ports and volumes for persistence.

**Key Takeaway/Example**: Run `docker-compose up` to build and start containers. Connect to the database using localhost:33060, root/root credentials. Use `docker-compose exec admin sh` to enter the container for running commands like migrations.

```dockerfile
FROM php:7.4-fpm

# Install packages and extensions...
RUN apt-get update && apt-get install -y ...
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app
COPY . /app
RUN composer install

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0"]
```

[Ask AI: Setting Up the Admin Laravel App with Docker](https://alisol.ir/?ai=Setting%20Up%20the%20Admin%20Laravel%20App%20with%20Docker%7CScalable%20Scripts%7CLaravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture)

## Database Migrations, Factories, and Seeders
**Summary**: Modify default migrations: Simplify users table to just an ID, remove password_resets, disable failed_jobs timestamps. Create products table with title, image, and likes (default 0). Set up factories for users and products using Faker. Create seeders to generate 20 users and 10 products, then run them inside the Docker container.

**Key Takeaway/Example**: In the User model, set `$timestamps = false;` and remove unnecessary traits. For products, use `guarded = []` for mass assignment.

```php
// Product migration
Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('image');
    $table->unsignedInteger('likes')->default(0);
    $table->timestamps();
});
```

[Ask AI: Database Migrations, Factories, and Seeders](https://alisol.ir/?ai=Database%20Migrations%2C%20Factories%2C%20and%20Seeders%7CScalable%20Scripts%7CLaravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture)

## Creating CRUD API for Products
**Summary**: Build a ProductController with index, show, store, update, and destroy methods. Use `apiResource` in routes/api.php to map all CRUD routes. Test endpoints with HTTP requests (e.g., POST /api/products with title and image). Handle responses with appropriate HTTP status codes like 201 for created.

**Key Takeaway/Example**: In store: `Product::create($request->only(['title', 'image']));` Return `response()->json($product, Response::HTTP_CREATED);`.

```php
// routes/api.php
Route::apiResource('products', ProductController::class);
```

[Ask AI: Creating CRUD API for Products](https://alisol.ir/?ai=Creating%20CRUD%20API%20for%20Products%7CScalable%20Scripts%7CLaravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture)

## Setting Up the Main Laravel App
**Summary**: Create a new Laravel project 'main' similarly, with its own Docker setup but different ports. Modify products migration to use unsignedBigInteger for ID (no auto-increment) to sync with admin. Create Product model and controller for basic index.

**Key Takeaway/Example**: Products table: `$table->unsignedBigInteger('id')->primary();` to match admin IDs via events.

[Ask AI: Setting Up the Main Laravel App](https://alisol.ir/?ai=Setting%20Up%20the%20Main%20Laravel%20App%7CScalable%20Scripts%7CLaravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture)

## Configuring RabbitMQ for Event Communication
**Summary**: Install vladimir-yuldashev/laravel-queue-rabbitmq in both apps. Add RabbitMQ config to config/queue.php and .env (using CloudAMQP free tier). Create a test job and command to fire events, handle in EventServiceProvider. Run `php artisan queue:work` to listen.

**Key Takeaway/Example**: Dispatch: `TestJob::dispatch();` Handle: `echo 'Event has been handled' . PHP_EOL;`.

[Ask AI: Configuring RabbitMQ for Event Communication](https://alisol.ir/?ai=Configuring%20RabbitMQ%20for%20Event%20Communication%7CScalable%20Scripts%7CLaravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture)

## Implementing Product Creation Event
**Summary**: Create ProductCreated job in both apps. Dispatch from admin's store method with product data as array. In main's handle, create product with same ID, title, image.

**Key Takeaway/Example**: Dispatch: `ProductCreated::dispatch($product->toArray());` Handle: `Product::create(['id' => $data['id'], 'title' => $data['title'], 'image' => $data['image']]);`.

[Ask AI: Implementing Product Creation Event](https://alisol.ir/?ai=Implementing%20Product%20Creation%20Event%7CScalable%20Scripts%7CLaravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture)

## Handling Product Update and Delete Events
**Summary**: Create ProductUpdated and ProductDeleted jobs. Dispatch from admin's update/destroy with data. In main, find product by ID and update or delete accordingly.

**Key Takeaway/Example**: For update: `$product->update(['title' => $data['title'], 'image' => $data['image']]);` For delete: `Product::destroy($data['id']);`.

[Ask AI: Handling Product Update and Delete Events](https://alisol.ir/?ai=Handling%20Product%20Update%20and%20Delete%20Events%7CScalable%20Scripts%7CLaravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture)

## Adding Like Functionality with Internal API Call
**Summary**: In main, add UserController with random method to get a random user ID from admin. In ProductController, add like method: Call admin's /user endpoint internally using Http::get, then create pivot entry in product_user table to record like, with unique constraint to prevent duplicates.

**Key Takeaway/Example**: Internal call: `Http::get('http://host.docker.internal:8000/api/user')->json()['user_id'];` Use try-catch for duplicate likes.

```php
// Migration for product_user
Schema::create('product_user', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('user_id');
    $table->unsignedBigInteger('product_id');
    $table->unique(['user_id', 'product_id']);
});
```

[Ask AI: Adding Like Functionality with Internal API Call](https://alisol.ir/?ai=Adding%20Like%20Functionality%20with%20Internal%20API%20Call%7CScalable%20Scripts%7CLaravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture)

## Implementing Product Liked Event
**Summary**: Create ProductLiked job. Dispatch from main's like method with product_user data. In admin's handle, find product and increment likes count.

**Key Takeaway/Example**: Dispatch: `ProductLiked::dispatch($productUser->toArray());` Handle: `$product->likes++; $product->save();`.

[Ask AI: Implementing Product Liked Event](https://alisol.ir/?ai=Implementing%20Product%20Liked%20Event%7CScalable%20Scripts%7CLaravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture)

## Configuring Separate Queues
**Summary**: To avoid conflicts, define separate queues in .env (e.g., QUEUE_NAME=admin_queue for admin). Dispatch jobs to specific queues using `::dispatch()->onQueue('main_queue');`. Restart queue workers.

**Key Takeaway/Example**: Ensures events are processed by the correct app without overlap.

[Ask AI: Configuring Separate Queues](https://alisol.ir/?ai=Configuring%20Separate%20Queues%7CScalable%20Scripts%7CLaravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture)

## Automating Queue Workers with Docker
**Summary**: Add a separate service in docker-compose.yaml for the queue worker, using the same Dockerfile but with command `php artisan queue:work`. Remove serve from Dockerfile and add as command to app service. This runs queue:work automatically on startup.

**Key Takeaway/Example**: docker-compose service: `command: php artisan queue:work` and depends_on the DB.

[Ask AI: Automating Queue Workers with Docker](https://alisol.ir/?ai=Automating%20Queue%20Workers%20with%20Docker%7CScalable%20Scripts%7CLaravel%20Microservices%20Full%20Course%20%7C%20Event%20Driven%20Architecture)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
