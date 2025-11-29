# Getting Started with Kibana (tutorial)

* **Platform**: YouTube
* **Channel/Creator**: Coding Explained
* **Duration**: 00:44:26
* **Release Date**: May 24, 2021
* **Video Link**: [https://www.youtube.com/watch?v=DVgKDPf7hOU](https://www.youtube.com/watch?v=DVgKDPf7hOU)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=47fdb3b8 -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Getting%20Started%20with%20Kibana%20(tutorial)) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Getting%20Started%20with%20Kibana%20(tutorial)) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Getting%20Started%20with%20Kibana%20(tutorial)) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Getting%20Started%20with%20Kibana%20(tutorial)) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Getting%20Started%20with%20Kibana%20(tutorial)) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Getting%20Started%20with%20Kibana%20(tutorial)) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Getting%20Started%20with%20Kibana%20(tutorial)) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Getting%20Started%20with%20Kibana%20(tutorial)) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Getting%20Started%20with%20Kibana%20(tutorial)) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Getting%20Started%20with%20Kibana%20(tutorial)) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Getting%20Started%20with%20Kibana%20(tutorial)) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Getting%20Started%20with%20Kibana%20(tutorial))

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Getting%20Started%20with%20Kibana%20(tutorial)) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Getting%20Started%20with%20Kibana%20(tutorial)) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Getting%20Started%20with%20Kibana%20(tutorial))
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Getting%20Started%20with%20Kibana%20(tutorial))
<!-- LH-BUTTONS:END -->

