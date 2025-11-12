# ؜طراحی سیستم Autocomplete برای موتور جستجو (Typeahead Suggestions)

- ؜این سند، خلاصه‌ی یک ؜**System Design Mock Interview؜** برای طراحی قابلیت ؜**autocomplete / typeahead؜** در موتورهای جستجو (مثل Google Search) است. ؜ 
- ؜کانال / مصاحبه‌کننده: ؜**Tushar Roy - ؜Coding Made Simple؜**  
- ؜مدت ویدیو: حدود ۰۰:۱۹:۴۳ دقیقه  
- ؜لینک ویدیو: https://www.youtube.com/watch?v=us0qySiUsGU  

> این خلاصه، محتوای اصلی صحبت‌ها درباره‌ی طراحی یک سیستم autocomplete را جمع‌بندی می‌کند. ؜دیدن خود ویدیو هم همچنان مفید است.

---

## ؜بخش ۲) خلاصه اجرایی یک‌صفحه‌ای

؜**صورت مسئله (در یک جمله)؜**  
طراحی یک سیستم autocomplete با ؜**availability؜** بالا و ؜**latency؜** بسیار پایین که با گرفتن یک prefix از کاربر، در لحظه مرتبط‌ترین پیشنهادهای جستجو را برگرداند.

؜**دامنه‌ی اصلی؜**

- ؜موارد داخل دامنه:
  - ؜مسیر از لحظه‌ی تایپ کاربر در search box تا نمایش پیشنهادها.
  - ؜مدل داده و استفاده از ؜**Trie؜** برای ایندکس کردن عبارت‌ها.
  - ؜توزیع Trie بین چند ماشین با استفاده از prefix range ها.
  - ؜؜**Data pipeline؜** برای جمع‌آوری رویدادهای `(phrase, weight)`.
  - ؜؜**Aggregation؜** و اعمال دوره‌ای وزن phrase ها روی Trie.
  - ؜استراتژی‌های ؜**Caching؜** (distributed cache، CDN، client prefetch).

- ؜موارد خارج از دامنه:
  - ؜Spell check / spell correction.
  - ؜نتایج محلی (locality) مثل تفاوت شهرها / کشورها.
  - ؜Personalization بر اساس history کاربر.
  - ؜چندزبانه بودن (فقط انگلیسی در نظر گرفته شده).
  - ؜جزئیات الگوریتم دقیق ranking یا مدل‌های ML.
  - ؜طراحی واقعی داخلی Google / Bing (این فقط یک طراحی منطقی است، نه طراحی واقعی آن‌ها).

؜**اولویت‌های غیرفنی؜**

- ؜؜**Availability؜**: سیستم باید حتی در صورت از دست رفتن node ها هم کار کند → replication برای Trie و داده‌ها.
- ؜؜**Low Latency؜**: پیشنهادها باید “لحظه‌ای” حس شوند؛ در عمل یعنی ده‌ها میلی‌ثانیه.
- ؜؜**Scalability؜**: پشتیبانی از میلیون‌ها / میلیاردها phrase و QPS بالا.
- ؜؜**Durability؜**: از دست نرفتن داده‌های محبوب (مثلاً با ذخیره‌ی آمار phrase ها در دیتابیس توزیع‌شده مثل Cassandra).
- ؜؜**Freshness؜**: phrase های ترند و جدید باید سریع در autocomplete دیده شوند → استفاده از time bucket ها و rebuild دوره‌ای.
- ؜؜**هزینه؜**: با sharding مناسب و prune کردن phrase های کم‌اهمیت، مصرف حافظه و storage کنترل می‌شود.

؜**اعداد و محدودیت‌های کلیدی؜**

- ؜در ویدیو عدد دقیق برای QPS، هدف latency، اندازه‌ی داده و تعداد region ها داده نشده است.

؜**معماری سطح بالا (متنی)؜**

