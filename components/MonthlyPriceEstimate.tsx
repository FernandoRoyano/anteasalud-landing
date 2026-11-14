'use client';

import { useState } from 'react';
import { estimateMonthlyPrice, PLAN_SESSION_PRICE, SINGLE_SESSION_PRICE } from '@/lib/public-pricing';

export default function MonthlyPriceEstimate() {
  const [modality, setModality] = useState<'plan' | 'single'>('plan');
  const [sessions, setSessions] = useState('8');
  const amount = estimateMonthlyPrice(Number(sessions), modality);
  const price = modality === 'plan' ? PLAN_SESSION_PRICE : SINGLE_SESSION_PRICE;

  return <section aria-labelledby="estimate-title" className="border-t border-primary/15 bg-primary-50 p-5 sm:p-7">
    <h3 id="estimate-title" className="font-display text-xl font-bold text-primary-dark">¿Cuánto sería al mes?</h3>
    <p className="mt-2 text-muted">Calcula un ejemplo con las sesiones previstas. El importe definitivo se acuerda según vuestro calendario.</p>
    <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_8rem]">
      <label className="block text-sm font-semibold text-primary-dark">Modalidad
        <select value={modality} onChange={event => { const next = event.target.value as 'plan' | 'single'; setModality(next); setSessions(next === 'plan' ? '8' : '1'); }} className="mt-2 min-h-12 w-full rounded-xl border border-primary/40 bg-white px-3 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          <option value="plan">Plan 2 días/semana · {PLAN_SESSION_PRICE} €/sesión</option>
          <option value="single">Sesiones sueltas · {SINGLE_SESSION_PRICE} €/sesión</option>
        </select>
      </label>
      <label className="block text-sm font-semibold text-primary-dark">Sesiones del mes
        <input type="number" min="1" max="31" step="1" inputMode="numeric" value={sessions} onChange={event => setSessions(event.target.value)} aria-describedby="estimate-note" aria-invalid={amount === null} className="mt-2 min-h-12 w-full rounded-xl border border-primary/40 bg-white px-3 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" />
      </label>
    </div>
    <div className="mt-5 border-t border-primary/15 pt-4" aria-live="polite" aria-atomic="true">
      {amount === null ? <p className="font-semibold text-primary-dark">Introduce entre 1 y 31 sesiones, sin decimales.</p> : <p className="flex flex-wrap items-baseline justify-between gap-2"><span className="text-muted">{sessions} sesiones × {price} €</span><strong className="font-display text-3xl text-primary-dark">{amount.toLocaleString('es-ES')} €<span className="text-base font-normal"> / mes</span></strong></p>}
    </div>
    <p id="estimate-note" className="mt-3 text-sm leading-relaxed text-muted">Ejemplo orientativo, no una cuota fija. Dos días por semana pueden sumar 8, 9 o 10 sesiones según el mes. Si empezáis a mitad de mes o hay festivos, ajustamos las sesiones acordadas.</p>
  </section>;
}
