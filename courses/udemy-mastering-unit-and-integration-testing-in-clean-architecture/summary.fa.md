# خلاصه دوره: Mastering Unit and Integration Testing in Clean Architecture

* **پلتفرم**: Udemy  
* **مدرس**: Junior Matlou  
* **امتیاز**: ‎4.7/5‎  
* **تاریخ انتشار**: ‎2023‎  
* **مدت زمان**: ‎9 ساعت و 2 دقیقه‎  
* **لینک دوره**: [Udemy](https://www.udemy.com/course/mastering-unit-and-integration-testing-in-clean-architecture/)

_این سند، نکات مهم دوره رو خلاصه می‌کنه. اگه فرصت داری، دیدن خود دوره به‌صورت کامل خیلی کمک‌کننده‌ست._

## ۱. قبل از این‌که شروع کنی

- من معمولاً نکات کلیدی دوره‌های مفید رو خلاصه می‌کنم تا هم برای خودم مرور سریع باشه، هم برای بقیه.  
- فقط کافیه روی لینک‌های `Ask AI` کلیک کنی تا روی همون مبحث عمیق‌تر کار کنی.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=31acc7b2 -->

### AI-Powered buttons

Start teaching this to a:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=fa&src=courses/udemy-mastering-unit-and-integration-testing-in-clean-architecture) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=courses/udemy-mastering-unit-and-integration-testing-in-clean-architecture) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=courses/udemy-mastering-unit-and-integration-testing-in-clean-architecture) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=courses/udemy-mastering-unit-and-integration-testing-in-clean-architecture) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=courses/udemy-mastering-unit-and-integration-testing-in-clean-architecture) | 
[Story](https://alisol.ir/?ai=learnhub_summary_story&lang=fa&src=courses/udemy-mastering-unit-and-integration-testing-in-clean-architecture) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=courses/udemy-mastering-unit-and-integration-testing-in-clean-architecture) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=courses/udemy-mastering-unit-and-integration-testing-in-clean-architecture) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=courses/udemy-mastering-unit-and-integration-testing-in-clean-architecture) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=courses/udemy-mastering-unit-and-integration-testing-in-clean-architecture) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=courses/udemy-mastering-unit-and-integration-testing-in-clean-architecture) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=courses/udemy-mastering-unit-and-integration-testing-in-clean-architecture)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=courses/udemy-mastering-unit-and-integration-testing-in-clean-architecture) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=courses/udemy-mastering-unit-and-integration-testing-in-clean-architecture) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=courses/udemy-mastering-unit-and-integration-testing-in-clean-architecture)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=fa&src=courses/udemy-mastering-unit-and-integration-testing-in-clean-architecture)
<!-- LH-BUTTONS:END -->

## ۲. مقدمه دوره – چی یاد می‌گیری و چه ابزارهایی استفاده می‌شن

**خلاصه**: تو این دوره یه پروژه e-commerce نمونه با Clean Architecture می‌سازیم (ABC Store) که دو تا entity داره: ‎Category‎ و ‎Product‎. روی این پروژه، ‎CQRS‎ رو با MediatR پیاده می‌کنیم و در مجموع **۵۵ تست واقعی** می‌نویسیم (‎23 Unit Test‎ + ‎32 Integration Test‎) که همشون کاملاً مستقل از هم pass می‌شن. ابزارهایی که استفاده می‌شه: ‎xUnit‎، ‎FluentAssertions‎، ‎Moq‎، ‎AutoMapper‎، ‎Entity Framework Core‎ و ‎WebApplicationFactory‎ برای Integration Test ها.

**مثال**: در انتهای دوره، Test Runner رو اجرا می‌کنی و همه‌ی ۵۵ تا تست با موفقیت سبز می‌شن؛ یعنی تست‌ها مستقل، قابل اطمینان و پایدار نوشته شدن.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Unit and Integration Testing Overview in Clean Architecture](https://alisol.ir/?ai=Unit%20and%20Integration%20Testing%20Overview%20in%20Clean%20Architecture%7CJunior%20Matlou%7CMastering%20Unit%20and%20Integration%20Testing%20in%20Clean%20Architecture|fa)

## ۳. راه‌اندازی Solution با ساختار Clean Architecture (لایه‌ها و وابستگی‌ها)

**خلاصه**: یک ‎Solution‎ خالی به اسم ‎ABCStore‎ می‌سازیم و پنج تا پروژه بهش اضافه می‌کنیم:  
- ؜Domain‎  
- ؜Application‎  
- ؜Infrastructure‎  
- ؜WebAPI‎  
- و یک لایه ‎Common‎ برای مدل‌های مشترک (Request/Response)

وابستگی‌ها بر اساس مدل Onion تنظیم می‌شن:  
- ؜Domain‎ به هیچ پروژه‌ای وابسته نیست.  
- ؜Application‎ فقط به ‎Domain‎ و ‎Common‎ وابسته است.  
- ؜Infrastructure‎ به ‎Application‎ وابسته است.  
- ؜WebAPI‎ فقط به ‎Infrastructure‎ وابسته است و بقیه لایه‌ها رو غیرمستقیم می‌بیند.  

برای ساده‌تر شدن کد، ‎nullable reference types‎ به‌صورت global غیرفعال می‌شن.

**مثال**: پروژه ‎Application‎ فقط ‎Domain‎ و ‎Common‎ رو reference می‌کنه؛ ‎Infrastructure‎ هم فقط ‎Application‎ رو. ‎WebAPI‎ هیچ reference مستقیمی به ‎Domain‎ یا ‎Application‎ نداره و همه چیز رو از طریق ‎Infrastructure‎ می‌گیره.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Clean Architecture Layer Setup in .NET](https://alisol.ir/?ai=Clean%20Architecture%20Layer%20Setup%20in%20.NET%7CJunior%20Matlou%7CMastering%20Unit%20and%20Integration%20Testing%20in%20Clean%20Architecture|fa)

## ۴. ؜Domain Entities و رابطه‌ها

**خلاصه**: تو لایه ‎Domain‎ فقط POCO ساده تعریف می‌کنیم:  
- ؜Category‎: شامل ‎Id‎، ‎Name‎، ‎Description‎  
- ؜Product‎: شامل ‎Id‎، ‎Name‎، ‎Description‎، ‎Price‎، ‎CategoryId‎ + navigation property به ‎Category‎  

لایه ‎Domain‎ کاملاً مستقل نگه داشته می‌شه؛ یعنی هیچ package خارجی اونجا استفاده نمی‌کنیم.

**مثال**: ‎Product‎ یک ‎CategoryId‎ به‌عنوان کلید خارجی داره و یک navigation property به اسم ‎Category‎. سمت ‎Category‎ هم می‌تونه یک ‎ICollection<Product> Products‎ اختیاری داشته باشه.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Domain Entities and Relationships in Clean Architecture](https://alisol.ir/?ai=Domain%20Entities%20and%20Relationships%20in%20Clean%20Architecture%7CJunior%20Matlou%7CMastering%20Unit%20and%20Integration%20Testing%20in%20Clean%20Architecture|fa)

## ۵. ؜Request و Response Model ها (لایه Common)

**خلاصه**: تو لایه ‎Common‎، برای هر عملیات ‎Request Model‎ و ‎Response Model‎ جداگانه تعریف می‌کنیم (مثل ‎CreateProductRequest‎، ‎UpdateProductRequest‎ و انواع ‎Response‎ ها). به این شکل، API هیچ‌وقت ‎Domain Model‎ رو مستقیم expose نمی‌کنه و سطح API تمیز و آینده‌نگر می‌مونه؛ مثلاً بعداً به راحتی می‌تونی فیلدهای لاگ‌گیری یا audit اضافه کنی.

**مثال**:  
- ؜CreateProductRequest‎ شامل ‎Name‎، ‎Description‎، ‎Price‎ و ‎CategoryId‎ هست (بدون ‎Id‎).  
- ؜ProductResponse‎ شکل entity ‎Product‎ رو منعکس می‌کنه ولی خودش در لایه ‎Common‎ قرار داره، نه ‎Domain‎.

**لینک برای جزئیات بیشتر**:  
[Ask AI: DTOs and Request-Response Models in Clean Architecture](https://alisol.ir/?ai=DTOs%20and%20Request-Response%20Models%20in%20Clean%20Architecture%7CJunior%20Matlou%7CMastering%20Unit%20and%20Integration%20Testing%20in%20Clean%20Architecture|fa)

## ۶. ؜CQRS با MediatR + Response Wrapper سراسری

**خلاصه**: MediatR و AutoMapper رو نصب می‌کنیم؛ بعد تو لایه ‎Application‎ فولدر ‎Features‎ رو می‌سازیم و داخلش ‎Command‎ ها (برای عملیات ‎Create/Update/Delete‎) و ‎Query‎ ها (برای عملیات ‎Read‎) رو تعریف می‌کنیم. Handler ها همیشه یک کلاس ‎Response<T>‎ برمی‌گردونن که شامل ‎IsSuccessful‎، ‎Message‎ و ‎Data‎ هست. این کار باعث می‌شه همه‌ی پاسخ‌های API یک ساختار ثابت داشته باشن.

**مثال**:  
؜Response<ProductResponse>‎ چیزی شبیه این برمی‌گردونه:  

```json
{
  "isSuccessful": true,
  "message": "Product created",
  "data": {
    "...": "..."
  }
}
```

**لینک برای جزئیات بیشتر**:  
[Ask AI: CQRS with MediatR and Response Wrapper](https://alisol.ir/?ai=CQRS%20with%20MediatR%20and%20Response%20Wrapper%7CJunior%20Matlou%7CMastering%20Unit%20and%20Integration%20Testing%20in%20Clean%20Architecture|fa)

## ۷. ؜Category CRUD با MediatR (Commands و Queries)

**خلاصه**: برای ‎Category‎ همه‌ی عملیات CRUD رو پیاده می‌کنیم:  
- ؜Create‎  
- ؜Update‎  
- ؜Delete‎  
- ؜GetById‎  
- ؜GetAll‎  

برای هر کدوم ‎Command/Query‎ و ‎Handler‎ مربوطه ساخته می‌شه و با AutoMapper بین ‎Request/Response‎ و ‎Domain Entity‎ ها map می‌کنیم.

**مثال**:  
؜CreateCategoryCommandHandler‎ این مسیر رو می‌ره:  
؜Request رو به ‎Category‎ map می‌کنه → ‎_categoryService.AddAsync‎ رو صدا می‌زنه → ‎SaveChangesAsync‎ → در نهایت یک ‎Response<CategoryResponse>‎ موفق همراه با پیام مناسب برمی‌گردونه.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Category CRUD Operations with MediatR](https://alisol.ir/?ai=Category%20CRUD%20Operations%20with%20MediatR%7CJunior%20Matlou%7CMastering%20Unit%20and%20Integration%20Testing%20in%20Clean%20Architecture|fa)

## ۸. ؜Product CRUD + گرفتن Products بر اساس Category

**خلاصه**: برای ‎Product‎ دقیقاً همون الگوی Category رو پیاده می‌کنیم، با این تفاوت که یک Query اضافه هم داریم به اسم ‎GetProductsByCategoryIdQuery‎ که محصولات رو بر اساس ‎CategoryId‎ فیلتر می‌کنه.

**مثال**:  
؜UpdateProductCommandHandler‎ اول چک می‌کنه Product وجود داره یا نه؛ اگه پیدا نشه یک response با ‎IsSuccessful = false‎ و پیام مناسب برمی‌گردونه. اگه وجود داشت، فیلدهای لازم رو update می‌کنه، ‎SaveChangesAsync‎ رو صدا می‌زنه و در نهایت ‎Response<ProductResponse>‎ موفق برمی‌گردونه.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Product CRUD and Filtering Queries in MediatR](https://alisol.ir/?ai=Product%20CRUD%20and%20Filtering%20Queries%20in%20MediatR%7CJunior%20Matlou%7CMastering%20Unit%20and%20Integration%20Testing%20in%20Clean%20Architecture|fa)

## ۹. لایه Infrastructure – DbContext در EF Core و سرویس‌ها

**خلاصه**: تو لایه ‎Infrastructure‎ یک ‎ApplicationDbContext‎ می‌سازیم که ‎DbSet<Category>‎ و ‎DbSet<Product>‎ داره. بعد interface هایی مثل ‎ICategoryService‎ و ‎IProductService‎ رو پیاده‌سازی می‌کنیم و همشون رو تو DI Container ثبت می‌کنیم.

**مثال**:  
در ‎ProductService.UpdateAsync‎، بر اساس ‎Id‎ موجودیت رو از دیتابیس می‌گیریم، property ها رو به‌روزرسانی می‌کنیم، و در نهایت ‎SaveChangesAsync‎ رو صدا می‌زنیم.

**لینک برای جزئیات بیشتر**:  
[Ask AI: EF Core Setup in Clean Architecture Infrastructure](https://alisol.ir/?ai=EF%20Core%20Setup%20in%20Clean%20Architecture%20Infrastructure%7CJunior%20Matlou%7CMastering%20Unit%20and%20Integration%20Testing%20in%20Clean%20Architecture|fa)

## ۱۰. ؜Unit Testing برای Handler ها (xUnit + Moq + FluentAssertions)

**خلاصه**: برای هر Handler چند تست می‌نویسیم:  
- سناریوی موفق (happy path)  
- سناریوهای خطا (مثل ‎null request‎، ‎Id‎ ناموجود و …)

با ‎Moq‎ سرویس‌ها رو mock می‌کنیم، AutoMapper رو mock یا configure می‌کنیم و با ‎FluentAssertions‎ روی خروجی assertion می‌نویسیم.

**مثال**:  
تو تست ‎CreateProductCommandHandler‎، mock سرویس طوری تنظیم می‌شه که ‎Id = 1‎ برگرده. بعد از اجرای Handler، assert می‌کنیم که:  
- ؜response.IsSuccessful‎ برابر ‎true‎ باشه  
- ؜response.Data.Id‎ برابر ‎1‎ باشه

**لینک برای جزئیات بیشتر**:  
[Ask AI: Unit Testing MediatR Handlers with Moq](https://alisol.ir/?ai=Unit%20Testing%20MediatR%20Handlers%20with%20Moq%7CJunior%20Matlou%7CMastering%20Unit%20and%20Integration%20Testing%20in%20Clean%20Architecture|fa)

## ۱۱. ؜Integration Testing روی کل Stack

**خلاصه**: برای Integration Test ها از ‎In-Memory Database‎ یا ‎WebApplicationFactory‎ استفاده می‌کنیم تا کل مسیر ‎Controller → Handler → EF Core‎ رو با هم تست کنیم. داده‌ی تستی (seed data) وارد می‌کنیم، endpoint ها رو صدا می‌زنیم و در نهایت وضعیت دیتابیس رو چک می‌کنیم.

**مثال**:  
از طریق ‎API Client‎ یک Category می‌سازیم → بعد از اجرای endpoint، دیتابیس رو query می‌کنیم و assert می‌کنیم که دقیقاً یک رکورد با نام مورد انتظار وجود داره.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Integration Testing Clean Architecture ASP.NET Core](https://alisol.ir/?ai=Integration%20Testing%20Clean%20Architecture%20ASP.NET%20Core%7CJunior%20Matlou%7CMastering%20Unit%20and%20Integration%20Testing%20in%20Clean%20Architecture|fa)

## ۱۲. ؜Controller های مینیمال + Migration ها + اجرای برنامه

**خلاصه**: Controller ها بسیار نازک (Thin) طراحی می‌شن؛ یعنی کار خاصی نمی‌کنن جز این‌که فقط request رو به MediatR forward کنن. تمام سرویس‌ها تو ‎Program.cs‎ (یا جایی مثل ‎Startup‎) ثبت می‌شن، Migration ها ساخته و اجرا می‌شن، و در نهایت با ‎Swagger‎ endpoint ها رو تست می‌کنیم.

**مثال**:  
- ؜POST /categories‎ با یک body‎ ‎JSON‎، وضعیت ‎200 OK‎ و یک ‎Response<CategoryResponse>‎ برمی‌گردونه.  
- ؜GET /categories‎ یک آرایه از Category ها رو برمی‌گردونه.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Minimal Controllers with MediatR and Swagger Testing](https://alisol.ir/?ai=Minimal%20Controllers%20with%20MediatR%20and%20Swagger%20Testing%7CJunior%20Matlou%7CMastering%20Unit%20and%20Integration%20Testing%20in%20Clean%20Architecture|fa)

---

## درباره نویسنده خلاصه

من *Ali Sol* هستم، یک Backend Developer. اگه دوست داشتی بیشتر با من آشنا بشی:  

- **وب‌سایت**: [alisol.ir](https://alisol.ir)  
- **لینکدین**: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)


