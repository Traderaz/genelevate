# Chapter 7: Probability

## Learning Objectives

By the end of this chapter, you will be able to:
- Calculate basic probabilities
- Use probability scales and language
- Find probabilities of combined events
- Use tree diagrams and Venn diagrams
- Calculate relative frequency from experiments
- Understand mutually exclusive and independent events

---

## 7.1 Basic Probability

### Probability Scale

Probability ranges from 0 to 1:
- **0** = Impossible
- **0.5 or ½** = Evens (equally likely)
- **1** = Certain

**Probability formula:**

**P(event) = Number of favorable outcomes / Total number of possible outcomes**

**Example 1:** A dice is rolled. Find P(getting a 4)

Solution:
- Favorable outcomes = 1 (only one 4)
- Total outcomes = 6
- **P(4) = 1/6**

**Example 2:** A bag contains 3 red, 5 blue, and 2 green balls. Find P(red)

Solution:
- Total balls = 3 + 5 + 2 = 10
- **P(red) = 3/10**

---

## 7.2 Probability Rules

### Complementary Events

Events that cover all possibilities:

**P(A) + P(not A) = 1**

Or: **P(not A) = 1 − P(A)**

**Example:** P(rain) = 0.3. Find P(no rain)

Solution:
- P(no rain) = 1 − 0.3 = **0.7**

### Mutually Exclusive Events

Events that cannot happen at the same time.

**P(A or B) = P(A) + P(B)**

**Example:** Drawing a card from a deck. Find P(King or Queen)

Solution:
- P(King) = 4/52
- P(Queen) = 4/52
- P(King or Queen) = 4/52 + 4/52 = **8/52 = 2/13**

---

## 7.3 Relative Frequency

**Relative frequency** is probability based on experiments or data:

**Relative frequency = Number of times event occurs / Total number of trials**

**Example:** A dice is rolled 60 times. A six appears 12 times. Estimate P(six).

Solution:
- Relative frequency = 12/60 = **1/5 = 0.2**

**Note:** As the number of trials increases, relative frequency approaches the theoretical probability.

---

## 7.4 Expected Frequency

**Expected frequency = Probability × Number of trials**

**Example:** A fair coin is flipped 100 times. How many heads would you expect?

Solution:
- P(heads) = 0.5
- Expected heads = 0.5 × 100 = **50**

**Example:** A biased dice has P(6) = 0.25. It's rolled 80 times. How many sixes are expected?

Solution:
- Expected sixes = 0.25 × 80 = **20**

---

## 7.5 Two Events

### Listing Outcomes

Use sample space diagrams or lists.

**Example:** Two coins are flipped. List all possible outcomes.

Outcomes: **HH, HT, TH, TT** (4 outcomes)

**Example:** Two dice are rolled. Find P(total = 7)

Sample space: Create 6×6 grid
Outcomes with total 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes
Total outcomes = 36

**P(total = 7) = 6/36 = 1/6**

### Independent Events

Events where one doesn't affect the other.

**P(A and B) = P(A) × P(B)**

**Example:** Two coins are flipped. Find P(both heads)

Solution:
- P(first heads) = 1/2
- P(second heads) = 1/2
- P(both heads) = 1/2 × 1/2 = **1/4**

---

## 7.6 Tree Diagrams

Tree diagrams show all outcomes and probabilities for multiple events.

**Example:** A bag contains 3 red and 2 blue balls. Two balls are drawn with replacement. Find P(both red).

```
First ball          Second ball
     3/5 ────Red──── 3/5 ─── (Red, Red): 9/25
    /
   /         2/5 ─── Blue── (Red, Blue): 6/25
  /
──┤
  \         3/5 ─── Red─── (Blue, Red): 6/25
   \       /
    2/5 ──Blue
           \
            2/5 ─── Blue── (Blue, Blue): 4/25
```

**P(both red) = 3/5 × 3/5 = 9/25**

### Without Replacement

**Example:** Same bag, but balls NOT replaced. Find P(both red).

```
     3/5 ────Red──── 2/4 ─── (Red, Red): 6/20
    /
   /         2/4 ─── Blue── (Red, Blue): 6/20
  /
──┤
  \         3/4 ─── Red─── (Blue, Red): 6/20
   \       /
    2/5 ──Blue
           \
            1/4 ─── Blue── (Blue, Blue): 2/20
```

**P(both red) = 3/5 × 2/4 = 6/20 = 3/10**

### Tree Diagram Rules

1. Probabilities on each set of branches sum to 1
2. To find P(route), multiply along the branches
3. To find P(outcome), add the routes

---

## 7.7 Venn Diagrams (Higher Tier)

Shows relationships between sets.

**Example:** In a class of 30 students:
- 18 study French (F)
- 12 study Spanish (S)
- 5 study both

Draw a Venn diagram and find:
(a) P(French only)
(b) P(neither)

```
    ┌─────────────┐
    │      F      │   
    │  13 │ 5│    │   S
    │     └──┼─┐  │
    │        │7│  │
    └────────┼─┘  │
             └────┘
      Neither: 5
```

Solution:
- French only: 18 − 5 = 13
- Spanish only: 12 − 5 = 7
- Both: 5
- Neither: 30 − 13 − 5 − 7 = 5

(a) P(French only) = 13/30
(b) P(neither) = 5/30 = **1/6**

---

## 7.8 Conditional Probability (Higher Tier)

