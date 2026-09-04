import {createRequire} from 'node:module';
import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const manifest=JSON.parse(readFileSync('docs/seo/legacy-freeze-manifest.json','utf8'));
const browser=await chromium.launch({headless:true});const results=[];
for(const entry of manifest.files.filter(f=>f.footerInsertion)){
  const path=entry.path==='index.html'?'/':'/'+entry.path.replace(/\.html$/,'');
  for(const width of [320,390,768]){
    const page=await browser.newPage({viewport:{width,height:844},reducedMotion:'reduce'});
    await page.goto('http://127.0.0.1:4173'+path,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
    const result=await page.evaluate(()=>{
      const a=document.querySelector('footer a[href="/pages/recursos"]');const r=a.getBoundingClientRect();
      const overlaps=[...document.querySelectorAll('footer a,footer p,footer img')].filter(e=>e!==a&&!e.contains(a)).filter(e=>{const b=e.getBoundingClientRect();return r.left<b.right&&r.right>b.left&&r.top<b.bottom&&r.bottom>b.top;}).map(e=>e.textContent||e.tagName);
      return {left:r.left,right:r.right,width:r.width,viewport:innerWidth,overlaps,visible:getComputedStyle(a).visibility==='visible'};
    });
    assert(result.left>=0&&result.right<=width&&result.visible&&result.overlaps.length===0,JSON.stringify({path,width,result}));
    results.push({path,width,...result});await page.close();
  }
}
await browser.close();writeFileSync('docs/seo/footer-responsive-qa.json',JSON.stringify(results,null,2));console.log(`PASS: ${results.length} legacy footer viewport checks; visible link, no overlap.`);
