# ؜‫مصاحبه شبیه‌سازی‌شده طراحی سیستم: Design Distributed Locking Service | With Ex-Google SWE

- ؜؜**کانال/مصاحبه‌کننده؜**: Jordan has no life
- ؜؜**مدت زمان؜**: 00:28:14
- ؜؜**ویدیوی اصلی؜**: https://www.youtube.com/watch?v=Lp8oITg0MiI

> *این سند، خلاصه‌ای از محتوای کلیدی یک مصاحبه شبیه‌سازی‌شده طراحی سیستم است. ؜پیشنهاد می‌کنم اگر ممکن است، ویدیوی کامل را تماشا کنید.*

---

# ؜‫خلاصه اجرایی یک‌صفحه‌ای

- ؜؜**صورت مسئله (یک‌خطی)؜**: طراحی یک سرویس قفل توزیع‌شده که تضمین کند exclusion متقابل بین چندین نود، حتی در حضور خرابی‌های سخت‌افزاری.
- ؜؜**دامنه اصلی؜**: ساخت یک قفل تحمل‌پذیر خطا برای هماهنگی دسترسی به منابع اشتراکی مثل فایل‌های S3؛ تمرکز روی consistency، replication و مدیریت خرابی. ؜خارج از دامنه: برنامه‌ریزی ظرفیت دقیق فراتر از مدیریت انتزاعی تا ۱۰۰ نود.
- ؜؜**اولویت‌های غیرعملکردی؜**: Strong consistency، تحمل خطا، بار کم روی سیستم؛ هیچ هدف خاصی برای latency یا هزینه بیان نشده.
- ؜؜**محدودیت‌ها و اعداد کلیدی؜**: تا ۱۰۰ نود که ممکن است برای یک قفل رقابت کنند؛ هیچ QPS، اندازه داده یا منطقه‌ای مشخص نشده.
- ؜؜**معماری سطح بالا (متنی)؜**:
  - ؜کلاینت‌ها از طریق WebSocket به یک کلاستر consensus توزیع‌شده (مثل مبتنی بر Raft) متصل می‌شوند برای کسب قفل، heartbeatها و اعلان‌ها.
  - ؜نود leader پیشنهادها را مدیریت می‌کند و به followerها replicate می‌کند برای تأیید اکثریت.
  - ؜از fencing tokenها (توالی‌های افزایشی monotonic) برای جلوگیری از writeهای stale استفاده کن.
  - ؜کلاینت‌های منتظر را در صف بگذار تا از thundering herd جلوگیری شود؛ فقط بعدی را در زمان آزادسازی مطلع کن.
  - ؜hashmap در حافظه برای خواندن سریع وضعیت قفل، پشتیبان‌گیری‌شده توسط log توزیع‌شده.
  - ؜قفل‌ها را از طریق TTL منقضی کن و heartbeats برای بازیابی خرابی.
- ؜؜**تریدآف‌های اصلی؜**:
  - ؜Strong consistency نیاز به consensus دارد و مقداری performance را برای correctness فدا می‌کند.
  - ؜Single-leader replication ریسک از دست رفتن داده در failover دارد؛ multi-leader quorumها ریسک خواندن stale یا rollbackهای شکست‌خورده.
  - ؜Synchronous replication روی همه نودها بلاک می‌کند و availability را کاهش می‌دهد؛ asynchronous پیشرفت را اجازه می‌دهد اما ریسک inconsistency.
  - ؜اندازه کلاستر بزرگ‌تر تحمل خطا را افزایش می‌دهد اما عملیات را کندتر می‌کند.
  - ؜Polling در مقابل push notification: Polling بار اضافه می‌کند؛ push (WebSocket) کارآمد است اما نیاز به اتصالات پایدار دارد.
- ؜؜**بزرگ‌ترین ریسک‌ها/حالات خرابی؜**:
  - ؜خواندن stale که اجازه می‌دهد چندین نود فکر کنند قفل را دارند و منابع اشتراکی را خراب کنند.
  - ؜مکث garbage collection یا خرابی نود که منجر به انقضای زودرس قفل می‌شود.
  - ؜Failover در setups single-leader که writeهای replicate‌نشده را از دست می‌دهد و tokenها را تکراری می‌کند.
  - ؜Thundering herd از اعلان‌های همزمان که سیستم را overload می‌کند.
  - ؜Partitionهای شبکه که باعث split-brain یا quorumهای حل‌نشده می‌شود.
  - ؜نبود heartbeat که قفل‌های فعال را به اشتباه منقضی می‌کند.
