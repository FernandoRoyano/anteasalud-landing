---
name: performance
description: Core Web Vitals (LCP/INP/CLS), bundle size, lazy loading, next/image, queries Supabase sin N+1, caching (RSC fetch, ISR, SWR), Suspense streaming, memoización, virtualización. Usar para optimizar rendimiento.
---

# SKILL: Performance

> Core Web Vitals, bundle size, queries, caching, rendering.

---

## 🎯 Objetivos — Core Web Vitals

| Métrica | Bueno | Necesita mejora | Malo |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s | < 4.0s | > 4.0s |
| **INP** (Interaction to Next Paint) | < 200ms | < 500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 | < 0.25 | > 0.25 |
| **FCP** (First Contentful Paint) | < 1.8s | < 3.0s | > 3.0s |
| **TTFB** (Time to First Byte) | < 800ms | < 1.8s | > 1.8s |

**Medir:** PageSpeed Insights, Vercel Analytics, Chrome DevTools Lighthouse.

---

## 📦 Bundle size — primer enemigo

```bash
# Analizar bundle
ANALYZE=true npm run build

# Configurar
# next.config.ts
import bundleAnalyzer from '@next/bundle-analyzer'
export default bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(nextConfig)
```

### Reducir bundle

```typescript
// ❌ Importa toda la librería
import _ from 'lodash'
const result = _.debounce(fn, 300)

// ✅ Importa solo lo que usas
import debounce from 'lodash/debounce'
const result = debounce(fn, 300)

// ✅ Mejor: usar nativo si existe
const debouncedFn = useMemo(() => {
  let timeout: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), 300)
  }
}, [])
```

### Lazy load componentes pesados

```typescript
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('@/components/Chart'), {
  loading: () => <Skeleton className="h-64" />,
  ssr: false,
})

const Editor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false })
const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'))
```

### Reglas
- [ ] Bundle inicial < 200KB gzip
- [ ] Sin librerías UI completas (MUI, AntD) — usar componentes propios
- [ ] Iconos: `lucide-react` con tree-shaking, NO importar el barrel completo
- [ ] Charts: lazy load (chart.js, recharts pesan ~80KB)
- [ ] Markdown editors, code editors: SIEMPRE lazy + ssr: false

---

## 🖼️ Imágenes — optimización

```typescript
import Image from 'next/image'

// Hero image — siempre priority
<Image src="/hero.jpg" alt="..." width={1920} height={1080} priority sizes="100vw" />

// Above the fold — eager
<Image src="..." alt="..." loading="eager" />

// Below the fold — lazy automático
<Image src="..." alt="..." />

// Sizes para responsive
<Image src="..." alt="..." fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
```

- [ ] Formato `webp` o `avif` (Next.js lo hace automáticamente)
- [ ] Tamaños correctos (no servir 4K para thumbnail)
- [ ] `priority` solo en imágenes del LCP (1-2 por página)
- [ ] `sizes` definido en imágenes responsive
- [ ] `placeholder="blur"` para imágenes locales grandes
- [ ] Compresión externa antes de subir (TinyPNG, Squoosh)

---

## 🗄️ Queries Supabase — el segundo enemigo

### N+1 query — el clásico

```typescript
// ❌ N+1: 1 query + N queries
const workouts = await supabase.from('workouts').select('*').eq('user_id', userId)
for (const w of workouts.data!) {
  const { data: exercises } = await supabase.from('exercises').select('*').eq('workout_id', w.id)
  w.exercises = exercises
}

// ✅ JOIN — 1 sola query
const { data } = await supabase
  .from('workouts')
  .select(`
    id, title, date,
    exercises ( id, name, sets, reps )
  `)
  .eq('user_id', userId)
```

### Solo las columnas que usas

```typescript
// ❌ Trae todo
.select('*')

// ✅ Solo lo necesario
.select('id, title, created_at')
```

### Paginación obligatoria

```typescript
// ❌ Trae TODO
.select('*').eq('user_id', userId)

// ✅ Paginado
.select('*', { count: 'exact' })
.eq('user_id', userId)
.range(page * pageSize, (page + 1) * pageSize - 1)
```

### Índices en Postgres

