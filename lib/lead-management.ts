import type { Lead } from '@/lib/types';

export function normalizeLeadPhone(value: string): string {
  const digits = value.replace(/\D/g, '').replace(/^00/, '');
  return digits.length === 9 ? `34${digits}` : digits;
}

export function getLeadContactKeys(lead: Pick<Lead, 'telefono' | 'email'>): string[] {
  const phone = normalizeLeadPhone(lead.telefono);
  return [phone ? `tel:${phone}` : '', lead.email.trim() ? `email:${lead.email.trim().toLowerCase()}` : ''].filter(Boolean);
}

export function getRelatedLeads(lead: Lead, leads: Lead[]): Lead[] {
  const keys = new Set(getLeadContactKeys(lead));
  return leads.filter(other => !(other.id === lead.id && other.source === lead.source)
    && getLeadContactKeys(other).some(key => keys.has(key)));
}

export function getFollowUpCounts(leads: Lead[], today: string) {
  const open = leads.filter(lead => !['Convertido', 'Descartado'].includes(lead.estado));
  return {
    nuevos: open.filter(lead => lead.estado === 'Nuevo').length,
    hoy: open.filter(lead => lead.fechaSeguimiento === today).length,
    atrasados: open.filter(lead => lead.fechaSeguimiento && lead.fechaSeguimiento < today).length,
  };
}

export function getLeadResults(leads: Lead[]) {
  const groups = new Map<string, { origin: string; total: number; valoraciones: number; clientes: number }>();
  for (const lead of leads) {
    const origin = lead.procedencia || 'Histórico sin procedencia separada';
    const result = groups.get(origin) || { origin, total: 0, valoraciones: 0, clientes: 0 };
    result.total++;
    if (lead.estado === 'Valoración realizada') result.valoraciones++;
    if (lead.estado === 'Convertido') result.clientes++;
    groups.set(origin, result);
  }
  return [...groups.values()].sort((a, b) => b.total - a.total);
}
