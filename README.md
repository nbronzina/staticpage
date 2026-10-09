# nicolasbronzina.com

**Live site:** [https://www.nicolasbronzina.com/](https://www.nicolasbronzina.com/)

Portfolio of Nicolás Bronzina, Futures Designer. Pure HTML/CSS/JS, no frameworks, no build step, hosted on GitHub Pages.

---

## Stack

- **HTML** — one page (`index.html`), bilingual EN/ES via `lang` attributes
- **CSS** — `styles.css`, custom properties for color, type scale and spacing
- **JS** — `script.js`: theme toggle, language toggle, back-to-top, audio players, CO₂ estimate in the footer
- **Font** — Jost (variable, roman + italic) from Google Fonts
- **Audio** — streamed from Internet Archive
- **Images** — WebP with JPEG fallback via `<picture>`, grayscale through `--img-filter`
- **Service worker** — network-first for pages/CSS/JS, cache-first for images

## Design system: Direction B

Pure black and white, single typeface, hierarchy carried by size, weight and rules.

| Token | Light | Dark (`body.dark-mode`) |
|---|---|---|
| `--paper` | `#FFFFFF` | `#0A0A0A` |
| `--ink` | `#000000` | `#FFFFFF` |
| `--ink-mute` | `#666666` | `#999999` |
| `--rule` | `#E0E0E0` | `#2A2A2A` |
| `--accent` | `#000000` | `#FFFFFF` |

## Files

```
├── index.html ........... Main page: intro, projects, writing, editorial, field notes, CV
├── styles.css
├── script.js
├── service-worker.js .... Bump CACHE_NAME when the precache list changes
├── cv-en.pdf, cv-es.pdf . Downloadable CV
├── links/index.html ..... Link-in-bio page
├── Coffee.html .......... Plain-text specialty coffee guide for Madrid
├── CoffeeDecoded.html ... Home coffee equipment guide
├── Official.html ........ OFFicial project scenario
├── img/ ................. Images (WebP + fallbacks)
├── fonts/ ............... Self-hosted fonts used by the subpages
├── manifest.json, sitemap.xml, robots.txt, carbon.txt, CNAME
└── CLAUDE.md ............ Project instructions for Claude Code
```

## Local preview

```bash
python3 -m http.server 8000
```

## Deploy

GitHub Pages, push to `main` deploys automatically.

---

© 2026 Nicolás Bronzina. All rights reserved.
