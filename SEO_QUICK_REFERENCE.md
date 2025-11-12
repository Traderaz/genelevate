# SEO Quick Reference Guide

## 🚀 How to Add SEO to New Pages

### Method 1: Using Pre-defined Metadata (Recommended)

For common pages, import from the metadata library:

```typescript
// Example: apps/web/src/app/courses/page.tsx
import { coursesMetadata } from '@/lib/seo/metadata';

export const metadata = coursesMetadata;

export default function CoursesPage() {
  return (
    // Your page content
  );
}
```

### Method 2: Custom Metadata

For unique pages:

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Page Title',
  description: 'Your page description (150-160 chars)',
  keywords: ['keyword1', 'keyword2', 'Gen Elevate'],
  alternates: {
    canonical: 'https://www.genelevate.co.uk/your-path',
  },
  openGraph: {
    title: 'Your Page Title | Gen Elevate',
    description: 'Your page description',
    url: 'https://www.genelevate.co.uk/your-path',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Page Title | Gen Elevate',
    description: 'Your page description',
  },
};
```

### Method 3: Using the Helper Function

```typescript
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata = generatePageMetadata({
  title: 'Your Page Title',
  description: 'Your page description',
  path: '/your-path',
  keywords: ['keyword1', 'keyword2'],
});
```

---

## 📝 SEO Best Practices Checklist

### Titles:
- ✅ Keep under 60 characters
- ✅ Include primary keyword
- ✅ Make it compelling and clickable
- ✅ Use format: "Primary Keyword | Gen Elevate"

### Descriptions:
- ✅ Keep between 150-160 characters
- ✅ Include target keywords naturally
- ✅ Include a call-to-action
- ✅ Make it unique for each page

### Keywords:
- ✅ 5-10 relevant keywords per page
- ✅ Include "Gen Elevate" on every page
- ✅ Focus on user intent
- ✅ Don't keyword stuff

### Images:
- ✅ Always add alt text: `<img src="..." alt="descriptive text with keywords" />`
- ✅ Use Next.js Image component
- ✅ Optimize file size (use WebP)
- ✅ Use descriptive file names

### Internal Linking:
- ✅ Link to related content
- ✅ Use descriptive anchor text
- ✅ Avoid "click here" links
- ✅ Add breadcrumbs for deep pages

---

## 🎯 Target Keywords by Page Type

### Homepage:
- Gen Elevate
- AI tutoring platform
- education platform UK
- student mentoring
- online learning platform

### Courses:
- GCSE courses online
- A-Level courses UK
- [Subject] GCSE course
- online exam preparation

### Webinars:
- live educational webinars
- online tutoring sessions
- expert-led webinars

### AI Tutor:
- AI tutoring
- AI homework help
- 24/7 online tutor
- artificial intelligence tutor

### Careers:
- career guidance students
- career explorer UK
- career pathways
- job exploration

### Life Skills:
- life skills training
- student life skills
- career preparation
- soft skills development

---

## 🔗 Adding Structured Data to Pages

### For Course Pages:

```typescript
import { CourseSchema } from '@/components/seo/structured-data';

export default function CoursePage() {
  return (
    <>
      <CourseSchema />
      {/* Your page content */}
    </>
  );
}
```

### For Breadcrumbs:

```typescript
import { BreadcrumbSchema } from '@/components/seo/structured-data';

const breadcrumbItems = [
  { name: 'Home', url: 'https://www.genelevate.co.uk' },
  { name: 'Courses', url: 'https://www.genelevate.co.uk/courses' },
  { name: 'GCSE Maths', url: 'https://www.genelevate.co.uk/courses/gcse-maths' },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      {/* Your page content */}
    </>
  );
}
```

---

## 🖼️ Image Alt Text Examples

### Good Alt Text:
```tsx
<Image 
  src="/student-studying.jpg" 
  alt="UK student studying GCSE maths with Gen Elevate AI tutor"
  width={800}
  height={600}
/>
```

### Bad Alt Text:
```tsx
<Image src="/img1.jpg" alt="image" /> // ❌
<Image src="/photo.jpg" alt="" /> // ❌
```

---

## 🔍 Common SEO Mistakes to Avoid

1. ❌ Duplicate meta descriptions across pages
2. ❌ Missing alt text on images
3. ❌ Broken internal links
4. ❌ Missing canonical URLs
5. ❌ Keyword stuffing
6. ❌ Thin content (under 300 words)
7. ❌ Slow page load times
8. ❌ Not mobile-optimized
9. ❌ Missing structured data
10. ❌ Forgetting to update sitemap

---

## 📊 SEO Testing Tools

Before pushing to production:

1. **Structured Data**: https://search.google.com/test/rich-results
2. **Meta Tags**: https://www.opengraph.xyz/
3. **Mobile-Friendly**: https://search.google.com/test/mobile-friendly
4. **Page Speed**: https://pagespeed.web.dev/
5. **Lighthouse**: Built into Chrome DevTools

---

## 🚨 Emergency SEO Fixes

If a page isn't ranking:

1. Check if it's in sitemap
2. Verify robots.txt isn't blocking it
3. Check for duplicate content
4. Ensure meta tags are unique
5. Check Core Web Vitals
6. Verify internal linking
7. Add more quality content (aim for 500+ words)
8. Add relevant images with alt text
9. Check mobile responsiveness
10. Submit to Google Search Console

---

## 📈 Monitoring SEO Performance

### Weekly Check:
```bash
# Check these in Google Search Console:
- Impressions trend
- Click-through rate (CTR)
- Average position
- Coverage errors
```

### Monthly Review:
- Keyword rankings
- Organic traffic growth
- Top performing pages
- Bounce rate by page
- Conversion rate

---

## 💡 Pro Tips

1. **Content is King**: Write for humans first, search engines second
2. **Speed Matters**: Keep pages under 3 seconds load time
3. **Mobile First**: 70%+ of traffic is mobile
4. **Update Regularly**: Fresh content ranks better
5. **Link Building**: Get quality backlinks from education sites
6. **User Intent**: Match content to what users are searching for
7. **Long-tail Keywords**: Target specific phrases like "GCSE maths tutor online UK"
8. **Local SEO**: If serving specific regions, optimize for location
9. **Schema Markup**: Always add structured data
10. **Analytics**: Make data-driven decisions

---

## 🎓 SEO Resources

- [Ahrefs SEO Toolkit](https://ahrefs.com/)
- [SEMrush](https://www.semrush.com/)
- [Google Search Central](https://developers.google.com/search)
- [Moz SEO Learning Center](https://moz.com/learn/seo)
- [Next.js SEO Docs](https://nextjs.org/learn/seo/introduction-to-seo)

---

Need help? Check the main `SEO_IMPLEMENTATION_GUIDE.md` for detailed instructions.

