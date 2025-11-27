# خلاصه دوره: Mastering Design Patterns: بخش ۱

- پلتفرم: Code with Mosh  
- مدرس: Mosh Hamedani  
- مدت زمان: ۴:۰۰:۰۰  
- لینک دوره: <https://codewithmosh.com/p/design-patterns-part1>

این نسخه، خلاصه کامل و به‌روز همه الگوهای رفتاری (Behavioral Patterns) همین دوره است.

---

## قبل از شروع

خلاصه‌های سریع از دوره‌های کاربردی، برای یادگیری و مرور سریع.  
برای عمیق‌تر شدن در هر مبحث، روی لینک‌های «Ask AI» کلیک کن.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=005796ea -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-1) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-1) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-1) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-1) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-1) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-1) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-1) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-1) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-1) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-1)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-1) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-1) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=courses/code-with-mosh-mastering-design-patterns-part-1)
<!-- LH-BUTTONS:END -->


---

## مقدمه دوره و این‌که چرا Design Patternها مهم‌اند

؜Design Patternها راه‌حل‌های آماده، تمیز و قابل‌استفاده‌مجدد برای مسائل تکراری در طراحی نرم‌افزار هستند.  
بخشِ اول، ۱۰ تا از ۱۱ الگوی رفتاری کتاب Gang of Four را پوشش می‌دهد (به‌جز الگوی Interpreter). 

مزایا:

- کمک به انتقال ایده‌ها با سرعت بالاتر (مثلاً: «اینجا Strategy Pattern استفاده کن»)
- نوشتن کد تمیزتر و قابل‌نگه‌داری‌تر
- سرعت بالاتر در یادگیری Framework / Libraryها (چون Patternها رو درونشون تشخیص می‌دی)

روش تدریس Mosh: اول یک مسئله واقعی → چند راه‌حل بد → بهبود تدریجی → رسیدن به Design Pattern اصلی.

