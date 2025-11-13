# ؜‫System Design Mock Interview: Design a Simple Authentication System | System Design Interview Prep

*(عنوان: "Design Authentication System | Design a Simple Authentication")*

* ؜**کانال/مصاحبه‌کننده؜**: ‫Interview Pen
* ؜**مدت زمان؜**: ‫00:17:17
* ؜**ویدیوی اصلی؜**: https://www.youtube.com/watch?v=uj_4vxm9u90

> *این سند خلاصه محتوای کلیدی یک مصاحبه آزمایشی طراحی سیستم رو ارائه می‌ده. ؜پیشنهاد می‌کنم اگر می‌تونی، ویدیو کامل رو ببینی.*

---

# ؜خلاصه اجرایی یک‌صفحه‌ای

؜**بیان مسئله (یک‌خطی)؜**: طراحی یک سیستم احراز هویت ساده که به کاربران اجازه ثبت‌نام، ورود و خروج بده، با تمرکز بر ورود امن برای تمایز کاربران legitimate از impersonators.

؜**دامنه اصلی؜**: تمرکز روی login و sign-out و مدیریت session، رویکرد centralized در مقابل decentralized، و امنیت؛ registration ساده و کم‌اهمیت.

؜**اولویت‌های غیرعملکردی؜**: امنیت (جلوگیری از impersonation، حفظ integrity داده)، scalability (مدیریت بار افزایشی از بررسی session)، و مقاومت در برابر حملاتی مثل CSRF یا denial of service.

؜**محدودیت‌ها و اعداد کلیدی؜**: در ویدیو بیان نشده—هیچ کاربران، QPS، latencies یا اندازه داده خاصی ذکر نشده.

؜**معماری سطح بالا (متنی)؜**:
- ؜کلاینت credentials ورود رو به API می‌فرسته، که علیه database بررسی می‌کنه.
- ؜تولید session token یا JWT برای درخواست‌های بعدی.
- ؜‫Centralized: ذخیره sessionها در database برای lookup در هر درخواست.
- ؜‫Decentralized: استفاده از JWTهای signed با secret برای verification stateless در سرویس‌ها.
- ؜ذخیره tokenها سمت کلاینت (cookies یا local storage).
- ؜مدیریت sign-out با expire tokenها یا پاک کردن ذخیره کلاینت.
- ؜اطمینان از HTTPS برای انتقال امن.

؜**مهم‌ترین trade-offها؜**:
- ؜‫Centralized sessions: خروج آسان‌تر اما بار database بالاتر و نیاز به scaling.
- ؜‫Decentralized (JWT): scalability بهتر، بدون hit database در هر درخواست، اما خروج فوری سخت‌تر.
- ؜‫Cookies: inclusion خودکار اما vulnerable به CSRF/XSS.
- ؜‫Local storage: امن‌تر در برابر CSRF اما نیاز به inclusion دستی.
- ؜عوامل انسانی: نشت tokenها توسط کاربران ریسک اصلی باقی می‌مونه، مستقل از tech.

؜**بزرگ‌ترین ریسک‌ها/حالات شکست؜**:
- ؜حدس یا forgery token اگر cryptographically secure نباشه.
- ؜حملات CSRF با ذخیره cookie-based.
- ؜overload database از lookup session در setup centralized.
- ؜نشت secret key که اجازه forgery JWT می‌ده.
- ؜ناتوانی در خروج فوری در سیستم‌های decentralized بدون expirations کوتاه.
- ؜‫Denial of service که hitهای database رو amplify می‌کنه.

؜**فلش‌کارت‌های بررسی 5 دقیقه‌ای؜**:
- ؜س: چرا HTTP stateless هست؟ → ج: هر درخواست مستقل هست؛ هیچ memory از تعاملات قبلی نداره.
- ؜س: هدف session tokenها چیه؟ → ج: شناسایی کاربران authenticated در درخواست‌ها بدون re-verification credentials.
- ؜س: نقطه ضعف auth centralized؟ → ج: هر درخواست به database hit می‌زنه، بار و نیاز به scaling رو افزایش می‌ده.
- ؜س: مزیت auth decentralized؟ → ج: بدون database مرکزی؛ سرویس‌ها tokenها رو independently verify می‌کنن.
- ؜س: ‫Cookie در مقابل local storage؟ → ج: Cookies خودکار ارسال می‌شن اما vulnerable به CSRF؛ local storage دستی اما امن‌تر.
- ؜س: ساختار JWT؟ → ج: ‫Header (algo/type)، payload (داده مثل username)، signature (برای integrity).
- ؜س: verification JWT؟ → ج: استفاده از server secret برای چک signature با header+payload.
- ؜س: خروج در JWT؟ → ج: وابسته به expiration؛ بدون revocation مرکزی بدون چک اضافی.
- ؜س: mindset امنیتی؟ → ج: هرگز به داده سمت کلاینت اعتماد کامل نکن؛ از HTTPS و تولید امن استفاده کن.
- ؜س: کی از centralized استفاده کن؟ → ج: برای سرویس‌های ساده که نیاز به خروج آسان دارن.
- ؜س: کی از decentralized استفاده کن؟ → ج: ‫Microservices یا scale بالا برای جلوگیری از bottlenecks database.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep|fa)

