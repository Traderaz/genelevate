/**
 * Firebase Performance Optimization Utilities
 * Implements pagination, batching, caching, and query optimization
 */

import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter, 
  getDocs, 
  getDoc,
  doc,
  writeBatch,
  DocumentSnapshot,
  QueryConstraint,
  Timestamp,
  enableNetwork,
  disableNetwork
} from 'firebase/firestore';
import { db } from './firebase';

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 100; // Maximum number of cached queries

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  size: number; // Estimated size in bytes
}

class FirebaseCache {
  private cache = new Map<string, CacheEntry<any>>();
  private totalSize = 0;
  private readonly maxSize = 10 * 1024 * 1024; // 10MB max cache size

  set<T>(key: string, data: T): void {
    const serialized = JSON.stringify(data);
    const size = new Blob([serialized]).size;
    
    // Don't cache if single item is too large (>1MB)
    if (size > 1024 * 1024) {
      console.warn(`Cache item too large (${size} bytes), skipping cache for key: ${key}`);
      return;
    }

    // Evict old entries if cache is full
    while (this.cache.size >= MAX_CACHE_SIZE || this.totalSize + size > this.maxSize) {
      this.evictOldest();
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      size
    });
    this.totalSize += size;
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check if cache entry is expired
    if (Date.now() - entry.timestamp > CACHE_DURATION) {
      this.cache.delete(key);
      this.totalSize -= entry.size;
      return null;
    }

    return entry.data;
  }

  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      const entry = this.cache.get(oldestKey)!;
      this.cache.delete(oldestKey);
      this.totalSize -= entry.size;
    }
  }

  clear(): void {
    this.cache.clear();
    this.totalSize = 0;
  }

  getStats() {
    return {
      size: this.cache.size,
      totalSize: this.totalSize,
      maxSize: this.maxSize
    };
  }
}

const cache = new FirebaseCache();

// Pagination utilities
export interface PaginationOptions {
  pageSize?: number;
  lastDoc?: DocumentSnapshot;
}

export interface PaginatedResult<T> {
  data: T[];
  lastDoc: DocumentSnapshot | null;
  hasMore: boolean;
  totalEstimate?: number;
}

/**
 * Paginated query with caching and size optimization
 */
