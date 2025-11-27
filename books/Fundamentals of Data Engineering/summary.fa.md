# خلاصه کتاب: Fundamentals of Data Engineering

* **نویسندگان**: Joe Reis و Matt Housley
* **ژانر**: Data Engineering
* **تاریخ انتشار**: ژوئن ۲۰۲۲

این سند، نکات کلیدی و درس‌های مهم استخراج‌شده از کتاب را به‌صورت خلاصه جمع‌آوری می‌کند. برای درک کامل و دیدن جزئیات و نگاه نویسندگان، حتما خود کتاب اصلی را بخوانید.

## قبل از شروع

* من نکات کلیدی کتاب‌های مفید را خلاصه می‌کنم تا یادگیری و مرور برایتان سریع‌تر و راحت‌تر شود.
* بعد از هر بخش، می‌توانید روی لینک `Ask AI` کلیک کنید و در مورد همان بخش سؤالات عمیق‌تری بپرسید.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## پارت ۱: Foundation and Building Blocks - Chapter 1: Data Engineering Described

**خلاصه**: Data Engineering یعنی ساخت و توسعه‌ی سیستم‌هایی که داده‌ی خام را به اطلاعات قابل‌اعتماد برای تحلیل و Machine Learning تبدیل می‌کنند و در نقطه‌ی تلاقی موضوعاتی مثل امنیت، مدیریت داده و Software Engineering قرار می‌گیرد. این حوزه از Data Warehouseهای دهه‌ی ۱۹۸۰ شروع شد، از موج Big Data و ابزارهایی مثل Hadoop در دهه‌ی ۲۰۰۰ عبور کرد و امروز تمرکز آن روی lifecycle داده است. Data Engineerها بالادست Data Scientistها قرار می‌گیرند و پایه‌های لازم را طبق «هرم نیازهای Data Science» فراهم می‌کنند و باید بین هزینه، مقیاس‌پذیری و interoperability توازن ایجاد کنند. مهارت‌های لازم شامل درک بیزینس (مثل ارتباط مؤثر و کنترل هزینه) و مهارت‌های فنی در معماری و مراحل مختلف lifecycle است. بلوغ داده در سازمان از «starting» به «scaling» و «leading» تغییر می‌کند و نقش Data Engineer از یک generalist به متخصص‌تر شدن در این مسیر حرکت می‌کند.

