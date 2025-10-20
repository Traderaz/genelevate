'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Briefcase, TrendingUp, MapPin, DollarSign, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Career {
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
}

interface CareerExplorerProps {
  searchParams: {
    sector?: string;
    location?: string;
    level?: string;
    search?: string;
  };
}

export function CareerExplorer({ searchParams }: CareerExplorerProps) {
  const [careers, setCareers] = useState<Career[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<Career[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.search || '');
  const [selectedSector, setSelectedSector] = useState(searchParams.sector || 'all');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.location || 'all');
  const [selectedLevel, setSelectedLevel] = useState(searchParams.level || 'all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - In production, this would fetch from Firestore
  useEffect(() => {
    const mockCareers: Career[] = [
      {
        id: '1',
        title: 'Software Engineer',
        sector: 'Technology',
        description: 'Design, develop, and maintain software applications and systems',
        salaryRange: '£30K - £80K',
        growthRate: '+15%',
        education: 'Bachelor\'s Degree',
        location: 'London, UK',
        skills: ['JavaScript', 'Python', 'Problem Solving', 'Teamwork'],
        trending: true,
        demandLevel: 'high'
      },
      {
        id: '2',
        title: 'Data Scientist',
        sector: 'Technology',
        description: 'Analyze complex data to help organizations make better decisions',
        salaryRange: '£35K - £90K',
        growthRate: '+22%',
        education: 'Master\'s Degree',
        location: 'Manchester, UK',
        skills: ['Python', 'Statistics', 'Machine Learning', 'SQL'],
        trending: true,
        demandLevel: 'high'
      },
      {
        id: '3',
        title: 'Renewable Energy Engineer',
        sector: 'Engineering',
        description: 'Design and develop renewable energy systems and solutions',
        salaryRange: '£28K - £65K',
        growthRate: '+18%',
        education: 'Bachelor\'s Degree',
        location: 'Edinburgh, UK',
        skills: ['Engineering', 'Sustainability', 'Project Management'],
        trending: true,
        demandLevel: 'high'
      },
      {
        id: '4',
        title: 'Digital Marketing Manager',
        sector: 'Marketing',
        description: 'Plan and execute digital marketing campaigns across multiple channels',
        salaryRange: '£25K - £55K',
        growthRate: '+12%',
        education: 'Bachelor\'s Degree',
        location: 'Birmingham, UK',
        skills: ['SEO', 'Content Marketing', 'Analytics', 'Social Media'],
        trending: false,
        demandLevel: 'medium'
      },
      {
        id: '5',
        title: 'Healthcare Administrator',
        sector: 'Healthcare',
        description: 'Manage healthcare facilities and coordinate medical services',
        salaryRange: '£24K - £50K',
        growthRate: '+8%',
        education: 'Bachelor\'s Degree',
        location: 'Leeds, UK',
        skills: ['Management', 'Communication', 'Healthcare Knowledge'],
        trending: false,
        demandLevel: 'medium'
      },
      {
        id: '6',
        title: 'Financial Analyst',
        sector: 'Finance',
        description: 'Analyze financial data and provide investment recommendations',
        salaryRange: '£32K - £75K',
        growthRate: '+10%',
        education: 'Bachelor\'s Degree',
        location: 'London, UK',
        skills: ['Financial Modeling', 'Excel', 'Analysis', 'Communication'],
        trending: false,
        demandLevel: 'high'
      },
      {
        id: '7',
        title: 'UX/UI Designer',
        sector: 'Design',
        description: 'Create user-centered designs for digital products and services',
        salaryRange: '£28K - £60K',
        growthRate: '+14%',
        education: 'Bachelor\'s Degree',
        location: 'Bristol, UK',
        skills: ['Figma', 'User Research', 'Prototyping', 'Design Thinking'],
        trending: true,
        demandLevel: 'high'
      },
      {
        id: '8',
        title: 'Cybersecurity Analyst',
        sector: 'Technology',
        description: 'Protect organizations from cyber threats and security breaches',
        salaryRange: '£35K - £85K',
        growthRate: '+20%',
        education: 'Bachelor\'s Degree',
        location: 'London, UK',
        skills: ['Network Security', 'Ethical Hacking', 'Risk Assessment'],
        trending: true,
        demandLevel: 'high'
      }
    ];

    setCareers(mockCareers);
    setIsLoading(false);
  }, []);

  // Filter careers based on search and filters
  useEffect(() => {
    let filtered = [...careers];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(career =>
        career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sector filter
    if (selectedSector !== 'all') {
      filtered = filtered.filter(career => career.sector === selectedSector);
    }

    // Location filter
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(career => career.location.includes(selectedLocation));
    }

    // Education level filter
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(career => career.education === selectedLevel);
    }

    setFilteredCareers(filtered);
  }, [careers, searchQuery, selectedSector, selectedLocation, selectedLevel]);

  const sectors = ['all', ...Array.from(new Set(careers.map(c => c.sector)))];
  const locations = ['all', 'London', 'Manchester', 'Birmingham', 'Edinburgh', 'Leeds', 'Bristol'];
  const educationLevels = ['all', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Vocational'];

  const getDemandColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-500 bg-green-500/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'low': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Career Explorer</h2>
        <span className="text-sm text-muted-foreground">
          {filteredCareers.length} career{filteredCareers.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search careers, skills, or industries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          >
            {sectors.map(sector => (
              <option key={sector} value={sector}>
                {sector === 'all' ? 'All Sectors' : sector}
              </option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          >
            {locations.map(location => (
              <option key={location} value={location}>
                {location === 'all' ? 'All Locations' : location}
              </option>
            ))}
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          >
            {educationLevels.map(level => (
              <option key={level} value={level}>
                {level === 'all' ? 'All Education Levels' : level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Career Cards */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-card animate-pulse rounded-xl" />
          ))}
        </div>
      ) : filteredCareers.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No careers found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCareers.map((career) => (
            <Link
              key={career.id}
              href={`/careers/${career.id}`}
              className="block bg-card border border-border rounded-xl p-6 netflix-card hover:border-primary transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {career.title}
                        </h3>
                        {career.trending && (
                          <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{career.sector}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {career.description}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      {career.salaryRange}
                    </span>
                    <span className="flex items-center gap-2 text-green-500">
                      <TrendingUp className="w-4 h-4" />
                      {career.growthRate} growth
                    </span>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {career.location}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(career.demandLevel)}`}>
                      {career.demandLevel.toUpperCase()} DEMAND
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {career.skills.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {career.skills.length > 4 && (
                      <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                        +{career.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