- ؜؜**فلش‌کارت‌های مرور ۵ دقیقه‌ای؜**:
  - ؜س: Distributed lock چیست؟ ج: مکانیسمی برای exclusion متقابل بین چندین نود برای جلوگیری از دسترسی همزمان به منابع اشتراکی.
  - ؜س: چرا strong consistency؟ ج: برای جلوگیری از خواندن stale جایی که چندین نود فکر می‌کنند قفل را دارند.
  - ؜س: Fencing tokenها چیستند؟ ج: توالی‌های افزایشی که به کسب قفل‌ها اختصاص داده می‌شوند برای رد writeهای stale.
  - ؜س: چرا نه single-leader async replication؟ ج: ریسک writeهای از دست‌رفته در failover که منجر به tokenهای تکراری می‌شود.
  - ؜س: چرا نه full synchronous replication؟ ج: هیچ تحمل خطایی ندارد؛ خرابی یک نود همه writeها را بلاک می‌کند.
  - ؜س: آیا quorumها strongly consistent هستند؟ ج: نه، ممکن است در rollback writeهای جزئی شکست بخورند یا linearizability نداشته باشند.
  - ؜س: Raft چطور تضمین می‌کند writeها از دست نروند؟ ج: Leader election نودهایی با logهای up-to-date از epoch قبلی را ترجیح می‌دهد.
  - ؜س: چطور از thundering herd جلوگیری کنیم؟ ج: کلاینت‌های منتظر را در صف بگذار و فقط بعدی را در آزادسازی مطلع کن.
  - ؜س: چرا WebSocketها؟ ج: برای heartbeatهای کارآمد و push notificationها بدون overhead تکراری HTTP.
  - ؜س: وضعیت قفل را چه چیزی پشتیبان می‌گیرد؟ ج: Log توزیع‌شده برای persistence، hashmap در حافظه برای خواندن سریع.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE|fa)

---

# ؜‫تگ‌های مصاحبه

- ؜؜**دامنه/صنعت؜**: Not stated in video
- ؜؜**الگوی محصول؜**: Not stated in video
- ؜؜**نگرانی‌های سیستم؜**: high-availability, eventual-consistency
- ؜؜**زیرساخت/تکنولوژی (فقط اگر ذکر شده)؜**: websocket, cassandra

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE|fa)

---

# ؜‫درک مسئله

- ؜؜**صورت مسئله اصلی؜**: طراحی یک سرویس قفل توزیع‌شده.
- ؜؜**موارد استفاده؜**: اصلی: تضمین اینکه فقط یک نود در یک زمان به منبع اشتراکی (مثل نوشتن در فایل S3) دسترسی داشته باشد تا از corruption جلوگیری شود. ؜فرعی: مدیریت تا ۱۰۰ نود که برای قفل رقابت می‌کنند.
- ؜؜**خارج از دامنه؜**: Not stated in video.
- ؜؜**APIها (اگر بحث شده)؜**: “Not stated in video”

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE|fa)

---

# ؜‫الزامات و محدودیت‌ها

- ؜؜**الزامات عملکردی؜**:
  - ؜کسب و آزادسازی قفل‌ها با exclusion متقابل.
  - ؜اختصاص fencing tokenها برای جلوگیری از writeهای stale.
  - ؜صف‌بندی و اعلان کلاینت‌های منتظر.
  - ؜Heartbeat برای تشخیص خرابی و انقضای قفل از طریق TTL.
- ؜؜**الزامات غیرعملکردی؜**: Strong (linearizable) consistency برای جلوگیری از چندین دارنده؛ تحمل خطا در برابر خرابی نودها؛ حداقل بار از polling.
- ؜؜**ورودی‌های ظرفیت؜**: مدیریت انتزاعی برای تا ۱۰۰ نود همزمان؛ هیچ QPS، نسبت read/write یا متریک دیگری بیان نشده.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE|fa)

---

# ؜‫تخمین پشت‌پاکت‌نامه

*“Not stated in video—skipping numerical estimation.”*

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE|fa)

---

# ؜‫معماری سطح بالا

- ؜کلاینت‌ها اتصالات WebSocket به سرویس قفل برقرار می‌کنند برای درخواست‌ها، heartbeatها و اعلان‌ها.
- ؜سرویس از یک کلاستر consensus توزیع‌شده (مثل ۳-۵ نود با Raft) استفاده می‌کند که leader پیشنهادهای قفل را مدیریت می‌کند.
- ؜پیشنهادها به followerها replicate می‌شوند؛ تأیید اکثریت قفل را به log توزیع‌شده commit می‌کند.
- ؜Hashmap در حافظه وضعیت قفل‌های فعلی را برای خواندن سریع نگه می‌دارد.
- ؜Fencing tokenها (توالی‌های افزایشی) در زمان کسب اختصاص داده می‌شوند.
- ؜کلاینت‌های منتظر را در صف هر قفل بگذار؛ فقط بعدی را در آزادسازی مطلع کن تا از overload جلوگیری شود.
- ؜Heartbeatها از طریق WebSocket خرابی‌ها را تشخیص می‌دهند؛ TTL قفل‌های مرده را منقضی می‌کند.
- ؜در write به منبع اشتراکی (مثل S3)، token را بگنجان؛ tokenهای پایین‌تر را رد کن.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE|fa)

