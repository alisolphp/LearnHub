# ؜طراحی سیستم پرداخت آنلاین (خلاصه مصاحبهٔ System Design)
کانال/مصاحبه‌گر: High-Performance Programming  
مدت: ؜**۳۱:۴۰؜**  
ویدئو: https://www.youtube.com/watch?v=olfaBgJrUBI

> این سند خلاصهٔ یک مصاحبهٔ ساختگی طراحی سیستم است. ؜تماشای کامل ویدئو توصیه می‌شود.

---

## ؜خلاصهٔ یک‌صفحه‌ای
؜**مسئله (یک‌خطی):؜**
طراحی یک سیستم پرداخت آنلاین با ؜**دسترس‌پذیری بالا؜**، ؜**قابلیت اتکا؜** و ؜**مقیاس‌پذیری؜** که با یک ؜**PSP؜** برای پردازش کارت هماهنگ می‌شود.

؜**دامنهٔ اصلی؜**
- ؜در دامنه: یکپارچه‌سازی با ؜**PSP؜**، هماهنگ‌سازی پرداخت، به‌روزرسانی ؜**Wallet/Ledger؜**، تصمیم‌گیری ؜**async؜** در برابر ؜**sync؜**، الگوهای پایداری (retry، timeout، circuit breaker)، ؜**idempotency؜**، مدیریت ؜**poison pill؜** و ؜**DLQ؜**، امنیت پایه (encryption, TLS)، مقیاس‌پذیری توزیعی.
- ؜خارج از دامنه: اتصال مستقیم به card networks، جزئیات fraud، settlement/chargeback، KYC/AML، آشتی چند-Region، جزئیات برنامهٔ ؜**PCI؜**.

؜**اولویت‌های غیرکارکردی؜**
دسترس‌پذیری، درستی، دوام و تاب‌آوری مهم‌تر از latency هستند (به جز سناریوهای ؜**POS؜** که auth فوری می‌خواهند). ؜ظرفیت‌سازی برای spikeها و backpressure مهم است.

؜**قیود و اعداد کلیدی؜**
در ویدئو عدد مشخصی ذکر نشده است.

؜**معماری سطح‌بالا (متنی)؜**
- ؜کاربر سفارش می‌دهد ← ؜**Payment Service؜** (هماهنگ‌کننده) event را ثبت می‌کند.
؜- ؜Payment Service به ؜**PSP؜** برای authorize/capture فراخوان می‌دهد.
- ؜در موفقیت ← ؜**Wallet؜** (بالانس تاجر) به‌روزرسانی و در ؜**Ledger؜** (append-only) ثبت می‌شود.
- ؜برای جدا کردن وابستگی‌ها، buffer کردن و fan-out از پیام/stream (مثل ؜**Kafka؜**) استفاده می‌شود.
- ؜؜**DLQ؜** برای پیام‌های غیرقابل‌پردازش؛ ؜**idempotency key؜** برای جلوگیری از دوباره‌کاری.
- ؜؜**Observability؜** و ؜**reconciliation؜** روی eventهای پایدارشده.

؜**مبادله‌های اصلی؜**
- ؜؜**sync؜** (سادگی UX) در برابر ؜**async؜** (تاب‌آوری و هموارسازی spike).
؜- ؜idempotency در برابر پیچیدگی «exactly-once».
- ؜سخت‌گیری fraud در برابر ؜**degradation؜** با fallback.
- ؜دیتابیس مرکزی ساده در برابر مقیاس توزیع‌شده و ظرافت‌های consistency.
- ؜سادگی عملیاتی در برابر دوام و بازپخش ؜**Kafka-like؜**.

؜**ریسک‌ها/خرابی‌های رایج؜**
؜Partition/timeout شبکه، outage در ؜**PSP؜**، شارژ تکراری بدون idempotency، از‌دست‌دادن پیام بدون queue پایدار، ناهماهنگی wallet/ledger بدون reconciliation، طوفان retry بدون jitter.

