# ؜‏طراحی سیستم: فروشگاه تجارت الکترونیک شبیه Amazon | Flipkart
- ؜**کانال/مصاحبه‌کننده:؜** codeKarle  
- ؜**مدت‌زمان:؜** ۰۰:۳۲:۳۶  
- ؜**ویدئو:؜** https://www.youtube.com/watch?v=EpASu_1dUdE

> این خلاصه، نکات مهم یک مصاحبهٔ System Design را پوشش می‌دهد. ؜پیشنهاد می‌کنم در صورت امکان ویدئو را کامل ببینید.

---

## ؜‏خلاصهٔ اجرایی یک‌صفحه‌ای (۲–۳ دقیقه)

- ؜؜**صورت مسئله (یک‌خطی):؜** طراحی یک پلتفرم ecommerce شبیه Amazon/Flipkart با قابلیت‌های جستجو، سرویس‌دهی/ETA، سبد خرید/ویishlist، checkout و تاریخچهٔ سفارش‌ها.
- ؜؜**دامنهٔ اصلی:؜**  
  - ؜*در محدوده:* صفحهٔ خانه/جستجو؛ سرویس‌دهی و ETA؛ کاتالوگ؛ سبد خرید/ویishlist؛ checkout و اتصال به پرداخت (در حد high level)؛ چرخهٔ عمر سفارش؛ recommendations؛ notifications؛ analytics؛ آرشیو سفارش‌های تاریخی. ؜ 
  - ؜*خارج از محدوده:* جزئیات داخلی payment gateway؛ الگوریتم‌های لجستیک به‌صورت عمیق (فقط interface/cache)؛ جزئیات ریز امنیت/کامپلاینس.
- ؜؜**اولویت‌های غیرعملکردی:؜**  
  - ؜تاخیر پایین در مسیرهای کاربری؛ high availability برای جستجو/مرور؛ قوام/Consistency بالا برای inventory و پرداخت؛ مقیاس‌پذیری برای analytics/recommendations.
- ؜؜**معماری سطح‌بالا:؜**  
  ‏؜1) ورودی تأمین‌کننده → Kafka؛  
  ‏؜2) Item Service (کاتالوگ، MongoDB)؛  
  ‏؜3) Search Consumer → Elasticsearch؛ Search Service APIها؛  
  ‏؜4) Serviceability & TAT Service (پیش‌محاسبه، cache)؛  
  ‏؜5) User Service (MySQL + Redis cache)؛  
  ‏؜6) Wishlist & Cart Services (MySQL)؛  
  ‏؜7) Order Management (Order Taking/Processing در MySQL، قفل موجودی، Payment Service، ‏Redis TTL برای سفارش‌های معلق، Reconciliation)؛  
  ‏؜8) جریان رخدادها (Kafka) → Spark streaming → Hadoop + Recommendation Service (Cassandra) → پیشنهادهای خانه/دسته‌بندی؛  
  ‏؜9) آرشیو به Cassandra از طریق Historical Orders؛  
  ‏؜10) لایهٔ Notifications (‏SMS/Email/…).
- ؜؜**مهم‌ترین موازنه‌ها (Trade-offs):؜**  
  - ؜Availability در برابر Consistency: جستجو بسیار در دسترس؛ inventory و پرداخت‌ها strongly consistent. ؜ 
  - ؜Full‑text در Elasticsearch در برابر کوئری‌های relational در MySQL برای فیلترهای کاتالوگ. ؜ 
  - ؜سادگی عملیاتی در برابر مقیاس‌پذیری روی MySQL/Cassandra/ES/Kafka/Spark. ؜ 
  - ؜پیش‌محاسبهٔ serviceability در برابر محاسبهٔ لحظه‌ای (latency در برابر تازگی).
- ؜؜**ریسک‌ها/خرابی‌های رایج:؜**  
  - ؜oversell شدن موجودی در شرایط race؛ رقابت timeout پرداخت با پاسخ پرداخت؛ cache سرویس‌دهی کهنه؛ lag ایندکس ES؛ hotspot شدن writeهای MySQL؛ واگرایی در reconciliation.
