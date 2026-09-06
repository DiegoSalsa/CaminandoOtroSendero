import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.SEO_PREVIEW_ORIGIN || 'http://127.0.0.1:4173';
const production = 'https://www.caminandootrosendero.cl';
const paths = ['/pages/conocimiento', '/pages/conocimiento/faq-artropodos-entomofauna-seia'];
const forbidden = '/pages/conocimiento/metodologia-muestreo-entomofauna-seia';
const outputDir = '.seo-cache/conocimiento-qa';
mkdirSync(outputDir, { recursive: true });

const sitemap = readFileSync('sitemap.xml', 'utf8');
const llms = readFileSync('llms.txt', 'utf8');
for (const path of paths) {
  assert.equal([...sitemap.matchAll(new RegExp(`<loc>${production}${path}</loc>`, 'g'))].length, 1, `sitemap: ${path}`);
  assert(llms.includes(`${production}${path}`), `llms.txt: ${path}`);
}
assert(!sitemap.includes(forbidden) && !llms.includes(forbidden), 'forbidden phase-3 route published');

const htmlFiles = ['index.html'];
const walk = directory => {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (path.endsWith('.html')) htmlFiles.push(path);
  }
};
walk('pages');
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  if (!html.includes('<footer')) continue;
  const footer = html.match(/<footer\b[\s\S]*?<\/footer>/i)?.[0] || '';
  assert.equal((footer.match(/href="\/pages\/conocimiento"/g) || []).length, 1, `${file}: footer entry`);
}

const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
const reports = [];
const localTargets = new Set();
try {
  for (const path of paths) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const response = await page.goto(origin + path, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200, path);
    const data = await page.evaluate(() => {
      const schema = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
      const visibleFaq = [...document.querySelectorAll('.r-faq')].map(item => ({
        question: item.querySelector('h3')?.textContent.trim(),
        answer: item.querySelector('.r-answer')?.textContent.trim()
      }));
      const faqNode = schema['@graph'].find(node => node['@type'] === 'FAQPage');
      const schemaFaq = (faqNode?.mainEntity || []).map(item => ({
        question: item.name,
        answer: item.acceptedAnswer.text
      }));
      return {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content,
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        robots: document.querySelector('meta[name="robots"]')?.content,
        h1s: [...document.querySelectorAll('h1')].map(item => item.textContent.trim()),
        headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(item => Number(item.tagName[1])),
        links: [...document.querySelectorAll('a[href]')].map(item => item.getAttribute('href')),
        ids: [...document.querySelectorAll('[id]')].map(item => item.id),
        wordCount: document.querySelector('main').innerText.trim().split(/\s+/).length,
        schemaTypes: schema['@graph'].map(node => node['@type']),
        visibleFaq,
        schemaFaq
      };
    });
    assert(data.description.length >= 120 && data.description.length <= 160, `${path}: description length`);
    assert.equal(data.canonical, production + path, `${path}: canonical`);
    assert(data.robots.includes('index') && data.robots.includes('follow') && !data.robots.includes('noindex'), `${path}: robots`);
    assert.equal(data.h1s.length, 1, `${path}: H1 count`);
    assert.equal(new Set(data.ids).size, data.ids.length, `${path}: duplicate IDs`);
    for (let index = 1; index < data.headings.length; index++) assert(data.headings[index] <= data.headings[index - 1] + 1, `${path}: skipped heading`);
    if (path.includes('/faq-')) {
      assert(data.wordCount >= 800, `${path}: thin FAQ (${data.wordCount} words)`);
      assert.deepEqual(data.visibleFaq, data.schemaFaq, `${path}: visible/schema FAQ mismatch`);
      assert.deepEqual(data.schemaTypes, ['Organization', 'WebPage', 'FAQPage', 'BreadcrumbList']);
    } else {
      assert(data.links.includes(paths[1]), 'hub does not discover FAQ');
      assert.deepEqual(data.schemaTypes, ['Organization', 'CollectionPage', 'BreadcrumbList']);
    }
    for (const link of data.links) {
      if (link.startsWith('#')) assert(data.ids.includes(link.slice(1)), `${path}: missing fragment ${link}`);
      else if (link.startsWith('/')) localTargets.add(link);
    }
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: width > 800 ? 1000 : 844 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${path}: overflow ${width}px`);
      if (width === 1440 || width === 390) {
        const slug = path.replaceAll('/', '_');
        await page.screenshot({ path: `${outputDir}/${slug}-${width}.png`, fullPage: true });
      }
    }
    assert.equal(errors.length, 0, `${path}: ${errors.join('; ')}`);
    reports.push({ path, status: response.status(), title: data.title, descriptionLength: data.description.length, h1: data.h1s[0], wordCount: data.wordCount, schemaTypes: data.schemaTypes, faqItems: data.visibleFaq.length });
    await page.close();
  }

  for (const target of localTargets) {
    const response = await fetch(new URL(target, origin));
    assert(response.ok, `${target}: ${response.status}`);
  }
  const forbiddenResponse = await fetch(origin + forbidden);
  assert.equal(forbiddenResponse.status, 404, 'phase-3 route exists');
} finally {
  await browser.close();
}

writeFileSync(`${outputDir}/report.json`, JSON.stringify({ origin, reports, checkedLocalLinks: [...localTargets], footerFiles: htmlFiles.length }, null, 2));
console.log(JSON.stringify({ pages: reports, checkedLocalLinks: localTargets.size, footerFiles: htmlFiles.length }, null, 2));
