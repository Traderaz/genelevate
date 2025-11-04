# Chapter 9: Sequences and Functions

## Learning Objectives

By the end of this chapter, you will be able to:
- Continue and describe sequences
- Find the nth term of arithmetic sequences
- Recognize and use geometric sequences
- Work with special sequences (square, cube, triangular, Fibonacci)
- Understand and use function notation
- Find inverse functions
- Work with composite functions

---

## 9.1 Number Sequences

### Term-to-Term Rules

Describes how to get from one term to the next.

**Example 1:** 3, 7, 11, 15, 19...

Pattern: Add 4 each time
- **Term-to-term rule:** Add 4
- Next term: 19 + 4 = **23**

**Example 2:** 80, 40, 20, 10, 5...

Pattern: Divide by 2 (or multiply by 0.5)
- **Term-to-term rule:** ÷ 2
- Next term: 5 ÷ 2 = **2.5**

**Example 3:** 2, 5, 11, 23, 47...

Pattern: Double and add 1
- **Term-to-term rule:** × 2 + 1
- Next term: 47 × 2 + 1 = **95**

---

## 9.2 Arithmetic Sequences

A sequence with a **common difference** (d) between consecutive terms.

**General form:** a, a+d, a+2d, a+3d, ...

**Example:** 5, 8, 11, 14, 17...
- First term (a) = 5
- Common difference (d) = 3

### Finding the nth Term

**Formula:** nth term = a + (n − 1)d

Where:
- a = first term
- d = common difference
- n = position number

**Example 1:** Find the nth term of 5, 8, 11, 14...

Solution:
- a = 5
- d = 3
- nth term = 5 + (n − 1) × 3
- = 5 + 3n − 3
- **= 3n + 2**

**Check:**
- n = 1: 3(1) + 2 = 5 ✓
- n = 2: 3(2) + 2 = 8 ✓
- n = 3: 3(3) + 2 = 11 ✓

**Example 2:** Find the nth term of 20, 17, 14, 11...

Solution:
- a = 20
- d = −3 (decreasing)
- nth term = 20 + (n − 1) × (−3)
- = 20 − 3n + 3
- **= 23 − 3n**

**Example 3:** Find the 50th term of 7, 11, 15, 19...

Solution:
- nth term = 4n + 3
- 50th term = 4(50) + 3 = **203**

### Finding Which Term Has a Given Value

**Example:** For the sequence with nth term 5n − 2, which term equals 73?

Solution:
- 5n − 2 = 73
- 5n = 75
- n = 15
- **The 15th term**

---

## 9.3 Geometric Sequences (Higher Tier)

A sequence with a **common ratio** (r) between consecutive terms.

**Example:** 3, 6, 12, 24, 48...
- Common ratio: 6 ÷ 3 = 2
- Each term = previous term × 2

### nth Term of Geometric Sequence

**Formula:** nth term = arⁿ⁻¹

Where:
- a = first term
- r = common ratio

**Example 1:** Find the nth term of 5, 10, 20, 40...

Solution:
- a = 5
- r = 2
- nth term = **5 × 2ⁿ⁻¹**

**Example 2:** Find the 6th term of 2, 6, 18, 54...

Solution:
- a = 2, r = 3
- 6th term = 2 × 3⁵ = 2 × 243 = **486**

---

## 9.4 Special Sequences

### Square Numbers

1, 4, 9, 16, 25, 36...

**nth term = n²**

### Cube Numbers

1, 8, 27, 64, 125...

**nth term = n³**

### Triangular Numbers

1, 3, 6, 10, 15, 21...

Pattern: 1, 1+2, 1+2+3, 1+2+3+4...

**nth term = n(n+1)/2**

**Example:** 5th triangular number
- = 5(5+1)/2 = 5 × 6 / 2 = **15**

### Fibonacci Sequence

1, 1, 2, 3, 5, 8, 13, 21...

**Rule:** Each term is the sum of the previous two terms

---

## 9.5 Quadratic Sequences (Higher Tier)

