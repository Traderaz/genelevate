import { NextRequest, NextResponse } from 'next/server';
import { 
  approveReview, 
  rejectReview, 
  featureReview, 
  deleteReview 
} from '@/lib/services/reviews-admin';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { action, adminId, featured } = body;
    const reviewId = params.id;

    let result;

    switch (action) {
      case 'approve':
        result = await approveReview(reviewId, adminId);
        break;
      case 'reject':
        result = await rejectReview(reviewId, adminId);
        break;
      case 'feature':
        result = await featureReview(reviewId, featured);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in PATCH /api/reviews/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reviewId = params.id;
    const result = await deleteReview(reviewId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/reviews/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}

