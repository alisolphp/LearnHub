# خلاصهٔ دوره: OpenAPI Specification & Swagger Tools - Zero To Master

* **پلتفرم**: Udemy
* **مدرس**: Eazybytes
* **امتیاز**: 4.7/5
* **تاریخ آخرین به‌روزرسانی**: نوامبر 2025
* **لینک دوره**: [https://www.udemy.com/course/openapi-specification-swagger-tools-zero-to-master/](https://www.udemy.com/course/openapi-specification-swagger-tools-zero-to-master/)

*این سند، نکات مهم دوره را خلاصه می‌کند تا بتوانی سریع یاد بگیری و مرور کنی. اگر فرصت داشتی، حتماً دیدن کامل خود دوره را پیشنهاد می‌کنم.*

## قبل از شروع

- من نکات مهم دوره‌ها و منابع مفید را خلاصه می‌کنم تا هم برای یادگیری اولیه و هم برای مرور سریع، کاربردی باشند.
- کافی است روی لینک‌های `Ask AI` کلیک کنی تا روی هر مبحث، عمیق‌تر گفت‌وگو و تمرین کنی.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=005796ea -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=courses/udemy-openapi-specification-swagger-tools-zero-to-master) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=courses/udemy-openapi-specification-swagger-tools-zero-to-master) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=courses/udemy-openapi-specification-swagger-tools-zero-to-master) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=courses/udemy-openapi-specification-swagger-tools-zero-to-master) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=courses/udemy-openapi-specification-swagger-tools-zero-to-master) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=courses/udemy-openapi-specification-swagger-tools-zero-to-master) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=courses/udemy-openapi-specification-swagger-tools-zero-to-master) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=courses/udemy-openapi-specification-swagger-tools-zero-to-master) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=courses/udemy-openapi-specification-swagger-tools-zero-to-master) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=courses/udemy-openapi-specification-swagger-tools-zero-to-master)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=courses/udemy-openapi-specification-swagger-tools-zero-to-master) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=courses/udemy-openapi-specification-swagger-tools-zero-to-master) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=courses/udemy-openapi-specification-swagger-tools-zero-to-master)
<!-- LH-BUTTONS:END -->

## موضوع ۱: معرفی OpenAPI

