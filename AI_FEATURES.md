# AI Features & Workflows

LearnHub combines:

- curated, human-written summaries of high-quality resources, and  
- carefully designed AI workflows wired to those summaries.

This document explains:

- how LearnHub connects to your favourite AI chat bot,
- what each AI-powered button does,
- how language and programming-language personalization works,
- and some live, clickable examples.

---

## 1. How LearnHub talks to AI

All AI features are based on simple links like:

```text
https://alisol.ir/?ai=...&src=...&lang=...
```

The flow is:

1. You click a link or button (from the README, a summary, or a demo).
2. `alisol.ir` shows you a list of compatible AI chat bots.
3. You pick one (e.g. ChatGPT, Claude, Gemini, Grok, Perplexity, …).
4. The site auto-redirects you to that AI with:
   - a clear, human-readable prompt,
   - one or more URLs pointing to the relevant LearnHub summary (plus fallbacks),
   - and optional parameters like your language and level.

Under the hood, LearnHub can upload the same summary content to multiple hosts  
(own domain, paste services, sometimes original source), and send all of them as context.  
This increases the chance that the chosen AI model can actually fetch the data.

---

## 2. Global AI entry points

These entries work at the **whole LearnHub** level.  
You don’t need to open a specific `summary.*.md` first.

### 2.1. Rapid study plan

> “I want a fast study plan based on LearnHub.”

```text
https://alisol.ir/?ai=learnhub_starter
```

This will:

- open your preferred AI chat bot,
- send a prompt that knows what LearnHub is,
- and ask the AI to build a **personalized study plan** from available summaries.

You can also start in other languages, for example:

- `?ai=learnhub_starter|NL` — Dutch  
- `?ai=learnhub_starter|DE` — German  
- …  
- `?ai=learnhub_starter|TR` — Turkish

Each variant keeps LearnHub as the main source, but tells the AI which language to answer in.

---

### 2.2. AI-powered LearnHub search

> “Search across LearnHub summaries and use them as context.”

```text
https://alisol.ir/?ai=learnhub_search
```

The AI can:

- search inside LearnHub topics,
- pick relevant summaries,
- and use them as context for teaching, Q&A, or deeper exploration.

Language variants follow the same pattern:

- `?ai=learnhub_search|NL`, `|DE`, `|FR`, `|ES`, `|IT`, `|SV`, `|DA`, `|NO`,  
  `|PL`, `|PT`, `|RO`, `|RU`, `|HI`, `|AR`, `|FA`, `|TR`

---

### 2.3. Ask AI about a specific topic

> “I want to dive into one topic with the AI, as fast as possible.”

Example – DDIA *Consistency and Consensus*:

```text
https://alisol.ir/?ai=Consistency%20and%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications
```

The `ai` parameter encodes:

- the topic,
- the author/instructor,
- and the book/course name.

You can attach `&lang=XX` to get the conversation in another language.

---

## 3. Per-summary AI buttons

Each `summary.*.md` in LearnHub has a block like this injected at the top:

```markdown
### AI-Powered buttons

Teach Me:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang={{LANG}}&src={{SUMMARY_SRC}}) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang={{LANG}}&src={{SUMMARY_SRC}}) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang={{LANG}}&src={{SUMMARY_SRC}}) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang={{LANG}}&src={{SUMMARY_SRC}}) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang={{LANG}}&src={{SUMMARY_SRC}}) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang={{LANG}}&src={{SUMMARY_SRC}}) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang={{LANG}}&src={{SUMMARY_SRC}}) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang={{LANG}}&src={{SUMMARY_SRC}}) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang={{LANG}}&src={{SUMMARY_SRC}}) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang={{LANG}}&src={{SUMMARY_SRC}}) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang={{LANG}}&src={{SUMMARY_SRC}}) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang={{LANG}}&src={{SUMMARY_SRC}})

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang={{LANG}}&src={{SUMMARY_SRC}}) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang={{LANG}}&src={{SUMMARY_SRC}}) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang={{LANG}}&src={{SUMMARY_SRC}}) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang={{LANG}}&src={{SUMMARY_SRC}}) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang={{LANG}}&src={{SUMMARY_SRC}})
```

At runtime:

- `{{SUMMARY_SRC}}` is replaced with the path to that summary (plus fallback URLs).
- `{{LANG}}` is replaced with your chosen language (EN, NL, DE, FA, …).

The backend uploads the summary content to multiple hosts when possible  
(own domain, paste services, maybe the main source link) and includes all of them in the prompt,  
so the AI has more than one option for fetching context.

The following sections describe what each button does.

---

## 4. Teaching flows

### Teach (Beginner / Intermediate / Advanced)

Buttons:

