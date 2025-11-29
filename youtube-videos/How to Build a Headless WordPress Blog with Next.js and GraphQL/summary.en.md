# How to Build a Headless WordPress Blog with Next.js and GraphQL

- **Platform**: YouTube
- **Channel/Creator**: Raddy
- **Duration**: 02:02:00
- **Release Date**: Jan 2, 2025
- **Video Link**: [https://www.youtube.com/watch?v=jgLsu4T3hfY](https://www.youtube.com/watch?v=jgLsu4T3hfY)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=4ea0b5d0 -->

### AI-Powered buttons

Teach Me:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL)
<!-- LH-BUTTONS:END -->

## Project Overview and Initial Setup
Next.js 15 is used to build a blog frontend with WordPress as the headless CMS via GraphQL. The layout includes a header, footer, hero section, social icons, categories, search, latest posts with pagination, and individual post pages styled with Tailwind CSS.
- **Key Takeaway/Example**: Run `npx create-next-app@latest` to initialize the project with TypeScript, ESLint, Tailwind CSS, and App Router enabled. Configure global CSS for background image and fonts from Google Fonts.
- **Link for More Details**: [Ask AI: Next.js Project Setup](https://alisol.ir/?ai=Next.js%20Project%20Setup%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL)

## Building the Layout and Static Pages
The root layout wraps all pages with a consistent structure using HTML5 elements. Create header and footer components for navigation and copyright info. Add static pages like About and Contact by creating folders with `page.tsx` files.
- **Key Takeaway/Example**: In `layout.tsx`, wrap children in a div with `max-w-[780px] px-4 md:px-10 mx-auto bg-background min-h-screen`. For header, use flex for logo and nav links.
- **Link for More Details**: [Ask AI: Next.js Layout and Pages](https://alisol.ir/?ai=Next.js%20Layout%20and%20Pages%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL)

## Homepage Components: Hero and Social Icons
Build a hero section with text, bio, and optimized image using Next.js Image. Add social icons by mapping an array of links and SVGs for platforms like X, GitHub, and YouTube.
- **Key Takeaway/Example**: In `Hero.tsx`, use `<Image src="/hero.webp" width={700} height={1192} quality={70} loading="eager" />`. For social icons, map an array: `{ name: 'X', url: 'https://x.com/raddydev', image: '/x.svg', alt: 'Follow on X' }`.
- **Link for More Details**: [Ask AI: Next.js Components Hero Social](https://alisol.ir/?ai=Next.js%20Components%20Hero%20Social%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL)

## Setting Up WordPress with GraphQL
Use Cloudways to host a WordPress site. Install WPGraphQL plugin, enable debug mode, and import demo content. Test queries in GraphiQL IDE for categories and posts.
- **Key Takeaway/Example**: After activating WPGraphQL, access endpoint at `/graphql`. Query example: `query GetCategories { categories(first: 100) { nodes { id name slug } } }`.
- **Link for More Details**: [Ask AI: WordPress GraphQL Setup](https://alisol.ir/?ai=WordPress%20GraphQL%20Setup%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL)

## Querying and Displaying Categories
Set up environment variables for WordPress URL. Use `graphql-request` to fetch categories and display them as clickable links filtering posts.
- **Key Takeaway/Example**: In `queries.ts`, define `getCategories` with GraphQL client. In component: `categories.map(cat => <Link href={`/blog?category=${cat.slug}`}>{cat.name}</Link>)`.
- **Link for More Details**: [Ask AI: GraphQL Categories Query](https://alisol.ir/?ai=GraphQL%20Categories%20Query%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL)

## Implementing Search Functionality
Create a search bar component that submits to `/blog?search=term` using Next.js router. Handle form submission to prevent default and push URL params.
- **Key Takeaway/Example**: In `SearchBar.tsx`: `function handleSearch(event: React.FormEvent<HTMLFormElement>) { const searchInput = event.currentTarget.elements.namedItem('search') as HTMLInputElement; router.push(`/blog?search=${searchInput.value}`); }`.
- **Link for More Details**: [Ask AI: Next.js Search Bar](https://alisol.ir/?ai=Next.js%20Search%20Bar%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL)

## Fetching and Displaying Latest Posts with Pagination
Query posts with filters for search, category, and cursors for pagination. Display posts in a list with title, date, and excerpt. Add next/previous links using page info.
- **Key Takeaway/Example**: In `getAllPosts`, build dynamic `where` clause: `posts(first: $perPage, where: $whereCondition) { nodes { id title excerpt date slug categories { nodes { name slug } } } pageInfo { startCursor endCursor hasNextPage hasPreviousPage } }`. Use cursors for pagination links.
- **Link for More Details**: [Ask AI: GraphQL Posts Pagination](https://alisol.ir/?ai=GraphQL%20Posts%20Pagination%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL)

## Creating Individual Post Pages
Use dynamic routes `[slug]` to fetch single post by slug. Render title, date, author, content with custom styles. Handle not found cases.
- **Key Takeaway/Example**: In `[slug]/page.tsx`: `const post = await getPostBySlug(params.slug);` Render content: `<div className="article" dangerouslySetInnerHTML={{ __html: post?.content ?? '' }} />`. Style in `global.css`: `.article p { margin-bottom: 20px; }`.
- **Link for More Details**: [Ask AI: Next.js Dynamic Routes Posts](https://alisol.ir/?ai=Next.js%20Dynamic%20Routes%20Posts%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL)

## Adding Dynamic Metadata for SEO
Export `generateMetadata` function to set title, description, and open graph images based on post data.
- **Key Takeaway/Example**: `export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const post = await getPostBySlug((await params).slug); return { title: post?.title, openGraph: { images: '/opengraph.jpg' } }; }`.
- **Link for More Details**: [Ask AI: Next.js Metadata SEO](https://alisol.ir/?ai=Next.js%20Metadata%20SEO%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL)

## Building, Testing, and Fixes
Build the project with `npm run build` and run with `npm start`. Fix common errors like undefined types, escaping quotes, and unused variables. Test performance with Lighthouse.
- **Key Takeaway/Example**: Address build errors by typing variables in queries and escaping strings in JSX. Achieves 100% scores in Lighthouse for performance and SEO.
- **Link for More Details**: [Ask AI: Next.js Build Testing](https://alisol.ir/?ai=Next.js%20Build%20Testing%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20GraphQL)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
