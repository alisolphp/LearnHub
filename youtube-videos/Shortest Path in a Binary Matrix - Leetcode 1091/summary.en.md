# Shortest Path in a Binary Matrix - Leetcode 1091

* **Platform**: YouTube
* **Channel/Creator**: NeetCodeIO
* **Duration**: 00:12:34
* **Release Date**: Feb 1, 2023
* **Video Link**: [https://www.youtube.com/watch?v=YnxUdAO7TAo](https://www.youtube.com/watch?v=YnxUdAO7TAo)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091)
<!-- LH-BUTTONS:END -->

## Problem Overview
* **Summary**: The problem involves finding the shortest path in an N x N binary matrix from the top-left (0,0) to the bottom-right (N-1, N-1). Cells with 1 are obstacles, and you can only move through 0s. Movement is allowed in eight directions, including diagonals. The path length counts the number of cells visited, and return -1 if no path exists.
* **Key Takeaway/Example**: For a 1x1 grid with [0], the path length is 1 since you're already at the start and end. In larger grids, treat 1s as blocks and find the minimal steps.
* **Link for More Details**: [Ask AI: Problem Overview](https://alisol.ir/?ai=Problem%20Overview|NeetCodeIO|Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091)

## Understanding the Path and Movement
* **Summary**: The path must avoid obstacles (1s) and can move horizontally, vertically, or diagonally. The length is the count of visited cells, not Manhattan distance. Examples show how diagonal moves count as one step, and BFS is ideal since edges have no weights.
* **Key Takeaway/Example**: In a grid with obstacles, visualize layers from the start: first layer (adjacent cells), second layer, etc., until reaching the end. If blocked, return -1.
* **Link for More Details**: [Ask AI: Understanding the Path and Movement](https://alisol.ir/?ai=Understanding%20the%20Path%20and%20Movement|NeetCodeIO|Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091)

## BFS Approach and Time Complexity
* **Summary**: Use BFS to explore the grid level by level for the shortest path. Time complexity is O(N^2) since you visit each cell at most once, with a queue that can hold up to O(N^2) elements in the worst case.
* **Key Takeaway/Example**: BFS works well here because all moves cost the same (1 step), unlike weighted graphs needing Dijkstra's.
* **Link for More Details**: [Ask AI: BFS Approach and Time Complexity](https://alisol.ir/?ai=BFS%20Approach%20and%20Time%20Complexity|NeetCodeIO|Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091)

## Implementing BFS in Code
* **Summary**: Initialize a queue with the starting position (0,0) and length 1, plus a visited set. While the queue isn't empty, dequeue the current row, column, and length. Check if it's the destination; if yes, return the length.
* **Key Takeaway/Example**: Skip invalid positions (out of bounds, obstacles, or visited). Use a directions list for eight possible moves.
```python
from collections import deque

def shortestPathBinaryMatrix(grid):
    if not grid or grid[0][0] == 1:
        return -1
    n = len(grid)
    q = deque([(0, 0, 1)])  # row, col, length
    visit = set([(0, 0)])
    directions = [(0,1), (1,0), (0,-1), (-1,0), (1,1), (1,-1), (-1,1), (-1,-1)]
    
    while q:
        r, c, length = q.popleft()
        if r == n-1 and c == n-1:
            return length
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if (min(nr, nc) < 0 or max(nr, nc) >= n or
                (nr, nc) in visit or grid[nr][nc] == 1):
                continue
            q.append((nr, nc, length + 1))
            visit.add((nr, nc))
    return -1
```
* **Link for More Details**: [Ask AI: Implementing BFS in Code](https://alisol.ir/?ai=Implementing%20BFS%20in%20Code|NeetCodeIO|Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091)

## Handling Visits and Neighbors
* **Summary**: Mark cells as visited when adding to the queue to avoid duplicates. Check bounds with min(row, col) < 0 or max(row, col) >= N. Only enqueue valid, unvisited, non-obstacle neighbors.
* **Key Takeaway/Example**: This ensures each cell is processed once, preventing infinite loops. For example, add neighbors only if they pass all checks, incrementing length by 1.
* **Link for More Details**: [Ask AI: Handling Visits and Neighbors](https://alisol.ir/?ai=Handling%20Visits%20and%20Neighbors|NeetCodeIO|Shortest%20Path%20in%20a%20Binary%20Matrix%20-%20Leetcode%201091)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
