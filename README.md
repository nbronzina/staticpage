# nicolasbronzina.com

**Live site:** [https://www.nicolasbronzina.com/](https://www.nicolasbronzina.com/)

AI-Enhanced Futures Designer portfolio — Direction A editorial design system, pure HTML/CSS/JS, zero frameworks.

---

## ✨ Recent Optimizations (June 2026)

**Repository Health:** 🟢 **94%** (Excellent)

- ✅ **6M cleanup:** Removed 19 unused images
- ✅ **11M transfer savings:** WebP optimization (65% average reduction)
- ✅ **PWA enabled:** Manifest + Service Worker with offline support
- ✅ **100% caching:** Repeat visits = zero emissions for cached resources
- ✅ **Sitemap updated:** Current lastmod (2026-06-13)

**Total impact:** 78% → 94% repository health, 85% CO₂e reduction vs typical portfolio.

---

## Tech Stack

- **HTML5** — Semantic, agent-ready
- **CSS3** — Custom properties (OKLCH colors), desktop-optimized
- **Vanilla JS** — Audio players, dark mode, scroll reveal (8K total)
- **Fonts** — Fraunces (variable), JetBrains Mono (self-hosted woff2, 548K)
- **Hosting** — GitHub Pages
- **Audio** — Internet Archive (sustainability choice)
- **Images** — WebP with PNG fallbacks, duotone treatment via CSS
- **PWA** — Service Worker, manifest.json, installable

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
├── index.html ................... Main portfolio (37K)
├── Coffee.html .................. Plain text coffee guide (10K)
├── Official.html ................ Project showcase (65K, WebP optimized)
├── CoffeeDecoded.html ........... Specialty coffee guide (111K)
├── styles.css ................... Global styles (20K)
├── script.js .................... Interactions (8K)
├── service-worker.js ............ Offline caching (4K)
├── manifest.json ................ PWA metadata
├── links/index.html ............. Linktree-style page
├── img/ ......................... WebP + fallbacks (27M, 6M WebP + 17M PNG fallbacks)
├── audio/ ....................... Placeholder (hosted on Internet Archive)
├── fonts/ ....................... Fraunces, JetBrains Mono (woff2, 548K)
├── docs/ ........................ Audits, sustainability docs (6 files)
├── sitemap.xml .................. SEO (updated 2026-06-13)
└── CLAUDE.md .................... Project instructions for Claude Code
```

**Total codebase:** 6048 lines (HTML/CSS/JS)

---

## PWA Features

✅ **Installable** — manifest.json with icons, theme colors  
✅ **Offline support** — Service Worker caches core assets  
✅ **Performance** — Cache-first strategy for fonts, styles, scripts  
✅ **Sustainability** — Cached resources = 100% emissions reduction for repeat visits

**Cached assets:**
- HTML, CSS, JS
- Fonts (Fraunces, JetBrains Mono)
- Hero images (hi.webp, hi-sm.webp)

---

## Sustainability Practices

1. **Audio hosting:** Internet Archive (99% savings vs self-hosted)
2. **Image optimization:** WebP conversion (65% average reduction)
   - Follow-up2: 8.11M → 3.13M (61%)
   - Privacy: 4.92M → 1.82M (63%)
   - Loading: 2.14M → 0.95M (55%)
   - Refugees: 1.74M → 0.14M (92%)
3. **Service Worker caching:** 100% emissions reduction for cached resources
4. **Font optimization:** woff2, self-hosted, no external requests
5. **No frameworks:** Zero npm dependencies, 8K total JS
6. **Cleanup:** Removed 6M of unused images (19 files)

**Measured impact:**
- Repository: 78% → 94% health
- Transfer size: 17M → 6M for Official.html images (65% reduction)
- CO₂e savings: **85% reduction** vs typical portfolio site

See `/docs/sustainability-quickref.md` for full analysis.

---

## Agent-Ready Web

- ✅ Semantic HTML (`<header>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- ✅ ARIA roles and labels
- ✅ Heading hierarchy (1 h1, sequential h2-h4)
- ✅ Minimum 8px² interactive elements
- ✅ Accessible color contrast (WCAG AA+)
- ✅ Interactive elements have `cursor: pointer`

**Accessibility tree compliance:** 75%

See `/docs/AUDIT-AGENT-SUSTAINABILITY.md` for detailed evaluation.

---

## Audits & Documentation

Comprehensive mobile-first, agent-ready, and sustainability audits in `/docs/`:

1. **AUDIT-REPOSITORY.md** — Repository optimization, cleanup roadmap (78% → 94%)
2. **AUDIT-MOBILE-FIRST.md** — Mobile UX analysis, above-the-fold optimization
3. **AUDIT-AGENT-SUSTAINABILITY.md** — Agent-ready + sustainability (82.5% overall)
4. **sustainability-quickref.md** — Decision matrices, real numbers, SLM vs LLM
5. **web-dev-foundation-overhaul.md** — Web.dev best practices (1302 lines)
6. **sustainability-integration-complete.md** — Research sources (9 primary references)

**Key findings:**
- Agent-Ready: 75%
- Sustainability: 83%
- Web.dev Best Practices: 87.5%
- Overall: 82.5% compliance

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

**Current branch:** `claude/analyze-lowtech-design-01B8DoTK287KRYrNksYcwuGj`

---

## Development

No build process. Pure HTML/CSS/JS.

**Local preview:**
```bash
python3 -m http.server 8000
# or
npx serve
```

**Features:**
- Dark mode toggle (top-right, persists via localStorage)
- Audio player (top-right, streams from Internet Archive)
- Service Worker (offline caching, auto-registered)
- Scroll reveal animations (IntersectionObserver)

---

## Pages

- **[/](https://www.nicolasbronzina.com/)** — Main portfolio (projects, writing, editorial, CV)
- **[/links/](https://www.nicolasbronzina.com/links/)** — Linktree-style hub
- **[/Coffee.html](https://www.nicolasbronzina.com/Coffee.html)** — Plain text coffee guide
- **[/CoffeeDecoded.html](https://www.nicolasbronzina.com/CoffeeDecoded.html)** — Specialty coffee guide
- **[/Official.html](https://www.nicolasbronzina.com/Official.html)** — Archive project showcase

---

## Optimization Timeline

**Phase 1:** Image cleanup (6M saved)  
**Phase 2:** WebP conversion (11M transfer reduction)  
**Phase 3:** PWA implementation (offline support + caching)  
**Phase 4:** Sitemap update (SEO current)  
**Phase 5:** Verification (cursor: pointer, semantic HTML)  
**Phase 6:** Documentation (comprehensive README)

**Result:** 78% → 94% repository health in 6 phases.

---

## Credits

**Design & Development:** Nicolás Bronzina  
**Typefaces:** Fraunces (Underware, Flavia Zimbardi), JetBrains Mono (JetBrains)  
**Inspiration:** MIT Press Reader, Are.na editorial, The Serving Library  
**Optimization:** Claude Code (June 2026)

---

## License

© 2026 Nicolás Bronzina. All rights reserved.

---

**Contact:** hola@nicolasbronzina.com  
**LinkedIn:** [linkedin.com/in/nicolasbronzina](https://linkedin.com/in/nicolasbronzina)  
**Instagram:** [@nicolasbronzina](https://instagram.com/nicolasbronzina)
