# ؜مصاحبهٔ طراحی سیستم: طراحی واتس‌اپ | سامانه‌های Chat

- ؜؜**کانال/مصاحبه‌کننده؜**: Gaurav Sen  
- ؜؜**مدت؜**: ‎00:25:12‎  
- ؜؜**ویدئوی اصلی؜**: https://www.youtube.com/watch?v=vvhC64hQZMk  

*این سند خلاصهٔ یک مصاحبهٔ طراحی سیستم است. ؜دیدن ویدئوی کامل توصیه می‌شود.*

---

## ؜خلاصهٔ یک‌صفحه‌ای (۲–۳ دقیقه)

- ؜؜**صورت‌مسئله (یک‌خطی)؜**: طراحی یک اپ چت به سبک WhatsApp با ۱:۱، گروه‌ها، پیام‌های media، رسیدهای sent/delivered/read و وضعیت online/last‑seen.
- ؜؜**دامنه؜**
  - ؜؜**در دامنه؜**: ۱:۱؛ گروه؛ ماندگاری پیام و retry؛ رسیدهای ارسال/تحویل/خواندن؛ online/last‑seen؛ gateway؛ session routing؛ microservices؛ load balancing/retry؛ idempotency.
  - ؜؜**خارج از دامنه؜**: جزئیات auth؛ خط لولهٔ کامل image/video؛ جستجوی سراسری؛ analytics سنگین؛ رسیدهای گروهی به‌ازای تک‌نفر (گران).
- ؜؜**اولویت‌های غیرعملکردی؜**: real‑time؛ مقیاس‌پذیری افقی؛ high availability؛ تخریبِ دلپذیر؛ هزینهٔ کم در gateway.
- ؜؜**قیود کلیدی؜**: سقف اعضای گروه (~۲۰۰) برای کنترل fan‑out؛ نگهداشت موقت/دائمی پیام‌ها بسته به نیاز.

- ؜؜**معماری سطح‌بالا (متنی)؜**
  1. ؜کلاینت موبایل ؜**WebSocket؜** پایدار با ؜**Gateway؜**.
؜  2. ؜Gatewayها ساده (dumb)؛ منطق را به سرویس‌ها می‌سپاریم.
  3. ؜؜**Session Service؜** نگاشت user↔connection را نگه می‌دارد و مسیردهی می‌کند.
  4. ؜؜**Group Service؜** نگاشت group→members؛ برای fan‑out توسط Session کوئری می‌شود.
  5. ؜؜**Parser/Unparser؜**: تبدیل JSON خارجی به RPC داخلی (مثلاً Thrift / بهتر: gRPC+Protobuf).
  6. ؜؜**Message Store/Queue؜**: پایداری پیام، retry و idempotency.
  7. ؜؜**Last‑Seen/Presence؜**: به‌روزرسانی و سرو وضعیت.
؜  8. ؜Load balancer + service discovery/heartbeats.

- ؜؜**مبادلات کلیدی؜**
؜  - ؜WebSocket در برابر HTTP long‑polling.
؜  - ؜fan‑out لحظهٔ ارسال در برابر pull/batch.
؜  - ؜gateway ساده در برابر edge پر‌قابلیت.
  - ؜ذخیرهٔ صرفاً device در برابر server‑durable.
  - ؜رسیدهای دقیق در برابر حذف/ساده‌سازی.

- ؜؜**ریسک‌ها؜**
  - ؜فشار حافظهٔ gateway به‌علت اتصالات زیاد.
  - ؜گروه‌های داغ و backpressure.
  - ؜تزریق state در gateway و تکرار.
  - ؜طوفانِ retry بدون idempotency.
  - ؜اولویت‌دهی بیش از حد به last‑seen در پیک‌ها.

