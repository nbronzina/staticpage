# nicolasbronzina.com — CLAUDE.md

## Stack
HTML clásico. Sin frameworks, sin JavaScript, sin fuentes web, sin service worker. GitHub Pages.
Fuente de verdad: `index.html` (el CSS va inline, en el `<style>` del head).
NO editar archivos `.min.*` si existen.

## Sistema visual (Classic HTML, desde octubre 2026)
Estilos por defecto del navegador: la tipografía serif del sistema (Times), links azules subrayados, `<hr>` entre secciones. Solo modo claro. Lo único moderno es invisible: viewport, ancho de columna y la disposición en pantallas anchas.
Referencias del benchmark: Knuth (HTML por defecto pero ordenado), Norvig (una línea por ítem), Bret Victor (trabajo agrupado por temas, bio al final), Dexter Sinister (metadatos fecha / tipo / título), Tufte (footer).

## CSS
- Todo inline en el head, pocas líneas. No agregar hojas de estilo externas.
- Solo modo claro (`color-scheme: light`). No hay modo oscuro ni toggle, tampoco en las subpáginas.
- Columna: `max-width: 35em` en `header`, `main` y `footer > div`.
- Pantallas anchas (≥ 62em): `.page` es una grilla; el `header` (nombre, lede, contacto, índice) queda fijo en una columna izquierda de 14em y `main` al lado. El footer se alinea con `main`. En celular y tablet, una sola columna.
- El tamaño de letra crece levemente en pantallas grandes: `clamp(100%, 0.25vw + 0.75rem, 112.5%)` (16 a 18 px).
- Footer: bloque invertido `#222`. Al imprimir, sin fondo y en negro.
- `h4` (título de proyecto) y su línea de metadatos van pegados (`h4 + p { margin-top: 0 }`).
- Link "Skip to content" oculto hasta recibir foco de teclado.
- `text-wrap: pretty` en párrafos y listas.
- No fijar `font-family` en el body: se usa la del navegador.

## Estructura de la portada
Header (nombre, rol, lede, email / CV, índice) → Now → Work → Editorial → Field notes → About → Curriculum → footer.
- **Now:** dos o tres entradas en presente, con fecha cuando se conoce, y el "Let's talk".
- **Work:** proyectos y escritos agrupados por tema (`h3`). Cada proyecto:
  `h4` con link · línea de metadatos (`[año] / tipo / con quién`) · imagen opcional · una línea de descripción · `Also:` con formatos extra (video, audio, landing).
- **Writing:** `<li>` con título linkeado y, si tiene subtítulo, `<br>- subtítulo` en minúscula.
- **About:** la bio larga, después del trabajo.
- **Curriculum:** una línea por puesto; el detalle va en `cv-en.pdf` y `cv-es.pdf`.
- **Footer:** nombre, email, base, idiomas de trabajo, secciones y perfiles en dos columnas (texto, sin íconos), foto de cierre con pie y crédito, colofón con peso de la página y fecha de actualización.
- Cada sección termina con `[top]`.
- Experiencia con años (de LinkedIn, octubre 2026), formato `2024&ndash;present / Org, Rol`. Docencia, estudios y proyectos van sin años (decisión). Créditos cargados en San Telmo, Adaptive Museums, Desert Athleisure y Red de Aguante (formato `Tipo, with … at <org>`; organizaciones con link, personas sin link). Estación Fresca, Rescoldo, Cuidados en Red y OFFicial van solo con el tipo hasta que Nicolás diga otra cosa; no inventar créditos.
- Solo Mercado San Telmo (el proyecto insignia) y Desert Athleisure llevan imagen. Es una decisión, no un pendiente.
- Sin páginas de caso de estudio: cada proyecto queda en su línea de la portada y linkea a su propio sitio. Decisión de Nicolás (octubre 2026); no volver a proponerlo.

## Idioma
Sitio en inglés. El CV en español está como PDF. Texto en otro idioma dentro de la página va con su `lang` (`<span lang="es">`, `lang="fr"`).

## Imágenes
- Escala de grises, WebP, en `img/90s/`, generadas a partir de los originales
- Tamaño de archivo: 2x el ancho en pantalla (1.5x para fotos con mucho grano, con un desenfoque leve antes de achicar)
- `width`/`height` del `<img>` = tamaño en pantalla, no el del archivo
- `loading="lazy" decoding="async"` en toda imagen que no esté en la primera pantalla
- Subpáginas: WebP directo, sin respaldo PNG/JPG, al doble del tamaño en que se muestran
- Sin dithering: ahorraba poco y volvía ilegibles los textos de las imágenes
- No rounded corners, ever
- Los originales que ya no se usan se borraron; están en el historial de git

## Calidad
- `.github/workflows/checks.yml` corre en cada push a main: `html-validate` (config en `.htmlvalidate.json`) en las cinco páginas, links internos y anclas con `lychee --offline --include-fragments`, y axe-core (WCAG 2.2 AA) en `/` y `/links/`, desktop y celular (`.github/scripts/a11y.mjs`). Si falla, GitHub marca el commit con una X roja y avisa por mail. No bloquea la publicación: Pages publica desde la rama igual.
- `.github/workflows/links-weekly.yml`: los lunes revisa todos los links externos (menos LinkedIn e Instagram, que bloquean bots) y abre un issue si hay rotos.
- Antes de pushear, correr lo mismo localmente.

## Contacto
Un solo mail en todo el sitio: `nicolas.bronzina@gmail.com`.

## Subpáginas
- `links/` (link-in-bio, entra desde Instagram) usa el mismo sistema que la portada: HTML clásico, CSS inline, sin fuentes ni JS, columna de 30em alineada a la izquierda. Cada link con su bajada `- …`. Es una lista corta para decidir rápido, no un resumen del sitio: los 14 links de siempre (sitio, estudios, editorial, field notes, contacto) más Speculative Futures Madrid. No agregar más sin que Nicolás lo pida. Sin links repetidos.
- `Coffee.html`, `CoffeeDecoded.html` y `Official.html` mantienen su propio diseño (identidad de cada proyecto).
- Ninguna registra service worker.

## Service worker
Ya no se usa. `service-worker.js` es un archivo que se desinstala solo (borra cachés, se desregistra y recarga) para quienes tenían una versión anterior. Mantenerlo publicado unos meses. No volver a registrar uno.

## Deploy
GitHub Pages. Push a main = deploy automático.
Se trabaja directo en `main`, sin ramas. Cada push publica, así que validar antes (ver Calidad).

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
