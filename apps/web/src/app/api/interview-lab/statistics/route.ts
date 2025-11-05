import { NextRequest, NextResponse } from 'next/server';
import { getInterviewStatistics } from '@/lib/services/interview-lab-admin';

// GET /api/interview-lab/statistics
export async function GET(request: NextRequest) {
  try {
    const stats = await getInterviewStatistics();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching interview statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}

