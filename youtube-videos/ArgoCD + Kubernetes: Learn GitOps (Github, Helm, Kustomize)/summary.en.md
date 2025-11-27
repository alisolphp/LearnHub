# ArgoCD + Kubernetes: Learn GitOps (Github, Helm, Kustomize)

* **Platform**: YouTube
* **Channel/Creator**: Rayan Slim
* **Duration**: 00:26:43
* **Release Date**: Mar 4, 2025
* **Video Link**: [https://www.youtube.com/watch?v=yj4O0wwkMQI](https://www.youtube.com/watch?v=yj4O0wwkMQI)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## Introduction to GitOps with ArgoCD
* **Summary**: GitOps uses a Git repository as the single source of truth for deployments in Kubernetes. ArgoCD monitors the repo and auto-applies changes. The tutorial covers three workflows: basic repo pointing, using Kustomize for environments, and handling Helm charts.
* **Key Takeaway/Example**: Focus on hands-on setup with provided files and a dev environment to implement these workflows practically.
* **Link for More Details**: [Ask AI: GitOps Introduction](https://alisol.ir/?ai=GitOps%20Introduction%7CRayan%20Slim%7CArgoCD%20%2B%20Kubernetes%3A%20Learn%20GitOps%20%28Github%2C%20Helm%2C%20Kustomize%29)

## Setting Up the Environment
* **Summary**: Clone the provided GitHub repo, which contains manifests for a sample app (grade submission API) and supports the three GitOps workflows. Open it in VS Code and prepare a terminal.
* **Key Takeaway/Example**: The repo includes paths like /gitops-basic for raw YAML, /kustomize for base/overlays, and /helm-grade-submission for Helm charts.
* **Link for More Details**: [Ask AI: Environment Setup](https://alisol.ir/?ai=Environment%20Setup%7CRayan%20Slim%7CArgoCD%20%2B%20Kubernetes%3A%20Learn%20GitOps%20%28Github%2C%20Helm%2C%20Kustomize%29)

## Installing ArgoCD
* **Summary**: Install ArgoCD via Helm by adding the repo, creating a namespace, and deploying the chart. Verify pods and services in the argocd namespace.
* **Key Takeaway/Example**: Use commands like:
  ```bash
  helm repo add argo https://argoproj.github.io/argo-helm
  kubectl create namespace argocd
  helm install argocd argo/argocd --namespace argocd
  ```
  Check with `kubectl get pods -n argocd`.
* **Link for More Details**: [Ask AI: ArgoCD Installation](https://alisol.ir/?ai=ArgoCD%20Installation%7CRayan%20Slim%7CArgoCD%20%2B%20Kubernetes%3A%20Learn%20GitOps%20%28Github%2C%20Helm%2C%20Kustomize%29)

## Accessing ArgoCD UI
* **Summary**: Port-forward the ArgoCD server service to localhost:8080. Login with username 'admin' and retrieve the password from the secret.
* **Key Takeaway/Example**: Command for password: `kubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath="{.data.password}" | base64 -d`. Then access via browser and sign in.
* **Link for More Details**: [Ask AI: ArgoCD UI Access](https://alisol.ir/?ai=ArgoCD%20UI%20Access%7CRayan%20Slim%7CArgoCD%20%2B%20Kubernetes%3A%20Learn%20GitOps%20%28Github%2C%20Helm%2C%20Kustomize%29)

## Basic GitOps Workflow
* **Summary**: Create an ArgoCD Application resource pointing to the Git repo's /gitops-basic path. It deploys a deployment and service, auto-syncs changes like replica counts.
* **Key Takeaway/Example**: Fork the repo for edits, update the Application YAML to point to your fork, apply it, and sync in the UI to see changes reflect in Kubernetes (e.g., scaling pods from 3 to 5).
* **Link for More Details**: [Ask AI: Basic GitOps](https://alisol.ir/?ai=Basic%20GitOps%7CRayan%20Slim%7CArgoCD%20%2B%20Kubernetes%3A%20Learn%20GitOps%20%28Github%2C%20Helm%2C%20Kustomize%29)

## Using Kustomize for Environment-Specific Deployments
* **Summary**: Use Kustomize overlays to customize base manifests for dev/staging/prod. Overlays add prefixes and patches (e.g., replica counts) before deployment.
* **Key Takeaway/Example**: For dev, point to /kustomize/overlays/dev, which applies a 'dev-' prefix and patches replicas to 1 (or edit to 5). Duplicate for prod with different patches (e.g., 7 replicas). Sync shows environment-specific changes.
* **Link for More Details**: [Ask AI: Kustomize Workflows](https://alisol.ir/?ai=Kustomize%20Workflows%7CRayan%20Slim%7CArgoCD%20%2B%20Kubernetes%3A%20Learn%20GitOps%20%28Github%2C%20Helm%2C%20Kustomize%29)

## Deploying with Helm Charts
* **Summary**: ArgoCD natively supports Helm; point the Application to the Helm chart path and values.yaml. Changes to values (e.g., replicas) trigger auto-upgrades.
* **Key Takeaway/Example**: Apply the Helm Application YAML pointing to /helm-grade-submission. Edit values.yaml replicas from 2 to 4, sync in ArgoCD to update the deployment.
* **Link for More Details**: [Ask AI: Helm with ArgoCD](https://alisol.ir/?ai=Helm%20with%20ArgoCD%7CRayan%20Slim%7CArgoCD%20%2B%20Kubernetes%3A%20Learn%20GitOps%20%28Github%2C%20Helm%2C%20Kustomize%29)

## Conclusion and Next Steps
* **Summary**: The three workflows demonstrate scalable GitOps: basic, Kustomize for environments, and Helm for complex apps. ArgoCD ensures sync between Git and cluster.
* **Key Takeaway/Example**: This setup maintains a single source of truth, ideal for enterprise. Check related courses for deeper dives into Helm or Kubernetes.
* **Link for More Details**: [Ask AI: GitOps Conclusion](https://alisol.ir/?ai=GitOps%20Conclusion%7CRayan%20Slim%7CArgoCD%20%2B%20Kubernetes%3A%20Learn%20GitOps%20%28Github%2C%20Helm%2C%20Kustomize%29)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
