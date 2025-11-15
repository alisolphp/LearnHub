# خلاصه کتاب: System Design Interview: An Insider’s Guide


**نویسنده**: Alex Xu  

**ژانر**: مهندسی نرم‌افزار  

**تاریخ انتشار**: مارس 11, 2022.

## قبل از شروع

این خلاصه برای مرور سریع نکات کلیدی تهیه شده است. بعد از هر بخش یک لینک «Ask AI» قرار داده شده تا بتوانید عمیق‌تر کاوش کنید.

## فصل ۱: مقیاس‌پذیری از صفر تا میلیون‌ها کاربر

**خلاصه**: مسیر تکامل یک سیستم از یک سرور تک‌منظوره تا معماری‌های افقی (horizontal scaling) با load balancer، جداسازی web tier از data tier، استفاده از cache، CDN برای فایل‌های استاتیک، stateless کردن وب‌اپ با ذخیره session در shared storage، چند دیتاسنتر با geo-routing، استفاده از message queue برای decoupling، مانیتورینگ و اتوماسیون، و نهایتاً sharding دیتابیس. ایدهٔ کلیدی: افزونگی، caching، و امکان مقیاس مستقل هر لایه.

**مثال**: تصور کنید یک وبلاگ کوچک را روی یک ماشین شروع می‌کنید؛ با رشد ترافیک، چند سرور پشت یک load balancer می‌گذارید، replication می‌گیرید و پست‌های پرخواننده را در cache نگه می‌دارید تا پاسخ‌گویی سریع بماند.

**لینک برای جزئیات بیشتر**: [Ask AI: Scale from Zero to Millions of Users](https://alisol.ir/?ai=Scale%20from%20Zero%20to%20Millions%20of%20Users%7CAlex%20Xu%7CSystem%20Design%20Interview%3A%20An%20Insider%E2%80%99s%20Guide%7Cfa)

## فصل ۲: تخمین‌های سریع (Back-of-the-Envelope)

**خلاصه**: با برآوردهای تقریبی می‌توان سنجید که طراحی ما جواب‌گو هست یا نه. دانستن توان‌های دو برای اندازه‌داده‌ها، و «اعداد تأخیری» (latency numbers) مثل L1 cache در حد نانوثانیه تا disk seek در حد میلی‌ثانیه به تشخیص گلوگاه‌ها کمک می‌کند. دسترس‌پذیری با «تعداد ۹ها» سنجیده می‌شود. مثال‌هایی مثل برآورد QPS توییتر و نیاز ذخیره‌سازی نشان می‌دهد چگونه با رُند کردن اعداد و شفاف‌سازی فرضیات به جواب می‌رسیم.

**مثال**: برای یک اپ اجتماعی با ۱۵۰ میلیون کاربر روزانه که هر کدام روزی ۲ پست می‌گذارند، با تقسیم ساده به QPS حدودی می‌رسیم تا بفهمیم دیتابیس از پس بار برمی‌آید یا نه.

**لینک برای جزئیات بیشتر**: [Ask AI: Back-of-the-Envelope Estimation](https://alisol.ir/?ai=Back-of-the-Envelope%20Estimation%7CAlex%20Xu%7CSystem%20Design%20Interview%3A%20An%20Insider%E2%80%99s%20Guide%7Cfa)

## فصل ۳: فریم‌ورک برای مصاحبه‌های System Design

**خلاصه**: چهار گام پیشنهادی: ۱) شفاف‌سازی مسئله و محدوده، ۲) طرح معماری سطح‌بالا و گرفتن بازخورد، ۳) عمیق‌شدن در مؤلفه‌های کلیدی و trade-offها، ۴) جمع‌بندی و مسیرهای بهبود. تمرکز روی فرایند و همکاری است، نه راه‌حل کامل.

**مثال**: وقتی می‌گویند news feed طراحی کن، اول دربارهٔ مقیاس و فیچرها سؤال می‌پرسی، سپس تصویر کلی سرویس‌ها/دیتابیس را می‌کشی و بعد در جزئیات تولید و ranking فید عمیق می‌شوی.

