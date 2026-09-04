---
name: ui-components
description: Biblioteca de componentes Tailwind tipados (Button, Input, Card, Badge, Modal, Skeleton, Toast, Avatar, Tabs, Select, Checkbox, Switch, PageHeader, EmptyState). Usar cuando haya que añadir o modificar componentes UI reutilizables.
---

# SKILL: UI Components

> Biblioteca completa de componentes Tailwind, tipados y con todos los estados.
> Diseñados con los tokens del design-system. Copiar y pegar.

---

## 🛠️ Utility — siempre presente

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
```

---

## 🔘 Button

```typescript
// components/ui/Button.tsx
import { cn } from '@/lib/utils'
import { forwardRef, type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

const variants = {
  primary:   'bg-accent text-accent-fg hover:brightness-110 shadow-sm hover:shadow-glow active:scale-[0.98]',
  secondary: 'bg-transparent border border-border text-primary hover:bg-surface-alt active:scale-[0.98]',
  ghost:     'bg-transparent text-muted hover:text-primary hover:bg-surface-alt',
  danger:    'bg-danger text-white hover:brightness-110 active:scale-[0.98]',
  link:      'bg-transparent p-0 h-auto text-accent underline-offset-4 hover:underline',
} as const

const sizes = {
  xs: 'h-7 px-3 text-fluid-xs gap-1.5',
  sm: 'h-9 px-4 text-fluid-sm gap-2',
  md: 'h-10 px-5 text-fluid-sm gap-2',
  lg: 'h-12 px-6 text-fluid-base gap-2.5',
  xl: 'h-14 px-8 text-fluid-lg gap-3',
} as const

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary', size = 'md', loading, icon, iconPosition = 'left',
  fullWidth, className, children, disabled, ...props
}, ref) => (
  <button
    ref={ref}
    disabled={disabled || loading}
    className={cn(
      'inline-flex items-center justify-center font-medium rounded-md',
      'transition-all duration-base ease-out',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
      'whitespace-nowrap select-none',
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    )}
    {...props}
  >
    {loading ? (
      <Spinner className="h-4 w-4" />
    ) : (
      <>
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </>
    )}
  </button>
))
Button.displayName = 'Button'

function Spinner({ className }: { className?: string }) {
  return (
    <svg className={cn('animate-spin', className)} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}
```

---

## 📝 Input

```typescript
// components/ui/Input.tsx
import { cn } from '@/lib/utils'
import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label, error, hint, iconLeft, iconRight, className, id, ...props
}, ref) => {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-fluid-sm font-medium text-primary">
          {label}
          {props.required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {iconLeft && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
            {iconLeft}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={cn(
            'w-full rounded-md border bg-surface text-primary placeholder:text-muted',
            'px-3 py-2.5 text-fluid-sm transition-colors duration-fast',
            'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-alt',
            error ? 'border-danger focus:ring-danger/30 focus:border-danger' : 'border-border',
            iconLeft && 'pl-10',
            iconRight && 'pr-10',
            className
          )}
          {...props}
        />
        {iconRight && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
            {iconRight}
          </span>
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="text-fluid-xs text-danger flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-fluid-xs text-muted">{hint}</p>
      )}
    </div>
  )
})
Input.displayName = 'Input'
```

---

## 🃏 Card

```typescript
// components/ui/Card.tsx
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'ghost' | 'gradient'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const variants = {
  default:  'bg-surface border border-border shadow-sm',
  bordered: 'bg-surface border-2 border-border',
  elevated: 'bg-surface shadow-lg border-0',
  ghost:    'bg-surface-alt border-0',
  gradient: 'bg-gradient-to-br from-surface to-surface-alt border border-border shadow-sm',
}

