import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin=process.env.SEO_PREVIEW_ORIGIN || 'http://127.0.0.1:4173';
const production='https://www.caminandootrosendero.cl';
const sitemap=readFileSync('sitemap-recursos.xml','utf8');
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1].replace(production,''));
const browser=await chromium.launch({headless:true});
const reports=[], errors=[], titles=new Set(),descriptions=new Set(),h1s=new Set(),graph=new Map(),targets=new Set();
mkdirSync('screenshots/seo-resources',{recursive:true});
for(const path of urls){
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const page=await context.newPage(); const consoleErrors=[];
  page.on('pageerror',e=>consoleErrors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());});
  const response=await page.goto(origin+path,{waitUntil:'networkidle'});
  const data=await page.evaluate(()=>({
    title:document.title, description:document.querySelector('meta[name="description"]')?.content,
    canonicals:[...document.querySelectorAll('link[rel="canonical"]')].map(e=>e.href),
    robots:document.querySelector('meta[name="robots"]')?.content,
    h1:[...document.querySelectorAll('h1')].map(e=>e.textContent),
    introWords:document.querySelector('.r-intro').textContent.trim().split(/\s+/).length,
    breadcrumbs:document.querySelector('.r-breadcrumb')?.innerText,
    links:[...document.querySelectorAll('a[href]')].map(e=>e.getAttribute('href')),
    ids:[...document.querySelectorAll('[id]')].map(e=>e.id),
    images:[...document.images].map(e=>({src:e.getAttribute('src'),alt:e.getAttribute('alt'),width:e.getAttribute('width'),height:e.getAttribute('height')})),
    scripts:[...document.scripts].map(e=>({type:e.type,src:e.src,text:e.textContent})),
    headings:[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(e=>Number(e.tagName[1])),
    wordCount:document.querySelector('main').innerText.trim().split(/\s+/).length,
    horizontalOverflow:document.documentElement.scrollWidth>innerWidth,
    bytes:new TextEncoder().encode(document.documentElement.outerHTML).length
  }));
  try{
    assert.equal(response.status(),200); assert.equal(data.canonicals.length,1);assert.equal(data.canonicals[0],production+path);
    assert(!data.robots.includes('noindex'));assert.equal(data.h1.length,1);
    assert(!titles.has(data.title),'duplicate title');assert(!descriptions.has(data.description),'duplicate description');assert(!h1s.has(data.h1[0]),'duplicate H1');
    assert(data.description.length>=80&&data.description.length<=170,`description length ${data.description.length}`);
    assert(data.introWords>=40&&data.introWords<=80,`intro words ${data.introWords}`);
    assert(data.breadcrumbs);assert(data.links.includes('/pages/recursos'));assert(!data.horizontalOverflow);
    assert.equal(data.scripts.filter(s=>s.src||s.type!=='application/ld+json').length,0,'runtime JS');
    assert.equal(new Set(data.ids).size,data.ids.length,'duplicate id');
    for(const img of data.images){assert(img.width&&img.height&&img.alt!==null);targets.add(img.src);}
    const schema=JSON.parse(data.scripts[0].text);assert.equal(schema['@context'],'https://schema.org');
    const crumbs=schema['@graph'].find(n=>n['@type']==='BreadcrumbList');assert(crumbs);
    assert.equal(crumbs.itemListElement.at(-1).item,production+path);
    assert.equal(schema['@graph'].find(n=>n['@type']==='Organization').legalName,'Caminando Otro Sendero SpA');
    for(let i=1;i<data.headings.length;i++)assert(data.headings[i]<=data.headings[i-1]+1,'heading level skipped');
    for(const link of data.links){if(link.startsWith('#'))assert(data.ids.includes(link.slice(1)),`missing fragment ${link}`);else if(link.startsWith('/'))targets.add(link);}
    assert.equal(consoleErrors.length,0,consoleErrors.join(';'));
  }catch(e){errors.push(`${path}: ${e.message}`);}
  titles.add(data.title);descriptions.add(data.description);h1s.add(data.h1[0]);graph.set(path,data.links.filter(l=>urls.includes(l)));
  let a11y=[];
  if(process.env.AXE_SCRIPT){await page.addScriptTag({path:process.env.AXE_SCRIPT});a11y=(await page.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}))).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}));if(a11y.length)errors.push(`${path}: axe ${a11y.map(v=>v.id).join(', ')}`);}
  const slug=path.replaceAll('/','_');
  await page.screenshot({path:`screenshots/seo-resources/${slug}-desktop.png`,fullPage:true});
  await page.setViewportSize({width:390,height:844});
  const mobileOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  if(mobileOverflow)errors.push(`${path}: mobile overflow`);
  await page.screenshot({path:`screenshots/seo-resources/${slug}-mobile.png`,fullPage:true});
  await page.setViewportSize({width:320,height:740});
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))errors.push(`${path}: 320px overflow`);
  await context.close();
  reports.push({path,status:response.status(),title:data.title,descriptionLength:data.description.length,introWords:data.introWords,wordCount:data.wordCount,htmlBytes:data.bytes,runtimeScripts:0,consoleErrors,a11y,mobileOverflow});
}
await browser.close();
const visited=new Set();const queue=['/pages/recursos'];
while(queue.length){const path=queue.shift();if(visited.has(path))continue;visited.add(path);queue.push(...(graph.get(path)||[]));}
for(const url of urls)if(!visited.has(url))errors.push(`Orphan: ${url}`);
const linkResults=[];
for(const target of targets){
  const u=new URL(target,origin);const response=await fetch(u);let fragmentValid=true;
  if(u.hash&&response.headers.get('content-type')?.includes('text/html'))fragmentValid=(await response.text()).includes(`id="${u.hash.slice(1)}"`);
  linkResults.push({target,status:response.status,fragmentValid});
  if(!response.ok||!fragmentValid)errors.push(`Link ${target}: ${response.status}, fragment=${fragmentValid}`);
}
writeFileSync('docs/seo/new-pages-qa.json',JSON.stringify({origin,reports,linkResults,reachable:visited.size,errors},null,2));
console.log(JSON.stringify({pages:reports.length,reachable:visited.size,localTargets:targets.size,errors},null,2));
if(errors.length)process.exit(1);
