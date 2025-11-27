# MinIO + HAProxy: My S3-Compatible Storage Solution

* **Platform**: YouTube
* **Channel/Creator**: DJ Ware
* **Duration**: 00:30:30
* **Release Date**: Feb 11, 2025
* **Video Link**: [https://www.youtube.com/watch?v=w8AOKTLWPpw](https://www.youtube.com/watch?v=w8AOKTLWPpw)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## Introduction and Use Case
**Summary**: DJ Ware shares lessons learned from setting up MinIO with HAProxy for an S3-compatible storage solution, focusing on pitfalls encountered during the process. The setup is for handling unstructured data like video files, clips, audio, images, PDFs, and documents during video production, providing a redundant work area that's accessible from multiple devices without strict organization.
**Key Takeaway/Example**: MinIO serves as a transient storage for work-in-progress files, offering redundancy to prevent data loss if issues arise.
[Ask AI: MinIO Use Case for Video Production](https://alisol.ir/?ai=MinIO%20Use%20Case%20for%20Video%20Production%7CDJ%20Ware%7CMinIO%20%2B%20HAProxy%3A%20My%20S3-Compatible%20Storage%20Solution)

## MinIO Features
**Summary**: MinIO supports data replication across regions, ingesting from various sources like logs or sensor data, and storing unstructured data in buckets. It ensures atomic uploads, meaning files are fully stored or not at all, avoiding partial failures. Tags enable organization and powerful searching without a separate metadata server, storing metadata with the data itself.
**Key Takeaway/Example**: Use tags to group files for projects, allowing quick selection for video assembly, similar to modern file organization beyond folders.
[Ask AI: MinIO Features and Tags](https://alisol.ir/?ai=MinIO%20Features%20and%20Tags%7CDJ%20Ware%7CMinIO%20%2B%20HAProxy%3A%20My%20S3-Compatible%20Storage%20Solution)

## Architecture Overview
**Summary**: The setup uses a VM-first approach with HAProxy as a load balancer for round-robin distribution across three MinIO servers. Each MinIO server runs on XFS filesystems mounted under /srv/minio, with API on port 9000 and console on 9001. This provides failover and redundancy, but it's not for permanent storage—final videos move to ZFS.
**Key Takeaway/Example**: HAProxy cycles requests between servers (1-2-3-1), ensuring continuity if one fails.
[Ask AI: MinIO Architecture with HAProxy](https://alisol.ir/?ai=MinIO%20Architecture%20with%20HAProxy%7CDJ%20Ware%7CMinIO%20%2B%20HAProxy%3A%20My%20S3-Compatible%20Storage%20Solution)

## Choices and Reasons
**Summary**: HAProxy was selected over Apache (too heavy and slow) and Nginx (high CVE count) for its simplicity, speed, and low vulnerabilities. Alpine Linux for HAProxy due to lightweight, secure nature and speed; Debian for MinIO servers for stability and infrequent updates. VMs allow snapshots and easy recovery without hardware reinstalls.
**Key Takeaway/Example**: Use different OS variants between DMZ and internal network to increase attacker difficulty—Alpine's speed suits proxy needs without systemd overhead.
[Ask AI: Choosing OS and Load Balancer for MinIO](https://alisol.ir/?ai=Choosing%20OS%20and%20Load%20Balancer%20for%20MinIO%7CDJ%20Ware%7CMinIO%20%2B%20HAProxy%3A%20My%20S3-Compatible%20Storage%20Solution)

## Setup Process and Lessons Learned
**Summary**: Start with VM/hardware setup, OS configuration, and hardening. Install MinIO servers first, ensuring XFS mounts survive reboots and using UUIDs to handle device randomization. Set up TLS certs in /etc/minio/certs, create a minio-user, and configure console address to 0.0.0.0:9001 to avoid localhost binding issues. For HAProxy on Alpine, use APK to install, create PEM files for certs, and configure rsyslog differently.
**Key Takeaway/Example**: In /etc/default/minio, set MINIO_OPTS with --console-address "0.0.0.0:9001" to prevent TLS errors from localhost resolution.
[Ask AI: MinIO Setup and Configuration](https://alisol.ir/?ai=MinIO%20Setup%20and%20Configuration%7CDJ%20Ware%7CMinIO%20%2B%20HAProxy%3A%20My%20S3-Compatible%20Storage%20Solution)

## Verification and Tools
**Summary**: Verify MinIO by starting services via systemd, checking logs, logging into the console to confirm TLS, and testing bucket creation/upload/delete. Install MC CLI tool for administration, creating aliases for easy access. After HAProxy install, watch logs for errors, use curl to validate routing and TLS handshakes, and test across browsers like Firefox (strictest).
**Key Takeaway/Example**: Use MC to mirror web console actions: mc alias set myminio https://minio.example.com accesskey secretkey, then mc mb myminio/testbucket.
[Ask AI: Verifying MinIO and HAProxy](https://alisol.ir/?ai=Verifying%20MinIO%20and%20HAProxy%7CDJ%20Ware%7CMinIO%20%2B%20HAProxy%3A%20My%20S3-Compatible%20Storage%20Solution)

## Migration and Additional Considerations
**Summary**: Plan hardware migration carefully, reading MinIO docs for hints. Backup VMs at milestones and verify readability. MinIO filesystems can mount via FUSE (not recommended), or use MC for transfers. Share buckets publicly like Dropbox for easy access without logins, keeping data private within the network.
**Key Takeaway/Example**: For migration, snapshot VMs and test recovery to avoid surprises; automate file movements with MC scripts.
[Ask AI: MinIO Migration and Mounting](https://alisol.ir/?ai=MinIO%20Migration%20and%20Mounting%7CDJ%20Ware%7CMinIO%20%2B%20HAProxy%3A%20My%20S3-Compatible%20Storage%20Solution)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
