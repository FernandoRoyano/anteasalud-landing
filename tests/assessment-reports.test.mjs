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
  vm.runInNewContext(code, { module: evaluatedModule, exports: evaluatedModule.exports, Buffer, process: { env }, console: { error() {} }, require: name => Object.hasOwn(mocks, name) ? mocks[name] : name.startsWith('@/lib/') ? load(`${name.replace('@/', '')}.ts`, mocks) : dependency(name) });
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
