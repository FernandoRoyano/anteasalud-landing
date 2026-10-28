import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getAssessmentReport } from '@/lib/sheets';
import { buildAssessmentReportPdf } from '@/lib/assessment-report-pdf';
import { z } from 'zod';

export const runtime = 'nodejs';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) return NextResponse.json({ error: 'Identificador inválido' }, { status: 400 });
  try {
    const report = await getAssessmentReport(id);
    if (!report) return NextResponse.json({ error: 'Informe no encontrado' }, { status: 404 });
    const bytes = await buildAssessmentReportPdf(report);
    return new Response(Buffer.from(bytes), { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="antea-informe-${report.date}-${id.slice(0, 8)}.pdf"`, 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow', 'Referrer-Policy': 'no-referrer' } });
  } catch {
    console.error('[Reports:PDF] No se pudo generar el PDF');
    return NextResponse.json({ error: 'No se pudo descargar el informe' }, { status: 500 });
  }
}
