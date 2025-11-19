import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { elevenPlusCourses } from '@/lib/data/eleven-plus-courses';

export async function POST() {
  try {
    console.log('🌱 Starting 11+ courses upload...');

    const coursesRef = adminDb.collection('courses');
    const createdCourses = [];
    let skippedCount = 0;

    for (const courseData of elevenPlusCourses) {
      // Check if course already exists
      const existingCourses = await coursesRef
        .where('title', '==', courseData.title)
        .limit(1)
        .get();

      if (existingCourses.empty) {
        // Create new course
        const docRef = await coursesRef.add({
          ...courseData,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        createdCourses.push({
          id: docRef.id,
          title: courseData.title
        });
        
        console.log(`✅ Created: ${courseData.title}`);
      } else {
        skippedCount++;
        console.log(`⏭️  Skipped (already exists): ${courseData.title}`);
      }
    }

    console.log(`\n🎉 Upload complete!`);
    console.log(`📊 Created ${createdCourses.length} new courses`);
    console.log(`⏭️  Skipped ${skippedCount} existing courses`);

    return NextResponse.json({
      success: true,
      message: '11+ courses uploaded successfully!',
      summary: {
        totalCourses: elevenPlusCourses.length,
        created: createdCourses.length,
        skipped: skippedCount,
        createdCourses: createdCourses
      }
    });
  } catch (error) {
    console.error('❌ Error uploading 11+ courses:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to upload courses',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const coursesRef = adminDb.collection('courses');
    const snapshot = await coursesRef.get();
    
    // Count 11+ courses
    const elevenPlusCourseCount = snapshot.docs.filter(doc => 
      doc.data().subject === '11+ Preparation'
    ).length;

    return NextResponse.json({
      message: 'Course seeding endpoint',
      current11PlusCourses: elevenPlusCourseCount,
      seedData11PlusCourses: elevenPlusCourses.length,
      totalCoursesInDb: snapshot.size,
      action: 'Send a POST request to this endpoint to upload 11+ courses',
      note: 'Existing courses with the same title will be skipped'
    });
  } catch (error) {
    console.error('Error checking courses:', error);
    return NextResponse.json(
      { error: 'Failed to check courses' },
      { status: 500 }
    );
  }
}

