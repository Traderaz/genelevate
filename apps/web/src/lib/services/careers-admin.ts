import { adminDb, initializeFirebaseAdmin } from '@/lib/firebase-admin';
import type { CareerDetail } from '@/types/career';

// Initialize Firebase Admin
initializeFirebaseAdmin();

const careersCollection = adminDb.collection('careers');

/**
 * Create a new career in Firestore
 */
export async function createCareer(careerData: Omit<CareerDetail, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const now = new Date();
  
  const docRef = await careersCollection.add({
    ...careerData,
    createdAt: now,
    updatedAt: now,
  });

  return docRef.id;
}

/**
 * Get all careers (with optional filters)
 */
export async function getAllCareers(filters?: {
  sector?: string;
  demandLevel?: string;
  trending?: boolean;
  limit?: number;
}): Promise<CareerDetail[]> {
  let query: FirebaseFirestore.Query = careersCollection;

  if (filters?.sector && filters.sector !== 'all') {
    query = query.where('sector', '==', filters.sector);
  }

  if (filters?.demandLevel && filters.demandLevel !== 'all') {
    query = query.where('demandLevel', '==', filters.demandLevel);
  }

  if (filters?.trending !== undefined) {
    query = query.where('trending', '==', filters.trending);
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  const snapshot = await query.get();
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate() || new Date(),
  })) as CareerDetail[];
}

/**
 * Get a single career by ID
 */
export async function getCareerById(careerId: string): Promise<CareerDetail | null> {
  const doc = await careersCollection.doc(careerId).get();
  
  if (!doc.exists) {
    return null;
  }

  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: data?.createdAt?.toDate() || new Date(),
    updatedAt: data?.updatedAt?.toDate() || new Date(),
  } as CareerDetail;
}

/**
 * Update an existing career
 */
export async function updateCareer(careerId: string, updates: Partial<CareerDetail>): Promise<void> {
  await careersCollection.doc(careerId).update({
    ...updates,
    updatedAt: new Date(),
  });
}

/**
 * Delete a career
 */
export async function deleteCareer(careerId: string): Promise<void> {
  await careersCollection.doc(careerId).delete();
}

/**
 * Search careers by query
 */
export async function searchCareers(query: string): Promise<CareerDetail[]> {
  // Firestore doesn't support full-text search natively
  // We'll get all careers and filter client-side
  // In production, consider using Algolia or ElasticSearch
  const allCareers = await getAllCareers();
  
  const lowerQuery = query.toLowerCase();
  
  return allCareers.filter(career => 
    career.title.toLowerCase().includes(lowerQuery) ||
    career.description.toLowerCase().includes(lowerQuery) ||
    career.sector.toLowerCase().includes(lowerQuery) ||
    career.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get career statistics
 */
export async function getCareerStatistics() {
  const snapshot = await careersCollection.get();
  const careers = snapshot.docs.map(doc => doc.data());

  const sectors = Array.from(new Set(careers.map(c => c.sector)));
  const totalCareers = careers.length;
  const highDemand = careers.filter(c => c.demandLevel === 'high').length;
  const trending = careers.filter(c => c.trending).length;

  return {
    totalCareers,
    sectors: sectors.length,
    highDemand,
    trending,
    sectorBreakdown: sectors.map(sector => ({
      name: sector,
      count: careers.filter(c => c.sector === sector).length,
    })),
  };
}

/**
 * Batch create multiple careers (useful for seeding)
 */
export async function batchCreateCareers(careersData: Omit<CareerDetail, 'id' | 'createdAt' | 'updatedAt'>[]): Promise<string[]> {
  const batch = adminDb.batch();
  const ids: string[] = [];
  const now = new Date();

  careersData.forEach(careerData => {
    const docRef = careersCollection.doc();
    ids.push(docRef.id);
    batch.set(docRef, {
      ...careerData,
      createdAt: now,
      updatedAt: now,
    });
  });

  await batch.commit();
  return ids;
}

