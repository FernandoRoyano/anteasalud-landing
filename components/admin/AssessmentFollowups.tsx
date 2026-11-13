'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { getAssessmentFollowups } from '@/lib/assessment-followups';

type Followup = ReturnType<typeof getAssessmentFollowups>[number];
const displayDate = (date: string) => date.split('-').reverse().join('/');

export default function AssessmentFollowups() {
  const [items, setItems] = useState<Followup[]>([]);
  const [unlinked, setUnlinked] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/admin/valoraciones/seguimiento', { cache: 'no-store', signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error('No se pudieron cargar las revisiones.');
      const data = await response.json(); setItems(data.followups); setUnlinked(data.unlinked);
    }).catch(error => { if (!controller.signal.aborted) setError(error.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [attempt]);
  const pending = items.filter(item => item.status !== 'scheduled');
  return <section className="mt-7 rounded-2xl border border-primary/20 bg-white p-5" aria-labelledby="monthly-reviews-title"><h2 id="monthly-reviews-title" className="font-display text-2xl font-bold">Revisiones mensuales</h2><p className="mt-2 text-sm text-muted">Avisos orientativos para clientes activos: un mes natural desde la fecha de la última valoración vinculada. Confirma contigo y con la familia cuándo procede revisar.</p>{loading ? <p role="status" className="mt-4">Cargando revisiones…</p> : error ? <div role="alert" className="mt-4 text-red-800">{error}<button type="button" onClick={() => { setLoading(true); setError(''); setAttempt(value => value + 1); }} className="ml-3 min-h-11 underline">Reintentar</button></div> : <><ul className="mt-4 divide-y divide-primary/15">{pending.map(item => <li key={item.clientId} className="flex flex-wrap items-center justify-between gap-3 py-4"><div><p className="font-semibold">{item.name}</p><p className="mt-1 text-sm text-muted">{item.status === 'missing' ? 'Sin valoración vinculada: registra la inicial o vincula un informe existente.' : `${item.status === 'overdue' ? 'Pendiente desde' : item.status === 'today' ? 'Revisión hoy:' : 'Próxima revisión:'} ${displayDate(item.dueDate!)}`}</p></div><Link href={`/admin/valoraciones?client=${encodeURIComponent(item.clientId)}`} className="inline-flex min-h-11 items-center rounded-xl bg-primary px-4 py-2 font-semibold text-white">{item.status === 'missing' ? 'Registrar valoración' : 'Nueva revisión'}</Link></li>)}</ul>{!pending.length && <p className="mt-4 text-muted">No hay revisiones vencidas, para hoy o en los próximos 7 días.</p>}{unlinked > 0 && <p className="mt-4 rounded-xl bg-primary-50 p-3 text-sm text-muted">Hay {unlinked} informes sin cliente vinculado. Puedes vincularlos desde «Editar valoración»; no se asignan automáticamente.</p>}</>}</section>;
}
