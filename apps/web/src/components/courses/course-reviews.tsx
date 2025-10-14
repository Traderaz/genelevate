'use client';

import { useState, useEffect } from 'react';
import { Star, ThumbsUp, MessageSquare, Filter } from 'lucide-react';

interface CourseReviewsProps {
  courseSlug: string;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  review: string;
  createdAt: string;
  isVerified: boolean;
  helpfulCount: number;
  isHelpful?: boolean;
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export function CourseReviews({ courseSlug }: CourseReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // TODO: Fetch reviews from API
    setTimeout(() => {
      setStats({
        averageRating: 4.8,
        totalReviews: 234,
        ratingDistribution: {
          5: 180,
          4: 35,
          3: 12,
          2: 5,
          1: 2,
        },
      });

      setReviews([
        {
          id: '1',
          userId: '1',
          userName: 'Alex Thompson',
          userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
          rating: 5,
          review: 'Excellent course! Dr. Johnson explains complex concepts in a very clear and understandable way. The interactive examples and practice problems really helped me grasp the material. Highly recommended for anyone studying calculus.',
          createdAt: '2024-01-10',
          isVerified: true,
          helpfulCount: 24,
          isHelpful: false,
        },
        {
          id: '2',
          userId: '2',
          userName: 'Maria Garcia',
          userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
          rating: 5,
          review: 'This course saved my A-Level maths! The step-by-step approach and visual explanations made limits and derivatives so much easier to understand. The practice problems are perfectly aligned with exam requirements.',
          createdAt: '2024-01-08',
          isVerified: true,
          helpfulCount: 18,
          isHelpful: true,
        },
        {
          id: '3',
          userId: '3',
          userName: 'James Wilson',
          userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
          rating: 4,
          review: 'Great content and well-structured lessons. The only minor issue is that some videos could be a bit shorter, but overall very comprehensive and helpful.',
          createdAt: '2024-01-05',
          isVerified: false,
          helpfulCount: 12,
          isHelpful: false,
        },
        {
          id: '4',
          userId: '4',
          userName: 'Emma Davis',
          userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
          rating: 5,
          review: 'Outstanding instructor and course material. The real-world applications helped me understand why calculus is important. Perfect for university preparation.',
          createdAt: '2024-01-03',
          isVerified: true,
          helpfulCount: 15,
          isHelpful: false,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, [courseSlug]);

  const handleHelpful = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            isHelpful: !review.isHelpful,
            helpfulCount: review.isHelpful ? review.helpfulCount - 1 : review.helpfulCount + 1
          }
        : review
    ));
  };

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(filter));

  const displayedReviews = showAll ? filteredReviews : filteredReviews.slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border-b pb-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/6" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Student Reviews</h2>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="all">All Reviews</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Review Summary */}
      {stats && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{stats.averageRating}</div>
              <div className="flex items-center justify-center space-x-1 mb-1">
                {renderStars(Math.round(stats.averageRating))}
              </div>
              <div className="text-sm text-gray-600">{stats.totalReviews} reviews</div>
            </div>

            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2 mb-1">
                  <span className="text-sm w-6">{rating}</span>
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${(stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution] / stats.totalReviews) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b last:border-b-0 pb-6 last:pb-0">
            <div className="flex items-start space-x-4">
              <img
                src={review.userAvatar}
                alt={review.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-gray-900">{review.userName}</h4>
                  {review.isVerified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(review.createdAt)}
                  </span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-3">{review.review}</p>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleHelpful(review.id)}
                    className={`flex items-center space-x-1 text-sm transition-colors ${
                      review.isHelpful
                        ? 'text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${review.isHelpful ? 'fill-current' : ''}`} />
                    <span>Helpful ({review.helpfulCount})</span>
                  </button>

                  <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {filteredReviews.length > 3 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {showAll ? 'Show Less' : `Show All ${filteredReviews.length} Reviews`}
          </button>
        </div>
      )}

      {/* Write Review Button */}
      <div className="pt-4 border-t">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
          Write a Review
        </button>
      </div>
    </div>
  );
}
