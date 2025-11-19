# Meet the Experts Section - Implementation Guide

## Overview
A new "Meet the Experts" section has been added to the homepage, similar to the "Meet the Founders" section. This section features an image slider with descriptions of industry experts and subject matter specialists.

## What Was Created

### 1. Expert Type Definition
**File:** `apps/web/src/types/expert.ts`
- Defines the `Expert` interface with fields for name, role, bio, image, social links, and areas of expertise

### 2. Meet the Experts Component
**File:** `apps/web/src/components/sections/meet-the-experts.tsx`
- Interactive image slider component
- Auto-rotates every 6 seconds
- Navigation arrows and dots indicator
- Responsive design
- Displays expert name, role, bio, expertise areas, and social links
- Only shows when there are active experts (won't show empty section)

### 3. Admin Management Page
**File:** `apps/web/src/app/admin/experts/page.tsx`
- Full CRUD functionality for managing experts
- Image upload support (Firebase Storage)
- Social links (LinkedIn, Twitter, Email)
- Multiple areas of expertise
- Display order control
- Active/Inactive toggle
- Protected with admin role guard

### 4. Homepage Integration
**File:** `apps/web/src/app/page.tsx`
- Added `MeetTheExperts` component between pricing and testimonials sections
- Dynamically imported for better performance

### 5. Admin Dashboard Link
**File:** `apps/web/src/app/admin/page.tsx`
- Added "Experts Management" card to admin dashboard
- Easy access to manage expert profiles

## Features

### Expert Slider Features
- ✅ Smooth slide transitions
- ✅ Auto-rotation (6 seconds)
- ✅ Manual navigation (left/right arrows)
- ✅ Dots indicator for quick navigation
- ✅ Responsive layout (mobile-first)
- ✅ Glass-morphism card design matching brand style
- ✅ Social media links with hover effects
- ✅ Areas of expertise list

### Admin Features
- ✅ Add/Edit/Delete experts
- ✅ Image upload to Firebase Storage
- ✅ Alternative: Paste image URL
- ✅ Multiple expertise areas
- ✅ Social media links
- ✅ Display order control
- ✅ Active/Inactive toggle
- ✅ Real-time preview

## How to Use

### For Admins

1. **Access Admin Panel:**
   - Navigate to `/admin`
   - Click on "Experts Management"

2. **Add an Expert:**
   - Click "Add Expert" button
   - Fill in required fields:
     - Name (e.g., "Dr. Jane Smith")
     - Role (e.g., "Mathematics Expert & Oxford Graduate")
     - Bio (brief description)
     - Image (upload or paste URL)
   - Optional fields:
     - Social Links (LinkedIn, Twitter, Email)
     - Areas of Expertise (add multiple)
     - Display Order (controls slider order)
   - Click "Add Expert"

3. **Edit an Expert:**
   - Click the edit (pencil) icon on any expert card
   - Update fields as needed
   - Click "Update Expert"

4. **Delete an Expert:**
   - Click the delete (trash) icon
   - Confirm deletion

5. **Control Visibility:**
   - Use the "Active" checkbox to show/hide experts on homepage
   - Inactive experts remain in database but won't display

### Firebase Collections

The experts data is stored in a Firestore collection called `experts`:

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
  expertise: string[],
  isActive: boolean,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Images Storage

Expert images are stored in Firebase Storage under the path:
```
experts/{timestamp}_{sanitized_filename}
```

## Styling

The component uses the existing brand color scheme:
- **Primary Accent:** Teal-gold (`text-teal-gold`)
- **Card Background:** Glass-morphism with backdrop blur
- **Text:** White with opacity variations
- **Hover Effects:** Teal-gold highlights

## Position on Homepage

The "Meet the Experts" section appears in this order:
1. Hero Section
2. Meet the Founders
3. Features
4. Pricing
5. **→ Meet the Experts** ⭐ (NEW)
6. Testimonials
7. FAQ

## Notes

- The section automatically hides if no active experts exist
- Multiple experts create a slider; single expert displays centered
- All content is lazy-loaded for performance
- Fully responsive across all device sizes
- Admin access is role-protected (admin only)

## Future Enhancements (Optional)

Consider adding:
- Video introductions for experts
- Credentials/certifications display
- Expert availability calendar
- Direct messaging to experts
- Expert-led webinars linking

