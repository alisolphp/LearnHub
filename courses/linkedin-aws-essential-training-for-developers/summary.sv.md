# Kursöversikt: AWS Essential Training for Developers

* **Plattform**: LinkedIn Learning
* **Instruktör**: Jeremy Villeneuve
* **Betyg**: 4.8/5
* **Senast uppdaterad**: september 2023
* **Kurslänk**: https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791

*Det här dokumentet sammanfattar de viktigaste delarna av kursen. Jag rekommenderar verkligen att du tittar på hela kursen om du har möjlighet.*

## Innan du börjar
- Jag sammanfattar viktiga punkter från användbara kurser så att du kan lära dig och repetera snabbt.
- Klicka bara på `Ask AI`-länkarna för att fördjupa dig i vilket ämne du vill.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## [Ämne 1: Introduktion till AWS]

* **Sammanfattning**: Det här avsnittet startar med en översikt över hur du kan tänka kring AWS, och jämför det med ett rymdskepp med olika tjänster. Det tar upp kursens mål, som att förstå centrala tjänster, deras ikoner och när du ska använda dem, samt förkunskaper som grundläggande dator- och nätverkskunskap.
* **Exempel**: Tänk på ditt AWS-konto som Millennium Falcon för små team eller Starship Enterprise för större organisationer – det hjälper dig att visualisera skala och hantering.
* **Länk för mer detaljer**: [Ask AI: Introduction to AWS](https://alisol.ir/?ai=Introduction%20to%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|sv)

## [Ämne 2: AWS-konto, setup och säkerhet]

* **Sammanfattning**: Du lär dig att sätta upp ett AWS root-konto, skapa IAM-användare för säkrare åtkomst, generera API-nycklar och konfigurera billing-larm för att undvika oväntade kostnader. Det betonas att du ska skydda root-kontot med MFA och följa least privilege-principer.
* **Exempel**: Efter att du har skapat en IAM-användare och lagt den i en "admins"-grupp med AdministratorAccess loggar du ut från root-kontot och använder IAM-kontot i det dagliga – ungefär som att kaptenen lämnar över det rutinmässiga befälet.
* **Länk för mer detaljer**: [Ask AI: AWS Account Setup and Security](https://alisol.ir/?ai=AWS%20Account%20Setup%20and%20Security%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|sv)

## [Ämne 3: Grundläggande cloud computing]

* **Sammanfattning**: Går igenom utmaningar med on-premise hosting före molnet, lanseringen av EC2 för elastiska servrar och S3 för lagring, regions/availability zones för redundans, samt den delade ansvarsfördelningen där AWS hanterar hårdvaran och du ansvarar för säkerheten i din mjukvara.
* **Exempel**: Före molnet kunde skalning för plötsliga trafiktoppar ta veckor av hårdvaruinköp; med EC2 auto-scaling kan servrar växa elastiskt under en helgtopp och skalas ned igen på måndagen.
* **Länk för mer detaljer**: [Ask AI: Cloud Computing Fundamentals](https://alisol.ir/?ai=Cloud%20Computing%20Fundamentals%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|sv)

## [Ämne 4: EC2-instanser och lagring]

* **Sammanfattning**: Visar hur du skapar EC2-instanser, väljer instanstyper beroende på workload (t.ex. general purpose), kopplar EBS-volymer för persistent lagring och använder Elastic IPs för statiska IP-adresser.
* **Exempel**: Starta en t2.micro-instans med Ubuntu, anslut via SSH med ett key pair och koppla en EBS-volym – ungefär som att ansluta en extern hårddisk för att lagra app-data bortom instansens livstid.
* **Länk för mer detaljer**: [Ask AI: EC2 Instances and Storage](https://alisol.ir/?ai=EC2%20Instances%20and%20Storage%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|sv)

## [Ämne 5: Nätverk i AWS]

* **Sammanfattning**: Täcker VPC, subnets för publik/privat åtkomst, load balancers för att fördela trafik, CloudFront som CDN för caching och Route 53 för DNS-hantering för att säkerställa tillförlitlig uppkoppling.
* **Exempel**: Skapa en VPC med publika subnets för webbservrar och privata för databaser, och använd sedan en Application Load Balancer för att fördela trafiken jämnt – ungefär som att dirigera skepp till olika kajer.
* **Länk för mer detaljer**: [Ask AI: Networking in AWS](https://alisol.ir/?ai=Networking%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|sv)

## [Ämne 6: Avancerade lagringslösningar]

* **Sammanfattning**: Tar upp S3 för objektlagring, Glacier för arkivering, Snowball för stora dataöverföringar, EFS för delade filsystem och gateways för hybrid cloud-miljöer.
* **Exempel**: Använd S3 för att hosta statiska filer med buckets som är publika för en webbplats, eller Snowball för att skicka terabytes med data till AWS i stället för långsamma uppladdningar över internet.
* **Länk för mer detaljer**: [Ask AI: Advanced Storage Solutions](https://alisol.ir/?ai=Advanced%20Storage%20Solutions%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|sv)

## [Ämne 7: Databastjänster]

* **Sammanfattning**: Går från databaser på EC2 till managed RDS/Aurora för relationsdata, DynamoDB för NoSQL, ElastiCache för caching, Redshift för data warehousing och Athena för att köra queries mot S3-baserade data lakes.
* **Exempel**: Skapa en RDS MySQL-instans för en webbapps användardata som kan skalas utan krångel, eller använd DynamoDB för key-value-lagring i en högtrafikerad app med global tables för replikering.
* **Länk för mer detaljer**: [Ask AI: Database Services](https://alisol.ir/?ai=Database%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|sv)

## [Ämne 8: Messaging och plattformstjänster]

* **Sammanfattning**: Introducerar Kinesis/SQS/SNS för message queues, Elastic Beanstalk för enkel app-deploy och Lightsail för enklare hosting som liknar traditionella webbhotell.
* **Exempel**: Använd SQS för att lägga rapportgenerering i kö vid trafiktoppar så att databasen inte överbelastas, eller deploya en WordPress-site via Beanstalk för att få hanterade uppdateringar utan serverpill.
* **Länk för mer detaljer**: [Ask AI: Messaging and Platform Services](https://alisol.ir/?ai=Messaging%20and%20Platform%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|sv)

## [Ämne 9: Containers och serverless]

* **Sammanfattning**: Förklarar ECS/Fargate för containers, ECR som container registry, Lambda för serverless-funktioner samt Batch/Step Functions för jobb och workflows.
* **Exempel**: Kör en microservice i ECS-containers för skalbarhet, eller trigga en Lambda-funktion vid filuppladdning för att t.ex. ändra bildstorlek utan att hantera servrar.
* **Länk för mer detaljer**: [Ask AI: Containers and Serverless Computing](https://alisol.ir/?ai=Containers%20and%20Serverless%20Computing%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|sv)

## [Ämne 10: SaaS-tjänster]

* **Sammanfattning**: Går igenom Cognito för användarautentisering, API Gateway/AppSync för backends, SageMaker/ML-API:er för intelligenta funktioner, MediaConvert för video och IoT Core för enhets-hantering.
* **Exempel**: Integrera Cognito för säkra inloggningar med Google/Facebook, eller använd Rekognition för att upptäcka ansikten i uppladdade foton för en social app-funktion.
* **Länk för mer detaljer**: [Ask AI: SaaS Services](https://alisol.ir/?ai=SaaS%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|sv)

## [Ämne 11: DevOps i AWS]

* **Sammanfattning**: Definierar DevOps som bryggan mellan utveckling och drift, med CodePipeline för CI/CD, CloudFormation för infrastructure as code och CloudWatch för övervakning av mer än bara uptime.
* **Exempel**: Sätt upp en pipeline som automatiskt deployar kodändringar från GitHub till ECS efter tester, så att du får snabba releaser utan manuell hantering.
* **Länk för mer detaljer**: [Ask AI: DevOps in AWS](https://alisol.ir/?ai=DevOps%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|sv)

## [Ämne 12: Säkerhet i AWS]

* **Sammanfattning**: Tar upp WAF/Shield för firewalls, Inspector/GuardDuty/Macie för scanning och hotdetektering, samt CloudTrail/Security Hub för audits och centraliserad övervakning.
* **Exempel**: Aktivera GuardDuty för att upptäcka ovanligt beteende på servrar, som märkliga nätverksanslutningar – som en virtuell vakt mot interna intrång.
* **Länk för mer detaljer**: [Ask AI: Security in AWS](https://alisol.ir/?ai=Security%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|sv)

## [Ämne 13: Avslutning]

* **Sammanfattning**: Avslutar med städtips för att undvika kostnader, resurser som AWS-bloggar och event för att hålla dig uppdaterad, samt råd om certifieringar tillsammans med praktiska projekt.
* **Exempel**: Efter demo-miljöer – terminera oanvända EC2-instanser och ta bort S3-buckets för att hålla dig inom free tier-gränser och undvika oväntade fakturor.
* **Länk för mer detaljer**: [Ask AI: Conclusion](https://alisol.ir/?ai=Conclusion%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|sv)

## Originalkurs
För hela upplevelsen, gå till [originalkursen på LinkedIn Learning](https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791).

---

**Om den som har sammanfattat**

Jag heter *Ali Sol* och är backend-utvecklare. Läs mer:
- Webbplats: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
