import { NextRequest, NextResponse } from 'next/server';
import {
  submitInterviewResponse,
  getInterviewResponses,
} from '@/lib/services/interview-lab-admin';

// GET /api/interview-lab/responses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('questionId') || undefined;

    const responses = await getInterviewResponses(questionId);
    return NextResponse.json(responses);
  } catch (error) {
    console.error('Error fetching interview responses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interview responses' },
      { status: 500 }
    );
  }
}

// POST /api/interview-lab/responses
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      questionId,
      studentId,
      studentName,
      studentEmail,
      videoUrl,
      videoPath,
    } = body;

    if (!questionId || !studentId || !studentName || !videoUrl || !videoPath) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await submitInterviewResponse({
      questionId,
      studentId,
      studentName,
      studentEmail: studentEmail || '',
      videoUrl,
      videoPath,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error submitting interview response:', error);
    return NextResponse.json(
      { error: 'Failed to submit interview response' },
      { status: 500 }
    );
  }
}

