# خلاصه دوره: System design in Microsoft Azure Cloud

* **پلتفرم**: Udemy
* **مدرس**: Mayesh
* **امتیاز**: 4.8/5
* **آخرین بروزرسانی**: February 2024
* **لینک دوره**: [System design in Microsoft Azure Cloud](https://www.udemy.com/course/system-design-in-microsoft-azure-cloud/)

*این سند، نکات کلیدی این دوره را خلاصه می‌کند. اگر فرصت داشتی، حتماً خود دوره را هم به‌طور کامل تماشا کن.*

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=31acc7b2 -->

### AI-Powered buttons

Start teaching this to a:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=fa&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Story](https://alisol.ir/?ai=learnhub_summary_story&lang=fa&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=courses/udemy-system-design-in-microsoft-azure-cloud)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=courses/udemy-system-design-in-microsoft-azure-cloud) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=courses/udemy-system-design-in-microsoft-azure-cloud)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=fa&src=courses/udemy-system-design-in-microsoft-azure-cloud)
<!-- LH-BUTTONS:END -->

## موضوع ۱: معرفی دوره

**خلاصه**: مدرس خودش را به‌عنوان یک مشاور ارشد IT با بیش از ۱۵ سال تجربه، مخصوصاً در حوزه دیجیتال ترنسفورمیشن (digital transformation) معرفی می‌کند. در این دوره، مبانی system design را با استفاده از سرویس‌های Azure برای طراحی سیستم‌هایی شبیه Facebook، YouTube و WhatsApp توضیح می‌دهد. روی این نکته تأکید می‌کند که طراحی سیستم ثابت نیست و با تغییر تکنولوژی‌ها تکامل پیدا می‌کند؛ بنابراین باید خودت هم با منطق و تجربه‌ات طراحی‌ها را بهتر کنی. در این دوره چیزی deploy نمی‌شود و تمرکز فقط روی تصمیم‌های معماری و طراحی است.

**مثال**: فرض می‌کند می‌خواهیم یک سرویس شبیه Netflix بسازیم؛ از چند فرض ساده شروع می‌کنیم، تیمی از developerها را استخدام می‌کنیم و بعد کم‌کم نیاز داریم از یک فریم‌ورک معماری مثل TOGAF استفاده کنیم تا طراحی‌مان ساختارمند، شفاف و قابل‌گسترش باشد.

- **لینک برای جزئیات بیشتر**: [Ask AI: Course Introduction](https://alisol.ir/?ai=Course%20Introduction%7CMayesh%7CSystem%20design%20in%20Microsoft%20Azure%20Cloud|fa)

## موضوع ۲: Software Development Life Cycle (SDLC)

**خلاصه**: در این بخش SDLC و شش فاز اصلی آن توضیح داده می‌شود: planning، analysis، design، implementation، testing/integration و maintenance. هدف SDLC این است که کیفیت محصول بالا برود، ریسک‌ها کنترل شوند، ارتباط بین تیم‌ها شفاف‌تر شود و توسعه نرم‌افزار به‌شکل منظم‌تری انجام شود. مدل‌هایی مثل Waterfall، Agile، Scrum، V-model و DevOps معرفی می‌شوند. در فاز design، معمولاً دو سطح داریم: High-Level Design (HLD) که معماری کلی سیستم و componentها را نشان می‌دهد، و Low-Level Design (LLD) که وارد جزئیات هر ماژول، الگوریتم و data structure می‌شود.

**مثال**: در فاز design، HLD مثل نقشه معماری کلی سیستم است (مثلاً سرویس‌ها، دیتابیس‌ها، ارتباط‌ها) و LLD این نقشه را خرد می‌کند به ماژول‌های کوچک‌تر با flowchartها، pseudo code و دیتاستراکچرهای مشخص.

- **لینک برای جزئیات بیشتر**: [Ask AI: Software Development Life Cycle (SDLC)](https://alisol.ir/?ai=Software%20Development%20Life%20Cycle%20%28SDLC%29%7CMayesh%7CSystem%20design%20in%20Microsoft%20Azure%20Cloud|fa)

## موضوع ۳: Domain Name System (DNS) در System Design

**خلاصه**: DNS سیستم تبدیل domain nameهای قابل‌خواندن توسط انسان به IP addressهای عددی است تا دسترسی به سرویس‌ها ساده‌تر شود. وقتی یک URL را در مرورگر وارد می‌کنی، مرورگر و سیستم‌عامل ابتدا cache خود را چک می‌کنند؛ اگر IP آن domain در cache نباشد، درخواست به DNS serverهای بالاتر در سلسله‌مراتب ارسال می‌شود تا IP پیدا شود. بعد از به‌دست آوردن IP، مرورگر یک اتصال TCP به سرور برقرار می‌کند و درخواست HTTP/HTTPS را می‌فرستد. همچنین ساختار یک URL به بخش‌هایی مثل scheme، domain، path و resource تقسیم می‌شود.

**مثال**: وقتی www.google.com را در مرورگر می‌نویسی، سیستم اول cache را چک می‌کند، اگر IP آنجا نبود از DNS می‌پرسد، بعد به IP به‌دست‌آمده متصل می‌شود و request را ارسال می‌کند؛ شبیه این‌که شماره تلفن‌ها را با اسم در contacts ذخیره می‌کنی تا مجبور نباشی همه شماره‌ها را حفظ باشی.

- **لینک برای جزئیات بیشتر**: [Ask AI: Domain Name System (DNS) in System Design](https://alisol.ir/?ai=Domain%20Name%20System%20%28DNS%29%20in%20System%20Design%7CMayesh%7CSystem%20design%20in%20Microsoft%20Azure%20Cloud|fa)

## موضوع ۴: Load Balancer در System Design

**خلاصه**: Load balancer ترافیک ورودی را بین چند سرور پخش می‌کند تا performance و availability سیستم بهتر شود. مزایایی مثل دسترس‌پذیری بالا، مقیاس‌پذیری (scalability)، امنیت بیشتر (مثلاً محافظت در برابر DDoS) و بهبود کارایی ایجاد می‌کند. الگوریتم‌های آن می‌توانند static باشند (مثل round-robin یا weighted round-robin) یا dynamic (مثل least connections و least response time). از نظر مدل OSI/TCP، load balancerها معمولاً در دو سطح Layer 4 (روی TCP/UDP) و Layer 7 (روی HTTP/HTTPS) کار می‌کنند.

**مثال**: در یک سناریوی پر‌ترافیک، الگوریتم round-robin درخواست‌ها را به‌صورت چرخشی بین سرورها پخش می‌کند، ولی اگر از sticky round-robin استفاده شود، session یک کاربر تا حد امکان روی همان سرور قبلی نگه‌داشته می‌شود تا مشکلات session و state کمتر شود.

- **لینک برای جزئیات بیشتر**: [Ask AI: Load Balancer in System Design](https://alisol.ir/?ai=Load%20Balancer%20in%20System%20Design%7CMayesh%7CSystem%20design%20in%20Microsoft%20Azure%20Cloud|fa)

## موضوع ۵: اجزای اصلی System Design برای Facebook

**خلاصه**: در طراحی Facebook همه‌چیز از دسترسی کاربر شروع می‌شود؛ کاربر از طریق DNS به load balancer می‌رسد و بعد درخواست‌ها وارد معماری سه‌لایه (UI، business logic و database) می‌شوند. برای کاهش latency از cache استفاده می‌شود، و با توجه به حجم بالای کاربر، معماری باید هم به‌صورت افقی (horizontal scaling) و هم عمودی (vertical scaling) مقیاس‌پذیر باشد. فایل‌های media (مثل عکس و ویدئو) معمولاً روی external storage نگه‌داری می‌شوند. برای فیلتر کردن محتوا (مثلاً شناسایی محتوای نامناسب) از سرویس‌های پردازش محتوا استفاده می‌شود. داده‌های postها و likeها اغلب در NoSQL ذخیره می‌شوند تا مقیاس‌پذیری بالاتری داشته باشند. برای تحلیل رفتار کاربر و پیشنهاد محتوا از سیستم‌های analytics و big data بهره گرفته می‌شود. کاربران موبایل هم معمولاً محتوا را از طریق CDN دریافت می‌کنند تا سرعت و تجربه کاربری بهتری داشته باشند.

**مثال**: وقتی کاربر یک عکس upload می‌کند، ابتدا محتوا از نظر قوانین پلتفرم بررسی و فیلتر می‌شود، بعد در یک storage خارجی ذخیره می‌شود، نسخه‌های فشرده‌تر و مناسب موبایل از آن ساخته می‌شود و در نهایت از طریق CDN به کاربرهای سراسر دنیا با latency کم تحویل داده می‌شود.

- **لینک برای جزئیات بیشتر**: [Ask AI: Facebook System Design Building Blocks](https://alisol.ir/?ai=Facebook%20System%20Design%20Building%20Blocks%7CMayesh%7CSystem%20design%20in%20Microsoft%20Azure%20Cloud|fa)

## موضوع ۶: نیازمندی‌های سیستم Facebook

**خلاصه**: نیازمندی‌های functional شامل چیزهایی مثل پروفایل کاربری، timeline، درخواست دوستی، ارسال post (تصویر، ویدئو، متن)، قابلیت like و comment و سیستم chat است. نیازمندی‌های non-functional شامل read-heavy بودن سیستم (خواندن داده نسبت به نوشتن خیلی بیشتر است)، سرعت بالای render صفحه، latency قابل‌قبول، الگوی دسترسی داده (postها بعد از مدتی قدیمی می‌شوند) و دسترسی جهانی با پشتیبانی multi-language است. سیستم باید برای حجم بسیار زیاد کاربر و تعداد بالای upload روزانه مقیاس‌پذیر باشد.

**مثال**: معمولاً به ازای هر یک بار نوشتن یک post، ده‌ها بار خواندن (نمایش، like، comment) انجام می‌شود؛ همین باعث می‌شود طراحی سیستم بیشتر روی بهینه‌سازی readها تمرکز کند. همچنین postهای خیلی قدیمی می‌توانند به storage ارزان‌تر و آرشیوی منتقل شوند چون الگوی دسترسی به آن‌ها کم می‌شود.

- **لینک برای جزئیات بیشتر**: [Ask AI: Facebook System Design Requirements](https://alisol.ir/?ai=Facebook%20System%20Design%20Requirements%7CMayesh%7CSystem%20design%20in%20Microsoft%20Azure%20Cloud|fa)

## موضوع ۷: طراحی سیستم Facebook در Azure

**خلاصه**: در این قسمت، اجزای معماری Facebook به سرویس‌های Azure map می‌شوند. برای DNS از سرویس‌هایی مثل Azure DNS استفاده می‌شود و برای high availability و disaster recovery از Traffic Manager یا Application Gateway کمک گرفته می‌شود. لایه application می‌تواند روی Azure App Service با معماری سه‌لایه و استفاده از managed identityها پیاده شود، یا می‌توان از AKS (Azure Kubernetes Service) برای microserviceها و APIها استفاده کرد. برای ذخیره NoSQL (مثل postها، likeها، activityها) معمولاً از Cosmos DB استفاده می‌شود. برای جمع‌آوری و پردازش activity کاربر از Stream Analytics و Event Hubs استفاده می‌شود؛ داده‌ها در لایه‌های مختلف (bronze/silver/gold) با کمک Databricks یا HDInsight پردازش و بعد در Synapse یا Power BI گزارش می‌شوند. برای فیلتر کردن محتوا و تحلیل آن از Azure Cognitive Services و Azure Machine Learning استفاده می‌شود. فایل‌های media در Azure Blob Storage ذخیره شده و از طریق Azure CDN در سطح جهان توزیع می‌شوند.

**مثال**: فعالیت کاربر (click، view، like) توسط Event Hubs جمع می‌شود، با Stream Analytics یا Databricks در چند مرحله (bronze، silver، gold) پردازش می‌شود و در نهایت روی Synapse یا Power BI برای ساخت dashboardها و سیستم recommendation استفاده می‌شود. قبل از ذخیره mediaها هم سرویس‌های Cognitive (مثل content moderation) آن‌ها را بررسی می‌کنند و سپس در Blob Storage ذخیره شده و از طریق CDN به اپلیکیشن‌های third-party یا کاربران تحویل داده می‌شوند.

- **لینک برای جزئیات بیشتر**: [Ask AI: Facebook System Design in Azure](https://alisol.ir/?ai=Facebook%20System%20Design%20in%20Azure%7CMayesh%7CSystem%20design%20in%20Microsoft%20Azure%20Cloud|fa)

## موضوع ۸: YouTube System Design در Azure

**خلاصه**: نیازمندی‌های functional برای سیستمی شبیه YouTube شامل search، like، share، download ویدئوها، comment و reply است. معماری سیستم از دو دید مهم بررسی می‌شود: content creatorها (آپلودکننده‌ها) و کاربران عادی (viewers). برای creatorها، وقتی ویدئو upload می‌شود، با استفاده از Azure Functions یا Azure Batch encoding انجام می‌شود؛ برای هر ویدئو ممکن است چند job وجود داشته باشد (مثلاً یک job برای ویدئو، یک job برای thumbnail). محتوای ویدئو با Cognitive Services بررسی و فیلتر می‌شود و بعد در storageهایی مثل Azure NetApp Files یا Blob Storage ذخیره می‌شود. از طرف کاربر، درخواست‌ها از طریق یک اپلیکیشن سه‌لایه روی App Service و APIها روی AKS مدیریت می‌شوند. برای جمع‌آوری activityها (مثل watch history، likes، searchها) از Stream Analytics استفاده می‌شود و داده‌ها با Databricks یا Synapse برای analytics، recommendation و نمایش آمار پردازش می‌شوند.

**مثال**: یک content creator یک ویدئوی خام upload می‌کند؛ در پشت‌صحنه چند node در Azure Batch شروع به encoding ویدئو در کیفیت‌های مختلف و ساخت thumbnail می‌کنند. بعد از گذر از لایه فیلتر محتوا، فایل‌ها در storage ذخیره می‌شوند. وقتی کاربر وارد سایت می‌شود، بر اساس داده‌های ذخیره‌شده در Cosmos DB و تحلیل‌شده توسط ML، لیستی از ویدئوهای پیشنهادی (recommendation) برای او نشان داده می‌شود.

- **لینک برای جزئیات بیشتر**: [Ask AI: YouTube System Design in Azure](https://alisol.ir/?ai=YouTube%20System%20Design%20in%20Azure%7CMayesh%7CSystem%20design%20in%20Microsoft%20Azure%20Cloud|fa)

## موضوع ۹: Chat Application System Design

**خلاصه**: نیازمندی‌های functional برای یک chat application شامل چت یک‌به‌یک و گروهی، read receipt، وضعیت آنلاین/آفلاین (last seen)، notificationها و ارسال media است. نیازمندی‌های non-functional شامل latency بسیار پایین، reliability بالا، دسترسی جهانی و امنیت (مثلاً end-to-end encryption) هستند. برای ارتباط real-time معمولاً از WebSocket استفاده می‌شود که یک اتصال persistent بین client و server برقرار می‌کند. معماری می‌تواند چند سرویس اصلی داشته باشد: messaging service، session service، relay service، last-seen service و asset/media service. برای ذخیره داده می‌شود ترکیبی از NoSQL و SQL استفاده کرد؛ و برای مدیریت پیام‌های گروهی با تعداد زیاد عضو، از message brokerهایی مثل Kafka کمک گرفته می‌شود.

**مثال**: وقتی کاربر A به کاربر B که آفلاین است پیام می‌فرستد، پیام ابتدا توسط messaging service دریافت می‌شود و relay service آن را در یک SQL database (یا queue) نگه می‌دارد. همین‌که کاربر B آنلاین شد و WebSocket connection برقرار شد، پیام‌ها از صف خوانده شده و برای او ارسال می‌شوند. برای گروه‌ها، یک Kafka topic می‌تواند پیام را از producer دریافت و آن را بین consumerهایی که نماینده کاربران آنلاین هستند توزیع کند.

- **لینک برای جزئیات بیشتر**: [Ask AI: Chat Application System Design](https://alisol.ir/?ai=Chat%20Application%20System%20Design%7CMayesh%7CSystem%20design%20in%20Microsoft%20Azure%20Cloud|fa)

برای تجربه کامل دوره، می‌توانی خود دوره را در Udemy ببینی:
[System design in Microsoft Azure Cloud](https://www.udemy.com/course/system-design-in-microsoft-azure-cloud/).

---

## درباره خلاصه‌کننده

من *Ali Sol* هستم، یک Backend Developer.

بیشتر درباره من:
- وب‌سایت: [alisol.ir](https://alisol.ir)
- لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

