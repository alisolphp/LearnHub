# ؜طراحی سیستم (مصاحبه ماک): طراحی Google Search — چطور گوگل بین میلیاردها سند، یک سند را خیلی سریع پیدا می‌کند
* ؜**کانال/مصاحبه‌کننده؜**: Tech Dummies - ؜Narendra Lakshmana Gowda  
* ؜**مدت‌زمان؜**: 00:41:31  
* ؜**ویدئوی اصلی؜**: https://www.youtube.com/watch?v=CeGtqouT8eA

> این سند، خلاصه‌ی محتوای یک مصاحبهٔ ماک طراحی سیستم است؛ اگر فرصت دارید، دیدن کامل ویدئو ارزشمند است.

---

## ؜خلاصهٔ اجرایی یک‌صفحه‌ای (۲–۳ دقیقه)

؜**صورت‌مسئله (یک‌خطی)؜**: چرا و چگونه موتورهای جست‌وجو در مقیاس وب (مثل Google) در حد میلی‌ثانیه نتایج مرتبط را از میان میلیاردها صفحه برمی‌گردانند، در حالی‌که جست‌وجو روی لپ‌تاپ شخصی گاهی چند ثانیه طول می‌کشد؟

؜**دامنهٔ پوشش؜**
- ؜در محدوده: مفاهیم هسته‌ای جست‌وجو — ‎crawling‎، ‎indexing‎، ‎querying‎؛ ‎inverted index‎؛ ‎preprocessing‎ (حذف ‎stop words‎، ‎stemming/lemmatization‎)؛ راهبردهای ‎prefix/suffix/wildcard‎؛ اشارهٔ سطح‌بالا به ‎ranking‎.
- ؜خارج از محدوده: جزئیات داخلی Google، ریاضیات PageRank، جزئیات ذخیره‌سازی توزیع‌شده، مشخصات سخت‌افزار، کل پایپ‌لاین ‎ranking‎.

؜**اولویت‌های کیفی (بر اساس ویدئو)؜**
- ؜تأخیر پایین (lookup در حد میلی‌ثانیه).
- ؜توان عملیاتی بالا (پاسخ‌گویی همزمان به کوئری‌های زیاد).
- ؜مقیاس‌پذیری (billions of pages).
- ؜‎near real-time indexing‎ برای تازگی.

؜**معماری سطح‌بالا (متنی)؜**
- ؜‎crawlers‎ توزیع‌شده صفحات را می‌گیرند و محتوای خام را ذخیره می‌کنند.
- ؜پایپ‌لاین ‎indexing‎: پاک‌سازی نویز، ‎tokenization‎ و ‎case folding‎، مدیریت ‎stop words‎، ‎stemming/lemmatization‎ و ساخت ؜**inverted index؜** (نگاشت term → [docIDs, frequency, positions]). ؜ 
؜  [Personal note: حذف تهاجمی ‎stop words‎ می‌تواند ‎phrase query‎ را خراب کند؛ در عمل امروزی معمولاً نگه‌داشتن یا کم‌وزن‌کردن آن‌ها بهتر است.]
؜  [Personal note: ‎stemming‎ ساده‌انگارانه است؛ ‎lemmatization‎ یا analyzer‌ های زبان‌محور در ۲۰۲۵ معمولاً معنی را بهتر حفظ می‌کنند.]
- ؜نگه‌داری ‎metadata‎ و ‎postings list‎ روی ذخیره‌ساز (با ساختارهای فشرده‌سازی برای صرفه‌جویی).
- ؜موتور کوئری: تفسیر کوئری (تکی، چندکلمه‌ای ‎AND/OR‎، ‎phrase‎)، ‎intersection/union‎ روی ‎postings‎، و بازگردانی نتایج.
- ؜قابلیت‌های اختیاری: ‎prefix/suffix/wildcard search‎ با دیکشنری ‎sorted‎ یا ساختارهای اختصاصی.

؜**موازنه‌های اصلی؜**
- ؜دقت در برابر پوشش (‎AND‎ در برابر ‎OR‎).
- ؜فضا در برابر سرعت (ذخیرهٔ ‎positions/frequencies‎ غنی در برابر ‎bitmap‎ کوچک‌تر).
- ؜میزان ‎preprocessing‎ در برابر حفظ معنا.

