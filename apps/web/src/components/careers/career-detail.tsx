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
    // Mock data - In production, fetch from Firestore
    const mockCareer: CareerData = {
      id: careerId,
      title: 'Software Engineer',
      sector: 'Technology',
      description: 'Design, develop, and maintain software applications and systems',
      salaryRange: '£30K - £80K',
      growthRate: '+15%',
      education: 'Bachelor\'s Degree',
      location: 'London, UK',
      skills: ['JavaScript', 'Python', 'Problem Solving', 'Teamwork', 'Git', 'Agile'],
      trending: true,
      demandLevel: 'high',
      overview: 'Software engineers are the architects of the digital world. They design, develop, test, and maintain software applications that power everything from mobile apps to enterprise systems. This role combines creativity with technical expertise, requiring both analytical thinking and collaborative skills.',
      responsibilities: [
        'Design and develop software applications using modern programming languages',
        'Write clean, maintainable, and efficient code',
        'Collaborate with cross-functional teams to define and implement new features',
        'Debug and resolve technical issues in existing systems',
        'Participate in code reviews and contribute to team knowledge sharing',
        'Stay updated with emerging technologies and industry best practices',
        'Document technical specifications and system architecture'
      ],
      requirements: [
        'Bachelor\'s degree in Computer Science, Software Engineering, or related field',
        'Strong programming skills in languages like JavaScript, Python, Java, or C++',
        'Understanding of data structures, algorithms, and software design patterns',
        'Experience with version control systems (Git)',
        'Knowledge of web technologies (HTML, CSS, JavaScript frameworks)',
        'Problem-solving mindset and attention to detail',
        'Good communication and teamwork skills'
      ],
      careerPath: [
        {
          level: 'Entry Level',
          title: 'Junior Software Engineer',
          years: '0-2 years',
          salary: '£25K - £35K'
        },
        {
          level: 'Mid Level',
          title: 'Software Engineer',
          years: '2-5 years',
          salary: '£35K - £55K'
        },
        {
          level: 'Senior Level',
          title: 'Senior Software Engineer',
          years: '5-8 years',
          salary: '£55K - £80K'
        },
        {
          level: 'Lead',
          title: 'Lead Engineer / Tech Lead',
          years: '8-12 years',
          salary: '£80K - £110K'
        },
        {
          level: 'Management',
          title: 'Engineering Manager / Architect',
          years: '12+ years',
          salary: '£100K - £150K+'
        }
      ],
      relatedCourses: [
        {
          id: '1',
          title: 'Introduction to Programming',
          subject: 'Computer Science'
        },
        {
          id: '2',
          title: 'Web Development Fundamentals',
          subject: 'Computer Science'
        },
        {
          id: '3',
          title: 'Data Structures & Algorithms',
          subject: 'Computer Science'
        }
      ],
      industryInsights: {
        jobOpenings: '15,000+',
        averageSalary: '£52,000',
        topEmployers: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Spotify', 'Revolut'],
        futureOutlook: 'The demand for software engineers is expected to grow by 22% over the next decade, much faster than average. Emerging technologies like AI, cloud computing, and IoT are creating new opportunities.'
      }
    };

    setCareer(mockCareer);
    setIsLoading(false);
  }, [careerId]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-64 bg-card animate-pulse rounded-xl" />
        <div className="h-96 bg-card animate-pulse rounded-xl" />
      </div>
    );
  }

  if (!career) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Career Not Found</h2>
        <p className="text-muted-foreground mb-6">The career you're looking for doesn't exist.</p>
        <button
          onClick={() => router.push('/careers')}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg netflix-button"
        >
          Back to Careers
        </button>
      </div>
    );
  }

  const getDemandColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-500 bg-green-500/10';
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
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Careers
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-card via-card/95 to-card/80 border border-border rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">{career.title}</h1>
                {career.trending && (
                  <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full font-medium flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Trending
                  </span>
                )}
              </div>
              <p className="text-lg text-muted-foreground mb-4">{career.sector}</p>
              <p className="text-foreground leading-relaxed max-w-3xl">{career.overview}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">Salary Range</span>
              </div>
              <p className="text-lg font-bold text-foreground">{career.salaryRange}</p>
            </div>
            <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Growth Rate</span>
              </div>
              <p className="text-lg font-bold text-green-500">{career.growthRate}</p>
            </div>
            <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <GraduationCap className="w-4 h-4" />
                <span className="text-sm">Education</span>
              </div>
              <p className="text-lg font-bold text-foreground">{career.education}</p>
            </div>
            <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Target className="w-4 h-4" />
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
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" />
              Key Responsibilities
            </h2>
            <ul className="space-y-3">
              {career.responsibilities.map((resp, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Requirements & Qualifications
            </h2>
            <ul className="space-y-3">
              {career.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Career Path */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Career Progression Path
            </h2>
            <div className="space-y-4">
              {career.careerPath.map((stage, index) => (
                <div key={index} className="relative pl-8 pb-6 last:pb-0">
                  {index < career.careerPath.length - 1 && (
                    <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-border"></div>
                  )}
                  <div className="absolute left-0 top-1 w-4 h-4 bg-primary rounded-full"></div>
                  <div className="bg-secondary rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-foreground">{stage.title}</h3>
                      <span className="text-sm text-primary font-semibold">{stage.salary}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {stage.years}
                      </span>
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs">
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
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Skills Required</h3>
            <div className="flex flex-wrap gap-2">
              {career.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Industry Insights */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Industry Insights</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current Job Openings</p>
                <p className="text-2xl font-bold text-foreground">{career.industryInsights.jobOpenings}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Average Salary (UK)</p>
                <p className="text-2xl font-bold text-foreground">{career.industryInsights.averageSalary}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Top Employers</p>
                <div className="flex flex-wrap gap-2">
                  {career.industryInsights.topEmployers.map((employer, index) => (
                    <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                      {employer}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Future Outlook</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {career.industryInsights.futureOutlook}
                </p>
              </div>
            </div>
          </div>

          {/* Related Courses */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Related Courses</h3>
            <div className="space-y-3">
              {career.relatedCourses.map((course) => (
                <a
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="block p-3 bg-secondary rounded-lg hover:bg-accent transition-colors group"
                >
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {course.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{course.subject}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