---

# ؜‫غوطه‌وری عمیق در زیرسیستم‌ها

## ؜‫زیرسیستم: Consistency و Replication

- ؜؜**نقش و مسئولیت‌ها؜**: تضمین strong consistency و تحمل خطا برای وضعیت قفل‌ها بین نودها.
- ؜؜**مدل داده (فقط از ویدیو)؜**: Log توزیع‌شده برای رویدادهای قفل (کسب/آزادسازی)؛ hashmap در حافظه برای وضعیت‌های فعلی.
- ؜؜**APIها/قراردادها؜**: Not stated in video.
- ؜؜**مقیاس‌پذیری و پارتیشنینگ؜**: اندازه کلاستر ۳-۵ نود؛ بزرگ‌تر برای تحمل بیشتر، اما کندتر.
- ؜؜**استراتژی caching؜**: Hashmap در حافظه با log به عنوان backing store؛ هیچ TTL برای cache ذکر نشده.
- ؜؜**مدل consistency؜**: Strong/linearizable از طریق consensus.
- ؜؜**گلوگاه‌ها و hot keyها + کاهش‌دهنده‌ها: Contention بالا روی قفل‌های محبوب؛ با صف‌بندی و push notificationها کاهش می‌یابد.
- ؜؜**مدیریت خرابی؜**: Quorum اکثریت برای commitها؛ leader election logهای up-to-date را ترجیح می‌دهد؛ TTL و heartbeatها برای انقضا.
- ؜؜**ملاحظات هزینه؜**: Not stated in video.

[Ask AI: Subsystem - ؜Consistency and Replication](https://alisol.ir/?ai=Subsystem%20-%20Consistency%20and%20Replication%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE|fa)

## ؜‫زیرسیستم: تعامل کلاینت

- ؜؜**نقش و مسئولیت‌ها؜**: مدیریت درخواست‌های قفل، صف‌بندی، اعلان‌ها و heartbeatها.
- ؜؜**مدل داده (فقط از ویدیو)؜**: صف برای هر قفل برای کلاینت‌های منتظر.
- ؜؜**APIها/قراردادها؜**: Not stated in video.
- ؜؜**مقیاس‌پذیری و پارتیشنینگ؜**: Not stated in video.
- ؜؜**استراتژی caching؜**: Not stated in video.
- ؜؜**مدل consistency؜**: Not applicable.
- ؜؜**گلوگاه‌ها و hot keyها + کاهش‌دهنده‌ها: Thundering herd در آزادسازی؛ با اعلان فقط به بعدی در صف کاهش می‌یابد.
- ؜؜**مدیریت خرابی؜**: WebSocket برای اتصالات پایدار؛ انقضا در heartbeatهای از دست‌رفته.
- ؜؜**ملاحظات هزینه؜**: Not stated in video.

[Ask AI: Subsystem - ؜Client Interaction](https://alisol.ir/?ai=Subsystem%20-%20Client%20Interaction%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE|fa)

## ؜‫زیرسیستم: Fencing Tokens

- ؜؜**نقش و مسئولیت‌ها؜**: جلوگیری از writeهای stale یا منقضی‌شده توسط دارنده‌های قفل.
- ؜؜**مدل داده (فقط از ویدیو)؜**: Integer افزایشی monotonic برای هر کسب قفل.
- ؜؜**APIها/قراردادها؜**: Token را در writeها به منابع مثل S3 بگنجان.
- ؜؜**مقیاس‌پذیری و پارتیشنینگ؜**: Not stated in video.
- ؜؜**استراتژی caching؜**: Not stated in video.
- ؜؜**مدل consistency؜**: Linearizable از طریق consensus.
- ؜؜**گلوگاه‌ها و hot keyها + کاهش‌دهنده‌ها: Not stated in video.
- ؜؜**مدیریت خرابی؜**: منبع writeها با tokenهای پایین‌تر را رد می‌کند.
- ؜؜**ملاحظات هزینه؜**: Not stated in video.

[Ask AI: Subsystem - ؜Fencing Tokens](https://alisol.ir/?ai=Subsystem%20-%20Fencing%20Tokens%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE|fa)

---

# ؜‫تریدآف‌ها و آلترناتیوها

- ؜Strong در مقابل eventual consistency: Strong برای جلوگیری از چندین دارنده لازم است، اما overhead consensus دارد.
- ؜Single-leader async replication: ساده اما ریسک writeهای از دست‌رفته در failover.
- ؜Full synchronous replication: تحمل خطا ندارد چون روی همه نودها بلاک می‌کند.
- ؜مبتنی بر quorum (leaderless): به نظر consistent می‌رسد اما آسیب‌پذیر به شکست rollbackهای جزئی و غیرlinearizable.
- ؜Polling در مقابل push: Polling سیستم را load می‌کند؛ push (WebSocket/long-poll) کارآمد برای اعلان‌ها و heartbeatها.
- ؜اندازه کلاستر: کوچک‌تر سریع‌تر؛ بزرگ‌تر تحمل خطاهای بیشتری دارد.

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE|fa)

---

# ؜‫قابلیت اطمینان، دسترسی و عملکرد

- ؜Replication/quorum/consistency: Consensus سبک Raft با quorum اکثریت برای writeها؛ خواندن/writeهای linearizable.
- ؜بودجه latency بین لایه‌ها: Not stated in video.
- ؜Backpressure و throttling: صف‌بندی برای مدیریت contention؛ هیچ throttling صریحی نه.
- ؜Load shedding و degradation: Not stated in video.
- ؜بازیابی فاجعه (RPO/RTO اگر بیان شده): Log توزیع‌شده تضمین می‌کند writeهای commitشده از دست نروند؛ leader election از خرابی‌ها بازیابی می‌کند.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE|fa)

---

# ؜‫امنیت و حریم خصوصی

Not stated in video.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE|fa)

