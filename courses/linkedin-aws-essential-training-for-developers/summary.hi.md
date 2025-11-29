# पाठ्यक्रम सारांश: AWS Essential Training for Developers

* **प्लेटफ़ॉर्म**: LinkedIn Learning
* **इंस्ट्रक्टर**: Jeremy Villeneuve
* **रेटिंग**: 4.8/5
* **अपडेट तिथि**: September 2023
* **कोर्स लिंक**: https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791

*यह डॉक्युमेंट कोर्स के मुख्य बिंदुओं का सारांश है। अगर आपके पास मौका हो तो पूरा कोर्स ज़रूर देखें।*

## शुरू करने से पहले
- मैं उपयोगी courses के key points का सारांश बनाता हूँ ताकि आप जल्दी सीख सकें और आसानी से revise कर सकें।
- किसी भी topic में गहराई से जाने के लिए बस `Ask AI` links पर क्लिक करें।

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## [टॉपिक 1: AWS का परिचय]

* **सारांश**: यह सेक्शन AWS को समझने के लिए एक overview देता है और इसे अलग‑अलग services वाली एक starship से compare करता है। इसमें course के goals शामिल हैं, जैसे कि main AWS services को समझना, उनके icons पहचानना, और यह जानना कि किस service को कब use करना है। साथ ही basic computer और networking knowledge जैसी prerequisites भी बताई जाती हैं।
* **उदाहरण**: अपने AWS account को small teams के लिए Millennium Falcon और बड़े operations के लिए Starship Enterprise की तरह imagine करें, ताकि आप scale और management को visualize कर सकें।
* **और जानकारी के लिए लिंक**: [Ask AI: Introduction to AWS](https://alisol.ir/?ai=Introduction%20to%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|hi)

## [टॉपिक 2: AWS Account Setup और Security]

* **सारांश**: इस भाग में AWS root account setup करना, सुरक्षित access के लिए IAM users बनाना, API keys generate करना, और unexpected bills से बचने के लिए billing alarms configure करना शामिल है। इसमें root account पर MFA enable करना और least privilege principle follow करने पर ज़ोर दिया गया है।
* **उदाहरण**: आप एक IAM user बनाते हैं, उसे "admins" group में AdministratorAccess के साथ जोड़ते हैं, root account से log out करते हैं और रोज़मर्रा के कामों के लिए उसी IAM user का use करते हैं — बिल्कुल ऐसे जैसे captain routine command crew को सौंप देता है।
* **और जानकारी के लिए लिंक**: [Ask AI: AWS Account Setup and Security](https://alisol.ir/?ai=AWS%20Account%20Setup%20and%20Security%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|hi)

## [टॉपिक 3: Cloud Computing Fundamentals]

* **सारांश**: pre‑cloud on‑premise hosting की challenges, EC2 के launch से elastic servers, S3 से scalable storage, high availability के लिए regions और Availability Zones, और shared responsibility model को cover किया गया है, जिसमें hardware की जिम्मेदारी AWS की और software व data security की जिम्मेदारी आपकी होती है।
* **उदाहरण**: cloud से पहले sudden traffic spike के लिए scale करना मतलब कई हफ़्तों तक नया hardware setup करना होता था; अब EC2 auto‑scaling के साथ weekend पर traffic बढ़ता है तो servers elastically बढ़ जाते हैं और Monday को वापस कम हो जाते हैं।
* **और जानकारी के लिए लिंक**: [Ask AI: Cloud Computing Fundamentals](https://alisol.ir/?ai=Cloud%20Computing%20Fundamentals%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|hi)

## [टॉपिक 4: EC2 Instances और Storage]

* **सारांश**: इस हिस्से में EC2 instance create करने के steps, workload के हिसाब से सही instance type चुनना (जैसे general purpose), persistent storage के लिए EBS volumes attach करना, और static public IP के लिए Elastic IP use करना समझाया गया है।
* **उदाहरण**: आप एक t2.micro Ubuntu instance launch करते हैं, key pair से SSH के ज़रिए connect होते हैं, और फिर EBS volume attach करते हैं — जैसे अपनी app data को instance की life से आगे भी बचाने के लिए external drive जोड़ना।
* **और जानकारी के लिए लिंक**: [Ask AI: EC2 Instances and Storage](https://alisol.ir/?ai=EC2%20Instances%20and%20Storage%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|hi)

## [टॉपिक 5: AWS में Networking]

* **सारांश**: इसमें VPC, public और private access के लिए subnets, traffic distribution के लिए load balancers, global content delivery के लिए CloudFront CDN, और DNS management के लिए Route 53 को cover किया गया है ताकि आपकी applications reliably reachable रहें।
* **उदाहरण**: एक VPC बनाइए जिसमें web servers के लिए public subnets और databases के लिए private subnets हों, और फिर Application Load Balancer का use करके incoming traffic को अलग‑अलग servers पर evenly distribute करें — जैसे अलग‑अलग ships को अलग docks पर भेजना।
* **और जानकारी के लिए लिंक**: [Ask AI: Networking in AWS](https://alisol.ir/?ai=Networking%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|hi)

## [टॉपिक 6: Advanced Storage Solutions]

* **सारांश**: इस सेक्शन में S3 (object storage), Glacier (archiving), Snowball (large data transfer), EFS (shared file system), और different storage gateways (hybrid cloud setups के लिए) जैसे options पर बात की गई है।
* **उदाहरण**: आप static files host करने के लिए S3 bucket को public करते हैं और website serve करते हैं, या फिर internet पर slow upload की जगह terabytes data AWS तक पहुँचाने के लिए Snowball device use करते हैं।
* **और जानकारी के लिए लिंक**: [Ask AI: Advanced Storage Solutions](https://alisol.ir/?ai=Advanced%20Storage%20Solutions%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|hi)

## [टॉपिक 7: Database Services]

* **सारांश**: इसमें EC2 पर self‑managed databases से लेकर managed RDS/Aurora (relational data के लिए), DynamoDB (NoSQL key‑value store), ElastiCache (in‑memory caching), Redshift (data warehouse), और Athena (S3 data lake पर SQL queries) तक के options cover किए गए हैं।
* **उदाहरण**: आप अपनी web app के users का data store करने के लिए एक RDS MySQL instance बनाते हैं जो जरूरत के हिसाब से scale हो सकता है, या फिर high‑traffic application के लिए DynamoDB use करते हैं जिसमें global tables के ज़रिए data अलग‑अलग regions में replicate हो सकता है।
* **और जानकारी के लिए लिंक**: [Ask AI: Database Services](https://alisol.ir/?ai=Database%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|hi)

## [टॉपिक 8: Messaging और Platform Services]

* **सारांश**: इस भाग में messaging और integration के लिए Kinesis, SQS और SNS, आसान application deployment के लिए Elastic Beanstalk, और traditional web hosting जैसे experience के लिए Lightsail को introduce किया गया है।
* **उदाहरण**: traffic spike के समय reports generate करने वाले tasks को सीधे database पर चलाने की बजाय आप उन्हें SQS queue में डालते हैं ताकि processing smooth रहे, या फिर WordPress site deploy करने के लिए Elastic Beanstalk use करते हैं जिससे servers को manually manage करने की ज़रूरत नहीं रहती।
* **और जानकारी के लिए लिंक**: [Ask AI: Messaging and Platform Services](https://alisol.ir/?ai=Messaging%20and%20Platform%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|hi)

## [टॉपिक 9: Containers और Serverless Computing]

* **सारांश**: इस सेक्शन में container orchestration के लिए ECS/Fargate, container images store करने के लिए ECR, event‑driven code execution के लिए Lambda, और long‑running jobs या complex workflows handle करने के लिए Batch और Step Functions समझाए गए हैं।
* **उदाहरण**: आप microservices architecture को ECS पर containers में run करते हैं ताकि scale करना आसान हो, या फिर S3 bucket में file upload होने पर automatically image resize करने के लिए Lambda function trigger करते हैं — बिना किसी server को manage किए।
* **और जानकारी के लिए लिंक**: [Ask AI: Containers and Serverless Computing](https://alisol.ir/?ai=Containers%20and%20Serverless%20Computing%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|hi)

## [टॉपिक 10: SaaS Services]

* **सारांश**: यहाँ Cognito (user authentication और identity), API Gateway/AppSync (API backends), SageMaker और ML APIs (machine learning और intelligence), MediaConvert (video processing), और IoT Core (device management) जैसे SaaS‑style managed services cover किए गए हैं।
* **उदाहरण**: आप अपनी app में secure login के लिए Cognito integrate करते हैं जो Google/Facebook जैसे providers से single sign‑on allow करता है, या फिर social app में upload की गई photos में faces detect करने के लिए Rekognition का use करते हैं।
* **और जानकारी के लिए लिंक**: [Ask AI: SaaS Services](https://alisol.ir/?ai=SaaS%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|hi)

## [टॉपिक 11: DevOps in AWS]

* **सारांश**: यह सेक्शन DevOps को dev और ops teams के बीच bridge की तरह define करता है। इसमें continuous integration और continuous delivery के लिए CodePipeline, infrastructure as code के लिए CloudFormation, और सिर्फ uptime से आगे बढ़कर performance monitoring के लिए CloudWatch को explain किया गया है।
* **उदाहरण**: आप एक pipeline setup करते हैं जो GitHub पर code push होते ही tests run करता है और pass होने पर automatically ECS पर deploy कर देता है, जिससे releases fast और ज़्यादा reliable हो जाती हैं।
* **और जानकारी के लिए लिंक**: [Ask AI: DevOps in AWS](https://alisol.ir/?ai=DevOps%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|hi)

## [टॉपिक 12: Security in AWS]

* **सारांश**: इस भाग में WAF/Shield (application firewall और DDoS protection), Inspector/GuardDuty/Macie (vulnerability scans, threat detection और sensitive data protection), और CloudTrail/Security Hub (auditing और centralized security view) को cover किया गया है।
* **उदाहरण**: आप GuardDuty enable करते हैं ताकि कोई server unusual behavior दिखाए — जैसे अजीब network connections या suspicious API calls — तो वह alert कर सके, बिल्कुल एक virtual security guard की तरह।
* **और जानकारी के लिए लिंक**: [Ask AI: Security in AWS](https://alisol.ir/?ai=Security%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|hi)

## [टॉपिक 13: निष्कर्ष (Conclusion)]

* **सारांश**: आख़िर में course cleanup tips देता है ताकि बेकार resources चलने ना रहें और extra charges ना लगें, साथ ही AWS blogs, events और certifications जैसे resources बताता है, और सलाह देता है कि इन्हें hands‑on projects के साथ combine करें।
* **उदाहरण**: demos के बाद आप unused EC2 instances terminate कर देते हैं और बेकार S3 buckets delete कर देते हैं ताकि free tier के अंदर रह सकें और surprise bills से बच सकें।
* **और जानकारी के लिए लिंक**: [Ask AI: Conclusion](https://alisol.ir/?ai=Conclusion%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|hi)

## Original Course
पूरी learning experience के लिए [LinkedIn Learning पर original course](https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791) देखें।

---

**About the summarizer**

मैं *Ali Sol* हूँ, एक Backend Developer। मेरे बारे में और जानें:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

