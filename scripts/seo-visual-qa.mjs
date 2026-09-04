import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const phase = process.argv[2] || 'after';
const inventory = JSON.parse(readFileSync('docs/seo/legacy-page-inventory.json','utf8'));
const manifest = JSON.parse(readFileSync('docs/seo/legacy-freeze-manifest.json','utf8'));
const browser = await chromium.launch({headless:true});
const results=[];
mkdirSync(`screenshots/seo-freeze/${phase}`,{recursive:true});
for (const entry of inventory.filter(p=>p.file!=='pages/blog.html')) {
  const path=entry.file==='index.html'?'/':'/'+entry.file.replace(/\.html$/,'');
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  if(phase==='verified-before') {
    const original=readFileSync(entry.file,'utf8').replace(manifest.allowedInsertion,'');
    const expected=manifest.files.find(f=>f.path===entry.file).sha256;
    if(createHash('sha256').update(original).digest('hex')!==expected)throw new Error('Original bytes do not match baseline: '+entry.file);
    await page.route('http://127.0.0.1:4173'+path,route=>route.fulfill({status:200,contentType:'text/html; charset=utf-8',body:original}));
  }
  const response=await page.goto('http://127.0.0.1:4173'+path,{waitUntil:'networkidle'});
  await page.evaluate(async()=>{ await document.fonts.ready; for(const el of document.querySelectorAll('.reveal')) el.classList.add('visible','is-visible'); document.querySelectorAll('img[loading="lazy"]').forEach(el=>el.loading='eager'); await Promise.all([...document.images].map(img=>img.decode().catch(()=>{}))); });
  await page.waitForTimeout(350);
  const details=await page.evaluate(()=>{
    const copy=document.documentElement.cloneNode(true);
    const link=copy.querySelector('footer a[href="/pages/recursos"]');
    link?.remove();
    const footer=document.querySelector('footer');
    const nav=footer.querySelector('nav'); const b=nav.getBoundingClientRect();
    const added=document.querySelector('footer a[href="/pages/recursos"]')?.getBoundingClientRect();
    return {dom:copy.outerHTML, footerNav:{x:b.x,y:b.y,width:b.width,height:b.height},addedLink:added?{x:added.x,y:added.y,width:added.width,height:added.height}:null,title:document.title,h1:[...document.querySelectorAll('h1')].map(e=>e.textContent),footerLinks:document.querySelectorAll('footer a[href="/pages/recursos"]').length};
  });
  const screenshot=`screenshots/seo-freeze/${phase}/${entry.file.replaceAll('/','_')}.png`;
  await page.screenshot({path:screenshot,fullPage:true,animations:'disabled'});
  results.push({file:entry.file,path,status:response.status(),screenshot,...details});
  await page.close();
}
await browser.close();
writeFileSync(`docs/seo/legacy-visual-${phase}.json`,JSON.stringify(results,null,2));
console.log(`${phase}: ${results.length} legacy screenshots and DOM snapshots`);
