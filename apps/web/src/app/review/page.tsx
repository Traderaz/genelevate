'use client';

import { useState } from 'react';
import { Star, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { SimpleHomeHeader } from '@/components/layout/simple-home-header';

export default function PublicReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [studentName, setStudentName] = useState('');
  const [yearGroup, setYearGroup] = useState('');
  const [subject, setSubject] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!studentName.trim()) {
      toast.error('Please enter your name');
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

    try {
      await addDoc(collection(db, 'studentReviews'), {
        studentId: 'external-review',
        studentName: studentName.trim(),
        yearGroup: yearGroup,
        subject: subject.trim() || null,
        rating: rating,
        reviewText: reviewText.trim(),
        submittedAt: serverTimestamp(),
        status: 'pending',
        featured: false,
        source: 'external-link' // Track that this came from the public link
      });

      setSubmitted(true);
      toast.success('Thank you for your review!');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black">
        <SimpleHomeHeader />
        
        <div className="flex items-center justify-center p-4 pt-24">
          <div className="max-w-2xl w-full">
            {/* Logo */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-3">
                <img 
                  src="/Genelevate logo.png" 
                  alt="Gen Elevate Logo" 
                  className="h-16 w-auto"
                />
              </Link>
            </div>

          <div className="cinematic-card rounded-2xl p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Review Submitted Successfully!
            </h2>
            <p className="text-gray-400 mb-6">
              Thank you for taking the time to share your experience. Your review will be reviewed by our team
              and may be featured on our website.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 premium-button text-white rounded-lg font-semibold transition-colors"
            >
              Visit Our Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <SimpleHomeHeader />
      
      <div className="flex items-center justify-center p-4 pt-24">
        <div className="max-w-2xl w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <img 
                src="/Genelevate logo.png" 
                alt="Gen Elevate Logo" 
                className="h-16 w-auto"
              />
            </Link>
          </div>

          <div className="cinematic-card rounded-2xl p-6 sm:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Share Your Experience
            </h1>
            <p className="text-gray-400">
              We'd love to hear about your experience with Gen Elevate
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Your Name */}
            <div>
              <label htmlFor="studentName" className="block text-sm font-medium text-white mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="studentName"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g., Sarah J."
                className="w-full px-4 py-3 border border-white/10 bg-black/40 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll use your first name and last initial (e.g., Sarah J.) for privacy
              </p>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
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
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Year Group */}
            <div>
              <label htmlFor="yearGroup" className="block text-sm font-medium text-white mb-2">
                Year Group *
              </label>
              <select
                id="yearGroup"
                value={yearGroup}
                onChange={(e) => setYearGroup(e.target.value)}
                className="w-full px-4 py-3 border border-white/10 bg-black/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
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
              <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                Subject Focus (Optional)
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Mathematics & Physics"
                className="w-full px-4 py-3 border border-white/10 bg-black/40 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Review Text */}
            <div>
              <label htmlFor="reviewText" className="block text-sm font-medium text-white mb-2">
                Your Review *
              </label>
              <textarea
                id="reviewText"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with Gen Elevate..."
                rows={6}
                className="w-full px-4 py-3 border border-white/10 bg-black/40 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                required
                minLength={20}
                maxLength={500}
              />
              <p className="text-sm text-gray-500 mt-2">
                {reviewText.length}/500 characters (minimum 20)
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-6 py-4 premium-button text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
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

          <p className="text-xs text-gray-500 text-center mt-6">
            Your review will be reviewed before being published on our website
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}

