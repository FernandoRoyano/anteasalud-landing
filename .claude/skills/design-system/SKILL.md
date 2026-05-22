---
name: design-system
description: Tokens CSS (colores, tipografía fluida con clamp, espaciado, sombras, radios), tailwind.config, CSS moderno 2025 (container queries, subgrid, scroll-driven, @property, :has), tipografía y layouts. Cargar cuando haya que tocar tokens, globals.css o diseño visual.
---

# SKILL: Design System

> Diseño moderno con CSS nativo potente + Tailwind para utilidades.
> Sistema de tokens, tipografía fluida, animaciones con propósito, CSS moderno 2025.

---

## 🎨 Principios

1. **Intencionalidad** — cada decisión visual tiene motivo
2. **Jerarquía fuerte** — el ojo sabe dónde mirar primero
3. **Motion con propósito** — las animaciones guían, no decoran
4. **CSS moderno** — container queries, `clamp()`, subgrid, nesting
5. **Sistema sobre excepciones** — tokens antes que valores arbitrarios

**Prohibido:** gradientes morados genéricos, Inter en todo, `mt-[13px]`, layouts planos simétricos.

---

## 🎨 Sistema de tokens — globals.css

```css
/* app/globals.css */
@layer base {
  :root {
    /* ═══ COLORES ═══ */
    /* Override por proyecto — estos son defaults */
    --color-primary: 15 23 42;       /* formato RGB sin "rgb()" para opacity */
    --color-primary-fg: 248 250 252;
    --color-accent: 99 102 241;
    --color-accent-fg: 255 255 255;
    --color-surface: 255 255 255;
    --color-surface-alt: 248 250 252;
    --color-border: 226 232 240;
    --color-text: 15 23 42;
    --color-text-muted: 100 116 139;
    --color-success: 34 197 94;
    --color-warning: 234 179 8;
    --color-danger: 239 68 68;

    /* ═══ TIPOGRAFÍA FLUIDA — clamp() ═══ */
    /* Escala modular 1.25 (major third) — responsive automático */
    --text-xs:   clamp(0.70rem, 0.68rem + 0.10vw, 0.75rem);
    --text-sm:   clamp(0.80rem, 0.77rem + 0.15vw, 0.875rem);
    --text-base: clamp(0.90rem, 0.87rem + 0.20vw, 1.00rem);
    --text-lg:   clamp(1.00rem, 0.95rem + 0.30vw, 1.125rem);
    --text-xl:   clamp(1.10rem, 1.00rem + 0.50vw, 1.25rem);
    --text-2xl:  clamp(1.25rem, 1.10rem + 0.75vw, 1.50rem);
    --text-3xl:  clamp(1.50rem, 1.20rem + 1.20vw, 2.00rem);
    --text-4xl:  clamp(1.875rem, 1.40rem + 2.00vw, 2.50rem);
    --text-5xl:  clamp(2.25rem, 1.60rem + 3.00vw, 3.50rem);
    --text-6xl:  clamp(2.75rem, 1.80rem + 4.00vw, 4.50rem);
    --text-7xl:  clamp(3.50rem, 2.00rem + 5.00vw, 6.00rem);

    /* ═══ ESPACIADO FLUIDO ═══ */
    --space-3xs: clamp(0.25rem, 0.20rem + 0.15vw, 0.375rem);
    --space-2xs: clamp(0.50rem, 0.40rem + 0.30vw, 0.75rem);
    --space-xs:  clamp(0.75rem, 0.60rem + 0.50vw, 1.00rem);
    --space-sm:  clamp(1.00rem, 0.80rem + 0.80vw, 1.50rem);
    --space-md:  clamp(1.50rem, 1.00rem + 2.00vw, 3.00rem);
    --space-lg:  clamp(2.00rem, 1.20rem + 3.00vw, 5.00rem);
    --space-xl:  clamp(3.00rem, 1.50rem + 5.00vw, 8.00rem);
    --space-2xl: clamp(4.00rem, 2.00rem + 7.00vw, 12.0rem);

    /* ═══ TRANSICIONES ═══ */
    --ease-out:        cubic-bezier(0.16, 1, 0.3, 1);
    --ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);
    --ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-bounce:     cubic-bezier(0.68, -0.55, 0.265, 1.55);
    --duration-fast:   150ms;
    --duration-base:   250ms;
    --duration-slow:   400ms;
    --duration-slower: 700ms;

    /* ═══ SOMBRAS ═══ */
    --shadow-xs:   0 1px 2px 0 rgb(var(--color-primary) / 0.04);
    --shadow-sm:   0 2px 8px -1px rgb(var(--color-primary) / 0.06);
    --shadow-md:   0 4px 20px -2px rgb(var(--color-primary) / 0.08);
    --shadow-lg:   0 10px 40px -4px rgb(var(--color-primary) / 0.12);
    --shadow-xl:   0 20px 60px -10px rgb(var(--color-primary) / 0.18);
    --shadow-2xl:  0 30px 80px -15px rgb(var(--color-primary) / 0.25);
    --shadow-glow: 0 0 40px -5px rgb(var(--color-accent) / 0.35);
    --shadow-inner: inset 0 2px 4px 0 rgb(var(--color-primary) / 0.05);

    /* ═══ RADIOS ═══ */
    --radius-xs: 0.25rem;
    --radius-sm: 0.375rem;
    --radius-md: 0.75rem;
    --radius-lg: 1rem;
    --radius-xl: 1.5rem;
    --radius-2xl: 2rem;

    /* ═══ Z-INDEX ═══ */
    --z-base: 0;
    --z-raised: 10;
    --z-dropdown: 100;
    --z-sticky: 200;
    --z-overlay: 250;
    --z-modal: 300;
    --z-toast: 400;
    --z-tooltip: 500;

    /* ═══ LAYOUT ═══ */
    --container-sm: 640px;
    --container-md: 768px;
    --container-lg: 1024px;
    --container-xl: 1280px;
    --container-2xl: 1536px;
  }

  /* Dark mode automático */
  @media (prefers-color-scheme: dark) {
    :root {
      --color-primary: 248 250 252;
      --color-primary-fg: 15 23 42;
      --color-accent: 129 140 248;
      --color-accent-fg: 15 23 42;
      --color-surface: 15 23 42;
      --color-surface-alt: 30 41 59;
      --color-border: 51 65 85;
      --color-text: 241 245 249;
      --color-text-muted: 148 163 184;
    }
  }

  /* Motion reducido */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  html {
    scroll-behavior: smooth;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background: rgb(var(--color-surface));
    color: rgb(var(--color-text));
  }

  ::selection {
    background: rgb(var(--color-accent) / 0.25);
    color: rgb(var(--color-text));
  }

  :focus-visible {
    outline: 2px solid rgb(var(--color-accent));
    outline-offset: 3px;
    border-radius: var(--radius-sm);
  }
}
```

