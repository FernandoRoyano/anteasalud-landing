"use client";

import { useEffect, useState, FormEvent } from 'react';
import {
  Loader2,
  Plus,
  Phone,
  MapPin,
  Pencil,
  X,
  Trash2,
  UserCircle,
} from 'lucide-react';
import {
  type Client,
  type Zone,
  ZONE_LABELS,
  ZONE_SURCHARGE,
  CLIENT_COLORS,
} from '@/lib/types';

// Precio base por modalidad
const PRECIOS_BASE = {
  pack: 35,
  suelta: 45,
};

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [showInactive, setShowInactive] = useState(false);

  const loadClients = () => {
    setLoading(true);
    fetch('/api/admin/clients')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setClients(data.clients || []);
      })
      .catch(() => setError('Error al cargar clientes'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadClients();
  }, []);

  const visible = clients.filter((c) => showInactive || c.active);

  const handleSave = async (data: Partial<Client>) => {
    const url = editing ? `/api/admin/clients/${editing.id}` : '/api/admin/clients';
    const method = editing ? 'PATCH' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setModalOpen(false);
      setEditing(null);
      loadClients();
    }
  };

  const handleDelete = async (client: Client) => {
    if (!confirm(`¿Desactivar a ${client.name}? Sus sesiones se conservan.`)) return;
    const res = await fetch(`/api/admin/clients/${client.id}`, { method: 'DELETE' });
    if (res.ok) loadClients();
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
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)]">Clientes</h1>
          <p className="text-[rgb(130,131,130)] mt-1">
            {visible.length} {visible.length === 1 ? 'cliente' : 'clientes'}
            {!showInactive && clients.length > visible.length && ` · ${clients.length - visible.length} inactivos`}
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold bg-gradient-to-r from-[rgb(32,113,188)] to-[rgb(0,94,184)] text-white shadow-md hover:shadow-lg transition"
        >
          <Plus className="w-5 h-5" /> Nuevo cliente
        </button>
      </div>

      {/* Toggle inactivos */}
      <label className="inline-flex items-center gap-2 text-sm text-[rgb(130,131,130)] cursor-pointer">
        <input
          type="checkbox"
          checked={showInactive}
          onChange={(e) => setShowInactive(e.target.checked)}
          className="accent-[rgb(0,94,184)]"
        />
        Mostrar clientes inactivos
      </label>

      {/* Lista */}
      {visible.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-[rgb(200,207,210)] p-12 text-center">
          <UserCircle className="w-12 h-12 text-[rgb(130,131,130)] mx-auto mb-4" />
          <p className="text-[rgb(130,131,130)] mb-6">No hay clientes todavía</p>
          <button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold bg-[rgb(0,94,184)] text-white hover:bg-[rgb(32,113,188)] transition"
          >
            <Plus className="w-5 h-5" /> Añadir primer cliente
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visible.map((client) => (
            <div
              key={client.id}
              className={`bg-white rounded-2xl shadow-md border-2 p-5 transition ${
                client.active ? 'border-[rgb(200,207,210)]' : 'border-[rgb(232,237,238)] opacity-60'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0"
                  style={{ backgroundColor: client.color }}
                >
                  {client.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-[rgb(31,41,51)] text-lg">{client.name}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-[rgb(130,131,130)]">
                    {client.phone && (
                      <span className="inline-flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" /> {client.phone}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {ZONE_LABELS[client.zone].split(' (')[0]}
                    </span>
                  </div>
                  {client.notes && (
                    <p className="text-xs text-[rgb(130,131,130)] mt-2 italic">{client.notes}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgb(232,237,238)]">
                <div>
                  <p className="text-xs text-[rgb(130,131,130)]">Precio por sesión</p>
                  <p className="font-black text-xl text-[rgb(0,94,184)]">{client.pricePerSession}€</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(client);
                      setModalOpen(true);
                    }}
                    className="w-9 h-9 rounded-lg bg-[rgb(191,231,249)] text-[rgb(0,94,184)] flex items-center justify-center hover:bg-[rgb(0,94,184)] hover:text-white transition"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  {client.active && (
                    <button
                      onClick={() => handleDelete(client)}
                      className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition"
                      title="Desactivar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de alta/edición */}
      {modalOpen && (
        <ClientFormModal
          client={editing}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function ClientFormModal({
  client,
  onClose,
  onSave,
}: {
  client: Client | null;
  onClose: () => void;
  onSave: (data: Partial<Client>) => Promise<void>;
}) {
  const [name, setName] = useState(client?.name || '');
  const [phone, setPhone] = useState(client?.phone || '');
  const [address, setAddress] = useState(client?.address || '');
  const [zone, setZone] = useState<Zone>(client?.zone || 'capital');
  const [modalidad, setModalidad] = useState<'pack' | 'suelta' | 'custom'>(
    client ? 'custom' : 'pack'
  );
  const [customPrice, setCustomPrice] = useState(client?.pricePerSession || 35);
  const [color, setColor] = useState(client?.color || CLIENT_COLORS[0]);
  const [notes, setNotes] = useState(client?.notes || '');
  const [saving, setSaving] = useState(false);

  const basePrice = modalidad === 'pack' ? PRECIOS_BASE.pack : modalidad === 'suelta' ? PRECIOS_BASE.suelta : customPrice;
  const surcharge = ZONE_SURCHARGE[zone];
  const finalPrice = modalidad === 'custom' ? customPrice : basePrice + surcharge;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    await onSave({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      zone,
      pricePerSession: finalPrice,
      color,
      notes: notes.trim(),
      active: true,
    });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-[rgb(200,207,210)]">
          <h2 className="text-xl font-black text-[rgb(31,41,51)]">
            {client ? 'Editar cliente' : 'Nuevo cliente'}
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[rgb(232,237,238)] hover:bg-[rgb(200,207,210)] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1.5">Nombre *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
              placeholder="Ej: Tino García"
              className="w-full px-4 py-3 rounded-xl border border-[rgb(200,207,210)] focus:border-[rgb(0,94,184)] outline-none text-[rgb(31,41,51)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1.5">Teléfono</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="600 000 000"
                className="w-full px-4 py-3 rounded-xl border border-[rgb(200,207,210)] focus:border-[rgb(0,94,184)] outline-none text-[rgb(31,41,51)]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1.5">Zona</label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value as Zone)}
                className="w-full px-4 py-3 rounded-xl border border-[rgb(200,207,210)] focus:border-[rgb(0,94,184)] outline-none text-[rgb(31,41,51)] bg-white"
              >
                {Object.entries(ZONE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1.5">Dirección</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Calle, número, piso..."
              className="w-full px-4 py-3 rounded-xl border border-[rgb(200,207,210)] focus:border-[rgb(0,94,184)] outline-none text-[rgb(31,41,51)]"
            />
          </div>

          {/* Modalidad y precio */}
          <div>
            <label className="block text-sm font-semibold text-[rgb(31,41,51)] mb-2">Modalidad</label>
            <div className="grid grid-cols-3 gap-2">
              {(['pack', 'suelta', 'custom'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setModalidad(m)}
                  className={`py-2.5 px-3 rounded-xl border-2 font-semibold text-sm transition ${
                    modalidad === m
                      ? 'border-[rgb(0,94,184)] bg-[rgb(191,231,249)] text-[rgb(0,94,184)]'
                      : 'border-[rgb(200,207,210)] bg-white text-[rgb(130,131,130)] hover:border-[rgb(0,94,184)]'
                  }`}
                >
                  {m === 'pack' && 'Plan 2/sem (35€)'}
                  {m === 'suelta' && 'Sesión suelta (45€)'}
                  {m === 'custom' && 'Personalizado'}
                </button>
              ))}
            </div>

            {modalidad === 'custom' && (
              <input
                type="number"
                value={customPrice}
                onChange={(e) => setCustomPrice(Number(e.target.value))}
                min="0"
                step="1"
                placeholder="Precio base €"
                className="mt-3 w-full px-4 py-3 rounded-xl border border-[rgb(200,207,210)] focus:border-[rgb(0,94,184)] outline-none text-[rgb(31,41,51)]"
              />
            )}

            {/* Desglose del precio final */}
            <div className="mt-3 p-4 bg-[rgb(232,237,238)] rounded-xl">
              <div className="flex justify-between text-sm text-[rgb(130,131,130)]">
                <span>Precio base</span>
                <span>{basePrice}€</span>
              </div>
              {modalidad !== 'custom' && surcharge > 0 && (
                <div className="flex justify-between text-sm text-orange-600">
                  <span>+ Recargo zona</span>
                  <span>+{surcharge}€</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-black text-[rgb(0,94,184)] mt-2 pt-2 border-t border-[rgb(200,207,210)]">
                <span>Precio final</span>
                <span>{finalPrice}€/sesión</span>
              </div>
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-semibold text-[rgb(31,41,51)] mb-2">
              Color identificativo
            </label>
            <div className="flex flex-wrap gap-2">
              {CLIENT_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full transition-transform ${
                    color === c ? 'ring-2 ring-offset-2 ring-[rgb(0,94,184)] scale-110' : ''
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1.5">Notas internas</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Condición física, indicaciones médicas..."
              className="w-full px-4 py-3 rounded-xl border border-[rgb(200,207,210)] focus:border-[rgb(0,94,184)] outline-none text-[rgb(31,41,51)] resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[rgb(200,207,210)]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-semibold text-[rgb(31,41,51)] hover:bg-[rgb(232,237,238)] transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving || !name.trim()}
              className="px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-[rgb(32,113,188)] to-[rgb(0,94,184)] text-white shadow-md hover:shadow-lg transition inline-flex items-center gap-2 disabled:opacity-60"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {client ? 'Guardar' : 'Crear cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
