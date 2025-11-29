# Live Coding WordPress Theme from Scratch | 50 min | 2024

* **Platform**: YouTube
* **Channel/Creator**: Robbert Vermeulen
* **Duration**: 00:50:58
* **Release Date**: Aug 22, 2024
* **Video Link**: [https://www.youtube.com/watch?v=Ffcbvgp4TlQ](https://www.youtube.com/watch?v=Ffcbvgp4TlQ)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Live%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Live%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Live%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Live%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Live%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Live%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Live%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Live%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Live%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Live%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Live%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Live%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Live%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Live%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Live%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Live%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024)
<!-- LH-BUTTONS:END -->

## Introduction and Tools for Theme Development
Robert introduces himself as a 13-year WordPress and WooCommerce developer, sharing his approach to building themes from scratch. He covers tools like Local for quick local WordPress setups, Visual Studio Code with GitHub Copilot for AI-assisted coding, and emphasizes structuring themes efficiently.
* **Key Takeaway/Example**: Start with a fresh WordPress install in Local, create a theme folder in wp-content/themes, and use VS Code for editing.
* **Link for More Details**: [Ask AI: WordPress Theme Development Tools](https://alisol.ir/?ai=WordPress%20Theme%20Development%20Tools%7CRobbert%20Vermeulen%7CLive%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024)

## Basic Theme Files and Setup
Every WordPress theme needs core files like index.php for the main content (including get_header() and get_footer()), functions.php for hooks and functions, and style.css for theme metadata like name, version, and description. WordPress reads style.css to display theme info in the admin.
* **Key Takeaway/Example**: In style.css, add comments like /* Theme Name: Tutorial */. In index.php, echo simple content between header and footer calls.
```php
<?php get_header(); ?>
<?php echo 'Hello World'; ?>
<?php get_footer(); ?>
```
* **Link for More Details**: [Ask AI: WordPress Theme Core Files](https://alisol.ir/?ai=WordPress%20Theme%20Core%20Files%7CRobbert%20Vermeulen%7CLive%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024)

## Organizing with Includes and Constants
Use an includes folder to separate functionalities into individual files for better structure, avoiding a bloated functions.php. Define constants like THEME_URI (using get_template_directory_uri()) and THEME_DIR (using get_template_directory()) for easy paths to assets.
* **Key Takeaway/Example**: In functions.php, add:
```php
define('THEME_URI', get_template_directory_uri());
define('THEME_DIR', get_template_directory());
```
Then include files like includes/categories.php as needed.
* **Link for More Details**: [Ask AI: WordPress Theme Constants and Includes](https://alisol.ir/?ai=WordPress%20Theme%20Constants%20and%20Includes%7CRobbert%20Vermeulen%7CLive%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024)

## Implementing a Singleton Class for Theme
Create a singleton class in functions.php to manage theme initialization safely, ensuring it's instantiated only once. Use it to run the constructor for hooks like enqueuing styles.
* **Key Takeaway/Example**: Example class setup:
```php
class Tutorial_Theme {
    private static $instance = null;
    public static function get_instance() {
        if (self::$instance == null) {
            self::$instance = new Tutorial_Theme();
        }
        return self::$instance;
    }
    private function __construct() {
        // Add hooks here
    }
}
Tutorial_Theme::get_instance();
```
* **Link for More Details**: [Ask AI: Singleton Pattern in WordPress Themes](https://alisol.ir/?ai=Singleton%20Pattern%20in%20WordPress%20Themes%7CRobbert%20Vermeulen%7CLive%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024)

## Header and Footer Templates
Header.php handles the doctype, html, head (with wp_head() for hooks), and opening body. Footer.php includes wp_footer() and closing tags. These override defaults when present.
* **Key Takeaway/Example**: In header.php:
```php
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
```
* **Link for More Details**: [Ask AI: WordPress Header and Footer Templates](https://alisol.ir/?ai=WordPress%20Header%20and%20Footer%20Templates%7CRobbert%20Vermeulen%7CLive%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024)

## Integrating Tailwind CSS
Tailwind CSS provides utility classes for efficient styling. Set it up with npm, an input.css file for directives, and scripts in package.json to build/watch styles into style.css, scanning PHP files for classes.
* **Key Takeaway/Example**: Run `npm install -D tailwindcss`, then add to package.json:
```json
"scripts": {
    "build": "tailwindcss -i ./input.css -o ./style.css",
    "watch": "tailwindcss -i ./input.css -o ./style.css --watch"
}
```
In input.css: `@tailwind base; @tailwind components; @tailwind utilities;`
* **Link for More Details**: [Ask AI: Tailwind CSS in WordPress Themes](https://alisol.ir/?ai=Tailwind%20CSS%20in%20WordPress%20Themes%7CRobbert%20Vermeulen%7CLive%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024)

## Enqueuing Styles and Scripts
Use add_action('wp_enqueue_scripts') in the theme class to load styles via wp_enqueue_style(), referencing THEME_URI for paths.
* **Key Takeaway/Example**: In the constructor:
```php
add_action('wp_enqueue_scripts', array($this, 'enqueue_styles'));
public function enqueue_styles() {
    wp_enqueue_style('tutorial-style', get_stylesheet_uri());
}
```
* **Link for More Details**: [Ask AI: Enqueuing Assets in WordPress](https://alisol.ir/?ai=Enqueuing%20Assets%20in%20WordPress%7CRobbert%20Vermeulen%7CLive%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024)

## Template Hierarchy and Custom Templates
WordPress uses a hierarchy: index.php as fallback, single.php for posts, page.php for pages, archive.php for archives. Customize for post types like archive-product.php.
* **Key Takeaway/Example**: In single.php:
```php
<?php get_header(); ?>
<div class="p-20">
    <h1 class="text-2xl font-bold"><?php the_title(); ?></h1>
    <div class="mb-10"><?php the_content(); ?></div>
</div>
<?php get_footer(); ?>
```
* **Link for More Details**: [Ask AI: WordPress Template Hierarchy](https://alisol.ir/?ai=WordPress%20Template%20Hierarchy%7CRobbert%20Vermeulen%7CLive%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024)

## Using Composer for Autoloading Classes
Set up a src folder for classes, use composer.json with PSR-4 autoloading, and require vendor/autoload.php in functions.php to auto-load classes without manual includes.
* **Key Takeaway/Example**: In composer.json:
```json
{
    "autoload": {
        "psr-4": {
            "Robbert\\TutorialTheme\\": "src/"
        }
    }
}
```
Run `composer dump-autoload`.
* **Link for More Details**: [Ask AI: Composer Autoloading in WordPress](https://alisol.ir/?ai=Composer%20Autoloading%20in%20WordPress%7CRobbert%20Vermeulen%7CLive%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024)

## Working with Actions and Filters
Actions add functionality (e.g., via add_action()), filters modify values (e.g., add_filter('the_title')). Use in classes or prefixed functions to avoid conflicts.
* **Key Takeaway/Example**: Filter example:
```php
add_filter('the_title', array($this, 'change_title'));
public function change_title($title) {
    return $title . ' (Modified)';
}
```
* **Link for More Details**: [Ask AI: WordPress Actions and Filters](https://alisol.ir/?ai=WordPress%20Actions%20and%20Filters%7CRobbert%20Vermeulen%7CLive%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024)

## Best Practices for Code Organization
Prefer classes over global functions to encapsulate code and avoid name conflicts. Prefix functions if not using classes. Structure keeps themes scalable.
* **Key Takeaway/Example**: Use namespaces in src classes, like namespace Robbert\TutorialTheme; for safe, organized code.
* **Link for More Details**: [Ask AI: Organizing WordPress Theme Code](https://alisol.ir/?ai=Organizing%20WordPress%20Theme%20Code%7CRobbert%20Vermeulen%7CLive%20Coding%20WordPress%20Theme%20from%20Scratch%20%7C%2050%20min%20%7C%202024)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
