import { NextRequest, NextResponse } from 'next/server';
import {
  getInterviewQuestion,
  updateInterviewQuestion,
  deleteInterviewQuestion,
} from '@/lib/services/interview-lab';

// GET /api/interview-lab/questions/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const question = await getInterviewQuestion(params.id);
    
    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(question);
  } catch (error) {
    console.error('Error fetching interview question:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interview question' },
      { status: 500 }
    );
  }
}

// PATCH /api/interview-lab/questions/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { question, description, active, order } = body;

    const result = await updateInterviewQuestion(params.id, {
      question,
      description,
      active,
      order,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating interview question:', error);
    return NextResponse.json(
      { error: 'Failed to update interview question' },
      { status: 500 }
    );
  }
}

// DELETE /api/interview-lab/questions/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteInterviewQuestion(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting interview question:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete interview question' },
      { status: 500 }
    );
  }
}

