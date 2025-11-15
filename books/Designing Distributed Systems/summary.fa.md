# ؜خلاصه کتاب: Designing Distributed Systems
* ؜**نویسنده؜**: Brendan Burns
* ؜**ژانر؜**: مهندسی نرم‌افزار
* ؜**تاریخ انتشار؜**: دسامبر ۲۰۲۴

این سند خلاصه‌ای از مهم‌ترین درس‌ها و نکات استخراج‌شده از کتاب است.
پیشنهاد می‌کنم برای درک کامل‌تر و دیدن جزئیات، حتماً خود کتاب اصلی را هم بخوانی.

## ؜قبل از این‌که شروع کنی
* من نکات کلیدی کتاب‌های مفید را خلاصه می‌کنم تا بتوانی سریع‌تر یاد بگیری و مرور کنی.
* بعد از هر بخش می‌توانی روی لینک‌های `Ask AI` کلیک کنی و عمیق‌تر در مورد همان بخش سؤال بپرسی.

## ؜1. ؜Introduction

؜**خلاصه؜**: Brendan Burns توضیح می‌دهد که چرا سیستم‌های توزیع‌شده امروز برای دنیای تکنولوژی که اپلیکیشن‌ها باید همیشه در دسترس و قابل اسکیل باشند حیاتی شده‌اند. ؜او مسیر تحول را از برنامه‌های تک‌ماشینه تا شبکه‌ای از سرویس‌ها مرور می‌کند و نشان می‌دهد چطور containerها و orchestratorهایی مثل Kubernetes ورق را برگردانده‌اند. ؜هدف کتاب این است که یک‌سری pattern قابل‌استفادهٔ مجدد برای ساخت این سیستم‌ها ارائه کند؛ مشابه کاری که design patternها در برنامه‌نویسی شی‌ءگرا انجام دادند. ؜ایده این است که روی شانهٔ دیگران بایستیم، یک زبان مشترک داشته باشیم و به‌جای اختراع دوبارهٔ چرخ، از کامپوننت‌های آماده و تکرارپذیر استفاده کنیم.

؜**مثال؜**: مثل آشپزی است؛ به‌جای این‌که هر بار همه‌چیز را از صفر درست کنی، از مواد نیمه‌آماده و recipeهایی که دیگران تست و بهینه کرده‌اند استفاده می‌کنی؛ هم وقت کم‌تری می‌گیرد، هم احتمال اشتباه کم‌تر می‌شود.