---

## ⚙️ tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Formato rgb(var) permite opacity con /
        primary:       'rgb(var(--color-primary) / <alpha-value>)',
        'primary-fg':  'rgb(var(--color-primary-fg) / <alpha-value>)',
        accent:        'rgb(var(--color-accent) / <alpha-value>)',
        'accent-fg':   'rgb(var(--color-accent-fg) / <alpha-value>)',
        surface:       'rgb(var(--color-surface) / <alpha-value>)',
        'surface-alt': 'rgb(var(--color-surface-alt) / <alpha-value>)',
        border:        'rgb(var(--color-border) / <alpha-value>)',
        muted:         'rgb(var(--color-text-muted) / <alpha-value>)',
        success:       'rgb(var(--color-success) / <alpha-value>)',
        warning:       'rgb(var(--color-warning) / <alpha-value>)',
        danger:        'rgb(var(--color-danger) / <alpha-value>)',
      },
      fontSize: {
        'fluid-xs':   'var(--text-xs)',
        'fluid-sm':   'var(--text-sm)',
        'fluid-base': 'var(--text-base)',
        'fluid-lg':   'var(--text-lg)',
        'fluid-xl':   'var(--text-xl)',
        'fluid-2xl':  'var(--text-2xl)',
        'fluid-3xl':  'var(--text-3xl)',
        'fluid-4xl':  'var(--text-4xl)',
        'fluid-5xl':  'var(--text-5xl)',
        'fluid-6xl':  'var(--text-6xl)',
        'fluid-7xl':  'var(--text-7xl)',
      },
      spacing: {
        'fluid-3xs': 'var(--space-3xs)',
        'fluid-2xs': 'var(--space-2xs)',
        'fluid-xs':  'var(--space-xs)',
        'fluid-sm':  'var(--space-sm)',
        'fluid-md':  'var(--space-md)',
        'fluid-lg':  'var(--space-lg)',
        'fluid-xl':  'var(--space-xl)',
        'fluid-2xl': 'var(--space-2xl)',
      },
      boxShadow: {
        xs:   'var(--shadow-xs)',
        sm:   'var(--shadow-sm)',
        md:   'var(--shadow-md)',
        lg:   'var(--shadow-lg)',
        xl:   'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        glow: 'var(--shadow-glow)',
      },
      borderRadius: {
        xs:  'var(--radius-xs)',
        sm:  'var(--radius-sm)',
        md:  'var(--radius-md)',
        lg:  'var(--radius-lg)',
        xl:  'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      transitionTimingFunction: {
        out:    'var(--ease-out)',
        spring: 'var(--ease-spring)',
        bounce: 'var(--ease-bounce)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
      },
      animation: {
        'fade-in':    'fadeIn 250ms var(--ease-out) both',
        'fade-up':    'fadeUp 400ms var(--ease-out) both',
        'fade-down':  'fadeDown 250ms var(--ease-out) both',
        'scale-in':   'scaleIn 200ms var(--ease-spring) both',
        'slide-in':   'slideIn 300ms var(--ease-out) both',
        shimmer:      'shimmer 2s linear infinite',
        float:        'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeUp:    { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeDown:  { from: { opacity: '0', transform: 'translateY(-12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn:   { from: { opacity: '0', transform: 'scale(0.92)' }, to: { opacity: '1', transform: 'scale(1)' } },
        slideIn:   { from: { opacity: '0', transform: 'translateX(-20px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        shimmer:   { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseGlow: { '0%,100%': { boxShadow: '0 0 20px rgb(var(--color-accent) / 0.3)' }, '50%': { boxShadow: '0 0 50px rgb(var(--color-accent) / 0.6)' } },
      },
    },
  },
} satisfies Config
```

---

## ✨ CSS moderno 2025 — usar cuando aplique

### Container Queries — responsive basado en el contenedor
```css
.card-grid {
  container-type: inline-size;
  container-name: cards;
}

