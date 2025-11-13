# ؜‫System Design Mock Interview: System Design of Doordash: Geo-Hashing and WebSockets for Location Based Services

* عنوان: Design Food Delivery App like Doordash | Geo-Hashing and WebSockets for Location Based Services *

؜**کانال/مصاحبه‌کننده؜**: Gaurav Sen  
؜**مدت زمان؜**: 00:50:28  
؜**ویدیوی اصلی؜**: https://www.youtube.com/watch?v=iRhSAR3ldTw

> *این سند خلاصه‌ای از محتوای کلیدی یک مصاحبه ساختگی طراحی سیستم است. ؜پیشنهاد می‌کنم اگر می‌توانید، ویدیو کامل را تماشا کنید.*

---

# ؜خلاصه اجرایی یک‌صفحه‌ای

؜**صورت مسئله (یک‌خطی)؜**: طراحی یک سیستم تحویل غذا مانند DoorDash، با تمرکز بر تطبیق مشتریان با پرسنل تحویل نزدیک (dashers) و امکان ردیابی مکان در زمان واقعی.

؜**دامنه اصلی؜**: در دامنه شامل قرار دادن سفارش، تطبیق dasher نزدیک به رستوران، و به‌اشتراک‌گذاری مکان واقعی از طریق WebSockets. ؜خارج از دامنه شامل onboarding کاربران، onboarding رستوران‌ها، پرداخت‌ها (فرض بر outsourcing به Stripe)، و جنبه‌های غیرتحویلی.

؜**اولویت‌های غیرعملکردی؜**: مقیاس‌پذیری برای مدیریت ۱۰ میلیون کاربر فعال و سفارش روزانه؛ latency پایین برای تطبیق و به‌روزرسانی‌ها؛ دسترسی بالا از طریق replication؛ کارایی هزینه با استفاده از ذخیره‌های in-memory مانند Redis برای داده‌های جغرافیایی.

؜**محدودیت‌ها و اعداد کلیدی؜**: ۱۰ میلیون کاربر فعال در ایالات متحده؛ ۱۰ میلیون سفارش روزانه؛ حدود ۵۰۰,۰۰۰ dasher (با فرض ۲۰ تحویل روزانه به ازای هر dasher)؛ ذخیره داده کاربر حدود ۵ گیگابایت؛ تمرکز بر نزدیکی جغرافیایی برای تطبیق در فاصله‌های معقول.

؜**معماری سطح بالا (متنی)؜**:
- ؜کلاینت‌ها (موبایل/وب) درخواست‌های REST برای ایجاد حساب و قرار دادن سفارش ارسال می‌کنند.
- ؜سرویس‌های backend درخواست‌ها را مدیریت می‌کنند، با یک DB relational (MySQL) برای اطلاعات کاربر/dasher.
- ؜ذخیره geo-sharded in-memory (Redis) از geo-hashing برای index و query dasherهای نزدیک بر اساس مکان رستوران‌ها استفاده می‌کند.
- ؜سرویس تطبیق از طریق pub-sub یا push notifications به dasherهای در دسترس در منطقه جغرافیایی اطلاع می‌دهد.
- ؜ردیابی مکان واقعی از طریق WebSockets، با سرورهای load-balanced که به‌روزرسانی‌ها را بین مشتری و dasher relay می‌کنند.
- ؜Replication (single-leader) برای دوام داده، هماهنگ‌شده توسط ابزارهایی مانند ZooKeeper.
- ؜اطلاع‌رسانی‌های asynchronous برای پذیرش سفارش.

؜**مهم‌ترین trade-offها؜**:
- ؜Relational (MySQL) در مقابل NoSQL (Cassandra): MySQL برای سادگی و نیازهای احتمالی ACID انتخاب شد، اما Cassandra writes سریع‌تری ارائه می‌دهد.
- ؜In-memory (Redis) برای سرعت در مقابل ذخیره persistent: اولویت به queryهای low-latency نسبت به دوام برای داده‌های مکان transient.
- ؜دقت Geo-hashing: تعادل بین سرعت query و دقت با تنظیم طول hash برای پوشش مناطق نزدیک بدون false positiveهای زیاد.
- ؜WebSockets در مقابل long polling: WebSockets برای به‌روزرسانی‌های bidirectional واقعی، جلوگیری از overhead header.
- ؜Direct peer-to-peer (WebRTC) در مقابل server-mediated: Server-mediated برای قابلیت اطمینان و logging احتمالی، هرچند peer-to-peer بار سرور را کاهش می‌دهد.
- ؜Sharding بر اساس geo-hash در مقابل ساختارهای دیگر (مثل quad trees): Geo-hashing از prefixها برای range queryها در indexهای مرتب‌شده بهره می‌برد.

