# خلاصه دوره: Learn Laravel Horizon

* **پلتفرم**: Laracasts
* **مدرس**: Andre Madarang
* **مدت‌زمان**: ۳۸ دقیقه
* **تاریخ انتشار**: ۲ نوامبر ۲۰۲۰
* **لینک دوره**: https://laracasts.com/series/learn-laravel-horizon

*این داکیومنت نکات کلیدی دوره رو خلاصه می‌کنه. اگر فرصت داشتی، دیدن خود دوره خیلی توصیه می‌شه.*

## قبل از شروع
- من معمولاً نکات مهم دوره‌های کاربردی رو خلاصه می‌کنم تا هم برای یادگیری اولیه و هم برای مرور سریع، مفید باشه.
- فقط کافیه روی لینک‌های `Ask AI` کلیک کنی تا روی هر بخش که دوست داری، عمیق‌تر تمرکز کنی.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b47981dc -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=courses/laracasts-learn-laravel-horizon) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=courses/laracasts-learn-laravel-horizon) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=courses/laracasts-learn-laravel-horizon) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer) 

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=courses/laracasts-learn-laravel-horizon) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=courses/laracasts-learn-laravel-horizon) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=courses/laracasts-learn-laravel-horizon) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=courses/laracasts-learn-laravel-horizon) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=courses/laracasts-learn-laravel-horizon) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=courses/laracasts-learn-laravel-horizon) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=courses/laracasts-learn-laravel-horizon)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=courses/laracasts-learn-laravel-horizon) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=courses/laracasts-learn-laravel-horizon) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=courses/laracasts-learn-laravel-horizon)
<!-- LH-BUTTONS:END -->

## مبحث ۱: Installation, Usage, and Features

* **خلاصه**: این قسمت اول، تو رو با Laravel Horizon راه می‌اندازه؛ از نصب شروع می‌کند، بعد تنظیم Redis به‌عنوان queue driver و در ادامه، گشت‌وگذار در dashboard و آشنایی با قابلیت‌های اصلیش. Andre توضیح می‌دهد چطور queueها رو کانفیگ کنی، jobها رو مانیتور کنی، خطاها و failed jobها رو ببینی و از ابزارهایی مثل metrics و tag برای زیر نظر گرفتن performance اپلیکیشن استفاده کنی. هدف اینه که مدیریت queueها ساده، قابل‌دیدن و قابل‌فهم بشه.
* **مثال**: فرض کن Horizon رو نصب کردی و worker رو با دستور `php artisan horizon` اجرا کردی. حالا می‌تونی مثلاً ۵۰ تا job برای پردازش ایمیل‌ها یا taskهای کاربران dispatch کنی و همه رو به‌صورت real-time روی dashboard ببینی؛ این که چند تا pending هست، چند تا complete شده و اگر چیزی fail شده، همراه با stack trace برای debug راحت‌تر نمایش داده می‌شه.
* **لینک برای جزئیات بیشتر**: [Ask AI: Installation, Usage, and Features](https://alisol.ir/?ai=Installation%2C%20Usage%2C%20and%20Features%7CAndre%20Madarang%7CLearn%20Laravel%20Horizon|fa)

## مبحث ۲: Horizon Notifications

* **خلاصه**: اینجا Andre سراغ تنظیم notifications می‌رود تا همیشه از مشکلات queue باخبر باشی؛ مثل وقتی که jobها خیلی تو صف منتظر می‌مانند یا مدام fail می‌شوند. یاد می‌گیری چطور alertها را از طریق email، SMS یا Slack برای مواردی مثل طولانی شدن زمان انتظار تنظیم کنی، و چطور به eventهای مربوط به failed job در Laravel گوش بدی تا notificationهای custom خودت را بفرستی. این کار کمک می‌کند بدون این‌که یواشکی queueها باعث downtime شوند، سریع خبردار بشی.
* **مثال**: تصور کن ناگهان ترافیک سایت بالا می‌رود و زمان انتظار queue از ۲ ثانیه بیشتر می‌شود؛ Horizon می‌تواند به‌صورت خودکار یک ایمیل با جزئیات برایت بفرستد تا بتوانی سریع‌تر scale کنی یا processها را زیاد کنی. یا اگر یک job به خاطر مشکل یک سرویس third‑party fail شود، یک alert با نام کلاس job، body و exception trace برایت می‌آید تا سریع مشکل را پیدا و برطرف کنی.
* **لینک برای جزئیات بیشتر**: [Ask AI: Horizon Notifications](https://alisol.ir/?ai=Horizon%20Notifications%7CAndre%20Madarang%7CLearn%20Laravel%20Horizon|fa)

## مبحث ۳: Using Horizon with Laravel Forge

* **خلاصه**: این بخش آخر روی deploy کردن Horizon در محیط production با استفاده از Laravel Forge تمرکز دارد. Andre نشان می‌دهد چطور برای dashboard احراز هویت (authentication) قرار بدهی، چطور daemon تعریف کنی تا workerها همیشه در حال اجرا باشند و چطور در deploy script، دستورات termination را بگذاری. هدف این است که queueها در محیط واقعی، بدون دخالت دستی و بدون دردسر، پایدار و روان کار کنند.
* **مثال**: روی Forge، یک daemon برای اجرای مداوم دستور `php artisan horizon` به‌عنوان کاربر `forge` اضافه می‌کنی. بعد، داخل deploy script، دستور `php artisan horizon:terminate` را قرار می‌دهی تا هر بار که کد جدید deploy می‌کنی، workerها به‌صورت تمیز restart شوند و نسخه جدید کد را بدون downtime اجرا کنند.
* **لینک برای جزئیات بیشتر**: [Ask AI: Using Horizon with Laravel Forge](https://alisol.ir/?ai=Using%20Horizon%20with%20Laravel%20Forge%7CAndre%20Madarang%7CLearn%20Laravel%20Horizon|fa)

برای تجربه کامل‌تر، می‌توانی دوره اصلی را اینجا ببینی: [Learn Laravel Horizon on Laracasts](https://laracasts.com/series/learn-laravel-horizon)

---

**درباره خلاصه‌کننده**

من *Ali Sol* هستم؛ Backend Developer. برای آشنایی بیشتر:
- وب‌سایت: [alisol.ir](https://alisol.ir)
- لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

