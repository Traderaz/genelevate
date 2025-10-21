import dynamic from 'next/dynamic';
import { NetflixHero } from '@/components/sections/netflix-hero';
import { NetflixHeader } from '@/components/layout/netflix-header';
import { NetflixFooter } from '@/components/layout/netflix-footer';

// Dynamically import below-the-fold components
const NetflixFeatures = dynamic(() => import('@/components/sections/netflix-features').then(mod => ({ default: mod.NetflixFeatures })));
const NetflixPricing = dynamic(() => import('@/components/sections/netflix-pricing').then(mod => ({ default: mod.NetflixPricing })));
const NetflixTestimonials = dynamic(() => import('@/components/sections/netflix-testimonials').then(mod => ({ default: mod.NetflixTestimonials })));
const NetflixFAQ = dynamic(() => import('@/components/sections/netflix-faq').then(mod => ({ default: mod.NetflixFAQ })));
const NetflixCTA = dynamic(() => import('@/components/sections/netflix-cta').then(mod => ({ default: mod.NetflixCTA })));

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <NetflixHeader />
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
