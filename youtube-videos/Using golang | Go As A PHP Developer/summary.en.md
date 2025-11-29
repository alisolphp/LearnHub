# Using golang / Go As A PHP Developer

* **Platform**: YouTube
* **Channel/Creator**: Joseph Montanez
* **Duration**: 00:26:14
* **Release Date**: May 10, 2024
* **Video Link**: [https://www.youtube.com/watch?v=rkxwzikiacY](https://www.youtube.com/watch?v=rkxwzikiacY)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Using%20golang%20%7C%20Go%20As%20A%20PHP%20Developer) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Using%20golang%20%7C%20Go%20As%20A%20PHP%20Developer) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Using%20golang%20%7C%20Go%20As%20A%20PHP%20Developer) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Using%20golang%20%7C%20Go%20As%20A%20PHP%20Developer) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Using%20golang%20%7C%20Go%20As%20A%20PHP%20Developer) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Using%20golang%20%7C%20Go%20As%20A%20PHP%20Developer) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Using%20golang%20%7C%20Go%20As%20A%20PHP%20Developer) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Using%20golang%20%7C%20Go%20As%20A%20PHP%20Developer) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Using%20golang%20%7C%20Go%20As%20A%20PHP%20Developer) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Using%20golang%20%7C%20Go%20As%20A%20PHP%20Developer) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Using%20golang%20%7C%20Go%20As%20A%20PHP%20Developer) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Using%20golang%20%7C%20Go%20As%20A%20PHP%20Developer)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Using%20golang%20%7C%20Go%20As%20A%20PHP%20Developer) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Using%20golang%20%7C%20Go%20As%20A%20PHP%20Developer) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Using%20golang%20%7C%20Go%20As%20A%20PHP%20Developer) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Using%20golang%20%7C%20Go%20As%20A%20PHP%20Developer)
<!-- LH-BUTTONS:END -->

## Developer Loop and Hot Reloading
Go offers a fast iteration cycle similar to PHP, where changes reflect immediately without waiting for compilation. Tools like 'air' enable hot reloading, including live reload via proxy without extra setup. For templating systems like Temple, it handles recompilation and server restarts seamlessly.
Key takeaway: On slower machines, there might be a slight delay, but overall, it mimics PHP's quick refresh in the browser.
[Ask AI: Go Developer Loop](https://alisol.ir/?ai=Go%20Developer%20Loop|Joseph%20Montanez|Using%20golang%20/%20Go%20As%20A%20PHP%20Developer)

## Handling Legacy Versions and Built-in Features
Unlike PHP, where upgrading from old versions like 5.6 involves major jumps and framework dependencies, Go builds web features directly into the language. No need for monolithic frameworks like Laravel or Symfony; everything ships with the runtime.
Key takeaway: This reduces ecosystem fragmentation, as you avoid dealing with outdated PHP sites or diverse CMS like WordPress.
[Ask AI: Go vs PHP Legacy Handling](https://alisol.ir/?ai=Go%20vs%20PHP%20Legacy%20Handling|Joseph%20Montanez|Using%20golang%20/%20Go%20As%20A%20PHP%20Developer)

## Deployment on Shared Hosting
Go apps compile to a single binary, making deployment portable across platforms like shared hosting via CGI or FastCGI. Build on any OS, target Linux/AMD64, and upload—no runtime version worries. Disable CGO for static builds to avoid external dependencies.
Key takeaway: Supports database connections, JWT, encryption, and image processing without C libraries. Source code is protected in the binary, unlike PHP's need for encoders like IonCube.
```go
// Example: Building without CGO
GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o main
```
[Ask AI: Go Deployment on Shared Hosting](https://alisol.ir/?ai=Go%20Deployment%20on%20Shared%20Hosting|Joseph%20Montanez|Using%20golang%20/%20Go%20As%20A%20PHP%20Developer)

## Language Differences: Procedural vs OOP
Go favors procedural, imperative code with composition over encapsulation, unlike PHP's interfaces, traits, and OOP. It's not fully functional but has some OO properties. Adapt by using structs and methods instead of classes.
Key takeaway: For custom types like handling nulls in databases, implement interfaces like Scanner directly on structs for seamless integration.
```go
type NullTime struct {
    Time  time.Time
    Valid bool
}

func (nt *NullTime) Scan(value interface{}) error {
    // Implementation for scanning from database
}
```
[Ask AI: Go Language Paradigms](https://alisol.ir/?ai=Go%20Language%20Paradigms|Joseph%20Montanez|Using%20golang%20/%20Go%20As%20A%20PHP%20Developer)

## Function Composition for Optional Parameters
Go lacks optional parameters, so use composition: wrap functions to provide defaults or extensions. This avoids global namespaces while keeping things statically typed.
Key takeaway: Attach handlers to structs for context passing, like database connections, without global availability.
```go
type AppContext struct {
    DB *sql.DB
}

func (app *AppContext) RegisterHandler(w http.ResponseWriter, r *http.Request) {
    // Handler logic using app.DB
}
```
[Ask AI: Go Function Composition](https://alisol.ir/?ai=Go%20Function%20Composition|Joseph%20Montanez|Using%20golang%20/%20Go%20As%20A%20PHP%20Developer)

## Switching Between HTTP and FastCGI
Easily toggle between dedicated HTTP servers and FastCGI for shared hosting using environment variables. Load configs from .env files and serve accordingly.
Key takeaway: Use .htaccess for routing, similar to PHP's mod_rewrite, to hide script names in URLs and protect sensitive files.
```apache
AddHandler fcgid-script .fcgi
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ main.fcgi/$1 [QSA,L]
```
[Ask AI: Go HTTP vs FastCGI](https://alisol.ir/?ai=Go%20HTTP%20vs%20FastCGI|Joseph%20Montanez|Using%20golang%20/%20Go%20As%20A%20PHP%20Developer)

## Database Migrations and Seeding
Use Goose for SQL-based migrations with up/down commands. Embed migrations in the binary for automatic runs on deployment. Seeding can pull data from external sources like GitHub CSVs.
Key takeaway: Call migrations from the main function with relative paths for seamless setup on new servers.
```go
goose.Up(db, "migrations")
```
[Ask AI: Go Database Migrations](https://alisol.ir/?ai=Go%20Database%20Migrations|Joseph%20Montanez|Using%20golang%20/%20Go%20As%20A%20PHP%20Developer)

## Asynchronous Work with Goroutines
Go's goroutines enable built-in async without PHP's hacks like curl to self or cron jobs. Run parallel tasks, like waiting 5 seconds each, completing in total time of the longest.
Key takeaway: Channels collect results; avoids overhead of extra connections in PHP.
```go
ch := make(chan string)
for i := 0; i < 5; i++ {
    go func() {
        time.Sleep(5 * time.Second)
        ch <- "result"
    }()
}
```
[Ask AI: Go Goroutines](https://alisol.ir/?ai=Go%20Goroutines|Joseph%20Montanez|Using%20golang%20/%20Go%20As%20A%20PHP%20Developer)

## Background Tasks and Limitations
Start non-blocking background jobs that run independently, like writing to files every 10 seconds. In FastCGI, processes have timeouts (e.g., 1 hour default).
Key takeaway: CGI waits for completion before responding, limiting early outputs. Buffers in Apache affect flushing.
[Ask AI: Go Background Tasks](https://alisol.ir/?ai=Go%20Background%20Tasks|Joseph%20Montanez|Using%20golang%20/%20Go%20As%20A%20PHP%20Developer)

## Server-Side Events and WebSockets in Go
SSE works in HTTP mode but not in FastCGI due to buffers (e.g., 64KB default). WebSockets and gRPC are unavailable in shared hosting's FastCGI.
Key takeaway: Proxy modes in 'air' may conflict with SSE; use direct HTTP for testing.
[Ask AI: Go SSE and WebSockets](https://alisol.ir/?ai=Go%20SSE%20and%20WebSockets|Joseph%20Montanez|Using%20golang%20/%20Go%20As%20A%20PHP%20Developer)

## Templating with Temple
Temple provides Go-like syntax in templates, similar to Blade in Laravel, with JSX-style embedding. Supports HTMX for partial responses in SPA-like experiences.
Key takeaway: Lacks full IDE support (e.g., no auto-formatting), but simplifies logic hiding, like conditional full/partial renders.
```templ
templ Layout(req *http.Request) {
    if !htmx.IsHTMX(req) {
        // Full HTML
    }
    { children... }
}
```
[Ask AI: Go Templating with Temple](https://alisol.ir/?ai=Go%20Templating%20with%20Temple|Joseph%20Montanez|Using%20golang%20/%20Go%20As%20A%20PHP%20Developer)

## Debugging and Deployment Tools
Use Delve for debugging, integrable with 'air' for auto-reconnect on reloads. Ansible or custom SSH scripts handle deployments quickly (2-3 seconds for simple updates).
Key takeaway: GoLand offers remote browsing and database inspection, akin to PHPStorm.
[Ask AI: Go Debugging Tools](https://alisol.ir/?ai=Go%20Debugging%20Tools|Joseph%20Montanez|Using%20golang%20/%20Go%20As%20A%20PHP%20Developer)

## Productivity and Customization
Productivity matches PHP once familiar; build core functions without monolithic frameworks. Easily customize features like JWT signing, avoiding layers in frameworks like Laravel.
Key takeaway: Simplifies overrides for edge cases, like ignoring expirations based on token subjects.
[Ask AI: Go Productivity for PHP Devs](https://alisol.ir/?ai=Go%20Productivity%20for%20PHP%20Devs|Joseph%20Montanez|Using%20golang%20/%20Go%20As%20A%20PHP%20Developer)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
