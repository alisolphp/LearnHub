# MongoDB Tutorial in 1 Hour (2024)

* **Platform**: YouTube
* **Channel/Creator**: CodeWithHarry
* **Duration**: 01:22:57
* **Release Date**: May 10, 2023
* **Video Link**: [Watch on YouTube](https://www.youtube.com/watch?v=J6mDkcqU_ZE)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b47981dc -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/MongoDB%20Tutorial%20in%201%20Hour%20(2024)) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/MongoDB%20Tutorial%20in%201%20Hour%20(2024)) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/MongoDB%20Tutorial%20in%201%20Hour%20(2024)) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer) 

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/MongoDB%20Tutorial%20in%201%20Hour%20(2024)) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/MongoDB%20Tutorial%20in%201%20Hour%20(2024)) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/MongoDB%20Tutorial%20in%201%20Hour%20(2024)) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/MongoDB%20Tutorial%20in%201%20Hour%20(2024)) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/MongoDB%20Tutorial%20in%201%20Hour%20(2024)) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/MongoDB%20Tutorial%20in%201%20Hour%20(2024)) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/MongoDB%20Tutorial%20in%201%20Hour%20(2024))

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/MongoDB%20Tutorial%20in%201%20Hour%20(2024)) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/MongoDB%20Tutorial%20in%201%20Hour%20(2024)) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/MongoDB%20Tutorial%20in%201%20Hour%20(2024))
<!-- LH-BUTTONS:END -->

## What is MongoDB?
MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like BSON documents. Unlike traditional SQL databases with rigid tables and rows, MongoDB uses databases → collections → documents. This schema-less design means every document in a collection can have completely different fields — perfect when your data structure evolves over time.

Key advantage: incredible scalability and flexibility for modern apps.

[Ask AI: MongoDB vs SQL databases](https://alisol.ir/?ai=MongoDB%20vs%20SQL%20databases%7CCodeWithHarry%7CMongoDB%20Tutorial%20in%201%20Hour%20%282024%29)

## Installing MongoDB Community Server Locally
Download the Community Server from the official MongoDB website → Products → Community Server → choose your OS.

- Mac: either manual download or `brew tap mongodb/brew` → `brew install mongodb-community`
- Windows: run the .msi installer, select “Install MongoDB as a Service” so it runs in the background.

After installation, run `mongod` (the daemon) to start the server. By default it looks for data in `/data/db` (create it if missing) or specify with `--dbpath /your/path`.

MongoDB Compass (GUI) installs automatically on Windows and can be downloaded separately on Mac.

[Ask AI: MongoDB local installation](https://alisol.ir/?ai=MongoDB%20local%20installation%7CCodeWithHarry%7CMongoDB%20Tutorial%20in%201%20Hour%20%282024%29)

## MongoDB Compass – The GUI Tool
Compass is a free GUI that lets you visually explore, query, and manage your data.

- Connect to `mongodb://localhost:27017`
- Create databases/collections
- Insert documents manually
- See instantly how MongoDB is schema-flexible (one document can have fields another doesn’t)

Great for beginners and debugging.

[Ask AI: MongoDB Compass tutorial](https://alisol.ir/?ai=MongoDB%20Compass%20tutorial%7CCodeWithHarry%7CMongoDB%20Tutorial%20in%201%20Hour%20%282024%29)

## Core Concepts – Databases, Collections, Documents
| SQL             | MongoDB            |
|-----------------|--------------------|
| Database        | Database           |
| Table           | Collection        |
| Row             | Document (BSON)    |

Documents look like JSON:
```json
{
  "_id": ObjectId("..."),
  "name": "Harry",
  "role": "Instructor",
  "location": "Delhi"
}
```
No enforced schema → add or remove fields anytime.

[Ask AI: MongoDB core concepts](https://alisol.ir/?ai=MongoDB%20core%20concepts%7CCodeWithHarry%7CMongoDB%20Tutorial%20in%201%20Hour%20%282024%29)

## CRUD Operations in Mongo Shell
Start the shell with `mongosh` (or `mongo` in older versions).

```js
show dbs                    // list databases
use employees               // switch/create DB (created on first insert)

db.managers.insertOne({ name: "Rohan", role: "Programmer" })
db.managers.insertMany([ …array of objects… ])

db.managers.find()          // all documents
db.managers.find().pretty() // formatted output
db.managers.find({ role: "Programmer" }) // filter

db.inventory.updateOne(
  { item: "paper" },
  { $set: { "size.uom": "cm", status: "P" } }
)

db.inventory.deleteMany({ status: "D" })
```

[Ask AI: MongoDB CRUD operations](https://alisol.ir/?ai=MongoDB%20CRUD%20operations%7CCodeWithHarry%7CMongoDB%20Tutorial%20in%201%20Hour%20%282024%29)

## Sorting, Limiting, Skipping & Pagination
```js
db.collection.find().sort({ qty: -1 })     // descending (-1), ascending (1)
db.collection.find().limit(10)            // only 10 docs
db.collection.find().skip(10)             // skip first 10

// Pagination example (page 2, 10 items per page)
db.posts.find()
        .skip((pageNumber - 1) * 10)
        .limit(10)
        .sort({ createdAt: -1 })
```

[Ask AI: MongoDB pagination and sorting](https://alisol.ir/?ai=MongoDB%20pagination%20and%20sorting%7CCodeWithHarry%7CMongoDB%20Tutorial%20in%201%20Hour%20%282024%29)

## MongoDB Atlas – Cloud Database
Atlas is the official managed cloud service (free tier available forever).

1. Sign up at mongodb.com/cloud/atlas
2. Create a shared cluster (M0 free)
3. Choose provider/region (closest to your users)
4. Create database user (username + strong password)
5. Whitelist your IP or allow access from anywhere (0.0.0.0/0 for testing)
6. Get connection string → replace `<password>` → connect with Compass or driver

Perfect for production — no server maintenance, auto-scaling, backups.

[Ask AI: MongoDB Atlas setup](https://alisol.ir/?ai=MongoDB%20Atlas%20setup%7CCodeWithHarry%7CMongoDB%20Tutorial%20in%201%20Hour%20%282024%29)

## Query Operators
Powerful operators make complex queries easy:

```js
db.inventory.find({ qty: { $lt: 30 } })           // less than
db.inventory.find({ qty: { $gt: 50 } })           // greater than
db.inventory.find({ qty: { $lte: 30 } })          // less than or equal
db.inventory.find({ status: { $in: ["A", "P"] } }) // in array
db.inventory.find({ status: { $nin: ["D"] } })    // not in
```

[Ask AI: MongoDB query operators](https://alisol.ir/?ai=MongoDB%20query%20operators%7CCodeWithHarry%7CMongoDB%20Tutorial%20in%201%20Hour%20%282024%29)

## Aggregation Pipeline
Process data in stages — extremely powerful for analytics.

Example: total quantity per pizza size “Medium”:

```js
db.orders.aggregate([
  { $match: { size: "medium" } },
  {
    $group: {
      _id: "$name",                     // group by pizza name
      totalQuantity: { $sum: "$quantity" }
    }
  },
  { $sort: { totalQuantity: -1 } }
])
```

Stages run sequentially, each stage receives the output of the previous one.

[Ask AI: MongoDB aggregation pipeline](https://alisol.ir/?ai=MongoDB%20aggregation%20pipeline%7CCodeWithHarry%7CMongoDB%20Tutorial%20in%201%20Hour%20%282024%29)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
