# ؜طراحی سیستم یک Online Code Editor با @CSDojo  
*(خلاصه مصاحبه System Design)*

- ؜؜**نوع مصاحبه؜**: ؜**System Design برای یک Online Code Editor با @CSDojo؜**  
- ؜؜**کانال؜**: ؜**Gaurav Sen؜**  
- ؜؜**مدت زمان ویدیو؜**: ؜**۲۴:۳۹؜**  
- ؜؜**لینک ویدیو؜**: https://www.youtube.com/watch?v=07jkn4jUtso  

> این فایل، خلاصه‌ی نکات مهم مصاحبه‌ی system design است. ؜اگر وقت داری، دیدن خود ویدیو هنوز هم ارزشمند است.

---

## ؜۲) خلاصه یک‌صفحه‌ای (برای مرور ۲–۳ دقیقه‌ای)

؜**صورت مسئله (خیلی کوتاه)؜**  
طراحی backend برای یک remote code execution engine که پشت یک Online IDE کار می‌کند؛ طوری که بتواند هزاران کاربر همزمان، latency پایین و حالت تعاملی شبیه interpreter (مثل Python REPL) را پشتیبانی کند.

؜**چیزهایی که داخل محدوده طراحی هستند؜**

- ؜تبدیل model قدیمی ؜**batch judge؜** مسابقات برنامه‌نویسی به تجربه‌ی ؜**request/response؜** برای Online IDE.
- ؜اجرای امن کد روی سرور با استفاده از ؜**container؜**‌ها.
- ؜مدیریت ؜**job scheduling؜** و ؜**queue؜** برای جلوگیری از overload شدن سرورها.
- ؜پشتیبانی هم‌زمان از اجرای کامل فایل و حالت ؜**interactive interpreter؜**.
- ؜نگه‌داشتن ؜**session state؜** برای sessionهای طولانی (مثلاً کاربر ۳۰ دقیقه روی یک کد کار می‌کند).
- ؜هندل کردن ؜**container crash؜**، ؜**health check؜** و recovery.

؜**خارج از محدوده (یا سطح بالا زده شده)؜**

- ؜جزییات UX فرانت‌اند (spinner، تبلیغ، layout و …) — بر عهده‌ی تیم Product.
- ؜طراحی ریز ؜**database schema؜** فراتر از mappingهای ساده مثل `session → code`، `request → metadata`.
- ؜جزییات ریز security (مثل policyهای sandbox، محدودیت network و …) غیر از این که می‌گوییم باید isolation با container داشته باشیم.
- ؜نحوه‌ی نصب تک‌تک runtimeها برای زبان‌های مختلف (در حد Concept گفته می‌شود).

؜**الویت‌های مهم غیر‌کارکردی (Non-Functional)؜**

- ؜؜**Latency پایین؜**: تجربه باید شبیه اجرای local حس شود.
- ؜؜**Scalability؜**: باید بتوانیم spikeهایی مثل هزاران کاربر همزمان را هندل کنیم.
- ؜؜**Security / Isolation؜**: کد کاربر نباید بتواند به بقیه‌ی سیستم یا کاربران آسیب بزند.
- ؜؜**Fault tolerance؜**: container و سرور crash می‌کنند؛ سیستم باید graceful recovery داشته باشد.
- ؜؜**Cost awareness؜**: یک container به ازای هر کاربر شاید خیلی گران باشد؛ باید به multi-tenancy فکر کنیم.
- ؜؜**User experience؜**: از hang طولانی باید جلوگیری شود؛ timeout و خطا باید شفاف به کاربر نشان داده شود.

؜**اعداد و محدودیت‌های مطرح‌شده در ویدیو؜**

- ؜مثال ؜**۵۰۰۰ کاربر همزمان؜**.
- ؜برای jobها یک ؜**TTL حدود ۱۰ ثانیه؜** پیشنهاد می‌شود، از لحظه‌ی ورود به queue تا اجرای نهایی.
- ؜؜request شامل متن کد و metadata مثل زبان (Python, Java, C++)، شناسه‌ی پروفایل/سشن و timestamp است.
- ؜؜response شامل `stdout`، `stderr` و وضعیت (موفق، exception، timeout) است.

؜**معماری High-Level (متنی)؜**

۱. ؜؜**Browser-based IDE؜**  
   - ؜کد، زبان و session/profile id را به backend می‌فرستد.

