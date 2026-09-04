---
name: supabase
description: Supabase — clientes SSR (server/client/admin), middleware con getUser, auth flows (password/OAuth/magic link), RLS policies, queries centralizadas, Storage, Realtime, Edge Functions, generación de tipos. Usar para DB, auth y backend.
---

# SKILL: Supabase

> Auth, DB, RLS, Storage, Edge Functions, Realtime.

---

## 🔌 Setup clientes

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {}
        },
      },
    }
  )
}

// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// lib/supabase/admin.ts — SOLO servidor, bypass RLS
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
```

---

## 🛡️ Middleware con refresh de sesión

```typescript
// lib/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )

  // ⚠️ SIEMPRE getUser() — nunca getSession() en servidor
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isProtected = pathname.startsWith('/dashboard') || pathname.startsWith('/app')
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register')

  if (!user && isProtected) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  if (user && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

// middleware.ts (raíz)
import { updateSession } from '@/lib/supabase/middleware'
export const middleware = updateSession
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

---

## 🔐 Guards de autenticación

```typescript
// lib/auth/guards.ts
import { createClient } from '@/lib/supabase/server'
import { UnauthorizedError } from '@/lib/errors'
import type { User } from '@supabase/supabase-js'

export async function requireUser(): Promise<User> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new UnauthorizedError()
  return user
}

export async function getCurrentUser(): Promise<User | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function requireRole(role: 'admin' | 'trainer' | 'user') {
  const user = await requireUser()
  const userRole = user.user_metadata?.role
  if (userRole !== role) throw new UnauthorizedError(`Requires role: ${role}`)
  return user
}
```

---

## 🗄️ Generación de tipos

```bash
# Ejecutar cada vez que cambie el schema
npx supabase gen types typescript --project-id TU_ID > types/supabase.ts

# O con la CLI instalada globalmente:
supabase gen types typescript --linked > types/supabase.ts
```

Tipos de tablas helper:
```typescript
// types/database.ts
import type { Database } from './supabase'
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Uso: type Workout = Tables<'workouts'>
```

---

## 📊 Queries — patrones centralizados

```typescript
// lib/queries/workouts.ts
import { createClient } from '@/lib/supabase/server'
import { DatabaseError } from '@/lib/errors'
import type { Tables, Inserts } from '@/types/database'

export async function getWorkoutsByUser(userId: string, limit = 20) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('workouts')
    .select('id, title, date, duration_minutes, exercises(id, name, sets, reps)')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(limit)

  if (error) throw new DatabaseError('getWorkoutsByUser', error)
  return data
}

export async function createWorkout(input: Inserts<'workouts'>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('workouts')
    .insert(input)
    .select()
    .single()

  if (error) throw new DatabaseError('createWorkout', error)
  return data
}

export async function updateWorkout(id: string, userId: string, updates: Partial<Tables<'workouts'>>) {
  const supabase = createClient()
  const { error } = await supabase
    .from('workouts')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userId)  // ⚠️ siempre doble filtro

  if (error) throw new DatabaseError('updateWorkout', error)
}

export async function deleteWorkout(id: string, userId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('workouts')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) throw new DatabaseError('deleteWorkout', error)
}
```

---

## 🔒 RLS — políticas estándar

```sql
-- Activar SIEMPRE en tablas con datos de usuario
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;

-- Patrón base: usuario ve y modifica solo sus datos
CREATE POLICY "users_own_data" ON workouts
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Políticas separadas por operación (más granular)
CREATE POLICY "users_select_own" ON workouts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "users_insert_own" ON workouts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users_update_own" ON workouts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "users_delete_own" ON workouts FOR DELETE USING (auth.uid() = user_id);

-- Lectura pública
CREATE POLICY "public_read" ON posts
  FOR SELECT
  USING (published = true);

-- Admin (rol en JWT)
CREATE POLICY "admin_all" ON admin_settings
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Relación trainer-cliente
CREATE POLICY "trainer_reads_clients" ON client_data
  FOR SELECT
  USING (
    trainer_id = auth.uid()
    OR user_id = auth.uid()
  );

-- Multi-tenant / organization
CREATE POLICY "org_members_see_data" ON workspaces
  FOR SELECT
  USING (
    id IN (
      SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
  );
```

---

## 🔑 Auth — flujos completos

```typescript
// Sign in con email/password
export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)
  return data
}

// OAuth (Google, GitHub, Apple...)
export async function signInWithOAuth(provider: 'google' | 'github' | 'apple') {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      queryParams: { access_type: 'offline', prompt: 'consent' },
    },
  })
  if (error) throw new Error(error.message)
}

// Magic link (passwordless)
export async function signInWithMagicLink(email: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` },
  })
  if (error) throw new Error(error.message)
}

