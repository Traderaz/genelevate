import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.genelevate.co.uk';

interface PageMetadataProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = '/og-image.jpg',
  noIndex = false,
}: PageMetadataProps): Metadata {
  const url = `${baseUrl}${path}`;
  const fullTitle = `${title} | Gen Elevate`;

  return {
    title,
    description,
    keywords: [...keywords, 'Gen Elevate', 'AI tutoring', 'education platform'],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Gen Elevate',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} - Gen Elevate`,
        },
      ],
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@genelevate',
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

// Pre-defined metadata for common pages
export const coursesMetadata = generatePageMetadata({
  title: 'GCSE & A-Level Courses',
  description: 'Master every GCSE and A-Level subject with comprehensive online courses. Expert-led content, AI tutoring support, and exam-focused learning.',
  path: '/courses',
  keywords: ['GCSE courses', 'A-Level courses', 'online courses UK', 'exam preparation', 'GCSE online', 'A-Level online'],
});

export const webinarsMetadata = generatePageMetadata({
  title: 'Live Webinars',
  description: 'Join weekly live webinars with expert tutors. Interactive sessions, real-time Q&A, and collaborative learning for GCSE & A-Level students.',
  path: '/webinars',
  keywords: ['live webinars', 'online tutoring', 'live sessions', 'expert tutors', 'online learning'],
});

export const aiTutorMetadata = generatePageMetadata({
  title: '24/7 AI Tutor',
  description: 'Get instant help with your studies using our AI-powered tutor. Available 24/7 for any subject, step-by-step solutions, and personalized learning support.',
  path: '/ai-tutor',
  keywords: ['AI tutor', 'AI tutoring', 'homework help', '24/7 tutor', 'AI learning assistant', 'artificial intelligence tutor'],
});

export const careersMetadata = generatePageMetadata({
  title: 'Career Guidance & Explorer',
  description: 'Explore hundreds of career options with detailed insights. Get personalized career guidance, industry information, and pathway recommendations.',
  path: '/careers',
  keywords: ['career guidance', 'career explorer', 'career advice', 'career pathways', 'career options UK'],
});

export const lifeSkillsMetadata = generatePageMetadata({
  title: 'Life Skills Training',
  description: 'Develop essential life skills and personal development. Prepare for real-world challenges with our comprehensive life skills and career preparation program.',
  path: '/life-skills',
  keywords: ['life skills', 'personal development', 'career preparation', 'soft skills', 'professional skills'],
});

export const interviewLabMetadata = generatePageMetadata({
  title: 'Interview Lab',
  description: 'Practice interview skills with video submissions and expert feedback. Prepare for university admissions and job interviews with personalized coaching.',
  path: '/life-career/interview-lab',
  keywords: ['interview practice', 'interview preparation', 'mock interview', 'interview coaching', 'interview skills'],
});

export const pricingMetadata = generatePageMetadata({
  title: 'Pricing & Plans',
  description: 'Choose the perfect plan for your learning journey. Affordable pricing for GCSE & A-Level courses, webinars, AI tutoring, and career guidance.',
  path: '/pricing',
  keywords: ['pricing', 'subscription plans', 'education pricing', 'course pricing'],
});

export const loginMetadata = generatePageMetadata({
  title: 'Login',
  description: 'Login to your Gen Elevate account to access courses, webinars, AI tutoring, and career guidance.',
  path: '/login',
  noIndex: true, // Don't index auth pages
});

export const registerMetadata = generatePageMetadata({
  title: 'Sign Up',
  description: 'Create your Gen Elevate account and start your learning journey. Get access to GCSE & A-Level courses, AI tutoring, and career guidance.',
  path: '/register',
  noIndex: true, // Don't index auth pages
});