export async function getPaginatedData<T>(
  collectionName: string,
  constraints: QueryConstraint[] = [],
  options: PaginationOptions = {},
  transform?: (doc: any) => T
): Promise<PaginatedResult<T>> {
  const { pageSize = 20, lastDoc } = options;
  
  // Ensure page size doesn't exceed safe limits
  const safePageSize = Math.min(pageSize, 50);
  
  // Build cache key
  const cacheKey = `paginated_${collectionName}_${JSON.stringify(constraints)}_${lastDoc?.id || 'first'}_${safePageSize}`;
  
  // Check cache first
  const cached = cache.get<PaginatedResult<T>>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    // Build query with pagination
    const queryConstraints = [...constraints];
    if (lastDoc) {
      queryConstraints.push(startAfter(lastDoc));
    }
    queryConstraints.push(limit(safePageSize + 1)); // +1 to check if there are more

    const q = query(collection(db, collectionName), ...queryConstraints);
    const snapshot = await getDocs(q);

    // Check if result size is reasonable (under 1MB)
    const estimatedSize = snapshot.docs.reduce((size, doc) => {
      return size + JSON.stringify(doc.data()).length;
    }, 0);

    if (estimatedSize > 1024 * 1024) {
      console.warn(`Query result size (${estimatedSize} bytes) exceeds 1MB limit for collection: ${collectionName}`);
    }

    const docs = snapshot.docs;
    const hasMore = docs.length > safePageSize;
    const data = docs.slice(0, safePageSize);

    const result: PaginatedResult<T> = {
      data: data.map(doc => {
        const docData = { id: doc.id, ...doc.data() };
        return transform ? transform(docData) : docData as T;
      }),
      lastDoc: data.length > 0 ? data[data.length - 1] : null,
      hasMore,
      totalEstimate: snapshot.size
    };

    // Cache the result
    cache.set(cacheKey, result);
    
    return result;
  } catch (error) {
    console.error(`Error in paginated query for ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Batched write operations with size limits
 */
export class BatchWriter {
  private batch = writeBatch(db);
  private operationCount = 0;
  private readonly maxOperations = 500; // Firestore limit is 500

  async set(docRef: any, data: any): Promise<void> {
    if (this.operationCount >= this.maxOperations) {
      await this.commit();
      this.batch = writeBatch(db);
      this.operationCount = 0;
    }

    this.batch.set(docRef, data);
    this.operationCount++;
  }

  async update(docRef: any, data: any): Promise<void> {
    if (this.operationCount >= this.maxOperations) {
      await this.commit();
      this.batch = writeBatch(db);
      this.operationCount = 0;
    }

    this.batch.update(docRef, data);
    this.operationCount++;
  }

  async delete(docRef: any): Promise<void> {
    if (this.operationCount >= this.maxOperations) {
      await this.commit();
      this.batch = writeBatch(db);
      this.operationCount = 0;
    }

    this.batch.delete(docRef);
    this.operationCount++;
  }

  async commit(): Promise<void> {
    if (this.operationCount > 0) {
      await this.batch.commit();
      this.operationCount = 0;
    }
  }

  getOperationCount(): number {
    return this.operationCount;
  }
}

/**
 * Optimized single document fetch with caching
 */
export async function getDocumentWithCache<T>(
  collectionName: string,
  docId: string,
  transform?: (data: any) => T
): Promise<T | null> {
  const cacheKey = `doc_${collectionName}_${docId}`;
  
  // Check cache first
  const cached = cache.get<T>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = { id: docSnap.id, ...docSnap.data() };
    const result = transform ? transform(data) : data as T;

    // Cache the result
    cache.set(cacheKey, result);
    
    return result;
  } catch (error) {
    console.error(`Error fetching document ${docId} from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Optimized query with automatic pagination and caching
 */
export async function getOptimizedQuery<T>(
  collectionName: string,
  constraints: QueryConstraint[],
  options: {
    maxResults?: number;
    enableCache?: boolean;
    transform?: (doc: any) => T;
  } = {}
): Promise<T[]> {
  const { maxResults = 100, enableCache = true, transform } = options;
  
  // Build cache key
  const cacheKey = enableCache ? `query_${collectionName}_${JSON.stringify(constraints)}_${maxResults}` : null;
  
  // Check cache first
  if (cacheKey && enableCache) {
    const cached = cache.get<T[]>(cacheKey);
    if (cached) {
      return cached;
    }
  }

  try {
    // Ensure we don't exceed reasonable limits
    const safeLimit = Math.min(maxResults, 1000);
    const queryConstraints = [...constraints, limit(safeLimit)];

    const q = query(collection(db, collectionName), ...queryConstraints);
    const snapshot = await getDocs(q);

    // Check result size
    const estimatedSize = snapshot.docs.reduce((size, doc) => {
      return size + JSON.stringify(doc.data()).length;
    }, 0);

    if (estimatedSize > 1024 * 1024) {
      console.warn(`Query result size (${estimatedSize} bytes) exceeds 1MB limit for collection: ${collectionName}`);
    }

    const result = snapshot.docs.map(doc => {
      const docData = { id: doc.id, ...doc.data() };
      return transform ? transform(docData) : docData as T;
    });

    // Cache the result
    if (cacheKey && enableCache) {
      cache.set(cacheKey, result);
    }
    
    return result;
  } catch (error) {
    console.error(`Error in optimized query for ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Network optimization utilities
 */
export const NetworkOptimizer = {
  async enableOfflineMode(): Promise<void> {
    try {
      await disableNetwork(db);
      console.log('Offline mode enabled');
    } catch (error) {
      console.error('Error enabling offline mode:', error);
    }
  },

  async enableOnlineMode(): Promise<void> {
    try {
      await enableNetwork(db);
      console.log('Online mode enabled');
    } catch (error) {
      console.error('Error enabling online mode:', error);
    }
  }
};

/**
 * Cache management utilities
 */
export const CacheManager = {
  clear: () => cache.clear(),
  getStats: () => cache.getStats(),
  
  // Preload commonly accessed data
  async preloadUserData(userId: string): Promise<void> {
    try {
      // Preload user profile
      await getDocumentWithCache('users', userId);
      
      // Preload recent course progress
      await getPaginatedData(
        'courseProgress',
        [where('userId', '==', userId), orderBy('lastAccessed', 'desc')],
        { pageSize: 10 }
      );
      
      // Preload recent achievements
      await getPaginatedData(
        'userAchievements',
        [where('userId', '==', userId), orderBy('unlockedAt', 'desc')],
        { pageSize: 10 }
      );
    } catch (error) {
      console.error('Error preloading user data:', error);
    }
  }
};

// Export cache instance for debugging
export { cache as FirebaseCache };
