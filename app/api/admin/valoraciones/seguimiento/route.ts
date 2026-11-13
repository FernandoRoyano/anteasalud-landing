import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getAllClients, getAssessmentReports } from '@/lib/sheets';
import { currentAssessmentReports, getAssessmentFollowups } from '@/lib/assessment-followups';

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  try {
    const [clients, reports] = await Promise.all([getAllClients(), getAssessmentReports()]);
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    return NextResponse.json({ followups: getAssessmentFollowups(clients, reports, today), unlinked: currentAssessmentReports(reports).filter(report => !report.clientId).length }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch {
    console.error('[Reports:followups] No se pudieron cargar las revisiones');
    return NextResponse.json({ error: 'No se pudieron cargar las revisiones mensuales' }, { status: 500 });
  }
}
