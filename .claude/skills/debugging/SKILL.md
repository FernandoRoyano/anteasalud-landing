---
name: debugging
description: Metodología de debug (reproducir→aislar→hipótesis→verificar→corregir→validar), logging estructurado, errores comunes Next.js/Supabase/TypeScript y bugs específicos del stack. Usar cuando haya un bug o error.
---

# SKILL: Debugging

> Metodología sistemática + errores comunes del stack + herramientas.

---

## 🎯 Metodología — siempre en este orden

```
1. REPRODUCIR   → confirmar consistencia
2. AISLAR       → ¿qué archivo/función/query?
3. HIPÓTESIS    → causa probable ANTES de tocar código
4. VERIFICAR    → con logs/devtools, no adivinar
5. CORREGIR     → mínimo cambio necesario
6. VALIDAR      → no romper nada adyacente
```

**Regla:** Sin verificación, no hay fix. Solo "intentos a ciegas" que generan bugs nuevos.

---

## 📝 Logging estructurado

```typescript
// Prefijo siempre con módulo:función + contexto en objeto
console.log('[WorkoutActions:create]', { userId: user.id, title, date })
console.error('[Supabase:workouts]', { error: error.message, code: error.code, hint: error.hint })
console.warn('[Auth:middleware]', { path, reason: 'no session' })

// ❌ Sin contexto — inútil en producción
console.log(data)
console.log('error')

// Helper opcional
// lib/logger.ts
export const logger = {
  info: (module: string, data: object) => console.log(`[${module}]`, data),
  error: (module: string, error: unknown, context?: object) => 
    console.error(`[${module}]`, { error: error instanceof Error ? error.message : error, stack: error instanceof Error ? error.stack : undefined, ...context }),
  warn: (module: string, data: object) => console.warn(`[${module}]`, data),
}
```

---

## 🔍 Errores Next.js App Router

### Hidratación
```
Error: Hydration failed because the initial UI does not match
```
**Causa:** Render diferente entre servidor y cliente.

**Sospechosos habituales:**
- `Math.random()`, `Date.now()`, `new Date()` en render
- Acceso a `window`, `localStorage`, `navigator` sin guard
- Componente con lógica diferente SSR/CSR
- Atributos `id` generados aleatoriamente

**Fix:**
```typescript
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
if (!mounted) return <Skeleton />
```

### Server/Client boundary
```
Error: Event handlers cannot be passed to Client Component props
Error: Functions cannot be passed directly to Client Components
```
**Fix:** `'use client'` al componente padre o usar Server Action.

### Cookies en middleware
```
Error: Cookies can only be modified in a Server Action or Route Handler
```
**Fix:** Usar patrón Supabase SSR (ver `supabase.md`).

### Metadata en Client Component
```
Warning: You are attempting to export "metadata" from a component marked with "use client"
```
**Fix:** Mover metadata a archivo Server (page.tsx o layout.tsx).

### `params should be awaited` (Next.js 15+)
```
Error: Route used `params.id`. `params` should be awaited
```
**Fix:**
```typescript
// Next.js 15+: params es Promise
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // ...
}
```

---

## 🗄️ Errores Supabase

### Query devuelve vacío sin error
**Causa más probable:** RLS bloqueando.

**Debug:**
```typescript
// 1. Verificar usuario
const { data: { user } } = await supabase.auth.getUser()
console.log('[Debug] user.id:', user?.id)

// 2. Verificar policy en Dashboard → Authentication → Policies

// 3. Test con admin client (solo dev) para confirmar si es RLS
const admin = createAdminClient()
const { data } = await admin.from('tabla').select('*').eq('user_id', userId)
console.log('Sin RLS:', data?.length)  // Si aquí hay datos, es problema de RLS
```

### Error 406
```
Error: JSON object requested, multiple (or no) rows returned
```
**Causa:** `.single()` con 0 o más de 1 resultado.
```typescript
// ✅ usar maybeSingle si puede ser null
const { data } = await supabase.from('profiles').select().eq('id', userId).maybeSingle()
```

### Tipos desincronizados
**Síntoma:** TS no reconoce columnas nuevas o cambios de tipo.
```bash
npx supabase gen types typescript --project-id ID > types/supabase.ts
```

### JWT expired
```
Error: invalid JWT: unable to parse or verify signature
```
**Causa:** `getSession()` en servidor (no refresca token).
**Fix:** Siempre `getUser()` en servidor.

### RLS conflict
```
Error: new row violates row-level security policy
```
**Causa:** El insert/update no cumple `WITH CHECK`.
**Debug:** Verificar que `user_id` en el payload coincide con `auth.uid()`.

---

## 📐 Errores TypeScript

### `Property does not exist`
```typescript
// Opción 1: optional chaining
const value = obj?.prop ?? 'default'

// Opción 2: type guard
if (data && 'prop' in data) { /* ... */ }

// Opción 3: assertion (último recurso, comentar por qué)
const value = (data as ExpectedType).prop // safe: validado con Zod arriba
```

