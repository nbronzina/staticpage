# Auditoría Mobile-First — nicolasbronzina.com

**Fecha:** 13 de junio, 2026  
**Enfoque:** Principios UX responsive + jerarquía mobile + patrón Gutenberg

---

## RESUMEN EJECUTIVO

❌ **Hallazgo crítico:** El sitio es **DESKTOP-FIRST**, no mobile-first.

**Impacto:**
- CSS diseñado para desktop por defecto
- Mobile como "adaptación" via `@media (max-width: 860px)`
- Jerarquía pensada para pantalla grande primero
- Oportunidades perdidas de optimización mobile

**Recomendación:** Refactorizar a mobile-first con progressive enhancement.

---

## 1. ARQUITECTURA ACTUAL (Desktop-First)

### Evidencia

```css
/* Estilos base = Desktop */
.dirA-intro {
  display: grid;
  grid-template-columns: 280px 1fr; /* Dos columnas por defecto */
  gap: 80px;
}

/* Mobile = Override */
@media (max-width: 860px) {
  .dirA-intro {
    grid-template-columns: 1fr; /* Una columna */
    gap: 40px;
  }
}
```

**Problema:** Mobile hereda estilos desktop y los sobrescribe. Desperdicia bytes.

**Solución mobile-first:**
```css
/* Base = Mobile */
.dirA-intro {
  display: grid;
  grid-template-columns: 1fr; /* Una columna */
  gap: 40px;
}

/* Desktop = Enhancement */
@media (min-width: 861px) {
  .dirA-intro {
    grid-template-columns: 280px 1fr; /* Dos columnas */
    gap: 80px;
  }
}
```

---

## 2. JERARQUÍA VISUAL EN MOBILE

### Qué ve el usuario PRIMERO en mobile (orden actual):

1. **Audio player** (Adaptaciones) — Fixed top-right
2. **Theme toggle** — Fixed top-right
3. **Nombre (H1)** — "Nicolás Bronzina"
4. **Subtítulo** — "AI-Enhanced Futures Designer"
5. **Ubicación** — "Buenos Aires ↔ Madrid"
6. **Retrato** (280px) — Foto
7. **Lede** — "Your organization navigates..."
8. **Descripción** — BPP, UDIT, Heated Studio...

### Análisis según principios UX:

✅ **BIEN:**
- Nombre primero (identidad clara)
- Lede destacado con mayor tamaño
- Jerarquía h1 → h2 → h3 respetada

❌ **MAL:**
- **Audio player ocupa espacio crítico** → No es la acción más importante para un visitante nuevo
- **Retrato 280px en mobile** → Ocupa ~40% del viewport en iPhone SE (375px)
- **Descripción larga antes de CTAs** → Usuario scrollea 3-4 pantallas antes de ver "Let's talk"

### Recomendación:

**Prioridad 1 (Above the fold mobile):**
1. Nombre + rol
2. Lede (propuesta de valor)
3. CTA principal ("Let's talk" o link a proyecto destacado)

**Prioridad 2 (Scroll 1):**
4. Retrato (más pequeño: 200px)
5. Audio player (inline, no fixed)

**Prioridad 3 (Scroll 2+):**
6. Descripción completa
7. Proyectos

---

## 3. PATRÓN GUTENBERG (Arriba-Izq → Abajo-Der)

### Desktop: ✅ **CUMPLE**
- H1 arriba-izq
- Retrato derecha
- Lectura diagonal natural

### Mobile: ⚠️ **PARCIAL**
- Todo vertical → no hay diagonal
- Pero orden top-to-bottom es correcto
- **Problema:** Audio player fixed rompe el flujo (no es parte del contenido, distrae)

### Recomendación:
- Remover fixed positioning del audio player en mobile
- Colocarlo inline después del lede o al final de intro

---

## 4. ALTURA EN MOBILE (El alto es oro)

### Análisis de altura innecesaria:

| Elemento | Altura Mobile | ¿Necesario? | Optimización |
|----------|---------------|-------------|--------------|
| **Audio player (fixed)** | ~70px | ❌ No crítico | Inline o al final |
| **Retrato** | 280px | ⚠️ Muy grande | Reducir a 200px o 180px |
| **Intro text (4 párrafos)** | ~450px | ⚠️ Largo | Acortar o colapsar "Read more" |
| **Section heads** | 56px padding-top | ✅ OK | Mantener |
| **Espaciado vertical** | 60px entre secciones | ✅ OK | Mantener respiración |