const paddings = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({ variant = 'default', hover, padding = 'md', className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-base ease-out',
        variants[variant],
        paddings[padding],
        hover && 'hover:-translate-y-1 hover:shadow-lg cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4', className)} {...props} />
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-fluid-xl font-semibold text-primary', className)} {...props} />
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-fluid-sm text-muted mt-1', className)} {...props} />
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)} {...props} />
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-6 flex items-center gap-3', className)} {...props} />
}
```

---

## 🏷️ Badge

```typescript
// components/ui/Badge.tsx
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'accent'
  size?: 'sm' | 'md'
  dot?: boolean
  className?: string
}

const variants = {
  default: 'bg-surface-alt text-primary border border-border',
  success: 'bg-success/10 text-success border border-success/20',
  warning: 'bg-warning/10 text-warning border border-warning/20',
  danger:  'bg-danger/10  text-danger  border border-danger/20',
  info:    'bg-accent/10  text-accent  border border-accent/20',
  accent:  'bg-accent/10  text-accent  border border-accent/20',
}

const dotColors = {
  default: 'bg-muted', success: 'bg-success', warning: 'bg-warning',
  danger: 'bg-danger', info: 'bg-accent', accent: 'bg-accent',
}

export function Badge({ children, variant = 'default', size = 'md', dot, className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 font-medium rounded-full',
      size === 'sm' ? 'px-2 py-0.5 text-fluid-xs' : 'px-3 py-1 text-fluid-xs',
      variants[variant],
      className
    )}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  )
}
```

---

## 🪟 Modal / Dialog

```typescript
// components/ui/Modal.tsx
'use client'
import { cn } from '@/lib/utils'
import { useEffect, useRef } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  children: React.ReactNode
  closeOnOverlay?: boolean
}

const sizes = {
  sm:   'max-w-sm',
  md:   'max-w-lg',
  lg:   'max-w-2xl',
  xl:   'max-w-4xl',
  full: 'max-w-[95vw] max-h-[95vh]',
}

export function Modal({ open, onClose, title, description, size = 'md', children, closeOnOverlay = true }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      onClick={e => closeOnOverlay && e.target === overlayRef.current && onClose()}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />
      <div className={cn(
        'relative w-full bg-surface rounded-2xl shadow-2xl animate-scale-in',
        'border border-border/50 max-h-[90vh] overflow-auto',
        sizes[size]
      )}>
        {(title || description) && (
          <div className="px-6 pt-6 pb-4 border-b border-border">
            {title && <h2 id="modal-title" className="text-fluid-lg font-semibold text-primary">{title}</h2>}
            {description && <p className="text-fluid-sm text-muted mt-1">{description}</p>}
          </div>
        )}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 p-1.5 rounded-md text-muted hover:text-primary hover:bg-surface-alt transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
```

---

## 💀 Skeleton — loading states

```typescript
// components/ui/Skeleton.tsx
import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn(
      'rounded-md bg-gradient-to-r from-surface-alt via-border to-surface-alt',
      'bg-[length:200%_100%] animate-shimmer',
      className
    )} />
  )
}

// Skeletons compuestos reutilizables
export function CardSkeleton() {
  return (
    <Card>
      <Skeleton className="h-5 w-2/3 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-4/5 mb-4" />
      <Skeleton className="h-9 w-24" />
    </Card>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  )
}

export function AvatarSkeleton({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-12 h-12' }
  return <Skeleton className={cn('rounded-full', sizes[size])} />
}
```

---

## 🎈 Toast

```typescript
// components/ui/Toast.tsx + hooks/useToast.ts
'use client'
import { cn } from '@/lib/utils'
import { create } from 'zustand' // añadir: npm i zustand

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  add: (toast: Omit<Toast, 'id'>) => void
  remove: (id: string) => void
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  add: (toast) => {
    const id = Math.random().toString(36).slice(2)
    set(state => ({ toasts: [...state.toasts, { ...toast, id }] }))
    setTimeout(() => {
      set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }))
    }, toast.duration ?? 4000)
  },
  remove: (id) => set(state => ({ toasts: state.toasts.filter(t => t.id !== id) })),
}))

