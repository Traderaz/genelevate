# Chapter 8: Statistics

## Learning Objectives

By the end of this chapter, you will be able to:
- Calculate mean, median, mode, and range
- Draw and interpret statistical charts and graphs
- Use frequency tables and grouped data
- Draw and interpret scatter graphs
- Use cumulative frequency diagrams
- Draw and interpret box plots
- Compare data sets using statistics

---

## 8.1 Averages and Range

### Mean

**Mean** = Sum of values / Number of values

**Example 1:** Find the mean of 5, 8, 12, 7, 3

Solution:
- Sum = 5 + 8 + 12 + 7 + 3 = 35
- Number of values = 5
- Mean = 35 ÷ 5 = **7**

### Median

**Median** = Middle value when arranged in order

**Example 2:** Find the median of 5, 12, 3, 8, 7

Solution:
- Arrange in order: 3, 5, 7, 8, 12
- Middle value = **7**

**For even number of values:** Find mean of middle two values

**Example 3:** Find median of 4, 7, 2, 9, 5, 8

Solution:
- Order: 2, 4, 5, 7, 8, 9
- Middle two: 5 and 7
- Median = (5 + 7) ÷ 2 = **6**

### Mode

**Mode** = Most common value

**Example 4:** Find the mode of 3, 5, 7, 5, 9, 5, 2

Solution:
- 5 appears 3 times (most frequent)
- Mode = **5**

**Note:** Data can have no mode, one mode, or multiple modes.

### Range

**Range** = Highest value − Lowest value

Measures **spread** of data.

**Example 5:** Find the range of 3, 8, 15, 6, 12

Solution:
- Highest = 15
- Lowest = 3
- Range = 15 − 3 = **12**

---

## 8.2 Frequency Tables

### Finding Averages from Tables

**Example:** Find the mean, mode, and median:

| Score | Frequency |
|-------|-----------|
| 1     | 2         |
| 2     | 5         |
| 3     | 8         |
| 4     | 3         |
| 5     | 2         |

**Mode:** 3 (highest frequency = 8)

**Mean:**
| Score | Frequency | Score × Frequency |
|-------|-----------|-------------------|
| 1     | 2         | 2                 |
| 2     | 5         | 10                |
| 3     | 8         | 24                |
| 4     | 3         | 12                |
| 5     | 2         | 10                |
| **Total** | **20** | **58**        |

Mean = 58 ÷ 20 = **2.9**

**Median:** 
- Total frequency = 20
- Median position = (20 + 1) ÷ 2 = 10.5th value
- Counting up: 2, 5, 8... by the 10th value we're in the "3" group
- Median = **3**

---

## 8.3 Grouped Data

For grouped data, we use **midpoints** and **modal class**.

**Example:** Find the mean and modal class:

| Height (cm) | Frequency |
|-------------|-----------|
| 150-160     | 5         |
| 160-170     | 12        |
| 170-180     | 8         |
| 180-190     | 3         |

**Modal class:** 160-170 (highest frequency)

**Estimated mean:**

| Height    | Midpoint | Frequency | Mid × Freq |
|-----------|----------|-----------|------------|
| 150-160   | 155      | 5         | 775        |
| 160-170   | 165      | 12        | 1980       |
| 170-180   | 175      | 8         | 1400       |
| 180-190   | 185      | 3         | 555        |
| **Total** |          | **28**    | **4710**   |

Estimated mean = 4710 ÷ 28 = **168.2 cm** (to 1 d.p.)

---

## 8.4 Statistical Charts

### Bar Charts

Used for discrete (separate) categories.
- Gaps between bars
- Height represents frequency

### Pie Charts

Shows proportions of a whole.
- Each sector angle = (Frequency ÷ Total) × 360°

**Example:** Draw a pie chart for:

| Color | Frequency |
|-------|-----------|
| Red   | 6         |
| Blue  | 8         |
| Green | 4         |
| Total | 18        |

**Angles:**
- Red: (6 ÷ 18) × 360° = 120°
- Blue: (8 ÷ 18) × 360° = 160°
- Green: (4 ÷ 18) × 360° = 80°

