# Kth Largest Element in an Array - Leetcode 215 - Heaps

* **Platform**: YouTube
* **Channel/Creator**: Greg Hogg
* **Duration**: 00:11:53
* **Release Date**: Jun 13, 2024
* **Video Link**: [https://www.youtube.com/watch?v=ZmGk7h8KZLs](https://www.youtube.com/watch?v=ZmGk7h8KZLs)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

## Problem Explanation
The task is to find the k-th largest element in an unsorted array (1-indexed, in the sorted descending order). Duplicates are counted separately — it is NOT the k-th distinct element.

Example 1:  
nums = [3,2,1,5,6,4], k = 2 → sorted descending: 6,5,4,3,2,1 → 2nd largest is 5  

Example 2:  
nums = [3,2,3,1,2,4,5,5,6], k = 4 → sorted descending: 6,5,5,4,3,3,2,2,1 → 4th largest is 4

A naive solution is to sort the array (O(n log n)) and return nums[-k]. Heaps give us better runtimes.

[Ask AI: LeetCode 215 Problem Explanation](https://alisol.ir/?ai=LeetCode%20215%20Problem%20Explanation%7CGreg%20Hogg%7CKth%20Largest%20Element%20in%20an%20Array%20-%20Leetcode%20215%20-%20Heaps)

## Solution 1 — Max-Heap (Heapify the Whole Array)
Build a max-heap from the entire array in O(n), then pop the root k−1 times. The next root will be the k-th largest.

Because Python’s heapq is a min-heap, we negate every element so the “smallest” (most negative) value becomes the actual maximum.

```python
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        # Turn into max-heap by negating
        for i in range(len(nums)):
            nums[i] = -nums[i]
        
        heapq.heapify(nums)                 # O(n)
        
        # Pop k-1 largest elements
        for _ in range(k - 1):
            heapq.heappop(nums)
        
        # The root is now the k-th largest (still negated)
        return -heapq.heappop(nums)
```

Time: O(n + k log n)  
Space: O(constant in-place after negation)

This is excellent when k is close to n, but we can do better when k ≪ n.

[Ask AI: Kth Largest with Full Max Heap in Python](https://alisol.ir/?ai=Kth%20Largest%20with%20Full%20Max%20Heap%20in%20Python%7CGreg%20Hogg%7CKth%20Largest%20Element%20in%20an%20Array%20-%20Leetcode%20215%20-%20Heaps)

## Solution 2 — Min-Heap of Size K (Usually the Preferred Solution
We maintain a min-heap that always contains the current k largest elements seen so far. The root is the smallest of those k elements → exactly the k-th largest overall once we finish scanning the array.

```python
import heapq
from typing import List

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        heap = []
        
        for num in nums:
            if len(heap) < k:
                heapq.heappush(heap, num)
            else:
                heapq.heappushpop(heap, num)   # pushes num, then pops smallest
        
        return heap[0]
```

Why heappushpop works perfectly here:
- When the heap has < k elements → we only push (the if branch).
- When the heap already has k elements:
  - If num ≤ heap root → we push num (temporary size k+1), then pop the new smallest (which is num) → no change.
  - If num > heap root → we push num, then pop the old smallest → the old smallest is removed and num stays.

Result: the heap always holds the k largest elements seen, and the root is the smallest among them = the k-th largest.

Time: O(n log k)  
Space: O(k)

This is generally the fastest solution in practice because k is usually much smaller than n.

[Ask AI: Kth Largest with Min Heap Size K in Python](https://alisol.ir/?ai=Kth%20Largest%20with%20Min%20Heap%20Size%20K%20in%20Python%7CGreg%20Hogg%7CKth%20Largest%20Element%20in%20an%20Array%20-%20Leetcode%20215%20-%20Heaps)

## Quick Complexity Comparison
| Approach               | Time Complexity      | Space Complexity | Best when…                  |
|------------------------|----------------------|------------------|-----------------------------|
| Sorting                | O(n log n)           | O(1) or O(n)     | —                           |
| Max-heap (full)        | O(n + k log n)       | O(1)             | k is close to n             |
| Min-heap (size k)      | O(n log k)           | O(k)            | k ≪ n (most real cases)    |

The min-heap of size k is the one you’ll see most often in interviews and is considered the optimal heap solution for this problem.

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
