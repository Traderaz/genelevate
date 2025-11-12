'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export function NetflixTestimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Sarah J.',
      role: 'A-Level Student',
      school: 'Year 13',
      image: '/api/placeholder/80/80',
      rating: 5,
      quote: "The comprehensive Mathematics and Physics courses helped me understand complex topics. The AI tutor is brilliant for getting instant help when I'm stuck on homework.",
      subject: 'Mathematics & Physics'
    },
    {
      name: 'Marcus C.',
      role: 'GCSE Student',
      school: 'Year 11',
      image: '/api/placeholder/80/80',
      rating: 5,
      quote: "The live webinars are really helpful for exam preparation. Being able to ask questions in real-time makes such a difference compared to just watching videos.",
      subject: 'Biology & Chemistry'
    },
    {
      name: 'Emma W.',
      role: 'GCSE Student',
      school: 'Year 10',
      image: '/api/placeholder/80/80',
      rating: 5,
      quote: "I love the Interview Lab feature! Practicing my interview skills with video submissions and getting feedback from tutors has boosted my confidence massively.",
      subject: 'Business Studies'
    },
    {
      name: 'James M.',
      role: 'A-Level Student',
      school: 'Year 12',
      image: '/api/placeholder/80/80',
      rating: 5,
      quote: "The debate platform is amazing for developing critical thinking. It's really helped me structure arguments better for my English essays.",
      subject: 'English Language'
    },
    {
      name: 'Priya P.',
      role: 'GCSE Student',
      school: 'Year 11',
      image: '/api/placeholder/80/80',
      rating: 5,
      quote: "Having all the GCSE content in one place is so convenient. The progress tracking helps me see what I need to focus on for my exams.",
      subject: 'Multiple Subjects'
    },
    {
      name: 'Alex T.',
      role: 'A-Level Student',
      school: 'Year 13',
      image: '/api/placeholder/80/80',
      rating: 5,
      quote: "The 24/7 AI assistant is a lifesaver during revision. I can get explanations for difficult Chemistry concepts anytime, even at 11pm before an exam!",
      subject: 'Chemistry'
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
            <div className="text-4xl font-bold text-netflix-red mb-2">7+</div>
            <div className="text-foreground font-semibold mb-1">Subject Courses</div>
            <div className="text-sm text-muted-foreground">GCSE & A-Level curriculum</div>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-xl netflix-card">
            <div className="text-4xl font-bold text-netflix-red mb-2">24/7</div>
            <div className="text-foreground font-semibold mb-1">AI Assistant</div>
            <div className="text-sm text-muted-foreground">Always available to help</div>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-xl netflix-card">
            <div className="text-4xl font-bold text-netflix-red mb-2">Live</div>
            <div className="text-foreground font-semibold mb-1">Weekly Webinars</div>
            <div className="text-sm text-muted-foreground">Interactive learning sessions</div>
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
