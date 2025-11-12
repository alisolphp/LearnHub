# ؜طراحی سیستم: TikTok | مصاحبه Mock با Google TPM

- ؜؜**کانال/مصاحبه‌کننده:؜** Exponent  
- ؜؜**مدت:؜** ۰۰:۳۳:۱۲  
- ؜؜**ویدیو:؜** https://www.youtube.com/watch?v=Z-0g_aJL5Fw

> این سند خلاصه‌ی یک مصاحبه‌ی طراحی سیستم است. ؜برای لحن و جزئیات، دیدن ویدیوی کامل توصیه می‌شود.

---

## ؜خلاصه‌ی یک‌صفحه‌ای (۲–۳ دقیقه مطالعه)

- ؜؜**صورت مسأله (یک‌خطی):؜** بک‌اندِ یک اپ شبیه TikTok را طراحی کنید که در آن کاربران ویدیوهای کوتاه آپلود می‌کنند و یک فید شخصی‌سازی‌شده می‌بینند؛ قابلیت‌های follow / like / favorite و تعاملات پایه را پشتیبانی کند.
- ؜؜**دامنه‌ی اصلی:؜** سرویس‌های بک‌اند، storage، caching، ساخت فید، scalability. ؜ 
  ؜**خارج از دامنه:؜** جزئیات کلاینت موبایل؛ جزئیات کامل الگوریتم recommendation؛ tagging؛ مدل کامل auth.
- ؜؜**اولویت‌های نافی‌(Non-Functional):؜** دسترس‌پذیری خیلی بالا (~۹۹٫۹۹۹٪)، latency پایین برای لود فید، مقیاس جهانی، الگوی read-heavy، و offload تحویل ویدیو با CDN.
- ؜؜**قیود و اعداد کلیدی (از مصاحبه):؜**
  - ؜ویدیوها تا حدود ۱ دقیقه؛ فرضِ ~۵MB/min فشرده‌سازی (H.264) *(فرض مصاحبه)*. ؜ 
    [نکته: برای delivery مدرن از HLS/DASH تطبیقی با bitrateهای مختلف استفاده کنید؛ H.264 بد نیست اما HEVC/AV1 را برحسب device/licensing بسنجید.]
  - ؜حدود ۱M کاربر فعال روزانه (DAU).
  - ؜؜مثال رفتار Creator: حدود ۲ آپلود در روز برای هر کاربر ⇒ حدود ۱۰MB در روز (فقط payload ویدیو) *(فرض مصاحبه)*.
## معماری سطح‌بالا (متنی)

<div dir="rtl">

<ol>
  <li>؜API Gateway + Load Balancer جلوی microservices.</li>
  <li><strong>؜Upload Service</strong>: متادیتا را در RDBMS می‌نویسد؛ بایت‌های ویدیو در Object Storage (مثل S3).
    <br><em>نکته:</em> در DB فقط signed URL نگه دارید؛ blobها immutable باشند؛ lifecycle برای cold tierها تنظیم شود.
  </li>
  <li><strong>؜Feed Service</strong>: روی <code>GET /feed</code> لینک‌های ویدیوهای از پیش انتخاب‌شده را برمی‌گرداند.</li>
  <li><strong>؜Pre-cache Service</strong>: playlistهای per-user را از قبل در Cache (مثلاً Redis) می‌سازد.</li>
  <li><strong>؜Read Replicas</strong> برای بار خواندن؛ Primary برای نوشتن‌ها.</li>
  <li><strong>؜CDN</strong> جلوی Object Storage برای تحویل جهانی.</li>
  <li>؜Sharding (اختیاری) برای مقیاس‌دادن به write (بر اساس region یا key/hash).</li>
</ol>

</div>

- ؜؜**؜Trade-offهای مهم:؜**
  - ؜؜precompute فید vs. ؜ranking on-demand (latency در برابر freshness).
  - ؜سادگی RDBMS vs. ؜الگوی read در NoSQL.
  - ؜؜replication سراسری (consistency) vs. ؜autonomy منطقه‌ای (latency).
  - ؜هزینه egress در CDN vs. ؜hit به origin و UX.
