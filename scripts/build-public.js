const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'public');

const FILES = [
  'index.html',
  'about.html',
  'style.css',
  'home.css',
  'logo.png',
  'laowaitown-logo-nav.webp',
  'robots.txt',
  'sitemap.xml'
];

const DIRS = [
  'legal',
  'life',
  'shared',
  'visa'
];

const PRESERVED_PUBLIC_DIRS = [
  'brand'
];

function copyFile(rel) {
  const source = path.join(ROOT, rel);
  const target = path.join(OUT, rel);
  if (!fs.existsSync(source)) {
    throw new Error(`Missing publish file: ${rel}`);
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function copyDir(rel) {
  const source = path.join(ROOT, rel);
  const target = path.join(OUT, rel);
  if (!fs.existsSync(source)) {
    throw new Error(`Missing publish directory: ${rel}`);
  }
  syncDir(source, target);
}

function assertNotPublished(rel) {
  const target = path.join(OUT, rel);
  if (fs.existsSync(target)) {
    throw new Error(`Unexpected file or directory in public output: ${rel}`);
  }
}

function removePath(target) {
  fs.rmSync(target, {
      recursive: true,
      force: true,
      maxRetries: 3,
      retryDelay: 100
  });
}

function syncDir(source, target) {
  fs.mkdirSync(target, { recursive: true });

  const sourceEntries = new Set(fs.readdirSync(source));
  for (const entry of fs.readdirSync(target)) {
    if (!sourceEntries.has(entry)) {
      removePath(path.join(target, entry));
    }
  }

  for (const entry of sourceEntries) {
    const sourcePath = path.join(source, entry);
    const targetPath = path.join(target, entry);
    const stat = fs.statSync(sourcePath);
    if (stat.isDirectory()) {
      syncDir(sourcePath, targetPath);
    } else {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function main() {
  fs.mkdirSync(OUT, { recursive: true });

  for (const file of FILES) copyFile(file);
  for (const dir of DIRS) copyDir(dir);

  const allowedTopLevel = new Set([...FILES, ...DIRS, ...PRESERVED_PUBLIC_DIRS]);
  for (const entry of fs.readdirSync(OUT)) {
    if (!allowedTopLevel.has(entry)) {
      removePath(path.join(OUT, entry));
    }
  }

  for (const rel of ['docs', 'mockups', 'scripts', 'src', 'node_modules', 'index-v1-backup.html']) {
    assertNotPublished(rel);
  }

  console.log(`Built public output at ${path.relative(ROOT, OUT).replace(/\\/g, '/')}`);
}

main();
