import { NextRequest, NextResponse } from 'next/server';
import { fetchAllNews, getNewsByCategory } from '@/lib/services/news-parser';
import type { NewsArticle } from '@/types/news';

// Simple in-memory cache
let newsCache: {
  data: NewsArticle[];
  timestamp: number;
  category: string;
} | null = null;

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * GET /api/news - Fetch industry news
 * 
 * Query params:
 * - category: Filter by category (Technology, Healthcare, etc.)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || 'all';

    // Check cache
    const now = Date.now();
    if (
      newsCache &&
      newsCache.category === category &&
      now - newsCache.timestamp < CACHE_DURATION
    ) {
      console.log(`📰 Serving cached news for category: ${category}`);
      return NextResponse.json({
        articles: newsCache.data,
        cached: true,
        timestamp: new Date(newsCache.timestamp).toISOString(),
      });
    }

    console.log(`📡 Fetching fresh news for category: ${category}`);

    // Fetch fresh news
    const articles = category === 'all'
      ? await fetchAllNews()
      : await getNewsByCategory(category);

    // Update cache
    newsCache = {
      data: articles,
      timestamp: now,
      category,
    };

    return NextResponse.json({
      articles,
      cached: false,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    
    // Return cached data if available, even if stale
    if (newsCache) {
      console.log('⚠️ Error fetching news, returning stale cache');
      return NextResponse.json({
        articles: newsCache.data,
        cached: true,
        stale: true,
        timestamp: new Date(newsCache.timestamp).toISOString(),
      });
    }

    return NextResponse.json(
      {
        error: 'Failed to fetch news',
        articles: [],
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

