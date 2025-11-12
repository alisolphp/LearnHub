# ؜طراحی سیستم: Content Delivery Network | CDN

- ؜؜**کانال/مصاحبه‌گر:؜** Gaurav Sen  
- ؜؜**مدت زمان:؜** ۰۰:۱۱:۰۱  
- ؜؜**ویدیو:؜** `https://www.youtube.com/watch?v=8zX0rue2Hic`

> این سند خلاصه‌ای از یک مصاحبهٔ System Design است. ؜پیشنهاد می‌کنم ویدیوی کامل را ببینید.

---

## ؜۲) خلاصهٔ یک‌صفحه‌ای (برای مرور ۲–۳ دقیقه‌ای)

- ؜؜**صورت مسئله (یک‌خطی):؜** چطور محتوای static (مثل HTML) را با کمترین latency به کاربران کشورهای مختلف برسانیم؛ با تکیه بر caching و یک CDN.
- ؜؜**دامنهٔ اصلی:؜** تحویل محتوای static، کش توزیع‌شدهٔ جغرافیایی، و کاهش latency. ؜خارج از دامنه: writeهای داینامیک و طراحی دیتابیس؛ origin تنها منبع حقیقت است.
- ؜؜**الویت‌های غیرعملکردی:؜** latency پایین به‌کمک edgeهای نزدیک؛ availability با حذف Single Point of Failure؛ هزینهٔ کمتر به‌کمک زیرساخت مشترک؛ سادگی در invalidation از طریق ابزارهای provider.
- ؜؜**قیود و عددها:؜** مناطق اشاره‌شده: India، USA، Europe/Netherlands؛ نسخه‌های متفاوت صفحه بر اساس device و کشور؛ مقداردهی عددی صریح برای QPS/latency گفته نشده.
- ؜؜**معماری سطح‌بالا (متنی):؜**
  - ؜کاربر (mobile/desktop) درخواست صفحه می‌دهد.
  - ؜درخواستِ assetهای static ابتدا به لایهٔ cache سراسری (CDN/edge) می‌خورد.
  - ؜اگر cache hit بود همان‌جا پاسخ داده می‌شود؛ در غیر اینصورت به origin می‌رود.
  - ؜؜origin برای دادهٔ داینامیک به Database مراجعه می‌کند؛ CDN فقط کپی نگه می‌دارد نه منبع حقیقت.
  - ؜؜cacheها جغرافیامحور و قابل sharding هستند.
  - ؜تنظیم TTL و invalidation از طریق UI/کنترل‌پلن provider.
- ؜؜**تبادل‌ها (Trade‑offs)‌ی کلیدی:؜**
  - ؜؜**؜Latency در برابر Consistency:؜** سرعت edge در برابر تازگی محتوا؛ با TTL/Invalidation مدیریت می‌شود.
  - ؜؜**؜Build در برابر Buy:؜** ساخت cache توزیع‌شدهٔ اختصاصی در برابر استفاده از CDN provider با footprint جهانی و الزامات تطبیق‌پذیری.
  - ؜؜**پوشش در برابر هزینه:؜** PoPهای بیشتر → latency کمتر اما هزینه/پیچیدگی بالاتر.
- ؜؜**ریسک‌ها/خرابی‌های رایج:؜**
  - ؜؜SPOF در cache یا گلوگاه شدن یک نود → توزیع و sharding.
  - ؜؜invalidation اشتباه و محتوای stale.
  - ؜دور بودن کاربر از origin در نبود edge مناسب.

؜**فلش‌کارت مرور سریع:؜**  
- **چرا CDN؟؜** برای کاهش latency با سرو از edge نزدیک. ؜ 
- **چه چیزی در origin می‌ماند؟؜** منبع حقیقت برای دادهٔ داینامیک. ؜ 
- **جلوگیری از SPOF؟؜** توزیع افقی و sharding. ؜ 
- **به‌روزرسانی محتوا؟؜** نسخه‌گذاری فایل‌ها + TTL/Invalidation. ؜ 
- ؜**نسخهٔ device/location؟؜** بله، و قابل cache شدن است. ؜ 
- **مثالِ Provider:؜** Akamai (و مشابه‌ها). ؜ 
- ؜**S3؟؜** برای hosting فایل‌ها خوب است، اما برای قابلیت‌های CDN بهتر است جلوی آن CDN (مثل CloudFront) قرار بگیرد.

