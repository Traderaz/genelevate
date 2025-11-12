import { NextRequest, NextResponse } from 'next/server';
import { getAllReviews } from '@/lib/services/reviews-admin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'pending' | 'approved' | 'rejected' | null;

    console.log('Fetching reviews with status:', status || 'all');
    const reviews = await getAllReviews(status || undefined);
    console.log('Retrieved reviews count:', reviews.length);

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error in GET /api/reviews:', error);
    // Return empty array on error instead of error object
    return NextResponse.json([]);
  }
}