**لینک برای جزئیات بیشتر**: [Ask AI: A Framework for System Design Interviews](https://alisol.ir/?ai=A%20Framework%20for%20System%20Design%20Interviews%7CAlex%20Xu%7CSystem%20Design%20Interview%3A%20An%20Insider%E2%80%99s%20Guide%7Cfa)

## فصل ۴: طراحی Rate Limiter

**خلاصه**: Rate limiting سمت کلاینت قابل اتکاء نیست؛ سمت سرور/گیت‌وی بهتر است. الگوریتم‌ها: token bucket (پذیرش burst)، leaky bucket (خروجی یکنواخت)، fixed/sliding window counter و sliding window log (دقیق‌تر ولی پرهزینه). در محیط توزیع‌شده از Redis یا consistent hashing کمک می‌گیریم. لاگ‌کردن، پاسخ 429، و مانع‌نشدن در خطاهای موقتی مهم است.

**مثال**: سطلی از tokenها که با نرخ مشخص پر می‌شود؛ هر درخواست یک token برمی‌دارد وگرنه منتظر می‌ماند—مناسب APIهایی که burst کوتاه دارند.

**لینک برای جزئیات بیشتر**: [Ask AI: Design a Rate Limiter](https://alisol.ir/?ai=Design%20a%20Rate%20Limiter%7CAlex%20Xu%7CSystem%20Design%20Interview%3A%20An%20Insider%E2%80%99s%20Guide%7Cfa)

## فصل ۵: طراحی Consistent Hashing

**خلاصه**: توزیع کلیدها روی «حلقه» و انتساب به سرور ساعت‌گرد بعدی؛ با virtual nodeها تعادل بار بهتر می‌شود و در تغییر مقیاس فقط بخش کوچکی از کلیدها جابه‌جا می‌شوند. کاربردها: load balancerها، CDN، و تولیدکننده‌های ID.

**مثال**: سرورها را مثل نقاط یک ساعت در نظر بگیرید؛ هر کلید روی ساعت می‌نشیند و به اولین سرور جلویی‌اش می‌رود؛ افزودن سرور فقط کلیدهای همسایه را جابه‌جا می‌کند.

**لینک برای جزئیات بیشتر**: [Ask AI: Design Consistent Hashing](https://alisol.ir/?ai=Design%20Consistent%20Hashing%7CAlex%20Xu%7CSystem%20Design%20Interview%3A%20An%20Insider%E2%80%99s%20Guide%7Cfa)

## فصل ۶: طراحی Key-Value Store

**خلاصه**: از partitioning با consistent hashing، replication برای افزونگی، و versioning برای حل conflict استفاده می‌شود. سازوکار quorum با پارامترهای N/W/R توازن consistency/availability را تنظیم می‌کند. همسان‌سازی با anti-entropy و Merkle tree؛ نگهداری داده با SSTable و compaction.

**مثال**: یک «فرهنگ لغت عظیم» توزیع‌شده که کلیدها روی چند سرور تکرار می‌شوند؛ در خطا replica جایگزین می‌شود و نسخه‌ها کمک می‌کنند تعارض‌ها حل شوند.

**لینک برای جزئیات بیشتر**: [Ask AI: Design a Key-Value Store](https://alisol.ir/?ai=Design%20a%20Key-Value%20Store%7CAlex%20Xu%7CSystem%20Design%20Interview%3A%20An%20Insider%E2%80%99s%20Guide%7Cfa)

## فصل ۷: طراحی تولیدکنندهٔ Unique ID در سیستم‌های توزیع‌شده

**خلاصه**: نیازها: عددی، ۶۴بیتی، مرتب بر اساس زمان، و سریع. UUID منحصربه‌فرد است ولی مرتب‌شدنی نیست. ticket server ساده است ولی SPOF دارد. Snowflake توییتر از timestamp، شناسهٔ datacenter/worker و sequence استفاده می‌کند (حدود ۴۰۹۶ ID در میلی‌ثانیه برای هر نود) و با عقب‌گرد ساعت مقابله می‌کند.

**مثال**: مهر زمانی + شناسهٔ ماشین + شمارندهٔ سریع؛ هم یکتایی حفظ می‌شود هم ترتیب زمانی.

**لینک برای جزئیات بیشتر**: [Ask AI: Design a Unique ID Generator in Distributed Systems](https://alisol.ir/?ai=Design%20a%20Unique%20ID%20Generator%20in%20Distributed%20Systems%7CAlex%20Xu%7CSystem%20Design%20Interview%3A%20An%20Insider%E2%80%99s%20Guide%7Cfa)

## فصل ۸: طراحی URL Shortener

**خلاصه**: نگاشت URLهای بلند به کلیدهای کوتاه با ریدایرکت 301. تولید کلید با hashing و base62 (۷ کاراکتر ≈ ۳.۵ تریلیون ترکیب). برای برخوردها (collision) می‌شود از Bloom filter یا suffix ترتیبی استفاده کرد. APIها با POST برای کوتاه‌سازی و GET برای ریدایرکت. Rate limit و analytics نیز افزوده می‌شود.

**مثال**: یک URL بلند را hash می‌کنیم و کدی مثل «abc123» می‌سازیم؛ tiny.url/abc123 به مقصد اصلی ریدایرکت می‌شود.

**لینک برای جزئیات بیشتر**: [Ask AI: Design a URL Shortener](https://alisol.ir/?ai=Design%20a%20URL%20Shortener%7CAlex%20Xu%7CSystem%20Design%20Interview%3A%20An%20Insider%E2%80%99s%20Guide%7Cfa)

## فصل ۹: طراحی Web Crawler

**خلاصه**: شروع از seed URLها، رعایت politeness (robots.txt و delay)، صف‌بندی، استخراج لینک‌ها، اولویت‌دهی با PageRank/تازگی. در مقیاس بزرگ: sharding URLها، حذف duplicteها با hash، و ذخیره‌سازی مقیاس‌پذیر. توجه به extensibility و مقاومت در برابر trap/spam ضروری است.

**مثال**: مثل یک کتابدار ربات که از کتاب‌های محبوب شروع می‌کند، ارجاعات را دنبال می‌کند و مؤدبانه از هر قفسه عبور می‌کند.

**لینک برای جزئیات بیشتر**: [Ask AI: Design a Web Crawler](https://alisol.ir/?ai=Design%20a%20Web%20Crawler%7CAlex%20Xu%7CSystem%20Design%20Interview%3A%20An%20Insider%E2%80%99s%20Guide%7Cfa)

## فصل ۱۰: طراحی Notification System

**خلاصه**: ارسال هشدارها از طریق push، SMS و ایمیل؛ پلتفرم‌ها: APNs برای iOS و FCM برای Android. گردآوری مخاطبان، صف‌بندی پیام‌ها، workerها برای ارسال، retry با exponential backoff، استفاده از template برای کاهش اسپم، و مانیتورینگ نرخ تحویل.

**مثال**: دوستتان پستی می‌گذارد؛ پیام در صف می‌رود، قالب می‌خورد و به صورت push ارسال می‌شود—اگر آفلاین بود، retry می‌شود.

**لینک برای جزئیات بیشتر**: [Ask AI: Design a Notification System](https://alisol.ir/?ai=Design%20a%20Notification%20System%7CAlex%20Xu%7CSystem%20Design%20Interview%3A%20An%20Insider%E2%80%99s%20Guide%7Cfa)

## فصل ۱۱: طراحی News Feed

**خلاصه**: دو الگو: fanout-on-write (پیش‌ساختن فید در cache؛ مناسب اغلب کاربران، نه سلبریتی‌ها) و fanout-on-read (تازه‌خوانی برای کاربران کم‌فعال). ranking با گراف اجتماعی و مدل‌های ML؛ sharding بر اساس user برای توازن بار.

**مثال**: فید شما پیشاپیش از پست‌های دوستان ساخته و در cache نگه داشته می‌شود تا با باز کردن اپ فوراً آماده باشد.

**لینک برای جزئیات بیشتر**: [Ask AI: Design a News Feed System](https://alisol.ir/?ai=Design%20a%20News%20Feed%20System%7CAlex%20Xu%7CSystem%20Design%20Interview%3A%20An%20Insider%E2%80%99s%20Guide%7Cfa)

## فصل ۱۲: طراحی Chat System

**خلاصه**: تحقق real-time با polling، long polling یا WebSocket. ذخیره‌سازی با key-value برای append سریع؛ وضعیت آنلاین با heartbeat. مسیریابی گروه‌ها با کلیدگذاری مناسب؛ مقیاس‌پذیری با consistent hashing.

**مثال**: WebSocket مثل یک خط باز تلفنی است: پیام‌ها بی‌درنگ ردوبدل می‌شوند بدون چک‌کردن‌های پیاپی.

**لینک برای جزئیات بیشتر**: [Ask AI: Design a Chat System](https://alisol.ir/?ai=Design%20a%20Chat%20System%7CAlex%20Xu%7CSystem%20Design%20Interview%3A%20An%20Insider%E2%80%99s%20Guide%7Cfa)

## فصل ۱۳: طراحی Search Autocomplete

**خلاصه**: ساخت پیشنهادها با trie برای prefix lookup و وزن‌دهی بر اساس محبوبیت. جمع‌آوری دادهٔ تاریخی، top-k با heap، sharding بر اساس حروف، replication برای uptime و cache برای سرعت. رفع typo با فاصلهٔ Levenshtein.

**مثال**: با تایپ «tw»، «twitter» از ساختار trie بیرون کشیده و بر اساس فراوانی جستجو بالا می‌آید.

**لینک برای جزئیات بیشتر**: [Ask AI: Design a Search Autocomplete System](https://alisol.ir/?ai=Design%20a%20Search%20Autocomplete%20System%7CAlex%20Xu%7CSystem%20Design%20Interview%3A%20An%20Insider%E2%80%99s%20Guide%7Cfa)

## فصل ۱۴: طراحی YouTube

**خلاصه**: بارگذاری و transcoding ویدئو به فرمت‌های مختلف و استریم از طریق CDN. استفاده از DAG برای موازی‌سازی encoding، بهینه‌سازی‌هایی مثل parallel upload و pre-signed URL. ویدئوهای محبوب از CDN سرو می‌شوند و بقیه از origin. خطاها با retry و failover مدیریت می‌شوند.

**مثال**: یک کلیپ آپلود می‌کنید؛ فایل تکه‌تکه و برای دستگاه‌های مختلف encode می‌شود و از نزدیک‌ترین سرورها استریم می‌گردد.

**لینک برای جزئیات بیشتر**: [Ask AI: Design YouTube](https://alisol.ir/?ai=Design%20YouTube%7CAlex%20Xu%7CSystem%20Design%20Interview%3A%20An%20Insider%E2%80%99s%20Guide%7Cfa)

## فصل ۱۵: طراحی Google Drive

**خلاصه**: همگام‌سازی فایل‌ها با delta update و فشرده‌سازی برای صرفه‌جویی در پهنا. فایل‌ها به بلاک‌ها شکسته و روی object storage (مثل S3) ذخیره می‌شوند؛ متادیتا در دیتابیس. اعلان تغییرات با long polling، حل conflict با نسخه‌بندی، deduplication و محدودیت نسخه برای صرفه‌جویی فضا.

**مثال**: روی گوشی تغییر کوچکی می‌دهید؛ فقط همان تغییر ارسال می‌شود و لپ‌تاپتان نوتیف می‌گیرد تا به‌روزرسانی را بکشد.

**لینک برای جزئیات بیشتر**: [Ask AI: Design Google Drive](https://alisol.ir/?ai=Design%20Google%20Drive%7CAlex%20Xu%7CSystem%20Design%20Interview%3A%20An%20Insider%E2%80%99s%20Guide%7Cfa)

## فصل ۱۶: ادامهٔ یادگیری

**خلاصه**: یادگیری مداوم از معماری‌های واقعی—وبلاگ‌های شرکت‌ها و مقالاتی دربارهٔ فید فیس‌بوک، پشتهٔ نتفلیکس، مقیاس یوتیوب و غیره—تا اصول و فناوری‌های به‌روز را بیاموزید.

**مثال**: مثلاً مطالعهٔ مقیاس‌پذیری Dropbox برای همگام‌سازی—الهام برای راه‌حل‌های خودتان.

**لینک برای جزئیات بیشتر**: [Ask AI: The Learning Continues](https://alisol.ir/?ai=The%20Learning%20Continues%7CAlex%20Xu%7CSystem%20Design%20Interview%3A%20An%20Insider%E2%80%99s%20Guide%7Cfa)

---
## دربارهٔ خلاصه‌کننده

من *Ali Sol* هستم، یک PHP Developer.  

* وب‌سایت: [alisol.ir](https://alisol.ir)  

* لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