Probability that one event occurs given another has occurred.

**P(A|B)** means "probability of A given B"

**Formula:** P(A|B) = P(A and B) / P(B)

**Example:** In a school, 60% of students are boys. 30% of boys wear glasses. 20% of girls wear glasses. A student is randomly selected and wears glasses. Find P(boy|glasses).

Solution:
- P(boy with glasses) = 0.6 × 0.3 = 0.18
- P(girl with glasses) = 0.4 × 0.2 = 0.08
- P(glasses) = 0.18 + 0.08 = 0.26
- P(boy|glasses) = 0.18 / 0.26 = **9/13** ≈ 0.69

---

## Practice Questions

### Basic Questions

1. A bag contains 4 red and 6 blue balls. Find P(blue).
2. A dice is rolled. Find P(even number).
3. P(rain) = 0.35. Find P(no rain).
4. List all outcomes when a coin is flipped twice.
5. A spinner has 8 equal sections: 3 red, 5 blue. Find P(red).

### Intermediate Questions

6. Two dice are rolled. Find P(total of 5).
7. A coin is flipped 200 times. How many tails are expected?
8. Two balls are drawn from a bag of 5 red and 3 blue balls (with replacement). Find P(both blue).
9. In a trial, an event occurred 45 times out of 150. Estimate its probability.
10. Are "rolling a 6" and "rolling an odd number" mutually exclusive?

### Higher Tier Questions

11. Draw a tree diagram for drawing 2 balls without replacement from 4 red and 2 blue balls. Find P(different colors).
12. 40 students: 25 play football (F), 18 play tennis (T), 10 play both. Draw a Venn diagram and find P(neither).
13. A card is drawn from a standard deck. Find P(King|face card).
14. P(A) = 0.6, P(B) = 0.4, P(A and B) = 0.24. Are A and B independent?
15. Two events X and Y: P(X) = 0.7, P(Y) = 0.5, P(X or Y) = 0.9. Find P(X and Y).

---

## Exam-Style Questions

**Question 1** (Foundation - 4 marks)

A bag contains 5 red, 3 blue, and 2 green balls.
(a) Find P(red). (1 mark)
(b) Find P(not green). (2 marks)
(c) One ball is taken out and not replaced. Another ball is then taken. Find P(both red). (1 mark)

**Question 2** (Foundation - 5 marks)

A fair coin is flipped and a fair dice is rolled.
(a) List all possible outcomes. (2 marks)
(b) Find P(heads and 6). (2 marks)
(c) Find P(tails and even number). (1 mark)

**Question 3** (Higher - 6 marks)

A bag contains 6 red and 4 blue counters. Two counters are taken without replacement.

(a) Complete the tree diagram. (2 marks)
(b) Find P(both red). (2 marks)
(c) Find P(one of each color). (2 marks)

**Question 4** (Higher - 5 marks)

60 students were surveyed:
- 35 like pizza (P)
- 28 like burgers (B)
- 15 like both

(a) Draw a Venn diagram. (2 marks)
(b) Find P(pizza only). (1 mark)
(c) A student likes burgers. Find P(also likes pizza). (2 marks)

---

## Mark Scheme

### Practice Questions

1. 6/10 = 3/5
2. 3/6 = 1/2
3. 0.65
4. HH, HT, TH, TT
5. 3/8
6. 4/36 = 1/9 [(1,4), (2,3), (3,2), (4,1)]
7. 100
8. 9/64 [3/8 × 3/8]
9. 45/150 = 3/10 = 0.3
10. Yes (cannot roll 6 AND odd number)
11. P = 8/15
12. P(neither) = 7/40
13. 4/12 = 1/3
14. Yes [0.6 × 0.4 = 0.24]
15. 0.3 [0.7 + 0.5 − 0.9]

### Exam-Style Questions

**Question 1:**
(a) 5/10 = 1/2 - 1 mark
(b) 8/10 = 4/5 - 2 marks
(c) 5/10 × 4/9 = 20/90 = 2/9 - 1 mark

**Question 2:**
(a) H1, H2, H3, H4, H5, H6, T1, T2, T3, T4, T5, T6 - 2 marks
(b) 1/12 - 2 marks
(c) 3/12 = 1/4 - 1 mark

**Question 3:**
(a) Tree showing: Red 6/10, Blue 4/10; then Red 5/9, Blue 4/9 OR Red 6/9, Blue 3/9 - 2 marks
(b) 6/10 × 5/9 = 30/90 = 1/3 - 2 marks
(c) (6/10 × 4/9) + (4/10 × 6/9) = 24/90 + 24/90 = 48/90 = 8/15 - 2 marks

**Question 4:**
(a) Venn diagram showing: Pizza only 20, Both 15, Burgers only 13, Neither 12 - 2 marks
(b) 20/60 = 1/3 - 1 mark
(c) P(P|B) = 15/28 - 2 marks

---

## Key Points to Remember

✓ Probability is always between 0 and 1
✓ P(not A) = 1 − P(A)
✓ For independent events: P(A and B) = P(A) × P(B)
✓ For mutually exclusive events: P(A or B) = P(A) + P(B)
✓ On tree diagrams: multiply along branches, add different routes
✓ Probabilities change without replacement

---

*Previous Chapter: [← Ratio and Proportion](chapter-06-ratio-proportion.md)*
*Next Chapter: [Statistics →](chapter-08-statistics.md)*

