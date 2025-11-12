# ؜خلاصه طراحی سامانه: طراحی Spotify (نسخه ساده برای ؜**find؜** و ؜**play؜**)
؜**کانال/مصاحبه‌کننده:؜** IGotAnOffer: Engineering  
؜**مدت:؜** ۴۲:۰۴  
؜**ویدئو اصلی:؜** https://www.youtube.com/watch?v=_K-eupuDVEc

> این سند، خلاصهٔ یک مصاحبهٔ ساختگی سیستم‌دیزاین است. ؜دیدن ویدئو کامل توصیه می‌شود.

---

## ؜۱) خلاصهٔ یک‌صفحه‌ای (برای مرور ۲–۳ دقیقه‌ای)

؜**مسئله (یک‌خطی):؜** طراحی نسخهٔ سادهٔ Spotify با تمرکز بر ؜**جستجو/یافتن؜** و ؜**پخش؜** موسیقی (mobile-first).

؜**دامنهٔ اصلی؜**  
- ؜؜**در دامنه:؜** جستجو/مرور آهنگ‌ها، پخش ترک انتخابی، زیرساخت‌های کلی (Load Balancer، web tier، storage)، ؜**caching؜** (کلاینت/وب/CDN)، مدیریت ؜**hot content؜**، استراتژی جغرافیایی ساده، تخمین سریع. ؜ 
- ؜؜**خارج از دامنه:؜** recommendation، ads، social، playlists، podcasts، حقوق/DRM، ؜**offline licensing؜**، analytics، billing.

؜**اولویت‌های غیرکارکردی (NFRs)؜**  
- ؜شروع پخش با تاخیر کم؛ توزیع‌پذیری؛ در دسترس‌بودن از طریق replication؛ کاهش هزینه با ؜**cache؜** مؤثر.

؜**عددها و قیود کلیدی؜**  
- ؜حدود ؜**۱ میلیارد کاربر؜**، ؜**۱۰۰ میلیون آهنگ؜**. ؜ 
- ؜اندازهٔ متوسط هر آهنگ ≈ ؜**۵ MB؜** → مجموع ؜**۵۰۰ TB؜**؛ با ؜**۳× replication؜** ≈ ؜**۱٫۵ PB؜**. ؜ 
- ؜؜**Song metadata؜** در حد ۱۰–۱۰۰ GB؛ ؜**user metadata؜** حدود ۱ TB. ؜ 
- ؜کلاینت اصلی: اپ موبایل؛ ؜**QPS/SLA؜** دقیق داده نشده.

؜**معماری کلی (متنی)؜**  
- ؜اپ موبایل → ؜**Load Balancer؜** → ؜**Web/App servers؜**. ؜ 
- ؜؜**Metadata DB؜** (relational مثل Amazon RDS/MySQL). ؜ 
- ؜؜**Audio object storage؜** (مثل Amazon S3). ؜ 
- ؜؜**CDN/Edge cache؜** برای ؜**hot tracks؜** (مثل CloudFront). ؜ 
- ؜؜**چندلایه caching:؜** کش دستگاه ↔ کش ؜**web tier؜** ↔ CDN. ؜ 
- ؜؜**geo-aware replication؜** برای نزدیکی و تاب‌آوری.

؜**تریدآف‌های مهم؜**  
- ؜سادگی (relational metadata) در برابر انعطاف جستجو. ؜ 
- ؜استریم از web tier در برابر ؜**redirect؜** کلاینت به CDN. ؜ 
- ؜؜**preload؜** در برابر ؜**on-demand caching؜** برای آهنگ‌های داغ. ؜ 
- ؜؜**uniform LB؜** در برابر ؜**bandwidth/stream-aware LB؜**.

؜**ریسک‌ها/خرابی‌های پرتکرار؜**  
- ؜؜**hot-key storm؜** در ریلیزهای جدید؛ فشار بر origin. ؜ 
- ؜اشباع پهنای‌باند در web tier؛ آبشاری‌شدن ؜**cache miss؜**ها. ؜ 
- ؜تاخیر بین‌منطقه‌ای اگر replicaها ؜**geo-aware؜** نباشند. ؜ 
- ؜سیاست کش ضعیف → هزینهٔ egress بالا و توقف‌های پخش.

؜**کارت‌های مرور ۵ دقیقه‌ای؜**  
- ؜پرسش: چرا ؜**audio؜** و ؜**metadata؜** جدا ذخیره شوند؟  
  پاسخ: الگوهای دسترسی/حجم متفاوت؛ ؜**immutable blobs؜** در برابر ردیف‌های پرس‌وجو-سنگین. ؜ 
