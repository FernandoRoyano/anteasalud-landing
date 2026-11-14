export const SINGLE_SESSION_PRICE = 55;
export const PLAN_SESSION_PRICE = 45;
export const PLAN_WEEKLY_PRICE = PLAN_SESSION_PRICE * 2;

export function estimateMonthlyPrice(sessions: number, modality: 'plan' | 'single'): number | null {
  if (!Number.isInteger(sessions) || sessions < 1 || sessions > 31) return null;
  return sessions * (modality === 'plan' ? PLAN_SESSION_PRICE : SINGLE_SESSION_PRICE);
}