[Ask AI: خلاصهٔ یک‌صفحه‌ای](https://alisol.ir/?ai=Executive%20Summary%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN|fa)

---

## ؜۳) تگ‌های مصاحبه (برای فیلتر بعدی)

- ؜؜**دامنه/صنعت:؜** `ecommerce`  
- ؜؜**الگوی محصول:؜** `cdn, caching, object-storage`  
- ؜؜**نگرانی‌های سیستمی:؜** `low-latency, geo-replication, high-availability, gdpr`  
- ؜؜**زیرساخت/فناوری‌های اشاره‌شده:؜** `cdn, edge, s3`  
  - ؜نکته: برای edge واقعی و کنترل cache، CDN را جلوی S3 قرار دهید.

[Ask AI: تگ‌ها](https://alisol.ir/?ai=Interview%20Tags%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN|fa)

---

## ؜۴) درک مسئله

- ؜؜**صورت مسئله (بازبیان):؜** سرو HTMLهای static برای کاربران India/USA/Netherlands با کمترین latency، با پشتیبانی از نسخه‌های مبتنی بر device/location و نگه‌داشتن origin به‌عنوان source of truth. ؜ 
- ؜؜**؜Use Caseها:؜**
  - ؜نسخهٔ desktop/mobile. ؜ 
  - ؜محتوای بومی‌شده (مثلاً براساس کشور/ایالت).
- ؜؜**خارج از دامنه:؜** طراحی schema دیتابیس، مسیر write، و منطق کامل اپ.
- ؜؜**؜APIها:؜** در ویدیو مشخص نشده.

[Ask AI: درک مسئله](https://alisol.ir/?ai=Problem%20Understanding%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN|fa)

---

## ؜۵) نیازمندی‌ها و قیود

؜**ذکرشده در ویدیو؜**
- ؜؜**عملکردی:؜**  
  - ؜؜cache و سرو محتوای static نزدیک کاربر؛ محتوای داینامیک از مسیر origin. ؜ 
  - ؜پشتیبانی از نسخه‌های device/location.
- ؜؜**غیرعملکردی:؜**  
  - ؜؜**؜Latency:؜** کاهش با caches نزدیک به کاربر. ؜ 
  - ؜؜**؜Availability:؜** حذف SPOF در cache. ؜ 
  - ؜؜**؜Operability:؜** TTL و invalidation از UI provider. ؜ 
  - ؜؜**؜Compliance:؜** پوشش قوانین منطقه‌ای توسط provider.

؜**فرض‌ها (محافظه‌کارانه):؜**
- ؜؜static شامل HTML/CSS/JS/Image؛ داینامیک پشت app servers. ؜ 
- ؜؜geo‑routing مبتنی بر DNS به نزدیک‌ترین PoP (فرض مرسوم).

[Ask AI: نیازمندی‌ها](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN|fa)

---

## ؜۶) برآورد تقریبی

- ؜در ویدیو عدد مشخصی ارائه نشده.

[Ask AI: برآورد](https://alisol.ir/?ai=Estimation%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN|fa)

---

## ؜۷) معماری سطح‌بالا

- ؜؜**؜Clients:؜** Desktop و Mobile. ؜ 
- ؜؜**؜Edge/CDN:؜** cacheهای توزیع‌شدهٔ جغرافیایی؛ سرو مستقیم در صورت cache hit. ؜ 
- ؜؜**؜Origin/App Server:؜** پاسخ به missها و کل مسیر داینامیک؛ منبع حقیقت. ؜ 
- ؜؜**؜Database:؜** نگه‌داری دادهٔ کاربر/جلسه و…  
- ؜؜**؜Control Plane:؜** کنترل TTL/Invalidation از طریق UI (مثلاً سبک Akamai). ؜ 
- ؜؜**؜Sharding:؜** تفکیک ترافیک به cacheهای منطقه‌ای.

[Ask AI: معماری](https://alisol.ir/?ai=High-Level%20Architecture%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN|fa)

---

## ؜۸) موشکافی زیرسیستم‌ها

### ؜۸٫۱) CDN / Edge Cache

- ؜؜**نقش:؜** سرو محتوای static از نزدیک‌ترین edge؛ کاهش round‑trip به origin. ؜ 
- ؜؜**مدل داده:؜** آبجکت‌های cache فقط replica هستند؛ origin منبع حقیقت. ؜ 
- ؜؜**مقیاس‌پذیری/پارتیشن:؜** توزیع افقی؛ sharding بر مبنای جغرافیا/کاربر. ؜ 
- ؜؜**استراتژی Cache:؜** TTL‑based expiry + invalidation/versioning هنگام تغییر محتوا. ؜ 
  - ؜؜**مثال:؜** استفاده از Cache‑Control/ETag و URLهای نسخه‌دار برای assetها. ؜ 
- ؜؜**تاب‌آوری:؜** حذف SPOF با چندین نود/منطقه؛ fallback به origin در miss/error. ؜ 
- ؜؜**هزینه:؜** providerهای CDN معمولاً ارزان‌تر از ساخت شبکهٔ اختصاصی سراسری تمام می‌شوند.

[Ask AI: زیرسیستم CDN](https://alisol.ir/?ai=Subsystem%20-%20CDN%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN|fa)

---

## ؜۹) تبادل‌ها و بدیل‌ها

| موضوع | گزینه A | گزینه B | گرایش ویدیو | منطق |
| --- | --- | --- | --- | --- |
| Edge Delivery | ساخت cache توزیع‌شدهٔ اختصاصی | استفاده از CDN provider | استفاده از provider | footprint جهانی، UI برای TTL، انطباق، اپراتوری ساده‌تر |
| به‌روزرسانی محتوا | TTL طولانی (ریسک staleness) | TTL کوتاه + invalidation صریح | TTL + Invalidation | موازنهٔ تازگی و latency |
| موقعیت Origin | origin تک‌منطقه‌ای (مثلاً US) | originهای منطقه‌ای/PoP | تکیه بر edge | origin منبع حقیقت؛ edge برای سرعت |

[Ask AI: Trade‑offs](https://alisol.ir/?ai=Trade-offs%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN|fa)

---

## ؜۱۰) قابلیت اطمینان، دسترس‌پذیری و کارایی

- ؜؜**؜Replication/Consistency:؜** cache فقط replica؛ origin منبع حقیقت. ؜ 
- ؜؜**؜Latency:؜** کاهش با edge نزدیک (برای India/US/Europe). ؜ 
- ؜؜**؜Degradation Path:؜** در invalidate/expiry یا miss، دریافت از origin.

[Ask AI: قابلیت اطمینان](https://alisol.ir/?ai=Reliability%20and%20Performance%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN|fa)

---

## ؜۱۱) امنیت و حریم خصوصی

- ؜در ویدیو توضیحی داده نشده.

[Ask AI: امنیت](https://alisol.ir/?ai=Security%20and%20Privacy%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN|fa)

---

## ؜۱۲) Observability

- ؜در ویدیو توضیحی داده نشده.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN|fa)

---

## ؜۱۳) سوالات Follow‑up

- ؜در ویدیو مشخص نشده.

[Ask AI: Follow‑ups](https://alisol.ir/?ai=Follow-up%20Questions%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN|fa)

---

## ؜۱۴) سوالات کاندید

- ؜در ویدیو مشخص نشده.

[Ask AI: سوالات کاندید](https://alisol.ir/?ai=Candidate%20Questions%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN|fa)

---

## ؜۱۵) نکات کلیدی

- ؜محتوا را به edge هل بدهید؛ origin منبع حقیقت برای دادهٔ داینامیک. ؜ 
- ؜از SPOF در cache جلوگیری کنید؛ توزیع و sharding. ؜ 
- ؜؜TTL/Invalidation را از UI provider مدیریت کنید. ؜ 
- ؜نسخه‌های مبتنی بر device/location قابل cache شدن‌اند. ؜ 
- ؜؜S3 برای hosting خوب است؛ برای CDN واقعی یک لایهٔ CDN جلوی آن قرار دهید.

[Ask AI: نکات کلیدی](https://alisol.ir/?ai=Key%20Takeaways%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN|fa)

---

## ؜۱۶) Glossary

- ؜؜**؜CDN (Content Delivery Network):؜** شبکهٔ cache توزیع‌شده که محتوا را از نزدیک‌ترین نقطه سرو می‌کند. ؜ 
- ؜؜**؜TTL (Time To Live):؜** مدت نگه‌داری آیتم در cache پیش از انقضا. ؜ 
- ؜؜**؜Origin:؜** سرور مرجع/منبع حقیقت. ؜ 
- ؜؜**؜PoP (Point of Presence):؜** موقعیت/نقطهٔ سرو برای یک منطقه.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN|fa)

---

## ؜۱۷) برنامهٔ مطالعه بر پایهٔ این مصاحبه (اختیاری)

- ؜تمرین توضیح مسئولیت‌های origin در برابر edge و سازوکار invalidation. ؜ 
- ؜تمرین رسم دیاگرام‌های shardینگ ناحیه‌ای و مسیرهای failover.

[Ask AI: برنامهٔ مطالعه](https://alisol.ir/?ai=Study%20Plan%7CGaurav%20Sen%7CDesign%20Content%20Delivery%20Network%20%7C%20CDN|fa)

---

## ؜۱۸) استناد

- ؜؜**ویدیو:؜** `https://www.youtube.com/watch?v=8zX0rue2Hic`  
- ؜؜**کانال:؜** Gaurav Sen  
- ؜؜**یادداشت:؜** این سند خلاصهٔ ویدیوی فوق است.

---

## ؜۱۹) دربارهٔ تهیه‌کننده

- ؜من *Ali Sol* هستم، PHP Developer. ؜ 
- ؜وب‌سایت: [alisol.ir](https://www.alisol.ir)  
- ؜لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
