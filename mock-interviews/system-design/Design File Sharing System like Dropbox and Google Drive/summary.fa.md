# ؜طراحی سیستم فایل‌شیرینگ شبیه Dropbox و Google Drive

لینک رسمی: https://www.youtube.com/watch?v=4_qu1F9BXow  
کانال / مصاحبه‌گر: IGotAnOffer: Engineering  
مهمان: «Alex، Senior Developer و Engineering Manager؛ بیش از ۱۰ سال در Shopify کار کرده»  
مدت زمان ویدیو: ؜**۴۸:۴۱؜**

---

## ؜خلاصهٔ اجرایی یک‌صفحه‌ای (۲–۳ دقیقه)

؜**مسئله (یک‌خطی).؜** طراحی سرویس فایل‌شیرینگ و همگام‌سازی شبیه Dropbox/iCloud/Google Drive: آپلود/دانلود فایل، Sync بین دستگاه‌ها و ؜Notifications برای تغییرات.

؜**دامنهٔ اصلی.؜**
- ؜عملیات اصلی: آپلود/دانلود، Multi-device Sync، ؜Change Notifications، ذخیرهٔ متادیتا، دسترسی مستقیم به Object Storage، استفاده از ؜CDN.
- ؜اشاره شده ولی عمیق پوشش داده نشده: جزئیات راه‌اندازی دیتابیس، ؜Client-side Encryption، ؜S3 Versioning/Backups.

؜**غیرفنّی‌های کلیدی.؜**
- ؜یکپارچگی قوی متادیتا → دیتابیس رابطه‌ای.
- ؜Latency پایین برای ؜API؛ جابه‌جایی بایت‌های حجیم خارج از سرورهای API با ؜direct-to-storage.
- ؜بهبود تجربهٔ منطقه‌ای با ؜CDN.

؜**معماری در یک نگاه.؜**
- ؜کلاینت‌ها برای Auth و متادیتا به ؜APIها وصل می‌شوند؛ انتقال فایل‌های بزرگ مستقیم به ؜Object Storage (مثل S3) انجام می‌شود (presigned URL).
- ؜متادیتا در ؜RDS (MySQL/Postgres) ذخیره می‌شود.
- ؜؜CDN جلوی Storage برای خواندن سریع‌تر/کم‌هزینه‌تر.
- ؜Replica برای خواندن و ؜Failover (ترجیح اصطلاح ؜Primary/Replica).

؜**تبادل‌ها (Trade-offs).؜**
- ؜رابطه‌ای vs NoSQL برای متادیتا → رابطه‌ای به‌خاطر Consistency و آشنایی تیم.
- ؜throughput ؜API vs مسیر داده → API سبک؛ بایت‌ها مستقیم به Storage.
- ؜؜CDN به‌جای multi-DC برای بهبود خواندنِ جهانی با پیچیدگی کمتر.

؜**ریسک‌های بزرگ.؜**
- ؜خرابی Primary DB → Replica و ؜Automated Failover.
- ؜نشت داده → ؜Client-side Encryption / ؜Envelope Encryption با ؜KMS.
- ؜هزینهٔ Versioning/Backups → ؜Lifecycle Policy برای مدیریت هزینه.

