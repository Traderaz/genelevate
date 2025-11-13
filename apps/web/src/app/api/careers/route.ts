import { NextRequest, NextResponse } from 'next/server';
import { getAllCareers, searchCareers } from '@/lib/services/careers-admin';

/**
 * GET /api/careers - Fetch all careers with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sector = searchParams.get('sector') || undefined;
    const demandLevel = searchParams.get('demandLevel') || undefined;
    const trendingParam = searchParams.get('trending');
    const searchQuery = searchParams.get('search');
    const limitParam = searchParams.get('limit');

    const trending = trendingParam === 'true' ? true : trendingParam === 'false' ? false : undefined;
    const limit = limitParam ? parseInt(limitParam) : undefined;

    let careers;

    // If search query provided, use search function
    if (searchQuery) {
      careers = await searchCareers(searchQuery);
    } else {
      // Otherwise, fetch with filters
      careers = await getAllCareers({
        sector,
        demandLevel,
        trending,
        limit,
      });
    }

    return NextResponse.json(careers, { status: 200 });
  } catch (error) {
    console.error('Error fetching careers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch careers' },
      { status: 500 }
    );
  }
}

