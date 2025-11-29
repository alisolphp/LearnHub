# خلاصه دوره: Learn How To Code: Google's Go (golang) Programming Language

- **پلتفرم**: Udemy  
- **مدرس**: Todd McLeod  
- **امتیاز**: 4.5 از 5  
- **مدت‌زمان**: حدود 29.5 ساعت  
- **آخرین بروزرسانی**: مارس 2025  
- **لینک دوره**: [ثبت‌نام در Udemy](https://www.udemy.com/course/learn-how-to-code/)

*این سند، نکات کلیدی دوره رو خلاصه می‌کنه تا راحت و سریع مرورشون کنی. با این حال اگه فرصت داشتی، دیدن خود دوره خیلی توصیه می‌شه.*

## قبل از این‌که شروع کنی

- من نکات مهم دوره‌ها رو خلاصه می‌کنم تا هم برای یادگیری اولیه و هم برای مرور سریع به‌دردت بخوره.  
- هرجا روی لینک‌های `Ask AI` کلیک کنی، می‌تونی در مورد همون موضوع به‌صورت تعاملی سؤال بپرسی.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=fa&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=fa&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=fa&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language)
<!-- LH-BUTTONS:END -->

## خوش‌آمدگویی به دوره – بیایید برای Go هیجان‌زده بشیم!

**خلاصه**  
؜Todd از زیرزمین خونش شروع می‌کنه و خیلی راحت می‌شه فهمید که واقعا عاشق تدریس Go هست. توضیح می‌ده چه منابعی در طول دوره داری (تقریباً برای هر ویدیو کد هست، یک بخش بزرگ Course Resources، و یک GitHub repo به اسم `goestot11/learn-to-code-go-version-three` که همه مثال‌ها + کلی تست و تمرین داخلشه). همین‌طور `Go Playground` رو نشون می‌ده برای اجرای سریع کد. روی ذهنیت هم خیلی تأکید داره: «پشتکار» مهم‌ترین عامل موفقیته، Imposter Syndrome طبیعیه، و همه‌مون در حال یادگرفتنیم.

**مثال**  
داخل GitHub repo فولدرهایی مثل `000` هست برای کارهای فان (مثلاً اسکریپتی که 150 تا فولدر رو unzip می‌کنه) و بقیه فولدرها شماره‌گذاری شدن و با جلسات دوره مچ هستن.