؜**بزرگ‌ترین ریسک‌ها/حالات شکست؜**:
- ؜Hotspotها در مناطق محبوب که shardها را overload می‌کنند؛ mitigate با re-sharding پویا یا load balancing.
- ؜تطبیق نادرست به دلیل مسائل مرز geo-hash؛ با query hashهای مجاور mitigate شود.
- ؜بار اتصال بالا از WebSockets؛ با load balancerها مقیاس شود و اتصالات پس از تحویل terminate شوند.
- ؜از دست رفتن داده در failover replication؛ با ابزارهای consensus مانند ZooKeeper mitigate شود.
- ؜محدودیت‌های مقیاس‌پذیری (مثل ۶۵K اتصال به ازای سرور)؛ مقیاس افقی و نظارت.
- ؜نشت حریم خصوصی در به‌اشتراک‌گذاری مکان؛ اطمینان از دسترسی فقط برای طرف‌های تطبیق‌شده.

؜**فلش‌کارت‌های بررسی ۵ دقیقه‌ای؜**:
- ؜س: تمرکز اصلی چیست؟ → ج: تطبیق و ردیابی تحویل، نه پرداخت یا onboarding.
- ؜س: مقیاس کاربر؟ → ج: ۱۰ میلیون کاربر فعال، ۱۰ میلیون سفارش روزانه، ۵۰۰ هزار dasher.
- ؜س: انتخاب DB برای کاربران؟ → ج: MySQL با replication single-leader برای سادگی.
- ؜س: DB جایگزین؟ → ج: Cassandra برای writes سریع‌تر و setup masterless.
- ؜س: چگونه dasherها تطبیق شوند؟ → ج: Geo-hashing بر مکان lat/long رستوران برای یافتن dasherهای نزدیک در Redis.
- ؜س: فایده Geo-hash؟ → ج: Queryهای مبتنی بر prefix برای جستجوی نزدیکی کارآمد.
- ؜س: اطلاع‌رسانی به dasherها؟ → ج: Pub-sub یا push به در دسترس‌ها در منطقه جغرافیایی.
- ؜س: ردیابی واقعی؟ → ج: WebSockets برای pingهای bidirectional مکان از طریق سرور load-balanced.
- ؜س: جایگزین WebSockets؟ → ج: Long polling (اما overhead بالاتر) یا SSE برای uni-directional.
- ؜س: گزینه peer-to-peer؟ → ج: WebRTC برای به‌روزرسانی‌های مستقیم، کاهش بار سرور اما پیچیدگی auth بیشتر.
- ؜س: ابزار هماهنگی؟ → ج: ZooKeeper یا etcd برای مدیریت failover.
- ؜س: جایگزین‌های geo؟ → ج: Quad trees یا Hilbert curves برای queryهای فاصله دقیق‌تر.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%7Cfa)

---

# ؜تگ‌های مصاحبه

؜**دامنه/صنعت؜**: delivery  
؜**الگوی محصول؜**: pub-sub, notification  
؜**نگرانی‌های سیستم؜**: low-latency, geo-replication  
؜**زیرساخت/تکنولوژی؜**: microservices, rest, websocket, mysql, cassandra, redis, kafka, zookeeper

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%7Cfa)

---

# ؜درک مسئله

؜**صورت مسئله اصلی؜**: طراحی DoorDash (مشابه Swiggy/Zomato در هند)، جایی که کاربران غذا از رستوران‌ها سفارش می‌دهند، dasherها تحویل می‌گیرند و می‌رسانند، با تمرکز بر تطبیق و ردیابی.

؜**موارد استفاده؜**: اصلی: کاربر سفارش قرار می‌دهد، سیستم dasher نزدیک به رستوران تطبیق می‌دهد، dasher قبول می‌کند، ردیابی مکان dasher در زمان واقعی. ؜فرعی: ایجاد حساب، به‌روزرسانی مکان از dasherها.

