/**
 * Career Database Seeding Script
 * 
 * This script populates the Firestore database with real UK career data.
 * 
 * Usage:
 *   npm run seed-careers
 * 
 * Or manually via Node:
 *   npx ts-node --project tsconfig.json src/scripts/seed-careers.ts
 */

import { batchCreateCareers, getAllCareers } from '../lib/services/careers-admin';
import { careersSeedData } from '../lib/data/careers-seed-data';

async function seedCareers() {
  console.log('🌱 Starting career database seeding...\n');

  try {
    // Check if careers already exist
    const existingCareers = await getAllCareers();
    
    if (existingCareers.length > 0) {
      console.log(`⚠️  Database already contains ${existingCareers.length} careers.`);
      console.log('Do you want to proceed? This will add duplicate entries.');
      console.log('Tip: Manually delete existing careers from Firestore Console first.\n');
      
      // In production, you might want to add a confirmation prompt here
      // For now, we'll just warn and exit
      console.log('Exiting to prevent duplicates. Clear the database first if you want to reseed.\n');
      return;
    }

    console.log(`📊 Preparing to seed ${careersSeedData.length} careers...\n`);

    // Batch create all careers
    const createdIds = await batchCreateCareers(careersSeedData);

    console.log('✅ Successfully seeded careers!\n');
    console.log('📈 Summary:');
    console.log(`   - Total careers created: ${createdIds.length}`);
    console.log(`   - Sectors covered: ${new Set(careersSeedData.map(c => c.sector)).size}`);
    console.log(`   - High demand roles: ${careersSeedData.filter(c => c.demandLevel === 'high').length}`);
    console.log(`   - Trending careers: ${careersSeedData.filter(c => c.trending).length}\n`);

    // Show sector breakdown
    const sectors = careersSeedData.reduce((acc, career) => {
      acc[career.sector] = (acc[career.sector] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('📚 Careers by sector:');
    Object.entries(sectors)
      .sort(([, a], [, b]) => b - a)
      .forEach(([sector, count]) => {
        console.log(`   - ${sector}: ${count} careers`);
      });

    console.log('\n🎉 Career database is ready! Visit /careers to explore.\n');

  } catch (error) {
    console.error('❌ Error seeding careers:', error);
    process.exit(1);
  }
}

// Run the seed function
seedCareers()
  .then(() => {
    console.log('✨ Seeding complete!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });

