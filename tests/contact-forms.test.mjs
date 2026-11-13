import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';

const dependency = createRequire(import.meta.url);

function formHarness(file, { ok = true, duplicate = false } = {}) {
  const states = [];
  const submissions = [];
  let cursor = 0;
  let conversions = 0;
  const mocks = {
    react: {
      useId: () => 'test-form', useRef: () => ({ current: null }), useEffect() {},
      useState: initial => {
        const index = cursor++;
        if (!(index in states)) states[index] = initial;
        return [states[index], value => { states[index] = typeof value === 'function' ? value(states[index]) : value; }];
      },
    },
    '@/components/GoogleTag': { trackLeadConversion: () => { conversions++; } },
    '@/components/ConsentCheckbox': { ConsentCheckbox() {}, HoneypotField() {} },
    '@/components/LeadForm': { leadInputClass: 'test-input' },
    '@/lib/lead-client': {
      useFormTimer: () => () => 5000,
      postLead: async (lead, options) => {
        submissions.push({ lead, options });
        return { ok, json: async () => ({ error: 'No se pudo guardar' }), clone: () => ({ json: async () => ({ duplicate }) }) };
      },
    },
    '@/lib/lead-whatsapp': { buildWhatsAppUrl: () => 'https://wa.me/34633261963?text=optional' },
  };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const evaluatedModule = { exports: {} };
  // No window global: any accidental popup or navigation during submission fails this test.
  vm.runInNewContext(code, { module: evaluatedModule, exports: evaluatedModule.exports,
    require: name => Object.hasOwn(mocks, name) ? mocks[name] : dependency(name),
  });
  return {
    render() { cursor = 0; return evaluatedModule.exports.default({ origen: 'Prueba ficticia' }); },
    submissions, states, get conversions() { return conversions; },
  };
}

function find(node, predicate) {
  if (!node || typeof node !== 'object') return null;
  if (predicate(node)) return node;
  for (const child of [node.props?.children].flat(Infinity)) {
    const match = find(child, predicate);
    if (match) return match;
  }
  return null;
}

for (const file of ['components/LeadForm.tsx', 'components/ContactForm.tsx']) {
  test(`${file}: guarda y confirma sin abrir WhatsApp, ofrece un enlace opcional`, async () => {
    const form = formHarness(file);
    const tree = form.render();
    find(tree, node => node.type === 'input' && node.props.autoComplete === 'name').props.onChange({ target: { value: 'Persona ficticia' } });
    find(tree, node => node.type === 'input' && node.props.type === 'tel').props.onChange({ target: { value: '600000000' } });
    find(tree, node => node.type === 'input' && node.props.id === 'test-form-barrio').props.onChange({ target: { value: '28007' } });
    await form.render().props.onSubmit({ preventDefault() {} });
    assert.ok(form.submissions[0].lead.zona.includes('28007'));
    assert.equal(form.submissions.length, 1);
    assert.equal(form.submissions[0].lead.nombre, 'Persona ficticia');
    assert.equal(form.submissions[0].lead.telefono, '600000000');
    assert.equal(form.conversions, 1);
    assert.equal(form.states[0], 'success');
    const confirmation = form.render();
    assert.notEqual(confirmation.type, 'form');
    assert.ok(find(confirmation, node => node.type === 'a' && node.props.href.startsWith('https://wa.me/')));
  });

  test(`${file}: fallo de guardado no muestra éxito ni dispara conversión`, async () => {
    const form = formHarness(file, { ok: false });
    await form.render().props.onSubmit({ preventDefault() {} });
    assert.equal(form.states[0], 'error');
    assert.equal(form.conversions, 0);
    assert.ok(find(form.render(), node => node.props?.role === 'alert'));
  });

  test(`${file}: un reenvío duplicado no repite la conversión`, async () => {
    const form = formHarness(file, { duplicate: true });
    await form.render().props.onSubmit({ preventDefault() {} });
    assert.equal(form.states[0], 'success');
    assert.equal(form.conversions, 0);
  });
}
