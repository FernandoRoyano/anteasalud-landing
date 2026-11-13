import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getAllClients, getAssessmentReports } from '@/lib/sheets';
import { clientAssessmentHistory } from '@/lib/assessment-followups';
import { functionalTests } from '@/lib/functional-assessment';

const dateLabel = (date: string) => date.split('-').reverse().join('/');
const points = (value: number | null) => value === null ? 'No valorado' : String(value);
const change = (before: number | null, after: number | null) => before === null || after === null ? 'No comparable' : after === before ? 'Sin cambio' : `${after > before ? '+' : ''}${after - before} puntos`;

export default async function AssessmentHistoryPage({ params }: { params: Promise<{ clientId: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin');
  const { clientId } = await params;
  if (!clientId || clientId.length > 64) notFound();
  const [clients, reports] = await Promise.all([getAllClients(), getAssessmentReports()]);
  const client = clients.find(item => item.id === clientId);
  if (!client) notFound();
  const history = clientAssessmentHistory(reports, clientId);
  const latest = history.at(-1);
  const previous = history.at(-2);
  const comparable = (report: typeof latest) => !!report && report.assessment.suitable && !report.assessment.interrupted && report.result.status !== 'invalid';
  return <div className="mx-auto max-w-6xl text-primary-dark">
    <Link href="/admin/valoraciones/informes" className="inline-flex min-h-11 items-center font-semibold text-primary underline">← Volver a informes</Link>
    <h1 className="mt-4 font-display text-fluid-3xl font-bold">Evolución de {client.name}</h1>
    <p className="mt-3 max-w-3xl text-muted">Cada columna corresponde a una valoración distinta. Se muestra la última versión guardada de cada una; las correcciones no cuentan como nuevas valoraciones.</p>
    <Link href={`/admin/valoraciones?client=${encodeURIComponent(clientId)}`} className="mt-5 inline-flex min-h-12 items-center rounded-xl bg-primary px-5 py-3 font-semibold text-white">Registrar nueva valoración</Link>
    {!history.length ? <p className="mt-7 rounded-xl border border-primary/20 bg-white p-5">No hay valoraciones vinculadas a este cliente. Puedes vincular las existentes desde «Editar valoración».</p> : <>
      {previous && latest ? <section className="mt-7 rounded-2xl border border-primary/20 bg-white p-5"><h2 className="text-xl font-bold">Última comparación</h2><p className="mt-2 text-muted">{dateLabel(previous.date)} → {dateLabel(latest.date)}</p><dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[...functionalTests.map((test, index) => ({ name: test.name, before: comparable(previous) ? previous.assessment.scores[index] : null, after: comparable(latest) ? latest.assessment.scores[index] : null })), { name: 'SPPB total', before: comparable(previous) ? previous.result.total : null, after: comparable(latest) ? latest.result.total : null }].map(item => <div key={item.name} className="rounded-xl bg-primary-50 p-4"><dt className="font-semibold">{item.name}</dt><dd className="mt-2">{points(item.before)} → {points(item.after)}<span className="mt-1 block text-sm text-muted">{change(item.before, item.after)}</span></dd></div>)}</dl><p className="mt-4 text-sm text-muted">La diferencia numérica no demuestra por sí sola una mejoría o empeoramiento clínico. Revisa las condiciones de las pruebas, los apoyos, la tolerancia y el contexto antes de interpretarla.</p></section> : <p className="mt-7 rounded-xl bg-primary-50 p-5">Necesitas dos valoraciones distintas vinculadas para comparar. Corregir el mismo informe no añade otra medición.</p>}
      <div className="mt-7 overflow-x-auto rounded-2xl border border-primary/20 bg-white" tabIndex={0} role="region" aria-label="Tabla de evolución de valoraciones"><table className="w-full text-left"><caption className="p-5 text-left text-xl font-bold">Historial de resultados</caption><thead><tr><th scope="col" className="p-4">Prueba</th>{history.map(report => <th key={report.id} scope="col" className="min-w-40 p-4"><Link href={`/admin/valoraciones/informes/${report.id}`} className="inline-flex min-h-11 items-center text-primary underline">{dateLabel(report.date)}</Link>{report.revisionOf && <span className="block text-xs font-normal text-muted">Versión corregida</span>}</th>)}</tr></thead><tbody>{functionalTests.map((test, index) => <tr key={test.name} className="border-t border-primary/15"><th scope="row" className="p-4 font-semibold">{test.name} / 4</th>{history.map(report => <td key={report.id} className="p-4">{points(report.assessment.scores[index])}</td>)}</tr>)}<tr className="border-t border-primary/15"><th scope="row" className="p-4">SPPB / 12</th>{history.map(report => <td key={report.id} className="p-4">{points(report.result.total)}</td>)}</tr><tr className="border-t border-primary/15"><th scope="row" className="p-4">Carnet orientativo</th>{history.map(report => <td key={report.id} className="p-4">{report.result.profile ?? 'Sin asignar'}</td>)}</tr></tbody></table></div>
      <section className="mt-7 space-y-4"><h2 className="text-xl font-bold">Contexto de cada valoración</h2>{history.map(report => <details key={report.id} className="rounded-xl border border-primary/20 bg-white p-5"><summary className="min-h-11 cursor-pointer font-semibold">{dateLabel(report.date)} · Ver resumen y objetivos</summary>{report.sessionReview && <p className="mt-3 whitespace-pre-wrap break-words">{report.sessionReview}</p>}<p className="mt-3 whitespace-pre-wrap break-words text-muted">{report.proposal}</p><Link href={`/admin/valoraciones/informes/${report.id}`} className="mt-3 inline-flex min-h-11 items-center font-semibold text-primary underline">Abrir informe completo</Link></details>)}</section>
    </>}
  </div>;
}
