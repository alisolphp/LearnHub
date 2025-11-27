# Laravel 12 in 11 hours - Laravel for Beginners Full Course

* **Platform**: YouTube
* **Channel/Creator**: The Codeholic
* **Duration**: 10:54:52
* **Release Date**: Oct 14, 2024
* **Video Link**: https://www.youtube.com/watch?v=0M84Nk7iWkA

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=005796ea -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Laravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Laravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Laravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Laravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Laravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Laravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Laravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Laravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Laravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Laravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Laravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Laravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Laravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)
<!-- LH-BUTTONS:END -->

## Course Introduction & What You Will Build
The Codeholic released the first ~11 hours (19 modules) of his premium Laravel for Beginners course for free on YouTube.  
You will build a fully functional car marketplace (grabacar.xyz) where users can browse, search, filter, add to watchlist, view seller contact info (with partial phone masking + AJAX reveal), upload multiple images, and sellers can manage their listings.  
The project uses pure HTML/CSS/JS (no frameworks on the frontend, SQLite for local dev, and covers authentication (email/password + Google/Facebook), image handling, pagination, testing, and deployment.  
Two 100% coupon codes for the full premium course + written notes are hidden at random spots in this 11-hour video — watch carefully or skim to find them!

[Ask AI: Laravel Beginner Project Ideas](https://alisol.ir/?ai=Laravel%20Beginner%20Project%20Ideas%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Why Deployment Matters From Day One
Deploying early is a game-changer for your portfolio. A live demo link beats screenshots every time.  
The course teaches deployment with GitHub Actions + VPS (Hostinger) so updates go live instantly.  
Hostinger is recommended (single panel for domain, hosting, email, SSL, Cloudflare CDN). Use coupon **learnlaravel** at hostinger.com/learnlaravel for extra 10% off.

[Ask AI: Laravel Deployment with GitHub Actions and VPS](https://alisol.ir/?ai=Laravel%20Deployment%20with%20GitHub%20Actions%20and%20VPS%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Laravel Overview & Benefits
Laravel (created by Taylor Otwell in 2011) is the most popular PHP framework. Key advantages:
- Elegant syntax
- Eloquent ORM
- Blade templating
- Built-in auth, testing, queues, caching
- Huge ecosystem (packages for almost everything)
- MVC structure, great security defaults, and high performance out of the box.

[Ask AI: Why Choose Laravel in 2025](https://alisol.ir/?ai=Why%20Choose%20Laravel%20in%202025%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Development Environment Setup
Recommended local setup:
- Laravel Herd (free tier includes PHP 8.3+, Nginx, Composer, Node) — fastest for macOS/Windows
- Or XAMPP/WAMP + manually install Composer & Node
- Editor: PHPStorm (best for Laravel) or VS Code with extensions:
  - PHP Intelephense
  - Laravel Blade Snippets
  - Laravel Extra Intellisense
  - Laravel goto view
  - Blade Formatter

Before installing Laravel with Herd, set `variables_order = "GPCS"` in Herd’s php.ini and run `herd restart`.

[Ask AI: Best Laravel Local Development Environment 2025](https://alisol.ir/?ai=Best%20Laravel%20Local%20Development%20Environment%202025%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Creating a New Laravel Project
```bash
laravel new laravel-course
# Choose: No starter kit + SQLite
cd laravel-course
php artisan serve
```
Project runs at http://127.0.0.1:8000

[Ask AI: Laravel New Project Options Explained](https://alisol.ir/?ai=Laravel%20New%20Project%20Options%20Explained%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Artisan — Your Command-Line Superpower
```bash
php artisan list                # all commands
php artisan help migrate:refresh # detailed help
php artisan make:controller     # example of make:* group
php artisan queue:help          # challenge answer
```
Artisan file (root) bootstraps the app and passes console input.

[Ask AI: Most Useful Laravel Artisan Commands](https://alisol.ir/?ai=Most%20Useful%20Laravel%20Artisan%20Commands%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Laravel Directory Structure Quick Tour
Key folders you’ll use daily:
- `app/` — models, controllers, jobs, events, etc.
- `bootstrap/` — app.php (bootstrapping) + providers.php
- `config/` — all config files (can publish more with `config:publish`)
- `database/` — migrations, factories, seeds, sqlite file
- `public/` — only web-accessible folder (index.php entry point)
- `resources/` — views, JS, CSS, lang
- `routes/` — web.php, api.php
- `storage/` — logs, cached views, uploaded files
- `tests/`
- `vendor/`

[Ask AI: Laravel Folder Structure Explained](https://alisol.ir/?ai=Laravel%20Folder%20Structure%20Explained%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Your First Route + Blade View
```php
// routes/web.php
Route::get('/about', fn() => view('about'));

// resources/views/about.blade.php
<h1>Hello — welcome to my Laravel course!</h1>
```

[Ask AI: Laravel Routes and Blade Basics](https://alisol.ir/?ai=Laravel%20Routes%20and%20Blade%20Basics%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Laravel Request Lifecycle
public/index.php → vendor/autoload.php → bootstrap/app.php → kernel → router → middleware → controller/action → response (possibly through middleware again).

[Ask AI: Laravel Request Lifecycle Step by Step](https://alisol.ir/?ai=Laravel%20Request%20Lifecycle%20Step%20by%20Step%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Configuration — .env + Config Files
All sensitive or environment-specific values go in `.env`.  
Config files in `config/` pull from `env()` helper with defaults.  
Publish hidden config files with `php artisan config:publish`.

[Ask AI: Laravel .env and Config Best Practices](https://alisol.ir/?ai=Laravel%20.env%20and%20Config%20Best%20Practices%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Debugging — dump() vs dd()
```php
dump($user);    // pretty-print + continue
dd($user);      // dump and die (stops execution)
```

[Ask AI: Laravel Debugging Tips dump dd tinker](https://alisol.ir/?ai=Laravel%20Debugging%20Tips%20dump%20dd%20tinker%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Route Methods, Redirects & View Routes
```php
Route::post(...)
Route::put(...), Route::patch(...), Route::delete(...)
Route::match(['get', 'post'], ...)
Route::any(...)          // matches everything
Route::redirect('/old', '/new', 301);
Route::view('/contact', 'contact', ['phone' => '123']);
```

[Ask AI: Laravel Route Types and Redirects](https://alisol.ir/?ai=Laravel%20Route%20Types%20and%20Redirects%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Route Parameters — Required, Optional & Constraints
```php
Route::get('product/{id}', fn($id) => $id);
Route::get('product/{category?}', fn($category = null) => $category)
     ->where('category', '.*'); // optional + any chars

// Constraints
->where('id', '[0-9]+')
->whereNumber('id')
->whereAlpha('slug')
->whereUuid('uuid')
->whereIn('role', ['admin', 'moderator'])
```

[Ask AI: Laravel Route Parameters and Constraints](https://alisol.ir/?ai=Laravel%20Route%20Parameters%20and%20Constraints%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Eager Loading — Fix N+1 Queries
```php
$cars = Car::with(['maker', 'model', 'carType', 'city', 'user', 'primaryImage'])->latest()->take(30)->get();
```
Without `with()` the homepage made ~181 queries. With it — only 7.

[Ask AI: Laravel N+1 Problem and Eager Loading](https://alisol.ir/?ai=Laravel%20N%2B1%20Problem%20and%20Eager%20Loading%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Joins & Selecting Specific Columns
```php
Car::join('cities', 'cars.city_id', '=', 'cities.id')
     ->select('cars.*', 'cities.name as city_name')
     ->where('cities.state_id', 1)
     ->get();
```

[Ask AI: Laravel Joins vs Relationships Performance](https://alisol.ir/?ai=Laravel%20Joins%20vs%20Relationships%20Performance%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Advanced Where Clauses
```php
->orWhere('year', '>', 2022)
->whereNot('mileage', '>', 100000)
->whereIn('maker_id', [1, 2])
->whereNull('published_at')
->whereDate('created_at', '2024-07-12')
->whereColumn('updated_at', '>', 'created_at')
```

[Ask AI: Laravel Advanced Where Clauses](https://alisol.ir/?ai=Laravel%20Advanced%20Where%20Clauses%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Pagination — Built-in + Custom Views
```php
$cars = Car::...->paginate(15);

// Custom view
$cars->onEachSide(1)->links('pagination.custom');
```
Also: simplePaginate(), appends(), withQueryString(), fragment()
```

[Ask AI: Laravel Pagination Customisation](https://alisol.ir/?ai=Laravel%20Pagination%20Customisation%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Working with Request Data
```php
public function index(Request $request)
{
    $request->path();
    $request->url();
    $request->fullUrl();
    $request->method();
    $request->ip();
}
```

[Ask AI: Laravel Request Object All Methods](https://alisol.ir/?ai=Laravel%20Request%20Object%20All%20Methods%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Returning Responses
```php
return 'Hello'; // auto response
return ['key' => 'value']; // auto JSON
return response('Hello', 201)->header('X-Custom', 'Value');
return response()->json(['data' => $cars]);
return response()->view('cars.show', $data, 200)->withHeaders([...]);
```

[Ask AI: Laravel Response Types and Headers](https://alisol.ir/?ai=Laravel%20Response%20Types%20and%20Headers%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

## Redirects
```php
return redirect('/cars/create');
return redirect()->route('cars.show', ['car' => $car]);
return redirect()->back()->with('status', 'Saved!');
return redirect()->away('https://google.com');
```

[Ask AI: Laravel Redirect Methods with Flash Data](https://alisol.ir/?ai=Laravel%20Redirect%20Methods%20with%20Flash%20Data%7CThe%20Codeholic%7CLaravel%2012%20in%2011%20hours%20-%20Laravel%20for%20Beginners%20Full%20Course)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
