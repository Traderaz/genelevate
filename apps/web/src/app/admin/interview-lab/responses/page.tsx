'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter, useSearchParams } from 'next/navigation';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Video,
  MessageSquare,
  Calendar,
  User,
  Eye,
  CheckCircle,
  Clock
} from 'lucide-react';
import Link from 'next/link';

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
}

export default function InterviewResponsesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const questionId = searchParams.get('questionId');
  
  const [responses, setResponses] = useState<InterviewResponse[]>([]);
  const [questions, setQuestions] = useState<Map<string, InterviewQuestion>>(new Map());
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'viewed' | 'unviewed' | 'feedback' | 'pending'>('all');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, questionId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const url = questionId 
        ? `/api/interview-lab/responses?questionId=${questionId}`
        : '/api/interview-lab/responses';
      
      const [responsesRes, questionsRes] = await Promise.all([
        fetch(url),
        fetch('/api/interview-lab/questions'),
      ]);

      if (responsesRes.ok) {
        const data = await responsesRes.json();
        setResponses(data);
      }

      if (questionsRes.ok) {
        const data = await questionsRes.json();
        const questionsMap = new Map();
        data.forEach((q: InterviewQuestion) => questionsMap.set(q.id, q));
        setQuestions(questionsMap);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredResponses = responses.filter((response) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'viewed') return response.viewed;
    if (filterStatus === 'unviewed') return !response.viewed;
    if (filterStatus === 'feedback') return response.feedback;
    if (filterStatus === 'pending') return !response.feedback;
    return true;
  });

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

  return (
    <NetflixDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/interview-lab">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Student Responses</h1>
              <p className="text-gray-400 mt-1">
                {questionId && questions.get(questionId)
                  ? `For: ${questions.get(questionId)?.question}`
                  : 'All interview responses'}
              </p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            onClick={() => setFilterStatus('all')}
            variant={filterStatus === 'all' ? 'default' : 'ghost'}
            size="sm"
            className={filterStatus === 'all' ? 'bg-red-600' : ''}
          >
            All ({responses.length})
          </Button>
          <Button
            onClick={() => setFilterStatus('unviewed')}
            variant={filterStatus === 'unviewed' ? 'default' : 'ghost'}
            size="sm"
            className={filterStatus === 'unviewed' ? 'bg-red-600' : ''}
          >
            Unviewed ({responses.filter(r => !r.viewed).length})
          </Button>
          <Button
            onClick={() => setFilterStatus('viewed')}
            variant={filterStatus === 'viewed' ? 'default' : 'ghost'}
            size="sm"
            className={filterStatus === 'viewed' ? 'bg-red-600' : ''}
          >
            Viewed ({responses.filter(r => r.viewed).length})
          </Button>
          <Button
            onClick={() => setFilterStatus('pending')}
            variant={filterStatus === 'pending' ? 'default' : 'ghost'}
            size="sm"
            className={filterStatus === 'pending' ? 'bg-red-600' : ''}
          >
            Pending Feedback ({responses.filter(r => !r.feedback).length})
          </Button>
          <Button
            onClick={() => setFilterStatus('feedback')}
            variant={filterStatus === 'feedback' ? 'default' : 'ghost'}
            size="sm"
            className={filterStatus === 'feedback' ? 'bg-red-600' : ''}
          >
            With Feedback ({responses.filter(r => r.feedback).length})
          </Button>
        </div>

        {/* Responses List */}
        {filteredResponses.length === 0 ? (
          <Card className="bg-gray-800/50 border-gray-700 p-12 text-center">
            <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">No responses found</p>
            <p className="text-gray-500">
              {filterStatus !== 'all' ? 'Try changing your filter' : 'Responses will appear here when students submit'}
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredResponses.map((response) => {
              const daysRemaining = getDaysRemaining(response.expiresAt);
              const isExpiringSoon = daysRemaining <= 7;

              return (
                <Card key={response.id} className="bg-gray-800/50 border-gray-700 p-6 hover:bg-gray-800/70 transition-colors">
                  <div className="space-y-4">
                    {/* Question */}
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Question</p>
                      <p className="text-white font-medium">
                        {questions.get(response.questionId)?.question || 'Unknown Question'}
                      </p>
                    </div>

                    {/* Student Info */}
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-10 h-10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{response.studentName}</p>
                        <p className="text-gray-400 text-sm">{response.studentEmail}</p>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {new Date(response.submittedAt.seconds * 1000).toLocaleDateString()}
                      </div>
                      <div className={`flex items-center gap-1 ${isExpiringSoon ? 'text-yellow-500' : 'text-gray-400'}`}>
                        <Clock className="w-4 h-4" />
                        {daysRemaining} days left
                      </div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex flex-wrap gap-2">
                      {!response.viewed && (
                        <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
                          Unviewed
                        </Badge>
                      )}
                      {response.feedback ? (
                        <Badge variant="default" className="bg-green-500/10 text-green-500">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Feedback Provided
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-red-500/10 text-red-500">
                          Needs Feedback
                        </Badge>
                      )}
                    </div>

                    {/* Feedback Preview */}
                    {response.feedback && (
                      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-green-500">Feedback</span>
                          {response.feedback.rating && (
                            <span className="text-sm text-gray-400">
                              • {response.feedback.rating}/5
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-300 line-clamp-2">
                          {response.feedback.strengths}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <Link href={`/admin/interview-lab/response/${response.id}`}>
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        <Eye className="w-4 h-4 mr-2" />
                        View & Provide Feedback
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </NetflixDashboardLayout>
  );
}

