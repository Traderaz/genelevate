# Chapter 10: Pythagoras and Trigonometry

## Learning Objectives

By the end of this chapter, you will be able to:
- Use Pythagoras' theorem to find missing sides in right-angled triangles
- Apply Pythagoras in 3D problems
- Use trigonometric ratios (sin, cos, tan) to find sides and angles
- Solve problems using the sine and cosine rules
- Calculate the area of triangles using ½absinC
- Apply trigonometry in real-world contexts

---

## 10.1 Pythagoras' Theorem

For any right-angled triangle:

**a² + b² = c²**

Where c is the **hypotenuse** (longest side, opposite the right angle)

```
    c
   /|
 a / |
  /  | b
 /   |
/___ |
```

### Finding the Hypotenuse

**Example 1:** Find the hypotenuse of a right-angled triangle with sides 3 cm and 4 cm.

Solution:
- a² + b² = c²
- 3² + 4² = c²
- 9 + 16 = c²
- 25 = c²
- c = √25 = **5 cm**

**Example 2:** A right-angled triangle has sides 5 cm and 12 cm. Find the hypotenuse.

Solution:
- 5² + 12² = c²
- 25 + 144 = c²
- 169 = c²
- c = **13 cm**

### Finding a Shorter Side

**Example 3:** The hypotenuse is 10 cm, one side is 6 cm. Find the other side.

Solution:
- 6² + b² = 10²
- 36 + b² = 100
- b² = 100 − 36 = 64
- b = **8 cm**

**Rearranged formula:** 
- To find a shorter side: a² = c² − b²

---

## 10.2 Applying Pythagoras

### Real-Life Problems

**Example 1:** A ladder of length 5 m leans against a wall. The base is 3 m from the wall. How high up the wall does it reach?

Solution:
```
    |  /
  h |  /5m
    | /
    |/___
      3m
```
- h² + 3² = 5²
- h² = 25 − 9 = 16
- h = **4 m**

**Example 2:** Find the length of the diagonal of a rectangle 6 cm by 8 cm.

Solution:
- d² = 6² + 8²
- d² = 36 + 64 = 100
- d = **10 cm**

---

## 10.3 Pythagoras in 3D (Higher Tier)

For 3D problems, often need Pythagoras twice.

**Example:** A cuboid has dimensions 3 cm × 4 cm × 5 cm. Find the length of the space diagonal (corner to opposite corner).

Solution:
Step 1: Find base diagonal
- d₁² = 3² + 4² = 9 + 16 = 25
- d₁ = 5 cm

Step 2: Use height and base diagonal
- d² = 5² + 5² = 25 + 25 = 50
- d = √50 = **5√2 cm** ≈ 7.07 cm

---

## 10.4 Trigonometric Ratios

For right-angled triangles, we use **SOH CAH TOA**:

```
      hypotenuse
       /|
      / |
     /  | opposite
    /   |
   /θ___|
   adjacent
```

**sin θ = Opposite / Hypotenuse** (SOH)
**cos θ = Adjacent / Hypotenuse** (CAH)
**tan θ = Opposite / Adjacent** (TOA)

### Finding Sides

**Example 1:** Find side x:

```
    /|
15 / |
  /  | x
 /40°|
/____| 
```

Solution:
- We have: hypotenuse (15), angle (40°), want opposite (x)
- Use sin: sin 40° = x/15
- x = 15 × sin 40°
- x = 15 × 0.643
- **x ≈ 9.64 cm**

**Example 2:** Find side y:

```
     /|
    / |
 y /  | 8
  /   |
 /30° |
/_____|
```

Solution:
- We have: opposite (8), angle (30°), want adjacent (y)
- Use tan: tan 30° = 8/y
- y = 8 / tan 30°
- y = 8 / 0.577
- **y ≈ 13.9 cm**

### Finding Angles

**Example 3:** Find angle θ:

```
    /|
 5 / |
  /  | 3
 /θ__|
```

Solution:
- We have: opposite (3), adjacent (5)
- Use tan: tan θ = 3/5 = 0.6
- θ = tan⁻¹(0.6)
- **θ ≈ 31.0°**

**Example 4:** Find angle α:

```
      /|
  10 / |
    /  | 6
   /α__|
```

Solution:
- We have: opposite (6), hypotenuse (10)
- Use sin: sin α = 6/10 = 0.6
- α = sin⁻¹(0.6)
- **α ≈ 36.9°**

---

## 10.5 Angles of Elevation and Depression

**Angle of elevation:** Looking UP from horizontal
**Angle of depression:** Looking DOWN from horizontal

