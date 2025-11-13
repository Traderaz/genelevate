# Career Explorer System - Complete Guide

## Overview

The Career Explorer provides students with comprehensive, real information about UK careers across various sectors. This replaces the previous mock data with authentic career guidance sourced from official UK resources.

## Features

✅ **20+ Real UK Careers** across major sectors
✅ **Comprehensive Career Details** including salaries, growth rates, requirements
✅ **Career Path Progression** showing advancement opportunities
✅ **Industry Insights** from real UK employment data
✅ **Related Courses** linking careers to GCSE/A-Level subjects
✅ **Search & Filter** by sector, demand level, education, and keywords
✅ **Public Access** - No login required to view career information
✅ **Admin Management** - Content creators can add/update careers

## Data Sources

Career information is compiled from:
- **UK Office for National Statistics** (ONS)
- **National Careers Service** (gov.uk)
- **Indeed UK** and **Glassdoor UK** salary data
- **Professional Bodies** (ICE, IET, CIPD, NMC, etc.)
- **UK Government Career Advisers**

## Architecture

### Database Structure

**Collection:** `careers`

**Document Fields:**
```typescript
{
  id: string;
  title: string;
  sector: string; // Technology, Healthcare, Engineering, Finance, etc.
  description: string;
  salaryRange: string; // "£30K - £80K"
  growthRate: string; // "+15%"
  education: string; // "Bachelor's Degree"
  location: string; // "UK-wide, London, etc."
  skills: string[]; // ["JavaScript", "Python", ...]
  trending: boolean;
  demandLevel: 'high' | 'medium' | 'low';
  overview: string; // Detailed career overview
  responsibilities: string[]; // Key job responsibilities
  requirements: string[]; // Education and skill requirements
  careerPath: CareerPathStage[]; // Progression timeline
  industryInsights: {
    jobOpenings: string;
    averageSalary: string;
    topEmployers: string[];
    futureOutlook: string;
  };
  typicalDay: string;
  workEnvironment: string;
  furtherReading: { title: string; url: string }[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Files Created

```
apps/web/src/
├── types/
│   └── career.ts                    # TypeScript interfaces
├── lib/
│   ├── services/
│   │   └── careers-admin.ts         # Admin service (Firestore operations)
│   └── data/
│       └── careers-seed-data.ts     # Real UK career data
├── app/
│   └── api/
│       └── careers/
│           ├── route.ts             # GET all careers
│           ├── [id]/route.ts        # GET single career
│           └── statistics/route.ts  # GET career stats
├── components/
│   └── careers/
│       ├── career-explorer.tsx      # Updated to use real data
│       └── career-detail.tsx        # Updated to use real data
└── scripts/
    └── seed-careers.ts              # Database seeding script
```

## Sectors Covered

The current database includes careers from:

1. **Technology** (5 careers)
   - Software Engineer
   - Data Scientist
   - Cybersecurity Analyst
   - UX/UI Designer
   - (and more)

2. **Healthcare** (2 careers)
   - Registered Nurse
   - Physiotherapist

3. **Education** (1 career)
   - Secondary School Teacher

4. **Engineering** (3 careers)
   - Civil Engineer
   - Electrical Engineer
   - Mechanical Engineer

5. **Finance** (2 careers)
   - Accountant
   - Financial Analyst

6. **Marketing & Design** (3 careers)
   - Digital Marketing Manager
   - UX/UI Designer
   - Graphic Designer

7. **Law & Public Service** (2 careers)
   - Solicitor
   - Police Officer

8. **Business** (2 careers)
   - Project Manager
   - Human Resources Manager

## Setup Instructions

### 1. Deploy Firestore Security Rules

The security rules allow:
- ✅ **Public read access** (no authentication required)
- ✅ **Admin-only write access** (create, update, delete)

Deploy the rules:
```bash
firebase deploy --only firestore:rules
```

### 2. Seed the Database

Populate the database with real career data:

```bash
npm run seed-careers
```

This will:
- Check if careers already exist (to prevent duplicates)
- Batch create all 20+ careers
- Display a summary of what was created

**Important:** Run this only once. If you need to reseed:
1. Go to Firebase Console
2. Navigate to Firestore Database
3. Delete all documents in the `careers` collection
4. Run the seed script again

### 3. Verify the Data

1. Go to Firebase Console > Firestore
2. Check the `careers` collection
3. Verify 20+ documents exist
4. Visit your site at `/careers` or `/life-career/career-explorer`

## API Endpoints

### GET /api/careers

Fetch all careers with optional filters.

**Query Parameters:**
- `sector` - Filter by sector (e.g., "Technology", "Healthcare")
- `demandLevel` - Filter by demand ("high", "medium", "low")
- `trending` - Filter trending careers ("true"/"false")
- `search` - Search by title, description, or skills
- `limit` - Limit number of results

**Examples:**
```bash
# Get all careers
GET /api/careers

# Get technology careers
GET /api/careers?sector=Technology

# Get high-demand careers
GET /api/careers?demandLevel=high

# Search for "engineer"
GET /api/careers?search=engineer

# Get trending careers
GET /api/careers?trending=true
```

### GET /api/careers/[id]

Fetch a single career by ID.

**Example:**
```bash
GET /api/careers/abc123
```

### GET /api/careers/statistics

Get career statistics (total careers, sectors, high demand count, etc.).

**Example:**
```bash
GET /api/careers/statistics
```

## Usage in Components

### Career Explorer Component

Located at: `apps/web/src/components/careers/career-explorer.tsx`

**Features:**
- Fetches all careers from API
- Client-side filtering by sector, location, education level
- Real-time search across titles, descriptions, and skills
- Responsive grid layout
- Loading states and empty states

**Usage:**
```tsx
import { CareerExplorer } from '@/components/careers/career-explorer';

