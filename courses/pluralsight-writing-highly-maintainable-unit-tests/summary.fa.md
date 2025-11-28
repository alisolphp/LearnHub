# خلاصه دوره: Writing Highly Maintainable Unit Tests

- **پلتفرم**: Pluralsight  
- **مدرس**: Zoran Horvat  
- **امتیاز**: ‎4.7/5  
- **تاریخ انتشار**: ‎March 2017  
- **مدت‌زمان**: ‎6h 15m  
- **لینک دوره**: [Writing Highly Maintainable Unit Tests](https://www.pluralsight.com/courses/writing-highly-maintainable-unit-tests)

*این سند، نکات کلیدی دوره را خلاصه می‌کند. اگر فرصت داشتی، دیدن خود دوره خیلی مفیدتر است.*

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=005796ea -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=courses/pluralsight-writing-highly-maintainable-unit-tests)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=courses/pluralsight-writing-highly-maintainable-unit-tests) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=courses/pluralsight-writing-highly-maintainable-unit-tests)
<!-- LH-BUTTONS:END -->

## ۱. چرا unit testها غیرقابل‌نگه‌داری می‌شوند و چطور جلویش را بگیریم

**خلاصه**: زُران اول از همه از دردسرهای ۱۵+ ساله‌اش با test suiteهای بزرگ و شکننده می‌گوید. قول اصلی دوره این است که یاد بگیری چطور testهایی بنویسی که با هر refactor کوچک در کد اصلی نشکنند، چطور تقریباً تمام duplication را از تست‌ها حذف کنی و چطور utilityهای تست‌نویسیِ قابل‌استفاده‌مجدد بسازی که سال‌ها دوام بیاورند.

**مثال**: یک تابع ساده‌ی «پیدا کردن بزرگ‌ترین عدد در آرایه» که ظاهراً درست کار می‌کند ولی برای حالت‌هایی مثل آرایه‌ی خالی یا null باگ‌های ریزی دارد — از آن مدل کدی که چند تست سطحی را پاس می‌کند ولی در production می‌ترکد.

