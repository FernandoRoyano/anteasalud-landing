---
name: refactoring
description: Cuándo y cómo refactorizar con seguridad. Extraer componente/hook, centralizar queries, simplificar condicionales, eliminar prop drilling, tipar correctamente, early return. Usar cuando haya que limpiar código existente sin añadir features.
---

# SKILL: Refactorización

> Cuándo refactorizar, cómo hacerlo seguro, patrones concretos.

---

## 📜 Principio
Refactorizar = mejorar estructura interna sin cambiar comportamiento externo.
**Nunca refactorizar y añadir features en el mismo commit.**

---

## 🚨 Señales de que hay que refactorizar

### 🔴 Urgente — ahora
- Función o Server Action > 60 líneas
- Componente > 200 líneas
- Lógica duplicada en 3+ sitios
- `any` sin justificación
- Prop drilling > 3 niveles
- Archivo > 400 líneas

### 🟡 Próxima iteración
- Componente hace > 1 cosa
- Nombres opacos: `handleStuff`, `data2`, `tmp`
- Comentarios que explican QUÉ (debería explicarse solo)
- Query Supabase duplicada en componentes
- Lógica de negocio en componente UI

### 🟢 Cuando toques el archivo
- Variables de una letra: `d`, `e`, `res`
- Condicionales > 2 niveles
- Magic numbers: `* 1000`, `> 86400`

---

## 🧰 Patrones de refactorización

### 1. Extraer componente

```typescript
// ❌ Antes — todo junto
export function WorkoutsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Workouts</h1>
        <button className="bg-accent text-white px-4 py-2 rounded-lg" onClick={handleNew}>
          Nuevo
        </button>
      </div>
      {workouts.map(w => (
        <div key={w.id} className="bg-white rounded-xl p-4 border mb-4">
          <h3>{w.title}</h3>
        </div>
      ))}
    </div>
  )
}

// ✅ Después — responsabilidades separadas
export function WorkoutsPage() {
  return (
    <>
      <PageHeader title="Workouts" action={<NewWorkoutButton />} />
      <WorkoutList workouts={workouts} />
    </>
  )
}
```

### 2. Extraer custom hook

```typescript
// ❌ Antes — lógica mezclada con UI
export function CycleTracker() {
  const [phase, setPhase] = useState<CyclePhase>('folicular')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.from('cycle_logs').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(1)
      .then(({ data }) => {
        if (data?.[0]) setPhase(calculatePhase(data[0]))
        setLoading(false)
      })
  }, [])
  // 80+ líneas de UI debajo
}

// ✅ Después — hook separado
// hooks/useCycleData.ts
export function useCycleData(userId: string) {
  const [phase, setPhase] = useState<CyclePhase>('folicular')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const supabase = createClient()
    supabase.from('cycle_logs').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(1)
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) setError(error.message)
        else if (data?.[0]) setPhase(calculatePhase(data[0]))
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [userId])

  return { phase, loading, error }
}

// Componente limpio
export function CycleTracker({ userId }: Props) {
  const { phase, loading, error } = useCycleData(userId)
  if (loading) return <CycleTrackerSkeleton />
  if (error) return <ErrorState message={error} />
  return <CyclePhaseView phase={phase} />
}
```

### 3. Centralizar queries

```typescript
// ❌ Antes — duplicado en 5 sitios
const { data } = await supabase.from('workouts').select('*').eq('user_id', id)

// ✅ Después — lib/queries/workouts.ts
export async function getWorkoutsByUser(userId: string, options?: { limit?: number }) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('workouts')
    .select('id, title, date, duration_minutes')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(options?.limit ?? 20)

  if (error) throw new DatabaseError('getWorkoutsByUser', error)
  return data
}
```

### 4. Simplificar condicionales

```typescript
// ❌ Antes
function getStatusColor(status: string) {
  if (status === 'active') return 'text-green-500'
  else if (status === 'pending') return 'text-yellow-500'
  else if (status === 'error') return 'text-red-500'
  return 'text-gray-400'
}

// ✅ Después — lookup
const STATUS_STYLES: Record<string, string> = {
  active:  'text-green-500',
  pending: 'text-yellow-500',
  error:   'text-red-500',
}
const getStatusColor = (status: string) => STATUS_STYLES[status] ?? 'text-gray-400'
```

### 5. Eliminar prop drilling

```typescript
// ❌ Antes — drill 4 niveles
<Layout user={user}>
  <Sidebar user={user} />
  <Main><Header user={user} /><Content user={user} /></Main>
</Layout>

// ✅ Opción A — Context para estado realmente global
const UserContext = createContext<User | null>(null)
export const useUser = () => {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be inside UserProvider')
  return ctx
}

// ✅ Opción B — Composición + fetch en cada componente que lo necesite
<Layout>
  <Sidebar />  {/* hace su propio fetch */}
  <Main>
    <Header />
    <Content />
  </Main>
</Layout>
```

### 6. Tipar correctamente

```typescript
// ❌ Antes
function processData(data: any) {
  return data.items.map((i: any) => i.name)
}

// ✅ Después
interface DataItem { id: string; name: string; value: number }
interface DataResponse { items: DataItem[]; total: number }

function processData(data: DataResponse): string[] {
  return data.items.map(item => item.name)
}
```

### 7. Reemplazar `useEffect` con derivación

```typescript
// ❌ Antes — useEffect innecesario
const [filteredItems, setFilteredItems] = useState<Item[]>([])
useEffect(() => {
  setFilteredItems(items.filter(i => i.category === category))
}, [items, category])

// ✅ Después — derivación pura
const filteredItems = useMemo(
  () => items.filter(i => i.category === category),
  [items, category]
)
```

### 8. Early return

```typescript
// ❌ Antes — anidación profunda
function process(user: User | null) {
  if (user) {
    if (user.isActive) {
      if (user.subscription) {
        return doSomething(user)
      }
    }
  }
  return null
}

// ✅ Después — guard clauses
function process(user: User | null) {
  if (!user) return null
  if (!user.isActive) return null
  if (!user.subscription) return null
  return doSomething(user)
}
```

---

## 📁 Reorganización de archivos

```
Síntoma → Acción

Componente > 200 líneas → extraer subcomponentes a _components/
Lógica repetida en 3+ componentes → extraer hook a hooks/
Query Supabase repetida → centralizar en lib/queries/
Schema de validación inline → extraer a lib/validations/
Constantes mágicas dispersas → centralizar en constants/
Tipos repetidos → mover a types/
```

---

## 🔄 Proceso seguro — commits atómicos

```bash
# Un commit por tipo de refactor
git commit -m "refactor: rename handleData to processWorkoutSubmit"
git commit -m "refactor: extract WorkoutCard from WorkoutList"
git commit -m "refactor: extract useWorkoutData hook"
git commit -m "refactor: centralize workout queries in lib/queries"
git commit -m "refactor: add proper types to cycle module"
```

**Reglas:**
- Cada commit debe ser un cambio aislado
- Tras cada commit el código compila y funciona
- Si introduces bug, sabes exactamente en qué commit
- Permite revertir con cirugía, no a hachazos

---

## ✅ Checklist tras refactorizar

- [ ] Comportamiento idéntico antes y después
- [ ] Tipos TypeScript igual o más precisos
- [ ] Más legible para alguien externo
- [ ] Sin código duplicado
- [ ] Cada función/componente: 1 responsabilidad
- [ ] Nombres descriptivos sin necesitar comentarios
- [ ] `tsc --noEmit` sin errores
- [ ] `eslint .` sin warnings nuevos
- [ ] Test manual de las rutas afectadas
