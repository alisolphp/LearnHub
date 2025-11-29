# Kurs Özeti: AWS Essential Training for Developers

* **Platform**: LinkedIn Learning
* **Eğitmen**: Jeremy Villeneuve
* **Puan**: 4.8/5
* **Güncelleme Tarihi**: Eylül 2023
* **Kurs Linki**: https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791

*Bu doküman, kurstaki temel noktaları özetler. Mümkünse kursun tamamını izlemeni kesinlikle tavsiye ederim.*

## Başlamadan Önce
- Faydalı kurslardan önemli noktaları özetleyerek hızlı öğrenme ve tekrar etmeyi amaçlıyorum.
- İstediğin konuya derinlemesine girmek için `Ask AI` linklerine tıklaman yeterli.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=4ea0b5d0 -->

### AI-Powered buttons

Teach Me:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=tr&src=courses/linkedin-aws-essential-training-for-developers) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=tr&src=courses/linkedin-aws-essential-training-for-developers) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=tr&src=courses/linkedin-aws-essential-training-for-developers) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=tr&src=courses/linkedin-aws-essential-training-for-developers) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=tr&src=courses/linkedin-aws-essential-training-for-developers) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=tr&src=courses/linkedin-aws-essential-training-for-developers) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=tr&src=courses/linkedin-aws-essential-training-for-developers) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=tr&src=courses/linkedin-aws-essential-training-for-developers) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=tr&src=courses/linkedin-aws-essential-training-for-developers) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=tr&src=courses/linkedin-aws-essential-training-for-developers) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=tr&src=courses/linkedin-aws-essential-training-for-developers) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=tr&src=courses/linkedin-aws-essential-training-for-developers)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=tr&src=courses/linkedin-aws-essential-training-for-developers) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=tr&src=courses/linkedin-aws-essential-training-for-developers) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=tr&src=courses/linkedin-aws-essential-training-for-developers) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=tr&src=courses/linkedin-aws-essential-training-for-developers) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=tr&src=courses/linkedin-aws-essential-training-for-developers)
<!-- LH-BUTTONS:END -->

## [Konu 1: AWS’ye Giriş]