---

# ؜تگ‌های مصاحبه

* ؜**دامنه/صنعت؜**: در ویدیو بیان نشده
* ؜**الگوی محصول؜**: در ویدیو بیان نشده
* ؜**نگرانی‌های سیستم؜**: ‫high-availability
* ؜**زیرساخت/تکنولوژی (فقط اگر ذکر شده)؜**: ‫microservices, rest

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep|fa)

---

# ؜درک مسئله

؜**بیان اصلی مسئله؜**: طراحی یک سیستم احراز هویت که کاربران بتونن ثبت‌نام کنن، وارد بشن و خارج بشن، و تمایز بین کاربران legitimate و bad actors که impersonate می‌کنن.

؜**موارد استفاده؜**: اصلی: ورود کاربر برای انجام اقدامات مجاز (مثل admin که کاربر رو delete می‌کنه)؛ فرعی: خروج امن برای پایان sessionها.

؜**خارج از دامنه؜**: پیاده‌سازی جزئی registration، جزئیات hashing/salting password.

؜**APIها (اگر بحث شده)؜**: 
- ؜‫POST /login: {username, password} → پاسخ با session token یا JWT.
- ؜‫DELETE /user: {session_id یا JWT, target_user} → کاربر رو اگر مجاز باشه delete می‌کنه.
- ؜برای دیگران در ویدیو بیان نشده.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep|fa)

---

# ؜الزامات و محدودیت‌ها

؜**الزامات عملکردی؜**:
- ؜کاربران با ذخیره امن داده ثبت‌نام کنن.
- ؜کاربران با verification username/password وارد بشن.
- ؜کاربران خارج بشن، sessionها رو invalidate کنن.
- ؜تمایز کاربران authenticated برای اقداماتی مثل privileges admin.

؜**الزامات غیرعملکردی؜**: 
- ؜امنیت: جلوگیری از impersonation، اطمینان از integrity token، مقاومت در برابر حملات guessing.
- ؜‫Scalability: مدیریت افزایش درخواست‌ها بدون بار بیش از حد database.
- ؜در دسترس بودن: مقاوم در برابر denial of service.
- ؜‫Consistency: قوی برای چک‌های auth.

؜**فرضیات؜**: 
- ؜فرض: ‫Database برای credentials کاربر و sessionها.
- ؜فرض: ‫HTTPS برای همه ارتباطات.
- ؜فرض: تولید random cryptographically secure برای tokenها.

؜**ورودی‌های ظرفیت؜**: در ویدیو بیان نشده.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep|fa)

---

# ؜تخمین پشت‌پاکت

*“در ویدیو بیان نشده—پرش از تخمین عددی.”*

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep|fa)

---

# ؜معماری سطح بالا

- ؜کلاینت (browser/machine) درخواست ورود با credentials به API می‌فرسته.
- ؜‫API credentials رو علیه database کاربر (username, hashed password) verify می‌کنه.
- ؜برای centralized: تولید session ID امن، ذخیره در database sessionها linked به کاربر.
- ؜کلاینت token رو ذخیره می‌کنه (cookie یا local storage) و در درخواست‌های آینده include می‌کنه (مثل authorization header).
- ؜‫API session رو در database lookup می‌کنه تا کاربر و privileges رو شناسایی کنه برای اقداماتی مثل delete user.
- ؜برای decentralized: ‫Login API JWT signed با payload (username, admin status) تولید می‌کنه، ذخیره سمت کلاینت.
- ؜سرویس‌های دیگه signature JWT رو با shared secret verify می‌کنن، بدون hit database.
- ؜‫Sign-out: پاک token کلاینت؛ برای JWT، وابسته به expiration timestamp در payload.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep|fa)

---

# ؜غواصی عمیق در زیرسیستم‌ها

## ؜زیرسیستم: مدیریت Session Centralized

؜**نقش و مسئولیت‌ها؜**: ذخیره و verify tokenهای session برای حفظ state روی HTTP stateless، امکان شناسایی کاربر بدون re-authentication.