**Cálculo:**
- Viewport iPhone SE: 667px altura
- Above the fold actual: Audio (70px) + H1 (120px) + Subtitle (30px) + Location (20px) = **240px antes del contenido útil**
- **Usuario ve <50% de contenido útil** en primera pantalla

**Optimización:**
- Reducir retrato: 280px → 200px = **ahorro 80px**
- Mover audio inline = **ahorro 70px**
- **Total: +150px de contenido útil above the fold** (67% más)

---

## 5. CARDS Y SECCIONES (¿Muestran lo importante primero?)

### Proyectos:

✅ **BIEN:**
- Título + descripción primero
- Links secundarios (meta) debajo
- Audio tour inline (Mercado San Telmo)

❌ **PUEDE MEJORAR:**
- Imágenes de proyectos ocultas → ¿Agregar preview visual?
- Meta links todos iguales visualmente → ¿Destacar CTA principal?

### Writing:

✅ **BIEN:**
- Título de grupo primero
- Descripción + imagen
- Lista de artículos

❌ **PUEDE MEJORAR:**
- Imágenes muy grandes en mobile → Reducir a 300px max-width

### CV:

❌ **MAL:**
- Bloques muy densos en mobile (texto largo)
- No hay "Read more" para comprimir
- Usuario debe scrollear mucho para ver experiencia completa

**Recomendación:**
- Colapsar descripciones largas en mobile
- Mostrar solo título + rol por defecto
- "Expand" para leer full description

---

## 6. RUIDO VS SEÑAL

### Ruido innecesario:

1. **Audio player fixed en mobile** → Ruido (distrae, no es acción principal)
2. **Descripción de 4 párrafos** → Señal, pero demasiado larga para mobile
3. **CV descripciones largas** → Señal, pero abrumador en mobile
4. **Footer con 3 links sociales** → Señal útil, OK

### Señal clara:

1. **Nombre + rol** → ✅ Perfecto
2. **Lede** → ✅ Propuesta de valor clara
3. **"Let's talk" CTA** → ✅ Pero está MUY ABAJO (scroll 3+)
4. **Proyectos destacados** → ✅ Bien estructurados

### Recomendación:
- **Reducir ruido:** Mover audio inline, comprimir CV en mobile
- **Amplificar señal:** Subir CTA, agregar preview visual a proyectos

---

## 7. BREAKPOINTS Y RESPONSIVE

### Actual:
- **1 breakpoint:** `@media (max-width: 860px)`
- Todo <860px = "mobile"
- Todo >860px = "desktop"

### Problema:
- 860px es muy alto para "mobile" (típico tablet landscape)
- No hay diferenciación entre:
  - Phone (320-480px)
  - Large phone (481-767px)
  - Tablet portrait (768-1024px)
  - Desktop small (1025-1440px)
  - Desktop large (1441px+)

### Recomendación mobile-first:

```css
/* Base = Mobile (320px+) */
.element { ... }

/* Large mobile (≥480px) */
@media (min-width: 480px) { ... }

/* Tablet (≥768px) */
@media (min-width: 768px) { ... }

/* Desktop (≥1024px) */
@media (min-width: 1024px) { ... }

/* Large desktop (≥1440px) */
@media (min-width: 1440px) { ... }
```

---

## 8. ACCESIBILIDAD Y TOUCH TARGETS

✅ **BIEN:**
- Touch targets >44×44px (theme toggle, audio buttons, back-to-top)
- Safe area insets para iOS
- Semantic HTML (landmarks, headings)

⚠️ **MEJORAR:**
- Algunos links en CV muy juntos (riesgo tap error)
- Audio controls en mobile muy pequeños (8px font)

---

## 9. IMÁGENES RESPONSIVE

✅ **BIEN:**
- Srcset para retrato (hi-sm.webp, hi.webp)
- Sizes attribute correcto
- WebP con fallback JPG
- Width/height para evitar CLS