- `?ai=learnhub_summary_teach&level=beginner`
- `?ai=learnhub_summary_teach&level=intermediate`
- `?ai=learnhub_summary_teach&level=advanced`

Shared behaviour:

- use the LearnHub summary as **primary context**,  
- adapt to the requested **level** (`beginner`, `intermediate`, `advanced`),
- respect your preferred answering language (`lang=...`),
- and use your preferred programming language for code examples (from the common footer).

Roughly:

- **5 Years Old**
- ultra-simple explanation,
- no jargon,
- 1–2 tiny real-world examples or mini-stories,
- focuses on intuition, not details.

- **Beginner**
  - step-by-step explanation,
  - simple wording,
  - small code snippets when helpful,
  - one short practice task,
  - a quick checklist.

- **Intermediate**
  - covers core concepts and trade-offs,
  - when/where to use or avoid the technique,
  - concise code,
  - one mini exercise,
  - “next steps” suggestions.

- **Advanced**
  - internals, performance, edge cases, failure modes,
  - production pitfalls and patterns,
  - minimal but dense code,
  - one harder challenge.

---

## 5. Alternative learning lenses

These flows explain the same topic from a different angle.

### Analogy

- Route: `?ai=learnhub_summary_analogy`
- Goal: explain the topic using:
  - one strong central analogy, plus
  - 2–3 mini analogies,
- each explicitly mapped to the underlying concepts.

Good when the topic is abstract or you are stuck.

---

### Storytelling

- Route: `?ai=learnhub_summary_story`
- Output:
- a short narrative that embeds the core concepts,
- clear characters, a simple conflict, and a resolution,
- key ideas called out explicitly at the end.

Good when you remember concepts better through stories and examples.

---

### Cheat Sheet

- Route: `?ai=learnhub_summary_cheatsheet`
- Output style:
  - short bullets only,
  - key terms, formulas/commands,
  - do/don’t,
  - gotchas,
  - a ~5-line recap at the end.

Designed to be compact and skimmable.

---

### Mindmap

- Route: `?ai=learnhub_summary_mindmap`
- Asks the AI to create **one mind map image** in English:
  - focused on recall,
  - covering most of the summary’s content.

Includes a specific fallback instruction if the model cannot open URLs.  
Good as a visual memory aid.

---

### Flashcards

- Route: `?ai=learnhub_summary_flashcards`
- Output:
  - 15 Q/A flashcards,
  - mixed conceptual and practical questions,
  - formatted as:

    ```text
    Q: ...
    A: ...
    ```

  - plus a **ready-to-import CSV file** for Anki.

Works best with AI models that support file generation (e.g. some ChatGPT models).  
For models without file support (like certain Grok variants), the text Q/A part still works, but CSV export may not.

---

### Practical Projects

- Route: `?ai=learnhub_summary_projects`
- For each topic:
  - 3–5 realistic mini-project ideas,
  - with: goal, main steps, acceptance criteria,
  - plus at least one stretch goal.

Great for turning theory into practice.

---

### Code Examples

- Route: `?ai=learnhub_summary_code`
- Output:
  - minimal runnable code snippets,
  - annotated inputs and outputs,
  - focused on covering each core concept,
  - uses your preferred programming language where possible.

---

### Common Mistakes

- Route: `?ai=learnhub_summary_mistakes`
- Output:
  - a list of common mistakes and pitfalls,
  - how to spot each one,
  - why it happens,
  - and the exact fix or safer pattern.

Good before going to production or interviews.

---

## 6. Checking your understanding

### Generate Quiz

- Route: `?ai=learnhub_summary_quiz`
- Output:
  - 10 questions:
    - 7 multiple-choice,
    - 3 short-answer.
  - a clear answer key at the end.

Useful for quick self-checks after studying a summary.

---

### Interview Me

- Route: `?ai=learnhub_summary_interview`
- Behaviour:
  - simulates an interview based on the summary,
  - asks one question at a time,
  - waits for your answer,
  - evaluates briefly,
  - adapts difficulty up/down as you go.

Helps you practice explaining concepts out loud and under pressure.

---

### Refactor Challenge

- Route: `?ai=learnhub_summary_refactor`
- Output:
- one or more intentionally messy code snippets,
- a refactor brief (goals, constraints),
- step-by-step or staged refactor hints,
- a final cleaned-up version with explanations.

Good for turning design ideas from the summary into hands-on refactoring practice.

---

### Assessment Rubric

- Route: `?ai=learnhub_summary_rubric`
- Output:
  - an assessment rubric with 3 levels:
    - Emerging,
    - Proficient,
    - Advanced.
  - for each skill:
    - observable criteria,
    - concrete examples.

