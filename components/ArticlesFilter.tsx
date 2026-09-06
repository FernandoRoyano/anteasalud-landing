'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock3 } from 'lucide-react';

const ARTICLE_CATEGORIES = [
  {
    id: 'caidas',
    label: 'Caídas y equilibrio',
    tags: ['prevención caídas', 'equilibrio'],
  },
  {
    id: 'fuerza',
    label: 'Fuerza y autonomía',
    tags: ['fuerza', 'autonomía', 'fragilidad'],
  },
  {
    id: 'valoracion',
    label: 'Valoración funcional',
    tags: ['valoración funcional', 'sppb', 'vivifrail'],
  },
  {
    id: 'recuperacion',
    label: 'Recuperación',
    tags: ['recuperación', 'hospitalización', 'cadera', 'fractura', 'post-operatorio', 'fisioterapia'],
  },
  {
    id: 'ejercicio',
    label: 'Ejercicio adaptado',
    tags: ['ejercicio mayores', 'entrenamiento domicilio', 'entrenamiento personal', 'mayores madrid'],
  },
  {
    id: 'cognicion',
    label: 'Salud cognitiva',
    tags: ['deterioro cognitivo', 'alzheimer'],
  },
] as const;

type CategoryId = 'todos' | (typeof ARTICLE_CATEGORIES)[number]['id'];

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

function normalizeTag(value: string): string {
  return value.trim().toLocaleLowerCase('es-ES');
}

function articleMatchesCategory(article: ArticleListItem, categoryId: CategoryId): boolean {
  if (categoryId === 'todos') return true;

  const category = ARTICLE_CATEGORIES.find((item) => item.id === categoryId);
  if (!category) return false;

  const articleTags = new Set(article.tags.map(normalizeTag));
  return category.tags.some((tag) => articleTags.has(tag));
}

function formatDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function ArticlesFilter({ articles }: ArticlesFilterProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('todos');

  const availableCategories = useMemo(
    () => ARTICLE_CATEGORIES.map((category) => ({
      ...category,
      count: articles.filter((article) => articleMatchesCategory(article, category.id)).length,
    })).filter((category) => category.count > 0),
    [articles]
  );

  const filteredArticles = useMemo(
    () => articles.filter((article) => articleMatchesCategory(article, activeCategory)),
    [activeCategory, articles]
  );

  const activeLabel = activeCategory === 'todos'
    ? 'Todos los artículos'
    : availableCategories.find((category) => category.id === activeCategory)?.label;

  return (
    <div>
      <div className="mb-8 sm:mb-10">
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <p className="text-fluid-xs font-semibold uppercase tracking-[0.18em] text-accent-dark mb-1.5">
              Explorar por tema
            </p>
            <h2 className="font-display text-fluid-2xl font-bold text-ink">
              ¿Qué necesitas entender?
            </h2>
          </div>
          <p className="hidden sm:block text-fluid-sm text-muted" aria-live="polite">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'artículo' : 'artículos'}
          </p>
        </div>

        <div
          className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0"
          role="group"
          aria-label="Filtrar artículos por tema"
        >
          <button
            type="button"
            onClick={() => setActiveCategory('todos')}
            aria-pressed={activeCategory === 'todos'}
            className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
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
                className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
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

      <div className="sr-only" aria-live="polite">
        Mostrando {filteredArticles.length} resultados para {activeLabel}.
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {filteredArticles.map((article, index) => (
          <Link
            key={article.id}
            href={`/articulos/${article.slug}`}
            className={`group flex flex-col bg-white rounded-[1.75rem] border border-border/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${index === 0 ? 'md:col-span-2 md:grid md:grid-cols-[1.2fr_1fr]' : ''}`}
          >
            <div className={`relative bg-surface-alt overflow-hidden ${index === 0 ? 'aspect-[16/10] md:aspect-auto md:min-h-[27rem]' : 'aspect-[16/10]'}`}>
              <Image
                src={article.ogImage}
                alt={article.imageAlt}
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
              <h3 className={`font-display font-bold text-ink leading-[1.12] mb-3 text-balance group-hover:text-primary transition-colors ${index === 0 ? 'text-fluid-3xl' : 'text-fluid-xl'}`}>
                {article.title}
              </h3>
              <p className="text-muted leading-relaxed text-fluid-base mb-4 flex-1">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-border/60 text-fluid-sm">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
                  <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(article.publishedAt)}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock3 className="w-3.5 h-3.5" />{article.readingMinutes} min</span>
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
    </div>
  );
}
