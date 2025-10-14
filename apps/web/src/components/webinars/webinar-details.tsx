'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Clock, Users, Globe } from 'lucide-react';

interface WebinarDetailsProps {
  webinarId: string;
}

interface WebinarDetailsData {
  description: string;
  learningObjectives: string[];
  prerequisites: string[];
  targetAudience: string[];
  format: string;
  language: string;
  timezone: string;
}

export function WebinarDetails({ webinarId }: WebinarDetailsProps) {
  const [details, setDetails] = useState<WebinarDetailsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch webinar details from API
    setTimeout(() => {
      setDetails({
        description: 'This comprehensive webinar will cover advanced integration techniques essential for A-Level mathematics and university preparation. We\'ll explore integration by parts, trigonometric substitution, partial fractions, and their real-world applications.',
        learningObjectives: [
          'Master integration by parts technique',
          'Understand trigonometric substitution methods',
          'Apply partial fraction decomposition',
          'Solve complex integration problems',
          'Recognize when to use each technique',
        ],
        prerequisites: [
          'Basic calculus knowledge',
          'Understanding of derivatives',
          'Familiarity with trigonometric functions',
          'Algebraic manipulation skills',
        ],
        targetAudience: [
          'A-Level Mathematics students',
          'University preparation students',
          'Mathematics enthusiasts',
          'Teachers and tutors',
        ],
        format: 'Interactive live session',
        language: 'English',
        timezone: 'GMT (London)',
      });
      setLoading(false);
    }, 500);
  }, [webinarId]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg border p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-1/2" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full" />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-1/2" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!details) return null;

  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">About This Webinar</h2>
      
      {/* Description */}
      <div>
        <p className="text-gray-700 leading-relaxed">{details.description}</p>
      </div>

      {/* Learning Objectives and Prerequisites */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Learning Objectives */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>What You'll Learn</span>
          </h3>
          <ul className="space-y-2">
            {details.learningObjectives.map((objective, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prerequisites */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span>Prerequisites</span>
          </h3>
          <ul className="space-y-2">
            {details.prerequisites.map((prerequisite, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <span>{prerequisite}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Target Audience and Format */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Target Audience */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
            <Users className="w-5 h-5 text-purple-600" />
            <span>Who Should Attend</span>
          </h3>
          <ul className="space-y-2">
            {details.targetAudience.map((audience, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                <span>{audience}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Format & Details */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
            <Globe className="w-5 h-5 text-orange-600" />
            <span>Session Details</span>
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Format:</span>
              <span className="font-medium">{details.format}</span>
            </div>
            <div className="flex justify-between">
              <span>Language:</span>
              <span className="font-medium">{details.language}</span>
            </div>
            <div className="flex justify-between">
              <span>Timezone:</span>
              <span className="font-medium">{details.timezone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
