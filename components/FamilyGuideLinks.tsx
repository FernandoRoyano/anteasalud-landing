import Link from 'next/link';
import { familyGuides } from '@/lib/family-guides';

export function FamilyGuideLinks({ headingLevel: Heading = 'h2' }: { headingLevel?: 'h2' | 'h3' }) {
  return (
    <nav aria-label="Guías por situación" className="grid gap-4 md:grid-cols-3">
      {familyGuides.map((guide) => (
        <Link key={guide.slug} href={`/guias/${guide.slug}`} className="group border-y border-primary/20 py-5 transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <Heading className="font-display text-xl font-bold text-ink">{guide.title}</Heading>
          <p className="mt-3 text-muted">{guide.question}</p>
          <span className="mt-5 inline-block font-semibold text-primary group-hover:underline">Ver la guía →</span>
        </Link>
      ))}
    </nav>
  );
}
