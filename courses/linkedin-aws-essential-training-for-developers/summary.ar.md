# ملخص الكورس: AWS Essential Training for Developers
 
* **المنصة**: LinkedIn Learning
* **المُدرّس**: Jeremy Villeneuve
* **التقييم**: 4.8/5
* **تاريخ التحديث**: سبتمبر 2023
* **رابط الكورس**: https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791

*هذا المستند يلخص أهم النقاط من الكورس. أنصحك بشدة بمشاهدة الكورس كاملًا إذا كانت لديك الفرصة.*

## قبل أن تبدأ
- أُلخّص في هذه السلسلة أهم النقاط من الكورسات المفيدة حتى أستطيع التعلّم والمراجعة بسرعة.
- يمكنك ببساطة الضغط على روابط `Ask AI` للغوص أكثر في أي موضوع تريده.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=4ea0b5d0 -->

### AI-Powered buttons

Teach Me:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=ar&src=courses/linkedin-aws-essential-training-for-developers) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=ar&src=courses/linkedin-aws-essential-training-for-developers) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=ar&src=courses/linkedin-aws-essential-training-for-developers) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=ar&src=courses/linkedin-aws-essential-training-for-developers) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=ar&src=courses/linkedin-aws-essential-training-for-developers) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=ar&src=courses/linkedin-aws-essential-training-for-developers) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=ar&src=courses/linkedin-aws-essential-training-for-developers) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=ar&src=courses/linkedin-aws-essential-training-for-developers) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=ar&src=courses/linkedin-aws-essential-training-for-developers) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=ar&src=courses/linkedin-aws-essential-training-for-developers) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=ar&src=courses/linkedin-aws-essential-training-for-developers) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=ar&src=courses/linkedin-aws-essential-training-for-developers)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=ar&src=courses/linkedin-aws-essential-training-for-developers) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=ar&src=courses/linkedin-aws-essential-training-for-developers) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=ar&src=courses/linkedin-aws-essential-training-for-developers) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=ar&src=courses/linkedin-aws-essential-training-for-developers) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=ar&src=courses/linkedin-aws-essential-training-for-developers)
<!-- LH-BUTTONS:END --> 

## [الموضوع 1: مقدمة عن AWS]