؜**ریسک‌ها/نقاط شکست محتمل؜**
- ؜‎hot terms‎ که ‎postings‎ بسیار طولانی می‌سازند.
- ؜تورم ‎index‎ به‌دلیل ذخیرهٔ ‎positions/frequencies‎ برای همهٔ واژه‌ها.
- ؜‎tokenizer‎ نامناسب که به ‎relevance‎ ضربه می‌زند.
- ؜کوئری‌های ‎wildcard‎ پرهزینه اگر با ساختار مناسب پشتیبانی نشوند.

؜**فلش‌کارت مرور ۵ دقیقه‌ای؜**
- ؜پرسش: هستهٔ فنی سرعت در جست‌وجوی متن چیست؟  
  پاسخ: ‎inverted index‎ (term → documents + ‎frequency/positions‎).
- ؜پرسش: چرا ‎positions‎ را ذخیره می‌کنیم؟  
  پاسخ: برای پشتیبانی ‎phrase/proximity queries‎ و ‎ranking‎ بهتر.
- ؜پرسش: ‎AND‎ در برابر ‎OR‎؟  
  پاسخ: ‎AND‎ یعنی ‎intersection‎ ‎postings‎؛ ‎OR‎ یعنی ‎union‎.
- ؜پرسش: چرا ‎preprocessing‎ (مثل ‎stop words‎، ‎stemming‎)؟  
  پاسخ: کاهش نویز و اندازهٔ واژگان برای جست‌وجوی سریع‌تر و مرتبط‌تر. ؜ 
؜  [Personal note: ‎lemmatization‎ یا ‎modern analyzer‎ ها را ترجیح دهید؛ حذف کامل ‎stop words‎ می‌تواند ‎snippet/phrase‎ را بد کند.]
- ؜پرسش: پشتیبانی کارا از ‎prefix search‎؟  
  پاسخ: دیکشنری ‎sorted‎ + ‎binary search‎ (یا ‎trie/k‑gram‎). ؜ 
؜  [Personal note: ‎leading‑wildcard‎ («*term») هنوز گران است؛ ‎n‑gram‎ یا ایندکس‌های خاص را در نظر بگیرید.]
- ؜پرسش: چرا جست‌وجوی لپ‌تاپ کندتر حس می‌شود؟  
  پاسخ: معمولاً ‎indexing‎ و ‎metadata‎ قدرتمند ندارد؛ وب‌جست‌وجو روی ‎prebuilt distributed index‎ اجرا می‌شود.

؜[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%7Cfa)

---

## ؜برچسب‌های مصاحبه (برای فیلتر بعدی)

؜**دامنه/صنعت؜**: `search`  
؜**الگوی محصول؜**: `search-index`  
؜**نگرانی‌های سیستمی؜**: `low-latency`, `high-availability`, `scalability`  
؜**زیرساخت/تکنولوژی (ذکرشده)؜**: `elasticsearch`, `solr`, `lucene`  
؜[Personal note: هر سه همچنان رایج‌اند؛ اگر بار عملیاتی بالاست، سرویس‌های مدیریت‌شده گزینهٔ کم‌هزینه‌تری در عملیات هستند.]

؜[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%7Cfa)

---

## ؜فهم مسئله

؜**صورت‌مسئله؜**: سیستمی بسازید که اسناد حاوی کلمات/عبارات کاربر را با تأخیر بسیار کم و توان بالا، در مقیاس بسیار بزرگ بازیابی کند.

؜**کاربردها؜**
- ؜جست‌وجوی تک‌واژه («quick»).
- ؜کوئری چندکلمه‌ای ‎AND/OR‎.
- ؜‎phrase/proximity search‎ («quick brown fox»).
- ؜‎prefix/suffix/wildcard‎ («jum*»، «*lazy*»).

؜**خارج از محدوده؜**  
ریاضیات دقیق ‎ranking‎ (مثل ‎PageRank‎)، سیستم تبلیغات، UI، جزئیات ‎i18n‎.

؜**APIها؜**  
در ویدئو بیان نشده است.

؜[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%7Cfa)

---

## ؜نیازمندی‌ها و قیود

؜**آنچه در ویدئو گفته شد؜**
- ؜عملکردی: ‎crawling‎ اسناد؛ ‎preprocessing‎ متن؛ ساخت/جست‌وجوی ‎inverted index‎؛ پشتیبانی ‎AND/OR‎؛ ‎phrase search‎ با ‎positions‎؛ ‎prefix/wildcard‎.
- ؜غیرعملکردی: تأخیر پایین؛ توان بالا؛ ذخیره‌سازی مقیاس‌پذیر برای ‎index‎؛ پایپ‌لاین ‎indexing‎ تقریباً بی‌درنگ.

