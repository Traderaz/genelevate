# 🎨 Section 6: Visual Guide

## Page Layouts

### 1. Career Explorer Page (`/careers`)

```
┌─────────────────────────────────────────────────────────────────┐
│ 🏠 Gen Elevate    Courses  Webinars  Careers  Pricing    👤 🔔  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🎓 Career Insights                    🔴 Updated Daily  │  │
│  │  Explore Your Future Career                              │  │
│  │  Discover pathways, industry trends, and opportunities   │  │
│  │                                                           │  │
│  │  💼 500+ Career Paths  📍 Global  📈 Live Industry Data  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                       │
│  │ 500+ │  │  25  │  │ £28K │  │ 10K+ │                       │
│  │Paths │  │Sector│  │ Avg  │  │ Jobs │                       │
│  └──────┘  └──────┘  └──────┘  └──────┘                       │
│                                                                  │
│  ┌──────────────────────────────────┐  ┌──────────────────┐   │
│  │ Career Explorer                  │  │ Industry News    │   │
│  │                                  │  │                  │   │
│  │ 🔍 Search careers...             │  │ 📰 Latest News   │   │
│  │                                  │  │                  │   │
│  │ [Sector ▼] [Location ▼] [Edu ▼] │  │ [All] [Tech]     │   │
│  │                                  │  │ [Engineering]    │   │
│  │ ┌──────────────────────────────┐ │  │                  │   │
│  │ │ 💻 Software Engineer    🔥   │ │  │ ┌──────────────┐ │   │
│  │ │ Technology                   │ │  │ │ AI Revolution│ │   │
│  │ │ Design, develop software...  │ │  │ │ 2h ago  🔥   │ │   │
│  │ │ 💰 £30K-£80K  📈 +15%  🟢   │ │  │ │ Tech Insights│ │   │
│  │ │ [JavaScript] [Python]        │ │  │ └──────────────┘ │   │
│  │ └──────────────────────────────┘ │  │                  │   │
│  │                                  │  │ ┌──────────────┐ │   │
│  │ ┌──────────────────────────────┐ │  │ │ Green Energy │ │   │
│  │ │ 📊 Data Scientist       🔥   │ │  │ │ 5h ago  🔥   │ │   │
│  │ │ Technology                   │ │  │ │ Career News  │ │   │
│  │ │ Analyze complex data...      │ │  │ └──────────────┘ │   │
│  │ │ 💰 £35K-£90K  📈 +22%  🟢   │ │  │                  │   │
│  │ │ [Python] [ML] [SQL]          │ │  │ Auto-refresh:    │   │
│  │ └──────────────────────────────┘ │  │ 10:30 AM         │   │
│  │                                  │  └──────────────────┘   │
│  │ [More careers...]                │                         │
│  └──────────────────────────────────┘                         │
└─────────────────────────────────────────────────────────────────┘
```

### 2. Career Detail Page (`/careers/[id]`)

