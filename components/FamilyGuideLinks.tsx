import Link from 'next/link';
import Image from 'next/image';
import { familyGuides } from '@/lib/family-guides';

export function FamilyGuideLinks({ headingLevel: Heading = 'h2' }: { headingLevel?: 'h2' | 'h3' }) {
  return (
    <nav aria-label="Guías por situación" className="grid gap-4 md:grid-cols-3">
      {familyGuides.map((guide) => (
        <Link key={guide.slug} href={`/guias/${guide.slug}`} className="group min-w-0 border-b border-primary/20 pb-5 transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl bg-primary-50">
            <Image src={guide.image} alt={guide.imageAlt} fill sizes="(min-width: 1280px) 370px, (min-width: 768px) 33vw, 100vw" className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.03]" />
          </div>
          <Heading className="font-display text-xl font-bold text-ink">{guide.title}</Heading>
          <p className="mt-3 text-muted">{guide.question}</p>
          <span className="mt-5 inline-block font-semibold text-primary group-hover:underline">Ver la guía →</span>
        </Link>
      ))}
    </nav>
  );
}
