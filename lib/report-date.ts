export function formatReportIssuedAt(value: string): string {
  const parts = new Intl.DateTimeFormat('es-ES', {
    timeZone: 'Europe/Madrid', day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date(value));
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find(part => part.type === type)?.value;
  return `${get('day')}/${get('month')}/${get('year')} a las ${get('hour')}:${get('minute')}:${get('second')} (hora de Madrid)`;
}