۱. ؜Client (Browser / App): حین تایپ، prefix را برای backend می‌فرستد. ؜ 
۲. ؜Load Balancer: درخواست‌ها را بین node های stateless frontend پخش می‌کند. ؜ 
۳. ؜Frontend Autocomplete Service:
   - ؜ابتدا در distributed cache دنبال prefix می‌گردد.
   - ؜اگر cache miss شد، از یک config store شبیه Zookeeper می‌پرسد کدام shard مالک آن prefix است.
۴. ؜Trie Shard Nodes:
   - ؜هر node یک Trie در حافظه برای یک prefix range خاص دارد.
   - ؜هر node در Trie، top-K suggestion ها را برای آن prefix نگه می‌دارد.
5. ؜Coordination / Metadata (Zookeeper):
   - ؜نگه‌دار mapping از prefix range ها (مثل `[a, k)`، `[k, $)`) به گروهی از Trie nodes (برای replication).
6. ؜Data Collection Pipeline:
   - ؜stream رویدادهای `(phrase, weight)` را از منابع مختلف دریافت می‌کند و به aggregator ها می‌دهد.
7. ؜Aggregators + Cassandra:
   - ؜aggregator ها وزن phrase ها را در time bucket ها جمع می‌زنند و در یک دیتابیس توزیع‌شده ذخیره می‌کنند.
8. ؜Applier Jobs:
   - ؜به‌صورت دوره‌ای برای هر prefix range، داده‌های جمع‌شده را می‌خوانند، وزن‌ها را حساب و Trie جدید را می‌سازند و روی shard ها deploy می‌کنند.
9. ؜CDN + Client Prefetch:
   - ؜prefix های محبوب را در edge cache می‌کند و prefix های بعدی احتمالی را سمت client پیشاپیش می‌فرستد.

؜**مهم‌ترین trade-off ها؜**

- ؜نگه‌داشتن top-K در هر node از Trie در برابر محاسبه‌ی top-K در زمان query.
- ؜داشتن یک Trie بزرگ در برابر چند Trie شارد شده بر اساس prefix range.
- ؜استفاده از time-bucketed weight ها در برابر یک count کلی ساده.
- ؜استفاده‌ی قوی از cache / CDN / client prefetch در برابر تکیه‌ی صرف بر backend.

؜**بزرگ‌ترین ریسک‌ها و failure mode ها؜**

- ؜Hot prefix / hot key (مثل "f"، "face") که می‌تواند shard یا cache key خاصی را داغ کند.
- ؜خطا در config / coordination (مثلاً mapping اشتباه در Zookeeper).
- ؜failure در applier ها → قدیمی شدن پیشنهادها.
- ؜ناسازگاری cache با داده‌ی جدید در Trie (staleness).
- ؜skew در داده (بعضی range ها خیلی پرعبارت، بعضی خیلی کم).

؜**فلش‌کارت مرور ۵ دقیقه‌ای (سؤال → جواب)؜**

۱. ؜ساختار داده‌ی اصلی برای autocomplete چیست؟  
   → یک Trie که در هر node، فرزندان و top-K phrase ها برای آن prefix نگه داشته می‌شود.

۲. ؜چرا top-K را در هر node نگه می‌داریم؟  
   → تا بتوانیم فقط با پیمایش طول prefix، پیشنهادها را بدهیم و لازم نباشد کل subtree را بگردیم.

۳. ؜Trie چطور روی چند ماشین توزیع می‌شود؟  
   → با تقسیم فضای prefix به بازه‌های لغت‌نامه‌ای (lexicographic range مثل `[a, k)` و `[k, $)`) و map کردن هر range به یک گروه از سرورها.

۴. ؜Frontend چطور می‌فهمد کدام shard را صدا بزند؟  
   → با خواندن config از Zookeeper که mapping prefix range → لیست node ها را نگه می‌دارد.

