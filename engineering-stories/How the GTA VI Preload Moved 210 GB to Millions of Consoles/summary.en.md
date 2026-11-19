# Engineering Stories: How the GTA VI Preload Moved 210 GB to Millions of Consoles

* **Authors**: Emile Aben (RIPE NCC) with Alun Davies and James Cowie
* **Publication Date**: 18 November 2026 (RIPE Labs article); France-IX post, November 2026; Microsoft Learn FAQ, June 2026
* **Source Link**: [https://labs.ripe.net/author/emileaben/whos-delivering-gta-6-a-ripe-atlas-measurement-story/](https://labs.ripe.net/author/emileaben/whos-delivering-gta-6-a-ripe-atlas-measurement-story/)
* **More Sources**: [France-IX: GTA VI pre-load night traffic](https://www.franceix.net/en/news/latest-news/gta-vi-pre-load-night-traffic/) and [Microsoft Connected Cache FAQ](https://learn.microsoft.com/en-us/windows/deployment/do/mcc-isp-faq)

This document summarizes three public sources about how the GTA VI pre-load reached consoles in November 2026. It is a personal summary, not official material, and not endorsed by the authors. All rights remain with the respective authors. I highly recommend reading the originals.

*A game this big was downloadable days before anyone could play it. These sources ask whose servers actually delivered it. (This opening line is my own framing, not from the sources.)*

## Before You Get Started
* I summarize key points from useful engineering posts to learn and review quickly.
* Simply click on `Ask AI` links after each section to dive deeper.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=engineering-stories/How%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=engineering-stories/How%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=engineering-stories/How%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=engineering-stories/How%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=engineering-stories/How%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=engineering-stories/How%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=engineering-stories/How%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=engineering-stories/How%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=engineering-stories/How%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=engineering-stories/How%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=engineering-stories/How%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=engineering-stories/How%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=engineering-stories/How%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=engineering-stories/How%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=engineering-stories/How%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=engineering-stories/How%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=engineering-stories/How%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles)
<!-- LH-BUTTONS:END -->

## 1. What RIPE Measured: One Address, Different Networks

**Summary**: Pre-loading began on 10 November and the release was 19 November. The RIPE NCC authors ran traceroutes from RIPE Atlas probes every four hours, starting Thursday 12 November, toward the main download addresses: gst.prod.dl.playstation.net for the PS5 and assets1.xboxlive.com for the Xbox. PS5 downloads were seen on Akamai, Fastly, Google and Amazon; Xbox downloads on Akamai, Fastly and G-Core.

**Example**: The same PlayStation download address gave different answers by location: Los Angeles ended at Fastly, Tokyo at a PlayStation-controlled name that hints at Google Cloud (gcp4.dl.playstation.net), Istanbul at an Amazon CloudFront name, and Shanghai at a name associated with Alibaba Cloud. In the authors' words: same hostname, different location, very different outcome. They saw no indication that the pools of server addresses got bigger or smaller during the pre-load. They warn the breakdown should not be taken as market share, because probes are mostly in Europe and hosted by technical users.

**Link for More Details**:
[Ask AI: One address, different networks](https://alisol.ir/?ai=RIPE%20Atlas%20measurement%20of%20the%20GTA%20VI%20pre-load%7CRIPE%20NCC%7CHow%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles)

## 2. Where the Traffic Went: Exchanges and Caches

**Summary**: RIPE saw between 10 and 30 percent of measured paths go through an internet exchange point: PS5 IPv4 11.2 percent, PS5 IPv6 21.4, Xbox IPv4 19.9 and Xbox IPv6 29. The number of caches inside internet providers' own networks was surprisingly small compared to earlier analysis. The authors offer two possible reasons and prove neither: the file may take too much disk space on a cache server, or the distributor may have decided not to depend on those caches.

**Example**: France-IX, a French internet exchange, reported that Rockstar opened the pre-load on 10 November at midnight (210 GB per console) and that it runs at night while the console is in standby. Night-time traffic across a sample of relevant CDNs rose 49 percent compared with an average night. France-IX does not look inside packets and says it infers, rather than measures, that GTA VI explains much of the jump. Its conclusion: interconnection absorbs the peak, and the consoles never notice.

**Link for More Details**:
[Ask AI: Exchange points, caches and the 49 percent jump](https://alisol.ir/?ai=Internet%20exchange%20traffic%20during%20the%20GTA%20VI%20pre-load%7CFrance-IX%7CHow%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles)

## 3. What Microsoft Says About Its Delivery

**Summary**: Microsoft's Connected Cache FAQ says Microsoft relies on a dynamic mix of first-party and third-party CDN providers for capacity, redundancy and performance. It does not provide a list of the CDN vendors it uses, because they can change without notice. The same FAQ says Microsoft Connected Cache, a cache placed inside an internet provider's network, did not support Xbox or Teams content at the time, and that supporting Xbox content was a high priority.

**Example**: This is a general FAQ, not a statement about GTA VI. It is also not a statement that any particular CDN served the pre-load: what served the downloads comes from RIPE's observations, not from Microsoft or Sony announcing it.

**Link for More Details**:
[Ask AI: Microsoft delivery mix and Connected Cache](https://alisol.ir/?ai=Microsoft%20Connected%20Cache%20and%20Xbox%20delivery%7CMicrosoft%20Learn%7CHow%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles)

## 4. Three Rules and What Is Still Unknown

**Summary**: Three rules the hosts take away: spread a huge download over time, by pre-loading at night and days before launch so the peak is not one moment; use more than one delivery network and let DNS pick per location; and measure who actually serves a file instead of guessing, because the same address can mean different servers in different places.

**Example**: Still unknown from these sources: Sony and Microsoft have not published which companies deliver the GTA VI files or in what shares; the RIPE sample is mostly European and technical; and none of the sources say whether extra capacity was bought or downloads were throttled. A question to ask yourself: if you had to ship 200 gigabytes to 10 million people on one day, would you rather have one supplier or five?

**Link for More Details**:
[Ask AI: Three rules and the unknowns](https://alisol.ir/?ai=Large%20file%20delivery%20lessons%20from%20the%20GTA%20VI%20pre-load%7CRIPE%20NCC%2C%20France-IX%20and%20Microsoft%20Learn%7CHow%20the%20GTA%20VI%20Preload%20Moved%20210%20GB%20to%20Millions%20of%20Consoles)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
* Website: [alisol.ir](https://alisol.ir)
* LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
