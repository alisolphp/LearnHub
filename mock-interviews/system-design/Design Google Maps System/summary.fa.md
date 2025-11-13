# ؜خلاصه مصاحبه سیستم‌دیزاین: طراحی Google Maps
*کانال/مصاحبه‌گر*: codeKarle  
*مدت*: ؜**01:00:50؜**  
*ویدئو*: https://www.youtube.com/watch?v=jk3yvVfNvds

> این سند خلاصه‌ی یک مصاحبهٔ سیستم‌دیزاین است. ؜اگر فرصت دارید، دیدن ویدیو کامل ارزشمند است.

---

## ؜جمع‌بندی یک‌صفحه‌ای (۲–۳ دقیقه)

- ؜؜**صورت مسئله (یک‌خطی)؜**: طراحی پلتفرم ناوبری شبیه Google Maps که بین دو نقطه مسیر، فاصله و ETA بدهد و برای ورودی‌های ترافیک، Weather، Incidents و کشف جاده‌های جدید قابل توسعه باشد.
- ؜؜**دامنهٔ اصلی؜**  
  - ؜داخل دامنه: مسیریابی A→B، محاسبه ETA، ورودی‌های ترافیک/Weather/Incidents، مدل Segment/Mega-segment، جمع‌آوری داده از پینگ‌های کاربران، کشف جادهٔ جدید، API چند-مشتری برای کاربران/شرکت‌ها. ؜ 
  - ؜خارج از دامنه: جزئیات ژئوپلیتیک، جزئیات کامل ML، تضمین «بهترین مسیر در میلی‌ثانیه»، دیتاست‌های جاده‌ای کاملاً معتبر جهانی.
- ؜؜**ویژگی‌های غیرعملکردی مهم؜**: دسترس‌پذیری بالا، دقت «کافی»، پاسخ در حد چند ثانیه (≈۱–۳ ثانیه قابل قبول)، مقیاس‌پذیری افقی.
- ؜؜**اعداد و قیود (ذکرشده در ویدیو)؜**: حدود ~1B MAU (غیررسمی)، 5–10B درخواست Route در ماه، ~5M شرکت مصرف‌کنندهٔ API (خودِ گوینده دقت اعداد را قطعی نمی‌داند).
- ؜؜**معماری در یک نگاه؜**  
  ؜1. ؜دستگاه‌ها با WebSocket به Handler وصل می‌شوند؛ Manager نگاشت device↔handler را در Redis نگه می‌دارد. ؜ 
  ؜2. ؜Location Service پینگ‌ها را در Cassandra ذخیره و به Kafka Publish می‌کند. ؜ 
  ؜3. ؜Stream Processing (Spark Streaming) سرعت‌های متوسط، Hotspot و کشف جادهٔ جدید را استخراج می‌کند؛ سرویس‌های Map Update/Traffic Update گراف (Cassandra) را به‌روزرسانی می‌کنند. ؜ 
  ؜4. ؜Area Search با Elasticsearch و Resolver، Place→Lat/Long را حل می‌کند. ؜ 
  ؜5. ؜Map Service جلوی Graph Processing قرار می‌گیرد؛ Subgraph می‌سازد و Routing را اجرا می‌کند. ؜ 
  ؜6. ؜Historical Data Service (Cassandra) وقتی دادهٔ زنده ضعیف است، ETA تاریخی را برمی‌گرداند. ؜ 
  ؜7. ؜Navigation Tracking پایش انحراف از مسیر و Analytics.
- ؜؜**تبادل‌ها (Trade-offs) اصلی؜**  
  - ؜دقت در برابر تاخیر پاسخ (مسیر «کافی» در چند ثانیه). ؜ 
  - ؜وزن‌دهی غنیِ یال‌ها در برابر مدل «Speed Modifiers». ؜ 
  - ؜؜Dijkstra سراسری در برابر Routing سلسله‌مراتبی مبتنی بر Segment. ؜ 
  - ؜دادهٔ زندهٔ ترافیک در برابر Backfill تاریخی. ؜ 
  *(نکته: برای Routing در مقیاس بزرگ، A*/ALT/Contraction Hierarchies/Multi-Level Dijkstra معمولاً از Dijkstra ساده بهتر جواب می‌دهند.)*
