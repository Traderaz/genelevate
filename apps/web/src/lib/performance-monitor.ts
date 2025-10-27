/**
 * Performance Monitoring and Optimization Utilities
 * Tracks query performance, cache hit rates, and optimization metrics
 */

interface PerformanceMetric {
  operation: string;
  duration: number;
  timestamp: number;
  success: boolean;
  cacheHit?: boolean;
  dataSize?: number;
  error?: string;
}

interface QueryAnalytics {
  totalQueries: number;
  averageLatency: number;
  cacheHitRate: number;
  errorRate: number;
  slowQueries: PerformanceMetric[];
  largeQueries: PerformanceMetric[];
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private readonly maxMetrics = 1000; // Keep last 1000 metrics
  private readonly slowQueryThreshold = 2000; // 2 seconds
  private readonly largeQueryThreshold = 100 * 1024; // 100KB

  // Track a performance metric
  track(metric: PerformanceMetric): void {
    this.metrics.push({
      ...metric,
      timestamp: Date.now()
    });

    // Keep only recent metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }

    // Log warnings for performance issues
    if (metric.duration > this.slowQueryThreshold) {
      console.warn(`Slow query detected: ${metric.operation} took ${metric.duration}ms`);
    }

    if (metric.dataSize && metric.dataSize > this.largeQueryThreshold) {
      console.warn(`Large query result: ${metric.operation} returned ${metric.dataSize} bytes`);
    }
  }

  // Start timing an operation
  startTiming(operation: string): () => void {
    const startTime = performance.now();
    
    return (success: boolean = true, additionalData?: Partial<PerformanceMetric>) => {
      const duration = performance.now() - startTime;
      
      this.track({
        operation,
        duration,
        success,
        timestamp: Date.now(),
        ...additionalData
      });
    };
  }

  // Get analytics for the last period
  getAnalytics(periodMs: number = 60 * 60 * 1000): QueryAnalytics {
    const cutoff = Date.now() - periodMs;
    const recentMetrics = this.metrics.filter(m => m.timestamp > cutoff);

    if (recentMetrics.length === 0) {
      return {
        totalQueries: 0,
        averageLatency: 0,
        cacheHitRate: 0,
        errorRate: 0,
        slowQueries: [],
        largeQueries: []
      };
    }

    const totalQueries = recentMetrics.length;
    const averageLatency = recentMetrics.reduce((sum, m) => sum + m.duration, 0) / totalQueries;
    
    const cacheableQueries = recentMetrics.filter(m => m.cacheHit !== undefined);
    const cacheHits = cacheableQueries.filter(m => m.cacheHit).length;
    const cacheHitRate = cacheableQueries.length > 0 ? (cacheHits / cacheableQueries.length) * 100 : 0;
    
    const errors = recentMetrics.filter(m => !m.success).length;
    const errorRate = (errors / totalQueries) * 100;
    
    const slowQueries = recentMetrics
      .filter(m => m.duration > this.slowQueryThreshold)
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 10);
    
    const largeQueries = recentMetrics
      .filter(m => m.dataSize && m.dataSize > this.largeQueryThreshold)
      .sort((a, b) => (b.dataSize || 0) - (a.dataSize || 0))
      .slice(0, 10);

    return {
      totalQueries,
      averageLatency,
      cacheHitRate,
      errorRate,
      slowQueries,
      largeQueries
    };
  }

  // Get performance recommendations
  getRecommendations(): string[] {
    const analytics = this.getAnalytics();
    const recommendations: string[] = [];

    if (analytics.averageLatency > 1000) {
      recommendations.push('Average query latency is high (>1s). Consider adding indexes or optimizing queries.');
    }

    if (analytics.cacheHitRate < 50) {
      recommendations.push('Cache hit rate is low (<50%). Consider increasing cache duration or preloading data.');
    }

    if (analytics.errorRate > 5) {
      recommendations.push('Error rate is high (>5%). Check network connectivity and query validity.');
    }

    if (analytics.slowQueries.length > 0) {
      recommendations.push(`${analytics.slowQueries.length} slow queries detected. Review query optimization.`);
    }

    if (analytics.largeQueries.length > 0) {
      recommendations.push(`${analytics.largeQueries.length} large queries detected. Consider pagination or field selection.`);
    }

    return recommendations;
  }

  // Clear all metrics
  clear(): void {
    this.metrics = [];
  }

  // Export metrics for analysis
  exportMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Decorator for automatic performance tracking