؜**فرضیات؜**
- ؜ترافیک و حجم داده به‌حدی است که فشرده‌سازی و انتخاب ساختار داده اهمیت دارد. ؜*(فرضیه)*

؜[Ask AI: Requirements and Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%7Cfa)

---

## ؜برآورد سرانگشتی

در ویدئو بیان نشده—از محاسبات عددی صرف‌نظر می‌شود.

؜[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%7Cfa)

---

## ؜معماری سطح‌بالا

- ؜؜**Crawlers؜**: جمع‌آوری صفحات و ذخیرهٔ محتوای خام. ؜ 
- ؜؜**پایپ‌لاین Indexing؜**:  
  - ؜حذف نویز (تگ‌های HTML، ‎URL‎ و …)، ‎stop‑word handling‎، ‎case folding‎، ‎tokenization‎. ؜ 
؜    [Personal note: به‌جای حذف کامل ‎stop words‎، نگه‌داشتن برای ‎phrase/proximity‎ معمولاً نتیجهٔ بهتری دارد.]  
  - ؜‎stemming/lemmatization‎ برای نرمال‌سازی. ؜ 
؜    [Personal note: ‎lemmatization‎ یا ‎light stemming‎ در ۲۰۲۵ معمولاً مرتبط‌تر جواب می‌دهند.]  
  - ؜ساخت ‎inverted index‎: برای هر ‎term‎، ‎docID‎، ‎term frequency‎ و ؜**positions؜** برای ‎phrase query‎. ؜ 
  - ؜فشرده‌سازی اختیاری ‎postings‎. ؜ 
؜    [Personal note: ‎compressed postings/bitmaps‎ مصرف حافظه و I/O را کم می‌کند.]  
- ؜؜**ذخیره‌ساز؜**: دیکشنری واژگان و ‎postings‎ (به‌علاوهٔ ‎metadata‎).
- ؜؜**موتور کوئری؜**: ‎lookup‎ واژگان، اجرای ‎AND/OR‎، بررسی مجاورت برای ‎phrase‎ و بازگردانی نتایج. ؜ 
- ؜؜**مدیریت و تازه‌سازی؜**: ‎re-index‎ دوره‌ای/جریانی.

؜[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%7Cfa)

---

## ؜عمیق‌شدن در زیرسامانه‌ها

### ؜۸.۱ زیرسامانه: Crawling
- ؜؜**نقش و مسئولیت‌ها؜**: واکشی صفحات با کارگرهای توزیع‌شده، دنبال‌کردن لینک‌ها، ذخیرهٔ محتوا برای ‎indexing‎. ؜ 
- ؜؜**مدل داده؜**: فراتر از ذخیرهٔ صفحات، جزئیاتی گفته نشد. ؜ 
- ؜؜**API/قراردادها؜**: بیان نشده. ؜ 
- ؜؜**مقیاس‌پذیری و پارتیشن‌بندی؜**: شارد بر اساس ‎URL frontier‎ (ضمنی). ؜ 
- ؜؜**Caching/Consistency؜**: بیان نشده. ؜ 
- ؜؜**گلوگاه‌ها و کاهش آن‌ها؜**: ‎politeness‎، ‎rate limit‎، ‎duplicate‎ (ضمنی). ؜ 
- ؜؜**مدیریت خطا؜**: ‎retry‎ (ضمنی). ؜ 
- ؜؜**هزینه؜**: بیان نشده.