Sequences where the **second difference** is constant.

**Example:** 3, 8, 15, 24, 35...

First differences: 5, 7, 9, 11...
Second differences: 2, 2, 2... (constant)

**nth term form:** an² + bn + c

### Finding nth Term of Quadratic Sequences

**Example:** Find nth term of 5, 8, 13, 20, 29...

1st differences: 3, 5, 7, 9...
2nd differences: 2, 2, 2...

**Method:**
1. Second difference = 2, so the coefficient of n² is 2 ÷ 2 = 1
2. Compare with n²:

| n | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Sequence | 5 | 8 | 13 | 20 | 29 |
| n² | 1 | 4 | 9 | 16 | 25 |
| Difference | 4 | 4 | 4 | 4 | 4 |

3. The difference is always 4
4. **nth term = n² + 4**

---

## 9.6 Function Notation

A **function** maps inputs to outputs.

**Notation:** f(x) means "function f of x"

**Example 1:** If f(x) = 3x + 2, find f(5)

Solution:
- f(5) = 3(5) + 2 = 15 + 2 = **17**

**Example 2:** If g(x) = x² − 4, find g(−3)

Solution:
- g(−3) = (−3)² − 4 = 9 − 4 = **5**

### Finding f(x) from Information

**Example:** f(1) = 5 and f(2) = 8 and f is linear. Find f(x).

Solution:
- Linear function: f(x) = mx + c
- f(1) = m + c = 5
- f(2) = 2m + c = 8
- Subtract: m = 3
- c = 2
- **f(x) = 3x + 2**

---

## 9.7 Inverse Functions (Higher Tier)

The inverse function **reverses** the original function.

**Notation:** f⁻¹(x)

If f(x) takes a → b, then f⁻¹(x) takes b → a

### Finding Inverse Functions

**Method:**
1. Write y = f(x)
2. Swap x and y
3. Solve for y
4. This is f⁻¹(x)

**Example 1:** Find the inverse of f(x) = 2x + 3

Solution:
1. y = 2x + 3
2. x = 2y + 3
3. 2y = x − 3
4. y = (x − 3)/2
5. **f⁻¹(x) = (x − 3)/2**

**Check:** f(f⁻¹(x)) = x
- f[(x − 3)/2] = 2[(x − 3)/2] + 3 = x − 3 + 3 = x ✓

**Example 2:** Find the inverse of g(x) = (x + 5)/3

Solution:
1. y = (x + 5)/3
2. x = (y + 5)/3
3. 3x = y + 5
4. y = 3x − 5
5. **g⁻¹(x) = 3x − 5**

---

## 9.8 Composite Functions (Higher Tier)

Combining two functions.

**fg(x)** means "f of g of x" = f(g(x))

Do g first, then f.

**Example:** f(x) = 2x + 1 and g(x) = x²

Find:
(a) fg(3)
(b) gf(3)
(c) fg(x)

Solutions:
(a) fg(3) = f(g(3)) = f(9) = 2(9) + 1 = **19**

(b) gf(3) = g(f(3)) = g(7) = 7² = **49**

(c) fg(x) = f(x²) = 2(x²) + 1 = **2x² + 1**

**Note:** fg(x) ≠ gf(x) in general (not commutative)

---

## Practice Questions

### Basic Questions

1. Find the next two terms: 5, 9, 13, 17, ...
2. Write the term-to-term rule for: 2, 6, 18, 54...
3. Find the nth term of: 3, 5, 7, 9, 11...
4. Find the 10th term of the sequence with nth term 4n + 1
5. What is the 4th triangular number?

### Intermediate Questions

6. Find the nth term of: 7, 10, 13, 16...
7. The nth term is 6n − 5. Which term equals 49?
8. Find the next term in the Fibonacci sequence: 1, 1, 2, 3, 5, 8, ...
9. If f(x) = 5x − 3, find f(4)
10. Find the first 4 terms of the sequence with nth term n² + 1

### Higher Tier Questions

