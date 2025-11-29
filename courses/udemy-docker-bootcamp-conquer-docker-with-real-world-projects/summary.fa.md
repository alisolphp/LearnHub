# دوره Docker Bootcamp: تسلط بر Docker با پروژه‌های واقعی

- **پلتفرم**: Udemy  
- **مدرس‌ها**: Rayan Slim, Jad Slim, Houssem Slim  
- **امتیاز**: 4.7/5  
- **مدت زمان**: 05:38:31  
- **سال انتشار**: 2023  
- **لینک دوره**: [Docker Bootcamp: Conquer Docker with Real-World Projects](https://www.udemy.com/course/docker-bootcamp-conquer-docker-with-real-world-projects/)

این سند، نکات کلیدی دوره را خلاصه می‌کند. اگر فرصت دارید، دیدن کامل خود دوره به‌شدت توصیه می‌شود.

## قبل از شروع

- من نکات مهم دوره‌های مفید را خلاصه می‌کنم تا بتوانید سریع‌تر یاد بگیرید و مرور کنید.  
- کافی است روی لینک‌های `Ask AI` کلیک کنید تا در مورد هر مبحثی که می‌خواهید، عمیق‌تر کاوش کنید.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=47fdb3b8 -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=fa&src=courses/udemy-docker-bootcamp-conquer-docker-with-real-world-projects) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=courses/udemy-docker-bootcamp-conquer-docker-with-real-world-projects) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=courses/udemy-docker-bootcamp-conquer-docker-with-real-world-projects) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=courses/udemy-docker-bootcamp-conquer-docker-with-real-world-projects) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=courses/udemy-docker-bootcamp-conquer-docker-with-real-world-projects) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=fa&src=courses/udemy-docker-bootcamp-conquer-docker-with-real-world-projects) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=courses/udemy-docker-bootcamp-conquer-docker-with-real-world-projects) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=courses/udemy-docker-bootcamp-conquer-docker-with-real-world-projects) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=courses/udemy-docker-bootcamp-conquer-docker-with-real-world-projects) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=courses/udemy-docker-bootcamp-conquer-docker-with-real-world-projects) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=courses/udemy-docker-bootcamp-conquer-docker-with-real-world-projects) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=courses/udemy-docker-bootcamp-conquer-docker-with-real-world-projects)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=courses/udemy-docker-bootcamp-conquer-docker-with-real-world-projects) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=courses/udemy-docker-bootcamp-conquer-docker-with-real-world-projects) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=courses/udemy-docker-bootcamp-conquer-docker-with-real-world-projects)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=fa&src=courses/udemy-docker-bootcamp-conquer-docker-with-real-world-projects)
<!-- LH-BUTTONS:END -->

## ؜‎؜۱. معرفی دوره و چیزی که خواهید ساخت

دوره با یک نمای کلی شروع می‌شود: یاد می‌گیرید چطور اپلیکیشن‌ها و وابستگی‌هایشان را داخل Docker containerها پکیج کنید، web appها، microserviceها و databaseها را اجرا کنید و در نهایت همه‌چیز را با Docker Compose اورکِستریت کنید.  
ستاره دوره یک اپلیکیشن کامل e-commerce است که از هفت microservice (با زبان‌های Python/Flask، Node.js، Java/Spring Boot، Go، Ruby و غیره) تشکیل شده و به شش database مختلف وصل است. در پایان، یک سیستم شبیه دنیای واقعی را containerize کرده‌اید؛ چیزی شبیه کاری که شرکت‌های بزرگ انجام می‌دهند.

**مثال**: پروژه نهایی یک فروشگاه آنلاین کامل است که در آن کاربر می‌تواند ثبت‌نام کند، محصولات را ببیند، موجودی را مدیریت کند، سفارش ثبت کند و حتی تیکت پشتیبانی باز کند — و همه این‌ها داخل containerهای ایزوله شده اجرا می‌شوند.