```sql
-- Crear índices en columnas de filtros frecuentes
CREATE INDEX idx_workouts_user_date ON workouts(user_id, date DESC);
CREATE INDEX idx_exercises_workout ON exercises(workout_id);

-- Analizar queries lentas
EXPLAIN ANALYZE SELECT * FROM workouts WHERE user_id = 'xxx';
```

---

## 🚀 Caching — capas

### React Server Components — caché automático

```typescript
// fetch en RSC se cachea automáticamente
async function getWorkouts() {
  const res = await fetch('https://api.example.com/workouts')
  return res.json()
}

// Override para cachear N segundos
fetch(url, { next: { revalidate: 3600 } })

// Sin caché (datos en tiempo real)
fetch(url, { cache: 'no-store' })

// Con tags para revalidación selectiva
fetch(url, { next: { tags: ['workouts'] } })
// Luego: revalidateTag('workouts')
```

### Route segment config

```typescript
// app/dashboard/page.tsx
export const revalidate = 60          // ISR cada 60s
export const dynamic = 'force-static' // siempre estático

// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(p => ({ slug: p.slug }))
}
```

### Cliente — SWR / React Query

```typescript
// hooks/useWorkouts.ts
import useSWR from 'swr'

export function useWorkouts(userId: string) {
  return useSWR(
    `workouts-${userId}`,
    () => fetch(`/api/workouts?userId=${userId}`).then(r => r.json()),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
    }
  )
}
```

---

## ⚡ Rendering — Suspense streaming

```typescript
// app/dashboard/page.tsx
export default function Dashboard() {
  return (
    <>
      {/* Render inmediato */}
      <PageHeader title="Dashboard" />

      {/* Streaming — cada uno carga independiente */}
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>

      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <RecentActivity />
      </Suspense>
    </>
  )
}
```

---

## 🧠 React — evitar re-renders

### `useMemo` y `useCallback` con criterio

```typescript
// ✅ Útil — cálculo costoso
const sortedItems = useMemo(
  () => items.sort((a, b) => b.score - a.score),
  [items]
)

// ✅ Útil — referencia estable para hijos memoizados
const handleClick = useCallback(() => doSomething(id), [id])

// ❌ Innecesario — primitivos baratos
const total = useMemo(() => count + 1, [count])  // overhead > beneficio
```

### `React.memo` para componentes que reciben props complejas

```typescript
export const ExpensiveCard = React.memo(({ data }: { data: ComplexData }) => {
  return <div>{/* render costoso */}</div>
})
```

### Listas grandes — virtualización

```typescript
// Para listas > 100 items
import { useVirtualizer } from '@tanstack/react-virtual'

const virtualizer = useVirtualizer({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 80,
  overscan: 5,
})
```

---

## 🎨 CSS — layout shift

```css
/* ✅ Reservar espacio para evitar CLS */
.image-container {
  aspect-ratio: 16 / 9;  /* sin layout shift */
}

.skeleton {
  min-height: 200px;     /* mismo alto que el contenido real */
}

/* ✅ Fonts sin FOIT */
@font-face {
  font-family: 'Display';
  font-display: swap;    /* muestra fallback hasta que cargue */
}
```

---

## 🔧 Vercel — config recomendada

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns'],
    ppr: true,  // Partial Prerendering (cuando sea estable)
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
}
```

---

## 📊 Monitoring en producción

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

- [ ] Vercel Analytics + Speed Insights activos
- [ ] Sentry para errores en producción
- [ ] Logging de queries lentas (>500ms)
- [ ] Alerta si LCP > 4s o INP > 500ms
- [ ] Revisión mensual de Real User Metrics

---

## ✅ Checklist performance pre-deploy

- [ ] Lighthouse > 90 en Performance
- [ ] Bundle inicial < 200KB gzip
- [ ] LCP < 2.5s en 4G
- [ ] CLS < 0.1
- [ ] Imágenes optimizadas y con `Image`
- [ ] Componentes pesados con dynamic import
- [ ] Queries paginadas, con índices, sin N+1
- [ ] Caché donde aplique (ISR, SWR, fetch cache)
- [ ] Sin `console.log` en build de prod
- [ ] Fuentes con `font-display: swap`
