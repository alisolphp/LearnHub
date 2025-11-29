# Cursussamenvatting: AWS Essential Training for Developers

* **Platform**: LinkedIn Learning
* **Docent**: Jeremy Villeneuve
* **Beoordeling**: 4,8/5
* **Datum van bijwerken**: september 2023
* **Cursuslink**: https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791

*Dit document vat de belangrijkste punten uit de cursus samen. Ik raad je sterk aan om de volledige cursus te volgen als je daar de kans voor hebt.*

## Voordat je begint
- Ik vat kernpunten uit nuttige cursussen samen zodat je snel kunt leren en herhalen.
- Klik simpelweg op de `Ask AI`-links om dieper in te gaan op elk onderwerp dat je wilt.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## [Onderwerp 1: Introductie tot AWS]

* **Samenvatting**: Deze sectie begint met een overzicht van hoe je naar AWS kunt kijken, vergeleken met een ruimteschip vol verschillende services. De cursusdoelen zijn onder meer het begrijpen van kernservices, hun iconen en wanneer je ze gebruikt, plus basisvereisten zoals computer- en netwerkkennis.
* **Voorbeeld**: Zie je AWS-account als de Millennium Falcon voor kleine teams of de Starship Enterprise voor grotere organisaties, zodat je je de schaal en het beheer beter kunt voorstellen.
* **Link voor meer details**: [Ask AI: Introductie tot AWS](https://alisol.ir/?ai=Introduction%20to%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|nl)

## [Onderwerp 2: AWS-accountconfiguratie en beveiliging]

* **Samenvatting**: Je leert een AWS root-account opzetten, IAM-users aan te maken voor veiliger toegang, API-keys te genereren en billing-alarms te configureren om onverwachte kosten te vermijden. De nadruk ligt op het beveiligen van het root-account met MFA en het volgen van het least privilege-principe.
* **Voorbeeld**: Nadat je een IAM-user hebt aangemaakt en die aan een "admins"-groep met AdministratorAccess hebt toegevoegd, log je uit de root-user en gebruik je de IAM-user voor dagelijkse taken – alsof een kapitein de routinecommando's overdraagt.
* **Link voor meer details**: [Ask AI: AWS-accountconfiguratie en beveiliging](https://alisol.ir/?ai=AWS%20Account%20Setup%20and%20Security%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|nl)

## [Onderwerp 3: Cloud computing fundamentals]

* **Samenvatting**: Behandelt de uitdagingen van on-premise hosting vóór de cloud, de introductie van EC2 voor elastische servers en S3 voor storage, regio's/Availability Zones voor redundantie en het shared responsibility model waarbij AWS de hardware beheert en jij verantwoordelijk bent voor de beveiliging van je software.
* **Voorbeeld**: Voor de cloud betekende opschalen voor plotselinge traffic spikes wekenlang hardware regelen; met EC2 auto scaling groeien servers elastisch mee tijdens een druk weekend en krimpen ze op maandag weer terug.
* **Link voor meer details**: [Ask AI: Cloud computing fundamentals](https://alisol.ir/?ai=Cloud%20Computing%20Fundamentals%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|nl)

## [Onderwerp 4: EC2-instances en storage]

* **Samenvatting**: Leidt je door het aanmaken van EC2-instances, het kiezen van types op basis van workload (bijvoorbeeld general purpose), het koppelen van EBS-volumes voor persistente storage en het gebruik van Elastic IPs voor statische adressen.
* **Voorbeeld**: Start een t2.micro Ubuntu-instance, maak via SSH verbinding met een key pair en koppel een EBS-volume alsof je een externe schijf toevoegt om app-data te bewaren, zelfs als de instance wordt verwijderd.
* **Link voor meer details**: [Ask AI: EC2-instances en storage](https://alisol.ir/?ai=EC2%20Instances%20and%20Storage%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|nl)

## [Onderwerp 5: Networking in AWS]

* **Samenvatting**: Behandelt VPCs, subnets voor publieke/private toegang, load balancers voor traffic distributie, CloudFront als CDN-cache en Route 53 voor DNS-management om betrouwbare connectiviteit te garanderen.
* **Voorbeeld**: Richt een VPC in met public subnets voor webservers en private subnets voor databases, en gebruik vervolgens een Application Load Balancer om traffic gelijkmatig te verdelen, alsof je schepen naar verschillende kades stuurt.
* **Link voor meer details**: [Ask AI: Networking in AWS](https://alisol.ir/?ai=Networking%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|nl)

## [Onderwerp 6: Geavanceerde storage-oplossingen]

* **Samenvatting**: Bespreekt S3 voor object storage, Glacier voor archivering, Snowball voor grote datamigraties, EFS voor gedeelde file systems en gateways voor hybride cloud-omgevingen.
* **Voorbeeld**: Gebruik S3 om statische bestanden te hosten met buckets die op public zijn gezet voor een website, of gebruik Snowball om terabytes aan data naar AWS te versturen in plaats van trage uploads over het internet.
* **Link voor meer details**: [Ask AI: Geavanceerde storage-oplossingen](https://alisol.ir/?ai=Advanced%20Storage%20Solutions%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|nl)

## [Onderwerp 7: Databaseservices]

* **Samenvatting**: Gaat van databases draaien op EC2 tot managed RDS/Aurora voor relationele data, DynamoDB voor NoSQL, ElastiCache voor caching, Redshift voor big data warehousing en Athena voor het bevragen van S3 data lakes.
* **Voorbeeld**: Maak een RDS MySQL-instance voor de user data van een webapp die eenvoudig kan schalen, of gebruik DynamoDB voor key-value storage in een high-traffic app met global tables voor replicatie.
* **Link voor meer details**: [Ask AI: Databaseservices](https://alisol.ir/?ai=Database%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|nl)

## [Onderwerp 8: Messaging- en platformservices]

* **Samenvatting**: Introduceert Kinesis/SQS/SNS voor messaging queues, Elastic Beanstalk voor eenvoudige app deployment en Lightsail voor simpele hosting vergelijkbaar met traditionele webhosts.
* **Voorbeeld**: Gebruik SQS om report generation-taken in een queue te zetten tijdens piekmomenten zodat je database niet wordt overbelast, of deploy een WordPress-site via Beanstalk voor managed updates zonder servers te moeten beheren.
* **Link voor meer details**: [Ask AI: Messaging- en platformservices](https://alisol.ir/?ai=Messaging%20and%20Platform%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|nl)

## [Onderwerp 9: Containers en serverless computing]

* **Samenvatting**: Legt ECS/Fargate voor containers uit, ECR als container registry, Lambda voor serverless functions en Batch/Step Functions voor het verwerken van jobs en workflows.
* **Voorbeeld**: Laat een microservice draaien in ECS-containers voor schaalbaarheid, of trigger een Lambda function bij file uploads om afbeeldingen te resizen zonder servers te beheren.
* **Link voor meer details**: [Ask AI: Containers en serverless computing](https://alisol.ir/?ai=Containers%20and%20Serverless%20Computing%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|nl)

## [Onderwerp 10: SaaS-services]

* **Samenvatting**: Behandelt Cognito voor user auth, API Gateway/AppSync voor backends, SageMaker/ML APIs voor intelligentie, MediaConvert voor video en IoT Core voor devicemanagement.
* **Voorbeeld**: Integreer Cognito voor veilige logins met Google/Facebook, of gebruik Rekognition om gezichten te herkennen in geüploade foto's als feature voor een social app.
* **Link voor meer details**: [Ask AI: SaaS-services](https://alisol.ir/?ai=SaaS%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|nl)

## [Onderwerp 11: DevOps in AWS]

* **Samenvatting**: Definieert DevOps als de brug tussen development en operations, met CodePipeline voor CI/CD, CloudFormation voor infrastructure as code en CloudWatch voor monitoring van prestaties voorbij alleen uptime.
* **Voorbeeld**: Richt een pipeline in die codewijzigingen automatisch van GitHub naar ECS deployt na het draaien van tests, zodat je snel kunt releasen zonder handmatige stappen.
* **Link voor meer details**: [Ask AI: DevOps in AWS](https://alisol.ir/?ai=DevOps%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|nl)

## [Onderwerp 12: Beveiliging in AWS]

* **Samenvatting**: Bespreekt WAF/Shield voor firewalls, Inspector/GuardDuty/Macie voor scans en threat detection, en CloudTrail/Security Hub voor audits en gecentraliseerde monitoring.
* **Voorbeeld**: Schakel GuardDuty in om ongewoon servergedrag te detecteren, zoals vreemde netwerkverbindingen, zodat je een virtuele bewaker hebt tegen interne compromittering.
* **Link voor meer details**: [Ask AI: Beveiliging in AWS](https://alisol.ir/?ai=Security%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|nl)

## [Onderwerp 13: Conclusie]

* **Samenvatting**: Sluit af met opschoontips om kosten te vermijden, bronnen zoals AWS-blogs en events om up-to-date te blijven en advies over certificeringen in combinatie met hands-on projecten.
* **Voorbeeld**: Beëindig na demo's ongebruikte EC2-instances en verwijder S3-buckets om binnen de free tier-limieten te blijven en verrassende rekeningen te voorkomen.
* **Link voor meer details**: [Ask AI: Conclusie](https://alisol.ir/?ai=Conclusion%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|nl)

## Originele cursus
Voor de volledige ervaring kun je de [originele cursus op LinkedIn Learning](https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791) bekijken.

---

**Over de samenvatter**

Ik ben *Ali Sol*, een Backend Developer. Meer weten:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

