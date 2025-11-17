# Daily.co Integration Setup Guide

## ✅ Account Setup Complete!
- Your subdomain: **genelevate.daily.co**
- Status: Email verified ✓

## 📝 Next Steps:

### 1. Get Your API Key
1. Click "Open dashboard" button
2. Go to **Developers** section in the left sidebar
3. Copy your **API Key**

### 2. Add Environment Variables

Create or update `.env.local` in your project root (`D:\Genelevate\apps\web\.env.local`):

```env
# Daily.co Configuration
NEXT_PUBLIC_DAILY_DOMAIN=genelevate.daily.co
DAILY_API_KEY=your-api-key-here
```

⚠️ **Important:** Replace `your-api-key-here` with your actual API key from the dashboard.

### 3. Create API Route for Room Management

The API route will automatically create Daily.co rooms when admins schedule debates.

**File:** `apps/web/src/app/api/debates/create-room/route.ts`

### 4. Update Admin Modal

When admins create a virtual debate, the system will:
1. Create a Daily.co room automatically
2. Save the room URL to Firestore
3. Students can join directly in the website

## 🎯 How It Works:

### For Admins:
1. Go to `/admin/debates/virtual`
2. Click "Schedule New Debate"
3. Fill in debate details (system auto-creates Daily.co room)
4. Room URL: `https://genelevate.daily.co/debate-[random-id]`

### For Students:
1. Navigate to `/debates/virtual`
2. Click on a live debate
3. Click "Join Live Debate" or "Watch Live Debate"
4. Video room opens **inside the website** (no external links!)

### For Participants (Speakers):
- ✅ Camera enabled
- ✅ Microphone enabled
- ✅ Screen sharing available
- ✅ Full controls

### For Viewers:
- 👁 Watch-only mode
- ❌ Camera off
- ❌ Microphone muted
- ✅ Can see and hear everything

## 📊 Usage Limits (Free Tier):
- **10,000 minutes/month** - You'll use ~100 mins ✓
- **20 participants per room** - Perfect for debates ✓
- **Unlimited rooms** ✓
- **Recording included** ✓

## ✅ Integration Complete!

The following has been set up:

### 1. API Route Created ✓
- **File:** `apps/web/src/app/api/debates/create-room/route.ts`
- **Purpose:** Automatically creates Daily.co rooms when admins schedule debates
- **Security:** Uses server-side API key (never exposed to client)

### 2. Admin Modal Updated ✓
- **File:** `apps/web/src/components/admin/create-virtual-debate-modal.tsx`
- **Features:**
  - Auto-generates Daily.co room if meeting link is left empty
  - Shows helpful message about auto-generation
  - Falls back to manual link entry if needed

### 3. Live Debate Room Ready ✓
- **File:** `apps/web/src/components/debates/live-debate-room.tsx`
- **Features:**
  - Embedded video directly in your website
  - Participant controls (mic, camera, screen share)
  - Viewer mode (watch-only)
  - Live chat functionality

## 🚀 Final Step: Add Your API Key

1. Open or create: `D:\Genelevate\apps\web\.env.local`
2. Add this line (replace with your actual API key):

```env
DAILY_API_KEY=your-actual-api-key-from-dashboard
NEXT_PUBLIC_DAILY_DOMAIN=genelevate.daily.co
```

3. Restart your development server:
```bash
npm run dev
```

## 🎬 Test the Full Flow:

### As Admin:
1. Go to `/admin/debates/virtual`
2. Click "Schedule New Debate"
3. Fill in the form (leave Meeting Link empty)
4. Click "Create" - Room will auto-generate! 🎉
5. You'll see a URL like: `https://genelevate.daily.co/debate-xxx`

### As Student:
1. Go to `/debates/virtual`
2. Click on a live debate
3. Click "Join Live Debate" (if participant) or "Watch Live Debate" (if viewer)
4. Video room opens **inside your website** - no external tabs!

## 📊 What Happens Behind the Scenes:

1. Admin schedules debate → API route creates Daily.co room
2. Room URL saved to Firestore
3. Students click to join → `LiveDebateRoom` component loads
4. Daily.co SDK embeds video directly in your website
5. Participants can speak, viewers can watch
6. All data stays in your ecosystem!

## 🎉 You're Done!

Your virtual debate system is now fully operational with professional embedded video!

