# ؜خلاصهٔ مصاحبهٔ System Design: طراحی Instagram

- ؜مدت: ؜00:31:09  
- ؜لینک ویدیو اصلی: https://www.youtube.com/watch?v=VJpfO6KdyWE

> این سند، نکات کلیدی یک مصاحبهٔ ساختگی system design را خلاصه می‌کند. ؜پیشنهاد می‌کنم اگر وقت دارید ویدیو را کامل ببینید.

---

## ؜خلاصهٔ یک‌صفحه‌ای (۲–۳ دقیقه)

- ؜مسئله (یک‌خطی): ساخت نسخه‌ای ساده و مقیاس‌پذیر از Instagram با قابلیت‌های آپلود عکس، دنبال‌کردن و فید.
- ؜محدودهٔ اصلی:  
  - ؜در محدوده: آپلود عکس موبایلی؛ گراف follow؛ تولید feed؛ ذخیرهٔ متادیتای عکس؛ سروینگ read-heavy مقیاس‌پذیر؛ caching؛ load balancing؛ object storage؛ ظرفیت‌سنجی اولیه. ؜ 
  - ؜خارج از محدوده: کامنت/لایک، ranking پیشرفته، مدل کامل privacy، جستجو، analytics، stories، ویدیو، ads.
- ؜اولویت‌های غیرعملکردی: توان بالای خواندن، تاخیر پایین در خواندن فید، ذخیره‌سازی مطمئن media، مقیاس‌پذیری افقی.
- ؜قیود/اعداد کلیدی (از ویدیو):  
  - ؜هدف: ؜10M MAU. ؜ 
  - ؜میانگین: ؜۲ عکس/کاربر/ماه، حدود ؜5 MB هرکدام → حدود ؜100 TB/ماه، ~؜1.2 PB/سال. ؜ 
  - ؜الگوی مصرف read-heavy؛ خواندن‌های بسیار بیشتر از آپلود.
- ؜معماری کلان (متنی):  
  1) کلاینت موبایل → API (پشت load balancer). ؜ 
  2) جداسازی سرویس‌های ؜**read؜** و ؜**write/upload؜**. ؜ 
  3) ؜**Relational DB؜** برای متادیتا (users/photos/followers) + ؜**read replicas؜**. ؜ 
  4) ؜**Distributed object storage؜** (مثلاً S3) برای تصاویر؛ DB فقط مسیر/URL را نگه می‌دارد. ؜ 
  5) ؜**CDN؜** جلوی object storage برای تحویل کم‌تاخیر. ؜ 
  6) ؜**Distributed cache؜** (مثلاً Redis) برای خواندن‌های داغ و feed از پیش‌محاسبه‌شده. ؜ 
  7) سرویس ؜**feed generation؜** (دوره‌ای) که نتیجه را در cache می‌نویسد.
- ؜مبادله‌های کلیدی (Trade-offs):  
  - ؜RDBMS در برابر NoSQL برای الگوهای relational. ؜ 
  - ؜فید پیش‌محاسبه‌شده در برابر محاسبهٔ on-demand. ؜ 
  - ؜تازگی cache در برابر پیچیدگی invalidation. ؜ 
  - ؜شروع monolith در برابر microservice زودهنگام.
- ؜ریسک‌ها/نقاط شکست بزرگ:  
  - ؜؜**Hot key؜** (فید سلبریتی‌ها) و فشار روی cache/DB. ؜ 
  - ؜ناسازگاری cache هنگام write/invalidations. ؜ 
  - ؜تاخیر object store بدون CDN. ؜ 
  - ؜lag در read-replica و فید کهنه.

؜**مرور ۵ دقیقه‌ای؜**
- ؜سوال: چرا relational DB؟  
  پاسخ: موجودیت‌ها شدیداً relational هستند (users/photos/follows) و joinهای پرتکرار. ؜ 
- ؜سوال: تصاویر کجا نگه‌داری می‌شوند؟  
  پاسخ: در ؜**Distributed object storage؜**؛ DB فقط مسیر/URL. ؜ 
  نکته: لینک‌های امضاشدهٔ کوتاه‌عمر برای دانلود مستقیم کلاینت به کاهش بار backend کمک می‌کند.
