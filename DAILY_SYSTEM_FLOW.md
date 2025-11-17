# Daily.co System Flow Diagram

## 🎯 Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Gen Elevate Platform                      │
│                     (Your Next.js Web App)                       │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
           ┌────────▼────────┐      ┌────────▼────────┐
           │  Virtual Debates │      │    Webinars     │
           └─────────────────┘      └─────────────────┘
                    │                         │
        ┌───────────┴───────────┐  ┌─────────┴─────────┐
        │                       │  │                     │
    ┌───▼───┐            ┌──────▼──▼───┐       ┌────────▼────────┐
    │ Admin │            │   Student    │       │  Daily.co API   │
    │ Panel │            │   Frontend   │       │  (Cloud Video)  │
    └───┬───┘            └──────┬───────┘       └────────▲────────┘
        │                       │                         │
        │                       │                         │
        └───────────┬───────────┴─────────────────────────┘
                    │
            ┌───────▼────────┐
            │   Firestore    │
            │   (Database)   │
            └────────────────┘
```

---

## 📝 Webinar Creation Flow

```
Admin Workflow:
═══════════════

1. Admin navigates to /admin/webinars
        │
        ├─> Sees webinar dashboard
        │   ├─> Total webinars count
        │   ├─> Scheduled webinars
        │   ├─> Live webinars count
        │   └─> Total attendees
        │
2. Clicks "Create Webinar"
        │
        └─> Modal opens (CreateWebinarModal)
            │
            ├─> Fills in form:
            │   ├─> Title
            │   ├─> Description
            │   ├─> Date & Time
            │   ├─> Duration (minutes)
            │   ├─> Max Attendees
            │   ├─> Subject (optional)
            │   ├─> Tags (optional)
            │   └─> Room URL (leave empty!)
            │
3. Clicks "Create Webinar"
        │
        ├─> Client validates form
        │
        ├─> Client calls /api/webinars/create-room
        │        │
        │        ├─> API receives request
        │        │
        │        ├─> API calls Daily.co REST API
        │        │        POST https://api.daily.co/v1/rooms
        │        │        Authorization: Bearer {DAILY_API_KEY}
        │        │        Body: {
        │        │          name: "webinar-timestamp-random",
        │        │          privacy: "private",
        │        │          properties: {
        │        │            max_participants: 100,
        │        │            enable_screenshare: true,
        │        │            enable_chat: true,
        │        │            enable_recording: "cloud",
        │        │            enable_emoji_reactions: true
        │        │          }
        │        │        }
        │        │
        │        └─> Returns: {
        │                 roomUrl: "https://genelevate.daily.co/webinar-xxx",
        │                 roomName: "webinar-xxx"
        │              }
        │
        ├─> Client receives room URL
        │
        ├─> Client saves to Firestore:
        │        Collection: webinars
        │        Document ID: auto-generated
        │        Data: {
        │          title: "...",
        │          description: "...",
        │          scheduledAt: Timestamp,
        │          duration: 60,
        │          maxAttendees: 100,
        │          dailyRoomUrl: "https://genelevate.daily.co/webinar-xxx",
        │          host: { id, name },
        │          status: "scheduled",
        │          currentAttendees: 0,
        │          ...
        │        }
        │
        └─> Success! Webinar created ✅
                │
                └─> Modal closes
                    │
                    └─> Admin sees new webinar in table
```

---

## 🎓 Student Joining Flow

```
Student Workflow:
═════════════════

1. Student navigates to /webinars
        │
        ├─> Sees webinar listing page
        │   ├─> Live webinars banner (if any live)
        │   ├─> Upcoming webinars
        │   ├─> All webinars grid
        │   └─> Filters & search
        │
2. Clicks on webinar card
        │
        └─> Navigates to /webinars/[id]
            │
            ├─> Page loads webinar data from Firestore
            │   ├─> doc(db, 'webinars', webinarId)
            │   └─> getDoc(webinarRef)
            │
            ├─> Displays webinar details:
            │   ├─> Title & description
            │   ├─> Date & time
            │   ├─> Status badge (Live/Upcoming/Ended)
            │   ├─> Host information
            │   ├─> Attendee count
            │   ├─> Agenda (if any)
            │   ├─> Materials (if any)
            │   └─> Tags
            │
