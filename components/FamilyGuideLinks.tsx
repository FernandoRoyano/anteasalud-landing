import Link from 'next/link';
import { familyGuides } from '@/lib/family-guides';

export function FamilyGuideLinks() {
  return (
    <nav aria-label="Guías por situación" className="grid gap-4 md:grid-cols-3">
      {familyGuides.map((guide, index) => (
        <Link key={guide.slug} href={`/guias/${guide.slug}`} className="group rounded-2xl border border-primary/20 bg-primary-50 p-6 transition-colors hover:bg-primary-light">
          <span className="text-sm font-semibold text-primary">0{index + 1} · Guía para familias</span>
          <h2 className="mt-3 font-display text-2xl font-bold text-ink">{guide.title}</h2>
          <p className="mt-3 text-muted">{guide.question}</p>
          <span className="mt-5 inline-block font-semibold text-primary group-hover:underline">Ver la guía →</span>
        </Link>
      ))}
    </nav>
  );
}
