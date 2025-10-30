import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  addDoc,
  updateDoc,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';

export interface Course {
  id: string;
  title: string;
  description: string;
  subject: string;
  yearGroups: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  thumbnail?: string;
  chapters: Chapter[];
  tags: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  enrollmentCount?: number;
  rating?: number;
  featured?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  content: string; // Markdown content
  duration?: string; // e.g., "2 hours"
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  contentType: 'text' | 'video' | 'mixed';
  content?: string; // Markdown or text content
  videoUrl?: string;
  duration?: string;
}

/**
 * Fetch all published courses
 */
export async function getCourses(filters?: {
  subject?: string;
  yearGroup?: string;
  difficulty?: string;
  search?: string;
}): Promise<Course[]> {
  try {
    let q = query(
      collection(db, 'courses'),
      where('published', '==', true),
      orderBy('createdAt', 'desc')
    );

    if (filters?.subject) {
      q = query(q, where('subject', '==', filters.subject));
    }

    if (filters?.difficulty) {
      q = query(q, where('difficulty', '==', filters.difficulty));
    }

    const snapshot = await getDocs(q);
    const courses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Course[];

    // Client-side filtering for search and yearGroup (array contains)
    let filteredCourses = courses;

    if (filters?.yearGroup) {
      filteredCourses = filteredCourses.filter(course =>
        course.yearGroups.includes(filters.yearGroup!)
      );
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    return filteredCourses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

/**
 * Fetch a single course by ID or slug
 */
export async function getCourse(idOrSlug: string): Promise<Course | null> {
  try {
    const courseRef = doc(db, 'courses', idOrSlug);
    const courseDoc = await getDoc(courseRef);

    if (!courseDoc.exists()) {
      return null;
    }

    return {
      id: courseDoc.id,
      ...courseDoc.data(),
      createdAt: courseDoc.data().createdAt?.toDate() || new Date(),
      updatedAt: courseDoc.data().updatedAt?.toDate() || new Date(),
    } as Course;
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
}

/**
 * Fetch featured courses
 */
export async function getFeaturedCourses(limitCount = 3): Promise<Course[]> {
  try {
    const q = query(
      collection(db, 'courses'),
      where('published', '==', true),
      where('featured', '==', true),
      orderBy('enrollmentCount', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Course[];
  } catch (error) {
    console.error('Error fetching featured courses:', error);
    return [];
  }
}

/**
 * Create a new course
 */
export async function createCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'courses'), {
      ...courseData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      enrollmentCount: 0,
      rating: 0,
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
}

/**
 * Update a course
 */
export async function updateCourse(courseId: string, updates: Partial<Course>): Promise<void> {
  try {
    const courseRef = doc(db, 'courses', courseId);
    await updateDoc(courseRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
}

/**
 * Get course statistics
 */
export async function getCourseStats() {
  try {
    const coursesSnapshot = await getDocs(collection(db, 'courses'));
    const courses = coursesSnapshot.docs.map(doc => doc.data());

    const totalCourses = courses.length;
    const publishedCourses = courses.filter(c => c.published).length;
    const totalEnrollments = courses.reduce((sum, c) => sum + (c.enrollmentCount || 0), 0);
    
    // Calculate total chapters across all courses
    const totalChapters = courses.reduce((sum, c) => sum + (c.chapters?.length || 0), 0);

    return {
      totalCourses,
      publishedCourses,
      totalEnrollments,
      totalChapters,
    };
  } catch (error) {
    console.error('Error fetching course stats:', error);
    return {
      totalCourses: 0,
      publishedCourses: 0,
      totalEnrollments: 0,
      totalChapters: 0,
    };
  }
}

