# ؜؜مرور طراحی سیستم: طراحی سامانه رزرو پرواز | Airline Reservation System | Distributed Transactions، Serialisation، Linearisation، Consistency

- ؜؜**کانال/مصاحبه‌کننده:؜** ؜Vinayak Sangar  
- ؜؜**مدت زمان:؜** ؜01:01:53  
- ؜؜**ویدیو:؜** ؜https://www.youtube.com/watch?v=qsGcfVGvFSs

> این سند خلاصه‌ی یک System Design Mock Interview است. ؜دیدن ویدیو برای جزییات توصیه می‌شود.

---

## ؜؜خلاصه اجرایی یک‌صفحه‌ای (۲–۳ دقیقه)

؜**صورت مسأله (یک‌خطی).؜** ساخت سامانه‌ای برای جست‌وجوی پرواز و رزرو صندلی؛ ادمین بتواند پرواز اضافه کند. ؜چالش‌های ظرفیت محدود صندلی، High Contention و اتصال به Payment باید پوشش داده شود.

؜**حوزه اصلی.؜**  
- ؜؜**داخل محدوده:؜** جست‌وجوی پرواز، رزرو صندلی، تأیید نهایی وابسته به Payment، مدل‌سازی داده‌های اصلی و بحث Concurrency/Consistency. ؜ 
- ؜؜**خارج از محدوده (اختیاری):؜** Notifications، Analytics/Ads/Discounts — قابلیت توسعه را ذکر کنید ولی در MVP پیاده‌سازی نشود.

؜**اولویت‌های غیرعملکردی.؜** پوشش جهانی، درستی تحت ترافیک همزمان، و عملکرد قابل پیش‌بینی؛ توجیه کنید «آیا اصلاً به سیستم توزیع‌شده نیاز داریم؟» بسته به Scale.

؜**اعداد/قیود کلیدی.؜** در ویدیو عدد مشخصی ذکر نشده است.

؜**معماری سطح‌بالا (متنی).؜**  
- ؜کلاینت‌ها (Search/Book) و پنل ادمین (افزودن پرواز). ؜ 
- ؜API برای کلاینت/ادمین؛ سامانه مرکزی Airline Reservation پشت آن‌ها. ؜ 
- ؜سرویس‌ها: Search، Booking، Payment، Inventory/Seat Management (+ اختیاری Notification/Analytics). ؜ 
- ؜پایگاه‌های داده: Flight Metadata، Seat/Inventory، Bookings، Payments.

؜**تریدآف‌های مهم.؜**  
- ؜؜**Consistency قوی؜** برای موجودی صندلی در برابر ؜**Availability/Latency؜**. ؜(بحث Linearisation/Serialisation)  
- ؜؜**Two-Phase Commit (2PC)؜** و Transactions توزیع‌شده در برابر پیچیدگی عملیاتی و Coupling. ؜ 
  - ؜یادداشت: در ۲۰۲۵ معمولاً ؜**Saga + Outbox؜** با عملیات Idempotent ترجیح دارد. ؜ 
- ؜؜**Monolith اول؜** یا Microservices از ابتدا—بسته به Scale واقعی.

؜**ریسک‌ها/خرابی‌های رایج.؜**  
- ؜Double-Booking زیر Concurrency. ؜ 
- ؜موفق شدن Payment ولی شکست Inventory (و بالعکس). ؜ 
- ؜Over-engineering برای اسکیلِ غیرواقعی.