- ؜پرسش: چرا ؜**CDN؜** ضروری است؟  
  پاسخ: کاهش بار ؜**origin؜** و تاخیر کمتر برای محتوای داغ. ؜ 
- ؜پرسش: ؜**Load Balancer؜** فراتر از CPU چه چیز را بسنجد؟  
  پاسخ: ؜**network bandwidth؜**، تعداد ؜**active streams؜**، شاید memory. ؜ 
- ؜پرسش: لایه‌های ؜**cache؜** کجاست؟  
  پاسخ: دستگاه کاربر، حافظهٔ ؜**web/app؜**، لبهٔ CDN. ؜ 
- ؜پرسش: چرا نگه‌داری موقت در ؜**web-tier memory؜**؟  
  پاسخ: پخش‌های مجدد سریع هنگام گرم‌شدن CDN؛ کاهش تماس با origin. ؜ 
- ؜پرسش: سود ؜**geo-aware replication؜**؟  
  پاسخ: ؜**RTT؜** کمتر و تاب‌آوری منطقه‌ای بهتر. ؜ 
- ؜پرسش: چه زمانی به ؜**S3؜** مراجعه می‌کنیم؟  
  پاسخ: در ؜**cold start؜** یا ؜**CDN miss؜**؛ در غیر این صورت از edge/RAM. ؜ 
- ؜پرسش: فیلدهای متداول ؜**metadata؜**؟  
  پاسخ: `song_id`, `title`, `artist`, `genre`, `cover_url`, `audio_url`. ؜ 
- ؜پرسش: مهار ؜**hot-key storms؜**؟  
  پاسخ: ؜**proactive push؜** به CDN؛ ؜**redirect-to-edge؜**؛ کش محلی.

