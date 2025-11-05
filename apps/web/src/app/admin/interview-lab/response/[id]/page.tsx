'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter, useParams } from 'next/navigation';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Calendar,
  User,
  MessageSquare,
  Clock,
  Save,
  Star
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface InterviewResponse {
  id: string;
  questionId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  videoUrl: string;
  submittedAt: any;
  expiresAt: any;
  feedback?: {
    strengths: string;
    improvements: string;
    rating?: number;
    providedBy: string;
    providedAt: any;
  };
  viewed: boolean;
}

interface InterviewQuestion {
  id: string;
  question: string;
  description?: string;
}

export default function ResponseDetailPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const responseId = params.id as string;
  
  const [response, setResponse] = useState<InterviewResponse | null>(null);
  const [question, setQuestion] = useState<InterviewQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [feedback, setFeedback] = useState({
    strengths: '',
    improvements: '',
    rating: 0,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && responseId) {
      fetchData();
    }
  }, [user, responseId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const responseRes = await fetch(`/api/interview-lab/responses/${responseId}`);
      
      if (responseRes.ok) {
        const responseData = await responseRes.json();
        setResponse(responseData);
        
        // Pre-fill feedback if it exists
        if (responseData.feedback) {
          setFeedback({
            strengths: responseData.feedback.strengths || '',
            improvements: responseData.feedback.improvements || '',
            rating: responseData.feedback.rating || 0,
          });
        }

        // Fetch question
        const questionRes = await fetch(`/api/interview-lab/questions/${responseData.questionId}`);
        if (questionRes.ok) {
          const questionData = await questionRes.json();
          setQuestion(questionData);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load response');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.strengths.trim() || !feedback.improvements.trim()) {
      toast.error('Please fill in both strengths and improvements');
      return;
    }

    if (!user || !responseId) return;

    try {
      setSaving(true);
      
      const res = await fetch(`/api/interview-lab/responses/${responseId}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strengths: feedback.strengths,
          improvements: feedback.improvements,
          rating: feedback.rating > 0 ? feedback.rating : undefined,
          providedBy: user.uid,
        }),
      });

      if (res.ok) {
        toast.success('Feedback saved successfully!');
        fetchData(); // Refresh data
      } else {
        throw new Error('Failed to save feedback');
      }
    } catch (error) {
      console.error('Error saving feedback:', error);
      toast.error('Failed to save feedback');
    } finally {
      setSaving(false);
    }
  };

  const getDaysRemaining = (expiresAt: any) => {
    const now = new Date().getTime();
    const expires = expiresAt.seconds * 1000;
    const daysRemaining = Math.ceil((expires - now) / (1000 * 60 * 60 * 24));
    return daysRemaining;
  };

  if (authLoading || loading) {
    return (
      <NetflixDashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </NetflixDashboardLayout>
    );
  }

  if (!response) {
    return (
      <NetflixDashboardLayout>
        <Card className="bg-gray-800/50 border-gray-700 p-12 text-center">
          <p className="text-gray-400">Response not found</p>
          <Link href="/admin/interview-lab/responses">
            <Button className="mt-4 bg-red-600 hover:bg-red-700">
              Back to Responses
            </Button>
          </Link>
        </Card>
      </NetflixDashboardLayout>
    );
  }

  const daysRemaining = getDaysRemaining(response.expiresAt);
  const isExpiringSoon = daysRemaining <= 7;

  return (
    <NetflixDashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/admin/interview-lab/responses">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Interview Response</h1>
            <p className="text-gray-400 mt-1">Review and provide feedback</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Video & Info */}
          <div className="space-y-6">
            {/* Question Card */}
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Interview Question</h3>
              <p className="text-white font-medium text-lg">{question?.question}</p>
              {question?.description && (
                <p className="text-gray-400 text-sm mt-2">{question.description}</p>
              )}
            </Card>

            {/* Video Player */}
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Video Response</h3>
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  src={response.videoUrl}
                  controls
                  className="w-full h-full"
                  controlsList="nodownload"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </Card>

            {/* Student Info */}
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Student Information</h3>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{response.studentName}</p>
                  <p className="text-gray-400 text-sm">{response.studentEmail}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Submitted</span>
                  <span className="text-white">
                    {new Date(response.submittedAt.seconds * 1000).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Expires In</span>
                  <span className={isExpiringSoon ? 'text-yellow-500 font-medium' : 'text-white'}>
                    {daysRemaining} days
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-400">Status</span>
                  <div className="flex gap-2">
                    {response.viewed ? (
                      <Badge variant="default" className="bg-blue-500/10 text-blue-500">
                        Viewed
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
                        New
                      </Badge>
                    )}
                    {response.feedback ? (
                      <Badge variant="default" className="bg-green-500/10 text-green-500">
                        Feedback Provided
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-red-500/10 text-red-500">
                        Needs Feedback
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Feedback Form */}
          <div>
            <Card className="bg-gray-800/50 border-gray-700 p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-red-500" />
                <h3 className="text-xl font-semibold text-white">Provide Feedback</h3>
              </div>

              <form onSubmit={handleSaveFeedback} className="space-y-6">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Overall Rating (Optional)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedback({ ...feedback, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= feedback.rating
                              ? 'fill-yellow-500 text-yellow-500'
                              : 'text-gray-600'
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Strengths */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What they did well *
                  </label>
                  <textarea
                    value={feedback.strengths}
                    onChange={(e) => setFeedback({ ...feedback, strengths: e.target.value })}
                    placeholder="Highlight their strengths and positive aspects of their response..."
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    rows={5}
                    required
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Be specific and encouraging
                  </p>
                </div>

                {/* Improvements */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Areas for improvement *
                  </label>
                  <textarea
                    value={feedback.improvements}
                    onChange={(e) => setFeedback({ ...feedback, improvements: e.target.value })}
                    placeholder="Provide constructive feedback on how they can improve..."
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    rows={5}
                    required
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Be constructive and actionable
                  </p>
                </div>

                {/* Existing Feedback Info */}
                {response.feedback && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <p className="text-blue-400 text-sm">
                      Feedback was previously provided on{' '}
                      {new Date(response.feedback.providedAt.seconds * 1000).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {response.feedback ? 'Update Feedback' : 'Save Feedback'}
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </NetflixDashboardLayout>
  );
}

