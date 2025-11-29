# How to use AWS Dynamo DB

* **Platform**: YouTube
* **Channel/Creator**: Mafia Codes
* **Duration**: 00:28:54
* **Release Date**: Mar 6, 2023
* **Video Link**: [https://www.youtube.com/watch?v=V3oFH5e9Cf8](https://www.youtube.com/watch?v=V3oFH5e9Cf8)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/How%20to%20use%20AWS%20Dynamo%20DB) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/How%20to%20use%20AWS%20Dynamo%20DB) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/How%20to%20use%20AWS%20Dynamo%20DB) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/How%20to%20use%20AWS%20Dynamo%20DB) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/How%20to%20use%20AWS%20Dynamo%20DB) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/How%20to%20use%20AWS%20Dynamo%20DB) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/How%20to%20use%20AWS%20Dynamo%20DB) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/How%20to%20use%20AWS%20Dynamo%20DB) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/How%20to%20use%20AWS%20Dynamo%20DB) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/How%20to%20use%20AWS%20Dynamo%20DB) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/How%20to%20use%20AWS%20Dynamo%20DB) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/How%20to%20use%20AWS%20Dynamo%20DB)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/How%20to%20use%20AWS%20Dynamo%20DB) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/How%20to%20use%20AWS%20Dynamo%20DB) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/How%20to%20use%20AWS%20Dynamo%20DB) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/How%20to%20use%20AWS%20Dynamo%20DB) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/How%20to%20use%20AWS%20Dynamo%20DB)
<!-- LH-BUTTONS:END -->

## Introduction to DynamoDB and Project Setup
Rust handles memory safety by... Wait, no—focusing on DynamoDB: The video dives straight into hands-on CRUD operations with Amazon DynamoDB using Node.js. Start by setting up a basic Node project with `npm init -y` and install `nodemon` for auto-restarts.

**Summary**: Create an empty Node project and prepare to interact with DynamoDB without building a full REST API—just functions for CRUD.

**Key Takeaway/Example**: Use `npm run dev` to start the app with nodemon watching for changes.

**Link for More Details**: [Ask AI: DynamoDB Project Setup](https://alisol.ir/?ai=DynamoDB%20Project%20Setup%7CMafia%20Codes%7CHow%20to%20use%20AWS%20Dynamo%20DB)

## Creating an IAM User for DynamoDB Access
To work with DynamoDB, set up a user in AWS IAM for secure access.

**Summary**: In the AWS console, navigate to IAM, add a new user (e.g., "tutorial user"), skip console access, and attach the "AmazonDynamoDBFullAccess" policy.

**Key Takeaway/Example**: This user gets full DynamoDB permissions—avoid over-permissioning in production.

**Link for More Details**: [Ask AI: IAM User for DynamoDB](https://alisol.ir/?ai=IAM%20User%20for%20DynamoDB%7CMafia%20Codes%7CHow%20to%20use%20AWS%20Dynamo%20DB)

## Generating Access Keys
After creating the IAM user, generate credentials to authenticate your app.

**Summary**: In the user's security credentials, create an access key, note the access key ID and secret access key—these are used in your code.

**Key Takeaway/Example**: Copy them immediately; they're shown only once. Delete unused keys for security.

**Link for More Details**: [Ask AI: Generating AWS Access Keys](https://alisol.ir/?ai=Generating%20AWS%20Access%20Keys%7CMafia%20Codes%7CHow%20to%20use%20AWS%20Dynamo%20DB)

## Creating a DynamoDB Table
Head to the DynamoDB console to set up your database table.

**Summary**: Create a table (e.g., "product"), define a partition key (e.g., "id" as string), and leave sort key optional. The table becomes active quickly.

**Key Takeaway/Example**: Partition key acts like a primary key in SQL—must be unique.

**Link for More Details**: [Ask AI: Creating DynamoDB Table](https://alisol.ir/?ai=Creating%20DynamoDB%20Table%7CMafia%20Codes%7CHow%20to%20use%20AWS%20Dynamo%20DB)

## Manually Adding Items to the Table
For testing, add data directly in the console.

**Summary**: In "Explore table items," create an item with the partition key and additional attributes like "name" (string) and "price" (number).

**Key Takeaway/Example**: DynamoDB supports flexible schemas—add attributes like color or price without predefined structure.

**Link for More Details**: [Ask AI: Adding Items to DynamoDB](https://alisol.ir/?ai=Adding%20Items%20to%20DynamoDB%7CMafia%20Codes%7CHow%20to%20use%20AWS%20Dynamo%20DB)

## Installing Node.js Dependencies
Back in code, add packages to interact with DynamoDB.

**Summary**: Install `@aws-sdk/client-dynamodb`, `@aws-sdk/lib-dynamodb`, and `cuid` for unique IDs.

**Key Takeaway/Example**: `lib-dynamodb` simplifies object translation to DynamoDB format—no manual type specifications needed.

**Link for More Details**: [Ask AI: DynamoDB Node.js Dependencies](https://alisol.ir/?ai=DynamoDB%20Node.js%20Dependencies%7CMafia%20Codes%7CHow%20to%20use%20AWS%20Dynamo%20DB)

## Setting Up the DynamoDB Client
Configure the client in a separate file for reusability.

**Summary**: In `dynamodb-client.js`, create a DynamoDB client with region (e.g., "us-east-1"), credentials, and marshal options from `lib-dynamodb`. Export the document client.

**Key Takeaway/Example**:
```javascript
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

const dbClient = new DynamoDBClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'YOUR_ACCESS_KEY',
    secretAccessKey: 'YOUR_SECRET_KEY'
  }
});

const marshalOptions = { convertEmptyValues: true, removeUndefinedValues: false };
const unmarshalOptions = { wrapNumbers: false };
const translateConfig = { marshalOptions, unmarshalOptions };

const documentClient = DynamoDBDocumentClient.from(dbClient, translateConfig);
module.exports = documentClient;
```

**Link for More Details**: [Ask AI: DynamoDB Client Setup](https://alisol.ir/?ai=DynamoDB%20Client%20Setup%7CMafia%20Codes%7CHow%20to%20use%20AWS%20Dynamo%20DB)

## Listing All Items (Scan Operation)
Fetch all items from the table.

**Summary**: Use `ScanCommand` with the table name to retrieve everything. Log `response.items` for the data array.

**Key Takeaway/Example**:
```javascript
const { ScanCommand } = require('@aws-sdk/lib-dynamodb');
const documentClient = require('./dynamodb-client');
const TABLE_NAME = 'product';

async function getAllProducts() {
  const response = await documentClient.send(new ScanCommand({ TableName: TABLE_NAME }));
  console.log(response.items);
}
```

**Link for More Details**: [Ask AI: Scan Operation in DynamoDB](https://alisol.ir/?ai=Scan%20Operation%20in%20DynamoDB%7CMafia%20Codes%7CHow%20to%20use%20AWS%20Dynamo%20DB)

## Adding an Item (Put Operation)
Insert a new item into the table.

**Summary**: Use `PutCommand` with table name and item object (including unique ID via `cuid`).

**Key Takeaway/Example**:
```javascript
const { PutCommand } = require('@aws-sdk/lib-dynamodb');
const cuid = require('cuid');

async function addProduct(product) {
  product.id = cuid();
  const response = await documentClient.send(new PutCommand({ TableName: TABLE_NAME, Item: product }));
  console.log(response);
}
```

**Link for More Details**: [Ask AI: Put Operation in DynamoDB](https://alisol.ir/?ai=Put%20Operation%20in%20DynamoDB%7CMafia%20Codes%7CHow%20to%20use%20AWS%20Dynamo%20DB)

## Deleting an Item (Delete Operation)
Remove an item by its key.

**Summary**: Use `DeleteCommand` with table name and key (e.g., { id: 'some-id' }).

**Key Takeaway/Example**:
```javascript
const { DeleteCommand } = require('@aws-sdk/lib-dynamodb');

async function deleteProductById(id) {
  const response = await documentClient.send(new DeleteCommand({ TableName: TABLE_NAME, Key: { id } }));
  console.log(response);
}
```

**Link for More Details**: [Ask AI: Delete Operation in DynamoDB](https://alisol.ir/?ai=Delete%20Operation%20in%20DynamoDB%7CMafia%20Codes%7CHow%20to%20use%20AWS%20Dynamo%20DB)

## Getting an Item by ID (Get Operation)
Retrieve a single item.

**Summary**: Use `GetCommand` with table name and key. Log `response.Item`.

**Key Takeaway/Example**:
```javascript
const { GetCommand } = require('@aws-sdk/lib-dynamodb');

async function getProductById(id) {
  const response = await documentClient.send(new GetCommand({ TableName: TABLE_NAME, Key: { id } }));
  console.log(response.Item);
}
```

**Link for More Details**: [Ask AI: Get Operation in DynamoDB](https://alisol.ir/?ai=Get%20Operation%20in%20DynamoDB%7CMafia%20Codes%7CHow%20to%20use%20AWS%20Dynamo%20DB)

## Updating an Item (Update Operation)
Modify specific attributes without overwriting the entire item.

**Summary**: Use `UpdateCommand` with key, update expression (e.g., "set price = :p"), and attribute values. Better than full overwrite with Put for partial updates.

**Key Takeaway/Example**:
```javascript
const { UpdateCommand } = require('@aws-sdk/lib-dynamodb');

async function updateProductById(product) {
  const price = 699; // Example update
  const response = await documentClient.send(new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { id: product.id },
    UpdateExpression: 'set price = :p',
    ExpressionAttributeValues: { ':p': price }
  }));
  console.log(response);
}
```

**Link for More Details**: [Ask AI: Update Operation in DynamoDB](https://alisol.ir/?ai=Update%20Operation%20in%20DynamoDB%7CMafia%20Codes%7CHow%20to%20use%20AWS%20Dynamo%20DB)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