Good for self-assessment or for mentors who want to evaluate a learner.

---

## 7. Language & stack personalization

Most routes accept a `lang=XX` parameter, where `XX` is a language code like:

- `EN`, `NL`, `DE`, `FR`, `ES`, `IT`, `SV`, `DA`, `NO`,  
  `PL`, `PT`, `RO`, `RU`, `HI`, `AR`, `FA`, `TR`

The common prompt footer also includes instructions such as:

- respond in the selected human language,
- use the learner’s **preferred programming language** for code examples.

This lets you:

- study a Java-based YouTube video,
- but get explanations in English, Dutch, Arabic, Farsi, Turkish, etc.,
- with code rewritten into your own stack (for example PHP).

---

## 8. Choosing the right AI provider

LearnHub does not host AI models.  
Instead, it:

- builds a short, readable prompt,
- wires in summary URLs and fallbacks,
- and sends everything through query parameters to the chat bot you choose.

Different providers/models have different strengths:

- Some are better at **file generation** (useful for flashcards/CSV).
- Some are stronger at **complex coding** (e.g. backend-heavy tasks).
- Some are better for **very fresh knowledge and web browsing**.

Recommendations:

- Prefer a provider where you have a **paid subscription** (to avoid strict limits).
- Choose a model that is strong enough for:
  - multi-step reasoning,
  - complex instructions,
  - and code generation if needed.

The roadmap includes:

- exposing the capabilities of each model (file support, URL fetching, code strength, web strength),
- and filtering suggestions based on your chosen workflow  
  (e.g. for flashcards, only show models that can generate downloadable files).

---

## 9. Live examples – click and explore

### 9.1. Let’s Dive in (flashcards, multiple languages)

System design mock interview – “Design Distributed Message Queue like Kafka”:  
Flashcards in different languages:

