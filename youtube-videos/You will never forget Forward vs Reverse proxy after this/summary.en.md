# You will never forget Forward vs Reverse proxy after this

* **Platform**: YouTube
* **Channel/Creator**: Abhishek.Veeramalla
* **Duration**: 00:35:15
* **Release Date**: Oct 15, 2025
* **Video Link**: https://www.youtube.com/watch?v=CmYI2R2D2M0

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=31acc7b2 -->

### AI-Powered buttons

Start teaching this to a:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/You%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/You%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/You%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/You%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/You%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this) | 
[Story](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/You%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/You%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/You%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/You%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/You%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/You%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/You%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/You%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/You%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/You%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/You%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this)
<!-- LH-BUTTONS:END -->

## Proxy Basics – Client, Server, and the Middleman
* **Summary**: Every HTTP request has a client (your browser/laptop) and a server (the application). A proxy is simply an intermediate server that sits between them. The magic lies in *where* you place it and *who* it protects.
* **Key Takeaway**: Forward proxy = client-side gatekeeper. Reverse proxy = server-side bodyguard.
* **Ask AI**: [Ask AI: Proxy Basics](https://alisol.ir/?ai=Proxy%20Basics%7CAbhishek.Veeramalla%7CYou%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this)

## Forward Proxy – What Your Company Uses to Block Facebook
* **Summary**: Forward proxies live on the client network (corporate Wi-Fi, school, ISP, home router). They inspect outgoing traffic and enforce rules before requests ever leave the network.
* **Real-world examples**:
  - You can reach google.com → success
  - You try chatgpt.com → blocked with “access denied”
  - Same thing happens at airports, schools, or even your ISP blocking “bad” sites
* **Extra power**: VPNs are just encrypted forward proxies that tunnel everything.
* **Ask AI**: [Ask AI: Forward Proxy](https://alisol.ir/?ai=Forward%20Proxy%7CAbhishek.Veeramalla%7CYou%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this)

## Popular Forward Proxy Tools
* **Summary**: You have plenty of options depending on scale:
  - Squid → enterprise favorite (what we use in the demo)
  - TinyProxy → lightweight for home labs
  - HAProxy / NGINX → can also act as forward proxies
* **Ask AI**: [Ask AI: Squid Forward Proxy](https://alisol.ir/?ai=Squid%20Forward%20Proxy%7CAbhishek.Veeramalla%7CYou%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this)

## Reverse Proxy – The Shield in Front of Your App
* **Summary**: Reverse proxies sit on the server side and receive incoming traffic first. Clients never talk directly to your application — they talk to the reverse proxy.
* **Superpowers you get for free**:
  - Rate limiting (stop DoS attacks)
  - SSL termination / offloading
  - Web Application Firewall (WAF)
  - Load balancing across multiple backend servers
  - Request validation before hitting your code
* **Ask AI**: [Ask AI: Reverse Proxy](https://alisol.ir/?ai=Reverse%20Proxy%7CAbhishek.Veeramalla%7CYou%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this)

## Forward vs Reverse – One Table to Rule Them All

| Feature                  | Forward Proxy                          | Reverse Proxy                          |
|--------------------------|----------------------------------------|----------------------------------------|
| Location                 | Client-side (your network)             | Server-side (your VM/cluster)          |
| Protects                 | The client/users                       | The server/application                 |
| Who configures it        | Network admin / DevOps on client side  | DevOps on server side                  |
| Typical tools            | Squid, TinyProxy, VPNs                 | NGINX, HAProxy, Traefik, Envoy         |
| Common use cases         | Block social media, content filtering, anonymity | Rate limiting, SSL, LB, WAF, caching |
| Client knows about it?   | Yes (browser or system proxy settings) | No (client thinks it’s talking to the real server) |

* **Ask AI**: [Ask AI: Forward vs Reverse Proxy Differences](https://alisol.ir/?ai=Forward%20vs%20Reverse%20Proxy%20Differences%7CAbhishek.Veeramalla%7CYou%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this)

## Yes, They Coexist – This Happens Every Day
* **Summary**: When you browse amazon.com from your office laptop:
  1. Request → corporate forward proxy (checks rules)
  2. Forward proxy → internet → Amazon’s reverse proxy
  3. Reverse proxy → actual backend servers
* **Key Takeaway**: Almost every big site you visit uses both.
* **Ask AI**: [Ask AI: Forward and Reverse Proxy Together](https://alisol.ir/?ai=Forward%20and%20Reverse%20Proxy%20Together%7CAbhishek.Veeramalla%7CYou%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this)

## Hands-On: Forward Proxy with Squid (Block Facebook in 5 min)
* **Summary**: Spin up an Ubuntu EC2, install Squid, write a tiny config, block whatever you want.
* **Minimal squid.conf that works**:
```conf
http_port 8080

# Safe ports
acl Safe_ports port 80      # http
acl Safe_ports port 21      # ftp
acl Safe_ports port 443     # https
acl Safe_ports port 22      # ssh (if you want)

# Deny everything else
http_access deny !Safe_ports

# Blocked sites
acl blocked_domains dstdomain facebook.com twitter.com instagram.com
http_access deny blocked_domains

# Allow everything else
http_access allow all
```
* **Test commands**:
```bash
curl -x http://localhost:8080 https://google.com      # works
curl -x http://localhost:8080 https://facebook.com   # BLOCKED ✓
```
* **Ask AI**: [Ask AI: Squid Configuration](https://alisol.ir/?ai=Squid%20Configuration%7CAbhishek.Veeramalla%7CYou%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this)

## Hands-On: Reverse Proxy with NGINX + Flask Backend
* **Summary**: One EC2 instance, Flask app on port 5000, NGINX in front on port 80.
* **app.py (super simple)**:
```python
from flask import Flask, jsonify
app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({"message": "Hello from backend server. This is actual server handling the request."})
```
* **Run as background service (Gunicorn)**:
```ini
# /etc/systemd/system/backend.service
[Unit]
Description=Gunicorn instance
After=network.target

[Service]
WorkingDirectory=/home/ubuntu/backend
ExecStart=/home/ubuntu/backend/venv/bin/gunicorn --bind 127.0.0.1:5000 app:app

[Install]
WantedBy=multi-user.target
```
* **NGINX site config**:
```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
* **Test**:
```bash
curl localhost/   # → You get the JSON from Flask, but you hit NGINX!
```
* **Ask AI**: [Ask AI: NGINX Reverse Proxy Setup](https://alisol.ir/?ai=NGINX%20Reverse%20Proxy%20Setup%7CAbhishek.Veeramalla%7CYou%20will%20never%20forget%20Forward%20vs%20Reverse%20proxy%20after%20this)

## Never Forget Again
Forward proxy = client-side traffic cop  
Reverse proxy = server-side bouncer  

That’s it. One protects users, the other protects your app. Both are everywhere.

The GitHub repo mentioned in the video has the exact files and steps — grab it from the video description and try both demos yourself.

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