const toastStyles = {
  success: 'bg-success/10 border-success/30 text-success',
  error:   'bg-danger/10 border-danger/30 text-danger',
  warning: 'bg-warning/10 border-warning/30 text-warning',
  info:    'bg-accent/10 border-accent/30 text-accent',
}

const toastIcons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' }

export function ToastContainer() {
  const { toasts, remove } = useToast()
  return (
    <div className="fixed top-4 right-4 z-[400] flex flex-col gap-2 max-w-sm">
      {toasts.map(t => (
        <div
          key={t.id}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-slide-in',
            'text-fluid-sm font-medium cursor-pointer',
            toastStyles[t.type]
          )}
          onClick={() => remove(t.id)}
        >
          <span>{toastIcons[t.type]}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  )
}

// Uso en componentes:
// const toast = useToast()
// toast.add({ message: 'Guardado', type: 'success' })
```

---

## 👤 Avatar

```typescript
// components/ui/Avatar.tsx
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = {
  xs: { box: 'w-6 h-6 text-fluid-xs', px: 24 },
  sm: { box: 'w-8 h-8 text-fluid-xs', px: 32 },
  md: { box: 'w-10 h-10 text-fluid-sm', px: 40 },
  lg: { box: 'w-12 h-12 text-fluid-base', px: 48 },
  xl: { box: 'w-16 h-16 text-fluid-lg', px: 64 },
} as const

export function Avatar({ src, alt, fallback, size = 'md', className }: AvatarProps) {
  const s = sizes[size]
  return (
    <div className={cn(
      'relative rounded-full overflow-hidden bg-accent/10 flex items-center justify-center',
      'font-semibold text-accent shrink-0',
      s.box,
      className
    )}>
      {src ? (
        <Image src={src} alt={alt ?? ''} width={s.px} height={s.px} className="w-full h-full object-cover" />
      ) : (
        <span>{fallback ?? '?'}</span>
      )}
    </div>
  )
}
```

---

## 📄 PageHeader

```typescript
// components/layouts/PageHeader.tsx
interface PageHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
  breadcrumb?: { label: string; href?: string }[]
}

