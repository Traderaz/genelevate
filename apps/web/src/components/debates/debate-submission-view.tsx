'use client';

import { FileText, Video, Award, MessageSquare, Calendar, CheckCircle } from 'lucide-react';

interface DebateTopic {
  id: string;
  title: string;
  description: string;
  month: string;
  year: number;
  submissionDeadline: any;
  pointsReward: number;
}

interface DebateSubmission {
  id: string;
  debateId: string;
  userId: string;
  type: 'video' | 'text';
  content: string;
  videoUrl?: string;
  submittedAt: any;
  grade?: number;
  feedback?: string;
  gradedAt?: any;
  gradedBy?: string;
}

interface DebateSubmissionViewProps {
  submission: DebateSubmission;
  debate: DebateTopic;
  onUpdate: () => void;
}

export function DebateSubmissionView({ submission, debate, onUpdate }: DebateSubmissionViewProps) {
  const submittedDate = submission.submittedAt?.toDate ? submission.submittedAt.toDate() : new Date(submission.submittedAt);
  const gradedDate = submission.gradedAt?.toDate ? submission.gradedAt.toDate() : null;
  const isGraded = submission.grade !== null && submission.grade !== undefined;

  return (
    <div className="space-y-6">
      {/* Submission Status Card */}
      <div className="teal-card border-2 border-teal-gold/30 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-teal-card-text mb-1">
                Submission Received
              </h3>
              <div className="flex items-center gap-2 text-sm text-teal-card-text-muted">
                <Calendar className="w-4 h-4" />
                <span>
                  Submitted on {submittedDate.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
          
          {isGraded ? (
            <div className="text-right">
              <div className="text-3xl font-bold text-teal-gold mb-1">
                {submission.grade}/100
              </div>
              <div className="text-sm text-teal-card-text-muted">
                Grade Received
              </div>
            </div>
          ) : (
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-primary/10 rounded-lg border border-teal-primary/30">
                <div className="w-2 h-2 bg-teal-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-teal-primary">
                  Awaiting Review
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Your Submission */}
      <div className="teal-card border-2 border-white/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          {submission.type === 'video' ? (
            <Video className="w-5 h-5 text-teal-gold" />
          ) : (
            <FileText className="w-5 h-5 text-teal-gold" />
          )}
          <h3 className="text-xl font-bold text-teal-card-text">
            Your {submission.type === 'video' ? 'Video' : 'Text'} Submission
          </h3>
        </div>

        {submission.type === 'text' ? (
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <p className="text-teal-card-text whitespace-pre-wrap leading-relaxed">
              {submission.content}
            </p>
          </div>
        ) : submission.videoUrl ? (
          <video
            src={submission.videoUrl}
            controls
            className="w-full max-h-96 rounded-lg bg-black"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="bg-white/5 rounded-lg p-6 border border-white/10 text-center text-teal-card-text-muted">
            Video processing...
          </div>
        )}
      </div>

      {/* Grade & Feedback */}
      {isGraded && (
        <div className="teal-card border-2 border-teal-gold/30 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-gold/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-teal-gold" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-teal-card-text">
                Assessment Results
              </h3>
              {gradedDate && (
                <p className="text-sm text-teal-card-text-muted">
                  Graded on {gradedDate.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-sm text-teal-card-text-muted mb-1">Your Grade</div>
              <div className="text-3xl font-bold text-teal-gold">{submission.grade}</div>
              <div className="text-xs text-teal-card-text-muted mt-1">out of 100</div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-sm text-teal-card-text-muted mb-1">Points Earned</div>
              <div className="text-3xl font-bold text-teal-primary">
                {Math.round((submission.grade / 100) * debate.pointsReward)}
              </div>
              <div className="text-xs text-teal-card-text-muted mt-1">
                of {debate.pointsReward} possible
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-sm text-teal-card-text-muted mb-1">Performance</div>
              <div className={`text-2xl font-bold ${
                submission.grade >= 80 ? 'text-green-400' :
                submission.grade >= 60 ? 'text-teal-gold' :
                'text-orange-400'
              }`}>
                {submission.grade >= 80 ? 'Excellent' :
                 submission.grade >= 60 ? 'Good' :
                 'Needs Work'}
              </div>
            </div>
          </div>

          {submission.feedback && (
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-5 h-5 text-teal-gold" />
                <h4 className="font-bold text-teal-card-text">Feedback from Admin</h4>
              </div>
              <p className="text-teal-card-text leading-relaxed whitespace-pre-wrap">
                {submission.feedback}
              </p>
            </div>
          )}

          {submission.grade >= 80 && (
            <div className="bg-gradient-to-r from-teal-primary/10 to-teal-gold/10 rounded-lg p-4 border border-teal-gold/30">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-teal-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-teal-gold mb-1">
                    Outstanding Performance! 🎉
                  </p>
                  <p className="text-sm text-teal-card-text">
                    You may be invited to participate in this month's virtual team debate. 
                    Keep an eye on your notifications!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Awaiting Review */}
      {!isGraded && (
        <div className="teal-card border border-white/20 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-teal-gold flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-teal-card-text mb-2">What happens next?</h4>
              <ul className="space-y-2 text-sm text-teal-card-text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-teal-gold">•</span>
                  <span>An admin will review your submission and provide a grade</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-gold">•</span>
                  <span>You'll receive detailed feedback on your argument structure and delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-gold">•</span>
                  <span>Points will be awarded based on your grade</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-gold">•</span>
                  <span>Top performers may be invited to virtual team debates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

