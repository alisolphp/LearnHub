# ؜خلاصه کتاب: Designing Data-Intensive Applications (DDIA)

* ؜**نویسنده؜**: Martin Kleppmann  
* ؜**ژانر؜**: سیستم‌های توزیع‌شده و Data Engineering  
* ؜**تاریخ انتشار؜**: مارس ۲۰۱۷  

این متن خلاصه‌ای از مهم‌ترین ایده‌ها و نکات کتاب *Designing Data-Intensive Applications* است.
برای درک عمیق‌تر و دیدن مثال‌ها و استدلال‌های کامل، خواندن نسخه‌ی اصلی کتاب کاملاً توصیه می‌شود.

## ؜قبل از شروع

* این خلاصه برای مرور سریع و تثبیت مفاهیم اصلی است. ؜ 
* از آن به‌عنوان نقشه استفاده کن؛ هرجا احساس کردی مبحث مهم یا مبهم است، به فصل مربوطه در کتاب اصلی رجوع کن. ؜ 
* می‌توانی روی لینک‌های `Ask AI` کلیک کنی و در مورد همان بخش، تعاملی سؤال بپرسی یا عمیق‌تر یاد بگیری.

---

## ؜پیش‌گفتار و تصویر کلی

؜**Summary (خلاصه)؜**:  
کتاب با توضیح این شروع می‌کند که چرا سیستم‌های داده‌ای در یکی دو دهه‌ی اخیر این‌قدر تغییر کرده‌اند. ؜امروز سرویس‌هایی داریم با حجم داده‌ی بسیار بالا، نیازهای availability شدید و الزامات تجاری که مدام عوض می‌شوند. ؜به‌جای «یک دیتابیس ساده»، معماری‌ها معمولاً ترکیبی از database، cache، search index، batch/stream processing و messaging هستند. ؜هدف DDIA این است که از سطح buzzwordها پایین‌تر برود و اصول پایه‌ی reliability، scalability و maintainability را یاد بدهد تا بتوانی درباره‌ی هر سیستم داده‌ای منطقی فکر کنی و ابزارها را درست کنار هم قرار بدهی.

؜**مثال؜**:  
یک وب‌اپ کوچک را تصور کن که با یک relational database ساده شروع می‌شود. ؜کم‌کم ترافیک بالا می‌رود؛ cache اضافه می‌کنی، full-text search می‌آید وسط، jobهای background و بعد هم data warehouse. ؜کم‌کم این ترکیب به یک «هزار تو» تبدیل می‌شود. ؜DDIA نقش راهنما را دارد تا بفهمی هر قطعه دقیقاً چه کاری می‌کند، کجای معماری می‌نشیند و چطور می‌شود کل سیستم را کمتر شکننده طراحی کرد.

