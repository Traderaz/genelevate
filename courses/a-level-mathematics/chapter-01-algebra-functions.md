# Chapter 1: Algebra and Functions

## Learning Objectives
- Master algebraic manipulation and proof techniques
- Understand and work with different types of functions
- Apply the factor and remainder theorems
- Solve inequalities and simultaneous equations
- Work with partial fractions

## 1.1 Algebraic Expressions

### Index Laws

\[
a^m \times a^n = a^{m+n}
\]

\[
a^m \div a^n = a^{m-n}
\]

\[
(a^m)^n = a^{mn}
\]

\[
a^{-n} = \frac{1}{a^n}
\]

\[
a^{\frac{m}{n}} = \sqrt[n]{a^m} = (\sqrt[n]{a})^m
\]

\[
a^0 = 1 \quad (a \neq 0)
\]

### Surds

**Simplifying surds:**

\[
\sqrt{ab} = \sqrt{a} \times \sqrt{b}
\]

**Example:** \( \sqrt{50} = \sqrt{25 \times 2} = 5\sqrt{2} \)

**Rationalizing denominators:**

\[
\frac{1}{\sqrt{a}} = \frac{\sqrt{a}}{a}
\]

\[
\frac{1}{a + \sqrt{b}} = \frac{a - \sqrt{b}}{a^2 - b}
\]

## 1.2 Polynomials

### Division of Polynomials

**Long division or inspection**

**Example:** Divide \( x^3 + 2x^2 - 5x + 12 \) by \( x + 3 \)

Result: \( x^2 - x - 2 + \frac{18}{x+3} \)

### Factor Theorem

If \( f(a) = 0 \), then \( (x - a) \) is a factor of \( f(x) \)

**Example:** Show \( (x - 2) \) is a factor of \( f(x) = x^3 - 6x^2 + 11x - 6 \)

\[
f(2) = 8 - 24 + 22 - 6 = 0 \quad \checkmark
\]

### Remainder Theorem

When \( f(x) \) is divided by \( (x - a) \), the remainder is \( f(a) \)

## 1.3 Functions

### Function Notation

\[
f: x \mapsto 3x + 2 \quad \text{or} \quad f(x) = 3x + 2
\]

- **Domain**: Set of input values
- **Range**: Set of output values

### Types of Functions

**One-to-one**: Each output comes from exactly one input  
**Many-to-one**: Multiple inputs give same output  
**One-to-many**: NOT a function  
**Many-to-many**: NOT a function

### Composite Functions

\[
fg(x) = f(g(x))
\]

**Example:** If \( f(x) = 2x + 1 \) and \( g(x) = x^2 \), find \( fg(x) \)

\[
fg(x) = f(x^2) = 2x^2 + 1
\]

### Inverse Functions

\[
f^{-1}(x): \quad \text{Reverse of } f(x)
\]

**To find inverse:**
1. Write \( y = f(x) \)
2. Rearrange to make \( x \) the subject
3. Swap \( x \) and \( y \)

**Example:** Find inverse of \( f(x) = 3x - 2 \)

\[
y = 3x - 2
\]
\[
3x = y + 2
\]
\[
x = \frac{y + 2}{3}
\]
\[
f^{-1}(x) = \frac{x + 2}{3}
\]

### Modulus Function

\[
|x| = \begin{cases} x & \text{if } x \geq 0 \\ -x & \text{if } x < 0 \end{cases}
\]

**Graph of \( y = |f(x)| \)**: Reflect negative parts above x-axis

## 1.4 Transformations of Graphs

| Transformation | Effect |
|----------------|--------|
| \( y = f(x) + a \) | Translate up by \( a \) |
| \( y = f(x) - a \) | Translate down by \( a \) |
| \( y = f(x + a) \) | Translate left by \( a \) |
| \( y = f(x - a) \) | Translate right by \( a \) |
| \( y = af(x) \) | Stretch vertically by factor \( a \) |
| \( y = f(ax) \) | Stretch horizontally by factor \( \frac{1}{a} \) |
| \( y = -f(x) \) | Reflect in x-axis |
| \( y = f(-x) \) | Reflect in y-axis |

## 1.5 Solving Equations

