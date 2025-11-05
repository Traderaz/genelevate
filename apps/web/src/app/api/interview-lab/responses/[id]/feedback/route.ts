import { NextRequest, NextResponse } from 'next/server';
import { addInterviewFeedback } from '@/lib/services/interview-lab-admin';

// POST /api/interview-lab/responses/[id]/feedback
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { strengths, improvements, rating, providedBy } = body;

    if (!strengths || !improvements || !providedBy) {
      return NextResponse.json(
        { error: 'Missing required feedback fields' },
        { status: 400 }
      );
    }

    const result = await addInterviewFeedback(params.id, {
      strengths,
      improvements,
      rating,
      providedBy,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error adding interview feedback:', error);
    return NextResponse.json(
      { error: 'Failed to add feedback' },
      { status: 500 }
    );
  }
}

