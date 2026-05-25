# ANTEA Salud — Estrategia Completa Google Ads Search
**Versión definitiva · Mayo 2026**
**Listo para configurar con extensión de Chrome**

---

## 0. ESTADO DE LANDING PAGES (revisado hoy)

| Página | Formulario hero | Usar en Ads |
|--------|----------------|-------------|
| /prevencion-caidas-mayores-madrid | ✅ Listo | ✅ Activar ya |
| /ejercicio-mayores-mostoles | ✅ Listo | ✅ Activar ya |
| /ejercicio-mayores-getafe | ✅ Listo | ✅ Activar ya |
| /recuperar-autonomia-mayores-madrid | ❌ Sin formulario | ⛔ Esperar |
| /ejercicio-personas-mayores-madrid | ❌ Sin formulario | ⛔ Esperar |
| /ejercicio-mayores-madrid-capital | ❌ Sin formulario | ⛔ Esperar |

**Acción inmediata antes de lanzar:** añadir formulario (nombre + teléfono + botón) en el hero de las 3 páginas pendientes. El modelo exacto es el de /prevencion-caidas.

---

## 1. CONFIGURACIÓN GENERAL DE CAMPAÑA

```
Nombre:             ANTEA_Search_Captacion_MAD_2026
Tipo:               Búsqueda (Search)
Objetivo:           Clientes potenciales / Leads
Red de búsqueda:    SOLO Google Search (desactivar socios)
Red de Display:     DESACTIVADA
Estrategia de puja: Maximizar clics (fase 0 — sin historial)
                    → Cambiar a Maximizar conversiones tras 20 conversiones acumuladas
Presupuesto diario: 10€/día para empezar
                    → Subir a 15€ cuando CPL < 35€
                    → Subir a 25€ cuando CPL < 25€
Ubicación:          Comunidad de Madrid — radio 25 km desde Puerta del Sol
Idioma:             Español
Rotación anuncios:  Optimizar (mejor rendimiento)
Programación:       L–V 8:00–20:00 / Sáb 9:00–14:00 / Dom desactivado
Dispositivos:       Todos (no ajustar hasta tener 30 días de datos)
```

---

## 2. SEGUIMIENTO DE CONVERSIONES — OBLIGATORIO ANTES DE LANZAR

Sin esto Google no aprende y el dinero se malgasta.

### Conversión 1 — Principal
```
Nombre:           Formulario_Valoracion_Enviado
Tipo:             Acción en el sitio web
Cómo:             Evento JavaScript al submit del formulario
                  O página de confirmación /gracias tras envío
Valor:            35€ (coste estimado de adquirir un lead)
Ventana:          30 días
Incluir en conv.: Sí (conversión principal)
```

### Conversión 2 — Secundaria
```
Nombre:           Clic_Telefono
Tipo:             Clic en número tel:+34633261963
Valor:            20€
Incluir en conv.: No (solo observación)
```

### Conversión 3 — Secundaria
```
Nombre:           Clic_WhatsApp
Tipo:             Clic saliente a wa.me/34633261963
Valor:            15€
Incluir en conv.: No (solo observación)
```

---

## 3. KEYWORDS NEGATIVAS GLOBALES (nivel campaña)

Añadir desde el primer día. Evitan impresiones irrelevantes y protegen el presupuesto.

```
Intención informacional / no comercial:
-qué es, -qué son, -cómo se hace, -wikipedia, -pdf, -libro,
-estudio, -artículo, -investigación, -definición

Profesionales buscando formación / trabajo:
-formación, -curso, -máster, -certificación, -oposición,
-trabajo, -empleo, -sueldo, -salario, -autónomo, -precio hora

Servicios distintos / competencia directa irrelevante:
-residencia, -geriátrico, -centro de día, -centro día,
-cuidador, -ayuda a domicilio, -teleasistencia,
-fisioterapeuta, -fisioterapia, -clínica, -hospital,
-médico, -enfermero, -farmacia

Geografía fuera de cobertura:
-Barcelona, -Valencia, -Sevilla, -Bilbao, -Zaragoza,
-Málaga, -Murcia, -Alicante, -Palma, -Tenerife,
-Salamanca (ciudad), -Toledo, -Guadalajara

Precio / gratuito (intención de no pagar):
-gratis, -gratuito, -barato, -económico, -sin coste,
-precio, -cuánto cuesta (estas las captamos con nuestras LPs)

Digital / no presencial:
-online, -virtual, -app, -aplicación, -youtube, -vídeo,
-por videollamada, -en casa sin salir
```

