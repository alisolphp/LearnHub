# Resumo do Curso: AWS Essential Training for Developers

* **Plataforma**: LinkedIn Learning
* **Instrutor**: Jeremy Villeneuve
* **Avaliação**: 4.8/5
* **Data de atualização**: setembro de 2023
* **Link do curso**: https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791

*Este documento resume os pontos principais do curso. Recomendo fortemente assistir ao curso completo se você tiver a oportunidade.*

## Antes de começar
- Eu resumo os pontos-chave de cursos úteis para aprender e revisar rapidamente.
- Basta clicar nos links `Ask AI` para aprofundar qualquer tópico que você quiser.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## [Tópico 1: Introdução à AWS]

* **Resumo**: Esta seção começa com uma visão geral de como se aproximar da AWS, comparando-a a uma nave estelar com vários serviços. Cobre os objetivos do curso, como entender os principais serviços, seus ícones e quando usá-los, além de pré-requisitos como noções básicas de informática e redes.
* **Exemplo**: Pense na sua conta da AWS como a Millennium Falcon para pequenas equipes ou a Starship Enterprise para operações maiores, ajudando você a visualizar escala e gerenciamento.
* **Link para mais detalhes**: [Ask AI: Introduction to AWS](https://alisol.ir/?ai=Introduction%20to%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pt)

## [Tópico 2: Configuração de conta AWS e segurança]

* **Resumo**: Você aprende a configurar a conta raiz da AWS, criar usuários IAM para acesso mais seguro, gerar chaves de API e configurar alarmes de cobrança para evitar surpresas. Há ênfase em proteger a conta raiz com MFA e seguir o princípio de menor privilégio.
* **Exemplo**: Depois de criar um usuário IAM e adicioná-lo a um grupo "admins" com AdministratorAccess, você sai da conta raiz e passa a usar o usuário IAM nas tarefas diárias, como um capitão que delega o comando de rotina.
* **Link para mais detalhes**: [Ask AI: AWS Account Setup and Security](https://alisol.ir/?ai=AWS%20Account%20Setup%20and%20Security%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pt)

## [Tópico 3: Fundamentos de computação em nuvem]

* **Resumo**: Explora os desafios de hospedagem on-premise antes da nuvem, o lançamento do EC2 para servidores elásticos e do S3 para armazenamento, regiões/Zonas de Disponibilidade para redundância e o modelo de responsabilidade compartilhada, em que a AWS cuida do hardware e você gerencia a segurança do software.
* **Exemplo**: Antes da nuvem, escalar para picos de tráfego repentinos significava semanas de preparação de hardware; com Auto Scaling em EC2, os servidores se expandem de forma elástica durante um pico de fim de semana e reduzem novamente na segunda-feira.
* **Link para mais detalhes**: [Ask AI: Cloud Computing Fundamentals](https://alisol.ir/?ai=Cloud%20Computing%20Fundamentals%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pt)

## [Tópico 4: Instâncias EC2 e armazenamento]

* **Resumo**: Orienta sobre como criar instâncias EC2, escolher tipos com base na carga de trabalho (por exemplo, general purpose), anexar volumes EBS para armazenamento persistente e usar Elastic IPs para endereços estáticos.
* **Exemplo**: Inicie uma instância t2.micro com Ubuntu, conecte via SSH com um par de chaves e anexe um volume EBS como se estivesse adicionando um disco externo para armazenar dados do aplicativo além da vida útil da instância.
* **Link para mais detalhes**: [Ask AI: EC2 Instances and Storage](https://alisol.ir/?ai=EC2%20Instances%20and%20Storage%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pt)

## [Tópico 5: Networking na AWS]

* **Resumo**: Cobre VPCs, sub-redes para acesso público/privado, load balancers para distribuição de tráfego, CloudFront como CDN para cache e Route 53 para gerenciamento de DNS, garantindo conectividade confiável.
* **Exemplo**: Configure uma VPC com sub-redes públicas para servidores web e privadas para bancos de dados, depois use um Application Load Balancer para distribuir o tráfego de forma equilibrada, como direcionar navios para docas diferentes.
* **Link para mais detalhes**: [Ask AI: Networking in AWS](https://alisol.ir/?ai=Networking%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pt)

## [Tópico 6: Soluções avançadas de armazenamento]

* **Resumo**: Discute S3 para armazenamento de objetos, Glacier para arquivamento, Snowball para grandes transferências de dados, EFS para sistemas de arquivos compartilhados e gateways para configurações híbridas de nuvem.
* **Exemplo**: Use S3 para hospedar arquivos estáticos com buckets públicos para um site ou Snowball para enviar terabytes de dados para a AWS em vez de fazer upload lento pela internet.
* **Link para mais detalhes**: [Ask AI: Advanced Storage Solutions](https://alisol.ir/?ai=Advanced%20Storage%20Solutions%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pt)

## [Tópico 7: Serviços de banco de dados]

* **Resumo**: Vai desde executar bancos de dados em EC2 até usar serviços gerenciados como RDS/Aurora para dados relacionais, DynamoDB para NoSQL, ElastiCache para cache, Redshift para data warehouse em larga escala e Athena para consultar data lakes no S3.
* **Exemplo**: Crie uma instância RDS MySQL para armazenar os dados de usuários de um aplicativo web, escalando com facilidade, ou use DynamoDB para armazenamento chave-valor em um app de alto tráfego com global tables para replicação.
* **Link para mais detalhes**: [Ask AI: Database Services](https://alisol.ir/?ai=Database%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pt)

## [Tópico 8: Mensageria e serviços de plataforma]

* **Resumo**: Introduz Kinesis/SQS/SNS para filas e streams de mensagens, Elastic Beanstalk para deployment fácil de aplicações e Lightsail para hospedagem simples, semelhante a provedores tradicionais de hospedagem.
* **Exemplo**: Use SQS para enfileirar tarefas de geração de relatórios durante picos de uso, evitando sobrecarga no banco de dados, ou faça o deploy de um site WordPress via Beanstalk para ter updates gerenciados sem precisar mexer diretamente nos servidores.
* **Link para mais detalhes**: [Ask AI: Messaging and Platform Services](https://alisol.ir/?ai=Messaging%20and%20Platform%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pt)

## [Tópico 9: Containers e computação serverless]

* **Resumo**: Explica ECS/Fargate para containers, ECR como registry, Lambda para funções serverless e Batch/Step Functions para processamento de jobs e orquestração de workflows.
* **Exemplo**: Execute um microserviço em containers ECS para ter escalabilidade ou dispare uma função Lambda quando arquivos forem enviados para o S3, redimensionando imagens sem gerenciar servidores.
* **Link para mais detalhes**: [Ask AI: Containers and Serverless Computing](https://alisol.ir/?ai=Containers%20and%20Serverless%20Computing%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pt)

## [Tópico 10: Serviços SaaS]

* **Resumo**: Cobre Cognito para autenticação de usuários, API Gateway/AppSync para backends, SageMaker/APIs de Machine Learning para inteligência, MediaConvert para vídeo e IoT Core para gerenciamento de dispositivos.
* **Exemplo**: Integre Cognito para logins seguros com Google/Facebook ou use Rekognition para detectar rostos em fotos enviadas pelos usuários em uma funcionalidade de app social.
* **Link para mais detalhes**: [Ask AI: SaaS Services](https://alisol.ir/?ai=SaaS%20Services%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pt)

## [Tópico 11: DevOps na AWS]

* **Resumo**: Define DevOps como a ponte entre desenvolvimento e operações, com CodePipeline para CI/CD, CloudFormation para infraestrutura como código e CloudWatch para monitoramento de performance além de simples uptime.
* **Exemplo**: Configure um pipeline que faça deploy automático de mudanças de código do GitHub para ECS após a execução de testes, garantindo releases rápidas sem intervenção manual.
* **Link para mais detalhes**: [Ask AI: DevOps in AWS](https://alisol.ir/?ai=DevOps%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pt)

## [Tópico 12: Segurança na AWS]

* **Resumo**: Discute WAF/Shield como firewalls, Inspector/GuardDuty/Macie para varreduras e detecção de ameaças, além de CloudTrail/Security Hub para auditorias e monitoramento centralizado.
* **Exemplo**: Ative GuardDuty para identificar comportamentos incomuns em servidores, como conexões de rede estranhas, atuando como um guarda virtual contra comprometimentos internos.
* **Link para mais detalhes**: [Ask AI: Security in AWS](https://alisol.ir/?ai=Security%20in%20AWS%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pt)

## [Tópico 13: Conclusão]

* **Resumo**: Encerra com dicas de limpeza para evitar cobranças, recursos como blogs e eventos da AWS para se manter atualizado e conselhos sobre certificações combinadas com projetos práticos.
* **Exemplo**: Depois dos demos, encerre instâncias EC2 não utilizadas e exclua buckets S3 para se manter dentro dos limites do free tier, evitando faturas inesperadas.
* **Link para mais detalhes**: [Ask AI: Conclusion](https://alisol.ir/?ai=Conclusion%7CJeremy%20Villeneuve%7CAWS%20Essential%20Training%20for%20Developers|pt)

## Curso original
Para a experiência completa, confira o [curso original no LinkedIn Learning](https://www.linkedin.com/learning/aws-essential-training-for-developers-17237791).

---

**Sobre quem fez o resumo**

Sou *Ali Sol*, Backend Developer. Saiba mais:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)