- ؜؜**فلش‌کارت ۵ دقیقه‌ای؜**
  - ؜؜**س:؜** چرا WebSocket؟ ؜**ج:؜** push دوطرفه با latency کم، بی‌نیاز از polling.
  - ؜؜**س:؜** Session چه نگه می‌دارد؟ ؜**ج:؜** user→gateway/connection برای routing.
  - ؜؜**س:؜** عضویت گروه کجاست؟ ؜**ج:؜** Group Service (جدا از Session).
  - ؜؜**س:؜** سبک نگه‌داشتن gateway؟ ؜**ج:؜** offload parsing/auth؛ state بیرون.
  - ؜؜**س:؜** جلوگیری از SPOF؟ ؜**ج:؜** replication + discovery + LB.
  - ؜؜**س:؜** پیاده‌سازی receipts؟ ؜**ج:؜** ACK از کلاینت؛ persist برای retry.
  - ؜؜**س:؜** در پیک سال نو چه را سبک کنیم؟ ؜**ج:؜** last‑seen/receipts؛ اولویت send+ACK.
  - ؜؜**س:؜** مهار fan‑out گروه‌های بزرگ؟ ؜**ج:؜** سقف عضو، batch/pull در افراط.
  - ؜؜**س:؜** چرا idempotency؟ ؜**ج:؜** تحمل retry و حذف duplicate.
  - ؜؜**س:؜** consistent hashing کجا؟ ؜**ج:؜** shard کردن groupId.
  - ؜؜**س:؜** ارزش Parser/Unparser؟ ؜**ج:؜** payload خارجی → RPC داخلی.
  - ؜؜**س:؜** چرا نه long‑polling؟ ؜**ج:؜** real‑time کافی نیست.

