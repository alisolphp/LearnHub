# Course Summary: Mastering Design Patterns: Part 1

- Platform : Code with Mosh
- Instructor : Mosh Hamedani
- Duration : 04:00:00
- Course Link : < https://codewithmosh.com/p/design-patterns-part1>

This is the complete and updated English summary with all Behavioral patterns that appear in the original course.

---

## Before You Get Started

Quick summaries of useful courses for fast learning and review.
Click any Ask AI link to dive deeper into a topic.

---

## Course Introduction & Why Design Patterns Matter

Design patterns are reusable, elegant solutions to common software design problems.
The Part 1 covers 10 of the 11 behavioral patterns from the Gang of Four book (all except the Interpreter pattern). 

Benefits:

- Communicate ideas faster (“just use the Strategy pattern”)
- Write cleaner, more maintainable code
- Learn frameworks/libraries much quicker (you’ll recognize the patterns they use)

Mosh teaches each pattern the same way: real problem → bad solutions → gradually better solutions → the actual pattern.

Ask AI: Introduction to Design Patterns

---

## OOP Essentials (The Foundation)

Crystal-clear review of the core concepts every pattern builds on (with simple Java examples):

- Classes & Objects
- Coupling (tight vs loose)
- Interfaces & programming to an interface
- Encapsulation (hide data, expose behavior)
- Abstraction (hide implementation details)
- Inheritance & Polymorphism
- UML notation

Even experienced developers say these 30–40 minutes alone are worth the course.

Ask AI: OOP Essentials

---

## Memento Pattern (Undo/Redo)

Summary : Capture and restore an object’s internal state without violating encapsulation.

How Mosh teaches it : Simple text editor → naive undo ideas → problems → final solution with three roles:

- Originator ( Editor )
- Memento ( EditorState – immutable)
- Caretaker ( History – stack of states)

Example : Type A → AB → ABC → undo restores previous state.

Ask AI: Memento Pattern

---

## State Pattern (Object changes behavior when state changes)

Summary : Allow an object to alter its behavior when its internal state changes. The object appears to change its class.

How Mosh teaches it : Canvas tool (Brush, Eraser, Selection) → initial switch-statement mess → each state becomes its own class → Canvas just holds a Tool reference and delegates mouse actions.

Result : Adding a new tool never touches existing code.

Ask AI: State Pattern

---

## Iterator Pattern (Traverse collections safely)

Summary : Provide a way to access elements of a collection sequentially without exposing its underlying representation.

How Mosh teaches it : Custom ProductCollection → initial bad exposure of internal array → Iterator interface → separate ListIterator that knows how to traverse.

Bonus : Works even if the underlying structure changes (array → linked list).

Ask AI: Iterator Pattern

---

## Strategy Pattern (Runtime algorithm swapping)

Summary : Define a family of algorithms, encapsulate each one, and make them interchangeable at runtime.

How Mosh teaches it : Image compressor → initially hard-coded → different compression algorithms ( JpegCompressor , PngCompressor ) → Compressor interface → ImageStorage receives any compressor (and filter) at runtime.

Result : Easy to add new compression or filter without touching ImageStorage .

Ask AI: Strategy Pattern

---

## Template Method Pattern (Algorithm skeleton)

Summary : Define the skeleton of an algorithm in a base class, but let subclasses override specific steps.

How Mosh teaches it : Data processing pipeline → common steps (load → process → save) → each data type overrides only what differs.

Used heavily in frameworks (ASP.NET page lifecycle, Spring Boot startup).

Ask AI: Template Method Pattern

---

## Command Pattern (Requests as objects)

Summary : Encapsulate a request as an object → parameterize, queue, log, and support undo/redo.

How Mosh teaches it : Video editor with bold/contrast/undo → initial mess → each action becomes a Command object → History stack → UndoCommand .

Result : Undo/redo for free, easy to add new actions.

Ask AI: Command Pattern

---

## Observer Pattern (Publish-Subscribe)

Summary : Define a one-to-many dependency: when one object changes state, all its dependents are notified automatically.

How Mosh teaches it : Stock price example → DataSource (subject) → multiple spreadsheets/charts (observers) → push or pull model.

Used everywhere: events, listeners, reactive programming.

Ask AI: Observer Pattern

---

## Mediator Pattern (Centralized communication)

Summary : Objects no longer talk directly to each other; they talk through a central mediator → reduces coupling.

How Mosh teaches it : Dialog box with ListBox → TextBox → Button → initial direct references → mediator ( DialogBox ) owns all controls and coordinates changes via Observer-style events.

Result : Reusable, independent UI controls.

Ask AI: Mediator Pattern

---

## Chain of Responsibility Pattern (Processing pipeline)

Summary : Pass a request along a chain of handlers. Each handler decides to process or forward.

How Mosh teaches it : Web server → Authenticator → Logger → Compressor → each handler extends base Handler with next reference → easy to reorder/remove/add steps.

Result : Open/Closed pipeline.

Ask AI: Chain of Responsibility Pattern

---

## Visitor Pattern (Add operations without modifying classes)

Summary : Separate algorithms from the object structure they operate on → add new operations without touching existing classes.

How Mosh teaches it : HTML document with nodes → highlight → plain-text → each operation becomes a separate class → nodes accept a visitor ( execute(operation) ).

Result : New operations (extract links, audio filter, etc.) require only a new visitor class.

Ask AI: Visitor Pattern

---

Original Course Link : < https://codewithmosh.com/p/design-patterns-part1>

---

## About the summarizer

I'm Ali Sol , a Backend Developer.
Website: <https://alisol.ir>
LinkedIn: < https://www.linkedin.com/in/alisolphp>
