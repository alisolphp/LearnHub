# ؜‫System Design Mock Interview: System Design Interview - ؜Distributed Message Queue
**؜Design Distributed Message Queue like Kafka**

؜**کانال/مصاحبه‌کننده؜**: ‫System Design Interview  
؜**مدت زمان؜**: ‫00:26:27  
؜**ویدیوی اصلی؜**: ‫https://www.youtube.com/watch?v=iJLL-KPqBpM  

> *این سند خلاصه محتوای کلیدی یک مصاحبه آزمایشی طراحی سیستم است. ؜پیشنهاد می‌کنم اگر می‌توانید، ویدیو کامل را تماشا کنید.*

## ؜خلاصه اجرایی یک‌صفحه‌ای (2–3 دقیقه مرور سریع)

* ؜**بیانیه مسئله (یک‌خطی)؜**: طراحی یک distributed message queue که ارتباط asynchronous بین producerها و consumerها را ممکن می‌کند، جایی که پیام‌ها دقیقاً به یک consumer تحویل داده می‌شوند.
* ؜**دامنه اصلی؜**: تمرکز روی core APIها مثل send و receive پیام‌ها؛ در دامنه شامل مدیریت scalability، availability، performance و durability؛ خارج از دامنه شامل ویژگی‌های پیشرفته مثل delete message API مگر اینکه مشخص شود.
* ؜**اولویت‌های غیرعملکردی؜**: ‫Scalability برای مدیریت افزایش بار، high availability برای تحمل خرابی‌های سخت‌افزاری/شبکه‌ای، high performance برای عملیات send/receive سریع، و durability برای حفظ داده‌های ارسال‌شده.
* ؜**محدودیت‌ها و اعداد کلیدی؜**: در ویدیو بیان نشده.
* ؜**معماری سطح بالا (متنی)؜**: 
  - ؜کلاینت‌ها از طریق ‫VIP به load balancerها متصل می‌شوند.
  - ؜‫Load balancerها (با primary/secondary برای HA، VIP partitioning برای scale) به FrontEnd web service هدایت می‌کنند.
  - ؜‫Load balancerها به عنوان single point of failure: با primary/secondary nodes و VIP partitioning کاهش می‌یابد.
  - ؜‫FrontEnd (stateless، چند-DC): اعتبارسنجی درخواست‌ها، auth/authz، TLS termination، server-side encryption، caching (queue metadata/user info)، rate limiting (مثل leaky bucket)، dispatching به backend/metadata، deduplication، جمع‌آوری داده‌های استفاده.
  - ؜‫Metadata service (لایه caching روی DB): ذخیره اطلاعات queue (نام، تاریخ ایجاد، config)؛ مدیریت خواندن‌های زیاد/نوشتن‌های کم؛ گزینه‌ها: replication کامل در هر node، sharded با دسترسی مستقیم، یا sharded با forwarding.
  - ؜‫Backend service: ذخیره پیام‌ها (memory برای اخیر، disk برای durability)؛ replication داده؛ دو گزینه: leader-based (با in-cluster manager برای elections) یا cluster-based (با out-cluster manager برای assignments).
  - ؜کامپوننت‌های async: ‫Replication (sync/async)؛ پاک‌سازی پیام (delayed jobs یا visibility timeouts).
* ؜**تریدآف‌های برتر؜**:
  - ؜‫Synchronous vs. ؜asynchronous communication: Sync ساده‌تر اما سخت‌تر برای مدیریت خرابی‌ها؛ async خدمات را decoupled می‌کند اما پیچیدگی اضافه می‌کند.
  - ؜‫Leader-based vs. ؜leaderless backend: Leader هماهنگی را ساده می‌کند اما نیاز به election دارد؛ leaderless election را اجتناب می‌کند اما نیاز به partitioning queue دارد.
  - ؜‫Synchronous vs. ؜asynchronous replication: Sync durability بالاتر اما latency بیشتر؛ async سریع‌تر اما ریسک از دست رفتن داده.
  - ؜‫Pull vs. ؜push model: Pull ساده‌تر برای پیاده‌سازی اما نیاز به polling consumer؛ push اطلاع‌رسانی می‌کند اما پیچیده‌تر.
  - ؜‫FIFO ordering: Strict order throughput را محدود می‌کند به دلیل coordination؛ relaxed order performance را بهبود می‌بخشد.
  - ؜‫Message deletion: Immediate delete vs. ؜delayed (مثل visibility timeout) simplicity و at-least-once delivery را بالانس می‌کند.
