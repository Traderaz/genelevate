import { Metadata } from 'next';
import { IndustryNewsPage } from '@/components/news/industry-news-page';

export const metadata: Metadata = {
  title: 'Industry News',
  description: 'Stay updated with the latest news in technology, healthcare, finance, education, and more. Real-time news from trusted UK sources.',
};

export default function NewsPage() {
  return <IndustryNewsPage />;
}

