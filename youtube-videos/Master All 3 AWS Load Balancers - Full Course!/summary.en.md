# Master All 3 AWS Load Balancers - Full Course!

* **Platform**: YouTube
* **Channel/Creator**: Rahul Wagh
* **Duration**: 01:57:43
* **Release Date**: May 27, 2025
* **Video Link**: [https://www.youtube.com/watch?v=znQsN8KzF_o](https://www.youtube.com/watch?v=znQsN8KzF_o)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

## Introduction to AWS Load Balancers
* **Summary**: The video covers all three types of AWS load balancers—Application Load Balancer (ALB), Network Load Balancer (NLB), and Gateway Load Balancer (GLB)—with independent demos. You can skip to specific sections using timestamps in the description.
* **Key Takeaway/Example**: Focuses on practical setups in AWS, including VPCs, subnets, EC2 instances, and load balancing traffic. A Udemy course on AWS networking is promoted for deeper learning on related topics like VPCs and Terraform.
* **Link for More Details**: [Ask AI: AWS Load Balancers Overview](https://alisol.ir/?ai=AWS%20Load%20Balancers%20Overview%7CRahul%20Wagh%7CMaster%20All%203%20AWS%20Load%20Balancers%20-%20Full%20Course%21)

## Setting Up Application Load Balancer (ALB)
* **Summary**: Start by creating a VPC, internet gateway, public subnets, route tables, and two EC2 instances with Apache installed via user data scripts. Then, create a target group including both EC2 instances and attach it to an internet-facing ALB on port 80.
* **Key Takeaway/Example**: Use user data to bootstrap EC2 with Apache: update packages, install apache2, and modify index.html to display the instance's hostname or IP. Security groups allow SSH (22) and HTTP (80) from anywhere. Access the ALB DNS to see traffic alternating between EC2 IPs like 10.0.1.142 and 10.0.3.160.
```
#!/bin/bash
sudo apt update -y
sudo apt install apache2 -y
sudo systemctl start apache2
sudo bash -c 'echo your very first web server > /var/www/html/index.html'
```
* **Link for More Details**: [Ask AI: ALB Setup in AWS](https://alisol.ir/?ai=ALB%20Setup%20in%20AWS%7CRahul%20Wagh%7CMaster%20All%203%20AWS%20Load%20Balancers%20-%20Full%20Course%21)

## Differences Between ALB and NLB
* **Summary**: ALB operates at Layer 7 (HTTP/HTTPS), supporting path-based routing like /foo and /bar to different target groups. NLB works at Layer 4 (TCP/UDP), offering ultra-low latency for high-throughput apps but no path routing.
* **Key Takeaway/Example**: For ALB, create separate target groups for /foo and /bar EC2 instances, then add listener rules to route based on URL paths. NLB can't do this; it handles static IPs and millions of requests but lacks HTTP features like WAF integration or TLS termination.
* **Link for More Details**: [Ask AI: ALB vs NLB Differences](https://alisol.ir/?ai=ALB%20vs%20NLB%20Differences%7CRahul%20Wagh%7CMaster%20All%203%20AWS%20Load%20Balancers%20-%20Full%20Course%21)

## Setting Up Network Load Balancer (NLB)
* **Summary**: Similar to ALB, create a VPC with public and private subnets, internet gateway, route tables, and EC2 instances. Add instances to a target group, then create an internet-facing NLB pointing to it. Test by accessing the NLB DNS.
* **Key Takeaway/Example**: NLB preserves client IP and supports TCP/UDP, ideal for low-latency scenarios. Modify EC2 folders (/foo, /bar) to demonstrate NLB can't route based on paths—unlike ALB, where rules forward /foo to one group and /bar to another.
* **Link for More Details**: [Ask AI: NLB Setup in AWS](https://alisol.ir/?ai=NLB%20Setup%20in%20AWS%7CRahul%20Wagh%7CMaster%20All%203%20AWS%20Load%20Balancers%20-%20Full%20Course%21)

## Understanding Gateway Load Balancer (GLB)
* **Summary**: GLB inspects traffic between VPCs, like a ticket checker at amusement park gates distributing entry. Create two VPCs (workload and security), subnets, route tables, EC2 instances (workload generators and appliances), a target group for appliances, and a GLB.
* **Key Takeaway/Example**: Use VPC endpoints and services to connect VPCs. Update private route tables to route traffic via the endpoint to GLB. Verify with tcpdump on the appliance EC2 to see inspected traffic from workload IPs (e.g., 10.0.2.163 to 81.0.1.251).
* **Link for More Details**: [Ask AI: GLB Traffic Inspection](https://alisol.ir/?ai=GLB%20Traffic%20Inspection%7CRahul%20Wagh%7CMaster%20All%203%20AWS%20Load%20Balancers%20-%20Full%20Course%21)

## GLB Setup and Verification
* **Summary**: In the security VPC, add an internet gateway temporarily for demo. Create GLB with GENEVE protocol on port 6081. Use VPC endpoint service for GLB and endpoint in workload VPC. Update routes to forward all traffic (0.0.0.0/0) to the endpoint.
* **Key Takeaway/Example**: Run tcpdump on the appliance to capture packets: sudo tcpdump -nn -i any port 80. Traffic from workload EC2 shows up, confirming inspection. GLB enables scalable inspection for Lambda, EKS, ECS, or EC2 traffic.
* **Link for More Details**: [Ask AI: GLB Demo in AWS](https://alisol.ir/?ai=GLB%20Demo%20in%20AWS%7CRahul%20Wagh%7CMaster%20All%203%20AWS%20Load%20Balancers%20-%20Full%20Course%21)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
