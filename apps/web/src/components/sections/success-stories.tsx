'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SuccessStory } from '@/types/success-story';
import { ChevronLeft, ChevronRight, Award, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export function SuccessStories() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStories() {
      try {
        const storiesRef = collection(db, 'successStories');
        const snapshot = await getDocs(storiesRef);
        const storiesData = snapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate(),
          })) as SuccessStory[];
        
        // Filter active stories and sort in memory
        const activeStories = storiesData
          .filter(story => story.isActive)
          .sort((a, b) => a.order - b.order);
        
        setStories(activeStories);
      } catch (error) {
        console.error('Error loading success stories:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStories();
  }, []);

  // Auto-rotate stories every 5 seconds
  useEffect(() => {
    if (stories.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [stories.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-teal-primary/5 via-white to-teal-gold/5">
        <div className="container mx-auto px-4">
          <div className="h-96 animate-pulse bg-white/50 rounded-3xl"></div>
        </div>
      </section>
    );
  }

  if (stories.length === 0) {
    return null;
  }

  const currentStory = stories[currentIndex];

  return (
    <section className="py-12 bg-gradient-to-br from-teal-primary/5 via-white to-teal-gold/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-teal-gold/20 text-teal-primary px-4 py-1.5 rounded-full mb-3">
            <Award className="w-4 h-4" />
            <span className="font-bold text-xs">STUDENT SUCCESS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-3">
            Our Success <span className="text-teal-primary">Stories</span>
          </h2>
          <p className="text-base text-brand-navy-light max-w-xl mx-auto">
            Real students, real results. See how Gen Elevate helped them achieve their academic goals.
          </p>
        </div>

        {/* Story Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-teal-primary/20">
            <div className="grid md:grid-cols-2">
              {/* Image Side */}
              <div className="relative h-64 md:h-[420px] bg-white">
                {currentStory.imageUrl ? (
                  <Image
                    src={currentStory.imageUrl}
                    alt={currentStory.studentName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-primary to-teal-gold">
                    <span className="text-8xl font-bold text-white">{currentStory.studentName.charAt(0)}</span>
                  </div>
                )}
              </div>

              {/* Content Side */}
              <div className="p-6 md:p-8 flex flex-col justify-center bg-white">
                {/* Before/After Badge */}
                {currentStory.beforeAfter && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg font-bold text-xs">
                      {currentStory.beforeAfter.before}
                    </div>
                    <TrendingUp className="w-5 h-5 text-teal-primary" />
                    <div className="bg-teal-primary/20 text-teal-primary px-3 py-1.5 rounded-lg font-bold text-xs">
                      {currentStory.beforeAfter.after}
                    </div>
                  </div>
                )}

                {/* Student Name */}
                <h3 className="text-2xl font-bold text-brand-navy mb-1.5">
                  {currentStory.studentName}
                </h3>

                {/* Achievement */}
                <div className="flex items-center gap-2 text-teal-primary font-semibold mb-3">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">{currentStory.achievement}</span>
                </div>

                {/* Story */}
                <p className="text-brand-navy-light leading-relaxed mb-4 text-base">
                  &ldquo;{currentStory.story}&rdquo;
                </p>

                {/* Additional Info */}
                <div className="space-y-1.5">
                  {currentStory.subject && (
                    <div className="flex items-center gap-2 text-xs text-brand-navy-light">
                      <span className="font-semibold text-brand-navy">Subject:</span>
                      {currentStory.subject}
                    </div>
                  )}
                  {currentStory.grade && (
                    <div className="flex items-center gap-2 text-xs text-brand-navy-light">
                      <span className="font-semibold text-brand-navy">Final Grade:</span>
                      {currentStory.grade}
                    </div>
                  )}
                  {currentStory.university && (
                    <div className="flex items-center gap-2 text-xs text-brand-navy-light">
                      <span className="font-semibold text-brand-navy">Now Studying at:</span>
                      {currentStory.university}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          {stories.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white border-2 border-teal-primary/30 hover:border-teal-primary hover:bg-teal-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg group"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-5 h-5 text-teal-primary group-hover:text-white" />
              </button>

              {/* Dot Indicators */}
              <div className="flex gap-1.5">
                {stories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex
                        ? 'w-8 h-2 bg-teal-primary'
                        : 'w-2 h-2 bg-teal-primary/30 hover:bg-teal-primary/50'
                    }`}
                    aria-label={`Go to story ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white border-2 border-teal-primary/30 hover:border-teal-primary hover:bg-teal-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg group"
                aria-label="Next story"
              >
                <ChevronRight className="w-5 h-5 text-teal-primary group-hover:text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

