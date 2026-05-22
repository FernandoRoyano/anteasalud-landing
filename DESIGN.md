# DESIGN.md — CodeConnect

> Conectando ideas, creando soluciones
> Brand identity reference for AI coding agents. Drop this file in your project root and reference it in every UI prompt.

---

## 1. Visual Theme & Atmosphere

CodeConnect is a **web development and digital solutions agency** targeting health, fitness, and wellness businesses in Madrid. The design language is **editorial-refined meets technical precision** — not corporate-cold, not startup-playful. Think: a senior developer who also understands business and speaks the client's language.

**Core feeling:** Professional confidence. Clean power. Approachable expertise.

**Design philosophy:**
- Generous whitespace with intentional density in key sections
- Dark-background sections for impact (hero, CTA, pricing highlight)
- Light cream/off-white base — never pure white, never gray
- Subtle scroll-reveal animations — nothing distracting
- Every element earns its space

**Aesthetic keywords:** Editorial refinada · Autoridad sin prepotencia · Claridad técnica · Confianza digital

---

## 2. Color Palette & Roles

| Token | Hex | RGB | CMYK | Role |
|---|---|---|---|---|
| `--cc-blue` | `#194973` | R:25 G:73 B:115 | C:96 M:69 Y:30 K:16 | Primary brand, headings, nav, CTA bg |
| `--cc-green` | `#71C648` | R:113 G:198 B:72 | C:59 M:50 Y:79 K:0 | Accent, success, highlights, badges |
| `--cc-gray` | `#5A6D6D` | R:90 G:109 B:109 | C:63 M:41 Y:45 K:28 | Body text, subheadings, muted content |
| `--cc-cream` | `#f8f6f1` | — | — | Page background, light sections |
| `--cc-dark` | `#0d1f2d` | — | — | Dark sections bg, footer, impact areas |
| `--cc-white` | `#ffffff` | — | — | Cards, modals, form fields |
| `--cc-blue-light` | `#e8f0f7` | — | — | Hover states, info tags, subtle fills |
| `--cc-green-light` | `#e8f5e0` | — | — | Success states, positive badges |

### Usage rules
- **`--cc-blue`** dominates: navbar, headings, primary buttons, section borders
- **`--cc-green`** accents: CTAs, checkmarks, pricing highlights, active states — never overused
- **`--cc-gray`** for all body copy and secondary text
- **`--cc-cream`** as default page background — never pure white
- **`--cc-dark`** for high-impact sections: hero overlay, solution sections, CTA blocks
- Never use `--cc-green` as a background for large sections
- On dark backgrounds (`--cc-dark`): text is white, accents are `--cc-green`

---

## 3. Typography Rules

### Font families

| Role | Font | Fallback |
|---|---|---|
| **Display / Headings** | `Helvetica Neue` | `Helvetica`, `Arial`, sans-serif |
| **Body / UI** | `Roboto` | `sans-serif` |

> Note: Per brand manual, Helvetica is the primary corporate font. Roboto is the secondary. Both available via Google Fonts (`Roboto`) and system (`Helvetica Neue`).

### Type scale

| Element | Size | Weight | Line-height | Color |
|---|---|---|---|---|
| H1 hero | `clamp(2.5rem, 5vw, 4rem)` | 700 | 1.1 | `--cc-blue` or white |
| H2 section | `clamp(1.75rem, 3vw, 2.5rem)` | 700 | 1.2 | `--cc-blue` |
| H3 card | `1.25rem` | 600 | 1.3 | `--cc-blue` |
| H4 label | `0.875rem` | 600 | 1.4 | `--cc-gray` |
| Body large | `1.125rem` | 400 | 1.65 | `--cc-gray` |
| Body | `1rem` | 400 | 1.6 | `--cc-gray` |
| Body small | `0.875rem` | 400 | 1.5 | `--cc-gray` |
| Caption | `0.75rem` | 400 | 1.4 | `--cc-gray` |
| Button | `0.9375rem` | 600 | 1 | depends on variant |
| Nav link | `0.9375rem` | 500 | 1 | `--cc-blue` |

### Typography rules
- Headings always in Helvetica Neue Bold
- Body text in Roboto Regular
- Never use italic for brand headings
- Letter-spacing on uppercase labels: `0.08em`
- H1 and H2: slight negative letter-spacing `-0.02em`

---

## 4. Component Styles

### Buttons

