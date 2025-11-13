# ؜خلاصه دوره: معماری Serverless

؜**پلتفرم؜**: LinkedIn Learning  
؜**مدرس؜**: Lynn Langit  
؜**رتبه‌بندی (Rating)؜**: 4.7 از 5 (103 امتیاز)  
؜**تاریخ انتشار؜**: 11/16/2023  
؜**سطح؜**: متوسط  
؜**طول دوره؜**: 02:02:00  
؜**لینک دوره؜**: https://www.linkedin.com/learning/serverless-architecture-19870153  

> این متن، خلاصهٔ نکات مهم دوره است و برای مرور سریع طراحی شده؛ با این حال، اگر امکانش را دارید، دیدن خود دوره را هم پیشنهاد می‌کنم.

---

## ؜؜۱. ؜شروع دوره و اهمیت Serverless

در ابتدای دوره، Lynn توضیح می‌دهد که چرا معماری Serverless برای چابکی (Agility) کسب‌وکار مهم است؛ این‌که بتوانی خیلی سریع، ساده و با هزینهٔ کم، اپلیکیشن‌های Cloud را راه‌اندازی و Scale کنی. ؜ایدهٔ اصلی این است که به‌جای درگیر شدن با سرور، سیستم‌عامل، Patch و …، تمرکزت را بگذاری روی Deliver کردن Value برای کاربر.

او همینجا خودش را به‌عنوان Cloud Architect معرفی می‌کند و می‌گوید قرار است در این دوره:
- ؜اول مفاهیم پایه‌ای Serverless را یاد بگیری؛  
- ؜بعد سرویس‌ها و Patternهای رایج روی AWS و GCP را ببینی؛  
- ؜و در نهایت بتوانی مسیر مهاجرت سیستم‌هایت به Serverless را طراحی کنی.

؜**مثال؜**: فرض کن یک تیم کوچک می‌خواهد یک محصول جدید را لانچ کند و اصلاً مطمئن نیست چقدر کاربر می‌گیرد. ؜اگر بروند سراغ VM و Load Balancer و …، هم هزینه‌اش بالا می‌رود، هم زمان‌بر است. ؜ولی اگر یک Backend سادهٔ Serverless (مثلاً API Gateway + Lambda یا Cloud Functions) راه بیندازند، فقط وقتی کاربر هست هزینه می‌پردازند و مقیاس‌پذیری هم خودکار است.