- ؜سوال: چرا read replicas؟  
  پاسخ: سیستم read-heavy است؛ replicaها مقیاس‌پذیری خواندن را مستقل از نوشتن فراهم می‌کنند.
- ؜سوال: چرا سرویس مجزای feed generation؟  
  پاسخ: پیش‌محاسبه برای اجتناب از fan-out سنگین در هر درخواست و رسیدن به latency هدف.
- ؜سوال: نقش CDN چیست؟  
  پاسخ: کاهش تاخیر و هزینهٔ egress با cache نزدیک به کاربر.
- ؜سوال: چطور cache را تازه نگه داریم؟  
  پاسخ: ؜**Write-through؜** یا ؜**write-back؜** با invalidation هدفمند. ؜(برای سادگی درستی، write-through + invalidation کلیدی پیشنهاد می‌شود.)

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

## ؜برچسب‌های مصاحبه (برای فیلتر بعداً)

- ؜دامنه/صنعت: `social-media`
- ؜الگوی محصول: `feed, newsfeed, object-storage, cdn, caching`
- ؜ملاحظات سیستمی: `high-availability, low-latency, eventual-consistency, geo-replication, hot-key`
- ؜زیرساخت/تکنولوژی (ذکر شده): `microservices, rest, mysql, postgres, redis, s3, cdn`  
  نکته: اگر امروز شروع می‌کنید، سرویس‌های مدیریت‌شدهٔ Postgres/MySQL و Redis هزینهٔ عملیاتی را کم و سرعت iteration را زیاد می‌کنند.

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

## ؜فهم مسئله

- ؜پرامپت اصلی: طراحی Instagram با قابلیت‌های محدود: آپلود عکس از موبایل، دنبال‌کردن، و نمایش فید. ؜به مقیاس‌پذیری (۱۰ میلیون کاربر) و قابلیت اطمینان فکر کنید.
- ؜موارد استفاده:  
  - ؜آپلود عکس با کپشن/لوکیشن از موبایل. ؜ 
  - ؜follow/unfollow. ؜ 
  - ؜دیدن فید عکس‌های افراد دنبال‌شده.
- ؜خارج از محدوده: کامنت/لایک، ranking الگوریتمی، جستجو، privacy پیچیده، notifications، stories/video، analytics.
- ؜APIها (اگر بحث شد): مطرح نشده.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

## ؜نیازمندی‌ها و قیود

؜**بر اساس ویدیو؜**
- ؜عملکردی: ثبت‌نام سادهٔ کاربر؛ آپلود عکس؛ گراف follow؛ واکشی فید. ؜ 
- ؜غیرعملکردی: تحمل ترافیک read-heavy؛ latency پایین فید؛ ذخیره‌سازی قابل‌اعتماد media؛ مقیاس‌پذیری افقی؛ load balancing. ؜ 
- ؜ورودی‌های ظرفیت: ؜10M MAU؛ ؜۲×؜5 MB عکس/کاربر/ماه؛ حدود ؜100 TB/ماه؛ نزدیک ؜1.2 PB/سال؛ read >> write.
- ؜سازگاری: DB منبع حقیقت؛ cache تازه با invalidation؛ eventual consistency برای فید قابل‌قبول.

؜**فرض‌های محافظه‌کارانه؜**
- ؜احراز هویت پایه و کنترل دسترسی برای تصاویر خصوصی در آینده. ؜ 
- ؜هدف تاخیر p99 خواندن فید در چندصد ms با cache؛ دریافت تصویر از CDN طبق اهداف ناحیه‌ای. ؜ 
- ؜توصیه: SLOهای صریح (p95/p99) از ابتدا تنظیم شوند تا تعداد replica و اندازهٔ cache هدایت شود.

