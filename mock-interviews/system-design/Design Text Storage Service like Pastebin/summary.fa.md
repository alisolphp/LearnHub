# ؜خلاصه مصاحبه طراحی سیستم: طراحی سرویس ذخیره متن شبیه Pastebin

* ؜**کانال/مصاحبه‌گر؜**: System Design Fight Club  
* ؜**مدت؜**: 01:03:56  
* ؜**ویدئوی اصلی؜**: https://www.youtube.com/watch?v=9wAj-5IMdyU

> این سند خلاصه‌ی محتوای یک مصاحبهٔ طراحی سیستم است. ؜اگر فرصت دارید دیدن ویدئوی کامل توصیه می‌شود.

---

## ؜خلاصهٔ یک‌صفحه‌ای

- ؜؜**تعریف مسئله (یک‌خطی)؜**: ساخت سرویس Pastebin برای ذخیره و اشتراک متن با قابلیت upload، download و جستجوی متن.
- ؜؜**دامنهٔ اصلی؜**
  - ؜در دامنه: آپلود و بازیابی متن، ذخیره‌سازی پایدار، اشتراک لینک عمومی، جستجوی متن، متادیتا/آنالیتیکس ساده، ملاحظات مقیاس‌پذیری، بودجه‌بندی latency.
  - ؜خارج از دامنه: احراز هویت غنی، قابلیت‌های ML، فرایندهای moderation (بررسی نشد).
- ؜؜**اولویت‌های غیرعملکردی؜**: High Availability، پایداری P99، مقیاس‌پذیری افقی (تفکر «۱۰٬۰۰۰×»)، آگاهی از هزینه.
- ؜؜**قیود و اعداد کلیدی؜**: از بودجه‌بندی تقریبی latency (مثل disk seek/read و رفت‌وآمد بین DC) برای رسیدن به P99 منطقی روی مسیر دانلود استفاده می‌شود.
- ؜؜**معماری سطح‌بالا (متنی)؜**
  1. ؜؜؜**Browser؜**ها: UI آپلود و دانلود متن.
  2. ؜؜؜**Upload Service؜**: صدور presigned URL برای ؜**Object Store؜** و ثبت متادیتا.
  3. ؜؜؜**Object Store (S3)؜**: نگهداری blobهای متن.
  4. ؜؜؜**Metadata Store؜**: نگهداری شناسهٔ paste، موقعیت شیء (S3 URL)، شمارنده‌ها، uploader و …
  5. ؜؜؜**Search؜**: جستجوی متن با ؜**Elasticsearch؜** (گزینه‌های جایگزین هم مطرح شد).
  6. ؜؜؜**Download Service؜**: lookup متادیتا → redirect به Object Store برای دریافت مستقیم.
- ؜؜**تریدآف‌های مهم؜**
  - ؜معماری تک‌لایه در برابر تفکیک (Object Store + متادیتا): سادگی در برابر تنگنای پهنای‌باند روی app tier.
  - ؜نگهداری متن در ؜**Elasticsearch؜** به‌عنوان primary store در برابر فقط index: سهولت در برابر ریسک/هزینهٔ عملیاتی.
  - ؜؜**CDC؜** از ؜**Postgres؜** به ؜**Elasticsearch؜**: تازگی ایندکس در برابر پیچیدگی.
- ؜؜**ریسک‌ها/خرابی‌های رایج؜**
  - ؜hot partition/key، drift ایندکس جستجو، سوءاستفاده از presigned URL، پهنای‌باند‌خور بودن app servers.
