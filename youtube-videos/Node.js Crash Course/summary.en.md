# Node.js Crash Course

* **Platform**: YouTube
* **Channel/Creator**: Traversy Media
* **Duration**: 02:06:36
* **Release Date**: Apr 23, 2024
* **Video Link**: [https://www.youtube.com/watch?v=32M1al-Y6Ag](https://www.youtube.com/watch?v=32M1al-Y6Ag)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=31acc7b2 -->

### AI-Powered buttons

Start teaching this to a:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Node.js%20Crash%20Course) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Node.js%20Crash%20Course) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Node.js%20Crash%20Course) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Node.js%20Crash%20Course) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Node.js%20Crash%20Course) | 
[Story](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Node.js%20Crash%20Course) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Node.js%20Crash%20Course) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Node.js%20Crash%20Course) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Node.js%20Crash%20Course) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Node.js%20Crash%20Course) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Node.js%20Crash%20Course) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Node.js%20Crash%20Course)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Node.js%20Crash%20Course) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Node.js%20Crash%20Course) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Node.js%20Crash%20Course)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Node.js%20Crash%20Course)
<!-- LH-BUTTONS:END -->

## What is Node.js?
Node.js is a JavaScript runtime built on Chrome’s V8 engine that lets you run JavaScript outside the browser — on your computer or on a server. It’s not a framework or a language, just an environment that gives JavaScript access to the file system, network, and other OS features.

Used mainly for server-side apps, APIs, microservices, real-time apps (chat, games), CLI tools, scraping, etc. Huge companies (Netflix, Uber, LinkedIn) and startups love it because it’s fast, scalable, and shares the same language (JavaScript) across front-end and back-end.

[Ask AI: What is Node.js](https://alisol.ir/?ai=What%20is%20Node.js%7CTraversy%20Media%7CNode.js%20Crash%20Course)

## How Node.js Works (Event Loop & Non-Blocking I/O)
Node.js is single-threaded but non-blocking. Instead of waiting for I/O (file reads, DB queries, network requests), it hands the task to the system kernel and keeps running. When the operation finishes, a callback is pushed to the event queue, and the event loop picks it up.

This architecture makes Node extremely efficient for I/O-heavy workloads and capable of handling thousands of concurrent connections with very little overhead.

[Ask AI: Node.js Event Loop](https://alisol.ir/?ai=Node.js%20Event%20Loop%7CTraversy%20Media%7CNode.js%20Crash%20Course)

## Installation & First Steps
Download the LTS version from nodejs.org → run the installer → you’re done.  
Check with:
```bash
node --version
npm --version
```

Node comes with a REPL (just type `node` in terminal) — great for quick experiments.

[Ask AI: Installing Node.js](https://alisol.ir/?ai=Installing%20Node.js%7CTraversy%20Media%7CNode.js%20Crash%20Course)

## Project Setup & package.json
```bash
mkdir my-project && cd my-project
npm init -y          # creates package.json
```
Main fields you’ll touch:
- `"type": "module"` → enables ES modules (import/export syntax)
- `"scripts"` → custom commands (`"start": "node server.js"`)

[Ask AI: package.json in Node.js](https://alisol.ir/?ai=package.json%20in%20Node.js%7CTraversy%20Media%7CNode.js%20Crash%20Course)

## Modules – CommonJS vs ESM
CommonJS (default, older):
```js
// math.js
module.exports = { add, subtract };

// index.js
const { add } = require('./math');
```

ESM (modern, recommended):
```js
// math.js
export const add = (a, b) => a + b;

// index.js
import { add } from './math.js';
```
Just add `"type": "module"` in package.json to use ESM.

[Ask AI: ES Modules vs CommonJS](https://alisol.ir/?ai=ES%20Modules%20vs%20CommonJS%7CTraversy%20Media%7CNode.js%20Crash%20Course)

## Creating a Basic HTTP Server (Core http Module)
```js
import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Hello World</h1>');
});

server.listen(8000, () => console.log('Server running on http://localhost:8000'));
```

Key objects:
- `req` → url, method, headers
- `res` → setHeader(), writeHead(), write(), end()

[Ask AI: Node.js http createServer](https://alisol.ir/?ai=Node.js%20http%20createServer%7CTraversy%20Media%7CNode.js%20Crash%20Course)

## Routing & Serving Static Files
Manually check `req.url` and `req.method`:
```js
if (req.url === '/' && req.method === 'GET') {
  // serve index.html
}
```

Serving a real HTML file:
```js
import fs from 'fs/promises';

const data = await fs.readFile(`./public${req.url === '/' ? '/index.html' : req.url}`);
res.setHeader('Content-Type', 'text/html');
res.end(data);
```

[Ask AI: Serving static files with Node.js](https://alisol.ir/?ai=Serving%20static%20files%20with%20Node.js%7CTraversy%20Media%7CNode.js%20Crash%20Course)

## Building a Simple REST API (Vanilla Node.js)
Example handlers:
```js
if (req.url === '/api/users' && req.method === 'GET') {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}
```

Getting a single resource with regex:
```js
const match = req.url.match(/^\/api\/users\/(\d+)$/);
if (match && req.method === 'GET') { ... }
```

Creating a resource (POST):
```js
let body = '';
req.on('data', chunk => body += chunk.toString());
req.on('end', () => {
  const newUser = JSON.parse(body);
  users.push({ ...newUser, id: users.length + 1 });
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(newUser));
});
```

[Ask AI: Build REST API with vanilla Node.js](https://alisol.ir/?ai=Build%20REST%20API%20with%20vanilla%20Node.js%7CTraversy%20Media%7CNode.js%20Crash%20Course)

## Middleware Pattern
```js
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const jsonMiddleware = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
};

server.on('request', (req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      // routing logic here
    });
  });
});
```

[Ask AI: Middleware in vanilla Node.js](https://alisol.ir/?ai=Middleware%20in%20vanilla%20Node.js%7CTraversy%20Media%7CNode.js%20Crash%20Course)

## Nodemon & Environment Variables
```bash
npm i -D nodemon
```

package.json script:
```json
"scripts": {
  "start": "nodemon server.js",
  "dev": "node --env-file=.env server.js"
}
```

[Ask AI: Nodemon and .env files](https://alisol.ir/?ai=Nodemon%20and%20.env%20files%7CTraversy%20Media%7CNode.js%20Crash%20Course)

## Core Modules Quick Overview

### fs (File System)
```js
import fs from 'fs/promises';

await fs.writeFile('test.txt', 'Hello');      // overwrites
await fs.appendFile('test.txt', '\nWorld');   // appends
const data = await fs.readFile('test.txt', 'utf8');
```

### path
```js
import path from 'path';

path.basename('/users/ali/file.txt')  // → 'file.txt'
path.extname('/users/ali/file.txt')   → '.txt'
path.join(__dirname, 'public', 'index.html')
```

### os
```js
import os from 'os';

os.totalmem()   → bytes
os.freemem()
os.cpus()       → array of core info
```

### url
```js
import { URL } from 'url';

const myUrl = new URL('https://example.com:8000/path?name=ali#section');
myUrl.searchParams.get('name') → 'ali'
```

### crypto (hashing example)
```js
import { createHash } from 'crypto';

const hash = createHash('sha256')
  .update('password123')
  .digest('hex');
```

### events
```js
import { EventEmitter } from 'events';

const emitter = new EventEmitter();

emitter.on('greet', (name) => console.log(`Hello ${name}`));
emitter.emit('greet', 'Ali');
```

### process
```js
process.env.PORT
process.argv     → command-line arguments
process.cwd()    → current working directory
process.exit(0)  → exit with success
```

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