[پرسش از هوش مصنوعی: خلاصهٔ اجرایی](https://alisol.ir/?ai=Executive%20Summary%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive|fa)

---

## ؜برچسب‌های مصاحبه

؜**حوزه/صنعت.؜** ذخیره‌سازی، همکاری (collaboration)  
؜**الگوی محصول.؜** Object Storage، ؜CDN، Caching، Queue (برای notifications)  
؜**ملاحظات سیستمی.؜** ؜High-availability، Latency پایین، بهبود منطقه‌ای با CDN، حریم خصوصی  
؜**فناوری‌های نام‌برده.؜** S3، CDN، MySQL/Postgres، RDS

[پرسش از هوش مصنوعی: برچسب‌ها](https://alisol.ir/?ai=Interview%20Tags%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive|fa)

---

## ؜درک مسئله

؜**پرامپت اصلی.؜** ساخت سرویس شبیه Dropbox/iCloud/Google Drive: آپلود/دانلود، Sync بین دستگاه‌ها، و اعلان تغییرات.

؜**موارد استفاده.؜**
- ؜آپلود فایل → ذخیرهٔ بایت‌ها در Object Storage + ثبت متادیتا.
- ؜دانلود فایل (اغلب از طریق ؜CDN).
- ؜همگام‌سازی بین دستگاه‌های کاربر + دریافت ؜Notifications تغییر.
- ؜اختیاری: ؜Restore نسخه‌های قبلی/Backups (feature لایهٔ پولی).

؜**خارج از دامنه.؜** جزئیات عمیق دیتابیس/کلاینت؛ فقط هستهٔ جریان‌ها.

؜**؜APIها.؜** فقط در سطح بالا اشاره شده؛ جزییات request/response مشخص نشده (Login/Metadata معمول).

[پرسش از هوش مصنوعی: درک مسئله](https://alisol.ir/?ai=Problem%20Understanding%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive|fa)

---

## ؜نیازمندی‌ها و قیود

؜**عملکردی.؜**
- ؜آپلود/دانلود فایل.
- ؜Sync بین دستگاه‌ها + اعلان تغییرات.
- ؜ذخیرهٔ متادیتا (نام، مالک، نسخه‌ها و ...).

؜**غیرعملکردی.؜**
- ؜Consistency قوی برای متادیتا با DB رابطه‌ای.
- ؜Latency پایین برای API؛ انتقال حجیم مستقیم به Storage.
- ؜بهبود سرعت خواندن با ؜CDN.

؜**فرض‌ها.؜**
- ؜استفاده از ؜Presigned URL (TTL کوتاه، محدود به method/object) برای دسترسی امن کلاینت↔Storage.

[پرسش از هوش مصنوعی: نیازمندی‌ها و قیود](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive|fa)

---

## ؜معماری کلان

- ؜؜**کلاینت‌ها؜** برای Auth/Metadata به API وصل می‌شوند؛ انتقال طولانیِ فایل از مسیر مستقیم ؜client→storage انجام می‌شود.
- ؜؜**Object Storage (مثل S3)؜** محل ذخیرهٔ بایت‌ها؛ آپلود/دانلود مستقیم.
- ؜؜**CDN؜** جلوی Storage برای کاهش RTT و بار اوریجین.
- ؜؜**Metadata DB؜** روی ؜RDS (MySQL/Postgres) برای Consistency و سادگی عملیاتی.
- ؜؜**Replicas؜** برای read-scaling و ؜Failover (ترجیح اصطلاح Primary/Replica).
- ؜؜**امنیت؜**: ؜Client-side Encryption / ؜Envelope + ؜KMS؛ ؜Multipart/Resumable Upload برای فایل‌های بزرگ.

[پرسش از هوش مصنوعی: معماری کلان](https://alisol.ir/?ai=High-Level%20Architecture%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive|fa)

---

## ؜بررسی عمیق زیرسامانه‌ها

### ؜Storage & CDN
؜**نقش.؜** ذخیره و سروینگ بایت‌ها؛ شتاب‌دهی خواندن منطقه‌ای. ؜ 
؜**جریان.؜** آپلود/دانلود مستقیم به Storage؛ ؜CDN کش می‌کند تا Latency/Cost پایین بیاید. ؜ 
؜**نکات.؜** تنظیم ؜Cache-Control/ETag، ؜Signed URL در Edge برای Share امن؛ نسخه‌بندی/Backup به‌عنوان فیچر.

[پرسش از هوش مصنوعی: Storage & CDN](https://alisol.ir/?ai=Storage%20%26%20CDN%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive|fa)

### ؜Metadata Service / Database
؜**نقش.؜** نگهداری کاربران/فایل‌ها/مالکیت/نسخه‌ها و رابطه‌ها. ؜ 
؜**تکنولوژی.؜** ؜RDS (MySQL/Postgres) برای Consistency و آشنایی تیم. ؜ 
؜**مقیاس‌پذیری.؜** Replica برای خواندن و ؜Failover؛ ایندکس‌های مرکب (owner_id, path/name, version)، ACL سطوح ردیف.

[پرسش از هوش مصنوعی: Metadata Service](https://alisol.ir/?ai=Metadata%20Service%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive|fa)

### ؜Sync & Notifications
؜**نقش.؜** تازه نگه‌داشتن دستگاه‌ها؛ اعلان تغییرات. ؜ 
؜**یادداشت.؜** در عمل از ؜Pub/Sub + ؜Push Notifications و کانال ؜WebSocket/Long-poll با backoff و dedupe استفاده کنید.

[پرسش از هوش مصنوعی: Sync & Notifications](https://alisol.ir/?ai=Sync%20%26%20Notifications%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive|fa)

---

## ؜نکات مدل داده

- ؜جدول Files: نام، نوع، owner_id (ارجاع به users) و ...
- ؜جدول File_Versions: id، file_id، version_number و متادیتای نسخه.

[پرسش از هوش مصنوعی: مدل داده](https://alisol.ir/?ai=Data%20Model%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive|fa)

---

## ؜بازبینی با نگاهِ ۲۰۲۵

- ؜اصطلاح «Slave/Read Replicas» → بهتر است ؜Primary/Replica + ؜Managed Failover. ؜ 
- ؜Versioning/Backups رایگان نیست؛ ؜Lifecycle Rule برای کنترل هزینه. ؜ 
- ؜؜Client-side/Envelope Encryption + ؜KMS؛ چرخش کلید و per-object keys. ؜ 
- ؜؜Presigned URL با TTL کوتاه + محدودیت طول محتوا و least-privilege.

[پرسش از هوش مصنوعی: بازبینی به‌روز](https://alisol.ir/?ai=Freshness%20Review%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive|fa)

---

## ؜ریسک‌ها و راهکارها

- ؜خرابی Primary DB → Replica + ؜Failover. ؜ 
- ؜نشت/سرقت داده → ؜Client-side Encryption. ؜ 
- ؜Latency منطقه‌ای → ؜CDN و کاهش ؜cross-region RTT.

[پرسش از هوش مصنوعی: ریسک‌ها](https://alisol.ir/?ai=Risks%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive|fa)

---

## ؜اعتبارها و یادداشت‌ها

- ؜ویدیو از IGotAnOffer: Engineering با حضور Alex (سابقهٔ Shopify). ؜ 
- ؜این خلاصه بر محتوای ویدیو تکیه دارد؛ موارد نامشخص به‌صورت «فرض» یا «ذکر نشده» مشخص شده‌اند.

[پرسش از هوش مصنوعی: اعتبارها](https://alisol.ir/?ai=Credits%7CIGotAnOffer%3A%20Engineering%7CDesign%20File%20Sharing%20System%20like%20Dropbox%20and%20Google%20Drive|fa)
