"use client";

import { useMemo, useState } from 'react';
import { Bell, MessageCircle, Check } from 'lucide-react';
import type { Client, Session } from '@/lib/types';

interface Props {
  clients: Client[];
  sessions: Session[];
}

type TargetDay = 'today' | 'tomorrow';

function toISODate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatSpanishDate(dateStr: string, targetDay: TargetDay): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const weekday = date.toLocaleDateString('es-ES', { weekday: 'long' });
  const monthName = date.toLocaleDateString('es-ES', { month: 'long' });
  const prefix = targetDay === 'today' ? 'hoy' : 'mañana';
  return `${prefix} ${weekday} ${day} de ${monthName}`;
}

function buildReminderUrl(client: Client, session: Session, targetDay: TargetDay): string {
  const dateLabel = formatSpanishDate(session.date, targetDay);
  const contactName = client.contactName || client.name;

  // Si hay un contacto distinto al cliente, aclaramos de quién es la sesión.
  const sessionSubject = client.contactName
    ? `la sesión de ${client.name}`
    : 'tu sesión';

  const message = `Hola ${contactName},

Recordatorio: ${dateLabel} tenemos ${sessionSubject}.

Si surge cualquier cambio, avísame con tiempo.

Fernando`;

  const phoneDigits = client.phone.replace(/\D/g, '');
  const waPhone = phoneDigits.startsWith('34') ? phoneDigits : `34${phoneDigits}`;
  return `https://wa.me/${waPhone}?text=${encodeURIComponent(message)}`;
}

export default function SessionReminders({ clients, sessions }: Props) {
  const [targetDay, setTargetDay] = useState<TargetDay>('tomorrow');

  const items = useMemo(() => {
    const target = new Date();
    if (targetDay === 'tomorrow') target.setDate(target.getDate() + 1);
    const targetISO = toISODate(target);

    return sessions
      .filter((s) => {
        if (s.date !== targetISO) return false;
        if (s.status !== 'scheduled') return false;
        const client = clients.find((c) => c.id === s.clientId);
        return !!client && client.active && !!client.phone;
      })
      .map((s) => {
        const client = clients.find((c) => c.id === s.clientId)!;
        return { session: s, client };
      })
      .sort((a, b) => a.client.name.localeCompare(b.client.name));
  }, [sessions, clients, targetDay]);

  const missingPhone = useMemo(() => {
    const target = new Date();
    if (targetDay === 'tomorrow') target.setDate(target.getDate() + 1);
    const targetISO = toISODate(target);

    return sessions
      .filter((s) => {
        if (s.date !== targetISO) return false;
        if (s.status !== 'scheduled') return false;
        const client = clients.find((c) => c.id === s.clientId);
        return !!client && client.active && !client.phone;
      })
      .map((s) => clients.find((c) => c.id === s.clientId)!)
      .filter(Boolean);
  }, [sessions, clients, targetDay]);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[rgb(200,207,210)] p-5 md:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
            <Bell className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-black text-[rgb(31,41,51)]">
              Recordatorios de sesión
            </h2>
            <p className="text-xs md:text-sm text-[rgb(130,131,130)]">
              Envía un aviso rápido por WhatsApp un día antes
            </p>
          </div>
        </div>

        {/* Tabs hoy/mañana */}
        <div className="flex gap-1 bg-[rgb(232,237,238)] rounded-xl p-1 flex-shrink-0">
          <button
            onClick={() => setTargetDay('today')}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition ${
              targetDay === 'today'
                ? 'bg-white text-[rgb(0,94,184)] shadow-sm'
                : 'text-[rgb(130,131,130)] hover:text-[rgb(31,41,51)]'
            }`}
          >
            Hoy
          </button>
          <button
            onClick={() => setTargetDay('tomorrow')}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition ${
              targetDay === 'tomorrow'
                ? 'bg-white text-[rgb(0,94,184)] shadow-sm'
                : 'text-[rgb(130,131,130)] hover:text-[rgb(31,41,51)]'
            }`}
          >
            Mañana
          </button>
        </div>
      </div>

      {/* Lista de sesiones */}
      {items.length === 0 && missingPhone.length === 0 ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="inline-flex items-center gap-2 text-green-800 font-semibold text-sm">
            <Check className="w-4 h-4" />
            Sin sesiones programadas para {targetDay === 'today' ? 'hoy' : 'mañana'}
          </div>
        </div>
      ) : (
        <>
          {items.length > 0 && (
            <div className="space-y-2">
              {items.map(({ session, client }) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between gap-3 p-3 bg-[rgb(232,237,238)] rounded-xl"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black flex-shrink-0"
                      style={{ backgroundColor: client.color }}
                    >
                      {client.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[rgb(31,41,51)] truncate">{client.name}</p>
                      <p className="text-xs text-[rgb(130,131,130)] truncate">
                        {client.contactName
                          ? `Contacto: ${client.contactName} · ${client.phone}`
                          : client.phone}
                      </p>
                    </div>
                  </div>

                  <a
                    href={buildReminderUrl(client, session, targetDay)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-lg shadow-sm transition flex-shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden md:inline">Enviar</span>
                  </a>
                </div>
              ))}
            </div>
          )}

          {missingPhone.length > 0 && (
            <div className="mt-3 bg-orange-50 border border-orange-200 rounded-xl p-3 text-xs">
              <p className="font-bold text-orange-800 mb-1">
                Sin teléfono registrado ({missingPhone.length}):
              </p>
              <p className="text-orange-700">
                {missingPhone.map((c) => c.name).join(', ')}. Añade el teléfono desde /admin/clientes para enviar recordatorios.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
