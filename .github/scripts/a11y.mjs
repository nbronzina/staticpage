// Accessibility check (WCAG 2.2 AA + best practices) with axe-core.
// Runs on the pages that follow the site's own system, at desktop and phone width.
// Usage: node .github/scripts/a11y.mjs http://localhost:8080
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const base = process.argv[2] || 'http://localhost:8080';
const pages = ['/', '/links/'];
const viewports = [{ width: 1440, height: 900 }, { width: 390, height: 844 }];
const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

const browser = await chromium.launch();
let problems = 0;
for (const path of pages) {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    await page.goto(base + path, { waitUntil: 'load' });
    await page.addScriptTag({ content: axeSource });
    const { violations } = await page.evaluate(t => axe.run(document, { runOnly: { type: 'tag', values: t } }), tags);
    for (const v of violations) {
      problems++;
      const where = v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' | ');
      console.log(`${path} at ${viewport.width}px: ${v.id} (${v.impact}): ${v.help} -> ${where}`);
    }
    await page.close();
  }
}
await browser.close();

if (problems) {
  console.log(`${problems} accessibility problem(s) found.`);
  process.exit(1);
}
console.log(`Accessibility: no problems on ${pages.join(', ')}.`);
