'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, BookOpen, Star, TrendingUp, Filter, Search } from 'lucide-react';

export function NetflixCourseBanner() {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredCourse = {
    id: 1,
    title: 'Advanced Mathematics Mastery',
    subtitle: 'Complete A-Level Mathematics Course',
    description: 'Master calculus, algebra, and statistics with our comprehensive A-Level mathematics course. Perfect for students aiming for top grades.',
    instructor: 'Dr. Sarah Johnson',
    rating: 4.9,
    students: 2847,
    duration: '45 hours',
    level: 'Advanced',
    thumbnail: '/api/placeholder/600/400'
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-card via-card/95 to-card/80 border border-border">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-medium">
                  Featured Course
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  {featuredCourse.rating}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                {featuredCourse.title}
              </h1>
              <p className="text-lg text-primary font-semibold">
                {featuredCourse.subtitle}
              </p>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {featuredCourse.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {featuredCourse.duration}
              </span>
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {featuredCourse.students.toLocaleString()} students
              </span>
              <span className="px-3 py-1 bg-accent rounded-full">
                {featuredCourse.level}
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href={`/courses/${featuredCourse.id}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold netflix-button text-lg"
              >
                <Play className="w-5 h-5" />
                Start Learning
              </Link>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold netflix-button text-lg">
                <BookOpen className="w-5 h-5" />
                Preview Course
              </button>
            </div>
          </div>

          {/* Course Preview */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-background rounded-xl overflow-hidden shadow-netflix">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/30 transition-colors">
                    <Play className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-muted-foreground">Course Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="max-w-2xl">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Find Your Perfect Course
            </h3>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search courses, subjects, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              <button className="px-6 py-4 bg-accent text-accent-foreground rounded-lg netflix-button flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
