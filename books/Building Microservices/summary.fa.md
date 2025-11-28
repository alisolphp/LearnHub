# خلاصه کتاب: Building Microservices

* **نویسنده**: Sam Newman  
* **ژانر**: مهندسی نرم‌افزار  
* **تاریخ انتشار**: فوریه ۲۰۱۵  

این فایل خلاصه‌ی مهم‌ترین درس‌ها و نکته‌های این کتاب است تا بتوانی سریع‌تر یاد بگیری و راحت‌تر مرور کنی. برای درک عمیق‌تر موضوع، خواندن متن کامل کتاب کاملاً توصیه می‌شود.

## قبل از شروع

- من معمولاً از کتاب‌های مفید، خلاصه تهیه می‌کنم تا هم یادگیری سریع‌تر شود هم مرور دوباره ساده‌تر.  
- بعد از هر بخش، می‌توانی روی لینک‌های `Ask AI` کلیک کنی و در مورد همان بخش سؤال‌های عمیق‌تر بپرسی.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=005796ea -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=books/Building%20Microservices) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=books/Building%20Microservices) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=books/Building%20Microservices) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=books/Building%20Microservices) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=books/Building%20Microservices) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=books/Building%20Microservices) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=books/Building%20Microservices) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=books/Building%20Microservices) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=books/Building%20Microservices) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=books/Building%20Microservices)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=books/Building%20Microservices) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=books/Building%20Microservices) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=books/Building%20Microservices)
<!-- LH-BUTTONS:END -->

---

## 1. مایکروسرویس‌ها

**خلاصه**: این فصل توضیح می‌دهد Microservice دقیقاً چیست: سرویس‌های کوچک، مستقل و خودمختار که هر کدام روی یک کار مشخص تمرکز دارند و از طریق شبکه با هم صحبت می‌کنند. ایده اصلی این است که به‌جای یک سیستم بزرگ و سنگین (Monolith)، سیستم را به تکه‌های قابل مدیریت تقسیم کنیم که بتوانند مستقل از هم توسعه پیدا کنند. مزایا شامل آزادی بیشتر در انتخاب تکنولوژی برای هر بخش، مقاومت بیشتر در برابر خطا (خرابی یک سرویس کل سیستم را نمی‌خواباند)، امکان Scale کردن فقط بخش‌های پرمصرف، Deployment سریع‌تر و هم‌راست شدن بهتر ساختار تیم‌ها با کد است.  
بااین‌حال Microservices «گلوله نقره‌ای» نیستند و دردسرهای دنیای سیستم‌های توزیع‌شده (Distributed Systems) مثل Latency، Network Failure، Data Consistency و … را هم با خودشان می‌آورند. فصل اول Microservices را با رویکردهایی مثل Service-Oriented Architecture، کتابخانه‌های مشترک و ساختار ماژولار مقایسه می‌کند و نشان می‌دهد چرا Microservices در دنیای واقعی انعطاف‌پذیری بیشتری می‌دهند.

**مثال**: فرض کن یک فروشگاه آنلاین موسیقی مثل MusicCorp داری. به‌جای اینکه یک اپلیکیشن عظیم داشته باشی که همه‌چیز از مدیریت موجودی تا پرداخت را انجام دهد، سیستم را به سرویس‌های جدا تقسیم می‌کنی: یک سرویس برای حساب کاربری، یکی برای بررسی موجودی، یکی برای پرداخت و… . هر کدام جداگانه Deploy می‌شوند و اگر Payment سرویس دچار مشکل شد، بخش‌های دیگر مثل جستجو یا مرور کاتالوگ هنوز کار می‌کنند.

