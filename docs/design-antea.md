# Sistema de diseño — ANTEA Salud

Referencia rápida para la web pública. Los tokens viven en `app/globals.css` (`@theme`).

## Público y principios

- Lectores: personas mayores (65+) y sus hijos adultos. Legibilidad y calma por encima del efecto.
- Texto de lectura ≥ 18 px (`text-base`). Nada de información en menos de 14 px (`text-xs`).
- Contraste mínimo AA: 4,5:1 en texto normal, 3:1 en bordes de campos e iconos informativos.
- Objetivos táctiles ≥ 44 px (`min-h-11`); botones principales 56 px (`min-h-14`).
- Sin animaciones en bucle. Todo respeta `prefers-reduced-motion`.

## Color

| Uso | Valor | Notas |
|---|---|---|
| Primario (botones, enlaces) | `#2d6a4f` (`primary`) | Blanco encima: 6,4:1 |
| Primario oscuro / títulos | `#17372b` (`primary-dark`) | Fondos oscuros (footer, CTA) |
| Texto principal | `#1f2933` (`ink`) / `#17372b` | |
| Texto secundario | `#4a6358` (`muted`) / `#3b5a4e` | 6,2:1 / 7,4:1 sobre blanco |
| Bordes de campos | `#5d746b`, 2 px | 5:1 sobre blanco |
| Fondos suaves | `#fbfcf8`, `#f3f8f4`, `#eef5f0`, `#e3f1e8` | |
| Acento sobre oscuro | `#b9e5ca` (`accent-light`) | |
| WhatsApp | `#15803d` | Blanco encima: 5:1 |
| Error | `#b91c1c` | |

No usar el azul antiguo `rgb(0,94,184)` ni grises `rgb(130,131,130)`.

## Tipografía

- Texto: Inter (variable). Títulos: Bricolage Grotesque (variable), `font-display`.
- Escala Tailwind ampliada: `text-xs` 14 px · `text-sm` 16 px · `text-base` 18 px · `text-lg` 20 px · `text-xl` 22 px.
- Artículos: clase `.prose-antea` (tamaño fluido, interlineado 1,75).

## Componentes clave

- Formularios de captación: `components/LeadForm.tsx` (`leadInputClass` compartido), siempre con `ConsentCheckbox` + `HoneypotField`.
- Landings: `components/landing/*` (`LandingHero`, `LandingSections`, `LocalServicePage`, `LandingCTA`).
- Metadatos: `buildMetadata()` en `lib/seo.ts`. JSON-LD: componente `JsonLd` (serializa de forma segura).
- Estructura: `PublicChrome` aporta `<main id="contenido">` y el enlace «Saltar al contenido»; las páginas no deben añadir otro `<main>`.