**مثال**: Data Engineering را مثل گروه پشت‌صحنه‌ی یک تئاتر در نظر بگیر: Data Scientistها روی صحنه هستند و با insightها تماشاگر را شگفت‌زده می‌کنند، اما این گروه پشت‌صحنه است که نور، دکور و صحنه را بی‌نقص آماده می‌کند بدون این‌که خودش در مرکز توجه باشد.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Data Engineering Described](https://alisol.ir/?ai=Data%20Engineering%20Described%7CJoe%20Reis%20and%20Matt%20Housley%7CFundamentals%20of%20Data%20Engineering|fa)

## پارت ۱: Foundation and Building Blocks - Chapter 2: The Data Engineering Lifecycle

**خلاصه**: این چارچوب lifecycle تمرکز را از «ابزار» به سمت «هدف نهایی داده» می‌برد و شامل مراحل زیر است: generation (تولید در سیستم‌های منبع)، storage (نگه‌داری داده‌ی خام و پردازش‌شده)، ingestion (دریافت داده به‌صورت batch یا streaming)، transformation (پاک‌سازی و مدل‌سازی) و serving (ارائه برای analytics و ML). در کنار این مراحل، جریان‌های زیرساختیِ سراسری مثل security، data management (شامل governance و data quality)، DataOps (اتوماسیون و testing)، data architecture (طراحی ماژولار و مقیاس‌پذیر)، orchestration (مدیریت workflowها) و Software Engineering (کدنویسی و best practiceها) همیشه حاضرند. این نگاه یکپارچه کمک می‌کند Data Engineerها با کنار هم آوردن فناوری‌ها، مسائل واقعی بیزینس را حل کنند.

**مثال**: lifecycle را مثل یک سیستم رودخانه‌ای تصور کن: داده از یک چشمه (generation) شروع می‌شود، وارد سدها و مخازن (storage) می‌شود، از کانال‌ها و لوله‌ها عبور می‌کند (ingestion)، در تصفیه‌خانه‌ها پاک و آماده می‌شود (transformation) و در نهایت به مزارع و شهرها می‌رسد (serving)؛ در این میان سدها، دریچه‌ها و قوانین جریان آب مثل security و governance، جریان را امن و کنترل‌شده نگه می‌دارند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: The Data Engineering Lifecycle](https://alisol.ir/?ai=The%20Data%20Engineering%20Lifecycle%7CJoe%20Reis%20and%20Matt%20Housley%7CFundamentals%20of%20Data%20Engineering|fa)

## پارت ۱: Foundation and Building Blocks - Chapter 3: Designing Good Data Architecture

**خلاصه**: یک Data Architecture خوب باید ساده، امن، مقیاس‌پذیر، مقاوم و قابل‌تکامل باشد؛ یعنی از پیچیدگی بی‌دلیل دوری کند و نیازهای بیزینس را در اولویت قرار دهد. اصول کلیدی عبارت‌اند از: انتخاب تکنولوژی با فکر (نه صرفا به‌خاطر hype)، پذیرش modularity (مثلا data lake به‌جای سیستم‌های کاملاً monolithic)، طراحی domain-oriented و برنامه‌ریزی برای failure با استفاده از redundancy. معماری‌ها معمولا از سیستم‌های monolithic (به‌شدت درهم‌تنیده) به سمت سیستم‌های توزیع‌شده (microservices) حرکت می‌کنند و رویکرد data mesh هم مالکیت داده را بین domainها توزیع می‌کند. همیشه باید trade-offهایی مثل consistency در مقابل availability را در نظر گرفت و معماری را طوری طراحی کرد که بتواند با تغییر نیازها مهاجرت و تکامل پیدا کند.

**مثال**: طراحی Data Architecture شبیه شهرسازی است: ابتدا با خیابان‌ها و ساختمان‌های ساده شروع می‌کنی (monolithic)، اما از همان ابتدا باید طوری طراحی کنی که بعدا بتوانی محله‌های جدید و برج‌های بلند (microservices و سیستم‌های جدید) را اضافه کنی بدون این‌که مجبور شوی کل شهر را از نو خراب کنی.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Designing Good Data Architecture](https://alisol.ir/?ai=Designing%20Good%20Data%20Architecture%7CJoe%20Reis%20and%20Matt%20Housley%7CFundamentals%20of%20Data%20Engineering|fa)  

[یادداشت شخصی: در کتاب از اکوسیستم Hadoop به‌عنوان مثال استفاده شده، ولی در سال ۲۰۲۵ بیشتر ترجیح می‌دهم از سرویس‌های fully managed مثل AWS EMR یا Databricks استفاده کنم تا هزینه‌ی نگه‌داری کاهش پیدا کند.]

## پارت ۱: Foundation and Building Blocks - Chapter 4: Choosing Technologies Across the Data Engineering Lifecycle

**خلاصه**: انتخاب تکنولوژی باید با اهداف بیزینس align باشد؛ یعنی فاکتورهایی مثل هزینه، performance و interoperability در تمام مراحل lifecycle بررسی شوند. یک چارچوب خوب، maturity، usability و fit را ارزیابی می‌کند؛ مثلا open source انعطاف می‌دهد و سرویس‌های managed سادگی را بالا می‌برند. باید از hype دوری کرد، prototype زد و benchmark انجام داد. در مرحله‌ی generation روی سیستم‌های منبع تمرکز می‌کنیم؛ برای storage معمولا cloud object storage اولویت دارد؛ ingestion با ابزارهای ETL/ELT انجام می‌شود؛ transformation با engineهایی مثل Spark؛ و در serving از databaseها و platformهای ML استفاده می‌کنیم. در تصمیم build vs buy، برای نیازهای غیرمنحصربه‌فرد بهتر است سراغ ابزار آماده برویم.

**مثال**: انتخاب ابزارها را مثل خرید از سوپرمارکت ببین: لازم نیست هر ابزار عجیب و گرانی که می‌بینی بخری (hype)، فقط به مواد اولیه‌ی قابل‌اعتماد و کاربردی‌ای نیاز داری که با «دستور پخت» بیزینس تو سازگار باشند و بودجه را هم نابود نکنند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Choosing Technologies Across the Data Engineering Lifecycle](https://alisol.ir/?ai=Choosing%20Technologies%20Across%20the%20Data%20Engineering%20Lifecycle%7CJoe%20Reis%20and%20Matt%20Housley%7CFundamentals%20of%20Data%20Engineering|fa)  

[یادداشت شخصی: ابزارهایی مثل Apache Spark و Kafka هنوز هم انتخاب‌های قدرتمندی هستند، اما در سال ۲۰۲۵ نسخه‌های managed روی cloudهایی مثل Azure یا GCP معمولا عملیات را ساده‌تر می‌کنند بدون این‌که قدرت زیادی از دست بدهند.]

## پارت ۲: The Data Engineering Lifecycle in Depth - Chapter 5: Data Generation in Source Systems

**خلاصه**: داده در سیستم‌های منبع (source systems) مثل applicationها، databaseها یا logها تولید می‌شود؛ اغلب از طریق OLTP databaseها یا APIها. Data Engineer باید schemaها، مدل‌های consistency و formatهایی مثل JSON و CSV را خوب بشناسد. چالش‌ها شامل schema evolution و data quality در منبع است. از best practiceها می‌توان به audit کردن منبع، مدیریت تغییر schemaها و استفاده از روش‌هایی مثل Change Data Capture (CDC) یا APIهای پایدار برای ساخت pipelineهای قابل‌اعتماد اشاره کرد.

**مثال**: source systemها مثل آشپزخانه‌هایی هستند که مواد اولیه را تولید می‌کنند: اگر سبزیجات (داده) تازه و درست برچسب‌گذاری شده باشند، غذای نهایی (تحلیل) کیفیت خوبی خواهد داشت؛ وگرنه باید بعداً وقت زیادی صرف پاک‌سازی و سوا کردن آن‌ها کنید.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Data Generation in Source Systems](https://alisol.ir/?ai=Data%20Generation%20in%20Source%20Systems%7CJoe%20Reis%20and%20Matt%20Housley%7CFundamentals%20of%20Data%20Engineering|fa)  

[یادداشت شخصی: REST APIها هنوز بسیار رایج‌اند، اما در سال ۲۰۲۵ برای سیستم‌های جدید، GraphQL یا gRPC برای queryهای کاراتر می‌تواند گزینه‌ی بهتری باشد.]

## پارت ۲: The Data Engineering Lifecycle in Depth - Chapter 6: Storage

**خلاصه**: Storage مسئول نگه‌داری «مواد اولیه» است؛ از file systemها و databaseها تا formatهای row-based و columnar. Cloud object storageهایی مثل S3 و GCS ارزان و مقیاس‌پذیر هستند؛ databaseهای مختلف هم بسته به استفاده (OLTP در مقابل OLAP) انتخاب می‌شوند. برای کارایی بهتر باید الگوهای دسترسی، partitioning و compression را در نظر گرفت. Data lakeها storage را متمرکز می‌کنند، اما اگر governance و مدیریت نباشد به data swamp تبدیل می‌شوند.

**مثال**: Storage را مثل انبار و آشپزخانه تصور کن: اگر قفسه‌ها را خوب سازمان‌دهی کنی (partitioning) و مواد را در ظرف‌های دربسته نگه داری (compression)، هم مواد تازه می‌مانند، هم دسترسی به آن‌ها سریع‌تر و کم‌هزینه‌تر می‌شود.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Storage](https://alisol.ir/?ai=Storage%7CJoe%20Reis%20and%20Matt%20Housley%7CFundamentals%20of%20Data%20Engineering|fa)  

[یادداشت شخصی: Redis و Memcached برای caching عالی‌اند، ولی در سال ۲۰۲۵ سرویس‌های serverless مثل AWS ElastiCache اغلب مقیاس‌پذیری را ساده‌تر می‌کنند.]

## پارت ۲: The Data Engineering Lifecycle in Depth - Chapter 7: Ingestion

**خلاصه**: Ingestion داده را از منبع به storage منتقل می‌کند؛ یا به‌صورت batch (مثلا با ETL) یا به‌صورت streaming (مثلا با Kafka). در این مرحله باید reliability، schema و formatها مدیریت شوند. چالش‌های اصلی عبارت‌اند از failureها و validation. برای streaming می‌توان از ابزارهایی مثل Flink استفاده کرد و برای orchestration از ابزارهایی مثل Airflow. سادگی و قابلیت monitor کردن pipelineها در این بخش بسیار مهم است.

**مثال**: Ingestion مثل نوار نقاله در یک کارخانه است: در حالت batch، هر از چند وقت جعبه‌های بزرگ کالا را جابه‌جا می‌کنی، در حالت streaming یک جریان دائمی و پیوسته داری؛ در هر دو حالت اگر گیر یا اشکالی در مسیر باشد، خط تولید عقب می‌افتد و باید سریع متوجه آن بشوی.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Ingestion](https://alisol.ir/?ai=Ingestion%7CJoe%20Reis%20and%20Matt%20Housley%7CFundamentals%20of%20Data%20Engineering|fa)  

[یادداشت شخصی: Kafka همچنان گزینه‌ی قابل‌اعتمادی است، اما در سال ۲۰۲۵ سرویس‌های cloud-native مدیریت‌شده برای streamها در بسیاری از سناریوها هزینه‌ی عملیات را کمتر می‌کنند.]

## پارت ۲: The Data Engineering Lifecycle in Depth - Chapter 8: Queries, Modeling, and Transformation

**خلاصه**: در مرحله‌ی Transformation داده پاک‌سازی و مدل‌سازی می‌شود؛ در حالت batch معمولاً با engineهایی مثل Spark و در حالت streaming با ابزارهایی مثل Flink. تکنیک‌های modeling مثل رویکردهای Kimball و Inmon داده را برای queryهای analytics ساختاردهی می‌کنند. باید محاسبات را کارآمد طراحی کرد تا نه منابع را هدر بدهد و نه کم بیاورد. ویژگی‌هایی مثل idempotence و testپذیری transformationها بسیار مهم‌اند.

**مثال**: Transformation مثل فرآیند تبدیل سنگ معدن به فلز خالص است: تکه‌سنگ‌های خام (داده‌ی خام) در کوره‌ها ذوب می‌شوند و بعد به شکل ابزارهای کاربردی (مدل‌های داده‌ی قابل‌استفاده) در‌می‌آیند؛ اگر در هر مرحله دقت نکنی، محصول نهایی شکننده و بی‌کیفیت خواهد شد.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Queries, Modeling, and Transformation](https://alisol.ir/?ai=Queries%2C%20Modeling%2C%20and%20Transformation%7CJoe%20Reis%20and%20Matt%20Housley%7CFundamentals%20of%20Data%20Engineering|fa)  

[یادداشت شخصی: در کتاب به SOAP و REST اشاره شده؛ در سال ۲۰۲۵ برای microserviceهایی که performance برایشان مهم است، معمولا gRPC یا GraphQL گزینه‌های بهتری هستند.]

## پارت ۲: The Data Engineering Lifecycle in Depth - Chapter 9: Serving Data for Analytics, Machine Learning, and Reverse ETL

**خلاصه**: در مرحله‌ی Serving، داده برای مصرف‌کنندگان مختلف آماده می‌شود؛ از طریق data warehouse، data lake یا feature storeها. در analytics از ابزارهای BI استفاده می‌شود؛ در ML به pipelineهایی برای training و serving نیاز است؛ و در reverse ETL داده‌ی تحلیلی دوباره به سیستم‌های عملیاتی برگردانده می‌شود. در این لایه باید روی quality، observability و governance توجه ویژه داشت تا اعتماد به داده حفظ شود.

**مثال**: Serving مثل مرحله‌ی «سرو کردن غذا» است: بعد از این‌که مواد اولیه آماده و پخته شدند (transformation)، حالا باید غذا را در ظرف مناسب، تمیز و جذاب سر میز بگذاری تا مهمان‌ها (analystها و مدل‌های ML) بدون درگیر شدن با شلوغی آشپزخانه، از آن استفاده کنند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Serving Data for Analytics, Machine Learning, and Reverse ETL](https://alisol.ir/?ai=Serving%20Data%20for%20Analytics%2C%20Machine%20Learning%2C%20and%20Reverse%20ETL%7CJoe%20Reis%20and%20Matt%20Housley%7CFundamentals%20of%20Data%20Engineering|fa)  

[یادداشت شخصی: Docker و Kubernetes هنوز برای orchestration بسیار مهم‌اند، اما در سال ۲۰۲۵ سرویس‌های serverless مثل AWS Fargate در بسیاری از موارد deployment را ساده‌تر می‌کنند.]

## پارت ۳: Security, Privacy, and the Future of Data Engineering - Chapter 10: Security and Privacy

**خلاصه**: Security و Privacy باید در اولویت باشند و شامل کنترل دسترسی، encryption و رعایت استانداردهای قانونی مثل GDPR و CCPA می‌شوند. از best practiceها می‌توان به اصل least privilege، monitor کردن سیستم و استفاده از encryption در حین انتقال و در حالت at-rest اشاره کرد. برای مدیریت incidentها (مثل breach) باید plan مشخصی داشت. Privacy هم با روش‌هایی مثل anonymization و data minimization تقویت می‌شود.

**مثال**: Security را مثل سیستم امنیتی خانه ببین: در را قفل می‌کنی (access control)، اشیای ارزشمند را در گاوصندوق می‌گذاری (encryption) و با دوربین‌ و سیستم هشدار (monitoring) همیشه حواست هست اگر کسی خواست وارد شود، متوجه شوی.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CJoe%20Reis%20and%20Matt%20Housley%7CFundamentals%20of%20Data%20Engineering|fa)  