export function PageHeader({ title, description, action, breadcrumb }: PageHeaderProps) {
  return (
    <div className="mb-fluid-md">
      {breadcrumb && (
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-fluid-sm text-muted mb-3">
          {breadcrumb.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-muted/50">/</span>}
              {item.href ? (
                <a href={item.href} className="hover:text-primary transition-colors">{item.label}</a>
              ) : (
                <span>{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-fluid-3xl font-display font-bold text-primary leading-tight">{title}</h1>
          {description && <p className="text-muted text-fluid-base mt-2 max-w-2xl">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  )
}
```

---

## 📭 EmptyState

```typescript
// components/ui/EmptyState.tsx
interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {icon && (
        <div className="text-5xl mb-4 text-muted opacity-60">
          {icon}
        </div>
      )}
      <h3 className="text-fluid-lg font-semibold text-primary mb-2">{title}</h3>
      {description && (
        <p className="text-muted text-fluid-sm max-w-sm mb-6 leading-relaxed">{description}</p>
      )}
      {action}
    </div>
  )
}
```

---

## ⚡ Tabs

```typescript
// components/ui/Tabs.tsx
'use client'
import { cn } from '@/lib/utils'
import { createContext, useContext, useState } from 'react'

const TabsContext = createContext<{ value: string; setValue: (v: string) => void } | null>(null)

export function Tabs({ defaultValue, children, className }: { defaultValue: string; children: React.ReactNode; className?: string }) {
  const [value, setValue] = useState(defaultValue)
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div role="tablist" className={cn('inline-flex items-center gap-1 p-1 rounded-lg bg-surface-alt', className)}>
      {children}
    </div>
  )
}

export function TabsTrigger({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = useContext(TabsContext)!
  const isActive = ctx.value === value
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => ctx.setValue(value)}
      className={cn(
        'px-4 py-2 text-fluid-sm font-medium rounded-md transition-all duration-fast',
        isActive ? 'bg-surface text-primary shadow-sm' : 'text-muted hover:text-primary',
        className
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = useContext(TabsContext)!
  if (ctx.value !== value) return null
  return <div role="tabpanel" className={cn('mt-4 animate-fade-in', className)}>{children}</div>
}

// Uso:
// <Tabs defaultValue="overview">
//   <TabsList>
//     <TabsTrigger value="overview">Overview</TabsTrigger>
//     <TabsTrigger value="settings">Settings</TabsTrigger>
//   </TabsList>
//   <TabsContent value="overview">...</TabsContent>
//   <TabsContent value="settings">...</TabsContent>
// </Tabs>
```

---

## 📋 Select

```typescript
// components/ui/Select.tsx
'use client'
import { cn } from '@/lib/utils'
import { forwardRef, type SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label, error, hint, options, placeholder, className, id, ...props
}, ref) => {
  const selectId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={selectId} className="text-fluid-sm font-medium text-primary">{label}</label>}
      <select
        ref={ref}
        id={selectId}
        className={cn(
          'w-full rounded-md border bg-surface text-primary',
          'px-3 py-2.5 text-fluid-sm transition-colors duration-fast',
          'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error ? 'border-danger' : 'border-border',
          className
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
      {error && <p className="text-fluid-xs text-danger">⚠ {error}</p>}
      {hint && !error && <p className="text-fluid-xs text-muted">{hint}</p>}
    </div>
  )
})
Select.displayName = 'Select'
```

---

## ✅ Checkbox / Switch

```typescript
// components/ui/Checkbox.tsx
import { cn } from '@/lib/utils'
import { forwardRef, type InputHTMLAttributes } from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, className, ...props }, ref) => (
  <label className="flex items-center gap-2 cursor-pointer select-none">
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        'w-4 h-4 rounded border border-border text-accent',
        'focus:ring-2 focus:ring-accent/30 focus:ring-offset-2',
        'cursor-pointer',
        className
      )}
      {...props}
    />
    {label && <span className="text-fluid-sm text-primary">{label}</span>}
  </label>
))
Checkbox.displayName = 'Checkbox'

// Switch con estilo iOS
export const Switch = forwardRef<HTMLInputElement, CheckboxProps>(({ label, className, ...props }, ref) => (
  <label className="flex items-center gap-3 cursor-pointer select-none">
    <span className="relative inline-block">
      <input ref={ref} type="checkbox" className="sr-only peer" {...props} />
      <span className={cn(
        'block w-10 h-6 rounded-full bg-border',
        'peer-checked:bg-accent transition-colors duration-base',
        className
      )} />
      <span className={cn(
        'absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow',
        'transition-transform duration-base ease-spring',
        'peer-checked:translate-x-4'
      )} />
    </span>
    {label && <span className="text-fluid-sm text-primary">{label}</span>}
  </label>
))
Switch.displayName = 'Switch'
```

---

## 📏 Divider / Separator

```typescript
export function Divider({ orientation = 'horizontal', className, label }: {
  orientation?: 'horizontal' | 'vertical'
  className?: string
  label?: string
}) {
  if (label) {
    return (
      <div className={cn('flex items-center gap-4', className)}>
        <div className="flex-1 h-px bg-border" />
        <span className="text-fluid-xs text-muted uppercase tracking-wider">{label}</span>
        <div className="flex-1 h-px bg-border" />
      </div>
    )
  }
  return (
    <div className={cn(
      'bg-border',
      orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
      className
    )} />
  )
}
```

---

## 🎯 Checklist final antes de añadir un componente

- [ ] Tipado completo (props interface)
- [ ] `forwardRef` si el componente acepta ref
- [ ] Variantes con objeto de mapping (no cadenas ternarias)
- [ ] Accesibilidad: aria-*, focus visible, semántica correcta
- [ ] Usa tokens del design-system (no valores hardcoded)
- [ ] Loading state si corresponde
- [ ] Disabled state visible y funcional
- [ ] `displayName` para debugging