؜**خارج از دامنه؜**: Onboarding کاربر/رستوران، پردازش پرداخت (outsourced)، یافتن مکان رستوران‌ها.

؜**APIها (اگر بحث شد)؜**:  
- ؜ایجاد حساب: POST با اطلاعات کاربر (ایمیل، مکان، preferences). ؜ 
- ؜قرار دادن سفارش: POST با ID رستوران، lat/long مشتری؛ dasher تطبیق‌شده برمی‌گرداند. ؜ 
- ؜به‌روزرسانی‌های واقعی از طریق WebSockets مدیریت می‌شوند، نه endpointهای REST صریح.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%7Cfa)

---

# ؜الزامات و محدودیت‌ها

؜**الزامات عملکردی؜** (داده‌شده در ویدیو):  
- ؜کاربران حساب ایجاد می‌کنند و سفارش از رستوران‌ها قرار می‌دهند. ؜ 
- ؜سفارش‌ها با dasherهای نزدیک در دسترس بر اساس نزدیکی رستوران تطبیق شوند. ؜ 
- ؜Dasherها سفارش‌ها را از طریق notifications قبول/رد می‌کنند. ؜ 
- ؜به‌اشتراک‌گذاری مکان dasher و مشتری در زمان واقعی پس از تطبیق.

؜**الزامات غیرعملکردی؜** (داده‌شده در ویدیو):  
- ؜مقیاس‌پذیری: مدیریت ۱۰ میلیون کاربر/سفارش روزانه؛ geo-sharding برای queryهای مبتنی بر مکان. ؜ 
- ؜Latency: تطبیق و به‌روزرسانی سریع (in-memory برای داده‌های geo). ؜ 
- ؜دسترسی: Replication برای جلوگیری از از دست رفتن داده؛ هماهنگی failover. ؜ 
- ؜Consistency: Eventual برای داده‌های مکان؛ قوی‌تر برای اطلاعات کاربر اگر لازم.

؜**الزامات عملکردی؜** (فرضیات):  
- ؜فرض بر به‌روزرسانی دوره‌ای مکان dasherها. ؜ 
- ؜فرض بر pre-onboarded بودن مکان رستوران‌ها با lat/long.

؜**الزامات غیرعملکردی؜** (فرضیات):  
- ؜تمرکز بر منطقه ایالات متحده؛ بدون جزئیات latency جهانی. ؜ 
- ؜هزینه: استفاده از ذخیره‌های in-memory کارآمد برای minimize compute.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%7Cfa)

---

# ؜تخمین پشت‌پاکت

- ؜ذخیره کاربر: حدود ۲۰۰-۵۰۰ بایت به ازای کاربر × ۱۰ میلیون کاربر = حدود ۵ گیگابایت (در یک DB جا می‌شود، اما برای رشد shard شود). ؜ 
- ؜ذخیره Dasher: مشابه، حدود ۵۰۰ هزار dasher = footprint کوچکتر. ؜ 
- ؜سفارش‌های روزانه: ۱۰ میلیون، با فرض QPS پیک حدود ۱۱۵ (۱۰ میلیون / ۸۶۴۰۰ ثانیه)، اما queryهای تطبیق به ازای سفارش حدود ۱-۱۰. ؜ 
- ؜به‌روزرسانی‌های مکان: Dasherها هر چند ثانیه به‌روزرسانی؛ حدود ۵۰۰ هزار dasher × ۱ به‌روزرسانی در دقیقه = حدود ۸ هزار QPS، در in-memory مدیریت شود. ؜ 
- ؜تعداد Shard: مبتنی بر geo، احتمالاً صدها بر اساس منطقه برای تعادل بار. ؜ 
- ؜پهنای باند: حداقل برای APIهای مبتنی بر متن؛ بالاتر برای pingهای WebSocket (چند کیلوبایت به ازای جلسه).

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%7Cfa)

---

# ؜معماری سطح بالا

