import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { getPublishedArticles } from '@/lib/sheets';
import { DEFAULT_OG_IMAGE, isLocalImagePath } from '@/lib/seo';

const PRICE_SESSION = 55;
const PRICE_PLAN = 90;

export function LandingPricing({ place, surcharge }: { place: string; surcharge: number }) {
  const rows = [
    ['Sesión suelta (30 min)', surcharge ? `${PRICE_SESSION + surcharge} €` : `${PRICE_SESSION} €`],
    ['Plan 2 días/semana', surcharge ? `${PRICE_PLAN + surcharge * 2} € / semana` : `${PRICE_PLAN} € / semana`],
  ];

  return (
    <section className="w-full bg-[#f3f8f4] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-center font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-.03em] text-[#17372b]">
          Precios en {place}
        </h2>
        <div className="rounded-3xl border border-[#2d6a4f]/15 bg-white p-8 shadow-sm">
          <dl className="space-y-3 text-lg">
            {rows.map(([label, price]) => (
              <div key={label} className="flex items-center justify-between gap-4 border-b border-[#2d6a4f]/10 p-3">
                <dt className="text-[#3b5a4e]">{label}</dt>
                <dd className="font-display text-2xl font-bold text-[#2d6a4f]">{price}</dd>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 rounded-xl bg-[#e3f1e8] p-3">
              <dt className="font-semibold text-[#17372b]">Primera valoración en casa</dt>
              <dd className="font-display text-2xl font-bold text-[#2d6a4f]">Gratis</dd>
            </div>
          </dl>
          <p className="mt-5 text-center text-base text-[#4a6358]">
            {surcharge
              ? `Fuera de Madrid capital se suman ${surcharge} € por sesión para cubrir el desplazamiento. Ya están incluidos arriba.`
              : 'En Madrid capital no hay recargo por desplazamiento.'}{' '}
            Sin permanencia: puedes pausar cuando lo necesites.
          </p>
        </div>
      </div>
    </section>
  );
}

export interface LandingFaqItem {
  question: string;
  answer: string;
}

export function LandingFaq({ title = 'Preguntas frecuentes', faqs }: { title?: string; faqs: LandingFaqItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <section className="w-full bg-white px-5 py-20 sm:px-8">
      <JsonLd data={schema} />
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-.03em] text-[#17372b]">{title}</h2>
        <div className="divide-y divide-[#2d6a4f]/15 border-y border-[#2d6a4f]/15">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-[#17372b] [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2d6a4f]/30 text-xl font-normal transition group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="pt-3 text-lg leading-relaxed text-[#4a6358]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Artículos relacionados por tema: conecta las landings de servicio con el contenido (clúster temático) */
export async function LandingArticles({
  title = 'Guías para familias',
  topics,
  limit = 3,
}: {
  title?: string;
  topics: RegExp;
  limit?: number;
}) {
  let articles: Awaited<ReturnType<typeof getPublishedArticles>> = [];
  try {
    const all = await getPublishedArticles();
    const matching = all.filter((a) => topics.test(`${a.tags.join(' ')} ${a.title}`));
    articles = (matching.length >= limit ? matching : [...matching, ...all.filter((a) => !matching.includes(a))]).slice(0, limit);
  } catch (error) {
    console.error('[LandingArticles] No se pudieron cargar los artículos:', error);
    return null;
  }
  if (!articles.length) return null;

  return (
    <section className="w-full bg-[#fbfcf8] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-.03em] text-[#17372b]">{title}</h2>
          <Link href="/articulos" className="inline-flex min-h-11 items-center gap-1.5 text-lg font-semibold text-[#2d6a4f]">
            Ver todos los artículos <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <li key={article.id}>
              <Link
                href={`/articulos/${article.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#2d6a4f]/15 bg-white transition hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] bg-[#eef5f0]">
                  <Image
                    src={isLocalImagePath(article.ogImage) ? article.ogImage : DEFAULT_OG_IMAGE}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <span className="flex flex-1 flex-col p-5">
                  <span className="font-display text-xl font-bold leading-snug text-[#17372b] group-hover:text-[#2d6a4f]">
                    {article.title}
                  </span>
                  <span className="mt-2 line-clamp-3 text-base text-[#4a6358]">{article.excerpt}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function LandingChecklist({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="w-full bg-white px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-.03em] text-[#17372b]">{title}</h2>
        <ul className="space-y-3">
          {items.map((text) => (
            <li key={text} className="flex items-start gap-3 rounded-xl bg-[#f3f8f4] p-4 text-lg text-[#1f2933]">
              <Check className="mt-1 h-5 w-5 shrink-0 text-[#2d6a4f]" aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
