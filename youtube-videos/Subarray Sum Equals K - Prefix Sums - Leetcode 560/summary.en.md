# Subarray Sum Equals K - Prefix Sums - Leetcode 560

* **Platform**: YouTube
* **Channel/Creator**: NeetCode
* **Duration**: 00:15:20
* **Release Date**: Jun 16, 2021
* **Video Link**: [https://www.youtube.com/watch?v=fFVZt-6sgyo](https://www.youtube.com/watch?v=fFVZt-6sgyo)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## Problem Statement
The task is to find the number of contiguous subarrays in a given array of integers that sum up to a target value k. The array can include negative numbers, which adds complexity.

Key takeaway: Focus on contiguous segments, and remember that negatives prevent simple sliding window optimizations.

[Ask AI: Problem Statement](https://alisol.ir/?ai=Problem%20Statement%7CNeetCode%7CSubarray%20Sum%20Equals%20K%20-%20Prefix%20Sums%20-%20Leetcode%20560)

## Brute Force Approach
Check every possible subarray by iterating through all starting and ending points, calculating the sum for each, and counting those that equal k. This runs in O(n²) time due to the n² subarrays.

Key example: For an array like [1, 1, 1] and k=2, you'd check pairs like [1,1] twice (first two and last two).

[Ask AI: Brute Force Approach](https://alisol.ir/?ai=Brute%20Force%20Approach%7CNeetCode%7CSubarray%20Sum%20Equals%20K%20-%20Prefix%20Sums%20-%20Leetcode%20560)

## Why Sliding Window Doesn't Work
A sliding window or two-pointer approach fails because array elements can be negative. Adding or removing elements doesn't predictably increase or decrease the sum, breaking the monotonicity needed for optimization.

Key takeaway: Negatives mean you can't assume expanding the window always grows the sum positively.

[Ask AI: Why Sliding Window Doesn't Work](https://alisol.ir/?ai=Why%20Sliding%20Window%20Doesn't%20Work%7CNeetCode%7CSubarray%20Sum%20Equals%20K%20-%20Prefix%20Sums%20-%20Leetcode%20560)

## Optimized Solution Overview
Use a hashmap to track prefix sums and their frequencies for an O(n) solution. The idea is to find subarrays by subtracting prefixes that leave a sum of k.

Key takeaway: Initialize the hashmap with a prefix sum of 0 (count 1) to handle cases where the subarray starts from the beginning.

[Ask AI: Optimized Solution Overview](https://alisol.ir/?ai=Optimized%20Solution%20Overview%7CNeetCode%7CSubarray%20Sum%20Equals%20K%20-%20Prefix%20Sums%20-%20Leetcode%20560)

## Intuition with Prefix Sums
As you iterate, maintain a running sum. For each position, check if (current_sum - k) exists in the hashmap—if so, add its count to the result, as it means there are that many ways to form a subarray ending here that sums to k. Then, update the hashmap with the current sum.

Key example: For [1, -1, 1, 1, 1] and k=3, the hashmap tracks multiple prefixes summing to the same value due to negatives, finding all four subarrays that sum to 3.

[Ask AI: Intuition with Prefix Sums](https://alisol.ir/?ai=Intuition%20with%20Prefix%20Sums%7CNeetCode%7CSubarray%20Sum%20Equals%20K%20-%20Prefix%20Sums%20-%20Leetcode%20560)

## Code Implementation
Initialize result=0, cur_sum=0, and a hashmap with {0: 1}. Loop through the array: add the current number to cur_sum, check if (cur_sum - k) is in the hashmap and add its count to result, then increment the hashmap count for cur_sum.

```python
def subarraySum(nums, k):
    result = 0
    cur_sum = 0
    prefix_sums = {0: 1}
    for num in nums:
        cur_sum += num
        diff = cur_sum - k
        result += prefix_sums.get(diff, 0)
        prefix_sums[cur_sum] = prefix_sums.get(cur_sum, 0) + 1
    return result
```

[Ask AI: Code Implementation](https://alisol.ir/?ai=Code%20Implementation%7CNeetCode%7CSubarray%20Sum%20Equals%20K%20-%20Prefix%20Sums%20-%20Leetcode%20560)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
