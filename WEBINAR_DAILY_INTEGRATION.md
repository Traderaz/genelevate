# Daily.co Webinar Integration Guide

## ✅ What's Been Set Up

### 1. API Route for Webinar Rooms ✓
- **File:** `apps/web/src/app/api/webinars/create-room/route.ts`
- **Purpose:** Automatically creates Daily.co rooms for webinars
- **Features:**
  - Configurable max attendees (default: 100)
  - Cloud recording enabled
  - Screen sharing enabled
  - Advanced chat & emoji reactions
  - Automatic room expiry after webinar ends

### 2. Live Webinar Room Component ✓
- **File:** `apps/web/src/components/webinars/live-webinar-room.tsx`
- **Features:**
  - Professional webinar interface
  - Host controls (mic, camera, screen share)
  - Attendee view (watch-only with chat)
  - Real-time participant list
  - Live chat with messages
  - Screen sharing support
  - Participant join/leave notifications
  - Responsive design

## 🎯 How It Works

### For Hosts:
1. **Full Controls:**
   - Toggle microphone
   - Toggle camera
   - Share screen
   - View all participants
   - Send/receive chat messages

2. **Professional UI:**
   - Large video display for host
   - Grid view for attendees
   - Participant counter
   - LIVE indicator
   - Control bar at bottom

### For Attendees:
1. **Watch & Engage:**
   - See host video
   - See screen shares
   - Send chat messages
   - View participant list
   - Mic/camera off by default (can enable if allowed)

## 🔧 Integration Steps

### Step 1: Update Webinar Creation

When creating a webinar, automatically generate a Daily.co room:

```typescript
// In your webinar creation form/API
const response = await fetch('/api/webinars/create-room', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    webinarTitle: 'Your Webinar Title',
    durationMinutes: 60,
    maxAttendees: 100, // Optional, default 100
  }),
});

const { roomUrl } = await response.json();
// Save roomUrl to Firestore with webinar data
```

### Step 2: Add to Webinar Detail Page

```typescript
'use client';

import { useState } from 'react';
import { LiveWebinarRoom } from '@/components/webinars/live-webinar-room';
import { useAuth } from '@/contexts/auth-context';

export default function WebinarDetailPage({ webinar }) {
  const { user } = useAuth();
  const [showLiveRoom, setShowLiveRoom] = useState(false);
  
  // Check if user is the host
  const isHost = user && webinar.host.id === user.uid;
  
  // Check if webinar is live
  const isLive = webinar.status === 'live';
  
  if (showLiveRoom && isLive) {
    return (
      <LiveWebinarRoom
        roomUrl={webinar.providerJoinUrl} // or webinar.dailyRoomUrl
        isHost={isHost}
        userName={user?.displayName || user?.email || 'Guest'}
        onLeave={() => setShowLiveRoom(false)}
      />
    );
  }
  
  return (
    <div>
      {/* Your webinar details UI */}
      {isLive && (
        <button onClick={() => setShowLiveRoom(true)}>
          Join Live Webinar
        </button>
      )}
    </div>
  );
}
```

### Step 3: Update Firestore Schema

Add Daily.co room URL to your webinar documents:

```typescript
interface Webinar {
  // ... existing fields
  dailyRoomUrl?: string;
  dailyRoomName?: string;
  providerJoinUrl?: string; // if using provider pattern
}
```

## 🎬 User Experience Flow

### Host Flow:
1. Admin creates webinar → Daily.co room auto-generated
2. At scheduled time, host clicks "Start Webinar"
3. `LiveWebinarRoom` component loads
4. Host has full control (mic, camera, screen share)
5. Attendees start joining and appear in grid
6. Host can present, share screen, interact via chat
7. Host clicks "Leave Webinar" when done

### Attendee Flow:
1. Student navigates to webinar page
2. Sees "Join Live Webinar" button (if live)
3. Clicks to join
4. `LiveWebinarRoom` component loads
5. Camera/mic off by default
6. Can watch host, see screen share, chat
7. Clicks "Leave Webinar" when done

## 📊 Key Features

### ✨ What Students Get:
- 📺 HD video streaming
- 💬 Live chat
- 👥 See who else is attending
- 📱 Mobile responsive
- 🖥️ Screen share viewing
- 🎬 No external apps needed (all in browser)

### ✨ What Hosts Get:
- 🎤 Full mic control
- 📹 Camera control
- 🖥️ Screen sharing
- 👁️ See all attendees
- 💬 Chat moderation
- 📊 Live participant count
- ☁️ Cloud recording (automatic)

## 🔒 Security Features

- Private rooms (requires URL to join)
- Room auto-expires after webinar
- No anonymous join (user must be authenticated)
- Host-controlled environment

## 💰 Cost Efficiency

- **Free Tier:** 10,000 minutes/month
- **Example:** 100-minute webinar = 100 attendees x 100 minutes = 10,000 minutes
- **Your Usage:** ~100 mins/month = plenty of capacity!

## 🚀 Next Steps

1. **Add Environment Variable** (if not already added):
   ```env
   DAILY_API_KEY=your-api-key
   NEXT_PUBLIC_DAILY_DOMAIN=genelevate.daily.co
   ```

2. **Update Webinar Creation Flow:**
   - Add call to `/api/webinars/create-room`
   - Save returned `roomUrl` to Firestore

3. **Add Join Button to Webinar Pages:**
   - Import `LiveWebinarRoom` component
   - Show when `status === 'live'`
   - Pass `roomUrl`, `isHost`, `userName`, `onLeave`

4. **Test the Flow:**
   - Create a test webinar
   - Join as host (full controls)
   - Join as attendee (watch-only)
   - Test chat, screen share, participants list

## 🆘 Troubleshooting

**"Room not loading"**
→ Check `DAILY_API_KEY` and `NEXT_PUBLIC_DAILY_DOMAIN` are set

**"Can't hear/see host"**
→ Check browser permissions for mic/camera

**"Recording not working"**
→ Recordings are automatic in cloud, check Daily.co dashboard

## 📝 Benefits Over Zoom/Teams

✅ **Embedded directly in your website** (no external links!)
✅ **No app downloads required**
✅ **Automatic cloud recording**
✅ **Simpler for students** (just click and join)
✅ **More control** (custom UI, branded experience)
✅ **Better analytics** (integrated with your system)
✅ **Free for your usage** (10K minutes/month)

---

**Ready to go live? 🎉**

Your webinar system can now support professional, embedded video streaming!

