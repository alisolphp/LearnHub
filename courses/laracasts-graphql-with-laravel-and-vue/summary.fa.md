# خلاصه دوره: GraphQL با Laravel و Vue

* **پلتفرم**: Laracasts  
* **مدرس**: Andre Madarang  
* **سطح**: پیشرفته  
* **مدت‌زمان**: ۰۲:۵۶:۰۰  
* **تاریخ به‌روزرسانی**: ژانویه ۲۰۲۲  
* **لینک دوره**: https://laracasts.com/series/graphql-with-laravel-and-vue

*این مستند نکات مهم دوره را خلاصه می‌کند. اگر فرصت داری، دیدن خود دوره خیلی پیشنهاد می‌شود.*

## قبل از شروع

- من نکات مهم دوره‌های مفید را خلاصه می‌کنم تا بتوانی سریع یاد بگیری و مرور کنی.
- فقط کافی است روی لینک‌های `Ask AI` کلیک کنی تا هر مبحثی را که می‌خواهی عمیق‌تر بررسی کنی.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=fa&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=fa&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=courses/laracasts-graphql-with-laravel-and-vue)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=fa&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=courses/laracasts-graphql-with-laravel-and-vue) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=fa&src=courses/laracasts-graphql-with-laravel-and-vue)
<!-- LH-BUTTONS:END -->

## مبحث ۱: معرفی GraphQL

