# ؜خلاصه مصاحبه طراحی سیستم: طراحی Distributed Key-Value Store
- ؜؜**کانال/مصاحبه‌گر؜**: Tushar Roy - ؜Coding Made Simple  
- ؜؜**مدت؜**: ۰۰:۴۰:۵۱  
- ؜؜**ویدیو اصلی؜**: https://www.youtube.com/watch?v=rnZmdmlR-2M

این سند یک خلاصه‌ی روان از محتوای مصاحبه‌ی طراحی سیستم است. ؜تماشای ویدیو به‌طور کامل توصیه می‌شود.

---

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=47fdb3b8 -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=fa&src=mock-interviews/system-design/Design%20Distributed%20Key-Value%20Store) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=mock-interviews/system-design/Design%20Distributed%20Key-Value%20Store) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=mock-interviews/system-design/Design%20Distributed%20Key-Value%20Store) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=mock-interviews/system-design/Design%20Distributed%20Key-Value%20Store) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=mock-interviews/system-design/Design%20Distributed%20Key-Value%20Store) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=fa&src=mock-interviews/system-design/Design%20Distributed%20Key-Value%20Store) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=mock-interviews/system-design/Design%20Distributed%20Key-Value%20Store) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=mock-interviews/system-design/Design%20Distributed%20Key-Value%20Store) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=mock-interviews/system-design/Design%20Distributed%20Key-Value%20Store) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=mock-interviews/system-design/Design%20Distributed%20Key-Value%20Store) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=mock-interviews/system-design/Design%20Distributed%20Key-Value%20Store) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=mock-interviews/system-design/Design%20Distributed%20Key-Value%20Store)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=mock-interviews/system-design/Design%20Distributed%20Key-Value%20Store) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=mock-interviews/system-design/Design%20Distributed%20Key-Value%20Store) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=mock-interviews/system-design/Design%20Distributed%20Key-Value%20Store)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=fa&src=mock-interviews/system-design/Design%20Distributed%20Key-Value%20Store)
<!-- LH-BUTTONS:END -->

## ؜خلاصه‌ی یک‌صفحه‌ای (مطالعه ۲–۳ دقیقه‌ای)

؜**صورت مسئله (یک‌خطی)؜**  
طراحی یک دیتابیس توزیع‌شده‌ی Key–Value با مقیاس‌پذیری افقی و ؜**strong consistency؜** که عملیات پایه‌ی جدول و کلید را پشتیبانی کند.

؜**دامنه‌ی اصلی؜**  
- ؜در دامنه: اولویت با ؜**durability؜**، سپس ؜**availability؜** بر ؜**performance؜**؛ ؜**strong consistency؜**؛ ؜**leader-based replication؜**؛ ؜**partitioning / split؜** روی جداول داغ؛ سرویس ؜**metadata؜**؛ ؜**request routing؜**؛ ؜**append-only log؜** + ؜**index store؜**؛ مسیرهای ؜**read/write؜**؛ عملیات ؜**control-plane؜**‌ (انتخاب ؜**leader؜**، تعویض نود، ؜**live split/migration؜**)؛ حالت‌های خرابی. ؜ 
- ؜خارج از دامنه: تراکنش‌های کامل ؜**ACID؜** (بدون اتمیّت چندکلیدی و isolation)، قفل‌های جدول/سطر، امنیت عمیق (فرض ؜**client-side encryption؜**)، جزئیات ؜**cross-DC performance tuning؜**.

؜**اولویت‌های ناپذیرشی (Non-Functional)؜**  
۱) ؜**Durability؜** → ۲) ؜**Availability؜** → ۳) ؜**Performance؜**. ؜در ؜**partition؜**، ؜**consistency؜** را بر ؜**availability؜** ترجیح بده.

