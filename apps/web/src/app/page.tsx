import dynamic from 'next/dynamic';
import { NetflixHero } from '@/components/sections/netflix-hero';
import { SimpleHomeHeader } from '@/components/layout/simple-home-header';
import { NetflixFooter } from '@/components/layout/netflix-footer';
import { ProductSchema } from '@/components/seo/structured-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Master GCSE & A-Level subjects with Gen Elevate\'s AI tutoring, expert webinars, and career guidance. 24/7 learning support, interview prep, and personalized mentoring.',
  alternates: {
    canonical: 'https://www.genelevate.co.uk',
  },
};

// Dynamically import below-the-fold components
const NetflixFeatures = dynamic(() => import('@/components/sections/netflix-features').then(mod => ({ default: mod.NetflixFeatures })));
const NetflixPricing = dynamic(() => import('@/components/sections/netflix-pricing').then(mod => ({ default: mod.NetflixPricing })));
const NetflixTestimonials = dynamic(() => import('@/components/sections/netflix-testimonials').then(mod => ({ default: mod.NetflixTestimonials })));
const NetflixFAQ = dynamic(() => import('@/components/sections/netflix-faq').then(mod => ({ default: mod.NetflixFAQ })));
const NetflixCTA = dynamic(() => import('@/components/sections/netflix-cta').then(mod => ({ default: mod.NetflixCTA })));

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <ProductSchema />
      <SimpleHomeHeader />
      <main className="relative">
        <NetflixHero />
        <NetflixFeatures />
        <NetflixPricing />
        <NetflixTestimonials />
        <NetflixFAQ />
        <NetflixCTA />
      </main>
      <NetflixFooter />
    </div>
  );
}