؜**Link for More Details؜**:  
[Ask AI: Preface and Big Picture](https://alisol.ir/?ai=Preface%20and%20Big%20Picture%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications%20%28DDIA%29%7Cfa)

---

## ؜مبانی سیستم‌های داده‌ای (Part I)

؜**خلاصه؜**:  
در Part I اهداف اصلی سیستم‌های داده‌ای تعریف می‌شود: reliability، scalability و maintainability؛ و بعد سراغ بلوک‌های سازنده می‌رود: data modelها، storage engineها و روش‌های encoding. ؜ایده‌ی کلیدی این است که ابزارها سریع عوض می‌شوند، اما اصول زیربنایی ثابت‌ترند. ؜اگر بتوانی درباره‌ی failureها، load، نحوه‌ی چیدن داده روی دیسک و evolution اسکیمــاها درست فکر کنی، تقریباً هر «استک مدرن» را می‌توانی تحلیل کنی.

؜**مثال؜**:  
یک دیتابیس ساده‌ی کاربران برای یک استارتاپ در حال رشد را در نظر بگیر. ؜اول کار فقط یک جدول روی یک دیتابیس است. ؜بعد نیاز به read سریع‌تر، queryهای پیچیده‌تر و اضافه کردن fieldهای جدید بدون downtime پیدا می‌کنی. ؜Part I همان جعبه‌ابزی است که برای این مسیر به آن احتیاج داری.

؜**Link for More Details؜**:  
[Ask AI: Foundations of Data Systems](https://alisol.ir/?ai=Foundations%20of%20Data%20Systems%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications%20%28DDIA%29%7Cfa)

---

## ؜اپلیکیشن‌های Reliable، Scalable و Maintainable (فصل ۱)

؜**خلاصه؜**:  
در این فصل سه هدف کلیدی تعریف می‌شود:

- ؜؜**Reliability؜**: سیستم در حضور hardware fault، bug نرم‌افزاری و خطای انسانی همچنان «کار درست» را انجام دهد؛ اینجا مفاهیمی مثل replication، backup و fault tolerance مطرح می‌شود. ؜ 
- ؜؜**Scalability؜**: سیستم با افزایش load (کاربر بیشتر، داده‌ی بیشتر، requestهای بیشتر) از پا نیفتد و ترجیحاً با اضافه کردن resource حل شود نه با بازنویسی کامل. ؜load با پارامترهایی مثل request/sec، حجم داده، نسبت read/write و… توصیف می‌شود و performance با latency (معمولاً با percentile) و throughput. ؜ 
- ؜؜**Maintainability؜**: در طول عمر سیستم، افراد بتوانند آن را بفهمند، اداره کنند و تغییرش دهند. ؜این یعنی تمرکز روی operability (کار را برای تیم عملیات ساده کنیم)، simplicity (پیچیدگی غیرضروری ایجاد نکنیم) و evolvability (طراحی طوری باشد که تغییر، ارزان و کم‌ریسک باشد).

؜**مثال؜**:  
مثال timeline شبیه Twitter نشان می‌دهد چطور یک feature را می‌توان به شکل‌های مختلف پیاده‌سازی کرد: محاسبه روی read (نوشتن ارزان، خواندن گران) در مقابل محاسبه روی write (نوشتن گران، خواندن ارزان). ؜وقتی load بالا می‌رود، همین trade-offها تعیین می‌کند که اپلیکیشن تو همچنان سریع بماند یا عملاً unusable شود.

؜**Link for More Details؜**:  
[Ask AI: Reliable, Scalable, and Maintainable Applications](https://alisol.ir/?ai=Reliable%2C%20Scalable%2C%20and%20Maintainable%20Applications%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications%20%28DDIA%29%7Cfa)

---

## ؜Data Modelها و Query Languageها (فصل ۲)

؜**خلاصه؜**:  
فصل ۲ مقایسه می‌کند که دیتابیس‌های مختلف چطور درباره‌ی داده «فکر» می‌کنند:

- ؜؜**Relational model؜**: جدول، row و join؛ عالی برای رابطه‌های many-to-many و queryهای ad-hoc با SQL. ؜ 
- ؜؜**Document model؜**: داکیومنت‌های شبیه JSON؛ مناسب وقتی معمولاً کل یک aggregate (مثلاً پروفایل کاربر با positionها و educationهای تو در تو) را یکجا می‌خوانی/می‌نویسی و نیاز به اسکیمای انعطاف‌پذیر داری. ؜ 
- ؜؜**Graph model؜**: گره (vertex) و یال (edge)؛ وقتی داده ذاتاً یک شبکه‌ی از رابطه‌هاست—مثلاً social network، recommendation، کنترل دسترسی، knowledge graph و غیره.

همچنین زبان‌های declarative (مثل SQL، SPARQL، Cypher) را با کد imperative مقایسه می‌کند. ؜در declarative فقط می‌گویی *چه* می‌خواهی، نه *چطور* آن را محاسبه کند؛ این اجازه می‌دهد خود دیتابیس execution را optimize کند، کار را parallel کند و در آینده implementation داخلی را عوض کند بدون این‌که queryهای تو را بشکند.

؜**مثال؜**:  
یک صفحه‌ی پروفایل شبیه رزومه را می‌توانی با چند جدول نرمال‌شده (user، position، education و…) بسازی یا به‌صورت یک JSON document. ؜اگر بیشتر وقت‌ها کل پروفایل را یکجا می‌خوانی و نمایش می‌دهی، document model طبیعی‌تر است. ؜اما به‌محض این‌که بخواهی schoolها، companyها و آدم‌ها را در پروفایل‌های مختلف به هم لینک کنی، joinهای relational و traversal شبیه graph به‌شدت مهم می‌شوند.

؜**Link for More Details؜**:  
[Ask AI: Data Models and Query Languages](https://alisol.ir/?ai=Data%20Models%20and%20Query%20Languages%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications%20%28DDIA%29%7Cfa)

---

## ؜داده‌ی توزیع‌شده: Replication، Partitioning و Transactions (فصل‌های ۵ تا ۷)

؜**خلاصه؜**:  
بخش میانی کتاب توضیح می‌دهد وقتی داده‌ی تو دیگر روی یک ماشین جا نمی‌شود، چه بلایی سر طراحی می‌آید:

- ؜؜**Replication (فصل ۵)؜**: نگه‌داشتن چند replica از داده روی nodeهای مختلف برای تحمل خطا و بهبود کارایی read. ؜درباره‌ی leader–follower replication، writeهای synchronous و asynchronous، lag، ضمانت‌هایی مثل read-your-writes، multi-leader setup و سیستم‌های leaderless با quorum توضیح می‌دهد. ؜ 
- ؜؜**Partitioning / Sharding (فصل ۶)؜**: تقسیم داده روی nodeها، معمولاً بر اساس range یا hash روی key. ؜چالش‌هایی مثل hot spot، secondary indexهای پارتیشن‌شده و rebalancing هنگام اضافه/حذف node را پوشش می‌دهد. ؜ 
- ؜؜**Transactions (فصل ۷)؜**: این‌که چطور چند عملیات را در یک واحد atomic با ضمانت ACID جمع کنیم؛ و وقتی برای performance isolation را ضعیف‌تر می‌کنیم چه اتفاقی می‌افتد (سطح‌هایی مثل read committed، snapshot isolation، write skew و Serializable و تکنیک‌های مختلف برای پیاده‌سازی مثل locking، optimistic concurrency و حتی serial execution واقعی).

؜**مثال؜**:  
یک فروشگاه آنلاین را در نظر بگیر که سفارش‌ها را ذخیره می‌کند. ؜ابتدا تمام orderها روی یک دیتابیس هستند. ؜بعد از رشد، آن‌ها را بر اساس customer ID بین چندین ماشین shard می‌کنی و برای هر shard چند replica قرار می‌دهی تا readها local شوند و failure یک node کل سرویس را نخواباند. ؜Transactions تضمین می‌کنند به‌روزرسانی موجودی و ثبت پرداخت یا هر دو با هم موفق شوند یا هر دو rollback شوند، حتی اگر روی پارتیشن‌های مختلف باشند.

؜**Link for More Details؜**:  
[Ask AI: Distributed Data – Replication, Partitioning, and Transactions](https://alisol.ir/?ai=Distributed%20Data%3A%20Replication%2C%20Partitioning%2C%20and%20Transactions%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications%20%28DDIA%29%7Cfa)

---

## ؜سیستم‌های توزیع‌شده در دنیای واقعی: Fault، Consistency، Consensus (فصل‌های ۸ و ۹)

؜**خلاصه؜**:  
این فصل‌ها عمیق‌تر وارد دنیای نه‌چندان تمیز سیستم‌های توزیع‌شده می‌شوند:

- ؜؜**The Trouble with Distributed Systems (فصل ۸)؜**: شبکه بسته‌ها را گم می‌کند، delay زیاد می‌شود یا split-brain اتفاق می‌افتد؛ ماشین‌ها ممکن است کند یا نیمه‌مرده باشند؛ ساعت‌ها drift دارند و دقیق sync نیستند. ؜توضیح می‌دهد چرا timeoutها tricky هستند، partial failure یعنی چه و چرا تشخیص «node down شده یا فقط کند است» این‌قدر سخت است. ؜ 
- ؜؜**Consistency and Consensus (فصل ۹)؜**: از سطح مختلف consistency (مثل linearizability و causal ordering) شروع می‌کند و به distributed transaction و الگوریتم‌های consensus می‌رسد. ؜مفاهیمی مثل total order broadcast، two-phase commit (2PC) و consensus fault-tolerant برای کارهایی مثل leader election و مدیریت configuration را توضیح می‌دهد.

؜**مثال؜**:  
دو datacenter را در نظر بگیر که به کاربران مناطق مختلف سرویس می‌دهند. ؜یک network partition بین این دو اتفاق می‌افتد. ؜گروهی از کاربران در region اول write انجام می‌دهند، گروه دیگر در region دوم. ؜وقتی لینک دوباره برقرار می‌شود، سیستم باید updateهای متعارض را reconcile کند. ؜فصل‌های ۸ و ۹ واژگان و مدل‌های ذهنی لازم را می‌دهند تا این تضادها را تحلیل کنی و به‌جای تکیه روی شعار «eventual consistency درستش می‌کند»، آگاهانه درباره‌ی ضمانت‌هایی که می‌دهی تصمیم بگیری.

؜**Link for More Details؜**:  
[Ask AI: Distributed Systems in the Real World – Faults, Consistency, Consensus](https://alisol.ir/?ai=Distributed%20Systems%20in%20the%20Real%20World%3A%20Faults%2C%20Consistency%2C%20Consensus%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications%20%28DDIA%29%7Cfa)

---

## ؜داده مشتق‌شده: Batch Processing و Stream Processing (فصل‌های ۱۰ و ۱۱)

؜**خلاصه؜**:  
Part III روی ؜**derived data؜** تمرکز می‌کند—داده‌ای که از روی داده‌های دیگر محاسبه می‌شود تا queryها سریع‌تر شوند یا use caseهای جدید را پشتیبانی کند:

- ؜؜**Batch Processing (فصل ۱۰)؜**: به داده به‌عنوان logهای immutable نگاه می‌کند و آن‌ها را در batchهای بزرگ پردازش می‌کند. ؜از pipelineهای یونیکس شروع می‌کند و به سیستم‌های نوع MapReduce و فراتر از آن می‌رسد. ؜مفاهیمی مثل materialized intermediate result، join در مقیاس بزرگ و استفاده از batch job برای ساخت search index، مدل‌های recommendation و aggregateها کلیدی هستند. ؜ 
- ؜؜**Stream Processing (فصل ۱۱)؜**: با event streamهای بدون انتها و پیوسته سروکار دارد. ؜درباره‌ی messaging system و partitioned log، change data capture، event sourcing، مدیریت state روی stream، تفاوت event time و processing time، stream join و fault tolerance در stream jobها صحبت می‌کند.

؜**مثال؜**:  
فرض کن می‌خواهی برای یک mobile app سیستم analytics بسازی. ؜با batch processing ممکن است هر شب یک job اجرا کنی که تمام eventهای روز گذشته را اسکن کند و گزارش تولید کند. ؜با stream processing همان eventها را در لحظه مصرف می‌کنی و counterهای sliding (مثلاً users فعال در ۵ دقیقه‌ی اخیر) را نگه می‌داری. ؜هر دو در واقع از روی raw event log، داده‌ی مشتق‌شده تولید می‌کنند؛ تفاوت اصلی در latency و نحوه‌ی مدیریت state و correctness در طول زمان است.

؜**Link for More Details؜**:  
[Ask AI: Derived Data – Batch and Stream Processing](https://alisol.ir/?ai=Derived%20Data%3A%20Batch%20and%20Stream%20Processing%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications%20%28DDIA%29%7Cfa)

---

## ؜آینده‌ی سیستم‌های داده‌ای (فصل ۱۲)

؜**خلاصه؜**:  
فصل آخر همه‌چیز را به هم وصل می‌کند و نگاهی به آینده‌ی data systemها می‌اندازد:

- ؜استفاده از ؜**dataflow thinking؜**: دیدن سیستم به‌عنوان گرافی از transformationها که داده از یک component به بعدی جریان پیدا می‌کند (database، queue، batch job، stream processor) و هر مرحله، derived data جدید می‌سازد. ؜ 
- ؜؜**ترکیب ابزارهای تخصصی؜** به‌جای یک دیتابیس «همه‌فن‌حریف»—در عین این‌که با log، change stream و طراحی دقیق، consistency بین آن‌ها را حفظ می‌کنی. ؜ 
- ؜تأکید روی ؜**correctness، constraintها و حتی نوعی verification؜**، حتی وقتی سیستم‌ها پیچیده و asynchronous می‌شوند؛ به‌همراه حساسیت نسبت به جنبه‌های اخلاقی analytics، privacy و tracking.

پیام اصلی این است که سیستم‌های آینده احتمالاً از تعداد زیادی component نسبتاً مستقل ساخته می‌شوند که به‌وسیله‌ی dataflow به هم وصل شده‌اند، نه یک monolith بزرگ. ؜چالش اصلی انتخاب «داغ‌ترین دیتابیس بازار» نیست؛ طراحی جریان داده و constraintهاست تا کل سیستم رفتار درستی داشته باشد.

؜**مثال؜**:  
یک معماری مدرن را تصور کن که در آن هر write روی primary database هم‌زمان به یک message broker هم تبدیل می‌شود. ؜از آن‌جا یک consumer search index را آپدیت می‌کند، دیگری aggregateهای analytics را نگه می‌دارد و سومی recommendationهای شخصی را می‌سازد. ؜همه‌ی این datastoreها از روی یک log اصلی از eventها تولید شده‌اند. ؜فصل ۱۲ زبان و الگوهایی می‌دهد که این‌جور سیستم‌ها را آگاهانه و با طرح قبلی بسازی، نه به‌صورت تصادفی و وصله‌پینه‌ای.

؜**Link for More Details؜**:  
[Ask AI: The Future of Data Systems](https://alisol.ir/?ai=The%20Future%20of%20Data%20Systems%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications%20%28DDIA%29%7Cfa)

---

## ؜چطور از DDIA در کار خودت استفاده کنی

؜**خلاصه؜**:  
در تمام فصل‌ها چند عادت فکری دائماً تکرار می‌شود:

- ؜همیشه بپرس: *نیازهای من از نظر reliability، scalability و correctness دقیقاً چیست؟*  
- ؜درباره‌ی ؜**data model؜** و ؜**consistency guarantee؜**ها صریح تصمیم بگیر، به default نامعلوم تکیه نکن. ؜ 
- ؜به‌جای hackهای خلاق اما شکننده، الگوهای ساده و امتحان‌شده مثل log، replication، partitioning، batch + stream را ترجیح بده. ؜ 
- ؜cacheها، indexها و جدول‌های analytics را به‌عنوان ؜**derived data؜** جدی بگیر و طراحی کن که چطور sync بمانند. ؜ 
- ؜روی تغییر حساب کن: abstractionها و architectureای انتخاب کن که وقتی داده، ترافیک و تیم ۱۰ برابر شد، هنوز منطقی به‌نظر برسند.

؜**مثال؜**:  
اگر کسی بگوید «فقط یه cache بذار جلوی دیتابیس که کند شده»، DDIA کمکت می‌کند مکث کنی و بپرسی: کاربران چه سطحی از consistency انتظار دارند؟ invalidation چطور انجام می‌شود؟ در صورت failure چه اتفاقی می‌افتد؟ ناگهان می‌بینی این فقط «یه cache» نیست، بلکه یک سیستم derived data است که باید جدی طراحی‌اش کنی.

؜**Link for More Details؜**:  
[Ask AI: Foundations of Data Systems](https://alisol.ir/?ai=Foundations%20of%20Data%20Systems%7CMartin%20Kleppmann%7CDesigning%20Data-Intensive%20Applications%20%28DDIA%29%7Cfa)

---

## ؜درباره‌ی خلاصه‌کننده

من *Ali Sol* هستم، یک PHP Developer. ؜بیشتر:

* وب‌سایت: [alisol.ir](https://alisol.ir)  
* لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
