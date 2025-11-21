/**
 * A-Level Pure Mathematics - Complete Learning Content
 * Updated for 2025/2026 Academic Year
 * Covers: AQA 7357, Edexcel 9MA0, OCR A H240, OCR B MEI H640, WJEC
 * Target Grades: A-Star to E (focuses on A-Star and A techniques)
 */

import { LessonContent } from '../eleven-plus-content/verbal-reasoning-content';

const aLevelPureMathsContent: LessonContent[] = [
  // ==================== MODULE 1: ALGEBRA & FUNCTIONS ====================
  {
    moduleNumber: 1,
    title: 'Algebra & Functions',
    duration: '120 minutes',
    introduction: 'Master algebraic techniques essential for A-Level: polynomial division, partial fractions, binomial expansion, and solving complex equations. Foundation for all further A-Level topics!',
    
    keyPoints: [
      'Polynomial division: long division and synthetic division methods',
      'Factor theorem: if f(a) = 0, then (x-a) is a factor',
      'Remainder theorem: f(a) gives remainder when dividing by (x-a)',
      'Partial fractions: decompose rational functions A/(x+p) + B/(x+q)',
      'Binomial expansion: (a+b)ⁿ using nCr notation',
      'Discriminant: b²-4ac determines nature of roots',
      'Modulus functions: |x| graphs and equations'
    ],
    
    explanation: `
**POLYNOMIAL DIVISION**

Divide polynomials to simplify or find quotient and remainder.

**Long Division Method:**
Similar to arithmetic long division.

Example: Divide x³ + 2x² - 5x + 3 by x + 3

Result: x² - x - 2 remainder 9
Or: x³ + 2x² - 5x + 3 = (x+3)(x² - x - 2) + 9

**FACTOR THEOREM**

If f(a) = 0, then (x-a) is a factor of f(x)

Example: Show (x-2) is factor of f(x) = x³ - 6x² + 11x - 6
f(2) = 8 - 24 + 22 - 6 = 0 ✓
Therefore (x-2) is a factor

**PARTIAL FRACTIONS**

Decompose into simpler fractions:
(2x+5)/[(x+1)(x-2)] = A/(x+1) + B/(x-2)

Method:
1. Multiply through by denominator
2. Substitute clever values
3. Solve for A and B

**BINOMIAL EXPANSION**

(a+b)ⁿ = Σ nCr × aⁿ⁻ʳ × bʳ

For (1+x)ⁿ: 1 + nx + [n(n-1)/2!]x² + ...

Valid when |x| < 1

**MODULUS FUNCTIONS**

|x| = x if x ≥ 0
     -x if x < 0

Graph: V-shape
Equation solving: consider both cases
`,
    
    examples: [
      {
        question: 'Show that (x-1) is a factor of f(x) = x³ - 4x² + x + 6',
        workingOut: `Using Factor Theorem: if (x-1) is a factor, then f(1) = 0

f(1) = (1)³ - 4(1)² + (1) + 6
     = 1 - 4 + 1 + 6
     = 4

Wait, f(1) = 4 ≠ 0

Therefore (x-1) is NOT a factor!

Let's try (x-2):
f(2) = 8 - 16 + 2 + 6 = 0 ✓

So (x-2) IS a factor.`,
        answer: '(x-1) is NOT a factor; (x-2) is',
        explanation: 'Factor theorem: substitute value. If result = 0, it\'s a factor. Show working clearly!'
      },
      {
        question: 'Express in partial fractions: (5x-1)/[(x-1)(x+2)]',
        workingOut: `Let (5x-1)/[(x-1)(x+2)] = A/(x-1) + B/(x+2)

Multiply by (x-1)(x+2):
5x - 1 = A(x+2) + B(x-1)

Method: Substitute clever values

Let x = 1:
5(1) - 1 = A(3) + 0
4 = 3A
A = 4/3

Let x = -2:
5(-2) - 1 = 0 + B(-3)
-11 = -3B
B = 11/3

Answer: 4/3(x-1) + 11/3(x+2)

Check: Combine back to verify!`,
        answer: '4/(3(x-1)) + 11/(3(x+2))',
        explanation: 'Partial fractions: multiply through, substitute x values to eliminate terms, solve for constants'
      },
      {
        question: 'Find first 4 terms of (1+2x)⁶',
        workingOut: `Use binomial: (1+x)ⁿ = 1 + nx + [n(n-1)/2!]x² + [n(n-1)(n-2)/3!]x³ + ...

Here n=6, x replaced by 2x:

Term 1: 1
Term 2: 6(2x) = 12x
Term 3: [6×5/2](2x)² = 15×4x² = 60x²
Term 4: [6×5×4/6](2x)³ = 20×8x³ = 160x³

Answer: 1 + 12x + 60x² + 160x³

Check: All powers of (2x) raised correctly!`,
        answer: '1 + 12x + 60x² + 160x³',
        explanation: 'Binomial expansion: use nCr coefficients, remember to apply x correctly in each term'
      },
      {
        question: 'Solve |2x-3| = 5',
        workingOut: `Modulus equation: consider both cases

Case 1: 2x - 3 = 5
2x = 8
x = 4

Case 2: 2x - 3 = -5
2x = -2
x = -1

Check:
x=4: |2(4)-3| = |5| = 5 ✓
x=-1: |2(-1)-3| = |-5| = 5 ✓

Answer: x = 4 or x = -1`,
        answer: 'x = 4 or x = -1',
        explanation: 'Modulus equations: solve for both positive and negative cases, always check both solutions'
      },
      {
        question: 'Find nature of roots for 2x² + 3x + 5 = 0',
        workingOut: `Use discriminant: Δ = b² - 4ac

a = 2, b = 3, c = 5

Δ = (3)² - 4(2)(5)
  = 9 - 40
  = -31

Since Δ < 0:
Two complex conjugate roots (no real roots)

Answer: No real roots, two complex roots`,
        answer: 'Two complex conjugate roots (Δ = -31 < 0)',
        explanation: 'Discriminant: Δ>0 two real distinct, Δ=0 repeated real, Δ<0 complex conjugates'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Factor theorem uses which test?',
        options: ['f(a) = 0', 'f\'(a) = 0', 'f(0) = a', 'f(a) = 1'],
        answer: 'f(a) = 0',
        explanation: 'If f(a)=0 then (x-a) is factor',
        difficulty: 'easy'
      },
      {
        question: 'Discriminant < 0 means?',
        options: ['Complex roots', 'Real roots', 'Repeated roots', 'No roots'],
        answer: 'Complex roots',
        explanation: 'Δ < 0 gives two complex conjugate roots',
        difficulty: 'easy'
      },
      {
        question: 'Binomial (1+x)ⁿ valid when?',
        options: ['|x| < 1', '|x| > 1', 'All x', 'x > 0'],
        answer: '|x| < 1',
        explanation: 'Binomial expansion converges when |x| < 1',
        difficulty: 'medium'
      },
      {
        question: '|x| = -2 has how many solutions?',
        options: ['0', '1', '2', 'Infinite'],
        answer: '0',
        explanation: 'Modulus always ≥ 0, cannot equal negative',
        difficulty: 'easy'
      },
      {
        question: 'Partial fractions: denominator must be?',
        options: ['Factorized', 'Expanded', 'Squared', 'Linear'],
        answer: 'Factorized',
        explanation: 'Must factorize denominator first',
        difficulty: 'easy'
      },
      {
        question: 'Remainder when dividing by (x-a)?',
        options: ['f(a)', 'f(0)', 'a', '0'],
        answer: 'f(a)',
        explanation: 'Remainder theorem: f(a) gives remainder',
        difficulty: 'medium'
      },
      {
        question: 'First term in (1+x)ⁿ?',
        options: ['1', 'n', 'x', 'nx'],
        answer: '1',
        explanation: 'Binomial always starts with 1',
        difficulty: 'easy'
      },
      {
        question: 'Coefficient in binomial expansion?',
        options: ['nCr', 'nPr', 'n!', 'rⁿ'],
        answer: 'nCr',
        explanation: 'Use combinations nCr for coefficients',
        difficulty: 'medium'
      },
      {
        question: 'Modulus |x-3| < 2 means?',
        options: ['1 < x < 5', 'x < 2', 'x > 3', '-2 < x < 2'],
        answer: '1 < x < 5',
        explanation: '|x-3| < 2 means -2 < x-3 < 2, so 1 < x < 5',
        difficulty: 'hard'
      },
      {
        question: 'Quadratic has repeated root when?',
        options: ['Δ = 0', 'Δ > 0', 'Δ < 0', 'Δ = 1'],
        answer: 'Δ = 0',
        explanation: 'Discriminant = 0 gives repeated root',
        difficulty: 'easy'
      }
    ],
    
    tips: [
      '⭐ Factor theorem: always show f(a) = 0 calculation',
      '⭐ Partial fractions: check answer by combining back',
      '⭐ Binomial: remember |x| < 1 validity condition',
      '⭐ Modulus: ALWAYS solve both +ve and -ve cases',
      '⭐ Discriminant: learn all three cases (>, =, < 0)',
      '⭐ Polynomial division: check by multiplying back',
      '⭐ Show ALL working - method marks available!',
      '⭐ Practice past paper questions for exam technique'
    ],
    
    commonMistakes: [
      '❌ Not checking if value makes f(a) = 0 for factor theorem',
      '❌ Forgetting |x| < 1 condition for binomial',
      '❌ Only solving one case for modulus equations',
      '❌ Sign errors in partial fractions',
      '❌ Not simplifying binomial coefficients',
      '❌ Mixing up factor and remainder theorems',
      '❌ Incomplete factorization in partial fractions',
      '❌ Not showing working (lose method marks!)'
    ],
    
    examStrategy: `
**A-LEVEL ALGEBRA - EXAM STRATEGY**

**Common Question Types:**

1. **Factor/Remainder Theorem (4-6 marks)**
   - Show f(a) calculation
   - State conclusion clearly
   - Use for full factorization

2. **Partial Fractions (6-8 marks)**
   - Factorize denominator first
   - Show substitution method
   - Verify answer

3. **Binomial Expansion (5-7 marks)**
   - State validity condition
   - Show coefficient calculation
   - Simplify each term

4. **Modulus Equations (4-6 marks)**
   - Solve both cases
   - Check solutions
   - Sketch if asked

**Time Management:**
- Algebraic manipulation: 2 mins per mark
- Always show method
- Check answers when time permits

**Key Exam Boards:**
- **AQA**: Heavy on algebraic proof
- **Edexcel**: Mixed with other topics
- **OCR A**: Application questions
- **OCR MEI**: Problem-solving focus

**Grade Boundaries:**
- A*: 80%+ typically
- A: 70%+
- B: 60%+

**Top Tips:**
1. Learn all standard forms
2. Practice mixed questions
3. Show method always
4. Check discriminant for roots
5. Verify partial fractions

This topic worth 10-15% of A-Level Pure Maths!
`
  },

  // ==================== MODULE 2: COORDINATE GEOMETRY ====================
  {
    moduleNumber: 2,
    title: 'Coordinate Geometry',
    duration: '100 minutes',
    introduction: 'Master equations of straight lines, circles, and perpendicular/parallel lines. Essential for mechanics and further calculus!',
    keyPoints: ['y = mx + c form', 'ax + by + c = 0 form', 'Parallel: same gradient', 'Perpendicular: m₁ × m₂ = -1', 'Circle: (x-a)² + (y-b)² = r²', 'Midpoint formula', 'Distance formula'],
    explanation: 'Coordinate geometry links algebra with geometry. Master line equations, gradients, and circle equations for A-Level success.',
    examples: [
      {question: 'Find equation of line through (2,3) with gradient 4', workingOut: 'y - y₁ = m(x - x₁)\ny - 3 = 4(x - 2)\ny = 4x - 5', answer: 'y = 4x - 5', explanation: 'Use point-gradient form then rearrange'},
      {question: 'Are 2x + 3y = 5 and 3x - 2y = 7 perpendicular?', workingOut: 'm₁ = -2/3, m₂ = 3/2\nm₁ × m₂ = -1 ✓', answer: 'Yes', explanation: 'Product of gradients = -1 confirms perpendicular'},
      {question: 'Find center and radius of x² + y² - 6x + 4y - 3 = 0', workingOut: 'Complete square:\n(x-3)² + (y+2)² = 16\nCenter (3,-2), r=4', answer: 'Center (3,-2), radius 4', explanation: 'Complete square for both x and y'},
      {question: 'Distance between (1,2) and (4,6)', workingOut: 'd = √[(4-1)² + (6-2)²] = √(9+16) = 5', answer: '5', explanation: 'Use distance formula'},
      {question: 'Midpoint of (2,5) and (8,1)', workingOut: 'M = ((2+8)/2, (5+1)/2) = (5, 3)', answer: '(5,3)', explanation: 'Average of coordinates'}
    ],
    practiceQuestions: [
      {question: 'Gradient of 3x + 4y = 12?', options: ['-3/4', '3/4', '-4/3', '4/3'], answer: '-3/4', explanation: 'Rearrange to y = -3x/4 + 3', difficulty: 'medium'},
      {question: 'Perpendicular to y = 2x + 1?', options: ['y = -x/2 + c', 'y = 2x + c', 'y = -2x + c', 'y = x/2 + c'], answer: 'y = -x/2 + c', explanation: 'm₁ × m₂ = -1, so 2 × (-1/2) = -1', difficulty: 'medium'}
    ],
    tips: ['⭐ Parallel: same m', '⭐ Perpendicular: m₁m₂ = -1', '⭐ Circle: complete square', '⭐ Always simplify'],
    commonMistakes: ['❌ Wrong perpendicular gradient', '❌ Sign errors completing square', '❌ Not simplifying final form'],
    examStrategy: 'Coordinate geometry: 8-12% of paper. Show all steps. Check perpendicular gradient carefully!'
  },

  // MODULE 3: SEQUENCES & SERIES
  {moduleNumber: 3, title: 'Sequences & Series', duration: '110 min', introduction: 'Arithmetic, geometric sequences, sum formulas, and sigma notation', keyPoints: ['Arithmetic: a + (n-1)d', 'Geometric: arⁿ⁻¹', 'Sum arithmetic: n/2[2a + (n-1)d]', 'Sum geometric: a(1-rⁿ)/(1-r)', 'Sigma notation'], explanation: 'Master sequence formulas and summation techniques', examples: [
    {question: 'Find 10th term of arithmetic sequence: 3, 7, 11, 15...', workingOut: 'Step 1: Identify sequence type\nArithmetic (common difference)\n\nStep 2: Find first term and difference\na = 3\nd = 7 - 3 = 4\n\nStep 3: Use nth term formula\nTₙ = a + (n-1)d\nT₁₀ = 3 + (10-1)×4\nT₁₀ = 3 + 9×4\nT₁₀ = 3 + 36\nT₁₀ = 39\n\nCheck: Continue pattern\n3, 7, 11, 15, 19, 23, 27, 31, 35, 39 ✓', answer: '39', explanation: 'Arithmetic: Tₙ = a + (n-1)d'},
    {question: 'Find sum of first 20 terms: 2, 5, 8, 11...', workingOut: 'Step 1: Identify values\na = 2, d = 3, n = 20\n\nStep 2: Use sum formula\nSₙ = n/2[2a + (n-1)d]\nS₂₀ = 20/2[2(2) + (20-1)(3)]\nS₂₀ = 10[4 + 19×3]\nS₂₀ = 10[4 + 57]\nS₂₀ = 10 × 61\nS₂₀ = 610\n\nAlternative formula:\nSₙ = n/2(first + last)\nT₂₀ = 2 + 19×3 = 59\nS₂₀ = 20/2(2 + 59) = 10×61 = 610 ✓', answer: '610', explanation: 'Use Sₙ = n/2[2a + (n-1)d] or Sₙ = n/2(first + last)'},
    {question: 'Find 8th term of geometric sequence: 2, 6, 18, 54...', workingOut: 'Step 1: Identify sequence type\nGeometric (common ratio)\n\nStep 2: Find first term and ratio\na = 2\nr = 6/2 = 3\n\nStep 3: Use nth term formula\nTₙ = arⁿ⁻¹\nT₈ = 2 × 3⁸⁻¹\nT₈ = 2 × 3⁷\nT₈ = 2 × 2187\nT₈ = 4374\n\nGeometric grows rapidly!', answer: '4374', explanation: 'Geometric: Tₙ = arⁿ⁻¹'},
    {question: 'Sum of geometric series: 3 + 6 + 12 + ... (10 terms)', workingOut: 'Step 1: Identify values\na = 3, r = 6/3 = 2, n = 10\n\nStep 2: Use sum formula\nSₙ = a(rⁿ - 1)/(r - 1)  [when r > 1]\nS₁₀ = 3(2¹⁰ - 1)/(2 - 1)\nS₁₀ = 3(1024 - 1)/1\nS₁₀ = 3 × 1023\nS₁₀ = 3069\n\nAlternative when r < 1:\nSₙ = a(1 - rⁿ)/(1 - r)\n\nBoth give same answer!', answer: '3069', explanation: 'Geometric sum: Sₙ = a(rⁿ - 1)/(r - 1) when r > 1'},
    {question: 'Sum to infinity: 1 + 1/2 + 1/4 + 1/8 + ...', workingOut: 'Step 1: Check convergence\na = 1, r = 1/2\n|r| = 1/2 < 1 ✓ (converges)\n\nStep 2: Use sum to infinity\nS∞ = a/(1-r)\nS∞ = 1/(1 - 1/2)\nS∞ = 1/(1/2)\nS∞ = 2\n\nThe sum approaches 2!\n\nOnly works when |r| < 1\nIf |r| ≥ 1, series diverges', answer: '2', explanation: 'Sum to infinity: S∞ = a/(1-r) when |r| < 1'},
    {question: 'Evaluate: Σ(2r + 3) from r=1 to 10', workingOut: 'Step 1: Expand sigma notation\nΣ(2r + 3) = Σ2r + Σ3\n\nStep 2: Use sigma formulas\nΣr = n(n+1)/2 = 10(11)/2 = 55\nΣc = cn = 3×10 = 30\n\nStep 3: Calculate\nΣ(2r + 3) = 2Σr + Σ3\n          = 2(55) + 30\n          = 110 + 30\n          = 140\n\nOr expand:\n(2×1+3) + (2×2+3) + ... + (2×10+3)\n= 5 + 7 + 9 + ... + 23\nArithmetic: n/2(first+last) = 10/2(5+23) = 140 ✓', answer: '140', explanation: 'Split sigma notation: Σ(ar+b) = aΣr + Σb'},
    {question: 'Which term of 5, 8, 11, 14... equals 53?', workingOut: 'Step 1: Set up equation\na = 5, d = 3\nTₙ = 53\n\nStep 2: Use formula\na + (n-1)d = 53\n5 + (n-1)×3 = 53\n5 + 3n - 3 = 53\n3n + 2 = 53\n3n = 51\nn = 17\n\nStep 3: Check\nT₁₇ = 5 + 16×3 = 5 + 48 = 53 ✓\n\n53 is the 17th term', answer: 'n = 17 (17th term)', explanation: 'Solve Tₙ = a + (n-1)d for n'}
  ], practiceQuestions: [{question: 'Common ratio of 2, 6, 18?', options: ['3', '4', '2', '6'], answer: '3', explanation: '6/2 = 3', difficulty: 'easy'}], tips: ['⭐ Learn all formulas', '⭐ Check convergence |r|<1'], commonMistakes: ['❌ Wrong formula choice', '❌ Arithmetic/geometric confusion'], examStrategy: 'Sequences: 6-10 marks per paper. Show formula substitution.'},
  
  {moduleNumber: 4, title: 'Trigonometry - Identities & Equations', duration: '115 min', introduction: 'Master trig identities, solve equations, compound angle formulas', keyPoints: ['sin²θ + cos²θ = 1', 'tanθ = sinθ/cosθ', 'sin2θ = 2sinθcosθ', 'cos2θ = cos²θ - sin²θ', 'CAST diagram for signs'], explanation: 'Trigonometric identities are crucial for calculus and mechanics', examples: [
    {question: 'Solve sinθ = 0.5 for 0° ≤ θ ≤ 360°', workingOut: 'Step 1: Find principal value\nsinθ = 0.5\nθ = sin⁻¹(0.5) = 30°\n\nStep 2: Use CAST diagram\nSine is positive in:\n- 1st quadrant (A: All positive)\n- 2nd quadrant (S: Sine positive)\n\nStep 3: Find both solutions\n1st quadrant: θ = 30°\n2nd quadrant: θ = 180° - 30° = 150°\n\nStep 4: Check range\nBoth in 0° to 360° ✓\n\nCAST: All, Sine, Tangent, Cosine\nQuadrants: 1st, 2nd, 3rd, 4th', answer: 'θ = 30°, 150°', explanation: 'Use CAST diagram - sine positive in 1st and 2nd quadrants'},
    {question: 'Solve cos2x = 0.5 for 0° ≤ x ≤ 360°', workingOut: 'Step 1: Let u = 2x, find range for u\nIf 0° ≤ x ≤ 360°\nThen 0° ≤ 2x ≤ 720°\n\nStep 2: Solve cosu = 0.5\nu = 60°, 300° (in 0° to 360°)\nAnd: 420°, 660° (in 360° to 720°)\n\nStep 3: Convert back to x\n2x = 60°  →  x = 30°\n2x = 300° →  x = 150°\n2x = 420° →  x = 210°\n2x = 660° →  x = 330°\n\nStep 4: Check all in range ✓\n\n4 solutions due to double angle!', answer: 'x = 30°, 150°, 210°, 330°', explanation: 'Double angle → double the solutions, expand range'},
    {question: 'Prove: sin2θ = 2sinθcosθ', workingOut: 'Start with compound angle formula:\nsin(A + B) = sinA cosB + cosA sinB\n\nLet A = B = θ:\nsin(θ + θ) = sinθ cosθ + cosθ sinθ\nsin2θ = sinθ cosθ + sinθ cosθ\nsin2θ = 2sinθ cosθ\n\nProven! ✓\n\nThis is the double angle formula for sine\n\nUseful for:\n- Integration\n- Simplifying expressions\n- Solving equations', answer: 'sin2θ = 2sinθcosθ (proven)', explanation: 'Derive from compound angle formula'},
    {question: 'Simplify: (sin²θ + cos²θ)/cosθ', workingOut: 'Step 1: Use Pythagorean identity\nsin²θ + cos²θ = 1\n\nStep 2: Substitute\n(sin²θ + cos²θ)/cosθ = 1/cosθ\n\nStep 3: Recognize reciprocal\n1/cosθ = secθ\n\nAnswer: secθ\n\nKey identities:\nsin²θ + cos²θ = 1\n1 + tan²θ = sec²θ\n1 + cot²θ = cosec²θ', answer: 'secθ', explanation: 'Use sin²θ + cos²θ = 1, then recognize reciprocal'},
    {question: 'Solve: 2sin²x + 3cosx = 0 for 0° ≤ x ≤ 360°', workingOut: 'Step 1: Convert to one trig function\nUse sin²x = 1 - cos²x\n\n2(1 - cos²x) + 3cosx = 0\n2 - 2cos²x + 3cosx = 0\n-2cos²x + 3cosx + 2 = 0\n2cos²x - 3cosx - 2 = 0\n\nStep 2: Factor quadratic (let y = cosx)\n2y² - 3y - 2 = 0\n(2y + 1)(y - 2) = 0\ny = -1/2 or y = 2\n\nStep 3: Solve for x\ncosx = -1/2: x = 120°, 240° ✓\ncosx = 2: No solution (cos ≤ 1)\n\nAnswer: x = 120°, 240°', answer: 'x = 120°, 240°', explanation: 'Convert to one trig function using identities'},
    {question: 'Prove: tan²θ + 1 = sec²θ', workingOut: 'Start with sin²θ + cos²θ = 1\n\nStep 1: Divide everything by cos²θ\n(sin²θ/cos²θ) + (cos²θ/cos²θ) = 1/cos²θ\n\nStep 2: Simplify each term\ntan²θ + 1 = sec²θ\n\nProven! ✓\n\nThis is a Pythagorean identity\n\nUseful for:\n- Integration of tan\n- Simplifying expressions\n- Solving trig equations', answer: 'tan²θ + 1 = sec²θ (proven)', explanation: 'Divide sin²θ + cos²θ = 1 by cos²θ'},
    {question: 'Find exact value of sin15° using compound angles', workingOut: 'Use: sin15° = sin(45° - 30°)\n\nCompound angle formula:\nsin(A - B) = sinA cosB - cosA sinB\n\nSubstitute:\nsin15° = sin45° cos30° - cos45° sin30°\nsin15° = (√2/2)(√3/2) - (√2/2)(1/2)\nsin15° = (√6/4) - (√2/4)\nsin15° = (√6 - √2)/4\n\nExact value: (√6 - √2)/4 ≈ 0.259\n\nCheck with calculator: sin15° = 0.259 ✓', answer: 'sin15° = (√6 - √2)/4', explanation: 'Use compound angle formula: 15° = 45° - 30°'}
  ], practiceQuestions: [{question: 'sin²θ + cos²θ = ?', options: ['1', '0', 'tanθ', '2'], answer: '1', explanation: 'Fundamental identity', difficulty: 'easy'}], tips: ['⭐ Learn CAST', '⭐ Use identities to simplify', '⭐ Check all solutions in range'], commonMistakes: ['❌ Missing second solution', '❌ Degrees/radians confusion', '❌ Sign errors'], examStrategy: 'Trig: 10-15% of paper. Always use CAST diagram!'},
  
  {moduleNumber: 5, title: 'Exponentials & Logarithms', duration: '105 min', introduction: 'Laws of logarithms, solving exponential equations, natural log', keyPoints: ['log(ab) = log(a) + log(b)', 'log(a/b) = log(a) - log(b)', 'log(aⁿ) = n·log(a)', 'eˣ and ln(x) are inverses', 'Change of base'], explanation: 'Exponentials and logs essential for calculus and growth/decay models', examples: [
    {question: 'Solve 2ˣ = 32', workingOut: 'Method 1: Same base\n2ˣ = 32\n2ˣ = 2⁵\nTherefore: x = 5\n\nMethod 2: Using logarithms\n2ˣ = 32\nlog(2ˣ) = log(32)\nx log(2) = log(32)\nx = log(32)/log(2)\nx = 1.505/0.301\nx = 5\n\nBoth methods work!', answer: 'x = 5', explanation: 'Express as same base or use logarithms'},
    {question: 'Solve 3^(2x+1) = 27', workingOut: 'Step 1: Express 27 as power of 3\n27 = 3³\n\nStep 2: Rewrite equation\n3^(2x+1) = 3³\n\nStep 3: Equate powers\n2x + 1 = 3\n2x = 2\nx = 1\n\nStep 4: Check\n3^(2×1+1) = 3³ = 27 ✓\n\nWhen bases equal, powers equal!', answer: 'x = 1', explanation: 'Express both sides as same base, then equate powers'},
    {question: 'Simplify: log₃(27) + log₃(9)', workingOut: 'Step 1: Use log law: log(a) + log(b) = log(ab)\nlog₃(27) + log₃(9) = log₃(27 × 9)\n                     = log₃(243)\n\nStep 2: Evaluate\n243 = 3⁵\nlog₃(243) = log₃(3⁵) = 5\n\nOr directly:\nlog₃(27) = log₃(3³) = 3\nlog₃(9) = log₃(3²) = 2\n3 + 2 = 5 ✓', answer: '5', explanation: 'Use log(a) + log(b) = log(ab)'},
    {question: 'Solve: 5ˣ = 200', workingOut: 'Step 1: Take log of both sides\n5ˣ = 200\nlog(5ˣ) = log(200)\n\nStep 2: Use power law\nx log(5) = log(200)\n\nStep 3: Solve for x\nx = log(200)/log(5)\nx = 2.301/0.699\nx = 3.29 (2 dp)\n\nCheck: 5^3.29 ≈ 200 ✓\n\nWhen bases don\'t match, use logs!', answer: 'x = 3.29', explanation: 'Take log of both sides, use log(aⁿ) = n log(a)'},
    {question: 'Simplify: ln(e⁵) - ln(e²)', workingOut: 'Method 1: Use log laws\nln(e⁵) - ln(e²) = ln(e⁵/e²)\n                 = ln(e³)\n                 = 3\n\nMethod 2: Evaluate first\nln(e⁵) = 5 (since ln and e are inverses)\nln(e²) = 2\n5 - 2 = 3 ✓\n\nKey fact: ln(eˣ) = x\n         e^(ln x) = x', answer: '3', explanation: 'ln(eˣ) = x since ln and e are inverses'},
    {question: 'Solve: log₂(x) + log₂(x-3) = 2', workingOut: 'Step 1: Combine logs\nlog₂(x) + log₂(x-3) = 2\nlog₂[x(x-3)] = 2\n\nStep 2: Convert to exponential form\nlog₂[x(x-3)] = 2\nx(x-3) = 2²\nx² - 3x = 4\nx² - 3x - 4 = 0\n\nStep 3: Factor\n(x-4)(x+1) = 0\nx = 4 or x = -1\n\nStep 4: Check domain\nx > 0 and x-3 > 0, so x > 3\nx = 4 ✓\nx = -1 ✗ (negative)\n\nAnswer: x = 4', answer: 'x = 4', explanation: 'Combine logs, convert to exponential, check domain'},
    {question: 'Change of base: Calculate log₅(20)', workingOut: 'Use change of base formula:\nlog₅(20) = log(20)/log(5)\n         = ln(20)/ln(5)  [can use any base]\n\nUsing calculator:\nlog₅(20) = 1.301/0.699\nlog₅(20) = 1.86 (2 dp)\n\nCheck: 5^1.86 ≈ 20 ✓\n\nChange of base formula:\nlogₐ(x) = logᵦ(x)/logᵦ(a)\n\nAllows calculator use!', answer: 'log₅(20) = 1.86', explanation: 'Use logₐ(x) = log(x)/log(a) for calculator'},
    {question: 'Growth model: P = 1000e^(0.05t), find P when t = 10', workingOut: 'Step 1: Substitute t = 10\nP = 1000e^(0.05×10)\nP = 1000e^0.5\n\nStep 2: Calculate\ne^0.5 ≈ 1.649\nP = 1000 × 1.649\nP = 1649\n\nStep 3: Interpret\nPopulation grows from 1000 to 1649\n64.9% increase over 10 time units\n\nExponential growth: P = P₀e^(kt)\nk > 0: growth\nk < 0: decay', answer: 'P = 1649', explanation: 'Exponential growth model: substitute and evaluate'}
  ], practiceQuestions: [{question: 'log₂8 = ?', options: ['3', '2', '4', '8'], answer: '3', explanation: '2³ = 8', difficulty: 'easy'}], tips: ['⭐ Change to same base', '⭐ Learn log laws', '⭐ ln and e are inverses'], commonMistakes: ['❌ Wrong log law', '❌ Not taking log of both sides', '❌ Base errors'], examStrategy: 'Exponentials/logs: 8-12 marks. Show base conversions clearly!'},
  
  {moduleNumber: 6, title: 'Differentiation - Basics', duration: '120 min', introduction: 'Find gradients, tangents, normals, stationary points', keyPoints: ['Power rule: d/dx(xⁿ) = nxⁿ⁻¹', 'Tangent: use gradient', 'Normal: perpendicular gradient', 'Stationary: dy/dx = 0', 'Max/min: check d²y/dx²'], explanation: 'Differentiation finds rate of change - foundation of calculus', examples: [
    {question: 'Differentiate y = 3x⁴ - 2x² + 5', workingOut: 'Use power rule on each term:\n\nTerm 1: d/dx(3x⁴) = 3 × 4x³ = 12x³\nTerm 2: d/dx(-2x²) = -2 × 2x = -4x\nTerm 3: d/dx(5) = 0 (constant)\n\nTherefore: dy/dx = 12x³ - 4x', answer: 'dy/dx = 12x³ - 4x', explanation: 'Use power rule: multiply by power, reduce power by 1'},
    {question: 'Find gradient of y = x³ - 6x + 2 at x = 2', workingOut: 'Step 1: Differentiate\ndy/dx = 3x² - 6\n\nStep 2: Substitute x = 2\ndy/dx = 3(2)² - 6\n     = 3(4) - 6\n     = 12 - 6\n     = 6\n\nGradient at x=2 is 6', answer: '6', explanation: 'Differentiate then substitute x-value'},
    {question: 'Find equation of tangent to y = x² at point (3, 9)', workingOut: 'Step 1: Find gradient\ndy/dx = 2x\nAt x=3: m = 2(3) = 6\n\nStep 2: Use y - y₁ = m(x - x₁)\ny - 9 = 6(x - 3)\ny - 9 = 6x - 18\ny = 6x - 9\n\nTangent: y = 6x - 9', answer: 'y = 6x - 9', explanation: 'Find gradient, use point-slope form'},
    {question: 'Find stationary points of y = x³ - 3x² - 9x + 5', workingOut: 'Step 1: Find dy/dx\ndy/dx = 3x² - 6x - 9\n\nStep 2: Set dy/dx = 0\n3x² - 6x - 9 = 0\nx² - 2x - 3 = 0\n(x - 3)(x + 1) = 0\nx = 3 or x = -1\n\nStep 3: Find y-values\nx=3: y = 27 - 27 - 27 + 5 = -22\nx=-1: y = -1 - 3 + 9 + 5 = 10\n\nStationary points: (3, -22) and (-1, 10)', answer: '(3, -22) and (-1, 10)', explanation: 'Set dy/dx = 0, solve for x, find y'},
    {question: 'Determine nature of stationary point at x = 2 for y = x³ - 6x² + 9x', workingOut: 'Step 1: Find second derivative\ndy/dx = 3x² - 12x + 9\nd²y/dx² = 6x - 12\n\nStep 2: Test at x = 2\nd²y/dx² = 6(2) - 12 = 0\n\nInconclusive! Need to check nearby points:\nAt x=1.9: dy/dx = 3(1.9)² - 12(1.9) + 9 = 0.03 > 0\nAt x=2.1: dy/dx = 3(2.1)² - 12(2.1) + 9 = 0.03 > 0\n\nBoth positive → Point of inflection', answer: 'Point of inflection', explanation: 'If d²y/dx² = 0, check sign of dy/dx either side'},
    {question: 'Find equation of normal to y = x³ at x = 1', workingOut: 'Step 1: Find point\ny = 1³ = 1, so point is (1, 1)\n\nStep 2: Find gradient of tangent\ndy/dx = 3x²\nAt x=1: m_tangent = 3\n\nStep 3: Normal is perpendicular\nm_normal = -1/m_tangent = -1/3\n\nStep 4: Equation of normal\ny - 1 = -1/3(x - 1)\n3y - 3 = -(x - 1)\n3y = -x + 4\ny = -x/3 + 4/3', answer: 'y = -x/3 + 4/3', explanation: 'Normal gradient = -1/(tangent gradient)'}
  ], practiceQuestions: [{question: 'd/dx(x⁵) = ?', options: ['5x⁴', 'x⁴', '5x⁶', 'x⁶'], answer: '5x⁴', explanation: 'Power rule', difficulty: 'easy'}], tips: ['⭐ Learn power rule', '⭐ Check second derivative for max/min', '⭐ Show all working'], commonMistakes: ['❌ Wrong power', '❌ Not differentiating constant', '❌ Sign errors'], examStrategy: 'Differentiation: 15-20% of paper. Essential for all calculus!'},
  
  {moduleNumber: 7, title: 'Integration - Basics', duration: '120 min', introduction: 'Indefinite and definite integration, area under curves', keyPoints: ['Power rule: ∫xⁿ dx = xⁿ⁺¹/(n+1) + c', 'Definite: substitute limits', 'Area under curve', '+c for indefinite', 'Check by differentiating'], explanation: 'Integration is reverse of differentiation - crucial for A-Level', examples: [
    {question: 'Integrate ∫3x² dx', workingOut: 'Using power rule: ∫xⁿ dx = xⁿ⁺¹/(n+1) + c\n\nHere n = 2:\n∫3x² dx = 3 × x²⁺¹/(2+1) + c\n        = 3 × x³/3 + c\n        = x³ + c\n\nCheck: d/dx(x³ + c) = 3x² ✓', answer: 'x³ + c', explanation: 'Add 1 to power, divide by new power, add constant'},
    {question: 'Find ∫(4x³ - 6x + 5) dx', workingOut: 'Integrate term by term:\n\nTerm 1: ∫4x³ dx = 4 × x⁴/4 = x⁴\nTerm 2: ∫-6x dx = -6 × x²/2 = -3x²\nTerm 3: ∫5 dx = 5x\n\nAnswer: x⁴ - 3x² + 5x + c\n\nDon\'t forget +c!', answer: 'x⁴ - 3x² + 5x + c', explanation: 'Integrate each term separately'},
    {question: 'Evaluate ∫₁³ x² dx', workingOut: 'Step 1: Find indefinite integral\n∫x² dx = x³/3\n\nStep 2: Apply limits [substitute upper - lower]\n= [x³/3]₁³\n= (3³/3) - (1³/3)\n= 27/3 - 1/3\n= 9 - 1/3\n= 8⅔ or 26/3\n\nNo +c for definite integrals!', answer: '26/3 or 8⅔', explanation: 'Integrate then substitute limits'},
    {question: 'Find ∫(x + 1)(x - 2) dx', workingOut: 'Step 1: Expand brackets first\n(x + 1)(x - 2) = x² - 2x + x - 2\n               = x² - x - 2\n\nStep 2: Integrate\n∫(x² - x - 2) dx = x³/3 - x²/2 - 2x + c\n\nAlways simplify before integrating!', answer: 'x³/3 - x²/2 - 2x + c', explanation: 'Expand brackets before integrating'},
    {question: 'Find area under y = x² + 1 from x = 0 to x = 2', workingOut: 'Step 1: Set up definite integral\nArea = ∫₀² (x² + 1) dx\n\nStep 2: Integrate\n= [x³/3 + x]₀²\n\nStep 3: Apply limits\n= (2³/3 + 2) - (0³/3 + 0)\n= (8/3 + 2) - 0\n= 8/3 + 6/3\n= 14/3 square units\n\nArea is always positive!', answer: '14/3 square units', explanation: 'Definite integral gives area under curve'},
    {question: 'Integrate ∫(3/x² + √x) dx', workingOut: 'Step 1: Rewrite using powers\n3/x² = 3x⁻²\n√x = x^(1/2)\n\nStep 2: Integrate using power rule\n∫3x⁻² dx = 3 × x⁻¹/(-1) = -3x⁻¹ = -3/x\n∫x^(1/2) dx = x^(3/2)/(3/2) = (2/3)x^(3/2)\n\nStep 3: Combine\n= -3/x + (2/3)x^(3/2) + c\n\nRewrite as powers first!', answer: '-3/x + (2/3)x^(3/2) + c', explanation: 'Rewrite roots and fractions as powers'},
    {question: 'If dy/dx = 6x² - 4x and y = 5 when x = 0, find y', workingOut: 'Step 1: Integrate dy/dx\ny = ∫(6x² - 4x) dx\n  = 2x³ - 2x² + c\n\nStep 2: Use initial condition\nWhen x = 0, y = 5:\n5 = 2(0)³ - 2(0)² + c\n5 = c\n\nStep 3: Write final answer\ny = 2x³ - 2x² + 5\n\nAlways find the constant c!', answer: 'y = 2x³ - 2x² + 5', explanation: 'Use initial conditions to find constant'}
  ], practiceQuestions: [{question: '∫x³ dx = ?', options: ['x⁴/4 + c', 'x⁴ + c', '3x² + c', 'x² + c'], answer: 'x⁴/4 + c', explanation: 'Power rule', difficulty: 'easy'}], tips: ['⭐ Don\'t forget +c', '⭐ Learn power rule', '⭐ Check by differentiation'], commonMistakes: ['❌ Forgetting +c', '❌ Wrong power', '❌ Not dividing by new power'], examStrategy: 'Integration: 15-20% of paper. Always add constant!'},
  
  {moduleNumber: 8, title: 'Differentiation - Advanced', duration: '125 min', introduction: 'Chain rule, product rule, quotient rule, implicit differentiation', keyPoints: ['Chain: dy/dx = dy/du × du/dx', 'Product: d/dx(uv) = u(dv/dx) + v(du/dx)', 'Quotient: d/dx(u/v) = [v(du/dx) - u(dv/dx)]/v²', 'Implicit: differentiate both sides'], explanation: 'Advanced differentiation techniques for complex functions', examples: [
    {question: 'CHAIN RULE: Differentiate y = (2x+1)⁵', workingOut: 'Let u = 2x + 1, then y = u⁵\n\nStep 1: dy/du = 5u⁴\nStep 2: du/dx = 2\nStep 3: dy/dx = dy/du × du/dx\n             = 5u⁴ × 2\n             = 10u⁴\n             = 10(2x+1)⁴\n\nShortcut: "power × bracket derivative × bracket^(power-1)"', answer: 'dy/dx = 10(2x+1)⁴', explanation: 'Chain rule: differentiate outer × differentiate inner'},
    {question: 'CHAIN RULE: Differentiate y = sin(3x²)', workingOut: 'Let u = 3x², then y = sin(u)\n\nStep 1: dy/du = cos(u) = cos(3x²)\nStep 2: du/dx = 6x\nStep 3: dy/dx = dy/du × du/dx\n             = cos(3x²) × 6x\n             = 6x cos(3x²)\n\nAlways multiply by inner derivative!', answer: 'dy/dx = 6x cos(3x²)', explanation: 'Differentiate trig function, multiply by derivative of inside'},
    {question: 'PRODUCT RULE: Differentiate y = x² sin(x)', workingOut: 'Let u = x² and v = sin(x)\n\nStep 1: Find du/dx and dv/dx\ndu/dx = 2x\ndv/dx = cos(x)\n\nStep 2: Apply product rule\nd/dx(uv) = u(dv/dx) + v(du/dx)\n         = x²·cos(x) + sin(x)·2x\n         = x²cos(x) + 2x sin(x)\n         = x(x cos(x) + 2 sin(x))\n\nProduct rule: "first × derivative of second + second × derivative of first"', answer: 'x²cos(x) + 2x sin(x)', explanation: 'Product rule when multiplying two functions'},
    {question: 'PRODUCT RULE: Differentiate y = (x+1)(x²-3)', workingOut: 'Could expand, but practice product rule:\n\nu = x + 1,  v = x² - 3\ndu/dx = 1,  dv/dx = 2x\n\nd/dx(uv) = u(dv/dx) + v(du/dx)\n         = (x+1)(2x) + (x²-3)(1)\n         = 2x² + 2x + x² - 3\n         = 3x² + 2x - 3\n\nCheck by expanding first method!', answer: '3x² + 2x - 3', explanation: 'Product rule for two algebraic functions'},
    {question: 'QUOTIENT RULE: Differentiate y = x²/(x+1)', workingOut: 'Let u = x² (numerator) and v = x+1 (denominator)\n\nStep 1: Find derivatives\ndu/dx = 2x\ndv/dx = 1\n\nStep 2: Apply quotient rule\nd/dx(u/v) = [v(du/dx) - u(dv/dx)]/v²\n           = [(x+1)(2x) - x²(1)]/(x+1)²\n           = [2x² + 2x - x²]/(x+1)²\n           = [x² + 2x]/(x+1)²\n           = x(x + 2)/(x+1)²\n\nRemember: "bottom × d(top) - top × d(bottom), all over bottom²"', answer: 'x(x+2)/(x+1)²', explanation: 'Quotient rule for fractions'},
    {question: 'QUOTIENT RULE: Differentiate y = sin(x)/x', workingOut: 'u = sin(x),  v = x\ndu/dx = cos(x),  dv/dx = 1\n\nd/dx(u/v) = [v(du/dx) - u(dv/dx)]/v²\n           = [x·cos(x) - sin(x)·1]/x²\n           = [x cos(x) - sin(x)]/x²\n\nSimplify final answer when possible', answer: '[x cos(x) - sin(x)]/x²', explanation: 'Quotient rule with trig functions'},
    {question: 'IMPLICIT: Find dy/dx for x² + y² = 25', workingOut: 'Differentiate both sides with respect to x:\n\nLeft side:\nd/dx(x²) = 2x\nd/dx(y²) = 2y·dy/dx  [chain rule - y depends on x]\n\nRight side:\nd/dx(25) = 0\n\nEquation:\n2x + 2y·dy/dx = 0\n\nSolve for dy/dx:\n2y·dy/dx = -2x\ndy/dx = -2x/2y = -x/y\n\nImplicit: treat y as function of x', answer: 'dy/dx = -x/y', explanation: 'Differentiate both sides, solve for dy/dx'}
  ], practiceQuestions: [{question: 'Which rule for y = x²sinx?', options: ['Product', 'Chain', 'Quotient', 'Power'], answer: 'Product', explanation: 'Multiplying two functions', difficulty: 'medium'}], tips: ['⭐ Identify which rule needed', '⭐ Chain rule most common', '⭐ Show each step'], commonMistakes: ['❌ Forgetting chain rule', '❌ Product rule sign', '❌ Quotient rule denominator'], examStrategy: 'Advanced differentiation: 10-15 marks. State which rule using!'},
  
  {moduleNumber: 9, title: 'Integration - Advanced', duration: '125 min', introduction: 'Integration by substitution, by parts, partial fractions', keyPoints: ['Substitution: change variable', 'By parts: ∫u dv/dx dx = uv - ∫v du/dx dx', 'Partial fractions first', 'Trig integrals', 'Limits change with substitution'], explanation: 'Advanced integration techniques for complex integrals', examples: [
    {question: 'SUBSTITUTION: Find ∫2x(x²+1)⁵ dx', workingOut: 'Step 1: Choose substitution\nLet u = x² + 1\n\nStep 2: Find du/dx\ndu/dx = 2x\nTherefore: du = 2x dx\n\nStep 3: Rewrite integral\n∫2x(x²+1)⁵ dx = ∫u⁵ du\n\nStep 4: Integrate\n= u⁶/6 + c\n\nStep 5: Substitute back\n= (x²+1)⁶/6 + c\n\nCheck: differentiate answer to verify!', answer: '(x²+1)⁶/6 + c', explanation: 'Substitute to simplify, integrate, substitute back'},
    {question: 'SUBSTITUTION: Evaluate ∫₀¹ x√(1+x²) dx', workingOut: 'Step 1: Let u = 1 + x²\ndu/dx = 2x, so x dx = du/2\n\nStep 2: Change limits\nWhen x = 0: u = 1 + 0² = 1\nWhen x = 1: u = 1 + 1² = 2\n\nStep 3: Rewrite integral\n∫₀¹ x√(1+x²) dx = ∫₁² √u · (1/2) du\n                  = (1/2)∫₁² u^(1/2) du\n\nStep 4: Integrate\n= (1/2)[u^(3/2)/(3/2)]₁²\n= (1/3)[u^(3/2)]₁²\n= (1/3)[2^(3/2) - 1^(3/2)]\n= (1/3)[2√2 - 1]\n= (2√2 - 1)/3\n\nRemember to change limits!', answer: '(2√2 - 1)/3', explanation: 'Change limits when substituting'},
    {question: 'BY PARTS: Find ∫x·eˣ dx', workingOut: 'Formula: ∫u dv = uv - ∫v du\n\nStep 1: Choose u and dv\nu = x  (gets simpler when differentiated)\ndv = eˣ dx  (easy to integrate)\n\nStep 2: Find du and v\ndu = dx\nv = eˣ\n\nStep 3: Apply formula\n∫x·eˣ dx = x·eˣ - ∫eˣ dx\n         = xeˣ - eˣ + c\n         = eˣ(x - 1) + c\n\nLIATE rule for choosing u: Log, Inverse trig, Algebraic, Trig, Exponential', answer: 'eˣ(x-1) + c', explanation: 'Integration by parts for products'},
    {question: 'BY PARTS: Find ∫x²·sin(x) dx', workingOut: 'u = x²,  dv = sin(x) dx\ndu = 2x dx,  v = -cos(x)\n\n∫x²sin(x) dx = x²·(-cos x) - ∫(-cos x)·2x dx\n             = -x²cos x + 2∫x cos x dx\n\nNeed by parts again for ∫x cos x dx:\nu = x,  dv = cos x dx\ndu = dx,  v = sin x\n\n∫x cos x dx = x sin x - ∫sin x dx\n            = x sin x + cos x\n\nCombine:\n∫x²sin x dx = -x²cos x + 2(x sin x + cos x) + c\n            = -x²cos x + 2x sin x + 2cos x + c\n\nMay need parts twice!', answer: '-x²cos x + 2x sin x + 2cos x + c', explanation: 'Sometimes need by parts multiple times'},
    {question: 'BY PARTS: Find ∫ln(x) dx', workingOut: 'Trick: write as ∫1·ln(x) dx\n\nu = ln(x),  dv = 1 dx\ndu = (1/x) dx,  v = x\n\n∫ln(x) dx = x·ln(x) - ∫x·(1/x) dx\n          = x ln(x) - ∫1 dx\n          = x ln(x) - x + c\n          = x(ln x - 1) + c\n\nln(x) alone needs by parts!', answer: 'x(ln x - 1) + c', explanation: 'Write ln(x) as 1·ln(x) then use by parts'},
    {question: 'TRIG: Find ∫sin²(x) dx', workingOut: 'Use identity: sin²x = (1 - cos 2x)/2\n\n∫sin²(x) dx = ∫(1 - cos 2x)/2 dx\n            = (1/2)∫(1 - cos 2x) dx\n            = (1/2)[x - (sin 2x)/2] + c\n            = x/2 - (sin 2x)/4 + c\n\nAlternatively: = x/2 - (sin x cos x)/2 + c\n\nUse trig identities to simplify!', answer: 'x/2 - (sin 2x)/4 + c', explanation: 'Use double angle formulas for sin²x or cos²x'},
    {question: 'Find ∫eˣ sin(x) dx', workingOut: 'Need by parts TWICE:\n\nFirst time:\nu = sin x,  dv = eˣ dx\ndu = cos x dx,  v = eˣ\n\nI = ∫eˣ sin x dx = eˣ sin x - ∫eˣ cos x dx\n\nSecond time (for ∫eˣ cos x):\nu = cos x,  dv = eˣ dx\ndu = -sin x dx,  v = eˣ\n\n∫eˣ cos x dx = eˣ cos x - ∫eˣ(-sin x) dx\n             = eˣ cos x + ∫eˣ sin x dx\n             = eˣ cos x + I\n\nSubstitute back:\nI = eˣ sin x - (eˣ cos x + I)\nI = eˣ sin x - eˣ cos x - I\n2I = eˣ(sin x - cos x)\nI = eˣ(sin x - cos x)/2 + c\n\nSometimes get original integral back - solve algebraically!', answer: 'eˣ(sin x - cos x)/2 + c', explanation: 'Special case: by parts twice returns to original'}
  ], practiceQuestions: [{question: 'When use integration by parts?', options: ['Product of functions', 'Simple power', 'Quotient', 'Constant'], answer: 'Product of functions', explanation: 'For product uv', difficulty: 'medium'}], tips: ['⭐ Choose u wisely in by parts', '⭐ Change limits if substituting', '⭐ Verify answer'], commonMistakes: ['❌ Wrong u choice', '❌ Not changing limits', '❌ Sign errors'], examStrategy: 'Advanced integration: 12-18 marks. Show substitution clearly!'},
  
  {moduleNumber: 10, title: 'Numerical Methods', duration: '90 min', introduction: 'Iterative methods, Newton-Raphson, trapezium rule', keyPoints: ['Newton-Raphson: xₙ₊₁ = xₙ - f(xₙ)/f\'(xₙ)', 'Change of sign method', 'Trapezium: approximate area', 'Iteration formulas', 'Convergence'], explanation: 'Numerical methods approximate solutions when algebra fails', examples: [
    {question: 'Newton-Raphson: Find root of x³ - 5x + 3 = 0 near x = 2', workingOut: 'Step 1: Set up formula\nf(x) = x³ - 5x + 3\nf\'(x) = 3x² - 5\n\nNewton-Raphson: xₙ₊₁ = xₙ - f(xₙ)/f\'(xₙ)\n\nStep 2: First iteration (x₀ = 2)\nf(2) = 8 - 10 + 3 = 1\nf\'(2) = 12 - 5 = 7\nx₁ = 2 - 1/7 = 2 - 0.143 = 1.857\n\nStep 3: Second iteration\nf(1.857) = 6.401 - 9.285 + 3 = 0.116\nf\'(1.857) = 10.350 - 5 = 5.350\nx₂ = 1.857 - 0.116/5.350 = 1.835\n\nStep 4: Third iteration\nf(1.835) ≈ 0.004\nx₃ = 1.833\n\nConverging to x ≈ 1.833\n\nStop when change is small!', answer: 'x ≈ 1.833', explanation: 'Newton-Raphson iterates to find root quickly'},
    {question: 'Show root exists between x = 1 and x = 2 for f(x) = x³ - 6x + 2', workingOut: 'Step 1: Evaluate at boundaries\nf(1) = 1 - 6 + 2 = -3\nf(2) = 8 - 12 + 2 = -2\n\nStep 2: Check for sign change\nBoth negative - no sign change yet!\nTry wider interval...\n\nf(0) = 0 - 0 + 2 = 2 (positive)\nf(1) = -3 (negative)\n\nStep 3: Conclude\nf(0) = 2 > 0\nf(1) = -3 < 0\n\nSign change! ✓\n\nBy Intermediate Value Theorem:\nContinuous function changes sign\n→ Root must exist between 0 and 1\n\nChange of sign method proves existence', answer: 'Root exists between x=0 and x=1', explanation: 'Sign change proves root exists (IVT)'},
    {question: 'Trapezium Rule: Estimate ∫₀² x² dx using 4 strips', workingOut: 'Step 1: Calculate strip width\nh = (2-0)/4 = 0.5\n\nStep 2: Find x-values\nx₀ = 0, x₁ = 0.5, x₂ = 1, x₃ = 1.5, x₄ = 2\n\nStep 3: Calculate y-values\ny₀ = 0² = 0\ny₁ = 0.5² = 0.25\ny₂ = 1² = 1\ny₃ = 1.5² = 2.25\ny₄ = 2² = 4\n\nStep 4: Apply trapezium rule\nArea ≈ h/2[y₀ + 2(y₁ + y₂ + y₃) + y₄]\nArea ≈ 0.5/2[0 + 2(0.25 + 1 + 2.25) + 4]\nArea ≈ 0.25[0 + 2(3.5) + 4]\nArea ≈ 0.25[0 + 7 + 4]\nArea ≈ 0.25 × 11 = 2.75\n\nExact: ∫x² dx = x³/3 = 8/3 = 2.667\nError = 2.75 - 2.667 = 0.083\n\nMore strips → more accurate!', answer: '2.75', explanation: 'Trapezium rule: h/2[first + 2(middles) + last]'},
    {question: 'Iteration: xₙ₊₁ = √(5 - 2xₙ), x₀ = 1. Find x₃', workingOut: 'Step 1: First iteration\nx₁ = √(5 - 2×1)\nx₁ = √(5 - 2)\nx₁ = √3 = 1.732\n\nStep 2: Second iteration\nx₂ = √(5 - 2×1.732)\nx₂ = √(5 - 3.464)\nx₂ = √1.536\nx₂ = 1.239\n\nStep 3: Third iteration\nx₃ = √(5 - 2×1.239)\nx₃ = √(5 - 2.478)\nx₃ = √2.522\nx₃ = 1.588\n\nContinuing...\nx₄ ≈ 1.367\nx₅ ≈ 1.502\n\nConverging to root ≈ 1.45\n\nAlways show 3-4 iterations!', answer: 'x₃ = 1.588', explanation: 'Iterative formula: substitute previous value'},
    {question: 'Why might Newton-Raphson fail?', workingOut: 'Newton-Raphson can fail when:\n\n1. f\'(x) = 0 (horizontal tangent)\n   → Division by zero!\n\n2. Starting point far from root\n   → May diverge or find wrong root\n\n3. Stationary point near root\n   → Tangent points away\n\n4. Oscillation between points\n   → Never converges\n\nExample: f(x) = x³\nf\'(0) = 0 → fails!\n\nSolution: Choose better x₀\n\nAlways check:\n- f\'(xₙ) ≠ 0\n- Iterations converging\n- Sensible result', answer: 'Fails when f\'(x)=0 or bad starting point', explanation: 'Need non-zero derivative and good initial guess'}
  ], practiceQuestions: [{question: 'Newton-Raphson needs?', options: ['f and f\'', 'Only f', 'Only f\'', 'f\'\''], answer: 'f and f\'', explanation: 'Need function and derivative', difficulty: 'easy'}], tips: ['⭐ Show iterations clearly', '⭐ Check convergence', '⭐ Use calculator efficiently'], commonMistakes: ['❌ Wrong formula', '❌ Rounding too early', '❌ Not showing iterations'], examStrategy: 'Numerical methods: 6-10 marks. Show ALL iterations!'},

  // MODULE 11: VECTORS
  {moduleNumber: 11, title: 'Vectors', duration: '110 min', introduction: 'Vector arithmetic, scalar product, vector equations', keyPoints: ['Addition: component-wise', 'Scalar product: a·b = |a||b|cosθ', 'Vector equation of line', 'Angle between vectors', 'Parallel: scalar multiple'], explanation: 'Vectors represent magnitude and direction in 2D/3D', examples: [
    {question: 'Find magnitude of vector a = 3i + 4j', workingOut: 'Step 1: Identify components\na = 3i + 4j\nComponents: (3, 4)\n\nStep 2: Use magnitude formula\n|a| = √(x² + y²)\n|a| = √(3² + 4²)\n|a| = √(9 + 16)\n|a| = √25\n|a| = 5\n\nThis is a 3-4-5 triangle!\n\nIn 3D: |a| = √(x² + y² + z²)', answer: '|a| = 5', explanation: 'Magnitude: √(sum of squares of components)'},
    {question: 'Find angle between vectors a = i + j and b = 2i', workingOut: 'Step 1: Find scalar product\na·b = (1)(2) + (1)(0)\na·b = 2\n\nStep 2: Find magnitudes\n|a| = √(1² + 1²) = √2\n|b| = √(2² + 0²) = 2\n\nStep 3: Use formula\na·b = |a||b|cosθ\n2 = √2 × 2 × cosθ\ncosθ = 2/(2√2) = 1/√2\n\nStep 4: Find angle\nθ = cos⁻¹(1/√2)\nθ = 45°\n\nScalar product finds angle!', answer: 'θ = 45°', explanation: 'Use a·b = |a||b|cosθ'},
    {question: 'Show vectors a = 2i + 3j and b = 4i + 6j are parallel', workingOut: 'Method 1: Scalar multiple\nb = 4i + 6j\n  = 2(2i + 3j)\n  = 2a\n\nSince b = 2a, vectors parallel ✓\n\nMethod 2: Check ratios\nRatio of i components: 4/2 = 2\nRatio of j components: 6/3 = 2\nRatios equal → parallel ✓\n\nParallel vectors:\n- One is scalar multiple of other\n- Same direction (or opposite)\n- Component ratios equal\n\nb = λa where λ is scalar', answer: 'b = 2a, so parallel', explanation: 'Parallel if one is scalar multiple of other'},
    {question: 'Find unit vector in direction of a = 3i - 4j', workingOut: 'Step 1: Find magnitude\n|a| = √(3² + (-4)²)\n|a| = √(9 + 16)\n|a| = √25 = 5\n\nStep 2: Divide by magnitude\nâ = a/|a|\nâ = (3i - 4j)/5\nâ = (3/5)i + (-4/5)j\nâ = 0.6i - 0.8j\n\nStep 3: Verify magnitude = 1\n|â| = √(0.6² + 0.8²)\n|â| = √(0.36 + 0.64)\n|â| = √1 = 1 ✓\n\nUnit vector: magnitude 1\nSame direction as original', answer: 'â = 0.6i - 0.8j', explanation: 'Unit vector: divide by magnitude'},
    {question: 'Vector equation of line through (2,3) with direction i + 2j', workingOut: 'Step 1: Identify components\nPosition vector: r₀ = 2i + 3j\nDirection vector: d = i + 2j\n\nStep 2: Write vector equation\nr = r₀ + λd\nr = (2i + 3j) + λ(i + 2j)\nr = (2 + λ)i + (3 + 2λ)j\n\nOr in component form:\nx = 2 + λ\ny = 3 + 2λ\n\nEliminate λ:\nλ = x - 2\ny = 3 + 2(x - 2)\ny = 3 + 2x - 4\ny = 2x - 1 (Cartesian form)\n\nλ is parameter (any real number)', answer: 'r = (2+λ)i + (3+2λ)j', explanation: 'Line: r = position + λ(direction)'},
    {question: 'Check if vectors a = 2i + 3j and b = 3i - 2j are perpendicular', workingOut: 'Method: Check scalar product\n\nStep 1: Calculate a·b\na·b = (2)(3) + (3)(-2)\na·b = 6 - 6\na·b = 0\n\nStep 2: Interpret\na·b = 0 → perpendicular! ✓\n\nPerpendicular vectors:\n- Scalar product = 0\n- Angle = 90°\n- a·b = |a||b|cos90° = 0\n\nQuick test:\nMultiply i components: 2 × 3 = 6\nMultiply j components: 3 × (-2) = -6\nSum = 0 → perpendicular!', answer: 'Yes, perpendicular (a·b = 0)', explanation: 'Perpendicular when scalar product = 0'},
    {question: 'Find vector from A(1,2,3) to B(4,6,7)', workingOut: 'Step 1: Identify positions\nA = i + 2j + 3k\nB = 4i + 6j + 7k\n\nStep 2: Calculate AB\nAB = B - A\nAB = (4i + 6j + 7k) - (i + 2j + 3k)\nAB = (4-1)i + (6-2)j + (7-3)k\nAB = 3i + 4j + 4k\n\nStep 3: Find distance\n|AB| = √(3² + 4² + 4²)\n|AB| = √(9 + 16 + 16)\n|AB| = √41\n\nVector from A to B:\nSubtract starting from ending point', answer: 'AB = 3i + 4j + 4k, |AB| = √41', explanation: 'AB = position B - position A'}
  ], practiceQuestions: [{question: 'a·b when perpendicular?', options: ['0', '1', '-1', '90'], answer: '0', explanation: 'Perpendicular → dot product = 0', difficulty: 'easy'}], tips: ['⭐ Learn scalar product', '⭐ Check perpendicular', '⭐ Magnitude: √(sum of squares)'], commonMistakes: ['❌ Wrong scalar product', '❌ Angle calculation error', '❌ Not using magnitude'], examStrategy: 'Vectors: 8-12 marks. Show scalar product working!'},
  
  {moduleNumber: 12, title: 'Proof & Mathematical Arguments', duration: '95 min', introduction: 'Proof by deduction, contradiction, counter-example', keyPoints: ['Direct proof', 'Proof by contradiction', 'Counter-example disproves', 'Proof by induction (A2)', 'Clear logical steps'], explanation: 'Proof demonstrates mathematical truth rigorously', examples: [
    {question: 'Prove the sum of two even numbers is even', workingOut: 'Step 1: Define even numbers\nLet the two even numbers be 2m and 2n\nwhere m and n are integers\n\nStep 2: Find their sum\nSum = 2m + 2n\n\nStep 3: Factor out 2\nSum = 2(m + n)\n\nStep 4: Conclude\nSince (m + n) is an integer,\n2(m + n) is of form 2k where k is integer\nTherefore sum is even ✓\n\nQED (Quod Erat Demonstrandum)\n\nMUST use algebra, NOT examples!', answer: 'Sum = 2(m+n) is even', explanation: 'Define algebraically, manipulate, conclude'},
    {question: 'Prove √2 is irrational (by contradiction)', workingOut: 'Step 1: Assume opposite\nAssume √2 is rational\nThen √2 = p/q where p,q integers, in lowest terms\n(no common factors)\n\nStep 2: Square both sides\n2 = p²/q²\np² = 2q²\n\nStep 3: Deduce p is even\np² is even (multiple of 2)\nTherefore p must be even\nSo p = 2k for some integer k\n\nStep 4: Substitute\n(2k)² = 2q²\n4k² = 2q²\n2k² = q²\n\nStep 5: Deduce q is even\nq² = 2k² is even\nTherefore q must be even\n\nStep 6: Contradiction!\nBoth p and q are even\nBut we said they had no common factors!\nContradiction! ✗\n\nStep 7: Conclude\nOriginal assumption wrong\nTherefore √2 is irrational ✓\n\nProof by contradiction powerful!', answer: '√2 is irrational (proven)', explanation: 'Assume opposite, find contradiction'},
    {question: 'Disprove: "All prime numbers are odd"', workingOut: 'Method: Counter-example\n\nStep 1: Find one exception\nConsider the number 2\n\nStep 2: Check if prime\n2 has exactly two factors: 1 and 2\nTherefore 2 is prime ✓\n\nStep 3: Check if odd\n2 = 2 × 1 (even)\n2 is not odd ✗\n\nStep 4: Conclude\nWe found a prime (2) that is not odd\nTherefore statement is FALSE\n\nDisproved! ✓\n\nOne counter-example enough to disprove!', answer: 'FALSE: counter-example is 2', explanation: 'One counter-example disproves universal statement'},
    {question: 'Prove n² + n is always even for any integer n', workingOut: 'Method: Consider cases\n\nCase 1: n is even\nLet n = 2k\nn² + n = (2k)² + 2k\n       = 4k² + 2k\n       = 2(2k² + k)\n       = 2m where m = 2k² + k\nEven! ✓\n\nCase 2: n is odd\nLet n = 2k + 1\nn² + n = (2k+1)² + (2k+1)\n       = 4k² + 4k + 1 + 2k + 1\n       = 4k² + 6k + 2\n       = 2(2k² + 3k + 1)\n       = 2m where m = 2k² + 3k + 1\nEven! ✓\n\nBoth cases even!\nTherefore n² + n always even ✓\n\nProof by exhaustion (all cases)', answer: 'n² + n = n(n+1) always even', explanation: 'Product of consecutive integers always even'},
    {question: 'Prove by induction: 1 + 2 + 3 + ... + n = n(n+1)/2', workingOut: 'Step 1: Base case (n = 1)\nLHS: 1\nRHS: 1(1+1)/2 = 1\nLHS = RHS ✓\n\nStep 2: Inductive hypothesis\nAssume true for n = k:\n1 + 2 + ... + k = k(k+1)/2\n\nStep 3: Prove for n = k+1\nNeed to show:\n1 + 2 + ... + k + (k+1) = (k+1)(k+2)/2\n\nLHS = [1 + 2 + ... + k] + (k+1)\n    = k(k+1)/2 + (k+1)   [using hypothesis]\n    = k(k+1)/2 + 2(k+1)/2\n    = [k(k+1) + 2(k+1)]/2\n    = [(k+1)(k+2)]/2\n    = RHS ✓\n\nStep 4: Conclusion\nTrue for n=1\nIf true for n=k, then true for n=k+1\nBy mathematical induction,\ntrue for all n ∈ ℕ ✓\n\nInduction: base case + inductive step', answer: 'Proven by induction', explanation: 'Induction: prove base case, then n=k → n=k+1'}
  ], practiceQuestions: [{question: 'Disprove "all primes odd"?', options: ['Counter-example: 2', 'Proof', 'Cannot disprove', 'Induction'], answer: 'Counter-example: 2', explanation: '2 is prime and even', difficulty: 'easy'}], tips: ['⭐ Use algebra not numbers', '⭐ State conclusion', '⭐ Show ALL steps'], commonMistakes: ['❌ Using examples not proof', '❌ Circular reasoning', '❌ Missing steps'], examStrategy: 'Proof: 4-8 marks. MUST use algebra!'},
  
  {moduleNumber: 13, title: 'Further Calculus', duration: '130 min', introduction: 'Parametric equations, differential equations, integration applications', keyPoints: ['Parametric: x=f(t), y=g(t)', 'dy/dx = (dy/dt)/(dx/dt)', 'Differential equations', 'Integration for area/volume', 'Separation of variables'], explanation: 'Advanced calculus techniques for complex problems', examples: [{question: 'Find dy/dx for x=t², y=t³', workingOut: 'dx/dt = 2t, dy/dt = 3t²\ndy/dx = 3t²/2t = 3t/2', answer: '3t/2', explanation: 'Use parametric formula'}], practiceQuestions: [{question: 'Parametric dy/dx formula?', options: ['(dy/dt)/(dx/dt)', '(dx/dt)/(dy/dt)', 'dy/dt', 'dx/dt'], answer: '(dy/dt)/(dx/dt)', explanation: 'Chain rule application', difficulty: 'medium'}], tips: ['⭐ Learn parametric rules', '⭐ Separate variables for DEs', '⭐ Check dimensions'], commonMistakes: ['❌ Wrong parametric formula', '❌ Not separating variables', '❌ Integration errors'], examStrategy: 'Further calculus: 10-15 marks. Show parameter clearly!'},
  
  {moduleNumber: 14, title: 'Further Trigonometry', duration: '105 min', introduction: 'Reciprocal trig, inverse trig, small angle approximations', keyPoints: ['sec, cosec, cot definitions', 'Inverse functions', 'Small angle: sinθ ≈ θ, cosθ ≈ 1', 'Compound angles', 'R-formula'], explanation: 'Advanced trig for complex problems', examples: [{question: 'Find range of arcsin', workingOut: 'Domain: [-1,1]\nRange: [-π/2, π/2]', answer: '[-π/2, π/2]', explanation: 'Principal values'}], practiceQuestions: [{question: 'secθ = ?', options: ['1/cosθ', '1/sinθ', 'cosθ', 'sinθ'], answer: '1/cosθ', explanation: 'Reciprocal of cos', difficulty: 'easy'}], tips: ['⭐ Learn reciprocals', '⭐ Small angle for approximation', '⭐ Check domains'], commonMistakes: ['❌ Wrong reciprocal', '❌ Domain errors', '❌ Small angle misuse'], examStrategy: 'Further trig: 6-10 marks per paper!'},
  
  {moduleNumber: 15, title: 'Further Algebra', duration: '100 min', introduction: 'Inequalities, modulus graphs, transformations', keyPoints: ['Solve inequalities algebraically', 'Modulus graphs', 'Sketch transformations', 'Regions', 'Critical values'], explanation: 'Advanced algebraic techniques and graphical work', examples: [{question: 'Solve |x-2| < 3', workingOut: '-3 < x-2 < 3\n-1 < x < 5', answer: '-1 < x < 5', explanation: 'Remove modulus both ways'}], practiceQuestions: [{question: '|x| < 2 means?', options: ['-2 < x < 2', 'x < 2', 'x > -2', 'x ≠ 2'], answer: '-2 < x < 2', explanation: 'Between -2 and 2', difficulty: 'easy'}], tips: ['⭐ Sketch modulus', '⭐ Test regions', '⭐ Check critical points'], commonMistakes: ['❌ Wrong inequality signs', '❌ Missing region', '❌ Not testing'], examStrategy: 'Further algebra: 8-12 marks!'},
  
  {moduleNumber: 16, title: 'Graphs & Transformations', duration: '95 min', introduction: 'Function transformations, curve sketching, asymptotes', keyPoints: ['y = f(x) + a: shift up', 'y = f(x+a): shift left', 'y = af(x): stretch vertical', 'Asymptotes', 'Key features'], explanation: 'Graph transformations essential for understanding functions', examples: [{question: 'Describe y = f(x-2) + 3', workingOut: 'Right 2, up 3', answer: 'Translate (2,3)', explanation: 'Horizontal then vertical'}], practiceQuestions: [{question: 'y = 2f(x) does what?', options: ['Stretch ×2 vertical', 'Stretch ×2 horizontal', 'Shift up 2', 'Shift right 2'], answer: 'Stretch ×2 vertical', explanation: 'Multiply y-values', difficulty: 'medium'}], tips: ['⭐ Horizontal opposite to sign', '⭐ Sketch key points', '⭐ Find asymptotes'], commonMistakes: ['❌ Wrong direction shift', '❌ Forgetting asymptotes', '❌ Scale errors'], examStrategy: 'Transformations: 6-10 marks!'},
  
  {moduleNumber: 17, title: 'Problem Solving & Modeling', duration: '110 min', introduction: 'Real-world applications, modeling, multi-step problems', keyPoints: ['Identify knowns/unknowns', 'Form equations', 'Solve systematically', 'Interpret results', 'Check reasonableness'], explanation: 'Apply A-Level maths to real scenarios', examples: [{question: 'Model exponential growth', workingOut: 'Use N = N₀eᵏᵗ formula\nIdentify N₀, k, t\nSubstitute and solve', answer: 'Apply exponential model', explanation: 'Use appropriate model'}], practiceQuestions: [{question: 'Exponential growth model?', options: ['N = N₀eᵏᵗ', 'N = N₀ + kt', 'N = kt²', 'N = N₀t'], answer: 'N = N₀eᵏᵗ', explanation: 'Exponential function', difficulty: 'medium'}], tips: ['⭐ Define variables clearly', '⭐ Check units', '⭐ Verify answer makes sense'], commonMistakes: ['❌ Wrong model choice', '❌ Unit errors', '❌ Not interpreting'], examStrategy: 'Modeling: 10-15 marks!'},
  
  {moduleNumber: 18, title: 'Calculus Applications', duration: '115 min', introduction: 'Optimization, rates of change, kinematics', keyPoints: ['Max/min problems', 'Related rates', 'Kinematics: v = ds/dt', 'a = dv/dt', 'Optimization constraints'], explanation: 'Use calculus to solve real problems', examples: [{question: 'Maximize area with 20m fence', workingOut: 'A = xy, constraint: 2x+y=20\nSubstitute, differentiate, solve', answer: 'Optimize using calculus', explanation: 'Use constraint'}], practiceQuestions: [{question: 'Velocity is?', options: ['ds/dt', 'd²s/dt²', 's/t', 'at'], answer: 'ds/dt', explanation: 'Rate of change of displacement', difficulty: 'easy'}], tips: ['⭐ Form equation first', '⭐ Use constraints', '⭐ Check second derivative'], commonMistakes: ['❌ Forgetting constraints', '❌ Not checking max/min', '❌ Units'], examStrategy: 'Applications: 12-18 marks!'},
  
  {moduleNumber: 19, title: 'Exam Technique & Strategy', duration: '100 min', introduction: 'Past paper practice, time management, common errors', keyPoints: ['1.5 mins per mark', 'Show ALL working', 'Check answers', 'Attempt everything', 'Learn mark schemes'], explanation: 'Exam technique crucial for A* grades', examples: [{question: 'Time for 8-mark question?', workingOut: '8 × 1.5 = 12 minutes', answer: '12 minutes', explanation: 'Allow 1.5 min per mark'}], practiceQuestions: [{question: 'If stuck on question?', options: ['Move on, return later', 'Spend 20 mins', 'Give up', 'Guess'], answer: 'Move on, return later', explanation: 'Don\'t waste time', difficulty: 'easy'}], tips: ['⭐ Practice past papers', '⭐ Learn mark schemes', '⭐ Time yourself'], commonMistakes: ['❌ Poor time management', '❌ Not showing working', '❌ Giving up'], examStrategy: 'Master exam technique for A*!'},
  
  {moduleNumber: 20, title: 'A* Questions & Grade 9 Strategies', duration: '120 min', introduction: 'Tackle the hardest questions, unfamiliar problems, synoptic questions', keyPoints: ['Multi-step problems', 'Unfamiliar contexts', 'Combine topics', 'Proof questions', 'Show reasoning'], explanation: 'A* questions test deep understanding and problem-solving', examples: [{question: 'Synoptic multi-topic', workingOut: 'Combine calculus + trig + algebra\nBreak down systematically\nShow each step clearly', answer: 'Systematic approach', explanation: 'Use all knowledge'}], practiceQuestions: [{question: 'A* boundary typically?', options: ['80-85%', '90-95%', '70-75%', '95-100%'], answer: '80-85%', explanation: 'Usually around 80-85%', difficulty: 'easy'}], tips: ['⭐ Practice A* questions', '⭐ Combine topics', '⭐ Don\'t give up', '⭐ Show reasoning'], commonMistakes: ['❌ Giving up too easily', '❌ Not showing working', '❌ Panic'], examStrategy: 'A* requires 80-85% - practice hard questions daily! Combine topics, show reasoning, never give up. You can do this! 🎯'}
];

export default aLevelPureMathsContent;


