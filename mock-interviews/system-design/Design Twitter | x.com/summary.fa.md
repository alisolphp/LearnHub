# ؜خلاصهٔ فارسی: طراحی سامانهٔ Twitter | x.com

؜**کانال/مصاحبه‌کننده؜**: Tech Dummies - ؜Narendra Lakshmana Gowda  
؜**مدت‌زمان؜**: 00:36:53  
؜**ویدئوی اصلی؜**: https://www.youtube.com/watch?v=wYk0xPP_P_8  

> این سند، خلاصه‌ای از یک mock interview در حوزهٔ system design است. ؜دیدن ویدئو به‌طور کامل به‌شدت توصیه می‌شود.

## ؜مرور کوتاه

؜**مسئله (یک‌خطی)؜**: طراحی سامانه‌ای شبیه Twitter با تمرکز بر ارسال سریع tweet برای followerها، ساخت timelineها (home، user، search) و محاسبهٔ trending hashtagها بر اساس location.

؜**دامنهٔ اصلی؜**: درون‌دامنه: tweeting، تولید timeline، محاسبهٔ trend و data flow؛ بیرون‌دامنه: انتخابِ تکنولوژی‌های خاص فراتر از مفاهیم هسته‌ای مانند caching و streaming.

؜**اولویت‌های Non-Functional؜**: سامانهٔ read-heavy با در‌دسترس‌بودن بالا برای readها، latency پایین (مثلاً home timeline زیر ۲۰۰ms)، مقیاس‌پذیری برای ۶۰۰ write/sec و ۶۰۰K read/sec، و eventual consistency (تاخیر ۱–۲ ثانیه قابل‌قبول است).

؜**قیود و اعداد کلیدی؜**: بیش از ۳۰۰M کاربر؛ حدود ۶۰۰ tweet/sec (write)؛ حدود ۶۰۰K view/sec (read، نسبت write:read حدود ۱:۱۰۰۰)؛ tweet با ۱۴۰ کاراکتر؛ eventual consistency؛ عدم نیاز به consistency سخت‌گیرانه مثل بانکداری.

؜**معماری سطح‌بالا (متنی)؜**:  
- ؜کلاینت‌ها از طریق load balancer به APIهای write/read متصل می‌شوند.
- ؜؜؜writeها در DB ذخیره و به Redis برای timelineها fan-out می‌شوند؛ همچنین به queue (Kafka-like) برای trends و search indexing stream می‌شوند. ؜ 
؜
- ؜؜readها برای timelineها از Redis می‌خوانند (الگوی hybrid push/pull). ؜ 
؜
- ؜؜trending با stream processing (مثل Storm/Heron) برای شمارش hashtag و رتبه‌بندی geo انجام و در Redis نگه‌داری می‌شود. ؜ 
؜
- ؜؜search با inverted index (Earlybird) و الگوی scatter-gather روی nodeهای متعدد کار می‌کند. ؜ 
- ؜هماهنگی با Zookeeper؛ sharding دیتابیس با Gizzard روی MySQL؛ analytics در Cassandra. ؜ 
؜- ؜re؜al-time با WebSocket برای وب/موبایل.

؜**معامله‌ها (Trade-offs)‌ مهم؜**:  
- ؜push (fan-out) در برابر pull برای home timeline: push برای کاربران عادی سریع است اما برای celebrities ناکارآمد؛ pull برای fan-out بالا مناسب است ولی latency read را افزایش می‌دهد. ؜ 
- ؜؜cache در Redis در برابر query به DB: بار DB را کم می‌کند اما invalidation و مدیریت حافظه می‌خواهد. ؜ 
- ؜؜eventual consistency در برابر strong: مقیاس‌پذیری بهتر با پذیرش کمی staleness. ؜
- ؜پیش‌محاسبهٔ timeline در برابر on-demand: readها را کم می‌کند اما برای کاربران غیرفعال اتلاف محاسباتی دارد. ؜
- ؜؜stream processing برای trend: حجم real-time را پوشش می‌دهد اما نسبت به batch پیچیده‌تر است.