### Stem and Leaf Diagrams

**Example:** Display data: 23, 31, 28, 35, 32, 27, 38

```
Stem | Leaf
  2  | 3 7 8
  3  | 1 2 5 8

Key: 2|3 means 23
```

**Advantages:**
- Shows all individual values
- Easy to find median and range

---

## 8.5 Scatter Graphs (Higher Tier)

Shows relationship between two variables.

### Types of Correlation

1. **Positive correlation:** As one increases, the other increases
2. **Negative correlation:** As one increases, the other decreases
3. **No correlation:** No clear relationship

### Line of Best Fit

- Draw a straight line through the middle of points
- Should have roughly equal points above and below
- Use to make predictions (**interpolation** within data, **extrapolation** beyond)

**Example:** Scatter graph shows positive correlation between hours studied and exam score. Line of best fit allows prediction: 5 hours study → approximately 70% score.

---

## 8.6 Cumulative Frequency (Higher Tier)

Shows running total of frequencies.

**Example:** Draw cumulative frequency curve:

| Height (cm) | Frequency | Cumulative Frequency |
|-------------|-----------|----------------------|
| 140-150     | 3         | 3                    |
| 150-160     | 8         | 11                   |
| 160-170     | 15        | 26                   |
| 170-180     | 10        | 36                   |
| 180-190     | 4         | 40                   |

Plot cumulative frequency against **upper class boundary**.

### Finding Median and Quartiles

For n values:
- **Median** = n/2 th value
- **Lower quartile (Q1)** = n/4 th value
- **Upper quartile (Q3)** = 3n/4 th value

**Interquartile range (IQR)** = Q3 − Q1

For the example (n = 40):
- Median = 20th value ≈ 165 cm
- Q1 = 10th value ≈ 157 cm
- Q3 = 30th value ≈ 173 cm
- IQR = 173 − 157 = **16 cm**

---

## 8.7 Box Plots (Higher Tier)

Shows five key values:
1. Minimum
2. Lower quartile (Q1)
3. Median
4. Upper quartile (Q3)
5. Maximum

```
    |——————[====|====]——————|
   Min    Q1   Med  Q3    Max
```

**Example:** For data with:
- Min = 10, Q1 = 15, Median = 20, Q3 = 28, Max = 35

The box shows the middle 50% of data (Q1 to Q3).

### Comparing Data Sets

Use box plots to compare:
- **Medians:** Which is higher?
- **IQR:** Which is more consistent? (smaller IQR = less spread)
- **Range:** Overall spread

---

## 8.8 Comparing Data

### Which Average to Use?

| Average | Advantages | Disadvantages |
|---------|------------|---------------|
| **Mean** | Uses all data | Affected by extreme values |
| **Median** | Not affected by extremes | Doesn't use all data |
| **Mode** | Shows most common | May not exist or be useful |

### Spread

- **Range:** Simple but affected by extremes
- **IQR:** Not affected by extremes, shows middle 50%

---

## Practice Questions

### Basic Questions

1. Find the mean of: 4, 7, 9, 5, 10
2. Find the median of: 8, 3, 12, 5, 9, 7
3. Find the mode of: 2, 5, 3, 5, 7, 5, 8
4. Find the range of: 15, 8, 23, 12, 19
5. Which type of chart has gaps between bars?

### Intermediate Questions

6. Find the mean from this frequency table:
   | x | 2 | 3 | 4 | 5 |
   | Freq | 3 | 5 | 4 | 2 |

7. A pie chart shows 30% red. What is the sector angle?

8. Describe the correlation: As temperature increases, ice cream sales increase.

9. Find the modal class: 10-20 (freq 5), 20-30 (freq 12), 30-40 (freq 8)

10. Calculate the IQR if Q1 = 20 and Q3 = 35

### Higher Tier Questions

11. From grouped data with total frequency 80, find the position of the median.

12. For cumulative frequency data with n = 60, at what position is the upper quartile?