```css
/* Primary — use on light backgrounds */
.btn-primary {
  background: var(--cc-blue);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 28px;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}
.btn-primary:hover {
  background: #1a5a8a;
  transform: translateY(-1px);
}

/* Secondary — outlined */
.btn-secondary {
  background: transparent;
  color: var(--cc-blue);
  border: 2px solid var(--cc-blue);
  border-radius: 8px;
  padding: 12px 26px;
  font-weight: 600;
  transition: all 0.2s;
}
.btn-secondary:hover {
  background: var(--cc-blue);
  color: white;
}

/* Accent — green CTA */
.btn-accent {
  background: var(--cc-green);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 28px;
  font-weight: 700;
  transition: filter 0.2s, transform 0.15s;
}
.btn-accent:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

/* Ghost — on dark backgrounds */
.btn-ghost {
  background: transparent;
  color: white;
  border: 2px solid rgba(255,255,255,0.5);
  border-radius: 8px;
  padding: 12px 26px;
  font-weight: 600;
}
.btn-ghost:hover {
  border-color: var(--cc-green);
  color: var(--cc-green);
}
```

### Cards

```css
.card {
  background: var(--cc-white);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(25, 73, 115, 0.08);
  box-shadow: 0 2px 16px rgba(25, 73, 115, 0.06);
  transition: box-shadow 0.25s, transform 0.25s;
}
.card:hover {
  box-shadow: 0 8px 40px rgba(25, 73, 115, 0.12);
  transform: translateY(-3px);
}

/* Feature card with top accent */
.card-feature {
  border-top: 3px solid var(--cc-green);
}

/* Pricing card highlighted (recommended) */
.card-pricing-highlight {
  border: 2px solid var(--cc-blue);
  position: relative;
  transform: scale(1.03);
}
```