* **الملخص**: يبدأ هذا الجزء بنظرة عامة على كيفية التعامل مع AWS، ويتم تشبيهها بسفينة فضائية تحتوي على خدمات متعددة. يشرح أهداف الكورس مثل فهم الخدمات الأساسية، وأيقوناتها، ومتى نستخدم كل خدمة، بالإضافة إلى المتطلبات المسبقة مثل معرفة أساسيات الحاسوب والشبكات.
* **مثال**: تخيّل حساب AWS الخاص بك مثل Millennium Falcon لفِرَق صغيرة أو Starship Enterprise للمؤسسات الأكبر، حتى تتخيّل حجم البيئة وطريقة إدارتها.
* **رابط لمزيد من التفاصيل**: [Ask AI: Introduction to AWS](https://alisol.ir/?ai=Introduction%20to%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ar)

## [الموضوع 2: إعداد حساب AWS والأمان]

* **الملخص**: تتعلم هنا كيفية إنشاء حساب AWS root، وإنشاء مستخدمي IAM للوصول الآمن، وتوليد API keys، وضبط تنبيهات الفوترة لتجنب المفاجآت. يتم التركيز على حماية حساب الـ root باستخدام MFA، وتطبيق مبدأ أقل صلاحيات ممكنة (Least Privilege).
* **مثال**: بعد إنشاء مستخدم IAM وإضافته إلى مجموعة "admins" مع صلاحية AdministratorAccess، تقوم بتسجيل الخروج من حساب الـ root وتستخدم مستخدم IAM في المهام اليومية، مثل قائد سفينة يسلّم القيادة الروتينية للفريق.
* **رابط لمزيد من التفاصيل**: [Ask AI: AWS Account Setup and Security](https://alisol.ir/?ai=AWS%20Account%20Setup%20and%20Security%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ar)

## [الموضوع 3: أساسيات الحوسبة السحابية]

* **الملخص**: يستعرض تحديات الاستضافة on‑premise قبل السحابة، ثم إطلاق EC2 للخوادم المرنة و S3 للتخزين، ومفهوم regions و Availability Zones من أجل التكرار والاستمرارية، بالإضافة إلى نموذج المسؤولية المشتركة حيث AWS تدير العتاد، وأنت تدير أمان السوفتوير والبيانات.
* **مثال**: قبل السحابة، التعامل مع ارتفاع مفاجئ في الترافيك كان يعني أسابيع من تجهيز العتاد الجديد. مع EC2 Auto Scaling، يمكن للخوادم أن تتمدّد تلقائيًا في عطلة نهاية الأسبوع مع زيادة الضغط ثم تعود للحجم الطبيعي يوم الإثنين.
* **رابط لمزيد من التفاصيل**: [Ask AI: Cloud Computing Fundamentals](https://alisol.ir/?ai=Cloud%20Computing%20Fundamentals%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ar)

## [الموضوع 4: EC2 Instances والتخزين]

* **الملخص**: يشرح كيفية إنشاء EC2 instances، واختيار النوع المناسب حسب الـ workload (مثل General Purpose)، وربط EBS volumes للتخزين الدائم، واستخدام Elastic IP للحصول على عنوان ثابت.
* **مثال**: تقوم بتشغيل t2.micro Ubuntu instance، وتتصل بها عبر SSH باستخدام key pair، وتربط بها EBS volume تمامًا كأنك تضيف external drive لتخزين بيانات التطبيق حتى بعد إيقاف الـ instance.
* **رابط لمزيد من التفاصيل**: [Ask AI: EC2 Instances and Storage](https://alisol.ir/?ai=EC2%20Instances%20and%20Storage%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ar)

## [الموضوع 5: الشبكات داخل AWS]

* **الملخص**: يتناول VPCs، و subnets للوصول العام/الخاص، و Load Balancers لتوزيع الترافيك، وخدمة CloudFront كـ CDN، و Route 53 لإدارة DNS لضمان اتصال موثوق.
* **مثال**: تقوم بإعداد VPC تحتوي على public subnets لسيرفرات الويب و private subnets لقواعد البيانات، ثم تستخدم Application Load Balancer لتوزيع الترافيك بالتساوي على السيرفرات، مثل إدارة حركة السفن نحو أرصفة مختلفة في الميناء.
* **رابط لمزيد من التفاصيل**: [Ask AI: Networking in AWS](https://alisol.ir/?ai=Networking%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ar)

## [الموضوع 6: حلول التخزين المتقدمة]

* **الملخص**: يناقش S3 للتخزين الكائني (Object Storage)، و Glacier للأرشفة طويلة الأمد، و Snowball لنقل البيانات الضخمة، و EFS كنظام ملفات مشترك، و Storage Gateway للحلول الهجينة بين On‑Premise و Cloud.
* **مثال**: يمكنك استخدام S3 لاستضافة ملفات static لموقعك مع جعل الـ bucket عامًا للقراءة، أو استخدام Snowball لنقل تيرابايتات من البيانات إلى AWS بدلًا من رفعها عبر الإنترنت البطيء.
* **رابط لمزيد من التفاصيل**: [Ask AI: Advanced Storage Solutions](https://alisol.ir/?ai=Advanced%20Storage%20Solutions%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ar)

## [الموضوع 7: خدمات قواعد البيانات]

* **الملخص**: من تشغيل قواعد البيانات على EC2 إلى استخدام الخدمات المُدارة مثل RDS / Aurora للبيانات العلائقية، و DynamoDB لقواعد NoSQL، و ElastiCache للـ caching، و Redshift لتحليل البيانات الضخمة، و Athena للاستعلام عن Data Lake موجودة على S3.
* **مثال**: تنشئ RDS MySQL instance لتخزين بيانات المستخدمين لتطبيق ويب، مع قابلية توسّع سهلة، أو تستخدم DynamoDB لتخزين key‑value في تطبيق high‑traffic مع Global Tables للنسخ في أكثر من region.
* **رابط لمزيد من التفاصيل**: [Ask AI: Database Services](https://alisol.ir/?ai=Database%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ar)

## [الموضوع 8: خدمات المراسلة والمنصات]

* **الملخص**: يقدّم Kinesis / SQS / SNS لأنظمة الرسائل والـ Queues، و Elastic Beanstalk لنشر التطبيقات بسهولة، و Lightsail كحل استضافة بسيط يشبه مزوّدي الاستضافة التقليديين.
* **مثال**: يمكنك استخدام SQS لوضع طلبات إنشاء التقارير في Queue عندما يزيد الضغط، حتى لا تُرهِق قاعدة البيانات، أو نشر موقع WordPress عبر Beanstalk للاستفادة من التحديثات والإدارة المبرمجة بدون إدارة السيرفرات يدويًا.
* **رابط لمزيد من التفاصيل**: [Ask AI: Messaging and Platform Services](https://alisol.ir/?ai=Messaging%20and%20Platform%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ar)

## [الموضوع 9: الحاويات و Serverless]

* **الملخص**: يشرح ECS / Fargate لتشغيل الحاويات، و ECR كـ Container Registry، و Lambda للـ Serverless Functions، بالإضافة إلى Batch و Step Functions لمعالجة الـ Jobs وتنسيق الـ Workflows.
* **مثال**: تقوم بتشغيل Microservice داخل حاويات ECS للحصول على قابلية توسّع عالية، أو تفعّل Lambda Function عند رفع ملف إلى S3 لتغيير حجم الصور أو معالجتها بدون إدارة أي سيرفر.
* **رابط لمزيد من التفاصيل**: [Ask AI: Containers and Serverless Computing](https://alisol.ir/?ai=Containers%20and%20Serverless%20Computing%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ar)

## [الموضوع 10: خدمات SaaS]

* **الملخص**: يغطي Cognito لإدارة هوية المستخدمين وتسجيل الدخول، و API Gateway / AppSync لبناء Backends، و SageMaker / AI & ML APIs لإضافة الذكاء إلى التطبيقات، و MediaConvert للفيديو، و IoT Core لإدارة الأجهزة المتصلة.
* **مثال**: تدمج Cognito لتوفير تسجيل دخول آمن مع مزوّدي هوية مثل Google و Facebook، أو تستخدم Rekognition لاكتشاف الوجوه في الصور المرفوعة في تطبيق اجتماعي.
* **رابط لمزيد من التفاصيل**: [Ask AI: SaaS Services](https://alisol.ir/?ai=SaaS%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ar)

## [الموضوع 11: DevOps داخل AWS]

* **الملخص**: يعرّف DevOps كجسر بين التطوير (Dev) والعمليات (Ops)، مع خدمات مثل CodePipeline من أجل CI/CD، و CloudFormation للبنية التحتية ككود (Infrastructure as Code)، و CloudWatch للمراقبة التي تتجاوز مجرد مراقبة الـ Uptime.
* **مثال**: تنشئ Pipeline تقوم آليًا بنشر تغييرات الكود من GitHub إلى ECS بعد نجاح الاختبارات، مما يسمح بإصدارات متكرّرة وسريعة بدون تدخّل يدوي.
* **رابط لمزيد من التفاصيل**: [Ask AI: DevOps in AWS](https://alisol.ir/?ai=DevOps%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ar)

## [الموضوع 12: الأمان في AWS]

* **الملخص**: يناقش WAF / Shield كجدار حماية وحماية من الهجمات، و Inspector / GuardDuty / Macie للفحص والكشف عن التهديدات، و CloudTrail / Security Hub للتدقيق والتجميع المركزي لإشعارات الأمان.
* **مثال**: يمكنك تفعيل GuardDuty لاكتشاف سلوكيات غير طبيعية على الخوادم مثل اتصالات شبكة غريبة، كأنه حارس افتراضي يراقب محاولات الاختراق أو الاستغلال من الداخل.
* **رابط لمزيد من التفاصيل**: [Ask AI: Security in AWS](https://alisol.ir/?ai=Security%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ar)

## [الموضوع 13: الخاتمة]

* **الملخص**: يختتم الكورس بنصائح لتنظيف الموارد بعد التجارب لتفادي الرسوم، ومصادر مثل مدونات وأحداث AWS للبقاء على اطلاع، بالإضافة إلى نصائح حول الشهادات مع مشاريع عملية.
* **مثال**: بعد الانتهاء من الـ Demos، تقوم بحذف EC2 instances غير المستخدمة وحذف S3 buckets التجريبية للبقاء داخل حدود Free Tier وتجنّب الفواتير غير المتوقعة.
* **رابط لمزيد من التفاصيل**: [Ask AI: Conclusion](https://alisol.ir/?ai=Conclusion%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ar)

## الكورس الأصلي
للحصول على التجربة الكاملة، يمكنك مشاهدة [الكورس الأصلي على LinkedIn Learning](https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791).

---

**عن مُلخِّص الكورس**

أنا *Ali Sol*، Backend Developer. تعرّف عليّ أكثر:
- الموقع: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

