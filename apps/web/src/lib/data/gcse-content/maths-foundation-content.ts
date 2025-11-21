/**
 * GCSE Mathematics Foundation Tier - Complete Revision Content
 * Updated for 2025/2026 Academic Year
 * Covers: AQA 8300, Edexcel 1MA1, OCR J560, WJEC
 * Target Grades: 1-5
 */

// Match the interface from 11+ content for compatibility
export interface LessonContent {
  moduleNumber: number;
  title: string;
  duration: string;
  introduction: string;
  keyPoints: string[];
  explanation: string;
  examples: {
    question: string;
    workingOut: string;
    answer: string;
    explanation: string;
  }[];
  practiceQuestions: {
    question: string;
    options?: string[];
    answer: string;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
  tips: string[];
  commonMistakes: string[];
  examStrategy: string;
}

export const gcseMathsFoundationContent: LessonContent[] = [
  // ==================== MODULE 1: NUMBER SKILLS ====================
  {
    moduleNumber: 1,
    title: 'Number Skills (BIDMAS, Place Value, Rounding)',
    duration: '60 minutes',
    introduction: 'Master essential number skills tested in every GCSE Maths Foundation exam. This module covers BIDMAS order of operations, place value understanding, rounding techniques, and working with negative numbers - fundamental skills that appear across all exam papers and are worth up to 15% of your total marks.',
    
    keyPoints: [
      'BIDMAS: The correct order for calculations - Brackets, Indices, Division/Multiplication (left to right), Addition/Subtraction (left to right)',
      'Place value: Each digit position is worth 10 times more than the position to its right',
      'Rounding: Look at the next digit - if 5 or more round up, if less than 5 round down',
      'Negative numbers: Use a number line to visualize additions and subtractions',
      'Estimating: Round numbers to 1 significant figure to check your calculator answers make sense',
      'Standard calculations must show clear working for method marks'
    ],
    
    explanation: `
**Understanding BIDMAS**

BIDMAS is your guide to the correct order of operations. It tells you which calculations to do first when you have multiple operations:

**B** - Brackets (do everything in brackets first)
**I** - Indices (powers and roots)
**D** - Division
**M** - Multiplication
**A** - Addition
**S** - Subtraction

**Important:** Division and Multiplication have the same priority - do them left to right. Same for Addition and Subtraction - do them left to right.

**Place Value Explained**

Our number system is based on place value. Each position represents a different value:

Thousands | Hundreds | Tens | Ones | . | Tenths | Hundredths
  1,000   |   100    |  10  |  1   | . |  0.1   |   0.01

For example, in the number 3,456:
- 3 is in the thousands place = 3,000
- 4 is in the hundreds place = 400
- 5 is in the tens place = 50
- 6 is in the ones place = 6

**Rounding Rules**

When rounding to any place value:
1. Identify the digit in the place you're rounding to
2. Look at the next digit to the right
3. If it's 5 or more → round UP (increase the digit by 1)
4. If it's less than 5 → round DOWN (keep the digit the same)
5. Replace all digits to the right with zeros

**Example:** Round 4,376 to the nearest hundred
- Hundreds digit is 3 (representing 300)
- Next digit is 7 (which is 5 or more)
- Round UP: 4,400

**Working with Negative Numbers**

Think of negative numbers on a number line:

← ─────────────────────────────────────── →
   -5  -4  -3  -2  -1   0   1   2   3   4   5

**Adding** = moving RIGHT on the number line
**Subtracting** = moving LEFT on the number line

**Example:** -3 + 7
Start at -3, move 7 places RIGHT: -3, -2, -1, 0, 1, 2, 3, 4
Answer: 4

**Estimating to Check Answers**

Always estimate before using a calculator:
1. Round each number to 1 significant figure (first non-zero digit)
2. Do the calculation with rounded numbers
3. Compare with your calculator answer

If they're very different, you've made an error!

**Example:** Estimate 38.7 × 21.3
- Round 38.7 → 40 (1 s.f.)
- Round 21.3 → 20 (1 s.f.)
- Estimate: 40 × 20 = 800
- Actual answer should be close to 800
`,
    
    examples: [
      {
        question: 'Work out: 3 + 4 × 2',
        workingOut: `Step 1: Identify the operations
We have addition (+) and multiplication (×)

Step 2: Apply BIDMAS
Multiplication comes before addition

Step 3: Do multiplication first
4 × 2 = 8

Step 4: Then do addition
3 + 8 = 11`,
        answer: '11',
        explanation: 'Common error: Many students calculate left to right (3 + 4 = 7, then 7 × 2 = 14). This is wrong! Always follow BIDMAS - multiplication before addition. The correct answer is 11.'
      },
      {
        question: 'Round 4,376 to the nearest hundred',
        workingOut: `Step 1: Identify the hundreds digit
The hundreds digit is 3 (representing 300)

Step 2: Look at the next digit to the right
The next digit is 7

Step 3: Apply rounding rule
7 is 5 or more, so we round UP

Step 4: Round up the hundreds digit
3 becomes 4, so 300 becomes 400

Step 5: Write the complete rounded number
4,400 (replace digits after hundreds with zeros)`,
        answer: '4,400',
        explanation: 'Make sure you include the correct number of zeros! When rounding to the nearest hundred, your answer must end in two zeros. So 4,376 rounded to the nearest hundred is 4,400 (not 44 or 4,4).'
      },
      {
        question: 'Calculate: -8 + 5',
        workingOut: `Step 1: Draw or visualize a number line
...  -9  -8  -7  -6  -5  -4  -3  -2  -1  0  1 ...

Step 2: Start at -8 on the number line

Step 3: Adding means moving RIGHT
Move 5 places to the right

Step 4: Count the moves
-8 → -7 → -6 → -5 → -4 → -3

Step 5: You end at -3`,
        answer: '-3',
        explanation: 'When adding a positive number to a negative number, you move right on the number line. Starting at -8 and moving right 5 places brings you to -3. You can also think of it as: you owe £8 (−8), you receive £5 (+5), you still owe £3 (−3).'
      },
      {
        question: 'Estimate the value of 38.7 × 21.3',
        workingOut: `Step 1: Round 38.7 to 1 significant figure
The first significant figure is 3
Look at the next digit: 8 (5 or more)
Round UP: 40

Step 2: Round 21.3 to 1 significant figure
The first significant figure is 2
Look at the next digit: 1 (less than 5)
Keep as: 20

Step 3: Multiply the rounded numbers
40 × 20 = 800

Step 4: Check with calculator (actual answer)
38.7 × 21.3 = 824.31
Our estimate of 800 is close, so answer is reasonable`,
        answer: '800 (estimate) or 824.31 (exact)',
        explanation: 'Estimating is crucial for checking calculator work! By rounding to 1 significant figure (the first non-zero digit), we get 40 × 20 = 800. The actual answer (824.31) is close to our estimate, confirming we haven\'t made a big error. If your calculator showed 8243.1 or 82.431, you\'d know immediately something went wrong!'
      },
      {
        question: 'Work out: 24 ÷ (3 + 1)',
        workingOut: `Step 1: Identify brackets
There are brackets: (3 + 1)

Step 2: BIDMAS - Brackets first
3 + 1 = 4

Step 3: Now do the division
24 ÷ 4 = 6`,
        answer: '6',
        explanation: 'Brackets always come first in BIDMAS! You must calculate what\'s inside the brackets (3 + 1 = 4) before doing the division. If you did 24 ÷ 3 first, you\'d get 8 + 1 = 9, which is wrong. Always: Brackets → then other operations.'
      },
      {
        question: 'Calculate: (5 + 3)² - 4 × 3',
        workingOut: `This is a complex BIDMAS question testing multiple skills!

Step 1: Identify what to do first
B = Brackets: (5 + 3)
I = Indices: The ² (square)
D/M = 4 × 3
A/S = The subtraction

Step 2: Do BRACKETS first
5 + 3 = 8
Now we have: 8² - 4 × 3

Step 3: Do INDICES next
8² = 8 × 8 = 64
Now we have: 64 - 4 × 3

Step 4: Do MULTIPLICATION before subtraction
4 × 3 = 12
Now we have: 64 - 12

Step 5: Finally do SUBTRACTION
64 - 12 = 52`,
        answer: '52',
        explanation: 'This question has THREE operations from BIDMAS: Brackets (first!), Indices (second!), then Multiplication (before subtraction). Common mistake: Doing 64 - 4 = 60, then 60 × 3 = 180 (wrong!). Always multiply BEFORE you subtract. The working should be: (5+3)=8 → 8²=64 → 4×3=12 → 64-12=52'
      },
      {
        question: 'Temperature problem: The temperature at midnight was -6°C. By midday it had risen by 11°C. What was the midday temperature?',
        workingOut: `This is a real-world negative number problem.

Step 1: Identify what we know
Starting temperature: -6°C
Temperature RISES by: +11°C (rise means add)

Step 2: Write the calculation
-6 + 11 = ?

Step 3: Method 1 - Number line
Start at -6 on the number line
Move 11 places to the RIGHT (because adding)
-6 → -5 → -4 → -3 → -2 → -1 → 0 → 1 → 2 → 3 → 4 → 5

Step 4: Method 2 - Think about it
From -6 to 0 is 6 degrees
From 0 to the answer is 11 - 6 = 5 degrees
So answer is +5°C

Step 5: Check
-6 + 11 = 5 ✓`,
        answer: '5°C',
        explanation: 'Temperature questions are common in GCSE! When temperature RISES, you add. When it FALLS, you subtract. Starting at -6°C and rising 11°C gives 5°C. Think of it like this: it needs to rise 6°C just to get to 0°C, then it has 5°C more to go, ending at 5°C. Always use a number line if you find negative numbers tricky!'
      },
      {
        question: 'Round 45,682 to: (a) the nearest thousand, (b) 2 significant figures, (c) 1 decimal place if expressed as 45.682',
        workingOut: `This multi-part rounding question tests different types of rounding.

PART (a): Round to nearest THOUSAND

Step 1: Identify the thousands digit
45,682 → The 5 represents 5 thousands

Step 2: Look at the next digit
The next digit is 6 (the hundreds)

Step 3: Apply rule
6 is ≥5, so round UP
5 thousands becomes 6 thousands

Step 4: Complete the answer
46,000 (replace everything after with zeros)

PART (b): Round to 2 SIGNIFICANT FIGURES

Step 1: Find the first 2 significant figures
45,682 → First two digits are 4 and 5

Step 2: Look at the next digit
The next digit is 6

Step 3: Apply rule
6 is ≥5, so round UP
45 becomes 46

Step 4: Keep the place value correct
46,000 (need the thousands, so add 3 zeros)

PART (c): Round 45.682 to 1 DECIMAL PLACE

Step 1: Identify 1st decimal place
45.682 → The 6 is the first decimal place

Step 2: Look at next digit
The next digit is 8

Step 3: Apply rule
8 is ≥5, so round UP
6 becomes 7

Step 4: Write answer
45.7`,
        answer: '(a) 46,000  (b) 46,000  (c) 45.7',
        explanation: 'Notice that (a) and (b) have the same answer (46,000) even though they ask for different things! This is a coincidence with this particular number. Make sure you write the right number of zeros - both need 46,000, not 46 or 460. Part (c) is completely different because we\'re treating it as a decimal. Always read carefully: "nearest thousand" vs "2 sig figs" vs "1 decimal place" are THREE different instructions!'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Work out: 15 - 2 × 3',
        options: ['9', '39', '13', '11'],
        answer: '9',
        explanation: 'BIDMAS: Do multiplication first! 2 × 3 = 6, then 15 - 6 = 9. Don\'t calculate left to right (15 - 2 = 13, then 13 × 3 = 39 is wrong).',
        difficulty: 'easy'
      },
      {
        question: 'Round 23,456 to the nearest thousand',
        options: ['23,000', '24,000', '20,000', '23,500'],
        answer: '23,000',
        explanation: 'The thousands digit is 3. The next digit is 4 (less than 5), so round DOWN. Answer: 23,000. Remember to include all the zeros!',
        difficulty: 'easy'
      },
      {
        question: 'Calculate: -3 + 7',
        options: ['4', '-4', '10', '-10'],
        answer: '4',
        explanation: 'Start at -3 on the number line. Adding 7 means move 7 places RIGHT: -3, -2, -1, 0, 1, 2, 3, 4. You end at 4.',
        difficulty: 'medium'
      },
      {
        question: 'Work out: 8 × (2 + 3)',
        options: ['40', '21', '13', '26'],
        answer: '40',
        explanation: 'Brackets first! (2 + 3) = 5, then 8 × 5 = 40. BIDMAS: Brackets before multiplication.',
        difficulty: 'medium'
      },
      {
        question: 'Estimate: 19.8 + 42.1',
        options: ['60', '62', '70', '50'],
        answer: '60',
        explanation: 'Round to 1 s.f.: 19.8 ≈ 20, 42.1 ≈ 40. Estimate: 20 + 40 = 60. (Actual answer is 61.9, so our estimate is good!)',
        difficulty: 'easy'
      },
      {
        question: 'Work out: -5 - 3',
        options: ['-8', '-2', '8', '2'],
        answer: '-8',
        explanation: 'Start at -5 on number line. Subtracting 3 means move 3 places LEFT: -5, -6, -7, -8. Answer: -8.',
        difficulty: 'medium'
      },
      {
        question: 'Round 6.847 to 1 decimal place',
        options: ['6.8', '6.9', '7.0', '6.85'],
        answer: '6.8',
        explanation: '1st decimal place is 8. Next digit is 4 (less than 5), so round DOWN. Keep 8 as is: 6.8',
        difficulty: 'medium'
      },
      {
        question: 'Work out: 50 ÷ 5 + 2',
        options: ['12', '5', '10', '52'],
        answer: '12',
        explanation: 'Division before addition. 50 ÷ 5 = 10, then 10 + 2 = 12. Don\'t add first (5 + 2 = 7, then 50 ÷ 7 is wrong).',
        difficulty: 'medium'
      },
      {
        question: 'Calculate: -2 - (-5)',
        options: ['3', '-7', '-3', '7'],
        answer: '3',
        explanation: 'Subtracting a negative is the same as adding: -2 - (-5) = -2 + 5 = 3. Two negatives make a positive!',
        difficulty: 'hard'
      },
      {
        question: 'Work out: 3² + 4 × 2',
        options: ['17', '22', '14', '49'],
        answer: '17',
        explanation: 'BIDMAS: Indices first (3² = 9), then multiplication (4 × 2 = 8), then addition (9 + 8 = 17).',
        difficulty: 'hard'
      }
    ],
    
    tips: [
      '⭐ Always show your working - you get method marks even if the final answer is wrong',
      '⭐ Write BIDMAS at the top of your working if you\'re unsure of the order',
      '⭐ Use estimation to check every calculator answer - if they\'re very different, recalculate',
      '⭐ Draw a number line in the margin when working with negative numbers',
      '⭐ Read the question carefully: "nearest hundred" vs "nearest ten" vs "1 decimal place" are different',
      '⭐ In non-calculator papers, show every step of your calculation clearly',
      '⭐ Check your answer makes sense - if you\'re finding 10% of £50, the answer can\'t be £500!',
      '⭐ For rounding, circle the digit you\'re rounding to, then look at the next digit'
    ],
    
    commonMistakes: [
      '❌ Calculating left to right without following BIDMAS (3 + 4 × 2 = 14 ✗, should be 11 ✓)',
      '❌ Forgetting zeros when rounding (4,376 → 44 instead of 4,400)',
      '❌ Adding instead of subtracting with negatives (-3 + -4 = 1 ✗, should be -7 ✓)',
      '❌ Not simplifying after rounding (writing 4,300 instead of 4,400 when rounding 4,376 to nearest hundred)',
      '❌ Treating -5 - 3 the same as -5 + 3 (they\'re different!)',
      '❌ Not checking calculator answers with estimates',
      '❌ Mixing up "nearest 10" with "nearest 100" with "1 significant figure"',
      '❌ Doing 50 ÷ 5 + 2 as 50 ÷ 7 = 7.14 (wrong order!)',
      '❌ Forgetting that indices (powers) come before multiplication in BIDMAS'
    ],
    
    examStrategy: `
**Non-Calculator Paper Strategy:**
Show ALL working clearly - each line of working can earn a method mark even if your final answer is wrong. For BIDMAS questions, write out each step on a new line. Use the 10% method for percentages (find 10%, then build up).

**Calculator Paper Strategy:**
Still show your method! Write down the calculation you're putting into the calculator. Always estimate first - if your calculator answer is wildly different from your estimate, you've pressed wrong buttons. For complex calculations, use brackets on your calculator.

**Time Management:**
These questions are usually worth 1-2 marks each, so spend 1-2 minutes maximum. If you're stuck, move on and come back later - don't waste time!

**Mark Allocation:**
- Simple BIDMAS: 1-2 marks (show working!)
- Rounding: 1 mark (must be exact answer with correct zeros)
- Negative numbers: 1-2 marks (draw number line if unsure)
- Estimation: 2 marks (must show your rounding AND the calculation)

**Top Tip for Grade 5:**
Master this module completely - these skills appear in 30% of Foundation paper questions. If you can do BIDMAS, rounding, and negative numbers confidently, you're well on your way to Grade 4-5!
`
  },

  // ==================== MODULE 2: FRACTIONS, DECIMALS, PERCENTAGES ====================
  {
    moduleNumber: 2,
    title: 'Fractions, Decimals, and Percentages (FDP)',
    duration: '75 minutes',
    introduction: 'Learn to convert between fractions, decimals, and percentages, and solve real-world problems. This is one of the most commonly tested topics in GCSE Foundation - worth up to 25% of your total marks! Master these skills and you\'ll see them everywhere in your exam.',
    
    keyPoints: [
      'Converting: Fraction → Decimal (divide top by bottom), Decimal → Percentage (× 100), Percentage → Fraction (over 100, then simplify)',
      'Essential conversions to memorize: ½=0.5=50%, ¼=0.25=25%, ¾=0.75=75%, ⅕=0.2=20%, ⅒=0.1=10%, ⅛=0.125=12.5%',
      'Finding percentages: Use 10%, 5%, or 1% as building blocks (especially for non-calculator)',
      'Percentage increase/decrease: Find the percentage amount, then ADD (increase) or SUBTRACT (decrease)',
      'Simplifying fractions: Divide top and bottom by the same number (highest common factor is fastest)',
      'Comparing fractions: Convert to same denominator or convert to decimals'
    ],
    
    explanation: `
**Understanding Fractions, Decimals, and Percentages**

These are three different ways of showing the same thing - parts of a whole!

**Fraction** = Part/Whole (e.g., ¾ = 3 parts out of 4)
**Decimal** = Based on 10s (e.g., 0.75 = 75 hundredths)
**Percentage** = Out of 100 (e.g., 75% = 75 out of 100)

**Key Conversions You MUST Know:**

| Fraction | Decimal | Percentage |
|----------|---------|------------|
| ½        | 0.5     | 50%        |
| ¼        | 0.25    | 25%        |
| ¾        | 0.75    | 75%        |
| ⅕        | 0.2     | 20%        |
| ⅒        | 0.1     | 10%        |
| ⅛        | 0.125   | 12.5%      |
| ⅓        | 0.333..  | 33.3%      |
| ⅔        | 0.666..  | 66.7%      |

**Converting Between FDP:**

**Fraction → Decimal:**
Divide the top number by the bottom number
Example: ⅗ → 3 ÷ 5 = 0.6

**Decimal → Percentage:**
Multiply by 100 (move decimal point 2 places right)
Example: 0.6 → 0.6 × 100 = 60%

**Percentage → Fraction:**
Put over 100, then simplify
Example: 60% → 60/100 → 6/10 → 3/5

**Finding Percentages (Non-Calculator Method):**

The 10% method is your best friend!

**To find 10%:** Divide by 10
**To find 5%:** Find 10%, then halve it
**To find 1%:** Divide by 100

Then build up to what you need!

**Example: Find 35% of £80**
- 10% = £80 ÷ 10 = £8
- 30% = £8 × 3 = £24
- 5% = £8 ÷ 2 = £4
- 35% = £24 + £4 = £28

**Percentage Increase and Decrease:**

**Increase:** 
1. Find the percentage of the original
2. ADD it to the original

**Example:** Increase £60 by 20%
- 20% of £60 = £12
- £60 + £12 = £72

**Decrease:**
1. Find the percentage of the original
2. SUBTRACT it from the original

**Example:** Decrease £80 by 25%
- 25% of £80 = £20
- £80 - £20 = £60

**Simplifying Fractions:**

Divide the top AND bottom by the same number.
Best method: Find the Highest Common Factor (HCF)

**Example:** Simplify 12/18
- Factors of 12: 1, 2, 3, 4, 6, 12
- Factors of 18: 1, 2, 3, 6, 9, 18
- HCF = 6
- 12÷6 = 2, 18÷6 = 3
- Answer: ⅔

**Comparing Fractions:**

Method 1: Convert to decimals
Method 2: Convert to equivalent fractions with same denominator

**Example:** Which is bigger: ⅗ or ⅔?
- ⅗ = 0.6
- ⅔ = 0.666...
- ⅔ is bigger
`,
    
    examples: [
      {
        question: 'Convert ⅗ to a decimal',
        workingOut: `Step 1: Understand what the fraction means
⅗ means 3 divided by 5

Step 2: Divide the top by the bottom
3 ÷ 5

Step 3: Work out the division
  0.6
5│3.0
  3.0
  ---
  0.0

Step 4: Write the answer
0.6`,
        answer: '0.6',
        explanation: 'To convert ANY fraction to a decimal, divide the top number by the bottom number. For ⅗: 3 ÷ 5 = 0.6. Quick check: You can also remember that ⅕ = 0.2, so ⅗ = 3 × 0.2 = 0.6 ✓'
      },
      {
        question: 'Find 15% of £60 (non-calculator)',
        workingOut: `Step 1: Find 10% (divide by 10)
10% of £60 = £60 ÷ 10 = £6

Step 2: Find 5% (half of 10%)
5% of £60 = £6 ÷ 2 = £3

Step 3: Add them together
15% = 10% + 5%
15% = £6 + £3 = £9

Step 4: Check it makes sense
15% is close to ⅙, and ⅙ of £60 = £10 ✓`,
        answer: '£9',
        explanation: 'The 10% method is perfect for non-calculator papers! Find 10% by dividing by 10, then build up other percentages. For 15%, we need 10% + 5%. Since 5% is half of 10%, this is easy to calculate: £6 + £3 = £9. Always check your answer makes sense!'
      },
      {
        question: 'A jacket costs £80. It is reduced by 20% in a sale. What is the sale price?',
        workingOut: `Step 1: Find 20% of the original price
10% of £80 = £8
20% = 2 × £8 = £16

Step 2: DECREASE means SUBTRACT
This is a reduction, so subtract
£80 - £16 = £64

Step 3: Check the answer
Reduced by 20% means you pay 80%
80% of £80 = £64 ✓

Answer: £64`,
        answer: '£64',
        explanation: 'Two-step question: (1) Find the percentage, (2) Subtract for decrease. Common error: Students find 20% = £16 but forget to subtract it! The question asks for the NEW price, not the reduction amount. Always read carefully: "reduced BY 20%" means subtract, "increased BY 20%" means add.'
      },
      {
        question: 'Simplify the fraction 12/18',
        workingOut: `Step 1: Find factors of top and bottom
Factors of 12: 1, 2, 3, 4, 6, 12
Factors of 18: 1, 2, 3, 6, 9, 18

Step 2: Find the Highest Common Factor (HCF)
Common factors: 1, 2, 3, 6
HCF = 6

Step 3: Divide both by HCF
12 ÷ 6 = 2
18 ÷ 6 = 3

Step 4: Write simplified fraction
⅔

Step 5: Check - can we simplify further?
Factors of 2: 1, 2
Factors of 3: 1, 3
Only common factor is 1, so fully simplified ✓`,
        answer: '⅔',
        explanation: 'To simplify, divide top AND bottom by the same number. Using the HCF (6) gets you to the answer fastest. You could also simplify in steps: 12/18 → 6/9 → 2/3, dividing by 2 then by 3. Both methods work! Always check your final answer can\'t be simplified further.'
      },
      {
        question: 'Write 35% as a fraction in its simplest form',
        workingOut: `Step 1: Write percentage as fraction over 100
35% = 35/100

Step 2: Find HCF of 35 and 100
Factors of 35: 1, 5, 7, 35
Factors of 100: 1, 2, 4, 5, 10, 20, 25, 50, 100
HCF = 5

Step 3: Divide both by HCF
35 ÷ 5 = 7
100 ÷ 5 = 20

Step 4: Write simplified fraction
7/20

Step 5: Check if fully simplified
Factors of 7: 1, 7
Factors of 20: 1, 2, 4, 5, 10, 20
Only common factor is 1 ✓`,
        answer: '7/20',
        explanation: 'Any percentage can be written as a fraction over 100. Then simplify! 35% = 35/100. Both 35 and 100 divide by 5, giving 7/20. This is fully simplified because 7 and 20 share no common factors except 1. Remember: the question asks for "simplest form" - you must simplify!'
      },
      {
        question: 'Shopping problem: A jacket costs £85. The shop has a "20% off" sale. How much do you pay?',
        workingOut: `This is a percentage DECREASE problem - very common in GCSE!

METHOD 1: Find the discount, then subtract

Step 1: Find 20% of £85 (the discount amount)
Using the 10% method:
10% of £85 = £85 ÷ 10 = £8.50
20% = 2 × 10% = 2 × £8.50 = £17

Step 2: Subtract the discount from original price
£85 - £17 = £68

You pay £68 ✓

METHOD 2: Multiplier method (faster!)

Step 1: Work out what percentage you pay
100% - 20% = 80%
(If there's 20% OFF, you pay 80%)

Step 2: Convert to decimal multiplier
80% = 0.8

Step 3: Multiply original by the multiplier
£85 × 0.8 = £68

You pay £68 ✓

CHECK: Does this make sense?
20% off means roughly ⅕ off
⅕ of £85 ≈ £17
£85 - £17 = £68 ✓ Makes sense!`,
        answer: '£68',
        explanation: 'Sale problems are everywhere in GCSE! "20% off" means you pay 80% of the original price. Two methods work: (1) Find 20% and subtract it, or (2) multiply by 0.8 (which represents 80%). Method 2 is faster once you understand it. The key is recognizing that "20% off" means "pay 80%". Common mistake: Finding 20% = £17 and thinking that\'s the answer - NO! £17 is the DISCOUNT, but the question asks how much you PAY, which is £85 - £17 = £68.'
      },
      {
        question: 'Real-world mixed problem: In a class of 30 students, ⅗ are girls. Of the girls, 40% wear glasses. How many girls wear glasses?',
        workingOut: `This is a multi-step problem combining fractions and percentages.

Step 1: Find how many girls there are
Need to find ⅗ of 30

Method: Divide by denominator, multiply by numerator
30 ÷ 5 = 6 (this is ⅕)
6 × 3 = 18 (this is ⅗)

There are 18 girls ✓

Step 2: Find 40% of the girls
Need to find 40% of 18

Using 10% method:
10% of 18 = 18 ÷ 10 = 1.8
40% = 4 × 1.8 = 7.2

But WAIT - you can't have 0.2 of a person!

Step 3: Check the question
"How many girls wear glasses?"
Must be a whole number

Step 4: Round appropriately
7.2 girls → 7 girls
(In real context, round down to 7)

Alternative check:
40% is close to ½
Half of 18 = 9
So 7 is reasonable (bit less than half) ✓`,
        answer: '7 girls',
        explanation: 'Multi-step problems test whether you can combine different topics. First: ⅗ of 30 = 18 girls. Second: 40% of 18 = 7.2 ≈ 7 girls. Key point: You can\'t have 0.2 of a person, so round to 7. Always think about context - does your answer make sense? If the question was about money, £7.20 would be fine, but people must be whole numbers!'
      },
      {
        question: 'Compare fractions WITHOUT a calculator: Put these in order from smallest to largest: ⅗, ⁷⁄₁₀, ½',
        workingOut: `When you can't use a calculator, you need a smart method!

METHOD 1: Convert to equivalent fractions with same denominator

Step 1: Find a common denominator
Denominators are: 5, 10, 2
Lowest common multiple (LCM) of 5, 10, 2 = 10

Step 2: Convert each fraction to tenths
⅗ = ?/10
Multiply top and bottom by 2: (3×2)/(5×2) = 6/10

⁷⁄₁₀ = ⁷⁄₁₀ (already in tenths!)

½ = ?/10
Multiply top and bottom by 5: (1×5)/(2×5) = 5/10

Step 3: Now compare (same denominator!)
6/10, ⁷⁄₁₀, 5/10

Step 4: Put in order from smallest to largest
5/10 < 6/10 < ⁷⁄₁₀
½ < ⅗ < ⁷⁄₁₀

METHOD 2: Convert to percentages (if you know them!)

⅗ = 60% (6 parts out of 10)
⁷⁄₁₀ = 70% (7 parts out of 10)
½ = 50% (standard conversion)

Order: 50% < 60% < 70%
So: ½ < ⅗ < ⁷⁄₁₀`,
        answer: '½, ⅗, ⁷⁄₁₀',
        explanation: 'Without a calculator, convert to a common denominator (usually the LCM of the denominators). Here, 10 works perfectly: ½=5/10, ⅗=6/10, ⁷⁄₁₀ stays as 7/10. Now it\'s easy to see 5<6<7, so ½<⅗<⁷⁄₁₀. Common mistake: Saying ⅗ is bigger than ⁷⁄₁₀ because "3 is less than 7" - you can\'t compare numerators when denominators are different! Always find common denominator first.'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Convert 0.4 to a fraction in its simplest form',
        options: ['⅖', '4/10', '2/5', '1/4'],
        answer: '⅖',
        explanation: '0.4 = 4/10 (4 tenths). Simplify by dividing both by 2: 4÷2=2, 10÷2=5, giving ⅖. Note: ⅖ and 2/5 are the same answer!',
        difficulty: 'easy'
      },
      {
        question: 'What is 25% of 80?',
        options: ['15', '20', '25', '30'],
        answer: '20',
        explanation: '25% = ¼, so 80 ÷ 4 = 20. Or: 10% of 80 = 8, so 25% = 2.5 × 8 = 20. Or: 0.25 × 80 = 20.',
        difficulty: 'easy'
      },
      {
        question: 'A TV costs £400. The price increases by 10%. What is the new price?',
        options: ['£410', '£440', '£450', '£360'],
        answer: '£440',
        explanation: '10% of £400 = £40. INCREASE means ADD: £400 + £40 = £440. Common error: writing £40 (that\'s the increase, not the new price!)',
        difficulty: 'medium'
      },
      {
        question: 'Simplify 15/20',
        options: ['¾', '⅗', '5/10', '3/4'],
        answer: '¾',
        explanation: 'HCF of 15 and 20 is 5. Divide both: 15÷5=3, 20÷5=4, giving ¾. Note: ¾ and 3/4 are the same!',
        difficulty: 'easy'
      },
      {
        question: 'Convert 70% to a fraction in its simplest form',
        options: ['7/10', '70/100', '14/20', '35/50'],
        answer: '7/10',
        explanation: '70% = 70/100. Divide both by 10: 70÷10=7, 100÷10=10, giving 7/10. This is fully simplified.',
        difficulty: 'easy'
      },
      {
        question: 'Find 12% of £50 (non-calculator)',
        options: ['£6', '£12', '£5', '£10'],
        answer: '£6',
        explanation: '10% of £50 = £5. 1% of £50 = £0.50. So 12% = 10% + 1% + 1% = £5 + £0.50 + £0.50 = £6. Or: 12% = 10% + 2% = £5 + £1 = £6.',
        difficulty: 'medium'
      },
      {
        question: 'Which is larger: ⅗ or ⅔?',
        options: ['⅗', '⅔', 'They are equal', 'Cannot compare'],
        answer: '⅔',
        explanation: 'Convert to decimals: ⅗=0.6, ⅔=0.666... So ⅔ is larger. Or: convert to 15ths: ⅗=9/15, ⅔=10/15, so ⅔ is bigger.',
        difficulty: 'medium'
      },
      {
        question: 'A £60 item is reduced by 30%. What is the sale price?',
        options: ['£42', '£30', '£40', '£18'],
        answer: '£42',
        explanation: '30% of £60: 10%=£6, 30%=£18. Decrease: £60-£18=£42. Or: paying 70%, so 0.7×£60=£42.',
        difficulty: 'medium'
      },
      {
        question: 'Express ⅜ as a decimal',
        options: ['0.375', '0.38', '0.4', '0.3'],
        answer: '0.375',
        explanation: '⅜ means 3÷8. Using calculator or long division: 3÷8=0.375. Quick check: ⅛=0.125, so ⅜=3×0.125=0.375.',
        difficulty: 'hard'
      },
      {
        question: 'Increase £45 by 40%',
        options: ['£63', '£18', '£85', '£53'],
        answer: '£63',
        explanation: '40% of £45: 10%=£4.50, 40%=£18. Increase means ADD: £45+£18=£63. Or: 140%=1.4, so 1.4×£45=£63.',
        difficulty: 'hard'
      }
    ],
    
    tips: [
      '⭐ Learn the key conversions by heart (½, ¼, ¾, ⅕, ⅒) - saves time in exams!',
      '⭐ Use the 10% method for non-calculator papers - it\'s quick and reliable',
      '⭐ Always check if the question asks for simplest form - you must simplify!',
      '⭐ For percentage problems, identify if it\'s increase (ADD) or decrease (SUBTRACT)',
      '⭐ Show your working clearly - even if answer is wrong, you get method marks',
      '⭐ Read carefully: "Find 20%" vs "Find new price after 20% increase" are different questions',
      '⭐ Check answers make sense: 50% should be half, 10% should be a tenth',
      '⭐ In calculator paper, convert to decimals for easier calculation (35% = 0.35)'
    ],
    
    commonMistakes: [
      '❌ Finding the percentage but forgetting to add/subtract it for the new price',
      '❌ Not simplifying fractions when question says "simplest form"',
      '❌ Converting 0.4 to 4% instead of 40% (forgot to ×100)',
      '❌ Mixing up increase and decrease (adding when should subtract)',
      '❌ Writing 4/10 when answer should be simplified to ⅖',
      '❌ Calculating percentage of wrong number (25% of new price instead of original)',
      '❌ Forgetting to show working on non-calculator paper',
      '❌ Using wrong base for percentage (finding % of reduced price instead of original)',
      '❌ Rounding too early in multi-step problems'
    ],
    
    examStrategy: `
**Non-Calculator Paper:**
Master the 10% method! Find 10% by dividing by 10, then build up other percentages (5% = half of 10%, 1% = divide by 100). Show EVERY step of your working - each step can earn marks. For fractions, show the HCF and the division clearly.

**Calculator Paper:**
Convert percentages to decimals (35% = 0.35) for calculator work. STILL show your method - write "10% of £80 = £8" before calculating. For tricky fractions, convert to decimals using ÷ button, but simplify the fraction answer by hand (don't write 0.4, write ⅖).

**Common Question Types (Foundation):**
1. Simple conversions (1-2 marks)
2. Finding percentages of amounts (2 marks)
3. Percentage increase/decrease (3 marks - find % then add/subtract)
4. Simplifying fractions (1-2 marks)
5. Real-world problems (shopping, discounts) (3-4 marks)

**Time Management:**
FDP questions range from 1-4 marks. Spend roughly 1 minute per mark. Don't get stuck on one question - come back to it!

**Mark Maximization:**
- Always show method even if answer wrong
- Use ≈ symbol for estimates
- Write units (£, kg, m) in your answer
- Simplify fractions unless told not to
- Check answer makes sense (50% should be half!)

**Grade 5 Target:**
Get confident with ALL percentage types including increase/decrease. Be able to convert between FDP fluently. This topic is worth 20-25 marks on Foundation tier - master it for Grade 4-5!
`
  },

  // ==================== MODULE 3: RATIO AND PROPORTION ====================
  {
    moduleNumber: 3,
    title: 'Ratio and Proportion',
    duration: '70 minutes',
    introduction: 'Master ratio and proportion - essential skills that appear in every GCSE Foundation exam. Learn to share amounts in ratios, solve proportion problems, find best buys, and work with recipes and maps. These real-world applications are worth 15-20 marks in your exam!',
    
    keyPoints: [
      'Ratio shows relative sizes: 3:2 means for every 3 of one thing, there are 2 of another',
      'Simplifying ratios: Divide all parts by the highest common factor (like simplifying fractions)',
      'Sharing in a ratio: (1) Add all ratio parts, (2) Divide total by sum, (3) Multiply each part by result',
      'Direct proportion: Both quantities increase/decrease together (double one, double the other)',
      'Best buy problems: Calculate price per unit (per 100g, per kg, per litre) to compare value',
      'ALWAYS convert to same units before working with ratios (e.g., convert cm to m, or minutes to hours)'
    ],
    
    explanation: `
**Understanding Ratios**

A ratio compares the sizes of two or more quantities. It shows how many times one value contains another.

**Example:** In a class, there are 15 boys and 10 girls
Ratio of boys to girls = 15:10 (simplifies to 3:2)
This means: for every 3 boys, there are 2 girls

**Simplifying Ratios**

Just like fractions! Divide all parts by the same number.

**Example:** Simplify 12:18
- Find HCF of 12 and 18 = 6
- Divide both by 6: 12÷6 = 2, 18÷6 = 3
- Answer: 2:3

**Important:** ALWAYS convert to same units first!

**Example:** Simplify 30 minutes : 2 hours
- Convert to same units: 2 hours = 120 minutes
- Now: 30:120
- Simplify: 30÷30 = 1, 120÷30 = 4
- Answer: 1:4

**Sharing in a Ratio (Most Common Question!)**

**3-Step Method:**

**Step 1:** Add all ratio parts
**Step 2:** Divide total amount by the sum
**Step 3:** Multiply each ratio part by the result

**Example:** Share £60 in ratio 2:3

Step 1: Add parts: 2 + 3 = 5 parts total
Step 2: Find 1 part: £60 ÷ 5 = £12
Step 3: Find each share:
- First share: 2 × £12 = £24
- Second share: 3 × £12 = £36

**Check:** £24 + £36 = £60 ✓

**Direct Proportion**

When two quantities are in direct proportion:
- If one doubles, the other doubles
- If one halves, the other halves

**Method:** Find the amount for ONE, then multiply

**Example:** 4 pencils cost £2. How much do 10 pencils cost?

Step 1: Find cost of 1 pencil
£2 ÷ 4 = £0.50 per pencil

Step 2: Find cost of 10 pencils
10 × £0.50 = £5

**Recipe Problems (Direct Proportion)**

Recipe for 4 people → Recipe for 10 people?

**Method:**
1. Find amount per person (divide by 4)
2. Multiply by new number of people (× 10)

**Example:** Recipe for 4 needs 200g flour
- Per person: 200g ÷ 4 = 50g
- For 10 people: 50g × 10 = 500g

**Best Buy Problems**

To find best value, calculate price per same unit (usually per 100g or per kg)

**Example:** 
- Pack A: 500g for £2.50
- Pack B: 750g for £3.50

Which is better value?

Pack A: £2.50 ÷ 500g = £0.005 per g = 50p per 100g
Pack B: £3.50 ÷ 750g = £0.00467 per g = 46.7p per 100g

Pack B is better value (cheaper per 100g)

**Inverse Proportion (Higher/Grade 5 only)**

When one quantity increases, the other decreases:
- More workers → Less time
- Faster speed → Less time

**Example:** 4 workers take 6 hours
How long for 3 workers?

Total work = 4 × 6 = 24 worker-hours
For 3 workers: 24 ÷ 3 = 8 hours
`,
    
    examples: [
      {
        question: 'Simplify the ratio 12:18',
        workingOut: `Step 1: Find factors of both numbers
Factors of 12: 1, 2, 3, 4, 6, 12
Factors of 18: 1, 2, 3, 6, 9, 18

Step 2: Find the HCF (Highest Common Factor)
Common factors: 1, 2, 3, 6
HCF = 6

Step 3: Divide both parts by HCF
12 ÷ 6 = 2
18 ÷ 6 = 3

Step 4: Write the simplified ratio
2:3

Step 5: Check if it can be simplified further
Factors of 2: 1, 2
Factors of 3: 1, 3
Only common factor is 1 ✓ Fully simplified`,
        answer: '2:3',
        explanation: 'Simplifying ratios works exactly like simplifying fractions! Find the HCF of all parts and divide through. Here, both 12 and 18 divide by 6, giving us 2:3. Always check your answer can\'t be simplified further - 2 and 3 only share 1 as a common factor, so 2:3 is fully simplified.'
      },
      {
        question: 'Share £60 in the ratio 2:3. Find both shares.',
        workingOut: `Step 1: Add all ratio parts
2 + 3 = 5 parts total

Step 2: Find the value of 1 part
Total amount = £60
1 part = £60 ÷ 5 = £12

Step 3: Find each share
First share (2 parts): 2 × £12 = £24
Second share (3 parts): 3 × £12 = £36

Step 4: CHECK your answer (essential!)
£24 + £36 = £60 ✓
The shares add up to the total ✓`,
        answer: '£24 and £36',
        explanation: 'This 3-step method works for ALL ratio sharing questions! (1) Add parts, (2) Divide total by sum, (3) Multiply each part. ALWAYS check your shares add to the original total - if they don\'t, you\'ve made an error. This check is crucial in exams!'
      },
      {
        question: 'A recipe for 4 people needs 200g of flour. How much flour is needed for 10 people?',
        workingOut: `Step 1: Find the amount for 1 person
200g ÷ 4 = 50g per person

Step 2: Multiply by new number of people
50g × 10 = 500g

Step 3: Check it makes sense
10 people is 2.5 times 4 people
200g × 2.5 = 500g ✓

Alternative method:
Multiplier = 10 ÷ 4 = 2.5
New amount = 200g × 2.5 = 500g`,
        answer: '500g',
        explanation: 'Recipe problems are direct proportion - find the amount for ONE person, then multiply by the new number. This "per 1" method works every time! Alternative: find the multiplier (10÷4=2.5) and multiply the original amount by it (200g×2.5=500g). Both methods work!'
      },
      {
        question: 'Pack A: 500g for £2.50. Pack B: 750g for £3.50. Which is better value?',
        workingOut: `Step 1: Calculate price per 100g for Pack A
£2.50 ÷ 500g = £0.005 per g
£0.005 × 100 = £0.50 per 100g
Or: (£2.50 ÷ 500) × 100 = 50p per 100g

Step 2: Calculate price per 100g for Pack B  
£3.50 ÷ 750g = £0.00467 per g
£0.00467 × 100 = £0.467 per 100g
Or: (£3.50 ÷ 750) × 100 = 46.7p per 100g

Step 3: Compare
Pack A: 50p per 100g
Pack B: 46.7p per 100g
Pack B is cheaper per 100g

Step 4: State the answer clearly
Pack B is better value`,
        answer: 'Pack B is better value (46.7p per 100g compared to 50p per 100g)',
        explanation: 'To compare value, calculate price per SAME unit (per 100g or per kg). Divide the price by the weight, then multiply to get per 100g. Pack B costs 46.7p per 100g vs Pack A at 50p per 100g, so Pack B is cheaper per 100g = better value. Always use the same unit for fair comparison!'
      },
      {
        question: 'Simplify the ratio 30 minutes : 2 hours',
        workingOut: `Step 1: Convert to SAME UNITS first!
This is crucial - we can't compare minutes to hours

2 hours = 2 × 60 = 120 minutes

Step 2: Rewrite ratio with same units
30 minutes : 120 minutes
or just: 30:120

Step 3: Simplify (find HCF)
Factors of 30: 1, 2, 3, 5, 6, 10, 15, 30
Factors of 120: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 40, 60, 120
HCF = 30

Step 4: Divide both by HCF
30 ÷ 30 = 1
120 ÷ 30 = 4

Step 5: Write answer
1:4`,
        answer: '1:4',
        explanation: 'CRITICAL: Always convert to same units BEFORE simplifying! Here, convert 2 hours to 120 minutes. Now we have 30:120, which simplifies to 1:4. If you tried to simplify 30:2 without converting, you\'d get 15:1 which is completely wrong! Same units → then simplify.'
      },
      {
        question: 'Three-way ratio: Tom, Sarah, and Jake share £240 in the ratio 2:3:5. How much does each person get?',
        workingOut: `Three-way ratios work the same as two-way - just more parts!

Step 1: Add ALL ratio parts
2 + 3 + 5 = 10 parts total

Step 2: Find the value of ONE part
£240 ÷ 10 = £24 per part

Step 3: Calculate each person's share
Tom gets 2 parts: 2 × £24 = £48
Sarah gets 3 parts: 3 × £24 = £72
Jake gets 5 parts: 5 × £24 = £120

Step 4: CHECK your answer (essential!)
£48 + £72 + £120 = £240 ✓
The shares add up to the total - answer is correct!

Understanding who gets what:
Jake gets the most (5 parts = £120)
Sarah gets middle amount (3 parts = £72)
Tom gets the least (2 parts = £48)
Ratio 2:3:5 means Jake gets more than double Tom's amount`,
        answer: 'Tom: £48, Sarah: £72, Jake: £120',
        explanation: 'Three-way ratios appear in Foundation tier! The method is EXACTLY the same: (1) Add all parts (2+3+5=10), (2) Divide total by parts (£240÷10=£24), (3) Multiply each ratio number by this value (2×£24, 3×£24, 5×£24). ALWAYS check your shares add back to the original total - if they don\'t, you\'ve made an error! Common mistake: Only dividing £240 by 2 or 3, forgetting there are 10 parts total.'
      },
      {
        question: 'Recipe proportion problem: A recipe for 8 people needs 600g chicken, 400ml cream, and 2 onions. Adjust for 6 people.',
        workingOut: `Real-world proportion - very common in GCSE!

Key principle: Everything scales proportionally

Step 1: Find the scaling factor
Going from 8 people to 6 people
6 ÷ 8 = 0.75 (or ¾)
We need 0.75 times (three-quarters) of each ingredient

METHOD 1: Using 0.75 multiplier

CHICKEN:
600g × 0.75 = 450g

CREAM:
400ml × 0.75 = 300ml

ONIONS:
2 × 0.75 = 1.5 onions
Since we can't have half an onion easily, round to 1 or 2
(Use 1 onion if you want less onion flavor, 2 if you like more)

METHOD 2: Find "per person" then multiply

CHICKEN:
Per person = 600g ÷ 8 = 75g per person
For 6 people = 75g × 6 = 450g ✓

CREAM:
Per person = 400ml ÷ 8 = 50ml per person
For 6 people = 50ml × 6 = 300ml ✓

ONIONS:
Per person = 2 ÷ 8 = 0.25 per person
For 6 people = 0.25 × 6 = 1.5 onions ✓

Both methods give same answer!`,
        answer: '450g chicken, 300ml cream, 1-2 onions',
        explanation: 'Recipe problems test proportion. Method 1: Find the scaling factor (6÷8=0.75), then multiply all ingredients by 0.75. Method 2: Find "per person" amounts (divide by 8), then multiply by 6. Both work! For ingredients you can\'t split (like onions), round sensibly - 1.5 onions rounds to 1 or 2. Exam tip: If the question says "adjust recipe," show your working for at least one ingredient clearly - you get marks for method even if you make a calculation error!'
      },
      {
        question: 'Best buy with unit conversion: Pack A is 1.5kg for £6.75. Pack B is 800g for £3.20. Which is better value?',
        workingOut: `Best buy questions need SAME UNITS and SAME AMOUNT to compare!

Problem: Different weights (kg vs g) AND different prices

Step 1: Convert EVERYTHING to same units
Choose grams (smaller unit is easier)
Pack A: 1.5kg = 1500g for £6.75
Pack B: 800g for £3.20

Step 2: Calculate price per 100g for BOTH
(Using 100g makes it easy to compare)

PACK A:
Price per gram = £6.75 ÷ 1500 = £0.0045 per gram
Price per 100g = £0.0045 × 100 = £0.45 = 45p per 100g

PACK B:
Price per gram = £3.20 ÷ 800 = £0.004 per gram
Price per 100g = £0.004 × 100 = £0.40 = 40p per 100g

Step 3: Compare
Pack A: 45p per 100g
Pack B: 40p per 100g
Pack B is cheaper per 100g

Step 4: State conclusion
Pack B is better value (40p per 100g vs 45p per 100g)

Alternative method (per 1kg):
Pack A: 1.5kg = £6.75, so 1kg = £6.75 ÷ 1.5 = £4.50 per kg
Pack B: 800g = £3.20, so 1000g = £3.20 × (1000/800) = £3.20 × 1.25 = £4.00 per kg
Pack B cheaper: £4.00/kg vs £4.50/kg ✓

CHECK: Does this make sense?
Pack B costs less per weight, so it's better value ✓`,
        answer: 'Pack B is better value (40p per 100g)',
        explanation: 'Best buy questions ALWAYS need you to: (1) Convert to SAME UNITS first (kg to g or g to kg), (2) Calculate price per SAME AMOUNT (usually per 100g or per kg), (3) Compare the unit prices, (4) State which is better value. Common mistakes: Forgetting to convert units, or just comparing total prices without considering weights. Remember: You can\'t compare £6.75 for 1.5kg with £3.20 for 800g directly - you must find price per 100g (or per kg) for both!'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Simplify the ratio 15:25',
        options: ['3:5', '5:3', '1:5', '15:25'],
        answer: '3:5',
        explanation: 'HCF of 15 and 25 is 5. Divide both: 15÷5=3, 25÷5=5, giving 3:5. Always simplify ratios unless told not to!',
        difficulty: 'easy'
      },
      {
        question: 'Share £80 in the ratio 3:5. What is the larger share?',
        options: ['£30', '£40', '£50', '£60'],
        answer: '£50',
        explanation: 'Total parts = 3+5=8. One part = £80÷8=£10. Larger share (5 parts) = 5×£10=£50. Check: £30+£50=£80 ✓',
        difficulty: 'medium'
      },
      {
        question: '3 pens cost £1.50. How much do 5 pens cost?',
        options: ['£2.00', '£2.50', '£3.00', '£2.25'],
        answer: '£2.50',
        explanation: 'One pen = £1.50÷3 = £0.50. Five pens = £0.50×5 = £2.50. This is direct proportion - find "per 1" then multiply.',
        difficulty: 'easy'
      },
      {
        question: 'Express 30 minutes : 2 hours in simplest form',
        options: ['30:2', '1:4', '15:1', '1:2'],
        answer: '1:4',
        explanation: 'Convert to same units: 2 hours = 120 minutes. So 30:120. Simplify: divide both by 30 = 1:4. MUST use same units!',
        difficulty: 'medium'
      },
      {
        question: 'A map scale is 1:50,000. A road is 4cm on the map. What is the actual distance in km?',
        options: ['2 km', '20 km', '0.2 km', '200 km'],
        answer: '2 km',
        explanation: 'Actual = 4cm × 50,000 = 200,000cm. Convert: 200,000cm = 2,000m = 2km. Or: 1cm represents 0.5km, so 4cm = 2km.',
        difficulty: 'hard'
      },
      {
        question: 'Share 100 sweets in ratio 2:3. How many sweets in the smaller share?',
        options: ['40', '60', '50', '20'],
        answer: '40',
        explanation: 'Parts = 2+3=5. One part = 100÷5=20. Smaller share (2 parts) = 2×20=40. Larger = 3×20=60. Check: 40+60=100 ✓',
        difficulty: 'easy'
      },
      {
        question: '6 workers take 8 hours to complete a job. How long would 4 workers take?',
        options: ['12 hours', '10 hours', '8 hours', '5 hours'],
        answer: '12 hours',
        explanation: 'Inverse proportion! Total work = 6×8=48 worker-hours. For 4 workers: 48÷4=12 hours. Fewer workers = more time.',
        difficulty: 'hard'
      },
      {
        question: 'Which is better value: 400g for £2.80 or 600g for £3.60?',
        options: ['400g pack', '600g pack', 'Same value', 'Cannot compare'],
        answer: 'Same value',
        explanation: '400g: £2.80÷4=70p per 100g. 600g: £3.60÷6=60p...wait: £3.60÷6=60p per 100g. 70p vs 60p...600g is better! Actually checking: 2.80÷4=0.70, 3.60÷6=0.60. 600g pack is better value at 60p per 100g!',
        difficulty: 'medium'
      },
      {
        question: 'A recipe for 6 people uses 450g sugar. How much for 4 people?',
        options: ['300g', '250g', '350g', '400g'],
        answer: '300g',
        explanation: 'Per person: 450g÷6=75g. For 4 people: 75g×4=300g. Direct proportion: find "per 1" then multiply.',
        difficulty: 'medium'
      },
      {
        question: 'Concrete mix uses cement:sand in ratio 1:3. How much sand for 5kg cement?',
        options: ['15kg', '10kg', '8kg', '5kg'],
        answer: '15kg',
        explanation: '1:3 means for every 1kg cement, use 3kg sand. So for 5kg cement: 5×3=15kg sand. Multiply each part of ratio by 5.',
        difficulty: 'medium'
      }
    ],
    
    tips: [
      '⭐ ALWAYS convert to same units BEFORE working with ratios',
      '⭐ Check your sharing answers add up to the original total',
      '⭐ For recipes/proportion: find "per 1" then multiply',
      '⭐ Best buy: calculate price per 100g or per kg for easy comparison',
      '⭐ Draw a simple diagram if you\'re confused about the ratio',
      '⭐ Write out the 3 steps for ratio sharing - helps avoid mistakes',
      '⭐ For maps: multiply map distance by scale number',
      '⭐ Inverse proportion: more workers = less time (multiply then divide)'
    ],
    
    commonMistakes: [
      '❌ Not converting to same units before simplifying (30 mins:2 hours becoming 15:1 instead of 1:4)',
      '❌ Forgetting to check shares add to the total',
      '❌ Comparing prices without using same unit (comparing 400g price to 600g price directly)',
      '❌ Getting inverse proportion wrong (thinking more workers = more time)',
      '❌ Not simplifying ratios when question says "simplest form"',
      '❌ Adding ratio parts to find each share (wrong!) instead of using them as multipliers',
      '❌ Writing units inconsistently (mixing g and kg in final answer)',
      '❌ For recipes: multiplying wrong number or forgetting to scale all ingredients'
    ],
    
    examStrategy: `
**Question Recognition:**
- "Simplify the ratio" = divide by HCF (1-2 marks)
- "Share £X in ratio..." = 3-step method (3-4 marks)
- "Recipe for X people..." = direct proportion (2-3 marks)  
- "Best buy" = price per unit comparison (3-4 marks)
- "Map scale" = multiply distance by scale (2-3 marks)

**Non-Calculator Strategy:**
Write out ALL steps clearly. For sharing, show: (1) sum of parts, (2) value of 1 part, (3) each share. For recipes, show division and multiplication separately. Each step can earn method marks!

**Calculator Strategy:**
Still show method! Write what you're calculating before using calculator. For best buy, do: "£2.80 ÷ 400 × 100 = 70p per 100g" showing your thinking.

**Common Mark Allocations:**
- Simplify ratio: 1 mark (must be fully simplified!)
- Share in ratio: 3-4 marks (1 for method, 1 for each answer)
- Proportion: 2-3 marks (1 for "per 1", 1 for final answer)
- Best buy: 3 marks (1 for each calculation, 1 for comparison/conclusion)

**Time Management:**
Ratio questions typically worth 3-4 marks = spend 3-4 minutes. Don't get stuck on best buy calculations - if struggling, make a sensible guess and move on!

**Check List:**
✓ Same units before simplifying?
✓ Shares add to total?
✓ Used "per 1" method for proportion?
✓ Price per SAME unit for best buy?
✓ Answer makes sense?

**Grade 5 Target:**
Master ALL ratio types including inverse proportion and map scales. This topic is worth 15-20 marks - essential for Grade 4-5! Practice the 3-step sharing method until it's automatic.
`
  },

  // ==================== MODULE 4: ALGEBRA BASICS ====================
  {
    moduleNumber: 4,
    title: 'Algebra Basics (Simplifying & Expanding)',
    duration: '75 minutes',
    introduction: 'Algebra is the language of mathematics! Master collecting like terms, expanding brackets, and substitution - these fundamental skills are the foundation for 30%+ of your GCSE marks. Every paper has multiple algebra questions, so getting confident here is essential for Grade 4-5.',
    
    keyPoints: [
      'Like terms have exactly the same letter(s): 3x and 5x are like terms, but 3x and 3y are NOT',
      'Collecting like terms: Add or subtract the numbers in front of the same letter',
      'Different letters cannot be combined: 3x + 2y stays as 3x + 2y',
      'Expanding brackets: Multiply EVERYTHING inside by what\'s outside (don\'t forget to multiply both terms!)',
      'Substitution: Replace letters with numbers, then calculate following BIDMAS',
      'Remember: 3x means 3 × x (the multiplication sign is invisible!), and x means 1x'
    ],
    
    explanation: `
**What is Algebra?**

Algebra uses letters to represent unknown numbers. The letters are called **variables** or **unknowns**.

**Example:** 
- In 5x, the x is a variable
- If x = 3, then 5x = 5 × 3 = 15

**Understanding Terms**

A **term** is a number, a letter, or numbers and letters multiplied together:
- 5x is one term
- 3y is one term  
- -2ab is one term
- 7 is one term (called a constant)

**Like Terms vs Unlike Terms**

**Like terms** have exactly the same letter(s):
✓ 3x and 5x (both have just x)
✓ 2ab and 7ab (both have ab)
✓ -4y² and 9y² (both have y²)

**Unlike terms** have different letters:
✗ 3x and 2y (different letters)
✗ 5x and 5x² (different powers)
✗ 2ab and 3a (different letters)

**You can only collect LIKE terms!**

**Collecting Like Terms**

Add or subtract the numbers in front (coefficients), keep the letter:

**Example:** 5x + 3x = 8x
Think: 5 apples + 3 apples = 8 apples

**Example:** 7y - 2y = 5y  
Think: 7 oranges - 2 oranges = 5 oranges

**With multiple letters:**
3x + 2y + 5x - y
= (3x + 5x) + (2y - y)
= 8x + y

**Important Rules:**

1. **x means 1x**
   Example: x + 3x = 1x + 3x = 4x

2. **-x means -1x**
   Example: 5x - x = 5x - 1x = 4x

3. **Numbers without letters are constants**
   Example: 3x + 5 + 2x - 3 = 5x + 2

**Expanding Brackets**

Multiply everything inside the bracket by what's outside:

**Example:** 3(x + 2)
= 3 × x + 3 × 2
= 3x + 6

**COMMON ERROR:** Don't forget the second term!
3(x + 2) ≠ 3x + 2  ✗
3(x + 2) = 3x + 6  ✓

**With negative numbers:**

**Example:** 5(x - 3)
= 5 × x + 5 × (-3)
= 5x - 15

**Example:** -2(x + 4)
= -2 × x + (-2) × 4
= -2x - 8

**Negative × Negative = Positive**
-3(2x - 5)
= -3 × 2x + (-3) × (-5)
= -6x + 15

**Expand and Simplify**

Sometimes you need to expand brackets AND collect like terms:

**Example:** 3(x + 2) + 2(x + 1)

Step 1: Expand each bracket
= 3x + 6 + 2x + 2

Step 2: Collect like terms
= 5x + 8

**Substitution**

Replace letters with numbers and calculate:

**Example:** Find 3x + 7 when x = 5

Step 1: Substitute x = 5
3(5) + 7

Step 2: Calculate (BIDMAS!)
= 15 + 7
= 22

**Important:** Use brackets when substituting negative numbers!

**Example:** Find x² + 2x when x = -3

Step 1: Substitute x = -3 (use brackets!)
(-3)² + 2(-3)

Step 2: Calculate
= 9 + (-6)
= 9 - 6
= 3

**Multiplying Terms**

When multiplying, multiply numbers and add powers:

**Example:** 3x × 4x
= 3 × 4 × x × x
= 12x²

**Example:** 2x × 5
= 10x

Remember: x × x = x² (not 2x!)
`,
    
    examples: [
      {
        question: 'Simplify: 5x + 3x - 2x',
        workingOut: `Step 1: Identify like terms
All terms have x, so they're all like terms

Step 2: Add and subtract the numbers in front
5 + 3 - 2 = 6

Step 3: Keep the letter x
6x

Check: Think of it as apples
5 apples + 3 apples - 2 apples = 6 apples ✓`,
        answer: '6x',
        explanation: 'All terms have the same letter (x), so they\'re like terms. Just add/subtract the numbers in front: 5 + 3 - 2 = 6, then keep the x. Think of x as a "thing" - if you have 5 things, add 3 things, take away 2 things, you have 6 things!'
      },
      {
        question: 'Expand: 4(x + 3)',
        workingOut: `Step 1: Multiply first term inside by outside
4 × x = 4x

Step 2: Multiply second term inside by outside
4 × 3 = 12

Step 3: Write the answer
4x + 12

Check by substituting (e.g., x = 2):
4(2 + 3) = 4(5) = 20
4(2) + 12 = 8 + 12 = 20 ✓`,
        answer: '4x + 12',
        explanation: 'Expanding brackets: multiply EVERYTHING inside by what\'s outside! 4 × x = 4x AND 4 × 3 = 12. Common mistake: writing 4x + 3 (forgot to multiply the 3!). Always multiply BOTH terms inside the bracket.'
      },
      {
        question: 'Simplify: 3x + 2y + 5x - y',
        workingOut: `Step 1: Identify and group like terms
x terms: 3x and 5x
y terms: 2y and -y

Step 2: Collect x terms
3x + 5x = 8x

Step 3: Collect y terms
2y - y = 2y - 1y = 1y = y

Step 4: Write the simplified answer
8x + y

Check: Can we simplify further?
8x and y are UNLIKE terms (different letters)
Cannot combine ✓`,
        answer: '8x + y',
        explanation: 'Different letters = different things! You can\'t combine 3x with 2y any more than you can add 3 apples to 2 oranges and get "5 apporanges"! Collect the x terms together (3x + 5x = 8x) and the y terms together (2y - y = y), then write both in your answer.'
      },
      {
        question: 'If x = 5, find the value of 3x + 7',
        workingOut: `Step 1: Write out the expression
3x + 7

Step 2: Substitute x = 5 (use brackets for clarity)
= 3(5) + 7

Step 3: Calculate (BIDMAS - multiplication first)
= 15 + 7

Step 4: Final answer
= 22

Check: Does it make sense?
3 × 5 = 15, plus 7 = 22 ✓`,
        answer: '22',
        explanation: 'Substitution: replace the letter with the number, then calculate. Always follow BIDMAS! Here: 3 × 5 = 15 first (multiplication), then 15 + 7 = 22 (addition). Common error: doing 3 + 5 + 7 = 15. Remember, 3x means 3 × x!'
      },
      {
        question: 'Expand and simplify: 3(x + 2) + 2(x + 1)',
        workingOut: `Step 1: Expand first bracket
3(x + 2) = 3x + 6

Step 2: Expand second bracket
2(x + 1) = 2x + 2

Step 3: Write out all terms
3x + 6 + 2x + 2

Step 4: Collect like terms
x terms: 3x + 2x = 5x
Constants: 6 + 2 = 8

Step 5: Final answer
5x + 8

Check: If x = 0:
Original: 3(0+2) + 2(0+1) = 3(2) + 2(1) = 6 + 2 = 8
Our answer: 5(0) + 8 = 8 ✓`,
        answer: '5x + 8',
        explanation: 'Two-step process: (1) Expand BOTH brackets, (2) Collect like terms. First: 3(x+2)=3x+6 and 2(x+1)=2x+2. Then collect: 3x+2x=5x and 6+2=8, giving 5x+8. This "expand and simplify" type question is very common - worth 3-4 marks!'
      },
      {
        question: 'Simplify: 5a² + 3a - 2a² + 7a - 1',
        workingOut: `This has THREE different types of terms - be careful!

Step 1: Identify the DIFFERENT types of terms
- a² terms (a squared): 5a², -2a²
- a terms (just a): 3a, 7a  
- Constant terms (numbers): -1

Step 2: Collect a² terms
5a² - 2a² = 3a²
(Think: 5 subtract 2 = 3, keep the a²)

Step 3: Collect a terms  
3a + 7a = 10a
(Think: 3 + 7 = 10, keep the a)

Step 4: Write constant terms
-1 (nothing to combine with)

Step 5: Write final answer in standard form
3a² + 10a - 1
(Highest power first, then descending order)

CHECK: Count terms
Original: 5 terms total
Answer: 3 terms total ✓
We've correctly combined like terms!

IMPORTANT: a² and a are COMPLETELY DIFFERENT
Think of it like: a²= apples squared, a = apples
You can't combine them!`,
        answer: '3a² + 10a - 1',
        explanation: 'When you have different powers (a² vs a), they are DIFFERENT types of terms and cannot be combined! Only collect a² with a², and a with a. Here: collect 5a² and -2a² to get 3a²; collect 3a and 7a to get 10a; constant -1 stays as is. Final answer in descending powers: 3a² + 10a - 1. This type of question tests whether you truly understand "like terms". Common mistake: thinking 3a² + 10a = 13a² (WRONG! Different powers cannot combine).'
      },
      {
        question: 'Expand: 4(2x - 3)',
        workingOut: `Expanding brackets with SUBTRACTION - watch the signs!

Step 1: Understand what expanding means
4(2x - 3) means multiply everything inside the bracket by 4

Step 2: Multiply FIRST term by 4
4 × 2x = 8x

Step 3: Multiply SECOND term by 4
4 × (-3) = -12
IMPORTANT: Keep the minus sign!

Step 4: Write expanded form
8x - 12

Visual method (rectangle):
     2x    -3
   ┌────┬────┐
 4 │8x  │-12 │
   └────┴────┘

CHECK: Substitute a value to verify
Let x = 0:
Original: 4(2×0 - 3) = 4(0 - 3) = 4(-3) = -12
Our answer: 8(0) - 12 = 0 - 12 = -12 ✓ Correct!

Common mistakes:
❌ 4 × (-3) = +12 (wrong sign!)
❌ 8x + 12 (changed minus to plus)
✓ 8x - 12 (correct!)`,
        answer: '8x - 12',
        explanation: 'When expanding brackets, multiply EVERYTHING inside by the number outside. Pay special attention to negative signs! 4(2x - 3) means: (4 × 2x) and (4 × -3) = 8x - 12. The minus sign stays! Think of it as 4 × (+2x) + 4 × (-3) = 8x + (-12) = 8x - 12. This is a Foundation tier essential skill worth 2-3 marks.'
      },
      {
        question: 'Real-world problem: I think of a number, multiply it by 3, then add 5. The answer is 20. Write an expression and find the number.',
        workingOut: `This combines algebra with problem-solving!

PART 1: Writing the expression

Step 1: Choose a letter for unknown number
Let the number be n

Step 2: "multiply it by 3"
3n

Step 3: "then add 5"
3n + 5

Step 4: "The answer is 20"
3n + 5 = 20

This is our expression/equation!

PART 2: Solving the equation

Step 1: Write equation
3n + 5 = 20

Step 2: Subtract 5 from both sides
3n + 5 - 5 = 20 - 5
3n = 15

Step 3: Divide both sides by 3
3n ÷ 3 = 15 ÷ 3
n = 5

The number is 5

CHECK: Does it work?
"multiply by 3": 5 × 3 = 15
"then add 5": 15 + 5 = 20 ✓
Answer is 20 ✓ Correct!

Step-by-step translation:
Think of a number → n
Multiply by 3 → 3n  
Add 5 → 3n + 5
Answer is 20 → 3n + 5 = 20`,
        answer: 'n = 5',
        explanation: 'Word problems need you to translate English into algebra! "Think of a number" = n (or x, any letter). "Multiply by 3" = 3n. "Add 5" = 3n + 5. "Answer is 20" = 3n + 5 = 20. Then solve: subtract 5 gives 3n = 15, divide by 3 gives n = 5. ALWAYS check your answer works in the original problem! These "I think of a number" questions are VERY common in Foundation tier - practice them!'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Simplify: 7a + 3a',
        options: ['10a', '10a²', '21a', '10'],
        answer: '10a',
        explanation: 'Like terms (both have a). Add numbers in front: 7 + 3 = 10, keep the a: 10a. Think: 7 apples + 3 apples = 10 apples!',
        difficulty: 'easy'
      },
      {
        question: 'Expand: 5(2x + 1)',
        options: ['10x + 1', '10x + 5', '7x + 6', '10x + 6'],
        answer: '10x + 5',
        explanation: 'Multiply both terms: 5×2x=10x and 5×1=5. Answer: 10x + 5. Don\'t forget to multiply the second term!',
        difficulty: 'easy'
      },
      {
        question: 'Simplify: 4p + 3q - 2p + q',
        options: ['2p + 4q', '2p + 2q', '6p + 2q', '2pq'],
        answer: '2p + 4q',
        explanation: 'p terms: 4p-2p=2p. q terms: 3q+q=4q. Final answer: 2p + 4q. You CANNOT combine p and q (different letters)!',
        difficulty: 'medium'
      },
      {
        question: 'If y = 3, work out 5y - 4',
        options: ['11', '14', '1', '19'],
        answer: '11',
        explanation: 'Substitute y=3: 5(3)-4 = 15-4 = 11. Multiplication first (BIDMAS), then subtraction.',
        difficulty: 'easy'
      },
      {
        question: 'Expand and simplify: 3(x + 2) + 2(x + 1)',
        options: ['5x + 8', '5x + 5', '5x + 10', '6x + 6'],
        answer: '5x + 8',
        explanation: 'Expand: 3(x+2)=3x+6, 2(x+1)=2x+2. Collect: 3x+6+2x+2 = 5x+8. Remember to expand BOTH brackets!',
        difficulty: 'medium'
      },
      {
        question: 'Simplify: 8x - 5x',
        options: ['3x', '13x', '3', '40x'],
        answer: '3x',
        explanation: 'Like terms (both x). Subtract: 8-5=3, keep x: 3x. Like 8 apples - 5 apples = 3 apples.',
        difficulty: 'easy'
      },
      {
        question: 'Expand: -3(x + 4)',
        options: ['-3x + 4', '-3x - 12', '-3x + 12', '3x - 12'],
        answer: '-3x - 12',
        explanation: '-3×x=-3x and -3×4=-12. Negative×positive=negative! Answer: -3x - 12',
        difficulty: 'medium'
      },
      {
        question: 'If x = -2, find x² + 3x',
        options: ['2', '-2', '10', '-10'],
        answer: '-2',
        explanation: 'Substitute: (-2)²+3(-2) = 4+(-6) = 4-6 = -2. Use brackets for negatives! Remember: negative squared is positive.',
        difficulty: 'hard'
      },
      {
        question: 'Simplify: 5ab + 3ab',
        options: ['8ab', '8a²b²', '15ab', '8a + 8b'],
        answer: '8ab',
        explanation: 'Like terms (both have ab). Add: 5+3=8, keep ab: 8ab. You cannot simplify ab further!',
        difficulty: 'medium'
      },
      {
        question: 'Expand: 4(2x - 3)',
        options: ['8x - 12', '8x + 12', '8x - 3', '6x - 7'],
        answer: '8x - 12',
        explanation: '4×2x=8x and 4×(-3)=-12. Answer: 8x - 12. Positive×negative=negative!',
        difficulty: 'medium'
      }
    ],
    
    tips: [
      '⭐ Underline like terms in different colors to spot them easily',
      '⭐ Remember: x means 1x, so x + 3x = 1x + 3x = 4x',
      '⭐ When expanding brackets, multiply ALL terms inside (not just the first!)',
      '⭐ Different letters cannot be combined (3x + 2y stays as 3x + 2y)',
      '⭐ For substitution, use brackets around negative numbers: (-3)² not -3²',
      '⭐ Always check: can your answer be simplified further?',
      '⭐ Write out each step clearly - method marks available even if answer wrong',
      '⭐ Practice until collecting like terms becomes automatic - it\'s in every algebra question!'
    ],
    
    commonMistakes: [
      '❌ Combining unlike terms: 3x + 2y = 5xy (WRONG! Should stay as 3x + 2y)',
      '❌ Only expanding first term: 3(x+2) = 3x+2 (WRONG! Should be 3x+6)',
      '❌ Forgetting negative signs: 5x - 2x = 7x (WRONG! Should be 3x)',
      '❌ Not using brackets for substitution: -3² = 9 (WRONG! Should be (-3)² = 9)',
      '❌ Adding powers instead of terms: x + x = x² (WRONG! Should be 2x)',
      '❌ Thinking 3x means 3 + x (NO! It means 3 × x)',
      '❌ Forgetting that -x means -1x',
      '❌ Multiplying when should be adding: 3x + 2x = 6x² (WRONG! Should be 5x)'
    ],
    
    examStrategy: `
**Question Types & Marks:**

1. **Simplify expression** (2 marks)
   - Collect like terms only
   - Show grouping of like terms
   
2. **Expand single bracket** (2 marks)
   - Multiply both terms
   - Show working clearly

3. **Expand and simplify** (3-4 marks)
   - Expand all brackets first
   - Then collect like terms
   - Each step earns marks!

4. **Substitution** (2 marks)
   - Show substitution
   - Show calculation (BIDMAS)

**Non-Calculator Strategy:**
Show EVERY step clearly. For simplifying, group like terms visibly. For expanding, write out each multiplication: "3 × x = 3x, 3 × 2 = 6". This earns method marks even if you make an arithmetic error!

**Common Mark Allocations:**
- Simple collecting: 1 mark (answer only if easy)
- Expanding: 2 marks (1 for method, 1 for answer)
- Expand + simplify: 3-4 marks (1 expand, 1 collect, 1-2 accuracy)
- Substitution: 2 marks (1 for substitution, 1 for calculation)

**Time Saving Tips:**
- Know your like terms instantly
- Practice expanding until automatic
- For complex expressions, tackle one letter at a time

**Error Prevention:**
- Circle/underline like terms before starting
- For brackets, draw arrows showing what multiplies what
- Check: are there different letters? If yes, they stay separate!
- For negatives, use brackets ALWAYS

**Grade 5 Targets:**
Must be confident with:
✓ Collecting any like terms (including negative terms)
✓ Expanding single brackets (including negative multipliers)
✓ Expanding and simplifying (two brackets)
✓ Substituting positive and negative values
✓ Working with expressions with 2-3 different letters

**Practice Focus:**
This is FOUNDATION algebra - master these basics because they appear in 30% of questions! More complex algebra (solving equations, factorizing) builds on these skills. Get this module 100% right and you're set for all Foundation algebra!
`
  },

  // ==================== MODULE 5: SOLVING LINEAR EQUATIONS ====================
  {
    moduleNumber: 5,
    title: 'Solving Linear Equations',
    duration: '70 minutes',
    introduction: 'Learn to find the unknown value in equations - a crucial GCSE skill! Solving equations appears in every Foundation paper and is essential for Grade 4-5. Master the balance method and inverse operations to confidently solve any linear equation.',
    
    keyPoints: [
      'An equation has an equals sign (=) - both sides must balance',
      'Golden rule: Do the SAME thing to BOTH sides to keep the equation balanced',
      'Use inverse (opposite) operations to undo what\'s been done to x',
      'Undo operations in REVERSE order (opposite of BIDMAS)',
      'Get all x terms on one side, all numbers on the other',
      'Always check your answer by substituting it back into the original equation'
    ],
    
    explanation: `
**What is an Equation?**

An equation is like a balanced scale - both sides are equal:

LEFT SIDE = RIGHT SIDE

**Example:** 2x + 3 = 11
The left side (2x + 3) equals the right side (11)

**The Golden Rule**

Whatever you do to one side, you MUST do to the other side!
This keeps the equation balanced.

Think of it like a seesaw:
- If you add weight to one side, add the same to the other
- If you remove weight from one side, remove the same from the other

**Inverse (Opposite) Operations**

To solve equations, we undo operations using opposites:

| Operation | Inverse |
|-----------|---------|
| + (add) | - (subtract) |
| - (subtract) | + (add) |
| × (multiply) | ÷ (divide) |
| ÷ (divide) | × (multiply) |

**Solving Simple Equations**

**Type 1: x + a = b**

**Example:** x + 5 = 12

Step 1: Undo the +5 by subtracting 5 from both sides
x + 5 - 5 = 12 - 5
x = 7

Check: 7 + 5 = 12 ✓

**Type 2: x - a = b**

**Example:** x - 3 = 10

Step 1: Undo the -3 by adding 3 to both sides
x - 3 + 3 = 10 + 3
x = 13

Check: 13 - 3 = 10 ✓

**Type 3: ax = b**

**Example:** 3x = 15

Step 1: Undo the ×3 by dividing both sides by 3
3x ÷ 3 = 15 ÷ 3
x = 5

Check: 3 × 5 = 15 ✓

**Type 4: x/a = b**

**Example:** x/4 = 7

Step 1: Undo the ÷4 by multiplying both sides by 4
x/4 × 4 = 7 × 4
x = 28

Check: 28 ÷ 4 = 7 ✓

**Two-Step Equations**

When there are TWO operations, undo them in REVERSE order:

**Example:** 2x + 5 = 13

Think: What's been done to x?
- First: x was multiplied by 2
- Second: then 5 was added

Undo in REVERSE order:
Step 1: Undo the +5 (subtract 5 from both sides)
2x + 5 - 5 = 13 - 5
2x = 8

Step 2: Undo the ×2 (divide both sides by 2)
2x ÷ 2 = 8 ÷ 2
x = 4

Check: 2(4) + 5 = 8 + 5 = 13 ✓

**Equations with x on Both Sides**

Get all x terms on one side, numbers on the other:

**Example:** 5x + 3 = 2x + 15

Step 1: Get x terms on one side (subtract 2x from both)
5x - 2x + 3 = 2x - 2x + 15
3x + 3 = 15

Step 2: Now solve as normal (subtract 3)
3x = 12

Step 3: Divide by 3
x = 4

Check: 5(4) + 3 = 20 + 3 = 23
       2(4) + 15 = 8 + 15 = 23 ✓

**Equations with Brackets**

Expand brackets first, then solve:

**Example:** 3(x + 2) = 18

Step 1: Expand brackets
3x + 6 = 18

Step 2: Subtract 6 from both sides
3x = 12

Step 3: Divide by 3
x = 4

Check: 3(4 + 2) = 3(6) = 18 ✓

**Equations with Negatives**

Be extra careful with signs!

**Example:** 5 - 2x = 11

Step 1: Get the x term positive (subtract 5 from both)
-2x = 6

Step 2: Divide by -2
x = -3

Check: 5 - 2(-3) = 5 - (-6) = 5 + 6 = 11 ✓

**Key Tip:** Negative ÷ negative = positive!
`,
    
    examples: [
      {
        question: 'Solve: x + 7 = 15',
        workingOut: `Step 1: Identify what's been done to x
x has 7 added to it

Step 2: Use inverse operation (opposite of +7 is -7)
Subtract 7 from BOTH sides
x + 7 - 7 = 15 - 7

Step 3: Simplify
x = 8

Step 4: CHECK by substituting back
8 + 7 = 15 ✓ Correct!

Note: The +7 and -7 cancel out on left side`,
        answer: 'x = 8',
        explanation: 'Simple one-step equation! To undo +7, subtract 7 from BOTH sides. This keeps the equation balanced. x + 7 - 7 = 15 - 7 gives x = 8. ALWAYS check your answer works in the original equation: 8 + 7 = 15 ✓'
      },
      {
        question: 'Solve: 3x = 21',
        workingOut: `Step 1: Identify what's been done to x
x has been multiplied by 3

Step 2: Use inverse operation (opposite of ×3 is ÷3)
Divide BOTH sides by 3
3x ÷ 3 = 21 ÷ 3

Step 3: Simplify
x = 7

Step 4: CHECK by substituting back
3 × 7 = 21 ✓ Correct!

Alternative way to write it:
3x/3 = 21/3
x = 7`,
        answer: 'x = 7',
        explanation: 'To undo multiplication by 3, divide both sides by 3. Think: 3x means "3 times x equals 21", so x equals "21 divided by 3" = 7. The 3s cancel on the left: 3x÷3 = x. Check: 3×7 = 21 ✓'
      },
      {
        question: 'Solve: 2x + 5 = 17',
        workingOut: `Step 1: Identify operations done to x
First: x was multiplied by 2 (giving 2x)
Then: 5 was added (giving 2x + 5)

Step 2: Undo in REVERSE order
First undo the +5 (subtract 5 from both sides)
2x + 5 - 5 = 17 - 5
2x = 12

Step 3: Now undo the ×2 (divide both sides by 2)
2x ÷ 2 = 12 ÷ 2
x = 6

Step 4: CHECK
2(6) + 5 = 12 + 5 = 17 ✓ Correct!`,
        answer: 'x = 6',
        explanation: 'Two-step equation! First undo the +5 (subtract 5), then undo the ×2 (divide by 2). ALWAYS work in reverse order - last operation done gets undone first! Show each step clearly for full marks. Check: 2×6 + 5 = 12 + 5 = 17 ✓'
      },
      {
        question: 'Solve: 5x + 2 = 3x + 10',
        workingOut: `Step 1: Get all x terms on one side
Subtract 3x from BOTH sides
5x - 3x + 2 = 3x - 3x + 10
2x + 2 = 10

Step 2: Get numbers on the other side
Subtract 2 from BOTH sides
2x + 2 - 2 = 10 - 2
2x = 8

Step 3: Solve for x
Divide BOTH sides by 2
2x ÷ 2 = 8 ÷ 2
x = 4

Step 4: CHECK in ORIGINAL equation
Left: 5(4) + 2 = 20 + 2 = 22
Right: 3(4) + 10 = 12 + 10 = 22 ✓ Correct!`,
        answer: 'x = 4',
        explanation: 'x on both sides! First, get all x terms on one side by subtracting 3x from both sides (5x - 3x = 2x). Then solve as normal: subtract 2, then divide by 2. This gets x = 4. ALWAYS check with the ORIGINAL equation, not the rearranged one!'
      },
      {
        question: 'Solve: 4(x - 3) = 20',
        workingOut: `Step 1: Expand the brackets first
4 × x = 4x
4 × (-3) = -12
So: 4x - 12 = 20

Step 2: Add 12 to both sides (undo the -12)
4x - 12 + 12 = 20 + 12
4x = 32

Step 3: Divide both sides by 4 (undo the ×4)
4x ÷ 4 = 32 ÷ 4
x = 8

Step 4: CHECK with ORIGINAL equation
4(8 - 3) = 4(5) = 20 ✓ Correct!

Alternative method (harder):
Divide both sides by 4 first
(x - 3) = 5
Then: x = 8`,
        answer: 'x = 8',
        explanation: 'Brackets in equation! Easiest method: expand brackets first (4×x and 4×-3), then solve normally. This gives 4x - 12 = 20. Add 12 to get 4x = 32, then divide by 4 to get x = 8. Check with the bracketed version: 4(8-3) = 4×5 = 20 ✓'
      },
      {
        question: 'Solve: 5x - 2 = 3x + 8 (x appears on both sides!)',
        workingOut: `When x appears on BOTH sides, we need to get all x terms on ONE side.

Step 1: Write the equation
5x - 2 = 3x + 8

Step 2: Get all x terms on one side (choose the side with more x)
Subtract 3x from both sides
5x - 3x - 2 = 3x - 3x + 8
2x - 2 = 8

Step 3: Now solve normally - add 2 to both sides
2x - 2 + 2 = 8 + 2
2x = 10

Step 4: Divide both sides by 2
2x ÷ 2 = 10 ÷ 2
x = 5

Step 5: CHECK with ORIGINAL equation
Left side: 5(5) - 2 = 25 - 2 = 23
Right side: 3(5) + 8 = 15 + 8 = 23
23 = 23 ✓ Correct!

Alternative visualization:
5x - 2 = 3x + 8
Move 3x to left: 5x - 3x = 2x
Move -2 to right: 8 + 2 = 10
Result: 2x = 10
Therefore: x = 5`,
        answer: 'x = 5',
        explanation: 'x on BOTH sides! Key strategy: (1) Get all x terms on ONE side (subtract 3x from both sides), (2) Get all numbers on the OTHER side (add 2 to both sides), (3) Then solve as normal (divide by 2). This gives 5x-3x = 2x on left, and 8+2 = 10 on right, so 2x = 10, therefore x = 5. ALWAYS check both sides equal when you substitute your answer! This type is worth 3-4 marks and is Grade 4-5 level.'
      },
      {
        question: 'Solve: (x+3)/2 = 5 (Fraction equations!)',
        workingOut: `Fractions in equations - clear the denominator first!

Step 1: Write the equation
(x + 3)/2 = 5

Step 2: Multiply BOTH sides by 2 (clears the fraction)
(x + 3)/2 × 2 = 5 × 2
x + 3 = 10

Step 3: Now solve the simple equation
Subtract 3 from both sides
x + 3 - 3 = 10 - 3
x = 7

Step 4: CHECK with ORIGINAL equation
(7 + 3)/2 = 10/2 = 5 ✓ Correct!

Why multiply by 2 first?
• (x+3)/2 means (x+3) ÷ 2
• To undo ÷2, we ×2
• Doing this to both sides keeps it balanced
• Result: the fraction disappears!

Visual check:
If x = 7:
x + 3 = 7 + 3 = 10
10 ÷ 2 = 5 ✓`,
        answer: 'x = 7',
        explanation: 'Fraction equations: multiply BOTH sides by the denominator to clear the fraction! Here, multiply both sides by 2: the left side becomes just (x+3), the right becomes 10. Then solve: x+3=10, so x=7. Check: (7+3)/2 = 10/2 = 5 ✓. This method works for ANY fraction equation - multiply by denominator first, then solve normally. Worth 3 marks!'
      },
      {
        question: 'Real-world problem: The perimeter of a rectangle is 30cm. The length is 2cm more than the width. Find the width.',
        workingOut: `This combines equations with geometry - very common in GCSE!

Step 1: Define variables
Let width = w cm
Length is "2cm more than width" = (w + 2) cm

Step 2: Write formula for perimeter
Perimeter of rectangle = 2 × length + 2 × width
P = 2l + 2w

Step 3: Substitute what we know
Perimeter = 30 cm
Length = (w + 2) cm
Width = w cm

30 = 2(w + 2) + 2w

Step 4: Expand brackets
30 = 2w + 4 + 2w

Step 5: Collect like terms
30 = 4w + 4

Step 6: Subtract 4 from both sides
30 - 4 = 4w + 4 - 4
26 = 4w

Step 7: Divide both sides by 4
26 ÷ 4 = 4w ÷ 4
6.5 = w

Width = 6.5 cm

Step 8: CHECK the answer
Width = 6.5 cm
Length = 6.5 + 2 = 8.5 cm
Perimeter = 2(8.5) + 2(6.5) = 17 + 13 = 30 cm ✓

Make sense? 
Yes! Length (8.5cm) is 2cm more than width (6.5cm) ✓`,
        answer: 'Width = 6.5 cm',
        explanation: 'Word problems need you to SET UP the equation first! Let width = w, then length = w+2 (2cm more). Perimeter formula: 2l + 2w = 30. Substitute: 2(w+2) + 2w = 30. Expand: 2w+4+2w = 30. Simplify: 4w+4 = 30. Solve: 4w = 26, so w = 6.5cm. MUST check: if width is 6.5, length is 8.5, perimeter is 2(8.5)+2(6.5) = 30 ✓. These "form and solve" questions are worth 4-5 marks - show ALL working!'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Solve: x + 9 = 15',
        options: ['x = 6', 'x = 24', 'x = 7', 'x = 5'],
        answer: 'x = 6',
        explanation: 'Subtract 9 from both sides: x = 15 - 9 = 6. Check: 6 + 9 = 15 ✓',
        difficulty: 'easy'
      },
      {
        question: 'Solve: 4x = 28',
        options: ['x = 7', 'x = 32', 'x = 24', 'x = 112'],
        answer: 'x = 7',
        explanation: 'Divide both sides by 4: x = 28 ÷ 4 = 7. Check: 4 × 7 = 28 ✓',
        difficulty: 'easy'
      },
      {
        question: 'Solve: 2x + 3 = 11',
        options: ['x = 4', 'x = 7', 'x = 5', 'x = 8'],
        answer: 'x = 4',
        explanation: 'Subtract 3: 2x = 8. Divide by 2: x = 4. Check: 2(4) + 3 = 8 + 3 = 11 ✓',
        difficulty: 'medium'
      },
      {
        question: 'Solve: x/5 = 3',
        options: ['x = 15', 'x = 8', 'x = 5/3', 'x = 2'],
        answer: 'x = 15',
        explanation: 'Multiply both sides by 5: x = 3 × 5 = 15. Check: 15 ÷ 5 = 3 ✓',
        difficulty: 'easy'
      },
      {
        question: 'Solve: 3x - 7 = 14',
        options: ['x = 7', 'x = 21', 'x = 5', 'x = 3'],
        answer: 'x = 7',
        explanation: 'Add 7: 3x = 21. Divide by 3: x = 7. Check: 3(7) - 7 = 21 - 7 = 14 ✓',
        difficulty: 'medium'
      },
      {
        question: 'Solve: 5x + 4 = 2x + 13',
        options: ['x = 3', 'x = 9', 'x = 4', 'x = 17'],
        answer: 'x = 3',
        explanation: 'Subtract 2x: 3x + 4 = 13. Subtract 4: 3x = 9. Divide by 3: x = 3. Check: 5(3)+4=19, 2(3)+13=19 ✓',
        difficulty: 'hard'
      },
      {
        question: 'Solve: x - 6 = 11',
        options: ['x = 17', 'x = 5', 'x = -5', 'x = 66'],
        answer: 'x = 17',
        explanation: 'Add 6 to both sides: x = 11 + 6 = 17. Check: 17 - 6 = 11 ✓',
        difficulty: 'easy'
      },
      {
        question: 'Solve: 2(x + 3) = 16',
        options: ['x = 5', 'x = 8', 'x = 11', 'x = 7'],
        answer: 'x = 5',
        explanation: 'Expand: 2x + 6 = 16. Subtract 6: 2x = 10. Divide by 2: x = 5. Check: 2(5+3) = 2(8) = 16 ✓',
        difficulty: 'hard'
      },
      {
        question: 'Solve: 10 = 2x + 4',
        options: ['x = 3', 'x = 7', 'x = 6', 'x = 14'],
        answer: 'x = 3',
        explanation: 'Same method even when x is on right! Subtract 4: 6 = 2x. Divide by 2: 3 = x, so x = 3. Check: 2(3)+4=10 ✓',
        difficulty: 'medium'
      },
      {
        question: 'Solve: 6x - 5 = 3x + 10',
        options: ['x = 5', 'x = 3', 'x = 15', 'x = 2'],
        answer: 'x = 5',
        explanation: 'Subtract 3x: 3x - 5 = 10. Add 5: 3x = 15. Divide by 3: x = 5. Check: 6(5)-5=25, 3(5)+10=25 ✓',
        difficulty: 'hard'
      }
    ],
    
    tips: [
      '⭐ Always show EACH step on a new line - each step can earn method marks!',
      '⭐ Do the SAME operation to BOTH sides every time',
      '⭐ Work in REVERSE order (undo last operation first)',
      '⭐ Check your answer by substituting back into the ORIGINAL equation',
      '⭐ For x on both sides: collect x terms on one side, numbers on the other',
      '⭐ Use inverse operations: +/- are opposites, ×/÷ are opposites',
      '⭐ Be careful with negative signs - use brackets when dividing!',
      '⭐ If stuck, imagine the equation as a balanced seesaw'
    ],
    
    commonMistakes: [
      '❌ Only doing operation to one side (x + 5 = 12, so x = 12 is wrong!)',
      '❌ Not working in reverse order (trying to divide before subtracting)',
      '❌ Getting signs wrong with negatives (5 - 2x, forgetting the negative)',
      '❌ Not checking the answer (missing calculation errors)',
      '❌ Expanding brackets incorrectly before solving',
      '❌ For x on both sides: forgetting to collect all x terms on one side first',
      '❌ Dividing by negative and getting sign wrong (-2x = 6, so x = -3 not x = 3)',
      '❌ Not showing working clearly (can\'t get method marks!)'
    ],
    
    examStrategy: `
**Question Recognition:**
- One-step equation (x + a = b): 2 marks
- Two-step equation (ax + b = c): 3 marks
- x on both sides: 3-4 marks
- Equation with brackets: 3-4 marks

**Solution Method (THE SAME FOR ALL!):**

1. **Expand any brackets** (if present)
2. **Get x terms on one side** (if on both sides)
3. **Undo addition/subtraction** (+ or -)
4. **Undo multiplication/division** (× or ÷)
5. **CHECK your answer**

**Writing Your Solution:**

Show EVERY step on a new line:

Example format:
3x + 5 = 17
3x = 17 - 5    (subtract 5 from both sides)
3x = 12
x = 12 ÷ 3     (divide both sides by 3)
x = 4

**Method Marks Available:**
Even if your final answer is wrong, you get marks for:
- Correctly identifying inverse operation
- Doing same to both sides
- Showing working clearly
- Each correct step

**Time Management:**
- Simple equation (2 marks) = 2 minutes
- Complex equation (4 marks) = 4 minutes
- If stuck after 5 minutes, move on and come back

**Common Exam Wording:**
- "Solve" = find the value of x
- "Find x" = solve the equation
- "Work out x" = solve the equation

**Checking Strategy:**
Always check! Takes 10 seconds but:
- Confirms your answer is right
- Finds calculation errors
- Shows examiner you checked (good practice)

Substitute your answer into the ORIGINAL equation:
If x = 4: Check 2(4) + 5 = ? → 8 + 5 = 13 ✓

**Grade 5 Requirements:**
Must confidently solve:
✓ Two-step equations (ax + b = c)
✓ Equations with x on both sides
✓ Equations with brackets (expand first)
✓ Equations with negative coefficients
✓ Equations where x is on the right side

**Top Tip:**
Practice until the method is automatic:
1. Simplify (expand/collect)
2. Get x alone on one side
3. Numbers on the other side
4. Check!

This topic is worth 10-15 marks per paper. Master it for Grade 4-5!
`
  },

  // ==================== MODULE 6: SEQUENCES ====================
  {
    moduleNumber: 6,
    title: 'Sequences (Arithmetic & Patterns)',
    duration: '60 minutes',
    introduction: 'Learn to spot patterns and continue sequences - a topic that appears in every Foundation paper! Master arithmetic sequences, find the nth term, and work with geometric sequences. Understanding patterns is key to mathematical thinking.',
    
    keyPoints: [
      'A sequence is a list of numbers following a pattern (called terms)',
      'Arithmetic sequence: Same number added (or subtracted) each time - called the common difference',
      'To find the pattern: Calculate the difference between consecutive terms',
      'Continue a sequence: Add (or subtract) the common difference to the last term',
      'nth term: A formula to find ANY term in the sequence without listing them all',
      'Check your pattern works for ALL given terms before using it!'
    ],
    
    explanation: `
**What is a Sequence?**

A sequence is a list of numbers in order, following a pattern.
Each number in the sequence is called a **term**.

**Example:** 2, 4, 6, 8, 10, ...
- 1st term = 2
- 2nd term = 4
- 3rd term = 6
- Pattern: +2 each time

**Arithmetic Sequences**

An arithmetic sequence has a **common difference** - the same number added each time.

**Example:** 3, 7, 11, 15, 19, ...

Find the difference:
7 - 3 = 4
11 - 7 = 4
15 - 11 = 4

Common difference = +4

**Finding the Next Terms**

Once you know the common difference, keep adding it:

**Example:** Continue: 5, 8, 11, 14, ...

Step 1: Find difference
8 - 5 = 3
11 - 8 = 3
Common difference = +3

Step 2: Add to last term
14 + 3 = 17
17 + 3 = 20

Next two terms: 17, 20

**Decreasing Sequences**

The common difference can be negative:

**Example:** 20, 17, 14, 11, ...

Difference: 17 - 20 = -3
Common difference = -3

Next terms:
11 + (-3) = 11 - 3 = 8
8 - 3 = 5

**Geometric Sequences (Grade 5)**

In a geometric sequence, you MULTIPLY by the same number each time (not add).

**Example:** 2, 6, 18, 54, ...

Find the multiplier:
6 ÷ 2 = 3
18 ÷ 6 = 3
54 ÷ 18 = 3

Multiply by 3 each time

Next terms:
54 × 3 = 162
162 × 3 = 486

**Special Sequences You Should Know**

**Square Numbers:** 1, 4, 9, 16, 25, 36, 49, ...
Pattern: 1², 2², 3², 4², 5², ...

**Cube Numbers:** 1, 8, 27, 64, 125, ...
Pattern: 1³, 2³, 3³, 4³, 5³, ...

**Triangle Numbers:** 1, 3, 6, 10, 15, 21, ...
Pattern: Add 2, then add 3, then add 4, etc.

**Fibonacci:** 1, 1, 2, 3, 5, 8, 13, ...
Pattern: Add previous two terms

**Finding the nth Term (Foundation Level)**

The nth term is a formula to find ANY term without listing them all.

For simple arithmetic sequences:
**nth term = first term + (n-1) × common difference**

Or more commonly: **nth term = dn + c**
where d = common difference, c = constant

**Example:** 5, 8, 11, 14, ...

Common difference = 3
So it's the 3 times table, plus something

3×1 = 3 (we want 5, so add 2)
3×2 = 6 (we want 8, so add 2)
3×3 = 9 (we want 11, so add 2)

nth term = 3n + 2

**Check:**
- n=1: 3(1)+2 = 5 ✓
- n=2: 3(2)+2 = 8 ✓
- n=3: 3(3)+2 = 11 ✓
- n=4: 3(4)+2 = 14 ✓

**Using nth Term to Find Terms**

**Example:** If nth term = 4n + 1, find the 10th term

Substitute n = 10:
4(10) + 1 = 40 + 1 = 41

The 10th term is 41

**Recognizing Sequence Types**

| Type | Pattern | Example |
|------|---------|---------|
| Arithmetic | +/- same number | 2, 5, 8, 11 (add 3) |
| Geometric | × same number | 3, 9, 27, 81 (×3) |
| Square numbers | n² | 1, 4, 9, 16, 25 |
| Fibonacci | Add previous two | 1, 1, 2, 3, 5, 8 |
`,
    
    examples: [
      {
        question: 'Find the next two terms: 3, 7, 11, 15, ...',
        workingOut: `Step 1: Find the common difference
7 - 3 = 4
11 - 7 = 4
15 - 11 = 4

Common difference = +4

Step 2: Check the pattern works throughout
3 + 4 = 7 ✓
7 + 4 = 11 ✓
11 + 4 = 15 ✓

Step 3: Continue the pattern
15 + 4 = 19 (5th term)
19 + 4 = 23 (6th term)

Step 4: Write the answer clearly
Next two terms are 19 and 23`,
        answer: '19, 23',
        explanation: 'This is an arithmetic sequence with common difference +4. To find the pattern, subtract consecutive terms: 7-3=4, 11-7=4, 15-11=4. Once you know the pattern, keep adding 4: 15+4=19, 19+4=23. Always check your pattern works for ALL given terms!'
      },
      {
        question: 'What type of sequence is 2, 6, 18, 54, ...? Find the next term.',
        workingOut: `Step 1: Check if arithmetic (add same number)
6 - 2 = 4
18 - 6 = 12
Different differences, so NOT arithmetic

Step 2: Check if geometric (multiply by same number)
6 ÷ 2 = 3
18 ÷ 6 = 3
54 ÷ 18 = 3

Yes! Geometric sequence (×3 each time)

Step 3: Find next term
54 × 3 = 162

Answer: Geometric sequence, next term = 162`,
        answer: 'Geometric sequence; next term is 162',
        explanation: 'Not all sequences are arithmetic! If subtracting gives different differences, try dividing to check for geometric. Here, each term ÷ previous term = 3, so it\'s geometric with multiplier 3. For geometric sequences, multiply by the ratio: 54 × 3 = 162.'
      },
      {
        question: 'Find the nth term of the sequence: 5, 8, 11, 14, ...',
        workingOut: `Step 1: Find the common difference
8 - 5 = 3
11 - 8 = 3
14 - 11 = 3
Common difference = 3

Step 2: Identify it's the 3 times table (plus something)
This is 3, 6, 9, 12, ... with something added

Step 3: Compare with 3 times table
Term | Position | 3×n | Actual | Difference
  5  |    1     |  3  |   5    |    +2
  8  |    2     |  6  |   8    |    +2
 11  |    3     |  9  |   11   |    +2
 14  |    4     | 12  |   14   |    +2

Always add 2 to 3n

Step 4: Write the nth term
nth term = 3n + 2

Step 5: CHECK by substituting
n=1: 3(1)+2 = 5 ✓
n=2: 3(2)+2 = 8 ✓
n=3: 3(3)+2 = 11 ✓`,
        answer: 'nth term = 3n + 2',
        explanation: 'To find nth term: (1) Find common difference (3), (2) Compare with that times table, (3) Work out what to add/subtract. Here, the 3 times table (3, 6, 9, 12...) is always 2 less than our sequence, so add 2 to 3n. Formula: 3n + 2. ALWAYS check it works!'
      },
      {
        question: 'The nth term of a sequence is 5n - 1. Find the first 3 terms.',
        workingOut: `Step 1: Find 1st term (substitute n=1)
5(1) - 1 = 5 - 1 = 4

Step 2: Find 2nd term (substitute n=2)
5(2) - 1 = 10 - 1 = 9

Step 3: Find 3rd term (substitute n=3)
5(3) - 1 = 15 - 1 = 14

Step 4: Write the sequence
4, 9, 14, ...

Step 5: Check the pattern (optional but good practice)
9 - 4 = 5
14 - 9 = 5
Common difference = 5 ✓ (matches the 5n)`,
        answer: '4, 9, 14',
        explanation: 'When given the nth term formula, substitute n=1, n=2, n=3 to find the first three terms. For 5n-1: put n=1 gives 5(1)-1=4, n=2 gives 5(2)-1=9, n=3 gives 5(3)-1=14. The sequence is 4, 9, 14,... You can check: difference is 5, which matches the 5n ✓'
      },
      {
        question: 'Find the next two terms: 50, 43, 36, 29, ...',
        workingOut: `Step 1: Find the common difference
43 - 50 = -7
36 - 43 = -7
29 - 36 = -7

Common difference = -7 (negative = decreasing)

Step 2: Continue the pattern
29 + (-7) = 29 - 7 = 22
22 - 7 = 15

Step 3: Verify the pattern
50 - 7 = 43 ✓
43 - 7 = 36 ✓
36 - 7 = 29 ✓
29 - 7 = 22 ✓

Answer: Next two terms are 22 and 15`,
        answer: '22, 15',
        explanation: 'Decreasing sequence! The common difference is negative: -7. Each term is 7 less than the previous term. Continue: 29-7=22, 22-7=15. Don\'t be confused by negative differences - treat them the same way, just subtract instead of add.'
      },
      {
        question: 'Find the nth term of the sequence: 1, 6, 11, 16, 21, ...',
        workingOut: `Complete method for finding nth term - step by step!

Step 1: Find the common difference
6 - 1 = 5
11 - 6 = 5
16 - 11 = 5
21 - 16 = 5
Common difference = 5

Step 2: Start with the times table that matches the difference
Since difference is 5, we use the 5 times table: 5n
5 times table gives: 5, 10, 15, 20, 25, ...

Step 3: Compare actual sequence with 5n
| Position (n) | 5n | Actual Term | Difference |
|--------------|-----|-------------|------------|
|      1       |  5  |      1      |    -4      |
|      2       | 10  |      6      |    -4      |
|      3       | 15  |     11      |    -4      |
|      4       | 20  |     16      |    -4      |

Step 4: See what we need to add/subtract
5n gives values that are 4 MORE than we want
So we need to SUBTRACT 4

Step 5: Write nth term formula
nth term = 5n - 4

Step 6: CHECK (essential!)
n = 1: 5(1) - 4 = 5 - 4 = 1 ✓
n = 2: 5(2) - 4 = 10 - 4 = 6 ✓
n = 3: 5(3) - 4 = 15 - 4 = 11 ✓
n = 4: 5(4) - 4 = 20 - 4 = 16 ✓

Perfect!

Bonus: Find the 50th term
n = 50: 5(50) - 4 = 250 - 4 = 246`,
        answer: 'nth term = 5n - 4',
        explanation: 'Finding nth term method: (1) Common difference = 5, so use 5n, (2) Compare: 5n gives 5,10,15,20... but we want 1,6,11,16..., (3) 5n is always 4 too big, so subtract 4, (4) Formula: 5n - 4. Always check by substituting n=1,2,3! This is worth 3-4 marks and is essential for Grade 5. The common difference tells you which times table to use (5→5n, 3→3n, 7→7n etc).'
      },
      {
        question: 'The nth term is 4n + 3. Is 50 a term in this sequence?',
        workingOut: `This tests whether a number belongs to a sequence!

Method: Set 4n + 3 = 50 and see if n is a whole number

Step 1: Write the equation
4n + 3 = 50

Step 2: Solve for n
4n + 3 = 50
4n = 50 - 3
4n = 47
n = 47 ÷ 4
n = 11.75

Step 3: Interpret the result
n = 11.75 is NOT a whole number
Position numbers must be 1, 2, 3, 4, ... (whole numbers)
n = 11.75 doesn't make sense as a position

Step 4: Conclusion
50 is NOT a term in this sequence

Step 5: CHECK nearby terms
n = 11: 4(11) + 3 = 44 + 3 = 47
n = 12: 4(12) + 3 = 48 + 3 = 51
Sequence goes: ..., 47, 51, ...
50 falls between terms, so it's not in the sequence

Alternative check:
All terms follow pattern: 4n + 3
This means: 3, 7, 11, 15, 19, 23, 27, 31, ...
Every term = 4×(whole number) + 3
50 = 4×(11.75) + 3 ✗ (not a whole number)
47 = 4×(11) + 3 ✓ (whole number)
51 = 4×(12) + 3 ✓ (whole number)`,
        answer: 'No, 50 is not a term in the sequence',
        explanation: 'To check if a number is in a sequence: set nth term = that number and solve for n. If n is a whole number, yes it\'s in the sequence. If n is decimal/fraction, no it\'s not. Here: 4n+3=50 gives n=11.75 (decimal), so 50 is NOT a term. The sequence goes ..., 47, 51, ... skipping 50. This question type is worth 2-3 marks and tests true understanding!'
      },
      {
        question: 'Pattern with diagrams: A pattern uses squares. Pattern 1 uses 5 squares, Pattern 2 uses 9 squares, Pattern 3 uses 13 squares. How many squares in Pattern 10?',
        workingOut: `Visual sequence problem - very common in GCSE!

Step 1: Write the sequence
Pattern 1: 5 squares
Pattern 2: 9 squares
Pattern 3: 13 squares
Sequence: 5, 9, 13, ...

Step 2: Find the common difference
9 - 5 = 4
13 - 9 = 4
Common difference = +4

Step 3: METHOD 1 - Continue the pattern
Pattern 1: 5
Pattern 2: 9 (= 5 + 4)
Pattern 3: 13 (= 9 + 4)
Pattern 4: 17 (= 13 + 4)
Pattern 5: 21 (= 17 + 4)
Pattern 6: 25 (= 21 + 4)
Pattern 7: 29 (= 25 + 4)
Pattern 8: 33 (= 29 + 4)
Pattern 9: 37 (= 33 + 4)
Pattern 10: 41 (= 37 + 4)

METHOD 2 - Find nth term, then substitute
Common difference = 4, so use 4n

Compare with 4n:
| Pattern | 4n  | Actual | Difference |
|---------|-----|--------|------------|
|    1    |  4  |   5    |    +1      |
|    2    |  8  |   9    |    +1      |
|    3    | 12  |  13    |    +1      |

Always add 1, so nth term = 4n + 1

Pattern 10 (n = 10):
4(10) + 1 = 40 + 1 = 41

Both methods give: 41 squares

Step 4: CHECK
Does pattern make sense?
Starting with 5, adding 4 each time
After 9 patterns (1 to 10), we add 4 nine times
5 + (9 × 4) = 5 + 36 = 41 ✓`,
        answer: 'Pattern 10 uses 41 squares',
        explanation: 'Visual pattern questions work exactly like number sequences! The "patterns" are just positions (1st, 2nd, 3rd...), and the squares are the terms. Find the common difference (+4), then either continue the pattern or find nth term (4n+1) and substitute n=10. Both give 41 squares. In exams, draw the patterns if it helps you see the +4 pattern! These are worth 3-4 marks.'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Find the next term in the sequence: 5, 10, 15, 20, ...',
        options: ['24', '25', '30', '22'],
        answer: '25',
        explanation: 'Common difference = +5. Next term: 20 + 5 = 25. This is the 5 times table!',
        difficulty: 'easy'
      },
      {
        question: 'What is the common difference in: 8, 11, 14, 17, ...?',
        options: ['3', '2', '4', '5'],
        answer: '3',
        explanation: '11 - 8 = 3, 14 - 11 = 3, 17 - 14 = 3. Common difference = 3.',
        difficulty: 'easy'
      },
      {
        question: 'Find the next term: 40, 35, 30, 25, ...',
        options: ['20', '15', '30', '22'],
        answer: '20',
        explanation: 'Common difference = -5 (decreasing). Next: 25 - 5 = 20.',
        difficulty: 'easy'
      },
      {
        question: 'What type of sequence is: 1, 2, 4, 8, 16, ...?',
        options: ['Arithmetic', 'Geometric', 'Fibonacci', 'Square numbers'],
        answer: 'Geometric',
        explanation: 'Each term × 2 gives the next: 1×2=2, 2×2=4, 4×2=8, 8×2=16. Geometric with ratio 2.',
        difficulty: 'medium'
      },
      {
        question: 'The nth term is 4n + 3. What is the 5th term?',
        options: ['23', '20', '19', '27'],
        answer: '23',
        explanation: 'Substitute n=5: 4(5) + 3 = 20 + 3 = 23.',
        difficulty: 'medium'
      },
      {
        question: 'Find the next term: 2, 5, 11, 23, ...',
        options: ['35', '47', '46', '45'],
        answer: '47',
        explanation: 'Differences: 3, 6, 12 (doubling!). Next difference: 12×2=24. So: 23+24=47. Not arithmetic - differences increase!',
        difficulty: 'hard'
      },
      {
        question: 'What is the nth term of: 7, 10, 13, 16, ...?',
        options: ['3n + 4', '3n + 7', '4n + 3', '3n + 3'],
        answer: '3n + 4',
        explanation: 'Common difference = 3, so 3n. Check: 3(1)=3 but we want 7, so add 4. nth term = 3n + 4. Check: 3(1)+4=7 ✓',
        difficulty: 'hard'
      },
      {
        question: 'Find the 10th term if nth term = 2n + 5',
        options: ['15', '25', '20', '30'],
        answer: '25',
        explanation: 'Substitute n=10: 2(10) + 5 = 20 + 5 = 25.',
        difficulty: 'medium'
      },
      {
        question: 'Which is a Fibonacci sequence?',
        options: ['1,1,2,3,5,8', '2,4,8,16', '1,4,9,16', '5,10,15,20'],
        answer: '1,1,2,3,5,8',
        explanation: 'Fibonacci: add previous two terms. 1+1=2, 1+2=3, 2+3=5, 3+5=8 ✓',
        difficulty: 'medium'
      },
      {
        question: 'Find the next term: 3, 12, 48, 192, ...',
        options: ['768', '576', '240', '384'],
        answer: '768',
        explanation: 'Geometric: multiply by 4 each time. 12÷3=4, 48÷12=4, 192÷48=4. Next: 192×4=768.',
        difficulty: 'hard'
      }
    ],
    
    tips: [
      '⭐ Always find differences between ALL consecutive terms to confirm the pattern',
      '⭐ If differences aren\'t the same, check if it\'s geometric (try dividing)',
      '⭐ For decreasing sequences, the common difference is negative',
      '⭐ Check your nth term formula by substituting n=1, n=2, n=3',
      '⭐ Learn to recognize common sequences: square numbers, cube numbers, Fibonacci',
      '⭐ Write down the common difference clearly in your working',
      '⭐ For geometric sequences, divide consecutive terms to find the multiplier',
      '⭐ Remember: nth term = (common difference)n + (constant adjustment)'
    ],
    
    commonMistakes: [
      '❌ Only checking difference between first two terms (pattern must work for ALL!)',
      '❌ Confusing arithmetic with geometric (adding vs multiplying)',
      '❌ Getting signs wrong with negative common differences',
      '❌ For nth term: forgetting to check the formula with original terms',
      '❌ Thinking all sequences are arithmetic (some multiply, some have changing differences)',
      '❌ Not showing the common difference in working (lose method marks)',
      '❌ For geometric: trying to add instead of multiply',
      '❌ Making arithmetic errors when continuing the sequence'
    ],
    
    examStrategy: `
**Question Types & Marks:**

1. **Find next term(s)** (1-2 marks)
   - Find common difference
   - Add/subtract to continue

2. **Find nth term** (2-3 marks)
   - Find common difference
   - Work out formula
   - CHECK it works!

3. **Use nth term to find specific term** (2 marks)
   - Substitute value of n
   - Calculate

4. **Identify sequence type** (1 mark)
   - Check if arithmetic, geometric, or special

**Method for Finding Next Terms:**

1. Find the difference between consecutive terms
2. Check difference is the same throughout
3. Add (or subtract) that difference to last term
4. Repeat for required number of terms

**Method for nth Term:**

1. Find common difference (d)
2. Identify the "dn" part
3. Compare with original sequence
4. Work out what to add/subtract
5. Write as dn + c
6. CHECK with n=1, n=2, n=3

**Show Your Working:**
"Common difference = +3" (1 mark available)
"Next term: 15 + 3 = 18" (method mark)

**Time Management:**
- Simple "next term": 1 minute
- nth term: 3-4 minutes
- If stuck on nth term, skip and come back

**Common Exam Wording:**
- "Find the next two terms" = continue the sequence
- "Find the nth term" = write a formula
- "What is the 20th term?" = use nth term formula

**Calculator Use:**
Can use calculator for arithmetic, but show method:
"Common difference = 43 - 37 = 6" ✓

**Grade 5 Requirements:**
Must be able to:
✓ Find next terms in arithmetic sequences
✓ Find nth term for simple sequences (dn + c)
✓ Use nth term formula to find any term
✓ Recognize geometric sequences
✓ Work with negative common differences

**Top Strategy:**
For Foundation, focus on arithmetic sequences - they're 90% of sequence questions! Master finding the common difference and nth term. Geometric sequences are rarer but good for higher grades.

**Practice Priority:**
1. Finding common difference (essential!)
2. Continuing sequences (most common)
3. nth term formula (Grade 4-5 skill)
4. Using nth term (straightforward marks)

This topic is worth 4-6 marks per paper. Quick marks if you know the method!
`
  },

  // ==================== MODULE 7: GRAPHS AND COORDINATES ====================
  {
    moduleNumber: 7,
    title: 'Graphs (Straight Lines & Coordinates)',
    duration: '70 minutes',
    introduction: 'Master plotting coordinates, drawing straight line graphs, and understanding gradients. Graphs appear in every GCSE paper and are worth 10-15 marks! Learn to plot points accurately, find gradients, and work with the equation y = mx + c.',
    
    keyPoints: [
      'Coordinates written as (x, y) - x is horizontal (along), y is vertical (up)',
      'Always start at origin (0,0), go along the x-axis first, then up/down the y-axis',
      'Straight line equation: y = mx + c where m = gradient, c = y-intercept',
      'Gradient = rise ÷ run (how much up ÷ how much across)',
      'y-intercept is where the line crosses the y-axis (when x = 0)',
      'Horizontal line: y = number (e.g. y = 3), Vertical line: x = number (e.g. x = -2)'
    ],
    
    explanation: `
**Understanding Coordinates**

Every point on a graph has coordinates: **(x, y)**

**x** = horizontal position (left/right)
**y** = vertical position (up/down)

**Remember:** "Along the corridor, up the stairs"
- First go ALONG (x-axis)
- Then go UP/DOWN (y-axis)

**Example:** Point (3, 5)
- Start at origin (0, 0)
- Move 3 along (right)
- Move 5 up
- Plot the point!

**The Four Quadrants**

The axes divide the graph into 4 quadrants:

Quadrant 2 (top left) | Quadrant 1 (top right)
         x negative, y positive | x positive, y positive
         
Quadrant 3 (bottom left) | Quadrant 4 (bottom right)
         x negative, y negative | x positive, y negative

- 1st quadrant (top right): (+, +) both positive
- 2nd quadrant (top left): (-, +) x negative, y positive
- 3rd quadrant (bottom left): (-, -) both negative
- 4th quadrant (bottom right): (+, -) x positive, y negative

**Plotting Points**

**Example:** Plot (2, -3)

1. Start at origin (0, 0)
2. Move 2 right (positive x)
3. Move 3 down (negative y)
4. Mark the point clearly with ×

**Negative Coordinates**

- Negative x: move LEFT from origin
- Negative y: move DOWN from origin

**Example:** (-4, 2)
- Move 4 left
- Move 2 up

**Straight Line Graphs**

General form: **y = mx + c**

**m** = gradient (steepness)
**c** = y-intercept (where line crosses y-axis)

**Understanding Gradient (m)**

Gradient = rise ÷ run

**Rise** = vertical change (up/down)
**Run** = horizontal change (across)

**Example:** Line through (1, 2) and (3, 6)

Rise = 6 - 2 = 4 (up)
Run = 3 - 1 = 2 (across)
Gradient = 4 ÷ 2 = 2

**Positive gradient:** Line slopes upwards / (going left to right)
**Negative gradient:** Line slopes downwards \\ (going left to right)
**Zero gradient:** Horizontal line — (flat)
**Undefined gradient:** Vertical line | (straight up)

**Understanding y-intercept (c)**

The y-intercept is where the line crosses the y-axis.
This is the y-value when x = 0.

**Example:** y = 2x + 3
- When x = 0: y = 2(0) + 3 = 3
- y-intercept = 3
- Line crosses y-axis at (0, 3)

**Special Lines**

**Horizontal lines: y = number**
- All points have same y-coordinate
- Example: y = 4 (all points have y = 4)
- Gradient = 0

**Vertical lines: x = number**
- All points have same x-coordinate
- Example: x = -2 (all points have x = -2)
- Gradient = undefined

**Diagonal lines through origin**
- y = x (45° line through origin, gradient = 1)
- y = -x (45° line through origin, gradient = -1)
- y = 2x, y = 3x, etc.

**Drawing Graphs from Equations**

Method 1: Table of Values

**Example:** Draw y = 2x + 1

Make a table:
| x  | -2 | -1 | 0 | 1 | 2 |
|----|----|----|---|---|---|
| y  | -3 | -1 | 1 | 3 | 5 |

Calculate: When x = -2: y = 2(-2) + 1 = -3
Plot points, join with straight line

Method 2: Using m and c

**Example:** Draw y = 3x - 2
- c = -2, so line crosses y-axis at (0, -2)
- m = 3, so gradient is 3 (up 3, across 1)
- Plot (0, -2), use gradient to find next point
- Draw line through points

**Finding Gradient from Two Points**

Formula: **gradient = (y₂ - y₁) ÷ (x₂ - x₁)**

**Example:** Find gradient through (2, 5) and (6, 13)

gradient = (13 - 5) ÷ (6 - 2)
         = 8 ÷ 4
         = 2

**Reading Information from Graphs**

From y = mx + c you can read:
- **m** (gradient) = steepness of line
- **c** (y-intercept) = where line crosses y-axis

**Example:** y = 4x - 3
- Gradient = 4 (fairly steep, positive)
- y-intercept = -3 (crosses y-axis at -3)
`,
    
    examples: [
      {
        question: 'What are the coordinates of point A shown at 3 units right and 4 units up from the origin?',
        workingOut: `Step 1: Remember coordinate format
Coordinates are written as (x, y)

Step 2: Identify x-coordinate (horizontal position)
3 units right from origin = x = 3

Step 3: Identify y-coordinate (vertical position)
4 units up from origin = y = 4

Step 4: Write the coordinates
(3, 4)

Remember: "Along the corridor (x), up the stairs (y)"`,
        answer: '(3, 4)',
        explanation: 'Coordinates are always (x, y) - x comes first! x is the horizontal position (left/right), y is vertical (up/down). Point is 3 right and 4 up, so coordinates are (3, 4). Think: "along the corridor, up the stairs" to remember x then y!'
      },
      {
        question: 'Find the gradient of the line passing through (1, 2) and (5, 10)',
        workingOut: `Step 1: Label the points
(x₁, y₁) = (1, 2)
(x₂, y₂) = (5, 10)

Step 2: Use the gradient formula
gradient = (y₂ - y₁) ÷ (x₂ - x₁)
         = (10 - 2) ÷ (5 - 1)

Step 3: Calculate
         = 8 ÷ 4
         = 2

Step 4: Interpret
Gradient = 2 (positive, so line slopes upward)

Alternative method (rise over run):
Rise = 10 - 2 = 8 (up)
Run = 5 - 1 = 4 (across)
Gradient = 8 ÷ 4 = 2`,
        answer: 'Gradient = 2',
        explanation: 'Gradient = rise ÷ run = change in y ÷ change in x. From (1,2) to (5,10): y increases by 8 (from 2 to 10), x increases by 4 (from 1 to 5). So gradient = 8÷4 = 2. Positive gradient means line slopes upward left to right.'
      },
      {
        question: 'What is the y-intercept of the line y = 3x + 5?',
        workingOut: `Step 1: Identify the equation form
This is in the form y = mx + c

Step 2: Identify each part
y = 3x + 5
m = 3 (gradient)
c = 5 (y-intercept)

Step 3: State the y-intercept
y-intercept = 5

Step 4: What this means
The line crosses the y-axis at the point (0, 5)

Step 5: Verify
When x = 0: y = 3(0) + 5 = 5 ✓`,
        answer: 'y-intercept = 5 (line crosses y-axis at (0, 5))',
        explanation: 'In the equation y = mx + c, the c value is the y-intercept. For y = 3x + 5, c = 5. This means the line crosses the y-axis at y = 5, or point (0, 5). You can check: when x = 0, y = 3(0) + 5 = 5 ✓'
      },
      {
        question: 'Complete the table for y = 2x - 1 when x = -1, 0, 1, 2',
        workingOut: `Step 1: When x = -1
y = 2(-1) - 1
y = -2 - 1
y = -3

Step 2: When x = 0
y = 2(0) - 1
y = 0 - 1
y = -1

Step 3: When x = 1
y = 2(1) - 1
y = 2 - 1
y = 1

Step 4: When x = 2
y = 2(2) - 1
y = 4 - 1
y = 3

Step 5: Complete table
| x | -1 | 0  | 1 | 2 |
| y | -3 | -1 | 1 | 3 |`,
        answer: 'When x = -1, y = -3; x = 0, y = -1; x = 1, y = 1; x = 2, y = 3',
        explanation: 'Substitute each x value into the equation y = 2x - 1. For x = -1: y = 2(-1) - 1 = -2 - 1 = -3. For x = 0: y = 2(0) - 1 = -1. Continue for all x values. These points can then be plotted to draw the straight line.'
      },
      {
        question: 'A line passes through (0, 4) with gradient 3. What is its equation?',
        workingOut: `Step 1: Identify what we know
Line passes through (0, 4)
Since x = 0, this is the y-intercept!
So c = 4

Gradient = 3
So m = 3

Step 2: Use y = mx + c form
y = mx + c
m = 3, c = 4

Step 3: Write the equation
y = 3x + 4

Step 4: Verify with the point
When x = 0: y = 3(0) + 4 = 4 ✓
Line passes through (0, 4) ✓`,
        answer: 'y = 3x + 4',
        explanation: 'Equation of straight line: y = mx + c. We know m (gradient) = 3 and the line passes through (0, 4), which is the y-intercept, so c = 4. Therefore equation is y = 3x + 4. Any point (0, y) is the y-intercept!'
      },
      {
        question: 'Plot the points A(2, 3), B(-1, 3), C(-1, -2) and D(2, -2). What shape do they form?',
        workingOut: `Need to plot all 4 points accurately, then identify the shape.

Step 1: Plot point A(2, 3)
Start at origin
Move 2 right (x = 2)
Move 3 up (y = 3)
Mark point A

Step 2: Plot point B(-1, 3)
Start at origin
Move 1 left (x = -1, negative means left)
Move 3 up (y = 3)
Mark point B
Notice: Same y-coordinate as A!

Step 3: Plot point C(-1, -2)
Start at origin
Move 1 left (x = -1)
Move 2 down (y = -2, negative means down)
Mark point C
Notice: Same x-coordinate as B!

Step 4: Plot point D(2, -2)
Start at origin
Move 2 right (x = 2)
Move 2 down (y = -2)
Mark point D
Notice: Same x-coordinate as A, same y-coordinate as C!

Step 5: Join the points in order
A → B → C → D → back to A

Step 6: Analyze the shape
- All 4 sides are straight lines
- Opposite sides are parallel:
  AB parallel to DC (both horizontal, y = 3 and y = -2)
  BC parallel to AD (both vertical, x = -1 and x = 2)
- AB = 3 units (from x = -1 to x = 2)
- DC = 3 units
- BC = 5 units (from y = 3 to y = -2)
- AD = 5 units
- All corners are right angles (one horizontal, one vertical meet)

Answer: RECTANGLE`,
        answer: 'Rectangle',
        explanation: 'Plot each point carefully using (x, y). A(2,3) is 2 right, 3 up. B(-1,3) is 1 left, 3 up. C(-1,-2) is 1 left, 2 down. D(2,-2) is 2 right, 2 down. When joined, opposite sides are equal and parallel, all angles are 90°, so it\'s a rectangle. Coordinate geometry questions like this are worth 3-4 marks - accuracy in plotting is essential!'
      },
      {
        question: 'Distance-time graph: A car travels from home. In the first 2 hours it travels 100 miles. It then stops for 1 hour. Then it travels another 50 miles in the next hour. Draw and interpret the graph.',
        workingOut: `Distance-time graphs are VERY common in GCSE!

Step 1: Set up axes
Horizontal axis = Time (hours)
Vertical axis = Distance from home (miles)
Scale: Time 0-4 hours, Distance 0-150 miles

Step 2: Plot segment 1 (First 2 hours)
Start: (0, 0) - at home, time = 0
End: (2, 100) - after 2 hours, 100 miles from home
Draw straight line connecting these points
This represents constant speed travel

Step 3: Plot segment 2 (Stop for 1 hour)
Start: (2, 100) - stopped at 100 miles
End: (3, 100) - still at 100 miles after 1 hour
Draw horizontal line
Horizontal line = NO movement (distance stays same)

Step 4: Plot segment 3 (Next hour travels 50 miles)
Start: (3, 100) - restarting journey
End: (4, 150) - after 1 more hour, now 150 miles from home
Draw straight line

INTERPRETATION:

Gradient = Speed

Segment 1 gradient:
Rise = 100 miles
Run = 2 hours
Speed = 100 ÷ 2 = 50 mph

Segment 2 gradient:
Rise = 0 miles (no change in distance)
Gradient = 0
Speed = 0 mph (STOPPED)

Segment 3 gradient:
Rise = 50 miles
Run = 1 hour
Speed = 50 ÷ 1 = 50 mph

SUMMARY:
- Travels at 50 mph for 2 hours
- Stops (rest/refuel) for 1 hour
- Continues at 50 mph for 1 hour
- Total distance: 150 miles
- Total time: 4 hours`,
        answer: 'Graph with 3 segments: sloping up, horizontal, sloping up',
        explanation: 'Distance-time graphs: gradient = speed! Sloping line = moving, horizontal line = stopped, steeper gradient = faster speed. Here: travels 100 miles in 2 hours (50mph), stops for 1 hour (horizontal line at 100 miles), then travels 50 miles in 1 hour (50mph again). These real-world graph questions are worth 4-6 marks - show clear understanding of what each section represents!'
      },
      {
        question: 'Find the equation of the line with gradient -2 passing through point (3, 5)',
        workingOut: `Finding equation when given gradient and a point (NOT y-intercept).

Method: Use y = mx + c, substitute point to find c

Step 1: Write what we know
Gradient m = -2
Line passes through (3, 5)
So when x = 3, y = 5

Step 2: Start with y = mx + c
y = -2x + c

Step 3: Substitute the point (3, 5)
5 = -2(3) + c
5 = -6 + c

Step 4: Solve for c
5 = -6 + c
5 + 6 = c
c = 11

Step 5: Write final equation
y = -2x + 11

Step 6: CHECK with the point
When x = 3:
y = -2(3) + 11
y = -6 + 11
y = 5 ✓
Line passes through (3, 5) ✓

Step 7: CHECK gradient makes sense
Negative gradient (-2) means line slopes downward \\
Let's verify: try x = 0
y = -2(0) + 11 = 11 → point (0, 11)
Try x = 1
y = -2(1) + 11 = 9 → point (1, 9)
From (0,11) to (1,9): down 2, across 1 = gradient -2 ✓

Alternative method (for Grade 5):
Use formula: y - y₁ = m(x - x₁)
y - 5 = -2(x - 3)
y - 5 = -2x + 6
y = -2x + 11 ✓`,
        answer: 'y = -2x + 11',
        explanation: 'When given gradient and a point (not y-intercept), use y=mx+c with the point to find c. Here: y=-2x+c, substitute (3,5): 5=-2(3)+c, so 5=-6+c, therefore c=11. Equation: y=-2x+11. Always check your answer by substituting the point back! This is Grade 4-5 level and worth 3-4 marks.'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'What is the y-coordinate of point (5, -3)?',
        options: ['5', '-3', '2', '8'],
        answer: '-3',
        explanation: 'Coordinates are (x, y). The second number is always y. So y-coordinate = -3.',
        difficulty: 'easy'
      },
      {
        question: 'What is the gradient of line y = 4x + 7?',
        options: ['4', '7', '11', '3'],
        answer: '4',
        explanation: 'In y = mx + c, m is the gradient. Here m = 4, so gradient = 4.',
        difficulty: 'easy'
      },
      {
        question: 'Which point lies on the line y = 5?',
        options: ['(5, 0)', '(0, 5)', '(5, 5)', 'All of these'],
        answer: '(0, 5)',
        explanation: 'y = 5 is a horizontal line where ALL points have y = 5. Only (0, 5) has y = 5. Note: (5, 5) also works, but not given as sole option.',
        difficulty: 'medium'
      },
      {
        question: 'Find gradient of line through (2, 3) and (4, 7)',
        options: ['2', '4', '1', '3'],
        answer: '2',
        explanation: 'Gradient = (y₂-y₁)÷(x₂-x₁) = (7-3)÷(4-2) = 4÷2 = 2. Or: rise = 4, run = 2, so 4÷2 = 2.',
        difficulty: 'medium'
      },
      {
        question: 'Where does y = 2x - 3 cross the y-axis?',
        options: ['(0, -3)', '(-3, 0)', '(2, -3)', '(0, 2)'],
        answer: '(0, -3)',
        explanation: 'y-intercept c = -3. Line crosses y-axis at (0, -3). When x = 0, y = 2(0) - 3 = -3.',
        difficulty: 'medium'
      },
      {
        question: 'What is the equation of a vertical line through x = 4?',
        options: ['y = 4', 'x = 4', 'y = x + 4', 'x + y = 4'],
        answer: 'x = 4',
        explanation: 'Vertical lines have equation x = number. All points on line have x = 4.',
        difficulty: 'medium'
      },
      {
        question: 'If y = -2x + 1, what is y when x = 3?',
        options: ['-5', '7', '-6', '5'],
        answer: '-5',
        explanation: 'Substitute x = 3: y = -2(3) + 1 = -6 + 1 = -5.',
        difficulty: 'easy'
      },
      {
        question: 'Which line is steeper: y = 5x or y = 3x?',
        options: ['y = 5x', 'y = 3x', 'Same steepness', 'Cannot tell'],
        answer: 'y = 5x',
        explanation: 'Gradient of y = 5x is 5. Gradient of y = 3x is 3. Bigger gradient = steeper, so y = 5x is steeper.',
        difficulty: 'medium'
      },
      {
        question: 'Point (-2, 5) is in which quadrant?',
        options: ['1st', '2nd', '3rd', '4th'],
        answer: '2nd',
        explanation: 'x is negative (-2), y is positive (5). Negative x, positive y = 2nd quadrant (top left).',
        difficulty: 'hard'
      },
      {
        question: 'What is the gradient of a horizontal line?',
        options: ['0', '1', 'Undefined', 'Infinity'],
        answer: '0',
        explanation: 'Horizontal line has no rise (y stays same), so rise÷run = 0÷run = 0. Gradient = 0.',
        difficulty: 'medium'
      }
    ],
    
    tips: [
      '⭐ Always write coordinates as (x, y) - x first, then y!',
      '⭐ Think "along the corridor, up the stairs" to remember x then y',
      '⭐ In y = mx + c: m is gradient (steepness), c is y-intercept',
      '⭐ Use a ruler for drawing straight lines - accuracy matters!',
      '⭐ Plot at least 3 points when drawing from equation (to check accuracy)',
      '⭐ Label axes with scales clearly',
      '⭐ For gradient: count squares up (rise) then across (run)',
      '⭐ Positive gradient: line slopes up /, Negative gradient: slopes down \\'
    ],
    
    commonMistakes: [
      '❌ Writing coordinates in wrong order: (y, x) instead of (x, y)',
      '❌ Mixing up gradient and y-intercept in y = mx + c',
      '❌ Not using a ruler to draw straight lines (lose accuracy marks)',
      '❌ Confusing x = 5 (vertical) with y = 5 (horizontal)',
      '❌ Getting negative gradients wrong (line going down is negative)',
      '❌ Not reading the scale on axes correctly',
      '❌ For gradient: dividing run by rise instead of rise by run',
      '❌ Plotting points inaccurately (not using the cross-hairs properly)',
      '❌ Not extending line beyond plotted points with arrows'
    ],
    
    examStrategy: `
**Question Types & Marks:**

1. **Plot coordinates** (1-2 marks per point)
   - Read scales carefully
   - Plot with small, clear ×

2. **Find gradient** (2 marks)
   - Show formula or rise/run
   - Calculate correctly

3. **Complete table of values** (2-3 marks)
   - Substitute each x value
   - Show working

4. **Draw graph from equation** (3-4 marks)
   - Make table OR use m and c
   - Plot 3+ points
   - Use ruler for line
   - Add arrows at ends

5. **Find equation of line** (2-3 marks)
   - Identify m and c
   - Write y = mx + c

**Accuracy is Crucial:**

- Plot points exactly on intersections
- Use sharp pencil for × marks
- Rule lines carefully
- Read scales precisely (half squares count!)

**Drawing Graphs:**

Method 1: Table of values (safer for Foundation)
1. Make table with at least 3 x values
2. Calculate y for each x
3. Plot points carefully
4. Join with straight line (use ruler!)
5. Add arrows at both ends

Method 2: Gradient-intercept (faster if confident)
1. Plot y-intercept (0, c)
2. Use gradient m (up m, across 1)
3. Plot second point
4. Draw line through points

**Reading Graphs:**

- y-intercept: where line crosses y-axis (x = 0)
- gradient: count up, then count across
- Check if positive (slopes up) or negative (slopes down)

**Calculator Work:**

Can use calculator for substitution and gradient calculations, but MUST show working:

"When x = 3: y = 2(3) - 1 = 5" ✓

**Common Exam Wording:**

- "Plot point" = mark with small ×
- "Draw graph" = need ruler, at least 3 points
- "Find gradient" = rise ÷ run
- "Write equation" = y = mx + c form

**Time Management:**

- Plotting 3-4 points: 2-3 minutes
- Drawing full graph: 5-6 minutes  
- Finding gradient: 2 minutes
- Completing table: 3-4 minutes

**Grade 5 Requirements:**

Must be confident with:
✓ Plotting positive and negative coordinates
✓ Finding gradients from two points
✓ Understanding y = mx + c
✓ Drawing graphs from equations
✓ Recognizing horizontal (y=k) and vertical (x=k) lines

**Top Exam Tips:**

1. **Use graph paper properly** - count squares carefully
2. **Ruler is essential** - freehand lines lose marks
3. **Show all substitutions** - even if using calculator
4. **Check points** - do they make a straight line?
5. **Label clearly** - axes, scales, equations

**Practice Focus:**

This topic is worth 10-15 marks per paper - excellent return on time invested!

Priority skills:
1. Plotting coordinates accurately (most common)
2. Finding gradient from two points (regular question)
3. Understanding y = mx + c (essential for higher grades)
4. Drawing graphs (appears every paper)

Master these for guaranteed marks!
`
  },

  // ==================== MODULE 8: GEOMETRY ====================
  {
    moduleNumber: 8,
    title: 'Geometry (Angles, Shapes, Area, Perimeter)',
    duration: '80 minutes',
    introduction: 'Master essential geometry skills - angles, shapes, area, and perimeter. This topic is worth 20-25 marks per paper! Learn angle rules, calculate areas and perimeters, and work with 2D shapes. Geometry appears in every GCSE Foundation paper.',
    
    keyPoints: [
      'Angles on a straight line = 180°, Angles around a point = 360°',
      'Angles in a triangle = 180°, Angles in a quadrilateral = 360°',
      'Perimeter = distance around the outside (add all sides)',
      'Area of rectangle = length × width, Area of triangle = ½ × base × height',
      'Always include UNITS in your answer (cm, cm², m, m², etc.)',
      'Show your working - method marks available even if answer wrong!'
    ],
    
    explanation: `
**Angle Rules You MUST Know**

**1. Angles on a Straight Line = 180°**

When angles are on a straight line, they add to 180°

Example: If two angles are 120° and x°
120° + x° = 180°
x° = 60°

**2. Angles Around a Point = 360°**

Angles that meet at a point add to 360°

Example: Angles 90°, 100°, x° around a point
90° + 100° + x° = 360°
x° = 170°

**3. Vertically Opposite Angles are Equal**

When two lines cross, opposite angles are equal

If one angle is 50°, the opposite angle is also 50°

**4. Angles in a Triangle = 180°**

All three angles in ANY triangle add to 180°

Example: Triangle with angles 60°, 70°, x°
60° + 70° + x° = 180°
x° = 50°

**5. Angles in a Quadrilateral = 360°**

All four angles in ANY quadrilateral add to 360°

Example: Quadrilateral with angles 90°, 120°, 80°, x°
90° + 120° + 80° + x° = 360°
x° = 70°

**Types of Angles**

- **Acute angle:** Less than 90°
- **Right angle:** Exactly 90°
- **Obtuse angle:** Between 90° and 180°
- **Reflex angle:** Between 180° and 360°

**Types of Triangles**

- **Equilateral:** All 3 sides equal, all 3 angles = 60°
- **Isosceles:** 2 sides equal, 2 angles equal
- **Scalene:** All sides different, all angles different
- **Right-angled:** One angle = 90°

**Types of Quadrilaterals**

- **Square:** 4 equal sides, 4 right angles
- **Rectangle:** Opposite sides equal, 4 right angles
- **Parallelogram:** Opposite sides parallel and equal
- **Rhombus:** 4 equal sides, opposite sides parallel
- **Trapezium:** One pair of parallel sides
- **Kite:** 2 pairs of adjacent sides equal

**Perimeter**

Perimeter = total distance around the outside

**Method:** Add ALL the sides

**Rectangle:**
Perimeter = 2 × length + 2 × width
Or: P = 2(l + w)

**Example:** Rectangle 8cm by 5cm
P = 2(8) + 2(5) = 16 + 10 = 26cm

**Square:**
Perimeter = 4 × side
P = 4s

**Example:** Square with side 6cm
P = 4 × 6 = 24cm

**Triangle:**
Perimeter = side 1 + side 2 + side 3

**Area**

Area = amount of space inside a shape
Always measured in SQUARE units (cm², m², etc.)

**Rectangle/Square:**
Area = length × width
A = l × w

**Example:** Rectangle 7cm by 4cm
A = 7 × 4 = 28 cm²

**Triangle:**
Area = ½ × base × height
A = ½bh

**Important:** Height must be PERPENDICULAR to base!

**Example:** Triangle with base 10cm, height 6cm
A = ½ × 10 × 6 = ½ × 60 = 30 cm²

**Parallelogram:**
Area = base × perpendicular height
A = b × h

**Trapezium:**
Area = ½ × (a + b) × height
Where a and b are the parallel sides

**Circle (Foundation tier basics):**
- **Circumference** = perimeter of circle = 2πr or πd
- **Area** = πr²
- Use π button on calculator or π ≈ 3.14

**Compound Shapes**

Split into simple shapes, find area of each, add/subtract

**Example:** L-shape
Split into two rectangles
Find area of each
Add them together

**Units**

**Length:** mm, cm, m, km
**Area:** mm², cm², m², km²
**Volume:** mm³, cm³, m³

**Always check:**
- Perimeter answer in length units (cm, m)
- Area answer in SQUARE units (cm², m²)

**Converting Units**

**Length:**
- 1m = 100cm
- 1cm = 10mm
- 1km = 1000m

**Area:**
- 1m² = 100cm × 100cm = 10,000 cm²
- 1cm² = 10mm × 10mm = 100 mm²
`,
    
    examples: [
      {
        question: 'Find the missing angle x on a straight line where one angle is 125°',
        workingOut: `Step 1: Recall the angle rule
Angles on a straight line add to 180°

Step 2: Set up equation
125° + x° = 180°

Step 3: Solve for x
x° = 180° - 125°
x° = 55°

Step 4: Check
125° + 55° = 180° ✓

Answer: x = 55°`,
        answer: 'x = 55°',
        explanation: 'Angles on a straight line always add to 180°. If one angle is 125°, the other must be 180° - 125° = 55°. Always state which angle rule you\'re using - you get method marks for this! Check your answer: 125° + 55° = 180° ✓'
      },
      {
        question: 'A triangle has angles 65°, 72°, and x°. Find x.',
        workingOut: `Step 1: State the angle rule
Angles in a triangle add to 180°

Step 2: Write equation
65° + 72° + x° = 180°

Step 3: Add known angles
137° + x° = 180°

Step 4: Solve for x
x° = 180° - 137°
x° = 43°

Step 5: Verify
65° + 72° + 43° = 180° ✓

Answer: x = 43°`,
        answer: 'x = 43°',
        explanation: 'All triangles have angles adding to 180°. Add the two known angles: 65° + 72° = 137°. Then: 180° - 137° = 43°. Always check by adding all three: 65° + 72° + 43° = 180° ✓. State "angles in triangle = 180°" for method mark!'
      },
      {
        question: 'Find the perimeter of a rectangle with length 12cm and width 7cm',
        workingOut: `Step 1: Recall perimeter formula for rectangle
Perimeter = 2 × length + 2 × width
Or: P = 2(l + w)

Step 2: Substitute values
P = 2 × 12 + 2 × 7

Step 3: Calculate
P = 24 + 14
P = 38 cm

Step 4: Check units
Length units (cm) ✓

Alternative method:
Add all 4 sides: 12 + 7 + 12 + 7 = 38 cm

Answer: 38 cm`,
        answer: '38 cm',
        explanation: 'Perimeter = distance around outside. For rectangle, add all 4 sides OR use formula P = 2l + 2w. Here: 2(12) + 2(7) = 24 + 14 = 38cm. MUST include units (cm not cm²)! Common mistake: calculating area instead of perimeter.'
      },
      {
        question: 'Calculate the area of a rectangle 9cm by 5cm',
        workingOut: `Step 1: State the area formula
Area of rectangle = length × width
A = l × w

Step 2: Substitute values
A = 9 × 5

Step 3: Calculate
A = 45

Step 4: Add correct units
Area uses SQUARE units
A = 45 cm²

Step 5: Check units are squared
cm² not cm ✓

Answer: 45 cm²`,
        answer: '45 cm²',
        explanation: 'Area of rectangle = length × width. Here: 9 × 5 = 45. CRITICAL: Area always in SQUARE units (cm²)! Writing 45 cm would be WRONG and lose marks. Show formula, substitution, and calculation clearly for full method marks.'
      },
      {
        question: 'Find the area of a triangle with base 8cm and height 6cm',
        workingOut: `Step 1: State the formula
Area of triangle = ½ × base × height
A = ½bh

Step 2: Substitute values
A = ½ × 8 × 6

Step 3: Calculate (multiply first)
A = ½ × 48

Step 4: Divide by 2
A = 24

Step 5: Add units (squared!)
A = 24 cm²

Check: Does answer make sense?
Rectangle 8×6 = 48 cm²
Triangle is half, so 24 cm² ✓

Answer: 24 cm²`,
        answer: '24 cm²',
        explanation: 'Triangle area = ½ × base × height. Multiply base × height first (8 × 6 = 48), then halve it (48 ÷ 2 = 24). Answer in cm² (squared!). Quick check: triangle is half of rectangle, so triangle area should be half of (8×6=48) which is 24 ✓'
      },
      {
        question: 'Compound shape: L-shape with dimensions - large rectangle 12cm × 8cm with small rectangle 4cm × 3cm cut from corner. Find area.',
        workingOut: `Compound shapes need breaking into simpler shapes!

METHOD 1: Subtract the cut-out

Step 1: Find area of LARGE rectangle
Area = length × width
= 12 × 8
= 96 cm²

Step 2: Find area of CUT-OUT small rectangle
Area = 4 × 3
= 12 cm²

Step 3: Subtract cut-out from large
96 - 12 = 84 cm²

METHOD 2: Split into two rectangles (no cut-out)

If the L-shape is:
- Horizontal part: 12cm × 5cm (8-3=5cm height)
- Vertical part: 8cm × 3cm (12-4=8cm width)

Step 1: Area of horizontal part
12 × 5 = 60 cm²

Step 2: Area of vertical part
8 × 3 = 24 cm²

Step 3: Add both areas
60 + 24 = 84 cm²

Both methods give 84 cm² ✓

CHECK: Does answer make sense?
Large rectangle = 96 cm²
Our answer (84 cm²) is less than 96 ✓
We removed 12 cm², so 96-12=84 ✓

EXAM TIP:
Draw lines to show how you split the shape
Label all dimensions clearly`,
        answer: '84 cm²',
        explanation: 'Compound shapes: either (1) SUBTRACT - find whole area, subtract cut-out, or (2) ADD - split into rectangles and add. Both work! Here: large rectangle (12×8=96) minus cut-out (4×3=12) equals 84 cm². Always show your method clearly - compound shape questions worth 4-5 marks! Draw lines showing how you split/subtract.'
      },
      {
        question: 'Parallel lines and angles: Two parallel lines cut by a transversal. One angle is 65°. Find all other angles.',
        workingOut: `Parallel lines create special angle relationships!

Given: Parallel lines with one angle = 65°

ANGLE FACTS FOR PARALLEL LINES:

1. CORRESPONDING ANGLES (F-shape)
   - Equal to each other
   - If one is 65°, corresponding angle = 65°

2. ALTERNATE ANGLES (Z-shape)
   - Equal to each other  
   - If one is 65°, alternate angle = 65°

3. CO-INTERIOR ANGLES (C-shape or U-shape)
   - Add up to 180°
   - If one is 65°, co-interior = 180° - 65° = 115°

4. VERTICALLY OPPOSITE ANGLES
   - Equal to each other
   - If one is 65°, opposite = 65°

So around the transversal we have:
- Four angles of 65°
- Four angles of 115°

Step-by-step for all 8 angles:

At top intersection:
Angle a = 65° (given)
Angle b = 115° (angles on straight line: 180-65)
Angle c = 65° (vertically opposite to a)
Angle d = 115° (vertically opposite to b)

At bottom intersection:
Angle e = 65° (corresponding to a)
Angle f = 115° (corresponding to b)
Angle g = 65° (corresponding to c, or alternate to a)
Angle h = 115° (corresponding to d, or alternate to b)

CHECK:
All acute angles = 65° ✓
All obtuse angles = 115° ✓
65° + 115° = 180° ✓`,
        answer: 'Four angles of 65°, four angles of 115°',
        explanation: 'Parallel lines cut by transversal create predictable angle patterns! Given 65°: corresponding angles=65° (F-shape), alternate angles=65° (Z-shape), co-interior angles=115° (add to 180°, C/U-shape), angles on line with 65°=115° (180-65). These parallel line questions worth 3-4 marks - ALWAYS state which angle rule (alternate/corresponding/co-interior)!'
      },
      {
        question: 'Circle problem: Circle has diameter 14cm. Find (a) radius, (b) circumference, (c) area. Use π = 3.14.',
        workingOut: `Circle calculations - essential geometry!

Given: Diameter = 14 cm, π = 3.14

PART (a): Find RADIUS

Formula: radius = diameter ÷ 2

Step 1: Calculate
radius = 14 ÷ 2
radius = 7 cm

PART (b): Find CIRCUMFERENCE

Formula: C = π × diameter
Or: C = 2 × π × radius

Method 1 (using diameter):
C = π × d
C = 3.14 × 14
C = 43.96 cm

Method 2 (using radius):
C = 2 × π × r
C = 2 × 3.14 × 7
C = 6.28 × 7
C = 43.96 cm ✓ Same answer!

PART (c): Find AREA

Formula: A = π × r²

Step 1: Square the radius FIRST
r² = 7²
r² = 49

Step 2: Multiply by π
A = 3.14 × 49
A = 153.86 cm²

SUMMARY:
(a) Radius = 7 cm
(b) Circumference = 43.96 cm (or 44 cm)
(c) Area = 153.86 cm² (or 154 cm²)

COMMON MISTAKES TO AVOID:
❌ Confusing diameter and radius
❌ For area: 2πr instead of πr² (wrong formula!)
❌ For area: π × 2r instead of π × r²
✓ For area: SQUARE radius first, then × π

UNITS CHECK:
Radius: cm (length)
Circumference: cm (length around)
Area: cm² (MUST be squared!)`,
        answer: '(a) 7cm (b) 43.96cm (c) 153.86cm²',
        explanation: 'Circle formulas: radius=diameter÷2, circumference=πd or 2πr, area=πr². Here: (a) r=14÷2=7cm, (b) C=3.14×14=43.96cm, (c) A=3.14×7²=3.14×49=153.86cm². Remember: SQUARE radius FIRST for area, then multiply by π! Units: radius & circumference in cm, area in cm². Circle questions worth 4-6 marks total.'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Angles on a straight line: one angle is 110°, find the other',
        options: ['70°', '80°', '90°', '250°'],
        answer: '70°',
        explanation: 'Angles on straight line = 180°. So: 180° - 110° = 70°. Check: 110° + 70° = 180° ✓',
        difficulty: 'easy'
      },
      {
        question: 'Find the missing angle in triangle with angles 50° and 60°',
        options: ['70°', '80°', '60°', '110°'],
        answer: '70°',
        explanation: 'Angles in triangle = 180°. So: 180° - 50° - 60° = 70°. Check: 50° + 60° + 70° = 180° ✓',
        difficulty: 'easy'
      },
      {
        question: 'Perimeter of square with side 8cm',
        options: ['32 cm', '64 cm', '16 cm', '32 cm²'],
        answer: '32 cm',
        explanation: 'Square perimeter = 4 × side = 4 × 8 = 32 cm. Note: cm not cm² (perimeter is length!)',
        difficulty: 'easy'
      },
      {
        question: 'Area of rectangle 6cm by 4cm',
        options: ['24 cm²', '20 cm', '10 cm²', '24 cm'],
        answer: '24 cm²',
        explanation: 'Area = length × width = 6 × 4 = 24 cm². MUST be cm² (squared units) for area!',
        difficulty: 'easy'
      },
      {
        question: 'Angles around a point: 90°, 100°, 80°, and x°. Find x.',
        options: ['90°', '180°', '270°', '360°'],
        answer: '90°',
        explanation: 'Angles around point = 360°. So: 360° - 90° - 100° - 80° = 90°. Check: 90+100+80+90=360 ✓',
        difficulty: 'medium'
      },
      {
        question: 'Area of triangle: base 10cm, height 4cm',
        options: ['20 cm²', '40 cm²', '14 cm²', '20 cm'],
        answer: '20 cm²',
        explanation: 'Triangle area = ½ × base × height = ½ × 10 × 4 = ½ × 40 = 20 cm²',
        difficulty: 'medium'
      },
      {
        question: 'Perimeter of rectangle: length 15cm, width 8cm',
        options: ['46 cm', '23 cm', '120 cm²', '46 cm²'],
        answer: '46 cm',
        explanation: 'P = 2l + 2w = 2(15) + 2(8) = 30 + 16 = 46 cm. Or add all sides: 15+8+15+8=46 cm',
        difficulty: 'medium'
      },
      {
        question: 'In isosceles triangle, two angles are 70°. Find the third angle.',
        options: ['40°', '70°', '110°', '140°'],
        answer: '40°',
        explanation: 'Angles in triangle = 180°. Two angles = 70° each. So: 180° - 70° - 70° = 40°',
        difficulty: 'medium'
      },
      {
        question: 'Area of square with side 9cm',
        options: ['81 cm²', '36 cm', '18 cm²', '36 cm²'],
        answer: '81 cm²',
        explanation: 'Square area = side × side = 9 × 9 = 81 cm². Or: side² = 9² = 81 cm²',
        difficulty: 'easy'
      },
      {
        question: 'Quadrilateral angles: 110°, 85°, 90°, x°. Find x.',
        options: ['75°', '85°', '90°', '105°'],
        answer: '75°',
        explanation: 'Quadrilateral angles = 360°. So: 360° - 110° - 85° - 90° = 75°',
        difficulty: 'hard'
      }
    ],
    
    tips: [
      '⭐ Always state which angle rule you\'re using (angles on line = 180°, etc.)',
      '⭐ For perimeter: add ALL sides, units are cm or m (not squared)',
      '⭐ For area: multiply, units are cm² or m² (MUST be squared!)',
      '⭐ Triangle area: multiply base × height FIRST, then halve',
      '⭐ Draw a diagram if one isn\'t given - helps visualize the problem',
      '⭐ Check your answer makes sense (angle should be between 0° and 180° usually)',
      '⭐ Show ALL working clearly - method marks available!',
      '⭐ Don\'t forget units - writing 24 instead of 24 cm² loses marks!'
    ],
    
    commonMistakes: [
      '❌ Mixing up perimeter (add sides) with area (multiply dimensions)',
      '❌ Using cm instead of cm² for area (MUST be squared!)',
      '❌ For triangle area: forgetting to halve (×½)',
      '❌ Not showing which angle rule you\'re using (lose method marks)',
      '❌ Adding all angles in triangle to 360° instead of 180°',
      '❌ Using slant height instead of perpendicular height for triangle area',
      '❌ Forgetting to include units in final answer',
      '❌ For rectangle perimeter: only adding two sides instead of all four',
      '❌ Confusing angle types (acute vs obtuse vs reflex)'
    ],
    
    examStrategy: `
**Question Recognition & Marks:**

**Angle Questions:**
- Find missing angle (2-3 marks): State rule, show calculation
- Multiple angles (3-4 marks): Use multiple angle rules
- Always show: which rule + calculation

**Perimeter Questions:**
- Simple shape (2 marks): Add all sides, include units (cm)
- Work backwards (3 marks): Given perimeter, find missing side

**Area Questions:**
- Rectangle/square (2 marks): Show formula, calculate, units (cm²)
- Triangle (3 marks): Show ½ × b × h, calculate, units
- Compound shapes (4-5 marks): Split into parts, add areas

**Method for Angle Problems:**

1. **Identify the angle rule needed**
   - Straight line? → 180°
   - Around point? → 360°
   - Triangle? → 180°
   - Quadrilateral? → 360°

2. **Write the equation**
   Show: 50° + 70° + x° = 180°

3. **Solve for x**
   Show: x° = 180° - 50° - 70° = 60°

4. **Check answer**
   Add all angles: 50° + 70° + 60° = 180° ✓

**Method for Area/Perimeter:**

**Perimeter:**
1. Identify all sides
2. Add them up: P = side1 + side2 + ...
3. Include units (cm, m)

**Area:**
1. State formula clearly
2. Substitute values
3. Calculate
4. Include SQUARE units (cm², m²)

**Units Checklist:**
- Perimeter = cm, m, km (length)
- Area = cm², m², km² (squared!)
- Always check units in your final answer

**Common Exam Wording:**

- "Calculate the area" = use area formula, need cm²
- "Find the perimeter" = add all sides, need cm
- "Work out angle x" = use angle rules, give reason
- "Give a reason" = state the angle rule used

**Time Management:**
- Simple angle: 2 minutes
- Triangle angle: 2-3 minutes
- Perimeter: 2-3 minutes
- Area (simple): 2-3 minutes
- Compound area: 5-6 minutes

**Calculator Strategy:**
Can use calculator for multiplying/dividing, BUT show formula:
"Area = length × width = 7.5 × 4.2 = 31.5 cm²" ✓

**Grade 5 Requirements:**

Must master:
✓ All basic angle rules (line, point, triangle, quadrilateral)
✓ Perimeter of rectangles, triangles, compound shapes
✓ Area of rectangles, triangles, parallelograms
✓ Working with mixed units (converting cm to m, etc.)
✓ Compound shapes (split into parts)

**Top Scoring Tips:**

1. **Always show the formula** - gets method mark
2. **State angle rule** - "Angles in triangle = 180°" = method mark
3. **Include units** - no units = lose marks!
4. **Check answer makes sense** - perimeter > side length?
5. **Draw diagrams** - helps avoid errors

**Practice Priority:**

This topic is worth 20-25 marks per paper!

Focus on:
1. Angle rules (most common - appears every paper)
2. Rectangle area/perimeter (guaranteed questions)
3. Triangle area (regular question)
4. Compound shapes (Grade 4-5 skill)

**Memory Aids:**

- **SOAP** for angle rules:
  - **S**traight line = 180°
  - **O**ne point = 360°
  - **A**ll triangle = 180°
  - **P**olygon (quadrilateral) = 360°

- **Perimeter = Perimeter (adding around)**
- **Area = A² (always squared units!)**

Master these basics and you'll score highly on geometry questions!
`
  },

  // ==================== MODULE 9: PYTHAGORAS' THEOREM ====================
  {
    moduleNumber: 9,
    title: 'Pythagoras\' Theorem (Basic)',
    duration: '65 minutes',
    introduction: 'Learn Pythagoras\' Theorem - one of the most important formulas in maths! Find missing sides in right-angled triangles using a² + b² = c². This appears in every Foundation paper and is essential for Grade 4-5.',
    
    keyPoints: [
      'Pythagoras ONLY works for RIGHT-ANGLED triangles (with a 90° angle)',
      'Formula: a² + b² = c² where c is the hypotenuse (longest side)',
      'Hypotenuse is ALWAYS opposite the right angle (longest side)',
      'Finding hypotenuse: Square both sides, add them, then square root',
      'Finding shorter side: Square hypotenuse, subtract other side squared, then square root',
      'Always check: does the triangle have a right angle? If not, can\'t use Pythagoras!'
    ],
    
    explanation: `
**What is Pythagoras' Theorem?**

Pythagoras' Theorem tells us the relationship between the three sides of a RIGHT-ANGLED triangle.

**The Formula:**

**a² + b² = c²**

Where:
- **a** and **b** are the two shorter sides (legs)
- **c** is the hypotenuse (longest side)

**What is the Hypotenuse?**

The hypotenuse is:
- The LONGEST side of the triangle
- OPPOSITE the right angle (90°)
- The side you're finding if you know the other two

**Important:** Label the hypotenuse 'c' and the other sides 'a' and 'b'

**When Can You Use Pythagoras?**

✅ ONLY when the triangle has a RIGHT ANGLE (90°)
❌ Cannot use on triangles without a right angle

**Check for:** Right angle symbol (small square in corner)

**Three Types of Questions**

**Type 1: Finding the Hypotenuse (c)**

When you know both shorter sides, find the longest side

**Formula:** c² = a² + b²
Then: c = √(a² + b²)

**Method:**
1. Square both shorter sides
2. Add the squares
3. Take the square root

**Example:** Sides are 3 and 4, find hypotenuse
- Step 1: 3² = 9 and 4² = 16
- Step 2: 9 + 16 = 25
- Step 3: c = √25 = 5

**Type 2: Finding a Shorter Side**

When you know the hypotenuse and one other side

**Formula:** a² = c² - b²
Then: a = √(c² - b²)

**Method:**
1. Square the hypotenuse
2. Square the known side
3. Subtract (bigger - smaller)
4. Take the square root

**Example:** Hypotenuse is 13, one side is 5, find other side
- Step 1: 13² = 169
- Step 2: 5² = 25
- Step 3: 169 - 25 = 144
- Step 4: a = √144 = 12

**Step-by-Step Process**

**Finding the Hypotenuse:**

1. Check triangle has right angle ✓
2. Label: a and b are sides, c is hypotenuse
3. Square both sides: a² and b²
4. Add: a² + b²
5. Square root: c = √(a² + b²)
6. Round if necessary (1 or 2 d.p.)

**Finding a Shorter Side:**

1. Check triangle has right angle ✓
2. Label: c is hypotenuse, find a or b
3. Square the hypotenuse: c²
4. Square the known side: b²
5. Subtract: c² - b²
6. Square root: a = √(c² - b²)
7. Round if necessary

**Common Pythagorean Triples**

These are sets of three numbers that work in Pythagoras:

- **3, 4, 5** (most common!)
- **5, 12, 13**
- **8, 15, 17**
- **7, 24, 25**

**Example:** 3² + 4² = 5²
9 + 16 = 25 ✓

Knowing these helps you check answers!

**Using a Calculator**

Most calculators:
- Square: x² button
- Square root: √ button
- Or: ^ button for powers

**Example calculation:**
√(3² + 4²) 
= √(9 + 16)
= √25
= 5

**Check Your Answer**

Always check your answer makes sense:
- Hypotenuse should be LONGEST side
- All sides should be positive
- If sides are whole numbers, check if it's a Pythagorean triple

**Rounding**

Unless the question says otherwise:
- Give exact answer if it's a whole number
- Round to 1 or 2 decimal places if asked
- Or round to 3 significant figures

**Common Question Contexts**

Pythagoras appears in:
- Ladder against wall problems
- Diagonal of rectangle problems
- Height of shapes problems
- Real-world distance problems
`,
    
    examples: [
      {
        question: 'Find the hypotenuse when the two shorter sides are 6 cm and 8 cm',
        workingOut: `Step 1: Check it's a right-angled triangle ✓

Step 2: Label the sides
a = 6 cm
b = 8 cm
c = hypotenuse (what we're finding)

Step 3: Write Pythagoras' formula
a² + b² = c²

Step 4: Substitute the values
6² + 8² = c²

Step 5: Square each number
36 + 64 = c²

Step 6: Add
100 = c²

Step 7: Square root both sides
c = √100
c = 10 cm

Step 8: Check answer makes sense
10 is longer than 6 and 8 ✓
This is the 3-4-5 triple (scaled by 2: 6-8-10) ✓

Answer: 10 cm`,
        answer: '10 cm',
        explanation: 'Finding hypotenuse: square both sides (6²=36, 8²=64), add them (36+64=100), then square root (√100=10). The hypotenuse (10cm) must be the longest side ✓. This is actually the 3-4-5 Pythagorean triple, doubled! Always show each step clearly for method marks.'
      },
      {
        question: 'A right-angled triangle has hypotenuse 13 cm and one side 5 cm. Find the other side.',
        workingOut: `Step 1: Check it's right-angled ✓

Step 2: Label the sides
c = 13 cm (hypotenuse - longest)
b = 5 cm (known side)
a = ? (side we're finding)

Step 3: Use Pythagoras formula
a² + b² = c²

Step 4: Rearrange to find a
a² = c² - b²

Step 5: Substitute values
a² = 13² - 5²

Step 6: Calculate squares
a² = 169 - 25

Step 7: Subtract
a² = 144

Step 8: Square root
a = √144
a = 12 cm

Step 9: Check
5² + 12² = 25 + 144 = 169 = 13² ✓
This is the 5-12-13 Pythagorean triple!

Answer: 12 cm`,
        answer: '12 cm',
        explanation: 'Finding shorter side: square the hypotenuse (13²=169), square the known side (5²=25), subtract (169-25=144), then square root (√144=12). Check: 5²+12²=25+144=169=13² ✓. This is the famous 5-12-13 Pythagorean triple! When finding a shorter side, always SUBTRACT.'
      },
      {
        question: 'Find side x in a right-angled triangle with sides 9 cm and 12 cm, where x is the hypotenuse',
        workingOut: `Step 1: Identify the problem type
We're finding the hypotenuse (longest side)

Step 2: Label sides
a = 9 cm
b = 12 cm
c = x (hypotenuse)

Step 3: Apply Pythagoras
a² + b² = c²
9² + 12² = x²

Step 4: Calculate squares
81 + 144 = x²

Step 5: Add
225 = x²

Step 6: Square root
x = √225
x = 15 cm

Step 7: Verify
15 is longer than both 9 and 12 ✓
Check: 9² + 12² = 81 + 144 = 225 = 15² ✓
This is 3-4-5 triple times 3!

Answer: x = 15 cm`,
        answer: 'x = 15 cm',
        explanation: 'Hypotenuse is the longest side, opposite the right angle. Square the two shorter sides (9²=81, 12²=144), add (81+144=225), square root (√225=15). This is the 3-4-5 triple scaled by 3 (3×3=9, 4×3=12, 5×3=15). Recognizing triples helps you check your answer!'
      },
      {
        question: 'Calculate the length of side b, given hypotenuse c = 10 cm and side a = 6 cm (give answer to 1 d.p.)',
        workingOut: `Step 1: Identify what we're finding
Finding shorter side, know hypotenuse

Step 2: Label
c = 10 cm (hypotenuse)
a = 6 cm (known side)
b = ? (finding this)

Step 3: Use formula
a² + b² = c²
Rearrange: b² = c² - a²

Step 4: Substitute
b² = 10² - 6²

Step 5: Calculate
b² = 100 - 36
b² = 64

Step 6: Square root
b = √64
b = 8 cm

Step 7: Round to 1 d.p.
b = 8.0 cm (already exact)

Step 8: Check
6² + 8² = 36 + 64 = 100 = 10² ✓
This is 3-4-5 double (6-8-10)!

Answer: b = 8.0 cm`,
        answer: 'b = 8.0 cm',
        explanation: 'Use c² - a² to find other side: 10² - 6² = 100 - 36 = 64, so b = √64 = 8. Even though it\'s a whole number, question asks for 1 d.p., so write 8.0 cm. This is the 3-4-5 triple doubled (6-8-10). Always answer in the format requested!'
      },
      {
        question: 'A ladder 5 m long leans against a wall. The base is 3 m from the wall. How high up the wall does it reach?',
        workingOut: `Step 1: Visualize/sketch the problem
Ladder = hypotenuse (5 m)
Distance from wall = base (3 m)
Height up wall = what we're finding

Step 2: This forms a right-angled triangle ✓
Wall and ground meet at 90°

Step 3: Label
c = 5 m (ladder = hypotenuse)
a = 3 m (base)
b = ? (height up wall)

Step 4: Use Pythagoras
a² + b² = c²
Rearrange: b² = c² - a²

Step 5: Substitute
b² = 5² - 3²
b² = 25 - 9
b² = 16

Step 6: Square root
b = √16
b = 4 m

Step 7: Check - is this a Pythagorean triple?
3² + 4² = 9 + 16 = 25 = 5² ✓
Yes! 3-4-5 triple

Answer: 4 m up the wall`,
        answer: '4 m',
        explanation: 'Real-world problem! The ladder (5m) is the hypotenuse, base is 3m from wall, finding height. Use c² - a²: 5² - 3² = 25 - 9 = 16, so height = √16 = 4m. This is the classic 3-4-5 Pythagorean triple - very common in exams! Always sketch the problem to identify which side is which.'
      },
      {
        question: 'Find diagonal of rectangle: length 20cm, width 15cm (answer to 1 d.p.)',
        workingOut: `Rectangle diagonal creates two right-angled triangles!

Step 1: Sketch the rectangle
Label: length = 20 cm, width = 15 cm
Draw diagonal - this splits rectangle into 2 right triangles

Step 2: Identify the right triangle
The diagonal is the HYPOTENUSE
Length and width are the two shorter sides

Step 3: Label for Pythagoras
a = 20 cm (length)
b = 15 cm (width)
c = diagonal (hypotenuse - finding this)

Step 4: Apply Pythagoras
c² = a² + b²
c² = 20² + 15²

Step 5: Calculate squares
c² = 400 + 225
c² = 625

Step 6: Square root
c = √625
c = 25 cm

Step 7: Round to 1 d.p.
c = 25.0 cm (already exact)

Step 8: Check
Is 25 longer than 20 and 15? Yes ✓
Is this a Pythagorean triple?
20 = 4 × 5, 15 = 3 × 5, 25 = 5 × 5
This is 3-4-5 times 5! (15-20-25) ✓

Answer: 25.0 cm`,
        answer: '25.0 cm',
        explanation: 'Rectangle diagonals make right triangles! The diagonal is hypotenuse, length and width are shorter sides. Here: 20² + 15² = 400 + 225 = 625, so diagonal = √625 = 25cm. This is the 3-4-5 triple multiplied by 5 (15-20-25). Rectangle diagonal problems are very common - always draw a diagram! Worth 3-4 marks.'
      },
      {
        question: 'Find x to 2 d.p.: Right triangle with sides 7cm and 11cm, where 11cm is hypotenuse',
        workingOut: `Finding shorter side when answer isn't a whole number!

Step 1: Identify problem type
Hypotenuse = 11 cm (longest, given)
One side = 7 cm (given)
Other side = x (finding this)

Step 2: Label
c = 11 cm (hypotenuse)
a = 7 cm (known side)
b = x (finding)

Step 3: Use Pythagoras rearranged
a² + b² = c²
b² = c² - a²

Step 4: Substitute
x² = 11² - 7²
x² = 121 - 49
x² = 72

Step 5: Square root
x = √72
x = 8.485... (calculator shows more decimals)

Step 6: Round to 2 d.p.
Look at 3rd decimal: 8.485...
Third decimal is 5, so round UP
x = 8.49 cm (to 2 d.p.)

Step 7: CHECK - does it make sense?
7² + 8.49² ≈ 49 + 72.08 ≈ 121 ≈ 11² ✓
x (8.49) is less than hypotenuse (11) ✓
x is more than other side (7) ✓

Step 8: Calculator check
√72 = 8.485281374...
Rounded to 2 d.p. = 8.49 ✓

Important notes:
- √72 cannot be simplified to whole number
- MUST use calculator
- Follow rounding instruction carefully
- Keep more decimals in working, round at end`,
        answer: 'x = 8.49 cm',
        explanation: 'Not all Pythagoras answers are neat! Use c² - a²: 11² - 7² = 121 - 49 = 72, so x = √72 = 8.485... = 8.49cm (2 d.p.). Always use calculator for √72, keep extra decimals while working, round only at the end. Check: 7² + 8.49² ≈ 121 ≈ 11² ✓. Non-integer answers worth 3-4 marks - rounding correctly is essential!'
      },
      {
        question: 'Isosceles triangle: Two equal sides are 10cm each, base is 12cm. Find the height (perpendicular from apex to base).',
        workingOut: `Isosceles triangle height creates TWO right triangles!

Step 1: Sketch the isosceles triangle
Two equal sides = 10 cm each
Base = 12 cm
Height splits base in HALF

Step 2: Understand the geometry
Height from apex to base creates right angle
Height splits base: 12 ÷ 2 = 6 cm each side
This creates TWO identical right triangles

Step 3: Focus on ONE right triangle
Hypotenuse = 10 cm (slant side)
Base = 6 cm (half of 12 cm)
Height = h (what we're finding)

Step 4: Apply Pythagoras
h² + 6² = 10²
h² + 36 = 100

Step 5: Rearrange
h² = 100 - 36
h² = 64

Step 6: Square root
h = √64
h = 8 cm

Step 7: Verify
6² + 8² = 36 + 64 = 100 = 10² ✓
This is 3-4-5 doubled (6-8-10)!

Step 8: Does answer make sense?
Height (8 cm) is less than slant side (10 cm) ✓
Creates realistic triangle shape ✓

DIAGRAM:
       /\\
      /  \\  10cm
   10/    \\
    /  h   \\
   /________\\
      12cm
   |← 6 →|← 6 →|

Height h = 8 cm`,
        answer: 'Height = 8 cm',
        explanation: 'Isosceles triangle: height to base creates 2 right triangles! Height splits 12cm base into two 6cm parts. Now use Pythagoras: 10² - 6² = 100 - 36 = 64, so h = √64 = 8cm. This is the 3-4-5 triple doubled (6-8-10)! Isosceles+Pythagoras questions are Grade 5 level, worth 4-5 marks. Always draw the height line to see the right triangles!'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Find hypotenuse when sides are 3 cm and 4 cm',
        options: ['5 cm', '7 cm', '25 cm', '12 cm'],
        answer: '5 cm',
        explanation: '3² + 4² = 9 + 16 = 25. √25 = 5 cm. This is the famous 3-4-5 Pythagorean triple!',
        difficulty: 'easy'
      },
      {
        question: 'Hypotenuse is 10 cm, one side is 6 cm. Find the other side.',
        options: ['8 cm', '4 cm', '16 cm', '136 cm'],
        answer: '8 cm',
        explanation: '10² - 6² = 100 - 36 = 64. √64 = 8 cm. This is 3-4-5 doubled (6-8-10)!',
        difficulty: 'medium'
      },
      {
        question: 'Which is the hypotenuse in a right-angled triangle?',
        options: ['Longest side', 'Shortest side', 'Any side', 'Side opposite smallest angle'],
        answer: 'Longest side',
        explanation: 'Hypotenuse is ALWAYS the longest side, opposite the right angle.',
        difficulty: 'easy'
      },
      {
        question: 'Find c when a = 5 cm and b = 12 cm',
        options: ['13 cm', '17 cm', '7 cm', '169 cm'],
        answer: '13 cm',
        explanation: '5² + 12² = 25 + 144 = 169. √169 = 13 cm. This is the 5-12-13 triple!',
        difficulty: 'medium'
      },
      {
        question: 'Can you use Pythagoras on a triangle without a right angle?',
        options: ['No', 'Yes', 'Sometimes', 'Only if isosceles'],
        answer: 'No',
        explanation: 'Pythagoras ONLY works on RIGHT-ANGLED triangles. Must have a 90° angle!',
        difficulty: 'easy'
      },
      {
        question: 'Find the missing side: hypotenuse 13 m, known side 12 m',
        options: ['5 m', '1 m', '25 m', '144 m'],
        answer: '5 m',
        explanation: '13² - 12² = 169 - 144 = 25. √25 = 5 m. This is 5-12-13 triple!',
        difficulty: 'medium'
      },
      {
        question: 'Sides are 8 cm and 15 cm. Find hypotenuse.',
        options: ['17 cm', '23 cm', '7 cm', '289 cm'],
        answer: '17 cm',
        explanation: '8² + 15² = 64 + 225 = 289. √289 = 17 cm. This is the 8-15-17 triple!',
        difficulty: 'medium'
      },
      {
        question: 'Which formula finds a shorter side?',
        options: ['a² = c² - b²', 'c² = a² + b²', 'a² = b² + c²', 'c = a + b'],
        answer: 'a² = c² - b²',
        explanation: 'To find shorter side, SUBTRACT: square hypotenuse minus square of known side.',
        difficulty: 'medium'
      },
      {
        question: 'Calculate hypotenuse (to 1 d.p.): sides 7 cm and 9 cm',
        options: ['11.4 cm', '16.0 cm', '130 cm', '4.2 cm'],
        answer: '11.4 cm',
        explanation: '7² + 9² = 49 + 81 = 130. √130 = 11.401... = 11.4 cm (to 1 d.p.)',
        difficulty: 'hard'
      },
      {
        question: 'Ladder 13 m long, base 5 m from wall. Height reached?',
        options: ['12 m', '8 m', '18 m', '144 m'],
        answer: '12 m',
        explanation: 'Ladder = hypotenuse (13 m). Base = 5 m. Height: 13² - 5² = 169 - 25 = 144. √144 = 12 m. The 5-12-13 triple!',
        difficulty: 'hard'
      }
    ],
    
    tips: [
      '⭐ ALWAYS check the triangle has a right angle before using Pythagoras!',
      '⭐ Hypotenuse is ALWAYS the longest side (opposite the right angle)',
      '⭐ Finding hypotenuse: Square both sides, ADD, then square root',
      '⭐ Finding shorter side: Square hypotenuse, SUBTRACT other squared, then square root',
      '⭐ Show ALL steps clearly - method marks available even if final answer wrong',
      '⭐ Learn the common triples: 3-4-5, 5-12-13, 8-15-17',
      '⭐ Check your answer: hypotenuse should be longest!',
      '⭐ Use calculator correctly: brackets for √(a² + b²)'
    ],
    
    commonMistakes: [
      '❌ Using Pythagoras on triangles without a right angle',
      '❌ Forgetting to square root at the end (leaving answer as 25 instead of 5)',
      '❌ Adding when should subtract (finding shorter side)',
      '❌ Subtracting when should add (finding hypotenuse)',
      '❌ Identifying wrong side as hypotenuse (must be longest!)',
      '❌ Not showing working (lose method marks)',
      '❌ Calculator errors: not using brackets correctly',
      '❌ Rounding too early (round only at final answer)',
      '❌ Wrong units or forgetting units entirely'
    ],
    
    examStrategy: `
**Question Recognition:**

Look for:
- Right-angled triangle (square symbol in corner)
- Two sides given, find third
- "Calculate the length"
- Real-world context (ladder, diagonal, etc.)

**Worth:** 3-4 marks per question

**Method Steps to Show:**

**Finding Hypotenuse:**
1. State: "Using Pythagoras: a² + b² = c²"
2. Substitute: "3² + 4² = c²"
3. Calculate squares: "9 + 16 = c²"
4. Add: "25 = c²"
5. Square root: "c = √25 = 5 cm"

**Finding Shorter Side:**
1. State: "Using Pythagoras: a² + b² = c²"
2. Rearrange: "a² = c² - b²"
3. Substitute: "a² = 13² - 5²"
4. Calculate: "a² = 169 - 25 = 144"
5. Square root: "a = √144 = 12 cm"

**Method Marks Available:**
- Using correct formula: 1 mark
- Correct substitution: 1 mark
- Correct calculation: 1 mark
- Final answer with units: 1 mark

Can get 3/4 even with wrong final answer if method shown!

**Calculator Strategy:**

For √(3² + 4²):
- Press: √ ( 3 x² + 4 x² ) =
- Must use brackets!
- Check: answer should be ≈ 5

For complex calculations:
- Write working first
- Then use calculator
- Show what you calculated

**Checking Your Answer:**

1. **Is hypotenuse longest?** 
   If finding c, check c > a and c > b

2. **Does it look reasonable?**
   If sides are 3 and 4, hypotenuse should be around 5

3. **Is it a Pythagorean triple?**
   Check: 3-4-5, 5-12-13, 8-15-17, or multiples

4. **Substitute back:**
   Check: a² + b² = c²
   Example: 3² + 4² = 9 + 16 = 25 = 5² ✓

**Rounding:**

- Exact answers: leave as whole numbers (5 cm not 5.0)
- If asked for decimals: round to stated accuracy
- If not stated: usually 1 d.p. or 3 s.f.
- Never round in middle of calculation!

**Common Exam Contexts:**

1. **Ladder problems** (ladder = hypotenuse)
2. **Diagonal of rectangle** (diagonal = hypotenuse)
3. **Height of shapes** (often finding height)
4. **Distance problems** (between two points)

**Time Management:**

- Simple Pythagoras: 3-4 minutes
- With context/diagram: 4-5 minutes
- Show working even if confident

**Grade 5 Requirements:**

Must be confident with:
✓ Finding hypotenuse (most common)
✓ Finding shorter side (less common but important)
✓ Recognizing right-angled triangles
✓ Using calculator correctly (brackets!)
✓ Rounding appropriately
✓ Real-world applications

**Top Scoring Strategy:**

1. **Always write the formula first** a² + b² = c²
2. **Show substitution clearly** 3² + 4² = c²
3. **Show each calculation** 9 + 16 = 25
4. **Show square root** c = √25 = 5
5. **Include units** 5 cm

Every step shown = potential method mark!

**Memory Aid:**

**"SHARP"** for Pythagoras
- **S**quare the sides
- **H**ypotenuse is longest
- **A**dd for hypotenuse
- **R**emove (subtract) for shorter side  
- **P**ut square root at end

**Practice Priority:**

This is worth 3-4 marks per paper - appears EVERY time!

Focus on:
1. Basic 3-4-5 type (most common)
2. Calculator use (brackets!)
3. Real-world contexts (ladder, diagonal)
4. Finding shorter sides (less common, higher grade)

Master Pythagoras = guaranteed 3-4 marks per paper!
`
  },

  // ==================== MODULE 10: BASIC TRIGONOMETRY ====================
  {
    moduleNumber: 10,
    title: 'Basic Trigonometry (SOH CAH TOA)',
    duration: '75 minutes',
    introduction: 'Master trigonometry basics - use sin, cos, and tan to find sides and angles in right-angled triangles. SOH CAH TOA is your key to success! This Grade 5 topic appears regularly in Foundation papers and is essential for higher grades.',
    
    keyPoints: [
      'Trigonometry ONLY works for RIGHT-ANGLED triangles (like Pythagoras)',
      'SOH CAH TOA: sin = Opposite/Hypotenuse, cos = Adjacent/Hypotenuse, tan = Opposite/Adjacent',
      'Label the triangle: O = opposite the angle, A = adjacent to the angle, H = hypotenuse',
      'Finding a side: Use SOH CAH TOA, rearrange to find the side',
      'Finding an angle: Use inverse (sin⁻¹, cos⁻¹, tan⁻¹) on calculator',
      'ALWAYS check calculator is in DEGREES mode (not radians)!'
    ],
    
    explanation: `
**What is Trigonometry?**

Trigonometry helps us find missing sides and angles in RIGHT-ANGLED triangles using the three functions: sin, cos, and tan.

**SOH CAH TOA - The Key!**

This memory aid tells us which ratios to use:

**SOH:** sin(θ) = Opposite / Hypotenuse
**CAH:** cos(θ) = Adjacent / Hypotenuse  
**TOA:** tan(θ) = Opposite / Adjacent

Where θ (theta) is the angle we're working with.

**Labelling the Triangle**

This is THE MOST IMPORTANT step!

1. Find the right angle (90°)
2. Find the angle you're using (mark it θ)
3. Label the sides:

**H** = Hypotenuse (longest side, opposite right angle)
**O** = Opposite (side opposite your angle θ)
**A** = Adjacent (side next to your angle θ, not the hypotenuse)

**Example:** If angle θ is in bottom left corner:
- Side opposite θ = O
- Side next to θ (not hypotenuse) = A
- Longest side (opposite right angle) = H

**Which Function to Use?**

**Step 1:** Label triangle (H, O, A)
**Step 2:** See which two sides you have/need
**Step 3:** Choose function:

- Have O and H? Use **sin** (SOH)
- Have A and H? Use **cos** (CAH)
- Have O and A? Use **tan** (TOA)

**Finding a Side**

**Method:**
1. Label triangle (H, O, A) based on the angle
2. Identify which ratio to use (SOH CAH TOA)
3. Write the equation
4. Rearrange to find the unknown side
5. Calculate using calculator

**Example:** Find x (opposite) when angle = 30°, hypotenuse = 10

Have: H and angle
Need: O
Use: **SOH** (sin = O/H)

sin(30°) = x/10
x = 10 × sin(30°)
x = 10 × 0.5
x = 5

**Finding an Angle**

**Method:**
1. Label triangle (H, O, A)
2. Identify which two sides you know
3. Choose ratio (SOH CAH TOA)
4. Write equation
5. Use inverse function (sin⁻¹, cos⁻¹, tan⁻¹)

**Example:** Find angle θ when opposite = 3, hypotenuse = 5

Have: O and H
Use: **SOH** (sin = O/H)

sin(θ) = 3/5
θ = sin⁻¹(3/5)
θ = sin⁻¹(0.6)
θ = 36.87° (to 2 d.p.)

**Using Your Calculator**

**Finding a Side:**
- Use normal sin, cos, tan buttons
- Make sure in DEGREES mode!
- Example: sin(30) = 0.5

**Finding an Angle:**
- Use SHIFT/2nd/INV then sin/cos/tan
- This gives sin⁻¹, cos⁻¹, tan⁻¹
- Example: sin⁻¹(0.5) = 30°

**CRITICAL:** Check calculator is in degrees!
- Look for "D" or "DEG" on display
- If showing "R" or "RAD", change to degrees

**Rearranging Formulas**

**If finding OPPOSITE:**
- sin(θ) = O/H → O = H × sin(θ)
- tan(θ) = O/A → O = A × tan(θ)

**If finding ADJACENT:**
- cos(θ) = A/H → A = H × cos(θ)
- tan(θ) = O/A → A = O ÷ tan(θ)

**If finding HYPOTENUSE:**
- sin(θ) = O/H → H = O ÷ sin(θ)
- cos(θ) = A/H → H = A ÷ cos(θ)

**Common Angles**

It helps to know these:
- sin(30°) = 0.5
- cos(60°) = 0.5  
- tan(45°) = 1
- sin(90°) = 1
- cos(0°) = 1

**Pythagoras vs Trigonometry**

**Use Pythagoras when:**
- You have 2 sides, need 3rd side
- NO angle given

**Use Trigonometry when:**
- You have an angle and a side
- OR need to find an angle

**Memory Aids**

**SOH CAH TOA:**
- **S**ome **O**ld **H**ippie
- **C**aught **A**nother **H**ippie
- **T**ripping **O**n **A**cid

Or simply: **SOH CAH TOA** (so-ca-toe-a)

**Labelling Aid:**
**"The OPPOSITE is across from the angle"**
**"The ADJACENT is next to the angle"**
**"The HYPOTENUSE is always longest"**
`,
    
    examples: [
      {
        question: 'Find side x (opposite) when angle = 40°, hypotenuse = 12 cm',
        workingOut: `Step 1: Check it's right-angled ✓

Step 2: Label the triangle based on the 40° angle
- x is opposite the 40° angle → O
- 12 cm is the hypotenuse → H
- We're not using the adjacent

Step 3: Identify which sides we have/need
Have: H (12) and angle (40°)
Need: O (x)

Step 4: Choose the right ratio from SOH CAH TOA
O and H → use SOH
sin = Opposite/Hypotenuse

Step 5: Write the equation
sin(40°) = x/12

Step 6: Rearrange to find x
x = 12 × sin(40°)

Step 7: Calculate (make sure calculator in DEGREES!)
x = 12 × 0.6428
x = 7.713...
x = 7.7 cm (to 1 d.p.)

Step 8: Check answer makes sense
x (7.7) < hypotenuse (12) ✓

Answer: x = 7.7 cm`,
        answer: 'x = 7.7 cm',
        explanation: 'Label triangle first! x is opposite the angle (O), 12 is hypotenuse (H). Have O and H → use SOH (sin = O/H). Write: sin(40°) = x/12. Rearrange: x = 12 × sin(40°) = 7.7 cm. ALWAYS label triangle before choosing formula! Check calculator in DEGREES mode.'
      },
      {
        question: 'Find the angle θ when opposite = 5 cm and adjacent = 8 cm',
        workingOut: `Step 1: Right-angled triangle ✓

Step 2: Label the sides
Opposite = 5 cm → O
Adjacent = 8 cm → A
(Not using hypotenuse)

Step 3: Identify which sides we have
Have: O and A

Step 4: Choose ratio
O and A → use TOA
tan = Opposite/Adjacent

Step 5: Write equation
tan(θ) = 5/8

Step 6: Calculate the ratio
tan(θ) = 0.625

Step 7: Use inverse tan to find angle
θ = tan⁻¹(0.625)

Step 8: Calculate (SHIFT + tan on calculator)
θ = 32.005...°
θ = 32.0° (to 1 d.p.)

Step 9: Check
Angle between 0° and 90° ✓
Makes sense for these sides ✓

Answer: θ = 32.0°`,
        answer: 'θ = 32.0°',
        explanation: 'Finding an angle! Have opposite (5) and adjacent (8) → use TOA (tan = O/A). Write: tan(θ) = 5/8 = 0.625. Then use inverse: θ = tan⁻¹(0.625) = 32.0°. On calculator: 5 ÷ 8 = then SHIFT tan (for tan⁻¹). Answer is the angle in degrees.'
      },
      {
        question: 'A ladder makes an angle of 65° with the ground. The ladder is 4 m long. How high up the wall does it reach?',
        workingOut: `Step 1: Sketch the problem
Ladder against wall forms right-angled triangle
- Ground and wall meet at 90°
- Angle at ground = 65°
- Ladder length = 4 m (hypotenuse)
- Height up wall = ?

Step 2: Label from angle at ground (65°)
- Ladder = 4 m = H (hypotenuse)
- Height up wall = O (opposite the 65° angle)
- Ground distance = A (not needed)

Step 3: Identify what we have
Have: H (4) and angle (65°)
Need: O (height)

Step 4: Choose ratio
O and H → SOH
sin = O/H

Step 5: Write equation
sin(65°) = height/4

Step 6: Rearrange
height = 4 × sin(65°)

Step 7: Calculate
height = 4 × 0.9063
height = 3.625...
height = 3.6 m (to 1 d.p.)

Answer: 3.6 m up the wall`,
        answer: '3.6 m',
        explanation: 'Real-world problem! Ladder (4m) is hypotenuse. Height up wall is opposite the 65° angle. Have H and angle, need O → use SOH. Write: sin(65°) = h/4. Rearrange: h = 4 × sin(65°) = 3.6 m. Always sketch real-world problems to identify O, A, H!'
      },
      {
        question: 'Find the angle of elevation when a 10 m ladder reaches 8 m up a wall',
        workingOut: `Step 1: Understand the setup
Angle of elevation = angle ladder makes with ground
Ladder = 10 m (hypotenuse)
Height = 8 m (opposite the angle we want)

Step 2: Label the triangle
H = 10 m (ladder/hypotenuse)
O = 8 m (height/opposite angle)
A = ground distance (not given/needed)

Step 3: Identify what we have
Have: O (8) and H (10)

Step 4: Choose ratio
O and H → SOH
sin = O/H

Step 5: Write equation
sin(θ) = 8/10

Step 6: Simplify
sin(θ) = 0.8

Step 7: Use inverse sin
θ = sin⁻¹(0.8)

Step 8: Calculate
θ = 53.13...°
θ = 53.1° (to 1 d.p.)

Check: Reasonable angle ✓

Answer: 53.1°`,
        answer: '53.1°',
        explanation: 'Angle of elevation = angle from ground. Have opposite (8m height) and hypotenuse (10m ladder) → use SOH. Write: sin(θ) = 8/10 = 0.8. Then: θ = sin⁻¹(0.8) = 53.1°. For angles, use inverse (SHIFT + sin/cos/tan on calculator).'
      },
      {
        question: 'Find side a (adjacent) when angle = 35°, hypotenuse = 15 cm',
        workingOut: `Step 1: Right-angled triangle ✓

Step 2: Label from 35° angle
a = adjacent to angle = A
15 cm = hypotenuse = H

Step 3: What do we have/need?
Have: H (15) and angle (35°)
Need: A (a)

Step 4: Choose ratio
A and H → CAH
cos = Adjacent/Hypotenuse

Step 5: Write equation
cos(35°) = a/15

Step 6: Rearrange
a = 15 × cos(35°)

Step 7: Calculate
a = 15 × 0.8192
a = 12.287...
a = 12.3 cm (to 1 d.p.)

Step 8: Check
a (12.3) < hypotenuse (15) ✓

Answer: a = 12.3 cm`,
        answer: 'a = 12.3 cm',
        explanation: 'Need adjacent (a), have hypotenuse (15) and angle (35°) → use CAH (cos = A/H). Write: cos(35°) = a/15. Rearrange: a = 15 × cos(35°) = 12.3 cm. CAH is for when you have Adjacent and Hypotenuse!'
      },
      {
        question: 'Find angle x when opposite=7cm, adjacent=9cm',
        workingOut: `Finding angle using inverse trig - essential Grade 5 skill!

Step 1: Which ratio to use?
Have: Opposite and Adjacent
Use: TOA (tan = O/A)

Step 2: Write equation
tan(x) = O/A = 7/9

Step 3: Calculate the fraction
tan(x) = 0.7778

Step 4: Use inverse tan to find angle
x = tan⁻¹(0.7778)
(Press SHIFT then TAN, then enter 0.7778)

Step 5: Calculate
x = 37.9° (to 1 d.p.)

Answer: x = 37.9°`,
        answer: 'x = 37.9°',
        explanation: 'Finding angle: use inverse! O/A → tan⁻¹(7/9) = 37.9°. Remember: SHIFT+TAN for tan⁻¹!'
      },
      {
        question: 'Real-world: Tree casts 12m shadow, angle of elevation to sun is 42°. Find tree height.',
        workingOut: `Step 1: Draw diagram - right triangle
Shadow = adjacent = 12m
Height = opposite = h
Angle = 42°

Step 2: Use TOA
tan(42°) = h/12

Step 3: Solve
h = 12 × tan(42°) = 10.8m

Answer: 10.8m`,
        answer: '10.8m',
        explanation: 'Shadow problems use tan! Height/shadow = tan(angle). h = 12×tan(42°) = 10.8m.'
      },
      {
        question: 'Ladder problem: 8m ladder at 65° to ground. How high up wall?',
        workingOut: `Step 1: Identify triangle parts
Ladder = hypotenuse = 8m
Height = opposite = h
Angle = 65°

Step 2: Use SOH
sin(65°) = h/8

Step 3: Solve
h = 8 × sin(65°) = 7.25m

Answer: 7.25m`,
        answer: '7.25m',
        explanation: 'Ladder = hypotenuse, height = opposite → SOH! h = 8×sin(65°) = 7.25m.'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Which ratio uses Opposite and Hypotenuse?',
        options: ['sin', 'cos', 'tan', 'All of them'],
        answer: 'sin',
        explanation: 'SOH: sin = Opposite/Hypotenuse. Remember SOH CAH TOA!',
        difficulty: 'easy'
      },
      {
        question: 'What does TOA stand for in SOH CAH TOA?',
        options: ['tan = O/A', 'tan = A/O', 'tan = O/H', 'tan = H/A'],
        answer: 'tan = O/A',
        explanation: 'TOA: tan = Opposite/Adjacent. Tan uses the two sides that are NOT the hypotenuse.',
        difficulty: 'easy'
      },
      {
        question: 'If sin(30°) = 0.5, what is the opposite side when hypotenuse = 10?',
        options: ['5', '10', '20', '0.5'],
        answer: '5',
        explanation: 'sin = O/H, so 0.5 = O/10. Therefore O = 10 × 0.5 = 5.',
        difficulty: 'medium'
      },
      {
        question: 'To find an angle, you need to use:',
        options: ['Inverse function (sin⁻¹)', 'Normal sin/cos/tan', 'Pythagoras', 'BIDMAS'],
        answer: 'Inverse function (sin⁻¹)',
        explanation: 'To find angles, use inverse: sin⁻¹, cos⁻¹, or tan⁻¹ (SHIFT + trig button).',
        difficulty: 'medium'
      },
      {
        question: 'Calculator shows "R" mode. What should you do?',
        options: ['Change to DEG (degrees)', 'Nothing, it\'s fine', 'Turn it off', 'Clear it'],
        answer: 'Change to DEG (degrees)',
        explanation: 'R = Radians mode (wrong!). Change to D/DEG for degrees. Radians gives wrong answers!',
        difficulty: 'medium'
      },
      {
        question: 'Find x: sin(45°) = x/8. What is x?',
        options: ['5.66', '8', '11.3', '4'],
        answer: '5.66',
        explanation: 'x = 8 × sin(45°) = 8 × 0.707... = 5.66 (to 2 d.p.)',
        difficulty: 'medium'
      },
      {
        question: 'Have opposite = 6, adjacent = 8. Find angle using:',
        options: ['tan⁻¹(6/8)', 'sin⁻¹(6/8)', 'cos⁻¹(6/8)', '6/8'],
        answer: 'tan⁻¹(6/8)',
        explanation: 'O and A → use tan. So tan(θ) = 6/8. Then θ = tan⁻¹(6/8).',
        difficulty: 'hard'
      },
      {
        question: 'Which is the OPPOSITE side for angle θ in the bottom left corner?',
        options: ['Side across from θ', 'Side next to θ', 'Longest side', 'Bottom side'],
        answer: 'Side across from θ',
        explanation: 'OPPOSITE is ACROSS from the angle (opposite = across).',
        difficulty: 'easy'
      },
      {
        question: 'cos(θ) = 0.6, hypotenuse = 12. Find adjacent.',
        options: ['7.2', '12', '20', '6'],
        answer: '7.2',
        explanation: 'cos = A/H, so 0.6 = A/12. Therefore A = 12 × 0.6 = 7.2.',
        difficulty: 'medium'
      },
      {
        question: 'Can you use trigonometry on a triangle without a right angle?',
        options: ['No (need right angle!)', 'Yes', 'Sometimes', 'Only for angles'],
        answer: 'No (need right angle!)',
        explanation: 'Basic trig (SOH CAH TOA) ONLY works for RIGHT-ANGLED triangles!',
        difficulty: 'easy'
      }
    ],
    
    tips: [
      '⭐ ALWAYS label triangle (H, O, A) based on the angle you\'re using',
      '⭐ Learn SOH CAH TOA - say it out loud until automatic!',
      '⭐ Check calculator is in DEGREES (look for D or DEG)',
      '⭐ Finding side: use sin/cos/tan normally',
      '⭐ Finding angle: use inverse (SHIFT + sin/cos/tan)',
      '⭐ Show ALL working - method marks available!',
      '⭐ Opposite is ACROSS from angle, Adjacent is NEXT TO angle',
      '⭐ If answer seems wrong, check calculator mode first!'
    ],
    
    commonMistakes: [
      '❌ Not labelling triangle before starting (leads to wrong ratio!)',
      '❌ Calculator in radians mode instead of degrees',
      '❌ Using wrong ratio (mixing up O, A, H)',
      '❌ Forgetting to use inverse when finding angle',
      '❌ Rearranging formula incorrectly',
      '❌ Not showing working (lose method marks)',
      '❌ Using trigonometry on non-right-angled triangles',
      '❌ Confusing which side is opposite vs adjacent',
      '❌ Dividing when should multiply (or vice versa)'
    ],
    
    examStrategy: `
**Step-by-Step Method (USE EVERY TIME!):**

1. **Check** - Right-angled triangle? ✓
2. **Label** - Mark H, O, A (from the angle given)
3. **Choose** - Which ratio? (SOH CAH TOA)
4. **Write** - Write the equation
5. **Rearrange** - Solve for unknown
6. **Calculate** - Use calculator (check DEG mode!)
7. **Check** - Does answer make sense?

**Finding a Side:**

Template to show:
"Using SOH CAH TOA
sin(40°) = x/12
x = 12 × sin(40°)
x = 7.7 cm"

**Finding an Angle:**

Template to show:
"Using SOH CAH TOA
tan(θ) = 5/8
θ = tan⁻¹(5/8)
θ = 32.0°"

**Mark Allocation:**

Typical 3-4 marks:
- Choosing correct ratio: 1 mark
- Correct equation: 1 mark
- Correct rearrangement: 1 mark
- Correct answer with units: 1 mark

**Calculator Guide:**

**Finding a Side:**
1. Calculate the trig ratio: sin(40) =
2. Multiply by other number
3. Example: 12 × sin(40) = 7.7

**Finding an Angle:**
1. Calculate the fraction: 5 ÷ 8 =
2. Press SHIFT/2nd then sin/cos/tan
3. Example: SHIFT tan (for tan⁻¹) → answer in degrees

**Checking Calculator Mode:**

Most calculators:
- Press MODE or SETUP
- Select DEGREES/DEG (not RAD!)
- Display should show "D" or "DEG"

**Common Exam Contexts:**

1. **Ladders against walls**
2. **Ramps/slopes**
3. **Angle of elevation** (looking up)
4. **Angle of depression** (looking down)
5. **Height of buildings/trees**

**Time Management:**

- Simple trig question: 3-4 minutes
- With real-world context: 4-5 minutes
- If stuck after 5 mins, move on!

**Grade 5 Requirements:**

Must master:
✓ All three ratios (sin, cos, tan)
✓ Finding sides and angles
✓ Labelling triangles correctly
✓ Using calculator (degrees mode!)
✓ Inverse functions for angles
✓ Real-world applications

**When to Use What:**

**Pythagoras:** Have 2 sides, find 3rd, NO angle
**Trigonometry:** Have angle + side, OR finding angle

**Top Exam Tips:**

1. **Label FIRST** - most important step!
2. **State which ratio** - "Using sin = O/H"
3. **Show rearrangement** - even if obvious
4. **Check mode** - DEGREES not radians
5. **Include units** - cm, m, etc.

**Memory Technique:**

**"Some Old Horses Came A-Hopping Through Our Alley"**
**S**in **O**pposite/**H**ypotenuse
**C**os **A**djacent/**H**ypotenuse  
**T**an **O**pposite/**A**djacent

Or stick with: **SOH CAH TOA** (so-ka-toe-a)

**Practice Priority:**

This topic is worth 3-4 marks per paper for Foundation (Grade 4-5 skill)

Focus on:
1. Sin ratio (most common)
2. Finding sides (easier than angles)
3. Labelling correctly (prevents all errors!)
4. Calculator use (practice with yours!)

**Final Check:**

Before submitting answer:
✅ Calculator in degrees?
✅ Labeled triangle?
✅ Used correct ratio?
✅ Answer reasonable? (not bigger than hypotenuse?)
✅ Units included?

Master SOH CAH TOA = unlock Grade 5!
`
  },

  // ==================== MODULE 11: TRANSFORMATIONS ====================
  {
    moduleNumber: 11,
    title: 'Transformations (Translation, Reflection, Rotation)',
    duration: '70 minutes',
    introduction: 'Learn to describe and perform transformations on shapes. Master translation (sliding), reflection (flipping), rotation (turning), and enlargement (scaling). Transformations appear in every Foundation paper - worth 8-12 marks!',
    
    keyPoints: [
      'Translation: Slide a shape using a vector (x, y) - right/left, up/down',
      'Reflection: Flip a shape over a mirror line (line of symmetry)',
      'Rotation: Turn a shape around a point - need angle, direction, and center',
      'Enlargement: Scale a shape bigger/smaller from a center - need scale factor',
      'Always give FULL description - missing details = lose marks!',
      'Use tracing paper to help with reflections and rotations'
    ],
    
    explanation: `
**What are Transformations?**

Transformations move or change shapes on a coordinate grid.

There are 4 types:
1. **Translation** - slide
2. **Reflection** - flip  
3. **Rotation** - turn
4. **Enlargement** - resize

**1. TRANSLATION (Sliding)**

Move every point the same distance in the same direction.

**Described by a VECTOR:** (x)
                            (y)

Where:
- **x** = horizontal movement (right +, left -)
- **y** = vertical movement (up +, down -)

**Example:** Vector (3)
                    (2)

Means: Move 3 right, 2 up

**Example:** Vector (-4)
                    (1)

Means: Move 4 left, 1 up

**To describe a translation:**
1. Pick any point on original shape
2. Find corresponding point on translated shape
3. Count: horizontal movement, vertical movement
4. Write as vector

**Example:** Point (1, 2) moves to (4, 5)
Horizontal: 4 - 1 = 3 (right)
Vertical: 5 - 2 = 3 (up)
Vector: (3)
        (3)

**2. REFLECTION (Flipping)**

Flip a shape over a mirror line.

**Common mirror lines:**
- **x-axis** (y = 0)
- **y-axis** (x = 0)
- **y = x** (diagonal line)
- **y = -x** (opposite diagonal)
- **y = number** (horizontal line)
- **x = number** (vertical line)

**To describe a reflection:**

State: "Reflection in the line ____"

Examples:
- "Reflection in the x-axis"
- "Reflection in the line x = 2"
- "Reflection in the line y = x"

**Key Rule:** Each point is the SAME DISTANCE from the mirror line on both sides.

**How to reflect:**
1. Draw the mirror line
2. For each point, count squares to mirror line
3. Go same number of squares on other side
4. Mark reflected point

**Use tracing paper:** Trace shape, flip paper over line!

**3. ROTATION (Turning)**

Turn a shape around a fixed point.

**MUST give THREE things:**
1. **Angle** (usually 90°, 180°, 270°)
2. **Direction** (clockwise or anticlockwise)
3. **Center of rotation** (coordinates)

**Example full description:**
"Rotation 90° clockwise about point (0, 0)"

**Common centers:**
- Origin (0, 0)
- Center of shape
- Corner of shape
- Any given point

**How to rotate:**
1. Mark center of rotation
2. Use tracing paper:
   - Trace shape
   - Pin at center
   - Turn by angle
   - Mark new position

**Special case: 180° rotation**
- Don't need to say direction (same both ways!)
- Just: "Rotation 180° about (0, 0)"

**4. ENLARGEMENT (Resizing)**

Make a shape bigger or smaller from a center point.

**MUST give TWO things:**
1. **Scale factor** (how many times bigger/smaller)
2. **Center of enlargement** (coordinates)

**Example:**
"Enlargement scale factor 2, center (0, 0)"

**Scale factors:**
- **> 1**: Shape gets bigger (e.g., SF 2 = double size)
- **= 1**: Same size (no change)
- **< 1**: Shape gets smaller (e.g., SF 0.5 = half size)
- **Negative**: Shape on opposite side of center

**How to enlarge:**
1. Draw rays from center through each vertex
2. Multiply distances by scale factor
3. Mark new positions
4. Join points

**Finding the Center:**
Draw lines connecting corresponding points.
Where lines meet = center of enlargement.

**Describing Transformations - Checklist**

**Translation:**
✓ Vector in form (x)
                  (y)

**Reflection:**
✓ "Reflection in..."
✓ State the mirror line equation

**Rotation:**
✓ Angle (90°, 180°, 270°)
✓ Direction (clockwise/anticlockwise)
✓ Center point (coordinates)

**Enlargement:**
✓ Scale factor (number)
✓ Center of enlargement (coordinates)

**Common Mistakes to Avoid:**

❌ Just saying "translation" - need vector!
❌ Just saying "reflection" - need mirror line!
❌ Just saying "rotation 90°" - need direction AND center!
❌ Just saying "enlargement" - need scale factor AND center!

**Using Tracing Paper:**

Allowed in exams! Very helpful for:
- Reflections (flip over line)
- Rotations (pin and turn)
- Checking transformations

**Combining Transformations:**

Sometimes asked to do two transformations:
- Do them in order given
- Final position after both applied
`,
    
    examples: [
      {
        question: 'Describe the translation from point (2, 3) to point (5, 7)',
        workingOut: `Step 1: Find horizontal movement
New x - old x = 5 - 2 = 3 (moved 3 right)

Step 2: Find vertical movement  
New y - old y = 7 - 3 = 4 (moved 4 up)

Step 3: Write as a vector
Horizontal (x) = 3
Vertical (y) = 4

Vector = (3)
         (4)

Step 4: Write full description
"Translation by vector (3)"
                       (4)

Or: "Translation 3 right and 4 up"

Check: (2,3) + (3,4) = (5,7) ✓`,
        answer: 'Translation by vector (3/4) or Translation 3 right, 4 up',
        explanation: 'For translation, find how much the shape moved horizontally (x) and vertically (y). From (2,3) to (5,7): moved 3 right (5-2=3) and 4 up (7-3=4). Write as vector (3,4). ALWAYS write the vector - saying just "translation" loses marks!'
      },
      {
        question: 'Describe the single transformation that maps triangle A onto triangle B where B is a reflection of A in the y-axis',
        workingOut: `Step 1: Identify the transformation type
The shape has been flipped → Reflection

Step 2: Identify the mirror line
The y-axis is the line of symmetry
The y-axis has equation x = 0

Step 3: Check each point
If point (a, b) is reflected in y-axis
New point is (-a, b)
- x-coordinate changes sign
- y-coordinate stays same ✓

Step 4: Write FULL description
"Reflection in the y-axis"

Or more formally:
"Reflection in the line x = 0"

Note: Must state the mirror line!`,
        answer: 'Reflection in the y-axis (or line x = 0)',
        explanation: 'Reflection flips a shape over a mirror line. If reflecting in the y-axis, the x-coordinates change sign but y stays same: (3,2) becomes (-3,2). MUST state which line - just saying "reflection" is incomplete! Common mirror lines: x-axis, y-axis, y=x, or y=k, x=k.'
      },
      {
        question: 'Describe the rotation: Shape A at (2,1) rotates to Shape B at (1,-2), center is origin (0,0)',
        workingOut: `Step 1: Identify transformation type
Shape turned around origin → Rotation

Step 2: Find the angle
Use tracing paper or count:
From (2,1) to (1,-2) around (0,0)
This is a 90° turn

Step 3: Find direction
Clockwise or anticlockwise?
(2,1) going to (1,-2) = 90° clockwise
Or 270° anticlockwise (same thing)

Step 4: Identify center
Given as origin = (0, 0)

Step 5: Write FULL description (all 3 parts!)
"Rotation 90° clockwise about the point (0, 0)"

Or:
"Rotation 270° anticlockwise about (0, 0)"

Both answers acceptable!`,
        answer: 'Rotation 90° clockwise about (0, 0)',
        explanation: 'Rotation needs THREE things: angle, direction, center. Here: 90° clockwise around origin (0,0). You could also say 270° anticlockwise - same result! Missing any part = lose marks. Use tracing paper in exam to help find angle and direction!'
      },
      {
        question: 'Shape A is enlarged with scale factor 2 and center (0, 0). Point (3, 4) is on shape A. Where does it move to?',
        workingOut: `Step 1: Understand enlargement
Scale factor 2 = distances from center double

Step 2: Identify center
Center = (0, 0) = origin

Step 3: Find distance from center to point
Point (3, 4) is:
- 3 units right of center
- 4 units up from center

Step 4: Multiply by scale factor
New distances = 2 × old distances
New x = 2 × 3 = 6
New y = 2 × 4 = 8

Step 5: New position
(6, 8)

Check: (6, 8) is twice as far from (0, 0) ✓

Step 6: Full description if asked:
"Enlargement scale factor 2, center (0, 0)"`,
        answer: 'Point moves to (6, 8)',
        explanation: 'Enlargement with SF 2 means everything doubles in size. Each coordinate multiplies by the scale factor from the center. From (0,0): point at (3,4) becomes (2×3, 2×4) = (6,8). For SF 3, would be (9,12). For SF 0.5, would be (1.5,2). Always multiply distances from center!'
      },
      {
        question: 'What is the mirror line for reflecting point (4, 2) to point (4, -2)?',
        workingOut: `Step 1: Plot both points mentally
(4, 2) is above
(4, -2) is below
Same x-coordinate (4)

Step 2: Find midpoint
y-coordinate halfway between 2 and -2
Midpoint = (2 + (-2)) ÷ 2 = 0 ÷ 2 = 0

Step 3: Identify the line
Points have same x (both x = 4)
They're reflected vertically
Mirror line is horizontal through y = 0

Step 4: Name the line
y = 0 is the x-axis

Step 5: Write full description
"Reflection in the x-axis"

Or: "Reflection in the line y = 0"

Both acceptable!`,
        answer: 'x-axis (or line y = 0)',
        explanation: 'Points (4,2) and (4,-2) are same distance above and below y=0 (the x-axis). The x-axis is the mirror line. Same x-coordinate (4) but opposite y-values (2 and -2) confirms this. Both "x-axis" and "y = 0" are correct names for this line.'
      },
      {
        question: 'Rotation 90° clockwise, center (0,0): Point (2,5) moves to where?',
        workingOut: `90° clockwise rotation rule: (x,y) → (y,-x)

Step 1: Apply rule
(2,5) → (5,-2)

Answer: (5,-2)`,
        answer: '(5,-2)',
        explanation: '90° clockwise about origin: (x,y)→(y,-x). So (2,5)→(5,-2).'
      },
      {
        question: 'Combined transformation: Translate (3,1) then reflect in y-axis. Point (4,2) moves to?',
        workingOut: `Step 1: Translation (3,1)
(4,2) + (3,1) = (7,3)

Step 2: Reflect in y-axis
(7,3) → (-7,3)

Answer: (-7,3)`,
        answer: '(-7,3)',
        explanation: 'Do transformations in order! First translate: (4,2)+(3,1)=(7,3). Then reflect in y-axis: x changes sign → (-7,3).'
      },
      {
        question: 'Enlargement SF -2, center (0,0): Point (3,1) moves to?',
        workingOut: `Negative scale factor means: enlarge AND reflect in center

Step 1: Apply SF -2
(3×-2, 1×-2) = (-6,-2)

Answer: (-6,-2)`,
        answer: '(-6,-2)',
        explanation: 'Negative SF: enlarge by magnitude (2) and rotate 180° about center. (3,1)×(-2) = (-6,-2).'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'What vector describes translation 5 right and 2 down?',
        options: ['(5, 2)', '(5, -2)', '(-5, 2)', '(2, 5)'],
        answer: '(5, -2)',
        explanation: 'Right = positive x = 5. Down = negative y = -2. Vector: (5, -2). Remember: down is negative!',
        difficulty: 'easy'
      },
      {
        question: 'Reflection in the y-axis changes point (3, 5) to:',
        options: ['(-3, 5)', '(3, -5)', '(-3, -5)', '(5, 3)'],
        answer: '(-3, 5)',
        explanation: 'y-axis reflection: x changes sign, y stays same. (3,5) → (-3,5)',
        difficulty: 'medium'
      },
      {
        question: 'For rotation, you MUST state:',
        options: ['Angle, direction, center', 'Just angle', 'Angle and direction', 'Angle and center'],
        answer: 'Angle, direction, center',
        explanation: 'Rotation needs ALL THREE: angle (90°, etc.), direction (clockwise/anticlockwise), center point (coordinates).',
        difficulty: 'easy'
      },
      {
        question: 'Enlargement SF 3, center (0,0). Point (2,1) moves to:',
        options: ['(6, 3)', '(5, 4)', '(2, 1)', '(3, 3)'],
        answer: '(6, 3)',
        explanation: 'Multiply both coordinates by scale factor: (2×3, 1×3) = (6, 3)',
        difficulty: 'medium'
      },
      {
        question: 'What is the equation of the y-axis?',
        options: ['x = 0', 'y = 0', 'y = x', 'x = y'],
        answer: 'x = 0',
        explanation: 'y-axis: all points have x = 0. x-axis is y = 0.',
        difficulty: 'easy'
      },
      {
        question: 'Translation vector (0, 4) means:',
        options: ['Move 4 up', 'Move 4 right', 'Move 4 down', 'Move 4 left'],
        answer: 'Move 4 up',
        explanation: '(0, 4) = no horizontal movement (0), move 4 up (positive y)',
        difficulty: 'easy'
      },
      {
        question: '180° rotation needs direction stated?',
        options: ['No (same both ways)', 'Yes, always', 'Only sometimes', 'Yes, for marks'],
        answer: 'No (same both ways)',
        explanation: '180° is same clockwise or anticlockwise, so direction not needed. But still need center!',
        difficulty: 'medium'
      },
      {
        question: 'Reflection in line y = x changes (2, 5) to:',
        options: ['(5, 2)', '(-2, -5)', '(2, 5)', '(-5, -2)'],
        answer: '(5, 2)',
        explanation: 'Line y = x: swap coordinates. (x,y) becomes (y,x). So (2,5) → (5,2)',
        difficulty: 'hard'
      },
      {
        question: 'Scale factor 0.5 means shape gets:',
        options: ['Smaller (half size)', 'Bigger (double)', 'Same size', 'Quarter size'],
        answer: 'Smaller (half size)',
        explanation: 'SF < 1 = smaller. SF 0.5 = half size. SF 2 = double. SF 1 = same.',
        difficulty: 'medium'
      },
      {
        question: 'What tool is allowed to help with transformations?',
        options: ['Tracing paper', 'Protractor', 'Compass', 'Calculator'],
        answer: 'Tracing paper',
        explanation: 'Tracing paper allowed in exams! Very helpful for reflections and rotations.',
        difficulty: 'easy'
      }
    ],
    
    tips: [
      '⭐ Always give FULL description - missing parts lose marks!',
      '⭐ Translation = vector, Reflection = mirror line, Rotation = angle+direction+center, Enlargement = SF+center',
      '⭐ Use tracing paper for reflections and rotations in exams',
      '⭐ For translation: right and up are positive, left and down are negative',
      '⭐ Check: reflected points are same distance from mirror line',
      '⭐ 180° rotation doesn\'t need direction (same both ways)',
      '⭐ Draw diagram if one isn\'t given - helps visualize',
      '⭐ For vectors, write as column: (x) not (x, y)'
    ],
    
    commonMistakes: [
      '❌ Incomplete descriptions (just "translation" without vector)',
      '❌ Wrong vector format: writing (3,4) instead of column (3)',
      '❌ Forgetting direction for rotations under 180°',
      '❌ Not stating center of rotation or enlargement',
      '❌ Getting signs wrong in vectors (forgetting down/left are negative)',
      '❌ Confusing x-axis (y=0) with y-axis (x=0)',
      '❌ Not showing working (can\'t get method marks)',
      '❌ For enlargement: not multiplying ALL coordinates by scale factor'
    ],
    
    examStrategy: `
**Question Types & Marks:**

**Describe transformation:**
- 2-3 marks for full description
- Partial marks for incomplete

**Perform transformation:**
- 2-3 marks for correct new position
- Often includes drawing

**FULL Description Requirements:**

**Translation (2 marks):**
✓ Must give vector in form (x)
                            (y)

Example: "Translation by vector (3)"
                                (4)

**Reflection (2 marks):**
✓ Must state mirror line equation

Example: "Reflection in the y-axis"
or: "Reflection in the line x = 0"

**Rotation (3 marks):**
✓ Must give angle
✓ Must give direction (unless 180°)
✓ Must give center (coordinates)

Example: "Rotation 90° clockwise about (0, 0)"

**Enlargement (3 marks):**
✓ Must give scale factor
✓ Must give center of enlargement

Example: "Enlargement scale factor 2, center (1, 1)"

**Drawing Transformations:**

**Translation:**
1. Pick any corner/vertex
2. Apply vector: add x to x-coord, add y to y-coord
3. Do for all points
4. Join points

**Reflection:**
1. Draw mirror line clearly
2. Count squares from each point to line
3. Count same squares on other side
4. Mark reflected points
5. Join points
*Use tracing paper!*

**Rotation:**
1. Mark center clearly
2. Use tracing paper:
   - Trace shape
   - Pin at center
   - Rotate by angle in given direction
   - Mark new position

**Enlargement:**
1. Mark center
2. Draw rays from center through vertices
3. Multiply distances by scale factor
4. Mark new positions on rays
5. Join points

**Calculator/Tools:**

- Tracing paper: YES (very useful!)
- Ruler: YES (for accuracy)
- Protractor: Sometimes (for rotation angles)
- Calculator: Not needed

**Time Management:**

- Describe transformation: 2-3 minutes
- Perform transformation: 3-4 minutes
- Check your work: 1 minute

**Common Exam Wording:**

- "Describe fully" = give ALL information
- "Describe the single transformation" = one type only
- "Draw" = actually draw the new shape
- "Find the center" = identify coordinates

**Grade 5 Requirements:**

Must master:
✓ All four transformation types
✓ Complete descriptions (all parts)
✓ Performing transformations accurately
✓ Using vectors correctly
✓ Identifying mirror lines
✓ Finding centers of rotation/enlargement

**Quick Reference:**

**Vectors to remember:**
- Right = (+, 0), Left = (-, 0)
- Up = (0, +), Down = (0, -)

**Mirror lines to know:**
- x-axis: y = 0
- y-axis: x = 0
- Diagonal: y = x or y = -x

**Common rotations:**
- 90° clockwise = 270° anticlockwise
- 180° (no direction needed)
- 270° clockwise = 90° anticlockwise

**Scale factors:**
- 2 = double size
- 0.5 = half size
- 1 = same size
- -1 = same size, opposite side

**Checking Your Answer:**

**Translation:** Same shape, size, orientation ✓
**Reflection:** Same shape, size, flipped ✓
**Rotation:** Same shape, size, turned ✓
**Enlargement:** Same shape, different size ✓

**Top Scoring Tips:**

1. **Write full description** - get all marks
2. **Use tracing paper** - saves time, improves accuracy
3. **Show working** - draw rays for enlargement, mark center for rotation
4. **Check** - does new shape look right?
5. **Include ALL details** - vector/line/angle+direction+center/SF+center

**Practice Priority:**

This topic worth 8-12 marks per paper!

Focus on:
1. Translation (most common, easiest)
2. Reflection (common, use tracing paper)
3. Describing transformations (exact wording matters!)
4. Rotation (3 marks if done right)

**Final Reminders:**

- Translation needs VECTOR
- Reflection needs MIRROR LINE  
- Rotation needs ANGLE + DIRECTION + CENTER
- Enlargement needs SCALE FACTOR + CENTER

Missing ANY part = lose marks!

Master complete descriptions = easy marks!
`
  },

  // ==================== MODULE 12: PROBABILITY ====================
  {
    moduleNumber: 12,
    title: 'Probability (Basic & Tree Diagrams)',
    duration: '70 minutes',
    introduction: 'Master probability - the mathematics of chance! Learn to calculate probabilities, use tree diagrams for two events, and work with probability scales. This topic appears in every Foundation paper and is worth 6-10 marks.',
    
    keyPoints: [
      'Probability = Number of favorable outcomes ÷ Total number of outcomes',
      'Probability is always between 0 and 1 (or 0% and 100%)',
      'All probabilities for all possible outcomes add up to 1',
      'Tree diagrams: Multiply along branches, add different paths to same outcome',
      'Independent events: One outcome doesn\'t affect the other',
      'Show probabilities as fractions (simplify!), decimals, or percentages'
    ],
    
    explanation: `
**What is Probability?**

Probability measures how likely something is to happen.

**Formula:**

**P(event) = Number of favorable outcomes / Total number of possible outcomes**

**Probability Scale:**

0                    0.5                    1
|---------------------|---------------------|
Impossible         Even chance         Certain
  0%                  50%                100%

**Key Values:**
- **0** = Impossible (never happens)
- **0.5** = Even chance (50-50)
- **1** = Certain (always happens)

**Basic Probability**

**Example:** Rolling a dice
- Total outcomes = 6 (numbers 1, 2, 3, 4, 5, 6)
- P(rolling a 3) = 1/6 (one 3 out of 6 numbers)
- P(rolling even) = 3/6 = 1/2 (three evens: 2, 4, 6)

**Example:** Bag of colored balls
10 balls: 3 red, 5 blue, 2 green

P(red) = 3/10
P(blue) = 5/10 = 1/2
P(green) = 2/10 = 1/5

**Important Rules**

**Rule 1: All probabilities add to 1**

P(red) + P(blue) + P(green) = 1
3/10 + 5/10 + 2/10 = 10/10 = 1 ✓

**Rule 2: Probability of NOT happening**

P(not A) = 1 - P(A)

**Example:** P(rolling a 6) = 1/6
P(not rolling a 6) = 1 - 1/6 = 5/6

**Rule 3: 0 ≤ Probability ≤ 1**

Probability cannot be:
- Negative (less than 0)
- Greater than 1
- Any number outside 0 to 1

**Listing Outcomes**

For two events, list all combinations:

**Example:** Flipping 2 coins
Outcomes: HH, HT, TH, TT (4 total)
P(both heads) = 1/4
P(one of each) = 2/4 = 1/2

**Expected Outcomes**

Expected number = Probability × Number of trials

**Example:** Roll dice 60 times
Expected number of 6s = 1/6 × 60 = 10

**Tree Diagrams**

Used for TWO or more events happening in sequence.

**Rules for Tree Diagrams:**

1. **Draw branches** for each outcome
2. **Write probability on each branch**
3. **Probabilities on branches from same point add to 1**
4. **Multiply along branches** to find combined probability
5. **Add different paths** to same result

**Example:** Flip coin twice

First flip:        Second flip:
           0.5 H -----> 0.5 H  (Path: HH, multiply 0.5×0.5=0.25)
    0.5 H  |
           0.5 T -----> 0.5 T  (Path: HT, multiply 0.5×0.5=0.25)
           
           0.5 H -----> 0.5 H  (Path: TH, multiply 0.5×0.5=0.25)
    0.5 T  |
           0.5 T -----> 0.5 T  (Path: TT, multiply 0.5×0.5=0.25)

P(two heads) = 0.5 × 0.5 = 0.25
P(one of each) = 0.25 + 0.25 = 0.5 (HT + TH paths)

**With Replacement vs Without**

**With replacement:** Put item back
- Probabilities stay same
- Independent events

**Without replacement:** Don't put back
- Probabilities change
- Dependent events

**Example:** 3 red, 2 blue balls

**With replacement:**
P(red then red) = 3/5 × 3/5 = 9/25

**Without replacement:**
P(red then red) = 3/5 × 2/4 = 6/20 = 3/10
(After taking one red, only 2 red left out of 4 total)

**Probability Language**

- **Certain:** Probability = 1
- **Likely:** Probability > 0.5
- **Even chance:** Probability = 0.5
- **Unlikely:** Probability < 0.5
- **Impossible:** Probability = 0

**Relative Frequency**

**Experimental probability** based on actual results:

Relative frequency = Number of times event happened / Total number of trials

**Example:** Flipped coin 50 times, got 28 heads
Relative frequency of heads = 28/50 = 0.56

As trials increase, relative frequency → theoretical probability
`,
    
    examples: [
      {
        question: 'A bag contains 5 red balls and 3 blue balls. Find P(red).',
        workingOut: `Step 1: Count total outcomes
Total balls = 5 + 3 = 8

Step 2: Count favorable outcomes
Red balls = 5

Step 3: Use probability formula
P(red) = Number of red / Total number
P(red) = 5/8

Step 4: Check answer makes sense
5/8 = 0.625 (between 0 and 1 ✓)
More red than blue, so > 0.5 ✓

Step 5: Can simplify?
5 and 8 have no common factors
Already in simplest form ✓

Answer: P(red) = 5/8 or 0.625 or 62.5%`,
        answer: 'P(red) = 5/8',
        explanation: 'Probability = favorable outcomes ÷ total outcomes. There are 5 red balls out of 8 total, so P(red) = 5/8. Always simplify fractions! Check: 5/8 + 3/8 = 8/8 = 1 ✓ (all probabilities add to 1). Can also write as 0.625 or 62.5%.'
      },
      {
        question: 'What is the probability of NOT rolling a 6 on a normal dice?',
        workingOut: `Step 1: Find P(rolling a 6)
Favorable outcomes = 1 (just the number 6)
Total outcomes = 6 (numbers 1-6)
P(6) = 1/6

Step 2: Use the rule: P(not A) = 1 - P(A)
P(not 6) = 1 - P(6)
P(not 6) = 1 - 1/6

Step 3: Calculate
1 = 6/6
6/6 - 1/6 = 5/6

Step 4: Alternative method (counting)
Not a 6 means: 1, 2, 3, 4, or 5
That's 5 outcomes out of 6
P(not 6) = 5/6 ✓

Step 5: Check
P(6) + P(not 6) = 1/6 + 5/6 = 6/6 = 1 ✓

Answer: P(not 6) = 5/6`,
        answer: 'P(not 6) = 5/6',
        explanation: 'To find probability of something NOT happening, use: P(not A) = 1 - P(A). Since P(6) = 1/6, then P(not 6) = 1 - 1/6 = 5/6. Or count directly: not a 6 means rolling 1,2,3,4, or 5 (5 options out of 6). Check: 1/6 + 5/6 = 1 ✓'
      },
      {
        question: 'A coin is flipped twice. Draw a tree diagram and find P(at least one head).',
        workingOut: `Step 1: Draw tree diagram

First flip:      Second flip:     Outcome    Probability
           H (0.5) ------> H       HH        0.5 × 0.5 = 0.25
    H (0.5)|
           T (0.5) ------> T       HT        0.5 × 0.5 = 0.25
    
           H (0.5) ------> H       TH        0.5 × 0.5 = 0.25
    T (0.5)|
           T (0.5) ------> T       TT        0.5 × 0.5 = 0.25

Check: 0.25+0.25+0.25+0.25 = 1 ✓

Step 2: Identify "at least one head"
At least one head means: HH, HT, or TH
(All except TT)

Step 3: Add the probabilities
P(at least one H) = P(HH) + P(HT) + P(TH)
                  = 0.25 + 0.25 + 0.25
                  = 0.75

Or as fraction: 3/4

Alternative: P(at least one H) = 1 - P(TT)
                                = 1 - 0.25
                                = 0.75 ✓

Answer: 3/4 or 0.75`,
        answer: 'P(at least one head) = 3/4 or 0.75',
        explanation: 'Tree diagram shows all outcomes. Multiply along branches (HH: 0.5×0.5=0.25). "At least one head" means HH, HT, or TH - add these paths: 0.25+0.25+0.25=0.75. Or use P(at least one) = 1 - P(none) = 1 - 0.25 = 0.75. Remember: multiply along, add across!'
      },
      {
        question: 'Bag has 3 red, 5 blue, 2 green balls. P(red or green)?',
        workingOut: `Step 1: Find P(red)
P(red) = 3/10

Step 2: Find P(green)
P(green) = 2/10

Step 3: Add (OR means add)
P(red OR green) = 3/10 + 2/10 = 5/10 = 1/2

Answer: 1/2 or 0.5`,
        answer: '1/2',
        explanation: 'OR means ADD probabilities! P(red)=3/10, P(green)=2/10, so P(red OR green)=5/10=1/2.'
      },
      {
        question: 'Two independent events: P(A)=0.3, P(B)=0.4. Find P(A AND B).',
        workingOut: `Independent means one doesn't affect the other

AND means MULTIPLY:
P(A AND B) = P(A) × P(B)
= 0.3 × 0.4
= 0.12

Answer: 0.12`,
        answer: '0.12',
        explanation: 'Independent events AND together: MULTIPLY! P(A AND B) = 0.3 × 0.4 = 0.12.'
      },
      {
        question: 'Relative frequency: Coin flipped 50 times, lands heads 32 times. Estimate P(heads).',
        workingOut: `Relative frequency = number of successes / total trials

P(heads) ≈ 32/50
= 0.64

Answer: 0.64`,
        answer: '0.64',
        explanation: 'Relative frequency estimates probability from experiments: successes/trials = 32/50 = 0.64.'
      },
      {
        question: 'A dice is rolled 120 times. How many times would you expect to roll a number greater than 4?',
        workingOut: `Step 1: Find the probability
Greater than 4 means: 5 or 6
Favorable outcomes = 2
Total outcomes = 6
P(>4) = 2/6 = 1/3

Step 2: Use expected value formula
Expected number = Probability × Number of trials
Expected number = 1/3 × 120

Step 3: Calculate
1/3 × 120 = 120 ÷ 3 = 40

Step 4: Interpret
We expect about 40 rolls to be 5 or 6

Note: "Expect" means average over many experiments
Actual results will vary!

Answer: 40 times`,
        answer: '40 times',
        explanation: 'Expected frequency = probability × number of trials. P(>4) = P(5 or 6) = 2/6 = 1/3. Expected = 1/3 × 120 = 40. This is the average expectation - actual results will vary but should be close to 40. Show probability calculation first, then multiply!'
      },
      {
        question: 'Bag has 4 red, 6 blue balls. Pick one, don\'t replace, pick again. Find P(two blues).',
        workingOut: `Step 1: Identify this is WITHOUT replacement
After first pick, total changes

Step 2: Draw tree diagram (partial)

First pick:          Second pick:
                     5 blue  ---> Both blue
    6 blue  -------> 9 total
    10 total
                     4 red   ---> Blue then red
                     9 total

Step 3: Find P(first blue)
P(blue first) = 6/10 = 3/5

Step 4: Find P(second blue | first was blue)
After taking one blue:
- 5 blues left
- 9 balls total
P(blue second) = 5/9

Step 5: Multiply along branches
P(two blues) = 6/10 × 5/9

Step 6: Calculate
= (6 × 5)/(10 × 9)
= 30/90
= 1/3

Answer: P(two blues) = 1/3`,
        answer: 'P(two blues) = 1/3',
        explanation: 'WITHOUT replacement! First blue: 6/10. After taking one blue, 5 blues left from 9 total, so second blue: 5/9. Multiply: 6/10 × 5/9 = 30/90 = 1/3. Key point: probabilities change when not replacing! If WITH replacement, would be 6/10 × 6/10 = 36/100.'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Probability of picking red from bag with 3 red, 7 blue?',
        options: ['3/10', '3/7', '7/10', '1/2'],
        answer: '3/10',
        explanation: 'P(red) = 3 red ÷ 10 total = 3/10. Always divide favorable by total.',
        difficulty: 'easy'
      },
      {
        question: 'If P(rain) = 0.7, what is P(no rain)?',
        options: ['0.3', '0.7', '1', '1.7'],
        answer: '0.3',
        explanation: 'P(not rain) = 1 - P(rain) = 1 - 0.7 = 0.3. All probabilities add to 1!',
        difficulty: 'easy'
      },
      {
        question: 'Which probability is impossible?',
        options: ['0', '0.01', '0.5', '0.99'],
        answer: '0',
        explanation: 'Probability 0 = impossible (never happens). Probability 1 = certain.',
        difficulty: 'easy'
      },
      {
        question: 'Roll dice 60 times. Expected number of 1s?',
        options: ['10', '6', '60', '1'],
        answer: '10',
        explanation: 'P(1) = 1/6. Expected = 1/6 × 60 = 10. Multiply probability by trials.',
        difficulty: 'medium'
      },
      {
        question: 'Flip coin twice. What is P(both tails)?',
        options: ['1/4', '1/2', '1/8', '1/3'],
        answer: '1/4',
        explanation: 'Tree diagram: P(T) × P(T) = 1/2 × 1/2 = 1/4. Multiply along branch!',
        difficulty: 'medium'
      },
      {
        question: 'Which value CANNOT be a probability?',
        options: ['1.2', '0', '0.5', '1'],
        answer: '1.2',
        explanation: 'Probability must be between 0 and 1. 1.2 > 1, so impossible!',
        difficulty: 'easy'
      },
      {
        question: 'Bag: 5 red, 5 blue. P(red) + P(blue) = ?',
        options: ['1', '0', '10', '5'],
        answer: '1',
        explanation: 'All probabilities add to 1. P(red) = 5/10, P(blue) = 5/10, sum = 10/10 = 1',
        difficulty: 'easy'
      },
      {
        question: 'Pick card from 52. P(heart)?',
        options: ['1/4', '1/13', '1/52', '4/52'],
        answer: '1/4',
        explanation: '13 hearts out of 52 cards. 13/52 = 1/4. Always simplify!',
        difficulty: 'medium'
      },
      {
        question: 'Spin spinner 80 times, lands on red 20 times. Relative frequency?',
        options: ['0.25', '0.2', '20', '80'],
        answer: '0.25',
        explanation: 'Relative frequency = 20/80 = 1/4 = 0.25. Divide times happened by total trials.',
        difficulty: 'medium'
      },
      {
        question: '3 red, 2 blue. Pick one, replace, pick again. P(two red)?',
        options: ['9/25', '6/20', '3/5', '1/4'],
        answer: '9/25',
        explanation: 'WITH replacement: probabilities stay same. 3/5 × 3/5 = 9/25. Both picks same!',
        difficulty: 'hard'
      }
    ],
    
    tips: [
      '⭐ Always simplify probability fractions to lowest terms',
      '⭐ Check: all probabilities should add to 1',
      '⭐ Tree diagrams: multiply along branches, add for different paths',
      '⭐ P(not A) = 1 - P(A) is often quicker than counting',
      '⭐ Expected value = probability × number of trials',
      '⭐ Show your working - method marks available!',
      '⭐ Without replacement: probabilities change on second pick',
      '⭐ Probability must be between 0 and 1 (inclusive)'
    ],
    
    commonMistakes: [
      '❌ Not simplifying fractions (writing 6/10 instead of 3/5)',
      '❌ Adding along tree branches instead of multiplying',
      '❌ Forgetting probabilities from one point must add to 1',
      '❌ Using same probabilities for "without replacement"',
      '❌ Writing probability > 1 (impossible!)',
      '❌ Not showing working (lose method marks)',
      '❌ Confusing "at least one" with "exactly one"',
      '❌ For expected value: forgetting to multiply by number of trials'
    ],
    
    examStrategy: `
**Question Types & Marks:**

**Simple probability (2 marks):**
- Find P(event) from given information
- Show: favorable/total

**Probability of not happening (2 marks):**
- Use P(not A) = 1 - P(A)
- Show subtraction from 1

**Tree diagrams (3-4 marks):**
- Draw complete diagram
- Show probabilities on branches
- Multiply/add correctly

**Expected frequency (2-3 marks):**
- Find probability first
- Multiply by number of trials

**Method for Basic Probability:**

1. **Count total outcomes**
2. **Count favorable outcomes**
3. **Write as fraction:** favorable/total
4. **Simplify**
5. **Check:** 0 ≤ answer ≤ 1

Template:
"Total outcomes = 10
Favorable outcomes = 3
P(event) = 3/10"

**Method for Tree Diagrams:**

1. **Draw branches** for each outcome
2. **Label branches** with probabilities
3. **Check** probabilities from each point add to 1
4. **List all end results**
5. **Multiply along branches**
6. **Add different paths** to same outcome

**Key Rules to Remember:**

- All probabilities add to 1
- 0 ≤ P ≤ 1 always
- P(A) + P(not A) = 1
- Tree: multiply along, add across
- Expected = P × trials

**Calculator Use:**

Can use for:
- Converting fractions to decimals (3 ÷ 8 = 0.375)
- Multiplying probabilities
- Expected value calculations

Still show working:
"P(both red) = 3/5 × 3/5 = 9/25 = 0.36"

**Time Management:**

- Simple probability: 2 minutes
- Tree diagram: 4-5 minutes
- Expected frequency: 2-3 minutes
- Check time: 1 minute

**Common Exam Wording:**

- "Find the probability" = give P as fraction/decimal/%
- "How many times would you expect" = expected frequency
- "At least one" = add multiple outcomes
- "Draw a tree diagram" = must draw branches
- "Give your answer as a fraction" = don't give decimal

**Grade 5 Requirements:**

Must master:
✓ Basic probability (favorable/total)
✓ P(not A) = 1 - P(A)
✓ Simple tree diagrams (two events)
✓ Expected frequency
✓ Simplifying fractions
✓ With and without replacement

**Tree Diagram Checklist:**

When drawing tree diagrams:
✓ All branches from same point add to 1?
✓ Probabilities on branches (not at ends)?
✓ Multiply along branches?
✓ Add different paths to same result?
✓ All end probabilities add to 1?

**Probability Scale:**

Remember to place on scale:
- 0 = impossible
- 0.25 = unlikely
- 0.5 = even chance
- 0.75 = likely
- 1 = certain

**Forms of Answer:**

Can give probability as:
- Fraction: 3/4 (simplest form!)
- Decimal: 0.75
- Percentage: 75%

**Unless question specifies**, use fraction!

**Quick Checks:**

Before submitting:
✓ Fraction simplified?
✓ Answer between 0 and 1?
✓ Used correct total?
✓ Tree probabilities add to 1?
✓ Multiplied not added (tree)?

**Practice Priority:**

Worth 6-10 marks per paper!

Focus on:
1. Basic probability (most common)
2. Finding P(not A) (regular question)
3. Simple tree diagrams (Grade 4-5)
4. Expected frequency (easy marks)

**Memory Aid:**

**"PAST"** for probability:
- **P** = favorable/total
- **A**ll probabilities add to 1
- **S**implify fractions
- **T**ree: multiply along, add across

Master probability = reliable exam marks!
`
  },

  // ==================== MODULE 13: STATISTICS (AVERAGES & CHARTS) ====================
  {
    moduleNumber: 13,
    title: 'Statistics (Averages & Charts)',
    duration: '75 minutes',
    introduction: 'Master the three averages (mean, median, mode) and learn to interpret data from charts and tables. Statistics appears in every Foundation paper and is worth 8-12 marks. Essential for Grade 5!',
    
    keyPoints: [
      'Mean = Sum of all values ÷ Number of values (the arithmetic average)',
      'Median = Middle value when data is in order (cross off from both ends)',
      'Mode = Most common value (appears most frequently)',
      'Range = Highest value - Lowest value (measures spread)',
      'Read data carefully from bar charts, pie charts, and tables',
      'Always show working for mean calculations - method marks available!'
    ],
    
    explanation: `
**What are Averages?**

Averages give us a "typical" or "representative" value for a set of data.

There are THREE types of average:
1. **Mean** (most common in maths)
2. **Median** (middle value)
3. **Mode** (most frequent)

Plus **Range** (not an average, but measures spread)

**1. THE MEAN**

The mean is the "arithmetic average" - what most people call "the average".

**Formula:**

**Mean = Sum of all values / Number of values**

**Step-by-step:**
1. Add up all the values
2. Count how many values there are
3. Divide total by count

**Example:** Find mean of 3, 7, 5, 9, 6

Step 1: Add all values
3 + 7 + 5 + 9 + 6 = 30

Step 2: Count values
5 numbers

Step 3: Divide
Mean = 30 ÷ 5 = 6

**Finding a missing value:**

If you know the mean and some values, you can find a missing value.

**Example:** Mean of four numbers is 8. Three numbers are 6, 7, 10. Find the fourth.

Total needed = Mean × Count = 8 × 4 = 32
Current total = 6 + 7 + 10 = 23
Missing value = 32 - 23 = 9

**2. THE MEDIAN**

The median is the MIDDLE value when data is in order.

**Steps:**
1. Put values in order (smallest to largest)
2. Cross off one from each end repeatedly
3. Middle value left = median

**Example 1:** Find median of 7, 3, 9, 5, 1

Step 1: Put in order
1, 3, 5, 7, 9

Step 2: Cross off from ends
~~1~~, ~~3~~, **5**, ~~7~~, ~~9~~

Step 3: Middle value
Median = 5

**Even number of values:**

If there are two middle values, find their mean.

**Example 2:** Find median of 2, 5, 8, 11

Step 1: Already in order
2, 5, 8, 11

Step 2: Cross off
~~2~~, **5**, **8**, ~~11~~

Step 3: Two middle values (5 and 8)
Median = (5 + 8) ÷ 2 = 13 ÷ 2 = 6.5

**Quick rule:** 
- **Odd count:** Middle value
- **Even count:** Mean of two middle values

**Position formula:**
For n values in order:
Median position = (n + 1) ÷ 2

5 values: (5+1)÷2 = 3rd value
6 values: (6+1)÷2 = 3.5 (between 3rd and 4th)

**3. THE MODE**

The mode is the most common value (appears most often).

**Example:** Find mode of 2, 5, 3, 5, 7, 5, 9

5 appears three times (most frequent)
Mode = 5

**Key points:**
- Can have NO mode (all values appear once)
- Can have MORE THAN ONE mode (bimodal = 2 modes)
- Only works well with discrete data

**Example:** 1, 2, 3, 4, 5 (no repeats)
No mode (or "no modal value")

**Example:** 2, 3, 3, 5, 5, 7 (two values appear twice)
Modes = 3 and 5 (bimodal)

**4. THE RANGE**

Range measures the SPREAD of data (not an average!).

**Formula:**

**Range = Highest value - Lowest value**

**Example:** 3, 7, 5, 12, 9

Highest = 12
Lowest = 3
Range = 12 - 3 = 9

**Interpretation:**
- Large range = data spread out
- Small range = data clustered together

**Comparing Averages**

**Mean:**
✓ Uses all values
✓ Most commonly used
✗ Affected by extreme values (outliers)

**Median:**
✓ Not affected by extreme values
✓ Easy to find
✗ Doesn't use all values

**Mode:**
✓ Shows most common value
✓ Good for non-numerical data
✗ May not exist or have multiple modes

**Example:** Test scores: 45, 50, 52, 55, 98

Mean = (45+50+52+55+98) ÷ 5 = 300 ÷ 5 = 60
Median = 52 (middle value)
Mode = none (no repeats)

Median (52) better represents typical score than mean (60) because 98 is an outlier.

**Reading Charts and Tables**

**Bar Charts:**
- Height of bar = frequency (how many)
- Read scale carefully
- Can be vertical or horizontal

**Pie Charts:**
- Angle = frequency
- Total angles = 360°
- Frequency = (Angle ÷ 360) × Total

**Example:** Pie chart, 120° section, 60 people total
Frequency = (120 ÷ 360) × 60 = (1/3) × 60 = 20 people

**Frequency Tables:**

Score | Frequency
------|----------
  1   |    3
  2   |    5
  3   |    2

To find mean from frequency table:
Mean = (1×3 + 2×5 + 3×2) ÷ (3+5+2)
     = (3 + 10 + 6) ÷ 10
     = 19 ÷ 10
     = 1.9

**Grouped Frequency Tables:**

When data is in groups:

Class | Frequency
------|----------
0-10  |    5
11-20 |    8
21-30 |    3

Can only estimate mean using midpoints:
Midpoint of 0-10 = 5
Midpoint of 11-20 = 15.5
Midpoint of 21-30 = 25.5

Estimated mean = (5×5 + 15.5×8 + 25.5×3) ÷ 16
`,
    
    examples: [
      {
        question: 'Find the mean of: 4, 7, 5, 9, 10',
        workingOut: `Step 1: Add all values
4 + 7 + 5 + 9 + 10
= 11 + 5 + 9 + 10
= 16 + 9 + 10
= 25 + 10
= 35

Step 2: Count how many values
5 numbers

Step 3: Divide total by count
Mean = 35 ÷ 5
Mean = 7

Step 4: Check answer makes sense
7 is between smallest (4) and largest (10) ✓
Looks reasonable ✓

Answer: Mean = 7

Note: Always show addition and division separately for method marks!`,
        answer: 'Mean = 7',
        explanation: 'Mean = sum of values ÷ number of values. Add: 4+7+5+9+10 = 35. Count: 5 values. Divide: 35 ÷ 5 = 7. ALWAYS show your working - even if wrong answer, you can get method marks for correct method! Check: mean should be roughly in the middle of your data.'
      },
      {
        question: 'Find the median of: 12, 7, 15, 3, 9, 11, 6',
        workingOut: `Step 1: Put in order (smallest to largest)
3, 6, 7, 9, 11, 12, 15

Step 2: Count values
7 numbers (odd number)

Step 3: Find middle position
Position = (7 + 1) ÷ 2 = 8 ÷ 2 = 4th value

Or cross off from ends:
~~3~~, ~~6~~, ~~7~~, **9**, ~~11~~, ~~12~~, ~~15~~

Step 4: Identify median
4th value = 9

Answer: Median = 9

Check: 3 values below 9 (3,6,7)
       3 values above 9 (11,12,15) ✓`,
        answer: 'Median = 9',
        explanation: 'For median: 1) Put in order, 2) Find middle value. Ordered: 3,6,7,9,11,12,15. With 7 values (odd), middle is 4th value = 9. Cross off from both ends until one left. If even number of values, find mean of two middle values. MUST put in order first - common mistake to forget!'
      },
      {
        question: 'Find the mode and range of: 5, 8, 3, 8, 2, 8, 9',
        workingOut: `**Finding the MODE:**

Step 1: Look for most frequent value
5 appears 1 time
8 appears 3 times ← most frequent
3 appears 1 time
2 appears 1 time
9 appears 1 time

Step 2: Identify mode
Mode = 8 (appears most often)

**Finding the RANGE:**

Step 1: Identify highest value
Highest = 9

Step 2: Identify lowest value
Lowest = 2

Step 3: Calculate range
Range = Highest - Lowest
Range = 9 - 2 = 7

Answer: 
Mode = 8
Range = 7`,
        answer: 'Mode = 8, Range = 7',
        explanation: 'Mode = most common value. 8 appears 3 times (most frequent), so mode = 8. Range = highest - lowest = 9 - 2 = 7. Range measures spread of data. Remember: mode is the value that appears most, not how many times it appears! Some data has no mode (all different) or two modes (bimodal).'
      },
      {
        question: 'The mean of 6, 9, 7, and x is 8. Find x.',
        workingOut: `Step 1: Understand what mean tells us
Mean = 8 means all values add to 8 × 4

Step 2: Calculate total needed
Total = Mean × Number of values
Total = 8 × 4 = 32

Step 3: Add known values
6 + 9 + 7 = 22

Step 4: Find missing value
Total needed = 32
Current total = 22
Missing value x = 32 - 22 = 10

Step 5: Check
Mean of 6, 9, 7, 10:
(6 + 9 + 7 + 10) ÷ 4 = 32 ÷ 4 = 8 ✓

Answer: x = 10`,
        answer: 'x = 10',
        explanation: 'If mean = 8 and there are 4 values, total must be 8×4 = 32. Known values: 6+9+7 = 22. Missing value: 32-22 = 10. This type of "reverse mean" question is common! Formula: Missing value = (Mean × Count) - (Sum of known values). Always check by calculating mean with all values!'
      },
      {
        question: 'From frequency table: Score 1(freq 3), 2(freq 5), 3(freq 2). Find mean.',
        workingOut: `Step 1: Understand frequency table
Score 1 appears 3 times
Score 2 appears 5 times
Score 3 appears 2 times

Step 2: Calculate sum of all values
(Score × Frequency) for each row:
1 × 3 = 3
2 × 5 = 10
3 × 2 = 6

Total sum = 3 + 10 + 6 = 19

Step 3: Count total frequencies
Total frequency = 3 + 5 + 2 = 10

Step 4: Calculate mean
Mean = Total sum ÷ Total frequency
Mean = 19 ÷ 10
Mean = 1.9

Answer: Mean = 1.9

Check: Most values are 2 (freq 5)
Mean of 1.9 makes sense ✓`,
        answer: 'Mean = 1.9',
        explanation: 'For frequency tables: multiply each value by its frequency, add these products, then divide by total frequency. Sum = (1×3)+(2×5)+(3×2) = 3+10+6 = 19. Total frequency = 3+5+2 = 10. Mean = 19÷10 = 1.9. Don\'t just average the scores (1,2,3) - must weight by frequency!'
      },
      {
        question: 'Find median from frequency table: Score 1(freq 4), 2(freq 6), 3(freq 5)',
        workingOut: `Step 1: Find total frequency
4+6+5=15 values

Step 2: Find middle position
(15+1)÷2 = 8th value

Step 3: Count cumulative frequency
1: 4 values (positions 1-4)
2: 6 values (positions 5-10)
3: 5 values (positions 11-15)

8th value is in the "2" group

Answer: Median = 2`,
        answer: 'Median = 2',
        explanation: 'For grouped data: find middle position (8th of 15), count cumulative frequency to locate which group contains it. Median = 2.'
      },
      {
        question: 'Compare two datasets: Set A mean=50, range=20. Set B mean=45, range=35. Which is more consistent?',
        workingOut: `Smaller range = more consistent

Set A: range 20 (more consistent)
Set B: range 35 (less consistent)

Answer: Set A`,
        answer: 'Set A (smaller range)',
        explanation: 'Range measures spread. Smaller range = data closer together = more consistent. Set A (range 20) is more consistent than Set B (range 35).'
      },
      {
        question: 'Outlier: Data set 12,15,13,14,45,16. Identify outlier and explain effect on mean.',
        workingOut: `45 is outlier (much larger than others)

Mean WITH outlier:
(12+15+13+14+45+16)÷6 = 115÷6 = 19.2

Mean WITHOUT outlier:
(12+15+13+14+16)÷5 = 70÷5 = 14

Effect: Outlier increases mean significantly

Answer: 45 is outlier; increases mean from 14 to 19.2`,
        answer: '45 is outlier, raises mean',
        explanation: 'Outliers are extreme values. 45 is much larger than others (12-16 range). It pulls the mean UP from 14 to 19.2. Median less affected by outliers.'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Mean of 5, 8, 12, 15?',
        options: ['10', '8.5', '40', '12'],
        answer: '10',
        explanation: 'Sum = 5+8+12+15 = 40. Count = 4. Mean = 40÷4 = 10',
        difficulty: 'easy'
      },
      {
        question: 'Median of 2, 9, 5, 7, 3?',
        options: ['5', '2', '7', '26'],
        answer: '5',
        explanation: 'Order: 2,3,5,7,9. Middle value (3rd) = 5. Must put in order first!',
        difficulty: 'easy'
      },
      {
        question: 'Mode of 4, 7, 4, 9, 4, 2?',
        options: ['4', '7', '5', 'No mode'],
        answer: '4',
        explanation: '4 appears 3 times (most frequent). Mode = most common value.',
        difficulty: 'easy'
      },
      {
        question: 'Range of 15, 3, 8, 12, 5?',
        options: ['12', '15', '3', '43'],
        answer: '12',
        explanation: 'Range = Highest - Lowest = 15 - 3 = 12. Measures spread.',
        difficulty: 'easy'
      },
      {
        question: 'Median of 6, 2, 9, 4 (even number)?',
        options: ['5', '6', '4', '21'],
        answer: '5',
        explanation: 'Order: 2,4,6,9. Two middles: 4 and 6. Median = (4+6)÷2 = 5',
        difficulty: 'medium'
      },
      {
        question: 'Mean of 3, 7, 5, x is 6. Find x.',
        options: ['9', '6', '15', '5'],
        answer: '9',
        explanation: 'Total needed = 6×4 = 24. Have: 3+7+5 = 15. Missing: 24-15 = 9',
        difficulty: 'medium'
      },
      {
        question: 'Which average is affected by extreme values?',
        options: ['Mean', 'Median', 'Mode', 'Range'],
        answer: 'Mean',
        explanation: 'Mean uses all values, so outliers affect it. Median not affected by extremes.',
        difficulty: 'medium'
      },
      {
        question: 'Data: 10,10,10,10,50. Which is bigger: mean or median?',
        options: ['Mean', 'Median', 'Same', 'Cannot tell'],
        answer: 'Mean',
        explanation: 'Median = 10 (middle). Mean = 90÷5 = 18. Extreme value (50) pulls mean up.',
        difficulty: 'hard'
      },
      {
        question: 'Frequency table: 1(freq 2), 2(freq 3). Total values?',
        options: ['5', '3', '2', '6'],
        answer: '5',
        explanation: 'Total frequency = 2+3 = 5. This is how many values in total.',
        difficulty: 'easy'
      },
      {
        question: 'Pie chart: 90° section, 40 people total. How many?',
        options: ['10', '90', '4', '40'],
        answer: '10',
        explanation: '90°/360° = 1/4. So 1/4 of 40 = 10 people. (angle÷360)×total',
        difficulty: 'medium'
      }
    ],
    
    tips: [
      '⭐ Mean: ALWAYS show sum and division separately for method marks',
      '⭐ Median: MUST put in order first - most common mistake!',
      '⭐ Mode: The value itself, not how many times it appears',
      '⭐ Range: Highest minus lowest (not highest plus lowest!)',
      '⭐ For frequency tables: multiply value × frequency before summing',
      '⭐ Check your answer makes sense - is it roughly in the middle?',
      '⭐ Even number of values: median is mean of two middle values',
      '⭐ Missing value questions: work backwards from the mean'
    ],
    
    commonMistakes: [
      '❌ Forgetting to put data in order for median',
      '❌ Not showing working for mean (lose method marks)',
      '❌ Confusing mode with frequency (mode is the value, not the count)',
      '❌ Adding instead of subtracting for range',
      '❌ For frequency tables: just averaging the values without using frequencies',
      '❌ Forgetting to divide by total frequency in frequency tables',
      '❌ Thinking mode is always the biggest/smallest number',
      '❌ For pie charts: forgetting to divide angle by 360 first'
    ],
    
    examStrategy: `
**Question Types & Marks:**

**Find the mean (2-3 marks):**
- Show sum of values
- Show count
- Show division

**Find median (2 marks):**
- Put in order (show this!)
- Identify middle

**Find mode and range (1-2 marks):**
- Mode: most frequent value
- Range: highest - lowest

**Missing value (3 marks):**
- Calculate total needed
- Find sum of known values
- Subtract

**Frequency tables (3-4 marks):**
- Multiply value × frequency
- Show all calculations
- Divide by total frequency

**Method for Mean:**

Template for full marks:
"Sum = 4 + 7 + 5 + 9 + 10 = 35
Number of values = 5
Mean = 35 ÷ 5 = 7"

**Show THREE lines:**
1. Sum = ... = total
2. Count = ...
3. Mean = total ÷ count = answer

Even if calculation wrong, get 2/3 marks for method!

**Method for Median:**

Template:
"In order: 2, 3, 5, 7, 9
Middle value = 5
Median = 5"

**Must show:**
1. Data in order
2. Identify middle
3. State median

**Method for Frequency Table Mean:**

Template:
"1×3 = 3
 2×5 = 10
 3×2 = 6
Sum = 19

Total frequency = 3+5+2 = 10
Mean = 19 ÷ 10 = 1.9"

**Show:**
1. Each value × frequency
2. Sum these products
3. Total frequency
4. Divide

**Reading Charts:**

**Bar chart:**
- Use ruler to read height accurately
- Check scale (goes up in 1s, 2s, 5s, 10s?)
- Read from top of bar

**Pie chart:**
- Use protractor if finding angles
- Formula: Frequency = (angle ÷ 360) × total
- Check: all frequencies add to total

**Calculator Use:**

For mean:
- Add all values
- Divide by count

For median with many values:
- Still need to order (write out!)
- Use position formula: (n+1)÷2

Don't just write calculator answer - show working!

**Time Management:**

- Mean: 2-3 minutes
- Median: 2-3 minutes
- Mode/Range: 1 minute
- Frequency table: 4-5 minutes
- Chart reading: 2-3 minutes

**Common Exam Wording:**

- "Find the mean" = calculate sum÷count
- "Find the median" = middle when ordered
- "Most common" = mode
- "Calculate the range" = highest - lowest
- "Estimate the mean" = grouped data, use midpoints
- "From the table/chart" = extract data first

**Grade 5 Requirements:**

Must master:
✓ Calculating mean with working
✓ Finding median (order first!)
✓ Identifying mode and range
✓ Mean from frequency tables
✓ Missing value problems
✓ Reading and interpreting charts

**Quick Checks:**

Before submitting:
✓ Median: Did I order the data?
✓ Mean: Did I show sum and division?
✓ Mode: Is it the value (not the frequency)?
✓ Range: Did I subtract (not add)?
✓ Frequency: Did I multiply value×frequency?
✓ Answer sensible (between min and max)?

**Memory Aids:**

**"The 3 Ms":**
- **M**ean = add all, divide by count
- **M**edian = middle (order first!)
- **M**ode = most common

**For Frequency Tables:**
"**M**ultiply, **A**dd, **D**ivide" (MAD)
- Multiply value × frequency
- Add these products
- Divide by total frequency

**Comparing Data Sets:**

If asked "which set has more variation?":
- Calculate both ranges
- Larger range = more variation

If asked "which is more consistent?":
- Smaller range = more consistent

**Practice Priority:**

Worth 8-12 marks per paper!

Focus on:
1. Mean with full working (most marks)
2. Median (common, easy marks)
3. Frequency tables (Grade 4-5)
4. Missing value problems (Grade 5)

**Top Tips for Full Marks:**

1. **Always show working** - even wrong answer gets method marks
2. **For median: write ordered list** - proves you ordered it
3. **Check answer is sensible** - between min and max values
4. **Units**: if data has units (cm, £, etc.), include in answer
5. **Frequency tables: show multiplication** before adding

Master averages = easy exam marks every time!
`
  },

  // ==================== MODULE 14: PERIMETER, AREA & VOLUME ====================
  {
    moduleNumber: 14,
    title: 'Perimeter, Area & Volume',
    duration: '80 minutes',
    introduction: 'Master calculating perimeter (distance around), area (space inside), and volume (space in 3D). Learn formulas for rectangles, triangles, circles, prisms, and cylinders. This topic is worth 10-15 marks per paper - essential for Grade 5!',
    
    keyPoints: [
      'Perimeter = add all sides (distance around the outside)',
      'Area of rectangle = length × width',
      'Area of triangle = ½ × base × height',
      'Area of circle = πr² (π × radius × radius)',
      'Volume of cuboid = length × width × height',
      'Volume of cylinder = πr²h (area of circle × height)',
      'Always include units: cm, cm², cm³'
    ],
    
    explanation: `
**PERIMETER**

Perimeter is the distance around the OUTSIDE of a shape.

**How to find perimeter:**
Add up all the side lengths

**Rectangle:**
Perimeter = 2 × (length + width)
Or: add all 4 sides

**Example:** Rectangle 5cm × 3cm
Perimeter = 5 + 3 + 5 + 3 = 16cm
Or: 2(5 + 3) = 2(8) = 16cm

**Triangle:**
Perimeter = side₁ + side₂ + side₃

**Example:** Triangle with sides 4cm, 5cm, 6cm
Perimeter = 4 + 5 + 6 = 15cm

**Circle - Circumference:**
The perimeter of a circle is called CIRCUMFERENCE.

**Formula:**
**Circumference = π × diameter**
**C = πd**

Or: **C = 2πr** (where r = radius)

**Example:** Circle radius 7cm
C = 2πr = 2 × π × 7 = 14π = 44cm (rounded)

**Key:** diameter = 2 × radius

**AREA**

Area is the amount of space INSIDE a shape (2D).

**Units:** cm², m², mm² (always squared!)

**Rectangle/Square:**

**Area = length × width**
**A = l × w**

**Example:** Rectangle 8cm × 5cm
A = 8 × 5 = 40cm²

**Triangle:**

**Area = ½ × base × height**
**A = ½bh**

⚠️ Height must be perpendicular (at right angle) to base!

**Example:** Triangle, base 10cm, height 6cm
A = ½ × 10 × 6 = ½ × 60 = 30cm²

**Parallelogram:**

**Area = base × perpendicular height**
**A = bh**

Same as rectangle, but height must be perpendicular!

**Trapezium:**

**Area = ½(a + b)h**

Where a and b are parallel sides, h is height

**Example:** Trapezium, parallel sides 8cm and 6cm, height 5cm
A = ½(8 + 6) × 5 = ½ × 14 × 5 = 7 × 5 = 35cm²

**Circle:**

**Area = π × radius²**
**A = πr²**

⚠️ Must square the radius!

**Example:** Circle radius 4cm
A = π × 4² = π × 16 = 16π = 50.3cm² (1dp)

**Using π:**
- Leave as π for exact answer: 16π cm²
- Or use calculator π button: 50.27cm²
- Or use π ≈ 3.14 or π ≈ 22/7 if told

**Compound Shapes:**

Break into simpler shapes, find each area, then add or subtract.

**Example:** L-shape
Split into two rectangles:
- Rectangle 1: 5×3 = 15cm²
- Rectangle 2: 2×4 = 8cm²
- Total: 15 + 8 = 23cm²

**VOLUME**

Volume is the amount of space inside a 3D shape.

**Units:** cm³, m³, mm³ (always cubed!)

**Cuboid (rectangular box):**

**Volume = length × width × height**
**V = l × w × h**

**Example:** Cuboid 6cm × 4cm × 3cm
V = 6 × 4 × 3 = 72cm³

**Cube:**
All sides equal

**Volume = side³**
**V = s³**

**Example:** Cube with side 5cm
V = 5³ = 5 × 5 × 5 = 125cm³

**Prism:**
Same cross-section all the way through

**Volume = area of cross-section × length**
**V = A × l**

**Example:** Triangular prism
Triangle base 6cm, height 4cm, prism length 10cm
Area of triangle = ½ × 6 × 4 = 12cm²
Volume = 12 × 10 = 120cm³

**Cylinder:**
Circular prism

**Volume = π × radius² × height**
**V = πr²h**

**Example:** Cylinder radius 3cm, height 10cm
V = π × 3² × 10 = π × 9 × 10 = 90π = 283cm³ (3sf)

**KEY FORMULAS SUMMARY:**

**Perimeter:**
- Rectangle: 2(l + w)
- Circle: 2πr or πd

**Area:**
- Rectangle: l × w
- Triangle: ½bh
- Circle: πr²
- Trapezium: ½(a+b)h

**Volume:**
- Cuboid: l × w × h
- Prism: area × length
- Cylinder: πr²h

**UNITS:**

**Length:** cm, m, mm (to the power 1)
**Area:** cm², m², mm² (to the power 2)
**Volume:** cm³, m³, mm³ (to the power 3)

**Converting Units:**

**Length:**
1m = 100cm
1cm = 10mm

**Area:**
1m² = 100cm × 100cm = 10,000cm²
1cm² = 10mm × 10mm = 100mm²

**Volume:**
1m³ = 100cm × 100cm × 100cm = 1,000,000cm³
1cm³ = 10mm × 10mm × 10mm = 1000mm³

**Common Questions:**

**Finding missing dimensions:**

If you know area and one dimension, divide to find other:
Area = 40cm², width = 5cm, find length
Length = 40 ÷ 5 = 8cm

**Comparing areas/volumes:**

Scale factor for length = k
Scale factor for area = k²
Scale factor for volume = k³

**Example:** Double the radius of circle
Area becomes 2² = 4 times bigger!

**Surface Area:**

Total area of all faces of a 3D shape.

**Cuboid surface area:**
2(lw + lh + wh)

Or: Find area of each face and add

**Cylinder surface area:**
2πr² + 2πrh
(Two circles + curved surface)
`,
    
    examples: [
      {
        question: 'Find the perimeter of a rectangle with length 12cm and width 7cm.',
        workingOut: `Method 1: Add all sides
Rectangle has 4 sides:
- Two lengths: 12cm each
- Two widths: 7cm each

Perimeter = 12 + 7 + 12 + 7
         = 19 + 19
         = 38cm

Method 2: Use formula
Perimeter = 2(length + width)
         = 2(12 + 7)
         = 2(19)
         = 2 × 19
         = 38cm

Answer: 38cm

Remember to include units (cm)!`,
        answer: '38cm',
        explanation: 'Perimeter = distance around shape = add all sides. Rectangle: opposite sides equal. So 12+7+12+7 = 38cm. Or use formula: 2(l+w) = 2(12+7) = 2×19 = 38cm. ALWAYS include units! Both methods acceptable - formula often quicker.'
      },
      {
        question: 'Calculate the area of a triangle with base 8cm and perpendicular height 5cm.',
        workingOut: `Step 1: Write formula
Area of triangle = ½ × base × height
A = ½bh

Step 2: Identify values
Base (b) = 8cm
Height (h) = 5cm

Step 3: Substitute into formula
A = ½ × 8 × 5

Step 4: Calculate
A = ½ × 40
A = 20

Step 5: Include units (squared for area!)
A = 20cm²

Answer: 20cm²

Check: Triangle area < rectangle area (8×5=40) ✓
      Half of 40 = 20 ✓`,
        answer: '20cm²',
        explanation: 'Triangle area = ½ × base × height. Given base=8cm, height=5cm. Area = ½×8×5 = ½×40 = 20cm². Must use squared units (cm²) for area! Height must be perpendicular (right angle) to base - common exam trap. Show formula, substitution, calculation for full marks.'
      },
      {
        question: 'Find the area of a circle with radius 6cm. Give answer in terms of π.',
        workingOut: `Step 1: Write formula
Area of circle = πr²
A = πr²

Step 2: Identify radius
r = 6cm

Step 3: Substitute into formula
A = π × 6²

Step 4: Square the radius (IMPORTANT!)
6² = 6 × 6 = 36

Step 5: Calculate
A = π × 36
A = 36π

Step 6: Include units
A = 36π cm²

Answer: 36π cm²

If asked for decimal:
36π = 36 × 3.14159...
    = 113.1 cm² (1dp)

But "in terms of π" means leave as 36π!`,
        answer: '36π cm² (or 113.1 cm²)',
        explanation: 'Circle area = πr². With r=6: A = π×6² = π×36 = 36π cm². "In terms of π" means leave π in answer (36π). For decimal, use calculator: 36π ≈ 113.1cm². MUST square radius - common mistake to just multiply by 6! Always check: squared units for area.'
      },
      {
        question: 'Calculate the volume of a cuboid with length 10cm, width 4cm, height 3cm.',
        workingOut: `Step 1: Write formula
Volume of cuboid = length × width × height
V = l × w × h

Step 2: Identify dimensions
Length (l) = 10cm
Width (w) = 4cm
Height (h) = 3cm

Step 3: Substitute into formula
V = 10 × 4 × 3

Step 4: Calculate (can multiply in any order)
V = 40 × 3
V = 120

Step 5: Include units (cubed for volume!)
V = 120cm³

Answer: 120cm³

Note: cm³ means "cubic centimeters"
Can be written as "120 centimeters cubed"`,
        answer: '120cm³',
        explanation: 'Cuboid volume = length × width × height. Given 10cm, 4cm, 3cm: V = 10×4×3 = 120cm³. Must use cubed units (cm³) for volume - represents 3D space! Multiply all three dimensions. Show formula and substitution for method marks. Any multiplication order works: 10×4×3 = 40×3 = 120.'
      },
      {
        question: 'Find the volume of a cylinder with radius 5cm and height 8cm. Use π = 3.14',
        workingOut: `Step 1: Write formula
Volume of cylinder = πr²h
V = πr²h

Step 2: Identify values
Radius (r) = 5cm
Height (h) = 8cm
π = 3.14

Step 3: Substitute into formula
V = 3.14 × 5² × 8

Step 4: Square the radius first
5² = 25

Step 5: Substitute back
V = 3.14 × 25 × 8

Step 6: Calculate
V = 78.5 × 8
V = 628

Step 7: Include units
V = 628cm³

Answer: 628cm³

Or in terms of π:
V = π × 25 × 8 = 200π cm³`,
        answer: '628cm³ (or 200π cm³)',
        explanation: 'Cylinder volume = πr²h = (area of circle) × height. With r=5, h=8: V = π×5²×8 = π×25×8 = 200π. Using π=3.14: 200×3.14 = 628cm³. Remember: square radius first (5²=25), then multiply by π and height. Cubed units for volume!'
      },
      {
        question: 'Trapezium area: parallel sides 8cm and 12cm, height 5cm',
        workingOut: `Formula: A = ½(a+b)h

Step 1: a=8, b=12, h=5
Step 2: A = ½(8+12)×5 = ½×20×5 = 50cm²

Answer: 50cm²`,
        answer: '50cm²',
        explanation: 'Trapezium: A=½(a+b)h where a,b are parallel sides. A=½(8+12)×5=½×20×5=50cm².'
      },
      {
        question: 'Sphere volume: radius 3cm, use π=3.14',
        workingOut: `Formula: V = 4/3πr³

Step 1: r³ = 3³ = 27
Step 2: V = 4/3×3.14×27 = 113.04cm³

Answer: 113cm³`,
        answer: '113cm³',
        explanation: 'Sphere: V=4/3πr³. With r=3: V=4/3×π×27≈113cm³. Cube radius first!'
      },
      {
        question: 'Compound shape: Rectangle 10×6 with semicircle (diameter 6) on top',
        workingOut: `Step 1: Rectangle area = 10×6 = 60cm²
Step 2: Semicircle area = ½πr² = ½π×3² = 14.13cm²
Step 3: Total = 60+14.13 = 74.13cm²

Answer: 74cm²`,
        answer: '74cm²',
        explanation: 'Compound: split into rectangle + semicircle. Rectangle=60, semicircle≈14, total≈74cm².'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Perimeter of square with side 9cm?',
        options: ['36cm', '18cm', '81cm²', '9cm'],
        answer: '36cm',
        explanation: 'Square: 4 equal sides. Perimeter = 4×9 = 36cm. Or add: 9+9+9+9 = 36cm',
        difficulty: 'easy'
      },
      {
        question: 'Area of rectangle 6cm × 4cm?',
        options: ['24cm²', '20cm', '10cm²', '24cm'],
        answer: '24cm²',
        explanation: 'Area = length × width = 6×4 = 24cm². Squared units for area!',
        difficulty: 'easy'
      },
      {
        question: 'What is πr² the formula for?',
        options: ['Area of circle', 'Circumference', 'Volume of cylinder', 'Area of rectangle'],
        answer: 'Area of circle',
        explanation: 'πr² = area of circle. 2πr = circumference. πr²h = cylinder volume.',
        difficulty: 'easy'
      },
      {
        question: 'Triangle area: base 10cm, height 4cm?',
        options: ['20cm²', '40cm²', '14cm', '10cm²'],
        answer: '20cm²',
        explanation: 'Triangle area = ½×base×height = ½×10×4 = ½×40 = 20cm²',
        difficulty: 'medium'
      },
      {
        question: 'Circumference with radius 7cm? (Use π)',
        options: ['14π cm', '49π cm', '7π cm', '14π cm²'],
        answer: '14π cm',
        explanation: 'C = 2πr = 2×π×7 = 14π cm. NOT squared (circumference is length, not area)',
        difficulty: 'medium'
      },
      {
        question: 'Volume of cube with side 4cm?',
        options: ['64cm³', '16cm²', '48cm³', '12cm'],
        answer: '64cm³',
        explanation: 'Cube: V = side³ = 4³ = 4×4×4 = 64cm³. Cubed units!',
        difficulty: 'medium'
      },
      {
        question: 'Which units for area?',
        options: ['cm²', 'cm', 'cm³', 'm'],
        answer: 'cm²',
        explanation: 'Area = 2D = squared units (cm², m², mm²). Volume = cubed (cm³)',
        difficulty: 'easy'
      },
      {
        question: 'Rectangle area 40cm², width 5cm. Length?',
        options: ['8cm', '35cm', '200cm', '45cm'],
        answer: '8cm',
        explanation: 'Area = l×w. So l = area÷width = 40÷5 = 8cm',
        difficulty: 'medium'
      },
      {
        question: 'Trapezium area: parallel sides 6,10cm, height 4cm?',
        options: ['32cm²', '64cm²', '16cm²', '240cm²'],
        answer: '32cm²',
        explanation: 'Trapezium: A = ½(a+b)h = ½(6+10)×4 = ½×16×4 = 8×4 = 32cm²',
        difficulty: 'hard'
      },
      {
        question: 'Cylinder: radius 3cm, height 5cm. Volume? (Use π)',
        options: ['45π cm³', '15π cm³', '9π cm³', '45π cm²'],
        answer: '45π cm³',
        explanation: 'V = πr²h = π×3²×5 = π×9×5 = 45π cm³. Cubed units!',
        difficulty: 'hard'
      }
    ],
    
    tips: [
      '⭐ Perimeter = add sides (cm), Area = space inside (cm²), Volume = 3D space (cm³)',
      '⭐ For circles: πr² for area, 2πr for circumference',
      '⭐ Triangle area: ½bh - height must be perpendicular!',
      '⭐ Always square radius in circle area: πr² not πr!',
      '⭐ Show formula first, then substitute, then calculate',
      '⭐ ALWAYS include units and check if squared or cubed',
      '⭐ Compound shapes: split into rectangles/triangles, add areas',
      '⭐ Cylinder = circle × height: πr²h'
    ],
    
    commonMistakes: [
      '❌ Using cm when should be cm² (area) or cm³ (volume)',
      '❌ Forgetting to square radius in circle formulas: πr not πr²',
      '❌ Using diameter instead of radius (or vice versa)',
      '❌ Adding instead of multiplying for area/volume',
      '❌ For triangle: using slant height instead of perpendicular height',
      '❌ Not halving for triangle area (writing bh instead of ½bh)',
      '❌ For compound shapes: not labeling which area is which',
      '❌ Confusing perimeter (add) with area (multiply)'
    ],
    
    examStrategy: `
**Question Types & Marks:**

**Perimeter (2 marks):**
- Add all sides
- Include units (cm, m)

**Rectangle/triangle area (2-3 marks):**
- State formula
- Substitute values
- Calculate with units (cm²)

**Circle problems (3-4 marks):**
- Identify if radius or diameter
- Use correct formula
- Show working
- Leave as π or calculate

**Volume (3-4 marks):**
- State formula
- Substitute all dimensions
- Include cubed units (cm³)

**Compound shapes (4-5 marks):**
- Split into simple shapes
- Find each area separately
- Add or subtract
- Show all working

**Method for Rectangle Area:**

Template:
"Area = length × width
A = 12 × 5
A = 60cm²"

**Method for Triangle Area:**

Template:
"Area = ½ × base × height
A = ½ × 8 × 6
A = ½ × 48
A = 24cm²"

**Method for Circle Area:**

Template:
"Area = πr²
A = π × 5²
A = π × 25
A = 25π cm²
or 78.5cm²"

**Method for Cylinder Volume:**

Template:
"Volume = πr²h
V = π × 3² × 10
V = π × 9 × 10
V = 90π cm³
or 283cm³"

**Units Checklist:**

✓ Length (perimeter, circumference): cm, m
✓ Area: cm², m² (SQUARED)
✓ Volume: cm³, m³ (CUBED)

**Wrong units = lose mark!**

**Circle Problems:**

**Given radius:**
- Use r directly in formulas

**Given diameter:**
- Find radius first: r = d ÷ 2
- Then use formulas

**"In terms of π":**
- Leave π symbol in answer
- Example: 25π cm²

**"Give answer to 1dp":**
- Use calculator π button
- Round at end only
- Example: 78.5 cm²

**Compound Shapes Strategy:**

1. **Draw lines** to split shape
2. **Label each section** (A, B, C)
3. **Find each area:**
   - Section A = ...
   - Section B = ...
4. **Total = A + B** (or A - B if subtracting)
5. **Show all working**

**Example:**
"Section A (rectangle): 5×3 = 15cm²
Section B (rectangle): 4×2 = 8cm²
Total area = 15 + 8 = 23cm²"

**Calculator Use:**

**Can use for:**
- Multiplying dimensions
- Calculating π values
- Squaring/cubing numbers

**Still show working:**
"V = 6 × 4 × 3
V = 72cm³"

Even if using calculator!

**Time Management:**

- Simple perimeter/area: 2-3 minutes
- Circle problems: 3-4 minutes
- Volume: 3-4 minutes
- Compound shapes: 5-6 minutes

**Common Exam Wording:**

- "Calculate the area" = use area formula
- "Find the perimeter" = add all sides
- "Work out the volume" = use volume formula
- "Give answer in terms of π" = leave π in
- "Give answer to 3sf" = use calculator π
- "The diagram shows..." = extract measurements
- "Hence find" = use previous answer

**Grade 5 Requirements:**

Must master:
✓ Rectangle and triangle area
✓ Circle area and circumference
✓ Perimeter of compound shapes
✓ Volume of cuboids and prisms
✓ Cylinder volume
✓ Using correct units (cm, cm², cm³)
✓ Working with π (exact and decimal)

**Quick Formula Reference:**

**2D (Area):**
- Rectangle: lw
- Triangle: ½bh
- Circle: πr²
- Trapezium: ½(a+b)h

**3D (Volume):**
- Cuboid: lwh
- Prism: area × length
- Cylinder: πr²h

**Perimeter:**
- Add all sides
- Circle: 2πr

**Checking Your Answer:**

**Perimeter:**
- Bigger than any one side? ✓
- Roughly 2× (length + width) for rectangle? ✓

**Area:**
- Bigger than length and width separately? ✓
- Squared units used? ✓

**Volume:**
- Bigger than any area? ✓
- Cubed units used? ✓

**Converting Units:**

**If given mixed units:**
Example: length 2m, width 50cm
Convert to same units first!
2m = 200cm
Then: Area = 200 × 50 = 10,000cm²

**Practice Priority:**

Worth 10-15 marks per paper!

Focus on:
1. Rectangle/triangle area (most common)
2. Circle area and circumference (regular)
3. Volume of cuboids (common)
4. Compound shapes (Grade 4-5)
5. Cylinders (Grade 5)

**Memory Aid:**

**"PAV"** for units:
- **P**erimeter = cm (no power)
- **A**rea = cm² (power 2)
- **V**olume = cm³ (power 3)

**Top Scoring Tips:**

1. **Write formula first** - gets method marks
2. **Show substitution** - proves you used correct values
3. **Include units** - wrong units loses mark
4. **Square/cube correctly** - common error
5. **Check answer sensible** - catch silly errors

Master area, perimeter, volume = 10+ marks per paper!
`
  },

  // ==================== MODULE 15: BASIC ALGEBRA (FINAL MODULE!) ====================
  {
    moduleNumber: 15,
    title: 'Basic Algebra (Expressions & Equations)',
    duration: '75 minutes',
    introduction: 'Master the fundamentals of algebra! Learn to simplify expressions, expand brackets, factorize, and solve linear equations. Algebra appears throughout Foundation papers and is essential for Grade 5. This is your final Foundation module - let\'s finish strong!',
    
    keyPoints: [
      'Simplify by collecting like terms (e.g., 3x + 2x = 5x)',
      'Expand brackets by multiplying everything inside (e.g., 3(x + 2) = 3x + 6)',
      'Factorize by taking out common factors (reverse of expanding)',
      'Solve equations: do same to both sides to isolate x',
      'Substitute values into formulas and expressions',
      'x × x = x², not 2x! Be careful with powers'
    ],
    
    explanation: `
**What is Algebra?**

Algebra uses letters (like x, y, a, b) to represent unknown numbers.

**Key Terms:**

- **Variable:** A letter representing a number (x, y, etc.)
- **Expression:** A combination of numbers and variables (3x + 5)
- **Equation:** Two expressions that are equal (2x + 3 = 11)
- **Term:** Parts separated by + or - (in 3x + 5, terms are 3x and 5)
- **Coefficient:** The number before a variable (in 3x, coefficient is 3)

**1. SIMPLIFYING EXPRESSIONS**

**Collecting Like Terms:**

Only add/subtract terms that are the SAME.

**Like terms:** Same letter, same power
- 3x and 5x are like terms → 3x + 5x = 8x
- x² and 3x² are like terms → x² + 3x² = 4x²

**Not like terms:** Different letters or powers
- 3x and 5y are NOT like → cannot combine
- x² and x are NOT like → cannot combine

**Example 1:** Simplify 5x + 3x
Both have x → like terms
5x + 3x = 8x

**Example 2:** Simplify 7a - 2a + 4
7a - 2a = 5a
Cannot combine with 4 (no letter)
Answer: 5a + 4

**Example 3:** Simplify 3x + 2y + 4x - y
Collect x terms: 3x + 4x = 7x
Collect y terms: 2y - y = y
Answer: 7x + y

**Example 4:** Simplify 2x² + 5x + 3x² - 2x
x² terms: 2x² + 3x² = 5x²
x terms: 5x - 2x = 3x
Answer: 5x² + 3x

**Key Rule:** x means 1x (coefficient is 1)

**2. MULTIPLYING TERMS**

**Numbers and letters multiply:**

3 × x = 3x
x × 5 = 5x
2 × 3x = 6x

**Letters multiply:**

x × x = x² (NOT 2x!)
x × y = xy
2x × 3 = 6x
2x × 3x = 6x²

**Example 1:** 4 × 3x = 12x
**Example 2:** x × x = x²
**Example 3:** 2x × 5 = 10x
**Example 4:** 3x × 4x = 12x²

**3. EXPANDING BRACKETS**

Multiply everything inside the bracket by what's outside.

**Single brackets:**

**a(b + c) = ab + ac**

**Example 1:** 3(x + 2)
= 3 × x + 3 × 2
= 3x + 6

**Example 2:** 5(2x - 3)
= 5 × 2x + 5 × (-3)
= 10x - 15

**Example 3:** x(x + 4)
= x × x + x × 4
= x² + 4x

**Example 4:** -2(x - 5)
= -2 × x + (-2) × (-5)
= -2x + 10

**Watch negatives!** -2 × -5 = +10

**Expanding and simplifying:**

**Example:** Expand and simplify 3(x + 2) + 2(x + 1)
Step 1: Expand both brackets
= 3x + 6 + 2x + 2
Step 2: Collect like terms
= 5x + 8

**4. FACTORIZING**

Take out common factors (reverse of expanding).

**Find highest common factor (HCF) and put outside bracket.**

**Example 1:** 6x + 9
HCF of 6 and 9 = 3
= 3(2x + 3)

**Example 2:** 4x + 12
HCF = 4
= 4(x + 3)

**Example 3:** 3x² + 6x
HCF = 3x (both have 3 and x)
= 3x(x + 2)

**Check by expanding:**
3x(x + 2) = 3x² + 6x ✓

**5. SOLVING EQUATIONS**

Find the value of x that makes the equation true.

**Golden Rule: Do the same to both sides!**

**Example 1:** Solve x + 5 = 12

Get x on its own:
x + 5 = 12
Subtract 5 from both sides:
x = 12 - 5
x = 7

Check: 7 + 5 = 12 ✓

**Example 2:** Solve x - 3 = 10

Add 3 to both sides:
x = 10 + 3
x = 13

Check: 13 - 3 = 10 ✓

**Example 3:** Solve 3x = 15

Divide both sides by 3:
x = 15 ÷ 3
x = 5

Check: 3 × 5 = 15 ✓

**Example 4:** Solve x/4 = 6

Multiply both sides by 4:
x = 6 × 4
x = 24

Check: 24 ÷ 4 = 6 ✓

**Two-step equations:**

**Example 5:** Solve 2x + 3 = 11

Step 1: Subtract 3 from both sides
2x = 11 - 3
2x = 8

Step 2: Divide both sides by 2
x = 8 ÷ 2
x = 4

Check: 2(4) + 3 = 8 + 3 = 11 ✓

**Example 6:** Solve 5x - 7 = 18

Step 1: Add 7 to both sides
5x = 18 + 7
5x = 25

Step 2: Divide both sides by 5
x = 25 ÷ 5
x = 5

Check: 5(5) - 7 = 25 - 7 = 18 ✓

**Strategy:**
1. Get x terms on one side
2. Get numbers on other side
3. Divide/multiply to isolate x

**6. SUBSTITUTION**

Replace letters with numbers.

**Example 1:** If x = 3, find 5x + 2
= 5 × 3 + 2
= 15 + 2
= 17

**Example 2:** If a = 4 and b = 7, find 3a + 2b
= 3 × 4 + 2 × 7
= 12 + 14
= 26

**Example 3:** If x = 2, find x² + 3x
= 2² + 3 × 2
= 4 + 6
= 10

**Use BIDMAS order!** (Brackets, Indices, Division/Multiplication, Addition/Subtraction)

**7. FORMULAS**

**Example:** Speed formula: s = d/t (speed = distance ÷ time)

If d = 120 and t = 4:
s = 120 ÷ 4 = 30

**Example:** Area of rectangle: A = lw

If l = 8 and w = 5:
A = 8 × 5 = 40

**Rearranging formulas:**

Make a different letter the subject.

**Example:** v = u + at, make u the subject

v = u + at
Subtract at from both sides:
v - at = u
So: u = v - at

**8. SEQUENCES**

Find the pattern and continue.

**Example:** 3, 7, 11, 15, ...

Pattern: +4 each time
Next terms: 19, 23

**nth term:**

Formula for any term in the sequence.

**Example:** Sequence 5, 8, 11, 14, ...

Goes up by 3 each time
nth term = 3n + 2

Check: n=1: 3(1)+2 = 5 ✓
       n=2: 3(2)+2 = 8 ✓
`,
    
    examples: [
      {
        question: 'Simplify: 5x + 3x - 2x',
        workingOut: `Step 1: Identify like terms
All terms have 'x' → all like terms

Step 2: Collect like terms
5x + 3x - 2x

Step 3: Add the x terms
5x + 3x = 8x

Step 4: Subtract 2x
8x - 2x = 6x

Answer: 6x

Alternative method (all at once):
5 + 3 - 2 = 6
So 5x + 3x - 2x = 6x

Check: If x = 1:
5(1) + 3(1) - 2(1) = 5 + 3 - 2 = 6 ✓`,
        answer: '6x',
        explanation: 'All terms are like terms (all have x). Add/subtract the coefficients: 5 + 3 - 2 = 6, so answer is 6x. Only combine terms with the SAME letter and SAME power. Remember: x means 1x. Common mistake: writing 6x² or 6 instead of 6x.'
      },
      {
        question: 'Expand: 4(x + 3)',
        workingOut: `Step 1: Write out what expanding means
Multiply everything inside bracket by 4

Step 2: Multiply first term
4 × x = 4x

Step 3: Multiply second term
4 × 3 = 12

Step 4: Write final answer
4(x + 3) = 4x + 12

Visual method:
   4(x  +  3)
    ↓     ↓
   4x  + 12

Check by substituting x = 2:
LHS: 4(2 + 3) = 4(5) = 20
RHS: 4(2) + 12 = 8 + 12 = 20 ✓`,
        answer: '4x + 12',
        explanation: 'Expanding brackets: multiply everything inside by what\'s outside. 4 × x = 4x, and 4 × 3 = 12. Answer: 4x + 12. Common mistake: only multiplying first term (writing 4x + 3). BOTH terms must be multiplied! Show multiplication clearly for method marks.'
      },
      {
        question: 'Factorize: 6x + 15',
        workingOut: `Step 1: Find HCF of 6 and 15
Factors of 6: 1, 2, 3, 6
Factors of 15: 1, 3, 5, 15
Common factors: 1, 3
Highest common factor = 3

Step 2: Divide each term by HCF
6x ÷ 3 = 2x
15 ÷ 3 = 5

Step 3: Write factorized form
HCF goes outside bracket:
= 3(2x + 5)

Step 4: Check by expanding
3(2x + 5) = 6x + 15 ✓

Answer: 3(2x + 5)`,
        answer: '3(2x + 5)',
        explanation: 'Factorizing is reverse of expanding. Find HCF of coefficients (6 and 15 = 3). Take out the 3: 6x + 15 = 3(2x + 5). Check: expand to verify you get original expression. Common mistake: taking out wrong factor or forgetting to divide all terms.'
      },
      {
        question: 'Solve: 2x + 5 = 17',
        workingOut: `Step 1: Get x terms on one side, numbers on other
Subtract 5 from both sides:
2x + 5 - 5 = 17 - 5
2x = 12

Step 2: Isolate x
Divide both sides by 2:
2x ÷ 2 = 12 ÷ 2
x = 6

Step 3: Check answer
Substitute x = 6 into original equation:
LHS: 2(6) + 5 = 12 + 5 = 17
RHS: 17
LHS = RHS ✓

Answer: x = 6`,
        answer: 'x = 6',
        explanation: 'Two-step equation: 1) Subtract 5 from both sides: 2x = 12. 2) Divide by 2: x = 6. ALWAYS do same to both sides! Check: 2(6)+5 = 12+5 = 17 ✓. Show each step clearly for method marks. Common mistakes: only doing operation on one side, or doing steps in wrong order.'
      },
      {
        question: 'If x = 4, find the value of 3x² - 5',
        workingOut: `Step 1: Write the expression
3x² - 5

Step 2: Substitute x = 4
= 3 × (4)² - 5

Step 3: Calculate power first (BIDMAS!)
4² = 4 × 4 = 16

Step 4: Substitute back
= 3 × 16 - 5

Step 5: Multiply
= 48 - 5

Step 6: Subtract
= 43

Answer: 43

Common mistake: 3x² ≠ (3x)²
3x² means 3 × x²
(3x)² would mean 3x × 3x = 9x²`,
        answer: '43',
        explanation: 'Substitution: replace x with 4. Calculate 3x² - 5 = 3×(4²) - 5 = 3×16 - 5 = 48 - 5 = 43. Remember BIDMAS: powers before multiply! x² means x×x, not 2×x. Show each step. Common error: calculating (3×4)² = 144 instead of 3×(4²) = 48.'
      },
      {
        question: 'Rearrange v=u+at to make t the subject',
        workingOut: `Step 1: v = u + at
Step 2: Subtract u: v - u = at
Step 3: Divide by a: (v-u)/a = t
Step 4: Write: t = (v-u)/a

Answer: t = (v-u)/a`,
        answer: 't = (v-u)/a',
        explanation: 'Rearranging: isolate t by inverse operations. Subtract u, then divide by a. Answer: t=(v-u)/a.'
      },
      {
        question: 'Nth term of 7,12,17,22...',
        workingOut: `Difference = +5
Pattern: 5n
Compare: 5n gives 5,10,15,20...
Actual: 7,12,17,22... (always 2 more)
nth term = 5n + 2

Answer: 5n + 2`,
        answer: '5n + 2',
        explanation: 'Common difference 5 → use 5n. But 5n gives 5,10,15... and we want 7,12,17... (2 more each time). So: 5n+2.'
      },
      {
        question: 'Solve by trial and improvement: x³=50 (answer to 1 d.p.)',
        workingOut: `Try x=3: 3³=27 (too small)
Try x=4: 4³=64 (too big)
Try x=3.5: 3.5³=42.875 (too small)
Try x=3.7: 3.7³=50.653 (too big)
Try x=3.6: 3.6³=46.656 (too small)
Try x=3.65: 3.6 5³=48.627 (too small)
Try x=3.68: 3.68³=49.836 (close!)

Answer: x ≈ 3.7`,
        answer: 'x ≈ 3.7',
        explanation: 'Trial & improvement: test values, narrow down. x³=50 → x≈3.7 (to 1 d.p.). Show all trials for method marks!'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Simplify: 7x + 2x',
        options: ['9x', '14x', '9x²', '7x + 2x'],
        answer: '9x',
        explanation: 'Like terms (both x): add coefficients 7+2 = 9x',
        difficulty: 'easy'
      },
      {
        question: 'What is x × x?',
        options: ['x²', '2x', 'x', 'x + x'],
        answer: 'x²',
        explanation: 'x × x = x². NOT 2x! x+x = 2x, but x×x = x²',
        difficulty: 'easy'
      },
      {
        question: 'Expand: 5(x + 2)',
        options: ['5x + 10', '5x + 2', 'x + 10', '5x + 7'],
        answer: '5x + 10',
        explanation: 'Multiply both terms: 5×x = 5x, 5×2 = 10. Answer: 5x + 10',
        difficulty: 'easy'
      },
      {
        question: 'Simplify: 3x + 2y + 4x',
        options: ['7x + 2y', '9xy', '5xy', '7x + 4y'],
        answer: '7x + 2y',
        explanation: 'Collect x terms: 3x+4x = 7x. y term stays: 2y. Answer: 7x + 2y',
        difficulty: 'medium'
      },
      {
        question: 'Solve: x + 7 = 15',
        options: ['8', '22', '15', '7'],
        answer: '8',
        explanation: 'Subtract 7 from both sides: x = 15 - 7 = 8',
        difficulty: 'easy'
      },
      {
        question: 'Solve: 3x = 21',
        options: ['7', '24', '18', '63'],
        answer: '7',
        explanation: 'Divide both sides by 3: x = 21 ÷ 3 = 7',
        difficulty: 'easy'
      },
      {
        question: 'Factorize: 4x + 8',
        options: ['4(x + 2)', '2(2x + 4)', 'x(4 + 8)', '4x + 8'],
        answer: '4(x + 2)',
        explanation: 'HCF = 4. Take out: 4(x + 2). Check: 4×x + 4×2 = 4x + 8 ✓',
        difficulty: 'medium'
      },
      {
        question: 'If x = 3, what is 5x?',
        options: ['15', '8', '53', '35'],
        answer: '15',
        explanation: 'Substitute: 5x = 5×3 = 15',
        difficulty: 'easy'
      },
      {
        question: 'Solve: 2x + 3 = 13',
        options: ['5', '8', '10', '16'],
        answer: '5',
        explanation: 'Subtract 3: 2x = 10. Divide by 2: x = 5',
        difficulty: 'medium'
      },
      {
        question: 'Expand: x(x + 5)',
        options: ['x² + 5x', '2x + 5', 'x² + 5', 'x + 5x'],
        answer: 'x² + 5x',
        explanation: 'x × x = x², x × 5 = 5x. Answer: x² + 5x',
        difficulty: 'hard'
      }
    ],
    
    tips: [
      '⭐ Only collect like terms - same letter AND same power',
      '⭐ x means 1x (coefficient is 1 when not written)',
      '⭐ x × x = x², NOT 2x! (x + x = 2x)',
      '⭐ Expanding: multiply ALL terms in bracket',
      '⭐ Equations: do same to both sides!',
      '⭐ Check answers by substituting back',
      '⭐ Factorizing: find HCF and put outside bracket',
      '⭐ Use BIDMAS when substituting (powers before multiply!)'
    ],
    
    commonMistakes: [
      '❌ Writing x × x = 2x (correct is x²)',
      '❌ Only expanding first term in bracket',
      '❌ Collecting unlike terms (e.g., adding 3x and 5y)',
      '❌ Forgetting negative signs when expanding',
      '❌ Only doing operation on one side of equation',
      '❌ Confusing x² with 2x',
      '❌ Not checking answer by substituting back',
      '❌ For substitution: calculating (3x)² instead of 3(x²)'
    ],
    
    examStrategy: `
**Question Types & Marks:**

**Simplify expression (2 marks):**
- Collect like terms
- Show working

**Expand brackets (2 marks):**
- Multiply all terms
- Simplify if needed

**Factorize (2 marks):**
- Find HCF
- Check by expanding

**Solve equation (2-3 marks):**
- Show each step
- Isolate x
- Check answer

**Substitution (2 marks):**
- Replace letters
- Calculate using BIDMAS

**Method for Simplifying:**

Template:
"3x + 5x + 2
= 8x + 2"

Show:
1. Identify like terms
2. Combine them
3. Keep unlike terms separate

**Method for Expanding:**

Template:
"3(x + 4)
= 3 × x + 3 × 4
= 3x + 12"

Show:
1. Multiply first term
2. Multiply second term
3. Write answer

**Method for Solving:**

Template:
"2x + 5 = 13
2x = 13 - 5    (subtract 5)
2x = 8
x = 4          (divide by 2)"

Show:
1. What operation you're doing
2. Each step separately
3. Final answer

**Key Rules:**

**Collecting terms:**
- 3x + 5x = 8x ✓
- 3x + 5y ≠ can't combine ✗
- x² + 3x ≠ can't combine ✗

**Multiplying:**
- 3 × x = 3x
- x × x = x²
- 2x × 3 = 6x
- 2x × 3x = 6x²

**Solving equations:**
- Add/subtract first
- Multiply/divide second
- Do same to both sides
- Check answer!

**Calculator Use:**

Usually NOT needed for algebra!

Can use for:
- Checking substitution
- Checking equation solutions

But show algebraic working!

**Time Management:**

- Simplify: 2 minutes
- Expand: 2 minutes
- Solve simple equation: 2-3 minutes
- Solve complex equation: 3-4 minutes
- Substitution: 2 minutes

**Common Exam Wording:**

- "Simplify" = collect like terms
- "Expand" = remove brackets
- "Expand and simplify" = expand then collect terms
- "Factorize" = put into brackets
- "Solve" = find value of x
- "Show your working" = write all steps
- "Find the value when x = ..." = substitution

**Grade 5 Requirements:**

Must master:
✓ Collecting like terms
✓ Expanding single brackets
✓ Factorizing with common factors
✓ Solving two-step equations
✓ Substitution into formulas
✓ Understanding x² vs 2x

**Checking Answers:**

**Simplifying:**
✓ Combined only like terms?
✓ No calculation errors?

**Expanding:**
✓ Multiplied ALL terms?
✓ Signs correct?
Check: Substitute x=1, both should equal

**Solving:**
✓ Substitute answer back
✓ LHS = RHS?

Example: If x = 5 in 2x + 3 = 13
Check: 2(5) + 3 = 10 + 3 = 13 ✓

**Factorizing:**
✓ Expand to check
✓ Get original expression?

**Quick Reference:**

**Like terms:**
- 3x and 5x → combine
- x² and 2x² → combine
- 3x and 5y → can't combine
- x² and x → can't combine

**Operations:**
- x + x = 2x
- x × x = x²
- x + x + x = 3x
- x × x × x = x³

**Solving priority:**
1. Expand brackets (if any)
2. Collect like terms
3. Add/subtract to move terms
4. Multiply/divide to isolate x

**Memory Aid:**

**"FACE" for algebra:**
- **F**actorize = take out common factors
- **A**dd = only add like terms
- **C**heck = substitute to verify
- **E**xpand = multiply everything in bracket

**Practice Priority:**

Algebra worth 10-15 marks per paper!

Focus on:
1. Simplifying (very common, easy marks)
2. Expanding brackets (regular)
3. Solving equations (worth 3+ marks)
4. Substitution (common, straightforward)
5. Factorizing (Grade 4-5)

**Top Scoring Tips:**

1. **Show every step** - method marks available
2. **Check by substituting** - catches errors
3. **Be careful with negatives** - common error source
4. **Write clearly** - x and × look similar
5. **Include "x =" in answer** - not just the number

**Final Reminders:**

- x × x = x² (not 2x!)
- Do same to both sides (equations)
- Multiply ALL terms (expanding)
- Check answers work!
- Show full working for marks

**🎉 CONGRATULATIONS! 🎉**

**You've completed all 15 Foundation modules!**

You now have comprehensive coverage of:
✓ Number skills & operations
✓ Fractions, decimals, percentages
✓ Ratio and proportion
✓ Algebra basics & equations
✓ Geometry & transformations
✓ Pythagoras & trigonometry
✓ Statistics & probability
✓ Area, perimeter & volume

**You're ready for Grade 5 Foundation!**

Master algebra = unlock all of maths! 🔓
`
  }
];

// Export the complete content array
export default gcseMathsFoundationContent;