- ؜؜**ریسک‌ها/خرابی‌های محتمل؜**  
  - ؜؜Cache قدیمی Segment/Mega-segment هنگام حوادث ناگهانی. ؜ 
  - ؜؜Hot Partitionها در مناطق متراکم شهری. ؜ 
  - ؜افت کیفیت دادهٔ Third-party. ؜ 
  - ؜حریم خصوصی و PII مربوط به پینگ‌های مکانی.
- ؜؜**فلش‌کارت مرور ۵ دقیقه‌ای؜**  
  - ؜پرسش: چرا Segment؟ پاسخ: محدودکردن جست‌وجو و Cache مسیرهای درون Segment. ؜ 
  - ؜پرسش: ترافیک/Weather چطور لحاظ می‌شوند؟ پاسخ: به‌عنوان عامل‌های تغییر سرعت متوسط، نه وزن‌های تازهٔ یال. ؜ 
  - ؜پرسش: ترفند بین‌Segment؟ پاسخ: اتصال Exitهای Segment و جست‌وجوی Reduced Graph؛ به‌روزرسانی از Segmentها به بالا حباب می‌کند. ؜ 
  - ؜پرسش: چه‌وقت Recompute؟ پاسخ: وقتی اختلاف ETA از آستانه (مثلاً +30%) بیشتر شد. ؜ 
  - ؜پرسش: ETA تاریخی کِی کمک می‌کند؟ پاسخ: وقتی دادهٔ زنده ضعیف است؛ برحسب Day-of-Week/Hour شاخص‌گذاری می‌شود. ؜ 
  - ؜پرسش: اتصال دستگاه؟ پاسخ: WebSocket پایدار؛ Manager+Redis تخصیص‌ها را نگه می‌دارند.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

## ؜برچسب‌های مصاحبه (برای فیلتر بعدی)

- ؜؜**دامنه/صنعت؜**: maps، analytics  
- ؜؜**الگوی محصول؜**: search-index، caching، pub-sub، job-scheduler، notification (rerouting)، rate-limit (API)  
- ؜؜**نگرانی‌های سیستمی؜**: high-availability، low-latency، geo-replication (سراسری)، privacy، throttling، autoscaling  
- ؜؜**فناوری‌ها (ذکر شده)؜**: websocket، kafka، spark، hadoop، cassandra، redis، elasticsearch  
  *(نکته: HDFSمحور بودن Hadoop در ۲۰۲۵ کمتر رایج است؛ خیلی‌ها به Lakehouse/Object Storage با Spark/Flink/Trino مهاجرت می‌کنند.)*  
  *(نکته: Kafka همچنان پایدار است؛ سرویس‌های مدیریتی می‌توانند Ops را کاهش دهند.)*

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

## ؜فهم مسئله

- ؜؜**پرامپت اصلی؜**: ساخت اپ ناوبری که برای A→B مسیر(ها)، فاصله و ETA بدهد؛ ورودی‌های ترافیک/Weather/Incidents را پشتیبانی کند؛ و از حرکت کاربران جاده‌های جدید را کشف کند. ؜ 
- ؜؜**Use Caseها؜**  
  - ؜؜Turn-by-turn Navigation با Reroute هنگام انحراف. ؜ 
  - ؜پیشنهاد چند مسیر (کمینهٔ زمان/مسافت). ؜ 
  - ؜کشف/توصیف جاده از Trajectory کاربران. ؜ 
  - ؜پشتیبانی از مصرف‌کنندگان ثالث (مثلاً Ride-hailing). ؜ 
- ؜؜**خارج از دامنه؜**: دیتاست جادهٔ «Ground-truth» جهانی؛ پیش‌بینی کامل رخدادهای غیرقابل پیش‌بینی؛ بحث‌های مرزی عمیق (اشارهٔ کوتاه). ؜ 
- ؜؜**APIها (اگرچه دقیق‌سازی نشده)؜**: Map Service برای کلاینت‌ها/شرکت‌ها و Area Search برای Place→Lat/Long.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

## ؜نیازمندی‌ها و قیود

