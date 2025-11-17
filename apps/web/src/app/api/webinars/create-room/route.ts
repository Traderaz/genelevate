import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { webinarTitle, durationMinutes, maxAttendees = 100 } = await request.json();

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
    const roomName = `webinar-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Create room via Daily.co REST API
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
          max_participants: maxAttendees,
          enable_screenshare: true,
          enable_chat: true,
          enable_knocking: false,
          enable_prejoin_ui: true,
          enable_recording: 'cloud', // Enable cloud recording
          exp: Math.floor(Date.now() / 1000) + (durationMinutes * 60) + 3600, // Room expires 1 hour after webinar ends
          eject_at_room_exp: true,
          start_video_off: false,
          start_audio_off: false,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Daily.co API error:', error);
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
      config: room.config,
    });

  } catch (error) {
    console.error('Error creating Daily.co webinar room:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

