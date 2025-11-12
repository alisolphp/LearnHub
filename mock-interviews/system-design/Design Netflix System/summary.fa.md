# ؜خلاصه مصاحبهٔ System Design: طراحی Netflix
- ؜**کانال/مصاحبه‌گر؜**: Tech Dummies - ؜Narendra Lakshmana Gowda  
- ؜**مدت؜**: 00:51:27  
- ؜**لینک ویدیو؜**: https://www.youtube.com/watch?v=psQzyFfsUGU

> این سند خلاصهٔ نکات کلیدی یک مصاحبهٔ ساختگی system design است. ؜اگر وقت دارید دیدن ویدیو توصیه می‌شود.

---

## ؜خلاصهٔ یک‌صفحه‌ای (۲–۳ دقیقه)

؜**صورت‌مسئله (یک‌خطی)؜**: طراحی end-to-end برای پخش ویدیو در مقیاس جهانی با UX روان.

؜**حوزهٔ اصلی؜**  
- ؜در محدوده: اپ‌های کاربر (وب/موبایل/TV), API Gateway, microservices, load balancing, ویدیو ingest/transcoding، CDN ‌(Open Connect)، دیتاستورها (MySQL و Cassandra)، caching (EVCache/memcached)، استریم/لاگ (Chukwa → Kafka → Samza → S3/Elasticsearch)، سیستم recommendation با Spark/ML، observability. ؜ 
- ؜خارج از محدوده: جزئیات امنیتی عمیق، ‌billing داخلی، و schemaهای دقیق API.

؜**الویت‌های غیرعملکردی؜**: latency پایین در شروع پخش، availability بالا، مقیاس‌پذیری جهانی، هزینهٔ بهینه.

؜**معماری High-Level (متنی)؜**  
- ؜کلاینت‌ها (web، mobile، TV/console) به frontendهای AWS از طریق ELB (دو لایه: DNS RR بین zoneها و سپس LB روی instanceها) وصل می‌شوند. ؜ 
- ؜؜API Gateway (Zuul) برای routing/auth/shaping/filters؛ ایزولیشن و circuit breaking با Hystrix. ؜*(نکته: در ۲۰۲۵ برای JVM معمولاً Resilience4j رایج‌تر است.)*  
- ؜؜Microserviceها (REST/gRPC) برای login، homepage، search، recommendations، billing و…  
- ؜دیتا: MySQL برای user/billing (ACID) با master–master و replica خواندنی؛ Cassandra برای viewing history/داده‌های بزرگ. ؜*(می‌توان به Aurora/Vitess هم فکر کرد.)*  
- ؜؜Cache: ‏EVCache (بر پایهٔ memcached)؛ write به همهٔ کلاسترها، read از نزدیک‌ترین. ؜*(Redis برای ساختارهای دادهٔ غنی‌تر گزینهٔ جایگزین است.)*  
- ؜ویدیو pipeline: ingest استودیو → chunking → transcoding توزیع‌شده → variant/resolutionها → push به CDN ‏Open Connect؛ انتخاب خودکار bitrate با ABR. ؜ 
- ؜دیتا pipeline: ‏Chukwa → Kafka → Samza → مقصدها (S3/Elasticsearch) → داشبوردها (Kibana/Grafana). ؜ 
- ؜؜Open Connect: جعبه‌های CDN متعلق به Netflix در ISPها؛ consistent hashing روی نودها؛ caching پیش‌دستانه بر اساس محبوبیت/لوکیشن.

؜**تریدآف‌های اصلی؜**  
- ؜نسبت cache hit جهانی در برابر هزینهٔ ذخیره‌سازی در edge. ؜ 
- ؜تضمین‌های ACID (MySQL) در برابر throughput/scale (Cassandra). ؜ 
- ؜سادگی کلاینت در برابر smart client برای انتخاب سرور/سوئیچ ABR. ؜ 
- ؜پیچیدگی عملیاتی (سرویس‌های زیاد) در برابر چابکی و ایزولاسیون خطا.

؜**ریسک‌ها/خرابی‌های شایع؜**  
- ؜؜hot shard/hot key روی عناوین ترند؛ cache stampede. ؜ 
- ؜؜failureهای زنجیره‌ای بین microserviceها؛ timeouts نامناسب. ؜ 
- ؜قطعی‌های منطقه‌ای ISP/CDN، یا misconfiguration در ELB بین zoneها.