؜**طبق ویدیو؜**  
- ؜؜**عملکردی؜**  
  - ؜محاسبهٔ مسیر(ها)، فاصله و ETA برای A→B؛ امکان نقطه‌های دلخواه روی جاده. ؜ 
  - ؜مدل Plug-in برای ترافیک، Weather، تصادف، ساخت‌وساز، Closure. ؜ 
  - ؜کشف جادهٔ جدید از Trajectory؛ طبقه‌بندی Lane Count و One-way با گذر زمان. ؜ 
  - ؜؜Navigation Tracking با هشدار انحراف و Analytics. ؜ 
- ؜؜**غیرفرهنگی؜**  
  - ؜؜High Availability؛ پاسخ ۱–۳ ثانیه؛ دقت کافی؛ مقیاس میلیاردی در ماه.

؜**فرضیات؜**  
- ؜استقرار چندمنطقه‌ای جهانی؛ Eventual Consistency برای Analytics قابل قبول؛ Readهای Routing در هر Region تازه و پایدار. ؜ 
- ؜به‌دلیل دادهٔ مکانی، الزامات Privacy/Retention/Access Governance ضروری است.

[Ask AI: Requirements and Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

## ؜تخمین‌های سرانگشتی

- ؜در ویدیو محاسبات عددی دقیق نیامده است.

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

## ؜معماری سطح‌بالا

- ؜؜**کلاینت و Edge؜**: اپ موبایل/وب با WebSocket پایدار؛ WebSocket Manager نگاشت‌ها را در Redis نگه می‌دارد؛ AuthN/AuthZ و Reverse Proxy جلوِ سرویس‌ها. ؜ 
- ؜؜**دریافت و ذخیره؜**: Location Service پینگ‌ها را در Cassandra ذخیره و روی Kafka Publish می‌کند؛ دادهٔ تاریخی برای Batch/ML وارد Hadoop/Lake می‌شود. ؜ 
- ؜؜**Stream Processing؜**: با Spark Streaming سرعت متوسط، Hotspot و جادهٔ جدید را از Kafka استخراج و رویداد منتشر می‌کند؛ Map Update/Traffic Update در Cassandra (از طریق Graph Processing) می‌نویسند. ؜ 
- ؜؜**جست‌وجو/Geo؜**: Area Search با Elasticsearch و Resolver برای Place→Lat/Long. ؜ 
- ؜؜**لایهٔ Routing؜**: Map Service → Graph Processing که Reduced Graph (Around Exitها) می‌سازد و الگوریتم مسیر را اجرا می‌کند؛ Cache چندلایه روی Junction↔Junction، Exit↔Exit، Segment↔Segment و Mega-segment↔Mega-segment. ؜ 
- ؜؜**ETA تاریخی؜**: هنگام ضعف دادهٔ زنده بر اساس Day-of-Week/Hour-Of-Day استفاده می‌شود. ؜ 
- ؜؜**Rerouting و Telemetry؜**: Navigation Tracking انحراف را تشخیص می‌دهد و Eventها/Analytics را ارسال می‌کند.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

## ؜جزئیات زیرسیستم‌ها

### ؜؜Segment و Mega-segment
- ؜؜**نقش؜**: تقسیم دنیا به Segmentهای ۱×۱ کیلومتر (ID و چهار گوشه)؛ تجمیع آن‌ها در Mega-segment برای مسیرهای بین‌شهری/ایالتی. ؜ 
- ؜؜**مدل داده؜**:  
  - ؜`Segment(id, corners, exits[], cached_all_pairs[], cached_exit_pairs[])`  
  - ؜`MegaSegment(id, segments[], exits[], cached_exit_pairs[])`  
- ؜؜**مقیاس‌پذیری؜**: محدودکردن پنجرهٔ جست‌وجو با فاصلهٔ هوایی (±N Segment)؛ برای سفرهای بلند به Mega-segment صعود می‌کنیم. ؜ 
- ؜؜**Caching؜**: پیش‌محاسبهٔ All-Pairs درون Segment (مثل Floyd–Warshall) و Cache کردن Exit↔Exit؛ انتشار تغییرات به سطح‌های بالاتر. ؜ 
- ؜؜**نقاط داغ/خرابی؜**: Recompute وقتی تغییر ETA از آستانه عبور کند (مثلاً +30%)؛ مهار طوفان Recompute.

[Ask AI: Subsystem - ؜Segments](https://alisol.ir/?ai=Subsystem%20-%20Segments%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

### ؜؜Graph Processing Service
- ؜؜**نقش؜**: مالک Graph و Routing؛ Reduced Graph را براساس Exitها می‌سازد؛ مسیر+فاصله+ETA برمی‌گرداند؛ سیگنال‌های Third-party و Stream را اعمال می‌کند. ؜ 
- ؜؜**Weightها؜**: طول پایه + زمان اسمی؛ ترافیک/Weather/Workها سرعت متوسط را تغییر می‌دهند ⇒ ETA عوض می‌شود؛ هر عامل را به‌صورت «Speed Modifier» نگاه کنید نه وزن تازهٔ یال. ؜ 
- ؜؜**APIها؜**: پشت Map Service؛ ابتدا Cache، در غیر این صورت محاسبه روی Reduced Graph. ؜ 
- ؜؜**سازگاری؜**: Updateهای زنده به‌تدریج اعمال می‌شوند؛ Queryها تازه‌ترین Snapshot ناحیه را می‌خوانند.

[Ask AI: Subsystem - ؜Graph Processing](https://alisol.ir/?ai=Subsystem%20-%20Graph%20Processing%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

### ؜؜Stream Intelligence (New Roads, Speeds, Hotspots)
- ؜؜**نقش؜**: مصرف پینگ‌های Kafka با Spark Streaming برای کشف جاده‌های جدید (Trajectory)، برآورد سرعت متوسط هر Road، و کشف Hotspot. ؜ 
- ؜؜**خروجی‌ها؜**: Event روی Kafka Topicها؛ سرویس‌های Map Update/Traffic Update از طریق Graph Processing در Cassandra می‌نویسند. ؜ 
- ؜؜**افزوده‌های ML؜**: طبقه‌بندی Lane Count و One-way/Two-way؛ حدس نوع وسیله با الگوهای حرکت.

[Ask AI: Subsystem - ؜Streaming](https://alisol.ir/?ai=Subsystem%20-%20Streaming%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

### ؜؜Area Search و Geocoding
- ؜؜**نقش؜**: جست‌وجوی Fuzzy در Places (Elasticsearch) و تبدیل Address→Lat/Long؛ خروجیِ آماده برای Routing.

[Ask AI: Subsystem - ؜Area Search](https://alisol.ir/?ai=Subsystem%20-%20Area%20Search%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

### ؜؜Navigation Tracking
- ؜؜**نقش؜**: حین ناوبری، پایش وضعیت کاربر نسبت به مسیر؛ هشدار انحراف؛ ارسال Telemetry برای Audit دقت ETA و تحلیل انتخاب مسیر.

[Ask AI: Subsystem - ؜Navigation Tracking](https://alisol.ir/?ai=Subsystem%20-%20Navigation%20Tracking%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

## ؜تبادل‌ها و گزینه‌های جایگزین

| موضوع | گزینه A | گزینه B | نظر ویدیو | منطق (طبق ویدیو) |
| --- | --- | --- | --- | --- |
| عوامل زنده | وزن‌دهی یال با ترافیک/Weather | Speed Modifiers روی سرعت | **Modifiers** | هستهٔ Router را پایدار و Plug-able نگه می‌دارد. |
| Routing جهانی | Dijkstra سراسری | Segment/Mega-segment + Reduced Graph | **Segments** | مرز جست‌وجو را می‌بندد؛ Cacheهای مؤثر. |
| APSP درون Segment | Floyd–Warshall | Dijkstra تکراری / Precompute | **FW در ویدیو** | ساده برای Segmentهای کوچک. |
| Stream Engine | Spark Streaming | Flink/سایرین | **Spark در ویدیو** | آشنایی و اکوسیستم Batch. |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

## ؜قابلیت‌اطمینان، دسترس‌پذیری و کارایی

- ؜؜**دسترس‌پذیری؜**: مقیاس افقی WebSocket Handlerها؛ سرویس‌های Stateless پشت Load Balancer؛ Redis برای نگاشت‌های موقتی. ؜ 
- ؜؜**کارایی؜**: هدف چند ثانیه با Reduced Graph + Caching؛ Recompute وقتی Delta-ETA بزرگ شود. ؜ 
- ؜؜**Backpressure/Throttling؜**: Kafka پیک‌ها را بافر می‌کند؛ Rate Limit روی API شرکت‌ها. ؜ 
- ؜؜**Degrade؜**: در نبود دادهٔ زنده از ETA تاریخی استفاده کنید.

[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

## ؜امنیت و حریم خصوصی

- ؜در ویدیو جزئیات فنی امنیت نیامده؛ اما با توجه به دادهٔ مکانی، Privacy، Retention و Governance ضروری‌اند.

[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

## ؜؜Observability

- ؜اندازه‌گیری دقت ETA (پیش‌بینی در برابر واقعیت)، پذیرش مسیر پیشنهادی، صحت سیگنال‌های Third-party، محبوبیت Queryهای Area Search. ؜لاگ/متریک/تریسینگ به‌طور صریح تعریف نشده‌اند.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

## ؜پرسش‌های پیگیری مصاحبه‌گر

-- ؜در ویدیو نیامده است.

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

## ؜پرسش‌های کاندید

- ؜در ویدیو نیامده است.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

## ؜نکات کلیدی

- ؜؜Segment/Mega-segment برای بستن دامنهٔ جست‌وجو و Cache کردن مسیرهای درون‌Segment و Exit↔Exit. ؜ 
- ؜ترافیک/Weather/Incidents را به‌صورت Speed Modifier نگه دارید تا Router Plug-able بماند. ؜ 
- ؜؜Recompute وقتی ETA تغییر قابل‌توجهی دارد؛ تغییرات را به سطح‌های بالاتر Bubble کنید. ؜ 
- ؜ترکیب Telemetry زنده با الگوهای تاریخی (DOW/HOD) برای مقاومت در برابر خلاهای داده. ؜ 
- ؜ستون فقرات Real-time: WebSocket → Kafka → Streaming → Graph Store. ؜ 
- ؜حلقه‌های Analytics (دقت ETA، نرخ پذیرش مسیر، اعتماد به Third-party) برای کیفیت حیاتی‌اند.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

## ؜واژه‌نامه

- ؜؜**Segment؜**: سلول ۱×۱ کیلومتر با Exitها و مسیرهای Cacheشدهٔ درون‌Segment. ؜ 
- ؜؜**Mega-segment؜**: تجمیع Segmentها برای Routing دوربرد. ؜ 
- ؜؜**Exit Point؜**: تقاطع مرز Segment برای دوختن Segmentها. ؜ 
- ؜؜**Reduced Graph؜**: گرافی از Exitها (و مبدا/مقصد) در پنجرهٔ محدود برای Routing سریع. ؜ 
- ؜؜**Speed Modifiers؜**: عامل‌هایی که سرعت متوسط را عوض می‌کنند و در نتیجه ETA تغییر می‌کند.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

## ؜برنامهٔ مطالعه (اختیاری)

- ؜تمرین Routing سلسله‌مراتبی: Segmentکردن شهر، تعریف Exitها، و Reduced Graph. ؜ 
- ؜پیاده‌سازی Router ساده با Dijkstra + A* و افزودن لایهٔ Speed Modifier. ؜ 
- ؜ساخت Prototype استریم: پینگ‌ها → Kafka → برآورد سرعت → به‌روزرسانی Cache.

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CcodeKarle%7CDesign%20Google%20Maps%20System|fa)

---

## ؜نسبت‌دادن

- ؜ویدیو: https://www.youtube.com/watch?v=jk3yvVfNvds  
- ؜کانال: codeKarle  
- ؜یادداشت: این سند خلاصه‌ای از ویدیوی پیوند داده‌شده است.

---

## ؜دربارهٔ خلاصه‌کننده

من ؜**Ali Sol؜**، برنامه‌نویس PHP.
- ؜وب‌سایت: [alisol.ir](https://alisol.ir)  
- ؜لینکداین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
