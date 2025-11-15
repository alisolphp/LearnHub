# خلاصه کتاب: System Design Interview (Volume 2)

* **نویسنده**: Alex Xu  
* **ژانر**: Software Engineering  
* **تاریخ انتشار**: مارس 11, 2022  

این سند خلاصه مهم‌ترین ایده‌ها و نکاتی است که از کتاب استخراج شده‌اند. برای درک عمیق‌تر موضوعات و دیدن جزئیات طراحی، خواندن نسخهٔ اصلی کتاب اکیداً پیشنهاد می‌شود.

---

## قبل از شروع

* این خلاصه برای مرور سریع و یادگیری نکات کلیدی کتاب آماده شده است.
* برای هر فصل، یک لینک `Ask AI` گذاشته شده که می‌توانی بعد از هر بخش روی آن کلیک کنی و عمیق‌تر وارد جزئیات همان فصل شوی.

---

## فصل ۱: Proximity Service

**خلاصه**: در این فصل طراحی سرویسی مطرح می‌شود که براساس موقعیت کاربر، مکان‌های نزدیک (مثل رستوران، پمپ‌بنزین، کافه و...) را در یک شعاع مشخص پیدا می‌کند؛ چیزی شبیه Yelp یا Google Maps. اول از همه روی نیازمندی‌هایی مثل **Latency پایین** و **حفظ حریم خصوصی (Privacy)** تأکید می‌شود، بعد APIهایی برای جستجوی بیزینس‌ها و مدیریتشان تعریف می‌شود.  
در طراحی سطح بالا، سیستم به دو بخش کلی تقسیم می‌شود: **Location Service** و **Business Service**. بحث اصلی روی **Scaling دیتابیس** و استفاده از **Geospatial Index** است. الگوریتم‌ها و ساختارهایی مثل **Geohash**، **Quadtree** و **Google S2** با هم مقایسه می‌شوند تا بتوان نزدیک‌ترین مکان‌ها را در یک منطقه پیدا کرد و مشکل مرزها (Boundary) درست هندل شود.  
در بخش عمیق‌تر (Deep Dive)، درباره Sharding جدول بیزینس، استفاده از **Redis** برای Cache کردن داده‌های Geohash و اطلاعات بیزینس‌ها، و Deployment در چند Region برای Availability بهتر صحبت می‌شود. فیلتر کردن نتایج بر اساس زمان (مثل باز/بسته بودن) یا نوع کسب‌وکار، بعد از مرحلهٔ Fetch انجام می‌شود.

