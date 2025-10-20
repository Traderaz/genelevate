import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/**
 * Cloud Function: Refresh Industry News
 * 
 * Scheduled to run daily at 6:00 AM UTC
 * Fetches latest industry news from external APIs and updates Firestore
 * 
 * In production, this would integrate with:
 * - News API (newsapi.org)
 * - RSS feeds from industry publications
 * - Job board APIs (Indeed, LinkedIn, etc.)
 */

interface NewsArticle {
  title: string;
  source: string;
  category: string;
  excerpt: string;
  url: string;
  publishedAt: admin.firestore.Timestamp;
  imageUrl?: string;
  trending: boolean;
  sector: string;
  location?: string;
}

interface CareerData {
  title: string;
  sector: string;
  description: string;
  salaryRange: string;
  growthRate: string;
  education: string;
  location: string;
  skills: string[];
  trending: boolean;
  demandLevel: 'high' | 'medium' | 'low';
  lastUpdated: admin.firestore.Timestamp;
}

/**
 * Scheduled function to refresh industry news daily
 */
export const refreshIndustryNews = functions.pubsub
  .schedule('0 6 * * *') // Run daily at 6:00 AM UTC
  .timeZone('Europe/London')
  .onRun(async (context) => {
    const db = admin.firestore();
    
    try {
      console.log('Starting daily industry news refresh...');
      
      // In production, fetch from external APIs
      // For now, we'll use mock data to demonstrate the structure
      const newsArticles = await fetchNewsFromAPIs();
      
      // Batch write to Firestore
      const batch = db.batch();
      const newsCollection = db.collection('industryNews');
      
      // Delete old news (older than 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const oldNewsSnapshot = await newsCollection
        .where('publishedAt', '<', admin.firestore.Timestamp.fromDate(thirtyDaysAgo))
        .get();
      
      console.log(`Deleting ${oldNewsSnapshot.size} old news articles...`);
      oldNewsSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      // Add new news articles
      console.log(`Adding ${newsArticles.length} new news articles...`);
      newsArticles.forEach(article => {
        const docRef = newsCollection.doc();
        batch.set(docRef, {
          ...article,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      });
      
      await batch.commit();
      
      console.log('Industry news refresh completed successfully');
      
      // Update career data trends
      await updateCareerTrends();
      
      return { success: true, articlesAdded: newsArticles.length };
    } catch (error) {
      console.error('Error refreshing industry news:', error);
      throw error;
    }
  });

/**
 * Fetch news from external APIs
 * In production, this would call real news APIs
 */
async function fetchNewsFromAPIs(): Promise<NewsArticle[]> {
  // Mock implementation - replace with real API calls
  // Example APIs to integrate:
  // - News API: https://newsapi.org/
  // - The Guardian API
  // - RSS feeds from TechCrunch, Wired, etc.
  
  const mockNews: NewsArticle[] = [
    {
      title: 'AI Revolution: How Machine Learning is Transforming Industries',
      source: 'Tech Insights',
      category: 'Technology',
      sector: 'Technology',
      excerpt: 'Artificial intelligence is reshaping how businesses operate, creating new opportunities for tech professionals...',
      url: 'https://example.com/ai-revolution',
      publishedAt: admin.firestore.Timestamp.now(),
      trending: true,
    },
    {
      title: 'UK Job Market Shows Strong Growth in Green Energy Sector',
      source: 'Career News',
      category: 'Engineering',
      sector: 'Engineering',
      excerpt: 'The renewable energy sector is experiencing unprecedented growth, with thousands of new positions opening...',
      url: 'https://example.com/green-energy-growth',
      publishedAt: admin.firestore.Timestamp.now(),
      location: 'UK',
      trending: true,
    },
    {
      title: 'Remote Work Trends: What Students Need to Know',
      source: 'Future of Work',
      category: 'General',
      sector: 'General',
      excerpt: 'As remote work becomes the norm, understanding digital collaboration tools is essential for career success...',
      url: 'https://example.com/remote-work-trends',
      publishedAt: admin.firestore.Timestamp.now(),
      trending: false,
    },
  ];
  
  return mockNews;
}

/**
 * Update career trends based on recent news and job market data
 */
async function updateCareerTrends(): Promise<void> {
  const db = admin.firestore();
  
  try {
    console.log('Updating career trends...');
    
    // Fetch recent news to identify trending sectors
    const recentNews = await db.collection('industryNews')
      .where('trending', '==', true)
      .orderBy('publishedAt', 'desc')
      .limit(50)
      .get();
    
    // Count mentions by sector
    const sectorCounts: Record<string, number> = {};
    recentNews.docs.forEach(doc => {
      const data = doc.data();
      const sector = data.sector || 'General';
      sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
    });
    
    // Update trending status for careers in hot sectors
    const trendingSectors = Object.entries(sectorCounts)
      .filter(([_, count]) => count >= 3)
      .map(([sector, _]) => sector);
    
    console.log('Trending sectors:', trendingSectors);
    
    // Update careers collection
    const careersSnapshot = await db.collection('careers').get();
    const batch = db.batch();
    
    careersSnapshot.docs.forEach(doc => {
      const career = doc.data();
      const isTrending = trendingSectors.includes(career.sector);
      
      if (career.trending !== isTrending) {
        batch.update(doc.ref, {
          trending: isTrending,
          lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    });
    
    await batch.commit();
    console.log('Career trends updated successfully');
  } catch (error) {
    console.error('Error updating career trends:', error);
    throw error;
  }
}

/**
 * HTTP endpoint to manually trigger news refresh (for testing)
 */
export const manualRefreshIndustryNews = functions.https.onCall(async (data, context) => {
  // Verify admin authentication
  if (!context.auth || !context.auth.token.role || context.auth.token.role !== 'admin') {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only administrators can manually refresh industry news'
    );
  }
  
  const db = admin.firestore();
  
  try {
    console.log('Manual industry news refresh triggered by:', context.auth.uid);
    
    const newsArticles = await fetchNewsFromAPIs();
    
    const batch = db.batch();
    const newsCollection = db.collection('industryNews');
    
    newsArticles.forEach(article => {
      const docRef = newsCollection.doc();
      batch.set(docRef, {
        ...article,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });
    
    await batch.commit();
    await updateCareerTrends();
    
    return { success: true, articlesAdded: newsArticles.length };
  } catch (error) {
    console.error('Error in manual refresh:', error);
    throw new functions.https.HttpsError('internal', 'Failed to refresh industry news');
  }
});

/**
 * Adapter pattern for external news sources
 * Allows easy integration of multiple news providers
 */
interface NewsAdapter {
  fetchNews(params: NewsSearchParams): Promise<NewsArticle[]>;
}

interface NewsSearchParams {
  sectors?: string[];
  locations?: string[];
  keywords?: string[];
  fromDate?: Date;
  limit?: number;
}

/**
 * Example adapter for News API
 */
class NewsAPIAdapter implements NewsAdapter {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async fetchNews(params: NewsSearchParams): Promise<NewsArticle[]> {
    // In production, implement actual API call
    // const response = await fetch(`https://newsapi.org/v2/everything?q=${params.keywords}&apiKey=${this.apiKey}`);
    // const data = await response.json();
    // return this.transformToNewsArticles(data.articles);
    
    return []; // Placeholder
  }
}

/**
 * Example adapter for RSS feeds
 */
class RSSFeedAdapter implements NewsAdapter {
  private feedUrls: string[];
  
  constructor(feedUrls: string[]) {
    this.feedUrls = feedUrls;
  }
  
  async fetchNews(params: NewsSearchParams): Promise<NewsArticle[]> {
    // In production, implement RSS parsing
    // Use libraries like 'rss-parser' to parse feeds
    
    return []; // Placeholder
  }
}