- ؜؜**لایه کلاینت؜**: اپ‌های موبایل/وب درخواست‌های REST برای سفارش و ایجاد WebSockets برای ردیابی ارسال می‌کنند. ؜ 
- ؜؜**API Gateway/Load Balancer؜**: به سرویس‌های backend route می‌کند؛ auth را مدیریت می‌کند. ؜ 
- ؜؜**سرویس‌های Backend؜**: سرویس سفارش placements را پردازش می‌کند، سرویس تطبیق از داده‌های geo برای یافتن dasherها در نزدیکی استفاده می‌کند. ؜ 
- ؜؜**ذخیره‌های داده؜**: MySQL (replicated) برای داده‌های persistent کاربر/dasher/سفارش؛ Redis (geo-sharded) برای indexهای مکان واقعی. ؜ 
- ؜؜**Geo-Indexing؜**: تبدیل lat/long به geo-hashها؛ ذخیره در Redis برای range queryها. ؜ 
- ؜؜**کامпонنت‌های Async؜**: Pub-sub (مثل Kafka) برای اطلاع به dasherهای در دسترس در منطقه. ؜ 
- ؜؜**لایه واقعی؜**: سرورهای WebSocket به‌روزرسانی‌های مکان را بین جفت‌های تطبیق‌شده relay می‌کنند. ؜ 
- ؜؜**هماهنگی؜**: ZooKeeper/etcd برای failover DB و مدیریت shard.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%7Cfa)

---

## ؜زیرسیستم: Matching Service

؜**نقش و مسئولیت‌ها؜**: سفارش‌ها را به dasherهای نزدیک در دسترس بر اساس مکان رستوران تطبیق می‌دهد؛ به dasherها اطلاع می‌دهد.

؜**مدل داده (فقط از ویدیو)؜**: Dasherها: ID, lat/long (geo-hashed), وضعیت در دسترس. ؜رستوران‌ها: ID, lat/long (geo-hashed). ؜سفارش‌ها: ID, ID رستوران, lat/long مشتری.

؜**APIها/قراردادها؜**: Endpoint قرار دادن سفارش تطبیق را trigger می‌کند؛ query داخلی به Redis برای dasherها در محدوده geo.

؜**مقیاس‌پذیری و Partitioning؜**: Redis را بر اساس prefixهای hash geo-shard کنید؛ افقی برای مناطق پرترافیک مقیاس شود.

؜**استراتژی Caching؜**: In-memory Redis برای مکان‌ها (transient, بدون نیاز به TTL زیرا به‌روزرسانی‌ها overwrite می‌کنند).

؜**مدل Consistency؜**: Eventual برای داده‌های مکان (dasherها دوره‌ای به‌روزرسانی).

؜**بوتل‌نک‌ها و Hot Keyها؜**: مناطق محبوب shardها را overload می‌کنند؛ با query hashهای مجاور mitigate شود.

؜**مدیریت شکست؜**: Retry notifications؛ پذیرش idempotent برای مدیریت duplicates.

؜**ملاحظات هزینه؜**: In-memory کارآمد برای readهای بالا؛ shardها را بر حسب نیاز مقیاس کنید.

