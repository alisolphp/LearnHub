# خلاصه دوره: Golang Web Development: Create Powerful Servers with Golang

- **پلتفرم**: Udemy  
- **مدرس**: Rajan Lagah  
- **امتیاز**: 4.7/5  
- **مدت زمان**: 03:10:06  
- **آخرین به‌روزرسانی**: March 2025  
- **لینک دوره**: [Golang Web Development: Create Powerful Servers with Golang](https://www.udemy.com/course/go-web-development-create-powerful-servers-with-golang)

*این داکیومنت خلاصه نکات اصلی دوره است. اگه فرصت داری، دیدن کامل خود دوره خیلی توصیه می‌شه.*

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=47fdb3b8 -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=fa&src=courses/udemy-golang-web-development-create-powerful-servers-with-golang) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=courses/udemy-golang-web-development-create-powerful-servers-with-golang) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=courses/udemy-golang-web-development-create-powerful-servers-with-golang) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=courses/udemy-golang-web-development-create-powerful-servers-with-golang) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=courses/udemy-golang-web-development-create-powerful-servers-with-golang) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=fa&src=courses/udemy-golang-web-development-create-powerful-servers-with-golang) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=courses/udemy-golang-web-development-create-powerful-servers-with-golang) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=courses/udemy-golang-web-development-create-powerful-servers-with-golang) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=courses/udemy-golang-web-development-create-powerful-servers-with-golang) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=courses/udemy-golang-web-development-create-powerful-servers-with-golang) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=courses/udemy-golang-web-development-create-powerful-servers-with-golang) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=courses/udemy-golang-web-development-create-powerful-servers-with-golang)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=courses/udemy-golang-web-development-create-powerful-servers-with-golang) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=courses/udemy-golang-web-development-create-powerful-servers-with-golang) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=courses/udemy-golang-web-development-create-powerful-servers-with-golang)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=fa&src=courses/udemy-golang-web-development-create-powerful-servers-with-golang)
<!-- LH-BUTTONS:END -->

## ؜۱. معرفی دوره و چرا Go برای Web Development

راجان اول دوره توضیح می‌ده چرا خیلی از شرکت‌های بزرگ دارن می‌رن سمت Go: سریع و کم‌مصرفه، و برای ساخت سرویس‌های backend مقیاس‌پذیر عالیه. یک نقشه راه کلی هم می‌ده: از یک سرور خیلی ساده با Go شروع می‌کنی، بعد می‌ری سراغ Gin برای routing بهتر، از Docker + PostgreSQL استفاده می‌کنی، یک سری CRUD API کامل می‌سازی، Google OAuth + JWT Auth اضافه می‌کنی و در نهایت همه‌چیز رو با در نظر گرفتن CI/CD روی AWS دیپلوی می‌کنی.

**مثال**: آخر دوره یک API مدیریت Task خواهی داشت که روی AWS ران می‌شه، با Google Login کاربر را لاگین می‌کنه و به یک دیتابیس واقعی روی Cloud وصل می‌شه.

