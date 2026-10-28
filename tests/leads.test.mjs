import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';
import { webcrypto } from 'node:crypto';

const loadDependency = createRequire(import.meta.url);

// Ejecuta los módulos reales contra servicios simulados, sin credenciales ni red.
function load(file, mocks) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const evaluatedModule = { exports: {} };
  vm.runInNewContext(code, {
    module: evaluatedModule, exports: evaluatedModule.exports,
    require: name => Object.hasOwn(mocks, name) ? mocks[name] : name.startsWith('@/lib/') ? load(`${name.replace('@/', '')}.ts`, mocks) : loadDependency(name),
    process: { env: { GOOGLE_SHEET_ID: 'test' } }, console, AbortSignal,
    fetch: mocks.fetch, ...mocks.globals,
  }, { filename: file });
  return evaluatedModule.exports;
}

function fixture(initialRows = [], sheetTitles = ['Hoja 1']) {
  const rows = structuredClone(initialRows);
  let failRead = false;
  let headers = [];
  const writes = [];
  const values = {
    clear: async args => {
      writes.push(args);
      const row = Number(args.range.match(/!A(\d+):Q/)[1]) - 2;
      for (let i = 0; i < 17; i++) rows[row][i] = '';
    },
    get: async ({ range }) => {
      if (failRead) throw new Error('Sheets unavailable');
      if (range.includes('J1:Q1')) return { data: { values: [headers] } };
      return { data: { values: rows } };
    },
    update: async args => { writes.push(args); if (args.range.includes('J1:Q1')) headers = args.requestBody.values[0]; },
    append: async args => { writes.push(args); rows.push(args.requestBody.values[0]); },
    batchUpdate: async args => {
      writes.push(args);
      for (const item of args.requestBody.data) {
        const [, col, row] = item.range.match(/!([A-Z]+)(\d+)/);
        const offset = col.charCodeAt(0) - 65;
        item.values[0].forEach((value, index) => { rows[Number(row) - 2][offset + index] = value; });
      }
    },
  };
  const sheets = { spreadsheets: {
    get: async () => ({ data: { sheets: sheetTitles.map(title => ({ properties: { title } })) } }), values,
  } };
  const api = load('lib/sheets.ts', {
    react: { cache: fn => fn },
    googleapis: { google: { auth: { GoogleAuth: class {} }, sheets: () => sheets } },
    '@/lib/article-editorial': {},
  });
  return { api, rows, writes, fail: () => { failRead = true; }, setHeaders: value => { headers = value; } };
}

const legacy = (name, phone) => ['23/10/2026, 10:00', name, '', phone, 'Madrid', 'Home · consulta', 'Nuevo', 'Nota existente', 'Sí'];

test('borra por identidad tras reordenar, conserva otros leads y columnas adicionales, y oculta filas vacías', async () => {
  const f = fixture([legacy('Primero', '600111222'), legacy('Segundo', '600111223')]);
  const [lead] = await f.api.getAllLeads();
  f.rows[0][17] = 'Columna propia';
  f.rows.reverse();
  await f.api.deleteLead(lead.id, 'formulario');
  assert.equal(f.writes.at(-1).range, "'Hoja 1'!A3:Q3");
  assert.equal(f.rows[1][17], 'Columna propia');
  const remaining = await f.api.getAllLeads();
  assert.equal(remaining.length, 1);
  assert.equal(remaining[0].nombre, 'Segundo');
  await assert.rejects(f.api.deleteLead(lead.id, 'formulario'));
  const ambiguous = fixture([legacy('Igual', '600111222'), legacy('Igual', '600111222')]);
  const [same] = await ambiguous.api.getAllLeads();
  await assert.rejects(ambiguous.api.deleteLead(same.id, 'formulario'));
  assert.equal(ambiguous.writes.length, 0);
});

