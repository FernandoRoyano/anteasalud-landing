"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileText, Plus, Loader2, ExternalLink, Trash2 } from 'lucide-react';
import type { Article } from '@/lib/types';

function formatDate(iso: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function ArticulosAdminPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetch('/api/admin/articulos')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setArticles(data.articles || []);
        }
      })
      .catch(() => setError('No se pudieron cargar los artículos'))
      .finally(() => setLoading(false));
  }, []);

  const handleNew = async () => {
    setCreating(true);
    try {
      const res = await fetch('/api/admin/articulos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Nuevo artículo (borrador)',
          excerpt: '',
          bodyMarkdown: '# Escribe aquí\n\nEmpieza a redactar el artículo.',
          status: 'draft',
        }),
      });
      const data = await res.json();
      if (data.article) {
        router.push(`/admin/articulos/${data.article.id}`);
      } else {
        setError(data.error || 'Error al crear');
        setCreating(false);
      }
    } catch {
      setError('Error al crear artículo');
      setCreating(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar definitivamente "${title}"?`)) return;
    try {
      await fetch(`/api/admin/articulos/${id}`, { method: 'DELETE' });
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch {
      alert('Error al eliminar');
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-black text-[rgb(31,41,51)] flex items-center gap-3">
            <FileText className="w-8 h-8 text-[rgb(0,94,184)]" />
            Artículos
          </h1>
          <p className="text-[rgb(130,131,130)] mt-1">
            Gestión del blog — Markdown + preview · auto-guardado en Google Sheets
          </p>
        </div>
        <button
          onClick={handleNew}
          disabled={creating}
          className="inline-flex items-center gap-2 px-5 py-3 bg-[rgb(0,94,184)] hover:bg-[rgb(0,60,115)] disabled:opacity-50 text-white font-bold rounded-xl shadow-sm transition"
        >
          {creating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
          Nuevo artículo
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
          {error}
        </div>
      )}

      {/* Estados */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-[rgb(0,94,184)]" />
        </div>
      ) : articles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[rgb(200,207,210)] p-12 text-center">
          <FileText className="w-12 h-12 text-[rgb(200,207,210)] mx-auto mb-4" />
          <h3 className="font-bold text-[rgb(31,41,51)] text-lg mb-2">
            Todavía no hay artículos
          </h3>
          <p className="text-[rgb(130,131,130)] mb-6">
            Crea el primero y empieza a publicar contenido en el blog.
          </p>
          <button
            onClick={handleNew}
            disabled={creating}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[rgb(0,94,184)] hover:bg-[rgb(0,60,115)] disabled:opacity-50 text-white font-bold rounded-xl shadow-sm transition"
          >
            {creating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            Crear primer artículo
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[rgb(200,207,210)] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[rgb(232,237,238)] border-b border-[rgb(200,207,210)]">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-[rgb(31,41,51)] uppercase tracking-wider">
                  Título
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold text-[rgb(31,41,51)] uppercase tracking-wider hidden md:table-cell">
                  Estado
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold text-[rgb(31,41,51)] uppercase tracking-wider hidden lg:table-cell">
                  Publicado
                </th>
                <th className="text-right px-4 py-3 text-xs font-bold text-[rgb(31,41,51)] uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-[rgb(232,237,238)] last:border-0 hover:bg-[rgb(250,251,252)]"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/articulos/${article.id}`}
                      className="font-semibold text-[rgb(31,41,51)] hover:text-[rgb(0,94,184)] transition-colors block"
                    >
                      {article.title || '(sin título)'}
                    </Link>
                    {article.slug && (
                      <p className="text-xs text-[rgb(130,131,130)] mt-0.5">/articulos/{article.slug}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {article.status === 'published' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold bg-green-100 text-green-800 rounded-full">
                        Publicado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold bg-amber-100 text-amber-800 rounded-full">
                        Borrador
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-[rgb(130,131,130)] hidden lg:table-cell">
                    {formatDate(article.publishedAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      {article.status === 'published' && (
                        <Link
                          href={`/articulos/${article.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[rgb(0,94,184)] hover:bg-[rgb(191,231,249)] rounded-lg transition"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Ver
                        </Link>
                      )}
                      <Link
                        href={`/admin/articulos/${article.id}`}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-[rgb(191,231,249)] text-[rgb(0,94,184)] hover:bg-[rgb(0,94,184)] hover:text-white rounded-lg transition"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id, article.title)}
                        className="inline-flex items-center px-2 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
