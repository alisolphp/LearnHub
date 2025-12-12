# خلاصه کتاب: Building Event-Driven Microservices

* **نویسنده**: Adam Bellemare  
* **ژانر**: Software Engineering  
* **تاریخ انتشار**: 2020  
* **لینک کتاب**: https://amazon.com/dp/1492057894  

این سند، نکته‌ها و بینش‌های کلیدی استخراج‌شده از کتاب را خلاصه می‌کند. برای درک عمیق‌تر و دیدگاه کامل نویسنده، پیشنهاد می‌کنم نسخه اصلی کتاب را هم مطالعه کنید.

## قبل از شروع

* من نکته‌های مهم کتاب‌های مفید را خلاصه می‌کنم تا سریع‌تر یاد بگیریم و راحت‌تر مرور کنیم.
* بعد از هر بخش، روی لینک‌های `Ask AI` کلیک کنید تا عمیق‌تر وارد جزئیات شوید.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=fa&src=books/Building%20Event-Driven%20Microservices) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=books/Building%20Event-Driven%20Microservices) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=books/Building%20Event-Driven%20Microservices) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=books/Building%20Event-Driven%20Microservices) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=books/Building%20Event-Driven%20Microservices) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=fa&src=books/Building%20Event-Driven%20Microservices) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=books/Building%20Event-Driven%20Microservices) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=books/Building%20Event-Driven%20Microservices) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=books/Building%20Event-Driven%20Microservices) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=books/Building%20Event-Driven%20Microservices) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=books/Building%20Event-Driven%20Microservices) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=books/Building%20Event-Driven%20Microservices)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=books/Building%20Event-Driven%20Microservices) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=books/Building%20Event-Driven%20Microservices) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=fa&src=books/Building%20Event-Driven%20Microservices) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=books/Building%20Event-Driven%20Microservices) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=fa&src=books/Building%20Event-Driven%20Microservices)
<!-- LH-BUTTONS:END -->

## چرا Event-Driven Microservices

**خلاصه**: کتاب با این توضیح شروع می‌شود که Event-Driven Microservices چطور به سازمان‌ها کمک می‌کند حجم عظیمی از داده را به‌صورت real-time مدیریت کنند؛ مخصوصاً در فضای رقابتی دیجیتال. نویسنده از ایده‌هایی مثل domain-driven design استفاده می‌کند تا مسئله‌های کسب‌وکار را به bounded context‌ها بشکند—یعنی محدوده‌های مشخصی مثل sales یا engineering که با آن‌ها تیم‌ها و سرویس‌ها هم‌راستا می‌شوند. در معماری‌های سنتی، دسترسی به داده و ارتباط بین تیم‌ها معمولاً سخت می‌شود و نتیجه‌اش یا یک monolith بادکرده است یا integrationهای پیچیده. رویکرد event-driven این را برعکس می‌کند: eventها هسته ارتباطات می‌شوند و سرویس‌ها می‌توانند بدون coupling شدید، داده را به‌صورت asynchronous به اشتراک بگذارند. این کار وابستگی‌ها را کم می‌کند، انعطاف را بالا می‌برد و اجازه می‌دهد تیم‌ها با تغییر نیازهای کسب‌وکار سریع‌تر سازگار شوند. نویسنده این مدل را با synchronous microservices مقایسه می‌کند و نشان می‌دهد eventها می‌توانند نقش single source of truth را بهتر ایفا کنند و scalability بهتری بدهند.

**مثال**: فرض کنید تیمی می‌خواهد یک feature جدید بسازد که به داده‌های یک سرویس موجود نیاز دارد. در مدل سنتی باید مستقیم query بزند و ریسک overload یا staleness را بپذیرد. اما با eventها، داده به‌صورت continuous stream می‌آید و سرویس جدید فقط subscribe می‌کند و مستقل پردازش می‌کند—مثل این‌که به جای این‌که هر بار به ایستگاه رادیویی زنگ بزنید، روی موج زنده تنظیم شوید.