- ؜؜**فلش‌کارت مرور ۵ دقیقه‌ای؜**
  - ؜؜**س؜**: چرا presigned URL؟ ؜**ج؜**: بیرون‌کشیدن data plane به Object Store/CDN و جلوگیری از گلوگاه پهنای‌باند در app-tier. ؜ 
  - ؜؜**س؜**: ؜**Elasticsearch؜** چه می‌دهد؟ ؜**ج؜**: ؜**Inverted index؜** برای جستجوی سریع در متن/متادیتا. ؜ 
  - ؜؜**س؜**: متن کجا ذخیره می‌شود؟ ؜**ج؜**: در Object Storage؛ دیتابیس فقط متادیتا و location را نگه می‌دارد. ؜ 
  - ؜؜**س؜**: تازگی جستجو چطور؟ ؜**ج؜**: ؜**CDC؜** از ؜**Postgres؜** به ؜**Elasticsearch؜**. ؜ 
  - ؜؜**س؜**: IDها چطور ساخته می‌شوند؟ ؜**ج؜**: ؜**Key Generation Service؜** با pre-generate و HA (اشاره به Snowflake/ZooKeeper). ؜ 
  - ؜؜**س؜**: گلوگاه‌های طراحی ساده کجاست؟ ؜**ج؜**: پهنای‌باند upload/download روی app server.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin|fa)

---

## ؜برچسب‌های مصاحبه

- ؜؜**دامنه/صنعت؜**: storage
- ؜؜**الگوی محصول؜**: object-storage، search-index، cdn، caching
- ؜؜**نگرانی‌های سیستمی؜**: high-availability، low-latency، eventual-consistency، hot-key
- ؜؜**فناوری/زیرساخت (ذکرشده)؜**: s3، postgres، dynamodb، elasticsearch، zookeeper

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin|fa)

---

## ؜فهم مسئله

- ؜؜**پرامپت اصلی؜**: پشتیبانی از چسباندن متن، دریافت کلید/URL قابل‌اشتراک، بازیابی متن با کلید، و جستجوی public pastes. ؜مقیاس‌پذیری سیستم و تعیین اهداف latency.
- ؜؜**Use Caseها؜**
  - ؜ساخت paste (public/unlisted)
  - ؜مشاهده/دانلود paste با کلید
  - ؜جستجوی متن/عنوان در public pastes
  - ؜ردیابی متادیتا (uploader، شمارش بازدید)
- ؜؜**خارج از بحث؜**: مدل auth کامل، rate limiting سطح‌بالا، moderation محتوا (پوشش داده نشد).
- ؜؜**APIها (ضمنی)؜**
  - ؜`POST /pastes` → برمی‌گرداند `{id, upload_url}` (presigned)؛ کلاینت به Object Store ؜**PUT؜** می‌کند. ؜ 
  - ؜`GET /pastes/{id}` → redirect یا signed URL برای شیء برمی‌گرداند. ؜ 
  - ؜`GET /search?q=…` → جستجوی full‑text روی ایندکس.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin|fa)

---

## ؜معماری و جریان داده

### ؜اجزا
- ؜؜**وب‌کلاینت‌ها (دو «browser»)؜** برای آپلود و دانلود.
- ؜؜**Upload Service؜** (stateless API؛ صدور presigned URL؛ نوشتن متادیتا).
- ؜؜**Download Service؜** (lookup سپس redirect).
- ؜؜**Object Store (S3)؜** برای blobها.
- ؜؜**Metadata DB؜** (Postgres یا DynamoDB؛ بحث تریدآف‌ها).
- ؜؜**Search Index (Elasticsearch)؜** از مسیر CDC.

> یادداشت: برای خوانش‌های پرطرفدار، ؜**CDN؜** جلوی Object Storage بگذارید؛ ؜**Signed URL؜** کوتاه‌عمر و ؜**Cache-Control؜** مناسب تنظیم کنید.

