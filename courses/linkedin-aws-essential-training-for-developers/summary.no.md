# Kurssammendrag: AWS Essential Training for Developers

* **Plattform**: LinkedIn Learning
* **Instruktør**: Jeremy Villeneuve
* **Vurdering**: 4.8/5
* **Sist oppdatert**: september 2023
* **Kurslenke**: https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791

*Dette dokumentet oppsummerer de viktigste punktene fra kurset. Jeg anbefaler på det sterkeste å se hele kurset hvis du har mulighet.*

## Før du begynner
- Jeg oppsummerer nøkkelpunkter fra nyttige kurs slik at du kan lære og repetere raskt.
- Klikk bare på `Ask AI`-lenkene for å fordype deg i hvilket som helst tema du ønsker.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=no&src=courses/linkedin-aws-essential-training-for-developers) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=no&src=courses/linkedin-aws-essential-training-for-developers) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=no&src=courses/linkedin-aws-essential-training-for-developers) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=no&src=courses/linkedin-aws-essential-training-for-developers) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=no&src=courses/linkedin-aws-essential-training-for-developers) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=no&src=courses/linkedin-aws-essential-training-for-developers) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=no&src=courses/linkedin-aws-essential-training-for-developers) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=no&src=courses/linkedin-aws-essential-training-for-developers) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=no&src=courses/linkedin-aws-essential-training-for-developers) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=no&src=courses/linkedin-aws-essential-training-for-developers) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=no&src=courses/linkedin-aws-essential-training-for-developers) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=no&src=courses/linkedin-aws-essential-training-for-developers)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=no&src=courses/linkedin-aws-essential-training-for-developers) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=no&src=courses/linkedin-aws-essential-training-for-developers) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=no&src=courses/linkedin-aws-essential-training-for-developers) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=no&src=courses/linkedin-aws-essential-training-for-developers) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=no&src=courses/linkedin-aws-essential-training-for-developers)
<!-- LH-BUTTONS:END -->

## [Emne 1: Introduksjon til AWS]