[Ask AI: Why Go for backend](https://alisol.ir/?ai=Why%20Go%20for%20backend%7CRajan%20Lagah%7CGolang%20Web%20Development%3A%20Create%20Powerful%20Servers%20with%20Golang|fa)

## ؜۲. نصب Go و ساختن اولین سرور

یاد می‌گیری چطور Go (نسخه 1.23 به بالا) رو نصب کنی، ‎GOPATH رو تنظیم کنی و با استفاده از پکیج استاندارد `net/http` در حدود ۱۵ خط، یک سرور «hello world» خیلی ساده بسازی.

**مثال**:
```go
func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprint(w, "OK")
    })
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

[Ask AI: Installing Go and first server](https://alisol.ir/?ai=Installing%20Go%20and%20first%20server%7CRajan%20Lagah%7CGolang%20Web%20Development%3A%20Create%20Powerful%20Servers%20with%20Golang|fa)

## ؜۳. چرا Gin و مهاجرت به Gin Framework

راجان `net/http` خام رو با Gin مقایسه می‌کنه و نشون می‌ده چرا برای پروژه‌های واقعی Gin انتخاب بهتریه: لاگ‌گیری خودکار، ساخت JSON Response راحت، validation توکار، پشتیبانی از middleware، گروه‌بندی routeها و پرفورمنس بهتر.

**مثال**:
```go
r := gin.Default()
r.GET("/", func(c *gin.Context) {
    c.JSON(200, gin.H{"message": "OK"})
})
r.Run(":8080")
```

[Ask AI: Gin vs net/http](https://alisol.ir/?ai=Gin%20vs%20net%2Fhttp%7CRajan%20Lagah%7CGolang%20Web%20Development%3A%20Create%20Powerful%20Servers%20with%20Golang|fa)

## ؜۴. Environment Variableها و مدیریت Config

هیچ‌وقت Secret‌هات رو hard-code نکن! اینجا با `godotenv` کار می‌کنی تا مقادیر رو از فایل `.env` بخونی و یک پکیج config تمیز بسازی که فقط یک‌بار موقع start شدن برنامه (مثلاً داخل `init()`) لود بشه.

**مثال**:
```env
APP_PORT=8080
DB_PATH=postgres://postgres:adminpassword@localhost:5433/tasks?sslmode=disable
```

[Ask AI: Environment variables in Go](https://alisol.ir/?ai=Environment%20variables%20in%20Go%7CRajan%20Lagah%7CGolang%20Web%20Development%3A%20Create%20Powerful%20Servers%20with%20Golang|fa)

## ؜۵. Docker + PostgreSQL Setup

می‌بینی چرا Docker برای دیتابیس لوکال خیلی ایده‌آله (نسخه‌های مختلف، پاک کردن ساده، ایزوله بودن و ...). راجان یک `docker-compose.yml` آماده می‌ده که PostgreSQL 16 رو بالا می‌آره و دیتابیس `tasks` رو برات می‌سازه.

**مثال**:
```yaml
services:
  postgres:
    image: postgres:16.3
    container_name: postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: adminpassword
      POSTGRES_DB: tasks
    ports:
      - "5433:5432"
```

[Ask AI: Docker PostgreSQL for Go](https://alisol.ir/?ai=Docker%20PostgreSQL%20for%20Go%7CRajan%20Lagah%7CGolang%20Web%20Development%3A%20Create%20Powerful%20Servers%20with%20Golang|fa)

## ؜۶. Live Reload با Air

دیگه لازم نیست بعد هر تغییری سرور رو دستی ریستارت کنی. `air` رو نصب می‌کنی و هر بار فایل رو Save کنی، سرور خودش ریستارت می‌شه.

**مثال** (دستور ترمینال):
```bash
air
# → Server بعد از هر ذخیره، خودکار ریستارت می‌شود
```

[Ask AI: Live reload Go with Air](https://alisol.ir/?ai=Live%20reload%20Go%20with%20Air%7CRajan%20Lagah%7CGolang%20Web%20Development%3A%20Create%20Powerful%20Servers%20with%20Golang|fa)

## ؜۷. CRUD – ساخت Task (POST، Validation و Migrationها)

؜Route مربوط به `POST /tasks` رو می‌سازی، از binding و tagهای Gin برای validation استفاده می‌کنی، با `golang-migrate` migration می‌نویسی و queryها رو در یک لایه repository جدا نگه می‌داری.

**مثال** validation:
```go
type CreateTaskPayload struct {
    Title       string `json:"title" binding:"required,max=100"`
    Description string `json:"description" binding:"required,max=1000"`
}
```

[Ask AI: CRUD Create and validation Gin](https://alisol.ir/?ai=CRUD%20Create%20and%20validation%20Gin%7CRajan%20Lagah%7CGolang%20Web%20Development%3A%20Create%20Powerful%20Servers%20with%20Golang|fa)

## ؜۸. Read، Update و Delete Taskها (GET، PATCH، DELETE)

باقی عملیات CRUD را هم کامل می‌کنی: گروه‌بندی routeها، استفاده از query parameterها، پیاده‌سازی PATCH برای آپدیت جزئی فیلدها و نوشتن متدهای تمیز در لایه repository.

**مثال** payload آپدیت:
```go
type UpdateTaskPayload struct {
    ID          int    `json:"id" binding:"required"`
    Title       *string `json:"title" binding:"omitempty,max=100"`
    Description *string `json:"description" binding:"omitempty,max=1000"`
}
```

[Ask AI: CRUD Read Update Delete Gin](https://alisol.ir/?ai=CRUD%20Read%20Update%20Delete%20Gin%7CRajan%20Lagah%7CGolang%20Web%20Development%3A%20Create%20Powerful%20Servers%20with%20Golang|fa)

## ؜۹. Google OAuth2 + JWT Authentication

یک پروژه تو Google Cloud می‌سازی، endpointهای `/login/google` و `/callback/google` رو پیاده می‌کنی، `code` رو با `token` عوض می‌کنی، اطلاعات کاربر رو می‌گیری و در نهایت یک JWT با انقضای ۲۴ ساعته برای کاربر sign می‌کنی.

**مثال** ساخت JWT:
```go
token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
    "email": user.Email,
    "name":  user.Name,
    "exp":   time.Now().Add(time.Hour * 24).Unix(),
})
tokenString, _ := token.SignedString([]byte(config.JWT_SECRET))
```

[Ask AI: Google OAuth JWT Go](https://alisol.ir/?ai=Google%20OAuth%20JWT%20Go%7CRajan%20Lagah%7CGolang%20Web%20Development%3A%20Create%20Powerful%20Servers%20with%20Golang|fa)

## ؜۱۰. Middleware احراز هویت (محافظت از Routeها)

یک middleware قابل‌استفاده‌ی مجدد می‌نویسی که header مربوط به `Authorization: Bearer <token>` رو می‌خونه، JWT رو verify می‌کنه و اگر token نامعتبر یا منقضی باشه با status 403 درخواست رو رد می‌کنه.

**مثال** middleware:
```go
func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        tokenString := c.GetHeader("Authorization")
        if tokenString == "" || !strings.HasPrefix(tokenString, "Bearer ") {
            c.AbortWithStatusJSON(403, gin.H{"error": "Unauthorized"})
            return
        }
        // ...parse and verify token
        c.Next()
    }
}
```

[Ask AI: JWT middleware Gin](https://alisol.ir/?ai=JWT%20middleware%20Gin%7CRajan%20Lagah%7CGolang%20Web%20Development%3A%20Create%20Powerful%20Servers%20with%20Golang|fa)

## ؜۱۱. دیپلویمنت – AWS Elastic Beanstalk + RDS

؜AWS CLI رو نصب می‌کنی، یک IAM User با سطح دسترسی محدود می‌سازی، با `eb init` و `eb deploy` اپلیکیشن رو روی Elastic Beanstalk دیپلوی می‌کنی، یک `Procfile` تعریف می‌کنی، به RDS PostgreSQL (داخل VPC خصوصی) وصل می‌شی و migrationها رو روی محیط Production اجرا می‌کنی.

**مثال** Procfile:
```
web: bin/application
```

[Ask AI: Deploy Go to AWS Elastic Beanstalk RDS](https://alisol.ir/?ai=Deploy%20Go%20to%20AWS%20Elastic%20Beanstalk%20RDS%7CRajan%20Lagah%7CGolang%20Web%20Development%3A%20Create%20Powerful%20Servers%20with%20Golang|fa)

---

## ؜درباره خلاصه‌کننده

من *Ali Sol* هستم، Backend Developer. برای آشنایی بیشتر:

- وب‌سایت: [alisol.ir](https://alisol.ir)  
- لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

