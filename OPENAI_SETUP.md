# 🤖 OpenAI ChatGPT Setup Guide

## Quick Setup

### 1. Get Your OpenAI API Key

1. **Visit OpenAI Platform**: https://platform.openai.com/
2. **Sign in or Create Account**: Use your email or Google/Microsoft account
3. **Navigate to API Keys**: 
   - Click on your profile (top right)
   - Select "View API keys"
   - Or go directly to: https://platform.openai.com/api-keys

4. **Create New Key**:
   - Click "Create new secret key"
   - Give it a name (e.g., "Gen Elevate Production")
   - Copy the key immediately (you won't be able to see it again!)
   - Format: `sk-...` (starts with sk-)

5. **Set Up Billing** (Important!):
   - Go to: https://platform.openai.com/account/billing
   - Add a payment method
   - Set a monthly budget limit (recommended: £50-100 to start)
   - Enable usage notifications

---

### 2. Add API Key to Your Project

**Create/Update `apps/web/.env.local`:**
```env
# OpenAI API
OPENAI_API_KEY=sk-proj-...your-actual-key-here
```

**⚠️ Important**: 
- Never commit `.env.local` to git (already in `.gitignore`)
- Keep this key secret
- Rotate it periodically

---

### 3. Install OpenAI SDK

```bash
cd apps/web
npm install openai
```

---

### 4. Model Selection

The AI is currently set to use **GPT-4 Turbo** (best quality). You can change this in the code:

#### Option A: GPT-4 Turbo (Recommended)
- **Model**: `gpt-4-turbo-preview` or `gpt-4-1106-preview`
- **Best For**: Complex reasoning, detailed explanations, accuracy
- **Cost**: ~$10/M input tokens, ~$30/M output tokens
- **Speed**: Moderate (2-5 seconds per response)

#### Option B: GPT-3.5 Turbo (Budget-Friendly)
- **Model**: `gpt-3.5-turbo`
- **Best For**: Simple queries, faster responses, lower cost
- **Cost**: ~$0.50/M input tokens, ~$1.50/M output tokens (20x cheaper!)
- **Speed**: Fast (1-2 seconds per response)

**To Change Model:**

Edit `apps/web/src/app/api/ai/chat/route.ts`:
```typescript
const completion = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo', // Change from 'gpt-4-turbo-preview'
  // ... rest of config
});
```

---

## Cost Estimation

### Expected Usage (Per Month):

**Free Tier Users** (10 msgs/day):
- **GPT-4 Turbo**: ~300 messages = ~$15-20/month
- **GPT-3.5 Turbo**: ~300 messages = ~$0.75-1/month

**Student Tier** (50 msgs/day):
- **GPT-4 Turbo**: ~1,500 messages = ~$75-100/month
- **GPT-3.5 Turbo**: ~1,500 messages = ~$4-5/month

**Premium Tier** (200 msgs/day):
- **GPT-4 Turbo**: ~6,000 messages = ~$300-400/month
- **GPT-3.5 Turbo**: ~6,000 messages = ~$15-20/month

**Institution Tier** (1000 msgs/day):
- **GPT-4 Turbo**: ~30,000 messages = ~$1,500-2,000/month
- **GPT-3.5 Turbo**: ~30,000 messages = ~$75-100/month

### 💡 Recommendation:
Start with **GPT-3.5 Turbo** for cost efficiency. Upgrade to GPT-4 Turbo if you need:
- More complex reasoning
- Better accuracy for difficult topics
- Higher quality explanations
- Better context understanding

---

## Safety & Monitoring

### 1. Set Usage Limits in OpenAI Dashboard

https://platform.openai.com/account/limits

Set:
- **Hard Limit**: Maximum you're willing to spend (e.g., £100/month)
- **Soft Limit**: Warning threshold (e.g., £75/month)
- **Email Notifications**: Get alerted at 75%, 90%, 100%

### 2. Monitor Usage

**OpenAI Dashboard**: https://platform.openai.com/usage
- View daily/monthly usage
- See token breakdown
- Track costs in real-time

**Your Analytics** (Firestore):
- Check `aiUsage` collection
- Monitor tokens per user
- Track rate limit hits

### 3. Security Best Practices

✅ **Do**:
- Store API key in environment variables only
- Use different keys for dev/staging/production
- Rotate keys every 3-6 months
- Set spending limits
- Monitor for unusual usage

❌ **Don't**:
- Commit API keys to git
- Share keys via email/Slack
- Use same key across projects
- Skip usage monitoring
- Ignore cost alerts

---

## Testing

### Test the AI Works:

1. **Start your dev server:**
```bash
cd apps/web
npm run dev
```

2. **Navigate to AI page:**
```
http://localhost:3000/ai
```

3. **Send a test message:**
```
"Can you help me with calculus?"
```

4. **Verify:**
- Response appears within 2-5 seconds
- Message saved to Firestore (`aiMessages` collection)
- Session created (`aiSessions` collection)
- Usage tracked (`aiUsage` collection)
- No errors in console

### Check Firestore:

**Firebase Console** → **Firestore Database**:
- `aiSessions` - Should have 1 new session
- `aiMessages` - Should have 2 messages (user + assistant)
- `aiUsage` - Should have today's date with messageCount: 1

---

## Troubleshooting

### Error: "Invalid API Key"
- ✅ Check `.env.local` has correct key
- ✅ Restart dev server after adding key
- ✅ Verify key starts with `sk-`
- ✅ Check key hasn't been revoked in OpenAI dashboard

### Error: "Rate Limit Exceeded" (OpenAI)
- ✅ You've hit OpenAI's rate limits (not your app's)
- ✅ Wait a few minutes and try again
- ✅ Upgrade OpenAI account tier if needed
- ✅ Check usage dashboard

### Error: "Insufficient Quota"
- ✅ Add payment method to OpenAI account
- ✅ Check billing limits aren't set too low
- ✅ Verify payment method is valid

### AI Responds Too Slowly
- ✅ Switch to GPT-3.5 Turbo (faster)
- ✅ Reduce max_tokens in API call
- ✅ Check your internet connection
- ✅ Normal for GPT-4 (2-5 sec is expected)

### Messages Not Saving to Firestore
- ✅ Check Firebase credentials in `.env.local`
- ✅ Verify Firestore security rules deployed
- ✅ Check browser console for errors
- ✅ Ensure user is authenticated

---

## API Key Management

### Creating Multiple Keys

For different environments:

1. **Development Key**:
   - Name: "Gen Elevate - Development"
   - Add to: `apps/web/.env.local`

2. **Production Key**:
   - Name: "Gen Elevate - Production"  
   - Add to: Vercel environment variables

3. **Staging Key** (optional):
   - Name: "Gen Elevate - Staging"
   - Add to: Staging environment

### Rotating Keys

Every 3-6 months:
1. Create new key in OpenAI dashboard
2. Update environment variables
3. Test thoroughly
4. Delete old key after 24 hours

---

## Production Deployment

### For Vercel:

1. **Go to Vercel Dashboard**:
   - Select your project
   - Settings → Environment Variables

2. **Add Variable**:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `sk-...your-key`
   - **Environment**: Production (and Preview if needed)

3. **Redeploy**:
   - Trigger new deployment for changes to take effect

### For Other Platforms:

Set environment variable:
```bash
OPENAI_API_KEY=sk-...your-key
```

---

## Cost Optimization Tips

### 1. Use GPT-3.5 Turbo for Simple Queries
Automatically route by complexity in your code.

### 2. Implement Caching
Store common responses in FAQs collection.

### 3. Reduce max_tokens
Lower from 4000 to 1000-2000 for typical usage.

### 4. Add Response Length Limits
Encourage concise answers in system prompts.

### 5. Monitor & Alert
Set up alerts when costs exceed thresholds.

---

## Support

### OpenAI Resources:
- **Documentation**: https://platform.openai.com/docs
- **API Reference**: https://platform.openai.com/docs/api-reference
- **Community Forum**: https://community.openai.com/
- **Status Page**: https://status.openai.com/
- **Help Center**: https://help.openai.com/

### Gen Elevate AI Issues:
- Check Firestore logs
- Review API response in Network tab
- Check browser console for errors
- Verify environment variables loaded

---

## Summary

✅ **To get started**:
1. Get API key from OpenAI
2. Add to `.env.local`: `OPENAI_API_KEY=sk-...`
3. Run `npm install openai`
4. Start dev server
5. Test at `/ai`

That's it! Your AI assistant will now be powered by ChatGPT. 🚀

