# Course Summary: Mastering Design Patterns: Part 2

* **Platform**: Code with Mosh  
* **Instructor**: Mosh Hamedani  
* **Course Link**: [https://codewithmosh.com/p/design-patterns-part2](https://codewithmosh.com/p/design-patterns-part2)

*This document summarizes the key points from the course. I highly recommend watching the full course if you have the opportunity.*

## Before You Get Started
- I summarize key points from useful courses to learn and review quickly.  
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=courses/code-with-mosh-mastering-design-patterns-part-2)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=courses/code-with-mosh-mastering-design-patterns-part-2)
<!-- LH-BUTTONS:END -->

## Introduction
This is the second part of the Ultimate/Mastering Design Patterns series. Part 1 was about behavioral patterns (how objects communicate). Part 2 focuses on structural patterns – how objects are composed and related to each other to build flexible, maintainable systems.  
Mosh assumes you’ve already completed Part 1 (or are comfortable with SOLID principles and basic patterns), so the pace is fast and focused on real-world implementation.

## Composite Pattern
**Summary**: Use Composite when you need to represent part-whole hierarchies (tree structures) and treat individual objects and groups of objects uniformly. Instead of checking types and casting everywhere, create a common Component interface that both leaves (individual items) and composites (containers) implement.

**Example**: In Keynote/PowerPoint you group shapes → the group acts like a single shape (move/resize applies to everything inside). Same idea in file systems: a folder can contain files or other folders, and operations like delete/move work recursively.

**Link for More Details**: [Ask AI: Composite Pattern](https://alisol.ir/?ai=Composite%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%202)

## Adapter Pattern
**Summary**: Adapter converts the interface of an existing class into the interface your code expects. Perfect when you want to use a third-party library but its API doesn’t match yours. You create an adapter class that implements your desired interface and wraps the incompatible class (via composition or inheritance).

**Example**: You have your own Filter interface with apply(Image). A third-party library gives you Caramel filter with init() and render(Image). You write CaramelFilter (adapter) that implements Filter, calls init() once and then render() inside apply().

**Link for More Details**: [Ask AI: Adapter Pattern](https://alisol.ir/?ai=Adapter%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%202)

## Decorator Pattern
**Summary**: Decorator lets you add responsibilities/behavior to objects dynamically without subclassing. You create decorator classes that implement the same interface as the wrapped object and hold a reference to it (composition). You can stack decorators freely.

**Example**: Storing data in the cloud → sometimes you need encryption, sometimes compression, sometimes both. Instead of exploding subclasses, you wrap CloudStream with EncryptedStream and/or CompressedStream. The client just gets a Stream reference and calls write() – all decorations happen transparently.

**Link for More Details**: [Ask AI: Decorator Pattern](https://alisol.ir/?ai=Decorator%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%202)

## Facade Pattern
**Summary**: Facade provides a simplified interface to a complex subsystem. You hide a bunch of classes and messy steps behind one clean class/method so clients don’t have to deal with the complexity (and you reduce coupling).

**Example**: Sending push notifications requires: connect → authenticate → send → disconnect. Instead of making every part of the app do these four steps, create NotificationService.send(message, target) that does everything internally.

**Link for More Details**: [Ask AI: Facade Pattern](https://alisol.ir/?ai=Facade%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%202)

## Flyweight Pattern
**Summary**: Flyweight reduces memory usage by sharing as much data as possible between similar objects. Separate intrinsic state (shared, immutable – e.g. icons, textures) from extrinsic state (context-specific – e.g. coordinates). Use a factory to cache and reuse the intrinsic parts.

**Example**: Rendering thousands of trees on a game map. The tree icon/texture is the same for every tree of the same type → store it once in a flyweight (TreeType) and reuse it. Only x/y coordinates are unique per tree instance.

**Link for More Details**: [Ask AI: Flyweight Pattern](https://alisol.ir/?ai=Flyweight%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%202)

## Bridge Pattern
**Summary**: Bridge decouples abstraction from implementation so both can vary independently. Instead of a deep inheritance hierarchy that explodes when you add new features or platforms, create two separate hierarchies (abstraction + features, implementation) and connect them with a reference (the “bridge”).

**Example**: Remote controls (basic vs advanced) for different TV brands (Sony, Samsung, LG…). Without Bridge you end up with SonyRemote, SonyAdvancedRemote, SamsungRemote, etc. With Bridge you have RemoteControl → Device (SonyTV, SamsungTV). Adding a new remote type or new TV brand only adds one class.

**Link for More Details**: [Ask AI: Bridge Pattern](https://alisol.ir/?ai=Bridge%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%202)

## Proxy Pattern
**Summary**: Proxy controls access to an object by sitting in front of it. Common uses: lazy loading, access control, logging, caching. The proxy implements the same interface and forwards calls to the real object (created on-demand or behind checks).

**Example**: Ebook library – you don’t want to load every ebook file into memory when the app starts. Use EbookProxy that only creates the real (heavy) Ebook object the first time show() is called (lazy initialization). You can also add logging or rental-expiry checks in the proxy.

**Link for More Details**: [Ask AI: Proxy Pattern](https://alisol.ir/?ai=Proxy%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%202)

---

**Original Course**  
Watch the full course here: [https://codewithmosh.com/p/design-patterns-part2](https://codewithmosh.com/p/design-patterns-part2)

---

**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:  
- Website: [alisol.ir](https://alisol.ir)  
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
