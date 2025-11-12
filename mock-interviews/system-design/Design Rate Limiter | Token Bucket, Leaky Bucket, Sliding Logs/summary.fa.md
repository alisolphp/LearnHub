# ؜طراحی Rate Limiter | Token Bucket، Leaky Bucket، Sliding Logs

- ؜؜**کانال/مصاحبه‌کننده:؜** Tech Dummies - ؜Narendra Lakshmana Gowda  
- ؜؜**مدت:؜** 00:35:55  
- ؜؜**ویدئو:؜** https://www.youtube.com/watch?v=mhUQe4BKZXs

> این سند خلاصه‌ی یک مصاحبه‌ی System Design است. ؜دیدن ویدئو کامل توصیه می‌شود.

---

## ؜خلاصه‌ی یک‌صفحه‌ای (۲–۳ دقیقه)

- ؜؜**صورت مسأله (یک خطی):؜** طراحی یک rate limiter برای محافظت از API در برابر سوءاستفاده، پشتیبانی از quotaهای رایگان/پولی، و کارکرد درست در محیط توزیع‌شده.
- ؜؜**دامنه‌ی اصلی:؜** الگوریتم‌های رایج rate limiting (‏token bucket، leaky bucket، fixed window counter، sliding logs، sliding-window counter) و رفتار آن‌ها زیر ترافیک bursty و در multi-region. ؜ 
  ؜**خارج از دامنه:؜** قراردادهای دقیق API، SLA/متریک‌های production، تنظیمات vendor‑specific.
- ؜؜**اولویت‌های غیرعملکردی:؜** اعمال سازگار، سربار latency کم، بهره‌وری حافظه، عدالت در مصرف، تاب‌آوری در برابر DDoS/brute force و کنترل هزینه.
- ؜؜**قیود و اعداد نمونه:؜** حد کاربر مثلاً ۵ درخواست/دقیقه یا ۱۰ درخواست/دقیقه؛ quota آزمایشی توسعه‌دهنده؛ محدودیت هم‌زمانی (sessionهای موازی)؛ scope براساس geo/IP.
- ؜؜**معماری سطح‌بالا (متنی):؜**
  1. ؜کلاینت‌ها → Load Balancer  
  2. ؜سرویس Rate Limiter (نقطه‌ی enforcement)  
  3. ؜ذخیره‌ساز مشترک برای counter/log (مثل Redis/Cassandra)  
  4. ؜سرورهای اپلیکیشن  
  5. ؜اختیاری: کش in‑memory محلی + sync پس‌زمینه به استور مشترک  
  6. ؜اختیاری: sticky sessions یا distributed locks برای کاهش race (با ملاحظه‌ی معایب)
- ؜؜**معادلات کلیدی:؜**
  - ؜تحمل burst در برابر هموارسازی (‏token bucket در برابر leaky bucket)  
  - ؜دقت در برابر حافظه (‏sliding logs در برابر sliding‑window counter)  
  - ؜سخت‌گیری سراسری در برابر latency/دسترس‌پذیری (‏locks در برابر محدودیتِ کمی رها)  
  - ؜سادگی در برابر سازگاری چندمنطقه‌ای
- ؜؜**ریسک‌ها/خرابی‌های رایج:؜**
  - ؜؜race بین regionها و over‑allow
  - ؜؜hot keyها که استور را تحت فشار می‌گذارند
  - ؜؜lockهای شدید و افزایش tail latency
  - ؜؜spike در مرز پنجره‌ها با fixed window (“double dip”)
  - ؜صفِ بی‌مهار در leaky bucket و فشار حافظه
