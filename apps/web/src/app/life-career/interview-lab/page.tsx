'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video,
  Upload,
  Play,
  Pause,
  RefreshCw,
  Check,
  MessageSquare,
  Star,
  Clock,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

interface InterviewQuestion {
  id: string;
  question: string;
  description?: string;
  order: number;
}

interface InterviewResponse {
  id: string;
  questionId: string;
  videoUrl: string;
  submittedAt: any;
  feedback?: {
    strengths: string;
    improvements: string;
    rating?: number;
    providedAt: any;
  };
}

export default function InterviewLabPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [responses, setResponses] = useState<InterviewResponse[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [recording, setRecording] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (!user) return;
    
    try {
      setLoading(true);
      
      const [questionsRes, responsesRes] = await Promise.all([
        fetch('/api/interview-lab/questions?activeOnly=true'),
        fetch(`/api/interview-lab/student-responses?studentId=${user.uid}`),
      ]);

      console.log('Questions response status:', questionsRes.status);
      if (questionsRes.ok) {
        const data = await questionsRes.json();
        console.log('Questions data:', data);
        setQuestions(data);
      } else {
        const errorData = await questionsRes.json();
        console.error('Questions error:', errorData);
      }

      console.log('Responses response status:', responsesRes.status);
      if (responsesRes.ok) {
        const data = await responsesRes.json();
        console.log('Responses data:', data);
        setResponses(data);
      } else {
        const errorData = await responsesRes.json();
        console.error('Responses error:', errorData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type - be more lenient for iOS
    const validTypes = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-m4v', 'video/'];
    const isValidType = validTypes.some(type => file.type.startsWith(type));
    
    if (!isValidType && file.type && !file.type.startsWith('video/')) {
      toast.error('Please select a video file');
      return;
    }

    // Validate file size (max 500MB)
    if (file.size > 500 * 1024 * 1024) {
      toast.error('Video file must be less than 500MB');
      return;
    }

    setVideoFile(file);
    
    // Create preview URL - handle iOS quirks
    try {
      const previewUrl = URL.createObjectURL(file);
      setVideoPreviewUrl(previewUrl);
    } catch (error) {
      console.error('Error creating preview:', error);
      // Still set the file even if preview fails
      toast.success(`Video selected: ${file.name}`);
    }
  };

  const handleUpload = async () => {
    if (!videoFile || !selectedQuestion || !user) return;

    try {
      setUploading(true);
      setUploadProgress(0);

      // Upload to Firebase Storage
      const fileName = `${user.uid}_${selectedQuestion.id}_${Date.now()}.${videoFile.name.split('.').pop()}`;
      const storageRef = ref(storage, `interview-responses/${user.uid}/${fileName}`);
      
      const uploadTask = uploadBytesResumable(storageRef, videoFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (error) => {
          console.error('Upload error:', error);
          toast.error('Failed to upload video');
          setUploading(false);
        },
        async () => {
          // Upload complete
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Save response metadata to Firestore
          const response = await fetch('/api/interview-lab/responses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              questionId: selectedQuestion.id,
              studentId: user.uid,
              studentName: user.displayName || 'Student',
              studentEmail: user.email || '',
              videoUrl: downloadURL,
              videoPath: `interview-responses/${user.uid}/${fileName}`,
            }),
          });

          if (response.ok) {
            toast.success('Response submitted successfully!');
            setVideoFile(null);
            setVideoPreviewUrl(null);
            setSelectedQuestion(null);
            fetchData(); // Refresh data
          } else {
            throw new Error('Failed to save response');
          }
          
          setUploading(false);
        }
      );
    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error('Failed to submit response');
      setUploading(false);
    }
  };

  const getResponseForQuestion = (questionId: string) => {
    return responses.find((r) => r.questionId === questionId);
  };

  const hasResponse = (questionId: string) => {
    return responses.some((r) => r.questionId === questionId);
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
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Interview Lab</h1>
          <p className="text-gray-400 text-lg">
            Practice your interview skills with video responses. Get personalized feedback from our team.
          </p>
        </div>

        {/* Info Banner */}
        <Card className="teal-card p-6 border-2 border-teal-gold/30">
          <div className="flex items-start gap-4">
            <div className="bg-teal-gold/20 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-teal-gold" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-teal-card-text mb-2">How It Works</h3>
              <ul className="text-teal-card-text space-y-1 text-sm">
                <li>• Select a question and record or upload your video response</li>
                <li>• Videos are automatically deleted after 60 days</li>
                <li>• Our team will review your response and provide personalized feedback</li>
                <li>• Check back regularly for new questions and your feedback</li>
              </ul>
            </div>
          </div>
        </Card>

        {questions.length === 0 ? (
          <Card className="bg-gray-800/50 border-gray-700 p-12 text-center">
            <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">No interview questions available yet</p>
            <p className="text-gray-500">Check back soon for new questions</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {questions.map((question) => {
              const response = getResponseForQuestion(question.id);
              const hasFeedback = response?.feedback;
              const submitted = !!response;

              return (
                <Card key={question.id} className="bg-gray-800/50 border-gray-700 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{question.question}</h3>
                          {submitted && (
                            <Badge variant="default" className="bg-green-500/10 text-green-500">
                              <Check className="w-3 h-3 mr-1" />
                              Submitted
                            </Badge>
                          )}
                          {hasFeedback && (
                            <Badge variant="default" className="bg-purple-500/10 text-purple-500">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              Feedback Available
                            </Badge>
                          )}
                        </div>
                        {question.description && (
                          <p className="text-gray-400 text-sm mb-3">{question.description}</p>
                        )}
                      </div>
                    </div>

                    {/* Feedback Section */}
                    {hasFeedback && response.feedback && (
                      <div className="bg-gray-900/50 rounded-lg p-6 mb-4 border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-purple-500" />
                            <h4 className="text-lg font-semibold text-white">Your Feedback</h4>
                          </div>
                          {response.feedback.rating && (
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < response.feedback!.rating!
                                      ? 'fill-yellow-500 text-yellow-500'
                                      : 'text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h5 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                              <Check className="w-4 h-4" />
                              What you did well
                            </h5>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {response.feedback.strengths}
                            </p>
                          </div>

                          <div>
                            <h5 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
                              <RefreshCw className="w-4 h-4" />
                              Areas for improvement
                            </h5>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {response.feedback.improvements}
                            </p>
                          </div>

                          <p className="text-gray-500 text-xs pt-2 border-t border-gray-700">
                            Feedback provided on{' '}
                            {new Date(response.feedback.providedAt.seconds * 1000).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Upload Section */}
                    {selectedQuestion?.id === question.id ? (
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                          {videoPreviewUrl ? (
                            <div className="space-y-4">
                              <video
                                src={videoPreviewUrl}
                                controls
                                className="max-w-md mx-auto rounded-lg"
                              >
                                Your browser does not support the video tag.
                              </video>
                              <div className="flex gap-3 justify-center">
                                <Button
                                  onClick={() => {
                                    setVideoFile(null);
                                    setVideoPreviewUrl(null);
                                  }}
                                  variant="ghost"
                                  className="text-gray-400"
                                >
                                  Choose Different Video
                                </Button>
                                <Button
                                  onClick={handleUpload}
                                  disabled={uploading}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  {uploading ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                      Uploading... {uploadProgress}%
                                    </>
                                  ) : (
                                    <>
                                      <Upload className="w-4 h-4 mr-2" />
                                      Submit Response
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                              <p className="text-white mb-2">Upload your video response</p>
                              <p className="text-gray-400 text-sm mb-4">
                                MP4, MOV, or WebM (max 500MB)
                              </p>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="video/*,video/mp4,video/quicktime,video/webm"
                                onChange={handleFileSelect}
                                className="hidden"
                                id="video-upload-input"
                              />
                              <label 
                                htmlFor="video-upload-input"
                                className="inline-flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg cursor-pointer transition-colors"
                              >
                                <Video className="w-4 h-4 mr-2" />
                                Choose Video
                              </label>
                            </>
                          )}
                        </div>

                        {!submitted && (
                          <Button
                            onClick={() => {
                              setSelectedQuestion(null);
                              setVideoFile(null);
                              setVideoPreviewUrl(null);
                            }}
                            variant="ghost"
                            className="w-full text-gray-400"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        {!submitted && (
                          <Button
                            onClick={() => setSelectedQuestion(question)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <Video className="w-4 h-4 mr-2" />
                            Record Response
                          </Button>
                        )}
                        {submitted && !hasFeedback && (
                          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
                            <Clock className="w-3 h-3 mr-1" />
                            Awaiting Feedback
                          </Badge>
                        )}
                      </div>
                    )}
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