**مثال**: فرض کن داخل یک اپ شبیه Yelp می‌خواهی کافه‌های درون شعاع ۱ کیلومتری را پیدا کنی؛ سیستم Geohash موقعیت تو را حساب می‌کند، بیزینس‌های داخل آن Grid و Gridهای کناری را می‌گیرد، بعد بر اساس ساعت کاری، نوع بیزینس و… فیلتر می‌کند و در نهایت لیست کافه‌های مناسب را روی نقشه نشان می‌دهد.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Proximity Service](https://alisol.ir/?ai=Proximity%20Service%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29%7Cfa)

---

## فصل ۲: Nearby Friends

**خلاصه**: این بخش روی قابلیتی مثل “دوستان نزدیک” در شبکه‌های اجتماعی تمرکز دارد؛ جایی که باید موقعیت دوستان در لحظه (یا نزدیک به Real-time) آپدیت شود. نیازمندی‌هایی مثل تحمل **QPS بالا** در مناطق شلوغ و تنظیمات Privacy خیلی مهم هستند. APIهایی برای Share کردن لوکیشن و برای Query گرفتن دوستان در شعاع مشخص طراحی می‌شود.  
در طراحی سطح بالا از **WebSocket** برای ارسال آپدیت‌های زنده استفاده می‌شود؛ سرویس‌هایی برای ذخیره لوکیشن و نگه‌داشتن Friend Graph داریم. **Geohash** کمک می‌کند تا بتوانیم دوستان نزدیک را به‌صورت کارآمد (Efficient) Query کنیم. برای چک‌های دوره‌ای، Background Jobها هم استفاده می‌شوند.  
در بخش Deep Dive، برای Scaling از **Redis** برای ذخیرهٔ لوکیشن‌های اخیر، از **Kafka** برای Event Streaming، و برای Privacy از روش‌هایی مثل Anonymize کردن داده‌ها استفاده می‌شود.

**مثال**: یک اپ مشابه سرویس‌های Ride-sharing را تصور کن که راننده‌ها باید مسافرهای نزدیک را ببینند؛ اپ هر چند ثانیه یک بار لوکیشن را می‌فرستد، سیستم با استفاده از Geohash آن‌ها را در Bucketهای مکانی می‌گذارد، و از طریق WebSocket بروزرسانی را Push می‌کند تا نقشه در اپ راننده تقریباً لحظه‌ای آپدیت شود.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Nearby Friends](https://alisol.ir/?ai=Nearby%20Friends%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29%7Cfa)

---

## فصل ۳: Google Maps

**خلاصه**: در این فصل طراحی یک سرویس نقشه‌محور مثل Google Maps بررسی می‌شود؛ سرویسی که شامل Navigation، نمایش ترافیک و محاسبهٔ ETA است. نیازهای کلیدی مثل **دقت مسیرها**، **Latency پایین** و **توانایی مدیریت حجم عظیم داده** مطرح می‌شود. APIهایی مثل Directions و Map Tiles تعریف می‌گردند.  
در طراحی سطح بالا، **Tile Server**ها مسئول رندر کردن Map Tileها هستند، Road Graph در یک Graph Database یا ساختار مناسب دیگر ذخیره می‌شود، و سرویس‌های دیگری برای جمع‌آوری ترافیک Real-time وجود دارند. الگوریتم‌های کوتاه‌ترین مسیر مثل **Dijkstra** و **A*** برای پیدا کردن مسیر استفاده می‌شوند، همراه با Preprocessing برای بالا بردن سرعت.  
در بخش Deep Dive، درباره Partition کردن داده‌های نقشه، استفاده از **CDN** برای توزیع Tiles، و دریافت ترافیک لحظه‌ای با Kafka Streams بحث می‌شود.

**مثال**: وقتی از خانه تا محل کار Directions می‌خواهی، سیستم یک گراف از جاده‌ها می‌سازد، ترافیک زنده را (که از دادهٔ کاربران جمع شده) در نظر می‌گیرد، کوتاه‌ترین مسیر مناسب را پیدا می‌کند، Tiles نقشه و دستورهای Turn-by-Turn را برمی‌گرداند تا اپ بتواند روی دستگاه تو نمایش دهد.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Google Maps](https://alisol.ir/?ai=Google%20Maps%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29%7Cfa)

---

## فصل ۴: Distributed Message Queue

**خلاصه**: این فصل طراحی یک سیستم Queue توزیع‌شده مثل Kafka را توضیح می‌دهد؛ سیستمی برای **Pub/Sub** با Throughput بالا و **Durability** مناسب. نیازمندی‌هایی مثل **At-least-once Delivery** و **Partitioning** برای Scale مطرح می‌شوند. APIهایی برای Publish، Subscribe و مدیریت Offsetها طراحی می‌شود.  
در معماری سطح بالا، چند **Broker** وجود دارد که Topicها و Partitionها روی آن‌ها پخش می‌شوند، Leader هر Partition مسئول Write است و Replicaها برای Fault Tolerance استفاده می‌شوند.  
در Deep Dive، روی Leader Election (مثلاً با ZooKeeper)، **Consumer Group**ها برای Parallelism، و **Log Compaction** برای کارایی Storage توضیح داده می‌شود.

**مثال**: در یک سیستم Logging، سرویس‌ها Events را روی یک Topic Publish می‌کنند؛ چند Consumer داخل یک Consumer Group از Partitionها می‌خوانند، به‌صورت موازی پردازش می‌کنند و Offsetها را Commit می‌کنند تا در صورت Failure از جایی که بودند ادامه بدهند و Event از دست نرود.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Distributed Message Queue](https://alisol.ir/?ai=Distributed%20Message%20Queue%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29%7Cfa)  

*یادداشت شخصی*: Kafka هنوز برای این سناریو عالی است، اما در ۲۰۲۵ خیلی جاها **Apache Pulsar** را هم می‌بینیم که به‌خاطر **Tiered Storage** داخلی و **Multi-tenancy** راحت‌تر در Cloud محبوب شده.

---

## فصل ۵: Metrics Monitoring and Alerting System

**خلاصه**: این بخش روی طراحی سیستم Monitoring و Alerting برای اپلیکیشن‌ها (چیزی شبیه Datadog) تمرکز دارد؛ سیستمی برای جمع‌آوری **Time-series Metrics** در Scale بالا با Overhead کم. APIهایی برای Push کردن Metrics و Query برای Dashboardها وجود دارد.  
در طراحی سطح بالا، **Collector**ها داده‌ها را جمع می‌کنند، یک Time-series Database مثل InfluxDB برای ذخیره، و یک سیستم Alerting برای Ruleها وجود دارد.  
در Deep Dive، درباره Downsampling برای نگهداری طولانی‌مدت، Sharding بر اساس زمان یا Host، و Integrate شدن با سرویس‌هایی مثل PagerDuty برای Notification بحث می‌شود.

**مثال**: فرض کن وب‌اپ تو هر دقیقه تعداد Requests را ارسال می‌کند؛ سیستم آن را ذخیره می‌کند، روی آن Ruleهایی مثل Threshold یا Anomaly Detection اجرا می‌کند، و در صورت Spike غیرعادی، به On-call Engineer پیج می‌زند تا مشکل را بررسی کند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Metrics Monitoring and Alerting System](https://alisol.ir/?ai=Metrics%20Monitoring%20and%20Alerting%20System%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29%7Cfa)  

*یادداشت شخصی*: InfluxDB هنوز کاربردی است، اما برای Scaleهای بزرگ‌تر در ۲۰۲۵ معمولا از ترکیب **Prometheus + Thanos** مخصوصاً روی Kubernetes استفاده می‌شود که هم Federation خوبی می‌دهد هم Storage طولانی‌مدت بهتری روی Object Storage دارد.

---

## فصل ۶: Ad Click Event Aggregation

**خلاصه**: این فصل درباره طراحی سیستم Aggregation برای رویدادهای تبلیغاتی (مثل Click/Impression) است؛ سیستمی برای شمردن Viewها و Clickها جهت **Billing** و گزارش‌دهی. این سیستم باید حجم بسیار بالای Eventها را با Windowهای زمانی مختلف هندل کند.  
مسیر کلی: Eventها با **Kafka** ingest می‌شوند، با Engineهایی مثل **Flink** پردازش Streamی می‌شوند، و در نهایت در یک OLAP Database مثل Druid برای Query سریع ذخیره می‌شوند.  
در Deep Dive، درباره Windowهای مختلف (Tumbling, Sliding و...)، Watermarkها برای Eventهای دیررس (Late Events)، و معماری **Lambda** برای Reprocessing داده‌های تاریخی صحبت می‌شود.

**مثال**: یک پلتفرم تبلیغاتی را تصور کن که هر Click روی آگهی را Log می‌کند؛ سیستم این رویدادها را بر اساس Campaign و بازه‌های زمانی (مثلاً ساعتی) گروه‌بندی می‌کند، Aggregation را انجام می‌دهد و Advertiser می‌تواند از طریق Dashboard وضعیت Performance کمپین را ببیند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Ad Click Event Aggregation](https://alisol.ir/?ai=Ad%20Click%20Event%20Aggregation%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29%7Cfa)  

*یادداشت شخصی*: Flink برای این کار فوق‌العاده است، اما در ۲۰۲۵ خیلی تیم‌ها به سمت **Apache Beam** روی Cloud Runnerها رفته‌اند تا Batch و Stream را با یک Model یکپارچه هندل کنند.

---

## فصل ۷: Hotel Reservation System

**خلاصه**: این فصل روی طراحی سیستم رزرو هتل/اقامتگاه مثل Airbnb تمرکز می‌کند؛ جایی که باید موجودی (Inventory) و رزروها را بدون Overbooking مدیریت کنیم. نیازمندی‌های کلیدی: **Updateهای اتمیک** و **Idempotency** هستند. APIهایی برای Search، Book و Cancel تعریف می‌شود.  
در طراحی سطح بالا، دیتابیس‌هایی با Constraintهای مناسب برای موجودی وجود دارند، سرویس‌هایی برای Inventory و Payments طراحی می‌شوند.  
در Deep Dive، روی تکنیک‌های Locking برای مسئلهٔ Concurrency، استفاده از **Saga Pattern** برای تراکنش‌های توزیع‌شده، و Cache کردن Availability صحبت می‌شود.

**مثال**: وقتی برای تاریخ‌های مشخصی دنبال اتاق می‌گردی، سیستم وضعیت موجودی را در لحظه چک می‌کند؛ وقتی پرداخت موفق شد رزرو را ثبت و موجودی را کم می‌کند تا در همان بازهٔ زمانی شخص دیگری نتواند همان اتاق را دوباره رزرو کند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Hotel Reservation System](https://alisol.ir/?ai=Hotel%20Reservation%20System%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29%7Cfa)

---

## فصل ۸: Distributed Email Service

**خلاصه**: در این فصل طراحی سرویسی شبیه Gmail بررسی می‌شود؛ سیستمی برای ارسال/دریافت ایمیل با Spam Filtering. پروتکل‌هایی مثل **SMTP** و **IMAP** و Storage برای Attachments پوشش داده می‌شود.  
در طراحی سطح بالا، Mail Serverهای ورودی و خروجی، دیتابیس‌هایی برای Mailboxها، و سرویس‌های Filtering وجود دارند.  
در Deep Dive، درباره Sharding کاربران، استفاده از **Inverted Index** برای Search در ایمیل‌ها، و استفاده از **DKIM/SPF** برای تأیید هویت فرستنده صحبت می‌شود.

**مثال**: وقتی ایمیل می‌فرستی، پیام از طریق SMTP ارسال می‌شود، در Mailbox ذخیره می‌شود و گیرنده از طریق IMAP آن را دریافت می‌کند؛ در این میان فیلترهای Spam ایمیل‌های Junk را قبل از نمایش جدا می‌کنند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Distributed Email Service](https://alisol.ir/?ai=Distributed%20Email%20Service%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29%7Cfa)

---

## فصل ۹: S3-like Object Storage

**خلاصه**: این فصل طراحی یک سیستم Object Storage شبیه Amazon S3 را پوشش می‌دهد؛ سیستمی برای نگهداری فایل‌ها (Blobها) با **Durability** و **Availability** بالا. APIهایی برای `PUT/GET/DELETE` تعریف می‌شوند.  
در معماری سطح بالا، یک **Metadata Database** برای مدیریت اطلاعات فایل‌ها (Bucket, Key, Location و...) داریم و **Storage Node**هایی که داده‌های واقعی روی آن‌ها با Replication ذخیره می‌شود.  
در Deep Dive، درباره **Consistent Hashing** برای Placement داده‌ها، **Erasure Coding** به‌جای RAIDهای سنتی، و استفاده از Checksums برای اطمینان از **Data Integrity** صحبت می‌شود.

**مثال**: وقتی یک عکس Upload می‌کنی، سیستم آن را به Chunkهای کوچک‌تر تقسیم می‌کند، روی Nodeهای متفاوت Replicate می‌کند، و Metadata را طوری ذخیره می‌کند که بعداً بتواند خیلی سریع فایل را پیدا و برگرداند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: S3-like Object Storage](https://alisol.ir/?ai=S3-like%20Object%20Storage%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29%7Cfa)

---

## فصل ۱۰: Real-time Gaming Leaderboard

**خلاصه**: این فصل روی طراحی Leaderboard برای بازی‌ها تمرکز دارد؛ سیستمی که باید امتیازها را در **Real-time** آپدیت کند و Ranking را سریع برگرداند. ساختاری مثل **Redis Sorted Set** برای Query سریع رتبه‌ها و محدوده‌ها استفاده می‌شود.  
در طراحی سطح بالا، Eventها ingest می‌شوند، یک Scoring Service آن‌ها را پردازش می‌کند و یک دیتابیس برای Persistence وجود دارد.  
در Deep Dive، درباره Sharding بر اساس Game، استفاده از TTL برای حذف داده‌های قدیمی، و مدیریت حالت Tie در امتیازها صحبت می‌شود.

**مثال**: یک بازی موبایلی را تصور کن که هر بار امتیازت تغییر می‌کند، Event آن به سیستم ارسال می‌شود؛ سیستم امتیاز را در Redis آپدیت می‌کند، تو را بین بقیه رتبه‌بندی می‌کند و لیست Top 100 را تقریباً فوری برمی‌گرداند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Real-time Gaming Leaderboard](https://alisol.ir/?ai=Real-time%20Gaming%20Leaderboard%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29%7Cfa)

---

## فصل ۱۱: Payment System

**خلاصه**: این فصل طراحی یک سیستم پرداخت شبیه PayPal را بررسی می‌کند؛ سیستمی برای تراکنش‌های مالی با امنیت بالا و Idempotency. APIهایی برای پرداخت (Pay) و Refund تعریف می‌شوند.  
در معماری سطح بالا، **Payment Gateway**ها، Payment Processor، و Ledgerهایی با مدل **Double-entry** وجود دارند.  
در Deep Dive، روی **PCI Compliance**، استفاده از **Saga** برای Consistency در تراکنش‌های توزیع‌شده، و استفاده از Webhook برای Notificationها صحبت می‌شود.

**مثال**: وقتی در یک فروشگاه آنلاین پرداخت می‌کنی، سیستم کارت را Authorize می‌کند، حساب‌ها را به‌صورت اتمیک Debit/Credit می‌کند، و در صورت موفقیت، Merchant را از طریق Webhook یا Callback مطلع می‌کند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Payment System](https://alisol.ir/?ai=Payment%20System%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29%7Cfa)

---

## فصل ۱۲: Digital Wallet

**خلاصه**: این فصل درباره طراحی یک کیف پول دیجیتال مثل Apple Pay است؛ سیستمی برای مدیریت Balanceها و Transferها با تأکید روی Security و Auditability.  
برای ثبت تراکنش‌ها از **Event Sourcing** استفاده می‌شود و Stream آن‌ها معمولاً روی Kafka قرار می‌گیرد. در معماری سطح بالا، سرویس‌هایی برای Top-up، Transfer و مدیریت Ledger وجود دارد.  
در Deep Dive، روی **Idempotency Key** برای جلوگیری از دوباره‌پرداخت، فرآیند **Reconciliation** و مکانیزم‌های **Anti-fraud** تمرکز شده است.

**مثال**: وقتی برای دوستی پول انتقال می‌دهی، سیستم اول موجودی را چک می‌کند، یک سری Event ثبت می‌کند، سپس Wallet هر دو طرف را آپدیت می‌کند به‌طوری که Double-spend اتفاق نیفتد.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Digital Wallet](https://alisol.ir/?ai=Digital%20Wallet%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29%7Cfa)

---

## فصل ۱۳: Stock Exchange

**خلاصه**: آخرین فصل به طراحی سیستم یک بورس مثل NYSE می‌پردازد؛ سیستمی با Latency بسیار پایین و **Fairness** در انجام معاملات. نیازمندی‌ها شامل Response در حد میلی‌ثانیه، Order APIها و Market Data APIها هستند.  
در طراحی سطح بالا، **Gateway**هایی برای دریافت Orderها، یک **Matching Engine** برای Match کردن Buy/Sell، و یک سیستم Publish برای Market Data وجود دارد. مدل داده شامل Order Book و ساختارهایی برای نمودار قیمت‌هاست.  
در Deep Dive، به Optimization روی یک سرور واحد (برای Determinism بیشتر)، استفاده از **Event Sourcing** برای ثبت کامل وقایع، به‌کارگیری پروتکل‌هایی مثل **Raft** برای High Availability، و **Multicast** برای پخش عادلانهٔ Market Data پرداخته می‌شود.

**مثال**: وقتی یک Buy Order ثبت می‌کنی، سیستم آن را در صف درست قرار می‌دهد، با Sell Orderهای موجود به‌صورت FIFO مچ می‌کند، Order Book را آپدیت می‌کند و نتیجهٔ معاملات (Fillها) را برای همهٔ شرکت‌کنندگان Broadcast می‌کند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Stock Exchange](https://alisol.ir/?ai=Stock%20Exchange%7CAlex%20Xu%7CSystem%20Design%20Interview%20%28Volume%202%29%7Cfa)

---

## دربارهٔ خلاصه‌کننده

من *Ali Sol* هستم، یک PHP Developer. برای آشنایی بیشتر:

* وب‌سایت: [alisol.ir](https://alisol.ir)
* لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
