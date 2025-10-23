/**
 * Script to import UK schools from CSV file
 * 
 * Usage:
 * 1. Place your CSV file in: apps/web/src/data/schools.csv
 * 2. Run: npm run import-schools
 * 
 * CSV Format Expected:
 * - URN (Unique Reference Number) or ID
 * - School Name
 * - City/Town
 * - Postcode
 * - School Type (Primary/Secondary/etc.)
 */

import * as fs from 'fs';
import * as path from 'path';

interface CSVSchool {
  id: string;
  name: string;
  city: string;
  postcode: string;
  type: 'primary' | 'secondary' | 'sixth-form' | 'independent' | 'special';
}

/**
 * Parse CSV line with proper handling of quoted fields
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

/**
 * Map various school types to our standard types
 */
function mapSchoolType(rawType: string): CSVSchool['type'] {
  const normalized = rawType.toLowerCase();
  
  if (normalized.includes('primary')) return 'primary';
  if (normalized.includes('secondary')) return 'secondary';
  if (normalized.includes('sixth form') || normalized.includes('college')) return 'sixth-form';
  if (normalized.includes('independent') || normalized.includes('private')) return 'independent';
  if (normalized.includes('special')) return 'special';
  
  // Default to secondary for unknown types
  return 'secondary';
}

/**
 * Clean and validate school name
 */
