import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';

const dependency = createRequire(import.meta.url);
const env = { ASSESSMENT_ENCRYPTION_KEY: 'ab'.repeat(32), GOOGLE_SHEET_ID: 'synthetic' };
function load(file, mocks = {}) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const evaluatedModule = { exports: {} };
  vm.runInNewContext(code, { module: evaluatedModule, exports: evaluatedModule.exports, Buffer, Date, process: { env }, console: { error() {} }, require: name => Object.hasOwn(mocks, name) ? mocks[name] : name.startsWith('@/lib/') ? load(`${name.replace('@/', '')}.ts`, mocks) : dependency(name) });
  return evaluatedModule.exports;
}
const reports = load('lib/assessment-reports.ts');
const payload = { id: '11111111-1111-4111-8111-111111111111', reference: 'CASO SINTETICO', date: '2026-10-26', observations: 'Sin datos reales.', proposal: 'Revisar objetivos de ejercicio con la familia.', reviewed: true, assessment: { age: 80, scores: [2, 2, 2], falls: [false, false, false, false], interrupted: false, suitable: true } };

test('el informe valida revisión, fechas y puntuaciones y conserva una instantánea del resultado', () => {
  assert.equal(reports.assessmentReportSchema.safeParse(payload).success, true);
  for (const change of [{ reviewed: false }, { date: '2026-02-30' }, { proposal: '' }, { assessment: { ...payload.assessment, scores: [5, 2, 2] } }]) assert.equal(reports.assessmentReportSchema.safeParse({ ...payload, ...change }).success, false);
  const report = reports.createAssessmentReport(payload);
  assert.equal(report.result.total, 6);
  assert.equal(report.result.profile, 'B');
  assert.ok(report.version);
});

test('el cifrado oculta datos y rechaza manipulación, otra identidad y claves incorrectas', () => {
  const report = reports.createAssessmentReport(payload);
  const encrypted = reports.encryptAssessmentReport(report);
  assert.ok(!encrypted.includes(payload.reference));
  assert.equal(reports.decryptAssessmentReport(payload.id, encrypted).proposal, payload.proposal);
  env.ASSESSMENT_ENCRYPTION_KEY += '\n';
  assert.equal(reports.decryptAssessmentReport(payload.id, encrypted).proposal, payload.proposal);
  env.ASSESSMENT_ENCRYPTION_KEY = env.ASSESSMENT_ENCRYPTION_KEY.trim();
  assert.throws(() => reports.decryptAssessmentReport('another-id', encrypted));
  const parts = encrypted.split('.'); parts[3] = Buffer.from('tampered').toString('base64');
  assert.throws(() => reports.decryptAssessmentReport(payload.id, parts.join('.')));
  env.ASSESSMENT_ENCRYPTION_KEY = 'cd'.repeat(32);
  assert.throws(() => reports.decryptAssessmentReport(payload.id, encrypted));
  delete env.ASSESSMENT_ENCRYPTION_KEY;
  assert.throws(() => reports.encryptAssessmentReport(report));
  env.ASSESSMENT_ENCRYPTION_KEY = 'ab'.repeat(32);
});

test('Sheets guarda cifrado, recupera sin perder resultados y evita repetir una copia idéntica', async () => {
  const rows = [], writes = [];
  const api = load('lib/sheets.ts', {
    react: { cache: fn => fn }, '@/lib/article-editorial': {},
    googleapis: { google: { auth: { GoogleAuth: class {} }, sheets: () => ({ spreadsheets: {
      get: async () => ({ data: { sheets: [{ properties: { title: 'Informes valoracion' } }] } }),
      values: {
        get: async ({ range }) => ({ data: { values: range.includes('1:') ? [['ID', 'Fecha creación', 'Informe cifrado']] : rows } }),
        append: async input => { writes.push(input); rows.push(input.requestBody.values[0]); },
      },
    } }) } },
  });
  await api.saveAssessmentReport(payload);
  assert.equal(writes.length, 1);
  assert.equal(rows[0][0], payload.id);
  assert.ok(!rows[0][2].includes(payload.reference));
  assert.equal((await api.getAssessmentReport(payload.id)).result.total, 6);
  await api.saveAssessmentReport(payload);
  assert.equal(writes.length, 1);
  await assert.rejects(api.saveAssessmentReport({ ...payload, proposal: 'Otra propuesta distinta para este caso.' }));
  assert.equal(await api.getAssessmentReport('not-found'), null);
});