[Ask AI: Subsystem - ؜Matching Service](https://alisol.ir/?ai=Subsystem%20-%20Matching%20Service%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%7Cfa)

---

## ؜زیرسیستم: Real-Time Tracking

؜**نقش و مسئولیت‌ها؜**: مکان‌های زنده را بین مشتری و dasher پس از تطبیق به‌اشتراک می‌گذارد.

؜**مدل داده (فقط از ویدیو)؜**: جلسه: ID سفارش, ID dasher, ID مشتری؛ به‌روزرسانی‌های دوره‌ای lat/long.

؜**APIها/قراردادها؜**: اتصال WebSocket با ID سفارش؛ pingهای bidirectional.

؜**مقیاس‌پذیری و Partitioning؜**: سرورهای WebSocket را load balance کنید؛ جفت‌های تطبیق‌شده را به همان instance route کنید.

؜**استراتژی Caching؜**:適用‌پذیر نیست؛ حالت جلسه in-memory.

؜**مدل Consistency؜**: Eventual؛ pingهای از دست‌رفته tolerable.

؜**بوتل‌نک‌ها و Hot Keyها؜**: محدودیت‌های اتصال به ازای سرور؛ مقیاس افقی.

؜**مدیریت شکست؜**: Reconnect در drop؛ fallback به polling اگر لازم.

؜**ملاحظات هزینه؜**: مبتنی بر اتصال؛ پس از تحویل terminate برای آزادسازی منابع.

[Ask AI: Subsystem - ؜Real-Time Tracking](https://alisol.ir/?ai=Subsystem%20-%20Real-Time%20Tracking%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%7Cfa)

---

## ؜زیرسیستم: Data Storage

؜**نقش و مسئولیت‌ها؜**: اطلاعات کاربر, dasher, و سفارش را persistently ذخیره می‌کند.

؜**مدل داده (فقط از ویدیو)؜**: کاربران: ID, ایمیل, preferences, مکان. ؜Dasherها: مشابه + در دسترس. ؜سفارش‌ها: ID, وضعیت, timestamps.

؜**APIها/قراردادها؜**: CRUD برای حساب‌ها/سفارش‌ها.

؜**مقیاس‌پذیری و Partitioning؜**: بر اساس ID کاربر یا منطقه shard؛ برای HA replicate.

؜**استراتژی Caching؜**: جزئیات داده‌نشده؛ پتانسیل برای preferences کاربر.

؜**مدل Consistency؜**: Strong از طریق ACID برای سفارش‌ها.

؜**بوتل‌نک‌ها و Hot Keyها؜**: Spikeهای write در پیک‌ها؛ با replication mitigate.

؜**مدیریت شکست؜**: Failover با ZooKeeper؛ replication async.

؜**ملاحظات هزینه؜**: Relational برای سادگی نسبت به سرعت NoSQL.

[Ask AI: Subsystem - ؜Data Storage](https://alisol.ir/?ai=Subsystem%20-%20Data%20Storage%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%7Cfa)

---

# ؜Trade-offها و جایگزین‌ها

| موضوع | گزینه A | گزینه B | تمایل ویدیو | دلیل (از ویدیو) |
|-------|----------|----------|---------------|-------------------|
| دیتابیس برای کاربران | MySQL (relational) | Cassandra (NoSQL) | MySQL | توسعه ساده‌تر، ACID برای پرداخت‌های احتمالی؛ Cassandra برای writes سریع‌تر اما نیازهای relational کمتر. ؜|
| Geo-Indexing | Geo-hashing | Quad trees/Hilbert curves | Geo-hashing | Queryهای کارآمد مبتنی بر prefix در DBهای مرتب‌شده؛ جایگزین‌ها برای دقت فاصله بهتر اما پیچیدگی بیشتر. ؜|
| پروتکل واقعی | WebSockets | Long polling | WebSockets | Bidirectional و persistent؛ polling overhead header و فشار سرور برای به‌روزرسانی‌های مکرر اضافه می‌کند. ؜|
| سبک اتصال | Server-mediated | Peer-to-peer (WebRTC) | Server-mediated | Logging آسان‌تر و قابلیت اطمینان؛ peer-to-peer بار را کاهش می‌دهد اما auth اضافی نیاز دارد. ؜|
| اطلاع‌رسانی | Pub-sub (مثل Kafka) | Direct push | Pub-sub | مقیاس‌پذیر برای broadcasting به dasherهای در دسترس در منطقه؛ direct برای سادگی اما انعطاف کمتر. ؜|
| Replication | Single-leader | Masterless | Single-leader | حل تعارض ساده‌تر؛ masterless برای دسترسی بهتر اما پیچیده‌تر. ؜|

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%7Cfa)

---

# ؜قابلیت اطمینان، دسترسی، و عملکرد

- ؜Replication: Single-leader برای DB کاربر برای جلوگیری از تعارض‌ها؛ followers async. ؜ 
- ؜بودجه Latency: In-memory Redis برای تطبیق کمتر از ۱ ثانیه؛ WebSockets برای به‌روزرسانی‌های نزدیک به واقعی. ؜ 
- ؜Backpressure و Throttling: اطلاع‌رسانی‌ها را به dasherهای در دسترس محدود کنید؛ overflowهای queue. ؜ 
- ؜Load Shedding و Degradation: اولویت به تطبیق نسبت به به‌روزرسانی‌های غیربحرانی. ؜ 
- ؜بازیابی فاجعه: Failover از طریق ZooKeeper؛ RPO پایین با replication.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%7Cfa)

---

# ؜امنیت و حریم خصوصی

در ویدیو بیان نشده.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%7Cfa)

---

# ؜مشاهده‌پذیری

در ویدیو بیان نشده.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%7Cfa)

---

# ؜سؤالات پیگیری