؜**ریسک‌ها/نقاط شکست بزرگ؜**:  
- ؜hot key برای celebrities (چه در fan-out چه در pull) و فشار زیاد به Redis. ؜ 
- ؜؜read volume بسیار بالا (۶۰۰K/sec) و احتمال cache miss و فشار به DB. ؜ 
- ؜خرابی stream processing و جاماندن بعضی tweetها از محاسبات trend. ؜ 
- ؜دادهٔ کاربران غیرفعال و اتلاف حافظهٔ Redis. ؜ 
- ؜؜single point of failure در Zookeeper یا load balancer. ؜ 
- ؜خطای geo-tag و trendهای نامرتبط.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions|fa)

## ؜برچسب‌های مصاحبه

؜**حوزه/صنعت؜**: social-media  
؜**الگوی محصول؜**: feed، timeline، newsfeed، search  
؜**نگرانی‌های سیستمی؜**: low-latency، eventual-consistency، hot-key  
؜**زیرساخت/فناوری (در صورت اشاره)؜**: websocket، kafka، mysql، cassandra، redis، zookeeper  

*نکتهٔ شخصی*: Apache Storm قدیمی‌تر است؛ در ۲۰۲۵ معمولاً Apache Flink یا Spark Streaming با fault tolerance و ضمانت‌های پردازشی بهتر ترجیح داده می‌شوند.

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions|fa)

## ؜فهم مسئله

؜**Prompt اصلی؜**: طراحی Twitter با تاکید بر ارسال سریع برای میلیون‌ها follower، ساخت timelineهای home/user/search، محاسبهٔ trending hashtagهای مکانی و تشریح data flow.

؜**Use Caseها؜**: اصلی: tweet و تحویل سریع به followerها؛ دیدن home timeline (افرادِ followed)، user timeline (tweet/retweetهای خود کاربر)، search؛ مشاهدهٔ trendها. ؜فرعی: مدل‌سازی retweet به صورت copy یا reference؛ trendهای geo-specific.

؜**خارج از دامنه؜**: انتخاب techهای خاص فراتر از مفاهیم هسته‌ای؛ نیاز به consistency سخت؛ نگرانی زیاد نسبت به هزینهٔ storage.

؜**APIها (در ویدئو)؜**: اشارهٔ مشخصی نشده.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions|fa)

## ؜نیازمندی‌ها و قیود

؜**نیازمندی‌های Functional؜**  
- ؜ارسال tweet و تحویل در چند ثانیه حتی برای میلیون‌ها follower. ؜ 
- ؜تولید home timeline (tweetهای افراد/صفحاتِ followed). ؜ 
- ؜تولید user timeline (tweet/retweetهای خود کاربر). ؜ 
- ؜پشتیبانی از search timeline برای keyword/hashtag. ؜ 
- ؜محاسبهٔ trending hashtag/topic به‌صورت مکانی/جهانی.

؜**نیازمندی‌های Non-Functional (طبق ویدئو)؜**:  
- ؜؜read-heavy (۱:۱۰۰۰) و read سریع با in-memory cache. ؜ 
- ؜؜latency پایین (مثلاً home timeline < ۲۰۰ms). ؜ 
- ؜مقیاس‌پذیری برای ۳۰۰M کاربر، ۶۰۰ write/sec، ۶۰۰K read/sec. ؜ 
- ؜؜eventual consistency (تاخیر ۱–۲ ثانیه). ؜ 
- ؜هزینهٔ storage نگران‌کننده نیست (tweet ۱۴۰ کاراکتری).

؜**فرض‌ها؜**:  
- ؜الگوی hybrid push/pull برای timelineها. ؜
- ؜؜stream processing برای trend real-time.

؜**ورودی‌های ظرفیت؜**: ۳۰۰M+ کاربر؛ ۶۰۰ write/sec؛ ۶۰۰K read/sec؛ میانگین ۱۵۰ follow به‌ازای هر کاربر؛ عدم تعیین explicit برای region/retention.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions|fa)