13. A box plot shows: Min 5, Q1 10, Median 15, Q3 22, Max 30. Find the IQR and range.

14. Two sets: Set A (mean 50, range 20) and Set B (mean 50, range 40). Which is more consistent?

15. Estimate the mean: 0-10 (freq 4), 10-20 (freq 7), 20-30 (freq 5), 30-40 (freq 4)

---

## Exam-Style Questions

**Question 1** (Foundation - 5 marks)

The marks of 11 students are: 45, 52, 38, 49, 55, 42, 51, 49, 48, 50, 46

(a) Find the median. (2 marks)
(b) Find the mean. (2 marks)
(c) Find the range. (1 mark)

**Question 2** (Foundation - 4 marks)

This frequency table shows test scores:

| Score | 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|
| Freq  | 2 | 5 | 8 | 6 | 4 |

(a) Write down the mode. (1 mark)
(b) Calculate the mean score. (3 marks)

**Question 3** (Higher - 6 marks)

The table shows times taken to complete a task:

| Time (secs) | 10-20 | 20-30 | 30-40 | 40-50 |
|-------------|-------|-------|-------|-------|
| Frequency   | 5     | 12    | 18    | 5     |

(a) Write down the modal class. (1 mark)
(b) Calculate an estimate for the mean time. (4 marks)
(c) Explain why your answer is an estimate. (1 mark)

**Question 4** (Higher - 5 marks)

From a cumulative frequency diagram with 80 students:
- Median height = 165 cm
- Q1 = 158 cm
- Q3 = 172 cm

(a) Find the interquartile range. (2 marks)
(b) Draw a box plot for this data if the minimum is 145 cm and maximum is 185 cm. (3 marks)

---

## Mark Scheme

### Practice Questions

1. 7 [(4+7+9+5+10) ÷ 5 = 35 ÷ 5]
2. 7.5 [Order: 3,5,7,8,9,12; middle two: 7 and 8]
3. 5
4. 15 (23 − 8)
5. Bar chart
6. 3.5 [(2×3 + 3×5 + 4×4 + 5×2) ÷ 14 = 49 ÷ 14]
7. 108° [30% of 360° = 0.3 × 360]
8. Positive correlation
9. 20-30
10. 15 (35 − 20)
11. 40th value (80 ÷ 2)
12. 45th value (60 × 3/4)
13. IQR = 12, Range = 25
14. Set A (smaller range)
15. 18.75 [(5×4 + 15×7 + 25×5 + 35×4) ÷ 20 = 375 ÷ 20]

### Exam-Style Questions

**Question 1:**
(a) Order: 38,42,45,46,48,49,49,50,51,52,55; Median = 49 - 2 marks
(b) Mean = 525 ÷ 11 = 47.7 (to 1 d.p.) - 2 marks
(c) Range = 17 (55 − 38) - 1 mark

**Question 2:**
(a) Mode = 3 - 1 mark
(b) (2×1 + 5×2 + 8×3 + 6×4 + 4×5) ÷ 25 = 87 ÷ 25 = 3.48 - 3 marks

**Question 3:**
(a) 30-40 - 1 mark
(b) Midpoints: 15, 25, 35, 45; 
    (15×5 + 25×12 + 35×18 + 45×5) ÷ 40 = 1230 ÷ 40 = 30.75 seconds - 4 marks
(c) We used midpoints/don't have exact values - 1 mark

**Question 4:**
(a) IQR = 14 cm (172 − 158) - 2 marks
(b) Box plot correctly showing all 5 values - 3 marks

---

## Key Points to Remember

✓ Mean uses all data but affected by extremes
✓ Median is the middle value when ordered
✓ Mode is most frequent value
✓ Range = highest − lowest
✓ For grouped data, use midpoints for calculations
✓ IQR = Q3 − Q1 (shows middle 50% spread)
✓ Correlation can be positive, negative, or none

---

*Previous Chapter: [← Probability](chapter-07-probability.md)*
*Next Chapter: [Sequences →](chapter-09-sequences.md)*

