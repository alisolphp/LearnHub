# خلاصه دوره: K6- Automate Performance & Load Testing of API & Microservices

* **پلتفرم**: Udemy
* **مدرس**: Anuradha Agarwal
* **مدت زمان**: 12:32:25
* **امتیاز**: 3.5/5
* **تاریخ انتشار**: May 2023
* **لینک دوره**: https://www.udemy.com/course/k6-automate-performance-load-testing-of-api-microservices

*این متن، نکات کلیدی دوره را خلاصه می‌کند. اگر فرصت داشتی، حتماً خود دوره را هم کامل ببین.*

## قبل از شروع

- من نکات مهم دوره‌ها را خلاصه می‌کنم تا بتوانی سریع یاد بگیری و بعداً راحت مرور کنی.
- فقط کافی است روی لینک‌های `Ask AI` کلیک کنی تا روی هر موضوعی که خواستی، عمیق‌تر گفتگو کنی.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=4ea0b5d0 -->

### AI-Powered buttons

Teach Me:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=fa&src=courses/udemy-k6-automate-performance-load-testing-of-api-microservices) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=courses/udemy-k6-automate-performance-load-testing-of-api-microservices) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=courses/udemy-k6-automate-performance-load-testing-of-api-microservices) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=courses/udemy-k6-automate-performance-load-testing-of-api-microservices) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=courses/udemy-k6-automate-performance-load-testing-of-api-microservices) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=fa&src=courses/udemy-k6-automate-performance-load-testing-of-api-microservices) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=courses/udemy-k6-automate-performance-load-testing-of-api-microservices) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=courses/udemy-k6-automate-performance-load-testing-of-api-microservices) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=courses/udemy-k6-automate-performance-load-testing-of-api-microservices) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=courses/udemy-k6-automate-performance-load-testing-of-api-microservices) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=courses/udemy-k6-automate-performance-load-testing-of-api-microservices) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=courses/udemy-k6-automate-performance-load-testing-of-api-microservices)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=courses/udemy-k6-automate-performance-load-testing-of-api-microservices) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=courses/udemy-k6-automate-performance-load-testing-of-api-microservices) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=fa&src=courses/udemy-k6-automate-performance-load-testing-of-api-microservices) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=courses/udemy-k6-automate-performance-load-testing-of-api-microservices) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=fa&src=courses/udemy-k6-automate-performance-load-testing-of-api-microservices)
<!-- LH-BUTTONS:END -->

## [موضوع ۱: Introduction to K6]