* **Sammendrag**: Denne delen starter med en oversikt over hvordan du bør tenke på AWS, og sammenligner det med et romskip med mange ulike tjenester. Den dekker kursmål som å forstå viktige tjenester, kjenne igjen ikonene deres og vite når du skal bruke dem, samt forkunnskaper som grunnleggende datakunnskap og nettverksforståelse.
* **Eksempel**: Tenk på AWS-kontoen din som Millennium Falcon for små team eller Starship Enterprise for større organisasjoner – det hjelper deg å visualisere skala og hvordan alt styres.
* **Lenke for mer informasjon**: [Ask AI: Introduction to AWS](https://alisol.ir/?ai=Introduction%20to%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|no)

## [Emne 2: AWS-kontooppsett og sikkerhet]

* **Sammendrag**: Du lærer å sette opp en AWS root account, opprette IAM-brukere for tryggere tilgang, generere API keys og konfigurere billing alarms for å unngå ubehagelige overraskelser. Det legges vekt på å sikre root account med MFA og å følge prinsippet om least privilege.
* **Eksempel**: Etter at du har opprettet en IAM-bruker og lagt den i en "admins"-gruppe med AdministratorAccess, logger du ut fra root og bruker IAM-kontoen til daglige oppgaver – som en kaptein som overlater rutinekommandoer til offiserene sine.
* **Lenke for mer informasjon**: [Ask AI: AWS Account Setup and Security](https://alisol.ir/?ai=AWS%20Account%20Setup%20and%20Security%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|no)

## [Emne 3: Grunnleggende om cloud computing]

* **Sammendrag**: Utforsker utfordringene med on-premise hosting før cloud, lanseringen av EC2 for elastiske servere og S3 for lagring, regions/Availability Zones for redundans, og shared responsibility model der AWS håndterer hardware mens du har ansvar for software og sikkerhet på applikasjonssiden.
* **Eksempel**: Før cloud betydde skalering for plutselige trafikkøkninger uker med hardware-innkjøp og installasjon; med EC2 auto scaling kan serverne skalere ut som strikk når trafikken øker i helgen, og inn igjen på mandag.
* **Lenke for mer informasjon**: [Ask AI: Cloud Computing Fundamentals](https://alisol.ir/?ai=Cloud%20Computing%20Fundamentals%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|no)

## [Emne 4: EC2-instanser og lagring]

* **Sammendrag**: Viser hvordan du oppretter EC2-instanser, velger instance types basert på workload (f.eks. general purpose), kobler til EBS volumes for persistent storage, og bruker Elastic IPs for statiske IP-adresser.
* **Eksempel**: Start en t2.micro Ubuntu-instans, koble til via SSH med en key pair, og fest et EBS volume som en ekstern disk for å lagre appdata utover levetiden til selve instansen.
* **Lenke for mer informasjon**: [Ask AI: EC2 Instances and Storage](https://alisol.ir/?ai=EC2%20Instances%20and%20Storage%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|no)

## [Emne 5: Nettverk i AWS]

* **Sammendrag**: Dekker VPCs, subnets for public/private access, load balancers for trafikkdistribusjon, CloudFront som CDN for caching, og Route 53 for DNS management for å sikre stabil og pålitelig tilkobling.
* **Eksempel**: Konfigurer en VPC med public subnets for webservere og private subnets for databaser, og bruk en Application Load Balancer for å fordele trafikk jevnt – som å dirigere skip til ulike kaier.
* **Lenke for mer informasjon**: [Ask AI: Networking in AWS](https://alisol.ir/?ai=Networking%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|no)

## [Emne 6: Avanserte lagringsløsninger]

* **Sammendrag**: Går gjennom S3 for object storage, Glacier for arkivering, Snowball for store datamigreringer, EFS for delte file systems og gateways for hybrid cloud-oppsett.
* **Eksempel**: Bruk S3 til å hoste statiske filer der buckets er satt til public for et nettsted, eller bruk Snowball for å sende terabytes med data fysisk til AWS i stedet for langsomme opplastinger over internett.
* **Lenke for mer informasjon**: [Ask AI: Advanced Storage Solutions](https://alisol.ir/?ai=Advanced%20Storage%20Solutions%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|no)

## [Emne 7: Databasetjenester]

* **Sammendrag**: Fra databaser som kjører på EC2 til managed tjenester som RDS/Aurora for relasjonelle data, DynamoDB for NoSQL, ElastiCache for caching, Redshift for big data warehousing og Athena for å kjøre queries mot S3 data lakes.
* **Eksempel**: Opprett en RDS MySQL-instans for brukerdata i en webapp som kan skalere uten mye bry, eller bruk DynamoDB for key-value-lagring i en høyt trafikkert app med global tables for replikering.
* **Lenke for mer informasjon**: [Ask AI: Database Services](https://alisol.ir/?ai=Database%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|no)

## [Emne 8: Messaging- og plattformtjenester]

* **Sammendrag**: Introduserer Kinesis/SQS/SNS for messaging queues, Elastic Beanstalk for enkel applikasjonsdeploy, og Lightsail for enkel hosting som ligner tradisjonelle webhotell.
* **Eksempel**: Bruk SQS for å køe rapportgenereringsjobber under trafikk-topper for å unngå å overbelaste databasen, eller deploy en WordPress-side via Elastic Beanstalk for håndtert drift uten å styre servere direkte.
* **Lenke for mer informasjon**: [Ask AI: Messaging and Platform Services](https://alisol.ir/?ai=Messaging%20and%20Platform%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|no)

## [Emne 9: Containere og serverless computing]

* **Sammendrag**: Forklarer ECS/Fargate for containere, ECR som container registry, Lambda for serverless functions, og Batch/Step Functions for behandling av jobber og workflows.
* **Eksempel**: Kjør en microservice i ECS-containere for enkel skalering, eller trigge en Lambda-funksjon når filer lastes opp til S3 for å resize bilder uten å drifte egne servere.
* **Lenke for mer informasjon**: [Ask AI: Containers and Serverless Computing](https://alisol.ir/?ai=Containers%20and%20Serverless%20Computing%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|no)

## [Emne 10: SaaS-tjenester]

* **Sammendrag**: Dekker Cognito for brukerautentisering, API Gateway/AppSync for backends, SageMaker/ML APIs for intelligent funksjonalitet, MediaConvert for video, og IoT Core for håndtering av enheter.
* **Eksempel**: Integrer Cognito for sikre innlogginger med Google/Facebook, eller bruk Rekognition for å oppdage ansikter i opplastede bilder som en funksjon i en sosial app.
* **Lenke for mer informasjon**: [Ask AI: SaaS Services](https://alisol.ir/?ai=SaaS%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|no)

## [Emne 11: DevOps i AWS]

* **Sammendrag**: Definerer DevOps som broen mellom utvikling og drift, med CodePipeline for CI/CD, CloudFormation for infrastructure as code og CloudWatch for monitorering av ytelse langt utover bare uptime.
* **Eksempel**: Sett opp en pipeline som automatisk deployer kodeendringer fra GitHub til ECS etter at tester har kjørt, slik at du får raske releases uten manuell deploy hver gang.
* **Lenke for mer informasjon**: [Ask AI: DevOps in AWS](https://alisol.ir/?ai=DevOps%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|no)

## [Emne 12: Sikkerhet i AWS]

* **Sammendrag**: Går gjennom WAF/Shield for web application firewall og beskyttelse mot DDoS, Inspector/GuardDuty/Macie for scanning og threat detection, og CloudTrail/Security Hub for revisjonsspor og sentralisert sikkerhetsovervåkning.
* **Eksempel**: Aktiver GuardDuty for å oppdage uvanlig atferd på servere, som merkelige nettverksforbindelser – som en virtuell vakt som fanger opp interne kompromitteringer.
* **Lenke for mer informasjon**: [Ask AI: Security in AWS](https://alisol.ir/?ai=Security%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|no)

## [Emne 13: Avslutning]

* **Sammendrag**: Avslutter med oppryddingstips for å unngå uventede kostnader, ressurser som AWS-blogger og events for å holde seg oppdatert, og råd om å kombinere sertifiseringer med praktiske prosjekter.
* **Eksempel**: Etter demoer bør du terminere ubrukte EC2-instanser og slette S3 buckets for å holde deg innenfor free tier-grensene og unngå overraskende regninger.
* **Lenke for mer informasjon**: [Ask AI: Conclusion](https://alisol.ir/?ai=Conclusion%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|no)

## Originalt kurs
For hele opplevelsen, se [det originale kurset på LinkedIn Learning](https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791).

---

**Om den som har oppsummert**

Jeg er *Ali Sol*, en Backend Developer. Lær mer:
- Nettside: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

