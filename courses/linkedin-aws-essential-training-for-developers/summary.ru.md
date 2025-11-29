# Краткий конспект курса: AWS Essential Training for Developers

* **Платформа**: LinkedIn Learning
* **Преподаватель**: Jeremy Villeneuve
* **Рейтинг**: 4.8/5
* **Дата обновления курса**: September 2023
* **Ссылка на курс**: https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791

*Этот документ содержит краткий конспект основных идей курса. Если будет возможность, очень рекомендую посмотреть полный курс.*

## Прежде чем начать
- Я конспектирую ключевые идеи из полезных курсов, чтобы можно было быстро изучать материал и повторять его.
- Просто нажимай на ссылки `Ask AI`, чтобы глубже погрузиться в любую тему.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=ru&src=courses/linkedin-aws-essential-training-for-developers) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=ru&src=courses/linkedin-aws-essential-training-for-developers) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=ru&src=courses/linkedin-aws-essential-training-for-developers) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=ru&src=courses/linkedin-aws-essential-training-for-developers) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=ru&src=courses/linkedin-aws-essential-training-for-developers) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=ru&src=courses/linkedin-aws-essential-training-for-developers) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=ru&src=courses/linkedin-aws-essential-training-for-developers) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=ru&src=courses/linkedin-aws-essential-training-for-developers) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=ru&src=courses/linkedin-aws-essential-training-for-developers) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=ru&src=courses/linkedin-aws-essential-training-for-developers) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=ru&src=courses/linkedin-aws-essential-training-for-developers) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=ru&src=courses/linkedin-aws-essential-training-for-developers)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=ru&src=courses/linkedin-aws-essential-training-for-developers) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=ru&src=courses/linkedin-aws-essential-training-for-developers) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=ru&src=courses/linkedin-aws-essential-training-for-developers) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=ru&src=courses/linkedin-aws-essential-training-for-developers) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=ru&src=courses/linkedin-aws-essential-training-for-developers)
<!-- LH-BUTTONS:END -->

## [Тема 1: Введение в AWS]

