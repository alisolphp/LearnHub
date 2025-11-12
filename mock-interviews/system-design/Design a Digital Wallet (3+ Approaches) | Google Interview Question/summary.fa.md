# ؜یادداشت‌های خلاصه و آمادگی — طراحی کیف‌پول دیجیتال (Digital Wallet) با چند رویکرد

؜**System Design Mock Interview:؜** طراحی یک Digital Wallet (حداقل ۳ رویکرد) | پرسش مصاحبه Google  
؜**Channel/Interviewer:؜** System Design Fight Club  
؜**Duration:؜** 01:48:59  
؜**Original Video:؜** https://www.youtube.com/watch?v=4ijjIUeq6hE

---

## ؜خلاصهٔ خیلی کوتاه (TL;DR)
- ؜سیستم را به ؜**Transaction Service/DB؜** و ؜**Wallet Service/DB؜** تفکیک کن.
- ؜برای هماهنگی دبیـت→کردیـت و جبران‌ها از ؜**Saga؜** استفاده کن.
- ؜؜**Idempotency؜** را با یک transaction key که همراه آپدیت موجودی ثبت می‌شود enforce کن.
- ؜؜**CDC؜** را به یک ؜**OLAP/Audit؜** warehouse فید بده.
- ؜برای دقت در debit/credit از ؜**single-leader stores؜** مثل DynamoDB، Postgres/Cockroach/Cosmos استفاده کن. ؜ 
[Ask AI: TL;DR](https://alisol.ir/?ai=TL%3BDR%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

---

## ؜نیازمندی‌های عملکردی
- ؜ایجاد و ثبت تراکنش P2P.
- ؜خواندن وضعیت تراکنش و خواندن موجودی با منطق سازگار.
- ؜؜**جلوگیری از دوبار شارژ شدن؜** و امکان retry امن (idempotency).
- ؜Auditing جدا از مسیر OLTP تا بار کم بماند. ؜ 
[Ask AI: Functional Requirements](https://alisol.ir/?ai=Functional%20Requirements%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

---

## ؜نیازمندی‌های غیرعملکردی
- ؜؜**Throughput:؜** از صدها هزار تا ~۱M TPS.
- ؜تاخیر انتهایی کم؛ مقیاس‌پذیر افقی.
- ؜تاب‌آوری: retries، backoff، و compensations. ؜ 
[Ask AI: Non-Functional Requirements](https://alisol.ir/?ai=Non-Functional%20Requirements%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

---

## ؜اجزای سطح‌بالا
- ؜؜**API Gateway / Transaction Receiver؜**
- ؜؜**Transaction DB؜** (status/intent)
- ؜؜**Wallet DB؜** (balances authoritative + applied txn ids)
- ؜؜**Saga Orchestrator؜** (مثلا Step Functions/Conductor)
- ؜؜**CDC/Stream؜** (Kafka/Kinesis) → ؜**Audit/OLAP؜**  
[Ask AI: High-Level Components](https://alisol.ir/?ai=High-Level%20Components%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

---

## ؜مدل‌های داده (طرح)
؜**Transaction (OLTP):؜** `txn_id, from_account, to_account, amount, created_at, status`  
؜**Wallet (OLTP):؜** `account_id, balance_minor_units, applied_txn_ids[]`  
؜**Audit (OLAP):؜** حقایق CDC برای هر تراکنش/تغییر وضعیت. ؜ 
[Ask AI: Data Models](https://alisol.ir/?ai=Data%20Models%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

---

## ؜فلو اصلی نوشتن (Orchestrated Saga)
1. ؜؜**Receive؜** درخواست با idempotency key → نوشتن txn به حالت `received`.
2. ؜؜**Debit؜** کیف فرستنده (کاهش مشروط + append کردن `txn_id`).
3. ؜؜**Credit؜** کیف گیرنده (increment idempotent + append `txn_id`).
4. ؜؜**Mark complete/failed؜** در Transaction DB.
5. ؜؜**CDC؜** به انبار Audit. ؜ 
[Ask AI: Core Write Flow](https://alisol.ir/?ai=Core%20Write%20Flow%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

---

## ؜خواندن‌ها و سازگاری (Reads & Consistency)
- ؜؜**لیست/وضعیت تراکنش‌ها:؜** از Transaction DB.
- ؜؜**موجودی‌ها:؜** جایی که لازم است strong read؛ در صورت نیاز semantics پِندینگ vs. ؜posted. ؜ 
[Ask AI: Reads & Consistency](https://alisol.ir/?ai=Reads%20%26%20Consistency%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

---

## ؜Idempotency و «اثر دقیقاً-یک‌بار»
- ؜کلاینت یک idempotency key می‌دهد / سرور `txn_id` صادر می‌کند.
- ؜آپدیت‌های Wallet قبل از اعمال، وجود `txn_id` را چک می‌کنند تا double-apply نشود.
- ؜retryها و تحویل out-of-order تبدیل به no-op امن می‌شوند. ؜ 
[Ask AI: Idempotency & Exactly-Once Effects](https://alisol.ir/?ai=Idempotency%20%26%20Exactly-Once%20Effects%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

---

## ؜همروندی و ترتیب (Concurrency & Ordering)
- ؜نیازی به global order نیست؛ stream/store های پارتیشن‌بندی‌شده کافی‌اند.
- ؜دبیـت همزمان: اولین کاهش مشروط موفق می‌شود؛ دومی با insufficient funds fail می‌شود. ؜ 
[Ask AI: Concurrency & Ordering](https://alisol.ir/?ai=Concurrency%20%26%20Ordering%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

---

## ؜مدیریت خطا (نمونه‌ها)
- ؜؜**Debit OK، Credit fail:؜** با re-credit کردن فرستنده جبران کن؛ وضعیت را failed علامت بزن.
- ؜؜**Receiver فریز/ناموجود:؜** جبران و fail با reason.
- ؜؜**Dropped ACKs:؜** idempotency جلوی duplicate را می‌گیرد. ؜ 
[Ask AI: Failure Handling](https://alisol.ir/?ai=Failure%20Handling%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

---

## ؜Auditing از مسیر CDC
- ؜با trigger/CDC حقایق OLTP را به Kafka/Kinesis استریم کن و در یک OLAP warehouse ingest کن.
- ؜بدین شکل اسکن‌های key-range تحقیقی روی مسیر OLTP نمی‌افتند. ؜ 
[Ask AI: Auditing via CDC](https://alisol.ir/?ai=Auditing%20via%20CDC%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

---

## ؜انتخاب ذخیره‌ساز
- ؜؜**single-leader databases؜** را ترجیح بده: DynamoDB، Postgres/Cockroach، Cosmos.
- ؜برای invariants کیف، از Cassandra بدون هماهنگی اضافی دوری کن. ؜ 
[Ask AI: Storage Choices](https://alisol.ir/?ai=Storage%20Choices%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

---

## ؜پارتیشن‌بندی / کلیدها
- ؜؜**Transaction DB:؜** با `txn_id` پارتیشن کن تا بار پخش شود.
- ؜؜**Wallet DB:؜** با `account_id` پارتیشن کن؛ رشد applied ids را مدیریت کن.
- ؜؜**Streams:؜** برای throughput پارتیشن؛ وابسته به global order نباش. ؜ 
[Ask AI: Partitioning / Keys](https://alisol.ir/?ai=Partitioning%20%2F%20Keys%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

---

## ؜سه رویکرد (مطابق ویدیو)

### ؜رویکرد ۱ — DynamoDB + Idempotency درون‌خطی
- ؜جدول Txn (status) + جدول Wallet با `applied_txn_ids[]`.
- ؜Saga: Debit → Credit → Mark Complete.
- ؜CDC به OLAP از طریق stream/processors. ؜ 
[Ask AI: Approach 1](https://alisol.ir/?ai=Approach%201%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

### ؜رویکرد ۲ — Postgres شاردشدهٔ دستی (Split Transactions)
- ؜ورودی‌های idempotency در یک جدول ؜**جدا؜** هم‌شارد با wallets.
- ؜تراکنش‌های چند-سطره داخل یک shard؛ همان الگوی Saga. ؜ 
[Ask AI: Approach 2](https://alisol.ir/?ai=Approach%202%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

### ؜رویکرد ۳ — حذف جدول Transaction تکراری (Variant)
- ؜جدول مرکزی Txn مینیمال/اختیاری؛ اتکا به لاگ‌های per-wallet + triggerها.
- ؜اگر نیازهای محصول/اپس به کشف/اختلافات باشد، یک جدول مینیمال Txn نگه‌دار. ؜ 
[Ask AI: Approach 3](https://alisol.ir/?ai=Approach%203%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

---

## ؜اسکچ API
```http
POST /transfers
Idempotency-Key: <client-uuid>
{ "from":"acct_456", "to":"acct_678", "amount_minor":5000 }

GET /transfers/{txn_id}
GET /wallets/{account_id}/balance
```
[Ask AI: API Sketch](https://alisol.ir/?ai=API%20Sketch%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

---

## ؜نکات گفتگو/مصاحبه و موازنه‌ها
- ؜؜**Sagas vs. ؜2PC/Raft؜**: کجا دسترسی‌پذیری را به‌جای هماهنگی سخت می‌پذیری.
- ؜؜**انتخاب‌های سازگاری؜** و اینکه کجا strong و کجا eventual کافی است.
- ؜؜**Idempotency؜** را روی سرور enforce کن، نه فقط با هدرهای کلاینت.
- ؜؜**CDC؜** برای ایزوله کردن OLTP از analytics.
- ؜؜**Hot keys & partitioning؜** strategies.
- ؜؜**Compensations؜** برای failureهای جزئی. ؜ 
[Ask AI: Interview Talking Points / Trade-offs](https://alisol.ir/?ai=Interview%20Talking%20Points%20%2F%20Trade-offs%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

---

## ؜نکات تازه (مرور ۲۰۲۵)
- ؜بدون هماهنگی اضافه، Cassandra هنوز گزینهٔ بدی برای invariants کیف است.
- ؜آرایهٔ درون‌خطی `applied_txn_ids[]` با رشد ترافیک احتمالاً باید offload شود.
- ؜Step Functions/Conductor همچنان مرسوم؛ برای هر گام idempotency + DLQ داشته باش.
- ؜برای strong read از حالت‌های primary/strong/serializable/bounded-staleness هر دیتاستور استفاده کن. ؜ 
[Ask AI: Freshness Review](https://alisol.ir/?ai=Freshness%20Review%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)

---

## ؜روی وایت‌برد چی بکشیم (فست)
1. ؜Client → Transaction API (Idempotency-Key). ؜ 
2. ؜Txn DB + Wallet DB (balance + idempotency). ؜ 
3. ؜؜**Saga؜** box: Debit → Credit → Complete (+ dashed compensate). ؜ 
4. ؜؜**CDC/Triggers → Stream → Audit Warehouse؜**. ؜ 
5. ؜یادداشت‌ها: single-leader store، conditional updates، strong reads، retries + DLQ. ؜ 
[Ask AI: What to draw on a whiteboard](https://alisol.ir/?ai=What%20to%20draw%20on%20a%20whiteboard%7CSystem%20Design%20Fight%20Club%7CDesign%20a%20Digital%20Wallet%20%283%2B%20Approaches%29%20%7C%20Google%20Interview%20Question%7Cfa)