- ؜؜**فلش‌کارت مرور ۵ دقیقه‌ای:؜**  
  - ؜چرا MongoDB برای items؟ چون attributes ناهمگن و schema منعطف. ؜ 
  - ؜چرا Elasticsearch؟ full-text، فیلتر، fuzzy، relevance. ؜ 
  - ؜کجا consistency قوی لازم است؟ شمارندهٔ inventory و state انتقال سفارش. ؜ 
  - ؜پرداخت بدون پاسخ را چطور هندل کنیم؟ Redis TTL + expiry callback → لغو و rollback موجودی. ؜ 
  - ؜توصیه‌گرها چطور ساخته می‌شوند؟ رویدادهای Kafka → Spark/Hadoop → Recommendation Service (Cassandra). ؜ 
  - ؜چطور MySQL را کوچک نگه داریم؟ آرشیو سفارش‌های terminal در Cassandra. ؜ 
  - ؜چطور اقلام غیرقابل ارسال را در جستجو پنهان کنیم؟ Search Service با Serviceability/TAT چک و فیلتر می‌کند. ؜ 
  - ؜چه چیزی مانع stock منفی می‌شود؟ constraint روی شمارندهٔ inventory + تراکنش کاهشی. ؜ 
  - ؜fan‑out نوتیفیکیشن‌ها؟ یک Notification Service انتزاعی برای کانال‌ها. ؜ 
  - ؜ادغام تاریخچهٔ سفارش‌ها؟ سرویس Live (Processing) + Historical → نمای Orders یکپارچه.

