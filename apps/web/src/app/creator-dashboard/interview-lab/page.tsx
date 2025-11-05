'use client';

import { useState, useEffect } from 'react';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { ContentCreatorOnlyGuard } from '@/components/auth/role-guard';
import { useAuth } from '@/contexts/auth-context';
import {
  getInterviewQuestions,
  getInterviewResponses,
  createInterviewQuestion,
  updateInterviewQuestion,
  deleteInterviewQuestion,
  addInterviewFeedback,
  deleteInterviewResponse,
  InterviewQuestion,
  InterviewResponse,
} from '@/lib/services/interview-lab';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Plus, 
  Edit, 
  Trash2, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Loader2,
  Eye,
  X
} from 'lucide-react';
import { toast } from 'sonner';

export default function InterviewLabAdminPage() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [responses, setResponses] = useState<InterviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<InterviewResponse | null>(null);
  const [feedbackForm, setFeedbackForm] = useState({
    strengths: '',
    improvements: '',
    rating: 0
  });
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  // Form state for creating/editing questions
  const [formData, setFormData] = useState({
    question: '',
    description: '',
    active: true,
    order: 0,
  });
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [questionsData, responsesData] = await Promise.all([
        getInterviewQuestions(),
        getInterviewResponses(),
      ]);

      console.log('Admin fetched questions:', questionsData);
      setQuestions(questionsData);
      setResponses(responsesData);
    } catch (error) {
      console.error('Error fetching interview lab data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuestion = async () => {
    if (!user || !formData.question.trim()) {
      toast.error('Please enter a question');
      return;
    }

    try {
      await createInterviewQuestion(user.uid, {
        ...formData,
        order: questions.length + 1,
      });

      toast.success('Question created successfully!');
      setShowCreateModal(false);
      setFormData({ question: '', description: '', active: true, order: 0 });
      await fetchData();
    } catch (error) {
      console.error('Error creating question:', error);
      toast.error('Failed to create question');
    }
  };

  const handleUpdateQuestion = async (questionId: string) => {
    if (!formData.question.trim()) {
      toast.error('Please enter a question');
      return;
    }

    try {
      await updateInterviewQuestion(questionId, formData);
      toast.success('Question updated successfully!');
      setEditingQuestionId(null);
      setFormData({ question: '', description: '', active: true, order: 0 });
      await fetchData();
    } catch (error) {
      console.error('Error updating question:', error);
      toast.error('Failed to update question');
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm('Are you sure? This will delete all student responses to this question.')) {
      return;
    }

    try {
      await deleteInterviewQuestion(questionId);
      toast.success('Question deleted successfully');
      await fetchData();
    } catch (error) {
      console.error('Error deleting question:', error);
      toast.error('Failed to delete question');
    }
  };

  const handleSubmitFeedback = async () => {
    if (!user || !selectedResponse || !feedbackForm.strengths.trim() || !feedbackForm.improvements.trim()) {
      toast.error('Please fill in both strengths and improvements');
      return;
    }

    try {
      setSubmittingFeedback(true);
      await addInterviewFeedback(selectedResponse.id, {
        strengths: feedbackForm.strengths,
        improvements: feedbackForm.improvements,
        rating: feedbackForm.rating || undefined,
        providedBy: user.uid,
      });

      toast.success('Feedback submitted successfully!');
      setShowResponseModal(false);
      setSelectedResponse(null);
      setFeedbackForm({ strengths: '', improvements: '', rating: 0 });
      await fetchData();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const handleDeleteResponse = async (responseId: string) => {
    if (!confirm('Are you sure you want to delete this response?')) {
      return;
    }

    try {
      await deleteInterviewResponse(responseId);
      toast.success('Response deleted successfully');
      setShowResponseModal(false);
      setSelectedResponse(null);
      await fetchData();
    } catch (error) {
      console.error('Error deleting response:', error);
      toast.error('Failed to delete response');
    }
  };

  const getQuestionById = (questionId: string) => {
    return questions.find(q => q.id === questionId);
  };

  const startEditingQuestion = (question: InterviewQuestion) => {
    setEditingQuestionId(question.id);
    setFormData({
      question: question.question,
      description: question.description || '',
      active: question.active,
      order: question.order,
    });
  };

  const getResponsesForQuestion = (questionId: string) => {
    return responses.filter(r => r.questionId === questionId);
  };

  if (loading) {
    return (
      <ContentCreatorOnlyGuard>
        <NetflixDashboardLayout>
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </NetflixDashboardLayout>
      </ContentCreatorOnlyGuard>
    );
  }

  return (
    <ContentCreatorOnlyGuard>
      <NetflixDashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Interview Lab Admin</h1>
              <p className="text-muted-foreground">
                Manage interview questions and review student responses
              </p>
            </div>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Question
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Video className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Questions</p>
                  <p className="text-2xl font-bold">{questions.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Responses</p>
                  <p className="text-2xl font-bold">{responses.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold">
                    {responses.filter(r => !r.feedback).length}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Interview Questions</h2>

            {questions.length === 0 ? (
              <Card className="p-12 text-center">
                <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  No interview questions created yet.
                </p>
                <Button onClick={() => setShowCreateModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Question
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {questions.map((question) => {
                  const questionResponses = getResponsesForQuestion(question.id);
                  const isEditing = editingQuestionId === question.id;

                  return (
                    <Card key={question.id} className="p-6">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Question</label>
                            <input
                              type="text"
                              value={formData.question}
                              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                              placeholder="Enter interview question..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Description (optional)</label>
                            <textarea
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                              rows={3}
                              placeholder="Add additional context or tips..."
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`active-${question.id}`}
                              checked={formData.active}
                              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                              className="rounded"
                            />
                            <label htmlFor={`active-${question.id}`} className="text-sm">
                              Active (visible to students)
                            </label>
                          </div>

                          <div className="flex gap-2">
                            <Button onClick={() => handleUpdateQuestion(question.id)}>
                              Save Changes
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setEditingQuestionId(null);
                                setFormData({ question: '', description: '', active: true, order: 0 });
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2">
                                <Badge variant={question.active ? 'default' : 'secondary'}>
                                  {question.active ? 'Active' : 'Inactive'}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  Order: {question.order}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold text-foreground">
                                {question.question}
                              </h3>
                              {question.description && (
                                <p className="text-sm text-muted-foreground">
                                  {question.description}
                                </p>
                              )}
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => startEditingQuestion(question)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteQuestion(question.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Responses */}
                          {questionResponses.length > 0 && (
                            <div className="border-t pt-4 space-y-2">
                              <p className="text-sm font-medium text-foreground">
                                Responses ({questionResponses.length})
                              </p>
                              <div className="space-y-2">
                                {questionResponses.map((response) => (
                                  <div
                                    key={response.id}
                                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary/50 transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                        {response.studentName.charAt(0).toUpperCase()}
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-foreground">
                                          {response.studentName}
                                        </p>
                                        <div className="flex items-center gap-2">
                                          <Badge 
                                            variant={response.feedback ? 'default' : 'secondary'}
                                            className="text-xs"
                                          >
                                            {response.feedback ? (
                                              <><CheckCircle className="h-3 w-3 mr-1" /> Reviewed</>
                                            ) : (
                                              <><Clock className="h-3 w-3 mr-1" /> Pending</>
                                            )}
                                          </Badge>
                                          <span className="text-xs text-muted-foreground">
                                            {new Date(response.submittedAt.seconds * 1000).toLocaleDateString()}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setSelectedResponse(response);
                                        setFeedbackForm({
                                          strengths: response.feedback?.strengths || '',
                                          improvements: response.feedback?.improvements || '',
                                          rating: response.feedback?.rating || 0
                                        });
                                        setShowResponseModal(true);
                                      }}
                                    >
                                      <Eye className="h-4 w-4 mr-2" />
                                      View
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Create Question Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Create Interview Question</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowCreateModal(false);
                    setFormData({ question: '', description: '', active: true, order: 0 });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Question *</label>
                  <input
                    type="text"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    placeholder="Enter interview question..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description (optional)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    rows={3}
                    placeholder="Add additional context or tips for students..."
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="active-new"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="active-new" className="text-sm">
                    Active (visible to students immediately)
                  </label>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreateQuestion} className="flex-1">
                    Create Question
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowCreateModal(false);
                      setFormData({ question: '', description: '', active: true, order: 0 });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* View Response Modal */}
        {showResponseModal && selectedResponse && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <Card className="w-full max-w-4xl p-6 my-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Student Response</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedResponse.studentName} • {new Date(selectedResponse.submittedAt.seconds * 1000).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowResponseModal(false);
                    setSelectedResponse(null);
                    setFeedbackForm({ strengths: '', improvements: '', rating: 0 });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Question */}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Question:</p>
                  <p className="text-foreground">
                    {getQuestionById(selectedResponse.questionId)?.question}
                  </p>
                </div>

                {/* Video */}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Video Response:</p>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                      src={selectedResponse.videoUrl}
                      controls
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Feedback Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {selectedResponse.feedback ? 'Update Feedback' : 'Provide Feedback'}
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      What did they do well? *
                    </label>
                    <textarea
                      value={feedbackForm.strengths}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, strengths: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      rows={3}
                      placeholder="Highlight their strengths and what they did well..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      How can they improve? *
                    </label>
                    <textarea
                      value={feedbackForm.improvements}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, improvements: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      rows={3}
                      placeholder="Provide constructive feedback on areas for improvement..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Rating (optional)
                    </label>
                    <select
                      value={feedbackForm.rating}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, rating: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    >
                      <option value="0">No rating</option>
                      <option value="1">1 - Needs significant improvement</option>
                      <option value="2">2 - Below expectations</option>
                      <option value="3">3 - Meets expectations</option>
                      <option value="4">4 - Above expectations</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSubmitFeedback}
                    disabled={submittingFeedback || !feedbackForm.strengths.trim() || !feedbackForm.improvements.trim()}
                    className="flex-1"
                  >
                    {submittingFeedback ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...</>
                    ) : (
                      <><MessageSquare className="h-4 w-4 mr-2" /> Submit Feedback</>
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteResponse(selectedResponse.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Response
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </NetflixDashboardLayout>
    </ContentCreatorOnlyGuard>
  );
}

