# Top K Frequent Elements - Leetcode 347

* **Platform**: YouTube
* **Channel/Creator**: Greg Hogg 
* **Duration**: 00:14:09
* **Release Date**: Dec 20, 2023
* **Video Link**: [https://www.youtube.com/watch?v=phNDYf1xzco](https://www.youtube.com/watch?v=phNDYf1xzco)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## Problem Statement
* **Summary**: Given an integer array nums and an integer k, return the k most frequent elements in any order. The solution is guaranteed to be unique, avoiding ties in frequencies for the k-th position.
* **Key Takeaway/Example**: For nums = [1,1,1,2,2,3] and k=2, the frequencies are 1:3, 2:2, 3:1, so top 2 are 1 and 2.
* **Link for More Details**: [Ask AI: Top K Frequent Elements Problem](https://alisol.ir/?ai=Top%20K%20Frequent%20Elements%20Problem%7CGreg%20Hogg%7CTop%20K%20Frequent%20Elements%20-%20Leetcode%20347)

## Naive Approach with Sorting
* **Summary**: Use a frequency dictionary to count occurrences, then sort by frequency in descending order and pick the top k elements.
* **Key Takeaway/Example**: Frequencies like {1:2, 2:3, 3:4} sorted by value give [3,2,1], then take first k=2: [3,2]. Time is O(n log n) due to sorting.
* **Link for More Details**: [Ask AI: Sorting for Top K Frequencies](https://alisol.ir/?ai=Sorting%20for%20Top%20K%20Frequencies%7CGreg%20Hogg%7CTop%20K%20Frequent%20Elements%20-%20Leetcode%20347)

## Min Heap Approach
* **Summary**: Build a frequency counter, then use a min-heap to maintain the top k elements by pushing frequency-number pairs and popping the smallest when size exceeds k.
* **Key Takeaway/Example**: Use Python's heapq for a min-heap with tuples (freq, num). For each item, if heap size < k, push; else push and pop. Final heap has the keys for the answer.
```python
from heapq import heappush, heappushpop
from collections import Counter

def topKFrequent(nums, k):
    counter = Counter(nums)
    heap = []
    for key, val in counter.items():
        if len(heap) < k:
            heappush(heap, (val, key))
        else:
            heappushpop(heap, (val, key))
    return [h[1] for h in heap]
```
Time is O(n log k), space O(n).
* **Link for More Details**: [Ask AI: Min Heap for Top K](https://alisol.ir/?ai=Min%20Heap%20for%20Top%20K%7CGreg%20Hogg%7CTop%20K%20Frequent%20Elements%20-%20Leetcode%20347)

## Bucket Sort Approach
* **Summary**: Use frequency as indices in a list of lists (buckets), place numbers into buckets by their frequency, then iterate backwards from highest frequency to collect top k.
* **Key Takeaway/Example**: Buckets[ freq ] = list of nums with that freq. Start from len(nums) down, extend result with bucket contents until k elements collected.
```python
from collections import Counter

def topKFrequent(nums, k):
    n = len(nums)
    counter = Counter(nums)
    buckets = [[] for _ in range(n + 1)]  # Note: initialized as empty lists, not zeros
    for num, freq in counter.items():
        buckets[freq].append(num)
    result = []
    for i in range(n, 0, -1):
        if buckets[i]:
            result.extend(buckets[i])
            if len(result) >= k:
                break
    return result[:k]  # Ensure exactly k
```
Time is O(n), space O(n).
* **Link for More Details**: [Ask AI: Bucket Sort for Frequencies](https://alisol.ir/?ai=Bucket%20Sort%20for%20Frequencies%7CGreg%20Hogg%7CTop%20K%20Frequent%20Elements%20-%20Leetcode%20347)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
