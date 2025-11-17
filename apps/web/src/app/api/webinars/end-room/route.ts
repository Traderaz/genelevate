import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const { webinarId } = await request.json();

    if (!webinarId) {
      return NextResponse.json(
        { error: 'Webinar ID is required' },
        { status: 400 }
      );
    }

    // Get Daily.co API key from environment
    const apiKey = process.env.DAILY_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Daily.co API key not configured' },
        { status: 500 }
      );
    }

    // Get the webinar from Firestore to find the room name
    const webinarDoc = await getDoc(doc(db, 'webinars', webinarId));
    
    if (!webinarDoc.exists()) {
      return NextResponse.json(
        { error: 'Webinar not found' },
        { status: 404 }
      );
    }

    const webinarData = webinarDoc.data();
    const roomUrl = webinarData.dailyRoomUrl || webinarData.providerJoinUrl;

    if (!roomUrl) {
      return NextResponse.json(
        { error: 'No Daily.co room associated with this webinar' },
        { status: 400 }
      );
    }

    // Extract room name from Daily.co URL
    // Format: https://genelevate.daily.co/webinar-xxx
    const roomName = roomUrl.split('/').pop();

    if (!roomName) {
      return NextResponse.json(
        { error: 'Invalid Daily.co room URL' },
        { status: 400 }
      );
    }

    // Delete the Daily.co room via REST API
    // This will immediately eject all participants and close the room
    const response = await fetch(`https://api.daily.co/v1/rooms/${roomName}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Daily.co API error:', error);
      
      // If room doesn't exist (already deleted), that's okay
      if (response.status === 404) {
        return NextResponse.json({
          success: true,
          message: 'Room already closed',
        });
      }

      return NextResponse.json(
        { error: 'Failed to close Daily.co room', details: error },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Daily.co room closed successfully',
      roomName,
    });

  } catch (error) {
    console.error('Error ending Daily.co room:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