test('el borrado exige sesión, identificador y procedencia válidos y propaga fallos', async () => {
  let authenticated = false, fail = false;
  const calls = [];
  const api = load('app/api/admin/leads/[row]/route.ts', {
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } },
    '@/lib/auth': { isAuthenticated: async () => authenticated },
    '@/lib/sheets': { deleteLead: async (...args) => { if (fail) throw Error('Unavailable'); calls.push(args); } },
    globals: { console: { error() {} } },
  });
  const id = '11111111-1111-4111-8111-111111111111';
  const del = (row = id, source = 'guia') => api.DELETE({ nextUrl: new URL('https://example.com?source=' + source) }, { params: Promise.resolve({ row }) });
  assert.equal((await del()).status, 401);
  authenticated = true;
  assert.equal((await del('2')).status, 400);
  assert.equal((await del(id, 'unknown')).status, 400);
  assert.equal(calls.length, 0);
  assert.equal((await del()).status, 200);
  assert.deepEqual(calls[0], [id, 'guia']);
  fail = true;
  assert.equal((await del()).status, 500);
});

test('la descarga se guarda en la pestaña de guía y no en solicitudes de valoración', async () => {
  const f = fixture([], ['Hoja 1', 'Guía caídas']);
  const result = await f.api.saveLead({ nombre: 'Prueba', email: 'prueba@example.com', formulario: 'Descarga de guía', interes: 'Descarga guía prevención caídas' });
  assert.equal(result.source, 'guia');
  assert.equal(f.writes.at(-1).range, "'Guía caídas'!A:Q");
});

test('valida datos, consentimiento, velocidad y errores antes de guardar', async () => {
  const saved = [];
  const api = load('app/api/contact/route.ts', {
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } },
    '@/lib/sheets': { saveLead: async data => { saved.push(data); return { duplicate: false }; } },
    '@/lib/rate-limit': { getClientIp: () => 'test', rateLimit: () => true },
    fetch: async () => ({ ok: true }),
  });
  const base = { nombre: 'Prueba', telefono: '+34 600 111 222', consent: true, fillMs: 5000 };
  const post = body => api.POST({ json: async () => body });
  for (const telefono of ['.........', '         ', '123-45-67', '+1234567890123456']) {
    assert.equal((await post({ ...base, telefono })).status, 400);
  }
  assert.equal((await post({ ...base, consent: false })).status, 400);
  assert.equal((await post({ ...base, fillMs: 500 })).status, 400);
  assert.equal((await post({ ...base, fillMs: -1 })).status, 400);
  assert.equal((await api.POST({ json: async () => { throw new SyntaxError('Invalid JSON'); } })).status, 400);
  assert.equal((await post({ ...base, website: 'spam' })).status, 200);
  assert.equal(saved.length, 0);
  assert.equal((await post(base)).status, 200);
  assert.equal((await post({ ...base, telefono: '', email: 'prueba@example.com', formulario: 'Descarga de guía' })).status, 200);
  assert.equal(saved.length, 2);
});

test('el fallo de guardado y el límite de envíos nunca confirman una solicitud', async () => {
  let notifications = 0;
  let allowed = true;
  const api = load('app/api/contact/route.ts', {
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } },
    '@/lib/sheets': { saveLead: async () => { throw new Error('Storage unavailable'); } },
    '@/lib/rate-limit': { getClientIp: () => 'test', rateLimit: () => allowed },
    fetch: async () => { notifications++; return { ok: true }; },
    globals: { console: { error() {} } },
  });
  const request = { json: async () => ({ nombre: 'Prueba', telefono: '600111222', consent: true, fillMs: 5000 }) };
  assert.equal((await api.POST(request)).status, 500);
  allowed = false;
  assert.equal((await api.POST(request)).status, 429);
  assert.equal(notifications, 0);
});