---

## 4. AD GROUPS — ESTRUCTURA COMPLETA

### ════════════════════════════════════════
### AD GROUP 1: PREVENCIÓN DE CAÍDAS
### ════════════════════════════════════════

```
Estado:       ACTIVAR YA
Landing:      https://anteasalud.com/prevencion-caidas-mayores-madrid
Puja inicial: CPC manual máx. 1,80€ (ajustar según datos)
```

**Keywords concordancia exacta** [alta intención]:
```
[prevenir caídas mayores madrid]
[ejercicios prevenir caídas personas mayores]
[equilibrio personas mayores madrid]
[miedo a caerse mayores]
[programa equilibrio mayores domicilio madrid]
[entrenador equilibrio mayores madrid]
[ejercicios equilibrio tercera edad madrid]
[caídas personas mayores madrid]
[riesgo caídas mayores domicilio]
[mejorar equilibrio mayores en casa madrid]
```

**Keywords concordancia de frase** [media intención]:
```
"prevenir caídas mayores"
"ejercicios equilibrio mayores"
"equilibrio tercera edad madrid"
"miedo caerse mayor"
"reducir riesgo caídas mayores"
"mejorar equilibrio mayores en casa"
"ejercicio fuerza piernas mayores"
"entrenador personal mayores equilibrio"
"caídas mayores en casa"
"programa prevención caídas domicilio"
```

**Negativas específicas del grupo:**
```
-rehabilitación, -fisioterapia, -bastón, -andador,
-suelo de goma, -antideslizante, -alfombra
```

---

**ANUNCIO RSA 1-A — Ángulo: miedo / estadística**

Titulares (15):
```
H1:  Prevención de Caídas a Domicilio Madrid
H2:  ¿Tu Padre Tiene Miedo a Caerse en Casa?
H3:  1 de Cada 3 Mayores Cae al Año en España
H4:  Entrenador Titulado va a Su Domicilio
H5:  Valoración Gratuita Sin Compromiso
H6:  Ejercicio de Equilibrio Para Mayores
H7:  Recupera la Confianza al Caminar
H8:  Graduado en Ciencias del Deporte
H9:  14 Años Especializado en Personas Mayores
H10: +200 Familias en Madrid Confían en ANTEA
H11: Resultados Visibles en 6 Semanas
H12: Sin Desplazamientos · Vamos a Tu Casa
H13: Solo 5 Plazas Disponibles Este Mes
H14: Programa Personalizado de Equilibrio
H15: Actúa Ahora · Cada Semana Cuenta
```

Descripciones (4):
```
D1: Tu padre o madre tiene miedo a caerse y cada día sin actuar es un riesgo real.
    Un entrenador titulado va a su casa y trabaja fuerza, equilibrio y confianza.
    Primera valoración gratuita.

D2: El 30% de las caídas en mayores provoca lesión grave. Con ejercicio específico
    de equilibrio y fuerza se puede reducir drásticamente ese riesgo. Programa
    a domicilio en Madrid. Sin permanencia.

D3: Graduado en Ciencias del Deporte con 14 años trabajando exclusivamente con
    personas mayores. Más de 200 familias en Madrid ya confían en ANTEA Salud.
    Valoración gratuita en su casa.

D4: No hacemos clases genéricas. Cada programa es específico: fuerza en piernas,
    equilibrio dinámico, reacción ante tropiezos y revisión del entorno del hogar.
    Llama ahora: 633 261 963.
```

---

**ANUNCIO RSA 1-B — Ángulo: tranquilidad del hijo/a** *(para A/B test, activar a las 2 semanas)*