۲. ؜؜**API Server / Gateway؜**  
   - ؜؜request را می‌گیرد، خیلی سریع ؜**ack؜** می‌دهد و بعد از اجرای job، نتیجه را برمی‌گرداند. ؜ 
   - ؜در بعضی designها ممکن است تا حدی ؜**stateful؜** باشد (برای نگه‌داشتن mappingها یا session state).

۳. ؜؜**Task Queue / Job Scheduler؜**  
   - ؜؜rate ورودی را از ظرفیت compute جدا می‌کند. ؜ 
   - ؜؜jobها را نگه می‌دارد، TTL را enforce می‌کند و timeout را تشخیص می‌دهد.

۴. ؜؜**Worker Fleet داخل Container؜**  
   - ؜تعداد زیادی ؜**Linux container؜** که رویشان زبان‌های مختلف نصب است. ؜ 
   - ؜؜workerها job را از queue می‌کشند، کد را اجرا می‌کنند و `stdout` / `stderr` یا timeout را تولید می‌کنند.

۵. ؜؜**Result Event Channel؜**  
   - ؜؜worker نتیجه را به شکل `(request_id, result)` به سرور برمی‌گرداند (مثلاً با یک message bus).

۶. ؜؜**Persistent Storage؜**  
   - ؜نگه‌داری `session → code so far` و احتمالاً metadataهای مربوط به request. ؜ 
   - ؜برای replay کردن کدها در صورت crash شدن container استفاده می‌شود.

۷. ؜؜**Health Service؜**  
   - ؜روی containerها ؜**/health؜** می‌زند. ؜ 
   - ؜اگر container مرد، یک container جدید می‌سازد و mappingها را آپدیت می‌کند.

۸. ؜؜**Horizontal Partitioning؜**  
   - ؜کاربرها را بر اساس بازه‌ی user id بین چند cluster / region پخش می‌کنیم تا blast radius کم شود.

؜**Trade-offهای مهم؜**

- ؜؜**Stateless vs Stateful؜** برای پشتیبانی interpreter.
- ؜؜**یک container به ازای هر session؜** در مقابل ؜**container مشترک بین چند session؜**.
- ؜؜**درخواست sync؜** در مقابل ؜**queued execution؜** با backpressure.
- ؜؜**Isolation قوی (یک user در هر container)؜** در مقابل ؜**multi-tenancy؜** برای کاهش هزینه.
- ؜؜**Single region؜** در مقابل ؜**تقسیم کاربران بین چند region/cluster؜** بر اساس user id.

؜**ریسک‌ها و failure modeهای مهم؜**

- ؜؜crash شدن container وسط session و از دست رفتن state اگر replay نداشته باشیم.
- ؜؜overload شدن queue و طولانی شدن شدید زمان انتظار تا timeout.
- ؜؜overhead بالای health check وقتی هزاران container داریم.
- ؜؜noisy neighbor در حالت multi-tenant (تقسیم CPU / memory بین چند کاربر).
- ؜مشکل network (latency زیاد، packet loss) که تشخیص timeout را سخت می‌کند.

؜**فلش‌کارت مرور ۵ دقیقه‌ای؜**

۱. ؜؜**سوال:؜** چرا بین API Server و Execution Container از ؜**queue؜** استفاده می‌کنیم؟  
   ؜**جواب:؜** برای جدا کردن rate ورود requestها از ظرفیت compute و اعمال backpressure به جای overload کردن workerها.

۲. ؜؜**سوال:؜** request از IDE دقیقاً چه چیزهایی دارد؟  
   ؜**جواب:؜** متن کد، session/profile id، زبان و ممکن است timestamp هم داشته باشد.

۳. ؜؜**سوال:؜** response چه چیزهایی را برمی‌گرداند؟  
   ؜**جواب:؜** `stdout`، `stderr` و یک status مثل success/exception/timeout.

۴. ؜؜**سوال:؜** کی سراغ سرور ؜**stateful؜** می‌رویم؟  
   ؜**جواب:؜** وقتی حالت interpreter می‌خواهیم که سرور `code_so_far` را نگه دارد و فقط خط‌های جدید را اجرا کند.

۵. ؜؜**سوال:؜** چطور از crash container ریکاوری می‌کنیم؟  
   ؜**جواب:؜** کد session را که در storage داریم، روی یک container جدید replay می‌کنیم و mapping session را به آن container جدید وصل می‌کنیم.

۶. ؜؜**سوال:؜** چرا container مخصوص هر session جذاب است؟  
   ؜**جواب:؜** model ذهنی ساده‌ای است؛ هر user sandbox خودش را دارد (filesystem، network و runtime جدا).

