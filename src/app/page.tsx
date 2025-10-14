import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Ages } from '@/components/sections/ages';
import { Features } from '@/components/sections/features';
import { AI } from '@/components/sections/ai';
import { Debate } from '@/components/sections/debate';
import { DNA } from '@/components/sections/dna';
import { Roadmap } from '@/components/sections/roadmap';
import { SocialProof } from '@/components/sections/social-proof';
import { FAQ } from '@/components/sections/faq';
import { CTA } from '@/components/sections/cta';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Ages />
        <Features />
        <AI />
        <Debate />
        <DNA />
        <Roadmap />
        <SocialProof />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
