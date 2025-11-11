# ؜طراحی سیستم - ؜مصاحبه‌ی ساختگی: طراحی Distributed Job Scheduler | Systems Design Interview Questions With Ex-Google SWE

- ؜؜**کانال/مصاحبه‌گر:؜** Jordan has no life  
- ؜؜**مدت زمان:؜** ۰۰:۳۰:۲۹  
- ؜؜**ویدئو:؜** https://www.youtube.com/watch?v=pzDwYHRzEnk

> *این سند، خلاصه‌ی یک مصاحبه‌ی ساختگیِ طراحی سیستم است. ؜اگر فرصت دارید، دیدن ویدئو کامل توصیه می‌شود.*

---

## ؜۱) خلاصه‌ی اجرایی یک‌صفحه‌ای (مرور ۲–۳ دقیقه‌ای)

- ؜؜**مسئله (یک‌خطی):؜** ساخت یک Distributed Job Scheduler که باینری‌های آپلودشده را روی یک کلاستر اجرا کند، از زمان‌بندی به‌سبک cron و گردش‌کارهای DAG پشتیبانی کند، وضعیت هر job را نشان دهد، و مقیاس «میلیون‌ها job در روز» را پوشش دهد.

- ؜؜**دامنه‌ی اصلی؜**
  - ؜؜**در دامنه:؜** زمان‌بندی cron؛ زمان‌بندی DAG؛ اجرای job روی executors؛ ردیابی status؛ retries / timeouts؛ Load Balancing از طریق یک broker؛ «at-least-once» با تلاش برای جلوگیری از همزمانی اجرای تکراری هر job.
  - ؜؜**خارج از دامنه (ضمنی):؜** احراز هویت سطح‌بالا و ریزدانه؛ Geo-consistency چندمنطقه‌ای؛ UI؛ مدل‌سازی هزینه؛ جزئیات autoscaling پیشرفته؛ امنیت پیشرفته؛ SLAها.

- ؜؜**اولویت‌های غیرعملکردی:؜** دسترس‌پذیری بالا در مسیر زمان‌بندی؛ تاخیر کم از لحظه‌ی due شدن تا dispatch؛ مقیاس‌پذیری تا میلیون‌ها job/روز؛ سادگی عملیاتی.

- ؜؜**قیود و اعداد کلیدی (واقع در ویدئو):؜** «میلیون‌ها job در روز»؛ بازه‌های polling حدود ۳۰–۶۰ ثانیه؛ افزایش timeout در مقیاس دقیقه؛ صف‌های چندسطحیِ اولویت با زمان‌های نمونه (۱۰s → ۱m → ۱h).

- ؜؜**معماری سطح‌بالا (متنی)؜**
  - ؜شیء‌انبار (مثلاً S3) برای نگهداری باینری‌های آپلودشده.
  - ؜جداول متادیتا: ؜**Cron table؜** و ؜**DAG table؜** برای تعریف زمان‌بندی‌ها و وابستگی‌ها.
  - ؜؜**Scheduling table؜** شامل وظایف قابل اجرا، ایندکس‌شده با `(status, run_at)`؛ به‌صورت دوره‌ای poll می‌شود.
  - ؜؜**CDC (Change Data Capture)؜** تغییرات Cron/DAG را به Scheduling table تزریق می‌کند.
  - ؜؜**Message broker؜** وظایف آماده‌ی اجرا را نگه می‌دارد؛ executors در حالت idle آن‌ها را pull می‌کنند.
  - ؜؜**Executors؜** باینری را از object store می‌گیرند، اجرا می‌کنند، و status را به‌روزرسانی می‌کنند.
  - ؜؜**Read replicas؜** (با eventual consistency) برای پاسخ‌دادن به استعلامِ وضعیت کاربران.

- ؜؜**تبادل‌ها (Trade-offs)؜**
  - ؜CDC در برابر 2PC برای وارد کردن نوبت‌های اولیه/بعدی به scheduler.
  - ؜In-memory broker در برابر Log-based broker برای work-stealing و مدیریت stragglerها.
  - ؜Exact-once در برابر At-least-once؛ اتکا به idempotency در برابر قفل‌های توزیع‌شده.
  - ؜تراکنش‌های تک‌گره‌ای (sharding بر مبنای هر DAG) در برابر تراکنش‌های توزیع‌شده.