؜**قیود و اعداد کلیدی؜**  
- ؜گروه‌های ؜**replication؜** سه‌تایی (یا پنج‌تایی) با یک ؜**leader؜**. ؜ 
- ؜ظرفیت هر نود: ~۵‌ TB؛ ۱۰۰ گروه ؜**replication؜** ≈ ~۵‌ PB داده‌ی منطقی (به‌دلیل کپی یکسان روی replicaها). ؜ 
- ؜راهنمای اندازه‌ی کلید: حدود ۳۰ بایت متادیتا (شامل یک ؜**sequencer؜** ۱۶‌بایتی). ؜ 
- ؜سقف اندازه‌ی ؜**value؜**: ۱ MB (مقادیر بزرگ‌تر را به ؜**blob/object storage؜** بسپار). ؜ 
- ؜؜**IOPS؜** هر گروه (مثال): ~۲۰۰۰. ؜ 
- ؜؜**Sequencer؜**: ۱۶ بایت (timestamp ns + per-node counter + node id)؛ «آخرین نوشتن برنده است» (؜**last write wins؜**).

؜**معماری سطح‌بالا (متنی)؜**  
- ؜؜**Load Balancer → Request Managers؜** (stateless): مسیریابی عملیات با ؜**cached metadata؜**. ؜ 
- ؜؜**Metadata Manager؜** (اجماع‌محور): انتخابات ؜**leader؜** برای هر ؜**replication group؜**؛ نگاشت ؜**range؜** جدول‌ها به گروه‌ها. ؜ 
- ؜؜**Replication Groups (۳ یا ۵ نود)؜**: یک ؜**leader؜** و ؜**followers؜**؛ ؜**quorum write؜**؛ ؜**followers؜** از ؜**leader؜** عقب‌نشینی می‌کنند (؜**tail؜**). ؜ 
- ؜؜**Node Storage Engine؜**: ؜**append-only log؜** (دوام) + ؜**in-memory؜** + ؜**on-disk index؜** (؜**B+ tree؜** یا ؜**LSM-tree؜**). ؜ 
- ؜؜**Controller؜**: ؜**health check؜**؛ تعویض نودهای عقب‌مانده؛ ؜**split؜** جداول داغ/بزرگ و ؜**orchestrate live migration؜**. ؜ 
- ؜؜**Clients؜**: APIهای CRUD پایه برای ؜**table/key؜** و ؜**range scan؜**.

؜**تجارت‌آف‌های اصلی؜**  
- ؜؜**Strong consistency؜** در برابر ؜**availability؜** هنگام ؜**partition؜** (انتخاب ؜**consistency؜**). ؜ 
- ؜؜**B+ tree؜** (مناسب خواندن) در برابر ؜**LSM-tree؜** (نوشتن‌محور). ؜ 
- ؜۳ ؜**replica؜** (کم‌هزینه‌تر) در برابر ۵ (دوام/دسترس‌پذیری بالاتر). ؜ 
- ؜؜**Single-leader؜** ساده در برابر ؜**multi-leader؜** پیچیده با احتمال ؜**availability؜** بیشتر.

؜**ریسک‌ها/خرابی‌های مهم؜**  
- ؜؜**Split brain؜** (دو ؜**leader؜** هم‌زمان) → کاهش با ؜**majority ack؜** و تأیید ؜**leader؜**. ؜ 
- ؜عدم دسترس‌پذیری موقت هنگام ؜**re-election؜**. ؜ 
- ؜؜**Network split؜** در ؜**metadata manager؜** و ؜**stale routing؜** در ؜**request manager؜** → رد‌کردن عملیات توسط ؜**replication group؜** و ؜**refresh؜** متادیتا. ؜ 
- ؜؜**Lagging followers؜** → تعویض خودکار توسط ؜**controller؜**. ؜ 
- ؜؜**Live table split؜** → ؜**dual-read؜** تا پایان ؜**migration؜** (حل تعارض با ؜**sequencer؜**).

؜**فلش‌کارت مرور ۵ دقیقه‌ای؜**  
- ؜س: اولویت با ؜**durability؜**، ؜**availability؜** یا ؜**performance؜**؟  
  ج: ؜**Durability → Availability → Performance؜**. ؜ 
