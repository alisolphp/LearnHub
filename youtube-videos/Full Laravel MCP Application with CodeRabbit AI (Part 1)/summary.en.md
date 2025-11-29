# Full Laravel MCP Application with CodeRabbit AI (Part 1)

* **Platform**: YouTube
* **Channel/Creator**: nunomaduro
* **Duration**: 01:26:23
* **Release Date**: Sep 20, 2025
* **Video Link**: https://www.youtube.com/watch?v=ClxzgtwUhTQ

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=47fdb3b8 -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201)) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201)) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201)) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201)) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201)) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201)) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201)) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201)) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201)) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201)) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201)) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201))

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201)) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201)) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201))
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201))
<!-- LH-BUTTONS:END -->

## What is Laravel MCP and Why It Matters
Laravel MCP is a new package that adds a dedicated entry point for AI agents (Cursor, Claude, Junie, etc.) to interact with your Laravel app — just like you already have web routes, API routes, and console commands. Think of it as “an API for agents”. It lets agents perform actions on behalf of the user without the user ever touching a browser or Postman.

**Key analogy from Nuno**:  
Imagine a hotel. Reservations can come in via:
- Phone call
- Website form
- Third-party API (booking.com)
- MCP → AI agents call your app directly with natural language

[Ask AI: Laravel MCP Basics](https://alisol.ir/?ai=Laravel%20MCP%20Basics%7Cnunomaduro%7CFull%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201))

## Project Goal – Nuno Nation Chat
We’re building a tiny chat app (“Nuno Nation Chat”) from scratch so anyone can:
1. Open Cursor (or Claude)
2. Say “I am Nuno, say good morning to the Nuno nation”
3. The agent uses MCP → sends the message → fetches the timeline → shows it just works

No frontend yet – everything happens through AI agents via the MCP protocol.

## Starter Kit & Domain Layer (Message Model)
Nuno uses his own strict starter kit (Pint, Rector, PHPStan level max, Pest, Laravel Essentials, etc.).

```bash
php artisan make:model Message -m
```

Migration:
```php
$table->string('name');
$table->text('body');
$table->timestamps();
```

Model is left completely open (Model::unguard()) – Nuno prefers this over $fillable for small/internal tools.

Factory + model test for toArray() (ensures no hidden attributes leak).

All committed, pushed, reviewed by CodeRabbit (more on that below).

[Ask AI: Laravel Message Model Setup](https://alisol.ir/?ai=Laravel%20Message%20Model%20Setup%7Cnunomaduro%7CFull%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201))

## CodeRabbit AI – The Star of the Review Process
Nuno has been using CodeRabbit for a week and is genuinely impressed:
- Auto-reviews every PR
- Generates accurate sequence diagrams
- Learns your preferences (e.g. final/readonly classes, no down() method, prefer Model::unguard)
- Suggests real architectural improvements (add index on created_at, avoid key order in tests, etc.)
- Free for open-source, 14-day trial for private repos, then Pro plan

He shows multiple live reviews where CodeRabbit catches bugs, suggests better practices, and even backs off when told “I actually like Model::unguard”.

[Ask AI: CodeRabbit AI Code Review](https://alisol.ir/?ai=CodeRabbit%20AI%20Code%20Review%7Cnunomaduro%7CFull%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201))

## Actions Pattern – The Core Business Logic
```bash
php artisan make:action CreateMessage
```

```php
public function handle(string $name, string $body): Message
{
    return Message::create([
        'name' => $name,
        'body' => $body,
    ]);
}
```

Action is unit-tested and reused everywhere (MCP tool, future web controller, queue jobs, etc.). This is why Nuno loves actions — single source of truth for business rules.

[Ask AI: Laravel Actions Pattern](https://alisol.ir/?ai=Laravel%20Actions%20Pattern%7Cnunomaduro%7CFull%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201))

## Installing & Configuring Laravel MCP
```bash
composer require laravel/mcp
php artisan vendor:publish --tag=mcp-routes
```

Routes file: routes/ai.php – this is the entry point agents will hit (e.g. /mcp/chat).

Create server:
```bash
php artisan make:mcp-server NunoNationChat
```

Server class gets:
- name, version
- detailed $instructions (most important part!)
- tools[], resources[], prompts[]

Nuno’s instructions example:
> “This is the Nuno Nation chat server. It’s a friendly chat that allows users to have a conversation about various topics. Users can send messages or get messages to see what others have shared.”

[Ask AI: Laravel MCP Server Setup](https://alisol.ir/?ai=Laravel%20MCP%20Server%20Setup%7Cnunomaduro%7CFull%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201))

## Creating the Send Message Tool
```bash
php artisan make:mcp-tool SendMessage
```

Key points Nuno emphasizes:
- Tool description must be crystal clear
- Schema defines exact JSON structure the agent must follow
- Always validate the incoming data (schema is public but not enforced)

Schema example:
```php
Schema::string('name')
    ->description('The name of the user sending the message. Ask the user for their first name if unknown. Never use "user", "assistant", "AI", etc.')
    ->minLength(1)
    ->maxLength(50)
    ->required(),

Schema::string('content')
    ->description('The message content')
    ->minLength(1)
    ->maxLength(500)
    ->required(),
```

Handle method:
- Validates request
- Resolves CreateMessage action
- Returns markdown response: “Your message has been successfully sent…”

The tool reuses the same CreateMessage action we wrote earlier — perfect separation of concerns.

[Ask AI: Laravel MCP Tool Creation](https://alisol.ir/?ai=Laravel%20MCP%20Tool%20Creation%7Cnunomaduro%7CFull%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%201))

## What’s Coming in Part 2 (teased)
- GetMessages tool
- Authentication / rate limiting
- Deploying to production
- Actually chatting with Nuno via Cursor/Claude in real time

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
