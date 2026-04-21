# nicolasbronzina.com — CLAUDE.md

## Stack
HTML/CSS/JS puro. Sin frameworks. GitHub Pages.
Fuente de verdad: `styles.css` y `script.js`.
NO editar archivos `.min.*` si existen.

## Sistema visual (Direction A — CV as editorial)
Editorial, alto contraste, inspirado en MIT Press Reader / Are.na editorial / The Serving Library. Ink on paper + ochre accent.

## Colores
- Paper (light bg): `#F4EFE6`
- Ink (light text): `#1A1715`
- Ink-2: `#2B2825`
- Ink-mute: `#6F6A62`
- Rule: `#C9BFA9` · Rule-soft: `#D9D0BC`
- Accent (ochre): `oklch(48% 0.12 65)` — WCAG AA sobre paper (5.99:1)

Dark mode (body.dark-mode):
- Paper dark bg: `#1A1715`
- Ink dark text: `#F4EFE6`
- Rule dark: `#3A3532`
- Accent dark (brighter ochre): `oklch(72% 0.14 65)` — AA sobre ink (8.26:1)

## Tipografía
- Display (h1, h2, h3, h4): Fraunces (variable, italic/roman, opsz 9..144, SOFT 30) — Google Fonts
- Body: Fraunces 400, line-height 1.5
- Monospace (labels, metadata, prices, mono inline): JetBrains Mono
- Font features: `ss01, ss02, onum 1`

Stylistic rules:
- h1 display: primer nombre italic weight 300; apellido roman weight 400
- Section heads: h2 italic weight 300 + section-meta mono a la derecha
- Body copy max-width: 62ch (prose), 58ch (CV desc), 56ch (project desc)

## Sistema de sección
- Cada section usa `.dirA-section` con `.dirA-section-head` (2 columnas: h2 italic | mono meta)
- Section head border-bottom `1px solid var(--ink)` (línea fuerte)
- Rows internas separadas con `1px solid var(--rule-soft)` (línea suave)
- Retracción derecha uniforme: `margin-right: clamp(48px, 8vw, 120px)` en `.dirA-top`, `.dirA-intro`, `.dirA-section`, `.dirA-foot` — las líneas internas heredan el ancho reducido
- Section order: Projects → Writing → Editorial → Also → Curriculum

## Imágenes
- No rounded corners, ever
- Duotone treatment via CSS variables:
  - Light: `filter: grayscale(100%) contrast(1.05) sepia(0.25); mix-blend-mode: multiply`
  - Dark: `filter: grayscale(100%) contrast(0.95) brightness(0.85); mix-blend-mode: normal`
- Controlado por `--img-filter` + `--img-blend`
- Opt-out: `.plain` sobre el contenedor o `<img>` (ej: MARGIN.SIGNALS porque su fondo cream se funde con paper bajo `mix-blend-mode: multiply`)

## Links
- Animated underline via background-image linear-gradient (0% → 100% 1px on hover)
- External links (`.ext`, `.mono a`): underlined con 0.5px thickness + 3px offset
- Accent color reservado para: section-meta, project meta CTAs, CV block heads, release labels, hover de h3/h4

## Espaciado
- `--max: 1320px`, `--gutter: clamp(24px, 4vw, 80px)`
- Section head padding: `80px 0 40px`
- Intro: `96px 0` con 80px gap
- CV blocks: `gap: 72px`, rows `padding: 22px 0`

## Motion
- Scroll reveal: IntersectionObserver aplicado a `.dirA-section, .dirA-intro`
- Underline transitions on links (0.28s ease)
- Siempre respetar `prefers-reduced-motion` (forzado a 0.01ms)

## Dark mode
Toggle fijo top-right con fondo `var(--paper)` opaco. Clase `body.dark-mode` override todos los tokens CSS.
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
- Sin numeración decorativa (§ I–V, 01/02…) — la tipografía italic grande + las líneas sostienen la jerarquía
- H1 en inglés — no cambiar
- Bumpar cache version antes de cada push si hay service worker