Titulares (15):
```
H1:  Prevención de Caídas a Domicilio Madrid
H2:  Tu Padre Seguro en Casa · Nosotros Vamos
H3:  Para de Preocuparte · Actúa Ahora
H4:  Profesional Titulado en su Propio Hogar
H5:  Sin Que Tenga Que Salir de Casa
H6:  Programa de Equilibrio Personalizado
H7:  Recupera su Confianza al Caminar
H8:  Graduado en Ciencias del Deporte
H9:  14 Años con Personas Mayores en Madrid
H10: +200 Familias en Madrid Ya Confían en Nosotros
H11: Mejoras Visibles en Pocas Semanas
H12: Madrid Capital Sin Recargo
H13: Solo 5 Nuevas Familias Este Mes
H14: Sin Permanencia · Sin Letra Pequeña
H15: Valoración Gratuita · Respuesta en 24h
```

Descripciones (4):
```
D1: Sabes que necesita ejercicio supervisado pero no puedes llevarlo cada semana.
    Un entrenador titulado va a su casa en Madrid y trabaja su equilibrio y fuerza.
    Tú recuperas la tranquilidad.

D2: Diseñamos un programa específico de prevención de caídas: fuerza en piernas,
    equilibrio, reflejos y revisión del hogar. Todo en 30 minutos en su salón.
    Sin desplazamientos. Sin permanencia.

D3: Más de 200 familias madrileñas confían en ANTEA Salud. Graduado en Ciencias
    del Deporte con 14 años trabajando exclusivamente con personas mayores.
    Primera valoración gratuita y sin compromiso.

D4: El 70% de nuestros clientes reduce su miedo a caer en las primeras 6 semanas.
    Trabajamos fuerza, equilibrio, reacción y entorno del hogar. Solo 5 plazas
    disponibles este mes. Llama: 633 261 963.
```

---

### ════════════════════════════════════════
### AD GROUP 2: RECUPERACIÓN POST-OPERACIÓN Y AUTONOMÍA
### ════════════════════════════════════════

```
Estado:       ACTIVAR cuando /recuperar-autonomia tenga formulario en hero
Landing:      https://anteasalud.com/recuperar-autonomia-mayores-madrid
Puja inicial: CPC manual máx. 2,00€ (intención muy alta)
```

**Keywords concordancia exacta:**
```
[ejercicio tras operación cadera mayores]
[recuperación funcional domicilio madrid]
[readaptación mayores domicilio madrid]
[ejercicio post operación rodilla mayor]
[recuperar autonomía mayores madrid]
[ejercicio mayores después de operación]
[entrenador personal post operación mayor]
[readaptación funcional personas mayores madrid]
[recuperar fuerza tras operación mayor]
[ejercicio post hospitalización mayores madrid]
```

**Keywords concordancia de frase:**
```
"recuperación post operación mayores"
"ejercicio después de la operación"
"readaptación funcional a domicilio"
"recuperar fuerza tras operación"
"autonomía personas mayores madrid"
"recuperar movilidad mayores en casa"
"ejercicio post hospitalización mayores"
"volver a caminar después de operación"
"entrenador readaptación domicilio madrid"
"ejercicio tras caída mayores madrid"
```

**Negativas específicas del grupo:**
```
-fisioterapeuta, -fisioterapia (intención sanitaria diferente),
-clínica, -hospital, -mutua, -seguro médico,
-rehabilitación (lo buscan para fisio, no para entrenador)
```

---

**ANUNCIO RSA 2-A — Ángulo: el vacío tras el alta**

Titulares (15):
```
H1:  Recuperación Funcional a Domicilio Madrid
H2:  ¿Tu Padre Acaba de Salir del Hospital?
H3:  El Alta No Es el Final de la Recuperación
H4:  Ejercicio Post-Operación en Tu Casa
H5:  Entrenador Titulado en Ciencias del Deporte
H6:  Coordinado con Tu Médico o Fisio
H7:  Recupera la Autonomía Paso a Paso
H8:  Valoración Gratuita Sin Compromiso
H9:  14 Años Especializados en Personas Mayores
H10: Recupera la Fuerza Tras la Operación
H11: Sin Desplazamientos · Vamos a Tu Casa
H12: Programa Personalizado de Readaptación
H13: +200 Familias en Madrid Confían en ANTEA
H14: Sin Permanencia · Sin Letra Pequeña
H15: Actúa Ahora · Cada Semana Sin Ejercicio Cuenta
```