۵. ؜داده‌های واقعی user چطور روی autocomplete اثر می‌گذارند؟  
   → با جمع‌آوری `(phrase, weight)`، ذخیره در Cassandra به‌صورت time-bucketed و rebuild دوره‌ای Trie توسط applier jobs.

۶. ؜چرا phrase data همراه با timestamp (مثلاً hourly bucket) ذخیره می‌شود؟  
   → برای این‌که بتوانیم به داده‌ی جدیدتر وزن بیشتری بدهیم.

۷. ؜نقش distributed cache چیست؟  
   → cache کردن `prefix → suggestion list` برای این‌که همیشه به shard ها hit نزنیم.

۸. ؜فایده‌ی اصلی استفاده از CDN برای autocomplete چیست؟  
   → پاسخ‌گویی به prefix های خیلی محبوب، خیلی نزدیک به کاربر، که latency و load روی data center را کم می‌کند.

۹. ؜دو جریان اصلی سیستم چه هستند؟  
   → request flow (پاسخ به autocomplete) و data collection flow (جمع‌آوری و اعمال وزن phrase ها).

۱۰. ؜آیا این طراحی از نظر رفتار کاربر strongly consistent است؟  
    → نه، ؜**eventually consistent؜** است؛ ترندهای جدید بعد از اجرای aggregation و applier ها دیده می‌شوند.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search|fa)

---

## ؜بخش ۳) تگ‌های مصاحبه (Interview Tags)

- ؜دامنه / صنعت: `search`  
- ؜الگوی محصول: `search-index`، `caching`، `cdn`  
- ؜نگرانی‌های سیستمی: `high-availability`، `low-latency`، `eventual-consistency`، `hot-key`  
- ؜تکنولوژی‌ها: `cassandra`، `cdn`، `caching`

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search|fa)

---

## ؜بخش ۴) درک مسئله (Problem Understanding)

؜**صورت سؤال (بازنویسی)؜**  
طراحی قابلیت autocomplete برای موتور جستجو (مثلاً Google یا Bing) که هم‌زمان با تایپ کاربر در search box، پیشنهادهای خوبی برای کامل‌ کردن query فعلی نمایش بدهد.

؜**Use Case های اصلی؜**

- ؜کاربر شروع به تایپ می‌کند ("how does…" ،"ba…" و …) و در dropdown زیر search box:
  - ؜چند پیشنهاد کامل‌شده می‌بیند،
  - ؜می‌تواند یکی را انتخاب کند یا به تایپ ادامه بدهد.

؜**Use Case های ثانویه؜**

- ؜پشتیبانی از تعداد عظیم phrase (میلیون‌ها / میلیاردها).
- ؜هماهنگی با رفتار واقعی کاربران (ترندها، اخبار، اتفاقات روز).

؜**خارج از محدوده؜**

- ؜Spell-check یا اصلاح املا حین تایپ.
- ؜Locality / geo-specific suggestions.
- ؜Personalization با توجه به کاربر.
- ؜زبان‌های غیر از انگلیسی.

؜**API ها؜**

- ؜Autocomplete Service:
  - ؜ورودی: `prefix` (string).
  - ؜خروجی: `list<phrase>` (لیست پیشنهادها با طول K).

- ؜Data Collection Ingest:
  - ؜ورودی: stream از `(phrase, weight)`.
  - ؜خروجی: ارسال این event ها به aggregation system (جزئیات پروتکل در ویدیو گفته نشده).

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search|fa)

---

## ؜بخش ۵) نیازمندی‌ها و محدودیت‌ها (Requirements & Constraints)

؜**نیازمندی‌های عملکردی (Functional)؜**

- ؜با دریافت یک prefix، برگرداندن لیست rank شده از پیشنهادهای autocomplete.
- ؜وابستگی پیشنهادها به وزن / محبوبیت phrase ها.
- ؜داشتن دو جریان:
  - ؜request flow (خدمت‌دهی آنلاین به کاربر)،
  - ؜data collection & aggregation (جمع‌آوری و اعمال آمار phrase ها روی Trie).