؜**لینک برای جزئیات بیشتر؜**: [Ask AI: Getting started with the course](https://alisol.ir/?ai=Getting%20started%20with%20the%20course%7CLynn%20Langit%7CServerless%20Architecture%7Cfa)

---

## ؜؜۲. ؜مفاهیم اصلی Serverless

هستهٔ Serverless این است که ؜**خودت مستقیماً سرور را مدیریت نمی‌کنی؜**، ولی همچنان از Compute، Storage، Database و سایر سرویس‌های Cloud استفاده می‌کنی. ؜Lynn تأکید می‌کند که باید ؜**Compute؜** (چیزهایی مثل Functionها، Containerها) را از ؜**Data؜** (فایل‌ها، Tableها، Object Storage و…) جدا ببینی:
- ؜Compute معمولاً Ephemeral و کوتاه‌عمر است؛  
- ؜Data پایدار (Durable) است و طولانی‌مدت نگه داشته می‌شود.

او یک مقایسهٔ کلی بین این مدل‌ها انجام می‌دهد:
- ؜IaaS: مثل VM که خودت خیلی چیزها را مدیریت می‌کنی. ؜ 
- ؜PaaS / Containers: یک لایهٔ مدیریت‌شده روی سرورها، ولی هنوز درگیر Scaling و تنظیمات هستی. ؜ 
- ؜FaaS (Functions-as-a-Service): مثل AWS Lambda و Cloud Functions که فقط کد می‌نویسی، Event تعریف می‌کنی و Cloud بقیه کارها را انجام می‌دهد.

نکتهٔ مهم دیگر مدل Billing است: در Functionها معمولاً ؜**بر اساس Invocation و زمان اجرا؜** پول می‌دهی. ؜اگر درست طراحی کنی، می‌تواند بین ۱۰ تا ۱۰۰ برابر نسبت به VM همیشه روشن، ارزان‌تر شود.

؜**مثال؜**: به‌جای این‌که یک VM ۲۴ ساعته روشن نگه داری تا هر وقت کاربر عکسی آپلود کرد، تصویر Resize شود، یک Function می‌نویسی که فقط لحظهٔ Upload فایل در Bucket اجرا می‌شود، عکس را Resize می‌کند و تمام؛ هیچ هزینه‌ای برای زمان Idle نمی‌دهی.

؜**لینک برای جزئیات بیشتر؜**: [Ask AI: Core serverless concepts](https://alisol.ir/?ai=Core%20serverless%20concepts%7CLynn%20Langit%7CServerless%20Architecture%7Cfa)

---

## ؜؜۳. ؜الگوها و کاربردهای Serverless

؜Lynn بعد از مفاهیم پایه، می‌رود سراغ Patternهای عملی روی GCP و AWS.

روی Google Cloud معمولاً یک معماری Web Serverless می‌تواند این اجزا را داشته باشد:
- ؜Cloud Storage برای Static Fileها (HTML، CSS، JS و …)،  
- ؜Firestore یا Cloud SQL / Bigtable برای Data،  
- ؜Cloud Functions یا Cloud Run برای Compute،  
- ؜API Gateway یا Endpoints برای Publish کردن APIها.

روی AWS الگوی کلاسیک می‌تواند این باشد:
- ؜S3 برای Static Content،  
- ؜DynamoDB برای NoSQL Data،  
- ؜Lambda برای منطق برنامه (Business Logic)،  
- ؜API Gateway برای REST / HTTP API،  
- ؜و سرویس‌های مکمل مثل SNS، SQS، Kinesis و … .

؜Cloud Providerها عموماً تعداد زیادی سرویس Serverless دیگر هم دارند (Streaming، Security، Analytics و …) که همه به این هدف طراحی شده‌اند که ؜**Undifferentiated Heavy Lifting؜** را به Cloud بسپارند.

؜**مثال؜**: یک Web App پویا که:
- ؜Frontend آن روی S3 یا Cloud Storage میزبانی می‌شود،  
- ؜Data در DynamoDB یا Firestore ذخیره می‌شود،  
- ؜Backend با Lambda یا Cloud Functions پشت API Gateway نشسته است،  
- ؜و تمام Scale-Up/Down به‌صورت خودکار توسط Cloud انجام می‌شود.

؜**لینک برای جزئیات بیشتر؜**: [Ask AI: Serverless use cases and patterns](https://alisol.ir/?ai=Serverless%20use%20cases%20and%20patterns%7CLynn%20Langit%7CServerless%20Architecture%7Cfa)

---

## ؜؜۴. ؜کنترل هزینه در Serverless

یکی از وعده‌های بزرگ Serverless کاهش هزینه است؛ اما این اتفاق به‌صورت ؜**خودکار؜** نمی‌افتد. ؜چون عملاً «فقط برای استفاده پول می‌دهی»، اگر معماری بدی بچینی، می‌توانی خیلی سریع هزینهٔ زیادی تولید کنی.

نکاتی که Lynn روی آن‌ها تأکید می‌کند:
- ؜همیشه با Proof of Concept کوچک شروع کن. ؜ 
- ؜از Free Tier سرویس‌ها تا حد ممکن استفاده کن. ؜ 
- ؜Billing Alert و Budget تعریف کن. ؜ 
- ؜بعد از تست و آزمایش، Resourceها را پاک کن (Project، Bucket، Function و… را رها نکن). ؜ 

برای توضیح بهتر، BigQuery را مثال می‌زند؛ سرویسی که:
- ؜اگر Query کوچکی روی حجم کم داده بزنی، فوق‌العاده ارزان است؛  
- ؜ولی اگر بی‌دقت باشی و بارها روی ده‌ها ترابایت Data Query بدون Filter بزنی، خیلی سریع هزینه بالا می‌رود؛ چون مدل Billing بر اساس ؜**Data Scanned؜** است.

؜**مثال؜**: یک تیم روی ۱ گیگ داده در BigQuery چند Query ساده اجرا می‌کند؛ هزینه تقریباً ناچیز است. ؜اما اگر اشتباهاً یک Table چند ده ترابایتی را بدون Partition و Filter Query کنند و چندین‌بار این Query را تکرار کنند، ممکن است در یک بعدازظهر، صورت‌حساب قابل‌توجهی بسازند.

؜**لینک برای جزئیات بیشتر؜**: [Ask AI: Cost control with serverless](https://alisol.ir/?ai=Cost%20control%20with%20serverless%7CLynn%20Langit%7CServerless%20Architecture%7Cfa)

---

## ؜؜۵. ؜چالش‌ها و ریسک‌های Serverless

؜Serverless فقط مزیت نیست؛ چالش و ریسک هم دارد:

- ؜ابزارها و تجربهٔ Local Development هنوز به‌طور کامل بالغ نشده‌اند. ؜ 
- ؜خود سرویس‌ها شاید ارزان باشند، اما ؜**مهاجرت؜** از سیستم‌های Legacy، آموزش تیم، بازنویسی Codebase و طراحی مجدد معماری می‌تواند خیلی هزینه‌بر باشد. ؜ 
- ؜شکستن یک Monolith بزرگ به ده‌ها یا صدها Function کوچک، از نظر طراحی، تست و امنیت کار ساده‌ای نیست. ؜ 
- ؜Cold Start می‌تواند برای سیستم‌های Latency-Sensitive مشکل‌ساز شود. ؜ 
- ؜سرویس‌های سطح‌بالا (Managed Services) معمولاً Vendor Lock-in بیشتری ایجاد می‌کنند.

؜Lynn توصیه می‌کند به‌جای این‌که یک سیستم عظیم را یک‌جا Serverless کنی، از ؜**پروژه‌های کوچک، کم‌ریسک و مستقل؜** شروع کنی و کم‌کم تجربهٔ تیم را بالا ببری.

؜**مثال؜**: یک شرکت سعی می‌کند کل ERP قدیمی خود را مستقیم به صدها Lambda Function تبدیل کند. ؜پروژه طولانی، پیچیده و پرهزینه می‌شود و در نهایت متوجه می‌شوند که بهتر بود فقط یک بخش کوچک، مثلاً ماژول تولید PDF فاکتور را به‌صورت Serverless پیاده‌سازی و تجربه کسب می‌کردند.

؜**لینک برای جزئیات بیشتر؜**: [Ask AI: Risks and challenges of serverless](https://alisol.ir/?ai=Risks%20and%20challenges%20of%20serverless%7CLynn%20Langit%7CServerless%20Architecture%7Cfa)

---

## ؜؜۶. ؜امنیت و Observability در Serverless

امنیت در Serverless بیش از هر چیز از ؜**IAM؜** شروع می‌شود:
- ؜استفاده از Roleهای مشخص،  
- ؜اصل Least Privilege (حداقل سطح دسترسی)،  
- ؜پرهیز از Permissionهای کلی مثل `"*"`،  
- ؜و فعال‌سازی MFA برای حساب‌های حساس.

هم‌زمان باید سطح حمله (Attack Surface) را کوچک کنی؛ یعنی سرویس‌هایی را که نیاز نداری ؜**کاملاً غیرفعال؜** کنی. ؜ 

؜Lynn می‌گوید ذهنیت اصلی در امنیت Cloud باید ؜**Observability؜** باشد:
- ؜به‌جای تلاش برای بستن تمام راه‌های ممکن حمله از قبل،  
- ؜باید Logging، Metrics و Alertها را درست تنظیم کنی تا ببینی چه کسی، چه زمانی و از کجا، به چه چیزی دسترسی دارد. ؜ 

در GCP و AWS می‌توانی:
- ؜برای Bucketها، Functionها، APIها و … Log و Metric فعال کنی،  
- ؜در سطح Project/Account، Dashboard و Alert بسازی  
تا هر رفتار غیرعادی را زود ببینی.

؜**مثال؜**: به‌جای دادن Role «storage.admin» به یک Service Account روی همهٔ Bucketها، یک Role سفارشی تعریف می‌کنی که فقط Read روی یک Bucket خاص دارد. ؜بعد هم Log و Alert تنظیم می‌کنی که اگر این Bucket ناگهان از Region دیگری یا با Rate غیرطبیعی خوانده شد، سریع اطلاع داده شود.

؜**لینک برای جزئیات بیشتر؜**: [Ask AI: Security and observability in serverless](https://alisol.ir/?ai=Security%20and%20observability%20in%20serverless%7CLynn%20Langit%7CServerless%20Architecture%7Cfa)

---

## ؜؜۷. ؜سرویس‌ها و تاریخچه Serverless

؜Lynn کمی به عقب برمی‌گردد و تاریخچهٔ سرویس‌های Serverless-Style را مرور می‌کند:

- ؜AWS S3 در سال ۲۰۰۶ معرفی شد؛ یک Object Storage کاملاً Managed و فوق‌العاده Durable. ؜ 
- ؜Google App Engine حدود ۲۰۰۸ آمد و یکی از اولین Platformهای «کد بده، بقیه‌اش با ما» بود. ؜ 
- ؜BigQuery در ۲۰۱۱، مفهوم ؜**Serverless Analytics؜** را مطرح کرد. ؜ 
- ؜AWS Lambda در ۲۰۱۴ عملاً FaaS را Mainstream کرد. ؜ 
- ؜بعدتر Google Cloud Functions و Azure Functions اضافه شدند و کم‌کم Gen 2 روی GCP با Cloud Run ادغام شد.

در GCP، Functionهای نسل دوم (2nd gen) در واقع روی Cloud Run/Knative سوار هستند؛ یعنی:
- ؜می‌توانی از همان Function شروع کنی،  
- ؜بعد YAML تولیدشده را بگیری،  
- ؜و اگر لازم شد، معماری را به Cloud Run یا حتی GKE منتقل کنی.

؜**مثال؜**: یک Function داری که تصاویر را با استفاده از Vision API پردازش می‌کند و نتیجه را در Bucket ذخیره می‌کند. ؜اول این را به‌صورت Cloud Functions Gen 2 پیاده می‌کنی. ؜بعد که Requirementها پیچیده‌تر شد، همان کد و Container Image را روی Cloud Run یا Kubernetes Deploy می‌کنی، بدون این‌که مجبور شوی کل منطق را از صفر بنویسی.

؜**لینک برای جزئیات بیشتر؜**: [Ask AI: Key serverless services and history](https://alisol.ir/?ai=Key%20serverless%20services%20and%20history%7CLynn%20Langit%7CServerless%20Architecture%7Cfa)

---

## ؜؜۸. ؜Object Storage، دیتالیک و طراحی داده

در معماری‌های Serverless، معمولاً Object Storage (مثل S3 یا Cloud Storage) ستون فقرات Data است. ؜Lynn اشاره می‌کند که خیلی از تیم‌ها طراحی Bucket و Data Layout را دست‌کم می‌گیرند:
- ؜Permissionها،  
- ؜Audit و Logging،  
- ؜Lifecycle Policyها،  
- ؜Classهای مختلف Storage برای بهینه‌سازی هزینه،  
همه مهم هستند.

روی این پایه، الگوهای مدرن‌تری مثل ؜**Data Lake؜**، ؜**Lakehouse؜** و ؜**Data Mesh؜** ساخته می‌شود. ؜در GCP این اکوسیستم شامل سرویس‌هایی مثل:
- ؜BigQuery،  
- ؜Dataproc Serverless،  
- ؜Dataplex،  
- ؜BigLake  
است. ؜ایده این است که Data را در Storage ارزان و Durable نگه داری و بر حسب نیاز، انواع Engineهای Serverless Compute را به آن متصل کنی.

؜**مثال؜**: یک شرکت تمام Logها و CSVها را در Cloud Storage می‌ریزد، آن‌ها را به‌عنوان Tableهای BigLake به BigQuery معرفی می‌کند، برای Transformهای سنگین از Dataproc Serverless (Spark) استفاده می‌کند، و Dashboardها را روی Looker می‌سازد؛ بدون این‌که لازم باشد Data را بین سیستم‌های مختلف جابه‌جا کند.

؜**لینک برای جزئیات بیشتر؜**: [Ask AI: Object storage, data lakes, and data design](https://alisol.ir/?ai=Object%20storage%2C%20data%20lakes%2C%20and%20data%20design%7CLynn%20Langit%7CServerless%20Architecture%7Cfa)

---

## ؜؜۹. ؜رویدادها، Messaging و Streamها

معماری‌های Serverless ذاتاً ؜**Event-Driven؜** هستند. ؜Eventها می‌توانند از این‌جاها بیایند:
- ؜Upload فایل به Bucket،  
- ؜تغییر در Database (Insert/Update/Delete)،  
- ؜Requestهای HTTP،  
- ؜تغییر وضعیت Resourceها در Cloud و … .

روی GCP، Pub/Sub و Eventarc نقش مهمی دارند:
- ؜Pub/Sub برای Messaging و Streaming Data،  
- ؜Eventarc برای اتصال Event سرویس‌های مختلف به Cloud Functions یا Cloud Run بدون wiring دستی Topicها.

؜Lynn سناریوهایی نشان می‌دهد که در آن:
- ؜آپلود یک فایل در Bucket،  
- ؜یک Function را Trigger می‌کند،  
- ؜Function به Vision API (یا سایر سرویس‌ها) وصل می‌شود،  
- ؜و خروجی را به‌صورت JSON در جای دیگری ذخیره می‌کند.

؜**مثال؜**: وقتی کاربر یک عکس را در Bucket «vision-input» آپلود می‌کند، Eventarc یک Cloud Function را Trigger می‌کند. ؜Function عکس را به Vision API می‌فرستد، برچسب‌هایی مثل «water»، «mountain»، «person» را می‌خواند و نتیجه را به‌صورت یک فایل JSON در Bucket «annotations» ذخیره می‌کند تا بعداً در BigQuery روی آن تحلیل انجام شود.

؜**لینک برای جزئیات بیشتر؜**: [Ask AI: Events, messaging, and streams](https://alisol.ir/?ai=Events%2C%20messaging%2C%20and%20streams%7CLynn%20Langit%7CServerless%20Architecture%7Cfa)

---

## ؜؜۱۰. ؜Microservices و طراحی دیتابیس

خیلی‌ها Microservices و Serverless را با هم قاطی می‌کنند. ؜Lynn تأکید می‌کند که:
- ؜Microservice واقعی یعنی یک Slice نازک End-to-End از اپلیکیشن که ؜**Compute و Data مختص خودش؜** را دارد. ؜ 
- ؜Anti-Pattern معروف «Serverless Monolith» جایی است که ده‌ها Function مختلف همگی به یک Database مشترک وصل می‌شوند و همین Database به گلوگاه تبدیل می‌شود.

در معماری بهتر، هر Microservice:
- ؜Functionها یا Containerهای خودش را دارد،  
- ؜Data Store مخصوص خودش (مثلاً یک Table یا یک NoSQL Collection) را مالک است،  
- ؜و با سرویس‌های دیگر از طریق API یا Event ارتباط می‌گیرد، نه از طریق Table مشترک.

؜**مثال؜**: به‌جای این‌که همه‌چیز یک Database مشترک داشته باشد، یک Microservice «User Profile» یک دیتابیس NoSQL کوچک و چند Function دارد؛ یک Microservice «Billing» دیتابیس جدا و Functionهای مالی خود را دارد؛ این‌ها از طریق API یا Event با هم حرف می‌زنند، نه این‌که روی یک Table مشترک Query بزنند.

؜**لینک برای جزئیات بیشتر؜**: [Ask AI: Microservices and database design](https://alisol.ir/?ai=Microservices%20and%20database%20design%7CLynn%20Langit%7CServerless%20Architecture%7Cfa)

---

## ؜؜۱۱. ؜Cloud Functions و انتخاب Compute

؜Cloud Functionها یکی از اصلی‌ترین Primitiveهای Compute در معماری Serverless هستند. ؜Lynn موارد زیر را پوشش می‌دهد:
- ؜ساخت Function (Gen 1 و Gen 2 روی GCP)،  
- ؜انتخاب Runtime (Node.js، Python، Go، .NET، Java، PHP، Ruby و …)،  
- ؜تنظیم Memory و CPU،  
- ؜Timeout،  
- ؜Concurrency و Auto-Scaling،  
- ؜اتصال به سایر سرویس‌ها (Database، Storage، APIها و …).

او تأکید می‌کند که ؜**Configuration صحیح؜**، هم روی Performance و هم روی Cost اثر مستقیم دارد. ؜علاوه بر این، Logها، Metricها و YAMLای که برای Deploy تولید می‌شود، ابزار مهمی برای Debug و بعدها برای Migration به Cloud Run یا Kubernetes است.

؜**مثال؜**: یک Function Node.js را با ۲۵۶ مگابایت RAM و Concurrency = 1 Deploy می‌کنی. ؜در Load Test می‌بینی Latency بالا می‌رود. ؜با نگاه به Metricها تصمیم می‌گیری Memory را به ۱ گیگ و Concurrency را به ۵۰ برسانی؛ نتیجه این می‌شود که بدون داشتن VM بزرگ و همیشه روشن، Throughput بالا می‌رود و Latency پایین می‌آید.

؜**لینک برای جزئیات بیشتر؜**: [Ask AI: Cloud functions and compute choices](https://alisol.ir/?ai=Cloud%20functions%20and%20compute%20choices%7CLynn%20Langit%7CServerless%20Architecture%7Cfa)

---

## ؜؜۱۲. ؜استقرار Functions و Infrastructure as Code (IaC)

؜Deploy کردن Serverless از طریق Console و Click کردن، در محیط‌های جدی و بزرگ جواب نمی‌دهد. ؜Lynn توصیه می‌کند حتماً از ابزارهایی مثل ؜**Terraform؜** برای IaC استفاده شود؛ یعنی:
- ؜همهٔ Resourceها (Bucket، Function، API Gateway، IAM و …) به‌صورت Code تعریف شوند،  
- ؜این Code در Version Control نگه‌داری شود،  
- ؜و Deploymentها از طریق CI/CD Pipeline انجام شوند.

او نشان می‌دهد که چطور Jumpstart Solutionها و Templateهای Terraform می‌توانند یک معماری کامل را یک‌جا بالا بیاورند و این‌که Logهای Cloud Build یا CodeBuild چطور در Debug مشکل Deployment کمک می‌کنند.

؜**مثال؜**: به‌جای این‌که دستی یک Bucket و یک Function و یک API Gateway بسازی، یک Terraform Template داری که همه را تعریف کرده. ؜برای ایجاد محیط جدید در Region دیگر یا Project جدید، فقط همان Template را با Variableهای متفاوت `terraform apply` می‌کنی.

؜**لینک برای جزئیات بیشتر؜**: [Ask AI: Deploying functions and infrastructure as code](https://alisol.ir/?ai=Deploying%20functions%20and%20infrastructure%20as%20code%7CLynn%20Langit%7CServerless%20Architecture%7Cfa)

---

## ؜؜۱۳. ؜Serverless Containers و Kubernetes

«؜Serverless Containers» پلی است بین Functionهای خالص و Cluster کامل Kubernetes. ؜در واقع زیر همهٔ این سرویس‌ها، Container روی Server واقعی در حال اجرا است؛ اما در Serverless Containers مثل:
- ؜Cloud Run (روی Knative)،  
- ؜AWS Fargate،  
شما فقط Image را می‌دهی و Scaling، سرور، Patch و … را Cloud مدیریت می‌کند.

؜Kubernetes (مثل GKE و EKS) یک لایهٔ پایین‌تر با کنترل بیشتر و پیچیدگی بالاتر است. ؜Lynn نشان می‌دهد چطور می‌توان:
- ؜از Cloud Run شروع کرد،  
- ؜و اگر نیاز بود، همان Image و معماری را به GKE یا EKS منتقل کرد.

؜**مثال؜**: یک REST API داری که به Runtime خاص یا Library Native نیاز دارد. ؜آن را در یک Container Package می‌کنی و روی Cloud Run Deploy می‌کنی. ؜بعد از رشد سیستم و نیاز به Traffic Shaping پیچیده، Multi-Region و Network Policyهای ریز، همان Image را روی GKE Deploy می‌کنی تا کنترل کامل در Kubernetes داشته باشی.

؜**لینک برای جزئیات بیشتر؜**: [Ask AI: Serverless containers and Kubernetes](https://alisol.ir/?ai=Serverless%20containers%20and%20Kubernetes%7CLynn%20Langit%7CServerless%20Architecture%7Cfa)

---

## ؜؜۱۴. ؜معماری‌های Serverless روی AWS در عمل

؜Lynn برای AWS، یک پروژهٔ جستجوی Genomics در استرالیا را مثال می‌زند که معماری Web Serverless کلاسیک دارد:
- ؜S3 برای ذخیرهٔ Static Content،  
- ؜DynamoDB برای Data،  
- ؜Lambda برای Business Logic،  
- ؜API Gateway برای Endpointهای HTTP،  
- ؜SNS برای پردازش Async،  
- ؜CloudFront برای CDN و توزیع جهانی.

او نشان می‌دهد که چطور با:
- ؜فعال‌سازی Logging دقیق،  
- ؜استفاده از AWS X-Ray برای دیدن Traceها و Service Map،  
می‌توان Bottleneckها را پیدا کرد. ؜در همین مثال با کمی Refactor روی Lambda و معماری، حدود ۸۰٪ بهبود Performance به‌دست آمده است.

؜**مثال؜**: در X-Ray می‌بینی یک Lambda Function روی مسیر خاصی همیشه قرمز و کند است. ؜آن Function را به دو Function کوچک‌تر با مسئولیت مشخص تقسیم می‌کنی و دسترسی به Data را بهینه می‌کنی؛ نتیجه این می‌شود که Response Time درخواست‌های کلیدی به‌طور قابل‌توجهی کم می‌شود.

؜**لینک برای جزئیات بیشتر؜**: [Ask AI: AWS serverless architectures in practice](https://alisol.ir/?ai=AWS%20serverless%20architectures%20in%20practice%7CLynn%20Langit%7CServerless%20Architecture%7Cfa)

---

## ؜؜۱۵. ؜معماری‌های Serverless روی GCP در عمل

؜Lynn در ادامه، سفرهای مدرن‌سازی روی AWS و GCP را به‌صورت مرحله‌ای توضیح می‌دهد. ؜ایده این است که:
- ؜به‌جای پرش مستقیم از On-Prem Monolith به Full Serverless،  
- ؜مسیر را به چند Milestone تقسیم کنی:

مثلاً:
1. ؜ابتدا Lift-and-Shift به VMها (روی EC2 یا Compute Engine). ؜ 
2. ؜بعد استفاده از Databaseها و Storage Managed (مثل RDS، Cloud SQL، S3، Cloud Storage). ؜ 
3. ؜سپس اضافه کردن قطعات Serverless (Lambda، Fargate یا Cloud Functions، Cloud Run). ؜ 
4. ؜و در نهایت ساخت CI/CD Pipeline با CodeCommit/CodePipeline/CodeBuild یا Cloud Build و GKE.

همین الگو را می‌توان روی GCP با سرویس‌هایی مثل Cloud Run، Dataproc Serverless، BigQuery و GKE پیاده کرد.

؜**مثال؜**: یک اپلیکیشن رویدادهای زمانی، ابتدا همان‌طور که هست به EC2 و RDS منتقل می‌شود. ؜بعد Cron Jobهای قدیمی با Lambdaهای زمان‌بندی‌شده جایگزین می‌شوند. ؜بعد بخش‌هایی از اپ در Fargate اجرا می‌شود و در نهایت جدول‌ها یکی‌یکی به DynamoDB و Timestream منتقل می‌شوند. ؜روی GCP هم سناریویی مشابه را می‌توان با Compute Engine، Cloud Run، Cloud Scheduler، Pub/Sub و BigQuery پیاده کرد.

؜**لینک برای جزئیات بیشتر؜**: [Ask AI: GCP serverless architectures in practice](https://alisol.ir/?ai=GCP%20serverless%20architectures%20in%20practice%7CLynn%20Langit%7CServerless%20Architecture%7Cfa)

---

## ؜؜۱۶. ؜Serverless Data Lake و Data Mesh

برای کارهای Data-Intensive، Lynn روی الگوهای ؜**Data Lake؜**، ؜**Lakehouse؜** و ؜**Data Mesh؜** در GCP تمرکز می‌کند. ؜معماری پیشنهادی:
- ؜Raw Data در Cloud Storage (Bucketها) ذخیره می‌شود،  
- ؜Dataplex Lake و Zoneها را مدیریت و Catalog و Policyها را کنترل می‌کند،  
- ؜BigLake و External Tableها، Data را برای BigQuery قابل Query می‌کنند،  
- ؜Dataproc Serverless برای Jobهای Spark و Transformهای سنگین استفاده می‌شود،  
- ؜Looker برای Dashboard و Visualization به‌کار می‌رود.

؜Dataplex کمک می‌کند Governance، Catalog و Policy Enforcement روی تعداد زیادی Dataset به‌صورت مرکزی انجام شود؛ چیزی شبیه «Microservices برای Analytics». ؜Jumpstart Templateها هم باعث می‌شوند بتوانی این معماری پیچیده را سریع‌تر و استانداردتر بالا بیاوری.

؜**مثال؜**: یک شرکت، Analytics Lakehouse Jumpstart را Deploy می‌کند: Eventهای خام به Cloud Storage می‌آیند، یک Job Serverless Spark آن‌ها را به Tableهای Partition شده (مثل Parquet / Iceberg) تبدیل می‌کند، Dataplex آن‌ها را Catalog می‌کند، BigQuery از طریق BigLake آن‌ها را Query می‌کند و Product Managerها در Looker روی همان داده‌ها تحلیل انجام می‌دهند؛ بدون این‌که نگران ساختار داخلی Bucketها باشند.

؜**لینک برای جزئیات بیشتر؜**: [Ask AI: Serverless data lakes and data mesh](https://alisol.ir/?ai=Serverless%20data%20lakes%20and%20data%20mesh%7CLynn%20Langit%7CServerless%20Architecture%7Cfa)

---

## ؜؜۱۷. ؜طراحی مسیر Serverless شخصی خودت

در پایان دوره، Lynn چند توصیهٔ عملی می‌دهد:
- ؜معماری‌ها را تا حد ممکن ؜**ساده؜** نگه دار. ؜ 
- ؜همه‌چیز (از جمله Cost) را ؜**Secure؜** و ؜**Observable؜** کن. ؜ 
- ؜فرهنگ DevOps را جدی بگیر؛ «برای Cloud در خود Cloud Develop کن». ؜ 
- ؜ابتدا روی طراحی سرویس‌های Data و جداسازی Compute از Data تمرکز کن. ؜ 
- ؜سطح Abstraction مناسب را انتخاب کن (Function، Container، VM)؛ بسته به آمادگی تیم و نیاز Workload.

او تأکید می‌کند که بهتر است به‌جای بازطراحی کامل سیستم، به‌صورت ؜**Iterative؜** حرکت کنی: یک Use Case کوچک را Serverless کن، از آن درس بگیر و بعد برو سراغ بعدی. ؜همچنین به GitHub خودش برای Resourceهای بیشتر اشاره می‌کند.

؜**مثال؜**: به‌جای این‌که کل سیستم را یک‌جا عوض کنی، فقط یک کار کوچک مثل تولید Report شبانه را انتخاب می‌کنی: Data در یک Bucket، یک Function زمان‌بندی‌شده، و یک Trigger (مثلاً Cloud Scheduler یا Event). ؜بعد Cost، Performance و Logها را رصد می‌کنی، تجربه می‌گیری و بعد به سراغ قسمت بعدی سیستم می‌روی.

؜**لینک برای جزئیات بیشتر؜**: [Ask AI: Planning your own serverless journey](https://alisol.ir/?ai=Planning%20your%20own%20serverless%20journey%7CLynn%20Langit%7CServerless%20Architecture%7Cfa)

---

؜**دورهٔ اصلی؜**: [Serverless Architecture روی LinkedIn Learning](https://www.linkedin.com/learning/serverless-architecture-19870153)

---

؜**دربارهٔ خلاصه‌کننده؜**  

من *Ali Sol* هستم، PHP Developer. ؜ 
- ؜وب‌سایت: https://alisol.ir  
- ؜لینکدین: https://www.linkedin.com/in/alisolphp  

