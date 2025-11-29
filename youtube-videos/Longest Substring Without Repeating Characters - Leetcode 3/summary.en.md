# Longest Substring Without Repeating Characters - Leetcode 3

* **Platform**: YouTube
* **Channel/Creator**: Greg Hogg 
* **Duration**: 00:12:05
* **Release Date**: Mar 7, 2024
* **Video Link**: [https://www.youtube.com/watch?v=FCbOzdHKW18](https://www.youtube.com/watch?v=FCbOzdHKW18)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Longest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Longest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Longest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Longest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Longest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Longest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Longest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Longest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Longest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Longest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Longest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Longest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Longest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Longest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Longest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Longest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203)
<!-- LH-BUTTONS:END -->

## Problem Introduction
Rust handles memory safety by... wait, no—this is about LeetCode 3. We're given a string and need to find the length of the longest contiguous substring without any repeating characters. It's a classic for learning sliding window, which often pops up in interviews.

Key takeaway: Substrings are contiguous sequences, unlike subsequences. For example, in "abcabcbb", "abc" is a valid substring of length 3 with unique chars.

[Ask AI: Longest Substring Without Repeating Characters](https://alisol.ir/?ai=Longest%20Substring%20Without%20Repeating%20Characters%7CGreg%20Hogg%20%7CLongest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203)

## Sliding Window Concept
Sliding window uses two pointers, left (L) and right (R), to define a window over the string. Expand R to grow the window when valid (no duplicates), and shrink from L when invalid. This keeps things O(n) efficient.

Key example: Start with L and R at 0. Move R right if the char isn't in the current window's set. If it is, remove chars from L until the duplicate is gone.

[Ask AI: Sliding Window Algorithm](https://alisol.ir/?ai=Sliding%20Window%20Algorithm%7CGreg%20Hogg%20%7CLongest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203)

## Using a Set for Duplicates
Use a hash set for O(1) checks on whether a char is already in the window. Add chars as you expand R, remove from L when duplicates appear.

Key takeaway: Window length is R - L + 1. Track the max length seen so far. For "abcabcbb", you'll slide through, hitting max of 3 multiple times.

[Ask AI: Hash Set in Sliding Window](https://alisol.ir/?ai=Hash%20Set%20in%20Sliding%20Window%7CGreg%20Hogg%20%7CLongest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203)

## Code Implementation
Initialize L=0, max_length=0, and an empty set. Loop R from 0 to n-1. While s[R] is in the set, remove s[L] and increment L. Then add s[R], update max_length with max(max_length, R - L + 1).

```python
def lengthOfLongestSubstring(s: str) -> int:
    n = len(s)
    char_set = set()
    left = 0
    max_length = 0
    
    for right in range(n):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length
```

[Ask AI: Sliding Window Code for LeetCode 3](https://alisol.ir/?ai=Sliding%20Window%20Code%20for%20LeetCode%203%7CGreg%20Hogg%20%7CLongest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203)

## Time and Space Complexity
The algorithm runs in O(n) time since each char is added and removed at most once. Space is O(n) in worst case for the set (e.g., all unique chars).

Key takeaway: Nested loops don't make it O(n^2) here because inner loop advances L monotonically.

[Ask AI: Complexity of Sliding Window](https://alisol.ir/?ai=Complexity%20of%20Sliding%20Window%7CGreg%20Hogg%20%7CLongest%20Substring%20Without%20Repeating%20Characters%20-%20Leetcode%203)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
