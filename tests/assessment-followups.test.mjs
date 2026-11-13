import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';

const dependency = createRequire(import.meta.url);
function load(file, mocks = {}) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const evaluatedModule = { exports: {} };
  vm.runInNewContext(code, { module: evaluatedModule, exports: evaluatedModule.exports, Date, Intl, console,
    require: name => Object.hasOwn(mocks, name) ? mocks[name] : name.startsWith('@/lib/') ? load(`${name.replace('@/', '')}.ts`, mocks) : dependency(name),
  });
  return evaluatedModule.exports;
}
const { nextAssessmentDate, getAssessmentFollowups } = load('lib/assessment-followups.ts');

test('la revisión vence al mes natural y respeta fines de mes y años bisiestos', () => {
  for (const [date, expected] of [['2026-01-31', '2026-02-28'], ['2028-01-31', '2028-02-29'], ['2026-12-31', '2027-01-31'], ['2026-10-13', '2026-11-13']]) {
    assert.equal(nextAssessmentDate(date), expected);
  }
});

test('distingue vencidas, hoy, próximas, futuras y sin valoración sin mezclar nombres', () => {
  const clients = ['a', 'b', 'c', 'd', 'e'].map(id => ({ id, name: 'Mismo nombre', active: true }));
  clients.push({ id: 'inactive', name: 'Inactivo', active: false });
  const reports = [
    { id: '1', clientId: 'a', date: '2026-10-12', createdAt: '2026-10-12' },
    { id: '2', clientId: 'b', date: '2026-10-13', createdAt: '2026-10-13' },
    { id: '3', clientId: 'c', date: '2026-10-20', createdAt: '2026-10-20' },
    { id: '4', clientId: 'd', date: '2026-11-01', createdAt: '2026-11-01' },
    { id: 'future', clientId: 'e', date: '2027-01-01', createdAt: '2026-11-01' },
    { id: 'unlinked', date: '2026-11-01', createdAt: '2026-11-01' },
  ];
  const result = getAssessmentFollowups(clients, reports, '2026-11-13');
  assert.equal(result.length, 5);
  for (const [id, status] of [['a', 'overdue'], ['b', 'today'], ['c', 'soon'], ['d', 'scheduled'], ['e', 'missing']]) {
    assert.equal(result.find(item => item.clientId === id).status, status);
  }
});

test('corregir un informe no aplaza la revisión; una valoración nueva sí', () => {
  const clients = [{ id: 'a', name: 'Prueba', active: true }];
  const original = { id: 'original', clientId: 'a', date: '2026-10-13', createdAt: '2026-10-13' };
  const revision = { ...original, id: 'revision', revisionOf: 'original', createdAt: '2026-11-12' };
  assert.equal(getAssessmentFollowups(clients, [original, revision], '2026-11-13')[0].dueDate, '2026-11-13');
  const monthly = { ...original, id: 'monthly', date: '2026-11-13', createdAt: '2026-11-13' };
  assert.equal(getAssessmentFollowups(clients, [original, revision, monthly], '2026-11-13')[0].dueDate, '2026-12-13');
  assert.equal(getAssessmentFollowups(clients, [original, { ...revision, clientId: undefined }], '2026-11-13')[0].status, 'missing');
});

test('la API de revisiones exige sesión y no devuelve datos clínicos', async () => {
  let authenticated = false;
  let reads = 0;
  const api = load('app/api/admin/valoraciones/seguimiento/route.ts', {
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status ?? 200, headers: options?.headers }) } },
    '@/lib/auth': { isAuthenticated: async () => authenticated },
    '@/lib/sheets': {
      getAllClients: async () => { reads++; return [{ id: 'a', name: 'Caso ficticio', active: true }]; },
      getAssessmentReports: async () => [{ id: 'r', clientId: 'a', date: '2026-10-13', createdAt: '2026-10-13', familyDetails: 'Privado', observations: 'Privado' }],
    },
  });
  assert.equal((await api.GET()).status, 401);
  assert.equal(reads, 0);
  authenticated = true;
  const response = await api.GET();
  assert.equal(response.status, 200);
  assert.equal(response.headers['Cache-Control'], 'private, no-store');
  assert.equal(response.body.followups[0].observations, undefined);
  assert.equal(response.body.followups[0].familyDetails, undefined);
});


test('el historial agrupa correcciones ramificadas y conserva mediciones distintas sin mezclar clientes', () => {
  const { clientAssessmentHistory } = load('lib/assessment-followups.ts');
  const base = { id: 'base', clientId: 'a', date: '2026-10-13', createdAt: '2026-10-13' };
  const oldEdit = { ...base, id: 'edit-old', revisionOf: 'base', createdAt: '2026-10-14' };
  const newEdit = { ...base, id: 'edit-new', revisionOf: 'base', createdAt: '2026-10-15' };
  const monthly = { ...base, id: 'monthly', date: '2026-11-13', createdAt: '2026-11-13' };
  const other = { ...base, id: 'other', clientId: 'b' };
  const result = clientAssessmentHistory([monthly, oldEdit, other, base, newEdit], 'a');
  assert.equal(result.length, 2);
  assert.equal(result[0].id, 'edit-new');
  assert.equal(result[1].id, 'monthly');
  assert.equal(clientAssessmentHistory([oldEdit, newEdit, monthly], 'a').length, 2);
  assert.equal(clientAssessmentHistory([base, { ...newEdit, clientId: 'b' }], 'a').length, 0);
  assert.equal(clientAssessmentHistory([base, newEdit, { ...newEdit, id: 'edit-latest', revisionOf: 'edit-new', createdAt: '2026-10-16' }], 'a')[0].id, 'edit-latest');
});
