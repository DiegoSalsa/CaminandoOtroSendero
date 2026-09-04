import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const phase = process.argv[2] || 'after';
const inventory = JSON.parse(readFileSync('docs/seo/legacy-page-inventory.json','utf8'));
const browser = await chromium.launch({headless:true});
const results=[];
mkdirSync(`screenshots/seo-freeze/${phase}`,{recursive:true});
for (const entry of inventory.filter(p=>p.file!=='pages/blog.html')) {
  const path=entry.file==='index.html'?'/':'/'+entry.file.replace(/\.html$/,'');
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const response=await page.goto('http://127.0.0.1:4173'+path,{waitUntil:'networkidle'});
  await page.evaluate(async()=>{ await document.fonts.ready; for(const el of document.querySelectorAll('.reveal')) el.classList.add('visible','is-visible'); document.querySelectorAll('img[loading="lazy"]').forEach(el=>el.loading='eager'); });
  await page.waitForTimeout(350);
  const details=await page.evaluate(()=>{
    const copy=document.documentElement.cloneNode(true);
    const link=copy.querySelector('footer a[href="/pages/recursos"]');
    link?.remove();
    const footer=document.querySelector('footer');
    const nav=footer.querySelector('nav'); const b=nav.getBoundingClientRect();
    return {dom:copy.outerHTML, footerNav:{x:b.x,y:b.y,width:b.width,height:b.height},title:document.title,h1:[...document.querySelectorAll('h1')].map(e=>e.textContent),footerLinks:document.querySelectorAll('footer a[href="/pages/recursos"]').length};
  });
  const screenshot=`screenshots/seo-freeze/${phase}/${entry.file.replaceAll('/','_')}.png`;
  await page.screenshot({path:screenshot,fullPage:true,animations:'disabled'});
  results.push({file:entry.file,path,status:response.status(),screenshot,...details});
  await page.close();
}
await browser.close();
writeFileSync(`docs/seo/legacy-visual-${phase}.json`,JSON.stringify(results,null,2));
console.log(`${phase}: ${results.length} legacy screenshots and DOM snapshots`);