**لینک برای جزئیات بیشتر**: [Ask AI: Why Event-Driven Microservices](https://alisol.ir/?ai=Why%20Event-Driven%20Microservices%7CAdam%20Bellemare%7CBuilding%20Event-Driven%20Microservices|fa)

## مبانی Event-Driven Microservices

**خلاصه**: این بخش روی پایه‌ها تمرکز دارد: eventها داده‌هایی هستند که «واقعیتِ رخ‌دادنِ یک اتفاق در کسب‌وکار» را حمل می‌کنند و معمولاً با key/value و metadata ساختاربندی می‌شوند. Microserviceها این eventها را از streamها مصرف می‌کنند، منطق را اعمال می‌کنند و eventهای جدید تولید می‌کنند. event broker مثل یک hub مرکزی عمل می‌کند: eventها را به شکل durable ذخیره می‌کند و اجازه می‌دهد چند consumer آن‌ها را بخوانند بدون این‌که اصل پیام‌ها حذف شوند—برخلاف message queueهای قدیمی که مصرف‌کننده معمولاً پیام را “می‌بلعد”. این مدل با containerization و مدیریت ساده‌تر سرویس‌ها، scale شدن را هم راحت‌تر می‌کند. اصل single writer هم کمک می‌کند تمیز بماند: هر stream یک owner مشخص دارد. در مجموع، تأکید این است که تولید داده از مصرف داده جدا می‌شود و سیستم در مقیاس بالا resilientتر و قابل‌مدیریت‌تر می‌شود.

**مثال**: یک فروشگاه آنلاین را تصور کنید که یک purchase event شامل item، buyer و time باشد. سرویس inventory آن را می‌خواند تا stock را آپدیت کند، و همزمان سرویس analytics همان event را برای تحلیل trendها مصرف می‌کند—همه از روی یک stream immutable، مثل یک logbook مشترک که همه می‌توانند به آن مراجعه کنند بدون این‌که چیزی پاک شود.

**لینک برای جزئیات بیشتر**: [Ask AI: Event-Driven Microservice Fundamentals](https://alisol.ir/?ai=Event-Driven%20Microservice%20Fundamentals%7CAdam%20Bellemare%7CBuilding%20Event-Driven%20Microservices|fa)

## ؜Communication و Data Contracts

**خلاصه**: برای ارتباط قابل اعتماد، data contractها حیاتی‌اند—بهتر است با schemaهای صریح، eventها را دقیق تعریف کنید تا سوءتفاهم پیش نیاید. schemaها امکان evolution دارند؛ مثلاً می‌توانید field جدید اضافه کنید بدون این‌که consumerهای قدیمی بشکنند، اما باید حواس‌تان به breaking changeها باشد که مجبور می‌کنند مصرف‌کننده‌ها آپدیت شوند. eventها را طوری طراحی کنید که truthful، single-purpose و تا حد ممکن کوچک باشند، و از همان ابتدا future consumerها را در طراحی دخیل کنید. این کار باعث می‌شود streamها focused و efficient بمانند. این فصل همچنین روی این نکته تأکید دارد که schemaها مثل contract عمل می‌کنند و می‌توانند code generation و همکاری بهتر بین تیم‌ها را ممکن کنند.

**مثال**: اگر می‌خواهید user loginها را track کنید، event را فقط با چیزهای ضروری مثل user ID و timestamp تعریف کنید. آن را با اطلاعات نامرتبط مثل purchase info قاطی نکنید—این باعث می‌شود event سبک و واضح بماند، مثل یک یادداشت کوتاه به جای یک نامه طولانی و پرحاشیه.

**لینک برای جزئیات بیشتر**: [Ask AI: Communication and Data Contracts](https://alisol.ir/?ai=Communication%20and%20Data%20Contracts%7CAdam%20Bellemare%7CBuilding%20Event-Driven%20Microservices|fa)

## یکپارچه‌سازی Event-Driven Architecture با سیستم‌های موجود

**خلاصه**: مهاجرت به eventها معمولاً یعنی آزاد کردن داده از سیستم‌های legacy. patternهایی مثل query دوره‌ای از database یا ثبت تغییرات از طریق logها (CDC) کمک می‌کند updateها به event تبدیل شوند. outbox tableها هم کمک می‌کنند internal modelها ایزوله بمانند و در عین حال compatibility حفظ شود. sink کردن eventها به storeهای مختلف هم سیستم‌ها را همگام نگه می‌دارد. پیام اصلی این است که باید بین trade-offهایی مثل staleness یا load تعادل برقرار کنید، اما سود اصلی، decoupling سیستم‌ها و شکل دادن یک جریان داده یکپارچه است که کل سازمان از آن نفع می‌برد.

**مثال**: در یک اپ legacy، می‌توانید روی database log، CDC راه بیندازید تا تغییر rowها خودکار به event تبدیل شود. این مثل نصب یک motion sensor است که updateها را broadcast می‌کند، به جای این‌که هر چند دقیقه یک‌بار کل اتاق را poll کنید.

**لینک برای جزئیات بیشتر**: [Ask AI: Integrating Event-Driven Architectures with Existing Systems](https://alisol.ir/?ai=Integrating%20Event-Driven%20Architectures%20with%20Existing%20Systems%7CAdam%20Bellemare%7CBuilding%20Event-Driven%20Microservices|fa)  
[یادداشت شخصی: Debezium برای CDC گزینه محکمی است، اما در 2025 اگر دغدغه ops overhead دارید، بد نیست managed serviceهای جدیدتر cloudها را هم بررسی کنید که scale کردن را ساده‌تر می‌کنند.]

## مبانی Event-Driven Processing

**خلاصه**: پردازش از کنار هم چیدن topologyها شروع می‌شود: transform، branch، merge یا repartition کردن streamها (اغلب به‌صورت stateless). partitioning باعث می‌شود داده‌های مرتبط کنار هم بمانند و پردازش کارآمدتر شود، مثل این‌که eventهای مرتبط را دسته‌بندی کنید. چون eventها persist می‌شوند، recovery بعد از failure معمولاً ساده است. این‌ها پایه‌ای می‌سازند تا stream خام را به خروجی‌های معنی‌دار تبدیل کنید، بدون این‌که الزاماً state سنگین نگه دارید.

**مثال**: یک stream از orderها را بر اساس customer ID repartition کنید تا تمام فعالیت‌های یک کاربر در یک partition بیفتد—مثل مرتب کردن نامه‌ها بر اساس آدرس برای تحویل سریع‌تر و کم‌خطاتر.

**لینک برای جزئیات بیشتر**: [Ask AI: Event-Driven Processing Basics](https://alisol.ir/?ai=Event-Driven%20Processing%20Basics%7CAdam%20Bellemare%7CBuilding%20Event-Driven%20Microservices|fa)

## ؜Deterministic Stream Processing

**خلاصه**: برای خروجی قابل اعتماد، باید deterministically پردازش کنید؛ یعنی از timestampها استفاده کنید تا با eventهای دیررس یا out-of-order کنار بیایید. watermarkها و stream time کمک می‌کنند بی‌نظمی را محدود کنید و custom schedulerها زمان‌بندی را مدیریت می‌کنند. باید تأخیرهای ناشی از failure یا مشکل connectivity را هم در نظر بگیرید و در صورت نیاز reprocess کنید. هدف این است که حتی در سناریوهای شلوغ و واقعی، نتیجه‌ها consistent بمانند.

**مثال**: اگر eventها قاطی‌پاتی برسند (مثل آپدیت‌های پرواز که دیر می‌رسند)، با timestampها می‌توانید آن‌ها را منطقی reorder کنید تا aggregate اشتباه (مثلاً miscount کردن) رخ ندهد.

**لینک برای جزئیات بیشتر**: [Ask AI: Deterministic Stream Processing](https://alisol.ir/?ai=Deterministic%20Stream%20Processing%7CAdam%20Bellemare%7CBuilding%20Event-Driven%20Microservices|fa)

## ؜Stateful Streaming

**خلاصه**: عملیات stateful می‌توانند viewها را از روی streamها materialize کنند و در store ذخیره کنند—یا internal برای سرعت، یا external برای دوام بیشتر. changelogها برای backup کردن state و کمک به recovery و scaling استفاده می‌شوند. transactionها “effectively once” semantics را ممکن می‌کنند تا duplicateها کنترل شوند. همچنین ممکن است لازم شود storeها را rebuild یا migrate کنید تا سیستم پایدار بماند.

**مثال**: با aggregate کردن purchase eventها، سطح موجودی را در یک state store نگه دارید—مثل یک tally در حال اجرا که اگر ماشین‌حساب crash کرد، دوباره از روی event log بازسازی می‌شود.

**لینک برای جزئیات بیشتر**: [Ask AI: Stateful Streaming](https://alisol.ir/?ai=Stateful%20Streaming%7CAdam%20Bellemare%7CBuilding%20Event-Driven%20Microservices|fa)

## ساخت Workflow با Microservices

**خلاصه**: workflowها معمولاً یا choreographed هستند (decentralized؛ eventها باعث trigger شدن actionها می‌شوند) یا orchestrated (یک سرویس مرکزی هدایت می‌کند). Sagaها برای distributed transaction به کار می‌روند و برای failureها compensation تعریف می‌کنند. انتخاب بین این‌ها به نیازهای monitoring و پیچیدگی بستگی دارد: eventها برای loose coupling عالی‌اند، ولی direct callها گاهی ساده‌ترند.

**مثال**: در یک فرایند order، در choreography موفقیت پرداخت می‌تواند خودکار shipping را trigger کند—مثل یک relay race؛ در orchestration یک coordinator مرکزی باتون را دست‌به‌دست می‌کند.

**لینک برای جزئیات بیشتر**: [Ask AI: Building Workflows with Microservices](https://alisol.ir/?ai=Building%20Workflows%20with%20Microservices%7CAdam%20Bellemare%7CBuilding%20Event-Driven%20Microservices|fa)

## ؜Microservices با Function-as-a-Service

**خلاصه**: FaaS کمک می‌کند microserviceها را به شکل functionهای کوتاه‌عمر بسازید که با event trigger می‌شوند؛ تا حد امکان bounded و stateless نگه‌شان دارید. triggerهایی مثل stream listener یا schedule آن‌ها را اجرا می‌کنند و معمولاً auto-scaling دارند. برای منطق ساده خیلی مناسب است، اما باید حواس‌تان به cold start و مدیریت state باشد.

**مثال**: یک function وقتی user sign-up جدید از event stream می‌آید، پروفایل را آپدیت می‌کند—سریع و on-demand، مثل یک نیروی موقت که هر بار فقط یک کار کوچک انجام می‌دهد.

**لینک برای جزئیات بیشتر**: [Ask AI: Microservices Using Function-as-a-Service](https://alisol.ir/?ai=Microservices%20Using%20Function-as-a-Service%7CAdam%20Bellemare%7CBuilding%20Event-Driven%20Microservices|fa)  
[یادداشت شخصی: AWS Lambda و مشابه‌ها همچنان کاربردی‌اند، اما در 2025 اگر stack شما اجازه بدهد، من سمت serverlessهای یکپارچه‌تر cloudها می‌روم تا observability بهتر باشد.]

## ؜Producer و Consumer Microservices پایه

**خلاصه**: مدل producer-consumer ساده برای integration با legacyها، منطق‌های order-insensitive، یا زمانی که database بیشترِ پردازش را انجام می‌دهد خیلی خوب است. می‌توانید مستقل scale کنید و برای joinها از processorهای خارجی استفاده کنید. از نظر زبان برنامه‌نویسی انعطاف دارد، اما برای state پیچیده محدود است.

**مثال**: یک سرویس eventها را می‌خواند، filter می‌کند و در database می‌نویسد—ساده و مستقیم، مثل یک conveyor belt که آیتم‌ها را جابه‌جا می‌کند بدون sorting پیچیده.

**لینک برای جزئیات بیشتر**: [Ask AI: Basic Producer and Consumer Microservices](https://alisol.ir/?ai=Basic%20Producer%20and%20Consumer%20Microservices%7CAdam%20Bellemare%7CBuilding%20Event-Driven%20Microservices|fa)

## ؜Heavyweight Framework Microservices

**خلاصه**: frameworkهایی مثل Spark یا Flink روی cluster اجرا می‌شوند و برای کارهای سنگین مناسب‌اند؛ state را با checkpointها مدیریت می‌کنند. scale کردن معمولاً با restart یا autoscaling انجام می‌شود، اما resource-heavy هستند. برای analytics پیچیده عالی‌اند؛ انتخاب را بر اساس language support و multitenancy انجام دهید.

**مثال**: session window روی clickها و viewها برای تحلیل رفتار کاربر—جمع‌بندی‌های time-bound را قابل اعتماد تولید می‌کند.

**لینک برای جزئیات بیشتر**: [Ask AI: Heavyweight Framework Microservices](https://alisol.ir/?ai=Heavyweight%20Framework%20Microservices%7CAdam%20Bellemare%7CBuilding%20Event-Driven%20Microservices|fa)  
[یادداشت شخصی: Spark و Flink هنوز خوب جواب می‌دهند، اما برای workloadهای سبک‌تر در 2025 شاید سراغ managed serverless streaming بروم تا مدیریت cluster کمتر شود.]

## ؜Lightweight Framework Microservices

**خلاصه**: گزینه‌های سبک‌تر مثل Kafka Streams پردازش را embed می‌کنند و state را با changelog و hot replica مدیریت می‌کنند. scale شدن معمولاً با partitioning انجام می‌شود؛ برای joinها و real-time پردازش‌ها efficient هستند، ولی به broker گره خورده‌اند.

**مثال**: stream و table را join کنید تا eventها را درجا enrich کنید—مثل این‌که اطلاعات user را همان لحظه به event اضافه کنید.

**لینک برای جزئیات بیشتر**: [Ask AI: Lightweight Framework Microservices](https://alisol.ir/?ai=Lightweight%20Framework%20Microservices%7CAdam%20Bellemare%7CBuilding%20Event-Driven%20Microservices|fa)  
[یادداشت شخصی: Kafka Streams قابل‌اعتماد است، اما اگر multi-tenancy برایتان مهم است، بد نیست بررسی کنید آیا گزینه‌های جدیدتر embed شده (مثلاً در Pulsar) برای نیاز شما مناسب‌تر هستند یا نه.]

## یکپارچه‌سازی Event-Driven و Request-Response Microservices

**خلاصه**: می‌شود سبک‌ها را ترکیب کرد: رویدادهای بیرونی را reactive هندل کنید، state را از طریق storeها سرو کنید، یا requestها را به event تبدیل کنید. micro-frontendها هم UI را به‌صورت composable کنار هم می‌چینند. این‌ها پلی می‌زنند بین sync و async تا اپ‌های real-time راحت‌تر ساخته شوند.

**مثال**: یک اپ search می‌تواند viewها را از eventها materialize کند تا query سریع شود—مثل این‌که از قبل یک catalog آماده کنید تا browsing سریع انجام شود.

**لینک برای جزئیات بیشتر**: [Ask AI: Integrating Event-Driven and Request-Response Microservices](https://alisol.ir/?ai=Integrating%20Event-Driven%20and%20Request-Response%20Microservices%7CAdam%20Bellemare%7CBuilding%20Event-Driven%20Microservices|fa)

## ابزارهای کمکی

**خلاصه**: ابزارهایی مثل schema registry، quota و ACL کارهای عملیاتی را ساده‌تر می‌کنند. lagها را monitor کنید، topologyها را visualize کنید و clusterها را برای scale شدن automation کنید. این “microservice tax” با autonomy و reliability بیشتر جبران می‌شود.

**مثال**: streamها را با metadata برچسب‌گذاری کنید تا ownership مشخص باشد—مثل label کردن فایل‌ها در یک shared drive برای جست‌وجوی سریع‌تر.

**لینک برای جزئیات بیشتر**: [Ask AI: Supportive Tooling](https://alisol.ir/?ai=Supportive%20Tooling%7CAdam%20Bellemare%7CBuilding%20Event-Driven%20Microservices|fa)  
[یادداشت شخصی: ادغام با Kubernetes اینجا مهم است؛ در 2025 من ابزارهایی را ترجیح می‌دهم که service mesh قوی دارند تا traffic management بهتر شود.]

## تست کردن Event-Driven Microservices

**خلاصه**: تست را می‌توانید از unit test با mock شروع کنید، بعد integration را با broker موقت در لوکال انجام دهید، یا در محیط‌های remote شبیه production تست بگیرید. schemaها، failureها و کل environment را پوشش دهید تا مشکل‌ها زودتر دیده شوند.

**مثال**: یک broker لوکال بالا بیاورید، eventهای تست را تزریق کنید و خروجی‌ها را چک کنید—مثل تمرین یک نمایش در یک صحنه آزمایشی.

**لینک برای جزئیات بیشتر**: [Ask AI: Testing Event-Driven Microservices](https://alisol.ir/?ai=Testing%20Event-Driven%20Microservices%7CAdam%20Bellemare%7CBuilding%20Event-Driven%20Microservices|fa)

## ؜Deploy کردن Event-Driven Microservices

**خلاصه**: با CI/CD و containerها deploy کنید؛ patternهایی مثل rolling update یا blue-green downtime را کم می‌کنند. با schema breakها با احتیاط برخورد کنید و بین SLAها و impactها تعادل برقرار کنید.

**مثال**: blue-green می‌تواند سرویس را بی‌وقفه جابه‌جا کند—مثل این‌که بازیگرها را وسط اجرا عوض کنید بدون این‌که نمایش متوقف شود.

**لینک برای جزئیات بیشتر**: [Ask AI: Deploying Event-Driven Microservices](https://alisol.ir/?ai=Deploying%20Event-Driven%20Microservices%7CAdam%20Bellemare%7CBuilding%20Event-Driven%20Microservices|fa)

## نتیجه‌گیری

**خلاصه**: در پایان، کتاب نشان می‌دهد Event-Driven Microservices چطور ارتباطات داده را متحول می‌کند، با domainهای کسب‌وکار هم‌راستا می‌شود و با کمک tooling، انعطاف و scale را بالا می‌برد. داده را از سیستم‌های legacy آزاد کنید، سرویس‌های composable بسازید و معماری را طوری evolve کنید که در مقیاس بالا graceful عمل کند.

**مثال**: انگار از فایل‌های کاغذیِ جداافتاده (silo) می‌روید به یک دیتابیس مشترک و زنده—همه به «حقیقت» دسترسی دارند و همین، نوآوری را سریع‌تر می‌کند.

**لینک برای جزئیات بیشتر**: [Ask AI: Conclusion](https://alisol.ir/?ai=Conclusion%7CAdam%20Bellemare%7CBuilding%20Event-Driven%20Microservices|fa)

---

**درباره خلاصه‌کننده**

من *Ali Sol* هستم، یک Backend Developer. بیشتر بدانید:

* وبسایت: [alisol.ir](https://alisol.ir)
* لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

