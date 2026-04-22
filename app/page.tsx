"use client";

import Coverage from '@/components/Coverage';
import Hero from '../components/Hero';
import CTAFinal from '@/components/CTAFinal';
import FAQs from '@/components/FAQs';
import Problem from '@/components/Problem';
import Process from '@/components/Process';
import Services from '@/components/Services';
import Solution from '@/components/Solution';
import Testimonial from '@/components/Testimonial';
import TrustBadges from '@/components/TrustBadges';
import Contacto from '@/components/Contacto';
import Pricing from '@/components/Pricing';

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBadges />
      <Problem />
      <Solution />
      <Services />
      <Process />
      <Pricing/>
      <Testimonial />
      <Coverage />
      <FAQs />
      <Contacto />
      <CTAFinal />
    </main>
  );
}
