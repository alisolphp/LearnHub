# ؜طراحی سیستم (مصاحبه‌ی ماک): Notification Service

> این متن، خلاصه‌ی یک مصاحبه‌ی ماک طراحی سیستم است. ؜اگر فرصت دارید، دیدن ویدیو کامل توصیه می‌شود.

- ؜؜**عنوان مصاحبه:؜** طراحی Notification Service برای مقیاس میلیاردی (Billions of users & Notifications)  
- ؜؜**کانال/مصاحبه‌گر:؜** codeKarle  
- ؜؜**مدت زمان:؜** ۲۰:۱۴  
- ؜؜**ویدئو:؜** `https://www.youtube.com/watch?v=CUwt9_l0DOg`

---

## ؜۱) خلاصه‌ی یک‌صفحه‌ای (۲–۳ دقیقه)

- ؜؜**مسئله‌ی اصلی (یک‌خطی):؜** طراحی یک Notification Service مقیاس‌پذیر برای چند محصول، با پشتیبانی چند کاناله (SMS، Email و قابلیت افزودن سریع کانال‌هایی مثل in-app/WhatsApp).
- ؜؜**دامنه‌ی اصلی:؜** ارسال اعلان‌ها، اولویت‌بندی (OTP/Transactional/Promotional)، Rate limiting (در سطح Client و User)، ترجیحات کاربر/Unsubscribe، ارسال توسط Channel Handlerها، Tracking/Audit، و Bulk Notification با Query Engine روی داده‌های تراکنشی.
- ؜؜**اولویت‌های غیرفرابندی:؜** High availability (SaaS)، Scalability، نسبت‌دهی چند-مشتری (Multi-tenancy) و مدیریت Spikeها.
- ؜؜**معماری در یک نگاه:؜** ورودی → Validator/Prioritizer → صف/Topicهای با اولویت متفاوت (Kafka) → Rate Limiter (Redis) → Handlerها (SMS/Email/…) + Preferences/User Service → Tracker (ثبت برای Audit) → برای Bulk، UI/Service + Parser + Query Engine.

؜**معاملات کلیدی:؜**  
؜Latency در برابر Throughput (با اولویت‌ها)، Throttling سخت در برابر تجربه‌ی مشتری (Drop یا Queue)، سادگی استقرار در برابر ریزسرویس‌ها، افزایش Topicها در برابر پیچیدگی عملیاتی.

؜**ریسک‌ها:؜** Hot key روی OTP، کانفیگ نادرست نرخ، Backpressure روی کانال‌های کند (مثل SMS)، و خلاهای Audit در صورت خطای Tracker.

؜**فلش‌کارت مرور سریع (سؤال→پاسخ):؜**  
- ؜چرا Topicهای جدا بر اساس اولویت؟ برای جلوگیری از Lag روی جریان‌های حیاتی (OTP). ؜ 
- ؜؜Rate limiting در دو سطح؟ Client-level quota و User-level cap. ؜ 
- ؜مقصدهای کاربر از کجا می‌آیند؟ User Service بر اساس User ID. ؜ 
- ؜؜Tracker چه نگه می‌دارد؟ لاگ ارسال‌ها برای Audit/Compliance. ؜ 
- ؜انتخاب مخاطب در Bulk؟ از طریق Query Engine روی داده‌های تراکنشی Parse شده. ؜ 
- ؜افزودن WhatsApp؟ با یک Handler و Topic جدید؛ بقیه‌ی Pipeline دست‌نخورده می‌ماند.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications|fa)

---

## ؜۲) تگ‌ها و کلیدواژه‌های مصاحبه

- ؜؜**دامنه/صنعت:؜** Messaging، Ecommerce (مثال‌ها)، SaaS Platform. ؜ 
- ؜؜**الگوی محصول:؜** Notification، Rate limit، Pub/Sub (Kafka)، کمپین‌های Bulk. ؜ 
- ؜؜**نگرانی‌های سیستمی:؜** High availability، Throttling/Backpressure، Multi-tenancy attribution. ؜ 
- ؜؜**فناوری‌های ذکرشده:؜** Kafka، Redis (Rate limits)، Elasticsearch/Mongo (Query)، Cassandra (Tracker).

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications|fa)

---

## ؜۳) درک مسئله

- ؜؜**Prompt (بازنویسی):؜** ساخت پلتفرم اعلان مقیاس‌پذیر و پلاگ‌ابل برای مشتریان متعدد با پشتیبانی چند کاناله، اعمال اولویت و Rate limit، و قابلیت Audit.
- ؜؜**Use caseها:؜** OTP Login، وضعیت سفارش، Promotional messageها، و Bulk campaign (مثل یادآوری نصب بعد از خرید).
- ؜؜**APIها:؜** در ویدیو به‌صورت رسمی تعریف نشده‌اند.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications|fa)

---

## ؜۴) نیازمندی‌ها و قیود

### ؜عملکردی
- ؜ارسال چندکاناله و پلاگ‌ابل بودن Handlerها (مثلاً افزودن WhatsApp). ؜ 
- ؜اولویت‌بندی: OTP > Transactional > Promotional با صف/Topicهای مجزا. ؜ 
- ؜؜Rate limiting در سطح Client و User؛ ثبت شمارنده‌ها برای Billing/Report. ؜ 
- ؜ترجیحات کاربر/Unsubscribe و Lookup مقصد از User Service. ؜ 
- ؜ذخیره‌ی رویدادهای ارسال در Tracker برای Audit.

### ؜غیرفرابندی
- ؜؜High availability (SaaS)، Scalability، نسبت‌دهی اجزا به Tenant، تحمل Spikeهای نامتقارن.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications|fa)

---

