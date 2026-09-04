---
name: landing-pages
description: Secciones de landing (Nav sticky, Hero, SocialProof, Features, Steps, Testimonials, Pricing, FAQ, FinalCTA, Footer) y fórmulas de copywriting. Usar cuando haya que diseñar una landing, página de venta o sección marketing.
---

# SKILL: Landing Pages

> Secciones tipadas, listas para componer cualquier landing.
> Todas usan componentes de `ui-components` y tokens de `design-system`.

---

## 🏗️ Estructura base — orden que convierte

```
1. Nav           → logo + enlaces + CTA
2. Hero          → headline + subhead + CTA + visual
3. Social Proof  → logos / stats (credibilidad inmediata)
4. Problema      → agitar el dolor
5. Solución      → features → beneficios
6. Cómo funciona → proceso en 3 pasos
7. Testimonials  → prueba social real
8. Pricing       → claro, sin trampa
9. FAQ           → eliminar objeciones
10. CTA Final    → repetir oferta
11. Footer       → legal + links
```

**Mínimo viable:** Hero + Solución + CTA Final.

---

## 🔝 Nav — sticky con glassmorphism

```typescript
// components/marketing/Nav.tsx
'use client'
import { useEffect, useState } from 'react'

export function Nav({ logo, links, cta }: {
  logo: React.ReactNode
  links: { label: string; href: string }[]
  cta?: { label: string; href: string }
}) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-[200]">
      <div className={cn(
        'transition-all duration-base',
        scrolled ? 'bg-surface/80 backdrop-blur-xl border-b border-border/50' : 'bg-transparent'
      )} />
      <nav className="relative max-w-7xl mx-auto px-fluid-sm h-16 flex items-center justify-between">
        <div className="font-display font-bold text-fluid-xl">{logo}</div>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-fluid-sm text-muted hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        {cta && <Button size="sm" className="hidden md:flex">{cta.label}</Button>}
      </nav>
    </header>
  )
}
```

---

## 🎯 Hero — variantes

### A) Centrado con gradiente radial animado

```typescript
export function HeroCentered({ badge, headline, subheadline, ctaPrimary, ctaSecondary, stats }: {
  badge?: string
  headline: string
  subheadline: string
  ctaPrimary: string
  ctaSecondary?: string
  stats?: { value: string; label: string }[]
}) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Fondo oscuro con radial gradient */}
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgb(var(--color-accent) / 0.35), transparent)' }} />
      {/* Grid decorativo */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)'
        }} />

      <div className="relative text-center max-w-4xl mx-auto px-fluid-sm py-fluid-lg space-y-8">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/80 text-fluid-sm animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {badge}
          </div>
        )}
        <h1 className="text-fluid-7xl font-display font-bold text-white leading-[1.02] animate-fade-up">
          {headline}
        </h1>
        <p className="text-fluid-xl text-white/60 max-w-2xl mx-auto leading-relaxed animate-fade-up [animation-delay:100ms]">
          {subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:200ms]">
          <Button size="lg">{ctaPrimary}</Button>
          {ctaSecondary && <Button variant="secondary" size="lg" className="border-white/20 text-white hover:bg-white/5">{ctaSecondary}</Button>}
        </div>
        {stats && (
          <div className="flex flex-wrap justify-center gap-fluid-md pt-8 border-t border-white/10 animate-fade-up [animation-delay:300ms]">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-fluid-3xl font-display font-bold text-white">{s.value}</div>
                <div className="text-fluid-sm text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
```

### B) Split — texto a la izquierda, visual a la derecha

```typescript
export function HeroSplit({ badge, headline, subheadline, ctaPrimary, ctaSecondary, socialProof, visual }: HeroSplitProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-surface-alt" />
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-fluid-sm py-fluid-lg grid lg:grid-cols-2 gap-fluid-md items-center">
        <div className="space-y-8 animate-fade-up">
          {badge && <Badge variant="accent">{badge}</Badge>}
          <h1 className="text-fluid-6xl font-display font-bold text-primary leading-[1.05]">
            {headline}
          </h1>
          <p className="text-fluid-lg text-muted leading-relaxed max-w-lg">
            {subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">{ctaPrimary}</Button>
            {ctaSecondary && <Button variant="ghost" size="lg">{ctaSecondary} →</Button>}
          </div>
          {socialProof && <p className="text-fluid-sm text-muted">{socialProof}</p>}
        </div>
        {visual && <div className="animate-fade-up [animation-delay:150ms]">{visual}</div>}
      </div>
    </section>
  )
}
```

### C) Minimalist editorial — centrado con mucho aire

