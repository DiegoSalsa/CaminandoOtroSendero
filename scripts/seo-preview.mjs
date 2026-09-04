// Read-only static preview of the existing cleanUrls configuration; binds only to loopback.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
const root = process.cwd();
const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.xml':'application/xml', '.txt':'text/plain; charset=utf-8', '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg', '.ico':'image/x-icon', '.svg':'image/svg+xml', '.woff2':'font/woff2' };
createServer((req,res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    let path = decodeURIComponent(url.pathname);
    const redirect = config.redirects.find(r => !r.has && r.source === path);
    if (redirect) { res.writeHead(308, { Location:redirect.destination }).end(); return; }
    if (path !== '/' && (path.endsWith('/') || path.endsWith('.html'))) { res.writeHead(308,{Location:path.replace(/\/$|\.html$/,'')}).end(); return; }
    const file = resolve(root, `.${path === '/' ? '/index.html' : path}`);
    if (!file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    const target = [file + '.html', file].find(f => existsSync(f) && statSync(f).isFile());
    if (!target) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200, {'Content-Type':mime[extname(target)] ?? 'application/octet-stream'});
    res.end(readFileSync(target));
  } catch { res.writeHead(400).end(); }
}).listen(4173, '127.0.0.1', () => console.log('Preview http://127.0.0.1:4173'));