[Ask AI: Requirements and Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

## ؜برآورد سرانگشتی

- ؜ذخیره‌سازی: حدود ؜100 TB در ماه برای تصاویر؛ رشد سالانه ~؜1.2 PB. ؜متادیتا (users/photos/follows) نسبتاً کوچک‌تر است. ؜ 
- ؜پهنای‌باند: غالب توسط خواندن تصاویر از طریق CDN؛ backhaul با cache لبه کم می‌شود. ؜ 
- ؜اندازهٔ cache: فیدهای داغ + عکس‌های اخیر. ؜نسبت hit دقیق ذکر نشده. ؜ 
- ؜کلیدهای shard/پارتیشن: ذکر نشده—به‌احتمال بر اساس user_id یا photo_id برای جداول متادیتا. ؜ 
- ؜توان عملیاتی: read-heavy؛ مسیر write نباید خواندن فید را بلوکه کند.

اگر عدد بیشتری لازم است: در ویدیو نیامده—فعلاً صرف‌نظر.

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

## ؜معماری کلان

- ؜ورودی و مسیریابی: موبایل → اینترنت → ؜**Load Balancer/Proxy؜** → مسیریابی به سرویس read یا write. ؜ 
- ؜سرویس‌ها:  
  - ؜سرویس ؜**read؜**: سرو کردن فید و lookupهای متادیتا. ؜ 
  - ؜سرویس ؜**write/upload؜**: ثبت متادیتا + orkestration آپلود media. ؜ 
  توصیه: با monolith شروع کنید ولی مرزهای ماژولی شفاف؛ پس از شناسایی hotspotها split کنید.
- ؜ذخیره‌سازها:  
  - ؜؜**Relational DB؜** (MySQL/Postgres) برای users/photos/followers با ؜**read replicas؜**. ؜ 
  - ؜؜**Object Storage؜** (مثلاً S3) برای تصاویر؛ DB فقط مسیر object را نگه‌می‌دارد. ؜ 
  - ؜؜**Distributed Cache؜** (مثلاً Redis) برای کلیدهای داغ و فید پیش‌محاسبه. ؜ 
  نکتهٔ امنیتی: برای رمز عبور، ؜**Argon2id/bcrypt؜** با salt اختصاصی هر کاربر.
- ؜تولید فید: Job دوره‌ای ؜**feed generation؜** فید هر کاربر را می‌سازد و در cache می‌نویسد. ؜ 
- ؜؜**CDN؜**: جلوی object storage برای تحویل سریع؛ ؜**signed URL؜** توصیه می‌شود. ؜ 
- ؜سازگاری: DB منبع حقیقت؛ cache با write-through و invalidation به‌روز می‌شود؛ eventual consistency برای فید قابل‌قبول است.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

## ؜موشکافی زیرسیستم‌ها

### ؜۸.۱ مدل داده

- ؜نقش: نگه‌داری users، متادیتای photos و رابطه‌های دنبال‌کردن (directed). ؜ 
- ؜موجودیت‌ها و فیلدهای کلیدی:  
  - ؜users: `id`، `name`، `email`، …  
  - ؜photos: `id`، `user_id`، `caption`، `location`، `object_path_or_url`. ؜ 
  - ؜followers: `from_user_id` → `to_user_id` (رابطهٔ جهت‌دار). ؜ 
- ؜ایندکس‌ها: users بر اساس email؛ photos بر اساس user_id و created_at؛ followers بر اساس from_user_id و to_user_id. ؜ 
- ؜مقیاس‌پذیری/پارتیشن: شروع با یک writer و read-replicaها؛ بعداً shard بر اساس user_id در صورت نیاز. ؜ 
- ؜مدل سازگاری: قوی در DB؛ eventual در cache/feeds. ؜ 
- ؜گلوگاه‌ها/Hot key: حساب‌های سلبریتی؛ کاهش با cache فید per-user و rate limit.
- ؜خطا: writeهای idempotent و fallback به DB روی cache miss.

[Ask AI: Subsystem - ؜Data Model](https://alisol.ir/?ai=Subsystem%20-%20Data%20Model%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

### ؜۸.۲ مسیر write/upload

- ؜مسئولیت‌ها: دریافت متادیتا، هماهنگ‌سازی آپلود media، ماندگارکردن مسیر object و تازه‌سازی cache. ؜ 
- ؜فلو: کلاینت متادیتا می‌فرستد → سرور سطر photo را ثبت می‌کند → کلاینت مستقیم به object storage (یا proxied) آپلود می‌کند → سرور cache را write-through می‌کند و feedهای متاثر را invalid می‌کند. ؜ 
- ؜استراتژی cache: write-through برای lookupها؛ invalidation هدفمند برای feed دنبال‌کنندگان. ؜ 
- ؜خطا/تحمل‌پذیری: timeout، آپلودهای resumable، کلیدهای idempotency.

[Ask AI: Subsystem - ؜Write Path](https://alisol.ir/?ai=Subsystem%20-%20Write%20Path%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

### ؜۸.۳ مسیر read/feed

- ؜مسئولیت‌ها: واکشی کم‌تاخیر فید و متادیتای عکس. ؜ 
- ؜فلو: کلاینت → سرویس read → cache (hit) → برگرداندن ورودی‌های فید شامل URLهای تصویر؛ روی miss از DB/سرویس فید پر می‌کنیم. ؜ 
- ؜تولید فید: Job دوره‌ای، فید هر کاربر را از گراف follow + عکس‌های اخیر می‌سازد و شیء فید فشرده را در cache می‌نویسد. ؜ 
- ؜استراتژی cache: TTL برای فهرست فید؛ invalidation دستی هنگام پست جدید دنبال‌شده‌ها. ؜ 
- ؜؜**Hot key؜**: فید سلبریتی‌ها؛ کاهش با کلیدهای cache شاردشده و TTL کوتاه.

[Ask AI: Subsystem - ؜Read/Feed Path](https://alisol.ir/?ai=Subsystem%20-%20Read%2FFeed%20Path%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

### ؜۸.۴ CDN و Object Storage

- ؜نقش: ذخیره‌سازی پایدار عکس‌ها؛ تحویل سریع global با CDN و نسخه‌های رزولوشن مختلف. ؜ 
- ؜نکته‌ها: استفاده از object storage (مثلاً S3)؛ نگه‌داری reference در DB؛ قراردادن CDN جلو برای latency بهتر. ؜ 
- ؜بهینه‌سازی: ساخت اندازه‌های responsive به‌صورت async برای بهبود bandwidth و hit-ratio.

[Ask AI: Subsystem - ؜CDN & Storage](https://alisol.ir/?ai=Subsystem%20-%20CDN%20%26%20Storage%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

## ؜مبادله‌ها و گزینه‌های جایگزین

| موضوع (Topic) | گزینه A (Option A) | گزینه B (Option B) | تمایل ویدیو | دلیل (از ویدیو) |
| --- | --- | --- | --- | --- |
| Metadata Store | Relational DB | NoSQL (doc/column) | Relational | موجودیت‌های به‌شدت relational و joinهای پرتکرار. |
| Feed Strategy | Precompute (دوره‌ای) | On-demand (در هر request) | Precompute | از محاسبهٔ سنگین per-request پرهیز کن؛ نتایج را cache کن. |
| Cache Updates | Write-through | Write-back | هر دو مطرح شد (تمایل به Write-through) | تازه‌ماندن cache نزدیک به write؛ جزئیات به سیاست پیاده‌سازی بستگی دارد. |
| Image Delivery | CDN جلوی object storage | دسترسی مستقیم به object storage | CDN | latency کمتر + edge caching. |
| Service Shape | Monolith → سپس split | Microservices از ابتدا | Monolith-first | بعد از شناسایی hotspotها سرویس‌ها را تکامل/تفکیک بده. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

## ؜پایداری، در‌دسترس‌بودن و کارایی

- ؜تکثیر: read-replica برای DB؛ replication داخلی در object storage. ؜ 
- ؜بودجهٔ تاخیر: مسیر cache-first برای فید؛ بایت‌های تصویر از طریق CDN؛ متادیتا از read-replica. ؜ 
- ؜فشار و محدودسازی: rate limit روی endpointهای داغ (فید با دنبال‌شوندگان زیاد). ؜ 
- ؜تنزل کنترل‌شده: سرو کردن cache کهنه هنگام مشکل DB؛ placeholder تصویر اگر object store/CDN مشکل داشت. ؜ 
- ؜بازیابی از فاجعه: مشخص نشده. ؜توصیه: حداقل multi-AZ؛ RPO/RTO را زود مشخص کنید.

[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

## ؜امنیت و حریم خصوصی

- ؜AuthN/AuthZ: در ویدیو مطرح نشده. ؜ 
- ؜PII: مطرح نشده. ؜ 
- ؜Encryption: مطرح نشده. ؜ 
- ؜توصیه: TLS 1.3 سرتاسری؛ ذخیرهٔ رمز با ؜**Argon2id/bcrypt؜** + salt؛ استفاده از ؜**signed URL؜** برای تصاویر خصوصی.

[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

## ؜مشاهده‌پذیری (Observability)

- ؜متریک‌ها، لاگ‌ها، tracing، و SLOها: مطرح نشده. ؜ 
- ؜حداقل‌ها: نسبت hit در cache و CDN، lag در replica، latency p95/p99 برای فید و واکشی تصویر.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

## ؜پرسش‌های پیگیری مصاحبه‌گر

- ؜در ویدیو بیان نشده.

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

## ؜پرسش‌های کاندید

- ؜در ویدیو بیان نشده.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

## ؜نکات کلیدی

- ؜با محدودهٔ روشن شروع کنید: upload، follow، feed. ؜ 
- ؜متادیتا را relational مدل کنید؛ تصویر را در object storage نگه دارید. ؜ 
- ؜برای تحویل تصویر از CDN استفاده کنید؛ DB فقط مسیر object را دارد. ؜ 
- ؜با رشد بار، مسیرهای read و write را جدا کنید؛ خواندن را با replica مقیاس بدهید. ؜ 
- ؜برای فیدهای داغ تهاجمی cache کنید؛ فید را دوره‌ای پیش‌محاسبه کنید. ؜ 
- ؜invalidation روی write و مدیریت ؜**hot key؜** را از اول برنامه‌ریزی کنید. ؜ 
- ؜ظرفیت‌سنجی نشان می‌دهد مقیاس ذخیره‌سازی ~؜100 TB/ماه است (با فروض داده‌شده).

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

## ؜واژه‌نامه

- ؜؜؜**CDN؜**: شبکهٔ تحویل محتوا برای cache و سروینگ نزدیک به کاربر. ؜ 
- ؜؜؜**Object Storage؜**: ذخیره‌سازی توزیع‌شدهٔ blob (مثلاً تصاویر). ؜ 
- ؜؜؜**Read Replica؜**: replicaٔ پایگاه‌داده فقط-خواندنی برای مقیاس‌دهی throughput. ؜ 
- ؜؜؜**Write-through Cache؜**: به‌روزرسانی cache همزمان با write به DB. ؜ 
- ؜؜؜**Hot Key؜**: کلید cache با دسترسی بسیار بالا که بار را نامتوازن می‌کند. ؜ 
- ؜؜؜**Precomputed Feed؜**: فید از پیش تولید و cache شده.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

## ؜برنامهٔ مطالعه (اختیاری)

- ؜تمرین برآورد ظرفیت از اصول اولیه (کاربر، شیء، اندازه). ؜ 
- ؜طراحی کلیدهای cache، TTL و استراتژی‌های invalidation. ؜ 
- ؜مرور trade-offهای پیش‌محاسبه در برابر on-demand. ؜ 
- ؜نقشهٔ تکامل مرحله‌ای: monolith → جداسازی read/write → ریزسرویس‌ها در صورت نیاز. ؜ 
- ؜بازبینی سرویس‌های مدیریت‌شدهٔ مدرن (DB، cache، CDN) برای کاهش هزینهٔ Ops و افزایش سرعت.

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CNot%20stated%20in%20video%7CDesign%20Instagram|fa)

---

## ؜منبع

- ؜ویدیو: https://www.youtube.com/watch?v=VJpfO6KdyWE  
- ؜کانال: ذکر نشده  
- ؜یادداشت: این سند خلاصهٔ مصاحبهٔ ساختگی پیوندشده است.

---

## ؜دربارهٔ خلاصه‌کننده

- ؜من *Ali Sol*، Developer PHP هستم. ؜ 
- ؜وب‌سایت: [alisol.ir](https://alisol.ir)  
- ؜لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