```typescript
export function HeroEditorial({ eyebrow, headline, subheadline, cta }: HeroEditorialProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-surface pt-16">
      <div className="max-w-4xl mx-auto px-fluid-sm text-center space-y-fluid-sm">
        {eyebrow && <p className="text-fluid-xs uppercase tracking-[0.25em] text-muted">{eyebrow}</p>}
        <h1 className="text-fluid-7xl font-display font-bold text-primary leading-[1.02] tracking-tight">
          {headline}
        </h1>
        <p className="text-fluid-lg text-muted max-w-2xl mx-auto leading-relaxed">{subheadline}</p>
        <div className="pt-4">
          <Button size="lg" icon={<span>→</span>} iconPosition="right">{cta}</Button>
        </div>
      </div>
    </section>
  )
}
```

---

## 🏢 Social Proof

```typescript
// Logos animados con hover
import Image from 'next/image'

export function LogoBar({ title = 'Usado por equipos de', logos }: {
  title?: string
  logos: { name: string; src: string; width: number; height: number }[]
}) {
  return (
    <section className="py-14 border-y border-border">
      <div className="max-w-6xl mx-auto px-fluid-sm">
        <p className="text-center text-fluid-xs text-muted uppercase tracking-[0.2em] mb-10">{title}</p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {logos.map(l => (
            <Image
              key={l.name}
              src={l.src}
              alt={l.name}
              width={l.width}
              height={l.height}
              className="h-7 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-slow"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Stats destacados
export function StatsBar({ stats }: { stats: { value: string; label: string; description?: string }[] }) {
  return (
    <section className="py-fluid-md bg-surface-alt">
      <div className="max-w-7xl mx-auto px-fluid-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-fluid-sm">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-fluid-5xl font-display font-bold text-primary">{s.value}</div>
              <div className="text-fluid-sm text-muted mt-2">{s.label}</div>
              {s.description && <div className="text-fluid-xs text-muted/60 mt-1">{s.description}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## ⭐ Features — 3 layouts

```typescript
interface Feature {
  icon: React.ReactNode | string
  benefit: string      // título = beneficio al usuario (no feature)
  description: string
  tag?: string
}

// Regla: "Ves tu evolución en tiempo real" > "Dashboard analítico"

