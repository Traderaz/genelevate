# Founders Management Guide

This guide explains how to manage the "Meet the Founder" section on the Gen Elevate homepage.

## Overview

The "Meet the Founder" section appears on the homepage below the hero section. It displays founder profiles with photos, bios, achievements, and social links. All content is dynamically managed through the admin panel.

## Accessing the Founders Management Panel

1. Log in to your admin account
2. Navigate to `/admin/founders` or click "Founders Management" from the admin dashboard
3. You'll see a list of all current founders

## Adding a New Founder

1. Click the **"Add Founder"** button in the top-right corner
2. Fill in the required fields:
   - **Name** (required): Full name of the founder
   - **Role** (required): Job title (e.g., "Founder & CEO", "Co-Founder")
   - **Bio** (required): A brief biography (2-3 sentences recommended)
   - **Image URL** (required): URL to the founder's professional photo
   - **Display Order**: Number to control the order (0 = first, 1 = second, etc.)

3. Optional fields:
   - **LinkedIn URL**: Full LinkedIn profile URL
   - **Twitter URL**: Full Twitter profile URL
   - **Email**: Contact email address
   - **Key Achievements**: Add multiple achievements (click "+ Add Achievement" for more)
   - **Active**: Toggle to show/hide on homepage

4. Click **"Add Founder"** to save

## Editing a Founder Profile

1. Find the founder in the list
2. Click the **Edit** button (pencil icon)
3. Modify any fields
4. Click **"Update Founder"** to save changes

## Deleting a Founder

1. Find the founder in the list
2. Click the **Delete** button (trash icon)
3. Confirm the deletion

**Warning**: Deletion is permanent and cannot be undone.

## Founder Profile Structure

### Required Information
- **Name**: The founder's full name
- **Role**: Their position/title
- **Bio**: Brief description of their background and vision
- **Image**: Professional headshot or profile photo

### Social Links
- LinkedIn: Professional networking profile
- Twitter: Social media handle
- Email: Direct contact email

### Achievements
- List key accomplishments, qualifications, or milestones
- Examples:
  - "Founded Gen Elevate in 2024"
  - "15+ years in education technology"
  - "Former teacher at leading UK schools"
  - "Passionate about accessible education"

## Image Upload & Management

### Uploading Images
The admin panel now supports **direct image uploads** to Firebase Storage:

1. Click the **"Upload Image"** button
2. Select an image from your computer (JPG, PNG, GIF, WebP)
3. Wait for the upload to complete
4. The image URL will be automatically filled in

**Or** you can paste an image URL from an external source.

### Image Guidelines

#### Recommended Specifications
- **Format**: JPG, PNG, GIF, or WebP
- **Dimensions**: Minimum 800x800px (square or portrait recommended)
- **File Size**: Maximum 5MB (smaller files load faster)
- **Aspect Ratio**: Square (1:1) or portrait (3:4) works best
- **Style**: Professional headshot or casual professional photo
- **Background**: Clean, non-distracting background preferred

#### Upload vs URL
- **Upload (Recommended)**: Images are stored securely in Firebase Storage with automatic optimization
- **URL**: Use if you already have images hosted elsewhere (must be publicly accessible)

## Display Order

The **Display Order** field controls how founders appear on the homepage:
- 0 = First position
- 1 = Second position
- 2 = Third position, etc.

**Tip**: Leave gaps (e.g., 0, 10, 20) to easily insert new founders between existing ones later.

## Visibility Control

Use the **Active** checkbox to control whether a founder appears on the homepage:
- ✓ Checked = Visible on homepage
- ☐ Unchecked = Hidden (but profile data is saved)

This is useful for:
- Temporarily removing a founder without deleting their profile
- Preparing profiles before they go live
- Managing team changes

## Multiple Founders

The system supports multiple founders:
- Single founder: "Meet the Founder"
- Multiple founders: "Meet the Founders"
- Grid layout adapts automatically (1-2 columns)

## Best Practices

### Writing Bios
- Keep it concise (100-150 words)
- Focus on relevant experience
- Include passion/mission statement
- Write in third person
- Proofread for typos

### Professional Photos
- Use high-quality images
- Ensure consistent style across all founders
- Update photos periodically
- Consider professional photography

### Achievements
- List 3-5 key achievements
- Be specific and quantifiable when possible
- Include relevant credentials
- Update as the company grows

### Social Links
- Ensure all URLs are complete and working
- Keep profiles up-to-date
- Use professional LinkedIn profiles
- Test links after saving

## Technical Notes

### Data Storage
- Founder data is stored in Firestore under the `founders` collection
- Images should be hosted externally (URLs only, not uploaded files)
- Changes appear immediately on the homepage (no cache)

### Firestore Structure
```javascript
{
  name: string,
  role: string,
  bio: string,
  imageUrl: string,
  order: number,
  socialLinks: {
    linkedin?: string,
    twitter?: string,
    email?: string
  },
  achievements: string[],
  isActive: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Troubleshooting

### Founder not appearing on homepage
- Check that **Active** is enabled
- Verify all required fields are filled
- Refresh the homepage
- Clear browser cache

### Image not loading
- Verify the image URL is correct
- Check image is publicly accessible
- Ensure HTTPS URL (not HTTP)
- Try accessing the URL directly in browser

### Social links not working
- Include full URLs (https://...)
- Test each link before saving
- Ensure no extra spaces

## Support

For technical issues or questions, contact the development team or refer to the main documentation.

