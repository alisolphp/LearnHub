# خلاصه دوره: Mastering Design Patterns – بخش ۲

- **پلتفرم**: Code with Mosh  
- **مدرس**: Mosh Hamedani  
- **لینک دوره**: [https://codewithmosh.com/p/design-patterns-part2](https://codewithmosh.com/p/design-patterns-part2)

این فایل، نکات کلیدی دورهٔ «Mastering Design Patterns: Part 2» رو خیلی خلاصه و جمع‌وجور مرور می‌کنه. برای یادگیری عمیق‌تر، حتما خود دوره رو ببین.

---

## قبل از این‌که شروع کنی

- این یادداشت‌ها برای مرور سریع و یادگیری دوبارهٔ مفاهیم مهم درست شده.  
- روی لینک‌های `Ask AI` کلیک کن تا دربارهٔ هر مبحث که خواستی بیشتر عمیق بشی.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=005796ea -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-2)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-2) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-2)
<!-- LH-BUTTONS:END -->

---

## مقدمه

این بخش، قسمت دوم سری **Mastering Design Patterns** هست.  
در قسمت اول دربارهٔ **Behavioral Patterns** (نحوهٔ ارتباط و تعامل objectها) صحبت شد.  
در این قسمت تمرکز روی **Structural Patterns** هست؛ یعنی این‌که objectها چطور کنار هم قرار می‌گیرن و به هم مرتبط می‌شن تا سیستم‌هایی قابل نگهداری و انعطاف‌پذیر بسازیم.

فرض بر اینه که یا قسمت اول رو دیدی، یا با اصول **SOLID** و چند تا design pattern پایه آشنا هستی، برای همین سرعت آموزش بالاست و روی پیاده‌سازی واقعی تمرکز داره.

---

## ؜Composite Pattern

**خلاصه**:  
وقتی می‌خوای ساختارهای درختی (part-whole hierarchy) بسازی و با **item تکی** و **گروه‌ای از itemها** مثل هم رفتار کنی، از **Composite** استفاده کن.  
به‌جای این‌که همه‌جا type چک کنی و cast انجام بدی، یه interface مشترک به اسم مثلا `Component` تعریف می‌کنی که هم **leaf**‌ها (آیتم‌های تکی) و هم **composite**‌ها (گروه‌ها/containerها) پیاده‌سازی‌اش می‌کنن.

**مثال**:  
توی Keynote یا PowerPoint وقتی چند تا shape رو group می‌کنی، اون group مثل یه shape واحد رفتار می‌کنه: هر move یا resize که انجام می‌دی روی همهٔ shapeهای داخلی هم اعمال می‌شه.  
همین ایده توی file system هم هست: یه folder می‌تونه هم file داشته باشه هم folderهای دیگه، و عمل delete یا move روی folder، به‌صورت بازگشتی روی همهٔ محتواش انجام می‌شه.