<CareerExplorer searchParams={{ sector: 'Technology' }} />
```

### Career Detail Component

Located at: `apps/web/src/components/careers/career-detail.tsx`

**Features:**
- Fetches single career by ID
- Displays comprehensive career information
- Career progression timeline
- Related courses
- Industry insights

**Usage:**
```tsx
import { CareerDetail } from '@/components/careers/career-detail';

<CareerDetail careerId="abc123" />
```

## Adding New Careers

### Option 1: Via Seed Data (Recommended for bulk updates)

1. Edit `apps/web/src/lib/data/careers-seed-data.ts`
2. Add new career objects to the `careersSeedData` array
3. Delete existing careers from Firestore Console
4. Run `npm run seed-careers`

### Option 2: Via Admin API (Future Enhancement)

Create an admin panel to manage careers through the UI:
- Use `/api/careers` POST endpoint (to be implemented)
- Provide a form for content creators
- Validate and sanitize input
- Call admin service functions

### Career Data Template

```typescript
{
  title: 'Career Title',
  sector: 'Sector Name',
  description: 'Brief one-line description (80-100 chars)',
  salaryRange: '£XXK - £XXK',
  growthRate: '+X%',
  education: 'Required education level',
  location: 'UK-wide or specific cities',
  skills: ['Skill 1', 'Skill 2', 'Skill 3'],
  trending: true/false,
  demandLevel: 'high' | 'medium' | 'low',
  overview: 'Detailed 2-3 sentence overview of the career',
  responsibilities: [
    'Key responsibility 1',
    'Key responsibility 2',
    // ... 6-10 items
  ],
  requirements: [
    'Required qualification or skill 1',
    'Required qualification or skill 2',
    // ... 5-8 items
  ],
  careerPath: [
    { level: 'Entry Level', title: 'Job Title', years: '0-2 years', salary: '£XXK - £XXK' },
    // ... 4-6 progression stages
  ],
  relatedCourses: [
    { id: 'course-id', title: 'Course Name', subject: 'Subject', level: 'GCSE/A-Level' }
  ],
  industryInsights: {
    jobOpenings: 'X,XXX+',
    averageSalary: '£XX,000',
    topEmployers: ['Company 1', 'Company 2', 'Company 3'],
    futureOutlook: '2-3 sentences about career outlook and trends'
  },
  typicalDay: 'Description of a typical workday',
  workEnvironment: 'Description of work setting and culture',
  furtherReading: [
    { title: 'Resource Name', url: 'https://...' }
  ]
}
```

## Best Practices

### Data Quality
- ✅ Use official UK sources for salary and employment data
- ✅ Update salary ranges annually (review in January)
- ✅ Verify growth rates against ONS statistics
- ✅ Include 5-10 relevant skills per career
- ✅ Link to official professional bodies in further reading

### Content Guidelines
- ✅ Write in clear, accessible language (suitable for 14-18 year olds)
- ✅ Be realistic about requirements and progression
- ✅ Include both advantages and challenges of each career
- ✅ Highlight skills developed through A-Level subjects
- ✅ Mention apprenticeship routes where applicable

### Technical
- ✅ Always test locally before deploying
- ✅ Backup Firestore data before re-seeding
- ✅ Monitor API response times
- ✅ Check for linting errors after updates

## Future Enhancements

### Planned Features
- [ ] Save favorite careers (requires authentication)
- [ ] Career personality matching quiz
- [ ] Compare careers side-by-side
- [ ] Export career information as PDF
- [ ] Career-to-course recommendations (AI-powered)
- [ ] Video interviews with professionals
- [ ] Salary calculator by location and experience
- [ ] Job market trends dashboard
- [ ] Career events and webinars integration

### Data Expansion
- [ ] Add 30+ more careers to reach 50+ total
- [ ] Include apprenticeship-specific careers
- [ ] Add career case studies and success stories
- [ ] Integrate real-time job market data
- [ ] Add diversity and inclusion information
- [ ] Include work-from-home viability ratings

## Troubleshooting

### Careers not appearing on the website

**Check:**
1. Firestore rules are deployed: `firebase deploy --only firestore:rules`
2. Seed script has run successfully: `npm run seed-careers`
3. API routes are working: Test `/api/careers` in browser
4. Check browser console for errors

### "Permission denied" errors

**Solution:**
- Ensure Firestore rules allow public read access
- Check that Firebase Admin SDK is properly initialized
- Verify service account credentials are set in environment variables

### Duplicate careers in database

**Solution:**
1. Go to Firebase Console > Firestore
2. Delete all documents in `careers` collection
3. Run seed script once: `npm run seed-careers`

### Seed script fails with "already exists"

**Solution:**
The script detects existing careers and exits to prevent duplicates. This is intentional. Clear the database first if you want to reseed.

## Support & Resources

### External Resources
- [National Careers Service](https://nationalcareers.service.gov.uk/)
- [UK Office for National Statistics](https://www.ons.gov.uk/)
- [UCAS Career Finder](https://www.ucas.com/explore/subjects)
- [Prospects Career Profiles](https://www.prospects.ac.uk/)

### Internal Documentation
- `SECTION_20_AI_ASSISTANT.md` - AI features overview
- `SECTION_14_DEBATES_SUMMARY.md` - Related learning features
- `README.md` - Main project documentation

## Questions?

If you need help or have questions about the Career Explorer system:
1. Check this guide first
2. Review the code comments in the files
3. Test API endpoints with Postman or browser
4. Check Firebase Console for data issues

---

**Last Updated:** November 2024  
**Version:** 1.0  
**Careers in Database:** 20+  
**Sectors Covered:** 8

