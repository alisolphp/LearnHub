# Network Delay Time - Dijkstra's algorithm - Leetcode 743

* **Platform**: YouTube
* **Channel/Creator**: NeetCode
* **Duration**: 00:19:49
* **Release Date**: Apr 29, 2021
* **Video Link**: [https://www.youtube.com/watch?v=EaphyqKU4PQ](https://www.youtube.com/watch?v=EaphyqKU4PQ)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b47981dc -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer) 

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743)
<!-- LH-BUTTONS:END -->

## Problem Introduction
* **Summary**: The problem involves a network of n nodes with directed edges representing travel times. Starting from node k, calculate the maximum time for a signal to reach all nodes; return -1 if impossible.
* **Key Takeaway/Example**: Nodes are labeled 1 to n, edges are triples [source, target, weight], where weight is the time to traverse the edge. It's a shortest path problem using Dijkstra's algorithm.
* **Link for More Details**: [Ask AI: Network Delay Time Problem](https://alisol.ir/?ai=Network%20Delay%20Time%20Problem|NeetCode|Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743)

## Example Walkthrough
* **Summary**: Using the sample graph, start at node 2. Signal reaches node 1 and 3 in 1 unit each, then node 4 from 3 in total 2 units. The max time is 2.
* **Key Takeaway/Example**: If a node is unreachable, return -1. The algorithm ensures we find the time for the last node to receive the signal.
* **Link for More Details**: [Ask AI: Network Delay Example](https://alisol.ir/?ai=Network%20Delay%20Example|NeetCode|Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743)

## Dijkstra's Algorithm Overview
* **Summary**: Dijkstra's finds the shortest path from a source in a weighted graph. It uses a priority queue (min-heap) to always expand the shortest path first, similar to BFS but with weights.
* **Key Takeaway/Example**: Initialize heap with [0, source]. Pop the min distance node, update neighbors' distances if shorter, and add to heap. Track visited nodes to avoid cycles.
* **Link for More Details**: [Ask AI: Dijkstra's Algorithm](https://alisol.ir/?ai=Dijkstra's%20Algorithm|NeetCode|Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743)

## Algorithm Steps with Example
* **Summary**: Start with source in heap at distance 0. While heap is not empty, pop min distance node, mark visited, update max time. For unvisited neighbors, push updated total distance to heap.
* **Key Takeaway/Example**: In the example graph, paths are relaxed if a shorter route is found, like reaching node 2 via a longer path but updating to shorter 3 units.
* **Link for More Details**: [Ask AI: Dijkstra's Steps](https://alisol.ir/?ai=Dijkstra's%20Steps|NeetCode|Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743)

## Time Complexity Analysis
* **Summary**: With E edges and V vertices, worst-case heap size is V^2, but operations are O(E log V) due to heap pushes/pops.
* **Key Takeaway/Example**: Max edges are roughly V^2, but the log factor comes from heap operations per edge.
* **Link for More Details**: [Ask AI: Dijkstra's Time Complexity](https://alisol.ir/?ai=Dijkstra's%20Time%20Complexity|NeetCode|Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743)

## Code Implementation
* **Summary**: Build adjacency list from edges. Use heapq for min-heap, track visited set and max time. Loop pops from heap, updates max time, pushes unvisited neighbors with cumulative weight.
* **Key Takeaway/Example**: After loop, if visited count equals n, return max time; else -1.
```python
import heapq
from collections import defaultdict

def networkDelayTime(times, n, k):
    edges = defaultdict(list)
    for u, v, w in times:
        edges[u].append((v, w))
    
    min_heap = [(0, k)]
    visit = set()
    t = 0
    
    while min_heap:
        w1, n1 = heapq.heappop(min_heap)
        if n1 in visit:
            continue
        visit.add(n1)
        t = max(t, w1)
        
        for n2, w2 in edges[n1]:
            if n2 not in visit:
                heapq.heappush(min_heap, (w1 + w2, n2))
    
    return t if len(visit) == n else -1
```
* **Link for More Details**: [Ask AI: Dijkstra's Code](https://alisol.ir/?ai=Dijkstra's%20Code|NeetCode|Network%20Delay%20Time%20-%20Dijkstra's%20algorithm%20-%20Leetcode%20743)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
