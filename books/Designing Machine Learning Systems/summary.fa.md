# خلاصه کتاب: Designing Machine Learning Systems
* **نویسنده**: Chip Huyen
* **ژانر**: Machine Learning Engineering / طراحی سیستم‌های ML
* **تاریخ انتشار**: مارس ۲۰۲۲

این سند، مهم‌ترین درس‌ها و بینش‌های استخراج‌شده از این کتاب را خلاصه می‌کند.  
برای درک عمیق‌تر و دیدگاه خود نویسنده، خواندن نسخهٔ کامل کتاب به‌شدت توصیه می‌شود.

## قبل از این‌که شروع کنید
* من نکته‌های کلیدی کتاب‌های مفید را خلاصه می‌کنم تا یادگیری و مرور آن‌ها سریع‌تر شود.
* فقط کافی است روی لینک‌های `Ask AI` بعد از هر بخش کلیک کنید تا عمیق‌تر وارد جزئیات شوید.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=005796ea -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=fa&src=books/Designing%20Machine%20Learning%20Systems) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=fa&src=books/Designing%20Machine%20Learning%20Systems) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=fa&src=books/Designing%20Machine%20Learning%20Systems) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=fa&src=books/Designing%20Machine%20Learning%20Systems) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=fa&src=books/Designing%20Machine%20Learning%20Systems) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=fa&src=books/Designing%20Machine%20Learning%20Systems) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=fa&src=books/Designing%20Machine%20Learning%20Systems) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=fa&src=books/Designing%20Machine%20Learning%20Systems) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=fa&src=books/Designing%20Machine%20Learning%20Systems) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=fa&src=books/Designing%20Machine%20Learning%20Systems)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=fa&src=books/Designing%20Machine%20Learning%20Systems) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=fa&src=books/Designing%20Machine%20Learning%20Systems) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=fa&src=books/Designing%20Machine%20Learning%20Systems)
<!-- LH-BUTTONS:END -->

## ؜Overview of Machine Learning Systems

**خلاصه**:  
خیلی‌ها وقتی اسم Machine Learning را می‌شنوند فوراً یاد الگوریتم‌هایی مثل logistic regression یا neural network می‌افتند، اما در عمل، خود الگوریتم فقط بخش خیلی کوچکی از یک سیستم بزرگ و پیچیده است.  
یک سیستم ML واقعی در محیط production شامل data pipelineها، feature store، زیرساخت model serving، مانیتورینگ، interfaceها، سخت‌افزار و چیزهای زیاد دیگری است.  
این کتاب به ML نه به‌عنوان یک پروژهٔ تحقیقاتی یک‌باره، بلکه به‌عنوان یک فرآیند مهندسی تکرارشونده نگاه می‌کند که هدفش ساختن اپلیکیشن‌های قابل‌اعتماد، مقیاس‌پذیر و قابل‌انطباق برای کاربران واقعی است.

