# ؜طراحی سامانه: پلتفرم تاکسی اینترنتی (Uber/Ola/…)

؜**کانال/مصاحبه‌کننده:؜** Tech Dummies – Narendra Lakshmana Gowda  
؜**مدت:؜** ۰۰:۳۶:۵۱  
؜**لینک ویدیو اصلی:؜** https://www.youtube.com/watch?v=umWABit-wbk

> این سند خلاصهٔ یک مصاحبهٔ ساختگی System Design است. ؜پیشنهاد می‌شود در صورت امکان ویدیوی کامل را تماشا کنید.

---

## ؜خلاصهٔ اجرایی یک‌صفحه‌ای (۲–۳ دقیقه)

؜**صورت‌مسئله (یک‌خطی):؜**  
طراحی یک پلتفرم تاکسی اینترنتی که ؜rider را به ؜driver نزدیک در زمان واقعی وصل کند و در مقیاس جهانی کار کند.

؜**دامنهٔ اصلی:؜**  
؜real-time dispatch (هماهنگ‌سازی عرضه/تقاضا)، ؜location ingestion، محاسبهٔ ؜ETA، ؜geo-indexing، پیام‌رسانی بین کلاینت‌ها و بک‌اند (؜WebSocket/REST)، ذخیره‌سازی/آنالیتیکس، لاگینگ و ؜DR. ؜جزئیات خارج از دامنه: ؜pricing، ؜surge، جزئیات پرداخت، احراز هویت کامل.

؜**اولویت‌های غیرعملکردی:؜**  
دسترس‌پذیری بالا، تجربهٔ موبایل کم‌تأخیر، مقیاس‌پذیری افقی بین منطقه‌ها، تاب‌آوری در برابر خرابی ؜data center.

؜**معماری کلان (متنی):؜**  
- ؜اپ‌های موبایل ؜(rider/driver) با فرکانس بالا ؜GPS می‌فرستند. ؜ 
- ؜مرز ورودی: ؜WAF → ؜Load Balancerهای ؜L3/L4/L7. ؜ 
- ؜ورودی از ؜REST → بافر/استریم به ؜Kafka. ؜ 
- ؜پخش وضعیت لحظه‌ای به: ؜NoSQL، سرویس ؜dispatch، و سایر مصرف‌کننده‌ها. ؜ 
- ؜حلقهٔ ؜dispatch (سرویس‌های ؜Node.js) با ؜consistent hashing + ؜gossip؛ ؜RPC بین نودها. ؜ 
- ؜سرویس ؜Mapping/ETA (تکیه بر ؜map provider + کتابخانهٔ سلولی شبیه ؜S2). ؜ 
- ؜؜WebSockets برای به‌روزرسانی دوسویهٔ رویدادمحور. ؜ 
- ؜آنالیتیکس: ؜HDFS/Hadoop (batch)، ؜Spark/Storm (real-time)، لاگینگ متمرکز با ؜ELK. ؜ 
- ؜؜DR: مرکز پشتیبان که با «state digest» از اپ‌های درایور، وضعیت سفر را بازسازی می‌کند.

