# Sum of Prefix Scores of Strings - Leetcode 2416

* **Platform**: YouTube
* **Channel/Creator**: NeetCodeIO
* **Duration**: 00:19:45
* **Release Date**: Jun 16, 2021
* **Video Link**: [https://www.youtube.com/watch?v=F-5cmvhLw90](https://www.youtube.com/watch?v=F-5cmvhLw90)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## Problem Overview
Given an array of strings `words`, for each word we need to compute its “prefix score”:  
take every prefix of the word (from length 1 to the full word), count how many words in the input have that exact prefix (including the word itself), then sum those counts.  
Return an array containing the score of each word in the same order.

The minimum possible score for any word is its own length (every prefix appears at least in itself).

[Ask AI: Sum of Prefix Scores of Strings Explanation](https://alisol.ir/?ai=Sum%20of%20Prefix%20Scores%20of%20Strings%20Explanation%7CNeetCodeIO%7CSum%20of%20Prefix%20Scores%20of%20Strings%20-%20Leetcode%202416)

## Example Walkthrough
Input: `words = ["abc","ab","bc","b"]`

- For `"abc"` the prefixes are `"a"`, `"ab"`, `"abc"`
  - `"a"` appears as prefix in `"abc"` and `"ab"` → count 2
  - `"ab"` appears in `"abc"` and `"ab"` → count 2
  - `"abc"` appears only in `"abc"` → count 1
  - Score = 2 + 2 + 1 = **5**

- For `"ab"`: `"a"` (2) + `"ab"` (2) → **4**
- For `"bc"`: `"b"` (2) + `"bc"` (1) → **3**
- For `"b"`: `"b"` (2) → **2**

Result → `[5,4,3,2]`

[Ask AI: Prefix Score Example Walkthrough](https://alisol.ir/?ai=Prefix%20Score%20Example%20Walkthrough%7CNeetCodeIO%7CSum%20of%20Prefix%20Scores%20of%20Strings%20-%20Leetcode%202416)

## HashMap (Dictionary) Solution – Simple but O(N·L²)
Pre-compute every possible prefix and how many times it appears:

```python
from collections import defaultdict

count = defaultdict(int)
for word in words:
    for i in range(len(word)):
        prefix = word[:i+1]          # slicing creates a new string → O(L)
        count[prefix] += 1
```

Then for each word sum the counts of its prefixes:

```python
for word in words:
    score = 0
    for i in range(len(word)):
        score += count[word[:i+1]]
    result.append(score)
```

Total time → **O(N·L²)** because every prefix slice and hash lookup costs O(L).  
With N ≤ 1000 and L ≤ 1000 this is ~10⁹ operations → too slow / TLE risk.

[Ask AI: Prefix Counting with Python defaultdict](https://alisol.ir/?ai=Prefix%20Counting%20with%20Python%20defaultdict%7CNeetCodeIO%7CSum%20of%20Prefix%20Scores%20of%20Strings%20-%20Leetcode%202416)

## Trie (Prefix Tree) Solution – Optimal O(N·L)
When you see “prefix” over many strings, think Trie.

We build a Trie where each node stores how many words pass through it (the count of words that have the prefix ending at that node).

**Node definition**
```python
class TrieNode:
    def __init__(self):
        self.children = [None] * 26
        self.count = 0          # how many words pass through this node
```

**Insertion** (count how many words share each prefix)
```python
def insert(self, word):
    node = self.root
    for c in word:
        i = ord(c) - ord('a')
        if node.children[i] is None:
            node.children[i] = TrieNode()
        node = node.children[i]
        node.count += 1                # every word that reaches here shares this prefix
```

**Score query** (sum counts along the path)
```python
def get_score(self, word):
    node = self.root
    score = 0
    for c in word:
        i = ord(c) - ord('a')
        node = node.children[i]        # guaranteed to exist
        score += node.count
    return score
```

**Usage**
```python
trie = Trie()
for word in words:
    trie.insert(word)

result = []
for word in words:
    result.append(trie.get_score(word))
```

Total time → **O(total characters)** = O(N·L) ≈ 10⁶ operations → easily passes.  
Space → O(total characters) in worst case (no sharing) still ≤ 10⁶ nodes.

[Ask AI: Implementing Trie for Prefix Counting](https://alisol.ir/?ai=Implementing%20Trie%20for%20Prefix%20Counting%7CNeetCodeIO%7CSum%20of%20Prefix%20Scores%20of%20Strings%20-%20Leetcode%202416)

## Why the Trie Beats the HashMap Here
- No string slicing → we move character-by-character → O(L) per word instead of O(L²)
- Shared prefixes are automatically merged → natural counting of how many words share each prefix
- Each node’s `count` is exactly the frequency we need, so scoring a word is just walking down its path and adding the counts.

[Ask AI: When to Use Trie vs HashMap](https://alisol.ir/?ai=When%20to%20Use%20Trie%20vs%20HashMap%7CNeetCodeIO%7CSum%20of%20Prefix%20Scores%20of%20Strings%20-%20Leetcode%202416)

## Common Variations & Tips
- If the problem asked only for existence (not count), we would store `is_end` or `end_count` instead of pass-through count.
- For uppercase letters or other characters, use a dictionary instead of fixed array of 26.
- This exact “pass-through count” pattern appears in several Hard problems (e.g. word search II, map sum keys, etc.).

[Ask AI: Trie Pass-Through Count Pattern](https://alisol.ir/?ai=Trie%20Pass-Through%20Count%20Pattern%7CNeetCodeIO%7CSum%20of%20Prefix%20Scores%20of%20Strings%20-%20Leetcode%202416)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
