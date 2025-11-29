# خلاصه کتاب: The Pragmatic Programmer
* **نویسندگان**: Andrew Hunt و David Thomas
* **ژانر**: مهندسی نرم‌افزار
* **تاریخ انتشار**: ۱۹۹۹

این سند خلاصه‌ای از نکات کلیدی و درس‌های مهم کتاب **The Pragmatic Programmer** است تا بتوانی سریع مرور و یادگیری انجام بدهی.  
اگر برایت مفید بود، خود کتاب را هم حتماً بخوان؛ عمق و ظرافت زیادی دارد که فقط در خود متن اصلی حس می‌شود.

---

## قبل از این‌که شروع کنیم

* من در این خلاصه، نکته‌های مهم و کاربردی کتاب را جمع کرده‌ام تا بتوانی سریع یاد بگیری و مرور کنی.
* بعد از هر بخش یک لینک `Ask AI` هست؛ روی آن کلیک کنی می‌توانی درباره همان بخش، سوال‌های عمیق‌تر بپرسی.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=4ea0b5d0 -->

### AI-Powered buttons

Teach Me:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=fa&src=books/The%20Pragmatic%20Programmer) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=books/The%20Pragmatic%20Programmer) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=books/The%20Pragmatic%20Programmer) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=books/The%20Pragmatic%20Programmer) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=books/The%20Pragmatic%20Programmer) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=fa&src=books/The%20Pragmatic%20Programmer) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=books/The%20Pragmatic%20Programmer) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=books/The%20Pragmatic%20Programmer) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=books/The%20Pragmatic%20Programmer) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=books/The%20Pragmatic%20Programmer) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=books/The%20Pragmatic%20Programmer) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=books/The%20Pragmatic%20Programmer)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=books/The%20Pragmatic%20Programmer) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=books/The%20Pragmatic%20Programmer) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=fa&src=books/The%20Pragmatic%20Programmer) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=books/The%20Pragmatic%20Programmer) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=fa&src=books/The%20Pragmatic%20Programmer)
<!-- LH-BUTTONS:END -->

---

## ؜A Pragmatic Philosophy

**خلاصه**: این فصلِ اول، طرز فکر یک **pragmatic programmer** را توضیح می‌دهد؛ کسی که مسئولیت کارش را می‌پذیرد، با فرسودگی و شُلختگی نرم‌افزار می‌جنگد و می‌داند «کِی» نرم‌افزار **به‌اندازهٔ کافی خوب** است.  
می‌گوید اشتباه کردی، توجیه نکن؛ شفاف بگو چه شده و درستش کن. از «broken windows» دوری کن: یک کد کثیف و شکسته اگر رها شود، بقیه را هم به شلختگی عادت می‌دهد. مثل داستان **stone soup** خودت جرقهٔ تغییر مثبت باش؛ لازم نیست همه چیز را یک‌جا عوض کنی، همین که شروع کنی، بقیه هم همراه می‌شوند.  
حواست به وضعیت **boiling frog** هم باشد؛ وقتی مشکلات کوچک، کم‌کم زیاد می‌شوند و تو چون تدریجی‌اند، متوجه فاجعه شدنشان نمی‌شوی. کیفیت یعنی کمال‌گرایی نه، بلکه **هماهنگی با نیاز واقعی کاربر**؛ کاربر را وارد بازی کن تا «کافی بودن» را با هم تعریف کنید.  
دانشت را مثل یک **portfolio** سرمایه‌گذاری ببین و مدام روی خودت سرمایه‌گذاری کن. در نهایت هم فراموش نکن که برنامه‌نویسی فقط دربارهٔ کد نیست، **دربارهٔ آدم‌ها و ارتباط** هم هست؛ خوب حرف بزن، خوب گوش کن و شفاف بنویس.

**مثال**: یک آشپزخانه را تصور کن که اولش فقط یک بشقاب کثیف توی سینک است؛ اگر همان موقع نشویی، کم‌کم ظرف‌ها روی هم جمع می‌شوند و کل آشپزخانه می‌شود یک فاجعه. کد هم همین است؛ اگر همان اوایل تمیزکاری نکنی، بعدها تمیز کردنش کابوس می‌شود.

