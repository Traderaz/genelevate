# 🏫 UK Schools Database Integration Guide

## Overview

The Gen Elevate platform now includes a comprehensive school selection system for students during registration. This allows automatic sorting and organization of students by their educational institution.

## Current Implementation

### Features
- ✅ **Searchable School Database**: Students can search for their school by name or city
- ✅ **Homeschool Option**: Built-in support for homeschooled students
- ✅ **Year Group Selection**: UK education system (Year 6 to Year 13)
- ✅ **Auto-complete**: Live search results as students type
- ✅ **Validation**: Required fields with clear error messages
- ✅ **Database Organization**: Automatic student sorting by school in Firestore

### Current Schools
The starter database includes **32 prominent UK schools**:
- Top independent schools (Eton, Harrow, Westminster, etc.)
- Grammar schools across England
- Schools from major cities (London, Manchester, Birmingham, Bristol, etc.)
- Scottish schools (Edinburgh, Glasgow)
- Sample schools from various regions

## Expanding the School Database

### Option 1: Manual Addition (Quick Start)

Edit `apps/web/src/data/uk-schools.ts` and add schools to the `UK_SCHOOLS` array:

```typescript
export const UK_SCHOOLS: School[] = [
  // ... existing schools
  
  // Add your schools
  {
    id: 'sch-###',  // Unique ID
    name: 'Your School Name',
    city: 'City Name',
    postcode: 'XX## #XX',
    type: 'secondary', // or 'primary', 'sixth-form', 'independent', 'special'
  },
  
  // Add more...
];
```

### Option 2: UK Government Official Database (Recommended for Production)

#### Get Information About Schools (GIAS) API

The UK Department for Education provides a comprehensive, official database of all schools:

**API**: https://get-information-schools.service.gov.uk/

**Features**:
- 30,000+ UK schools
- Real-time updates
- Official government data
- Free to use
- RESTful API

**Implementation Steps**:

1. **Register for API Access** (if required)
   - Visit: https://get-information-schools.service.gov.uk/
   - Check API documentation for access requirements

2. **Install HTTP Client** (if not using fetch)
   ```bash
   npm install axios
   ```

3. **Create API Service** (`apps/web/src/services/gias-api.ts`):

```typescript
import axios from 'axios';

const GIAS_API_BASE = 'https://api.get-information-schools.service.gov.uk/v1';

export interface GIASSchool {
  urn: string;          // Unique Reference Number
  establishmentName: string;
  town: string;
  postcode: string;
  establishmentType: string;
  phaseOfEducation: string;
}

export async function searchGIASSchools(query: string): Promise<GIASSchool[]> {
  try {
    const response = await axios.get(`${GIAS_API_BASE}/establishments`, {
      params: {
        search: query,
        status: 'Open',
        pageSize: 10,
      },
    });
    
    return response.data.establishments || [];
  } catch (error) {
    console.error('GIAS API error:', error);
    return [];
  }
}

export function convertGIASToSchool(gias: GIASSchool): School {
  return {
    id: `urn-${gias.urn}`,
    name: gias.establishmentName,
    city: gias.town,
    postcode: gias.postcode,
    type: mapEstablishmentType(gias.establishmentType),
  };
}

function mapEstablishmentType(type: string): School['type'] {
  const lowerType = type.toLowerCase();
  if (lowerType.includes('primary')) return 'primary';
  if (lowerType.includes('secondary')) return 'secondary';
  if (lowerType.includes('independent')) return 'independent';
  if (lowerType.includes('sixth form')) return 'sixth-form';
  if (lowerType.includes('special')) return 'special';
  return 'secondary'; // default
}
```

4. **Update Search Function** in `apps/web/src/data/uk-schools.ts`:

```typescript
import { searchGIASSchools, convertGIASToSchool } from '@/services/gias-api';

export async function searchSchoolsWithAPI(query: string): Promise<School[]> {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    // Search GIAS API
    const giasSchools = await searchGIASSchools(query);
    const convertedSchools = giasSchools.map(convertGIASToSchool);
    
    // Add homeschool option if relevant
    if ('homeschool'.includes(query.toLowerCase())) {
      convertedSchools.push(HOMESCHOOL_OPTION);
    }
    
    return convertedSchools.slice(0, 10);
  } catch (error) {
    console.error('School search error:', error);
    // Fallback to local database
    return searchSchools(query);
  }
}
```

### Option 3: Edubase API

**Alternative Government Database**

- **API**: https://www.compare-school-performance.service.gov.uk/
- Includes performance data
- Free access
- Similar structure to GIAS

### Option 4: Commercial School Databases