export function Features({ eyebrow, title, subtitle, features, layout = 'grid' }: {
  eyebrow?: string
  title: string
  subtitle?: string
  features: Feature[]
  layout?: 'grid' | 'list' | 'bento'
}) {
  return (
    <section className="py-fluid-xl bg-surface">
      <div className="max-w-7xl mx-auto px-fluid-sm">
        <div className="text-center max-w-2xl mx-auto mb-fluid-md space-y-4">
          {eyebrow && <p className="text-fluid-xs text-accent font-semibold uppercase tracking-[0.2em]">{eyebrow}</p>}
          <h2 className="text-fluid-4xl font-display font-bold text-primary">{title}</h2>
          {subtitle && <p className="text-fluid-lg text-muted">{subtitle}</p>}
        </div>

        {layout === 'bento' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <Card
                key={i}
                hover
                padding="lg"
                className={cn('group', i === 0 && 'md:col-span-2', i === 3 && 'md:col-span-2')}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-base">{f.icon}</div>
                <h3 className="text-fluid-lg font-semibold text-primary mb-2">{f.benefit}</h3>
                <p className="text-muted text-fluid-sm leading-relaxed">{f.description}</p>
                {f.tag && <Badge variant="accent" className="mt-4">{f.tag}</Badge>}
              </Card>
            ))}
          </div>
        )}

        {layout === 'grid' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Card key={i} hover padding="lg" className="group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-base">{f.icon}</div>
                <h3 className="text-fluid-lg font-semibold text-primary mb-2">{f.benefit}</h3>
                <p className="text-muted text-fluid-sm leading-relaxed">{f.description}</p>
              </Card>
            ))}
          </div>
        )}

        {layout === 'list' && (
          <div className="max-w-3xl mx-auto divide-y divide-border">
            {features.map((f, i) => (
              <div key={i} className="flex gap-6 py-6">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-2xl">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-fluid-lg font-semibold text-primary mb-1">{f.benefit}</h3>
                  <p className="text-muted text-fluid-sm leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
```

---

## 🛤️ Steps — proceso

```typescript
export function Steps({ eyebrow, title, steps }: {
  eyebrow?: string
  title: string
  steps: { num: string; title: string; desc: string; icon?: React.ReactNode }[]
}) {
  return (
    <section className="py-fluid-xl bg-surface-alt">
      <div className="max-w-5xl mx-auto px-fluid-sm">
        {eyebrow && <p className="text-center text-fluid-xs text-accent font-semibold uppercase tracking-[0.2em] mb-4">{eyebrow}</p>}
        <h2 className="text-fluid-4xl font-display font-bold text-center text-primary mb-fluid-md">{title}</h2>
        <div className="relative">
          <div className="absolute left-[2.25rem] top-10 bottom-10 w-px bg-gradient-to-b from-accent via-border to-transparent hidden md:block" />
          <div className="space-y-fluid-sm">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-6 md:gap-8 items-start group animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="shrink-0 w-[4.5rem] h-[4.5rem] rounded-xl bg-accent text-accent-fg flex items-center justify-center font-display font-bold text-fluid-xl relative z-10 shadow-glow group-hover:scale-105 transition-transform duration-base">
                  {s.icon ?? s.num}
                </div>
                <div className="pt-4">
                  <h3 className="text-fluid-xl font-semibold text-primary mb-2">{s.title}</h3>
                  <p className="text-muted leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## 💬 Testimonials — masonry

```typescript
export function Testimonials({ title, testimonials }: {
  title?: string
  testimonials: { quote: string; author: string; role: string; avatar?: string; rating?: number; company?: string }[]
}) {
  return (
    <section className="py-fluid-xl bg-surface">
      <div className="max-w-7xl mx-auto px-fluid-sm">
        {title && <h2 className="text-fluid-4xl font-display font-bold text-center text-primary mb-fluid-md">{title}</h2>}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <Card key={i} variant="bordered" className="break-inside-avoid">
              {t.rating && (
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className={j < t.rating! ? 'text-yellow-400' : 'text-border'}>★</span>
                  ))}
                </div>
              )}
              <p className="text-primary leading-relaxed mb-6 text-fluid-base">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <Avatar src={t.avatar} fallback={t.author[0]} size="sm" />
                <div>
                  <p className="font-semibold text-fluid-sm text-primary">{t.author}</p>
                  <p className="text-fluid-xs text-muted">{t.role}{t.company && ` · ${t.company}`}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## 💰 Pricing

```typescript
export function Pricing({ eyebrow, title, subtitle, plans }: {
  eyebrow?: string
  title: string
  subtitle?: string
  plans: {
    name: string; price: string; period?: string; description?: string
    features: string[]; cta: string; featured?: boolean; badge?: string
  }[]
}) {
  return (
    <section className="py-fluid-xl bg-surface-alt">
      <div className="max-w-5xl mx-auto px-fluid-sm">
        <div className="text-center mb-fluid-md space-y-4">
          {eyebrow && <p className="text-fluid-xs text-accent font-semibold uppercase tracking-[0.2em]">{eyebrow}</p>}
          <h2 className="text-fluid-4xl font-display font-bold text-primary">{title}</h2>
          {subtitle && <p className="text-fluid-lg text-muted">{subtitle}</p>}
        </div>
        <div className={cn('grid gap-6 items-center', plans.length === 2 && 'md:grid-cols-2', plans.length >= 3 && 'md:grid-cols-3')}>
          {plans.map((p, i) => (
            <div key={i} className={cn(
              'relative rounded-2xl p-8 border transition-all duration-base',
              p.featured
                ? 'bg-primary text-primary-fg border-primary shadow-xl scale-105'
                : 'bg-surface border-border shadow-sm hover:shadow-md'
            )}>
              {p.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-fg text-fluid-xs font-semibold px-4 py-1 rounded-full">
                  {p.badge}
                </span>
              )}
              <h3 className="text-fluid-xl font-bold mb-1">{p.name}</h3>
              {p.description && <p className={cn('text-fluid-sm mb-6', p.featured ? 'opacity-60' : 'text-muted')}>{p.description}</p>}
              <div className="flex items-end gap-1 my-6">
                <span className="text-fluid-5xl font-display font-bold">{p.price}</span>
                {p.period && <span className={cn('text-fluid-sm mb-2', p.featured ? 'opacity-50' : 'text-muted')}>/{p.period}</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f, j) => (
                  <li key={j} className={cn('flex items-start gap-3 text-fluid-sm', p.featured ? 'opacity-80' : 'text-muted')}>
                    <span className="text-accent mt-0.5 shrink-0">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Button variant={p.featured ? 'secondary' : 'primary'} fullWidth>{p.cta}</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## ❓ FAQ — accordion

```typescript
'use client'
export function FAQ({ title, items }: { title: string; items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-fluid-xl">
      <div className="max-w-2xl mx-auto px-fluid-sm">
        <h2 className="text-fluid-4xl font-display font-bold text-center text-primary mb-fluid-sm">{title}</h2>
        <div className="divide-y divide-border">
          {items.map((item, i) => (
            <div key={i}>
              <button
                className="w-full flex justify-between items-center py-5 text-left gap-4 hover:text-accent transition-colors duration-fast"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className={cn('font-medium text-fluid-base', open === i ? 'text-accent' : 'text-primary')}>
                  {item.q}
                </span>
                <span className={cn('shrink-0 text-muted transition-transform duration-base', open === i && 'rotate-45')}>+</span>
              </button>
              {open === i && <div className="pb-5 text-muted text-fluid-sm leading-relaxed animate-fade-down">{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## 🎯 Final CTA

```typescript
export function FinalCTA({ headline, subheadline, ctaPrimary, ctaSecondary, disclaimer, variant = 'dark' }: {
  headline: string; subheadline?: string; ctaPrimary: string; ctaSecondary?: string; disclaimer?: string
  variant?: 'dark' | 'accent' | 'gradient'
}) {
  const backgrounds = {
    dark: 'bg-primary text-primary-fg',
    accent: 'bg-accent text-accent-fg',
    gradient: 'bg-gradient-to-br from-primary via-primary to-accent/80 text-primary-fg',
  }
  return (
    <section className={cn('py-fluid-xl text-center relative overflow-hidden', backgrounds[variant])}>
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      <div className="relative max-w-3xl mx-auto px-fluid-sm space-y-8">
        <h2 className="text-fluid-5xl font-display font-bold leading-tight">{headline}</h2>
        {subheadline && <p className="opacity-70 text-fluid-lg">{subheadline}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="xl" className="bg-white text-primary hover:bg-white/90">{ctaPrimary}</Button>
          {ctaSecondary && <Button variant="ghost" size="xl" className="text-current border-current/20">{ctaSecondary}</Button>}
        </div>
        {disclaimer && <p className="opacity-40 text-fluid-xs">{disclaimer}</p>}
      </div>
    </section>
  )
}
```

---

## 📝 Footer completo

```typescript
export function Footer({ brand, columns, bottom }: {
  brand: { name: string; description: string; social?: { icon: React.ReactNode; href: string }[] }
  columns: { title: string; links: { label: string; href: string }[] }[]
  bottom?: { copyright: string; links: { label: string; href: string }[] }
}) {
  return (
    <footer className="py-fluid-md border-t border-border bg-surface-alt">
      <div className="max-w-7xl mx-auto px-fluid-sm">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-fluid-sm">
          <div className="col-span-2 space-y-4">
            <h3 className="font-display font-bold text-fluid-xl">{brand.name}</h3>
            <p className="text-muted text-fluid-sm max-w-xs">{brand.description}</p>
            {brand.social && (
              <div className="flex gap-3">
                {brand.social.map((s, i) => (
                  <a key={i} href={s.href} className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors">
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
          {columns.map((col, i) => (
            <div key={i}>
              <h4 className="font-semibold text-fluid-sm text-primary mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l, j) => (
                  <li key={j}>
                    <a href={l.href} className="text-fluid-sm text-muted hover:text-primary transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {bottom && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
            <p className="text-fluid-xs text-muted">{bottom.copyright}</p>
            <div className="flex gap-6">
              {bottom.links.map((l, i) => (
                <a key={i} href={l.href} className="text-fluid-xs text-muted hover:text-primary transition-colors">{l.label}</a>
              ))}
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}
```

---

## ✍️ Copywriting — fórmulas universales

| Elemento | Fórmula | Ejemplo |
|---|---|---|
| Headline | Beneficio + resultado/plazo | "Lanza tu SaaS en 7 días" |
| Subheadline | Quién + qué + cómo | "Para developers que quieren clientes sin perder semanas en setup" |
| Eyebrow | Categoría o promesa corta | "Para equipos remotos" |
| CTA primario | Verbo + beneficio | "Empezar gratis" / "Ver demo" |
| CTA secundario | Acción menos comprometida | "Ver cómo funciona" |
| Social proof | Números concretos | "2.400 webs publicadas" > "muchas empresas" |
| FAQ | Objeciones reales | Precio, tiempo, soporte, garantía |

---

## 🎯 CTA por tipo de proyecto

| Tipo | Primario | Secundario |
|---|---|---|
| SaaS | "Empezar gratis" | "Ver demo" |
| Servicio/consultoría | "Agendar llamada" | "Ver casos" |
| E-commerce | "Comprar ahora" | "Ver detalles" |
| Curso/infoproducto | "Acceder ahora" | "Ver programa" |
| Portfolio | "Ver proyectos" | "Contactar" |
| App móvil | "Descargar gratis" | "Ver capturas" |
| Evento | "Reservar plaza" | "Ver agenda" |
| Newsletter | "Suscribirse" | "Leer último número" |