Descripciones (4):
```
D1: El alta médica no es el final. Tras una operación de cadera o rodilla, el
    ejercicio supervisado es lo que marca la diferencia entre recuperarse al 100%
    o quedarse a medias. Vamos a su domicilio en Madrid.

D2: Cada semana sin ejercicio guiado tras una operación es masa muscular perdida.
    Un entrenador titulado en Ciencias del Deporte diseña el programa de vuelta
    a la actividad en su casa. Valoración gratuita.

D3: Trabajamos coordinados con tu médico o fisioterapeuta si es necesario. No
    sustituimos la rehabilitación: la complementamos con ejercicio funcional a
    domicilio. Primera valoración sin coste ni compromiso.

D4: He visto a personas de 85 años volver a salir solas a la calle tras 3 meses
    de trabajo. No es magia: es un plan bien hecho y constante. Dime tu caso
    y te digo con sinceridad qué podemos conseguir. 633 261 963.
```

---

### ════════════════════════════════════════
### AD GROUP 3: FITNESS Y CALIDAD DE VIDA (General)
### ════════════════════════════════════════

```
Estado:       ACTIVAR cuando /ejercicio-personas-mayores tenga formulario en hero
Landing:      https://anteasalud.com/ejercicio-personas-mayores-madrid
Puja inicial: CPC manual máx. 1,50€
```

**Keywords concordancia exacta:**
```
[entrenador personal mayores domicilio madrid]
[ejercicio personas mayores en casa madrid]
[entrenador mayores a domicilio madrid]
[ejercicio adaptado tercera edad madrid]
[entrenador personal tercera edad madrid]
[actividad física mayores domicilio madrid]
[entrenamiento personal personas mayores madrid]
[ejercicio funcional mayores madrid]
[entrenador especializado mayores madrid]
[ejercicio mayores domicilio madrid]
```

**Keywords concordancia de frase:**
```
"entrenador personal mayores domicilio"
"ejercicio para mayores en casa madrid"
"entrenamiento adaptado personas mayores"
"actividad física tercera edad madrid"
"ejercicio funcional mayores madrid"
"mejorar movilidad mayores en casa"
"fuerza muscular mayores en casa"
"entrenamiento funcional mayores domicilio"
"entrenador especializado personas mayores"
"ejercicio adaptado mayores madrid"
```

**Negativas específicas del grupo:**
```
-pilates, -yoga, -natación, -piscina, -gimnasio,
-clases grupales, -online, -virtual
```

---

**ANUNCIO RSA 3-A — Ángulo: preocupación del hijo/a**

Titulares (15):
```
H1:  Ejercicio Para Mayores a Domicilio Madrid
H2:  Recupera la Fuerza y la Autonomía en Casa
H3:  Entrenador Titulado Especializado en Mayores
H4:  Lo Ves Perder Fuerza · Es Momento de Actuar
H5:  Valoración Gratuita en Su Domicilio
H6:  14 Años Trabajando con Personas Mayores
H7:  Vamos a Su Casa · Sin Desplazamientos
H8:  +200 Familias en Madrid Ya Confían en Nosotros
H9:  Graduado en Ciencias del Deporte
H10: Sesiones Desde 45€ · Sin Permanencia
H11: Resultados Visibles en 4-6 Semanas
H12: Solo 5 Nuevas Familias Cada Mes
H13: Programa Personalizado Para Su Ritmo
H14: Fuerza, Equilibrio y Autonomía en Casa
H15: Sin Letra Pequeña · Sin Compromiso
```

