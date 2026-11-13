import Link from 'next/link';
import DeleteAssessmentButton from '@/components/admin/DeleteAssessmentButton';
import { formatReportIssuedAt } from '@/lib/report-date';
import { notFound, redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getAssessmentReport } from '@/lib/sheets';
import AssessmentReportView from '@/components/admin/AssessmentReportView';
import ReportActions from '@/components/admin/ReportActions';
import { z } from 'zod';

export default async function SavedReportPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin');
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const report = await getAssessmentReport(id);
  if (!report) notFound();
  const previousReport = report.revisionOf ? await getAssessmentReport(report.revisionOf) : null;
  return <div className="mx-auto max-w-5xl"><header className="print:hidden"><Link href="/admin/valoraciones/informes" className="inline-flex min-h-11 items-center font-semibold text-primary underline">← Volver a informes guardados</Link><h1 className="mt-4 font-display text-fluid-3xl font-bold text-primary-dark">Informe de valoración</h1><p className="mt-3 text-muted">Copia revisada y guardada el {formatReportIssuedAt(report.createdAt)}. Puedes descargarla y adjuntarla a un mensaje.</p><Link href={`/admin/valoraciones/informes/${report.id}/editar`} className="mt-5 inline-flex min-h-12 items-center rounded-xl bg-primary px-5 py-3 font-semibold text-white">Editar valoración</Link>{previousReport && <p className="mt-3 text-sm text-muted">Versión actualizada. <Link href={`/admin/valoraciones/informes/${report.revisionOf}`} className="font-semibold text-primary underline">Consultar informe anterior</Link></p>}{report.clientId && <Link href={`/admin/valoraciones/evolucion/${encodeURIComponent(report.clientId)}`} className="mt-4 ml-3 inline-flex min-h-12 items-center rounded-xl border border-primary/30 px-5 py-3 font-semibold text-primary">Comparar evolución</Link>}<div className="mt-4"><DeleteAssessmentButton id={report.id} reference={report.reference} /></div><ReportActions key={report.id} id={report.id} reference={report.reference} /></header><AssessmentReportView report={report} className="mt-7" /></div>;
}