؜**نیازمندی‌های غیرفنی (Non-Functional)؜**

- ؜Availability بالا:
  - ؜چند replica برای هر prefix range.
- ؜Latency پایین:
  - ؜استفاده از in-memory Trie،
  - ؜precompute کردن top-K در هر node،
  - ؜استفاده از distributed cache، CDN و client-side prefetch.
- ؜Scalability:
  - ؜پشتیبانی از تعداد زیاد phrase و query.
  - ؜sharding Trie با تقسیم prefix space.
- ؜Durability:
  - ؜ذخیره‌ی آمار phrase ها در دیتابیس توزیع‌شده (مثل Cassandra).
  - ؜replication برای داده‌ی Trie.
- ؜Freshness / Eventual consistency:
  - ؜داده‌ی جدید ابتدا در log و Cassandra ذخیره، و بعد از مدتی وارد Trie می‌شود.

؜**Capacity Inputs (در ویدیو)؜**

- ؜هیچ عدد مشخصی برای QPS، latency target، data size و … داده نشده است.

؜**فرضیات؜**

- ؜K (تعداد پیشنهادها برای هر prefix) نسبتاً کوچک است (مثلاً ۵–۱۰).
- ؜deployment در چند ماشین / zone برای تحمل خطا.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search|fa)

---

## ؜بخش ۶) تخمین سرانگشتی (Back-of-the-Envelope Estimation)

در خود ویدیو، وارد اعداد دقیق (مثل حجم حافظه برای Trie، تعداد phrase ها، QPS و …) نمی‌شود و این بخش عملاً رد می‌شود. ؜اگر در یک مصاحبه واقعی باشید، می‌توانید:

- ؜تخمین بزنید چند query در ثانیه داریم،
- ؜متوسط طول phrase ها چقدر است،
- ؜چه بخشی از phrase ها باید در Trie نگه داشته شود،
- ؜و حدود مصرف حافظه / storage را حساب کنید.

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search|fa)

---

## ؜بخش ۷) معماری سطح بالا (High-Level Architecture)

؜**اجزاء و جریان داده؜**

۱. ؜Client (Browser / App): حین تایپ، prefix های جدید را به سرور می‌فرستد. ؜ 
۲. ؜Load Balancer: درخواست‌ها را بین frontend ها توزیع می‌کند. ؜ 
۳. ؜Frontend Autocomplete Service:
   - ؜چک کردن distributed cache برای prefix.
   - ؜در صورت cache miss، پرسیدن mapping از Zookeeper و تماس با Trie shard. ؜ 
۴. ؜Coordination / Config Store (مانند Zookeeper):
   - ؜نگه‌داری mapping از prefix range ها به group های shard nodes.
   - ؜شروع ساده با یک range `[a, $)` و سه node، و بعدها split به range های ریزتر. ؜ 
۵. ؜Trie Shard Nodes:
   - ؜نگه داشتن Trie در حافظه برای یک range خاص.
   - ؜هر node در Trie، علاوه بر children، لیستی از top-K phrase ها برای آن prefix دارد. ؜ 
۶. ؜Distributed Cache:
   - ؜کلید: prefix
   - ؜مقدار: لیست suggestion ها
   - ؜کمک به کاهش load روی shard ها. ؜ 
۷. ؜Data Collection Pipeline:
   - ؜جمع‌آوری `(phrase, weight)` از سرچ‌لاگ و منابع دیگر و ارسال به aggregator ها. ؜ 
۸. ؜Aggregators + Cassandra:
   - ؜جمع‌زدن وزن phrase ها در time bucket ها (مثلاً hourly)،
   - ؜ذخیره در جدول time-series در Cassandra. ؜ 
۹. ؜Applier Jobs:
   - ؜خواندن داده از Cassandra برای یک prefix range،
   - ؜محاسبه‌ی وزن با درنظرگرفتن تازگی،
   - ؜ساخت Trie جدید و push آن به shard های آن range. ؜ 
