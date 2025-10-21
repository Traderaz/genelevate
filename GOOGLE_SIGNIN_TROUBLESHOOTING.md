# Google Sign-In Troubleshooting Guide

## Issue: Google Sign-In Not Working on Live Site

This guide will help you fix Google authentication issues on your production site.

## Quick Checklist

1. [ ] Firebase authorized domains configured
2. [ ] Google OAuth credentials configured
3. [ ] Environment variables set in Vercel
4. [ ] Firebase app properly initialized
5. [ ] No popup blockers interfering
6. [ ] Browser console errors checked

## Step-by-Step Solutions

### 1. Configure Firebase Authorized Domains

**Action Required:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication** → **Settings** → **Authorized domains**
4. Click **Add domain** and add:
   - Your production domain (e.g., `genelevate.app`)
   - Your www subdomain (e.g., `www.genelevate.app`)
   - Your Vercel preview URLs (e.g., `yourapp.vercel.app`)
   - Your Vercel preview pattern (e.g., `yourapp-*.vercel.app`)

**Note:** Firebase automatically includes `localhost` and `*.firebaseapp.com`, but you must manually add production domains.

---

### 2. Configure Google OAuth Credentials

**Action Required:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project (same project ID)
3. Navigate to **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client ID (look for "Web client (auto created by Google Service)")
5. Click to edit it

**Add Authorized JavaScript Origins:**
```
https://genelevate.app
https://www.genelevate.app
https://yourapp.vercel.app
https://yourproject.firebaseapp.com
```

**Add Authorized Redirect URIs:**
```
https://genelevate.app/__/auth/handler
https://www.genelevate.app/__/auth/handler
https://yourapp.vercel.app/__/auth/handler
https://yourproject.firebaseapp.com/__/auth/handler
```

**Important:** Replace `genelevate.app`, `yourapp`, and `yourproject` with your actual domain and project names.

---

### 3. Verify Vercel Environment Variables

**Action Required:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Verify these variables are set for **Production**:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_production_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=yourproject.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=yourproject
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=yourproject.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Note:** Make sure you're using your **production** Firebase config, not development config!

After updating, you must **redeploy** your application for changes to take effect.

---

### 4. Fix Code Issues

Your codebase has duplicate Firebase initialization which could cause issues:

**Problem:**
- `apps/web/src/contexts/auth-context.tsx` imports from `lib/firebase.ts`
- `apps/web/src/components/auth/login-form.tsx` initializes Firebase separately

**Solution:**
The `login-form.tsx` should use the auth context instead of initializing Firebase directly.

See the code fix below.

---

### 5. Enable Google Sign-In Method

**Action Required:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication** → **Sign-in method**
4. Find **Google** in the provider list
5. Click on it and ensure it's **Enabled**
6. Verify the **Project support email** is set
7. Save changes

---

### 6. Check Browser Console for Specific Errors

Common error messages and their solutions:

**Error: "auth/unauthorized-domain"**
- Solution: Add your domain to Firebase authorized domains (Step 1)

**Error: "auth/popup-blocked"**
- Solution: User needs to allow popups, or implement redirect flow instead

**Error: "invalid_client"**
- Solution: Check Google OAuth credentials are properly configured (Step 2)

**Error: "redirect_uri_mismatch"**
- Solution: Add the correct redirect URI to Google OAuth (Step 2)

**Error: "idpiframe_initialization_failed"**
- Solution: User has third-party cookies blocked or browser privacy settings too strict

---

## Testing the Fix

### Development Testing
```bash
# Test locally first
cd apps/web
npm run dev
```

Visit `http://localhost:3000` and try Google sign-in.

### Production Testing

After making all configuration changes:

1. Redeploy your application:
   ```bash
   git push origin main
   ```

2. Clear browser cache and cookies for your site

3. Test in incognito/private window to avoid cached credentials

4. Check browser console (F12) for any error messages

5. Test on multiple browsers (Chrome, Firefox, Safari)

---

## Additional Debugging

### Check Firebase Authentication Configuration

```bash
# List your Firebase projects
firebase projects:list

# Ensure you're using the correct project
firebase use --add
```

### Verify Environment Variables Are Loaded

Add this temporary debugging code to `apps/web/src/lib/firebase.ts`:

```typescript
console.log('Firebase Config:', {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✓ Set' : '✗ Missing',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});
```

Check the browser console to see if environment variables are loading correctly.

**Remember to remove this debug code after testing!**

---

## Alternative: Use Redirect Instead of Popup

If popup-based sign-in continues to have issues, you can switch to redirect-based sign-in:

In `apps/web/src/contexts/auth-context.tsx`, replace `signInWithPopup` with `signInWithRedirect`:

```typescript
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';

// In signInWithGoogle function:
const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Add this to handle redirect result
useEffect(() => {
  getRedirectResult(auth)
    .then((result) => {
      if (result) {
        createUserProfile(result.user);
      }
    })
    .catch((error) => {
      console.error('Redirect result error:', error);
    });
}, []);
```

---

## Contact Support

If you've tried all these steps and Google sign-in still doesn't work:

1. Check Firebase Status: https://status.firebase.google.com/
2. Check Google Cloud Status: https://status.cloud.google.com/
3. Review Firebase Auth documentation: https://firebase.google.com/docs/auth/web/google-signin
4. Check Vercel deployment logs for errors

---

## Prevention Checklist

For future deployments, always verify:

- [ ] Environment variables are set in deployment platform
- [ ] All production domains are added to Firebase authorized domains
- [ ] OAuth credentials include all redirect URIs
- [ ] Browser console shows no errors on live site
- [ ] Test in incognito mode before announcing
- [ ] Test on multiple browsers and devices

