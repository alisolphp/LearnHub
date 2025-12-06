# ‎Design a Digital Wallet (3+ Approaches) | Google Interview Question

* **کانال / مصاحبه‌گر**: System Design Fight Club  
* **مدت**: 01:48:58  
* **ویدیو اصلی**: https://www.youtube.com/watch?v=4ijjIUeq6hE

> این سند محتوای اصلی یک مصاحبهٔ System Design را خلاصه می‌کند. اگر امکانش را داری، دیدن ویدیو کامل را شدیداً توصیه می‌کنم.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

---

# خلاصه اجرایی یک‌صفحه‌ای

**مسئله (در یک جمله)**: طراحی یک سیستم Digital Wallet شبیه Venmo برای انتقال پول بین حساب‌های کاربری در مقیاس بزرگ، با توان پردازش تا حدود ۱ میلیون TPS.

**دامنهٔ اصلی**: تمرکز روی انتقال پول داخلی بین Walletها؛ یعنی لاگ کردن تراکنش، به‌روزرسانی موجودی، Auditing و هندل کردن Throughput بالا. مواردی مثل درگاه‌های پرداخت خارجی، Fraud Detection یا Currency Conversion خارج از دامنه هستند.

**نیازمندی‌های Non-Functional مهم**: High Availability و Scalability برای ۱M TPS، Latency پایین برای تراکنش‌ها، استفاده از Eventual Consistency در جایی که ممکن است، با امکان Strong Consistency در صورت نیاز. هزینه در اولویت نیست.

**قیود و اعداد کلیدی**: ۱M TPS برای Transferها؛ فرض می‌کنیم فقط Balance Check ساده داریم و خبری از Logic پیچیدهٔ Fraud نیست. تعداد کاربر یا سایز Data دقیق مشخص نشده، اما طراحی باید Sharding برای حساب‌های داغ (Hot Accounts) را در نظر بگیرد.

**معماری High-Level (متنی)**:
- ؜Client درخواست Transfer را به Transaction Service می‌فرستد.
- تراکنش در یک Transaction DB شاردشده (مثلاً DynamoDB یا Postgres شاردشده) لاگ می‌شود.
- از CDC (مثلاً Debezium) استفاده می‌کنیم تا Updateهای لازم برای Wallet DB (موجودی‌ها) را Trigger کند.
- از الگوی Saga برای Distributed Transaction بین موجودی Sender و Receiver استفاده می‌شود.
- ؜Dataهای مربوط به Audit از طریق Streamهایی مثل Kafka به یک OLAP Data Warehouse منتقل می‌شوند.
- برای حساب‌های با حجم تراکنش بالا از Sharded Counter استفاده می‌کنیم تا Hot Key نداشته باشیم.
- مسیر Read: برای موجودی از Wallet DB و برای History از Transaction DB می‌خوانیم.
- ؜Variants مختلف شامل: طراحی Ledger-محور برای لاگ، Update مستقیم موجودی‌ها، یا استفاده از Spanner برای Strong Consistency هستند.

**مهم‌ترین Trade-offها**:
- ؜Eventual vs Strong Consistency: Sagaها Scalability خوبی می‌دهند ولی ریسک Inconsistency موقتی دارند؛ Spanner Strong Consistency می‌دهد اما هزینه و Latency بالاتر است.
- ؜Ledger vs Balance Tables: Ledgerها Audit عالی می‌دهند ولی برای Read موجودی باید Sum بگیریم (گران‌تر است)؛ Update مستقیم موجودی سریع‌تر است ولی بدون Locking درست، ریسک Inconsistency داریم.
- ؜Sharding موجودی‌ها: برای حساب‌های داغ جواب می‌دهد، ولی Balance Check را سخت‌تر می‌کند (نیاز به Scatter-Gather).
- ؜CDC vs Direct Write: CDC سرویس‌ها را Decouple می‌کند و Reliability را بالا می‌برد، ولی Latency و Complexity را زیاد می‌کند.
- ؜Idempotency: برای Retry ضروری است (با Idempotency Key یکتا)، ولی یه مقدار هزینهٔ Storage را بالا می‌برد.
- جدا کردن Auditing: نگه داشتن Queryهای سنگین در OLAP باعث می‌شود OLTP سبک و سریع بماند، ولی نیاز به Sync بین این دو داریم.