**Example:** From a point 20 m from the base of a building, the angle of elevation to the top is 35°. Find the height of the building.

Solution:
```
       /|
      / |
     /  | h
    /35°|
   /____|
    20m
```
- tan 35° = h/20
- h = 20 × tan 35°
- h = 20 × 0.700
- **h ≈ 14.0 m**

---

## 10.6 Exact Trigonometric Values

### Special Angles

| Angle | sin | cos | tan |
|-------|-----|-----|-----|
| 0°    | 0   | 1   | 0   |
| 30°   | 1/2 | √3/2| 1/√3|
| 45°   | 1/√2| 1/√2| 1   |
| 60°   | √3/2| 1/2 | √3  |
| 90°   | 1   | 0   | undefined|

**Example:** Find the exact value of the height in a triangle with hypotenuse 10 cm and angle 30°.

Solution:
- sin 30° = h/10
- h = 10 × 1/2
- **h = 5 cm** (exact)

---

## 10.7 Sine Rule (Higher Tier)

For any triangle (not just right-angled):

**a/sin A = b/sin B = c/sin C**

Or rearranged: **sin A/a = sin B/b = sin C/c**

```
      B
     /\
  c /  \ a
   /    \
  /______\
 A   b    C
```

Use sine rule when you have:
- Two angles and one side, OR
- Two sides and a non-included angle

**Example 1:** In triangle ABC, angle A = 40°, angle B = 65°, side a = 8 cm. Find side b.

Solution:
- a/sin A = b/sin B
- 8/sin 40° = b/sin 65°
- b = (8 × sin 65°)/sin 40°
- b = (8 × 0.906)/0.643
- **b ≈ 11.3 cm**

**Example 2:** Find angle A if a = 7 cm, b = 9 cm, angle B = 80°.

Solution:
- sin A/a = sin B/b
- sin A = (a × sin B)/b
- sin A = (7 × sin 80°)/9
- sin A = 0.766
- **A ≈ 50.0°**

---

## 10.8 Cosine Rule (Higher Tier)

For any triangle:

**a² = b² + c² − 2bc cos A**

Or for finding an angle:
**cos A = (b² + c² − a²) / 2bc**

Use cosine rule when you have:
- Three sides (to find angle), OR
- Two sides and the included angle (to find third side)

**Example 1:** In triangle ABC, b = 8 cm, c = 6 cm, angle A = 50°. Find side a.

Solution:
- a² = 8² + 6² − 2(8)(6) cos 50°
- a² = 64 + 36 − 96 × 0.643
- a² = 100 − 61.7
- a² = 38.3
- **a ≈ 6.19 cm**

**Example 2:** In triangle PQR, p = 5 cm, q = 7 cm, r = 9 cm. Find angle Q.

Solution:
- cos Q = (p² + r² − q²) / 2pr
- cos Q = (25 + 81 − 49) / (2 × 5 × 9)
- cos Q = 57/90
- cos Q = 0.633
- **Q ≈ 50.7°**

---

## 10.9 Area of Triangle (Higher Tier)

**Area = ½ab sin C**

Where a and b are two sides, C is the included angle.

**Example 1:** Find the area of triangle with sides 6 cm and 8 cm, included angle 40°.

Solution:
- Area = ½ × 6 × 8 × sin 40°
- Area = 24 × 0.643
- **Area ≈ 15.4 cm²**

**Example 2:** A triangle has sides 10 cm and 12 cm with included angle 120°. Find its area.

Solution:
- Area = ½ × 10 × 12 × sin 120°
- Area = 60 × 0.866
- **Area ≈ 52.0 cm²**

---

## 10.10 Bearings

Bearings are measured **clockwise from North**.
- Always use 3 figures (e.g., 045°, not 45°)

**Example:** Point B is on a bearing of 120° from point A. What is the bearing of A from B?

Solution:
- Draw diagram with North lines
- Angle from B back to A = 120° + 180° = 300°
- **Bearing of A from B = 300°**

---

## Practice Questions

### Basic Questions

1. Find the hypotenuse: sides 5 cm and 12 cm
2. Find x if hypotenuse = 13 cm, one side = 5 cm
3. Find the height a ladder reaches if it's 10 m long and 6 m from the wall
4. In a right-angled triangle, sin θ = 0.5. Find θ.
5. Find x: opposite = 7, adjacent = 24, find hypotenuse

### Intermediate Questions

