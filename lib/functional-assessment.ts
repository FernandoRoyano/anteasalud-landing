export const VIVIFRAIL_SOURCE = 'https://vivifrail.com/wp-content/uploads/2020/02/Pasaporte-sanitarios.pdf';
export const VIVIFRAIL_MATERIALS = 'https://vivifrail.com/es/documentacion/';
export const ASSESSMENT_VERSION = 'SPPB manual · Vivifrail 2020 · ANTEA 1';

export const functionalTests = [
  { name: 'Equilibrio', description: 'Observa las posiciones de pies juntos, semitándem y tándem, siguiendo el orden y las condiciones del protocolo. Registra la puntuación conjunta de equilibrio, no una puntuación por posición.' },
  { name: 'Marcha de 4 metros', description: 'Prepara un recorrido medido y registra la puntuación de la prueba de marcha del protocolo SPPB. Esta prueba es distinta de la marcha de 6 metros del bloque de riesgo de caídas.' },
  { name: 'Levantarse de la silla', description: 'Valora las cinco levantadas siguiendo el protocolo, comprobando antes si la persona puede realizar la prueba. Introduce la puntuación asignada según la ejecución y el tiempo.' },
] as const;

export const fallCriteria = [
  'Dos o más caídas en el último año, o una caída que precisó atención médica',
  'Timed Up and Go: tiempo superior a 20 segundos',
  'Marcha de 6 metros: tiempo superior a 7,5 segundos',
  'Deterioro cognitivo diagnosticado, según la información sanitaria disponible',
] as const;

export interface AssessmentInput {
  age: number | null;
  scores: [number | null, number | null, number | null];
  falls: [boolean | null, boolean | null, boolean | null, boolean | null];
  interrupted: boolean;
  suitable: boolean;
}

export function evaluateAssessment(input: AssessmentInput) {
  const invalid = input.scores.some(score => score !== null && (!Number.isInteger(score) || score < 0 || score > 4))
    || (input.age !== null && (!Number.isInteger(input.age) || input.age < 0 || input.age > 120));
  const completeScores = input.scores.every(score => score !== null);
  const total = !invalid && completeScores ? input.scores.reduce<number>((sum, score) => sum + (score ?? 0), 0) : null;
  const risk = input.falls.some(value => value === true) ? 'criteria-present'
    : input.falls.every(value => value === false) ? 'no-criteria-detected' : 'pending';
  const base = { total, risk, profile: null as string | null, interpretation: '' };
  if (invalid) return { ...base, status: 'invalid', interpretation: 'Revisa la edad y las puntuaciones: cada componente debe estar entre 0 y 4.' };
  if (input.interrupted) return { ...base, status: 'interrupted', interpretation: 'Valoración interrumpida. No se asigna un perfil automático; documenta el motivo y el siguiente paso.' };
  if (!input.suitable) return { ...base, status: 'review-required', interpretation: 'Pendiente de revisar la idoneidad de las pruebas y las indicaciones sanitarias.' };
  if (input.age !== null && input.age < 70) return { ...base, status: 'outside-scope', interpretation: 'La referencia Vivifrail utilizada está dirigida a personas de 70 años o más. No se asigna perfil automáticamente.' };
  if (total === null || input.age === null || input.falls.some(value => value === null)) return { ...base, status: 'incomplete', interpretation: 'Faltan datos. Una prueba no realizada no equivale a cero puntos. Completa la valoración o documenta por qué no se ha podido finalizar.' };
  const level = total <= 3 ? 'A' : total <= 6 ? 'B' : total <= 9 ? 'C' : 'D';
  const profile = (level === 'B' || level === 'C') && risk === 'criteria-present' ? `${level}+` : level;
  const interpretation = total <= 3 ? 'Puntuación compatible con una limitación funcional importante en estas pruebas.'
    : total <= 6 ? 'Puntuación compatible con limitación funcional moderada en estas pruebas.'
      : total <= 9 ? 'Puntuación compatible con limitación funcional leve en estas pruebas.'
        : 'Rendimiento funcional alto en las pruebas SPPB realizadas. No excluye dificultades en otras tareas.';
  return { total, risk, profile, status: 'ready', interpretation };
}

export function fallRiskLabel(risk: string) {
  return risk === 'criteria-present' ? 'Se detectan criterios de riesgo de caídas: requieren atención específica.'
    : risk === 'no-criteria-detected' ? 'No se detectan los criterios registrados. Esto no significa ausencia de riesgo de caídas.'
      : 'Riesgo de caídas pendiente de completar.';
}

export function canExportAssessment(input: AssessmentInput, report: { reference: string; date: string; proposal: string; observations: string; reviewed: boolean }) {
  return report.reviewed && !!report.reference.trim() && /^\d{4}-\d{2}-\d{2}$/.test(report.date)
    && report.proposal.trim().length >= 10 && (!input.interrupted || report.observations.trim().length >= 10)
    && evaluateAssessment(input).status !== 'invalid';
}