**Link for More Details**:  
[Ask AI: Microservices](https://alisol.ir/?ai=Microservices%7CSam%20Newman%7CBuilding%20Microservices|fa)

---

## 2. معمار تکاملی

**خلاصه**: در معماری Microservices، معمار شبیه «شهرساز» است؛ قرار نیست فقط چند تا Box روی Diagram بکشد، بلکه باید مسیری را طراحی کند که سیستم بتواند در طول زمان تکامل پیدا کند. ایده‌ی Zoning در معماری یعنی بخش‌های مختلف سیستم را طوری تقسیم کنیم که هر قسمت قوانین و محدودیت‌های مشخص خودش را داشته باشد. معمار باید اصول و Guidelineهایی تعریف کند تا تیم‌ها بتوانند مستقل تصمیم بگیرند، ولی همچنان کیفیت کلی سیستم حفظ شود؛ مثل استفاده از Circuit Breaker، APIهای تمیز، Monitoring و Automation.  
؜Governance (حاکمیت معماری) بهتر است از طریق مثال‌ها، Templateها و Code Sampleها انجام شود تا با دستورالعمل‌های خشک و دستوری از بالا. مدیریت Technical Debt هم بخش مهمی است؛ باید بدانی کجا بدهی فنی را قبول کنی و کجا حتماً باید آن را کاهش دهی. معمار خوب، درگیر کد هم هست و فقط روی اسلاید کار نمی‌کند.

**مثال**: تصور کن در حال طراحی یک محله جدید هستی؛ قوانینی مثل «در این منطقه اجازه ساخت برج خیلی بلند نداریم» را تعیین می‌کنی تا با نیازهای آن قسمت هماهنگ باشد، ولی به ساکن‌ها آزادی می‌دهی که داخل این چارچوب خانه‌هایشان را مطابق سلیقه خودشان تغییر دهند. اگر اتفاق بدی بیفتد (مثلاً یک ساختمان مشکل ساز شود)، سازوکاری داری که جلوی سرایت مشکل به کل شهر را بگیرد.

**Link for More Details**:  
[Ask AI: The Evolutionary Architect](https://alisol.ir/?ai=The%20Evolutionary%20Architect%7CSam%20Newman%7CBuilding%20Microservices|fa)

---

## 3. چطور سرویس‌ها را مدل کنیم

**خلاصه**: مهم‌ترین بخش در طراحی Microservices این است که مرز سرویس‌ها را درست انتخاب کنیم. این فصل بر پایه Domain-Driven Design (DDD) توضیح می‌دهد که باید به‌دنبال Loose Coupling و High Cohesion باشیم. ابزار کلیدی اینجا Bounded Context است؛ یعنی مدل‌های مرتبط را در یک Context قرار بدهیم تا جزئیات داخلی آن از بیرون پنهان بماند و فقط چیزهایی که لازم است Shared شوند بیرون داده شود.  
نباید خیلی زود شروع به خرد کردن سیستم به سرویس‌های ریز کنیم؛ بهتر است سرویس‌ها را حول «قابلیت‌های کسب‌وکار» (Business Capabilities) بسازیم، نه حول لایه‌های تکنیکی مثل UI/DB. همچنین، مرزهای تکنیکی همیشه با مرزهای دامنه یکی نیستند؛ گاهی باید از دید بیزینس نگاه کرد، نه صرفاً از دید کد.

**مثال**: در MusicCorp، مفهوم «Customer» در بخش فروش یعنی اطلاعات پرداخت و آدرس ارسال، ولی در بخش مارکتینگ یعنی سلیقه و Preferenceها. در DDD، برای هرکدام یک Bounded Context جدا تعریف می‌کنی تا تغییرات یکی، باعث شکنندگی همه‌جا نشود.

**Link for More Details**:  
[Ask AI: How to Model Services](https://alisol.ir/?ai=How%20to%20Model%20Services%7CSam%20Newman%7CBuilding%20Microservices|fa)

---

## 4. یکپارچه‌سازی سرویس‌ها

**خلاصه**: نحوه Integration بین Microservices می‌تواند باعث موفقیت یا شکست معماری شود. هدف این است که APIهایی طراحی کنیم که Tech-Agnostic باشند (به تکنولوژی خاصی وابسته نباشند)، جزئیات داخلی را مخفی کنند و کار برای Consumerها را راحت کنند. به‌طور کلی باید از Shared Database بین چند سرویس دوری کنیم.  
در بحث Communication، باید بین Sync و Async تعادل پیدا کنیم. الگوی Choreography (رویدادمحور) باعث می‌شود وابستگی مستقیم کاهش پیدا کند، درحالی‌که Orchestration یک نقطه کنترل مرکزی می‌سازد. RPC می‌تواند کاربرد داشته باشد ولی می‌تواند شکننده شود؛ REST (به‌خصوص با Hypermedia) انعطاف بیشتری می‌دهد، هرچند برای همه سناریوها ایده‌آل نیست.  
؜Versioning هم مهم است؛ می‌توانی از Semantic Versioning و Endpointهای هم‌زمان (Multiple Versions) استفاده کنی. برای UI، می‌توانی از Backend for Frontend یا ترکیب Fragmentهای مختلف استفاده کنی. برای Integration سیستم‌های Legacy یا Third-Party، الگوی Strangler Pattern کمک می‌کند که سیستم قدیمی را کم‌کم بپیچی و جایگزین کنی.

**مثال**: در MusicCorp اگر Inventory Service لازم است به Shipping Service خبر بدهد که موجودی تغییر کرده، به‌جای Call مستقیم، یک Event می‌فرستد (Async Choreography). Shipping خودش Subscriber است و بدون وابستگی سفت و سخت، واکنش نشان می‌دهد.

**Link for More Details**:  
[Ask AI: Integration](https://alisol.ir/?ai=Integration%7CSam%20Newman%7CBuilding%20Microservices|fa)  

[یادداشت شخصی: REST اینجا خیلی خوب جواب می‌دهد، ولی برای اپ‌هایی با نیازهای پیچیده در سطح داده، GraphQL می‌تواند به Clientها اجازه دهد دقیقاً همان داده مورد نیازشان را بگیرند و تعداد Round Tripها را کم کند.]

---

## 5. شکستن Monolith

**خلاصه**: وقتی سیستم فعلی‌ات یک Monolith بزرگ است، باید «درزها» (Seams) را پیدا کنی؛ یعنی جاهایی که منطقی‌تر است سیستم از آنجا جدا شود؛ مثلاً بر اساس سرعت تغییر، ساختار تیم، یا Boundaries دامنه. دیتابیس معمولاً سخت‌ترین بخش ماجراست؛ باید به‌تدریج Foreign Keyها را بشکنی، داده‌های Shared را با روش‌هایی مثل Data Pump یا Staging Table مدیریت کنی.  
برای Transactionها، به‌جای Distributed Transactionهای پیچیده، معمولاً بهتر است از Retry، Compensation و Eventual Consistency استفاده کنی. برای Reporting، بهتر است یک دیتابیس مستقل داشته باشی که از طریق Event یا Data Pump تغذیه شود تا Queryهای سنگین Report، سیستم اصلی را اذیت نکنند.

**مثال**: اگر Monolith موسیقی‌فروشی‌ات Customer و Order را به‌شدت به هم گره زده، می‌توانی از محدوده Order شروع کنی، آن را به یک سرویس مستقل تبدیل کنی و از Data Pump برای انتقال داده‌ی لازم به دیتابیس Report استفاده کنی، بدون اینکه سرویس جدید مستقیم به دیتابیس Monolith وصل شود.

**Link for More Details**:  
[Ask AI: Splitting the Monolith](https://alisol.ir/?ai=Splitting%20the%20Monolith%7CSam%20Newman%7CBuilding%20Microservices|fa)

---

## 6. دیپلوی کردن Microservices

**خلاصه**: در دنیای Microservices، Continuous Integration (CI) و Delivery حیاتی است. هر سرویس Pipeline مخصوص خودش را دارد تا بتوانی آن را مستقل Build، Test و Deploy کنی. استفاده از Artifactهای قابل تکرار (مثل Imageها) باعث می‌شود محیط‌ها ثابت‌تر و Deployها قابل پیش‌بینی‌تر شوند.  
؜Automation تا حد ممکن باید همه‌چیز را پوشش دهد: ایجاد محیط، Deploy، Rollback و… . تکنولوژی‌هایی مثل Virtual Machineها، Vagrant و مخصوصاً Docker، کار را برای ساخت محیط‌های یکسان ساده می‌کنند. اگر یک Interface Deploy استاندارد داشته باشی، تیم‌ها راحت‌تر Microserviceهای جدید اضافه می‌کنند.

**مثال**: برای Deploy کردن Catalog Service در MusicCorp، یک Pipeline راه می‌اندازی که کد را تست می‌کند، آن را به یک Docker Image تبدیل می‌کند و بعد آن Image را در محیط Stage/Production Deploy می‌کند، بدون اینکه بقیه سرویس‌ها را لمس کند.

**Link for More Details**:  
[Ask AI: Deployment](https://alisol.ir/?ai=Deployment%7CSam%20Newman%7CBuilding%20Microservices|fa)  

[یادداشت شخصی: Docker هنوز برای Containerها استاندارد است، ولی در ۲۰۲۵ معمولاً آن را با Kubernetes برای Orchestration ترکیب می‌کنند تا Scaling و Handling Failure در سیستم‌های بزرگ‌تر راحت‌تر شود.]

---

## 7. تست در Microservices

**خلاصه**: این فصل طیف انواع تست‌ها را از Unit Test تا End-to-End Test توضیح می‌دهد، ولی تأکید می‌کند که در Microservices بهتر است تمرکز بیشتری روی «Service Test»ها داشته باشی تا بین سرعت و پوشش تعادل برقرار شود.  
برای اینکه هر سرویس را جدا تست کنی، معمولاً از Mock یا Stub برای سرویس‌های دیگر استفاده می‌شود؛ ولی هر چه تست‌ها گسترده‌تر و End-to-Endتر شوند، احتمال Flaky شدن آن‌ها بیشتر است. Consumer-Driven Contract Testها کمک می‌کنند API شکسته نشود؛ یعنی Consumerها Contractهای خودشان را تعریف می‌کنند و اگر Producer آن را بشکند، تست قبل از Deploy Fail می‌شود.  
در مرحله بعد از Production، تکنیک‌هایی مثل Canary Release و جدا کردن Deploy از Release ریسک را کاهش می‌دهد. تست Performance و سایر ویژگی‌های Cross-Functional (مثل Security، Reliability و…) را هم نباید فراموش کرد.

**مثال**: در MusicCorp، مثلاً یک Contract مشخص می‌کند Inventory Service باید چه Responseی برگرداند. اگر توسعه‌دهنده Inventory آن را تغییر دهد، Contract Testها قبل از Deploy شکست می‌خورند و مانع خراب شدن مصرف‌کننده‌ها می‌شوند.

**Link for More Details**:  
[Ask AI: Testing](https://alisol.ir/?ai=Testing%7CSam%20Newman%7CBuilding%20Microservices|fa)

---

## 8. نظارت و پایش سیستم

**خلاصه**: وقتی تعداد سرویس‌ها زیاد می‌شود، دیدن تصویر کلی سیستم بدون Monitoring درست تقریباً غیرممکن است. باید Logها و Metricها را جمع‌آوری و Aggregate کنی تا بتوانی رفتار سیستم را در لحظه درک کنی. استفاده از Correlation ID برای Requestها کمک می‌کند مسیر یک درخواست را در چند سرویس دنبال کنی.  
؜Synthetic Monitoring (شبیه‌سازی کاربر واقعی) به تو کمک می‌کند مشکلات را قبل از کاربر واقعی ببینی. استاندارد کردن Format Logها، تعریف Dashboardهای واضح و تعیین اینکه چه کسی به چه اطلاعاتی دسترسی دارد (Ops، Dev، Product و…) هم مهم است.

**مثال**: اگر Checkout در MusicCorp کند شود، با استفاده از Correlation ID می‌توانی ببینی Request در کدام سرویس گیر کرده است؛ مثلاً متوجه می‌شوی Payment Service کند شده و به‌جای حدس و گمان، دقیقاً همان قسمت را Fix می‌کنی.

**Link for More Details**:  
[Ask AI: Monitoring](https://alisol.ir/?ai=Monitoring%7CSam%20Newman%7CBuilding%20Microservices|fa)

---

## 9. امنیت در Microservices

**خلاصه**: این فصل روی Auth و Security در دو سطح تمرکز می‌کند: کاربر نهایی و سرویس به سرویس. برای کاربران می‌توانی از SSO یا API Gateway برای Authentication/Authorization مرکزی استفاده کنی. بین سرویس‌ها می‌توان از Certificate، HMAC یا Keyهای امن بهره برد و نباید فقط به امنیت «داخل شبکه داخلی» اعتماد کرد.  
برای Data Security، Encryption در حال انتقال و در حالت Rest، مدیریت امن Keyها و Backupهای مطمئن مهم است. معماری باید چند لایه دفاعی داشته باشد: Firewall، Logging مناسب، Intrusion Detection، Segmentation شبکه و Hardening سیستم‌عامل. آموزش تیم، Principle of Least Privilege و تست امنیت توسط ابزارها و تیم‌های مستقل هم ضروری است.

**مثال**: در MusicCorp می‌توانی برای اتصال سرویس‌هایی که با داده حساس کار می‌کنند از TLS و Client Certificate استفاده کنی تا فقط سرویس‌های مورداعتماد بتوانند به آن‌ها متصل شوند و هر دسترسی غیرعادی در Logها ثبت و تحلیل شود.

**Link for More Details**:  
[Ask AI: Security](https://alisol.ir/?ai=Security%7CSam%20Newman%7CBuilding%20Microservices|fa)  

[یادداشت شخصی: برای ارتباط امن، در ۲۰۲۵ بهتر است حداقل از TLS 1.2 و ترجیحاً TLS 1.3 استفاده شود؛ نسخه‌های قدیمی‌تر مثل 1.0 و 1.1 به‌طور کامل منسوخ و ناامن محسوب می‌شوند.]

---

## 10. قانون کانوی و طراحی سیستم

**خلاصه**: قانون Conway می‌گوید ساختار سیستم‌هایی که می‌سازیم، بازتاب ساختار سازمانی ماست. اگر تیم‌ها شدیداً به هم وابسته باشند، سرویس‌ها هم همین‌طور می‌شوند. اگر تیم‌ها مستقل و حول قابلیت‌های مشخص سازماندهی شوند، معماری سیستم هم بیشتر Modular و قابل‌تفکیک می‌شود.  
در Microservices بهتر است تیم‌ها را حول سرویس‌ها یا Domainها شکل بدهیم تا Ownership مشخص باشد. Internal Open Source می‌تواند به همکاری بین تیم‌ها کمک کند، ولی هر سرویس صاحب اصلی خودش را دارد. Feature Teamها هم می‌توانند End-to-End مسئولیت یک قابلیت را داشته باشند. با تغییر ساختار سازمانی، عملاً می‌توانی معماری سیستم را هم تحت‌تأثیر قرار بدهی (معکوس کردن Conway’s Law).

**مثال**: اگر در MusicCorp تیم‌ها را به شکل «UI Team» و «Backend Team» تقسیم کنی، احتمالاً سرویس‌ها هم لایه‌ای و به هم وابسته می‌شوند؛ ولی اگر تیم‌ها را حول قابلیت‌هایی مثل «Checkout» یا «Search» سازماندهی کنی، هر تیم می‌تواند از Front تا DB همان بخش را در اختیار داشته باشد.

**Link for More Details**:  
[Ask AI: Conway’s Law and System Design](https://alisol.ir/?ai=Conway%E2%80%99s%20Law%20and%20System%20Design%7CSam%20Newman%7CBuilding%20Microservices|fa)

---

## 11. مقیاس‌دهی Microservices

**خلاصه**: وقتی تعداد سرویس‌ها و حجم ترافیک زیاد می‌شود، باید فرض را بر این بگذاری که Failure همیشه رخ می‌دهد و هدف را «Antifragile» شدن سیستم بگذاری؛ یعنی سیستم نه‌تنها زنده بماند، بلکه از شکست‌ها یاد بگیرد. ابزارهای کلیدی اینجا Timeouts، Circuit Breaker، Bulkhead و Isolation هستند. برای Scale می‌توانی Load را بین سرویس‌ها تقسیم کنی، از Load Balancer، Auto-Scaling و Caching هوشمند استفاده کنی.  
در لایه Data، الگوهایی مثل CQRS می‌توانند کمک کنند که Read و Write را جدا مدیریت کنی. برای Service Discovery می‌توانی از DNS، Registryهایی مثل Zookeeper، Consul یا در دنیای Kubernetes از etcd و ابزارهای مشابه استفاده کنی. برای مستندسازی APIها، ابزارهایی مثل Swagger/OpenAPI یا Hypermedia Formatهایی مثل HAL برای انسان‌ها و ماشین‌ها مفیدند.

**مثال**: در یک MusicCorp بسیار شلوغ، اگر Search Service مشکل پیدا کند، Circuit Breaker فعال می‌شود و به‌جای Down شدن کل سایت، یک نسخه ساده‌تر از نتایج سرچ یا پیام مناسب نشان داده می‌شود تا تجربه کاربر تا حد ممکن حفظ شود.

**Link for More Details**:  
[Ask AI: Microservices at Scale](https://alisol.ir/?ai=Microservices%20at%20Scale%7CSam%20Newman%7CBuilding%20Microservices|fa)  


[یادداشت شخصی: Zookeeper و Consul ابزارهای قابل‌اعتمادی هستند، اما اگر عمیقاً در اکوسیستم Kubernetes هستی، etcd و سرویس‌های Cloud-Managed هم گزینه‌های جذابی هستند. Kafka همچنان برای Streaming قوی است و سرویس‌های مدیریت‌شده مثل AWS MSK می‌توانند مدیریت عملیاتی را ساده‌تر کنند.]

---

## 12. جمع‌بندی

**خلاصه**: فصل آخر اصول اصلی Microservices را کنار هم می‌گذارد: مدل‌سازی حول Business Domain، خودکارسازی (Automation) هرچه بیشتر، مخفی کردن جزئیات داخلی، تصمیم‌گیری‌های غیرمتمرکز، امکان Deploy مستقل سرویس‌ها، ایزوله کردن Failureها و داشتن Observability قوی.  
؜Microservices راه‌حل مناسب همه پروژه‌ها نیستند؛ اگر Domain کسب‌وکارت هنوز خوب شناخته نشده یا تیم کوچک و ساده است، شاید یک Monolith تمیز فعلاً گزینه بهتری باشد. ولی اگر سیستم پیچیده و بزرگ می‌شود، می‌توانی به‌صورت تدریجی (نه با Big Bang Rewrite) سرویس‌ها را از دل Monolith بیرون بکشی و معماری را در طول زمان تکامل بدهی.

**مثال**: نسخه نهایی MusicCorp بر پایه Microservices است: هر تیم سرویس‌های خودش را توسعه می‌دهد و Deploy می‌کند، Failureها در یک نقطه محدود می‌شود و سیستم به‌خوبی قابل مشاهده (Observable) است؛ در نتیجه تغییرات سریع‌تر انجام می‌شود و توسعه‌دهنده‌ها شادترند.

**Link for More Details**:  
[Ask AI: Bringing It All Together](https://alisol.ir/?ai=Bringing%20It%20All%20Together%7CSam%20Newman%7CBuilding%20Microservices|fa)

---

## درباره خلاصه‌کننده

من *Ali Sol* هستم، یک PHP Developer. اگر دوست داری بیشتر در مورد من بدانی:

* وب‌سایت: [alisol.ir](https://alisol.ir)
* لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