؜**مدل داده (فقط از ویدیو)؜**: جدول Sessionها: {user_id, session_id (مثل xf1de)}.

؜**APIها/قراردادها؜**: ‫Login: تولید و return session_id؛ درخواست‌های بعدی include session_id.

؜**Scaling و Partitioning؜**: ‫Database به صورت horizontal scale می‌شه؛ هر درخواست sessions table رو read می‌کنه، bottleneck احتمالی.

؜**استراتژی Caching؜**: در ویدیو بیان نشده.

؜**مدل Consistency؜**: ‫Strong consistency برای lookup sessionها.

؜**Bottlenecks و Hot Keyها؜**: بار read بالا روی جدول sessionها؛ با scaling یا decentralization mitigate کن.

؜**مدیریت شکست؜**: رد sessionهای invalid؛ مدیریت downtime database با replicas.

؜**ملاحظات هزینه؜**: هزینه database افزایشی از readهای مکرر.

[Ask AI: Subsystem - ؜Centralized Session Management](https://alisol.ir/?ai=Subsystem%20-%20Centralized%20Session%20Management%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep|fa)

## ؜زیرسیستم: مدیریت Token Decentralized (JWT)

؜**نقش و مسئولیت‌ها؜**: امکان auth stateless در سرویس‌ها با embedding داده کاربر verifiable در tokenهای ذخیره‌شده سمت کلاینت.

؜**مدل داده (فقط از ویدیو)؜**: ‫JWT: Header {alg, typ: JWT}, Payload {username, admin}, Signature (HMAC از header+payload با secret).

؜**APIها/قراردادها؜**: ‫Login API JWT تولید می‌کنه؛ APIهای دیگه signature رو verify و payload رو extract می‌کنن.

؜**Scaling و Partitioning؜**: بدون ذخیره مرکزی؛ به راحتی scale می‌شه چون verification محلی هر سرویس هست.

؜**استراتژی Caching؜**: در ویدیو بیان نشده.

؜**مدل Consistency؜**: ‫Eventual، چون state مرکزی نداره؛ وابسته به expiration برای revocation.

؜**Bottlenecks و Hot Keyها؜**: مدیریت secret؛ نشت اجازه forgery می‌ده.

؜**مدیریت شکست؜**: رد signatureهای invalid یا tokenهای expired.

؜**ملاحظات هزینه؜**: هزینه database پایین‌تر؛ compute بالاتر برای verification signature.

[Ask AI: Subsystem - ؜Decentralized Token Management (JWT)](https://alisol.ir/?ai=Subsystem%20-%20Decentralized%20Token%20Management%20%28JWT%29%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep|fa)

## ؜زیرسیستم: ذخیره Token سمت کلاینت

؜**نقش و مسئولیت‌ها؜**: ذخیره امن و include tokenهای auth در درخواست‌ها.

؜**مدل داده (فقط از ویدیو)؜**: ‫Cookies: {domain, duration, data: token}; Local storage: key-value برای token.

؜**APIها/قراردادها؜**: ‫Include در headerها (مثل Authorization: Bearer <token>).

؜**Scaling و Partitioning؜**: قابل اعمال نیست.

؜**استراتژی Caching؜**: در ویدیو بیان نشده.

؜**مدل Consistency؜**: قابل اعمال نیست.

؜**Bottlenecks و Hot Keyها؜**: ‫CSRF با cookies؛ inclusion دستی با local storage.

؜**مدیریت شکست؜**: expire cookies؛ پاک local storage در خروج.

؜**ملاحظات هزینه؜**: در ویدیو بیان نشده.

[Ask AI: Subsystem - ؜Client-Side Token Storage](https://alisol.ir/?ai=Subsystem%20-%20Client-Side%20Token%20Storage%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep|fa)

---

# ؜Trade-offها و گزینه‌های جایگزین

| موضوع | گزینه A | گزینه B | تمایل ویدیو | دلیل (از ویدیو) |
| --- ؜| --- ؜| --- ؜| --- ؜| --- ؜|
| ذخیره Session | ‫Centralized (database) | ‫Decentralized (JWT) | ‫Decentralized برای scale | ‫Centralized برای خروج آسان اما database-heavy؛ decentralized بار رو کم می‌کنه اما revocation پیچیده‌تر. ؜|
| ذخیره Token | ‫Cookies | ‫Local Storage | ‫Local Storage برای امنیت | ‫Cookies آسان اما vulnerable به CSRF؛ local storage دستی اما حملات auto-inclusion رو جلوگیری می‌کنه. ؜|
| تولید Token | سیستماتیک/قابل پیش‌بینی | ‫Cryptographically Secure Random | ‫Secure Random | قابل پیش‌بینی اجازه guessing می‌ده؛ secure ریسک impersonation رو statistically کم می‌کنه. ؜|

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep|fa)

---

# ؜قابلیت اطمینان، در دسترس بودن و عملکرد

- ؜‫Replication: replicas database برای داده session/کاربر برای مدیریت شکست‌ها.
- ؜بودجه latency: تأخیر اضافه از read database در centralized؛ حداقل در decentralized.
- ؜‫Backpressure و Throttling: در ویدیو بیان نشده.
- ؜‫Load Shedding و Degradation: در ویدیو بیان نشده.
- ؜بازیابی فاجعه: در ویدیو بیان نشده.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep|fa)

---

# ؜امنیت و حریم خصوصی

- ؜‫AuthN: verification username/password با hashing/salting.
- ؜‫AuthZ: چک privileges کاربر (مثل admin) بعد از verification.
- ؜رمزنگاری: ‫HTTPS برای انتقال؛ signatures برای integrity JWT.
- ؜جلوگیری از سوءاستفاده: تولید token امن برای جلوگیری از guessing؛ عدم اعتماد به داده کلاینت.
- ؜مدیریت PII: ذخیره hashed passwordها؛ حداقل داده حساس سمت کلاینت.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep|fa)

