import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(resolve(root, 'docs/seo/legacy-freeze-manifest.json'), 'utf8'));
const hash = value => createHash('sha256').update(value).digest('hex');
const failures = [];
let insertions = 0;
for (const entry of manifest.files) {
  const path = resolve(root, entry.path);
  if (!existsSync(path)) { failures.push(`${entry.path}: missing`); continue; }
  const bytes = readFileSync(path);
  if (hash(bytes) === entry.sha256) continue;
  if (!entry.footerInsertion) { failures.push(`${entry.path}: modified`); continue; }
  const text = bytes.toString('utf8');
  const allowed = manifest.allowedInsertion;
  const footer = text.match(/<footer\b[\s\S]*?<\/footer>/i)?.[0] ?? '';
  const nav = footer.match(/<nav aria-label="Navegación del pie">[\s\S]*?<\/nav>/)?.[0] ?? '';
  if (text.split(allowed).length !== 2 || !nav.endsWith(`${allowed}</nav>`) || hash(Buffer.from(text.replace(allowed, ''), 'utf8')) !== entry.sha256) {
    failures.push(`${entry.path}: differs beyond the exact footer insertion`);
  } else insertions++;
}
if (process.argv.includes('--require-link') && insertions !== manifest.files.filter(f => f.footerInsertion).length) failures.push('Footer insertion missing on one or more pages');
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`PASS legacy freeze: ${manifest.files.length} files; ${insertions} exact footer insertions; no other changes.`);
