import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const code = ts.transpileModule(fs.readFileSync('lib/seo.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const evaluatedModule = { exports: {} };
vm.runInNewContext(code, { module: evaluatedModule, exports: evaluatedModule.exports });
const { buildServiceSchema } = evaluatedModule.exports;

test('local service schema distinguishes a neighborhood from a city', () => {
  const base = { name: 'Ejercicio a domicilio', description: 'Servicio de ejercicio', path: '/prueba', areaServed: 'Madrid' };
  const city = buildServiceSchema(base);
  assert.equal(city.areaServed[0]['@type'], 'City');
  const neighborhood = buildServiceSchema({ ...base, path: '/ejercicio-mayores-pacifico', areaServed: 'Pacífico', areaServedType: 'Place' });
  assert.equal(neighborhood.areaServed[0]['@type'], 'Place');
  assert.equal(neighborhood.areaServed[0].name, 'Pacífico');
  assert.equal(neighborhood.url, 'https://anteasalud.com/ejercicio-mayores-pacifico');
  assert.equal(neighborhood.provider['@id'], city.provider['@id']);
});
