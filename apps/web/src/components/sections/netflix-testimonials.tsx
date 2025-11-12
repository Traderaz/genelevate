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
        if (featuredReviews.length > 0) {
          setReviews(featuredReviews);
        } else {
          // Fallback to placeholder if no reviews yet
          setReviews(placeholderReviews);
        }
      } catch (error) {
        console.error('Error loading reviews:', error);
        setReviews(placeholderReviews);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, []);

  // Placeholder reviews (for when no real reviews exist yet)
  const placeholderReviews: StudentReview[] = [
    {
      id: 'placeholder-1',
      studentId: 'placeholder',
      studentName: 'Sarah J.',
      yearGroup: 'Year 13',
      rating: 5,
      reviewText: "The comprehensive Mathematics and Physics courses helped me understand complex topics. The AI tutor is brilliant for getting instant help when I'm stuck on homework.",
      subject: 'Mathematics & Physics',
      submittedAt: new Date(),
      status: 'approved',
      featured: true
    },
    {
      id: 'placeholder-2',
      studentId: 'placeholder',
      studentName: 'Marcus C.',
      yearGroup: 'Year 11',
      rating: 5,
      reviewText: "The live webinars are really helpful for exam preparation. Being able to ask questions in real-time makes such a difference compared to just watching videos.",
      subject: 'Biology & Chemistry',
      submittedAt: new Date(),
      status: 'approved',
      featured: true
    },
    {
      id: 'placeholder-3',
      studentId: 'placeholder',
      studentName: 'Emma W.',
      yearGroup: 'Year 10',
      rating: 5,
      reviewText: "The Life Skills and Career Explorer sections helped me discover what I want to do after school. Learning about different career paths and what they involve has been invaluable!",
      subject: 'Career Planning',
      submittedAt: new Date(),
      status: 'approved',
      featured: true
    },
    {
      id: 'placeholder-4',
      studentId: 'placeholder',
      studentName: 'James M.',
      yearGroup: 'Year 12',
      rating: 5,
      reviewText: "The Career Explorer showed me hundreds of career options I'd never even heard of. Now I understand what qualifications and skills I need for my dream career in engineering.",
      subject: 'Career Guidance',
      submittedAt: new Date(),
      status: 'approved',
      featured: true
    }
  ];

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
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null; // Don't show testimonials section if no reviews
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Loved by <span className="netflix-text-gradient">Students & Educators</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how Gen Elevate is helping students excel in their GCSE & A-Level studies.
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-netflix">
            <div className="flex items-start gap-6">
              {/* Quote Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-netflix-red/10 rounded-full flex items-center justify-center">
                  <Quote className="w-6 h-6 text-netflix-red" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(reviews[currentTestimonial].rating)}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-6">
                  "{reviews[currentTestimonial].reviewText}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-netflix-red to-netflix-red-dark rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {reviews[currentTestimonial].studentName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {reviews[currentTestimonial].studentName}
                    </div>
                    <div className="text-muted-foreground">
                      {reviews[currentTestimonial].yearGroup}
                    </div>
                    {reviews[currentTestimonial].subject && (
                      <div className="text-sm text-netflix-red">
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center netflix-button hover:border-netflix-red hover:text-netflix-red transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center netflix-button hover:border-netflix-red hover:text-netflix-red transition-all duration-300"
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
                    ? 'bg-netflix-red'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-card border border-border rounded-xl netflix-card">
            <div className="text-4xl font-bold text-netflix-red mb-2">Courses</div>
            <div className="text-foreground font-semibold mb-1">GCSE & A-Level</div>
            <div className="text-sm text-muted-foreground">Complete curriculum coverage</div>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-xl netflix-card">
            <div className="text-4xl font-bold text-netflix-red mb-2">Hundreds</div>
            <div className="text-foreground font-semibold mb-1">Career Pathways</div>
            <div className="text-sm text-muted-foreground">Explore all your options</div>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-xl netflix-card">
            <div className="text-4xl font-bold text-netflix-red mb-2">24/7</div>
            <div className="text-foreground font-semibold mb-1">AI Tutor</div>
            <div className="text-sm text-muted-foreground">Always here to help</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Ready to elevate your learning?
          </p>
          <a 
            href="/register"
            className="inline-block px-8 py-4 bg-netflix-red hover:bg-netflix-red-dark text-white font-semibold rounded-lg netflix-button"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
}