### Severity / Status Badges (for audit sections)

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.badge-critico   { background: #fef2f2; color: #dc2626; }
.badge-importante{ background: #fff7ed; color: #ea580c; }
.badge-medio     { background: #fefce8; color: #ca8a04; }
.badge-ok        { background: var(--cc-green-light); color: #15803d; }
```

### Navigation (Blur Navbar)

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  background: rgba(248, 246, 241, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(25, 73, 115, 0.08);
  padding: 16px 0;
}
```

### Inputs / Forms

```css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid rgba(25, 73, 115, 0.2);
  border-radius: 8px;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: var(--cc-dark);
  background: var(--cc-white);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.input:focus {
  outline: none;
  border-color: var(--cc-blue);
  box-shadow: 0 0 0 3px rgba(25, 73, 115, 0.1);
}
```

### Section dividers

```css
/* Dark impact section */
.section-dark {
  background: var(--cc-dark);
  color: white;
}
.section-dark h2, .section-dark h3 { color: white; }
.section-dark .accent { color: var(--cc-green); }

/* Light section */
.section-light {
  background: var(--cc-cream);
}

/* Blue section */
.section-blue {
  background: var(--cc-blue);
  color: white;
}
```

---

## 5. Layout Principles

### Spacing scale (8px base grid)

| Token | Value | Use |
|---|---|---|
| `--space-xs` | `8px` | Internal padding, icon gaps |
| `--space-sm` | `16px` | Card internal spacing (small) |
| `--space-md` | `24px` | Between related elements |
| `--space-lg` | `40px` | Between sections / components |
| `--space-xl` | `64px` | Section padding (vertical) |
| `--space-2xl` | `96px` | Hero / large section padding |
| `--space-3xl` | `128px` | Max section vertical rhythm |

### Container

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Wide for full-bleed sections */
.container-wide {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 48px;
}
```

### Grid patterns

- **3-column features:** `grid-template-columns: repeat(3, 1fr)` — collapses to 1 col on mobile
- **Pricing 3-col:** same, with center card elevated (`transform: scale(1.03)`)
- **2-col hero:** `grid-template-columns: 1fr 1fr` — text left, visual/mockup right
- **Timeline:** single column with connector line on left

### Border radius

- Cards, modals, large elements: `16px`
- Buttons, inputs, tags: `8px`
- Pills / badges: `20px` (fully rounded)
- Icons in circles: `50%`

---

## 6. Depth & Elevation

| Level | Shadow | Use |
|---|---|---|
| Flat | none | Table rows, list items |
| Raised | `0 2px 16px rgba(25,73,115,0.06)` | Default cards |
| Elevated | `0 8px 40px rgba(25,73,115,0.12)` | Hover state, modals |
| Floating | `0 20px 60px rgba(25,73,115,0.18)` | Dropdowns, tooltips |

Always use blue-tinted shadows, never pure black shadows.

---

## 7. Proposal Page Structure (Standard)

Every CodeConnect proposal web page follows this section order:

1. **Hero** — Dark background (`--cc-dark`), logo top-left, headline with key metrics (3 stats inline), primary CTA button in `--cc-green`
2. **Audit** — Light background (`--cc-cream`), list of problems with severity badges (crítico / importante / medio)
3. **Solution** — Dark background (`--cc-dark`), what we offer, benefits list with green checkmarks
4. **ROI Table** — White background, comparison table (Situación actual vs Con CodeConnect)
5. **Pricing** — Cream background, 3-column cards (Básico / Profesional ⭐ / Premium), center card elevated with blue border
6. **Process Timeline** — Light background, numbered steps horizontal
7. **Guarantee** — Blue background (`--cc-blue`), white text, 30-day guarantee message
8. **CTA Final** — Dark background, large headline, email CTA: `codeconnectsl@gmail.com`

---

## 8. Animations & Motion

```css
/* Scroll reveal — apply via IntersectionObserver or CSS @starting-style */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered reveal for grids */
.reveal:nth-child(1) { transition-delay: 0ms; }
.reveal:nth-child(2) { transition-delay: 100ms; }
.reveal:nth-child(3) { transition-delay: 200ms; }

/* Scroll progress bar */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--cc-green);
  z-index: 200;
  transition: width 0.1s linear;
}
```

---

## 9. Logo Usage

The CodeConnect logo is a wordmark: **"Code[toggle-icon]nnect"** where the O in "Connect" is replaced by a toggle switch icon.

### Logo versions
- **Principal color** (on white/cream): Blue text + Green/Blue toggle icon
- **Sobre fondo azul**: White text + Green/Blue toggle
- **Sobre fondo verde**: White text + Blue/White toggle
- **Negativa** (on dark): White text + White/Gray toggle
- **Solo icono**: Toggle switch in green + blue (principal) or white/gray (negativa)

### Logo clear space
Minimum clear space = height of the letter "C" on all sides.

### Logo DON'Ts
- Never stretch or distort
- Never apply drop shadows to the logo
- Never place on busy photographic backgrounds without overlay
- Never use unapproved color combinations

---

## 10. Do's and Don'ts

### ✅ Do
- Use `--cc-cream` as default page background — never pure white
- Apply blue-tinted shadows consistently
- Use `--cc-green` for the most important CTA on any page
- Keep body text in `--cc-gray`, not black
- Use scroll-reveal on cards and sections
- Apply blur navbar on all multi-section pages
- Write all copy in Spanish (client-facing content)
- Reference contact only as `codeconnectsl@gmail.com` — no phone, no personal name
- Mention training as "manual de uso y vídeos tutoriales grabados"

### ❌ Don't
- Don't use pure black (`#000000`) anywhere — use `--cc-dark` instead
- Don't use purple, red, or orange — not in the brand palette
- Don't use Inter, Space Grotesk, or Montserrat — use Helvetica Neue + Roboto
- Don't apply `--cc-green` as a large section background
- Don't use WordPress logos, PHP icons, or "old web" imagery
- Don't add phone numbers or personal names to documents
- Don't use the word "barato" — use "eficiente", "optimizado", "accesible"
- Don't promise delivery timelines you can't control
- Don't use generic stock photos of people shaking hands

---

## 11. Responsive Behavior

| Breakpoint | Width | Notes |
|---|---|---|
| Mobile | `< 768px` | Single column, stacked nav, hamburger menu |
| Tablet | `768px – 1024px` | 2-col grids, condensed padding |
| Desktop | `> 1024px` | Full layout, 3-col pricing |

- Touch targets minimum: `44px`
- Font size floor: `16px` body on mobile (no zooming)
- Pricing cards: stack to 1-col on mobile, remove scale transform
- Navbar: collapse to hamburger on mobile with slide-in menu

---

## 12. Agent Prompt Guide

### Quick color reference for prompts
```
Primary blue: #194973
Accent green: #71C648  
Gray text: #5A6D6D
Background cream: #f8f6f1
Dark sections: #0d1f2d
```

### Ready-to-use prompts

**Build a proposal page:**
```
Build a professional web proposal page following DESIGN.md. 
Use --cc-dark for the hero, --cc-cream for the audit section, 
--cc-dark again for the solution section, and the standard 
3-column pricing layout with the Profesional card elevated.
All text in Spanish. Contact: codeconnectsl@gmail.com
```

**Build a landing page:**
```
Build a landing page following DESIGN.md. Blur navbar fixed at top,
scroll progress bar in --cc-green, hero with dark overlay, 
scroll-reveal on all cards. Font: Helvetica Neue headings + Roboto body.
```

**Build a component:**
```
Build a [component name] following DESIGN.md. 
Use --cc-blue for primary actions, --cc-green for the accent CTA,
cards with 16px radius and blue-tinted shadow. Roboto body font.
```

**Build a dashboard:**
```
Build a dashboard following DESIGN.md. Dark sidebar in --cc-dark,
main content area in --cc-cream background, metric cards with 
blue-tinted shadows, status badges using the badge classes defined
in DESIGN.md. Navigation links in --cc-blue.
```

---

*DESIGN.md — CodeConnect · codeconnectsl@gmail.com*  
*Versión 1.0 — Abril 2026*