- ؜س: چرا یک ؜**leader؜** برای هر ؜**replication group؜**؟  
  ج: برای ؜**strong consistency؜**؛ همه‌ی ؜**read/write؜**ها از ؜**leader؜** می‌گذرند. ؜ 
- ؜س: ؜**write؜** چه زمانی ؜**ack؜** می‌شود؟  
  ج: بعد از ثبت روی ؜**leader؜** و حداقل یک ؜**follower؜** (اکثریت). ؜ 
- ؜س: تعارض ؜**concurrent writes؜** چطور حل می‌شود؟  
  ج: با ؜**sequencer؜** ۱۶‌بایتی؛ مقدار بالاتر برنده است (؜**last write wins؜**). ؜ 
- ؜س: چرا ؜**append-only log؜**؟  
  ج: نوشتن ترتیبیِ بادوام؛ پس از ؜**reboot؜** می‌توان ؜**index؜** را ؜**replay؜** کرد. ؜ 
- ؜س: با جداول داغ چه می‌کنیم؟  
  ج: ؜**controller؜** ؜**range split؜** می‌کند؛ در ؜**migration؜**، ؜**dual-read؜** و حل با ؜**sequencer؜**. ؜ 
- ؜س: جلوی ؜**two leaders؜** را چه می‌گیرد؟  
  ج: ؜**new leader؜** باید از اکثریت تأیید بگیرد؛ ؜**followers؜** فقط از ؜**recognized leader؜** می‌پذیرند. ؜ 
- ؜س: اگر ؜**metadata؜** در ؜**request manager؜** ؜**stale؜** بود؟  
  ج: ؜**replication group؜** رد می‌کند؛ ؜**RM؜** ؜**refresh؜** و ؜**retry؜** می‌کند. ؜ 
- ؜س: ؜**B+ tree؜** یا ؜**LSM-tree؜**؟  
  ج: ؜**B+؜** برای ؜**read-heavy؜**، ؜**LSM؜** برای ؜**write-heavy؜**. ؜ 
- ؜س: چرا سقف ؜**value؜** ≈ ۱ MB؟  
  ج: ؜**blob/object storage؜** برای مقادیر بزرگ مناسب‌تر است.