**لینک برای جزئیات بیشتر**: [Ask AI: Welcome to Go Programming](https://alisol.ir/?ai=Welcome%20to%20Go%20Programming%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language|fa)

## چرا Go؟ سه دلیل اصلی که Todd عاشقش شد

**خلاصه**  
؜Go توی Google به دنیا اومد چون هیچ زبان دیگه‌ای نیازهاشون رو پوشش نمی‌داد. توسط چند تا اسطوره (Ken Thompson، Rob Pike، Robert Griesemer – همون‌هایی که Unix، UTF-8 و چیزهای بزرگ دیگه رو ساختن) حدود 2006–2007 و هم‌زمان با دنیای multi-core design شد. Go بهت این‌ها رو می‌ده:  
- کامپایل خیلی سریع  
- اجرای سریع در حد C/C++  
- حس و حال راحت Python/Ruby  
- و از روز اول، Concurrency واقعی توی خود زبان تعبیه شده

**مثال**  
توی اسلایدها نشون می‌ده که Go وسط یه دایره‌ی طلایی قرار می‌گیره: هم سریع، هم دوست‌داشتنی برای برنامه‌نویس، هم کارآمد برای کارهای concurrent.

**لینک برای جزئیات بیشتر**: [Ask AI: Why Learn Go](https://alisol.ir/?ai=Why%20Learn%20Go%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language|fa)

## داکیومنتیشن رسمی – بهترین دوست همیشگی‌ات

**خلاصه**  
؜Todd محکم تأکید می‌کنه: همیشه اول برو سراغ داکیومنتیشن رسمی (`go.dev`). منابع اصلی:  
- ؜Tour of Go  
- ؜Effective Go  
- ؜Language Spec  
- ؜Standard Library docs  
- ؜Go by Example  
- ؜Go Playground  

قدم‌به‌قدم نشون می‌ده چطور بین این‌ها بچرخی و این‌که نتایج تصادفی Google همیشه مطمئن و به‌روز نیستن.

**مثال**  
مثلاً می‌خوای ببینی چطور `for` بنویسی؟ مستقیم برو `gobyexample.com/for` و همون syntax رو ببین و تمرین کن.

**لینک برای جزئیات بیشتر**: [Ask AI: Go Documentation and Resources](https://alisol.ir/?ai=Go%20Documentation%20and%20Resources%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language|fa)

## ؜Format Printing – گفتن Hello World با کلاس

**خلاصه**  
یه بخش مفصل درباره پکیج `fmt`: توابع `Print`، `Println`، `Printf`. همین‌طور verbها:  
- `%v` برای نمایش پیش‌فرض  
- `%T` نوع متغیر  
- `%s` رشته  
- `%d` عدد ده‌دهی  
- `%t` مقدار bool  
و چندتا کد escape مثل `
` برای newline و `	` برای tab.

**مثال**  
```go
name := "Kim"
age := 22
fmt.Printf("%s is %d years old
	and the type is %T %T", name, age, name, age)
```

خروجی:  
`Kim is 22 years old` → بعدش یه tab → `and the type is string int`

**لینک برای جزئیات بیشتر**: [Ask AI: Format Printing in Go](https://alisol.ir/?ai=Format%20Printing%20in%20Go%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language|fa)

## کامپیوترها واقعاً چطور کار می‌کنن – صفر و یک و چراغ‌های ایوان

**خلاصه**  
؜Todd با یک مثال فان توضیح می‌ده: کامپیوتر در اصل یه عالمه کلید روشن/خاموش (ترانزیستور) پشت‌سرهمه.  
- یک کلید → 2 حالت  
- دو کلید → 4 حالت  
- هشت کلید (1 بایت) → 256 حالت مختلف  

همه‌چیز (متن، تصویر، ویدیو) فقط کدگذاری هوشمندانه روی همین صفر و یک‌هاست.

**مثال**  
نماد پاور (Power) یه دایره با یه خط بالاست: صفر داخل یک – یعنی «خاموش» و «روشن» در یک آیکون.

**لینک برای جزئیات بیشتر**: [Ask AI: How Computers Work Binary Principles](https://alisol.ir/?ai=How%20Computers%20Work%20Binary%20Principles%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language|fa)

## آشنایی با ASCII، Unicode و UTF-8 – چرا Go عاشق ایموجی‌هاست

**خلاصه**  
- ؜‎؜ASCII = یک بایت → 256 کاراکتر (خیلی غرب‌محور)  
- ؜‎Unicode برای هر کاراکتر در هر زبان، یک عدد یکتا تعریف می‌کنه  
- ؜‎UTF-8 یک encoding خیلی هوشمند با طول متغیره که هم فضا رو خوب مدیریت می‌کنه و هم انعطاف‌پذیره  

؜Go به‌صورت پیش‌فرض از UTF-8 استفاده می‌کنه، یعنی ایموجی و زبان‌های مختلف رو به‌خوبی پشتیبانی می‌کنه.

**مثال**  
می‌تونی خیلی ساده بنویسی:  
```go
fmt.Println("Hello 🌍")
```  
و بدون هیچ تنظیم اضافه‌ای کار می‌کنه.

**لینک برای جزئیات بیشتر**: [Ask AI: ASCII Unicode and UTF-8 in Go](https://alisol.ir/?ai=ASCII%20Unicode%20and%20UTF-8%20in%20Go%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language|fa)

## ؜Raw String Literals – وقتی متن دقیق و چندخطی می‌خوای

**خلاصه**  
برای رشته‌هایی که می‌خوای دقیقاً همون‌طور که هستن (با newline و tab و …) چاپ بشن، از backtick یعنی `` ` `` استفاده می‌کنی. این حالت برای SQL، HTML، regex یا متن‌های چندخطی خیلی عالیه.

**مثال**  
```go
fmt.Println(`Line 1
Line 2
    with tabs
Line 3`)
```
دقیقاً همین‌طوری چاپ می‌شه.

**لینک برای جزئیات بیشتر**: [Ask AI: String Literals in Go](https://alisol.ir/?ai=String%20Literals%20in%20Go%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language|fa)

## تمرین عملی 1 – اولین برنامه Go خودت

**خلاصه**  
توی این تمرین یه برنامه‌ی خیلی ساده می‌نویسی که متن به همراه ایموجی و یک raw string literal چاپ می‌کنه. می‌تونی توی Go Playground یا ویرایشگر محلی این‌کار رو انجام بدی. Todd توی VS Code هم Auto Import رو نشون می‌ده.

**مثال**  
```go
package main
import "fmt"
func main() {
    fmt.Println("I ❤️ Go!")
    fmt.Println(`Raw literal
works great
for multiple lines`)
}
```

**لینک برای جزئیات بیشتر**: [Ask AI: Hands-On Printing with Emojis](https://alisol.ir/?ai=Hands-On%20Printing%20with%20Emojis%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language|fa)

## مدیریت خطا در Go – بدون Exception، فقط با مقدار

**خلاصه**  
توی Go خطاها به‌صورت مقدار (value) برگردونده می‌شن، معمولاً به‌عنوان مقدار دوم. الگو اینه: `if err != nil { ... }`. چهار روش رایج برای برخورد با خطا:  
- ‎`fmt.Println` → فقط چاپ خطا  
- ‎`log.Println` → چاپ خطا به‌همراه timestamp  
- ‎`log.Fatalln` → چاپ خطا و خروج با code=1  
- ‎`panic` → چاپ stack trace و خروج با code=2  

**مثال**  
```go
f, err := os.Open("missing.txt")
if err != nil {
    log.Fatal(err) // prints timestamp + error and exits
}
```

**لینک برای جزئیات بیشتر**: [Ask AI: Error Handling Basics in Go](https://alisol.ir/?ai=Error%20Handling%20Basics%20in%20Go%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language|fa)

## لاگ گرفتن خطاها داخل فایل

**خلاصه**  
با `log.SetOutput()` می‌تونی خروجی log رو از ترمینال به یک فایل بفرستی. از اون به بعد، هر چی `log.Println` یا `log.Fatal` و … باشه، می‌ره داخل همون فایل.

**مثال**  
```go
file, _ := os.Create("log.txt")
log.SetOutput(file)
log.Println("This goes to the file!")
```

**لینک برای جزئیات بیشتر**: [Ask AI: Logging Errors to Files](https://alisol.ir/?ai=Logging%20Errors%20to%20Files%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language|fa)

## خطاهای سفارشی – خطاهات رو به زبان خودت حرف بزن

**خلاصه**  
می‌تونی با `errors.New("message")` یا `fmt.Errorf("message %v", value)` خطای جدید بسازی و اطلاعات اضافی بهش اضافه کنی. به‌صورت idiomatic، معمولاً خطاهای عمومی رو به‌شکل متغیر package-level تعریف می‌کنن:

**مثال**  
```go
var errNegativeSqrt = errors.New("math: square root of negative number")
```

**لینک برای جزئیات بیشتر**: [Ask AI: Creating Custom Errors](https://alisol.ir/?ai=Creating%20Custom%20Errors%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language|fa)

## خطاهای پیشرفته‌تر – structهایی که interface خطا رو پیاده‌سازی می‌کنن

**خلاصه**  
می‌تونی یک struct بسازی، بعد براش متد `Error() string` تعریف کنی؛ این‌طوری اون struct نوع `error` رو پیاده‌سازی می‌کنه. این روش اجازه می‌ده همراه پیام خطا، اطلاعات اضافه مثل latitude/longitude، timestamp و … رو هم نگه داری.

**مثال**  
```go
type MyError struct { Lat, Long string; Err error }
func (e *MyError) Error() string { return fmt.Sprintf("error at %s,%s: %v", e.Lat, e.Long, e.Err) }
```

**لینک برای جزئیات بیشتر**: [Ask AI: Advanced Custom Errors with Structs](https://alisol.ir/?ai=Advanced%20Custom%20Errors%20with%20Structs%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language|fa)

## حرف‌های پایانی Todd

**خلاصه**  
؜Todd در پایان بهت تبریک می‌گه و یادآوری می‌کنه که همین قدم‌های کوچک و مداوم روزانه، تو رو تبدیل به نسخه قوی‌تر خودت می‌کنه. چند تا از دوره‌های دیگه‌ش رو هم معرفی می‌کنه و سایت مدیتیشن خودش به اسم heartmindway.com رو هم به اشتراک می‌ذاره.

**لینک برای جزئیات بیشتر**: [Ask AI: Go Course Wrap-Up and Mindset](https://alisol.ir/?ai=Go%20Course%20Wrap-Up%20and%20Mindset%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language|fa)

---

## دوره اصلی  

[Learn How To Code: Google's Go (golang) Programming Language on Udemy](https://www.udemy.com/course/learn-how-to-code/)

---

## درباره خلاصه‌کننده

من *Ali Sol* هستم، Backend Developer. برای آشنایی بیشتر:  
- وب‌سایت: [alisol.ir](https://alisol.ir)  
- لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

