import { VIVIFRAIL_SOURCE, functionalTests, fallCriteria, fallRiskLabel } from '@/lib/functional-assessment';
import type { AssessmentReport } from '@/lib/assessment-reports';

type ReportViewData = Pick<AssessmentReport, 'assessment' | 'reference' | 'date' | 'observations' | 'proposal' | 'version' | 'result'>;

export default function AssessmentReportView({ report, draft = false, className = '' }: { report: ReportViewData; draft?: boolean; className?: string }) {
  const { assessment, reference, date, observations, proposal, version, result } = report;
  return (
      <article className={`rounded-2xl border border-primary/20 bg-white p-6 print:mt-0 print:border-0 print:p-0 ${className}`} aria-label="Vista previa del informe">
        <p className="font-semibold text-primary">ANTEA Salud · Fernando Royano · Graduado en CCAFYD</p>
        <h2 className="mt-3 font-display text-3xl font-bold">Valoración funcional</h2>
        <p className="mt-3">Referencia: {reference || 'Sin indicar'} · Fecha: {date || 'Sin indicar'} · Edad: {assessment.age ?? 'Sin indicar'}</p>
        {draft && <p className="mt-4 font-bold text-red-700">BORRADOR · Pendiente de completar y revisar</p>}
        <h3 className="mt-7 text-xl font-bold">Resultados registrados</h3>
        <ul className="mt-3 space-y-2">{functionalTests.map((test, index) => <li key={test.name}>{test.name}: {assessment.scores[index] === null ? 'No valorado' : `${assessment.scores[index]} / 4`}</li>)}</ul>
        <p className="mt-4 font-bold">SPPB: {result.total === null ? 'Incompleta' : `${result.total} / 12`}{result.profile ? ` · Perfil orientativo ${result.profile}` : ' · Sin perfil automático'}</p>
        <p className="mt-3">{result.interpretation}</p>
        <h3 className="mt-7 text-xl font-bold">Criterios de caídas</h3>
        <ul className="mt-3 space-y-2">{fallCriteria.map((criterion, index) => <li key={criterion}>{criterion}: {assessment.falls[index] === null ? 'Pendiente' : assessment.falls[index] ? 'Sí' : 'No'}</li>)}</ul>
        <p className="mt-3">{fallRiskLabel(result.risk)}</p>
        <h3 className="mt-7 text-xl font-bold">Observaciones</h3><p className="mt-3 whitespace-pre-wrap break-words">{observations || 'Sin observaciones registradas.'}</p>
        <h3 className="mt-7 text-xl font-bold">Interpretación y propuesta de Fernando</h3><p className="mt-3 whitespace-pre-wrap break-words">{proposal || 'Pendiente de completar.'}</p>
        <p className="mt-8 border-t border-primary/20 pt-4 text-base text-muted">{version}. Orientación para el ejercicio, no diagnóstico médico ni garantía de resultados. Los datos pendientes o una valoración interrumpida limitan la interpretación. Programa y cargas sujetos a revisión profesional e indicaciones sanitarias.</p>
        <p className="mt-3 break-words text-sm text-muted">Referencia: {VIVIFRAIL_SOURCE}</p>
      </article>
  );
}
