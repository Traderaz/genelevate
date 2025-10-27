# Firebase Performance & Scale Deployment Guide

This guide covers the implementation of performance optimizations for the GenElevate application, ensuring scalability and optimal Firebase usage.

## 🚀 Performance Features Implemented

### 1. Paginated Queries
- **Location**: `src/lib/firebase-performance.ts`
- **Function**: `getPaginatedData()`
- **Benefits**: Handles large datasets efficiently, prevents memory issues
- **Usage**: Automatically limits page size to 50 items max, provides `hasMore` indicator

### 2. Batched Writes
- **Location**: `src/lib/firebase-performance.ts`
- **Class**: `BatchWriter`
- **Benefits**: Reduces write operations, improves performance for bulk updates
- **Usage**: Automatically commits when reaching 500 operations (Firestore limit)

### 3. Intelligent Caching
- **Location**: `src/lib/firebase-performance.ts`
- **Class**: `FirebaseCache`
- **Features**:
  - 5-minute TTL for cached data
  - 10MB maximum cache size
  - Automatic eviction of old entries
  - Size-based filtering (won't cache items >1MB)

### 4. Query Optimization
- **Location**: `src/lib/firebase-performance.ts`
- **Function**: `getOptimizedQuery()`
- **Features**:
  - Automatic result size monitoring
  - Warns when queries exceed 1MB
  - Built-in caching and transformation
  - Safe limits (max 1000 results per query)

### 5. Rate Limiting
- **Location**: `src/lib/rate-limiter.ts`
- **Algorithms**: Sliding Window & Token Bucket
- **Presets**:
  - **Auth endpoints**: 5 requests per 15 minutes
  - **API endpoints**: 60 requests per minute
  - **General usage**: 100 requests per minute
  - **Expensive operations**: 10 requests per hour

### 6. Performance Monitoring
- **Location**: `src/lib/performance-monitor.ts`
- **Features**:
  - Query latency tracking
  - Cache hit rate monitoring
  - Network quality detection
  - Automatic performance recommendations

## 📊 Firestore Indexes

### Required Indexes (`firestore.indexes.json`)

```bash
# Deploy indexes to Firebase
firebase deploy --only firestore:indexes
```

**Key Indexes Created**:
- `courseProgress`: userId + status + lastAccessed
- `webinars`: startDate + status (for upcoming webinars)
- `userAchievements`: userId + unlockedAt
- `courses`: published + subject + createdAt
- `notifications`: userId + read + createdAt

## 🔧 Implementation Examples

### 1. Using Paginated Queries

```typescript
import { getPaginatedData } from '@/lib/firebase-performance';
import { where, orderBy } from 'firebase/firestore';

const result = await getPaginatedData(
  'courses',
  [
    where('published', '==', true),
    orderBy('createdAt', 'desc')
  ],
  { pageSize: 20 },
  (doc) => ({
    id: doc.id,
    title: doc.title,
    // ... transform data
  })
);

console.log(result.data); // Array of courses
console.log(result.hasMore); // Boolean for pagination
console.log(result.lastDoc); // For next page
```

### 2. Using Batched Writes

```typescript
import { BatchWriter } from '@/lib/firebase-performance';
import { doc } from 'firebase/firestore';

const batchWriter = new BatchWriter();

// Add multiple operations
await batchWriter.set(doc(db, 'users', 'user1'), userData1);
await batchWriter.update(doc(db, 'users', 'user2'), userData2);
await batchWriter.delete(doc(db, 'users', 'user3'));

// Commit all operations
await batchWriter.commit();
```

### 3. Using Rate Limiting in API Routes

```typescript
import { createRateLimiter, RateLimitPresets } from '@/lib/rate-limiter';

const rateLimiter = createRateLimiter(RateLimitPresets.api);

export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = await new Promise<NextResponse | null>((resolve) => {
    rateLimiter(request as any, {
      status: (code: number) => ({ 
        json: (data: any) => resolve(NextResponse.json(data, { status: code })) 
      }),
      setHeader: () => {},
    } as any, () => resolve(null));
  });

  if (rateLimitResponse) {
    return rateLimitResponse; // Rate limit exceeded
  }

  // Continue with API logic...
}
```

### 4. Performance Monitoring

```typescript
import { performanceMonitor, trackPerformance } from '@/lib/performance-monitor';

// Manual tracking
const endTiming = performanceMonitor.startTiming('fetchUserData');
try {
  const data = await fetchData();
  endTiming(true, { dataSize: JSON.stringify(data).length });
} catch (error) {
  endTiming(false, { error: error.message });
}

// Decorator tracking
class DataService {
  @trackPerformance('DataService')
  async fetchCourses() {
    // Method automatically tracked
  }
}

// Get analytics
const analytics = performanceMonitor.getAnalytics();
console.log(`Cache hit rate: ${analytics.cacheHitRate}%`);
console.log(`Average latency: ${analytics.averageLatency}ms`);
```

## 📈 Performance Metrics & Limits

### Query Size Limits
- **Maximum query result**: 1MB (monitored and warned)
- **Maximum page size**: 50 items
- **Cache item limit**: 1MB per item
- **Total cache size**: 10MB

### Rate Limits
- **Authentication**: 5 attempts per 15 minutes
- **API calls**: 60 per minute
- **Search queries**: 20 per minute
- **File uploads**: 5 per hour

### Cache Configuration
- **TTL**: 5 minutes for most data
- **Max entries**: 100 cached queries
- **Eviction**: LRU (Least Recently Used)

## 🚀 Deployment Steps

### 1. Deploy Firestore Indexes
```bash
firebase deploy --only firestore:indexes
```

### 2. Update Environment Variables
```env
# Add to .env.local
NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING=true
NEXT_PUBLIC_CACHE_DURATION=300000  # 5 minutes
NEXT_PUBLIC_MAX_QUERY_SIZE=1048576  # 1MB
```

### 3. Monitor Performance
```typescript
// Add to your app initialization
import { performanceMonitor } from '@/lib/performance-monitor';

// Check performance every hour
setInterval(() => {
  const recommendations = performanceMonitor.getRecommendations();
  if (recommendations.length > 0) {
    console.warn('Performance recommendations:', recommendations);
  }
}, 60 * 60 * 1000);
```

## 🔍 Monitoring & Alerts

### Key Metrics to Monitor
1. **Query Latency**: Should be <1s average
2. **Cache Hit Rate**: Should be >50%
3. **Error Rate**: Should be <5%
4. **Query Size**: Should be <1MB
5. **Rate Limit Hits**: Monitor 429 responses

### Performance Dashboard
```typescript
// Get comprehensive performance report
const analytics = performanceMonitor.getAnalytics(24 * 60 * 60 * 1000); // Last 24h

console.log({
  totalQueries: analytics.totalQueries,
  averageLatency: analytics.averageLatency,
  cacheHitRate: analytics.cacheHitRate,
  errorRate: analytics.errorRate,
  slowQueries: analytics.slowQueries.length,
  largeQueries: analytics.largeQueries.length
});
```

## ⚠️ Important Notes

### Production Considerations
1. **Redis for Rate Limiting**: Replace in-memory store with Redis for production
2. **CDN for Static Assets**: Use Firebase Hosting or Vercel for static content
3. **Database Sharding**: Consider sharding for >100k users
4. **Monitoring Integration**: Integrate with Firebase Performance Monitoring

### Security Considerations
1. **Rate limiting** prevents abuse and DoS attacks
2. **Query size limits** prevent memory exhaustion
3. **Caching** reduces database load but may cache sensitive data
4. **Indexes** improve performance but increase storage costs

### Cost Optimization
1. **Pagination** reduces read costs
2. **Caching** reduces repeated queries
3. **Indexes** improve query performance but add storage cost
4. **Rate limiting** prevents excessive usage

## 🔧 Troubleshooting

### Common Issues
1. **Slow queries**: Check if proper indexes are deployed
2. **High memory usage**: Reduce cache size or page sizes
3. **Rate limit errors**: Adjust rate limits or implement exponential backoff
4. **Cache misses**: Check TTL settings and cache key generation

### Debug Commands
```typescript
// Clear all caches
import { CacheManager } from '@/lib/firebase-performance';
CacheManager.clear();

// Get cache statistics
const stats = CacheManager.getStats();
console.log('Cache size:', stats.size, 'Total size:', stats.totalSize);

// Get rate limit status
import { RateLimitUtils } from '@/lib/rate-limiter';
const status = await RateLimitUtils.getStatus('user123', RateLimitPresets.api);
console.log('Remaining requests:', status.remaining);
```

This implementation ensures your Firebase application scales efficiently while maintaining optimal performance and staying within Firestore's 1MB read limits.