۱۰. ؜CDN + Client Prefetch:
    - ؜cache کردن نتایج prefix های محبوب در edge،
    - ؜prefetch کردن prefix های بعدی احتمالی سمت client.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search|fa)

---

## ؜بخش ۸) زیرسیستم‌ها (Deep Dives by Subsystem)

### ؜بخش ۸٫۱) زیرسیستم Request Flow

؜**نقش؜**

- ؜پاسخ دادن سریع به درخواست autocomplete برای یک prefix.
- ؜تحمل QPS بالا با latency پایین.
- ؜استفاده از replication و caching برای در دسترس بودن.

؜**مدل داده؜**

- ؜ورودی: `prefix`
- ؜خروجی: `list<phrase>` (top-K suggestion ها)
- ؜داده‌ی پایداری در این لایه نوشته نمی‌شود؛ فقط خواننده‌ی Trie و cache است.

؜**جریان؜**

۱. ؜client، prefix را به load balancer می‌فرستد. ؜ 
۲. ؜load balancer درخواست را به یک frontend می‌دهد. ؜ 
۳. ؜frontend:
   - ؜distributed cache را چک می‌کند؛ اگر hit بود، نتیجه را برمی‌گرداند؛
   - ؜اگر miss:
     - ؜از Zookeeper می‌پرسد shard مربوط به prefix چیست،
     - ؜به یکی از node های آن shard درخواست می‌فرستد. ؜ 
۴. ؜Trie node:
   - ؜Trie را براساس کاراکترهای prefix پیمایش می‌کند،
   - ؜از node نهایی، top-K را می‌خواند و برمی‌گرداند. ؜ 
۵. ؜frontend:
   - ؜نتیجه را در cache ذخیره می‌کند،
   - ؜آن را به client برمی‌گرداند.

؜**Scalability؜**

- ؜frontend ها stateless هستند → scale افقی ساده.
- ؜cache و Trie توزیع‌شده و shard شده‌اند.
- ؜sharding واقعی روی Trie انجام می‌شود، frontend فقط routing می‌کند.