- ؜؜**ریسک‌ها/خرابی‌های عمده؜**
  - ؜اجرای تکراری به‌علت retries، redelivery در broker، یا خرابیگره‌ها.
  - ؜رقابت بر سر قفل و churn روی ایندکس‌های Scheduling table (به‌دلیل به‌روزرسانی‌های مکرر `run_at`).
  - ؜Hot partitionها (کارهای طولانی که جلوی بقیه را می‌گیرند).
  - ؜تاخیر ناشی از eventual consistency روی replicasهای قرائت.

- ؜؜**فلش‌کارت مرور ۵ دقیقه‌ای؜**
  - ؜؜**پرسش:؜** پشتوانه‌ی cron و DAG چه جداولی هستند؟ ؜**پاسخ:؜** جداول متادیتای ؜**Cron؜** و ؜**DAG؜**؛ موارد قابل‌اجرا در ؜**Scheduling؜** table.
  - ؜؜**پرسش:؜** پیشروی DAGها چگونه است؟ ؜**پاسخ:؜** ثبت epochs وابستگیِ فرزند؛ وقتی همه‌ی deps با epoch جاری منطبق شد، فرزند enqueue می‌شود.
  - ؜؜**پرسش:؜** چرا CDC؟ ؜**پاسخ:؜** اجتناب از 2PC؛ جریان‌دهیِ غیرهمگام تغییراتِ متادیتا به scheduler.
  - ؜؜**پرسش:؜** چه چیزی انصاف (fairness) را هدایت می‌کند؟ ؜**پاسخ:؜** executors بیکار از broker pull می‌کنند؛ صف‌های چندسطحیِ اولویت با stragglerها و «کارهای بزرگ» کنار می‌آیند.
  - ؜؜**پرسش:؜** چگونه double-running را مهار کنیم؟ ؜**پاسخ:؜** قفل توزیع‌شده‌ی best-effort (مثل ZK/etcd/Redis lease) + idempotent jobs + timeouts مبتنی بر `run_at`.
  - ؜؜**پرسش:؜** چگونه خواندن/نوشتن‌های scheduler را مقیاس می‌دهیم؟ ؜**پاسخ:؜** پارتیشن‌بندی Scheduling table؛ ایندکس روی `(status, run_at)`؛ و در صورت نیاز قرائت از replicas با پذیرش eventual consistency.