test('la fecha editorial se valida y se conserva al publicar por primera vez', async () => {
  const schemas = load('lib/admin-schemas.ts', {});
  const date = '2026-10-20T07:00:00Z';
  assert.equal(schemas.articleUpdateSchema.parse({ status: 'published', publishedAt: date }).publishedAt, date);
  assert.equal(schemas.articleUpdateSchema.safeParse({ publishedAt: '2026-02-30T07:00:00Z' }).success, false);
  let row = ['article-1', 'prueba-editorial', 'Título', 'Resumen', 'Contenido', '/articulos/perdida-fuerza.webp', '', 'draft', '', '2026-09-24T07:00:00Z', '2026-09-24T07:00:00Z'];
  const api = load('lib/sheets.ts', {
    react: { cache: fn => fn },
    '@/lib/article-editorial': {},
    googleapis: { google: { auth: { GoogleAuth: class {} }, sheets: () => ({ spreadsheets: {
      get: async () => ({ data: { sheets: [{ properties: { title: 'Articulos' } }] } }),
      values: {
        get: async ({ range }) => ({ data: { values: range.includes('A1:') ? [['id']] : [row] } }),
        update: async ({ requestBody }) => { row = requestBody.values[0]; },
      },
    } }) } },
  });
  const published = await api.updateArticle('article-1', { status: 'published', publishedAt: date });
  assert.equal(published.publishedAt, date);
  assert.equal(row[8], date);
  const edited = await api.updateArticle('article-1', { title: 'Título revisado' });
  assert.equal(edited.publishedAt, date);
  assert.equal(edited.createdAt, '2026-09-24T07:00:00Z');
});

test('guarda campos separados, UUID y texto literal sin evaluar fórmulas', async () => {
  const f = fixture();
  await f.api.saveLead({ nombre: 'Ana', telefono: '+34600111222', interes: 'Movilidad', procedencia: 'Página principal', ruta: '/', formulario: 'Contacto', mensaje: '=texto' });
  const row = f.rows[0];
  assert.match(row[9], /^[0-9a-f-]{36}$/);
  assert.equal(row[5], 'Movilidad');
  assert.equal(row[10], 'Página principal');
  assert.equal(row[13], '=texto');
  assert.equal(f.writes.at(-1).valueInputOption, 'RAW');
});

test('localiza un registro histórico tras reordenar y conserva datos anteriores', async () => {
  const f = fixture([legacy('Ana', '600111222'), legacy('Luis', '600333444')]);
  const [ana] = await f.api.getAllLeads();
  assert.equal(f.writes.length, 0);
  f.rows.reverse();
  await f.api.updateLead(ana.id, 'formulario', { estado: 'Valoración agendada', proximaAccion: 'Llamar', fechaSeguimiento: '2026-10-24' });
  assert.equal(f.rows[0][6], 'Nuevo');
  assert.equal(f.rows[1][6], 'Valoración agendada');
  assert.equal(f.rows[1][7], 'Nota existente');
  assert.equal(f.rows[1][8], 'Sí');
  assert.equal(f.rows[1][9], ana.id);
  assert.equal(f.rows[1][15], '2026-10-24');
  await f.api.updateLead(ana.id, 'formulario', { notas: 'Actualizada' });
  assert.equal(f.rows[1][14], 'Llamar');
});

test('no modifica un registro eliminado o identidades históricas ambiguas', async () => {
  const row = legacy('Ana', '600111222');
  const f = fixture([row, row]);
  const [ana] = await f.api.getAllLeads();
  await assert.rejects(f.api.updateLead(ana.id, 'formulario', { estado: 'Descartado' }), /ambiguo/);
  assert.equal(f.rows[0][6], 'Nuevo');
  f.rows.length = 0;
  await assert.rejects(f.api.updateLead(ana.id, 'formulario', { notas: 'test' }), /no encontrado/);
});

test('propaga errores de lectura en lugar de devolver una lista vacía', async () => {
  const f = fixture();
  f.fail();
  await assert.rejects(f.api.getAllLeads(), /unavailable/);
});

test('no sobrescribe columnas adicionales ocupadas', async () => {
  const f = fixture();
  f.setHeaders(['Datos propios']);
  await assert.rejects(f.api.saveLead({ nombre: 'Ana' }), /otros datos/);
  assert.equal(f.rows.length, 0);
});

