# ؜طراحی یک Cache توزیع‌شده (خلاصه مصاحبه System Design)

*کانال/مصاحبه‌کننده*: System Design Interview  
*مدت*: 00:34:32  
*ویدئوی اصلی*: https://www.youtube.com/watch?v=iuqZvajTOyA

> این متن، خلاصهٔ نکات مهم یک مصاحبهٔ ساختگی در مورد طراحی یک Cache توزیع‌شده است. ؜دیدن ویدئو برای درک کامل توصیه می‌شود.

---

## ؜جمع‌بندی یک‌صفحه‌ای (برای مرور ۲–۳ دقیقه‌ای)

- ؜؜**مسئله (یک‌خطی)؜**: طراحی یک Cache توزیع‌شدهٔ سریع، مقیاس‌پذیر و highly available که از `PUT(key, value)` و `GET(key)` برای کلید/مقدار رشته‌ای پشتیبانی کند.
- ؜؜**دامنهٔ اصلی؜**: Local LRU cache → شاردینگ و consistent hashing → replication (leader/follower) → سرویس discovery/config → الگوهای client/proxy → TTL/expiration → observability و security.
- ؜؜**اولویت‌های نافی‌(غیرعملکردی)؜**: اول سرعت/Performance، سپس scalability و availability؛ دوام/durability در اولویت دوم چون «فقط cache» است.
- ؜؜**قیود/اعداد کلیدی؜**: عدد مشخصی برای QPS/latency داده نشده است.

؜**معماری سطح‌بالا (متنی)؜**
1. ؜اپلیکیشن با client صحبت می‌کند؛ ابتدا local cache (LRU) چک می‌شود. ؜ 
2. ؜در صورت miss، client با consistent hashing شارد مناسب را انتخاب و به remote cache می‌زند. ؜ 
3. ؜هر shard یک Store مبتنی بر LRU دارد؛ write به leader، read از leader یا replica. ؜ 
4. ؜سرویس پیکربندی/کشف سرویس‌ها را پیدا، سلامت را پایش و (درصورت نیاز) leader election/failover را مدیریت می‌کند. ؜ 
5. ؜می‌توان به‌جای client-side hashing از proxy یا server-side routing استفاده کرد.

؜**مهم‌ترین Trade-offها؜**
- ؜client-side hashing در برابر proxy/server-side routing  
- ؜کلاستر cache اختصاصی در برابر co-located cache  
- ؜replication ناهمگام (availability/Performance) در برابر همگام (consistency)  
- ؜سادگی فایل لیست میزبان‌ها در برابر پویایی سرویس discovery

؜**ریسک‌ها/خرابی‌های رایج؜**
- ؜hot shard / hot key  
- ؜اثر دومینویی در failure با vanilla consistent hashing  
- ؜ناسازگاری میان replicaها (به‌دلیل async replication)  
- ؜divergence در لیست سرورها داخل کلاینت‌ها  
- ؜از دست‌رفتن داده روی leader قبل از replicate (قابل‌قبول: به‌شکل miss دیده می‌شود)

؜**فلش‌کارت مرور سریع؜**
- ؜س: چرا LRU به linked list + hashmap نیاز دارد؟  
  ج: hashmap برای lookupهای O(1)؛ و doubly linked list برای reorder کردن recency در O(1).
- ؜س: چرا `hash % N` کافی نیست؟  
  ج: با تغییر membership، rehash سنگین رخ می‌دهد و miss زیاد می‌شود؛ از consistent hashing استفاده کنید.
- ؜س: برای availability و مدیریت hot shard چه کنیم؟  
  ج: leader/follower replication و افزودن read replica.
- ؜س: چه کسی از membership خبر دارد؟  
  ج: client (یا proxy/servers)؛ همگام‌سازی از طریق فایل/Shared storage polling یا یک config service.
- ؜س: دو ایراد vanilla consistent hashing؟  
  ج: اثر دومینویی و توزیع نامتوازن؛ با virtual nodes، Jump Hash یا proportional hashing کاهش می‌یابد.
- ؜س: چرا async replication اینجا قابل‌قبول است؟  
  ج: چون cache روی سرعت اولویت دارد؛ از دست‌رفتن گهگاه یعنی فقط یک miss.

