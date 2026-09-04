---
name: security-checklist
description: Checklist de seguridad pre-deploy. Auth/sesiones, RLS, env vars, CORS y headers, validación Zod, Stripe webhooks, Codex API, dependencias, rate limiting, GDPR. Usar antes de cada deploy o al revisar seguridad.
---

# SKILL: Security Checklist

> Revisar antes de cada deploy a producción.
> Si algo falla aquí, no se despliega.

---

## 🛡️ Auth & Sesiones

- [ ] `getUser()` en servidor (NO `getSession()`)
- [ ] Middleware refresca cookies con `setAll`
- [ ] Rutas protegidas redirect a `/login` sin sesión
- [ ] Rutas auth (login/register) redirect a `/dashboard` con sesión
- [ ] OAuth callback valida `code` antes de redirect
- [ ] Sign out limpia cookies y redirige
- [ ] Password reset usa email del usuario autenticado, no input arbitrario
- [ ] Sesiones expiran (no `persistSession: true` indefinido)

---

## 🔒 RLS — Row Level Security

```sql
-- Verificar en Dashboard → Database → Tables
-- Cada tabla con datos de usuario DEBE tener RLS activo
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
```

- [ ] RLS activado en TODAS las tablas con datos sensibles
- [ ] Policy SELECT: usuario solo ve lo suyo
- [ ] Policy INSERT: `WITH CHECK (auth.uid() = user_id)`
- [ ] Policy UPDATE: `USING (auth.uid() = user_id)`
- [ ] Policy DELETE: explícita (puede ser bloqueada del todo)
- [ ] Tablas públicas tienen policy `FOR SELECT USING (true)` explícita
- [ ] Tablas admin: `auth.jwt() ->> 'role' = 'admin'`
- [ ] Storage buckets tienen policies (no solo "public")
- [ ] RLS testeado con usuario real, no solo en SQL editor

---

## 🔑 Variables de entorno

- [ ] `.env.local` en `.gitignore` (verificar con `git check-ignore .env.local`)
- [ ] `.env.example` actualizado con TODAS las vars (vacías)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` NUNCA con prefijo `NEXT_PUBLIC_`
- [ ] `STRIPE_SECRET_KEY` NUNCA con prefijo `NEXT_PUBLIC_`
- [ ] `ANTHROPIC_API_KEY` NUNCA con prefijo `NEXT_PUBLIC_`
- [ ] Validación con Zod en `lib/env.ts` (build falla si falta alguna)
- [ ] Vercel: vars configuradas para Production, Preview y Development
- [ ] Rotación de keys: planificada cada 6 meses

---

## 🌐 CORS y headers

```typescript
// next.config.ts
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
    ],
  }]
}
```

- [ ] HTTPS forzado (Vercel lo hace por defecto)
- [ ] HSTS header configurado
- [ ] X-Frame-Options: DENY (evita clickjacking)
- [ ] CORS solo para dominios propios en API routes
- [ ] CSP definido si manejas contenido user-generated

---

## 💉 Inyección y validación

- [ ] TODA entrada de usuario validada con Zod
- [ ] Server Actions validan FormData antes de DB
- [ ] API routes validan body antes de procesar
- [ ] `dangerouslySetInnerHTML` solo con HTML sanitizado (DOMPurify)
- [ ] No SQL crudo con concatenación de strings (usar el query builder)
- [ ] URLs de redirect validadas contra whitelist (evita open redirect)
- [ ] File uploads: validar tipo MIME y tamaño máximo

```typescript
// Ejemplo validación de upload
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024  // 5MB

if (!ALLOWED_TYPES.includes(file.type)) throw new Error('Tipo no permitido')
if (file.size > MAX_SIZE) throw new Error('Archivo demasiado grande')
```

---

## 💳 Pagos (Stripe)

- [ ] Webhook signature verificada SIEMPRE
- [ ] `STRIPE_WEBHOOK_SECRET` distinto entre dev y prod
- [ ] Precios definidos en Stripe Dashboard, no hardcoded en cliente
- [ ] Verificar `customer_id` pertenece al usuario autenticado
- [ ] Idempotency keys en operaciones de cobro
- [ ] Logs de eventos webhook (auditoría)
- [ ] Refunds requieren confirmación explícita

```typescript
// Verificar webhook
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return new Response('Invalid signature', { status: 400 })
  }
  // procesar event...
}
```

---

## 🤖 IA (Codex API)

- [ ] `ANTHROPIC_API_KEY` solo en servidor
- [ ] Rate limiting por usuario en endpoints `/api/ai/*`
- [ ] Tope de tokens máximo en cada request
- [ ] Sanitizar input antes de enviar a Codex (no inyectar instrucciones del sistema)
- [ ] Logs de uso por usuario (control de costes)
- [ ] Mensajes del usuario nunca van como `system` prompt
- [ ] No exponer raw error de Anthropic al frontend

---

## 📦 Dependencias

```bash
# Auditar vulnerabilidades
npm audit
npm audit fix

# Versiones desactualizadas
npm outdated

# Snyk o similar para CI
npx snyk test
```

- [ ] `npm audit` sin vulnerabilidades high/critical
- [ ] Dependencias actualizadas en últimos 3 meses
- [ ] Sin paquetes con < 100 stars o sin mantenimiento (>1 año sin commits)
- [ ] Lockfile (`package-lock.json`) commiteado
- [ ] Dependabot/Renovate activado en GitHub

---

## 🔐 Datos sensibles

- [ ] Sin secretos en código (verificar con `git secrets` o `truffleHog`)
- [ ] Sin emails reales en seeds o tests
- [ ] PII (DNI, tarjetas) nunca en logs
- [ ] Backups de Supabase activados
- [ ] Política de retención de datos definida
- [ ] GDPR: eliminación de cuenta borra TODOS los datos del usuario

---

## 🚦 Rate limiting

```typescript
// lib/rate-limit.ts (con Upstash Redis)
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '60 s'),
  analytics: true,
})

// En API route
const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'
const { success } = await ratelimit.limit(`ai:${userId ?? ip}`)
if (!success) return new Response('Too many requests', { status: 429 })
```

- [ ] Endpoints públicos con rate limit por IP
- [ ] Endpoints autenticados con rate limit por user_id
- [ ] Endpoints IA con límite agresivo (caro)
- [ ] Endpoints email/SMS con límite estricto (spam)

---

## 📝 Checklist final pre-deploy

```bash
# Ejecutar antes de cada deploy a prod
npm run build           # build limpio
npm audit              # sin vulns críticas
tsc --noEmit           # sin errores TS
eslint .               # sin warnings nuevos
```

- [ ] Variables de entorno en Vercel completas
- [ ] Migraciones Supabase aplicadas en prod
- [ ] Dominio custom configurado con HTTPS
- [ ] Sentry/logging activo en producción
- [ ] Backup de DB hecho antes del deploy
- [ ] Feature flags si despliegue es arriesgado
