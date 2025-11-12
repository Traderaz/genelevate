import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: '%s | Gen Elevate',
  defaultTitle: 'Gen Elevate | AI-Powered Education & Career Platform',
  description: 'Master GCSE & A-Level subjects with AI tutoring, expert webinars, and career guidance. 24/7 learning support, interview prep, and personalized mentoring for UK students.',
  canonical: 'https://www.genelevate.co.uk',
  
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.genelevate.co.uk',
    siteName: 'Gen Elevate',
    title: 'Gen Elevate | AI-Powered Education & Career Platform for UK Students',
    description: 'Master GCSE & A-Level subjects with AI tutoring, live webinars, career guidance, and interview practice. Join thousands of students achieving top grades.',
    images: [
      {
        url: 'https://www.genelevate.co.uk/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gen Elevate - AI Education Platform',
        type: 'image/jpeg',
      },
    ],
  },
  
  twitter: {
    handle: '@genelevate',
    site: '@genelevate',
    cardType: 'summary_large_image',
  },
  
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5',
    },
    {
      name: 'keywords',
      content: 'GCSE courses, A-Level courses, AI tutor, student mentoring, career guidance, online education, exam preparation, UK students, interview practice, life skills',
    },
    {
      name: 'author',
      content: 'Gen Elevate',
    },
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    {
      name: 'googlebot',
      content: 'index, follow',
    },
    {
      name: 'theme-color',
      content: '#E50914',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
  ],
  
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
};

export default config;