* **Özet**: Bu bölüm, AWS’ye nasıl yaklaşman gerektiğine dair genel bir bakışla başlıyor ve AWS’yi farklı servisleri olan bir uzay gemisine benzetiyor. Temel servisleri, ikonlarını ve ne zaman kullanılacaklarını anlamak gibi kurs hedeflerini ve ayrıca bilgisayar ve ağ temelleri gibi ön gereksinimleri kapsıyor.
* **Örnek**: AWS hesabını küçük ekipler için Millennium Falcon, daha büyük operasyonlar için Starship Enterprise gibi düşünebilirsin; bu benzetme ölçeği ve yönetimi kafanda canlandırmana yardım eder.
* **Daha Fazla Detay için Link**: [Ask AI: Introduction to AWS](https://alisol.ir/?ai=Introduction%20to%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|tr)

## [Konu 2: AWS Hesap Kurulumu ve Güvenlik]

* **Özet**: AWS root account oluşturmayı, daha güvenli erişim için IAM user tanımlamayı, API key üretmeyi ve beklenmedik faturaları önlemek için billing alarm kurmayı anlatıyor. Root account’u MFA ile korumayı ve least privilege prensibini takip etmeyi vurguluyor.
* **Örnek**: Bir IAM user oluşturup onu AdministratorAccess yetkisine sahip bir “admins” grubuna ekledikten sonra root’tan çıkış yapıp günlük işleri IAM hesabıyla yürütüyorsun; tıpkı kaptanın rutin komutları ekibine devretmesi gibi.
* **Daha Fazla Detay için Link**: [Ask AI: AWS Account Setup and Security](https://alisol.ir/?ai=AWS%20Account%20Setup%20and%20Security%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|tr)

## [Konu 3: Cloud Computing Temelleri]

* **Özet**: Cloud öncesi on‑premise hosting zorluklarını, elastik sunucular için EC2’nun ve depolama için S3’ün ortaya çıkışını, yedeklilik için region/availability zone yapısını ve AWS’nin donanımdan, senin ise yazılım güvenliğinden sorumlu olduğu shared responsibility model konseptini açıklıyor.
* **Örnek**: Cloud öncesinde ani trafik artışlarını karşılamak için haftalar süren donanım kurulumları gerekiyordu; EC2 auto‑scaling ile sunucular hafta sonu trafiğinde lastik gibi esneyip artıyor, pazartesi günü tekrar küçülüyor.
* **Daha Fazla Detay için Link**: [Ask AI: Cloud Computing Fundamentals](https://alisol.ir/?ai=Cloud%20Computing%20Fundamentals%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|tr)

## [Konu 4: EC2 Instances ve Depolama]

* **Özet**: EC2 instance oluşturmayı, iş yüküne göre instance type seçmeyi (örneğin general purpose), kalıcı depolama için EBS volume bağlamayı ve sabit IP adresi için Elastic IP kullanmayı anlatıyor.
* **Örnek**: Bir t2.micro Ubuntu instance başlatıp key pair ile SSH üzerinden bağlanıyorsun ve instance ömründen bağımsız veri tutmak için EBS volume ekliyorsun; bu da uygulama verilerini harici disk takmışsın gibi saklamanı sağlar.
* **Daha Fazla Detay için Link**: [Ask AI: EC2 Instances and Storage](https://alisol.ir/?ai=EC2%20Instances%20and%20Storage%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|tr)

## [Konu 5: AWS’de Networking]

* **Özet**: VPC, public/private erişim için subnet yapısı, trafiği dağıtmak için load balancer’lar, içerik önbellekleme için CloudFront (CDN) ve güvenilir bağlantı sağlamak için DNS yönetim servisi Route 53 konularını kapsıyor.
* **Örnek**: Web sunucuların için public subnet, veritabanların için private subnet içeren bir VPC kurup, Application Load Balancer ile gelen trafiği dengeli şekilde dağıtıyorsun; tıpkı gemileri farklı iskelelere yönlendiren bir sistem gibi.
* **Daha Fazla Detay için Link**: [Ask AI: Networking in AWS](https://alisol.ir/?ai=Networking%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|tr)

## [Konu 6: İleri Seviye Depolama Çözümleri]

* **Özet**: Object storage için S3, arşivleme için Glacier, büyük veri transferleri için Snowball, paylaşımlı dosya sistemi için EFS ve on‑prem ile bulut arasında köprü kuran storage gateway çözümlerini anlatıyor.
* **Örnek**: Statik dosyaları barındırmak için S3 bucket’larını public yapıp web sitesi host edebilir ya da internet üzerinden yavaş upload yapmak yerine terabaytlarca veriyi AWS’ye taşımak için Snowball kullanabilirsin.
* **Daha Fazla Detay için Link**: [Ask AI: Advanced Storage Solutions](https://alisol.ir/?ai=Advanced%20Storage%20Solutions%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|tr)

## [Konu 7: Database Servisleri]

* **Özet**: Veritabanlarını EC2 üzerinde kendin çalıştırmaktan, relational veriler için managed RDS/Aurora kullanmaya; NoSQL ihtiyaçları için DynamoDB’ye, caching için ElastiCache’e, big data warehousing için Redshift’e ve S3 data lake üzerinde sorgulama için Athena’ya kadar farklı database senaryolarını ele alıyor.
* **Örnek**: Bir web uygulamasının kullanıcı verileri için RDS MySQL instance oluşturup ihtiyaç oldukça ölçeklendirebilir veya yüksek trafikli bir uygulamada key‑value veriler için global replication sunan DynamoDB’yi tercih edebilirsin.
* **Daha Fazla Detay için Link**: [Ask AI: Database Services](https://alisol.ir/?ai=Database%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|tr)

## [Konu 8: Messaging ve Platform Servisleri]

* **Özet**: Messaging queue ihtiyaçları için Kinesis/SQS/SNS, kolay uygulama deploy’u için Elastic Beanstalk ve klasik hosting’e benzeyen basit hosting senaryoları için Lightsail’i tanıtıyor.
* **Örnek**: Ani yüklenmelerde rapor üretim işlerini kuyruklamak için SQS kullanarak veritabanının aşırı yüklenmesini önleyebilir, ya da WordPress sitesini Elastic Beanstalk üzerinden deploy edip sunucu yönetimiyle uğraşmadan güncellemeleri yönetebilirsin.
* **Daha Fazla Detay için Link**: [Ask AI: Messaging and Platform Services](https://alisol.ir/?ai=Messaging%20and%20Platform%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|tr)

## [Konu 9: Container ve Serverless Computing]

* **Özet**: Container orkestrasyonu için ECS/Fargate, container image registry için ECR, server yönetmeden kod çalıştırmak için Lambda ve job/process yönetimi için Batch ile workflow orkestrasyonu için Step Functions konularını açıklıyor.
* **Örnek**: Ölçeklenebilir bir microservice’i ECS container’ları içinde çalıştırabilir veya S3’e dosya yüklemesi olduğunda tetiklenen bir Lambda function ile görsel boyutlandırma işlemlerini tamamen serverless şekilde yapabilirsin.
* **Daha Fazla Detay için Link**: [Ask AI: Containers and Serverless Computing](https://alisol.ir/?ai=Containers%20and%20Serverless%20Computing%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|tr)

## [Konu 10: SaaS Servisleri]

* **Özet**: Kullanıcı kimlik doğrulama için Cognito, backend API yönetimi için API Gateway/AppSync, makine öğrenimi için SageMaker ve diğer ML API’leri, video işlemleri için MediaConvert ve IoT cihaz yönetimi için IoT Core servislerini ele alıyor.
* **Örnek**: Uygulamana Google/Facebook gibi provider’larla secure login eklemek için Cognito’yu entegre edebilir veya sosyal bir uygulamada yüklenen fotoğraflardaki yüzleri tespit etmek için Rekognition kullanabilirsin.
* **Daha Fazla Detay için Link**: [Ask AI: SaaS Services](https://alisol.ir/?ai=SaaS%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|tr)

## [Konu 11: AWS’de DevOps]

* **Özet**: DevOps’u development ve operations ekipleri arasında köprü kuran bir kültür olarak tanımlıyor; CI/CD için CodePipeline, infrastructure as code için CloudFormation ve sadece uptime değil performansı da izlemek için CloudWatch kullanımını anlatıyor.
* **Örnek**: GitHub’daki kod değişikliklerini testlerden sonra otomatik olarak ECS’e deploy eden bir pipeline kurarak, manuel müdahale olmadan hızlı ve güvenli release süreci oluşturabilirsin.
* **Daha Fazla Detay için Link**: [Ask AI: DevOps in AWS](https://alisol.ir/?ai=DevOps%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|tr)

## [Konu 12: AWS’de Güvenlik]

* **Özet**: Web uygulama firewall ve DDoS koruması için WAF/Shield, güvenlik taramaları ve tehdit tespiti için Inspector/GuardDuty/Macie ve audit ile merkezi güvenlik görünürlüğü için CloudTrail/Security Hub kullanımını ele alıyor.
* **Örnek**: GuardDuty’yi aktif ederek, olağandışı network bağlantıları gibi anormal server davranışlarını tespit edip iç tehditlere karşı sanal bir güvenlik görevlisi gibi konumlandırabilirsin.
* **Daha Fazla Detay için Link**: [Ask AI: Security in AWS](https://alisol.ir/?ai=Security%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|tr)

## [Konu 13: Sonuç]

* **Özet**: Ücretlendirme sürprizlerini önlemek için temizlik (cleanup) ipuçları, güncel kalmak için AWS blog ve etkinlik önerileri ve sertifikasyonları gerçek proje deneyimiyle birlikte değerlendirmen için tavsiyelerle kursu bitiriyor.
* **Örnek**: Demo sonrasında kullanılmayan EC2 instance’larını sonlandırmak ve S3 bucket’larını silmek, free tier sınırları içinde kalmana ve beklenmedik faturalardan kaçınmana yardımcı olur.
* **Daha Fazla Detay için Link**: [Ask AI: Conclusion](https://alisol.ir/?ai=Conclusion%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|tr)

## Orijinal Kurs
Tam deneyim için [LinkedIn Learning üzerindeki orijinal kursa](https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791) göz atabilirsin.

---

**Özetleyeni Tanı**

Ben *Ali Sol*, bir Backend Developer’ım. Daha fazlası için:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