[Ask AI: خلاصهٔ اجرایی](https://alisol.ir/?ai=Executive%20Summary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

---

## ؜برچسب‌های مصاحبه (برای جستجو/فیلتر بعداً)

؜**دامنه/صنعت:؜** تاکسی اینترنتی، تحویل، نقشه، آنالیتیکس  
؜**الگوی محصول:؜** ؜realtime-chat، ؜pub-sub، نوتیفیکیشن، ؜queue، ؜job-scheduler  
؜**مسائل سیستمی:؜** ؜high-availability، ؜low-latency، ؜eventual-consistency، ؜geo-replication، ؜hot-key، ؜backpressure، ؜throttling، ؜autoscaling  
؜**فناوری/زیرساخت (ذکرشده):؜** ؜microservices، ؜REST، ؜WebSocket، ؜Kafka، ؜MySQL، ؜Cassandra، ؜MongoDB، ؜HDFS، ؜Elasticsearch، ؜Spark، ؜Storm

[Ask AI: برچسب‌ها](https://alisol.ir/?ai=Interview%20Tags%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

---

## ؜درک مسئله

؜**پرومپت اصلی:؜** ساخت سامانهٔ ؜ride-hailing که به‌عنوان ؜real-time marketplace عمل کند: ؜rider و ؜driver را مچ کند، خودروهای نزدیک و ؜ETA را نمایش دهد.

؜**موارد استفادهٔ کلیدی:؜**  
- ؜درخواست سفر توسط ؜rider (کلاس خودرو، ؜solo/؜pool). ؜ 
- ؜نمایش خودروهای نزدیک و ؜ETA. ؜ 
- ؜به‌روزرسانی موقعیت ؜driver هر چند ثانیه. ؜ 
- ؜جریان ؜offer/accept/timeout؛ واگذاری به نخستین پذیرنده. ؜ 
- ؜مدیریت نقاط پرتراکم؛ افزودن/حذف شهرها و سرورها بدون اختلال.

؜**خارج از دامنه:؜** جزئیات کامل ؜pricing/؜surge، پرداخت، احراز هویت/حریم خصوصی کامل. ؜ 
؜**؜APIها:؜** در ویدیو مشخص نشده.

[Ask AI: درک مسئله](https://alisol.ir/?ai=Problem%20Understanding%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

---

## ؜نیازمندی‌ها و قیود

؜**عملکردی (ذکرشده در ویدیو):؜**  
- ؜جذب پینگ‌های پرتعداد ؜GPS از ؜driverها. ؜ 
- ؜نگهداری آخرین وضعیت ؜driver برای ؜dispatch. ؜ 
- ؜محاسبهٔ ؜ETA بر اساس شبکهٔ جاده‌ای (هزینهٔ پیچ، ترافیک). ؜ 
- ؜کانال پیام دوسویه با اپ‌ها (؜offer/status و …). ؜ 
- ؜مقیاس‌پذیری بین منطقه‌ها/شهرها؛ افزودن/حذف آسان سرورها (؜gossip). ؜ 
- ؜آنالیتیکس و تشخیص تقلب.

؜**غیرعملکردی (ذکرشده):؜**  
- ؜دسترس‌پذیری بسیار بالا. ؜ 
- ؜تأخیر کم برای ؜offer/accept و نقشه. ؜ 
- ؜مقیاس‌پذیری افقی بین ؜data centerها. ؜ 
- ؜؜DR قوی.

؜**فرض‌های محافظه‌کارانه:؜**  
- ؜بودجهٔ تأخیرِ درخواست سفر در حد چند ثانیه. ؜ 
- ؜کادانس به‌روزرسانی ؜GPS حدود هر ۴ ثانیه. ؜ 
- ؜سازگاری نهایی برای نقشه/نزدیک‌ها قابل قبول؛ برای وضعیت سفر، قوی‌تر.

[Ask AI: نیازمندی‌ها و قیود](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

---

## ؜برآوردهای تقریبی

(در ویدیو مطرح نشده — صرف‌نظر.)

[Ask AI: برآورد](https://alisol.ir/?ai=Estimation%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

---

## ؜معماری کلان

- ؜؜**کلاینت‌ها:؜** اپ‌های ؜rider/؜driver با ؜WebSocket و ؜REST. ؜ 
- ؜؜**مرز/لبه:؜** ؜WAF → ؜LBهای ؜L3/L4/L7. ؜ 
- ؜؜**ورودی:؜** ؜REST → بافر به ؜Kafka؛ سپس به ؜NoSQL، حالت ؜dispatch و مصرف‌کننده‌های دیگر. ؜ 
- ؜؜**حلقهٔ Dispatch:؜** سرویس‌های ؜Node.js؛ شاردینگ با ؜consistent hashing بر پایهٔ ؜cellId؛ ؜gossip برای مالکیت؛ ؜RPC وقتی شعاع جست‌وجو از مالک‌های مختلف عبور می‌کند. ؜ 
- ؜؜**Geo/ETA:؜** سرویس ؜mapping از سلول‌های شبیه ؜S2 برای یافتن کاندیداها و سپس ؜ETA جاده‌ای (نه فاصلهٔ خط مستقیم). ؜ 
- ؜؜**داده:؜** ؜NoSQL «schemaless» مبتنی بر ؜MySQL + گزینه‌های ؜Cassandra/؜MongoDB/؜Bigtable؛ عملیات آنلاین بدون وقفه. ؜ 
- ؜؜**آنالیتیکس:؜** ؜HDFS/Hadoop (batch) + ؜Spark/Storm (real-time). ؜ 
- ؜؜**مشاهده‌پذیری:؜** ؜ELK برای لاگ‌ها. ؜ 
- ؜؜**بازیابی از فاجعه:؜** بازسازی وضعیت زنده با «state digest» از اپ‌ها.

[Ask AI: معماری کلان](https://alisol.ir/?ai=High-Level%20Architecture%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

---

## ؜زیرسیستم‌ها (جزئیات)

### ؜سرویس عرضه (Driver)
؜**نقش:؜** دریافت ؜GPS (تقریباً هر ۴ ثانیه)، نگهداری وضعیت آخر ؜driver، پوش‌کردن به ؜Kafka و ؜dispatch. ؜ 
؜**مقیاس:؜** پشت ؜LB؛ پارتیشن‌بندی بر اساس ؜driverId/؜cellId. ؜ 
؜**سازگاری:؜** نهایی برای نمایش روی نقشه؛ قوی برای سفر در حال اجرا. ؜ 
؜**خطا:؜** تلاش مجدد با نوشتن ؜idempotent؛ حذف پینگ‌های ؜stale.

[Ask AI: زیرسیستم عرضه](https://alisol.ir/?ai=Subsystem%20-%20Supply%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

### ؜سرویس تقاضا (Rider)
؜**نقش:؜** دریافت درخواست سفر (کلاس، ؜pooling) و ارسال به ؜dispatch با ؜cellId ؜rider. ؜ 
؜**قرارداد:؜** دادن شعاع جست‌وجو؛ گرفتن فهرست ؜driver مرتب بر اساس ؜ETA. ؜ 
؜**خطا:؜** ؜timeout؛ تکرار با شعاع بزرگ‌تر.

[Ask AI: زیرسیستم تقاضا](https://alisol.ir/?ai=Subsystem%20-%20Demand%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

### ؜بهینه‌سازی Dispatch (حلقهٔ Node.js)
؜**نقش:؜** برای یک سلول، دایره می‌کشد، سلول‌های ؜S2 را می‌شمارد، کاندیدا می‌گیرد و با ؜ETA جاده‌ای رتبه‌بندی می‌کند؛ به ؜top N ؜offer می‌فرستد؛ اولین ؜accept برنده. ؜ 
؜**مقیاس/شاردینگ:؜** ؜consistent hashing روی ؜cellId؛ ؜gossip برای مالکیت؛ ؜RPC برای محدوده‌های هم‌پوشان.

[Ask AI: زیرسیستم Dispatch](https://alisol.ir/?ai=Subsystem%20-%20Dispatch%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

### ؜درگاه WebSocket
؜**نقش:؜** پیام‌رسانی دائمی دوسویه برای ؜offer، ؜accept، لغو، به‌روزرسانی‌های سفر. ؜ 
؜**چرایی ؜WebSocket:؜** رویدادمحور و کم‌تأخیر برای پوش‌ها.

[Ask AI: وب‌سوکت](https://alisol.ir/?ai=Subsystem%20-%20WebSockets%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

### ؜Geo/Mapping و ETA
؜**نقش:؜** مدل سلولی شبیه ؜S2؛ کوئری پوشش در شعاع؛ ؜ETA با گراف جاده‌ای (هزینهٔ پیچ/ترافیک). ؜ 
؜**نکته:؜** گاهی ؜driver در شُرُف اتمام سفرِ نزدیک بهتر از ؜driver بیکار دورتر است.

[Ask AI: نقشه و ETA](https://alisol.ir/?ai=Subsystem%20-%20Mapping%20%26%20ETA%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

### ؜سکوی داده و آنالیتیکس
؜**Batch:؜** ؜HDFS؛ کوئری با ابزارهای ؜Hadoop. ؜ 
؜**Streaming:؜** ؜Spark/؜Storm برای روندهای لحظه‌ای و کشف الگو. ؜ 
؜**موارد استفاده:؜** بهبود ؜ETA، بهبود نقشه و مدل‌سازی ترافیک.

[Ask AI: آنالیتیکس](https://alisol.ir/?ai=Subsystem%20-%20Analytics%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

### ؜لاگینگ و Observability
؜**پشته:؜** ؜ELK — انتقال لاگ‌ها به کلاستر؛ داشبورد خطا/سلامت.

[Ask AI: لاگینگ](https://alisol.ir/?ai=Subsystem%20-%20Logging%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

### ؜تشخیص تقلب (ML)
؜**تهدیدها:؜** تقلب پرداخت، سوء‌استفاده از مشوق‌ها (مثلاً ؜fake GPS)، حساب‌های به‌خطر‌افتاده. ؜ 
؜**سیگنال‌ها:؜** الگوهای سفر، ردّ ارتفاع/سرعت، ناهنجاری رفتاری؛ اقدام: هشدار/محدودیت/مسدودسازی.

[Ask AI: ضدتقلب](https://alisol.ir/?ai=Subsystem%20-%20Fraud%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

---

## ؜ملاحظات و جایگزین‌ها

| موضوع | گزینه A | گزینه B | گرایش | منطق |
| --- | --- | --- | --- | --- |
| پیام‌رسانی به اپ | ؜WebSockets | ؜Long-polling/؜SSE | ؜WebSockets | پوش دوسویه کم‌تأخیر |
| نمایه‌سازی جغرافیایی | ؜S2 cells | شبکهٔ خام ؜lat/lon | ؜S2 cells | ؜coverage/query خوب و شاردینگ |
| ؜ETA | ؜Provider APIs | مدل داخلی | ؜Provider APIs | پیچیدگی گراف جاده/ترافیک |
| ذخیره‌سازی | ؜MySQL-based schemaless | ؜Cassandra/؜MongoDB/؜Bigtable | ترکیبی | دسترس‌پذیری/مقیاس بالا |
| پردازش استریم | ؜Spark/؜Storm | ؜Flink/؜Kafka Streams | وابسته | ؜Flink/؜Kafka Streams در ۲۰۲۵ پخته‌تر |

[Ask AI: ملاحظات](https://alisol.ir/?ai=Trade-offs%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

---

## ؜قابلیت اطمینان، دسترس‌پذیری و کارایی

- ؜؜**تکثیر/سازگاری:؜** تمرکز بر دسترس‌پذیری؛ سازگاری نهایی برای فهرست نزدیک‌ها؛ سازگاری قوی‌تر برای وضعیت سفر. ؜ 
- ؜؜**پشت‌فشار (؜Backpressure):؜** ؜Kafka نوسان پینگ‌های ؜GPS را می‌گیرد؛ مصرف‌کننده‌ها هم‌پای ظرفیت. ؜ 
- ؜؜**تنزّل کنترل‌شده:؜** افزایش شعاع جست‌وجو یا شُل‌کردن قیود در کمبود عرضه. ؜ 
- ؜؜**؜DR:؜** مرکز پشتیبان بدون دادهٔ زنده؛ بازسازی با ؜state digest.

[Ask AI: قابلیت اطمینان](https://alisol.ir/?ai=Reliability%20and%20Performance%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

---

## ؜امنیت و حریم خصوصی

- ؜؜WAF برای مسدودسازی ؜IPهای مخرب/بات‌ها و نواحی غیرپشتیبانی‌شده. ؜ 
- ؜کشف به‌خطر‌افتادن حساب با ناهنجاری رفتاری. ؜ 
- ؜پایش تقلب پرداخت. ؜(هدف: ؜TLS 1.3، ؜certificate pinning قوی)

[Ask AI: امنیت](https://alisol.ir/?ai=Security%20and%20Privacy%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

---

## ؜مشاهده‌پذیری

- ؜دریافت متمرکز لاگ و داشبوردهای ؜Kibana برای خطا/سلامت.

[Ask AI: مشاهده‌پذیری](https://alisol.ir/?ai=Observability%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

---

## ؜پرسش‌های پیگیری (برای مصاحبه)

- ؜توازن کادانس ؜GPS بین تأخیر و باتری چگونه تنظیم می‌شود؟  
- ؜؜SLA دقت ؜ETA و نرخ موفقیت چیست؟  
- ؜رایج‌ترین خطاها/رخدادها در عملیات واقعی کدام‌اند؟  
- ؜برای استادیوم/فرودگاه چه سیاستی داریم (نقطه‌های دسترسی ترجیحی)؟

[Ask AI: پرسش‌های پیگیری](https://alisol.ir/?ai=Follow-up%20Questions%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

---

## ؜نکات کلیدی

- ؜به ؜dispatch به چشم یک ؜real-time marketplace کم‌تأخیر نگاه کنید. ؜ 
- ؜پارتیشن‌بندی جغرافیایی با سلول‌های ؜S2؛ تقسیم بار با ؜consistent hashing. ؜ 
- ؜؜WebSocket برای جریان‌های پوش‌محور موبایل↔سرور. ؜ 
- ؜؜ETA مبتنی بر گراف جاده، نه فاصلهٔ مستقیم. ؜ 
- ؜برای خرابی ؜DC آماده باشید: بازسازی وضعیت زنده از کلاینت‌ها. ؜ 
- ؜لاگینگ متمرکز و سرمایه‌گذاری روی آنالیتیکس برای بهبود ؜ETA و مقابله با تقلب.

[Ask AI: نکات کلیدی](https://alisol.ir/?ai=Key%20Takeaways%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

---

## ؜واژه‌نامه

- ؜؜**؜S2 Cells:؜** نمایهٔ جغرافیایی سلسله‌مراتبیِ سلولی. ؜ 
- ؜؜**؜Gossip Protocol:؜** پخش شایعه‌وار عضویت/سلامت بین نودها. ؜ 
- ؜؜**؜Consistent Hashing:؜** شِمای پارتیشن که تغییرات نگاشت را کمینه می‌کند. ؜ 
- ؜؜**؜WebSockets:؜** پروتکل دوسویهٔ ؜TCP برای پیام‌رسانی بلادرنگ. ؜ 
- ؜؜**؜ELK:؜** ؜Elasticsearch + ؜Logstash + ؜Kibana. ؜ 
- ؜؜**State Digest:؜** اسنپ‌شات فشردهٔ وضعیت روی اپ ؜driver برای بازسازی در ؜DR.

[Ask AI: واژه‌نامه](https://alisol.ir/?ai=Glossary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

---

## ؜برنامهٔ مطالعه (اختیاری)

- ؜مرور مبانی ؜consistent hashing و ؜gossip. ؜ 
- ؜پیاده‌سازی نمونهٔ کوچک جست‌وجوی شعاعی سلول‌های ؜S2 و رتبه‌بندی کاندیدا. ؜ 
- ؜ساخت دمو کوچک ؜WebSocket (offer → accept → assign). ؜ 
- ؜راه‌اندازی یک پایپ‌لاین ؜Kafka برای ؜GPS و دو مصرف‌کننده.

[Ask AI: برنامهٔ مطالعه](https://alisol.ir/?ai=Study%20Plan%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Uber%20%7C%20OLA%20%7C%20Amazon%20System%20Design%20Interview|fa)

---

## ؜نسبت‌دادن

- ؜ویدیو: https://www.youtube.com/watch?v=umWABit-wbk  
- ؜کانال: Tech Dummies – Narendra Lakshmana Gowda  
- ؜یادداشت: این سند خلاصهٔ ویدیو است.

---

## ؜دربارهٔ خلاصه‌کننده

من ؜**Ali Sol؜**، برنامه‌نویس PHP هستم. ؜ 
- ؜وب‌سایت: https://alisol.ir  
- ؜لینکدین: https://www.linkedin.com/in/alisolphp