---

# ؜‫قابلیت مشاهده

Not stated in video.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE|fa)

---

# ؜‫سؤالات پیگیری

Not stated in video.

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE|fa)

---

# ؜‫سؤالات کاندیدا

Not stated in video.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE|fa)

---

# ؜‫نکات کلیدی

- ؜قفل‌های توزیع‌شده نیاز به strong consistency دارند تا از چندین دارنده که منابع اشتراکی را خراب می‌کنند جلوگیری شود.
- ؜Fencing tokenها تضمین می‌کنند قفل‌های منقضی نمی‌توانند write کنند با رد توالی‌های پایین‌تر.
- ؜Single-leader async replication در failover شکست می‌خورد به دلیل writeهای از دست‌رفته احتمالی.
- ؜Synchronous replication تحمل خطا ندارد چون روی همه نودها بلاک می‌کند.
- ؜Quorumها واقعاً strongly consistent نیستند به دلیل مشکلات rollback و نبود linearizability.
- ؜از consensus توزیع‌شده مثل Raft برای ذخیره‌سازی linearizable و تحمل‌پذیر خطا استفاده کن.
- ؜Backfill logها در Raft تضمین می‌کند leaderهای جدید همه writeهای commitشده را دارند.
- ؜کلاینت‌های منتظر را صف‌بندی کن و از push notificationها برای جلوگیری از thundering herd استفاده کن.
- ؜WebSocketها heartbeatهای کارآمد را بدون overhead polling فعال می‌کنند.
- ؜همیشه TTL روی قفل‌ها بگذار تا خرابی‌های دائمی کلاینت را مدیریت کند.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE|fa)

---

# ؜‫واژه‌نامه

- ؜؜**Distributed Lock؜**: مکانیسمی برای exclusion متقابل بین چندین نود فیزیکی.
- ؜؜**Fencing Token؜**: شماره توالی افزایشی برای اعتبار دارنده قفل فعلی.
- ؜؜**Linearizability؜**: مدل consistency که ordering واحد و cohesive عملیات را تضمین می‌کند.
- ؜؜**Quorum؜**: توافق اکثریت برای read/writeها در سیستم‌های replicateشده.
- ؜؜**Raft؜**: الگوریتم consensus برای replication تحمل‌پذیر خطا و linearizable.
- ؜؜**Thundering Herd؜**: هجوم همزمان که باعث overload می‌شود، مثلاً در آزادسازی قفل.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CJordan%20has%20no%20life%7CDesign%20Distributed%20Locking%20Service%20%7C%20With%20Ex-Google%20SWE|fa)

---

# ؜‫ارجاع

- ؜ویدیوی منبع: https://www.youtube.com/watch?v=Lp8oITg0MiI
- ؜کانال: Jordan has no life
- ؜نکته: این سند خلاصه‌ای از مصاحبه شبیه‌سازی‌شده لینک‌شده است.

---

# ؜‫درباره خلاصه‌کننده

من *Ali Sol* هستم، توسعه‌دهنده PHP. ؜بیشتر بدانید:

- ؜وب‌سایت: [alisol.ir](https://alisol.ir)
- ؜لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
