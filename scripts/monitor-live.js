const fs = require('fs');
const https = require('https');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITEMAP = path.join(ROOT, 'sitemap.xml');
const TIMEOUT_MS = Number(process.env.LW_MONITOR_TIMEOUT || 12000);
const MAX_PARALLEL = Number(process.env.LW_MONITOR_PARALLEL || 6);

function readUrls() {
  const xml = fs.readFileSync(SITEMAP, 'utf8');
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map(match => match[1]);
}

function request(url, method = 'HEAD') {
  return new Promise(resolve => {
    const req = https.request(url, { method, timeout: TIMEOUT_MS }, res => {
      res.resume();
      res.on('end', () => resolve({ url, status: res.statusCode, method }));
    });
    req.on('timeout', () => {
      req.destroy(new Error('timeout'));
    });
    req.on('error', error => resolve({ url, status: 0, method, error: error.message }));
    req.end();
  });
}

async function checkUrl(url) {
  const head = await request(url, 'HEAD');
  if (head.status && head.status < 400) return head;
  const get = await request(url, 'GET');
  return get.status ? get : head;
}

async function runPool(urls) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < urls.length) {
      const url = urls[index++];
      results.push(await checkUrl(url));
    }
  }

  await Promise.all(Array.from({ length: Math.min(MAX_PARALLEL, urls.length) }, worker));
  return results.sort((a, b) => urls.indexOf(a.url) - urls.indexOf(b.url));
}

async function main() {
  const urls = readUrls();
  const results = await runPool(urls);
  const failed = results.filter(result => !result.status || result.status >= 400);

  for (const result of results) {
    const label = result.status && result.status < 400 ? 'OK' : 'FAIL';
    const detail = result.error ? ` ${result.error}` : '';
    console.log(`${label} ${result.status || 'ERR'} ${result.url}${detail}`);
  }

  if (failed.length) {
    console.error(`Live monitor failed: ${failed.length}/${results.length} URL(s) unhealthy.`);
    process.exit(1);
  }

  console.log(`Live monitor passed: ${results.length} URL(s) healthy.`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
