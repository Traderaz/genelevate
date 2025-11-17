# Daily.co Quick Start Guide

## 🔑 Get Your API Key

1. Go to: https://dashboard.daily.co/developers
2. Copy your **API Key**

## ⚙️ Add to Environment

Open/create: `D:\Genelevate\apps\web\.env.local`

Add these two lines:
```env
DAILY_API_KEY=paste-your-api-key-here
NEXT_PUBLIC_DAILY_DOMAIN=genelevate.daily.co
```

## 🎯 That's It!

Restart your dev server:
```bash
cd D:\Genelevate\apps\web
npm run dev
```

## ✨ How to Use:

### Create a Debate (Admin):
1. Go to: `/admin/debates/virtual`
2. Click "Schedule New Debate"
3. Fill out the form
4. **Leave "Meeting Link" empty** - system auto-creates video room!
5. Add participant user IDs
6. Click "Create"

### Join a Debate (Student):
1. Go to: `/debates/virtual`
2. Click on any live debate
3. Click "Join" or "Watch"
4. Video room opens in your website!

### Join a Webinar (Student):
1. Go to webinar detail page
2. Click "Join Live Webinar" (when live)
3. Video room opens embedded in your site!
4. Watch, chat, and engage!

## 🎥 Features:
- ✅ Embedded video (no external links!)
- ✅ Auto-room generation
- ✅ Participant controls (mic, camera, screen share)
- ✅ Viewer mode (watch-only)
- ✅ Live chat
- ✅ Recording support
- ✅ **Works for BOTH debates and webinars!**

## 🆘 Troubleshooting:

**"API key not configured"**
→ Add `DAILY_API_KEY` to `.env.local` and restart server

**"Failed to create room"**
→ Check your Daily.co dashboard - you might need to verify your account

**Video not loading**
→ Check browser console for errors, ensure `NEXT_PUBLIC_DAILY_DOMAIN` is set correctly

---

Need help? Check the full guide: `DAILY_SETUP.md`

