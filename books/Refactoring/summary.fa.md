# خلاصه کتاب: Refactoring: Improving the Design of Existing Code (نسخه دوم)

* **نویسنده**: Martin Fowler (با مشارکت Kent Beck)
* **ژانر**: مهندسی نرم‌افزار
* **تاریخ انتشار**: ۲۰۱۹

این سند خلاصه‌ی مهم‌ترین درس‌ها و نکته‌های استخراج‌شده از کتاب را ارائه می‌کند.  
به‌شدت پیشنهاد می‌کنم برای درک عمیق‌تر، متن کامل کتاب را هم بخوانی.

## قبل از این‌که شروع کنی

* من نکته‌های کلیدی کتاب‌های مفید را خلاصه می‌کنم تا بشود سریع یاد گرفت و مرور کرد.
* بعد از هر بخش روی لینک‌های `Ask AI` کلیک کن تا بتوانی عمیق‌تر وارد موضوع شوی.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## فصل ۱ – Refactoring: یک مثال اولیه

**خلاصه**: Fowler به‌جای این‌که با اصول انتزاعی شروع کند، مستقیم می‌رود سراغ یک مثال قدم‌به‌قدم از refactor کردن یک برنامه‌ی واقعی JavaScript که فاکتور (invoice) مشتری‌ها را برای یک گروه تئاتر تولید می‌کند. کد اولیه یک تابع طولانی است که منطق محاسبه، فرمت‌دهی و ساختن string را قاطی هم کرده. با ده‌ها قدم خیلی کوچک و امن ــ و هر قدم همراه با اجرای تست‌ها ــ این کد را تبدیل می‌کند به مجموعه‌ای از توابع کوچک و متمرکز، بدون این‌که رفتار بیرونی برنامه عوض شود. پیام اصلی فصل این است که refactoring یک تکنیک منظم برای بهتر کردن ساختار داخلی کدِ در حال کار است، طوری که اضافه کردن فیچرهای جدید بعداً خیلی ساده‌تر و امن‌تر شود.