## ؜تخمین‌های سرانگشتی

- **؜Storage؜**: ۱۴۰ کاراکتر/ tweet → هزینهٔ پایین؛ sharding. ؜ 
- **؜Bandwidth؜**: در ویدئو ذکر نشده. ؜ 
- **اندازهٔ Cache؜**: Redis برای timeline/followerها؛ listهای per-user (IDهای tweet)؛ برای کاربران غیرفعال (>۱۵ روز) پیش‌محاسبه را متوقف کنید. ؜ 
- **؜Shard Key و تعداد پارتیشن؜**: user_id برای Redis/DB sharding؛ هزاران node Redis در clusterها. ؜ 
- **؜Throughput و Concurrency اوج؜**: ۶۰۰ write/sec؛ ۶۰۰K read/sec؛ fan-out بالقوه تا میلیون‌ها اما با hybrid کنترل می‌شود؛ WebSocket برای میلیون‌ها connection.

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions|fa)

## ؜معماری سطح‌بالا

- ؜کلاینت‌های وب/موبایل از طریق load balancer به APIها وصل می‌شوند. ؜ 
- ؜؜Write API: ذخیره در DB (Gizzard/MySQL)، fan-out به Redis timeline، ارسال به search index (Earlybird) و stream به Kafka برای trend. ؜ 
- ؜؜Timeline Service: خواندن از Redis (push برای کاربران عادی، pull برای celebrities)؛ استفاده از لیست‌های follower. ؜ 
- ؜؜Search Service: inverted index با scatter-gather روی nodeهای توزیع‌شده. ؜ 
- ؜؜Trending: با Stream Processing (Storm/Heron + Kafka): فیلتر، parse (NLP برای hashtag)، window، rank بر اساس geo؛ نتایج در Redis. ؜ 
- ؜؜Real-time: WebSocket/HTTP push. ؜ 
- ؜هماهنگ‌سازی: Zookeeper برای مدیریت کلاسترها و master election. ؜ 
- ؜؜Analytics: Cassandra.

*نکتهٔ شخصی*: در ۲۰۲۵ اغلب Flink یا Spark Streaming برای قابلیت اطمینان و ضمانت‌ها ترجیح دارد.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions|fa)

### ؜زیرسامانه: Timelineها

؜**نقش؜**: ساخت و سرویس‌دهیِ home (افرادِ followed)، user (خود کاربر/retweetها)، و search timeline با سرعت بالا.

؜**مدل داده (طبق ویدئو)؜**: جدول Users (ID، profile)، جدول Tweets (ID، content، timestamp، user_id)، جدول Follows (نگاشت user→followedها، یک‌به‌چند). ؜Retweet به‌صورت copy یا reference در tweets.

**؜API/Contract؜**: ذکر نشده.

؜**مقیاس‌پذیری و Partitioning؜**: shard بر اساس user_id؛ کلاسترهای Redis برای scale افقی.

**؜Caching؜**: Redis listها: user_id:tweets (IDهای tweet)، user_id:followers (IDها). ؜پیش‌محاسبه برای activeها؛ TTL تلویحی با inactivity.

**؜Consistency؜**: eventual.

؜**گلوگاه‌ها/Hot Key؜**: celebrity fan-out (میلیون‌ها)؛ راهکار: pull در زمان read.

**؜Fault Handling؜؜**: cache miss → fallback به DB؛ sync تدریجی.

**؜Cost؜**: حافظهٔ Redis در برابر storage ارزان.