❌ **MAL:**
- Imágenes de Writing muy grandes (1000px+ en mobile)
- MARGIN.SIGNALS 1073×1600 → Desperdicio en 375px viewport

**Recomendación:**
- Generar versiones small (400w) para todas las imágenes de content
- Actualizar srcset

---

## 10. PERFORMANCE EN MOBILE

### Bueno:
- Fonts self-hosted
- Preload critical fonts
- WebP images
- No JS pesado

### Mejorar:
- Lazy load images fuera de viewport
- Defer non-critical CSS (dark mode?)
- Minify HTML (comentarios innecesarios)

---

## PRIORIZACIÓN DE FIXES

### 🔴 **CRÍTICO** (Hacer YA)

1. **Refactor CSS a mobile-first**
   - Cambiar arquitectura base
   - Progressive enhancement
   - **Impacto:** -15-20% CSS size, mejor performance mobile

2. **Mover audio player inline en mobile**
   - De fixed top → inline después de intro
   - **Impacto:** +70px above the fold, menos distracción

3. **Reducir altura de retrato mobile**
   - 280px → 200px
   - **Impacto:** +80px above the fold

4. **Subir CTA "Let's talk"**
   - De final de intro → después de lede
   - **Impacto:** Usuario ve acción principal en scroll 1

### 🟡 **IMPORTANTE** (Próxima iteración)

5. **Colapsar CV descriptions en mobile**
   - Mostrar solo título + rol
   - Expand para ver full
   - **Impacto:** -50% scroll en CV section

6. **Agregar breakpoints intermedios**
   - 480px, 768px, 1024px
   - **Impacto:** Mejor UX en tablets

7. **Optimizar imágenes para mobile**
   - Generar 400w versions
   - Actualizar srcset
   - **Impacto:** -40-60% image bytes en mobile

### 🟢 **NICE TO HAVE** (Backlog)

8. **Preview visual en proyectos**
   - Thumbnail o hero image
   - **Impacto:** Más engaging, más clics

9. **Dark mode toggle más accesible**
   - Actualmente solo arriba-derecha
   - ¿Agregar en footer también?

10. **Micro-interacciones**
    - Scroll-triggered animations
    - Hover states más ricos
    - **Impacto:** Más polish, más memorable

---

## CHECKLIST MOBILE-FIRST

Para verificar que el refactor cumple principios:

- [ ] CSS base es para mobile (320px)
- [ ] Media queries usan `min-width`, no `max-width`
- [ ] Contenido crítico above the fold en 375px viewport
- [ ] Usuario ve propuesta de valor + CTA en primera pantalla
- [ ] Audio player no distrae en mobile
- [ ] Retrato <40% viewport height
- [ ] CV descriptions colapsables
- [ ] Imágenes optimizadas para viewport mobile
- [ ] Touch targets ≥44×44px en todos los interactivos
- [ ] Patrón Gutenberg respetado (top-to-bottom en mobile)
- [ ] Altura total <3000px en iPhone SE (scroll razonable)

---

## MÉTRICAS DE ÉXITO

**Antes del refactor:**
- Above the fold útil: ~240px / 667px = **36%**
- Scroll hasta CTA: **3+ pantallas**
- CSS mobile: **Hereda desktop + override**

**Después del refactor (objetivo):**
- Above the fold útil: ~400px / 667px = **60%**
- Scroll hasta CTA: **1 pantalla**
- CSS mobile: **Base, sin overhead**

---

## CONCLUSIÓN

El sitio es **funcional pero no mobile-first**. Diseñado para desktop y adaptado a mobile, no optimizado.

**Valor de refactorizar:**
1. **UX:** Usuario mobile ve valor más rápido (CTA en scroll 1 vs scroll 3)
2. **Performance:** -15-20% CSS, mejor LCP en mobile
3. **Mantenibilidad:** Código más limpio, progressive enhancement
4. **Alineación con principios:** Mobile-first es el estándar de la industria

**Esfuerzo estimado:** 6-8 horas para refactor completo.

**ROI:** Alto. 60%+ del tráfico web es mobile. Optimizar para mayoría = más conversiones.

---

**Próximo paso:** ¿Implemento fixes críticos (1-4) o prefieres ver Fase 2 (auditoría repo) primero?