؜**فلَش‌کارت مرور سریع.؜**  
- ؜؜**س:؜** چرا رزرو پرواز سخت است؟ ؜**ج:؜** ظرفیت محدود صندلی + درخواست‌های موازی + کوپل شدن با پرداخت. ؜ 
- ؜؜**س:؜** قابلیت‌های کلاینت؟ ؜**ج:؜** Search و Book. ؜؜**ادمین؟؜** افزودن پرواز. ؜ 
- ؜؜**س:؜** کی به Distributed Storage نیاز داریم؟ ؜**ج:؜** برای Scale خواندن/نوشتن، ظرفیت ذخیره‌سازی یا Availability (Read Replicas، Partitioning). ؜ 
- ؜؜**س:؜** فلو ۴مرحله‌ای رزرو؟ ؜**ج:؜** Seat Lock → ایجاد Booking → Payment → Confirm/Ticket. ؜ 
- ؜؜**س:؜** یک راه Atomicity بین سرویس‌ها؟ ؜**ج:؜** 2PC (مزایا/معایب را بدانید). ؜ 
  - ؜یادداشت: غالباً ؜**Saga/Outbox؜** عملی‌تر است. ؜ 
- ؜؜**س:؜** ایندکس کلیدی جست‌وجو؟ ؜**ج:؜** مبدا + مقصد + تاریخ.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency|fa)

---

## ؜؜برچسب‌های مصاحبه (برای فیلتر بعدی)

- ؜؜**دامنه/صنعت:؜** Travel-Booking  
- ؜؜**داده/ذخیره‌سازی:؜** RDBMS، Partitioning بر اساس تاریخ، Read Replicas، Indexing (src/dst/date). ؜ 
- ؜؜**Consistency:؜** Linearisation، Serialisation، Distributed Transactions. ؜ 
- ؜؜**معماری:؜** Monolith vs Microservices، قابلیت توسعه سرویس‌های اختیاری.

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency|fa)

---

## ؜؜الزامات عملکردی (Functional Requirements)

- ؜؜**کلاینت:؜** جست‌وجوی پرواز؛ رزرو پرواز. ؜ 
- ؜؜**ادمین:؜** افزودن پرواز (Metadata و Schedule). ؜ 
- ؜؜**نکته:؜** نهایی شدن Booking فقط بعد از موفقیت Payment؛ در غیر این صورت Seat آزاد شود. ؜ 
- ؜؜**اختیاری (تنها اشاره شود):؜** Notifications (Email/WhatsApp)، User Analytics/Discounts — معماری را قابل توسعه نگه دارید.

