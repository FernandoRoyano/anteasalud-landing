"use client";

import { useEffect, useState, useMemo } from 'react';
import {
  Loader2,
  Search,
  Phone,
  MessageCircle,
  Mail,
  X,
  Save,
  Calendar,
  MapPin,
  Target,
  StickyNote,
  Trash2,
} from 'lucide-react';
import type { Lead, LeadUpdates } from '@/lib/types';
import { getFollowUpCounts, getLeadContactKeys as contactKeys, getRelatedLeads, normalizeLeadPhone } from '@/lib/lead-management';

const ESTADOS = ['Nuevo', 'Contactado', 'En seguimiento', 'Valoración agendada', 'Valoración realizada', 'Convertido', 'Descartado'];

const todayInMadrid = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const isPending = (lead: Lead, today: string) => !['Convertido', 'Descartado'].includes(lead.estado) && !!lead.fechaSeguimiento && lead.fechaSeguimiento <= today;

const ESTADO_COLORS: Record<string, string> = {
  Nuevo: 'bg-blue-100 text-blue-700 border-blue-200',
  Contactado: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'En seguimiento': 'bg-orange-100 text-orange-700 border-orange-200',
  Convertido: 'bg-green-100 text-green-700 border-green-200',
  Descartado: 'bg-gray-100 text-gray-600 border-gray-200',
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [filterZona, setFilterZona] = useState('');
  const [filterOrigin, setFilterOrigin] = useState('');
  const [filterPending, setFilterPending] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [actionError, setActionError] = useState('');
  const [updatingId, setUpdatingId] = useState('');
  const counts = getFollowUpCounts(leads, todayInMadrid());
  const duplicateContacts = useMemo(() => {
    const counts = new Map<string, number>();
    leads.forEach(lead => contactKeys(lead).forEach(key => counts.set(key, (counts.get(key) || 0) + 1)));
    return new Set([...counts].filter(([, count]) => count > 1).map(([key]) => key));
  }, [leads]);

  const fetchLeads = () =>
    fetch('/api/admin/leads')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setLeads((data.leads || []).reverse()); // más recientes primero
      })
      .catch(() => setError('Error al cargar los leads'))
      .finally(() => setLoading(false));

  // loading ya arranca en true: la carga inicial solo actualiza estado en callbacks
  useEffect(() => {
    fetchLeads();
  }, []);

  const zonas = useMemo(() => {
    const set = new Set<string>();
    leads.forEach((l) => l.zona && set.add(l.zona));
    return Array.from(set).sort();
  }, [leads]);

  const filtered = useMemo(() => {
    const today = todayInMadrid();
    return leads.filter((lead) => {
      if (filterOrigin && lead.procedencia !== filterOrigin) return false;
      if (filterPending === 'pending' && !isPending(lead, today)) return false;
      if (filterPending === 'new' && lead.estado !== 'Nuevo') return false;
      if (filterPending === 'today' && (!isPending(lead, today) || lead.fechaSeguimiento !== today)) return false;
      if (filterPending === 'overdue' && (!isPending(lead, today) || lead.fechaSeguimiento >= today)) return false;
      if (filterEstado && lead.estado !== filterEstado) return false;
      if (filterZona && lead.zona !== filterZona) return false;
      if (search) {
        const q = search.toLowerCase();
        const haystack = `${lead.nombre} ${lead.email} ${lead.telefono}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    }).sort((a, b) => Number(isPending(b, today)) - Number(isPending(a, today)) || Number(b.estado === 'Nuevo') - Number(a.estado === 'Nuevo') || (a.fechaSeguimiento || '9999').localeCompare(b.fechaSeguimiento || '9999'));
  }, [leads, search, filterEstado, filterZona, filterOrigin, filterPending]);

  const handleUpdate = async (
    lead: Lead,
    updates: LeadUpdates
  ) => {
    const res = await fetch(`/api/admin/leads/${lead.id}?source=${lead.source}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('No se han guardado los cambios. Recarga el panel e inténtalo de nuevo.');
    if (res.ok) {
      // El identificador permanece estable aunque se reordene la hoja.
      setLeads((prev) =>
        prev.map((l) =>
          l.id === lead.id && l.source === lead.source ? { ...l, ...updates } : l
        )
      );
      if (selectedLead && selectedLead.id === lead.id && selectedLead.source === lead.source) {
        setSelectedLead({ ...selectedLead, ...updates });
      }
    }
  };

  const markContacted = async (lead: Lead) => {
    setUpdatingId(lead.id);
    setActionError('');
    try { await handleUpdate(lead, { estado: 'Contactado' }); }
    catch (error) { setActionError(error instanceof Error ? error.message : 'Error al guardar'); }
    finally { setUpdatingId(''); }
  };

  const showQueue = (queue: string) => {
    setSearch(''); setFilterEstado(''); setFilterZona(''); setFilterOrigin(''); setFilterPending(queue);
  };

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

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)]">Leads</h1>
        <p className="text-[rgb(130,131,130)] mt-1">
          {filtered.length} {filtered.length === 1 ? 'lead' : 'leads'}
          {filtered.length !== leads.length && ` de ${leads.length} totales`}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Nuevos sin contactar', value: counts.nuevos, queue: 'new' },
          { label: 'Pendientes de hoy', value: counts.hoy, queue: 'today' },
          { label: 'Seguimientos atrasados', value: counts.atrasados, queue: 'overdue' },
        ].map(item => <button key={item.queue} onClick={() => showQueue(item.queue)} aria-pressed={filterPending === item.queue} className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm hover:border-blue-500 focus-visible:outline-2 focus-visible:outline-blue-600">
          <span className="block text-sm text-slate-600">{item.label}</span>
          <span className="block text-3xl font-bold text-slate-900 mt-2">{item.value}</span>
        </button>)}
      </div>
      {actionError && <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-800">{actionError}</p>}
      {/* Filtros */}
      <div className="bg-white rounded-2xl shadow-md border border-[rgb(200,207,210)] p-4 flex flex-wrap gap-3">
        <select aria-label="Procedencia" value={filterOrigin} onChange={e => setFilterOrigin(e.target.value)} className="border rounded-xl px-3 py-2 bg-white">
          <option value="">Todas las procedencias</option>
          {Array.from(new Set(leads.map(lead => lead.procedencia).filter(Boolean))).sort().map(origin => <option key={origin}>{origin}</option>)}
        </select>
        <select aria-label="Pendientes" value={filterPending} onChange={e => setFilterPending(e.target.value)} className="border rounded-xl px-3 py-2 bg-white">
          <option value="">Todo el seguimiento</option>
          <option value="pending">Pendientes de hoy y atrasados</option>
          <option value="new">Nuevos sin contactar</option>
          <option value="today">Pendientes de hoy</option>
          <option value="overdue">Seguimientos atrasados</option>
        </select>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(130,131,130)]" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o teléfono..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgb(200,207,210)] focus:border-[rgb(0,94,184)] outline-none text-sm text-[rgb(31,41,51)]"
          />
        </div>
        <select
          value={filterEstado}
          onChange={(e) => setFilterEstado(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-[rgb(200,207,210)] focus:border-[rgb(0,94,184)] outline-none text-sm text-[rgb(31,41,51)] bg-white"
        >
          <option value="">Todos los estados</option>
          {ESTADOS.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <select
          value={filterZona}
          onChange={(e) => setFilterZona(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-[rgb(200,207,210)] focus:border-[rgb(0,94,184)] outline-none text-sm text-[rgb(31,41,51)] bg-white"
        >
          <option value="">Todas las zonas</option>
          {zonas.map((z) => (
            <option key={z} value={z}>
              {z}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl shadow-md border border-[rgb(200,207,210)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[rgb(232,237,238)] border-b border-[rgb(200,207,210)]">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-[rgb(31,41,51)]">Fecha</th>
                <th className="text-left px-4 py-3 font-semibold text-[rgb(31,41,51)]">Nombre</th>
                <th className="text-left px-4 py-3 font-semibold text-[rgb(31,41,51)]">Contacto</th>
                <th className="text-left px-4 py-3 font-semibold text-[rgb(31,41,51)]">Zona</th>
                <th className="text-left px-4 py-3 font-semibold text-[rgb(31,41,51)]">Procedencia y seguimiento</th>
                <th className="text-left px-4 py-3 font-semibold text-[rgb(31,41,51)]">Estado</th>
                <th className="text-left px-4 py-3 font-semibold text-[rgb(31,41,51)]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-[rgb(130,131,130)]">
                    No hay leads que coincidan con los filtros
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr
                    key={`${lead.source}-${lead.id}-${lead.row}`}
                    className="border-b border-[rgb(232,237,238)] hover:bg-[rgb(232,237,238)]/50 cursor-pointer transition"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="px-4 py-3 text-[rgb(130,131,130)] whitespace-nowrap">{lead.fecha}</td>
                    <td className="px-4 py-3 font-semibold text-[rgb(31,41,51)]">
                      <div className="flex items-center gap-2">
                        <span>{lead.nombre}</span>
                        {contactKeys(lead).some(key => duplicateContacts.has(key)) && <span className="text-xs rounded-full bg-amber-100 text-amber-900 px-2 py-1">Contacto repetido</span>}
                        {lead.source === 'guia' && (
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border bg-purple-100 text-purple-700 border-purple-200 whitespace-nowrap">
                            GUÍA
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[rgb(130,131,130)]">
                      <div>{lead.telefono}</div>
                      {lead.email && <div className="text-xs">{lead.email}</div>}
                    </td>
                    <td className="px-4 py-3 text-[rgb(130,131,130)]">{lead.zona}</td>
                    <td className="px-4 py-3 text-[rgb(130,131,130)]">
                      <div className="font-semibold text-slate-700">{lead.procedencia || 'Registro histórico'}</div>
                      <div>{lead.interes}</div>
                      <div className="text-xs">{lead.formulario}</div>
                      {lead.fechaSeguimiento && <div className={isPending(lead, todayInMadrid()) ? 'text-amber-800 font-semibold' : 'text-slate-600'}>{lead.fechaSeguimiento} · {lead.proximaAccion || 'Seguimiento'}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          ESTADO_COLORS[lead.estado] || ESTADO_COLORS.Nuevo
                        }`}
                      >
                        {lead.estado || 'Nuevo'}
                      </span>
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-1">
                        {lead.estado === 'Nuevo' && <button disabled={!!updatingId} onClick={() => void markContacted(lead)} className="rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-800 disabled:opacity-50">{updatingId === lead.id ? 'Guardando…' : 'Contactado'}</button>}
                        {!['Convertido', 'Descartado', 'Valoración realizada'].includes(lead.estado) && <button onClick={() => setSelectedLead({ ...lead, estado: 'Valoración agendada', proximaAccion: lead.proximaAccion || 'Realizar valoración' })} className="rounded-lg bg-green-50 px-2 py-1 text-xs font-semibold text-green-800">Agendar valoración</button>}
                        <a
                          href={`tel:${lead.telefono}`}
                          className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition"
                          title="Llamar"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <a
                          href={`https://wa.me/${normalizeLeadPhone(lead.telefono)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center hover:bg-green-200 transition"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        {lead.email && (
                          <a
                            href={`mailto:${lead.email}`}
                            className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center hover:bg-orange-200 transition"
                            title="Email"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de detalle */}
      {selectedLead && (
        <LeadDetailModal
          key={`${selectedLead.source}-${selectedLead.id}`}
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={handleUpdate}
          onDelete={async (lead) => {
            const res = await fetch(`/api/admin/leads/${lead.id}?source=${lead.source}`, { method: 'DELETE' });
            if (!res.ok) {
              const data = await res.json().catch(() => ({}));
              throw new Error(data.error || 'No se pudo borrar el contacto');
            }
            setLeads(prev => prev.filter(item => item.id !== lead.id || item.source !== lead.source));
            setSelectedLead(null);
          }}
          relatedLeads={getRelatedLeads(selectedLead, leads)}
          onSelect={setSelectedLead}
        />
      )}
    </div>
  );
}

function LeadDetailModal({
  lead,
  onClose,
  onUpdate,
  onDelete,
  relatedLeads,
  onSelect,
}: {
  lead: Lead;
  onClose: () => void;
  onUpdate: (lead: Lead, updates: LeadUpdates) => Promise<void>;
  onDelete: (lead: Lead) => Promise<void>;
  relatedLeads: Lead[];
  onSelect: (lead: Lead) => void;
}) {
  const [estado, setEstado] = useState(lead.estado || 'Nuevo');
  const [notas, setNotas] = useState(lead.notas || '');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [proximaAccion, setProximaAccion] = useState(lead.proximaAccion);
  const [fechaSeguimiento, setFechaSeguimiento] = useState(lead.fechaSeguimiento);
  const [motivoDescarte, setMotivoDescarte] = useState(lead.motivoDescarte);

  const handleSave = async () => {
    setSaving(true);
    setSaveError('');
    try {
      await onUpdate(lead, { estado, notas, proximaAccion, fechaSeguimiento, motivoDescarte });
      onClose();
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Error al guardar');
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!window.confirm(`¿Borrar definitivamente el lead de ${lead.nombre}? Se eliminarán sus datos del panel y de Google Sheets. Esta acción no se puede deshacer.`)) return;
    setSaving(true);
    setSaveError('');
    try { await onDelete(lead); }
    catch (error) { setSaveError(error instanceof Error ? error.message : 'No se pudo borrar el contacto'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[rgb(200,207,210)]">
          <div>
            <h2 className="text-2xl font-black text-[rgb(31,41,51)]">{lead.nombre}</h2>
            <p className="text-sm text-[rgb(130,131,130)] mt-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {lead.fecha}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[rgb(232,237,238)] hover:bg-[rgb(200,207,210)] flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Datos de contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={`tel:${lead.telefono}`}
              className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-[rgb(130,131,130)]">Teléfono</p>
                <p className="font-semibold text-[rgb(31,41,51)]">{lead.telefono}</p>
              </div>
            </a>

            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[rgb(130,131,130)]">Email</p>
                  <p className="font-semibold text-[rgb(31,41,51)] truncate">{lead.email}</p>
                </div>
              </a>
            )}

            <div className="flex items-center gap-3 p-4 bg-[rgb(232,237,238)] rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-[rgb(0,94,184)] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-[rgb(130,131,130)]">Zona</p>
                <p className="font-semibold text-[rgb(31,41,51)]">{lead.zona || 'No especificada'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-[rgb(232,237,238)] rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-[rgb(0,94,184)] flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-[rgb(130,131,130)]">Interés</p>
                <p className="font-semibold text-[rgb(31,41,51)]">{lead.interes || 'No especificado'}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 space-y-2 text-slate-800">
            <p><strong>Procedencia:</strong> {lead.procedencia || 'No registrada (contacto histórico)'}</p>
            <p><strong>Página:</strong> {lead.ruta || 'No registrada'}</p>
            <p><strong>Formulario:</strong> {lead.formulario || 'No registrado'}</p>
            {lead.mensaje && <p className="whitespace-pre-wrap"><strong>Mensaje:</strong> {lead.mensaje}</p>}
          </div>
          {relatedLeads.length > 0 && <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-3" aria-label="Historial de solicitudes relacionadas">
            <h3 className="font-semibold text-slate-900">Otras solicitudes de este contacto ({relatedLeads.length})</h3>
            <p className="text-xs text-slate-700">Coinciden en teléfono o email. Cada solicitud conserva su propio seguimiento.</p>
            {relatedLeads.map(other => <button key={`${other.source}-${other.id}-${other.row}`} onClick={() => onSelect(other)} className="block w-full rounded-lg bg-white border border-amber-200 p-3 text-left hover:border-amber-500">
              <span className="block font-semibold text-slate-900">{other.fecha} · {other.estado}</span>
              <span className="block text-sm text-slate-700">{other.procedencia || 'Registro histórico'} · {other.interes}</span>
              {other.mensaje && <span className="block text-sm text-slate-600 line-clamp-2">{other.mensaje}</span>}
            </button>)}
          </section>}
          {/* WhatsApp button */}
          <a
            href={`https://wa.me/${normalizeLeadPhone(lead.telefono)}?text=Hola%20${encodeURIComponent(lead.nombre)},%20te%20contacto%20desde%20ANTEA%20Salud`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition"
          >
            <MessageCircle className="w-5 h-5" /> Abrir WhatsApp
          </a>

          {/* Estado */}
          <div>
            <label className="block text-sm font-semibold text-[rgb(31,41,51)] mb-2">Estado</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[rgb(200,207,210)] focus:border-[rgb(0,94,184)] outline-none text-[rgb(31,41,51)] bg-white"
            >
              {ESTADOS.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold">Próxima acción
              <input value={proximaAccion} onChange={e => setProximaAccion(e.target.value)} maxLength={200} placeholder="Ej.: llamar para confirmar la valoración" className="block w-full border rounded-xl px-4 py-3 mt-2" />
            </label>
            <label className="block text-sm font-semibold">Fecha de seguimiento
              <input type="date" value={fechaSeguimiento} onChange={e => setFechaSeguimiento(e.target.value)} className="block w-full border rounded-xl px-4 py-3 mt-2" />
            </label>
            {estado === 'Descartado' && <label className="block text-sm font-semibold">Motivo de descarte
              <input value={motivoDescarte} onChange={e => setMotivoDescarte(e.target.value)} maxLength={300} placeholder="Zona, precio, sin respuesta…" className="block w-full border rounded-xl px-4 py-3 mt-2" />
            </label>}
            {saveError && <p role="alert" className="text-red-700">{saveError}</p>}
          </div>
          {/* Notas */}
          <div>
            <label className="text-sm font-semibold text-[rgb(31,41,51)] mb-2 flex items-center gap-1.5">
              <StickyNote className="w-4 h-4" /> Notas internas
            </label>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              rows={4}
              placeholder="Añade comentarios sobre el seguimiento..."
              className="w-full px-4 py-3 rounded-xl border border-[rgb(200,207,210)] focus:border-[rgb(0,94,184)] outline-none text-[rgb(31,41,51)] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap justify-end gap-3 p-6 border-t border-[rgb(200,207,210)]">
          <button onClick={handleDelete} disabled={saving} className="mr-auto inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60">
            <Trash2 className="h-4 w-4" aria-hidden="true" /> Borrar lead
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-semibold text-[rgb(31,41,51)] hover:bg-[rgb(232,237,238)] transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-[rgb(32,113,188)] to-[rgb(0,94,184)] text-white shadow-md hover:shadow-lg transition inline-flex items-center gap-2 disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