## What is Kibana?
Kibana serves as a user interface for visualizing and analyzing data from Elasticsearch. It runs in a browser with its own built-in web server, communicating directly with an Elasticsearch cluster to fetch data. All Kibana data gets stored in Elasticsearch indices, simplifying management since no separate database is needed—if the Kibana server fails, data persists in the cluster.
* **Key Takeaway/Example**: This setup ensures easy recovery; spin up a new Kibana instance, and you're back in action without losing configurations or data.
* **Link for More Details**: [Ask AI: What is Kibana](https://alisol.ir/?ai=What%20is%20Kibana%7CCoding%20Explained%7CGetting%20Started%20with%20Kibana%20%28tutorial%29)

## Capabilities of Kibana
Kibana lets you create various visualizations like pie charts, bar charts, maps, heat maps, gauges, and tag clouds, powered by Elasticsearch aggregations. These can be combined into interactive dashboards for overviews, such as server hardware utilization or application metrics. You can set up users with roles and spaces to control access—for example, separate spaces for sales and sysadmin teams. Sharing options include exporting dashboards as PDFs, PNGs for presentations, or embedding links. Alerting notifies you via email, Slack, or webhooks when conditions like high CPU usage or error spikes occur.
* **Key Takeaway/Example**: Dashboards aren't static; users can slice data dynamically, and alerts check conditions at set intervals based on index data.
* **Link for More Details**: [Ask AI: Capabilities of Kibana](https://alisol.ir/?ai=Capabilities%20of%20Kibana%7CCoding%20Explained%7CGetting%20Started%20with%20Kibana%20%28tutorial%29)

## Setting Up Kibana and Elasticsearch
To use Kibana, pair it with an Elasticsearch cluster. Options include local installation or Elastic Cloud. Elastic Cloud is recommended for ease—no dealing with Java versions or env vars—plus it includes all licensed features and auto-configures security. Local setup requires downloading Kibana and following install instructions. A 14-day free trial for Elastic Cloud needs no credit card.
* **Key Takeaway/Example**: For local, access Kibana at localhost:5601; for cloud, use the deployment link.
* **Link for More Details**: [Ask AI: Setting Up Kibana and Elasticsearch](https://alisol.ir/?ai=Setting%20Up%20Kibana%20and%20Elasticsearch%7CCoding%20Explained%7CGetting%20Started%20with%20Kibana%20%28tutorial%29)

## Importing Sample Data
Use a prepared file of random NGINX access logs formatted for Elasticsearch's Bulk API. Import via curl with a POST request specifying NDJSON content type, auth if using cloud, and the Bulk endpoint. No need for index name in the URL since it's in the file. Elasticsearch handles dynamic mapping automatically.
* **Key Takeaway/Example**: Run a curl command like this (adjust for your setup):
```bash
curl -H "Content-Type: application/x-ndjson" -XPOST -u username:password https://your-es-endpoint/_bulk --data-binary "@nginx_logs.json"
```
This ingests data and creates the index.
* **Link for More Details**: [Ask AI: Importing Sample Data](https://alisol.ir/?ai=Importing%20Sample%20Data%7CCoding%20Explained%7CGetting%20Started%20with%20Kibana%20%28tutorial%29)

## Creating an Index Pattern
Index patterns define which Elasticsearch indices Kibana queries, supporting wildcards for multiple indices like time-series data. Create one in Stack Management > Index Patterns, enter a pattern (e.g., logs-*), and select a timestamp field for time filtering. This enables Kibana to treat multiple indices as one.
* **Key Takeaway/Example**: For time-based logs split by month (e.g., logs-2021-01, logs-2021-02), use "logs-*" to query them seamlessly.
* **Link for More Details**: [Ask AI: Creating an Index Pattern](https://alisol.ir/?ai=Creating%20an%20Index%20Pattern%7CCoding%20Explained%7CGetting%20Started%20with%20Kibana%20%28tutorial%29)

## Using Console in Dev Tools
Console is a dev tool for sending queries to Elasticsearch with auto-completion, JSON formatting, and easier syntax than curl. Write HTTP verb and path (e.g., GET /_cluster/health), add body if needed, and run. Useful for ad-hoc queries or testing before coding.
* **Key Takeaway/Example**: Query example:
```json
GET /_cluster/health
```
Or a search:
```json
GET /index-name/_search
{
  "query": { "match_all": {} }
}
```
* **Link for More Details**: [Ask AI: Using Console in Dev Tools](https://alisol.ir/?ai=Using%20Console%20in%20Dev%20Tools%7CCoding%20Explained%7CGetting%20Started%20with%20Kibana%20%28tutorial%29)

## Exploring Data with Discover App
Discover lets you explore data interactively. Adjust time filters, use KQL for queries (e.g., country: "Germany"), add filters (e.g., OS: "Windows"), and view histograms of counts over time. Drill down by dragging on charts, expand documents for table/JSON views, and see top field values.
* **Key Takeaway/Example**: To investigate 404 errors, filter by status:404 and narrow further—great for quick data slicing.
* **Link for More Details**: [Ask AI: Exploring Data with Discover App](https://alisol.ir/?ai=Exploring%20Data%20with%20Discover%20App%7CCoding%20Explained%7CGetting%20Started%20with%20Kibana%20%28tutorial%29)

## Creating Visualizations
Build visualizations using aggregations. For a pie chart: Choose index pattern, add metric (e.g., sum of bytes), bucket (e.g., terms on country for top 5). For area chart: Use date histogram on timestamp for x-axis, terms on country for split series. Customize appearance like donut toggle.
* **Key Takeaway/Example**: Pie shows top countries by bytes; area plots requests over time per country—switch buckets for better results.
* **Link for More Details**: [Ask AI: Creating Visualizations](https://alisol.ir/?ai=Creating%20Visualizations%7CCoding%20Explained%7CGetting%20Started%20with%20Kibana%20%28tutorial%29)

## Building Dashboards
Dashboards collect panels (usually visualizations) for overviews. Add from library or create new, resize panels, edit titles, inspect requests. Interactive: Click slices to auto-filter, drag charts to update time. Save with or without locking time range.
* **Key Takeaway/Example**: Place pie and area charts on one dashboard for country-based insights—click a country to filter everything.
* **Link for More Details**: [Ask AI: Building Dashboards](https://alisol.ir/?ai=Building%20Dashboards%7CCoding%20Explained%7CGetting%20Started%20with%20Kibana%20%28tutorial%29)

## Additional Features
Canvas offers advanced, customizable presentations with CSS and images. Lens simplifies visualization via drag-and-drop with smart suggestions. Machine Learning detects anomalies, forecasts values. Observability covers logs, metrics, APM for app/infra insights. Monitor Elastic Stack health; manage pipelines, indices. Security handles users/roles/spaces; alerts trigger on conditions.
* **Key Takeaway/Example**: Use ML for request anomaly detection or forecasting traffic to scale resources.
* **Link for More Details**: [Ask AI: Additional Features](https://alisol.ir/?ai=Additional%20Features%7CCoding%20Explained%7CGetting%20Started%20with%20Kibana%20%28tutorial%29)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