؜**فلش‌کارت مرور ۵ دقیقه‌ای؜**
- ؜پرسش: چرا برای پرداخت‌ها ؜**async؜** را ترجیح می‌دهیم؟ پاسخ: جداکردن سرویس‌ها، تحمل spike/خرابی و buffer با queueهای پایدار.
- ؜پرسش: چه‌وقت ؜**sync؜** اجباری است؟ پاسخ: ؜**POS/real-time auth؜** که پاسخ فوری لازم است.
- ؜پرسش: چطور از double charge جلوگیری کنیم؟ پاسخ: ؜**Idempotency-Key؜** با قید ؜**UNIQUE؜** ذخیره شود؛ در تکرار همان نتیجه برگردانده شود. ؜(اثر «exactly-once» روی تحویل ؜**at-least-once؜**؛ پایین‌دست هم dedupe کنید.)
- ؜پرسش: ؜**poison pill؜** چیست؟ پاسخ: پیام غیرقابل‌پردازش → انتقال به ؜**DLQ؜** برای بررسی.
- ؜پرسش: سیاست retry خوب؟ پاسخ: ؜**exponential backoff + jitter؜**، سقف تلاش، رعایت timeout.
- ؜پرسش: هدف ؜**Ledger؜**؟ پاسخ: لاگ تغییرناپذیر برای ؜**reconciliation؜**، حسابداری درآمد و audit.
- ؜پرسش: تفاوت ؜**Wallet؜** و ؜**Ledger؜**؟ پاسخ: Wallet بالانس جاری؛ Ledger رویدادهای منبع حقیقت.
- ؜پرسش: ابهام timeout؟ پاسخ: کلاینت failure می‌بیند اما بک‌اند شاید موفق شده باشد—به ؜**idempotent retry؜** + ؜**reconciliation؜** تکیه کنید.
- ؜پرسش: ؜**circuit breaker؜** چه‌کار می‌کند؟ پاسخ: ؜**fail fast؜** بعد از خطاهای پی‌درپی upstream.
- ؜پرسش: اصول امنیت؟ پاسخ: ؜**encryption at rest/in transit؜**، ؜**TLS؜**، کنترل دسترسی، پچ‌ها و backup. ؜(در ۲۰۲۵ ؜**TLS 1.3؜** پیشنهاد می‌شود.)