3. IF webinar is LIVE:
        │
        ├─> "Join Live Webinar" button appears
        │        (Red, pulsing, prominent)
        │
        └─> Student clicks button
                │
                ├─> setShowLiveRoom(true)
                │
                └─> LiveWebinarRoom component renders
                    │
                    ├─> Receives props:
                    │   ├─> roomUrl: webinar.dailyRoomUrl
                    │   ├─> isHost: false (student)
                    │   └─> userName: student name
                    │
                    ├─> DailyProvider initializes
                    │   └─> Connects to Daily.co room
                    │
                    ├─> WebinarCall component renders
                    │   │
                    │   ├─> Video area:
                    │   │   ├─> Host video (large)
                    │   │   ├─> Screen share (if active)
                    │   │   └─> Other participants (grid)
                    │   │
                    │   ├─> Chat sidebar:
                    │   │   ├─> Live messages
                    │   │   ├─> Send message input
                    │   │   └─> Emoji reactions
                    │   │
                    │   ├─> Participants sidebar:
                    │   │   ├─> List of all participants
                    │   │   ├─> Audio/video status
                    │   │   └─> Join/leave notifications
                    │   │
                    │   └─> Controls bar:
                    │       ├─> Mic toggle (off by default)
                    │       ├─> Camera toggle (off by default)
                    │       ├─> Chat toggle
                    │       ├─> Participants toggle
                    │       └─> Leave button
                    │
                    └─> Student watches, chats, engages!
                            │
                            └─> Clicks "Leave Webinar"
                                │
                                └─> Returns to webinar detail page

4. IF webinar is UPCOMING:
        │
        └─> "Register for Webinar" button shown
            └─> Registration flow (future feature)

5. IF webinar is ENDED:
        │
        └─> "Watch Recording" button shown (if available)
            └─> Links to recording URL
```

---

## 🎤 Host Workflow (Same as Student, but with extras)

```
Host Workflow:
══════════════

Same as Student UNTIL they enter the room, then:

WebinarCall component detects isHost === true
        │
        ├─> Camera & Mic: ON by default
        │
        ├─> Video positioning: Prominent, large
        │
        ├─> Additional controls:
        │   ├─> Screen Share button
        │   │   └─> Share entire screen or window
        │   │
        │   ├─> Start/Stop Recording
        │   │   └─> Automatic cloud recording
        │   │
        │   └─> Manage Participants
        │       └─> Mute/unmute others (if needed)
        │
        └─> Host presents, teaches, engages!
```

---

## 🔄 Real-Time Data Flow

```
During Live Webinar:
════════════════════

┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Host      │         │  Student 1  │         │  Student 2  │
│   Browser   │         │   Browser   │         │   Browser   │
└──────┬──────┘         └──────┬──────┘         └──────┬──────┘
       │                       │                        │
       ├───────────────────────┼────────────────────────┤
       │         WebRTC P2P Connection (Video/Audio)    │
       │         Via Daily.co Infrastructure            │
       ├───────────────────────┼────────────────────────┤
       │                       │                        │
       │  Chat Message         │                        │
       ├──────────────────────>│                        │
       │                       ├───────────────────────>│
       │                       │                        │
       │  Screen Share Start   │                        │
       ├──────────────────────>│                        │
       │                       ├───────────────────────>│
       │                       │                        │
       │                       │  Emoji Reaction        │
       │<──────────────────────┼────────────────────────┤
       │                       │                        │
       └───────────────────────┴────────────────────────┘
                               │
                     ┌─────────▼─────────┐
                     │  Daily.co Server  │
                     │   (SFU/MCU)       │
                     └───────────────────┘
```

---

## 💾 Data Storage Structure

```
Firestore Database:
═══════════════════

Collection: webinars/
├─ {webinarId}/
│  ├─ title: string
│  ├─ description: string
│  ├─ shortDescription: string
│  ├─ scheduledAt: Timestamp
│  ├─ duration: number (minutes)
│  ├─ maxAttendees: number
│  ├─ currentAttendees: number
│  ├─ subject: string
│  ├─ tags: string[]
│  ├─ dailyRoomUrl: string ← Daily.co room URL
│  ├─ providerJoinUrl: string ← Same as dailyRoomUrl
│  ├─ host: {
│  │  ├─ id: string
│  │  └─ name: string
│  │}
│  ├─ status: "scheduled" | "live" | "ended" | "cancelled"
│  ├─ recordingUrl: string (after webinar)
│  ├─ agenda: array
│  ├─ materials: array
│  ├─ createdAt: Timestamp
│  └─ updatedAt: Timestamp
│
└─ {anotherWebinarId}/
   └─ ...

Collection: virtualDebates/
├─ {debateId}/
│  ├─ title: string
│  ├─ description: string
│  ├─ debateTopicId: string
│  ├─ scheduledTime: Timestamp
│  ├─ durationMinutes: number
│  ├─ meetingLink: string ← Daily.co room URL
│  ├─ participants: string[] (user IDs)
│  ├─ hostId: string
│  ├─ status: "scheduled" | "live" | "completed" | "cancelled"
│  ├─ recordingUrl: string (after debate)
│  ├─ createdAt: Timestamp
│  └─ updatedAt: Timestamp
│
└─ ...
```

---

## 🔒 Security Flow

```
Authentication & Authorization:
═══════════════════════════════

