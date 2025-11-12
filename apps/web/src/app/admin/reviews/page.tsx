'use client';

import { useState, useEffect } from 'react';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { useAuth } from '@/contexts/auth-context';
import { StudentReview } from '@/types/review';
import { Star, Check, X, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminReviewsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<StudentReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [filter]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const queryParam = filter !== 'all' ? `?status=${filter}` : '';
      const response = await fetch(`/api/reviews${queryParam}`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (reviewId: string) => {
    if (!user) return;

    setProcessingId(reviewId);
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve', adminId: user.uid }),
      });

      if (response.ok) {
        toast.success('Review approved');
        fetchReviews();
      } else {
        toast.error('Failed to approve review');
      }
    } catch (error) {
      console.error('Error approving review:', error);
      toast.error('Failed to approve review');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (reviewId: string) => {
    if (!user) return;

    setProcessingId(reviewId);
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject', adminId: user.uid }),
      });

      if (response.ok) {
        toast.success('Review rejected');
        fetchReviews();
      } else {
        toast.error('Failed to reject review');
      }
    } catch (error) {
      console.error('Error rejecting review:', error);
      toast.error('Failed to reject review');
    } finally {
      setProcessingId(null);
    }
  };

  const handleFeature = async (reviewId: string, featured: boolean) => {
    setProcessingId(reviewId);
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'feature', featured }),
      });

      if (response.ok) {
        toast.success(featured ? 'Review featured on homepage' : 'Review removed from homepage');
        fetchReviews();
      } else {
        toast.error('Failed to update review');
      }
    } catch (error) {
      console.error('Error featuring review:', error);
      toast.error('Failed to update review');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      return;
    }

    setProcessingId(reviewId);
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Review deleted');
        fetchReviews();
      } else {
        toast.error('Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    } finally {
      setProcessingId(null);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      approved: 'bg-green-500/10 text-green-500 border-green-500/20',
      rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <NetflixDashboardLayout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Review Management
          </h1>
          <p className="text-muted-foreground">
            Manage student reviews and choose which ones to feature on the homepage
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === f
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground hover:bg-muted'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Reviews List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <p className="text-muted-foreground">No reviews found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{review.studentName}</h3>
                      {getStatusBadge(review.status)}
                      {review.featured && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium border bg-blue-500/10 text-blue-500 border-blue-500/20">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{review.yearGroup}</span>
                      {review.subject && (
                        <>
                          <span>•</span>
                          <span>{review.subject}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-foreground">{review.reviewText}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  {review.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(review.id)}
                        disabled={processingId === review.id}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                      >
                        {processingId === review.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(review.id)}
                        disabled={processingId === review.id}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </>
                  )}

                  {review.status === 'approved' && (
                    <button
                      onClick={() => handleFeature(review.id, !review.featured)}
                      disabled={processingId === review.id}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                        review.featured
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : 'bg-muted hover:bg-muted/80 text-foreground border border-border'
                      }`}
                    >
                      {review.featured ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          Remove from Homepage
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          Feature on Homepage
                        </>
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(review.id)}
                    disabled={processingId === review.id}
                    className="ml-auto flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </NetflixDashboardLayout>
  );
}