[Ask AI: Subsystem - ؜Request Flow](https://alisol.ir/?ai=Subsystem%20-%20Request%20Flow%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search|fa)

---

### ؜بخش ۸٫۲) زیرسیستم Data Collection & Aggregation

؜**نقش؜**

- ؜دریافت رویدادهای `(phrase, weight)` از log ها و منابع دیگر.
- ؜aggregate کردن و ذخیره‌ی آمار phrase ها به تفکیک زمان.
- ؜آماده‌کردن داده برای applier ها که Trie را می‌سازند.

؜**مدل داده در Cassandra (مثال)؜**

- ؜ستون‌ها:
  - ؜`phrase`
  - ؜`time` (مثلاً hourly bucket)
  - ؜`sum_of_weights` برای آن phrase در آن بازه

؜**روند کار؜**

۱. ؜سیستم log، event های `(phrase, weight)` تولید می‌کند. ؜ 
۲. ؜بر اساس hash phrase، هر event به یک aggregator خاص route می‌شود. ؜ 
۳. ؜aggregator:
   - ؜در حافظه، counter phrase ها را برای time window فعلی نگه می‌دارد؛
   - ؜به‌صورت دوره‌ای، مجموع را در Cassandra برای `(phrase, time_bucket)` به‌روزرسانی می‌کند. ؜ 
۴. ؜در بازه‌های بلندتر (مثلاً روزانه)، داده‌های ساعتی قدیمی می‌توانند aggregate و سپس حذف شوند. ؜ 
۵. ؜phrase هایی که مجموع وزن خیلی کمی دارند، می‌توانند prune شوند تا اصلاً وارد Trie نشوند.

؜**چرا time-based storage؟؜**

- ؜امکان وزن دادن به داده‌ی اخیر بیشتر از داده‌ی قدیمی.
- ؜applier می‌تواند تصمیم بگیرد چقدر به امروز / دیروز / هفته‌ی قبل وزن بدهد.

[Ask AI: Subsystem - ؜Data Collection & Aggregation](https://alisol.ir/?ai=Subsystem%20-%20Data%20Collection%20%26%20Aggregation%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search|fa)

---

### ؜بخش ۸٫۳) زیرسیستم Trie Storage & Sharding

؜**نقش؜**

- ؜نگه‌داری داده‌های autocomplete به شکلی که:
  - ؜lookup prefix سریع باشد،
  - ؜داده روی چند ماشین توزیع شود،
  - ؜replication برای availability وجود داشته باشد.

؜**مدل داده؜**

- ؜هر node در Trie:
  - ؜children برای کاراکترهای بعدی،
  - ؜لیستی از `top_K_terms` برای prefix مربوطه.

؜**Scaling & Partitioning؜**

- ؜شروع ساده:  
  - ؜کل Trie در یک ماشین، با چند replica (مثلاً T1, T2, T3).
- ؜در مقیاس بزرگ‌تر:
  - ؜تقسیم رنج prefix به چند بازه:
    - ؜`[a, k)` → {T1, T2, T3}
    - ؜`[k, $)` → {T4, T5, T6}
  - ؜و بعداً split های بیش‌تر مثل:
    - ؜`[a, bc)` → {T1, T2, T3}
    - ؜`[bc, k)` → {T7, T8, T9}
    - ؜`[k, $)` → {T4, T5, T6}
- ؜mapping این range ها در Zookeeper نگه داشته می‌شود.

؜**Consistency؜**

- ؜applier ها دوره‌ای Trie جدید می‌سازند و روی node ها deploy می‌کنند.
- ؜در فاصله‌ی بین دو deploy، سیستم نسبت به داده‌ی جدید eventually consistent است.
- ؜replica های هر range باید نسخه‌ی تقریباً مشابهی از Trie داشته باشند.

[Ask AI: Subsystem - ؜Trie Storage & Sharding](https://alisol.ir/?ai=Subsystem%20-%20Trie%20Storage%20%26%20Sharding%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search|fa)

---

## ؜بخش ۹) Trade-Off ها و گزینه‌های جایگزین

| موضوع                                     | گزینه A (در ویدیو)                                         | گزینه B (در ویدیو یا ضمنی)                                     | ترجیح ویدیو          | دلیل (از ویدیو)                                                                     |
|------------------------------------------|-------------------------------------------------------------|-----------------------------------------------------------------|----------------------|--------------------------------------------------------------------------------------|
| پیدا کردن top-K برای یک prefix          | نگه‌داشتن `top_k_terms` در هر node از Trie                 | محاسبه‌ی top-K با گشتن کل subtree در زمان query               | گزینه A             | جلوگیری از پیمایش کل subtree و رسیدن به O(length(prefix)) برای پاسخ‌گویی.          |
| نگه‌داری محبوبیت phrase                 | استفاده از time-bucketed weights (ساعتی / روزانه)         | نگه‌داشتن یک count کلی برای هر phrase                         | گزینه A             | امکان دادن وزن بیشتر به داده‌ی جدید نسبت به قدیمی.                                 |
| Deployment Trie                          | یک Trie بزرگ با چند replica                                | چند Trie shard شده بر اساس prefix range                        | شارد شده (در مقیاس) | شروع ساده با یک Trie خوب است، ولی در مقیاس بزرگ باید sharding انجام شود.           |
| ذخیره‌ی config / metadata               | استفاده از Zookeeper برای mapping prefix range → node ها   | configهای hard-coded یا mapping در سطح application             | Zookeeper            | پشتیبانی از read زیاد، write کم و availability بالا.                                |
| Serving requests                         | استفاده از چند لایه‌ی cache → Trie → persistent storage    | همیشه hit به Trie (بدون cache / CDN)                          | Cache + Trie         | cache/CDN latency و load را کم می‌کنند؛ بدون آن ممکن است کند و گران شود.           |
| trending در برابر محبوبیت بلندمدت       | ترکیب وزن‌ها با time-decay (وزن بیشتر به داده‌ی جدید)     | برخورد برابر با داده‌ی قدیمی و جدید                          | time-weighted        | برای این‌که ترندهای فعلی بالاتر از رویدادهای قدیمی نمایش داده شوند.               |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search|fa)

---

## ؜بخش ۱۰) قابلیت اطمینان، در دسترس بودن و کارایی

؜**Replication و Availability؜**

- ؜هر prefix range روی چند node (مثلاً ۳ تا) replica می‌شود.
- ؜اگر یک node از بین برود، replica های دیگر آن range درخواست‌ها را پاسخ می‌دهند.
- ؜Zookeeper معمولاً خود با چند replica deploy می‌شود تا config همیشه در دسترس باشد.

؜**Latency (کیفی)؜**

- ؜مسیر ایده‌آل:
  - ؜client → frontend → cache → client
- ؜در صورت cache miss:
  - ؜یک hop اضافی به Trie shard node.
- ؜با CDN و client prefetch می‌توان بسیاری از درخواست‌ها را حتی قبل از رسیدن به data center پاسخ داد.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search|fa)

---

## ؜بخش ۱۱) امنیت و حریم خصوصی (Security & Privacy)

در ویدیو به‌طور خاص وارد بحث‌های امنیتی و حریم خصوصی نمی‌شود، مثل:

- ؜Authentication / Authorization بین سرویس‌های داخلی،
- ؜نحوه‌ی برخورد با PII کاربران،
- ؜جلوگیری از abuse / spam در autocomplete.

اما در یک طراحی واقعی، باید این موارد را جداگانه در نظر گرفت.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search|fa)