[Ask AI: خلاصهٔ اجرایی](https://alisol.ir/?ai=Executive%20Summary%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

---

## ؜‏برچسب‌ها (برای فیلتر کردن بعداً)

- ؜؜**دامنه/صنعت:؜** ‏ecommerce، ‏search، ‏payments، ‏analytics، ‏maps
- ؜؜**الگوی محصول:؜** ‏search‑index، ‏recommendation، ‏notification، ‏queue، ‏job‑scheduler، ‏caching
- ؜؜**نگرانی‌های سیستمی:؜** ‏high‑availability، ‏low‑latency، ‏eventual‑consistency، ‏autoscaling
- ؜؜**زیرساخت/تکنولوژی (ذکرشده):؜** ‏microservices، ‏kafka، ‏mysql، ‏mongodb، ‏cassandra، ‏redis، ‏hdfs، ‏spark، ‏elasticsearch  
  - ؜یادداشت: Kafka همچنان مناسب است، ولی سرویس‌های pub/sub مدیریت‌شده می‌توانند هزینهٔ Ops را کم کنند. ؜ 
  - ؜یادداشت: بین Elasticsearch و OpenSearch با توجه به لایسنس/اپراتوری انتخاب کنید.

[Ask AI: برچسب‌ها](https://alisol.ir/?ai=Interview%20Tags%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

---

## ؜‏درک مسئله

- ؜؜**پرامپت اصلی:؜** ساخت پلتفرمی شبیه Amazon/Flipkart که کاربر بتواند محصول جستجو کند، قابلیت سرویس‌دهی/ETA ببیند، به wishlist/cart اضافه کند، checkout کند و تاریخچهٔ سفارش را ببیند.
- ؜؜**موارد استفاده:؜**  
  - ؜جستجو و فیلتر محصولات؛ نمایش deliverability و TAT برای آدرس/کدپستی کاربر. ؜ 
  - ؜افزودن به wishlist/cart؛ پرداخت. ؜ 
  - ؜مشاهدهٔ سفارش‌های زنده و تاریخی؛ دریافت notifications برای تغییر وضعیت. ؜ 
  - ؜ورود اقلام توسط فروشنده‌ها؛ ingest پیوستهٔ کاتالوگ.
- ؜؜**خارج از محدوده:؜** جزئیات داخلی payment gateway؛ مسیر‌یابی لجستیک عمیق (فقط interface/cache).
- ؜؜**APIها (سطح‌بالا):؜** Search (متن/فیلتر)، Item Service (‏CRUD، bulk get)، User (‏get/update با Redis cache)، Wishlist/Cart (‏add/get/delete)، Order (‏create/update status)، Serviceability/TAT (تحویل‌پذیری/ETA)، Recommendations (براساس کاربر/دسته)، Notifications (ارسال).

[Ask AI: درک مسئله](https://alisol.ir/?ai=Problem%20Understanding%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

---

## ؜‏الزامات و محدودیت‌ها

### ؜‏بیان‌شده در ویدئو
- ؜؜**عملکردی:؜** جستجو؛ سرویس‌دهی و TAT در صفحهٔ جستجو؛ wishlist؛ cart؛ checkout؛ مدیریت موفق/شکست/timeout پرداخت؛ تاریخچهٔ سفارش؛ notifications؛ recommendations؛ ورودی تأمین‌کننده.
- ؜؜**غیرعملکردی:؜** تاخیر پایین برای UX؛ availability بالا برای جستجو؛ consistency بالا برای inventory و order state؛ مقیاس‌پذیری analytics و ذخیره‌سازی (استراتژی آرشیو).
- ؜؜**استراتژی Consistency:؜**  
  - ؜inventory و orders: strong consistency/transactions (MySQL). ؜ 
  - ؜جستجو و توصیه‌گر: eventual consistency با availability بالا.

### ؜‏فرض‌ها (محافظه‌کارانه)
- ؜استقرار منطقه‌ای با کاتالوگ‌های انبار جدا. ؜ 
- ؜بار خواندن بالا در جستجو؛ حساسیت نوشتن در inventory؛ قبول eventual consistency برای search و recommendations. ؜ 
- ؜jobهای پس‌زمینه برای ایندکس‌ها، cacheها و آرشیو.

[Ask AI: الزامات و محدودیت‌ها](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

---

## ؜‏برآورد سرانگشتی
(در ویدئو عددی ارائه نشده است.)

[Ask AI: برآورد](https://alisol.ir/?ai=Estimation%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

---

## ؜‏معماری سطح‌بالا

- ؜؜**کلاینت و Edge:؜** وب/موبایل → AuthN/AuthZ + reverse proxy. ؜ 
- ؜؜**ورود تأمین‌کننده:؜** Inbound Service فیدهای فروشنده را تجمیع کرده و به Kafka می‌فرستد. ؜ 
- ؜؜**کاتالوگ:؜** Item Service (منبع حقیقت؛ MongoDB) با APIهای CRUD و bulk‑get. ؜ 
- ؜؜**جستجو:؜** Search Consumer به Elasticsearch می‌نویسد؛ Search Service API جستجو/فیلتر/fuzzy را ارائه می‌کند و با Serviceability/TAT و User Service (آدرس پیش‌فرض) ادغام می‌شود. ؜ 
- ؜؜**Serviceability & TAT:؜** ماتریس پیش‌محاسبه (انبار×کدپستی) در cache؛ پاسخ سریع deliverable? + ETA؛ به‌روزرسانی دوره‌ای از سیستم‌های Warehouse/Logistics. ؜ 
- ؜؜**User Service:؜** روی MySQL با Redis (الگوی read‑through). ؜ 
- ؜؜**Wishlist & Cart:؜** سرویس‌های جدا با DBهای مستقل (MySQL) برای مقیاس‌پذیری؛ انتشار رویدادها برای analytics/recs. ؜ 
- ؜؜**Order Management:؜** ایجاد سفارش (‏status=CREATED) + ثبت (orderID, expiry) در Redis؛ کسر موجودی با constraint؛ انتزاع Payment Service؛ Reconciliation دوره‌ای؛ expiry callback برای لغو و بازگردانی موجودی. ؜ 
- ؜؜**Streams & Analytics:؜** Kafka → Spark streaming → گزارش‌ها + Hadoop data lake → مدل ALS → Recommendation Service (Cassandra). ؜ 
- ؜؜**Delisting جستجو:؜** رخداد out‑of‑stock باعث حذف از ایندکس ES می‌شود. ؜ 
- ؜؜**آرشیو:؜** انتقال سفارش‌های terminal به Cassandra سپس حذف از OLTP. ؜ 
- ؜؜**Notifications:؜** لایهٔ واحد برای SMS/Email/…

[Ask AI: معماری سطح‌بالا](https://alisol.ir/?ai=High-Level%20Architecture%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

---

## ؜‏زیرسیستم‌ها (Deep Dive)

### ؜‏۸.۱ ‏Item Service (Catalog; MongoDB)
- ؜؜**نقش:؜** منبع حقیقت برای متادیتای کالا؛ attributes ناهمگن. ؜ 
- ؜؜**مدل داده:؜** Item(id, name, description, category, attributes:{…}, status, seller, warehouseRefs…). ؜ 
- ؜؜**APIها:؜** get by id؛ bulk get؛ افزودن/به‌روزرسانی/حذف. ؜ 
- ؜؜**مقیاس‌پذیری:؜** پارتیشن‌بندی بر اساس id/دسته؛ خواندن زیاد از cache یا ES برای جستجو. ؜ 
- ؜؜**Consistency:؜** قوی در همان سرویس؛ ES پایین‌دستی eventual.

[Ask AI: زیرسیستم - ؜Item Service](https://alisol.ir/?ai=Subsystem%20-%20Item%20Service%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

### ؜‏۸.۲ ‏Search (ES + Search Service)
- ؜؜**نقش:؜** کشف محصول با full‑text و فیلتر؛ ادغام با serviceability. ؜ 
- ؜؜**مدل:؜** ایندکس ES با فیلدهای توکنایز؛ نگاشت attributes برای فیلترها؛ فلگ‌های موجودی. ؜ 
- ؜؜**APIها:؜** query + filters؛ pagination؛ sort. ؜ 
- ؜؜**Consistency:؜** رویدادمحور و eventual؛ آپدیت‌ها از Kafka consumers. ؜ 
- ؜؜**نکتهٔ عملیاتی:؜** مراقب hot shard و فیلدهای با کاردینالیتی بالا.

[Ask AI: زیرسیستم - ؜Search](https://alisol.ir/?ai=Subsystem%20-%20Search%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

### ؜‏۸.۳ ‏Serviceability & TAT
- ؜؜**نقش:؜** تعیین deliverability و ETA بر اساس کدپستی/انبار. ؜ 
- ؜؜**روش:؜** پیش‌محاسبهٔ ترکیب‌ها، cache شدن؛ کوئری سریع و read‑only. ؜ 
- ؜؜**نوسازی:؜** sync دوره‌ای از Warehouse/Logistics؛ گراف مسیر/قابلیت‌ها در cache.

[Ask AI: زیرسیستم - ؜Serviceability & TAT](https://alisol.ir/?ai=Subsystem%20-%20Serviceability%20and%20TAT%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

### ؜‏۸.۴ ‏User Service (MySQL + Redis)
- ؜؜**نقش:؜** پروفایل کاربر و آدرس پیش‌فرض برای چک سرویس‌دهی. ؜ 
- ؜؜**Cache:؜** الگوی read‑through (اول Redis سپس MySQL). ؜ 
- ؜؜**Consistency:؜** همگرایی eventual بین cache و DB.

[Ask AI: زیرسیستم - ؜User Service](https://alisol.ir/?ai=Subsystem%20-%20User%20Service%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

### ؜‏۸.۵ ‏Wishlist & Cart (MySQL)
- ؜؜**نقش:؜** افزودن/خواندن/حذف آیتم‌ها؛ سیگنال برای توصیه‌گر. ؜ 
- ؜؜**مقیاس‌پذیری:؜** سرویس‌های مستقل؛ انتشار event به Kafka.

[Ask AI: زیرسیستم - ؜Wishlist & Cart](https://alisol.ir/?ai=Subsystem%20-%20Wishlist%20and%20Cart%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

### ؜‏۸.۶ ‏Order Management (MySQL + Redis + Payment)
- ؜؜**جریان:؜**  
  ‏؜1) ایجاد سفارش (status=CREATED) → ثبت (orderID, expiry) در Redis. ؜ 
  ‏؜2) کسر موجودی با constraint (جلوگیری از منفی شدن). ؜ 
  ‏؜3) Payment Service → success/failure/no‑response. ؜ 
  ‏؜4) موفق: تغییر به PLACED + انتشار event. ؜ 
  ‏؜5) ناموفق: لغو + بازگردانی موجودی + reconciliation. ؜ 
  ‏؜6) بی‌پاسخ: expiry callback در Redis → لغو + بازگردانی موجودی. ؜ 
  - ؜توصیه: state machine ایدمپوتنت + الگوی outbox/inbox برای مقابله با پیام‌های تکراری.

[Ask AI: زیرسیستم - ؜Order Management](https://alisol.ir/?ai=Subsystem%20-%20Order%20Management%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

### ؜‏۸.۷ ‏Recommendations (Kafka → Spark/Hadoop → Cassandra)
- ؜؜**سیگنال‌ها:؜** جستجوها، رخدادهای wishlist/cart، سفارش‌ها. ؜ 
- ؜؜**مدل‌ها:؜** Collaborative Filtering (ALS) + لیست‌های per‑user و per‑category. ؜(در ۲۰۲۵ بازیابی دوبرجی + رنکر سبک هم کاندید است.)

[Ask AI: زیرسیستم - ؜Recommendations](https://alisol.ir/?ai=Subsystem%20-%20Recommendations%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

### ؜‏۸.۸ ‏آرشیو و سفارش‌های تاریخی (Cassandra)
- ؜؜**نقش:؜** جابه‌جایی سفارش‌های terminal از OLTP به ذخیرهٔ مقیاس‌پذیر. ؜ 
- ؜؜**فرآیند:؜** درج در store تاریخی، تأیید تکرار، حذف از OLTP. ؜ 
- ؜؜**الگوهای کوئری:؜** جستجو بر اساس order id / user id / seller؛ مناسب با الگوهای محدود Cassandra.

[Ask AI: زیرسیستم - ؜آرشیو](https://alisol.ir/?ai=Subsystem%20-%20Archival%20and%20Historical%20Orders%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

### ؜‏۸.۹ ‏Notifications
- ؜؜**نقش:؜** انتزاع روی SMS/Email/…؛ تریگر روی رخدادهای کلیدی.

[Ask AI: زیرسیستم - ؜Notifications](https://alisol.ir/?ai=Subsystem%20-%20Notifications%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

---

## ؜‏Trade-offs و جایگزین‌ها

| موضوع | گزینهٔ A | گزینهٔ B | گرایش ویدئو | دلیل |
| --- | --- | --- | --- | --- |
| ذخیرهٔ کاتالوگ | MongoDB | relational + EAV | MongoDB | انعطاف attributes بین دسته‌ها |
| جستجو | Elasticsearch | SQL + LIKE | Elasticsearch | full‑text، فیلتر، fuzzy |
| قوام موجودی | MySQL tx + constraint | eventual + retries | MySQL tx | جلوگیری از stock منفی |
| محاسبهٔ سرویس‌دهی | precompute cache | on‑the‑fly pathfinding | precompute | latency پایین و قابل پیش‌بینی |
| OLTP سفارش‌ها | یک خوشهٔ MySQL | شاردینگ/مدیریت‌شده | Single + آرشیو | سادگی، بعداً offload تاریخی |
| ذخیرهٔ تاریخی | Cassandra | نگه‌داشتن در MySQL | Cassandra | حجم زیاد، الگوهای محدود |

[Ask AI: موازنه‌ها](https://alisol.ir/?ai=Trade-offs%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

---

## ؜‏پایداری، دسترس‌پذیری و کارایی

- ؜؜**زون‌های Consistency:؜** قوی برای inventory/order؛ eventual برای search/recs. ؜ 
- ؜؜**Raceهای رایج:؜** موفقیت پرداخت در برابر TTL expiry → حذف TTL در success/failure؛ در موفقیت دیرهنگام بعد از expiry: refund یا ایجاد سفارش جدید و mark placed. ؜ 
- ؜؜**Reconciliation:؜** تطبیق دوره‌ای inventory با سفارش‌ها؛ به‌روزرسانی‌های ایدمپوتنت. ؜ 
- ؜؜**Performance:؜** cache سرویس‌دهی؛ Redis برای خوانش‌های کاربر؛ ES برای جستجو؛ bulk read از Item Service.

[Ask AI: پایداری و کارایی](https://alisol.ir/?ai=Reliability%20and%20Performance%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

---

## ؜‏امنیت و حریم خصوصی *(محدود در ویدئو)*

- ؜احراز هویت/مجوز در edge؛ نگه‌داری PII در User Service؛ پرداخت از طریق gatewayهای بیرونی؛ notifications انتزاعی.

[Ask AI: امنیت و حریم خصوصی](https://alisol.ir/?ai=Security%20and%20Privacy%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

---

## ؜‏Observability *(محدود در ویدئو)*

- ؜پایش queryهای جستجو، conversion، ناهنجاری‌های موجودی، نتایج پرداخت؛ استریم متریک‌ها برای داشبورد «top items/category revenue».

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

---

## ؜‏سؤالات پیگیری مصاحبه‌گر
- ؜ذکر نشده است.

[Ask AI: سؤالات پیگیری](https://alisol.ir/?ai=Follow-up%20Questions%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

---

## ؜‏سؤالات کاندید (مدل‌سازی‌شده)
- ؜ذکر نشده است.

[Ask AI: سؤالات کاندید](https://alisol.ir/?ai=Candidate%20Questions%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

---

## ؜‏جمع‌بندی نکات کلیدی

- ؜جداسازی availability و consistency بر حسب حوزه (search در برابر inventory). ؜ 
- ؜پیش‌محاسبهٔ serviceability برای سرعت؛ بازسازی از Warehouse/Logistics. ؜ 
- ؜تراکنش‌های MySQL + constraint برای صحت inventory. ؜ 
- ؜نگه‌داشت سفارش با TTL نیازمند هندل دقیق race و ایدمپوتنسی است. ؜ 
- ؜استریم رویدادها را زود راه بیندازید؛ توصیه‌گر و گزارش‌گیری سود می‌برد. ؜ 
- ؜آرشیو سفارش‌های terminal برای سبک نگه‌داشتن OLTP؛ historical از Cassandra. ؜ 
- ؜همگام نگه‌داشتن ایندکس ES با رویدادهای موجودی برای جلوگیری از نمایش out‑of‑stock. ؜ 
- ؜استفاده از bulk APIها برای کاهش چت‌گونه بودن سرویس‌ها.

[Ask AI: نکات کلیدی](https://alisol.ir/?ai=Key%20Takeaways%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

---

## ؜‏واژه‌نامه

- ؜؜**Serviceability/TAT:؜** امکان ارسال به کدپستی و زمان تقریبی. ؜ 
- ؜؜**ALS:؜** الگوریتم Alternating Least Squares برای توصیه‌گر. ؜ 
- ؜؜**Terminal Order State:؜** سفارشی که دیگر تغییر حالت نمی‌دهد (DELIVERED/CANCELLED). ؜ 
- ؜؜**Reconciliation:؜** هم‌ترازسازی دوره‌ای موجودی و سفارش‌ها. ؜ 
- ؜؜**TTL Expiry Callback:؜** رویداد انقضای کلید Redis برای timeout سفارش‌های معلق.

[Ask AI: واژه‌نامه](https://alisol.ir/?ai=Glossary%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

---

## ؜‏برنامهٔ مطالعه (اختیاری)

- ؜تمرین طراحی «availability در برابر consistency» به‌تفکیک زیرسیستم. ؜ 
- ؜سناریوهای race موجودی و state transitionهای ایدمپوتنت را تمرین کنید. ؜ 
- ؜ساخت یک ایندکس کوچک ES از کاتالوگ آزمایشی + اتصال یک cache سرویس‌دهی. ؜ 
- ؜پیاده‌سازی نگه‌داشت سفارش با TTL و مقایسه با job زمان‌بندی‌شدهٔ دقیق.

[Ask AI: برنامهٔ مطالعه](https://alisol.ir/?ai=Study%20Plan%7CcodeKarle%7CDesign%20E-commerce%20Store%20like%20Amazon%20%7C%20Flipkart|fa)

---

## ؜‏دربارهٔ خلاصه‌کننده
من *Ali Sol*، توسعه‌دهندهٔ PHP هستم.

- ؜وب‌سایت: https://alisol.ir  
- ؜لینکدین: https://www.linkedin.com/in/alisolphp
