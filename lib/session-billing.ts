import type { Session } from '@/lib/types';

export function getMonthlyBilling(sessions: Session[], month: number, year: number, price: number) {
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}-`;
  const previous = new Date(year, month - 1, 1);
  const previousPrefix = `${previous.getFullYear()}-${String(previous.getMonth() + 1).padStart(2, '0')}-`;
  const current = sessions.filter(session => session.date.startsWith(prefix));
  const completed = current.filter(session => session.status === 'completed').length;
  const scheduled = current.filter(session => session.status === 'scheduled').length;
  const missed = current.filter(session => session.status === 'missed').length;
  const prevMonthMissed = sessions.filter(session => session.date.startsWith(previousPrefix) && session.status === 'missed' && session.isPending).length;
  const billable = completed + scheduled + missed;
  const credit = prevMonthMissed * price;
  return { total: current.length, completed, scheduled, missed, prevMonthMissed, billable, credit, amount: Math.max(0, billable * price - credit) };
}