[بپرس از AI: خلاصهٔ یک‌صفحه‌ای](https://alisol.ir/?ai=Executive%20Summary%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

---

## ؜برچسب‌های مصاحبه
؜**دامنه/صنعت:؜** fintech، payments، ecommerce  
؜**الگوی محصول:؜** queue، job-scheduler، notification  
؜**نگرانی‌های سیستمی:؜** high-availability، backpressure، throttling، autoscaling، privacy، gdpr، eventual-consistency  
؜**فناوری/زیرساخت:؜** microservices، REST، Kafka، Postgres/MySQL (relational)، TLS، HTTPS

نکته: Kafka همچنان مناسب است؛ در صورت نگرانی عملیاتی، سرویس‌های مدیریت‌شده را در نظر بگیرید.

[بپرس از AI: برچسب‌ها](https://alisol.ir/?ai=Interview%20Tags%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

---

## ؜فهم مسئله
؜**پرومپت اصلی:؜**  
پیاده‌سازی سیستم پرداخت برای فروشگاه آنلاین که کاربر را به صفحهٔ پرداخت میزبانی‌شده توسط ؜**PSP؜** می‌فرستد، نتیجه را پردازش می‌کند، ؜**wallet؜** تاجر را به‌روزرسانی و در ؜**ledger؜** ثبت می‌کند.

؜**موارد استفاده؜**
- ؜پرداخت سفارش کاربر → authorize/capture از طریق ؜**PSP؜**.
- ؜مدیریت spikeها، خطاهای گذرا و outage طرف ثالث.
- ؜جلوگیری از تکرار در retry یا دوباره‌ارسال کاربر.
- ؜پس‌ازپرداخت: به‌روزرسانی wallet و ثبت در ledger؛ ارائهٔ وضعیت تراکنش به تاجر/مشتری.

؜**خارج از دامنه؜**
اتصال مستقیم به بانک/شبکهٔ کارت (نادر و پرهزینهٔ compliance)، نگهداری دادهٔ خام کارت (به ؜**PSP؜** سپرده می‌شود).

؜؜**APIها (در حد اشاره)؜**
- ؜فراخوان ؜**PSP؜** شامل مبلغ/ارز؛ کلاینت هدر ؜**Idempotency-Key؜** (UUID) می‌فرستد.
- ؜شکل دقیق request/response مشخص نشده است.

[بپرس از AI: فهم مسئله](https://alisol.ir/?ai=Problem%20Understanding%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

---

## ؜نیازمندی‌ها و قیود
### ؜آنچه در ویدئو آمده
- ؜؜**کارکردی:؜** ساخت event پرداخت؛ فراخوان ؜**PSP؜**؛ به‌روزرسانی ؜**wallet/ledger؜**؛ گزارش وضعیت؛ ؜**reconciliation؜**؛ ؜**DLQ؜** برای پیام‌های معیوب.
- ؜؜**غیرکارکردی:؜** دسترس‌پذیری بالا؛ درستی؛ تاب‌آوری در خطای جزئی؛ مقیاس‌پذیری؛ جداسازی خطا؛ پیام‌رسانی پایدار؛ رفتار قابل‌پیش‌بینی زیر بار.
- ؜؜**سازگاری/همگرایی:؜** wallet و ledger باید از مسیر eventهای ذخیره‌شده و فرایند reconciliation همگرا شوند.

### ؜فرض‌های محافظه‌کارانه
؜- ؜UX «نرم real-time» برای وب؛ ؜**real-time؜** سخت فقط در ؜**POS؜**.
- ؜شروع با تک‌Region؛ تکثیر ؜**multi-AZ؜** برای دوام.
- ؜ذخیره‌سازی relational برای wallet/ledger با ؜**UNIQUE؜** برای idempotency.

[بپرس از AI: نیازمندی‌ها و قیود](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

---

## ؜برآورد سرانگشتی
در ویدئو اعدادی ارائه نشده—از این بخش عبور می‌کنیم.

[بپرس از AI: برآورد](https://alisol.ir/?ai=Estimation%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

---

## ؜معماری سطح‌بالا
- ؜؜**Client (Web/Mobile)؜** → ؜**Checkout؜** → فرم پرداخت میزبانی‌شدهٔ ؜**PSP؜** (کمک به ؜**PCI/GDPR؜**).
- ؜؜**Payment Service (Coordinator):؜** ثبت event؛ فراخوان ؜**PSP؜**؛ تفسیر status؛ انتشار رویداد.
- ؜؜**Async Backbone (Kafka یا مشابه):؜** دوام رویدادها برای retry، fan-out و buffer spike.
- ؜؜**Wallet Service:؜** به‌روزرسانی بالانس تاجر (state).
- ؜؜**Ledger Service:؜** ثبت تغییرناپذیر رویدادهای مالی برای audit/analytics.
- ؜؜**DLQ:؜** قرنطینهٔ پیام‌های غیرقابل‌پردازش.
- ؜؜**Reconciliation Jobs:؜** کشف و ترمیم اختلاف‌های wallet/ledger/PSP.
- ؜؜**Observability:؜** متریک/لاگ/Tracing پیرامون فراخوان‌های ؜**PSP؜**، retry و نرخ ؜**DLQ؜**.

[بپرس از AI: معماری سطح‌بالا](https://alisol.ir/?ai=High-Level%20Architecture%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

---

## ؜موشکافی زیرسیستم‌ها

### ؜۸.۱ Payment Service (Coordinator)
- ؜نقش: ارکستراسیون پرداخت؛ ثبت event اولیه؛ فراخوان ؜**PSP؜**؛ انتشار outcome.
- ؜مدل داده: `payments(idempotency_key UNIQUE, order_id, amount, currency, status, psp_reference, created_at, updated_at)`
؜- ؜APIها: دریافت هدر ؜**Idempotency-Key؜**؛ فراخوان ؜**PSP؜** با amount/currency.
- ؜مقیاس‌پذیری: workerهای stateless پشت LB؛ مقیاس افقی؛ backpressure از مسیر queue.
- ؜مدیریت خطا: timeout؛ ؜**exponential backoff + jitter؜**؛ ؜**circuit breaker؜** به PSP؛ نوشتن‌های idempotent.
- ؜سازگاری: نوشتن به ledger/wallet از مسیر event برای دوام و امکان retry.
- ؜نکته: در ابهام timeout، حالت unknown در نظر بگیرید و به idempotent retry + reconciliation تکیه کنید.

[بپرس از AI: Payment Service](https://alisol.ir/?ai=Subsystem%20-%20Payment%20Service%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

### ؜۸.۲ Wallet Service
- ؜نقش: نگهداری بالانس تاجر؛ اعمال credit روی پرداخت‌های موفق.
- ؜مدل داده: `wallets(merchant_id PK, balance)` + `wallet_adjustments(id, payment_id, delta, created_at)`
- ؜سازگاری: منبع حقیقت ؜**ledger؜** است؛ wallet نمای مادی‌شده؛ در اختلاف، reconcile.
- ؜گلوگاه‌ها: تاجرهای داغ؛ shard بر اساس `merchant_id` و به‌روزرسانی‌های batch.

[بپرس از AI: Wallet Service](https://alisol.ir/?ai=Subsystem%20-%20Wallet%20Service%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

### ؜۸.۳ Ledger Service
- ؜نقش: ثبت تغییرناپذیر رویدادهای مالی.
- ؜مدل داده: `ledger_entries(id, payment_id, type, amount, currency, status, at)` با ایندکس روی `payment_id`/`at`.
- ؜مقیاس‌پذیری: پارتیشن‌بندی بر اساس زمان یا `payment_id`؛ پرهیز از update درجا؛ پشتیبانی از queryهای audit.

[بپرس از AI: Ledger Service](https://alisol.ir/?ai=Subsystem%20-%20Ledger%20Service%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

### ؜۸.۴ Messaging & DLQ
- ؜نقش: pub/sub پایدار برای eventها؛ صف‌های retry؛ ؜**DLQ؜** برای پیام‌های معیوب.
- ؜نکات: ؜**ack؜** فقط بعد از موفقیت؛ ؜**consumer group؜**؛ مانیتور lag و نرخ ؜**DLQ؜**.

[بپرس از AI: Messaging & DLQ](https://alisol.ir/?ai=Subsystem%20-%20Messaging%20%26%20DLQ%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

### ؜۸.۵ الگوهای تاب‌آوری
؜- ؜Retry: ؜**exponential backoff + jitter؜**؛ سقف تلاش؛ endpointهای idempotent.
؜- ؜Timeout: تنظیم معقول؛ پرهیز از انتظار بی‌نهایت؛ در ابهام outcome.
؜- ؜Circuit Breaker: پس از خطاهای پی‌درپی ؜**fail fast؜**؛ امکان fallback (مثلاً اجازهٔ مبالغ کوچک) یا لغو.

[بپرس از AI: الگوهای تاب‌آوری](https://alisol.ir/?ai=Subsystem%20-%20Resilience%20Patterns%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

---

## ؜دادوستدها و جایگزین‌ها

| موضوع | گزینه A | گزینه B | گرایش ویدئو | توجیه |
|------|----------|----------|-------------|--------|
| UI پرداخت کاربر | فرم میزبانی‌شدهٔ ؜**PSP؜** | فرم داخلی (نگهداری PAN) | PSP-hosted | کاهش ریسک ؜**PCI/GDPR؜** |
| هماهنگ‌سازی | ؜**Sync؜** | ؜**Async؜** با queue | Async | جداسازی خرابی و buffer |
| پیام‌رسانی | ؜**Kafka-like log؜** | صف درحافظه | Kafka-like | دوام و replay |
| outage در fraud | توقف همهٔ پرداخت‌ها | fallback برای مبالغ کوچک | fallback مجاز | تعادل ریسک/درآمد |
| منبع حقیقت | ؜**Wallet balance؜** | ؜**Ledger events؜** | Ledger | auditability و reconciliation |

[بپرس از AI: دادوستدها](https://alisol.ir/?ai=Trade-offs%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

---

## ؜قابلیت اطمینان، دسترس‌پذیری و کارایی
- ؜تکثیر/افزونگی: چند نمونهٔ سرویس؛ replicaهای DB؛ تکثیر پیام.
؜- ؜Backpressure و Throttling: buffer صف؛ ؜**autoscaling؜** مصرف‌کننده؛ محدودکردن فراخوان‌های هم‌زمان به ؜**PSP؜**.
؜- ؜Load Shedding: ؜**circuit breaker؜** + ؜**graceful degradation؜** (مثلاً عبور از چک‌های غیرحیاتی).
- ؜بازیابی: jobهای ؜**reconciliation؜** برای ترمیم ناهماهنگی پس از incident.

[بپرس از AI: قابلیت اطمینان و کارایی](https://alisol.ir/?ai=Reliability%20and%20Performance%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

---

## ؜امنیت و حریم خصوصی
- ؜؜**Data at rest:؜** رمزنگاری دیسک/DB.
- ؜؜**In transit:؜** VPN داخلی، ؜**TLS؜** برای ترافیک عمومی، ؜**HTTPS؜** برای کلاینت. ؜(در ۲۰۲۵ ؜**TLS 1.3؜** پیشنهاد می‌شود.)
- ؜؜**Access Control:؜** حداقل‌سازی دسترسی؛ 2FA/MFA برای اپراتورها.
- ؜؜**Patching:؜** به‌روزرسانی OS/کتابخانه‌ها؛ رفع سریع CVEها.
- ؜؜**Backups:؜** منظم، رمزگذاری‌شده و تست بازیابی.
- ؜؜**Passwords:؜** طولانی و یکتا؛ کاهش ریسک rainbow-table. ؜(ترجیح ؜**Argon2id؜** یا ؜**bcrypt؜**.)

[بپرس از AI: امنیت و حریم خصوصی](https://alisol.ir/?ai=Security%20and%20Privacy%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

---

## ؜؜Observability
- ؜؜**Metrics:؜** latency/موفقیت ؜**PSP؜**، شمار retry، نرخ ؜**DLQ؜**، lag مصرف‌کننده، اختلاف wallet/ledger.
- ؜؜**Logs/Tracing:؜** همبستگی با `payment_id`/`idempotency_key`؛ ردیابی round-trip ؜**PSP؜**.
- ؜؜**SLO/Alerts:؜** بودجهٔ خطا برای فراخوان‌های ؜**PSP؜**؛ هشدار روی جهش ؜**DLQ؜** و backlog reconciliation.

[بپرس از AI: Observability](https://alisol.ir/?ai=Observability%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

---

## ؜پرسش‌های پیگیری (از مصاحبه‌گر)
- ؜چه‌زمانی بر ؜**authorization؜** همزمان اصرار دارید؟
- ؜در outage ؜**PSP؜** طی حراج‌های بزرگ چه می‌کنید؟
- ؜راهبرد ؜**reconciliation؜** در اختلاف wallet و ledger چیست؟
- ؜تضمین ؜**idempotency؜** در چند سرویس چگونه است؟

[بپرس از AI: پرسش‌های پیگیری](https://alisol.ir/?ai=Follow-up%20Questions%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

---

## ؜پرسش‌های کاندید
- ؜کدام ؜**PSP؜**‌ها و Regionها در دامنه‌اند؟ آیا ؜**failover PSP؜** داریم؟
- ؜؜**SLO؜** هدف برای auth latency و نرخ موفقیت چیست؟
- ؜الزام‌های یکپارچگی ؜**ledger؜** (immutability، retention، export برای audit)؟
- ؜مسیرهای ؜**degradation؜** مجاز (مثلاً threshold برای fraud fallback)؟

[بپرس از AI: پرسش‌های کاندید](https://alisol.ir/?ai=Candidate%20Questions%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

---

## ؜نکات کلیدی
- ؜صفحهٔ پرداخت ؜**PSP-hosted؜** برای کاهش ریسک ؜**PCI/GDPR؜**.
- ؜استفاده از queueهای پایدار (سبک ؜**Kafka؜**) برای decouple و تحمل spike.
- ؜؜**Idempotency-Key؜** + قید ؜**UNIQUE؜** برای جلوگیری از دوباره‌شارژ شدن. ؜(idempotency باید سرتاسری باشد؛ در ledger/wallet هم dedupe کنید.)
- ؜؜**Exponential backoff + jitter؜** و ؜**timeout؜**؛ همراه ؜**circuit breaker؜** و fallback امن.
- ؜؜**Ledger؜** تغییرناپذیر؛ wallet را از eventها reconcile کنید.
- ؜برنامه برای ؜**poison pill؜** و ؜**DLQ؜** + فرایند remediation.
- ؜رمزنگاری در ؜**rest؜** و ؜**transit؜**؛ ترجیح ؜**TLS 1.3؜** در ۲۰۲۵.
- ؜مانیتور ؜**DLQ, lag, PSP SLI؜** و ؜**reconciliation backlog؜** برای کشف زودهنگام مشکل.

[بپرس از AI: نکات کلیدی](https://alisol.ir/?ai=Key%20Takeaways%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

---

## ؜فرهنگ واژگان
- ؜؜**PSP (Payment Service Provider):؜** ارائه‌دهندهٔ خدمات پرداخت که غالباً صفحهٔ پرداخت را میزبانی می‌کند.
- ؜؜**Wallet:؜** بالانس مشتق‌شدهٔ تاجر.
- ؜؜**Ledger:؜** لاگ تغییرناپذیر رویدادهای مالی.
- ؜؜**Idempotency Key:؜** توکن ؜**UUID؜** برای retry امن بدون اثر تکراری.
- ؜؜**Poison Pill:؜** پیام غیرقابل‌پردازش؛ انتقال به ؜**DLQ؜**.
- ؜؜**DLQ (Dead-Letter Queue):؜** صف نگه‌دارندهٔ پیام‌های معیوب.
- ؜؜**Circuit Breaker:؜** الگوی ؜**fail fast؜** پس از خطاهای مکرر upstream.
- ؜؜**Exponential Backoff with Jitter:؜** راهبرد retry با تصادفی‌سازی برای جلوگیری از ؜**thundering herd؜**.

[بپرس از AI: فرهنگ واژگان](https://alisol.ir/?ai=Glossary%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

---

## ؜برنامهٔ مطالعه (اختیاری)
- ؜یک ؜**payment coordinator؜** کوچک با ؜**idempotency؜** در ؜**PHP؜** + یک ؜**RDBMS؜** پیاده‌سازی کنید.
- ؜؜**Kafka؜** (یا ماک) را برای ؜**durable events؜**، ؜**retry؜**‌ها و ؜**DLQ؜** تمرین کنید.
- ؜اسکریپت‌های ؜**reconciliation؜** برای مقایسهٔ wallet/ledger با ؜**PSP mock؜** بسازید.
- ؜؜**Chaos experiment؜**‌ها: timeout ؜**PSP؜**، partition شبکه، ؜**poison pill؜**.

[بپرس از AI: برنامهٔ مطالعه](https://alisol.ir/?ai=Study%20Plan%7CHigh-Performance%20Programming%7CDesign%20Payment%20System|fa)

---

## ؜نسبت‌دادن
- ؜منبع: https://www.youtube.com/watch?v=olfaBgJrUBI  
- ؜کانال: High-Performance Programming  
- ؜توضیح: این سند خلاصهٔ ویدئوی پیوندشده است.

---

## ؜دربارهٔ خلاصه‌کننده
من *Ali Sol*، توسعه‌دهندهٔ ؜**PHP؜** هستم. ؜ 
- ؜وب‌سایت: https://alisol.ir  
- ؜لینکدین: https://www.linkedin.com/in/alisolphp