**بزرگ‌ترین ریسک‌ها / Failure Modeها**:
- ؜Double-Spend به خاطر Failure در Saga یا Network Partition؛ با Idempotency و Compensating Transaction کم می‌شود.
- ؜Hot Shard برای حساب‌های با Volume بالا (مثل Merchantها)؛ با Sharded Counter مدیریت می‌شود.
- ؜Balanceهای نامنسجم به‌خاطر Eventual Consistency؛ در صورت نیاز می‌شود Strong Consistency با Spanner اضافه کرد.
- ؜Latency بالا در Scatter-Gather برای Sharded Balance؛ فرض می‌کنیم Merchantها معمولاً Funds کافی دارند و Overdraft نمی‌کنیم.
- ؜Data Loss در CDC Streamها؛ از At-least-once Delivery با Deduplication استفاده می‌کنیم.
- ؜Bottleneck روی DB Triggerها یا Orchestrator در ۱M TPS.

**فلش‌کارت‌های مرور ۵ دقیقه‌ای**:
- س: اجزای اصلی سیستم؟ → ج: Transaction DB برای Logها، Wallet DB برای Balanceها، CDC برای Sync، Saga برای هماهنگی.
- س: ۱M TPS را چطور هندل می‌کنیم؟ → ج: DB شاردشده، Updateهای Async از طریق CDC/Kafka، Sharded Counter برای Hot Keyها.
- س: مدل Consistency؟ → ج: به‌صورت پیش‌فرض Eventual با Saga؛ در صورت نیاز Strong Consistency با Spanner برای Read موجودی.
- س: Idempotency چطور پیاده می‌شود؟ → ج: استفاده از Idempotency Key یکتا برای جلوگیری از Duplicate.
- س: Auditing چطور انجام می‌شود؟ → ج: CDC به OLAP Warehouse برای Queryهای تحلیلی.
- س: پول را چطور ذخیره می‌کنیم؟ → ج: به‌صورت String یا Integer (مثلاً Cent) تا مشکل Floating Point نداشته باشیم.
- س: Approach 1 (Ledger) چیست؟ → ج: تمام تراکنش‌ها Append-only ذخیره می‌شوند؛ برای موجودی باید Sum بگیریم (خواندن گران‌تر).
- س: Approach 2 (Direct Updates) چیست؟ → ج: موجودی‌ها را مستقیم در تراکنش Update می‌کنیم؛ نیازمند Lock یا Saga.
- س: Approach 3 (Saga با CDC) چیست؟ → ج: اول تراکنش لاگ می‌شود؛ CDC Event تولید می‌کند؛ Debit/Credit موجودی‌ها Async انجام می‌شود.
- س: Sharded Counter چیست؟ → ج: موجودی یک حساب را بین چند Record تقسیم می‌کنیم تا بتوانیم TPS بالا را تحمل کنیم.
- س: Rollback در این سیستم؟ → ج: از Compensating Transaction داخل Saga استفاده می‌شود.
- س: چرا سراغ Raft نرویم؟ → ج: سادگی و Scalability بهتر Saga نسبت به راه‌حل‌های Consensus مثل Raft.

