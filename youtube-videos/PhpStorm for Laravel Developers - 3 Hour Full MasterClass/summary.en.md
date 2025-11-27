# PhpStorm for Laravel Developers - 3 Hour Full MasterClass

* **Platform**: YouTube
* **Channel/Creator**: Laracasts
* **Duration**: 02:35:26
* **Release Date**: Jun 28, 2024
* **Video Link**: [https://www.youtube.com/watch?v=bkdcMa5-RM4](https://www.youtube.com/watch?v=bkdcMa5-RM4)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## Introduction to PhpStorm
* **Summary**: PhpStorm stands out as a comprehensive IDE for Laravel developers, offering seamless integration with tools like Prettier, PHPCS Fixer, dynamic snippets, multiple cursors, refactoring, and strong Laravel support via plugins. It eliminates the need to switch editors frequently due to its robust features and attractive UI.
* **Key Takeaway/Example**: The new UI allows customization from a command center with icons to a bare-bones setup, ticking every box for debugging, testing, and more.
* **Link for More Details**: [Ask AI: Introduction to PhpStorm](https://alisol.ir/?ai=Introduction%20to%20PhpStorm%7CLaracasts%7CPhpStorm%20for%20Laravel%20Developers%20-%203%20Hour%20Full%20MasterClass)

## Downloading and Installing PhpStorm
* **Summary**: Head to jetbrains.com/phpstorm to download, with a free 30-day trial available. Use the JetBrains Toolbox app or direct download, selecting the right version for your hardware like Apple Silicon.
* **Key Takeaway/Example**: After installation, enable the new UI for a modern look with reduced distractions, then open a Laravel project to start configuring.
* **Link for More Details**: [Ask AI: Downloading and Installing PhpStorm](https://alisol.ir/?ai=Downloading%20and%20Installing%20PhpStorm%7CLaracasts%7CPhpStorm%20for%20Laravel%20Developers%20-%203%20Hour%20Full%20MasterClass)

## Initial Setup and Customization
* **Summary**: Adjust fonts (like JetBrains Mono with ligatures), color schemes, and UI elements such as hiding breadcrumbs, status bars, or toolbars. Install themes like Nord or Carbon via plugins for personalization.
* **Key Takeaway/Example**: For minimalists, hide tabs, line numbers, and sidebars; toggle views with shortcuts like Command+1 for the project sidebar.
* **Link for More Details**: [Ask AI: Initial Setup and Customization](https://alisol.ir/?ai=Initial%20Setup%20and%20Customization%7CLaracasts%7CPhpStorm%20for%20Laravel%20Developers%20-%203%20Hour%20MasterClass)

## Installing Laravel Idea Plugin
* **Summary**: Search for "Laravel" in plugins, install the paid Laravel Idea plugin (with free trial), and generate helper code for better Laravel intelligence like Eloquent completion and routing.
* **Key Takeaway/Example**: The plugin adds a Laravel menu, icons for related files (e.g., model to migration), and features like request field autocompletion.
* **Link for More Details**: [Ask AI: Installing Laravel Idea Plugin](https://alisol.ir/?ai=Installing%20Laravel%20Idea%20Plugin%7CLaracasts%7CPhpStorm%20for%20Laravel%20Developers%20-%203%20Hour%20Full%20MasterClass)

## Navigation and Keybindings
* **Summary**: Use shortcuts like Command+O for classes, Shift+Command+O for files, or Command+P (rebound) for search everywhere. Command-click symbols to navigate, and filter tree views by typing.
* **Key Takeaway/Example**: Recent files (Command+E) or locations (Shift+Command+E) help jump back; customize keymaps to avoid conflicts, like rebinding search to Command+P.
* **Link for More Details**: [Ask AI: Navigation and Keybindings](https://alisol.ir/?ai=Navigation%20and%20Keybindings%7CLaracasts%7CPhpStorm%20for%20Laravel%20Developers%20-%203%20Hour%20Full%20MasterClass)

## Code Formatting and Cleanup
* **Summary**: Enable actions on save for reformatting, optimizing imports, and code cleanup. Integrate Laravel Pint via file watchers for opinionated styling, disabling built-in formatting if using Pint.
* **Key Takeaway/Example**: Fix issues like replacing preg_split with explode using Option+Return for quick fixes; configure code style to PSR-2 or Laravel standards.
```php
// Example: Misformatted code gets auto-fixed on save
protected $fillable = ['title', 'body', 'user_id'];
```
* **Link for More Details**: [Ask AI: Code Formatting and Cleanup](https://alisol.ir/?ai=Code%20Formatting%20and%20Cleanup%7CLaracasts%7CPhpStorm%20for%20Laravel%20Developers%20-%203%20Hour%20Full%20MasterClass)

## Code Generation
* **Summary**: Generate Laravel artifacts like models, controllers, and migrations directly via Shift+Command+Comma or Command+N in directories, including fields and related files.
* **Key Takeaway/Example**: Create a Post model with title (string), body (text), user_id (bigInteger), plus migration and factory; use icons to jump to related files.
```php
// Generated model example
class Post extends Model {
    protected $fillable = ['title', 'body', 'user_id'];
}
```
* **Link for More Details**: [Ask AI: Code Generation](https://alisol.ir/?ai=Code%20Generation%7CLaracasts%7CPhpStorm%20for%20Laravel%20Developers%20-%203%20Hour%20Full%20MasterClass)

## Multiple Cursors
* **Summary**: Use Control+G to add cursors for editing multiple occurrences, or Control+Command+G for all at once; great for renaming or updating repeated code.
* **Key Takeaway/Example**: Change visibility from private to public across properties by selecting and typing with multiple cursors.
* **Link for More Details**: [Ask AI: Multiple Cursors](https://alisol.ir/?ai=Multiple%20Cursors%7CLaracasts%7CPhpStorm%20for%20Laravel%20Developers%20-%203%20Hour%20Full%20MasterClass)

## Live Templates
* **Summary**: Create snippets with abbreviations like "pubf" for public functions; add tab stops for dynamic parts using $NAME$ syntax.
* **Key Takeaway/Example**: Snippet for Pest "it" tests: it('$NAME$', function () { $END$ }); trigger with Command+J or typing.
```php
// Example snippet expansion
it('returns a successful response', function () {
    // Test body
});
```
* **Link for More Details**: [Ask AI: Live Templates](https://alisol.ir/?ai=Live%20Templates%7CLaracasts%7CPhpStorm%20for%20Laravel%20Developers%20-%203%20Hour%20Full%20MasterClass)

## Tailwind CSS Integration
* **Summary**: Enable Tailwind plugin for autocompletion; install Prettier with Tailwind plugin for class sorting on save via actions or file watchers.
* **Key Takeaway/Example**: Classes like "font-bold underline text-red-500" auto-sort to consistent order on save.
* **Link for More Details**: [Ask AI: Tailwind CSS Integration](https://alisol.ir/?ai=Tailwind%20CSS%20Integration%7CLaracasts%7CPhpStorm%20for%20Laravel%20Developers%20-%203%20Hour%20Full%20MasterClass)

## GitHub Copilot Integration
* **Summary**: Install Copilot plugin, authenticate with GitHub, and get AI-powered code suggestions; disable per language if needed.
* **Key Takeaway/Example**: Comment "A user has many conversations" to auto-generate relationships; trigger manually with Option+Backslash.
```php
// AI-generated example
public function conversations() {
    return $this->hasMany(Conversation::class);
}
```
* **Link for More Details**: [Ask AI: GitHub Copilot Integration](https://alisol.ir/?ai=GitHub%20Copilot%20Integration%7CLaracasts%7CPhpStorm%20for%20Laravel%20Developers%20-%203%20Hour%20Full%20MasterClass)

## Testing with Pest
* **Summary**: Install Pest plugin for run icons and suggestions; bind shortcuts like Command+T to run tests, Shift+Command+T to rerun.
* **Key Takeaway/Example**: Run single tests via play icon; fix failing assertions by stepping through code and rerunning.
* **Link for More Details**: [Ask AI: Testing with Pest](https://alisol.ir/?ai=Testing%20with%20Pest%7CLaracasts%7CPhpStorm%20for%20Laravel%20Developers%20-%203%20Hour%20Full%20MasterClass)

## Debugging with Xdebug
* **Summary**: Install Xdebug via Homebrew/PECL, configure php.ini, validate in PhpStorm, and use browser bookmarklets to trigger; set breakpoints and step through code.
* **Key Takeaway/Example**: Break on a line, inspect variables like $name, step over/into functions, and evaluate expressions in console.
* **Link for More Details**: [Ask AI: Debugging with Xdebug](https://alisol.ir/?ai=Debugging%20with%20Xdebug%7CLaracasts%7CPhpStorm%20for%20Laravel%20Developers%20-%203%20Hour%20Full%20MasterClass)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
