# خلاصه دوره: Laravel Queue Mastery

* **پلتفرم**: Laracasts
* **مدرس**: Mohamed Said
* **مدت**: ۰۱:۴۱:۰۰
* **تاریخ انتشار**: ۷ ژوئن ۲۰۲۱
* **لینک دوره**: https://laracasts.com/series/laravel-queue-mastery

*این فایل، نکات مهم دوره رو خلاصه می‌کند. اگر فرصت داری، دیدن خود دوره خیلی مفیدتر است.*

## پیش از شروع
- من معمولاً نکات کلیدی دوره‌های مفید را خلاصه می‌کنم تا هم برای یادگیری اولیه و هم مرور سریع به‌درد بخورند.
- برای اینکه در هر بخش عمیق‌تر بشوی، کافی است روی لینک‌های «Ask AI» کلیک کنی.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b47981dc -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=courses/laracasts-laravel-queue-mastery) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=courses/laracasts-laravel-queue-mastery) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=courses/laracasts-laravel-queue-mastery) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer) 

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=courses/laracasts-laravel-queue-mastery) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=courses/laracasts-laravel-queue-mastery) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=courses/laracasts-laravel-queue-mastery) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=courses/laracasts-laravel-queue-mastery) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=courses/laracasts-laravel-queue-mastery) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=courses/laracasts-laravel-queue-mastery) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=courses/laracasts-laravel-queue-mastery)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=courses/laracasts-laravel-queue-mastery) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=courses/laracasts-laravel-queue-mastery) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=courses/laracasts-laravel-queue-mastery)
<!-- LH-BUTTONS:END -->

## صف‌ها در عمل (Dispatching and Running Jobs)

