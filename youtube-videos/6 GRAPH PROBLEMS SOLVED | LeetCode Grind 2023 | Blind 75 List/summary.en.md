# 6 GRAPH PROBLEMS SOLVED | LeetCode Grind 2023 | Blind 75 List

* **Platform**: YouTube
* **Channel/Creator**: Code with Carter
* **Duration**: 00:46:59
* **Release Date**: Aug 29, 2023
* **Video Link**: https://www.youtube.com/watch?v=5QEitM6boaA

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=005796ea -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List)
<!-- LH-BUTTONS:END -->

## Introduction to Graph Problems in Blind 75
The video covers six graph problems from the Blind 75 LeetCode list, focusing on common patterns like DFS, graph cloning, and cycle detection. It uses Python implementations and explains time/space complexities.

**Key Takeaway**: These problems build on graph traversal techniques, emphasizing visited sets to avoid cycles and efficient exploration.

[Ask AI: Blind 75 Graph Problems](https://alisol.ir/?ai=Blind%2075%20Graph%20Problems%7CCode%20with%20Carter%7C6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List)

## Number of Islands
You're given a 2D grid where '1's are land and '0's are water. Count the number of islands (groups of connected '1's surrounded by '0's).

**Summary**: Use DFS to explore each unvisited land cell, marking visited cells to avoid revisits. Increment the island count for each new land cell found, and explore in all four directions.

**Key Takeaway/Example**: Time and space complexity is O(rows * cols) due to visiting each cell once. Here's a simplified DFS snippet:
```python
def dfs(grid, r, c, visited):
    if not (0 <= r < len(grid) and 0 <= c < len(grid[0]) and (r, c) not in visited and grid[r][c] == '1'):
        return
    visited.add((r, c))
    dfs(grid, r-1, c, visited)  # up
    dfs(grid, r+1, c, visited)  # down
    dfs(grid, r, c+1, visited)  # right
    dfs(grid, r, c-1, visited)  # left
```
Iterate through the grid and call DFS on unvisited '1's, incrementing the count.

[Ask AI: Number of Islands](https://alisol.ir/?ai=Number%20of%20Islands%7CCode%20with%20Carter%7C6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List)

## Clone Graph
Given a graph, create a deep clone with new nodes and identical connections.

**Summary**: Use DFS iteratively with a stack and a hash map to map old nodes to new ones. Build new nodes during traversal, then connect their neighbors using the map.

**Key Takeaway/Example**: Handles cycles with a visited set. Time/space O(N + E) for nodes and edges. Example mapping:
```python
old_to_new = {}
stack = [node]
visited = set()
while stack:
    old = stack.pop()
    if old in visited: continue
    visited.add(old)
    old_to_new[old] = Node(old.val)
    for neigh in old.neighbors:
        stack.append(neigh)
# Then connect neighbors
for old, new in old_to_new.items():
    for neigh in old.neighbors:
        new.neighbors.append(old_to_new[neigh])
```
Return the new node for the original head.

[Ask AI: Clone Graph](https://alisol.ir/?ai=Clone%20Graph%7CCode%20with%20Carter%7C6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List)

## Pacific Atlantic Water Flow
In a 2D grid of heights, find cells where water can flow to both Pacific (top/left) and Atlantic (bottom/right) oceans. Water flows to equal or lower heights.

**Summary**: Perform DFS from Pacific borders inward, marking reachable cells. Repeat from Atlantic borders. The intersection of both sets are the valid cells.

**Key Takeaway/Example**: Reverse the thinking: find what oceans can reach instead of what cells can reach oceans. DFS checks bounds, visited, and height constraints (current >= previous).
```python
def dfs(grid, r, c, visited, prev):
    if not (0 <= r < len(grid) and 0 <= c < len(grid[0]) and (r, c) not in visited and grid[r][c] >= prev):
        return
    visited.add((r, c))
    dfs(grid, r-1, c, visited, grid[r][c])
    dfs(grid, r+1, c, visited, grid[r][c])
    dfs(grid, r, c+1, visited, grid[r][c])
    dfs(grid, r, c-1, visited, grid[r][c])
```
Call DFS from borders, collect intersection.

[Ask AI: Pacific Atlantic Water Flow](https://alisol.ir/?ai=Pacific%20Atlantic%20Water%20Flow%7CCode%20with%20Carter%7C6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List)

## Course Schedule
Given courses and prerequisites, determine if you can finish all courses (no cycles in the graph).

**Summary**: Build a graph of prerequisites. Use DFS to detect cycles by tracking the current path and resolved courses. If a prerequisite is in the current path, there's a cycle.

**Key Takeaway/Example**: Returns false on cycle. Uses sets for path and resolved.
```python
def dfs(course, graph, path, resolved):
    if course in resolved: return True
    if course in path: return False
    path.add(course)
    for prereq in graph[course]:
        if not dfs(prereq, graph, path, resolved):
            return False
    path.remove(course)
    resolved.add(course)
    return True
```
Iterate through all courses, return false if any DFS fails.

[Ask AI: Course Schedule](https://alisol.ir/?ai=Course%20Schedule%7CCode%20with%20Carter%7C6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List)

## Number of Connected Components
Given an undirected graph, count the connected components.

**Summary**: Use Union-Find to merge components via edges. Count roots (where parent is self) for the number of components.

**Key Takeaway/Example**: Union-Find with path compression and union by rank. Time O(N + E * α(N)).
```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry: return
        if self.rank[rx] > self.rank[ry]:
            self.parent[ry] = rx
        elif self.rank[rx] < self.rank[ry]:
            self.parent[rx] = ry
        else:
            self.parent[ry] = rx
            self.rank[rx] += 1
```
Union all edges, count nodes where find(i) == i.

[Ask AI: Number of Connected Components](https://alisol.ir/?ai=Number%20of%20Connected%20Components%7CCode%20with%20Carter%7C6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List)

## Graph Valid Tree
Given a graph, check if it's a valid tree (connected, no cycles).

**Summary**: Reuse Union-Find from previous problem. Union edges; if roots are same before union, cycle exists. Finally, check for exactly one component (one root).

**Key Takeaway/Example**: Detects cycles during union. Returns false if cycle or multiple components.
```python
# Using same UnionFind class
uf = UnionFind(n)
for x, y in edges:
    if uf.find(x) == uf.find(y):
        return False
    uf.union(x, y)
# Count roots
roots = sum(uf.find(i) == i for i in range(n))
return roots == 1
```

[Ask AI: Graph Valid Tree](https://alisol.ir/?ai=Graph%20Valid%20Tree%7CCode%20with%20Carter%7C6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List)

## Wrapping Up the Series
The video mentions upcoming dynamic programming problems and references previous videos on trees, linked lists, etc.

**Summary**: Encourages subscribing for more LeetCode content.

[Ask AI: LeetCode Blind 75 Series](https://alisol.ir/?ai=LeetCode%20Blind%2075%20Series%7CCode%20with%20Carter%7C6%20GRAPH%20PROBLEMS%20SOLVED%20%7C%20LeetCode%20Grind%202023%20%7C%20Blind%2075%20List)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
