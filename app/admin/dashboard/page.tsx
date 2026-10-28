"use client";

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Users, Calendar, TrendingUp, Inbox, Loader2, MapPin, Target, ArrowUpRight, ArrowRight, ClipboardCheck, Clock3 } from 'lucide-react';
import type { Lead } from '@/lib/types';
import { getFollowUpCounts, getLeadResults } from '@/lib/lead-management';

/** Parsea fechas en formato "DD/MM/YYYY, HH:mm" o similar */
function parseLeadDate(fecha: string): Date | null {
  if (!fecha) return null;
  // Formatos comunes: "13/02/2026, 21:26" o "13/02/2026 21:26"
  const match = fecha.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})[,\s]+(\d{1,2}):(\d{2})/);
  if (!match) return null;
  const [, day, month, year, hour, min] = match;
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(min));
}

function isToday(date: Date): boolean {
  const now = new Date();
  return date.toDateString() === now.toDateString();
}

function isThisWeek(date: Date): boolean {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return date >= weekAgo && date <= now;
}

function isThisMonth(date: Date): boolean {
  const now = new Date();
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
}

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/leads')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setLeads(data.leads || []);
        }
      })
      .catch(() => setError('Error al cargar los leads'))
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const total = leads.length;
    let hoy = 0;
    let semana = 0;
    let mes = 0;
    const porEstado: Record<string, number> = {};
    const porZona: Record<string, number> = {};
    const porInteres: Record<string, number> = {};
    const ultimos30: Record<string, number> = {};

    // Inicializar últimos 30 días
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      ultimos30[key] = 0;
    }

    leads.forEach((lead) => {
      const date = parseLeadDate(lead.fecha);
      if (date) {
        if (isToday(date)) hoy++;
        if (isThisWeek(date)) semana++;
        if (isThisMonth(date)) mes++;
        const key = date.toISOString().slice(0, 10);
        if (key in ultimos30) ultimos30[key]++;
      }
      const estado = lead.estado || 'Nuevo';
      porEstado[estado] = (porEstado[estado] || 0) + 1;
      if (lead.zona) porZona[lead.zona] = (porZona[lead.zona] || 0) + 1;
      const origin = lead.procedencia || 'Histórico sin procedencia separada';
      porInteres[origin] = (porInteres[origin] || 0) + 1;
    });

    return { total, hoy, semana, mes, porEstado, porZona, porInteres, ultimos30 };
  }, [leads]);

  if (loading) {
    return <div role="status" className="flex min-h-96 flex-col items-center justify-center gap-4 text-muted"><Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" /><p>Preparando tu resumen…</p></div>;
  }

  if (error) {
    return <div role="alert" className="rounded-2xl border border-red-200 bg-white p-6 text-red-800"><h1 className="font-display text-2xl font-bold">No hemos podido cargar el resumen</h1><p className="mt-2">{error}</p><button onClick={() => window.location.reload()} className="mt-5 min-h-11 rounded-xl bg-primary px-5 py-2 font-semibold text-white">Volver a intentar</button></div>;
  }

  const maxDayCount = Math.max(...Object.values(stats.ultimos30), 1);
  const days = Object.entries(stats.ultimos30);
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const followUp = getFollowUpCounts(leads, today);
  const recent = [...leads].sort((a, b) => (parseLeadDate(b.fecha)?.getTime() || 0) - (parseLeadDate(a.fecha)?.getTime() || 0)).slice(0, 5);
  const dateLabel = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-5 border-b border-primary/15 pb-7">
        <div><p className="mb-3 text-sm font-medium capitalize text-muted">{dateLabel}</p><h1 className="font-display text-4xl font-bold tracking-tight text-primary-dark sm:text-5xl">Tu actividad, de un vistazo.</h1><p className="mt-3 max-w-2xl text-base text-muted">Solicitudes, seguimiento y resultados de Antea Salud.</p></div>
        <Link href="/admin/leads" className="inline-flex min-h-12 items-center gap-3 rounded-xl bg-primary-dark px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary">Gestionar leads <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
      </header>

      <section aria-labelledby="priorities-title" className="grid overflow-hidden rounded-3xl border border-primary/15 bg-white lg:grid-cols-[1.1fr_2fr]">
        <div className="bg-primary-dark p-6 text-white sm:p-8"><p className="text-sm font-medium text-primary-light">Tu siguiente paso</p><h2 id="priorities-title" className="mt-3 font-display text-2xl font-bold">Cada familia merece una respuesta.</h2><p className="mt-3 text-sm leading-relaxed text-primary-light">Revisa las nuevas consultas y retoma los seguimientos que tienes pendientes.</p><Link href="/admin/leads" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-white/40 underline-offset-4 hover:decoration-white">Abrir seguimiento <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
        <div className="grid grid-cols-1 divide-y divide-primary/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[{ label: 'Sin contactar', count: followUp.nuevos, detail: 'Solicitudes nuevas', urgent: false }, { label: 'Para hoy', count: followUp.hoy, detail: 'Seguimientos previstos', urgent: false }, { label: 'Atrasados', count: followUp.atrasados, detail: 'Seguimientos vencidos', urgent: true }].map(item => <div key={item.label} className="flex flex-col justify-center p-6 sm:p-7"><p className="text-sm font-semibold text-muted">{item.label}</p><p className={`my-3 font-display text-5xl font-bold tabular-nums ${item.urgent && item.count > 0 ? 'text-amber-800' : 'text-primary-dark'}`}>{item.count}</p><p className="text-xs text-muted">{item.detail}</p></div>)}
        </div>
      </section>

      <section aria-label="Resumen de solicitudes" className="grid grid-cols-2 gap-3 xl:grid-cols-4 sm:gap-5">
        <KpiCard icon={Inbox} label="Solicitudes totales" value={stats.total} detail="Todo el historial" />
        <KpiCard icon={Calendar} label="Hoy" value={stats.hoy} detail="Nuevas solicitudes" />
        <KpiCard icon={TrendingUp} label="Últimos 7 días" value={stats.semana} detail="Actividad reciente" />
        <KpiCard icon={Users} label="Este mes" value={stats.mes} detail="Mes en curso" />
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="min-w-0 rounded-3xl border border-primary/15 bg-white p-5 sm:p-7" aria-labelledby="activity-title">
          <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 id="activity-title" className="font-display text-2xl font-bold">Cómo llegan las consultas</h2><p className="mt-1 text-sm text-muted">Solicitudes diarias · últimos 30 días</p></div><span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary">{days.reduce((sum, [, count]) => sum + count, 0)} en total</span></div>
          <div className="relative mt-8">
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-8" aria-hidden="true">{[0, 1, 2, 3].map(line => <div key={line} className="border-t border-dashed border-primary/10" />)}</div>
            <div className="relative flex h-48 items-end gap-1" role="list" aria-label="Solicitudes por día">
              {days.map(([day, count]) => <div key={day} role="listitem" className="group relative flex h-full min-w-0 flex-1 items-end">
                <div tabIndex={0} aria-label={`${day.split('-').reverse().join('/')}: ${count} solicitudes`} className="w-full rounded-t bg-primary transition-colors hover:bg-primary-dark focus:bg-primary-dark" style={{ height: count ? `${Math.max((count / maxDayCount) * 100, 3)}%` : '3px', backgroundColor: count ? undefined : 'var(--color-primary-light)' }}>
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-primary-dark px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">{day.slice(8)}/{day.slice(5, 7)}: {count}</span>
                </div>
              </div>)}
            </div>
            <div className="mt-3 flex justify-between text-xs text-muted"><span>{days[0][0].split('-').reverse().slice(0, 2).join('/')}</span><span>Hoy</span></div>
          </div>
        </section>

        <section className="min-w-0 rounded-3xl border border-primary/15 bg-white p-5 sm:p-7" aria-labelledby="recent-title">
          <div className="flex items-center justify-between gap-3"><h2 id="recent-title" className="font-display text-2xl font-bold">Últimas solicitudes</h2><Clock3 className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" /></div>
          {recent.length ? <ul className="mt-4 divide-y divide-primary/10">{recent.map(lead => <li key={`${lead.source}-${lead.id}`} className="flex flex-col items-start gap-2 py-4 sm:flex-row sm:justify-between"><div className="min-w-0"><p className="break-words text-sm font-semibold">{lead.nombre}</p><p className="mt-1 break-words text-xs text-muted">{lead.procedencia || 'Procedencia no registrada'}</p><p className="mt-1 text-xs text-muted">{lead.fecha}</p></div><span className={`shrink-0 rounded-lg px-2 py-1 text-xs font-medium ${lead.estado === 'Nuevo' ? 'bg-primary-light text-primary-dark' : 'bg-primary-50 text-muted'}`}>{lead.estado || 'Nuevo'}</span></li>)}</ul> : <p className="py-8 text-sm text-muted">Las consultas de las familias aparecerán aquí cuando lleguen.</p>}
          <Link href="/admin/leads" className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">Ver todas <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </section>
      </div>

      <section className="rounded-3xl border border-primary/15 bg-white p-5 sm:p-7" aria-labelledby="results-title">
        <h2 id="results-title" className="font-display text-2xl font-bold">Qué páginas generan resultados</h2>
        <p id="results-note" className="mt-2 max-w-3xl text-sm text-muted">Solicitudes según su estado actual. Las valoraciones realizadas y los clientes se muestran por separado; no es un historial de etapas ni un recuento de personas únicas.</p>
        <div className="mt-6 overflow-x-auto">
          <table aria-describedby="results-note" className="w-full text-left text-sm">
            <thead className="bg-primary-50 text-muted"><tr>{['Procedencia', 'Solicitudes', 'Valoración realizada', 'Clientes', 'Conversión a cliente'].map(label => <th key={label} scope="col" className="whitespace-nowrap border-b border-primary/10 p-4 text-xs font-semibold">{label}</th>)}</tr></thead>
            <tbody className="divide-y divide-primary/10">{getLeadResults(leads).map(result => <tr key={result.origin} className="hover:bg-primary-50/60"><th scope="row" className="min-w-52 p-4 font-medium">{result.origin}</th><td className="p-4 tabular-nums">{result.total}</td><td className="p-4 tabular-nums">{result.valoraciones}</td><td className="p-4 font-semibold tabular-nums text-primary">{result.clientes}</td><td className="p-4 tabular-nums">{(100 * result.clientes / result.total).toLocaleString('es-ES', { maximumFractionDigits: 1 })}%</td></tr>)}</tbody>
          </table>
          {leads.length === 0 && <p className="py-6 text-sm text-muted">Todavía no hay solicitudes.</p>}
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-3"><DistributionCard title="Estado de las solicitudes" data={stats.porEstado} icon={Inbox} /><DistributionCard title="Dónde te necesitan" data={stats.porZona} icon={MapPin} /><DistributionCard title="Procedencia" data={stats.porInteres} icon={Target} /></div>

      <section aria-label="Accesos rápidos" className="grid gap-3 border-t border-primary/15 pt-6 sm:grid-cols-3">
        {[{ href: '/admin/valoraciones', label: 'Preparar una valoración', icon: ClipboardCheck }, { href: '/admin/sesiones', label: 'Consultar las sesiones', icon: Calendar }, { href: '/admin/articulos', label: 'Gestionar artículos', icon: Target }].map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="flex min-h-14 items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary-light/50"><Icon className="h-5 w-5 shrink-0" aria-hidden="true" />{label}<ArrowUpRight className="ml-auto h-4 w-4 shrink-0" aria-hidden="true" /></Link>)}
      </section>
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, detail }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number; detail: string }) {
  return <div className="rounded-2xl border border-primary/15 bg-white p-5 sm:p-6"><div className="mb-5 flex items-center justify-between gap-2"><p className="text-sm font-medium text-muted">{label}</p><Icon className="h-5 w-5 shrink-0 text-primary" /></div><p className="font-display text-4xl font-bold tabular-nums text-primary-dark sm:text-5xl">{value}</p><p className="mt-2 text-xs text-muted">{detail}</p></div>;
}

function DistributionCard({ title, data, icon: Icon }: { title: string; data: Record<string, number>; icon: React.ComponentType<{ className?: string }> }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);
  return <section className="min-w-0 rounded-3xl border border-primary/15 bg-white p-5 sm:p-7"><div className="mb-6 flex items-center gap-3"><Icon className="h-5 w-5 shrink-0 text-primary" /><h2 className="font-display text-xl font-bold">{title}</h2></div>{entries.length ? <ul className="space-y-5">{entries.map(([label, count]) => <li key={label}><div className="mb-2 flex items-start justify-between gap-3 text-sm"><span className="break-words text-muted">{label}</span><span className="shrink-0 font-semibold tabular-nums">{count}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-primary-50"><div className="h-full rounded-full bg-primary" style={{ width: `${100 * count / total}%` }} /></div></li>)}</ul> : <p className="text-sm text-muted">Sin datos todavía.</p>}</section>;
}
