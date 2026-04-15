"use client";

import { useEffect, useState, useMemo } from 'react';
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Check,
  AlertCircle,
  Trash2,
  CalendarDays,
  MessageCircle,
  RefreshCw,
} from 'lucide-react';
import {
  type Client,
  type Session,
  type SessionStatus,
  SESSION_STATUS_COLORS,
} from '@/lib/types';
import SessionReminders from '@/components/admin/SessionReminders';

const DAY_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const MONTH_LABELS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

function toISODate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isSameDay(iso: string, d: Date): boolean {
  return iso === toISODate(d);
}

function isPastOrToday(date: Date): boolean {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return date <= today;
}

export default function SesionesPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [addingDate, setAddingDate] = useState<string | null>(null);

  const loadAll = async () => {
    const [cRes, sRes] = await Promise.all([
      fetch('/api/admin/clients').then((r) => r.json()),
      fetch('/api/admin/sessions').then((r) => r.json()),
    ]);
    const activeClients = (cRes.clients || []).filter((c: Client) => c.active);
    setClients(activeClients);
    setSessions((sRes.sessions || []).filter((s: Session) => s.id));
    if (activeClients.length > 0 && !selectedClientId) {
      setSelectedClientId(activeClients[0].id);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
    // Refrescar automáticamente cuando el usuario vuelve a la pestaña
    const onFocus = () => loadAll();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mantener selectedSession sincronizado con la lista de sesiones.
  // Cuando una sesión optimista (temp_xxx) se reemplaza con la real tras
  // sincronizar con el servidor, refrescamos la referencia del modal.
  useEffect(() => {
    if (!selectedSession) return;
    const real = sessions.find(
      (s) =>
        s.clientId === selectedSession.clientId &&
        s.date === selectedSession.date &&
        !!s.id &&
        !s.id.startsWith('temp_')
    );
    if (real && real.id !== selectedSession.id) {
      setSelectedSession(real);
    }
  }, [sessions, selectedSession]);

  const selectedClient = clients.find((c) => c.id === selectedClientId);
  const clientSessions = useMemo(
    () => sessions.filter((s) => s.clientId === selectedClientId),
    [sessions, selectedClientId]
  );

  // Estadísticas del mes para el cliente seleccionado
  const monthStats = useMemo(() => {
    const ms = clientSessions.filter((s) => {
      const d = new Date(s.date);
      return d.getMonth() === month && d.getFullYear() === year;
    });

    // Sesiones falladas del mes anterior (sin recuperar) → crédito a descontar
    const prevMonthDate = new Date(year, month - 1, 1);
    const prevMonth = prevMonthDate.getMonth();
    const prevYear = prevMonthDate.getFullYear();
    const prevMissed = clientSessions.filter((s) => {
      const d = new Date(s.date);
      return (
        d.getMonth() === prevMonth &&
        d.getFullYear() === prevYear &&
        s.status === 'missed' &&
        s.isPending
      );
    });

    return {
      total: ms.length,
      completed: ms.filter((s) => s.status === 'completed').length,
      scheduled: ms.filter((s) => s.status === 'scheduled').length,
      missed: ms.filter((s) => s.status === 'missed').length,
      prevMonthMissed: prevMissed.length,
    };
  }, [clientSessions, month, year]);

  const price = selectedClient?.pricePerSession || 0;
  // Modelo de compromiso: cuentan TODAS las sesiones del mes (realizadas + programadas + falladas).
  // Las falladas del mes anterior (sin recuperar) se descuentan como crédito.
  const sesionesDelMes = monthStats.completed + monthStats.scheduled + monthStats.missed;
  const ingresoBruto = sesionesDelMes * price;
  const credito = monthStats.prevMonthMissed * price;
  const totalACobrar = Math.max(0, ingresoBruto - credito);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  // Generar celdas del calendario
  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

    // Primer día: calcular offset (Lunes = 0)
    const startOffset = (firstDay.getDay() + 6) % 7;
    for (let i = 0; i < startOffset; i++) days.push(null);

    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }

    // Rellenar hasta 42 (6 filas)
    while (days.length < 42) days.push(null);

    return days;
  }, [month, year]);

  const handleSendInvoice = () => {
    if (!selectedClient) return;
    if (!selectedClient.phone) {
      alert('Este cliente no tiene teléfono registrado. Edítalo en /admin/clientes.');
      return;
    }
    if (sesionesDelMes === 0) {
      alert('No hay sesiones programadas este mes.');
      return;
    }

    // Sesiones del mes actual que se cobran (completed + scheduled + missed)
    // Parseamos la fecha manualmente para evitar problemas de timezone
    const sesionesMes = clientSessions
      .filter((s) => {
        if (!s.date || !s.id) return false;
        const [y, mo] = s.date.split('-').map(Number);
        return mo - 1 === month && y === year && ['completed', 'scheduled', 'missed'].includes(s.status);
      })
      .sort((a, b) => a.date.localeCompare(b.date));

    const dayNames = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
    const diasLista = sesionesMes
      .map((s) => {
        const [y, mo, d] = s.date.split('-').map(Number);
        const fecha = new Date(y, mo - 1, d);
        return `${dayNames[fecha.getDay()]} ${d}`;
      })
      .join(', ');

    const monthName = MONTH_LABELS[month];
    // Si hay contacto de pagos distinto al cliente, dirigir el mensaje al contacto
    // e indicar que el resumen es de las sesiones del cliente
    const greeting = selectedClient.contactName
      ? `Hola ${selectedClient.contactName}!`
      : `Hola ${selectedClient.name}!`;
    const descripcion = selectedClient.contactName
      ? `Te paso el resumen de las sesiones de ${selectedClient.name} en *${monthName} ${year}*:`
      : `Te paso el resumen de *${monthName} ${year}*:`;

    const sesionLabel = sesionesDelMes === 1 ? 'sesión' : 'sesiones';

    let mensaje = `${greeting}\n\n${descripcion}\n\n`;
    mensaje += `*${sesionesDelMes} ${sesionLabel}:* ${diasLista}\n`;
    mensaje += `*Precio:* ${sesionesDelMes} x ${price}€ = ${ingresoBruto}€\n`;

    if (credito > 0) {
      mensaje += `*Crédito mes anterior* (${monthStats.prevMonthMissed} sin recuperar): -${credito}€\n`;
    }

    mensaje += `\n*TOTAL A PAGAR: ${totalACobrar}€*\n\n`;
    mensaje += `Puedes pagarlo por Bizum al 633 261 963, transferencia bancaria o efectivo.\n\n`;
    mensaje += `¡Muchas gracias!`;

    // Normalizar teléfono: quitar no-dígitos y asegurar prefijo 34
    const phoneDigits = selectedClient.phone.replace(/\D/g, '');
    const waPhone = phoneDigits.startsWith('34') ? phoneDigits : `34${phoneDigits}`;
    const url = `https://wa.me/${waPhone}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const handleAddSession = async (date: string) => {
    if (!selectedClientId) return;

    const tempId = `temp_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const now = new Date().toISOString();
    const optimistic: Session = {
      id: tempId,
      clientId: selectedClientId,
      date,
      status: 'scheduled',
      isPending: false,
      missedReason: '',
      linkedToSessionId: '',
      notes: '',
      createdAt: now,
      updatedAt: now,
    };

    // Cierra modal y añade al estado de inmediato
    setAddingDate(null);
    setSessions((prev) => [...prev, optimistic]);

    try {
      const res = await fetch('/api/admin/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: selectedClientId,
          date,
          status: 'scheduled',
          isPending: false,
        }),
      });
      if (res.ok) {
        const { session } = await res.json();
        setSessions((prev) => prev.map((s) => (s.id === tempId ? session : s)));
      } else {
        setSessions((prev) => prev.filter((s) => s.id !== tempId));
        alert('Error al crear la sesión');
      }
    } catch {
      setSessions((prev) => prev.filter((s) => s.id !== tempId));
      alert('Error de conexión al crear la sesión');
    }
  };

  const handleUpdateSession = async (id: string, updates: Partial<Session>) => {
    // Si el id es temporal, la sesión aún no se ha sincronizado con Sheets
    if (id.startsWith('temp_')) {
      alert('La sesión aún se está guardando, espera 1-2 segundos e inténtalo de nuevo.');
      return;
    }

    // Optimistic update local
    const previous = sessions.find((s) => s.id === id);
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s))
    );
    setSelectedSession(null);

    try {
      const res = await fetch(`/api/admin/sessions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error('PATCH session failed:', res.status, errData);
        if (previous) setSessions((prev) => prev.map((s) => (s.id === id ? previous : s)));
        alert(`Error al actualizar: ${errData.error || `HTTP ${res.status}`}`);
      }
    } catch (err) {
      console.error('PATCH session network error:', err);
      if (previous) setSessions((prev) => prev.map((s) => (s.id === id ? previous : s)));
      alert('Error de conexión al actualizar');
    }
  };

  const handleDeleteSession = async (id: string) => {
    if (id.startsWith('temp_')) {
      alert('La sesión aún se está guardando, espera 1-2 segundos e inténtalo de nuevo.');
      return;
    }

    if (!confirm('¿Anular esta sesión?')) return;

    const previous = sessions.find((s) => s.id === id);
    setSessions((prev) => prev.filter((s) => s.id !== id));
    setSelectedSession(null);

    try {
      const res = await fetch(`/api/admin/sessions/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error('DELETE session failed:', res.status, errData);
        if (previous) setSessions((prev) => [...prev, previous]);
        alert(`Error al anular: ${errData.error || `HTTP ${res.status}`}`);
      }
    } catch (err) {
      console.error('DELETE session network error:', err);
      if (previous) setSessions((prev) => [...prev, previous]);
      alert('Error de conexión al anular');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-[rgb(0,94,184)]" />
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)] mb-6">Sesiones</h1>
        <div className="bg-white rounded-2xl shadow-md border border-[rgb(200,207,210)] p-12 text-center">
          <p className="text-[rgb(130,131,130)] mb-4">
            Primero necesitas crear un cliente para poder añadir sesiones.
          </p>
          <a
            href="/admin/clientes"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold bg-[rgb(0,94,184)] text-white hover:bg-[rgb(32,113,188)] transition"
          >
            <Plus className="w-5 h-5" /> Crear primer cliente
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)]">Sesiones</h1>
        <p className="text-[rgb(130,131,130)] mt-1">Calendario mensual por cliente</p>
      </div>

      {/* Recordatorios de sesión */}
      <SessionReminders clients={clients} sessions={sessions} />

      {/* Selector de cliente */}
      <div className="bg-white rounded-2xl shadow-md border border-[rgb(200,207,210)] p-4 flex items-start gap-2">
        <div className="flex-1 flex flex-wrap gap-2">
          {clients.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedClientId(c.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition ${
                selectedClientId === c.id
                  ? 'text-white shadow-md'
                  : 'bg-[rgb(232,237,238)] text-[rgb(31,41,51)] hover:bg-[rgb(200,207,210)]'
              }`}
              style={selectedClientId === c.id ? { backgroundColor: c.color } : {}}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: selectedClientId === c.id ? 'white' : c.color }}
              />
              {c.name}
            </button>
          ))}
        </div>
        <button
          onClick={() => loadAll()}
          className="w-10 h-10 rounded-xl bg-[rgb(232,237,238)] hover:bg-[rgb(200,207,210)] flex items-center justify-center transition flex-shrink-0"
          title="Recargar datos"
          aria-label="Recargar datos"
        >
          <RefreshCw className="w-4 h-4 text-[rgb(31,41,51)]" />
        </button>
      </div>

      {selectedClient && (
        <>
          {/* Stats del mes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatBadge label="Total" value={monthStats.total} />
            <StatBadge label="Realizadas" value={monthStats.completed} color="green" />
            <StatBadge label="Programadas" value={monthStats.scheduled} color="blue" />
            <StatBadge label="Faltó" value={monthStats.missed} color="red" />
          </div>

          {/* Balance del mes */}
          <div className="bg-gradient-to-br from-[rgb(0,94,184)] to-[rgb(0,60,115)] rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-blue-100">Total a cobrar este mes</p>
                <p className="text-4xl md:text-5xl font-black mt-1">{totalACobrar}€</p>
                <p className="text-xs text-blue-200 mt-1">
                  {sesionesDelMes} {sesionesDelMes === 1 ? 'sesión' : 'sesiones'} × {price}€
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                <span className="text-2xl font-black">€</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/20">
              <div className="bg-green-500/20 rounded-xl p-2.5 text-center">
                <p className="text-xs text-blue-100">Realizadas</p>
                <p className="text-lg font-bold mt-0.5">{monthStats.completed}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-2.5 text-center">
                <p className="text-xs text-blue-100">Programadas</p>
                <p className="text-lg font-bold mt-0.5">{monthStats.scheduled}</p>
              </div>
              <div className="bg-red-500/20 rounded-xl p-2.5 text-center">
                <p className="text-xs text-blue-100">Faltó</p>
                <p className="text-lg font-bold mt-0.5">{monthStats.missed}</p>
              </div>
            </div>

            {credito > 0 && (
              <div className="mt-3 bg-orange-500/20 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-100">Crédito mes anterior</p>
                  <p className="text-xs text-blue-200 mt-0.5">
                    {monthStats.prevMonthMissed} fallida(s) sin recuperar
                  </p>
                </div>
                <p className="text-lg font-bold">−{credito}€</p>
              </div>
            )}

            {/* Botón enviar cobro */}
            {sesionesDelMes > 0 && (
              <button
                onClick={handleSendInvoice}
                disabled={!selectedClient?.phone}
                className="mt-4 w-full py-3 rounded-xl font-bold bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transition inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                title={!selectedClient?.phone ? 'El cliente no tiene teléfono registrado' : ''}
              >
                <MessageCircle className="w-5 h-5" />
                Enviar cobro de {MONTH_LABELS[month]} por WhatsApp
              </button>
            )}
          </div>

          {/* Calendario */}
          <div className="bg-white rounded-2xl shadow-md border border-[rgb(200,207,210)] p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevMonth}
                className="w-10 h-10 rounded-lg bg-[rgb(232,237,238)] hover:bg-[rgb(200,207,210)] flex items-center justify-center transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl md:text-2xl font-black text-[rgb(31,41,51)]">
                {MONTH_LABELS[month]} {year}
              </h2>
              <button
                onClick={nextMonth}
                className="w-10 h-10 rounded-lg bg-[rgb(232,237,238)] hover:bg-[rgb(200,207,210)] flex items-center justify-center transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {DAY_LABELS.map((d) => (
                <div
                  key={d}
                  className="text-center text-xs md:text-sm font-bold text-[rgb(130,131,130)] py-2"
                >
                  {d}
                </div>
              ))}
              {calendarDays.map((day, i) => {
                if (!day) return <div key={i} className="aspect-square" />;
                const iso = toISODate(day);
                const sessionsOnDay = clientSessions.filter((s) => s.date === iso && s.status);
                const isToday = isSameDay(iso, new Date());
                const mainSession = sessionsOnDay[0];

                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (sessionsOnDay.length > 0) {
                        setSelectedSession(sessionsOnDay[0]);
                      } else {
                        setAddingDate(iso);
                      }
                    }}
                    className={`aspect-square rounded-lg border-2 p-1 md:p-1.5 flex flex-col justify-between items-stretch transition relative overflow-hidden ${
                      isToday
                        ? 'border-[rgb(0,94,184)] bg-[rgb(191,231,249)]'
                        : sessionsOnDay.length > 0
                        ? 'border-[rgb(200,207,210)] bg-white hover:border-[rgb(0,94,184)]'
                        : 'border-transparent hover:border-[rgb(200,207,210)] hover:bg-[rgb(232,237,238)]'
                    }`}
                  >
                    <span
                      className={`text-xs md:text-sm font-semibold text-left ${
                        isToday ? 'text-[rgb(0,94,184)]' : 'text-[rgb(31,41,51)]'
                      }`}
                    >
                      {day.getDate()}
                    </span>

                    {mainSession && (
                      <div className="flex-1 flex flex-col justify-end gap-0.5">
                        {mainSession.status === 'completed' && (
                          <span className="text-[10px] md:text-xs font-black text-green-600 leading-none">
                            +{price}€
                          </span>
                        )}
                        {mainSession.status === 'missed' && (
                          <span className="text-[10px] md:text-xs font-black text-red-600 leading-none">
                            −{price}€
                          </span>
                        )}
                        {mainSession.status === 'scheduled' && (
                          <span className="text-[10px] md:text-xs font-semibold text-[rgb(130,131,130)] leading-none">
                            {price}€
                          </span>
                        )}
                        <div className="flex gap-0.5">
                          {sessionsOnDay.map((s) => (
                            <div
                              key={s.id}
                              className="h-1 md:h-1.5 flex-1 min-w-[6px] rounded-full"
                              style={{ backgroundColor: SESSION_STATUS_COLORS[s.status] }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Leyenda */}
            <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-[rgb(232,237,238)] text-xs text-[rgb(130,131,130)]">
              <LegendItem color={SESSION_STATUS_COLORS.scheduled} label="Programada" />
              <LegendItem color={SESSION_STATUS_COLORS.completed} label="Realizada" />
              <LegendItem color={SESSION_STATUS_COLORS.missed} label="Faltó" />
              <LegendItem color={SESSION_STATUS_COLORS.recovered} label="Recuperada" />
              <LegendItem color={SESSION_STATUS_COLORS.discounted} label="Descontada" />
            </div>
          </div>
        </>
      )}

      {/* Modal: añadir sesión */}
      {addingDate && (
        <AddSessionDialog
          date={addingDate}
          onConfirm={() => handleAddSession(addingDate)}
          onClose={() => setAddingDate(null)}
        />
      )}

      {/* Modal: acciones sobre sesión */}
      {selectedSession && selectedClient && (
        <SessionActionsModal
          session={selectedSession}
          client={selectedClient}
          onUpdate={(updates) => handleUpdateSession(selectedSession.id, updates)}
          onDelete={() => handleDeleteSession(selectedSession.id)}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
}

function StatBadge({
  label,
  value,
  color = 'gray',
}: {
  label: string;
  value: number;
  color?: 'gray' | 'green' | 'blue' | 'red';
}) {
  const colors = {
    gray: 'bg-[rgb(232,237,238)] text-[rgb(31,41,51)]',
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700',
    red: 'bg-red-100 text-red-700',
  };
  return (
    <div className={`rounded-xl p-4 ${colors[color]}`}>
      <p className="text-xs font-semibold opacity-80">{label}</p>
      <p className="text-2xl font-black mt-0.5">{value}</p>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
  );
}

function AddSessionDialog({
  date,
  onConfirm,
  onClose,
}: {
  date: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const d = new Date(date);
  const label = d.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-black text-[rgb(31,41,51)] mb-2">Añadir sesión</h3>
        <p className="text-[rgb(130,131,130)] mb-6 capitalize">{label}</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl font-semibold text-[rgb(31,41,51)] bg-[rgb(232,237,238)] hover:bg-[rgb(200,207,210)] transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 rounded-xl font-bold bg-[rgb(0,94,184)] text-white hover:bg-[rgb(32,113,188)] transition"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

function SessionActionsModal({
  session,
  client,
  onUpdate,
  onDelete,
  onClose,
}: {
  session: Session;
  client: Client;
  onUpdate: (updates: Partial<Session>) => Promise<void>;
  onDelete: () => void;
  onClose: () => void;
}) {
  const [reason, setReason] = useState(session.missedReason || '');
  const [showMissedInput, setShowMissedInput] = useState(false);
  const [showMoveInput, setShowMoveInput] = useState(false);
  const [newDate, setNewDate] = useState(session.date);
  const [saving, setSaving] = useState(false);

  const date = new Date(session.date);
  const label = date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const isPastOr = isPastOrToday(date);

  const handleCompleted = async () => {
    setSaving(true);
    await onUpdate({ status: 'completed', isPending: false });
    setSaving(false);
  };

  const handleMissed = async () => {
    setSaving(true);
    await onUpdate({ status: 'missed', isPending: true, missedReason: reason });
    setSaving(false);
  };

  const handleRevertToScheduled = async () => {
    setSaving(true);
    await onUpdate({ status: 'scheduled', isPending: false, missedReason: '' });
    setSaving(false);
  };

  const handleMove = async () => {
    if (!newDate || newDate === session.date) {
      setShowMoveInput(false);
      return;
    }
    setSaving(true);
    await onUpdate({ date: newDate });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="p-6 rounded-t-3xl text-white"
          style={{ backgroundColor: client.color }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/80 text-sm">{client.name}</p>
              <h3 className="text-xl font-black capitalize mt-1">{label}</h3>
              <p className="text-white/80 text-xs mt-1">
                Estado: <strong className="capitalize">{session.status}</strong>
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Acciones */}
        <div className="p-6 space-y-3">
          {/* Modo: mover día */}
          {showMoveInput ? (
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-[rgb(31,41,51)]">
                Nueva fecha
              </label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[rgb(200,207,210)] focus:border-[rgb(0,94,184)] outline-none text-[rgb(31,41,51)]"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowMoveInput(false);
                    setNewDate(session.date);
                  }}
                  className="flex-1 px-4 py-3 rounded-xl font-semibold text-[rgb(31,41,51)] bg-[rgb(232,237,238)] hover:bg-[rgb(200,207,210)] transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleMove}
                  disabled={saving || !newDate || newDate === session.date}
                  className="flex-1 px-4 py-3 rounded-xl font-bold bg-[rgb(0,94,184)] text-white hover:bg-[rgb(32,113,188)] transition disabled:opacity-60"
                >
                  {saving ? 'Moviendo...' : 'Mover'}
                </button>
              </div>
            </div>
          ) : showMissedInput ? (
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-[rgb(31,41,51)]">
                Motivo (opcional)
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Ej: Médico, enfermedad..."
                className="w-full px-4 py-3 rounded-xl border border-[rgb(200,207,210)] focus:border-[rgb(0,94,184)] outline-none"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowMissedInput(false)}
                  className="flex-1 px-4 py-3 rounded-xl font-semibold text-[rgb(31,41,51)] bg-[rgb(232,237,238)] hover:bg-[rgb(200,207,210)] transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleMissed}
                  disabled={saving}
                  className="flex-1 px-4 py-3 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-60"
                >
                  Confirmar
                </button>
              </div>
            </div>
          ) : (
            <>
              {session.status === 'scheduled' && isPastOr && (
                <>
                  <button
                    onClick={handleCompleted}
                    disabled={saving}
                    className="w-full px-4 py-3 rounded-xl font-bold bg-green-500 text-white hover:bg-green-600 transition inline-flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <Check className="w-5 h-5" /> Validar (realizada)
                  </button>
                  <button
                    onClick={() => setShowMissedInput(true)}
                    disabled={saving}
                    className="w-full px-4 py-3 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition inline-flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <AlertCircle className="w-5 h-5" /> No pudo venir
                  </button>
                </>
              )}

              {session.status === 'scheduled' && !isPastOr && (
                <p className="text-sm text-[rgb(130,131,130)] text-center bg-[rgb(232,237,238)] rounded-xl p-3">
                  Sesión futura. Podrás validarla cuando llegue el día.
                </p>
              )}

              {(session.status === 'completed' || session.status === 'missed') && (
                <button
                  onClick={handleRevertToScheduled}
                  disabled={saving}
                  className="w-full px-4 py-3 rounded-xl font-semibold text-[rgb(31,41,51)] bg-[rgb(232,237,238)] hover:bg-[rgb(200,207,210)] transition disabled:opacity-60"
                >
                  Revertir a programada
                </button>
              )}

              {session.status === 'missed' && session.missedReason && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm">
                  <strong className="text-red-700">Motivo:</strong>{' '}
                  <span className="text-red-600">{session.missedReason}</span>
                </div>
              )}

              {/* Mover día — siempre disponible */}
              <button
                onClick={() => setShowMoveInput(true)}
                disabled={saving}
                className="w-full px-4 py-3 rounded-xl font-semibold text-[rgb(0,94,184)] bg-[rgb(191,231,249)] hover:bg-[rgb(191,231,249)]/70 transition inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <CalendarDays className="w-4 h-4" /> Mover a otro día
              </button>

              {/* Eliminar */}
              <button
                onClick={onDelete}
                disabled={saving}
                className="w-full px-4 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 transition inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Trash2 className="w-4 h-4" /> Anular sesión
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
