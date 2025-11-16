[![CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
    
# LearnHub
> Learn and review tech topics efficiently using concise, high-quality summaries.

## Important disclaimer

This repository contains my personal notes and interpretations based on third-party resources
(such as online courses, YouTube videos, books, and mock interviews).

These summaries are:
- **Not official material**,
- **Not endorsed by the original creators**, and
- **Not intended to be a replacement** for the original courses, books, or videos.

All rights to the original source content remain with their respective creators. 

If you are the owner of a work and you are unhappy about the presence of a summary related to your material in this repository, 
please contact me at [alisolphp@gmail.com](mailto:alisolphp@gmail.com). 
I will review it and remove it if necessary as soon as possible.

## Why this repo exists

Are you tired of spending hours watching long videos or going through entire books just to extract the key ideas? 
LearnHub is a curated collection of concise, high-signal summaries for courses, YouTube videos, books, and mock interviews. 
It is designed to help you learn faster, review smarter (for example before interviews), and use your favourite programming language and natural language (English, Farsi, and more in the future) when drilling into details with an AI assistant.

## Repository structure at a glance

<!-- REPO_TOC_START -->
Auto-generated overview of the repository structure:

- [Courses (3)](#courses)
  - [Communication Skills (1)](#communication-skills)
  - [Serverless Technologies (1)](#serverless-technologies)
  - [Testing Methodologies (1)](#testing-methodologies)
- [Mock Interviews – System Design (29)](#mock-interviews--system-design)
  - [Authentication & Authorization (1)](#authentication-authorization)
  - [Code Collaboration Platforms (1)](#code-collaboration-platforms)
  - [Content Delivery Networks (1)](#content-delivery-networks)
  - [Distributed Systems (4)](#distributed-systems)
  - [E-commerce Platforms (1)](#e-commerce-platforms)
  - [File Storage & Sharing (1)](#file-storage-sharing)
  - [Financial Systems (2)](#financial-systems)
  - [Location-Based Services (2)](#location-based-services)
  - [Media Streaming (2)](#media-streaming)
  - [Messaging Systems (3)](#messaging-systems)
  - [Rate Limiting (1)](#rate-limiting)
  - [Search & Autocomplete (2)](#search-autocomplete)
  - [Social Media Platforms (4)](#social-media-platforms)
  - [Transportation & Logistics (1)](#transportation-logistics)
  - [Travel Platforms (1)](#travel-platforms)
  - [Utility Services (2)](#utility-services)
- [Books (7)](#books)
  - [Data-Intensive Applications (1)](#data-intensive-applications)
  - [Data Engineering (1)](#data-engineering)
  - [Distributed Systems Design (1)](#distributed-systems-design)
  - [Microservices Architecture (1)](#microservices-architecture)
  - [Site Reliability Engineering (1)](#site-reliability-engineering)
  - [System Design Interviews (2)](#system-design-interviews)
<!-- REPO_TOC_END -->

## How summaries are structured

Not all summaries follow the exact same template. There are two main structures in this repo:

### 1. Course summaries

Course summaries (files under `courses/.../summary.XX.md`) are optimized for fast review of a course and typically follow this shape:

- **Course overview & metadata**  
  - Platform, instructor, rating, release date  
  - Original course link
- **Before you get started**  
  - Short note on how to use the summary  
  - Any assumptions or prerequisites
- **Main content sections**  
  - 3–6 sections that roughly follow the course modules or chapters  
  - Focus on key ideas, mental models, and practical examples  
  - Optional “Ask AI” / “Deep dive” hints for using an AI assistant
- **Final recap / key takeaways**  
  - Short list of the most important ideas to remember
- **About the summarizer**  
  - Short bio + links (website, GitHub, LinkedIn, etc.)

The concrete structure may vary slightly from course to course, but the goal is always:
- easy to skim,
- easy to review later,
- and easy to extend with an AI assistant.

### 2. Mock interview & system design summaries

Mock interview and system design summaries (for example under `mock-interviews/system-design/.../summary.XX.md`) are more interview-oriented and usually follow this pattern:

- Video overview & metadata
- One-page executive summary
- 5-minute review flashcards (Q → A)
- Interview tags / categorization
- Problem understanding & use cases
- Requirements & constraints (functional + non-functional)
- High-level architecture (when applicable)
- Subsystem deep dives, trade-offs, and alternatives
- Reliability, availability, performance notes
- Security, observability, and known gaps (when relevant)
- Candidate questions & key takeaways
- Glossary and attribution

Other categories (for example books or miscellaneous resources) may reuse either of these structures or a simplified variant, as long as they stay:
- concise,
- predictable,
- and easy to consume with or without an AI assistant.

Most resources have summaries in multiple languages (for example `summary.en.md`, `summary.fa.md`). 
In the lists below, the main link usually points to the English version if it exists, and any other languages are shown as extra links.

## Repository structure

### Courses
<!-- COURSES_START -->
<h4 id="communication-skills">Communication Skills</h4>

- [Udemy English For Software Engineers Speak Like A Pro](courses%2Fudemy-english-for-software-engineers-speak-like-a-pro%2Fsummary.en.md) [ [En](courses%2Fudemy-english-for-software-engineers-speak-like-a-pro%2Fsummary.en.md) | [Fa](courses%2Fudemy-english-for-software-engineers-speak-like-a-pro%2Fsummary.fa.md) ]


<h4 id="serverless-technologies">Serverless Technologies</h4>

- [Linkedin Serverless Architecture](courses%2Flinkedin-serverless-architecture%2Fsummary.en.md) [ [En](courses%2Flinkedin-serverless-architecture%2Fsummary.en.md) | [Fa](courses%2Flinkedin-serverless-architecture%2Fsummary.fa.md) ]


<h4 id="testing-methodologies">Testing Methodologies</h4>

- [Coursera Introduction To Test And Behavior Driven Development](courses%2Fcoursera-introduction-to-test-and-behavior-driven-development%2Fsummary.en.md) [ [En](courses%2Fcoursera-introduction-to-test-and-behavior-driven-development%2Fsummary.en.md) | [Fa](courses%2Fcoursera-introduction-to-test-and-behavior-driven-development%2Fsummary.fa.md) ]
<!-- COURSES_END -->

### Mock Interviews – System Design
<!-- SYSTEM_DESIGN_START -->
<h4 id="authentication-authorization">Authentication &amp; Authorization</h4>

- [Design Authentication System | Design A Simple Authentication](mock-interviews%2Fsystem-design%2FDesign%20Authentication%20System%20%7C%20Design%20a%20Simple%20Authentication%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Authentication%20System%20%7C%20Design%20a%20Simple%20Authentication%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Authentication%20System%20%7C%20Design%20a%20Simple%20Authentication%2Fsummary.fa.md) ]


<h4 id="code-collaboration-platforms">Code Collaboration Platforms</h4>

- [Design Online Code Editor | With @CSDojo](mock-interviews%2Fsystem-design%2FDesign%20Online%20Code%20Editor%20%7C%20with%20%40CSDojo%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Online%20Code%20Editor%20%7C%20with%20%40CSDojo%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Online%20Code%20Editor%20%7C%20with%20%40CSDojo%2Fsummary.fa.md) ]


<h4 id="content-delivery-networks">Content Delivery Networks</h4>

- [Design Content Delivery Network | CDN](mock-interviews%2Fsystem-design%2FDesign%20Content%20Delivery%20Network%20%7C%20CDN%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Content%20Delivery%20Network%20%7C%20CDN%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Content%20Delivery%20Network%20%7C%20CDN%2Fsummary.fa.md) ]


<h4 id="distributed-systems">Distributed Systems</h4>

- [Design Distributed Cache](mock-interviews%2Fsystem-design%2FDesign%20Distributed%20Cache%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Distributed%20Cache%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Distributed%20Cache%2Fsummary.fa.md) ]

- [Design Distributed Job Scheduler | Systems Design Interview Questions With Ex Google SWE](mock-interviews%2Fsystem-design%2FDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE%2Fsummary.fa.md) ]

- [Design Distributed Key Value Store](mock-interviews%2Fsystem-design%2FDesign%20Distributed%20Key-Value%20Store%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Distributed%20Key-Value%20Store%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Distributed%20Key-Value%20Store%2Fsummary.fa.md) ]

- [Design Distributed Locking Service | With Ex Google SWE](mock-interviews%2Fsystem-design%2FDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE%2Fsummary.fa.md) ]


<h4 id="e-commerce-platforms">E-commerce Platforms</h4>

- [Design E Commerce Store Like Amazon | Flipkart](mock-interviews%2Fsystem-design%2FDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart%2Fsummary.fa.md) ]


<h4 id="file-storage-sharing">File Storage &amp; Sharing</h4>

- [Design File Sharing System Like Dropbox And Google Drive](mock-interviews%2Fsystem-design%2FDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive%2Fsummary.fa.md) ]


<h4 id="financial-systems">Financial Systems</h4>

- [Design A Digital Wallet (3+ Approaches) | Google Interview Question](mock-interviews%2Fsystem-design%2FDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%2Fsummary.fa.md) ]

- [Design Payment System](mock-interviews%2Fsystem-design%2FDesign%20Payment%20System%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Payment%20System%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Payment%20System%2Fsummary.fa.md) ]


<h4 id="location-based-services">Location-Based Services</h4>

- [Design Food Delivery App Like Doordash | Geo Hashing And WebSockets For Location Based Services](mock-interviews%2Fsystem-design%2FDesign%20Food%20Delivery%20App%20like%20Doordash%20%7C%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Food%20Delivery%20App%20like%20Doordash%20%7C%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Food%20Delivery%20App%20like%20Doordash%20%7C%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%2Fsummary.fa.md) ]

- [Design Google Maps System](mock-interviews%2Fsystem-design%2FDesign%20Google%20Maps%20System%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Google%20Maps%20System%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Google%20Maps%20System%2Fsummary.fa.md) ]


<h4 id="media-streaming">Media Streaming</h4>

- [Design Netflix System](mock-interviews%2Fsystem-design%2FDesign%20Netflix%20System%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Netflix%20System%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Netflix%20System%2Fsummary.fa.md) ]

- [Design Spotify | Ex Google EM | Google System Design Interview](mock-interviews%2Fsystem-design%2FDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview%2Fsummary.fa.md) ]


<h4 id="messaging-systems">Messaging Systems</h4>

- [Design Distributed Message Queue Like Kafka](mock-interviews%2Fsystem-design%2FDesign%20Distributed%20Message%20Queue%20like%20Kafka%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Distributed%20Message%20Queue%20like%20Kafka%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Distributed%20Message%20Queue%20like%20Kafka%2Fsummary.fa.md) ]

- [Design Notification Service System | Handle Billions Of Users & Notifications](mock-interviews%2Fsystem-design%2FDesign%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Notification%20Service%20System%20%7C%20Handle%20Billions%20of%20users%20%26%20Notifications%2Fsummary.fa.md) ]

- [Design WhatsApp | Chat Messaging Systems](mock-interviews%2Fsystem-design%2FDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems%2Fsummary.fa.md) ]


<h4 id="rate-limiting">Rate Limiting</h4>

- [Design Rate Limiter | Token Bucket, Leaky Bucket, Sliding Logs](mock-interviews%2Fsystem-design%2FDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%2Fsummary.fa.md) ]


<h4 id="search-autocomplete">Search &amp; Autocomplete</h4>

- [Design Autocomplete For Search Engines | Typeahead Suggestions For Google Search](mock-interviews%2Fsystem-design%2FDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search%2Fsummary.fa.md) ]

- [Design Google Search | How Google Searches One Document Among Billions Of Documents Quickly](mock-interviews%2Fsystem-design%2FDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%2Fsummary.fa.md) ]


<h4 id="social-media-platforms">Social Media Platforms</h4>

- [Design Facebook | Design Instagram](mock-interviews%2Fsystem-design%2FDesign%20Facebook%20%7C%20Design%20Instagram%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Facebook%20%7C%20Design%20Instagram%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Facebook%20%7C%20Design%20Instagram%2Fsummary.fa.md) ]

- [Design Instagram](mock-interviews%2Fsystem-design%2FDesign%20Instagram%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Instagram%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Instagram%2Fsummary.fa.md) ]

- [Design TikTok | Ft. Google TPM](mock-interviews%2Fsystem-design%2FDesign%20TikTok%20%7C%20ft.%20Google%20TPM%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20TikTok%20%7C%20ft.%20Google%20TPM%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20TikTok%20%7C%20ft.%20Google%20TPM%2Fsummary.fa.md) ]

- [Design Twitter | X.com](mock-interviews%2Fsystem-design%2FDesign%20Twitter%20%7C%20x.com%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Twitter%20%7C%20x.com%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Twitter%20%7C%20x.com%2Fsummary.fa.md) ]


<h4 id="transportation-logistics">Transportation &amp; Logistics</h4>

- [Design Uber | OLA | Amazon System Design Interview](mock-interviews%2Fsystem-design%2FDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview%2Fsummary.fa.md) ]


<h4 id="travel-platforms">Travel Platforms</h4>

- [Design Flight Booking System | Airline Reservation System | Distributed Transactions, Serialisation, Linearisation, Consistency](mock-interviews%2Fsystem-design%2FDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency%2Fsummary.fa.md) ]


<h4 id="utility-services">Utility Services</h4>

- [Design Parking Garage | Vending Machine | Amazon System Design Interview](mock-interviews%2Fsystem-design%2FDesign%20Parking%20Garage%20%7C%20Vending%20Machine%20%7C%20Amazon%20System%20Design%20Interview%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Parking%20Garage%20%7C%20Vending%20Machine%20%7C%20Amazon%20System%20Design%20Interview%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Parking%20Garage%20%7C%20Vending%20Machine%20%7C%20Amazon%20System%20Design%20Interview%2Fsummary.fa.md) ]

- [Design Text Storage Service Like Pastebin](mock-interviews%2Fsystem-design%2FDesign%20Text%20Storage%20Service%20like%20Pastebin%2Fsummary.en.md) [ [En](mock-interviews%2Fsystem-design%2FDesign%20Text%20Storage%20Service%20like%20Pastebin%2Fsummary.en.md) | [Fa](mock-interviews%2Fsystem-design%2FDesign%20Text%20Storage%20Service%20like%20Pastebin%2Fsummary.fa.md) ]
<!-- SYSTEM_DESIGN_END -->

### Books
<!-- BOOKS_START -->
<h4 id="data-intensive-applications">Data-Intensive Applications</h4>

- [Designing Data Intensive Applications (DDIA)](books%2FDesigning%20Data-Intensive%20Applications%20%28DDIA%29%2Fsummary.en.md) [ [En](books%2FDesigning%20Data-Intensive%20Applications%20%28DDIA%29%2Fsummary.en.md) | [Fa](books%2FDesigning%20Data-Intensive%20Applications%20%28DDIA%29%2Fsummary.fa.md) ]


<h4 id="data-engineering">Data Engineering</h4>

- [Fundamentals Of Data Engineering](books%2FFundamentals%20of%20Data%20Engineering%2Fsummary.en.md) [ [En](books%2FFundamentals%20of%20Data%20Engineering%2Fsummary.en.md) | [Fa](books%2FFundamentals%20of%20Data%20Engineering%2Fsummary.fa.md) ]


<h4 id="distributed-systems-design">Distributed Systems Design</h4>

- [Designing Distributed Systems](books%2FDesigning%20Distributed%20Systems%2Fsummary.en.md) [ [En](books%2FDesigning%20Distributed%20Systems%2Fsummary.en.md) | [Fa](books%2FDesigning%20Distributed%20Systems%2Fsummary.fa.md) ]


<h4 id="microservices-architecture">Microservices Architecture</h4>

- [Building Microservices](books%2FBuilding%20Microservices%2Fsummary.en.md) [ [En](books%2FBuilding%20Microservices%2Fsummary.en.md) | [Fa](books%2FBuilding%20Microservices%2Fsummary.fa.md) ]


<h4 id="site-reliability-engineering">Site Reliability Engineering</h4>

- [Google SRE   Site Reliability Engineering Book](books%2FGoogle%20SRE%20-%20Site%20reliability%20engineering%20book%2Fsummary.en.md) [ [En](books%2FGoogle%20SRE%20-%20Site%20reliability%20engineering%20book%2Fsummary.en.md) | [Fa](books%2FGoogle%20SRE%20-%20Site%20reliability%20engineering%20book%2Fsummary.fa.md) ]


<h4 id="system-design-interviews">System Design Interviews</h4>

- [System Design Interview (Volume 1)](books%2FSystem%20Design%20Interview%20%28Volume%201%29%2Fsummary.en.md) [ [En](books%2FSystem%20Design%20Interview%20%28Volume%201%29%2Fsummary.en.md) | [Fa](books%2FSystem%20Design%20Interview%20%28Volume%201%29%2Fsummary.fa.md) ]

- [System Design Interview (Volume 2)](books%2FSystem%20Design%20Interview%20%28Volume%202%29%2Fsummary.en.md) [ [En](books%2FSystem%20Design%20Interview%20%28Volume%202%29%2Fsummary.en.md) | [Fa](books%2FSystem%20Design%20Interview%20%28Volume%202%29%2Fsummary.fa.md) ]
<!-- BOOKS_END -->

### Other Categories
<!-- OTHER_START -->

<!-- OTHER_END -->

## Using this repo with AI

You can combine these summaries with an AI assistant to:

- Ask follow-up questions about any section of a summary.
- Turn flashcards into interactive Q&A practice.
- Translate explanations to your preferred natural language.
- See examples in the programming language you are most comfortable with.
- Simulate interview-style discussions using the mock interview summaries.

A simple workflow is:

1. Open a `summary.*.md` file for the topic you are studying.
2. Highlight the part you care about.
3. Use your AI assistant (for example via an “Ask AI” button) to go deeper, ask “why?”, or request code examples.

## Contributing

Contributions are welcome!

- Add new resources under a suitable folder (for example `courses/`, `mock-interviews/`, `books/`, or other logical categories).
- For each resource, create one or more `summary.XX.md` files (for example `summary.en.md`, `summary.fa.md`).
- Keep the summary structure consistent so that learners know what to expect.
- Run the README generator script to update the lists between the markers.
- Keep the lists sorted alphabetically by title to make browsing easier.

## License

All `summary.*.md` files in this repository are licensed under the
**Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)** license.

This applies only to my original summaries and notes in this repository.
All rights to the original source content (courses, books, videos, etc.)
remain with their respective creators.

See the [LICENSE](./LICENSE) file for details.

This project is completely free to use for personal learning and educational purposes. 
These summaries are my personal notes and interpretations. 
They are not official material and are not intended to be a replacement for the original courses, books, or videos.

All rights to the original source content remain with their respective creators. 
If you are the owner of a work and you are unhappy about the presence of a summary related to your material in this repository, 
please contact me at [alisolphp@gmail.com](mailto:alisolphp@gmail.com). 
I will review it and remove it if necessary as soon as possible.