Descripciones (4):
```
D1: Lo ves perder fuerza cada mes y sabes que necesita moverse. Pero no puedes
    llevarlo cada semana a un centro. La solución: un entrenador titulado que va
    a su casa. Valoración gratuita sin compromiso.

D2: Sesiones de 30 minutos en su salón, adaptadas a su ritmo y condición.
    Resultados medibles en 4-6 semanas. Sin desplazamientos, sin esperas,
    sin estrés. Madrid capital sin recargo de desplazamiento.

D3: Graduado en Ciencias del Deporte con 14 años especializados en personas
    mayores. Más de 200 familias en Madrid confían en ANTEA Salud. Primera
    valoración gratuita. Respuesta en menos de 24 horas.

D4: Fuerza en piernas, equilibrio, movilidad articular y confianza al caminar.
    Todo en 30 minutos en su casa, dos veces a la semana. Sin permanencia.
    Si no ves resultados, no sigues. Llama: 633 261 963.
```

---

### ════════════════════════════════════════
### AD GROUP 4: MADRID CAPITAL (Zona)
### ════════════════════════════════════════

```
Estado:       ACTIVAR cuando /ejercicio-mayores-madrid-capital tenga formulario
Landing:      https://anteasalud.com/ejercicio-mayores-madrid-capital
Puja inicial: CPC manual máx. 1,60€
```

**Keywords concordancia exacta:**
```
[entrenador mayores domicilio madrid capital]
[ejercicio mayores madrid centro]
[entrenador personal mayores chamberí]
[ejercicio mayores salamanca madrid]
[entrenador personal mayores retiro]
[ejercicio domicilio mayores madrid]
[entrenador mayores chamartín]
[ejercicio mayores tetuán madrid]
[entrenador personal mayores latina madrid]
[ejercicio mayores carabanchel]
```

**Keywords concordancia de frase:**
```
"ejercicio mayores domicilio madrid"
"entrenador mayores madrid capital"
"ejercicio en casa mayores madrid centro"
"entrenador personal mayores distrito"
"ejercicio adaptado mayores madrid barrio"
```

**Anuncio RSA 4 — Ángulo: cercanía geográfica**

Titulares (15):
```
H1:  Ejercicio Para Mayores a Domicilio Madrid
H2:  Voy a Tu Barrio · Sin Recargo de Desplazamiento
H3:  Todos los Distritos de Madrid Capital
H4:  Entrenador Titulado en Tu Casa de Madrid
H5:  Graduado en Ciencias del Deporte
H6:  14 Años Especializado en Personas Mayores
H7:  Valoración Gratuita Sin Compromiso
H8:  +200 Familias en Madrid Confían en ANTEA
H9:  Chamberí, Salamanca, Retiro y Más
H10: Sesiones Desde 45€ · Sin Permanencia
H11: Resultados en 4-6 Semanas Garantizados
H12: Solo 5 Plazas Disponibles Este Mes
H13: Sin Desplazamientos · En Su Propio Hogar
H14: Fuerza, Equilibrio y Autonomía en Casa
H15: Respuesta Garantizada en Menos de 24h
```

Descripciones (4):
```
D1: Me desplazo a cualquier distrito de Madrid capital sin recargo por
    desplazamiento. Chamberí, Salamanca, Retiro, Latina, Carabanchel, Tetuán,
    Chamartín y todos los demás. Valoración gratuita en su casa.

D2: Ejercicio adaptado para personas mayores en su propio hogar. 30 minutos,
    dos veces por semana, con un plan diseñado para su situación concreta.
    Fuerza, equilibrio y autonomía. Sin permanencia.

D3: Graduado en Ciencias del Deporte con 14 años trabajando exclusivamente
    con personas mayores en Madrid. Más de 200 familias confían en ANTEA Salud.
    Primera valoración gratuita y sin compromiso.

D4: No hacemos clases genéricas. Primero valoramos, luego diseñamos el programa,
    y ajustamos cada semana según la evolución. Si no ves valor en la primera
    sesión, no sigues. Llama: 633 261 963.
```

---

### ════════════════════════════════════════
### AD GROUP 5: MÓSTOLES (Zona)
### ════════════════════════════════════════

```
Estado:       ACTIVAR YA
Landing:      https://anteasalud.com/ejercicio-mayores-mostoles
Puja inicial: CPC manual máx. 1,40€
```

