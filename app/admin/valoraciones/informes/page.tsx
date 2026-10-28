'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, FileText, Loader2, Plus, Search } from 'lucide-react';

interface ReportSummary { id: string; reference: string; date: string; createdAt: string; total: number | null; profile: string | null }

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/admin/valoraciones', { signal: controller.signal, cache: 'no-store' }).then(async res => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudieron cargar los informes');
      setReports(data.reports);
    }).catch(error => { if (!controller.signal.aborted) setError(error instanceof Error ? error.message : 'Error de conexión'); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);
  const filtered = reports.filter(report => `${report.reference} ${report.date}`.toLocaleLowerCase('es').includes(search.toLocaleLowerCase('es')));
  return <div className="mx-auto max-w-5xl text-primary-dark"><header className="flex flex-wrap items-start justify-between gap-4"><div><p className="font-semibold text-primary">ANTEA Salud · Valoraciones</p><h1 className="mt-2 font-display text-fluid-3xl font-bold">Informes guardados</h1><p className="mt-3 text-muted">Consulta las valoraciones revisadas, descarga su PDF y compártelo con la familia.</p></div><Link href="/admin/valoraciones" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white"><Plus className="size-5" />Nueva valoración</Link></header><label className="mt-7 block rounded-2xl border border-primary/20 bg-white p-4"><span className="flex items-center gap-2 text-sm font-semibold"><Search className="size-4" />Buscar por referencia o fecha</span><input value={search} onChange={event => setSearch(event.target.value)} type="search" className="mt-2 min-h-11 w-full rounded-lg border border-primary/30 px-3 py-2" placeholder="Iniciales, referencia o fecha (AAAA-MM-DD)" /></label>{loading ? <p role="status" className="mt-8 flex items-center gap-3 text-muted"><Loader2 className="size-5 animate-spin" />Cargando informes…</p> : error ? <div role="alert" className="mt-6 rounded-xl bg-red-50 p-5 text-red-800"><p>{error}</p><button onClick={() => window.location.reload()} className="mt-3 min-h-11 font-semibold underline">Volver a intentar</button></div> : <div className="mt-6 space-y-3">{filtered.map(report => <Link key={report.id} href={`/admin/valoraciones/informes/${report.id}`} className="flex items-start gap-4 rounded-2xl border border-primary/20 bg-white p-5 transition-colors hover:bg-primary-50"><FileText className="mt-1 size-6 shrink-0 text-primary" /><div className="min-w-0 flex-1"><h2 className="break-words font-display text-xl font-bold">{report.reference}</h2><p className="mt-1 text-sm text-muted">{report.date.split('-').reverse().join('/')} · SPPB {report.total === null ? 'incompleta' : `${report.total}/12`}{report.profile ? ` · Perfil ${report.profile}` : ' · Sin perfil automático'}</p></div><ArrowRight className="mt-1 size-5 shrink-0 text-primary" /></Link>)}{!filtered.length && <p className="rounded-2xl border border-dashed border-primary/30 bg-white p-8 text-muted">{reports.length ? 'No hay informes que coincidan con la búsqueda.' : 'Todavía no hay informes guardados. Al finalizar una valoración, pulsa Guardar informe en el historial.'}</p>}</div>}</div>;
}
