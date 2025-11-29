# MASTER Angular in 90 Minutes with This Crash Course

* **Platform**: YouTube
* **Channel/Creator**: Code with Ahsan
* **Duration**: 01:29:10
* **Release Date**: Oct 7, 2024
* **Video Link**: [https://www.youtube.com/watch?v=oUmVFHlwZsI](https://www.youtube.com/watch?v=oUmVFHlwZsI)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=47fdb3b8 -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/MASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/MASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/MASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/MASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/MASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/MASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/MASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/MASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/MASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/MASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/MASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/MASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/MASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/MASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/MASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/MASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)
<!-- LH-BUTTONS:END -->

## Prerequisites & Tools You Need
* **Summary**: Before starting, make sure you’re comfortable with HTML, CSS, JavaScript/TypeScript basics (variables, functions, loops, conditionals), and Git. The tutorial uses VS Code, Node.js, Angular CLI, and the Angular Language Service extension.
* **Key Takeaway/Example**: Install Angular CLI globally with `npm install -g @angular/cli`. Check version with `ng version`.

[Ask AI: Angular CLI Installation](https://alisol.ir/?ai=Angular%20CLI%20Installation%7CCode%20with%20Ahsan%7CMASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)

## Why Choose Angular?
* **Summary**: Angular is a full-fledged framework (not just a library) built and used by Google. It powers real Google products, has a strong opinionated structure, built-in CLI, testing, HTTP client, forms, routing — everything you need for small-to-enterprise apps out of the box. It gives faster development speed, consistent code style across teams, and excellent code reusability via components/services.
* **Key Takeaway/Example**: Opinionated structure = easier onboarding when switching teams; CLI generates boilerplate instantly.

[Ask AI: Why Choose Angular](https://alisol.ir/?ai=Why%20Choose%20Angular%7CCode%20with%20Ahsan%7CMASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)

## Angular vs React – Quick Reality Check
* **Summary**: Angular is a complete framework with built-in solutions (HTTP, forms, routing, testing). React is a lightweight library — you add extras (axios, redux, react-router, form libraries) yourself. Angular’s opinionated approach leads to more consistent large-scale apps; React gives more flexibility but requires more decisions.
* **Key Takeaway**: No bashing — both are great, but Angular saves time on architecture decisions.

[Ask AI: Angular vs React Differences](https://alisol.ir/?ai=Angular%20vs%20React%20Differences%7CCode%20with%20Ahsan%7CMASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)

## Common Angular Myths Debunked
* **Summary**: 
  - “Hard to learn” → false, especially post-Angular 2.
  - “Major versions break everything” → false, migrations are smooth with `ng update`.
  - “Slow performance” → Angular 18 with signals & zoneless mode performs comparably to Vue/Preact.
  - “Huge bundle size” → fixed since AOT compilation; compiler no longer ships to browser.

[Ask AI: Angular Myths and Performance](https://alisol.ir/?ai=Angular%20Myths%20and%20Performance%7CCode%20with%20Ahsan%7CMASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)

## Creating Your First Angular App
* **Summary**: Run `ng new my-app` (or `ng new my-app --inline-template --inline-style` for learning). Serve with `ng serve` (or `npm start`). The CLI handles everything.
* **Key Takeaway/Example**: Use `ng generate component path/name` (or `ng gc`) to create components. Add `--dry-run` to preview without creating files.

[Ask AI: Angular CLI Project Creation](https://alisol.ir/?ai=Angular%20CLI%20Project%20Creation%7CCode%20with%20Ahsan%7CMASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)

## Project Structure Essentials
* **Summary**: Key files:
  - `index.html` → root component (`<app-root>`) is injected here.
  - `main.ts` → bootstraps the app.
  - `app.config.ts` → providers (HttpClient, routers, etc.).
  - `styles.scss` → global styles.
  - `app.component.ts` → root component.

[Ask AI: Angular Project Structure](https://alisol.ir/?ai=Angular%20Project%20Structure%7CCode%20with%20Ahsan%7CMASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)

## Components – The Building Blocks
* **Summary**: Everything visible is a component. Each has a `@Component` decorator with `selector`, `templateUrl`/`template`, `styleUrls`/`styles`. Styles are encapsulated by default (attributes added automatically to prevent leaks).
* **Key Takeaway/Example**:
```typescript
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `<h1>{{ title() }}</h1>`,
  styles: [`h1 { color: red; }`]
})
export class HeaderComponent {
  title = signal('My App');
}
```

[Ask AI: Angular Components](https://alisol.ir/?ai=Angular%20Components%7CCode%20with%20Ahsan%7CMASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)

## Data Binding with Signals (Modern Way)
* **Summary**: Use `signal()` for reactive state. Access with `title()` in templates. Signals are the future (Angular 16+), change detection is automatic and efficient.
* **Key Takeaway/Example**:
```html
<h1>{{ title() }}</h1>
```
```typescript
title = signal('Hello World');
```

[Ask AI: Angular Signals](https://alisol.ir/?ai=Angular%20Signals%7CCode%20with%20Ahsan%7CMASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)

## Inputs – Passing Data into Components
* **Summary**: Use the new `input()` function (signal-based). Mark as `required()` if mandatory.
* **Key Takeaway/Example**:
```typescript
message = input.required<string>();
```
```html
<app-greeting [message]="parentMessage()" />
```

[Ask AI: Angular Inputs Signals](https://alisol.ir/?ai=Angular%20Inputs%20Signals%7CCode%20with%20Ahsan%7CMASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)

## Event Binding & Outputs
* **Summary**: Bind events with `(click)="handler($event)"`. Emit custom events with `output()` and `EventEmitter`.
* **Key Takeaway/Example**:
```html
<button (click)="increment()">+</button>
<app-counter (counterChanged)="onCounterChanged($event)" />
```

[Ask AI: Angular Event Binding and Outputs](https://alisol.ir/?ai=Angular%20Event%20Binding%20and%20Outputs%7CCode%20with%20Ahsan%7CMASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)

## Signals in Action – Counter Component
* **Summary**: Use `signal()` for state, `set()` or `update()` to modify. No need for manual change detection.
* **Key Takeaway/Example**:
```typescript
count = signal(0);
increment() {
  this.count.update(v => v + 1);
}
```

[Ask AI: Angular Signals Counter Example](https://alisol.ir/?ai=Angular%20Signals%20Counter%20Example%7CCode%20with%20Ahsan%7CMASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)

## Routing & Lazy Loading
* **Summary**: Define routes in `app.routes.ts`. Use `router-outlet` as placeholder. `routerLink` prevents full reloads. Lazy load with `loadComponent`.
* **Key Takeaway/Example**:
```typescript
{
  path: 'todos',
  loadComponent: () => import('./todos/todos.component').then(m => m.TodosComponent)
}
```

[Ask AI: Angular Routing Lazy Loading](https://alisol.ir/?ai=Angular%20Routing%20Lazy%20Loading%7CCode%20with%20Ahsan%7CMASTER%20Angular%20in%20Crash%20Course)

## Services & Dependency Injection
* **Summary**: Services hold shared logic/data. Mark with `@Injectable({ providedIn: 'root' })`. Inject with `inject(Service)`.
* **Key Takeaway/Example**:
```typescript
@Injectable({ providedIn: 'root' })
export class TodoService { ... }

constructor() {
  this.todoService = inject(TodoService);
}
```

[Ask AI: Angular Services Dependency Injection](https://alisol.ir/?ai=Angular%20Services%20Dependency%20Injection%7CCode%20with%20Ahsan%7CMASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)

## HTTP Calls with HttpClient
* **Summary**: Add `provideHttpClient()` in `app.config.ts`. Use `http.get<T>()`. Returns Observable → subscribe or async pipe.
* **Key Takeaway/Example**:
```typescript
getTodos() {
  return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
}
```

[Ask AI: Angular HttpClient](https://alisol.ir/?ai=Angular%20HttpClient%7CCode%20with%20Ahsan%7CMASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)

## New Control Flow (@for, @if)
* **Summary**: Replace `*ngIf`/`*ngFor` with `@if` and `@for`. Better performance, tree-shakable, cleaner syntax. Use `trackBy` with unique ID.
* **Key Takeaway/Example**:
```html
@for (todo of todos(); track todo.id) { ... }
@if (todos().length === 0) { Loading... }
```

[Ask AI: Angular Control Flow](https://alisol.ir/?ai=Angular%20Control%20Flow%20@for%20@if%7CCode%20with%20Ahsan%7CMASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)

## Custom Directives
* **Summary**: Create with `ng generate directive`. Can read `ElementRef`, use `effect()` for side-effects (e.g., change styles when input changes).
* **Key Takeaway/Example**: Highlight completed to-dos with text-decoration and background.

[Ask AI: Angular Custom Directives](https://alisol.ir/?ai=Angular%20Custom%20Directives%7CCode%20with%20Ahsan%7CMASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)

## Pipes – Transform Data in Templates
* **Summary**: Built-in: `uppercase`, `lowercase`, `titlecase`, `date`, `currency`. Custom pipes implement `PipeTransform`.
* **Key Takeaway/Example**: Filter to-do list:
```typescript
transform(todos: Todo[], term: string): Todo[] {
  return term ? todos.filter(t => t.title.toLowerCase().includes(term.toLowerCase())) : todos;
}
```
Usage: `todo of todos() | filterTodos:searchTerm()`

[Ask AI: Angular Custom Pipes](https://alisol.ir/?ai=Angular%20Custom%20Pipes%7CCode%20with%20Ahsan%7CMASTER%20Angular%20in%2090%20Minutes%20with%20This%20Crash%20Course)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
