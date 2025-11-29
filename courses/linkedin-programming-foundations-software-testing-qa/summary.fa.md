# ؜Programming Foundations: Software Testing/QA — خلاصه دوره (فارسی)

- **پلتفرم**: LinkedIn Learning
- **مدرس**: Meaghan Lewis
- **امتیاز**: ‎4.7‎ از ‎5‎
- **مدت‌زمان**: ‎00:53:51‎
- **تاریخ انتشار**: ‎2019‎
- **لینک دوره در لینکدین**: https://www.linkedin.com/learning/programming-foundations-software-testing-qa

این فایل خلاصه‌ی فارسی نکات کلیدی دوره است. برای تسلط کامل، دیدن خود دوره در LinkedIn Learning پیشنهاد می‌شود.

## قبل از شروع

من برای مرور سریع، نکات مهم دوره‌ها را خلاصه می‌کنم.
در این خلاصه هر جا روی لینک‌های ‎Ask AI‎ کلیک کنید، می‌توانید همان موضوع را عمیق‌تر بررسی کنید و سؤال بپرسید.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=fa&src=courses/linkedin-programming-foundations-software-testing-qa) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=courses/linkedin-programming-foundations-software-testing-qa) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=courses/linkedin-programming-foundations-software-testing-qa) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=courses/linkedin-programming-foundations-software-testing-qa) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=courses/linkedin-programming-foundations-software-testing-qa) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=fa&src=courses/linkedin-programming-foundations-software-testing-qa) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=courses/linkedin-programming-foundations-software-testing-qa) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=courses/linkedin-programming-foundations-software-testing-qa) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=courses/linkedin-programming-foundations-software-testing-qa) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=courses/linkedin-programming-foundations-software-testing-qa) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=courses/linkedin-programming-foundations-software-testing-qa) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=courses/linkedin-programming-foundations-software-testing-qa)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=courses/linkedin-programming-foundations-software-testing-qa) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=courses/linkedin-programming-foundations-software-testing-qa) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=fa&src=courses/linkedin-programming-foundations-software-testing-qa) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=courses/linkedin-programming-foundations-software-testing-qa) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=fa&src=courses/linkedin-programming-foundations-software-testing-qa)
<!-- LH-BUTTONS:END -->

---

## موضوع ۱: مقدمه‌ای بر Quality Assurance (QA)