@container cards (min-width: 480px) {
  .card { display: grid; grid-template-columns: 120px 1fr; }
}
```

### CSS Grid subgrid — alineación perfecta entre filas
```css
.parent {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
.child {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}
```

### Scroll-driven animations — sin JavaScript
```css
@keyframes reveal {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
.reveal-on-scroll {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}
```

### View Transitions — entre rutas Next.js
```typescript
// app/layout.tsx
import { unstable_ViewTransition as ViewTransition } from 'react'
<ViewTransition>{children}</ViewTransition>
```

### CSS Nesting nativo
```css
.button {
  padding: 0.75rem 1.5rem;

  &:hover {
    transform: translateY(-2px);
  }

  &.is-loading {
    opacity: 0.7;
    pointer-events: none;
  }
}
```

### `@property` — animar custom properties
```css
@property --gradient-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.animated-border {
  background: conic-gradient(from var(--gradient-angle), #6366f1, #ec4899, #6366f1);
  animation: rotate 4s linear infinite;
}
@keyframes rotate { to { --gradient-angle: 360deg; } }
```

### `color-mix()` — mezclar colores dinámicamente
```css
.button-hover {
  background: color-mix(in oklch, rgb(var(--color-accent)) 85%, black);
}
```

### `:has()` — selector padre
```css
/* Card con botón primario dentro → fondo acentuado */
.card:has(button.primary) {
  background: rgb(var(--color-accent) / 0.05);
  border-color: rgb(var(--color-accent) / 0.2);
}
```

---

## 📝 Tipografía — jerarquía oficial

```typescript
// Usar SIEMPRE estas clases, nunca inventar tamaños
export const typography = {
  // Display — hero, landing
  display2xl: 'text-fluid-7xl font-display font-bold tracking-tight leading-[1.02]',
  displayXl:  'text-fluid-6xl font-display font-bold tracking-tight leading-[1.05]',
  displayLg:  'text-fluid-5xl font-display font-bold tracking-tight leading-[1.08]',

  // Headings
  h1: 'text-fluid-4xl font-display font-bold tracking-tight leading-[1.15]',
  h2: 'text-fluid-3xl font-display font-semibold tracking-tight leading-[1.2]',
  h3: 'text-fluid-2xl font-body font-semibold leading-[1.3]',
  h4: 'text-fluid-xl font-body font-semibold leading-[1.4]',

  // Body
  bodyLg: 'text-fluid-lg font-body leading-[1.6]',
  body:   'text-fluid-base font-body leading-[1.6]',
  bodySm: 'text-fluid-sm font-body leading-[1.5]',

  // UI
  label:   'text-fluid-sm font-body font-medium',
  caption: 'text-fluid-xs font-body text-muted',
  mono:    'text-fluid-sm font-mono',

  // Special
  eyebrow:    'text-fluid-xs font-semibold uppercase tracking-[0.2em] text-accent',
  kicker:     'text-fluid-xs font-medium text-muted uppercase tracking-wider',
} as const
```

---

## 🏗️ Layouts — patrones que siempre funcionan

```typescript
// Container responsive
<div className="max-w-7xl mx-auto px-fluid-sm">

// Split 50/50 con stack en móvil
<div className="grid grid-cols-1 lg:grid-cols-2 gap-fluid-md items-center">

// Grid auto-fit de cards
<div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-fluid-xs">

// Sidebar + main sin overflow
<div className="flex gap-fluid-sm">
  <aside className="w-64 shrink-0">...</aside>
  <main className="flex-1 min-w-0">...</main>
</div>

// Bento grid — features landing
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="md:col-span-2 md:row-span-2">...</div>
  <div>...</div>
  <div>...</div>
  <div className="md:col-span-2">...</div>
</div>
```

---

## 🎬 Reglas inamovibles

1. **Una acción primaria por pantalla** — un solo botón `primary`
2. **Contraste WCAG AA** — 4.5:1 texto normal, 3:1 texto grande
3. **Máximo 2 familias tipográficas** — display + body
4. **Máximo 3 pesos** — regular (400), semibold (600), bold (700)
5. **Sistema de espaciado** — solo escala oficial, nunca `mt-[13px]`
6. **5 estados siempre** — idle, loading, success, error, empty
7. **Empty states diseñados** — icono + texto + CTA
8. **Motion con propósito** — entrada de página: fade-up; modal: scale-in; toast: slide-in

---

## 🎨 Paletas por proyecto — referencia

```css
/* WellnessReal — deep purple + yellow */
--color-primary: 22 18 43;
--color-accent: 252 238 33;

/* Antea Salud — verde bienestar */
--color-primary: 45 106 79;
--color-accent: 116 198 157;

/* Tarfayah Luxury — gold on dark */
--color-primary: 28 28 28;
--color-accent: 201 168 76;

/* SaaS dark premium */
--color-primary: 9 9 11;
--color-accent: 99 102 241;

/* Professional light */
--color-primary: 17 24 39;
--color-accent: 37 99 235;

/* Editorial / blog */
--color-primary: 23 23 23;
--color-accent: 234 88 12;
```