* ؜**بزرگ‌ترین ریسک‌ها/حالات خرابی؜**:
  - ؜‫Load balancer به عنوان single point of failure: با primary/secondary nodes و VIP partitioning کاهش می‌یابد.
  - ؜خرابی host backend منجر به از دست رفتن داده: با replication و deployment چند-DC مدیریت می‌شود.
  - ؜‫Latency بالا از replication یا throttling: با گزینه‌های async و rate limiting بالانس می‌شود.
  - ؜پیام‌های duplicate در at-least-once semantics: با request deduplication و idempotency مدیریت می‌شود.
  - ؜clusterها یا queueهای overloaded: با partitioning و monitoring utilization مدیریت می‌شود.
  - ؜partitionهای شبکه: با redundancy تحمل می‌شود اما ممکن است consistency را تحت تأثیر قرار دهد.
* ؜**فلش‌کارت‌های مرور 5 دقیقه‌ای؜**:
  - ؜س: چه چیزی queue را از topic متمایز می‌کند؟ → ج: Queue به یک consumer تحویل می‌دهد؛ topic به همه subscriberها.
  - ؜س: الزامات غیرعملکردی اصلی؟ → ج: Scalable، highly available، performant، durable.
  - ؜س: نقش FrontEnd service؟ → ج: مدیریت اعتبارسنجی، auth، encryption، caching، throttling، dispatching.
  - ؜س: چگونگی ذخیره پیام‌ها؟ → ج: در memory برای اخیر، روی disk برای durability؛ replicated در hostها.
  - ؜س: هدف leader election؟ → ج: تعیین host اصلی برای مدیریت درخواست‌های queue و replication.
  - ؜س: pros/cons synchronous replication؟ → ج: Durability بالا اما latency بیشتر.
  - ؜س: pros/cons asynchronous replication؟ → ج: Latency کمتر اما ریسک از دست رفتن داده در خرابی.
  - ؜س: تضمین‌های تحویل؟ → ج: At-most-once (ممکن است از دست برود)، at-least-once (ممکن است duplicate شود)، exactly-once (سخت برای دستیابی).
  - ؜س: Pull vs. ؜push model؟ → ج: Pull poll می‌کند؛ push اطلاع‌رسانی می‌کند.
  - ؜س: چالش‌های FIFO؟ → ج: سخت در سیستم‌های distributed؛ throughput را محدود می‌کند.
  - ؜س: اهمیت monitoring؟ → ج: پیگیری سلامت سرویس و وضعیت queueها برای alerts و dashboards.
  - ؜س: رویکرد scalability؟ → ج: افزودن hostها، shards، clusterها؛ partitioning queueهای بزرگ.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue|fa)

## ؜تگ‌های مصاحبه (برای فیلتر کردن بعدی)

* ؜**دامنه/صنعت؜**: messaging
* ؜**الگوی محصول؜**: queue
* ؜**نگرانی‌های سیستم؜**: high-availability، low-latency، eventual-consistency، geo-replication، backpressure، throttling، autoscaling، multi-tenancy
* ؜**زیرساخت/تکنولوژی (فقط اگر ذکر شده)؜**: microservices، rest، kafka، redis، memcached

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue|fa)

## ؜درک مسئله

* ؜**پرامپت اصلی؜**: طراحی یک distributed message queue.
* ؜**موارد استفاده؜**: اصلی: ارتباط asynchronous بین سرویس‌های producer و consumer برای decoupled کردن و مدیریت خرابی‌ها؛ ثانویه: پشتیبانی از scalability تحت بار بالا، persistence داده، و extensions احتمالی مثل ایجاد/حذف queue.
* ؜**خارج از دامنه؜**: SLAهای خاص، cost-effectiveness، جلوگیری از duplicate مگر اینکه لازم، جزئیات security فراتر از پایه، تضمین ordering strict.
* ؜**APIها (اگر بحث شده)؜**: Send message (producer به queue)، receive message (queue به consumer)؛ احتمالی create/delete queue، delete message.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue|fa)

## ؜الزامات و محدودیت‌ها

جدا کردن ؜**بیان‌شده در ویدیو؜** در مقابل ؜**فرضیات؜** (محافظه‌کارانه، توجیه‌شده).

