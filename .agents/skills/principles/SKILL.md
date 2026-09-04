---
name: principles
description: Principios transversales del sistema de desarrollo. Arquitectura en capas, error handling tipado, naming conventions, estructura de carpetas, red flags. Cargar SIEMPRE como base junto al skill del dominio.
---

# SKILL: Principios transversales

> Este skill contiene principios que aplican SIEMPRE, sin importar el task.
> Léelo junto con el skill específico del dominio.

---

## 🎯 Filosofía de código

### Claridad > cleverness
```typescript
// ❌ Inteligente pero opaco
const r = xs.reduce((a, c) => ({ ...a, [c.k]: (a[c.k] ?? 0) + c.v }), {})

// ✅ Claro
const totalsByKey = items.reduce<Record<string, number>>((totals, item) => {
  totals[item.key] = (totals[item.key] ?? 0) + item.value
  return totals
}, {})
```

### Explícito > implícito
```typescript
// ❌ ¿Qué devuelve? ¿Puede fallar?
async function getUser(id) { return supabase.from('users').select().eq('id', id).single() }

// ✅ Contrato claro
async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase.from('users').select().eq('id', id).maybeSingle()
  if (error) throw new DatabaseError('getUserById', error)
  return data
}
```

### Fail loud, fail early
```typescript
// En los edges del sistema — siempre validar
const parsed = Schema.safeParse(input)
if (!parsed.success) throw new ValidationError(parsed.error)

// En el core — confiar en los tipos
function processUser(user: User) { /* sin re-validar */ }
```

---

## 🏗️ Arquitectura — capas

```
┌─────────────────────────────────────────────┐
│  UI Layer         components/, app/*/page   │ ← solo presentación
├─────────────────────────────────────────────┤
│  Feature Layer    hooks/, actions.ts        │ ← lógica de interacción
├─────────────────────────────────────────────┤
│  Domain Layer     lib/queries/, lib/domain/ │ ← lógica de negocio pura
├─────────────────────────────────────────────┤
│  Infra Layer      lib/supabase/, lib/stripe │ ← acceso a servicios externos
└─────────────────────────────────────────────┘
```

**Regla:** las dependencias apuntan hacia abajo. La UI usa hooks. Los hooks usan queries. Las queries usan infra.

---

## 🔄 Patrones universales

### Error handling tipado

```typescript
// lib/errors.ts
export class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public context?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class DatabaseError extends AppError {
  constructor(operation: string, cause: unknown) {
    super('DATABASE_ERROR', `DB operation failed: ${operation}`, { cause })
  }
}

export class ValidationError extends AppError {
  constructor(zodError: ZodError) {
    super('VALIDATION_ERROR', 'Validation failed', { issues: zodError.issues })
  }
}

export class UnauthorizedError extends AppError {
  constructor(reason = 'Not authenticated') {
    super('UNAUTHORIZED', reason)
  }
}

// Uso en Server Action
export async function createWorkout(formData: FormData) {
  try {
    const user = await requireUser()
    const data = WorkoutSchema.parse(Object.fromEntries(formData))
    await workoutQueries.create({ ...data, userId: user.id })
    return { success: true as const }
  } catch (e) {
    if (e instanceof ValidationError) return { error: e.context?.issues, code: e.code }
    if (e instanceof UnauthorizedError) return { error: 'Unauthorized', code: e.code }
    console.error('[createWorkout]', e)
    return { error: 'Something went wrong', code: 'UNKNOWN' }
  }
}
```

### Result type para operaciones que pueden fallar

```typescript
type Result<T, E = AppError> =
  | { ok: true; data: T }
  | { ok: false; error: E }

// Útil cuando el error no es excepcional
async function trySignIn(email: string, password: string): Promise<Result<User>> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { ok: false, error: new AppError('AUTH_FAILED', error.message) }
  return { ok: true, data: data.user }
}

// Consumo explícito
const result = await trySignIn(email, password)
if (!result.ok) { /* manejar error */ return }
// aquí result.data está tipado como User
```

### Validación centralizada con Zod

