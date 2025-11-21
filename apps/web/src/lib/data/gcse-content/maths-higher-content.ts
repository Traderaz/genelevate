/**
 * GCSE Mathematics Higher Tier - Complete Revision Content
 * Updated for 2025/2026 Academic Year
 * Covers: AQA 8300, Edexcel 1MA1, OCR J560, WJEC
 * Target Grades: 4-9 (focuses on Grade 7-9 content)
 * 
 * Uses same interface as Foundation tier for consistency
 */

import { LessonContent } from '../eleven-plus-content/verbal-reasoning-content';

const gcseMathsHigherContent: LessonContent[] = [
  // ==================== MODULE 1: SURDS & INDICES ====================
  {
    moduleNumber: 1,
    title: 'Surds & Indices',
    duration: '80 minutes',
    introduction: 'Master surds and index laws - essential Higher tier algebra for Grade 7+. Surds are roots that can\'t be simplified to whole numbers (like √2, √3). Index laws help manipulate powers efficiently. These skills underpin all advanced algebra!',
    
    keyPoints: [
      'Surd = √(number) that can\'t be simplified to a whole number (e.g., √2, √3, √5)',
      'Simplify surds: Find the largest square factor and take it out',
      'Index laws: aᵐ × aⁿ = aᵐ⁺ⁿ (add powers when multiplying)',
      'aᵐ ÷ aⁿ = aᵐ⁻ⁿ (subtract powers when dividing)',
      '(aᵐ)ⁿ = aᵐⁿ (multiply powers when raising to power)',
      'a⁰ = 1 (anything to power 0 equals 1)',
      'a⁻ⁿ = 1/aⁿ (negative power means reciprocal)'
    ],
    
    explanation: `
**SURDS**

**What is a Surd?**

A surd is a square root (or other root) that cannot be simplified to a whole number.

**Examples:**
- √2 is a surd (≈ 1.414...)
- √3 is a surd (≈ 1.732...)
- √4 is NOT a surd (= 2 exactly)
- √9 is NOT a surd (= 3 exactly)

**Why Use Surds?**

Surds give EXACT answers. √2 is exact, but 1.414 is only approximate.

**Simplifying Surds:**

**Rule:** √(a × b) = √a × √b

**Method:**
1. Find the largest square factor
2. Split into √(square) × √(other)
3. Simplify the square part

**Example 1:** Simplify √50

Step 1: Find square factors of 50
50 = 25 × 2 (25 is perfect square)

Step 2: Split
√50 = √(25 × 2) = √25 × √2

Step 3: Simplify
= 5√2

**Example 2:** Simplify √72

Square factors of 72: 4, 9, 36
Largest: 36

√72 = √(36 × 2) = √36 × √2 = 6√2

**Perfect Squares to Know:**
1² = 1, 2² = 4, 3² = 9, 4² = 16, 5² = 25
6² = 36, 7² = 49, 8² = 64, 9² = 81, 10² = 100
11² = 121, 12² = 144, 13² = 169, 14² = 196, 15² = 225

**Adding/Subtracting Surds:**

Only combine if they have the SAME surd part.

**Example:**
3√2 + 5√2 = 8√2 (like terms)
3√2 + 5√3 ≠ cannot combine (different surds)

**Multiplying Surds:**

√a × √b = √(ab)

**Example:**
√2 × √8 = √(2 × 8) = √16 = 4

Or: √8 = 2√2, so √2 × 2√2 = 2 × (√2)² = 2 × 2 = 4

**Rationalizing the Denominator:**

Don't leave surds on the bottom of fractions!

**Method:** Multiply top and bottom by the surd

**Example:** Simplify 1/√2

Multiply by √2/√2:
= (1 × √2)/(√2 × √2)
= √2/2

**INDEX LAWS**

**What are Indices?**

Indices (powers/exponents) show repeated multiplication.

x³ = x × x × x

**The 7 Index Laws:**

**1. Multiplying - ADD powers**
aᵐ × aⁿ = aᵐ⁺ⁿ

Example: x³ × x⁴ = x³⁺⁴ = x⁷

**2. Dividing - SUBTRACT powers**
aᵐ ÷ aⁿ = aᵐ⁻ⁿ

Example: x⁵ ÷ x² = x⁵⁻² = x³

**3. Power of a power - MULTIPLY**
(aᵐ)ⁿ = aᵐⁿ

Example: (x²)³ = x²ˣ³ = x⁶

**4. Power of zero = 1**
a⁰ = 1

Example: 5⁰ = 1, x⁰ = 1

**5. Negative power = reciprocal**
a⁻ⁿ = 1/aⁿ

Example: x⁻² = 1/x²
        2⁻³ = 1/2³ = 1/8

**6. Fractional power = root**
a^(1/n) = ⁿ√a

Example: x^(1/2) = √x
        8^(1/3) = ³√8 = 2

**7. Fractional power = power and root**
a^(m/n) = (ⁿ√a)ᵐ or ⁿ√(aᵐ)

Example: 8^(2/3) = (³√8)² = 2² = 4

**Common Index Calculations:**

**Example 1:** 2³ × 2⁴
= 2³⁺⁴ = 2⁷ = 128

**Example 2:** (3²)³
= 3²ˣ³ = 3⁶ = 729

**Example 3:** 5⁻² 
= 1/5² = 1/25

**Example 4:** 16^(1/2)
= √16 = 4

**Example 5:** 27^(2/3)
= (³√27)² = 3² = 9
`,
    
    examples: [
      {
        question: 'Simplify √50',
        workingOut: `Step 1: Find the largest square factor of 50
Factors of 50: 1, 2, 5, 10, 25, 50
Square factors: 1, 25
Largest square factor: 25

Step 2: Rewrite using this factor
50 = 25 × 2

Step 3: Split the surd
√50 = √(25 × 2)
    = √25 × √2

Step 4: Simplify
= 5 × √2
= 5√2

Check: 5√2 ≈ 5 × 1.414 = 7.07
√50 ≈ 7.07 ✓

Answer: 5√2`,
        answer: '5√2',
        explanation: 'To simplify √50: find largest square factor (25), split as √50 = √(25×2) = √25 × √2 = 5√2. Always look for perfect square factors: 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144...'
      },
      {
        question: 'Simplify: x⁵ ÷ x²',
        workingOut: `Step 1: Identify the index law
Dividing powers: aᵐ ÷ aⁿ = aᵐ⁻ⁿ

Step 2: Apply the law
x⁵ ÷ x² = x⁵⁻²

Step 3: Calculate
= x³

Check by expanding:
x⁵ ÷ x² = (x×x×x×x×x) ÷ (x×x)
        = x×x×x = x³ ✓

Answer: x³`,
        answer: 'x³',
        explanation: 'When dividing powers with same base, SUBTRACT the indices: x⁵ ÷ x² = x⁵⁻² = x³. Common mistake: multiplying indices (wrong!) or adding them (that\'s for multiplication). Remember: divide = subtract powers.'
      },
      {
        question: 'Simplify: (2x³)²',
        workingOut: `Step 1: Apply power to everything in bracket
(2x³)² = 2² × (x³)²

Step 2: Calculate each part
2² = 4
(x³)² = x³ˣ² = x⁶ (power of power: multiply)

Step 3: Combine
= 4x⁶

Check with x=1:
LHS: (2×1³)² = 2² = 4
RHS: 4×1⁶ = 4 ✓

Answer: 4x⁶`,
        answer: '4x⁶',
        explanation: 'Power outside bracket applies to EVERYTHING inside: (2x³)² = 2² × (x³)² = 4x⁶. For the x part, use (aᵐ)ⁿ = aᵐⁿ, so (x³)² = x⁶. Common mistake: only squaring one part or adding instead of multiplying powers.'
      },
      {
        question: 'Write 2⁻³ as a fraction',
        workingOut: `Step 1: Apply negative power rule
a⁻ⁿ = 1/aⁿ

Step 2: Substitute
2⁻³ = 1/2³

Step 3: Calculate the power
2³ = 2 × 2 × 2 = 8

Step 4: Write as fraction
= 1/8

Alternative check:
2⁻³ = 1 ÷ 2³ = 1 ÷ 8 = 1/8 ✓

Answer: 1/8`,
        answer: '1/8',
        explanation: 'Negative power means reciprocal: 2⁻³ = 1/2³ = 1/8. The negative flips it to denominator, then calculate the positive power normally. Common mistake: making the answer negative (2⁻³ ≠ -8!).'
      },
      {
        question: 'Evaluate: 27^(2/3)',
        workingOut: `Step 1: Understand fractional power
a^(m/n) = (ⁿ√a)ᵐ
Denominator = root, Numerator = power

Step 2: Identify parts
27^(2/3) = (³√27)²
Cube root first, then square

Step 3: Calculate cube root
³√27 = 3 (because 3³ = 27)

Step 4: Square the result
= 3²
= 9

Alternative method:
27^(2/3) = (27²)^(1/3) = ³√(729) = 9

Answer: 9`,
        answer: '9',
        explanation: 'Fractional power a^(m/n): denominator (n) = root, numerator (m) = power. So 27^(2/3) = (³√27)² = 3² = 9. Two methods: root then power, OR power then root (both work!). Common mistake: multiplying 27 by 2/3 instead of using power rules.'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Simplify √72',
        options: ['6√2', '8√3', '9√2', '2√36'],
        answer: '6√2',
        explanation: '72 = 36 × 2, so √72 = √36 × √2 = 6√2. Largest square factor is 36.',
        difficulty: 'medium'
      },
      {
        question: 'Simplify: x⁷ × x³',
        options: ['x¹⁰', 'x²¹', 'x⁴', 'x¹⁰/³'],
        answer: 'x¹⁰',
        explanation: 'Multiply powers: ADD indices. x⁷ × x³ = x⁷⁺³ = x¹⁰',
        difficulty: 'easy'
      },
      {
        question: 'Simplify: (x⁴)³',
        options: ['x¹²', 'x⁷', 'x⁶⁴', 'x'],
        answer: 'x¹²',
        explanation: 'Power of power: MULTIPLY indices. (x⁴)³ = x⁴ˣ³ = x¹²',
        difficulty: 'easy'
      },
      {
        question: 'What is 5⁰?',
        options: ['1', '0', '5', 'undefined'],
        answer: '1',
        explanation: 'Any number to power 0 equals 1. a⁰ = 1 always!',
        difficulty: 'easy'
      },
      {
        question: 'Write x⁻⁴ with positive power',
        options: ['1/x⁴', '-x⁴', '1/4x', '-1/x⁴'],
        answer: '1/x⁴',
        explanation: 'Negative power = reciprocal. x⁻⁴ = 1/x⁴',
        difficulty: 'medium'
      },
      {
        question: 'Simplify: √2 × √8',
        options: ['4', '√16', '2√2', '√10'],
        answer: '4',
        explanation: '√2 × √8 = √(2×8) = √16 = 4. Or: √8 = 2√2, so √2 × 2√2 = 2×2 = 4',
        difficulty: 'medium'
      },
      {
        question: 'What is 16^(1/2)?',
        options: ['4', '8', '2', '256'],
        answer: '4',
        explanation: 'Power 1/2 means square root. 16^(1/2) = √16 = 4',
        difficulty: 'medium'
      },
      {
        question: 'Simplify: 3√5 + 2√5',
        options: ['5√5', '5√10', '6√5', '√50'],
        answer: '5√5',
        explanation: 'Like terms (same surd): add coefficients. 3√5 + 2√5 = 5√5',
        difficulty: 'easy'
      },
      {
        question: 'Evaluate: 8^(2/3)',
        options: ['4', '2', '16', '512'],
        answer: '4',
        explanation: '8^(2/3) = (³√8)² = 2² = 4. Cube root of 8 is 2, then square it.',
        difficulty: 'hard'
      },
      {
        question: 'Rationalize: 1/√3',
        options: ['√3/3', '1/3', '3/√3', '√3'],
        answer: '√3/3',
        explanation: 'Multiply by √3/√3: (1×√3)/(√3×√3) = √3/3. Get surd out of denominator!',
        difficulty: 'hard'
      }
    ],
    
    tips: [
      '⭐ Learn perfect squares up to 15² = 225 for quick surd simplification',
      '⭐ For index laws: Multiply=ADD, Divide=SUBTRACT, Power=MULTIPLY',
      '⭐ a⁰ = 1 always (except 0⁰ which is undefined)',
      '⭐ Negative power flips to denominator: a⁻ⁿ = 1/aⁿ',
      '⭐ Fractional power: denominator=root, numerator=power',
      '⭐ Only combine surds with SAME root part (3√2 + 5√2 = 8√2)',
      '⭐ Always rationalize denominators (no surds on bottom!)',
      '⭐ Check answers by substituting x=2 or calculating approximate values'
    ],
    
    commonMistakes: [
      '❌ Multiplying powers when should add: x² × x³ ≠ x⁶ (correct: x⁵)',
      '❌ Adding powers when should multiply: (x²)³ ≠ x⁵ (correct: x⁶)',
      '❌ Thinking a⁰ = 0 (correct: a⁰ = 1)',
      '❌ Making negative powers negative: 2⁻³ ≠ -8 (correct: 1/8)',
      '❌ Not finding largest square factor for surds',
      '❌ Combining unlike surds: √2 + √3 ≠ √5',
      '❌ Forgetting to apply power to coefficient: (2x)³ ≠ 2x³ (correct: 8x³)',
      '❌ Leaving surds in denominators (must rationalize!)'
    ],
    
    examStrategy: `
**Question Types & Marks:**

**Simplify surds (2 marks):**
- Find largest square factor
- Show split and simplification

**Index law calculations (1-2 marks):**
- State which law
- Show working

**Rationalize denominator (2-3 marks):**
- Multiply by surd/surd
- Simplify fully

**Mixed problems (3-4 marks):**
- Multiple steps
- Show all working

**Grade Boundaries:**
- Grade 7: Master basic surds and simple index laws
- Grade 8: Rationalize, harder indices, fractional powers
- Grade 9: Complex combinations, prove using index laws

**Top Tips:**
1. **Learn index laws by heart** - write them down if unsure
2. **Show every step** - method marks available even if answer wrong
3. **Check with calculator** - approximate surd values to verify
4. **Practice perfect squares** - speeds up surd simplification massively
5. **Don't rush** - careless sign errors lose easy marks!

This topic appears on EVERY Higher paper - usually 3-6 marks total!
`
  },

  // ==================== MODULE 2: STANDARD FORM ====================
  {
    moduleNumber: 2,
    title: 'Standard Form (Scientific Notation)',
    duration: '60 minutes',
    introduction: 'Master writing and calculating with very large and very small numbers using standard form (A × 10ⁿ). Essential for science, real-world problems, and calculator work. Appears in every Higher paper!',
    
    keyPoints: [
      'Standard form: A × 10ⁿ where 1 ≤ A < 10 (A must be between 1 and 10)',
      'Large numbers: Positive power (e.g., 5000 = 5 × 10³)',
      'Small numbers: Negative power (e.g., 0.005 = 5 × 10⁻³)',
      'Count decimal moves: Left = positive power, Right = negative power',
      'Multiplying: Multiply A parts, add powers',
      'Dividing: Divide A parts, subtract powers',
      'Use calculator EXP or ×10ˣ button for calculations'
    ],
    
    explanation: `
**STANDARD FORM**

**What is Standard Form?**

Standard form (scientific notation) expresses numbers as:

**A × 10ⁿ**

Where:
- **A** is a number between 1 and 10 (1 ≤ A < 10)
- **n** is an integer (positive, negative, or zero)

**Why Use Standard Form?**

Makes very large or very small numbers easier to:
- Write (3,000,000 = 3 × 10⁶)
- Read (0.000005 = 5 × 10⁻⁶)
- Calculate (especially multiplication/division)
- Compare sizes

**WRITING IN STANDARD FORM**

**Large Numbers (Positive Power):**

**Example 1:** Write 3000 in standard form

Step 1: Move decimal left until 1 ≤ A < 10
3000. → 3.000
Moved 3 places left

Step 2: Count moves = power
Moved 3 places = 10³

Step 3: Write in standard form
3000 = 3 × 10³

**Example 2:** Write 45,000 in standard form

45000. → 4.5000
Moved 4 places left
= 4.5 × 10⁴

**Small Numbers (Negative Power):**

**Example 3:** Write 0.0006 in standard form

Step 1: Move decimal right until 1 ≤ A < 10
0.0006 → 6.
Moved 4 places right

Step 2: Count moves = negative power
Moved 4 places right = 10⁻⁴

Step 3: Write in standard form
0.0006 = 6 × 10⁻⁴

**Example 4:** Write 0.00032 in standard form

0.00032 → 3.2
Moved 4 places right
= 3.2 × 10⁻⁴

**Quick Rule:**
- Move decimal LEFT → POSITIVE power
- Move decimal RIGHT → NEGATIVE power

**CONVERTING FROM STANDARD FORM**

**Example 5:** Write 2.5 × 10⁴ as an ordinary number

10⁴ = 10,000
2.5 × 10,000 = 25,000

Or: Move decimal 4 places RIGHT
2.5 → 25000.
= 25,000

**Example 6:** Write 7 × 10⁻³ as an ordinary number

10⁻³ = 0.001
7 × 0.001 = 0.007

Or: Move decimal 3 places LEFT
7. → 0.007
= 0.007

**CALCULATING WITH STANDARD FORM**

**Multiplication:**

**(A × 10ᵐ) × (B × 10ⁿ) = (A × B) × 10ᵐ⁺ⁿ**

Steps:
1. Multiply the A parts
2. Add the powers
3. Adjust if A ≥ 10

**Example 7:** (3 × 10⁴) × (2 × 10⁵)

Step 1: Multiply A parts
3 × 2 = 6

Step 2: Add powers
10⁴ × 10⁵ = 10⁴⁺⁵ = 10⁹

Step 3: Combine
= 6 × 10⁹

**Example 8:** (5 × 10³) × (4 × 10²)

5 × 4 = 20
10³ × 10² = 10⁵
= 20 × 10⁵

But 20 is NOT between 1 and 10!
Adjust: 20 = 2 × 10¹
= 2 × 10¹ × 10⁵ = 2 × 10⁶

**Division:**

**(A × 10ᵐ) ÷ (B × 10ⁿ) = (A ÷ B) × 10ᵐ⁻ⁿ**

Steps:
1. Divide the A parts
2. Subtract the powers
3. Adjust if A < 1

**Example 9:** (8 × 10⁷) ÷ (2 × 10³)

Step 1: Divide A parts
8 ÷ 2 = 4

Step 2: Subtract powers
10⁷ ÷ 10³ = 10⁷⁻³ = 10⁴

Step 3: Combine
= 4 × 10⁴

**Example 10:** (6 × 10⁵) ÷ (8 × 10²)

6 ÷ 8 = 0.75
10⁵ ÷ 10² = 10³
= 0.75 × 10³

But 0.75 is NOT between 1 and 10!
Adjust: 0.75 = 7.5 × 10⁻¹
= 7.5 × 10⁻¹ × 10³ = 7.5 × 10²

**Addition/Subtraction:**

MUST have same power!

**Example 11:** (3 × 10⁴) + (5 × 10⁴)

Same power (10⁴), so add A parts:
(3 + 5) × 10⁴ = 8 × 10⁴

**Example 12:** (4 × 10⁵) + (2 × 10⁴)

Different powers! Convert to same:
4 × 10⁵ = 40 × 10⁴
Now: 40 × 10⁴ + 2 × 10⁴ = 42 × 10⁴
Adjust: 42 × 10⁴ = 4.2 × 10⁵

**USING A CALCULATOR**

**Entering Standard Form:**

Use **EXP** or **×10ˣ** button

For 3 × 10⁴:
Type: 3 [EXP] 4
Display shows: 3⁰⁴ or 3 E 4

**NOT:** 3 × 10 ^ 4
(Calculator will calculate 10⁴ first!)

**Calculator Display:**

3.5⁰⁴ means 3.5 × 10⁴
6.2⁻⁰³ means 6.2 × 10⁻³

**COMPARING SIZES**

**Which is bigger: 3 × 10⁵ or 7 × 10⁴?**

Method 1: Compare powers first
10⁵ > 10⁴
So 3 × 10⁵ is bigger

Method 2: Convert to ordinary
3 × 10⁵ = 300,000
7 × 10⁴ = 70,000
300,000 > 70,000

**Ordering:**

Example: Put in order: 5×10³, 2×10⁵, 8×10⁴

Order by power: 10³ < 10⁴ < 10⁵
So: 5×10³ < 8×10⁴ < 2×10⁵

**REAL-WORLD EXAMPLES**

- Distance to Sun: 1.5 × 10⁸ km
- Mass of electron: 9.11 × 10⁻³¹ kg
- World population: ≈ 8 × 10⁹ people
- Speed of light: 3 × 10⁸ m/s
- Size of atom: ≈ 1 × 10⁻¹⁰ m
`,
    
    examples: [
      {
        question: 'Write 45,000 in standard form',
        workingOut: `Step 1: Place decimal after first digit
45,000 = 4.5000

Step 2: Count how many places decimal moved
45000. → 4.5000
Moved LEFT 4 places

Step 3: Write as A × 10ⁿ
A = 4.5
n = 4 (positive because moved left)

Answer: 4.5 × 10⁴

Check: 4.5 × 10,000 = 45,000 ✓

Remember: 1 ≤ A < 10, so 4.5 is correct (not 45 or 0.45)`,
        answer: '4.5 × 10⁴',
        explanation: 'Move decimal left until between 1 and 10: 45000 → 4.5 (moved 4 places). Moved LEFT means POSITIVE power. Answer: 4.5 × 10⁴. Common mistake: writing 45 × 10³ (A must be < 10!)'
      },
      {
        question: 'Write 0.00032 in standard form',
        workingOut: `Step 1: Place decimal after first non-zero digit
0.00032 = 3.2

Step 2: Count how many places decimal moved
0.00032 → 3.2
Moved RIGHT 4 places

Step 3: Write as A × 10ⁿ
A = 3.2
n = -4 (negative because moved right)

Answer: 3.2 × 10⁻⁴

Check: 3.2 × 0.0001 = 0.00032 ✓

Remember: Small numbers (< 1) always have NEGATIVE power`,
        answer: '3.2 × 10⁻⁴',
        explanation: 'Move decimal right until between 1 and 10: 0.00032 → 3.2 (moved 4 places). Moved RIGHT means NEGATIVE power. Answer: 3.2 × 10⁻⁴. Small numbers always have negative powers!'
      },
      {
        question: 'Calculate: (3 × 10⁴) × (2 × 10⁵)',
        workingOut: `Step 1: Multiply the A parts (front numbers)
3 × 2 = 6

Step 2: Add the powers (multiply rule for indices)
10⁴ × 10⁵ = 10⁴⁺⁵ = 10⁹

Step 3: Combine
= 6 × 10⁹

Step 4: Check A is between 1 and 10
6 is between 1 and 10 ✓
Already in standard form!

Answer: 6 × 10⁹

Check makes sense: 30,000 × 200,000 = 6,000,000,000 = 6×10⁹ ✓`,
        answer: '6 × 10⁹',
        explanation: 'Multiply: A parts multiply (3×2=6), powers add (10⁴ × 10⁵ = 10⁹). Result: 6 × 10⁹. Remember: when multiplying in standard form, ADD the powers, just like index laws!'
      },
      {
        question: 'Calculate: (8 × 10⁷) ÷ (2 × 10³)',
        workingOut: `Step 1: Divide the A parts
8 ÷ 2 = 4

Step 2: Subtract the powers (divide rule for indices)
10⁷ ÷ 10³ = 10⁷⁻³ = 10⁴

Step 3: Combine
= 4 × 10⁴

Step 4: Check A is between 1 and 10
4 is between 1 and 10 ✓
Already in standard form!

Answer: 4 × 10⁴

Check: 80,000,000 ÷ 2,000 = 40,000 = 4×10⁴ ✓`,
        answer: '4 × 10⁴',
        explanation: 'Divide: A parts divide (8÷2=4), powers subtract (10⁷ ÷ 10³ = 10⁴). Result: 4 × 10⁴. Remember: when dividing in standard form, SUBTRACT the powers!'
      },
      {
        question: 'Write 2.5 × 10⁻³ as an ordinary number',
        workingOut: `Step 1: Understand the power
10⁻³ means move decimal 3 places LEFT
(Negative power = small number)

Step 2: Start with 2.5
2.5

Step 3: Move decimal 3 places LEFT
2.5 → 0.0025
(Add zeros as needed)

Answer: 0.0025

Alternative method:
10⁻³ = 1/1000 = 0.001
2.5 × 0.001 = 0.0025 ✓

Check: 0.0025 = 2.5 × 10⁻³ ✓`,
        answer: '0.0025',
        explanation: 'Negative power means small number: move decimal LEFT. 2.5 × 10⁻³: move decimal 3 places left → 0.0025. Or calculate: 2.5 × (1/1000) = 2.5 × 0.001 = 0.0025.'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Write 7,000,000 in standard form',
        options: ['7 × 10⁶', '7 × 10⁷', '70 × 10⁶', '0.7 × 10⁷'],
        answer: '7 × 10⁶',
        explanation: 'Move decimal 6 places left: 7000000 → 7. Answer: 7 × 10⁶',
        difficulty: 'easy'
      },
      {
        question: 'Write 0.0005 in standard form',
        options: ['5 × 10⁻⁴', '5 × 10⁴', '0.5 × 10⁻³', '5 × 10⁻³'],
        answer: '5 × 10⁻⁴',
        explanation: 'Move decimal 4 places right: 0.0005 → 5. Negative power! 5 × 10⁻⁴',
        difficulty: 'easy'
      },
      {
        question: 'Which is largest: 3×10⁵, 8×10⁴, 2×10⁶?',
        options: ['2×10⁶', '3×10⁵', '8×10⁴', 'All equal'],
        answer: '2×10⁶',
        explanation: 'Compare powers first: 10⁶ > 10⁵ > 10⁴. So 2×10⁶ is largest.',
        difficulty: 'medium'
      },
      {
        question: '(4×10³) × (3×10²) = ?',
        options: ['1.2×10⁶', '12×10⁵', '1.2×10⁵', '12×10⁶'],
        answer: '1.2×10⁶',
        explanation: '4×3=12, 10³×10²=10⁵. So 12×10⁵ = 1.2×10⁶ (adjust A<10)',
        difficulty: 'medium'
      },
      {
        question: '(9×10⁸) ÷ (3×10⁵) = ?',
        options: ['3×10³', '6×10³', '3×10¹³', '27×10³'],
        answer: '3×10³',
        explanation: '9÷3=3, 10⁸÷10⁵=10³. Answer: 3×10³',
        difficulty: 'medium'
      },
      {
        question: 'Write 4.2 × 10⁴ as ordinary number',
        options: ['42000', '4200', '420000', '0.00042'],
        answer: '42000',
        explanation: 'Move decimal 4 places right: 4.2 → 42000',
        difficulty: 'easy'
      },
      {
        question: 'Write 6 × 10⁻² as ordinary number',
        options: ['0.06', '0.6', '600', '0.006'],
        answer: '0.06',
        explanation: 'Move decimal 2 places left: 6 → 0.06. Negative power = small!',
        difficulty: 'easy'
      },
      {
        question: 'What must A be in A × 10ⁿ?',
        options: ['1 ≤ A < 10', 'A > 10', 'A < 1', 'Any number'],
        answer: '1 ≤ A < 10',
        explanation: 'A must be between 1 and 10 (including 1, but not 10)',
        difficulty: 'easy'
      },
      {
        question: '(2×10⁴) + (5×10⁴) = ?',
        options: ['7×10⁴', '7×10⁸', '10×10⁴', '7×10¹⁶'],
        answer: '7×10⁴',
        explanation: 'Same power: add A parts. (2+5)×10⁴ = 7×10⁴',
        difficulty: 'medium'
      },
      {
        question: 'Large numbers have ___ powers',
        options: ['Positive', 'Negative', 'Zero', 'Fractional'],
        answer: 'Positive',
        explanation: 'Large numbers (>1): positive power. Small numbers (<1): negative power.',
        difficulty: 'easy'
      }
    ],
    
    tips: [
      '⭐ A must always be between 1 and 10 (1 ≤ A < 10)',
      '⭐ Decimal moves LEFT → POSITIVE power, RIGHT → NEGATIVE power',
      '⭐ Multiply: multiply A, ADD powers | Divide: divide A, SUBTRACT powers',
      '⭐ Use calculator EXP button, NOT 3 × 10 ^ 4',
      '⭐ Check answer: large number = positive power, small = negative',
      '⭐ If A ≥ 10 or A < 1 after calculation, adjust to standard form',
      '⭐ Adding/subtracting: powers must be the same first!',
      '⭐ Compare sizes: look at powers first (10⁶ > 10⁵ always)'
    ],
    
    commonMistakes: [
      '❌ Writing A outside 1-10 range: 45 × 10³ (should be 4.5 × 10⁴)',
      '❌ Wrong sign on power: 0.003 as 3 × 10³ (should be 3 × 10⁻³)',
      '❌ Typing 3 × 10 ^ 4 in calculator (use EXP button!)',
      '❌ Multiplying powers instead of adding: 10³ × 10² ≠ 10⁶',
      '❌ Adding powers when dividing: 10⁷ ÷ 10³ ≠ 10¹⁰',
      '❌ Miscounting decimal places (be careful!)',
      '❌ Forgetting to adjust if A ≥ 10 after calculation',
      '❌ Adding different powers without converting first'
    ],
    
    examStrategy: `
**Question Types & Marks:**

**Write in standard form (1-2 marks):**
- Count decimal moves carefully
- Check 1 ≤ A < 10
- Use correct sign on power

**Convert to ordinary (1 mark):**
- Move decimal n places
- Positive = right, Negative = left

**Calculations (2-3 marks):**
- Show working clearly
- State: multiply A, add/subtract powers
- Adjust to standard form if needed

**Word problems (3-4 marks):**
- Extract numbers
- Calculate using standard form
- Convert answer if asked

**Grade Boundaries:**
- Grade 6: Write and convert standard form
- Grade 7: Multiply and divide in standard form
- Grade 8-9: Complex calculations, adjusting answers

**Calculator Technique:**

**DO:**
✓ Use EXP or ×10ˣ button
✓ Write down intermediate steps
✓ Check answer makes sense

**DON'T:**
✗ Type 3 × 10 ^ 4 (calculator calculates 10⁴ first!)
✗ Forget to check final answer is in standard form
✗ Panic if calculator shows E notation (it's standard form!)

**Time Management:**
- Simple conversions: 1 minute
- Calculations: 2-3 minutes
- Word problems: 3-4 minutes

**Top Scoring Tips:**

1. **Count decimal moves carefully** - use fingers or mark on paper
2. **Always check A is between 1 and 10** - easy mark to lose!
3. **Show your working** - method marks even if answer wrong
4. **Use calculator correctly** - EXP button, not ^ button
5. **Verify answer makes sense** - large number = positive power

**Common Exam Contexts:**
- Science (speed of light, mass of particles)
- Geography (population, distances)
- Technology (computer storage, data)
- Money (national debt, GDP)

**Quick Checks:**
✓ Is A between 1 and 10?
✓ Is power sign correct (positive for large, negative for small)?
✓ Did I use index laws correctly (add for ×, subtract for ÷)?
✓ Does my answer make sense in context?

**Practice Priority:**
Standard form appears in EVERY Higher paper!
- Typical: 2-4 marks per paper
- Often combined with other topics
- Calculator question = use standard form efficiently!

Master this = guaranteed marks every exam!
`
  },

  // ==================== MODULE 3: ADVANCED ALGEBRA (FACTORIZING QUADRATICS) ====================
  {
    moduleNumber: 3,
    title: 'Advanced Algebra (Factorizing Quadratics)',
    duration: '90 minutes',
    introduction: 'Master factorizing quadratic expressions (ax² + bx + c) and solve quadratic equations. Essential Grade 7-9 skill that underpins all advanced algebra. Factorizing is the KEY to solving quadratics efficiently!',
    
    keyPoints: [
      'Quadratic: Expression with x² as highest power (ax² + bx + c)',
      'Factorize x² + bx + c: Find two numbers that multiply to c and add to b',
      'Difference of two squares: a² - b² = (a + b)(a - b)',
      'Always check by expanding brackets (FOIL method)',
      'To solve: Factorize first, then set each bracket = 0',
      'If (x + a)(x + b) = 0, then x = -a or x = -b',
      'Perfect square: x² + 6x + 9 = (x + 3)²'
    ],
    
    explanation: `
**QUADRATIC EXPRESSIONS**

**What is a Quadratic?**

A quadratic expression has the form:
**ax² + bx + c**

Where:
- a, b, c are constants (numbers)
- x² is the highest power (degree 2)
- a ≠ 0 (otherwise not quadratic!)

**Examples:**
- x² + 5x + 6 (a=1, b=5, c=6)
- 2x² - 7x + 3 (a=2, b=-7, c=3)
- x² - 16 (a=1, b=0, c=-16)

**FACTORIZING SIMPLE QUADRATICS (a = 1)**

**Form: x² + bx + c**

**Method:** Find two numbers that:
1. **Multiply** to give c (constant term)
2. **Add** to give b (coefficient of x)

**Example 1:** Factorize x² + 5x + 6

Step 1: Need two numbers
- Multiply to: 6
- Add to: 5

Step 2: List factor pairs of 6
1 × 6 = 6, and 1 + 6 = 7 ✗
2 × 3 = 6, and 2 + 3 = 5 ✓

Step 3: Write as brackets
(x + 2)(x + 3)

Step 4: Check by expanding (FOIL)
(x + 2)(x + 3)
= x² + 3x + 2x + 6
= x² + 5x + 6 ✓

**Example 2:** Factorize x² + 7x + 12

Numbers multiply to 12, add to 7:
Factor pairs of 12: 1×12, 2×6, 3×4
3 + 4 = 7 ✓

Answer: (x + 3)(x + 4)

**NEGATIVE COEFFICIENTS**

**Example 3:** Factorize x² - 7x + 12

Multiply to: +12
Add to: -7

Both negative! (-3) × (-4) = 12
(-3) + (-4) = -7 ✓

Answer: (x - 3)(x - 4)

**Example 4:** Factorize x² + x - 12

Multiply to: -12 (one positive, one negative)
Add to: +1

Try: 4 × (-3) = -12, and 4 + (-3) = 1 ✓

Answer: (x + 4)(x - 3)

**Sign Rules:**
- **c positive, b positive:** Both brackets +
- **c positive, b negative:** Both brackets -
- **c negative:** One bracket +, one bracket -

**DIFFERENCE OF TWO SQUARES**

**Formula: a² - b² = (a + b)(a - b)**

This is a special case - very quick to factorize!

**Example 5:** Factorize x² - 16

Recognize: x² - 16 = x² - 4²

This is a² - b² where a = x, b = 4

= (x + 4)(x - 4)

Check: (x + 4)(x - 4) = x² - 4x + 4x - 16 = x² - 16 ✓

**Example 6:** Factorize x² - 25

= x² - 5²
= (x + 5)(x - 5)

**Example 7:** Factorize 4x² - 9

= (2x)² - 3²
= (2x + 3)(2x - 3)

**Key:** No middle term (bx term is 0)!

**PERFECT SQUARE TRINOMIALS**

**Patterns:**
- x² + 2ax + a² = (x + a)²
- x² - 2ax + a² = (x - a)²

**Example 8:** Factorize x² + 6x + 9

Check if perfect square:
First term: x² → x
Last term: 9 → 3
Middle: 2 × x × 3 = 6x ✓

= (x + 3)²

Check: (x + 3)² = (x + 3)(x + 3) = x² + 6x + 9 ✓

**FACTORIZING WITH COEFFICIENT > 1**

**Form: ax² + bx + c where a > 1**

**Method 1: Trial and improvement**

**Example 9:** Factorize 2x² + 7x + 3

Step 1: First bracket must give 2x²
Options: (2x...)(x...)

Step 2: Last term = 3
Options: 3×1

Step 3: Try combinations
(2x + 1)(x + 3):
Check middle: 2x×3 + 1×x = 6x + x = 7x ✓

Answer: (2x + 1)(x + 3)

**Example 10:** Factorize 3x² + 11x + 6

First term: (3x...)(x...)
Last term: 6 options: 6×1, 3×2

Try (3x + 2)(x + 3):
Middle: 3x×3 + 2×x = 9x + 2x = 11x ✓

Answer: (3x + 2)(x + 3)

**SOLVING QUADRATIC EQUATIONS**

**Zero Product Rule:**
If A × B = 0, then A = 0 or B = 0

**Method:**
1. Rearrange to = 0
2. Factorize left side
3. Set each bracket = 0
4. Solve for x

**Example 11:** Solve x² + 5x + 6 = 0

Step 1: Already = 0 ✓

Step 2: Factorize
(x + 2)(x + 3) = 0

Step 3: Set each bracket = 0
x + 2 = 0  OR  x + 3 = 0

Step 4: Solve
x = -2  OR  x = -3

Check x = -2: (-2)² + 5(-2) + 6 = 4 - 10 + 6 = 0 ✓
Check x = -3: (-3)² + 5(-3) + 6 = 9 - 15 + 6 = 0 ✓

**Example 12:** Solve x² = 7x - 12

Step 1: Rearrange to = 0
x² - 7x + 12 = 0

Step 2: Factorize
(x - 3)(x - 4) = 0

Step 3: Set brackets = 0
x - 3 = 0  OR  x - 4 = 0

Step 4: Solve
x = 3  OR  x = 4

**Example 13:** Solve x² - 16 = 0

Step 1: Factorize (difference of squares)
(x + 4)(x - 4) = 0

Step 2: Solve
x = -4  OR  x = 4

**FOIL METHOD (Checking)**

**FOIL = First, Outer, Inner, Last**

Check (x + 2)(x + 3):
- **F**irst: x × x = x²
- **O**uter: x × 3 = 3x
- **I**nner: 2 × x = 2x
- **L**ast: 2 × 3 = 6

Combine: x² + 3x + 2x + 6 = x² + 5x + 6 ✓
`,
    
    examples: [
      {
        question: 'Factorize: x² + 7x + 10',
        workingOut: `Step 1: Identify a, b, c
a = 1 (coefficient of x²)
b = 7 (coefficient of x)
c = 10 (constant)

Step 2: Find two numbers that:
- Multiply to c = 10
- Add to b = 7

Step 3: List factor pairs of 10
1 × 10 = 10, and 1 + 10 = 11 ✗
2 × 5 = 10, and 2 + 5 = 7 ✓

Step 4: Write factorized form
(x + 2)(x + 5)

Step 5: Check by expanding (FOIL)
F: x × x = x²
O: x × 5 = 5x
I: 2 × x = 2x
L: 2 × 5 = 10

Combine: x² + 5x + 2x + 10 = x² + 7x + 10 ✓

Answer: (x + 2)(x + 5)`,
        answer: '(x + 2)(x + 5)',
        explanation: 'Find two numbers that multiply to 10 and add to 7: that\'s 2 and 5. Write as (x + 2)(x + 5). ALWAYS check by expanding! Common mistake: wrong signs or wrong numbers.'
      },
      {
        question: 'Factorize: x² - 9',
        workingOut: `Step 1: Recognize pattern
No middle term (bx = 0)
This is difference of two squares!

Step 2: Write as a² - b²
x² - 9 = x² - 3²

Step 3: Apply formula: a² - b² = (a + b)(a - b)
a = x, b = 3
= (x + 3)(x - 3)

Step 4: Check by expanding
(x + 3)(x - 3)
= x² - 3x + 3x - 9
= x² - 9 ✓
(Middle terms cancel!)

Answer: (x + 3)(x - 3)

Key: Difference of squares is INSTANT - learn to spot it!`,
        answer: '(x + 3)(x - 3)',
        explanation: 'x² - 9 is difference of two squares: x² - 3². Formula: a² - b² = (a+b)(a-b), so (x+3)(x-3). No middle term is the clue! Very quick to factorize once you recognize the pattern.'
      },
      {
        question: 'Solve: x² + 5x + 4 = 0',
        workingOut: `Step 1: Factorize left side
Need numbers: multiply to 4, add to 5
1 × 4 = 4, and 1 + 4 = 5 ✓
x² + 5x + 4 = (x + 1)(x + 4)

Step 2: Write factorized equation
(x + 1)(x + 4) = 0

Step 3: Use zero product rule
If A × B = 0, then A = 0 or B = 0

So: x + 1 = 0  OR  x + 4 = 0

Step 4: Solve each equation
x + 1 = 0 → x = -1
x + 4 = 0 → x = -4

Step 5: Check both solutions
x = -1: (-1)² + 5(-1) + 4 = 1 - 5 + 4 = 0 ✓
x = -4: (-4)² + 5(-4) + 4 = 16 - 20 + 4 = 0 ✓

Answer: x = -1 or x = -4`,
        answer: 'x = -1 or x = -4',
        explanation: 'Solve by factorizing: (x+1)(x+4) = 0. Then x+1=0 gives x=-1, and x+4=0 gives x=-4. Two solutions! Always check both work. Remember: if (x+a) = 0, then x = -a.'
      },
      {
        question: 'Factorize: x² - 5x + 6',
        workingOut: `Step 1: Identify signs
c = +6 (positive)
b = -5 (negative)
Both negative in brackets!

Step 2: Find numbers
Multiply to: +6
Add to: -5

Step 3: List factor pairs (both negative)
(-1) × (-6) = 6, and (-1) + (-6) = -7 ✗
(-2) × (-3) = 6, and (-2) + (-3) = -5 ✓

Step 4: Write factorized form
(x - 2)(x - 3)

Step 5: Check
(x - 2)(x - 3)
= x² - 3x - 2x + 6
= x² - 5x + 6 ✓

Answer: (x - 2)(x - 3)`,
        answer: '(x - 2)(x - 3)',
        explanation: 'When c is positive but b is negative, both brackets have minus signs. Find -2 and -3: multiply to +6, add to -5. Answer: (x-2)(x-3). Sign patterns are crucial!'
      },
      {
        question: 'Solve: x² = 7x - 10',
        workingOut: `Step 1: Rearrange to standard form (= 0)
x² = 7x - 10
x² - 7x + 10 = 0
(Move everything to left side)

Step 2: Factorize
Need: multiply to +10, add to -7
(-2) × (-5) = 10, (-2) + (-5) = -7 ✓
= (x - 2)(x - 5)

Step 3: Equation becomes
(x - 2)(x - 5) = 0

Step 4: Solve each bracket
x - 2 = 0 → x = 2
x - 5 = 0 → x = 5

Step 5: Check
x = 2: 2² = 4, 7(2) - 10 = 4 ✓
x = 5: 5² = 25, 7(5) - 10 = 25 ✓

Answer: x = 2 or x = 5`,
        answer: 'x = 2 or x = 5',
        explanation: 'FIRST rearrange to = 0: x² - 7x + 10 = 0. Then factorize: (x-2)(x-5) = 0. Solve: x = 2 or x = 5. Never skip the rearranging step - must equal zero to use zero product rule!'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Factorize: x² + 8x + 15',
        options: ['(x+3)(x+5)', '(x+1)(x+15)', '(x+2)(x+6)', '(x-3)(x-5)'],
        answer: '(x+3)(x+5)',
        explanation: 'Numbers multiply to 15, add to 8: that\'s 3 and 5. Answer: (x+3)(x+5)',
        difficulty: 'easy'
      },
      {
        question: 'Factorize: x² - 25',
        options: ['(x+5)(x-5)', '(x+25)(x-25)', '(x-5)²', '(x+5)²'],
        answer: '(x+5)(x-5)',
        explanation: 'Difference of squares: x² - 5² = (x+5)(x-5)',
        difficulty: 'easy'
      },
      {
        question: 'Solve: x² + 6x + 8 = 0',
        options: ['x=-2 or x=-4', 'x=2 or x=4', 'x=-2 or x=4', 'x=2 or x=-4'],
        answer: 'x=-2 or x=-4',
        explanation: 'Factorize: (x+2)(x+4)=0. So x=-2 or x=-4',
        difficulty: 'medium'
      },
      {
        question: 'Factorize: x² - 3x - 10',
        options: ['(x-5)(x+2)', '(x+5)(x-2)', '(x-10)(x+1)', '(x+10)(x-1)'],
        answer: '(x-5)(x+2)',
        explanation: 'Multiply to -10, add to -3: that\'s -5 and +2. Answer: (x-5)(x+2)',
        difficulty: 'medium'
      },
      {
        question: 'What is FOIL for checking?',
        options: ['First Outer Inner Last', 'Factor Outer Inner Last', 'First Only Inner Last', 'Factorize Or Integrate Last'],
        answer: 'First Outer Inner Last',
        explanation: 'FOIL: First, Outer, Inner, Last - method for expanding brackets',
        difficulty: 'easy'
      },
      {
        question: 'If (x+3)(x-5)=0, what are solutions?',
        options: ['x=-3 or x=5', 'x=3 or x=-5', 'x=3 or x=5', 'x=-3 or x=-5'],
        answer: 'x=-3 or x=5',
        explanation: 'x+3=0 gives x=-3, x-5=0 gives x=5. Change sign!',
        difficulty: 'medium'
      },
      {
        question: 'Factorize: x² + 10x + 25',
        options: ['(x+5)²', '(x+25)²', '(x+5)(x-5)', '(x+10)(x+15)'],
        answer: '(x+5)²',
        explanation: 'Perfect square: x² + 2(5)x + 5² = (x+5)²',
        difficulty: 'medium'
      },
      {
        question: 'For x²+bx+c, signs when c>0, b<0?',
        options: ['Both negative', 'Both positive', 'One each', 'Cannot factorize'],
        answer: 'Both negative',
        explanation: 'Positive c, negative b → both brackets negative',
        difficulty: 'hard'
      },
      {
        question: 'Solve: x² - 49 = 0',
        options: ['x=±7', 'x=7', 'x=-7', 'x=49'],
        answer: 'x=±7',
        explanation: '(x+7)(x-7)=0, so x=-7 or x=7 (x=±7)',
        difficulty: 'medium'
      },
      {
        question: 'Factorize: x² + x - 12',
        options: ['(x+4)(x-3)', '(x-4)(x+3)', '(x+6)(x-2)', '(x-6)(x+2)'],
        answer: '(x+4)(x-3)',
        explanation: 'Multiply to -12, add to +1: that\'s +4 and -3. Answer: (x+4)(x-3)',
        difficulty: 'medium'
      }
    ],
    
    tips: [
      '⭐ Always write quadratic as ax² + bx + c = 0 before solving',
      '⭐ For x² + bx + c: find two numbers that multiply to c, add to b',
      '⭐ Difference of squares: a² - b² = (a+b)(a-b) - instant factorization!',
      '⭐ Check by expanding using FOIL (First, Outer, Inner, Last)',
      '⭐ Zero product rule: if AB = 0, then A = 0 or B = 0',
      '⭐ Sign patterns: +c & +b → both +, +c & -b → both -, -c → one each',
      '⭐ If (x + a) = 0, then x = -a (change the sign!)',
      '⭐ Always check both solutions work in original equation'
    ],
    
    commonMistakes: [
      '❌ Wrong signs: (x+2)(x+3) ≠ x² - 5x + 6',
      '❌ Not checking by expanding - easy to miss errors',
      '❌ Forgetting to rearrange to = 0 before factorizing',
      '❌ Not changing sign when solving: x+3=0 gives x=-3 not x=3',
      '❌ Missing one solution (quadratics usually have TWO!)',
      '❌ Not spotting difference of squares (x² - 16)',
      '❌ Adding numbers instead of checking they multiply to c',
      '❌ Giving up if first attempt doesn\'t work - try different pairs!'
    ],
    
    examStrategy: `
**Question Types & Marks:**

**Factorize expression (2 marks):**
- Show factor pairs
- Write factorized form
- Check by expanding

**Solve equation (3-4 marks):**
- Rearrange to = 0
- Factorize
- Solve each bracket
- State both solutions

**Word problems (4-5 marks):**
- Form quadratic equation
- Solve by factorizing
- Interpret in context
- Reject negative if needed

**Grade Boundaries:**
- Grade 6: Factorize simple x² + bx + c
- Grade 7: Solve by factorizing, difference of squares
- Grade 8: Harder quadratics, word problems
- Grade 9: ax² + bx + c where a > 1, complex applications

**Systematic Approach:**

**For Factorizing:**
1. Check for common factor first
2. Check for difference of squares (no middle term!)
3. List factor pairs of c systematically
4. Check which pair adds/subtracts to b
5. ALWAYS check by expanding

**For Solving:**
1. Rearrange to = 0 form
2. Factorize left side
3. Apply zero product rule
4. Solve each simple equation
5. Check both solutions

**Time Management:**
- Factorize expression: 2-3 minutes
- Solve equation: 3-4 minutes
- Word problem: 5-7 minutes
- Always leave 1 min to check

**Calculator:**
Can use to check answers:
- Substitute solutions back
- Calculate to verify = 0
- But show algebraic working!

**Top Scoring Tips:**

1. **Write factor pairs** - shows systematic approach for method marks
2. **Check by expanding** - catches sign errors immediately
3. **State "or" not "and"** - it's x=2 OR x=5, not AND
4. **Don't panic if messy** - keep trying different factor pairs
5. **Learn difference of squares** - instant factorization saves time!

**Common Exam Phrases:**
- "Factorize" = write as product of brackets
- "Solve" = find value(s) of x
- "Hence" = use previous answer
- "Show your working" = write factor pairs, steps

**Word Problem Strategy:**

Example: "A rectangle has area 24cm². Length is 5cm more than width. Find dimensions."

1. **Define:** Let width = x
2. **Express:** Length = x + 5
3. **Form equation:** x(x + 5) = 24
4. **Expand:** x² + 5x = 24
5. **Rearrange:** x² + 5x - 24 = 0
6. **Factorize:** (x + 8)(x - 3) = 0
7. **Solve:** x = -8 or x = 3
8. **Interpret:** Width can't be negative, so x = 3cm
9. **Answer:** Width 3cm, Length 8cm
10. **Check:** 3 × 8 = 24 ✓

**Quick Reference:**

**Sign Patterns:**
- c > 0, b > 0: (x + ?)(x + ?)
- c > 0, b < 0: (x - ?)(x - ?)
- c < 0: (x + ?)(x - ?) or (x - ?)(x + ?)

**Special Cases:**
- x² - a² = (x + a)(x - a)
- x² + 2ax + a² = (x + a)²
- x² - 2ax + a² = (x - a)²

**Practice Priority:**
Factorizing appears in EVERY Higher paper!
- Typical: 4-8 marks per paper
- Foundation for quadratic formula
- Essential for algebraic fractions
- Links to graphs of quadratics

Master factorizing = unlock all of quadratics!
`
  },

  // ==================== MODULE 4: SIMULTANEOUS EQUATIONS ====================
  {
    moduleNumber: 4,
    title: 'Simultaneous Equations',
    duration: '85 minutes',
    introduction: 'Solve two equations with two unknowns using elimination or substitution methods. Essential Grade 7-9 skill for finding where two relationships meet. Appears in every Higher paper, often worth 4-6 marks!',
    
    keyPoints: [
      'Simultaneous = solve two equations together to find x AND y',
      'Elimination method: Make coefficients equal, then add/subtract equations',
      'Substitution method: Solve one equation for x or y, substitute into other',
      'Always label equations ① and ② for clarity',
      'Always check answer in BOTH original equations',
      'If coefficients already equal: subtract. If opposite: add',
      'May need to multiply equations to make coefficients match'
    ],
    
    explanation: `
**SIMULTANEOUS EQUATIONS**

**What are Simultaneous Equations?**

Two equations with TWO unknowns (usually x and y) that must be true AT THE SAME TIME.

Example:
2x + y = 10
x + y = 6

We need values of x and y that satisfy BOTH equations.

**Why Solve Them?**

Find the point where two lines intersect (meet) on a graph.

**TWO METHODS:**
1. **Elimination** (most common)
2. **Substitution** (useful if one variable alone)

**METHOD 1: ELIMINATION**

**Strategy:** Eliminate one variable by adding or subtracting equations.

**Example 1:** Solve 3x + y = 10 and 2x + y = 7

**Step 1:** Label equations
3x + y = 10  ①
2x + y = 7   ②

**Step 2:** Identify what to eliminate
Both have '+y' with coefficient 1
Eliminate y by subtracting

**Step 3:** Subtract equations
① - ②: (3x + y) - (2x + y) = 10 - 7
        3x - 2x + y - y = 3
        x = 3

**Step 4:** Substitute into either equation
Using ②: 2(3) + y = 7
         6 + y = 7
         y = 1

**Step 5:** Check in BOTH equations
①: 3(3) + 1 = 9 + 1 = 10 ✓
②: 2(3) + 1 = 6 + 1 = 7 ✓

**Answer: x = 3, y = 1**

**Example 2:** Solve x + y = 5 and x - y = 1

**Step 1:** Label
x + y = 5  ①
x - y = 1  ②

**Step 2:** Eliminate y (opposite signs)
Add equations (+ and - cancel)

**Step 3:** Add
① + ②: (x + y) + (x - y) = 5 + 1
        2x = 6
        x = 3

**Step 4:** Substitute into ①
3 + y = 5
y = 2

**Step 5:** Check
①: 3 + 2 = 5 ✓
②: 3 - 2 = 1 ✓

**Answer: x = 3, y = 2**

**WHEN COEFFICIENTS DON'T MATCH**

Need to multiply equations to make coefficients equal.

**Example 3:** Solve 2x + 3y = 13 and 3x - y = 3

**Step 1:** Label
2x + 3y = 13  ①
3x - y = 3    ②

**Step 2:** Choose what to eliminate
Eliminate y: make coefficients equal

y coefficients: 3 and -1
LCM of 3 and 1 = 3

**Step 3:** Multiply ② by 3
② × 3: 9x - 3y = 9  ③

**Step 4:** Now eliminate y
① + ③: (2x + 3y) + (9x - 3y) = 13 + 9
        11x = 22
        x = 2

**Step 5:** Substitute into ②
3(2) - y = 3
6 - y = 3
y = 3

**Step 6:** Check
①: 2(2) + 3(3) = 4 + 9 = 13 ✓
②: 3(2) - 3 = 6 - 3 = 3 ✓

**Answer: x = 2, y = 3**

**Example 4:** Solve 2x + 3y = 8 and 3x + 2y = 7

**Step 1:** Label
2x + 3y = 8  ①
3x + 2y = 7  ②

**Step 2:** Eliminate x
Multiply ① by 3: 6x + 9y = 24  ③
Multiply ② by 2: 6x + 4y = 14  ④

**Step 3:** Subtract
③ - ④: 5y = 10
        y = 2

**Step 4:** Substitute into ①
2x + 3(2) = 8
2x + 6 = 8
2x = 2
x = 1

**Step 5:** Check
①: 2(1) + 3(2) = 2 + 6 = 8 ✓
②: 3(1) + 2(2) = 3 + 4 = 7 ✓

**Answer: x = 1, y = 2**

**METHOD 2: SUBSTITUTION**

**Strategy:** Rearrange one equation to make x or y the subject, then substitute.

**Example 5:** Solve y = 2x + 1 and 3x + y = 11

**Step 1:** One equation already has y alone!
y = 2x + 1  ①
3x + y = 11 ②

**Step 2:** Substitute ① into ②
Replace y with (2x + 1):
3x + (2x + 1) = 11

**Step 3:** Solve for x
5x + 1 = 11
5x = 10
x = 2

**Step 4:** Substitute back into ①
y = 2(2) + 1
y = 5

**Step 5:** Check
①: 5 = 2(2) + 1 = 5 ✓
②: 3(2) + 5 = 11 ✓

**Answer: x = 2, y = 5**

**Example 6:** Solve x + 2y = 7 and 3x - y = 5

**Step 1:** Rearrange ① for x
x = 7 - 2y  ③

**Step 2:** Substitute into ②
3(7 - 2y) - y = 5
21 - 6y - y = 5
21 - 7y = 5
-7y = -16
y = 16/7

**Step 3:** Find x
x = 7 - 2(16/7)
x = 49/7 - 32/7
x = 17/7

**Answer: x = 17/7, y = 16/7**

**WHICH METHOD TO USE?**

**Use ELIMINATION when:**
- Both equations in form ax + by = c
- Coefficients easily made equal
- Most common in exams

**Use SUBSTITUTION when:**
- One variable already alone (y = ...)
- One equation much simpler
- Easier rearrangement

**COMMON SCENARIOS**

**Equal coefficients - Subtract:**
3x + 2y = 10
2x + 2y = 8
Subtract to eliminate y

**Opposite coefficients - Add:**
2x + 3y = 11
2x - 3y = 1
Add to eliminate y

**Different coefficients - Multiply first:**
2x + y = 7
3x + 2y = 12
Multiply ① by 2: 4x + 2y = 14
Now subtract from ②

**GRAPHICAL INTERPRETATION**

Simultaneous equations = finding intersection point of two lines.

Solution (x, y) is where lines cross!

If no solution: Lines parallel (never meet)
If infinite solutions: Same line (always meet)
`,
    
    examples: [
      {
        question: 'Solve: 2x + y = 9 and x + y = 5',
        workingOut: `**Elimination Method:**

Step 1: Label equations
2x + y = 9  ①
x + y = 5   ②

Step 2: Identify elimination strategy
Both have +y, so subtract to eliminate y

Step 3: Subtract ② from ①
① - ②: (2x + y) - (x + y) = 9 - 5
       2x - x + y - y = 4
       x = 4

Step 4: Substitute x = 4 into ②
4 + y = 5
y = 1

Step 5: Check in both equations
①: 2(4) + 1 = 8 + 1 = 9 ✓
②: 4 + 1 = 5 ✓

Answer: x = 4, y = 1

**Key:** Same coefficient, same sign → subtract`,
        answer: 'x = 4, y = 1',
        explanation: 'Both equations have +y with coefficient 1, so subtract equations to eliminate y: 2x+y - (x+y) = 9-5 gives x=4. Then substitute: 4+y=5, so y=1. Always check in BOTH equations!'
      },
      {
        question: 'Solve: x + y = 8 and x - y = 2',
        workingOut: `**Elimination Method:**

Step 1: Label equations
x + y = 8  ①
x - y = 2  ②

Step 2: Identify elimination strategy
y has opposite signs (+y and -y)
Add equations to eliminate y

Step 3: Add equations
① + ②: (x + y) + (x - y) = 8 + 2
       x + x + y - y = 10
       2x = 10
       x = 5

Step 4: Substitute x = 5 into ①
5 + y = 8
y = 3

Step 5: Check
①: 5 + 3 = 8 ✓
②: 5 - 3 = 2 ✓

Answer: x = 5, y = 3

**Key:** Opposite signs → add to eliminate`,
        answer: 'x = 5, y = 3',
        explanation: 'y has opposite signs (+y and -y), so ADD equations to eliminate: (x+y)+(x-y)=10 gives 2x=10, x=5. Then y=3. When signs opposite, add. When signs same, subtract!'
      },
      {
        question: 'Solve: 3x + 2y = 12 and 2x - y = 1',
        workingOut: `**Elimination Method:**

Step 1: Label equations
3x + 2y = 12  ①
2x - y = 1    ②

Step 2: Make y coefficients equal
y coefficients: 2 and -1
Multiply ② by 2: 4x - 2y = 2  ③

Step 3: Add (opposite signs)
① + ③: (3x + 2y) + (4x - 2y) = 12 + 2
       7x = 14
       x = 2

Step 4: Substitute into ②
2(2) - y = 1
4 - y = 1
y = 3

Step 5: Check
①: 3(2) + 2(3) = 6 + 6 = 12 ✓
②: 2(2) - 3 = 4 - 3 = 1 ✓

Answer: x = 2, y = 3

**Key:** Multiply equation to match coefficients first`,
        answer: 'x = 2, y = 3',
        explanation: 'Coefficients don\'t match initially. Multiply second equation by 2: gets 4x-2y=2. Now y coefficients are 2 and -2 (opposite), so add equations. x=2, then y=3. Show multiplication step for marks!'
      },
      {
        question: 'Solve: y = 3x - 2 and 2x + y = 8',
        workingOut: `**Substitution Method:**

Step 1: Identify substitution
First equation already has y = ...
y = 3x - 2  ①
2x + y = 8  ②

Step 2: Substitute ① into ②
Replace y with (3x - 2):
2x + (3x - 2) = 8

Step 3: Solve for x
5x - 2 = 8
5x = 10
x = 2

Step 4: Find y using ①
y = 3(2) - 2
y = 6 - 2
y = 4

Step 5: Check
①: 4 = 3(2) - 2 = 6 - 2 = 4 ✓
②: 2(2) + 4 = 4 + 4 = 8 ✓

Answer: x = 2, y = 4

**Key:** When one variable alone, use substitution`,
        answer: 'x = 2, y = 4',
        explanation: 'First equation has y alone (y = 3x-2), perfect for substitution! Replace y in second equation: 2x+(3x-2)=8. Solve: 5x=10, x=2. Then y=4. Substitution is quickest when one variable isolated!'
      },
      {
        question: 'Solve: 5x + 3y = 19 and 2x + 3y = 10',
        workingOut: `**Elimination Method:**

Step 1: Label equations
5x + 3y = 19  ①
2x + 3y = 10  ②

Step 2: Notice y coefficients already equal!
Both have +3y

Step 3: Subtract to eliminate y
① - ②: (5x + 3y) - (2x + 3y) = 19 - 10
       5x - 2x + 3y - 3y = 9
       3x = 9
       x = 3

Step 4: Substitute into ②
2(3) + 3y = 10
6 + 3y = 10
3y = 4
y = 4/3

Step 5: Check
①: 5(3) + 3(4/3) = 15 + 4 = 19 ✓
②: 2(3) + 3(4/3) = 6 + 4 = 10 ✓

Answer: x = 3, y = 4/3

**Key:** Coefficients already equal - straight to subtraction!`,
        answer: 'x = 3, y = 4/3',
        explanation: 'y coefficients already equal (both 3y), no multiplication needed! Subtract directly: 5x+3y-(2x+3y)=9, gives 3x=9, x=3. Then y=4/3. Spotting equal coefficients saves time!'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Solve: x + y = 7, x - y = 3',
        options: ['x=5, y=2', 'x=2, y=5', 'x=4, y=3', 'x=3, y=4'],
        answer: 'x=5, y=2',
        explanation: 'Add equations (opposite signs): 2x=10, x=5. Then y=2',
        difficulty: 'easy'
      },
      {
        question: 'Solve: 2x + y = 11, x + y = 6',
        options: ['x=5, y=1', 'x=1, y=5', 'x=6, y=0', 'x=3, y=3'],
        answer: 'x=5, y=1',
        explanation: 'Subtract equations (same signs): x=5. Then y=1',
        difficulty: 'easy'
      },
      {
        question: 'When should you ADD equations?',
        options: ['Opposite signs', 'Same signs', 'Always', 'Never'],
        answer: 'Opposite signs',
        explanation: 'Add when coefficients have opposite signs (+y and -y cancel)',
        difficulty: 'easy'
      },
      {
        question: 'Solve: y = 2x, 3x + y = 10',
        options: ['x=2, y=4', 'x=4, y=2', 'x=5, y=10', 'x=1, y=2'],
        answer: 'x=2, y=4',
        explanation: 'Substitute y=2x into second: 3x+2x=10, 5x=10, x=2, y=4',
        difficulty: 'medium'
      },
      {
        question: 'What must you ALWAYS do?',
        options: ['Check in both equations', 'Draw a graph', 'Use substitution', 'Multiply by 2'],
        answer: 'Check in both equations',
        explanation: 'Always check solution works in BOTH original equations!',
        difficulty: 'easy'
      },
      {
        question: 'Solve: 3x + 2y = 13, x = 3',
        options: ['x=3, y=2', 'x=2, y=3', 'x=3, y=3', 'x=1, y=5'],
        answer: 'x=3, y=2',
        explanation: 'x already given! Substitute: 3(3)+2y=13, 9+2y=13, y=2',
        difficulty: 'easy'
      },
      {
        question: 'To eliminate with 2y and 3y, multiply by?',
        options: ['First by 3, second by 2', 'First by 2, second by 3', 'Both by 6', 'Don\'t need to'],
        answer: 'First by 3, second by 2',
        explanation: 'Make coefficients equal: 2y×3=6y, 3y×2=6y. Multiply to LCM',
        difficulty: 'medium'
      },
      {
        question: 'Solve: 2x + 3y = 16, 2x - y = 4',
        options: ['x=2.5, y=3', 'x=3, y=2.5', 'x=4, y=2', 'x=2, y=4'],
        answer: 'x=2.5, y=3',
        explanation: 'Subtract: 4y=12, y=3. Then 2x+9=16, x=2.5',
        difficulty: 'hard'
      },
      {
        question: 'If both equations identical, solutions?',
        options: ['Infinite', 'None', 'One', 'Two'],
        answer: 'Infinite',
        explanation: 'Same line = infinite intersection points',
        difficulty: 'medium'
      },
      {
        question: 'Label equations as ① and ② for?',
        options: ['Clarity in working', 'To look smart', 'Required by exam', 'No reason'],
        answer: 'Clarity in working',
        explanation: 'Labeling makes working clear and helps avoid errors',
        difficulty: 'easy'
      }
    ],
    
    tips: [
      '⭐ ALWAYS label equations ① and ② - makes working clear',
      '⭐ Same sign → SUBTRACT, Opposite sign → ADD',
      '⭐ Always check answer in BOTH original equations',
      '⭐ Eliminate the variable with simplest coefficients first',
      '⭐ Show multiplication of equations clearly for method marks',
      '⭐ Use substitution when one variable already isolated (y = ...)',
      '⭐ Write intermediate steps - don\'t skip to final answer',
      '⭐ Keep working neat - simultaneous equations get messy fast!'
    ],
    
    commonMistakes: [
      '❌ Only checking answer in one equation (check BOTH!)',
      '❌ Sign errors when subtracting: (3x+2y)-(2x-y) = x+3y not x+y',
      '❌ Adding when should subtract (or vice versa)',
      '❌ Not multiplying ALL terms when scaling equations',
      '❌ Forgetting to state both x AND y in final answer',
      '❌ Not showing multiplication step (lose method marks)',
      '❌ Messy working leading to transcription errors',
      '❌ Giving up if first elimination attempt gets messy - try eliminating other variable!'
    ],
    
    examStrategy: `
**Question Types & Marks:**

**Standard pair (3-4 marks):**
- State method (elimination/substitution)
- Show working clearly
- Give both x and y
- Check in one equation

**With multiplication (4-5 marks):**
- Show equation multiplication
- Perform elimination
- Substitute to find second variable
- State final answer clearly

**Word problems (5-6 marks):**
- Form two equations from context
- Solve simultaneously  
- Interpret answer in context
- Include units if appropriate

**Grade Boundaries:**
- Grade 6: Solve simple pairs (coefficients already equal)
- Grade 7: Multiply equations, use both methods
- Grade 8: Complex coefficients, word problems
- Grade 9: Three equations (not common), complex contexts

**Method Template (Elimination):**

Step 1 - Label: 2x + 3y = 13  ①
                x + 2y = 7    ②

Step 2 - Multiply: ① × 2: 4x + 6y = 26  ③

Step 3 - Eliminate: ③ - ②: 3x + 4y = 19

Step 4 - Solve: x = ...

Step 5 - Substitute: back into ①

Step 6 - Check: in both ① and ②

**Decision Tree:**

1. **Is one variable alone?** → Use substitution
2. **Coefficients equal?** → Subtract (same sign) or Add (opposite)
3. **Need to multiply?** → Find LCM, multiply, then eliminate
4. **Getting messy?** → Try eliminating other variable instead

**Time Management:**
- Simple pair: 3-4 minutes
- With multiplication: 5-6 minutes
- Word problem: 7-8 minutes
- Always keep 1 min for checking

**Top Scoring Tips:**

1. **Label equations** - ① and ② (shows organization)
2. **Show multiplication** - "① × 3:" (method marks)
3. **Write what you're doing** - "Eliminate y" (shows understanding)
4. **Check in BOTH** - substitute into original equations
5. **Box final answer** - x = ?, y = ? (clear for examiner)

**Word Problem Strategy:**

Example: "Adult tickets £8, child £5. Family buys 7 tickets for £47. How many of each?"

1. **Define variables:**
   Let a = adult tickets, c = child tickets

2. **Form equations:**
   Total tickets: a + c = 7  ①
   Total cost: 8a + 5c = 47  ②

3. **Solve:**
   From ①: a = 7 - c
   Substitute into ②: 8(7-c) + 5c = 47
   56 - 8c + 5c = 47
   -3c = -9
   c = 3

4. **Find other variable:**
   a = 7 - 3 = 4

5. **Check:**
   4 + 3 = 7 ✓
   8(4) + 5(3) = 32 + 15 = 47 ✓

6. **Answer in context:**
   4 adult tickets, 3 child tickets

**Calculator Use:**

Can check answers:
- Substitute values
- Calculate both equations
- Verify both equal right side

But MUST show algebraic method!

**Common Exam Contexts:**
- Ticket prices / costs
- Ages (x years ago/hence)
- Geometry (angles, perimeters)
- Mixtures / recipes
- Number problems

**Quick Checks:**
✓ Both equations satisfied?
✓ Answer makes sense in context?
✓ All working shown clearly?
✓ Both x and y stated?
✓ Units included if needed?

**Practice Priority:**

Appears in EVERY Higher paper!
- Typical: 4-6 marks per paper
- Often in word problem form
- Links to graphs (intersection point)
- Foundation for more complex algebra

Master simultaneous equations = solid algebra foundation!
`
  },

  // ==================== MODULE 5: INEQUALITIES ====================
  {
    moduleNumber: 5,
    title: 'Inequalities',
    duration: '75 minutes',
    introduction: 'Master solving and representing inequalities on number lines. Includes linear and quadratic inequalities - essential Grade 7-9 skill. Key rule: FLIP the sign when multiplying or dividing by negative numbers!',
    
    keyPoints: [
      'Four symbols: < (less than), > (greater than), ≤ (less or equal), ≥ (greater or equal)',
      'Solve like equations BUT flip inequality when ×/÷ by negative number',
      'Number line: Open circle ○ for < or >, Filled circle ● for ≤ or ≥',
      'Shade arrow in direction of inequality (left for <, right for >)',
      'Quadratic inequalities: Sketch graph to find range',
      'Set notation: {x : x > 3} means "the set of x such that x > 3"',
      'Always check answer by testing a value'
    ],
    
    explanation: `
**INEQUALITIES**

**What is an Inequality?**

An inequality shows a range of values rather than a single value.

**The Four Symbols:**

**<** : Less than (strictly less, not equal)
**>** : Greater than (strictly greater, not equal)
**≤** : Less than or equal to
**≥** : Greater than or equal to

**Examples:**
- x > 5: x is greater than 5 (6, 7, 8, ... but NOT 5)
- x ≤ 3: x is less than or equal to 3 (..., 1, 2, 3)
- 2 < x < 7: x is between 2 and 7 (not including 2, not including 7)

**SOLVING LINEAR INEQUALITIES**

**Solve like equations, but...**

**GOLDEN RULE: When multiplying or dividing by NEGATIVE, FLIP the sign!**

**Example 1:** Solve 3x + 5 > 14

Solve like equation:
3x + 5 > 14
3x > 9
x > 3

Check: Try x = 4: 3(4) + 5 = 17 > 14 ✓
Try x = 2: 3(2) + 5 = 11 < 14 ✗

**Example 2:** Solve 2x - 7 ≤ 11

2x - 7 ≤ 11
2x ≤ 18
x ≤ 9

**Example 3:** Solve x/4 + 2 > 5

x/4 > 3
x > 12

**CRITICAL RULE: FLIPPING THE SIGN**

**Example 4:** Solve -2x < 6

Divide both sides by -2:
**FLIP THE SIGN!**

-2x < 6
x > -3  (sign flipped from < to >)

Check: Try x = 0: -2(0) = 0, and 0 < 6 ✓
If we hadn't flipped: x < -3, try x = -4: -2(-4) = 8, and 8 < 6 ✗

**Example 5:** Solve 5 - x > 2

Method 1: Rearrange first
-x > -3
x < 3  (flip when dividing by -1)

Method 2: Get x positive first
5 - x > 2
5 - 2 > x
3 > x
So x < 3

**Example 6:** Solve -3x ≥ 12

Divide by -3 (flip!):
x ≤ -4

**NUMBER LINES**

Visual representation of inequalities.

**Open vs Filled Circles:**

**Open circle ○:** Does NOT include endpoint
Use for **<** and **>**

**Filled circle ●:** INCLUDES endpoint
Use for **≤** and **≥**

**Direction of Arrow:**

- x > 3: Arrow points RIGHT (towards larger numbers)
- x < 3: Arrow points LEFT (towards smaller numbers)

**Example 7:** Show x ≥ 2 on number line

Filled circle at 2, arrow pointing right (towards positive)

**Example 8:** Show x < -1 on number line

Open circle at -1, arrow pointing left (towards negative)

**Example 9:** Show -2 < x ≤ 4

Open circle at -2, filled circle at 4, shade region between them

**COMPOUND INEQUALITIES**

Two inequalities combined.

**Example 10:** Solve 2 < x + 1 < 7

Split into two parts:
2 < x + 1  AND  x + 1 < 7
1 < x      AND  x < 6

Combined: 1 < x < 6

**Example 11:** Solve -5 ≤ 2x - 1 ≤ 9

Split:
-5 ≤ 2x - 1: -4 ≤ 2x, so -2 ≤ x
2x - 1 ≤ 9: 2x ≤ 10, so x ≤ 5

Combined: -2 ≤ x ≤ 5

**QUADRATIC INEQUALITIES**

**Method:** Sketch the graph!

**Example 12:** Solve x² < 9

Method 1: Algebraic
x² < 9
x² - 9 < 0
(x + 3)(x - 3) < 0

Graph y = (x+3)(x-3):
- Crosses x-axis at -3 and 3
- Parabola (U-shape)
- Below x-axis (negative) between -3 and 3

Answer: -3 < x < 3

Method 2: Square root both sides
x² < 9
-3 < x < 3  (remember both positive and negative roots!)

**Example 13:** Solve x² - 4x - 5 ≥ 0

Step 1: Factorize
(x + 1)(x - 5) ≥ 0

Step 2: Find critical points
x = -1 or x = 5

Step 3: Sketch graph
Parabola crossing at -1 and 5
U-shape (coefficient of x² is positive)

Step 4: Identify regions ≥ 0
Above x-axis (positive) when:
x ≤ -1  OR  x ≥ 5

Answer: x ≤ -1 or x ≥ 5

**INTEGER SOLUTIONS**

Sometimes asked to find integer (whole number) solutions.

**Example 14:** Find integers satisfying -2 < x ≤ 3

Integers in range: -1, 0, 1, 2, 3
(Not -2 because <, but includes 3 because ≤)

**SET NOTATION**

**Format:** {x : condition}
Read: "The set of x such that..."

**Examples:**
- {x : x > 5} = "all x greater than 5"
- {x : -2 ≤ x < 4} = "all x between -2 and 4, including -2"
- {x : x ≤ -1 or x ≥ 3} = "all x less than/equal -1 OR greater than/equal 3"

**GRAPHICAL INEQUALITIES (2D)**

Regions on coordinate plane.

**Example 15:** y < 2x + 1

Step 1: Draw line y = 2x + 1 (dashed for <, solid for ≤)
Step 2: Test point (0,0): 0 < 1 ✓
Step 3: Shade side containing (0,0)

**REAL-WORLD APPLICATIONS**

**Example 16:** A taxi costs £3 plus £2 per mile. You have £15. How many miles?

Let x = miles
Cost = 3 + 2x
Must satisfy: 3 + 2x ≤ 15
2x ≤ 12
x ≤ 6

Answer: Up to 6 miles
`,
    
    examples: [
      {
        question: 'Solve: 3x + 7 > 22',
        workingOut: `Step 1: Solve like an equation
3x + 7 > 22

Step 2: Subtract 7 from both sides
3x > 15

Step 3: Divide by 3 (positive number, don't flip!)
x > 5

Step 4: Check with test value
Try x = 6: 3(6) + 7 = 25 > 22 ✓
Try x = 4: 3(4) + 7 = 19 < 22 ✗

Step 5: Show on number line
Open circle at 5, arrow pointing right

Answer: x > 5

Remember: > means strictly greater, so 5 itself NOT included!`,
        answer: 'x > 5',
        explanation: 'Solve like equation: subtract 7, divide by 3. Get x > 5. Since dividing by positive 3, DON\'T flip sign. Open circle at 5 (not included), arrow right. Always check: x=6 works, x=4 doesn\'t.'
      },
      {
        question: 'Solve: -2x < 10',
        workingOut: `Step 1: Identify we're dividing by negative
-2x < 10

Step 2: Divide by -2
**FLIP THE SIGN!**

-2x < 10
x > -5  (< becomes >)

Step 3: Why flip?
If x = 0: -2(0) = 0 < 10 ✓
If we said x < -5, then x = -6: -2(-6) = 12 > 10 ✗
So must flip!

Step 4: Check
Try x = 0: -2(0) = 0 < 10 ✓
Try x = -6: -2(-6) = 12 > 10 ✗

Step 5: Number line
Open circle at -5, arrow pointing right

Answer: x > -5

**CRITICAL:** Multiply/divide by negative → FLIP the sign!`,
        answer: 'x > -5',
        explanation: 'When dividing/multiplying by NEGATIVE, FLIP inequality sign! -2x < 10 becomes x > -5 (not x < -5). This is THE most common mistake! Check: x=0 works (gives 0<10), x=-6 doesn\'t (gives 12>10).'
      },
      {
        question: 'Solve and show on number line: 2x - 3 ≤ 7',
        workingOut: `Step 1: Solve
2x - 3 ≤ 7

Step 2: Add 3 to both sides
2x ≤ 10

Step 3: Divide by 2 (positive, no flip)
x ≤ 5

Step 4: Draw number line
≤ means "or equal", so FILLED circle
Arrow left (towards smaller numbers)

Filled circle at 5, arrow pointing left

Step 5: Check
x = 5: 2(5) - 3 = 7 ≤ 7 ✓ (equal counts!)
x = 4: 2(4) - 3 = 5 ≤ 7 ✓
x = 6: 2(6) - 3 = 9 > 7 ✗

Answer: x ≤ 5
Number line: Filled circle at 5, arrow left`,
        answer: 'x ≤ 5, filled circle at 5, arrow left',
        explanation: 'Solve: 2x ≤ 10, x ≤ 5. ≤ includes equality, so FILLED circle ●. Arrow left for "less than". Circle type: open ○ for </>, filled ● for ≤/≥. Remember the equals!'
      },
      {
        question: 'Solve: -3 < 2x + 1 ≤ 9',
        workingOut: `Step 1: Split compound inequality
-3 < 2x + 1  AND  2x + 1 ≤ 9

Step 2: Solve first part
-3 < 2x + 1
-4 < 2x
-2 < x  (or x > -2)

Step 3: Solve second part
2x + 1 ≤ 9
2x ≤ 8
x ≤ 4

Step 4: Combine
x > -2  AND  x ≤ 4
Written: -2 < x ≤ 4

Step 5: Number line
Open circle at -2, filled circle at 4, shade region between

Step 6: Check
x = 0: -3 < 1 ≤ 9 ✓
x = -3: -3 < -5 ✗
x = 5: -3 < 11 but 11 > 9 ✗

Answer: -2 < x ≤ 4`,
        answer: '-2 < x ≤ 4',
        explanation: 'Compound inequality: solve each part separately. -3 < 2x+1 gives x > -2, and 2x+1 ≤ 9 gives x ≤ 4. Combine: -2 < x ≤ 4. Number line: open at -2 (not included), filled at 4 (included).'
      },
      {
        question: 'List the integers satisfying -1 ≤ x < 3',
        workingOut: `Step 1: Understand the inequality
-1 ≤ x: x is greater than or equal to -1 (includes -1)
x < 3: x is strictly less than 3 (not including 3)

Step 2: Find range
From -1 (included) to 3 (not included)

Step 3: List integers in range
-1 ✓ (included by ≤)
0 ✓
1 ✓
2 ✓
3 ✗ (not included by <)

Answer: -1, 0, 1, 2

Step 4: Check each
-1: -1 ≤ -1 < 3 ✓
0: -1 ≤ 0 < 3 ✓
1: -1 ≤ 1 < 3 ✓
2: -1 ≤ 2 < 3 ✓
3: -1 ≤ 3 but 3 < 3 is false ✗

Remember: ≤ includes endpoint, < does not!`,
        answer: '-1, 0, 1, 2',
        explanation: 'Integers in range -1 ≤ x < 3 are: -1, 0, 1, 2. Include -1 (because ≤), exclude 3 (because <). Common mistake: forgetting that < doesn\'t include the endpoint, or missing -1!'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Solve: x + 5 > 12',
        options: ['x > 7', 'x < 7', 'x ≥ 7', 'x = 7'],
        answer: 'x > 7',
        explanation: 'Subtract 5: x > 7. Simple as equation but keeps inequality!',
        difficulty: 'easy'
      },
      {
        question: 'Solve: -x < 4',
        options: ['x > -4', 'x < -4', 'x > 4', 'x < 4'],
        answer: 'x > -4',
        explanation: 'Multiply by -1, FLIP sign: x > -4. Critical rule!',
        difficulty: 'medium'
      },
      {
        question: 'Which circle for x ≥ 3?',
        options: ['Filled ●', 'Open ○', 'No circle', 'Square'],
        answer: 'Filled ●',
        explanation: '≥ means "or equal", so filled circle. Includes endpoint!',
        difficulty: 'easy'
      },
      {
        question: 'Which circle for x < 5?',
        options: ['Open ○', 'Filled ●', 'No circle', 'Square'],
        answer: 'Open ○',
        explanation: '< means strictly less, so open circle. NOT equal!',
        difficulty: 'easy'
      },
      {
        question: 'Solve: 3x - 2 ≤ 10',
        options: ['x ≤ 4', 'x < 4', 'x ≥ 4', 'x = 4'],
        answer: 'x ≤ 4',
        explanation: 'Add 2, divide by 3: x ≤ 4. Keep ≤ sign throughout!',
        difficulty: 'easy'
      },
      {
        question: 'When do you flip the inequality sign?',
        options: ['×/÷ by negative', 'Always', 'Never', '+/- anything'],
        answer: '×/÷ by negative',
        explanation: 'ONLY flip when multiplying or dividing by negative number!',
        difficulty: 'easy'
      },
      {
        question: 'Integers in -2 < x ≤ 1?',
        options: ['-1, 0, 1', '-2, -1, 0, 1', '-1, 0', '0, 1'],
        answer: '-1, 0, 1',
        explanation: 'From -2 (not included) to 1 (included): -1, 0, 1',
        difficulty: 'medium'
      },
      {
        question: 'Solve: 5 - 2x > 11',
        options: ['x < -3', 'x > -3', 'x < 3', 'x > 3'],
        answer: 'x < -3',
        explanation: '-2x > 6, divide by -2 and flip: x < -3',
        difficulty: 'hard'
      },
      {
        question: 'For x > 2, arrow points?',
        options: ['Right →', 'Left ←', 'Both', 'Neither'],
        answer: 'Right →',
        explanation: '> means greater, so arrow right (towards bigger numbers)',
        difficulty: 'easy'
      },
      {
        question: 'Solve: -4 ≤ 2x < 6',
        options: ['-2 ≤ x < 3', '-2 < x ≤ 3', '-2 ≤ x ≤ 3', 'x = 0'],
        answer: '-2 ≤ x < 3',
        explanation: 'Divide all by 2: -2 ≤ x < 3. Keep inequality types same!',
        difficulty: 'medium'
      }
    ],
    
    tips: [
      '⭐ Solve like equations BUT flip sign when ×/÷ by negative',
      '⭐ Open circle ○ for < or >, Filled circle ● for ≤ or ≥',
      '⭐ Arrow right for >, arrow left for <',
      '⭐ Always check answer by testing a value in original inequality',
      '⭐ For compound inequalities: split, solve each, combine',
      '⭐ Integer solutions: list all whole numbers in range, check endpoints',
      '⭐ Quadratic inequalities: sketch graph to visualize regions',
      '⭐ Set notation {x : condition} - learn to read it!'
    ],
    
    commonMistakes: [
      '❌ Not flipping sign when ×/÷ by negative (MOST COMMON ERROR!)',
      '❌ Using filled circle for < or > (should be open)',
      '❌ Using open circle for ≤ or ≥ (should be filled)',
      '❌ Arrow pointing wrong direction',
      '❌ Including endpoint when shouldn\'t (< vs ≤)',
      '❌ Forgetting to check answer with test value',
      '❌ For compound: solving incorrectly or not combining properly',
      '❌ For quadratic: not sketching graph, getting wrong regions'
    ],
    
    examStrategy: `
**Question Types & Marks:**

**Solve linear inequality (2 marks):**
- Show working step by step
- State final answer clearly
- Note if sign flipped

**Number line representation (2 marks):**
- Draw clear line with scale
- Correct circle type (open/filled)
- Arrow in correct direction

**Compound inequality (3 marks):**
- Split into two parts
- Solve each
- Combine correctly

**Integer solutions (2-3 marks):**
- Solve inequality first
- List all integers in range
- Check endpoints carefully

**Quadratic inequality (4-5 marks):**
- Factorize or sketch
- Identify critical points
- State correct regions

**Grade Boundaries:**
- Grade 6: Solve simple linear, draw number lines
- Grade 7: Flip sign rule, compound inequalities
- Grade 8: Quadratic inequalities, integer solutions
- Grade 9: Complex combinations, set notation

**Critical Checklist:**

Before submitting:
✓ Did I flip sign if ×/÷ negative?
✓ Correct circle type (open/filled)?
✓ Arrow pointing correct way?
✓ Checked with test value?
✓ Included/excluded endpoints correctly?

**The Flip Rule:**

**When to flip:**
- Multiply both sides by negative
- Divide both sides by negative

**When NOT to flip:**
- Add or subtract anything
- Multiply/divide by positive
- Rearranging without ×/÷

**Examples:**
- -x < 5 → x > -5 ✓ (flip!)
- x + 3 < 7 → x < 4 ✓ (no flip)
- 2x > 6 → x > 3 ✓ (no flip, divided by +2)

**Number Line Technique:**

**Step 1:** Identify inequality type
< or > → Open ○
≤ or ≥ → Filled ●

**Step 2:** Determine direction
< or ≤ → Arrow LEFT ←
> or ≥ → Arrow RIGHT →

**Step 3:** Draw clearly
- Use ruler if available
- Mark key values
- Shade/arrow clearly

**Compound Inequality Strategy:**

For: a < f(x) < b

**Method 1:** Split
a < f(x) AND f(x) < b
Solve each, combine

**Method 2:** All at once
Apply operations to all three parts
Keep inequalities intact

Example: -6 < 2x < 10
Divide all by 2: -3 < x < 5

**Quadratic Inequality Strategy:**

**Step 1:** Rearrange to ≥ 0 or ≤ 0 form

**Step 2:** Factorize

**Step 3:** Find critical points (roots)

**Step 4:** Sketch rough graph
- U-shape if x² coefficient positive
- ∩-shape if x² coefficient negative

**Step 5:** Identify required region
- > 0 or ≥ 0: above x-axis
- < 0 or ≤ 0: below x-axis

**Step 6:** Write solution
- Continuous region: a < x < b
- Two regions: x < a or x > b

**Time Management:**
- Simple linear: 2 minutes
- Number line: 1-2 minutes
- Compound: 3-4 minutes
- Quadratic: 5-6 minutes

**Top Scoring Tips:**

1. **Show flip explicitly** - write "÷ -2, flip sign" for clarity
2. **Label number line** - mark key values clearly
3. **Check your answer** - substitute test value
4. **For compound: show split** - makes working clear
5. **For quadratic: sketch** - even rough sketch helps

**Common Exam Phrases:**
- "Solve the inequality" = find range of x
- "Show on number line" = draw with circles and arrows
- "Find integer solutions" = list whole numbers
- "Hence" = use previous answer
- "Represent" = usually means number line

**Calculator Use:**

Can use to:
- Check calculations
- Verify test values
- Graph quadratic functions

But MUST show algebraic working!

**Real-World Context:**

Often presented as:
- Budget problems ("spend at most £50")
- Age restrictions ("at least 16 years")
- Capacity limits ("fewer than 30 people")
- Physical constraints ("height between...")

Translate to inequality, solve, interpret!

**Practice Priority:**

Appears in MOST Higher papers!
- Typical: 3-5 marks per paper
- Often combined with other topics
- Number lines are common
- Quadratic inequalities = Grade 8-9

Master the flip rule = avoid most common error!
`
  },

  // ==================== MODULE 6: SEQUENCES (QUADRATIC & GEOMETRIC) ====================
  {
    moduleNumber: 6,
    title: 'Sequences (Quadratic & Geometric)',
    duration: '85 minutes',
    introduction: 'Master quadratic and geometric sequences - essential Grade 7-9 skills. Learn to find nth terms, identify patterns, and distinguish between sequence types. Builds on Foundation arithmetic sequences!',
    
    keyPoints: [
      'Arithmetic: Constant first difference (add/subtract same amount each time)',
      'Quadratic: Constant SECOND difference (nth term contains n²)',
      'Geometric: Constant ratio (multiply by same amount each time)',
      'For quadratic: nth term = an² + bn + c',
      'For geometric: nth term = arⁿ⁻¹ (a = first term, r = common ratio)',
      'Always check differences/ratios for ALL consecutive terms',
      'Fibonacci: Each term = sum of previous two (special sequence)'
    ],
    
    explanation: `
**TYPES OF SEQUENCES**

**1. Arithmetic Sequences**
Add or subtract same amount each time.
Example: 3, 7, 11, 15, 19...
First difference: +4 (constant)
nth term: 4n - 1

**2. Quadratic Sequences**
Second difference is constant.
Example: 2, 5, 10, 17, 26...
First differences: 3, 5, 7, 9... (not constant)
Second differences: 2, 2, 2... (constant!)
nth term contains n²

**3. Geometric Sequences**
Multiply by same amount each time.
Example: 2, 6, 18, 54, 162...
Common ratio: 3 (divide consecutive terms)
nth term: 2 × 3ⁿ⁻¹

**QUADRATIC SEQUENCES**

**Identifying:**
- First differences NOT constant
- Second differences ARE constant

**Example 1:** 3, 6, 11, 18, 27...

First differences:
6 - 3 = 3
11 - 6 = 5
18 - 11 = 7
27 - 18 = 9

Second differences:
5 - 3 = 2
7 - 5 = 2
9 - 7 = 2

Second difference constant (2) → Quadratic!

**Finding nth Term of Quadratic Sequence:**

**Formula: nth term = an² + bn + c**

**Step 1:** Find 'a'
a = (second difference) ÷ 2

**Step 2:** Find linear part
Subtract an² from each term
Find nth term of remaining sequence

**Example 2:** Find nth term of 3, 8, 15, 24, 35...

Position (n): 1, 2, 3, 4, 5
Terms: 3, 8, 15, 24, 35

First differences: 5, 7, 9, 11
Second differences: 2, 2, 2

Step 1: Find a
a = 2 ÷ 2 = 1
So term contains n²

Step 2: Subtract n² from each term
n = 1: 3 - 1² = 3 - 1 = 2
n = 2: 8 - 2² = 8 - 4 = 4
n = 3: 15 - 3² = 15 - 9 = 6
n = 4: 24 - 4² = 24 - 16 = 8

New sequence: 2, 4, 6, 8...
This is 2n

Step 3: Combine
nth term = n² + 2n

Check:
n = 1: 1² + 2(1) = 3 ✓
n = 2: 2² + 2(2) = 8 ✓
n = 3: 3² + 2(3) = 15 ✓

**Example 3:** Find nth term of 5, 8, 13, 20, 29...

First differences: 3, 5, 7, 9
Second differences: 2, 2, 2

a = 2 ÷ 2 = 1

Subtract n²:
n = 1: 5 - 1 = 4
n = 2: 8 - 4 = 4
n = 3: 13 - 9 = 4
n = 4: 20 - 16 = 4

Remainder: 4, 4, 4, 4... = 4

nth term = n² + 4

Check: n = 3: 3² + 4 = 13 ✓

**GEOMETRIC SEQUENCES**

**Identifying:**
- Multiply by same ratio each time
- Divide consecutive terms to find ratio

**Example 4:** 3, 12, 48, 192...

Check ratio:
12 ÷ 3 = 4
48 ÷ 12 = 4
192 ÷ 48 = 4

Common ratio r = 4
Geometric sequence!

**Finding nth Term of Geometric Sequence:**

**Formula: nth term = arⁿ⁻¹**

Where:
- a = first term
- r = common ratio
- n = position

**Example 5:** Find nth term of 2, 6, 18, 54...

First term a = 2
Common ratio r = 6 ÷ 2 = 3

nth term = 2 × 3ⁿ⁻¹

Check:
n = 1: 2 × 3⁰ = 2 × 1 = 2 ✓
n = 2: 2 × 3¹ = 2 × 3 = 6 ✓
n = 3: 2 × 3² = 2 × 9 = 18 ✓

**Example 6:** Find 10th term of 5, 10, 20, 40...

a = 5
r = 10 ÷ 5 = 2

nth term = 5 × 2ⁿ⁻¹

10th term = 5 × 2⁹
= 5 × 512
= 2560

**Decreasing Geometric Sequences:**

Ratio between 0 and 1 (fraction).

**Example 7:** 80, 40, 20, 10...

r = 40 ÷ 80 = 1/2 (or 0.5)

nth term = 80 × (1/2)ⁿ⁻¹

**SPECIAL SEQUENCES**

**Fibonacci Sequence:**
1, 1, 2, 3, 5, 8, 13, 21...
Each term = sum of previous two

**Square Numbers:**
1, 4, 9, 16, 25...
nth term = n²

**Cube Numbers:**
1, 8, 27, 64, 125...
nth term = n³

**Triangular Numbers:**
1, 3, 6, 10, 15...
nth term = n(n+1)/2

**COMPARING SEQUENCES**

**Arithmetic:**
- Add constant
- First difference constant
- Linear (straight line graph)
- nth term = dn + c

**Quadratic:**
- Second difference constant
- Contains n²
- Parabola (curved graph)
- nth term = an² + bn + c

**Geometric:**
- Multiply by constant ratio
- Ratio of consecutive terms constant
- Exponential (rapid growth)
- nth term = arⁿ⁻¹

**FINDING SPECIFIC TERMS**

**Example 8:** Given nth term = 2n² - 3n + 1, find 5th term

n = 5:
= 2(5)² - 3(5) + 1
= 2(25) - 15 + 1
= 50 - 15 + 1
= 36

**Example 9:** Given nth term = 3 × 2ⁿ⁻¹, find 6th term

n = 6:
= 3 × 2⁵
= 3 × 32
= 96

**REAL-WORLD APPLICATIONS**

**Compound Interest:** Geometric sequence
£100 at 5% per year:
100, 105, 110.25, 115.76...
(multiply by 1.05)

**Population Growth:** Often geometric
Bacteria doubling every hour:
100, 200, 400, 800...

**Falling Objects:** Quadratic
Distance fallen relates to n²
`,
    
    examples: [
      {
        question: 'Find the nth term of the quadratic sequence: 4, 7, 12, 19, 28...',
        workingOut: `Step 1: Check it's quadratic
First differences:
7 - 4 = 3
12 - 7 = 5
19 - 12 = 7
28 - 19 = 9

Second differences:
5 - 3 = 2
7 - 5 = 2
9 - 7 = 2

Second difference constant → Quadratic ✓

Step 2: Find coefficient of n²
a = (second difference) ÷ 2
a = 2 ÷ 2 = 1

Step 3: Subtract n² from each term
n = 1: 4 - 1² = 3
n = 2: 7 - 4 = 3
n = 3: 12 - 9 = 3
n = 4: 19 - 16 = 3
n = 5: 28 - 25 = 3

Remainder sequence: 3, 3, 3, 3... = 3

Step 4: Combine
nth term = n² + 3

Step 5: Check
n = 1: 1² + 3 = 4 ✓
n = 2: 2² + 3 = 7 ✓
n = 3: 3² + 3 = 12 ✓

Answer: n² + 3`,
        answer: 'n² + 3',
        explanation: 'Second difference is 2 (constant), so quadratic with coefficient 1 (2÷2=1). Subtract n² from each term: get constant 3. Combined: n² + 3. Always verify with first few terms!'
      },
      {
        question: 'Find the nth term of the geometric sequence: 3, 12, 48, 192...',
        workingOut: `Step 1: Check it's geometric
Find ratio between consecutive terms:
12 ÷ 3 = 4
48 ÷ 12 = 4
192 ÷ 48 = 4

Common ratio r = 4 ✓

Step 2: Identify first term
a = 3

Step 3: Use formula nth term = arⁿ⁻¹
a = 3, r = 4

nth term = 3 × 4ⁿ⁻¹

Step 4: Check
n = 1: 3 × 4⁰ = 3 × 1 = 3 ✓
n = 2: 3 × 4¹ = 3 × 4 = 12 ✓
n = 3: 3 × 4² = 3 × 16 = 48 ✓
n = 4: 3 × 4³ = 3 × 64 = 192 ✓

Answer: 3 × 4ⁿ⁻¹

Note: Could also write as 3 × 4ⁿ ÷ 4 = (3/4) × 4ⁿ`,
        answer: '3 × 4ⁿ⁻¹',
        explanation: 'Geometric: constant ratio. Divide consecutive terms: 12÷3=4, 48÷12=4. Formula: arⁿ⁻¹ where a=first term (3), r=ratio (4). Answer: 3 × 4ⁿ⁻¹. Remember the n-1 power!'
      },
      {
        question: 'What type of sequence is 2, 5, 10, 17, 26...? Find nth term.',
        workingOut: `Step 1: Find first differences
5 - 2 = 3
10 - 5 = 5
17 - 10 = 7
26 - 17 = 9

Not constant → not arithmetic

Step 2: Find second differences
5 - 3 = 2
7 - 5 = 2
9 - 7 = 2

Constant → QUADRATIC

Step 3: Find coefficient of n²
a = 2 ÷ 2 = 1

Step 4: Subtract n² from terms
n = 1: 2 - 1 = 1
n = 2: 5 - 4 = 1
n = 3: 10 - 9 = 1
n = 4: 17 - 16 = 1
n = 5: 26 - 25 = 1

Remainder: 1, 1, 1, 1... = 1

Step 5: Combine
nth term = n² + 1

Step 6: Verify
n = 1: 1² + 1 = 2 ✓
n = 4: 4² + 1 = 17 ✓

Answer: Quadratic sequence, nth term = n² + 1`,
        answer: 'Quadratic, n² + 1',
        explanation: 'First differences not constant (3,5,7,9), but second differences are (2,2,2) → quadratic. Coefficient = 2÷2 = 1. Subtract n²: remainder is 1. Answer: n² + 1. Always check both differences!'
      },
      {
        question: 'Find the 8th term of the geometric sequence with first term 5 and common ratio 2',
        workingOut: `Step 1: Identify given information
First term a = 5
Common ratio r = 2
Want n = 8

Step 2: Use formula nth term = arⁿ⁻¹
8th term = 5 × 2⁸⁻¹
= 5 × 2⁷

Step 3: Calculate 2⁷
2¹ = 2
2² = 4
2³ = 8
2⁴ = 16
2⁵ = 32
2⁶ = 64
2⁷ = 128

Step 4: Multiply
= 5 × 128
= 640

Step 5: Check makes sense
Sequence: 5, 10, 20, 40, 80, 160, 320, 640
(doubling each time) ✓

Answer: 640`,
        answer: '640',
        explanation: 'Geometric: nth term = arⁿ⁻¹. Given a=5, r=2, need n=8. Calculate: 5 × 2⁷ = 5 × 128 = 640. Remember: power is n-1, not n! Geometric sequences grow quickly.'
      },
      {
        question: 'Is the sequence 1, 4, 9, 16, 25... arithmetic, quadratic, or geometric?',
        workingOut: `Step 1: Check if arithmetic
First differences:
4 - 1 = 3
9 - 4 = 5
16 - 9 = 7
25 - 16 = 9

Not constant → NOT arithmetic

Step 2: Check if geometric
Ratios:
4 ÷ 1 = 4
9 ÷ 4 = 2.25
16 ÷ 9 = 1.78...

Not constant → NOT geometric

Step 3: Check if quadratic
Second differences:
5 - 3 = 2
7 - 5 = 2
9 - 7 = 2

Constant! → QUADRATIC

Step 4: Recognize pattern
1 = 1²
4 = 2²
9 = 3²
16 = 4²
25 = 5²

This is square numbers!
nth term = n²

Answer: Quadratic (specifically, square numbers)`,
        answer: 'Quadratic (n²)',
        explanation: 'First differences not constant (3,5,7,9) → not arithmetic. Ratios not constant → not geometric. Second differences constant (2,2,2) → quadratic! Actually square numbers: 1², 2², 3²... nth term = n².'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'What is 3, 9, 27, 81...?',
        options: ['Geometric', 'Arithmetic', 'Quadratic', 'Fibonacci'],
        answer: 'Geometric',
        explanation: 'Multiply by 3 each time (9÷3=3, 27÷9=3). Geometric!',
        difficulty: 'easy'
      },
      {
        question: 'Second difference constant means?',
        options: ['Quadratic', 'Arithmetic', 'Geometric', 'Linear'],
        answer: 'Quadratic',
        explanation: 'Constant second difference = quadratic sequence (contains n²)',
        difficulty: 'easy'
      },
      {
        question: 'For geometric sequence, nth term formula?',
        options: ['arⁿ⁻¹', 'an²+bn+c', 'dn+c', 'n(n+1)/2'],
        answer: 'arⁿ⁻¹',
        explanation: 'Geometric: nth term = arⁿ⁻¹ (a=first term, r=ratio)',
        difficulty: 'easy'
      },
      {
        question: 'Find 5th term: 2, 8, 32, 128...',
        options: ['512', '256', '1024', '64'],
        answer: '512',
        explanation: 'Geometric, r=4. 5th term = 2×4⁴ = 2×256 = 512',
        difficulty: 'medium'
      },
      {
        question: 'What is 1, 3, 6, 10, 15...?',
        options: ['Triangular', 'Square', 'Cubic', 'Fibonacci'],
        answer: 'Triangular',
        explanation: 'Triangular numbers: n(n+1)/2. Sum of first n integers.',
        difficulty: 'medium'
      },
      {
        question: 'If 2nd difference is 6, coefficient of n² is?',
        options: ['3', '6', '2', '12'],
        answer: '3',
        explanation: 'Coefficient of n² = (second difference) ÷ 2 = 6÷2 = 3',
        difficulty: 'medium'
      },
      {
        question: 'Sequence: 5, 20, 80, 320. Common ratio?',
        options: ['4', '5', '15', '16'],
        answer: '4',
        explanation: 'Divide consecutive: 20÷5=4, 80÷20=4. Ratio = 4',
        difficulty: 'easy'
      },
      {
        question: 'nth term of 2, 8, 18, 32, 50...?',
        options: ['2n²', 'n²+1', '2n²-2', 'n²+n'],
        answer: '2n²',
        explanation: 'Second difference = 4, so a=2. Subtract 2n²: remainder 0. Answer: 2n²',
        difficulty: 'hard'
      },
      {
        question: 'Which grows fastest?',
        options: ['Geometric', 'Quadratic', 'Arithmetic', 'All same'],
        answer: 'Geometric',
        explanation: 'Geometric (exponential) grows fastest, then quadratic, then arithmetic',
        difficulty: 'medium'
      },
      {
        question: 'Fibonacci sequence rule?',
        options: ['Add previous two', 'Multiply by ratio', 'Add constant', 'Square n'],
        answer: 'Add previous two',
        explanation: 'Fibonacci: each term = sum of previous two (1,1,2,3,5,8...)',
        difficulty: 'easy'
      }
    ],
    
    tips: [
      '⭐ Check first differences first (arithmetic?), then second (quadratic?), then ratios (geometric?)',
      '⭐ For quadratic: coefficient of n² = (second difference) ÷ 2',
      '⭐ For geometric: always check ratio for ALL consecutive terms',
      '⭐ Remember: geometric nth term uses n-1 as power (arⁿ⁻¹)',
      '⭐ Always verify nth term formula with first 3-4 terms',
      '⭐ Quadratic sequences grow faster than arithmetic but slower than geometric',
      '⭐ Learn to recognize special sequences: squares (n²), triangular (n(n+1)/2)',
      '⭐ For exam: show all differences/ratios to prove sequence type'
    ],
    
    commonMistakes: [
      '❌ Not checking second differences when first aren\'t constant',
      '❌ For geometric: using n instead of n-1 in formula (should be arⁿ⁻¹)',
      '❌ Dividing second difference by wrong number (divide by 2, not 1!)',
      '❌ Not checking all consecutive terms for ratio (checking just first two)',
      '❌ Confusing arithmetic with quadratic (check second difference!)',
      '❌ Forgetting to subtract an² when finding linear part',
      '❌ Not simplifying geometric formula (e.g., 2 × 3ⁿ⁻¹ not 6ⁿ⁻¹)',
      '❌ Assuming first sequence type without checking others'
    ],
    
    examStrategy: `
**Question Types & Marks:**

**Identify sequence type (1-2 marks):**
- Show differences or ratios
- State type clearly

**Find nth term (3-4 marks):**
- Show working (differences/ratios)
- Derive formula step by step
- Verify with 1-2 terms

**Find specific term (2 marks):**
- Substitute n value
- Show calculation
- Give final answer

**Real-world problem (4-5 marks):**
- Identify sequence type
- Form nth term
- Calculate required value
- Interpret in context

**Grade Boundaries:**
- Grade 6: Identify types, simple geometric nth terms
- Grade 7: Quadratic nth terms, harder geometric
- Grade 8: Complex quadratics, mixed questions
- Grade 9: Proof questions, unfamiliar sequences

**Systematic Approach:**

**Step 1: Identify Type**

Check in order:
1. First differences constant? → Arithmetic
2. Second differences constant? → Quadratic
3. Ratios constant? → Geometric
4. Other pattern? → Special sequence

**Step 2: Find nth Term**

**For Quadratic:**
1. Calculate a = (2nd diff) ÷ 2
2. Subtract an² from each term
3. Find nth term of remainder
4. Combine: an² + (remainder nth term)

**For Geometric:**
1. Find first term a
2. Find common ratio r
3. Write: arⁿ⁻¹
4. Simplify if possible

**Step 3: Verify**
Test formula with n=1, n=2, n=3

**Calculator Use:**

Helpful for:
- Calculating large powers (2⁷, etc.)
- Verifying specific terms
- Checking ratios

Still show algebraic working!

**Time Management:**
- Identify type: 1 minute
- Find nth term (quadratic): 5-6 minutes
- Find nth term (geometric): 3-4 minutes
- Specific term calculation: 2 minutes

**Common Exam Phrases:**
- "Find the nth term" = derive general formula
- "What type of sequence" = arithmetic/quadratic/geometric
- "Find the 10th term" = calculate using formula
- "Show that" = prove with working
- "Hence" = use previous answer

**Top Scoring Tips:**

1. **Show all differences** - proves you checked properly
2. **Label clearly** - "1st diff:", "2nd diff:", "ratio:"
3. **Write formula explicitly** - nth term = ... before substituting
4. **Check your answer** - verify with given terms
5. **Simplify geometric** - write in simplest form

**Proof Questions:**

"Show that nth term is 2n² + 3"

Must:
1. Find second difference → proves quadratic
2. Show coefficient = 2
3. Show remainder gives +3
4. Conclude nth term = 2n² + 3

Can't just verify with examples!

**Word Problem Strategy:**

Example: "Bacteria triple every hour. Start with 50. How many after 5 hours?"

1. **Identify:** Geometric (×3 each time)
2. **First term:** a = 50
3. **Ratio:** r = 3
4. **Formula:** 50 × 3ⁿ⁻¹
5. **Calculate:** n = 5: 50 × 3⁴ = 50 × 81 = 4050
6. **Answer:** 4050 bacteria

**Quick Recognition:**

**Arithmetic:**
- Add/subtract constant
- Linear growth
- nth term = dn + c

**Quadratic:**
- 2nd difference constant
- Parabolic growth
- nth term = an² + bn + c

**Geometric:**
- Multiply by constant ratio
- Exponential growth
- nth term = arⁿ⁻¹

**Special Patterns:**
- 1, 4, 9, 16... → n²
- 1, 8, 27, 64... → n³
- 1, 3, 6, 10... → n(n+1)/2
- 1, 1, 2, 3, 5, 8... → Fibonacci

**Practice Priority:**

Appears in MOST Higher papers!
- Typical: 4-6 marks per paper
- Quadratic sequences = Grade 7-9
- Often in context problems
- Foundation for more advanced topics

Master differences and ratios = unlock sequences!
`
  },

  // ==================== MODULE 7: GRAPHS (QUADRATIC, CUBIC, RECIPROCAL) ====================
  {
    moduleNumber: 7,
    title: 'Graphs (Quadratic, Cubic, Reciprocal)',
    duration: '90 minutes',
    introduction: 'Master sketching and interpreting non-linear graphs - essential Grade 7-9 skill. Learn to recognize graph shapes, find key features (turning points, asymptotes), and solve equations graphically. Builds on linear graphs from Foundation!',
    
    keyPoints: [
      'Quadratic (y = ax² + bx + c): U-shape or ∩-shape (parabola)',
      'Cubic (y = ax³ + bx² + cx + d): S-shape or backwards S',
      'Reciprocal (y = k/x): Two curves in opposite quadrants (hyperbola)',
      'Turning point: Where graph changes direction (max/min)',
      'Line of symmetry: Quadratics have vertical line through turning point',
      'Asymptote: Line graph approaches but never touches',
      'Table of values: Calculate y for given x values, plot, join with smooth curve'
    ],
    
    explanation: `
**QUADRATIC GRAPHS**

**General Form: y = ax² + bx + c**

**Shape:**
- If a > 0: U-shape (opens upward) - minimum point
- If a < 0: ∩-shape (opens downward) - maximum point

**Key Features:**

**1. Turning Point (Vertex)**
- Minimum (U-shape) or maximum (∩-shape)
- x-coordinate: x = -b/(2a)
- Substitute back to find y-coordinate

**2. Line of Symmetry**
- Vertical line through turning point
- x = -b/(2a)

**3. y-intercept**
- Where graph crosses y-axis (x = 0)
- y = c

**4. Roots (x-intercepts)**
- Where graph crosses x-axis (y = 0)
- Solve ax² + bx + c = 0

**Example 1:** y = x² + 2x - 3

**Step 1:** Turning point
x = -b/(2a) = -2/(2×1) = -1
y = (-1)² + 2(-1) - 3 = 1 - 2 - 3 = -4
Turning point: (-1, -4)

**Step 2:** y-intercept
x = 0: y = -3
Point: (0, -3)

**Step 3:** Roots
x² + 2x - 3 = 0
(x + 3)(x - 1) = 0
x = -3 or x = 1

**Step 4:** Shape
a = 1 > 0, so U-shape

**Example 2:** Table of values for y = x² - 4x + 3

x:  -1   0   1   2   3   4   5
y:   8   3   0  -1   0   3   8

Plot points, join with smooth U-curve

**CUBIC GRAPHS**

**General Form: y = ax³ + bx² + cx + d**

**Shape:**
- If a > 0: Bottom-left to top-right (S-shape)
- If a < 0: Top-left to bottom-right (backwards S)

**Key Features:**

**1. Up to 2 turning points**
- Can have maximum AND minimum
- Or no turning points

**2. Up to 3 roots**
- Can cross x-axis up to 3 times

**3. y-intercept**
- y = d (when x = 0)

**4. End behavior**
- As x → ∞, y → ∞ (if a > 0)
- As x → -∞, y → -∞ (if a > 0)

**Example 3:** y = x³ - 3x

**Table of values:**
x:  -3  -2  -1   0   1   2   3
y: -18  -2   2   0  -2   2  18

Shape: S-curve passing through origin
Turning points near x = ±1

**Simple Cubics:**

**y = x³**
- Through origin
- No turning points
- Smooth S-shape

**y = -x³**
- Through origin
- Backwards S-shape

**RECIPROCAL GRAPHS**

**Form: y = k/x (k is constant)**

**Shape: Hyperbola**
- Two separate curves
- In opposite quadrants

**Key Features:**

**1. Asymptotes**
- x-axis (y = 0): horizontal asymptote
- y-axis (x = 0): vertical asymptote
- Graph approaches but NEVER touches

**2. Symmetry**
- If k > 0: Curves in quadrants 1 and 3
- If k < 0: Curves in quadrants 2 and 4

**3. No x or y intercepts**
- Never crosses axes
- Undefined at x = 0

**Example 4:** y = 6/x

**Table of values:**
x:  -6  -3  -2  -1   1   2   3   6
y:  -1  -2  -3  -6   6   3   2   1

Curves in quadrants 1 and 3
Asymptotes: x = 0 and y = 0

**Example 5:** y = -4/x

Curves in quadrants 2 and 4 (k negative)

**EXPONENTIAL GRAPHS**

**Form: y = aˣ (a > 0)**

**Shape:**
- Rapid growth
- Always positive
- Horizontal asymptote at y = 0

**Example 6:** y = 2ˣ

x:  -3  -2  -1   0   1   2   3
y: 0.125 0.25 0.5  1   2   4   8

Curve increases rapidly
Never touches x-axis (asymptote y = 0)

**GRAPH TRANSFORMATIONS**

**Vertical Translation: y = f(x) + k**
- Shift up k units (k > 0)
- Shift down k units (k < 0)

**Horizontal Translation: y = f(x - k)**
- Shift right k units (k > 0)
- Shift left k units (k < 0)

**Vertical Stretch: y = kf(x)**
- Stretch by factor k (k > 1)
- Compress by factor k (0 < k < 1)

**Reflection in x-axis: y = -f(x)**
- Flip upside down

**Example 7:** y = x² + 3
- Start with y = x²
- Shift up 3 units

**SOLVING EQUATIONS GRAPHICALLY**

**Example 8:** Solve x² - 3x + 1 = 0 graphically

**Step 1:** Plot y = x² - 3x + 1

**Step 2:** Find where graph crosses x-axis (y = 0)

**Step 3:** Read x-coordinates of crossing points

Solutions: x ≈ 0.4 and x ≈ 2.6

**Finding Intersection Points:**

To solve x² = 2x + 3:

**Method 1:** Rearrange to x² - 2x - 3 = 0, find roots

**Method 2:** Plot both y = x² and y = 2x + 3
Find where graphs intersect

**SKETCHING GRAPHS**

**Key steps:**

1. **Identify type** (quadratic/cubic/reciprocal)
2. **Find key features** (turning points, intercepts, asymptotes)
3. **Plot a few points** (especially important points)
4. **Draw smooth curve** (no sharp corners!)
5. **Label** (axes, key points, equation)

**REAL-WORLD GRAPHS**

**Quadratic:**
- Projectile motion (thrown ball)
- Area vs. side length

**Cubic:**
- Volume vs. side length
- Some population models

**Reciprocal:**
- Speed vs. time for fixed distance
- Concentration over time

**Exponential:**
- Compound interest
- Population growth
- Radioactive decay
`,
    
    examples: [
      {
        question: 'For y = x² - 6x + 5, find the turning point',
        workingOut: `Step 1: Identify values
y = x² - 6x + 5
a = 1, b = -6, c = 5

Step 2: Find x-coordinate of turning point
x = -b/(2a)
x = -(-6)/(2×1)
x = 6/2
x = 3

Step 3: Find y-coordinate
Substitute x = 3:
y = (3)² - 6(3) + 5
y = 9 - 18 + 5
y = -4

Step 4: State turning point
Turning point: (3, -4)

Step 5: Determine if max or min
a = 1 > 0, so U-shape
Therefore MINIMUM point

Step 6: Check by plotting nearby points
x = 2: y = 4 - 12 + 5 = -3 (higher than -4) ✓
x = 4: y = 16 - 24 + 5 = -3 (higher than -4) ✓

Answer: Turning point (3, -4) - minimum`,
        answer: '(3, -4) - minimum',
        explanation: 'For y = ax² + bx + c, x-coordinate of turning point = -b/(2a). Here: -(-6)/(2×1) = 3. Substitute back: y = 9-18+5 = -4. Point: (3,-4). Since a>0, U-shape, so minimum. Always check a to determine max/min!'
      },
      {
        question: 'What shape is the graph of y = -2x² + 4x + 1?',
        workingOut: `Step 1: Identify type of equation
Highest power is x² → Quadratic
Quadratic = parabola (U or ∩ shape)

Step 2: Check coefficient of x²
a = -2

Step 3: Determine shape
If a > 0: U-shape (opens upward)
If a < 0: ∩-shape (opens downward)

Here a = -2 < 0

Step 4: Describe shape
∩-shape (upside-down U)

Step 5: Additional info
- Opens downward
- Has MAXIMUM point (not minimum)
- Branches go down towards -∞

Step 6: Check with test point
x = 0: y = 1 (positive, above x-axis initially)
x = 3: y = -2(9) + 12 + 1 = -5 (goes negative)
Confirms downward opening ✓

Answer: ∩-shape (upside-down parabola), opens downward, has maximum`,
        answer: '∩-shape (upside-down U), opens downward',
        explanation: 'Quadratic with a = -2 < 0 gives ∩-shape (upside-down U). Negative coefficient of x² means opens downward, has maximum point. Positive coefficient gives U-shape with minimum. Check coefficient sign first!'
      },
      {
        question: 'Describe the graph of y = 12/x',
        workingOut: `Step 1: Identify type
y = k/x where k = 12
This is a RECIPROCAL graph (hyperbola)

Step 2: Determine quadrants
k = 12 > 0 (positive)
Curves in quadrants 1 and 3

Step 3: Identify asymptotes
Vertical asymptote: x = 0 (y-axis)
(Can't divide by zero)
Horizontal asymptote: y = 0 (x-axis)
(As x → ±∞, y → 0)

Step 4: Key features
- Two separate curves
- Never touches axes
- Gets closer to axes but never reaches
- Symmetrical about y = x

Step 5: Plot some points
x = 1: y = 12
x = 2: y = 6
x = 3: y = 4
x = 6: y = 2
x = 12: y = 1

Negative x values give negative y

Answer: Reciprocal graph with curves in quadrants 1 and 3, asymptotes at x = 0 and y = 0`,
        answer: 'Reciprocal (hyperbola) in quadrants 1 & 3, asymptotes x=0, y=0',
        explanation: 'y = 12/x is reciprocal graph. k=12 > 0, so curves in quadrants 1 & 3. Two asymptotes: x=0 (vertical) and y=0 (horizontal). Graph approaches but never touches these lines. Two separate curves, never crosses axes!'
      },
      {
        question: 'How many turning points can y = x³ - 3x² + 2 have?',
        workingOut: `Step 1: Identify type
Highest power is x³ → Cubic graph

Step 2: Recall cubic properties
Cubic graphs can have:
- 0 turning points (monotonic)
- 1 turning point (at inflection)
- 2 turning points (local max and min)

Step 3: For this specific cubic
y = x³ - 3x² + 2

To find exact number, would need calculus
(Find where dy/dx = 0)

But at GCSE level, know:
General cubic CAN have up to 2 turning points

Step 4: This particular graph
y = x³ - 3x² + 2 HAS 2 turning points
(One local maximum, one local minimum)

Step 5: General rule
Cubic: UP TO 2 turning points
Quadratic: ALWAYS 1 turning point

Answer: 2 turning points (for this cubic)

Note: At GCSE, often asked "up to how many" = 2`,
        answer: '2 (one maximum, one minimum)',
        explanation: 'Cubic graphs (y = ax³ + ...) can have UP TO 2 turning points. This specific cubic (x³ - 3x² + 2) has 2: one local max and one local min. General cubic might have 0, 1, or 2. Quadratics always have exactly 1.'
      },
      {
        question: 'Solve x² - 5x + 4 = 0 by sketching the graph',
        workingOut: `Step 1: Set up for graphical solution
Need to find where y = x² - 5x + 4 crosses x-axis
(Where y = 0)

Step 2: Find key features
Turning point:
x = -b/(2a) = -(-5)/(2×1) = 2.5
y = (2.5)² - 5(2.5) + 4 = 6.25 - 12.5 + 4 = -2.25
Turning point: (2.5, -2.25)

y-intercept: (0, 4)

Step 3: Additional points
x = 1: y = 1 - 5 + 4 = 0 ✓ (crosses!)
x = 4: y = 16 - 20 + 4 = 0 ✓ (crosses!)
x = 2: y = 4 - 10 + 4 = -2
x = 3: y = 9 - 15 + 4 = -2

Step 4: Sketch graph
U-shape (a = 1 > 0)
Minimum at (2.5, -2.25)
Crosses x-axis at x = 1 and x = 4

Step 5: Read solutions
Solutions are x-intercepts:
x = 1 and x = 4

Step 6: Verify algebraically
x² - 5x + 4 = 0
(x - 1)(x - 4) = 0
x = 1 or x = 4 ✓

Answer: x = 1 and x = 4`,
        answer: 'x = 1 and x = 4',
        explanation: 'To solve graphically: sketch y = x² - 5x + 4, find where it crosses x-axis (y=0). Find turning point (2.5, -2.25), plot points, draw U-curve. Crosses at x=1 and x=4. These are the solutions! Can verify by factorizing.'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'What shape is y = x²?',
        options: ['U-shape', 'S-shape', 'Two curves', 'Straight line'],
        answer: 'U-shape',
        explanation: 'Quadratic with positive coefficient → U-shape (parabola)',
        difficulty: 'easy'
      },
      {
        question: 'What shape is y = x³?',
        options: ['S-shape', 'U-shape', 'Two curves', 'Circle'],
        answer: 'S-shape',
        explanation: 'Cubic with positive coefficient → S-shape curve',
        difficulty: 'easy'
      },
      {
        question: 'What shape is y = 1/x?',
        options: ['Two curves', 'U-shape', 'S-shape', 'V-shape'],
        answer: 'Two curves',
        explanation: 'Reciprocal → two curves (hyperbola) in opposite quadrants',
        difficulty: 'easy'
      },
      {
        question: 'For y = -x², the graph is?',
        options: ['∩-shape (upside-down U)', 'U-shape', 'S-shape', 'Two curves'],
        answer: '∩-shape (upside-down U)',
        explanation: 'Negative coefficient of x² → opens downward (∩-shape)',
        difficulty: 'easy'
      },
      {
        question: 'Asymptote means?',
        options: ['Line graph approaches but never touches', 'Turning point', 'y-intercept', 'Root'],
        answer: 'Line graph approaches but never touches',
        explanation: 'Asymptote: line that graph gets infinitely close to but never reaches',
        difficulty: 'easy'
      },
      {
        question: 'For y = 5/x, asymptotes are?',
        options: ['x=0 and y=0', 'x=5 and y=5', 'No asymptotes', 'x=0 only'],
        answer: 'x=0 and y=0',
        explanation: 'Reciprocal always has x=0 and y=0 as asymptotes (both axes)',
        difficulty: 'medium'
      },
      {
        question: 'y = x² - 4x + 3, turning point x-coordinate?',
        options: ['2', '4', '-2', '3'],
        answer: '2',
        explanation: 'x = -b/(2a) = -(-4)/(2×1) = 4/2 = 2',
        difficulty: 'medium'
      },
      {
        question: 'How many roots can cubic have?',
        options: ['Up to 3', 'Always 2', 'Always 1', 'Up to 2'],
        answer: 'Up to 3',
        explanation: 'Cubic can cross x-axis 1, 2, or 3 times (up to 3 roots)',
        difficulty: 'medium'
      },
      {
        question: 'For y = k/x with k > 0, curves in?',
        options: ['Quadrants 1 & 3', 'Quadrants 2 & 4', 'All quadrants', 'Quadrant 1 only'],
        answer: 'Quadrants 1 & 3',
        explanation: 'Positive k: curves in quadrants 1 (both +) and 3 (both -)',
        difficulty: 'medium'
      },
      {
        question: 'Quadratic always has how many turning points?',
        options: ['Exactly 1', 'Up to 2', 'Up to 3', 'None'],
        answer: 'Exactly 1',
        explanation: 'Quadratic (parabola) always has exactly one turning point (vertex)',
        difficulty: 'easy'
      }
    ],
    
    tips: [
      '⭐ Quadratic: Check sign of a (positive = U, negative = ∩)',
      '⭐ Turning point formula: x = -b/(2a), then substitute to find y',
      '⭐ Reciprocal: ALWAYS has asymptotes at x=0 and y=0',
      '⭐ Draw smooth curves - no sharp corners or straight bits!',
      '⭐ For reciprocal with k>0: curves in quadrants 1 & 3',
      '⭐ Cubic can have 0, 1, or 2 turning points',
      '⭐ Always label key points (turning point, intercepts)',
      '⭐ Use table of values for accurate plotting'
    ],
    
    commonMistakes: [
      '❌ Drawing parabola with sharp corner at turning point (should be smooth!)',
      '❌ Making reciprocal curves touch axes (they\'re asymptotes!)',
      '❌ Wrong shape for negative coefficient (forgetting upside-down)',
      '❌ Not calculating turning point correctly (check formula!)',
      '❌ Drawing straight lines between points (curves need smooth joining)',
      '❌ Forgetting to extend reciprocal curves far enough',
      '❌ Mixing up U and ∩ shapes',
      '❌ Not checking which quadrants reciprocal curves appear in'
    ],
    
    examStrategy: `
**Question Types & Marks:**

**Sketch graph (3-4 marks):**
- Identify shape
- Find key features
- Plot accurately
- Label clearly

**Find turning point (2-3 marks):**
- Use formula x = -b/(2a)
- Calculate y-coordinate
- State coordinates

**Complete table of values (2-3 marks):**
- Substitute each x
- Calculate y accurately
- Show working

**Solve graphically (3-4 marks):**
- Sketch graph
- Identify crossing points
- Read off solutions
- State to required accuracy

**Transformations (3-4 marks):**
- Describe transformation
- Sketch new graph
- Label key points

**Grade Boundaries:**
- Grade 6: Sketch simple quadratics, recognize shapes
- Grade 7: Find turning points, reciprocal graphs
- Grade 8: Cubics, transformations, graphical solutions
- Grade 9: Complex combinations, unfamiliar graphs

**Systematic Approach to Sketching:**

**For Quadratics (y = ax² + bx + c):**

1. **Shape:** Check sign of a
   - a > 0: U-shape
   - a < 0: ∩-shape

2. **Turning point:**
   x = -b/(2a)
   Calculate y

3. **y-intercept:** (0, c)

4. **Roots:** Solve ax² + bx + c = 0
   (if factorisable)

5. **Plot & draw smooth curve**

**For Cubics (y = ax³ + ...):**

1. **Shape:** Check sign of a
   - a > 0: S-shape (↗)
   - a < 0: backwards S (↘)

2. **y-intercept:** Find y when x = 0

3. **Table of values:**
   Calculate 5-7 points
   Include negative and positive x

4. **Plot & draw smooth S-curve**

**For Reciprocals (y = k/x):**

1. **Asymptotes:** x = 0 and y = 0

2. **Quadrants:** 
   - k > 0: Quadrants 1 & 3
   - k < 0: Quadrants 2 & 4

3. **Key points:**
   Calculate where x = ±1, ±2, ±k

4. **Draw curves:**
   Two separate curves
   Approach asymptotes

**Calculator Use:**

Essential for:
- Calculating y-values
- Finding turning points
- Checking roots
- Graphing functions (if allowed)

Always show algebraic working!

**Time Management:**
- Identify graph type: 30 seconds
- Find key features: 2-3 minutes
- Plot points: 2-3 minutes
- Draw and label: 2 minutes
- Check: 1 minute

**Top Scoring Tips:**

1. **Use ruler for axes** - neatness counts
2. **Label everything** - axes, scales, key points
3. **Smooth curves only** - no straight sections!
4. **Show working** - especially for turning points
5. **Check shape** - U/∩/S/hyperbola correct?

**Common Exam Phrases:**
- "Sketch" = rough shape with key features
- "Plot accurately" = use table of values
- "Hence" = use previous answer
- "State coordinates" = give (x, y) format
- "Read off" = from graph

**Table of Values Strategy:**

**Step 1:** Calculate methodically
Show: x value, calculation, y value

**Step 2:** Check calculations
Recalculate any that look wrong

**Step 3:** Plot accurately
Use sharp pencil
Mark small crosses/dots

**Step 4:** Join smoothly
Use smooth curve (not straight!)

**Graphical Solutions:**

To solve f(x) = g(x):

**Method 1:** Rearrange to f(x) - g(x) = 0
Plot y = f(x) - g(x)
Find x-intercepts

**Method 2:** Plot y = f(x) and y = g(x)
Find intersection points

**Transformations Quick Reference:**

- **y = f(x) + a:** Shift up a
- **y = f(x) - a:** Shift down a
- **y = f(x + a):** Shift left a
- **y = f(x - a):** Shift right a
- **y = af(x):** Vertical stretch factor a
- **y = -f(x):** Reflect in x-axis
- **y = f(-x):** Reflect in y-axis

**Real-World Contexts:**

**Quadratic:**
- Height vs time (projectile)
- Profit vs price
- Area problems

**Cubic:**
- Volume vs dimension
- Advanced physics

**Reciprocal:**
- Speed vs time (constant distance)
- Dilution/concentration

**Practice Priority:**

Graphs appear in EVERY Higher paper!
- Typical: 6-10 marks per paper
- Quadratics most common
- Reciprocals = Grade 7-9
- Often combined with algebra

Master graph shapes = visual understanding of functions!
`
  }
];

export default gcseMathsHigherContent;
