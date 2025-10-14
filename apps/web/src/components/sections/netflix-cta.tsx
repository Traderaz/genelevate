'use client';

import { useState } from 'react';
import { ArrowRight, Play, Star, Users } from 'lucide-react';

export function NetflixCTA() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to signup with email pre-filled
    window.location.href = `/register?email=${encodeURIComponent(email)}`;
  };

  return (
    <section className="py-24 bg-gradient-to-br from-netflix-red/10 via-background to-netflix-red/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-netflix-red/10 border border-netflix-red/20 text-netflix-red text-sm font-medium mb-8">
            <Star className="w-4 h-4 mr-2" />
            Join 50,000+ successful students
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Ready to <span className="netflix-text-gradient">Elevate</span> Your Learning?
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Start your free 14-day trial today. No credit card required. 
            Cancel anytime. Join the learning revolution.
          </p>

          {/* Email Signup */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent transition-all duration-200"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-netflix-red hover:bg-netflix-red-dark text-white font-semibold rounded-lg netflix-button flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </form>

          {/* Alternative Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="flex items-center gap-3 px-8 py-4 bg-card border border-border text-foreground font-semibold rounded-lg netflix-button hover:border-netflix-red hover:text-netflix-red transition-all duration-300">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
            <button className="flex items-center gap-3 px-8 py-4 text-foreground font-semibold rounded-lg netflix-button hover:bg-white/10 transition-all duration-300">
              <Users className="w-5 h-5" />
              Talk to Sales
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 p-6 bg-card/50 border border-border/50 rounded-lg">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-foreground">No Risk</div>
                <div className="text-sm text-muted-foreground">14-day free trial</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-6 bg-card/50 border border-border/50 rounded-lg">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-foreground">24/7 Support</div>
                <div className="text-sm text-muted-foreground">Always here to help</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-6 bg-card/50 border border-border/50 rounded-lg">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-foreground">Trusted Platform</div>
                <div className="text-sm text-muted-foreground">50K+ happy students</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
