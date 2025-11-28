# Modern web development with headless Drupal

* **Platform**: YouTube
* **Channel/Creator**: Stanford WebCamp
* **Duration**: 00:49:16
* **Release Date**: May 14, 2025
* **Video Link**: [https://www.youtube.com/watch?v=okycKKNhH_0](https://www.youtube.com/watch?v=okycKKNhH_0)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=005796ea -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Modern%20web%20development%20with%20headless%20Drupal) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Modern%20web%20development%20with%20headless%20Drupal) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Modern%20web%20development%20with%20headless%20Drupal) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Modern%20web%20development%20with%20headless%20Drupal) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Modern%20web%20development%20with%20headless%20Drupal) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Modern%20web%20development%20with%20headless%20Drupal) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Modern%20web%20development%20with%20headless%20Drupal) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Modern%20web%20development%20with%20headless%20Drupal) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Modern%20web%20development%20with%20headless%20Drupal) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Modern%20web%20development%20with%20headless%20Drupal)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Modern%20web%20development%20with%20headless%20Drupal) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Modern%20web%20development%20with%20headless%20Drupal) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Modern%20web%20development%20with%20headless%20Drupal)
<!-- LH-BUTTONS:END -->

## Introduction and Speaker Background
Alexi Gorbatov, Director of Engineering at Jakala (formerly FFW and Pro People), shares his experience with Drupal and non-Drupal ecosystems. He's worked on Stanford projects like GSB in 2012-2013 and aims to showcase modern front-end tools alongside headless Drupal for developers interested in cool demos and integrations.
* **Key Takeaway/Example**: Highlights his ties to Stanford, including photos from the Knight Management Center and favorite spots like Jimmy V's Cafe.
* **Link for More Details**: [Ask AI: Introduction and Speaker Background](https://alisol.ir/?ai=Introduction%20and%20Speaker%20Background%7CStanford%20WebCamp%7CModern%20web%20development%20with%20headless%20Drupal)

## Evolution of Modern Web Development
ReactJS was open-sourced around 2013-2014, Drupal 8 launched in 2015, and frameworks like Next.js and Gatsby emerged in 2015-2016. By 2020, the Mach Alliance promoted composable CMSs. AI tools like GitHub Copilot (2021) and ChatGPT exploded, leading to editors with built-in AI. Today, we see Drupal Starters for no-code users, Shadcn UI as an AI-compatible library, and an era of "personal software" where non-developers "vibe code" front-ends but need back-end integration. Drupal excels in some areas over API-first CMSs like Contentful.
* **Key Takeaway/Example**: Android's switch to Rust reduced memory vulnerabilities from over 200 to under 100 in four years, illustrating modern safety focuses.
* **Link for More Details**: [Ask AI: Evolution of Modern Web Development](https://alisol.ir/?ai=Evolution%20of%20Modern%20Web%20Development%7CStanford%20WebCamp%7CModern%20web%20development%20with%20headless%20Drupal)

## Contentful Demo: Headless CMS Experience
Using Contentful as a North Star, the demo shows a SaaS headless CMS focused on content editing, previewing, publishing, and front-end integration. Live preview in a side-by-side editor with a Next.js app allows instant feedback on changes like editing headlines or cloning paragraphs. Metadata hooks enable direct editing from the front-end view.
* **Key Takeaway/Example**: Changes like renaming "Alchemist Vault" to "Stanford WebCamp Vault" update instantly in preview without full saves, thanks to autosave APIs and hot reloading.
* **Link for More Details**: [Ask AI: Contentful Demo Headless CMS Experience](https://alisol.ir/?ai=Contentful%20Demo%20Headless%20CMS%20Experience%7CStanford%20WebCamp%7CModern%20web%20development%20with%20headless%20Drupal)

## Key Principles for Developer Experience
Good DX requires instant feedback loops (like hot reloading in React/Next.js), composable components with locality of behavior (no scattered pre-process functions), and readiness for "vibe coding" (AI-assisted coding without heavy validation). It should also be AI-ready to catch hallucinations via tools like squiggly lines in editors.
* **Key Takeaway/Example**: Components should self-describe their behavior, making it easy to glance at code and understand functionality.
* **Link for More Details**: [Ask AI: Key Principles for Developer Experience](https://alisol.ir/?ai=Key%20Principles%20for%20Developer%20Experience%7CStanford%20WebCamp%7CModern%20web%20development%20with%20headless%20Drupal)

## Headless CMS Recipe: Front-End Implementation
A headless setup needs a front-end handling routing (URLs and actions), data fetching (from CMS like Drupal), rendering (instant or delayed), and preview (unpublished content views). Start with a Next.js app via create-next-app or starter kits, in a monorepo for managing multiple apps.
* **Key Takeaway/Example**: You must build the front-end app first to enable previews, as asked in the Q&A.
* **Link for More Details**: [Ask AI: Headless CMS Recipe Front-End Implementation](https://alisol.ir/?ai=Headless%20CMS%20Recipe%20Front-End%20Implementation%7CStanford%20WebCamp%7CModern%20web%20development%20with%20headless%20Drupal)

## Creating and Routing in Next.js App
Use AI tools like Cursor editor to generate pages by prompting for structure and components. File-based routing creates routes by placing page.tsx files in folders. For dynamic CMS routing, use catch-all routes to query Drupal for paths like /article/123, returning 404 if not found.
* **Key Takeaway/Example**: AI generated a "Stanford WebCamp" page using existing components like Hero and Duplex, with TypeScript ensuring type safety.
```tsx
// Example dynamic route
export default async function Page({ params }: { params: { slug: string[] } }) {
  const path = '/' + params.slug.join('/');
  const page = await getPage(path);
  if (!page) return <NotFound />;
  return <RenderPage page={page} />;
}
```
* **Link for More Details**: [Ask AI: Creating and Routing in Next.js App](https://alisol.ir/?ai=Creating%20and%20Routing%20in%20Next.js%20App%7CStanford%20WebCamp%7CModern%20web%20development%20with%20headless%20Drupal)

## Data Fetching with GraphQL in Drupal
Use Drupal's GraphQL module and GraphQL Compose for optimized queries. GraphQL allows fetching exactly needed data in one shot, with introspection for autocomplete. Query by path to get entities like nodes, drilling into fields like title, body, or components.
* **Key Takeaway/Example**: For a homepage, fetch title and components like a hero paragraph with headline and description.
```graphql
query Route($path: String!, $langcode: String) {
  route(path: $path, langcode: $langcode) {
    ... on RouteInternal {
      entity {
        ... on NodePage {
          title
          components {
            ...HeroFragment
          }
        }
      }
    }
  }
}
```
* **Link for More Details**: [Ask AI: Data Fetching with GraphQL in Drupal](https://alisol.ir/?ai=Data%20Fetching%20with%20GraphQL%20in%20Drupal%7CStanford%20WebCamp%7CModern%20web%20development%20with%20headless%20Drupal)

## Component Fragments and Tools
Fragments define reusable data shapes for components, hoisted into top-level queries for collocated fetching. Tools like gql.tada provide TypeScript inference to catch errors like missing fields in real-time.
* **Key Takeaway/Example**: A hero fragment might include headline and description; hovering shows types, and removing a field triggers errors.
```graphql
fragment HeroFragment on ParagraphHero {
  headline
  description
}
```
* **Link for More Details**: [Ask AI: Component Fragments and Tools](https://alisol.ir/?ai=Component%20Fragments%20and%20Tools%7CStanford%20WebCamp%7CModern%20web%20development%20with%20headless%20Drupal)

## Rendering Strategies in React/Next.js
React evolved from client-side (2014) to server-side rendering (SSR with Next.js), static site generation (SSG with Gatsby), incremental static regeneration (ISR), and partial pre-rendering. Use ISR to cache pages without hitting Drupal every time.
* **Key Takeaway/Example**: Set revalidate to 120 seconds for a page to stay static until expired or invalidated.
* **Link for More Details**: [Ask AI: Rendering Strategies in React/Next.js](https://alisol.ir/?ai=Rendering%20Strategies%20in%20React/Next.js%7CStanford%20WebCamp%7CModern%20web%20development%20with%20headless%20Drupal)

## Caching and Revalidation
ISR caches pages for set times (e.g., 60 seconds), but on-demand revalidation via APIs like revalidatePath or tags invalidates stale content immediately after CMS saves.
* **Key Takeaway/Example**: After editing in Drupal, hit a revalidation endpoint to refresh the front-end without waiting.
* **Link for More Details**: [Ask AI: Caching and Revalidation](https://alisol.ir/?ai=Caching%20and%20Revalidation%7CStanford%20WebCamp%7CModern%20web%20development%20with%20headless%20Drupal)

## Preview Capabilities
Enable side-by-side previews for unpublished edits, using modules like Next Drupal for offscreen editors and no-cache previews that bypass ISR.
* **Key Takeaway/Example**: Edit in Drupal, preview instantly on the front-end without publishing, similar to Contentful's setup.
* **Link for More Details**: [Ask AI: Preview Capabilities](https://alisol.ir/?ai=Preview%20Capabilities%7CStanford%20WebCamp%7CModern%20web%20development%20with%20headless%20Drupal)

## Recap and Recommendations
GraphQL + TypeScript is ideal for AI-proof workflows. Decoupled doesn't mean poor editorial experience. React supports server rendering like PHP. Follow Shadcn (UI library), Jesus Manuel Olivas (Drupal Starter Kit), Brian Perry and John Albin (Next.js module), and projects like Decoupled Drupal and Next CMS.
* **Key Takeaway/Example**: Demo from Florida Drupal Camp shows a working setup; Jesus's starter kit spins up Tugboat instances for testing.
* **Link for More Details**: [Ask AI: Recap and Recommendations](https://alisol.ir/?ai=Recap%20and%20Recommendations%7CStanford%20WebCamp%7CModern%20web%20development%20with%20headless%20Drupal)

## Q&A on CMS Convergence and Drupal's Future
Monolithic CMSs add decoupled features and vice versa, converging into "universal CMSs." Drupal can compete well with its mature editorial tools, but needs better core API stability for headless use. Experience Builder adds React components, positioning Drupal strongly in composable ecosystems.
* **Key Takeaway/Example**: Mock vendors guarantee stable APIs, unlike Drupal, but contrib like GraphQL Compose helps.
* **Link for More Details**: [Ask AI: Q&A on CMS Convergence and Drupal's Future](https://alisol.ir/?ai=Q%26A%20on%20CMS%20Convergence%20and%20Drupal's%20Future%7CStanford%20WebCamp%7CModern%20web%20development%20with%20headless%20Drupal)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