```
┌─────────────────────────────────────────────────────────────────┐
│ ← Back to Careers                                                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  💻 Software Engineer                          🔥 Trending│  │
│  │  Technology                                               │  │
│  │  Design, develop, and maintain software applications...  │  │
│  │                                                           │  │
│  │  💰 £30K-£80K   📈 +15%   🎓 Bachelor's   🎯 HIGH DEMAND │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────┐  ┌──────────────────────┐  │
│  │ 💼 Key Responsibilities        │  │ Skills Required      │  │
│  │                                │  │                      │  │
│  │ ✓ Design software apps         │  │ [JavaScript]         │  │
│  │ ✓ Write clean code             │  │ [Python]             │  │
│  │ ✓ Collaborate with teams       │  │ [Problem Solving]    │  │
│  │ ✓ Debug technical issues       │  │ [Git]                │  │
│  │ ✓ Code reviews                 │  │ [Agile]              │  │
│  │ ✓ Stay updated with tech       │  │                      │  │
│  │ ✓ Document specifications      │  │ Industry Insights    │  │
│  │                                │  │                      │  │
│  │ 📚 Requirements                │  │ 15,000+              │  │
│  │                                │  │ Job Openings         │  │
│  │ ✓ Bachelor's in CS             │  │                      │  │
│  │ ✓ Strong programming skills    │  │ £52,000              │  │
│  │ ✓ Data structures knowledge    │  │ Average Salary       │  │
│  │ ✓ Version control (Git)        │  │                      │  │
│  │ ✓ Web technologies             │  │ Top Employers:       │  │
│  │ ✓ Problem-solving mindset      │  │ Google, Amazon       │  │
│  │ ✓ Communication skills         │  │ Microsoft, Meta      │  │
│  │                                │  │                      │  │
│  │ 📈 Career Progression          │  │ Related Courses      │  │
│  │                                │  │                      │  │
│  │ ● Junior Engineer              │  │ ► Intro to           │  │
│  │ │ 0-2 years | £25K-£35K        │  │   Programming        │  │
│  │ ●                              │  │                      │  │
│  │ │ Software Engineer            │  │ ► Web Development    │  │
│  │ ● 2-5 years | £35K-£55K        │  │   Fundamentals       │  │
│  │ │                              │  │                      │  │
│  │ ● Senior Engineer              │  │ ► Data Structures    │  │
│  │ │ 5-8 years | £55K-£80K        │  │   & Algorithms       │  │
│  │ ●                              │  │                      │  │
│  │ │ Lead Engineer                │  └──────────────────────┘  │
│  │ ● 8-12 years | £80K-£110K      │                            │
│  │ │                              │                            │
│  │ ● Engineering Manager          │                            │
│  │   12+ years | £100K-£150K+     │                            │
│  └────────────────────────────────┘                            │
└─────────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### Career Explorer Components

```
CareerExplorer
├── Search Bar (🔍 with real-time filtering)
├── Filter Dropdowns
│   ├── Sector Filter (Technology, Engineering, etc.)
│   ├── Location Filter (London, Manchester, etc.)
│   └── Education Filter (Bachelor's, Master's, etc.)
└── Career Cards Grid
    └── CareerCard (for each career)
        ├── Header (Title + Trending Badge)
        ├── Sector Tag
        ├── Description
        ├── Stats Row (Salary, Growth, Location, Demand)
        └── Skills Tags
```

### Industry News Feed Components

```
IndustryNewsFeed
├── Header (📰 + Live Indicator)
├── Category Pills (All, Technology, Engineering, etc.)
└── News Articles List
    └── NewsArticle (for each article)
        ├── Metadata (Source, Time, Trending)
        ├── Title
        ├── Excerpt
        └── Footer (Category Tag, Bookmark, Read More)
```

### Career Detail Components

```
CareerDetail
├── Back Button
├── Hero Banner
│   ├── Title + Trending Badge
│   ├── Sector
│   ├── Overview
│   └── Quick Stats (Salary, Growth, Education, Demand)
├── Main Content (2-column layout)
│   ├── Left Column
│   │   ├── Key Responsibilities
│   │   ├── Requirements
│   │   └── Career Progression Timeline
│   └── Right Column (Sidebar)
│       ├── Skills Required
│       ├── Industry Insights
│       └── Related Courses
```

## Color Coding

### Demand Levels
- 🟢 **HIGH DEMAND**: Green (`text-green-500 bg-green-500/10`)
- 🟡 **MEDIUM DEMAND**: Yellow (`text-yellow-500 bg-yellow-500/10`)
- 🔴 **LOW DEMAND**: Red (`text-red-500 bg-red-500/10`)

### Status Indicators
- 🔥 **Trending**: Primary red (`text-primary`)
- 🔴 **Live**: Green with pulse (`text-green-400 animate-pulse`)
- ✓ **Completed**: Green checkmark (`text-green-500`)

### Category Colors
- 💻 **Technology**: Blue (`bg-blue-500/10 text-blue-500`)
- ⚙️ **Engineering**: Purple (`bg-purple-500/10 text-purple-500`)
- 🏥 **Healthcare**: Green (`bg-green-500/10 text-green-500`)
- 💰 **Finance**: Yellow (`bg-yellow-500/10 text-yellow-500`)
- 📢 **Marketing**: Pink (`bg-pink-500/10 text-pink-500`)
- 🎨 **Design**: Orange (`bg-orange-500/10 text-orange-500`)

## Interactive Elements

### Hover Effects
```css
/* Career Cards */
.career-card:hover {
  transform: scale(1.02);
  border-color: var(--primary);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.9);
}