test('el fallo de notificación no invalida una solicitud guardada', async () => {
  let saved;
  const api = load('app/api/contact/route.ts', {
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } },
    '@/lib/sheets': { saveLead: async data => { saved = data; return { duplicate: false }; } },
    '@/lib/rate-limit': { getClientIp: () => 'test', rateLimit: () => true },
    fetch: async () => { throw new Error('Email unavailable'); },
  });
  const result = await api.POST({ json: async () => ({ nombre: 'Ana', telefono: '600111222', consent: true, fillMs: 5000, procedencia: 'Inicio', ruta: '/', mensaje: 'Consulta' }) });
  assert.equal(result.status, 200);
  assert.equal(saved.mensaje, 'Consulta');
  assert.equal(saved.procedencia, 'Inicio');
});

test('reenvíos simultáneos y posteriores conservan una sola solicitud', async () => {
  const f = fixture();
  const input = { nombre: 'Ana', telefono: '600111222', requestId: 'd10846fb-5472-41df-9e90-bf5408848c45', mensaje: 'Consulta' };
  const result = await Promise.all([f.api.saveLead(input), f.api.saveLead(input)]);
  assert.equal(f.rows.length, 1);
  assert.equal(result.filter(value => value.duplicate).length, 1);
  // Una nueva instancia también reconoce el envío que ya está persistido.
  const restarted = fixture(f.rows);
  assert.equal((await restarted.api.saveLead({ ...input, consentAt: 'Otra hora' })).duplicate, true);
  assert.equal(restarted.rows.length, 1);
  await assert.rejects(restarted.api.saveLead({ ...input, mensaje: 'Otros datos' }), /otros datos/);
  await restarted.api.saveLead({ ...input, requestId: '0828e461-1b4b-4a44-b939-1b92ddc4341a', mensaje: 'Nueva consulta' });
  assert.equal(restarted.rows.length, 2);
});

test('un reenvío confirmado no vuelve a mandar la notificación', async () => {
  let notifications = 0;
  const api = load('app/api/contact/route.ts', {
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } },
    '@/lib/sheets': { saveLead: async () => ({ duplicate: true }) },
    '@/lib/rate-limit': { getClientIp: () => 'test', rateLimit: () => true },
    fetch: async () => { notifications++; return { ok: true }; },
  });
  const result = await api.POST({ json: async () => ({ nombre: 'Ana', telefono: '600111222', consent: true, fillMs: 5000 }) });
  assert.equal(result.status, 200);
  assert.equal(result.body.duplicate, true);
  assert.equal(notifications, 0);
});

test('el cliente agrupa dobles clics y conserva el ID tras perder la respuesta', async () => {
  const stored = new Map();
  const payloads = [];
  const mocks = {
    globals: { crypto: webcrypto, TextEncoder, window: { location: { pathname: '/' } },
      sessionStorage: { getItem: key => stored.get(key), setItem: (key, value) => stored.set(key, value) } },
    fetch: async (_url, request) => {
      payloads.push(JSON.parse(request.body));
      if (payloads.length === 1) throw new Error('Respuesta perdida');
      return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } });
    },
  };
  const api = load('lib/lead-client.ts', mocks);
  assert.equal(api.getLeadPageLabel('/', 'Inicio | ANTEA Salud'), 'Página principal');
  assert.equal(api.getLeadPageLabel('/guias/caidas-personas-mayores', 'Caídas y equilibrio: guía para familiares | ANTEA Salud'), 'Caídas y equilibrio: guía para familiares');
  assert.equal(api.getLeadPageLabel('/articulos/prueba', ''), '/articulos/prueba');
  const payload = { nombre: 'Ana', telefono: '600111222', mensaje: 'Consulta' };
  const guard = { consent: true, website: '', fillMs: 5000 };
  const first = await Promise.allSettled([api.postLead(payload, guard), api.postLead(payload, guard)]);
  assert.equal(first[0].status, 'rejected');
  assert.equal(payloads.length, 1);
  const restarted = load('lib/lead-client.ts', mocks);
  const response = await restarted.postLead(payload, guard);
  assert.equal(response.status, 200);
  assert.equal(payloads[0].requestId, payloads[1].requestId);
  const next = await Promise.all([restarted.postLead({ ...payload, mensaje: 'Nueva consulta' }, guard), restarted.postLead({ ...payload, mensaje: 'Nueva consulta' }, guard)]);
  assert.equal(payloads.length, 3);
  assert.notEqual(payloads[1].requestId, payloads[2].requestId);
  assert.equal((await next[0].json()).ok, true);
  assert.equal((await next[1].json()).ok, true);
  assert.ok(![...stored.keys(), ...stored.values()].some(value => value.includes('Ana') || value.includes('600111222')));
});

