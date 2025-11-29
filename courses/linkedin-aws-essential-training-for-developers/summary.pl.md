# Podsumowanie kursu: AWS Essential Training for Developers

* **Platforma**: LinkedIn Learning
* **Prowadzący**: Jeremy Villeneuve
* **Ocena**: 4.8/5
* **Data aktualizacji**: wrzesień 2023
* **Link do kursu**: https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791

*Ten dokument podsumowuje najważniejsze punkty z kursu. Jeśli masz możliwość, zdecydowanie warto obejrzeć cały kurs.*

## Zanim zaczniesz
- Streszczam kluczowe punkty z wartościowych kursów, żeby można było szybko się uczyć i powtarzać materiał.
- Po prostu kliknij linki `Ask AI`, aby zagłębić się w dowolny interesujący Cię temat.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=pl&src=courses/linkedin-aws-essential-training-for-developers) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=pl&src=courses/linkedin-aws-essential-training-for-developers) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=pl&src=courses/linkedin-aws-essential-training-for-developers) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=pl&src=courses/linkedin-aws-essential-training-for-developers) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=pl&src=courses/linkedin-aws-essential-training-for-developers) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=pl&src=courses/linkedin-aws-essential-training-for-developers) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=pl&src=courses/linkedin-aws-essential-training-for-developers) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=pl&src=courses/linkedin-aws-essential-training-for-developers) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=pl&src=courses/linkedin-aws-essential-training-for-developers) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=pl&src=courses/linkedin-aws-essential-training-for-developers) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=pl&src=courses/linkedin-aws-essential-training-for-developers) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=pl&src=courses/linkedin-aws-essential-training-for-developers)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=pl&src=courses/linkedin-aws-essential-training-for-developers) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=pl&src=courses/linkedin-aws-essential-training-for-developers) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=pl&src=courses/linkedin-aws-essential-training-for-developers) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=pl&src=courses/linkedin-aws-essential-training-for-developers) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=pl&src=courses/linkedin-aws-essential-training-for-developers)
<!-- LH-BUTTONS:END -->

## [Temat 1: Wprowadzenie do AWS]

