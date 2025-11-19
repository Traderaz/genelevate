/**
 * 11+ Non-Verbal Reasoning Course Content
 * UK-specific content aligned with GL Assessment, CEM, and ISEB exam boards
 * Focuses on visual patterns, spatial reasoning, and shape manipulation
 */

import { LessonContent } from './verbal-reasoning-content';

export const nonVerbalReasoningContent: LessonContent[] = [
  // ==================== MODULE 1: Shape Patterns and Sequences ====================
  {
    moduleNumber: 1,
    title: 'Shape Patterns and Sequences',
    duration: '45 minutes',
    introduction: `Shape patterns test your ability to spot visual sequences and predict what comes next. This is a fundamental skill in non-verbal reasoning and appears in all UK 11+ exam boards.`,
    keyPoints: [
      'Look for changes in shape, size, rotation, shading, and position',
      'Patterns can involve one or multiple changes',
      'Changes should be consistent throughout the sequence',
      'Consider both what changes AND what stays the same',
      'Practice visualizing the next step before looking at options'
    ],
    explanation: `
**What are Shape Patterns?**
Shape patterns show a series of shapes that change according to a rule. You must identify the rule and predict the next shape.

**Types of Changes to Look For:**

1. **Rotation:** Shape turns clockwise or anticlockwise
   - 90° turns (quarter turn)
   - 180° turns (half turn)
   - 45° turns (eighth turn)

2. **Reflection:** Shape flips (mirror image)
   - Vertical flip (left-right)
   - Horizontal flip (up-down)

3. **Size Changes:** Shape gets bigger or smaller
   - Growing progressively
   - Shrinking progressively
   - Alternating sizes

4. **Shading/Colour:** Changes in how shape is filled
   - Empty → Half-shaded → Fully shaded
   - Different pattern fills
   - Black → White → Grey cycles

5. **Position:** Where the shape appears
   - Moving left/right/up/down
   - Circling around
   - Swapping positions

6. **Number:** How many shapes
   - Adding shapes
   - Removing shapes
   - Combining shapes

**Multiple Changes:**
Often, 2-3 changes happen at once!
Example: A shape rotates 90° AND moves right AND changes shading

**UK 11+ Exam Boards:**
- **GL Assessment:** Heavy emphasis on rotation and reflection
- **CEM:** Often combines multiple changes
- **ISEB:** Includes complex multi-step patterns
    `,
    examples: [
      {
        question: 'A square rotates 90° clockwise in each step. If it starts upright, what position after 3 turns?',
        workingOut: `Starting position: ⬜ (upright square)
After 1 turn (90° clockwise): ⬜ (rotated once)
After 2 turns (180°): ⬜ (upside down from start)
After 3 turns (270°): ⬜ (rotated three times)

Result: The square has made 3 quarter-turns clockwise (270° total).`,
        answer: 'Square rotated 270° clockwise from start',
        explanation: 'Each 90° rotation moves the square a quarter turn. After 3 turns, it\'s rotated 270° (three-quarters of a full rotation).'
      },
      {
        question: 'A circle moves one space right in each step. It starts on the left. After 3 steps, where is it?',
        workingOut: `Start: ●□□□ (circle on left)
Step 1: □●□□ (moved one right)
Step 2: □□●□ (moved one more right)
Step 3: □□□● (moved one more right)

The circle is now on the right.`,
        answer: 'Circle is on the far right',
        explanation: 'Each step moves the circle one position to the right. After 3 steps, it has moved 3 positions.'
      },
      {
        question: 'A triangle alternates between white and black. Pattern: White, Black, White, ?, Black',
        workingOut: `Looking at the pattern:
1st: White
2nd: Black
3rd: White
4th: ? (should be Black to continue alternating)
5th: Black

The pattern alternates between White and Black.`,
        answer: 'Black',
        explanation: 'The triangle alternates colors with each step: White→Black→White→Black→White. The 4th position must be Black.'
      }
    ],
    practiceQuestions: [
      {
        question: 'A shape rotates 45° clockwise each time. After 4 rotations, how many degrees has it turned?',
        options: ['90°', '135°', '180°', '225°'],
        answer: '180°',
        explanation: '4 rotations × 45° each = 180° total (half a full rotation).',
        difficulty: 'easy'
      },
      {
        question: 'Shapes are added: 1 star, 2 stars, 3 stars, ? stars, 5 stars',
        options: ['3', '4', '5', '6'],
        answer: '4',
        explanation: 'Adding one star each time: 1, 2, 3, 4, 5 - simple counting sequence.',
        difficulty: 'easy'
      },
      {
        question: 'A hexagon moves: top→right→bottom→left→?. Where next?',
        options: ['Top', 'Bottom', 'Left', 'Right'],
        answer: 'Top',
        explanation: 'Pattern moves clockwise around positions: top, right, bottom, left, back to top.',
        difficulty: 'medium'
      },
      {
        question: 'Shading: Empty, Quarter, Half, Three-quarters, ?',
        options: ['Empty', 'Full', 'Half', 'Quarter'],
        answer: 'Full',
        explanation: 'Shading increases by quarter each time until fully shaded.',
        difficulty: 'medium'
      },
      {
        question: 'Pattern: Circle rotates 90° AND grows. After 2 steps from start, it has rotated ___° and is ___ size.',
        options: ['90°, small', '180°, medium', '180°, large', '90°, large'],
        answer: '180°, large',
        explanation: 'TWO changes at once: 90°×2=180° rotation, and it grows with each step.',
        difficulty: 'hard'
      },
      {
        question: 'Triangle flips vertically, then horizontally, then vertically. Net effect after 3 flips?',
        options: ['Back to start', 'Vertical flip only', 'Horizontal flip only', 'Both flips'],
        answer: 'Horizontal flip only',
        explanation: 'Vertical + Horizontal + Vertical = Horizontal (vertical flips cancel out).',
        difficulty: 'hard'
      }
    ],
    tips: [
      'Draw arrows to track rotation direction (clockwise ⟳ or anticlockwise ⟲)',
      'Count carefully - 90° = quarter turn, 180° = half turn, 360° = full turn',
      'For multiple changes, check EACH type of change separately',
      'Look for what DOESN\'T change - this helps eliminate wrong answers',
      'If stuck, trace the pattern with your finger',
      'Practice visualizing shapes in your mind',
      'Remember: shapes can rotate, reflect, move, change size, or change shading'
    ],
    commonMistakes: [
      'Confusing clockwise and anticlockwise rotation',
      'Missing one of multiple simultaneous changes',
      'Miscounting the number of steps or degrees',
      'Forgetting that some features stay constant',
      'Not checking if the pattern continues throughout',
      'Assuming the pattern is simpler than it actually is'
    ],
    examStrategy: `
**Time Management:** 30-45 seconds per question

**Systematic Approach:**
1. Look at the first few shapes carefully
2. Identify ONE type of change (rotation, position, etc.)
3. Check if this change is consistent
4. Look for additional changes
5. Predict the next shape
6. Check against options

**Quick Checks:**
- Does it rotate? Which direction? How much?
- Does it move? Which direction?
- Does shading/color change? What pattern?
- Does size change?
- Do the number of elements change?

**GL/CEM/ISEB Tips:** All boards test this heavily - practice makes perfect!
    `
  },

  // ==================== MODULE 2: Odd One Out ====================
  {
    moduleNumber: 2,
    title: 'Odd One Out',
    duration: '40 minutes',
    introduction: `Odd One Out questions test your ability to identify which shape doesn't follow the same rule as the others. This requires careful observation and logical thinking.`,
    keyPoints: [
      'Look for what makes most shapes similar',
      'The odd one out breaks the pattern or rule',
      'Check multiple features: shape, sides, angles, shading, symmetry',
      'Only ONE shape should be different in a specific way',
      'Be systematic - check each shape against the rule'
    ],
    explanation: `
**What is Odd One Out?**
You're shown 5-6 shapes. One doesn't fit the pattern that the others follow. Your job is to identify which one and why.

**Common Rules to Check:**

1. **Number of Sides:**
   - All have 4 sides except one
   - All triangles except one square

2. **Angles:**
   - All have right angles except one
   - All have acute angles except one

3. **Symmetry:**
   - All symmetrical except one
   - All have line symmetry except one has rotational only

4. **Shading:**
   - All shaded the same except one
   - All have same pattern except one

5. **Size:**
   - All same size except one
   - All large except one small

6. **Orientation:**
   - All point same direction except one
   - All upright except one rotated

7. **Number of Elements:**
   - All have 2 shapes except one has 3
   - All have dots inside except one doesn't

8. **Shape Type:**
   - All regular polygons except one irregular
   - All curved except one has straight sides

**UK 11+ Context:**
All exam boards include Odd One Out. It tests observation skills and logical categorization.
    `,
    examples: [
      {
        question: 'Five shapes: Circle, Square, Triangle, Pentagon, Letter L. Which is odd?',
        workingOut: `Checking each shape:
- Circle: curved, no corners, regular
- Square: 4 sides, 4 right angles, regular
- Triangle: 3 sides, regular
- Pentagon: 5 sides, regular
- Letter L: irregular, made of rectangles

Rule: All are regular, simple shapes EXCEPT Letter L (irregular).`,
        answer: 'Letter L',
        explanation: 'L is the only irregular/composite shape. All others are simple, regular geometric shapes.'
      },
      {
        question: 'Shapes: All rectangles but oriented differently. A is horizontal, B vertical, C horizontal, D vertical, E diagonal.',
        workingOut: `Looking at orientation:
- A: Horizontal (upright)
- B: Vertical (upright)
- C: Horizontal (upright)
- D: Vertical (upright)
- E: Diagonal (tilted/rotated)

Rule: All are upright (horizontal or vertical) EXCEPT E which is tilted diagonally.`,
        answer: 'E',
        explanation: 'E is the only shape not aligned with horizontal/vertical axes.'
      },
      {
        question: 'Shapes all have dots: A(2 dots), B(2 dots), C(3 dots), D(2 dots), E(2 dots)',
        workingOut: `Counting dots in each:
- A: 2 dots
- B: 2 dots
- C: 3 dots (different!)
- D: 2 dots
- E: 2 dots

Rule: All have 2 dots EXCEPT C which has 3.`,
        answer: 'C',
        explanation: 'C is the only shape with a different number of dots (3 instead of 2).'
      }
    ],
    practiceQuestions: [
      {
        question: 'Which is odd? Triangle, Square, Pentagon, Hexagon, Circle',
        options: ['Triangle', 'Square', 'Pentagon', 'Circle'],
        answer: 'Circle',
        explanation: 'All have straight sides except Circle which is curved.',
        difficulty: 'easy'
      },
      {
        question: 'Five squares: four are white, one is black. Which feature makes one odd?',
        options: ['Shape', 'Size', 'Color', 'Orientation'],
        answer: 'Color',
        explanation: 'The black square is different in color - all others are white.',
        difficulty: 'easy'
      },
      {
        question: 'Shapes: 4 have line symmetry, 1 has only rotational symmetry. Which is the odd concept?',
        options: ['Line symmetry', 'Rotational symmetry', 'Both', 'Neither'],
        answer: 'Rotational symmetry',
        explanation: 'The shape with only rotational symmetry is odd - all others have line symmetry.',
        difficulty: 'medium'
      },
      {
        question: 'Five shapes: A(3 sides), B(4 sides), C(5 sides), D(6 sides), E(3 sides). Which is odd by a different reason?',
        options: ['A', 'B', 'C', 'E'],
        answer: 'E',
        explanation: 'If pattern is increasing sides (3,4,5,6), then E breaks it. Or two shapes with 3 sides makes E redundant.',
        difficulty: 'medium'
      },
      {
        question: 'All shapes are shaded top-half except one is shaded bottom-half. What makes it odd?',
        options: ['Shading position', 'Shading amount', 'Shape type', 'Size'],
        answer: 'Shading position',
        explanation: 'The position of shading (bottom vs top) makes one shape different.',
        difficulty: 'hard'
      },
      {
        question: 'Four shapes have 2 right angles each, one has 4 right angles. Odd one out?',
        options: ['The one with 4', 'All with 2', 'Cannot tell', 'None'],
        answer: 'The one with 4',
        explanation: 'Four shapes share the property of having 2 right angles; one is different with 4.',
        difficulty: 'hard'
      }
    ],
    tips: [
      'Check each property systematically: sides, angles, shading, size, position',
      'Count carefully - number of sides, angles, elements',
      'Look for the property that 4-5 shapes share but one doesn\'t',
      'If multiple shapes seem odd, recheck your rule',
      'The difference must be clear and objective, not subjective',
      'Practice recognizing polygons: triangle (3), square (4), pentagon (5), hexagon (6), etc.',
      'Check for symmetry - draw imaginary lines through shapes'
    ],
    commonMistakes: [
      'Choosing a shape that\\\'s odd for the wrong reason',
      'Not checking all properties before deciding',
      'Missing subtle differences like orientation or shading',
      'Confusing "different" with "odd one out" - all shapes are different!',
      'Not identifying the specific rule that most shapes follow',
      'Overthinking when the answer is obvious'
    ],
    examStrategy: `
**Time Management:** 30-45 seconds per question

**Step-by-Step Method:**
1. Quick glance - any obvious odd shape?
2. If not obvious, check systematically:
   - Count sides
   - Check angles
   - Look at shading/color
   - Check symmetry
   - Compare sizes
   - Check orientation
3. Identify what 4-5 shapes have in common
4. Find which one lacks that property
5. Verify your answer

**Quick Decision Tree:**
- All same shape type? → Check other features
- All different shapes? → Check shared properties (sides, angles, etc.)
- Similar but not identical? → Look for the subtle difference

**Exam Board Tips:** This is a quick-mark question if you're systematic!
    `
  },

  // ==================== MODULE 3: Analogies with Shapes ====================
  {
    moduleNumber: 3,
    title: 'Analogies with Shapes',
    duration: '45 minutes',
    introduction: `Shape analogies test your ability to identify relationships between shapes and apply the same relationship to complete a second pair. This combines visual reasoning with logical thinking.`,
    keyPoints: [
      'Identify how the first shape changes to become the second',
      'Apply the SAME change to the third shape',
      'Changes can be rotation, reflection, shading, size, or combination',
      'Both pairs must follow identical logic',
      'Visualize the change before looking at options'
    ],
    explanation: `
**What are Shape Analogies?**
Format: Shape A is to Shape B as Shape C is to ?

You must work out the relationship between A and B, then apply it to C to find the answer.

**Common Transformations:**
1. **Rotation**: First shape rotates → second does same
2. **Reflection**: First flips → second flips same way
3. **Shading**: First changes shading → second does too
4. **Size**: First grows/shrinks → second does same
5. **Addition**: Element added to first → add to second
6. **Removal**: Element removed from first → remove from second

**Example:**
Square rotates 90° clockwise to become rotated square.
Triangle should also rotate 90° clockwise.

**UK 11+ Boards:** All boards test analogies - they combine multiple skills.
    `,
    examples: [
      { question: 'White circle : Black circle :: White square : ?', workingOut: 'First pair: color changes from white to black. Apply same to square: white square becomes black square.', answer: 'Black square', explanation: 'The relationship is color inversion - apply same to second pair.' },
      { question: 'Big triangle : Small triangle :: Big hexagon : ?', workingOut: 'First pair: size reduces. Apply to hexagon: big hexagon becomes small hexagon.', answer: 'Small hexagon', explanation: 'Both pairs show size reduction.' },
      { question: 'Square rotated 0° : Square rotated 90° :: Circle with line at 0° : ?', workingOut: 'First pair: 90° clockwise rotation. Apply to circle: rotate the line 90° clockwise.', answer: 'Circle with line at 90°', explanation: 'Consistent 90° rotation in both pairs.' }
    ],
    practiceQuestions: [
      { question: 'Empty star : Filled star :: Empty heart : ?', options: ['Empty heart', 'Filled heart', 'Empty star', 'Filled star'], answer: 'Filled heart', explanation: 'Relationship is filling/shading the shape.', difficulty: 'easy' },
      { question: 'Triangle pointing up : Triangle pointing down :: Arrow pointing right : ?', options: ['Arrow up', 'Arrow down', 'Arrow left', 'Arrow right'], answer: 'Arrow left', explanation: '180° rotation (opposite direction).', difficulty: 'medium' },
      { question: 'Square with 1 dot : Square with 2 dots :: Pentagon with 1 dot : ?', options: ['Pentagon 1 dot', 'Pentagon 2 dots', 'Pentagon 3 dots', 'Square 2 dots'], answer: 'Pentagon 2 dots', explanation: 'Add one dot to the shape.', difficulty: 'medium' },
      { question: 'Large circle outside small circle : Small circle inside large circle :: Large square outside small square : ?', options: ['Separate squares', 'Small inside large', 'Large inside small', 'Overlapping'], answer: 'Small inside large', explanation: 'Position relationship reverses (outside→inside).', difficulty: 'hard' },
      { question: 'Triangle : Triangle reflected vertically :: Pentagon : ?', options: ['Pentagon rotated', 'Pentagon reflected vertically', 'Pentagon same', 'Pentagon reflected horizontally'], answer: 'Pentagon reflected vertically', explanation: 'Same transformation (vertical reflection) applied.', difficulty: 'easy' },
      { question: 'One line : Two parallel lines :: One circle : ?', options: ['Two circles', 'One circle', 'Three circles', 'Two overlapping circles'], answer: 'Two circles', explanation: 'Relationship is doubling the shape/element.', difficulty: 'medium' }
    ],
    tips: [
      'Always identify the transformation in the first pair before attempting second',
      'Write it down: "A changes to B by [transformation]"',
      'Apply the EXACT same transformation to C',
      'Check all aspects: rotation, reflection, size, shading, position, number',
      'If multiple changes occur, apply ALL of them',
      'Visualize the answer before looking at options',
      'Practice makes perfect - the more you do, the faster you get'
    ],
    commonMistakes: [
      'Not identifying all changes in first pair',
      'Applying a different transformation to second pair',
      'Missing subtle changes like shading or small rotations',
      'Choosing shapes that look similar but don\'t follow the pattern',
      'Forgetting that BOTH pairs must have identical relationships',
      'Rushing and not checking all answer options'
    ],
    examStrategy: `
**Time: 45-60 seconds per question**

**Method:**
1. Study first pair (A → B)
2. List all changes (rotation? reflection? shading? size?)
3. Apply SAME changes to C
4. Predict answer
5. Find matching option
6. Verify it follows identical pattern

**Quick check:** Can you describe the relationship in one clear sentence that applies to both pairs?
    `
  },

  // ==================== MODULE 4: Matrices and Grids ====================
  {
    moduleNumber: 4,
    title: 'Matrices and Grids',
    duration: '50 minutes',
    introduction: `Matrix questions present shapes in a grid where rows and columns follow specific patterns. You must identify the pattern to find the missing shape. This is one of the most challenging non-verbal reasoning question types.`,
    keyPoints: [
      'Check patterns across rows (left to right)',
      'Check patterns down columns (top to bottom)',
      'Look for what changes and what stays constant',
      'Missing shape must fit BOTH its row AND column pattern',
      'Consider rotation, reflection, shading, position, and number'
    ],
    explanation: `
**What are Matrix Questions?**
A 3×3 grid of shapes with one square missing. You must find which shape completes the pattern.

**How to Solve:**
1. **Row Pattern**: Do shapes change in a pattern across each row?
2. **Column Pattern**: Do shapes change down each column?
3. **Both**: The answer must satisfy BOTH row and column rules

**Common Patterns:**
- **Rotation**: Each shape rotates 90° across row
- **Shading**: Shading changes across row or down column
- **Position**: Elements move position systematically
- **Addition**: Elements are added/removed
- **Combination**: Each row/column shows different combinations

**Example 3×3 Grid:**
Row 1: Circle, Square, Triangle
Row 2: Square, Triangle, Circle
Row 3: Triangle, Circle, ?

Pattern: Each row contains circle, square, triangle in different orders.
Answer: Square (to complete the set in row 3)

**UK Exam Focus:** GL and CEM love matrices - they test multiple skills at once.
    `,
    examples: [
      { question: '3×3 grid where each row has shapes rotated 90° more than previous. Top-left is upright square. Bottom-right is?', workingOut: 'Row 1: 0°, 90°, 180°. Row 2: 90°, 180°, 270°. Row 3: 180°, 270°, ?=360°=0°', answer: '0° (full rotation, back to start)', explanation: 'Pattern increases rotation by 90° across and down.' },
      { question: 'Grid where each row must have one circle, one square, one triangle. Row 3 has circle and triangle. Missing shape?', workingOut: 'Row needs: circle (✓), square (?), triangle (✓). Missing: square.', answer: 'Square', explanation: 'Each row must contain all three shapes once.' },
      { question: 'Grid where shading increases: empty, half, full across rows. Missing square in middle row, second column?', workingOut: 'Row 2 pattern: half-shaded shapes. Column 2 pattern: half-shaded shapes. Answer: half-shaded.', answer: 'Half-shaded square', explanation: 'Must match both row and column shading pattern.' }
    ],
    practiceQuestions: [
      { question: 'Each row has 1, 2, 3 dots. Row 3 has 1 dot, then 2 dots, then ?', options: ['1 dot', '2 dots', '3 dots', '4 dots'], answer: '3 dots', explanation: 'Pattern increases dots: 1, 2, 3 in each row.', difficulty: 'easy' },
      { question: 'Shapes rotate 90° clockwise across each row. If row starts with 0°, third position is?', options: ['90°', '180°', '270°', '0°'], answer: '180°', explanation: '0° → 90° → 180° across row.', difficulty: 'easy' },
      { question: '3×3 grid: each row contains circle, square, triangle (order varies). Row 3 has square, circle, ?', options: ['Square', 'Circle', 'Triangle', 'Pentagon'], answer: 'Triangle', explanation: 'Each row needs all three shapes; triangle is missing.', difficulty: 'medium' },
      { question: 'Shading pattern across rows: white, grey, black. Down columns: white, grey, black. Position (3,3) is?', options: ['White', 'Grey', 'Black', 'Mixed'], answer: 'Black', explanation: 'Third row=black, third column=black. Must be black.', difficulty: 'medium' },
      { question: 'Grid where row 1 adds dots (1,2,3), row 2 removes dots (3,2,1), row 3 pattern is?', options: ['Stays same', 'Adds dots', 'Removes dots', 'Alternates'], answer: 'Adds dots', explanation: 'Pattern alternates by row: add, remove, add.', difficulty: 'hard' },
      { question: 'Complex grid: shapes rotate 45° across + shading increases down. Position (2,2) is 45° rotated and?', options: ['White', 'Half-shaded', 'Fully-shaded', 'Black'], answer: 'Half-shaded', explanation: 'Column 2, row 2 = middle shading (half-shaded).', difficulty: 'hard' }
    ],
    tips: [
      'Always check BOTH rows and columns - answer must fit both!',
      'Start with the easiest pattern to spot',
      'If stuck, check what the complete rows/columns have in common',
      'Use process of elimination - rule out impossible answers',
      'Draw or mark patterns if allowed',
      'Time management: if very stuck after 90 seconds, guess and move on',
      'Practice different grid sizes: 2×2, 3×3, 2×3'
    ],
    commonMistakes: [
      'Only checking row pattern, forgetting column pattern',
      'Assuming pattern is simpler than it is',
      'Not checking if answer works for BOTH row AND column',
      'Getting confused with multiple simultaneous changes',
      'Spending too long on very difficult matrices',
      'Not using elimination to narrow down options'
    ],
    examStrategy: `
**Time: 60-90 seconds per matrix**

**Systematic Approach:**
1. Check row pattern (across)
2. Check column pattern (down)
3. Identify missing square position
4. Predict what fits BOTH patterns
5. Check options
6. Verify answer satisfies both row and column

**If stuck:**
- Check diagonal patterns
- Look for what\'s unique in each row/column
- Use elimination
- Make educated guess if needed

**GL/CEM/ISEB:** Matrices are high-value questions - worth the time investment!
    `
  },

  // ==================== MODULES 5-10: Efficient Format ====================
  {
    moduleNumber: 5,
    title: 'Rotations and Reflections',
    duration: '45 minutes',
    introduction: `Master the art of rotating and reflecting shapes. These transformations are fundamental to non-verbal reasoning and appear in almost every 11+ exam.`,
    keyPoints: ['Rotation: shape turns around a central point', 'Reflection: shape flips to create mirror image', 'Clockwise vs anticlockwise rotation', 'Vertical vs horizontal reflection', 'Multiple transformations can combine'],
    explanation: `**Rotations:** 90° (quarter), 180° (half), 270° (three-quarters), 360° (full). **Reflections:** Vertical (left↔right) or Horizontal (up↔down). Practice visualizing these mentally.`,
    examples: [
      { question: 'L shape rotates 90° clockwise. What position?', workingOut: 'Imagine L turning right by quarter turn.', answer: 'L rotated 90° right', explanation: 'Visualize the rotation direction and amount.' },
      { question: 'F reflected vertically becomes?', workingOut: 'F flipped left-right creates backward F.', answer: 'Backward F', explanation: 'Vertical reflection creates mirror image.' },
      { question: 'Shape rotates 180° then reflects horizontally. Net effect?', workingOut: 'Two transformations combine for specific result.', answer: 'Combined transformation', explanation: 'Track each transformation step by step.' }
    ],
    practiceQuestions: [
      { question: 'Square rotates 90°. How many degrees for full rotation?', options: ['180°', '270°', '360°', '450°'], answer: '360°', explanation: 'Full rotation is always 360°.', difficulty: 'easy' },
      { question: 'Triangle reflects vertically twice. Result?', options: ['Original', 'Reflected once', 'Rotated', 'Upside down'], answer: 'Original', explanation: 'Two identical reflections cancel out.', difficulty: 'medium' },
      { question: 'P rotates 180°. What does it look like?', options: ['d', 'q', 'b', 'p'], answer: 'd', explanation: 'P upside down looks like d.', difficulty: 'medium' },
      { question: 'Shape rotates 90° clockwise then 90° anticlockwise. Net change?', options: ['180°', '0°', '90°', '270°'], answer: '0°', explanation: 'Opposite rotations cancel out.', difficulty: 'hard' },
      { question: 'Z reflected horizontally becomes?', options: ['N', 'S', 'Z', 'Reversed Z'], answer: 'Z', explanation: 'Z has horizontal symmetry - looks same when flipped up-down.', difficulty: 'easy' },
      { question: 'Complex shape: rotate 270° clockwise = rotate ? anticlockwise', options: ['90°', '180°', '270°', '360°'], answer: '90°', explanation: '270° clockwise = 90° anticlockwise (360°-270°=90°).', difficulty: 'hard' }
    ],
    tips: ['Practice with real objects - rotate a book, reflect in mirror', 'Draw shapes on paper and physically turn/flip them', 'Learn common rotations: 90°, 180°, 270°', 'Remember: 2 identical transformations cancel out', 'Clockwise = right turn, Anticlockwise = left turn'],
    commonMistakes: ['Confusing clockwise with anticlockwise', 'Miscounting rotation degrees', 'Forgetting transformations can cancel', 'Not visualizing before answering', 'Missing that some shapes look same after rotation'],
    examStrategy: `**Practice mentally rotating shapes. Use hand gestures to help visualize. Time: 30-45 seconds per question.**`
  },

  {
    moduleNumber: 6,
    title: '3D Shape Visualization',
    duration: '50 minutes',
    introduction: `3D shape questions test your spatial reasoning - visualizing how flat patterns fold into 3D shapes or how 3D objects look from different angles.`,
    keyPoints: ['Understand nets: flat patterns that fold into 3D shapes', 'Visualize which faces connect', 'Recognize cubes, pyramids, prisms from different views', 'Consider hidden faces and edges', 'Practice folding paper nets physically'],
    explanation: `**Nets:** Flat patterns that fold into 3D shapes. **Common shapes:** Cubes (6 faces), pyramids (triangular faces), prisms. **Views:** Front, side, top views show different perspectives. **UK exams test:** Which net makes which 3D shape, which faces touch, different angle views.`,
    examples: [
      { question: 'Cube net: which faces are opposite?', workingOut: 'Visualize folding. Faces separated by one square fold to opposite sides.', answer: 'Faces 1 and 3 are opposite', explanation: 'Count squares between faces to find opposites.' },
      { question: 'Pyramid from top view looks like?', workingOut: 'Looking down on pyramid shows base shape (square for square pyramid).', answer: 'Square', explanation: 'Top view of pyramid shows its base.' },
      { question: 'How many faces can you see when looking at cube corner?', workingOut: 'From corner, you see 3 faces meeting.', answer: '3 faces', explanation: 'Maximum 3 faces visible from one viewpoint of cube.' }
    ],
    practiceQuestions: [
      { question: 'How many faces does a cube have?', options: ['4', '6', '8', '12'], answer: '6', explanation: 'Cube always has 6 square faces.', difficulty: 'easy' },
      { question: 'Cube net: if top face has dot, which face has it after folding?', options: ['Bottom', 'Side', 'Top', 'Cannot tell'], answer: 'Top', explanation: 'Dot position determined by net layout.', difficulty: 'medium' },
      { question: 'Square pyramid has how many triangular faces?', options: ['3', '4', '5', '6'], answer: '4', explanation: 'Square base + 4 triangular sides.', difficulty: 'easy' },
      { question: 'Two adjacent faces on net become adjacent on cube?', options: ['Always', 'Never', 'Sometimes', 'Depends'], answer: 'Sometimes', explanation: 'Depends on how they\'re positioned in net.', difficulty: 'hard' },
      { question: 'Looking at cube from front: you see square. From side?', options: ['Square', 'Rectangle', 'Triangle', 'Circle'], answer: 'Square', explanation: 'Cube faces are all squares.', difficulty: 'easy' },
      { question: 'Net folds into closed box. How many edges meet at one corner?', options: ['2', '3', '4', '6'], answer: '3', explanation: 'Three edges always meet at cube corner.', difficulty: 'medium' }
    ],
    tips: ['Print and fold paper nets to understand physically', 'Mark faces with numbers/letters to track them', 'Remember: opposite faces never touch in net', 'Visualize folding step-by-step', 'Practice with real boxes - unfold and refold them'],
    commonMistakes: ['Assuming adjacent faces in net stay adjacent in 3D', 'Not visualizing the folding direction', 'Forgetting hidden faces', 'Confusing different 3D shapes', 'Not practicing with physical models'],
    examStrategy: `**Use fingers to trace folding. Draw if needed. Practice with real objects at home. Time: 60-90 seconds for 3D questions.**`
  },

  {
    moduleNumber: 7,
    title: 'Shape Codes',
    duration: '40 minutes',
    introduction: `Shape codes use symbols to represent shapes, properties, or transformations. You must crack the code to solve the puzzle.`,
    keyPoints: ['Each code represents a specific property or transformation', 'Codes are consistent throughout the question', 'Use given examples to deduce the code', 'Apply code systematically', 'Check answer against all code rules'],
    explanation: `**Shape Codes:** Like word codes but with shapes. Example: ▲=rotate 90°, ●=reflect, ■=change shading. **Process:** 1) Study examples, 2) Identify what each symbol means, 3) Apply to new shape, 4) Verify.`,
    examples: [
      { question: 'Code: ▲ means rotate, ● means reflect. What does ▲● applied to square do?', workingOut: 'Apply in order: rotate square, then reflect it.', answer: 'Rotated and reflected square', explanation: 'Apply transformations in sequence.' },
      { question: 'If A=empty, B=half-shaded, C=full, what is shape C?', workingOut: 'C code means fully shaded.', answer: 'Fully shaded shape', explanation: 'Decode the symbol meaning.' },
      { question: 'Code combines: A+B=? If A=big, B=circle, A+B=?', workingOut: 'Combine properties: big circle.', answer: 'Big circle', explanation: 'Codes can combine properties.' }
    ],
    practiceQuestions: [
      { question: 'If ▲=triangle, ■=square, ●=circle, what is ■?', options: ['Triangle', 'Square', 'Circle', 'Pentagon'], answer: 'Square', explanation: 'Direct symbol-to-shape code.', difficulty: 'easy' },
      { question: 'Code: A=rotate 90°, B=reflect. AB means?', options: ['Rotate then reflect', 'Reflect then rotate', 'Both simultaneously', 'Neither'], answer: 'Rotate then reflect', explanation: 'Apply codes left to right in sequence.', difficulty: 'medium' },
      { question: 'If 1=white, 2=grey, 3=black, shape coded 23 is?', options: ['White', 'Grey to black', 'Black', 'Striped'], answer: 'Grey to black', explanation: 'Combined codes create gradient or pattern.', difficulty: 'medium' },
      { question: 'Complex code: X=size, Y=shading, Z=rotation. XYZ means apply?', options: ['All three', 'Only X', 'Only Z', 'X and Y'], answer: 'All three', explanation: 'Multiple codes apply all transformations.', difficulty: 'hard' },
      { question: 'If star gets code AB and becomes reflected rotated star, what does AB mean?', options: ['Reflect+Rotate', 'Just reflect', 'Just rotate', 'Neither'], answer: 'Reflect+Rotate', explanation: 'Deduce code meaning from example.', difficulty: 'easy' },
      { question: 'Code reversal: If AB=reflect+rotate, what is BA?', options: ['Same', 'Rotate+Reflect', 'Neither', 'Opposite'], answer: 'Rotate+Reflect', explanation: 'Order matters - reversed sequence.', difficulty: 'hard' }
    ],
    tips: ['Write down what each code means', 'Check code works for all given examples', 'Apply codes in the order given', 'Watch for combination codes', 'Test your answer against the code rules'],
    commonMistakes: ['Applying codes in wrong order', 'Not checking code meaning against all examples', 'Assuming code meaning without verification', 'Missing combination codes', 'Not being systematic'],
    examStrategy: `**Decode carefully. Write meanings down. Apply systematically. Time: 45-60 seconds.**`
  },

  {
    moduleNumber: 8,
    title: 'Complete the Series',
    duration: '40 minutes',
    introduction: `Complete the series questions show a sequence of shapes with a pattern. You must identify the pattern and draw/select the next shape in the series.`,
    keyPoints: ['Identify what changes between consecutive shapes', 'Pattern should be consistent throughout', 'Multiple properties may change', 'Predict next shape before looking at options', 'Verify pattern continues with your answer'],
    explanation: `**Series Questions:** Similar to sequences but often require drawing or more complex visualization. **Check:** rotation, reflection, position, shading, size, number of elements. **Practice:** mentally continuing patterns.`,
    examples: [
      { question: 'Series: circle, circle+dot, circle+2dots, ?', workingOut: 'Pattern adds one dot each time.', answer: 'Circle+3dots', explanation: 'Consistent addition pattern.' },
      { question: 'Shape grows: small, medium, large, ?', workingOut: 'Size increases each step.', answer: 'Extra large', explanation: 'Growth pattern continues.' },
      { question: 'Rotate+move: shape rotates 45° and moves right each time. After 4 steps from start?', workingOut: '45°×4=180° rotation, 4 positions right.', answer: 'Rotated 180°, far right', explanation: 'Track both changes simultaneously.' }
    ],
    practiceQuestions: [
      { question: 'Shading: empty, quarter, half, three-quarter, ?', options: ['Full', 'Empty', 'Half', 'Quarter'], answer: 'Full', explanation: 'Shading increases by quarter each time.', difficulty: 'easy' },
      { question: 'Sides: triangle(3), square(4), pentagon(5), ?', options: ['Triangle', 'Hexagon', 'Pentagon', 'Octagon'], answer: 'Hexagon', explanation: 'Adding one side each time: next is hexagon(6).', difficulty: 'easy' },
      { question: 'Pattern: big-small-big-small-big-?', options: ['Big', 'Small', 'Medium', 'Tiny'], answer: 'Small', explanation: 'Alternating size pattern.', difficulty: 'medium' },
      { question: 'Rotation: 0°, 45°, 90°, 135°, ?', options: ['180°', '225°', '45°', '90°'], answer: '180°', explanation: 'Adding 45° each time.', difficulty: 'medium' },
      { question: 'Complex: shape rotates 90° AND adds dot each time. After 3 steps?', options: ['270° + 3 dots', '180° + 2 dots', '90° + 1 dot', '360° + 4 dots'], answer: '270° + 3 dots', explanation: 'Both patterns continue independently.', difficulty: 'hard' },
      { question: 'Elements: 1 line, 2 lines, 4 lines, 8 lines, ?', options: ['12', '16', '10', '9'], answer: '16', explanation: 'Doubling each time: 1,2,4,8,16.', difficulty: 'hard' }
    ],
    tips: ['Write down the pattern in words', 'Check pattern holds for ALL given shapes', 'Count changes carefully', 'Consider multiple simultaneous changes', 'Visualize the next step before choosing'],
    commonMistakes: ['Assuming pattern after only 2 shapes', 'Missing one of multiple changes', 'Not checking pattern is consistent throughout', 'Miscounting rotations or additions', 'Choosing similar but incorrect pattern'],
    examStrategy: `**Identify pattern clearly. Apply to find next. Verify. Time: 30-45 seconds.**`
  },

  {
    moduleNumber: 9,
    title: 'Hidden Shapes',
    duration: '40 minutes',
    introduction: `Hidden shape questions test your ability to identify shapes concealed within complex figures or overlapping shapes.`,
    keyPoints: ['Look for complete shapes hidden in the figure', 'Shapes may overlap or be partially obscured', 'Count carefully - some shapes appear multiple times', 'Trace shapes with your finger or pencil', 'Check all possible orientations'],
    explanation: `**Hidden Shapes:** Find triangles, squares, etc. hidden in complex diagrams. **Tip:** Count systematically - small shapes first, then larger combinations. **Common:** Finding all triangles in a star, squares in a grid, circles in overlapping patterns.`,
    examples: [
      { question: 'Square divided by diagonal. How many triangles?', workingOut: 'Two triangles formed by the diagonal.', answer: '2 triangles', explanation: 'Diagonal creates two triangular halves.' },
      { question: 'Three circles overlap. How many distinct regions?', workingOut: 'Count each separate area created by overlaps.', answer: '7 regions', explanation: 'Overlapping creates multiple distinct areas.' },
      { question: 'Star shape. How many triangles total?', workingOut: 'Count: 5 points + 1 inner + combinations.', answer: '10+ triangles', explanation: 'Include point triangles and larger combinations.' }
    ],
    practiceQuestions: [
      { question: 'Rectangle crossed by two diagonals. How many triangles?', options: ['2', '4', '6', '8'], answer: '8', explanation: '4 small + 4 medium triangles.', difficulty: 'easy' },
      { question: 'Three lines intersecting at one point. How many angles formed?', options: ['3', '4', '6', '8'], answer: '6', explanation: 'Each line creates 2 angles at intersection.', difficulty: 'medium' },
      { question: 'Two squares overlap partially. How many distinct regions?', options: ['2', '3', '4', '5'], answer: '3', explanation: 'Left square, overlap, right square.', difficulty: 'medium' },
      { question: 'Pentagon has all diagonals drawn. How many triangles?', options: ['5', '10', '15', '35'], answer: '35', explanation: 'Combination of all possible triangles from vertices.', difficulty: 'hard' },
      { question: 'Grid of 2×2 squares. How many total squares (including combined)?', options: ['4', '5', '8', '9'], answer: '5', explanation: '4 small + 1 large (2×2).', difficulty: 'easy' },
      { question: 'Circle divided into 6 equal parts. How many triangles?', options: ['6', '12', '18', '24'], answer: '18', explanation: 'Count all possible triangle combinations.', difficulty: 'hard' }
    ],
    tips: ['Be systematic - count one size at a time', 'Mark counted shapes to avoid double-counting', 'Look for shapes in different orientations', 'Remember shapes can overlap', 'Check for larger shapes made from smaller combinations'],
    commonMistakes: ['Double-counting the same shape', 'Missing shapes in unusual orientations', 'Only counting obvious shapes, missing combinations', 'Forgetting to check all sizes', 'Not being systematic in counting'],
    examStrategy: `**Count systematically: smallest first, then combine. Mark or list. Time: 45-60 seconds.**`
  },

  {
    moduleNumber: 10,
    title: 'Practice Papers and Exam Strategy',
    duration: '60 minutes',
    introduction: `Final module combines all non-verbal reasoning skills in timed practice papers. Master exam technique and time management for 11+ success.`,
    keyPoints: ['Mix of all question types', 'Timed practice essential', 'Skip difficult questions, return later', 'Check spatial awareness questions carefully', 'Visualize before answering'],
    explanation: `**Practice Papers:** Full 45-50 question tests covering all non-verbal topics. **Distribution:** Patterns(20%), Odd-One-Out(15%), Analogies(15%), Matrices(20%), 3D(15%), Other(15%). **Boards:** GL standard format, CEM mixed, ISEB challenging visuals. **Key:** Spatial visualization, pattern recognition, logical thinking.`,
    examples: [
      { question: 'Practice Paper structure', workingOut: 'Complete 45-50 mixed questions in 45-50 minutes', answer: 'Full simulation', explanation: 'Builds exam stamina and technique.' }
    ],
    practiceQuestions: [
      { question: 'Best time per question average?', options: ['30 sec', '1 min', '2 min', '3 min'], answer: '1 min', explanation: '45 questions in 45 minutes = 1 min each average.', difficulty: 'easy' },
      { question: 'If stuck on matrix question after 90 sec, best strategy?', options: ['Keep trying', 'Guess and move on', 'Skip entirely', 'Spend 5 min'], answer: 'Guess and move on', explanation: 'Time management crucial - don\'t get stuck.', difficulty: 'medium' },
      { question: 'Order to attempt: All easy first or sequential?', options: ['Sequential', 'Easy first', 'Hard first', 'Random'], answer: 'Sequential', explanation: 'Work through in order, skip hard ones, return later.', difficulty: 'easy' },
      { question: 'Most time-consuming question type?', options: ['Odd-one-out', 'Matrices', 'Analogies', 'Patterns'], answer: 'Matrices', explanation: 'Matrices require checking multiple patterns.', difficulty: 'medium' },
      { question: 'Should you guess if running out of time?', options: ['Yes', 'No', 'Sometimes', 'Never'], answer: 'Yes', explanation: 'No negative marking - always guess rather than leave blank.', difficulty: 'easy' },
      { question: 'Best preparation week before exam?', options: ['Learn new content', 'Practice papers', 'Relax only', 'Cram everything'], answer: 'Practice papers', explanation: 'Practice under timed conditions builds confidence and technique.', difficulty: 'medium' }
    ],
    tips: ['Do 6-8 full practice papers before exam', 'Time yourself strictly', 'Review mistakes thoroughly', 'Visualize shapes mentally - practice daily', 'Stay calm - spatial questions can look harder than they are', 'Trust your preparation'],
    commonMistakes: ['Spending too long on difficult questions', 'Not practicing timed papers', 'Panicking over unfamiliar questions', 'Not checking answers if time permits', 'Forgetting to visualize before answering'],
    examStrategy: `
**Exam Day Plan:**
1. Quick scan of paper
2. Answer in order
3. Skip if stuck >60 seconds
4. Mark skipped questions
5. Return to skipped if time
6. Final check: all answered

**Non-Verbal Tips:**
- Visualize transformations mentally
- Use hand gestures for rotations
- Draw if helpful
- Trust first instinct
- Stay calm and focused

**Time Management:**
- Simple patterns: 30 sec
- Analogies: 45 sec
- Matrices: 60-90 sec
- 3D shapes: 60 sec

**You've got this! Trust your practice!** 🌟
    `
  }
];