**لینک برای جزئیات بیشتر**:  [Ask AI: Composite Pattern](https://alisol.ir/?ai=Composite%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%202|fa)

---

## ؜Adapter Pattern

**خلاصه**:  
**؜Adapter** رابط (interface) یک کلاس موجود رو به interface مورد انتظار کدت تبدیل می‌کنه.  
وقتی می‌خوای از یه **third-party library** استفاده کنی ولی APIش با interface خودت سازگار نیست، یه adapter می‌نویسی که interface مورد نظر تو رو پیاده‌سازی کنه و اون کلاس ناسازگار رو داخل خودش نگه داره (با composition یا inheritance).

**مثال**:  
فرض کن یه interface به اسم `Filter` داری با متد `apply(Image)`.  
از اون طرف، یه کتابخانهٔ شخص ثالث بهت یه `Caramel` filter داده که متدهاش `init()` و `render(Image)` هست.  
کاری که می‌کنی اینه که یه کلاس `CaramelFilter` (adapter) می‌نویسی که `Filter` رو implement می‌کنه و داخل متد `apply()`، یک‌بار `init()` رو صدا می‌زنه و بعد `render()` رو روی تصویر اجرا می‌کنه.

**لینک برای جزئیات بیشتر**:  [Ask AI: Adapter Pattern](https://alisol.ir/?ai=Adapter%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%202|fa)

---

## ؜Decorator Pattern

**خلاصه**:  
**؜Decorator** اجازه می‌ده **رفتار** یا **مسئولیت‌های جدید** رو به objectها **به‌صورت داینامیک** اضافه کنی، بدون این‌که نیاز باشه براشون subclassهای متعدد بسازی.  
یک سری decorator class تعریف می‌کنی که همون interface object اصلی رو پیاده‌سازی می‌کنن و یک reference به object اصلی داخل خودشون نگه می‌دارن (composition).  
بعد هم می‌تونی decoratorها رو هر جور خواستی روی هم stack کنی.

**مثال**:  
فرض کن داده‌ها رو می‌خوای توی cloud ذخیره کنی؛  
بعضی وقت‌ها encryption می‌خوای، بعضی وقت‌ها compression، بعضی وقت‌ها هر دو.  
اگر بخوای با inheritance این رو مدل کنی، کلی subclass عجیب‌غریب در میاد.  
به‌جاش یه `CloudStream` داری و هر وقت خواستی encryption یا compression اضافه کنی، اون رو با `EncryptedStream` و/یا `CompressedStream` **decorat** می‌کنی.  
کلاینت فقط یک reference از نوع `Stream` می‌بینه و متد `write()` رو صدا می‌زنه؛ بقیهٔ کارها شفاف داخل decoratorها انجام می‌شه.

**لینک برای جزئیات بیشتر**:  [Ask AI: Decorator Pattern](https://alisol.ir/?ai=Decorator%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%202|fa)

---

## ؜Facade Pattern

**خلاصه**:  
**؜Facade** یک interface ساده‌شده در اختیار کلاینت می‌گذاره تا با یک **subsystem پیچیده** کار کنه.  
به‌جای این‌که کلاینت با چندین کلاس و مراحل شلوغ سروکله بزنه، همهٔ این پیچیدگی‌ها رو پشت یک کلاس/متد تمیز قایم می‌کنی و در نتیجه **coupling** کاهش پیدا می‌کنه.

**مثال**:  
برای ارسال push notification باید مراحل زیر انجام بشه:  
`connect → authenticate → send → disconnect`  
اگر قرار باشه هر جای برنامه این چهار مرحله رو تکرار کنی، کد شلوغ می‌شه.  
به‌جاش یه کلاس مثل `NotificationService` می‌سازی که متدی مثل `send(message, target)` داره و خودش همهٔ این مراحل رو به ترتیب انجام می‌ده.

**لینک برای جزئیات بیشتر**:  [Ask AI: Facade Pattern](https://alisol.ir/?ai=Facade%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%202|fa)

---

## ؜Flyweight Pattern

**خلاصه**:  
**؜Flyweight** برای کاهش مصرف حافظه (memory) به کار می‌ره؛ با این ایده که **داده‌های مشترک** بین objectهای مشابه رو share کنی.  
داده رو به دو بخش تقسیم می‌کنی:  
- **؜Intrinsic state**: دادهٔ مشترک، تغییرناپذیر (immutable) – مثل icon، texture و …  
- **؜Extrinsic state**: دادهٔ مخصوص context – مثل مختصات (x, y).  

یک factory می‌سازی که **intrinsic**‌ها رو cache و reuse کنه و برای هر instance جدید فقط extrinsic رو جدا نگه داری.

**مثال**:  
فرض کن توی یه بازی می‌خوای هزاران درخت روی map رندر کنی.  
آیکون/texture هر نوع درخت، بین همهٔ درخت‌های هم‌نوع مشترکه؛ پس اون رو فقط یک‌بار به‌صورت flyweight (مثلا `TreeType`) نگه می‌داری و دوباره و دوباره استفاده می‌کنی.  
تنها چیزی که برای هر درخت جداست، مختصات x و y اون درخته.

**لینک برای جزئیات بیشتر**:  [Ask AI: Flyweight Pattern](https://alisol.ir/?ai=Flyweight%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%202|fa)

---

## ؜Bridge Pattern

**خلاصه**:  
**؜Bridge**، **abstraction** رو از **implementation** جدا می‌کنه تا هر دو بتونن مستقل از هم تغییر کنن.  
به‌جای این‌که یه inheritance hierarchy عمیق و شلوغ درست کنی که با اضافه شدن هر feature یا platform جدید منفجر می‌شه، دو تا hierarchy جدا می‌سازی (یکی برای abstraction/featureها و یکی برای implementation) و با یک reference بین‌شون پل می‌زنی (bridge).

**مثال**:  
ریموت کنترل‌ برای تلویزیون‌ها رو در نظر بگیر: ریموت ساده، ریموت پیشرفته و …، برای برندهای مختلف (Sony, Samsung, LG, …).  
بدون **Bridge** مجبور می‌شی کلاس‌هایی مثل `SonyRemote`, `SonyAdvancedRemote`, `SamsungRemote`, … داشته باشی.  
با **Bridge** یه interface یا کلاس `RemoteControl` داری و یه interface `Device` که پیاده‌سازی‌هاش می‌شن `SonyTV`, `SamsungTV` و …  
اضافه کردن یه نوع ریموت جدید، یا یه برند TV جدید، فقط یک کلاس جدید نیاز داره، نه انفجار کلاس‌ها.

**لینک برای جزئیات بیشتر**:  [Ask AI: Bridge Pattern](https://alisol.ir/?ai=Bridge%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%202|fa)

---

## ؜Proxy Pattern

**خلاصه**:  
**؜Proxy** مثل یک واسطه جلوی یک object واقعی می‌ایسته و **کنترل دسترسی** به اون رو بر عهده می‌گیره.  
موارد استفادهٔ رایج:  
- **؜Lazy Loading** (ایجاد object فقط وقتی واقعا لازم شد)  
- **؜Access Control** (بررسی مجوزها)  
- **؜Logging**  
- **؜Caching**  

؜Proxy همون interface object اصلی رو پیاده‌سازی می‌کنه و callها رو به object واقعی forward می‌کنه (که ممکنه on-demand ساخته بشه یا پشت چک‌های مختلف قرار بگیره).

**مثال**:  
فرض کن یه اپ کتاب‌خونی (ebook library) داری و نمی‌خوای موقع بالا آمدن برنامه، همهٔ فایل‌های ebook رو از disk یا network لود کنی.  
یک کلاس `EbookProxy` تعریف می‌کنی که فقط وقتی متد `show()` برای اولین بار صدا زده شد، object سنگین `Ebook` واقعی رو می‌سازه (lazy initialization).  
اینجا می‌تونی قابلیت‌هایی مثل logging یا بررسی انقضای اجاره (rental expiry) رو هم داخل proxy اضافه کنی.

**لینک برای جزئیات بیشتر**:  [Ask AI: Proxy Pattern](https://alisol.ir/?ai=Proxy%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%202|fa)

---

## دوره اصلی

برای دیدن دورهٔ کامل:  
[https://codewithmosh.com/p/design-patterns-part2](https://codewithmosh.com/p/design-patterns-part2)

---

## دربارهٔ نویسندهٔ خلاصه

من **Ali Sol** هستم، Backend Developer. برای آشنایی بیشتر:

- وب‌سایت: [alisol.ir](https://alisol.ir)  
- لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

