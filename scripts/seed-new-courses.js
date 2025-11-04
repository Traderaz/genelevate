/**
 * Script to seed new GCSE courses into Firestore
 * Courses: Mathematics, Biology, Physics (when ready), English (when ready)
 * Run with: node scripts/seed-new-courses.js
 */

const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');

// Try loading from multiple paths
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: 'apps/web/.env.local' });

// Initialize Firebase Admin
if (getApps().length === 0) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY 
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined;

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 
                    process.env.FIREBASE_PROJECT_ID ||
                    'gen-elevate';

  if (!process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
    console.error('❌ Missing Firebase Admin credentials in .env.local');
    process.exit(1);
  }

  initializeApp({
    credential: cert({
      projectId: projectId,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });
  
  console.log(`✅ Initialized Firebase Admin for project: ${projectId}\n`);
}

const db = getFirestore();

// Course configurations
const courses = [
  {
    dirName: 'gcse-mathematics',
    title: 'GCSE Mathematics',
    subject: 'Mathematics',
    description: 'Complete GCSE Mathematics revision guide covering all topics including number, algebra, geometry, statistics, and probability for both Foundation and Higher tiers.',
    chapters: [
      { id: '01', title: 'Number', file: 'chapter-01-number.md', duration: '10-12 hours', weight: '~15%' },
      { id: '02', title: 'Algebra Basics', file: 'chapter-02-algebra-basics.md', duration: '12-14 hours', weight: '~20%' },
      { id: '03', title: 'Equations and Inequalities', file: 'chapter-03-equations-inequalities.md', duration: '10-12 hours', weight: '~15%' },
      { id: '04', title: 'Graphs', file: 'chapter-04-graphs.md', duration: '12-14 hours', weight: '~15%' },
      { id: '05', title: 'Geometry and Measures', file: 'chapter-05-geometry-measures.md', duration: '14-16 hours', weight: '~20%' },
      { id: '06', title: 'Ratio and Proportion', file: 'chapter-06-ratio-proportion.md', duration: '10-12 hours', weight: '~15%' },
      { id: '07', title: 'Probability', file: 'chapter-07-probability.md', duration: '8-10 hours', weight: '~10%' },
      { id: '08', title: 'Statistics', file: 'chapter-08-statistics.md', duration: '10-12 hours', weight: '~12%' },
      { id: '09', title: 'Sequences and Functions', file: 'chapter-09-sequences.md', duration: '8-10 hours', weight: '~8%' },
      { id: '10', title: 'Pythagoras and Trigonometry', file: 'chapter-10-pythagoras-trigonometry.md', duration: '12-14 hours', weight: '~15%' },
    ],
    tags: ['GCSE', 'Mathematics', 'Maths', 'Revision', 'Exam Prep', 'AQA', 'Edexcel', 'OCR', 'Foundation', 'Higher Tier'],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC'],
    tier: ['Foundation', 'Higher'],
  },
  {
    dirName: 'gcse-biology',
    title: 'GCSE Biology',
    subject: 'Biology',
    description: 'Complete GCSE Biology revision guide covering cells, organization, disease, bioenergetics, homeostasis, inheritance, and ecology for all exam boards.',
    chapters: [
      { id: '01', title: 'Cell Structure and Transport', file: 'chapter-01-cell-structure.md', duration: '10-12 hours', weight: '~12%' },
      { id: '02', title: 'Cell Division and Stem Cells', file: 'chapter-02-cell-division.md', duration: '8-10 hours', weight: '~10%' },
      { id: '03', title: 'Organization and the Digestive System', file: 'chapter-03-organization.md', duration: '10-12 hours', weight: '~12%' },
      { id: '04', title: 'Organizing Animals and Plants', file: 'chapter-04-organizing-animals-plants.md', duration: '12-14 hours', weight: '~15%' },
      { id: '05', title: 'Communicable Disease', file: 'chapter-05-communicable-disease.md', duration: '10-12 hours', weight: '~12%' },
      { id: '06', title: 'Preventing and Treating Disease', file: 'chapter-06-preventing-disease.md', duration: '8-10 hours', weight: '~8%' },
      { id: '07', title: 'Non-Communicable Diseases', file: 'chapter-07-non-communicable-disease.md', duration: '8-10 hours', weight: '~8%' },
      { id: '08', title: 'Photosynthesis and Respiration', file: 'chapter-08-photosynthesis-respiration.md', duration: '10-12 hours', weight: '~12%' },
      { id: '09', title: 'Homeostasis and Response', file: 'chapter-09-homeostasis-response.md', duration: '12-14 hours', weight: '~15%' },
      { id: '10', title: 'Inheritance, Variation and Evolution', file: 'chapter-10-inheritance-evolution.md', duration: '12-14 hours', weight: '~16%' },
    ],
    tags: ['GCSE', 'Biology', 'Science', 'Revision', 'Exam Prep', 'AQA', 'Edexcel', 'OCR', 'Foundation', 'Higher Tier'],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC'],
    tier: ['Foundation', 'Higher'],
  },
  {
    dirName: 'gcse-physics',
    title: 'GCSE Physics',
    subject: 'Physics',
    description: 'Complete GCSE Physics revision guide covering energy, electricity, forces, waves, magnetism, atomic structure, and space physics for all exam boards.',
    chapters: [
      { id: '01', title: 'Energy', file: 'chapter-01-energy.md', duration: '10-12 hours', weight: '~12%' },
      { id: '02', title: 'Electricity', file: 'chapter-02-electricity.md', duration: '12-14 hours', weight: '~15%' },
      { id: '03', title: 'Particle Model of Matter', file: 'chapter-03-particle-model.md', duration: '8-10 hours', weight: '~10%' },
      { id: '04', title: 'Atomic Structure', file: 'chapter-04-atomic-structure.md', duration: '10-12 hours', weight: '~12%' },
      { id: '05', title: 'Forces', file: 'chapter-05-forces.md', duration: '12-14 hours', weight: '~15%' },
      { id: '06', title: 'Waves', file: 'chapter-06-waves.md', duration: '10-12 hours', weight: '~12%' },
      { id: '07', title: 'Magnetism and Electromagnetism', file: 'chapter-07-magnetism.md', duration: '8-10 hours', weight: '~10%' },
      { id: '08', title: 'Space Physics', file: 'chapter-08-space-physics.md', duration: '6-8 hours', weight: '~8%' },
      { id: '09', title: 'Further Mechanics', file: 'chapter-09-further-mechanics.md', duration: '8-10 hours', weight: '~8%' },
      { id: '10', title: 'Further Energy and Electricity', file: 'chapter-10-further-energy.md', duration: '8-10 hours', weight: '~8%' },
    ],
    tags: ['GCSE', 'Physics', 'Science', 'Revision', 'Exam Prep', 'AQA', 'Edexcel', 'OCR', 'Foundation', 'Higher Tier'],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC'],
    tier: ['Foundation', 'Higher'],
  },
  {
    dirName: 'gcse-english',
    title: 'GCSE English Language',
    subject: 'English Language',
    description: 'Complete GCSE English Language revision guide covering reading fiction and non-fiction, creative writing, argumentative writing, and exam technique for all exam boards.',
    chapters: [
      { id: '01', title: 'Reading Fiction Texts', file: 'chapter-01-reading-fiction.md', duration: '8-10 hours', weight: '~12%' },
      { id: '02', title: 'Creative Writing', file: 'chapter-02-creative-writing.md', duration: '10-12 hours', weight: '~15%' },
      { id: '03', title: 'Reading Non-Fiction', file: 'chapter-03-reading-non-fiction.md', duration: '8-10 hours', weight: '~12%' },
      { id: '04', title: 'Writing to Argue and Persuade', file: 'chapter-04-writing-argue-persuade.md', duration: '8-10 hours', weight: '~12%' },
      { id: '05', title: 'Writing to Inform and Explain', file: 'chapter-05-writing-inform-explain.md', duration: '6-8 hours', weight: '~10%' },
      { id: '06', title: 'Language Analysis', file: 'chapter-06-language-analysis.md', duration: '8-10 hours', weight: '~12%' },
      { id: '07', title: 'Structure and Organization', file: 'chapter-07-structure-organization.md', duration: '6-8 hours', weight: '~10%' },
      { id: '08', title: 'Comparing Texts', file: 'chapter-08-comparing-texts.md', duration: '8-10 hours', weight: '~12%' },
      { id: '09', title: 'Spoken Language', file: 'chapter-09-spoken-language.md', duration: '4-6 hours', weight: '~5%' },
      { id: '10', title: 'Exam Technique', file: 'chapter-10-exam-technique.md', duration: '6-8 hours', weight: '~10%' },
    ],
    tags: ['GCSE', 'English', 'Language', 'Revision', 'Exam Prep', 'AQA', 'Edexcel', 'OCR', 'Reading', 'Writing'],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC'],
    tier: ['Foundation', 'Higher'],
  },
];

async function seedCourse(courseConfig) {
  console.log(`\n📚 Seeding ${courseConfig.title}...\n`);

  const coursesDir = path.join(process.cwd(), 'courses', courseConfig.dirName);

  // Check if directory exists
  if (!fs.existsSync(coursesDir)) {
    console.log(`⏭️  Skipping ${courseConfig.title} - directory not found`);
    return null;
  }

  // Read chapter content
  const chaptersWithContent = courseConfig.chapters.map((chapter, index) => {
    const filePath = path.join(coursesDir, chapter.file);
    let content = '';

    try {
      content = fs.readFileSync(filePath, 'utf-8');
      console.log(`  ✅ Loaded ${chapter.file}`);
    } catch (error) {
      console.log(`  ⏭️  Skipping ${chapter.file} - not found`);
      return null;
    }

    return {
      id: chapter.id,
      title: chapter.title,
      order: index + 1,
      content: content,
      duration: chapter.duration,
      weight: chapter.weight,
    };
  }).filter(Boolean); // Remove null entries

  if (chaptersWithContent.length === 0) {
    console.log(`  ⚠️  No chapters found for ${courseConfig.title}\n`);
    return null;
  }

  // Create the course object
  const course = {
    title: courseConfig.title,
    description: courseConfig.description,
    subject: courseConfig.subject,
    yearGroups: ['Year 10', 'Year 11'],
    difficulty: 'intermediate',
    thumbnail: `/images/courses/${courseConfig.dirName}.jpg`,
    chapters: chaptersWithContent,
    tags: courseConfig.tags,
    createdBy: 'system',
    published: true,
    featured: true,
    enrollmentCount: 0,
    rating: 0,
    totalDuration: `${chaptersWithContent.length * 10}-${chaptersWithContent.length * 14} hours`,
    examBoards: courseConfig.examBoards,
    tier: courseConfig.tier,
  };

  try {
    // Check if course already exists
    const existingCoursesSnapshot = await db
      .collection('courses')
      .where('title', '==', courseConfig.title)
      .limit(1)
      .get();

    if (!existingCoursesSnapshot.empty) {
      const existingCourseId = existingCoursesSnapshot.docs[0].id;
      console.log(`\n  ⚠️  ${courseConfig.title} already exists`);
      console.log('  Updating existing course...');

      await db.collection('courses').doc(existingCourseId).update({
        ...course,
        updatedAt: new Date(),
      });

      console.log(`  ✅ Updated course: ${existingCourseId}`);
      return existingCourseId;
    } else {
      // Create new course
      const docRef = await db.collection('courses').add({
        ...course,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log(`  ✅ Created new course: ${docRef.id}`);
      return docRef.id;
    }
  } catch (error) {
    console.error(`  ❌ Error seeding ${courseConfig.title}:`, error.message);
    return null;
  }
}

async function seedAllCourses() {
  console.log('🚀 Starting to seed new GCSE courses...\n');
  console.log('=' .repeat(60));

  const results = [];

  for (const courseConfig of courses) {
    const courseId = await seedCourse(courseConfig);
    if (courseId) {
      results.push({ title: courseConfig.title, id: courseId });
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n🎉 Seeding complete!\n');
  
  if (results.length > 0) {
    console.log('Successfully seeded courses:');
    results.forEach(result => {
      console.log(`  ✅ ${result.title} (ID: ${result.id})`);
    });
  } else {
    console.log('⚠️  No courses were seeded');
  }
  
  console.log('');
}

// Run the seed function
seedAllCourses()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seed failed:', error);
    process.exit(1);
  });

