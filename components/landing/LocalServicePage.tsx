import { MapPin, Route } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { JsonLd } from '@/components/JsonLd';
import LandingHero from '@/components/landing/LandingHero';
import LandingCTA from '@/components/landing/LandingCTA';
import {
  LandingArticles,
  LandingChecklist,
  LandingFaq,
  LandingPricing,
  type LandingFaqItem,
} from '@/components/landing/LandingSections';
import { SITE_URL, buildServiceSchema } from '@/lib/seo';

export interface LocalServiceConfig {
  place: string;
  path: string;
  badge: string;
  heroSubtitle: string;
  description: string;
  surcharge: number;
  intro: { title: string; paragraphs: string[] };
  neighborhoods: { title: string; note: string; items: string[] };
  walking: { title: string; intro: string; routes: Array<{ name: string; tip: string }> };
  cases: string[];
  faqs: LandingFaqItem[];
  cta: { title: string; subtitle: string };
  related: Array<{ href: string; label: string }>;
}

/** Plantilla de landing local: estructura común, contenido específico de cada zona */
export default function LocalServicePage({ config }: { config: LocalServiceConfig }) {
  const url = `${SITE_URL}${config.path}`;

  return (
    <>
      <JsonLd
        data={buildServiceSchema({
          name: `Ejercicio para personas mayores a domicilio en ${config.place}`,
          description: config.description,
          path: config.path,
          areaServed: config.place === 'Madrid capital' ? 'Madrid' : config.place,
        })}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Inicio', url: SITE_URL },
          { name: `Ejercicio para mayores en ${config.place}`, url },
        ]}
      />

      <LandingHero
        badge={config.badge}
        h1="Ejercicio para personas mayores a domicilio"
        h1Highlight={`en ${config.place}`}
        subtitle={config.heroSubtitle}
        origen={`Landing · ${config.place}`}
      />

      <section className="w-full bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-.03em] text-[#17372b]">
            {config.intro.title}
          </h2>
          {config.intro.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-[#3b5a4e]">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="w-full bg-[#f3f8f4] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-center font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-.03em] text-[#17372b]">
            {config.neighborhoods.title}
          </h2>
          <p className="mb-10 text-center text-lg text-[#4a6358]">{config.neighborhoods.note}</p>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {config.neighborhoods.items.map((item) => (
              <li key={item} className="flex items-center gap-2 rounded-xl border border-[#2d6a4f]/15 bg-white px-4 py-3">
                <MapPin className="h-5 w-5 shrink-0 text-[#2d6a4f]" aria-hidden="true" />
                <span className="text-lg font-semibold text-[#1f2933]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="w-full bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-.03em] text-[#17372b]">
            {config.walking.title}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-[#3b5a4e]">{config.walking.intro}</p>
          <ol className="space-y-4">
            {config.walking.routes.map((route, index) => (
              <li key={route.name} className="flex gap-4 rounded-2xl border border-[#2d6a4f]/15 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2d6a4f] font-bold text-white" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h3 className="flex items-center gap-2 font-display text-xl font-bold text-[#17372b]">
                    <Route className="h-5 w-5 text-[#2d6a4f]" aria-hidden="true" /> {route.name}
                  </h3>
                  <p className="mt-1 text-lg leading-relaxed text-[#4a6358]">{route.tip}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-base text-[#4a6358]">
            Son orientaciones generales: el momento de pasar de un recorrido a otro lo decidimos en las sesiones según
            cómo responde cada persona.
          </p>
        </div>
      </section>

      <LandingPricing place={config.place} surcharge={config.surcharge} />
      <LandingChecklist title={`Casos en los que ayudamos en ${config.place}`} items={config.cases} />
      <LandingArticles topics={/ca[ií]da|equilibrio|fuerza|domicilio|valoraci/i} />
      <LandingFaq title={`Preguntas frecuentes en ${config.place}`} faqs={config.faqs} />
      <LandingCTA title={config.cta.title} subtitle={config.cta.subtitle} related={config.related} />
    </>
  );
}