[Ask AI: پروژه e-commerce واقعی با Docker](https://alisol.ir/?ai=Docker%20Real-World%20E-Commerce%20Project%7CRayan%20Slim%7CDocker%20Bootcamp%3A%20Conquer%20Docker%20with%20Real-World%20Projects%7Cfa)

## تنظیم محیط Docker

در این بخش، مخزن (repo) نسبتاً بزرگ منابع دوره را دانلود می‌کنید، Docker Desktop را نصب می‌کنید (با توضیح جدا برای Apple Silicon و Intel)، با حساب Docker Hub وارد می‌شوید، VS Code را نصب می‌کنید و افزونه رسمی Docker را اضافه می‌کنید.

**مثال**: بعد از نصب، Docker Dashboard را باز می‌کنید و آیکون نهنگ (whale) را می‌بینید که یعنی Docker engine آماده کار است.

[Ask AI: نصب Docker Desktop و افزونه VS Code](https://alisol.ir/?ai=Install%20Docker%20Desktop%20and%20VS%20Code%20Extension%7CRayan%20Slim%7CDocker%20Bootcamp%3A%20Conquer%20Docker%20with%20Real-World%20Projects%7Cfa)

## چرا Docker به‌وجود آمد – مشکل «روی سیستم من کار می‌کند»

مشکل کلاسیک: یک اپ روی لپ‌تاپ دولوپر عالی کار می‌کند اما در testing یا production به خاطر نبودن یک library، تفاوت نسخه OS یا conflict با processهای دیگر کرش می‌کند.  
؜Virtual Machineها مشکل isolation را حل کردند اما سنگین هستند (هر VM یک OS کامل دارد). Docker containerها kernel سیستم‌عامل میزبان را به‌اشتراک می‌گذارند، در عرض چند میلی‌ثانیه بالا می‌آیند و منابع خیلی کمتری مصرف می‌کنند.

**مثال**: روی یک سرور می‌توانید صدها یا حتی هزاران container اجرا کنید، در حالی که فقط چند VM می‌توانید بالا بیاورید — به همین خاطر است که شرکت‌هایی مثل Netflix، Spotify و PayPal کاملاً روی containerها سرمایه‌گذاری کرده‌اند.

[Ask AI: چرا به‌جای VM از Docker استفاده کنیم](https://alisol.ir/?ai=Why%20Use%20Docker%20Instead%20of%20VMs%7CRayan%20Slim%7CDocker%20Bootcamp%3A%20Conquer%20Docker%20with%20Real-World%20Projects%7Cfa)

## اجرای اولین اپلیکیشن‌ها داخل container (بدون نصب لوکال!)

در این قسمت workflow اصلی ‎`docker run` را یاد می‌گیرید: یک image رسمی را pull می‌کنید، با ‎`-v` کدتان را mount می‌کنید و app را اجرا می‌کنید. برای Python، Java، Go، Ruby و … همین روال را دارید و نیازی نیست چیزی را روی لپ‌تاپتان نصب کنید.

**مثال**:
```bash
docker run --rm --name python-container -v "/absolute/path/to/code":/app python:3.8-slim python /app/pythonapp.py
```

برای تنظیم environment variableها مثل مثال Go، می‌توانید ‎`-e MESSAGE="Hello from Docker"` اضافه کنید یا مثل مثال Python، argumentهای خط فرمان را پاس بدهید.

[Ask AI: docker run، volumeها و environment variableها](https://alisol.ir/?ai=Docker%20Run%2C%20Volumes%20and%20Environment%20Variables%7CRayan%20Slim%7CDocker%20Bootcamp%3A%20Conquer%20Docker%20with%20Real-World%20Projects%7Cfa)

## ساخت imageهای سفارشی با Dockerfile

به‌جای این‌که هر بار یک دستور طولانی ‎`docker run` بنویسید، یک Dockerfile (با دستورهای ‎`FROM`، ‎`WORKDIR`، ‎`COPY`، ‎`CMD`) می‌نویسید و یک image قابل‌استفاده‌مجدد می‌سازید.

**مثال** Dockerfile برای یک اپ Python:
```dockerfile
FROM python:3.8-slim
WORKDIR /app
COPY . .
CMD ["python", "pythonapp.py"]
```

بعد:
```bash
docker build -t mypythonapp:1.0 .
docker run --rm mypythonapp:1.0
```

همچنین ‎`.dockerignore`، multi-stage buildها و این‌که چرا slim imageها ترجیح داده می‌شوند هم توضیح داده می‌شود.

[Ask AI: نوشتن Dockerfile و best practiceها](https://alisol.ir/?ai=Writing%20Dockerfiles%20and%20Best%20Practices%7CRayan%20Slim%7CDocker%20Bootcamp%3A%20Conquer%20Docker%20with%20Real-World%20Projects%7Cfa)

## ؜Docker Compose – مدیریت اپ‌های چند containerی

اینجا ده‌ها دستور جداگانه ‎`docker run` را با یک فایل ‎`docker-compose.yml` جایگزین می‌کنید. توی این فایل serviceها، portها، environment variableها، volumeها و ‎`depends_on` را تعریف می‌کنید.

**مثال**: یک پورتال ثبت نمره (grade-submission portal) داریم که از Flask frontend + Node API + MongoDB تشکیل شده و همگی با یک دستور ‎`docker compose up` بالا می‌آیند و با ‎`docker compose down` به‌صورت تمیز خاموش می‌شوند.

[Ask AI: Docker Compose برای اپ‌های چند containerی](https://alisol.ir/?ai=Docker%20Compose%20for%20Multi-Container%20Applications%7CRayan%20Slim%7CDocker%20Bootcamp%3A%20Conquer%20Docker%20with%20Real-World%20Projects%7Cfa)

## اجرای databaseها در Docker (MongoDB، MySQL، PostgreSQL)

یاد می‌گیرید چطور خیلی سریع databaseهای در حد production بالا بیاورید. imageهای رسمی همه‌چیز را هندل می‌کنند؛ فقط کافی است environment variableهای درست را پاس بدهید.

**مثال** کانفیگ MongoDB با data persistent:
```yaml
mongo:
  image: mongo:latest
  container_name: mongo
  volumes:
    - mongo-data:/data/db
```

[Ask AI: اجرای MongoDB، MySQL و PostgreSQL در Docker](https://alisol.ir/?ai=Running%20MongoDB%20MySQL%20PostgreSQL%20in%20Docker%7CRayan%20Slim%7CDocker%20Bootcamp%3A%20Conquer%20Docker%20with%20Real-World%20Projects%7Cfa)

## ؜‎؜حافظه پایدار با volumeها

داده‌های database وقتی container متوقف می‌شود از بین می‌روند — مگر این‌که از named volume استفاده کنید. مسیرهایی مثل ‎`/var/lib/mysql` یا ‎`/data/db` را به یک volume mount می‌کنید تا داده‌ها بعد از ‎`docker compose down/up` هم باقی بمانند.

**مثال**: حتی بعد از این‌که همه containerها را کامل پاک کردید، وقتی دوباره وارد اپ e-commerce می‌شوید، سفارش‌های قدیمی و اکانت‌های کاربری‌تان هنوز وجود دارند.

[Ask AI: Docker volumeها و persistence داده](https://alisol.ir/?ai=Docker%20Volumes%20and%20Data%20Persistence%7CRayan%20Slim%7CDocker%20Bootcamp%3A%20Conquer%20Docker%20with%20Real-World%20Projects%7Cfa)

## ؜Push کردن imageها به Docker Hub و versioning

اینجا با ‎`docker tag` و ‎`docker push` تمرین می‌کنید، semantic versioning (مثل 1.0.0 → 2.0.0 بعد از اضافه کردن databaseها) را یاد می‌گیرید و می‌بینید چطور README خوبی بنویسید که هر کسی بتواند imageهایتان را pull و اجرا کند.

**مثال**: بعد از این‌که برای MongoDB، persistence اضافه کردید، نسخه را به ‎`2.0.0` tag می‌زنید، push می‌کنید و بعد فایل‌های Compose را طوری آپدیت می‌کنید که از ‎`yourusername/service:2.0.0` استفاده کنند.

[Ask AI: push کردن به Docker Hub و versioning imageها](https://alisol.ir/?ai=Docker%20Hub%20Push%20and%20Image%20Versioning%7CRayan%20Slim%7CDocker%20Bootcamp%3A%20Conquer%20Docker%20with%20Real-World%20Projects%7Cfa)

## پروژه نهایی: اپ کامل e-commerce با ۷ microservice و ۶ database

در پایان همه‌چیز را کنار هم قرار می‌دهید: serviceهای Flask، Node، Spring Boot، Go و Ruby که هر کدام به یک database جدا (چهار Mongo، یک MySQL و یک PostgreSQL) وصل هستند. همه این‌ها با یک فایل Compose، environment variableها برای ارتباط بین serviceها، volumeهای persistent و imageهایی که روی Docker Hub push کرده‌اید، مدیریت می‌شوند.

**مثال**: وقتی یک سفارش ثبت می‌کنید، موجودی (inventory) کم می‌شود، سفارش در سرویس مدیریت سفارش‌ها ظاهر می‌شود و سرویس shipping هم نوتیفای می‌شود — همه‌چیز بین زبان‌ها و databaseهای مختلف، هماهنگ و همگام می‌ماند.

[Ask AI: پروژه microservice e-commerce با Docker](https://alisol.ir/?ai=Docker%20Microservices%20E-Commerce%20Project%7CRayan%20Slim%7CDocker%20Bootcamp%3A%20Conquer%20Docker%20with%20Real-World%20Projects%7Cfa)

---

## درباره خلاصه‌کننده

من *Ali Sol* هستم، Backend Developer. اطلاعات بیشتر:  
- وب‌سایت: [alisol.ir](https://alisol.ir)  
- لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

