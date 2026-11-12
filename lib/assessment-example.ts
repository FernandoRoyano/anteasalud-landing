import type { AssessmentReport } from '@/lib/assessment-reports';
import { ASSESSMENT_VERSION, evaluateAssessment } from '@/lib/functional-assessment';

// Datos íntegramente ficticios para mostrar el formato, sin acceder al historial de clientes.
const assessment: AssessmentReport['assessment'] = {
  age: 80, scores: [3, 3, 2], falls: [false, false, false, false], interrupted: false, suitable: true,
};

export const assessmentExample: AssessmentReport = {
  id: '00000000-0000-4000-8000-000000000001',
  reference: 'Persona de ejemplo (datos ficticios)',
  date: '2026-11-12',
  createdAt: '2026-11-12T09:00:00.000Z',
  familyDetails: 'En este caso inventado, la familia comenta que cuesta levantarse del sofá y que la persona quiere conservar sus paseos por el barrio.',
  observations: 'Ejemplo de registro: se han completado las pruebas adaptadas a la situación de la persona. Los puntos mostrados son ficticios y no describen a ningún cliente.',
  sessionReview: 'Ejemplo de resumen: durante la visita se han observado el equilibrio, la marcha y la capacidad de levantarse. Se han respetado las pausas y comentado las sensaciones al terminar.',
  proposal: 'Ejemplo de objetivos: levantarse con más seguridad y mantener la capacidad de caminar por el barrio. El trabajo se ajustaría a la valoración individual y a las indicaciones sanitarias. Durante un programa pautado, la revisión mensual serviría para comparar la evolución y ajustar la propuesta. Este documento no es una rutina ni una recomendación para quien lo descarga.',
  reviewed: true,
  assessment,
  result: evaluateAssessment(assessment),
  version: ASSESSMENT_VERSION,
};
