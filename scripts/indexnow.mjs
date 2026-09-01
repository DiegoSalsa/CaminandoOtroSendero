import { readFileSync } from "node:fs";

const host = "www.caminandootrosendero.cl";
const key = "2b21c282b02a490a9c3bbce2d260ceda";
const keyLocation = `https://${host}/${key}.txt`;
const sitemap = readFileSync(new URL("../sitemap.xml", import.meta.url), "utf8");
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList })
});

if (!response.ok && response.status !== 202) {
  const detail = await response.text();
  throw new Error(`IndexNow rejected the request (${response.status}): ${detail}`);
}

console.log(`IndexNow accepted ${urlList.length} URLs with HTTP ${response.status}.`);
