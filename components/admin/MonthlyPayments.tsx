'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import type { Client } from '@/lib/types';
import { getPaymentBalance, paymentInputSchema, PAYMENT_METHODS, type Payment, type PaymentInput } from '@/lib/payments';

type BillingRow = { client: Client; amount: number };
const money = (amount: number) => amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
const inputClass = 'mt-1 min-h-11 w-full rounded-xl border border-primary/30 bg-white px-3 py-2';

export default function MonthlyPayments({ rows, billingMonth }: { rows: BillingRow[]; billingMonth: string }) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [editing, setEditing] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/admin/payments?month=${billingMonth}`, { cache: 'no-store', signal: controller.signal })
      .then(async response => {
        const data = await response.json();
        if (!response.ok || !Array.isArray(data.payments)) throw new Error(data.error || 'No se pudieron cargar los cobros');
        setPayments(data.payments);
        setError('');
      })
      .catch(error => { if (!controller.signal.aborted) setError(error instanceof Error ? error.message : 'No se pudieron cargar los cobros'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    const onFocus = () => { setLoading(true); setAttempt(value => value + 1); };
    window.addEventListener('focus', onFocus);
    return () => { controller.abort(); window.removeEventListener('focus', onFocus); };
  }, [billingMonth, attempt]);

  const save = useCallback(async (input: PaymentInput) => {
    const response = await fetch('/api/admin/payments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
    const data = await response.json();
    if (!response.ok || !data.payment) throw new Error(data.error || 'No se pudo confirmar el cobro. Reintenta con los mismos datos.');
    setPayments(current => [...current.filter(payment => payment.id !== data.payment.id), data.payment]);
    setEditing(null);
    setLoading(true);
    setAttempt(value => value + 1);
  }, []);

  const cancel = async (payment: Payment) => {
    if (!confirm(`¿Anular el cobro de ${money(payment.amountCents / 100)}? Se conservará en el historial.`)) return;
    setBusy(true);
    try {
      const response = await fetch(`/api/admin/payments?id=${encodeURIComponent(payment.id)}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'No se pudo anular el cobro');
      setPayments(current => current.map(item => item.id === payment.id ? { ...item, voidedAt: new Date().toISOString() } : item));
      setError('');
      setLoading(true);
      setAttempt(value => value + 1);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'No se pudo anular el cobro');
    } finally { setBusy(false); }
  };

  const balances = rows.map(row => ({ ...row, ...getPaymentBalance(row.amount, payments.filter(payment => payment.clientId === row.client.id)) }));
  const paid = payments.filter(payment => !payment.voidedAt).reduce((sum, payment) => sum + payment.amountCents, 0) / 100;
  const pending = balances.reduce((sum, row) => sum + Math.round(row.pending * 100), 0) / 100;
  const selected = balances.find(row => row.client.id === editing);

  return <section aria-labelledby="payments-title" className="rounded-2xl border border-primary/20 bg-white p-4 shadow-md md:p-6">
    <h2 id="payments-title" className="text-xl font-black">Cobros de {billingMonth.split('-').reverse().join('/')}</h2>
    <p className="mt-2 text-sm text-muted">Registra el dinero recibido para este mes. Los pagos parciales se suman; no se envían cargos al cliente.</p>
    {loading ? <p role="status" className="mt-4">Cargando cobros…</p> : <>
      {error && <div role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-red-800"><p>{error}</p><button disabled={busy} onClick={() => { setLoading(true); setAttempt(value => value + 1); }} className="min-h-11 underline">Recargar cobros</button></div>}
      {!error && <>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-green-50 p-4"><dt className="text-sm">Cobrado</dt><dd className="mt-1 break-words text-3xl font-black text-green-800">{money(paid)}</dd></div>
          <div className="rounded-xl bg-amber-50 p-4"><dt className="text-sm">Pendiente de cobrar</dt><dd className="mt-1 break-words text-3xl font-black text-amber-900">{money(pending)}</dd></div>
        </dl>
        <ul className="mt-4 divide-y divide-primary/15">
          {balances.filter(row => row.amount > 0 || payments.some(payment => payment.clientId === row.client.id)).map(row => <li key={row.client.id} className="py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0"><h3 className="break-words font-bold">{row.client.name}{!row.client.active && ' (inactivo)'}</h3><p className="mt-1 text-sm">{row.status} · A cobrar: {money(row.amount)} · Recibido: {money(row.paid)} · Pendiente: {money(row.pending)}</p>{row.excess > 0 && <p className="mt-1 text-sm text-amber-900">Exceso registrado: {money(row.excess)}. Revisa el importe; no se traslada a otros meses.</p>}</div>
              <button disabled={busy} onClick={() => setEditing(row.client.id)} className="min-h-11 rounded-xl bg-primary px-4 py-2 font-semibold text-white">Registrar cobro</button>
            </div>
            {payments.some(payment => payment.clientId === row.client.id) && <details className="mt-3"><summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold text-primary">Historial de cobros</summary><ul className="space-y-2">{payments.filter(payment => payment.clientId === row.client.id).map(payment => <li key={payment.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-primary-50 p-3 text-sm"><span className="break-words">{payment.paidOn.split('-').reverse().join('/')} · {money(payment.amountCents / 100)} · {PAYMENT_METHODS[payment.method]}{payment.voidedAt && ' · Anulado'}</span>{!payment.voidedAt && <button disabled={busy} onClick={() => cancel(payment)} className="min-h-11 px-3 font-semibold text-red-700 underline">Anular</button>}</li>)}</ul></details>}
          </li>)}
        </ul>
        {!balances.some(row => row.amount > 0 || payments.some(payment => payment.clientId === row.client.id)) && <p className="mt-4 text-sm text-muted">No hay importes a cobrar ni cobros registrados para este mes.</p>}
      </>}
    </>}
    {selected && <PaymentForm key={selected.client.id} client={selected.client} billingMonth={billingMonth} pending={selected.pending} onSave={save} onClose={() => setEditing(null)} />}
  </section>;
}