* **خلاصه**: این بخش توضیح می‌دهد چطور کارهای زمان‌بر را به‌صورت async با Queue انجام بدهی. یاد می‌گیری یک Job بسازی، آن را Dispatch کنی، Driver دیتابیس برای Queue تنظیم کنی و Worker را برای پردازش Jobها در پس‌زمینه بالا بیاوری تا پاسخ HTTP سریع به کاربر برگردد.
* **مثال**: فرض کن می‌خواهی یک ایمیل خوش‌آمدگویی بفرستی که چند ثانیه طول می‌کشد؛ یک Job به اسم `SendWelcomeEmail` با دستور `php artisan make:job SendWelcomeEmail` بساز، داخل متد `handle` مثلاً `sleep(3)` بگذار تا کار سنگین را شبیه‌سازی کند، بعد با `dispatch(new SendWelcomeEmail())` آن را Dispatch کن و با اجرای `php artisan queue:work` کاری کن که در پس‌زمینه پردازش شود، بدون اینکه پاسخ HTTP معطل بماند.
* **لینک برای جزئیات بیشتر**: [از AI بپرس: Dispatching and Running Jobs](https://alisol.ir/?ai=Dispatching%20and%20Running%20Jobs%7CMohamed%20Said%7CLaravel%20Queue%20Mastery|fa)

## تنظیم Jobها (Configuring Jobs)

* **خلاصه**: این بخش دربارهٔ تنظیم رفتار Jobهاست؛ مثلاً Delay دادن قبل از اجرا، تعیین Timeout برای جلوگیری از گیرکردن Job، تنظیم تعداد Retry در صورت Failure و استفاده از Backoff برای فاصله‌گذاری هوشمند بین Retryها.
* **مثال**: اگر Jobی داری که احتمالاً گیر می‌کند، می‌توانی `public $timeout = 1;` روی کلاس Job ست کنی و در `handle` از `sleep(3)` استفاده کنی. وقتی Job را Dispatch کنی، Worker بعد از ۱ ثانیه آن را Terminate می‌کند و Job به‌عنوان Failed علامت می‌خورد؛ این نشان می‌دهد Timeout چطور سیستم را محافظت می‌کند.
* **لینک برای جزئیات بیشتر**: [از AI بپرس: Configuring Jobs](https://alisol.ir/?ai=Configuring%20Jobs%7CMohamed%20Said%7CLaravel%20Queue%20Mastery|fa)

## مدیریت تلاش‌ها و خطاها (Handling Attempts Failures)

* **خلاصه**: این بخش روی مدیریت Failureها تمرکز دارد؛ از جمله Retry خودکار همراه با Backoff، برگرداندن دستی Job به Queue، تفاوت Release شدن Job با Failure ناشی از Exception و نوشتن کد دلخواه وقتی Job در نهایت Fail می‌شود.
* **مثال**: در متد `handle` یک Exception پرتاب کن و روی Job مقادیر `public $tries = 3;` و `public $backoff = 2;` بگذار. Worker این Job را ۳ بار Retry می‌کند و بین هر تلاش ۲ ثانیه صبر می‌کند. اگر همچنان Fail شود، متد `failed` اجرا می‌شود و می‌توانی آنجا خطا را Log یا هندل کنی.
* **لینک برای جزئیات بیشتر**: [از AI بپرس: Handling Attempts Failures](https://alisol.ir/?ai=Handling%20Attempts%20Failures%7CMohamed%20Said%7CLaravel%20Queue%20Mastery|fa)

## مدیریت Workflowها (Dispatching Workflows)

* **خلاصه**: این بخش دربارهٔ گروه‌بندی Jobها در قالب Workflow است؛ Chain برای اجراهای ترتیبی (که در صورت Fail شدن یکی، بقیه متوقف می‌شوند) و Batch برای اجرای موازی، همراه با امکاناتی برای هندل شکست‌ها و Track کردن وضعیت در دیتابیس.
* **مثال**: برای یک پروسهٔ Deployment می‌توانی از این ساختار استفاده کنی:

  ```php
  Bus::chain([
      new PullRepo(),
      new RunTests(),
      new Deploy(),
  ])->dispatch();
  ```
  
  اگر تست‌ها Fail شوند، مرحلهٔ Deploy اجرا نمی‌شود و این باعث می‌شود فرایند روی خطا متوقف شود.
* **لینک برای جزئیات بیشتر**: [از AI بپرس: Dispatching Workflows](https://alisol.ir/?ai=Dispatching%20Workflows%7CMohamed%20Said%7CLaravel%20Queue%20Mastery|fa)

## ؜Workflowهای پیشرفته‌تر (More Complex Workflows)

* **خلاصه**: روی مباحث قبلی سوار می‌شود و نشان می‌دهد چطور Callbackهای مخصوص Failure (`catch`)، موفقیت (`then`) و تکمیل (`finally`) را روی Chain و Batchها تنظیم کنی، و همین‌طور چطور Chainها را داخل Batch یا برعکس، تو در تو کنی.
* **مثال**: یک Batch با دو Chain Dispatch کن:

  ```php
  Bus::batch([
      [new PullRepoProject1(), new RunTestsProject1()],
      [new PullRepoProject2(), new RunTestsProject2()],
  ])->dispatch();
  ```
  
  هر پروژه به‌صورت موازی پردازش می‌شود، اما مراحل داخل هر پروژه به‌صورت ترتیبی اجرا می‌شوند.
* **لینک برای جزئیات بیشتر**: [از AI بپرس: More Complex Workflows](https://alisol.ir/?ai=More%20Complex%20Workflows%7CMohamed%20Said%7CLaravel%20Queue%20Mastery|fa)

## کنترل و محدود کردن Jobها (Controlling and Limiting Jobs)

* **خلاصه**: این بخش دربارهٔ جلوگیری از Race Conditionها است؛ با استفاده از Atomic Lock، Redis Funnel برای محدود کردن Concurrency، Throttle برای Rate Limiting و Middlewareهایی مثل `WithoutOverlapping` برای جلوگیری از اجرای هم‌زمان Jobهای مشابه.
* **مثال**: در یک Job مربوط به Deployment می‌توانی از Lock استفاده کنی:

  ```php
  Cache::lock('deployments')->block(10, function () {
      // deployment code
  });
  ```
  
  اگر Worker دیگری هم‌زمان بخواهد Deploy انجام بدهد، مجبور است منتظر بماند یا Fail شود و این‌طوری از Conflict روی فایل‌ها جلوگیری می‌شود.
* **لینک برای جزئیات بیشتر**: [از AI بپرس: Controlling and Limiting Jobs](https://alisol.ir/?ai=Controlling%20and%20Limiting%20Jobs%7CMohamed%20Said%7CLaravel%20Queue%20Mastery|fa)

## تنظیمات بیشتر Jobها (More Job Configurations)

* **خلاصه**: در این بخش با مفهوم Unique بودن Jobها برای جلوگیری از Jobهای تکراری در Queue آشنا می‌شوی، همین‌طور Circuit Breaker با Middleware مثل `ThrottlesExceptions` برای Pause کردن در صورت تکرار خطاها و این‌که چه زمانی Lock مربوط به Unique بودن آزاد شود.
* **مثال**: اگر روی کلاس Job از Interface `ShouldBeUnique` استفاده کنی، هرچقدر هم که آن را Dispatch کنی، فقط یک نمونه در Queue قرار می‌گیرد؛ این برای کارهایی مثل Sync کردن دیتا عالی است که نسخه‌های تکراری فقط منابع را هدر می‌دهند.
* **لینک برای جزئیات بیشتر**: [از AI بپرس: More Job Configurations](https://alisol.ir/?ai=More%20Job%20Configurations%7CMohamed%20Said%7CLaravel%20Queue%20Mastery|fa)

## طراحی Jobهای قابل‌اعتماد (Designing Reliable Jobs)

* **خلاصه**: چند نکته برای طراحی Jobهای مقاوم و Reliable: Dispatch کردن Job بعد از Commit شدن تراکنش دیتابیس، نگه داشتن Job به‌صورت Self-contained و بدون وابستگی به State بیرونی، کم کردن Dependencyها و Encrypt کردن داده‌های حساس داخل Payload.
* **مثال**: وقتی داخل یک Transaction دیتابیس هستی، می‌توانی Job را با `->afterCommit()` Dispatch کنی؛ در این حالت Job فقط وقتی وارد Queue می‌شود که Transaction با موفقیت Commit شده باشد، و این از سناریوهایی مثل ارسال ایمیل برای کاربری که در نهایت در دیتابیس ذخیره نشده جلوگیری می‌کند.
* **لینک برای جزئیات بیشتر**: [از AI بپرس: Designing Reliable Jobs](https://alisol.ir/?ai=Designing%20Reliable%20Jobs%7CMohamed%20Said%7CLaravel%20Queue%20Mastery|fa)

## ؜Deploymentها (Deployments)

* **خلاصه**: در این بخش با مدیریت Workerها هنگام Deployment آشنا می‌شوی؛ مثلاً استفاده از Supervisor برای Monitoring، دستور `queue:restart` برای بارگذاری مجدد کد و استفاده از امکانات Supervisor برای خاموش کردن آرام Workerها تا Jobهای در حال اجرا نشکنند.
* **مثال**: می‌توانی در اسکریپت Deployment این دستور را اضافه کنی:

  ```bash
  php artisan queue:restart
  ```
  
  بعد از Deploy نسخهٔ جدید، Workerها به‌صورت Graceful خارج می‌شوند و دوباره با کدهای جدید بالا می‌آیند و این باعث می‌شود همه‌چیز Consistent بماند.
* **لینک برای جزئیات بیشتر**: [از AI بپرس: Deployments](https://alisol.ir/?ai=Deployments%7CMohamed%20Said%7CLaravel%20Queue%20Mastery|fa)

## مقیاس‌پذیری Workerها (Scaling Workers)

* **خلاصه**: این بخش توضیح می‌دهد چطور Workerها را پویا Scale کنی؛ با Cron برای اجرای دوره‌ای Workerهای اضافی، Supervisor برای Pool ثابت از Workerها و Horizon برای Auto-balancing بر اساس تعداد Jobهای Queue و زمان پردازش.
* **مثال**: یک Cron Job تنظیم کن که هر ۱۰ دقیقه این دستور را اجرا کند:

  ```bash
  php artisan queue:work --stop-when-empty --max-time=540
  ```
  
  این دستور یک Worker راه می‌اندازد که اگر Queue خالی باشد یا بعد از ۹ دقیقه، خودش را متوقف می‌کند. این کار باعث می‌شود متناسب با Load سیستم، Workerها بالا بیایند بدون اینکه سرور تحت فشار شدید قرار بگیرد.
* **لینک برای جزئیات بیشتر**: [از AI بپرس: Scaling Workers](https://alisol.ir/?ai=Scaling%20Workers%7CMohamed%20Said%7CLaravel%20Queue%20Mastery|fa)

## رفرنس تنظیمات (Configurations Reference)

* **خلاصه**: در این قسمت یک مرور جامع روی گزینه‌های `queue:work` (مثل Timeout، مقدار Sleep، محدودیت Memory) و Propertyهای Job (مثل Connection، Retry، Unique بودن و غیره) انجام می‌شود تا بتوانی تنظیمات Queue را دقیق‌تر Fine-tune کنی.
* **مثال**: استفاده از `--sleep=1` در دستور `queue:work` باعث می‌شود Worker با فاصلهٔ ۱ ثانیه‌ای برای Job جدید چک کند؛ این کار Latency را کم می‌کند اما مصرف CPU را بالا می‌برد، و برای Queueهای با Priority بالا مناسب است.
* **لینک برای جزئیات بیشتر**: [از AI بپرس: Configurations Reference](https://alisol.ir/?ai=Configurations%20Reference%7CMohamed%20Said%7CLaravel%20Queue%20Mastery|fa)

## پشت‌صحنهٔ Queueها (Under the Hood)

* **خلاصه**: این بخش نگاهی به درون هستهٔ Queueهای Laravel دارد؛ این‌که Dispatch چطور Job را Serialize می‌کند، Workerها چطور آن را با Timeout و Eventهای مختلف پردازش می‌کنند و مسیر Job از لحظهٔ Dispatch تا اجرای `handle` دقیقاً چطور است.
* **مثال**: Helper مربوط به `dispatch` از Trait‌ای به نام `Dispatchable` استفاده می‌کند تا یک Pending Dispatch بسازد، Job و داده‌هایش را برای ذخیره در Queue Serialize کند و بعد Worker آن را Unserialize کرده و از طریق `CallQueuedHandler` اجرا می‌کند.
* **لینک برای جزئیات بیشتر**: [از AI بپرس: Under the Hood](https://alisol.ir/?ai=Under%20the%20Hood%7CMohamed%20Said%7CLaravel%20Queue%20Mastery|fa)

برای مشاهدهٔ دورهٔ کامل می‌توانی به این لینک سر بزنی: https://laracasts.com/series/laravel-queue-mastery

---

## دربارهٔ خلاصه‌کننده

من *Ali Sol* هستم؛ Backend Developer.
- وب‌سایت: [alisol.ir](https://alisol.ir)
- لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