[Ask AI: Functional Requirements](https://alisol.ir/?ai=Functional%20Requirements%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency|fa)

---

## ؜؜الزامات غیرعملکردی (NFRs)

- ؜؜**Availability و پوشش جهانی:؜** کاربر از هرجا بتواند رزرو کند. ؜ 
- ؜؜**درستی زیر Contention:؜** جلوگیری از Double-Booking هنگام درخواست‌های موازی. ؜ 
- ؜؜**Latency:؜** جست‌وجوی سریع؛ مسیر رزرو با تأخیر محدود. ؜ 
- ؜؜**Scalability (با توجیه):؜** Partitioning/Distribution تنها وقتی لازم است اضافه شود که واقعاً به آن نیاز داریم. ؜ 
  - ؜یادداشت: «Monolith تا وقتی درد بگیرد» یک پیش‌فرض عملی است.

[Ask AI: Non-Functional Requirements](https://alisol.ir/?ai=Non-Functional%20Requirements%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency|fa)

---

## ؜؜معماری سطح‌بالا (متنی)

1. ؜؜**رابط‌ها:؜** Client API (Search/Book)، Admin API (Add/Update Flights). ؜ 
2. ؜؜**سرویس‌های هسته:؜**  
   - ؜؜**Search Service؜** (خواندن Flight Metadata با فیلترها). ؜ 
   - ؜؜**Booking Service؜** (هماهنگی Seat Lock → Payment → Confirmation). ؜ 
   - ؜؜**Inventory/Seat Manager؜** (منبع حقیقت Seat State). ؜ 
   - ؜؜**Payment Service؜** (اتصال به Gatewayها). ؜ 
   - ؜؜**Refund/Compensation Service؜** (رسیدگی به شکست‌ها). ؜ 
3. ؜؜**سرویس‌های اختیاری:؜** Notification، Analytics. ؜ 
4. ؜؜**دیتاستورها:؜**  
   - ؜؜**Flight Metadata؜** (ایندکس روی مبدا/مقصد/تاریخ؛ Partition بر اساس Departure Date). ؜ 
   - ؜؜**Booking & Seat State؜** (تراکنشی). ؜ 
   - ؜؜**Payments؜** (وضعیت، ارجاع تراکنش). ؜ 
5. ؜؜**ابزارهای Scale:؜** Read Replicas؛ در صورت نیاز Partitioning؛ Cache نتایج داغ جست‌وجو.

[Ask AI: Architecture](https://alisol.ir/?ai=Architecture%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency|fa)

---

## ؜؜مدل‌سازی داده (ضروریات)

؜**Flights؜** (Metadata): `flight_id` (PK)، `src`، `dst`، `departure_date` (کلید Partition)، `departure_time`، `duration`، `airline`، `booking_open` (+ ایندکس مرکب روی `src,dst,date`).

؜**Seat/Inventory:؜** نقشه صندلی‌های هر پرواز + وضعیت موجودی.

؜**Bookings:؜** `booking_id`، `user_id`، `flight_id`، `seats`، `status` (PENDING/CONFIRMED/CANCELED)، `payment_id`.

؜**Payments:؜** ارجاع تراکنش Gateway، وضعیت، مبلغ، ارز؛ لینک به `booking_id`.

[Ask AI: Data Modeling](https://alisol.ir/?ai=Data%20Modeling%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency|fa)

---

## ؜؜فلو جست‌وجو (Read Path)

1. ؜کاربر (src, dst, date) + فیلترها (airline، duration، بازه زمانی) را می‌فرستد؛ Backend از Composite Index استفاده می‌کند؛ خیلی از فیلترهای UI می‌توانند سمت کلاینت اعمال شوند. ؜ 
2. ؜سیستم لیست پروازهای سازگار با Snapshot قیمت/موجودی را برمی‌گرداند. ؜ 
3. ؜برای مسیر/تاریخ‌های محبوب Caching و Pagination انجام دهید. ؜ 
   - ؜یادداشت: برای تاریخ‌های نزدیک، TTL کش را کوتاه نگه دارید چون موجودی متغیر است.

[Ask AI: Search Flow](https://alisol.ir/?ai=Search%20Flow%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency|fa)

---

## ؜؜فلو رزرو (خوش‌بینانه و واقعیت‌ها)

؜**هدف:؜** قفل‌کردن صندلی(ها) و دریافت پرداخت — یا همه‌چیز Commit شود یا به‌صورت تمیز Compensate.

؜**مراحل کاننیکال:؜**  
1) Seat(s) را Reserve/Lock کنید. ؜ 
2) رکورد Booking بسازید. ؜ 
3) Payment را انجام دهید. ؜ 
4) تأیید نهایی/صدور Ticket یا Rollback/Compensation.

؜**Atomicity بین سرویس‌ها:؜** 2-Phase Commit (2PC) یک روش کلاسیک است—مزایا/معایب آن و پیچیدگی در سیستم‌های توزیع‌شده را توضیح دهید. ؜ 
- ؜یادداشت: در عمل ؜**Saga + Outbox + Idempotency؜** انعطاف‌پذیرتر است.

؜**لبه‌های پرداخت:؜** اگر Payment بعد از Seat Lock شکست خورد، Lock را آزاد کنید؛ اگر Payment موفق شد اما Confirm/Ticket شکست خورد، Refund/Compensation را فعال کنید. ؜ 
- ؜یادداشت: روی «Create Booking» و «Charge» از ؜**Idempotency Key؜** استفاده کنید تا Retryها Duplicate نشوند.

[Ask AI: Booking Flow](https://alisol.ir/?ai=Booking%20Flow%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency|fa)

---

## ؜؜Concurrency و Consistency

- ؜؜**High Contention:؜** چند کاربر ممکن است هم‌زمان یک صندلی را هدف بگیرند—برای Contention طراحی کنید. ؜ 
- ؜؜**تکنیک‌ها:؜** Lock کوتاه‌مدت، Optimistic Concurrency با Compare-and-Swap، و Idempotency برای Retryها. ؜ 
  - ؜یادداشت: برای Throughput بالاتر معمولاً Optimistic + Retry بهتر است؛ Lockها را کوچک‌دامنه و Time-Boxed نگه دارید. ؜ 
- ؜؜**مدل‌های Consistency:؜** درباره Linearisation در برابر Serialisation صریح باشید و Trade-offها را بگویید.

[Ask AI: Concurrency & Consistency](https://alisol.ir/?ai=Concurrency%20%26%20Consistency%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency|fa)

---

## ؜؜استراتژی Scale (وقتی می‌پرسند «نیاز به Distributed Systems داریم؟»)

- ؜؜**از نیاز شروع کنید:؜** اگر QPS/Storage پایین است، طراحی ساده کافی است؛ ارتقاها را فقط با نیاز توجیه کنید. ؜ 
- ؜؜**Reads:؜** برای بزرگ‌کردن Search از Read Replicas استفاده کنید. ؜ 
- ؜؜**Sharding/Partitioning:؜** پروازها را بر اساس `departure_date` پارتیشن کنید؛ مزایا/معایب و Rebalancing را توضیح دهید. ؜ 
- ؜؜**Microservices:؜** وقتی تیم‌ها/SLIها یا ویژگی‌های Scale متفاوت شدند، Split کنید؛ وگرنه Cohesive بمانید. ؜ 
  - ؜یادداشت: ؜**Async Messaging؜** بین سرویس‌ها Fan-out همزمان را محدود و Tail Latency را کاهش می‌دهد.

[Ask AI: Scale Strategy](https://alisol.ir/?ai=Scale%20Strategy%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency|fa)

---

## ؜؜رسیدگی به خطا و Compensations

- ؜؜**خرابی بخشی:؜** Payment یا Confirm ممکن است شکست بخورد—Compensation (Refund، آزادسازی صندلی) تعریف کنید. ؜ 
- ؜؜**Retryها:؜** عملیات را Idempotent کنید؛ کلیدهای Dedup ذخیره کنید. ؜ 
- ؜؜**Observability:؜** از Correlation ID بین Booking/Payment/Inventory استفاده کنید.

[Ask AI: Failure Handling](https://alisol.ir/?ai=Failure%20Handling%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency|fa)

---

## ؜؜راهنمای گفتگو با مصاحبه‌کننده (Walkthrough)

1. ؜با دیاگرام سطح‌بالا و Interfaceها شروع کنید تا همسو شوید. ؜ 
2. ؜FRها سپس NFRها را فهرست کنید (Search, Book, Payments؛ پوشش جهانی، درستی، Latency). ؜ 
3. ؜مدل داده‌ی Flights و دلیل انتخاب Index/Partition Keyها را توضیح دهید. ؜ 
4. ؜چهار گام Booking و مقداری درباره Distributed Transactions صحبت کنید. ؜ 
5. ؜با توجیه Scale تمام کنید—چه وقت ساده نگه داریم و چه وقت توزیع کنیم.

[Ask AI: Interview Walkthrough](https://alisol.ir/?ai=Interview%20Walkthrough%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency|fa)

---

### ؜؜ضمیمه: سرویس‌های اختیاری (اشاره کنید، بیش‌ازحد نسازید)

- ؜؜**Notifications:؜** Email/WhatsApp هنگام تأیید؛ حتماً Async. ؜ 
- ؜؜**User Analytics/Discounts:؜** برای مارکتینگ/UX مفید است—ولی هسته‌ی MVP نیست. ؜ 
  - ؜یادداشت: Eventها را به Queue بفرستید و Downstream پردازش کنید تا Latency رزرو زیاد نشود.

[Ask AI: Optional Services](https://alisol.ir/?ai=Optional%20Services%7CVinayak%20Sangar%7CDesign%20Flight%20Booking%20System%20%7C%20Airline%20Reservation%20System%20%7C%20Distributed%20Transactions%2C%20Serialisation%2C%20Linearisation%2C%20Consistency|fa)
