# خلاصه کتاب Clean Code
* **نویسنده**: Robert C. Martin
* **ژانر**: مهندسی نرم‌افزار
* **تاریخ انتشار**: 2008

این سند، نکات کلیدی و مهم کتاب **Clean Code** را برای مرور سریع و یادگیری خلاصه می‌کند.  
برای درک عمیق‌تر، حتماً مطالعهٔ نسخهٔ اصلی کتاب توصیه می‌شود.

## قبل از شروع

* من نکات مهم کتاب‌های مفید را خلاصه می‌کنم تا راحت‌تر بتوانی آن‌ها را یاد بگیری و مرور کنی.
* بعد از هر بخش روی لینک‌های `Ask AI` کلیک کن تا بتوانی عمیق‌تر در همان موضوع جستجو و گفت‌وگو کنی.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b47981dc -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=books/Clean%20Code) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=books/Clean%20Code) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=books/Clean%20Code) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer) 

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=books/Clean%20Code) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=books/Clean%20Code) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=books/Clean%20Code) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=books/Clean%20Code) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=books/Clean%20Code) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=books/Clean%20Code) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=books/Clean%20Code)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=books/Clean%20Code) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=books/Clean%20Code) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=books/Clean%20Code)
<!-- LH-BUTTONS:END -->

## فصل ۱: Clean Code

**خلاصه**: این فصل با تأکید روی این نکته شروع می‌کند که کد تمیز برای هر برنامه‌نویس حرفه‌ای ضروری است؛ کدی که خوانا، قابل نگه‌داری و با دقت نوشته شده باشد. کد شلوغ و کثیف در طول زمان تیم را کند می‌کند و هزینه‌ها را بالا می‌برد؛ مثل بهمن بزرگی که از یک برف‌کوچک شروع شده است. نویسنده می‌گوید نوشتن کد تمیز یک هنر است و نیاز به نظم و توجه به جزئیات دارد. او همچنین نظرات چند متخصص را دربارهٔ ویژگی‌های کد تمیز می‌آورد؛ مثل این‌که کد باید ساده، مؤثر و بدون شلوغ‌کاری باشد. ایدهٔ اصلی این است که همیشه «کد را بهتر از زمانی که پیدا کردی» رها کنی (Boy Scout Rule).

