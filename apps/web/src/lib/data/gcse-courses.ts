import { Course } from '@/lib/services/courses';

/**
 * GCSE Courses - Complete Revision Guides for UK GCSE Students
 * 
 * Comprehensive revision resources covering 2025/2026 curriculum for:
 * - Mathematics (Foundation & Higher)
 * - Science (Biology, Chemistry, Physics)
 * - English Language & Literature
 * - History, Geography, Computer Science
 * 
 * Designed for Years 10-11 (ages 14-16) preparing for GCSEs
 * Covers all major UK exam boards: AQA, Edexcel, OCR, WJEC
 */

export const gcseCourses: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // ==================== MATHEMATICS ====================
  {
    title: 'GCSE Mathematics Foundation Tier',
    slug: 'gcse-maths-foundation',
    subject: 'Mathematics',
    yearGroups: ['Year 10', 'Year 11'],
    description: 'Complete GCSE Maths Foundation (Grades 1-5) revision covering all exam boards. 15 comprehensive modules with 120+ worked examples, exam-style questions, and step-by-step solutions. Master number, algebra, geometry, statistics and probability for your GCSE exams.',
    thumbnail: '',
    difficulty: 'intermediate',
    duration: 24, // weeks (2 school terms)
    moduleCount: 15,
    estimatedHours: 80,
    objectives: [
      'Master all Foundation tier topics for Grades 1-5',
      'Complete 300+ exam-style practice questions',
      'Learn efficient calculation methods and shortcuts',
      'Understand real-world applications of mathematics',
      'Practice with mark schemes and examiner tips',
      'Build confidence for exam day'
    ],
    topics: [
      'Number Operations & Place Value',
      'Fractions, Decimals & Percentages',
      'Ratio, Proportion & Rates of Change',
      'Algebra & Equations',
      'Sequences & Patterns',
      'Graphs & Functions',
      'Geometry & Measures',
      'Pythagoras & Trigonometry',
      'Area, Perimeter & Volume',
      'Transformations',
      'Statistics & Data',
      'Probability'
    ],
    tags: ['GCSE', 'Mathematics', 'Foundation', 'Exam Prep', 'UK Curriculum'],
    published: true,
    category: 'gcse'
  },
  {
    title: 'GCSE Mathematics Higher Tier',
    slug: 'gcse-maths-higher',
    subject: 'Mathematics',
    yearGroups: ['Year 10', 'Year 11'],
    description: 'Complete GCSE Maths Higher (Grades 4-9) revision covering all exam boards. 18 advanced modules with 144+ worked examples including circle theorems, vectors, advanced trigonometry, and Grade 9 problem-solving strategies.',
    thumbnail: '',
    difficulty: 'advanced',
    duration: 24, // weeks (2 school terms)
    moduleCount: 18,
    estimatedHours: 100,
    objectives: [
      'Master all Higher tier topics for Grades 4-9',
      'Complete 400+ challenging exam questions',
      'Learn advanced problem-solving techniques',
      'Master circle theorems and vectors',
      'Apply sine and cosine rules confidently',
      'Achieve Grade 8-9 with strategic exam technique'
    ],
    topics: [
      'Surds & Indices',
      'Standard Form',
      'Factorizing Quadratics',
      'Simultaneous Equations',
      'Inequalities',
      'Sequences (Arithmetic, Geometric, Quadratic)',
      'Graphs & Transformations',
      'Circle Theorems',
      'Vectors',
      'Advanced Trigonometry (Sine & Cosine Rules)',
      'Pythagoras in 3D',
      'Similarity & Congruence',
      'Probability (Venn & Conditional)',
      'Statistics (Cumulative Frequency)',
      'Functions & Transformations',
      'Bounds & Error Intervals',
      'Problem Solving & Proof',
      'Grade 9 Challenges'
    ],
    tags: ['GCSE', 'Mathematics', 'Higher', 'Grade 9', 'Advanced', 'UK Curriculum'],
    published: true,
    category: 'gcse'
  },

  // ==================== SCIENCE ====================
  {
    title: 'GCSE Biology - Complete Revision Guide',
    slug: 'gcse-biology',
    subject: 'Science',
    yearGroups: ['Year 10', 'Year 11'],
    description: 'Complete GCSE Biology revision covering all exam boards (AQA, Edexcel, OCR, WJEC). 15 modules covering cell biology, organisation, infection and response, bioenergetics, homeostasis, inheritance, variation, evolution, and ecology. Includes required practicals, exam technique, and 6-mark question strategies.',
    thumbnail: '',
    difficulty: 'intermediate',
    duration: 24,
    moduleCount: 15,
    estimatedHours: 90,
    objectives: [
      'Master all GCSE Biology specification content',
      'Complete all required practical investigations',
      'Answer extended response (6-mark) questions confidently',
      'Learn key scientific vocabulary and terminology',
      'Apply knowledge to unfamiliar contexts',
      'Achieve Grades 7-9 with strategic exam preparation'
    ],
    topics: [
      'Cell Biology & Microscopy',
      'Cell Division (Mitosis & Meiosis)',
      'Organisation & Digestion',
      'Circulatory System',
      'Communicable Diseases',
      'Non-Communicable Diseases',
      'Photosynthesis',
      'Respiration',
      'Homeostasis & Response',
      'Nervous System & Hormones',
      'Inheritance, Variation & Evolution',
      'Genetics & DNA',
      'Evolution & Natural Selection',
      'Ecology & Ecosystems',
      'Biodiversity & Human Impact'
    ],
    tags: ['GCSE', 'Biology', 'Science', 'Required Practicals', 'UK Curriculum'],
    published: true,
    category: 'gcse'
  },
  {
    title: 'GCSE Chemistry - Complete Revision Guide',
    slug: 'gcse-chemistry',
    subject: 'Science',
    yearGroups: ['Year 10', 'Year 11'],
    description: 'Complete GCSE Chemistry revision covering all exam boards. 15 modules including atomic structure, bonding, quantitative chemistry, chemical changes, energy changes, reaction rates, organic chemistry, chemical analysis, atmosphere, and Earth resources. Master calculations, practicals, and exam technique.',
    thumbnail: '',
    difficulty: 'intermediate',
    duration: 24,
    moduleCount: 15,
    estimatedHours: 90,
    objectives: [
      'Master atomic structure and the periodic table',
      'Complete all chemistry calculations confidently (moles, concentration, yield)',
      'Understand bonding, structure, and properties',
      'Learn required practical skills and analysis',
      'Answer calculation and extended response questions',
      'Apply knowledge to real-world chemistry contexts'
    ],
    topics: [
      'Atomic Structure & Periodic Table',
      'Bonding, Structure & Properties',
      'Quantitative Chemistry (Moles & Calculations)',
      'Chemical Changes & Reactivity',
      'Energy Changes in Reactions',
      'Rate of Reaction & Catalysts',
      'Equilibrium & Reversible Reactions',
      'Crude Oil & Organic Chemistry',
      'Chemical Analysis & Testing',
      'Atmosphere & Climate',
      'Using Earth\'s Resources',
      'Acids, Bases & Salts',
      'Electrolysis',
      'Metals & Extraction',
      'Polymers & Materials'
    ],
    tags: ['GCSE', 'Chemistry', 'Science', 'Calculations', 'UK Curriculum'],
    published: true,
    category: 'gcse'
  },
  {
    title: 'GCSE Physics - Complete Revision Guide',
    slug: 'gcse-physics',
    subject: 'Science',
    yearGroups: ['Year 10', 'Year 11'],
    description: 'Complete GCSE Physics revision covering all exam boards. 15 modules including energy, electricity, particle model, atomic structure, forces, motion, waves, magnetism, and space physics. Master equations, practical skills, and problem-solving for Grades 7-9.',
    thumbnail: '',
    difficulty: 'intermediate',
    duration: 24,
    moduleCount: 15,
    estimatedHours: 90,
    objectives: [
      'Master all physics equations and calculations',
      'Complete required practical investigations',
      'Understand energy transfers and conservation',
      'Apply Newton\'s laws and motion equations',
      'Learn electricity calculations (V=IR, P=IV)',
      'Achieve top grades with strategic exam technique'
    ],
    topics: [
      'Energy Stores & Transfers',
      'Energy Resources',
      'Electricity & Circuits',
      'Domestic Electricity & Power',
      'Particle Model of Matter',
      'Atomic Structure & Radioactivity',
      'Forces & Motion',
      'Newton\'s Laws',
      'Momentum',
      'Waves & Wave Behaviour',
      'Electromagnetic Spectrum',
      'Magnetism & Electromagnetism',
      'Space Physics',
      'Required Practicals',
      'Exam Technique & Problem Solving'
    ],
    tags: ['GCSE', 'Physics', 'Science', 'Equations', 'UK Curriculum'],
    published: true,
    category: 'gcse'
  },

  // ==================== ENGLISH ====================
  {
    title: 'GCSE English Language - Complete Revision Guide',
    slug: 'gcse-english-language',
    subject: 'English',
    yearGroups: ['Year 10', 'Year 11'],
    description: 'Complete GCSE English Language revision covering Papers 1 & 2. 12 modules including reading comprehension, creative writing, persuasive writing, non-fiction analysis, grammar mastery, and exam technique. Master PEE structure, AFOREST techniques, SPaG, and achieve Grades 7-9.',
    thumbnail: '',
    difficulty: 'intermediate',
    duration: 24,
    moduleCount: 12,
    estimatedHours: 85,
    objectives: [
      'Master reading analysis for fiction and non-fiction texts',
      'Write compelling creative stories and descriptions',
      'Craft persuasive arguments and speeches using AFOREST',
      'Achieve SPaG accuracy for 16 marks',
      'Compare writers\' viewpoints effectively',
      'Apply exam technique for time management and structure'
    ],
    topics: [
      'Reading Comprehension & Analysis',
      'Creative Writing (Fiction)',
      'Descriptive Writing',
      'Writing to Persuade & Argue',
      'Grammar & Punctuation Mastery (SPaG)',
      'Analyzing Non-Fiction Texts',
      'Exam Technique & Time Management',
      'Vocabulary Enhancement',
      'Writing Letters & Articles',
      'Summary & Synthesis Skills',
      'Advanced Sentence Structures',
      'Final Exam Preparation'
    ],
    tags: ['GCSE', 'English Language', 'Creative Writing', 'SPaG', 'Exam Prep', 'UK Curriculum'],
    published: true,
    category: 'gcse'
  },
  {
    title: 'GCSE English Literature - Complete Revision Guide',
    slug: 'gcse-english-literature',
    subject: 'English',
    yearGroups: ['Year 10', 'Year 11'],
    description: 'Complete GCSE English Literature revision covering Shakespeare, 19th-century novel, modern text, poetry anthology, and unseen poetry. 10 comprehensive modules with character analysis, theme exploration, context, quotations, and essay technique for Grades 7-9.',
    thumbnail: '',
    difficulty: 'intermediate',
    duration: 24,
    moduleCount: 10,
    estimatedHours: 90,
    objectives: [
      'Analyze Shakespeare plays with confidence',
      'Master 19th-century novel analysis (e.g., Jekyll & Hyde, Christmas Carol)',
      'Explore modern texts and themes',
      'Compare poetry anthology poems effectively',
      'Tackle unseen poetry with analytical framework',
      'Write Grade 9 literature essays with context and quotations'
    ],
    topics: [
      'Shakespeare: Context & Key Themes',
      'Shakespeare: Character Analysis',
      'Shakespeare: Language & Stagecraft',
      '19th Century Novel: Plot & Context',
      '19th Century Novel: Themes & Symbolism',
      'Modern Text: Social & Historical Context',
      'Power & Conflict Poetry Anthology',
      'Love & Relationships Poetry',
      'Unseen Poetry: Analysis Technique',
      'Literature Essay Mastery & Exam Technique'
    ],
    tags: ['GCSE', 'English Literature', 'Shakespeare', 'Poetry', 'Essays', 'UK Curriculum'],
    published: true,
    category: 'gcse'
  },

  // ==================== HUMANITIES ====================
  {
    title: 'GCSE History - Complete Revision Guide',
    slug: 'gcse-history',
    subject: 'History',
    yearGroups: ['Year 10', 'Year 11'],
    description: 'Complete GCSE History revision covering Medicine Through Time, Weimar & Nazi Germany, Cold War, Norman England, Elizabethan England, American West, and Civil Rights. 15 modules with source analysis, essay technique, and exam strategies for all UK exam boards.',
    thumbnail: '',
    difficulty: 'intermediate',
    duration: 24,
    moduleCount: 15,
    estimatedHours: 95,
    objectives: [
      'Master Medicine Through Time thematic study',
      'Analyze historical sources effectively (utility, reliability)',
      'Write balanced essays with judgement',
      'Understand Nazi Germany and Cold War depth studies',
      'Apply historical skills to unfamiliar contexts',
      'Achieve Grades 7-9 with SPaG accuracy'
    ],
    topics: [
      'Medicine in Medieval Britain',
      'Renaissance Medicine',
      '19th Century Medicine',
      'Modern Medicine & NHS',
      'Weimar Germany 1918-1929',
      'Nazi Rise to Power',
      'Nazi Control & Dictatorship',
      'Cold War Origins',
      'Cold War Crises (Korea, Cuba)',
      'Norman Conquest 1066',
      'Elizabethan England',
      'American West 1835-1895',
      'Civil Rights USA 1954-1968',
      'Source Skills & Interpretations',
      'Essay Technique & Exam Strategy'
    ],
    tags: ['GCSE', 'History', 'Medicine', 'Germany', 'Cold War', 'Essay Writing', 'UK Curriculum'],
    published: true,
    category: 'gcse'
  },
  {
    title: 'GCSE Geography - Complete Revision Guide',
    slug: 'gcse-geography',
    subject: 'Geography',
    yearGroups: ['Year 10', 'Year 11'],
    description: 'Complete GCSE Geography revision covering physical geography (rivers, coasts, weather, tectonic hazards, ecosystems), human geography (urban, economic, resource management), and geographical skills including fieldwork. 15 modules with case studies, OS maps, and exam technique.',
    thumbnail: '',
    difficulty: 'intermediate',
    duration: 24,
    moduleCount: 15,
    estimatedHours: 90,
    objectives: [
      'Master physical geography processes and landforms',
      'Learn detailed case studies (UK city, LIC/NEE city, rainforest, etc.)',
      'Complete OS map skills (grid references, distance, relief)',
      'Understand resource management challenges',
      'Apply fieldwork methodology and evaluation',
      'Write balanced geographical essays'
    ],
    topics: [
      'River Landscapes & Management',
      'Coastal Landscapes & Management',
      'Weather Hazards & Climate Change',
      'Tectonic Hazards (Earthquakes & Volcanoes)',
      'Tropical Rainforests',
      'Hot Deserts',
      'Urban Issues: UK City',
      'Urban Issues: LIC/NEE City',
      'Economic Development & Inequality',
      'Resource Management: Water',
      'Resource Management: Energy',
      'Resource Management: Food',
      'Fieldwork Skills & Methodology',
      'OS Maps, Graphs & Data Skills',
      'Issue Evaluation & Exam Technique'
    ],
    tags: ['GCSE', 'Geography', 'Case Studies', 'Fieldwork', 'OS Maps', 'UK Curriculum'],
    published: true,
    category: 'gcse'
  },
  {
    title: 'GCSE Computer Science - Complete Revision Guide',
    slug: 'gcse-computer-science',
    subject: 'Computer Science',
    yearGroups: ['Year 10', 'Year 11'],
    description: 'Complete GCSE Computer Science revision covering programming (Python), algorithms, data representation, computer systems, networks, cybersecurity, databases (SQL), and ethical/legal issues. 12 modules with coding practice, binary conversions, and exam technique for Papers 1 & 2.',
    thumbnail: '',
    difficulty: 'intermediate',
    duration: 24,
    moduleCount: 12,
    estimatedHours: 85,
    objectives: [
      'Master Python programming (variables, selection, iteration, functions, lists)',
      'Convert between binary, denary, and hexadecimal',
      'Write SQL queries (SELECT, WHERE, JOIN)',
      'Understand computer architecture and networks',
      'Apply cybersecurity principles',
      'Solve algorithm problems (search, sort, trace)'
    ],
    topics: [
      'Python Fundamentals (Variables, Data Types, I/O)',
      'Selection (if) & Iteration (loops)',
      'Lists & Arrays',
      'Functions & Procedures',
      'Binary, Denary & Hexadecimal',
      'Data Representation (Characters, Images)',
      'Computer Systems (CPU, RAM, Storage)',
      'Networks & Internet',
      'Cybersecurity & Threats',
      'Databases & SQL',
      'Algorithms (Search & Sort)',
      'Ethics, Legal & Environmental Issues'
    ],
    tags: ['GCSE', 'Computer Science', 'Python', 'SQL', 'Algorithms', 'UK Curriculum'],
    published: true,
    category: 'gcse'
  }
];

export default gcseCourses;

