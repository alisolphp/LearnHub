# Getting Started with Drupal Development Tools

* **Platform**: YouTube
* **Channel/Creator**: WebWash
* **Duration**: 01:21:27
* **Release Date**: Feb 1, 2024
* **Video Link**: [https://www.youtube.com/watch?v=H4rLEI1WCOA](https://www.youtube.com/watch?v=H4rLEI1WCOA)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=4ea0b5d0 -->

### AI-Powered buttons

Teach Me:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Getting%20Started%20with%20Drupal%20Development%20Tools) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Getting%20Started%20with%20Drupal%20Development%20Tools) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Getting%20Started%20with%20Drupal%20Development%20Tools) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Getting%20Started%20with%20Drupal%20Development%20Tools) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Getting%20Started%20with%20Drupal%20Development%20Tools) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Getting%20Started%20with%20Drupal%20Development%20Tools) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Getting%20Started%20with%20Drupal%20Development%20Tools) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Getting%20Started%20with%20Drupal%20Development%20Tools) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Getting%20Started%20with%20Drupal%20Development%20Tools) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Getting%20Started%20with%20Drupal%20Development%20Tools) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Getting%20Started%20with%20Drupal%20Development%20Tools) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Getting%20Started%20with%20Drupal%20Development%20Tools)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Getting%20Started%20with%20Drupal%20Development%20Tools) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Getting%20Started%20with%20Drupal%20Development%20Tools) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/Getting%20Started%20with%20Drupal%20Development%20Tools) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Getting%20Started%20with%20Drupal%20Development%20Tools) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Getting%20Started%20with%20Drupal%20Development%20Tools)
<!-- LH-BUTTONS:END -->

