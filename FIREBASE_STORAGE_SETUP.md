# Firebase Storage Setup Guide

This guide explains how to configure Firebase Storage for the Gen Elevate platform, specifically for uploading founder images.

## Current Issue

If you're seeing "Failed to upload image" errors, it's likely because Firebase Storage security rules need to be configured.

## Solution: Configure Firebase Storage Rules

### Option 1: Using Firebase Console (Recommended for Quick Setup)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on **Storage** in the left sidebar
4. Click on the **Rules** tab
5. Replace the existing rules with one of the following:

#### For Development (Less Secure - Use Temporarily)
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated admins to upload founder images
    match /founders/{imageId} {
      allow read: if true; // Anyone can read
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
    // Restrict all other paths
    match /{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

#### For Production (More Secure - Recommended)
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Founder images - only admins can upload
    match /founders/{imageId} {
      allow read: if true; // Anyone can view
      allow write: if request.auth != null && 
                     request.auth.token.role == 'admin'; // Only admins can upload
    }
    
    // User profile images
    match /profiles/{userId}/{imageId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Course content images
    match /courses/{courseId}/{imageId} {
      allow read: if true;
      allow write: if request.auth != null && 
                     (request.auth.token.role == 'admin' || 
                      request.auth.token.role == 'creator');
    }
    
    // Default: deny all other paths
    match /{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

6. Click **Publish** to save the rules

### Option 2: Using Firebase CLI

1. Install Firebase CLI if not already installed:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project (if not done):
   ```bash
   cd D:\Genelevate
   firebase init storage
   ```

4. Edit `storage.rules` file in your project root

5. Deploy the rules:
   ```bash
   firebase deploy --only storage
   ```

## Testing the Upload

After configuring the rules:

1. Refresh your browser
2. Go to `/admin/founders`
3. Try uploading an image again
4. Check the browser console for any error messages

## Verifying Storage Configuration

1. In Firebase Console → Storage
2. Click on **Files** tab
3. You should see a `founders/` folder after a successful upload
4. Click on any uploaded image to verify the URL is accessible

## Common Issues & Solutions

### Error: "storage/unauthorized"
**Solution**: Storage rules are too restrictive. Use the development rules above temporarily.

### Error: "storage/unknown"
**Solution**: 
- Check that Firebase Storage is enabled in your project
- Verify your Firebase config includes `storageBucket`
- Check browser console for more details

### Upload Succeeds but No Image Shows
**Solution**: 
- Verify the download URL is publicly accessible
- Check if CORS is configured (usually automatic with Firebase)

### Files Upload but Can't Be Accessed
**Solution**: 
- Check read rules - ensure `allow read: if true;` for public access
- Or restrict to authenticated users: `allow read: if request.auth != null;`

## Security Best Practices

### For Production:
1. ✅ Always validate file types (already implemented)
2. ✅ Set file size limits (5MB max - already implemented)
3. ✅ Use authenticated uploads only
4. ✅ Restrict write access to admin role
5. ✅ Allow public read for founder images (needed for homepage)
6. ✅ Use unique filenames with timestamps (already implemented)

### Additional Security (Optional):
```javascript
// In storage rules, add file size and type validation
match /founders/{imageId} {
  allow read: if true;
  allow write: if request.auth != null && 
                 request.auth.token.role == 'admin' &&
                 request.resource.size < 5 * 1024 * 1024 && // Max 5MB
                 request.resource.contentType.matches('image/.*'); // Only images
}
```

## Alternative: Use Image URL Instead

If you're having trouble with Firebase Storage setup, you can:

1. Upload images to any hosting service (Imgur, Cloudinary, etc.)
2. Copy the public image URL
3. Paste it directly into the "Image URL" field in the admin panel
4. Skip the "Upload Image" button entirely

## Storage Costs

Firebase Storage includes:
- **Free tier**: 5GB storage, 1GB/day download
- **Paid (Blaze plan)**: $0.026/GB storage, $0.12/GB download

For a few founder images, you'll stay well within the free tier.

## Need Help?

If you continue to have issues:
1. Check the browser console (F12) for detailed error messages
2. Check Firebase Console → Storage → Usage for any quota issues
3. Verify your Firebase project billing is set up (required for some features)
4. Use the image URL method as a temporary workaround