؜[Ask AI: Subsystem - ؜Crawling](https://alisol.ir/?ai=Subsystem%20-%20Crawling%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%7Cfa)

### ؜۸.۲ زیرسامانه: Indexing
- ؜؜**نقش و مسئولیت‌ها؜**: نرمال‌سازی متن و ساخت دیکشنری واژگان و ‎postings‎ با ‎frequency/positions‎. ؜ 
- ؜؜**مدل داده؜**:  
  - ؜؜**Dictionary؜**: لیست مرتب یا ‎map‎ قابل جست‌وجو از ‎terms‎. ؜ 
  - ؜؜**Postings؜**: برای هر ‎term‎ → لیست ‎(docID, freq, [positions…])‎. ؜ 
- ؜؜**API/قراردادها؜**: بیان نشده. ؜ 
- ؜؜**مقیاس‌پذیری و پارتیشن‌بندی؜**: بر اساس ‎term-range‎ یا ‎hash‎؛ ادغام ‎segment‎ها (ضمنی). ؜ 
- ؜؜**Caching؜**: کش‌کردن دیکشنری واژگان داغ (جزئیات بیان نشد). ؜ 
- ؜؜**مدل سازگاری؜**: ‎eventual‎ میان ‎segment‎ها (ضمنی). ؜ 
- ؜؜**Hot Key/گلوگاه؜**: واژه‌های بسیار پرتکرار (مثل «the») و ‎postings‎ خیلی بلند؛ با ‎preprocessing/weighting‎ کنترل می‌شوند. ؜ 
- ؜؜**مدیریت خطا؜**: ‎rebuild/merge retry‎ (ضمنی). ؜ 
- ؜؜**هزینه؜**: ‎compressed postings‎ برای کاهش ‎RAM/disk‎. ؜ 
؜[Personal note: در مقیاس بزرگ، طراحی‌های ‎log‑structured/LSM‎ برای ‎write/merge throughput‎ مرسوم‌اند.]

؜[Ask AI: Subsystem - ؜Indexing](https://alisol.ir/?ai=Subsystem%20-%20Indexing%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%7Cfa)

### ؜۸.۳ زیرسامانه: Query Processing
- ؜؜**نقش و مسئولیت‌ها؜**: تفسیر کوئری، واکشی ‎postings‎، اجرای عملیات مجموعه‌ای، ارزیابی ‎phrase/proximity‎ و مونتاژ خروجی. ؜ 
- ؜؜**انواع کوئری؜**:
  - ؜؜**تک‌واژه؜**: ‎O(1) dictionary lookup‎ → ‎postings list‎. ؜ 
  - ؜؜**Conjunctive (AND)؜**: ‎intersection‎ ‎postings‎ برای بازگردانی اسنادی که همهٔ ترم‌ها را دارند. ؜ 
  - ؜؜**Disjunctive (OR)؜**: ‎union‎ برای پوشش بیشتر. ؜ 
  - ؜؜**Phrase؜**: بررسی مجاورت/ترتیب ‎positions‎ (مثلاً ۲،۳،۴). ؜ 
  - ؜؜**Prefix/Suffix/Wildcard؜**: دیکشنری ‎sorted‎ + ‎binary search‎ یا ‎trie/k‑grams‎. ؜ 
؜  [Personal note: ‎leading/mid‑word wildcard‎ هنوز گران است؛ ایندکس‌های خاص یا ‎n‑gram‎ می‌تواند کمک کند.]

؜[Ask AI: Subsystem - ؜Query Processing](https://alisol.ir/?ai=Subsystem%20-%20Query%20Processing%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%7Cfa)

---

## ؜موازنه‌ها و گزینه‌های جایگزین

| موضوع | گزینهٔ A | گزینهٔ B | نظر ویدئو | استدلال (از ویدئو) |
| --- ؜| --- ؜| --- ؜| --- ؜| --- ؜|
| ‎stop words‎ | حذف واژه‌های رایج | نگه‌داری/کم‌وزن‌کردن | حذف | کاهش نویز و اندازهٔ ایندکس. ؜|
| نرمال‌سازی | ‎stemming‎ | ‎lemmatization‎ | هر دو | ریشه‌سازی برای تطبیق بهتر. ؜ [Personal note: در ۲۰۲۵ ‎lemmatization/light stemming‎ را ترجیح دهید.] |
| ذخیرهٔ ‎postings‎ | ‎bitset‎ ساده | ‎(docID, freq, positions)‎ | غنی | پشتیبانی ‎phrase/proximity‎ و سیگنال‌های ‎ranking‎. ؜|
| کوئری چندکلمه‌ای | ‎Conjunctive (AND)‎ | ‎Disjunctive (OR)‎ | هر دو | ‎AND‎ برای دقت؛ ‎OR‎ برای پوشش. ؜|
| ‎prefix search‎ | دیکشنری ‎sorted‎ + ‎binary search‎ | ‎trie/k‑gram‎ | ‎sorted dict‎ | امکان ‎range lookup‎ کارا. ؜|
| ‎index lookup‎ | ‎B‑tree/dictionary‎ | ‎hash map‎ | هر دو | نگاشت سریع ‎term→postings‎. ؜ [Personal note: امروزه ‎LSM‑style segments‎ برای ‎write throughput‎ رایج‌اند.] |

؜[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%7Cfa)

---

## ؜قابلیت اطمینان، دسترس‌پذیری و کارایی

فراتر از اهداف «تأخیر کم» و «توان بالا»، چیزی در ویدئو بیان نشد.

؜[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%7Cfa)

---

## ؜امنیت و حریم خصوصی

در ویدئو بیان نشده است.

؜[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%7Cfa)

---

## ؜مشاهده‌پذیری (Observability)

در ویدئو بیان نشده است.

؜[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%7Cfa)

---

## ؜پرسش‌های پیگیری (از مصاحبه‌گر)

بیان نشده است.

؜[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%7Cfa)

---

## ؜پرسش‌های کاندیدا (اگر شبیه‌سازی شده)

بیان نشده است.

؜[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%7Cfa)

---

## ؜جمع‌بندی نکات کلیدی

- ؜‎inverted index‎ قلب جست‌وجوی سریع متن است. ؜ 
- ؜ذخیرهٔ ‎positions‎ در ‎postings‎ امکان ‎phrase/proximity query‎ را می‌دهد. ؜ 
- ؜‎AND‎ در برابر ‎OR‎ تعادل دقت/پوشش را می‌سازد. ؜ 
- ؜‎preprocessing‎ (‎stop words‎، ‎stemming/lemmatization‎) اندازهٔ واژگان را کوچک و تطبیق را بهتر می‌کند—اما با احتیاط. ؜ 
؜  [Personal note: analyzerهای زبان‌محور/lemmatization‎ معمولاً برای ‎phrase/snippet‎ بهترند؛ حذف کامل ‎stop words‎ می‌تواند دردسرساز باشد.]  
- ؜دیکشنری ‎sorted‎ جست‌وجوی ‎prefix‎ را کارا می‌کند؛ ‎wildcard‎ها نیازمند ساختار ویژه‌اند. ؜ 
- ؜موازنهٔ ‎space/time‎ در انتخاب ‎postings/compression‎ مهم است. ؜ 
- ؜‎Lucene/Solr/Elasticsearch‎ پیاده‌سازی‌های عملی این ایده‌ها هستند. ؜ 
؜  [Personal note: نسخه‌های ‎managed/hosted‎ هزینهٔ عملیات را کم می‌کنند بدون تغییر مفهوم اصلی.]

؜[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%7Cfa)

---

## ؜واژگان (اصطلاحات استفاده‌شده)

- ؜؜**Inverted Index؜**: نگاشت ‎term‎ به اسنادی که شامل آن‌اند (به‌همراه ‎frequency/positions‎). ؜ 
- ؜؜**Postings List؜**: لیست ‎(docID, term frequency, positions)‎ برای یک ‎term‎.
- ؜؜**Stop Words؜**: واژه‌های بسیار رایج که معمولاً حذف یا کم‌وزن می‌شوند (مثل «the»). ؜ 
- ؜؜**Stemming؜**: حذف پسوندها برای رسیدن به ریشهٔ واژه (لزومی ندارد واژهٔ واقعی شود). ؜ 
- ؜؜**Lemmatization؜**: نرمال‌سازی به صورت واژهٔ دیکشنری با دانش زبانی. ؜ 
- ؜؜**Conjunctive Query (AND)؜**: اسنادی را می‌آورد که همهٔ ترم‌ها را دارند. ؜ 
- ؜؜**Disjunctive Query (OR)؜**: اسنادی را می‌آورد که حداقل یکی از ترم‌ها را دارند. ؜ 
- ؜؜**Phrase Query؜**: تطبیق واژه‌ها به‌ترتیب و مجاور هم. ؜ 
- ؜؜**Prefix/Wildcard Search؜**: تطبیق با ‎prefix‎ یا الگوهای خاص با دیکشنری مرتب/ساختارهای ویژه.

؜[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CTech%20Dummies%20-%20Narendra%20Lakshmana%20Gowda%7CDesign%20Google%20Search%20%7C%20How%20Google%20searches%20one%20document%20among%20Billions%20of%20documents%20quickly%7Cfa)

---

## ؜دربارهٔ خلاصه‌کننده
من «Ali Sol» هستم، توسعه‌دهندهٔ PHP. ؜ 
- ؜وب‌سایت: [alisol.ir](https://www.alisol.ir)  
- ؜لینکدین: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