// Sign up
export async function signUp(email: string, password: string, metadata?: object) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
    },
  })
  if (error) throw new Error(error.message)
  return data
}

// Sign out
'use server'
export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

// Callback handler
// app/auth/callback/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const next = request.nextUrl.searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(new URL(next, request.url))
  }

  return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
}

// Reset password
export async function requestPasswordReset(email: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/update-password`,
  })
  if (error) throw new Error(error.message)
}

export async function updatePassword(newPassword: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) throw new Error(error.message)
}
```

---

## 💾 Storage

```typescript
// Upload organizado por usuario
export async function uploadAvatar(file: File, userId: string) {
  const supabase = createClient()
  const ext = file.name.split('.').pop()
  const path = `${userId}/avatar-${Date.now()}.${ext}`

  const { error } = await supabase.storage
    .from('avatars')
    .upload(path, file, { cacheControl: '3600', upsert: true })

  if (error) throw new DatabaseError('uploadAvatar', error)

  const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)
  return publicUrl
}

// URL firmada para archivos privados
export async function getPrivateFileUrl(path: string, expiresIn = 3600) {
  const supabase = createClient()
  const { data, error } = await supabase.storage
    .from('private-files')
    .createSignedUrl(path, expiresIn)
  if (error) throw new DatabaseError('getPrivateFileUrl', error)
  return data.signedUrl
}

// RLS para storage (en SQL)
// Ver: Dashboard → Storage → [bucket] → Policies
```

---

## 🔄 Realtime — suscripciones

```typescript
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/types/database'

export function useRealtimeWorkouts(userId: string, initial: Tables<'workouts'>[]) {
  const [workouts, setWorkouts] = useState(initial)

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel('workouts-changes')
      .on('postgres_changes', {
        event: '*', // INSERT | UPDATE | DELETE | *
        schema: 'public',
        table: 'workouts',
        filter: `user_id=eq.${userId}`,
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setWorkouts(prev => [payload.new as Tables<'workouts'>, ...prev])
        }
        if (payload.eventType === 'UPDATE') {
          setWorkouts(prev => prev.map(w => w.id === payload.new.id ? payload.new as Tables<'workouts'> : w))
        }
        if (payload.eventType === 'DELETE') {
          setWorkouts(prev => prev.filter(w => w.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [userId])

  return workouts
}
```

---

## ⚡ Edge Functions

```typescript
// supabase/functions/send-notification/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  // CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' } })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!  // service role para bypass RLS
    )

    const { userId, message } = await req.json()

    // lógica...

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
})

// Deploy: supabase functions deploy send-notification
// Invoke desde Next.js:
const { data, error } = await supabase.functions.invoke('send-notification', {
  body: { userId, message }
})
```

---

## 🚫 Errores comunes

- ❌ `getSession()` en servidor → usar `getUser()` (verifica JWT)
- ❌ `SERVICE_ROLE_KEY` en variables `NEXT_PUBLIC_`
- ❌ Updates/deletes sin filtrar por `user_id` (no confiar solo en RLS)
- ❌ Queries sin `.limit()` en tablas grandes
- ❌ Importar cliente browser en Server Components
- ❌ Olvidar `await` en ops async
- ❌ Tipos desincronizados → regenerar tras cada cambio de schema
- ❌ RLS no activado en tabla con datos sensibles
- ❌ `.single()` cuando puede ser null → usar `.maybeSingle()`
