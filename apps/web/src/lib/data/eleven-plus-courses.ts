import { Course } from '@/lib/services/courses';

/**
 * 11+ Exam Preparation Courses
 * Comprehensive curriculum covering all exam boards (GL Assessment, CEM, ISEB)
 * Designed to prepare students aged 9-11 for grammar school entrance exams
 */

export const elevenPlusCourses: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // ==================== VERBAL REASONING ====================
  {
    title: '11+ Verbal Reasoning Essentials',
    subject: '11+ Preparation',
    yearGroups: ['Year 5', 'Year 6'],
    description: 'Master all verbal reasoning question types for 11+ exams including synonyms, antonyms, analogies, and word relationships.',
    thumbnail: '',
    difficulty: 'intermediate',
    duration: 12, // weeks
    moduleCount: 12,
    estimatedHours: 24,
    objectives: [
      'Understand and solve synonym and antonym questions',
      'Master word analogies and relationships',
      'Complete letter and number sequences',
      'Solve word codes and hidden words',
      'Practice compound words and word connections',
      'Develop logic and reasoning skills',
      'Build advanced vocabulary for exam success'
    ],
    topics: [
      'Synonyms and Antonyms',
      'Analogies and Word Relationships',
      'Letter Sequences',
      'Number Sequences',
      'Word Codes and Ciphers',
      'Hidden Words and Compound Words',
      'Completing Word Pairs',
      'Logic Problems',
      'Missing Letters',
      'Word Links',
      'Timed Practice Papers',
      'Exam Technique and Strategy'
    ],
    tags: ['11+', 'Verbal Reasoning', 'Grammar School', 'Entrance Exam', 'Critical Thinking'],
    featured: true,
    enrollmentCount: 0,
    rating: 0,
    published: true,
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  // ==================== NON-VERBAL REASONING ====================
  {
    title: '11+ Non-Verbal Reasoning Mastery',
    subject: '11+ Preparation',
    yearGroups: ['Year 5', 'Year 6'],
    description: 'Complete non-verbal reasoning training covering shapes, patterns, sequences, and spatial reasoning for 11+ success.',
    thumbnail: '',
    difficulty: 'intermediate',
    duration: 10,
    moduleCount: 10,
    estimatedHours: 20,
    objectives: [
      'Identify and complete shape patterns',
      'Master 2D and 3D spatial reasoning',
      'Solve rotation and reflection problems',
      'Complete matrix-style questions',
      'Understand shape analogies',
      'Develop visual logic skills',
      'Build speed and accuracy'
    ],
    topics: [
      'Shape Patterns and Sequences',
      'Odd One Out',
      'Analogies with Shapes',
      'Matrices and Grids',
      'Rotations and Reflections',
      '3D Shape Visualization',
      'Shape Codes',
      'Complete the Series',
      'Hidden Shapes',
      'Nets and Cubes',
      'Timed Practice Tests',
      'Speed and Accuracy Training'
    ],
    tags: ['11+', 'Non-Verbal Reasoning', 'Spatial Awareness', 'Pattern Recognition'],
    featured: true,
    enrollmentCount: 0,
    rating: 0,
    published: true,
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  // ==================== ENGLISH ====================
  {
    title: '11+ English Comprehension & Writing',
    subject: '11+ Preparation',
    yearGroups: ['Year 5', 'Year 6'],
    description: 'Comprehensive English training covering reading comprehension, creative writing, and grammar for 11+ exams.',
    thumbnail: '',
    difficulty: 'intermediate',
    duration: 14,
    moduleCount: 14,
    estimatedHours: 28,
    objectives: [
      'Master reading comprehension techniques',
      'Develop advanced grammar skills',
      'Write compelling creative stories',
      'Perfect punctuation and spelling',
      'Analyze texts critically',
      'Build extensive vocabulary',
      'Practice exam-style questions'
    ],
    topics: [
      'Reading Comprehension Strategies',
      'Fiction Text Analysis',
      'Non-Fiction Text Analysis',
      'Poetry Comprehension',
      'Inference and Deduction',
      'Grammar Rules and Application',
      'Punctuation Mastery',
      'Spelling Strategies',
      'Creative Writing - Story Planning',
      'Creative Writing - Descriptive Techniques',
      'Formal Letter Writing',
      'Proofreading and Editing',
      'Vocabulary Building',
      'Exam Practice Papers'
    ],
    tags: ['11+', 'English', 'Comprehension', 'Creative Writing', 'Grammar'],
    featured: true,
    enrollmentCount: 0,
    rating: 0,
    published: true,
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  // ==================== MATHEMATICS ====================
  {
    title: '11+ Mathematics Complete Course',
    subject: '11+ Preparation',
    yearGroups: ['Year 5', 'Year 6'],
    description: 'Complete maths curriculum covering arithmetic, problem-solving, and reasoning for 11+ entrance exams.',
    thumbnail: '',
    difficulty: 'intermediate',
    duration: 14,
    moduleCount: 14,
    estimatedHours: 28,
    objectives: [
      'Master core arithmetic operations',
      'Solve complex word problems',
      'Understand fractions, decimals, and percentages',
      'Apply mathematical reasoning',
      'Work with time, money, and measures',
      'Master geometry and shapes',
      'Develop problem-solving strategies'
    ],
    topics: [
      'Number and Place Value',
      'Four Operations (+-×÷)',
      'Fractions',
      'Decimals',
      'Percentages',
      'Ratio and Proportion',
      'Algebra Basics',
      'Time and Money',
      'Measures and Conversion',
      '2D and 3D Shapes',
      'Perimeter, Area, and Volume',
      'Data Handling and Statistics',
      'Problem-Solving Techniques',
      'Exam Practice Papers'
    ],
    tags: ['11+', 'Mathematics', 'Problem Solving', 'Arithmetic'],
    featured: true,
    enrollmentCount: 0,
    rating: 0,
    published: true,
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  // ==================== INTENSIVE COURSES ====================
  {
    title: '11+ Complete Intensive Programme',
    subject: '11+ Preparation',
    yearGroups: ['Year 5', 'Year 6'],
    description: 'All-inclusive intensive course covering all four 11+ subjects with regular mock exams and personalized feedback.',
    thumbnail: '',
    difficulty: 'advanced',
    duration: 20,
    moduleCount: 20,
    estimatedHours: 60,
    objectives: [
      'Complete mastery of all 11+ subjects',
      'Develop time management skills',
      'Build exam confidence and resilience',
      'Practice under timed conditions',
      'Receive personalized feedback',
      'Identify and address weak areas',
      'Achieve target school requirements'
    ],
    topics: [
      'Verbal Reasoning - All Question Types',
      'Non-Verbal Reasoning - Complete Coverage',
      'English - Reading and Writing',
      'Maths - Full Curriculum',
      'Weekly Mock Exams',
      'Time Management Strategies',
      'Stress Management Techniques',
      'Exam Day Preparation',
      'School-Specific Practice',
      'Interview Preparation',
      'Regular Progress Assessments',
      'One-to-One Support Sessions',
      'Parent Consultation Meetings',
      'Study Schedule Planning',
      'Revision Techniques',
      'Past Paper Analysis',
      'Weak Area Workshops',
      'Confidence Building',
      'Final Countdown Preparation',
      'Post-Exam Support'
    ],
    tags: ['11+', 'Intensive', 'Complete Course', 'All Subjects', 'Mock Exams'],
    featured: true,
    enrollmentCount: 0,
    rating: 0,
    published: true,
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  // ==================== TARGETED SKILLS ====================
  {
    title: '11+ Speed and Accuracy Training',
    subject: '11+ Preparation',
    yearGroups: ['Year 5', 'Year 6'],
    description: 'Specialized course to improve processing speed, accuracy, and time management under exam conditions.',
    thumbnail: '',
    difficulty: 'intermediate',
    duration: 8,
    moduleCount: 8,
    estimatedHours: 16,
    objectives: [
      'Increase working speed without losing accuracy',
      'Master time allocation strategies',
      'Reduce careless errors',
      'Build mental stamina',
      'Improve focus and concentration',
      'Develop quick checking techniques'
    ],
    topics: [
      'Speed Reading Techniques',
      'Quick Calculation Methods',
      'Mental Maths Shortcuts',
      'Pattern Recognition Speed Drills',
      'Time Management Per Question',
      'Error Spotting and Correction',
      'Concentration Exercises',
      'Stamina Building',
      'Practice Under Pressure',
      'Quick Review Strategies'
    ],
    tags: ['11+', 'Speed', 'Accuracy', 'Time Management', 'Exam Technique'],
    featured: false,
    enrollmentCount: 0,
    rating: 0,
    published: true,
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  // ==================== SCHOOL-SPECIFIC ====================
  {
    title: '11+ Grammar School Mock Exams',
    subject: '11+ Preparation',
    yearGroups: ['Year 5', 'Year 6'],
    description: 'Regular full-length mock exams replicating real 11+ test conditions with detailed marking and feedback.',
    thumbnail: '',
    difficulty: 'intermediate',
    duration: 12,
    moduleCount: 12,
    estimatedHours: 24,
    objectives: [
      'Experience authentic exam conditions',
      'Identify strengths and weaknesses',
      'Track progress over time',
      'Build exam confidence',
      'Practice time management',
      'Receive detailed performance reports',
      'Get personalized improvement plans'
    ],
    topics: [
      'Baseline Assessment Mock',
      'Verbal Reasoning Mock 1',
      'Non-Verbal Reasoning Mock 1',
      'English Mock 1',
      'Maths Mock 1',
      'Combined Paper Mock 1',
      'Progress Review Session',
      'Combined Paper Mock 2',
      'School-Specific Mocks',
      'Final Practice Exam',
      'Performance Analysis',
      'Results Discussion and Action Plan'
    ],
    tags: ['11+', 'Mock Exams', 'Practice Tests', 'Assessment', 'Progress Tracking'],
    featured: true,
    enrollmentCount: 0,
    rating: 0,
    published: true,
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  // ==================== VOCABULARY & COMPREHENSION ====================
  {
    title: '11+ Vocabulary Building Programme',
    subject: '11+ Preparation',
    yearGroups: ['Year 5', 'Year 6'],
    description: 'Systematic vocabulary expansion course covering 1000+ essential words for verbal reasoning and comprehension.',
    thumbnail: '',
    difficulty: 'beginner',
    duration: 16,
    moduleCount: 16,
    estimatedHours: 24,
    objectives: [
      'Learn 1000+ exam-relevant words',
      'Master word roots, prefixes, and suffixes',
      'Understand context and usage',
      'Build word families',
      'Practice with mnemonics',
      'Apply vocabulary in context'
    ],
    topics: [
      'Word Roots and Etymology',
      'Prefixes and Suffixes',
      'Synonyms and Antonyms Practice',
      'Word Families and Groups',
      'Homophones and Homonyms',
      'Context Clues',
      'Academic Vocabulary',
      'Descriptive Language',
      'Technical Terms',
      'Words in Context',
      'Memory Techniques',
      'Daily Vocabulary Practice',
      'Word Games and Quizzes',
      'Reading for Vocabulary',
      'Using New Words',
      'Vocabulary Assessments'
    ],
    tags: ['11+', 'Vocabulary', 'Word Power', 'English', 'Reading'],
    featured: false,
    enrollmentCount: 0,
    rating: 0,
    published: true,
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  // ==================== CONFIDENCE & WELLBEING ====================
  {
    title: '11+ Confidence & Exam Mindset',
    subject: '11+ Preparation',
    yearGroups: ['Year 5', 'Year 6'],
    description: 'Build confidence, manage exam stress, and develop the right mindset for 11+ success.',
    thumbnail: '',
    difficulty: 'beginner',
    duration: 6,
    moduleCount: 6,
    estimatedHours: 8,
    objectives: [
      'Overcome exam anxiety',
      'Build self-confidence',
      'Develop positive mindset',
      'Learn relaxation techniques',
      'Handle pressure effectively',
      'Stay motivated throughout preparation'
    ],
    topics: [
      'Understanding Exam Stress',
      'Breathing and Relaxation Techniques',
      'Positive Self-Talk',
      'Growth Mindset Development',
      'Handling Difficult Questions',
      'Building Resilience',
      'Sleep and Nutrition for Exams',
      'Managing Expectations',
      'Visualization Techniques',
      'Parent-Child Communication',
      'Dealing with Setbacks',
      'Celebrating Progress'
    ],
    tags: ['11+', 'Confidence', 'Mindset', 'Wellbeing', 'Stress Management'],
    featured: false,
    enrollmentCount: 0,
    rating: 0,
    published: true,
    chapters: [],
    createdBy: 'Gen Elevate Team'
  }
];













