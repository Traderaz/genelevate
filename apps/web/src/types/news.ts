export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  category: string;
  excerpt: string;
  url: string;
  publishedAt: Date;
  imageUrl?: string;
  trending: boolean;
  author?: string;
}

export interface NewsSource {
  name: string;
  url: string;
  category: string;
  enabled: boolean;
}

export type NewsCategory = 
  | 'all'
  | 'Technology'
  | 'Engineering'
  | 'Healthcare'
  | 'Finance'
  | 'General'
  | 'Education'
  | 'Business';

