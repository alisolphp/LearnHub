# Shortest Path with Alternating Colors - Leetcode 1129

* **Platform**: YouTube
* **Channel/Creator**: NeetCodeIO
* **Duration**: 00:13:44
* **Release Date**: Feb 10, 2023
* **Video Link**: [https://www.youtube.com/watch?v=69rcy6lb-HQ](https://www.youtube.com/watch?v=69rcy6lb-HQ)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Shortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Shortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Shortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Shortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Shortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Shortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Shortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Shortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Shortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Shortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Shortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Shortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Shortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Shortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/Shortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Shortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Shortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129)
<!-- LH-BUTTONS:END -->

## Problem Description
Rust handles memory safety by... wait, no—this is about a graph problem. Nodes are numbered from 0 to n-1 in a directed graph with edges colored red or blue. Start at node 0 and find the shortest path to every other node where edge colors alternate. Return an array with these lengths; use -1 if no such path exists.

Key takeaway: Paths must alternate colors, like blue-red-blue or red-blue-red, and we're dealing with directed edges.

[Ask AI: Problem Description](https://alisol.ir/?ai=Problem%20Description%7CNeetCodeIO%7CShortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129)

## Example Walkthrough
In a simple graph with nodes 0, 1, 2, and edges like 0->1 (blue) and 1->2 (red), the path 0-1-2 alternates colors, so lengths are [0, 1, 2]. If 1->2 is blue instead, it doesn't alternate, so [0, 1, -1]. If edges don't alternate, return -1 for unreachable nodes under the rule.

Key example: Adding more edges shows how alternating enforces the constraint, and single-edge paths always qualify since no prior color.

[Ask AI: Example Walkthrough](https://alisol.ir/?ai=Example%20Walkthrough%7CNeetCodeIO%7CShortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129)

## Approach: BFS with Color Tracking
Use BFS starting from node 0. Track the previous edge color to ensure alternation. Visit each node potentially twice—once via red incoming edge, once via blue—to explore all possibilities. Use a visited set for (node, color) pairs to avoid cycles while allowing multiple paths.

Key takeaway: By handling both starting colors (red or blue from 0) simultaneously in one BFS, you cover all alternating paths. First visit to a node sets the shortest length.

[Ask AI: BFS Approach](https://alisol.ir/?ai=BFS%20Approach%7CNeetCodeIO%7CShortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129)

## Building the Graph
Convert red_edges and blue_edges lists into adjacency maps: one for red, one for blue. For each edge [src, dest], append dest to src's list in the corresponding color map.

Key code snippet:
```python
red = defaultdict(list)
blue = defaultdict(list)
for src, dest in red_edges:
    red[src].append(dest)
for src, dest in blue_edges:
    blue[src].append(dest)
```

[Ask AI: Building the Graph](https://alisol.ir/?ai=Building%20the%20Graph%7CNeetCodeIO%7CShortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129)

## Initializing BFS Components
Initialize answer array with -1s. Queue starts with [0, 0, None] (node, length, prev_color). Visited set adds (0, None). This allows exploring both red and blue from start without restriction.

Key takeaway: None for initial color lets you branch into both colors.

[Ask AI: BFS Initialization](https://alisol.ir/?ai=BFS%20Initialization%7CNeetCodeIO%7CShortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129)

## BFS Execution
While queue not empty, dequeue node, length, prev_color. If answer[node] == -1, set it to length. Then, if prev_color != 'red', enqueue blue neighbors with 'blue' color and length+1, if not visited. If prev_color != 'blue', do the same for red neighbors.

Key code snippet:
```python
while queue:
    node, length, edge_color = queue.popleft()
    if answer[node] == -1:
        answer[node] = length
    if edge_color != "red":
        for nei in blue[node]:
            if (nei, "blue") not in visit:
                visit.add((nei, "blue"))
                queue.append([nei, length + 1, "blue"])
    if edge_color != "blue":
        for nei in red[node]:
            if (nei, "red") not in visit:
                visit.add((nei, "red"))
                queue.append([nei, length + 1, "red"])
```

[Ask AI: BFS Execution](https://alisol.ir/?ai=BFS%20Execution%7CNeetCodeIO%7CShortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129)

## Time and Space Complexity
Time is O(n + e) since BFS visits each node and edge, effectively twice per color but still linear. Space is O(n) for visited set and queue.

Key takeaway: Multiplying by constant (like 2 for colors) doesn't change Big O.

[Ask AI: Complexity Analysis](https://alisol.ir/?ai=Complexity%20Analysis%7CNeetCodeIO%7CShortest%20Path%20with%20Alternating%20Colors%20-%20Leetcode%201129)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
