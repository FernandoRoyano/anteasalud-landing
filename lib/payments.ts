import { z } from 'zod';

export const PAYMENT_METHODS = {
  transfer: 'Transferencia', cash: 'Efectivo', bizum: 'Bizum', card: 'Tarjeta', other: 'Otro',
} as const;
export const billingMonthSchema = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/);
export const paymentInputSchema = z.object({
  id: z.uuid(),
  clientId: z.string().trim().min(1).max(64),
  billingMonth: billingMonthSchema,
  amountCents: z.number().int().positive().max(100_000_000),
  paidOn: z.iso.date(),
  method: z.enum(['transfer', 'cash', 'bizum', 'card', 'other']),
}).strict();
export type PaymentInput = z.infer<typeof paymentInputSchema>;
export type Payment = PaymentInput & { createdAt: string; voidedAt: string };

export class PaymentConflictError extends Error {}

export function getPaymentBalance(amount: number, payments: Payment[]) {
  const dueCents = Math.round(amount * 100);
  const paidCents = payments.filter(payment => !payment.voidedAt).reduce((sum, payment) => sum + payment.amountCents, 0);
  return {
    paid: paidCents / 100,
    pending: Math.max(0, dueCents - paidCents) / 100,
    excess: Math.max(0, paidCents - dueCents) / 100,
    status: paidCents === 0 ? (dueCents === 0 ? 'Sin importe' : 'Pendiente') : paidCents < dueCents ? 'Parcial' : 'Pagado',
  };
}
