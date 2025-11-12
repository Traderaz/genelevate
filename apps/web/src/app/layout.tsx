import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import { OrganizationSchema, WebsiteSchema } from '@/components/seo/structured-data';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Gen Elevate | AI-Powered Education & Career Platform for UK Students',
    template: '%s | Gen Elevate'
  },
  description: 'Master GCSE & A-Level subjects with AI tutoring, expert webinars, and career guidance. 24/7 learning support, interview prep, and personalized mentoring for UK students.',
  keywords: [
    'Gen Elevate',
    'AI tutoring platform',
    'education platform',
    'student mentoring',
    'AI learning for students',
    'career prep for students',
    'GCSE courses',
    'A-Level courses',
    'online education UK',
    'AI tutor',
    'career guidance',
    'interview practice',
    'life skills training',
    'exam preparation',
    'student support UK'
  ],
  authors: [{ name: 'Gen Elevate Team' }],
  creator: 'Gen Elevate',
  publisher: 'Gen Elevate',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: '/',
    siteName: 'Gen Elevate',
    title: 'Gen Elevate | AI-Powered Education & Career Platform for UK Students',
    description: 'Master GCSE & A-Level subjects with AI tutoring, live webinars, career guidance, and interview practice. Join thousands of students achieving top grades.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gen Elevate - AI Education & Career Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gen Elevate | AI-Powered Education & Career Platform',
    description: 'Master GCSE & A-Level subjects with AI tutoring, expert webinars, and career guidance. 24/7 learning support for UK students.',
    images: ['/og-image.jpg'],
    creator: '@genelevate',
    site: '@genelevate',
  },
  robots: {
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
  verification: {
    google: 'YRwn0_4nKIkdWzOMhE_FrgCYHVXHnLi4WeC3kE5jSfI',
  },
};

// NOTE: To add Google Analytics 4:
// 1. Get your GA4 Measurement ID from https://analytics.google.com
// 2. Add these scripts in the <head> section below:
/*
  <Script
    src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
    strategy="afterInteractive"
  />
  <Script id="google-analytics" strategy="afterInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `}
  </Script>
*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Gen Elevate" />
        <meta name="theme-color" content="#e50914" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f0f0f" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={`${inter.className} tap-highlight-transparent text-size-adjust-none`}>
        <OrganizationSchema />
        <WebsiteSchema />
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