**مثال**: کد را مثل یک باغ خوب و مرتب در نظر بگیر؛ اگر علف‌های هرز را رها کنی، خیلی زود همه‌جا را می‌گیرند و باغ به‌هم می‌ریزد. با کندن یک علف هرز در هر بار، باغ همیشه سرحال می‌ماند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Chapter 1: Clean Code](https://alisol.ir/?ai=Chapter%201%3A%20Clean%20Code%7CRobert%20C.%20Martin%7CClean%20Code|fa)

## فصل ۲: Meaningful Names

**خلاصه**: نام‌ها در کد باید واضحاً نیت و منظور را منتقل کنند تا خواندن کد راحت شود؛ یعنی نام متغیرها، توابع و کلاس‌ها باید توضیح بدهند «چه‌کار می‌کنند» بدون این‌که لازم باشد در ذهن‌مان ترجمه‌شان کنیم. از نام‌های گمراه‌کننده، مخفف‌های عجیب یا Hungarian notation پرهیز کن و دنبال اسم‌های شوخی‌طور یا رمزگونه نباش. برای یک مفهوم از یک کلمهٔ واحد و ثابت استفاده کن تا کد یک‌دست بماند. می‌توانی از واژه‌های حوزهٔ مساله یا حوزهٔ راه‌حل (problem/solution domain) کمک بگیری. از اضافه کردن context اضافی و بی‌فایده هم خودداری کن تا کد شلوغ نشود.

**مثال**: به‌جای متغیری مثل `d` برای تعداد روز، از نامی مثل `elapsedTimeInDays` استفاده کن تا هر کسی با یک نگاه بفهمد منظور چیست؛ مثل این‌که روی شیشهٔ مربا، دقیقاً برچسب بزنی که داخلش چیست، نه یک برچسب مبهم.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Chapter 2: Meaningful Names](https://alisol.ir/?ai=Chapter%202%3A%20Meaningful%20Names%7CRobert%20C.%20Martin%7CClean%20Code|fa)

## فصل ۳: Functions

**خلاصه**: Functionها باید کوچک باشند، فقط یک کار انجام دهند و در یک سطح انتزاع (abstraction level) بمانند تا جریان کد مثل یک داستان از بالا به پایین خوانده شود. از نام‌های توصیفی استفاده کن، تعداد آرگومان‌ها را کم نگه دار (ترجیحاً بین صفر تا سه)، از side effect تا حد ممکن دوری کن و به‌جای error code از Exception استفاده کن. از تکرار (duplication) بپرهیز و از اصول structured programming استفاده کن تا کد ساده و سرراست بماند.

**مثال**: تابعی که حقوق (payroll) را حساب می‌کند، فقط باید جمع و محاسبه را انجام دهد، نه این‌که هم‌زمان Database را آپدیت کند یا Report چاپ کند؛ مثل سرآشپزی که وقتی در حال خرد کردن سبزی‌جات است، وسط کار نرود ظرف‌ها را بشوید.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Chapter 3: Functions](https://alisol.ir/?ai=Chapter%203%3A%20Functions%7CRobert%20C.%20Martin%7CClean%20Code|fa)

## فصل ۴: Comments

**خلاصه**: Comment جایگزین کد بد نیست؛ اول سعی کن خود کد را طوری بنویسی که نیازی به توضیح نداشته باشد (self-explanatory). کامنت‌های خوب، نیت را روشن می‌کنند، از عواقب احتمالی هشدار می‌دهند یا قسمت‌های پیچیده را توضیح می‌دهند؛ اما کامنت‌های بد مبهم، گمراه‌کننده یا خیلی زود قدیمی و بی‌ربط می‌شوند. از کامنت‌های تکراری و اجباری پرهیز کن و کد کامنت‌شدهٔ بلااستفاده را در Repository نگه ندار؛ فقط شلوغی ایجاد می‌کند.

**مثال**: یک کامنت مثل `// Check to see if the employee is eligible for full benefits` بهتر است با یک تابع مثل `isEligibleForFullBenefits()` جایگزین شود؛ یعنی به‌جای توضیح بیرونی، خود کد حرف بزند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Chapter 4: Comments](https://alisol.ir/?ai=Chapter%204%3A%20Comments%7CRobert%20C.%20Martin%7CClean%20Code|fa)

## فصل ۵: Formatting

**خلاصه**: Formatting برای خوانایی خیلی مهم است؛ کد را مثل یک روزنامه در نظر بگیر که باید از نظر عمودی، فضا برای ایده‌های مختلف داشته باشد، بخش‌های مرتبط به‌هم نزدیک باشند و فاصله‌ها منطقی باشند. فایل‌ها را کوچک نگه دار، از فاصله‌گذاری افقی (spaces) و indent یک‌دست استفاده کن و قواعد تیم را برای style رعایت کن تا کد حرفه‌ای و مرتب به‌نظر برسد.

**مثال**: همان‌طور که یک میز شلوغ، کاغذهای مهم را زیر بقیه قایم می‌کند، فرمت‌بندی بد هم منطق کد را پنهان می‌کند؛ ترازبندی درست براکت‌ها و فاصله‌ها بین عملگرها باعث می‌شود کد مثل یک outline مرتب دیده شود.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Chapter 5: Formatting](https://alisol.ir/?ai=Chapter%205%3A%20Formatting%7CRobert%20C.%20Martin%7CClean%20Code|fa)

## فصل ۶: Objects and Data Structures

**خلاصه**: Objectها داده را پشت abstraction پنهان می‌کنند و فقط methodها را در اختیار قرار می‌دهند؛ در حالی که data structureها داده را مستقیماً در معرض دید قرار می‌دهند و معمولاً متد خاصی ندارند. این دو را با هم قاطی نکن و هیبریدهای عجیب نساز. قانون Demeter را رعایت کن تا chainهای طولانی از callها (مثل `a.getB().getC().doSomething()`) تولید نشود. برای تبادل داده شبیه Database از DTO (Data Transfer Object) استفاده کن.

**مثال**: یک شیء شکل (Shape) ممکن است متدی مثل `draw()` داشته باشد بدون این‌که مختصات داخلی‌اش را لو بدهد؛ مثل ماشینی که موتور را پشت کاپوت قایم می‌کند ولی اجازه می‌دهد با فرمان و پدال رانندگی کنی.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Chapter 6: Objects and Data Structures](https://alisol.ir/?ai=Chapter%206%3A%20Objects%20and%20Data%20Structures%7CRobert%20C.%20Martin%7CClean%20Code|fa)

## فصل ۷: Error Handling

**خلاصه**: برای مدیریت خطا به‌جای return code از Exception استفاده کن، بلوک‌های `try-catch` را زود بنویس و در Exceptionها context کافی فراهم کن تا بفهمیم دقیقا چه شده است. کلاس‌های Exception را بر اساس نیاز caller طراحی کن، از برگرداندن `null` تا حد ممکن خودداری کن و جریان نرمال برنامه را تمیز و واضح نگه دار.

**مثال**: وقتی فایلی پیدا نمی‌شود، انداختن یک Exception مثل این است که گارسون رک بگوید «این غذا تمام شده»؛ نه این‌که یک بشقاب خالی جلویت بگذارد و امیدوار باشد خودت متوجه شوی.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Chapter 7: Error Handling](https://alisol.ir/?ai=Chapter%207%3A%20Error%20Handling%7CRobert%20C.%20Martin%7CClean%20Code|fa)

## فصل ۸: Boundaries

**خلاصه**: برای مدیریت dependency روی کتابخانه‌ها و کد third‑party، آن‌ها را wrap کن تا مرز بین کد خودت و کد خارجی مشخص باشد. برای شناخت بهتر behavior این مرزها از learning test استفاده کن و با adapterها interfaceهای تمیز و قابل‌کنترل بساز. اگر مرزها را تمیز نگه نداری، جزئیات پیاده‌سازی کتابخانه‌ها به داخل کد اصلی‌ات نشت می‌کند و تغییرات آینده را سخت می‌کند.

**مثال**: وقتی می‌خواهی کتابخانه‌ای مثل `log4j` را integrate کنی، قبل از استفادهٔ جدی چند تست کوچک می‌نویسی تا رفتار آن را بهتر بشناسی؛ مثل این است که قبل از خرید ماشین، یک دور با آن test‑drive بروی.

*(نکتهٔ شخصی: log4j هنوز قابل استفاده است، ولی در سال‌های اخیر معمولاً سراغ Logback یا SLF4J می‌روند که هم مدرن‌ترند و هم مشکلات امنیتی کمتر و کارایی بهتری دارند.)*

**لینک برای جزئیات بیشتر**:  
[Ask AI: Chapter 8: Boundaries](https://alisol.ir/?ai=Chapter%208%3A%20Boundaries%7CRobert%20C.%20Martin%7CClean%20Code|fa)

## فصل ۹: Unit Tests

**خلاصه**: Testها هم باید تمیز باشند و از سه قانون اصلی TDD (Test‑Driven Development) پیروی کنند: اول تستی بنویس که fail می‌شود، بعد کمترین کد لازم را برای pass شدن بنویس و خطاها را سریع برطرف کن. Testهای خوب، امکان تغییر امن کد را فراهم می‌کنند؛ برای همین باید خوانا باشند، ترجیحاً فقط یک assert اصلی داشته باشند و از اصول F.I.R.S.T پیروی کنند (سریع، مستقل، قابل‌تکرار، self‑validating و به‌موقع).

**مثال**: تستی که عملکرد `push` و `pop` در یک Stack را بررسی می‌کند شبیه امتحان کردن یک vending machine است؛ یک سکه می‌اندازی، یک نوشابه می‌گیری و مطمئن می‌شوی چیز اضافه یا عجیبی اتفاق نمی‌افتد.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Chapter 9: Unit Tests](https://alisol.ir/?ai=Chapter%209%3A%20Unit%20Tests%7CRobert%20C.%20Martin%7CClean%20Code|fa)

## فصل ۱۰: Classes

**خلاصه**: کلاس‌ها باید کوچک باشند، مسئولیت واحد (Single Responsibility) داشته باشند و cohesion بالایی داشته باشند؛ یعنی کارهای مرتبط را در خود جمع کنند و از وظایف نامرتبط دور بمانند. متدهای بزرگ را به متدهای کوچک‌تر بشکن تا کلاس منسجم و آمادهٔ تغییر باقی بماند.

**مثال**: کلاسی به نام `Printer` باید فقط مسئول چاپ باشد، نه این‌که در کنار آن مدیریت موجودی کاغذ را هم انجام دهد؛ این شبیه قهوه‌سازی است که بخواهد علاوه‌بر قهوه، دانه‌ها را هم آسیاب کند و هم دستگاه ظرف‌شویی باشد!

**لینک برای جزئیات بیشتر**:  
[Ask AI: Chapter 10: Classes](https://alisol.ir/?ai=Chapter%2010%3A%20Classes%7CRobert%20C.%20Martin%7CClean%20Code|fa)

## فصل ۱۱: Systems

**خلاصه**: در طراحی سیستم، ساخت (construction) را از استفاده (use) جدا کن؛ می‌توانی از factoryها، dependency injection و configuration مناسب برای این کار استفاده کنی. برای concerns مشترک (cross‑cutting concerns) از ابزارهایی مثل aspectها کمک بگیر. تصمیم‌ها را با فکر و در زمان درست بگیر، از استانداردها هوشمندانه استفاده کن و در صورت نیاز برای حوزهٔ خودت DSL (Domain‑Specific Language) بساز تا بیان مدل دامنه ساده‌تر شود.

**مثال**: ساخت یک شهر با برنامه‌ریزی جداگانه برای زیرساخت‌ها (آب، برق، گاز) و بعد ساختن خانه‌ها انجام می‌شود؛ درست مثل این‌که setup و configuration اپلیکیشن را از منطق runtime جدا نگه داری.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Chapter 11: Systems](https://alisol.ir/?ai=Chapter%2011%3A%20Systems%7CRobert%20C.%20Martin%7CClean%20Code|fa)

## فصل ۱۲: Emergence

**خلاصه**: طراحی Emergent بر پایهٔ چند قانون ساده شکل می‌گیرد: همهٔ testها باید pass شوند، duplication را حذف کن، کد را expressive نگه دار و تعداد کلاس‌ها و متدها را تا حد لازم و نه بیشتر نگه دار. با رعایت این قوانین، به‌تدریج طراحی تمیز و حرفه‌ای از دل کد بیرون می‌آید.

**مثال**: وقتی چند حلقهٔ تکراری شبیه به هم در گزارش‌ساز داری و آن‌ها را به یک متد مشترک refactor می‌کنی، شبیه این است که دستور یک غذا را طوری بازنویسی کنی که مرحله‌های تکراری را حذف و ساده‌تر کنی؛ در نتیجه دستور خواناتر و اجرای آن راحت‌تر می‌شود.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Chapter 12: Emergence](https://alisol.ir/?ai=Chapter%2012%3A%20Emergence%7CRobert%20C.%20Martin%7CClean%20Code|fa)

## فصل ۱۳: Concurrency

**خلاصه**: Concurrency می‌تواند کارایی را بالا ببرد، اما چالش‌هایی مثل deadlock، race condition و پیچیدگی debug را به همراه دارد. اصل Single Responsibility را در نظر داشته باش، داده‌ها را تا حد امکان از هم جدا نگه دار و از کتابخانه‌ها و ساختارهای thread‑safe استفاده کن. مدل‌های مختلف اجرا (execution models) را بشناس، بخش‌های critical را کوچک نگه دار و تست‌های خاص برای سناریوهای concurrent بنویس.

**مثال**: مثال معروف فیلسوفان در حال غذا خوردن (Dining Philosophers) نشان می‌دهد چطور منابع مشترک می‌توانند باعث deadlock شوند؛ انگار چند دوست دور یک میز فقط چند چنگال دارند و بدون هماهنگی همه می‌خواهند هم‌زمان شروع به غذا خوردن کنند.

*(نکتهٔ شخصی: ابزارهای concurrency جاوا از نسخهٔ 5 به بعد قوی شده‌اند و در سال‌های اخیر، ابزارهای سطح بالاتر در `java.util.concurrent` و حتی virtual threadها در Project Loom مدیریت concurrency را ساده‌تر کرده‌اند.)*

**لینک برای جزئیات بیشتر**:  
[Ask AI: Chapter 13: Concurrency](https://alisol.ir/?ai=Chapter%2013%3A%20Concurrency%7CRobert%20C.%20Martin%7CClean%20Code|fa)

## فصل ۱۴: Successive Refinement

**خلاصه**: از کدی شروع کن که «کار می‌کند» و بعد به‌صورت تدریجی آن را اصلاح کن؛ آرگومان‌ها را مرتب کن، خطاها را درست مدیریت کن و duplication را کم کن تا آن rough draft اولیه تبدیل به کدی تمیز و حرفه‌ای شود. این همان روند Refactoring مداوم است.

**مثال**: ساخت یک argument parser معمولاً با یک پیاده‌سازی شلوغ و نه‌چندان تمیز شروع می‌شود؛ اما با هر بار refactor، ساختار واضح‌تر و خواناتر می‌شود، درست مثل ویرایش‌های پشت‌سرهم روی یک انشاء تا جایی که متن نهایی شسته‌رفته شود.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Chapter 14: Successive Refinement](https://alisol.ir/?ai=Chapter%2014%3A%20Successive%20Refinement%7CRobert%20C.%20Martin%7CClean%20Code|fa)

## فصل ۱۵: JUnit Internals

**خلاصه**: در این فصل، نویسنده به درون JUnit نگاه می‌کند تا نمونهٔ واقعی از Clean Code را نشان بدهد؛ با refactor کردن برای شفافیت بیشتر، حذف duplication و بهتر کردن readability. ایده این است که حتی Frameworkها هم باید طبق همان اصول تمیزی نوشته شوند که برای کد معمولی توصیه می‌کنیم.

**مثال**: Refactor کردن کد مقایسه (comparison) در JUnit مثل تنظیم دنده‌های دوچرخه است تا حرکت نرم‌تر و بدون تکان شود؛ با حذف نقاط اصطکاک، استفاده از آن راحت‌تر و مطمئن‌تر می‌شود.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Chapter 15: JUnit Internals](https://alisol.ir/?ai=Chapter%2015%3A%20JUnit%20Internals%7CRobert%20C.%20Martin%7CClean%20Code|fa)

## فصل ۱۶: Refactoring SerialDate

**خلاصه**: در این فصل کلاس `SerialDate` از کتابخانهٔ JCommon را قدم‌به‌قدم refactor می‌کنند؛ اول آن را به کار می‌اندازند (make it work)، بعد با تمیز کردن نام‌ها، حذف duplication و اضافه کردن تست‌های مناسب آن را «درست» می‌کنند. این مثال عملی نشان می‌دهد Refactoring واقعی روی کد legacy چه شکلی است.

**مثال**: درست کردن یک کلاس تاریخ که پر از bug است شبیه تعمیر سقفی است که از چند جا چکه می‌کند؛ اول باید سوراخ‌ها را موقتاً ببندی تا آب قطع شود، بعد سازه را محکم‌تر و اصولی‌تر بازسازی کنی تا در بلندمدت مشکل برطرف شود.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Chapter 16: Refactoring SerialDate](https://alisol.ir/?ai=Chapter%2016%3A%20Refactoring%20SerialDate%7CRobert%20C.%20Martin%7CClean%20Code|fa)

## فصل ۱۷: Smells and Heuristics

**خلاصه**: این فصل، لیستی از code smellها (بوی بد در کد) مثل commentهای نامناسب، کد مرده (dead code)، abstractionهای اشتباه و... ارائه می‌دهد و برای هرکدام heuristicهایی برای تشخیص و اصلاح پیشنهاد می‌کند؛ مثل انتخاب نام‌های توصیفی، حذف duplication و متمرکز نگه داشتن توابع روی یک کار مشخص.

**مثال**: duplication در کد مثل تکرار یک شوخی است؛ خیلی زود قدیمی و خسته‌کننده می‌شود. با refactor کردن، هم کد را کوتاه‌تر و تمیزتر می‌کنی و هم maintenance آینده را ساده‌تر.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Chapter 17: Smells and Heuristics](https://alisol.ir/?ai=Chapter%2017%3A%20Smells%20and%20Heuristics%7CRobert%20C.%20Martin%7CClean%20Code|fa)

---

**دربارهٔ خلاصه‌کننده**

من *Ali Sol* هستم، یک PHP Developer. برای آشنایی بیشتر:

* وب‌سایت: [alisol.ir](https://alisol.ir)
* لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

