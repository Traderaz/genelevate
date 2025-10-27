import { NextRequest, NextResponse } from 'next/server';
import { where, orderBy } from 'firebase/firestore';
import { getPaginatedData, getOptimizedQuery } from '@/lib/firebase-performance';
import { createRateLimiter, RateLimitPresets } from '@/lib/rate-limiter';
import { getAuth } from 'firebase-admin/auth';

// Rate limiting middleware
const rateLimiter = createRateLimiter({
  ...RateLimitPresets.api,
  keyGenerator: (req) => {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : req.ip || 'unknown';
    return `courses_${ip}`;
  }
});

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = await new Promise<NextResponse | null>((resolve) => {
      rateLimiter(request as any, {
        status: (code: number) => ({ json: (data: any) => resolve(NextResponse.json(data, { status: code })) }),
        setHeader: () => {},
      } as any, () => resolve(null));
    });

    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50); // Max 50 per page
    const subject = searchParams.get('subject');
    const difficulty = searchParams.get('difficulty');
    const yearGroup = searchParams.get('yearGroup');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build query constraints
    const constraints = [
      where('published', '==', true)
    ];

    if (subject) {
      constraints.push(where('subject', '==', subject));
    }

    if (difficulty) {
      constraints.push(where('difficulty', '==', difficulty));
    }

    if (yearGroup) {
      constraints.push(where('yearGroups', 'array-contains', yearGroup));
    }

    // Add ordering
    if (sortBy === 'rating') {
      constraints.push(orderBy('rating', sortOrder as 'asc' | 'desc'));
    } else if (sortBy === 'enrollmentCount') {
      constraints.push(orderBy('enrollmentCount', sortOrder as 'asc' | 'desc'));
    } else {
      constraints.push(orderBy('createdAt', sortOrder as 'asc' | 'desc'));
    }

    // Use paginated query for better performance
    const result = await getPaginatedData(
      'courses',
      constraints,
      { pageSize: limit },
      (doc) => ({
        id: doc.id,
        title: doc.title,
        description: doc.shortDescription || doc.description?.substring(0, 200),
        thumbnail: doc.thumbnail,
        instructor: {
          name: doc.instructor?.name,
          avatar: doc.instructor?.avatar
        },
        duration: doc.duration,
        enrollmentCount: doc.enrollmentCount || 0,
        rating: doc.rating || 0,
        reviewCount: doc.reviewCount || 0,
        difficulty: doc.difficulty,
        subject: doc.subject,
        yearGroups: doc.yearGroups || [],
        totalLessons: doc.totalLessons || 0,
        price: doc.price || 0,
        isPremium: doc.isPremium || false,
        createdAt: doc.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      })
    );

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: {
        page,
        limit,
        hasMore: result.hasMore,
        total: result.totalEstimate
      }
    });

  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch courses',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Search endpoint with full-text search capabilities
export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = await new Promise<NextResponse | null>((resolve) => {
      rateLimiter(request as any, {
        status: (code: number) => ({ json: (data: any) => resolve(NextResponse.json(data, { status: code })) }),
        setHeader: () => {},
      } as any, () => resolve(null));
    });

    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await request.json();
    const { query: searchQuery, filters = {}, limit: requestLimit = 20 } = body;

    if (!searchQuery || searchQuery.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Search query must be at least 2 characters' },
        { status: 400 }
      );
    }

    const limit = Math.min(requestLimit, 50); // Max 50 results

    // Build constraints for search
    const constraints = [
      where('published', '==', true)
    ];

    // Add filters
    if (filters.subject) {
      constraints.push(where('subject', '==', filters.subject));
    }

    if (filters.difficulty) {
      constraints.push(where('difficulty', '==', filters.difficulty));
    }

    if (filters.yearGroup) {
      constraints.push(where('yearGroups', 'array-contains', filters.yearGroup));
    }

    // For now, we'll do a simple tag-based search
    // In production, you'd want to use Algolia or similar for full-text search
    if (searchQuery) {
      // Convert search query to lowercase tags
      const searchTags = searchQuery.toLowerCase().split(' ').filter(tag => tag.length > 1);
      if (searchTags.length > 0) {
        constraints.push(where('tags', 'array-contains-any', searchTags));
      }
    }

    constraints.push(orderBy('rating', 'desc'));

    const results = await getOptimizedQuery(
      'courses',
      constraints,
      {
        maxResults: limit,
        enableCache: false, // Don't cache search results
        transform: (doc) => ({
          id: doc.id,
          title: doc.title,
          description: doc.shortDescription || doc.description?.substring(0, 200),
          thumbnail: doc.thumbnail,
          instructor: {
            name: doc.instructor?.name,
            avatar: doc.instructor?.avatar
          },
          duration: doc.duration,
          enrollmentCount: doc.enrollmentCount || 0,
          rating: doc.rating || 0,
          reviewCount: doc.reviewCount || 0,
          difficulty: doc.difficulty,
          subject: doc.subject,
          yearGroups: doc.yearGroups || [],
          totalLessons: doc.totalLessons || 0,
          price: doc.price || 0,
          isPremium: doc.isPremium || false,
          relevanceScore: calculateRelevanceScore(doc, searchQuery)
        })
      }
    );

    // Sort by relevance score
    results.sort((a, b) => (b as any).relevanceScore - (a as any).relevanceScore);

    return NextResponse.json({
      success: true,
      data: results,
      query: searchQuery,
      total: results.length
    });

  } catch (error) {
    console.error('Error searching courses:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Search failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function calculateRelevanceScore(doc: any, query: string): number {
  let score = 0;
  const queryLower = query.toLowerCase();
  
  // Title match (highest weight)
  if (doc.title?.toLowerCase().includes(queryLower)) {
    score += 10;
  }
  
  // Description match
  if (doc.description?.toLowerCase().includes(queryLower)) {
    score += 5;
  }
  
  // Subject match
  if (doc.subject?.toLowerCase().includes(queryLower)) {
    score += 3;
  }
  
  // Tag matches
  if (doc.tags) {
    const matchingTags = doc.tags.filter((tag: string) => 
      tag.toLowerCase().includes(queryLower)
    );
    score += matchingTags.length * 2;
  }
  
  // Boost popular courses
  score += (doc.rating || 0) * 0.5;
  score += Math.log(Math.max(1, doc.enrollmentCount || 0)) * 0.1;
  
  return score;
}
