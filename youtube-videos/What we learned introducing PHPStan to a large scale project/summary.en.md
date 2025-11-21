# What we learned introducing PHPStan to a large scale project

* **Platform**: YouTube
* **Channel/Creator**: Drupal Austria
* **Duration**: 00:48:29
* **Release Date**: Jul 21, 2023
* **Video Link**: [https://www.youtube.com/watch?v=rIriFId9j2M](https://www.youtube.com/watch?v=rIriFId9j2M)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

## Introduction to PHPStan
PHPStan is a static analysis tool that catches errors in your PHP code without executing it. It analyzes the flow of code to ensure components work together properly, much like checking if your coffee-making process will succeed before pouring. This helps avoid runtime issues like white screens of death in Drupal.

**Key Takeaway/Example**: Think of it as verifying device compatibility in a process chain—PHPStan flags mismatches early.

[Ask AI: Introduction to PHPStan](https://alisol.ir/?ai=Introduction%20to%20PHPStan|Drupal%20Austria|What%20we%20learned%20introducing%20PHPStan%20to%20a%20large%20scale%20project)

## Examples of Errors PHPStan Detects
PHPStan spots issues like incorrect method calls, deprecated functions, and undefined methods. For instance, a static call to a non-static method or using a deprecated function like file_create_url() triggers warnings. It also challenges loose code, such as assuming a field returns a specific entity type without checks.

**Key Takeaway/Example**: In a function to get an absolute URL from a file entity:
```php
function getAbsoluteUrlFromFile(NodeInterface $node): string|false {
    $file = $node->get('field_file')->entity;
    if (empty($file)) {
        return false;
    }
    return $file->createFileUrl();
}
```
PHPStan would flag the undefined method if $file isn't guaranteed to be a FileInterface. Fix by adding an instance check:
```php
if ($file instanceof FileInterface) {
    return $file->createFileUrl();
}
```

[Ask AI: Errors Detected by PHPStan](https://alisol.ir/?ai=Errors%20Detected%20by%20PHPStan|Drupal%20Austria|What%20we%20learned%20introducing%20PHPStan%20to%20a%20large%20scale%20project)

## Getting Started with PHPStan in Drupal
Install PHPStan via Composer with phpstan/phpstan and mglaman/phpstan-drupal. Create a phpstan.neon file in your project root with basic config like level: 0 and paths to analyze (e.g., custom modules). Run vendor/bin/phpstan analyze to start scanning.

**Key Takeaway/Example**: Minimal config example:
```yaml
parameters:
    level: 0
    paths:
        - modules/custom
        - themes/custom
```

[Ask AI: Getting Started with PHPStan](https://alisol.ir/?ai=Getting%20Started%20with%20PHPStan|Drupal%20Austria|What%20we%20learned%20introducing%20PHPStan%20to%20a%20large%20scale%20project)

## Benefits of Using PHPStan
Adopting PHPStan leads to more maintainable, secure, and future-proof code. It teaches developers better practices, speeds up shipping, and fosters team collaboration. Make it a team decision—discuss in backend working groups to get buy-in.

**Key Takeaway/Example**: It shifts focus from syntax nitpicking in code reviews to semantic discussions, like why use dependency injection or specific interfaces.

[Ask AI: Benefits of PHPStan](https://alisol.ir/?ai=Benefits%20of%20PHPStan|Drupal%20Austria|What%20we%20learned%20introducing%20PHPStan%20to%20a%20large%20scale%20project)

## PHPStan in the Development Workflow
PHPStan fits between code implementation and review, automating checks for correctness. Use pair programming to turn fixes into learning opportunities about semantics, like safely getting field values or writing PHPDocs. Avoid assigning it solely to juniors—pair them up for reflection.

**Key Takeaway/Example**: In workflows, it reduces compromises under pressure and turns reviews into valuable discussions.

[Ask AI: PHPStan in Development Workflow](https://alisol.ir/?ai=PHPStan%20in%20Development%20Workflow|Drupal%20Austria|What%20we%20learned%20introducing%20PHPStan%20to%20a%20large%20scale%20project)

## Strategies for Introducing PHPStan to Large Projects
Use rule levels (0-9) for gradual strictness—start at 2 for client projects, aim for 5. Generate a baseline to log existing errors and fix incrementally. Analyze module by module for focus, exclude deprecated ones. Ignore errors sparingly, ideally per line, and contribute to phpstan-drupal for Drupal-specific improvements.

**Key Takeaway/Example**: Command for baseline: vendor/bin/phpstan analyze --generate-baseline. For a module: vendor/bin/phpstan analyze modules/custom/example.

[Ask AI: Introducing PHPStan to Large Projects](https://alisol.ir/?ai=Introducing%20PHPStan%20to%20Large%20Projects|Drupal%20Austria|What%20we%20learned%20introducing%20PHPStan%20to%20a%20large%20scale%20project)

## Project Experience and Timeline
In a fast-moving relaunch with technical debt, starting at level 1 took time due to 800+ errors. Reduced to 150 at level 2, then post-launch down to 23 aiming for zero. Do it before major releases if possible; integrate in CI/CD for merge requests.

**Key Takeaway/Example**: Timeline showed heavy lifting delayed full adoption, but module-by-module helped during entity architecture changes.

[Ask AI: PHPStan Project Experience](https://alisol.ir/?ai=PHPStan%20Project%20Experience|Drupal%20Austria|What%20we%20learned%20introducing%20PHPStan%20to%20a%20large%20scale%20project)

## References and Q&A Insights
Check Matt Glaman's blog and video for tightening Drupal code. PHPStan docs are excellent for fixes. Contribute via GitHub, like stub files. Q&A covered drawbacks like gradual level raises affecting new code, IDE integration, CI workflows, alternatives, and handling opinionated rules.

**Key Takeaway/Example**: Use Git hooks or CI to run PHPStan, and consider baselines to avoid overwhelming files.

[Ask AI: PHPStan References and Q&A](https://alisol.ir/?ai=PHPStan%20References%20and%20Q%26A|Drupal%20Austria|What%20we%20learned%20introducing%20PHPStan%20to%20a%20large%20scale%20project)

## Key Takeaways
PHPStan improves code quality and developer skills, becoming a potential Drupal standard. Long-term gains far exceed initial effort—prioritize team collaboration and take time with techniques like baselines.

[Ask AI: PHPStan Key Takeaways](https://alisol.ir/?ai=PHPStan%20Key%20Takeaways|Drupal%20Austria|What%20we%20learned%20introducing%20PHPStan%20to%20a%20large%20scale%20project)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