۷. ؜؜**سوال:؜** چرا container per session گران است؟  
   ؜**جواب:؜** با هزاران کاربر همزمان، تعداد زیاد container باعث مصرف بالای resource، startup time زیاد و health-check سنگین می‌شود.

۸. ؜؜**سوال:؜** horizontal partitioning بر اساس user id چه کمکی می‌کند؟  
   ؜**جواب:؜** اگر یک cluster مشکل پیدا کند فقط بخشی از userها آسیب می‌بینند، نه همه.

۹. ؜؜**سوال:؜** مهم‌ترین تفاوت non-functional بین این سیستم و یک batch judge چیست؟  
   ؜**جواب:؜** این‌جا ؜**real-time latency؜** اولویت شماره‌ی یک است، نه throughput خالص.

۱۰. ؜؜**سوال:؜** چرا در کل engineerها stateless بودن سرویس‌ها را دوست دارند؟  
    ؜**جواب:؜** scale کردن ساده‌تر می‌شود، crash recovery راحت‌تر است و هر instance می‌تواند هر requestی را سرویس دهد چون state بیرون از خودش است.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

## ؜۳) برچسب‌های مصاحبه (برای فیلتر کردن بعداً)

؜**دامنه / صنعت؜**

- ؜`collaboration`

؜**الگوی Product؜**

- ؜`queue`
- ؜`job-scheduler`

؜**مسائل سیستمی؜**

- ؜`low-latency`
- ؜`high-availability`
- ؜`backpressure`
- ؜`autoscaling`
- ؜`multi-tenancy`

؜**زیرساخت / تکنولوژی؜**

- ؜`container` (به‌صورت مفهومی؛ صحبت از Linux containerها شده)
- ؜از ؜**task queue؜** و ؜**worker؜** صحبت می‌شود و Celery هم به‌عنوان مثال نام برده می‌شود.

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

## ؜۴) درک مسئله

؜**بازنویسی Prompt اصلی؜**  
یک remote code execution engine داریم که قبلاً برای مسابقات برنامه‌نویسی استفاده می‌شده. ؜حالا می‌خواهیم آن را به backend یک ؜**Online IDE؜** تبدیل / بازطراحی کنیم که هزاران کاربر بتوانند کد را همزمان روی آن اجرا کنند و تجربه‌ای شبیه اجرای local داشته باشند.

؜**Use Caseهای اصلی؜**

- ؜کاربر در مرورگر کد می‌نویسد، دکمه run را می‌زند و خروجی را سریع می‌بیند.
- ؜چند زبان مختلف مثل Python، Java، C++ پشتیبانی شود.
- ؜حالت ؜**interactive interpreter؜** مثل Python REPL در مرورگر وجود داشته باشد.
- ؜؜sessionهای طولانی (کاربر ده‌ها دقیقه در یک صفحه) ساپورت شود.
- ؜سیستم زیر بار زیاد همچنان رفتار معقولی داشته باشد.

؜**Use Caseهای جانبی که به آن اشاره می‌شود؜**

- ؜همان execution engine می‌تواند برای مسابقات (batch judge) هم استفاده شود.
- ؜می‌توان userها را بین regionهای مختلف (یا shardها) تقسیم کرد.

؜**چیزهایی که عمداً در این بحث باز نمی‌شود؜**

- ؜جزییات UI/UX مثل نمایش spinner، تبلیغ، modalها و ….
- ؜؜authentication / authorization / billing.
- ؜؜logging، analytics و metrics فراتر از health check سطح بالا.

؜**APIها (به صورت ضمنی)؜**

- ؜؜**Request از سمت Browser به Server؜**  
  - ؜`profile_id` یا `session_id`  
  - ؜`code_text` (کل فایل یا فقط snippet جدید)  
  - ؜`language` (مثلاً `"python"`، `"java"`، `"cpp"`)  
  - ؜احتمالاً timestamp یا metadata دیگر

- ؜؜**Response از Server به Browser؜**  
  - ؜`stdout`  
  - ؜`stderr`  
  - ؜`status` (موفق، خطا، timeout)  
  - ؜در حالت timeout، پیغامی شبیه "server load بالا بوده یا مشکل network بوده" برمی‌گردد.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

## ؜۵) Requirements و Constraints

### ؜۵.۱ نیازمندی‌های Functional

؜**از خود ویدیو؜**