/* News Articles */
.news-article:hover {
  border-color: var(--primary);
}

/* Buttons */
.netflix-button:hover {
  transform: scale(1.05);
}
```

### Loading States
```
┌──────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  (Shimmer animation)
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
└──────────────────────────────┘
```

### Empty States
```
┌──────────────────────────────┐
│                              │
│         💼                   │
│                              │
│   No careers found           │
│                              │
│   Try adjusting your         │
│   filters or search query    │
│                              │
└──────────────────────────────┘
```

## Responsive Breakpoints

### Desktop (lg: 1024px+)
- 2-column layout (Career Explorer + News Feed)
- Sidebar visible
- Full navigation

### Tablet (md: 768px+)
- Stacked layout
- Collapsible filters
- Hamburger menu

### Mobile (sm: 640px-)
- Single column
- Full-width cards
- Bottom navigation
- Simplified filters

## Animation Timings

```typescript
// Fade in
animation: fade-in 0.5s ease-out

// Scale in
animation: scale-in 0.2s ease-out

// Slide in
animation: slide-in-from-top 0.3s ease-out

// Hover scale
transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

## Typography

### Headings
- **H1**: `text-3xl lg:text-4xl font-bold` (Career titles)
- **H2**: `text-2xl font-bold` (Section titles)
- **H3**: `text-xl font-bold` (Subsection titles)

### Body Text
- **Primary**: `text-foreground` (Main content)
- **Secondary**: `text-muted-foreground` (Descriptions)
- **Small**: `text-sm text-muted-foreground` (Metadata)

### Special Text
- **Gradient**: `netflix-text-gradient` (Hero titles)
- **Primary**: `text-primary` (Links, CTAs)
- **Monospace**: `font-mono` (Code snippets)

## Icons Used

### Career Explorer
- 💼 `Briefcase` - Career/Job
- 📈 `TrendingUp` - Growth/Trending
- 💰 `DollarSign` - Salary
- 📍 `MapPin` - Location
- 🎓 `GraduationCap` - Education
- 🔍 `Search` - Search
- 🎯 `Target` - Demand
- ⏱️ `Clock` - Time/Duration

### Industry News
- 📰 `Newspaper` - News
- 🔗 `ExternalLink` - External link
- 🔖 `Bookmark` - Save article
- ⏰ `Clock` - Publish time

### Career Detail
- ✓ `CheckCircle` - Completed/Required
- ← `ArrowLeft` - Back button
- 👥 `Users` - Team/Collaboration
- 📚 `BookOpen` - Learning/Courses

## Data Visualization

### Career Progression Timeline
```
Entry Level ●────────────────────
            │ Junior Engineer
            │ 0-2 years | £25K-£35K
            │
Mid Level   ●────────────────────
            │ Software Engineer
            │ 2-5 years | £35K-£55K
            │
Senior      ●────────────────────
            │ Senior Engineer
            │ 5-8 years | £55K-£80K
            │
Lead        ●────────────────────
            │ Lead Engineer
            │ 8-12 years | £80K-£110K
            │
Management  ●────────────────────
              Engineering Manager
              12+ years | £100K-£150K+
```

### Stats Cards
```
┌──────────────┐
│   💼         │
│              │
│   500+       │  ← Large number
│   Career     │  ← Label
│   Paths      │
│              │
│   +50 this   │  ← Change indicator
│   month      │
└──────────────┘
```

## Accessibility Features

- ✅ Semantic HTML (`<header>`, `<main>`, `<article>`, etc.)
- ✅ ARIA labels for icons
- ✅ Keyboard navigation support
- ✅ Focus states for interactive elements
- ✅ Alt text for images (when added)
- ✅ Color contrast ratios (WCAG AA compliant)
- ✅ Screen reader friendly

## Performance Optimizations

- ✅ Lazy loading for images
- ✅ Code splitting by route
- ✅ Debounced search input
- ✅ Memoized filter results
- ✅ Optimistic UI updates
- ✅ Skeleton loading states
- ✅ Firestore query optimization

---

**This visual guide shows the complete UI/UX implementation of Section 6!** 🎨

