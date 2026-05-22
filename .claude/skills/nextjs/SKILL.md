---
name: nextjs
description: Next.js 14+ App Router. Server vs Client Components, Server Actions con useFormState, API routes, loading/error boundaries, metadata y SEO, next/image, middleware, env vars. Usar para rendering, routing y patrones de App Router.
---

# SKILL: Next.js 14+ (App Router)

> Patrones de App Router, rendering, routing y performance.

---

## 📁 Estructura de rutas

```
app/
├─ (marketing)/              # Grupo sin layout de app
│  ├─ page.tsx              # Landing pública
│  ├─ pricing/page.tsx
│  └─ about/page.tsx
├─ (auth)/                   # Login, register, forgot
│  └─ layout.tsx            # Layout minimal
├─ (app)/                    # Área autenticada
│  ├─ layout.tsx            # Layout con sidebar/nav
│  ├─ dashboard/
│  │  ├─ page.tsx
│  │  ├─ loading.tsx        # Suspense boundary automático
│  │  ├─ error.tsx          # Error boundary automático
│  │  ├─ not-found.tsx
│  │  ├─ actions.ts         # Server Actions
│  │  └─ _components/       # Privados de la ruta (no rutas)
│  └─ settings/
│     ├─ page.tsx
│     └─ @modal/            # Parallel route para modal
├─ api/
│  └─ [feature]/route.ts
├─ layout.tsx                # Root layout
├─ not-found.tsx
└─ error.tsx                 # Global error boundary
```

---

## 🔀 Server vs Client Component

**Regla mental:** Por defecto Server. Solo Client cuando necesitas interactividad.

```
¿Necesita estado, eventos, hooks, browser APIs? → 'use client'
¿Solo muestra datos, accede a cookies, fetch de DB? → Server (default)
```

### Patrón compuesto — lo más común

```typescript
// app/(app)/workouts/page.tsx — Server Component
import { WorkoutList } from './_components/WorkoutList'
import { getWorkoutsByUser } from '@/lib/queries/workouts'
import { requireUser } from '@/lib/auth/guards'

export default async function WorkoutsPage() {
  const user = await requireUser()
  const workouts = await getWorkoutsByUser(user.id)
  return <WorkoutList initialData={workouts} userId={user.id} />
}

// app/(app)/workouts/_components/WorkoutList.tsx — Client Component
'use client'
export function WorkoutList({ initialData, userId }: Props) {
  const [data, setData] = useState(initialData)
  // interactividad aquí
}
```

---

## ⏳ loading.tsx & error.tsx — siempre crear

```typescript
// app/(app)/dashboard/loading.tsx
import { CardSkeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  )
}

// app/(app)/dashboard/error.tsx
'use client'
import { Button } from '@/components/ui/Button'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <p className="text-muted">Algo salió mal: {error.message}</p>
      <Button onClick={reset}>Reintentar</Button>
    </div>
  )
}
```

---

## 🎬 Server Actions — formularios y mutaciones

```typescript
// app/(app)/workouts/actions.ts
'use server'
import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/auth/guards'
import { CreateWorkoutSchema } from '@/lib/validations/workout'
import { revalidatePath } from 'next/cache'
import { ValidationError, UnauthorizedError } from '@/lib/errors'

type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> }

export async function createWorkout(formData: FormData): Promise<ActionResult> {
  try {
    const user = await requireUser()

    const parsed = CreateWorkoutSchema.safeParse(Object.fromEntries(formData))
    if (!parsed.success) {
      return { success: false, error: 'Validation failed', fieldErrors: parsed.error.flatten().fieldErrors }
    }

    const supabase = createClient()
    const { error } = await supabase.from('workouts').insert({
      ...parsed.data,
      user_id: user.id,
    })

    if (error) return { success: false, error: error.message }

    revalidatePath('/dashboard/workouts')
    return { success: true, data: undefined }
  } catch (e) {
    if (e instanceof UnauthorizedError) return { success: false, error: 'Unauthorized' }
    console.error('[createWorkout]', e)
    return { success: false, error: 'Unknown error' }
  }
}
```

### Form con useFormState + useFormStatus

