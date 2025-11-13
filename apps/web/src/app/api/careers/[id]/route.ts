import { NextRequest, NextResponse } from 'next/server';
import { getCareerById } from '@/lib/services/careers-admin';

/**
 * GET /api/careers/[id] - Fetch a single career by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const career = await getCareerById(params.id);

    if (!career) {
      return NextResponse.json(
        { error: 'Career not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(career, { status: 200 });
  } catch (error) {
    console.error('Error fetching career:', error);
    return NextResponse.json(
      { error: 'Failed to fetch career' },
      { status: 500 }
    );
  }
}