test('historial normaliza contactos y contadores excluyen los cerrados', () => {
  const api = load('lib/lead-management.ts', {});
  const base = { id: '1', source: 'formulario', telefono: '600 111 222', email: '', estado: 'Nuevo', fechaSeguimiento: '', procedencia: 'Inicio' };
  const leads = [base,
    { ...base, id: '2', telefono: '+34 600111222', estado: 'Contactado', fechaSeguimiento: '2026-10-24' },
    { ...base, id: '3', telefono: '0034600111222', estado: 'Convertido', fechaSeguimiento: '2026-10-23' },
    { ...base, id: '4', telefono: '600333444', estado: 'Valoración realizada', fechaSeguimiento: '2026-10-23' },
  ];
  assert.equal(api.getRelatedLeads(base, leads).length, 2);
  assert.equal(api.getFollowUpCounts(leads, '2026-10-24').nuevos, 1);
  assert.equal(api.getFollowUpCounts(leads, '2026-10-24').hoy, 1);
  assert.equal(api.getFollowUpCounts(leads, '2026-10-24').atrasados, 1);
  const [result] = api.getLeadResults(leads);
  assert.equal(result.total, 4);
  assert.equal(result.clientes, 1);
  assert.equal(result.valoraciones, 1);
});

test('WhatsApp usa el número del negocio, codifica el mensaje y admite popups bloqueados', () => {
  const navigations = [];
  const api = load('lib/lead-whatsapp.ts', { globals: { window: { location: { assign: url => navigations.push(url) } } } });
  const lead = { nombre: 'Prueba & familia', telefono: '+34 600 111 222', mensaje: 'Consulta con acentos: información' };
  const url = new URL(api.buildLeadWhatsAppUrl(lead));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/34633261963');
  assert.ok(url.searchParams.get('text').includes(lead.nombre));
  assert.ok(url.searchParams.get('text').includes(lead.mensaje));
  const popup = { closed: false, opener: {}, location: { href: '' } };
  api.sendLeadToWhatsApp(popup, lead);
  assert.equal(popup.opener, null);
  assert.equal(popup.location.href, url.href);
  api.sendLeadToWhatsApp(null, lead);
  assert.equal(navigations[0], url.href);
});

test('el endpoint valida fecha y estado antes de actualizar por identificador', async () => {
  const calls = [];
  const api = load('app/api/admin/leads/[row]/route.ts', {
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } },
    '@/lib/sheets': { updateLead: async (...args) => { calls.push(args); } },
    '@/lib/auth': { isAuthenticated: async () => true },
  });
  const id = 'd10846fb-5472-41df-9e90-bf5408848c45';
  const request = body => ({ json: async () => body, nextUrl: new URL('https://test/api/admin/leads/id?source=guia') });
  const context = { params: Promise.resolve({ row: id }) };
  assert.equal((await api.PATCH(request({ estado: 'Otro' }), context)).status, 400);
  assert.equal((await api.PATCH(request({ fechaSeguimiento: '2026-02-30' }), context)).status, 400);
  assert.equal(calls.length, 0);
  assert.equal((await api.PATCH(request({ estado: 'Valoración realizada', fechaSeguimiento: '' }), context)).status, 200);
  assert.equal(calls[0][0], id);
  assert.equal(calls[0][1], 'guia');
});
