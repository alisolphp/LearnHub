# ؜خلاصه‌ی طراحی سیستم: «طراحی پارکینگ (Design Parking Garage)» – نسخهٔ فارسی روان

> این خلاصه محتوای یک **system design mock interview** را جمع‌بندی می‌کند. ؜دیدن ویدئوی کامل توصیه می‌شود.

---

## ؜خلاصهٔ یک‌صفحه‌ای (۲–۳ دقیقه)

- ؜**صورت مسئله (یک‌خطی)**: طراحی سیستم **reservation** و **payment** برای یک پارکینگ با نوع جایگاه‌ها (compact، regular، large)، نرخ ثابت بر اساس اندازهٔ خودرو، و امکان **reserve / pay / cancel**.
- ؜**دامنهٔ اصلی**
  - ؜**داخل دامنه**: رزرو/اختصاص جایگاه، محاسبهٔ قیمت، پرداخت از طریق **third‑party payment processor**، لغو رزرو، (اختیاری) **account/login**، **data model** ساده و معماری سطح‌بالا با تاکید بر **strong consistency**.
  - ؜**خارج از دامنه**: سخت‌افزار گیت، **LPR (license plate recognition)**، **dynamic pricing**، fraud/coupon، جزئیات داخلی payment processor.
- ؜**اولویت‌های غیرکارکردی**
  - ؜ترجیح **strong consistency** برای جلوگیری از **double‑booking** نسبت به latency خیلی پایین.
  - ؜الگوی بار **read‑heavy**؛ استفاده از **read replicas** پشت **load balancer**.
  - ؜ساده‌سازی: یک **relational DB** (Postgres/MySQL) برای این مقیاس کافی است.
- ؜**قیود و اعداد کلیدی**: اعداد دقیق QPS/latency ذکر نشده؛ مقیاس هر پارکینگ محدود (حداکثر هزاران جایگاه) و غیر «big data».
- ؜**معماری سطح‌بالا (متنی)**
  1. ؜**Web/Mobile client** ↔ **Backend service** (تک‌سرویس؛ در آینده قابل split).
  2. ؜**OLTP DB** مرکزی (ترجیح Postgres) + **read replicas**.
  3. ؜**Load balancer** برای توزیع readها.
  4. ؜**Third‑party payment** (مثلاً Stripe/Square).
  5. ؜(اختیاری) **Auth/Users** برای استفادهٔ مکرر.
- ؜**تریدآف‌های مهم**
  - ؜**Consistency** قوی (جلوگیری از double‑booking) در برابر latency کمتر.
  - ؜**DB enum** (کارایی) در برابر **varchar** (انعطاف).
  - ؜مسیرهای **read‑your‑writes**/خواندن از primary در نقاط حساس به‌جای اتکا به replica.
- ؜**ریسک‌ها/خرابی‌های رایج**
  - ؜**Race condition** در تخصیص جایگاه.
  - ؜بدطراحی نسبت read/write و در نتیجه **stale availability** در UI.
  - ؜شکافت حالت پرداخت/رزرو اگر **webhook**‌های خارجی **idempotent** نباشند.
- ؜**فلش‌کارت‌های مرور ۵ دقیقه‌ای**
  - ؜**س:** چند نوع spot داریم؟ **ج:** compact، regular، large.
  - ؜**س:** مدل قیمت؟ **ج:** flat rate بر اساس اندازه و زمان.
  - ؜**س:** اولویت: consistency یا latency؟ **ج:** consistency.
  - ؜**س:** DB هسته؟ **ج:** relational (Postgres/MySQL).
  - ؜**س:** پرداخت؟ **ج:** third‑party (Stripe/Square).
  - ؜**س:** جلوگیری از double‑booking؟ **ج:** **strong consistency** + تخصیص تراکنشی + **read‑your‑writes**.
  - ؜**س:** آیا خودروی کوچک می‌تواند large بگیرد؟ **ج:** (سیاستی) بله اگر کوچک‌ترها پر باشند.
  - ؜**س:** آیا account اجباری است؟ **ج:** اختیاری (email/password یا SSO). ؜*نکتهٔ امنیتی*: برای hashing از **bcrypt/Argon2id** استفاده کنید، نه **SHA‑256** خام.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

