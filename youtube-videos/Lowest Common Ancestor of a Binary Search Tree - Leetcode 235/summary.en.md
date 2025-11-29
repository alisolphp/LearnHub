# Lowest Common Ancestor of a Binary Search Tree - Leetcode 235

* **Platform**: YouTube
* **Channel/Creator**: NeetCode
* **Duration**: 00:06:44
* **Release Date**: May 25, 2021
* **Video Link**: [https://www.youtube.com/watch?v=gs2LMfuOR9k](https://www.youtube.com/watch?v=gs2LMfuOR9k)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=4ea0b5d0 -->

### AI-Powered buttons

Teach Me:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235)
<!-- LH-BUTTONS:END -->

## Introduction to the Problem
**Summary**: The problem involves finding the lowest common ancestor (LCA) of two nodes in a binary search tree (BST). The root is always a common ancestor, but the goal is to find the deepest one where both nodes are descendants, including the possibility of a node being its own ancestor.
**Key Takeaway/Example**: This is part of a list of 75 blind problems, with plans for more videos and a playlist.
**Link for More Details**: [Ask AI: Introduction to LCA in BST](https://alisol.ir/?ai=Introduction%20to%20LCA%20in%20BST%7CNeetCode%7CLowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235)

## Understanding LCA in BST
**Summary**: LCA is the lowest node where both p and q are descendants. In a BST, use the property that left subtree values are smaller and right are larger to traverse efficiently without visiting all nodes.
**Key Takeaway/Example**: If p and q split into different subtrees, that's the LCA. The root can be an ancestor of itself.
**Link for More Details**: [Ask AI: Understanding LCA in BST](https://alisol.ir/?ai=Understanding%20LCA%20in%20BST%7CNeetCode%7CLowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235)

## Examples of Finding LCA
**Summary**: For p=2 and q=8 in a tree with root 6, they split at 6, so 6 is the LCA. For p=7 and q=9, both go right from 6, then split at 8, making 8 the LCA.
**Key Takeaway/Example**: Traverse based on comparisons: if both greater, go right; both smaller, go left; split means current is LCA.
**Link for More Details**: [Ask AI: Examples of LCA in BST](https://alisol.ir/?ai=Examples%20of%20LCA%20in%20BST%7CNeetCode%7CLowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235)

## Edge Cases
**Summary**: If one node is the root, like q=6 and p=7, then 6 is the LCA since nothing lower can be an ancestor of the root itself.
**Key Takeaway/Example**: Handles cases where p or q equals the current node, treating it as an ancestor of itself.
**Link for More Details**: [Ask AI: Edge Cases for LCA in BST](https://alisol.ir/?ai=Edge%20Cases%20for%20LCA%20in%20BST%7CNeetCode%7CLowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235)

## Algorithm Implementation
**Summary**: Use an iterative approach starting from the root. Update the current pointer based on value comparisons until the split or match is found.
**Key Takeaway/Example**: Here's the described code logic in Python:
```python
def lowestCommonAncestor(self, root, p, q):
    current = root
    while current:
        if p.val > current.val and q.val > current.val:
            current = current.right
        elif p.val < current.val and q.val < current.val:
            current = current.left
        else:
            return current
```
**Link for More Details**: [Ask AI: LCA Algorithm in BST](https://alisol.ir/?ai=LCA%20Algorithm%20in%20BST%7CNeetCode%7CLowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235)

## Time and Space Complexity
**Summary**: The algorithm runs in O(log n) time since it traverses the height of the tree, and O(1) space as no extra data structures are needed.
**Key Takeaway/Example**: Efficient because BST properties allow pruning subtrees without full traversal.
**Link for More Details**: [Ask AI: Complexity of LCA in BST](https://alisol.ir/?ai=Complexity%20of%20LCA%20in%20BST%7CNeetCode%7CLowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree%20-%20Leetcode%20235)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
