import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
function load(path, mocks = {}) {
  const module = { exports: {} };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText, { module, exports: module.exports, require: name => name in mocks ? mocks[name] : require(name) });
  return module.exports;
}
const pricing = load('lib/public-pricing.ts');
const discovery = load('lib/article-discovery.ts');
const article = { title: 'Levantarse de la silla con más autonomía', excerpt: 'Fuerza para las tareas cotidianas', tags: ['fuerza', 'autonomía'] };

test('monthly examples use the actual calendar and public session prices', () => {
  assert.equal(pricing.estimateMonthlyPrice(8, 'plan'), 360);
  assert.equal(pricing.estimateMonthlyPrice(9, 'plan'), 405);
  assert.equal(pricing.estimateMonthlyPrice(10, 'plan'), 450);
  assert.equal(pricing.estimateMonthlyPrice(1, 'single'), 55);
  for (const value of [0, -1, 32, 1.5, NaN]) assert.equal(pricing.estimateMonthlyPrice(value, 'plan'), null);
});
test('article search tolerates accents and combines words and category', () => {
  assert.equal(discovery.articleMatchesSearch(article, 'AUTONOMIA silla'), true);
  assert.equal(discovery.articleMatchesSearch(article, '  '), true);
  assert.equal(discovery.articleMatchesSearch(article, 'silla hospital'), false);
  assert.equal(discovery.articleMatchesCategory(article, 'fuerza'), true);
  assert.equal(discovery.articleMatchesCategory(article, 'recuperacion'), false);
});
function harness(path, mocks = {}) {
  const states = [];
  let cursor;
  const react = { useState: initial => { const index = cursor++; if (!(index in states)) states[index] = initial; return [states[index], value => { states[index] = typeof value === 'function' ? value(states[index]) : value; }]; }, useMemo: fn => fn() };
  const module = load(path, { react, ...mocks });
  return { render: props => { cursor = 0; return (module.default || module.ArticlesFilter)(props); } };
}
function all(node, predicate) {
  if (!node || typeof node !== 'object') return [];
  return [...(predicate(node) ? [node] : []), ...[node.props?.children].flat(Infinity).flatMap(child => all(child, predicate))];
}
test('estimator controls update amount, reject empty quantity and switch modality', () => {
  const f = harness('components/MonthlyPriceEstimate.tsx', { '@/lib/public-pricing': pricing });
  const find = (type, tree = f.render()) => all(tree, node => node.type === type)[0];
  find('input').props.onChange({ target: { value: '10' } });
  assert.match(JSON.stringify(f.render()), /450/);
  find('input').props.onChange({ target: { value: '' } });
  assert.equal(find('input').props['aria-invalid'], true);
  find('select').props.onChange({ target: { value: 'single' } });
  assert.equal(find('input').props.value, '1');
  assert.match(JSON.stringify(f.render()), /55/);
});
test('search and category controls combine and reset an empty result', () => {
  const f = harness('components/ArticlesFilter.tsx', { '@/lib/article-discovery': discovery });
  const props = { articles: [{ ...article, id: 'one', slug: 'silla', ogImage: '/hero-fernando.webp', imageAlt: 'Ejemplo', publishedAt: '2026-11-14', readingMinutes: 3 }] };
  const render = () => f.render(props);
  all(render(), node => node.type === 'input')[0].props.onChange({ target: { value: 'inexistente' } });
  assert.equal(all(render(), node => node.type === 'h3' && node.props.children === 'No encontramos artículos con esa búsqueda.').length, 1);
  all(render(), node => node.type === 'button' && node.props.children === 'Borrar búsqueda y ver todos')[0].props.onClick();
  assert.equal(all(render(), node => node.type === 'input')[0].props.value, '');
  assert.equal(all(render(), node => node.type === 'h3' && node.props.children === 'No encontramos artículos con esa búsqueda.').length, 0);
});
