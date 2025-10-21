import { NextRequest, NextResponse } from 'next/server';
import { SubmitDebateRequest, DebateSubmissionResponse, TEXT_CONSTRAINTS } from '@/types/debates';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    
    const debateId = formData.get('debateId') as string;
    const type = formData.get('type') as 'video' | 'audio' | 'text';
    const position = formData.get('position') as 'for' | 'against' | 'neutral';
    const content = formData.get('content') as string;
    const isPublic = formData.get('isPublic') === 'true';
    const mediaFile = formData.get('mediaFile') as File | null;

    // Validate required fields
    if (!debateId || !type || !position || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate content length for text submissions
    if (type === 'text') {
      const wordCount = content.split(/\s+/).length;
      if (wordCount < TEXT_CONSTRAINTS.minWords) {
        return NextResponse.json(
          { error: `Text submission must be at least ${TEXT_CONSTRAINTS.minWords} words` },
          { status: 400 }
        );
      }
      if (wordCount > TEXT_CONSTRAINTS.maxWords) {
        return NextResponse.json(
          { error: `Text submission must be at most ${TEXT_CONSTRAINTS.maxWords} words` },
          { status: 400 }
        );
      }
    }

    // Validate media file for video/audio submissions
    if ((type === 'video' || type === 'audio') && !mediaFile) {
      return NextResponse.json(
        { error: `${type} submission requires a media file` },
        { status: 400 }
      );
    }

    // Generate submission ID
    const submissionId = `${userId}_${debateId}_${Date.now()}`;

    console.log(`📝 Debate submission received: ${submissionId}`);
    console.log(`   User: ${userId}, Type: ${type}, Position: ${position}`);

    // For this implementation, we'll return immediately and process scoring async
    // In production, you would:
    // 1. Upload media file to Firebase Storage (if applicable)
    // 2. Create submission document in Firestore
    // 3. Trigger background function to score submission
    // 4. Optionally transcribe video/audio

    const response: DebateSubmissionResponse = {
      submissionId,
      status: 'processing',
      estimatedScoringTime: type === 'text' ? 30 : 60, // seconds
      message: `Your ${type} submission has been received and is being processed. You'll receive your score and feedback shortly.`,
    };

    console.log(`✅ Submission accepted for processing: ${submissionId}`);

    // Note: In production, trigger a background Cloud Function here to:
    // 1. Save to Firestore
    // 2. Upload media to Storage
    // 3. Call scoring API
    // 4. Update submission with scores
    // 5. Update leaderboards
    // 6. Award points and badges

    return NextResponse.json(response);

  } catch (error: any) {
    console.error('❌ Error processing debate submission:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to process submission' },
      { status: 500 }
    );
  }
}

// Helper endpoint to get submission status
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const submissionId = searchParams.get('submissionId');

    if (!submissionId) {
      return NextResponse.json(
        { error: 'Missing submissionId parameter' },
        { status: 400 }
      );
    }

    // In production, query Firestore for submission status
    // For now, return a mock response
    return NextResponse.json({
      submissionId,
      status: 'scored',
      message: 'Submission has been scored',
    });

  } catch (error: any) {
    console.error('❌ Error getting submission status:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to get submission status' },
      { status: 500 }
    );
  }
}