* ؜**الزامات عملکردی؜**
  - ؜بیان‌شده در ویدیو: Send message (producer به queue)، receive message (queue به یک consumer)؛ تمایز از topics (one-to-many).
  - ؜فرضیات: پشتیبانی از ایجاد queue؛ احتمالی delete queue/message؛ بدون duplicate اگر exactly-once لازم باشد.
* ؜**الزامات غیرعملکردی؜**: 
  - ؜بیان‌شده در ویدیو: Scalability برای افزایش بار؛ high availability برای خرابی‌های سخت‌افزاری/شبکه‌ای؛ high performance برای latency کم send/receive؛ durability برای persistence داده.
  - ؜فرضیات: At-least-once delivery به عنوان تعادل؛ pull model برای simplicity.
* ؜**ورودی‌های ظرفیت؜** (فقط اگر بیان شده): در ویدیو بیان نشده.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue|fa)

## ؜تخمین پشت‌پاکت (فقط اگر اعداد وجود داشته باشند)

*“در ویدیو بیان نشده—پرش از تخمین عددی.”*

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue|fa)

## ؜معماری سطح بالا

بولت‌های متنی، شبیه دیاگرام بر اساس ویدیو:

* ورود کلاینت از طریق ‫VIP (hostname نمادین) که به load balancerها resolve می‌شود برای routing درخواست.
* ؜‫Load balancerها (با primary/secondary برای HA، VIP partitioning برای scale) به FrontEnd web service توزیع می‌کنند.
* ؜‫FrontEnd (stateless، چند-DC): اعتبارسنجی درخواست‌ها، مدیریت auth/authz، TLS termination (از طریق proxy)، server-side encryption، caching (queue metadata/user info)، rate limiting (مثل leaky bucket)، dispatching به backend/metadata، deduplication، جمع‌آوری usage.
* ؜‫Metadata service (facade caching روی DB): ذخیره اطلاعات queue (نام، ایجاد، config)؛ مدیریت خواندن‌های زیاد/نوشتن‌های کم؛ گزینه‌ها: replication کامل در هر node، sharded با دسترسی مستقیم، یا sharded با forwarding.
* ؜‫Backend service: persistence پیام‌ها (memory/disk)، replication داده، retrieval، cleanup.
* کامپوننت‌های async: ‫Replication (sync/async)؛ cleanup پیام (delayed jobs یا visibility timeouts).
* ؜‫Observability: Metrics/logs از سرویس‌ها برای dashboards/alerts؛ monitoring queue مشتری.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue|fa)

## ؜غواصی‌های عمیق بر اساس زیرسیستم (تکرار به نیاز)

## ؜زیرسیستم: FrontEnd Web Service

* ؜**نقش و مسئولیت‌ها؜**: پردازش اولیه درخواست: اعتبارسنجی (پارامترها/محدودیت‌ها)، auth/authz، TLS termination (از طریق proxy)، server-side encryption، caching، rate limiting، dispatching به metadata/backend، deduplication (از طریق cache)، جمع‌آوری usage.
* ؜**مدل داده (فقط از ویدیو)؜**: در ویدیو بیان نشده.
* ؜**APIها/قراردادها؜**: Dispatching send/receive message.
* ؜**Scaling و Partitioning؜**: Hostهای stateless در data centerها؛ افزودن بیشتر برای بار.
* ؜**استراتژی Caching؜**: Queue metadata و user info؛ صرفه‌جویی در فراخوانی DB.
* ؜**مدل Consistency؜**: برای metadata الزامی نیست.
* ؜**بوتلنک‌ها و Hot Keyها + کاهش‌ها؜**: فراخوانی‌های remote کند با bulkhead/circuit breakers ایزوله می‌شوند.
* ؜**مدیریت خرابی؜**: Retries، deduplication برای پاسخ‌های شکست‌خورده.
* ؜**ملاحظات هزینه؜**: در ویدیو بیان نشده.

