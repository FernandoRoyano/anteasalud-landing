import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedArticles } from '@/lib/sheets';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Calendar, ArrowRight } from 'lucide-react';

const TITLE = 'Artículos — Guías de ejercicio y salud para personas mayores | ANTEA Salud';
const DESCRIPTION =
  'Artículos con evidencia científica sobre ejercicio, prevención de caídas, readaptación y autonomía en personas mayores. Escritos por un entrenador titulado con 14 años de experiencia.';
const URL_PAGE = 'https://anteasalud.com/articulos';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL_PAGE },
  openGraph: {
    type: 'website',
    url: URL_PAGE,
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.jpg'],
  },
};

// Revalida cada hora — cuando se publica un artículo nuevo aparece en <1h
export const revalidate = 3600;

function formatDate(iso: string): string {
  if (!iso) return '';
  const date = new Date(iso);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function ArticulosIndexPage() {
  const articles = await getPublishedArticles();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Inicio', url: 'https://anteasalud.com' },
          { name: 'Artículos', url: URL_PAGE },
        ]}
      />

      {/* Hero */}
      <section className="relative w-full bg-surface-alt overflow-hidden" style={{ paddingTop: 'clamp(6rem, 12vw, 9rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="relative max-w-5xl mx-auto px-4">
          <p className="text-fluid-xs font-semibold uppercase tracking-[0.25em] text-accent-dark mb-6">
            Artículos
          </p>
          <h1
            className="font-display font-black tracking-tight text-ink leading-[1.02] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Evidencia clara,
            <br />
            <span className="text-primary">sin humo.</span>
          </h1>
          <p className="text-fluid-xl text-muted leading-relaxed max-w-2xl">
            Guías prácticas sobre ejercicio, prevención de caídas, readaptación y autonomía en personas mayores.
            Todo con citas científicas y 14 años de experiencia de campo.
          </p>
        </div>
      </section>

      {/* Listado */}
      <section className="w-full bg-surface" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(5rem, 10vw, 8rem)' }}>
        <div className="max-w-5xl mx-auto px-4">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-fluid-lg text-muted">
                Pronto publicaremos los primeros artículos.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articulos/${article.slug}`}
                  className="group flex flex-col bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {article.ogImage && (
                    <div className="relative aspect-[16/9] bg-surface-alt overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.ogImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="flex flex-col flex-1 p-6">
                    {article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[0.7rem] font-semibold uppercase tracking-wider text-accent-dark bg-accent/10 px-2.5 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="font-display font-bold text-ink text-fluid-xl leading-tight mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-muted leading-relaxed text-fluid-base mb-4 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border/60 text-fluid-sm">
                      <span className="inline-flex items-center gap-1.5 text-muted">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(article.publishedAt)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-primary group-hover:gap-2.5 transition-all">
                        Leer
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
