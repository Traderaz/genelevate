/**
 * Rate Limiting Utilities for API Functions
 * Implements token bucket and sliding window algorithms
 */

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  keyGenerator?: (req: any) => string; // Function to generate unique keys
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

interface TokenBucketConfig {
  capacity: number; // Maximum tokens in bucket
  refillRate: number; // Tokens added per second
  keyGenerator?: (req: any) => string;
}

// In-memory store for rate limiting (use Redis in production)
class MemoryStore {
  private store = new Map<string, any>();
  private timers = new Map<string, NodeJS.Timeout>();

  set(key: string, value: any, ttl?: number): void {
    this.store.set(key, value);
    
    if (ttl) {
      // Clear existing timer
      const existingTimer = this.timers.get(key);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }
      
      // Set new timer
      const timer = setTimeout(() => {
        this.store.delete(key);
        this.timers.delete(key);
      }, ttl);
      
      this.timers.set(key, timer);
    }
  }

  get(key: string): any {
    return this.store.get(key);
  }

  delete(key: string): void {
    this.store.delete(key);
    const timer = this.timers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(key);
    }
  }

  clear(): void {
    this.store.clear();
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
  }

  size(): number {
    return this.store.size;
  }
}

const store = new MemoryStore();

/**
 * Sliding Window Rate Limiter
 */
export class SlidingWindowRateLimiter {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  async checkLimit(identifier: string): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const key = `sliding_${identifier}`;
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    // Get existing requests
    let requests: number[] = store.get(key) || [];
    
    // Remove requests outside the current window
    requests = requests.filter(timestamp => timestamp > windowStart);

    const remaining = Math.max(0, this.config.maxRequests - requests.length);
    const allowed = requests.length < this.config.maxRequests;

    if (allowed) {
      // Add current request
      requests.push(now);
      store.set(key, requests, this.config.windowMs);
    }

    const resetTime = requests.length > 0 ? requests[0] + this.config.windowMs : now + this.config.windowMs;

    return {
      allowed,
      remaining,
      resetTime
    };
  }
}

/**
 * Token Bucket Rate Limiter
 */
export class TokenBucketRateLimiter {
  private config: TokenBucketConfig;

  constructor(config: TokenBucketConfig) {
    this.config = config;
  }

  async checkLimit(identifier: string): Promise<{ allowed: boolean; tokens: number; refillTime: number }> {
    const key = `bucket_${identifier}`;
    const now = Date.now();

    // Get existing bucket
    let bucket = store.get(key) || {
      tokens: this.config.capacity,
      lastRefill: now
    };

    // Calculate tokens to add based on time elapsed
    const timePassed = (now - bucket.lastRefill) / 1000; // Convert to seconds
    const tokensToAdd = Math.floor(timePassed * this.config.refillRate);
    
    if (tokensToAdd > 0) {
      bucket.tokens = Math.min(this.config.capacity, bucket.tokens + tokensToAdd);
      bucket.lastRefill = now;
    }

    const allowed = bucket.tokens > 0;
    
    if (allowed) {
      bucket.tokens--;
    }

    // Store updated bucket
    store.set(key, bucket, 60 * 60 * 1000); // 1 hour TTL

    const refillTime = bucket.tokens < this.config.capacity 
      ? now + ((this.config.capacity - bucket.tokens) / this.config.refillRate * 1000)
      : now;

    return {
      allowed,
      tokens: bucket.tokens,
      refillTime
    };
  }
}

/**
 * Rate Limiting Middleware for Next.js API Routes
 */
