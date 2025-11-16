# خلاصه کتاب: Site Reliability Engineering

* **نویسنده**: Google  
* **ژانر**: Software Engineering  
* **سال انتشار**: 2016  

این فایل خلاصه‌ای از مهم‌ترین مفاهیم و درس‌های کتاب **Site Reliability Engineering** است تا بتوانی سریع مرور و یادگیری داشته باشی. برای هر بخش، یک خلاصه، یک **مثال** و یک لینک برای جزئیات بیشتر گذاشته شده است.

## قبل از شروع

* من نکات کلیدی کتاب‌های کاربردی را خلاصه می‌کنم تا راحت‌تر و سریع‌تر یاد بگیری و مرور کنی.  
* بعد از هر بخش، روی لینک‌ّهای `Ask AI` کلیک کن تا عمیق‌تر وارد جزئیات همان قسمت بشوی.

---

## مقدمه

**خلاصه**: این فصل توضیح می‌دهد SRE (Site Reliability Engineering) در Google یعنی چه. ایده اصلی این است که عملیات (Ops) مثل یک مسئله نرم‌افزاری با آن برخورد شود؛ یعنی مهندس‌ها سیستم‌هایی می‌سازند که سرویس‌ها را در مقیاس خیلی بزرگ، قابل‌اعتماد نگه دارند. Ben Treynor Sloss توضیح می‌دهد که چطور نقش SRE از مدل سنتی sysadmin به یک نقش مهندسی‌تر با تمرکز روی automation و حذف کارهای دستی (toil) تکامل پیدا کرده. همچنین تفاوت مدل قدیمی Dev/Ops و مدل SRE را نشان می‌دهد؛ جایی که «reliability» هدف مشترک است و مفهوم‌هایی مثل error budget معرفی می‌شوند تا تعادلی بین سرعت توسعه و پایداری ایجاد شود.

**مثال**: تصور کن به جای این‌که یک تیم Ops همیشه دستی سرور را ری‌استارت کند، یک developer می‌آید و سیستمی می‌نویسد که خطاها را خودش شناسایی و به صورت خودکار رفع کند؛ شبیه یک اپ self-healing که بدون دخالت انسان خودش از خرابی برمی‌گردد.

