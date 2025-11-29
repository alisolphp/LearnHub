# Creating MCP server with Laravel in less than 20 mins

* **Platform**: YouTube
* **Channel/Creator**: Amitav Roy
* **Duration**: 00:24:17
* **Release Date**: Sep 20, 2025
* **Video Link**: [https://www.youtube.com/watch?v=vKaNfJ_J8bg](https://www.youtube.com/watch?v=vKaNfJ_J8bg)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Creating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Creating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Creating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Creating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Creating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Creating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Creating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Creating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Creating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Creating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Creating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Creating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Creating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Creating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Creating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Creating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins)
<!-- LH-BUTTONS:END -->

## What is MCP (Model Context Protocol)?

* **Summary**: MCP stands for Model Context Protocol – a standard introduced by Anthropic in 2024 that defines how language models can securely and predictably interact with external data and tools. It is basically the “REST API specification” for AI: it tells the LLM what tools, prompts, and resources are available, what parameters they expect, and what they return – exactly like Swagger/OpenAPI does for traditional APIs.
* **Key Takeaway**: Without a protocol like MCP, every AI integration becomes custom and fragile. With MCP, the LLM knows exactly what it can call and how, which makes integrations reliable and composable.
* [Ask AI: What is Model Context Protocol (MCP)?](https://alisol.ir/?ai=What%20is%20Model%20Context%20Protocol%20(MCP)%7CAmitav%20Roy%7CCreating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins)

## Why Laravel Shines for Building MCP Servers

* **Summary**: Laravel gives you authentication, throttling, queues, validation, routing, and everything else out of the box, so you can focus on the business logic instead of reinventing basics (something that quickly becomes painful in plain Python/Node projects when you go to production).
* **Key Takeaway**: When you build an MCP server with Laravel you get the full power and maturity of the framework for free – perfect for real-world AI-powered applications.
* [Ask AI: Why use Laravel for MCP servers](https://alisol.ir/?ai=Why%20use%20Laravel%20for%20MCP%20servers%7CAmitav%20Roy%7CCreating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins)

## Installing the Laravel MCP Package

* **Summary**: Start with a fresh Laravel app → `composer require laravel/mcp` (or whatever the exact package name is at the time you watch) → publish the config → you instantly get a new `routes/ai.php` file (just like `web.php` and `api.php`) and an `MCP` facade.
* **Result after install**: Two routes appear – GET and POST on your chosen path, plus a ready-to-use throttle middleware specifically for MCP (`throttle:mcp`).
* [Ask AI: Laravel MCP package installation](https://alisol.ir/?ai=Laravel%20MCP%20package%20installation%7CAmitav%20Roy%7CCreating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins)

## Creating Your First MCP Server

* **Summary**: Run `php artisan make:mcp-server ExpenseServer`. The generated class has `name()`, `version()`, and `instructions()` methods. Bump the version whenever you change tools/schema so clients know to refresh.
* **Code snippet (important parts)**:
  ```php
  public function name(): string
  {
      return 'expense';
  }

  public function version(): string
  {
      return '1.0.0';
  }

  public function instructions(): string
  {
      return 'This server manages personal expenses. It can add expenses and (later) return totals.';
  }
  ```
* Register it in `routes/ai.php`:
  ```php
  MCP::server('expense', ExpenseServer::class)
      ->web('/mcp/expense')
      ->middleware(['throttle:mcp']);
  ```
* [Ask AI: Creating MCP server in Laravel](https://alisol.ir/?ai=Creating%20MCP%20server%20in%20Laravel%7CAmitav%20Roy%7CCreating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins)

## Adding Tools to the Server

* **Summary**: Run `php artisan make:mcp-tool AddExpenseTool`. Add the tool class to your server with `$this->tools(AddExpenseTool::class)`. Every tool needs a clear description because the LLM reads it to decide when to use the tool.
* **Key Practice**: Be verbose in both server instructions and tool descriptions – the LLM has no other context.
* [Ask AI: Adding tools to Laravel MCP server](https://alisol.ir/?ai=Adding%20tools%20to%20Laravel%20MCP%20server%7CAmitav%20Roy%7CCreating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins)

## Defining Tool Input Schema (JSON Schema)

* **Summary**: Tools receive structured JSON, so you define a JSON schema in `$schema`. Laravel validates automatically exactly like form requests.
* **Example schema from the video**:
  ```php
  public function schema(): array
  {
      return [
          'type' => 'object',
          'properties' => [
              'description' => [
                  'type' => 'string',
                  'description' => 'The description of the expense',
              ],
              'amount' => [
                  'type' => 'number',
                  'description' => 'The amount spent (in your currency)',
              ],
              'created_at' => [
                  'type' => 'string',
                  'format' => 'date',
                  'description' => 'Date of the expense (YYYY-MM-DD)',
              ],
          ],
          'required' => ['description', 'amount'],
      ];
  }
  ```
* [Ask AI: MCP tool JSON schema in Laravel](https://alisol.ir/?ai=MCP%20tool%20JSON%20schema%20in%20Laravel%7CAmitav%20Roy%7CCreating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins)

## Handling the Tool Call

* **Summary**: Inside `handle()` you get the validated data with `$validated = $this->validated();`. From there you can log, save to DB, trigger jobs – anything Laravel can do.
* **Quick DB example shown**:
  ```php
  Expense::create([
      'description' => $validated['description'],
      'amount'      => $validated['amount'],
      'created_at'  => $validated['created_at'] ?? now(),
  ]);
  ```
* [Ask AI: Handling MCP tool calls in Laravel](https://alisol.ir/?ai=Handling%20MCP%20tool%20calls%20in%20Laravel%7CAmitav%20Roy%7CCreating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins)

## Local Testing with MCP Inspector

* **Summary**: Run `php artisan mcp:inspector` → opens a web UI that lists all tools, lets you call them manually, and shows the exact JSON the LLM would send/receive. Perfect for debugging before exposing publicly.
* **Tip**: Refresh the inspector after every tool/schema change.
* [Ask AI: Laravel MCP inspector](https://alisol.ir/?ai=Laravel%20MCP%20inspector%7CAmitav%20Roy%7CCreating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins)

## Exposing the Server Publicly & Using with Claude Desktop

* **Summary**: MCP clients (Claude Desktop, Boost, etc.) require HTTPS. Use ngrok → `ngrok http 8000` → copy the HTTPS URL + your route (`/mcp/expense`) → add as a connector in Claude Desktop → start chatting and Claude will automatically discover and use your tools.
* **Real demo flow**: User says “I had breakfast for ₹200” → Claude calls `add_expense_tool` → success message → data saved in your DB.
* [Ask AI: Connecting Claude Desktop to Laravel MCP server](https://alisol.ir/?ai=Connecting%20Claude%20Desktop%20to%20Laravel%20MCP%20server%7CAmitav%20Roy%7CCreating%20MCP%20server%20with%20Laravel%20in%20less%20than%2020%20mins)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