[Ask AI: Executive Summary](https://alisol.ir/?ai=Executive%20Summary%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

---

## ؜برچسب‌های مصاحبه

- ؜؜**دامنه/صنعت؜**: messaging، social‑media، collaboration
- ؜؜**الگوی محصول؜**: realtime‑chat، notification، queue، rate‑limit
- ؜؜**نگرانی‌های سیستمی؜**: high‑availability، low‑latency، throttling، backpressure، privacy
- ؜؜**فناوری/زیرساخت (ذکر شده)؜**: microservices، websocket، thrift، rest (در عمل gRPC/Protobuf رایج‌تر است)

[Ask AI: Interview Tags](https://alisol.ir/?ai=Interview%20Tags%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

---

## ؜فهم مسئله

- ؜؜**پرامپت اصلی؜**: ساخت WhatsApp‑like chat با ۱:۱ و گروه، media، رسیدهای sent/delivered/read و online/last‑seen؛ تمرکز بر اولویت‌بندی.
- ؜؜**use‑caseها؜**
  - ؜ارسال/دریافت ۱:۱ با رسیدها.
  - ؜ایجاد/عضویت گروه و fan‑out به همهٔ اعضا.
  - ؜نمایش online یا last‑seen.
  - ؜تحمل خطا با retry و durability در صورت نیاز.
- ؜؜**خارج از دامنه؜**
  - ؜رسید تحویل/خواندن به‌ازای هر عضو گروه (هزینه‌بر).
  - ؜جزئیات کامل media pipeline.
؜  - ؜auth عمیق و اعلان‌های email/SMS.

[Ask AI: Problem Understanding](https://alisol.ir/?ai=Problem%20Understanding%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

---

## ؜نیازمندی‌ها و قیود

### ؜داده‌شده در ویدئو
- ؜؜**عملکردی؜**
  - ؜چت ۱:۱ با رسیدها.
  - ؜گروه با سقف ~۲۰۰ عضو.
  - ؜وضعیت online/last‑seen.
  - ؜ماندگاری پیام و retry تا تحویل.
- ؜؜**غیرعملکردی؜**
؜  - ؜real‑time با ؜**WebSocket؜**.
  - ؜مقیاس افقی؛ حذف SPOF.
؜  - ؜gateway سبک؛ سرویس‌ها decoupled.
؜  - ؜graceful degradation در پیک‌ها.

### ؜فرضیات (محافظه‌کارانه)
- ؜ذخیرهٔ server‑side در صورت الزامات؛ در غیر این صورت device‑only (حریم‌خصوصی/هزینه).
؜- ؜backoff نمایی در کلاینت؛ retry محدود در سرور + DLQ.
؜- ؜idempotency‑key روی send.

[Ask AI: Requirements & Constraints](https://alisol.ir/?ai=Requirements%20and%20Constraints%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

---

## ؜برآورد سرانگشتی

- ؜در ویدئو داده نشده است. ؜(صرف‌نظر)

[Ask AI: Estimation](https://alisol.ir/?ai=Estimation%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

---

## ؜معماری سطح‌بالا

- ؜؜**Clients؜**: موبایل با ؜**WebSocket؜** پایدار به ؜**Gateway؜**. ؜ 
- ؜؜**Gateways؜**: خاتمهٔ TCP/WebSocket؛ منطق کم؛ فوروارد payload به Parser/Unparser؛ برای routing از Session می‌پرسد. ؜ 
- ؜؜**Parser/Unparser؜**: تبدیل JSON/WebSocket به RPC داخلی (Thrift یا gRPC/Protobuf). ؜ 
- ؜؜**Session Service؜**: روتر مرکزی؛ نگاشت user→connection؛ پرس‌وجو از Group برای fan‑out. ؜ 
- ؜؜**Group Service؜**: نگهداشت group→members؛ شاردینگ با ؜**consistent hashing؜** روی groupId. ؜ 
- ؜؜**Message Queue/Store؜**: پایداری و retry + idempotency؛ ارسال فوری «sent» و پس از ACK «delivered». ؜ 
- ؜؜**Last‑Seen Service؜**: ثبت activity کاربر؛ پاسخ به online/last‑seen. ؜ 
- ؜؜**Load Balancing & Discovery؜**: LB در edge؛ heartbeats/discovery بین سرویس‌ها.

[Ask AI: High-Level Architecture](https://alisol.ir/?ai=High-Level%20Architecture%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

---

## ؜زیرسیستم‌ها

### ؜۸.۱ Gateway
- ؜نقش: نگهداری اتصال TCP/WebSocket؛ پذیرش frame؛ پرهیز از parsing/auth سنگین.
- ؜مقیاس‌پذیری: افقی؛ بدون state (بجز جدول اتصال)؛ پشت LB.
- ؜خطا: در فشار، کارهای غیرضروری (last‑seen/receipt) را رها کند.
- ؜گلوگاه: حافظهٔ connection؛ CPU برای parsing.

[Ask AI: Subsystem - ؜Gateway](https://alisol.ir/?ai=Subsystem%20-%20Gateway%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

### ؜۸.۲ Session Service
- ؜نقش: مرجع user→box؛ مسیردهی ۱:۱ و گروه.
- ؜مدل داده: `userId -> connection(boxId)`؛ گذرا، cache‑محور.
- ؜سازگاری: eventual کافی است؛ heartbeat مکرر.
- ؜تاب‌آوری: نمونه‌های تکرارشده؛ بدون SPOF.

[Ask AI: Subsystem - ؜Session Service](https://alisol.ir/?ai=Subsystem%20-%20Session%20Service%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

### ؜۸.۳ Group Service
- ؜نقش: `groupId -> [memberUserIds]`.
- ؜مقیاس: ؜**consistent hashing؜** روی groupId؛ cache محلی.
؜- ؜fan‑out: Session اعضا را می‌گیرد و از طریق gatewayهای مربوط push می‌کند.
- ؜محدودیت: سقف اندازهٔ گروه (~۲۰۰).

[Ask AI: Subsystem - ؜Group Service](https://alisol.ir/?ai=Subsystem%20-%20Group%20Service%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

### ؜۸.۴ Parser/Unparser
- ؜نقش: تبدیل JSON/HTTP/WebSocket به RPC داخلی؛ تکامل schema در یک لایهٔ متمرکز.
- ؜نکته: gateway سبک می‌ماند؛ interfaceهای داخلی schema‑validated می‌شوند.

[Ask AI: Subsystem - ؜Parser/Unparser](https://alisol.ir/?ai=Subsystem%20-%20Parser%2FUnparser%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

### ؜۸.۵ Messaging & Receipts
- ؜جریان: Sender→Gateway→Session→ReceiverGateway→Receiver؛ سپس ACK؛ «delivered» با ACK و «read» هنگام باز شدن چت.
؜- ؜idempotency: با messageId یا client‑token برای حذف duplicate.
؜- ؜queue/retry: تضمین ارسال؛ retry با سقف و تاخیر؛ DLQ در خطاهای ماندگار.

[Ask AI: Subsystem - ؜Messaging & Receipts](https://alisol.ir/?ai=Subsystem%20-%20Messaging%20%26%20Receipts%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

### ؜۸.۶ Last‑Seen/Presence
- ؜نقش: ردگیری آخرین activity کاربر (user‑initiated)؛ online (زیر ۱۰–۱۵ثانیه) یا نمایش timestamp.
- ؜نکتهٔ کلاینت: تفکیک درخواست‌های کاربر از سیستم تا polling پس‌زمینه وضعیت را تغییر ندهد.

[Ask AI: Subsystem - ؜Last Seen](https://alisol.ir/?ai=Subsystem%20-%20Last%20Seen%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

---

## ؜مبادلات و جایگزین‌ها

| موضوع | گزینه A | گزینه B | گرایش ویدئو | منطق |
|---|---|---|---|---|
| server push | WebSockets | HTTP long‑polling | WebSockets | real‑time و دوطرفه در برابر polling دوره‌ای |
| منطق gateway | gateway «ساده» | edge پرقابلیت | ساده | صرفه‌جویی CPU/RAM به‌ازای اتصال |
| رسید گروهی | per‑member | حذف/جزئی | حذف/جزئی | هزینهٔ زیاد در گروه‌های بزرگ |
| مدل تحویل گروه | fan‑out فوری | pull/batching | فوری (با سقف) | latency کم برای chat |
| تبدیل payload | Parser/Unparser (Thrift) | parsing در gateway | Parser/Unparser | سبک‌سازی edge |
| مدل ذخیره | device‑only | server‑durable | وابسته به نیاز | حریم‌خصوصی/هزینه در برابر قابلیت اتکا |

[Ask AI: Trade-offs](https://alisol.ir/?ai=Trade-offs%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

---

## ؜پایداری، دسترس‌پذیری، کارایی

- ؜؜**Replication/بدون SPOF؜**: چندنمونه‌ای برای Session/Group/Last‑Seen/Parser/Queue.
- ؜؜**Backpressure & Throttling؜**: نرخ‌دهی و صف؛ رهاسازی کارهای غیرضروری هنگام پیک.
- ؜؜**Degradation؜**: اولویت مسیر send+ACK نسبت به سیگنال‌های ثانویه.
- ؜؜**Retry؜**: سمت سرور با idempotency‑key؛ شکست پس از N تلاش گزارش شود.

[Ask AI: Reliability and Performance](https://alisol.ir/?ai=Reliability%20and%20Performance%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

---

## ؜امنیت و حریم خصوصی

- ؜؜**Auth؜**: سرویس جداگانه؛ جزئیات بحث نشده.
- ؜؜**Privacy؜**: چت‌های موقت (device‑only) ممکن؛ الزامات انطباق را بسنجید.

[Ask AI: Security and Privacy](https://alisol.ir/?ai=Security%20and%20Privacy%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

---

## ؜مشاهده‌پذیری

- ؜به discovery/heartbeats اشاره شد؛ metrics/tracing مفصل مطرح نشد.

[Ask AI: Observability](https://alisol.ir/?ai=Observability%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

---

## ؜پرسش‌های پیگیری

- ؜ذکر نشده است.

[Ask AI: Follow-up Questions](https://alisol.ir/?ai=Follow-up%20Questions%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

---

## ؜پرسش‌های کاندید

- ؜ذکر نشده است.

[Ask AI: Candidate Questions](https://alisol.ir/?ai=Candidate%20Questions%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

---

## ؜نکات کلیدی

- ؜استفاده از ؜**WebSocket؜** برای real‑time دوطرفه؛ پرهیز از long‑polling. ؜ 
- ؜؜**Gateway؜**‌ها را ساده نگه دارید؛ منطق را به سرویس‌ها بدهید. ؜ 
- ؜؜**Session routing؜** مرکزی برای user→box. ؜ 
- ؜؜**Group Service؜** جدا و شارد با ؜**consistent hashing؜**. ؜ 
- ؜؜**Message queue؜** + ؜**idempotency؜** برای تحویل مطمئن. ؜ 
- ؜اولویت ؜**send+ACK؜**؛ سبک‌سازی ؜**last‑seen/receipts؜** در پیک‌ها. ؜ 
- ؜انتخاب بین ؜**device‑only؜** و ؜**server‑durable؜** براساس نیاز. ؜ 
- ؜لایهٔ ؜**Parser/Unparser؜** برای استانداردسازی RPC داخلی (gRPC/Protobuf متداول). ؜ 
- ؜سقف اندازهٔ گروه برای fan‑out قابل پیش‌بینی.

[Ask AI: Key Takeaways](https://alisol.ir/?ai=Key%20Takeaways%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

---

## ؜واژه‌نامه

- ؜؜**WebSocket؜**: کانال پایدار دوطرفه روی TCP. ؜ 
- ؜؜**Session Service؜**: روترِ نگاشت user→connection. ؜ 
- ؜؜**Group Service؜**: نگهدارندهٔ group→members. ؜ 
- ؜؜**Consistent Hashing؜**: روش sharding با remap کم هنگام تغییر نود. ؜ 
- ؜؜**Idempotency؜**: اجرای تکراری با اثر واحد. ؜ 
- ؜؜**Load Shedding؜**: رهاسازی کار برای حفاظت از هستهٔ سیستم. ؜ 
- ؜؜**Parser/Unparser؜**: مبدل payload خارجی به RPC داخلی. ؜ 
- ؜؜**ACK؜**: تایید گیرنده برای receipts.

[Ask AI: Glossary](https://alisol.ir/?ai=Glossary%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

---

## ؜برنامهٔ مطالعه (اختیاری)

- ؜مرور: WebSocket vs SSE vs HTTP/2 push؛ retry/backoff؛ idempotency keys؛ consistent hashing؛ الگوهای fan‑out؛ discovery/heartbeats؛ استراتژی‌های graceful degradation. ؜ 
  - ؜نکته: TLS 1.3 توصیه می‌شود؛ قدیمی‌ترها منسوخ.

[Ask AI: Study Plan](https://alisol.ir/?ai=Study%20Plan%7CGaurav%20Sen%7CDesign%20WhatsApp%20%7C%20Chat%20Messaging%20Systems|fa|fa)

---

## ؜انتساب

- ؜؜**ویدئو؜**: https://www.youtube.com/watch?v=vvhC64hQZMk  
- ؜؜**کانال؜**: Gaurav Sen  
- ؜؜**یادداشت؜**: این سند خلاصهٔ ویدئو است.

---

## ؜دربارهٔ خلاصه‌کننده

من *Ali Sol* (توسعه‌دهندهٔ PHP) هستم:  
- ؜وب‌سایت: https://www.alisol.ir  
- ؜لینکدین: https://www.linkedin.com/in/alisolphp
