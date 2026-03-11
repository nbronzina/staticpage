# nicolasbronzina.com — CLAUDE.md

## Stack
HTML/CSS/JS puro. Sin frameworks. GitHub Pages.
Fuente de verdad: `styles.css` y `script.js`.
NO editar archivos `.min.*` si existen.

## Colores
- Fondo light: `#EBE1D1`
- Fondo dark: `#0d0d0d`
- Texto light: variable (heredado)
- Texto dark: `#EBE1D1`
- Accent light: `#1B3A6B`
- Accent dark: `#7BA3D4`

## Tipografía
- Display (h1, h2): Instrument Serif — Google Fonts
- Body: system fonts
- Monospace (labels, metadata): IBM Plex Mono → fallback system monospace
- h1: italic, font-weight 200
- h2 secciones: a definir por sprint (ver último commit)

## Sistema visual
- Separadores: border-top 1px solid opacity 0.15 en cada section
- Section labels: .section-label — monospace, 0.75rem, accent color, uppercase
- Números de fondo: section[data-index]::before — opacity 0.03
- Línea bajo h1: h1::after — 3rem wide, 2px, opacity 0.6
- Project cards: border-top solamente

## Espaciado
- Section padding: 5rem mobile / 7rem desktop
- Body copy max-width: 62ch
- line-height body: 1.75
- line-height headings: 1.05

## Motion
- Scroll reveal: IntersectionObserver en todas las sections
- Stagger: Work links con 40ms delay entre items
- h1: animación de load 0.7s
- Siempre respetar prefers-reduced-motion

## Dark mode
Toggle en header. Clase `body.dark-mode`.
Todos los elementos nuevos necesitan override en dark mode.

## Deploy
GitHub Pages. Push a main = deploy automático.
Rama activa: claude/analyze-lowtech-design-01B8DoTK287KRYrNksYcwuGj

## Reglas
- Sin gradientes decorativos
- Sin opacity: 0 en contenido crítico above the fold
- H1 en inglés — no cambiar
- Bumpar cache version antes de cada push si hay service worker