؜**مطالعه بیشتر؜**:
[Ask AI: Introduction](https://alisol.ir/?ai=Introduction%7CBrendan%20Burns%7CDesigning%20Distributed%20Systems%7Cfa)

## ؜2. ؜Important Distributed System Concepts

؜**خلاصه؜**: این فصل مفاهیم پایه‌ای سیستم‌های توزیع‌شده را مرور می‌کند؛ چیزهایی مثل API و RPC که ستون فقرات ارتباط سرویس‌ها از طریق شبکه هستند. ؜Burns دربارهٔ latency، reliability و percentileها برای اندازه‌گیری performance صحبت می‌کند؛ همین‌طور مفهوم idempotency برای این‌که بتوانی درخواست‌ها را با خیال راحت retry کنی، delivery semantics پیام‌ها و مدل‌های مختلف consistency برای داده. ؜بعد سراغ relational integrity، orchestration با ابزارهایی مثل Kubernetes و اهمیت health checkها می‌رود تا مطمئن شوی سیستم سر پا و سالم است.

؜**مثال؜**: تصور کن غذای بیرون سفارش می‌دهی؛ latency مدت زمانی است که منتظر می‌مانی تا غذا برسد، reliability این است که غذا واقعاً برسد و سالم باشد، و idempotency یعنی اگر فکر کردی سفارش ثبت نشده و دوباره دکمهٔ سفارش را زدی، قرار نیست دو بار غذا برایت بفرستند!

؜**مطالعه بیشتر؜**:
[Ask AI: Important Distributed System Concepts](https://alisol.ir/?ai=Important%20Distributed%20System%20Concepts%7CBrendan%20Burns%7CDesigning%20Distributed%20Systems%7Cfa)

## ؜3. ؜The Sidecar Pattern

؜**خلاصه؜**: الگوی sidecar روشی است برای این‌که بدون دست‌زدن به کد اصلی اپلیکیشن، قابلیت‌های جدیدی به آن اضافه کنیم. ؜عملاً یک container کمکی کنار container اصلی قرار می‌دهی تا کارهایی مثل اضافه‌کردن HTTPS به یک سرویس قدیمی یا مدیریت configهای داینامیک را انجام دهد. ؜این رویکرد باعث می‌شود معماری modular و قابل‌استفادهٔ مجدد بماند و ساخت یک PaaS ساده یا پارامتری کردن containerها برای محیط‌های مختلف آسان‌تر شود.

؜**مثال؜**: دقیقاً مثل موتور سیکلت با سایدکار است؛ خود موتور (اپلیکیشن اصلی) رانندگی را انجام می‌دهد، ولی سایدکار بدون این‌که لازم باشد خود موتور را دست‌کاری کنی، ظرفیت یا امکانات بیشتری اضافه می‌کند.

؜**مطالعه بیشتر؜**:
[Ask AI: The Sidecar Pattern](https://alisol.ir/?ai=The%20Sidecar%20Pattern%7CBrendan%20Burns%7CDesigning%20Distributed%20Systems%7Cfa)

## ؜4. ؜Ambassadors

؜**خلاصه؜**: الگوی ambassador مثل یک proxy عمل می‌کند تا کارهایی مثل sharding سرویس‌ها، broker کردن درخواست‌ها یا اجرای experimentها با تقسیم ترافیک را انجام دهد. ؜با این الگو می‌توانی درخواست‌ها را هوشمند هدایت کنی؛ مثلاً sharding روی Redis برای اسکیل بهتر، یا تست‌کردن یک feature جدید فقط روی بخشی از کاربران بدون این‌که همه را تحت‌تأثیر قرار بدهی.

؜**مثال؜**: مثل این است که در یک هتل یک concierge داری که تمام درخواست‌های مهمان‌ها را می‌گیرد و آن‌ها را به بخش درست (روم‌سرویس، تور، پذیرش و ...) ارجاع می‌دهد تا همه‌چیز روان و منظم پیش برود.

؜**مطالعه بیشتر؜**:
[Ask AI: Ambassadors](https://alisol.ir/?ai=Ambassadors%7CBrendan%20Burns%7CDesigning%20Distributed%20Systems%7Cfa)

## ؜5. ؜Adapters

؜**خلاصه؜**: الگوی adapter کمک می‌کند interfaceهای استانداردی برای monitoring، logging یا health check بین اپلیکیشن‌های مختلف داشته باشیم. ؜Burns نشان می‌دهد چطور می‌توان از ابزارهایی مثل Prometheus برای metrics یا fluentd برای نرمال‌سازی logها استفاده کرد و به دیتابیس‌هایی مثل MySQL health monitoring غنی اضافه کرد تا سیستم‌های ناهمگون راحت‌تر در کنار هم کار کنند.

؜**مثال؜**: adapterها مثل تبدیل‌کننده‌های برق هستند که اجازه می‌دهند هر device را در هر کشوری به پریز وصل کنی؛ شکاف بین استانداردهای مختلف را پر می‌کنند تا همه‌چیز به‌سادگی به هم متصل شود.

؜**مطالعه بیشتر؜**:
[Ask AI: Adapters](https://alisol.ir/?ai=Adapters%7CBrendan%20Burns%7CDesigning%20Distributed%20Systems%7Cfa)

## ؜6. ؜Replicated Load-Balanced Services

؜**خلاصه؜**: در این فصل Burns روی ساخت سرویس‌های قابل‌اعتماد با replication و load balancing تمرکز می‌کند. ؜او دربارهٔ سرویس‌های stateless با readiness probe، مدیریت session، اضافه‌کردن cache و SSL termination با nginx صحبت می‌کند. ؜هدف این است که اپلیکیشن بتواند traffic spikeها را بدون crash‌کردن تحمل کند.

؜**مثال؜**: مثل این است که در یک فروشگاه به‌جای یک صندوق، چندین صندوق پرداخت داشته باشی؛ replication یعنی چند صندوق داری، و load balancing یعنی مشتری‌ها طوری هدایت می‌شوند که یک صف شلوغ و بقیه خالی نمانند.

؜**مطالعه بیشتر؜**:
[Ask AI: Replicated Load-Balanced Services](https://alisol.ir/?ai=Replicated%20Load-Balanced%20Services%7CBrendan%20Burns%7CDesigning%20Distributed%20Systems%7Cfa)

## ؜7. ؜Sharded Services

؜**خلاصه؜**: sharding یعنی تقسیم‌کردن داده یا سرویس روی nodeهای مختلف برای اسکیل‌پذیری بهتر؛ مثل sharding در cache با Memcached یا استفاده از consistent hashing برای کم‌کردن اختلال هنگام اضافه/حذف nodeها. ؜Burns دربارهٔ مشکل hot shardها هشدار می‌دهد و توضیح می‌دهد چطور می‌توان shardها را برای افزایش reliability replica کرد.

؜**مثال؜**: تصور کن یک کتابخانهٔ خیلی بزرگ را بر اساس ژانر به چند بخش تقسیم کنی؛ هر بخش مسئول کتاب‌های خودش است، جست‌وجو سریع‌تر می‌شود و مدیریت کل سیستم راحت‌تر است.

؜**مطالعه بیشتر؜**:
[Ask AI: Sharded Services](https://alisol.ir/?ai=Sharded%20Services%7CBrendan%20Burns%7CDesigning%20Distributed%20Systems%7Cfa)

## ؜8. ؜Scatter/Gather

؜**خلاصه؜**: این pattern درخواست‌ها را بین nodeهای مختلف پخش (scatter) و نتیجه‌ها را جمع‌آوری (gather) می‌کند؛ الگوی رایجی برای جست‌وجوی توزیع‌شده. ؜Burns دربارهٔ root sharding و leaf sharding و همین‌طور بالانس‌کردن تعداد leafها برای رسیدن به performance و reliability مناسب صحبت می‌کند.

؜**مثال؜**: مثل این است که برای دعوت به یک مهمانی، دعوت‌نامه‌ها را بین دوستان پخش می‌کنی تا به بقیه برسانند (scatter) و بعد جواب‌ها (RSVPها) را جمع می‌کنی تا بر اساس تعداد نهایی برنامه‌ریزی کنی (gather).

؜**مطالعه بیشتر؜**:
[Ask AI: Scatter/Gather](https://alisol.ir/?ai=Scatter%2FGather%7CBrendan%20Burns%7CDesigning%20Distributed%20Systems%7Cfa)

## ؜9. ؜Functions and Event-Driven Processing

؜**خلاصه؜**: Burns در این بخش سراغ function-as-a-service (FaaS) و سناریوهای event-driven می‌رود؛ از مزایایی مثل اسکیل‌پذیری ساده تا چالش‌هایی مثل مدیریت state صحبت می‌کند. ؜patternهایی مثل decorator برای دست‌کاری requestها، هندل‌کردن eventهایی مثل two-factor auth و ساخت pipelineهایی برای signup کاربران را پوشش می‌دهد.

؜**مثال؜**: مثل یک واکنش زنجیره‌ای دومینو است؛ افتادن یک مهره (event) مهرهٔ بعدی را می‌اندازد و همین‌طور ادامه پیدا می‌کند. ؜بدون این‌که لازم باشد دائم بالای سر سیستم باشی، کارها طبق eventها به‌صورت خودکار جلو می‌روند.

؜**مطالعه بیشتر؜**:
[Ask AI: Functions and Event-Driven Processing](https://alisol.ir/?ai=Functions%20and%20Event-Driven%20Processing%7CBrendan%20Burns%7CDesigning%20Distributed%20Systems%7Cfa)

## ؜10. ؜Ownership Election

؜**خلاصه؜**: برای کارهایی که باید فقط یک owner داشته باشند (مثل leader election)، Burns توضیح می‌دهد چطور می‌توان با ابزارهایی مثل etcd قفل‌ها (lock) و leaseها را مدیریت کرد تا concurrency به‌درستی کنترل شود. ؜این موضوع برای جلوگیری از conflict در محیط‌های توزیع‌شده حیاتی است.

؜**مثال؜**: مثل انتخاب یک نمایندهٔ کلاس است؛ در نهایت فقط یک نفر رهبر می‌شود، اما فرآیند انتخاب طوری طراحی شده که منصفانه باشد و اگر شرایط عوض شد (مثلاً نماینده رفت)، بتوان leader جدید انتخاب کرد.

؜**مطالعه بیشتر؜**:
[Ask AI: Ownership Election](https://alisol.ir/?ai=Ownership%20Election%7CBrendan%20Burns%7CDesigning%20Distributed%20Systems%7Cfa)

## ؜11. ؜Work Queue Systems

؜**خلاصه؜**: سیستم‌های work queue برای پردازش batch jobها با توزیع taskها بین workerها استفاده می‌شوند و امکان اسکیل داینامیک و استفاده از چند worker را فراهم می‌کنند. ؜Burns با مثال یک video thumbnailer نشان می‌دهد چطور می‌شود queueهای مقاوم و پایدار ساخت.

؜**مثال؜**: مثل یک خط تولید در آشپزخانهٔ رستوران است؛ سفارش‌ها وارد صف می‌شوند و چندین آشپز به‌صورت موازی روی آن‌ها کار می‌کنند و در ساعت شلوغی تعداد نیروها را بیشتر می‌کنی.

؜**مطالعه بیشتر؜**:
[Ask AI: Work Queue Systems](https://alisol.ir/?ai=Work%20Queue%20Systems%7CBrendan%20Burns%7CDesigning%20Distributed%20Systems%7Cfa)

## ؜12. ؜Event-Driven Batch Processing

؜**خلاصه؜**: این بخش روی پردازش batch مبتنی بر event بنا می‌شود و patternهایی مثل copier، filter، splitter، sharder و merger را برای جریان eventها معرفی می‌کند. ؜با استفاده از Kafka برای pub/sub، تمرکز زیادی روی resiliency با تکنیک‌هایی مثل work stealing و retry وجود دارد.

؜**مثال؜**: مثل فرآیند مرتب‌سازی نامه‌هاست؛ نامه‌ها براساس eventها فیلتر می‌شوند، بر اساس مقصد تقسیم (split) و در نهایت برای تحویل، دوباره مشترکاً (merge) بسته‌بندی می‌شوند.

؜**مطالعه بیشتر؜**:
[Ask AI: Event-Driven Batch Processing](https://alisol.ir/?ai=Event-Driven%20Batch%20Processing%7CBrendan%20Burns%7CDesigning%20Distributed%20Systems%7Cfa)

## ؜13. ؜Coordinated Batch Processing

؜**خلاصه؜**: برای workflowهایی که نیاز به هماهنگی بین چند node دارند، patternهایی مثل join (barrier) و reduce (مثل count، sum، histogram) معرفی می‌شوند تا کارها به‌صورت هماهنگ انجام شوند. ؜مثال کتاب یک pipeline پردازش تصویر است که در آن نتیجهٔ کار nodeهای مختلف در انتها تجمیع می‌شود.

؜**مثال؜**: مثل یک مسابقهٔ دو امدادی است؛ هر نفر باید کار خودش را تمام کند تا baton را به نفر بعدی بدهد و در انتها، زمان کلی تیم بر اساس عملکرد همهٔ نفرات محاسبه می‌شود.

؜**مطالعه بیشتر؜**:
[Ask AI: Coordinated Batch Processing](https://alisol.ir/?ai=Coordinated%20Batch%20Processing%7CBrendan%20Burns%7CDesigning%20Distributed%20Systems%7Cfa)

## ؜14. ؜Monitoring and Observability Patterns

؜**خلاصه؜**: Burns در این فصل روی logging، metrics، alerting و tracing تأکید می‌کند تا بتوانی سلامت سیستم را واقعاً درک کنی. ؜او پیشنهاد می‌دهد اطلاعات را تجمیع کنی تا insight به دست بیاید و با ابزارهایی مثل Prometheus درخواست‌ها را مانیتور و روی وضعیت‌های غیرعادی alert تنظیم کنی.

؜**مثال؜**: مثل داشبورد ماشین است؛ سرعت‌سنج و بقیهٔ نشانگرها مثل metrics هستند، چراغ‌های هشدار مثل alert عمل می‌کنند و کمک می‌کنند رانندگی امن‌تری داشته باشی.

؜**مطالعه بیشتر؜**:
[Ask AI: Monitoring and Observability Patterns](https://alisol.ir/?ai=Monitoring%20and%20Observability%20Patterns%7CBrendan%20Burns%7CDesigning%20Distributed%20Systems%7Cfa)

## ؜15. ؜AI Inference and Serving

؜**خلاصه؜**: این فصل (که در این ویرایش جدید اضافه شده) دربارهٔ میزبانی و توزیع مدل‌های AI، workflow توسعه، retrieval-augmented generation (RAG) و تست deploymentها صحبت می‌کند. ؜تمرکز روی این است که چگونه AI را به‌شکل قابل‌اعتماد در اپلیکیشن‌های توزیع‌شده ادغام کنیم.

؜**مثال؜**: مثل یک دستیار هوشمند است؛ queryها را می‌گیرد (inference)، با استفاده از دانش آموزش‌دیده و داده‌های کمکی پاسخ می‌دهد و باید طوری طراحی شود که بتواند برای تعداد زیادی کاربر به‌خوبی اسکیل شود.

؜**مطالعه بیشتر؜**:
[Ask AI: AI Inference and Serving](https://alisol.ir/?ai=AI%20Inference%20and%20Serving%7CBrendan%20Burns%7CDesigning%20Distributed%20Systems%7Cfa)

## ؜16. ؜Common Failure Patterns

؜**خلاصه؜**: Burns در این بخش به ضدالگوها و خطاهای رایج اشاره می‌کند؛ چیزهایی مثل thundering herd ناشی از retryهای زیاد، نبودن error که می‌تواند نشانهٔ مشکل بزرگ‌تری باشد، یا cleanupهای اشتباهی که دادهٔ مهم را پاک می‌کنند. ؜او روی استفاده از circuit breaker، versioning درست و دوری از وسوسهٔ بازنویسی کامل سیستم (second system syndrome) تأکید می‌کند.

؜**مثال؜**: مثل یک ترافیک سنگین در بزرگ‌راه است؛ یک کندی کوچک باعث می‌شود راننده‌ها مرتب ترمز و گاز کنند (retry)، و اگر کنترلی مثل چراغ راهنما یا محدودکننده (circuit breaker) نباشد، مشکل خیلی بزرگ‌تر می‌شود.

؜**مطالعه بیشتر؜**:
[Ask AI: Common Failure Patterns](https://alisol.ir/?ai=Common%20Failure%20Patterns%7CBrendan%20Burns%7CDesigning%20Distributed%20Systems%7Cfa)

## ؜Conclusion: A New Beginning

؜**خلاصه؜**: در جمع‌بندی، Burns توضیح می‌دهد چطور patternها و ابزارهایی مثل containerها، سیستم‌های توزیع‌شده را «دموکراتیک» کرده‌اند و باعث شده‌اند تعداد بیشتری از توسعه‌دهنده‌ها بتوانند سریع‌تر و مطمئن‌تر سیستم‌های پایدار بسازند. ؜او دعوت می‌کند که روی ساخت کامپوننت‌ها و patternهای قابل‌استفادهٔ مجدد برای آینده با هم همکاری کنیم.

؜**مثال؜**: شبیه اختراع چاپ‌خانه است؛ چاپ‌خانه انتشار دانش را متحول کرد و حالا این patternها و ابزارها انتشار تخصص در طراحی سیستم را آسان‌تر می‌کنند.

؜**مطالعه بیشتر؜**:
[Ask AI: Conclusion: A New Beginning?](https://alisol.ir/?ai=Conclusion%3A%20A%20New%20Beginning%3F%7CBrendan%20Burns%7CDesigning%20Distributed%20Systems%7Cfa)

---
؜**دربارهٔ خلاصه‌کننده؜**

من *Ali Sol* هستم، یک PHP Developer. ؜برای آشنایی بیشتر:

* وب‌سایت: [alisol.ir](https://alisol.ir)
* لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
