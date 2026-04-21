# nicolasbronzina.com — CLAUDE.md

## Stack
HTML/CSS/JS puro. Sin frameworks. GitHub Pages.
Fuente de verdad: `styles.css` y `script.js`.
NO editar archivos `.min.*` si existen.

## Sistema visual (Direction A — CV as editorial)
Editorial, alto contraste, inspirado en MIT Press Reader / Are.na editorial / The Serving Library. Ink on paper + ochre accent.

## Colores
- Paper (light bg): `#F4EFE6`
- Paper-2: `#ECE5D7`
- Paper-deep: `#E4DBC8`
- Ink (light text): `#1A1715`
- Ink-2: `#2B2825`
- Ink-mute: `#6F6A62`
- Rule: `#C9BFA9` · Rule-soft: `#D9D0BC`
- Accent (ochre): `oklch(62% 0.11 65)`

Dark mode (body.dark-mode):
- Paper dark bg: `#1A1715`
- Ink dark text: `#F4EFE6`
- Rule dark: `#3A3532`
- Accent dark (brighter ochre): `oklch(72% 0.14 65)`

## Tipografía
- Display (h1, h2, h3, h4): Fraunces (variable, italic/roman, opsz 9..144, SOFT 30) — Google Fonts
- Body: Fraunces 400, line-height 1.5
- Monospace (labels, metadata, section tags §, prices, idx): JetBrains Mono
- Font features: `ss01, ss02, onum 1`

Stylistic rules:
- h1 display uses italic + light weight; last name in roman
- Section heads: italic h2 with `§` + Roman numeral in mono + accent color
- Body copy max-width: 62ch (prose), 58ch (CV desc), 56ch (project desc)

## Sistema de sección
- Cada section usa `.dirA-section` con `.dirA-section-head` (3 columnas: § I mono | h2 italic | mono meta)
- Section head border-bottom `1px solid var(--ink)` (línea fuerte)
- Rows internas separadas con `1px solid var(--rule-soft)` (línea suave)
- Section order: I. Projects → II. Writing → III. Editorial → IV. Also → V. Curriculum

## Imágenes
- No rounded corners, ever
- Duotone treatment via CSS variables:
  - Light: `filter: grayscale(100%) contrast(1.05) sepia(0.25); mix-blend-mode: multiply`
  - Dark: `filter: grayscale(100%) contrast(0.95) brightness(0.85); mix-blend-mode: normal`
- Controlled by `--img-filter` + `--img-blend`

## Links
- Animated underline via background-image linear-gradient (0% → 100% 1px on hover)
- External links (`.ext`, `.mono a`): underlined with 0.5px thickness + 3px offset
- Accent color reserved for: section `§`, project numbers, meta links, CV org links on hover

## Espaciado
- `--max: 1320px`, `--gutter: clamp(24px, 4vw, 80px)`
- Section head padding: `80px 0 40px`
- Intro: `96px 0` with 80px gap
- CV blocks: `gap: 72px`, rows `padding: 22px 0`

## Motion
- Scroll reveal: IntersectionObserver aplicado a `.dirA-section, .dirA-intro`
- Underline transitions on links (0.28s ease)
- Siempre respetar `prefers-reduced-motion` (forzado a 0.01ms)

## Dark mode
Toggle fijo top-right. Clase `body.dark-mode` override todos los tokens CSS.
Todos los elementos nuevos heredan de variables CSS — si un color no está tokenizado, no se adaptará.

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
- H1 en inglés — no cambiar
- Bumpar cache version antes de cada push si hay service worker