- ؜؜**ریسک‌ها/نقاط شکست اصلی:؜**
  - ؜«thundering herd» روی ویدیوهای داغ بدون CDN.
  - ؜؜staleness در cache / تاخیر در invalidation و اثر بر freshness فید.
  - ؜اشباع primary DB در اسپایک‌ها (uploads, likes, follows).
  - ؜حرکت بین‌منطقه‌ای داده و ملاحظات compliance.
- ؜؜**فلش‌کارت مرور ۵ دقیقه‌ای:؜**
  - ؜؜Q: bytes ویدیو کجا ذخیره می‌شوند؟ A: در object storage؛ DB فقط متادیتا + URL.
  - ؜؜Q: فید را چطور سریع نگه داریم؟ A: پیش‌محاسبه‌ی N آیتم برای هر کاربر در Redis و رفرش پس‌زمینه.
  - ؜؜Q: جداسازی read/write؟ A: primary برای write؛ read replicas برای خواندن‌های سنگین.
  - ؜؜Q: مقابله با اسپایک جهانی؟ A: CDN جلوی blobها؛ LB برای APIها؛ autoscaling؛ precompute برای انتقال بار.
  - ؜؜Q: کی shard کنیم؟ A: وقتی write DB گلوگاه شد؛ shard بر اساس region یا key.
  - ؜؜Q: consistency لایک/کانترها؟ A: eventual؛ آپدیت‌های idempotent طراحی کنید.

