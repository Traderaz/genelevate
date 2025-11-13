export interface Career {
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
  createdAt: Date;
  updatedAt: Date;
}

export interface CareerDetail extends Career {
  overview: string;
  responsibilities: string[];
  requirements: string[];
  careerPath: CareerPathStage[];
  relatedCourses: RelatedCourse[];
  industryInsights: IndustryInsights;
  typicalDay: string;
  workEnvironment: string;
  furtherReading: {
    title: string;
    url: string;
  }[];
}

export interface CareerPathStage {
  level: string;
  title: string;
  years: string;
  salary: string;
  description?: string;
}

export interface RelatedCourse {
  id: string;
  title: string;
  subject: string;
  level?: string;
}

export interface IndustryInsights {
  jobOpenings: string;
  averageSalary: string;
  topEmployers: string[];
  futureOutlook: string;
  jobSatisfaction?: string;
  workLifeBalance?: string;
}

export interface CareerFilters {
  sector?: string;
  location?: string;
  education?: string;
  demandLevel?: 'high' | 'medium' | 'low';
  salaryMin?: number;
  search?: string;
}

