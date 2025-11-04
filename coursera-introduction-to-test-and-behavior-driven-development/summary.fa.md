# خلاصه دوره: Introduction to Test and Behavior Driven Development

* **Platform**: Coursera
* **Instructor**: John Rofrano
* **Rating**: 4.8/5 (222 ratings)
* **Release Date**: March 2025
* **Course Link**: [https://www.coursera.org/learn/test-and-behavior-driven-development-tdd-bdd](https://www.coursera.org/learn/test-and-behavior-driven-development-tdd-bdd)

*این سند، نکات کلیدی دوره رو خلاصه می‌کنه. اگه فرصت داری، حتماً کل دوره رو تماشا کن—ارزشش رو داره.*

## قبل از شروع
- من نکات کلیدی دوره‌های مفید رو خلاصه می‌کنم تا بتونی سریع یاد بگیری و مرور کنی.
- فقط روی لینک‌های `Ask AI` کلیک کن تا عمیق‌تر وارد هر موضوعی بشی.

سلام! اگه داری وارد دنیای software testing می‌شی، این دوره واقعاً تحول‌آفرینه. John Rofrano، یه DevOps champ از IBM، توضیح می‌ده که چرا testing فقط یه چک‌لیست نیست—بلکه راز ساخت کدهای محکم و مقاوم در برابر شکست‌هاست. با هم از پایه‌ها شروع می‌کنیم، دست‌به‌کار با TDD و BDD می‌شیم و حتی یه پروژه واقعی رو حل می‌کنیم. این خلاصه مثل یه cheat sheet عمل می‌کنه برای کدنویسی با اعتمادبه‌نفس، بدون اون دیباگینگ‌های بی‌پایان.

## Foundations of Testing: Why It Matters and How It Fits In
تست کردن جذاب نیست، اما ستون فقرات نرم‌افزارهای قابل اعتماد هست. این بخش با دید کلی شروع می‌شه: از جواهرات تاریخی مثل مأموریت‌های Apollo تا pipelineهای مدرن DevOps. می‌بینی که چرا رد کردن testها مثل رانندگی بدون ترمز هست—شاید امروز کار کنه، اما فردا؟ فاجعه. John داستان‌های شکست‌های حماسی (سلام، Equifax breach) رو به اشتراک می‌ذاره و تأکید می‌کنه که automated testing چطور همه چیز رو در CI/CD روان نگه می‌داره. نکته کلیدی: زود test کن، اغلب test کن، و هم روی happy paths (همه چیز عالی پیش می‌ره) و هم sad paths (هرج‌ومرج حاکمه) تمرکز کن.

* **مثال**: مأموریت Apollo 11 و فرود روی ماه رو یادته؟ یه glitch سخت‌افزاری نامحسوس به علاوه یه دستور اضافی از Buzz Aldrin، alarm restart سیستم رو فعال کرد. بدون telemetry real-time (داده‌های "testing" اولیه)، mission control نمی‌تونست مسیر رو تأیید کنه. امروز، این مثل streaming logs برای گرفتن باگ‌های مخفی قبل از اینکه اپت رو نابود کنن، هست.

* **Link for More Details**: [Ask AI: Foundations of Testing](https://alisol.ir/?ai=Foundations%20of%20Testing%7CJohn%20Rofrano%7CIntroduction%20to%20Test%20and%20Behavior%20Driven%20Development)

## Test-Driven Development (TDD): Write Tests First, Code Second
تی‌دی‌دی معادله رو برعکس می‌کنه: اول کد رویایی‌ت رو تصور کن، یه test failing براش بنویس، بعد فقط به اندازه‌ای کد بزن که pass بشه—و با refactoring تکرار کن. همه‌ش در مورد تمرکز لیزری روی کاریه که کد *باید* بکنه، نه فقط هک کردن تا "کار کنه". John چرخه red-green-refactor رو demo می‌کنه و ابزارهای Python مثل PyUnit و Nose رو نشون می‌ده که چطور کیفیت کد رو بالا می‌برن و زندگی dev رو سرعت می‌دن. نکته حرفه‌ای: تا ۹۰٪ defectها رو کم می‌کنه، طبق مطالعات IBM—آینده‌ت ازت تشکر می‌کنه.

* **مثال**: تصور کن داری یه calculator ساده برای مساحت triangle کد می‌زنی. بدون TDD، ممکنه یه one-liner بفرستی که با stringها یا negativeها crash کنه و آروم جواب‌های غلط بده. با TDD، اول testت spectacular fail می‌شه (red)، input checkها رو اضافه می‌کنی (green)، بعد polish می‌کنی (refactor). بوم—دیگه باگ‌های silent در production نداری.

* **Link for More Details**: [Ask AI: Test-Driven Development (TDD)](https://alisol.ir/?ai=Test-Driven%20Development%20(TDD)%7CJohn%20Rofrano%7CIntroduction%20to%20Test%20and%20Behavior%20Driven%20Development)

## Behavior-Driven Development (BDD): Testing from the User's View
اما BDD TDD رو یه پله بالاتر می‌بره و از بیرون به رفتار سیستم نگاه می‌کنه—مثل اینکه shopping cart برای کاربر *چطور حس می‌شه*، نه فقط اینکه API ping می‌کنه یا نه. با Gherkin syntax (Given-When-Then)، سناریوهای plain-English می‌سازی که stakeholderها و devها همه‌ش رو می‌فهمن. John روی Behave برای Python تمرکز می‌کنه، feature files، step implementations و Selenium برای UI automation رو پوشش می‌ده. عالیه برای integration tests، مطمئن می‌شی که *چیز درست* رو می‌سازی، نه چیزی که فقط compile می‌شه.

* **مثال**: برای یه سایت pet shop، یه سناریو BDD می‌تونه باشه: "Given pets in stock | When a customer searches for 'dog' | Then they see Fido but not Kitty the cat." Behave این رو روی UIت اجرا می‌کنه و منتظر "success" message می‌مونه تا تأیید کنه search لود شده—عالی برای گرفتن gremlinهای latency.

* **Link for More Details**: [Ask AI: Behavior-Driven Development (BDD)](https://alisol.ir/?ai=Behavior-Driven%20Development%20(BDD)%7CJohn%20Rofrano%7CIntroduction%20to%20Test%20and%20Behavior%20Driven%20Development)

## Hands-On Project: Building a Product Catalog Microservice
با capstone تمومش کن: یه RESTful API برای backend e-commerce بساز با TDD برای CRUD ops، بعد BDD scenarios برای validate کردن admin UI. با coverage tools خطوط کد untested رو شکار می‌کنی، external services رو mock می‌کنی و fake data رو با factories لود می‌کنی. industry-real هست: از صفر تا microservice deployable، اثبات TDD/BDD در عمل. labsهای John با Nose برای running tests و Behave برای end-to-end checks راهنمایی‌ت می‌کنن—انتظار داشته باش تا آخرش مثل پرو حس کنی.

* **مثال**: با TDD شروع کن برای "list products" endpoint—یه test بنویس که JSON list انتظار داره، bare-bones code رو implement کن تا pass بشه، بعد برای filters refactor کن. به BDD سوئیچ کن: "Given products exist | When an admin views the UI | Then they see editable fields." یه database failure رو mock کن تا error handling رو test کنی، مطمئن شی UI gracefully degrade می‌کنه.

* **Link for More Details**: [Ask AI: Hands-On Project](https://alisol.ir/?ai=Hands-On%20Project%7CJohn%20Rofrano%7CIntroduction%20to%20Test%20and%20Behavior%20Driven%20Development)

خلاصه‌ش اینه—یه مسیر streamlined به mastery testing. این practices فقط تئوری نیستن؛ همون چیزیه که غول‌هایی مثل IBM رو نگه می‌داره تا کدهایی بفرستن که bite back نکنن. دوره کامل رو از Coursera بگیر تا آستینات رو بالا بزنی و labs رو شروع کنی.

---

**درباره خلاصه‌کننده**  

من *Ali Sol* هستم، یه PHP Developer. اگه دوست داری بیشتر آشنا بشیم:  
- Website: [alisol.ir](https://alisol.ir)  
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
