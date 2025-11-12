import { NextRequest, NextResponse } from 'next/server';
import { getAllReviews } from '@/lib/services/reviews-admin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'pending' | 'approved' | 'rejected' | null;

    const reviews = await getAllReviews(status || undefined);

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error in GET /api/reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

