# Course Schedule II - Topological Sort - Leetcode 210

* **Platform**: YouTube
* **Channel/Creator**: NeetCode
* **Duration**: 00:17:10
* **Release Date**: Jan 18, 2021
* **Video Link**: [Watch on YouTube](https://www.youtube.com/watch?v=Akt3glAwyfY)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Course%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Course%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Course%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Course%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Course%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Course%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Course%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Course%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Course%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Course%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Course%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Course%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Course%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Course%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Course%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Course%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210)
<!-- LH-BUTTONS:END -->

## Problem Overview
We’re given `numCourses` (0 to n-1) and a list of prerequisite pairs `[course, prereq]` where you must take `prereq` before `course`.  
The goal is to return any valid order to finish all courses. If a cycle exists (impossible to finish everything), return an empty array.

Classic example:
- `numCourses = 2`, `prerequisites = [[1,0]]` → `[0,1]`
- Add `[[0,1]]` → cycle → `[]`

This is a directed graph problem where an edge `prereq → course` means “take prereq before course”. If the graph has a cycle, no valid order exists.

[Ask AI: Course Schedule II problem explanation](https://alisol.ir/?ai=Course%20Schedule%20II%20explanation%7CNeetCode%7CCourse%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210)

## Graph Representation
Build an adjacency list where the key is a course and the value is the list of its prerequisites (the courses that must be taken before it (its prerequisites).

```python
prereq_map = {c: [] for c in range(numCourses)}
for course, pre in prerequisites:
    prereq_map[course].append(pre)
```

So edges go from a course → its prerequisites (reverse of the more common “prereq → course” direction). This direction makes the DFS post-order naturally produce the correct finishing order without reversing at the end.

[Ask AI: Building adjacency list for prerequisites](https://alisol.ir/?ai=Prerequisite%20adjacency%20list%20direction%7CNeetCode%7CCourse%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210)

## DFS Topological Sort (Post-Order)
The core idea:
1. Run DFS from a node.
2. Recursively visit all prerequisites first.
3. Only after all prerequisites are processed → add the current course to the output (post-order).
4. Leaves (courses with no prerequisites) get added first → correct order.

We track three states per node:
- Not visited
- Visiting (currently in recursion stack / green path)
- Visited (already added to output)

If we ever hit a node that is “visiting”, we found a cycle.

[Ask AI: DFS topological sort post-order](https://alisol.ir/?ai=DFS%20topological%20sort%20post-order%7CNeetCode%7CCourse%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210)

## Cycle Detection
Use two sets:
- `visit` → nodes already fully processed (added to output)
- `cycle` → nodes in the current recursion path

Inside DFS:
```python
if course in cycle:      # back edge to node in current path
    return False
if course in visit:      # already done, safe to skip
    return True
```

If DFS on any prerequisite returns `False`, propagate the cycle detection upward.

[Ask AI: Cycle detection with recursion stack](https://alisol.ir/?ai=Detecting%20cycles%20in%20directed%20graph%20DFS%7CNeetCode%7CCourse%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210)

## Full Working Solution
```python
from typing import List

class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        # Build adj list: course → [prerequisites]
        prereq_map = {c: [] for c in range(numCourses)}
        for course, pre in prerequisites:
            prereq_map[course].append(pre)
        
        output = []
        visit, cycle = set(), set()
        
        def dfs(course: int) -> bool:
            if course in cycle:
                return False                # cycle detected
            if course in visit:
                return True                 # already processed
            
            cycle.add(course)               # mark as visiting
            for pre in prereq_map[course]:
                if not dfs(pre):
                    return False
            
            cycle.remove(course)            # done with this node
            visit.add(course)               # mark as fully visited
            output.append(course)           # post-order → safe to take
            return True
        
       
        
        # Need to try every node in case graph is disconnected
        for c in range(numCourses):
            if not dfs(c):
                return []                       # cycle → impossible
        
        return output
```

This produces a valid order (any valid order is accepted). Runs in O(V + E) time and O(V) space.

[Ask AI: Complete Course Schedule II DFS solution](https://alisol.ir/?ai=Course%20Schedule%20II%20DFS%20solution%7CNeetCode%7CCourse%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210)

## Alternative Approach (Kahn’s Algorithm)
The video sticks to DFS, but the same problem is very often solved with BFS + indegree count (Kahn’s algorithm):
- Compute indegrees
- Queue all nodes with indegree 0
- While queue not empty: pop, reduce indegrees of neighbors, enqueue new zeros
- If processed all nodes → return order, else cycle

Many people find Kahn’s easier to understand at first, but DFS is shorter code and works great when you’re comfortable with recursion.

[Ask AI: Kahn’s algorithm vs DFS topological sort](https://alisol.ir/?ai=Kahn%27s%20algorithm%20vs%20DFS%20topological%20sort%7CNeetCode%7CCourse%20Schedule%20II%20-%20Topological%20Sort%20-%20Leetcode%20210)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