**Keywords concordancia exacta:**
```
[ejercicio mayores móstoles]
[entrenador personal mayores móstoles]
[ejercicio a domicilio mayores móstoles]
[entrenador mayores domicilio móstoles]
[actividad física mayores móstoles]
[ejercicio adaptado tercera edad móstoles]
[readaptación mayores móstoles]
[prevención caídas mayores móstoles]
```

**Keywords concordancia de frase:**
```
"ejercicio mayores móstoles"
"entrenador personal mayores móstoles"
"ejercicio domicilio mayores sur madrid"
"entrenador mayores domicilio móstoles"
"ejercicio adaptado mayores móstoles"
```

**Anuncio RSA 5 — Ángulo: local + domicilio**

Titulares (15):
```
H1:  Ejercicio Para Mayores a Domicilio Móstoles
H2:  Entrenador Titulado Que va a Tu Casa en Móstoles
H3:  Graduado en Ciencias del Deporte
H4:  14 Años Especializado en Personas Mayores
H5:  Valoración Gratuita Sin Compromiso
H6:  Coimbra, Pradillo, El Soto, Centro y Más
H7:  +200 Familias en Madrid Confían en ANTEA
H8:  Prevención de Caídas en Su Domicilio
H9:  Recuperación Post-Operación a Domicilio
H10: Sesiones Desde 65€ · Sin Permanencia
H11: Solo 5 Nuevas Plazas Este Mes
H12: Resultados Visibles en 4-6 Semanas
H13: Sin Desplazamientos Para Tu Familiar
H14: Fuerza, Equilibrio y Autonomía en Casa
H15: Respuesta en Menos de 24 Horas
```

Descripciones (4):
```
D1: Voy a tu casa en Móstoles a entrenar a tu padre, madre o familiar. Ejercicio
    adaptado para recuperar fuerza, equilibrio y autonomía. Entrenador titulado
    en Ciencias del Deporte con 14 años de experiencia. Primera valoración gratis.

D2: Me desplazo a todos los barrios de Móstoles: Parque Coimbra, Pradillo,
    El Soto, Iviasa, centro y más. Sesiones de 30 minutos adaptadas a cada
    persona. Sin permanencia. Sin pago por adelantado.

D3: Graduado en Ciencias del Deporte. 14 años trabajando exclusivamente con
    personas mayores. Más de 200 familias en Madrid confían en ANTEA Salud.
    Primera valoración gratuita. Respuesta en menos de 24 horas.

D4: Prevención de caídas, recuperación post-operación o mantenimiento activo.
    Diseño un plan específico para cada caso en su propio hogar. Sin genéricos.
    Si no ves valor desde el principio, no sigues. Llama: 633 261 963.
```

---

### ════════════════════════════════════════
### AD GROUP 6: GETAFE (Zona)
### ════════════════════════════════════════

```
Estado:       ACTIVAR YA
Landing:      https://anteasalud.com/ejercicio-mayores-getafe
Puja inicial: CPC manual máx. 1,40€
```

**Keywords concordancia exacta:**
```
[ejercicio mayores getafe]
[entrenador personal mayores getafe]
[ejercicio a domicilio mayores getafe]
[entrenador mayores domicilio getafe]
[actividad física mayores getafe]
[ejercicio adaptado tercera edad getafe]
[prevención caídas mayores getafe]
[readaptación mayores getafe]
```

**Keywords concordancia de frase:**
```
"ejercicio mayores getafe"
"entrenador personal mayores getafe"
"ejercicio domicilio mayores getafe"
"entrenador mayores domicilio sur madrid"
"ejercicio adaptado mayores getafe"
```

**Anuncio RSA 6 — Ángulo: local + domicilio**

