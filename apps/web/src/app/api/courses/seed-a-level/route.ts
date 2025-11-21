import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { aLevelCourses } from '@/lib/data/a-level-courses';

export async function POST() {
  try {
    console.log('🎓 Starting A-Level courses upload...');
    
    let uploadedCount = 0;
    let skippedCount = 0;

    for (const course of aLevelCourses) {
      // Check if course already exists by title
      const existingCourse = await adminDb
        .collection('courses')
        .where('title', '==', course.title)
        .limit(1)
        .get();

      if (!existingCourse.empty) {
        console.log(`⏭️  Skipping ${course.title} (already exists)`);
        skippedCount++;
        continue;
      }

      // Add course to Firestore
      const docRef = await adminDb.collection('courses').add({
        ...course,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log(`✅ Uploaded: ${course.title} (ID: ${docRef.id})`);
      uploadedCount++;
    }

    console.log(`\n🎉 A-Level courses upload complete!`);
    console.log(`✅ Uploaded: ${uploadedCount} courses`);
    console.log(`⏭️  Skipped: ${skippedCount} courses (already exist)`);

    return NextResponse.json({
      success: true,
      uploaded: uploadedCount,
      skipped: skippedCount,
      total: aLevelCourses.length,
    });

  } catch (error: any) {
    console.error('❌ Error uploading A-Level courses:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

