export function nextAssessmentDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return new Date(Date.UTC(year, month, Math.min(day, lastDay))).toISOString().slice(0, 10);
}

type FollowupClient = { id: string; name: string; active: boolean };
type FollowupReport = { id: string; revisionOf?: string; clientId?: string; date: string; createdAt: string };

export function getAssessmentFollowups(clients: FollowupClient[], reports: FollowupReport[], today: string) {
  const superseded = new Set(reports.map(report => report.revisionOf).filter(Boolean));
  const current = reports.filter(report => !superseded.has(report.id));
  return clients.filter(client => client.active).map(client => {
    const latest = current.filter(report => report.clientId === client.id && report.date <= today)
      .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt))[0];
    const dueDate = latest ? nextAssessmentDate(latest.date) : null;
    const daysUntil = dueDate ? Math.round((Date.parse(dueDate) - Date.parse(today)) / 86400000) : null;
    return { clientId: client.id, name: client.name, latestId: latest?.id ?? null, lastDate: latest?.date ?? null, dueDate,
      status: daysUntil === null ? 'missing' : daysUntil < 0 ? 'overdue' : daysUntil === 0 ? 'today' : daysUntil <= 7 ? 'soon' : 'scheduled' };
  }).sort((a, b) => (a.dueDate ?? '').localeCompare(b.dueDate ?? '') || a.name.localeCompare(b.name));
}
