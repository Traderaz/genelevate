import { LessonContent } from './verbal-reasoning-content';

/**
 * 11+ Grammar School Mock Exams Content
 * Full-length practice exams replicating real 11+ test conditions
 * Includes all question types across Verbal Reasoning, Non-Verbal Reasoning, English, and Maths
 */

export const mockExamsContent: LessonContent[] = [
  // ==================== MODULE 1: BASELINE ASSESSMENT ====================
  {
    moduleNumber: 1,
    title: 'Baseline Assessment Mock',
    duration: '120 minutes (2 hours)',
    introduction: `Welcome to your Baseline Assessment Mock Exam! This comprehensive test will help you understand your current level across all 11+ subjects. It covers Verbal Reasoning, Non-Verbal Reasoning, English, and Mathematics.

**Purpose:** This assessment establishes your starting point and identifies strengths and areas for improvement.

**Format:** This mock exam follows the standard 11+ format used by most grammar schools. Take it seriously, as your results will guide your study plan.

**Instructions:**
- Find a quiet place with no distractions
- Use a timer for each section
- Work through questions in order
- Don't spend too long on any one question
- Mark your answers clearly
- Review your work if time permits`,
    keyPoints: [
      'This is a diagnostic test - don\'t worry about your score.',
      'Complete all four sections: VR, NVR, English, Maths.',
      'Time yourself strictly for each section.',
      'Make educated guesses if you\'re unsure.',
      'Note which questions you found difficult.',
      'Review explanations carefully after completing.'
    ],
    explanation: `
**About This Baseline Assessment**

This mock exam mirrors the structure of real 11+ entrance exams used by grammar schools across the UK. It combines all four core subjects to give you a complete picture of your current abilities.

**Exam Structure:**
1. **Verbal Reasoning** (25 minutes, 20 questions)
2. **Non-Verbal Reasoning** (25 minutes, 20 questions)
3. **English** (40 minutes, Reading Comprehension + Writing)
4. **Mathematics** (30 minutes, 25 questions)

**Total Time:** 120 minutes (2 hours)

**Scoring:**
Each section will be marked separately, and you'll receive:
- Your raw score (number of correct answers)
- Percentage score
- Standardized score (to compare with national averages)
- Detailed breakdown by question type
- Personalized feedback and recommendations

**What Happens After:**
1. **Immediate Feedback:** See which questions you got right/wrong
2. **Performance Analysis:** Understand your strengths and weaknesses
3. **Study Recommendations:** Get a personalized study plan
4. **Progress Tracking:** Compare future mocks to see improvement

**Why Baseline Assessment Matters:**
- Identifies your starting level in each subject
- Reveals which topics need most attention
- Helps set realistic goals
- Provides benchmark for measuring progress
- Reduces anxiety by familiarizing you with exam format
- Shows you how to pace yourself

**How to Use Your Results:**
- Don't be discouraged by a low score - this is your starting point!
- Focus on question types you struggled with
- Celebrate your strong areas
- Create a targeted revision plan
- Take regular mocks to track improvement

**Important Notes:**
- This is a **practice** exam, not the real thing
- Grammar schools typically require 80%+ for offers
- Most students improve significantly with practice
- Target schools may have different pass marks
- Use this to guide your preparation strategy
    `,
    examples: [
      {
        question: 'VERBAL REASONING SAMPLE: Choose the word that means the same as "ANCIENT"',
        workingOut: `Step 1: Understand the meaning of "ANCIENT" - very old, from long ago.
Step 2: Consider the options: Historic, Modern, New, Recent
Step 3: "Historic" is closest in meaning to ancient.`,
        answer: 'Historic',
        explanation: 'Ancient means belonging to the very distant past. Historic refers to something famous or important in history, making it the closest synonym.'
      },
      {
        question: 'NON-VERBAL REASONING SAMPLE: What shape comes next in the pattern? Circle, Square, Triangle, Circle, Square...',
        workingOut: `Step 1: Identify the pattern - Circle, Square, Triangle repeating.
Step 2: The sequence shows: Circle → Square → Triangle → Circle → Square → ?
Step 3: Following the pattern, the next shape is Triangle.`,
        answer: 'Triangle',
        explanation: 'The pattern repeats every three shapes: Circle, Square, Triangle. After the second Square, Triangle comes next.'
      },
      {
        question: 'ENGLISH SAMPLE: Identify the verb in this sentence: "The dog quickly ran across the park."',
        workingOut: `Step 1: A verb is an action word or state of being.
Step 2: Look at each word: The (article), dog (noun), quickly (adverb), ran (verb), across (preposition), the (article), park (noun).
Step 3: "Ran" is the action word - it tells us what the dog did.`,
        answer: 'ran',
        explanation: 'A verb describes an action or state. "Ran" is the past tense of "run" and describes the action the dog performed.'
      },
      {
        question: 'MATHS SAMPLE: Calculate: 15 × 8',
        workingOut: `Method 1 (Partitioning):
15 × 8 = (10 × 8) + (5 × 8)
       = 80 + 40
       = 120

Method 2 (Doubling):
15 × 8 = 15 × 4 × 2
       = 60 × 2
       = 120`,
        answer: '120',
        explanation: 'Breaking down 15 into 10 + 5 makes the multiplication easier: (10 × 8) + (5 × 8) = 80 + 40 = 120.'
      }
    ],
    practiceQuestions: [
      // VERBAL REASONING QUESTIONS (5 samples)
      {
        question: 'VR1: Find the synonym for "GENEROUS"',
        options: ['Selfish', 'Kind', 'Mean', 'Greedy'],
        answer: 'Kind',
        explanation: 'Generous means showing kindness and willingness to give. Kind is the closest synonym.',
        difficulty: 'easy'
      },
      {
        question: 'VR2: Complete the analogy: BIRD is to SKY as FISH is to ___',
        options: ['Ocean', 'Land', 'Air', 'Mountain'],
        answer: 'Ocean',
        explanation: 'Birds fly in the sky; fish swim in the ocean. This analogy shows the natural habitat of each animal.',
        difficulty: 'medium'
      },
      {
        question: 'VR3: Which word does NOT belong? Happy, Joyful, Sad, Cheerful',
        options: ['Happy', 'Joyful', 'Sad', 'Cheerful'],
        answer: 'Sad',
        explanation: 'Happy, Joyful, and Cheerful all mean feeling good. Sad is the opposite emotion.',
        difficulty: 'easy'
      },
      {
        question: 'VR4: If the code for CAT is DBU, what is the code for DOG?',
        options: ['EPH', 'COF', 'DPH', 'CPG'],
        answer: 'EPH',
        explanation: 'Each letter moves forward by one: C→D, A→B, T→U. So D→E, O→P, G→H = EPH.',
        difficulty: 'hard'
      },
      {
        question: 'VR5: Find the antonym of "DIFFICULT"',
        options: ['Hard', 'Easy', 'Complex', 'Tough'],
        answer: 'Easy',
        explanation: 'Difficult means hard to do. Easy is the opposite - simple and not requiring much effort.',
        difficulty: 'easy'
      },

      // NON-VERBAL REASONING QUESTIONS (5 samples)
      {
        question: 'NVR1: Which shape is the odd one out?',
        options: ['Circle', 'Square', 'Triangle', 'Oval'],
        answer: 'Oval',
        explanation: 'Circle, Square, and Triangle are basic geometric shapes taught in early maths. Oval is less common in this group.',
        difficulty: 'easy'
      },
      {
        question: 'NVR2: A square rotates 90° clockwise. Which way does it face?',
        options: ['Same position', 'Turned right', 'Upside down', 'Turned left'],
        answer: 'Turned right',
        explanation: 'A 90° clockwise rotation turns the shape to the right by a quarter turn.',
        difficulty: 'medium'
      },
      {
        question: 'NVR3: Pattern: White circle, Black circle, White circle. What comes next?',
        options: ['White circle', 'Black circle', 'Gray circle', 'White square'],
        answer: 'Black circle',
        explanation: 'The pattern alternates between white and black circles: White, Black, White, Black.',
        difficulty: 'easy'
      },
      {
        question: 'NVR4: If a shape has 6 sides, how many sides does the next shape in the pattern have if each shape adds 1 side?',
        options: ['5', '6', '7', '8'],
        answer: '7',
        explanation: 'Each shape adds one side: 6 + 1 = 7 sides.',
        difficulty: 'medium'
      },
      {
        question: 'NVR5: Which 2D shape unfolds from a cube?',
        options: ['Cross-shaped net', 'Circle', 'Triangle', 'Single square'],
        answer: 'Cross-shaped net',
        explanation: 'A cube unfolds into a cross-shaped net with 6 square faces.',
        difficulty: 'hard'
      },

      // ENGLISH QUESTIONS (6 samples)
      {
        question: 'ENG1: Which word is a noun in this sentence: "The bright sun shone warmly."',
        options: ['bright', 'sun', 'shone', 'warmly'],
        answer: 'sun',
        explanation: 'A noun is a person, place, or thing. "Sun" is a thing (an object in the sky).',
        difficulty: 'easy'
      },
      {
        question: 'ENG2: What punctuation mark goes at the end of a question?',
        options: ['Full stop', 'Question mark', 'Exclamation mark', 'Comma'],
        answer: 'Question mark',
        explanation: 'Questions always end with a question mark (?), which shows the sentence is asking something.',
        difficulty: 'easy'
      },
      {
        question: 'ENG3: Which word is spelled correctly?',
        options: ['Seperate', 'Separate', 'Seperete', 'Separete'],
        answer: 'Separate',
        explanation: 'The correct spelling is "separate" with an "a" in the middle, not "seperate".',
        difficulty: 'medium'
      },
      {
        question: 'ENG4: Identify the simile: "She was as quiet as a mouse."',
        options: ['She', 'quiet', 'as quiet as a mouse', 'mouse'],
        answer: 'as quiet as a mouse',
        explanation: 'A simile compares two things using "as" or "like". "As quiet as a mouse" is the complete simile.',
        difficulty: 'medium'
      },
      {
        question: 'ENG5: What is the plural of "child"?',
        options: ['Childs', 'Children', 'Childes', 'Childrens'],
        answer: 'Children',
        explanation: 'Child is an irregular noun. Its plural form is "children", not "childs".',
        difficulty: 'easy'
      },
      {
        question: 'ENG6: Which sentence uses correct grammar?',
        options: ['He don\'t like apples', 'He doesn\'t like apples', 'He not like apples', 'He no likes apples'],
        answer: 'He doesn\'t like apples',
        explanation: 'With "he" (third person singular), we use "doesn\'t" (does not), not "don\'t" (do not).',
        difficulty: 'medium'
      },

      // MATHEMATICS QUESTIONS (8 samples)
      {
        question: 'MATHS1: What is 345 rounded to the nearest 10?',
        options: ['340', '350', '300', '400'],
        answer: '350',
        explanation: '345 is closer to 350 than 340. When the units digit is 5 or more, we round up.',
        difficulty: 'easy'
      },
      {
        question: 'MATHS2: Calculate: 24 ÷ 6',
        options: ['3', '4', '5', '6'],
        answer: '4',
        explanation: '24 divided by 6 equals 4. You can check: 6 × 4 = 24.',
        difficulty: 'easy'
      },
      {
        question: 'MATHS3: What fraction is shaded if 3 out of 4 parts are colored?',
        options: ['1/4', '2/4', '3/4', '4/4'],
        answer: '3/4',
        explanation: 'If 3 parts out of 4 total parts are shaded, the fraction is 3/4 (three-quarters).',
        difficulty: 'easy'
      },
      {
        question: 'MATHS4: If a rectangle has length 8cm and width 5cm, what is its perimeter?',
        options: ['13cm', '26cm', '40cm', '20cm'],
        answer: '26cm',
        explanation: 'Perimeter = 2 × (length + width) = 2 × (8 + 5) = 2 × 13 = 26cm.',
        difficulty: 'medium'
      },
      {
        question: 'MATHS5: Convert 0.5 to a fraction',
        options: ['1/5', '1/2', '5/10', '1/2 or 5/10'],
        answer: '1/2 or 5/10',
        explanation: '0.5 means 5 tenths (5/10), which simplifies to 1/2 (one half).',
        difficulty: 'medium'
      },
      {
        question: 'MATHS6: What is 20% of 50?',
        options: ['5', '10', '15', '20'],
        answer: '10',
        explanation: '20% means 20/100. So 20% of 50 = (20/100) × 50 = 10.',
        difficulty: 'medium'
      },
      {
        question: 'MATHS7: If x + 7 = 15, what is x?',
        options: ['7', '8', '15', '22'],
        answer: '8',
        explanation: 'To find x, subtract 7 from both sides: x = 15 - 7 = 8. Check: 8 + 7 = 15 ✓',
        difficulty: 'hard'
      },
      {
        question: 'MATHS8: How many minutes are in 2.5 hours?',
        options: ['120', '125', '150', '250'],
        answer: '150',
        explanation: '1 hour = 60 minutes. So 2.5 hours = 2.5 × 60 = 150 minutes.',
        difficulty: 'medium'
      }
    ],
    tips: [
      'Read ALL questions carefully before starting - some may be easier than others.',
      'Keep an eye on the time - don\'t spend more than 1-2 minutes per question.',
      'Answer easier questions first, then return to harder ones.',
      'If stuck, make an educated guess and move on - you can always come back.',
      'In multiple choice, eliminate obviously wrong answers first.',
      'Show your working in maths - you may get partial credit.',
      'For English, read passages twice: once for understanding, once to answer questions.',
      'Check your answers if you have time at the end of each section.',
      'Stay calm and focused - it\'s just practice!',
      'Treat this like a real exam to get accurate results.'
    ],
    commonMistakes: [
      'Spending too long on difficult questions and running out of time.',
      'Not reading questions thoroughly and missing key words.',
      'Forgetting to go back to questions you skipped.',
      'Rushing through easier questions and making careless errors.',
      'Getting discouraged by hard questions - remember, not everyone gets everything right!',
      'Not using the process of elimination in multiple choice questions.',
      'Leaving blanks - always guess if you\'re running out of time.',
      'Not reviewing your work at the end of each section.'
    ],
    examStrategy: `
**Before Starting:**
- Clear your desk of everything except pencil, eraser, and water
- Go to the toilet so you won\'t need a break
- Set timers for each section (or ask a parent to be your timekeeper)
- Have scrap paper ready for working out
- Take a few deep breaths to calm any nerves

**During the Exam:**

**Time Management:**
- Section 1 (VR): 25 minutes for 20 questions = ~1 minute per question
- Section 2 (NVR): 25 minutes for 20 questions = ~1 minute per question
- Section 3 (English): 40 minutes (15 for reading, 25 for writing)
- Section 4 (Maths): 30 minutes for 25 questions = ~1 minute per question
- Keep a clock visible and check it regularly

**Question Strategy:**
1. **First Pass:** Answer all questions you find easy/quick
2. **Second Pass:** Return to harder questions
3. **Final Minutes:** Guess any remaining answers (never leave blanks!)

**For Each Section:**
- Read instructions carefully (don\'t assume you know them)
- Mark questions you\'re unsure about with a small dot
- Use margin space for quick working
- Transfer answers carefully if using a separate answer sheet

**Staying Focused:**
- If you feel panicked, pause and take 3 deep breaths
- Don\'t worry if others finish before you - work at your own pace
- If a question seems impossible, skip it and come back
- Remember: most students find about 20-30% of questions challenging

**After Each Section:**
- Use any spare time to review your answers
- Check for silly mistakes (especially in maths calculations)
- Ensure you\'ve answered every question
- Don\'t dwell on mistakes - focus on the next section

**Post-Exam:**
- Note which questions you found hardest (for revision focus)
- Don\'t immediately look up answers - give yourself a break!
- Review your answers with explanations later the same day
- Create a study plan based on your weak areas
- Celebrate completing your first full mock exam!

**Scoring Interpretation:**
- 80%+ = Excellent, on track for grammar school offer
- 70-79% = Good, continue practicing to reach target
- 60-69% = Fair, focus on weak areas with targeted revision
- Below 60% = Need significant improvement, but plenty of time to get there

Remember: This is your FIRST attempt. Most students score 50-60% on their baseline and improve to 80%+ with practice!
    `
  },

  // ==================== MODULE 2: VERBAL REASONING MOCK 1 ====================
  {
    moduleNumber: 2,
    title: 'Verbal Reasoning Mock 1',
    duration: '50 minutes',
    introduction: `This full-length Verbal Reasoning mock exam focuses exclusively on VR question types. You'll face 50 questions across all major categories: synonyms, antonyms, analogies, sequences, codes, and logic problems.

**Exam Format:** 50 questions in 50 minutes (1 minute per question)
**Question Types:** Mixed VR question types as found in GL Assessment and CEM exams
**Difficulty:** Graduated from easy to hard
**Scoring:** Each correct answer = 1 mark (Total: 50 marks)`,
    keyPoints: [
      'This mock contains ONLY Verbal Reasoning questions.',
      'Strict 50-minute time limit - use a timer.',
      'Questions increase in difficulty as you progress.',
      'All major VR question types are included.',
      'Aim for 40+ marks (80%) for grammar school standard.',
      'Detailed explanations provided for every question.'
    ],
    explanation: `
**About Verbal Reasoning Mocks**

Verbal Reasoning tests your ability to think with words. It assesses vocabulary, word relationships, logic, and language patterns. This mock exam replicates the style and difficulty of real 11+ VR papers.

**What's Tested:**
- **Vocabulary:** Understanding word meanings (synonyms, antonyms)
- **Word Relationships:** Analogies and connections between words
- **Patterns:** Letter sequences, number patterns, word codes
- **Logic:** Solving problems using verbal reasoning
- **Comprehension:** Understanding and applying written instructions

**Question Type Breakdown:**
1. Synonyms & Antonyms (10 questions)
2. Word Analogies (10 questions)
3. Letter & Number Sequences (8 questions)
4. Word Codes & Ciphers (8 questions)
5. Missing Words & Sentences (8 questions)
6. Logic & Problem Solving (6 questions)

**How to Approach:**
- Read each question carefully - small words like "not" change everything
- For vocabulary questions, eliminate wrong answers first
- For analogies, identify the relationship between the first pair
- For sequences, look for consistent patterns
- For codes, work systematically through each letter
- Never leave a question blank - always guess if needed

**Scoring Guide:**
- **45-50 marks (90-100%):** Outstanding - excellent grammar school level
- **40-44 marks (80-88%):** Very Good - strong grammar school level
- **35-39 marks (70-78%):** Good - work on weaker question types
- **30-34 marks (60-68%):** Satisfactory - needs focused practice
- **Below 30 (under 60%):** Requires significant vocabulary and technique work

**Using Your Results:**
After completing this mock, you'll see:
- Which question types you excel at
- Which areas need more practice
- Your timing and pacing effectiveness
- Comparison with typical grammar school requirements

Focus your revision on question types where you scored lowest. Even a 10% improvement in weak areas can make a huge difference to your overall score!
    `,
    examples: [
      {
        question: 'Find two words, one from each group, that together make a new compound word: (sun, moon, star) (light, bright, shine)',
        workingOut: `Step 1: Try combining words from each group.
Step 2: sun + light = sunlight ✓ (a real compound word meaning the light from the sun)
Step 3: Check other combinations: moonlight ✓ also works, but sunlight is more common.`,
        answer: 'sunlight',
        explanation: 'Sunlight is a compound word formed by combining "sun" and "light". This is a common VR question type testing your knowledge of compound words.'
      }
    ],
    practiceQuestions: [
      {
        question: 'VR1: Which word is closest in meaning to BRAVE?',
        options: ['Scared', 'Courageous', 'Weak', 'Timid'],
        answer: 'Courageous',
        explanation: 'Brave means showing courage in the face of danger. Courageous is a direct synonym.',
        difficulty: 'easy'
      },
      {
        question: 'VR2: Which word is most opposite to EXPAND?',
        options: ['Grow', 'Contract', 'Enlarge', 'Spread'],
        answer: 'Contract',
        explanation: 'Expand means to increase in size. Contract means to decrease or shrink, making it the antonym.',
        difficulty: 'medium'
      },
      {
        question: 'VR3: TREE is to FOREST as BOOK is to ___?',
        options: ['Library', 'Page', 'Read', 'Paper'],
        answer: 'Library',
        explanation: 'Many trees together make a forest; many books together are found in a library. This tests part-to-whole relationships.',
        difficulty: 'medium'
      },
      {
        question: 'VR4: Complete the sequence: B, D, F, H, ___',
        options: ['I', 'J', 'K', 'L'],
        answer: 'J',
        explanation: 'Each letter skips one in the alphabet: B (+2) D (+2) F (+2) H (+2) J.',
        difficulty: 'easy'
      },
      {
        question: 'VR5: If DOG = EPH, what does CAT equal?',
        options: ['DBU', 'BZS', 'CPU', 'DZT'],
        answer: 'DBU',
        explanation: 'Each letter moves forward by 1: D→E, O→P, G→H. So C→D, A→B, T→U = DBU.',
        difficulty: 'hard'
      },
      {
        question: 'VR6: Find the word that completes both sentences: "The ___ was too heavy" and "I need to ___ my watch"',
        options: ['weight', 'wind', 'time', 'heavy'],
        answer: 'wind',
        explanation: 'Wind (noun) = breeze was too heavy doesn\'t work, but "wind" (verb) = "wind my watch" works! This tests homophones and context.',
        difficulty: 'hard'
      }
    ],
    tips: [
      'Build vocabulary daily - read challenging books and note unfamiliar words.',
      'Practice identifying word relationships (synonyms, antonyms, part-whole, cause-effect).',
      'For sequences, look for consistent patterns (skip letters, add numbers, etc.).',
      'In code questions, work through each letter methodically.',
      'Compound word questions often use common, everyday words.',
      'If stuck on analogies, make a sentence: "Bird is to sky" = "Bird lives in sky".',
      'Context is king - read the whole question, not just keywords.',
      'Process of elimination works well for multiple choice VR questions.'
    ],
    commonMistakes: [
      'Confusing synonyms with antonyms (read "most similar" vs "most opposite" carefully).',
      'Choosing a related word instead of the closest synonym (e.g., "book" for library instead of "read").',
      'Missing patterns in sequences by not checking consistently.',
      'Making errors in letter code questions by miscounting positions.',
      'Overthinking simple compound words.',
      'Not considering all meanings of a word (homophones, multiple definitions).',
      'Rushing and not reading all four options before choosing.'
    ],
    examStrategy: `
**Verbal Reasoning Mock Strategy:**

**Time Management:**
- 50 questions in 50 minutes = 1 minute per question
- Don't exceed 90 seconds on any question
- Aim to complete first pass in 40 minutes, leaving 10 for review

**Question Approach by Type:**

**Synonyms/Antonyms (30 seconds each):**
- Read the target word carefully
- Think of your own synonym/antonym first
- Eliminate obviously wrong options
- Choose the closest match

**Analogies (60 seconds each):**
- Identify the relationship in the first pair
- Apply the same relationship to find the answer
- Make it into a sentence if needed

**Sequences (60 seconds each):**
- Look for the pattern between first 2-3 items
- Test if pattern continues consistently
- Apply pattern to find next item

**Codes (90 seconds each):**
- Work through each letter position systematically
- Look for forward/backward shifts
- Write working if needed

**Missing Words (45 seconds each):**
- Read both sentences
- Find a word that makes sense in both contexts
- Check your answer in both sentences

**Logic Problems (90 seconds each):**
- Read carefully and note key information
- Work through systematically
- Eliminate wrong options

**Review Phase (Last 10 minutes):**
- Check any questions you marked as uncertain
- Verify you've answered ALL questions
- Double-check any mathematical codes/sequences
- Trust your first instinct unless you spot a clear error

**Target Scores by School Type:**
- Super-selective grammars: 45+ (90%)
- Competitive grammars: 40-44 (80-88%)
- Less competitive grammars: 35-39 (70-78%)

**After the Mock:**
- Identify your weakest question types
- Practice those specifically
- Build vocabulary using the words you didn't know
- Take another VR mock in 2-3 weeks to measure improvement
    `
  },

  // ==================== MODULE 3: NON-VERBAL REASONING MOCK 1 ====================
  {
    moduleNumber: 3,
    title: 'Non-Verbal Reasoning Mock 1',
    duration: '50 minutes',
    introduction: `This comprehensive Non-Verbal Reasoning mock exam tests your visual and spatial reasoning abilities. You'll work with shapes, patterns, rotations, reflections, and 3D visualization across 50 questions.

**Exam Format:** 50 questions in 50 minutes (1 minute per question)
**Question Types:** All major NVR types (shape patterns, odd one out, matrices, analogies, rotations)
**Difficulty:** Progressive from straightforward to challenging
**Scoring:** 1 mark per question (Total: 50 marks)`,
    keyPoints: [
      'Focus on visual patterns and shape transformations.',
      'Look for consistent rules in each question.',
      'Use process of elimination effectively.',
      'Don\'t overthink - often the simplest pattern is correct.',
      'Practice visualizing rotations and reflections mentally.',
      'Time yourself strictly - these questions can be time-consuming.'
    ],
    explanation: `
**About Non-Verbal Reasoning**

NVR tests your ability to think logically using visual information. Unlike Verbal Reasoning, no words are needed - you work purely with shapes, patterns, and spatial relationships.

**Skills Tested:**
- Pattern recognition and continuation
- Spatial awareness and visualization
- Logical deduction with shapes
- Rotation and reflection understanding
- 2D and 3D shape relationships
- Attention to visual detail

**Question Types in This Mock:**
1. **Shape Patterns** (10 questions) - Complete sequences
2. **Odd One Out** (8 questions) - Find the different shape
3. **Analogies** (10 questions) - Shape is to shape as...
4. **Matrices** (8 questions) - Complete 3×3 grids
5. **Rotations & Reflections** (8 questions) - Transform shapes
6. **3D Visualization** (6 questions) - Nets, cubes, and solids

**Strategy for Success:**
- **Systematic Approach:** Check each element (size, shading, rotation, position)
- **Elimination:** Rule out options that break the pattern
- **Mental Visualization:** Practice "seeing" shapes rotate in your mind
- **Pattern Testing:** Verify your pattern works for ALL examples
- **Speed Building:** Regular practice increases recognition speed

**Common Patterns to Know:**
- Rotation (45°, 90°, 180°, 270°)
- Reflection (horizontal, vertical, diagonal)
- Shading changes (white → gray → black)
- Size progression (small → medium → large)
- Position movement (clockwise, anti-clockwise)
- Number changes (adding/removing elements)

**Scoring Expectations:**
- **45-50 (90-100%):** Exceptional - excellent spatial reasoning
- **40-44 (80-88%):** Strong - grammar school competitive
- **35-39 (70-78%):** Good - some areas need practice
- **30-34 (60-68%):** Fair - focus on pattern recognition
- **Below 30 (<60%):** Needs significant NVR practice

NVR is often the area where students improve most with practice, as the patterns become familiar!
    `,
    examples: [
      {
        question: 'Pattern: Shape rotates 90° clockwise each step. Current shape points UP. Next shape?',
        workingOut: `Step 1: Understand the pattern - 90° clockwise rotation.
Step 2: Current position = pointing UP
Step 3: 90° clockwise from UP = pointing RIGHT`,
        answer: 'Shape pointing RIGHT',
        explanation: 'Each 90° clockwise rotation turns the shape a quarter turn to the right.'
      }
    ],
    practiceQuestions: [
      {
        question: 'NVR1: Which shape comes next? Circle, Square, Triangle, Circle, Square, ___',
        options: ['Circle', 'Square', 'Triangle', 'Pentagon'],
        answer: 'Triangle',
        explanation: 'The pattern repeats every 3 shapes: Circle, Square, Triangle. After Square comes Triangle.',
        difficulty: 'easy'
      },
      {
        question: 'NVR2: Which is the odd one out? (All squares except one is a circle)',
        options: ['Square 1', 'Square 2', 'Circle', 'Square 3'],
        answer: 'Circle',
        explanation: 'All shapes are squares except the circle, making it different.',
        difficulty: 'easy'
      },
      {
        question: 'NVR3: Triangle is to 3 sides as Square is to ___ sides',
        options: ['2', '3', '4', '5'],
        answer: '4',
        explanation: 'Triangle has 3 sides; Square has 4 sides. This tests knowledge of shape properties.',
        difficulty: 'easy'
      },
      {
        question: 'NVR4: A shape is reflected horizontally. What happens?',
        options: ['Flips left to right', 'Flips top to bottom', 'Rotates 180°', 'Stays same'],
        answer: 'Flips left to right',
        explanation: 'Horizontal reflection creates a mirror image flipping left and right sides.',
        difficulty: 'medium'
      },
      {
        question: 'NVR5: Pattern shows shading: White, Gray, Black, White, Gray, ___',
        options: ['White', 'Gray', 'Black', 'Striped'],
        answer: 'Black',
        explanation: 'Shading cycles through White → Gray → Black repeatedly.',
        difficulty: 'medium'
      },
      {
        question: 'NVR6: Which net folds into a cube?',
        options: ['Cross shape with 6 squares', 'Line of 6 squares', 'T shape', 'L shape'],
        answer: 'Cross shape with 6 squares',
        explanation: 'A cross-shaped net with 6 connected squares folds into a cube.',
        difficulty: 'hard'
      }
    ],
    tips: [
      'Break down complex patterns into individual changes (rotation, shading, position).',
      'For "odd one out", look for differences in size, shading, rotation, or shape type.',
      'Practice mental rotation - imagine the shape turning in your mind.',
      'Check if patterns repeat in cycles (every 2, 3, or 4 shapes).',
      'In matrices, check rows AND columns for patterns.',
      'For 3D questions, try drawing or visualizing the net folding.',
      'Eliminate options that clearly don\'t fit the pattern.',
      'Trust your visual instinct - patterns often "feel" right when correct.'
    ],
    commonMistakes: [
      'Confusing clockwise with anti-clockwise rotations.',
      'Missing shading changes when focusing on shape rotation.',
      'Not checking if patterns apply consistently to ALL examples.',
      'Overthinking simple patterns and seeing complexity that isn\'t there.',
      'Forgetting to check both rows and columns in matrix questions.',
      'Mixing up horizontal and vertical reflections.',
      'Spending too long visualizing 3D shapes instead of using elimination.'
    ],
    examStrategy: `
**Non-Verbal Reasoning Strategy:**

**Time Management:**
- 50 questions in 50 minutes = 1 minute per question
- Quick questions (30-45 seconds): Patterns, Odd One Out
- Medium questions (60-90 seconds): Analogies, Matrices
- Longer questions (90-120 seconds): 3D visualization

**Systematic Approach:**
1. **Identify what changes** between shapes
2. **Verify the pattern** continues consistently
3. **Apply the rule** to find the answer
4. **Eliminate wrong options**
5. **Make final choice**

**By Question Type:**

**Shape Patterns:**
- Look at changes from shape 1 → 2, then 2 → 3
- Common changes: rotation, shading, size, position, number of elements
- Apply same rule to find next shape

**Odd One Out:**
- Compare all shapes systematically
- Look for: different shape type, rotation, shading, size, or number of parts
- Three should be similar, one different

**Analogies:**
- Identify relationship in first pair
- Apply same transformation to find answer
- Common relationships: rotation, reflection, shading change

**Matrices (3×3 grids):**
- Check rows for patterns
- Check columns for patterns
- Look for diagonal patterns if rows/columns don't work
- The missing square follows the established rule

**Rotations & Reflections:**
- 90° = quarter turn
- 180° = half turn (upside down)
- 270° = three-quarter turn
- Horizontal reflection = mirror left-right
- Vertical reflection = mirror top-bottom

**3D Visualization:**
- Cubes have 6 faces
- Opposite faces never touch in a net
- Count squares to verify it's a complete net
- Try to fold it mentally or use elimination

**If Stuck:**
- Skip and return later
- Use elimination to narrow options
- Make an educated guess
- Never leave blank

**Target: 40+ marks (80%) for competitive grammar schools**
    `
  },

  // ==================== MODULE 4: ENGLISH MOCK 1 ====================
  {
    moduleNumber: 4,
    title: 'English Mock 1',
    duration: '60 minutes',
    introduction: `This full-length English mock exam tests reading comprehension, grammar, punctuation, spelling, and creative writing. Format matches real 11+ English papers with fiction and non-fiction comprehension plus writing tasks.

**Exam Structure:**
- Part 1: Reading Comprehension (30 minutes, 20 questions)
- Part 2: Grammar & Language (15 minutes, 15 questions)
- Part 3: Creative Writing (15 minutes, 1 extended writing task)`,
    keyPoints: [
      'Read passages carefully - twice if needed.',
      'Answer comprehension questions with evidence from the text.',
      'Check spelling, punctuation, and grammar in writing.',
      'Plan your creative writing before starting.',
      'Use varied vocabulary and sentence structures.',
      'Leave time to proofread your writing.'
    ],
    explanation: `
**English Mock Exam Overview**

This mock replicates the style and rigor of real 11+ English papers. It assesses reading comprehension, language knowledge, and writing ability - all essential for grammar school success.

**What's Assessed:**
- **Reading Skills:** Understanding texts, inference, vocabulary in context
- **Grammar:** Sentence structure, parts of speech, tenses
- **Punctuation & Spelling:** Correct usage and accuracy
- **Writing:** Planning, creativity, descriptive language, paragraph structure

**Scoring Guide (60 marks total):**
- Reading: 20 marks
- Grammar: 15 marks
- Writing: 25 marks

**Target Scores:**
- **54-60 (90-100%):** Exceptional English skills
- **48-53 (80-89%):** Strong grammar school level
- **42-47 (70-79%):** Good - work on weaker areas
- **36-41 (60-69%):** Fair - needs focused practice
    `,
    examples: [],
    practiceQuestions: [
      {
        question: 'ENG1: Read the passage and answer: What was the main character feeling?',
        options: ['Happy', 'Anxious', 'Excited', 'Bored'],
        answer: 'Anxious',
        explanation: 'The text mentions "nervous glances" and "worried thoughts", indicating anxiety.',
        difficulty: 'medium'
      },
      {
        question: 'ENG2: Which sentence uses correct punctuation?',
        options: ['its a lovely day', 'Its a lovely day.', 'It\'s a lovely day.', 'Its a lovely day!'],
        answer: 'It\'s a lovely day.',
        explanation: 'It\'s (it is) needs an apostrophe, and sentences end with punctuation.',
        difficulty: 'medium'
      },
      {
        question: 'ENG3: Identify the adjective: "The beautiful flower bloomed quickly."',
        options: ['beautiful', 'flower', 'bloomed', 'quickly'],
        answer: 'beautiful',
        explanation: 'Adjectives describe nouns. "Beautiful" describes the flower.',
        difficulty: 'easy'
      },
      {
        question: 'ENG4: Which word is spelled correctly?',
        options: ['definately', 'defin itely', 'definitely', 'definatly'],
        answer: 'definitely',
        explanation: 'The correct spelling is "definitely" with "-ite-" in the middle.',
        difficulty: 'medium'
      },
      {
        question: 'ENG5: What is the past tense of "run"?',
        options: ['runned', 'ran', 'run', 'running'],
        answer: 'ran',
        explanation: 'Run is an irregular verb. Its past tense is "ran", not "runned".',
        difficulty: 'easy'
      },
      {
        question: 'ENG6: Identify the simile in: "Her smile was like sunshine on a cloudy day."',
        options: ['Her smile', 'was like', 'like sunshine', 'Her smile was like sunshine'],
        answer: 'Her smile was like sunshine',
        explanation: 'The full simile compares her smile to sunshine using "like".',
        difficulty: 'medium'
      }
    ],
    tips: [
      'Read comprehension passages twice: once for understanding, once for details.',
      'Underline key words in questions.',
      'Use evidence from the text to support your answers.',
      'For grammar, read sentences aloud mentally to check if they sound right.',
      'Plan writing with a quick 3-point plan before starting.',
      'Use paragraphs to organize your writing.',
      'Check spelling of common tricky words (definitely, separate, necessary).',
      'Vary sentence length and structure to make writing interesting.'
    ],
    commonMistakes: [
      'Not reading the full passage before answering questions.',
      'Giving opinions instead of text-based answers for comprehension.',
      'Mixing up homophones (there/their/they\'re, your/you\'re).',
      'Forgetting capital letters for proper nouns and sentence starts.',
      'Writing without planning, leading to disorganized stories.',
      'Not leaving time to proofread written work.',
      'Using repetitive vocabulary and sentence structures.'
    ],
    examStrategy: `
**English Mock Strategy:**

**Time Allocation:**
- Reading Comprehension: 30 minutes (5 min reading, 25 min questions)
- Grammar: 15 minutes
- Creative Writing: 15 minutes (3 min planning, 10 min writing, 2 min checking)

**Reading Comprehension Approach:**
1. Read title and skim passage (1 min)
2. Read passage carefully (4 min)
3. Read all questions (2 min)
4. Answer questions with text evidence (23 min)

**Grammar & Language:**
- Read each question carefully
- Eliminate obviously wrong options
- Check your answer makes grammatical sense
- Trust your "ear" for correct English

**Creative Writing:**
- Plan: Beginning, Middle, End (3 minutes)
- Write: Follow your plan, use paragraphs (10 minutes)
- Check: Spelling, punctuation, sense (2 minutes)
- Include: descriptive language, varied sentences, interesting vocabulary

**Scoring Well:**
- Always answer with text evidence
- Check spelling and punctuation
- Write neatly and legibly
- Use full sentences in answers
- Show off vocabulary knowledge appropriately
    `
  },

  // ==================== MODULE 5: MATHS MOCK 1 ====================
  {
    moduleNumber: 5,
    title: 'Maths Mock 1',
    duration: '50 minutes',
    introduction: `Comprehensive Mathematics mock covering all 11+ topics: arithmetic, fractions, decimals, percentages, algebra, geometry, problem-solving, and data handling.

**Format:** 50 questions in 50 minutes
**Calculator:** NOT allowed
**Working:** Show your working to gain method marks
**Scoring:** 50 marks total (1 per question, some multi-part)`,
    keyPoints: [
      'Read questions carefully - check what\'s being asked.',
      'Show all working - you may get marks even if final answer is wrong.',
      'Check units in your answers (cm, kg, £, etc.).',
      'Use mental maths shortcuts where possible.',
      'Estimate answers to check if they\'re reasonable.',
      'Leave difficult questions and return later.'
    ],
    explanation: `
**Maths Mock Overview**

This mock exam covers the complete 11+ Mathematics syllabus, testing calculation skills, mathematical reasoning, and problem-solving ability.

**Topics Covered:**
1. **Number:** Place value, four operations, BODMAS
2. **Fractions, Decimals, Percentages:** Conversions and calculations
3. **Algebra:** Simple equations and sequences
4. **Geometry:** 2D/3D shapes, angles, perimeter, area
5. **Measures:** Time, money, length, weight, capacity
6. **Data:** Charts, graphs, averages, probability
7. **Problem Solving:** Word problems and reasoning

**Question Types:**
- Calculation questions (25)
- Problem-solving (15)
- Reasoning (10)

**Target Scores:**
- **45-50 (90-100%):** Outstanding mathematical ability
- **40-44 (80-88%):** Strong grammar school level
- **35-39 (70-78%):** Good - focus on weak topics
- **30-34 (60-68%):** Fair - needs practice
    `,
    examples: [],
    practiceQuestions: [
      {
        question: 'MATHS1: Calculate 27 + 38',
        options: ['55', '65', '75', '85'],
        answer: '65',
        explanation: '27 + 38 = 20 + 30 + 7 + 8 = 50 + 15 = 65',
        difficulty: 'easy'
      },
      {
        question: 'MATHS2: What is 1/2 of 80?',
        options: ['20', '30', '40', '50'],
        answer: '40',
        explanation: '1/2 of 80 = 80 ÷ 2 = 40',
        difficulty: 'easy'
      },
      {
        question: 'MATHS3: 7 × 8 = ?',
        options: ['54', '56', '58', '64'],
        answer: '56',
        explanation: '7 × 8 = 56 (times table fact)',
        difficulty: 'easy'
      },
      {
        question: 'MATHS4: A rectangle has length 10cm and width 6cm. What is its area?',
        options: ['16cm', '32cm', '60cm²', '16cm²'],
        answer: '60cm²',
        explanation: 'Area = length × width = 10 × 6 = 60cm²',
        difficulty: 'medium'
      },
      {
        question: 'MATHS5: What is 0.75 as a fraction in simplest form?',
        options: ['75/100', '3/4', '7/10', '15/20'],
        answer: '3/4',
        explanation: '0.75 = 75/100 = 3/4 (dividing top and bottom by 25)',
        difficulty: 'medium'
      },
      {
        question: 'MATHS6: If 2x + 3 = 11, what is x?',
        options: ['2', '3', '4', '5'],
        answer: '4',
        explanation: '2x = 11 - 3 = 8, so x = 8 ÷ 2 = 4',
        difficulty: 'hard'
      }
    ],
    tips: [
      'Learn times tables up to 12×12 fluently - essential for speed.',
      'Practice mental calculation strategies (partitioning, rounding).',
      'Draw diagrams for geometry and word problems.',
      'Check your answer makes sense in context.',
      'Remember formulas: Area of rectangle = l×w, Perimeter = 2(l+w).',
      'For fractions, find common denominators before adding/subtracting.',
      'With percentages, remember 10% is easy to find (divide by 10).',
      'In algebra, always check your answer by substituting back.'
    ],
    commonMistakes: [
      'Calculation errors from rushing - check working carefully.',
      'Forgetting units in answers (cm, not just numbers).',
      'Mixing up area (cm²) and perimeter (cm) questions.',
      'Not simplifying fractions to their simplest form.',
      'Making errors in BODMAS order (brackets first!).',
      'Misreading questions (e.g., finding perimeter when area is asked).',
      'Guessing instead of using systematic methods.',
      'Not showing working, losing method marks.'
    ],
    examStrategy: `
**Maths Mock Strategy:**

**Time Management:**
- 50 questions in 50 minutes = 1 minute per question
- Quick questions (30 seconds): Mental maths, times tables
- Standard questions (60 seconds): One-step problems
- Complex questions (90-120 seconds): Multi-step, reasoning

**Method:**
1. **Read carefully** - highlight key numbers and words
2. **Show working** - even rough working gets marks
3. **Check answer** - does it make sense?
4. **Include units** - cm, £, kg etc.

**Question Approach:**
- **Mental Maths:** Answer quickly, move on
- **Word Problems:** Underline key info, identify operation needed
- **Multi-step:** Break into smaller parts
- **Geometry:** Draw it if not provided
- **Algebra:** Show each step clearly

**Checking:**
- Estimate first (e.g., 49 × 21 ≈ 50 × 20 = 1000)
- Work backwards to verify
- Check units included

**Target: 40+ marks for grammar school level**
    `
  },

  // ==================== MODULES 6-12: COMBINED & PROGRESS TRACKING ====================
  {
    moduleNumber: 6,
    title: 'Combined Paper Mock 1',
    duration: '120 minutes',
    introduction: `First full combined mock exam testing all four subjects in one sitting. This replicates the actual 11+ exam day experience with VR, NVR, English, and Maths in sequence.

**Purpose:** Build exam stamina and practice managing time across multiple subjects.
**Format:** 4 sections, timed separately, completed in one session.
**Scoring:** Composite score across all subjects (200 marks total).`,
    keyPoints: [
      'Complete all four sections without long breaks.',
      'Maintain focus throughout the full 2-hour exam.',
      'Practice transitioning between subjects mentally.',
      'Monitor energy levels - have water available.',
      'This tests stamina as much as knowledge.',
      'Review performance across all subjects afterward.'
    ],
    explanation: `This combined mock prepares you for the full 11+ exam experience, testing your ability to perform across all subjects consecutively.`,
    examples: [],
    practiceQuestions: [
      {
        question: 'COMBINED1: This mock includes questions from all previous mocks.',
        options: ['Verbal Reasoning', 'Non-Verbal Reasoning', 'English', 'All subjects'],
        answer: 'All subjects',
        explanation: 'Combined papers test VR, NVR, English, and Maths together.',
        difficulty: 'easy'
      }
    ],
    tips: [
      'Take a 2-minute stretch break between sections.',
      'Keep water nearby and stay hydrated.',
      'Don\'t let a tough section affect the next one - reset mentally.',
      'Pace yourself - save energy for all four parts.',
      'Practice this format regularly to build exam stamina.'
    ],
    commonMistakes: [
      'Losing focus in later sections due to fatigue.',
      'Spending too long on early sections, rushing later ones.',
      'Dwelling on mistakes from previous sections.',
      'Not taking short breaks between sections.'
    ],
    examStrategy: `
**Combined Mock Strategy:**
- Complete each section as if it's a standalone exam
- Brief 1-2 minute breaks between sections
- Stay focused throughout the full 120 minutes
- Review all sections together to identify patterns
- Track your performance across subjects to guide revision
    `
  },

  {
    moduleNumber: 7,
    title: 'Progress Review Session',
    duration: '45 minutes',
    introduction: `Midpoint review analyzing your performance across all mocks completed so far. This session helps identify trends, celebrate improvements, and refine your study strategy for remaining mocks.

**Purpose:** Analyze progress, identify patterns, adjust study plan.
**Format:** Review previous mock results, compare scores, identify trends.
**Outcome:** Personalized action plan for next phase of preparation.`,
    keyPoints: [
      'Review scores from all previous mocks.',
      'Identify your strongest and weakest subjects.',
      'Note question types that frequently challenge you.',
      'Celebrate improvements since baseline assessment.',
      'Create targeted revision plan for weak areas.',
      'Set specific goals for remaining mocks.'
    ],
    explanation: `This progress review is crucial for maximizing improvement in the second half of your mock exam series. By analyzing patterns in your performance, you can focus your revision effectively.`,
    examples: [],
    practiceQuestions: [
      {
        question: 'REVIEW1: What should you focus on after this review?',
        options: ['Everything equally', 'Your strongest areas', 'Your weakest areas', 'Only past papers'],
        answer: 'Your weakest areas',
        explanation: 'Targeted practice on weak areas yields the most improvement.',
        difficulty: 'easy'
      }
    ],
    tips: [
      'Look for patterns in errors (e.g., always struggling with fractions).',
      'Compare mock 1 vs. mock 2+ to see improvement.',
      'Don\'t just focus on overall score - analyze by question type.',
      'Celebrate progress - improvement is success!',
      'Be honest about time management issues.',
      'Use this to create a specific, targeted revision schedule.'
    ],
    commonMistakes: [
      'Focusing only on weak subjects, neglecting to maintain strong ones.',
      'Not reviewing which specific question types need work.',
      'Becoming discouraged by low scores instead of seeing them as learning opportunities.',
      'Not creating an action plan based on review findings.'
    ],
    examStrategy: `
**Using This Review:**
1. Chart your scores for each subject across mocks
2. Identify patterns in errors
3. Prioritize 2-3 specific areas for focused practice
4. Set measurable goals for next set of mocks
5. Adjust study schedule based on findings
6. Book in targeted practice for weak question types
    `
  },

  {
    moduleNumber: 8,
    title: 'Combined Paper Mock 2',
    duration: '120 minutes',
    introduction: `Second full combined mock exam. Use insights from your progress review to demonstrate improvement across all subjects.

**Purpose:** Measure improvement since Mock 1 and Progress Review.
**Format:** Complete 11+ simulation with all four subjects.
**Goal:** Show measurable progress in identified weak areas.`,
    keyPoints: [
      'Apply strategies learned from Progress Review.',
      'Focus on pacing improvements.',
      'Demonstrate progress in previously weak areas.',
      'Maintain performance in strong subjects.',
      'Build confidence for school-specific mocks ahead.',
      'Note any new patterns or challenges.'
    ],
    explanation: `This second combined mock should show clear improvement from Mock 1, particularly in areas identified during your Progress Review. It's a checkpoint in your preparation journey.`,
    examples: [],
    practiceQuestions: [
      {
        question: 'COMBINED2: Similar to Mock 1 but with fresh questions testing same skills.',
        options: ['Easier than Mock 1', 'Same difficulty as Mock 1', 'Harder than Mock 1', 'Unrelated to Mock 1'],
        answer: 'Same difficulty as Mock 1',
        explanation: 'Mocks maintain consistent difficulty to measure true progress.',
        difficulty: 'medium'
      }
    ],
    tips: [
      'Use improved strategies from Progress Review.',
      'Track improvements - even 5% is significant progress.',
      'Don\'t panic if some sections feel harder - focus on doing your best.',
      'Remember time management lessons from Mock 1.',
      'Stay positive throughout all four sections.'
    ],
    commonMistakes: [
      'Expecting perfection instead of progress.',
      'Forgetting lessons learned from previous mocks.',
      'Becoming complacent in strong areas.',
      'Not pacing yourself across all sections.'
    ],
    examStrategy: `
**Demonstrating Improvement:**
- Apply specific techniques practiced since Progress Review
- Maintain calm and focus throughout
- Compare results directly with Mock 1
- Identify remaining areas for final push
- Use this as confidence builder for school-specific mocks
    `
  },

  {
    moduleNumber: 9,
    title: 'School-Specific Mocks',
    duration: '120 minutes',
    introduction: `Tailored mock exams replicating the specific format and style of your target grammar schools. Different schools use different exam providers (GL Assessment, CEM, ISEB), each with unique formats.

**Purpose:** Practice your specific target school's exam format.
**Format:** Varies by school/exam board (GL, CEM, or ISEB style).
**Customization:** Focuses on question types and timing used by your target schools.`,
    keyPoints: [
      'Research your target school\'s exam provider (GL/CEM/ISEB).',
      'Each provider has distinct question styles and formats.',
      'Timing and structure vary between providers.',
      'Practice the exact format you\'ll face on exam day.',
      'Some schools use school-specific papers.',
      'This is your dress rehearsal for the real thing.'
    ],
    explanation: `
**Exam Provider Differences:**

**GL Assessment:**
- Separate papers for each subject
- Standard multiple-choice format
- Well-defined question types
- Predictable structure

**CEM (Durham University):**
- Combined papers (e.g., VR + English together)
- Shuffled question types
- Emphasis on speed and reasoning
- Less predictable structure

**ISEB:**
- More traditional format
- Includes extended writing
- Standard comprehension passages
- Often used by independent schools

This mock is customized to match YOUR target school's specific format.
    `,
    examples: [],
    practiceQuestions: [
      {
        question: 'SCHOOL1: Which exam board does your target school use?',
        options: ['GL Assessment', 'CEM', 'ISEB', 'School-specific'],
        answer: 'Check your target school',
        explanation: 'Different schools use different exam providers - always check which yours uses!',
        difficulty: 'easy'
      }
    ],
    tips: [
      'Research your specific school\'s exam format thoroughly.',
      'Practice past papers from your school\'s exam provider.',
      'Note timing differences between providers.',
      'Understand the specific question styles your school uses.',
      'Some schools publish sample papers - use these!',
      'Simulate exact exam conditions (timing, breaks, materials).'
    ],
    commonMistakes: [
      'Assuming all 11+ exams are the same - they\'re not!',
      'Not researching target school\'s specific format.',
      'Practicing wrong exam board\'s question styles.',
      'Not accounting for timing differences between providers.'
    ],
    examStrategy: `
**School-Specific Preparation:**
1. Identify your target school's exam provider
2. Obtain specimen/past papers from that provider
3. Practice that specific format repeatedly
4. Note unique features of that exam style
5. Time yourself according to that school's schedule
6. Familiarize yourself with answer sheet format if applicable

**On Exam Day:**
- You'll feel confident because you've practiced THIS exact format
- No surprises - you know exactly what to expect
- Timing will feel natural from repeated practice
    `
  },

  {
    moduleNumber: 10,
    title: 'Final Practice Exam',
    duration: '120 minutes',
    introduction: `Your final comprehensive mock before the real 11+ exams. This is a full dress rehearsal under exact exam conditions, incorporating everything you've learned throughout your preparation.

**Purpose:** Final preparation and confidence building.
**Format:** Complete 11+ exam in realistic conditions.
**Goal:** Demonstrate readiness for the real exam.`,
    keyPoints: [
      'Treat this exactly like the real exam.',
      'Complete in full exam conditions (no interruptions).',
      'Use official timing for each section.',
      'Wear similar clothes to what you\'ll wear on exam day.',
      'Bring only permitted materials.',
      'This builds confidence and reduces exam day anxiety.'
    ],
    explanation: `This final mock is your last practice before the real 11+ exams. It should feel like a comfortable, familiar routine because you've done it many times before. The goal is to enter your real exam with confidence, knowing exactly what to expect.`,
    examples: [],
    practiceQuestions: [
      {
        question: 'FINAL1: This is your last practice before the real exam.',
        options: ['True', 'False'],
        answer: 'True',
        explanation: 'The Final Practice Exam is your last full mock before exam day.',
        difficulty: 'easy'
      }
    ],
    tips: [
      'Complete in the same location and time of day as your real exam if possible.',
      'Have someone act as exam invigilator to add realism.',
      'Use the same pencils, erasers, equipment you\'ll use on the day.',
      'Take this seriously - it\'s your final dress rehearsal.',
      'Notice what feels comfortable and what needs attention.',
      'Review afterward but don\'t over-worry - you\'re ready!'
    ],
    commonMistakes: [
      'Not taking the final mock seriously.',
      'Cramming new material instead of consolidating.',
      'Over-analyzing every mistake and losing confidence.',
      'Not simulating real exam conditions properly.'
    ],
    examStrategy: `
**Final Mock Approach:**
- This is a confidence builder - you've got this!
- Focus on executing what you've practiced
- Trust your preparation and knowledge
- Stay calm and focused throughout
- Review performance calmly afterward
- Note what went well to repeat on exam day
- Make minor adjustments only - no major strategy changes now
- Get a good night's sleep after completing this mock
- You're ready for the real thing!
    `
  },

  {
    moduleNumber: 11,
    title: 'Performance Analysis',
    duration: '30 minutes',
    introduction: `Comprehensive analysis of your complete mock exam journey from baseline to final practice. This session reviews your progress, celebrates achievements, and provides final tips for exam day success.

**Purpose:** Understand your progress, build confidence, finalize preparation.
**Format:** Data-driven review of all mock results with personalized insights.
**Outcome:** Clear understanding of readiness and final exam-day strategies.`,
    keyPoints: [
      'Review complete journey from baseline to final mock.',
      'Celebrate improvements - recognize your hard work!',
      'Understand your current readiness level.',
      'Identify last-minute focus areas if needed.',
      'Build confidence for exam day.',
      'Receive final exam-day tips and strategies.'
    ],
    explanation: `
**What This Analysis Shows:**

**Progress Tracking:**
- Baseline scores vs. current scores
- Improvement percentages by subject
- Question type mastery levels
- Time management improvements
- Confidence and stamina development

**Readiness Indicators:**
- Consistent performance across mocks
- Target score achievement
- Time management effectiveness
- Ability to handle combined papers
- Confidence and exam technique

**Final Recommendations:**
- Last-week revision priorities
- Exam day strategies
- Stress management techniques
- What to review vs. what to rest
- Confidence-building activities

You've completed a rigorous preparation program. This analysis shows how far you've come and confirms you're ready for success!
    `,
    examples: [],
    practiceQuestions: [
      {
        question: 'ANALYSIS1: What does consistent improvement across mocks indicate?',
        options: ['Lucky guessing', 'Effective preparation', 'Easy questions', 'Nothing significant'],
        answer: 'Effective preparation',
        explanation: 'Steady improvement shows your preparation is working and knowledge is building.',
        difficulty: 'easy'
      }
    ],
    tips: [
      'Focus on progress made, not absolute scores.',
      'Small improvements across all areas add up significantly.',
      'Consistent performance matters more than occasional high scores.',
      'Use this analysis to boost confidence, not create anxiety.',
      'Remember: you know more now than when you started.',
      'Trust your preparation - you\'ve done the work!'
    ],
    commonMistakes: [
      'Comparing yourself to others instead of your own baseline.',
      'Focusing on remaining weaknesses instead of improvements made.',
      'Panicking about areas that aren\'t perfect.',
      'Forgetting how much progress has been made.'
    ],
    examStrategy: `
**Using This Analysis:**
1. Recognize your improvement journey
2. Celebrate specific achievements
3. Note your strongest areas (confidence boosters)
4. Accept that some imperfection is normal
5. Trust that you're prepared
6. Use insights for last-minute fine-tuning only
7. Focus on maintaining confidence and health
8. Remember: grammar schools don't expect 100%!

**You're Ready:**
- You've completed extensive practice
- You've learned from mistakes
- You've improved significantly
- You know what to expect
- You have strategies for every question type
- You've built exam stamina
- You're confident and prepared
- Now it's time to succeed!
    `
  },

  {
    moduleNumber: 12,
    title: 'Results Discussion and Action Plan',
    duration: '30 minutes',
    introduction: `Final session reviewing your complete mock exam results and creating a personalized action plan for the last phase of preparation before your real 11+ exams.

**Purpose:** Finalize preparation with clear, achievable goals.
**Format:** Detailed discussion of results with specific action steps.
**Outcome:** Confidence, clarity, and a solid plan for exam day success.`,
    keyPoints: [
      'Review all mock exam results comprehensively.',
      'Identify final areas for light revision.',
      'Create exam-week schedule.',
      'Discuss exam day logistics and strategy.',
      'Address any remaining concerns or anxiety.',
      'Build ultimate confidence for exam day.'
    ],
    explanation: `
**What This Session Covers:**

**Results Summary:**
- Overall progress from start to finish
- Subject-by-subject performance
- Question type mastery
- Time management effectiveness
- Readiness assessment

**Action Plan Components:**

**Week Before Exam:**
- Light revision schedule
- Rest and recovery plan
- Materials to review vs. avoid
- Stress management activities
- Sleep and nutrition optimization

**Day Before Exam:**
- Final checklist
- Relaxation activities
- Early bedtime routine
- Equipment preparation
- Mental preparation

**Exam Day Plan:**
- Morning routine
- What to bring
- Arrival time and location
- Between-paper strategies
- Post-exam plan

**Post-Exam:**
- How to handle the waiting period
- Celebrating your effort
- Next steps regardless of outcome
- Backup plans if needed

You've worked incredibly hard and completed thorough preparation. This final session ensures you're completely ready for exam day success!
    `,
    examples: [],
    practiceQuestions: [
      {
        question: 'PLAN1: The night before the exam, should you cram or rest?',
        options: ['Cram all night', 'Study until midnight', 'Light review then rest', 'No study at all'],
        answer: 'Light review then rest',
        explanation: 'A rested brain performs better than a tired, crammed one. Light review builds confidence, then prioritize sleep.',
        difficulty: 'easy'
      }
    ],
    tips: [
      'The week before: light revision, no new topics.',
      'Prioritize sleep, nutrition, and wellbeing.',
      'Prepare everything the night before the exam.',
      'Do something relaxing and fun the day before.',
      'Trust your preparation - you\'ve done enough!',
      'Visualize success and positive outcomes.',
      'Remember: grammar schools admit students who aren\'t perfect.',
      'Your effort matters more than the outcome.'
    ],
    commonMistakes: [
      'Cramming new material in the final week.',
      'Staying up late studying the night before.',
      'Panicking about mistakes in final mocks.',
      'Comparing yourself to others.',
      'Forgetting to prepare equipment and logistics.',
      'Not planning for post-exam emotional support.'
    ],
    examStrategy: `
**Final Week Strategy:**

**7 Days Before:**
- Light revision of weak areas only
- Review formula sheets, vocabulary
- One final light mock if desired
- Focus on health and rest

**3 Days Before:**
- Very light revision
- Relaxing activities
- Early bedtimes
- Positive visualization

**Day Before:**
- NO studying (maybe light review if it helps you feel calm)
- Prepare all equipment
- Check location and travel time
- Relaxing evening
- Early bedtime

**Exam Day:**
- Good breakfast
- Arrive early (not too early!)
- Stay calm and focused
- Remember all your strategies
- Do your best - that's all anyone can ask

**After Results:**
- Celebrate your effort regardless
- Multiple pathways to success exist
- Your worth isn't defined by one exam
- Learn and grow from the experience

**YOU'VE GOT THIS!**

You've completed comprehensive preparation. You've practiced extensively. You've learned strategies. You've improved significantly. You know what to expect. You're ready.

Now go show them what you can do! 🎉
    `
  }
];

export default mockExamsContent;