- ؜گرفتن کد از کاربر از طریق وب IDE.
- ؜اجرای کد به‌صورت remote و داخل ؜**container؜**‌های ایزوله.
- ؜پشتیبانی از چند زبان (Python, Java, C++ و …).
- ؜حالت اجرای کامل فایل (مانند compiler) و حالت interpreter مانند.
- ؜نگهداری ؜**state؜** بین چند run برای یک session.
- ؜هندل کردن هزاران session همزمان.
- ؜هندل کردن ؜**timeout؜** و نشان دادن مناسب آن به کاربر.
- ؜تشخیص crash شدن container و recover کردن.

؜**فرضیات (به‌صراحت گفته‌شده)؜**

- ؜سیستم authentication وجود دارد ولی در این بحث باز نمی‌شود.
- ؜ذخیره‌سازی و مدیریت پروژه‌ها (save/open) خارج از scope این بحث است.

### ؜۵.۲ نیازمندی‌های Non-Functional

؜**براساس ویدیو؜**

- ؜؜Latency پایین؛ تجربه باید قابل قبول و در حد چند ثانیه باشد.
- ؜جلوگیری از overload: queue و container management باید بار را کنترل کنند.
- ؜مدل ذهنی ساده و scalable: queue فاصله‌ای بین rate ورود requestها و توان پردازشی ایجاد می‌کند.
- ؜؜High availability: سقوط یک region یا shard نباید همه را از کار بیندازد.
- ؜امکان scale افقی با اضافه کردن server / container.

؜**فرضیات؜**

- ؜؜Target latency دقیق عددی داده نشده؛ اما "چند ثانیه" قابل قبول فرض شده.
- ؜؜Consistency فقط در سطح هر session مهم است؛ sessionهای مختلف لازم نیست نسبت به هم strong consistency داشته باشند.

### ؜۵.۳ ورودی‌های Capacity

؜**گفته‌شده در ویدیو؜**

- ؜مثال ؜**۵۰۰۰ کاربر همزمان؜**.
- ؜؜TTL حدود ؜**۱۰ ثانیه؜** برای jobها در کل مسیر queue + execution.

؜**چیزهایی که عدد نداریم؜**

- ؜؜QPS دقیق، read/write ratio.
- ؜حجم روزانه داده‌ها و retention.
- ؜بودجه CPU / memory به ازای هر session.
- ؜تعداد دقیق region یا data center.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

## ؜۶) تخمین‌های سرانگشتی (Back-of-the-Envelope)

در خود ویدیو وارد محاسبات عددی دقیق (حجم storage، bandwidth، تعداد shard و …) نمی‌شود؛ فقط مثال ۵۰۰۰ کاربر همزمان را می‌زند. ؜ 
بنابراین در این خلاصه، وارد تخمین عددی نمی‌شویم.

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

## ؜۷) معماری High-Level

۱. ؜؜**Client (Browser IDE)؜**  
   - ؜؜editor و terminal/output view را نشان می‌دهد. ؜ 
   - ؜با HTTP/WebSocket (یا مشابه) کد را برای backend می‌فرستد. ؜ 
   - ؜در حین انتظار، spinner یا پیام "در حال اجرا..." نشان می‌دهد.

۲. ؜؜**API Gateway / Reverse Proxy؜**  
   - ؜تمام execution requestها را دریافت می‌کند. ؜ 
   - ؜بلافاصله یک ack (یا request_id) برمی‌گرداند. ؜ 
   - ؜؜mapping `request_id → session/user` را نگه‌ می‌دارد تا وقتی result برگشت، به client درست تحویل دهد.

۳. ؜؜**Task Queue؜**  
   - ؜؜execution jobها را در خود نگه می‌دارد. ؜ 
   - ؜؜arrival rate را از execution capacity جدا می‌کند. ؜ 
   - ؜روی jobها TTL می‌گذارد؛ اگر تا مثلا ۱۰ ثانیه اجرا نشد، timeout می‌شود.

۴. ؜؜**Worker Containerها؜**  
   - ؜مجموعه‌ای از Linux container که runtime زبان‌ها رویشان نصب است. ؜ 
   - ؜هر worker از queue job می‌کشد، کد را اجرا می‌کند، `stdout` / `stderr` را جمع می‌کند. ؜ 
   - ؜نتیجه را به سیستم مرکزی برمی‌گرداند.

۵. ؜؜**Session State Store؜**  
   - ؜نگه‌داری `session_id → code_so_far` و metadataهای session. ؜ 
   - ؜برای interpreter mode استفاده می‌شود تا فقط snippetهای جدید را اجرا کنیم. ؜ 
   - ؜هنگام crash، برای replay کردن state استفاده می‌شود.

