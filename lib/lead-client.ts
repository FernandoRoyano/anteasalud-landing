"use client";

import { useEffect, useRef } from "react";

export interface LeadPayload {
  nombre: string;
  email?: string;
  telefono?: string;
  zona?: string;
  interes?: string;
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

export async function postLead(payload: LeadPayload, guard: LeadGuard): Promise<Response> {
  return fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, ...guard }),
  });
}
