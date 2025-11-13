import { NextResponse } from 'next/server';
import { batchCreateCareers, getAllCareers } from '@/lib/services/careers-admin';
import { careersSeedData } from '@/lib/data/careers-seed-data';

/**
 * POST /api/careers/seed - Seed the careers database
 * 
 * This is a one-time operation to populate the database with career data.
 * For security, you might want to add authentication or remove this after seeding.
 */
export async function POST() {
  try {
    console.log('🌱 Starting career database seeding...');

    // Check if careers already exist
    const existingCareers = await getAllCareers();
    
    if (existingCareers.length > 0) {
      return NextResponse.json(
        {
          message: `Database already contains ${existingCareers.length} careers. Delete existing careers first if you want to reseed.`,
          existingCount: existingCareers.length,
        },
        { status: 400 }
      );
    }

    console.log(`📊 Preparing to seed ${careersSeedData.length} careers...`);

    // Batch create all careers
    const createdIds = await batchCreateCareers(careersSeedData);

    const sectors = careersSeedData.reduce((acc, career) => {
      acc[career.sector] = (acc[career.sector] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('✅ Successfully seeded careers!');

    return NextResponse.json(
      {
        success: true,
        message: 'Career database seeded successfully!',
        summary: {
          totalCreated: createdIds.length,
          sectors: Object.keys(sectors).length,
          highDemandRoles: careersSeedData.filter(c => c.demandLevel === 'high').length,
          trendingCareers: careersSeedData.filter(c => c.trending).length,
          sectorBreakdown: sectors,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error seeding careers:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to seed careers',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/careers/seed - Get seeding status
 */
export async function GET() {
  try {
    const existingCareers = await getAllCareers();
    const isSeeded = existingCareers.length > 0;

    return NextResponse.json({
      isSeeded,
      currentCount: existingCareers.length,
      seedDataCount: careersSeedData.length,
      message: isSeeded
        ? `Database contains ${existingCareers.length} careers`
        : 'Database is empty. Send a POST request to /api/careers/seed to populate it.',
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to check seed status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

