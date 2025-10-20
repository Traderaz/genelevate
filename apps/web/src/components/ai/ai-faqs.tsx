'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Search, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from 'lucide-react';
import { AIFAQ, AISessionType } from '@/types/ai';

export function AIFAQs() {
  const [faqs, setFaqs] = useState<AIFAQ[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<AIFAQ[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AISessionType | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'study-help', label: 'Study Help' },
    { id: 'career-guidance', label: 'Career Guidance' },
    { id: 'course-support', label: 'Course Support' },
    { id: 'motivation', label: 'Motivation' },
    { id: 'general', label: 'General' },
  ];

  useEffect(() => {
    loadFAQs();
  }, []);

  useEffect(() => {
    filterFAQs();
  }, [searchTerm, selectedCategory, faqs]);

  const loadFAQs = async () => {
    try {
      setIsLoading(true);
      const faqsQuery = query(
        collection(db as any, 'faqs'),
        orderBy('usageCount', 'desc'),
        limit(50)
      );

      const snapshot = await getDocs(faqsQuery);
      const faqsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as AIFAQ[];

      setFaqs(faqsData);
    } catch (error) {
      console.error('Error loading FAQs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterFAQs = () => {
    let filtered = faqs;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        faq =>
          faq.question.toLowerCase().includes(term) ||
          faq.answer.toLowerCase().includes(term) ||
          faq.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    setFilteredFaqs(filtered);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">
          Quick answers to common questions about using Gen Elevate AI
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as AISessionType | 'all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent text-foreground hover:bg-accent/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredFaqs.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground">No FAQs found matching your search.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
            >
              <button
                onClick={() => toggleExpand(faq.id)}
                className="w-full p-4 flex items-start justify-between text-left"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{faq.question}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-1 bg-accent rounded">{faq.category}</span>
                    <span>{faq.usageCount} views</span>
                  </div>
                </div>
                {expandedId === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-2" />
                )}
              </button>

              {expandedId === faq.id && (
                <div className="px-4 pb-4 border-t border-border">
                  <p className="text-foreground mt-3 whitespace-pre-wrap">{faq.answer}</p>

                  {faq.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {faq.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">Was this helpful?</span>
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-green-500 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{faq.helpful}</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-red-500 transition-colors">
                      <ThumbsDown className="w-4 h-4" />
                      <span>{faq.notHelpful}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

