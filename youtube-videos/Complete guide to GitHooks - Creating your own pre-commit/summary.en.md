# Complete guide to GitHooks - Creating your own pre-commit

* **Platform**: YouTube
* **Channel/Creator**: GitGuardian
* **Duration**: 00:29:34
* **Release Date**: May 10, 2023
* **Video Link**: [https://www.youtube.com/watch?v=ObksvAZyWdo](https://www.youtube.com/watch?v=ObksvAZyWdo)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Complete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Complete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Complete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Complete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Complete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Complete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Complete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Complete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Complete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Complete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Complete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Complete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Complete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Complete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Complete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Complete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit)
<!-- LH-BUTTONS:END -->

## Introduction to Git Hooks
Git hooks let you automate scripts at specific points in your Git workflow, like before commits or pushes. They run locally on your machine or on the server side, and can block actions if conditions fail. Common ones include pre-commit, pre-push, and pre-receive, but all hooks work similarly.
* **Key Takeaway**: Hooks enhance productivity by enforcing rules automatically, such as checking code before it enters the repo.
* **Link for More Details**: [Ask AI: Introduction to Git Hooks](https://alisol.ir/?ai=Introduction%20to%20Git%20Hooks%7CGitGuardian%7CComplete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit)

## Git Workflow and Hook Triggers
In a typical workflow, you write code, stage it, commit locally, and push to a remote repo. Hooks trigger at stages like pre-commit (before local commit), pre-push (before leaving your machine), and pre-receive (on the server before acceptance). This setup allows control over code quality at each step.
* **Key Takeaway**: Use hooks to prevent issues early; for example, block commits that fail checks.
* **Link for More Details**: [Ask AI: Git Workflow and Hook Triggers](https://alisol.ir/?ai=Git%20Workflow%20and%20Hook%20Triggers%7CGitGuardian%7CComplete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit)

## Local vs Global Hooks
Local hooks apply only to one repository and live in the .git/hooks folder. Global hooks run across all your repositories by configuring Git to look in a custom directory, like ~/.git/hooks.
* **Key Takeaway**: Global hooks are ideal for consistent checks, like secret detection everywhere, while local ones handle project-specific needs.
* **Link for More Details**: [Ask AI: Local vs Global Hooks](https://alisol.ir/?ai=Local%20vs%20Global%20Hooks%7CGitGuardian%7CComplete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit)

## Creating Your First Pre-Commit Hook
Start by running `git init` to create a .git folder, then navigate to .git/hooks. Rename a .sample file, like pre-commit.sample to pre-commit, to activate it. Hooks are scripts that Git runs automatically on actions.
* **Key Takeaway/Example**: The default pre-commit script checks for issues like trailing whitespace. Test by adding a file with spaces and committing—it blocks if errors are found.
```bash
# Example from default script
if git rev-parse --verify HEAD >/dev/null 2>&1; then
    against=HEAD
else
    against=$(git hash-object -t tree /dev/null)
fi
```
* **Link for More Details**: [Ask AI: Creating Your First Pre-Commit Hook](https://alisol.ir/?ai=Creating%20Your%20First%20Pre-Commit%20Hook%7CGitGuardian%7CComplete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit)

## Handling Permissions and Basic Scripts
New hook files need executable permissions: run `chmod u+x .git/hooks/pre-commit`. Scripts can be in Bash, Python, or other languages. Start with simple output like echoing "Hello World".
* **Key Takeaway/Example**: Without permissions, commits fail with errors. After fixing, a basic hook runs on commit.
```bash
#!/bin/sh
echo "Hello World, my first git hook"
```
* **Link for More Details**: [Ask AI: Handling Permissions and Basic Scripts](https://alisol.ir/?ai=Handling%20Permissions%20and%20Basic%20Scripts%7CGitGuardian%7CComplete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit)

## Adding Fun Elements: Dad Jokes on Commit
To encourage more commits, add a curl command in your hook to fetch a dad joke from an API.
* **Key Takeaway/Example**: This boosts productivity playfully—every commit prints a joke.
```bash
#!/bin/sh
curl https://icanhazdadjoke.com
```
* **Link for More Details**: [Ask AI: Adding Fun Elements: Dad Jokes on Commit](https://alisol.ir/?ai=Adding%20Fun%20Elements%3A%20Dad%20Jokes%20on%20Commit%7CGitGuardian%7CComplete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit)

## Detecting Secrets in Commits
Use `git grep` to search commits for patterns like AWS keys (e.g., 20-character alphanumeric strings). If found, echo a warning and exit to block the commit.
* **Key Takeaway/Example**: Prevent hard-coding secrets, which stay in Git history forever.
```bash
#!/bin/sh
if git grep -E '[A-Z0-9]{20}'; then
    echo "You've hard-coded a secret. No joke for you!"
    exit 1
fi
```
* **Link for More Details**: [Ask AI: Detecting Secrets in Commits](https://alisol.ir/?ai=Detecting%20Secrets%20in%20Commits%7CGitGuardian%7CComplete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit)

## Integrating Tools like GG Shield
Call external tools like GG Shield in your hook for advanced secret detection: `ggshield secret scan pre-commit`. It identifies, validates, and advises on secrets.
* **Key Takeaway**: Tools reduce false positives and handle complex scans, integrating seamlessly with hook data.
* **Link for More Details**: [Ask AI: Integrating Tools like GG Shield](https://alisol.ir/?ai=Integrating%20Tools%20like%20GG%20Shield%7CGitGuardian%7CComplete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit)

## Setting Up Global Hooks
Create a ~/.git/hooks folder, add a pre-commit file, set permissions, and configure Git: `git config --global core.hookspath ~/.git/hooks`.
* **Key Takeaway/Example**: This applies hooks to all repos without modifying templates.
```bash
mkdir ~/.git
mkdir ~/.git/hooks
touch ~/.git/hooks/pre-commit
chmod u+x ~/.git/hooks/pre-commit
git config --global core.hookspath ~/.git/hooks
```
* **Link for More Details**: [Ask AI: Setting Up Global Hooks](https://alisol.ir/?ai=Setting%20Up%20Global%20Hooks%7CGitGuardian%7CComplete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit)

## Combining Global and Local Hooks
In your global hook, add logic to call the local one if it exists: check for .git/hooks/pre-commit and run it with commit data.
* **Key Takeaway/Example**: This runs global checks first, then project-specific ones, failing if either does.
```bash
#!/bin/sh
local_hook="$GIT_DIR/hooks/pre-commit"
if [ -x "$local_hook" ]; then
    "$local_hook" || exit $?
fi
```
* **Link for More Details**: [Ask AI: Combining Global and Local Hooks](https://alisol.ir/?ai=Combining%20Global%20and%20Local%20Hooks%7CGitGuardian%7CComplete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit)

## Advanced Features and Frameworks
Hooks can send reminders, switch branches, or chain actions. For more, use the pre-commit framework—it's language-agnostic, with community hooks for easy configuration.
* **Key Takeaway**: Start with basics, then explore frameworks for complex setups without writing everything from scratch.
* **Link for More Details**: [Ask AI: Advanced Features and Frameworks](https://alisol.ir/?ai=Advanced%20Features%20and%20Frameworks%7CGitGuardian%7CComplete%20guide%20to%20GitHooks%20-%20Creating%20your%20own%20pre-commit)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
