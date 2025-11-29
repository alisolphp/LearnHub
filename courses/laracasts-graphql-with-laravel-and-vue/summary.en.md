# Course Summary: GraphQL with Laravel and Vue

* **Platform**: Laracasts
* **Instructor**: Andre Madarang
* **Level**: Advanced
* **Duration**: 02:56:00
* **Update Date**: January 2022
* **Course Link**: https://laracasts.com/series/graphql-with-laravel-and-vue

*This document summarizes the key points from the course. I highly recommend watching the full course if you have the opportunity.*

## Before You Get Started
- I summarize key points from useful courses to learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=31acc7b2 -->

### AI-Powered buttons

Start teaching this to a:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Story](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=courses/laracasts-graphql-with-laravel-and-vue)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=courses/laracasts-graphql-with-laravel-and-vue)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=courses/laracasts-graphql-with-laravel-and-vue)
<!-- LH-BUTTONS:END -->

## Topic 1: Introduction to GraphQL

* **Summary**: This opening episode dives into what GraphQL is all about, positioning it as a modern alternative to REST APIs. It covers the basics of making queries to fetch exactly the data you need, using real-world examples from public APIs like GitHub, weather services, and movie databases. You'll see how GraphQL's single endpoint and intuitive syntax make it easier to work with compared to multiple REST endpoints.
* **Example**: Querying GitHub for a user's repositories with fields like name and URL, then expanding to include followers or bio—all in one request, demonstrating how GraphQL avoids over-fetching data.
* **Link for More Details**: [Ask AI: Introduction to GraphQL](https://alisol.ir/?ai=Introduction%20to%20GraphQL%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue)

## Topic 2: Lighthouse Queries for Posts

* **Summary**: Here, we set up a Laravel app with the Lighthouse package to handle GraphQL on the backend. It walks through creating models, relationships, and a schema file to define types like User and Post. Directives simplify pulling data, and GraphQL Playground helps test queries for fetching posts with pagination and sorting.
* **Example**: Defining a Post type with fields like title and body, adding a @belongsTo directive for the user relationship, and querying all posts sorted by creation date using @paginate and @orderBy.
* **Link for More Details**: [Ask AI: Lighthouse Queries for Posts](https://alisol.ir/?ai=Lighthouse%20Queries%20for%20Posts%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue)

## Topic 3: Lighthouse Mutations for Posts

* **Summary**: Building on queries, this part focuses on writing data with mutations for creating, updating, and deleting posts. Directives like @create, @update, and @delete make it straightforward, plus adding validation rules to ensure inputs like title and body meet requirements.
* **Example**: A createPost mutation that takes title and body, uses @create and @rules for validation (e.g., required and min:3), and returns the new post's ID and details.
* **Link for More Details**: [Ask AI: Lighthouse Mutations for Posts](https://alisol.ir/?ai=Lighthouse%20Mutations%20for%20Posts%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue)

## Topic 4: Lighthouse Resolvers

* **Summary**: When built-in directives aren't enough, resolvers let you add custom logic to queries and mutations. The episode shows generating resolvers and using them for things like custom sorting or extra actions during data operations.
* **Example**: Creating a resolver for a posts query that fetches and sorts posts by latest, or for createPost to log an event like sending an email after saving the post.
* **Link for More Details**: [Ask AI: Lighthouse Resolvers](https://alisol.ir/?ai=Lighthouse%20Resolvers%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue)

## Topic 5: Simple AJAX Requests to GraphQL

* **Summary**: Shifting to the client side, this explains how GraphQL is just a POST request under the hood. Using Vue, you can make requests with fetch or Axios to send queries and mutations, handling the JSON payload for the GraphQL endpoint.
* **Example**: In a Vue component, using fetch to POST a query for posts to /graphql, parsing the response, and displaying titles in a list—perfect for simple integrations without full libraries.
* **Link for More Details**: [Ask AI: Simple AJAX Requests to GraphQL](https://alisol.ir/?ai=Simple%20AJAX%20Requests%20to%20GraphQL%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue)

## Topic 6: GraphQL Requests from Laravel

* **Summary**: If you're calling GraphQL from another Laravel app, use the built-in HTTP client. It covers sending queries as JSON and processing responses, great for server-to-server communication.
* **Example**: `HTTP::post('/graphql', ['query' => '{ posts { title } }'])->json()` to fetch and display post titles in a Blade view.
* **Link for More Details**: [Ask AI: GraphQL Requests from Laravel](https://alisol.ir/?ai=GraphQL%20Requests%20from%20Laravel%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue)

## Topic 7: Authentication in Lighthouse

* **Summary**: Secure your GraphQL API with Sanctum for token-based auth. Set up mutations for login, logout, and registration, using directives like @guard to protect queries and inject user IDs automatically.
* **Example**: A login mutation that validates credentials, generates a token with `$user->createToken()`, and returns it for use in headers.
* **Link for More Details**: [Ask AI: Authentication in Lighthouse](https://alisol.ir/?ai=Authentication%20in%20Lighthouse%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue)

## Topic 8: Authentication in Vue Apollo

* **Summary**: On the Vue side, handle auth by storing tokens in localStorage after login mutations and including them in request headers. Covers login, registration, and logout flows manually since Vue Apollo v4 requires it.
* **Example**: After a successful login mutation, `localStorage.setItem('apollo-token', data.login.token)` and redirect, then use a getHeaders function to add Authorization: Bearer in ApolloClient setup.
* **Link for More Details**: [Ask AI: Authentication in Vue Apollo](https://alisol.ir/?ai=Authentication%20in%20Vue%20Apollo%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue)

## Topic 9: Authorization on the Server

* **Summary**: Ensure users can only perform allowed actions using @can directives tied to Laravel policies. This protects updates, deletes, and admin queries, injecting logged-in user details where needed.
* **Example**: In updatePost mutation, `@can(ability: "update", find: "id")` checks if `$user->id` matches `$post->user_id` in the policy.
* **Link for More Details**: [Ask AI: Authorization on the Server](https://alisol.ir/?ai=Authorization%20on%20the%20Server%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue)

## Topic 10: Authorization Links on the Client

* **Summary**: Hide or show UI elements like update links based on auth status, and redirect unauthorized users from pages. Use queries to fetch user details and compare IDs for permissions.
* **Example**: `v-if="post.user.id === me.id"` on an update link, and watcher to redirect if !me.isAdmin on admin page.
* **Link for More Details**: [Ask AI: Authorization Links on the Client](https://alisol.ir/?ai=Authorization%20Links%20on%20the%20Client%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue)

---

**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
