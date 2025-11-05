'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  MessageSquare, 
  Video,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

interface InterviewQuestion {
  id: string;
  question: string;
  description?: string;
  createdBy: string;
  createdAt: any;
  active: boolean;
  order: number;
}

interface Statistics {
  totalQuestions: number;
  activeQuestions: number;
  totalResponses: number;
  withFeedback: number;
  unviewed: number;
  pendingFeedback: number;
}

export default function InterviewLabAdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ question: '', description: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [questionsRes, statsRes] = await Promise.all([
        fetch('/api/interview-lab/questions'),
        fetch('/api/interview-lab/statistics'),
      ]);

      if (questionsRes.ok) {
        const data = await questionsRes.json();
        setQuestions(data);
      }

      if (statsRes.ok) {
        const data = await statsRes.json();
        setStatistics(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newQuestion.question.trim() || !user) return;

    try {
      const response = await fetch('/api/interview-lab/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: newQuestion.question,
          description: newQuestion.description,
          createdBy: user.uid,
        }),
      });

      if (response.ok) {
        setNewQuestion({ question: '', description: '' });
        setShowCreateForm(false);
        fetchData();
      }
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  const handleToggleActive = async (questionId: string, currentActive: boolean) => {
    try {
      const response = await fetch(`/api/interview-lab/questions/${questionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentActive }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error toggling question:', error);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm('Are you sure you want to delete this question? This cannot be undone if there are responses.')) {
      return;
    }

    try {
      const response = await fetch(`/api/interview-lab/questions/${questionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchData();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete question');
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Failed to delete question');
    }
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
          <div>
            <h1 className="text-3xl font-bold text-white">Interview Lab Admin</h1>
            <p className="text-gray-400 mt-1">Manage interview questions and review student responses</p>
          </div>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-red-600 hover:bg-red-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Question
          </Button>
        </div>

        {/* Statistics Cards */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Questions</p>
                  <p className="text-3xl font-bold text-white mt-1">{statistics.activeQuestions}</p>
                </div>
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Responses</p>
                  <p className="text-3xl font-bold text-white mt-1">{statistics.totalResponses}</p>
                </div>
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <Video className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Unviewed</p>
                  <p className="text-3xl font-bold text-white mt-1">{statistics.unviewed}</p>
                </div>
                <div className="bg-yellow-500/10 p-3 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Feedback</p>
                  <p className="text-3xl font-bold text-white mt-1">{statistics.pendingFeedback}</p>
                </div>
                <div className="bg-red-500/10 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Create Question Form */}
        {showCreateForm && (
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Create New Question</h3>
            <form onSubmit={handleCreateQuestion} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Interview Question *
                </label>
                <Input
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  placeholder="e.g., Tell me about a time when you demonstrated leadership..."
                  className="bg-gray-900 border-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={newQuestion.description}
                  onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
                  placeholder="Additional context or instructions for students..."
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  Create Question
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewQuestion({ question: '', description: '' });
                  }}
                  className="bg-gray-700 hover:bg-gray-600"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Questions List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Interview Questions</h2>
            <Link href="/admin/interview-lab/responses">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Eye className="w-4 h-4 mr-2" />
                View All Responses
              </Button>
            </Link>
          </div>

          {questions.length === 0 ? (
            <Card className="bg-gray-800/50 border-gray-700 p-12 text-center">
              <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-2">No interview questions yet</p>
              <p className="text-gray-500 mb-4">Create your first question to get started</p>
              <Button onClick={() => setShowCreateForm(true)} className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Create First Question
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {questions.map((question) => (
                <Card key={question.id} className="bg-gray-800/50 border-gray-700 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{question.question}</h3>
                        <Badge variant={question.active ? 'default' : 'secondary'}>
                          {question.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      {question.description && (
                        <p className="text-gray-400 text-sm mb-3">{question.description}</p>
                      )}
                      <p className="text-gray-500 text-xs">
                        Created {new Date(question.createdAt?.seconds * 1000).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Link href={`/admin/interview-lab/responses?questionId=${question.id}`}>
                        <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">
                          <Eye className="w-4 h-4 mr-1" />
                          Responses
                        </Button>
                      </Link>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleActive(question.id, question.active)}
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                      >
                        {question.active ? 'Deactivate' : 'Activate'}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </NetflixDashboardLayout>
  );
}