[پرسش از AI: خلاصه اجرایی](https://alisol.ir/?ai=Executive%20Summary%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29|fa)

---

# برچسب‌های مصاحبه

**؜Domain / Industry**: fintech، payments  
**الگوی محصول (Product Pattern)**: notification  
**؜System Concerns**: high-availability، low-latency، eventual-consistency، geo-replication، hot-key  
**؜Infra / Tech (در صورت ذکر)**: microservices، kafka، postgres، cassandra، dynamodb، redis

[پرسش از AI: برچسب‌های مصاحبه](https://alisol.ir/?ai=Interview%20Tags%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29|fa)

---

# درک مسئله

**؜Prompt اصلی**: طراحی یک Digital Wallet به‌عنوان سوال System Design در مصاحبهٔ Google، با تمرکز روی Transfer پول بین حساب‌ها در ۱M TPS.

**؜Use Caseهای اصلی**:  
- اصلی: انتقال پول P2P (مثلاً ارسال ۵۰ دلار از کاربر A به کاربر B).  
- ثانویه: نمایش موجودی، نمایش History تراکنش‌ها، Auditing و گزارش‌ها.

**موارد خارج از دامنه**: پردازش پرداخت‌های خارجی (مثلاً اتصال به Stripe)، Fraud Detection، پشتیبانی جدی از چند Currency (بیش از حالت ساده).

**؜APIها (در ویدیو)**: APIهای دقیق تعریف نشده‌اند.

[پرسش از AI: درک مسئله](https://alisol.ir/?ai=Problem%20Understanding%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29|fa)

---

# نیازمندی‌ها و قیود

**نیازمندی‌های Functional**:
- لاگ کردن تراکنش همراه با Sender، Receiver، Amount، Timestamp و Status.
- ؜Update اتمیک موجودی Sender و Receiver (در سطح Business Logic).
- پشتیبانی از Idempotent Requestها برای Handling Duplicateها.
- فراهم کردن Auditing از طریق Warehouse جداگانه.
- پشتیبانی از Rollback برای تراکنش‌های ناموفق (با Compensating Transaction).

**نیازمندی‌های Non-Functional**: Scale تا ۱M TPS با Latency پایین؛ Eventual Consistency برای Scalability، با Option Strong Consistency؛ High Availability از طریق Sharding و Replication.

**فرضیات Capacity**: ۱M TPS برای Transferها؛ تعداد کاربر یا حجم Data مشخص نیست ولی طراحی باید نوشتن با Throughput بالا را هندل کند.

[پرسش از AI: نیازمندی‌ها و قیود](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29|fa)

---

# برآورد تقریبی (Back-of-the-Envelope)

در ویدیو وارد محاسبات عددی دقیق نشده، بنابراین این بخش عملاً Skipped شده است.

[پرسش از AI: برآورد](https://alisol.ir/?ai=Estimation%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29|fa)

---

# معماری High-Level

- ؜Client (وب / موبایل) با Sender ID، Receiver ID، Amount و Idempotency Key، درخواست Transfer را به Transaction Service می‌فرستد.
- ؜Transaction Service تراکنش را در یک Transaction DB شاردشده (مثلاً DynamoDB یا Postgres شاردشده) لاگ می‌کند.
- ؜CDC Triggerها (مثلاً Debezium) Event تولید می‌کنند و آن را به Kafka می‌فرستند تا به‌صورت Async پردازش شود.
- ؜Saga Orchestrator (مثلاً با Lambda یا سرویس Orchestrator اختصاصی) Debit از Wallet Sender و Credit روی Wallet Receiver را در Wallet DB هماهنگ می‌کند.
- ؜Wallet DB موجودی کاربران را ذخیره می‌کند؛ Shard بر اساس User ID و برای حساب‌های داغ از Sharded Counter استفاده می‌شود.
- برای Auditing، Logهای تراکنش از طریق CDC به OLAP Warehouse (مثلاً ClickHouse یا BigQuery) Push می‌شوند تا Queryهای تحلیلی را بدون فشار به OLTP انجام دهیم.
- مسیر Read: برای موجودی از Wallet DB و برای History از Transaction DB می‌خوانیم.
- ؜Variationها:  
  - طراحی Ledgerمحور (Append-only Log و Sum برای موجودی)،  
  - ؜Update مستقیم موجودی در همان تراکنش،  
  - استفاده از Spanner برای Strong Consistency روی Read موجودی.

[پرسش از AI: معماری High-Level](https://alisol.ir/?ai=High-Level%20Architecture%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29|fa)

---

## زیرسیستم: Transaction Service

**نقش و مسئولیت‌ها**: دریافت Requestهای Transfer، لاگ کردن تراکنش‌ها، تضمین Idempotency و شروع Saga.

**مدل داده (طبق ویدیو)**:  
جدول Transaction با فیلدهای زیر:  
- ؜Transaction ID (مثلاً Snowflake ID)،  
- ؜Sender ID، Receiver ID،  
- ؜Amount (String یا Int بر حسب Cent)،  
- ؜Timestamp،  
- ؜Status (pending / completed / failed)،  
- ؜Idempotency Key؛  
؜Sharding بر اساس Transaction ID برای جلوگیری از Hot Partition.

**؜API / Contractها**: در ویدیو به‌صورت دقیق تعریف نشده‌اند.

**؜Scaling و Partitioning**:  
- ؜Scale افقی سرویس،  
- ؜Sharding DB بر اساس Transaction ID،  
- جلوگیری از Hot Spot روی کاربر یا Merchant خاص.

**؜Caching**: در ویدیو اشاره‌ای نشده.

**مدل Consistency**:  
- ؜Eventual Consistency؛  
- هماهنگی روی موجودی‌ها با استفاده از Saga و CDC.

**؜Bottleneckها و Hot Keyها**:  
- حجم بالای Write روی Log تراکنش؛  
- با Sharding و پردازش Async مدیریت می‌شود.

**؜Failure Handling**:  
- استفاده از Idempotency Key برای Handling Retry و Duplicate؛  
- استفاده از Saga و Compensating Transaction برای Rollback.

**هزینه**: در ویدیو بررسی نشده.

[پرسش از AI: زیرسیستم - Transaction Service](https://alisol.ir/?ai=Subsystem%20-%20Transaction%20Service%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29|fa)

---

## زیرسیستم: Wallet DB

**نقش و مسئولیت‌ها**: نگه‌داری و به‌روزرسانی موجودی کاربران؛ انجام Debit و Credit بر اساس تراکنش‌ها.

**مدل داده (طبق ویدیو)**:  
- جدول Account شامل User ID و Balance (String یا Int بر حسب Cent).  
- برای حساب‌های پرتراکنش از Sharded Counter استفاده می‌شود (Counter ID اضافی).

**؜API / Contractها**: در ویدیو جزئیات ذکر نشده.

**؜Scaling و Partitioning**:  
- ؜Sharding بر اساس User ID + Counter ID؛  
- انتخاب Random Shard برای Update تا Load متعادل شود.

**؜Caching**: اشاره نشده.

**مدل Consistency**:  
- در معماری پیش‌فرض Eventual Consistency با CDC؛  
- در صورت نیاز Strong Consistency از طریق Spanner.

**؜Bottleneckها و Hot Keyها**:  
- حساب‌های Merchant با حجم تراکنش بالا می‌توانند Hot شوند؛  
- با Sharded Counter Load بین چند Record تقسیم می‌شود.

**؜Failure Handling**:  
- ؜Compensating Transaction در داخل Saga؛  
- فرض بر این است که Merchantها معمولاً Overdraw نمی‌کنند و Funds کافی دارند.

**هزینه**: بحث نشده.

[پرسش از AI: زیرسیستم - Wallet DB](https://alisol.ir/?ai=Subsystem%20-%20Wallet%20DB%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29|fa)

---

## زیرسیستم: Auditing

**نقش و مسئولیت‌ها**: نگه‌داری Log تراکنش‌ها برای Queryهای تحلیلی، گزارش و نیازهای Compliance.

**مدل داده (طبق ویدیو)**:  
- ساختار شبیه Transaction Table در قالب مناسب OLAP.

**؜API / Contractها**: مطرح نشده.

**؜Scaling و Partitioning**:  
- ؜OLAP Warehouse (مثل ClickHouse / BigQuery / Snowflake) معمولاً Queryهای Range را خوب هندل می‌کند؛  
- جزئیات Sharding در ویدیو نیست.

**؜Caching**: اشاره نشده.

**؜Consistency**:  
- ؜Eventual؛ Sync از طریق CDC.

**؜Bottleneckها و Hot Keyها**:  
- ؜Queryهای Range سنگین روی بازه‌های زمانی بزرگ؛  
- جدا بودن از OLTP باعث می‌شود به تراکنش‌های Online آسیب نزند.

**؜Failure Handling**:  
- ؜CDC با At-least-once Delivery؛  
- نیاز به Deduplication در سمت Consumer.

**؜Cost**: گفته نشده.

[پرسش از AI: زیرسیستم - Auditing](https://alisol.ir/?ai=Subsystem%20-%20Auditing%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29|fa)

---

# ؜Trade-offها و گزینه‌های جایگزین

| مبحث | گزینه A | گزینه B | انتخاب ویدیو | توضیح (از ویدیو) |
| --- | --- | --- | --- | --- |
| ؜Consistency | Saga (Eventual) | Spanner (Strong) | Saga | ترجیح Scalability بر Strong Read؛ Strong فقط در صورت نیاز برای Read موجودی. |
| مدیریت Balance | Ledger (Sum تراکنش‌ها) | Direct Update روی Balance | Direct Update با Saga | Ledger برای Audit عالی است، ولی Read موجودی گران می‌شود؛ Update مستقیم با هماهنگی سریع‌تر است. |
| مدیریت Hot Key | تک رکورد | Sharded Counter | Sharded Counter | Load حساب‌های Merchant بین چند رکورد پخش می‌شود؛ فرض می‌کنیم Overdraft رخ نمی‌دهد. |
| ؜Sync | CDC / DB Trigger | Direct Service Call / 2PC | CDC | Decouple کردن سرویس‌ها و Reliability بیشتر؛ از پیچیدگی و ضعف Two-phase Commit دوری می‌کند. |
| ؜Sharding ID تراکنش | Shard بر اساس User ID | Shard بر اساس Transaction ID | Transaction ID | جلوگیری از Hot Partition روی کاربر یا Merchant محبوب. |
| ؜Auditing | در همان OLTP DB | OLAP جداگانه | OLAP جداگانه | جلوگیری از سنگین شدن OLTP به‌خاطر Queryهای تحلیلی و Report. |

[پرسش از AI: Trade-offها](https://alisol.ir/?ai=Trade-offs%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29|fa)

---

# قابلیت اطمینان، دسترس‌پذیری و Performance

- ؜Replication از طریق Sharding و Multi-Region (در صورت نیاز).  
- ؜Latency: با Sagaهای Async، مسیر Write سریع می‌ماند؛ Readها مستقیماً از Wallet DB انجام می‌شود.  
- ؜Backpressure: در ویدیو پوشش داده نشده.  
- ؜Load Shedding: مطرح نشده.  
- ؜Disaster Recovery: جزئیات گفته نشده، اما معمولاً Backup و Multi-Region Replication لازم است.

[پرسش از AI: قابلیت اطمینان و Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29|fa)

---

# امنیت و حریم خصوصی

در ویدیو وارد جزئیات Security نشده، ولی به‌طور ضمنی می‌توانیم موارد زیر را در نظر بگیریم:
- ؜Authentication و Authorization قوی برای APIها.  
- ؜Encryption at Rest و In Transit برای Data حساس.  
- ؜Audit Log کامل تراکنش‌ها برای الزامات Compliance.  
- محدود کردن دسترسی داخلی به Data (Principle of Least Privilege).

[پرسش از AI: امنیت و حریم خصوصی](https://alisol.ir/?ai=Security%20and%20Privacy%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29|fa)

---

# ؜Observability

در ویدیو به‌صورت مستقیم پوشش داده نشده، اما برای یک سیستم Production در این مقیاس معمولاً لازم است:
- ؜Metricها (TPS، Latency، Error Rate، Queue Lag و غیره).  
- ؜Centralized Logging برای سرویس‌ها.  
- ؜Distributed Tracing برای Debug کردن Flowهای Saga.  
- ؜Alerting بر اساس SLO/SLAهای تعریف‌شده.

[پرسش از AI: Observability](https://alisol.ir/?ai=Observability%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29|fa)

---

# سوال‌های Follow-up

در خود ویدیو لیستی از Follow-up Questionها نیامده، ولی نمونه‌هایی که می‌شود پرسید:
- اگر بخواهیم Strong Consistency برای همهٔ Readها داشته باشیم، معماری چطور عوض می‌شود؟  
- چطور می‌توانیم Fraud Detection را بعداً به این معماری اضافه کنیم بدون اینکه Core System را بشکنیم؟  
- در Multi-Region Active-Active چه تغییری لازم است؟  
- اگر بخواهیم Limit روی تراکنش‌ها داشته باشیم (روزانه / ماهانه)، این را کجا و چطور پیاده می‌کنیم؟

[پرسش از AI: Follow-upها](https://alisol.ir/?ai=Follow-up%20Questions%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29|fa)

---

# سوال‌های احتمالی کاندید

در ویدیو explicitly لیست نشده، اما یک کاندید می‌تواند سوال‌هایی مثل موارد زیر بپرسد:
- چه Trade-offهایی بین Ledgerمحور بودن و Direct Balance Update در Production واقعی می‌بینی؟  
- اگر Sharded Counter باعث پیچیدگی زیاد در Balance Check شود، چه جایگزینی پیشنهاد می‌دهی؟  
- چه Metricهایی را برای سلامت سیستم مهم‌تر می‌دانی؟

[پرسش از AI: سوال‌های کاندید](https://alisol.ir/?ai=Candidate%20Questions%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29|fa)

---

# نکته‌های کلیدی (Key Takeaways)

- جدا کردن Transaction DB و Wallet DB برای شفافیت و Scalability.  
- ترجیح Saga بر Raft برای Distributed Transaction در این Domain.  
- ؜Idempotency Key برای Handling Retry و Duplicate حیاتی است.  
- ؜Sharded Counter برای مدیریت Hot Key در حساب‌های پرتراکنش (مثل Merchantها).  
- ؜CDC برای Decouple کردن سیستم‌ها و انجام Updateهای Async روی موجودی‌ها.  
- ؜Ledger Approach برای Audit عالی است ولی Read موجودی را گران می‌کند.  
- می‌توان با Spanner یا سیستم‌های مشابه Strong Consistency برای Read موجودی فراهم کرد.  
- پول را به‌صورت String یا Int نگه می‌داریم تا مشکل Round شدن Floating Point پیش نیاید.  
- ؜Auditing را در OLAP انجام می‌دهیم تا OLTP سبک و Responsive بماند.  
- فرض ضمنی: Merchantها معمولاً Overdraw نمی‌کنند، در نتیجه Sharded Counter ساده‌تر می‌شود.  
- از Event Sourcing کامل استفاده نشده و بیشتر Status Update ساده روی رکوردها داریم.  
- استفاده از Transaction ID به‌عنوان Shard Key Load را روی Cluster بهتر پخش می‌کند.

[پرسش از AI: نکته‌های کلیدی](https://alisol.ir/?ai=Key%20Takeaways%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29|fa)

---

# واژه‌نامه (Glossary)

- ؜Saga: الگوی مدیریت Distributed Transaction با استفاده از دنباله‌ای از Stepها و Compensating Transaction برای Rollback.  
- ؜CDC (Change Data Capture): مکانیزمی برای گرفتن و Stream کردن تغییرات DB (Insert / Update / Delete).  
- ؜Sharded Counter: تقسیم یک Counter یا Balance روی چند رکورد برای تحمل TPS بالا و جلوگیری از Hot Key.  
- ؜Idempotency: خاصیتی که اگر یک Operation را چند بار تکرار کنیم، نتیجهٔ نهایی تغییر نکند.  
- ؜OLTP (Online Transaction Processing): سیستم‌های Transactional با Read/Write سریع روی رکوردهای کوچک.  
- ؜OLAP (Online Analytical Processing): سیستم‌هایی برای Queryهای تحلیلی سنگین روی حجم زیاد Data.

[پرسش از AI: واژه‌نامه](https://alisol.ir/?ai=Glossary%7CSystem%20Design%20Fight%20Club%7CGoogle%20Interview%20Question%20%7C%20System%20Design%3A%20Digital%20Wallet%20%283%2B%20Approaches%29|fa)

---

# ؜Attribution

- ویدیو منبع: https://www.youtube.com/watch?v=4ijjIUeq6hE  
- کانال: System Design Fight Club  
- نکته: این سند خلاصه‌ای از Mock Interview لینک‌شده است و جایگزین دیدن خود ویدیو نیست.

---

# دربارهٔ خلاصه‌کننده

من *Ali Sol* هستم، یک Backend Developer. برای اطلاعات بیشتر:

- وب‌سایت: [alisol.ir](https://alisol.ir)  
- لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

