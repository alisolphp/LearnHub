# Service Mesh explained in 60 minutes | Istio mTLS and Canary Demo 

* **Platform**: YouTube
* **Channel/Creator**: Abhishek.Veeramalla 
* **Duration**: 01:04:24
* **Release Date**: April 26, 2024
* **Video Link**: [https://www.youtube.com/watch?v=eSNetKBe7Z8](https://www.youtube.com/watch?v=eSNetKBe7Z8)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=005796ea -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Service%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Service%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Service%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Service%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Service%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Service%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Service%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Service%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Service%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Service%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Service%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Service%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Service%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo)
<!-- LH-BUTTONS:END -->

## Introduction to Service Mesh
Service mesh manages traffic in Kubernetes clusters, focusing on east-west traffic between services inside the cluster, unlike north-south traffic which handles ingress or egress from outside.

**Summary**: Using Istio as an example, service mesh adds capabilities like secure communication and advanced deployments without altering your applications directly. The video covers theory and a practical demo with Istio installation, configuration, and features like mTLS and canary deployments.

**Key Takeaway/Example**: East-west traffic refers to internal service communications, such as a login service talking to a catalog service in an e-commerce app, while north-south is external access via ingress.

[Ask AI: Introduction to Service Mesh](https://alisol.ir/?ai=Introduction%20to%20Service%20Mesh%7CAbhishek.Veeramalla%7CService%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo%20)

## Why Use a Service Mesh
Service mesh enhances Kubernetes service-to-service communication with added security, deployment strategies, and observability.

**Summary**: Without a service mesh, services communicate directly but lack built-in mutual TLS for security, easy canary or blue-green deployments, circuit breaking, or inbuilt metrics tracking. Istio addresses these by securing communications, enabling traffic splitting for deployments, and providing observability via Kiali.

**Key Takeaway/Example**: For canary deployments, route 10% of traffic to a new version (e.g., payments v2) while keeping 90% on v1, then gradually increase based on metrics.

[Ask AI: Why Use a Service Mesh](https://alisol.ir/?ai=Why%20Use%20a%20Service%20Mesh%7CAbhishek.Veeramalla%7CService%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo%20)

## How Service Mesh Works: Sidecar Containers
Istio injects a sidecar container with an Envoy proxy into each pod to handle traffic.

**Summary**: The sidecar intercepts all inbound and outbound traffic, enabling features like mutual TLS by adding certificates without app changes. It routes requests, implements deployment strategies, and collects metrics for observability.

**Key Takeaway/Example**: In a catalog-to-payments communication, the sidecar on catalog adds a TLS certificate, and the sidecar on payments verifies it before allowing the request.

[Ask AI: How Service Mesh Works: Sidecar Containers](https://alisol.ir/?ai=How%20Service%20Mesh%20Works%3A%20Sidecar%20Containers%7CAbhishek.Veeramalla%7CService%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo%20)

## Admission Controllers in Kubernetes
Admission controllers mutate or validate resources before they're stored in etcd.

**Summary**: They intercept requests after authentication/authorization, like adding a default storage class to a PVC or enforcing resource quotas. Istio uses dynamic admission webhooks for sidecar injection.

**Key Takeaway/Example**: Create a PVC without a storage class; the default storage class admission controller mutates it to add one automatically.

[Ask AI: Admission Controllers in Kubernetes](https://alisol.ir/?ai=Admission%20Controllers%20in%20Kubernetes%7CAbhishek.Veeramalla%7CService%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo%20)

## Installing and Configuring Istio
Install Istio using the istioctl tool and enable sidecar injection on namespaces.

**Summary**: Download Istio, install with the demo profile, label namespaces for injection, and deploy apps. This sets up Istiod (control plane) and gateways.

**Key Takeaway/Example**: Run `istioctl install --set profile=demo -y` to install, then `kubectl label namespace default istio-injection=enabled` for automatic sidecar injection.

[Ask AI: Installing and Configuring Istio](https://alisol.ir/?ai=Installing%20and%20Configuring%20Istio%7CAbhishek.Veeramalla%7CService%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo%20)

## Demo Application: Bookinfo
Use Istio's Bookinfo app, a multi-microservice setup with different languages and versions.

**Summary**: It includes productpage, details, reviews (v1, v2, v3), and ratings services. Deploy it to test Istio features; expose via minikube tunnel or similar.

**Key Takeaway/Example**: Reviews v1 has no ratings connection, while v2/v3 do; round-robin load balancing cycles through versions on refresh.

[Ask AI: Demo Application: Bookinfo](https://alisol.ir/?ai=Demo%20Application%3A%20Bookinfo%7CAbhishek.Veeramalla%7CService%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo%20)

## Implementing Mutual TLS (mTLS)
Enable strict mTLS to secure service communications.

**Summary**: By default, permissive mode allows non-TLS access; switch to strict to require certificates. External curls fail without certs, but internal services succeed.

**Key Takeaway/Example**: Apply a PeerAuthentication resource with STRICT mode; curl to a service IP fails with "connection reset by peer."

[Ask AI: Implementing Mutual TLS (mTLS)](https://alisol.ir/?ai=Implementing%20Mutual%20TLS%20%28mTLS%29%7CAbhishek.Veeramalla%7CService%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo%20)

## Traffic Management: Virtual Services and Destination Rules
Use these CRDs to control routing and subsets.

**Summary**: Virtual Services define routes and weights; Destination Rules define subsets based on labels like versions. Together, they enable canary, traffic splitting, etc.

**Key Takeaway/Example**: For reviews, define subsets v1/v2/v3 in DestinationRule, then route 100% to v1 in VirtualService.

[Ask AI: Traffic Management: Virtual Services and Destination Rules](https://alisol.ir/?ai=Traffic%20Management%3A%20Virtual%20Services%20and%20Destination%20Rules%7CAbhishek.Veeramalla%7CService%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo%20)

## Canary Deployment Example
Shift traffic gradually between versions using weights.

**Summary**: Start with 100% to v1, then 50/50 between v1 and v3, finally 100% to v3. Refresh the app to observe routing changes.

**Key Takeaway/Example**: Update VirtualService weights: 50% to subset v1, 50% to v3; over multiple refreshes, traffic splits evenly.

[Ask AI: Canary Deployment Example](https://alisol.ir/?ai=Canary%20Deployment%20Example%7CAbhishek.Veeramalla%7CService%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo%20)

## Other Istio Features
Explore circuit breaking, timeouts, gateways, and observability.

**Summary**: Circuit breaking prevents cascading failures; gateways expose services externally (vs. standard ingress). Enable Kiali for metrics and tracing.

**Key Takeaway/Example**: Install Kiali with `kubectl apply -f samples/addons/kiali.yaml`, then access dashboard with `istioctl dashboard kiali`.

[Ask AI: Other Istio Features](https://alisol.ir/?ai=Other%20Istio%20Features%7CAbhishek.Veeramalla%7CService%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo%20)

## Internal Mechanics: Dynamic Admission Control
Istio uses webhooks for sidecar injection.

**Summary**: MutatingAdmissionWebhook forwards pod creation requests to Istiod's webhook, which injects the sidecar before storing in etcd.

**Key Takeaway/Example**: View config with `kubectl get mutatingwebhookconfigurations`; it defines rules to notify Istiod on pod creations.

[Ask AI: Internal Mechanics: Dynamic Admission Control](https://alisol.ir/?ai=Internal%20Mechanics%3A%20Dynamic%20Admission%20Control%7CAbhishek.Veeramalla%7CService%20Mesh%20explained%20in%2060%20minutes%20%7C%20Istio%20mTLS%20and%20Canary%20Demo%20)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
