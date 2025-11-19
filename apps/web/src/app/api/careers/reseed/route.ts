import { NextResponse } from 'next/server';
import { getAllCareers, deleteCareer, batchCreateCareers } from '@/lib/services/careers-admin';
import { careersSeedData } from '@/lib/data/careers-seed-data';

/**
 * POST /api/careers/reseed - Clear and reseed the careers database
 * 
 * This will DELETE all existing careers and replace them with the seed data.
 * Use with caution!
 */
export async function POST() {
  try {
    console.log('🔄 Starting career database reseed...');

    // Get all existing careers
    const existingCareers = await getAllCareers();
    console.log(`📊 Found ${existingCareers.length} existing careers to delete...`);

    // Delete all existing careers
    if (existingCareers.length > 0) {
      console.log('🗑️  Deleting existing careers...');
      await Promise.all(existingCareers.map(career => deleteCareer(career.id)));
      console.log('✅ Existing careers deleted');
    }

    console.log(`🌱 Seeding ${careersSeedData.length} new careers...`);

    // Batch create all careers from seed data
    const createdIds = await batchCreateCareers(careersSeedData);

    const sectors = careersSeedData.reduce((acc, career) => {
      acc[career.sector] = (acc[career.sector] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('✅ Successfully reseeded careers!');

    return NextResponse.json(
      {
        success: true,
        message: 'Career database reseeded successfully!',
        summary: {
          deletedCount: existingCareers.length,
          createdCount: createdIds.length,
          totalSectors: Object.keys(sectors).length,
          highDemandRoles: careersSeedData.filter(c => c.demandLevel === 'high').length,
          trendingCareers: careersSeedData.filter(c => c.trending).length,
          sectorBreakdown: sectors,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error reseeding careers:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to reseed careers',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/careers/reseed - Get information about reseeding
 */
export async function GET() {
  try {
    const existingCareers = await getAllCareers();

    return NextResponse.json({
      currentCount: existingCareers.length,
      seedDataCount: careersSeedData.length,
      message: `Database has ${existingCareers.length} careers. Seed data contains ${careersSeedData.length} careers.`,
      action: 'Send a POST request to this endpoint to delete all careers and reseed with the full dataset.',
      warning: '⚠️ This will DELETE all existing careers!',
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to check reseed status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

