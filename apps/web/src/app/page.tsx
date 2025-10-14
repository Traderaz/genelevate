import { NetflixHero } from '@/components/sections/netflix-hero';
import { NetflixFeatures } from '@/components/sections/netflix-features';
import { NetflixPricing } from '@/components/sections/netflix-pricing';
import { NetflixTestimonials } from '@/components/sections/netflix-testimonials';
import { NetflixFAQ } from '@/components/sections/netflix-faq';
import { NetflixCTA } from '@/components/sections/netflix-cta';
import { NetflixHeader } from '@/components/layout/netflix-header';
import { NetflixFooter } from '@/components/layout/netflix-footer';

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
