"use client";

import { useEffect, useRef } from "react";

export interface LeadPayload {
  nombre: string;
  email?: string;
  telefono?: string;
  zona?: string;
  interes?: string;
  procedencia?: string;
  ruta?: string;
  formulario?: string;
  mensaje?: string;
}

interface LeadGuard {
  consent: boolean;
  website: string;
  fillMs: number;
}

/** Mide cuánto tarda el usuario en rellenar el formulario (anti-bots) */
export function useFormTimer(): () => number {
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  return () => (startedAt.current ? Date.now() - startedAt.current : 0);
}

const pendingRequests = new Map<string, Promise<Response>>();
const requestIds = new Map<string, { id: string; created: number }>();

export function getLeadPageLabel(path: string, title: string): string {
  if (path === '/') return 'Página principal';
  return (title.replace(/\s*\|\s*ANTEA Salud\s*$/i, '').trim() || path).slice(0, 200);
}

async function sendLead(payload: LeadPayload, guard: LeadGuard, content: string): Promise<Response> {
  // Solo se almacena una huella, nunca el nombre, teléfono o mensaje del cliente.
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(content));
  const key = `antea-lead:${Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')}`;
  let entry = requestIds.get(key);
  try {
    const saved = sessionStorage.getItem(key);
    if (saved) entry = JSON.parse(saved);
  } catch { /* El envío funciona también si el almacenamiento está bloqueado. */ }
  if (!entry || !Number.isFinite(entry.created) || Date.now() - entry.created > 10 * 60 * 1000) {
    entry = { id: crypto.randomUUID(), created: Date.now() };
  }
  requestIds.set(key, entry);
  try { sessionStorage.setItem(key, JSON.stringify(entry)); } catch { /* Fallback en memoria. */ }
  return fetch("/api/contact", {
    method: "POST",
    signal: AbortSignal.timeout(30000),
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, ruta: window.location.pathname, requestId: entry.id, ...guard }),
  });
}

export async function postLead(payload: LeadPayload, guard: LeadGuard): Promise<Response> {
  const content = JSON.stringify({ ...payload, ruta: window.location.pathname });
  let request = pendingRequests.get(content);
  if (!request) {
    request = sendLead(payload, guard, content);
    pendingRequests.set(content, request);
  }
  try { return (await request).clone(); }
  finally { if (pendingRequests.get(content) === request) pendingRequests.delete(content); }
}