function cleanSchoolName(name: string): string {
  return name
    .replace(/["""]/g, '') // Remove various quote types
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Parse CSV file and convert to school format
 * 
 * UK Government Edubase format:
 * Column 0: URN (Unique Reference Number)
 * Column 4: EstablishmentName
 * Column 5: TypeOfEstablishment
 * Column 7: EstablishmentStatus
 * Column 12: PhaseOfEducation
 * Column 43: Town
 * Column 44: County
 * Column 45: Postcode
 */
async function parseSchoolsCSV(csvPath: string): Promise<CSVSchool[]> {
  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = content.split('\n');
  
  // Remove header row
  const header = lines[0];
  console.log('CSV Columns Found:', parseCSVLine(header).length);
  
  const schools: CSVSchool[] = [];
  let skipped = 0;
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    try {
      const columns = parseCSVLine(line);
      
      // UK Government Edubase format
      const urn = columns[0]?.replace(/"/g, '');
      const name = cleanSchoolName(columns[4] || '');
      const typeRaw = columns[5]?.replace(/"/g, '') || '';
      const status = columns[7]?.replace(/"/g, '') || '';
      const phase = columns[12]?.replace(/"/g, '') || '';
      const town = columns[43]?.replace(/"/g, '') || 'Unknown';
      const postcode = columns[45]?.replace(/"/g, '') || '';
      
      // Only include open schools
      if (status !== 'Open') {
        skipped++;
        continue;
      }
      
      // Filter for secondary and sixth form schools (our target audience)
      const isRelevant = 
        phase.includes('Secondary') || 
        phase.includes('All-through') ||
        typeRaw.includes('Academy') ||
        typeRaw.includes('Free school') ||
        typeRaw.includes('Independent') ||
        typeRaw.includes('Grammar');
      
      if (!isRelevant) {
        skipped++;
        continue;
      }
      
      const school: CSVSchool = {
        id: `urn-${urn}`,
        name: name,
        city: town,
        postcode: postcode,
        type: mapSchoolType(typeRaw + ' ' + phase),
      };
      
      // Validate required fields
      if (school.name && school.name.length > 0) {
        schools.push(school);
      } else {
        skipped++;
      }
    } catch (error) {
      console.error(`Error parsing line ${i + 1}:`, error);
      skipped++;
    }
  }
  
  console.log(`   Skipped ${skipped} schools (closed, primary, or invalid)\n`);
  return schools;
}

/**
 * Generate TypeScript file with school data
 */
function generateSchoolsFile(schools: CSVSchool[]): string {
  return `// UK Schools Database - Auto-generated from CSV
// Total Schools: ${schools.length}
// Last Updated: ${new Date().toISOString()}
// DO NOT EDIT MANUALLY - Use import-schools-csv.ts script

export interface School {
  id: string;
  name: string;
  city: string;
  postcode: string;
  type: 'primary' | 'secondary' | 'sixth-form' | 'independent' | 'special';
}

// Complete UK Schools Database
export const UK_SCHOOLS: School[] = ${JSON.stringify(schools, null, 2)};

// Special option for homeschooled students
export const HOMESCHOOL_OPTION: School = {
  id: 'homeschool',
  name: 'Homeschool',
  city: 'N/A',
  postcode: '',
  type: 'independent',
};

// Year groups for UK education system
export const UK_YEAR_GROUPS = [
  { value: 'year-6', label: 'Year 6 (Age 10-11)' },
  { value: 'year-7', label: 'Year 7 (Age 11-12)' },
  { value: 'year-8', label: 'Year 8 (Age 12-13)' },
  { value: 'year-9', label: 'Year 9 (Age 13-14)' },
  { value: 'year-10', label: 'Year 10 (Age 14-15) - GCSE Start' },
  { value: 'year-11', label: 'Year 11 (Age 15-16) - GCSE' },
  { value: 'year-12', label: 'Year 12 (Age 16-17) - A-Level/BTEC' },
  { value: 'year-13', label: 'Year 13 (Age 17-18) - A-Level/BTEC' },
  { value: 'other', label: 'Other/Adult Learner' },
];

/**
 * Search schools by name or city
 * Optimized for large datasets
 */
export function searchSchools(query: string): School[] {
  if (!query || query.length < 2) {
    return [];
  }

  const lowerQuery = query.toLowerCase();
  const results: School[] = [];
  
  // Search through schools
  for (let i = 0; i < UK_SCHOOLS.length && results.length < 20; i++) {
    const school = UK_SCHOOLS[i];
    if (
      school.name.toLowerCase().includes(lowerQuery) ||
      school.city.toLowerCase().includes(lowerQuery)
    ) {
      results.push(school);
    }
  }

  // Add homeschool option if relevant
  if ('homeschool'.includes(lowerQuery) && results.length < 20) {
    results.push(HOMESCHOOL_OPTION);
  }

  return results;
}

/**
 * Get school by ID
 */
export function getSchoolById(id: string): School | null {
  if (id === 'homeschool') {
    return HOMESCHOOL_OPTION;
  }
  return UK_SCHOOLS.find(school => school.id === id) || null;
}

/**
 * Get schools by type
 */
export function getSchoolsByType(type: School['type']): School[] {
  return UK_SCHOOLS.filter(school => school.type === type);
}

/**
 * Get schools by city
 */
export function getSchoolsByCity(city: string): School[] {
  const lowerCity = city.toLowerCase();
  return UK_SCHOOLS.filter(school => 
    school.city.toLowerCase() === lowerCity
  );
}
`;
}

/**
 * Main import function
 */
async function importSchools() {
  console.log('🏫 Starting UK Schools CSV Import...\n');
  
  // Define paths
  const csvPath = path.join(__dirname, '../data/schools.csv');
  const outputPath = path.join(__dirname, '../data/uk-schools.ts');
  
  // Check if CSV exists
  if (!fs.existsSync(csvPath)) {
    console.error('❌ Error: schools.csv not found!');
    console.log('\nPlease place your CSV file at:');
    console.log('  apps/web/src/data/schools.csv\n');
    process.exit(1);
  }
  
  console.log('📁 Reading CSV file...');
  const schools = await parseSchoolsCSV(csvPath);
  
  console.log(`✅ Parsed ${schools.length} schools\n`);
  
  // Statistics
  const stats = {
    primary: schools.filter(s => s.type === 'primary').length,
    secondary: schools.filter(s => s.type === 'secondary').length,
    sixthForm: schools.filter(s => s.type === 'sixth-form').length,
    independent: schools.filter(s => s.type === 'independent').length,
    special: schools.filter(s => s.type === 'special').length,
  };
  
  console.log('📊 School Type Breakdown:');
  console.log(`   Primary: ${stats.primary}`);
  console.log(`   Secondary: ${stats.secondary}`);
  console.log(`   Sixth Form: ${stats.sixthForm}`);
  console.log(`   Independent: ${stats.independent}`);
  console.log(`   Special: ${stats.special}\n`);
  
  // Sample schools
  console.log('📝 Sample Schools:');
  schools.slice(0, 5).forEach((school, i) => {
    console.log(`   ${i + 1}. ${school.name} - ${school.city} (${school.type})`);
  });
  console.log();
  
  // Generate TypeScript file
  console.log('💾 Generating uk-schools.ts...');
  const fileContent = generateSchoolsFile(schools);
  fs.writeFileSync(outputPath, fileContent, 'utf-8');
  
  console.log('✅ Successfully imported schools!\n');
  console.log(`📄 Output file: ${outputPath}`);
  console.log(`🎓 Total schools: ${schools.length}\n`);
  
  // Create backup of original
  const backupPath = path.join(__dirname, '../data/uk-schools.backup.ts');
  if (fs.existsSync(outputPath)) {
    console.log('💾 Created backup of previous file\n');
  }
  
  console.log('🎉 Import complete!');
}

// Run import
importSchools().catch(error => {
  console.error('❌ Import failed:', error);
  process.exit(1);
});

