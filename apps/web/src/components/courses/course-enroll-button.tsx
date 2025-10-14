'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, BookOpen, CheckCircle, Lock, Users, Star } from 'lucide-react';

interface CourseEnrollButtonProps {
  courseSlug: string;
}

interface EnrollmentStatus {
  isEnrolled: boolean;
  isCompleted: boolean;
  progress: number;
  nextLessonId?: string;
  enrollmentCount: number;
  rating: number;
  price?: number;
  isPremium: boolean;
}

export function CourseEnrollButton({ courseSlug }: CourseEnrollButtonProps) {
  const [status, setStatus] = useState<EnrollmentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    // TODO: Fetch enrollment status from API
    setTimeout(() => {
      setStatus({
        isEnrolled: true,
        isCompleted: false,
        progress: 65,
        nextLessonId: '8',
        enrollmentCount: 1247,
        rating: 4.8,
        price: 0, // Free course
        isPremium: false,
      });
      setLoading(false);
    }, 500);
  }, [courseSlug]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      // TODO: Call enrollment API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus(prev => prev ? {
        ...prev,
        isEnrolled: true,
        enrollmentCount: prev.enrollmentCount + 1,
      } : null);
    } catch (error) {
      console.error('Enrollment failed:', error);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border p-6 animate-pulse">
        <div className="h-12 bg-gray-200 rounded mb-4" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    );
  }

  if (!status) return null;

  return (
    <div className="bg-white rounded-lg border p-6 space-y-4">
      {/* Enrollment Status */}
      {status.isEnrolled ? (
        <div className="space-y-4">
          {status.isCompleted ? (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Course Completed!</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Progress</span>
                <span className="text-sm font-bold text-blue-600">{status.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${status.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Continue/Start Button */}
          <Link
            href={status.nextLessonId 
              ? `/courses/${courseSlug}/lesson/${status.nextLessonId}`
              : `/courses/${courseSlug}/lesson/1`
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <Play className="w-5 h-5" />
            <span>{status.progress > 0 ? 'Continue Learning' : 'Start Course'}</span>
          </Link>

          {/* Certificate */}
          {status.isCompleted && (
            <button className="w-full border border-green-600 text-green-600 hover:bg-green-50 py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors">
              <CheckCircle className="w-4 h-4" />
              <span>Download Certificate</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Price */}
          <div className="text-center">
            {status.isPremium && status.price ? (
              <div>
                <div className="text-3xl font-bold text-gray-900">${status.price}</div>
                <div className="text-sm text-gray-600">One-time payment</div>
              </div>
            ) : (
              <div>
                <div className="text-3xl font-bold text-green-600">Free</div>
                <div className="text-sm text-gray-600">Full access included</div>
              </div>
            )}
          </div>

          {/* Enroll Button */}
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            {enrolling ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Enrolling...</span>
              </>
            ) : (
              <>
                <BookOpen className="w-5 h-5" />
                <span>Enroll Now</span>
              </>
            )}
          </button>

          {/* Premium Features */}
          {status.isPremium && (
            <div className="text-sm text-gray-600 space-y-2">
              <div className="font-medium">This course includes:</div>
              <ul className="space-y-1">
                <li>• Lifetime access to all content</li>
                <li>• Downloadable resources</li>
                <li>• Certificate of completion</li>
                <li>• Direct instructor support</li>
                <li>• 30-day money-back guarantee</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Course Stats */}
      <div className="pt-4 border-t space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-gray-600">
            <Users className="w-4 h-4" />
            <span>{status.enrollmentCount.toLocaleString()} students</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span>{status.rating} rating</span>
          </div>
        </div>

        {/* Money-back guarantee */}
        {status.isPremium && (
          <div className="text-xs text-gray-500 text-center">
            30-day money-back guarantee
          </div>
        )}
      </div>
    </div>
  );
}