---

# ؜قابلیت مشاهده‌پذیری

در ویدیو بیان نشده.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep|fa)

---

# ؜سؤالات پیگیری

در ویدیو بیان نشده.

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep|fa)

---

# ؜سؤالات کاندیدا

در ویدیو بیان نشده.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep|fa)

---

# ؜نکات کلیدی

- ؜‫HTTP stateless هست، نیاز به مکانیسم‌هایی مثل sessionها یا tokenها برای احراز هویت.
- ؜‫Session tokenها کاربران رو تمایز می‌دن؛ secure تولید کن تا guessing جلوگیری بشه.
- ؜‫Auth centralized از database برای sessionها استفاده می‌کنه، خروج آسان اما بار افزایشی.
- ؜‫Auth decentralized با JWTها بهتر scale می‌شه، via signatures verify می‌شه، اما خروج وابسته به expiration.
- ؜‫Cookies ساده اما ریسک CSRF معرفی می‌کنن؛ local storage امن‌تر اما کار بیشتر.
- ؜همیشه از HTTPS استفاده کن و به داده کلاینت distrust کن برای امنیت بهتر.
- ؜انسان‌ها (مثل نشت token) اغلب ضعیف‌ترین حلقه هستن.
- ؜برای microservices، decentralized ترجیح بده تا bottlenecks database جلوگیری بشه.
- ؜تأثیر denial of service روی database در setupهای centralized رو در نظر بگیر.
- ؜‫JWTها شامل header، payload و signature هستن؛ نشت secret اجازه forgery می‌ده.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep|fa)

---

# ؜واژه‌نامه

- ؜؜**HTTP Stateless؜**: پروتکل درخواست‌ها رو مستقل مدیریت می‌کنه بدون حفظ زمینه قبلی.
- ؜؜**Session Token؜**: شناسه‌ای که درخواست‌ها رو به session کاربر authenticated لینک می‌کنه.
- ؜؜**CSRF (Cross-Site Request Forgery)؜**: حمله‌ای که از cookies auto-sent برای forgery درخواست‌ها سوءاستفاده می‌کنه.
- ؜؜**XSS (Cross-Site Scripting)؜**: حمله injection برای دزدیدن cookies یا داده.
- ؜؜**JWT (JSON Web Token)؜**: token فشرده با header، payload و signature برای auth stateless.
- ؜؜**Signature؜**: checksum برای اطمینان از integrity داده با استفاده از secret key.
- ؜؜**Asymmetric Encryption؜**: برای verification ذکر شده، اما JWT معمولاً symmetric HMAC استفاده می‌کنه.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CInterview%20Pen%7CDesign%20a%20Simple%20Authentication%20System%20%7C%20System%20Design%20Interview%20Prep|fa)

---

# ؜Attribution

* ویدیوی منبع: https://www.youtube.com/watch?v=uj_4vxm9u90
* کانال: ‫Interview Pen
* نکته: این سند خلاصه‌ای از مصاحبه آزمایشی لینک‌شده هست.

---

# ؜درباره summarizer

من *Ali Sol* هستم، توسعه‌دهنده PHP. ؜بیشتر بدون:

* وبسایت: [alisol.ir](https://alisol.ir)
* لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
