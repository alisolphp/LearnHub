# LearnHub – Roadmap

This roadmap is **aspirational**, not a strict promise.  
It exists to show where LearnHub is headed and how new ideas fit into the bigger picture.

Status labels:
- ✅ Shipped
- ⚙️ In progress
- 🔜 Planned / Next
- 💡 Idea / Later

---

## 1. Recently shipped

✅ **AI-powered buttons on every summary**

- For each `summary.*.md`, automatically inject AI buttons such as:
  - Teach (Beginner / Intermediate / Advanced)
  - Analogy
  - Cheat Sheet
  - Mindmap
  - Flashcards
  - Practical Projects
  - Code Examples
  - Common Mistakes
  - Quiz
  - Interview Me
  - Assessment Rubric

Each button:

- builds a clear, human-readable prompt,
- wires the **summary URL** and **fallback links** into the AI chat bot,
- and sends the user directly to their chosen provider.

✅ **Multiple fallback URLs for summaries**

- When generating a summary, we now upload it to:
  - `alisol.ir`
  - at least one paste service (e.g. paste.rs)
  - optionally another fallback like hastebin
  - and sometimes the original source

This increases the chance that the chosen AI model can actually fetch the context.

✅ **Per-request teaching flows**

- Different flows now exist for:
  - teaching at different levels (beginner / intermediate / advanced),
  - generating flashcards with CSV export,
  - creating analogies, mindmaps, quizzes, interview simulations, and rubrics.

✅ **Ethical disclaimer support**

- Every teaching flow can inject a disclaimer like:

  > “DISCLAIMER: It’s not a substitute for the original material.  
  > Please study the main source from `<instructor_name>` if you can: `<source_url>`.”

---

## 2. Now / In progress

⚙️ **Standardising summary header and structure**

- Ensure each `summary.*.md` includes:
  - AI-powered button block,
  - clear metadata (resource type, instructor name, main source URL, tags),
  - consistent sections for the summary itself.

Goal: make summaries:
- easy to read,
- predictable for learners,
- and reliable as context for AI models.

⚙️ **Repository documentation**

- `README.md` improvements
- `VISION.md` (this document)
- `ROADMAP.md` (you are here)

---

## 3. Next

🔜 **Provider selection UI improvements**

- Show only providers that support:
  - query-parameter prompts, and
  - external URL fetch (where possible).

- Display simple capability hints, for example:
  - “Good for coding”
  - “Good for fresh web knowledge”
  - “Can generate downloadable files (CSV, etc.)”
  - “Better with long prompts”

- Encourage users to:
  - use a **subscribed / paid** tier if possible,
  - and choose a **strong enough model** for tutoring.

🔜 **Task-based model recommendations**

For each workflow, LearnHub should guide the user to the best types of models:

- **Flashcards**:
  - suggest models that can produce **downloadable CSV files** (e.g. better for Anki).
  - hide or de-prioritise models that cannot generate files.

- **Heavy coding / complex backend tasks**:
  - highlight models that are strong at code generation and reasoning.

- **Extra-fresh knowledge / outdated sources**:
  - highlight models that combine strong web search with reasoning.

Implementation idea:

- A small, human-readable capability matrix in code and docs.
- Future: auto-generated from a config file.

🔜 **Contribution flow: “Request a resource”**

Because summaries are not crowd-sourced, the main contribution path will be:

- A simple issue template:
  - “Request a topic or resource”
  - fields: topic, your level, preferred language/stack, suggested resource links (optional)

The maintainer will:

- check if the resource is suitable,
- confirm whether LearnHub already covers it,
- and, if it fits, add it to the internal “to-summarise” queue.

---

## 4. Later / Ideas

💡 **Open-source backend**

- Open-source the backend that:
  - generates prompts,
  - constructs URLs,
  - uploads summaries to multiple hosts,
  - and handles aliases/fallbacks.

Benefits:

- full transparency around prompts,
- easier external contributions (bug fixes, new workflows),
- and more trust from users and instructors.

💡 **Better capability awareness**

- Show per-provider limitations, for example:
  - which models can generate files,
  - which ones struggle with external URLs,
  - which ones are best for long conversations vs small tasks.

- Autodetect when a model replies:
  - “I can’t open URLs right now…”  
  and suggest switching to another provider.

💡 **Smarter routing**

In the long term, LearnHub could:

- analyse user intent (flashcards, deep dive, interview prep, etc.),
- and suggest a **default recommended model** and **prompt variant**,
- while still letting the user stay in full control.

💡 **More learning workflows**

Examples:

- spaced repetition helpers,
- topic roadmaps (multi-resource learning paths),
- “compare two resources” flows.

---

## 5. Non-goals (for now)

To stay focused, LearnHub does **not** plan to:

- host or stream full video courses,
- sell access to other people’s educational content,
- become a generic marketplace or SaaS product.

The core focus is:

> High-quality **human summaries** + smart **AI workflows**  
> to help serious learners study existing resources better and faster.