[Ask AI: Subsystem - ؜Timelines](https://alisol.ir/?ai=Subsystem%20-%20Timelines%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions|fa)

### ؜زیرسامانه: Trending

؜**نقش؜**: محاسبهٔ trending hashtag/topic با تاکید بر نرخ/حجم زمانی و geo-specific.

؜**مدل داده؜**: استخراج hashtag از tweet؛ شمارش/نرخ در windowهای ۱–۱۰ دقیقه‌ای؛ نگاشت به location.

**؜API/Contract؜**: ذکر نشده.

؜**مقیاس‌پذیری؜**: اپراتورهای توزیع‌شدهٔ stream؛ Kafka topic برای صف.

**؜Caching؜**: ذخیرهٔ نتایج در Redis برای read سریع.

**؜Consistency؜**: eventual.

؜**گلوگاه‌ها/Hot Key؜**: حجم بالای tweet؛ window operationها شوک‌ها را مدیریت می‌کنند.

**؜Fault Handling؜**: حذف موارد violative؛ پردازش async.

**؜Cost؜**: ذکر نشده.

[Ask AI: Subsystem - ؜Trending](https://alisol.ir/?ai=Subsystem%20-%20Trending%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions|fa)

### ؜زیرسامانه: Search

؜**نقش؜**: رسیدگی به جستجوهای keyword/hashtag با inverted index.

؜**مدل داده؜**: نگاشت واژه/hashtag → IDهای tweet در جداول توزیع‌شده.

**؜API/Contract؜**: ذکر نشده.

؜**مقیاس‌پذیری؜**: nodeهای توزیع‌شده؛ الگوی scatter-gather.

**؜Caching؜**: ذکر نشده.

**؜Consistency؜**: eventual.

؜**گلوگاه‌ها/Hot Key؜**: queryهای محبوب؛ توزیع برای جلوگیری از فشار.

**؜Fault Handling؜**: تجمیع نتایج حتی با failureهای جزئی.

**؜Cost؜**: ذکر نشده.

[Ask AI: Subsystem - ؜Search](https://alisol.ir/?ai=Subsystem%20-%20Search%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions|fa)

### ؜زیرسامانه: Data Flow

؜**نقش؜**: عبور tweet از مسیرِ persistence، fan-out، indexing و processing.

؜**مدل داده؜**: tweet → DB، Redis، search، streaming.

**؜API/Contract؜**: Write API برای tweet؛ Timeline/Search API برای read.

؜**مقیاس‌پذیری؜**: load balancer؛ سرویس‌های کلاستری.

**؜Caching؜**: Redis برای timeline.

**؜Consistency؜**: eventual.

؜**گلوگاه‌ها؜**: جهش در write؛ queueها buffer می‌کنند.

**؜Fault Handling؜**: ارسال async؛ retry ضمنی.

**؜Cost؜**: ذکر نشده.

[Ask AI: Subsystem - ؜Data Flow](https://alisol.ir/?ai=Subsystem%20-%20Data%20Flow%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions|fa)

## ؜؜Trade-offها و گزینه‌های جایگزین

| موضوع | گزینهٔ A | گزینهٔ B | گرایشِ ویدئو | منطق (طبق ویدئو) |
|---|---|---|---|---|
| Home Timeline | Push (fan-out on write) | Pull (on read) | Hybrid: Push برای عادی، Pull برای celebs | Push سریع اما در fan-out میلیونی گران؛ Pull از write amplification جلوگیری می‌کند ولی هزینهٔ read دارد. ؜|
| Consistency | Strong | Eventual | Eventual | برای feed اجتماعی، کمی تاخیر قابل‌قبول است و مقیاس‌پذیری بهتری می‌دهد. ؜|
| Storage | MySQL (Gizzard) | Cassandra | هر دو: MySQL برای core، Cassandra برای analytics | relational برای core؛ big data برای analytics. ؜|
| Stream Processing | Batch | Real-time (Storm/Heron) | Real-time | تمرکز بر burstها و سرعت. ؜(*جایگزین‌های رایج ۲۰۲۵: Flink/Spark Streaming*) |
| Caching | فقط DB | Redis in-memory | Redis | read سریع در سامانهٔ read-heavy؛ نیازمند سیاست‌های persistence/eviction. ؜|
| User Activity | همه را پیش‌محاسبه | پرش از غیرفعال‌ها | Skip اگر >۱۵ روز inactive | صرفه‌جویی در compute/memory. ؜|

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions|fa)

## ؜قابلیت اتکا، در‌دسترس‌بودن و کارایی

- ؜؜eventual consistency برای tweet/timeline (بدون quorum). ؜ 
؜- ؜latency پایین از مسیر readهای in-memory با Redis (هدف: < ۲۰۰ms). ؜ 
- ؜دربارهٔ backpressure/throttling به‌صراحت بحث نشده. ؜ 
؜- ؜load shedding/degreadation ذکر نشده. ؜ 
؜- ؜RPO/RTO و disaster recovery مطرح نشده.

[Ask AI: Reliability & Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions|fa)

## ؜امنیت و حریم خصوصی

در ویدئو اشاره‌ای نشده.

[Ask AI: Security & Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions|fa)

## ؜رصدپذیری (Observability)

در ویدئو اشاره‌ای نشده.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions|fa)

## ؜پرسش‌های Follow-up

ذکر نشده.

[Ask AI: Follow-ups](https://alisol.ir/?ai=Follow-up%20Questions%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions|fa)

## ؜پرسش‌های کاندید

ذکر نشده.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions|fa)

## ؜نکات کلیدی

- ؜؜Twitter یک سامانهٔ read-heavy است؛ read سریع با in-memory caching (Redis) را اولویت بدهید. ؜ 
- ؜؜fan-out هیبرید: Push برای کاربران عادی، Pull برای celebrities. ؜ 
- ؜برای کاربران inactive از پیش‌محاسبه صرف‌نظر کنید. ؜ 
- ؜؜trend بر «سرعت» (حجم در بازهٔ کوتاه) تکیه دارد و با stream processing انجام می‌شود. ؜ 
- ؜؜search با inverted index و queryهای توزیع‌شده (scatter-gather) کار می‌کند. ؜ 
- ؜؜eventual consistency به مقیاس‌پذیری کمک می‌کند. ؜ 
- ؜data flow: write → ؜DB/Cache/Stream/Search. ؜ 
- ؜؜Zookeeper برای هماهنگی کلاسترها. ؜ 
- ؜مراقب hot key باشید. ؜ 
- ؜؜trade-off اصلی: انتقال بار از read به write در fan-out.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CTwitter%20system%20design%20%7C%20twitter%20Software%20architecture%20%7C%20twitter%20interview%20questions|fa)

## ؜واژه‌نامه

- ؜؜Fan-out: توزیع یک tweet به timeline همهٔ followerها در لحظهٔ write. ؜ 
- ؜؜Home Timeline: مجموعهٔ tweetهای افراد/صفحاتِ followed. ؜ 
- ؜؜User Timeline: tweetها و retweetهای خود کاربر. ؜ 
- ؜؜Trending: hashtag/topicهای پرشتاب در بازهٔ کوتاه، با بُعد geo. ؜ 
- ؜؜Inverted Index: نگاشت واژه/hashtag → tweet برای جستجوی سریع. ؜ 
- ؜؜Scatter-Gather: پرس‌وجو از چندین node و تجمیع نتایج. ؜ 
- ؜؜Eventual Consistency: همگرایی داده با تاخیرِ کوتاه. ؜ 
- ؜؜Stream Processing: پردازش real-time جریان tweetها برای trend.

## ؜؜Attribution

- ؜منبع: لینک ویدئو در بالا  
- ؜کانال: Tech Dummies - ؜Narendra Lakshmana Gowda  
- ؜یادداشت: این سند خلاصه‌ای از ویدئوی پیوند داده‌شده است.

## ؜دربارهٔ خلاصه‌کننده

من «Ali Sol» یک PHP Developer هستم. ؜اطلاعات بیشتر:  
- ؜وب‌سایت: https://alisol.ir  
- ؜لینکدین: https://www.linkedin.com/in/alisolphp