**لینک برای جزئیات بیشتر**:  
[Ask AI: A Pragmatic Philosophy](https://alisol.ir/?ai=A%20Pragmatic%20Philosophy%7CAndrew%20Hunt%20and%20David%20Thomas%7CThe%20Pragmatic%20Programmer|fa)

---

## ؜A Pragmatic Approach

**خلاصه**: این فصل وارد استراتژی‌های عملی برای ساختن نرم‌افزار بهتر می‌شود. خیلی روی اصل معروف **DRY (Don’t Repeat Yourself)** تاکید می‌کند: هر تکه «دانش» باید فقط یک‌جا وجود داشته باشد؛ نه این‌که یک منطق را در سه جای سیستم کپی‌پیست کنیم.  
مفهوم **orthogonality** را هم توضیح می‌دهد: بخش‌های سیستم باید تا حد ممکن مستقل باشند، طوری که تغییر در یک قسمت، مجبور نباشد نصف سیستم را تحت‌تأثیر قرار بدهد.  
تصمیم‌ها را حک شده روی سنگ نبین؛ آماده باش که اگر لازم شد، **تصمیم‌ها را برگردانی**. از **tracer bullet** استفاده کن تا یک اسکلتِ کارکردنیِ ساده از سیستم را سریع بالا بیاوری و بعد کم‌کم کاملش کنی. از **prototype** برای تست ریسک‌ها و ایده‌ها استفاده کن، نه برای تولید نهایی.  
تا می‌توانی در زبان **domain** صحبت کن؛ چه در کد، چه در نام‌گذاری‌ها. **تخمین** هم مهارتی است که با تمرین بهتر می‌شود؛ کار را خرد کن، تخمین‌های کوچک‌تر بزن و با تکرار، آن‌ها را اصلاح کن.

**مثال**: به orthogonality مثل دکمه‌های volume و treble روی یک آمپلی‌فایر فکر کن؛ وقتی صدا را کم و زیاد می‌کنی، تنظیم bass و treble به هم نمی‌ریزد. این جدا بودن، تنظیم و رفع مشکل را ساده می‌کند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: A Pragmatic Approach](https://alisol.ir/?ai=A%20Pragmatic%20Approach%7CAndrew%20Hunt%20and%20David%20Thomas%7CThe%20Pragmatic%20Programmer|fa)

---

## ؜The Basic Tools

**خلاصه**: ابزارها بهترین دوست برنامه‌نویس‌اند. این فصل دربارهٔ ابزارهای پایه‌ای است.  
می‌گوید **plain text** پادشاه است؛ برای ماندگاری و انعطاف، تا می‌توانی اطلاعاتت را در قالب متن ساده نگه‌دار، نه فرمت‌های بسته و عجیب.  
یاد گرفتن یک **command shell** قدرتی به تو می‌دهد که با GUIها به سختی می‌رسی. یک **editor** خوب انتخاب کن و آن را در حد حرفه‌ای بلد شو.  
برای هر چیزی (حتی پروژه‌های کوچک)، از **source control** استفاده کن. **Debug** را با فکر انجام بده: مشکل را ایزوله کن، از logها خوب استفاده کن و رفتار سیستم را زیر نظر بگیر. برای کار با متن، ابزارها و زبان‌هایی مثل Perl، awk یا حتی اسکریپت‌های سادهٔ shell بسیار کارراه‌اندازند.  
تا جایی که می‌توانی **code generation** و automation انجام بده تا کارهای تکراری را به ماشین بسپاری.

**مثال**: ذخیره کردن تنظیمات در فایل‌های plain text مثل این است که یادداشت‌هایت را روی کاغذ معمولی بنویسی، نه در یک دفتر قفل‌دار. هر کس با هر ابزاری می‌تواند آن را بخواند و ویرایش کند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: The Basic Tools](https://alisol.ir/?ai=The%20Basic%20Tools%7CAndrew%20Hunt%20and%20David%20Thomas%7CThe%20Pragmatic%20Programmer|fa)

[یادداشت شخصی: ابزارهایی مثل CVS یا RCS برای source control زمانی کلاسیک و خوب بودند، اما در ۲۰۲۵ بیشتر ترجیح می‌دهم از Git استفاده کنم که distributed است و branching و workflow بهتری برای تیم‌های مدرن ارائه می‌دهد.]  

[یادداشت شخصی: Perl برای کارهای text manipulation عالی است، ولی این روزها Python یا حتی ابزارهای داخلی shell معمولاً راحت‌تر و یکپارچه‌تر با بقیهٔ stack استفاده می‌شوند.]

---

## ؜Pragmatic Paranoia

**خلاصه**: نمی‌توانی کدی بنویسی که همیشه و در همهٔ شرایط بی‌نقص باشد؛ پس باید از ابتدا **محافظت‌ها و safeguards** را در طراحی و پیاده‌سازی در نظر بگیری.  
مفهوم **design by contract** را مطرح می‌کند: برای هر تابع/ماژول، **precondition**، **postcondition** و **invariant** تعریف کن تا توقعات واضح باشند و رفتار سیستم قابل‌اعتمادتر شود.  
اگر خطای جدی رخ داد، سعی نکن سیستم را با زور زنده نگه داری؛ **زود crash کن** تا وضعیت خراب‌تر نشود. از **assertion**ها برای sanity check استفاده کن. **Exception handling** را برای حالت‌های واقعاً استثنایی نگه دار، نه جریان نرمال برنامه. همیشه حواست به **resource cleanup** باشد؛ فایل‌ها، connectionها و … را درست ببند تا memory leak و باگ‌های عجیب تولید نشود.

**مثال**: contract مثل یک توافق قبل از شروع معامله است؛ اگر مواد اولیه (ورودی تابع) درست نباشد، اصلاً نباید معامله‌ای انجام شود. دقیقاً مثل آشپزی که اگر مواد خراب باشد، اصلاً غذا را شروع نمی‌کند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Pragmatic Paranoia](https://alisol.ir/?ai=Pragmatic%20Paranoia%7CAndrew%20Hunt%20and%20David%20Thomas%7CThe%20Pragmatic%20Programmer|fa)

[یادداشت شخصی: مدیریت exception هنوز هم مهم است، ولی در زبان‌های جدیدتر مثل Rust (با Result types) یا Go (با error return) باید دید الگوی خطامدیریتِ پیشنهادی زبان چیست و بعد تصمیم گرفت چقدر روی exceptionهای سنگین تکیه کنیم.]

---

## ؜Bend, or Break

**خلاصه**: نرم‌افزار باید **قابل انعطاف** باشد، نه شکننده.  
با استفاده از **Law of Demeter**، coupling را کم کن تا ماژول‌ها کمترین وابستگی را به جزئیات داخلی هم داشته باشند. تا می‌توانی تنظیمات را **dynamic و مبتنی بر metadata** نگه‌دار، نه hardcode در کد. حواست به **temporal coupling** باشد؛ این‌که ترتیب و زمان انجام کارها بی‌خودی به هم گره نخورده باشد.  
**Separation of concerns** و جدا کردن **view** از **model** باعث می‌شود تغییر ظاهر یا منطق ساده‌تر شود. الگوی **blackboard** را معرفی می‌کند که در آن اجزای مختلف، اطلاعات خود را روی یک بُرد مشترک می‌گذارند تا بدون وابستگی مستقیم به هم، باهم کار کنند.

**مثال**: یک blackboard مثل تختهٔ بزرگِ یک تیم تحقیقاتی است که هر کارآگاه، سرنخ خودش را روی آن می‌چسباند. هرکس مستقل کار می‌کند، اما تصویر کلی روی همان تخته شکل می‌گیرد.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Bend, or Break](https://alisol.ir/?ai=Bend%2C%20or%20Break%7CAndrew%20Hunt%20and%20David%20Thomas%7CThe%20Pragmatic%20Programmer|fa)

[یادداشت شخصی: ایدهٔ استفاده از metadata برای config کاملاً به‌جا است؛ امروز در دنیای cloud-native، ابزارهایی مثل Kubernetes YAML، Helm chart و … دقیقاً همین کار را در مقیاس بزرگ انجام می‌دهند.]

---

## ؜While You Are Coding

**خلاصه**: وقتی کدنویسی می‌کنی، آن‌جاست که «لاستیک با آسفالت تماس پیدا می‌کند» و نتیجهٔ واقعی شکل می‌گیرد.  
از **programming by coincidence** دوری کن؛ این‌که «الان کار می‌کند، پس ولش کن» رویکرد خطرناکی است. باید بفهمی **چرا** چیزی کار می‌کند.  
سرعت الگوریتم را با مفاهیمی مثل **Big-O notation** تحلیل کن، اما حتماً آن را در سناریوهای واقعی هم **benchmark** و تست کن. کد را مثل یک باغ، مرتب **refactor** کن؛ به‌جای این‌که بگذاری کلی علف هرز جمع شود.  
کدی بنویس که از همان ابتدا **testable** باشد؛ وابستگی‌ها، ساختار و interfaceها را طوری طراحی کن که unit test و integration test روی آن راحت باشد. حواست باشد روی جادوهای **wizard-generated code** یا ابزارهایی که خروجی‌شان را نمی‌فهمی حساب باز نکنی.

**مثال**: refactoring مثل هرس کردن یک درخت یا بوته است؛ اگر مرتب شاخه‌های اضافه را ببری، هم زیباتر می‌شود هم سالم‌تر می‌ماند. اگر ولش کنی، بعداً اصلاحش سخت و پرهزینه می‌شود.

**لینک برای جزئیات بیشتر**:  
[Ask AI: While You Are Coding](https://alisol.ir/?ai=While%20You%20Are%20Coding%7CAndrew%20Hunt%20and%20David%20Thomas%7CThe%20Pragmatic%20Programmer|fa)

---

## ؜Before the Project

**خلاصه**: کار اصلی قبل از شروع کدنویسی اتفاق می‌افتد.  
باید **requirements** واقعی را کشف کنی، نه فقط حرفی که در جلسه اول زده می‌شود. مثل حل یک معما، باید مدام فرضیات را زیر سوال ببری. تا زمانی که یک درک درست از مسئله و محدودهٔ راه‌حل پیدا نکرده‌ای، عجله نکن بروی سراغ code.  
از **formal method**ها و مدل‌سازی رسمی، فقط آن‌قدر استفاده کن که کمک‌ات کنند، نه این‌که در دام کاغذبازی بیفتی. زیاد **over-specify** نکن؛ خیلی وقت‌ها یک نمودار ساده، چند دایره و فلش روی تخته، از ده صفحه سند رسمی مفیدتر است.

**مثال**: جمع‌آوری نیازمندی‌ها مثل معدن‌کاری است؛ باید بین کلی خاک (فرضیات اشتباه و خواسته‌های سطحی) دانه‌های طلا (نیاز واقعی و مهم) را پیدا کنی.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Before the Project](https://alisol.ir/?ai=Before%20the%20Project%7CAndrew%20Hunt%20and%20David%20Thomas%7CThe%20Pragmatic%20Programmer|fa)

---

## ؜Pragmatic Projects

**خلاصه**: در سطح تیم و پروژه، مسئله فقط کد نیست، بلکه **سازمان‌دهی و فرایند** هم مهم است.  
تیم‌های **pragmatic** را حول **قابلیت‌ها (featureها)** بساز، نه صرفاً بر اساس دپارتمان‌های سنتی. تا می‌توانی همه‌چیز را **automate** کن؛ از build و test تا deployment. تست را در همهٔ لایه‌ها جدی بگیر؛ unit، integration، system و حتی testهایی از دید کاربر.  
با **documentation** مثل کد رفتار کن؛ versioning، review و نگهداری روی آن انجام بده. انتظارات کاربر را هم هوشمندانه مدیریت کن؛ نه بیش‌ازحد قول بده، نه صورت‌مسئله را بی‌دلیل پیچیده کن.  
در نهایت، به کارت افتخار کن؛ طوری کار کن که انگار روی کار خودت امضا می‌زنی.

**مثال**: automation همه‌جانبه مثل داشتن یک ربات آشپز است؛ ربات دستورها را هر بار دقیق و یکسان اجرا می‌کند و تو آزاد می‌شوی روی طراحی منو و طعم‌های جدید تمرکز کنی.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Pragmatic Projects](https://alisol.ir/?ai=Pragmatic%20Projects%7CAndrew%20Hunt%20and%20David%20Thomas%7CThe%20Pragmatic%20Programmer|fa)

[یادداشت شخصی: automation با cron و make قابل اعتماد است، اما در ۲۰۲۵ ابزارهای CI/CD مثل GitHub Actions یا Jenkins برای workflow تیمی و مقیاس‌پذیری امکانات خیلی بیشتری می‌دهند.]  

[یادداشت شخصی: در بحث source control کتاب بیشتر روی CVS تکیه دارد، اما امروز Git استاندارد غالب است و workflowهای توزیع‌شده و branch محور را برای اکثر پروژه‌ها فراهم کرده است.]

---

**دربارهٔ خلاصه‌کننده**  

من *Ali Sol* هستم، یک Backend Developer. برای آشنایی بیشتر:  
* وب‌سایت: [alisol.ir](https://alisol.ir)  
* لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

