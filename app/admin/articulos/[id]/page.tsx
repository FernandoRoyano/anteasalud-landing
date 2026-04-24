"use client";

import { useEffect, useState, useCallback, useRef, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Loader2, Eye, EyeOff, Save, CheckCircle, Trash2, ExternalLink } from 'lucide-react';
import type { Article } from '@/lib/types';

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export default function ArticleEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState('');

  // Campos editables (controlados)
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [bodyMarkdown, setBodyMarkdown] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const dirtyRef = useRef(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cargar artículo
  useEffect(() => {
    fetch(`/api/admin/articulos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else if (data.article) {
          const a: Article = data.article;
          setArticle(a);
          setTitle(a.title);
          setSlug(a.slug);
          setExcerpt(a.excerpt);
          setBodyMarkdown(a.bodyMarkdown);
          setOgImage(a.ogImage);
          setTagsInput((a.tags || []).join(', '));
          setStatus(a.status);
        }
      })
      .catch(() => setError('Error al cargar artículo'))
      .finally(() => setLoading(false));
  }, [id]);

  const save = useCallback(
    async (opts?: { statusOverride?: 'draft' | 'published' }): Promise<boolean> => {
      setSaveState('saving');
      try {
        const payload = {
          title,
          slug,
          excerpt,
          bodyMarkdown,
          ogImage,
          tags: tagsInput
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          status: opts?.statusOverride || status,
        };
        const res = await fetch(`/api/admin/articulos/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.error) {
          setSaveState('error');
          return false;
        }
        if (data.article) {
          setArticle(data.article);
          // Sincronizar el slug resuelto (si tuvo colisión)
          if (data.article.slug !== slug) setSlug(data.article.slug);
          if (opts?.statusOverride) setStatus(opts.statusOverride);
        }
        dirtyRef.current = false;
        setSaveState('saved');
        setLastSavedAt(new Date());
        return true;
      } catch {
        setSaveState('error');
        return false;
      }
    },
    [id, title, slug, excerpt, bodyMarkdown, ogImage, tagsInput, status]
  );

  // Auto-guardado (debounce 30s tras cambios)
  useEffect(() => {
    if (!article || loading) return;
    dirtyRef.current = true;
    setSaveState('idle');

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      if (dirtyRef.current) save();
    }, 30000);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, slug, excerpt, bodyMarkdown, ogImage, tagsInput, status]);

  // Atajo Cmd/Ctrl+S para guardar
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        save();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [save]);

  const handleTogglePublish = async () => {
    const newStatus = status === 'published' ? 'draft' : 'published';
    const ok = await save({ statusOverride: newStatus });
    if (ok) {
      const msg =
        newStatus === 'published'
          ? '✓ Publicado. Aparecerá en la web en 1-60 minutos (revalidación ISR).'
          : '✓ Despublicado. Dejará de aparecer en la web.';
      alert(msg);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`¿Eliminar definitivamente "${title}"?`)) return;
    try {
      await fetch(`/api/admin/articulos/${id}`, { method: 'DELETE' });
      router.push('/admin/articulos');
    } catch {
      alert('Error al eliminar');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[rgb(0,94,184)]" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="p-6 md:p-10 max-w-3xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6">
          {error || 'Artículo no encontrado'}
        </div>
        <Link
          href="/admin/articulos"
          className="inline-flex items-center gap-2 mt-6 text-[rgb(0,94,184)] font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al listado
        </Link>
      </div>
    );
  }

  const saveStatusLabel =
    saveState === 'saving'
      ? 'Guardando…'
      : saveState === 'saved'
        ? `Guardado${lastSavedAt ? ` · ${lastSavedAt.toLocaleTimeString('es-ES').slice(0, 5)}` : ''}`
        : saveState === 'error'
          ? 'Error al guardar'
          : lastSavedAt
            ? `Cambios sin guardar`
            : '';

  return (
    <div className="min-h-screen bg-[rgb(232,237,238)]">
      {/* Toolbar sticky */}
      <div className="sticky top-0 z-20 bg-white border-b border-[rgb(200,207,210)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center gap-3 flex-wrap">
          <Link
            href="/admin/articulos"
            className="inline-flex items-center gap-1.5 text-sm text-[rgb(130,131,130)] hover:text-[rgb(0,94,184)]"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>

          <div className="flex-1 flex items-center gap-2 text-sm">
            {saveState === 'saving' && <Loader2 className="w-3.5 h-3.5 animate-spin text-[rgb(0,94,184)]" />}
            {saveState === 'saved' && <CheckCircle className="w-3.5 h-3.5 text-green-600" />}
            <span
              className={
                saveState === 'error'
                  ? 'text-red-600 font-semibold'
                  : saveState === 'saved'
                    ? 'text-green-700'
                    : 'text-[rgb(130,131,130)]'
              }
            >
              {saveStatusLabel}
            </span>
          </div>

          <button
            onClick={() => setShowPreview((p) => !p)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[rgb(31,41,51)] hover:bg-[rgb(232,237,238)] rounded-lg transition"
          >
            {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showPreview ? 'Solo editor' : 'Ver preview'}
          </button>

          <button
            onClick={() => save()}
            disabled={saveState === 'saving'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[rgb(232,237,238)] text-[rgb(31,41,51)] hover:bg-[rgb(200,207,210)] rounded-lg transition disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            Guardar
          </button>

          {article.status === 'published' && (
            <Link
              href={`/articulos/${article.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[rgb(0,94,184)] hover:bg-[rgb(191,231,249)] rounded-lg transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Ver en web
            </Link>
          )}

          <button
            onClick={handleTogglePublish}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-lg shadow-sm transition ${
              status === 'published'
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {status === 'published' ? 'Despublicar' : 'Publicar'}
          </button>

          <button
            onClick={handleDelete}
            className="inline-flex items-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            aria-label="Eliminar"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metadata form */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="bg-white rounded-2xl border border-[rgb(200,207,210)] p-6 mb-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[rgb(130,131,130)] uppercase tracking-wider mb-1.5">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-2xl md:text-3xl font-black text-[rgb(31,41,51)] border-0 outline-none focus:bg-[rgb(250,251,252)] rounded-lg px-2 py-1 -ml-2"
              placeholder="Título del artículo"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[rgb(130,131,130)] uppercase tracking-wider mb-1.5">
                Slug (URL)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[rgb(130,131,130)]">/articulos/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 text-sm font-mono text-[rgb(31,41,51)] border border-[rgb(200,207,210)] rounded-lg px-3 py-2 focus:outline-none focus:border-[rgb(0,94,184)]"
                  placeholder="ejercicios-prevenir-caidas"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[rgb(130,131,130)] uppercase tracking-wider mb-1.5">
                Tags (separados por coma)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full text-sm text-[rgb(31,41,51)] border border-[rgb(200,207,210)] rounded-lg px-3 py-2 focus:outline-none focus:border-[rgb(0,94,184)]"
                placeholder="prevención caídas, ejercicio mayores"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[rgb(130,131,130)] uppercase tracking-wider mb-1.5">
              Resumen (1-2 frases, aparece en listado y redes)
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="w-full text-sm text-[rgb(31,41,51)] border border-[rgb(200,207,210)] rounded-lg px-3 py-2 focus:outline-none focus:border-[rgb(0,94,184)] resize-none"
              placeholder="Resumen corto que se mostrará en el listado de artículos y en Open Graph"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[rgb(130,131,130)] uppercase tracking-wider mb-1.5">
              Imagen destacada (URL absoluta o ruta /public)
            </label>
            <input
              type="text"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              className="w-full text-sm font-mono text-[rgb(31,41,51)] border border-[rgb(200,207,210)] rounded-lg px-3 py-2 focus:outline-none focus:border-[rgb(0,94,184)]"
              placeholder="https://ejemplo.com/imagen.jpg o /articulos/prevencion.jpg"
            />
          </div>
        </div>

        {/* Editor + Preview */}
        <div className={`grid gap-4 ${showPreview ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
          {/* Editor Markdown */}
          <div className="bg-white rounded-2xl border border-[rgb(200,207,210)] overflow-hidden flex flex-col">
            <div className="px-4 py-2 border-b border-[rgb(200,207,210)] bg-[rgb(250,251,252)] flex items-center justify-between">
              <span className="text-xs font-bold text-[rgb(130,131,130)] uppercase tracking-wider">
                Markdown
              </span>
              <span className="text-xs text-[rgb(130,131,130)]">
                Cmd/Ctrl+S para guardar
              </span>
            </div>
            <textarea
              value={bodyMarkdown}
              onChange={(e) => setBodyMarkdown(e.target.value)}
              className="flex-1 min-h-[60vh] p-5 font-mono text-sm text-[rgb(31,41,51)] leading-relaxed border-0 outline-none resize-none focus:bg-[rgb(250,251,252)]"
              placeholder="# Título H1&#10;&#10;Párrafo...&#10;&#10;## Subtítulo H2&#10;&#10;- Lista&#10;- De items&#10;&#10;[Enlace](https://...) · **Bold** · *Italic*"
              spellCheck={false}
            />
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="bg-white rounded-2xl border border-[rgb(200,207,210)] overflow-hidden flex flex-col">
              <div className="px-4 py-2 border-b border-[rgb(200,207,210)] bg-[rgb(250,251,252)]">
                <span className="text-xs font-bold text-[rgb(130,131,130)] uppercase tracking-wider">
                  Preview
                </span>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="prose-antea">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{bodyMarkdown}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-[rgb(130,131,130)] mt-4 text-center">
          Auto-guardado cada 30 segundos tras editar · los cambios se persisten en Google Sheets
        </p>
      </div>
    </div>
  );
}
