'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ARTICLE_CATEGORIES, CATEGORY_START_GUIDES, articleMatchesCategory, articleMatchesSearch, type CategoryId } from '@/lib/article-discovery';
import { ArrowRight, Calendar, Clock3 } from 'lucide-react';

interface ArticlesFilterProps {
  articles: ArticleListItem[];
}

export interface ArticleListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  ogImage: string;
  imageAlt: string;
  tags: string[];
  publishedAt: string;
  readingMinutes: number;
}

function formatDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('es-ES', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function ArticlesFilter({ articles }: ArticlesFilterProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('todos');
  const [query, setQuery] = useState('');
  const startGuide = CATEGORY_START_GUIDES[activeCategory];

  const availableCategories = useMemo(
    () => ARTICLE_CATEGORIES.map((category) => ({
      ...category,
      count: articles.filter((article) => articleMatchesCategory(article, category.id)).length,
    })).filter((category) => category.count > 0),
    [articles]
  );

  const filteredArticles = useMemo(
    () => articles.filter((article) => articleMatchesCategory(article, activeCategory) && articleMatchesSearch(article, query)),
    [activeCategory, articles, query]
  );

  const activeLabel = activeCategory === 'todos'
    ? 'Todos los artículos'
    : availableCategories.find((category) => category.id === activeCategory)?.label;

  return (
    <div>
      <div className="mb-8 sm:mb-10">
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <h2 className="font-display text-fluid-2xl font-bold text-ink">
              ¿Qué necesitas entender?
            </h2>
          </div>
          <p className="hidden sm:block text-fluid-base text-muted">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'artículo' : 'artículos'}
          </p>
        </div>

        <label className="mb-5 block max-w-2xl text-base font-semibold text-primary-dark" htmlFor="article-search">Busca lo que os preocupa
          <input id="article-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Por ejemplo: silla, caminar, cadera…" className="mt-2 min-h-12 w-full rounded-xl border border-primary/40 bg-white px-4 py-3 font-normal text-primary-dark placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" />
        </label>

        <div
          className="flex flex-wrap gap-2 pb-2 sm:pb-0"
          role="group"
          aria-label="Filtrar artículos por tema"
        >
          <button
            type="button"
            onClick={() => setActiveCategory('todos')}
            aria-pressed={activeCategory === 'todos'}
            className={`shrink-0 min-h-11 rounded-full border px-4 py-2 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
              activeCategory === 'todos'
                ? 'border-primary bg-primary text-white shadow-sm'
                : 'border-border bg-white text-primary hover:border-primary/40 hover:bg-primary/5'
            }`}
          >
            Todos <span className="ml-1 opacity-70">{articles.length}</span>
          </button>

          {availableCategories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={isActive}
                className={`shrink-0 min-h-11 rounded-full border px-4 py-2 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                  isActive
                    ? 'border-primary bg-primary text-white shadow-sm'
                    : 'border-border bg-white text-primary hover:border-primary/40 hover:bg-primary/5'
                }`}
              >
                {category.label} <span className="ml-1 opacity-70">{category.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mb-5 text-sm text-muted" role="status">{filteredArticles.length} {filteredArticles.length === 1 ? 'artículo' : 'artículos'}{activeCategory !== 'todos' && ` en ${activeLabel}`}{query.trim() && ` para «${query.trim()}»`}.</p>
      {startGuide && <aside className="mb-6 border-y border-primary/20 py-5"><p className="text-sm text-muted">Si no sabes qué leer primero</p><Link href={startGuide.href} className="mt-1 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline underline-offset-4">{startGuide.title}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link></aside>}
      {filteredArticles.length === 0 && <div className="rounded-xl bg-primary-50 p-6"><h3 className="text-lg font-bold">No encontramos artículos con esa búsqueda.</h3><p className="mt-2 text-muted">Prueba una palabra más general o consulta todos los temas.</p><button onClick={() => { setQuery(''); setActiveCategory('todos'); }} className="mt-3 min-h-11 font-semibold text-primary underline underline-offset-4">Borrar búsqueda y ver todos</button></div>}

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {filteredArticles.map((article, index) => (
          <Link
            key={article.id}
            href={`/articulos/${article.slug}`}
            className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-white transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-surface-alt">
              <Image
                src={article.ogImage}
                alt={article.imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                priority={index === 0}
                className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.025]"
              />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-sm font-semibold uppercase tracking-wide text-accent-dark bg-accent/10 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h3 className="mb-3 font-display text-fluid-xl font-bold leading-tight text-ink transition-colors group-hover:text-primary">
                {article.title}
              </h3>
              <p className="text-muted leading-relaxed text-fluid-base mb-4 flex-1">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-border/60 text-fluid-base">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
                  <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4" aria-hidden="true" />{formatDate(article.publishedAt)}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock3 className="w-4 h-4" aria-hidden="true" />{article.readingMinutes} min</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-primary group-hover:gap-2.5 transition-all">
                  Leer
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
