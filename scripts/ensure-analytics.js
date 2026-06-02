const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ANALYTICS_FILE = path.join(ROOT, 'shared', 'analytics.js');
const SKIP_DIRS = new Set(['.git', 'node_modules', 'public', 'mockups']);
const SKIP_FILES = new Set(['index-v1-backup.html']);

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith('.html') && !SKIP_FILES.has(entry.name)) out.push(full);
  }
  return out;
}

function analyticsSrc(file) {
  return path.relative(path.dirname(file), ANALYTICS_FILE).replace(/\\/g, '/').replace(/^\.\//, '');
}

function stripOldGa(html) {
  return html.replace(
    /\s*<!-- Google Analytics 4[^>]*-->\s*<script\s+async\s+src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-YY4T3B3MHR"><\/script>\s*<script>[\s\S]*?gtag\('config',\s*'G-YY4T3B3MHR'[\s\S]*?<\/script>\s*/i,
    '\n'
  );
}

function injectAnalytics(html, src) {
  if (html.includes('shared/analytics.js')) return html;
  const tag = `  <script src="${src}" defer></script>\n`;
  if (/<link\b[^>]*rel=["']stylesheet["'][^>]*>/i.test(html)) {
    return html.replace(/(\s*<link\b[^>]*rel=["']stylesheet["'][^>]*>)/i, `\n${tag}$1`);
  }
  return html.replace(/<\/head>/i, `${tag}</head>`);
}

let changed = 0;

for (const file of walk(ROOT)) {
  const before = fs.readFileSync(file, 'utf8');
  const after = injectAnalytics(stripOldGa(before), analyticsSrc(file));
  if (after !== before) {
    fs.writeFileSync(file, after, 'utf8');
    changed += 1;
  }
}

console.log(`Ensured analytics on ${changed} HTML file(s).`);
