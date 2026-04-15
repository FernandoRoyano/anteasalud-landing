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
} from 'lucide-react';
import type { Lead } from '@/lib/types';

const ESTADOS = ['Nuevo', 'Contactado', 'En seguimiento', 'Convertido', 'Descartado'];

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
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const loadLeads = () => {
    setLoading(true);
    fetch('/api/admin/leads')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setLeads((data.leads || []).reverse()); // más recientes primero
      })
      .catch(() => setError('Error al cargar los leads'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const zonas = useMemo(() => {
    const set = new Set<string>();
    leads.forEach((l) => l.zona && set.add(l.zona));
    return Array.from(set).sort();
  }, [leads]);

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      if (filterEstado && lead.estado !== filterEstado) return false;
      if (filterZona && lead.zona !== filterZona) return false;
      if (search) {
        const q = search.toLowerCase();
        const haystack = `${lead.nombre} ${lead.email} ${lead.telefono}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [leads, search, filterEstado, filterZona]);

  const handleUpdate = async (
    lead: Lead,
    updates: { estado?: string; notas?: string }
  ) => {
    const res = await fetch(`/api/admin/leads/${lead.row}?source=${lead.source}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      // Actualizar local sin recargar todo. Importante: matchear por row+source
      // porque dos leads pueden tener la misma row en pestañas distintas.
      setLeads((prev) =>
        prev.map((l) =>
          l.row === lead.row && l.source === lead.source ? { ...l, ...updates } : l
        )
      );
      if (selectedLead && selectedLead.row === lead.row && selectedLead.source === lead.source) {
        setSelectedLead({ ...selectedLead, ...updates });
      }
    }
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

      {/* Filtros */}
      <div className="bg-white rounded-2xl shadow-md border border-[rgb(200,207,210)] p-4 flex flex-col md:flex-row gap-3">
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
                <th className="text-left px-4 py-3 font-semibold text-[rgb(31,41,51)]">Interés</th>
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
                    key={`${lead.source}-${lead.row}`}
                    className="border-b border-[rgb(232,237,238)] hover:bg-[rgb(232,237,238)]/50 cursor-pointer transition"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="px-4 py-3 text-[rgb(130,131,130)] whitespace-nowrap">{lead.fecha}</td>
                    <td className="px-4 py-3 font-semibold text-[rgb(31,41,51)]">
                      <div className="flex items-center gap-2">
                        <span>{lead.nombre}</span>
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
                    <td className="px-4 py-3 text-[rgb(130,131,130)]">{lead.interes}</td>
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
                        <a
                          href={`tel:${lead.telefono}`}
                          className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition"
                          title="Llamar"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <a
                          href={`https://wa.me/34${lead.telefono.replace(/\D/g, '')}`}
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
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

function LeadDetailModal({
  lead,
  onClose,
  onUpdate,
}: {
  lead: Lead;
  onClose: () => void;
  onUpdate: (lead: Lead, updates: { estado?: string; notas?: string }) => Promise<void>;
}) {
  const [estado, setEstado] = useState(lead.estado || 'Nuevo');
  const [notas, setNotas] = useState(lead.notas || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onUpdate(lead, { estado, notas });
    setSaving(false);
    onClose();
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

          {/* WhatsApp button */}
          <a
            href={`https://wa.me/34${lead.telefono.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(lead.nombre)},%20te%20contacto%20desde%20ANTEA%20Salud`}
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
        <div className="flex justify-end gap-3 p-6 border-t border-[rgb(200,207,210)]">
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
