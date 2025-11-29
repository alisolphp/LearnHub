# Résumé du cours : AWS Essential Training for Developers

* **Plateforme** : LinkedIn Learning
* **Formateur** : Jeremy Villeneuve
* **Note** : 4,8/5
* **Date de mise à jour** : septembre 2023
* **Lien du cours** : https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791

*Ce document résume les points essentiels du cours. Je te recommande vivement de suivre le cours complet si tu en as l’occasion.*

## Avant de commencer
- Je résume les points clés de cours utiles pour apprendre et réviser rapidement.
- Il te suffit de cliquer sur les liens `Ask AI` pour approfondir n’importe quel sujet.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## [Sujet 1 : Introduction à AWS]

* **Résumé** : Cette partie commence par une vue d’ensemble de la manière d’aborder AWS, en le comparant à un vaisseau spatial composé de différents services. Elle présente les objectifs du cours : comprendre les services principaux, reconnaître leurs icônes et savoir quand les utiliser, ainsi que les prérequis comme les bases en informatique et en réseau.
* **Exemple** : Imagine ton compte AWS comme le *Millennium Falcon* pour une petite équipe, ou comme l’*Enterprise* de *Star Trek* pour des opérations plus grandes : cela t’aide à visualiser la question d’échelle et de gestion.
* **Lien pour en savoir plus** : [Ask AI : Introduction à AWS](https://alisol.ir/?ai=Introduction%20to%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|fr)

## [Sujet 2 : Configuration du compte AWS et sécurité]

* **Résumé** : Tu apprends à créer un compte root AWS, à créer des utilisateurs IAM pour un accès plus sûr, à générer des clés API et à configurer des alarmes de facturation pour éviter les mauvaises surprises. On insiste sur la sécurisation du compte root avec la MFA et sur l’application du principe du moindre privilège.
* **Exemple** : Après avoir créé un utilisateur IAM et l’avoir ajouté à un groupe « admins » avec la policy *AdministratorAccess*, tu te déconnectes du compte root et tu utilises ce compte IAM pour les tâches quotidiennes, comme un capitaine qui délègue la gestion de la routine.
* **Lien pour en savoir plus** : [Ask AI : AWS Account Setup and Security](https://alisol.ir/?ai=AWS%20Account%20Setup%20and%20Security%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|fr)

## [Sujet 3 : Fondamentaux du cloud computing]

* **Résumé** : On explore les difficultés de l’hébergement on‑premise avant le cloud, le lancement d’EC2 pour les serveurs élastiques et de S3 pour le stockage, le rôle des *regions* et *Availability Zones* pour la redondance, ainsi que le *shared responsibility model* où AWS gère le matériel et une partie de la sécurité, tandis que toi tu es responsable de la couche logicielle et de la configuration.
* **Exemple** : Avant le cloud, gérer un pic de trafic soudain demandait des semaines de préparation matérielle ; avec l’auto‑scaling EC2, les serveurs se développent de façon élastique pendant un gros pic de trafic le week‑end, puis reviennent à la normale le lundi.
* **Lien pour en savoir plus** : [Ask AI : Cloud Computing Fundamentals](https://alisol.ir/?ai=Cloud%20Computing%20Fundamentals%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|fr)

## [Sujet 4 : Instances EC2 et stockage]

* **Résumé** : Cette section explique comment créer des instances EC2, choisir les types adaptés à ta charge de travail (par exemple *general purpose*), attacher des volumes EBS pour un stockage persistant, et utiliser des Elastic IP pour avoir des adresses IP statiques.
* **Exemple** : Tu lances une instance Ubuntu t2.micro, tu t’y connectes en SSH avec une key pair et tu attaches un volume EBS comme si tu ajoutais un disque externe pour stocker les données de l’application au‑delà de la durée de vie de l’instance.
* **Lien pour en savoir plus** : [Ask AI : EC2 Instances and Storage](https://alisol.ir/?ai=EC2%20Instances%20and%20Storage%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|fr)

## [Sujet 5 : Réseau dans AWS]

* **Résumé** : On y aborde les VPC, les subnets pour l’accès public/privé, les load balancers pour distribuer le trafic, CloudFront pour le caching via CDN, et Route 53 pour la gestion DNS afin d’assurer une connectivité fiable.
* **Exemple** : Tu mets en place une VPC avec des subnets publics pour les web servers et des subnets privés pour les bases de données, puis tu utilises un *Application Load Balancer* pour répartir le trafic de manière homogène, comme si tu dirigeais des navires vers différents quais.
* **Lien pour en savoir plus** : [Ask AI : Networking in AWS](https://alisol.ir/?ai=Networking%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|fr)

## [Sujet 6 : Solutions de stockage avancées]

* **Résumé** : Cette partie couvre S3 pour le stockage d’objets, Glacier pour l’archivage, Snowball pour les transferts de gros volumes de données, EFS pour les file systems partagés, et les Storage Gateways pour des architectures hybrides.
* **Exemple** : Tu utilises S3 pour héberger des fichiers statiques avec des buckets configurés en public pour un site web, ou tu utilises un appareil Snowball pour envoyer plusieurs téraoctets de données vers AWS sans passer par de longs uploads via internet.
* **Lien pour en savoir plus** : [Ask AI : Advanced Storage Solutions](https://alisol.ir/?ai=Advanced%20Storage%20Solutions%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|fr)

## [Sujet 7 : Services de base de données]

* **Résumé** : On part de bases de données installées sur EC2 pour aller vers les services managés comme RDS/Aurora pour les données relationnelles, DynamoDB pour le NoSQL, ElastiCache pour le caching, Redshift pour le data warehousing à grande échelle, et Athena pour interroger des data lakes stockés dans S3.
* **Exemple** : Tu crées une instance RDS MySQL pour les données utilisateurs d’une web app, avec une montée en charge simplifiée, ou tu utilises DynamoDB comme key‑value store pour une application à très fort trafic, avec des *global tables* pour la réplication multi‑région.
* **Lien pour en savoir plus** : [Ask AI : Database Services](https://alisol.ir/?ai=Database%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|fr)

## [Sujet 8 : Messaging et services de plateforme]

* **Résumé** : Présentation de Kinesis/SQS/SNS pour la gestion de files de messages, d’Elastic Beanstalk pour le déploiement simplifié d’applications, et de Lightsail pour un hébergement simple, proche des hébergeurs web classiques.
* **Exemple** : Tu utilises SQS pour mettre en file d’attente les tâches de génération de rapports pendant les pics de charge afin de ne pas surcharger la base de données, ou tu déploies un site WordPress via Elastic Beanstalk pour bénéficier de mises à jour gérées sans devoir administrer les serveurs toi‑même.
* **Lien pour en savoir plus** : [Ask AI : Messaging and Platform Services](https://alisol.ir/?ai=Messaging%20and%20Platform%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|fr)

## [Sujet 9 : Containers et serverless]

* **Résumé** : Cette section explique comment utiliser ECS/Fargate pour les containers, ECR comme registry, Lambda pour les fonctions serverless, ainsi que Batch et Step Functions pour gérer des jobs de traitement et des workflows.
* **Exemple** : Tu exécutes un microservice dans des containers ECS pour bénéficier d’une bonne scalabilité, ou tu déclenches une fonction Lambda lors de l’upload d’un fichier afin de redimensionner des images sans gérer de serveurs.
* **Lien pour en savoir plus** : [Ask AI : Containers and Serverless Computing](https://alisol.ir/?ai=Containers%20and%20Serverless%20Computing%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|fr)

## [Sujet 10 : Services SaaS]

* **Résumé** : On couvre ici Cognito pour l’authentification utilisateur, API Gateway/AppSync pour les backends d’API, SageMaker et les ML APIs pour ajouter de l’intelligence, MediaConvert pour la vidéo, et IoT Core pour la gestion des objets connectés.
* **Exemple** : Tu intègres Cognito pour gérer des logins sécurisés avec Google/Facebook, ou tu utilises Rekognition pour détecter des visages dans des photos uploadées afin d’ajouter une fonctionnalité à une application sociale.
* **Lien pour en savoir plus** : [Ask AI : SaaS Services](https://alisol.ir/?ai=SaaS%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|fr)

## [Sujet 11 : DevOps dans AWS]

* **Résumé** : On définit DevOps comme un pont entre les équipes de développement et d’opérations, avec CodePipeline pour le CI/CD, CloudFormation pour l’Infrastructure as Code et CloudWatch pour la supervision au‑delà du simple uptime.
* **Exemple** : Tu configures une pipeline qui déploie automatiquement les changements de code depuis GitHub vers ECS après exécution des tests, ce qui permet des mises en production rapides sans intervention manuelle.
* **Lien pour en savoir plus** : [Ask AI : DevOps in AWS](https://alisol.ir/?ai=DevOps%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|fr)

## [Sujet 12 : Sécurité dans AWS]

* **Résumé** : Cette partie présente WAF/Shield pour les firewalls applicatifs, Inspector/GuardDuty/Macie pour l’analyse de vulnérabilités et la détection de menaces, ainsi que CloudTrail/Security Hub pour les audits et le monitoring centralisé.
* **Exemple** : Tu actives GuardDuty pour repérer des comportements inhabituels sur tes serveurs, comme des connexions réseau suspectes, agissant comme un garde virtuel contre des compromissions internes.
* **Lien pour en savoir plus** : [Ask AI : Security in AWS](https://alisol.ir/?ai=Security%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|fr)

## [Sujet 13 : Conclusion]

* **Résumé** : La conclusion propose des conseils de nettoyage des ressources pour éviter des frais inutiles, mentionne des ressources comme les blogs et événements AWS pour rester à jour, et donne des recommandations sur les certifications à combiner avec des projets pratiques.
* **Exemple** : Après les démos, tu termines les instances EC2 inutiles et tu supprimes les buckets S3 de test pour rester dans les limites de la free tier et éviter les factures surprises.
* **Lien pour en savoir plus** : [Ask AI : Conclusion](https://alisol.ir/?ai=Conclusion%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|fr)

## Cours original
Pour vivre l’expérience complète, consulte le [cours original sur LinkedIn Learning](https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791).

---

**À propos du rédacteur du résumé**

Je suis *Ali Sol*, Backend Developer. En savoir plus :
- Site web : [alisol.ir](https://alisol.ir)
- LinkedIn : [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

