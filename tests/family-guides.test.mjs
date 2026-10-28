import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const compiled = ts.transpileModule(fs.readFileSync('lib/family-guides.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const evaluatedModule = { exports: {} };
vm.runInNewContext(compiled, { module: evaluatedModule, exports: evaluatedModule.exports });
const { familyGuides, getPrimaryGuide, getFamilyGuide } = evaluatedModule.exports;

test('each curated article has exactly one primary guide and existing assets', () => {
  const assigned = new Set();
  assert.equal(familyGuides.length, 3);
  for (const guide of familyGuides) {
    assert.equal(getFamilyGuide(guide.slug), guide);
    assert.ok(fs.existsSync(`public${guide.image}`));
    assert.ok(fs.existsSync(`app${guide.serviceHref}/page.tsx`));
    for (const group of guide.groups) {
      for (const slug of group.slugs) {
        assert.ok(!assigned.has(slug), `Duplicate primary assignment: ${slug}`);
        assigned.add(slug);
        assert.equal(getPrimaryGuide(slug), guide);
      }
    }
  }
  assert.equal(assigned.size, 14);
});

test('unknown guides and general articles do not get a forced assignment', () => {
  assert.equal(getFamilyGuide('movilidad'), undefined);
  assert.equal(getPrimaryGuide('cuanto-ejercicio-necesita-persona-mayor-oms'), undefined);
  assert.equal(getFamilyGuide('__proto__'), undefined);
});
