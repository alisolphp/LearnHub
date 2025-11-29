# Course Summary: Writing Highly Maintainable Unit Tests

* **Platform**: Pluralsight  
* **Instructor**: Zoran Horvat  
* **Rating**: 4.7/5  
* **Release Date**: March 2017  
* **Duration**: 6h 15m  
* **Course Link**: [Writing Highly Maintainable Unit Tests](https://www.pluralsight.com/courses/writing-highly-maintainable-unit-tests)

*This document summarizes the key points from the course. I highly recommend watching the full course if you have the opportunity.*

## Before You Get Started
- I summarize key points from useful courses to learn and review quickly.  
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=31acc7b2 -->

### AI-Powered buttons

Start teaching this to a:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Story](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=courses/pluralsight-writing-highly-maintainable-unit-tests)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=courses/pluralsight-writing-highly-maintainable-unit-tests)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=courses/pluralsight-writing-highly-maintainable-unit-tests)
<!-- LH-BUTTONS:END -->

## 1. Why Unit Tests Become Unmaintainable and What We Can Do About It

**Summary**: Zoran kicks off by sharing his 15+ years of pain with huge, fragile test suites. The core promise of the course is to show you how to write tests that don’t break every time you refactor production code, how to eliminate almost all duplication in tests, and how to build reusable testing utilities that last for years.

**Example**: A simple “find maximum in array” function that looks correct but hides subtle bugs when the array is empty or null — the kind of thing that passes a few quick tests but blows up in production.

**Link for More Details**: [Ask AI: Why unit tests become fragile](https://alisol.ir/?ai=Why%20unit%20tests%20become%20fragile|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests)

## 2. Formal Proofs vs Real-World Testing

**Summary**: Zoran walks through formally proving a tiny maximum-finding function correct using loop invariants and induction. It’s beautiful for 10 lines of code, but impossible at scale — which is exactly why we need tests. Tests don’t prove correctness, they only demonstrate it on selected inputs, but if you choose those inputs wisely you gain huge confidence.

**Example**: Proving that `max` is correctly updated in each loop iteration, then showing the same code fails on an empty array unless guarded with assertions.

**Link for More Details**: [Ask AI: Formal proof of correctness in unit testing](https://alisol.ir/?ai=Formal%20proof%20of%20correctness%20in%20unit%20testing|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests)

## 3. From Manual Testing Automated Tests and Test Runners

**Summary**: Shows how to go from “run the app and type numbers” to real automated tests (Arrange-Act-Assert pattern, descriptive test names). He even builds a 70-line test runner from scratch to show how simple the concept is and how tests should run on every build.

**Example**: Writing the first failing test for `MyArray.Maximum()`, fixing the bug, watching the test go green — the instant feedback loop we all love.

**Link for More Details**: [Ask AI: Building your own test runner](https://alisol.ir/?ai=Building%20your%20own%20test%20runner|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests)

## 4. State-Based Testing vs Interaction-Based Testing

**Summary**: The eternal question: do you check the end state (state-based) or do you verify that certain methods were called (interaction-based/mocking)? State testing often forces you to expose internal data; interaction testing keeps encapsulation but can make tests brittle.

**Example**: Adding “target points” to an array — state test checks the array contents, interaction test verifies that `Append()` was called twice with 3 and 5.

**Link for More Details**: [Ask AI: State vs interaction testing](https://alisol.ir/?ai=State%20vs%20interaction%20testing|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests)

## 5. Making Production Code Testable (Without Ruining Design)

**Summary**: Exposing state just for tests is dangerous in the long term. Zoran shows how to use `internal` + `InternalsVisibleTo`, but eventually argues that carefully chosen public members are often cleaner. The real fix is designing code to be testable from the start.

**Example**: Adding a public `GetElementAt(int index)` only because a test needs it, then realizing years later it shouldn’t have been public.

**Link for More Details**: [Ask AI: Making code testable without exposing internals](https://alisol.ir/?ai=Making%20code%20testable%20without%20exposing%20internals|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests)

## 6. Dependencies Mocking Done Right

**Summary**: Most test breakage comes from bad dependency handling. Zoran shows hand-rolled mocks first, then moves to Moq, and most importantly — how to structure code so dependencies are injectable and tests stay focused on the unit.

**Example**: Testing a service that talks to a repository — mock the repository interface, verify only the calls you care about, ignore the rest.

**Link for More Details**: [Ask AI: Clean dependency management in unit tests](https://alisol.ir/?ai=Clean%20dependency%20management%20in%20unit%20tests|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests)

## 7. Abstract Data Types The Real Game Changer

**Summary**: Stop testing concrete classes — test against interfaces or abstract base classes. This single change makes tests survive massive implementation refactors.

**Example**: Writing all tests against `IList<T>` instead of `MyList<T>` — you can completely rewrite the internal storage and no test breaks.

**Link for More Details**: [Ask AI: Testing against abstract data types](https://alisol.ir/?ai=Testing%20against%20abstract%20data%20types|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests)

## 8. Testing Generics Interfaces Like a Pro

**Summary**: Generic constraints, covariance/contravariance pitfalls, and especially testing interface implementations without tying tests to any concrete class. This is where tests become truly bulletproof.

**Example**: A standardized test suite for any `IEquatable<T>` implementation that uses reflection to verify all required members behave correctly.

**Link for More Details**: [Ask AI: Testing generic types and interfaces](https://alisol.ir/?ai=Testing%20generic%20types%20and%20interfaces|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests)

## 9. Reusable Testing Libraries Testing Design Principles

**Summary**: When you need to test the same complex thing repeatedly (equality, disposable pattern, value-type semantics), don’t copy-paste — build a small testing library. Zoran builds live equality tester that checks 29 rules with just 6 lines in the actual test.

**Example**: One-liner test that verifies a `Date` struct has perfect value-type equality, hash codes, operators, sealed class, everything.

**Link for More Details**: [Ask AI: Building reusable testing libraries](https://alisol.ir/?ai=Building%20reusable%20testing%20libraries|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests)

## 10. Error Conditions Negative Scenarios (The Part Everyone Gets Wrong)

**Summary**: Throwing exceptions for invalid inputs is often a code smell. Most “errors” are actually caller mistakes (bugs). Zoran introduces Design by Contract — preconditions, postconditions, invariants — and shows how contracts replace dozens of unit tests.

**Example**: Repository interface with explicit contracts → you can delete 30 % of unit tests because contracts check them on every real execution.

**Link for More Details**: [Ask AI: Design by Contract in unit testing](https://alisol.ir/?ai=Design%20by%20Contract%20in%20unit%20testing|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests)

---

**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:  
- Website: [alisol.ir](https://alisol.ir)  
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
