import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const module = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/session-billing.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { module, exports: module.exports });
const { getMonthlyBilling } = module.exports;
const session = (date, status, isPending = false) => ({ date, status, isPending });
test('monthly billing preserves commitment rules and previous December credits', () => {
  const result = getMonthlyBilling([
    session('2027-01-01', 'completed'), session('2027-01-02', 'scheduled'),
    session('2027-01-03', 'missed'), session('2027-01-04', 'recovered'),
    session('2027-01-05', 'discounted'), session('2026-12-01', 'missed', true),
    session('2026-12-02', 'missed', false), session('2026-11-01', 'missed', true),
  ], 0, 2027, 35);
  assert.equal(result.billable, 3);
  assert.equal(result.credit, 35);
  assert.equal(result.amount, 70);
});
test('sum of client balances uses individual prices and clamps credits per client', () => {
  const first = getMonthlyBilling([session('2026-10-01', 'missed', true)], 10, 2026, 50);
  const second = getMonthlyBilling([session('2026-11-01', 'scheduled')], 10, 2026, 35.5);
  assert.equal(first.amount + second.amount, 35.5);
  assert.equal(getMonthlyBilling([], 10, 2026, 35).amount, 0);
});
