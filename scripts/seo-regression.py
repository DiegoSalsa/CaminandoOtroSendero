"""Compare the 22 supplied live URLs and all legacy HTML against the initial evidence.
Requires requests (QA only). No writes to the website or remote services.
"""
import pathlib,json,hashlib,concurrent.futures,requests,re
ROOT=pathlib.Path(__file__).resolve().parent.parent
OUT=ROOT/'docs/seo'
manifest=json.loads((OUT/'legacy-freeze-manifest.json').read_text(encoding='utf8'))
before=json.loads((OUT/'legacy-live-before.json').read_text(encoding='utf8'))
def check(row):
    try:
        r=requests.get(row['url'],allow_redirects=False,timeout=25)
        digest=hashlib.sha256(r.content).hexdigest()
        return dict(url=row['url'],status=r.status_code,statusBefore=row['status'],location=r.headers.get('Location'),locationBefore=row.get('location'),bodyIdentical=digest==row['sha256'],sha256=digest,passed=r.status_code==row['status'] and r.headers.get('Location')==row.get('location') and digest==row['sha256'])
    except Exception as exc:return dict(url=row['url'],error=str(exc),passed=False)
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool: remote=list(pool.map(check,before))
local=[]
for f in manifest['files']:
    if not f['path'].endswith('.html'):continue
    path='/' if f['path']=='index.html' else '/'+f['path'].removesuffix('.html')
    r=requests.get('http://127.0.0.1:4173'+path,allow_redirects=False,timeout=15)
    expected=308 if f['path']=='pages/blog.html' else 200
    original=r.content.replace(manifest['allowedInsertion'].encode(),b'')
    byteEqual=hashlib.sha256(original).hexdigest()==f['sha256'] if expected==200 else r.headers.get('Location')=='/pages/publicaciones'
    local.append(dict(path=path,status=r.status_code,expectedStatus=expected,unchangedExceptFooter=byteEqual,passed=r.status_code==expected and byteEqual))
result={'liveState':'No deployment performed; live body equality confirms the published site was not altered. Local regression verifies the implementation.', 'remote':remote,'local':local}
(OUT/'legacy-regression-results.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
print(f'Remote: {sum(x["passed"] for x in remote)}/22; local: {sum(x["passed"] for x in local)}/17')
if not all(x['passed'] for x in remote+local):raise SystemExit(1)