┌──────────────┐
│    User      │
└──────┬───────┘
       │
       ├─> Logs in via Firebase Auth
       │   └─> Receives Auth Token
       │
       ├─> Navigates to /webinars/[id]
       │   │
       │   ├─> BasicPlanGuard checks subscription
       │   │   └─> Allow if has Basic plan or higher
       │   │
       │   └─> Page loads webinar data
       │       └─> Firestore rules allow read if authenticated
       │
       ├─> Clicks "Join Live Webinar"
       │   │
       │   ├─> Client checks if webinar is live
       │   │
       │   ├─> Client renders LiveWebinarRoom
       │   │   └─> Passes roomUrl (Daily.co room)
       │   │
       │   └─> Daily.co SDK connects
       │       ├─> Room is private (requires URL)
       │       ├─> User must have URL to join
       │       └─> No additional Daily.co auth needed
       │
       └─> User joins room successfully ✅

For Admin:
──────────
       │
       ├─> Navigates to /admin/webinars
       │   │
       │   ├─> RoleGuard checks user.role === 'admin'
       │   │   └─> Block if not admin
       │   │
       │   └─> Page loads
       │
       ├─> Creates webinar
       │   │
       │   ├─> Client calls /api/webinars/create-room
       │   │   │
       │   │   ├─> Server-side API route
       │   │   │   └─> Uses DAILY_API_KEY (server env)
       │   │   │       └─> Never exposed to client!
       │   │   │
       │   │   └─> Returns room URL
       │   │
       │   └─> Saves to Firestore
       │       └─> Firestore rules allow write if admin
       │
       └─> Webinar created securely ✅
```

---

## 🎬 Recording Flow

```
Cloud Recording:
════════════════

1. Admin creates webinar
        │
        └─> Daily.co room created with enable_recording: "cloud"

2. Webinar goes live
        │
        └─> Host clicks "Start Recording" (or auto-starts)
                │
                └─> Daily.co cloud records automatically
                        │
                        ├─> Video stored in Daily.co cloud
                        ├─> MP4 file generated after webinar ends
                        └─> Available via Daily.co dashboard

3. After webinar ends
        │
        ├─> Admin goes to Daily.co dashboard
        │
        ├─> Downloads recording or gets public link
        │
        ├─> Uploads to your storage (Firebase, S3, etc.) OR
        │   Uses Daily.co link directly
        │
        └─> Admin updates Firestore:
                webinar.recordingUrl = "https://your-storage/recording.mp4"
                webinar.recordingAvailable = true

4. Students can now watch recording
        │
        └─> Click "Watch Recording" button on /webinars/[id]
                │
                └─> Opens recording in new tab or video player
```

---

## 📊 Monitoring & Analytics

```
Usage Tracking:
═══════════════

Daily.co Dashboard:
├─> Total minutes used this month
├─> Number of active rooms
├─> Participant counts per room
├─> Recording storage used
└─> API call logs

Your Analytics (to implement):
├─> Track webinar attendance in Firestore
├─> Log join/leave events
├─> Measure engagement (chat messages, time spent)
├─> Generate reports for admins
└─> Student progress tracking
```

---

## 🚀 Complete Request Flow Summary

```
User Action → Frontend → API Route → Daily.co → Firestore → Response

Example: Creating a Webinar
───────────────────────────

[Admin]
   │
   └─> Fills form on /admin/webinars
         │
         └─> Clicks "Create"
               │
               ├─> [Client] Validates form
               │
               ├─> [Client] POST /api/webinars/create-room
               │      │
               │      └─> [Server] API Route
               │            │
               │            ├─> Uses DAILY_API_KEY from env
               │            │
               │            ├─> POST https://api.daily.co/v1/rooms
               │            │      │
               │            │      └─> [Daily.co] Creates room
               │            │            │
               │            │            └─> Returns room URL
               │            │
               │            └─> Returns to client: { roomUrl: "..." }
               │
               ├─> [Client] Receives room URL
               │
               ├─> [Client] Calls Firestore
               │      │
               │      └─> addDoc(collection(db, 'webinars'), {
               │            title: "...",
               │            dailyRoomUrl: "...",
               │            ...
               │          })
               │
               └─> [Client] Shows success message
                     │
                     └─> Webinar appears in admin table ✅
```

---

This completes your full system integration! 🎉

