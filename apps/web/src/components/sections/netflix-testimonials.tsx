'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { getFeaturedReviews } from '@/lib/services/reviews';
import { StudentReview } from '@/types/review';

export function NetflixTestimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [reviews, setReviews] = useState<StudentReview[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured reviews from Firestore
  useEffect(() => {
    async function loadReviews() {
      try {
        const featuredReviews = await getFeaturedReviews();
        setReviews(featuredReviews);
      } catch (error) {
        console.error('Error loading reviews:', error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % reviews.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [reviews]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null; // Don't show testimonials section if no reviews
  }

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Loved by <span className="text-teal-gold font-black">Current Students</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            See how Gen Elevate is helping students excel in their 11+, GCSE & A-Level studies.
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="brand-card-glass border-2 border-brand-teal/20 rounded-2xl p-8 md:p-12 shadow-brand-xl">
            <div className="flex items-start gap-6">
              {/* Quote Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-blue-medium to-brand-teal rounded-full flex items-center justify-center shadow-brand-sm">
                  <Quote className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(reviews[currentTestimonial].rating)}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-brand-navy leading-relaxed mb-6 font-light">
                  "{reviews[currentTestimonial].reviewText}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-blue-medium to-brand-teal rounded-full flex items-center justify-center shadow-brand-md">
                    <span className="text-white font-bold text-lg">
                      {reviews[currentTestimonial].studentName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-brand-navy">
                      {reviews[currentTestimonial].studentName}
                    </div>
                    <div className="text-brand-navy-light">
                      {reviews[currentTestimonial].yearGroup}
                    </div>
                    {reviews[currentTestimonial].subject && (
                      <div className="text-sm text-brand-teal font-medium">
                        {reviews[currentTestimonial].subject}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white border-2 border-brand-teal/30 text-brand-teal rounded-full flex items-center justify-center hover:bg-brand-teal hover:text-white hover:border-brand-teal transition-all duration-300 shadow-brand-sm hover:shadow-brand-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white border-2 border-brand-teal/30 text-brand-teal rounded-full flex items-center justify-center hover:bg-brand-teal hover:text-white hover:border-brand-teal transition-all duration-300 shadow-brand-sm hover:shadow-brand-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-brand-teal w-8'
                    : 'bg-brand-navy-light/30 hover:bg-brand-navy-light/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