---

## ؜بخش ۱۲) مشاهده‌پذیری (Observability)

در این ویدیو به‌طور مستقیم از موارد زیر صحبت نمی‌شود:

- ؜Metrics (مثل QPS، latency، error rate، cache hit ratio و …)،
- ؜Logging و tracing،
- ؜Alerting و canary release ها.

ولی در یک سیستم production، observability قوی برای تشخیص مشکل در cache، shard ها یا applier ها حیاتی است.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search|fa)

---

## ؜بخش ۱۳) سؤال‌های follow-up مصاحبه‌گر

چون این ویدیو حالت talk دارد و نقش مصاحبه‌گر و مصاحبه‌شونده بازی نمی‌شود، در واقع ؜**follow-up؜** مشخصی از سمت مصاحبه‌گر وجود ندارد.

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search|fa)

---

## ؜بخش ۱۴) سؤال‌هایی که کاندیدا می‌تواند بپرسد (Candidate Questions)

این بخش از خود ویدیو نیست، ولی سؤال‌های منطقی‌ای است که در یک مصاحبه می‌توانید بپرسید:

- ؜حدوداً چند autocomplete query در ثانیه داریم و چند phrase منحصر به‌فرد؟  
- ؜هدف latency برای پیشنهادهای هر key stroke چقدر است؟  
- ؜انتظار داریم phrase های ترند (مثلاً یک خبر مهم) ظرف چه مدت در autocomplete دیده شوند؟  
- ؜اگر Zookeeper یا Cassandra موقتاً down شوند، انتظار رفتار سیستم چیست؟  
- ؜آیا ranking فقط بر اساس frequency / weight است یا مدل ML هم در کار است؟

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search|fa)

---

## ؜بخش ۱۵) نکات کلیدی (Key Takeaways)

