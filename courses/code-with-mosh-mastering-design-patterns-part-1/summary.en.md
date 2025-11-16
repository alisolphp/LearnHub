# Course Summary: Mastering Design Patterns: Part 1

- **Platform**: Code with Mosh
- **Instructor**: Mosh Hamedani
- **Rating**: 4.3/5
- **Release Date**: 2020
- **Course Link**: <https://codewithmosh.com/p/design-patterns-part1>

_This document summarizes the key points from the course. I highly recommend watching the full course if you have the opportunity._

---

## Before You Get Started

- I summarize key points from useful courses to learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

---

## Course Introduction & Why Design Patterns Matter

Mosh starts with a warm welcome and explains that the goal is to teach you how to build **reusable, extensible, and maintainable** object-oriented software. You need only basic programming experience (any language) and a little familiarity with OOP concepts — he reviews the essentials anyway.

Design patterns are reusable solutions to common problems in software design. They come from the famous Gang of Four book (23 classic patterns split into Creational, Structural, and Behavioral). This Part 1 focuses entirely on the **Behavioral** patterns.

Big benefits:

- Communicate ideas faster with other developers (“just use the Command pattern here”).
- Become a better designer — you’ll naturally write cleaner code.
- Learn frameworks/libraries much faster because you’ll recognize the patterns they use.

Mosh teaches patterns by walking you through real problems first, then showing bad solutions, better solutions, and finally the actual pattern — exactly how the Gang of Four thought about them.

[Ask AI: Introduction to Design Patterns](https://alisol.ir/?ai=Introduction%20to%20Design%20Patterns%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%201)

---

## OOP Essentials (The Foundation)

Before jumping into patterns, Mosh gives a crystal-clear review of the core OOP concepts that everything else builds on (using simple Java examples):

- **Classes & Objects** – fields, constructors, methods  
- **Coupling** – tight vs loose, why loose coupling is crucial  
- **Interfaces** – contracts for capabilities, “program to an interface”  
- **Encapsulation** – hide data, expose behavior (getters/setters → better: domain methods like `deposit` / `withdraw`)  
- **Abstraction** – hide implementation details (private methods)  
- **Inheritance** – reuse code via base classes  
- **Polymorphism** – objects can take many forms (abstract classes + overriding)  
- **UML** – quick notation for classes, inheritance, composition, dependency  

These 30–40 minutes alone are worth the course if you ever felt fuzzy on any of these.

[Ask AI: OOP Essentials and Core Principles](https://alisol.ir/?ai=OOP%20Essentials%20and%20Core%20Principles%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%201)

---

## Memento Pattern (Undo mechanism)

**Summary**: Capture an object’s internal state so it can be restored later, without breaking encapsulation. Perfect for undo/redo.

**How Mosh teaches it**:  
Starts with a simple text editor. First naive ideas (store previous content, then a list) → problems with extensibility and single-responsibility. Final solution: three roles:

- Originator (`Editor`)
- Memento (`EditorState` – immutable snapshot)
- Caretaker (`History` – push/pop states)

**Example**: You type `A` → `AB` → `ABC`, each time a new state is pushed. Hit undo → pop the last state and restore.

[Ask AI: Memento Pattern](https://alisol.ir/?ai=Memento%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%201)

---

## Mediator Pattern (Objects talking without chaos)

**Summary**: Instead of objects referencing each other directly (spaghetti dependencies), everything talks to a central “mediator” object.

**Real-world example**:  
A dialog box with Articles `ListBox` → Title `TextBox` → `Save` Button. When you select an article, the title fills and the button enables. When you edit the title, the button enables/disables.

Mosh shows two implementations:

1. Simple owner reference (each control has an owner dialog box).  
2. Cleaner version using the Observer pattern (event handlers / lambdas) — this is what real frameworks do.

**Result**: Controls are completely reusable and independent.

[Ask AI: Mediator Pattern](https://alisol.ir/?ai=Mediator%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%201)

---

## Chain of Responsibility Pattern (Processing pipelines)

**Summary**: Build a chain of handlers; each does its job and either stops or passes the request to the next handler.

**Example**:  
Simple web server → `Authenticator` → `Logger` → `Compressor`.  
If authentication fails → stop. If it succeeds → log → compress. You can reorder, remove, or add steps without touching the server code.

Mosh combines it with the Template Method pattern in the base `Handler` class for the common “do your thing → pass to next” flow.

[Ask AI: Chain of Responsibility Pattern](https://alisol.ir/?ai=Chain%20of%20Responsibility%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%201)

---

## Visitor Pattern (Adding new operations easily)

**Summary**: When you have a stable object structure (e.g., HTML nodes) but keep needing new operations (highlight, plain-text extraction, etc.), Visitor lets you add operations without changing the existing classes.

**How it works**:

- Each node gets an `accept(operation)` / `execute(operation)` method.  
- Operations are separate classes with overloaded `apply(nodeType)` methods (double dispatch).

**Result**: All logic for one operation lives in one place, and the node classes stay closed for modification.

[Ask AI: Visitor Pattern](https://alisol.ir/?ai=Visitor%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%201)

The full course also deeply covers **State, Iterator, Strategy, Template Method, Command, and Observer** patterns the same thoughtful way (problem → bad solutions → pattern), plus a lot more code and exercises.

---

**Original Course Link**: <https://codewithmosh.com/p/design-patterns-part1>

---

## About the summarizer

I'm _Ali Sol_, a Backend Developer. Learn more:

- Website: <https://alisol.ir>  
- LinkedIn: <https://www.linkedin.com/in/alisolphp>  