**مثال**: جهش بزرگ Google Translate در سال ۲۰۱۶ فقط به خاطر یک neural network بهتر نبود؛ کل سیستم (data collection، training infra، سروینگ با latency پایین، مانیتورینگ، مکانیزم‌های rollback و ...) بود که چنین جهشی را ممکن کرد.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Overview of ML systems in production](https://alisol.ir/?ai=Overview%20of%20ML%20systems%20in%20production%7CChip%20Huyen%7CDesigning%20Machine%20Learning%20Systems%7Cfa)

## ؜When (and When Not) to Use Machine Learning

**خلاصه**:  
؜ML زمانی عالی عمل می‌کند که لازم است از داده‌های موجود، patternهای پیچیده را یاد بگیریم تا روی داده‌های جدید پیش‌بینی انجام دهیم؛ مخصوصاً وقتی:

- این patternها تکرارشونده‌اند
- هزینهٔ اشتباه پایین است
- کار در مقیاس بالا انجام می‌شود
- دنیا مدام در حال تغییر است و ruleهای دست‌نویس خیلی زود منقضی می‌شوند

از ML استفاده نکن اگر:

- می‌شود با یک راه‌حل ساده‌تر (lookup table، rule-based system، نرم‌افزار سنتی) مسئله را حل کرد
- مسئله از نظر اخلاقی مشکل‌دار است
- داده در دسترس نیست یا عملاً قابل جمع‌آوری نیست
- هزینهٔ اشتباه‌ها فاجعه‌بار است و عملاً نمی‌توانی خطا داشته باشی

**مثال**: پیش‌بینی قیمت اجارهٔ Airbnb → pattern پیچیده، دادهٔ زیاد، اشتباه‌ها نسبتاً کم‌هزینه → گزینهٔ عالی برای ML.  
نگاشت zip code به نام ایالت → یک lookup table ساده سریع‌تر، ارزان‌تر و ۱۰۰٪ درست است.

**لینک برای جزئیات بیشتر**:  
[Ask AI: When to use ML vs simpler approaches](https://alisol.ir/?ai=When%20to%20use%20ML%20vs%20simpler%20approaches%7CChip%20Huyen%7CDesigning%20Machine%20Learning%20Systems%7Cfa)

## ؜Popular Machine Learning Use Cases

**خلاصه**:  
؜ML پشتِ بسیاری از کاربردهای مهم است: search، recommendation، translation، بهبود کیفیت عکس، fraud detection، dynamic pricing، demand forecasting، churn prediction، مسیردهی تیکت‌های پشتیبانی، brand monitoring، تشخیص‌های پزشکی و تعداد زیادی ابزار داخلی در سازمان‌ها.  
اگرچه اپ‌های consumer بیشتر در ویترین دیده می‌شوند، اما بیشتر پول واقعی (و صرفه‌جویی‌ها) در محیط enterprise به‌دست می‌آید؛ جایی که حتی بهبود ۰٫۱٪ هم می‌تواند میلیون‌ها دلار ارزش داشته باشد.

**مثال**:  
- ؜fraud detection (anomaly detection روی تراکنش‌ها)  
- ؜price optimization (surge pricing در سرویس‌های ride-sharing)  
- ؜churn prediction (این‌که بفهمی کاربر در آستانهٔ لغو سرویس است تا بتوانی او را برگردانی)

**لینک برای جزئیات بیشتر**:  
[Ask AI: Real-world ML use cases 2025](https://alisol.ir/?ai=Real-world%20ML%20use%20cases%202025%7CChip%20Huyen%7CDesigning%20Machine%20Learning%20Systems%7Cfa)

## ؜Mind vs. Data Debate

**خلاصه**:  
یک بحث قدیمی و ادامه‌دار وجود دارد: آیا با طراحی architectureهای هوشمندانه و inductive biasهای بهتر («mind») برنده می‌شویم، یا با ریختن data و compute عظیم روی مدل‌های ساده («data»)?  
دههٔ گذشته به‌شکل واضح به نفع سمت data بود؛ مدل‌ها مدام بزرگ‌تر شده‌اند و datasetها هم همین‌طور (مثلاً GPT-3 حدود ۵۰۰ میلیارد token داشت).  
اما «دادهٔ بیشتر» همیشه بهتر نیست؛ دادهٔ بی‌کیفیت یا قدیمی می‌تواند آسیب بزند. فعلاً در صنعت، ترکیب data + compute برنده است.

[یادداشت شخصی: در سال ۲۰۲۵ هنوز در دوران «scaling works» هستیم، اما هزینه و ردپای انرژی مدل‌های خیلی بزرگ باعث شده آدم‌های بیشتری دوباره روی architectureهای هوشمندتر و کیفیت داده تمرکز کنند.]

**لینک برای جزئیات بیشتر**:  
[Ask AI: Mind vs data in modern ML](https://alisol.ir/?ai=Mind%20vs%20data%20in%20modern%20ML%7CChip%20Huyen%7CDesigning%20Machine%20Learning%20Systems%7Cfa)

## ؜ML in Research vs. ML in Production

**خلاصه**:  
در research، هدف این است که روی benchmarkهای تمیز و static به state-of-the-art accuracy برسیم، با training سریع و throughput بالا.  
در production، هدف latency پایین، مقیاس‌پذیری، fairness، interpretability، هزینهٔ مناسب و reliability روی داده‌های واقعی، کثیف و متغیر است.  
این اهداف اغلب با هم در تضادند؛ مثلاً ensembling معمولاً مسابقات Kaggle را می‌برد، اما به‌ندرت در production استفاده می‌شود چون کند است و توضیح‌دادن آن سخت است.

**مثال**: یک مدل leaderboard ممکن است از ۵۰ ensemble پشت‌سر‌هم استفاده کند و ۵۰۰ms زمان inference داشته باشد؛ برای مقاله عالی است، اما برای یک mobile app که به کمتر از ۱۰۰ms نیاز دارد تقریباً به درد نمی‌خورد.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Differences between research and production ML](https://alisol.ir/?ai=Differences%20between%20research%20and%20production%20ML%7CChip%20Huyen%7CDesigning%20Machine%20Learning%20Systems%7Cfa)

## ؜Common Causes of ML System Failures in Production

**خلاصه**:  
بیشتر outageها هنوز همان مشکلات تکراری نرم‌افزار/زیرساخت هستند (بیش از ۶۰٪ در گوگل)، اما خطرناک‌ترین‌ها آن‌هایی هستند که مخصوص ML هستند، مثل:

- دادهٔ production با دادهٔ training متفاوت است (train-serve skew یا drift تدریجی)
- ؜edge caseهایی که باعث خطاهای فاجعه‌بار می‌شوند
- ؜feedback loopهای معیوب که دادهٔ training آینده را خراب می‌کنند (predictionهای خودت، دادهٔ بعدی را مسموم می‌کند)

**مثال**: یک سیستم recommendation که فقط آهنگ‌های از قبل محبوب را بیشتر و بیشتر پیشنهاد می‌کند چون کلیک بیشتری می‌گیرند → آهنگ‌های جدید اصلاً دیده نمی‌شوند (popularity bias / exposure bias).

**لینک برای جزئیات بیشتر**:  
[Ask AI: Why production ML systems fail](https://alisol.ir/?ai=Why%20production%20ML%20systems%20fail%7CChip%20Huyen%7CDesigning%20Machine%20Learning%20Systems%7Cfa)

## ؜Data Distribution Shifts (The Silent Killer)

**خلاصه**:  
مدل تو فرض می‌کند دادهٔ training و دادهٔ inference از یک distribution می‌آیند؛ چیزی که در دنیای واقعی تقریباً هیچ‌وقت دقیقاً درست نیست.  
؜Distribution shiftها دائماً رخ می‌دهند (فصلی، رویدادهای ناگهانی، باگ‌ها، ورود نوع جدیدی از کاربران و ...). انواع مهم آن:

- **؜Covariate shift** → توزیع ورودی‌ها (featureها) عوض می‌شود ولی رابطهٔ اصلی ثابت می‌ماند
- **؜Label shift** → توزیع خروجی‌ها (labelها) عوض می‌شود
- **؜Concept drift** → خود رابطهٔ P(Y|X) تغییر می‌کند (مثلاً قیمت مسکن در دوران COVID به‌طور ناگهانی سقوط می‌کند)

اگر این تغییرات کشف و مدیریت نشوند، accuracy مدل به‌آرامی و بی‌سروصدا از بین می‌رود.

[یادداشت شخصی: در ۲۰۲۵ ابزارهای بهتری برای drift detection و سرویس‌های مانیتورینگ managed داریم، اما ماهیت مسئله همان است — بیشتر تیم‌ها هنوز یا طبق زمان‌بندی ثابت retrain می‌کنند یا فقط بعد از این‌که بحران رخ داد.]

**لینک برای جزئیات بیشتر**:  
[Ask AI: Types of data distribution shifts](https://alisol.ir/?ai=Types%20of%20data%20distribution%20shifts%7CChip%20Huyen%7CDesigning%20Machine%20Learning%20Systems%7Cfa)

## ؜Detecting and Handling Distribution Shifts

**خلاصه**:  
بهترین سیگنال برای تشخیص shift این است که متریک‌های مرتبط با accuracy را نسبت به ground truth (وقتی در دسترس است) در طول زمان track کنی.  
وقتی ground truth با تأخیر می‌رسد یا اصلاً نداریم، می‌شود روی آمار featureها، توزیع predictionها یا two-sample testهایی مثل KS، MMD و ... نظارت کرد.

راه‌حل‌ها:

- ؜retraining دوره‌ای (رایج‌ترین راه)
- ؜fine-tuning روی دادهٔ جدیدتر
- ؜importance weighting (بیشتر جنبهٔ تحقیقاتی دارد)
- طراحی featureهایی که نسبت به تغییرات محیط پایدارتر باشند

**مثال**: اگر یک feature رتبهٔ یک آیتم در یک لیست مرتب‌شده باشد و هر ساعت عوض شود، می‌توانی آن را bucket بندی کنی (مثل «top 10»، «۱۱–۱۰۰» و ...) تا feature با سرعت کمتری drift کند.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Detecting and fixing data drift in production](https://alisol.ir/?ai=Detecting%20and%20fixing%20data%20drift%20in%20production%7CChip%20Huyen%7CDesigning%20Machine%20Learning%20Systems%7Cfa)

## ؜Edge Cases & Degenerate Feedback Loops

**خلاصه**:  
حتی accuracy برابر ۹۹٫۹٪ هم اگر ۰٫۱٪ خطاها مرگ‌بار باشند (self-driving car) یا اعتبار برند را نابود کنند (خروجی نژادپرستانه از یک chatbot)، عملاً غیرقابل‌قبول است.  
؜Feedback loopهای معیوب وقتی رخ می‌دهند که predictionها روی labelهایی که مدل بعدی با آن‌ها train می‌شود تأثیر بگذارند. برای کاهش این مشکل می‌توان از randomization، featureهای positional یا جدا کردن مدل ranking و مدل click استفاده کرد.

**مثال**: TikTok به هر ویدئوی جدید یک traffic bucket تصادفی کوچک می‌دهد تا کیفیت واقعی آن را اندازه‌گیری کند، نه این‌که فقط چیزی را که مدل از قبل دوست دارد بیشتر و بیشتر نمایش بدهد.

**لینک برای جزئیات بیشتر**:  
[Ask AI: Handling edge cases and feedback loops](https://alisol.ir/?ai=Handling%20edge%20cases%20and%20feedback%20loops%7CChip%20Huyen%7CDesigning%20Machine%20Learning%20Systems%7Cfa)

---
**دربارهٔ خلاصه‌کننده**

من *Ali Sol* هستم، یک Backend Developer. بیشتر ببینید:
* وب‌سایت: [alisol.ir](https://alisol.ir)
* لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