[Ask AI: Subsystem - ؜FrontEnd Web Service](https://alisol.ir/?ai=Subsystem%20-%20FrontEnd%20Web%20Service%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue|fa)

## ؜زیرسیستم: Metadata Service

* ؜**نقش و مسئولیت‌ها؜**: لایه caching برای queue metadata (نام، ایجاد، config) بین FrontEnd و DB؛ خواندن‌های زیاد، نوشتن‌های کم.
* ؜**مدل داده (فقط از ویدیو)؜**: نام queue، تاریخ/زمان ایجاد، صاحب، تنظیمات config.
* ؜**APIها/قراردادها؜**: Query برای leader/cluster queue.
* ؜**Scaling و Partitioning؜**: داده کامل در هر node (cache کوچک)، یا sharded (consistent hashing ring).
* ؜**استراتژی Caching؜**: Shardهای in-memory؛ strong consistency ترجیحی اما الزامی نیست.
* ؜**مدل Consistency؜**: Strongly consistent ترجیحی برای اجتناب از بروزرسانی‌های concurrent.
* ؜**بوتلنک‌ها و Hot Keyها + کاهش‌ها؜**: Load balancer برای nodeهای برابر؛ sharding برای داده بزرگ.
* ؜**مدیریت خرابی؜**: Replicated در nodeها.
* ؜**ملاحظات هزینه؜**: در ویدیو بیان نشده.

[Ask AI: Subsystem - ؜Metadata Service](https://alisol.ir/?ai=Subsystem%20-%20Metadata%20Service%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue|fa)

## ؜زیرسیستم: Backend Service

* ؜**نقش و مسئولیت‌ها؜**: Persistence پیام‌ها (memory/disk)، replication، retrieval، cleanup.
* ؜**مدل داده (فقط از ویدیو)؜**: پیام‌ها با offsets؛ queueهای partitioned برای بزرگ‌ها.
* ؜**APIها/قراردادها؜**: ذخیره/retrieve پیام‌ها.
* ؜**Scaling و Partitioning؜**: Leader-based (per queue/partition) یا cluster-based (3-4 node در cluster، assignment/split queueها).
* ؜**استراتژی Caching؜**: در ویدیو بیان نشده.
* ؜**مدل Consistency؜**: بسته به replication (sync برای durability).
* ؜**بوتلنک‌ها و Hot Keyها + کاهش‌ها؜**: Queueهای بزرگ partitioned؛ clusterهای overheated اجتناب.
* ؜**مدیریت خرابی؜**: Replication (sync/async)؛ leader election یا انتخاب random node.
* ؜**ملاحظات هزینه؜**: در ویدیو بیان نشده.

[Ask AI: Subsystem - ؜Backend Service](https://alisol.ir/?ai=Subsystem%20-%20Backend%20Service%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue|fa)

## ؜تریدآف‌ها و آلترناتیوها

| موضوع                                             | گزینه A | گزینه B | تمایل ویدیو | توجیه (از ویدیو) |
| ------------------------------------------------- | -------- | -------- | ------------ | ------------------ |
| سبک ارتباط | Synchronous | Asynchronous | Asynchronous | Async خدمات را decoupled می‌کند، مدیریت خرابی آسان‌تر. |
| سازمان‌دهی Backend | Leader-based (in-cluster manager) | Leaderless (out-cluster manager) | هر دو قابل قبول | Leader ساده اما نیاز به election؛ leaderless election را اجتناب اما مدیریت clusterها. |
| Replication داده | Synchronous | Asynchronous | بسته به نیاز | Sync برای durability؛ async برای performance. |
| تحویل پیام | At-most-once | At-least-once | At-least-once | تعادل durability/performance؛ exactly-once سخت به دلیل خرابی‌ها. |
| مدل Consumer | Pull | Push | Pull | ساده‌تر برای پیاده‌سازی. |
| Ordering پیام | Strict FIFO | Relaxed | Relaxed | Strict throughput را محدود می‌کند در سیستم‌های distributed. |
| حذف پیام | Immediate | Delayed (مثل visibility timeout) | Delayed | At-least-once را پشتیبانی؛ جلوگیری از duplicate. |
| ذخیره‌سازی | Database | File system + memory | File system + memory | بهتر برای throughput بالا نسبت به offload به DB. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue|fa)

## ؜قابلیت اطمینان، در دسترس بودن، و عملکرد

* ؜‫Replication/quorum/consistency: داده replicated sync/async در host/clusterها؛ quorum ذکر نشده.
* بودجه latency در لایه‌ها: بالاتر برای sync replication؛ FrontEnd ساده نگه داشته برای سرعت.
* ؜‫Backpressure و throttling: Rate limiting (leaky bucket) از overload حفاظت می‌کند.
* ؜‫Load shedding و degradation: Circuit breakers خرابی‌ها را ایزوله می‌کنند.
* بازیابی فاجعه (RPO/RTO اگر بیان شده): در ویدیو بیان نشده؛ redundancy در DCها برای HA.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue|fa)

## ؜امنیت و حریم خصوصی (اگر بحث شده)

* ؜‫AuthN/AuthZ: FrontEnd کاربران ثبت‌شده و دسترسی queue را verify می‌کند.
* مدیریت PII: در ویدیو بیان نشده.
* ؜‫Encryption: TLS برای transit؛ server-side برای storage.
* جلوگیری از سوءاستفاده: Rate limiting، validation.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue|fa)

