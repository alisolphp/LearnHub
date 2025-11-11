# ؜؜مرور طراحی سیستم: طراحی Facebook / Instagram (News Feed)

- ؜؜؜**System Design Mock Interview؜**: طراحی Facebook / Instagram (News Feed)
- ؜؜؜**Channel/Interviewer؜**: CodeKarle
- ؜؜؜**Duration؜**: 00:46:33
- ؜؜؜**Original Video؜**: `https://www.youtube.com/watch?v=9-hjBGxuiEs`

> ؜این سند خلاصه‌ای از یک مصاحبهٔ طراحی سیستم است. ؜اگر فرصت دارید دیدن ویدئو کامل مفید است.

---

## ؜؜خلاصهٔ یک‌صفحه‌ای (۲–۳ دقیقه)

؜**خلاصهٔ مسئله (یک‌خطی)؜**  
طراحی یک شبکهٔ اجتماعی شبیه Facebook (قابل تطبیق برای Instagram/LinkedIn/Twitter) با Post (text/image/video)، Like، Comment، Share، Friend (undirected)، Profile، Timeline/Feed، Activity Log و Search در مقیاس بسیار بزرگ.

؜**دامنهٔ اصلی؜**  
- ؜؜در دامنه: post، like، comment، share، افزودن friend، صفحات پروفایل، timeline (خود کاربر + دوستان)، activity tracking، search، trends، relevance tags، و live updates. ؜ 
- ؜؜خارج از دامنه: nested comments؛ و Chat جزو این ساخت نیست.

؜**اولویت‌های Non‑Functional؜**  
- ؜؜سیستم read‑heavy، رندر کم‌تاخیر UI (با پذیرش کمی propagation lag)، پوشش جهانی (multi‑region/CDN)، هزینه‌مؤثر، مقیاس‌پذیری افقی برای سرویس‌ها و storage.

؜**اعداد/قیود کلیدی (فرض‌ها)؜**  
- ؜؜کاربر زیاد (MAU/DAU بسیار بالا)، دسترسی غالباً موبایلی، نوشتن‌های پرحجم در هر دقیقه: تصاویر، وضعیت‌ها، نظرات.

؜**معماری سطح بالا (متن)؜**  
؜Client (mobile/web) → Load Balancer/Reverse Proxy/Auth → Microservices (User, Graph, Post Injection, Post, Timeline, Like, Comment, Search, Live User) → Cache (Redis) → Stores (MySQL برای user/graph؛ Cassandra برای post/like/comment؛ S3 برای media؛ Elasticsearch برای search) → Streams (Kafka) → Analytics (Spark/Hadoop) → CDN/Asset Pipeline.

؜**Trade‑offهای مهم؜**  
- ؜؜؜**Push vs Pull Feed؜**: برای کاربران عادی pre‑materialize کردن timeline در Redis؛ برای کاربران مشهور merge‑on‑read برای پرهیز از fan‑out بزرگ. ؜ 
- ؜؜؜**Media Hotness Lifecycle؜**: محتوای داغ از CDN سرو شود؛ با افت دسترسی به S3 دموشن؛ در صورت رشد دوباره re‑promotion. ؜ 
- ؜؜؜**Relational vs Wide‑Column؜**: MySQL برای دادهٔ relational و نسبتاً ایستا (user/graph)؛ Cassandra برای داده‌های write‑heavy (post/engagement). ؜ 
- ؜؜؜**Latency vs Freshness؜**: چند ثانیه lag برای analytics/relevance قابل‌قبول، ولی latency رندر UI باید پایین بماند.

؜**ریسک‌ها/Failure Modes؜**  
- ؜؜Hot partition/hot key در Cassandra به‌خاطر partitioning بد. ؜ 
- ؜؜فشار cache اگر history زیادی از timeline در Redis نگه داریم (archival روزانه به Cassandra راه‌حل است). ؜ 
- ؜؜نوسان عملکرد جهانی بدون استقرار regional و CDN.

