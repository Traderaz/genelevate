import { NextRequest, NextResponse } from 'next/server';
import { getStudentInterviewResponses } from '@/lib/services/interview-lab-admin';

// GET /api/interview-lab/student-responses?studentId=xxx
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json(
        { error: 'Student ID required' },
        { status: 400 }
      );
    }

    const responses = await getStudentInterviewResponses(studentId);
    return NextResponse.json(responses);
  } catch (error) {
    console.error('Error fetching student responses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch responses' },
      { status: 500 }
    );
  }
}

