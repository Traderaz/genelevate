'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Briefcase,
  DollarSign,
  TrendingUp,
  MapPin,
  GraduationCap,
  Clock,
  Users,
  BookOpen,
  Target,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface CareerDetailProps {
  careerId: string;
}

interface CareerData {
  id: string;
  title: string;
  sector: string;
  description: string;
  salaryRange: string;
  growthRate: string;
  education: string;
  location: string;
  skills: string[];
  trending: boolean;
  demandLevel: 'high' | 'medium' | 'low';
  overview: string;
  responsibilities: string[];
  requirements: string[];
  careerPath: {
    level: string;
    title: string;
    years: string;
    salary: string;
  }[];
  relatedCourses: {
    id: string;
    title: string;
    subject: string;
  }[];
  industryInsights: {
    jobOpenings: string;
    averageSalary: string;
    topEmployers: string[];
    futureOutlook: string;
  };
}

export function CareerDetail({ careerId }: CareerDetailProps) {
  const router = useRouter();
  const [career, setCareer] = useState<CareerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/careers/${careerId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setCareer(null);
            return;
          }
          throw new Error('Failed to fetch career');
        }
        
        const data = await response.json();
        setCareer(data);
      } catch (error) {
        console.error('Error fetching career:', error);
        setCareer(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareer();
  }, [careerId]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-64 teal-card animate-pulse rounded-xl" />
        <div className="h-96 teal-card animate-pulse rounded-xl" />
      </div>
    );
  }

  if (!career) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-white/60 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Career Not Found</h2>
        <p className="text-white/80 mb-6">The career you're looking for doesn't exist.</p>
        <button
          onClick={() => router.push('/careers')}
          className="teal-button-primary"
        >
          Back to Careers
        </button>
      </div>
    );
  }

  const getDemandColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-[#10B981] bg-[#10B981]/20 font-bold';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'low': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-teal-gold hover:text-teal-gold-dark transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Careers
      </button>

      {/* Header */}
      <div className="teal-card-glass border-2 border-white/20 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-primary/10 via-transparent to-teal-light/10"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl lg:text-4xl font-bold text-white">{career.title}</h1>
                {career.trending && (
                  <span className="px-3 py-1 bg-teal-gold/20 text-teal-gold text-sm rounded-full font-medium flex items-center gap-1 border border-teal-gold/30">
                    <TrendingUp className="w-4 h-4" />
                    Trending
                  </span>
                )}
              </div>
              <p className="text-lg text-white/90 mb-4">{career.sector}</p>
              <p className="text-white/80 leading-relaxed max-w-3xl">{career.overview}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 text-white/70 mb-2">
                <DollarSign className="w-4 h-4 text-teal-gold" />
                <span className="text-sm">Salary Range</span>
              </div>
              <p className="text-lg font-bold text-white">{career.salaryRange}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 text-white/70 mb-2">
                <TrendingUp className="w-4 h-4 text-teal-gold" />
                <span className="text-sm">Growth Rate</span>
              </div>
              <p className="text-lg font-bold text-green-400">{career.growthRate}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 text-white/70 mb-2">
                <GraduationCap className="w-4 h-4 text-teal-gold" />
                <span className="text-sm">Education</span>
              </div>
              <p className="text-lg font-bold text-white">{career.education}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 text-white/70 mb-2">
                <Target className="w-4 h-4 text-teal-gold" />
                <span className="text-sm">Demand</span>
              </div>
              <p className={`text-lg font-bold ${getDemandColor(career.demandLevel)}`}>
                {career.demandLevel.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Responsibilities */}
          <div className="bg-white/95 backdrop-blur-lg border-2 border-teal-primary/30 rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-[#0B5C9E] mb-4 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-teal-primary" />
              Key Responsibilities
            </h2>
            <ul className="space-y-3">
              {career.responsibilities.map((resp, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-[#1a1a1a] text-base leading-relaxed font-medium">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="bg-white/95 backdrop-blur-lg border-2 border-teal-primary/30 rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-[#0B5C9E] mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-teal-primary" />
              Requirements & Qualifications
            </h2>
            <ul className="space-y-3">
              {career.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-primary flex-shrink-0 mt-0.5" />
                  <span className="text-[#1a1a1a] text-base leading-relaxed font-medium">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Career Path */}
          <div className="bg-white/95 backdrop-blur-lg border-2 border-teal-primary/30 rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-[#0B5C9E] mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-teal-primary" />
              Career Progression Path
            </h2>
            <div className="space-y-4">
              {career.careerPath.map((stage, index) => (
                <div key={index} className="relative pl-8 pb-6 last:pb-0">
                  {index < career.careerPath.length - 1 && (
                    <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-teal-primary/50"></div>
                  )}
                  <div className="absolute left-0 top-1 w-4 h-4 bg-teal-gold rounded-full border-2 border-teal-primary"></div>
                  <div className="bg-teal-light/10 border-2 border-teal-light/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-[#0B5C9E] text-lg">{stage.title}</h3>
                      <span className="text-sm text-teal-primary font-semibold">{stage.salary}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#4a4a4a] font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {stage.years}
                      </span>
                      <span className="px-2 py-1 bg-teal-primary/20 text-teal-primary rounded-full text-xs border border-teal-primary/40 font-medium">
                        {stage.level}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Skills Required */}
          <div className="bg-white/95 backdrop-blur-lg border-2 border-teal-primary/30 rounded-xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-[#0B5C9E] mb-4">Skills Required</h3>
            <div className="flex flex-wrap gap-2">
              {career.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-teal-primary/15 text-[#0B5C9E] border-2 border-teal-primary/40 rounded-lg text-sm font-semibold hover:bg-teal-primary/25 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Industry Insights */}
          <div className="bg-white/95 backdrop-blur-lg border-2 border-teal-primary/30 rounded-xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-[#0B5C9E] mb-4">Industry Insights</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#666666] font-medium mb-1">Current Job Openings</p>
                <p className="text-2xl font-bold text-[#0B5C9E]">{career.industryInsights.jobOpenings}</p>
              </div>
              <div>
                <p className="text-sm text-[#666666] font-medium mb-1">Average Salary (UK)</p>
                <p className="text-2xl font-bold text-[#0B5C9E]">{career.industryInsights.averageSalary}</p>
              </div>
              <div>
                <p className="text-sm text-[#666666] font-medium mb-2">Top Employers</p>
                <div className="flex flex-wrap gap-2">
                  {career.industryInsights.topEmployers.map((employer, index) => (
                    <span key={index} className="px-2 py-1 bg-teal-light/20 text-teal-primary border border-teal-primary/40 text-xs rounded-full font-medium">
                      {employer}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-[#666666] font-medium mb-2">Future Outlook</p>
                <p className="text-sm text-[#2a2a2a] leading-relaxed font-medium">
                  {career.industryInsights.futureOutlook}
                </p>
              </div>
            </div>
          </div>

          {/* Related Courses */}
          <div className="bg-white/95 backdrop-blur-lg border-2 border-teal-primary/30 rounded-xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-[#0B5C9E] mb-4">Related Courses</h3>
            <div className="space-y-3">
              {career.relatedCourses.map((course) => (
                <a
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="block p-3 bg-teal-light/10 border-2 border-teal-light/30 rounded-lg hover:border-teal-gold hover:bg-teal-gold/10 transition-all group"
                >
                  <p className="font-semibold text-[#0B5C9E] group-hover:text-teal-primary transition-colors">
                    {course.title}
                  </p>
                  <p className="text-sm text-[#666666] font-medium">{course.subject}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