[Ask AI: خلاصه‌ی اجرایی](https://alisol.ir/?ai=Executive%20Summary%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

## ؜۲) برچسب‌های مصاحبه (برای فیلتر بعدی)

- ؜؜**الگوی محصول:؜** `job-scheduler`، `queue`
- ؜؜**نگرانی‌های سیستمی:؜** `high-availability`، `eventual-consistency`، `multi-tenancy`، `backpressure`، `throttling`
- ؜؜**فناوری‌ها (ذکرشده):؜** `kafka`، `rabbitmq`، `activemq`، `mysql`، `mongodb`، `s3`
  - ؜یادداشت: برای log brokerها، قابلیت‌های جدید Kafka/Pulsar مفیدند، اما الگوی pull با ack ساده‌تر است.

[Ask AI: برچسب‌ها](https://alisol.ir/?ai=Interview%20Tags%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

## ؜۳) درک مسئله

- ؜؜**پرامپت (بازگویی):؜** اجرای باینری‌های آپلودشده روی مجموعه‌ای از executors توزیع‌شده. ؜پشتیبانی از cron و DAG. ؜امکان مشاهده‌ی status هر job. ؜مقیاس‌پذیری بالا و دسترس‌پذیری خوب.
- ؜؜**موارد استفاده؜**
  - ؜زمان‌بندی one-off یا تکرارشونده (cron).
  - ؜ساخت DAG که در آن کارهای downstream بعد از موفقیت والدها شروع می‌شوند (یا شکست propagate می‌شود).
  - ؜استعلام تاریخچه/وضعیت/خطاها.
- ؜؜**خارج از دامنه:؜** طراحی UI/کنسول، مدل‌های authZ، محاسبه‌ی هزینه، Failover چندمنطقه‌ای.
- ؜؜**APIها:؜** در ویدئو ذکر نشده.

[Ask AI: درک مسئله](https://alisol.ir/?ai=Problem%20Understanding%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

## ؜۴) نیازمندی‌ها و قیود

؜**آنچه در ویدئو گفته شد؜**

- ؜اجرای باینری‌های آپلودشده از object storage روی executors.
- ؜زمان‌بندی Cron و DAG.
- ؜تضمین ؜**at-least-once؜** با ترفندهای جلوگیری از اجرای همزمانِ تکراری (locks/idempotency).
- ؜ردیابی وضعیت؛ خواندن از ؜**read replica؜** قابل قبول است (eventual consistency).
- ؜مقیاس «میلیون‌ها job در روز».
- ؜Scheduler مبتنی بر polling و ایندکس `(status, run_at)`؛ بالا بردن `run_at` برای پیاده‌سازی timeout در مراحل مختلف job.

؜**فرضیات؜** *(محافظه‌کارانه)*

- ؜tenancy احرازشده؛ جداسازی هر tenant در سطح queue/topic یا partition.
- ؜SLO نرم: از due تا dispatch در بازه‌ی ثانیه تا دقیقه در بار بالا.
- ؜اندازه‌ی باینری‌ها معقول (ده‌ها تا صدها MB) در S3-مانند.

[Ask AI: نیازمندی‌ها و قیود](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

## ؜۵) برآوردهای سرانگشتی

- ؜در ویدئو مطرح نشده — صرف‌نظر شد.

[Ask AI: برآورد](https://alisol.ir/?ai=Estimation%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

## ؜۶) معماری سطح‌بالا

- ؜؜**مسیر Upload؜**
  1. ؜کاربر باینری را به S3 آپلود می‌کند؛ یک تعریف ؜**Cron؜** یا ؜**DAG؜** ثبت می‌کند.
  2. ؜متادیتا در ؜**Cron table؜** یا ؜**DAG table؜** ذخیره می‌شود.
  3. ؜؜**CDC؜** این تغییرات را با ساخت اولین (و بعدی) نمونه‌های قابل اجرا به ؜**Scheduling table؜** می‌فرستد.

- ؜؜**مسیر Scheduling؜**
  1. ؜یک ؜**scheduler process؜** هر N ثانیه ؜**Scheduling table؜** را برای ردیف‌هایی با `status in (null|ready|in_progress)` و `run_at <= now` poll می‌کند.
  2. ؜هنگام تخصیص، `run_at` به آینده (پنجره‌ی timeout) جابجا می‌شود و رکورد job با سطح اولویت مناسب (بر اساس retry) به ؜**broker؜** push می‌شود.

- ؜؜**مسیر Execution؜**
  1. ؜؜**Executors؜** در حالت idle pull می‌کنند؛ باینری را از S3 می‌گیرند؛ اجرا می‌کنند.
  2. ؜؜**status/history؜** را در Scheduling (یا history table جدا) به‌روزرسانی می‌کنند.
  3. ؜اگر DAG بود: epochs وابستگیِ فرزندان را آپدیت می‌کنند؛ وقتی همه deps هم‌epoch شدند، فرزند enqueue می‌شود.
  4. ؜در پایان موفق/ناموفق، وضعیت نهایی ثبت می‌شود تا retry متوقف شود.

- ؜؜**مسیر Status؜**
  - ؜کاربران از ؜**read replicas؜** وضعیت/لاگ‌ها را می‌خوانند.

[Ask AI: معماری سطح‌بالا](https://alisol.ir/?ai=High-Level%20Architecture%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

## ؜۷) موشکافی زیرسامانه‌ها

### ؜۷.۱ Cron Scheduling

- ؜؜**نقش:؜** تعریف cron expressions و seed کردن اولین نمونه‌ی قابل اجرا.
- ؜؜**مدل داده (طبق ویدئو)؜**
  - ؜`cron_jobs(id, schedule_spec, parent_job_id, ...)`
  - ؜هنگام ایجاد، ؜**نوبت بعدی؜** نیز در ؜**Scheduling table؜** درج می‌شود.
  - ؜Executor که run جاری را تمام می‌کند، مسئول ساخت occurrence بعدی است (از طریق تراکنش/CDC).
- ؜؜**ایندکس‌ها:؜** `(id)` و در صورت نیاز `(next_run)` در cron؛ ایندکس اصلی scheduler روی `(status, run_at)`.
- ؜؜**مدیریت خطا:؜** اگر executor پیش از زمان‌بندیِ occurrence بعدی crash کند، timeout مبتنی بر `run_at` باعث retry می‌شود؛ تکرارها با idempotency قابل تحمل‌اند.

[Ask AI: زیرسامانه - ؜Cron](https://alisol.ir/?ai=Subsystem%20-%20Cron%20Scheduling%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

### ؜۷.۲ DAG Scheduling

- ؜؜**نقش:؜** پیگیری وابستگی‌ها و epochs تا فرزندان وقتی همه‌ی والدها برای همان epoch تمام شدند اجرا شوند.
- ؜؜**مدل داده (طبق ویدئو)؜**
  - ؜`dag_nodes(job_id, cron_if_root?, children[], dependency_epochs{dep_job_id: epoch_seen}, current_epoch)`
  - ؜ریشه‌ها ممکن است cron داشته باشند؛ اتمام ریشه‌ها epochs گره‌های وابسته را جلو می‌برد؛ وقتی همه deps هم‌سو شدند، فرزند برای همان epoch enqueue می‌شود.
  - ؜برای جلوگیری از هم‌پوشانی DAG runs، می‌توان ریشه‌ها را «فرزند» برگ‌ها در نظر گرفت تا ریشه‌ها فقط پس از پایان برگ‌ها re-trigger شوند.
- ؜؜**مقیاس و پارتیشن‌بندی:؜** طوری shard کنید که متادیتای هر DAG در یک گره دیتابیس بگنجد تا آپدیت‌های وابستگی تراکنشی بماند.
- ؜؜**انتخاب ذخیره‌ساز:؜** ابتدا MySQL (تراکنش‌ها)، سپس تمایل به MongoDB برای انعطاف JSON در مدل‌سازی children/deps. ؜*(در محیط‌های تراکنشی قوی، Postgres JSONB هم گزینه‌ی خوبی است.)*

[Ask AI: زیرسامانه - ؜DAG](https://alisol.ir/?ai=Subsystem%20-%20DAG%20Scheduling%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

### ؜۷.۳ Scheduling Table و Poller

- ؜؜**نقش:؜** منبع واحد «نمونه‌های قابل اجرا».
- ؜؜**فیلدهای کلیدی:؜** `job_id (PK)`، `s3_url`، `run_at (indexed)`، `status`، `retry_count`، `priority_level`.
- ؜؜**رفتار:؜** Poller ردیف‌هایی با `status != (completed|failed)` و `run_at <= now` را می‌خواند، به broker push می‌کند، و `run_at` را به آینده (timeout window) می‌برد.
- ؜؜**کارایی؜**
  - ؜پارتیشن به‌صورت time-range + hash(job_id) برای پخش خواندن/نوشتن.
  - ؜قرائت از replicas برای کاهش lock contention روی leader. ؜*(lag می‌تواند retries بیشتری ایجاد کند؛ با backoff و idempotency قابل‌قبول است.)*

[Ask AI: زیرسامانه - ؜Scheduling Table](https://alisol.ir/?ai=Subsystem%20-%20Scheduling%20Table%20%26%20Poller%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

### ؜۷.۴ Message Broker و Load Balancing

- ؜؜**نقش:؜** توزیع taskها بین executors بیکار؛ پشتیبانی از صف‌های چندسطحیِ اولویت.
- ؜؜**رویکرد (طبق ویدئو):؜**
  - ؜تمایل به ؜**in-memory broker؜** (ActiveMQ/RabbitMQ) در برابر ؜**log-based؜** (Kafka) برای اجتناب از Head-of-Line blocking ناشی از partitioning. ؜*(هرچند الگوهای مدرن Kafka/Pulsar می‌توانند کمک کنند.)*
  - ؜صف‌های اولویت چندسطحی (مثلاً L1=۱۰s، L2=۱m، L3=۱h). ؜کارهای بزرگ به سطوح بالاتر می‌روند؛ executors قوی‌تر از L3..L1 می‌خوانند.

[Ask AI: زیرسامانه - ؜Broker](https://alisol.ir/?ai=Subsystem%20-%20Broker%20%26%20Load%20Balancing%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

### ؜۷.۵ Executors

- ؜؜**نقش:؜** pull → دانلود باینری از S3 → اجرا → به‌روزرسانی status/history.
- ؜؜**مدیریت خطا:؜** با crash یا از دست‌رفتن ack، broker ممکن است به executor دیگری تحویل دهد → تکرار محتمل است؛ بر idempotency و قفلِ best-effort تکیه می‌شود.
- ؜؜**قفل:؜** قفل توزیع‌شده‌ی هر `job_id` برای جلوگیری از تکرار *همزمان*؛ TTL لازم است تا در صورت مرگ executor بن‌بست نشود. ؜*(leaseهای heartbeatدار + مانیتور skew/GC پیشنهاد می‌شود.)*

[Ask AI: زیرسامانه - ؜Executors](https://alisol.ir/?ai=Subsystem%20-%20Executors%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

### ؜۷.۶ وضعیت/تاریخچه‌ی Job

- ؜؜**نقش:؜** پیگیری `completed/failed/in_progress`، پیام خطا، timestamps.
- ؜؜**سرو:؜** کاربران از ؜**read replicas؜** می‌خوانند؛ eventual consistency برای UX پذیرفتنی است و فشار روی leader را کم می‌کند.

[Ask AI: زیرسامانه - ؜وضعیت Job](https://alisol.ir/?ai=Subsystem%20-%20Job%20Status%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

## ؜۸) تبادل‌ها و گزینه‌های جایگزین

| موضوع | گزینه A | گزینه B | گرایش ویدئو | دلیل (طبق ویدئو) |
| --- ؜| --- ؜| --- ؜| --- ؜| --- ؜|
| ورود نوبت‌ها به scheduler | CDC از Cron/DAG به Scheduler | 2PC بین جداول | ؜**CDC؜** | اجتناب از کندی 2PC در هنگام upload/update. ؜|
| سبک broker | Log-based (Kafka) | In-memory (RabbitMQ/ActiveMQ) | ؜**In-memory؜** | مدل pull در executors جلوی HoL blocking را می‌گیرد. ؜|
| ذخیره‌ساز DAG | MySQL (relational) | MongoDB (JSON) | ؜**MongoDB؜** | نگهداری children/depها به‌صورت JSON ساده‌تر است. ؜|
| جلوگیری از تکرار | Idempotent jobs + Locks | تراکنش‌های قوی سراسری | ؜**Idempotency + Locks؜** | سازگاری قوی عملکرد را می‌کاهد؛ تکرار در عمل قابل تحمل است. ؜|
| سرو وضعیت | خواندن از Leader | Read replicas | ؜**Replicas؜** | کاهش contention؛ پذیرش eventual consistency. ؜|

[Ask AI: تبادل‌ها](https://alisol.ir/?ai=Trade-offs%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

## ؜۹) قابلیت اطمینان، دسترس‌پذیری، کارایی

- ؜؜**تکثیر/سازگاری:؜** eventual consistency برای خواندن status پذیرفتنی است؛ نیاز به strong consistency در read path نیست.
- ؜؜**Backpressure و Throttling:؜** صف‌های اولویت + pull در executors ذاتاً backpressure ایجاد می‌کند؛ retries با `run_at` کنترل می‌شود.
- ؜؜**تنزل عملکرد:؜** lag روی replicas بیشترین حالت به retries بیشتر می‌انجامد (با idempotency امن است).
- ؜؜**سناریوهای خرابی:؜** خرابی broker، خرابی executor، از دست‌رفتن ack، خرابی scheduler → همه با retries مدیریت می‌شوند؛ تکرارها قابل انتظارند.

[Ask AI: قابلیت اطمینان و کارایی](https://alisol.ir/?ai=Reliability%20and%20Performance%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

## ؜۱۰) امنیت و حریم خصوصی

- ؜در ویدئو توضیح داده نشده.

[Ask AI: امنیت و حریم خصوصی](https://alisol.ir/?ai=Security%20and%20Privacy%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

## ؜۱۱) Observability

- ؜؜**قابل‌مشاهده برای کاربر:؜** status/history و خطاها.
- ؜؜**درونی:؜** (ضمنی) متریک‌هایی مانند عمق صف، بهره‌وری executor، شمار retries، و latency زمان‌بندی. ؜پشته‌ی خاصی نام برده نشده.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

## ؜۱۲) پرسش‌های پیگیری (از مصاحبه‌گر)

- ؜ذکر نشده.

[Ask AI: پرسش‌های پیگیری](https://alisol.ir/?ai=Follow-up%20Questions%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

## ؜۱۳) پرسش‌های پیشنهادیِ کاندید

- ؜هدف SLO برای «تاخیر due → started» در اوج بار چیست؟
- ؜باینری‌ها trusted هستند یا sandbox می‌خواهند؟ runtime یا container خاصی لازم است؟
- ؜آیا به سهمیه/اولویت per-tenant نیاز داریم؟
- ؜مدیریت secrets و تزریق environment در سطح job لازم است؟

[Ask AI: پرسش‌های کاندید](https://alisol.ir/?ai=Candidate%20Questions%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

## ؜۱۴) نکات کلیدی

- ؜جداسازی ؜**متادیتا؜** (Cron/DAG) از ؜**نمونه‌های قابل اجرا؜** (Scheduling table).
- ؜استفاده از ؜**CDC؜** برای جریان‌دهی تغییرات به وظایف قابل اجرا.
- ؜ایندکس کردن scheduler بر مبنای `(status, run_at)` و ؜**افزایش timeout؜** در چرخه‌ی عمر job.
- ؜ترجیح ؜**executor pull؜** + ؜**priority queues؜** برای انصاف و مدیریت straggler.
- ؜تلاش برای ؜**idempotent jobs؜**؛ به‌کارگیری ؜**قفل توزیع‌شده‌ی best-effort؜** برای پرهیز از اجرای همزمانِ تکراری. ؜ 
- ؜Sharding متادیتای DAG طوری که آپدیت‌ها ؜**تراکنشی روی یک گره؜** بماند.

[Ask AI: نکات کلیدی](https://alisol.ir/?ai=Key%20Takeaways%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

## ؜۱۵) واژه‌نامه

- ؜؜**CDC (Change Data Capture):؜** استریم‌کردن تغییرات دیتابیس به مصرف‌کنندگان پایین‌دستی.
- ؜؜**Epoch (در DAG):؜** نسخه‌ی run یک گره؛ وقتی epochs والدها منطبق شد، فرزند پیش می‌رود.
- ؜؜**HoL Blocking:؜** گیرکردن ابتدای صف؛ یک مورد کند جلوی بقیه را می‌گیرد.
- ؜؜**Idempotent Job:؜** اجرای مجدد خروجی/اثرات جانبی را تغییر نمی‌دهد.

[Ask AI: واژه‌نامه](https://alisol.ir/?ai=Glossary%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

## ؜۱۶) برنامه‌ی مطالعه (اختیاری)

- ؜تمرین مدل‌سازی وابستگی‌های DAG با مفهوم epoch.
- ؜پیاده‌سازی یک scheduler کوچک: ایندکس `(status, run_at)` + poller + in-memory queue + worker.
- ؜افزودن سرکوب تکرار با نوشتن idempotent و قفل مبتنی بر lease.

[Ask AI: برنامه‌ی مطالعه](https://alisol.ir/?ai=Study%20Plan%7CJordan%7CDesign%20Distributed%20Job%20Scheduler%20%7C%20Systems%20Design%20Interview%20Questions%20With%20Ex-Google%20SWE|fa)

---

## ؜۱۷) نسبت‌دادن

- ؜ویدئوی منبع: https://www.youtube.com/watch?v=pzDwYHRzEnk  
- ؜کانال: ذکر نشده  
- ؜نکته: این سند خلاصه‌ای از ویدئوی پیوندشده است.

---

## ؜۱۸) درباره‌ی خلاصه‌کننده

- ؜من *Ali Sol*، برنامه‌نویس PHP هستم. ؜ 
- ؜وب‌سایت: [alisol.ir](https://alisol.ir)  
- ؜لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