۶. ؜؜**Container Manager + Health Service؜**  
   - ؜؜containerها را health check می‌کند. ؜ 
   - ؜در صورت crash، container جدید می‌سازد و mappingهای session را آپدیت می‌کند.

۷. ؜؜**Horizontal Partitioning Layer؜**  
   - ؜؜userها را بر اساس بازه‌های user id بین چند cluster / region پخش می‌کند. ؜ 
   - ؜باعث کاهش blast radius و ساده‌تر شدن scale می‌شود.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

## ؜۸) عمیق‌شدن در زیرسیستم‌ها

### ؜۸.۱ زیرسیستم: Request / Response Execution

؜**نقش؜**

- ؜؜entrypoint اصلی برای execution requestها از سمت browser.
- ؜تبدیل HTTP request به job در queue.
- ؜برگرداندن result به user وقتی job تمام شد.

؜**مدل داده (طبق ویدیو)؜**

- ؜`Request`  
  - ؜`request_id`  
  - ؜`profile_id` / `session_id`  
  - ؜`language`  
  - ؜`code_text`  
  - ؜`timestamp` (اختیاری)

- ؜`Result`  
  - ؜`request_id`  
  - ؜`stdout`  
  - ؜`stderr`  
  - ؜`status` (موفق، exception، timeout)

؜**قراردادهای API (استنباط شده)؜**

- ؜؜**POST /execute؜**  
  - ؜؜Body شامل فیلدهای بالا. ؜ 
  - ؜؜Response اولیه: ack + `request_id`. ؜ 
  - ؜؜Response نهایی (ممکن است در همان connection یا از طریق channel دیگری باشد): result.

؜**Scaling و Partitioning؜**

- ؜؜API layer را می‌توان به‌راحتی افقی scale کرد (Load Balancer + چندین instance). ؜ 
- ؜ممکن است requestها را بر اساس user id به cluster مربوط به خودش route کنیم.

؜**نحوه‌ی برخورد با خطا؜**

- ؜اگر job در queue از TTL بگذرد، برای user یک timeout برمی‌گردانیم. ؜ 
- ؜اگر packet دیر برسد یا delay network بالا باشد، ممکن است request را timeout شده فرض کنیم.

