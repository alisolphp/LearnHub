# K Closest Points to Origin - Heap / Priority Queue - Leetcode 973

* **Platform**: YouTube
* **Channel/Creator**: Matt Guest
* **Duration**: 00:16:45
* **Release Date**: Jan 22, 2024
* **Video Link**: https://www.youtube.com/watch?v=1gXbJ_3K9Yo

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b47981dc -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/K%20Closest%20Points%20to%20Origin%20-%20Heap%20%7C%20Priority%20Queue%20-%20Leetcode%20973) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/K%20Closest%20Points%20to%20Origin%20-%20Heap%20%7C%20Priority%20Queue%20-%20Leetcode%20973) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/K%20Closest%20Points%20to%20Origin%20-%20Heap%20%7C%20Priority%20Queue%20-%20Leetcode%20973) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer) 

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/K%20Closest%20Points%20to%20Origin%20-%20Heap%20%7C%20Priority%20Queue%20-%20Leetcode%20973) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/K%20Closest%20Points%20to%20Origin%20-%20Heap%20%7C%20Priority%20Queue%20-%20Leetcode%20973) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/K%20Closest%20Points%20to%20Origin%20-%20Heap%20%7C%20Priority%20Queue%20-%20Leetcode%20973) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/K%20Closest%20Points%20to%20Origin%20-%20Heap%20%7C%20Priority%20Queue%20-%20Leetcode%20973) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/K%20Closest%20Points%20to%20Origin%20-%20Heap%20%7C%20Priority%20Queue%20-%20Leetcode%20973) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/K%20Closest%20Points%20to%20Origin%20-%20Heap%20%7C%20Priority%20Queue%20-%20Leetcode%20973) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/K%20Closest%20Points%20to%20Origin%20-%20Heap%20%7C%20Priority%20Queue%20-%20Leetcode%20973)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/K%20Closest%20Points%20to%20Origin%20-%20Heap%20%7C%20Priority%20Queue%20-%20Leetcode%20973) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/K%20Closest%20Points%20to%20Origin%20-%20Heap%20%7C%20Priority%20Queue%20-%20Leetcode%20973) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/K%20Closest%20Points%20to%20Origin%20-%20Heap%20%7C%20Priority%20Queue%20-%20Leetcode%20973)
<!-- LH-BUTTONS:END -->

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

## Problem Introduction
* **Summary**: The problem involves finding the K closest points to the origin (0, 0) on a plane from a list of points, using Euclidean distance. It's a common interview question, especially at companies like Amazon, and tests knowledge of efficient data structures.
* **Key Takeaway/Example**: Euclidean distance for a point (x, y) is sqrt(x² + y²), but you can skip the square root for comparisons since it preserves order.
* **Link for More Details**: [Ask AI: K Closest Points to Origin](https://alisol.ir/?ai=K%20Closest%20Points%20to%20Origin%7CMatt%20Guest%7CK%20Closest%20Points%20to%20Origin%20-%20Heap%20%2F%20Priority%20Queue%20-%20Leetcode%20973)

## Brute Force Approach
* **Summary**: Calculate the Euclidean distance for each point, store them in a list, sort the list, and return the first K points. This works but is inefficient due to sorting the entire list.
* **Key Takeaway/Example**: For points like [[1,3], [-2,2]] and K=1, distances are sqrt(10) and sqrt(8); after sorting, pick the smallest.
* **Link for More Details**: [Ask AI: Brute Force for K Closest Points](https://alisol.ir/?ai=Brute%20Force%20for%20K%20Closest%20Points%7CMatt%20Guest%7CK%20Closest%20Points%20to%20Origin%20-%20Heap%20%2F%20Priority%20Queue%20-%20Leetcode%20973)

## Heap Data Structure Basics
* **Summary**: Heaps are tree-like structures that maintain order: min-heaps keep the smallest element at the root, max-heaps the largest. They're useful for efficiently tracking extremes in a dataset.
* **Key Takeaway/Example**: Inserting or removing from a heap is O(log k) where k is the heap size, making it great for problems needing the top K elements.
* **Link for More Details**: [Ask AI: Heap Data Structure](https://alisol.ir/?ai=Heap%20Data%20Structure%7CMatt%20Guest%7CK%20Closest%20Points%20to%20Origin%20-%20Heap%20%2F%20Priority%20Queue%20-%20Leetcode%20973)

## Optimal Solution Using Heap
* **Summary**: Use a heap of size K to track the closest points. Calculate distances as you iterate through points, adding to the heap and popping the farthest if it exceeds K.
* **Key Takeaway/Example**: For points with distances 10, 8, 2 and K=2, the heap ensures you end up with 2 and 8 after processing.
* **Link for More Details**: [Ask AI: Heap Solution for K Closest Points](https://alisol.ir/?ai=Heap%20Solution%20for%20K%20Closest%20Points%7CMatt%20Guest%7CK%20Closest%20Points%20to%20Origin%20-%20Heap%20%2F%20Priority%20Queue%20-%20Leetcode%20973)

## Python-Specific Heap Implementation
* **Summary**: Python's heapq provides a min-heap, so negate distances to simulate a max-heap for popping the largest (farthest) when the heap reaches size K.
* **Key Takeaway/Example**: Push tuples like (-distance, x, y) to the heap; this keeps the largest negative (smallest actual distance) at the root for correct popping.
* **Link for More Details**: [Ask AI: Python Heapq for K Closest](https://alisol.ir/?ai=Python%20Heapq%20for%20K%20Closest%7CMatt%20Guest%7CK%20Closest%20Points%20to%20Origin%20-%20Heap%20%2F%20Priority%20Queue%20-%20Leetcode%20973)

## Time and Space Complexity
* **Summary**: The heap approach runs in O(n log k) time since each insertion/pop is log k, and space is O(k) for the heap.
* **Key Takeaway/Example**: Better than sorting's O(n log n) when k is much smaller than n.
* **Link for More Details**: [Ask AI: Complexity of Heap Solution](https://alisol.ir/?ai=Complexity%20of%20Heap%20Solution%7CMatt%20Guest%7CK%20Closest%20Points%20to%20Origin%20-%20Heap%20%2F%20Priority%20Queue%20-%20Leetcode%20973)

## Code Walkthrough
* **Summary**: Implement using heapq: initialize an empty list as heap, iterate points calculating negative distance, push to heap, and pop if size exceeds K. Finally, extract coordinates.
* **Key Takeaway/Example**:
```python
import heapq

class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        heap = []
        for x, y in points:
            dist = -(x * x + y * y)
            if len(heap) == k:
                heapq.heappushpop(heap, (dist, x, y))
            else:
                heapq.heappush(heap, (dist, x, y))
        return [[x, y] for _, x, y in heap]
```
* **Link for More Details**: [Ask AI: Code for Leetcode 973](https://alisol.ir/?ai=Code%20for%20Leetcode%20973%7CMatt%20Guest%7CK%20Closest%20Points%20to%20Origin%20-%20Heap%20%2F%20Priority%20Queue%20-%20Leetcode%20973)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
