import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function fixture() {
  const normal = ['sess_normal', 'client', '2026-11-13', 'scheduled', 'FALSE', '', '', 'normal', 'created', 'updated'];
  const shifted = ['sess_shifted', 'client', '2026-11-14', 'scheduled', 'FALSE', '', '', 'shifted', 'created', 'updated'];
  const rows = [normal, [...Array(8).fill(''), ...shifted], []];
  const writes = [];
  const values = {
    get: async ({ range }) => ({ data: { values: range.includes('A1:') ? [['id']] : rows } }),
    append: async (args) => {
      assert.equal(args.range, 'Sesiones!A:A');
      rows.push(args.requestBody.values[0]);
      return { data: { updates: { updatedRange: `Sesiones!A${rows.length + 1}:J${rows.length + 1}` } } };
    },
    update: async (args) => {
      writes.push(args);
      const [, col, row] = args.range.match(/!([AI])(\d+):/);
      const offset = col === 'A' ? 0 : 8;
      args.requestBody.values[0].forEach((value, i) => { rows[Number(row) - 2][offset + i] = value; });
    },
  };
  const sheets = { spreadsheets: { values, get: async () => ({ data: { sheets: [{ properties: { title: 'Sesiones' } }] } }) } };
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync('lib/sheets.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports, process: { env: { GOOGLE_SHEET_ID: 'test', GOOGLE_CREDENTIALS: '{}' } }, console: { log() {} }, require: name => name === 'googleapis' ? { google: { auth: { GoogleAuth: class {} }, sheets: () => sheets } } : name === 'react' ? { cache: fn => fn } : {} });
  return { api: module.exports, rows, writes };
}

test('create persists in A:J and remains readable after reload', async () => {
  const { api } = fixture();
  const created = await api.createSession({ clientId: 'client', date: '2026-11-15', status: 'scheduled', isPending: false, missedReason: '', linkedToSessionId: '', notes: '' });
  assert.ok((await api.getAllSessions()).some(s => s.id === created.id));
});

test('reads displaced historical sessions and updates/deletes their own cells only', async () => {
  const { api, rows, writes } = fixture();
  const sessions = await api.getAllSessions();
  assert.equal(sessions.length, 2);
  assert.equal(sessions.find(s => s.id === 'sess_shifted').notes, 'shifted');
  const untouched = [...rows[0]];
  await api.updateSession('sess_shifted', { status: 'completed' });
  assert.equal(writes.at(-1).range, 'Sesiones!I3:R3');
  assert.equal((await api.getAllSessions()).find(s => s.id === 'sess_shifted').status, 'completed');
  await api.deleteSession('sess_shifted');
  assert.equal(writes.at(-1).range, 'Sesiones!I3:R3');
  assert.deepEqual(rows[0], untouched);
  assert.equal((await api.getAllSessions()).length, 1);
  await assert.rejects(api.updateSession('missing', { status: 'completed' }));
});