[🧠 پرسش از AI: خلاصه اجرایی](https://alisol.ir/?ai=Executive%20Summary%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

---

## ؜برچسب‌های مصاحبه (برای فیلتر بعدی)
- ؜؜**دامنه/صنعت؜**: `storage`  
- ؜؜**الگوی محصول؜**: `caching` *(به‌عنوان کاربرد اصلی KV)*  
- ؜؜**نگرانی‌های سیستمی؜**: `high-availability`، `hot-key`  
- ؜؜**فناوری/اشاره‌شده؜**: `cassandra`  
[🧠 پرسش از AI: برچسب‌ها](https://alisol.ir/?ai=Interview%20Tags%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

---

## ؜درک مسئله
؜**پرامپت اصلی؜**  
طراحی یک KV توزیع‌شده با تأکید بر ؜**strong consistency؜**، ؜**durability؜** و ؜**scalable partitioning؜**.

؜**Use Caseها؜**  
- ؜نگه‌داری و بازیابی ؜**key→value؜** داخل ؜**table؜**ها. ؜ 
- ؜؜**sorted list/scan؜** روی کلیدها با ؜**pagination؜**. ؜ 
- ؜تاب‌آوری در برابر خرابی نود، ؜**hot partition؜** و تعویض ؜**leader؜**.

؜**خارج از دامنه؜**  
- ؜؜**multi-key transactions؜**، قفل‌های جدول/سطر، جزئیات امنیتی عمیق (فرض ؜**client-side encryption؜**).

؜**APIها (در سطح بالا)؜**  
- ؜؜**Create/Delete table؜**؛ ؜**Put/Get/Delete key؜**؛ ؜**List/Scan؜** با ؜**pagination؜**. ؜؜**schema؜**های دقیق درخواست/پاسخ ذکر نشده‌اند.

[🧠 پرسش از AI: درک مسئله](https://alisol.ir/?ai=Problem%20Understanding%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

---

## ؜نیازمندی‌ها و قیود
؜**آنچه در ویدیو بیان شد؜**  
- ؜؜**strong consistency؜** با ؜**single-leader per replication group؜** و ؜**quorum write ack؜**. ؜ 
- ؜؜**durability؜** با ؜**append-only logs؜**؛ ؜**index؜** در صورت نیاز ؜**rebuild؜** می‌شود. ؜ 
- ؜؜**availability؜** بر ؜**performance؜** ترجیح دارد اما پس از ؜**durability؜**؛ عدم‌دسترس‌پذیری کوتاه هنگام ؜**leader election؜** پذیرفتنی است. ؜ 
- ؜؜**metadata manager؜** برای نگاشت ؜**(range → group)؜** و رهگیری ؜**leader؜**. ؜ 
- ؜؜**controller؜** برای تعویض نود و ؜**range split/migration؜**. ؜ 
- ؜سقف ؜**value؜** ≈ ۱ MB؛ برای مقادیر بزرگ از ؜**blob storage؜** استفاده کن. ؜ 
- ؜؜**key metadata؜** شامل ؜**sequencer؜** ۱۶‌بایتی (ns timestamp + per-node counter + node id). ؜ 
- ؜؜**request managers؜** متادیتا را ؜**cache؜** می‌کنند؛ در ؜**rejection؜**، ؜**refresh؜** می‌کنند.

؜**فرضیات؜**  
- ؜؜**client library؜**ها ؜**retry/idempotency؜** را در ؜**write timeout؜**ها هندل می‌کنند. ؜ 
- ؜؜**metrics/alerts؜** برای ؜**lagging followers؜** و پیشرفت ؜**migration؜** وجود دارد. ؜ 
- ؜پیش‌فرض تک‌منطقه؛ ؜**cross-DC؜** تأخیر را بالا می‌برد.

[🧠 پرسش از AI: نیازمندی‌ها و قیود](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

---

## ؜برآورد سرانگشتی
بیان نشده — ؜**skip؜**.

[🧠 پرسش از AI: برآورد](https://alisol.ir/?ai=Estimation%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

---

## ؜معماری سطح‌بالا
- ؜؜**Client → Load Balancer → Request Manager (RM)؜**: ؜**RM؜** با ؜**cached metadata؜**، گروه و ؜**leader؜** صحیح را برای ؜**key-range؜** می‌یابد؛ در ؜**cache miss/rejection؜**، با ؜**metadata manager؜** همگام می‌شود. ؜ 
- ؜؜**Metadata Manager؜**: دیتاست کوچکِ بسیار سازگار (اجماع‌محور). ؜رهگیری ؜**leaders؜** و ؜**range ownership؜**؛ ؜**push update؜** به ؜**RM؜**ها؛ ؜**backup؜** مکرر. ؜گزینه‌ها: ؜**ZooKeeper / etcd / Raft/Paxos؜**. ؜ 
- ؜؜**Replication Group (RG)؜**: ۳ یا ۵ نود؛ یک ؜**leader؜** برای همه‌ی ؜**reads/writes؜**؛ ؜**followers؜** از ؜**leader؜** ؜**replicate؜** می‌کنند؛ ؜**majority quorum؜** برای ؜**write؜**. ؜ 
- ؜؜**Storage Engine؜** روی هر نود: ؜**append-only log؜** (دوام) + ؜**index؜** (؜**B+ tree؜** یا ؜**LSM-tree؜**). ؜ 
- ؜؜**Controller؜**: پایش ؜**I/O؜** و اندازه؛ جایگزینی ؜**lagging follower؜**؛ ؜**live range split؜** با ؜**dual-read؜** تا اتمام ؜**migration؜**.

[🧠 پرسش از AI: معماری سطح‌بالا](https://alisol.ir/?ai=High-Level%20Architecture%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

---

## ؜زیرسیستم‌ها (Deep Dive)

؜### ؜Metadata Manager
- ؜؜**نقش؜**: ؜**leader election؜** برای هر ؜**RG؜**؛ نگاشت ؜**(table, key-range) → RG؜**؛ پخش به‌روزرسانی به ؜**RM؜**ها؛ ؜**backup؜**های پرتکرار. ؜ 
- ؜؜**مدل داده؜**: رکوردهایی برای ؜**table؜**‌ها، ؜**range؜**ها (مثلاً `[A,C)`، `[C,L)`)؛ شناسه‌ی ؜**RG؜** و ؜**current leader؜** هر ؜**RG؜**. ؜ 
- ؜؜**مقیاس‌پذیری/سازگاری؜**: بسیار سازگار؛ ؜**majority write؜**. ؜ 
- ؜؜**خرابی‌ها؜**: ؜**network partition؜** → سوءِ‌همگامی اقلیت؛ ؜**RM؜**های اقلیت ممکن است ؜**misroute؜** کنند ولی ؜**RG؜** رد می‌کند و ؜**refresh؜** را مجبور می‌کند. ؜ 
[🧠 پرسش از AI: Metadata Manager](https://alisol.ir/?ai=Subsystem%20-%20Metadata%20Manager%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

؜### ؜Replication Group (Leader/Follower)
- ؜؜**نقش؜**: مالک ؜**table range؜**؛ پردازش ؜**Get/Put/Delete/List؜** از طریق یک ؜**leader؜**. ؜ 
- ؜؜**مسیر نوشتن؜**: ؜**leader؜** به ؜**log؜** خود ؜**append؜** می‌کند → به ؜**followers؜** ؜**replicate؜** می‌کند → با ؜**majority ack؜** (شامل ؜**leader؜**) موفق می‌شود. ؜ 
- ؜؜**مسیر خواندن؜**: برای ؜**strong consistency؜** به ؜**leader؜** هدایت می‌شود. ؜ 
- ؜؜**مدیریت خرابی؜**: با خرابی ؜**leader؜**، ؜**metadata manager؜** ؜**new leader؜** را انتخاب می‌کند؛ ؜**followers؜** فقط از ؜**recognized leader؜** می‌پذیرند (جلوگیری از ؜**split brain؜**). ؜ 
[🧠 پرسش از AI: Replication Group](https://alisol.ir/?ai=Subsystem%20-%20Replication%20Group%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

؜### ؜Request Manager (Frontdoor)
- ؜؜**نقش؜**: مسیریاب ؜**stateless؜** با ؜**in-memory view؜** از متادیتا؛ ؜**retry on rejection؜**؛ ؜**streaming؜** نتایج ؜**list/scan؜** با ؜**pagination؜**. ؜ 
- ؜؜**Dual Reads در Migration؜**: هنگام ؜**range move؜**، ؜**RM؜** از ؜**source؜** و ؜**destination RG؜** هر دو می‌خواند و با ؜**sequencer؜** آشتی می‌دهد. ؜ 
[🧠 پرسش از AI: Request Manager](https://alisol.ir/?ai=Subsystem%20-%20Request%20Manager%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

؜### ؜Controller (Control Plane)
- ؜؜**نقش؜**: پایش سلامت و ؜**lag؜**؛ جایگزینی ؜**followers؜** عقب‌مانده؛ انتخاب ؜**split point؜**‌های کم‌هزینه؛ ؜**copy → cutover؜**. ؜ 
- ؜؜**جریان Split/Migration؜**: توقف ؜**writes؜** برای ؜**subrange؜** در ؜**source RG؜** → به‌روزرسانی ؜**metadata؜** → هدایت ؜**new writes؜** به ؜**destination RG؜** → ؜**bulk copy؜** و تداوم ؜**reads؜** با ؜**dual-read؜** → تکمیل و حذف ؜**special-range marker؜**. ؜ 
[🧠 پرسش از AI: Controller](https://alisol.ir/?ai=Subsystem%20-%20Controller%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

؜### ؜Storage Engine
- ؜؜**نقش؜**: ؜**append-only log؜** روی دیسک برای دوام؛ ؜**index؜** با ؜**B+ tree؜** یا ؜**LSM-tree؜**؛ در ؜**restart؜**، ؜**replay؜** برای بازسازی ؜**index؜**. ؜ 
- ؜؜**انتخاب؜**: ؜**B+ tree؜** برای ؜**read-heavy؜**؛ ؜**LSM-tree؜** برای ؜**write-heavy؜**. ؜ 
[🧠 پرسش از AI: Storage Engine](https://alisol.ir/?ai=Subsystem%20-%20Storage%20Engine%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

---

## ؜ترید‌آف‌ها و گزینه‌های جایگزین

| موضوع | گزینه A | گزینه B | گرایش ویدیو | استدلال (از ویدیو) |
|---|---|---|---|---|
| سازگاری در **partition** | **Strong (CP)** | **High availability (AP)** | **Strong** | **single leader**؛ **quorum write**؛ پذیرش **unavailability** کوتاه. |
| ساختار **index** | **B+ tree** | **LSM-tree** | وابسته به **workload** | انتخاب بر مبنای **read vs write**. |
| تعداد **replica** | ۳ نود | ۵ نود | پیش‌فرض ۳ | ۳=اکثریت با هزینه‌ی کمتر؛ ۵=تاب‌آوری بالاتر. |
| فناوری **metadata** | **ZooKeeper** | **etcd / Custom Raft** | نامثبت | هر **consensus-backed store** مناسب است. |
| نگه‌داری **value** | **Inline (≤1 MB)** | **External blob store** | برای بزرگ، **blob** | KV را سبک نگه‌دار. |

[🧠 پرسش از AI: تجارت‌آف‌ها](https://alisol.ir/?ai=Trade-offs%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

---

## ؜قابلیت اتکا، دسترس‌پذیری، و کارایی
- ؜؜**replication/quorum؜**: ؜**majority commit؜** دوام را تضمین می‌کند و تعویض ؜**leader؜** را ایمن می‌سازد. ؜ 
- ؜پنجره‌ی ؜**leader election؜**: ؜**unavailability؜** کوتاه تا ؜**new leader؜** تأیید اکثریت بگیرد. ؜ 
- ؜؜**follower lag؜**: ؜**controller؜** دنبال‌کننده‌های عقب‌مانده را جایگزین می‌کند. ؜ 
- ؜؜**backfill & rebuild؜**: ؜**log؜**ها اجازه‌ی ؜**replay؜** برای بازسازی ؜**index؜** بعد از ؜**crash؜** را می‌دهند. ؜ 
- ؜؜**table splits؜**: ؜**dual-read؜** در ؜**migration؜** صحت نتایج را تضمین می‌کند؛ ؜**sequencer؜** تعارض‌ها را حل می‌کند. ؜ 

[🧠 پرسش از AI: قابلیت اتکا و کارایی](https://alisol.ir/?ai=Reliability%20and%20Performance%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

---

## ؜امنیت و حریم خصوصی
فرض ؜**client-side encryption؜**؛ جزئیات دیگری ارائه نشده است.

[🧠 پرسش از AI: امنیت و حریم خصوصی](https://alisol.ir/?ai=Security%20and%20Privacy%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

---

## ؜مشاهده‌پذیری (Observability)
؜**health check/monitoring؜** توسط ؜**controller؜** تلویحاً مطرح شده؛ اما ؜**metrics/tracing/alerting؜** مشخص نشده است.

[🧠 پرسش از AI: مشاهده‌پذیری](https://alisol.ir/?ai=Observability%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

---

## ؜پرسش‌های پیگیری (Follow-up)
ذکر نشده.

[🧠 پرسش از AI: پرسش‌های پیگیری](https://alisol.ir/?ai=Follow-up%20Questions%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

---

## ؜پرسش‌های کاندید (Candidate)
ذکر نشده.

[🧠 پرسش از AI: پرسش‌های کاندید](https://alisol.ir/?ai=Candidate%20Questions%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

---

## ؜نکات کلیدی
- ؜؜**single leader per range؜** ساده و قابل پیش‌بینی است. ؜ 
- ؜دوام مقدم: ؜**append-only log؜** باعث قابل‌بازیابی بودن بعد از ؜**crash؜** می‌شود؛ ؜**index؜** با ؜**replay؜** بازسازی می‌شود. ؜ 
- ؜؜**quorum write؜** تضمین می‌کند داده‌ی ؜**ack؜**‌شده در تعویض ؜**leader؜** از دست نرود. ؜ 
- ؜جداول داغ را شناسایی و ؜**split؜** کن؛ ؜**dual-read؜** در ؜**migration؜** صحت را حفظ می‌کند. ؜ 
- ؜تازگی ؜**metadata؜** در ؜**client/RM؜** حیاتی است؛ ؜**reject + refresh؜** را طراحی کن. ؜ 
- ؜انتخاب ؜**B+ vs LSM؜** بر اساس ؜**read/write mix؜**؛ از ؜**large value؜** در KV بپرهیز. ؜ 
- ؜؜**ZooKeeper؜**/پیاده‌سازی اجماع دست‌ساز ممکن است عملیاتی سخت باشد؛ تا حد امکان از سرویس‌های ؜**Raft-based؜** مدیریت‌شده استفاده کن.

[🧠 پرسش از AI: نکات کلیدی](https://alisol.ir/?ai=Key%20Takeaways%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

---

## ؜واژه‌نامه
- ؜؜**Replication Group (RG)؜**: مجموعه‌ای از نودها (۳ یا ۵) که مالک یک ؜**key-range؜** هستند؛ یک ؜**leader؜** و چند ؜**follower؜**. ؜ 
- ؜؜**Sequencer؜**: شناسه‌ی ۱۶‌بایتی یکنوا (ns timestamp + per-node counter + node id) برای حل ؜**concurrent writes؜**. ؜ 
- ؜؜**Dual Read؜**: در ؜**migration؜**، خواندن از ؜**source؜** و ؜**destination؜** و آشتی با ؜**sequencer؜**. ؜ 
- ؜؜**Append-Only Log؜**: ثبت ترتیبی عملیات برای دوام و ؜**replay؜**. ؜ 
- ؜؜**B+ Tree / LSM-tree؜**: ساختارهای ؜**on-disk index؜**؛ ؜**B+؜** مناسب ؜**read؜**؛ ؜**LSM؜** مناسب ؜**write؜**. ؜ 
- ؜؜**Split Brain؜**: دو نود هم‌زمان نقش ؜**leader؜** بگیرند؛ با ؜**majority recognition؜** جلوگیری می‌شود.

[🧠 پرسش از AI: واژه‌نامه](https://alisol.ir/?ai=Glossary%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

---

## ؜برنامه‌ی مطالعه (اختیاری)
- ؜مرور اصول ؜**consensus؜** (Raft/Paxos) و جزئیات ؜**leader election؜**. ؜ 
- ؜تمرین طراحی ؜**range-splitting؜** و ؜**dual-read migration؜**. ؜ 
- ؜پیاده‌سازی آزمایشی یک KV با ؜**append-only log + LSM index؜** برای درک بهتر تجارت‌آف‌ها. ؜ 
- ؜تمرین ؜**failure-mode handling؜**: از دست‌دادن ؜**leader؜**، ؜**follower lag؜**، ؜**stale metadata؜**، ؜**network partition؜**. ؜ 

[🧠 پرسش از AI: برنامه‌ی مطالعه](https://alisol.ir/?ai=Study%20Plan%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Distributed%20Key-Value%20Store|fa)

---

## ؜انتساب
- ؜؜**ویدیو منبع؜**: https://www.youtube.com/watch?v=rnZmdmlR-2M  
- ؜؜**کانال؜**: Tushar Roy - ؜Coding Made Simple  
- ؜؜**یادداشت؜**: این سند خلاصه‌ای از مصاحبه‌ی لینک‌شده است.

---

## ؜درباره‌ی خلاصه‌کننده
من *Ali Sol*، ؜**PHP Developer؜** هستم:  
- ؜وب‌سایت: [alisol.ir](https://alisol.ir)  
- ؜لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
