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

  // Fetch real career data from API
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/careers');
        
        if (!response.ok) {
          throw new Error('Failed to fetch careers');
        }
        
        const data = await response.json();
        setCareers(data);
      } catch (error) {
        console.error('Error fetching careers:', error);
        setCareers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareers();
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
        <h2 className="text-2xl font-bold text-white">Career Explorer</h2>
        <span className="text-sm text-white/80">
          {filteredCareers.length} career{filteredCareers.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-card-text-muted" />
          <input
            type="text"
            placeholder="Search careers, skills, or industries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 teal-card border border-gray-300 rounded-lg text-teal-card-text placeholder:text-teal-card-text-muted focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold transition-all"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-4 py-3 teal-card border border-gray-300 rounded-lg text-teal-card-text focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold transition-all"
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
            className="px-4 py-3 teal-card border border-gray-300 rounded-lg text-teal-card-text focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold transition-all"
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
            className="px-4 py-3 teal-card border border-gray-300 rounded-lg text-teal-card-text focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold transition-all"
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
            <div key={i} className="h-48 teal-card animate-pulse rounded-xl" />
          ))}
        </div>
      ) : filteredCareers.length === 0 ? (
        <div className="text-center py-12 teal-card rounded-xl">
          <Briefcase className="w-16 h-16 text-teal-card-text-muted mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-teal-card-text mb-2">No careers found</h3>
          <p className="text-teal-card-text-muted">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCareers.map((career) => (
            <Link
              key={career.id}
              href={`/careers/${career.id}`}
              className="block teal-card border-2 border-transparent rounded-xl p-6 hover:border-teal-gold hover:shadow-xl transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-teal-card-text group-hover:text-teal-primary transition-colors">
                          {career.title}
                        </h3>
                        {career.trending && (
                          <span className="px-2 py-1 bg-teal-primary/20 text-teal-primary text-xs rounded-full font-medium flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-teal-card-text-muted">{career.sector}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-teal-card-text-muted group-hover:text-teal-primary transition-colors" />
                  </div>

                  {/* Description */}
                  <p className="text-teal-card-text-muted leading-relaxed">
                    {career.description}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="flex items-center gap-2 text-teal-card-text-muted">
                      <DollarSign className="w-4 h-4" />
                      {career.salaryRange}
                    </span>
                    <span className="flex items-center gap-2 text-green-600 font-medium">
                      <TrendingUp className="w-4 h-4" />
                      {career.growthRate} growth
                    </span>
                    <span className="flex items-center gap-2 text-teal-card-text-muted">
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
                        className="px-3 py-1 bg-teal-primary/10 text-teal-primary text-xs rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {career.skills.length > 4 && (
                      <span className="px-3 py-1 bg-teal-primary/10 text-teal-primary text-xs rounded-full font-medium">
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