## Introduction to Drupal Development Tools
* **Summary**: The video introduces four essential tools for Drupal development and site building: Devel (for debugging and content generation), Web Profiler (for performance profiling), Module Builder (for generating module code), and Drush (a CLI tool for site management). These can be installed via Composer and are great for both developers and non-coders working with Drupal.
* **Key Takeaway/Example**: Focus on quick setup—tools like these speed up workflows without needing complex environments like DDEV or Xdebug right away. For instance, install Devel with `composer require drupal/devel`.
* **Link for More Details**: [Ask AI: Introduction to Drupal Development Tools](https://alisol.ir/?ai=Introduction%20to%20Drupal%20Development%20Tools|WebWash|Getting%20Started%20with%20Drupal%20Development%20Tools)

## Installing and Using Devel Module
* **Summary**: Devel is a module that helps with debugging, clearing caches, viewing routes and services, and more. Install it via Composer, enable it in the UI, and access its toolbar for quick actions like cache rebuilds or route inspections.
* **Key Takeaway/Example**: Use the toolbar to debug routes easily—search for paths like "/admin/structure" to see controllers and access details. For variable debugging, add `dpm($variables);` in PHP code or `{{ dpm(page) }}` in Twig templates (ensure Twig debugging is enabled and caches are off).
```php
function mymodule_preprocess_html(&$variables) {
  dpm($variables);
}
```
* **Link for More Details**: [Ask AI: Installing and Using Devel Module](https://alisol.ir/?ai=Installing%20and%20Using%20Devel%20Module|WebWash|Getting%20Started%20with%20Drupal%20Development%20Tools)

## Generating Content with Devel Generate
* **Summary**: The Devel Generate submodule creates test content like users, terms, and nodes. Enable it, then use the configuration page to generate items, such as 50 articles with random authors and comments.
* **Key Takeaway/Example**: It's perfect for populating a site quickly for testing or demos. Generate 50 articles: select the content type, set author options (exclude admin), add a title prefix, and specify max comments (e.g., 6). This assigns test users and fills fields automatically.
* **Link for More Details**: [Ask AI: Generating Content with Devel Generate](https://alisol.ir/?ai=Generating%20Content%20with%20Devel%20Generate|WebWash|Getting%20Started%20with%20Drupal%20Development%20Tools)

## Setting Up Web Profiler
* **Summary**: Web Profiler provides a bottom toolbar for profiling page requests, showing queries, memory usage, blocks, views, and forms. Use the dev version (`composer require drupal/webprofiler:10.2.x-dev`) to avoid bugs, enable it, and configure settings like IDE integration.
* **Key Takeaway/Example**: Handle dependency conflicts (e.g., with php-parser) by running `composer require drupal/webprofiler:10.2.x-dev --with-dependencies`. The toolbar helps debug slow queries—swap placeholders to copy and test them directly.
* **Link for More Details**: [Ask AI: Setting Up Web Profiler](https://alisol.ir/?ai=Setting%20Up%20Web%20Profiler|WebWash|Getting%20Started%20with%20Drupal%20Development%20Tools)

## Profiling and Debugging with Web Profiler
* **Summary**: Dive into profiles for details on requests, databases, blocks, views, and services. Access reports at /admin/reports/webprofiler, sort queries by duration or source, and link to your IDE (e.g., VS Code) for quick file opens.
* **Key Takeaway/Example**: Click on a service name in the toolbar to open its class in your editor. For queries, filter and analyze to spot performance issues, like excessive joins in views.
* **Link for More Details**: [Ask AI: Profiling and Debugging with Web Profiler](https://alisol.ir/?ai=Profiling%20and%20Debugging%20with%20Web%20Profiler|WebWash|Getting%20Started%20with%20Drupal%20Development%20Tools)

## Installing and Configuring Module Builder
* **Summary**: Module Builder generates module code via a UI. Install with Composer (`composer require drupal/module_builder`), enable it, and analyze your codebase first to detect existing hooks, services, etc.
* **Key Takeaway/Example**: Resolve library conflicts (e.g., php-parser versions) by updating dependencies. Start by adding a module, then build components like hooks or plugins step-by-step.
* **Link for More Details**: [Ask AI: Installing and Configuring Module Builder](https://alisol.ir/?ai=Installing%20and%20Configuring%20Module%20Builder|WebWash|Getting%20Started%20with%20Drupal%20Development%20Tools)

## Building Modules with Module Builder
* **Summary**: Create modules by defining basics, then add hooks (e.g., theme suggestions), plugins (e.g., blocks), entities, routes, forms, and more. Generate code, review it, and write files—use version control to track changes.
* **Key Takeaway/Example**: For a custom block, set plugin type to "block" and ID like "webwash_crm_latest". Add an admin form with a text field: it generates classes, routes, and config schemas. Test by installing and placing the block.
```php
public function build() {
  return ['#markup' => 'Hello, World!'];
}
```
* **Link for More Details**: [Ask AI: Building Modules with Module Builder](https://alisol.ir/?ai=Building%20Modules%20with%20Module%20Builder|WebWash|Getting%20Started%20with%20Drupal%20Development%20Tools)

## Getting Started with Drush
* **Summary**: Drush is a CLI tool for Drupal management, installed via Composer (`composer require drush/drush`). Run it from vendor/bin/drush for commands like status checks, cache rebuilds, and route debugging.
* **Key Takeaway/Example**: Basic status: `vendor/bin/drush status`. For routes: `drush route --name=system.admin_structure` shows details like path and controller.
* **Link for More Details**: [Ask AI: Getting Started with Drush](https://alisol.ir/?ai=Getting%20Started%20with%20Drush|WebWash|Getting%20Started%20with%20Drupal%20Development%20Tools)

## Essential Drush Commands
* **Summary**: Use Drush for module management (enable/uninstall/list), SQL interactions (CLI, queries, dumps), PHP evaluation, user password resets, and site installs. Pipe outputs to files for large results.
* **Key Takeaway/Example**: List enabled modules: `drush pm:list --status=enabled --type=module`. Run PHP: `drush php-eval 'print \Drupal::entityTypeManager()->getStorage("node")->load(10)->getTitle();'`. Reset password: `drush upwd admin --password=newpass`.
* **Link for More Details**: [Ask AI: Essential Drush Commands](https://alisol.ir/?ai=Essential%20Drush%20Commands|WebWash|Getting%20Started%20with%20Drupal%20Development%20Tools)

## Generating Code with Drush
* **Summary**: Drush generates code scaffolds like modules, blocks, controllers, and more via `drush generate`. Answer prompts to customize, then install and test the generated code.
* **Key Takeaway/Example**: Generate a block: `drush generate block`, select module, set label. For a controller: `drush generate controller`, add route—it creates files ready to use after cache clear.
* **Link for More Details**: [Ask AI: Generating Code with Drush](https://alisol.ir/?ai=Generating%20Code%20with%20Drush|WebWash|Getting%20Started%20with%20Drupal%20Development%20Tools)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