[یادداشت شخصی: نسخه‌های قدیمی TLS مثل 1.0 و 1.1 منسوخ شده‌اند؛ در سال ۲۰۲۵ بهتر است حداقل از TLS 1.2 و ترجیحاً TLS 1.3 در سیستم‌های جدید استفاده شود.]

## پارت ۳: Security, Privacy, and the Future of Data Engineering - Chapter 11: The Future of Data Engineering

**خلاصه**: با وجود ساده‌تر شدن ابزارها و رشد Cloud، مفهوم lifecycle همچنان هسته‌ی اصلی Data Engineering باقی می‌ماند. می‌توان انتظار داشت ابزارها ساده‌تر شوند، استانداردها interoperableتر شوند، رویه‌های «enterprise-level» بیشتر جا بیفتند، نقش‌ها با هم ترکیب شوند (مثلا ترکیب نقش‌های ML و Data) و stackها از مدل batchمحور (مثل MDS - Modern Data Stack) به سمت live data stackها با streaming و real-time databaseها حرکت کنند.

**مثال**: آینده را مثل ارتقا از یک دوچرخه‌ی معمولی (MDS) به یک خودروی برقی هوشمند (live data stack) تصور کن: سریع‌تر، هوشمندتر و با مقدار زیادی automation که «پدال زدن» دستی را کم می‌کند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: The Future of Data Engineering](https://alisol.ir/?ai=The%20Future%20of%20Data%20Engineering%7CJoe%20Reis%20and%20Matt%20Housley%7CFundamentals%20of%20Data%20Engineering|fa)  

[یادداشت شخصی: این بخش ممکن است کمی قدیمی شده باشد؛ برای تصمیم‌گیری نهایی حتما وضعیت ابزارها و frameworkهای جدیدتر را در محیط خودتان بررسی کنید.]

## ؜Appendices: Serialization, Compression, and Cloud Networking

**خلاصه**: ضمیمه‌ی A formatهایی مثل CSV، JSON، Parquet و همچنین compressionهایی مثل gzip و Snappy را توضیح می‌دهد. ضمیمه‌ی B به topology در Cloud (zone و regionها)، هزینه‌های egress و نکات networking برای بهبود performance و هزینه می‌پردازد.

**مثال**: Serialization را مثل جمع‌کردن چمدان تصور کن: formatهای columnar مثل Parquet لباس‌ها را طوری تا می‌زنند که دسترسی به دسته‌های خاص (ستون‌ها) سریع و کارآمد باشد، در حالی که formatهای row-based مثل JSON بیشتر شبیه این‌اند که هر outfit را یک‌جا نگه داری، اما چمدان حجیم‌تر می‌شود.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Appendices: Serialization, Compression, and Cloud Networking](https://alisol.ir/?ai=Appendices%3A%20Serialization%2C%20Compression%2C%20and%20Cloud%20Networking%7CJoe%20Reis%20and%20Matt%20Housley%7CFundamentals%20of%20Data%20Engineering|fa)  

[یادداشت شخصی: این اطلاعات ممکن است کمی قدیمی شده باشد؛ برای انتخاب نهایی format و ابزار، وضعیت گزینه‌های جدیدتر را با توجه به stack فعلی خودتان بررسی کنید.]

---

**درباره‌ی خلاصه‌کننده**

من *Ali Sol* هستم، یک PHP Developer. برای آشنایی بیشتر:

* وب‌سایت: [alisol.ir](https://alisol.ir)
* لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