export function trackPerformance(operation: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const endTiming = performanceMonitor.startTiming(`${operation}.${propertyName}`);
      
      try {
        const result = await method.apply(this, args);
        
        // Estimate result size
        let dataSize: number | undefined;
        try {
          dataSize = new Blob([JSON.stringify(result)]).size;
        } catch {
          // Ignore size calculation errors
        }
        
        endTiming(true, { dataSize });
        return result;
      } catch (error) {
        endTiming(false, { error: error instanceof Error ? error.message : 'Unknown error' });
        throw error;
      }
    };

    return descriptor;
  };
}

// React hook for performance monitoring
export function usePerformanceMonitor() {
  return {
    track: (metric: PerformanceMetric) => performanceMonitor.track(metric),
    startTiming: (operation: string) => performanceMonitor.startTiming(operation),
    getAnalytics: (periodMs?: number) => performanceMonitor.getAnalytics(periodMs),
    getRecommendations: () => performanceMonitor.getRecommendations(),
    clear: () => performanceMonitor.clear()
  };
}

// Query size validator
export function validateQuerySize(data: any, maxSizeBytes: number = 1024 * 1024): boolean {
  try {
    const size = new Blob([JSON.stringify(data)]).size;
    if (size > maxSizeBytes) {
      console.warn(`Query result size (${size} bytes) exceeds limit (${maxSizeBytes} bytes)`);
      return false;
    }
    return true;
  } catch {
    return true; // Allow if we can't calculate size
  }
}

// Network quality detector
export class NetworkQualityDetector {
  private static instance: NetworkQualityDetector;
  private quality: 'fast' | 'slow' | 'offline' = 'fast';
  private listeners: ((quality: 'fast' | 'slow' | 'offline') => void)[] = [];

  static getInstance(): NetworkQualityDetector {
    if (!NetworkQualityDetector.instance) {
      NetworkQualityDetector.instance = new NetworkQualityDetector();
    }
    return NetworkQualityDetector.instance;
  }

  private constructor() {
    this.startMonitoring();
  }

  private startMonitoring(): void {
    // Monitor online/offline status
    window.addEventListener('online', () => this.updateQuality('fast'));
    window.addEventListener('offline', () => this.updateQuality('offline'));

    // Monitor connection quality using performance metrics
    setInterval(() => {
      const analytics = performanceMonitor.getAnalytics(5 * 60 * 1000); // Last 5 minutes
      
      if (analytics.totalQueries > 0) {
        if (analytics.averageLatency > 3000 || analytics.errorRate > 20) {
          this.updateQuality('slow');
        } else if (analytics.averageLatency < 1000 && analytics.errorRate < 5) {
          this.updateQuality('fast');
        }
      }
    }, 30000); // Check every 30 seconds
  }

  private updateQuality(newQuality: 'fast' | 'slow' | 'offline'): void {
    if (this.quality !== newQuality) {
      this.quality = newQuality;
      this.listeners.forEach(listener => listener(newQuality));
    }
  }

  getQuality(): 'fast' | 'slow' | 'offline' {
    return this.quality;
  }

  onQualityChange(listener: (quality: 'fast' | 'slow' | 'offline') => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Get recommended settings based on network quality
  getOptimizedSettings(): {
    cacheEnabled: boolean;
    pageSize: number;
    prefetchEnabled: boolean;
    imageQuality: 'high' | 'medium' | 'low';
  } {
    switch (this.quality) {
      case 'fast':
        return {
          cacheEnabled: true,
          pageSize: 50,
          prefetchEnabled: true,
          imageQuality: 'high'
        };
      case 'slow':
        return {
          cacheEnabled: true,
          pageSize: 20,
          prefetchEnabled: false,
          imageQuality: 'medium'
        };
      case 'offline':
        return {
          cacheEnabled: true,
          pageSize: 10,
          prefetchEnabled: false,
          imageQuality: 'low'
        };
    }
  }
}

// Export singleton instance
export const networkQualityDetector = NetworkQualityDetector.getInstance();