function PaymentForm({ client, billingMonth, pending, onSave, onClose }: { client: Client; billingMonth: string; pending: number; onSave: (input: PaymentInput) => Promise<void>; onClose: () => void }) {
  const [amount, setAmount] = useState(pending > 0 ? pending.toFixed(2) : '');
  const [paidOn, setPaidOn] = useState(() => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()));
  const [method, setMethod] = useState<PaymentInput['method']>('transfer');
  const [request, setRequest] = useState<PaymentInput | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const input = request || { id: crypto.randomUUID(), clientId: client.id, billingMonth, amountCents: Math.round(Number(amount.replace(',', '.')) * 100), paidOn, method };
    const parsed = paymentInputSchema.safeParse(input);
    if (!parsed.success) { setError('Revisa el importe, la fecha y el método de pago.'); return; }
    setRequest(input);
    setSaving(true);
    setError('');
    try { await onSave(input); }
    catch (error) { setError(error instanceof Error ? error.message : 'No se pudo confirmar el cobro. Reintenta con los mismos datos.'); }
    finally { setSaving(false); }
  };

  return <dialog ref={dialogRef} onCancel={event => { event.preventDefault(); if (!saving) onClose(); }} className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl bg-white p-5 text-primary-dark shadow-xl backdrop:bg-black/50" aria-labelledby="payment-form-title">
    <form onSubmit={submit} className="w-full">
      <h2 id="payment-form-title" className="break-words text-xl font-bold">Registrar cobro · {client.name}</h2>
      <p className="mt-2 text-sm text-muted">Mes: {billingMonth} · Pendiente: {money(pending)}</p>
      <fieldset disabled={saving || !!request} className="mt-4 space-y-3">
        <label className="block text-sm font-semibold">Importe recibido (€)<input className={inputClass} type="number" min="0.01" max="1000000" step="0.01" inputMode="decimal" required value={amount} onChange={event => setAmount(event.target.value)} autoFocus /></label>
        <label className="block text-sm font-semibold">Fecha del pago<input className={inputClass} type="date" required value={paidOn} onChange={event => setPaidOn(event.target.value)} /></label>
        <label className="block text-sm font-semibold">Método de pago<select className={inputClass} value={method} onChange={event => setMethod(event.target.value as PaymentInput['method'])}>{Object.entries(PAYMENT_METHODS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      </fieldset>
      {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}{request && ' Los datos quedan bloqueados para poder reintentar sin duplicarlo. Si cierras, revisa el historial antes de registrar otro cobro.'}</p>}
      <div className="mt-5 flex flex-wrap justify-end gap-3"><button type="button" disabled={saving} onClick={onClose} className="min-h-11 rounded-xl border px-4">Cerrar</button><button type="submit" disabled={saving} className="min-h-11 rounded-xl bg-primary px-4 font-semibold text-white">{saving ? 'Guardando…' : request ? 'Reintentar registro' : 'Guardar cobro'}</button></div>
    </form>
  </dialog>;
}
