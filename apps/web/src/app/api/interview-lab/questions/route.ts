import { NextRequest, NextResponse } from 'next/server';
import {
  createInterviewQuestion,
  getInterviewQuestions,
} from '@/lib/services/interview-lab-admin';

// GET /api/interview-lab/questions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') === 'true';

    const questions = await getInterviewQuestions(activeOnly);
    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching interview questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interview questions' },
      { status: 500 }
    );
  }
}

// POST /api/interview-lab/questions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, description, createdBy, active, order } = body;

    if (!question || !createdBy) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await createInterviewQuestion(createdBy, {
      question,
      description,
      active,
      order,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating interview question:', error);
    return NextResponse.json(
      { error: 'Failed to create interview question' },
      { status: 500 }
    );
  }
}