[بپرس از AI: خلاصهٔ یک‌صفحه‌ای](https://alisol.ir/?ai=Executive%20Summary%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview|fa)

---

## ؜۲) برچسب‌های مصاحبه (برای فیلتر بعدی)

؜**دامنه/صنعت:؜** streaming  
؜**الگوی محصول:؜** cdn، caching، search-index، object-storage  
؜**نگرانی‌های سیستمی:؜** high-availability، low-latency، geo-replication، hot-key، autoscaling  
؜**زیرساخت/تکنولوژی (ذکرشده):؜** mysql، s3، cdn، websocket، caching، load-balancer  
یادداشت: برای audio معمولاً WebSocket لازم نیست؛ ؜**HTTP range؜** یا ؜**HLS/DASH؜** رایج‌تر و سازگارتر با CDN هستند.

[بپرس از AI: برچسب‌ها](https://alisol.ir/?ai=Interview%20Tags%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview|fa)

---

## ؜۳) درک مسئله

؜**پرامپت (بازگویی):؜** طراحی Spotify با محدودسازی به «؜**یافتن؜** و ؜**پخش؜** موسیقی».

؜**موارد استفاده؜**  
- ؜جستجو/مرور براساس artist/genre. ؜ 
- ؜انتخاب و پخش یک ترک؛ pause/resume؛ ادامه از آخرین موقعیت.

؜**خارج از دامنه؜**  
- ؜playlists، recommendations، social، podcasts، uploads، ads، جزئیات auth.

؜**APIها؜**  
در ویدئو صراحتاً بیان نشده.

[بپرس از AI: درک مسئله](https://alisol.ir/?ai=Problem%20Understanding%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview|fa)

---

## ؜۴) نیازمندی‌ها و قیود

؜**آنچه در ویدئو آمده؜**  
- ؜؜**Users/Songs:؜** حدود ۱B کاربر، ۱۰۰M آهنگ. ؜ 
- ؜؜**Avg song size:؜** حدود ۵ MB؛ ؜**۳× replication؜** برای دوام/دسترسی. ؜ 
- ؜تفاوت ویژگی‌های ؜**metadata؜** و ؜**audio؜**. ؜ 
- ؜کارایی: شروع سریع پخش؛ مدیریت ریلیزهای داغ؛ mobile-first. ؜ 
- ؜تاب‌آوری: replication و placement آگاه به جغرافیا.

؜**فرضیات محافظه‌کارانه؜**  
- ؜هدف شروع پخش: از زیر ثانیه تا چند ثانیه ؜**buffer؜** (SLA دقیق نیست). ؜ 
- ؜workload خواندنی روی ؜**audio؜**؛ ترکیبی روی ؜**metadata؜** (مثل resume point). ؜ 
- ؜احراز هویت/نشست موجود فرض می‌شود.

یادداشت: برای ؜**hot releases؜**، ؜**edge pre-warm؜** و ؜**signed URL redirect؜** معمولاً بهتر از استریم سروری هستند (هزینه/تاخیر).

[بپرس از AI: نیازمندی‌ها و قیود](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview|fa)

---

## ؜۵) برآورد سریع (Back-of-the-Envelope)

- ؜؜**فضای audio:؜** ۱۰۰M × ۵ MB ≈ ؜**۵۰۰ TB؜**؛ با ؜**۳×؜** ≈ ؜**۱٫۵ PB؜**. ؜ 
- ؜؜**song metadata:؜** حدود ۱۰–۱۰۰ GB. ؜ 
- ؜؜**user metadata:؜** حدود ۱ KB × ۱B ≈ ؜**۱ TB؜**. ؜ 
- ؜؜**ترافیک/QPS:؜** در ویدئو عدد ندارد.

[بپرس از AI: برآورد](https://alisol.ir/?ai=Estimation%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview|fa)

---

## ؜۶) معماری سطح‌بالا

- ؜؜**Client:؜** اپ موبایل برای search/play. ؜ 
- ؜؜**Edge:؜** ؜**CDN؜** کش فایل‌های صوتی؛ امکان ؜**redirect؜** کلاینت به edge. ؜ 
- ؜؜**Front Door:؜** ؜**Load Balancer؜** با درنظرگرفتن ؜**bandwidth/active streams؜**. ؜ 
- ؜؜**Web/App Tier:؜** رسیدگی به search/play/progress؛ ؜**in-memory cache؜** کوتاه‌عمر برای ترک‌های اخیر. ؜ 
- ؜؜**Metadata Store:؜** relational DB (RDS/MySQL). ؜ 
- ؜؜**Audio Origin:؜** object storage (S3) برای MP3های ؜**immutable؜**. ؜ 
- ؜؜**Geo Strategy:؜** replica نزدیک به شنونده؛ CDN بیشتر بار تحویل را پوشش می‌دهد. ؜ 
یادداشت: ؜**HTTP-based adaptive streaming؜** (مثل HLS/DASH) با چند bitrate تجربهٔ موبایل را بهتر می‌کند.

[بپرس از AI: معماری سطح‌بالا](https://alisol.ir/?ai=High-Level%20Architecture%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview|fa)

---

## ؜۷) موشکافی زیرسامانه‌ها

### ؜۷٫۱) Search & Discovery
- ؜نقش: یافتن آهنگ براساس artist/genre و برگرداندن لیست نتایج. ؜ 
- ؜مدل داده (طبق ویدئو): `song_id`, `title`, `artist`, `genre`, `cover_url`, `audio_url`. ؜ 
- ؜مقیاس‌پذیری: جستجوی relational روی فیلدهای ایندکس‌شده؛ حجم metadata کوچک‌تر. ؜ 
- ؜کش: ؜**web-tier metadata caching؜** برای کاهش فشار DB. ؜ 
- ؜سازگاری: قوی برای خواندن/نوشتن‌های متادیتا (مثل resume). ؜ 
- ؜گلوگاه‌ها: ؜**full scan؜** روی فیلدهای بدون ایندکس؛ جهش ترافیک برای queries محبوب. ؜ 
- ؜تحمل خطا: ؜**partial results؜** و ؜**graceful degradation؜**.

[بپرس از AI: Search & Discovery](https://alisol.ir/?ai=Subsystem%20-%20Search%20%26%20Discovery%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview|fa)

### ؜۷٫۲) Playback & Delivery
- ؜نقش: شروع و تداوم پخش با حداقل ؜**rebuffer؜**. ؜ 
- ؜؜**جریان سرد (cold):؜** Client → LB → Web → lookup ؜**audio_url؜** → fetch از S3 → سرو؛ ؜**CDN warm-up؜**. ؜ 
- ؜؜**جریان گرم (warm):؜** ؜**redirect؜** به ؜**CDN edge؜**؛ آزادشدن web/app از بار استریم. ؜ 
- ؜کش:  
  - ؜؜**Client؜**: نگه‌داری ترک‌های پرتکرار. ؜ 
  - ؜؜**Web؜**: ؜**RAM cache؜** کوتاه‌عمر برای پل‌زدن تا گرمایش CDN. ؜ 
  - ؜؜**CDN؜**: کش اصلی توزیع برای ؜**hot content؜**. ؜ 
- ؜؜**LB Strategy:؜** اولویت به میزبان‌هایی با ؜**bandwidth؜** آزاد و ؜**active streams؜** کمتر (CPU ثانویه). ؜ 
- ؜؜**Hot-Key Mitigation:؜** ؜**proactive CDN load؜**، ؜**early redirect-to-edge؜**، ؜**request coalescing؜**. ؜ 
یادداشت: به‌جای WebSocket، ؜**HTTP byte-range؜** یا ؜**HLS/DASH؜** استفاده کنید تا از کش سگمنت‌های CDN بهره ببرید.

[بپرس از AI: Playback & Delivery](https://alisol.ir/?ai=Subsystem%20-%20Playback%20%26%20Delivery%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview|fa)

### ؜۷٫۳) Storage & Replication
- ؜؜**Audio:؜** ؜**immutable blobs؜** در object storage؛ ؜**۳× replication؜**. ؜ 
- ؜؜**Metadata:؜** ردیف‌های relational؛ خواندن/نوشتن مکرر (مثل resume point). ؜ 
- ؜؜**Geo-Awareness:؜** replica نزدیک به مراکز تقاضا؛ کاهش پرش بین‌اقیانوسی. ؜ 
- ؜؜**Cost:؜** نسبت ؜**CDN hit؜** و ؜**cache TTL؜**ها اهرم‌های اصلی هزینهٔ egress/origin.

[بپرس از AI: Storage & Replication](https://alisol.ir/?ai=Subsystem%20-%20Storage%20%26%20Replication%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview|fa)

---

## ؜۸) تریدآف‌ها و گزینه‌های جایگزین

| موضوع | گزینه A | گزینه B | تمایل ویدئو | دلیل (از ویدئو) |
|---|---|---|---|---|
| مسیر تحویل صدا | استریم از web tier | ؜**redirect؜** کلاینت به CDN edge | B (ضمنی) | کاهش بار origin و تاخیر از طریق edge |
| مبدأ فایل صدا | S3 (object storage) | فایل‌سیستم/کلاستر یکپارچه | A | مناسب برای ؜**immutable blobs؜** و مقیاس‌پذیر |
| پایگاه دادهٔ متادیتا | Relational (RDS/MySQL) | NoSQL KV/Doc | A | پرس‌وجو بین فیلدها و حجم متوسط |
| سنجه‌های LB | مبتنی بر CPU | ؜**bandwidth/active-stream aware؜** | B | استریم غالباً I/O-bound است |
| کش سمت کلاینت | بدون کش | ؜**local track cache؜** | B | پایداری شبه‌آفلاین و replay سریع |
| گرم‌کردن CDN | ؜**passive؜** (اولین درخواست) | ؜**proactive؜** (ارتقای بر اساس hotness) | B | مدیریت بهتر ریلیزهای داغ |

یادداشت: برای کاتالوگ بزرگ و ؜**fuzzy search؜**، ترکیب relational با ؜**search index؜** (مثلاً inverted index) رایج است.

[بپرس از AI: تریدآف‌ها](https://alisol.ir/?ai=Trade-offs%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview|fa)

---

## ؜۹) قابلیت اطمینان، دسترس‌پذیری و کارایی

- ؜؜**Replication:؜** روی audio (object storage) و metadata (DB). ؜ 
- ؜؜**Geo:؜** replica نزدیک شنونده؛ ؜**CDN؜** پوشش ؜**last mile؜**. ؜ 
- ؜؜**Backpressure:؜** ؜**LB؜** از میزبان‌های ؜**bandwidth-saturated؜** دوری کند؛ ؜**redirect؜** به edge. ؜ 
- ؜؜**Degradation:؜** نزدیک‌ترین ؜**cache؜**؛ تعویق writeهای غیرحیاتی (مثلاً resume).

[بپرس از AI: قابلیت اطمینان و کارایی](https://alisol.ir/?ai=Reliability%20and%20Performance%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview|fa)

---

## ؜۱۰) امنیت و حریم خصوصی

- ؜در ویدئو جزئیات نیامده. ؜ 
- ؜پیشنهاد: ؜**signed URLs؜** برای دسترسی CDN/object و ؜**TLS 1.3؜**.

[بپرس از AI: امنیت و حریم خصوصی](https://alisol.ir/?ai=Security%20and%20Privacy%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview|fa)

---

## ؜۱۱) مشاهده‌پذیری (Observability)

- ؜در ویدئو اشاره نشده. ؜ 
- ؜پیشنهاد: ؜**SLO؜** برای ؜**startup latency؜** و ؜**rebuffer ratio؜**؛ ؜**tracing؜** مسیر play میان LB/Web/CDN/Origin.

[بپرس از AI: مشاهده‌پذیری](https://alisol.ir/?ai=Observability%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview|fa)

---

## ؜۱۲) پرسش‌های پیگیری (از مصاحبه‌گر)

- ؜«برای ؜**load balancing؜** چه رویکردی داری؟»  
- ؜«چیزی هست بخواهی اضافه کنی؟» (منجر به بحث ؜**geo-replication؜** و جمع‌بندی)

[بپرس از AI: پرسش‌های پیگیری](https://alisol.ir/?ai=Follow-up%20Questions%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview|fa)

---

## ؜۱۳) پرسش‌های کاندیدا (مدل‌سازی/مستفاد)

- ؜می‌توانیم دامنه را به ؜**search؜** و ؜**play؜** محدود کنیم؟  
- ؜انتظارات ؜**scale؜** (users/songs) چیست؟  
- ؜هدف ؜**audio quality؜** و فرمت‌ها؟  
- ؜تمرکز ؜**mobile-first؜** است؟

[بپرس از AI: پرسش‌های کاندیدا](https://alisol.ir/?ai=Candidate%20Questions%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview|fa)

---

## ؜۱۴) نکات کلیدی

- ؜ابتدا دامنه را کوچک کنید تا مسئله حل‌شدنی شود. ؜ 
- ؜؜**audio blobs؜** را از ؜**queryable metadata؜** جدا کنید. ؜ 
- ؜؜**multi-layer caching؜** (device ↔ web ↔ CDN) برای کاهش ؜**tail latency؜** و هزینه. ؜ 
- ؜؜**edge-first delivery؜** برای ؜**hot tracks؜** حیاتی است. ؜ 
- ؜؜**bandwidth-aware LB؜** از ؜**CPU-only؜** بهتر است برای بارهای استریمی. ؜ 
- ؜؜**geo-aware replication؜** ؜**RTT؜** را کم و شعاع خطا را محدود می‌کند. ؜ 
- ؜؜**مثال:؜** برای شبکه‌های موبایل، ؜**adaptive streaming؜** و تحویل سگمنت‌محور (HLS/DASH) مناسب‌تر است.

[بپرس از AI: نکات کلیدی](https://alisol.ir/?ai=Key%20Takeaways%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview|fa)

---

## ؜۱۵) واژه‌نامه

- ؜؜**CDN (Content Delivery Network):؜** شبکهٔ کش لبه برای محتوای ایستا. ؜ 
- ؜؜**Object Storage (S3):؜** ذخیره‌ساز blob بسیار پایدار. ؜ 
- ؜؜**Relational DB (RDS/MySQL):؜** دیتابیس ساختاریافته برای metadata. ؜ 
- ؜؜**Load Balancer:؜** توزیع‌کنندهٔ ترافیک ورودی. ؜ 
- ؜؜**Hot Key:؜** آبجکت با درخواست فوق‌العاده زیاد (مثلاً ریلیز تازه). ؜ 
- ؜؜**Geo-Replication:؜** استقرار replica در چند منطقه. ؜ 
- ؜؜**WebSocket:؜** اتصال دائم دوطرفه (برای audio معمولاً لازم نیست).

[بپرس از AI: واژه‌نامه](https://alisol.ir/?ai=Glossary%7CIGotAnOffer%3A%20Engineering%7CDesign%20Spotify%20%7C%20ex-Google%20EM%20%7C%20Google%20System%20Design%20Interview|fa)

---

## ؜۱۶) بازبینی تازگی محتوا

- ؜پیشنهاد WebSocket برای استریم ← در ۲۰۲۵ بهتر است ؜**HTTP range؜** یا ؜**HLS/DASH؜** استفاده شود. ؜ 
- ؜فرض MP3 با bitrate ثابت ← ؜**adaptive bitrate؜** گزینهٔ بهتر. ؜ 
- ؜انتخاب‌های S3/CloudFront/RDS ← هنوز رایج و کم‌هزینهٔ عملیاتی.

---

## ؜۱۷) نسبت‌دادن منبع

- ؜ویدئو: https://www.youtube.com/watch?v=_K-eupuDVEc  
- ؜کانال: IGotAnOffer: Engineering  
- ؜توضیح: این سند خلاصهٔ ویدئوی پیوندشده است.

---

## ؜۱۸) دربارهٔ خلاصه‌کننده

من ؜**Ali Sol؜**، ؜**PHP Developer؜**.

- ؜وب‌سایت: https://alisol.ir  
- ؜لینکدین: https://www.linkedin.com/in/alisolphp