```typescript
// lib/validations/workout.ts
import { z } from 'zod'

export const CreateWorkoutSchema = z.object({
  title: z.string().min(1, 'Título requerido').max(100),
  durationMinutes: z.coerce.number().int().min(1).max(480),
  date: z.string().datetime(),
  exercises: z.array(z.object({
    exerciseId: z.string().uuid(),
    sets: z.number().int().min(1).max(20),
    reps: z.number().int().min(1).max(100),
  })).min(1, 'Al menos un ejercicio'),
})

export type CreateWorkoutInput = z.infer<typeof CreateWorkoutSchema>

// Úsalo tanto en server (Action) como en client (form)
// = validación consistente end-to-end
```

### Auth guards reutilizables

```typescript
// lib/auth/guards.ts
import { createClient } from '@/lib/supabase/server'
import { UnauthorizedError } from '@/lib/errors'

export async function requireUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new UnauthorizedError()
  return user
}

export async function requireRole(role: 'admin' | 'trainer') {
  const user = await requireUser()
  const userRole = user.user_metadata?.role
  if (userRole !== role) throw new UnauthorizedError(`Requires role: ${role}`)
  return user
}
```

---

## 📝 Naming conventions

| Tipo | Convención | Ejemplo |
|---|---|---|
| Archivo componente | PascalCase.tsx | `WorkoutCard.tsx` |
| Archivo hook | camelCase.ts | `useWorkoutData.ts` |
| Archivo utility | kebab-case.ts | `format-date.ts` |
| Server Action | verbo + sustantivo | `createWorkout`, `deleteSession` |
| Query function | `get` + sustantivo | `getWorkoutsByUser` |
| Boolean | `is`/`has`/`should` | `isLoading`, `hasPermission`, `shouldRedirect` |
| Event handler | `handle` + evento | `handleSubmit`, `handleDelete` |
| Constante | UPPER_SNAKE_CASE | `MAX_FILE_SIZE`, `DEFAULT_TIMEOUT` |
| Type/Interface | PascalCase | `WorkoutData`, `UserProfile` |
| Enum/Literal union | PascalCase | `type Status = 'idle' \| 'loading'` |

---

## 🗂️ Estructura de carpetas — estándar

> Todo en raíz (sin `src/`). Alias `@/*` → `./*`.

```
app/                        # Next.js App Router
├─ (auth)/                 # Rutas sin layout principal
├─ (app)/                  # Rutas autenticadas
├─ (marketing)/            # Landing pública
└─ api/                    # API routes

components/
├─ ui/                     # Primitivos: Button, Input, Card, Modal, etc
├─ layouts/                # Layouts reutilizables
└─ [feature]/              # Componentes de dominio

hooks/                     # Custom hooks (always 'use client')
lib/
├─ supabase/
├─ queries/                # Queries Supabase centralizadas
├─ validations/            # Zod schemas
├─ auth/                   # Guards, helpers auth
├─ errors.ts
└─ utils.ts
types/                     # TypeScript globals
constants/                 # Business constants
styles/                    # globals.css, themes
```

---

## ✅ Checklist universal antes de dar un feature por terminado

- [ ] TypeScript sin errores: `tsc --noEmit`
- [ ] Lint sin errores: `eslint .`
- [ ] Funciona en móvil (375px)
- [ ] Los 5 estados cubiertos: idle, loading, success, error, empty
- [ ] Errores visibles al usuario con mensaje útil
- [ ] Loading states sin flashes (min-delay si la query es rápida)
- [ ] Sin `console.log` olvidados
- [ ] Env vars nuevas añadidas a `.env.example`
- [ ] Si toca DB: tipos regenerados
- [ ] Si es Server Action: `revalidatePath` donde corresponda

---

## 🚫 Red flags — nunca hacer

- `any` sin comentario explicando por qué
- `console.log` en código producción
- API keys en código del cliente (`NEXT_PUBLIC_*` con secretos)
- Queries sin `.limit()` en tablas grandes
- Updates/deletes sin filtrar por `user_id` (confiar solo en RLS es frágil)
- Componentes Server que pasan funciones a Client Components
- `useEffect` con fetch sin cleanup (memory leaks)
- `JSON.parse()` sin try/catch
- `.then()` sin `.catch()`
- Archivos > 400 líneas → extraer módulos

---

## 🎬 Al empezar cualquier task

```
1. ¿Qué tipo de task es? → Identifica skills necesarios
2. ¿El contexto existente es suficiente? → Si no, pregunta UNA cosa
3. ¿Hay un patrón ya establecido en el proyecto? → Síguelo
4. Ejecuta con el mínimo de archivos
5. Valida con el checklist
```