- ؜؜**فلش‌کارت مرور ۵ دقیقه‌ای:؜**
  - ؜؜**سؤال:؜** چرا rate limit؟ ؜**پاسخ:؜** حفاظت از UX، امنیت (brute force) و هزینه. ؜ 
  - ؜؜**سؤال:؜** ‎token bucket در یک خط؟ ؜**پاسخ:؜** شارژ تدریجی token؛ هر درخواست یک token خرج می‌کند؛ burst تا ظرفیت سطل مجاز است. ؜ 
  - ؜؜**سؤال:؜** ‎leaky bucket در یک خط؟ ؜**پاسخ:؜** صف + نرخ تخلیه‌ی ثابت؛ burst را هموار می‌کند و در پرشدن صف drop می‌کند. ؜ 
  - ؜؜**سؤال:؜** تله‌ی fixed window؟ ؜**پاسخ:؜** امکان ~۲× درخواست نزدیک مرز پنجره. ؜ 
  - ؜؜**سؤال:؜** مزیت sliding logs؟ ؜**پاسخ:؜** دقت real‑time با ثبت timestamp درخواست‌ها. ؜ 
  - ؜؜**سؤال:؜** منفعت sliding‑window counter؟ ؜**پاسخ:؜** دقت نزدیک به logs با حافظه‌ی کمتر (تجمیع per‑bucket). ؜ 
  - ؜؜**سؤال:؜** گزینه‌های سازگاری توزیع‌شده؟ ؜**پاسخ:؜** sticky session، lock یا پذیرش خطای اندک. ؜ 
  - ؜؜**سؤال:؜** سود کش محلی؟ ؜**پاسخ:؜** کاهش round‑trip به قیمت drift کوچک.