[HI](https://alisol.ir/?ai=learnhub_summary_flashcards&src=mock-interviews/system-design/Design%20Distributed%20Message%20Queue%20like%20Kafka&lang=HI) | 
[AR](https://alisol.ir/?ai=learnhub_summary_flashcards&src=mock-interviews/system-design/Design%20Distributed%20Message%20Queue%20like%20Kafka&lang=AR) | 
[FA](https://alisol.ir/?ai=learnhub_summary_flashcards&src=mock-interviews/system-design/Design%20Distributed%20Message%20Queue%20like%20Kafka&lang=FA) | 
[TR](https://alisol.ir/?ai=learnhub_summary_flashcards&src=mock-interviews/system-design/Design%20Distributed%20Message%20Queue%20like%20Kafka&lang=TR)

---

### 9.2. Analogy – Code with Mosh “Mastering Design Patterns (Part 1)”

Base link:

[Analogy – Code with Mosh Mastering Design Patterns Part 1](https://alisol.ir/?ai=learnhub_summary_analogy&src=courses/code-with-mosh-mastering-design-patterns-part-1)

Other languages:

[NL](https://alisol.ir/?ai=learnhub_summary_analogy&src=courses/code-with-mosh-mastering-design-patterns-part-1&lang=NL) | 
[DE](https://alisol.ir/?ai=learnhub_summary_analogy&src=courses/code-with-mosh-mastering-design-patterns-part-1&lang=DE) | 
[FR](https://alisol.ir/?ai=learnhub_summary_analogy&src=courses/code-with-mosh-mastering-design-patterns-part-1&lang=FR) | 
[ES](https://alisol.ir/?ai=learnhub_summary_analogy&src=courses/code-with-mosh-mastering-design-patterns-part-1&lang=ES) | 
[IT](https://alisol.ir/?ai=learnhub_summary_analogy&src=courses/code-with-mosh-mastering-design-patterns-part-1&lang=IT) | 
[SV](https://alisol.ir/?ai=learnhub_summary_analogy&src=courses/code-with-mosh-mastering-design-patterns-part-1&lang=SV) | 
[DA](https://alisol.ir/?ai=learnhub_summary_analogy&src=courses/code-with-mosh-mastering-design-patterns-part-1&lang=DA) | 
[NO](https://alisol.ir/?ai=learnhub_summary_analogy&src=courses/code-with-mosh-mastering-design-patterns-part-1&lang=NO) | 
[PL](https://alisol.ir/?ai=learnhub_summary_analogy&src=courses/code-with-mosh-mastering-design-patterns-part-1&lang=PL) | 
[PT](https://alisol.ir/?ai=learnhub_summary_analogy&src=courses/code-with-mosh-mastering-design-patterns-part-1&lang=PT) | 
[RO](https://alisol.ir/?ai=learnhub_summary_analogy&src=courses/code-with-mosh-mastering-design-patterns-part-1&lang=RO) | 
[RU](https://alisol.ir/?ai=learnhub_summary_analogy&src=courses/code-with-mosh-mastering-design-patterns-part-1&lang=RU) | 
[HI](https://alisol.ir/?ai=learnhub_summary_analogy&src=courses/code-with-mosh-mastering-design-patterns-part-1&lang=HI) | 
[AR](https://alisol.ir/?ai=learnhub_summary_analogy&src=courses/code-with-mosh-mastering-design-patterns-part-1&lang=AR) | 
[FA](https://alisol.ir/?ai=learnhub_summary_analogy&src=courses/code-with-mosh-mastering-design-patterns-part-1&lang=FA) | 
[TR](https://alisol.ir/?ai=learnhub_summary_analogy&src=courses/code-with-mosh-mastering-design-patterns-part-1&lang=TR)

---

### 9.3. Advanced teaching – Laracasts “Laravel Queue Mastery”

Base link (Advanced teaching level):

[Advanced Teaching – Laravel Queue Mastery](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&src=courses/laracasts-laravel-queue-mastery)

Other languages:

[NL](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&src=courses/laracasts-laravel-queue-mastery&lang=NL) | 
[DE](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&src=courses/laracasts-laravel-queue-mastery&lang=DE) | 
[FR](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&src=courses/laracasts-laravel-queue-mastery&lang=FR) | 
[ES](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&src=courses/laracasts-laravel-queue-mastery&lang=ES) | 
[IT](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&src=courses/laracasts-laravel-queue-mastery&lang=IT) | 
[SV](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&src=courses/laracasts-laravel-queue-mastery&lang=SV) | 
[DA](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&src=courses/laracasts-laravel-queue-mastery&lang=DA) | 
[NO](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&src=courses/laracasts-laravel-queue-mastery&lang=NO) | 
[PL](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&src=courses/laracasts-laravel-queue-mastery&lang=PL) | 
[PT](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&src=courses/laracasts-laravel-queue-mastery&lang=PT) | 
[RO](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&src=courses/laracasts-laravel-queue-mastery&lang=RO) | 
[RU](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&src=courses/laracasts-laravel-queue-mastery&lang=RU) | 
[HI](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&src=courses/laracasts-laravel-queue-mastery&lang=HI) | 
[AR](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&src=courses/laracasts-laravel-queue-mastery&lang=AR) | 
[FA](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&src=courses/laracasts-laravel-queue-mastery&lang=FA) | 
[TR](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&src=courses/laracasts-laravel-queue-mastery&lang=TR)

---

### 9.4. Ask AI Topic – DDIA “Consistency and Consensus”

Base link:

[Ask AI Topic – Consistency and Consensus (DDIA)](https://alisol.ir/?ai=Consistency%20and%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications)

Other languages:

[NL](https://alisol.ir/?ai=Consistency%20and%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications&lang=NL) | 
[DE](https://alisol.ir/?ai=Consistency%20and%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications&lang=DE) | 
[FR](https://alisol.ir/?ai=Consistency%20and%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications&lang=FR) | 
[ES](https://alisol.ir/?ai=Consistency%20and%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications&lang=ES) | 
[IT](https://alisol.ir/?ai=Consistency%20and%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications&lang=IT) | 
[SV](https://alisol.ir/?ai=Consistency%20and%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications&lang=SV) | 
[DA](https://alisol.ir/?ai=Consistency%20and%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications&lang=DA) | 
[NO](https://alisol.ir/?ai=Consistency%20and%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications&lang=NO) | 
[PL](https://alisol.ir/?ai=Consistency%20and%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications&lang=PL) | 
[PT](https://alisol.ir/?ai=Consistency%20and%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications&lang=PT) | 
[RO](https://alisol.ir/?ai=Consistency%20and%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications&lang=RO) | 
[RU](https://alisol.ir/?ai=Consistency%20and%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications&lang=RU) | 
[HI](https://alisol.ir/?ai=Consistency%20and%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications&lang=HI) | 
[AR](https://alisol.ir/?ai=Consistency%20and%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications&lang=AR) | 
[FA](https://alisol.ir/?ai=Consistency%20and%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications&lang=FA) | 
[TR](https://alisol.ir/?ai=Consistency%20and%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications&lang=TR)

---

### 9.5. How it looks

<p align="center">    
  <img src="assets/summary_ai_powered_btns.gif" alt="AI-powered Summary Buttons" width="853">
</p>

This animation shows a typical path:

1. Open a summary in GitHub.
2. Click one of the AI-powered buttons.
3. Pick an AI provider.
4. Let the model teach, drill, or assess you using the LearnHub summary as context.
