# nicolasbronzina.com — CLAUDE.md

## Stack
HTML/CSS/JS puro. Sin frameworks. GitHub Pages.
Fuente de verdad: `styles.css` y `script.js`.
NO editar archivos `.min.*` si existen.

## Audio Player
Player fijo arriba a la derecha + narración del recorrido en Mercado San Telmo. Mismo markup y mismo JS para los dos.
- Audio alojado en Internet Archive (no se sube audio al repo)
- Markup: contenedor con `data-player`, botones `data-play` / `data-pause` / `data-stop`, spans `data-current` / `data-duration`, un `<audio>`
- Al reproducir uno se pausa cualquier otro
- Adaptado a tokens CSS (--paper, --ink)

## Sistema visual (Direction B — Carbon Neutral Editorial)
Blanco y negro puro, una sola tipografía. La jerarquía la sostienen tamaño, peso y líneas.

## Colores
- Paper (bg): `#FFFFFF`
- Ink (text): `#000000`
- Ink-mute: `#666666`
- Rule: `#E0E0E0`
- Accent: `#000000` (igual a ink)

Dark mode (body.dark-mode):
- Paper: `#0A0A0A`
- Ink: `#FFFFFF`
- Ink-mute: `#999999`
- Rule: `#2A2A2A`
- Accent: `#FFFFFF`

## Tipografía
- Jost (variable, roman + italic, Google Fonts) para todo. `--sans` y `--mono` apuntan a Jost; la clase `.mono` hoy solo achica (text-sm, weight 500)
- h1 700, h2/h3 600, h4 500. Body 400, line-height 1.6
- Escala en `--text-xs` … `--text-4xl`, sube en ≥768px
- Body copy max-width: 65ch (p), 62ch (section intro), 58ch (project/CV desc)

## Sistema de sección
- Cada section usa `.dirA-section` con `.dirA-section-head` (h2 EN + h2 ES)
- Section head border-bottom `2px solid var(--ink)` (línea fuerte)
- Cards y bloques internos con `1px solid var(--rule)` (línea suave)
- Section order: Projects → Writing → Editorial → Field notes → Curriculum

## Bilingüe (EN/ES)
- Cada texto traducido es un par de hermanos consecutivos: primero `lang="en"`, inmediatamente después `lang="es"`
- En modo ES solo se oculta el EN que tiene su ES pegado (`:has(+ [lang="es"])`); el EN sin traducir queda visible en los dos modos
- El `lang` va en el bloque (`<p>`, `<h2>`), no en un `<a>` dentro de párrafos distintos
- No repetir `id` en el par ES

## Imágenes
- No rounded corners, ever
- Tratamiento en escala de grises vía `--img-filter` + `--img-blend`:
  - Light: `grayscale(100%) contrast(1.1)`, blend `normal`
  - Dark: `grayscale(100%) contrast(0.9) brightness(0.9)`
- Opt-out: `.plain` sobre el contenedor o `<img>`
- `width`/`height` del `<img>` = dimensiones reales del archivo

## Links
- Subrayado siempre visible: 1px, offset 3px; hover → `--ink-mute`

## Espaciado
- Escala 8px: `--space-1` (8) · 2 (16) · 3 (24) · 4 (32) · 6 (48) · 8 (64) · 12 (96) · 16 (128). No existen 5, 7, 9, 10, 11
- Secciones: padding `--space-6` mobile, `--space-8 clamp(2rem, 8vw, 8rem)` desktop

## Motion
- Sin scroll reveal: el contenido es visible de entrada
- Transiciones de color/borde 0.2s ease
- Siempre respetar `prefers-reduced-motion` (forzado a 0.01ms)

## Dark mode
Toggle fijo top-right con fondo `var(--paper)` opaco. Clase `body.dark-mode` override todos los tokens CSS.
Todos los elementos nuevos heredan de variables CSS — si un color no está tokenizado, no se adaptará.

## Service worker
Network-first para páginas, CSS y JS (un deploy se ve en la próxima visita). Cache-first para imágenes, fuentes y PDFs. No toca requests de otros orígenes.

## Deploy
GitHub Pages. Push a main = deploy automático.
Rama activa: `claude/analyze-lowtech-design-01B8DoTK287KRYrNksYcwuGj`

## Reglas
- Sin gradientes decorativos
- Sin botones estilo CTA — links son suficientes
- Sin cards con hover lift
- Sin íconos decorativos ni emojis en contenido
- Sin "as featured in" logos, testimonials, métricas ("50+ projects")
- Sin hero video ni auto-play
- Sin numeración decorativa (§ I–V, 01/02…) — la tipografía italic grande + las líneas sostienen la jerarquía
- H1 en inglés — no cambiar
- Bumpar cache version antes de cada push si hay service worker
