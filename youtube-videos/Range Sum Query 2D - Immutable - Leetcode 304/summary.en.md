# Range Sum Query 2D - Immutable - Leetcode 304

* **Platform**: YouTube
* **Channel/Creator**: NeetCode
* **Duration**: 00:13:17
* **Release Date**: Jun 2, 2022
* **Video Link**: [https://www.youtube.com/watch?v=KE8MQuwE2yA](https://www.youtube.com/watch?v=KE8MQuwE2yA)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=005796ea -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Range%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Range%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Range%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Range%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Range%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Range%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Range%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Range%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Range%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Range%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Range%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Range%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Range%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304)
<!-- LH-BUTTONS:END -->

## Problem Introduction
Rust handles memory safety by using ownership and borrowing rules, but here we're focusing on a 2D matrix sum query. You get a 2D matrix and need to compute the sum of any submatrix defined by its top-left (row1, col1) and bottom-right (row2, col2) coordinates. Multiple queries make efficiency key.

Key takeaway: The goal is constant-time queries after preprocessing, building on prefix sum ideas to avoid repeated nested loops for each query.

[Ask AI: 2D Range Sum Query](https://alisol.ir/?ai=2D%20Range%20Sum%20Query%7CNeetCode%7CRange%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304)

## Naive Approach
To compute a submatrix sum, loop through rows from row1 to row2, and for each row, loop through columns from col1 to col2, adding up values. This works but gets slow with many queries, as each could take O(rows * cols) time in the worst case.

Key example: For a submatrix from (1,2) to (2,4), nest loops to sum elements row by row.

[Ask AI: Naive Submatrix Sum](https://alisol.ir/?ai=Naive%20Submatrix%20Sum%7CNeetCode%7CRange%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304)

## 1D Prefix Sums Review
In 1D, precompute a prefix array where prefix[i] is the sum from index 0 to i-1. Then, sum from left to right is prefix[right+1] - prefix[left]. This takes O(n) preprocessing and O(1) per query, efficient for many subarray sums.

Key example: For array [3,3,1,4,2], prefix becomes [0,3,6,7,11,13]. Sum from index 1 to 3: 6 +1 +4 =11, or prefix[4] - prefix[1] =11-3=8? Wait, adjust indices properly.

[Ask AI: 1D Prefix Sums](https://alisol.ir/?ai=1D%20Prefix%20Sums%7CNeetCode%7CRange%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304)

## Extending Prefix Sums to 2D
In 2D, create a prefix matrix where prefix[r][c] holds the sum from (0,0) to (r-1,c-1). To get a submatrix sum, use inclusion-exclusion: prefix[row2+1][col2+1] - prefix[row1][col2+1] - prefix[row2+1][col1] + prefix[row1][col1]. This subtracts overlapping regions correctly.

Key takeaway: Precomputing the 2D prefix takes O(m*n) time, enabling O(1) queries by treating each bottom-right as a potential submatrix end.

[Ask AI: 2D Prefix Sums](https://alisol.ir/?ai=2D%20Prefix%20Sums%7CNeetCode%7CRange%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304)

## Handling Edge Cases with Padding
To avoid out-of-bounds checks for queries at the matrix edges, make the prefix matrix (rows+1) x (cols+1) initialized to zeros. This way, subtracting from row-1 or col-1 hits zeros naturally, simplifying code without if-statements.

Key example: For a 3x4 matrix, prefix is 4x5 with top row and left column as zeros.

[Ask AI: Prefix Matrix Padding](https://alisol.ir/?ai=Prefix%20Matrix%20Padding%7CNeetCode%7CRange%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304)

## Building the Prefix Sum Matrix
In the constructor, get matrix dimensions m (rows) and n (cols). Create sum_mat as [[0] * (n+1) for _ in range(m+1)]. Then, for r in range(m), for c in range(n): sum_mat[r+1][c+1] = matrix[r][c] + sum_mat[r+1][c] + sum_mat[r][c+1] - sum_mat[r][c]. This accumulates row-wise and column-wise sums.

```python
self.sum_mat = [[0] * (cols + 1) for _ in range(rows + 1)]
for r in range(rows):
    for c in range(cols):
        self.sum_mat[r + 1][c + 1] = (
            matrix[r][c] +
            self.sum_mat[r + 1][c] +
            self.sum_mat[r][c + 1] -
            self.sum_mat[r][c]
        )
```

[Ask AI: Building 2D Prefix Matrix](https://alisol.ir/?ai=Building%202D%20Prefix%20Matrix%7CNeetCode%7CRange%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304)

## Querying the Sum Region
In sumRegion, add 1 to all inputs for offset: r1 +=1, c1 +=1, r2 +=1, c2 +=1. Then return sum_mat[r2][c2] - sum_mat[r1-1][c2] - sum_mat[r2][c1-1] + sum_mat[r1-1][c1-1]. This gives the exact submatrix sum in O(1) time.

```python
def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
    r1, c1, r2, c2 = row1 + 1, col1 + 1, row2 + 1, col2 + 1
    return (
        self.sum_mat[r2][c2] -
        self.sum_mat[r1 - 1][c2] -
        self.sum_mat[r2][c1 - 1] +
        self.sum_mat[r1 - 1][c1 - 1]
    )
```

[Ask AI: 2D Sum Query Implementation](https://alisol.ir/?ai=2D%20Sum%20Query%20Implementation%7CNeetCode%7CRange%20Sum%20Query%202D%20-%20Immutable%20-%20Leetcode%20304)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