* **خلاصه**: در این بخش، با ابزار K6 به‌عنوان یک ابزار اوپن‌سورس برای Load Testing و Performance Testing روی API و Microservices آشنا می‌شوی. K6 رایگان است، برای Developerها دوست‌داشتنی طراحی شده و می‌تواند برای Performance Monitoring، اتوماسیون در CI/CD و اجرای تست‌ها از Cloud (از لوکیشن‌های مختلف) استفاده شود.
* **مثال**: فرض کن می‌خواهی هزاران کاربر هم‌زمان را شبیه‌سازی کنی که به یک API مثل Google.com درخواست می‌زنند تا Response Time و نرخ خطاها را بسنجی. با یک Script ساده JavaScript در K6 می‌توانی Virtual Userها، نرخ Request، و سایر متریک‌ها را ببینی.
* **لینک برای جزئیات بیشتر**: [Ask AI: Introduction to K6](https://alisol.ir/?ai=Introduction%20to%20K6%7CAnuradha%20Agarwal%7CK6-%20Automate%20Performance%20%26Load%20Testing%20of%20API%26%20Microservices|fa)

## [موضوع ۲: Local vs Cloud Deployment]

* **خلاصه**: این بخش تفاوت اجرای K6 به‌صورت Local روی سیستم خودت و استفاده از K6 Cloud را توضیح می‌دهد. Local حالت رایگان است، اما برای تست‌های جدی باید خودت زیرساخت را مدیریت کنی. در مقابل، K6 Cloud زیرساخت را برایت فراهم می‌کند و می‌توانی از مناطق مختلف جغرافیایی بدون نیاز به سرور شخصی یا لپ‌تاپ خودت Load بگیری.
* **مثال**: اجرای تست به‌صورت Local یعنی مثلاً با لپ‌تاپ خودت Load تولید کنی؛ اما با K6 Cloud می‌توانی از Regionهایی مثل USA، Mumbai یا Tokyo هم‌زمان روی API تست بگیری، بدون این‌که مجبور شوی چندین EC2 یا سرور دیگر را خودت مدیریت کنی.
* **لینک برای جزئیات بیشتر**: [Ask AI: Local vs Cloud Deployment](https://alisol.ir/?ai=Local%20vs%20Cloud%20Deployment%7CAnuradha%20Agarwal%7CK6-%20Automate%20Performance%20%26Load%20Testing%20of%20API%26%20Microservices|fa)

## [موضوع ۳: Installation and Project Setup]

* **خلاصه**: این بخش نصب K6 روی Windows یا Linux را توضیح می‌دهد، همچنین ساخت یک Git Project، Clone کردن آن و راه‌اندازی محیط Visual Studio Code برای نوشتن تست‌ها.
* **مثال**: بعد از دانلود MSI Installer برای Windows، یک Git Project خالی با نام «k6-performance» بساز، آن را Local کلون کن و در VS Code باز کن تا شروع به نوشتن Scriptهای تست K6 کنی.
* **لینک برای جزئیات بیشتر**: [Ask AI: Installation and Project Setup](https://alisol.ir/?ai=Installation%20and%20Project%20Setup%7CAnuradha%20Agarwal%7CK6-%20Automate%20Performance%20%26Load%20Testing%20of%20API%26%20Microservices|fa)

## [موضوع ۴: Understanding API Performance Testing]

* **خلاصه**: این قسمت درباره مفاهیم کلی API Testing و Performance Testing صحبت می‌کند؛ مثل سناریوهایی شبیه سفارش‌گذاری در سایت‌هایی مانند Flipkart، جمع‌آوری جزئیات API از Developerها و تعریف متریک‌هایی مثل Response Time و Failure Rate.
* **مثال**: برای Workflow ثبت سفارش در Flipkart، باید APIهای مربوط به باز کردن سایت، انتخاب محصول، افزودن به Cart و Checkout را جمع کنی و سپس با هزاران کاربر هم‌زمان تست کنی تا مطمئن شوی هم خطا نداری و هم پاسخ‌ها سریع برمی‌گردند.
* **لینک برای جزئیات بیشتر**: [Ask AI: Understanding API Performance Testing](https://alisol.ir/?ai=Understanding%20API%20Performance%20Testing%7CAnuradha%20Agarwal%7CK6-%20Automate%20Performance%20%26Load%20Testing%20of%20API%26%20Microservices|fa)

## [موضوع ۵: Writing Basic Load Test Scripts]

* **خلاصه**: اینجا یاد می‌گیری چطور Scriptهای ساده JavaScript بنویسی که به APIها Request بزنند، ماژول‌ها را Import کنی و با دستور k6 run تست‌ها را اجرا کنی.
* **مثال**: ماژول http را Import کن، در تابع default یک درخواست GET به Google.com بفرست و Script را اجرا کن تا متریک‌هایی مثل Response Time را برای یک کاربر ببینی.
* **لینک برای جزئیات بیشتر**: [Ask AI: Writing Basic Load Test Scripts](https://alisol.ir/?ai=Writing%20Basic%20Load%20Test%20Scripts%7CAnuradha%20Agarwal%7CK6-%20Automate%20Performance%20%26Load%20Testing%20of%20API%26%20Microservices|fa)

## [موضوع ۶: Configuring Virtual Users and Duration]

* **خلاصه**: در این بخش یاد می‌گیری چطور تعداد Virtual Userها (VUs) و مدت اجرای تست را مشخص کنی؛ هم از طریق Command Line و هم از طریق options داخل Script، برای شبیه‌سازی Load هم‌زمان.
* **مثال**: اگر در Script مقدار options را برابر { vus: 10, duration: '10s' } قرار بدهی، تست با ۱۰ کاربر هم‌زمان به مدت ۱۰ ثانیه اجرا می‌شود، بدون این‌که لازم باشد در Command Line آرگومان اضافه بنویسی.
* **لینک برای جزئیات بیشتر**: [Ask AI: Configuring Virtual Users and Duration](https://alisol.ir/?ai=Configuring%20Virtual%20Users%20and%20Duration%7CAnuradha%20Agarwal%7CK6-%20Automate%20Performance%20%26Load%20Testing%20of%20API%26%20Microservices|fa)

## [موضوع ۷: Ramp Up and Ramp Down User Load]

* **خلاصه**: این قسمت مفهوم stages در options را معرفی می‌کند تا بتوانی به‌صورت تدریجی تعداد VUها را در طول زمان بالا یا پایین ببری و Load واقعی‌تری را شبیه‌سازی کنی.
* **مثال**: اگر در options مقدار stages را برابر

[
  { duration: '10s', target: 5 },
  { duration: '20s', target: 3 }
  ]
قرار بدهی، ابتدا در ۱۰ ثانیه اول تا ۵ کاربر Ramp Up می‌شود و بعد در ۲۰ ثانیه بعدی تا ۳ کاربر Ramp Down خواهد شد.
* **לینک برای جزئیات بیشتر**: [Ask AI: Ramp Up and Ramp Down User Load](https://alisol.ir/?ai=Ramp%20Up%20and%20Ramp%20Down%20User%20Load%7CAnuradha%20Agarwal%7CK6-%20Automate%20Performance%20%26Load%20Testing%20of%20API%26%20Microservices|fa)

## [موضوع ۸: Using Checks and Assertions]

* **خلاصه**: این بخش اضافه کردن checkها به Script را توضیح می‌دهد تا بدون Stop شدن اجرای تست، بتوانی صحت Response را بررسی کنی؛ مثلاً برای Status Codeها، و از همان‌ها برای Pass/Fail شدن تست استفاده کنی.
* **مثال**: ماژول check را Import کن، Response را در یک متغیر ذخیره کن و بعد با check بررسی کن که آیا response.status === 200 است یا نه؛ معمولاً نتیجه در خروجی به‌صورت سبز (موفق) یا قرمز (ناموفق) نمایش داده می‌شود.
* **لینک برای جزئیات بیشتر**: [Ask AI: Using Checks and Assertions](https://alisol.ir/?ai=Using%20Checks%20and%20Assertions%7CAnuradha%20Agarwal%7CK6-%20Automate%20Performance%20%26Load%20Testing%20of%20API%26%20Microservices|fa)

## [موضوع ۹: Setting Up CI/CD Pipeline with GitLab]

* **خلاصه**: در این قسمت می‌بینی چطور یک GitLab Pipeline با فایل .gitlab-ci.yml بسازی تا تست‌های K6 به‌صورت خودکار روی هر Push یا Merge اجرا شوند. همچنین کار با Environment Variableها را هم پوشش می‌دهد.
* **مثال**: در فایل .gitlab-ci.yml مرحله‌ها (stages) و Jobها را تعریف می‌کنی تا Scriptهای K6 اجرا شوند، مسیرها را درست تنظیم می‌کنی و بعد در Dashboard مربوط به Pipeline می‌توانی اجرای موفق یا ناموفق Jobها را ببینی.
* **لینک برای جزئیات بیشتر**: [Ask AI: Setting Up CI/CD Pipeline with GitLab](https://alisol.ir/?ai=Setting%20Up%20CI%2FCD%20Pipeline%20with%20GitLab%7CAnuradha%20Agarwal%7CK6-%20Automate%20Performance%20%26Load%20Testing%20of%20API%26%20Microservices|fa)

## [موضوع ۱۰: Selecting the Right Runner for Testing]

* **خلاصه**: این بخش توصیه می‌کند برای اجرای تست‌ها از ماشین‌هایی با RAM و CPU کافی استفاده کنی، و تا جای امکان Linux را به‌جای Windows انتخاب کنی تا نتیجه تست‌ها پایدارتر و دقیق‌تر باشد.
* **مثال**: مثلاً می‌توانی با یک EC2 Instance با 1 vCPU و 2GB RAM برای ۱۰۰ VU شروع کنی و هنگام اجرا، مصرف CPU و Memory را در کنسول Cloud مانیتور کنی تا از Hang شدن یا خطا جلوگیری شود.
* **لینک برای جزئیات بیشتر**: [Ask AI: Selecting the Right Runner for Testing](https://alisol.ir/?ai=Selecting%20the%20Right%20Runner%20for%20Testing%7CAnuradha%20Agarwal%7CK6-%20Automate%20Performance%20%26Load%20Testing%20of%20API%26%20Microservices|fa)

## [موضوع ۱۱: Managing Performance Overhead]

* **خلاصه**: در این قسمت درباره Overhead ناشی از استفاده از کتابخانه‌های Third-Party و فایل‌های بزرگ JS صحبت می‌شود و این‌که چطور روی Response Time و مصرف منابع تأثیر می‌گذارند. پیشنهاد این است که Scriptها را تا حد ممکن Minimal نگه داری و Load واقع‌بینانه‌ای شبیه‌سازی کنی.
* **مثال**: اگر تعداد زیادی NPM Package اضافه استفاده کنی، شاید روی هر Request چند Millisecond اضافه شود؛ اما زیر Load بالا این چند Millisecond به چند ثانیه تبدیل می‌شود و متریک‌ها را کاملاً خراب می‌کند.
* **لینک برای جزئیات بیشتر**: [Ask AI: Managing Performance Overhead](https://alisol.ir/?ai=Managing%20Performance%20Overhead%7CAnuradha%20Agarwal%7CK6-%20Automate%20Performance%20%26Load%20Testing%20of%20API%26%20Microservices|fa)

## [موضوع ۱۲: Debugging K6 Scripts]

* **خلاصه**: این بخش استفاده از console.log و فلگ --http-debug=full را برای تولید Log و Debug کردن مشکل‌های Script توضیح می‌دهد.
* **مثال**: با اضافه کردن console.log(response.body) می‌توانی Responseهای API را در خروجی ببینی، یا با استفاده از فلگ --http-debug=full Header و Body کامل Request/Response را برای تحلیل خطاها مشاهده کنی.
* **لینک برای جزئیات بیشتر**: [Ask AI: Debugging K6 Scripts](https://alisol.ir/?ai=Debugging%20K6%20Scripts%7CAnuradha%20Agarwal%7CK6-%20Automate%20Performance%20%26Load%20Testing%20of%20API%26%20Microservices|fa)

## [موضوع ۱۳: Executing Multiple Test Cases]

* **خلاصه**: این قسمت اجرای چند Script به‌صورت هم‌زمان را توضیح می‌دهد، محدودیت‌های نسخه‌های قدیمی‌تر K6 را بیان می‌کند و نشان می‌دهد در نسخه‌های جدیدتر چگونه می‌توان چند تست را بدون Overhead اضافی موازی اجرا کرد.
* **مثال**: می‌توانی در یک فایل اصلی، توابعی را از test1.js و test2.js Import و Call کنی؛ اما باید توجه داشته باشی که تنظیمات (options) فقط از فایل اصلی اعمال می‌شوند.
* **لینک برای جزئیات بیشتر**: [Ask AI: Executing Multiple Test Cases](https://alisol.ir/?ai=Executing%20Multiple%20Test%20Cases%7CAnuradha%20Agarwal%7CK6-%20Automate%20Performance%20%26Load%20Testing%20of%20API%26%20Microservices|fa)

## [موضوع ۱۴: Using Scenarios in K6]

* **خلاصه**: در این بخش با مفهوم scenarios در K6 آشنا می‌شوی که اجازه می‌دهد چند تست را با تنظیمات مستقل اجرا کنی؛ با استفاده از executorهایی مثل constant-vus یا ramping-vus برای نوع‌های مختلف Load.
* **مثال**: می‌توانی در options چند scenario تعریف کنی که یکی از executor نوع constant-vus برای تعداد ثابت کاربر و دیگری از ramping-vus برای افزایش تدریجی استفاده کند. هر scenario می‌تواند تابع متفاوتی را صدا بزند و از Environment Variableهای جداگانه استفاده کند.
* **لینک برای جزئیات بیشتر**: [Ask AI: Using Scenarios in K6](https://alisol.ir/?ai=Using%20Scenarios%20in%20K6%7CAnuradha%20Agarwal%7CK6-%20Automate%20Performance%20%26Load%20Testing%20of%20API%26%20Microservices|fa)

## [موضوع ۱۵: Recording and Auto-Generating Scripts with HAR]

* **خلاصه**: این قسمت آموزش می‌دهد که چطور می‌توانی Sessionهای مرورگر را به‌صورت HAR ضبط کنی، آن‌ها را به Scriptهای K6 تبدیل کنی و سپس Script را برای استفاده در Load Testing تمیز و آماده کنی.
* **مثال**: با استفاده از Chrome DevTools جریان حرکت روی یک سایت را ضبط کن، آن را به‌صورت HAR ذخیره کن، با ابزار har-to-k6 به Script تبدیلش کن و بعد بخش‌هایی مثل پروتکل‌های WSS که در K6 پشتیبانی نمی‌شوند را حذف یا اصلاح کن.
* **لینک برای جزئیات بیشتر**: [Ask AI: Recording and Auto-Generating Scripts with HAR](https://alisol.ir/?ai=Recording%20and%20Auto-Generating%20Scripts%20with%20HAR%7CAnuradha%20Agarwal%7CK6-%20Automate%20Performance%20%26Load%20Testing%20of%20API%26%20Microservices|fa)

## دوره اصلی

برای تجربه کامل و دیدن همه جزئیات، می‌توانی خود دوره را در Udemy ببینی:  
[K6- Automate Performance & Load Testing of API & Microservices](https://www.udemy.com/course/k6-automate-performance-load-testing-of-api-microservices)

---

## درباره خلاصه‌کننده

من *Ali Sol*، یک Backend Developer هستم. اگر دوست داشتی بیشتر دنبال کنی:

- وب‌سایت: [alisol.ir](https://alisol.ir)
- لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

