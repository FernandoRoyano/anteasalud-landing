"use client";

import { useEffect, useState, useMemo } from 'react';
import { Users, Calendar, TrendingUp, Inbox, Loader2, MapPin, Target } from 'lucide-react';
import type { Lead } from '@/lib/types';

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
      if (lead.interes) porInteres[lead.interes] = (porInteres[lead.interes] || 0) + 1;
    });

    return { total, hoy, semana, mes, porEstado, porZona, porInteres, ultimos30 };
  }, [leads]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-[rgb(0,94,184)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6">
        {error}
      </div>
    );
  }

  const maxDayCount = Math.max(...Object.values(stats.ultimos30), 1);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)]">Dashboard</h1>
        <p className="text-[rgb(130,131,130)] mt-1">Resumen de leads y métricas clave</p>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon={Inbox} label="Total leads" value={stats.total} color="blue" />
        <KpiCard icon={Calendar} label="Hoy" value={stats.hoy} color="green" />
        <KpiCard icon={TrendingUp} label="Esta semana" value={stats.semana} color="orange" />
        <KpiCard icon={Users} label="Este mes" value={stats.mes} color="purple" />
      </div>

      {/* Gráfico últimos 30 días */}
      <div className="bg-white rounded-2xl shadow-md border border-[rgb(200,207,210)] p-6">
        <h2 className="text-lg font-bold text-[rgb(31,41,51)] mb-6">Leads últimos 30 días</h2>
        <div className="flex items-end gap-1 h-40">
          {Object.entries(stats.ultimos30).map(([day, count]) => {
            const heightPercent = (count / maxDayCount) * 100;
            const date = new Date(day);
            return (
              <div key={day} className="flex-1 flex flex-col items-center group relative">
                <div
                  className="w-full bg-gradient-to-t from-[rgb(0,94,184)] to-[rgb(32,113,188)] rounded-t-md transition-all hover:opacity-80"
                  style={{ height: `${heightPercent}%`, minHeight: count > 0 ? '4px' : '0' }}
                />
                <div className="absolute bottom-full mb-2 px-2 py-1 bg-[rgb(31,41,51)] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
                  {date.getDate()}/{date.getMonth() + 1}: {count}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Distribución */}
      <div className="grid md:grid-cols-3 gap-6">
        <DistributionCard title="Por estado" data={stats.porEstado} icon={Inbox} />
        <DistributionCard title="Por zona" data={stats.porZona} icon={MapPin} />
        <DistributionCard title="Por interés" data={stats.porInteres} icon={Target} />
      </div>
    </div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: 'blue' | 'green' | 'orange' | 'purple';
}) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[rgb(200,207,210)] p-6">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <p className="text-sm text-[rgb(130,131,130)]">{label}</p>
      <p className="text-3xl font-black text-[rgb(31,41,51)] mt-1">{value}</p>
    </div>
  );
}

function DistributionCard({
  title,
  data,
  icon: Icon,
}: {
  title: string;
  data: Record<string, number>;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, v]) => v), 1);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[rgb(200,207,210)] p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-[rgb(0,94,184)]" />
        <h3 className="font-bold text-[rgb(31,41,51)]">{title}</h3>
      </div>
      {entries.length === 0 ? (
        <p className="text-sm text-[rgb(130,131,130)]">Sin datos</p>
      ) : (
        <div className="space-y-3">
          {entries.map(([label, count]) => (
            <div key={label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[rgb(31,41,51)] truncate pr-2">{label}</span>
                <span className="text-[rgb(130,131,130)] font-semibold">{count}</span>
              </div>
              <div className="h-2 bg-[rgb(232,237,238)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[rgb(32,113,188)] to-[rgb(0,94,184)] rounded-full"
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
