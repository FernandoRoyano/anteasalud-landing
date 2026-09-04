import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPublishedArticles } from '@/lib/sheets';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { getArticleImageAlt, getReadingMinutes } from '@/lib/article-editorial';
import { Calendar, ArrowRight, Clock3 } from 'lucide-react';

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
    images: ['/hero-realistic.png'],
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

      <section className="relative isolate w-full overflow-hidden bg-primary-dark text-white" style={{ paddingTop: 'clamp(7rem, 12vw, 10rem)', paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}>
        <div className="absolute inset-0 antea-grid opacity-30" aria-hidden="true" />
        <div className="absolute -right-24 -top-20 size-96 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-fluid-xs font-semibold uppercase tracking-[0.25em] text-accent-light mb-6">Cuaderno ANTEA</p>
          <h1
            className="max-w-4xl font-display font-black tracking-tight leading-[0.98] mb-7 text-balance"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Entender el movimiento<br />
            <span className="text-accent-light">cambia cómo cuidamos.</span>
          </h1>
          <p className="text-fluid-xl text-white/75 leading-relaxed max-w-2xl text-pretty">
            Ideas prácticas para familias que quieren ayudar con criterio: qué observar, qué puede aportar el ejercicio y cuándo pedir ayuda.
          </p>
        </div>
      </section>

      {/* Listado */}
      <section className="w-full bg-surface" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(5rem, 10vw, 8rem)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-fluid-lg text-muted">
                Pronto publicaremos los primeros artículos.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {articles.map((article, index) => (
                <Link
                  key={article.id}
                  href={`/articulos/${article.slug}`}
                  className={`group flex flex-col bg-white rounded-[1.75rem] border border-border/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${index === 0 ? 'md:col-span-2 md:grid md:grid-cols-[1.2fr_1fr]' : ''}`}
                >
                  <div className={`relative bg-surface-alt overflow-hidden ${index === 0 ? 'aspect-[16/10] md:aspect-auto md:min-h-[27rem]' : 'aspect-[16/10]'}`}>
                      <Image
                        src={article.ogImage}
                        alt={getArticleImageAlt(article)}
                        fill
                        sizes={index === 0 ? '(min-width: 768px) 55vw, 100vw' : '(min-width: 768px) 50vw, 100vw'}
                        priority={index === 0}
                        className="object-cover group-hover:scale-[1.025] transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/20 via-transparent to-transparent" aria-hidden="true" />
                  </div>
                  <div className={`flex flex-col flex-1 ${index === 0 ? 'p-7 sm:p-10 md:justify-center' : 'p-6 sm:p-7'}`}>
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
                    <h2 className={`font-display font-bold text-ink leading-[1.12] mb-3 text-balance group-hover:text-primary transition-colors ${index === 0 ? 'text-fluid-3xl' : 'text-fluid-xl'}`}>
                      {article.title}
                    </h2>
                    <p className="text-muted leading-relaxed text-fluid-base mb-4 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-border/60 text-fluid-sm">
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
                        <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(article.publishedAt)}</span>
                        <span className="inline-flex items-center gap-1.5"><Clock3 className="w-3.5 h-3.5" />{getReadingMinutes(article.bodyMarkdown)} min</span>
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
