import { Course } from '@/lib/services/courses';

/**
 * A-Level Courses - EXAM-FOCUSED REVISION GUIDES
 * 
 * These are NOT textbooks - they are comprehensive revision guides designed to:
 * - Cover ALL specification points for each UK exam board
 * - Include hundreds of exam-style questions with mark schemes
 * - Provide board-specific past paper practice
 * - Offer quick revision summaries and key formula sheets
 * - Feature examiner tips and common mistakes
 * - Include mock exam papers and specimen questions
 * 
 * Each course is structured like a complete revision resource:
 * ✅ Topic summaries and key points
 * ✅ Worked examples with step-by-step solutions
 * ✅ Practice questions (exam-style)
 * ✅ Past paper questions by topic
 * ✅ Mark schemes and examiner reports
 * ✅ Common errors and how to avoid them
 * ✅ Grade boundaries and grade 9 tips
 * ✅ Quick revision checklists
 * 
 * For Years 12-13 (ages 16-18) across all major UK exam boards
 */

export const aLevelCourses: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // ==================== MATHEMATICS ====================
  {
    title: 'A-Level Mathematics (Pure) - All UK Exam Boards',
    subject: 'Mathematics',
    yearGroups: ['Year 12', 'Year 13'],
    description: 'Complete exam-focused revision guide for A-Level Pure Maths covering ALL UK boards: AQA 7357, Edexcel 9MA0, OCR A H240, OCR B MEI H640, WJEC. Includes 500+ practice questions, past paper breakdowns, worked solutions, examiner tips, and mock papers. Not a textbook - a strategic revision resource designed to maximize your grade.',
    thumbnail: '',
    difficulty: 'advanced',
    duration: 48, // weeks (2 years)
    moduleCount: 20,
    estimatedHours: 200,
    objectives: [
      'Revise ALL exam board specifications with targeted practice (AQA, Edexcel, OCR A/B, WJEC)',
      'Complete 500+ exam-style questions with full mark schemes',
      'Master calculus questions - differentiation, integration, and differential equations',
      'Practice past paper questions by topic with examiner commentary',
      'Learn board-specific exam technique and mark allocation strategies',
      'Identify and avoid common mistakes highlighted by examiners',
      'Access quick revision checklists and formula sheets for each topic',
      'Complete full mock papers under timed conditions',
      'Use grade 9 strategies and A* tips from top students'
    ],
    topics: [
      // Core topics with exam practice
      'Algebra & Functions - 50+ exam questions',
      'Coordinate Geometry - past paper practice',
      'Sequences & Series - common exam traps',
      'Trigonometry - identity proofs (exam style)',
      'Exponentials & Logarithms - 6-mark questions',
      'Differentiation - all question types + mark schemes',
      'Integration - worked solutions step-by-step',
      'Numerical Methods - calculator vs non-calculator',
      'Vectors - 3D problems with examiner tips',
      'Proof - induction exam walkthrough',
      // Board-specific exam prep
      'AQA Paper 1 practice (calculator)',
      'AQA Paper 2 practice (non-calculator)',
      'Edexcel Pure 1 & 2 past questions',
      'OCR A specimen papers',
      'OCR B MEI comprehension practice',
      'WJEC past papers 2018-2024',
      // Exam technique
      'Quick revision flashcards',
      'Formula booklet mastery',
      'Common errors from mark schemes',
      'Time management strategies',
      'Grade boundaries analysis',
      '10 full mock papers with solutions',
      'Examiner report insights'
    ],
    tags: ['A-Level', 'Mathematics', 'Pure Maths', 'AQA', 'Edexcel', 'OCR', 'WJEC', 'All Boards'],
    featured: true,
    rating: 0,
    published: true, // 20 modules complete!
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  {
    title: 'A-Level Mathematics (Statistics) - All UK Boards',
    subject: 'Mathematics',
    yearGroups: ['Year 12', 'Year 13'],
    description: 'Complete A-Level Statistics for all UK boards (AQA, Edexcel, OCR A/B, WJEC). Master probability, distributions, hypothesis testing, and statistical analysis with board-specific Large Data Set work.',
    thumbnail: '',
    difficulty: 'advanced',
    duration: 24, // weeks (1 year)
    moduleCount: 12,
    estimatedHours: 110,
    objectives: [
      'Master probability theory across all UK exam boards',
      'Work with binomial, normal, and Poisson distributions',
      'Conduct hypothesis testing (1-tail, 2-tail, all boards)',
      'Analyze and interpret statistical data sets',
      'Apply correlation, regression, and PMCC',
      'Complete Large Data Set analysis (Edexcel, AQA)',
      'Use calculators and statistical tables effectively',
      'Answer board-specific exam questions confidently'
    ],
    topics: [
      'Data Presentation (histograms, box plots, cumulative frequency)',
      'Measures of Location and Spread',
      'Probability (Venn diagrams, tree diagrams, conditional)',
      'Discrete Random Variables',
      'Binomial Distribution B(n,p)',
      'Normal Distribution N(μ,σ²)',
      'Hypothesis Testing (binomial and normal)',
      'Correlation and Regression (PMCC, Spearman\'s rank)',
      'Chi-Squared Tests (goodness of fit, contingency)',
      'Poisson Distribution',
      'AQA/Edexcel: Large Data Set analysis',
      'OCR: Probability generating functions',
      'Past papers and exam technique'
    ],
    tags: ['A-Level', 'Mathematics', 'Statistics', 'AQA', 'Edexcel', 'OCR', 'WJEC'],
    featured: false,
    rating: 0,
    published: true, // Content modules complete!
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  {
    title: 'A-Level Further Mathematics',
    subject: 'Mathematics',
    yearGroups: ['Year 12', 'Year 13'],
    description: 'Advanced A-Level Further Mathematics covering complex numbers, matrices, advanced calculus, and further pure topics.',
    thumbnail: '',
    difficulty: 'advanced',
    duration: 48, // weeks
    moduleCount: 20,
    estimatedHours: 200,
    objectives: [
      'Master complex numbers and their applications',
      'Understand matrix algebra and transformations',
      'Apply advanced calculus techniques',
      'Explore hyperbolic functions and polar coordinates',
      'Develop advanced proof and problem-solving skills',
      'Excel in Further Maths A-Level examinations'
    ],
    topics: [
      'Complex Numbers',
      'Matrices',
      'Series and Induction',
      'Vectors in 3D',
      'Hyperbolic Functions',
      'Polar Coordinates',
      'Differential Equations',
      'Advanced Integration',
      'Groups and Rings',
      'Numerical Analysis',
      'Further Calculus',
      'De Moivre\'s Theorem',
      'Eigenvalues and Eigenvectors',
      'Advanced Proof',
      'Conic Sections'
    ],
    tags: ['A-Level', 'Further Maths', 'Advanced Mathematics', 'Complex Numbers', 'Matrices'],
    featured: true,
    rating: 0,
    published: true, // Content modules complete!
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  // ==================== SCIENCES ====================
  {
    title: 'A-Level Biology - All UK Exam Boards',
    subject: 'Biology',
    yearGroups: ['Year 12', 'Year 13'],
    description: 'Complete exam-focused Biology revision guide for all UK boards: AQA 7402, Edexcel 9BI0, OCR A H420, OCR B H422, WJEC. Includes 600+ exam questions, 12 required practical guides, 6-mark answer templates, synoptic essay practice, and board-specific past papers. Designed for grade maximization, not just content coverage.',
    thumbnail: '',
    difficulty: 'advanced',
    duration: 48, // weeks
    moduleCount: 18,
    estimatedHours: 180,
    objectives: [
      'Revise ALL specification points with exam question practice',
      'Master 6-mark essay questions with mark scheme templates',
      'Complete required practical exam questions (all 12 + board extras)',
      'Practice 25-mark synoptic essays with model answers',
      'Learn board-specific command words and mark allocations',
      'Identify common mistakes from examiner reports',
      'Use quick revision flashcards for 200+ key terms',
      'Complete topic-by-topic past paper questions',
      'Access full mock papers with detailed mark schemes'
    ],
    topics: [
      // Core topics (all boards)
      'Cell Structure (prokaryotic, eukaryotic, organelles)',
      'Biological Molecules (carbs, lipids, proteins, nucleic acids)',
      'Enzymes (structure, factors, inhibition)',
      'Cell Membranes and Transport (osmosis, diffusion, active)',
      'Immune System (phagocytosis, antibodies, vaccination)',
      'DNA, RNA, and Protein Synthesis',
      'Cell Division (mitosis, meiosis)',
      'Genetic Diversity and Natural Selection',
      'Biodiversity and Classification',
      'Energy Transfer in Ecosystems',
      'Photosynthesis and Respiration',
      'Response to Stimuli (nervous, hormonal)',
      // Board-specific content
      'AQA: Gene expression and regulation',
      'AQA: Populations and ecosystems',
      'Edexcel B: Salters-Nuffield context-based approach',
      'Edexcel: Gene technology and GMOs',
      'OCR A: Communication and homeostasis',
      'OCR B: Biochemistry and metabolism',
      'WJEC: Welsh contexts and applications',
      // Required Practicals (all 12 core + board extras)
      'RP1: Microscopy and cell fractionation',
      'RP2: Osmosis in plant tissue',
      'RP3-12: All core practicals',
      'Maths skills in biology',
      'Synoptic practice',
      'Past papers - all boards'
    ],
    tags: ['A-Level', 'Biology', 'AQA', 'Edexcel', 'OCR', 'WJEC', 'Practicals'],
    featured: true,
    rating: 0,
    published: true, // Content modules complete!
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  {
    title: 'A-Level Chemistry - All UK Exam Boards',
    subject: 'Chemistry',
    yearGroups: ['Year 12', 'Year 13'],
    description: 'Complete exam-focused Chemistry revision guide for all UK boards: AQA 7405, Edexcel 9CH0, OCR A H432, OCR B Salters H433, WJEC. 700+ questions with mark schemes, organic mechanism practice, calculation walkthroughs, required practical exam prep, and full mock papers. Your strategic revision resource for maximum grades.',
    thumbnail: '',
    difficulty: 'advanced',
    duration: 48, // weeks
    moduleCount: 18,
    estimatedHours: 180,
    objectives: [
      'Revise ALL boards with 700+ exam-style questions and full mark schemes',
      'Master organic mechanisms with step-by-step exam answer templates',
      'Practice calculation questions with worked solutions (moles, titrations, pH)',
      'Complete required practical exam questions (all 12 core)',
      'Learn synthesis routes and analysis with examiner-approved methods',
      'Use quick revision checklists for reactions and reagents',
      'Practice 6-mark extended response with model answers',
      'Identify common errors from mark schemes and examiner reports',
      'Complete full mock papers under timed exam conditions'
    ],
    topics: [
      // Physical Chemistry
      'Atomic Structure (electron config, mass spec)',
      'Amount of Substance (moles, equations, titrations)',
      'Chemical Bonding (ionic, covalent, metallic)',
      'Energetics (enthalpy, Hess\'s law, Born-Haber)',
      'Kinetics (rate equations, Arrhenius, catalysts)',
      'Chemical Equilibria (Kc, Kp, Le Chatelier)',
      'Redox and Electrochemistry',
      'Acids, Bases, and pH',
      'Thermodynamics (entropy, free energy)',
      // Inorganic Chemistry
      'Periodicity and Trends',
      'Group 2 (reactions, thermal stability)',
      'Group 7/17 Halogens',
      'Group 13-18 Chemistry',
      'Transition Metals (complexes, colour, catalysis)',
      'd-block Chemistry',
      // Organic Chemistry
      'Organic Introduction (nomenclature, isomerism)',
      'Alkanes and Free Radical Substitution',
      'Alkenes and Electrophilic Addition',
      'Alcohols, Halogenoalkanes, Elimination',
      'Organic Synthesis and Analysis',
      'Carbonyl Compounds (aldehydes, ketones)',
      'Carboxylic Acids and Derivatives',
      'Aromatic Chemistry (benzene)',
      'Amines and Amino Acids',
      'Polymers and Condensation',
      'NMR, IR, and Mass Spectrometry',
      // Board-specific
      'AQA: Electrode potentials',
      'Edexcel: Organic synthesis routes',
      'OCR A: Practical skills in context',
      'OCR B (Salters): Industrial chemistry contexts',
      'WJEC: Welsh industrial applications',
      // Practicals
      'All 12 Required Practicals',
      'Maths skills in chemistry',
      'Past papers - all boards'
    ],
    tags: ['A-Level', 'Chemistry', 'AQA', 'Edexcel', 'OCR', 'WJEC', 'Organic', 'Physical'],
    featured: true,
    rating: 0,
    published: true, // Content modules complete!
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  {
    title: 'A-Level Physics - All UK Exam Boards',
    subject: 'Physics',
    yearGroups: ['Year 12', 'Year 13'],
    description: 'Complete exam-focused Physics revision guide for all UK boards: AQA 7408, Edexcel 9PH0, OCR A H556, OCR B H557, WJEC. 800+ questions, calculation practice with sig figs & units, required practical exam prep, data analysis, and full mock papers. Includes optional modules (Astrophysics, Medical, Engineering). Designed for top grades.',
    thumbnail: '',
    difficulty: 'advanced',
    duration: 48, // weeks
    moduleCount: 20,
    estimatedHours: 200,
    objectives: [
      'Master all UK exam board specifications (AQA, Edexcel, OCR A/B, WJEC)',
      'Complete all core required practicals (12 minimum)',
      'Apply mechanics (kinematics, dynamics, energy, momentum)',
      'Understand waves, oscillations, and superposition',
      'Master electricity, circuits, and electromagnetic induction',
      'Explore gravitational, electric, and magnetic fields',
      'Study quantum physics, photoelectric effect, and wave-particle duality',
      'Complete optional modules (Astrophysics, Medical, Engineering, Turning Points)'
    ],
    topics: [
      // Core topics (all boards)
      'Measurements and Uncertainties',
      'Mechanics (kinematics, forces, Newton\'s laws)',
      'Materials (stress, strain, Young modulus)',
      'Waves (progressive, stationary, interference)',
      'Electricity (circuits, Kirchhoff, resistivity)',
      'Further Mechanics (momentum, circular motion)',
      'Thermal Physics (ideal gas, kinetic theory)',
      'Gravitational Fields (Newton, orbits, potential)',
      'Electric Fields (Coulomb, capacitance)',
      'Magnetic Fields (Fleming, motors, induction)',
      'Nuclear Physics (decay, binding energy)',
      'Particle Physics (Standard Model, quarks)',
      'Oscillations (SHM, resonance)',
      'Quantum Physics (photoelectric, de Broglie)',
      // Board-specific core
      'AQA: Required practical apparatus',
      'Edexcel: Core practical assessment',
      'OCR A: Practical skills',
      'OCR B: Research and practical tasks',
      // Optional modules
      'Option: Astrophysics (stars, cosmology)',
      'Option: Medical Physics (X-rays, ultrasound)',
      'Option: Engineering Physics',
      'Option: Turning Points in Physics',
      'Option: Electronics (OCR)',
      'Option: Materials (AQA)',
      // Skills
      'All 12+ Required Practicals',
      'Maths skills in physics',
      'Data analysis and uncertainties',
      'Past papers - all boards',
      'Synoptic questions'
    ],
    tags: ['A-Level', 'Physics', 'AQA', 'Edexcel', 'OCR', 'WJEC', 'Mechanics', 'Quantum'],
    featured: true,
    rating: 0,
    published: true, // Content modules complete!
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  // ==================== HUMANITIES ====================
  {
    title: 'A-Level History',
    subject: 'History',
    yearGroups: ['Year 12', 'Year 13'],
    description: 'A-Level History covering British, European, and World history with focus on critical analysis and essay writing.',
    thumbnail: '',
    difficulty: 'advanced',
    duration: 48, // weeks
    moduleCount: 12,
    estimatedHours: 150,
    objectives: [
      'Analyze historical sources critically',
      'Understand cause, consequence, and change over time',
      'Write analytical and evaluative essays',
      'Compare different historical interpretations',
      'Develop independent research skills',
      'Master A-Level History exam technique'
    ],
    topics: [
      'Britain 1625-1701: Conflict and Reformation',
      'Democracy and Nazism: Germany 1918-1945',
      'The British Empire 1857-1967',
      'The Cold War 1945-1991',
      'Civil Rights in America 1865-1992',
      'Tudors and Stuarts',
      'The French Revolution',
      'Russian Revolution',
      'World War I and II',
      'Historical Interpretation',
      'Source Analysis',
      'Essay Writing Skills'
    ],
    tags: ['A-Level', 'History', 'British History', 'World History', 'Essay Writing'],
    featured: false,
    rating: 0,
    published: true, // Content modules complete!
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  {
    title: 'A-Level Psychology - All UK Exam Boards',
    subject: 'Psychology',
    yearGroups: ['Year 12', 'Year 13'],
    description: 'Complete A-Level Psychology for all UK boards: AQA 7182, Edexcel 9PS0, OCR H567, WJEC. Master core studies, research methods, approaches, biopsychology, and board-specific options with full synoptic coverage.',
    thumbnail: '',
    difficulty: 'advanced',
    duration: 48, // weeks
    moduleCount: 16,
    estimatedHours: 160,
    objectives: [
      'Cover all UK exam board specifications (AQA, Edexcel, OCR, WJEC)',
      'Master classic and contemporary psychological studies',
      'Understand all major approaches (biological, cognitive, psychodynamic, etc)',
      'Excel at research methods, experimental design, and statistics',
      'Apply psychology to mental health, social issues, and real-world contexts',
      'Develop essay writing and evaluation skills',
      'Complete synoptic assessment preparation',
      'Understand ethical issues in psychological research'
    ],
    topics: [
      // Core Psychology (all boards)
      'Social Influence (conformity, obedience, Milgram, Asch)',
      'Memory (multi-store, working memory, eyewitness)',
      'Attachment (Bowlby, Ainsworth, types, deprivation)',
      'Psychopathology (OCD, phobias, depression)',
      'Approaches in Psychology (7 approaches)',
      'Biopsychology (nervous system, brain, neurons)',
      'Research Methods (experimental design, sampling, statistics)',
      'Issues and Debates (nature-nurture, free will, reductionism)',
      // Board-specific topics
      'AQA: Paper 1 - Introductory topics',
      'AQA: Paper 2 - Psychology in context',
      'AQA: Paper 3 - Issues and options',
      'AQA Options: Relationships, Gender, Cognition, Schizophrenia, Eating, Aggression, Forensic, Addiction',
      'Edexcel: Clinical psychology',
      'Edexcel: Criminological psychology',
      'Edexcel: Child psychology',
      'OCR: Core studies (sleep, memory, social)',
      'OCR: Psychological themes',
      'OCR: Applied psychology',
      'WJEC: Psychology as a science',
      'WJEC: Criminological and legal psychology',
      // Skills
      'Essay writing (16-mark questions)',
      'Evaluation (IDA points)',
      'Statistical tests (chi-square, Mann-Whitney, etc)',
      'Synoptic assessment',
      'Ethical considerations',
      'Past papers - all boards'
    ],
    tags: ['A-Level', 'Psychology', 'AQA', 'Edexcel', 'OCR', 'WJEC', 'Mental Health'],
    featured: true,
    rating: 0,
    published: true, // Content modules complete!
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  {
    title: 'A-Level Economics - All UK Exam Boards',
    subject: 'Economics',
    yearGroups: ['Year 12', 'Year 13'],
    description: 'Complete A-Level Economics for all UK boards: AQA 7136, Edexcel A 9EC0, OCR H460, WJEC. Master microeconomics, macroeconomics, UK economy contexts, data analysis, and essay evaluation with board-specific case studies.',
    thumbnail: '',
    difficulty: 'advanced',
    duration: 48, // weeks
    moduleCount: 16,
    estimatedHours: 160,
    objectives: [
      'Master all UK exam board specifications (AQA, Edexcel A, OCR, WJEC)',
      'Understand microeconomic theory (demand, supply, markets)',
      'Apply macroeconomic concepts (GDP, inflation, unemployment)',
      'Analyze market failures and government intervention',
      'Evaluate UK and global economic policies',
      'Use diagrams effectively (supply/demand, AS/AD, Phillips curve)',
      'Develop data analysis and interpretation skills',
      'Write evaluative essays with real-world examples'
    ],
    topics: [
      // Microeconomics (Theme 1)
      'Introduction to Economics',
      'Price Determination (supply and demand)',
      'Price Elasticity (PED, YED, XED)',
      'Market Structures (perfect competition, monopoly, oligopoly)',
      'Market Failure (externalities, public goods, information gaps)',
      'Government Intervention (taxes, subsidies, regulation)',
      'Labour Markets (wage determination, trade unions)',
      // Macroeconomics (Theme 2)
      'National Economy (GDP, circular flow)',
      'Economic Growth and Development',
      'Unemployment (types, causes, natural rate)',
      'Inflation (CPI, RPI, causes, effects)',
      'Balance of Payments',
      'Monetary Policy (interest rates, quantitative easing)',
      'Fiscal Policy (taxation, government spending)',
      'Supply-Side Policies',
      'Exchange Rates (floating, fixed, effects)',
      'International Trade (comparative advantage, protectionism)',
      // Board-specific
      'AQA: UK economy contexts and data',
      'AQA: Individuals, firms, markets & Themes 1-4',
      'Edexcel A: Theme 3 (Business behaviour) & Theme 4 (Global perspective)',
      'Edexcel: Synoptic investigations',
      'OCR: UK economic performance',
      'OCR: Global economy',
      'WJEC: Welsh and UK economic contexts',
      // Skills
      'Economic diagrams and analysis',
      'Data interpretation (extracts, charts)',
      'Evaluation and critical thinking',
      'Essay writing (25-mark questions)',
      'Case study analysis',
      'Current affairs application',
      'Past papers - all boards'
    ],
    tags: ['A-Level', 'Economics', 'AQA', 'Edexcel', 'OCR', 'WJEC', 'Macro', 'Micro'],
    featured: true,
    rating: 0,
    published: true, // Content modules complete!
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  // ==================== ENGLISH & LANGUAGES ====================
  {
    title: 'A-Level English Literature',
    subject: 'English',
    yearGroups: ['Year 12', 'Year 13'],
    description: 'A-Level English Literature covering poetry, prose, drama, and critical analysis across different literary periods.',
    thumbnail: '',
    difficulty: 'advanced',
    duration: 48, // weeks
    moduleCount: 12,
    estimatedHours: 150,
    objectives: [
      'Analyze literary texts in depth',
      'Understand literary contexts and movements',
      'Write critical and analytical essays',
      'Compare texts and explore intertextuality',
      'Develop independent critical thinking',
      'Master A-Level English Literature exams'
    ],
    topics: [
      'Shakespeare Study',
      'Romantic Poetry',
      'Victorian Literature',
      'Modern Drama',
      'Comparative Analysis',
      'Critical Theory',
      'Tragedy',
      'Gothic Literature',
      'Post-Colonial Literature',
      'Feminist Criticism',
      'Essay Writing',
      'Exam Technique'
    ],
    tags: ['A-Level', 'English Literature', 'Poetry', 'Drama', 'Critical Analysis'],
    featured: false,
    rating: 0,
    published: true, // Content modules complete!
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  {
    title: 'A-Level Computer Science',
    subject: 'Computer Science',
    yearGroups: ['Year 12', 'Year 13'],
    description: 'Complete A-Level Computer Science covering programming, algorithms, data structures, and computer systems.',
    thumbnail: '',
    difficulty: 'advanced',
    duration: 48, // weeks
    moduleCount: 16,
    estimatedHours: 160,
    objectives: [
      'Master programming in Python/Java',
      'Understand algorithms and data structures',
      'Explore computer architecture and systems',
      'Learn about databases and networking',
      'Complete programming project successfully',
      'Excel in A-Level Computer Science exams'
    ],
    topics: [
      'Programming Fundamentals',
      'Data Types and Structures',
      'Algorithms',
      'Object-Oriented Programming',
      'Software Development',
      'Computer Systems',
      'Computer Architecture',
      'Databases',
      'Networks and Web',
      'Computational Thinking',
      'Boolean Algebra',
      'Regular Expressions',
      'Big O Notation',
      'Sorting and Searching',
      'NEA Project Guidance',
      'Exam Technique'
    ],
    tags: ['A-Level', 'Computer Science', 'Programming', 'Algorithms', 'Software'],
    featured: true,
    rating: 0,
    published: true, // Content modules complete!
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  {
    title: 'A-Level Business - All UK Exam Boards',
    subject: 'Business',
    yearGroups: ['Year 12', 'Year 13'],
    description: 'Complete A-Level Business for all UK boards: AQA 7132, Edexcel (Pearson) 9BS0, OCR H431, WJEC. Master marketing, finance, operations, HR, and strategy with real UK business case studies and comprehensive financial analysis.',
    thumbnail: '',
    difficulty: 'advanced',
    duration: 48, // weeks
    moduleCount: 16,
    estimatedHours: 160,
    objectives: [
      'Master all UK exam board specifications (AQA, Edexcel, OCR, WJEC)',
      'Analyze business performance using financial ratios',
      'Develop marketing strategies and understand consumer behavior',
      'Apply operations management and productivity concepts',
      'Understand HR practices and organizational structure',
      'Evaluate strategic decisions and business growth',
      'Complete case study analysis with real UK businesses',
      'Excel at data-response and essay-based questions'
    ],
    topics: [
      // Year 12 Content
      'Business Structure and Ownership',
      'Marketing (4Ps, segmentation, positioning)',
      'Market Research (primary, secondary, sampling)',
      'Financial Planning and Forecasting',
      'Cash Flow Management',
      'Break-Even Analysis',
      'Operations Management (productivity, quality)',
      'Human Resource Management (recruitment, motivation)',
      'Stakeholder Analysis',
      'Business Objectives and Strategy',
      // Year 13 Content
      'Strategic Decision Making',
      'Financial Ratios (profitability, liquidity, gearing)',
      'Investment Appraisal (ARR, NPV, payback)',
      'Business Growth (organic, inorganic, franchising)',
      'Globalisation and International Markets',
      'Change Management',
      'Corporate Culture and Structure',
      'Leadership and Management Styles',
      'Business Ethics and CSR',
      // Board-specific
      'AQA: Themes 1-4 (marketing, management, strategy, global)',
      'AQA: Pre-release case study preparation',
      'Edexcel: Theme 1 (marketing and people)',
      'Edexcel: Theme 2 (managing business activities)',
      'Edexcel: Theme 3 (business decisions and strategy)',
      'Edexcel: Theme 4 (global business)',
      'OCR: Component 1-3 coverage',
      'WJEC: Welsh business contexts',
      // Skills
      'Financial calculations and analysis',
      'Case study analysis (20-mark questions)',
      'Evaluation and justification',
      'Data interpretation',
      'Real UK business examples',
      'Past papers - all boards'
    ],
    tags: ['A-Level', 'Business', 'AQA', 'Edexcel', 'OCR', 'WJEC', 'Finance', 'Marketing'],
    featured: true,
    rating: 0,
    published: true, // Content modules complete!
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  // ==================== GCSE COURSES ====================
  {
    title: 'GCSE Mathematics (Foundation) - All UK Boards',
    subject: 'Mathematics',
    yearGroups: ['Year 10', 'Year 11'],
    description: 'Exam-focused GCSE Maths Foundation revision guide for all UK boards: AQA 8300, Edexcel 1MA1, OCR J560, WJEC. 400+ practice questions by topic, calculator & non-calculator methods, grade 5 strategies, full mock papers, and examiner tips. Designed to secure grades 4-5.',
    thumbnail: '',
    difficulty: 'intermediate',
    duration: 36, // weeks
    moduleCount: 15,
    estimatedHours: 120,
    objectives: [
      'Master foundation tier content for all UK exam boards',
      'Develop number skills (fractions, decimals, percentages)',
      'Understand basic algebra and equations',
      'Apply ratio, proportion, and rates of change',
      'Explore geometry and measures',
      'Analyze probability and statistics',
      'Build exam confidence for grades 1-5',
      'Use calculators and non-calculator methods effectively'
    ],
    topics: [
      'Number (integers, BIDMAS, FDP)',
      'Fractions, Decimals, Percentages',
      'Ratio and Proportion',
      'Algebra Basics (expressions, equations)',
      'Solving Linear Equations',
      'Sequences (arithmetic)',
      'Graphs (straight lines, quadratics)',
      'Geometry (angles, shapes, area, perimeter)',
      'Pythagoras and Trigonometry (basic)',
      'Transformations',
      'Probability (basic, tree diagrams)',
      'Statistics (averages, charts, graphs)',
      'Calculator and non-calculator skills',
      'Problem-solving strategies',
      'Past papers - all boards'
    ],
    tags: ['GCSE', 'Mathematics', 'Foundation', 'AQA', 'Edexcel', 'OCR', 'WJEC'],
    featured: false,
    rating: 0,
    published: true, // Content modules complete!
    chapters: [],
    createdBy: 'Gen Elevate Team'
  },

  {
    title: 'GCSE Mathematics (Higher) - All UK Boards',
    subject: 'Mathematics',
    yearGroups: ['Year 10', 'Year 11'],
    description: 'Exam-focused GCSE Maths Higher revision guide for all UK boards: AQA 8300, Edexcel 1MA1, OCR J560, WJEC. 600+ questions including grade 9 challenges, circle theorem practice, proof walkthrough, full mock sets, and examiner insights. Strategic revision for grades 7-9.',
    thumbnail: '',
    difficulty: 'intermediate',
    duration: 36, // weeks
    moduleCount: 18,
    estimatedHours: 150,
    objectives: [
      'Master higher tier content for all UK exam boards',
      'Work with surds, indices, and standard form',
      'Solve complex algebraic problems',
      'Apply advanced geometry (circle theorems, vectors)',
      'Understand functions, graphs, and transformations',
      'Master trigonometry and Pythagoras in complex contexts',
      'Develop advanced problem-solving skills',
      'Aim for grades 7-9 with exam strategies'
    ],
    topics: [
      'Surds and Indices',
      'Standard Form',
      'Advanced Algebra (factorisation, quadratics)',
      'Simultaneous Equations',
      'Inequalities',
      'Sequences (quadratic, geometric)',
      'Graphs (quadratic, cubic, reciprocal)',
      'Circle Theorems',
      'Vectors',
      'Advanced Trigonometry (sine rule, cosine rule)',
      'Pythagoras in 3D',
      'Similarity and Congruence',
      'Probability (Venn diagrams, conditional)',
      'Statistics (cumulative frequency, box plots)',
      'Functions and Transformations',
      'Bounds and Error Intervals',
      'Problem-solving and proof',
      'Past papers - all boards'
    ],
    tags: ['GCSE', 'Mathematics', 'Higher', 'AQA', 'Edexcel', 'OCR', 'WJEC', 'Grade 9'],
    featured: true,
    rating: 0,
    published: true, // Content modules complete!
    chapters: [],
    createdBy: 'Gen Elevate Team'
  }
];

