import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function fixture() {
  const state = [];
  let load, failure = 0;
  const clients = [{ id: 'first', active: true }, { id: 'second', active: true }];
  const sessions = [{ id: 'sess_saved', clientId: 'second', date: '2026-11-13' }];
  const react = {
    useState: initial => {
      const index = state.length;
      state.push(initial);
      return [initial, next => { state[index] = typeof next === 'function' ? next(state[index]) : next; }];
    },
    useCallback: callback => { load = callback; return callback; },
    useEffect() {}, useMemo: callback => callback(),
  };
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync('app/admin/sesiones/page.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(code, {
    module, exports: module.exports, console: { error() {} },
    require: name => name === 'react' ? react : name === 'react/jsx-runtime' ? { jsx: () => null, jsxs: () => null } : {},
    fetch: async url => ({ status: failure || 200, ok: !failure, json: async () => failure ? { error: 'Unavailable' } : url.endsWith('clients') ? { clients } : { sessions } }),
  });
  module.exports.default();
  return { state, load: () => load(), fail: code => { failure = code; } };
}

test('failed refresh preserves loaded sessions, clients and selected client', async () => {
  const f = fixture();
  await f.load();
  f.state[4] = 'second';
  await f.load();
  assert.equal(f.state[4], 'second');
  const clients = f.state[0], sessions = f.state[1];
  f.fail(500);
  await f.load();
  assert.equal(f.state[0], clients);
  assert.equal(f.state[1], sessions);
  assert.ok(f.state[3]);
});

test('expired session is reported rather than interpreted as an empty database', async () => {
  const f = fixture();
  f.fail(401);
  await f.load();
  assert.equal(f.state[2], false);
  assert.match(f.state[3], /caducado/);
});