## ؜قابلیت مشاهده (اگر بحث شده)

* ؜‫Metrics، logs، tracing: هر سرویس برای dashboards/alerts emit می‌کند.
* ؜‫SLO/SLA، alerting: سلامت و وضعیت queue مشتری را monitor؛ integration مشتری.
* ؜‫Canaries: در ویدیو بیان نشده.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue|fa)

## ؜سؤالات پیگیری (از مصاحبه‌کننده، اگر وجود داشته باشند)

در ویدیو بیان نشده.

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue|fa)

## ؜سؤالات کاندید (اگر در ویدیو مدل‌سازی شده)

* ؜throughput و latency SLAهای مورد انتظار چیست؟
* آیا باید exactly-once delivery را پشتیبانی کنیم؟
* الزاماتی برای ordering پیام یا دوره‌های retention؟
* چگونگی مدیریت queueها یا پیام‌های خیلی بزرگ؟

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue|fa)

## ؜takeaways کلیدی

* الزامات ambiguous را زود روشن کن، تمرکز روی core APIهای send/receive.
* از الگوهای distributed استاندارد استفاده کن: VIP + LB + FrontEnd + Metadata + Backend.
* ؜‫FrontEnd کارهای web رایج را مدیریت می‌کند تا backend روی storage/replication تمرکز کند.
* گزینه‌های backend coordination complexity را با simplicity تعویض می‌کنند (leader vs. ؜clusters).
* گزینه‌های replication durability و performance را بالانس می‌کنند.
* ؜semantics تحویل: At-least-once عملی؛ exactly-once چالش‌برانگیز.
* ؜‫Pull model ساده‌تر از push؛ relaxed FIFO برای throughput بهتر.
* ایجاد queue از طریق API برای کنترل؛ deletion با احتیاط برای اجتناب از آسیب.
* همه چیز را monitor کن: سرویس‌ها و queueهای مشتری برای reliability.
* سیستم scalable/available از طریق افزودن horizontal و multi-DC.
* از database برای ذخیره core اجتناب؛ file system را برای throughput بالا ترجیح بده.
* همیشه خرابی‌ها را در نظر بگیر: Replicas، isolations، deduplication.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue|fa)

## ؜واژه‌نامه (اصطلاحات استفاده‌شده در ویدیو)

* ؜‫Distributed Message Queue: کامپوننت برای ارتباط asynchronous one-to-one در ماشین‌ها.
* ؜‫VIP: Virtual IP، hostname نمادین که به load balancer resolve می‌شود.
* ‫؜Load Balancer: درخواست‌ها را در سرورها route می‌کند؛ primary/secondary برای HA.
* ؜‫FrontEnd Service: پردازش اولیه مثل validation، auth، encryption.
* ؜‫Metadata Service: Queue info را cache می‌کند روی DB.
* ؜‫Backend Service: پیام‌ها را persist و replicate می‌کند.
* ؜‫Leader Election: Host اصلی را برای مدیریت queue assign می‌کند.
* ؜‫Replication: داده را برای durability کپی می‌کند (sync/async).
* ؜‫Delivery Semantics: تضمین‌هایی مثل at-least-once.
* ؜‫Pull/Push Model: Consumer poll می‌کند یا notified می‌شود.
* ؜‫FIFO: First-in, first-out ordering.
* ؜‫Rate Limiting: حجم درخواست را کنترل می‌کند (مثل leaky bucket).

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CSystem%20Design%20Interview%7CSystem%20Design%20Interview%20-%20Distributed%20Message%20Queue|fa)

## ؜Attribution

* ویدیو منبع: ‫https://www.youtube.com/watch?v=iJLL-KPqBpM
* کانال: ‫System Design Interview
* نکته: این سند خلاصه مصاحبه آزمایشی لینک‌شده است.

## ؜درباره summarizer

من *Ali Sol* هستم، یک توسعه‌دهنده PHP. ؜بیشتر بدانید:

* وبسایت: [alisol.ir](https://alisol.ir)
* لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