* **Краткое описание**: В этом разделе даётся общий обзор того, как подходить к AWS, сравнивая его со звездолётом с множеством разных сервисов. Обсуждаются цели курса: понять ключевые сервисы, их иконки и случаи использования, а также предварительные требования — базовые знания компьютеров и сетей.
* **Пример**: Представь свой AWS‑аккаунт как Millennium Falcon для небольшой команды или Starship Enterprise для крупной компании — так легче визуализировать масштаб и управление.
* **Ссылка для подробностей**: [Ask AI: Introduction to AWS](https://alisol.ir/?ai=Introduction%20to%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ru)

## [Тема 2: AWS Account Setup and Security]

* **Краткое описание**: Разбирается создание root‑аккаунта AWS, настройка IAM‑пользователей для более безопасного доступа, генерация API‑ключей и настройка billing‑оповещений, чтобы избежать неожиданных счетов. Особый акцент делается на защите root‑аккаунта через MFA и принципах наименьших привилегий.
* **Пример**: После создания IAM‑пользователя и добавления его в группу «admins» с политикой AdministratorAccess ты выходишь из root‑аккаунта и используешь IAM для повседневных задач — как капитан, который передаёт рутину офицерам.
* **Ссылка для подробностей**: [Ask AI: AWS Account Setup and Security](https://alisol.ir/?ai=AWS%20Account%20Setup%20and%20Security%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ru)

## [Тема 3: Основы cloud computing]

* **Краткое описание**: Рассматриваются проблемы on‑premise‑хостинга до облаков, появление EC2 для эластичных серверов и S3 для хранения, Regions/AZs для отказоустойчивости, а также модель shared responsibility, где AWS отвечает за «железо», а ты — за безопасность софта.
* **Пример**: До облака масштабирование под резкий рост трафика занимало недели на закупку и установку железа; с EC2 auto‑scaling серверы масштабируются как резина на выходных и уменьшаются обратно в понедельник.
* **Ссылка для подробностей**: [Ask AI: Cloud Computing Fundamentals](https://alisol.ir/?ai=Cloud%20Computing%20Fundamentals%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ru)

## [Тема 4: EC2 Instances and Storage]

* **Краткое описание**: Пошагово разбирается создание EC2‑инстансов, выбор типов под нагрузку (например, general purpose), подключение EBS‑томов для постоянного хранения данных и использование Elastic IP для статических адресов.
* **Пример**: Запусти t2.micro Ubuntu‑инстанс, подключись по SSH с key pair и прикрепи EBS‑том — как будто добавляешь внешний диск для хранения данных приложения, которые переживут жизненный цикл инстанса.
* **Ссылка для подробностей**: [Ask AI: EC2 Instances and Storage](https://alisol.ir/?ai=EC2%20Instances%20and%20Storage%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ru)

## [Тема 5: Networking в AWS]

* **Краткое описание**: Объясняются VPC, subnets для публичного и приватного доступа, load balancer‑ы для распределения трафика, CloudFront как CDN для кэширования и Route 53 для DNS‑управления и надёжной маршрутизации.
* **Пример**: Настрой VPC с публичными subnets для web‑серверов и приватными — для баз данных, а затем используй Application Load Balancer, чтобы равномерно распределять трафик — как диспетчер, направляющий корабли к разным причалам.
* **Ссылка для подробностей**: [Ask AI: Networking in AWS](https://alisol.ir/?ai=Networking%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ru)

## [Тема 6: Расширенные решения по хранению данных]

* **Краткое описание**: Разбираются S3 для объектного хранения, Glacier для архивов, Snowball для массового переноса данных, EFS как общий файловый сервис и различные gateways для гибридных сценариев между on‑premise и cloud.
* **Пример**: Используй S3 для хостинга статических файлов, делая buckets публичными для сайта, или Snowball, чтобы отправить терабайты данных в AWS физическим устройством вместо долгой загрузки по интернету.
* **Ссылка для подробностей**: [Ask AI: Advanced Storage Solutions](https://alisol.ir/?ai=Advanced%20Storage%20Solutions%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ru)

## [Тема 7: Database Services]

* **Краткое описание**: От запуска баз данных на EC2 до управляемых RDS/Aurora для реляционных данных, DynamoDB для NoSQL, ElastiCache для кэша, Redshift как data warehouse для больших данных и Athena для запросов к S3‑data‑lake.
* **Пример**: Создай RDS MySQL‑инстанс для пользовательских данных web‑приложения и масштабируй его без лишних усилий, или используй DynamoDB для key‑value‑хранения в высоконагруженном приложении с global tables для репликации по регионам.
* **Ссылка для подробностей**: [Ask AI: Database Services](https://alisol.ir/?ai=Database%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ru)

## [Тема 8: Messaging и Platform Services]

* **Краткое описание**: Вводные по Kinesis/SQS/SNS как messaging‑сервисам, Elastic Beanstalk для простой деплой‑платформы приложений и Lightsail как упрощённому хостингу в стиле классических web‑хостеров.
* **Пример**: Используй SQS, чтобы ставить задачи по генерации отчётов в очередь при пиках нагрузки и не перегружать базу, или разверни WordPress‑сайт через Elastic Beanstalk, чтобы получать управляемые обновления без ручной возни с серверами.
* **Ссылка для подробностей**: [Ask AI: Messaging and Platform Services](https://alisol.ir/?ai=Messaging%20and%20Platform%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ru)

## [Тема 9: Containers и Serverless‑вычисления]

* **Краткое описание**: Объясняются ECS/Fargate для контейнеров, ECR как образ‑registry, Lambda для serverless‑функций, а также Batch и Step Functions для обработки задач и оркестрации workflows.
* **Пример**: Запусти микросервис в ECS‑контейнерах для масштабируемости или вызывай Lambda‑функции при загрузке файлов (например, чтобы ресайзить изображения) без управления серверами.
* **Ссылка для подробностей**: [Ask AI: Containers and Serverless Computing](https://alisol.ir/?ai=Containers%20and%20Serverless%20Computing%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ru)

## [Тема 10: SaaS‑сервисы]

* **Краткое описание**: Рассматриваются Cognito для аутентификации пользователей, API Gateway/AppSync как backend‑слой, SageMaker и ML‑API для «умных» функций, MediaConvert для работы с видео и IoT Core для управления устройствами.
* **Пример**: Подключи Cognito для безопасного логина с Google/Facebook или используй Rekognition, чтобы находить лица на загружаемых фотографиях как фичу для social‑приложения.
* **Ссылка для подробностей**: [Ask AI: SaaS Services](https://alisol.ir/?ai=SaaS%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ru)

## [Тема 11: DevOps в AWS]

* **Краткое описание**: DevOps описывается как мост между разработкой и эксплуатацией. Разбираются CodePipeline для CI/CD, CloudFormation для infrastructure as code и CloudWatch для мониторинга, который отслеживает не только uptime, но и метрики производительности.
* **Пример**: Настрой pipeline, который после прохождения тестов автоматически деплоит изменения из GitHub в ECS, обеспечивая быстрые релизы без ручных шагов.
* **Ссылка для подробностей**: [Ask AI: DevOps in AWS](https://alisol.ir/?ai=DevOps%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ru)

## [Тема 12: Security в AWS]

* **Краткое описание**: Обсуждаются WAF/Shield как firewall‑защита, Inspector/GuardDuty/Macie для сканирования и обнаружения угроз, а также CloudTrail и Security Hub для аудита и централизованного мониторинга безопасности.
* **Пример**: Включи GuardDuty, чтобы отслеживать необычное поведение инстансов, например странные сетевые соединения — как виртуальный охранник, который замечает потенциальный внутренний компромисс.
* **Ссылка для подробностей**: [Ask AI: Security in AWS](https://alisol.ir/?ai=Security%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ru)

## [Тема 13: Заключение]

* **Краткое описание**: Резюмируются советы по «уборке» ресурсов, чтобы избежать лишних расходов, полезные источники вроде AWS‑блогов и событий, а также рекомендации по сертификациям в связке с практическими pet‑project‑ами.
* **Пример**: После демо‑проектов удали неиспользуемые EC2‑инстансы и S3‑buckets, чтобы оставаться в пределах free tier и не получить неожиданный счёт.
* **Ссылка для подробностей**: [Ask AI: Conclusion](https://alisol.ir/?ai=Conclusion%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|ru)

## Оригинальный курс
Чтобы пройти курс целиком, смотри [оригинальный курс на LinkedIn Learning](https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791).

---

**О конференции и конспекте**

Я — *Ali Sol*, Backend Developer. Больше информации:
- Сайт: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
