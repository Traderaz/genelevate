import { Course } from '@/types/course';

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
    level: 'Year 5-6',
    yearGroups: ['Year 5', 'Year 6'],
    description: 'Master all verbal reasoning question types for 11+ exams including synonyms, antonyms, analogies, and word relationships.',
    category: 'exam_prep',
    thumbnailUrl: '',
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
    prerequisites: ['Basic reading comprehension', 'Year 4 English level'],
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
    syllabus: 'GL Assessment, CEM, ISEB',
    examBoard: 'All Major Exam Boards',
    tags: ['11+', 'Verbal Reasoning', 'Grammar School', 'Entrance Exam', 'Critical Thinking'],
    featured: true,
    pricing: {
      isFree: false,
      requiredTier: 'basic'
    },
    instructor: {
      name: 'Expert 11+ Tutors',
      bio: 'Specialist tutors with proven track record in 11+ preparation',
      credentials: []
    },
    enrollmentCount: 0,
    rating: 0,
    published: true,
    isPublished: true,
    isActive: true
  },

  // ==================== NON-VERBAL REASONING ====================
  {
    title: '11+ Non-Verbal Reasoning Mastery',
    subject: '11+ Preparation',
    level: 'Year 5-6',
    yearGroups: ['Year 5', 'Year 6'],
    description: 'Complete non-verbal reasoning training covering shapes, patterns, sequences, and spatial reasoning for 11+ success.',
    category: 'exam_prep',
    thumbnailUrl: '',
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
    prerequisites: ['Basic shape recognition', 'Year 4 Maths level'],
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
    syllabus: 'GL Assessment, CEM, ISEB',
    examBoard: 'All Major Exam Boards',
    tags: ['11+', 'Non-Verbal Reasoning', 'Spatial Awareness', 'Pattern Recognition'],
    featured: true,
    pricing: {
      isFree: false,
      requiredTier: 'basic'
    },
    instructor: {
      name: 'Expert 11+ Tutors',
      bio: 'Specialist tutors with proven track record in 11+ preparation',
      credentials: []
    },
    enrollmentCount: 0,
    rating: 0,
    published: true,
    isPublished: true,
    isActive: true
  },

  // ==================== ENGLISH ====================
  {
    title: '11+ English Comprehension & Writing',
    subject: '11+ Preparation',
    level: 'Year 5-6',
    yearGroups: ['Year 5', 'Year 6'],
    description: 'Comprehensive English training covering reading comprehension, creative writing, and grammar for 11+ exams.',
    category: 'exam_prep',
    thumbnailUrl: '',
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
    prerequisites: ['Year 4 English', 'Basic writing skills'],
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
    syllabus: 'GL Assessment, CEM, ISEB',
    examBoard: 'All Major Exam Boards',
    tags: ['11+', 'English', 'Comprehension', 'Creative Writing', 'Grammar'],
    featured: true,
    pricing: {
      isFree: false,
      requiredTier: 'basic'
    },
    instructor: {
      name: 'Expert 11+ English Tutors',
      bio: 'Experienced English teachers specializing in 11+ preparation',
      credentials: []
    },
    enrollmentCount: 0,
    rating: 0,
    published: true,
    isPublished: true,
    isActive: true
  },

  // ==================== MATHEMATICS ====================
  {
    title: '11+ Mathematics Complete Course',
    subject: '11+ Preparation',
    level: 'Year 5-6',
    yearGroups: ['Year 5', 'Year 6'],
    description: 'Complete maths curriculum covering arithmetic, problem-solving, and reasoning for 11+ entrance exams.',
    category: 'exam_prep',
    thumbnailUrl: '',
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
    prerequisites: ['Year 4 Maths', 'Times tables knowledge'],
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
    syllabus: 'GL Assessment, CEM, ISEB',
    examBoard: 'All Major Exam Boards',
    tags: ['11+', 'Mathematics', 'Problem Solving', 'Arithmetic'],
    featured: true,
    pricing: {
      isFree: false,
      requiredTier: 'basic'
    },
    instructor: {
      name: 'Expert 11+ Maths Tutors',
      bio: 'Specialist maths teachers with extensive 11+ experience',
      credentials: []
    },
    enrollmentCount: 0,
    rating: 0,
    published: true,
    isPublished: true,
    isActive: true
  },

  // ==================== INTENSIVE COURSES ====================
  {
    title: '11+ Complete Intensive Programme',
    subject: '11+ Preparation',
    level: 'Year 5-6',
    yearGroups: ['Year 5', 'Year 6'],
    description: 'All-inclusive intensive course covering all four 11+ subjects with regular mock exams and personalized feedback.',
    category: 'exam_prep',
    thumbnailUrl: '',
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
    prerequisites: ['Year 5 level in all subjects', 'Commitment to intensive study'],
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
    syllabus: 'All Exam Boards',
    examBoard: 'GL Assessment, CEM, ISEB',
    tags: ['11+', 'Intensive', 'Complete Course', 'All Subjects', 'Mock Exams'],
    featured: true,
    pricing: {
      isFree: false,
      requiredTier: 'pro'
    },
    instructor: {
      name: 'Elite 11+ Team',
      bio: 'Award-winning team of 11+ specialists with 95%+ success rate',
      credentials: []
    },
    enrollmentCount: 0,
    rating: 0,
    published: true,
    isPublished: true,
    isActive: true
  },

  // ==================== TARGETED SKILLS ====================
  {
    title: '11+ Speed and Accuracy Training',
    subject: '11+ Preparation',
    level: 'Year 5-6',
    yearGroups: ['Year 5', 'Year 6'],
    description: 'Specialized course to improve processing speed, accuracy, and time management under exam conditions.',
    category: 'exam_prep',
    thumbnailUrl: '',
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
    prerequisites: ['Basic knowledge of 11+ question types'],
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
    syllabus: 'All Exam Boards',
    examBoard: 'Universal Skills',
    tags: ['11+', 'Speed', 'Accuracy', 'Time Management', 'Exam Technique'],
    featured: false,
    pricing: {
      isFree: false,
      requiredTier: 'basic'
    },
    instructor: {
      name: 'Performance Coach Team',
      bio: 'Specialists in exam technique and performance optimization',
      credentials: []
    },
    enrollmentCount: 0,
    rating: 0,
    published: true,
    isPublished: true,
    isActive: true
  },

  // ==================== SCHOOL-SPECIFIC ====================
  {
    title: '11+ Grammar School Mock Exams',
    subject: '11+ Preparation',
    level: 'Year 5-6',
    yearGroups: ['Year 5', 'Year 6'],
    description: 'Regular full-length mock exams replicating real 11+ test conditions with detailed marking and feedback.',
    category: 'exam_prep',
    thumbnailUrl: '',
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
    prerequisites: ['Basic preparation in all 11+ subjects'],
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
    syllabus: 'All Exam Boards',
    examBoard: 'GL Assessment, CEM, ISEB',
    tags: ['11+', 'Mock Exams', 'Practice Tests', 'Assessment', 'Progress Tracking'],
    featured: true,
    pricing: {
      isFree: false,
      requiredTier: 'basic'
    },
    instructor: {
      name: 'Assessment Team',
      bio: 'Qualified examiners and former grammar school teachers',
      credentials: []
    },
    enrollmentCount: 0,
    rating: 0,
    published: true,
    isPublished: true,
    isActive: true
  },

  // ==================== VOCABULARY & COMPREHENSION ====================
  {
    title: '11+ Vocabulary Building Programme',
    subject: '11+ Preparation',
    level: 'Year 5-6',
    yearGroups: ['Year 5', 'Year 6'],
    description: 'Systematic vocabulary expansion course covering 1000+ essential words for verbal reasoning and comprehension.',
    category: 'exam_prep',
    thumbnailUrl: '',
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
    prerequisites: ['Basic reading ability'],
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
    syllabus: 'Supporting All Exam Boards',
    examBoard: 'Universal',
    tags: ['11+', 'Vocabulary', 'Word Power', 'English', 'Reading'],
    featured: false,
    pricing: {
      isFree: false,
      requiredTier: 'basic'
    },
    instructor: {
      name: 'English Specialists',
      bio: 'Expert English teachers focused on vocabulary development',
      credentials: []
    },
    enrollmentCount: 0,
    rating: 0,
    published: true,
    isPublished: true,
    isActive: true
  },

  // ==================== CONFIDENCE & WELLBEING ====================
  {
    title: '11+ Confidence & Exam Mindset',
    subject: '11+ Preparation',
    level: 'Year 5-6',
    yearGroups: ['Year 5', 'Year 6'],
    description: 'Build confidence, manage exam stress, and develop the right mindset for 11+ success.',
    category: 'skills',
    thumbnailUrl: '',
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
    prerequisites: ['None - open to all students'],
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
    syllabus: 'Wellbeing Support',
    examBoard: 'Universal',
    tags: ['11+', 'Confidence', 'Mindset', 'Wellbeing', 'Stress Management'],
    featured: false,
    pricing: {
      isFree: true,
      requiredTier: 'free'
    },
    instructor: {
      name: 'Wellbeing Specialists',
      bio: 'Educational psychologists and wellbeing coaches',
      credentials: []
    },
    enrollmentCount: 0,
    rating: 0,
    published: true,
    isPublished: true,
    isActive: true
  }
];

