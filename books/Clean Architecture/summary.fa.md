# کتاب خلاصه: Clean Architecture
* **نویسنده**: Robert C. Martin
* **ژانر**: Software Engineering
* **تاریخ انتشار**: 2018

این سند خلاصه مهم‌ترین ایده‌ها و نکات کتاب **Clean Architecture** است.

## قبل از شروع

* این خلاصه کمک می‌کند مفاهیم اصلی کتاب را سریع‌تر یاد بگیرید و مرور کنید.
* بعد از هر بخش یک لینک `Ask AI` هست که می‌توانید روی آن کلیک کنید و از هوش مصنوعی درباره همان بخش سؤال‌های عمیق‌تر بپرسید.

## پارت ۱: Introduction

**خلاصه**: کتاب از اینجا شروع می‌کند که در عمل بین *design* و *architecture* در نرم‌افزار مرز واقعی وجود ندارد؛ از تصمیم‌های ریز سطح کد تا ساختارهای کلان سیستم همگی روی یک طیف هستند. هدف اصلی *architecture* این است که هزینه ساخت و نگه‌داری سیستم را در بلندمدت پایین نگه دارد؛ یعنی با منابع انسانی کم‌تر بتوانیم تغییرات بیش‌تری انجام دهیم و نیازهای مشتری را برآورده کنیم. با یک مطالعه موردی واقعی نشان می‌دهد که وقتی کد شلخته و به‌هم‌ریخته می‌شود، بهره‌وری تیم به‌شدت افت می‌کند: نسخه‌های اول با سرعت بالا منتشر می‌شوند، اما رفته‌رفته با وجود اضافه شدن برنامه‌نویس‌های جدید، سرعت توسعه به‌شدت کاهش پیدا می‌کند و هزینه‌ها سر به فلک می‌کشد. پیام اصلی این قسمت این است که **کد تمیز و معماری فکرشده، از همان ابتدا باید جدی گرفته شود** و توسعه‌دهنده‌ها نباید صرفاً روی اضافه کردن featureهای جدید تمرکز کنند.

**مثال**: تصور کن یک خانه بسازی که پی و سیم‌کشی‌اش را سرسری انجام داده‌ای؛ ممکن است اولش خانه روی پا بایستد، اما بعداً برای اضافه کردن یک اتاق جدید باید نصف دیوارها را خراب کنی و سیم‌کشی را از نو انجام دهی. نرم‌افزار هم همین‌طور است؛ اگر ساختار اولیه بد باشد، هر تغییر کوچکی تبدیل به یک بازسازی پرهزینه می‌شود.