### Quadratic Equations

**Factorizing:**
\[
x^2 + 5x + 6 = (x + 2)(x + 3) = 0
\]

**Quadratic Formula:**
\[
ax^2 + bx + c = 0 \implies x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
\]

**Discriminant:**
- \( b^2 - 4ac > 0 \): Two real roots
- \( b^2 - 4ac = 0 \): One repeated root
- \( b^2 - 4ac < 0 \): No real roots

### Simultaneous Equations

**Substitution or elimination method**

## 1.6 Inequalities

**Rules:**
- Add/subtract same value from both sides
- Multiply/divide by positive: inequality stays same
- **Multiply/divide by negative: FLIP inequality sign**

**Example:** Solve \( 2x - 3 < 7 \)

\[
2x < 10
\]
\[
x < 5
\]

### Quadratic Inequalities

**Example:** Solve \( x^2 - 5x + 6 > 0 \)

Factor: \( (x - 2)(x - 3) > 0 \)

Critical values: \( x = 2, x = 3 \)

Solution: \( x < 2 \) or \( x > 3 \)

## 1.7 Partial Fractions

**Decompose rational expressions into simpler fractions**

**Type 1:** \( \frac{P(x)}{(ax + b)(cx + d)} = \frac{A}{ax + b} + \frac{B}{cx + d} \)

**Example:**
\[
\frac{7x + 5}{(x + 1)(x + 2)} = \frac{A}{x + 1} + \frac{B}{x + 2}
\]

Multiply through: \( 7x + 5 = A(x + 2) + B(x + 1) \)

Substitute \( x = -1 \): \( -2 = A(1) \implies A = -2 \)  
Substitute \( x = -2 \): \( -9 = B(-1) \implies B = 9 \)

\[
\frac{7x + 5}{(x + 1)(x + 2)} = \frac{-2}{x + 1} + \frac{9}{x + 2}
\]

## 1.8 Proof

### Types of Proof

**1. Direct Proof**

Show result directly using logical steps

**Example:** Prove the sum of two even numbers is even

Let \( a = 2m \) and \( b = 2n \) (even numbers)

\[
a + b = 2m + 2n = 2(m + n)
\]

This is \( 2 \times \text{integer} \), so even. ∎

**2. Proof by Contradiction**

Assume opposite is true, reach contradiction

**Example:** Prove \( \sqrt{2} \) is irrational

Assume \( \sqrt{2} = \frac{p}{q} \) (rational in lowest terms)

Then \( 2 = \frac{p^2}{q^2} \implies p^2 = 2q^2 \)

So \( p^2 \) is even, therefore \( p \) is even: \( p = 2k \)

\[
(2k)^2 = 2q^2 \implies 4k^2 = 2q^2 \implies 2k^2 = q^2
\]

So \( q^2 \) is even, therefore \( q \) is even

But if both \( p \) and \( q \) are even, fraction wasn't in lowest terms - contradiction! ∎

**3. Disproof by Counter-example**

Find one example that shows statement is false

**Example:** Disprove "All prime numbers are odd"

Counter-example: 2 is prime and even. ∎

**4. Proof by Exhaustion**

Check all possible cases

## Key Formulas

**Quadratic Formula:**
\[
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
\]

**Sum and Product of Roots:**

For \( ax^2 + bx + c = 0 \) with roots \( \alpha, \beta \):

\[
\alpha + \beta = -\frac{b}{a}
\]
\[
\alpha\beta = \frac{c}{a}
\]

## Exam-Style Questions

**1.** Simplify \( \frac{(2x^2y^3)^4}{(4xy)^2} \) (3 marks)

**2.** Given \( f(x) = 2x + 3 \) and \( g(x) = x^2 - 1 \), find:
   a) \( fg(x) \) (2 marks)
   b) \( gf(x) \) (2 marks)
   c) \( f^{-1}(x) \) (3 marks)

**3.** Solve \( |2x - 3| = 5 \) (4 marks)

**4.** Express \( \frac{5x - 2}{(2x - 1)(x + 3)} \) in partial fractions (4 marks)

**5.** Prove that the square of any odd number is odd (4 marks)

---

**Next Chapter: Coordinate Geometry** →

