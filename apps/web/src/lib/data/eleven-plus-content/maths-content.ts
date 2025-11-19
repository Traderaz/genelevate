/**
 * 11+ Maths Course Content
 * UK-specific content aligned with GL Assessment, CEM, and ISEB exam boards
 * Comprehensive mathematics for grammar school entrance exams
 */

import { LessonContent } from './verbal-reasoning-content';

export const elevenPlusMathsContent: LessonContent[] = [
  // ==================== MODULE 1: Number and Place Value ====================
  {
    moduleNumber: 1,
    title: 'Number and Place Value',
    duration: '45 minutes',
    introduction: `Master numbers, place value, and number operations. This foundational skill underpins all mathematics in the 11+ exam.`,
    keyPoints: [
      'Understand place value: ones, tens, hundreds, thousands, etc.',
      'Read and write numbers up to millions',
      'Compare and order numbers',
      'Round numbers to nearest 10, 100, 1000',
      'Identify prime numbers, factors, and multiples'
    ],
    explanation: `
**Place Value:**
Each digit's value depends on its position:
- 3,456 = 3 thousands, 4 hundreds, 5 tens, 6 ones
- 3,000 + 400 + 50 + 6 = 3,456

**Key Concepts:**

**Comparing Numbers:**
- Use < (less than), > (greater than), = (equal to)
- 3,456 < 3,567 (compare digit by digit, left to right)

**Rounding:**
- Round 3,456 to nearest 10 = 3,460 (look at ones digit: 6≥5, round up)
- Round 3,456 to nearest 100 = 3,500 (look at tens digit: 5≥5, round up)
- Round 3,456 to nearest 1000 = 3,000 (look at hundreds digit: 4<5, round down)

**Prime Numbers:**
- Only divisible by 1 and itself
- First 10 primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
- 2 is the only even prime

**Factors and Multiples:**
- Factors of 12: 1, 2, 3, 4, 6, 12 (numbers that divide 12 exactly)
- Multiples of 12: 12, 24, 36, 48... (12 times table)

**UK 11+ Focus:**
All exam boards test number fundamentals. GL and ISEB particularly emphasize factors/multiples/primes.
    `,
    examples: [
      {
        question: 'What is the value of 7 in 47,532?',
        workingOut: `The 7 is in the thousands position.
7 thousands = 7,000`,
        answer: '7,000',
        explanation: 'Position determines value - 7 in thousands place = 7,000.'
      },
      {
        question: 'Round 3,785 to the nearest hundred.',
        workingOut: `Look at tens digit: 8
8 ≥ 5, so round up
3,785 → 3,800`,
        answer: '3,800',
        explanation: 'Tens digit (8) is ≥5, so round hundreds up: 7→8.'
      },
      {
        question: 'List all factors of 24.',
        workingOut: `Which numbers divide 24 exactly?
1 × 24 = 24
2 × 12 = 24
3 × 8 = 24
4 × 6 = 24
Factors: 1, 2, 3, 4, 6, 8, 12, 24`,
        answer: '1, 2, 3, 4, 6, 8, 12, 24',
        explanation: 'Factors are numbers that divide evenly into 24.'
      }
    ],
    practiceQuestions: [
      {
        question: '345,678: value of 4?',
        options: ['4', '40', '4,000', '40,000'],
        answer: '40,000',
        explanation: '4 is in ten-thousands position = 40,000.',
        difficulty: 'easy'
      },
      {
        question: 'Round 5,678 to nearest 1,000:',
        options: ['5,000', '5,500', '5,700', '6,000'],
        answer: '6,000',
        explanation: 'Hundreds digit is 6 (≥5), round up: 5,000→6,000.',
        difficulty: 'easy'
      },
      {
        question: 'Which is largest? 45,678 or 45,876',
        options: ['45,678', '45,876', 'Equal', 'Cannot tell'],
        answer: '45,876',
        explanation: 'Compare digit by digit: hundreds place 8>6.',
        difficulty: 'easy'
      },
      {
        question: 'Is 27 prime?',
        options: ['Yes', 'No', 'Sometimes', 'Cannot tell'],
        answer: 'No',
        explanation: '27 = 3 × 9, divisible by 3. Not prime.',
        difficulty: 'medium'
      },
      {
        question: 'Lowest common multiple of 4 and 6?',
        options: ['12', '24', '6', '4'],
        answer: '12',
        explanation: 'Multiples of 4: 4,8,12... Multiples of 6: 6,12... Lowest common: 12.',
        difficulty: 'hard'
      },
      {
        question: 'How many prime numbers between 10 and 20?',
        options: ['3', '4', '5', '6'],
        answer: '4',
        explanation: '11, 13, 17, 19 (four primes).',
        difficulty: 'hard'
      }
    ],
    tips: [
      'Know place value positions by heart',
      'For rounding: look at digit to the right',
      'Learn primes up to 30',
      'Factor pairs work together: if 2×12=24, both are factors',
      'Practice with large numbers - millions appear in exams',
      'Use number lines for comparing',
      'Check factors systematically: start with 1, work up'
    ],
    commonMistakes: [
      'Confusing place values',
      'Looking at wrong digit when rounding',
      'Thinking 1 is prime (it\'s not!)',
      'Missing factor pairs',
      'Not checking all factors',
      'Confusing factors with multiples'
    ],
    examStrategy: `
**Time:** 45-60 seconds per question

**Quick Checks:**
- Place value: count positions from right
- Rounding: circle digit to right of rounding position
- Primes: check if divisible by 2,3,5,7
- Factors: work systematically in pairs

**GL/CEM/ISEB:** Number questions appear throughout - master the basics!
    `
  },

  // ==================== REMAINING 8 MODULES IN EFFICIENT FORMAT ====================
  {
    moduleNumber: 2,
    title: 'Addition, Subtraction, Multiplication, Division',
    duration: '50 minutes',
    introduction: `Master the four operations. Quick, accurate calculation is essential for 11+ success.`,
    keyPoints: ['Know times tables up to 12×12 instantly', 'Column addition/subtraction with carrying', 'Long multiplication and short division', 'Mental strategies for quick calculation', 'Word problems requiring operations'],
    explanation: `**Times Tables:** Must be instant recall. **Column Methods:** For larger numbers. **Mental Maths:** Partitioning, rounding, compensating. **BIDMAS:** Order of operations - Brackets, Indices, Division/Multiplication, Addition/Subtraction. **UK 11+:** All boards expect fluent calculation.`,
    examples: [
      { question: '347 + 568 = ?', workingOut: 'Column: 7+8=15 (carry 1), 4+6+1=11 (carry 1), 3+5+1=9. Answer: 915', answer: '915', explanation: 'Use column method with carrying.' },
      { question: '23 × 45 = ?', workingOut: '23×40=920, 23×5=115, 920+115=1,035', answer: '1,035', explanation: 'Partition: (23×40)+(23×5).' },
      { question: '144 ÷ 12 = ?', workingOut: '12×12=144, so 144÷12=12', answer: '12', explanation: 'Use times table knowledge.' }
    ],
    practiceQuestions: [
      { question: '678 + 345 = ?', options: ['913', '923', '1,023', '1,013'], answer: '1,023', explanation: 'Column addition.', difficulty: 'easy' },
      { question: '8 × 7 = ?', options: ['54', '56', '63', '64'], answer: '56', explanation: 'Times table fact.', difficulty: 'easy' },
      { question: '1,000 - 567 = ?', options: ['433', '443', '533', '543'], answer: '433', explanation: 'Column subtraction with borrowing.', difficulty: 'medium' },
      { question: '15 × 16 = ?', options: ['225', '240', '250', '260'], answer: '240', explanation: '15×16=(15×10)+(15×6)=150+90=240.', difficulty: 'medium' },
      { question: 'What is 20% of 80?', options: ['12', '16', '18', '20'], answer: '16', explanation: '20%=1/5, 80÷5=16.', difficulty: 'hard' },
      { question: '3+4×2=?', options: ['11', '14', '10', '8'], answer: '11', explanation: 'BIDMAS: multiply first 4×2=8, then 3+8=11.', difficulty: 'hard' }
    ],
    tips: ['Learn times tables - practice daily!', 'Use mental strategies first', 'Check answers with inverse operations', 'Show working in exams', 'BIDMAS order is crucial'],
    commonMistakes: ['Times table errors', 'Forgetting to carry/borrow', 'Wrong BIDMAS order', 'Misaligning columns', 'Calculation errors under time pressure'],
    examStrategy: `**Practice speed and accuracy. Time: 30-60 seconds per calculation. Use inverse to check.**`
  },

  {
    moduleNumber: 3,
    title: 'Fractions, Decimals, and Percentages',
    duration: '50 minutes',
    introduction: `Convert between fractions, decimals, and percentages. Essential for all 11+ maths papers.`,
    keyPoints: ['Simplify fractions to lowest terms', 'Convert between forms', 'Calculate fractions of amounts', 'Understand equivalences', 'Solve percentage problems'],
    explanation: `**Equivalents:** 1/2=0.5=50%, 1/4=0.25=25%, 3/4=0.75=75%, 1/10=0.1=10%. **Converting:** Fraction→Decimal (divide), Decimal→Percentage (×100), Percentage→Fraction (over 100, simplify). **Operations:** Add/subtract fractions (common denominator), multiply fractions (multiply across), divide fractions (flip and multiply).`,
    examples: [
      { question: 'Simplify 12/16', workingOut: 'HCF of 12 and 16 is 4. 12÷4=3, 16÷4=4. Answer: 3/4', answer: '3/4', explanation: 'Divide numerator and denominator by HCF.' },
      { question: 'Convert 0.6 to fraction', workingOut: '0.6 = 6/10 = 3/5 (simplify)', answer: '3/5', explanation: '0.6 = 6 tenths = 6/10 = 3/5.' },
      { question: '25% of 80?', workingOut: '25%=1/4, 80÷4=20', answer: '20', explanation: '25%=quarter, find quarter of 80.' }
    ],
    practiceQuestions: [
      { question: '1/2 + 1/4 = ?', options: ['2/6', '3/4', '2/4', '1/3'], answer: '3/4', explanation: '2/4 + 1/4 = 3/4 (common denominator 4).', difficulty: 'easy' },
      { question: '0.75 as fraction?', options: ['75/100', '3/4', '7/10', '3/5'], answer: '3/4', explanation: '0.75=75/100=3/4 (simplified).', difficulty: 'easy' },
      { question: '30% as decimal?', options: ['3.0', '0.3', '0.03', '30'], answer: '0.3', explanation: '30%=30/100=0.30=0.3.', difficulty: 'easy' },
      { question: '2/3 of 24?', options: ['12', '16', '18', '8'], answer: '16', explanation: '24÷3=8, 8×2=16.', difficulty: 'medium' },
      { question: '1/3 × 1/4 = ?', options: ['1/7', '1/12', '2/7', '4/12'], answer: '1/12', explanation: 'Multiply across: 1×1=1, 3×4=12, gives 1/12.', difficulty: 'medium' },
      { question: 'Increase 50 by 20%', options: ['55', '60', '65', '70'], answer: '60', explanation: '20% of 50=10, 50+10=60.', difficulty: 'hard' }
    ],
    tips: ['Learn common equivalents', 'Always simplify final answers', 'Use diagrams for visual understanding', 'Percentage of = multiply (as decimal)', 'Common denominator for adding fractions'],
    commonMistakes: ['Not simplifying', 'Wrong conversions', 'Adding fractions without common denominator', 'Percentage errors', 'Forgetting to multiply back'],
    examStrategy: `**Know key equivalents by heart. Time: 60-90 seconds per question. Check by converting to different form.**`
  },

  {
    moduleNumber: 4,
    title: 'Algebra and Equations',
    duration: '45 minutes',
    introduction: `Solve equations and work with algebra. Year 6 algebra prepares you for secondary school.`,
    keyPoints: ['Understand letters represent numbers', 'Solve simple equations', 'Substitute values into formulas', 'Simplify expressions', 'Form equations from problems'],
    explanation: `**Algebra Basics:** x,y represent unknown numbers. **Solving:** Find value that makes equation true. **Rules:** Same operation both sides keeps equation balanced. **Simplifying:** Collect like terms (3x+2x=5x). **Substitution:** Replace letters with numbers and calculate.`,
    examples: [
      { question: 'Solve: x+5=12', workingOut: 'x+5=12, subtract 5 both sides: x=12-5=7', answer: 'x=7', explanation: 'Isolate x by subtracting 5 from both sides.' },
      { question: 'If a=3, find 2a+4', workingOut: '2a+4 = 2(3)+4 = 6+4 = 10', answer: '10', explanation: 'Substitute a=3, then calculate.' },
      { question: 'Simplify: 5x+3x', workingOut: '5x+3x = (5+3)x = 8x', answer: '8x', explanation: 'Collect like terms: add coefficients.' }
    ],
    practiceQuestions: [
      { question: 'Solve: x+8=15', options: ['x=5', 'x=6', 'x=7', 'x=8'], answer: 'x=7', explanation: '15-8=7.', difficulty: 'easy' },
      { question: 'If y=4, find 3y', options: ['7', '12', '34', '43'], answer: '12', explanation: '3×4=12.', difficulty: 'easy' },
      { question: 'Simplify: 7a-3a', options: ['4a', '10a', '4', '10'], answer: '4a', explanation: '7-3=4, keep the a: 4a.', difficulty: 'easy' },
      { question: 'Solve: 2x=16', options: ['x=6', 'x=8', 'x=14', 'x=32'], answer: 'x=8', explanation: '16÷2=8.', difficulty: 'medium' },
      { question: 'If n=5, find n²+2', options: ['12', '27', '35', '52'], answer: '27', explanation: '5²=25, 25+2=27.', difficulty: 'medium' },
      { question: 'Solve: 3x+2=17', options: ['x=5', 'x=6', 'x=7', 'x=19'], answer: 'x=5', explanation: '3x=17-2=15, x=15÷3=5.', difficulty: 'hard' }
    ],
    tips: ['Think of equations as balanced scales', 'Same operation both sides', 'Check answer by substituting back', 'Collect like terms first', 'Watch for order of operations'],
    commonMistakes: ['Not balancing both sides', 'Mixing up operations', 'Calculation errors', 'Not simplifying fully', 'Forgetting negative numbers'],
    examStrategy: `**Time: 60-90 seconds. Check by substituting answer back into equation.**`
  },

  {
    moduleNumber: 5,
    title: 'Geometry: Shapes and Properties',
    duration: '45 minutes',
    introduction: `Master 2D and 3D shapes, angles, and properties. Geometry appears in all 11+ papers.`,
    keyPoints: ['Know properties of common shapes', 'Calculate perimeter and area', 'Understand angles and types', 'Identify lines of symmetry', 'Recognize 3D shapes'],
    explanation: `**2D Shapes:** Triangle (3 sides), quadrilateral (4), pentagon (5), hexagon (6), etc. **Angles:** Right (90°), acute (<90°), obtuse (>90°<180°), reflex (>180°). Angles in triangle=180°, quadrilateral=360°. **Perimeter:** Distance around. **Area:** Space inside (rectangle=l×w, triangle=½b×h). **Symmetry:** Mirror line.`,
    examples: [
      { question: 'Perimeter of rectangle 6cm by 4cm?', workingOut: 'P=2(l+w)=2(6+4)=2(10)=20cm', answer: '20cm', explanation: 'Add all sides: 6+4+6+4=20 or use formula 2(l+w).' },
      { question: 'Area of triangle, base 8cm, height 5cm?', workingOut: 'A=½bh=½×8×5=½×40=20cm²', answer: '20cm²', explanation: 'Triangle area = half base times height.' },
      { question: 'Angles in triangle: 60° and 80°. Third angle?', workingOut: 'Total=180°, 180-60-80=40°', answer: '40°', explanation: 'Angles in triangle sum to 180°.' }
    ],
    practiceQuestions: [
      { question: 'How many sides in pentagon?', options: ['4', '5', '6', '7'], answer: '5', explanation: 'Penta=5, pentagon has 5 sides.', difficulty: 'easy' },
      { question: 'Perimeter of square, side 5cm?', options: ['10cm', '15cm', '20cm', '25cm'], answer: '20cm', explanation: '5+5+5+5=20 or 4×5=20.', difficulty: 'easy' },
      { question: 'Right angle is?', options: ['45°', '90°', '180°', '360°'], answer: '90°', explanation: 'Right angle = 90 degrees.', difficulty: 'easy' },
      { question: 'Area of rectangle 8cm×3cm?', options: ['11cm²', '22cm²', '24cm²', '32cm²'], answer: '24cm²', explanation: '8×3=24cm².', difficulty: 'medium' },
      { question: 'Lines of symmetry in square?', options: ['2', '3', '4', '8'], answer: '4', explanation: '4 lines: 2 diagonal, 2 through midpoints.', difficulty: 'medium' },
      { question: 'Name 3D shape: 6 square faces?', options: ['Cube', 'Cuboid', 'Pyramid', 'Prism'], answer: 'Cube', explanation: 'Cube has 6 identical square faces.', difficulty: 'hard' }
    ],
    tips: ['Learn shape names and properties', 'Draw diagrams to help', 'Memorize area/perimeter formulas', 'Count sides for interior angles', 'Practice with protractor'],
    commonMistakes: ['Confusing perimeter and area', 'Wrong formulas', 'Not converting units', 'Miscounting sides/angles', 'Calculation errors'],
    examStrategy: `**Draw shapes if not given. Label known values. Time: 60-90 seconds per question.**`
  },

  {
    moduleNumber: 6,
    title: 'Measurement and Units',
    duration: '40 minutes',
    introduction: `Convert units and solve measurement problems. Practical maths used in real life.`,
    keyPoints: ['Convert between metric units', 'Understand time (12/24 hour)', 'Calculate with money', 'Read scales accurately', 'Solve multi-step problems'],
    explanation: `**Length:** 10mm=1cm, 100cm=1m, 1000m=1km. **Weight:** 1000g=1kg, 1000kg=1tonne. **Volume:** 1000ml=1l. **Time:** 60 sec=1 min, 60 min=1 hr, 24 hr=1 day. **Money:** 100p=£1. **Converting:** ×to go smaller, ÷to go bigger.`,
    examples: [
      { question: 'Convert 3.5m to cm', workingOut: '1m=100cm, 3.5m=3.5×100=350cm', answer: '350cm', explanation: 'Multiply by 100 to convert m→cm.' },
      { question: 'Film starts 2:45pm, ends 4:30pm. Duration?', workingOut: '2:45 to 3:45 = 1 hr, 3:45 to 4:30 = 45 min. Total: 1 hr 45 min', answer: '1 hour 45 minutes', explanation: 'Count hours then minutes.' },
      { question: '3 items at £1.25 each. Total?', workingOut: '£1.25×3=£3.75', answer: '£3.75', explanation: 'Multiply price by quantity.' }
    ],
    practiceQuestions: [
      { question: '200cm = ? m', options: ['0.2m', '2m', '20m', '200m'], answer: '2m', explanation: '200÷100=2m.', difficulty: 'easy' },
      { question: '3kg = ? g', options: ['30g', '300g', '3,000g', '30,000g'], answer: '3,000g', explanation: '3×1,000=3,000g.', difficulty: 'easy' },
      { question: '14:30 in 12-hour time?', options: ['2:30am', '2:30pm', '4:30pm', '14:30pm'], answer: '2:30pm', explanation: '14-12=2, afternoon=pm.', difficulty: 'easy' },
      { question: '£5 - £2.35 = ?', options: ['£2.65', '£2.75', '£3.65', '£3.75'], answer: '£2.65', explanation: '5.00-2.35=2.65.', difficulty: 'medium' },
      { question: '500ml + 1.5l = ? ml', options: ['650ml', '1,000ml', '1,550ml', '2,000ml'], answer: '2,000ml', explanation: '1.5l=1,500ml, 500+1,500=2,000ml.', difficulty: 'medium' },
      { question: 'Train journey: 3 hours 45 min. Start 10:20am, arrive?', options: ['1:05pm', '2:05pm', '1:55pm', '2:55pm'], answer: '2:05pm', explanation: '10:20+3hr=13:20(1:20pm), +45min=14:05(2:05pm).', difficulty: 'hard' }
    ],
    tips: ['Learn conversions by heart', 'Draw number lines for time', 'Use column method for money', 'Watch for mixed units', 'Check answers make sense'],
    commonMistakes: ['Wrong conversion direction', 'Mixing units', '12/24 hour confusion', 'Calculation errors with decimals', 'Not converting before calculating'],
    examStrategy: `**Check units match before calculating. Time: 60 seconds per question.**`
  },

  {
    moduleNumber: 7,
    title: 'Data Handling and Statistics',
    duration: '40 minutes',
    introduction: `Interpret graphs, tables, and statistics. Extract information from visual data.`,
    keyPoints: ['Read bar charts, line graphs, pie charts', 'Interpret tables and timetables', 'Calculate mean, median, mode, range', 'Solve problems from data', 'Draw own graphs'],
    explanation: `**Mean:** Average (add all, divide by how many). **Median:** Middle value (order first). **Mode:** Most common value. **Range:** Highest-lowest. **Graphs:** Read axes carefully, check scales. **Tables:** Find information systematically.`,
    examples: [
      { question: 'Data: 3, 7, 5, 9, 6. Find mean.', workingOut: 'Sum: 3+7+5+9+6=30. Count: 5 numbers. Mean: 30÷5=6', answer: '6', explanation: 'Mean = total ÷ count.' },
      { question: 'Data: 2, 9, 5, 2, 7. Find mode.', workingOut: 'Mode = most common. 2 appears twice, others once. Mode=2', answer: '2', explanation: 'Mode is most frequent value.' },
      { question: 'Bar chart: Mon=5, Tue=8, Wed=6. Total?', workingOut: '5+8+6=19', answer: '19', explanation: 'Add values from chart.' }
    ],
    practiceQuestions: [
      { question: 'Numbers: 4,6,8. Mean?', options: ['4', '5', '6', '7'], answer: '6', explanation: '(4+6+8)÷3=18÷3=6.', difficulty: 'easy' },
      { question: 'Data: 1,3,5,7. Range?', options: ['4', '6', '7', '8'], answer: '6', explanation: 'Range=highest-lowest=7-1=6.', difficulty: 'easy' },
      { question: 'Median of 3,1,4,2,5?', options: ['1', '2', '3', '4'], answer: '3', explanation: 'Order: 1,2,3,4,5. Middle=3.', difficulty: 'medium' },
      { question: 'Pie chart: 1/4 red, total 40. How many red?', options: ['4', '10', '14', '20'], answer: '10', explanation: '1/4 of 40 = 40÷4=10.', difficulty: 'medium' },
      { question: 'Line graph shows temperature rising 2° per hour. Start 10°, after 4 hours?', options: ['12°', '14°', '16°', '18°'], answer: '18°', explanation: '10+(2×4)=10+8=18°.', difficulty: 'hard' },
      { question: 'Table: 3 columns, 5 rows. How many data cells?', options: ['8', '12', '15', '18'], answer: '15', explanation: '3×5=15 cells.', difficulty: 'easy' }
    ],
    tips: ['Read titles and labels', 'Check scales carefully', 'Order data for median', 'Show working for mean', 'Use ruler for reading graphs'],
    commonMistakes: ['Misreading scales', 'Not ordering for median', 'Wrong mean calculation', 'Missing graph labels', 'Confusing mean/median/mode'],
    examStrategy: `**Read question carefully - what data is needed? Time: 60-90 seconds per question.**`
  },

  {
    moduleNumber: 8,
    title: 'Problem Solving and Reasoning',
    duration: '50 minutes',
    introduction: `Apply maths to real problems. Multi-step questions test your thinking skills.`,
    keyPoints: ['Understand the problem', 'Identify relevant information', 'Choose appropriate methods', 'Work systematically', 'Check answers make sense'],
    explanation: `**Problem Solving Steps:** 1) Read carefully, 2) Identify what you need to find, 3) Choose method, 4) Calculate, 5) Check. **Types:** Word problems, multi-step calculations, logical reasoning, patterns. **Key Words:** Total (add), difference (subtract), each (multiply), share (divide). **Reasoning:** Explain your thinking, use examples.`,
    examples: [
      { question: 'Shop sells pencils at 35p each. How many can you buy with £2?', workingOut: '£2=200p. 200÷35=5 remainder 25. Can buy 5 pencils (25p left over).', answer: '5 pencils', explanation: 'Convert to same units, divide to find how many.' },
      { question: 'Pattern: 2, 5, 8, 11, ?', workingOut: 'Difference: +3 each time. 11+3=14', answer: '14', explanation: 'Identify pattern (+3), apply to find next.' },
      { question: 'Cinema: 120 seats. 3/4 full. How many empty?', workingOut: '3/4 full means 1/4 empty. 120÷4=30 empty', answer: '30', explanation: 'Find fraction of total: 1/4 of 120.' }
    ],
    practiceQuestions: [
      { question: 'Bus holds 48. 36 passengers. How many empty seats?', options: ['10', '12', '14', '16'], answer: '12', explanation: '48-36=12.', difficulty: 'easy' },
      { question: '5 friends share £15 equally. Each gets?', options: ['£2', '£3', '£5', '£10'], answer: '£3', explanation: '15÷5=3.', difficulty: 'easy' },
      { question: 'Book costs £8. Save £2 per week. Weeks needed?', options: ['2', '4', '6', '16'], answer: '4', explanation: '8÷2=4 weeks.', difficulty: 'medium' },
      { question: 'Rectangle: length 3×width. Perimeter 32cm. Width?', options: ['4cm', '6cm', '8cm', '12cm'], answer: '4cm', explanation: 'w+3w+w+3w=8w=32, w=4.', difficulty: 'hard' },
      { question: 'Pattern: 1,4,9,16. Next term?', options: ['20', '21', '24', '25'], answer: '25', explanation: 'Square numbers: 1²,2²,3²,4², next is 5²=25.', difficulty: 'medium' },
      { question: 'Train: 8 carriages, 40 seats each. 2/5 occupied. Empty seats?', options: ['128', '192', '200', '320'], answer: '192', explanation: 'Total=8×40=320. 2/5 full=3/5 empty. 320×3/5=192.', difficulty: 'hard' }
    ],
    tips: ['Highlight key information', 'Draw diagrams', 'Break into steps', 'Check units', 'Use estimation to check', 'Show all working'],
    commonMistakes: ['Not reading carefully', 'Missing steps', 'Wrong operation', 'Calculation errors', 'Not checking answer', 'Forgetting units'],
    examStrategy: `**Read twice. Plan before calculating. Show clear working. Time: 2-3 minutes for complex problems.**`
  },

  {
    moduleNumber: 9,
    title: 'Practice Papers and Exam Technique',
    duration: '60 minutes',
    introduction: `Final module: master 11+ maths exam technique. Practice, timing, and confidence for success.`,
    keyPoints: ['Know exam format', 'Manage time effectively', 'Show clear working', 'Check answers', 'Stay calm under pressure'],
    explanation: `
**UK 11+ Maths Exams:**

**GL Assessment:**
- 50 questions, 50 minutes
- Multiple choice and written
- Calculator NOT allowed
- All topics covered

**CEM:**
- 25-30 questions, 25-30 minutes
- Often combined with other subjects
- More challenging problems
- No calculator

**ISEB:**
- Similar to GL format
- Some schools allow calculators (check!)
- 45-60 minutes
- Variety of question types

**Time Management:**
- Quick questions (facts, tables): 30 sec
- Calculation questions: 60 sec
- Problem solving: 2-3 min
- Leave time to check: 5 min

**Success Strategies:**
1. Read every question twice
2. Show all working
3. Use space provided
4. Skip and return to hard questions
5. Check calculations
6. Watch for units
7. Estimate to check answers make sense

**Common Topics:**
- Number operations: 25%
- Fractions/Decimals/Percentages: 20%
- Problem solving: 20%
- Geometry: 15%
- Algebra: 10%
- Data: 10%

**Key Skills:**
- Times tables (instant recall)
- Mental calculation strategies
- Written methods (column, long multiplication)
- Fraction/decimal conversions
- Formula knowledge
- Problem-solving approach
    `,
    examples: [
      { question: 'Time management: 50 questions, 50 minutes. Average time per question?', workingOut: '50 min ÷ 50 questions = 1 min per question. But leave 5 min for checking, so 45 min for 50 questions ≈ 54 seconds each.', answer: 'About 1 minute each', explanation: 'Plan time carefully, leave buffer for checking.' }
    ],
    practiceQuestions: [
      { question: 'Stuck on question for 2 minutes. Best strategy?', options: ['Keep trying', 'Skip and return', 'Guess immediately', 'Give up'], answer: 'Skip and return', explanation: 'Don\'t waste time - move on, come back later.', difficulty: 'easy' },
      { question: 'Should you show working?', options: ['No, waste time', 'Yes, always', 'Only if asked', 'Only for hard questions'], answer: 'Yes, always', explanation: 'Working can earn marks even if answer is wrong.', difficulty: 'easy' },
      { question: 'Answer seems too big. What to do?', options: ['Leave it', 'Check calculation', 'Change randomly', 'Cross out'], answer: 'Check calculation', explanation: 'Always verify if answer seems wrong.', difficulty: 'easy' },
      { question: 'Calculator allowed in most 11+ exams?', options: ['Yes', 'No', 'Sometimes', 'Only ISEB'], answer: 'No', explanation: 'Most UK 11+ exams don\'t allow calculators.', difficulty: 'easy' },
      { question: 'Best prep week before exam?', options: ['Learn new topics', 'Practice papers', 'Nothing', 'Panic'], answer: 'Practice papers', explanation: 'Timed practice builds confidence and identifies weaknesses.', difficulty: 'easy' },
      { question: 'In last 5 minutes, what to do?', options: ['Start new questions', 'Check answers', 'Rest', 'Count questions'], answer: 'Check answers', explanation: 'Use remaining time to verify work and fix errors.', difficulty: 'easy' }
    ],
    tips: [
      'Do 6-8 full practice papers',
      'Time yourself strictly',
      'Know times tables perfectly',
      'Practice mental calculations daily',
      'Review mistakes thoroughly',
      'Learn from errors',
      'Stay calm and confident',
      'Read questions carefully'
    ],
    commonMistakes: [
      'Poor time management',
      'Not showing working',
      'Rushing calculations',
      'Not checking answers',
      'Panicking over hard questions',
      'Missing simple questions',
      'Forgetting units',
      'Not practicing enough'
    ],
    examStrategy: `
**Exam Day Plan:**
1. Read instructions carefully
2. Quick scan of whole paper
3. Answer easy questions first
4. Skip hard questions initially
5. Show clear working always
6. Mark skipped questions
7. Return to skipped questions
8. Final 5 minutes: check everything

**Checking Techniques:**
- Estimate first - does answer make sense?
- Use inverse operations
- Check units are correct
- Verify you answered the question asked
- Look for calculation errors

**Mental Preparation:**
- You've practiced well
- Stay calm and focused
- One question at a time
- Trust your knowledge
- Do your best!

**Remember:** 
- Times tables are essential
- Show your working
- Manage your time
- Check your answers
- Stay confident

**You've got this!** 🌟
    `
  }
];