11. Find the nth term of the geometric sequence: 2, 6, 18, 54...
12. A quadratic sequence: 4, 7, 12, 19, 28... Find its nth term.
13. Find the inverse of f(x) = 3x − 7
14. If f(x) = x + 2 and g(x) = 3x, find fg(x)
15. If h(x) = (x − 4)/2, find h⁻¹(x)

---

## Exam-Style Questions

**Question 1** (Foundation - 4 marks)

Here is a sequence: 4, 7, 10, 13, 16...

(a) Write down the next two terms. (1 mark)
(b) Describe the term-to-term rule. (1 mark)
(c) Find an expression for the nth term. (2 marks)

**Question 2** (Foundation - 3 marks)

The nth term of a sequence is 5n − 2.

(a) Find the 3rd term. (1 mark)
(b) Find the 20th term. (1 mark)
(c) Which term equals 48? (1 mark)

**Question 3** (Higher - 5 marks)

A sequence begins: 3, 7, 13, 21, 31...

(a) Show that this is a quadratic sequence. (2 marks)
(b) Find the nth term in the form an² + bn + c. (3 marks)

**Question 4** (Higher - 6 marks)

Functions f and g are defined as:
- f(x) = 2x + 5
- g(x) = x²

(a) Find f(3). (1 mark)
(b) Find g(4). (1 mark)
(c) Find fg(2). (2 marks)
(d) Find an expression for gf(x). (2 marks)

**Question 5** (Higher - 4 marks)

(a) Find the inverse of f(x) = (x + 3)/4. (3 marks)
(b) Verify your answer by showing that ff⁻¹(x) = x. (1 mark)

---

## Mark Scheme

### Practice Questions

1. 21, 25
2. Multiply by 3 (or ×3)
3. 2n + 1
4. 41 [4(10) + 1]
5. 10 [1+2+3+4]
6. 3n + 4
7. 9th term [6n − 5 = 49, 6n = 54, n = 9]
8. 13 [5 + 8]
9. 17 [5(4) − 3]
10. 2, 5, 10, 17
11. 2 × 3ⁿ⁻¹
12. n² + 3
13. f⁻¹(x) = (x + 7)/3
14. 3x + 6 or 3(x + 2)
15. 2x + 4

### Exam-Style Questions

**Question 1:**
(a) 19, 22 - 1 mark
(b) Add 3 - 1 mark
(c) 3n + 1 - 2 marks (1 for 3n, 1 for +1)

**Question 2:**
(a) 13 [5(3) − 2] - 1 mark
(b) 98 [5(20) − 2] - 1 mark
(c) 10th term [5n − 2 = 48, n = 10] - 1 mark

**Question 3:**
(a) 1st differences: 4, 6, 8, 10; 2nd differences: 2, 2, 2 (constant) - 2 marks
(b) nth term = n² + 2n or equivalent - 3 marks

**Question 4:**
(a) 11 [2(3) + 5] - 1 mark
(b) 16 [4²] - 1 mark
(c) fg(2) = f(4) = 13 - 2 marks
(d) gf(x) = (2x + 5)² = 4x² + 20x + 25 - 2 marks

**Question 5:**
(a) y = (x+3)/4, x = (y+3)/4, 4x = y+3, y = 4x−3, so f⁻¹(x) = 4x − 3 - 3 marks
(b) f(4x−3) = (4x−3+3)/4 = 4x/4 = x ✓ - 1 mark

---

## Key Points to Remember

✓ Arithmetic sequences have a common difference (add/subtract same amount)
✓ nth term of arithmetic: a + (n−1)d
✓ Geometric sequences have a common ratio (multiply/divide by same amount)
✓ For quadratic sequences, check second differences
✓ f⁻¹(x) reverses the function f(x)
✓ fg(x) means do g first, then f
✓ Special sequences: n², n³, n(n+1)/2

---

*Previous Chapter: [← Statistics](chapter-08-statistics.md)*
*Next Chapter: [Pythagoras and Trigonometry →](chapter-10-pythagoras-trigonometry.md)*