---

## ؜تگ‌های مصاحبه (برای فیلتر بعدی)

- ؜**Domain/Industry**: iot، payments
- ؜**Product Pattern**: reservation، payment، notification
- ؜**System Concerns**: high‑availability، strong‑consistency، geo‑replication (آینده)، throttling (مفهومی)، autoscaling (آینده)
- ؜**Infra/Tech (ذکرشده/گرایش)**: rest، mysql، postgres، load‑balancer  
  *نکتهٔ امنیتی*: password hashing با **bcrypt/Argon2id** در ۲۰۲۵ استانداردتر از **sha256** است.

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

---

## ؜فهم مسأله

- ؜**پرامپت اصلی**: «یک سیستم **reservation** و **payment** برای پارکینگ طراحی کن.»
- ؜**Use Caseها**
  - ؜رزرو جایگاه برای یک بازهٔ زمانی (آگاه از نوع خودرو).
  - ؜دیدن **free spots** برای یک پارکینگ/زمان.
  - ؜پرداخت رزرو از طریق **third‑party**.
  - ؜لغو رزرو.
  - ؜(اختیاری) ساخت **account/login** برای استفادهٔ تکراری.
- ؜**خارج از دامنه**
  - ؜سخت‌افزار gate، camera، **dynamic pricing**، دعوای پرداخت (billing dispute) جزئی.
- ؜**APIهای سطح‌بالا (مفهومی)**
  - ؜**Public**: `/reserve`، `/pay`، `/cancel`
  - ؜**Internal**: `/calculate_payment`، `/free_spots`، `/allocate_spot`
  - ؜**اختیاری**: `/create_account`، `/login`
  - ؜**مثال**: ورودی/خروجی‌ها شامل `garage_id`، `start/end time`، `vehicle_type`، `reservation_id`.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

---

## ؜نیازمندی‌ها و قیود

**طبق ویدیو**

- ؜**Functional**
  - ؜رزرو جایگاه → برگرداندن spot و `reservation_id`.
  - ؜پرداخت با `reservation_id` از طریق provider.
  - ؜لغو با `reservation_id`.
  - ؜کوئری **free spots** بر اساس `garage/time/vehicle_type`.
  - ؜(اختیاری) ساخت **account** و **login** (email/password یا SSO).
- ؜**Non‑Functional**
  - ؜**Strong consistency** برای جلوگیری از **double‑booking**.
  - ؜بار **read‑heavy**؛ **read replica + load balancing**.
  - ؜تک‌ریجن یا **location‑aware sharding** پذیرفتنی؛ مقیاس متعادل.

**فرض‌های محافظه‌کارانه**
- ؜**Reservation hold** تا قبل از پرداخت کوتاه‌مدت است؛ عملیات `/pay` و `/cancel` **idempotent** باشند.
- ؜**Rate limiting** پایه بر اساس حساب/IP.
- ؜**Flat rate** ساده به ازای اندازهٔ خودرو/هر پارکینگ (بدون promo/tax).
- ؜ذخیرهٔ پول به صورت **integer cents** یا **DECIMAL**؛ ترجیحاً integer cents.

