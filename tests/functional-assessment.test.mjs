import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const code = ts.transpileModule(fs.readFileSync('lib/functional-assessment.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const evaluatedModule = { exports: {} };
vm.runInNewContext(code, { module: evaluatedModule, exports: evaluatedModule.exports });
const { evaluateAssessment, canExportAssessment } = evaluatedModule.exports;
const base = { age: 80, suitable: true, interrupted: false, scores: [4, 4, 4], falls: [false, false, false, false] };

test('SPPB boundaries classify A, B, C and D without inventing E', () => {
  for (const [scores, profile] of [
    [[0, 0, 0], 'A'], [[3, 0, 0], 'A'], [[4, 0, 0], 'B'], [[4, 2, 0], 'B'],
    [[4, 3, 0], 'C'], [[4, 4, 1], 'C'], [[4, 4, 2], 'D'], [[4, 4, 4], 'D'],
  ]) {
    const result = evaluateAssessment({ ...base, scores });
    assert.equal(result.status, 'ready');
    assert.equal(result.profile, profile);
    assert.equal(result.total, scores.reduce((sum, score) => sum + score, 0));
  }
});

test('fall risk is separate; any positive criterion triggers attention and B/C plus only', () => {
  for (let index = 0; index < 4; index++) {
    const falls = [false, false, false, false]; falls[index] = true;
    assert.equal(evaluateAssessment({ ...base, scores: [2, 2, 2], falls }).profile, 'B+');
    assert.equal(evaluateAssessment({ ...base, scores: [3, 3, 3], falls }).profile, 'C+');
    assert.equal(evaluateAssessment({ ...base, falls }).profile, 'D');
    assert.equal(evaluateAssessment({ ...base, scores: [0, 0, 0], falls }).profile, 'A');
    assert.equal(evaluateAssessment({ ...base, falls }).risk, 'criteria-present');
  }
  assert.equal(evaluateAssessment(base).risk, 'no-criteria-detected');
});

test('missing, unsuitable, interrupted and out-of-scope assessments never assign a profile', () => {
  for (const change of [
    { age: null }, { age: 69 }, { scores: [4, null, 4] }, { falls: [false, null, false, false] },
    { suitable: false }, { interrupted: true }, { scores: [5, 4, 4] }, { scores: [-1, 4, 4] },
    { scores: [NaN, 4, 4] }, { scores: [1.5, 4, 4] }, { age: NaN },
  ]) assert.equal(evaluateAssessment({ ...base, ...change }).profile, null);
  assert.equal(evaluateAssessment({ ...base, scores: [null, null, null] }).total, null);
  assert.equal(evaluateAssessment({ ...base, age: 70 }).status, 'ready');
  assert.equal(evaluateAssessment({ ...base, falls: [true, null, null, null] }).risk, 'criteria-present');
  assert.equal(evaluateAssessment({ ...base, falls: [true, null, null, null] }).status, 'incomplete');
});

test('report export requires professional review, identification and a proposal; interrupted tests need an explanation', () => {
  const report = { reviewed: true, reference: 'Caso de prueba', date: '2026-10-25', proposal: 'Revisar objetivos con la familia.', observations: '' };
  assert.equal(canExportAssessment(base, report), true);
  for (const change of [{ reviewed: false }, { reference: '' }, { date: '' }, { proposal: '' }]) {
    assert.equal(canExportAssessment(base, { ...report, ...change }), false);
  }
  assert.equal(canExportAssessment({ ...base, interrupted: true }, report), false);
  assert.equal(canExportAssessment({ ...base, interrupted: true }, { ...report, observations: 'Interrumpida por baja tolerancia; revisar antes de continuar.' }), true);
  assert.equal(canExportAssessment({ ...base, scores: [8, 4, 4] }, report), false);
});