[؜Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

---

## ؜برچسب‌های مصاحبه (برای فیلتر بعدی)

- ؜؜**Product Pattern؜**: ؜`caching`  
- ؜؜**System Concerns؜**: ؜`high-availability`، ؜`low-latency`، ؜`eventual-consistency`، ؜`hot-key`  
- ؜؜**Infra/Tech (اشاره‌شده)؜**: ؜`microservices`، ؜`redis`، ؜`memcached`، ؜`zookeeper`  
  نکته: امروزه در محیط‌های cloud/Kubernetes معمولاً از etcd یا Consul برای discovery/coordination استفاده می‌شود.

[؜Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

---

## ؜فهم مسئله

- ؜؜**پرامپت اصلی؜**: اضافه‌کردن یک in-memory cache توزیع‌شده برای تندتر کردن readها و محافظت از datastore در برابر کندی/قطعی؛ پشتیبانی از `PUT` و `GET`.
- ؜؜**Use Caseها؜**: سرعت بیشتر برای readهای تکراری؛ تاب‌آوری در کندی/قطعی datastore؛ کاهش بار backend.
- ؜؜**خارج از محدوده؜**: تضمین‌های پایداری فراتر از semantics معمول cache. ؜API دقیق مشخص نشده.
- ؜؜**APIها؜**: در ویدئو صراحتاً تعریف نشده.

[؜Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

---

## ؜ملزومات و قیود

؜**طبق ویدئو؜**
- ؜؜**عملکردی؜**: `PUT(key, value)` و `GET(key)`؛ هر دو string.
- ؜؜**غیرعملکردی؜**: Performance، سپس scalability و availability؛ durability در اولویت دوم.
- ؜؜**Consistency؜**: غالباً eventual (با async replication و خواندن از چند replica).

؜**فرضیات (محافظه‌کارانه)؜**
- ؜اندازهٔ valueها متوسط (کمتر از ۱MB) و قابل فشرده‌سازی. ؜ 
- ؜بار کاری read-heavy (مثلاً ۹۰/۱۰). ؜ 
- ؜بودجهٔ latency در میلی‌ثانیه‌های پایین برای p50/p95. ؜ 
- ؜استقرار چند دیتاسنتری برای تاب‌آوری. ؜ 
*این‌ها را برای هر استک باید صحت‌سنجی کرد.*

[؜Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

---

## ؜برآورد سریع (Back-of-the-Envelope)

- ؜اعداد دقیق در ویدئو نیست؛ بخش تخمینی عددی را عمداً خلاصه کرده‌ایم.

[؜Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

---

## ؜معماری سطح‌بالا

- ؜؜**Local Cache؜**: پیاده‌سازی LRU درون‌فرآیند با hashmap + doubly linked list؛ پشتیبانی TTL (انقضا passive/active).
- ؜؜**Remote Cache Cluster؜**: گره‌های شاردشده (LRU روی هر گره)؛ client-side consistent hashing؛ حمل‌ونقل TCP یا UDP. ؜ 
  نکته: TCP قابل اتکاتر است؛ اگر UDP، باید retry/ordering در لایهٔ اپلیکیشن جبران شود.
- ؜؜**Replication؜**: الگوی leader/follower برای هر shard؛ write به leader؛ read از هر کدام؛ امکان cross-DC replica. ؜ 
  نکته: در متن ویدئو واژهٔ «master-slave» هم به‌کار می‌رود؛ «leader/follower» را ترجیح دهید.
- ؜؜**Discovery & Failover؜**: فایل/Shared storage polling (مثل S3) یا یک config service (مثلاً ZooKeeper/Redis Sentinel). ؜ 
  نکته: روی Kubernetes، اتکا به etcd/کنترلرها معمولاً ساده‌تر است.
- ؜؜**Client vs Proxy؜**: یا client library خودش hashing/routing کند؛ یا از proxy مثل twemproxy / یا server-side routing (مانند Redis Cluster) بهره بگیرید.
- ؜؜**Observability & Security؜**: متریک‌ها (latency، hit/miss، CPU/mem، I/O)، لاگ دسترسی؛ محدودیت‌های شبکه؛ رمزنگاری in-flight/at-rest درصورت نیاز (با هزینهٔ کارایی).

[؜Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

---

## ؜عمیق‌تر روی زیربخش‌ها

### ؜Local LRU Cache
- ؜؜**نقش؜**: رسیدن به hitهای خیلی سریع و کاهش callهای remote. ؜ 
- ؜؜**ایدهٔ اصلی؜**: hashmap برای O(1) key→node و doubly linked list برای O(1) جابجایی به سر/ته. ؜ 
- ؜؜**Eviction؜**: در ظرفیت، tail حذف می‌شود؛ روی هر GET/PUT به head منتقل کنید. ؜ 
- ؜؜**TTL/Expiration؜**: انقضای passive در زمان دسترسی؛ بعلاوه یک sampler دوره‌ای برای اجتناب از اسکن کامل.

[؜Ask AI: Subsystem - ؜Local LRU Cache](https://alisol.ir/?ai=Subsystem%20-%20Local%20LRU%20Cache%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

### ؜Sharding & Consistent Hashing
- ؜؜**نقش؜**: توزیع کلیدها بین nodeها و کمینه‌کردن rehash هنگام تغییر membership. ؜ 
- ؜؜**مکانیزم؜**: قرار دادن سرورها روی ring؛ هر سرور کلیدها تا سرور بعدی در جهت عقربه‌ها را مالک است. ؜ 
- ؜؜**کاهش Hot/Failure؜**: استفاده از virtual nodes، Jump Hash یا proportional hashing. ؜ 
- ؜؜**همگام‌سازی لیست؜**: همهٔ clientها باید یک لیست یکسان از سرورها داشته باشند تا split-brain routing رخ ندهد.

[؜Ask AI: Subsystem - ؜Sharding & Hashing](https://alisol.ir/?ai=Subsystem%20-%20Sharding%20%26%20Hashing%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

### ؜Replication & Consistency
- ؜؜**پروتکل؜**: leader/follower با replication ناهمگام؛ read از replica مجاز است. ؜ 
- ؜؜**Consistency؜**: eventual؛ ممکن است خواندن از leader و replica نتایج متفاوتی بدهد. ؜ 
- ؜؜**خرابی؜**: در failure، با config service یا election درون‌کلاستر، follower را به leader ارتقا دهید. ؜ 
  نکته: اگر نیاز به strong consistency شد، quorum write/read یا synchronous replication (با هزینهٔ latency) را در نظر بگیرید.

[؜Ask AI: Subsystem - ؜Replication & Consistency](https://alisol.ir/?ai=Subsystem%20-%20Replication%20%26%20Consistency%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

### ؜Discovery & Health Monitoring
- ؜؜**گزینه‌ها؜**: (۱) فایل استاتیک دیپلوی‌شده با اپ؛ (۲) polling روی shared storage (مثل S3)؛ (۳) یک config service با heartbeat و auto register/unregister. ؜ 
- ؜؜**Leader Election؜**: config service می‌تواند leaderها را پایش و failover را انجام دهد. ؜ 
- ؜؜**منبع حقیقت توپولوژی؜**: clientها برای membership به‌روز، config service را می‌پرسند.

[؜Ask AI: Subsystem - ؜Discovery](https://alisol.ir/?ai=Subsystem%20-%20Discovery%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

### ؜Client/Proxy Routing
- ؜؜**Client Library؜**: سبک؛ جست‌وجوی باینری روی ring مرتب؛ مدیریت failure؛ انتشار متریک. ؜ 
- ؜؜**Proxy؜**: مثل twemproxy که routing را متمرکز و clientها را ساده می‌کند. ؜ 
- ؜؜**Server-side Routing؜**: اتصال به هر node و forward داخلی به shard درست (الگوی Redis Cluster).

[؜Ask AI: Subsystem - ؜Client/Proxy Routing](https://alisol.ir/?ai=Subsystem%20-%20Client%2FProxy%20Routing%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

---

## ؜ملاحظات و جایگزین‌ها (Trade-offs & Alternatives)

| موضوع | گزینه A | گزینه B | گرایش ویدئو | توجیه |
| --- | --- | --- | --- | --- |
| Deployment | Dedicated cache cluster | Co-located per service | هر دو قابل قبول | Dedicated: ایزولیشن و استقلال در مقیاس‌پذیری؛ Co‑located: ارزان‌تر و همراه با سرویس auto-scale می‌شود. |
| Routing | Client-side hashing | Proxy/server-side | بی‌طرف | Client زیرساخت ساده‌تری دارد؛ Proxy منطق را متمرکز می‌کند و پیچیدگی client را کم می‌کند. |
| Replication | Async | Sync | Async | Latency پایین‌تر؛ پذیرش eventual consistency و احتمال کمِ از دست‌دادن داده. |
| Discovery | Static/shared file | Config service | Config service برای automation | عضویت خودکار بر اساس health، failover و single source of truth. |
| Hashing | Vanilla ring | Virtual nodes / Jump Hash | بهبود‌یافته | توازن بهتر؛ کاهش اثرِ دومینویی. |

[؜Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

---

## ؜قابلیت اتکا، دسترس‌پذیری و کارایی

- ؜؜**Replication/Quorum؜**: leader/follower با async؛ failover از طریق config service. ؜ 
- ؜؜**Latency Budget؜**: عملیات cache باید تقریباً O(1) باشند؛ سربار شبکهٔ TCP/UDP نسبت به datastore ناچیز است. ؜ 
- ؜؜**Degradation؜**: در نبود یک shard آن را همانند miss درنظر بگیرید و به backing store تکیه کنید. ؜ 
- ؜؜**Hot Shard؜**: افزودن read replica، بهبود hashing و درصورت لزوم split کردن کلید در لایهٔ اپ.

[؜Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

---

## ؜امنیت و حریم خصوصی

- ؜؜**شبکه؜**: پورت‌های cache را با فایروال ببندید؛ مگر ضروری، مستقیم روی اینترنت منتشر نکنید. ؜ 
- ؜؜**داده؜**: درصورت نیاز، encryption سمت کلاینت قبل از ذخیره (با هزینهٔ CPU/Memory) را درنظر بگیرید. ؜ 
  نکته: مدیریت کلید باید خارج از مسیر cache باشد.

[؜Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

---

## ؜Observability

- ؜؜**Metrics؜**: خطاها، latency، نرخ hit/miss، CPU/memory، I/O شبکه. ؜ 
- ؜؜**Logs؜**: چه کسی/کی/کدام کلید/نتیجه؛ مختصر اما مؤثر. ؜ 
- ؜؜**چرایی؜**: سرویس‌های وابسته معمولاً هنگام Incident مقصر را cache می‌دانند—با داده آماده باشید.

[؜Ask AI: Observability](https://alisol.ir/?ai=Observability%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

---

## ؜پرسش‌های پس از مصاحبه

- ؜سؤال صریحی مدل نشده؛ پیشنهاد موضوع بعدی: heavy hitters / Top-K frequent items.

[؜Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

---

## ؜پرسش‌های پیشنهادی کاندید

- ؜نسبت read/write و هدف latency «کافی» دقیقاً چیست؟  
- ؜آیا hot key محتمل است (مثلاً محتوای ترند شده)؟ نیاز به pre-split یا cache-busting داریم؟  
- ؜cross-region read/write می‌خواهیم یا replication درون منطقه کافی است؟  
- ؜منبع حقیقت membership با کیست—config service یا orchestration (مثلاً Kubernetes)؟  
- ؜حساسیت داده آن‌قدر بالاست که هزینهٔ encryption در cache توجیه شود؟

[؜Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

---

## ؜نکات کلیدی

- ؜ساده شروع کنید: local LRU با hashmap + DLL عملیات O(1) می‌دهد. ؜ 
- ؜برای مقیاس، از sharding و consistent hashing استفاده کنید تا rehash storm رخ ندهد. ؜ 
- ؜availability و مدیریت hot shard را با leader/follower replication و read replicaها بهبود دهید. ؜ 
- ؜لیست سرورهای کلاینت‌ها را هم‌سو نگه دارید—به discovery پویا و health monitoring تکیه کنید. ؜ 
- ؜ساده‌سازی client با proxy/server-side routing را درنظر بگیرید. ؜ 
- ؜eventual consistency را بپذیرید؛ از دست‌رفتن داده در cache یعنی یک miss و تمام.

[؜Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

---

## ؜واژه‌نامه

- ؜؜**؜LRU؜**: سیاست حذف بر اساس کم‌ترین دسترسیِ اخیر. ؜ 
- ؜؜**؜Consistent Hashing؜**: طرح hashing که جابجایی کلیدها هنگام تغییر membership را کمینه می‌کند. ؜ 
- ؜؜**؜Leader/Follower Replication؜**: writeها به leader؛ replicaها داده را گرفته و read را سرویس می‌دهند. ؜ 
- ؜؜**؜Virtual Nodes؜**: موقعیت‌های متعدد برای هر سرور روی ring برای تعادل بهتر. ؜ 
- ؜؜**اثر دومینویی (Domino Effect)؜**: شکست زنجیره‌ای بار وقتی یک node از کار می‌افتد. ؜ 
- ؜؜**؜TTL؜**: زمان ماندگاری/انقضا برای entryها.

[؜Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

---

## ؜برنامهٔ مطالعه (اختیاری)

- ؜پیاده‌سازی LRU (hashmap + doubly linked list). ؜ 
- ؜نمونهٔ سادهٔ consistent hashing ring با virtual nodes و Jump Hash. ؜ 
- ؜افزودن async replication به یک cache نمونه؛ شبیه‌سازی failure و failover. ؜ 
- ؜ساخت یک config service کوچک (heartbeat، membership، همگام‌سازی client). ؜ 
- ؜سنجش hit/miss/latency با و بدون لایهٔ local cache.

[؜Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CSystem%20Design%20Interview%7CDesign%20Distributed%20Cache|fa)

---

## ؜دربارهٔ خلاصه‌کننده

من ؜**Ali Sol؜**، یک PHP Developer هستم. ؜ 
- ؜وب‌سایت: [alisol.ir](https://alisol.ir)  
- ؜لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