### Promesa no awaited
**Síntomas:** datos `undefined`, comportamiento aleatorio.
**Detectar:** `tsc --noEmit --strict` + ESLint rule `@typescript-eslint/no-floating-promises`

### `any` implícito
```bash
# Detectar todos los any implícitos
npx tsc --noEmit --strict
```

---

## 🔧 DevTools — qué usar para qué

| Problema | Herramienta |
|---|---|
| Estado React | React DevTools → Components |
| Re-renders | React DevTools → Profiler |
| Network requests | Chrome DevTools → Network → XHR/Fetch |
| CSS / Layout | DevTools → Elements → Computed |
| Performance | DevTools → Performance (grabar interacción) |
| Bundle size | `ANALYZE=true next build` |
| Queries Supabase | Dashboard → Logs → API logs |
| Postgres queries | Dashboard → Logs → Postgres logs |
| Vercel funciones | Vercel → Functions → Logs (real-time) |
| Tailwind classes | Extensión "Tailwind CSS IntelliSense" |

---

## 🎨 Debug CSS / Tailwind

### Conflicto de clases
```typescript
// ❌ Conflicto — la última no siempre gana
className={`bg-red-500 ${isActive ? 'bg-blue-500' : ''}`}

// ✅ cn() de lib/utils resuelve con twMerge
className={cn('bg-red-500', isActive && 'bg-blue-500')}
```

### Clase no aplicada
```typescript
// ❌ Tailwind no detecta clases construidas dinámicamente
const cls = `bg-${color}-500`  // NO funciona

// ✅ Mapping con clases completas
const colorClasses = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
}
className={colorClasses[color]}

// ✅ O safelist en tailwind.config.ts
safelist: ['bg-red-500', 'bg-blue-500']
```

---

## 🔬 Debug de Server Actions

```typescript
// Server Actions silencian errores en producción
// Siempre envolver con try/catch + log
'use server'
export async function createWorkout(formData: FormData) {
  try {
    const user = await requireUser()
    // ... lógica
    return { success: true }
  } catch (e) {
    console.error('[createWorkout] FAILED', { error: e, formData: Object.fromEntries(formData) })
    return { success: false, error: e instanceof Error ? e.message : 'Unknown' }
  }
}
```

---

## ⚡ Debug de hidratación específicos

```typescript
// Suprimir warning para casos legítimos (timestamps, etc)
<time suppressHydrationWarning>{new Date().toLocaleString()}</time>

// Forzar renderizado solo en cliente
const ClientOnly = dynamic(() => Promise.resolve(({ children }) => <>{children}</>), { ssr: false })
```

---

## ✅ Checklist antes de marcar bug como resuelto

- [ ] Funciona en Chrome, Firefox, Safari
- [ ] Funciona en móvil (375px)
- [ ] No rompe loading/error/empty states
- [ ] Sin `console.log` olvidados
- [ ] `tsc --noEmit` sin errores
- [ ] `eslint .` sin warnings nuevos
- [ ] El fix tiene sentido leído sin contexto del bug (si no, comentar)
- [ ] Test manual del happy path + 1-2 edge cases

---

## 🎭 Bugs específicos del stack

### Sesión se pierde entre páginas
1. ¿`updateSession` en middleware actualiza cookies con `setAll`?
2. ¿Site URL en Supabase Auth coincide con dominio Vercel?
3. ¿Cookie `sb-*` se está enviando en cada request?

### Componente no actualiza tras Server Action
1. ¿`revalidatePath('/ruta-correcta')`?
2. ¿La ruta coincide exactamente?
3. ¿Es Server o Client? Client necesita estado local + router.refresh()

### Build falla en Vercel pero no local
1. ¿Variables de entorno configuradas en Vercel?
2. ¿`tsc --noEmit` pasa local? (Vercel es más estricto)
3. ¿`npm run build` local funciona?
4. ¿Imports case-sensitive? Mac/Windows ignoran case, Linux no

### Realtime no recibe eventos
1. ¿Realtime está activado en la tabla? (Dashboard → Database → Replication)
2. ¿RLS permite la lectura al usuario suscrito?
3. ¿El channel se desuscribe en cleanup?

---

## 🧪 Últimos recursos — cuando nada tiene sentido

```bash
# Cache corrupta de Next.js
rm -rf .next && npm run dev

# node_modules raros tras cambio de rama
rm -rf node_modules package-lock.json && npm install

# TypeScript server pillado (VS Code)
# Cmd/Ctrl+Shift+P → "TypeScript: Restart TS Server"

# Git ignora cambios que sí existen
git status --ignored          # ver qué está ignorado
git check-ignore -v archivo   # por qué un archivo está ignorado

# Algo raro con cookies de Supabase
# DevTools → Application → Cookies → borrar sb-* y reiniciar sesión
```

---

## 🗣️ Antes de pedir ayuda — qué tener listo

1. **Qué esperabas** vs **qué ocurre** (1 línea cada uno)
2. **Error exacto** — copiado, no resumido
3. **Pasos para reproducir** — mínimo viable
4. **Qué has probado** — evita consejos duplicados
5. **Contexto del stack** — versiones de Next, Node, navegador
