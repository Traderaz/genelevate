import Parser from 'rss-parser';
import type { NewsArticle, NewsSource } from '@/types/news';

/**
 * RSS News Feed Parser
 * Fetches and parses news from multiple UK sources
 */

// UK News RSS Feeds (All free and publicly available)
const NEWS_SOURCES: NewsSource[] = [
  // Technology News
  {
    name: 'BBC Technology',
    url: 'http://feeds.bbci.co.uk/news/technology/rss.xml',
    category: 'Technology',
    enabled: true,
  },
  {
    name: 'The Guardian Tech',
    url: 'https://www.theguardian.com/uk/technology/rss',
    category: 'Technology',
    enabled: true,
  },
  
  // Business & Finance
  {
    name: 'BBC Business',
    url: 'http://feeds.bbci.co.uk/news/business/rss.xml',
    category: 'Finance',
    enabled: true,
  },
  {
    name: 'The Guardian Business',
    url: 'https://www.theguardian.com/uk/business/rss',
    category: 'Business',
    enabled: true,
  },
  
  // General & Career News
  {
    name: 'BBC UK',
    url: 'http://feeds.bbci.co.uk/news/uk/rss.xml',
    category: 'General',
    enabled: true,
  },
  {
    name: 'The Guardian Education',
    url: 'https://www.theguardian.com/education/rss',
    category: 'Education',
    enabled: true,
  },
  
  // Healthcare & Science
  {
    name: 'BBC Health',
    url: 'http://feeds.bbci.co.uk/news/health/rss.xml',
    category: 'Healthcare',
    enabled: true,
  },
  {
    name: 'The Guardian Science',
    url: 'https://www.theguardian.com/science/rss',
    category: 'Engineering',
    enabled: true,
  },
];

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Gen-Elevate-News-Aggregator/1.0',
  },
});

/**
 * Fetch news from a single RSS feed
 */
async function fetchFeedNews(source: NewsSource): Promise<NewsArticle[]> {
  try {
    const feed = await parser.parseURL(source.url);
    
    return (feed.items || []).slice(0, 5).map((item, index) => ({
      id: `${source.name}-${index}-${Date.now()}`,
      title: item.title || 'Untitled',
      source: source.name,
      category: source.category,
      excerpt: stripHtml(item.contentSnippet || item.content || item.summary || '').slice(0, 200),
      url: item.link || '#',
      publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
      imageUrl: extractImage(item),
      author: item.creator || item.author,
      trending: false, // We'll mark recent articles as trending
    }));
  } catch (error) {
    console.error(`Error fetching news from ${source.name}:`, error);
    return [];
  }
}

/**
 * Fetch news from all enabled sources
 */
export async function fetchAllNews(category?: string): Promise<NewsArticle[]> {
  const sources = category && category !== 'all'
    ? NEWS_SOURCES.filter(s => s.enabled && s.category === category)
    : NEWS_SOURCES.filter(s => s.enabled);

  // Fetch from all sources in parallel
  const newsPromises = sources.map(source => fetchFeedNews(source));
  const newsArrays = await Promise.all(newsPromises);
  
  // Flatten and sort by date
  const allNews = newsArrays.flat().sort((a, b) => 
    b.publishedAt.getTime() - a.publishedAt.getTime()
  );

  // Mark recent articles (< 6 hours old) as trending
  const sixHoursAgo = Date.now() - (6 * 60 * 60 * 1000);
  return allNews.map(article => ({
    ...article,
    trending: article.publishedAt.getTime() > sixHoursAgo,
  }));
}

/**
 * Get news by category
 */
export async function getNewsByCategory(category: string): Promise<NewsArticle[]> {
  return fetchAllNews(category);
}

/**
 * Strip HTML tags from content
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
}

/**
 * Extract image URL from RSS item
 */
function extractImage(item: any): string | undefined {
  // Try different possible image fields
  if (item.enclosure?.url) {
    return item.enclosure.url;
  }
  
  if (item['media:content']?.['$']?.url) {
    return item['media:content']['$'].url;
  }
  
  if (item['media:thumbnail']?.['$']?.url) {
    return item['media:thumbnail']['$'].url;
  }

  // Try to extract image from content
  const content = item.content || item['content:encoded'] || '';
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  if (imgMatch) {
    return imgMatch[1];
  }

  return undefined;
}

