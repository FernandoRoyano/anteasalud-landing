---
name: antea-salud
description: Contexto del proyecto Antea Salud — empresa B2B de ejercicio adaptado para residencias de mayores. Cliente objetivo, identidad visual verde bienestar, tono, servicios, pipeline de vídeo con Remotion, referencias clínicas. Cargar al trabajar en este proyecto.
---

# SKILL: Antea Salud

> Contexto completo del proyecto Antea Salud.
> Solo cargar cuando se trabaje en este proyecto.

---

## 🏢 Qué es Antea Salud

Empresa de Fernando (CEO/fundador) dedicada a **ayudar a personas mayores a recuperar su autonomía mediante programas de educación física y movimiento**.

**Partner:** Rafa (Razvan) — Director de Operaciones, Marketing y Captación de Clientes.

**Pitch oficial (para cold calls):**
> "Hola, soy Fernando, fundador y CEO de Antea Salud. Somos una empresa que se dedica a ayudar a personas mayores a recuperar su autonomía con programas de educación física y movimiento. ¿Me podrías ayudar a contactar con el director o la persona responsable para agendar una reunión breve y contarles más sobre cómo podemos ayudar?"

---

## 🎯 Cliente objetivo

- **Residencias de mayores** (B2B principal)
- **Centros de día**
- **Clínicas de rehabilitación**
- **Familias con mayor en casa** (B2C secundario)

---

## 🎨 Identidad visual

### Paleta
```css
/* Verde bienestar + natural */
--color-primary: 45 106 79;        /* verde profundo */
--color-accent: 116 198 157;       /* verde fresco */
--color-surface: 250 251 250;      /* blanco cálido */
--color-text-muted: 107 114 118;
```

### Tono
- Cercano, respetuoso, profesional
- Sin infantilizar al mayor
- Enfoque en **autonomía** y **calidad de vida**, no en enfermedad
- Evitar palabras como "anciano" — usar "mayor", "persona mayor"

### Palabras clave del dominio
- Autonomía funcional
- Movilidad
- Fragilidad (término clínico aceptable)
- Sarcopenia (solo en contextos técnicos)
- Caídas (prevención)
- Calidad de vida
- Independencia

---

## 📋 Servicios

1. **Programas de ejercicio adaptado** — sesiones grupales o individuales en residencias
2. **Valoración funcional** — evaluación inicial (SPPB, handgrip, marcha)
3. **Formación al personal** — cuidadores, TCAE, auxiliares
4. **Seguimiento y reporting** — evolución medida a familiares y dirección

---

## 💻 Necesidades técnicas probables

### Landing captación de residencias
- Hero: "Recuperamos la autonomía de tus residentes"
- Beneficios: menos caídas, mejor estado anímico, diferenciación del centro
- Social proof: centros actuales + testimoniales de directores
- CTA: "Agendar valoración gratuita"
- FAQ: ¿Cómo funciona? ¿Precio? ¿Cuánto tarda en verse resultados?

### Dashboard interno
- Lista de residencias cliente
- Programación de sesiones
- Registro de valoraciones funcionales por residente
- Informes exportables (PDF) para familiares/dirección
- Módulo de facturación con la app de Fernando

### CRM de prospección
- Base de residencias en Madrid + zona ampliable
- Estado de cada lead: sin contactar, contactado, reunión agendada, cliente
- Notas de llamadas
- Fernando usa Excel ahora — migrar a web si conviene

---

## 🎥 Pipeline de vídeo — alta prioridad

Fernando está construyendo un pipeline programático con **Remotion + FFmpeg** para:
- Generar vídeos automáticos para residencias/clínicas
- Subtítulos automáticos (Whisper local)
- Intro/outro con branding Antea
- Transiciones, corte de silencios, música de fondo

**Stack preferido:**
- Tools gratuitas/locales: Whisper local para transcripción
- Claude API (no OpenAI) para generación de guion/cortes
- Remotion para composición programática
- FFmpeg para post-procesado

**Caso de uso:** automatizar la generación de vídeos promocionales para cada residencia cliente o para redes sociales.

---

## 🎯 Principios de diseño para este proyecto

- Tipografía amplia (mayores pueden tener dificultades de visión)
- Contraste alto (WCAG AAA en texto principal)
- Sin ironías ni lenguaje millennial
- Fotos reales (evitar stock genérico de mayores sonrientes en playa)
- Evitar rojos/naranjas alarmantes — verdes, azules, blancos
- Iconografía sencilla

---

## 🚫 Evitar

- Colores fluor o agresivos
- Lenguaje tecnificado innecesario ("sarcopenia" solo si hay contexto)
- Stock photos clichés
- Tono paternalista ("los abuelitos")
- Competir en precio — competir en resultados
- Prometer milagros — evidencia científica siempre

---

## 📚 Referencias científicas a tener presentes

- **Método Bilbo** (Jesús Varela, publicado en *Applied Sciences*) — método de referencia
- SPPB (Short Physical Performance Battery) — test estándar
- Recomendaciones OMS actividad física > 65 años
- Programa VIVIFRAIL (guía de prescripción)