[Ask AI: Architecture](https://alisol.ir/?ai=Architecture%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin|fa)

---

## ؜مسیر نوشتن (Upload)

؜1. ؜کلاینت درخواست paste جدید می‌دهد. ؜ 
؜2. ؜؜**Key Generation Service؜** یک ID منحصربه‌فرد می‌دهد (pre-generate برای اجتناب از spikeهای latency؛ HA با backup؛ اشاره به Snowflake/ZK). ؜ 
؜3. ؜؜**Upload Service؜** متادیتا (ID، آدرس شیء، uploader، شمارنده‌ها) را در DB می‌نویسد. ؜ 
؜4. ؜کلاینت با ؜**presigned URL؜** به‌صورت مستقیم در ؜**S3؜** آپलोड می‌کند. ؜ 
؜5. ؜؜**CDC؜** تغییرات متادیتا را به ؜**Elasticsearch؜** استریم می‌کند تا قابل جستجو شود.

[Ask AI: Write Path](https://alisol.ir/?ai=Write%20Path%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin|fa)

---

## ؜مسیر خواندن (Download)

؜1. ؜کلاینت با paste ID به ؜**Download Service؜** می‌زند. ؜ 
؜2. ؜سرویس ؜**S3 location؜** را در DB پیدا می‌کند و با redirect/signed URL پاسخ می‌دهد. ؜ 
؜3. ؜کلاینت شیء را مستقیم از ؜**S3؜** (ترجیحاً پشت ؜**CDN؜**) می‌گیرد. ؜ 
؜4. ؜شمارنده‌ها/آنالیتیکس به‌صورت async در متادیتا به‌روزرسانی می‌شوند.

[Ask AI: Read Path](https://alisol.ir/?ai=Read%20Path%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin|fa)

---

## ؜طراحی جستجو

؜**گزینه A — «Combo Store» در Elasticsearch؜**  
- ؜ذخیرهٔ سند کامل paste مستقیماً در ؜**Elasticsearch؜** (هر paste یک رکورد؛ جستجوی متن با ؜**inverted index؜**). ؜ 
- ؜گفته شد ES می‌تواند ؜**رکوردهای بزرگ؜** (تا حدود ~200MB) را بپذیرد، ولی نگرانی‌های عملیاتی و هزینه‌ای مطرح است. ؜ 

؜**گزینه B — Metadata DB + ES Index (پیشنهادی)؜**  
- ؜؜**Postgres/DynamoDB؜** منبع حقیقت برای متادیتا؛ ؜**CDC؜** خوراک ؜**Elasticsearch؜** را برای جستجو می‌دهد. ؜ 
- ؜از hotspot پهنای‌باند روی app tier جلوگیری می‌شود؛ blobها در ؜**S3؜** می‌مانند.

؜**نکات لبه‌ای؜**  
- ؜ES را مستقیم به مرورگر expose نکنید؛ با service و auth جلو بروید. ؜ 
- ؜اگر محدودیت‌های ES دردسرساز شد، ساخت ؜**inverted index؜** سفارشی به‌عنوان تمرین ذهنی مطرح شد.

[Ask AI: Search](https://alisol.ir/?ai=Search%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin|fa)

---

## ؜مدل داده (متادیتا)

- ؜؜**Paste؜**: `{ id (PK), s3_url, title?, created_at, uploader?, view_count, visibility }`  
  - ؜تاکید شد متنِ اصلی وارد ردیف متادیتا نشود؛ فقط S3 URL و ویژگی‌ها در DB بماند.

[Ask AI: Data Model](https://alisol.ir/?ai=Data%20Model%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin|fa)

---

## ؜مقیاس‌پذیری و ظرفیت

- ؜؜**طراحی ساده/خام؜**: app servers در proxy کردن آپلود/دانلود ؜**bandwidth-bound؜** می‌شوند. ؜ 
- ؜؜**بهینه؜**: با ؜**presigned URL؜** و ؜**Object Storage؜** app را از data path خارج کنید؛ ؜**CDN؜** برای fan‑out محتوا کمک می‌کند. ؜ 
- ؜؜**تولید کلید؜**: pool نگه دارید؛ ؜**HA؜** (backup، الگوی Snowflake/ZK). ؜ 
- ؜؜**ایندکس جستجو؜**: رشد اندازه تابع حجم paste و tokenization؛ ؜**CDC؜** با هزینهٔ write آن را تازه نگه می‌دارد.

[Ask AI: Scaling](https://alisol.ir/?ai=Scaling%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin|fa)

---

## ؜بودجهٔ تأخیر (طرح P99)

- ؜مرور تقریبی P99 شامل ؜**disk seek/read؜** و رفت‌وآمدهای ؜**data center؜** برای برآورد latency ادراک‌شدهٔ کاربر در مسیر دانلود (برای بعضی اندازه‌ها جمع می‌تواند به چند ثانیه برسد). ؜ 
- ؜توصیهٔ عملی: برای pasteهای بزرگ از ؜**multipart upload؜** و ؜**range read؜** استفاده کنید؛ bucketها را نزدیک کاربر بگذارید؛ اقلام محبوب را در edge کش کنید.

[Ask AI: Latency Budget](https://alisol.ir/?ai=Latency%20Budget%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin|fa)

---

## ؜Caching، CDN و TTL

- ؜جلوی Object Storage یک ؜**CDN؜** بگذارید و ؜**Cache-Control؜** را متناسب با visibility تنظیم کنید. ؜ 
- ؜برای پاسخ‌های lookup متادیتا TTL کوتاه در نظر بگیرید تا burstهای خوانش جذب شوند؛ در delete/تغییر visibility بی‌درنگ invalidate کنید. ؜ 
- ؜نتایج ؜**Search؜** برای موارد private یا login‑دار را کش نکنید؛ برای queryهای عمومیِ پرمصرف کش کوتاه‌مدت مانعی ندارد.

[Ask AI: Caching/CDN](https://alisol.ir/?ai=Caching%20and%20CDN%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin|fa)

---

## ؜قابلیت اطمینان و مدیریت خطا

- ؜؜**Upload؜**: در صورت انقضای presigned URL مجدداً صادر کنید؛ روی callback، size/type شیء را صحت‌سنجی کنید. ؜ 
- ؜؜**Indexing؜**: هنگام lag/خرابی CDC، اجازهٔ خواندن از DB با title/ID بدهید؛ در صورت نیاز ES را از DB + objects بازسازی کنید. ؜ 
- ؜؜**Keys؜**: در خرابی primary generator، failover به backup؛ بدون collision (الگوی Snowflake/ZK).

[Ask AI: Reliability](https://alisol.ir/?ai=Reliability%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin|fa)

---

## ؜امنیت و سوءاستفاده

- ؜؜**Signed URL؜** با دامنهٔ محدود (PUT فقط برای کلید مشخص، انقضای کوتاه). ؜ 
- ؜؜**Rate limiting؜** در API و در ؜**CDN Edge؜** + کنترل محتوای پایه. ؜ 
- ؜؜**دسترسی؜**: ؜**Elasticsearch؜** را مستقیم به مرورگر ندهید.

[Ask AI: Security](https://alisol.ir/?ai=Security%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin|fa)

---

## ؜جایگزین‌ها و توسعه‌ها

- ؜نگهداری blob در ؜**ES؜** (ساده‌تر ولی پرریسک/پرهزینه در scale). ؜توصیه عملی: ES فقط برای index و نگهداری blob در ؜**Object Storage؜**. ؜ 
- ؜اگر محدودیت‌های ES جدی شد، ساخت ؜**inverted index؜** سفارشی (پیشرفته).

[Ask AI: Alternatives](https://alisol.ir/?ai=Alternatives%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin|fa)

---

## ؜پرسش‌های باز (مطرح نشده در ویدیو)

- ؜سیاست‌های authentication/visibility (private/unlisted/public). ؜ 
- ؜سیاست retention و auto‑expiry. ؜ 
- ؜استراتژی multi‑region برای write/read؛ انتخاب میان eventual vs. ؜strong consistency. ؜ 
- ؜moderation و الزامات حقوقی محتواهای عمومی.

[Ask AI: Open Questions](https://alisol.ir/?ai=Open%20Questions%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin|fa)

---

### ؜پیوست: نکات سریع از گفتگو

- ؜هاست کردن static site مستقیم از ؜**S3؜** ممکن است؛ تمرین «۱۰٬۰۰۰×» برای آشکارسازی تریدآف‌ها به‌کار می‌رود. ؜ 
- ؜برای جستجوی متن از ؜**inverted index؜** در ؜**Elasticsearch؜** استفاده شد؛ ؜**CDC؜** از ؜**Postgres؜** پیشنهاد شد. ؜ 
- ؜در انتها مرور و جمع‌بندی روی latency و دعوت به بازخورد.

[Ask AI: Appendix](https://alisol.ir/?ai=Appendix%7CSystem%20Design%20Fight%20Club%7CDesign%20Text%20Storage%20Service%20like%20Pastebin|fa)