**لینک برای جزئیات بیشتر**: [Ask AI: Why unit tests become fragile](https://alisol.ir/?ai=Why%20unit%20tests%20become%20fragile|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests|fa)

## ۲. اثبات صوری در برابر تست‌ کردن دنیای واقعی

**خلاصه**: زُران قدم‌به‌قدم نشان می‌دهد چطور می‌شود برای یک تابع خیلی کوچکِ پیدا کردن maximum، با استفاده از loop invariant و استقرا، اثبات صوریِ درستی انجام داد. این کار برای ۱۰ خط کد خیلی شیک است، اما در مقیاس‌های بزرگ عملاً غیرممکن می‌شود — و همین دلیل است که ما به تست‌ها نیاز داریم. تست‌ها درستی را «اثبات» نمی‌کنند؛ فقط روی ورودی‌های انتخاب‌شده نشان می‌دهند. ولی اگر آن ورودی‌ها را هوشمندانه انتخاب کنی، اعتمادبه‌نفس خیلی خوبی به تو می‌دهند.

**مثال**: اثبات این‌که در هر iteration حلقه، مقدار `max` درست به‌روزرسانی می‌شود، و بعد نشان دادن این‌که همین کد روی آرایه‌ی خالی fail می‌شود مگر این‌که با assertion یا contract جلویش گرفته شود.

**لینک برای جزئیات بیشتر**: [Ask AI: Formal proof of correctness in unit testing](https://alisol.ir/?ai=Formal%20proof%20of%20correctness%20in%20unit%20testing|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests|fa)

## ۳. از manual testing تا automated tests و test runnerها

**خلاصه**: این بخش نشان می‌دهد چطور از حالت «برنامه را اجرا کن و دستی عدد وارد کن» به تست‌های خودکار واقعی برسی (الگوی Arrange-Act-Assert، اسم‌گذاری توصیفی برای تست‌ها). حتی یک test runner حدوداً ۷۰ خطی از صفر می‌سازد تا نشان بدهد ایده‌ی کلی چقدر ساده است و این‌که تست‌ها باید روی هر build اجرا شوند.

**مثال**: نوشتن اولین failing test برای `MyArray.Maximum()`, درست کردن bug، و سبز شدن تست — همان feedback loop فوری که همه از آن خوشمان می‌آید.

**لینک برای جزئیات بیشتر**: [Ask AI: Building your own test runner](https://alisol.ir/?ai=Building%20your%20own%20test%20runner|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests|fa)

## ۴. ؜state-based testing در برابر interaction-based testing

**خلاصه**: سؤال همیشگی: آیا باید فقط state نهایی را چک کنیم (state-based)، یا این‌که بررسی کنیم چه متدی با چه پارامترهایی صدا زده شده (interaction-based / mocking)؟ state-based معمولاً مجبورمان می‌کند stateهای داخلی را expose کنیم؛ interaction-based encapsulation را حفظ می‌کند، ولی می‌تواند تست‌ها را شکننده و وابسته به implementation جزئی کند.

**مثال**: اضافه کردن «نقاط هدف» به یک آرایه — در state-based test، محتوای آرایه را بعد از عمل بررسی می‌کنی؛ در interaction-based test، بررسی می‌کنی که `Append()` دوبار با مقادیر ۳ و ۵ صدا زده شده است.

**لینک برای جزئیات بیشتر**: [Ask AI: State vs interaction testing](https://alisol.ir/?ai=State%20vs%20interaction%20testing|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests|fa)

## ۵. قابل‌تست کردنِ کد production (بدون خراب کردن design)

**خلاصه**: فقط برای خاطر تست، state داخلی را expose کردن در بلندمدت خطرناک است. زُران نشان می‌دهد چطور می‌شود از `internal` و attributeای مثل `InternalsVisibleTo` استفاده کرد، ولی در نهایت استدلال می‌کند که بعضی وقت‌ها بهتر است تعدادی عضو publicِ حساب‌شده داشته باشیم تا این‌که ترفندهای عجیب بزنیم. راه‌حل ریشه‌ای این است که از ابتدا کد را با دید تست‌پذیری طراحی کنیم.

**مثال**: اضافه کردن یک متد public مثل `GetElementAt(int index)` فقط به‌خاطر یک تست، و بعد از چند سال متوجه شدن این‌که اصلاً نباید public می‌بود.

**لینک برای جزئیات بیشتر**: [Ask AI: Making code testable without exposing internals](https://alisol.ir/?ai=Making%20code%20testable%20without%20exposing%20internals|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests|fa)

## ۶. مدیریت dependencyها و mockingِ درست

**خلاصه**: بیشتر شکست‌ها و شکستن تست‌ها از مدیریت بد dependencyها می‌آیند. زُران اول mocking دستی را نشان می‌دهد، بعد سراغ Moq می‌رود؛ اما مهم‌تر از همه این است که چطور ساختار کد را طوری طراحی کنی که dependencyها قابل inject شدن باشند و تست‌ها فقط روی unit موردنظر تمرکز کنند.

**مثال**: تست کردن سرویسی که با یک repository صحبت می‌کند — repository را از طریق interface mock می‌کنی، فقط callهایی را که برای این تست مهم هستند verify می‌کنی و بقیه را نادیده می‌گیری.

**لینک برای جزئیات بیشتر**: [Ask AI: Clean dependency management in unit tests](https://alisol.ir/?ai=Clean%20dependency%20management%20in%20unit%20tests|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests|fa)

## ۷. ؜Abstract Data Typeها؛ برگ برنده‌ی اصلی

**خلاصه**: به‌جای این‌که کلاس‌های concrete را مستقیماً تست کنی، روی interfaceها یا abstract base classها تست بنویس. همین یک تغییر باعث می‌شود تست‌هایت زیر refactorهای بزرگ و بازنویسی‌های عمیق، زنده بمانند.

**مثال**: نوشتن تمام تست‌ها بر اساس `IList<T>` به‌جای `MyList<T>` — حالا می‌توانی پیاده‌سازی داخلی را کامل عوض کنی، بدون این‌که حتی یک تست بشکند.

**لینک برای جزئیات بیشتر**: [Ask AI: Testing against abstract data types](https://alisol.ir/?ai=Testing%20against%20abstract%20data%20types|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests|fa)

## ۸. تست کردن generic typeها و interfaceها مثل یک حرفه‌ای

**خلاصه**: این بخش درباره‌ی generic constraintها، نکات covariance/contravariance و مخصوصاً روش تست کردن پیاده‌سازی‌های interfaceهاست به‌طوری‌که تست‌ها به هیچ کلاس concrete خاصی گره نخورند. این‌جاست که تست‌ها واقعاً bulletproof می‌شوند.

**مثال**: یک test suite استاندارد برای هر پیاده‌سازیِ `IEquatable<T>` که با کمک reflection بررسی می‌کند تمام اعضای لازم به‌شکل درست رفتار می‌کنند.

**لینک برای جزئیات بیشتر**: [Ask AI: Testing generic types and interfaces](https://alisol.ir/?ai=Testing%20generic%20types%20and%20interfaces|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests|fa)

## ۹. کتابخانه‌های تستِ قابل‌استفاده‌مجدد و اصول طراحی تست

**خلاصه**: هر وقت لازم است یک رفتار پیچیده را بارها و بارها تست کنی (مثل equality درست، الگوی IDisposable، semantics نوع مقدار (value-type semantics) و …)، به‌جای copy-paste کردن، یک testing library کوچک بساز. زُران یک equality tester می‌سازد که ۲۹ قانون را چک می‌کند، درحالی‌که خود تست فقط ۶ خط است.

**مثال**: یک تست تک‌خطی که بررسی می‌کند یک struct مثل `Date` تمام ویژگی‌های لازم برای یک value type خوب را دارد: equality درست، hash code درست، operatorهای مناسب، sealed بودن در صورت نیاز و...

**لینک برای جزئیات بیشتر**: [Ask AI: Building reusable testing libraries](https://alisol.ir/?ai=Building%20reusable%20testing%20libraries|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests|fa)

## ۱۰. شرایط خطا و سناریوهای منفی (جایی که اکثر توسعه‌دهنده‌ها اشتباه می‌کنند)

**خلاصه**: پرتاب exception برای ورودی‌های نامعتبر، در خیلی از مواقع یک code smell است. بیشتر «خطاها» در واقع اشتباهِ caller هستند (bug در کدی که از ما استفاده می‌کند). زُران مفهوم Design by Contract را معرفی می‌کند — preconditionها، postconditionها و invariantها — و نشان می‌دهد که چطور contractها می‌توانند جای ده‌ها unit test را بگیرند.

**مثال**: یک interface برای repository که contractهای صریح دارد → حالا می‌توانی حدود ۳۰٪ از unit testها را حذف کنی، چون همان قواعد توسط contractها در هر اجرای واقعی چک می‌شوند.

**لینک برای جزئیات بیشتر**: [Ask AI: Design by Contract in unit testing](https://alisol.ir/?ai=Design%20by%20Contract%20in%20unit%20testing|Zoran%20Horvat|Writing%20Highly%20Maintainable%20Unit%20Tests|fa)

---

**درباره‌ی خلاصه‌کننده**

من *Ali Sol* هستم، یک Backend Developer. برای آشنایی بیشتر:  
- وب‌سایت: [alisol.ir](https://alisol.ir)  
- لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

