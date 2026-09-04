// Lighthouse is a QA-only tool supplied externally; package.json remains frozen.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
if(!process.env.LIGHTHOUSE_CLI)throw new Error('Set LIGHTHOUSE_CLI to lighthouse/cli/index.js');
const urls=[...readFileSync('sitemap-recursos.xml','utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
mkdirSync('.seo-cache/lighthouse-resources',{recursive:true});
const rows=[];
for(const path of urls){
  const output=`.seo-cache/lighthouse-resources/${path.replaceAll('/','_')}.json`;
  const cached=process.argv.includes('--reuse-reports')&&existsSync(output);
  const result=cached?{status:0}:spawnSync(process.execPath,[process.env.LIGHTHOUSE_CLI,'http://127.0.0.1:4173'+path,'--quiet','--chrome-flags=--headless --no-sandbox','--only-categories=performance,accessibility,best-practices,seo','--output=json','--output-path='+output],{encoding:'utf8',timeout:120000,windowsHide:true});
  const cleanupWarning=result.status!==0&&result.stderr?.includes('destroyTmp')&&existsSync(output);
  if(result.status!==0&&!cleanupWarning){rows.push({path,error:result.stderr||result.error?.message});continue;}
  const report=JSON.parse(readFileSync(output,'utf8'));
  if(report.runtimeError){rows.push({path,error:report.runtimeError});continue;}
  const row={path,fetchTime:report.fetchTime,lighthouseVersion:report.lighthouseVersion,formFactor:report.configSettings.formFactor,throttlingMethod:report.configSettings.throttlingMethod,performance:report.categories.performance.score*100,accessibility:report.categories.accessibility.score*100,seo:report.categories.seo.score*100,bestPractices:report.categories['best-practices'].score*100,lcpMs:report.audits['largest-contentful-paint'].numericValue,cls:report.audits['cumulative-layout-shift'].numericValue,tbtMs:report.audits['total-blocking-time'].numericValue,transferBytes:report.audits['total-byte-weight'].numericValue,failedAudits:Object.entries(report.audits).filter(([id,a])=>a.score!==null&&a.score<1&&a.details?.type==='table').map(([id,a])=>({id,title:a.title,score:a.score}))};
  row.report=output;row.runWarnings=report.runWarnings;row.reportReused=cached;
  if(cleanupWarning||cached)row.environmentNote='Complete measurement report; initial CLI runs returned EPERM during Windows temporary-profile cleanup after saving the report. No Lighthouse runtimeError.';
  rows.push(row);console.log(JSON.stringify(row));
  writeFileSync('docs/seo/performance-results.json',JSON.stringify(rows,null,2));
}
writeFileSync('docs/seo/performance-results.json',JSON.stringify(rows,null,2));
if(rows.some(r=>r.error||r.lcpMs>2500||r.cls>=0.1||r.tbtMs>=200))process.exit(1);
