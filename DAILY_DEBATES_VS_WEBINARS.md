# Daily.co: Debates vs Webinars

## 🎯 Overview

Both virtual debates and webinars use Daily.co for embedded video, but they serve different purposes with slightly different features.

## 📊 Side-by-Side Comparison

| Feature | Virtual Debates | Webinars |
|---------|----------------|----------|
| **Purpose** | Student competitions | Educational sessions |
| **Typical Duration** | 30-60 minutes | 60-120 minutes |
| **Participants** | 4-10 invited students | Host + unlimited attendees |
| **Max Capacity** | 20 participants | 100+ attendees |
| **Speaker Role** | All participants speak | Host presents, attendees watch |
| **Mic/Camera Default** | ON for participants | OFF for attendees |
| **Screen Sharing** | Host only | Host only |
| **Chat** | ✅ Yes | ✅ Yes |
| **Recording** | ✅ Cloud recording | ✅ Cloud recording |
| **Join Access** | Invited participants only | All registered students |
| **Grading** | ✅ Graded by admin | ❌ No grading |
| **API Endpoint** | `/api/debates/create-room` | `/api/webinars/create-room` |
| **Component** | `LiveDebateRoom` | `LiveWebinarRoom` |

## 🎭 Virtual Debates

### Use Case:
Monthly debate competitions where top-performing students are invited to participate in a live, moderated debate on a specific topic.

### Key Features:
- **Participant-focused:** Everyone can speak
- **Competitive:** Graded performance
- **Exclusive:** Only invited students
- **Interactive:** All participants engage

### User Flow:
1. Admin creates debate topic
2. Students submit written/video responses
3. Admin grades submissions
4. Top students invited to virtual debate
5. Invited students join with mic/camera ON
6. Others can watch (but not speak)
7. Admin moderates and judges

### Technical Details:
```typescript
// Create debate room
POST /api/debates/create-room
Body: {
  debateTitle: "AI in Education",
  durationMinutes: 45
}

// Component usage
<LiveDebateRoom
  roomUrl={debate.meetingLink}
  isParticipant={user.uid in debate.participants}
  userName={user.displayName}
  onLeave={handleLeave}
/>
```

## 🎓 Webinars

### Use Case:
Educational sessions where an expert host presents to many students, with Q&A and chat interaction.

### Key Features:
- **Host-focused:** Host presents, attendees watch
- **Educational:** Learning-oriented
- **Open:** All registered students can join
- **Scalable:** Support 100+ attendees

### User Flow:
1. Admin schedules webinar
2. Students register
3. At scheduled time, students join
4. Students watch with mic/camera OFF
5. Host presents, shares screen
6. Students engage via chat
7. Optional Q&A session

### Technical Details:
```typescript
// Create webinar room
POST /api/webinars/create-room
Body: {
  webinarTitle: "Career Skills Workshop",
  durationMinutes: 90,
  maxAttendees: 100
}

// Component usage
<LiveWebinarRoom
  roomUrl={webinar.dailyRoomUrl}
  isHost={user.uid === webinar.host.id}
  userName={user.displayName}
  onLeave={handleLeave}
/>
```

## 🎨 UI Differences

### Virtual Debates:
- **Layout:** Equal-sized video tiles for all participants
- **Focus:** Everyone is equally visible
- **Controls:** All participants have full mic/camera control
- **Chat:** Smaller, secondary feature
- **Branding:** Competition feel

### Webinars:
- **Layout:** Large host video, small attendee grid
- **Focus:** Host is prominent
- **Controls:** Host has full control, attendees limited
- **Chat:** Prominent, primary interaction method
- **Branding:** Professional, educational feel

## 🔧 Configuration Differences

### Debate Room Settings:
```javascript
{
  max_participants: 20,
  enable_screenshare: true, // Host only
  enable_chat: true,
  owner_only_broadcast: false, // All can speak
  enable_prejoin_ui: true,
}
```

### Webinar Room Settings:
```javascript
{
  max_participants: 100,
  enable_screenshare: true, // Host only
  enable_chat: true,
  enable_advanced_chat: true,
  enable_emoji_reactions: true,
  enable_recording: 'cloud',
  owner_only_broadcast: false,
}
```

## 💡 When to Use Which?

### Use Virtual Debates For:
- 🏆 Student competitions
- 🎤 Speaking practice
- 🤝 Small group discussions
- 📝 Graded activities
- 💬 Everyone needs to speak

### Use Webinars For:
- 📚 Educational presentations
- 👨‍🏫 Expert talks
- 🎓 Training sessions
- 📊 Large audiences
- 👁️ Watch and learn format

## 🚀 Best Practices

### For Debates:
1. Keep participant count low (4-10 ideal)
2. Set clear time limits per speaker
3. Use chat for judging notes
4. Record for grading purposes
5. Have a moderator (admin/host)

### For Webinars:
1. Optimize for large audiences
2. Use screen sharing for presentations
3. Encourage chat engagement
4. Plan Q&A sessions
5. Record for future viewing
6. Share materials in advance

## 📈 Scaling Considerations

### Daily.co Free Tier (10,000 mins/month):

**Debates:**
- 10 participants × 45 mins = 450 minutes per debate
- ~22 debates per month

**Webinars:**
- 100 attendees × 90 mins = 9,000 minutes per webinar
- ~1 large webinar per month
- OR 10 attendees × 90 mins = 900 minutes per small webinar
- ~11 small webinars per month

**Mixed Usage:**
- 2 large webinars (18,000 mins... wait, over limit!)
- Better: Multiple smaller webinars + debates
- Example: 5 debates (2,250 mins) + 8 small webinars (7,200 mins) = 9,450 mins ✅

## 💰 Cost Optimization Tips

1. **Keep debates short** (30-45 mins ideal)
2. **Limit webinar attendance** for free tier (50-100 max)
3. **Use recordings** instead of live replays
4. **Schedule strategically** to spread usage
5. **Consider upgrading** if needed (paid plans available)

---

**Bottom Line:**
- **Debates** = Small, interactive, competitive
- **Webinars** = Large, educational, presentation-style
- **Both** = Embedded, professional, easy to use!

Your Daily.co setup supports **both perfectly!** 🎉