**Link for More Details**:
[Ask AI: Introduction to Software Architecture](https://alisol.ir/?ai=Introduction%20to%20Software%20Architecture%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 1: What Is Design and Architecture?

**خلاصه**: نویسنده تأکید می‌کند که بین *design* سطح پایین و *architecture* سطح بالا، مرز قاطع و جداگانه‌ای وجود ندارد؛ هر دو در نهایت دنبال یک هدف‌اند: **کم‌کردن زحمت تغییر دادن سیستم در آینده**. معماری خوب سیستمی می‌سازد که راحت بتوان آن را تغییر، نگه‌داری و توسعه داد. در یک case study نشان می‌دهد که چگونه کد به‌هم‌ریخته، بهره‌وری را نابود می‌کند: تعداد خطوط کد تقریباً ثابت می‌ماند ولی تعداد اعضای تیم زیاد می‌شود و هزینه‌ها بالا می‌رود؛ چون تغییر دادن هر چیز کوچکی سخت و پرریسک است. پیام این فصل مثل حکایت خرگوش و لاک‌پشت است: تیمی که اول سریع می‌دود و به تمیزی اهمیت نمی‌دهد، در بلندمدت از تیمی که آرام‌تر اما تمیز کار می‌کند عقب می‌ماند.

**مثال**: مثل این است که یک پازل را اول خیلی راحت جلو ببری، اما بدون هیچ طرح و نقشه‌ای قطعه‌ها را بچینی؛ کمی بعد مجبور می‌شوی قطعه‌ها را زورکی جا بدهی و شکل کلی به‌هم می‌ریزد. نرم‌افزاری که بدون معماری جلو می‌رود، دقیقاً همین حالت را پیدا می‌کند؛ هر تغییر جدید با سیستم فعلی درگیر می‌شود.

**Link for More Details**:
[Ask AI: Design vs Architecture](https://alisol.ir/?ai=Design%20vs%20Architecture%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 2: A Tale of Two Values

**خلاصه**: نرم‌افزار دو نوع ارزش ایجاد می‌کند:  
۱. **رفتار (Behavior)** – این‌که نرم‌افزار «کار کند» و featureها پیاده شوند.  
۲. **معماری (Architecture)** – این‌که «تغییر دادن» نرم‌افزار چقدر آسان باشد.  

معمولاً رفتار / featureها فوریت بالایی دارند اما اهمیت بلندمدت‌شان از معماری کم‌تر است؛ در عوض معماری بسیار مهم است اما به‌نظر «فوری» نمی‌آید، و به همین خاطر اغلب نادیده گرفته می‌شود. نویسنده با استفاده از ماتریس آیزنهاور (مهم/غیرمهم – فوری/غیرفوری) توضیح می‌دهد که معماری در خانه «خیلی مهم ولی ظاهراً غیرفوری» قرار می‌گیرد؛ و تیم‌ها باید آگاهانه برای آن وقت بگذارند و در برابر فشار «فقط feature جدید بده» مقاومت کنند.

**مثال**: مثل نگه‌داری یک ماشین است: عوض‌کردن لاستیک پنچر (رفتار) فوری است، ولی تعویض منظم روغن (معماری) شاید امروز فوری نباشد، اما اگر بی‌خیالش شوی، یک روز موتور ماشینت می‌سوزد و وسط راه می‌مانی.

**Link for More Details**:
[Ask AI: Behavior and Architecture Values](https://alisol.ir/?ai=Behavior%20and%20Architecture%20Values%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## پارت ۲: Starting with the Bricks: Programming Paradigms

**خلاصه**: در این بخش سیر تحول *programming paradigm*ها را مرور می‌کند: **structured**, **object-oriented** و **functional**. این‌ها مثل «آجرهای پایه» برای هر معماری نرم‌افزاری هستند. هر پارادایم یک سری محدودیت و انضباط روی نحوه نوشتن کد تحمیل می‌کند: structured روی کنترل جریان کد (control flow)، OO روی مدیریت وابستگی‌ها، و functional روی immutability و پرهیز از state متغیر. این قوانین مستقل از تغییرات سخت‌افزار و تکنولوژی هستند و به‌نوعی قوانین دائمی برای ساخت سیستم‌های سالم و قابل نگه‌داری محسوب می‌شوند.

**مثال**: پارادایم‌ها مثل قوانین راهنمایی‌ و رانندگی برای کد هستند؛ بدون آن‌ها همه‌ چیز تبدیل به هرج‌ومرج می‌شود. structured programming مثل خط‌کشی‌ها و تابلوهای ایست است که جریان حرکت را منظم می‌کند.

**Link for More Details**:
[Ask AI: Programming Paradigms Overview](https://alisol.ir/?ai=Programming%20Paradigms%20Overview%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 3: Paradigm Overview

**خلاصه**: یک مرور سریع روی سه پارادایم اصلی دارد:  
- **؜Structured programming** برای کنترل منظم جریان برنامه،  
- **؜Object-oriented programming** برای مدیریت وابستگی‌ها از طریق polymorphism و abstraction،  
- **؜Functional programming** برای تأکید روی immutability و ساده‌کردن concurrency.  

این‌ها فقط سبک کدنویسی نیستند؛ بلکه محدودیت‌هایی هستند که اگر رعایت شوند، سیستم‌های مقیاس‌پذیر و قابل‌نگه‌داری می‌سازند. کتاب در ادامه نشان می‌دهد هر کدام از این پارادایم‌ها چطور روی معماری تأثیر می‌گذارند.

**مثال**: مثل ابزارهای مختلف در یک جعبه‌ابزار؛ هر پارادایم برای نوع خاصی از مشکل مناسب‌تر است، شبیه این‌که برای میخ از چکش استفاده می‌کنی نه از مشتت!

**Link for More Details**:
[Ask AI: Three Paradigms](https://alisol.ir/?ai=Three%20Paradigms%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 4: Structured Programming

**خلاصه**: این پارادایم از نقد دایکسترا روی دستورهای `goto` متولد شد. ایده این است که کل برنامه را می‌توان با سه ساختار **sequence**, **selection** و **iteration** نوشت و این ساختارها قابل اثبات و تحلیل‌اند. در عمل، به‌جای اثبات ریاضی دقیق، ما از تست‌ها استفاده می‌کنیم، اما همین ساختارمند بودن باعث می‌شود بتوانیم کد را به واحدهای کوچک، قابل‌فهم و قابل‌تست بشکنیم و باگ‌ها را راحت‌تر پیدا کنیم.

**مثال**: مثل این است که یک دستور غذا را به چند مرحله (sequence)، چند تصمیم «اگر این بود، آن را انجام بده» (selection) و چند کار تکراری «این کار را تا زمانی که پخته شود تکرار کن» (iteration) تقسیم کنی؛ بدون پرش‌های عجیب وسط دستور، دنبال‌کردن و اصلاح دستور خیلی ساده‌تر می‌شود.

**Link for More Details**:
[Ask AI: Structured Programming](https://alisol.ir/?ai=Structured%20Programming%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 5: Object-Oriented Programming

**خلاصه**: در این فصل روی سه مفهوم اصلی **encapsulation**، **inheritance** و **polymorphism** تمرکز می‌کند. encapsulation یعنی داده‌ها و رفتار مربوط به آن‌ها را در یک واحد جمع کنیم و جزئیات داخلی را پنهان کنیم. inheritance به ما اجازه reuse سلسله‌مراتبی می‌دهد. polymorphism هم وابستگی‌ها را از concrete implementation جدا می‌کند و کنترل را معکوس (inversion of control) می‌کند؛ طوری که policyهای سطح بالا به abstractionها وابسته باشند، نه به جزئیات سطح پایین. نتیجه این است که معماری در برابر تغییرات I/O، frameworkها و جزئیات محیطی مقاوم‌تر می‌شود.

**مثال**: مثل این است که بتوانی قطعات ماشین را عوض کنی بدون این‌که مجبور شوی کل موتور را از نو طراحی کنی؛ polymorphism به تو اجازه می‌دهد رفتارهای جدید را مثل یک قطعه جدید به سیستم وصل کنی.

**Link for More Details**:
[Ask AI: Object-Oriented Programming](https://alisol.ir/?ai=Object-Oriented%20Programming%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 6: Functional Programming

**خلاصه**: functional programming بر پایه **immutability** و پرهیز از state متغیر بنا شده است. با حذف یا محدود کردن state قابل‌تغییر، بسیاری از مشکلات concurrency و race conditionها از بین می‌روند. راهکار این است که بخش‌های mutable را ایزوله و کوچک کنیم یا از الگویی مثل **event sourcing** استفاده کنیم که در آن به‌جای نگه‌داشتن state فعلی، دنباله‌ای از eventها/transactionها ذخیره می‌شود. این نوع نگاه برای سیستم‌هایی مثل بانک‌ها که نیاز به audit و recovery دقیق دارند بسیار مفید است.

**مثال**: یک دفتر حسابداری را تصور کن که هیچ‌وقت چیزی را پاک نمی‌کند و فقط سطرهای جدید اضافه می‌کند؛ چون داده‌ها immutable هستند، بررسی، ردیابی و بازیابی اتفاقات خیلی ساده می‌شود.

**Link for More Details**:
[Ask AI: Functional Programming](https://alisol.ir/?ai=Functional%20Programming%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## پارت ۳: Design Principles

**خلاصه**: اصول **SOLID** در نگاه اول برای طراحی کلاس‌ها مطرح شده‌اند، اما در سطح معماری هم کاربرد دارند:  
- **؜SRP** برای تمرکز مسئولیت،  
- **؜OCP** برای گسترش بدون نیاز به تغییر کد موجود،  
- **؜LSP** برای جایگزینی سالم subtypeها،  
- **؜ISP** برای interfaceهای کوچک و هدفمند،  
- **؜DIP** برای معکوس کردن وابستگی‌ها به سمت abstractionها.  

اگر این اصول درست رعایت شوند، سیستم منعطف، قابل‌تست و قابل‌نگه‌داری می‌شود.

**مثال**: SOLID مثل یک ست مبلمان ماژولار است؛ می‌توانی چیدمان را عوض کنی و قطعات را جابه‌جا کنی بدون این‌که مجبور شوی کل اتاق را از نو بچینی.

**Link for More Details**:
[Ask AI: SOLID Design Principles](https://alisol.ir/?ai=SOLID%20Design%20Principles%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 7: SRP: The Single Responsibility Principle

**خلاصه**: SRP می‌گوید یک ماژول باید فقط به یک دلیل (برای یک actor) تغییر کند. اگر چند actor مختلف روی یک کلاس یا ماژول تأثیر بگذارند، تغییر برای یکی از آن‌ها ممکن است رفتار مورد نیاز دیگری را بشکند و این باعث تداخل، باگ و merge conflictهای آزاردهنده می‌شود. راه‌حل این است که کد را بر اساس actorها یا از طریق facadeها جدا کنیم تا هر بخش فقط یک منبع تغییر داشته باشد.

**مثال**: مثل این است که یک نفر هم آشپز باشد هم صندوقدار و هم گارسون؛ در نهایت هم خودش خسته می‌شود و هم رستوران به‌هم می‌ریزد. تقسیم نقش‌ها باعث می‌شود هر کس روی کار خودش تمرکز کند و کل سیستم روان‌تر کار کند.

**Link for More Details**:
[Ask AI: Single Responsibility Principle](https://alisol.ir/?ai=Single%20Responsibility%20Principle%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 8: OCP: The Open-Closed Principle

**خلاصه**: طبق OCP، سیستم باید «برای توسعه باز و برای تغییر بسته» باشد. یعنی وقتی می‌خواهیم رفتار جدیدی اضافه کنیم، تا حد امکان نباید کدهای موجود را تغییر دهیم، بلکه باید بتوانیم رفتار جدید را با اضافه کردن کلاس‌ها یا ماژول‌های جدید پیاده کنیم. این کار با abstraction، hiding information و مدیریت درست dependencyها ممکن می‌شود و در نتیجه سیستم در برابر تغییرات آینده انعطاف‌پذیرتر می‌شود.

**مثال**: مرورگری را تصور کن که با نصب plugin می‌توانی قابلیت‌های جدید به آن اضافه کنی؛ بدون این‌که لازم باشد هسته مرورگر را دست بزنی یا دوباره build کنی.

**Link for More Details**:
[Ask AI: Open-Closed Principle](https://alisol.ir/?ai=Open-Closed%20Principle%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 9: LSP: The Liskov Substitution Principle

**خلاصه**: LSP می‌گوید subtypeها باید بتوانند به‌جای نوع پایه (base type) استفاده شوند بدون این‌که رفتار مورد انتظار سیستم را به‌هم بزنند. اگر این اصل رعایت نشود، inheritance به‌جای کمک، معماری را پیچیده و شکننده می‌کند؛ مانند مثال کلاس مربع و مستطیل که اگر درست مدل نشود، مجبور می‌شوی در همه‌جا if بنویسی که اگر اینجا مربع بود، رفتار را تغییر بده.

**مثال**: اگر یک کلاس `Bird` داشته باشی که فرض می‌کنی همه‌ی زیرکلاس‌هایش می‌توانند پرواز کنند، ولی یک زیرکلاس `Penguin` بسازی که پرواز نمی‌کند، همه‌جا مجبور می‌شوی `if (bird is Penguin)` بنویسی و منطق برنامه را کثیف کنی.

**Link for More Details**:
[Ask AI: Liskov Substitution Principle](https://alisol.ir/?ai=Liskov%20Substitution%20Principle%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 10: ISP: The Interface Segregation Principle

**خلاصه**: ISP هشدار می‌دهد که interfaceهای چاق و همه‌کاره، کلاس‌ها را مجبور می‌کنند به چیزهایی وابسته شوند که واقعاً به آن‌ها نیاز ندارند. به‌جای آن باید interfaceهای کوچک‌تر و تخصصی‌تر تعریف کنیم تا هر client فقط به متدهایی وابسته باشد که واقعاً لازم دارد. این کار هم coupling را کم می‌کند و هم design را در سطح معماری تمیزتر و شفاف‌تر می‌کند.

**مثال**: به‌جای این‌که یک interface بزرگ `Printer` داشته باشی که هم print، هم scan، هم fax را در خود جا داده، آن را به چند interface کوچک‌تر تقسیم می‌کنی تا هر device فقط همان چیزی را پیاده کند که واقعاً دارد.

**Link for More Details**:
[Ask AI: Interface Segregation Principle](https://alisol.ir/?ai=Interface%20Segregation%20Principle%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 11: DIP: The Dependency Inversion Principle

**خلاصه**: DIP می‌گوید policyهای سطح بالا نباید مستقیم به جزئیات سطح پایین وابسته باشند؛ هر دو باید به abstraction وابسته شوند. این یعنی به‌جای این‌که کلاس‌های اصلی‌مان مستقیماً کلاس‌های concrete را نمونه‌سازی کنند، از abstractionها (interface/abstract class) استفاده کنیم و ساخت objectهای concrete را به factoryها یا لایه‌های بیرونی بسپاریم. نتیجه این می‌شود که جزئیات متغیر و volatile در outer layerها حبس می‌شوند و core سیستم پایدارتر می‌ماند.

**مثال**: یک چراغ‌ مطالعه را در نظر بگیر که به یک abstraction به نام `Switch` وابسته است، نه به نوع خاصی از لامپ. در این صورت می‌توانی لامپ را از معمولی به LED یا هوشمند تغییر دهی بدون این‌که نیاز باشد منطق چراغ یا سوئیچ را عوض کنی.

**Link for More Details**:
[Ask AI: Dependency Inversion Principle](https://alisol.ir/?ai=Dependency%20Inversion%20Principle%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## پارت ۴: Component Principles

**خلاصه**: در این بخش *component* به‌عنوان واحد deploy مطرح می‌شود. سه اصل **REP**, **CCP** و **CRP** کمک می‌کنند تصمیم بگیریم چه کلاس‌هایی باید در یک component کنار هم قرار بگیرند تا هم reuse خوب باشد، هم تغییرها در یک ناحیه متمرکز شود و هم چیزهای نامرتبط بی‌دلیل با هم باند نشوند. از طرف دیگر اصول **ADP**, **SDP** و **SAP** روی شکل dependency بین componentها تمرکز دارند تا گراف وابستگی‌ها بدون چرخه (acyclic)، پایدار و انعطاف‌پذیر بماند.

**مثال**: componentها شبیه بلوک‌های Lego هستند؛ اگر درست طراحی شوند، راحت کنار هم قرار می‌گیرند و می‌توانی بدون این‌که بقیه ساختار فرو بریزد، یک بخش را جدا و بخش دیگری اضافه کنی.

**Link for More Details**:
[Ask AI: Component Principles](https://alisol.ir/?ai=Component%20Principles%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 12: Components

**خلاصه**: نویسنده از تاریخچه componentها شروع می‌کند؛ از linkerهای اولیه تا jar و DLL در سیستم‌های مدرن. ایده اصلی این است که بتوانیم قسمت‌هایی از کد را به‌صورت مستقل build و deploy کنیم. تکامل سخت‌افزار و سیستم‌عامل‌ها شکل componentها را عوض کرده، اما هدف اصلی هنوز همان است: **قابلیت جابه‌جایی (relocatability) و deploy مستقل**.

**مثال**: مثل کانتینرهای حمل‌ونقل در بنادر؛ استاندارد بودن ابعاد و شکل آن‌ها باعث می‌شود خیلی راحت روی کشتی، قطار یا کامیون جابه‌جا شوند.

**Link for More Details**:
[Ask AI: History of Components](https://alisol.ir/?ai=History%20of%20Components%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 13: Component Cohesion

**خلاصه**: این فصل سه اصل **REP** (Reuse/Release Equivalence Principle)، **CCP** (Common Closure Principle) و **CRP** (Common Reuse Principle) را معرفی می‌کند. این اصول به ما کمک می‌کنند تصمیم بگیریم کدام کلاس‌ها باید در یک component کنار هم قرار بگیرند. گاهی می‌خواهیم چیزهایی را که با هم تغییر می‌کنند کنار هم بگذاریم، گاهی چیزهایی را که با هم reuse می‌شوند، و این‌ها همیشه همسو نیستند؛ بنابراین بین این سه باید تعادل برقرار کنیم.

**مثال**: مثل این است که وسایل آشپزخانه را در یک کشو یا کابینت منسجم قرار دهی؛ اگر قاشق‌ها، چاقوها و کفگیرها همه در یک‌جا باشند، پیدا کردن و جابه‌جایی‌شان ساده‌تر است تا این‌که هر کدام یک گوشه‌ی خانه باشد.

**Link for More Details**:
[Ask AI: Component Cohesion](https://alisol.ir/?ai=Component%20Cohesion%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 14: Component Coupling

**خلاصه**: اینجا به این می‌پردازد که componentها چطور باید به هم وابسته باشند. **ADP** (Acyclic Dependencies Principle) می‌گوید گراف dependencyها نباید cycle داشته باشد؛ این باعث می‌شود build و deployment قابل‌پیش‌بینی و ساده بماند. **SDP** (Stable Dependencies Principle) پیشنهاد می‌کند componentهایی که تغییرات کم‌تری دارند در پایین گراف قرار بگیرند و componentهای متغیرتر به آن‌ها وابسته شوند، نه برعکس. **SAP** (Stable Abstractions Principle) هم می‌گوید componentهایی که پایدارند باید abstractتر باشند تا تغییرات آینده را بتوانند بهتر جذب کنند.

**مثال**: یک رودخانه را در نظر بگیر که فقط در یک جهت جریان دارد؛ اگر شاخه‌ها به‌صورت چرخه‌ای به خودشان برگردند، آب می‌ایستد و سیل و گرفتگی به‌وجود می‌آید. dependencyهای چرخه‌دار هم همین مشکل را در سیستم ایجاد می‌کنند.

**Link for More Details**:
[Ask AI: Component Coupling](https://alisol.ir/?ai=Component%20Coupling%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## پارت ۵: Architecture

**خلاصه**: در این بخش تعریف می‌کند که معماری خوب فقط درباره ساختار کد نیست؛ باید چهار چیز را پوشش دهد: **development** (چطور تیم‌ها کار می‌کنند)، **deployment** (چقدر راحت می‌توان سیستم را نصب و به‌روزرسانی کرد)، **operation** (کارایی و رفتار در runtime) و **maintenance** (هزینه و سختی تغییرات آینده). معماری خوب روی use caseها متمرکز است، boundaryهای واضحی بین concernهای مختلف می‌کشد و دیتابیس، UI و frameworkها را به‌عنوان جزئیات قابل‌تغییر (plugin) می‌بیند، نه قلب سیستم.

**مثال**: مثل ساختن یک چادر انعطاف‌پذیر در برابر یک کلبه کاملاً خشک و سخت؛ چادر را می‌توانی به شکل‌های مختلف برپا کنی و جا‌به‌جا کنی بدون این‌که لازم باشد از صفر بسازی.

**Link for More Details**:
[Ask AI: Core Architecture Concepts](https://alisol.ir/?ai=Core%20Architecture%20Concepts%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 15: What Is Architecture?

**خلاصه**: معماری روی چهار حوزه اثر می‌گذارد:  
- **؜Development**: معماری روی ساختار تیم‌ها و نحوه کار روزمره تاثیر دارد؛ آیا تیم‌ها می‌توانند مستقل کار کنند یا همه‌چیز روی هم قفل است؟  
- **؜Deployment**: آیا می‌توانیم سیستم را بدون downtime بزرگ به‌روزرسانی کنیم؟ آیا بخش‌ها را می‌توان جداگانه deploy کرد؟  
- **؜Operation**: معماری روی performance، scalability و رفتار runtime هم اثر دارد، اما این تنها هدفش نیست.  
- **؜Maintenance**: مهم‌ترین جنبه این است که تغییر دادن سیستم چقدر سریع، کم‌خطر و ارزان است.  

معماری خوب وابستگی به deviceها، دیتابیس‌ها و frameworkهای خاص را کم می‌کند تا گزینه‌های آینده باز بمانند.

**مثال**: مثل طراحی یک مرکز خرید است که مغازه‌ها بتوانند عوض شوند، جابه‌جا شوند یا بازسازی شوند بدون این‌که لازم باشد کل پاساژ را برای مدت طولانی تعطیل کنی.

**Link for More Details**:
[Ask AI: Defining Architecture](https://alisol.ir/?ai=Defining%20Architecture%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 16: Independence

**خلاصه**: این فصل روی **استقلال (independence)** تأکید دارد: استقلال لایه‌ها، use caseها و modeهای مختلف سیستم. اگر این استقلال را درست طراحی کنیم، تیم‌ها می‌توانند به‌طور مستقل کار کنند، بخش‌ها جداگانه deploy شوند و سیستم در زمان اجرا (operation) هم انعطاف‌پذیر باشد. نویسنده اشاره می‌کند که گاهی کمی duplication برای رسیدن به decoupling ارزشش را دارد؛ همه‌چیز را نباید به اسم reuse آن‌قدر مشترک کرد که همه‌چیز به هم گره بخورد.

**مثال**: مثل واگن‌های قطار است که می‌توانند از هم جدا شوند؛ اگر یک واگن مشکل پیدا کند، لازم نیست کل قطار را از کار بیندازی.

**Link for More Details**:
[Ask AI: Architectural Independence](https://alisol.ir/?ai=Architectural%20Independence%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 17: Boundaries: Drawing Lines

**خلاصه**: این فصل درباره این است که کجا و چطور باید **boundary** بکشیم؛ یعنی کدام بخش‌ها از سیستم باید از هم جدا شوند. نویسنده پیشنهاد می‌کند که **business core** را از جزئیاتی مثل UI، database و framework جدا کنیم و این مرزها را تا حد امکان زود در طراحی در نظر بگیریم؛ هرچند الزاماً از همان اول لازم نیست full boundary (مثلاً service مجزا) بسازیم، می‌توانیم با شکل‌های سبک‌تر شروع کنیم. مثال‌هایی از پروژه‌هایی می‌آورد که به‌خاطر نداشتن boundary مناسب، تغییرات کوچک به کابوس تبدیل شده‌اند.

**مثال**: مثل این است که قبل از ساختن خانه، با یک حصار ساده محدوده حیاط و فضای داخلی را مشخص کنی؛ حتی اگر هنوز دیوارها کامل نشده باشند، چارچوب کلی مشخص است.

**Link for More Details**:
[Ask AI: Drawing Boundaries](https://alisol.ir/?ai=Drawing%20Boundaries%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 18: Boundary Anatomy

**خلاصه**: این فصل انواع مختلف boundary را توضیح می‌دهد: بعضی‌ها در سطح source code هستند (مثلاً packageها در یک monolith)، بعضی در سطح deployment (مثل DLL یا jar)، و بعضی در سطح service. نویسنده هشدار می‌دهد که همیشه لازم نیست سراغ سنگین‌ترین نوع boundary (مثلاً microservice) برویم؛ در بسیاری از موارد یک monolith با boundaryهای درست در سطح ماژول و component، کاملاً کافی و حتی بهتر است.

**مثال**: دیوارهای یک خانه را در نظر بگیر؛ بعضی‌ها load-bearing هستند و محکم، بعضی دیوارهای سبک یا درهای کشویی‌اند. لازم نیست همه‌جا دیوار بتنی بسازی؛ نوع جداکننده را طبق نیاز انتخاب می‌کنی.

**Link for More Details**:
[Ask AI: Boundary Types](https://alisol.ir/?ai=Boundary%20Types%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 19: Policy and Level

**خلاصه**: در این فصل، مفهوم **policy** و **level** را معرفی می‌کند. policyها مجموعه‌ای از قوانین و رفتارها هستند که بر اساس دلیل تغییر دسته‌بندی می‌شوند؛ levelها هم نشان می‌دهند یک policy چقدر از I/O و جزئیات دور است. policyهای سطح بالاتر عمومی‌تر و پایدارترند و باید مستقل از policyهای سطح پایین‌تر باشند؛ طوری که تغییر در UI یا database روی قوانین کسب‌وکار اثر مستقیم نگذارد.

**مثال**: تصمیم‌های یک CEO (سطح بالا) نسبت به کارهای جزئی کارمندان (سطح پایین) پایدارتر و کلی‌تر است؛ استراتژی شرکت نباید به نوع پرینتری که در دفتر استفاده می‌شود وابسته باشد.

**Link for More Details**:
[Ask AI: Policy Levels](https://alisol.ir/?ai=Policy%20Levels%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 20: Business Rules

**خلاصه**: این فصل روی **business rule**ها تمرکز می‌کند؛ قوانینی که قلب سیستم را تشکیل می‌دهند و باید مستقل از device، database، UI و سایر جزئیات باشند. این قوانین معمولاً در entityها و use caseها مدل می‌شوند. برای این‌که این core تمیز بماند، بهتر است از modelهای درخواست/پاسخ (request/response model) استفاده کنیم تا ورودی و خروجی سیستم را از منطق داخلی جدا کند.

**مثال**: مثل قوانین بازی شطرنج است که مستقل از این‌که روی یک تخته فیزیکی بازی کنی یا در یک app موبایل، ثابت می‌مانند.

**Link for More Details**:
[Ask AI: Business Rules](https://alisol.ir/?ai=Business%20Rules%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 21: Screaming Architecture

**خلاصه**: معماری یک سیستم باید با دیدن structure پروژه، **فریاد بزند** که این نرم‌افزار درباره چیست. اگر بسته‌ها و ماژول‌ها همه بر اساس frameworkها، لایه‌ها یا تکنولوژی‌ها نام‌گذاری شده باشند، معماری بیشتر درباره implementation صحبت می‌کند تا business. در عوض، ساختار باید use caseها و domain سیستم را منعکس کند؛ مثلاً در یک سیستم کتابخانه، معماری باید از همان اول فریاد بزند «books، members، loans» نه «controllers، services، repositories».

**مثال**: مثل یک بیمارستان است که با دیدن ساختمان و علائم، سریع متوجه می‌شوی اینجا برای مراقبت‌ سلامتی است، نه یک مجموعه اداری معمولی.

**Link for More Details**:
[Ask AI: Screaming Architecture](https://alisol.ir/?ai=Screaming%20Architecture%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 22: The Clean Architecture

**خلاصه**: این فصل مدل معروف **Clean Architecture** را معرفی می‌کند: چند حلقه‌ی هم‌مرکز که dependencyها همیشه از بیرون به سمت داخل اشاره می‌کنند. حلقه‌های داخلی‌تر شامل entityها و business ruleهای اصلی هستند و حلقه‌های بیرونی شامل use caseها، interface adapterها، frameworkها، UI، database و غیره. قانون اصلی این است که حلقه‌های داخلی نباید چیزی درباره outer layerها بدانند. این ساختار باعث می‌شود core سیستم تست‌پذیر، مستقل و پایدار بماند.

**مثال**: مثل یک قلعه با دیوارهای چندلایه است که «keep» یا هسته‌ی اصلی در وسط قرار دارد و دیوارهای بیرونی قابل‌تغییرتر و کم‌اهمیت‌ترند.

**Link for More Details**:
[Ask AI: Clean Architecture](https://alisol.ir/?ai=Clean%20Architecture%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 23: Presenters and Humble Objects

**خلاصه**: این فصل pattern **Humble Object** را توضیح می‌دهد؛ مخصوصاً برای قسمت‌هایی که test کردن‌شان سخت است، مثل GUI. ایده این است که بخش سخت‌تست‌پذیر (مثلاً view) را تا حد امکان ساده و «خجالتی» (humble) نگه داریم و منطق اصلی format و تبدیل داده‌ها را به یک **presenter** بسپاریم. presenter را می‌توان به‌راحتی unit test کرد، درحالی‌که view فقط داده را نمایش می‌دهد.

**مثال**: مثل یک بازیگر خجالتی است که فقط دیالوگ را اجرا می‌کند و یک کارگردان (presenter) که تمام تصمیم‌های مهم را درباره‌ی نحوه اجرا می‌گیرد.

**Link for More Details**:
[Ask AI: Presenters and Humble Objects](https://alisol.ir/?ai=Presenters%20and%20Humble%20Objects%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 24: Partial Boundaries

**خلاصه**: پیاده‌سازی full boundaryها (مثل جدا کردن کامل دو بخش در دو service مجزا) هزینه‌بر است. این فصل درباره‌ی **partial boundary**ها صحبت می‌کند؛ یعنی راه‌حل‌های میانی‌ای مثل جدا کردن code در packageهای مستقل، استفاده از facade یا interface بدون این‌که حتماً deploy جداگانه داشته باشند. این رویکردها انعطاف‌پذیری خوبی می‌دهند ولی هزینه‌شان نسبت به full boundary کمتر است.

**مثال**: مثل این است که قبل از ساختن دیوارهای آجری، فعلاً با پارتیشن‌های سبک اتاق‌ها را از هم جدا کنی تا اگر بعداً خواستی چیدمان را عوض کنی، راحت‌تر باشی.

**Link for More Details**:
[Ask AI: Partial Boundaries](https://alisol.ir/?ai=Partial%20Boundaries%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 25: Layers and Boundaries

**خلاصه**: این فصل توضیح می‌دهد که حتی اگر ما عملاً boundaryهای فیزیکی (مثل service یا process جدا) پیاده نکنیم، باز هم **boundary مفهومی** وجود دارد. اگر بیش‌ازحد لایه بسازیم، ممکن است سیستم پیچیده و کند شود. با مثال بازی Hunt the Wumpus نشان می‌دهد که چطور می‌توان به‌شکل عمل‌گرایانه‌تری boundaryها را طراحی کرد؛ نه خیلی کم و نه خیلی زیاد.

**مثال**: مثل رودخانه‌هایی است که در طبیعت مرزهای طبیعی می‌سازند؛ لازم نیست در همه‌جا پل بزنی، فقط در جاهایی که واقعا نیاز به عبور هست.

**Link for More Details**:
[Ask AI: Layers and Boundaries](https://alisol.ir/?ai=Layers%20and%20Boundaries%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 26: The Main Component

**خلاصه**: این فصل نقش `main` یا **Main Component** را توضیح می‌دهد؛ جایی که سیستم پیکربندی می‌شود، dependencyها inject می‌شوند و همه‌ چیز برای شروع کار کنار هم قرار می‌گیرد. از نگاه معماری، `main` یک جزئیات سطح پایین است و باید به‌عنوان یک plugin برای architecture در نظر گرفته شود، نه جایی که business ruleها زندگی کنند.

**مثال**: مثل سوئیچ روشن‌کردن ماشین است؛ خودش موتور یا سیستم انتقال قدرت نیست، فقط آن‌ها را راه می‌اندازد.

**Link for More Details**:
[Ask AI: Main Component](https://alisol.ir/?ai=Main%20Component%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 27: Services: Great and Small

**خلاصه**: این فصل می‌گوید **service**ها (از microservice تا serviceهای کوچک‌تر) خودشان معماری نیستند، بلکه یک **جزئیات پیاده‌سازی** هستند. معماری باید بر اساس decouple کردن بخش‌هایی که واقعاً دلایل تغییر مستقل دارند طراحی شود، نه صرفاً بر اساس hype روز که «همه‌چیز باید microservice باشد». گاهی OO design خوب در یک monolith جواب بهتری می‌دهد تا پخش‌کردن همه‌چیز در serviceهای ریز و درشت.

**مثال**: microserviceها را می‌توان مثل کارگرهای تخصصی دید؛ خوب‌اند وقتی واقعاً کارها مستقل و جدا باشد، اما اگر همه‌ چیز به‌شدت وابسته باشد، یک تیم منسجم ممکن است بهتر از ده‌ها کارگر پراکنده عمل کند.

**Link for More Details**:
[Ask AI: Services in Architecture](https://alisol.ir/?ai=Services%20in%20Architecture%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 28: The Test Boundary

**خلاصه**: تست‌ها هم در واقع یک component هستند و باید از همان قوانین dependency پیروی کنند. اگر design را طوری بچینیم که سیستم از طریق APIها و boundaryهای مشخص تست شود، تست‌ها کمتر شکننده می‌شوند و با تغییر جزئیات، مدام نمی‌شکنند. معماری خوب testability را از ابتدا در نظر می‌گیرد، نه این‌که بعداً به‌زور به سیستم اضافه کند.

**مثال**: مثل تورهای ایمنی زیر بندباز است؛ باید طوری قرار داده شوند که سقوط را بگیرند ولی خودشان مانع اجرای نمایش نشوند.

**Link for More Details**:
[Ask AI: Test Boundaries](https://alisol.ir/?ai=Test%20Boundaries%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 29: Clean Embedded Architecture

**خلاصه**: در معماری سیستم‌های embedded هم باید سخت‌افزار و سیستم‌عامل را به‌عنوان **جزئیات** دید. با قرار دادن لایه‌هایی مثل HAL (Hardware Abstraction Layer) می‌توانیم logic اصلی را از platform جدا کنیم تا هم test کردن راحت‌تر شود و هم بتوانیم در آینده platform را عوض کنیم. اگر جزئیات سخت‌افزار در همه‌ جای code پخش شود، upgrade یا تغییر دستگاه تقریباً غیرممکن می‌شود.

**مثال**: مثل داشبورد یک ماشین است که باید تقریباً مستقل از نوع موتور یا سیستم سوخت‌رسانی عمل کند؛ اگر بخواهی موتور را عوض کنی، نباید مجبور شوی کل داشبورد را هم طراحی مجدد کنی.

**Link for More Details**:
[Ask AI: Clean Embedded Architecture](https://alisol.ir/?ai=Clean%20Embedded%20Architecture%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## پارت ۶: Details

**خلاصه**: این بخش تأکید می‌کند که چیزهایی مثل **database**، **web** و **framework**ها در outer circle قرار دارند و فقط **جزئیات (details)** هستند؛ آن‌ها نباید معماری را dictate کنند. business ruleها باید در مرکز باشند و این جزئیات باید به‌عنوان pluginهایی دیده شوند که می‌توانند در طول زمان تغییر کنند.

**مثال**: مثل کفش و لباس‌اند؛ می‌توانی آن‌ها را عوض کنی بدون این‌که نحوه راه رفتنت را از صفر یاد بگیری.

**Link for More Details**:
[Ask AI: Handling Details](https://alisol.ir/?ai=Handling%20Details%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 30: The Database Is a Detail

**خلاصه**: دیتابیس‌ها صرفاً ابزاری برای ذخیره‌سازی‌اند و نباید به قلب design تبدیل شوند. relational databaseها برای سازماندهی داده‌ها عالی‌اند، اما اگر دیسکی وجود نداشته باشد، می‌توان از RAM یا ساختارهای دیگر استفاده کرد. انتخاب دیتابیس و ترفندهای performance باید بعد از design business ruleها و architecture کلی انجام شود، نه قبل از آن.

**مثال**: دیتابیس مثل یک کمد بایگانی است که نامه‌ها را مرتب می‌کند، اما محتوا و متن نامه‌ها را تعریف نمی‌کند.

**Link for More Details**:
[Ask AI: Database as Detail](https://alisol.ir/?ai=Database%20as%20Detail%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 31: The Web Is a Detail

**خلاصه**: وب فقط یک **کانال I/O** است؛ معماری نباید به این وابسته باشد که کاربر از طریق terminal، desktop app، mobile app یا web با سیستم ارتباط می‌گیرد. تاریخ نشان داده که این کانال‌ها مدام عوض می‌شوند؛ چیزی که باید پایدار بماند core architecture است، نه تکنولوژی UI.

**مثال**: مثل کامیونی است که کالا را حمل می‌کند؛ مدل کامیون می‌تواند عوض شود، اما خود کالا (business ruleها) همان است.

**Link for More Details**:
[Ask AI: Web as Detail](https://alisol.ir/?ai=Web%20as%20Detail%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 32: Frameworks Are Details

**خلاصه**: frameworkها قدرت و سرعت زیادی می‌دهند اما ریسک lock-in هم دارند؛ اگر معماری را حول یک framework خاص بسازیم، بعداً تغییر آن تقریباً ناممکن می‌شود. به‌جای این‌که application را «درون» framework تعریف کنیم، باید framework را به‌عنوان جزئیات outer layer ببینیم و از طریق adapterها یا proxyها با آن صحبت کنیم.

**مثال**: مثل این است که ابزار قدرتمندی را اجاره کنی؛ خوبی دارد، اما نباید کل خانه را طوری طراحی کنی که فقط با همان ابزار قابل‌ساختن باشد.

**Link for More Details**:
[Ask AI: Frameworks as Details](https://alisol.ir/?ai=Frameworks%20as%20Details%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 33: Case Study: Video Sales

**خلاصه**: در این case study مثال یک سایت فروش ویدیو را می‌زند و نشان می‌دهد چگونه می‌توان architecture را بر اساس use caseها طراحی کرد؛ componentها طوری چیده می‌شوند که dependencyها تمیز و یک‌طرفه باشند و تغییر در یک use case اثر حداقلی روی بقیه داشته باشد. با این ساختار، اضافه کردن featureهای جدید، تغییر workflowها یا حتی عوض‌کردن channel ارائه (مثلاً web به mobile) ساده‌تر می‌شود.

**مثال**: مثل طراحی چیدمان یک فروشگاه است که دور و بر مسیر حرکت مشتری‌ها طراحی شده، نه بر اساس برند قفسه‌ها؛ مشتری راحت حرکت می‌کند و تغییر چیدمان هم ساده‌تر است.

**Link for More Details**:
[Ask AI: Video Sales Case Study](https://alisol.ir/?ai=Video%20Sales%20Case%20Study%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## فصل 34: The Missing Chapter

**خلاصه**: این فصل انواع استراتژی‌های **code packaging** را مقایسه می‌کند:  
- بسته‌بندی لایه‌ای (layered) بر اساس لایه‌هایی مثل UI، business، data،  
- بسته‌بندی بر اساس feature یا vertical slice،  
- بسته‌بندی بر اساس component (با تکیه بر اصول SOLID).  

نویسنده پیشنهاد می‌کند که اغلب اوقات packaging بر اساس component، encapsulation و decoupling بهتری ایجاد می‌کند و مدیریت تغییر را آسان‌تر می‌سازد.

**مثال**: مثل مرتب‌کردن جعبه‌ابزار است؛ به‌جای این‌که همه چکش‌ها را یک‌جا و همه پیچ‌گوشتی‌ها را یک‌جا بگذاری، ابزارهایی را که معمولاً با هم استفاده می‌کنی در یک بخش قرار می‌دهی.

**Link for More Details**:
[Ask AI: Code Packaging Strategies](https://alisol.ir/?ai=Code%20Packaging%20Strategies%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)

## پارت ۷: Appendix

**خلاصه**: در بخش پایانی، نویسنده چندین داستان واقعی از پروژه‌هایی که در طول دوران کاری‌اش روی آن‌ها کار کرده تعریف می‌کند؛ داستان‌هایی از موفقیت و شکست که در آن‌ها معماری گاهی ناجی بوده و گاهی هم به‌خاطر over-design یا تصمیم‌های اشتباه، خودش مشکل‌ساز شده است. این «باستان‌شناسی معماری» کمک می‌کند ببینیم چه الگوهایی در عمل جواب داده‌اند و چه چیزهایی فقط روی کاغذ زیبا بوده‌اند.

**مثال**: مثل یک کاوش باستان‌شناسی در کدهای قدیمی است که نشان می‌دهد چرا بعضی ساختارها هنوز سرپا هستند و بعضی‌ها خیلی زود فرو پاشیده‌اند.

**Link for More Details**:
[Ask AI: Architecture Archaeology](https://alisol.ir/?ai=Architecture%20Archaeology%7CRobert%20C.%20Martin%7CClean%20Architecture%7Cfa)


---

**درباره خلاصه کننده**

من *Ali Sol* هستم، یک PHP Developer. بیشتر درباره من:
* وب‌سایت: [alisol.ir](https://alisol.ir)
* لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

