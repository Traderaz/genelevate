# Vercel Environment Variables Checklist

## Quick Check: Is Google Sign-In Working?

### Step 1: Verify Environment Variables in Vercel

Go to your Vercel Dashboard → Your Project → Settings → Environment Variables

### Required Variables (Production)

Make sure ALL of these are set for **Production** environment:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=yourproject.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=yourproject
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=yourproject.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### How to Get These Values

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon (⚙️) → Project settings
4. Scroll down to "Your apps" section
5. Click on your web app or create one if you haven't
6. Copy the config values from the `firebaseConfig` object

### Important Notes

- ⚠️ Use your **PRODUCTION** Firebase project config, not development
- ⚠️ After adding/changing variables, you **MUST REDEPLOY** your app
- ⚠️ Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- ✅ You can set the same values for Preview and Development environments for testing

### Step 2: Redeploy After Changes

After updating environment variables:

**Option A: Via Git**
```bash
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

**Option B: Via Vercel Dashboard**
- Go to your project
- Click "Deployments"
- Click the three dots on the latest deployment
- Click "Redeploy"

### Step 3: Test the Deployment

1. Wait for the deployment to complete
2. Clear your browser cache (or use incognito mode)
3. Visit your production URL
4. Try Google sign-in
5. Check browser console (F12) for any errors

## Common Environment Variable Mistakes

### Mistake 1: Using Development Config in Production
**Problem:** You copied values from your local `.env.local` which has dev config
**Solution:** Use the production Firebase project config from Firebase Console

### Mistake 2: Missing or Incomplete Values
**Problem:** Variables are set but empty or have placeholder values
**Solution:** Copy actual values from Firebase Console, not placeholders like "your_api_key"

### Mistake 3: Wrong Environment Selected
**Problem:** Variables set for "Development" but not "Production"
**Solution:** Set variables for all three environments: Production, Preview, Development

### Mistake 4: Not Redeploying After Changes
**Problem:** Updated variables but didn't trigger a new deployment
**Solution:** Redeploy using git push or Vercel dashboard

### Mistake 5: Typos in Variable Names
**Problem:** Variable named `NEXT_PUBLIC_FIREBASE_APIKEY` instead of `NEXT_PUBLIC_FIREBASE_API_KEY`
**Solution:** Use exact names as shown in the checklist above (including underscores)

## Testing Checklist

- [ ] All 7 Firebase environment variables are set in Vercel Production
- [ ] Values are from your production Firebase project (not development)
- [ ] You've redeployed after setting/changing variables
- [ ] Tested in incognito/private browser window
- [ ] Checked browser console for specific error messages
- [ ] Firebase authorized domains include your production domain
- [ ] Google OAuth credentials include your redirect URIs

## If It Still Doesn't Work

1. **Check Browser Console**
   - Press F12 → Console tab
   - Try Google sign-in again
   - Copy the exact error message

2. **Common Error Messages**
   - `auth/unauthorized-domain` → Add domain to Firebase authorized domains
   - `invalid_client` → Fix Google OAuth credentials
   - `redirect_uri_mismatch` → Add redirect URI to Google OAuth
   - `Firebase: Error (auth/configuration-not-found)` → Check environment variables
   - `undefined is not an object` → Firebase config not loading properly

3. **Verify Firebase Config is Loading**
   
   Add this to `apps/web/src/lib/firebase.ts` temporarily (line 15):
   
   ```typescript
   console.log('🔥 Firebase Config Check:', {
     hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
   });
   ```
   
   Then check the browser console. You should see your actual values.
   **Remove this after debugging!**

4. **Check Vercel Build Logs**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the latest deployment
   - Check the "Building" logs for any warnings about missing env vars

## Need Help?

If you've checked everything and it still doesn't work:

1. Share the exact error message from browser console
2. Confirm which Firebase project you're using (dev or prod)
3. Confirm your production domain URL
4. Check if email/password sign-in works (to isolate the issue to Google OAuth specifically)

## Quick Test Command

To verify your environment variables are set correctly in your live site:

1. Open your production site
2. Open browser console (F12)
3. Type:
   ```javascript
   console.log(window.location.hostname)
   ```
4. Note this domain
5. Verify this domain is in Firebase authorized domains AND Google OAuth credentials

