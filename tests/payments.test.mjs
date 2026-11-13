import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
function load(path, dependencies = {}) {
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports, console: { error() {} }, Date, Map, Response, process: { env: { GOOGLE_SHEET_ID: 'test', GOOGLE_CREDENTIALS: '{}' } }, require: name => name in dependencies ? dependencies[name] : require(name) });
  return module.exports;
}
const domain = load('lib/payments.ts');
const input = { id: '550e8400-e29b-41d4-a716-446655440000', clientId: 'client', billingMonth: '2026-11', amountCents: 3550, paidOn: '2026-11-13', method: 'transfer' };
function fixture() {
  const rows = [];
  let failAfterAppend = false;
  const headers = ['id', 'clientId', 'billingMonth', 'amountCents', 'paidOn', 'method', 'createdAt', 'voidedAt'];
  const values = {
    get: async ({ range }) => ({ data: { values: range.includes('A1:') ? [headers] : rows } }),
    append: async ({ range, requestBody }) => { assert.equal(range, 'Cobros!A:A'); rows.push(...requestBody.values); if (failAfterAppend) { failAfterAppend = false; throw new Error('Connection lost after write'); } return {}; },
    update: async ({ range, requestBody }) => { const row = Number(range.match(/!H(\d+)/)[1]); rows[row - 2][7] = requestBody.values[0][0]; return {}; },
  };
  const sheets = { spreadsheets: { values, get: async () => ({ data: { sheets: [{ properties: { title: 'Cobros' } }] } }) } };
  const api = load('lib/sheets.ts', {
    googleapis: { google: { auth: { GoogleAuth: class {} }, sheets: () => sheets } },
    react: { cache: fn => fn }, '@/lib/payments': domain,
    '@/lib/article-editorial': {}, '@/lib/assessment-reports': {},
  });
  return { api, rows, fail: () => { failAfterAppend = true; } };
}

test('validates real dates, month, positive integer cents and known methods', () => {
  assert.equal(domain.paymentInputSchema.safeParse(input).success, true);
  for (const updates of [{ paidOn: '2026-02-30' }, { billingMonth: '2026-13' }, { amountCents: 0 }, { amountCents: -10 }, { amountCents: 35.5 }, { method: 'unknown' }]) assert.equal(domain.paymentInputSchema.safeParse({ ...input, ...updates }).success, false);
});
test('balances support partial, full, overpaid and voided payments without float drift', () => {
  const payment = { ...input, createdAt: '', voidedAt: '' };
  assert.equal(domain.getPaymentBalance(100, [payment]).status, 'Parcial');
  assert.equal(domain.getPaymentBalance(100, [payment]).pending, 64.5);
  assert.equal(domain.getPaymentBalance(35.5, [payment]).status, 'Pagado');
  assert.equal(domain.getPaymentBalance(30, [payment]).excess, 5.5);
  assert.equal(domain.getPaymentBalance(35.5, [{ ...payment, voidedAt: 'now' }]).pending, 35.5);
  assert.equal(domain.getPaymentBalance(0.3, [{ ...payment, amountCents: 10 }, { ...payment, amountCents: 20 }]).pending, 0);
});
test('retry after an uncertain write returns the existing payment without appending', async () => {
  const f = fixture();
  f.fail();
  await assert.rejects(f.api.recordPayment(input));
  const saved = await f.api.recordPayment(input);
  assert.equal(saved.amountCents, 3550);
  assert.equal(f.rows.length, 1);
  await assert.rejects(f.api.recordPayment({ ...input, amountCents: 4000 }), domain.PaymentConflictError);
});
test('duplicate retry rows count once and voiding preserves all original amounts', async () => {
  const f = fixture();
  await f.api.recordPayment(input);
  f.rows.push([...f.rows[0]]);
  assert.equal((await f.api.getPayments('2026-11')).length, 1);
  assert.equal((await f.api.getPayments('2026-12')).length, 0);
  assert.equal(await f.api.voidPayment(input.id), true);
  const payment = (await f.api.getPayments('2026-11'))[0];
  assert.ok(payment.voidedAt);
  assert.equal(domain.getPaymentBalance(35.5, [payment]).paid, 0);
  assert.equal(f.rows[0][3], 3550);
  assert.ok(f.rows[1][7]);
  assert.equal(await f.api.voidPayment(input.id), true);
  assert.equal(await f.api.voidPayment('missing'), false);
});
test('partial payments have independent IDs and accumulate within a month', async () => {
  const f = fixture();
  await f.api.recordPayment(input);
  await f.api.recordPayment({ ...input, id: '550e8400-e29b-41d4-a716-446655440001', amountCents: 1000 });
  assert.equal(domain.getPaymentBalance(100, await f.api.getPayments('2026-11')).paid, 45.5);
});
test('payment routes reject unauthorized, invalid and unknown-client requests before writes', async () => {
  let authenticated = false, writes = 0;
  const api = load('app/api/admin/payments/route.ts', {
    'next/server': { NextResponse: { json: (data, options) => Response.json(data, options) } },
    '@/lib/auth': { isAuthenticated: async () => authenticated },
    '@/lib/payments': domain,
    '@/lib/admin-schemas': { invalidBody: () => Response.json({ error: 'invalid' }, { status: 400 }) },
    '@/lib/sheets': { getClientById: async () => null, recordPayment: async () => { writes++; }, getPayments: async () => [], voidPayment: async () => { writes++; } },
  });
  const request = { nextUrl: new URL('https://example.test/api?month=2026-11&id=' + input.id), json: async () => input };
  for (const method of ['GET', 'POST', 'DELETE']) assert.equal((await api[method](request)).status, 401);
  authenticated = true;
  assert.equal((await api.POST({ ...request, json: async () => ({ ...input, amountCents: -1 }) })).status, 400);
  assert.equal((await api.POST(request)).status, 404);
  assert.equal((await api.GET({ ...request, nextUrl: new URL('https://example.test?month=bad') })).status, 400);
  assert.equal(writes, 0);
});

test('authorized routes persist, read and void a payment end to end', async () => {
  const f = fixture();
  const api = load('app/api/admin/payments/route.ts', {
    'next/server': { NextResponse: { json: (data, options) => Response.json(data, options) } },
    '@/lib/auth': { isAuthenticated: async () => true }, '@/lib/payments': domain,
    '@/lib/admin-schemas': { invalidBody: () => Response.json({}, { status: 400 }) },
    '@/lib/sheets': { ...f.api, getClientById: async () => ({ id: input.clientId }) },
  });
  const request = { nextUrl: new URL('https://example.test/api?month=2026-11&id=' + input.id), json: async () => input };
  assert.equal((await api.POST(request)).status, 200);
  assert.equal((await api.POST(request)).status, 200);
  const history = await (await api.GET(request)).json();
  assert.equal(history.payments.length, 1);
  assert.equal(history.payments[0].amountCents, 3550);
  assert.equal((await api.DELETE(request)).status, 200);
  assert.ok((await (await api.GET(request)).json()).payments[0].voidedAt);
  assert.equal((await api.DELETE(request)).status, 200);
  assert.equal(f.rows.length, 1);
});