Titulares (15):
```
H1:  Ejercicio Para Mayores a Domicilio Getafe
H2:  Entrenador Titulado Que va a Tu Casa en Getafe
H3:  Graduado en Ciencias del Deporte
H4:  14 Años Especializado en Personas Mayores
H5:  Valoración Gratuita Sin Compromiso
H6:  Sector 3, San Isidro, El Bercial y Más
H7:  +200 Familias en Madrid Confían en ANTEA
H8:  Prevención de Caídas en Tu Domicilio
H9:  Recuperación Post-Operación a Domicilio
H10: Sesiones Desde 65€ · Sin Permanencia
H11: Solo 5 Nuevas Plazas Este Mes
H12: Resultados Visibles en 4-6 Semanas
H13: Sin Desplazamientos Para Tu Familiar
H14: Fuerza, Equilibrio y Autonomía en Casa
H15: Respuesta en Menos de 24 Horas
```

Descripciones (4):
```
D1: Voy a tu casa en Getafe a entrenar a tu padre, madre o familiar. Ejercicio
    adaptado para recuperar fuerza, equilibrio y autonomía. Entrenador titulado
    en Ciencias del Deporte con 14 años de experiencia. Primera valoración gratis.

D2: Me desplazo a todos los barrios de Getafe: Sector 3, Las Margaritas,
    San Isidro, El Bercial, Los Molinos, Getafe Norte y centro. Sesiones de
    30 minutos. Sin permanencia. Sin pago por adelantado.

D3: Graduado en Ciencias del Deporte. 14 años trabajando exclusivamente con
    personas mayores. Más de 200 familias en Madrid confían en ANTEA Salud.
    Primera valoración gratuita. Respuesta en menos de 24 horas.

D4: Prevención de caídas, recuperación post-operación o mantenimiento activo.
    Diseño un plan específico para cada caso en su propio hogar. Si no ves valor
    desde el principio, no sigues. Llama: 633 261 963.
```

---

## 5. EXTENSIONES DE ANUNCIO (nivel campaña — aplican a todos los ad groups)

### Sitelinks (6)
```
1. Prevención de Caídas
   L1: Programa de equilibrio y fuerza
   L2: A domicilio en Madrid
   URL: /prevencion-caidas-mayores-madrid

2. Recuperación Post-Operación
   L1: Tras operación de cadera o rodilla
   L2: Coordinado con tu médico
   URL: /recuperar-autonomia-mayores-madrid

3. Madrid Capital (Sin Recargo)
   L1: Los 21 distritos de Madrid
   L2: Sin recargo de desplazamiento
   URL: /ejercicio-mayores-madrid-capital

4. Zona Sur: Móstoles y Getafe
   L1: Móstoles, Getafe, Leganés, Alcorcón
   L2: +10€ por sesión de desplazamiento
   URL: /ejercicio-mayores-mostoles

5. Ver Testimonios
   L1: +200 familias en Madrid confían en ANTEA
   L2: Valoraciones verificadas 4.9 estrellas
   URL: anteasalud.com/#testimonios

6. Guía Gratuita: Prevenir Caídas
   L1: 10 ejercicios explicados paso a paso
   L2: Descarga inmediata, sin coste
   URL: /guia-prevencion-caidas
```

### Textos destacados / Callouts (máx. 20 caracteres)
```
Valoración Gratuita
Sin Permanencia
Graduado CCDD
14 Años de Experiencia
+200 Familias Madrid
Respuesta en 24h
Madrid Capital Sin Recargo
Solo 5 Plazas al Mes
```

### Fragmentos estructurados
```
Encabezado: Servicios
Valores:
- Prevención de caídas
- Readaptación post-operación
- Entrenamiento funcional
- Seguimiento personalizado
- Valoración gratuita
```

### Extensión de llamada
```
Número:       633 261 963
Programación: igual que la campaña (L-V 8-20 / S 9-14)
```

### Extensión de imagen
```
Usar foto profesional en contexto de sesión a domicilio
Formato: 1200x628 y 300x300
```

---

## 6. AUDIENCIAS EN MODO OBSERVACIÓN

No excluir nada todavía. Solo observar cómo convierten.

```
In-market:
- Servicios de salud y bienestar para personas mayores
- Fisioterapia y rehabilitación
- Cuidado de personas mayores

Affinity:
- Padres de hijos adultos
- Cuidadores de familiares

Demográfico (observación):
- Edad 35–64 (los hijos que deciden)
- No excluir ningún segmento todavía
```

