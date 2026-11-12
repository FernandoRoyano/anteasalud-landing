export function getAssessmentReportFilename(reference: string): string {
  const name = reference.normalize('NFC')
    .replace(/[<>:"/\\|?*\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ').trim().replace(/[. ]+$/g, '').slice(0, 100);
  return `Antea-informe-${name || 'Sin nombre'}.pdf`;
}

export function getAssessmentReportDisposition(reference: string): string {
  const filename = getAssessmentReportFilename(reference);
  const ascii = filename.normalize('NFD').replace(/[^\x20-\x7e]/g, '');
  const encoded = encodeURIComponent(filename).replace(/['()*]/g, char => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);
  return `attachment; filename="${ascii}"; filename*=UTF-8''${encoded}`;
}
