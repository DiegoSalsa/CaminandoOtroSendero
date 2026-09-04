// Negative tests use isolated fixtures, never edit actual legacy files.
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
const root=mkdtempSync(join(tmpdir(),'cos-freeze-fixture-'));
mkdirSync(join(root,'scripts'));mkdirSync(join(root,'docs/seo'),{recursive:true});
writeFileSync(join(root,'scripts/check-legacy-freeze.mjs'),readFileSync('scripts/check-legacy-freeze.mjs'));
const insertion=JSON.parse(readFileSync('docs/seo/legacy-freeze-manifest.json','utf8')).allowedInsertion;
const original='<title>Frozen</title><main>Content</main><footer><nav aria-label="Navegación del pie"><a href="/">Inicio</a></nav></footer>';
const manifest={allowedInsertion:insertion,files:[{path:'index.html',sha256:createHash('sha256').update(original).digest('hex'),footerInsertion:true}]};
writeFileSync(join(root,'docs/seo/legacy-freeze-manifest.json'),JSON.stringify(manifest));
const cases=[['original',original,0],['allowed',original.replace('</nav>',insertion+'</nav>'),0],['changed title',original.replace('Frozen','Modified'),1],['link outside footer',original+insertion,1],['duplicate link',original.replace('</nav>',insertion+insertion+'</nav>'),1],['new link and hidden change',original.replace('Content','New content').replace('</nav>',insertion+'</nav>'),1]];
for(const [name,html,status] of cases){writeFileSync(join(root,'index.html'),html);const r=spawnSync(process.execPath,[join(root,'scripts/check-legacy-freeze.mjs')],{encoding:'utf8',windowsHide:true});assert.equal(r.status,status,name);}
writeFileSync(join(root,'index.html'),original);
assert.equal(spawnSync(process.execPath,[join(root,'scripts/check-legacy-freeze.mjs'),'--require-link'],{windowsHide:true}).status,1);
console.log('PASS: 7 freeze guard cases, including forbidden edits and missing insertion.');
