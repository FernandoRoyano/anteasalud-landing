'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

export default function DeleteAssessmentButton({ id, reference, onDeleted }: { id: string; reference: string; onDeleted?: () => void }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  async function remove() {
    if (deleting || !window.confirm(`¿Borrar la valoración de «${reference}»? Esta acción no se puede deshacer. Solo se elimina esta versión; las demás se conservan. Los PDF enviados o descargados no se borran.`)) return;
    setDeleting(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/valoraciones/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok && response.status !== 404) throw new Error(data.error || 'No se pudo borrar la valoración');
      if (onDeleted) onDeleted();
      else { router.replace('/admin/valoraciones/informes'); router.refresh(); }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error de conexión. Vuelve a intentarlo.');
      setDeleting(false);
    }
  }
  return <div><button type="button" onClick={remove} disabled={deleting} aria-label={`Borrar valoración de ${reference}`} className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 font-semibold text-red-800 hover:bg-red-50 disabled:opacity-50"><Trash2 className="size-4" aria-hidden="true" />{deleting ? 'Borrando…' : 'Borrar valoración'}</button>{error && <p role="alert" className="mt-2 text-sm text-red-800">{error}</p>}</div>;
}