## ؜۵) تخمین سرانگشتی
در ویدیو وارد اعداد/بودجه‌ی دقیق (QPS/Latency/Storage) نشده است.

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CcodeKarle%7CNotification%20Service%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications|fa)

---

## ؜۶) طراحی سطح‌بالا

؜**مسیر اولویت‌دار:؜**  
۱) ؜Client → Notification Service → Validator/Prioritizer → Kafka Topicهای High/Med/Low. ؜ 
۲) ؜Consumerها ابتدا High را می‌خورند؛ Rate limiter (Redis) سقف‌ها را enforce می‌کند؛ نقض‌ها Drop می‌شوند. ؜ 
۳) ؜Handler با Preferences + User Service مشورت و Payload کانال را می‌سازد. ؜ 
۴) برای هر کانال یک صف/Topic جدا تا کندی یک کانال دیگران را بلاک نکند. ؜ 
۵) ؜Tracker رکورد «Sent» را برای Audit می‌نویسد.

؜**مسیر Bulk/Segmentation:؜**  
؜UI → Bulk Notification Service → Transaction Parser → Query Engine (روی ES/Mongo-like) → Audience → Notification Service.

[Ask AI: High-Level Design](https://alisol.ir/?ai=High-Level%20Design%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications|fa)

---

## ؜۷) مدل داده

- ؜؜**Tracker Store:؜** نوشتنِ Append-heavy از رویدادهای ارسال؛ خواندن کم. ؜ 
- ؜؜**Audience Store (برای Bulk):؜** داده‌های تراکنشی Parse‌شده در ES/Mongo-like؛ کوئری با DSL.

[Ask AI: Data Model](https://alisol.ir/?ai=Data%20Model%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications|fa)

---

## ؜۸) طراحی API
در ویدیو شکل Request/Response مشخص نشده است.

[Ask AI: API Design](https://alisol.ir/?ai=API%20Design%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications|fa)

---

## ؜۹) قابلیت اطمینان، دسترس‌پذیری و کارایی

- ؜جداسازی بر اساس Priority برای جلوگیری از Lag روی OTP. ؜ 
- ؜؜Backpressure غالباً در Channel Handlerها و Providerهای بیرونی؛ صف‌ها برای جذب Spike. ؜ 
- ؜؜Load shedding: Drop درخواست‌هایی که از Threshold عبور می‌کنند. ؜ 
- ؜شکل استقرار بر اساس Throughput می‌تواند ادغام شود (Monolith-ish) یا جدا (Micro-components).

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications|fa)

---

## ؜۱۰) امنیت و حریم خصوصی
؜AuthN/AuthZ، مدیریت PII و جلوگیری از Abuse در ویدیو بحث نشده است.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications|fa)

---

## ؜۱۱) مشاهده‌پذیری (Observability)
؜Metrics/Logging/Tracing/SLOها پوشش داده نشده‌اند.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications|fa)

---

## ؜۱۲) پرسش‌های پیگیری مصاحبه‌گر
ذکر نشده است.

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications|fa)

---

## ؜۱۳) پرسش‌های کاندید (اگر مدل شود)
ذکر نشده است.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications|fa)

---

## ؜۱۴) نکات کلیدی

- ؜به Notification به‌عنوان ؜**Platform/SaaS؜** نگاه کنید با Quota/Cap برای هر Tenant. ؜ 
- ؜؜**اولویت‌بندی؜** OTP/Transactional بر Promotional با Topic/Consumer جدا. ؜ 
- ؜؜**Rate limit؜** در Client/User و ؜**Counting؜** برای Billing/Reporting. ؜ 
- ؜؜Handlerها ؜**Pluggable؜** باشند (افزودن WhatsApp با حداقل تغییر). ؜ 
- ؜؜**Audit trail؜** را در Store مناسبِ Append-heavy نگهداری کنید.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications|fa)

---

## ؜۱۵) واژه‌نامه

- ؜؜**OTP:؜** One-Time Password؛ حساس‌ترین به زمان. ؜ 
- ؜؜**Kafka:؜** لاگ توزیع‌شده برای Fan-out، Priority Queue و Buffering. ؜ 
- ؜؜**Rate Limiter (Redis):؜** اعمال سقف بر اساس پنجره‌ی زمانی در سطح Client/User. ؜ 
- ؜؜**Notification Tracker:؜** ثبت ارسال‌ها برای Audit/Compliance. ؜ 
- ؜؜**Query Engine (Bulk):؜** انتخاب Audience با DSL روی داده‌های تراکنشی Parse‌شده.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications|fa)

---

## ؜۱۶) برنامه‌ی مطالعه (پیشنهادی)

- ؜مسیر ؜**Priority + Rate limit؜** را در <۳ دقیقه رسم کنید. ؜ 
- ؜یک سناریوی ؜**Bulk segmentation؜** را انتها به انتها تمرین کنید (Parser → Store → Query → Send). ؜ 
- ؜یک افزودنی ؜**Pluggability؜** (مثلاً WhatsApp) را Mock کنید و حداقل تغییرات را بگویید.

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications|fa)

---

## ؜۱۷) ارجاع

- ؜؜**ویدیو:؜** `https://www.youtube.com/watch?v=CUwt9_l0DOg`  
- ؜؜**کانال:؜** `codeKarle`  
- ؜؜**توضیح:؜** این متن خلاصه‌ای از ویدیو است.

[Ask AI: Attribution](https://alisol.ir/?ai=Attribution%7CcodeKarle%7CNotification%20Service%20System%20Design%20Interview%20Question%20to%20handle%20Billions%20of%20users%20%26%20Notifications|fa)

---

## ۱۸) درباره‌ی خلاصه‌کننده

من **Ali Sol** هستم، یک PHP Developer.
بیشتر بدانید:
- وب‌سایت: [alisol.ir](https://alisol.ir)
- لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
