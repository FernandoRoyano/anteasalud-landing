import { VIVIFRAIL_SOURCE, getAssessmentPassport, functionalTests, fallCriteria, fallRiskLabel } from '@/lib/functional-assessment';
import type { AssessmentReport } from '@/lib/assessment-reports';

type ReportViewData = Pick<AssessmentReport, 'assessment' | 'reference' | 'date' | 'familyDetails' | 'observations' | 'sessionReview' | 'proposal' | 'version' | 'result'>;

export default function AssessmentReportView({ report, draft = false, className = '' }: { report: ReportViewData; draft?: boolean; className?: string }) {
  const { assessment, reference, date, observations, proposal, version, result } = report;
  const passport = getAssessmentPassport(result.profile);
  return (
      <article className={`rounded-2xl border border-primary/20 bg-white p-6 print:mt-0 print:border-0 print:p-0 ${className}`} aria-label="Vista previa del informe">
        <p className="font-semibold text-primary">ANTEA Salud · Fernando Royano · Graduado en CCAFYD</p>
        <h2 className="mt-3 font-display text-3xl font-bold">Valoración funcional</h2>
        <p className="mt-3">Nombre / referencia: {reference || 'Sin indicar'} · Fecha: {date || 'Sin indicar'} · Edad: {assessment.age ?? 'Sin indicar'}</p>
        {draft && <p className="mt-4 font-bold text-red-700">BORRADOR · Pendiente de completar y revisar</p>}
        <h3 className="mt-7 text-xl font-bold">Resultados registrados</h3>
        {report.familyDetails && <><h3 className="mt-7 text-xl font-bold">Información aportada por la familia</h3><p className="mt-3 whitespace-pre-wrap break-words">{report.familyDetails}</p></>}
        <ul className="mt-3 space-y-2">{functionalTests.map((test, index) => <li key={test.name}>{test.name}: {assessment.scores[index] === null ? 'No valorado' : `${assessment.scores[index]} / 4`}</li>)}</ul>
        <p className="mt-4 font-bold">SPPB: {result.total === null ? 'Incompleta' : `${result.total} / 12`}{result.profile ? ` · Perfil orientativo ${result.profile}` : ' · Sin perfil automático'}</p>
        {passport && <section className="mt-5 rounded-xl border border-primary/25 bg-primary-50 p-5"><h3 className="text-xl font-bold">Carnet Vivifrail orientativo: {passport.profile}</h3><p className="mt-2 font-semibold">{passport.label}</p><p className="mt-2">{passport.range}</p><a href={passport.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center font-semibold text-primary underline">Consultar pasaporte {passport.profile} (PDF)</a></section>}
        <p className="mt-3">{result.interpretation}</p>
        <h3 className="mt-7 text-xl font-bold">Criterios de caídas</h3>
        <ul className="mt-3 space-y-2">{fallCriteria.map((criterion, index) => <li key={criterion}>{criterion}: {assessment.falls[index] === null ? 'Pendiente' : assessment.falls[index] ? 'Sí' : 'No'}</li>)}</ul>
        <p className="mt-3">{fallRiskLabel(result.risk)}</p>
        {report.sessionReview && <><h3 className="mt-7 text-xl font-bold">Valoración de la sesión</h3><p className="mt-3 whitespace-pre-wrap break-words">{report.sessionReview}</p></>}
        <h3 className="mt-7 text-xl font-bold">Observaciones</h3><p className="mt-3 whitespace-pre-wrap break-words">{observations || 'Sin observaciones registradas.'}</p>
        <h3 className="mt-7 text-xl font-bold">Interpretación y propuesta de Fernando</h3><p className="mt-3 whitespace-pre-wrap break-words">{proposal || 'Pendiente de completar.'}</p>
        <p className="mt-8 border-t border-primary/20 pt-4 text-base text-muted">{version}. Orientación para el ejercicio, no diagnóstico médico ni garantía de resultados. Los datos pendientes o una valoración interrumpida limitan la interpretación. Programa y cargas sujetos a revisión profesional e indicaciones sanitarias.</p>
        <p className="mt-3 break-words text-sm text-muted">Referencia: {VIVIFRAIL_SOURCE}</p>
      </article>
  );
}
