/**
 * Script to seed GCSE Chemistry course into Firestore
 * Run with: node scripts/seed-gcse-chemistry.js
 */

const { initializeApp, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin - using default credentials
if (getApps().length === 0) {
  // This will use the Firebase CLI credentials or GOOGLE_APPLICATION_CREDENTIALS env var
  initializeApp({
    projectId: 'gen-elevate', // Your Firebase project ID
  });
}

const db = getFirestore();

// Chapter metadata
const chapters = [
  {
    id: '01',
    title: 'Atomic Structure and the Periodic Table',
    description: 'Atoms, elements, compounds, mixtures, atomic models, electronic structure, and the periodic table',
    file: 'chapter-01-atomic-structure.md',
    duration: '12-16 hours',
    weight: '~15%',
  },
  {
    id: '02',
    title: 'Bonding, Structure and Properties',
    description: 'Ionic, covalent, and metallic bonding, structures, and their properties',
    file: 'chapter-02-bonding-structure.md',
    duration: '10-14 hours',
    weight: '~20%',
  },
  {
    id: '03',
    title: 'Quantitative Chemistry',
    description: 'Moles, calculations, concentration, percentage yield, and atom economy',
    file: 'chapter-03-quantitative-chemistry.md',
    duration: '12-16 hours',
    weight: '~15%',
  },
  {
    id: '04',
    title: 'Chemical Changes',
    description: 'Reactivity series, extraction, acids, salts, pH, and electrolysis',
    file: 'chapter-04-chemical-changes.md',
    duration: '14-18 hours',
    weight: '~20%',
  },
  {
    id: '05',
    title: 'Energy Changes',
    description: 'Exothermic and endothermic reactions, bond energies, cells, and fuel cells',
    file: 'chapter-05-energy-changes.md',
    duration: '8-10 hours',
    weight: '~10%',
  },
  {
    id: '06',
    title: 'Rate of Reaction',
    description: 'Factors affecting rate, collision theory, equilibrium, and Le Chatelier\'s Principle',
    file: 'chapter-06-rate-of-reaction.md',
    duration: '12-14 hours',
    weight: '~15%',
  },
  {
    id: '07',
    title: 'Organic Chemistry',
    description: 'Crude oil, hydrocarbons, alkanes, alkenes, cracking, and polymers',
    file: 'chapter-07-organic-chemistry.md',
    duration: '10-12 hours',
    weight: '~15%',
  },
  {
    id: '08',
    title: 'Chemical Analysis',
    description: 'Purity, chromatography, gas tests, flame tests, and ion tests',
    file: 'chapter-08-chemical-analysis.md',
    duration: '8-10 hours',
    weight: '~10%',
  },
  {
    id: '09',
    title: 'Chemistry of the Atmosphere',
    description: 'Evolution of atmosphere, greenhouse effect, climate change, and air pollution',
    file: 'chapter-09-atmosphere.md',
    duration: '8-10 hours',
    weight: '~10%',
  },
  {
    id: '10',
    title: 'Using Resources',
    description: 'Earth\'s resources, water treatment, LCA, recycling, and corrosion',
    file: 'chapter-10-using-resources.md',
    duration: '8-10 hours',
    weight: '~10%',
  },
];

async function seedGCSEChemistry() {
  console.log('🧪 Starting GCSE Chemistry course seed...\n');

  const coursesDir = path.join(process.cwd(), 'courses', 'gcse-chemistry');

  // Read chapter content
  const chaptersWithContent = chapters.map((chapter, index) => {
    const filePath = path.join(coursesDir, chapter.file);
    let content = '';

    try {
      content = fs.readFileSync(filePath, 'utf-8');
      console.log(`✅ Loaded ${chapter.file}`);
    } catch (error) {
      console.error(`❌ Failed to load ${chapter.file}:`, error.message);
      content = '# Content not available\n\nPlease check the file system.';
    }

    return {
      id: chapter.id,
      title: chapter.title,
      description: chapter.description,
      order: index + 1,
      content: content,
      duration: chapter.duration,
      weight: chapter.weight,
    };
  });

  // Create the course object
  const course = {
    title: 'GCSE Chemistry',
    description: 'Complete GCSE Chemistry revision guide with all 10 chapters covering the full AQA, Edexcel, and OCR specifications. Includes key concepts, exam questions, mark schemes, and examiner tips.',
    subject: 'Chemistry',
    yearGroups: ['Year 10', 'Year 11'],
    difficulty: 'intermediate',
    thumbnail: '/images/courses/gcse-chemistry.jpg',
    chapters: chaptersWithContent,
    tags: [
      'GCSE',
      'Chemistry',
      'Science',
      'Revision',
      'Exam Prep',
      'AQA',
      'Edexcel',
      'OCR',
      'Foundation',
      'Higher Tier',
    ],
    createdBy: 'system',
    published: true,
    featured: true,
    enrollmentCount: 0,
    rating: 0,
    totalDuration: '100-140 hours',
    examBoards: ['AQA', 'Edexcel', 'OCR'],
    tier: ['Foundation', 'Higher'],
  };

  try {
    // Check if course already exists
    const existingCoursesSnapshot = await db
      .collection('courses')
      .where('title', '==', 'GCSE Chemistry')
      .limit(1)
      .get();

    if (!existingCoursesSnapshot.empty) {
      const existingCourseId = existingCoursesSnapshot.docs[0].id;
      console.log('\n⚠️  GCSE Chemistry course already exists');
      console.log('Updating existing course...\n');

      await db.collection('courses').doc(existingCourseId).update({
        ...course,
        updatedAt: new Date(),
      });

      console.log(`✅ Updated course: ${existingCourseId}\n`);
      return existingCourseId;
    } else {
      // Create new course
      const docRef = await db.collection('courses').add({
        ...course,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log(`\n✅ Created new course: ${docRef.id}\n`);
      return docRef.id;
    }
  } catch (error) {
    console.error('❌ Error seeding course:', error);
    throw error;
  }
}

// Run the seed function
seedGCSEChemistry()
  .then((courseId) => {
    console.log('🎉 GCSE Chemistry course successfully seeded!');
    console.log(`📚 Course ID: ${courseId}`);
    console.log(`🔗 Access at: /courses/${courseId}\n`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seed failed:', error);
    process.exit(1);
  });