---

## 7. PLAN DE ACTIVACIÓN POR FASES

### FASE 0 — Hoy mismo (sin esperar)
```
✅ Configurar las 3 conversiones en Google Ads (formulario, teléfono, WhatsApp)
✅ Activar Ad Group 1: Prevención de caídas → /prevencion-caidas
✅ Activar Ad Group 5: Móstoles → /ejercicio-mayores-mostoles
✅ Activar Ad Group 6: Getafe → /ejercicio-mayores-getafe
✅ Añadir todas las extensiones de anuncio
✅ Añadir keywords negativas globales
```

### FASE 1 — En cuanto tengas formularios en las 3 páginas pendientes
```
▶ Activar Ad Group 2: Recuperar autonomía → /recuperar-autonomia
▶ Activar Ad Group 3: Fitness general → /ejercicio-personas-mayores
▶ Activar Ad Group 4: Madrid capital → /ejercicio-mayores-madrid-capital
```

### FASE 2 — A los 14 días de datos
```
→ Revisar informe de términos de búsqueda reales
→ Añadir nuevas negativas que aparezcan irrelevantes
→ Pausar keywords con 0 clics y alto CPC
→ Identificar qué ad group tiene mejor CTR
→ Activar anuncio RSA 1-B (test A/B en AG1)
```

### FASE 3 — Cuando haya 20 conversiones acumuladas
```
→ Cambiar estrategia de puja: Maximizar conversiones
→ Redistribuir presupuesto hacia los ad groups con mejor CPL
→ Subir presupuesto diario si CPL < 35€
```

### FASE 4 — Mes 2-3
```
→ Crear campaña de remarketing Display para visitantes sin conversión
→ Evaluar crear ad groups de zona adicionales (Leganés, Alcorcón, Pozuelo)
→ Cambiar a Maximizar valor de conversiones si hay suficientes datos
→ Testar extensión de promoción en temporadas clave
```

---

## 8. KPIs Y OBJETIVOS

| Métrica | Mes 1 (objetivo) | Mes 3 (objetivo) |
|---------|-----------------|-----------------|
| CTR anuncios | > 3% | > 5% |
| Tasa conversión LP | > 3% | > 6% |
| Coste por lead (CPL) | < 40€ | < 25€ |
| Leads/mes | 5+ | 12+ |
| Tasa de cierre lead→cliente | > 30% | > 40% |
| Coste de adquisición cliente | < 130€ | < 65€ |

---

## 9. RESUMEN EJECUTIVO PARA LA EXTENSIÓN

```
CAMPAÑA:    ANTEA_Search_Captacion_MAD_2026
OBJETIVO:   Leads (valoraciones gratuitas)
PRESUPUESTO: 10€/día → escalar según CPL
PUJA:       Maximizar clics → Maximizar conversiones (tras 20 conv.)
UBICACIÓN:  Comunidad de Madrid, radio 25 km desde Puerta del Sol
HORARIO:    L-V 8-20h / S 9-14h

AD GROUPS:
1. Prevención caídas     → /prevencion-caidas-mayores-madrid     ✅ ACTIVAR HOY
2. Post-operación        → /recuperar-autonomia-mayores-madrid    ⏳ Falta formulario
3. Fitness general       → /ejercicio-personas-mayores-madrid     ⏳ Falta formulario
4. Madrid capital        → /ejercicio-mayores-madrid-capital      ⏳ Falta formulario
5. Móstoles              → /ejercicio-mayores-mostoles            ✅ ACTIVAR HOY
6. Getafe                → /ejercicio-mayores-getafe              ✅ ACTIVAR HOY

PRIORIDAD ABSOLUTA #1: Configurar conversiones antes de encender cualquier ad group
PRIORIDAD ABSOLUTA #2: Formulario en hero de las 3 páginas pendientes
DIFERENCIADORES EN COPY: Sin permanencia · Graduado CCDD · 14 años · 5 plazas/mes
CTA UNIVERSAL: Valoración gratuita
```

---

*ANTEA Salud · Estrategia Google Ads · Mayo 2026 · v2.0 definitiva*