؜**فلش‌کارت مرور ۵ دقیقه‌ای؜**  
- ؜؜چرا Redis برای timeline؟ چون read‑heavy است و می‌توان postIdها را push کرد. ؜ 
- ؜؜چرا برای سلبریتی‌ها push نکنیم؟ fan‑out عظیم می‌شود؛ merge‑on‑read بهتر است. ؜ 
- ؜؜Asset کجا نگه می‌داریم؟ S3 + CDN و transcoding/resizing در Asset Service. ؜ 
- ؜؜Search با چی؟ Kafka → Elasticsearch → Search Service. ؜ 
- ؜؜شمارش سریع like؟ Cassandra + Redis atomic counters برای پست‌های تازه. ؜ 
- ؜؜علاقهٔ کاربر چطور؟ Stream به Hadoop/Spark؛ tagging محتوا؛ ساخت relevance tags کاربر.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

---

## ؜؜برچسب‌های مصاحبه (برای فیلتر کردن بعدی)

؜**دامنه/صنعت؜**: `social-media`, `analytics`, `search`  
؜**الگوی محصول؜**: `feed`, `timeline`, `newsfeed`, `url-shortener`, `object-storage`, `cdn`, `caching`, `search-index`, `pub-sub`, `recommendation`, `notification`  
؜**نگرانی‌های سیستمی؜**: `high-availability`, `low-latency`, `eventual-consistency`, `geo-replication`, `hot-key`, `autoscaling`  
؜**زیرساخت/تکنولوژی؜**: `microservices`, `rest`, `websocket`, `kafka`, `mysql`, `cassandra`, `redis`, `s3`, `hdfs`, `elasticsearch`, `spark`, `cdn`  
[یادداشت: در ۲۰۲۵ معمولاً به‌جای Hadoop/HDFS از cloud object storage + Spark/Flink استفاده می‌شود.]  
[یادداشت: Elasticsearch خوب است؛ OpenSearch یا سرویس‌های مدیریت‌شده، عملیات را کم می‌کند.]  
[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

---

## ؜؜درک مسئله

؜**پرومپت اصلی؜**  
طراحی social network مقیاس‌پذیر با Post (text/image/video)، Like، Comment، Share، افزودن Friend، مشاهدهٔ Timeline (خود + دوستان) و Activity Tracking؛ بهینه برای workloadهای read‑heavy و کاربران جهانی.

؜**Use Cases؜**  
- ؜؜Create Post (به‌همراه URL Shortener برای لینک‌ها). ؜ 
- ؜؜مشاهدهٔ Profile/Timeline خود و دیگران. ؜ 
- ؜؜Like/Comment/Share؛ شمارش Like؛ واکشی Comments. ؜ 
- ؜؜افزودن Friend (undirected). ؜ 
- ؜؜Activity Log از actions کاربر (post/like/comment/search).

؜**خارج از دامنه؜**  
- ؜؜Nested Comments (فقط comments روی post). ؜ 
- ؜؜Chat (صرفاً اشاره به استفاده از last accessed).

؜**APIs (سطح بالا)؜**  
- ؜؜User: get/update by userId؛ bulk fetch. ؜ 
- ؜؜Graph: لیست friends و وزن رابطه. ؜ 
- ؜؜Post: create/read by id؛ bulk read؛ timeline reads. ؜ 
- ؜؜Like/Comment: add؛ fetch counts/list. ؜ 
- ؜؜Search: query posts. ؜*(جزئیات schema ریکوئست/رسپانس تعیین نشده است.)*  
[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

---

## ؜؜نیازمندی‌ها و قیود

؜**Functional (ذکرشده در ویدئو)؜**  
- ؜؜Post (text/image/video + URL shortener)  
- ؜؜Like، Comment، Share  
- ؜؜Friend (undirected)  
- ؜؜Timeline (خود و aggregation دوستان)  
- ؜؜Profile  
- ؜؜Activity Log؛ Search؛ Trends؛ Relevance Tags

؜**Non‑Functional (ذکرشده در ویدئو)؜**  
- ؜؜Read‑dominant؛ رندر سریع؛ پذیرش چند ثانیه propagation lag؛ global availability؛ mobile‑first؛ horizontal scaling؛ observability کامل.

؜**فرضیات؜**  
- ؜؜تازگی نرم‑real‑time (در حد چند ده ثانیه). ؜ 
- ؜؜Relevance به‌صورت best‑effort (ترکیب ML tags + graph weights). ؜ 
[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

---

## ؜؜معماری سطح بالا

؜1. ؜؜؜**Clients & Edge؜**: Mobile/Web → LB/Reverse Proxy/Auth  
؜2. ؜؜؜**User Service (MySQL + Redis)؜**: منبع حقیقی پروفایل؛ cache؛ انتشار رویدادها به Kafka. ؜ 
؜3. ؜؜؜**Graph Service (MySQL + Redis)؜**: friendship (undirected) و وزن‌های رابطه؛ lookup سریع friends. ؜ 
؜4. ؜؜؜**Asset & ShortURL Services؜**: ingest، transcoding/resizing، tiering روی CDN/S3؛ کوتاه‌سازی لینک‌ها. ؜ 
؜5. ؜؜؜**Post Injection → Cassandra → Kafka؜**: ذخیرهٔ پست؛ انتشار event. ؜ 
؜6. ؜؜؜**Analytics (Streaming + ML)؜**: tagging محتوا؛ republish به Kafka. ؜ 
؜7. ؜؜؜**Post Processor؜**: محاسبهٔ مخاطبان از friends ∩ relevance؛ push کردن postId به Redis timelines. ؜ 
؜8. ؜؜؜**Timeline Service؜**:  
   - ؜؜Profile دیگران = خواندن پست‌های author از Post Service. ؜ 
   - ؜؜Home = merge (Redis کاربران عادی + query برای famous users)؛ refresh دوره‌ای و آرشیو روزانه به Cassandra. ؜ 
؜9. ؜؜؜**Engagement؜**: Like (Cassandra + Redis counters)، Comment (Cassandra). ؜ 
؜10. ؜؜؜**Search؜**: Kafka → Elasticsearch؛ Search Service (+ optional Redis cache). ؜ 
؜11. ؜؜؜**Live Updates؜**: نگهداری WebSocket؛ push به کاربران online. ؜ 
؜12. ؜؜؜**Observability؜**: پایش latency/throughput/CPU/mem/disk، دیتابیس‌ها، cacheها، Kafka؛ هشداردهی.

[Ask AI: High‑Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

---

## ؜؜زیرسیستم‌ها (Deep Dive)

### ؜؜۸.۱ User Service
- ؜؜؜**نقش؜**: CRUD کاربر، پروفایل، last‑access، userType (active/live/passive/famous)، relevance tags. ؜ 
- ؜؜؜**مدل داده؜**: MySQL جداول کاربر؛ Redis key بر اساس userId: profile، userType، lastAccess، tags، friends (همچنین در Graph). ؜ 
- ؜؜؜**Consistency؜**: write قوی در MySQL؛ read eventual در cache. ؜ 
- ؜؜؜**Events؜**: انتشار به Kafka برای fraud/notifications/analytics. ؜ 
[Ask AI: Subsystem ‑ User Service](https://alisol.ir/?ai=Subsystem%20-%20User%20Service%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

### ؜؜۸.۲ Graph Service
- ؜؜؜**نقش؜**: friendship graph (undirected) + وزن‌های جهت‌دار برای ranking. ؜ 
- ؜؜؜**Storage؜**: MySQL (sharded) + Redis برای lookup سریع friends‑of‑user. ؜ 
- ؜؜؜**Hot Keys؜**: کاربر مشهور ممکن است hot key شود؛ جدا کردن cache/partition مفید است. ؜ 
[Ask AI: Subsystem ‑ Graph Service](https://alisol.ir/?ai=Subsystem%20-%20Graph%20Service%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

### ؜؜۸.۳ Asset Service & CDN
- ؜؜؜**نقش؜**: transcoding image/video به چند نسبت/bitrate؛ سایزهای mobile‑friendly؛ promotion/demotion بر اساس الگوی دسترسی؛ S3 به‌عنوان origin. ؜ 
[Ask AI: Subsystem ‑ Asset & CDN](https://alisol.ir/?ai=Subsystem%20-%20Asset%20%26%20CDN%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

### ؜؜۸.۴ Post Injection & Post Service
- ؜؜؜**نقش؜**: ingest پست (اعمال URL shortener و asset processing)، ذخیره در Cassandra، انتشار Kafka؛ Post Service مرجع read/bulk fetch. ؜ 
- ؜؜؜**Scaling؜**: افقی؛ write path در حد «هزاران در ثانیه». ؜ 
[Ask AI: Subsystem ‑ Post Service](https://alisol.ir/?ai=Subsystem%20-%20Post%20Service%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

### ؜؜۸.۵ Analytics & Relevance
- ؜؜؜**Streaming Classifier؜**: tagging موضوعی پست‌ها؛ publish به Kafka. ؜ 
- ؜؜؜**User Profiling؜**: Spark روی Hadoop/دیتالیک؛ تجمیع activity و ذخیرهٔ per‑user interest tags. ؜ 
[Ask AI: Subsystem ‑ Analytics & Relevance](https://alisol.ir/?ai=Subsystem%20-%20Analytics%20%26%20Relevance%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

### ؜؜۸.۶ Feed Fan‑out / Timeline Service
- ؜؜؜**Push به Redis؜**: Post Processor بعد از فیلتر مخاطبان، postIdها را به timeline کاربران push می‌کند. ؜ 
- ؜؜؜**Merge‑on‑read برای کاربران مشهور؜**: در زمان درخواست آخرین پست‌ها خوانده می‌شود تا fan‑out سنگین رخ ندهد. ؜ 
- ؜؜؜**Archival؜**: برش‌های روزانهٔ feed از Redis به Cassandra منتقل و Redis سبک می‌ماند. ؜ 
[Ask AI: Subsystem ‑ Timeline](https://alisol.ir/?ai=Subsystem%20-%20Timeline%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

### ؜؜۸.۷ Likes & Comments
- ؜؜؜**Likes؜**: جدول Cassandra با کلید (postId, userId)؛ شمارنده‌های Redis برای پست‌های تازه (atomic inc). ؜ 
- ؜؜؜**Comments؜**: Cassandra بر اساس postId؛ چون lookup مبتنی بر ID است معمولاً cache لازم نیست. ؜ 
[Ask AI: Subsystem ‑ Engagement](https://alisol.ir/?ai=Subsystem%20-%20Engagement%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

### ؜؜۸.۸ Live Users
- ؜؜؜**نقش؜**: WebSocket برای کاربران online؛ با ورود محتوای جدید مرتبط، رویداد push می‌شود. ؜ 
[Ask AI: Subsystem ‑ Live Updates](https://alisol.ir/?ai=Subsystem%20-%20Live%20Updates%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

### ؜؜۸.۹ Activity Tracker
- ؜؜؜**نقش؜**: مصرف Kafka events (post/like/comment/search)؛ نوشتن (userId, timestamp, action, attrs) در Cassandra؛ APIهای read برای activity. ؜ 
[Ask AI: Subsystem ‑ Activity Tracker](https://alisol.ir/?ai=Subsystem%20-%20Activity%20Tracker%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

### ؜؜۸.۱۰ Search
- ؜؜؜**Pipeline؜**: Kafka → Elasticsearch؛ Search Service؛ cache اختیاری نتایج در Redis. ؜ 
[Ask AI: Subsystem ‑ Search](https://alisol.ir/?ai=Subsystem%20-%20Search%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

---

## ؜؜Trade‑offs و گزینه‌های جایگزین

| موضوع | گزینه A | گزینه B | گرایش ویدیو | دلیل (طبق ویدیو) |
| --- | --- | --- | --- | --- |
| ؜Feed delivery | Push به per-user Redis | Pull/Merge هنگام read | Hybrid | ؜برای کاربران عادی push؛ برای کاربران مشهور merge روی read تا از fan-out بسیار بزرگ جلوگیری شود. |
| ؜Post store | Cassandra | HBase | Cassandra | ؜راه‌اندازی ساده‌تر؛ تحمل throughput بالای read/write. |
| ؜Assets | CDN + S3 tiering | صرفاً CDN | CDN + S3 | ؜چرخهٔ عمر براساس هزینه و میزان داغ‌بودن محتوا (hotness-aware). |
| ؜Search | Elasticsearch | RDBMS با LIKE | Elasticsearch | ؜کارایی و مقیاس‌پذیری بهتر برای text search. |

[Ask AI: Trade‑offs](https://alisol.ir/?ai=Trade-offs%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

---

## ؜؜قابلیت اطمینان، دسترس‌پذیری، کارایی

- ؜؜؜**Replication/Consistency؜**: MySQL (strong writes) برای user/graph؛ Redis (eventual). ؜Cassandra برای post/like/comment با partitioning درست برای جلوگیری از hot spot. ؜ 
- ؜؜؜**Latency Budget؜**: رندر UI سریع؛ چند ثانیه lag برای propagation قابل قبول. ؜ 
- ؜؜؜**Backpressure/Load Shedding؜**: Kafka برای جذب spikes؛ TTL‑based cache برای likes/trends؛ آرشیو برای کوچک نگه‌داشتن Redis. ؜ 
[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

---

## ؜؜امنیت و حریم خصوصی

- ؜؜AuthN/AuthZ در لایهٔ edge (reverse proxy/auth). ؜ 
- ؜؜PII عمدتاً در User Service (MySQL). ؜ 
- ؜؜Abuse/Spam: بررسی تقلب روی حساب‌های جدید با Kafka consumers. ؜ 
[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

---

## ؜؜Observability

- ؜؜پایش latency، throughput، CPU، memory، disk برای سرویس‌ها/DBها/cacheها/Kafka؛ alert بر اساس آستانه‌ها برای حفظ SLO. ؜ 
[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

---

## ؜؜جمع‌بندی نکات کلیدی

- ؜؜برای feedهای read‑heavy، رویکرد ؜**Hybrid (push + merge)؜** معمولاً بهتر است. ؜ 
- ؜؜؜**Redis timelines؜** برای read کم‌تاخیر؛ ؜**Cassandra؜** برای write‑heavy پایدار و مقیاس‌پذیر. ؜ 
- ؜؜؜**Relevance؜** = ترکیب content tags + user interest profile + graph weights. ؜ 
- ؜؜؜**Media lifecycle؜**: محتوای داغ روی CDN؛ محتوای سرد روی S3؛ re‑promote در spike. ؜ 
- ؜؜؜**اجتناب از hot partitions؜**: انتخاب صحیح partition key (مثلاً صرفِ تاریخ به‌عنوان partition key نامطلوب است). ؜ 
[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

---

## ؜؜واژه‌نامهٔ کوتاه

- ؜؜؜**Famous Users؜**: کاربرانی که fan‑out عظیم ایجاد می‌کنند؛ با merge‑on‑read مدیریت می‌شوند. ؜ 
- ؜؜؜**Relevance Tags؜**: برچسب‌های موضوعی/علاقه بر اساس ML برای filter/score. ؜ 
- ؜؜؜**Graph Weight؜**: وزن وابسته به تعاملات برای ranking. ؜ 
- ؜؜؜**Archival Service؜**: فشرده‌سازی برش‌های روزانهٔ feed در Cassandra برای سبک نگه‌داشتن Redis. ؜ 
[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

---

## ؜؜برنامهٔ مطالعه (اختیاری)

- ؜؜تمرین trade‑off ؜**push vs pull؜** برای feed. ؜ 
- ؜؜تمرین طراحی ؜**partition key؜** در stores شبیه Cassandra. ؜ 
- ؜؜پیاده‌سازی نمونه ؜**Kafka → Elasticsearch؜**. ؜ 
- ؜؜ساخت ؜**WebSocket notifier؜** برای live updates. ؜ 
[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CCodeKarle%7CDesign%20Facebook%20%7C%20Design%20Instagram%7Cfa%7Cfa)

---

## ؜؜منابع و نسبت‌دهی

- ؜؜ویدئو: `https://www.youtube.com/watch?v=9-hjBGxuiEs` (کانال: CodeKarle)  
- ؜؜این سند خلاصهٔ مصاحبهٔ فوق است.

---

## ؜؜دربارهٔ خلاصه‌کننده

- ؜؜من «Ali Sol» یک PHP Developer هستم. ؜ 
- ؜؜Website: [alisol.ir](https://alisol.ir)  
- ؜؜LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
