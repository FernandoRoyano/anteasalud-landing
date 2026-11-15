import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
function load(file, mocks = {}) {
  const module = { exports: {} };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText, { module, exports: module.exports, require: name => name in mocks ? mocks[name] : require(name) });
  return module.exports;
}
const visuals = load('lib/assessment-visuals.ts');
const functional = load('lib/functional-assessment.ts');
function all(node, predicate) {
  if (!node || typeof node !== 'object') return [];
  return [...(predicate(node) ? [node] : []), ...[node.props?.children].flat(Infinity).flatMap(child => all(child, predicate))];
}
test('balance diagrams distinguish aligned, side-offset and heel-to-toe stances', () => {
  const [parallel, semi, tandem] = visuals.BALANCE_STANCES;
  assert.equal(parallel.left.y, parallel.right.y);
  assert.equal(parallel.right.x - parallel.left.x, visuals.SHOE_WIDTH);
  assert.equal(semi.left.y + visuals.SHOE_HEIGHT, semi.right.y);
  assert.notEqual(semi.left.x, semi.right.x);
  assert.equal(tandem.left.y + visuals.SHOE_HEIGHT, tandem.right.y);
  assert.equal(tandem.left.x, tandem.right.x);
});
test('every assessment panel has its correct source page, source video and existing assets', () => {
  const module = load('components/admin/AssessmentTestVisual.tsx', { '@/lib/assessment-visuals': visuals, '@/lib/functional-assessment': functional });
  for (const [index, page] of [8, 9, 10, 13, 14].entries()) {
    const tree = module.default({ index });
    const links = all(tree, node => node.type === 'a').map(node => node.props.href);
    assert.ok(links.includes(`${functional.VIVIFRAIL_SOURCE}#page=${page}`));
    assert.ok(links.includes(visuals.ASSESSMENT_VIDEO));
    if (index === 0) {
      const shoes = all(tree, node => node.type === 'image');
      assert.equal(shoes.length, 6);
      for (const shoe of shoes) assert.ok(fs.existsSync('public' + shoe.props.href));
    }
    else {
      const asset = visuals.ASSESSMENT_VISUALS[index];
      assert.ok(fs.existsSync(`public/valoraciones/antea/${asset.file}`));
      assert.ok(fs.statSync(`public/valoraciones/antea/${asset.file}`).size < 250_000);
    }
  }
  assert.match(visuals.ASSESSMENT_VISUALS[1].label, /4 metros/);
  assert.match(visuals.ASSESSMENT_VISUALS[4].label, /6 metros/);
});
test('all family guide cards have a relevant existing image and descriptive alt', () => {
  const guides = load('lib/family-guides.ts');
  const module = load('components/FamilyGuideLinks.tsx', { '@/lib/family-guides': guides });
  const tree = module.FamilyGuideLinks({});
  const images = all(tree, node => node.props?.fill === true);
  assert.equal(images.length, guides.familyGuides.length);
  for (const image of images) {
    assert.ok(fs.existsSync('public' + image.props.src));
    assert.ok(image.props.alt.length > 20);
    assert.ok(image.props.sizes.includes('100vw'));
  }
});
