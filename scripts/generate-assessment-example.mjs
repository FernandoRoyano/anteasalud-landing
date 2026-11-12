import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';

const dependency = createRequire(import.meta.url);
const modules = new Map();
function load(file) {
  if (modules.has(file)) return modules.get(file);
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const evaluatedModule = { exports: {} };
  vm.runInNewContext(code, { module: evaluatedModule, exports: evaluatedModule.exports, Buffer, Date, Intl,
    require: name => name.startsWith('@/lib/') ? load(`${name.replace('@/', '')}.ts`) : dependency(name),
  });
  modules.set(file, evaluatedModule.exports);
  return evaluatedModule.exports;
}

const { assessmentExample } = load('lib/assessment-example.ts');
const { buildAssessmentReportPdf } = load('lib/assessment-report-pdf.ts');
fs.mkdirSync('public/ejemplos', { recursive: true });
fs.writeFileSync('public/ejemplos/Antea-informe-ejemplo.pdf', await buildAssessmentReportPdf(assessmentExample, { example: true }));
console.log('Ejemplo ficticio generado sin acceder a clientes ni guardar una valoración.');
