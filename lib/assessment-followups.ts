export function nextAssessmentDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return new Date(Date.UTC(year, month, Math.min(day, lastDay))).toISOString().slice(0, 10);
}

type FollowupClient = { id: string; name: string; active: boolean };
type FollowupReport = { id: string; revisionOf?: string; clientId?: string; date: string; createdAt: string };

export function currentAssessmentReports<T extends FollowupReport>(reports: T[]): T[] {
  const byId = new Map(reports.map(report => [report.id, report]));
  const latestByRoot = new Map<string, T>();
  for (const report of reports) {
    let current: FollowupReport = report;
    const visited = new Set([report.id]);
    while (current.revisionOf && !visited.has(current.revisionOf)) {
      const parentId = current.revisionOf;
      visited.add(parentId);
      const parent = byId.get(parentId);
      if (!parent) { current = { ...current, id: parentId, revisionOf: undefined }; break; }
      current = parent;
    }
    const previous = latestByRoot.get(current.id);
    if (!previous || report.createdAt > previous.createdAt || (report.createdAt === previous.createdAt && report.id > previous.id)) latestByRoot.set(current.id, report);
  }
  return [...latestByRoot.values()];
}

export function clientAssessmentHistory<T extends FollowupReport>(reports: T[], clientId: string): T[] {
  return currentAssessmentReports(reports).filter(report => report.clientId === clientId)
    .sort((a, b) => a.date.localeCompare(b.date) || a.createdAt.localeCompare(b.createdAt));
}

export function getAssessmentFollowups(clients: FollowupClient[], reports: FollowupReport[], today: string) {
  const current = currentAssessmentReports(reports);
  return clients.filter(client => client.active).map(client => {
    const latest = current.filter(report => report.clientId === client.id && report.date <= today)
      .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt))[0];
    const dueDate = latest ? nextAssessmentDate(latest.date) : null;
    const daysUntil = dueDate ? Math.round((Date.parse(dueDate) - Date.parse(today)) / 86400000) : null;
    return { clientId: client.id, name: client.name, latestId: latest?.id ?? null, lastDate: latest?.date ?? null, dueDate,
      status: daysUntil === null ? 'missing' : daysUntil < 0 ? 'overdue' : daysUntil === 0 ? 'today' : daysUntil <= 7 ? 'soon' : 'scheduled' };
  }).sort((a, b) => (a.dueDate ?? '').localeCompare(b.dueDate ?? '') || a.name.localeCompare(b.name));
}
