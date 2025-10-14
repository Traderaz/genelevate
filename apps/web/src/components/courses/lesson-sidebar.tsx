'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  MessageSquare, 
  BookOpen, 
  Clock,
  Award,
  Target,
  Users,
  ThumbsUp,
  Share2
} from 'lucide-react';

interface LessonSidebarProps {
  courseSlug: string;
  lessonId: string;
}

interface LessonDetails {
  id: string;
  title: string;
  description: string;
  duration: number;
  pointsValue: number;
  resources: Resource[];
  notes: string;
  transcript?: string;
}

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'image' | 'document';
  url: string;
  description?: string;
  size?: string;
}

export function LessonSidebar({ courseSlug, lessonId }: LessonSidebarProps) {
  const [lesson, setLesson] = useState<LessonDetails | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'notes' | 'transcript'>('overview');
  const [loading, setLoading] = useState(true);
  const [userNotes, setUserNotes] = useState('');

  useEffect(() => {
    // TODO: Fetch lesson details from API
    setTimeout(() => {
      setLesson({
        id: lessonId,
        title: 'Understanding Limits',
        description: 'In this lesson, we explore the fundamental concept of limits in calculus. You\'ll learn how to evaluate limits algebraically and graphically, understand the formal definition, and see how limits form the foundation for derivatives and integrals.',
        duration: 30,
        pointsValue: 40,
        resources: [
          {
            id: '1',
            title: 'Lesson Slides',
            type: 'pdf',
            url: '/resources/limits-slides.pdf',
            description: 'Complete slide deck for this lesson',
            size: '2.4 MB',
          },
          {
            id: '2',
            title: 'Practice Problems',
            type: 'pdf',
            url: '/resources/limits-practice.pdf',
            description: 'Additional practice problems with solutions',
            size: '1.8 MB',
          },
          {
            id: '3',
            title: 'Graphing Calculator',
            type: 'link',
            url: 'https://www.desmos.com/calculator',
            description: 'Online graphing tool for visualizing limits',
          },
          {
            id: '4',
            title: 'Reference Sheet',
            type: 'image',
            url: '/resources/limits-reference.png',
            description: 'Quick reference for limit laws and formulas',
            size: '856 KB',
          },
        ],
        notes: 'Key concepts to remember:\n\n• A limit describes the behavior of a function as the input approaches a particular value\n• Limits can exist even when the function is not defined at that point\n• The limit laws allow us to evaluate complex limits by breaking them down\n• Graphical analysis can help visualize limit behavior',
        transcript: 'Welcome to this lesson on understanding limits. Today we\'re going to explore one of the most fundamental concepts in calculus...',
      });
      setLoading(false);
    }, 500);
  }, [lessonId]);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'link': return '🔗';
      case 'image': return '🖼️';
      case 'document': return '📝';
      default: return '📎';
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
        <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
        <div className="h-32 bg-gray-200 animate-pulse rounded" />
      </div>
    );
  }

  if (!lesson) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Lesson Header */}
      <div className="p-4 border-b">
        <h2 className="font-semibold text-gray-900 mb-2">{lesson.title}</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(lesson.duration)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Award className="w-4 h-4" />
            <span>{lesson.pointsValue} pts</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="flex">
          {[
            { id: 'overview', label: 'Overview', icon: BookOpen },
            { id: 'resources', label: 'Resources', icon: FileText },
            { id: 'notes', label: 'Notes', icon: MessageSquare },
            { id: 'transcript', label: 'Transcript', icon: FileText },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex-1 flex items-center justify-center space-x-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="p-4 space-y-6">
            {/* Lesson Description */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">About This Lesson</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{lesson.description}</p>
            </div>

            {/* Learning Objectives */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Learning Objectives</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Understand the concept of limits and their notation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Evaluate limits using algebraic techniques</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Interpret limits graphically and numerically</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Apply limit laws to solve complex problems</span>
                </li>
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span>Mark as Helpful</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share Lesson</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-4">Lesson Resources</h3>
            <div className="space-y-3">
              {lesson.resources.map((resource) => (
                <div key={resource.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{getResourceIcon(resource.type)}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{resource.title}</h4>
                      {resource.description && (
                        <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        {resource.size && (
                          <span className="text-xs text-gray-500">{resource.size}</span>
                        )}
                        <a
                          href={resource.url}
                          target={resource.type === 'link' ? '_blank' : '_self'}
                          rel={resource.type === 'link' ? 'noopener noreferrer' : undefined}
                          className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                        >
                          <Download className="w-4 h-4" />
                          <span>{resource.type === 'link' ? 'Open' : 'Download'}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="p-4 space-y-4">
            {/* Lesson Notes */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Lesson Notes</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {lesson.notes}
                </pre>
              </div>
            </div>

            {/* Personal Notes */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Your Notes</h3>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Add your personal notes here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Save Notes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'transcript' && (
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-4">Video Transcript</h3>
            {lesson.transcript ? (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {lesson.transcript}
                </p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Transcript not available for this lesson</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
