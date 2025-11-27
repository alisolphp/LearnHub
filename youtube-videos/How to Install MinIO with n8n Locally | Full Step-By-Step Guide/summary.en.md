# How to Install MinIO with n8n Locally | Full Step-By-Step Guide

* **Platform**: YouTube
* **Channel/Creator**: Dorian Oslov | AI 
* **Duration**: 00:19:59
* **Release Date**: Jun 14, 2025
* **Video Link**: [https://www.youtube.com/watch?v=7wiRqbeZ71Q](https://www.youtube.com/watch?v=7wiRqbeZ71Q)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## Introduction to MinIO and Why Use an Object Store
MinIO serves as a local object store for handling files, especially large ones, in your automation workflows. It's ideal for storing data that you might otherwise keep in workflow editors, which have limitations. Unlike services like Google Drive or Dropbox, MinIO provides direct download links, making it easier to integrate with tools like n8n or NC Toolkit that require straightforward GET requests for file access.
Key takeaway: Services like Google Drive generate session-based or short-lived links, requiring extra steps (like creating shared links via API) to make files downloadable. MinIO avoids this by offering public buckets or API token access for seamless integration—perfect for AWS S3 alternatives or other cloud object stores.
[Ask AI: MinIO Object Store Basics](https://alisol.ir/?ai=MinIO%20Object%20Store%20Basics%7CDorian%20Oslov%20%7C%20AI%7CHow%20to%20Install%20MinIO%20with%20n8n%20Locally%20%7C%20Full%20Step-By-Step%20Guide)

## Installing MinIO Locally with Docker
To set up MinIO, use Docker to run a specific version for full functionality under the AGPL3 license. Avoid the "latest" tag, as it might pull a community edition lacking key features like access keys. The Docker command maps ports (9000 for API, 9001 for console), sets environment variables for admin credentials, and specifies a storage volume.
Key example: Run this command in your Docker terminal (adjust paths and names as needed):
```bash
docker run -p 9000:9000 -p 9001:9001 --name minio-demo -v C:/minio-demo:/data -e "MINIO_ROOT_USER=admin" -e "MINIO_ROOT_PASSWORD=password123" quay.io/minio/minio:RELEASE.2023-09-30T07-02-30Z server /data --console-address ":9001"
```
Once running, access the UI at http://localhost:9001, log in with your credentials, and verify the setup.
[Ask AI: MinIO Docker Installation](https://alisol.ir/?ai=MinIO%20Docker%20Installation%7CDorian%20Oslov%20%7C%20AI%7CHow%20to%20Install%20MinIO%20with%20n8n%20Locally%20%7C%20Full%20Step-By-Step%20Guide)

## Connecting MinIO to n8n
In n8n, use the S3 node to interact with MinIO. Create credentials with the endpoint http://host.docker.internal:9000, access key, and secret key generated from the MinIO console. Enable "Force Path Style" in credentials to handle bucket naming correctly. Test by creating a bucket—successful connections avoid hostname errors.
Key takeaway: The endpoint uses host.docker.internal because n8n runs in its own Docker container, needing to reach the host machine's ports. Without this, localhost:9000 would fail as it refers to the container's internal loopback.
[Ask AI: Connecting MinIO to n8n](https://alisol.ir/?ai=Connecting%20MinIO%20to%20n8n%7CDorian%20Oslov%20%7C%20AI%7CHow%20to%20Install%20MinIO%20with%20n8n%20Locally%20%7C%20Full%20Step-By-Step%20Guide)

## Common Issues and Docker Networking Explained
Port mapping in Docker exposes MinIO's internal ports to the host: 9000 for API calls and 9001 for the web UI. Errors often stem from using localhost inside containers, which doesn't reach the host. Use host.docker.internal to bridge from container to host. Also, verify the AGPL3 license in logs to ensure full features.
Key example: In Postman, a GET to http://localhost:9000 returns a 403 if no keys are provided, confirming the API is active. For n8n-MinIO communication, this setup ensures the API is accessible from outside the container.
[Ask AI: Docker Networking for MinIO](https://alisol.ir/?ai=Docker%20Networking%20for%20MinIO%7CDorian%20Oslov%20%7C%20AI%7CHow%20to%20Install%20MinIO%20with%20n8n%20Locally%20%7C%20Full%20Step-By-Step%20Guide)

## Working with Buckets, Folders, and File Uploads in n8n
Use n8n's S3 node for operations like creating buckets, uploading files, and making folders (by uploading empty objects with trailing slashes). For uploads, ensure binary data is present in the input. A template workflow can handle creating buckets, folders, and uploading files from sources like Google Drive.
Key example: To create a folder "videos/" in bucket "g-drive-demo", upload an empty file to "g-drive-demo/videos/". For file upload:
- Bucket: g-drive-demo
- Path: videos/video.mp4
- Data: Binary input from previous node (e.g., downloaded file).
[Ask AI: n8n S3 Node Operations](https://alisol.ir/?ai=n8n%20S3%20Node%20Operations%7CDorian%20Oslov%20%7C%20AI%7CHow%20to%20Install%20MinIO%20with%20n8n%20Locally%20%7C%20Full%20Step-By-Step%20Guide)

## Handling Binary Data in n8n Workflows
n8n handles binary data oddly—it's only directly available in the immediate next node. To use it in subsequent nodes, employ a Merge node set to "Choose Branch" to route the binary stream. This workaround merges data streams, allowing uploads even after intermediate steps.
Key takeaway: If a node complains about missing binary data, insert a Merge node: connect the binary source to one input, select the branch with data, and proceed to upload. This fixes issues where data seems lost in the workflow chain.
[Ask AI: Binary Data in n8n](https://alisol.ir/?ai=Binary%20Data%20in%20n8n%7CDorian%20Oslov%20%7C%20AI%7CHow%20to%20Install%20MinIO%20with%20n8n%20Locally%20%7C%20Full%20Step-By-Step%20Guide)

## Copying and Moving Files Between Buckets
To copy files, use the S3 node's Copy Object operation, specifying source and destination paths (include leading slashes for folders). For moving (cut), copy first, then delete the original. This keeps files in direct-link format across buckets.
Key example: Copy from "binary-fixer/video.mp4" to "g-drive-demo/videos/video.mp4". Response includes ETag for verification. Both locations retain the file post-copy; delete source for a move.
[Ask AI: File Copy in MinIO with n8n](https://alisol.ir/?ai=File%20Copy%20in%20MinIO%20with%20n8n%7CDorian%20Oslov%20%7C%20AI%7CHow%20to%20Install%20MinIO%20with%20n8n%20Locally%20%7C%20Full%20Step-By-Step%20Guide)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
