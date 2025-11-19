import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST() {
  try {
    console.log('🗑️  Deleting existing 11+ courses...');

    const coursesRef = adminDb.collection('courses');
    const elevenPlusCourses = await coursesRef
      .where('subject', '==', '11+ Preparation')
      .get();

    const batch = adminDb.batch();
    elevenPlusCourses.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    
    console.log(`✅ Deleted ${elevenPlusCourses.size} 11+ courses`);

    return NextResponse.json({
      success: true,
      message: `Deleted ${elevenPlusCourses.size} 11+ courses`,
      deletedCount: elevenPlusCourses.size
    });
  } catch (error) {
    console.error('❌ Error deleting 11+ courses:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete courses',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

