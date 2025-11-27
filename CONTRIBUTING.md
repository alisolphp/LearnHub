# Contributing to LearnHub

First of all: thank you for wanting to contribute 🙌  
LearnHub is a curated, opinionated project. The goal is to keep quality high and friction low – especially for learners.

This document explains **what kind of contributions are welcome right now**, and how to send them in a way that is easy for everyone.

---

## 1. Core principles

Before contributing, please keep these principles in mind:

- **Summaries are not crowd-sourced.**  
  All `summary.*.md` files are written and maintained by the project owner (and maybe a small trusted core team later).
- **The main contribution path for most people is: request a resource/topic.**
- We want to **respect original instructors and authors**:
  - no pirated content,
  - no re-uploading full courses/books,
  - and no paywall around other people’s work.
- LearnHub is **free and open source**.  
  By contributing, you agree that your contributions are released under the same license as this repository.

If you are unsure whether an idea fits, open a short issue and ask.

---

## 2. What you can contribute (and what you can’t)

### ✅ Welcome right now

1. **Resource / topic requests**  
   – “Please add a summary for X”  
   This is the main way for non-developers to help.

2. **Bug reports**
   - Broken links or AI buttons
   - Wrong or confusing prompts
   - Problems with specific AI providers/models

3. **Suggestions for better prompts & workflows**
   - “This teaching prompt worked well / badly with model X, here’s why…”
   - “Maybe we should tweak the instructions for flashcards / quizzes / projects…”

4. **Documentation improvements**
   - Fixing typos or unclear sentences in:
     - `README.md`
     - `VISION.md`
     - `ROADMAP.md`
     - `CONTRIBUTING.md`
   - Small clarifications or extra examples

5. **Code improvements (advanced)**
   - Backend / scripts that:
     - generate summary headers,
     - upload to multiple fallback hosts,
     - build URLs and query params,
     - or improve developer experience.
   - Refactoring, small features, or bug fixes.

> If you plan a larger code change, please open an issue first and discuss it.

---

### 🚫 Not accepted (for now)

To keep the project consistent and maintainable:

- Please **do not** open PRs that:
  - add new `summary.*.md` files,
  - rewrite or heavily edit existing summaries,
  - change the overall summary format/structure,
  - upload or embed full paid/pirated content.

If you think a summary is wrong or dangerously outdated, open an **issue** instead and explain what is wrong. The maintainer will review and update it if needed.

---

## 3. How to request a new resource / topic

This is the main contribution path and should be very low friction.

1. Go to the **Issues** tab.
2. Click **“New issue”**.
3. Use a title like:  
   `Resource request: [topic or skill]`
4. In the description, please include:

   ```text
   ### Topic / skill you want to learn
   (example: BDD with PHP, Event Sourcing in practice, Modern DevOps basics, …)

   ### Your current level
   (Beginner / Intermediate / Advanced)

   ### Preferred explanation language
   (example: English / Dutch / German / …)

   ### Preferred programming language / stack
   (example: PHP, Laravel, Symfony, Node.js, etc.)

   ### Suggested resources (optional, if you know some)
   - Link 1:
   - Link 2:
   - Book / playlist / course name:

   ### Why this would help you
   (one or two sentences – helps with prioritisation)