[Ask AI: خلاصه‌ی اجرایی](https://alisol.ir/?ai=Executive%20Summary%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM|fa)

---

## ؜برچسب‌ها (برای فیلتر بعدی)

- ؜؜**حوزه/صنعت:؜** `social-media, streaming`
- ؜؜**الگوی محصول:؜** `feed, recommendation, object-storage, cdn, caching, job-scheduler`
- ؜؜**نگرانی‌های سیستمی:؜** `high-availability, low-latency, eventual-consistency, geo-replication, hot-key, autoscaling`
- ؜؜**تکنولوژی/Infra (ذکرشده):؜** `microservices, rest, postgres, redis, s3, cdn, load-balancer`  
  [نکته: برای event streamهای خیلی بزرگ (likes, follows) از یک log مقاوم مثل Kafka/Pulsar برای decouple کردن writeها از materialized viewها استفاده کنید.]

[Ask AI: برچسب‌های مصاحبه](https://alisol.ir/?ai=Interview%20Tags%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM|fa)

---

## ؜درک مسأله

- ؜؜**پرامپت اصلی:؜** بک‌اند TikTok با تمرکز بر آپلود ویدیوهای کوتاه و یک فید اسکرول‌ شونده؛ شامل follow/unfollow، like/favorite و comment (در حد بالا). ؜تمرکز روی بک‌اند.
- ؜؜**؜Use Caseها:؜**
  - ؜آپلود ویدیو کوتاه با caption اختیاری.
  - ؜دیدن فید (ابتدا: حساب‌هایی که follow شده‌اند؛ اختیاری: trending/recs).
  - ؜تعامل: follow/unfollow، like/favorite، comment (در حد کلی).
- ؜؜**خارج از دامنه:؜** UX عمیق کلاینت، سیستم tagging، جزئیات کامل الگوریتم recommendation.
- ؜؜**؜APIها (در حد high level):؜**
  - ؜`POST /videos` (ارسال متادیتا + لینک blob).
  - ؜`GET /feed?user_id=...` (بازگرداندن N لینک ویدیو بعدی).
  - ؜`POST /user-activity` (like, follow, ...)، و `GET /user-activity` (خواندن likes/follows کاربر). ؜ 
    [نکته: ترجیحاً resourceهای مجزا (`POST /likes`, `POST /follows`) برای شفافیت و observability.]

[Ask AI: درک مسأله](https://alisol.ir/?ai=Problem%20Understanding%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM|fa)

---

## ؜نیازمندی‌ها و قیود

؜**بر اساس ویدیو؜**
- ؜؜**؜Functional:؜** آپلود ویدیو (+caption)، مشاهده‌ی فید تک‌ویدیویی (اسکرول)، follow creators، like/favorite، comment سبک.
- ؜؜**؜Non-Functional:؜** «highly available» (~۵ ناین به‌عنوان هدف)، latency پایین برای فید، مدیریت الگوی read-heavy، scale برای اسپایک‌ها.
- ؜؜**ورودی‌های capacity:؜** ~۱M DAU؛ ویدیوها تا ۱ دقیقه؛ فرض ~۵MB/min و ~۲ آپلود/نفر/روز؛ bytes ویدیو در blob store؛ تحویل با CDN.

؜**فرضیات (توسط کاندید در ویدیو)؜**
- ؜۵MB/min برای H.264 و «۲ آپلود/روز/کاربر» فقط برای sizing تقریبی است. ؜ 
  [نکته: در تولید واقعی با telemetry مشاهده‌شده و prefetch depth تأیید‌شده با A/B اندازه‌گیری کنید.]

[Ask AI: نیازمندی‌ها و قیود](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM|fa)

---

## ؜برآورد سرانگشتی

- ؜با اعداد ویدیو:  
  - ؜؜**نوشتن ویدیو به‌ازای هر کاربر/روز:؜** حدود ۱۰MB (۲ × ۵MB). ؜ 
  - ؜؜**اثردست متادیتا:؜** حدود ۱KB به‌ازای هر کاربر/روز (مرتبه‌ی حدودی). ؜ 
  - ؜؜**نتیجه:؜** storage غالباً توسط blobها اشغال می‌شود؛ روی lifecycle + CDN تمرکز کنید. ؜ 
- ؜؜Peak QPS/egress عددی‌سازی نشده است.

در صورت نیاز به دقت بیشتر: *در ویدیو بیان نشده—از عدددهی صرف‌نظر می‌شود.*

[Ask AI: برآورد](https://alisol.ir/?ai=Estimation%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM|fa)

---

## ؜معماری سطح‌بالا

- ؜؜**؜Ingress:؜** کلاینت → API Gateway/Load Balancer → سرویس‌ها. ؜ 
  [نکته: ترجیح blue-green/rolling پشت LB؛ هر جا شد canary.]
- ؜؜**؜Upload Service:؜** دریافت ویدیو + caption؛ ذخیره‌ی متادیتا (user_id، video_id به‌صورت UUID، URL به blob، caption) در relational DB؛ آپلود blob در object storage.
- ؜؜**؜Feed Service:؜** `GET /feed` ده آیتم بعدی را برای کاربر برمی‌گرداند؛ از Redis list keyed by user می‌خواند.
- ؜؜**؜Pre-cache Service:؜** job پس‌زمینه/Batch که playlistهای per-user را در Redis می‌سازد (زمان‌بندی‌شده یا event-triggered).
- ؜؜**لایه داده:؜** primary relational DB (مثل Postgres) برای write؛ read replicas برای بار خواندن و builder. ؜ 
  [نکته: اگر joinها زیاد شدند، read modelهای denormalized / materialized view برای کاهش fan-out.]
- ؜؜**؜CDN + Object Storage:؜** CDN جلوی blob storage برای محتوای داغ و مسیریابی جهانی. ؜ 
- ؜؜**؜Scale-Out:؜** autoscaling برای سرویس‌ها؛ وقتی write saturated شد، sharding (مثلاً region-shard). ؜ 
  [نکته: shard keyهایی انتخاب کنید که creatorهای داغ را داغ‌تر نکنند؛ consistent hashing با قابلیت rebalance.]

[Ask AI: معماری سطح‌بالا](https://alisol.ir/?ai=High-Level%20Architecture%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM|fa)

---

## ؜عمیق‌شدن در زیرسامانه‌ها

### ؜۸.۱ Uploads

- ؜؜**نقش:؜** دریافت ویدیو+متن؛ ذخیره‌ی متادیتا؛ قراردادن bytes در blob store؛ برگرداندن موفقیت.
- ؜؜**مدل داده (relational):؜**  
  - ؜`users(user_id UUID, ...)`  
  - ؜`videos(video_id UUID, user_id FK, blob_url TEXT, caption TEXT, created_at TIMESTAMP, ...)`
- ؜؜**؜Scaling:؜** APIهای stateless را افقی مقیاس دهید؛ write به origin برای object store؛ DB فقط متادیتا. ؜ 
- ؜؜**گلوگاه‌ها:؜** اسپایک write در DB؛ multipart uploadهای بزرگ. ؜ 
  - ؜؜**کاهش:؜** presigned PUT مستقیم به object storage؛ سرویس فقط commit متادیتا. ؜ 
    [نکته: روی policy presigned محدودیت content-type/size بگذارید؛ اسکن/Moderation async.]

[Ask AI: زیرسامانه - ؜Uploads](https://alisol.ir/?ai=Subsystem%20-%20Uploads%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM|fa)

### ؜۸.۲ Feed & Pre-cache

- ؜؜**نقش:؜** سرو فید سریع؛ نگه‌داشت صف از پیش محاسبه‌شده‌ی لینک‌های ویدیو برای هر کاربر.
- ؜؜**استراتژی cache:؜** Redis list/set با کلید `feed:<user_id>` و ~۱۰ آیتم از پیش لود؛ رفرش هنگام مصرف یا زمان‌بندی.
- ؜؜**؜Consistency:؜** eventual؛ کمی staleness برای UX قابل‌قبول است. ؜ 
- ؜؜**؜Hot Key/Bottleneck:؜** ویدیوهای بسیار محبوب؛ کاهش با CDN و انتقال کار recommendation از مسیر request. ؜ 
  [نکته: اگر مصرف همزمان زیاد شد، از rebuild همزمان فهرست‌ها بپرهیزید—work queue و builderهای idempotent.]

[Ask AI: زیرسامانه - ؜Feed](https://alisol.ir/?ai=Subsystem%20-%20Feed%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM|fa)

### ؜۸.۳ User Activity (Likes, Follows)

- ؜؜**نقش:؜** ثبت likes/favorites؛ follow/unfollow؛ فراهم‌کردن read API برای builder.
- ؜؜**مدل داده (relational):؜**  
  - ؜`follows(follower_id, followee_id, created_at, PK(follower_id, followee_id))`  
  - ؜`likes(user_id, video_id, created_at, PK(user_id, video_id))`
- ؜؜**؜Scaling:؜** خواندن‌ها از replicas؛ نوشتن‌ها idempotent با upsert. ؜ 
  [نکته: برای شمارنده‌های بزرگ، شمارش‌ها را async در materialized counterها نگه دارید تا hot row نشود.]

[Ask AI: زیرسامانه - ؜User Activity](https://alisol.ir/?ai=Subsystem%20-%20User%20Activity%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM|fa)

---

## ؜؜Trade-offها و گزینه‌های جایگزین

| موضوع | گزینه A | گزینه B | گرایش ویدیو | دلیل (طبق ویدیو) |
| --- | --- | --- | --- | --- |
| ساخت فید | precompute در cache | on-demand در هر request | precompute | کاهش latency و بار DB؛ مناسب read-heavy. |
| ذخیره متادیتا | Relational DB | NoSQL KV/Doc | Relational | روابط ساخت‌یافته (users↔videos, FK) و queryها. |
| تحویل | CDN جلوی blobs | فقط origin | CDN | offload پهنای‌باند؛ مدیریت محتوای داغ و کاربران جهانی. |
| مقیاس نوشتن | single primary + replicas | sharding منطقه‌ای/کلیدی | شروع با primary؛ بعد sharding | وقتی write bottleneck شد. |
| دسترس‌پذیری | LB روی سرویس‌های stateless | مونولیت منفرد | LB | استقرار بدون‌وقفه و مدیریت اسپایک. |

[Ask AI: Trade-offها](https://alisol.ir/?ai=Trade-offs%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM|fa)

---

## ؜قابلیت اطمینان، دسترس‌پذیری و کارایی

- ؜؜**هدف Availability:؜** حدود ۹۹٫۹۹۹٪ (در حد آرمان). ؜ 
  [نکته: بودجه خطا per-tier؛ multi-AZ + failover سریع تأثیرگذارتر از یک عدد کلی.]
- ؜؜**؜Latency:؜** فید را با prefetching حدود ۳–۱۰ آیتم و fetch پس‌زمینه سریع نگه دارید.
- ؜؜**؜Backpressure/Shedding:؜** ترجیح با سرو کردن فید کمی قدیمی‌تر بجای خطا؛ اندازه‌ی cache مناسب.
- ؜؜**؜DR/Regions:؜** geo-routing را در نظر بگیرید؛ تکرار blobs از طریق CDN + origin cross-region (اگر لازم شد).

[Ask AI: قابلیت اطمینان و کارایی](https://alisol.ir/?ai=Reliability%20and%20Performance%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM|fa)

---

## ؜امنیت و حریم خصوصی

در ویدیو به‌صراحت نیامده. ؜ 
[نکته: auth روی همه‌ی APIهای mutating؛ دسترسی object storage با signed URL کوتاه‌عمر؛ pipeline سخت‌گیرانه‌ی moderation.]

[Ask AI: امنیت و حریم خصوصی](https://alisol.ir/?ai=Security%20and%20Privacy%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM|fa)

---

## ؜؜Observability

در ویدیو به‌صراحت نیامده. ؜ 
[نکته: p95/p99 برای `/feed` و موفقیت upload؛ نرخ hit در cache؛ offload CDN؛ hot keyهای برتر؛ خطاهای per-region.]

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM|fa)

---

## ؜پرسش‌های Follow-up (از مصاحبه‌گر)

- ؜؜cache چه اثری روی latency و freshness دارد؟
- ؜اگر ترافیک ۱۰x شد، گلوگاه‌ها کجاست؟
- ؜درباره‌ی regions و global routing/CDN چطور فکر می‌کنید؟

[Ask AI: پرسش‌های Follow-up](https://alisol.ir/?ai=Follow-up%20Questions%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM|fa)

---

## ؜پرسش‌های کاندید (مدل‌شده)

- ؜چه بخشی از فید در ابتدا باید personalized باشد و چه بخشی صرفاً follower-based؟
- ؜هدف freshness برای ظاهرشدن upload جدید نزد followers چقدر است؟
- ؜قیود compliance که روی region sharding یا data residency اثر می‌گذارند کدام‌اند؟

[Ask AI: پرسش‌های کاندید](https://alisol.ir/?ai=Candidate%20Questions%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM|fa)

---

## ؜نکات کلیدی

- ؜؜bytes ویدیو را از متادیتا جدا کنید: ؜**object storage؜** برای bytes و ؜**relational DB؜** برای متادیتا. ؜ 
- ؜؜**؜CDN؜** برای محتوای داغ و کارایی جهانی حیاتی است. ؜ 
- ؜فید را ؜**از پیش محاسبه؜** کنید تا latency اسکرول پایین بماند و بار read کاهش یابد. ؜ 
- ؜برای خواندن‌های سنگین از ؜**read replica؜** و برای نوشتن‌های سنگین در زمان مناسب ؜**shard؜** کنید. ؜ 
- ؜برای سیگنال‌های اجتماعی ؜**eventual consistency؜** قابل‌قبول است؛ writeهای idempotent و counterهای امن طراحی کنید. ؜ 
- ؜؜**؜zero-downtime deploy؜** با LB و سرویس‌های چندنمونه‌ای.

[Ask AI: نکات کلیدی](https://alisol.ir/?ai=Key%20Takeaways%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM|fa)

---

## ؜واژه‌نامه

- ؜؜**؜Blob/Object Storage:؜** ذخیره‌ساز مقاوم برای فایل‌های باینری بزرگ؛ آدرس‌دهی با URL.
- ؜؜**؜CDN:؜** لایه‌ی cache و مسیریابی سراسری برای کاهش latency و بار origin.
- ؜؜**؜Read Replica:؜** کپی فقط‌خواندنی از primary DB برای مقیاس‌دادن خواندن‌ها.
- ؜؜**؜Pre-cache Service:؜** job پس‌زمینه برای آماده‌سازی فید per-user پیش از درخواست.

[Ask AI: واژه‌نامه](https://alisol.ir/?ai=Glossary%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM|fa)

---

## ؜برنامه‌ی مطالعه (اختیاری)

- ؜تمرین الگوی ؜**upload → blob → metadata؜**. ؜ 
- ؜تمرین trade-offهای ؜**precompute vs on-demand؜** برای فید. ؜ 
- ؜وایت‌بورد ؜**rollout جهانی؜**: CDN، region routing، replication. ؜ 
[نکته: در هر طراحی auth بعدی، ذخیره‌ی پسورد را با Argon2id/bcrypt و کالیبراسیون cost بررسی کنید.]

[Ask AI: برنامه‌ی مطالعه](https://alisol.ir/?ai=Study%20Plan%7CExponent%7CDesign%20TikTok%20%7C%20ft.%20Google%20TPM|fa)

---

## ؜درباره‌ی خلاصه‌کننده

من ؜**Ali Sol؜** هستم، یک PHP Developer.

- ؜وب‌سایت: https://alisol.ir  
- ؜لینکدین: https://www.linkedin.com/in/alisolphp