[Ask AI: خلاصه‌ی یک‌صفحه‌ای](https://alisol.ir/?ai=Executive%20Summary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

## ؜برچسب‌های مصاحبه (برای فیلتر بعدی)

- ؜؜**الگوی محصول:؜** ‎`rate-limit`
- ؜؜**ملاحظات سیستمی:؜** ‎`throttling, backpressure, high-availability, geo-replication, hot-key`
- ؜؜**فناوری/زیرساخت (ذکرشده):؜** ‎`redis, cassandra, load-balancer`

[Ask AI: برچسب‌ها](https://alisol.ir/?ai=Interview%20Tags%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

## ؜درک مسأله

- ؜؜**صورت‌بندی (بازنویسی):؜** ساخت rate limiting برای مهار bot spikes و monetization با tierهای quota؛ پشتیبانی از محدودیت‌های مبتنی بر کاربر، هم‌زمانی، IP/مکان و سطح سرور.
- ؜؜**موارد استفاده:؜**  
  - ؜طرح رایگان توسعه‌دهنده (مثلاً ۱۰ req/min) در برابر enterprise  
  - ؜جلوگیری از brute‑force در login/promo/booking  
  - ؜مهار هزینه در سرویس‌های auto‑scaling/pay‑as‑you‑go  
  - ؜؜throttle بر پایه‌ی location/IP در کمپین‌های خاص
- ؜؜**خارج از دامنه:؜** جزئیات auth، یکپارچه‌سازی billing، داشبورد analytics.
- ؜؜**APIها:؜** در ویدئو تصریح نشده.

[Ask AI: درک مسأله](https://alisol.ir/?ai=Problem%20Understanding%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

## ؜نیازمندی‌ها و قیود

؜**بر اساس ویدئو؜**
- ؜محدودسازی بر مبنای هویت: کاربر، سقف sessionهای هم‌زمان، مبنا بر IP/لوکیشن، و scope سرویسی. ؜ 
- ؜استقرار توزیع‌شده با state مشترک → بروز race؛ sticky session و lock گزینه‌اند با معایب. ؜ 
- ؜کش محلی + sync غیرهمزمان برای کارایی بهتر با پذیرش اندکی drift.

؜**فرض‌های محافظه‌کارانه؜**
- ؜هدف سربار از زیر میلی‌ثانیه تا چند میلی‌ثانیه. ؜ 
- ؜؜quota قابل پیکربندی به تفکیک tenant/endpoint؛ در رد کردن 429 برگردانده می‌شود. ؜ 
- ؜رخدادهای observability روی allow/deny برای audit.

[Ask AI: نیازمندی‌ها و قیود](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

## ؜برآورد سرانگشتی

*در ویدئو بیان نشده — صرف‌نظر می‌شود.*

[Ask AI: برآورد](https://alisol.ir/?ai=Estimation%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

## ؜معماری سطح‌بالا

- ؜؜**ورود:؜** کلاینت‌ها → Load Balancerهای منطقه‌ای. ؜ 
- ؜؜**اعمال سیاست:؜** سرویس Rate Limiter به‌صورت منطقه‌ای check را انجام می‌دهد. ؜ 
- ؜؜**State:؜** datastore مشترک برای counter/log (نمونه‌ها: Redis یا Cassandra). ؜ 
- ؜؜**لایه‌ی اپ:؜** درخواست‌های مجاز به اپ سرورها می‌روند. ؜ 
- ؜؜**ابزارهای سازگاری اختیاری:؜** sticky session (affinity کاربر به یک region/app) یا distributed lock روی کلیدهای مشترک. ؜ 
  - ؜*sticky session* توازن و fault tolerance را کاهش می‌دهد. ؜ 
  - ؜*lock*ها به قیمت latency، رقابت را کاهش می‌دهند.
- ؜؜**مسیر کارایی اختیاری:؜** کش محلی per‑Limiter برای کلیدهای اخیر + آشتیِ پس‌زمینه با استور (قبول over‑allow اندک).

[Ask AI: معماری سطح‌بالا](https://alisol.ir/?ai=High-Level%20Architecture%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

## ؜ورود به جزئیات زیرسیستم‌ها

### ؜‎8.1 ‎Token Bucket
- ؜؜**نقش:؜** اجازه‌ی burst تا ظرفیت bucket؛ tokenها با نرخ ثابت شارژ می‌شوند؛ هر درخواست یک token مصرف می‌کند. ؜ 
- ؜؜**state به‌ازای کلید:؜** زمان آخرین refill، تعداد tokenهای موجود. ؜ 
- ؜؜**رفتار:؜** اگر token ≥ 1 → allow و کم کردن؛ وگرنه reject. ؜ 
- ؜؜**نگرانی توزیع‌شده:؜** به‌روزرسانی هم‌زمان یک کلید می‌تواند در استور مشترک race ایجاد کند.

[Ask AI: ‎Token Bucket](https://alisol.ir/?ai=Subsystem%20-%20Token%20Bucket%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

### ؜‎8.2 ‎Leaky Bucket
- ؜؜**نقش:؜** هموارسازی burst با صف FIFO و نرخ تخلیه‌ی ثابت؛ در پرشدن صف، drop. ؜ 
- ؜؜**تنظیم‌پذیری:؜** ظرفیت صف (تحمل burst) و نرخ تخلیه (سقف throughput). ؜ 
- ؜؜**ریسک:؜** صف‌های طولانی زیر spikeها موجب افزایش latency یا فشار حافظه می‌شود.

[Ask AI: ‎Leaky Bucket](https://alisol.ir/?ai=Subsystem%20-%20Leaky%20Bucket%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

### ؜‎8.3 ‎Fixed Window Counter
- ؜؜**نقش:؜** شمارش درخواست‌ها در بازه‌های ثابت (مثل هر دقیقه)؛ تا آستانه اجازه، سپس رد. ؜ 
- ؜؜**اشکال:؜** انفجار در مرز پنجره‌ها (double dip) و بی‌عدالتی مقطعی.

[Ask AI: ‎Fixed Window Counter](https://alisol.ir/?ai=Subsystem%20-%20Fixed%20Window%20Counter%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

### ؜‎8.4 ‎Sliding Logs
- ؜؜**نقش:؜** نگهداری timestamp هر درخواست؛ هنگام تصمیم‌گیری، شمارش رخدادهای داخل بازه‌ی T. ؜ 
- ؜؜**مزیت:؜** دقت real‑time. ؜ 
- ؜؜**عیب:؜** مصرف حافظه‌ی بالا (تعداد زیاد timestamp).

[Ask AI: ‎Sliding Logs](https://alisol.ir/?ai=Subsystem%20-%20Sliding%20Logs%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

### ؜‎8.5 ‎Sliding‑Window Counter
- ؜؜**نقش:؜** کاهش مصرف حافظه با تجمیع شمارنده‌ها در bucketهای کوچک (مثلاً ثانیه‌ای) داخل پنجره‌ی متحرک. ؜ 
- ؜؜**رفتار:؜** جمعِ bucketهای داخل T؛ اگر ≥ حد → drop. ؜ 
- ؜؜**منفعت:؜** دقت نزدیک به sliding logs با تعداد ورودی بسیار کمتر.

[Ask AI: ‎Sliding‑Window Counter](https://alisol.ir/?ai=Subsystem%20-%20Sliding-Window%20Counter%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

### ؜‎8.6 ‎Distributed Enforcement (Multi‑Region)
- ؜؜**مسأله:؜** کاربرِ واحد از regionهای مختلف → به‌روزرسانی‌های race روی استور مشترک → over‑allow. ؜ 
- ؜؜**گزینه‌ها:؜**  
  - ؜؜sticky session (affinity کاربر به region/app). ؜*عیب:* کاهش توازن/تاب‌آوری. ؜ 
  - ؜؜distributed lock روی هر کلید هنگام read/update. ؜*عیب:* افزایش latency و contention. ؜ 
  - ؜پذیرش اندکی خطا؛ enforcement کمی relaxed برای کارایی. ؜ 
  - ؜کش محلی + آشتی غیرهمزمان با DB مشترک.

[Ask AI: ‎Distributed Enforcement](https://alisol.ir/?ai=Subsystem%20-%20Distributed%20Enforcement%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

## ؜ملاحظات و جایگزین‌ها

| موضوع | گزینه A | گزینه B | گرایش ویدئو | دلیل (از ویدئو) |
| --- | --- | --- | --- | --- |
| هموارسازی burst | ‎Token Bucket | ‎Leaky Bucket | هر دو | Token اجازه‌ی burst کوتاه؛ Leaky هموارسازی سخت‌گیرانه. |
| پنجره‌بندی | ‎Fixed Window | ‎Sliding (logs/counter) | Sliding | اجتناب از spikeهای مرزی و عدالت بهتر. |
| سازگاری | ‎Locks | ‎Relaxed limits | ترکیبی | lockها latency می‌افزایند؛ اندکی drift قابل‌قبول است. |
| affinity | ‎Sticky Sessions | ‎Any‑region | ترکیبی | affinity از race کم می‌کند ولی توازن/Failover را می‌کاهد. |

[Ask AI: ملاحظات](https://alisol.ir/?ai=Trade-offs%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

## ؜قابلیت اطمینان، دسترس‌پذیری و کارایی

- ؜؜**سازگاری:؜** سخت‌گیری سراسری در multi‑region دشوار است؛ آشتیِ نهایی یا affinity/lockها بحث شده‌اند. ؜ 
- ؜؜**بودجه‌ی latency:؜** lock و تماس cross‑region latency می‌افزاید؛ کش محلی round‑trip را کم می‌کند. ؜ 
- ؜؜**backpressure:؜** ‏leaky bucket پردازش را یکنواخت می‌کند؛ fixed window می‌تواند spike ایجاد کند. ؜ 
- ؜؜**تخفیف فشار:؜** با خالی‌شدن bucketها یا پرشدن صف → رهاسازی بار (429) برای حفاظت از سرویس‌های هسته.

[Ask AI: قابلیت اطمینان و کارایی](https://alisol.ir/?ai=Reliability%20and%20Performance%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

## ؜امنیت و حریم خصوصی

- ؜؜**جلوگیری از سوءاستفاده:؜** مهار brute‑force (login، promo، booking). ؜ 
- ؜؜**PII/Encryption:؜** در ویدئو مطرح نشده.

[Ask AI: امنیت](https://alisol.ir/?ai=Security%20and%20Privacy%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

## ؜؜Observability

- ؜؜**Metrics/Logs/Tracing:؜** مطرح نشده. ؜(در عمل: شمارش allow/deny، latency، و کلیدهای داغ.)

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

## ؜پرسش‌های دنبالِ مصاحبه‌گر

در ویدئو نیامده.

[Ask AI: پرسش‌های دنبال](https://alisol.ir/?ai=Follow-up%20Questions%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

## ؜پرسش‌های کاندید

در ویدئو نیامده.

[Ask AI: پرسش‌های کاندید](https://alisol.ir/?ai=Candidate%20Questions%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

## ؜نکات کلیدی

- ؜انتخاب الگوریتم بر اساس نسبت ؜**burstiness ↔ هموارسازی؜**. ؜ 
- ؜؜**fixed window؜** ساده ولی در مرزها ناعادلانه؛ برای دقت بهتر ؜**sliding؜** ترجیح دارد. ؜ 
- ؜؜**sliding‑window counter؜** پیش‌فرض خوبی است: دقت کافی با مصرف حافظه‌ی کم. ؜ 
- ؜؜**enforcement توزیع‌شده؜** پیچیده است؛ یا drift اندک را بپذیرید یا هزینه‌ی lock/affinity را پرداخت کنید. ؜ 
- ؜کش محلی + sync غیرهمزمان latency را کم می‌کند ولی نیازمند بودجه‌ی خطا است. ؜ 
- ؜محدودیت‌های IP/لوکیشن و هم‌زمانی متممِ quotaهای مبتنی بر کاربرند.

[Ask AI: نکات کلیدی](https://alisol.ir/?ai=Key%20Takeaways%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

## ؜واژه‌نامه

- ؜‎؜**Token Bucket:؜** سطلِ شارژشونده؛ مصرف token برای عبور. ؜ 
- ؜‎؜**Leaky Bucket:؜** صف FIFO با تخلیه‌ی ثابت. ؜ 
- ؜‎؜**Fixed Window:؜** شمارنده با بازه‌های زمانی ثابت. ؜ 
- ؜‎؜**Sliding Logs:؜** ثبت timestamp برای شمارش real‑time. ؜ 
- ؜‎؜**Sliding‑Window Counter:؜** تجمیع per‑bucket در پنجره‌ی متحرک. ؜ 
- ؜‎؜**Sticky Sessions:؜** نگه‌داشتن کاربر روی یک instance/region. ؜ 
- ؜‎؜**Hot Key:؜** کلیدی با فعالیت نامتناسب که contention می‌سازد.

[Ask AI: واژه‌نامه](https://alisol.ir/?ai=Glossary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Rate%20Limiter%20%7C%20Token%20Bucket%2C%20Leaky%20Bucket%2C%20Sliding%20Logs%7Cfa)

---

## ؜مرور تازگی (یادداشت‌های در خط)

- ؜؜lock و sticky session به‌عنوان گزینه مطرح شده‌اند. ؜ 
- ؜؜fixed window به سادگی معرفی شده؛ در ۲۰۲۵ معمولاً sliding‑window counter ترجیح دارد. ؜ 
- ؜کش محلی + sync غیرهمزمان برای کاهش latency پیشنهاد شده؛ با بودجه‌ی خطای معقول.

---

## ؜ارجاع

- ؜؜**ویدئو:؜** https://www.youtube.com/watch?v=mhUQe4BKZXs  
- ؜؜**کانال:؜** Tech Dummies - ؜Narendra Lakshmana Gowda  
- ؜؜**توضیح:؜** این سند خلاصه‌ای از ویدئوی پیوندی است.

---

## ؜درباره‌ی خلاصه‌کننده

من *Ali Sol*، توسعه‌دهنده‌ی PHP هستم. ؜بیشتر بدانید:

- ؜وب‌سایت: https://alisol.ir  
- ؜لینکدین: https://www.linkedin.com/in/alisolphp
