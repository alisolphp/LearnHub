# WordPress as a MCP Server | Jon learns to code with AI

* **Platform**: YouTube
* **Channel/Creator**: Jonathan Bossenger
* **Duration**: 01:36:28
* **Release Date**: May 5, 2025
* **Video Link**: [https://www.youtube.com/watch?v=XO4L5Hv3RTw](https://www.youtube.com/watch?v=XO4L5Hv3RTw)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=4ea0b5d0 -->

### AI-Powered buttons

Teach Me:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/WordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/WordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/WordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/WordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/WordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/WordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/WordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/WordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/WordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/WordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/WordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/WordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/WordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/WordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/WordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/WordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/WordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI)
<!-- LH-BUTTONS:END -->

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

## What is Model Context Protocol (MCP)?

MCP is an open protocol that lets applications feed extra context (like your code, files, or in this case a WordPress site) directly to an LLM-powered agent.  
The agent can then read, create, update, or delete data on your behalf using “tools” — basically functions the LLM can call when needed.

[Ask AI: What is Model Context Protocol (MCP)?](https://alisol.ir/?ai=What%20is%20Model%20Context%20Protocol%20(MCP)%7CJonathan%20Bossenger%7CWordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI)

## Installing and Enabling the WordPress MCP Plugin

The plugin is a set of open-source packages from Automattic that turns any WordPress site into an MCP server.

1. Download the plugin from GitHub and install/activate it normally.
2. Go to Settings → MCP and enable Create tools and Update tools (leave Delete disabled unless you really want it).
3. The plugin instantly registers a bunch of tools (get site info, add post, update post, etc.) that are powered mostly by the REST API.

[Ask AI: How to install WordPress MCP plugin](https://alisol.ir/?ai=How%20to%20install%20WordPress%20MCP%20plugin%7CJonathan%20Bossenger%7CWordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI)

## Connecting Your Site to an AI Client (Cursor / Claude Desktop)

You don’t install anything on the client side — you use the `@wordpress/remote` npm package via `npx` as a proxy.

Typical config (Cursor or Claude Desktop):

```json
{
  "mcpServers": {
    "wordpress-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@wordpress/remote",
        "https://yoursite.local",
        "yourusername",
        "your-application-password"
      ]
    }
  }
}
```

Application passwords are used for auth (enable them on local/dev environments by defining `WP_ENVIRONMENT_TYPE` as `local` or `development`).

Cursor shows the available tools immediately after connecting, which is super handy. Claude Desktop was flaky in the stream, so Jonathan switched to Cursor.

[Ask AI: Connect WordPress MCP to Cursor or Claude Desktop](https://alisol.ir/?ai=Connect%20WordPress%20MCP%20to%20Cursor%20or%20Claude%20Desktop%7CJonathan%20Bossenger%7CWordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI)

## Using the Built-in Tools – Live Demo

Jonathan asked the Cursor agent questions like:

- “What can you tell me about my WordPress site?” → calls `wp_get_site_info`.
- “Create a new post titled ‘Demoing the WordPress MCP plugin’ in draft mode” → used the repo README as context, generated markdown content, then called `wp_add_post`.

First attempt gave markdown instead of blocks. Second attempt (with explicit “use WordPress blocks” instruction) produced proper Gutenberg blocks. Iterative prompting fixed code snippets, images, etc.

This basically turns your AI chat into a remote WordPress admin.

[Ask AI: Generate WordPress posts with MCP and Cursor](https://alisol.ir/?ai=Generate%20WordPress%20posts%20with%20MCP%20and%20Cursor%7CJonathan%20Bossenger%7CWordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20%to%20code%20with%20AI)

## Building Custom Tools – Enable Debug Log (Proof of Concept)

Jonathan wanted a tool to turn on `WP_DEBUG`, `WP_DEBUG_LOG`, and set `WP_DEBUG_DISPLAY` to false without manually editing wp-config.php.

He created a tiny throwaway plugin that literally writes those constants into wp-config.php when an option is set (very rough, not production-ready, but it works for demo).

Then he added a custom class inside the MCP plugin itself:

```php
class MCP_Enable_Debug {
    public function register_tool() {
        return [
            'name'        => 'enable_debug',
            'description'  => 'Enables WordPress debug log by writing to wp-config.php',
            'type'         => 'update',
            'callback'     => [$this, 'enable_debug'],
            'permissions_callback' => 'manage_options',
        ];
    }

    public function enable_debug() {
        // rough file-write logic that toggles the constants
        return ['success' => true, 'message' => 'Debug log enabled'];
    }
}
```

Registered with `new MCP_Enable_Debug();` in the main plugin file.  
After saving, the tool appeared in Cursor and could be called with “Enable the debug log on the WordPress site”.

[Ask AI: Create custom MCP tools in WordPress](https://alisol.ir/?ai=Create%20custom%20MCP%20tools%20in%20WordPress%7CJonathan%20Bossenger%7CWordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI)

## Reading the Debug Log Tool

Same pattern – another class that reads `wp-content/debug.log` and returns the last ~25 lines (or full content).

Now the agent can:

1. Enable debug → tool runs → constants written.
2. Trigger an error on the site.
3. Ask “Read the debug log” → gets the latest entries right inside the chat.

Super handy for debugging production/staging without SSH or opening the file manually.

[Ask AI: Read WordPress debug.log via MCP](https://alisol.ir/?ai=Read%20WordPress%20debug.log%20via%20MCP%7CJonathan%20Bossenger%7CWordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI)

## Why This Feels Game-Changing

- Generate blog post drafts in your AI chat → push live with one command.
- Debug production errors without leaving your IDE — enable log, reproduce, read log, fix locally, deploy.
- Turn any GitHub repo into an MCP server (there’s a package for that too).
- Build your own desktop/site management tools that talk to multiple sites.

Jonathan’s closing thought: install WordPress MCP + a small personal plugin with your favorite tools (debug toggle, plugin disable/enable, etc.) and you have a self-serve “AI admin” from anywhere.

[Ask AI: Use cases for WordPress MCP in development workflow](https://alisol.ir/?ai=Use%20cases%20for%20WordPress%20MCP%20in%20development%20workflow%7CJonathan%20Bossenger%7CWordPress%20as%20a%20MCP%20Server%20%7C%20Jon%20learns%20to%20code%20with%20AI)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