test('la API exige sesión, valida antes de escribir y no devuelve datos clínicos en el listado', async () => {
  let authenticated = false;
  const report = reports.createAssessmentReport(payload);
  let saved = 0;
  const api = load('app/api/admin/valoraciones/route.ts', {
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } },
    '@/lib/auth': { isAuthenticated: async () => authenticated },
    '@/lib/sheets': { getAssessmentReports: async () => [report], saveAssessmentReport: async () => { saved++; return report; } },
  });
  assert.equal((await api.GET()).status, 401);
  assert.equal((await api.POST({ json: async () => payload })).status, 401);
  authenticated = true;
  assert.equal((await api.POST({ json: async () => ({ ...payload, reviewed: false }) })).status, 400);
  assert.equal(saved, 0);
  assert.equal((await api.POST({ json: async () => payload })).status, 200);
  const list = (await api.GET()).body.reports;
  assert.equal(list[0].total, 6);
  assert.equal(list[0].observations, undefined);
  assert.equal(list[0].assessment, undefined);
});

test('el PDF se genera con varias páginas para propuestas extensas', async () => {
  const { buildAssessmentReportPdf } = load('lib/assessment-report-pdf.ts');
  const report = reports.createAssessmentReport({ ...payload, proposal: 'Objetivos de prueba: fuerza, equilibrio y tolerancia. '.repeat(65) });
  const bytes = await buildAssessmentReportPdf(report);
  const { PDFDocument } = dependency('pdf-lib');
  const pdf = await PDFDocument.load(bytes);
  assert.ok(pdf.getPageCount() >= 2);
  assert.equal(pdf.getTitle(), 'Valoración funcional · ANTEA Salud');
  fs.mkdirSync('.vercel', { recursive: true });
  fs.writeFileSync('.vercel/assessment-report-test.pdf', bytes);
});


test('el resumen de sesion se valida y se conserva cifrado sin romper informes anteriores', () => {
  assert.equal(reports.assessmentReportSchema.safeParse(payload).success, true);
  for (const sessionReview of ['', 'Breve', 'x'.repeat(4001)]) {
    assert.equal(reports.assessmentReportSchema.safeParse({ ...payload, sessionReview }).success, false);
  }
  const sessionReview = 'Trabajo de fuerza con pausas y buena tolerancia.';
  const report = reports.createAssessmentReport({ ...payload, sessionReview });
  const encrypted = reports.encryptAssessmentReport(report);
  assert.ok(!encrypted.includes(sessionReview));
  assert.equal(reports.decryptAssessmentReport(report.id, encrypted).sessionReview, sessionReview);
});


test('conserva el nombre y el contexto familiar cifrados, con limites de longitud', () => {
  const familyDetails = 'Usa andador en casa y quiere volver a salir al portal.';
  const report = reports.createAssessmentReport({ ...payload, reference: 'Persona de ejemplo', familyDetails });
  const encrypted = reports.encryptAssessmentReport(report);
  const restored = reports.decryptAssessmentReport(report.id, encrypted);
  assert.equal(restored.reference, 'Persona de ejemplo');
  assert.equal(restored.familyDetails, familyDetails);
  assert.ok(!encrypted.includes(familyDetails));
  assert.equal(reports.assessmentReportSchema.safeParse({ ...payload, familyDetails: 'x'.repeat(4001) }).success, false);
});


test('editar exige sesion y un original existente; guarda otra copia enlazada', async () => {
  let authenticated = false;
  const original = reports.createAssessmentReport(payload);
  const revisions = [];
  const api = load('app/api/admin/valoraciones/route.ts', {
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } },
    '@/lib/auth': { isAuthenticated: async () => authenticated },
    '@/lib/sheets': {
      getAssessmentReport: async id => id === original.id ? original : null,
      saveAssessmentReport: async input => { const report = reports.createAssessmentReport(input); revisions.push(report); return report; },
    },
  });
  const revision = { ...payload, id: '22222222-2222-4222-8222-222222222222', revisionOf: original.id, proposal: 'Propuesta corregida tras revisar los resultados.' };
  assert.equal((await api.POST({ json: async () => revision })).status, 401);
  authenticated = true;
  assert.equal((await api.POST({ json: async () => ({ ...revision, revisionOf: revision.id }) })).status, 400);
  assert.equal((await api.POST({ json: async () => ({ ...revision, revisionOf: '33333333-3333-4333-8333-333333333333' }) })).status, 400);
  assert.equal((await api.POST({ json: async () => ({ ...revision, reviewed: false }) })).status, 400);
  assert.equal(revisions.length, 0);
  assert.equal((await api.POST({ json: async () => revision })).status, 200);
  assert.equal(revisions[0].revisionOf, original.id);
  assert.equal(original.proposal, payload.proposal);
  const encrypted = reports.encryptAssessmentReport(revisions[0]);
  assert.equal(reports.decryptAssessmentReport(revision.id, encrypted).revisionOf, original.id);
});


