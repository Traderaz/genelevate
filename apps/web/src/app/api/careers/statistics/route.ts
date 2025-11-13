import { NextResponse } from 'next/server';
import { getCareerStatistics } from '@/lib/services/careers-admin';

/**
 * GET /api/careers/statistics - Fetch career statistics
 */
export async function GET() {
  try {
    const statistics = await getCareerStatistics();
    return NextResponse.json(statistics, { status: 200 });
  } catch (error) {
    console.error('Error fetching career statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch career statistics' },
      { status: 500 }
    );
  }
}

