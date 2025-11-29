# Book Summary: Refactoring: Improving the Design of Existing Code (2nd Edition)

* **Author**: Martin Fowler (with contributions by Kent Beck)
* **Genre**: Software Engineering
* **Publication Date**: 2019
* **Book Link**: https://amazon.com/dp/0134757599

This document summarizes the key lessons and insights extracted from the book.
I highly recommend reading the original book for the full depth and author's perspective.

## Before You Get Started
* I summarize key points from useful books to learn and review quickly.
* Simply click on `Ask AI` links after each section to dive deeper.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=31acc7b2 -->

### AI-Powered buttons

Start teaching this to a:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=books/Refactoring) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=books/Refactoring) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=books/Refactoring) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=books/Refactoring) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=books/Refactoring) | 
[Story](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=books/Refactoring) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=books/Refactoring) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=books/Refactoring) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=books/Refactoring) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=books/Refactoring) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=books/Refactoring) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=books/Refactoring)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=books/Refactoring) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=books/Refactoring) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=books/Refactoring)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=books/Refactoring)
<!-- LH-BUTTONS:END -->

## Refactoring: A First Example

**Summary**: Instead of starting with abstract principles, Fowler jumps straight into a concrete, step-by-step refactoring of a real-ish JavaScript program that generates customer invoices for a theater company. The initial code is a single long function that mixes calculation logic, formatting, and string building. Through dozens of tiny, safe steps — each followed by running tests — he transforms it into a clean set of small, focused functions while keeping the external behavior identical. The chapter drives home that refactoring is a disciplined technique for improving the internal structure of working code, making it dramatically easier (and safer) to add new features later.

**Example**: A `statement(invoice, plays)` function starts as ~60 lines with a `switch`, temporary variables, and string concatenation. It ends as a short top-level function that orchestrates tiny nested helpers like `amountFor`, `volumeCreditsFor`, `totalVolumeCredits()`, `totalAmount()`, and a nicely named `usd()` formatter. Every step is shown in full code diffs.

**Link for More Details**:
[Ask AI: refactoring example](https://alisol.ir/?ai=Chapter%201%20Refactoring%20A%20First%20Example%7CMartin%20Fowler%7CRefactoring%3A%20Improving%20the%20Design%20of%20Existing%20Code%20%282nd%20Edition%29)

## The Absolute Rule: Tests First, Tests Always

**Summary**: Before touching a single line of code for refactoring, you must have a reliable, automated test suite. These tests are your safety net — you’ll run them after literally every tiny change. Fowler stresses self-checking tests (green/red) and commits after each successful step. Without this discipline, refactoring quickly becomes dangerous guesswork.

**Example**: For the statement function he writes tests that feed known invoices and plays.json data, then asserts the exact output string. The tests run in seconds and are rerun constantly.

**Link for More Details**:
[Ask AI: Testing strategy in refactoring](https://alisol.ir/?ai=Testing%20strategy%20in%20refactoring%7CMartin%20Fowler%7CRefactoring%3A%20Improving%20the%20Design%20of%20Existing%20Code%20%282nd%20Edition%29)

## Core Refactorings Used in the Big Example

**Summary**: The chapter is a live demo of the most common day-to-day refactorings: Extract Function (repeatedly), Replace Temp with Query, Split Loop, Slide Statements, Inline Variable, and careful renaming. Each is applied in tiny steps with immediate testing. The result feels almost magical — the same behavior but suddenly readable and extensible.

**Example**: A temporary `thisAmount` becomes its own `amountFor` function → play variable is removed with `playFor()` query → volume credits calculation extracted → format variable turned into `usd()` → finally separate loops for total amount and total credits are extracted into their own query functions.

[Personal note: These exact refactorings are still my daily bread in 2025. Modern IDEs (WebStorm, VS Code + ESLint) automate most of them with a keystroke, but the principles haven’t aged a day.]

**Link for More Details**:
[Ask AI: Core refactorings](https://alisol.ir/?ai=Core%20refactorings%20from%20Chapter%201%7CMartin%20Fowler%7CRefactoring%3A%20Improving%20the%20Design%20of%20Existing%20Code%20%282nd%20Edition%29)

## When Inheritance Goes Wrong – Replace Subclass with Delegate

**Summary**: Subclassing is convenient but can paint you into a corner (single inheritance, tight coupling, confusing “is-a” relationships). The book shows several cases where replacing subclasses with a delegate object (composition) is cleaner and more flexible — especially when you need to change behavior at runtime or combine multiple variation axes.

**Example**: 
- Booking → PremiumBooking subclass replaced by a `PremiumBookingDelegate` that holds extras and is optionally attached to a normal Booking.
- Bird species hierarchy replaced by a `SpeciesDelegate` (with its own tiny inheritance tree) so Bird stays free for future variation (wild vs captive, etc.).
- Scroll incorrectly inheriting from CatalogItem (confusing type vs instance) → changed to delegation + shared catalog reference.

[Personal note: In 2025 I reach for delegation even faster than in 2019 — dynamic premium upgrades, mix-in style behaviors with objects, and avoiding deep class hierarchies are everyday needs.]

**Link for More Details**:
[Ask AI: Replace Subclass with Delegate](https://alisol.ir/?ai=Replace%20Subclass%20with%20Delegate%7CMartin%20Fowler%7CRefactoring%3A%20Improving%20the%20Design%20of%20Existing%20Code%20%282nd%20Edition%29)

## Extract Superclass & Collapse Hierarchy

**Summary**: When two classes share significant fields and behavior, pull the common parts into a superclass (Extract Superclass). If later you realize the hierarchy is no longer pulling its weight, merge them back (Collapse Hierarchy).

**Example**: Employee and Department both have `name` and `annualCost` → extracted to a common `Party` superclass. The code becomes clearer and duplication disappears.

**Link for More Details**:
[Ask AI: Extract Superclass and Collapse Hierarchy](https://alisol.ir/?ai=Extract%20Superclass%20and%20Collapse%20Hierarchy%7CMartin%20Fowler%7CRefactoring%3A%20Improving%20the%20Design%20of%20Existing%20Code%20%282nd%20Edition%29)

## Replace Superclass with Delegate

**Summary**: Sometimes a subclass relationship is semantically wrong (e.g., a physical Scroll is not a CatalogItem; it merely contains one). Replacing the superclass with a contained delegate removes the misleading “is-a” relationship and avoids confusion.

**Example**: Scroll originally extended CatalogItem → changed to hold a reference to a shared CatalogItem, fixing the type-instance confusion and allowing multiple scrolls to share the same catalog data safely.

**Link for More Details**:
[Ask AI: Replace Superclass with Delegate](https://alisol.ir/?ai=Replace%20Superclass%20with%20Delegate%7CMartin%20Fowler%7CRefactoring%3A%20Improving%20the%20Design%20of%20Existing%20Code%20%282nd%20Edition%29)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
* Website: [alisol.ir](https://alisol.ir)
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
