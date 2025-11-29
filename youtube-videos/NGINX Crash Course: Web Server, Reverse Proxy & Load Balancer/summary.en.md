# NGINX Crash Course: Web Server, Reverse Proxy & Load Balancer

* **Platform**: YouTube
* **Channel/Creator**: NeuralNine
* **Duration**: 00:43:23
* **Release Date**: Mar 28, 2025
* **Video Link**: [https://www.youtube.com/watch?v=7FpSPSlJj-0](https://www.youtube.com/watch?v=7FpSPSlJj-0)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer)
<!-- LH-BUTTONS:END -->

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

## Introduction to NGINX
**Summary**: NGINX is a versatile web server that also functions as a reverse proxy, load balancer, and handles SSL termination. It's essential for professional, scalable application deployment, allowing you to manage multiple servers, distribute loads, and secure communications without needing to handle these in your app code directly.

**Key Takeaway/Example**: Focus on deployment scenarios like combining frontends and backends or balancing traffic across instances to make apps production-ready.

[Ask AI: Introduction to NGINX](https://alisol.ir/?ai=Introduction%20to%20NGINX|NeuralNine|NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer)

## Installation and Configuration Basics
**Summary**: Install NGINX via package managers like apt on Ubuntu-based systems. The main config file is typically at /etc/nginx/nginx.conf, where you define events and HTTP contexts. You can start from scratch or modify defaults, and reload changes with 'nginx -s reload'. Optionally, use sites-available and sites-enabled for managing multiple configs via symlinks.

**Key Takeaway/Example**: Check for port 80 conflicts with 'lsof -i :80' before starting. Use 'sudoedit' or similar for editing configs with privileges.

[Ask AI: NGINX Installation and Configuration](https://alisol.ir/?ai=NGINX%20Installation%20and%20Configuration|NeuralNine|NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer)

## NGINX as a Web Server
**Summary**: Set up NGINX to serve static files by defining server blocks listening on port 80, with locations mapping URLs to root directories on your filesystem. Use 'root' to append paths or 'alias' for direct mapping.

**Key Takeaway/Example**: For a basic setup, create directories like /data/www and add files like index.html. In config:
```
server {
    listen 80;
    location / {
        root /data/www;
    }
}
```
Reload and access via localhost/.

[Ask AI: NGINX as Web Server](https://alisol.ir/?ai=NGINX%20as%20Web%20Server|NeuralNine|NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer)

## NGINX as a Reverse Proxy
**Summary**: Use NGINX to route requests from a single port (e.g., 80) to multiple backend services on different ports, like a React frontend on 5173 and Flask backend on 5555. This centralizes access, avoids CORS issues, and proxies requests transparently.

**Key Takeaway/Example**: Config example combining frontend and API:
```
server {
    listen 80;
    server_name localhost;
    location / {
        proxy_pass http://localhost:5173/;
    }
    location /api {
        proxy_pass http://localhost:5555/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
Frontend fetches from /api without specifying ports.

[Ask AI: NGINX as Reverse Proxy](https://alisol.ir/?ai=NGINX%20as%20Reverse%20Proxy|NeuralNine|NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer)

## SSL Termination with NGINX
**Summary**: Enable HTTPS by generating self-signed certificates with OpenSSL and configuring NGINX to listen on 443 with SSL. Redirect HTTP (port 80) traffic to HTTPS for secure connections, handling encryption/decryption at the proxy level while keeping internal comms HTTP.

**Key Takeaway/Example**: Generate certs: `openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout privkey.pem -out fullchain.pem`. Config:
```
server {
    listen 443 ssl;
    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;
    location / {
        proxy_pass http://localhost:5173/;
    }
}
server {
    listen 80;
    return 301 https://$host$request_uri;
}
```
Update frontend to use https://localhost/api.

[Ask AI: SSL Termination with NGINX](https://alisol.ir/?ai=SSL%20Termination%20with%20NGINX|NeuralNine|NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer)

## Load Balancing with NGINX
**Summary**: Distribute requests across multiple identical backend instances using an 'upstream' block for round-robin balancing. This prevents overloading a single server and scales horizontally.

**Key Takeaway/Example**: Run Flask on ports 5555, 5556, 5557. Config:
```
upstream backend_api {
    server localhost:5555;
    server localhost:5556;
    server localhost:5557;
}
server {
    listen 80;
    location /api {
        proxy_pass http://backend_api/;
    }
}
```
Requests alternate between instances.

[Ask AI: Load Balancing with NGINX](https://alisol.ir/?ai=Load%20Balancing%20with%20NGINX|NeuralNine|NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer)

## Caching with NGINX
**Summary**: Configure caching to store responses temporarily, reducing backend load for repeated requests. Set cache path, zone, and validity period for specific status codes.

**Key Takeaway/Example**: For a time endpoint on port 5000:
```
proxy_cache_path /tmp/cache keys_zone=my_cache:10m;
server {
    listen 80;
    location / {
        proxy_pass http://localhost:5000/;
        proxy_cache my_cache;
        proxy_cache_valid 200 10s;
    }
}
```
Responses refresh every 10 seconds.

[Ask AI: Caching with NGINX](https://alisol.ir/?ai=Caching%20with%20NGINX|NeuralNine|NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer)

## Integrating NGINX with Docker Compose
**Summary**: Containerize NGINX with frontend and backend services in Docker Compose, mounting configs and certs. Expose ports 80/443 on NGINX, build app images, and run everything together for easy deployment.

**Key Takeaway/Example**: docker-compose.yml defines services for frontend, backend, and nginx with volumes for conf.d and certs. Config in conf.d/default.conf mirrors SSL setup. Run with `docker compose up --build`.

[Ask AI: NGINX with Docker Compose](https://alisol.ir/?ai=NGINX%20with%20Docker%20Compose|NeuralNine|NGINX%20Crash%20Course%3A%20Web%20Server%2C%20Reverse%20Proxy%20%26%20Load%20Balancer)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
