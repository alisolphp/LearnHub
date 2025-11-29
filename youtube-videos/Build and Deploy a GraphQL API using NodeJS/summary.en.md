# Build and Deploy a GraphQL API using NodeJS 

* **Platform**: YouTube
* **Channel/Creator**: notJust․dev 
* **Duration**: 03:40:26
* **Release Date**: Feb 17, 2024
* **Video Link**: [https://www.youtube.com/watch?v=UYQSVH6B1k4](https://www.youtube.com/watch?v=UYQSVH6B1k4)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=31acc7b2 -->

### AI-Powered buttons

Start teaching this to a:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Build%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Build%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Build%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Build%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Build%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS) | 
[Story](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Build%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Build%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Build%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Build%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Build%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Build%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Build%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Build%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Build%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Build%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Build%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS)
<!-- LH-BUTTONS:END -->

## Introduction to GraphQL and Tutorial Overview
* **Summary**: The video focuses on building a GraphQL API from scratch using Node.js, emphasizing server-side fundamentals. It contrasts with client-side consumption and previous tutorials using StepZen for quick setups. The goal is to understand the underlying mechanics by creating a DIY API with Node.js, GraphQL HTTP, and MongoDB, then deploying to AWS EC2.
* **Key Takeaway/Example**: GraphQL allows defining data shapes and querying specific fields, avoiding over-fetching like in REST APIs. For complex data, one GraphQL query can fetch related info (e.g., player, teams, matches) versus multiple REST endpoints.
* **Link for More Details**: [Ask AI: GraphQL Fundamentals](https://alisol.ir/?ai=GraphQL%20Fundamentals%7CnotJust%E2%80%A4dev%7CBuild%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS%20)

## GraphQL Theory Basics
* **Summary**: GraphQL describes data via types and uses resolvers to fetch it. Benefits include predictable results and single queries for nested data, unlike REST's multiple endpoints.
* **Key Takeaway/Example**: Types define fields (e.g., Query with hello: String), resolvers are functions returning data (e.g., () => 'Hello World').
* **Link for More Details**: [Ask AI: GraphQL Types and Resolvers](https://alisol.ir/?ai=GraphQL%20Types%20and%20Resolvers%7CnotJust%E2%80%A4dev%7CBuild%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS%20)

## Setting Up the Node.js Project and Basic Schema
* **Summary**: Initialize a Node.js project, install GraphQL, and build a simple schema with a query returning hardcoded data.
* **Key Takeaway/Example**: Use `buildSchema` for type definitions and root resolvers.
```graphql
const schema = buildSchema(`
  type Query {
    hello: String
    age: Int
  }
`);
const root = { hello: () => 'Hello world!', age: () => 25 };
```
* **Link for More Details**: [Ask AI: Basic GraphQL Schema Setup](https://alisol.ir/?ai=Basic%20GraphQL%20Schema%20Setup%7CnotJust%E2%80%A4dev%7CBuild%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS%20)

## Serving GraphQL over HTTP with Express
* **Summary**: Transform the script into an HTTP server using Express and graphql-http, mounting the endpoint at /graphql.
* **Key Takeaway/Example**: Nodemon for auto-restarts; query via URL or tools.
```js
const app = express();
app.use('/graphql', createHandler({ schema }));
app.listen(4000);
```
* **Link for More Details**: [Ask AI: Express GraphQL Server](https://alisol.ir/?ai=Express%20GraphQL%20Server%7CnotJust%E2%80%A4dev%7CBuild%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS%20)

## Using Ruru for API Exploration
* **Summary**: Install and integrate Ruru (a GraphiQL variant) for visual querying and schema docs.
* **Key Takeaway/Example**: Mount at root: `app.get('/', ruruHTML({ endpoint: '/graphql' }));` Use for named queries, variables, and schema refresh.
* **Link for More Details**: [Ask AI: Ruru GraphQL Interface](https://alisol.ir/?ai=Ruru%20GraphQL%20Interface%7CnotJust%E2%80%A4dev%7CBuild%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS%20)

## Basic Types, Lists, and Nullability
* **Summary**: Cover scalar types (String, Int, Float, Boolean, ID), lists (arrays), and making fields non-nullable with !.
* **Key Takeaway/Example**: Required array of required strings: `[String!]!`. Null values trigger errors if non-nullable.
* **Link for More Details**: [Ask AI: GraphQL Basic Types](https://alisol.ir/?ai=GraphQL%20Basic%20Types%7CnotJust%E2%80%A4dev%7CBuild%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS%20)

## Arguments and Variables
* **Summary**: Fields can take arguments; use variables for reusability.
* **Key Takeaway/Example**: Define arg in schema: `hello(name: String!): String`. Resolver: `({ name }) => \`Hello \${name}\``. Query with vars: `query Hello($name: String!) { hello(name: $name) }`.
* **Link for More Details**: [Ask AI: GraphQL Arguments](https://alisol.ir/?ai=GraphQL%20Arguments%7CnotJust%E2%80%A4dev%7CBuild%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS%20)

## Custom Object Types
* **Summary**: Define custom types for complex data, nesting them for relationships.
* **Key Takeaway/Example**: `type User { id: Int, name: String }`. Query: `user: User`. Resolver returns object.
* **Link for More Details**: [Ask AI: Custom Object Types](https://alisol.ir/?ai=Custom%20Object%20Types%7CnotJust%E2%80%A4dev%7CBuild%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS%20)

## Switching to GraphQL Yoga
* **Summary**: Move to Yoga for modular schema with resolvers per field.
* **Key Takeaway/Example**: Use `createSchema` with typeDefs and resolvers object.
```js
const typeDefs = gql`type Query { hello: String }`;
const resolvers = { Query: { hello: () => 'Hello' } };
```
* **Link for More Details**: [Ask AI: GraphQL Yoga Setup](https://alisol.ir/?ai=GraphQL%20Yoga%20Setup%7CnotJust%E2%80%A4dev%7CBuild%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS%20)

## Mutations and Input Types
* **Summary**: Mutations for writes; inputs group args.
* **Key Takeaway/Example**: `input NewUserInput { name: String! } mutation createUser(user: NewUserInput!): User`.
* **Link for More Details**: [Ask AI: GraphQL Mutations](https://alisol.ir/?ai=GraphQL%20Mutations%7CnotJust%E2%80%A4dev%7CBuild%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS%20)

## MongoDB Integration with Atlas
* **Summary**: Set up MongoDB Atlas, connect via driver, provide DB context to resolvers.
* **Key Takeaway/Example**: Export collections in setup; access in resolvers: `const { users } = context;`.
```js
const client = new MongoClient(uri);
const db = client.db('sample_mflix');
```
* **Link for More Details**: [Ask AI: MongoDB with GraphQL](https://alisol.ir/?ai=MongoDB%20with%20GraphQL%7CnotJust%E2%80%A4dev%7CBuild%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS%20)

## CRUD Operations for Users
* **Summary**: Implement read (list/single), create, update, delete for users using MongoDB queries.
* **Key Takeaway/Example**: Create: `users.insertOne(userInput)`. Update: `users.updateOne({ _id: new ObjectId(id) }, { $set: update })`.
* **Link for More Details**: [Ask AI: User CRUD in GraphQL](https://alisol.ir/?ai=User%20CRUD%20in%20GraphQL%7CnotJust%E2%80%A4dev%7CBuild%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS%20)

## Model Relationships
* **Summary**: Connect models (e.g., comments to users) via resolvers fetching related data.
* **Key Takeaway/Example**: In Comment resolver: `user: (obj, _, { users }) => users.findOne({ email: obj.email })`.
* **Link for More Details**: [Ask AI: GraphQL Relationships](https://alisol.ir/?ai=GraphQL%20Relationships%7CnotJust%E2%80%A4dev%7CBuild%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS%20)

## Deployment Overview
* **Summary**: Deploy to AWS EC2; use PM2 for process management. Refer to prior tutorial for steps.
* **Key Takeaway/Example**: Run `pm2 start server.js` on EC2 instance.
* **Link for More Details**: [Ask AI: Deploying GraphQL to EC2](https://alisol.ir/?ai=Deploying%20GraphQL%20to%20EC2%7CnotJust%E2%80%A4dev%7CBuild%20and%20Deploy%20a%20GraphQL%20API%20using%20NodeJS%20)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