- ؜چگونه به‌روزرسانی‌های مکان dasher مدیریت شوند؟ (فرض بر pingهای دوره‌ای.)  
- ؜چرا تمرکز بر نزدیکی رستوران-dasher نسبت به مشتری؟ (فاصله مشتری-رستوران ثابت است.)  
- ؜جایگزین‌های geo-hashing؟ (Quad trees, Hilbert curves, یا off-the-shelf مثل PostGIS.)  
- ؜WebSockets در مقابل گزینه‌های واقعی دیگر؟ (Long polling ناکارآمد؛ WebRTC برای peer-to-peer.)  
- ؜چند اتصال به ازای سرور؟ (افقی مقیاس برای مدیریت محدودیت‌ها.)

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%7Cfa)

---

# ؜سؤالات کاندید

- ؜زمان‌های پیک سفارش و تغییرات منطقه‌ای چیست؟  
- ؜چگونه عدم در دسترس dasher یا رد را مدیریت کنیم؟  
- ؜SLOهایی برای latency تطبیق؟  
- ؜یکپارچگی با APIهای نقشه برای مسیرها؟  
- ؜نگهداری داده برای سفارش‌ها/مکان‌ها؟

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%7Cfa)

---

# ؜نکات کلیدی

- ؜تمرکز بر یک زیرسیستم (تحویل) اجازه کاوش عمیق‌تر طراحی را می‌دهد. ؜ 
- ؜Geo-hashing queryهای نزدیکی کارآمد از طریق تطبیق prefix در indexها را ممکن می‌سازد. ؜ 
- ؜اولویت به فاصله رستوران-dasher برای کارایی تطبیق. ؜ 
- ؜از ذخیره‌های in-memory مانند Redis برای عملیات geo low-latency استفاده کنید. ؜ 
- ؜WebSockets ایده‌آل برای ردیابی واقعی؛ load balancing برای مقیاس در نظر بگیرید. ؜ 
- ؜DBهای relational برای داده‌های کاربر کافی است؛ NoSQL برای سناریوهای high-write. ؜ 
- ؜برای سیستم‌های سنگین مکان، بر اساس geo shard کنید تا از hotspotها جلوگیری شود. ؜ 
- ؜اطلاع‌رسانی‌ها از طریق pub-sub بهتر از push مستقیم مقیاس می‌شوند. ؜ 
- ؜ابزارهای failover مانند ZooKeeper دسترسی بالا را تضمین می‌کنند. ؜ 
- ؜جایگزین‌هایی مانند quad trees یا PostGIS می‌توانند دقت را افزایش دهند. ؜ 
- ؜سرعت را در مقابل پیچیدگی در پروتکل‌های واقعی trade کنید. ؜ 
- ؜همیشه open-source/off-the-shelf را قبل از ساخت custom بررسی کنید.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%7Cfa)

---

# ؜واژه‌نامه

- ؜؜**Geo-hashing؜**: الگوریتم برای encode lat/long به رشته‌ها برای جستجوهای نزدیکی از طریق prefixها. ؜ 
- ؜؜**WebSockets؜**: پروتکل برای ارتباط full-duplex بر یک اتصال TCP واحد. ؜ 
- ؜؜**Pub-sub؜**: الگو برای messaging asynchronous که publishers به topicها ارسال می‌کنند، subscribers دریافت می‌کنند. ؜ 
- ؜؜**Sharding؜**: تقسیم داده‌ها بر سرورها برای مقیاس‌پذیری. ؜ 
- ؜؜**Replication؜**: کپی داده برای دسترسی. ؜ 
- ؜؜**ZooKeeper؜**: سرویس هماهنگی توزیع‌شده برای leader election و مدیریت config.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CGaurav%20Sen%7CSystem%20Design%20of%20Doordash%3A%20Geo-Hashing%20and%20WebSockets%20for%20Location%20Based%20Services%7Cfa)

---

# ؜Attribution

* ویدیو منبع: https://www.youtube.com/watch?v=iRhSAR3ldTw  
* کانال: Gaurav Sen  
* نکته: این سند خلاصه‌ای از مصاحبه ساختگی لینک‌شده است.

---

# ؜درباره خلاصه‌کننده

من *Ali Sol*، توسعه‌دهنده PHP هستم. ؜بیشتر بدانید:  

* website: [alisol.ir](https://alisol.ir)  
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