- **خلاصه**: این بخش توضیح می‌دهد چرا QA در توسعه نرم‌افزار مهم است؛ QA کمک می‌کند قبل از اینکه کاربر با باگ، crash یا تجربه‌ی بد روبه‌رو شود، مشکل‌ها پیدا و برطرف شوند. این بخش تعریف کلی QA، نقش آن در planning تست‌ها، همکاری با تیم‌ها و مهارت‌های لازم برای موفقیت در این نقش را توضیح می‌دهد.
- **مثال**: فرض کن یک اپ داری که موقع رزرو بلیت هواپیما مدام crash می‌کند یا گیر می‌کند. کار QA این است که قبل از رسیدن این نسخه به دست کاربر، این سناریوها را تست کند و مشکل‌ها را پیدا و گزارش کند تا تجربه‌ی کاربر روان و قابل‌اعتماد باشد.
- **لینک برای جزئیات بیشتر**: [Ask AI: Introduction to Quality Assurance](https://alisol.ir/?ai=Introduction%20to%20Quality%20Assurance%7CMeaghan%20Lewis%7CProgramming%20Foundations%3A%20Software%20Testing%2FQA%7Cfa)

---

## موضوع ۲: نقش‌ها و مسئولیت‌ها در QA

- **خلاصه**: نقش‌های QA بسته به تیم و شرکت خیلی متنوع‌اند. ممکن است ترکیبی از کارهای فنی (نوشتن تست، automation)، تحلیل بیزینسی، کارهای DevOps و بهبود فرآیندها باشند. نکته‌ی مهم این است که بفهمی تیم از تو چه می‌خواهد و بر اساس strengths خودت (مثلاً manual testing، test automation یا برنامه‌ریزی release) نقش مناسبی بگیری.
- **مثال**: در یک استارتاپ کوچک، ممکن است یک نفر QA مسئول همه‌چیز باشد: از setup کردن تست‌های automated تا تعریف process برای release. اما در یک شرکت بزرگ، شاید تمرکز او فقط روی automation باشد و برای زیرساخت تست با تیم‌های دیگر همکاری کند.
- **لینک برای جزئیات بیشتر**: [Ask AI: Roles and Responsibilities in QA](https://alisol.ir/?ai=Roles%20and%20Responsibilities%20in%20QA%7CMeaghan%20Lewis%7CProgramming%20Foundations%3A%20Software%20Testing%2FQA%7Cfa)

---

## موضوع ۳: حضور QA در کل SDLC

- **خلاصه**: QA فقط برای آخر کار و مرحله‌ی testing نیست. بهتر است از ابتدای ‎SDLC‎ (مراحل planning، تعریف نیازمندی‌ها، design، build، test و deploy) در جریان کار باشید تا کیفیت از ابتدا در محصول طراحی شود، نه اینکه آخر کار وصله شود. این حضور زودهنگام کمک می‌کند ریسک‌ها و مشکل‌ها زودتر دیده شوند.
- **مثال**: در مرحله‌ی planning، QA می‌تواند روی یک feature جدید، ریسک‌ها و edge caseها (مثل ورودی‌های غیرمنتظره‌ی کاربر) را مطرح کند. بعد در مراحل design و build همین موارد به صورت test case و scenario دقیق‌تر می‌شوند و در نهایت در مرحله‌ی تست، اجرا و بررسی می‌شوند.
- **لینک برای جزئیات بیشتر**: [Ask AI: Involvement Throughout the SDLC](https://alisol.ir/?ai=Involvement%20Throughout%20the%20SDLC%7CMeaghan%20Lewis%7CProgramming%20Foundations%3A%20Software%20Testing%2FQA%7Cfa)

---

## موضوع ۴: همکاری و ارتباطات در QA

- **خلاصه**: موفقیت در QA فقط به تست‌کردن وابسته نیست، بلکه به همکاری نزدیک با developerها، designerها و product managerها بستگی دارد. باید انتظارها را شفاف کنید، feedback‌ها را مرتب و مؤدبانه منتقل کنید و در تمام مراحل SDLC با تیم در ارتباط باشید تا یک «فرهنگ کیفیت» مشترک شکل بگیرد.
- **مثال**: وقتی QA با developer pair می‌شود و برای یک کامپوننت UI جدید، هم‌زمان test می‌نویسند و درباره رفتار درست آن صحبت می‌کنند، بسیاری از اختلاف‌نظرها و باگ‌های احتمالی قبل از رسیدن به مرحله‌ی release حل می‌شود.
- **لینک برای جزئیات بیشتر**: [Ask AI: Collaboration and Communication in QA](https://alisol.ir/?ai=Collaboration%20and%20Communication%20in%20QA%7CMeaghan%20Lewis%7CProgramming%20Foundations%3A%20Software%20Testing%2FQA%7Cfa)

---

## موضوع ۵: ساخت Test Strategy و Test Plan

- **خلاصه**: ‎Test Strategy‎ یک سند کلی است که توضیح می‌دهد چطور قرار است محصول را تست کنید: دامنه‌ی تست‌ها، ابزارها، محیط‌ها، نوع‌های testing و غیره. بعد از آن ‎Test Plan‎ برای هر feature یا release نوشته می‌شود تا سناریوها، داده‌های تست، و entry/exit criteria را مشخص کند و testing ساختاریافته و قابل‌پیگیری شود.
- **مثال**: برای یک اپ جست‌وجوی پرواز، در Test Strategy مشخص می‌کنید که روی Mac و Windows و مرورگر Chrome تست انجام می‌دهید. در Test Plan سناریوهایی مثل جست‌وجوی مسیر معتبر، تاریخ‌های نامعتبر، نبودن پرواز، timeout سرویس و… را لیست می‌کنید.
- **لینک برای جزئیات بیشتر**: [Ask AI: Creating a Test Strategy and Plan](https://alisol.ir/?ai=Creating%20a%20Test%20Strategy%20and%20Plan%7CMeaghan%20Lewis%7CProgramming%20Foundations%3A%20Software%20Testing%2FQA%7Cfa)

---

## موضوع ۶: انواع تست — Manual و Exploratory

- **خلاصه**: در ‎Manual Testing‎ تستر طبق یک سناریو یا ‎Test Case‎ مشخص، قدم‌به‌قدم رفتار سیستم را چک می‌کند. در ‎Exploratory Testing‎ تستر آزادتر است و با خلاقیت خودش سعی می‌کند رفتارهای غیرمنتظره یا باگ‌هایی را کشف کند که در سناریوهای از پیش نوشته‌شده نیستند.
- **مثال**: در manual testing یک فرم login را با وارد کردن username و password معتبر، مرحله‌به‌مرحله تست می‌کنی. اما در exploratory testing ممکن است تلاش کنی خیلی سریع چند بار پشت‌سرهم login کنی، از کاراکترهای عجیب استفاده کنی یا session را دست‌کاری کنی تا رفتار غیرعادی سیستم را پیدا کنی.
- **لینک برای جزئیات بیشتر**: [Ask AI: Types of Testing: Manual and Exploratory](https://alisol.ir/?ai=Types%20of%20Testing%3A%20Manual%20and%20Exploratory%7CMeaghan%20Lewis%7CProgramming%20Foundations%3A%20Software%20Testing%2FQA%7Cfa)

---

## موضوع ۷: انواع تست — UI Automation و Integration

- **خلاصه**: ‎UI Automation‎ برای سناریوهای تکراری و مهم است تا با هر تغییر، regressionها سریع پیدا شوند؛ مخصوصاً در مرورگرها و deviceهای مختلف. ‎Integration Testing‎ هم تعامل بین اجزای سیستم را در سطح پایین‌تر (مثل APIها و سرویس‌ها) بررسی می‌کند تا مطمئن شویم ارتباط بین بخش‌ها درست کار می‌کند.
- **مثال**: می‌توانید یک سناریوی جست‌وجوی پرواز را با Selenium یا ابزار مشابه automate کنید تا روی چند مرورگر مختلف اجرا شود. یا برای integration test، مستقیماً یک API جست‌وجوی پرواز را call کنید و مطمئن شوید داده‌ی درست و status code مناسب برمی‌گردد، بدون اینکه UI درگیر باشد.
- **لینک برای جزئیات بیشتر**: [Ask AI: Types of Testing: UI Automation and Integration](https://alisol.ir/?ai=Types%20of%20Testing%3A%20UI%20Automation%20and%20Integration%7CMeaghan%20Lewis%7CProgramming%20Foundations%3A%20Software%20Testing%2FQA%7Cfa)

---

## موضوع ۸: انواع تست — Performance و Security

- **خلاصه**: ‎Performance Testing‎ بررسی می‌کند اپ تحت load، فشار (stress) یا استفاده‌ی طولانی‌مدت چطور رفتار می‌کند. ‎Security Testing‎ به دنبال حفره‌های امنیتی مثل SQL Injection، XSS، یا حملات Denial-of-Service است تا از نشت داده و سوءاستفاده جلوگیری شود.
- **مثال**: در performance test می‌توانید هزاران کاربر هم‌زمان را شبیه‌سازی کنید که دنبال پرواز می‌گردند تا ببینید زمان پاسخ و مصرف منابع چطور است. در security test ممکن است ورودی‌های فرم را با کدهای مخرب پر کنید تا ببینید آیا داده‌ها sanitize می‌شوند یا نه.
- **لینک برای جزئیات بیشتر**: [Ask AI: Types of Testing: Performance and Security](https://alisol.ir/?ai=Types%20of%20Testing%3A%20Performance%20and%20Security%7CMeaghan%20Lewis%7CProgramming%20Foundations%3A%20Software%20Testing%2FQA%7Cfa)

---

## موضوع ۹: مدیریت و رسیدگی به Bugها

- **خلاصه**: باگ همیشه وجود خواهد داشت، مهم این است که چطور آن‌ها را مدیریت می‌کنید: شناسایی در تست‌ها، گزارش دقیق (با توضیح، log، screenshot، گام‌های بازتولید)، triage بر اساس شدت (severity) و اولویت (priority)، communicate کردن وضعیت با تیم و برنامه‌ریزی برای رفع آن‌ها در sprintها یا جلسات bug bash.
- **مثال**: اگر در یک فروشگاه آنلاین، یک باگ باعث شود سبد خرید درست کار نکند، باید آن را با جزئیات گزارش کنید، severity آن را «بالا» بگذارید چون روی خرید تأثیر مستقیم دارد، و در برنامه‌ی sprint بعدی (یا حتی به صورت hotfix) برای رفع آن اقدام کنید.
- **لینک برای جزئیات بیشتر**: [Ask AI: Bug Management and Resolution](https://alisol.ir/?ai=Bug%20Management%20and%20Resolution%7CMeaghan%20Lewis%7CProgramming%20Foundations%3A%20Software%20Testing%2FQA%7Cfa)

---

## موضوع ۱۰: ادامه مسیر یادگیری در QA

- **خلاصه**: برای رشد در نقش QA، بهتر است به کتاب‌ها، جامعه‌های آنلاین، ابزارها و رویدادهای تخصصی تست سر بزنید. این کار هم دانش فنی‌ات را بالا می‌برد هم شبکه‌ی ارتباطی‌ات را قوی‌تر می‌کند.
- **مثال**: می‌توانی به جامعه‌هایی مثل Ministry of Testing بپیوندی، در کنفرانس‌هایی مثل Test Bash شرکت کنی، یا در مورد ابزارهای automation و performance testing جدید مطالعه و آن‌ها را امتحان کنی.
- **لینک برای جزئیات بیشتر**: [Ask AI: Next Steps in QA Learning](https://alisol.ir/?ai=Next%20Steps%20in%20QA%20Learning%7CMeaghan%20Lewis%7CProgramming%20Foundations%3A%20Software%20Testing%2FQA%7Cfa)

---

## درباره‌ی نویسنده‌ی خلاصه

من *Ali Sol* هستم، Backend Developer.
برای آشنایی بیشتر:

- **وب‌سایت**: [alisol.ir](https://alisol.ir)
- **LinkedIn**: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

