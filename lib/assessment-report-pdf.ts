import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import type { AssessmentReport } from '@/lib/assessment-reports';
import { fallCriteria, fallRiskLabel, functionalTests, VIVIFRAIL_SOURCE } from '@/lib/functional-assessment';

export async function buildAssessmentReportPdf(report: AssessmentReport): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle('Valoración funcional · ANTEA Salud');
  doc.setAuthor('Fernando Royano · ANTEA Salud');
  doc.setLanguage('es-ES');
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const green = rgb(0.09, 0.22, 0.17);
  function addPage() {
    const item = doc.addPage();
    item.setSize(595.28, 841.89);
    return item;
  }
  let page = addPage();
  let y = 744;
  function header() {
    page.drawRectangle({ x: 0, y: 773, width: 596, height: 69, color: green });
    page.drawText('ANTEA SALUD', { x: 44, y: 805, size: 20, font: bold, color: rgb(1, 1, 1) });
    page.drawText('Fernando Royano | Graduado en CCAFYD', { x: 44, y: 786, size: 10, font: regular, color: rgb(0.85, 0.93, 0.87) });
  }
  header();
  function text(value: string, heading = false) {
    const font = heading ? bold : regular;
    const size = heading ? 13 : 11;
    if (heading) {
      if (y < 115) { page = addPage(); header(); y = 744; }
      y -= 12;
    }
    // Las fuentes estándar PDF cubren el castellano. Sustituir caracteres no representables.
    const safe = Array.from(value).map(char => {
      if (char === '\n') return char;
      try { font.encodeText(char); return char; } catch { return '?'; }
    }).join('');
    const draw = (line: string) => {
      if (y < 65) { page = addPage(); header(); y = 744; }
      page.drawText(line, { x: 44, y, size, font, color: green });
      y -= heading ? 20 : 16;
    };
    for (const paragraph of safe.split('\n')) {
      let line = '';
      for (const word of paragraph.split(/\s+/)) {
        if (line && font.widthOfTextAtSize(`${line} ${word}`, size) > 507) { draw(line); line = ''; }
        if (font.widthOfTextAtSize(word, size) > 507) {
          for (const character of word) {
            if (font.widthOfTextAtSize(line + character, size) > 507) { draw(line); line = ''; }
            line += character;
          }
        } else line = line ? `${line} ${word}` : word;
      }
      draw(line);
    }
    y -= 5;
  }
  text('Valoración funcional', true);
  text(`Referencia: ${report.reference} | Fecha: ${report.date} | Edad: ${report.assessment.age ?? 'Sin indicar'}`);
  text('Resultados registrados', true);
  functionalTests.forEach((test, index) => text(`${test.name}: ${report.assessment.scores[index] === null ? 'No valorado' : `${report.assessment.scores[index]} / 4`}`));
  text(`SPPB: ${report.result.total === null ? 'Incompleta' : `${report.result.total} / 12`} | ${report.result.profile ? `Perfil orientativo ${report.result.profile}` : 'Sin perfil automático'}`, true);
  text(report.result.interpretation);
  text('Criterios de caídas', true);
  fallCriteria.forEach((criterion, index) => text(`${criterion}: ${report.assessment.falls[index] === null ? 'Pendiente' : report.assessment.falls[index] ? 'Sí' : 'No'}`));
  text(fallRiskLabel(report.result.risk));
  text('Observaciones', true);
  text(report.observations || 'Sin observaciones registradas.');
  text('Interpretación y propuesta de Fernando', true);
  text(report.proposal);
  text('Referencia y alcance', true);
  text(`${report.version}. Orientación para el ejercicio, no diagnóstico médico ni garantía de resultados. Las pruebas pendientes o interrumpidas limitan la interpretación. Programa y cargas sujetos a revisión profesional e indicaciones sanitarias.`);
  text(VIVIFRAIL_SOURCE);
  const pages = doc.getPages();
  pages.forEach((item, index) => item.drawText(`ANTEA Salud | Informe ${report.id.slice(0, 8)} | Página ${index + 1} de ${pages.length}`, { x: 44, y: 30, size: 9, font: regular, color: green }));
  return doc.save();
}