[Ask AI: Subsystem - ؜Request/Response Execution](https://alisol.ir/?ai=Subsystem%20-%20Request%2FResponse%20Execution%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

### ؜۸.۲ زیرسیستم: Task Queue و Workerها

؜**نقش؜**

- ؜؜**Queue؜**: buffer بین API و workerها. ؜ 
- ؜؜**Workerها؜**: jobها را از queue می‌کشند و اجرا می‌کنند.

؜**مدل داده؜**

- ؜؜**Queue entry؜**:  
  `(request_id, code_text, language, session_id, metadata)`

- ؜؜**Result event؜**:  
  `(request_id, result)` شامل stdout / stderr / status.

؜**تکنولوژی‌های اشاره‌شده؜**

- ؜یک abstract task queue. ؜ 
- ؜مثال: ؜**Celery؜** (یک task queue مبتنی بر Python).

؜**Scaling / Partitioning؜**

- ؜افزایش تعداد worker برای handle کردن jobهای بیشتر. ؜ 
- ؜؜queue و worker را می‌توان جدا از API server scale کرد.

؜**Hot Spotها / Bottleneckها؜**

- ؜طولانی شدن queue وقتی executionها طولانی هستند و worker کم داریم. ؜ 
- ؜؜backlog بزرگ → افزایش timeoutها.

؜**Failure Handling؜**

- ؜اگر job از TTL عبور کند، تبدیل به timeout می‌شود. ؜ 
- ؜اگر worker وسط کار crash کند، بسته به design می‌توان retry کرد یا خطا را به user نشان داد.

[Ask AI: Subsystem - ؜Task Queue & Workers](https://alisol.ir/?ai=Subsystem%20-%20Task%20Queue%20%26%20Workers%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

### ؜۸.۳ زیرسیستم: Session State و Containerها

؜**نقش؜**

- ؜نگه‌داشتن state session برای حالت interpreter. ؜ 
- ؜ایجاد و مدیریت محیط execution اختصاصی یا shared برای هر session.

؜**دو design اصلی که در ویدیو مقایسه می‌شود؜**

۱. ؜؜**سرور Stateless؜**  
   - ؜؜browser همه‌ی history کدها را نگه می‌دارد. ؜ 
   - ؜در هر request، همه‌ی کدهای قبلی را دوباره برای سرور می‌فرستد. ؜ 
   - ؜اگر سرور crash کند، از دید correctness مشکلی نیست چون browser می‌تواند همه‌ی history را دوباره بفرستد. ؜ 
   - ؜مشکل: latency و حجم request وقتی کد زیاد شود.

۲. ؜؜**سرور Stateful (انتخاب شده برای interpreter)؜**  
   - ؜سرور mapping `session_id → code_so_far` را نگه می‌دارد. ؜ 
   - ؜؜browser فقط snippet جدید را می‌فرستد. ؜ 
   - ؜سرور آن را به `code_so_far` اضافه و اجرا می‌کند. ؜ 
   - ؜؜UX بهتر برای sessionهای طولانی.

؜**Container per Session vs Container Shared؜**

- ؜؜**Container per Session؜**  
  - ؜هر user محیط کاملاً جدا دارد. ؜ 
  - ؜؜model ساده، isolation قوی. ؜ 
  - ؜از نظر resource برای هزاران user، گران.

- ؜؜**Container Shared بین چند Session؜**  
  - ؜چندین session به یک container map می‌شوند و process جدا دارند. ؜ 
  - ؜؜resource بهینه‌تر استفاده می‌شود، ولی complexity مدیریت resource و isolation بالاتر می‌رود.

؜**Crash Recovery؜**

- ؜`code_so_far` در database ذخیره می‌شود. ؜ 
- ؜در صورت crash:
  - ؜؜container جدید ساخته می‌شود. ؜ 
  - ؜؜history کد session روی آن container اجرا (replay) می‌شود. ؜ 
  - ؜؜mapping `session_id → container` به container جدید اشاره می‌کند.

[Ask AI: Subsystem - ؜Session State & Containers](https://alisol.ir/?ai=Subsystem%20-%20Session%20State%20%26%20Containers%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

### ؜۸.۴ زیرسیستم: Health Monitoring و Recovery

؜**نقش؜**

- ؜تشخیص containerهای unhealthy یا dead. ؜ 
- ؜جایگزینی containerهای خراب با نمونه‌های جدید.

؜**مکانیزم؜**

- ؜هر container یک endpoint به نام ؜**/health؜** دارد. ؜ 
- ؜یک ؜**Health Service؜** دوره‌ای این endpoint را چک می‌کند:
  - ؜اگر OK بود، container سالم فرض می‌شود.
  - ؜اگر چند بار fail شد، container مرده فرض می‌شود.

؜**Remediation (اقدام اصلاحی)؜**

- ؜ساخت container جدید. ؜ 
- ؜آپدیت mappingهای `session_id → container_address`. ؜ 
- ؜اگر لازم باشد، با استفاده از `code_so_far` state interpreter روی container جدید replay می‌شود.

؜**Cost / Complexity؜**

- ؜وقتی تعداد container زیاد شود، health check خودش می‌تواند بار قابل توجهی داشته باشد. ؜ 
- ؜به همین دلیل مسئله‌ی shared container و tuning health check مهم می‌شود.

[Ask AI: Subsystem - ؜Health Monitoring & Recovery](https://alisol.ir/?ai=Subsystem%20-%20Health%20Monitoring%20%26%20Recovery%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

### ؜۸.۵ زیرسیستم: Horizontal Partitioning و Multi-Tenancy

؜**نقش؜**

- ؜جلوگیری از این‌که failure یک نقطه، تمام userها را پایین بیاورد. ؜ 
- ؜ساده‌تر کردن scale و مدیریت capacity.

؜**رویکرد؜**

- ؜؜userها بر اساس بازه‌ی user id به clusterهای مختلف تقسیم می‌شوند، مثلاً:  
  - ؜؜userهای ۱ تا ۲۰۰ → Region/Cluster A  
  - ؜؜userهای ۲۰۱ تا ۴۰۰ → Region/Cluster B  
  - ؜؜userهای ۴۰۱ به بعد → Region/Cluster C  
- ؜هر region مجموعه‌ی خودش از API server، queue و container را دارد.

؜**مزایا؜**

- ؜؜crash یک cluster فقط روی همان segment از userها اثر می‌گذارد. ؜ 
- ؜می‌توان برای بخش‌های مختلف userها ظرفیت متفاوتی در نظر گرفت.

؜**Multi-tenancy؜**

- ؜داخل هر cluster، چند session می‌توانند روی یک container مشترک باشند تا هزینه کمتر شود. ؜ 
- ؜نیازمند مدیریت دقیق resource داخل container است تا noisy neighbor اتفاق نیفتد.

[Ask AI: Subsystem - ؜Horizontal Partitioning & Multi-tenancy](https://alisol.ir/?ai=Subsystem%20-%20Horizontal%20Partitioning%20%26%20Multi-tenancy%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

## ؜۹) Trade-offها و Alternativeها

| موضوع                                   | گزینه A                                   | گزینه B                                      | جهت‌گیری ویدیو                     | دلیل (طبق صحبت‌های ویدیو)                                                          |
| --------------------------------------- | ------------------------------------------ | -------------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------- |
| Server state برای interpreter           | سرویس کاملاً stateless؛ browser همه history را بفرستد | سرویس stateful که `code_so_far` را نگه می‌دارد | **Stateful برای interpreter**      | stateless robust است ولی latency را بالا می‌برد؛ stateful برای UX بهتر عملی‌تر است. |
| Container به ازای هر user/session       | یک container اختصاصی برای هر session      | چند session روی یک container                  | **تمایل به shared container**      | container per session برای ۵۰۰۰ user سنگین و گران است.                             |
| Sync vs async execution                 | request/response مستقیم، بدون queue        | اجرا از طریق queue با ack اولیه               | **معماری queue-based**            | queue جلوی overload را می‌گیرد و backpressure ایجاد می‌کند.                        |
| Mapping user به cluster                 | یک cluster global برای همه                | partition کردن بر اساس user id یا region      | **Partition بر اساس user id**      | failure یک cluster، فقط بخشی از userها را تحت تأثیر قرار می‌دهد.                   |
| بازیابی state بعد از crash             | از user می‌خواهیم دوباره run کند          | replay کردن session code روی container جدید   | **Replay کردن state**             | UX بهتر؛ کاربر کارش را از دست نمی‌دهد.                                             |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

## ؜۱۰) Reliability، Availability و Performance

؜**Reliability (قابلیت اتکا)؜**

- ؜فرض بر این است که container و سرور گاهی crash می‌کنند. ؜ 
- ؜برای بالا نگه داشتن reliability:
  - ؜نگه‌داشتن session code در storage پایدار.
  - ؜؜health check و ساخت خودکار container جدید.
  - ؜؜TTL روی jobها در queue تا jobهای گیر‌کرده سیستم را قفل نکنند.

؜**Availability (دسترس‌پذیری)؜**

- ؜؜horizontal partitioning بر اساس user id باعث می‌شود crash یک cluster، کل سیستم را نخواباند. ؜ 
- ؜اضافه کردن server/container ظرفیت و availability را هم‌زمان بالا می‌برد.

؜**Performance / Latency؜**

- ؜؜queue باعث می‌شود latency ورودی API از زمان واقعی execution جدا شود:
  - ؜؜Ack سریع: "درخواست را گرفتیم".
  - ؜نتیجه ممکن است زود یا همراه با تاخیر یا timeout بیاید.
- ؜استفاده از containerهای pre-warmed، cold start را کم می‌کند.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

## ؜۱۱) Security و Privacy

- ؜روی ؜**isolation با container؜** تأکید می‌شود تا کد user نتواند به host یا processهای دیگر آسیب بزند. ؜ 
- ؜جزییات دقیق‌تر مثل limit کردن CPU/memory، محدودیت network، policyهای filesystem و مدیریت PII در ویدیو باز نمی‌شود.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

## ؜۱۲) Observability

؜**Metrics / Health؜**

- ؜مکانیزم اصلی observability همان health check روی containerها است. ؜ 
- ؜چیزی درباره‌ی log aggregation، tracing یا dashboardها گفته نمی‌شود.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

## ؜۱۳) سوال‌های Follow-up مصاحبه‌گر

هدف کلی follow-upها در ویدیو این است که:

- ؜از حالت ؜**batch judge؜** به طراحی برای ؜**Online IDE؜** با هزاران user همزمان حرکت کنیم. ؜ 
- ؜کاندیدا مجبور شود درباره‌ی stateless vs stateful فکر کند، مخصوصاً در context interpreter. ؜ 
- ؜درباره‌ی rate crash containerها و اهمیت fault tolerance صحبت کند. ؜ 
- ؜مجبور شود به هزینه‌ی داشتن مثلاً ۵۰۰۰ container فکر کند و multi-tenancy را در نظر بگیرد.

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

## ؜۱۴) سوال‌هایی که کاندیدا می‌تواند بپرسد

چند نمونه از سوال‌های clarifying که در ویدیو به آن‌ها نزدیک می‌شود:

- ؜«آیا داریم برای ؜**batch evaluation؜** طراحی می‌کنیم یا برای یک ؜**real-time Online IDE؜**؟»  
- ؜«الگوی اجرای کد بیشتر شبیه ؜**compiler؜** (کل فایل) است یا ؜**interpreter؜** (خط‌به‌خط)؟»  
- ؜«می‌توانیم فرض کنیم session کاربر مثلاً تا ۳۰ دقیقه باز می‌ماند؟»  
- ؜«آیا اجازه داریم روی سرور برای هر session state نگه داریم یا باید کاملاً stateless باشیم؟»  
- ؜«از نظر هزینه، container per session قابل قبول است یا باید از multi-tenancy استفاده کنیم؟»  

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

## ؜۱۵) نکات کلیدی (Key Takeaways)

۱. ؜Online IDEها بیشتر از throughput، دنبال ؜**real-time latency؜** هستند؛ تصمیم‌های طراحی هم از همین‌جا می‌آید. ؜ 
۲. ؜؜**Task queue؜** برای جدا کردن traffic spike از توان compute و جلوگیری از overload حیاتی است. ؜ 
۳. ؜؜**Container؜** نقش مرز اصلی isolation و security را بازی می‌کند. ؜ 
۴. ؜برای interpreter، سرویس ؜**stateful؜** (با نگه‌داشتن session state) در عمل از سرویس کاملاً stateless مناسب‌تر است. ؜ 
۵. ؜؜**Container per session؜** از نظر ذهنی تمیز است، اما از نظر هزینه در scale بالا منطقی نیست؛ معمولاً به ؜**shared container؜** می‌رسیم. ؜ 
۶. ؜ذخیره‌ی session code اجازه می‌دهد بعد از crash، state را با replay برگردانیم. ؜ 
۷. ؜؜**Health check + auto recreation؜** ستون فقرات reliability سیستم execution است. ؜ 
۸. ؜؜**Horizontal partitioning؜** باعث کاهش blast radius و scale‌ کردن آسان‌تر می‌شود. ؜ 
۹. ؜کل design حول balance بین ؜**UX، هزینه و امنیت؜** می‌چرخد.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

## ؜۱۶) Glossary (واژگان)

- ؜؜**Remote Code Execution Engine؜**  
  backendی که کد را از کاربر می‌گیرد، روی سرور اجرا می‌کند و خروجی را برمی‌گرداند.

- ؜؜**Container؜**  
  محیط ایزوله سبک‌وزن (مثل یک OS کوچک) با filesystem و process و network جدا برای اجرای کد.

- ؜؜**Task Queue؜**  
  سرویس صف که jobها را از producer می‌گیرد و بعداً توسط worker مصرف می‌شود.

- ؜؜**Worker؜**  
  پروسه‌ای (معمولاً داخل container) که jobها را از queue می‌کشد و اجرا می‌کند.

- ؜؜**Stateless Service؜**  
  سرویسی که state session را در خودش نگه نمی‌دارد؛ state بیرون (storage، cache و …) ذخیره می‌شود.

- ؜؜**Stateful Service؜**  
  سرویسی که state مربوط به session را در memory یا storage local خودش نگه می‌دارد.

- ؜؜**Session ID؜**  
  شناسه‌ای برای تعامل جاری user با سیستم (مثلاً یک تب IDE).

- ؜؜**Health Check (`/health`)؜**  
  endpoint سبک برای بررسی alive بودن سرویس یا container.

- ؜؜**Horizontal Partitioning (Sharding)؜**  
  تقسیم userها یا داده‌ها به چند shard بر اساس بازه یا hash و سپردن هر shard به یک cluster جدا.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CGaurav%20Sen%7CSystem%20Design%20of%20an%20Online%20Code%20Editor%20with%20%40CSDojo|fa)

---

## ؜۱۸) Attribution (منابع)

- ؜؜**ویدیو اصلی؜**: https://www.youtube.com/watch?v=07jkn4jUtso  
- ؜؜**کانال؜**: ؜**Gaurav Sen؜**  
- ؜؜**توضیح؜**: این متن خلاصه‌ی مصاحبه‌ی موجود در لینک بالاست و تمام جزئیات معماری از روی صحبت‌های خود ویدیو استخراج شده است.

---

## ؜۱۹) درباره‌ی خلاصه‌کننده

من ؜**Ali Sol؜** هستم، PHP Developer. ؜بیشتر:

- ؜وب‌سایت: [alisol.ir](https://alisol.ir)  
- ؜لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)  
