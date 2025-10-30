import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';

export interface Webinar {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'live' | 'pre-recorded';
  
  // Scheduling
  scheduledDate: string; // ISO date string
  scheduledTime: string; // HH:MM format
  duration: number; // minutes
  timezone: string;
  
  // Content
  embedUrl: string; // YouTube, Vimeo, Zoom embed URL
  platform: 'zoom' | 'youtube' | 'vimeo';
  
  // Access Control - Auto paywall for all paid subscribers
  requiresSubscription: boolean; // Always true, enforced on backend
  maxAttendees?: number;
  
  // Additional Info
  thumbnail?: string;
  tags: string[];
  yearGroups: string[];
  hostName: string;
  hostBio: string;
  
  // Features
  enableChat: boolean;
  enableQA: boolean;
  
  // Metadata
  status: 'draft' | 'scheduled' | 'live' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  
  // Stats
  registeredCount: number;
  attendedCount: number;
}

/**
 * Create a new webinar
 * Automatically sets requiresSubscription to true for paywall
 */
export async function createWebinar(
  webinarData: Omit<Webinar, 'id' | 'createdAt' | 'updatedAt' | 'registeredCount' | 'attendedCount' | 'requiresSubscription'>
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'webinars'), {
      ...webinarData,
      requiresSubscription: true, // Always true - all webinars are behind paywall
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      publishedAt: webinarData.status === 'scheduled' ? serverTimestamp() : null,
      registeredCount: 0,
      attendedCount: 0,
    });

    console.log('✅ Webinar created with automatic paywall:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creating webinar:', error);
    throw error;
  }
}

/**
 * Update an existing webinar
 */
export async function updateWebinar(webinarId: string, updates: Partial<Webinar>): Promise<void> {
  try {
    const webinarRef = doc(db, 'webinars', webinarId);
    await updateDoc(webinarRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });

    console.log('✅ Webinar updated:', webinarId);
  } catch (error) {
    console.error('❌ Error updating webinar:', error);
    throw error;
  }
}

/**
 * Get a single webinar by ID
 */
export async function getWebinar(webinarId: string): Promise<Webinar | null> {
  try {
    const webinarRef = doc(db, 'webinars', webinarId);
    const webinarDoc = await getDoc(webinarRef);

    if (!webinarDoc.exists()) {
      return null;
    }

    const data = webinarDoc.data();
    return {
      id: webinarDoc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      publishedAt: data.publishedAt?.toDate(),
    } as Webinar;
  } catch (error) {
    console.error('❌ Error fetching webinar:', error);
    return null;
  }
}

/**
 * Get all webinars (with optional filters)
 */
export async function getWebinars(filters?: {
  status?: 'draft' | 'scheduled' | 'live' | 'completed' | 'cancelled';
  type?: 'live' | 'pre-recorded';
  category?: string;
  yearGroup?: string;
}): Promise<Webinar[]> {
  try {
    console.log('🔍 Fetching webinars with filters:', filters);
    
    let q = query(collection(db, 'webinars'));

    // Only show published webinars to students (not drafts)
    if (filters?.status) {
      q = query(q, where('status', '==', filters.status));
    }

    if (filters?.type) {
      q = query(q, where('type', '==', filters.type));
    }

    if (filters?.category) {
      q = query(q, where('category', '==', filters.category));
    }

    const snapshot = await getDocs(q);
    console.log(`📺 Found ${snapshot.docs.length} webinars`);
    
    let webinars = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        publishedAt: data.publishedAt?.toDate(),
      };
    }) as Webinar[];

    // Client-side filtering for yearGroup (array contains)
    if (filters?.yearGroup) {
      webinars = webinars.filter(webinar =>
        webinar.yearGroups.includes(filters.yearGroup!)
      );
    }

    // Sort by scheduled date
    webinars.sort((a, b) => {
      const dateA = new Date(`${a.scheduledDate}T${a.scheduledTime}`);
      const dateB = new Date(`${b.scheduledDate}T${b.scheduledTime}`);
      return dateB.getTime() - dateA.getTime();
    });

    return webinars;
  } catch (error) {
    console.error('❌ Error fetching webinars:', error);
    return [];
  }
}

/**
 * Get upcoming webinars (scheduled for the future)
 */
export async function getUpcomingWebinars(limit = 10): Promise<Webinar[]> {
  try {
    const webinars = await getWebinars({ status: 'scheduled' });
    
    // Filter for future dates
    const now = new Date();
    const upcoming = webinars.filter(webinar => {
      const webinarDate = new Date(`${webinar.scheduledDate}T${webinar.scheduledTime}`);
      return webinarDate > now;
    });

    return upcoming.slice(0, limit);
  } catch (error) {
    console.error('❌ Error fetching upcoming webinars:', error);
    return [];
  }
}

/**
 * Get live webinars (currently happening)
 */
export async function getLiveWebinars(): Promise<Webinar[]> {
  try {
    return await getWebinars({ status: 'live' });
  } catch (error) {
    console.error('❌ Error fetching live webinars:', error);
    return [];
  }
}

/**
 * Delete a webinar
 */
export async function deleteWebinar(webinarId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'webinars', webinarId));
    console.log('✅ Webinar deleted:', webinarId);
  } catch (error) {
    console.error('❌ Error deleting webinar:', error);
    throw error;
  }
}

/**
 * Register user for a webinar
 */
export async function registerForWebinar(webinarId: string, userId: string): Promise<void> {
  try {
    // Add registration document
    await addDoc(collection(db, 'webinarRegistrations'), {
      webinarId,
      userId,
      registeredAt: serverTimestamp(),
      attended: false,
    });

    // Increment registered count
    const webinarRef = doc(db, 'webinars', webinarId);
    const webinar = await getDoc(webinarRef);
    if (webinar.exists()) {
      await updateDoc(webinarRef, {
        registeredCount: (webinar.data().registeredCount || 0) + 1,
      });
    }

    console.log('✅ User registered for webinar:', webinarId);
  } catch (error) {
    console.error('❌ Error registering for webinar:', error);
    throw error;
  }
}

