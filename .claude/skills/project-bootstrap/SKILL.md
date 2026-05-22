---
name: project-bootstrap
description: Setup paso a paso de proyecto Next.js + Supabase desde cero en ~30 min. TypeScript estricto, ESLint/Prettier, estructura de carpetas, clientes Supabase, design system, auth flow, deploy a Vercel. Usar al iniciar proyecto nuevo.
---

# SKILL: Project Bootstrap

> Setup de proyecto Next.js + Supabase nuevo en ~30 minutos.
> Sigue los pasos en orden. No saltes ninguno.

---

## 1️⃣ Crear proyecto Next.js

```bash
npx create-next-app@latest mi-proyecto \
  --typescript --tailwind --app --no-src-dir --import-alias "@/*" --no-eslint
cd mi-proyecto
```

Eliminar lo innecesario:
```bash
rm -rf app/favicon.ico public/next.svg public/vercel.svg public/file.svg public/window.svg public/globe.svg
```

---

## 2️⃣ Instalar dependencias core

```bash
# Core
npm install @supabase/ssr @supabase/supabase-js zod clsx tailwind-merge

# Dev
npm install -D @types/node prettier prettier-plugin-tailwindcss eslint-config-next

# Opcionales según proyecto
npm install zustand              # estado global ligero
npm install @anthropic-ai/sdk    # IA
npm install stripe @stripe/stripe-js  # pagos
npm install lucide-react         # iconos
npm install date-fns             # fechas
npm install react-hook-form @hookform/resolvers  # forms complejos
```

---

## 3️⃣ Configurar TypeScript estricto

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] },
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 4️⃣ ESLint + Prettier

```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-floating-promises": "error"
  }
}
```

```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

## 5️⃣ Estructura de carpetas

> Todo en raíz. Alias `@/*` → `./*`.

```bash
mkdir -p components/{ui,layouts} hooks lib/{supabase,queries,validations,auth} types constants styles
```

```
app/
├─ (auth)/
├─ (app)/
├─ (marketing)/
└─ api/
components/
├─ ui/
└─ layouts/
hooks/
lib/
├─ supabase/
├─ queries/
├─ validations/
├─ auth/
├─ errors.ts
├─ utils.ts
├─ env.server.ts
└─ env.client.ts
types/
constants/
styles/
```

---

## 6️⃣ Setup Supabase

### En Supabase Dashboard
1. Crear proyecto nuevo
2. Project Settings → API → copiar `URL` + `anon key` + `service_role key`
3. Authentication → URL Configuration → añadir Site URL: `http://localhost:3000`
4. Authentication → Providers → activar Email (y los que necesites)

### Variables de entorno

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

```bash
# .env.example (commitear)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

### Validación de env

Copiar bloque `env.server.ts` + `env.client.ts` del skill `nextjs` (separa secretos y públicos para evitar leaks al cliente).

### Clientes Supabase
Copiar del skill `supabase` los 3 clientes (server, client, admin) + middleware.

### Tipos
```bash
npx supabase login
npx supabase link --project-ref TU_REF
npx supabase gen types typescript --linked > types/supabase.ts
```

Añadir script:
```json
// package.json
"scripts": {
  "db:types": "supabase gen types typescript --linked > types/supabase.ts"
}
```

---

## 7️⃣ Files base

### `lib/utils.ts`
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
```

### `lib/errors.ts`
Copiar del skill `principles`.

### `lib/auth/guards.ts`
Copiar del skill `supabase`.

### `middleware.ts` (raíz)
```typescript
import { updateSession } from '@/lib/supabase/middleware'
export const middleware = updateSession
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

---

## 8️⃣ Design system

### `app/globals.css`
Copiar bloque completo de tokens del skill `design-system`.

### `tailwind.config.ts`
Copiar config completa del skill `design-system`.

### Fuentes (next/font)
```typescript
// app/layout.tsx
import { Inter, Bricolage_Grotesque } from 'next/font/google'

const body = Inter({ subsets: ['latin'], variable: '--font-body' })
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' })

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={cn(body.variable, display.variable)}>
      <body className="font-body">{children}</body>
    </html>
  )
}
```

```css
/* globals.css */
.font-body { font-family: var(--font-body), system-ui, sans-serif; }
.font-display { font-family: var(--font-display), serif; }
```

---

## 9️⃣ Componentes UI base

Crear archivos en `components/ui/` copiando del skill `ui-components`:

```bash
touch components/ui/{Button,Input,Card,Badge,Modal,Skeleton,Toast,Avatar,EmptyState,Tabs,Select,Checkbox,Divider}.tsx
touch components/layouts/PageHeader.tsx
```

---

## 🔟 Auth flow básico

```bash
mkdir -p app/\(auth\)/{login,register}
mkdir -p app/auth/callback
```

Crear:
- `app/(auth)/login/page.tsx` — form con email/password
- `app/(auth)/register/page.tsx`
- `app/auth/callback/route.ts` — handler OAuth/magic link

Copiar plantillas del skill `supabase`.

---

## 1️⃣1️⃣ Layout app autenticada

```typescript
// app/(app)/layout.tsx
import { requireUser } from '@/lib/auth/guards'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await requireUser()  // redirect a /login si no hay sesión

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r border-border">{/* nav */}</aside>
      <main className="flex-1">{children}</main>
    </div>
  )
}
```

---

## 1️⃣2️⃣ Scripts útiles

```json
// package.json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "lint:fix": "next lint --fix",
  "format": "prettier --write \"**/*.{ts,tsx,md}\"",
  "type-check": "tsc --noEmit",
  "check": "npm run type-check && npm run lint",
  "db:types": "supabase gen types typescript --linked > types/supabase.ts",
  "analyze": "ANALYZE=true next build"
}
```

---

## 1️⃣3️⃣ Git

```bash
git init
git add .
git commit -m "chore: initial setup"

# .gitignore — verificar que incluye:
# .env.local
# .env*.local
# node_modules/
# .next/
# .vercel/
```

---

## 1️⃣4️⃣ Deploy a Vercel

```bash
# Push a GitHub
gh repo create mi-proyecto --private --source=. --push

# Conectar en Vercel:
# 1. vercel.com → Import Project → seleccionar repo
# 2. Configurar env vars (mismas que .env.local pero NEXT_PUBLIC_SITE_URL = dominio prod)
# 3. Deploy

# Después: actualizar Supabase
# Authentication → URL Configuration → Site URL = dominio prod + redirect URLs
```

---

## ✅ Checklist final

- [ ] `npm run dev` arranca sin errores
- [ ] `npm run type-check` sin errores
- [ ] `npm run build` exitoso
- [ ] Login con email funciona
- [ ] Sesión persiste tras refresh
- [ ] Middleware protege rutas autenticadas
- [ ] Tipos Supabase generados
- [ ] Tokens CSS funcionan (botón con `bg-accent`)
- [ ] `.env.example` commiteado
- [ ] `.env.local` en `.gitignore`
- [ ] Deploy en Vercel funciona
- [ ] Site URL actualizada en Supabase

---

## ⏱️ Tiempo orientativo

| Fase | Tiempo |
|---|---|
| Pasos 1-5 (estructura) | 5 min |
| Pasos 6-7 (Supabase + base files) | 10 min |
| Pasos 8-9 (design system + UI) | 5 min (copy/paste) |
| Pasos 10-11 (auth + layout) | 8 min |
| Pasos 12-14 (scripts, git, deploy) | 5 min |
| **Total** | **~30 min** |