* **خلاصه**: در این بخش با این مفهوم آشنا می‌شوی که OpenAPI یک استاندارد برای توصیف API ها (به‌خصوص RESTful API) است. مشکل‌هایی مثل نبود داکیومنت شفاف، سوء‌تفاهم بین Backend و Frontend و مصرف‌کننده‌های API را حل می‌کند. با داشتن یک فایل YAML یا JSON استاندارد، دقیقاً مشخص می‌شود هر Endpoint چه Request/Response و چه ساختار Security ای دارد.
* **مثال**: فرض کن یک API برای فروشگاه اینترنتی ساخته‌ای و فرانت‌اند یا مصرف‌کنندگان API باید بدانند برای گرفتن لیست دسته‌بندی محصولات چه فیلدهایی لازم است. با OpenAPI، همهٔ این جزئیات در یک فایل مشخص می‌شود و نیاز به ایمیل و سؤال و جواب مکرر کم می‌شود.
* **لینک برای جزئیات بیشتر**: [Ask AI: Introduction to OpenAPI](https://alisol.ir/?ai=Introduction%20to%20OpenAPI%7CEazybytes%7COpenAPI%20Specification%20%26%20Swagger%20Tools%20-%20Zero%20To%20Master|fa)

## موضوع ۲: تاریخچهٔ OpenAPI و Swagger

* **خلاصه**: این قسمت به حدود سال ۲۰۱۰ برمی‌گردد؛ زمانی که یک جامعهٔ کوچک شروع به تعریف Specification برای RESTful API ها کرد. بعد Swagger مطرح شد و ابزارهای مختلفی ارائه داد. در سال ۲۰۱5 شرکت SmartBear، Swagger را خرید و Specification را به Linux Foundation اهدا کرد که نتیجه‌اش OpenAPI بود، در حالی که نام Swagger بیشتر روی ابزارها باقی ماند.
* **مثال**: در گذشته Swagger هم به Specification اشاره می‌کرد و هم به ابزارها. بعد از ۲۰۱۵، OpenAPI نام Specification استاندارد شد و Swagger بیشتر به ابزارهایی مثل Swagger Editor و Swagger UI گفته می‌شود؛ شبیه این‌که نقشهٔ ساختمان (OpenAPI) را از ابزارهای ساخت و نمایش (Swagger) جدا کنیم.
* **لینک برای جزئیات بیشتر**: [Ask AI: History of OpenAPI and Swagger](https://alisol.ir/?ai=History%20of%20OpenAPI%20and%20Swagger%7CEazybytes%7COpenAPI%20Specification%20%26%20Swagger%20Tools%20-%20Zero%20To%20Master|fa)

## موضوع ۳: ابزارهای Swagger

* **خلاصه**: در این بخش با مجموعه ابزارهای Swagger آشنا می‌شوی؛ از ابزارهای متن‌باز مثل Swagger Editor برای نوشتن Specification، Swagger UI برای نمایش و تست، تا ابزارهایی مثل SwaggerHub برای همکاری تیمی. این ابزارها نوشتن، تست‌کردن و به‌اشتراک‌گذاری API ها را راحت‌تر می‌کنند.
* **مثال**: می‌توانی در Swagger Editor یک فایل YAML برای Product API بنویسی و سپس همان فایل را در Swagger UI بارگذاری کنی تا یک صفحهٔ تعاملی داشته باشی که بتوانی Endpoint هایی مثل `GET /products` را مستقیم تست کنی.
* **لینک برای جزئیات بیشتر**: [Ask AI: Swagger Tools](https://alisol.ir/?ai=Swagger%20Tools%7CEazybytes%7COpenAPI%20Specification%20%26%20Swagger%20Tools%20-%20Zero%20To%20Master|fa)

## موضوع ۴: شروع کار با OpenAPI

* **خلاصه**: این بخش، رویکردهای مختلف برای استفاده از OpenAPI را توضیح می‌دهد: رویکرد Code-first (اول کد، بعد داکیومنت) و Design-first (اول طراحی و Specification، بعد پیاده‌سازی). همین‌طور مزیت‌هایی مثل Machine-readable بودن داکیومنت‌ها، امکان تولید خودکار کد و هماهنگی بهتر تیم‌ها را مرور می‌کند.
* **مثال**: در رویکرد Design-first، قبل از نوشتن حتی یک خط کد Backend، یک Specification برای Order API طراحی می‌کنی تا تمام تیم (Backend / Frontend / QA / Product) از ابتدا روی Request/Response و ساختار خطاها به یک توافق مشترک برسند.
* **لینک برای جزئیات بیشتر**: [Ask AI: Getting Started with OpenAPI](https://alisol.ir/?ai=Getting%20Started%20with%20OpenAPI%7CEazybytes%7COpenAPI%20Specification%20%26%20Swagger%20Tools%20-%20Zero%20To%20Master|fa)

## موضوع ۵: نوشتن اسناد YAML معتبر برای OpenAPI

* **خلاصه**: تمرکز این بخش روی Syntax و ساختار صحیح یک سند OpenAPI در قالب YAML است. قسمت‌های اصلی مانند `paths`، عملیات‌ها (GET, POST, ...)، پارامترها، بدنهٔ درخواست و Response ها بررسی می‌شود. مثال اصلی معمولاً روی یک برنامهٔ فروشگاه اینترنتی است.
* **مثال**: مثلاً برای Endpoint مربوط به `/categories`، متد GET را تعریف می‌کنی، پارامترهایی مثل `categoryId` را به‌عنوان Query Parameter اضافه می‌کنی و Response هایی با مثال‌هایی مثل لیست «موبایل» و «لپ‌تاپ» تنظیم می‌کنی.
* **لینک برای جزئیات بیشتر**: [Ask AI: Writing Valid OpenAPI YAML Documents](https://alisol.ir/?ai=Writing%20Valid%20OpenAPI%20YAML%20Documents%7CEazybytes%7COpenAPI%20Specification%20%26%20Swagger%20Tools%20-%20Zero%20To%20Master|fa)

## موضوع ۶: محتوای قابل‌استفادهٔ مجدد با Components

* **خلاصه**: این قسمت روی شیء `components` تمرکز دارد که کمک می‌کند Schema ها، پارامترها، Response ها و ... را به‌صورت Reusable تعریف کنی تا داکیومنت DRY (Don’t Repeat Yourself) بماند و نگه‌داری‌اش راحت‌تر شود.
* **مثال**: یک Schema به نام `Product` در بخش `components.schemas` تعریف می‌کنی و سپس در چند Endpoint مثل `GET /products` و `POST /orders` به همان Schema ارجاع می‌دهی؛ بنابراین فیلدهایی مثل `id`، `name` و `price` فقط یک‌بار تعریف می‌شوند.
* **لینک برای جزئیات بیشتر**: [Ask AI: Reusable Content with Components](https://alisol.ir/?ai=Reusable%20Content%20with%20Components%7CEazybytes%7COpenAPI%20Specification%20%26%20Swagger%20Tools%20-%20Zero%20To%20Master|fa)

## موضوع ۷: انواع داده (Data Types) در OpenAPI

* **خلاصه**: در این بخش انواع دادهٔ پشتیبانی‌شده مثل `string`، `integer`، `number`، `array` و `object` معرفی می‌شود. همین‌طور `format` ها، enum ها و محدودیت‌هایی مثل `minimum` و `maximum` و `maxLength` و ... توضیح داده می‌شود.
* **مثال**: برای فیلد `price` می‌توانی نوع `number` با `format: float` و `minimum: 0` تعریف کنی تا قیمت محصول همیشه مقدار معتبر داشته باشد و منفی ارسال نشود.
* **لینک برای جزئیات بیشتر**: [Ask AI: Data Types in OpenAPI](https://alisol.ir/?ai=Data%20Types%20in%20OpenAPI%7CEazybytes%7COpenAPI%20Specification%20%26%20Swagger%20Tools%20-%20Zero%20To%20Master|fa)

## موضوع ۸: وراثت و Polymorphism در OpenAPI

* **خلاصه**: برای مدل‌کردن Schema های پیچیده، می‌توانی از کلیدواژه‌هایی مثل `allOf`، `anyOf`، `oneOf` و `not` استفاده کنی تا وراثت (Inheritance) و چندریختی (Polymorphism) را پیاده‌سازی کنی.
* **مثال**: یک Schema پایه به نام `Product` می‌سازی و سپس با استفاده از `allOf`، آن را برای انواع مختلف مثل `Mobile` (با فیلد اضافهٔ `batterySize`) و `Laptop` (با فیلد اضافهٔ `ram`) گسترش می‌دهی. به این ترتیب می‌توانی در Response ها از مدل‌های چندریختی استفاده کنی.
* **لینک برای جزئیات بیشتر**: [Ask AI: Inheritance and Polymorphism in OpenAPI](https://alisol.ir/?ai=Inheritance%20and%20Polymorphism%20in%20OpenAPI%7CEazybytes%7COpenAPI%20Specification%20%26%20Swagger%20Tools%20-%20Zero%20To%20Master|fa)

## موضوع ۹: امنیت API در OpenAPI

* **خلاصه**: این بخش نحوهٔ تعریف `securitySchemes` برای روش‌های مختلف احراز هویت را توضیح می‌دهد؛ مثل Basic Auth، API Key و OAuth. می‌توانی این Security ها را به‌صورت Global روی کل API یا فقط روی بعضی عملیات‌ها اعمال کنی.
* **مثال**: یک Security Scheme از نوع Basic Auth در بخش `components.securitySchemes` تعریف می‌کنی و سپس Endpoint مربوط به `/orders` را طوری تنظیم می‌کنی که فقط با Basic Auth قابل دسترسی باشد تا اطلاعات حساس سفارش‌ها محافظت شود.
* **لینک برای جزئیات بیشتر**: [Ask AI: API Security in OpenAPI](https://alisol.ir/?ai=API%20Security%20in%20OpenAPI%7CEazybytes%7COpenAPI%20Specification%20%26%20Swagger%20Tools%20-%20Zero%20To%20Master|fa)

## موضوع ۱۰: Mock کردن API ها با OpenAPI

* **خلاصه**: با استفاده از ابزارهایی مثل Prism می‌توانی روی همان Specification، یک Mock Server بسازی تا تیم‌های مختلف بدون منتظر ماندن برای پیاده‌سازی واقعی Backend، به‌صورت موازی توسعه و تست را شروع کنند.
* **مثال**: فایل YAML مربوط به فروشگاه را به Prism می‌دهی و یک Mock Server برای Endpoint `GET /categories` راه می‌اندازی تا مثلاً همیشه آرایه‌ای مثل `["mobiles", "laptops"]` را برگرداند. فرانت‌اند می‌تواند روی این داده‌های مثال، آزادانه توسعه بدهد.
* **لینک برای جزئیات بیشتر**: [Ask AI: Mocking APIs with OpenAPI](https://alisol.ir/?ai=Mocking%20APIs%20with%20OpenAPI%7CEazybytes%7COpenAPI%20Specification%20%26%20Swagger%20Tools%20-%20Zero%20To%20Master|fa)

## موضوع ۱۱: تولید کد از روی OpenAPI

* **خلاصه**: این بخش روی تولید خودکار Server Stub و Client Code برای زبان‌هایی مثل Java و Node.js با استفاده از Swagger Codegen (و ابزارهای مشابه) تمرکز دارد. اعتبارسنجی‌ها و ساختار Endpoint ها از روی Specification تولید می‌شوند.
* **مثال**: از روی Specification فروشگاه، یک پروژهٔ Node.js تولید می‌کنی که Controllerهایی مثل `/products` را به‌صورت آماده دارد. بعد فقط Business Logic را اضافه می‌کنی تا داده‌های واقعی را از دیتابیس بخواند.
* **لینک برای جزئیات بیشتر**: [Ask AI: Generating Code from OpenAPI](https://alisol.ir/?ai=Generating%20Code%20from%20OpenAPI%7CEazybytes%7COpenAPI%20Specification%20%26%20Swagger%20Tools%20-%20Zero%20To%20Master|fa)

## موضوع ۱۲: استقرار و میزبانی (Deploy & Hosting) Specification های OpenAPI

* **خلاصه**: در این قسمت یاد می‌گیری چطور Specification خودت را همراه Swagger UI روی سرویس‌هایی مثل GitHub Pages یا سایر پلتفرم‌ها میزبانی کنی تا دیگران به‌راحتی آن را ببینند و Endpoint ها را بررسی و تست کنند.
* **مثال**: فایل YAML و یک `index.html` که Swagger UI را لود می‌کند در GitHub قرار می‌دهی و با GitHub Pages آن را منتشر می‌کنی؛ حالا در آدرسی مثل `username.github.io` یک صفحهٔ تعاملی برای Documentation و تست API داری.
* **لینک برای جزئیات بیشتر**: [Ask AI: Deploying and Hosting OpenAPI Specifications](https://alisol.ir/?ai=Deploying%20and%20Hosting%20OpenAPI%20Specifications%7CEazybytes%7COpenAPI%20Specification%20%26%20Swagger%20Tools%20-%20Zero%20To%20Master|fa)

---

**دربارهٔ نویسندهٔ خلاصه**

من *Ali Sol* هستم؛ Backend Developer.
- **وب‌سایت**: [alisol.ir](https://alisol.ir)
- **لینکدین**: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