For more comprehensive data:

1. **Tes Schools Data**
   - https://www.tes.com/
   - Paid API access
   - Includes reviews and ratings

2. **School Guide**
   - https://www.schoolguide.co.uk/
   - Comprehensive UK school data
   - API available on request

3. **Ofsted API**
   - https://www.gov.uk/government/organisations/ofsted
   - Inspection reports and ratings
   - Free for educational purposes

## Database Schema

### Firestore Structure

When students register, their data is stored in Firestore:

```typescript
// users/{userId}
{
  displayName: "John Smith",
  email: "john@example.com",
  role: "student",
  schoolId: "sch-001",
  schoolName: "Westminster School",
  yearGroup: "year-11",
  dateOfBirth: "2008-05-15",
  createdAt: Timestamp,
  // ... other fields
}
```

### Querying Students by School

```typescript
// Get all students from a specific school
const studentsRef = db.collection('users');
const query = studentsRef.where('schoolId', '==', 'sch-001');
const snapshot = await query.get();

// Get students by year group within a school
const query2 = studentsRef
  .where('schoolId', '==', 'sch-001')
  .where('yearGroup', '==', 'year-11');
```

### Creating School-Specific Cohorts

```typescript
// Institution portal can auto-create cohorts
const cohortData = {
  name: "Year 11 - Westminster School",
  institutionId: "inst-001",
  schoolId: "sch-001",
  yearGroup: "year-11",
  studentIds: studentIds, // Auto-populated from query
  createdAt: new Date(),
};

await db.collection('cohorts').add(cohortData);
```

## Year Groups

### UK Education System

The platform supports the complete UK education pathway:

```typescript
Year 6  → Age 10-11 → End of Primary
Year 7  → Age 11-12 → Start of Secondary
Year 8  → Age 12-13
Year 9  → Age 13-14
Year 10 → Age 14-15 → GCSE Start
Year 11 → Age 15-16 → GCSE Exams
Year 12 → Age 16-17 → A-Level/BTEC (Lower Sixth)
Year 13 → Age 17-18 → A-Level/BTEC (Upper Sixth)
Other   → Adult Learners / Mature Students
```

## Benefits of School Integration

### For Students
1. **Easier Registration**: Quick school selection with search
2. **School Community**: Connect with classmates on platform
3. **Relevant Content**: School-specific courses and resources

### For Schools/Institutions
1. **Automatic Organization**: Students auto-sorted by school
2. **Easy Cohort Management**: Create school-specific groups
3. **Analytics**: Track performance by school
4. **Referral Tracking**: Monitor which schools students come from

### For Platform
1. **Better Insights**: Understand geographic distribution
2. **Targeted Marketing**: School-specific campaigns
3. **Partnership Opportunities**: Reach out to schools with many students
4. **Data Quality**: Verified school information

## Migration Plan

### Phase 1: Current (Manual Database) ✅
- 32 prominent UK schools
- Homeschool option
- Manual additions as needed

### Phase 2: API Integration 🔄
- Integrate GIAS API for real-time school data
- Fallback to local database if API unavailable
- Cache frequently searched schools

### Phase 3: Enhanced Features 📅
- School verification badges
- School-specific landing pages
- Bulk student import for schools
- School admin accounts

## Testing

### Test Registration Flow

1. **As Student with School**:
   ```
   - Select "Student" role
   - Search for "Westminster"
   - Select "Westminster School"
   - Choose Year Group
   - Complete registration
   ```

2. **As Homeschooled Student**:
   ```
   - Select "Student" role
   - Type "Homeschool"
   - Select "Homeschool" option
   - Choose Year Group
   - Complete registration
   ```

3. **Verify Database**:
   ```typescript
   // Check Firestore
   const userDoc = await db.collection('users').doc(userId).get();
   console.log(userDoc.data().schoolId);     // Should be 'sch-001'
   console.log(userDoc.data().schoolName);   // Should be 'Westminster School'
   console.log(userDoc.data().yearGroup);    // Should be 'year-11'
   ```

## Troubleshooting

### School Not Found
- **Solution**: Students can type "Homeschool" or contact support
- **Long-term**: Add school via admin panel or API integration

### Duplicate Schools
- **Prevention**: Use unique school IDs (URNs from GIAS)
- **Detection**: Check for similar names during search

### API Rate Limits
- **Caching**: Cache search results locally
- **Fallback**: Use local database if API unavailable

## Support

For questions or to request school additions, contact support@genelevate.com

---

**Implementation Status**: ✅ Complete
**Last Updated**: 2024
**Version**: 1.0.0

