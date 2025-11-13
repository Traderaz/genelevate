import type { CareerDetail } from '@/types/career';

/**
 * Comprehensive UK Careers Database
 * Data sourced from:
 * - UK Office for National Statistics
 * - National Careers Service
 * - Indeed UK
 * - Glassdoor UK
 * - UK Government Career Advisers
 */

export const careersSeedData: Omit<CareerDetail, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // TECHNOLOGY SECTOR
  {
    title: 'Software Engineer',
    sector: 'Technology',
    description: 'Design, develop, and maintain software applications and systems using modern programming languages and frameworks',
    salaryRange: '£30K - £80K',
    growthRate: '+15%',
    education: 'Bachelor\'s Degree',
    location: 'UK-wide, Remote options',
    skills: ['JavaScript', 'Python', 'Java', 'Problem Solving', 'Git', 'Agile', 'SQL'],
    trending: true,
    demandLevel: 'high',
    overview: 'Software engineers are the architects of the digital world. They design, develop, test, and maintain software applications that power everything from mobile apps to enterprise systems. This role combines creativity with technical expertise, requiring both analytical thinking and collaborative skills.',
    responsibilities: [
      'Design and develop software applications using modern programming languages',
      'Write clean, maintainable, and efficient code following best practices',
      'Collaborate with cross-functional teams to define and implement new features',
      'Debug and resolve technical issues in existing systems',
      'Participate in code reviews and contribute to team knowledge sharing',
      'Stay updated with emerging technologies and industry trends',
      'Document technical specifications and system architecture',
      'Conduct unit testing and ensure code quality'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science, Software Engineering, or related field',
      'Strong programming skills in one or more languages (Java, Python, JavaScript, C++)',
      'Understanding of data structures, algorithms, and software design patterns',
      'Experience with version control systems (Git, GitHub, GitLab)',
      'Knowledge of web technologies and frameworks',
      'Problem-solving mindset and attention to detail',
      'Good communication and teamwork skills',
      'Willingness to learn and adapt to new technologies'
    ],
    careerPath: [
      { level: 'Entry Level', title: 'Junior Software Engineer', years: '0-2 years', salary: '£25K - £35K' },
      { level: 'Mid Level', title: 'Software Engineer', years: '2-5 years', salary: '£35K - £55K' },
      { level: 'Senior Level', title: 'Senior Software Engineer', years: '5-8 years', salary: '£55K - £80K' },
      { level: 'Lead', title: 'Lead Engineer / Tech Lead', years: '8-12 years', salary: '£80K - £110K' },
      { level: 'Management', title: 'Engineering Manager / Architect', years: '12+ years', salary: '£100K - £150K+' }
    ],
    relatedCourses: [
      { id: 'cs-intro', title: 'Introduction to Computer Science', subject: 'Computer Science', level: 'A-Level' },
      { id: 'prog-fund', title: 'Programming Fundamentals', subject: 'Technology', level: 'GCSE' }
    ],
    industryInsights: {
      jobOpenings: '15,000+',
      averageSalary: '£52,000',
      topEmployers: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Spotify', 'Revolut', 'Monzo'],
      futureOutlook: 'The demand for software engineers is expected to grow by 22% over the next decade, much faster than average. Emerging technologies like AI, cloud computing, and IoT are creating new opportunities.',
      jobSatisfaction: '85%',
      workLifeBalance: 'Good'
    },
    typicalDay: 'Start with team stand-up, review code from colleagues, develop new features, debug issues, attend planning meetings, collaborate with designers and product managers, and contribute to technical documentation.',
    workEnvironment: 'Primarily office-based or remote, with flexible working hours. Modern tech companies often provide collaborative workspaces, recreational facilities, and comprehensive benefits.',
    furtherReading: [
      { title: 'National Careers Service - Software Developer', url: 'https://nationalcareers.service.gov.uk/job-profiles/software-developer' },
      { title: 'BCS - The Chartered Institute for IT', url: 'https://www.bcs.org/' }
    ]
  },
  
  {
    title: 'Data Scientist',
    sector: 'Technology',
    description: 'Analyze complex data sets to help organizations make data-driven decisions using statistical analysis and machine learning',
    salaryRange: '£35K - £90K',
    growthRate: '+22%',
    education: 'Master\'s Degree (preferred)',
    location: 'London, Manchester, Edinburgh',
    skills: ['Python', 'R', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization', 'TensorFlow'],
    trending: true,
    demandLevel: 'high',
    overview: 'Data scientists extract insights from vast amounts of structured and unstructured data. They use advanced analytics, statistical modeling, and machine learning to solve complex business problems and drive strategic decision-making.',
    responsibilities: [
      'Collect, clean, and process large datasets from various sources',
      'Develop predictive models and machine learning algorithms',
      'Perform statistical analysis to identify trends and patterns',
      'Create data visualizations and dashboards for stakeholders',
      'Collaborate with business teams to understand requirements',
      'Present findings and recommendations to non-technical audiences',
      'Deploy and monitor models in production environments'
    ],
    requirements: [
      'Master\'s degree in Data Science, Statistics, Mathematics, or related field',
      'Strong programming skills in Python or R',
      'Expertise in statistical analysis and hypothesis testing',
      'Experience with machine learning libraries (scikit-learn, TensorFlow, PyTorch)',
      'Proficiency in SQL and database management',
      'Data visualization skills (Tableau, Power BI, matplotlib)',
      'Strong analytical and problem-solving abilities'
    ],
    careerPath: [
      { level: 'Entry Level', title: 'Junior Data Analyst', years: '0-2 years', salary: '£28K - £40K' },
      { level: 'Mid Level', title: 'Data Scientist', years: '2-5 years', salary: '£45K - £70K' },
      { level: 'Senior Level', title: 'Senior Data Scientist', years: '5-8 years', salary: '£70K - £95K' },
      { level: 'Lead', title: 'Lead Data Scientist', years: '8-12 years', salary: '£90K - £120K' },
      { level: 'Management', title: 'Head of Data Science', years: '12+ years', salary: '£110K - £160K+' }
    ],
    relatedCourses: [
      { id: 'stats', title: 'Statistics', subject: 'Mathematics', level: 'A-Level' },
      { id: 'comp-sci', title: 'Computer Science', subject: 'Computer Science', level: 'A-Level' }
    ],
    industryInsights: {
      jobOpenings: '8,500+',
      averageSalary: '£62,000',
      topEmployers: ['DeepMind', 'Amazon', 'Sky', 'HSBC', 'BP', 'GSK', 'Ocado', 'BBC'],
      futureOutlook: 'Data science is one of the fastest-growing fields in the UK. The increasing importance of data-driven decision-making ensures strong demand for skilled professionals.',
      jobSatisfaction: '88%',
      workLifeBalance: 'Good'
    },
    typicalDay: 'Morning: data exploration and cleaning. Midday: building and testing models. Afternoon: creating visualizations and presenting insights to stakeholders. Evening: reading research papers and staying current with new techniques.',
    workEnvironment: 'Office or remote work with flexible hours. Collaborative environment with regular meetings with business teams. Access to powerful computing resources and modern data tools.',
    furtherReading: [
      { title: 'Royal Statistical Society', url: 'https://rss.org.uk/' },
      { title: 'The Alan Turing Institute', url: 'https://www.turing.ac.uk/' }
    ]
  },

  {
    title: 'Cybersecurity Analyst',
    sector: 'Technology',
    description: 'Protect organizations from cyber threats by monitoring systems, identifying vulnerabilities, and implementing security measures',
    salaryRange: '£35K - £85K',
    growthRate: '+20%',
    education: 'Bachelor\'s Degree',
    location: 'UK-wide',
    skills: ['Network Security', 'Ethical Hacking', 'Risk Assessment', 'Firewall Management', 'SIEM', 'ISO 27001'],
    trending: true,
    demandLevel: 'high',
    overview: 'Cybersecurity analysts are the guardians of digital assets. They protect organizations from cyber attacks, data breaches, and security threats by implementing robust security measures and monitoring systems 24/7.',
    responsibilities: [
      'Monitor networks and systems for security breaches or intrusions',
      'Conduct vulnerability assessments and penetration testing',
      'Implement and maintain security tools and technologies',
      'Respond to security incidents and conduct forensic analysis',
      'Develop and enforce security policies and procedures',
      'Stay updated on latest cyber threats and attack vectors',
      'Train employees on security best practices',
      'Prepare security reports and compliance documentation'
    ],
    requirements: [
      'Bachelor\'s degree in Cybersecurity, Computer Science, or related field',
      'Strong understanding of network protocols and security architectures',
      'Experience with security tools (SIEM, IDS/IPS, firewalls)',
      'Knowledge of common attack vectors and defense strategies',
      'Certifications like CompTIA Security+, CEH, or CISSP (preferred)',
      'Analytical thinking and attention to detail',
      'Ability to work under pressure during security incidents'
    ],
    careerPath: [
      { level: 'Entry Level', title: 'Security Analyst', years: '0-2 years', salary: '£28K - £40K' },
      { level: 'Mid Level', title: 'Cybersecurity Analyst', years: '2-5 years', salary: '£40K - £60K' },
      { level: 'Senior Level', title: 'Senior Security Analyst', years: '5-8 years', salary: '£60K - £85K' },
      { level: 'Specialist', title: 'Security Architect', years: '8-12 years', salary: '£80K - £110K' },
      { level: 'Management', title: 'Chief Information Security Officer', years: '12+ years', salary: '£100K - £150K+' }
    ],
    relatedCourses: [
      { id: 'comp-net', title: 'Computer Networks', subject: 'Computer Science', level: 'A-Level' },
      { id: 'it-sec', title: 'IT Security', subject: 'Technology', level: 'BTEC' }
    ],
    industryInsights: {
      jobOpenings: '12,000+',
      averageSalary: '£58,000',
      topEmployers: ['GCHQ', 'National Cyber Security Centre', 'BAE Systems', 'PwC', 'Deloitte', 'BT', 'NCC Group'],
      futureOutlook: 'With cyber threats increasing exponentially, demand for cybersecurity professionals is at an all-time high. The UK government has made cybersecurity a national priority.',
      jobSatisfaction: '82%',
      workLifeBalance: 'Moderate (on-call responsibilities)'
    },
    typicalDay: 'Monitor security alerts and logs, investigate suspicious activities, patch vulnerabilities, conduct security assessments, document incidents, and collaborate with IT teams on security improvements.',
    workEnvironment: 'Office-based or remote with some on-call duties. Security Operations Centers (SOC) may require shift work. Fast-paced environment with critical incident response.',
    furtherReading: [
      { title: 'National Cyber Security Centre', url: 'https://www.ncsc.gov.uk/' },
      { title: 'CREST - Council of Registered Ethical Security Testers', url: 'https://www.crest-approved.org/' }
    ]
  },

  // HEALTHCARE SECTOR
  {
    title: 'Registered Nurse',
    sector: 'Healthcare',
    description: 'Provide direct patient care, administer medications, and support doctors in diagnosing and treating patients',
    salaryRange: '£28K - £45K',
    growthRate: '+8%',
    education: 'Bachelor\'s Degree (Nursing)',
    location: 'UK-wide',
    skills: ['Patient Care', 'Clinical Skills', 'Communication', 'Empathy', 'Time Management', 'Critical Thinking'],
    trending: false,
    demandLevel: 'high',
    overview: 'Registered nurses are essential healthcare professionals who provide compassionate, evidence-based care to patients. They work in various settings including hospitals, clinics, care homes, and community health services.',
    responsibilities: [
      'Assess patients\' health conditions and monitor vital signs',
      'Administer medications and treatments as prescribed',
      'Maintain accurate patient records and documentation',
      'Educate patients and families about health conditions and treatments',
      'Collaborate with doctors and other healthcare professionals',
      'Respond to medical emergencies and provide critical care',
      'Follow infection control protocols and maintain hygiene standards',
      'Support patients\' emotional and psychological wellbeing'
    ],
    requirements: [
      'Bachelor\'s degree in Nursing (or equivalent Nursing Diploma)',
      'Registration with the Nursing and Midwifery Council (NMC)',
      'DBS (Disclosure and Barring Service) check',
      'Strong clinical and practical nursing skills',
      'Excellent communication and interpersonal skills',
      'Ability to work under pressure in fast-paced environments',
      'Compassion, empathy, and patient-focused mindset',
      'Physical stamina for long shifts and patient handling'
    ],
    careerPath: [
      { level: 'Entry Level', title: 'Staff Nurse (Band 5)', years: '0-2 years', salary: '£28K - £34K' },
      { level: 'Mid Level', title: 'Senior Staff Nurse (Band 6)', years: '2-5 years', salary: '£34K - £42K' },
      { level: 'Senior Level', title: 'Ward Manager/Sister (Band 7)', years: '5-10 years', salary: '£42K - £50K' },
      { level: 'Specialist', title: 'Clinical Nurse Specialist', years: '10-15 years', salary: '£45K - £55K' },
      { level: 'Management', title: 'Matron/Director of Nursing', years: '15+ years', salary: '£50K - £70K+' }
    ],
    relatedCourses: [
      { id: 'biology', title: 'Biology', subject: 'Science', level: 'A-Level' },
      { id: 'health-social', title: 'Health and Social Care', subject: 'Healthcare', level: 'BTEC' }
    ],
    industryInsights: {
      jobOpenings: '45,000+',
      averageSalary: '£35,000',
      topEmployers: ['NHS Trusts across UK', 'Bupa', 'Nuffield Health', 'Care UK', 'HCA Healthcare'],
      futureOutlook: 'The NHS faces ongoing nursing shortages, creating strong demand. An aging population and increasing healthcare needs ensure long-term job security.',
      jobSatisfaction: '78%',
      workLifeBalance: 'Moderate (shift work required)'
    },
    typicalDay: 'Handover from previous shift, assess patient conditions, administer medications, assist with procedures, update patient records, communicate with families, respond to emergencies, and complete shift documentation.',
    workEnvironment: 'Hospital wards, clinics, or community settings. 12-hour shifts common, including nights, weekends, and holidays. Fast-paced, physically and emotionally demanding but rewarding.',
    furtherReading: [
      { title: 'Nursing and Midwifery Council', url: 'https://www.nmc.org.uk/' },
      { title: 'Royal College of Nursing', url: 'https://www.rcn.org.uk/' }
    ]
  },

  {
    title: 'Physiotherapist',
    sector: 'Healthcare',
    description: 'Help patients restore movement and function through exercise, manual therapy, and rehabilitation programs',
    salaryRange: '£28K - £55K',
    growthRate: '+10%',
    education: 'Bachelor\'s Degree (Physiotherapy)',
    location: 'UK-wide',
    skills: ['Manual Therapy', 'Exercise Prescription', 'Patient Assessment', 'Communication', 'Anatomy Knowledge'],
    trending: false,
    demandLevel: 'high',
    overview: 'Physiotherapists are movement specialists who help people recover from injuries, manage chronic conditions, and improve their quality of life through evidence-based physical interventions.',
    responsibilities: [
      'Assess patients\' physical conditions and mobility issues',
      'Develop personalized treatment plans and rehabilitation programs',
      'Perform manual therapy techniques and therapeutic exercises',
      'Use specialist equipment for treatment (ultrasound, electrical stimulation)',
      'Monitor patient progress and adjust treatments accordingly',
      'Educate patients on injury prevention and self-management',
      'Work with multidisciplinary teams in patient care',
      'Maintain detailed patient records and treatment notes'
    ],
    requirements: [
      'Bachelor\'s or Master\'s degree in Physiotherapy (HCPC approved)',
      'Registration with Health and Care Professions Council (HCPC)',
      'Strong knowledge of human anatomy, physiology, and biomechanics',
      'Excellent manual therapy and exercise prescription skills',
      'Strong interpersonal and communication abilities',
      'Problem-solving and analytical thinking',
      'Physical stamina for hands-on work',
      'Empathy and patient-centered approach'
    ],
    careerPath: [
      { level: 'Entry Level', title: 'Junior Physiotherapist (Band 5)', years: '0-2 years', salary: '£28K - £35K' },
      { level: 'Mid Level', title: 'Physiotherapist (Band 6)', years: '2-5 years', salary: '£35K - £43K' },
      { level: 'Senior Level', title: 'Senior Physiotherapist (Band 7)', years: '5-8 years', salary: '£43K - £50K' },
      { level: 'Specialist', title: 'Specialist Physiotherapist (Band 8a)', years: '8-12 years', salary: '£50K - £60K' },
      { level: 'Management', title: 'Lead Physiotherapist/Clinical Manager', years: '12+ years', salary: '£55K - £75K+' }
    ],
    relatedCourses: [
      { id: 'biology-al', title: 'Biology', subject: 'Science', level: 'A-Level' },
      { id: 'pe', title: 'Physical Education', subject: 'PE', level: 'A-Level' }
    ],
    industryInsights: {
      jobOpenings: '8,000+',
      averageSalary: '£38,000',
      topEmployers: ['NHS Trusts', 'Bupa', 'Nuffield Health', 'The Physiotherapy Centre', 'Six Physio'],
      futureOutlook: 'Growing elderly population and increased focus on preventative care drive demand. Sports physiotherapy and private practice offer additional opportunities.',
      jobSatisfaction: '85%',
      workLifeBalance: 'Good'
    },
    typicalDay: 'Review patient notes, conduct assessments, perform treatment sessions (manual therapy, exercise therapy), document progress, educate patients, collaborate with other healthcare professionals.',
    workEnvironment: 'Hospitals, clinics, sports centers, or private practice. May involve travel for home visits or sports teams. Generally standard hours with some evening/weekend work in private practice.',
    furtherReading: [
      { title: 'Chartered Society of Physiotherapy', url: 'https://www.csp.org.uk/' },
      { title: 'Health and Care Professions Council', url: 'https://www.hcpc-uk.org/' }
    ]
  },

  // EDUCATION SECTOR
  {
    title: 'Secondary School Teacher',
    sector: 'Education',
    description: 'Teach subject-specific curriculum to students aged 11-18, inspire learning, and support academic development',
    salaryRange: '£30K - £50K',
    growthRate: '+5%',
    education: 'Bachelor\'s Degree + PGCE',
    location: 'UK-wide',
    skills: ['Subject Expertise', 'Classroom Management', 'Communication', 'Patience', 'Creativity', 'Assessment'],
    trending: false,
    demandLevel: 'high',
    overview: 'Secondary school teachers play a vital role in shaping young minds during critical developmental years. They deliver engaging lessons, assess student progress, and support students\' academic and personal growth.',
    responsibilities: [
      'Plan and deliver engaging lessons following the National Curriculum',
      'Assess and mark student work, providing constructive feedback',
      'Manage classroom behavior and create a positive learning environment',
      'Differentiate teaching to meet diverse student needs',
      'Track student progress and report to parents/guardians',
      'Support students\' pastoral care and wellbeing',
      'Participate in department meetings and school activities',
      'Maintain professional development and stay current with educational research'
    ],
    requirements: [
      'Bachelor\'s degree in relevant subject area',
      'Postgraduate Certificate in Education (PGCE) or equivalent (QTS)',
      'DBS (Disclosure and Barring Service) check',
      'Strong subject knowledge and passion for teaching',
      'Excellent communication and interpersonal skills',
      'Patience, creativity, and adaptability',
      'Classroom management abilities',
      'Commitment to safeguarding and student welfare'
    ],
    careerPath: [
      { level: 'Entry Level', title: 'Newly Qualified Teacher (NQT)', years: '0-1 year', salary: '£30K - £32K' },
      { level: 'Mid Level', title: 'Main Scale Teacher', years: '1-5 years', salary: '£32K - £38K' },
      { level: 'Upper Pay', title: 'Upper Pay Scale Teacher', years: '5-10 years', salary: '£38K - £43K' },
      { level: 'Leadership', title: 'Head of Department', years: '10-15 years', salary: '£43K - £55K' },
      { level: 'Senior Leadership', title: 'Assistant/Deputy Head', years: '15+ years', salary: '£50K - £75K+' }
    ],
    relatedCourses: [
      { id: 'subject-spec', title: 'Subject-Specific A-Levels', subject: 'Various', level: 'A-Level' },
      { id: 'education', title: 'Education Studies', subject: 'Education', level: 'Degree' }
    ],
    industryInsights: {
      jobOpenings: '20,000+',
      averageSalary: '£38,000',
      topEmployers: ['State Secondary Schools', 'Academy Trusts', 'Independent Schools', 'Free Schools'],
      futureOutlook: 'Teacher shortages in key subjects (Maths, Science, Languages) create strong demand. Education reforms and increasing student numbers ensure continued opportunities.',
      jobSatisfaction: '72%',
      workLifeBalance: 'Moderate (term-time holidays but evening/weekend work)'
    },
    typicalDay: 'Teach 4-5 lessons across different year groups, mark assignments during free periods, meet with students needing support, attend department meetings, prepare lessons for the next day.',
    workEnvironment: 'School classrooms with access to resources and technology. Term-time work with generous holidays. Can be demanding with marking, planning, and extracurricular duties.',
    furtherReading: [
      { title: 'Department for Education - Get Into Teaching', url: 'https://getintoteaching.education.gov.uk/' },
      { title: 'National Education Union', url: 'https://neu.org.uk/' }
    ]
  },

  // ENGINEERING SECTOR
  {
    title: 'Civil Engineer',
    sector: 'Engineering',
    description: 'Design, plan, and oversee construction projects including roads, bridges, buildings, and infrastructure',
    salaryRange: '£28K - £65K',
    growthRate: '+12%',
    education: 'Bachelor\'s Degree (Engineering)',
    location: 'UK-wide',
    skills: ['AutoCAD', 'Project Management', 'Structural Analysis', 'Problem Solving', 'Technical Drawing'],
    trending: false,
    demandLevel: 'high',
    overview: 'Civil engineers are responsible for designing and managing infrastructure projects that shape our physical environment. They work on everything from transportation networks to water systems and buildings.',
    responsibilities: [
      'Design infrastructure projects using CAD software and engineering principles',
      'Conduct site surveys and feasibility studies',
      'Prepare technical reports and project specifications',
      'Manage project budgets, timelines, and resources',
      'Ensure compliance with building regulations and safety standards',
      'Liaise with clients, contractors, and stakeholders',
      'Monitor construction progress and quality control',
      'Solve technical problems and adapt designs as needed'
    ],
    requirements: [
      'Bachelor\'s degree in Civil Engineering or related field',
      'Chartered Engineer (CEng) status with ICE (desirable)',
      'Proficiency in engineering software (AutoCAD, Civil 3D)',
      'Strong mathematical and analytical skills',
      'Project management capabilities',
      'Understanding of building regulations and codes',
      'Excellent communication and teamwork abilities',
      'Problem-solving and attention to detail'
    ],
    careerPath: [
      { level: 'Entry Level', title: 'Graduate Civil Engineer', years: '0-2 years', salary: '£25K - £32K' },
      { level: 'Mid Level', title: 'Civil Engineer', years: '2-5 years', salary: '£32K - £45K' },
      { level: 'Senior Level', title: 'Senior Civil Engineer', years: '5-10 years', salary: '£45K - £60K' },
      { level: 'Chartered', title: 'Chartered Civil Engineer', years: '10-15 years', salary: '£55K - £75K' },
      { level: 'Management', title: 'Principal Engineer/Director', years: '15+ years', salary: '£70K - £100K+' }
    ],
    relatedCourses: [
      { id: 'maths-al', title: 'Mathematics', subject: 'Mathematics', level: 'A-Level' },
      { id: 'physics-al', title: 'Physics', subject: 'Science', level: 'A-Level' }
    ],
    industryInsights: {
      jobOpenings: '10,000+',
      averageSalary: '£45,000',
      topEmployers: ['Arup', 'Mott MacDonald', 'Balfour Beatty', 'Atkins', 'Jacobs', 'Costain', 'Network Rail'],
      futureOutlook: 'UK\'s infrastructure investment and HS2 project create strong demand. Sustainability and green infrastructure offer emerging opportunities.',
      jobSatisfaction: '80%',
      workLifeBalance: 'Good'
    },
    typicalDay: 'Review project plans, use CAD software for designs, attend site meetings, liaise with contractors, review technical calculations, prepare reports, and coordinate with project teams.',
    workEnvironment: 'Mix of office work and site visits. Some projects may require travel or temporary relocation. Professional dress code and collaborative team environment.',
    furtherReading: [
      { title: 'Institution of Civil Engineers', url: 'https://www.ice.org.uk/' },
      { title: 'Engineering Council UK', url: 'https://www.engc.org.uk/' }
    ]
  },

  {
    title: 'Electrical Engineer',
    sector: 'Engineering',
    description: 'Design, develop, and maintain electrical systems and equipment for various applications',
    salaryRange: '£30K - £70K',
    growthRate: '+14%',
    education: 'Bachelor\'s Degree (Engineering)',
    location: 'UK-wide',
    skills: ['Circuit Design', 'PLC Programming', 'Electrical CAD', 'Problem Solving', 'Testing & Commissioning'],
    trending: true,
    demandLevel: 'high',
    overview: 'Electrical engineers work on a wide range of systems from power generation and distribution to electronics and control systems. They play crucial roles in energy, manufacturing, and technology sectors.',
    responsibilities: [
      'Design electrical systems and components using CAD software',
      'Develop specifications and technical documentation',
      'Test and commission electrical installations',
      'Troubleshoot electrical faults and implement solutions',
      'Ensure compliance with electrical regulations (BS 7671, IEC)',
      'Program PLCs and control systems',
      'Conduct risk assessments and safety checks',
      'Collaborate with other engineers and project stakeholders'
    ],
    requirements: [
      'Bachelor\'s degree in Electrical Engineering or related field',
      'Chartered Engineer (CEng) status with IET (desirable)',
      'Strong understanding of electrical theory and systems',
      'Proficiency in electrical design software (EPLAN, AutoCAD Electrical)',
      'Knowledge of relevant standards and regulations',
      'Problem-solving and analytical skills',
      'Attention to detail and safety-conscious mindset',
      'Good communication and project management abilities'
    ],
    careerPath: [
      { level: 'Entry Level', title: 'Graduate Electrical Engineer', years: '0-2 years', salary: '£26K - £34K' },
      { level: 'Mid Level', title: 'Electrical Engineer', years: '2-5 years', salary: '£34K - £48K' },
      { level: 'Senior Level', title: 'Senior Electrical Engineer', years: '5-10 years', salary: '£48K - £65K' },
      { level: 'Chartered', title: 'Chartered Electrical Engineer', years: '10-15 years', salary: '£60K - £80K' },
      { level: 'Management', title: 'Principal Engineer/Engineering Manager', years: '15+ years', salary: '£75K - £110K+' }
    ],
    relatedCourses: [
      { id: 'physics', title: 'Physics', subject: 'Science', level: 'A-Level' },
      { id: 'maths', title: 'Mathematics', subject: 'Mathematics', level: 'A-Level' }
    ],
    industryInsights: {
      jobOpenings: '12,000+',
      averageSalary: '£48,000',
      topEmployers: ['Rolls-Royce', 'National Grid', 'Siemens', 'ABB', 'BAE Systems', 'EDF Energy', 'Schneider Electric'],
      futureOutlook: 'Renewable energy transition and electric vehicle infrastructure drive strong demand. Smart grid technology and automation create new opportunities.',
      jobSatisfaction: '83%',
      workLifeBalance: 'Good'
    },
    typicalDay: 'Review technical drawings, design electrical circuits, program control systems, conduct site inspections, test equipment, prepare reports, and attend project meetings.',
    workEnvironment: 'Mix of office design work and site visits to industrial, commercial, or residential projects. May require occasional travel and work in various conditions.',
    furtherReading: [
      { title: 'Institution of Engineering and Technology', url: 'https://www.theiet.org/' },
      { title: 'Engineering Council UK', url: 'https://www.engc.org.uk/' }
    ]
  },

  {
    title: 'Mechanical Engineer',
    sector: 'Engineering',
    description: 'Design, develop, and test mechanical systems, machines, and devices across various industries',
    salaryRange: '£28K - £68K',
    growthRate: '+11%',
    education: 'Bachelor\'s Degree (Engineering)',
    location: 'UK-wide',
    skills: ['CAD/CAM', 'Thermodynamics', '3D Modeling', 'FEA Analysis', 'Manufacturing Processes', 'Problem Solving'],
    trending: false,
    demandLevel: 'high',
    overview: 'Mechanical engineers apply principles of mechanics, thermodynamics, and materials science to design and manufacture mechanical systems. They work across diverse industries from automotive to aerospace.',
    responsibilities: [
      'Design mechanical components and systems using CAD software',
      'Perform stress analysis and finite element analysis (FEA)',
      'Create prototypes and conduct testing',
      'Develop technical specifications and documentation',
      'Optimize designs for performance, cost, and manufacturability',
      'Collaborate with manufacturing teams on production',
      'Troubleshoot mechanical issues and implement improvements',
      'Ensure compliance with industry standards and regulations'
    ],
    requirements: [
      'Bachelor\'s degree in Mechanical Engineering',
      'Chartered Engineer (CEng) status with IMechE (desirable)',
      'Proficiency in CAD software (SolidWorks, CATIA, AutoCAD)',
      'Understanding of manufacturing processes and materials',
      'Strong mathematical and analytical skills',
      'Knowledge of thermodynamics, fluid mechanics, and dynamics',
      'Problem-solving and innovation capabilities',
      'Project management and teamwork skills'
    ],
    careerPath: [
      { level: 'Entry Level', title: 'Graduate Mechanical Engineer', years: '0-2 years', salary: '£25K - £33K' },
      { level: 'Mid Level', title: 'Mechanical Engineer', years: '2-5 years', salary: '£33K - £46K' },
      { level: 'Senior Level', title: 'Senior Mechanical Engineer', years: '5-10 years', salary: '£46K - £62K' },
      { level: 'Chartered', title: 'Chartered Mechanical Engineer', years: '10-15 years', salary: '£58K - £75K' },
      { level: 'Management', title: 'Chief Engineer/Engineering Director', years: '15+ years', salary: '£70K - £105K+' }
    ],
    relatedCourses: [
      { id: 'physics-mech', title: 'Physics', subject: 'Science', level: 'A-Level' },
      { id: 'maths-mech', title: 'Mathematics (Mechanics)', subject: 'Mathematics', level: 'A-Level' }
    ],
    industryInsights: {
      jobOpenings: '11,500+',
      averageSalary: '£46,000',
      topEmployers: ['Rolls-Royce', 'Dyson', 'JCB', 'BAE Systems', 'Jaguar Land Rover', 'Airbus', 'McLaren'],
      futureOutlook: 'UK manufacturing renaissance and focus on sustainable technologies drive demand. Emerging fields like robotics and renewable energy offer growth opportunities.',
      jobSatisfaction: '81%',
      workLifeBalance: 'Good'
    },
    typicalDay: 'Use CAD software for design work, run simulations and analyses, review test results, attend design review meetings, collaborate with manufacturing teams, and document technical specifications.',
    workEnvironment: 'Primarily office-based with occasional visits to manufacturing facilities or test sites. Modern engineering environment with advanced software and tools.',
    furtherReading: [
      { title: 'Institution of Mechanical Engineers', url: 'https://www.imeche.org/' },
      { title: 'Engineering Council UK', url: 'https://www.engc.org.uk/' }
    ]
  },

  // FINANCE SECTOR
  {
    title: 'Accountant',
    sector: 'Finance',
    description: 'Manage financial records, prepare reports, ensure tax compliance, and provide financial advice to organizations',
    salaryRange: '£25K - £60K',
    growthRate: '+7%',
    education: 'Bachelor\'s Degree',
    location: 'UK-wide',
    skills: ['Financial Reporting', 'Tax Knowledge', 'Excel', 'Attention to Detail', 'IFRS', 'Sage/Xero'],
    trending: false,
    demandLevel: 'medium',
    overview: 'Accountants are financial professionals who help organizations maintain accurate financial records, comply with regulations, and make informed business decisions through financial analysis and reporting.',
    responsibilities: [
      'Prepare financial statements and management accounts',
      'Manage accounts payable and receivable',
      'Reconcile bank statements and financial records',
      'Prepare tax returns and ensure compliance with HMRC regulations',
      'Conduct financial audits and reviews',
      'Provide financial analysis and business advice',
      'Use accounting software to process transactions',
      'Liaise with clients, stakeholders, and regulatory bodies'
    ],
    requirements: [
      'Bachelor\'s degree in Accounting, Finance, or related field',
      'Professional qualification (ACA, ACCA, or CIMA) or working towards',
      'Strong knowledge of accounting principles and standards',
      'Proficiency in accounting software (Sage, Xero, QuickBooks)',
      'Advanced Excel skills',
      'Excellent numerical and analytical abilities',
      'Attention to detail and accuracy',
      'Good communication and client management skills'
    ],
    careerPath: [
      { level: 'Entry Level', title: 'Accounts Assistant/Junior Accountant', years: '0-2 years', salary: '£22K - £28K' },
      { level: 'Part-Qualified', title: 'Part-Qualified Accountant', years: '2-4 years', salary: '£28K - £38K' },
      { level: 'Qualified', title: 'Qualified Accountant', years: '4-7 years', salary: '£38K - £50K' },
      { level: 'Senior', title: 'Senior Accountant/Financial Controller', years: '7-12 years', salary: '£50K - £70K' },
      { level: 'Management', title: 'Finance Director/CFO', years: '12+ years', salary: '£70K - £120K+' }
    ],
    relatedCourses: [
      { id: 'maths-acc', title: 'Mathematics', subject: 'Mathematics', level: 'A-Level' },
      { id: 'business-acc', title: 'Business Studies', subject: 'Business', level: 'A-Level' }
    ],
    industryInsights: {
      jobOpenings: '25,000+',
      averageSalary: '£42,000',
      topEmployers: ['Deloitte', 'PwC', 'EY', 'KPMG', 'BDO', 'Grant Thornton', 'RSM UK'],
      futureOutlook: 'Accounting remains essential for all businesses. Automation is changing the role, with increased focus on advisory and strategic analysis rather than routine bookkeeping.',
      jobSatisfaction: '75%',
      workLifeBalance: 'Moderate (busy during year-end and tax season)'
    },
    typicalDay: 'Process invoices and payments, reconcile accounts, prepare financial reports, analyze variances, communicate with clients or internal teams, use accounting software, and work on month-end or year-end tasks.',
    workEnvironment: 'Office-based or remote work possible. Accounting firms or in-house finance departments. Can be busy during peak periods (year-end, tax deadlines).',
    furtherReading: [
      { title: 'Institute of Chartered Accountants in England and Wales', url: 'https://www.icaew.com/' },
      { title: 'Association of Chartered Certified Accountants', url: 'https://www.accaglobal.com/' }
    ]
  },

  {
    title: 'Financial Analyst',
    sector: 'Finance',
    description: 'Analyze financial data, create financial models, and provide insights to support investment and business decisions',
    salaryRange: '£32K - £75K',
    growthRate: '+10%',
    education: 'Bachelor\'s Degree',
    location: 'London, major UK cities',
    skills: ['Financial Modeling', 'Excel', 'Data Analysis', 'Valuation', 'Bloomberg Terminal', 'SQL'],
    trending: false,
    demandLevel: 'high',
    overview: 'Financial analysts evaluate investment opportunities, analyze market trends, and create financial forecasts to help organizations and individuals make informed financial decisions.',
    responsibilities: [
      'Build and maintain financial models and forecasts',
      'Analyze financial statements and performance metrics',
      'Conduct industry and market research',
      'Prepare investment recommendations and reports',
      'Monitor portfolio performance and market trends',
      'Present findings to senior management or clients',
      'Use financial software and databases (Bloomberg, FactSet)',
      'Assess risks and opportunities for investments'
    ],
    requirements: [
      'Bachelor\'s degree in Finance, Economics, or related field',
      'CFA (Chartered Financial Analyst) qualification (desirable)',
      'Advanced Excel and financial modeling skills',
      'Strong analytical and quantitative abilities',
      'Knowledge of accounting principles and financial statements',
      'Familiarity with financial software and databases',
      'Excellent communication and presentation skills',
      'Attention to detail and critical thinking'
    ],
    careerPath: [
      { level: 'Entry Level', title: 'Junior Financial Analyst', years: '0-2 years', salary: '£30K - £40K' },
      { level: 'Mid Level', title: 'Financial Analyst', years: '2-5 years', salary: '£40K - £60K' },
      { level: 'Senior Level', title: 'Senior Financial Analyst', years: '5-8 years', salary: '£60K - £80K' },
      { level: 'Management', title: 'Finance Manager', years: '8-12 years', salary: '£75K - £100K' },
      { level: 'Director', title: 'Director of Finance/VP', years: '12+ years', salary: '£95K - £150K+' }
    ],
    relatedCourses: [
      { id: 'maths-fa', title: 'Mathematics', subject: 'Mathematics', level: 'A-Level' },
      { id: 'econ-fa', title: 'Economics', subject: 'Economics', level: 'A-Level' }
    ],
    industryInsights: {
      jobOpenings: '9,000+',
      averageSalary: '£55,000',
      topEmployers: ['Goldman Sachs', 'JP Morgan', 'Morgan Stanley', 'BlackRock', 'Barclays', 'HSBC', 'Schroders'],
      futureOutlook: 'Strong demand in financial services, particularly in London. Growing need for data-driven financial analysis and ESG (Environmental, Social, Governance) expertise.',
      jobSatisfaction: '79%',
      workLifeBalance: 'Moderate to Challenging (long hours common in investment banking)'
    },
    typicalDay: 'Update financial models, analyze company earnings, research market trends, prepare reports, attend meetings with colleagues or clients, and stay informed on economic news.',
    workEnvironment: 'Office-based in financial districts (London, Edinburgh, Manchester). Fast-paced, results-oriented culture. May require long hours during busy periods.',
    furtherReading: [
      { title: 'CFA Institute', url: 'https://www.cfainstitute.org/' },
      { title: 'Financial Conduct Authority', url: 'https://www.fca.org.uk/' }
    ]
  },

  // MARKETING & CREATIVE
  {
    title: 'Digital Marketing Manager',
    sector: 'Marketing',
    description: 'Plan and execute digital marketing campaigns across various online channels to drive brand awareness and sales',
    salaryRange: '£30K - £60K',
    growthRate: '+13%',
    education: 'Bachelor\'s Degree',
    location: 'UK-wide, Remote options',
    skills: ['SEO', 'Google Ads', 'Social Media Marketing', 'Analytics', 'Content Strategy', 'Email Marketing'],
    trending: true,
    demandLevel: 'high',
    overview: 'Digital marketing managers develop and implement online marketing strategies to reach target audiences, increase brand visibility, and drive conversions through various digital channels.',
    responsibilities: [
      'Develop and execute digital marketing strategies and campaigns',
      'Manage SEO/SEM, email marketing, and social media campaigns',
      'Analyze campaign performance using Google Analytics and other tools',
      'Manage digital advertising budgets (Google Ads, Facebook Ads)',
      'Create and optimize content for various digital platforms',
      'Collaborate with design and content teams',
      'Stay updated with digital marketing trends and best practices',
      'Report on ROI and campaign effectiveness to stakeholders'
    ],
    requirements: [
      'Bachelor\'s degree in Marketing, Business, or related field',
      'Proven experience in digital marketing roles',
      'Strong knowledge of SEO, PPC, and social media marketing',
      'Proficiency in Google Analytics, Google Ads, and social media platforms',
      'Understanding of email marketing and automation tools',
      'Data analysis and reporting skills',
      'Creative thinking and problem-solving abilities',
      'Excellent communication and project management skills'
    ],
    careerPath: [
      { level: 'Entry Level', title: 'Digital Marketing Executive', years: '0-2 years', salary: '£24K - £32K' },
      { level: 'Mid Level', title: 'Digital Marketing Manager', years: '2-5 years', salary: '£35K - £50K' },
      { level: 'Senior Level', title: 'Senior Digital Marketing Manager', years: '5-8 years', salary: '£50K - £65K' },
      { level: 'Head', title: 'Head of Digital Marketing', years: '8-12 years', salary: '£65K - £85K' },
      { level: 'Director', title: 'Marketing Director/CMO', years: '12+ years', salary: '£80K - £120K+' }
    ],
    relatedCourses: [
      { id: 'business-mkt', title: 'Business Studies', subject: 'Business', level: 'A-Level' },
      { id: 'media-mkt', title: 'Media Studies', subject: 'Media', level: 'A-Level' }
    ],
    industryInsights: {
      jobOpenings: '18,000+',
      averageSalary: '£45,000',
      topEmployers: ['Google', 'Facebook (Meta)', 'Amazon', 'Unilever', 'WPP', 'Publicis', 'Ogilvy'],
      futureOutlook: 'Digital transformation across industries ensures strong demand. Growth in e-commerce, influencer marketing, and AI-driven marketing create new opportunities.',
      jobSatisfaction: '82%',
      workLifeBalance: 'Good'
    },
    typicalDay: 'Review campaign performance metrics, optimize ads and content, plan upcoming campaigns, collaborate with creative teams, analyze competitor strategies, and report to stakeholders.',
    workEnvironment: 'Office or remote work with flexible hours. Creative and fast-paced environment. Mix of strategic planning and hands-on campaign management.',
    furtherReading: [
      { title: 'Chartered Institute of Marketing', url: 'https://www.cim.co.uk/' },
      { title: 'Digital Marketing Institute', url: 'https://digitalmarketinginstitute.com/' }
    ]
  },

  {
    title: 'UX/UI Designer',
    sector: 'Design',
    description: 'Create user-centered designs for digital products, focusing on usability, aesthetics, and user experience',
    salaryRange: '£30K - £65K',
    growthRate: '+16%',
    education: 'Bachelor\'s Degree or Bootcamp',
    location: 'London, Manchester, Remote',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
    trending: true,
    demandLevel: 'high',
    overview: 'UX/UI designers bridge the gap between users and technology, creating intuitive and visually appealing digital experiences. They combine research, design thinking, and technical skills to solve user problems.',
    responsibilities: [
      'Conduct user research and usability testing',
      'Create user personas, journey maps, and user flows',
      'Design wireframes, mockups, and interactive prototypes',
      'Develop consistent design systems and style guides',
      'Collaborate with developers to implement designs',
      'Iterate designs based on user feedback and data',
      'Present design concepts to stakeholders',
      'Stay current with design trends and best practices'
    ],
    requirements: [
      'Bachelor\'s degree in Design, HCI, or related field (or equivalent experience)',
      'Strong portfolio demonstrating UX/UI design skills',
      'Proficiency in design tools (Figma, Sketch, Adobe XD)',
      'Understanding of user-centered design principles',
      'Knowledge of responsive and mobile design',
      'Basic understanding of HTML/CSS (helpful)',
      'Excellent visual design and typography skills',
      'Strong communication and collaboration abilities'
    ],
    careerPath: [
      { level: 'Entry Level', title: 'Junior UX/UI Designer', years: '0-2 years', salary: '£26K - £38K' },
      { level: 'Mid Level', title: 'UX/UI Designer', years: '2-5 years', salary: '£40K - £55K' },
      { level: 'Senior Level', title: 'Senior UX/UI Designer', years: '5-8 years', salary: '£55K - £70K' },
      { level: 'Lead', title: 'Lead Designer/Design Manager', years: '8-12 years', salary: '£68K - £90K' },
      { level: 'Director', title: 'Head of Design/Design Director', years: '12+ years', salary: '£85K - £120K+' }
    ],
    relatedCourses: [
      { id: 'art-design', title: 'Art and Design', subject: 'Art', level: 'A-Level' },
      { id: 'comp-sci-design', title: 'Computer Science', subject: 'Computer Science', level: 'A-Level' }
    ],
    industryInsights: {
      jobOpenings: '7,500+',
      averageSalary: '£48,000',
      topEmployers: ['Google', 'Apple', 'Meta', 'BBC', 'Sky', 'Spotify', 'Deliveroo', 'Monzo'],
      futureOutlook: 'Strong demand as companies prioritize user experience. Growth in app development, AI interfaces, and accessibility design create opportunities.',
      jobSatisfaction: '87%',
      workLifeBalance: 'Good to Excellent'
    },
    typicalDay: 'Conduct user research sessions, create design mockups in Figma, collaborate with product managers and developers, present designs to stakeholders, and iterate based on feedback.',
    workEnvironment: 'Modern office or remote work. Creative and collaborative atmosphere. Access to latest design tools and technology.',
    furtherReading: [
      { title: 'Interaction Design Foundation', url: 'https://www.interaction-design.org/' },
      { title: 'Nielsen Norman Group', url: 'https://www.nngroup.com/' }
    ]
  },

  {
    title: 'Graphic Designer',
    sector: 'Design',
    description: 'Create visual content for print and digital media including logos, branding, marketing materials, and websites',
    salaryRange: '£22K - £45K',
    growthRate: '+8%',
    education: 'Bachelor\'s Degree or Portfolio',
    location: 'UK-wide',
    skills: ['Adobe Creative Suite', 'Typography', 'Branding', 'Layout Design', 'Illustration', 'Print Design'],
    trending: false,
    demandLevel: 'medium',
    overview: 'Graphic designers are visual communicators who create compelling designs that inform, inspire, and captivate audiences. They work across various media to bring creative concepts to life.',
    responsibilities: [
      'Design graphics for print and digital media',
      'Create logos, branding, and visual identities',
      'Develop marketing materials (brochures, posters, social media graphics)',
      'Collaborate with clients to understand design briefs',
      'Prepare files for print production or web use',
      'Stay updated with design trends and software',
      'Manage multiple projects and meet deadlines',
      'Present design concepts and incorporate feedback'
    ],
    requirements: [
      'Bachelor\'s degree in Graphic Design or related field (or strong portfolio)',
      'Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign)',
      'Strong understanding of design principles and typography',
      'Creativity and artistic ability',
      'Knowledge of print production and web design',
      'Attention to detail and color theory',
      'Time management and organizational skills',
      'Good communication and client management abilities'
    ],
    careerPath: [
      { level: 'Entry Level', title: 'Junior Graphic Designer', years: '0-2 years', salary: '£20K - £26K' },
      { level: 'Mid Level', title: 'Graphic Designer', years: '2-5 years', salary: '£26K - £35K' },
      { level: 'Senior Level', title: 'Senior Graphic Designer', years: '5-10 years', salary: '£35K - £48K' },
      { level: 'Lead', title: 'Art Director/Design Lead', years: '10-15 years', salary: '£45K - £65K' },
      { level: 'Management', title: 'Creative Director', years: '15+ years', salary: '£60K - £90K+' }
    ],
    relatedCourses: [
      { id: 'art', title: 'Art and Design', subject: 'Art', level: 'A-Level' },
      { id: 'media-gd', title: 'Media Studies', subject: 'Media', level: 'A-Level' }
    ],
    industryInsights: {
      jobOpenings: '12,000+',
      averageSalary: '£32,000',
      topEmployers: ['Design agencies', 'In-house marketing teams', 'Publishing houses', 'Advertising agencies', 'Freelance'],
      futureOutlook: 'Steady demand across industries. Motion graphics and UI design skills increasingly valuable. Freelance and remote opportunities growing.',
      jobSatisfaction: '78%',
      workLifeBalance: 'Good (can be tight around project deadlines)'
    },
    typicalDay: 'Review client briefs, brainstorm concepts, create designs in Adobe software, present work to clients or team, make revisions, prepare files for production, and manage project timelines.',
    workEnvironment: 'Design studios, agencies, or in-house creative departments. Freelance work common. Creative atmosphere with collaborative team projects.',
    furtherReading: [
      { title: 'Design Council', url: 'https://www.designcouncil.org.uk/' },
      { title: 'The Chartered Society of Designers', url: 'https://www.csd.org.uk/' }
    ]
  },

  // LAW & PUBLIC SERVICE
  {
    title: 'Solicitor',
    sector: 'Law',
    description: 'Provide legal advice, draft legal documents, and represent clients in various legal matters',
    salaryRange: '£28K - £100K+',
    growthRate: '+5%',
    education: 'Law Degree + SQE',
    location: 'UK-wide',
    skills: ['Legal Research', 'Contract Law', 'Client Advocacy', 'Legal Writing', 'Negotiation', 'Case Management'],
    trending: false,
    demandLevel: 'medium',
    overview: 'Solicitors provide expert legal advice and representation to clients ranging from individuals to large corporations. They specialize in various areas of law and play crucial roles in the justice system.',
    responsibilities: [
      'Advise clients on legal matters and rights',
      'Research case law, statutes, and legal precedents',
      'Draft contracts, wills, and other legal documents',
      'Negotiate settlements and agreements',
      'Represent clients in court proceedings (some roles)',
      'Manage case files and client communications',
      'Ensure compliance with legal regulations',
      'Work with barristers on complex cases'
    ],
    requirements: [
      'Law degree (LLB) or Graduate Diploma in Law (GDL)',
      'Completion of Solicitors Qualifying Examination (SQE)',
      'Qualifying Work Experience (QWE) of 2 years',
      'Strong analytical and research skills',
      'Excellent written and verbal communication',
      'Attention to detail and accuracy',
      'Client management and interpersonal skills',
      'Ability to work under pressure and meet deadlines'
    ],
    careerPath: [
      { level: 'Training', title: 'Trainee Solicitor', years: '0-2 years', salary: '£28K - £50K (£45K+ in London)' },
      { level: 'Newly Qualified', title: 'Newly Qualified Solicitor (NQ)', years: '2-3 years', salary: '£40K - £70K' },
      { level: 'Associate', title: 'Associate Solicitor', years: '3-8 years', salary: '£50K - £90K' },
      { level: 'Senior Associate', title: 'Senior Associate', years: '8-12 years', salary: '£80K - £120K' },
      { level: 'Partner', title: 'Partner', years: '12+ years', salary: '£100K - £500K+' }
    ],
    relatedCourses: [
      { id: 'law-al', title: 'Law', subject: 'Law', level: 'A-Level' },
      { id: 'eng-law', title: 'English Literature', subject: 'English', level: 'A-Level' }
    ],
    industryInsights: {
      jobOpenings: '8,000+',
      averageSalary: '£62,000',
      topEmployers: ['Clifford Chance', 'Linklaters', 'Allen & Overy', 'Freshfields', 'Slaughter and May', 'DLA Piper'],
      futureOutlook: 'Stable demand with specialization in areas like technology law, data protection, and corporate law growing. Legal tech is changing traditional practices.',
      jobSatisfaction: '74%',
      workLifeBalance: 'Challenging (long hours common in large firms)'
    },
    typicalDay: 'Review client files, conduct legal research, draft documents, attend client meetings, negotiate with opposing parties, prepare for court hearings, and bill time spent on cases.',
    workEnvironment: 'Law firms or in-house legal departments. Professional office setting. Can involve long hours, particularly in corporate law. High-pressure but intellectually stimulating.',
    furtherReading: [
      { title: 'Solicitors Regulation Authority', url: 'https://www.sra.org.uk/' },
      { title: 'The Law Society', url: 'https://www.lawsociety.org.uk/' }
    ]
  },

  {
    title: 'Police Officer',
    sector: 'Public Service',
    description: 'Protect the public, prevent crime, maintain law and order, and provide emergency response services',
    salaryRange: '£24K - £42K',
    growthRate: '+3%',
    education: 'Police Entry Routes (Degree or Apprenticeship)',
    location: 'UK-wide',
    skills: ['Law Enforcement', 'Communication', 'Physical Fitness', 'Problem Solving', 'Conflict Resolution'],
    trending: false,
    demandLevel: 'medium',
    overview: 'Police officers serve and protect communities by preventing and investigating crimes, maintaining public order, and providing assistance during emergencies. They play vital roles in community safety and justice.',
    responsibilities: [
      'Patrol assigned areas to prevent and detect crime',
      'Respond to emergency calls and incidents',
      'Investigate crimes and gather evidence',
      'Make arrests and process suspects according to law',
      'Write detailed reports and maintain records',
      'Work with community groups on crime prevention',
      'Provide support to victims of crime',
      'Testify in court proceedings when required'
    ],
    requirements: [
      'Entry via Police Constable Degree Apprenticeship (PCDA) or Degree Holder Entry Programme',
      'British citizen, EU national, or indefinite leave to remain',
      'Pass fitness tests and medical assessments',
      'Enhanced background checks and vetting',
      'Good physical fitness and health',
      'Strong communication and interpersonal skills',
      'Ability to remain calm under pressure',
      'Commitment to public service and community safety'
    ],
    careerPath: [
      { level: 'Entry Level', title: 'Police Constable', years: '0-3 years', salary: '£24K - £42K' },
      { level: 'Experienced', title: 'Senior Constable / Specialist Officer', years: '3-7 years', salary: '£32K - £45K' },
      { level: 'Sergeant', title: 'Police Sergeant', years: '7-12 years', salary: '£43K - £48K' },
      { level: 'Inspector', title: 'Police Inspector', years: '12-18 years', salary: '£52K - £59K' },
      { level: 'Senior Command', title: 'Chief Inspector / Superintendent', years: '18+ years', salary: '£60K - £90K+' }
    ],
    relatedCourses: [
      { id: 'law-police', title: 'Law', subject: 'Law', level: 'A-Level' },
      { id: 'pe-police', title: 'Physical Education', subject: 'PE', level: 'A-Level' }
    ],
    industryInsights: {
      jobOpenings: '5,000+',
      averageSalary: '£34,000',
      topEmployers: ['Metropolitan Police', 'Police forces across UK (43 forces)', 'British Transport Police', 'Ministry of Defence Police'],
      futureOutlook: 'Government commitment to recruit 20,000 additional officers. Growing focus on cybercrime and digital policing creates specialized opportunities.',
      jobSatisfaction: '76%',
      workLifeBalance: 'Moderate (shift work, weekends, nights)'
    },
    typicalDay: 'Attend briefing, patrol beat or respond to calls, investigate incidents, interview witnesses or suspects, write reports, engage with community members, and handle paperwork.',
    workEnvironment: 'Varied - patrol cars, police stations, streets, and community settings. Shift work including nights, weekends, and holidays. Can be physically and emotionally demanding.',
    furtherReading: [
      { title: 'College of Policing', url: 'https://www.college.police.uk/' },
      { title: 'Join the Police', url: 'https://www.joiningthepolice.co.uk/' }
    ]
  },

  // BUSINESS & MANAGEMENT
  {
    title: 'Project Manager',
    sector: 'Business',
    description: 'Plan, execute, and deliver projects on time and within budget across various industries and sectors',
    salaryRange: '£35K - £70K',
    growthRate: '+9%',
    education: 'Bachelor\'s Degree',
    location: 'UK-wide',
    skills: ['Project Planning', 'Risk Management', 'Stakeholder Management', 'Agile/Scrum', 'MS Project', 'Leadership'],
    trending: false,
    demandLevel: 'high',
    overview: 'Project managers are responsible for planning, organizing, and directing projects from inception to completion. They coordinate resources, manage budgets, and ensure project goals are met.',
    responsibilities: [
      'Define project scope, objectives, and deliverables',
      'Create detailed project plans and timelines',
      'Manage project budgets and resource allocation',
      'Lead and motivate project teams',
      'Identify and mitigate project risks',
      'Monitor progress and adjust plans as needed',
      'Communicate with stakeholders and report on status',
      'Ensure project quality and successful delivery'
    ],
    requirements: [
      'Bachelor\'s degree in Business, Management, or related field',
      'Project management certification (PRINCE2, PMP, Agile) desirable',
      'Proven experience managing projects',
      'Strong organizational and time management skills',
      'Excellent communication and leadership abilities',
      'Problem-solving and decision-making capabilities',
      'Proficiency in project management software',
      'Ability to work under pressure and handle multiple priorities'
    ],
    careerPath: [
      { level: 'Entry Level', title: 'Assistant Project Manager', years: '0-2 years', salary: '£28K - £38K' },
      { level: 'Mid Level', title: 'Project Manager', years: '2-5 years', salary: '£40K - £60K' },
      { level: 'Senior Level', title: 'Senior Project Manager', years: '5-10 years', salary: '£60K - £80K' },
      { level: 'Programme', title: 'Programme Manager', years: '10-15 years', salary: '£75K - £100K' },
      { level: 'Director', title: 'Director of Project Management / PMO', years: '15+ years', salary: '£95K - £130K+' }
    ],
    relatedCourses: [
      { id: 'business-pm', title: 'Business Studies', subject: 'Business', level: 'A-Level' },
      { id: 'maths-pm', title: 'Mathematics', subject: 'Mathematics', level: 'A-Level' }
    ],
    industryInsights: {
      jobOpenings: '22,000+',
      averageSalary: '£52,000',
      topEmployers: ['Consulting firms', 'Financial services', 'IT companies', 'Construction firms', 'Healthcare organizations'],
      futureOutlook: 'Strong demand across all industries. Agile project management and hybrid methodologies increasingly important. Digital transformation projects drive opportunities.',
      jobSatisfaction: '80%',
      workLifeBalance: 'Moderate (can be demanding during critical project phases)'
    },
    typicalDay: 'Review project status, conduct team meetings, update project plans, manage issues and risks, communicate with stakeholders, track budget and resources, and report on progress.',
    workEnvironment: 'Office-based or hybrid/remote work. May involve travel to client sites. Collaborative environment with regular stakeholder interactions.',
    furtherReading: [
      { title: 'Association for Project Management', url: 'https://www.apm.org.uk/' },
      { title: 'Project Management Institute', url: 'https://www.pmi.org/' }
    ]
  },

  {
    title: 'Human Resources Manager',
    sector: 'Business',
    description: 'Manage recruitment, employee relations, training, and HR policies to support organizational success',
    salaryRange: '£32K - £65K',
    growthRate: '+7%',
    education: 'Bachelor\'s Degree',
    location: 'UK-wide',
    skills: ['Recruitment', 'Employee Relations', 'HR Law', 'Training & Development', 'Performance Management', 'CIPD'],
    trending: false,
    demandLevel: 'medium',
    overview: 'HR managers are responsible for managing an organization\'s most valuable asset - its people. They oversee recruitment, development, employee welfare, and ensure compliance with employment law.',
    responsibilities: [
      'Manage recruitment and selection processes',
      'Develop and implement HR policies and procedures',
      'Handle employee relations and resolve workplace issues',
      'Coordinate training and development programs',
      'Manage performance review processes',
      'Ensure compliance with employment law and regulations',
      'Oversee payroll and benefits administration',
      'Advise managers on HR matters and best practices'
    ],
    requirements: [
      'Bachelor\'s degree in HR, Business, or related field',
      'CIPD (Chartered Institute of Personnel and Development) qualification desirable',
      'Strong knowledge of UK employment law',
      'Experience in HR generalist or specialist roles',
      'Excellent interpersonal and communication skills',
      'Discretion and ability to handle confidential information',
      'Problem-solving and conflict resolution abilities',
      'Organizational and administrative skills'
    ],
    careerPath: [
      { level: 'Entry Level', title: 'HR Assistant / Coordinator', years: '0-2 years', salary: '£22K - £28K' },
      { level: 'Mid Level', title: 'HR Advisor / Officer', years: '2-5 years', salary: '£28K - £38K' },
      { level: 'Manager', title: 'HR Manager', years: '5-10 years', salary: '£40K - £55K' },
      { level: 'Senior Manager', title: 'Senior HR Manager / HR Business Partner', years: '10-15 years', salary: '£55K - £70K' },
      { level: 'Director', title: 'HR Director / Chief People Officer', years: '15+ years', salary: '£70K - £120K+' }
    ],
    relatedCourses: [
      { id: 'business-hr', title: 'Business Studies', subject: 'Business', level: 'A-Level' },
      { id: 'psych-hr', title: 'Psychology', subject: 'Psychology', level: 'A-Level' }
    ],
    industryInsights: {
      jobOpenings: '15,000+',
      averageSalary: '£45,000',
      topEmployers: ['All major organizations across sectors', 'HR consultancies', 'Recruitment agencies', 'Public sector bodies'],
      futureOutlook: 'Steady demand across industries. Focus on employee wellbeing, diversity & inclusion, and people analytics create new opportunities. Remote work policies adding complexity.',
      jobSatisfaction: '77%',
      workLifeBalance: 'Good'
    },
    typicalDay: 'Handle employee queries, conduct interviews, update HR systems, resolve workplace issues, meet with managers, review policies, organize training, and work on strategic HR initiatives.',
    workEnvironment: 'Office-based or hybrid work. Regular interaction with employees at all levels. Mix of strategic planning and day-to-day operational work.',
    furtherReading: [
      { title: 'Chartered Institute of Personnel and Development', url: 'https://www.cipd.co.uk/' },
      { title: 'ACAS - Advisory, Conciliation and Arbitration Service', url: 'https://www.acas.org.uk/' }
    ]
  }
];

