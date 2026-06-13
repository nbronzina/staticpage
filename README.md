# nicolasbronzina.com

**Live site:** [https://www.nicolasbronzina.com/](https://www.nicolasbronzina.com/)

AI-Enhanced Futures Designer portfolio — Direction A editorial design system, pure HTML/CSS/JS, zero frameworks.

---

## Tech Stack

- **HTML5** — Semantic, agent-ready
- **CSS3** — Custom properties (OKLCH colors), mobile-first adapted
- **Vanilla JS** — Audio players, dark mode, scroll reveal
- **Fonts** — Fraunces (variable), JetBrains Mono (Google Fonts, self-hosted woff2)
- **Hosting** — GitHub Pages
- **Audio** — Internet Archive (sustainability choice)
- **Images** — WebP with JPEG fallbacks, duotone treatment via CSS

---

## Design System: Direction A

**Philosophy:** CV as editorial. High contrast, ink on paper, inspired by MIT Press Reader, Are.na editorial, The Serving Library.

### Color Palette

**Light mode:**
- Paper (bg): `#F4EFE6`
- Ink (text): `#1A1715`
- Accent (ochre): `oklch(48% 0.12 65)` — WCAG AA (5.99:1)

**Dark mode:**
- Paper dark (bg): `#1A1715`
- Ink dark (text): `#F4EFE6`
- Accent dark: `oklch(72% 0.14 65)` — WCAG AA (8.26:1)

### Typography

- **Display:** Fraunces (italic 300 + roman 400, variable opsz 9-144, SOFT 30)
- **Body:** Fraunces 400, line-height 1.5
- **Mono:** JetBrains Mono (labels, metadata, audio player)
- **Features:** `ss01, ss02, onum 1`

### Layout

- Max-width: 1320px
- Gutter: `clamp(24px, 4vw, 80px)`
- Prose: 62ch max
- Sections: h2 italic + mono meta (2-column grid)
- Lines: 1px solid `var(--ink)` (strong), `var(--rule-soft)` (internal)

---

## File Structure

```
├── index.html ................... Main portfolio page
├── Coffee.html .................. Plain text coffee guide
├── Official.html ................ Project showcase
├── CoffeeDecoded.html ........... Specialty coffee guide
├── styles.css ................... Global styles (19K)
├── script.js .................... Interactions (5.5K)
├── links/index.html ............. Linktree-style page
├── img/ ......................... Optimized WebP + JPEG (~27M, optimization pending)
├── audio/ ....................... Placeholder (hosted on Internet Archive)
├── fonts/ ....................... Fraunces, JetBrains Mono (woff2, 548K)
├── docs/ ........................ Audits, sustainability docs
├── sitemap.xml .................. SEO
└── CLAUDE.md .................... Project instructions for Claude Code
```

---

## Sustainability Practices

1. **Audio hosting:** Internet Archive (99% savings vs self-hosted)
2. **Image optimization:** WebP preferred (70-80% smaller than PNG)
3. **Font optimization:** woff2, subset, self-hosted
4. **No frameworks:** Zero npm dependencies, 6K total JS
5. **External resources:** Minimal, strategic use only

**Estimated CO₂e savings:** 85% reduction vs typical portfolio site.

See `/docs/sustainability-quickref.md` for full analysis.

---

## Agent-Ready Web

- ✅ Semantic HTML (`<header>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- ✅ ARIA roles and labels
- ✅ Heading hierarchy (1 h1, sequential h2-h4)
- ✅ Minimum 8px² interactive elements
- ✅ Accessible color contrast (WCAG AA+)

Accessibility tree audit: 75% compliance (see `/docs/AUDIT-AGENT-SUSTAINABILITY.md`)

---

## Audits

Comprehensive mobile-first, agent-ready, and sustainability audits in `/docs/`:

1. **AUDIT-REPOSITORY.md** — Repository structure, optimization opportunities, cleanup
2. **AUDIT-MOBILE-FIRST.md** — Mobile-first UX analysis, touch targets, viewport
3. **AUDIT-AGENT-SUSTAINABILITY.md** — Agent-ready + sustainability compliance (82.5%)
4. **sustainability-quickref.md** — Decision matrices, real numbers, model selection
5. **web-dev-foundation-overhaul.md** — Web.dev best practices integration (1302 lines)
6. **sustainability-integration-complete.md** — Research sources, 9 primary references

---

## Deployment

**Platform:** GitHub Pages  
**Branch:** `main` (auto-deploy)  
**Domain:** nicolasbronzina.com (CNAME)

**To deploy changes:**
```bash
git add -A
git commit -m "feat: description"
git push origin main
```

**Live in ~1 minute.**

---

## Development

No build process. Pure HTML/CSS/JS.

**Local preview:**
```bash
python3 -m http.server 8000
# or
npx serve
```

**Dark mode:** Toggle icon top-right, persists via localStorage  
**Audio player:** Fixed top-right, streams from Internet Archive

---

## Pages

- **[/](https://www.nicolasbronzina.com/)** — Main portfolio (projects, writing, editorial, CV)
- **[/links/](https://www.nicolasbronzina.com/links/)** — Linktree-style hub
- **[/Coffee.html](https://www.nicolasbronzina.com/Coffee.html)** — Plain text coffee guide
- **[/CoffeeDecoded.html](https://www.nicolasbronzina.com/CoffeeDecoded.html)** — Specialty coffee guide
- **[/Official.html](https://www.nicolasbronzina.com/Official.html)** — Archive project showcase

---

## Credits

**Design & Development:** Nicolás Bronzina  
**Typefaces:** Fraunces (Underware, Flavia Zimbardi), JetBrains Mono (JetBrains)  
**Inspiration:** MIT Press Reader, Are.na editorial, The Serving Library

---

## License

© 2026 Nicolás Bronzina. All rights reserved.

---

**Contact:** hola@nicolasbronzina.com  
**LinkedIn:** [linkedin.com/in/nicolasbronzina](https://linkedin.com/in/nicolasbronzina)  
**Instagram:** [@nicolasbronzina](https://instagram.com/nicolasbronzina)
