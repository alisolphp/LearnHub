# Solving the Sliding Window Problems from Blind 75 | LeetCode

* **Platform**: YouTube
* **Channel/Creator**: Code with Carter
* **Duration**: 00:34:15
* **Release Date**: Aug 17, 2023
* **Video Link**: [https://www.youtube.com/watch?v=Mf9C6vDxhzk](https://www.youtube.com/watch?v=Mf9C6vDxhzk)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Solving%20the%20Sliding%20Window%20Problems%20from%20Blind%2075%20%7C%20LeetCode) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Solving%20the%20Sliding%20Window%20Problems%20from%20Blind%2075%20%7C%20LeetCode) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Solving%20the%20Sliding%20Window%20Problems%20from%20Blind%2075%20%7C%20LeetCode) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Solving%20the%20Sliding%20Window%20Problems%20from%20Blind%2075%20%7C%20LeetCode) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Solving%20the%20Sliding%20Window%20Problems%20from%20Blind%2075%20%7C%20LeetCode) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Solving%20the%20Sliding%20Window%20Problems%20from%20Blind%2075%20%7C%20LeetCode) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Solving%20the%20Sliding%20Window%20Problems%20from%20Blind%2075%20%7C%20LeetCode) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Solving%20the%20Sliding%20Window%20Problems%20from%20Blind%2075%20%7C%20LeetCode) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Solving%20the%20Sliding%20Window%20Problems%20from%20Blind%2075%20%7C%20LeetCode) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Solving%20the%20Sliding%20Window%20Problems%20from%20Blind%2075%20%7C%20LeetCode) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Solving%20the%20Sliding%20Window%20Problems%20from%20Blind%2075%20%7C%20LeetCode) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Solving%20the%20Sliding%20Window%20Problems%20from%20Blind%2075%20%7C%20LeetCode)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Solving%20the%20Sliding%20Window%20Problems%20from%20Blind%2075%20%7C%20LeetCode) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Solving%20the%20Sliding%20Window%20Problems%20from%20Blind%2075%20%7C%20LeetCode) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/Solving%20the%20Sliding%20Window%20Problems%20from%20Blind%2075%20%7C%20LeetCode) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Solving%20the%20Sliding%20Window%20Problems%20from%20Blind%2075%20%7C%20LeetCode) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Solving%20the%20Sliding%20Window%20Problems%20from%20Blind%2075%20%7C%20LeetCode)
<!-- LH-BUTTONS:END -->

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

## Sliding Window Pattern Overview
Sliding window is one of the most important techniques in coding interviews. The core idea is to use two pointers (left and right) to represent a “window” of the array/string, expand the right pointer to include new elements, and shrink the left pointer whenever the window becomes invalid so we can keep the window valid while tracking the optimal (max length or min length) value.

The typical blueprint:
- Move the right pointer to grow the window.
- When the window violates a condition → shrink from the left until the condition is satisfied again.
- At every step (or when valid) update the answer (max length, min length, etc.).

The video solves four Blind 75 sliding window problems and shows how the same pattern applies to all of them (the first one is a very simple version of the pattern).

## Best Time to Buy and Sell Stock (LeetCode 121)
We need to find the maximum profit we can get by buying on one day and selling on a later day.

We walk from left to right, keeping track of the lowest price seen so far. Whenever the current price is higher than our current lowest, we calculate the profit and keep the maximum.

```python
from typing import List

def maxProfit(prices: List[int]) -> int:
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        if price < min_price:
            min_price = price
        max_profit = max(max_profit, price - min_price)
    return max_profit
```

Time → O(n), Space → O(1)

[Ask AI: Best Time to Buy and Sell Stock Sliding Window](https://alisol.ir/?ai=Best%20Time%20to%20Buy%20and%20Sell%20Stock%7CCode%20with%20Carter%7CSOLVING%20ALL%20Sliding%20Window%20%5BBlind75%20List%5D%20%7C%20LeetCode%20Problems)

## Longest Substring Without Repeating Characters (LeetCode 3)
Find the longest substring with all unique characters.

We use a set that contains the characters currently in the current window. We expand the right pointer and, whenever we see a duplicate, we remove characters from the left until the duplicate is gone. After each expansion we update the max length.

```python
def lengthOfLongestSubstring(s: str) -> int:
    char_set = set()
    left = 0
    max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len
```

Time → O(n), Space → O(1) (bounded by alphabet size)

[Ask AI: Longest Substring Without Repeating Characters Sliding Window](https://alisol.ir/?ai=Longest%20Substring%20Without%20Repeating%20Characters%20Sliding%20Window%7CCode%20with%20Carter%7CSOLVING%20ALL%20Sliding%20Window%20%5BBlind75%20List%5D%20%7C%20LeetCode%20Problems)

## Longest Repeating Character Replacement (LeetCode 424)
Given a string and an integer k (max replacements allowed), find the longest substring where we can replace at most k characters to make all characters the same.

We keep a frequency map of the current window and track the maximum frequency of any single character in the window. The number of replacements needed = window length − max_frequency. If it exceeds k, we shrink from the left.

```python
from collections import defaultdict

def characterReplacement(s: str, k: int) -> int:
    count = defaultdict(int)
    left = 0
    max_len = 0
    max_count = 0

    for right in range(len(s)):
        count[s[right]] += 1
        max_count = max(max_count, count[s[right]])

        if right - left + 1 - max_count > k:
            count[s[left]] -= 1
            left += 1
        max_len = max(max_len, right - left + 1)
    return max_len
```

Time → O(n), Space → O(1) (bounded by alphabet)

[Ask AI: Longest Repeating Character Replacement Sliding Window](https://alisol.ir/?ai=Longest%20Repeating%20Character%20Replacement%20Sliding%20Window%7CCode%20with%20Carter%7CSOLVING%20ALL%20Sliding%20Window%20%5BBlind75%20List%5D%20%7C%20LeetCode%20Problems)

## Minimum Window Substring (LeetCode 76)
Given two strings s and t, find the shortest substring in s that contains all characters of t (with at least the required frequencies).

We use two counters:
- required = Counter(t) – how many of each character we still need.
- We keep a variable need that represents the total number of characters we still need (len(t)).

Expand the right pointer, “paying” one needed character when we see a character that still has debt. When need == 0 the window is valid → shrink from the left to try to make it smaller, updating the minimum window whenever we have a valid window.

```python
from collections import Counter

def minWindow(s: str, t: str) -> str:
    if not t or not s:
        return ""

    required = Counter(t)
    need = len(t)
    window_count = Counter()

    left = 0
    min_len = float("inf")
    result = ""

    for right, char in enumerate(s):
        window_count[char] += 1

        if char in required and window_count[char] <= required[char]:
            need -= 1

        while need == 0 and left <= right:
            if right - left + 1 < min_len:
                min_len = right - left + 1
                result = s[left:right+1]

            window_count[s[left]] -= 1
            if s[left] in required and window_count[s[left]] < required[s[left]]:
                need += 1
            left += 1

    return result
```

(Note: the code above is the standard correct implementation that handles duplicates in t correctly; the live coding in the video had a couple of small bugs that were fixed on the spot.)

Time → O(n), Space → O(1) (bounded by alphabet)

[Ask AI: Minimum Window Substring Sliding Window](https://alisol.ir/?ai=Minimum%20Window%20Substring%20Sliding%20Window%7CCode%20with%20Carter%7CSOLVING%20ALL%20Sliding%20Window%20%5BBlind75%20List%5D%20%7C%20LeetCode%20Problems)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