test('la hora de emision usa Madrid en invierno y verano y se conserva al recuperar el informe', async () => {
  const { formatReportIssuedAt } = load('lib/report-date.ts');
  assert.equal(formatReportIssuedAt('2026-11-11T12:30:45.000Z'), '11/11/2026 a las 13:30:45 (hora de Madrid)');
  assert.equal(formatReportIssuedAt('2026-07-11T12:30:45.000Z'), '11/07/2026 a las 14:30:45 (hora de Madrid)');
  const report = reports.createAssessmentReport(payload);
  const restored = reports.decryptAssessmentReport(report.id, reports.encryptAssessmentReport(report));
  assert.equal(restored.createdAt, report.createdAt);
  const { buildAssessmentReportPdf } = load('lib/assessment-report-pdf.ts');
  const { PDFDocument } = dependency('pdf-lib');
  const pdf = await PDFDocument.load(await buildAssessmentReportPdf(report));
  assert.equal(Math.floor(pdf.getCreationDate().getTime()/1000), Math.floor(new Date(report.createdAt).getTime()/1000));
});


test('borrar exige sesion y UUID valido; distingue informes inexistentes y errores', async () => {
  let authenticated = false;
  let removed = 0;
  const api = load('app/api/admin/valoraciones/[id]/route.ts', {
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } },
    '@/lib/auth': { isAuthenticated: async () => authenticated },
    '@/lib/sheets': { deleteAssessmentReport: async id => { removed++; if (id === payload.id) return true; return false; } },
  });
  const call = id => api.DELETE({}, { params: Promise.resolve({ id }) });
  assert.equal((await call(payload.id)).status, 401);
  assert.equal(removed, 0);
  authenticated = true;
  assert.equal((await call('invalid')).status, 400);
  assert.equal(removed, 0);
  assert.equal((await call('22222222-2222-4222-8222-222222222222')).status, 404);
  assert.equal((await call(payload.id)).status, 200);
});

test('borrar vacia solo la fila exacta y rechaza identidades duplicadas sin borrar', async () => {
  let rows = [['other-id', 'date', 'encrypted-other'], [payload.id, 'date', 'encrypted-target']];
  const cleared = [];
  const api = load('lib/sheets.ts', {
    react: { cache: fn => fn }, '@/lib/article-editorial': {},
    googleapis: { google: { auth: { GoogleAuth: class {} }, sheets: () => ({ spreadsheets: {
      get: async () => ({ data: { sheets: [{ properties: { title: 'Informes valoracion' } }] } }),
      values: {
        get: async ({ range }) => ({ data: { values: range.includes('1:') ? [['ID', 'Fecha creación', 'Informe cifrado']] : rows } }),
        clear: async input => { cleared.push(input); },
      },
    } }) } },
  });
  assert.equal(await api.deleteAssessmentReport(payload.id), true);
  assert.equal(cleared.length, 1);
  assert.equal(cleared[0].range, "'Informes valoracion'!A3:C3");
  assert.equal(await api.deleteAssessmentReport('missing'), false);
  rows = [[payload.id], [payload.id]];
  await assert.rejects(api.deleteAssessmentReport(payload.id));
  assert.equal(cleared.length, 1);
});


test('el PDF usa el nombre de la persona y admite espacios y acentos sin caracteres peligrosos', () => {
  const { getAssessmentReportFilename, getAssessmentReportDisposition } = load('lib/report-filename.ts');
  assert.equal(getAssessmentReportFilename('Tino 1'), 'Antea-informe-Tino 1.pdf');
  assert.equal(getAssessmentReportFilename('  María   Pérez  '), 'Antea-informe-María Pérez.pdf');
  assert.equal(getAssessmentReportFilename('Tino/1:prueba'), 'Antea-informe-Tino 1 prueba.pdf');
  assert.equal(getAssessmentReportFilename('  '), 'Antea-informe-Sin nombre.pdf');
  const disposition = getAssessmentReportDisposition('María Pérez');
  assert.ok(disposition.includes('filename="Antea-informe-Maria Perez.pdf"'));
  assert.ok(disposition.includes("filename*=UTF-8''Antea-informe-Mar%C3%ADa%20P%C3%A9rez.pdf"));
  assert.ok(!getAssessmentReportDisposition('Tino\r\nInjected: header').includes('\r\n'));
});