۱. ؜autocomplete فقط یک Trie ساده نیست؛ به یک request flow سریع و یک data pipeline قوی نیاز دارد.  
۲. نگه‌داشتن top-K در هر node از Trie، queryها را بسیار سریع می‌کند، ولی ساخت و update را سنگین‌تر می‌کند.  
۳. ؜sharding بر اساس prefix range (مثل `[a, k)` و `[k, $)`) راه طبیعی برای توزیع داده‌ی Trie روی چند ماشین است.  
۴. یک سرویس هماهنگ‌کننده مثل Zookeeper برای نگه‌داری mapping prefix range به shard node ها بسیار مفید است.  
۵. ؜data collection پیوسته است، ولی update Trie به‌صورت batch انجام می‌شود؛ بنابراین سیستم نسبت به رفتار جدید کاربران **eventually consistent** است.  
۶. استفاده از time-bucketed وزن‌ها باعث می‌شود داده‌ی جدیدتر در ranking اهمیت بیشتری داشته باشد.  
۷. ؜caching در چند لایه (distributed cache، CDN، client prefetch) کلید نگه‌داشتن latency پایین در scale بالا است.  
۸. ؜prune کردن phrase های کم‌اهمیت و داده‌های خیلی قدیمی، از رشد بی‌رویه‌ی Trie و storage جلوگیری می‌کند.  
۹. ؜availability از طریق replication حاصل می‌شود؛ هر prefix range چند replica دارد.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search|fa)

---

## ؜بخش ۱۶) واژه‌نامه (Glossary)

- ؜Autocomplete / Typeahead: قابلیتی که هنگام تایپ prefix توسط کاربر، پیشنهادهای کامل‌تر را نشان می‌دهد. ؜ 
- ؜Trie: ساختار درختی که هر edge یک کاراکتر را نشان می‌دهد و مسیر root تا node یک prefix یا کلمه را می‌سازد. ؜ 
- ؜Prefix Range: یک بازه‌ی لغت‌نامه‌ای روی رشته‌ها (مثلاً همه‌ی رشته‌هایی که با حروف بین `a` و `k` شروع می‌شوند). ؜ 
- ؜Top-K: K مورد با بالاترین امتیاز بر اساس یک scoring function. ؜ 
- ؜Zookeeper: سرویس coordination توزیع‌شده برای نگه‌داری config / metadata با availability بالا. ؜ 
- ؜Distributed Cache: لایه‌ای از cache که روی چند ماشین پخش شده و داده‌های پرتکرار را در حافظه نگه می‌دارد. ؜ 
- ؜CDN (Content Delivery Network): شبکه‌ای از سرورهای لبه که محتوا را نزدیک کاربر cache می‌کنند. ؜ 
- ؜Aggregator: worker ای که event های خام را جمع می‌زند و aggregate می‌کند. ؜ 
- ؜Cassandra: دیتابیس NoSQL توزیع‌شده برای داده‌ی حجیم و write-heavy (مثل آمار phrase ها).

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search|fa)

---

## ؜بخش ۱۷) نسبت‌دادن (Attribution)

- ؜ویدیو: https://www.youtube.com/watch?v=us0qySiUsGU  
- ؜کانال: Tushar Roy - ؜Coding Made Simple  
- ؜توضیح: این سند، خلاصه‌ای از طراحی مطرح‌شده در ویدیو است و بعضی بخش‌ها کمی ساده‌سازی یا دسته‌بندی شده‌اند.

[Ask AI: Attribution](https://alisol.ir/?ai=Attribution%7CTushar%20Roy%20-%20Coding%20Made%20Simple%7CDesign%20Autocomplete%20for%20Search%20Engines%20%7C%20Typeahead%20Suggestions%20for%20Google%20search|fa)

---

## ؜بخش ۱۸) درباره‌ی خلاصه‌نویس (About the summarizer)

من *Ali Sol* هستم، برنامه‌نویس PHP.

- ؜وب‌سایت: https://alisol.ir  
- ؜لینکدین: https://www.linkedin.com/in/alisolphp
