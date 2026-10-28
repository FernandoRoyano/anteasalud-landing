import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getAssessmentReports, saveAssessmentReport } from '@/lib/sheets';
import { assessmentReportSchema } from '@/lib/assessment-reports';

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  try {
    const reports = await getAssessmentReports();
    return NextResponse.json({ reports: reports.map(({ id, reference, date, createdAt, result }) => ({ id, reference, date, createdAt, total: result.total, profile: result.profile })) });
  } catch {
    console.error('[Reports:GET] No se pudieron leer los informes');
    return NextResponse.json({ error: 'No se pudieron cargar los informes' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const parsed = assessmentReportSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Completa y revisa los datos antes de guardar el informe' }, { status: 400 });
  try {
    const report = await saveAssessmentReport(parsed.data);
    return NextResponse.json({ id: report.id });
  } catch (error) {
    console.error('[Reports:POST] No se pudo guardar el informe');
    const conflict = error instanceof Error && error.message.includes('Identificador reutilizado');
    return NextResponse.json({ error: conflict ? 'Este identificador corresponde a otro informe' : 'No se pudo guardar el informe. Conserva esta página abierta y vuelve a intentarlo.' }, { status: conflict ? 409 : 500 });
  }
}