؜**فلش‌کارت مرور ۵ دقیقه‌ای؜**  
- ؜س: چه چیزی routing/filters را در edge انجام می‌دهد؟ ج: ‏Zuul Gateway. ؜*(برای HTTP/3 می‌توان Envoy/API Gateway را هم سنجید.)*  
- ؜س: چه چیزی جلوی cascading failure را می‌گیرد؟ ج: ‏Hystrix با timeout/bulkhead/fallback. ؜ 
- ؜س: user/billing کجا ذخیره می‌شود و viewing history کجا؟ ج: ‏MySQL و Cassandra. ؜ 
- ؜س: پخش از کجا انجام می‌شود؟ ج: نزدیک‌ترین سرور Open Connect با ABR. ؜ 
- ؜س: latency/throughput API چگونه بهبود می‌یابد؟ ج: ‏EVCache با read نزدیک‌ترین کلاستر. ؜ 
- ؜س: ingest رویدادها/لاگ‌ها؟ ج: ‏Chukwa → Kafka → Samza → S3/Elasticsearch.

[Ask AI: خلاصهٔ یک‌صفحه‌ای](https://alisol.ir/?ai=Executive%20Summary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

---

## ؜برچسب‌های مصاحبه

؜**دامنه/صنعت؜**: `vod`، `streaming`، `analytics`  
؜**الگوهای محصول؜**: `video-on-demand`، `recommendation`، `cdn`، `caching`، `search-index`، `queue`، `job-scheduler`، `pub-sub`، `notification`  
؜**نگرانی‌های سیستمی؜**: `high-availability`، `low-latency`، `geo-replication`، `eventual-consistency`، `hot-key`، `backpressure`، `autoscaling`  
؜**فناوری‌ها؜**: `microservices`، `grpc`، `rest`، `kafka`، `mysql`، `cassandra`، `memcached`، `s3`، `elasticsearch`، `spark`، `cdn`  
*(بسته به لایسنس/مدیریت، OpenSearch هم می‌تواند جایگزین ES باشد.)*

[Ask AI: برچسب‌ها](https://alisol.ir/?ai=Interview%20Tags%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

---

## ؜فهم مسئله

؜**پرامپت اصلی؜**: ساخت Netflix برای استریم جهانی با UX روان؛ کنترل‌پلین در AWS و تحویل ویدیو از Open Connect. ؜ 

؜**Use Caseها؜**  
- ؜کشف محتوا (homepage rows، search)، پخش با adaptive bitrate، ادامهٔ تماشا. ؜ 
- ؜شخصی‌سازی: ردیف‌ها و artwork برای هر کاربر. ؜ 
- ؜پشتیبانی: logging برای debug مسائل کاربر/سیستم.

؜**خارج از محدوده؜**: auth/DRM سطح‌جزئی، تبلیغات؛ اشارهٔ گذرا به billing. ؜ 
؜**APIها؜**: در ویدیو مشخص نشده‌اند.

[Ask AI: فهم مسئله](https://alisol.ir/?ai=Problem%20Understanding%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

---

## ؜نیازمندی‌ها و قیود

؜**آنچه در ویدیو آمده؜**  
- ؜شروع سریع پخش و روانی playback؛ سرو از نزدیک‌ترین edge؛ انتخاب مداوم بهترین سرور. ؜ 
- ؜«دو ابر»: کنترل‌پلین در AWS؛ data-plane ویدیو در Open Connect. ؜ 
- ؜؜ELB دولایه؛ Zuul + Hystrix؛ EVCache؛ MySQL (ACID) + Cassandra (Scale)؛ ‏Spark/ML برای recommendation؛ ‏Chukwa/Kafka/Samza → ES/S3.

؜**فرضیات ملایم؜**  
- ؜استقرار multi-region روی AWS با Route 53؛ autoscaling برای spikeها؛ جعبه‌های CDN در ISPهای جهان.

[Ask AI: نیازمندی‌ها](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

---

## ؜برآورد سرانگشتی

- ؜در ویدیو عددگذاری نشده؛ از این بخش عبور می‌کنیم.

[Ask AI: برآورد](https://alisol.ir/?ai=Estimation%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

---

## ؜معماری High-Level

- ؜؜**کلاینت‌ها؜**: Web, iOS/Android/TV؛ smart clientها پیوسته بهترین سرور Open Connect را probe و در صورت لزوم mid-stream سوئیچ می‌کنند؛ ABR کیفیت را با پهنای‌باند تطبیق می‌دهد. ؜ 
- ؜؜**Edge/Gateway؜**: ‏ELB (‏DNS RR بین zoneها → LB روی instanceها)؛ فیلترهای Zuul (inbound/endpoint/outbound) برای auth/routing/metrics/headers. ؜*(HTTP/3/QUIC در edge می‌تواند start-up را بهتر کند.)*  
- ؜؜**Services؜**: ‏HTTP/gRPC؛ Hystrix برای ایزولیشن وابستگی‌ها با timeout/bulkhead/fallback. ؜ 
- ؜؜**Storage؜**: ‏MySQL master–master + read replicas؛ ‏Cassandra برای write سنگین/تاریخچه؛ ‏EVCache برای تسریع read (SSD-backed). ؜ 
- ؜؜**Ingest/Transcode؜**: فایل منبع → chunk → صف → workerهای EC2 برای transcoding به resolution/bitrateهای متعدد → ذخیره روی S3 → push به Open Connect. ؜ 
- ؜؜**Open Connect؜**: caching پیش‌دستانه بر اساس محبوبیت جهانی/منطقه‌ای؛ توزیع اشیا با consistent hashing. ؜ 
- ؜؜**Data/Logs؜**: ‏Chukwa رویدادها را جمع می‌کند → Kafka → Samza → ‏S3/Elasticsearch → داشبوردها. ؜ 
- ؜؜**ML/Personalization؜**: ‏Spark مدل‌ها را برای انتخاب/مرتب‌سازی ردیف‌ها و انتخاب artwork آموزش می‌دهد.

[Ask AI: معماری](https://alisol.ir/?ai=High-Level%20Architecture%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

---

## ؜موشکافی زیرسیستم‌ها

### ؜۸.۱ کلاینت
- ؜کراس‌پلتفرم (TV/Mobile/Web)؛ در وب معمولاً React برای سرعت شروع/مدولار بودن. ؜ 
- ؜انتخاب هوشمند سرور Open Connect؛ ABR برای سازگاری با bandwidth. ؜ 
- ؜سوئیچ ارائه‌دهنده در میانهٔ پخش وقتی مسیر بهتری پیدا شود.

[Ask AI: کلاینت](https://alisol.ir/?ai=Subsystem%20-%20Client%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

### ؜۸.۲ API Gateway (Zuul)
- ؜؜routing پویا، auth، shaping، security؛ فیلتر قبل/بعد از proxy؛ دستکاری header/metrics. ؜ 
- ؜امکان traffic splitting برای load test/canary؛ فیلتر bad requestها (مانند user-agent). ؜ 
*(گزینه‌های مدرن: Envoy، Kong، Spring Cloud Gateway.)*

[Ask AI: API Gateway](https://alisol.ir/?ai=Subsystem%20-%20API%20Gateway%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

### ؜۸.۳ Resilience (Hystrix)
- ؜ایزوله‌سازی callهای راه‌دور؛ timeout؛ bulkhead؛ circuit-breaker با نرخ خطا؛ fallback؛ داشبورد متریک. ؜ 
*(در ۲۰۲۵ معمولاً Resilience4j یا قابلیت‌های service mesh متداول‌تر است.)*

[Ask AI: Resilience](https://alisol.ir/?ai=Subsystem%20-%20Resilience%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

### ؜۸.۴ Caching (EVCache/memcached)
- ؜؜write به همهٔ کلاسترها؛ read از نزدیک‌ترین؛ throughput/latency را بهبود می‌دهد و هزینه را کم می‌کند؛ SSD برای ظرفیت بیشتر. ؜ 
- ؜تهدیدها: hot key روی عناوین ترند؛ راهکار: sharding/replication و request coalescing.

[Ask AI: Caching](https://alisol.ir/?ai=Subsystem%20-%20Caching%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

### ؜۸.۵ Datastores
- ؜؜**MySQL؜**: برای user/billing با master–master و replicaهای خواندنی؛ failover مبتنی بر DNS (Route 53). ؜*(Failover مبتنی بر DNS کند است؛ HA مدیریت‌شده بهتر است.)*  
- ؜؜**Cassandra؜**: توزیع‌شده برای viewing history؛ فشرده‌سازی دوره‌ای تاریخچهٔ قدیمی برای footprint کمتر.

[Ask AI: Datastores](https://alisol.ir/?ai=Subsystem%20-%20Datastores%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

### ؜۸.۶ Transcoding & Delivery
- ؜جریان: ingest → chunk → صف → EC2 transcoderها → نسخه‌های متعدد رزولوشن/bitrate → S3 → Open Connect؛ کلاینت با ABR کیفیت را تطبیق می‌دهد. ؜ 
- ؜*(codec ladder مدرن: AV1/HEVC بسته به دستگاه‌ها.)*

[Ask AI: Transcoding](https://alisol.ir/?ai=Subsystem%20-%20Transcoding%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

### ؜۸.۷ Data/Log Pipeline & Observability
- ؜؜Chukwa رویدادها/لاگ‌ها را می‌گیرد → Kafka؛ ‏Samza آن‌ها را route/filter می‌کند به S3/Elasticsearch؛ داشبوردها برای debug signup/login/playback و resource usage. ؜ 
- ؜*(بسیاری از استک‌ها امروز Kafka + Flink/Streams را ترجیح می‌دهند.)*

[Ask AI: Data Pipeline](https://alisol.ir/?ai=Subsystem%20-%20Data%20Pipeline%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

### ؜۸.۸ Recommendations & Personalization
- ؜مدل‌ها: collaborative filtering و content-based؛ آموزش روی Spark؛ خروجی برای انتخاب/مرتب‌سازی ردیف‌ها و آزمایش artwork استفاده می‌شود. ؜ 
- ؜؜**Artwork Personalization؜**: چندین thumbnail برای هر عنوان؛ رصد CTR/watch-time؛ انتخاب برنده برای سگمنت‌ها.

[Ask AI: Recommendations](https://alisol.ir/?ai=Subsystem%20-%20Recommendations%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

### ؜۸.۹ Open Connect (CDN)
- ؜مدل: applianceهای Netflix در ISPها (رایگان برای شریک)؛ کاهش ترافیک ترانزیت و بهبود QoE؛ HA با قطعات افزونه. ؜ 
- ؜استراتژی cache: محتوای جهانی همه‌جا cache؛ محتوای محلی بر اساس سابقهٔ مصرف؛ placement با consistent hashing.

[Ask AI: Open Connect](https://alisol.ir/?ai=Subsystem%20-%20Open%20Connect%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

---

## ؜تریدآف‌ها و جایگزین‌ها

| موضوع | گزینه A | گزینه B | گرایش ویدیو | منطق |
| --- | --- | --- | --- | --- |
| Gateway | Zuul | Envoy/سایر | Zuul | در زمان نتفلیکس بلوغ فیلتر/روتینگ |
| Fault Tolerance | Hystrix | Resilience4j/mesh | Hystrix | مدل غنی timeout/bulkhead/fallback |
| OLTP | MySQL | Postgres/Managed | MySQL | ACID و ابزارهای موجود |
| Big Data Store | Cassandra | HBase/Dynamo-مانند | Cassandra | مقیاس برای تاریخچه/لاگ |
| Stream Proc | Samza | Flink/Streams | Samza | routing/filter روی Kafka |

*(یادآوری: برای ۲۰۲۵ احتمالاً Envoy/Resilience4j/Flink رایج‌ترند.)*

[Ask AI: تریدآف‌ها](https://alisol.ir/?ai=Trade-offs%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

---

## ؜قابلیت اطمینان، دسترس‌پذیری و کارایی

- ؜؜**Replication/Consistency؜**: ‏MySQL master–master + replicas؛ ‏Cassandra برای scale؛ ‏EVCache نوشتن تکراری و خواندن محلی. ؜ 
- ؜؜**Latency Budget؜**: شروع سریع با edge نزدیک + cache؛ ABR جلوی stall را می‌گیرد. ؜ 
- ؜؜**Load Shedding/Degradation؜**: fallbackهای Hystrix؛ split مسیر در gateway؛ خواندن cache-first وقتی امن است.

[Ask AI: قابلیت اطمینان](https://alisol.ir/?ai=Reliability%20and%20Performance%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

---

## ؜امنیت و حریم خصوصی

- ؜در ویدیو جزئیات خاصی جز اشارهٔ کلی به امنیت در gateway مطرح نشده است.

[Ask AI: امنیت](https://alisol.ir/?ai=Security%20and%20Privacy%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

---

## ؜؜observability

- ؜متریک/لاگ/تریس: متریک‌های Hystrix؛ ‏Elasticsearch + داشبوردها برای ردیابی مشکلات کاربری/سیستمی (signup، login، playback). ؜ 

[Ask AI: observability](https://alisol.ir/?ai=Observability%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

---

## ؜پرسش‌های follow-up (از مصاحبه‌گر)

- ؜در ویدیو ذکر نشده است.

[Ask AI: follow-up](https://alisol.ir/?ai=Follow-up%20Questions%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

---

## ؜پرسش‌های پیشنهادیِ کاندیدا

- ؜در ویدیو ذکر نشده است.

[Ask AI: پرسش‌های کاندیدا](https://alisol.ir/?ai=Candidate%20Questions%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

---

## ؜نکات کلیدی

- ؜جداسازی control plane (AWS) از data plane (Open Connect). ؜ 
- ؜؜smart client + ABR برای مقابله با نوسان شبکه. ؜ 
- ؜؜gateway + circuit breaker برای جلوگیری از اثرات زنجیره‌ای خرابی. ؜ 
- ؜؜caching تهاجمی و locality-aware برای کاهش هزینه/latency. ؜ 
- ؜آمیختن ACID (MySQL) با scale-out (Cassandra) در جای مناسب. ؜ 
- ؜؜caching پیش‌دستانهٔ CDN و consistent hashing برای hit ratio بهتر.

[Ask AI: نکات کلیدی](https://alisol.ir/?ai=Key%20Takeaways%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

---

## ؜واژه‌نامه

- ؜؜**Open Connect؜**: CDN اختصاصی Netflix در ISPها. ؜ 
- ؜؜**ABR (Adaptive Bitrate)؜**: روشی برای تطبیق کیفیت ویدیو با پهنای‌باند. ؜ 
- ؜؜**Zuul؜**: ‏API gateway برای routing/filters و traffic shaping. ؜ 
- ؜؜**Hystrix؜**: کتابخانهٔ latency/fault tolerance (timeout, bulkhead, fallback). ؜ 
- ؜؜**EVCache؜**: ‏cache توزیع‌شدهٔ Netflix بر پایهٔ memcached. ؜ 
- ؜؜**Chukwa/Kafka/Samza؜**: زنجیرهٔ ingest/pub-sub/routing برای رویدادها/لاگ‌ها.

[Ask AI: واژه‌نامه](https://alisol.ir/?ai=Glossary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

---

## ؜برنامهٔ مطالعه (اختیاری)

- ؜بازبینی الگوهای gateway و circuit breaking. ؜ 
- ؜نمونه‌سازی ABR و استراتژی‌های CDN caching. ؜ 
- ؜تمرین تریدآف‌ها: SQL در برابر NoSQL؛ سیاست‌های cache؛ edge در برابر origin.

[Ask AI: برنامهٔ مطالعه](https://alisol.ir/?ai=Study%20Plan%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Netflix%20System%7Cfa)

---

## ؜؜Attribution

- ؜منبع ویدیو: https://www.youtube.com/watch?v=psQzyFfsUGU  
- ؜کانال: Tech Dummies - ؜Narendra Lakshmana Gowda  
- ؜یادداشت: این سند خلاصه‌ای از ویدیوی پیوندشده است.

---

## ؜دربارهٔ خلاصه‌کننده

من *Ali Sol* هستم، توسعه‌دهندهٔ PHP. ؜بیشتر بدانید:  
- ؜وب‌سایت: https://alisol.ir  
- ؜لینکدین: https://www.linkedin.com/in/alisolphp