* **خلاصه**: در قسمت اول، با مفهوم کلی GraphQL آشنا می‌شوی و این‌که چطور به‌عنوان یک جایگزین مدرن برای REST API در نظر گرفته می‌شود. این قسمت روی این تمرکز دارد که چطور با queryها دقیقا همان داده‌ای را که لازم داری بگیری؛ با مثال‌هایی از APIهای عمومی مثل GitHub، سرویس‌های آب‌وهوا و پایگاه‌های داده فیلم. همچنین می‌بینی که داشتن یک endpoint واحد و syntax ساده، کار با GraphQL را نسبت به چندین endpoint در REST راحت‌تر می‌کند.
* **مثال**: نوشتن یک query برای GitHub تا repositoryهای یک کاربر را همراه با فیلدهایی مثل name و URL برگرداند، و بعد گسترش آن برای گرفتن followers یا bio — همه در یک درخواست؛ تا نشان بدهد GraphQL چطور مشکل over-fetching را حل می‌کند.
* **لینک برای جزئیات بیشتر**: [Ask AI: Introduction to GraphQL](https://alisol.ir/?ai=Introduction%20to%20GraphQL%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue|fa)

## مبحث ۲: queryهای Lighthouse برای Postها

* **خلاصه**: در این قسمت، یک اپ Laravel راه‌اندازی می‌کنیم و از پکیج Lighthouse برای پیاده‌سازی GraphQL در backend استفاده می‌کنیم. ساختن modelها، تعریف relationshipها و نوشتن فایل schema برای typeهایی مثل User و Post توضیح داده می‌شود. با استفاده از directiveها می‌توانیم خیلی راحت داده‌ها را واکشی کنیم، و با GraphQL Playground queryها را (مثلا برای گرفتن postها با pagination و sort) تست می‌کنیم.
* **مثال**: تعریف type مربوط به Post با فیلدهایی مثل title و body، اضافه کردن directive‏ ‎@belongsTo برای رابطه user، و نوشتن یک query برای گرفتن تمام postها مرتب‌شده بر اساس تاریخ ساخت، با کمک ‎@paginate و ‎@orderBy.
* **لینک برای جزئیات بیشتر**: [Ask AI: Lighthouse Queries for Posts](https://alisol.ir/?ai=Lighthouse%20Queries%20for%20Posts%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue|fa)

## مبحث ۳: mutationهای Lighthouse برای Postها

* **خلاصه**: در ادامه queryها، این بخش روی نوشتن mutationها برای ایجاد (create)، ویرایش (update) و حذف (delete) postها تمرکز می‌کند. با directiveهایی مثل ‎@create، ‎@update و ‎@delete کار می‌کنیم و ruleهای validation اضافه می‌کنیم تا ورودی‌هایی مثل title و body مطابق نیازها باشند.
* **مثال**: یک mutation به نام createPost که title و body را به‌عنوان ورودی می‌گیرد، از ‎@create و ‎@rules برای validation (مثلا required و min:3) استفاده می‌کند و در نهایت id و جزئیات post جدید را برمی‌گرداند.
* **لینک برای جزئیات بیشتر**: [Ask AI: Lighthouse Mutations for Posts](https://alisol.ir/?ai=Lighthouse%20Mutations%20for%20Posts%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue|fa)

## مبحث ۴: Resolvers در Lighthouse

* **خلاصه**: وقتی directiveهای آماده کافی نباشند، resolverها به ما اجازه می‌دهند منطق دلخواه خودمان را به queryها و mutationها اضافه کنیم. در این قسمت، نحوه ساخت resolver و استفاده از آن برای کارهایی مثل sort سفارشی یا انجام کارهای اضافه هنگام عملیات روی داده‌ها توضیح داده می‌شود.
* **مثال**: ساخت یک resolver برای query مربوط به posts که آن‌ها را واکشی کند و بر اساس آخرین پست‌ها sort کند، یا یک resolver برای createPost که بعد از ذخیره پست، یک رویداد مثل ارسال email را لاگ یا اجرا کند.
* **لینک برای جزئیات بیشتر**: [Ask AI: Lighthouse Resolvers](https://alisol.ir/?ai=Lighthouse%20Resolvers%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue|fa)

## مبحث ۵: درخواست‌های ساده AJAX به GraphQL

* **خلاصه**: در این قسمت، می‌رویم سراغ سمت client و می‌بینیم که در نهایت، GraphQL فقط یک درخواست POST است. با Vue می‌توانی با fetch یا Axios به endpoint مربوط به GraphQL query و mutation بفرستی و JSON برگشتی را مدیریت کنی.
* **مثال**: در یک component از Vue، با استفاده از fetch یک POST به /graphql می‌زنیم تا یک query برای گرفتن posts بفرستیم، response را parse می‌کنیم و titleها را در یک لیست نمایش می‌دهیم — مناسب برای جاهایی که نمی‌خواهی سراغ libraryهای کامل‌تر بروی.
* **لینک برای جزئیات بیشتر**: [Ask AI: Simple AJAX Requests to GraphQL](https://alisol.ir/?ai=Simple%20AJAX%20Requests%20to%20GraphQL%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue|fa)

## مبحث ۶: درخواست‌های GraphQL از داخل Laravel

* **خلاصه**: اگر بخواهی از یک اپ Laravel دیگر به GraphQL درخواست بفرستی، می‌توانی از HTTP client داخلی Laravel استفاده کنی. در اینجا نحوه فرستادن query به‌صورت JSON و پردازش پاسخ را می‌بینی؛ چیزی که برای ارتباط server-to-server خیلی کاربردی است.
* **مثال**: نوشتن کدی مثل  
  `HTTP::post('/graphql', ['query' => '{ posts { title } }'])->json()`  
  برای گرفتن و نمایش titleهای postها در یک Blade view.
* **لینک برای جزئیات بیشتر**: [Ask AI: GraphQL Requests from Laravel](https://alisol.ir/?ai=GraphQL%20Requests%20from%20Laravel%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue|fa)

## مبحث ۷: Authentication در Lighthouse

* **خلاصه**: برای امن کردن GraphQL API از Sanctum جهت auth مبتنی بر token استفاده می‌کنیم. mutationهایی برای login، logout و ثبت‌نام می‌سازیم و با directiveهایی مثل ‎@guard queryهای حساس را محافظت می‌کنیم تا id کاربر لاگین‌شده به‌صورت خودکار تزریق شود.
* **مثال**: یک mutation برای login که credentialها را validate می‌کند، با `$user->createToken()` یک token می‌سازد و آن را برای استفاده در header درخواست‌ها برمی‌گرداند.
* **لینک برای جزئیات بیشتر**: [Ask AI: Authentication in Lighthouse](https://alisol.ir/?ai=Authentication%20in%20Lighthouse%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue|fa)

## مبحث ۸: Authentication در Vue Apollo

* **خلاصه**: در سمت Vue، tokenها را بعد از login در localStorage ذخیره می‌کنیم و آن‌ها را در header درخواست‌ها می‌فرستیم. این قسمت flowهای login، ثبت‌نام و logout را به‌صورت دستی پیاده می‌کند، چون در Vue Apollo v4 باید خودمان این بخش‌ها را کنترل کنیم.
* **مثال**: بعد از یک mutation موفق برای login، اجرای  
  `localStorage.setItem('apollo-token', data.login.token)`  
  و redirect کاربر؛ سپس در تنظیمات ApolloClient از یک تابع مثل getHeaders استفاده می‌کنیم تا header مربوط به Authorization: Bearer اضافه شود.
* **لینک برای جزئیات بیشتر**: [Ask AI: Authentication in Vue Apollo](https://alisol.ir/?ai=Authentication%20in%20Vue%20Apollo%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue|fa)

## مبحث ۹: Authorization در Server

* **خلاصه**: برای این‌که هر کاربر فقط بتواند کارهای مجاز خودش را انجام دهد، از directiveهایی مثل ‎@can که به policyهای Laravel متصل هستند استفاده می‌کنیم. این کار update، delete و queryهای مخصوص admin را محافظت می‌کند و جایی که لازم است جزئیات مربوط به کاربر لاگین‌شده را تزریق می‌کند.
* **مثال**: در mutation مربوط به updatePost، دستور ‎@can(ability: "update", find: "id") بررسی می‌کند که آیا ‎$user->id با ‎$post->user_id (طبق policy) برابر هست یا نه.
* **لینک برای جزئیات بیشتر**: [Ask AI: Authorization on the Server](https://alisol.ir/?ai=Authorization%20on%20the%20Server%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue|fa)

## مبحث ۱۰: لینک‌های Authorization در Client

* **خلاصه**: در frontend می‌توانیم لینک‌ها و دکمه‌هایی مثل لینک ویرایش را بر اساس وضعیت auth نمایش بدهیم یا مخفی کنیم و کاربران غیرمجاز را از صفحات خاص redirect کنیم. برای این کار معمولا user حال حاضر را با owner داده (مثلا post.user.id) یا نقش او (مثلا isAdmin) مقایسه می‌کنیم.
* **مثال**: در template، استفاده از شرطی مثل  
  `v-if="post.user.id === me.id"`  
  برای نمایش لینک ویرایش فقط برای صاحب پست؛ و استفاده از یک watcher برای redirect کردن کاربر از صفحه admin اگر `!me.isAdmin` باشد.
* **لینک برای جزئیات بیشتر**: [Ask AI: Authorization Links on the Client](https://alisol.ir/?ai=Authorization%20Links%20on%20the%20Client%7CAndre%20Madarang%7CGraphQL%20with%20Laravel%20and%20Vue|fa)

---

## درباره خلاصه‌کننده

من *Ali Sol* هستم، یک Backend Developer. برای آشنایی بیشتر:

- وب‌سایت: [alisol.ir](https://alisol.ir)
- لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

