import { NextRequest, NextResponse } from 'next/server';
import {
  getInterviewResponse,
  deleteInterviewResponse,
} from '@/lib/services/interview-lab';

// GET /api/interview-lab/responses/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await getInterviewResponse(params.id);
    
    if (!response) {
      return NextResponse.json(
        { error: 'Response not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching interview response:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interview response' },
      { status: 500 }
    );
  }
}

// DELETE /api/interview-lab/responses/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteInterviewResponse(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting interview response:', error);
    return NextResponse.json(
      { error: 'Failed to delete interview response' },
      { status: 500 }
    );
  }
}