export function createRateLimiter(config: RateLimitConfig) {
  const limiter = new SlidingWindowRateLimiter(config);

  return async function rateLimitMiddleware(req: any, res: any, next?: () => void) {
    const identifier = config.keyGenerator ? config.keyGenerator(req) : getClientIdentifier(req);
    
    try {
      const result = await limiter.checkLimit(identifier);

      // Set rate limit headers
      res.setHeader('X-RateLimit-Limit', config.maxRequests);
      res.setHeader('X-RateLimit-Remaining', result.remaining);
      res.setHeader('X-RateLimit-Reset', new Date(result.resetTime).toISOString());

      if (!result.allowed) {
        return res.status(429).json({
          error: 'Too Many Requests',
          message: `Rate limit exceeded. Try again after ${new Date(result.resetTime).toISOString()}`,
          retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000)
        });
      }

      if (next) {
        next();
      }
    } catch (error) {
      console.error('Rate limiting error:', error);
      // Allow request to proceed if rate limiting fails
      if (next) {
        next();
      }
    }
  };
}

/**
 * Token Bucket Middleware for Next.js API Routes
 */
export function createTokenBucketLimiter(config: TokenBucketConfig) {
  const limiter = new TokenBucketRateLimiter(config);

  return async function tokenBucketMiddleware(req: any, res: any, next?: () => void) {
    const identifier = config.keyGenerator ? config.keyGenerator(req) : getClientIdentifier(req);
    
    try {
      const result = await limiter.checkLimit(identifier);

      // Set rate limit headers
      res.setHeader('X-RateLimit-Tokens', result.tokens);
      res.setHeader('X-RateLimit-Capacity', config.capacity);
      res.setHeader('X-RateLimit-Refill-Rate', config.refillRate);

      if (!result.allowed) {
        return res.status(429).json({
          error: 'Rate Limit Exceeded',
          message: `No tokens available. Tokens refill at ${config.refillRate} per second`,
          retryAfter: Math.ceil((result.refillTime - Date.now()) / 1000)
        });
      }

      if (next) {
        next();
      }
    } catch (error) {
      console.error('Token bucket limiting error:', error);
      // Allow request to proceed if rate limiting fails
      if (next) {
        next();
      }
    }
  };
}

/**
 * Get client identifier for rate limiting
 */
function getClientIdentifier(req: any): string {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwarded = req.headers['x-forwarded-for'];
  const realIp = req.headers['x-real-ip'];
  const ip = forwarded ? forwarded.split(',')[0] : realIp || req.connection?.remoteAddress || 'unknown';
  
  // Include user agent for more specific limiting
  const userAgent = req.headers['user-agent'] || 'unknown';
  
  return `${ip}_${Buffer.from(userAgent).toString('base64').slice(0, 20)}`;
}

/**
 * Predefined rate limit configurations
 */
export const RateLimitPresets = {
  // Strict limits for authentication endpoints
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 attempts per 15 minutes
  },
  
  // Moderate limits for API endpoints
  api: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60, // 60 requests per minute
  },
  
  // Lenient limits for general usage
  general: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100, // 100 requests per minute
  },
  
  // Very strict for expensive operations
  expensive: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10, // 10 requests per hour
  },

  // Token bucket presets
  tokenBuckets: {
    // Burst-friendly for real-time features
    realtime: {
      capacity: 50,
      refillRate: 1, // 1 token per second
    },
    
    // Conservative for file uploads
    uploads: {
      capacity: 5,
      refillRate: 0.1, // 1 token per 10 seconds
    },
    
    // Moderate for search/queries
    search: {
      capacity: 20,
      refillRate: 0.5, // 1 token per 2 seconds
    }
  }
};

/**
 * Rate limiting utilities
 */
export const RateLimitUtils = {
  // Clear all rate limit data for a specific identifier
  clearLimits: (identifier: string) => {
    store.delete(`sliding_${identifier}`);
    store.delete(`bucket_${identifier}`);
  },
  
  // Get current rate limit status
  getStatus: async (identifier: string, config: RateLimitConfig) => {
    const limiter = new SlidingWindowRateLimiter(config);
    return await limiter.checkLimit(identifier);
  },
  
  // Get store statistics
  getStats: () => ({
    size: store.size(),
    // Add more stats as needed
  }),
  
  // Clear all rate limit data (use with caution)
  clearAll: () => store.clear()
};

// Export store for testing/debugging
export { store as RateLimitStore };
