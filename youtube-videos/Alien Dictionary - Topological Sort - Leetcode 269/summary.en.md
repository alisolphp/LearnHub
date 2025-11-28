# Alien Dictionary - Topological Sort - Leetcode 269

* **Platform**: YouTube
* **Channel/Creator**: NeetCode
* **Duration**: 00:22:06
* **Release Date**: Jun 10, 2021
* **Video Link**: [https://www.youtube.com/watch?v=6kTZYvNNyps](https://www.youtube.com/watch?v=6kTZYvNNyps)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=005796ea -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269)
<!-- LH-BUTTONS:END -->

## Problem Introduction
* **Summary**: The problem involves deriving the order of letters in an alien language using a list of words sorted in that language's lexicographical order. The alphabet uses English lowercase letters, but with unknown ordering. Return a string of unique letters in the alien order, or an empty string if no valid order exists.
* **Key Takeaway/Example**: Multiple valid orders may exist; return any one. If invalid (e.g., due to contradictions), return empty string.
* **Link for More Details**: [Ask AI: Alien Dictionary Problem](https://alisol.ir/?ai=Alien%20Dictionary%20Problem|NeetCode|Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269)

## Lexicographical Sorting Rules
* **Summary**: Words are sorted based on the first differing character. If one word is a prefix of another, the shorter must come first; otherwise, it's invalid.
* **Key Takeaway/Example**: For words like "ape" and "apes", "ape" must precede "apes". If reversed, no solution exists.
* **Link for More Details**: [Ask AI: Lexicographical Sorting](https://alisol.ir/?ai=Lexicographical%20Sorting|NeetCode|Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269)

## Building the Graph
* **Summary**: Compare adjacent word pairs to find the first differing characters, creating directed edges in a graph where one letter precedes another.
* **Key Takeaway/Example**: For words "wrt" and "wrf", 't' -> 'f' because 't' comes before 'f'. Use an adjacency list to represent these relationships.
* **Link for More Details**: [Ask AI: Building Graph from Words](https://alisol.ir/?ai=Building%20Graph%20from%20Words|NeetCode|Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269)

## Handling Invalid Cases
* **Summary**: Check for prefix mismatches where a longer word precedes a shorter prefix. Also, detect cycles in the graph, which indicate contradictions in ordering.
* **Key Takeaway/Example**: If words have same prefix but longer first, return empty string. Cycles like 'w' -> 'e' -> 'w' mean no solution.
* **Link for More Details**: [Ask AI: Detecting Invalid Orderings](https://alisol.ir/?ai=Detecting%20Invalid%20Orderings|NeetCode|Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269)

## Topological Sort with DFS
* **Summary**: Use post-order DFS to traverse the graph, building the order in reverse. Track visited nodes and current path to detect cycles.
* **Key Takeaway/Example**: Process descendants first, then add node to result. Reverse the result at the end for correct order.
* **Link for More Details**: [Ask AI: Topological Sort DFS](https://alisol.ir/?ai=Topological%20Sort%20DFS|NeetCode|Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269)

## Implementing the Code
* **Summary**: Create adjacency list from word pairs, handle edge cases, perform DFS on all nodes, and return reversed result if no cycle.
* **Key Takeaway/Example**: Use a dictionary for visited states (False: visited, True: in path). Append to list post-recursion.
```python
# Pseudocode example from explanation
adj = {c: set() for word in words for c in word}
for i in range(len(words)-1):
    w1, w2 = words[i], words[i+1]
    minLen = min(len(w1), len(w2))
    if len(w1) > len(w2) and w1[:minLen] == w2[:minLen]:
        return ""
    for j in range(minLen):
        if w1[j] != w2[j]:
            adj[w1[j]].add(w2[j])
            break
visit = {}  # False=visited, True=in path
res = []
def dfs(c):
    if c in visit:
        return visit[c]
    visit[c] = True
    for nei in adj[c]:
        if dfs(nei):
            return True
    visit[c] = False
    res.append(c)
    return False
for c in adj:
    if dfs(c):
        return ""
return "".join(res[::-1])
```
* **Link for More Details**: [Ask AI: Alien Dictionary Code Implementation](https://alisol.ir/?ai=Alien%20Dictionary%20Code%20Implementation|NeetCode|Alien%20Dictionary%20-%20Topological%20Sort%20-%20Leetcode%20269)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