**مثال**: تابع `statement(invoice, plays)` در ابتدا حدود ۶۰ خط است با یک `switch`, متغیرهای موقت و کلی string concatenation. در انتها تبدیل می‌شود به یک تابع سطح‌بالا و کوتاه که فقط ارکستراسیون می‌کند و کار اصلی را به helperهای کوچک مثل `amountFor`، `volumeCreditsFor`، توابع تجمیعی مثل `totalVolumeCredits()` و `totalAmount()` و یک formatter تمیز به نام `usd()` می‌سپارد. کل مراحل با diffهای کامل کد نشان داده شده.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Chapter 1 refactoring example](https://alisol.ir/?ai=Chapter%201%20Refactoring%20A%20First%20Example%7CMartin%20Fowler%7CRefactoring%3A%20Improving%20the%20Design%20of%20Existing%20Code%20%282nd%20Edition%29|fa)

## قانون مطلق: اول تست، همیشه تست

**خلاصه**: قبل از این‌که حتی یک خط کد را برای refactoring دست بزنی، باید یک suite تست خودکار مطمئن داشته باشی. این تست‌ها تورِ ایمنی تو هستند ــ بعد از تک‌تک تغییرهای کوچک تست‌ها را اجرا می‌کنی. Fowler روی تست‌های self-checking (سبز/قرمز) و commit بعد از هر قدم موفق تأکید می‌کند. بدون این دیسیپلین، refactoring خیلی سریع تبدیل می‌شود به حدس‌زدن خطرناک روی کد.

**مثال**: برای تابع statement تست‌هایی می‌نویسد که invoiceها و داده‌های plays.json مشخصی را به تابع می‌دهند و سپس روی خروجی string نهایی assert می‌گیرند. تست‌ها در چند ثانیه اجرا می‌شوند و مدام تکرار می‌شوند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Testing strategy in refactoring](https://alisol.ir/?ai=Testing%20strategy%20in%20refactoring%7CMartin%20Fowler%7CRefactoring%3A%20Improving%20the%20Design%20of%20Existing%20Code%20%282nd%20Edition%29|fa)

## ؜Refactoringهای هسته‌ای استفاده‌شده در مثال بزرگ

**خلاصه**: این فصل در عمل، دموی زنده‌ی رایج‌ترین refactoringهای روزمره است: Extract Function (بارها و بارها)، Replace Temp with Query، Split Loop، Slide Statements، Inline Variable و renameهای حساب‌شده. هرکدام در قدم‌های بسیار کوچک با تست فوری انجام می‌شود. نتیجه تقریباً جادویی به‌نظر می‌رسد ــ همان رفتار قبلی، اما کدی که ناگهان خواناتر و قابل‌گسترش‌تر شده.

**مثال**: یک متغیر موقت به نام `thisAmount` تبدیل می‌شود به یک تابع مستقل `amountFor` → متغیر play با یک query به نام `playFor()` جایگزین می‌شود → محاسبه‌ی volume credits جدا می‌شود → متغیر format تبدیل می‌شود به تابع `usd()` → و در نهایت loopهای جداگانه برای total amount و total credits به‌عنوان query functionهای مستقل استخراج می‌شوند.

[نکته‌ی شخصی: همین refactoringها هنوز هم نان و نمک روزانه‌ی من در ۲۰۲۵ هستند. IDEهای مدرن (مثل WebStorm و VS Code+ESLint) بیشترشان را با یک shortcut انجام می‌دهند، ولی خودِ اصول هنوز کاملاً تازه‌اند.]

**لینک برای جزئیات بیشتر**:  
[Ask AI: Core refactorings from Chapter 1](https://alisol.ir/?ai=Core%20refactorings%20from%20Chapter%201%7CMartin%20Fowler%7CRefactoring%3A%20Improving%20the%20Design%20of%20Existing%20Code%20%282nd%20Edition%29|fa)

## وقتی inheritance خراب می‌کند – Replace Subclass with Delegate

**خلاصه**: Subclassing راحت است، اما می‌تواند گیرت بیندازد (single inheritance، coupling زیاد، رابطه‌های گیج‌کننده‌ی "is-a"). کتاب چند سناریو نشان می‌دهد که در آن‌ها جایگزین کردن subclassها با یک شیء delegate (یعنی composition) تمیزتر و منعطف‌تر است ــ مخصوصاً وقتی باید رفتار را در runtime عوض کنی یا چند محور تغییر مختلف را با هم ترکیب کنی.

**مثال**:  
- کلاس Booking و subclass آن یعنی PremiumBooking با یک `PremiumBookingDelegate` جایگزین می‌شود که extraها را نگه می‌دارد و به‌صورت اختیاری روی یک Booking معمولی attach می‌شود.  
- ؜hierarchy مربوط به گونه‌های Bird با یک `SpeciesDelegate` (با یک inheritance tree کوچک خودش) جایگزین می‌شود تا کلاس Bird برای variationهای دیگر (مثل wild vs captive و غیره) آزاد بماند.  
- ؜Scroll که اشتباهی از CatalogItem ارث‌بری کرده بود (confusion بین type و instance) → به delegation + یک reference مشترک به catalog تغییر می‌کند.

[نکته‌ی شخصی: در ۲۰۲۵ حتی سریع‌تر از قبل سراغ delegation می‌روم ــ برای upgradeهای داینامیک Premium، رفتارهای شبیه mixin با objectها و جلوگیری از hierarchyهای عمیق.]

**لینک برای جزئیات بیشتر**:  
[Ask AI: Replace Subclass with Delegate](https://alisol.ir/?ai=Replace%20Subclass%20with%20Delegate%7CMartin%20Fowler%7CRefactoring%3A%20Improving%20the%20Design%20of%20Existing%20Code%20%282nd%20Edition%29|fa)

## ؜Extract Superclass و Collapse Hierarchy

**خلاصه**: وقتی دو کلاس فیلدها و رفتار قابل‌توجهی را با هم مشترک دارند، می‌توانی بخش‌های مشترک را در یک superclass جدید جمع کنی (Extract Superclass). اگر بعداً بفهمی این hierarchy دیگر ارزش نگه‌داشتن ندارد، می‌توانی دوباره آن‌ها را ادغام کنی (Collapse Hierarchy).

**مثال**: Employee و Department هر دو `name` و `annualCost` دارند → این دو به یک superclass مشترک به نام `Party` منتقل می‌شوند. کد شفاف‌تر می‌شود و duplication از بین می‌رود.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Extract Superclass and Collapse Hierarchy](https://alisol.ir/?ai=Extract%20Superclass%20and%20Collapse%20Hierarchy%7CMartin%20Fowler%7CRefactoring%3A%20Improving%20the%20Design%20of%20Existing%20Code%20%282nd%20Edition%29|fa)

## ؜Replace Superclass with Delegate

**خلاصه**: بعضی وقت‌ها رابطه‌ی ارث‌بری اصلاً از نظر معنایی درست نیست (مثلاً یک Scroll فیزیکی، CatalogItem نیست؛ فقط یکی را در خود نگه می‌دارد). با جایگزین کردن superclass با یک شیء delegate درون‌ساخت، رابطه‌ی اشتباه "is-a" حذف می‌شود و سردرگمی از بین می‌رود.

**مثال**: Scroll در ابتدا از CatalogItem ارث‌بری می‌کرد → بعد تغییر می‌کند به حالتی که فقط یک reference به یک CatalogItem مشترک نگه می‌دارد؛ این کار confusion بین type و instance را رفع می‌کند و اجازه می‌دهد چند Scroll مختلف همان داده‌ی catalog را به‌صورت امن به اشتراک بگذارند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Replace Superclass with Delegate](https://alisol.ir/?ai=Replace%20Superclass%20with%20Delegate%7CMartin%20Fowler%7CRefactoring%3A%20Improving%20the%20Design%20of%20Existing%20Code%20%282nd%20Edition%29|fa)

---

**درباره‌ی خلاصه‌کننده**

من *Ali Sol* هستم، یک Backend Developer. برای آشنایی بیشتر:  
* وب‌سایت: [alisol.ir](https://alisol.ir)  
* لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