**Link for More Details**:  
[Ask AI: Introduction](https://alisol.ir/?ai=Introduction%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜The Production Environment at Google, from the Viewpoint of an SRE

**خلاصه**: این بخش یک نگاه کلی به زیرساخت عظیم Google از دید یک SRE می‌دهد. درباره لایه‌های hardware، شبکه و software که سرویس‌هایی مثل Search و Gmail را پشتیبانی می‌کنند حرف می‌زند. از سیستم‌های توزیع‌شده، load balancing بین datacenterها و ابزارهای مدیریت fleetهای بزرگ ماشین‌ها صحبت می‌کند. تمرکز روی این است که SRE چطور در این محیط پیچیده، سرویس را پایدار نگه می‌دارد و با این فرض پیش می‌رود که «خرابی همیشه اتفاق می‌افتد» و باید برای آن آماده بود.

**مثال**: فرض کن زیرساخت Google مثل یک شهر خیلی بزرگ است: سرورها مثل ساختمان‌ها، شبکه‌ها مثل خیابان‌ها و SREها مثل شهرسازهایی هستند که حواس‌شان هست حتی در اوج ترافیک یا وقتی بعضی خیابان‌ها بسته می‌شوند، همچنان جریان ترافیک (ترافیک دیتا) روان بماند.

**Link for More Details**:  
[Ask AI: The Production Environment at Google, from the Viewpoint of an SRE](https://alisol.ir/?ai=The%20Production%20Environment%20at%20Google%2C%20from%20the%20Viewpoint%20of%20an%20SRE%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## پذیرش ریسک

**خلاصه**: این فصل توضیح می‌دهد که «پایداری ۱۰۰٪» همیشه هدف منطقی نیست؛ مهم «مدیریت هوشمند ریسک» است. Google از مفهوم error budget استفاده می‌کند تا میزان downtime قابل‌قبول را عددی کند و براساس آن، تیم‌ها بتوانند با خیال راحت featureهای جدید را push کنند. همچنین توضیح می‌دهد چطور با معیارهایی مثل availability ریسک را اندازه بگیریم و بین سرعت توسعه و stability تصمیم‌گیری کنیم.

**مثال**: شبیه رانندگی است: برای این‌که تصادف نکنی سرعتت را صفر نمی‌کنی؛ یک سرعت مطمئن و منطقی (مثل error budget) انتخاب می‌کنی که هم سریع برسی و هم ریسک را قابل‌قبول نگه داری.

**Link for More Details**:  
[Ask AI: Embracing Risk](https://alisol.ir/?ai=Embracing%20Risk%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Service Level Objectives (SLOها)

**خلاصه**: SLO قلب reliability در Google است؛ تعریف می‌کند «به اندازه کافی خوب» برای یک سرویس یعنی چه، آن هم بر اساس انتظار کاربر. این فصل درباره تنظیم targetهای واقع‌بینانه برای availability و latency، مانیتور کردن آن‌ها و استفاده از این عددها برای تصمیم‌گیری است. تمرکز روی چیزی است که کاربر واقعاً حس می‌کند، نه این‌که کورکورانه به دنبال ۱۰۰٪ uptime باشیم.

**مثال**: اگر اپ تو ۹۹.۹٪ مواقع زیر یک ثانیه لود می‌شود، این می‌شود SLO تو؛ اگر این عدد افت کند، مثل یک fitness tracker که وقتی از هدف روزانه‌ات عقب می‌افتی بهت هشدار می‌دهد، alertها فعال می‌شوند.

**Link for More Details**:  
[Ask AI: Service Level Objectives](https://alisol.ir/?ai=Service%20Level%20Objectives%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## حذف کارهای تکراری و دستی (Eliminating Toil)

**خلاصه**: toil یعنی کارهای تکراری و دستی که انرژی مهندس‌ها را می‌گیرد. این فصل درباره این است که چطور با automation این کارها را تا حد ممکن حذف کنیم. در SRE حداکثر ۵۰٪ زمان باید صرف کارهای عملیاتی شود و بقیه وقت روی نوشتن ابزار و سیستم بهتر. همچنین می‌گوید چطور toil را اندازه بگیریم و برنامه‌ریزی کنیم که به مرور آن را کاهش دهیم.

**مثال**: به جای این که هر بار deploy را دستی چک و approve کنی، یک ابزار می‌سازی که خودش همه‌چیز را validate کند؛ مثل این است که از شستن دستی ظرف‌ها به ماشین ظرف‌شویی مهاجرت کنی.

**Link for More Details**:  
[Ask AI: Eliminating Toil](https://alisol.ir/?ai=Eliminating%20Toil%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Monitoring Distributed Systems

**خلاصه**: monitoring فقط یعنی «alert بیاید» نیست؛ یعنی فهمیدن وضعیت سلامت یک سیستم distributed. این فصل درباره black-box و white-box monitoring، ساخت dashboardهای خوب و این‌که alert فقط وقتی باید page کند که واقعاً نیاز به اقدام انسانی باشد صحبت می‌کند. تأکید دارد که سیستم مانیتورینگ باید ساده، قابل‌فهم و مؤثر باشد، نه فقط پر از نمودار جذاب.

**مثال**: مانیتورینگ را مثل صفحه کیلومتر ماشین ببین: چند تا gauge مهم مثل سرعت و میزان بنزین نیاز داری، نه این‌که برای هر تکان ماشین یک اخطار جداگانه داشته باشی.

**Link for More Details**:  
[Ask AI: Monitoring Distributed Systems](https://alisol.ir/?ai=Monitoring%20Distributed%20Systems%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)  

[نوت شخصی: اصول این فصل هنوز معتبر است، ولی در ۲۰۲۵ معمولاً از ابزارهای observability مدرن مثل Prometheus و Grafana برای metrics و tracing در مقیاس بزرگ استفاده می‌شود.]

---

## ؜The Evolution of Automation at Google

**خلاصه**: این فصل داستان رشد automation در Google را تعریف می‌کند؛ از اسکریپت‌های ساده شروع شده و کم‌کم به سیستم‌های بزرگ برای کارهایی مثل deploy و تغییر config رسیده است. هدف کاهش خطای انسانی و افزایش سرعت و consistency است.

**مثال**: اوایل مثل این بود که برای حساب کردن، از یک ماشین حساب ساده استفاده کنی؛ الان شبیه این است که یک سیستم هوشمند داری که خودش کارهای تکراری را انجام می‌دهد و تو روی مسائل مهم‌تر تمرکز می‌کنی.

**Link for More Details**:  
[Ask AI: The Evolution of Automation at Google](https://alisol.ir/?ai=The%20Evolution%20of%20Automation%20at%20Google%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Release Engineering

**خلاصه**: در Google، releaseها هم زیادند و هم امن. این فصل درباره چیزهایی مثل canary release، تست و automation در build و deploy حرف می‌زند تا تغییرات بدون این‌که production را بشکنند، rollout شوند.

**مثال**: مثل این است که اول یک نان تست کوچک (canary) بپزی و تست کنی، بعد که مطمئن شدی خوب شده، کل نان را برای همه سرو کنی.

**Link for More Details**:  
[Ask AI: Release Engineering](https://alisol.ir/?ai=Release%20Engineering%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## سادگی (Simplicity)

**خلاصه**: سادگی یکی از کلیدهای reliability است. هر چقدر سیستم پیچیده‌تر شود، احتمال bug و سختی نگهداری بیشتر می‌شود. این فصل توصیه می‌کند سیستم‌ها را طوری طراحی کنیم که فهمیدن و کار کردن با آن‌ها ساده باشد، حتی وقتی در مقیاس بزرگ کار می‌کنند.

**مثال**: یک دوچرخه ساده خیلی راحت‌تر از یک موتور فوق‌پیچیده تعمیر می‌شود؛ سیستم نرم‌افزاری هم همین‌طور است.

**Link for More Details**:  
[Ask AI: Simplicity](https://alisol.ir/?ai=Simplicity%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Practical Alerting

**خلاصه**: alerting باید عملی و قابل‌اقدام باشد و مهندس را با صدها alert بی‌هوده خسته نکند. تمرکز این بخش روی استفاده از time-series data برای تعریف alertهایی است که هم زود مشکل را کشف کنند و هم false positive کمی داشته باشند.

**مثال**: شبیه یک smoke detector خوب که فقط وقتی واقعاً آتش‌سوزی است بوق می‌زند، نه هر بار که کمی نان می‌سوزد و دود می‌کند.

**Link for More Details**:  
[Ask AI: Practical Alerting](https://alisol.ir/?ai=Practical%20Alerting%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Being On-Call

**خلاصه**: on-call بودن یعنی آماده بودن برای واکنش سریع هنگام مشکل در سرویس. این فصل بهترین روش‌ها برای طراحی شیفت‌ها، handoff بین افراد و حفظ تعادل کار و زندگی را توضیح می‌دهد تا از burnout جلوگیری شود.

**مثال**: مثل آتش‌نشان شیفتی است: همیشه آماده‌ای که اگر زنگ خورد سریع واکنش نشان بدهی، ولی بین شیفت‌ها به اندازه کافی استراحت می‌کنی تا سر حال بمانی.

**Link for More Details**:  
[Ask AI: Being On-Call](https://alisol.ir/?ai=Being%20On-Call%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Effective Troubleshooting

**خلاصه**: troubleshooting باید سیستماتیک باشد: جمع‌آوری داده، فرضیه‌سازی، تست و تکرار. این فصل روی استفاده از ابزار و فرآیند برای debug کردن سیستم‌های توزیع‌شده تأکید می‌کند تا به‌جای حدس‌های تصادفی، روش‌مند عمل کنیم.

**مثال**: مثل حل یک پازل است؛ تکه‌ها را با نظم و منطق امتحان می‌کنی، نه این‌که هر تکه را تصادفی این‌طرف و آن‌طرف بگذاری.

**Link for More Details**:  
[Ask AI: Effective Troubleshooting](https://alisol.ir/?ai=Effective%20Troubleshooting%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Emergency Response

**خلاصه**: وقتی بحران پیش می‌آید، باید سریع و با نقش‌ها و ارتباطات واضح عمل کرد. این فصل روی کاهش MTTR (Mean Time To Repair) با آماده‌سازی، runbookها و تمرین‌های دوره‌ای تمرکز دارد.

**مثال**: شبیه تیم اورژانس بیمارستان است که هرکس نقش خودش را می‌داند و با سرعت و هماهنگی عمل می‌کند، بعد از حادثه هم بررسی می‌کنند چه چیزهایی را می‌شود بهتر کرد.

**Link for More Details**:  
[Ask AI: Emergency Response](https://alisol.ir/?ai=Emergency%20Response%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Managing Incidents

**خلاصه**: مدیریت incident از یک ساختار مشخص استفاده می‌کند: incident commander، مسئول عملیات، برنامه‌ریزی و ارتباطات. این ساختار کمک می‌کند وسط outage، chaos کنترل شود و همه بدانند چه کاری باید انجام دهند.

**مثال**: مثل زمانی است که یک گروه برای پیدا کردن فرد گمشده هماهنگ می‌شوند؛ یک نفر فرمانده است، بقیه کارهای اجرایی، لجستیک و اطلاع‌رسانی را انجام می‌دهند.

**Link for More Details**:  
[Ask AI: Managing Incidents](https://alisol.ir/?ai=Managing%20Incidents%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Postmortem Culture: Learning from Failure

**خلاصه**: فرهنگ postmortem بدون سرزنش (blameless postmortem) یعنی بعد از هر incident مهم، گزارش دقیقی نوشته می‌شود که روی «فرآیند و سیستم» تمرکز دارد، نه مقصر کردن افراد. هدف این است که از شکست‌ها یاد بگیریم و جلوی تکرار آن‌ها را بگیریم.

**مثال**: بعد از یک آتش‌سوزی در آشپزخانه، به جای مقصر کردن آشپز، بررسی می‌کنی چه چیزهایی اشتباه بوده (مثلاً نبودن کپسول آتش‌نشانی) و برای آینده آن را اصلاح می‌کنی.

**Link for More Details**:  
[Ask AI: Postmortem Culture: Learning from Failure](https://alisol.ir/?ai=Postmortem%20Culture%3A%20Learning%20from%20Failure%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Tracking Outages

**خلاصه**: ثبت دقیق outageها باعث می‌شود بتوانیم الگوها را پیدا کنیم و بهبود بدهیم. ابزارهایی برای جمع‌آوری و تحلیل این داده‌ها استفاده می‌شود تا علت‌های ریشه‌ای (root cause) بهتر دیده شوند.

**مثال**: مثل دفترچه گزارش یک کاپیتان کشتی است که همه مشکلات سفر را ثبت می‌کند تا دفعه بعد از تکرار همان اشتباه‌ها جلوگیری کند.

**Link for More Details**:  
[Ask AI: Tracking Outages](https://alisol.ir/?ai=Tracking%20Outages%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Testing for Reliability

**خلاصه**: reliability نتیجه تست جدی است: unit test، integration test و حتی chaos engineering برای شبیه‌سازی خرابی‌ها. این فصل توضیح می‌دهد که چطور با تست‌های هدف‌دار، مطمئن شویم سیستم در شرایط واقعی هم پایدار می‌ماند.

**مثال**: مثل crash test کردن ماشین قبل از فروش است تا مطمئن شوی در تصادف‌های واقعی هم عملکرد قابل‌قبولی دارد.

**Link for More Details**:  
[Ask AI: Testing for Reliability](https://alisol.ir/?ai=Testing%20for%20Reliability%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Software Engineering in SRE

**خلاصه**: SRE یعنی استفاده از software engineering برای حل مشکلات Ops. SREها ابزار و سیستم‌هایی می‌نویسند که در مقیاس بزرگ جواب بدهد؛ ترکیبی از مهارت‌های development و آشنایی عمیق با سیستم.

**مثال**: نوشتن یک سیستم auto-scaling برای سرورها مثل این است که یک روبات بسازی که خودش چمن حیاطت را همیشه مرتب نگه می‌دارد.

**Link for More Details**:  
[Ask AI: Software Engineering in SRE](https://alisol.ir/?ai=Software%20Engineering%20in%20SRE%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Load Balancing at the Frontend

**خلاصه**: load balancing در frontend ترافیک را بین سرورها توزیع می‌کند تا سرویس همیشه در دسترس باشد. این کار با روش‌هایی مثل DNS-based load balancing و virtual IP انجام می‌شود.

**مثال**: مثل پلیسی است که سر چهارراه ایستاده و ماشین‌ها را به خطوط خلوت‌تر هدایت می‌کند تا ترافیک روان بماند.

**Link for More Details**:  
[Ask AI: Load Balancing at the Frontend](https://alisol.ir/?ai=Load%20Balancing%20at%20the%20Frontend%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Load Balancing in the Datacenter

**خلاصه**: داخل datacenter هم باید load را بین ماشین‌ها و سرویس‌ها پخش کرد. این فصل از تکنیک‌هایی مثل consistent hashing و flow control صحبت می‌کند که کمک می‌کند سیستم در برابر خرابی‌ها graceful رفتار کند.

**مثال**: مثل مهمانی بزرگی است که مهمان‌ها را بین چند اتاق تقسیم می‌کنی تا هیچ اتاقی بیش از حد شلوغ نشود.

**Link for More Details**:  
[Ask AI: Load Balancing in the Datacenter](https://alisol.ir/?ai=Load%20Balancing%20in%20the%20Datacenter%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Handling Overload

**خلاصه**: وقتی سیستم overload می‌شود، باید هوشمندانه load را مدیریت کرد؛ مثلاً با priority دادن به درخواست‌های مهم‌تر، rate limit و backoff. این فصل توضیح می‌دهد چطور کیفیت سرویس برای کاربران مهم حفظ شود، حتی وقتی همه چیز زیر فشار است.

**مثال**: مثل رستوران شلوغی است که، وقتی جا پر است، مشتری‌های بدون رزرو را رد می‌کند ولی رزروی‌ها را راه می‌دهد تا سرویس برای آن‌ها خوب بماند.

**Link for More Details**:  
[Ask AI: Handling Overload](https://alisol.ir/?ai=Handling%20Overload%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Addressing Cascading Failures

**خلاصه**: خرابی‌های زنجیره‌ای (cascading failures) وقتی اتفاق می‌افتند که خرابی یک سرویس باعث خرابی سرویس‌های دیگر شود. این فصل درباره استفاده از timeout، retry با الگوی درست و circuit breaker صحبت می‌کند تا جلوی این زنجیره خرابی گرفته شود.

**مثال**: مثل ردیف دومینوها است؛ با گذاشتن چند مانع بین دومینوها کاری می‌کنی که اگر یک‌جا افتاد، همه ردیف با هم نریزد.

**Link for More Details**:  
[Ask AI: Addressing Cascading Failures](https://alisol.ir/?ai=Addressing%20Cascading%20Failures%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Managing Critical State: Distributed Consensus for Reliability

**خلاصه**: برای مدیریت state حساس در سیستم‌های توزیع‌شده، از الگوریتم‌های distributed consensus مثل Paxos استفاده می‌شود تا همه replicaها روی یک حقیقت مشترک توافق کنند. این موضوع برای سرویس‌های حیاتی که consistency مهم است، کلیدی است.

**مثال**: مثل یک رأی‌گیری گروهی است که در آن همه باید روی انتخاب یک leader به توافق برسند، حتی اگر چند نفر در جلسه حاضر نباشند.

**Link for More Details**:  
[Ask AI: Managing Critical State: Distributed Consensus for Reliability](https://alisol.ir/?ai=Managing%20Critical%20State%3A%20Distributed%20Consensus%20for%20Reliability%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)  

[نوت شخصی: Paxos الگوریتم کلاسیکی است، اما در ۲۰۲۵ معمولاً پیاده‌سازی را با الگوریتم‌هایی مثل Raft که ساده‌تر هستند انجام می‌دهند.]

---

## ؜Distributed Periodic Scheduling with Cron

**خلاصه**: این فصل درباره این است که چطور jobهای دوره‌ای (مثل cron job) را در مقیاس بزرگ و روی چندین ماشین اجرا کنیم، بدون این‌که یک single point of failure داشته باشیم یا job دو بار اجرا شود.

**مثال**: مثل این است که backup روزانه‌ات را طوری تنظیم کنی که اگر یک سرور down شد، سرور دیگری job را اجرا کند و کار روی زمین نماند.

**Link for More Details**:  
[Ask AI: Distributed Periodic Scheduling with Cron](https://alisol.ir/?ai=Distributed%20Periodic%20Scheduling%20with%20Cron%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Data Processing Pipelines

**خلاصه**: این فصل درباره ساخت pipelineهای پردازش داده در مقیاس بزرگ است؛ ابزارهایی مثل MapReduce توضیح داده می‌شود که چطور داده‌های عظیم را در چند مرحله پردازش می‌کنند و در هر مرحله checkpoint می‌گذارند تا خطاها کنترل شوند.

**مثال**: مثل یک خط تولید کارخانه است که محصول از چند مرحله عبور می‌کند و در هر مرحله کنترل می‌شود تا در نهایت خروجی سالم باشد.

**Link for More Details**:  
[Ask AI: Data Processing Pipelines](https://alisol.ir/?ai=Data%20Processing%20Pipelines%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)  

[نوت شخصی: MapReduce پایه‌ای و مهم است، اما در ۲۰۲۵ معمولاً از سیستم‌هایی مثل Apache Spark یا Apache Beam برای batch و streaming استفاده می‌شود که انعطاف و کارایی بیشتری دارند.]

---

## ؜Data Integrity: What You Read Is What You Wrote

**خلاصه**: یک اصل مهم در سیستم‌های قابل‌اعتماد این است که داده‌ای که می‌خوانی همان داده‌ای باشد که قبلاً نوشته‌ای. این فصل درباره backup، replication و انواع integrity check صحبت می‌کند تا مطمئن شویم داده خراب یا گم نمی‌شود.

**مثال**: مثل این است که صورتحساب بانکی‌ات را دوباره چک کنی تا مطمئن شوی جمع واریزها و برداشت‌ها درست است و عدد نهایی اشتباه نشده.

**Link for More Details**:  
[Ask AI: Data Integrity: What You Read Is What You Wrote](https://alisol.ir/?ai=Data%20Integrity%3A%20What%20You%20Read%20Is%20What%20You%20Wrote%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Reliable Product Launches at Scale

**خلاصه**: این فصل درباره این است که چطور محصول‌ها را در مقیاس بزرگ و به‌صورت قابل‌اعتماد launch کنیم؛ با استفاده از checklistها، canary، rollout تدریجی و هماهنگی خوب بین تیم‌ها.

**مثال**: مثل rollout یک آپدیت اپلیکیشن است که اول برای درصد کمی از کاربران فعال می‌کنی، اگر همه‌چیز خوب بود کم‌کم برای همه فعال می‌شود.

**Link for More Details**:  
[Ask AI: Reliable Product Launches at Scale](https://alisol.ir/?ai=Reliable%20Product%20Launches%20at%20Scale%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Accelerating SREs to On-Call and Beyond

**خلاصه**: برای این‌که SREهای جدید سریعاً به سطح on-call برسند، برنامه‌های آموزشی، mentorship و ramp-up طراحی می‌شود. این فصل توضیح می‌دهد که چطور با shadow کردن افراد باتجربه و کار روی taskهای واقعی، یک SRE جدید را آماده مسئولیت‌های production کنیم.

**مثال**: مثل یک bootcamp است که در آن تازه‌واردها اول کنار حرفه‌ای‌ها می‌نشینند، بعد کم‌کم خودشان مسئولیت می‌گیرند.

**Link for More Details**:  
[Ask AI: Accelerating SREs to On-Call and Beyond](https://alisol.ir/?ai=Accelerating%20SREs%20to%20On-Call%20and%20Beyond%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Dealing with Interrupts

**خلاصه**: کار روی سیستم‌های production پر از interrupt است: پیام‌ها، ticketها، pageها و... . این فصل درباره مدیریت این وقفه‌ها با دسته‌بندی، زمان‌بندی و گذاشتن مرز (مثل زمان‌های focus بدون مزاحمت) صحبت می‌کند تا productivity حفظ شود.

**مثال**: مثل این است که برای کار عمیق روی یک موضوع، گوشی را روی حالت Do Not Disturb بگذاری و به بقیه بگویی در یک بازه زمانی خاص مزاحمت نشوند.

**Link for More Details**:  
[Ask AI: Dealing with Interrupts](https://alisol.ir/?ai=Dealing%20with%20Interrupts%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Embedding an SRE to Recover from Operational Overload

**خلاصه**: وقتی یک تیم زیر بار operational overload له می‌شود، یک مدل این است که یک SRE را مدتی در همان تیم embed کنیم تا مشکل‌ها را از ریشه حل کند، automation بسازد و عادت‌های خوب عملیاتی را جا بیندازد.

**مثال**: مثل این است که یک مربی حرفه‌ای را مدتی کنار یک تیم ورزشی ضعیف بفرستی تا با آن‌ها تمرین کند و پایه‌ها را درست کند.

**Link for More Details**:  
[Ask AI: Embedding an SRE to Recover from Operational Overload](https://alisol.ir/?ai=Embedding%20an%20SRE%20to%20Recover%20from%20Operational%20Overload%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Communication and Collaboration in SRE

**خلاصه**: ارتباط و همکاری قوی برای SRE حیاتی است. این فصل درباره production meetingها، ابزارهای مشترک، مستندسازی و کانال‌های ارتباطی واضح صحبت می‌کند که کمک می‌کند همه تیم‌ها تصویر مشترکی از وضعیت production داشته باشند.

**مثال**: مثل یک دورهمی خانوادگی هفتگی است که همه می‌نشینند و درباره اتفاقات هفته صحبت می‌کنند تا کسی از بقیه عقب نماند.

**Link for More Details**:  
[Ask AI: Communication and Collaboration in SRE](https://alisol.ir/?ai=Communication%20and%20Collaboration%20in%20SRE%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜The Evolving SRE Engagement Model

**خلاصه**: مدل تعامل SRE با سرویس‌ها در طول زمان تغییر می‌کند. بعضی سرویس‌ها در ابتدا نیاز به حمایت کامل SRE دارند، ولی وقتی بالغ شدند، نقش SRE بیشتر به شکل مشاوره‌ای (consulting) در می‌آید. این فصل توضیح می‌دهد چطور این مدل‌ها را طراحی و evolve کنیم.

**مثال**: شبیه رابطه والدین و فرزند است؛ اوایل کاملاً وابسته است، ولی کم‌کم مستقل می‌شود و نقش والد بیشتر مشاور می‌شود.

**Link for More Details**:  
[Ask AI: The Evolving SRE Engagement Model](https://alisol.ir/?ai=The%20Evolving%20SRE%20Engagement%20Model%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## ؜Lessons Learned from Other Industries

**خلاصه**: این فصل به درس‌هایی نگاه می‌کند که از صنایع دیگر مثل هوانوردی و پزشکی می‌شود برای SRE گرفت؛ چیزهایی مثل استفاده از checklist، فرهنگ «just culture» (بدون ترس از تنبیه برای گزارش خطا) و اهمیت handoffهای خوب.

**مثال**: black box هواپیما الهام‌بخش postmortem است؛ handoffهای دقیق در پزشکی الهام‌بخش تحویل شیفت on-call است.

**Link for More Details**:  
[Ask AI: Lessons Learned from Other Industries](https://alisol.ir/?ai=Lessons%20Learned%20from%20Other%20Industries%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## جمع‌بندی

**خلاصه**: در جمع‌بندی، کتاب نشان می‌دهد که SRE چگونه مقیاس‌پذیر است و با رشد سازمان و سرویس‌ها، خودش هم evolve می‌شود. اصولی مثل automation، سادگی، فرهنگ یادگیری از خطا و تعریف SLOها کمک می‌کنند سیستم‌ها در برابر رشد و پیچیدگی همچنان قابل‌اعتماد بمانند.

**مثال**: SRE مثل خلبانی هواپیماست؛ یک تیم کوچک، سیستم‌های قوی و آمادگی برای هر شرایط غیرمنتظره.

**Link for More Details**:  
[Ask AI: Conclusion](https://alisol.ir/?ai=Conclusion%7CGoogle%7CSite%20Reliability%20Engineering%7Cfa)

---

## درباره خلاصه‌کننده

من *Ali Sol* هستم، یک PHP Developer. برای آشنایی بیشتر:

* وب‌سایت: [alisol.ir](https://alisol.ir)  
* لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)  