6. A triangle has base 10 cm and hypotenuse 15 cm. Find the angle between them.
7. From a point 30 m from a tower, the angle of elevation is 40°. Find tower height.
8. Find the diagonal of a rectangle 9 cm × 12 cm
9. If tan θ = 3/4, find θ
10. Find x using sin: hypotenuse 20 cm, opposite = x, angle = 35°

### Higher Tier Questions

11. In triangle ABC, a = 12 cm, b = 15 cm, angle C = 70°. Find side c using cosine rule.
12. In triangle PQR, p = 8 cm, angle P = 35°, angle Q = 75°. Find side q using sine rule.
13. Find angle A if sides are: a = 9 cm, b = 7 cm, c = 5 cm (use cosine rule)
14. Calculate area of triangle: sides 8 cm and 11 cm, included angle 55°
15. A cuboid is 4 cm × 6 cm × 3 cm. Find the space diagonal length.

---

## Exam-Style Questions

**Question 1** (Foundation - 4 marks)

```
     /|
 10 / |
   /  | h
  /37°|
 /____| 
```

Find the value of h. (4 marks)

**Question 2** (Foundation - 5 marks)

A ladder 6 m long leans against a wall.
The base of the ladder is 2 m from the wall.

(a) Calculate how far up the wall the ladder reaches. (3 marks)
(b) Calculate the angle the ladder makes with the ground. (2 marks)

**Question 3** (Higher - 6 marks)

In triangle ABC:
- AB = 12 cm
- BC = 15 cm  
- Angle ABC = 110°

(a) Calculate the area of triangle ABC. (3 marks)
(b) Use the cosine rule to calculate the length AC. (3 marks)

**Question 4** (Higher - 6 marks)

In triangle PQR:
- PQ = 9 cm
- PR = 11 cm
- QR = 14 cm

(a) Use the cosine rule to find angle P. (3 marks)
(b) Calculate the area of the triangle. (3 marks)

---

## Mark Scheme

### Practice Questions

1. 13 cm [5² + 12² = 169]
2. 12 cm [5² + x² = 13², x² = 144]
3. 8 m [6² + h² = 10², h² = 64]
4. 30° [sin⁻¹(0.5)]
5. 25 [7² + 24² = 625]
6. 48.2° [cos θ = 10/15]
7. 25.2 m [tan 40° = h/30]
8. 15 cm [9² + 12² = 225]
9. 36.9° [tan⁻¹(0.75)]
10. 11.5 cm [sin 35° = x/20]
11. 14.6 cm
12. 13.5 cm
13. 103.6° [use cos A = (b² + c² − a²)/2bc]
14. 36.1 cm² [½ × 8 × 11 × sin 55°]
15. 7.81 cm [base diag = √52, space diag = √(52+9)]

### Exam-Style Questions

**Question 1:**
sin 37° = h/10
h = 10 × sin 37° = 10 × 0.602
h = 6.02 cm (accept 6.0 cm)
**4 marks** (1 for correct ratio, 1 for substitution, 2 for calculation)

**Question 2:**
(a) h² + 2² = 6², h² = 32, h = √32 = 5.66 m - 3 marks
(b) cos θ = 2/6 = 0.333, θ = 70.5° - 2 marks

**Question 3:**
(a) Area = ½ × 12 × 15 × sin 110° = 84.6 cm² - 3 marks
(b) AC² = 12² + 15² − 2(12)(15)cos 110° = 492.2, AC = 22.2 cm - 3 marks

**Question 4:**
(a) cos P = (81 + 121 − 196)/(2 × 9 × 11) = 0.0303, P = 88.3° - 3 marks
(b) Area = ½ × 9 × 11 × sin 88.3° = 49.5 cm² - 3 marks

---

## Key Points to Remember

✓ Pythagoras: a² + b² = c² (right-angled triangles only)
✓ SOH CAH TOA for right-angled triangles
✓ Sine rule for any triangle: a/sin A = b/sin B = c/sin C
✓ Cosine rule for any triangle: a² = b² + c² − 2bc cos A
✓ Area of triangle = ½ab sin C
✓ Bearings measured clockwise from North (3 figures)
✓ Use inverse trig functions (sin⁻¹, cos⁻¹, tan⁻¹) to find angles

---

*Previous Chapter: [← Sequences](chapter-09-sequences.md)*
*[Back to Course Overview](README.md)*

## Congratulations! 🎉

You've completed the GCSE Mathematics revision guide! Make sure to:
- Practice past papers regularly
- Use the mark schemes to check your work
- Focus on topics you find challenging
- Time yourself to build exam technique

**Good luck with your exams!**

