import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { debateTitle, durationMinutes } = await request.json();

    // Get Daily.co API key from environment
    const apiKey = process.env.DAILY_API_KEY;
    const domain = process.env.NEXT_PUBLIC_DAILY_DOMAIN || 'genelevate.daily.co';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Daily.co API key not configured' },
        { status: 500 }
      );
    }

    // Generate a unique room name
    const roomName = `debate-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Create room via Daily.co REST API with enhanced debate features
    const response = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        name: roomName,
        privacy: 'public', // Anyone with the URL can join (access controlled by Firestore)
        properties: {
          // Capacity & Access
          max_participants: 100,
          enable_knocking: false,
          enable_prejoin_ui: true,
          
          // Video & Audio Features
          start_video_off: false,
          start_audio_off: false,
          enable_screenshare: true,
          enable_chat: true,
          
          // Recording (for judging/review)
          enable_recording: 'cloud',
          
          // Session Management
          exp: Math.floor(Date.now() / 1000) + (durationMinutes * 60) + 3600,
          eject_at_room_exp: true,
          eject_after_elapsed: (durationMinutes + 60) * 60,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let error;
      try {
        error = JSON.parse(errorText);
      } catch {
        error = errorText;
      }
      console.error('Daily.co API error:', error);
      console.error('Response status:', response.status);
      console.error('Request details:', {
        apiKeyPresent: !!apiKey,
        roomName,
        durationMinutes
      });
      return NextResponse.json(
        { error: 'Failed to create room', details: error },
        { status: response.status }
      );
    }

    const room = await response.json();

    return NextResponse.json({
      success: true,
      roomUrl: room.url,
      roomName: room.name,
    });

  } catch (error) {
    console.error('Error creating Daily.co room:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

