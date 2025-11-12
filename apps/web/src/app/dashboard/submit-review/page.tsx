'use client';

import { useState, useEffect } from 'react';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { useAuth } from '@/contexts/auth-context';
import { submitReview, hasUserSubmittedReview } from '@/lib/services/reviews';
import { Star, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function SubmitReviewPage() {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [subject, setSubject] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [yearGroup, setYearGroup] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkExistingReview() {
      if (!user) return;
      
      const alreadySubmitted = await hasUserSubmittedReview(user.uid);
      setHasSubmitted(alreadySubmitted);
      setLoading(false);
    }

    checkExistingReview();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in to submit a review');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!yearGroup) {
      toast.error('Please select your year group');
      return;
    }

    if (reviewText.length < 20) {
      toast.error('Please write at least 20 characters');
      return;
    }

    setSubmitting(true);

    const result = await submitReview(
      user.uid,
      user.displayName || 'Anonymous Student',
      yearGroup,
      {
        rating,
        subject: subject || undefined,
        reviewText,
      }
    );

    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      toast.success('Thank you for your review! It will be reviewed by our team.');
    } else {
      toast.error(result.error || 'Failed to submit review');
    }
  };

  if (loading) {
    return (
      <NetflixDashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </NetflixDashboardLayout>
    );
  }

  if (hasSubmitted && !submitted) {
    return (
      <NetflixDashboardLayout>
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Review Already Submitted
            </h2>
            <p className="text-muted-foreground">
              You've already submitted a review. Thank you for your feedback!
            </p>
          </div>
        </div>
      </NetflixDashboardLayout>
    );
  }

  if (submitted) {
    return (
      <NetflixDashboardLayout>
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Review Submitted Successfully!
            </h2>
            <p className="text-muted-foreground mb-6">
              Thank you for taking the time to share your experience. Your review will be reviewed by our team
              and may be featured on our homepage.
            </p>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </NetflixDashboardLayout>
    );
  }

  return (
    <NetflixDashboardLayout>
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Share Your Experience
          </h1>
          <p className="text-muted-foreground">
            Help other students by sharing your experience with Gen Elevate
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Overall Rating *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Year Group */}
          <div>
            <label htmlFor="yearGroup" className="block text-sm font-medium text-foreground mb-2">
              Year Group *
            </label>
            <select
              id="yearGroup"
              value={yearGroup}
              onChange={(e) => setYearGroup(e.target.value)}
              className="w-full px-4 py-3 border border-border bg-background rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select your year</option>
              <option value="Year 6">Year 6</option>
              <option value="Year 7">Year 7</option>
              <option value="Year 8">Year 8</option>
              <option value="Year 9">Year 9</option>
              <option value="Year 10">Year 10</option>
              <option value="Year 11">Year 11</option>
              <option value="Year 12">Year 12</option>
              <option value="Year 13">Year 13</option>
            </select>
          </div>

          {/* Subject (Optional) */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
              Subject Focus (Optional)
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Mathematics & Physics"
              className="w-full px-4 py-3 border border-border bg-background rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Review Text */}
          <div>
            <label htmlFor="reviewText" className="block text-sm font-medium text-foreground mb-2">
              Your Review *
            </label>
            <textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with Gen Elevate..."
              rows={6}
              className="w-full px-4 py-3 border border-border bg-background rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              required
              minLength={20}
            />
            <p className="text-sm text-muted-foreground mt-2">
              {reviewText.length}/500 characters (minimum 20)
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full px-6 py-4 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Review
              </>
            )}
          </button>
        </form>
      </div>
    </NetflixDashboardLayout>
  );
}

