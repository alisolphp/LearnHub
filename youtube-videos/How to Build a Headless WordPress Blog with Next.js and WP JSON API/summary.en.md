# How to Build a Headless WordPress Blog with Next.js and WP JSON API

* **Platform**: YouTube
* **Channel/Creator**: Raddy
* **Duration**: 02:10:25
* **Release Date**: Nov 20, 2024
* **Video Link**: [https://www.youtube.com/watch?v=eetWoCVT9tc](https://www.youtube.com/watch?v=eetWoCVT9tc)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=4ea0b5d0 -->

### AI-Powered buttons

Teach Me:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/How%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API)
<!-- LH-BUTTONS:END -->

## Project Overview and Setup
* **Summary**: The video covers building a basic blog using Next.js 15 as the frontend and WordPress as the backend CMS, fetching data via the WP JSON API. It includes a header, hero section, social links, categories, latest posts, search bar, pagination, about/contact pages, and a sitemap.
* **Key Takeaway/Example**: Start by installing Next.js with `npx create-next-app@latest`, then configure fonts like Inter from Google Fonts and set up a background image in globals.css for the layout.
* **Link for More Details**: [Ask AI: Project Overview and Setup](https://alisol.ir/?ai=Project%20Overview%20and%20Setup%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API)

## Building Header and Footer Components
* **Summary**: Create reusable header and footer components with navigation links and basic styling using Tailwind CSS.
* **Key Takeaway/Example**: In Header.tsx, use flexbox for layout with links to home, blog, about, and contact. For Footer.tsx, add a centered copyright notice and sitemap link.
```tsx
// Header.tsx example
import Link from 'next/link';

export function Header() {
  return (
    <header className="flex justify-between mb-[66px] items-center">
      <div className="font-bold text-2xl">
        <Link href="/">Light</Link>
      </div>
      <nav>
        <ul className="flex gap-4">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
```
* **Link for More Details**: [Ask AI: Building Header and Footer Components](https://alisol.ir/?ai=Building%20Header%20and%20Footer%20Components%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API)

## Creating Static Pages
* **Summary**: Set up simple pages like about, contact, and 404 with basic content and Tailwind styling.
* **Key Takeaway/Example**: For about.tsx, use headings, paragraphs, and lists. Handle 404 with a centered error message and back-to-home button.
```tsx
// 404 example in not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <h1 className="text-6xl font-bold text-amber-500">404</h1>
      <p className="mt-4 text-2xl text-gray-800">Oops! Page not found</p>
      <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
      <Link href="/" className="mt-6 px-4 py-2 bg-amber-700 text-white rounded hover:bg-amber-800 transition">Go back home</Link>
    </div>
  );
}
```
* **Link for More Details**: [Ask AI: Creating Static Pages](https://alisol.ir/?ai=Creating%20Static%20Pages%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API)

## Hero and Social Icons Sections
* **Summary**: Add a hero section with intro text and image, plus social icons linking to profiles.
* **Key Takeaway/Example**: Use Next.js Image for optimization in Hero.tsx. For social icons, map an array of links with SVGs.
```tsx
// SocialIcons.tsx example
import Image from 'next/image';
import Link from 'next/link';

const socials = [
  { name: 'X', url: 'https://x.com/raddy_dev', image: '/x.svg', alt: 'Follow Raddy on X' },
  // Add more
];

export function SocialIcons() {
  return (
    <div className="flex justify-between mb-4">
      <h2 className="text-lg">Social Media</h2>
      <div className="flex gap-2">
        {socials.map((item) => (
          <Link key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="border p-1 rounded-md hover:scale-110 transition duration-300">
            <Image src={item.image} alt={item.alt} width={20} height={20} loading="eager" />
          </Link>
        ))}
      </div>
    </div>
  );
}
```
* **Link for More Details**: [Ask AI: Hero and Social Icons Sections](https://alisol.ir/?ai=Hero%20and%20Social%20Icons%20Sections%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API)

## Setting Up WordPress Backend
* **Summary**: Use a managed hosting like Cloudways to set up WordPress, import demo content, and add categories/posts.
* **Key Takeaway/Example**: After setup, access WP JSON API at /wp-json/wp/v2/posts or /categories. Import XML demo data and assign categories manually.
* **Link for More Details**: [Ask AI: Setting Up WordPress Backend](https://alisol.ir/?ai=Setting%20Up%20WordPress%20Backend%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API)

## Fetching and Displaying Categories
* **Summary**: Query WP API for categories and display them as links.
* **Key Takeaway/Example**: Define types and use fetch in queries.ts.
```tsx
// queries.ts example
const baseUrl = process.env.WORDPRESS_URL;

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${baseUrl}/wp-json/wp/v2/categories`);
  const data = await response.json();
  return data;
}
```
* **Link for More Details**: [Ask AI: Fetching and Displaying Categories](https://alisol.ir/?ai=Fetching%20and%20Displaying%20Categories%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API)

## Displaying Latest Posts and Search
* **Summary**: Fetch posts with parameters like per_page, page, search, and categories. Add a search bar that navigates to /blog with query params.
* **Key Takeaway/Example**: Use dangerouslySetInnerHTML for rendered content. Handle no posts case.
```tsx
// SearchBar.tsx example (client component)
'use client';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const router = useRouter();

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const searchInput = event.currentTarget.elements.namedItem('search') as HTMLInputElement;
    router.push(`/blog?search=${searchInput.value}`);
  }

  return (
    <form onSubmit={handleSearch}>
      <input type="text" name="search" placeholder="Search" className="border rounded-md py-1 px-2 text-sm" />
    </form>
  );
}
```
* **Link for More Details**: [Ask AI: Displaying Latest Posts and Search](https://alisol.ir/?ai=Displaying%20Latest%20Posts%20and%20Search%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API)

## Blog Page with Pagination
* **Summary**: Reuse latest posts component on /blog, handling pagination via WP headers and query params.
* **Key Takeaway/Example**: Extract currentPage, searchTerm, categories from searchParams. Use X-WP-TotalPages header for total pages.
* **Link for More Details**: [Ask AI: Blog Page with Pagination](https://alisol.ir/?ai=Blog%20Page%20with%20Pagination%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API)

## Single Post Page
* **Summary**: Fetch post by slug, resolve author and categories via additional queries, and render content with custom styles.
* **Key Takeaway/Example**: Style rendered HTML in globals.css under .article selector. Format dates and use dangerouslySetInnerHTML.
```css
/* globals.css example */
.article h1 { font-size: 2rem; font-weight: bold; margin-bottom: 1rem; }
/* Add more selectors */
```
* **Link for More Details**: [Ask AI: Single Post Page](https://alisol.ir/?ai=Single%20Post%20Page%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API)

## Generating Sitemap and Metadata
* **Summary**: Create dynamic sitemap.xml with static pages and all posts. Add metadata for SEO on single posts.
* **Key Takeaway/Example**: Loop through paginated posts in sitemap.ts. Use generateMetadata for title, description, and OG images.
```tsx
// sitemap.ts example
import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Logic to fetch and map URLs
}
```
* **Link for More Details**: [Ask AI: Generating Sitemap and Metadata](https://alisol.ir/?ai=Generating%20Sitemap%20and%20Metadata%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API)

## Adding Page Transitions
* **Summary**: Use template.tsx for route animations with Tailwind keyframes.
* **Key Takeaway/Example**: Define fadeIn animation in tailwind.config.ts and apply to children wrapper.
```js
// tailwind.config.ts example
keyframes: {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
},
animation: {
  fadeIn: 'fadeIn 0.5s ease-in-out',
}
```
* **Link for More Details**: [Ask AI: Adding Page Transitions](https://alisol.ir/?ai=Adding%20Page%20Transitions%7CRaddy%7CHow%20to%20Build%20a%20Headless%20WordPress%20Blog%20with%20Next.js%20and%20WP%20JSON%20API)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
