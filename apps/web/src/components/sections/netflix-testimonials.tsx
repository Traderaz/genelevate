'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export function NetflixTestimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'A-Level Student',
      school: 'Westminster Academy',
      image: '/api/placeholder/80/80',
      rating: 5,
      quote: "Gen Elevate transformed my learning experience. The AI-powered recommendations helped me focus on areas where I needed improvement, and I achieved grades I never thought possible.",
      subject: 'Mathematics & Physics'
    },
    {
      name: 'Marcus Chen',
      role: 'Year 11 Student',
      school: 'International School Singapore',
      image: '/api/placeholder/80/80',
      rating: 5,
      quote: "The live webinars are incredible! Being able to ask questions in real-time and interact with top educators from around the world has been a game-changer for my studies.",
      subject: 'Computer Science'
    },
    {
      name: 'Emma Williams',
      role: 'GCSE Student',
      school: 'Brighton College',
      image: '/api/placeholder/80/80',
      rating: 5,
      quote: "I love how the platform adapts to my learning style. The bite-sized lessons and interactive quizzes make studying actually enjoyable. My confidence has grown so much!",
      subject: 'Biology & Chemistry'
    },
    {
      name: 'Dr. James Mitchell',
      role: 'Head of Mathematics',
      school: 'Royal Grammar School',
      image: '/api/placeholder/80/80',
      rating: 5,
      quote: "As an educator, I'm impressed by the quality of content and the innovative teaching methods. Our students who use Gen Elevate consistently outperform their peers.",
      subject: 'Mathematics Department'
    },
    {
      name: 'Priya Patel',
      role: 'Year 13 Student',
      school: 'London Academy',
      image: '/api/placeholder/80/80',
      rating: 5,
      quote: "The personalized learning paths helped me identify my strengths and weaknesses. I received offers from all my top university choices thanks to the comprehensive preparation.",
      subject: 'Economics & Business'
    },
    {
      name: 'Alex Thompson',
      role: 'Year 10 Student',
      school: 'Manchester High School',
      image: '/api/placeholder/80/80',
      rating: 5,
      quote: "The mobile app is perfect for learning on the go. I can download lessons and study during my commute. The offline feature is a lifesaver!",
      subject: 'English Literature'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Loved by <span className="netflix-text-gradient">Students & Educators</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of successful students who have transformed their learning journey with Gen Elevate.
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
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-6">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-netflix-red to-netflix-red-dark rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonials[currentTestimonial].name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-muted-foreground">
                      {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].school}
                    </div>
                    <div className="text-sm text-netflix-red">
                      {testimonials[currentTestimonial].subject}
                    </div>
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
            {testimonials.map((_, index) => (
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
            <div className="text-4xl font-bold text-netflix-red mb-2">98%</div>
            <div className="text-foreground font-semibold mb-1">Success Rate</div>
            <div className="text-sm text-muted-foreground">Students achieve their target grades</div>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-xl netflix-card">
            <div className="text-4xl font-bold text-netflix-red mb-2">4.9/5</div>
            <div className="text-foreground font-semibold mb-1">Average Rating</div>
            <div className="text-sm text-muted-foreground">From 10,000+ student reviews</div>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-xl netflix-card">
            <div className="text-4xl font-bold text-netflix-red mb-2">50K+</div>
            <div className="text-foreground font-semibold mb-1">Happy Students</div>
            <div className="text-sm text-muted-foreground">Across 50+ countries worldwide</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Ready to join thousands of successful students?
          </p>
          <button className="px-8 py-4 bg-netflix-red hover:bg-netflix-red-dark text-white font-semibold rounded-lg netflix-button">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </section>
  );
}
