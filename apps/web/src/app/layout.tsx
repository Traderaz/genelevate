import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Gen Elevate - The Academic Gym for Future-Ready Students',
    template: '%s | Gen Elevate'
  },
  description: 'The academic gym that gets you uni- and work-ready. Courses, live webinars, and guided challenges from Year 6 to A-Level. Built with schools for results.',
  keywords: [
    'education',
    'learning platform',
    'academic support',
    'GCSE',
    'A-Level',
    'university preparation',
    'career development',
    'student development',
    'online learning',
    'UK education'
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
    title: 'Gen Elevate - The Academic Gym for Future-Ready Students',
    description: 'The academic gym that gets you uni- and work-ready. Courses, live webinars, and guided challenges from Year 6 to A-Level.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gen Elevate - Academic Learning Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gen Elevate - The Academic Gym for Future-Ready Students',
    description: 'The academic gym that gets you uni- and work-ready. Courses, live webinars, and guided challenges from Year 6 to A-Level.',
    images: ['/og-image.jpg'],
    creator: '@genelevate',
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
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
