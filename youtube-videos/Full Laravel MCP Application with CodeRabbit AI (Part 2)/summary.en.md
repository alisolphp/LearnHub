# Full Laravel MCP Application with CodeRabbit AI (Part 2)

* **Platform**: YouTube
* **Channel/Creator**: nunomaduro
* **Duration**: 01:05:12
* **Release Date**: Sep 20, 2025
* **Video Link**: [https://www.youtube.com/watch?v=QRjWDMutFtY](https://www.youtube.com/watch?v=QRjWDMutFtY)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=47fdb3b8 -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%202)) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%202)) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%202)) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%202)) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%202)) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%202)) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%202)) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%202)) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%202)) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%202)) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%202)) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%202))

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%202)) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%202)) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%202))
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Full%20Laravel%20MCP%20Application%20with%20CodeRabbit%20AI%20(Part%202))
<!-- LH-BUTTONS:END -->

## Stream Recovery & CodeRabbit Review of Send Message Tool
CodeRabbit finishes reviewing the pull request that added the “send message” functionality. It correctly identifies the new Nuno Nation chat experience, input validation, and even draws an accurate diagram of the full flow: user → AI agent → MCP chat endpoint → MCP server → send_message tool → response back through the chain.  
It also points out that the unused validated variables in the placeholder responses can be removed and suggests loading `ai.php` routes the modern Laravel way (via `bootstrap/app.php` → `withRouting`). No major blockers — everything looks solid.

[Ask AI: Laravel MCP tool flow with CodeRabbit](https://alisol.ir/?ai=Laravel%20MCP%20tool%20flow%20with%20CodeRabbit%7Cnunomaduro%7C%5BVOD%5D%20Full%20Laravel%20MCP%20Application%20(with%20CodeRabbit%20AI)%20-%20Part%202)

## Adding Proper Tests for Send Message Tool (100% Coverage)
Nuno creates isolated tests under `tests/MCP/Tools/SendMessageToolTest.php`.  
- Validates that `name` and `content` (later renamed to `body`) are required  
- Tests successful message creation  
- Asserts the created message appears first in the query  
Ignores schema lines for coverage (they test the framework, not the code). Result → 100 % coverage on the tool itself.

```php
public function it_validates_the_name_field(): void
{
    $response = NunoNationChat::call(new SendMessageTool());

    $this->assertHasErrors('name', 'required');
}

public function it_sends_a_message(): void
{
    $response = NunoNationChat::call(new SendMessageTool(
        name: 'Mark',
        body: 'Hello world'
    ));

    $this->assertOk($response);
    $this->assertEquals('Mark', Message::query()->first()->name);
    $this->assertEquals('Hello world', Message::query()->first()->body);
}
```

[Ask AI: Testing Laravel MCP tools in isolation](https://alisol.ir/?ai=Testing%20Laravel%20MCP%20tools%20in%20isolation%7Cnunomaduro%7C%5BVOD%5D%20Full%20Laravel%20MCP%20Application%20(with%20CodeRabbit%20AI)%20-%20Part%202)

## Blocking Generic AI Names (user, assistant, claude, etc.)
Added a static list of ignorable names so agents can’t post as “user”, “assistant”, “cursor”, “claude”, “bot”, etc. If the name is in the list (case-insensitive), the tool returns an error asking the agent to get the real name first.

```php
private const IGNORABLE_NAMES = [
    'user', 'assistant', 'claude', 'cursor', 'bot', 'ai'
];

if (in_array(strtolower($name), self::IGNORABLE_NAMES, true)) {
    return error('You must provide a valid name...');
}
```

CodeRabbit later suggests turning the property into a `const` (which Nuno does) and using `in_array` with `strtolower` on the array values instead of looping.

[Ask AI: Preventing generic AI names in MCP tools](https://alisol.ir/?ai=Preventing%20generic%20AI%20names%20in%20MCP%20tools%7Cnunomaduro%7C%5BVOD%5D%20Full%20Laravel%20MCP%20Application%20(with%20CodeRabbit%20AI)%20-%20Part%202)

## Implementing the Get Messages Tool
Super quick implementation:
- Optional `limit` parameter (int 1–100, default 50)
- Returns the latest messages ordered by `created_at desc`
- Formatted response lists messages with name + body

```php
$messages = Message::latest()->limit($limit)->get();

$formatted = $messages->map(fn ($m) => "{$m->name}: {$m->body}")->join("\n");

return text("Here are the latest messages...\n\n{$formatted}");
```

Tests added and coverage brought to 100 % (again ignoring schema).

[Ask AI: Laravel MCP get messages tool implementation](https://alisol.ir/?ai=Laravel%20MCP%20get%20messages%20tool%20implementation%7Cnunomaduro%7C%5BVOD%5D%20Full%20Laravel%20MCP%20Application%20(with%20CodeRabbit%20AI)%20-%20Part%202)

## Final CodeRabbit Reviews & Merging
Both PRs receive clean reviews with only minor suggestions (use `RefreshDatabase`, convert property to const, add “cursor” to description, etc.).  
Nuno applies the suggestions live, runs the full test suite, merges to main.

## Deployment to Laravel Cloud
- New application on Laravel Cloud (Ohio region)
- Serverless PostgreSQL dev database
- Custom domain `nuno-nation-mcp-chat.laravel.cloud`
- Auto-deploy on push to main → live in minutes

[Ask AI: Deploying Laravel MCP apps to Laravel Cloud](https://alisol.ir/?ai=Deploying%20Laravel%20MCP%20apps%20to%20Laravel%20Cloud%7Cnunomaduro%7C%5BVOD%5D%20Full%20Laravel%20MCP%20Application%20(with%20CodeRabbit%20AI)%20-%20Part%202)

## Live Demo with Cursor / Claude Code
Nuno shares an installation link (generated by Ashley’s tool) that gives ready-to-copy instructions for Cursor and Claude Code.  
Everyone adds the MCP server to their AI client and starts chatting.  
The agent automatically:
1. Calls `send_message` when the user wants to post
2. Calls `get_messages` to show the chat history  
Messages appear instantly in the shared chat window. The whole room goes wild sending messages in English, Portuguese, Spanish, Japanese, etc. Works perfectly.

[Ask AI: Adding custom MCP servers to Cursor or Claude Code](https://alisol.ir/?ai=Adding%20custom%20MCP%20servers%20to%20Cursor%20or%20Claude%20Code%7Cnunomaduro%7C%5BVOD%5D%20Full%20Laravel%20MCP%20Application%20(with%20CodeRabbit%20AI)%20-%20Part%202)

## Closing Thoughts
Nuno is convinced MCP tooling is the future of backend integrations: agents will replace traditional UIs for many tasks (bookings, support, etc.).  
CodeRabbit proved extremely useful for fast, accurate reviews (even on tiny PRs) and is free for open-source + 14-day trial for private repos.

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
