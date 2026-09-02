import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";

const root = process.cwd();
const canonicalOrigin = "https://www.caminandootrosendero.cl";
const errors = [];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && (entry.name === "node_modules" || entry.name.startsWith("."))) return [];
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function oneMatch(html, expression, label, file, required = true) {
  const matches = [...html.matchAll(expression)];
  if (required && matches.length !== 1) {
    errors.push(`${file}: expected one ${label}, found ${matches.length}`);
  }
  return matches[0]?.[1]?.trim();
}

function localTargetExists(sourceFile, rawTarget) {
  const target = rawTarget.split(/[?#]/, 1)[0];
  if (!target || target.startsWith("#") || target.startsWith("//")) return true;
  if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(target)) return true;

  const decoded = decodeURIComponent(target);
  const absolute = decoded.startsWith("/")
    ? resolve(root, `.${decoded}`)
    : resolve(dirname(sourceFile), decoded);

  return [absolute, `${absolute}.html`, join(absolute, "index.html")].some(existsSync);
}

const htmlFiles = walk(root).filter((file) => extname(file) === ".html");
const titles = new Map();
const canonicals = new Map();

for (const absoluteFile of htmlFiles) {
  const file = relative(root, absoluteFile).split(sep).join("/");
  const html = readFileSync(absoluteFile, "utf8");
  const robots = oneMatch(html, /<meta\s+name=["']robots["']\s+content=["']([^"']+)["'][^>]*>/gi, "robots meta", file, false) ?? "index,follow";
  const indexable = !/\bnoindex\b/i.test(robots);
  const title = oneMatch(html, /<title>([^<]+)<\/title>/gi, "title", file);
  const description = oneMatch(html, /<meta\s+name=["']description["']\s+content=["']([^"']+)["'][^>]*>/gi, "meta description", file, indexable);
  const canonical = oneMatch(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["'][^>]*>/gi, "canonical", file);
  const h1Count = [...html.matchAll(/<h1\b/gi)].length;

  if (indexable && h1Count !== 1) errors.push(`${file}: expected one H1, found ${h1Count}`);
  if (description && (description.length < 80 || description.length > 170)) {
    errors.push(`${file}: meta description length is ${description.length}; expected 80-170`);
  }
  if (canonical && !canonical.startsWith(`${canonicalOrigin}/`)) {
    errors.push(`${file}: canonical is outside ${canonicalOrigin}`);
  }

  if (indexable && title) {
    if (titles.has(title)) errors.push(`${file}: duplicate title also used by ${titles.get(title)}`);
    titles.set(title, file);
  }
  if (indexable && canonical) {
    if (canonicals.has(canonical)) errors.push(`${file}: duplicate canonical also used by ${canonicals.get(canonical)}`);
    canonicals.set(canonical, file);

    const ogUrl = oneMatch(html, /<meta\s+property=["']og:url["']\s+content=["']([^"']+)["'][^>]*>/gi, "og:url", file);
    if (ogUrl && ogUrl !== canonical) errors.push(`${file}: og:url does not match canonical`);
  }

  for (const match of html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      errors.push(`${file}: invalid JSON-LD (${error.message})`);
    }
  }

  for (const match of html.matchAll(/<(?:a|link|script|img|source)\b[^>]*?\s(?:href|src)=["']([^"']+)["'][^>]*>/gi)) {
    if (!localTargetExists(absoluteFile, match[1])) errors.push(`${file}: missing local target ${match[1]}`);
  }

  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/\balt=["'][^"']*["']/i.test(match[1])) errors.push(`${file}: image without alt attribute`);
  }
}

const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim()));
const canonicalUrls = new Set(canonicals.keys());

for (const url of canonicalUrls) if (!sitemapUrls.has(url)) errors.push(`sitemap.xml: missing ${url}`);
for (const url of sitemapUrls) if (!canonicalUrls.has(url)) errors.push(`sitemap.xml: URL has no indexable canonical (${url})`);

const robots = readFileSync(join(root, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`)) errors.push("robots.txt: canonical sitemap URL is missing");

if (errors.length) {
  console.error(`SEO audit failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`SEO audit passed: ${canonicalUrls.size} indexable pages, ${htmlFiles.length} HTML files, valid metadata, JSON-LD, sitemap and local targets.`);