```typescript
// app/(app)/workouts/_components/NewWorkoutForm.tsx
'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { createWorkout } from '../actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button type="submit" loading={pending}>Crear</Button>
}

export function NewWorkoutForm() {
  const [state, formAction] = useFormState(createWorkout, { success: false, error: '' })

  return (
    <form action={formAction} className="space-y-4">
      <Input name="title" label="Título" error={state.fieldErrors?.title?.[0]} required />
      <Input name="date" type="date" label="Fecha" required />
      {state.error && <p className="text-fluid-sm text-danger">{state.error}</p>}
      <SubmitButton />
    </form>
  )
}
```

---

## 🛣️ API Routes — patrón estándar

```typescript
// app/api/workouts/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const BodySchema = z.object({ title: z.string(), date: z.string().datetime() })

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const parsed = BodySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const { data, error } = await supabase.from('workouts').insert({ ...parsed.data, user_id: user.id }).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ data })
  } catch (err) {
    console.error('[API:workouts:POST]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

---

## 🔍 Metadata — SEO

```typescript
// Estática
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: { default: 'TrainHub', template: '%s | TrainHub' },
  description: '...',
  openGraph: {
    title: 'TrainHub',
    description: '...',
    images: ['/og.png'],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

// Dinámica
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const item = await getItem(params.id)
  if (!item) return {}
  return {
    title: item.title,
    description: item.description,
    openGraph: { images: [item.image ?? '/og.png'] },
  }
}
```

---

## 🖼️ Imágenes — siempre `next/image`

```typescript
import Image from 'next/image'

// Tamaño conocido
<Image src="/hero.jpg" alt="..." width={1200} height={630} priority className="..." />

// Fill (llena contenedor)
<div className="relative aspect-video">
  <Image src="/img.jpg" alt="..." fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
</div>

// Remote images: configurar next.config.js
// images: { remotePatterns: [{ protocol: 'https', hostname: 'supabase.co' }] }
```

---

## 🚀 Performance

```typescript
// Lazy load de componentes pesados
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('@/components/Chart'), {
  loading: () => <Skeleton className="h-64" />,
  ssr: false,  // solo si usa browser APIs
})

// Prefetch de rutas frecuentes — automático en <Link>, también manual:
import { useRouter } from 'next/navigation'
const router = useRouter()
useEffect(() => router.prefetch('/dashboard'), [])

// Suspense streaming
<Suspense fallback={<CardSkeleton />}>
  <SlowDataComponent />
</Suspense>

// Route segment config
export const dynamic = 'force-static'    // renderiza en build
export const revalidate = 3600            // ISR cada hora
export const fetchCache = 'force-cache'
```

---

## 🍪 Middleware

```typescript
// middleware.ts — ver supabase.md para versión completa con auth
export { default } from '@/lib/supabase/middleware'

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

---

## 🌍 Variables de entorno

```env
# .env.local — nunca en git
# Públicas (accesibles en browser)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=

# Privadas (solo servidor)
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
ANTHROPIC_API_KEY=

# .env.example — siempre actualizado en git con valores vacíos
```

### Validación en tiempo de build

```typescript
// lib/env.server.ts  → ⚠️ solo servidor: contiene secretos
import 'server-only'
import { z } from 'zod'

const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  ANTHROPIC_API_KEY: z.string().startsWith('sk-ant-'),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_').optional(),
})

export const serverEnv = serverSchema.parse(process.env)

// lib/env.client.ts  → seguro en cliente: solo NEXT_PUBLIC_*
import { z } from 'zod'

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
})

export const clientEnv = clientSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
})
// Si falta alguna, el build explota con mensaje claro.
// ⚠️ Nunca importes env.server.ts desde Client Components — bundle leak de secretos.
```

---

## ⚠️ Errores comunes — evitar

- ❌ `useRouter` en Server Components → usar `redirect()` de `next/navigation`
- ❌ Pasar funciones como props de Server → Client
- ❌ `fetch` en Client Component sin caché (usar SWR o React Query)
- ❌ `<img>` en lugar de `<Image>`
- ❌ Olvidar `loading.tsx` en rutas async
- ❌ Olvidar `revalidatePath` tras mutaciones
- ❌ Cookies/localStorage en Server Components
- ❌ `use client` en archivos con metadata exportada
