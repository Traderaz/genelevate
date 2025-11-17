'use client';

import { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, Clock, TrendingUp, Bookmark, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface NewsArticle {
  id: string;
  title: string;
  source: string;
  category: string;
  excerpt: string;
  url: string;
  publishedAt: Date;
  imageUrl?: string;
  trending: boolean;
}

export function IndustryNewsFeed() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch real news from RSS feeds via API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/news${selectedCategory !== 'all' ? `?category=${selectedCategory}` : ''}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        const newsArticles = (data.articles || []).map((article: any) => ({
          ...article,
          publishedAt: new Date(article.publishedAt),
        }));
        
        setArticles(newsArticles);
      } catch (error) {
        console.error('Error fetching news:', error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory]);

  const categories = ['all', ...Array.from(new Set(articles.map(a => a.category)))];

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Newspaper className="w-6 h-6 text-teal-gold" />
          <h2 className="text-2xl font-bold text-white">Industry News</h2>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/news"
            className="text-sm text-teal-gold hover:text-teal-light transition-colors font-medium flex items-center gap-1"
          >
            View All News
            <ChevronRight className="w-4 h-4" />
          </Link>
          <span className="px-3 py-1 bg-teal-gold text-teal-card-text text-xs rounded-full font-bold flex items-center gap-1 shadow-md">
            <span className="w-2 h-2 bg-teal-card-text rounded-full animate-pulse"></span>
            Live
          </span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-teal-blue-medium to-teal-primary text-white shadow-lg'
                : 'teal-card text-teal-card-text-muted hover:bg-gray-100 hover:text-teal-card-text border border-gray-300'
            }`}
          >
            {category === 'all' ? 'All News' : category}
          </button>
        ))}
      </div>

      {/* News Articles */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 teal-card animate-pulse rounded-xl" />
          ))}
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-8 teal-card rounded-xl">
          <Newspaper className="w-12 h-12 text-teal-card-text-muted mx-auto mb-3" />
          <p className="text-teal-card-text-muted">No news articles found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="teal-card border-2 border-transparent rounded-xl p-5 hover:border-teal-gold hover:shadow-lg transition-all group"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-teal-card-text-muted">{article.source}</span>
                      <span className="text-xs text-teal-card-text-muted">•</span>
                      <span className="text-xs text-teal-card-text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getTimeAgo(article.publishedAt)}
                      </span>
                      {article.trending && (
                        <>
                          <span className="text-xs text-teal-card-text-muted">•</span>
                          <span className="text-xs text-teal-primary flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="font-semibold text-teal-card-text group-hover:text-teal-primary transition-colors leading-snug mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-teal-card-text-muted leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="px-2 py-1 bg-teal-primary/10 text-teal-primary text-xs rounded-full font-medium">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 text-teal-card-text-muted hover:text-teal-primary transition-colors"
                      title="Bookmark"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-teal-primary hover:text-teal-blue-medium transition-colors font-medium"
                    >
                      Read more
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Refresh Info */}
      <div className="text-center text-xs text-white/70 py-4 border-t border-white/20">
        <p>News feed updates automatically every hour</p>
        <p className="mt-1">Last updated: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
}