[Ask AI: Requirements and Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

---

## ؜تقریب‌های کاغذی (Back‑of‑the‑Envelope)

- ؜اعداد دقیق در ویدیو نیامده؛ از این بخش عبور می‌کنیم.

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

---

## ؜معماری سطح‌بالا

- ؜**Clients**: Web/Mobile app
- ؜**Backend**: یک سرویس (بعداً می‌توان **reservation** و **slot allocation** را جدا کرد).
- ؜**DB**: Postgres یا MySQL؛ یک **primary** + چند **read replica**.
- ؜**LB**: **Load balancer** برای read traffic؛ امکان **locality‑aware routing** (مثلاً بر اساس zipcode).
- ؜**Payments**: ادغام با Stripe/Square؛ **idempotency** و **state transition**‌ها تحت مالکیت backend.
- ؜**Consistency**: اولویت **strong**؛ برای مسیر **allocate→confirm** از **primary read** یا **session consistency** استفاده کنید؛ **transaction/advisory lock** فراموش نشود.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

---

## ؜بررسی عمیق زیرسیستم‌ها

### ؜۱) Reservation Service
- ؜**وظیفه**: **validate** (garage/time/vehicle_type)، اختصاص spot، ساخت **reservation**، بازگشت `reservation_id` و spot.
- ؜**Data Model** نمونه:
  - ؜`reservations(id, garage_id, spot_id, start_time, end_time, paid)`
  - ؜`spots(id, garage_id, vehicle_type, status)`
  - ؜`garages(id, zipcode, compact_rate, regular_rate, large_rate)`
  - ؜(اختیاری) `users`، `vehicles`
- ؜**Consistency**: قوی؛ **allocation** باید **transactional** باشد تا assignment تکراری رخ ندهد.
- ؜**Scaling**: خواندن **availability** از replicas؛ تخصیص/نوشتن‌ها به primary.
- ؜**Failures**: اگر پرداخت fail شد، با **timeout/cron** جایگاه آزاد شود.
- ؜**قفل‌ها**: **row lock** یا **advisory lock** بر کلید `(garage_id, time_bucket, vehicle_type)` حین تخصیص توصیه می‌شود.

[Ask AI: Subsystem - ؜Reservation](https://alisol.ir/?ai=Subsystem%20-%20Reservation%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

### ؜۲) Payment Integration
- ؜**وظیفه**: محاسبهٔ مبلغ، ساخت **payment intent** با provider، **confirm/settle**، به‌روزرسانی `paid`.
- ؜**APIها**: داخلی `/calculate_payment(reservation_id)`؛ عمومی `/pay(reservation_id)`.
- ؜**Idempotency**: **webhook**ها و retryها باید idempotent باشند.
- ؜**Storage**: نگهداری **payment attempt/receipt** برای audit.

[Ask AI: Subsystem - ؜Payment](https://alisol.ir/?ai=Subsystem%20-%20Payment%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

### ؜۳) Availability/Discovery
- ؜**وظیفه**: `/free_spots(garage_id, time, vehicle_type)`؛ محاسبهٔ ظرفیت آزاد؛ سیاست **fit‑down** (compact→regular→large در صورت نیاز).
- ؜**Caching**: **short‑TTL cache** برای بازه‌های پرترافیک هر پارکینگ جهت UX سریع؛ ولی در تخصیص از staleness جلوگیری کنید (خواندن از primary در مسیر حساس).

[Ask AI: Subsystem - ؜Availability](https://alisol.ir/?ai=Subsystem%20-%20Availability%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

### ؜۴) Accounts & Auth (اختیاری)
- ؜**وظیفه**: ذخیرهٔ user، (اختیاری) vehicle، **login**.
- ؜**Password Storage**: به‌جای **SHA‑256** خام، از **bcrypt/Argon2id** استفاده کنید (salt و cost قابل تنظیم).

[Ask AI: Subsystem - ؜Accounts](https://alisol.ir/?ai=Subsystem%20-%20Accounts%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

---

## ؜تریدآف‌ها و جایگزین‌ها

| ؜موضوع | ؜گزینهٔ A | ؜گزینهٔ B | ؜گرایش | ؜دلیل |
| ؜--- ؜| ؜--- ؜| ؜--- ؜| ؜--- ؜| ؜--- ؜|
| ؜Consistency | ؜**Strong** (خواندن از primary در مسیرهای حساس) | ؜**Eventual** (سریع‌تر، خطر staleness) | ؜Strong | ؜جلوگیری از double‑booking |
| ؜DB Type | ؜**Relational (Postgres/MySQL)** | ؜**NoSQL** | ؜Relational | ؜اسکیما و تراکنش ساده‌تر |
| ؜Spot Type | ؜**ENUM** | ؜**VARCHAR** + validation | ؜تمایل به ENUM | ؜کارایی در برابر انعطاف |
| ؜Read‑after‑Write | ؜**Session consistency/primary read** | ؜اتکا به replica | ؜A | ؜دقت UI در مسیر allocate→confirm |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

---

## ؜قابلیت اطمینان، دسترس‌پذیری، کارایی

- ؜**Replication**: primary + read replicas؛ امکان **locality‑aware routing** بر اساس zipcode.
- ؜**Backpressure**: **rate‑limit** روی تلاش‌های رزرو؛ کاهش کاندیداها در فشار.
- ؜**Graceful Degradation**: اگر provider پرداخت down بود، **reservation hold** بگذارید و کاربر را مطلع کنید.
- ؜**DR**: بحث نشده؛ خط مبنا single‑region.

[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

---

## ؜امنیت و حریم خصوصی

- ؜**AuthN/Z**: حساب اختیاری با email/password یا SSO.
- ؜**PII**: ایمیل، (اختیاری) نام، پلاک؛ حداقلی ذخیره کنید.
- ؜**Secrets**: کلیدهای پرداخت را از کد جدا و منظم rotate کنید.
- ؜**Password Hashing**: **Argon2id** (ترجیحی) یا **bcrypt**؛ از **SHA‑256** خام استفاده نکنید.

[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

---

## ؜Observability

- ؜صراحتاً پوشش داده نشده؛ اما **metrics**‌هایی مانند `reservations/sec`، **allocation failure**، **payment error**، و **tracing** دور مسیر **allocate→pay→confirm** منطقی است.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

---

## ؜سوالات Follow‑up (از مصاحبه‌گر)

- ؜تریدآف‌های **strong vs. ؜eventual consistency** برای این دامنه.
- ؜امکان **shard** کردن بر اساس location و اثر آن روی locking.
- ؜نقطهٔ مناسب جداسازی سرویس‌ها (reservation vs. ؜slot allocation).

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

---

## ؜سوالات پیشنهادی (از سمت کاندیدا)

- ؜آیا **up‑sizing** (خودروی کوچک در spot بزرگ‌تر) مجاز است و چه زمانی؟
- ؜**reservation hold timeout** تا پرداخت چقدر است؟
- ؜آیا **partial refund** یا **grace period** برای cancel داریم؟
- ؜آیا SLA خاصی در اوج رویدادها (کنسرت/بازی) لازم است؟

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

---

## ؜نکات کلیدی

- ؜برای **جلوگیری از double‑booking**، **consistency** را به latency ترجیح دهید.
- ؜یک **relational DB** با **row/advisory locks** و **read replicas** برای این مقیاس کافی است.
- ؜**allocation** را **transactional** نگه دارید؛ در مسیر **allocate→confirm** از **primary read** یا **session consistency** استفاده کنید.
- ؜**Third‑party payments**، **PCI scope** را ساده می‌کند؛ **webhook**‌ها **idempotent** باشند.
- ؜پول را درست مدل کنید؛ از **floating‑point** اجتناب کنید.
- ؜برای **password hashing** از **bcrypt/Argon2id** بهره ببرید.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

---

## ؜Glossary

- ؜**Strong Consistency**: خواندن‌ها وضعیت آخرین نوشتن‌ها را بازتاب می‌دهند.
- ؜**Read Replica**: دیتابیس follower که فقط read را سرو می‌کند.
- ؜**Advisory Lock**: قفل سطح اپ برای هماهنگی دسترسی.
- ؜**Idempotency**: اجرای تکراری همان درخواست، نتیجهٔ یکسان می‌دهد.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

---

## ؜برنامهٔ مطالعه (اختیاری)

- ؜تمرین طراحی **OLTP**‌های کوچک و consistent (tickets/reservations).
- ؜پیاده‌سازی **allocation** با **transaction/lock** در یک پروژهٔ نمونه Postgres.
- ؜افزودن **idempotent payment flow** با یک **mock payment provider**.

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CExponent%7CAmazon%20System%20Design%20Interview%3A%20Design%20Parking%20Garage%20%28Design%20Vending%20Machine%29|fa)

---

## ؜Attribution

- ؜**منبع ویدیو**: https://www.youtube.com/watch?v=NtMvNh0WFVM
- ؜**کانال**: Exponent
- ؜**توضیح**: این سند، خلاصه‌ای از محتوای ویدیو است.

---

## ؜دربارهٔ خلاصه‌کننده

من **Ali Sol**، یک PHP Developer هستم. ؜ 
- ؜وب‌سایت: https://alisol.ir  
- ؜LinkedIn: https://www.linkedin.com/in/alisolphp
