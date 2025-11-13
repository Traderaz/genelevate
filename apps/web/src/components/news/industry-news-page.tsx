'use client';

import { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, Clock, TrendingUp, Bookmark, Search, Filter, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { SimpleHomeHeader } from '@/components/layout/simple-home-header';
import type { NewsArticle } from '@/types/news';

export function IndustryNewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Fetch real news from RSS feeds via API
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
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching news:', error);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  const categories = ['all', 'Technology', 'Healthcare', 'Finance', 'Business', 'Education', 'Engineering', 'General'];

  // Filter by search query
  const filteredArticles = articles.filter(article => 
    searchQuery === '' || 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Featured article (most recent trending)
  const featuredArticle = filteredArticles.find(a => a.trending) || filteredArticles[0];

  // Regular articles (excluding featured)
  const regularArticles = filteredArticles.filter(a => a.id !== featuredArticle?.id);

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      <SimpleHomeHeader />
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-card via-card/95 to-card/80 border-b border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 rounded-xl">
                <Newspaper className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">Industry News</h1>
                <p className="text-muted-foreground mt-1">Real-time news from trusted UK sources</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchNews}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors disabled:opacity-50"
                title="Refresh news"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden md:inline">Refresh</span>
              </button>
              <span className="px-3 py-1.5 bg-green-500/20 text-green-400 text-xs rounded-full font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Live
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search news articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border'
              }`}
            >
              {category === 'all' ? 'All News' : category}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <div className="h-96 bg-card animate-pulse rounded-2xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-64 bg-card animate-pulse rounded-xl" />
              ))}
            </div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No news articles found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featuredArticle && (
              <article className="mb-8 bg-gradient-to-br from-card via-card/95 to-card/80 border border-border rounded-2xl p-8 hover:border-primary transition-all group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5"></div>
                <div className="relative z-10">
                  <div className="flex items-start gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium">
                          FEATURED
                        </span>
                        <span className="text-sm text-muted-foreground">{featuredArticle.source}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {getTimeAgo(featuredArticle.publishedAt)}
                        </span>
                        {featuredArticle.trending && (
                          <>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-primary flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              Trending
                            </span>
                          </>
                        )}
                      </div>
                      
                      <h2 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {featuredArticle.title}
                      </h2>
                      
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>

                      <div className="flex items-center gap-4 pt-4">
                        <span className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm rounded-full">
                          {featuredArticle.category}
                        </span>
                        {featuredArticle.author && (
                          <span className="text-sm text-muted-foreground">
                            By {featuredArticle.author}
                          </span>
                        )}
                        <a
                          href={featuredArticle.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          Read Full Article
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Regular Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all group flex flex-col h-full"
                >
                  <div className="flex-1 space-y-3">
                    {/* Header */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                      <span>{article.source}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getTimeAgo(article.publishedAt)}
                      </span>
                      {article.trending && (
                        <>
                          <span>•</span>
                          <span className="text-primary flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-3">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        title="Bookmark"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        Read
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {/* Footer Info */}
        <div className="text-center text-sm text-muted-foreground py-8 mt-8 border-t border-border space-y-2">
          <p>News aggregated from BBC News, The Guardian, and other trusted UK sources</p>
          <p>Updates automatically every 30 minutes • Last updated: {lastUpdated.toLocaleTimeString()}</p>
          <p className="text-xs">Found {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
    </div>
  );
}

