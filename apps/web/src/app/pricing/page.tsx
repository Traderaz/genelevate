import { NetflixPricing } from '@/components/sections/netflix-pricing';
import { NetflixHeader } from '@/components/layout/netflix-header';
import { NetflixFooter } from '@/components/layout/netflix-footer';

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <NetflixHeader />
      <main className="pt-16">
        <NetflixPricing />
      </main>
      <NetflixFooter />
    </div>
  );
}
