# PHP Design patterns in Laminas (Zend)

* **Platform**: YouTube
* **Channel/Creator**: Applicable Programming 
* **Duration**: 00:31:38
* **Release Date**: Jun 13, 2022
* **Video Link**: [https://www.youtube.com/watch?v=mvuOErwUcPY](https://www.youtube.com/watch?v=mvuOErwUcPY)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=47fdb3b8 -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/PHP%20Design%20patterns%20in%20Laminas%20(Zend)) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/PHP%20Design%20patterns%20in%20Laminas%20(Zend)) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/PHP%20Design%20patterns%20in%20Laminas%20(Zend)) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/PHP%20Design%20patterns%20in%20Laminas%20(Zend)) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/PHP%20Design%20patterns%20in%20Laminas%20(Zend)) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/PHP%20Design%20patterns%20in%20Laminas%20(Zend)) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/PHP%20Design%20patterns%20in%20Laminas%20(Zend)) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/PHP%20Design%20patterns%20in%20Laminas%20(Zend)) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/PHP%20Design%20patterns%20in%20Laminas%20(Zend)) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/PHP%20Design%20patterns%20in%20Laminas%20(Zend)) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/PHP%20Design%20patterns%20in%20Laminas%20(Zend)) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/PHP%20Design%20patterns%20in%20Laminas%20(Zend))

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/PHP%20Design%20patterns%20in%20Laminas%20(Zend)) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/PHP%20Design%20patterns%20in%20Laminas%20(Zend)) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/PHP%20Design%20patterns%20in%20Laminas%20(Zend))
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/PHP%20Design%20patterns%20in%20Laminas%20(Zend))
<!-- LH-BUTTONS:END -->

## Exploring Laminas Source Code for Design Patterns
Rust handles memory safety by... wait, no—let's dive into how Laminas (formerly Zend) implements design patterns. A solid approach to understanding a framework is examining its internal code. Here, we look at index.php as the entry point, where the application initializes, loads configurations via Composer, and runs the app. This setup reveals patterns like service managers and bootstrapping listeners.
* **Key Takeaway/Example**: The bootstrap method sets up listeners for events, showing how the framework triggers actions during the app's lifecycle.
* **Link for More Details**: [Ask AI: Exploring Laminas Source Code](https://alisol.ir/?ai=Exploring%20Laminas%20Source%20Code%7CApplicable%20Programming%20%7CPHP%20Design%20patterns%20in%20Laminas%20(Zend))

## Observer Pattern in Laminas Events
Laminas uses the observer pattern (or subject-observer) through its event manager. In the bootstrap process, listeners attach to events like 'bootstrap', and the event manager notifies them when events trigger. For instance, in module.php, you can add an onBootstrap method that reacts to the bootstrap event, or attach custom events like 'hack detected' to trigger actions such as logging or emailing.
* **Key Takeaway/Example**: To attach a listener: get the event manager, then use attach('hack detected', function() { var_dump('Hack detected'); }). Later, trigger it with $eventManager->trigger('hack detected').
* **Link for More Details**: [Ask AI: Observer Pattern in Laminas](https://alisol.ir/?ai=Observer%20Pattern%20in%20Laminas%7CApplicable%20Programming%20%7CPHP%20Design%20patterns%20in%20Laminas%20(Zend))

## Problems Solved by Observer Pattern
The observer pattern addresses communication between objects without tight dependencies. In a web shop, modules like posts, SEO, and logging need to interact, but direct coupling creates a mess. Instead, objects communicate via a central mechanism (event manager), where subjects publish events and observers react. This keeps things versatile for plugins and modules, with zero direct dependency.
* **Key Takeaway/Example**: An SEO module observes page changes, while logging observes SEO—allowing addition or removal of modules without breaking others.
* **Link for More Details**: [Ask AI: Problems Solved by Observer](https://alisol.ir/?ai=Problems%20Solved%20by%20Observer%7CApplicable%20Programming%20%7CPHP%20Design%20patterns%20in%20Laminas%20(Zend))

## Singleton Pattern and Alternatives in Laminas
Singleton ensures a single object instance throughout the app, useful for resources like databases to avoid multiple connections. Laminas doesn't strictly use singletons; instead, it leverages the service manager with a 'shared' property (default true) to return existing service instances. This mimics singleton behavior but allows overriding to false for new instances.
* **Key Takeaway/Example**: In registry.php (deprecated), it stores and retrieves a single instance, but service manager handles sharing to avoid anti-pattern issues like mixing responsibilities.
* **Link for More Details**: [Ask AI: Singleton in Laminas](https://alisol.ir/?ai=Singleton%20in%20Laminas%7CApplicable%20Programming%20%7CPHP%20Design%20patterns%20in%20Laminas%20(Zend))

## Dependency Injection in Laminas
Dependency injection decouples objects by providing dependencies externally, rather than hardcoding them. In Laminas, setters like setResponse in MVC events inject typed dependencies (e.g., ResponseInterface), ensuring correct types for functionality. Constructors, like in Application, require injecting a ServiceManager upfront.
* **Key Takeaway/Example**: In a contact page needing a database, inject it via constructor instead of internal creation: public function __construct(Database $db) { $this->db = $db; }. This aids testing and swapping implementations.
* **Link for More Details**: [Ask AI: Dependency Injection in Laminas](https://alisol.ir/?ai=Dependency%20Injection%20in%20Laminas%7CApplicable%20Programming%20%7CPHP%20Design%20patterns%20in%20Laminas%20(Zend))

## Factory Pattern in Laminas
Factories create and configure objects, avoiding duplication in complex setups. Laminas uses factories extensively for services, like ApplicationFactory, which builds the app with dependencies. It often pairs with dependency injection, where the service manager calls factories to instantiate services.
* **Key Takeaway/Example**: In ExceptionStrategyFactory, it configures based on params (e.g., display exceptions true/false) and injects dependencies, choosing strategies dynamically.
* **Link for More Details**: [Ask AI: Factory Pattern in Laminas](https://alisol.ir/?ai=Factory%20Pattern%20in%20Laminas%7CApplicable%20Programming%20%7CPHP%20Design%20patterns%20in%20Laminas%20(Zend))

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
