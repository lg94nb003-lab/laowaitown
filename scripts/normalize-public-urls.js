const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://laowaitown.com';
const TARGETS = [
  'index.html',
  'about.html',
  'sitemap.xml',
  path.join('shared', 'nav-data.js'),
  'visa',
  'life',
  'legal'
];
const FILE_EXTS = new Set(['.html', '.xml', '.js']);
const SKIP_DIRS = new Set(['.git', 'node_modules', 'public']);

function normalizePublicUrls(text) {
  return text
    .replace(/https:\/\/laowaitown\.com(\/(?:about|visa|life|legal)\/?[^"'<>?#]*)\.html/g, `${SITE}$1`)
    .replace(/(["'=]\s*)(\/(?:about|visa|life|legal)\/?[^"'<>?#]*)\.html/g, '$1$2')
    .replace(/(["'=]\s*)((?:visa|life|legal)\/[^"'<>?#]*)\.html/g, '$1$2');
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(path.join(dir, entry.name), files);
      continue;
    }
    if (FILE_EXTS.has(path.extname(entry.name))) files.push(path.join(dir, entry.name));
  }
  return files;
}

let changed = 0;
const files = new Set();
for (const rel of TARGETS) {
  const target = path.join(ROOT, rel);
  if (!fs.existsSync(target)) continue;
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    for (const file of walk(target)) files.add(file);
  } else if (FILE_EXTS.has(path.extname(target))) {
    files.add(target);
  }
}

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const normalized = normalizePublicUrls(original);
  if (normalized !== original) {
    fs.writeFileSync(file, normalized, 'utf8');
    changed += 1;
  }
}

console.log(`Normalized public URLs in ${changed} file(s).`);