Ask AI: [Introduction to Design Patterns](https://alisol.ir/?ai=Introduction%20to%20Design%20Patterns%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%201%7Cfa)

---

## مفاهیم پایه OOP (زیرساخت همه Patternها)

مرور خیلی شفاف مفاهیم اصلی OOP (با مثال‌های ساده Java) که تقریباً همه Patternها روی اون‌ها سوار می‌شن:

- کلاس‌ها و Objectها
- ؜Coupling (وابستگی زیاد / کم)
- ؜Interfaceها و اصل «program to an interface»
- ؜Encapsulation (پنهان‌کردن داده و نمایش رفتار)
- ؜Abstraction (پنهان‌کردن جزئیات پیاده‌سازی)
- ؜Inheritance و Polymorphism
- معرفی ساده UML notation

حتی برنامه‌نویس‌های باتجربه هم می‌گن همین ۳۰–۴۰ دقیقه اول، به‌تنهایی می‌ارزه.

Ask AI: [OOP Essentials](https://alisol.ir/?ai=OOP%20Essentials%20and%20Core%20Principles%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%201%7Cfa)

---

## الگوی Memento (Undo/Redo)

**خلاصه:** ذخیره و بازیابی state داخلی یک Object بدون این‌که Encapsulation شکسته بشه.

**سناریوی آموزشی Mosh:** پیاده‌سازی یک Text Editor ساده → ایده‌های ابتدایی برای Undo → مشکلات → راه‌حل نهایی با سه نقش اصلی:

- ؜Originator (‏Editor)
- ؜Memento (‏EditorState – غیرقابل‌تغییر / immutable)
- ؜Caretaker (‏History – به‌صورت stack از stateها)

**مثال:** تایپ می‌کنی A → بعد AB → بعد ABC → با Undo، برمی‌گردی به state قبلی.

؜
Ask AI: [Memento Pattern](https://alisol.ir/?ai=Memento%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%201%7Cfa)

---

## الگوی State (تغییر رفتار شیء با تغییر State داخلی)

**خلاصه:** به یک Object اجازه بده وقتی State داخلی‌اش عوض می‌شه، رفتارش هم عوض بشه؛ طوری که انگار کلاسش عوض شده.

**سناریوی Mosh:** یک Canvas Tool (Brush، Eraser، Selection و …) → اول همه‌چیز با یک switch بزرگ و شلوغ هندل می‌شه → بعد هر State به یک کلاس جدا تبدیل می‌شه → Canvas فقط یک reference به Tool نگه می‌داره و eventهای موس رو به همون می‌سپره.

**نتیجه:** برای اضافه‌کردن یک Tool جدید، لازم نیست کدهای قبلی رو دست بزنی؛ فقط یک کلاس جدید می‌نویسی.

؜
Ask AI: [State Pattern](https://alisol.ir/?ai=State%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%201%7Cfa)

---

## الگوی Iterator (پیمایش امن مجموعه‌ها)

**خلاصه:** راهی برای دسترسی دنباله‌ای (sequential) به عناصر یک Collection، بدون این‌که ساختار داخلی‌اش رو لو بده.

**سناریوی Mosh:** یک ProductCollection سفارشی → اول، آرایه داخلی مستقیم بیرون داده می‌شه (که بده) → بعد تعریف یک Iterator interface → و ساخت ListIterator که می‌دونه چطور روی Collection حرکت کنه.

**مزیت:** حتی اگر ساختار داخلی Collection عوض بشه (مثلاً از array به linked list)، کد Client هنوز با همون Iterator کار می‌کنه.

؜
Ask AI: [Iterator Pattern](https://alisol.ir/?ai=Iterator%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%201%7Cfa)

---

## الگوی Strategy (تعویض الگوریتم در زمان اجرا)

**خلاصه:** یک خانواده از الگوریتم‌ها رو تعریف کن، هرکدوم رو در یک کلاس جدا encapsulate کن و اجازه بده در زمان اجرا (runtime) بین اون‌ها سوییچ بشه.

**سناریوی Mosh:** یک Image Compressor → اول الگوریتم فشرده‌سازی داخلش hard-code شده → بعد الگوریتم‌های مختلف (‏JpegCompressor، PngCompressor) → تعریف یک Compressor interface → کلاس ImageStorage هر Compressor (و Filter) رو به‌صورت dependency در زمان اجرا دریافت می‌کنه.

**نتیجه:** برای اضافه‌کردن الگوریتم فشرده‌سازی یا Filter جدید، لازم نیست کد ImageStorage رو تغییر بدی؛ فقط کلاس جدید رو پیاده‌سازی می‌کنی.

؜
Ask AI: [Strategy Pattern](https://alisol.ir/?ai=Strategy%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%201%7Cfa)

---

## الگوی Template Method (اسکلت الگوریتم)

**خلاصه:** اسکلت کلی یک الگوریتم رو در کلاس پایه تعریف کن، اما اجازه بده Subclassها مراحل خاص رو override کنن.

**سناریوی Mosh:** یک Data Processing Pipeline → چند مرحله مشترک مثل (load → process → save) → هر نوع داده فقط مراحلی رو override می‌کنه که با بقیه فرق داره.

این Pattern در Frameworkها خیلی استفاده می‌شه (مثلاً ASP.NET Page Lifecycle، یا Startup در Spring Boot).

؜
Ask AI: [Template Method Pattern](https://alisol.ir/?ai=Template%20Method%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%201%7Cfa)

---

## الگوی Command (درخواست‌ها به‌عنوان Object)

**خلاصه:** یک Request رو داخل یک Object کپسوله کن تا بتونی اون رو پارامتر بدهی، صف کنی، لاگ بگیری و Undo/Redo رو راحت پیاده‌سازی کنی.

**سناریوی Mosh:** یک Video Editor با قابلیت Bold / Contrast / Undo → اول همه‌چیز قاطی و درهم → بعد هر Action تبدیل می‌شه به یک Command object → History به‌صورت stack نگه‌داری می‌شه → یک UndoCommand مخصوص برای برگشت.

**نتیجه:** Undo / Redo تقریباً مجانی به‌دست میاد و اضافه‌کردن Action جدید خیلی ساده می‌شه.

؜
Ask AI: [Command Pattern](https://alisol.ir/?ai=Command%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%201%7Cfa)

---

## الگوی Observer (Publish–Subscribe)

**خلاصه:** یک رابطه یک‌به‌چند تعریف کن: هر وقت State یک Object عوض شد، تمام وابسته‌هاش (Observers) خودکار خبر می‌شن.

**سناریوی Mosh:** مثال قیمت سهام → یک DataSource (به‌عنوان Subject) → چند تا Spreadsheet / Chart (به‌عنوان Observer) → پیاده‌سازی به دو مدل push یا pull.

کاربرد همه‌جا: eventها، listenerها، reactive programming و …

؜
Ask AI: [Observer Pattern](https://alisol.ir/?ai=Observer%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%201%7Cfa)

---

## الگوی Mediator (متمرکزکردن ارتباط‌ها)

**خلاصه:** به‌جای این‌که Objectها مستقیم با هم حرف بزنن، همه از طریق یک Mediator صحبت می‌کنن → Coupling بین اون‌ها خیلی کم می‌شه.

**سناریوی Mosh:** یک Dialog Box با ListBox → TextBox → Button → اول همه Controlها مستقیماً همدیگه رو صدا می‌زنن → بعد یک DialogBox (Mediator) ایجاد می‌شه که مالک همه کنترل‌هاست و با الگوی Observer-style eventها رو هندل می‌کنه.

**نتیجه:** هر Control مستقل‌تر و قابل‌استفاده‌مجددتر می‌شه و منطق هماهنگی، وسط (داخل Mediator) متمرکز می‌مونه.

؜
Ask AI: [Mediator Pattern](https://alisol.ir/?ai=Mediator%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%201%7Cfa)

---

## الگوی Chain of Responsibility (زنجیره پردازش)

**خلاصه:** یک Request رو در طول یک زنجیره از Handlerها عبور بده؛ هر Handler تصمیم می‌گیره خودش پردازش کنه یا بده بعدی.

**سناریوی Mosh:** یک Web Server → Handlerهای پشت‌سرهم مثل Authenticator → Logger → Compressor → هر Handler از یک کلاس پایه Handler ارث می‌بره و یک reference به Handler بعدی داره.

**نتیجه:** یک Pipeline باز و قابل‌توسعه (Open/Closed): به‌راحتی می‌تونی ترتیب مراحل رو عوض کنی، مرحله جدید اضافه کنی یا مرحله‌ای رو حذف کنی.

؜
Ask AI: [Chain of Responsibility Pattern](https://alisol.ir/?ai=Chain%20of%20Responsibility%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%201%7Cfa)

---

## الگوی Visitor (اضافه‌کردن رفتار بدون دست‌زدن به کلاس‌ها)

**خلاصه:** الگوریتم‌ها رو از ساختار Objectها جدا کن تا بتونی بدون تغییر کلاس‌های موجود، رفتارهای جدید بهشون اضافه کنی.

**سناریوی Mosh:** یک سند HTML با Nodeهای مختلف → عملیات highlight → تولید plain text و … → هر عملیات به‌صورت یک کلاس جدا تعریف می‌شه → Nodeها یک متد accept دارن که یک Visitor (Operation) رو می‌پذیره.

**نتیجه:** برای اضافه‌کردن یک رفتار جدید (مثل استخراج لینک‌ها، فیلتر صوتی و …) فقط یک Visitor جدید می‌نویسی؛ لازم نیست کلاس Nodeهای اصلی رو تغییر بدی.

؜
Ask AI: [Visitor Pattern](https://alisol.ir/?ai=Visitor%20Pattern%7CMosh%20Hamedani%7CMastering%20Design%20Patterns%3A%20Part%201%7Cfa)

---

لینک دوره اصلی:  
<https://codewithmosh.com/p/design-patterns-part1>

---

## درباره خلاصه‌کننده

من Ali Sol هستم؛ Backend Developer.  
وب‌سایت: <https://alisol.ir>  
لینکدین: <https://www.linkedin.com/in/alisolphp>