* **Podsumowanie**: Ta część zaczyna się od ogólnego spojrzenia na to, jak podchodzić do AWS, porównując go do statku kosmicznego z różnymi usługami. Omawia cele kursu, takie jak zrozumienie kluczowych usług, ich ikon oraz tego, kiedy ich używać, a także wymagania wstępne, np. podstawową znajomość komputerów i sieci.
* **Przykład**: Pomyśl o swoim koncie AWS jak o Millennium Falcon dla małych zespołów albo Starship Enterprise dla większych organizacji – pomaga to wyobrazić sobie skalę i zarządzanie.
* **Link po więcej informacji**: [Ask AI: Introduction to AWS](https://alisol.ir/?ai=Introduction%20to%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pl)

## [Temat 2: Konfiguracja konta AWS i bezpieczeństwo]

* **Podsumowanie**: Nauczysz się zakładać konto root w AWS, tworzyć użytkowników IAM dla bezpieczniejszego dostępu, generować API keys oraz konfigurować billing alarms, aby uniknąć niespodzianek. Podkreślane jest zabezpieczenie konta root za pomocą MFA oraz stosowanie zasady najmniejszych uprawnień (least privilege).
* **Przykład**: Po utworzeniu użytkownika IAM i dodaniu go do grupy „admins” z uprawnieniami AdministratorAccess, wylogowujesz się z konta root i używasz IAM do codziennej pracy – jak kapitan, który przekazuje rutynowe zadania załodze.
* **Link po więcej informacji**: [Ask AI: AWS Account Setup and Security](https://alisol.ir/?ai=AWS%20Account%20Setup%20and%20Security%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pl)

## [Temat 3: Podstawy cloud computingu]

* **Podsumowanie**: Omawia problemy hostingu on‑premise sprzed ery chmury, pojawienie się EC2 jako elastycznych serwerów oraz S3 jako storage, regiony i availability zones zapewniające redundancję, a także model shared responsibility, w którym AWS odpowiada za hardware, a Ty za bezpieczeństwo software’u.
* **Przykład**: Przed chmurą skalowanie pod nagłe skoki ruchu oznaczało tygodnie przygotowań i zamawiania sprzętu; dzięki EC2 auto-scaling serwery rozszerzają się elastycznie w trakcie weekendowego piku, a w poniedziałek z powrotem się kurczą.
* **Link po więcej informacji**: [Ask AI: Cloud Computing Fundamentals](https://alisol.ir/?ai=Cloud%20Computing%20Fundamentals%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pl)

## [Temat 4: EC2 Instances i storage]

* **Podsumowanie**: Prowadzi krok po kroku przez tworzenie EC2 instances, wybór typów w zależności od workloadu (np. general purpose), podłączanie EBS volumes jako persistent storage oraz używanie Elastic IPs do statycznych adresów.
* **Przykład**: Uruchamiasz t2.micro Ubuntu instance, łączysz się przez SSH przy użyciu key pair i dołączasz EBS volume jak zewnętrzny dysk, aby przechowywać dane aplikacji niezależnie od cyklu życia instancji.
* **Link po więcej informacji**: [Ask AI: EC2 Instances and Storage](https://alisol.ir/?ai=EC2%20Instances%20and%20Storage%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pl)

## [Temat 5: Networking w AWS]

* **Podsumowanie**: Obejmuje VPC, subnets dla public/private access, load balancers do dystrybucji ruchu, CloudFront jako CDN do cache’owania oraz Route 53 do zarządzania DNS, aby zapewnić niezawodne połączenia.
* **Przykład**: Konfigurujesz VPC z public subnets dla web servers i private subnets dla baz danych, a następnie używasz Application Load Balancer, aby równomiernie rozkładać ruch – jak kierowanie statków do różnych doków.
* **Link po więcej informacji**: [Ask AI: Networking in AWS](https://alisol.ir/?ai=Networking%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pl)

## [Temat 6: Zaawansowane rozwiązania storage]

* **Podsumowanie**: Omawia S3 jako object storage, Glacier do archiwizacji, Snowball do dużych transferów danych, EFS jako współdzielony file system oraz gateways dla hybrid cloud setups.
* **Przykład**: Używasz S3 do hostowania statycznych plików z buckets ustawionymi na public dla prostej strony www albo Snowball, żeby wysłać do AWS terabajty danych zamiast długo je uploadować przez internet.
* **Link po więcej informacji**: [Ask AI: Advanced Storage Solutions](https://alisol.ir/?ai=Advanced%20Storage%20Solutions%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pl)

## [Temat 7: Database services]

* **Podsumowanie**: Od uruchamiania baz na EC2 po managed RDS/Aurora dla relacyjnych danych, DynamoDB jako NoSQL, ElastiCache do cache’owania, Redshift dla big data warehousing oraz Athena do zapytań na data lake w S3.
* **Przykład**: Tworzysz RDS MySQL instance dla danych użytkowników aplikacji webowej, skalując ją bez wysiłku, albo używasz DynamoDB do key‑value storage w aplikacji o dużym ruchu z global tables dla replikacji.
* **Link po więcej informacji**: [Ask AI: Database Services](https://alisol.ir/?ai=Database%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pl)

## [Temat 8: Messaging i platform services]

* **Podsumowanie**: Wprowadza Kinesis/SQS/SNS do kolejek wiadomości, Elastic Beanstalk do prostego deploymentu aplikacji oraz Lightsail dla prostego hostingu zbliżonego do tradycyjnych hostingów www.
* **Przykład**: Używasz SQS, aby kolejkować zadania generowania raportów w trakcie pików, zapobiegając przeciążeniu bazy danych, albo deployujesz stronę WordPress przez Beanstalk, mając zarządzane aktualizacje bez grzebania na serwerze.
* **Link po więcej informacji**: [Ask AI: Messaging and Platform Services](https://alisol.ir/?ai=Messaging%20and%20Platform%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pl)

## [Temat 9: Containers i serverless computing]

* **Podsumowanie**: Wyjaśnia ECS/Fargate dla containers, ECR jako registry, Lambda dla serverless functions oraz Batch/Step Functions do przetwarzania zadań i orkiestracji workflows.
* **Przykład**: Uruchamiasz microservice w ECS containers dla lepszej skalowalności albo wyzwalasz Lambda function przy uploadzie plików, aby np. zmieniać rozmiar obrazów bez zarządzania serwerami.
* **Link po więcej informacji**: [Ask AI: Containers and Serverless Computing](https://alisol.ir/?ai=Containers%20and%20Serverless%20Computing%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pl)

## [Temat 10: SaaS services]

* **Podsumowanie**: Obejmuje Cognito do user auth, API Gateway/AppSync dla backendów, SageMaker/ML APIs jako warstwę intelligence, MediaConvert do wideo oraz IoT Core do zarządzania urządzeniami.
* **Przykład**: Integrujesz Cognito do bezpiecznego logowania z Google/Facebook albo używasz Rekognition do wykrywania twarzy na uploadowanych zdjęciach jako funkcji w aplikacji społecznościowej.
* **Link po więcej informacji**: [Ask AI: SaaS Services](https://alisol.ir/?ai=SaaS%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pl)

## [Temat 11: DevOps w AWS]

* **Podsumowanie**: Definiuje DevOps jako most między dev i ops, z CodePipeline do CI/CD, CloudFormation jako infrastructure as code oraz CloudWatch do monitorowania performance’u, nie tylko uptime’u.
* **Przykład**: Konfigurujesz pipeline, który automatycznie deployuje zmiany z GitHub do ECS po przejściu testów, zapewniając szybkie wydania bez manualnej ingerencji.
* **Link po więcej informacji**: [Ask AI: DevOps in AWS](https://alisol.ir/?ai=DevOps%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pl)

## [Temat 12: Security w AWS]

* **Podsumowanie**: Omawia WAF/Shield jako firewalle, Inspector/GuardDuty/Macie do skanów i wykrywania zagrożeń oraz CloudTrail/Security Hub do audytów i scentralizowanego monitoringu.
* **Przykład**: Włączasz GuardDuty, żeby wykrywać nietypowe zachowanie serwerów, np. dziwne połączenia sieciowe – działa jak wirtualny strażnik przed wewnętrznymi kompromitacjami.
* **Link po więcej informacji**: [Ask AI: Security in AWS](https://alisol.ir/?ai=Security%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pl)

## [Temat 13: Zakończenie]

* **Podsumowanie**: Kończy kurs wskazówkami dotyczącymi cleanup, żeby uniknąć kosztów, poleca blogi AWS i wydarzenia, by być na bieżąco, oraz podaje rady dotyczące certyfikacji w połączeniu z praktycznymi projektami.
* **Przykład**: Po zakończeniu demo terminujesz nieużywane EC2 instances i usuwasz zbędne S3 buckets, żeby zmieścić się w free tier i uniknąć niespodziewanych rachunków.
* **Link po więcej informacji**: [Ask AI: Conclusion](https://alisol.ir/?ai=Conclusion%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pl)

## Oryginalny kurs
Po pełne doświadczenie zajrzyj do [oryginalnego kursu na LinkedIn Learning](https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791).

---

**O autorze podsumowania**

Jestem *Ali Sol*, Backend Developer. Więcej informacji:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

