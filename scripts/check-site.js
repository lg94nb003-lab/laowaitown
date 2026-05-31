const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootArgIndex = process.argv.indexOf('--root');
const ROOT = rootArgIndex >= 0 && process.argv[rootArgIndex + 1]
  ? path.resolve(process.cwd(), process.argv[rootArgIndex + 1])
  : path.resolve(__dirname, '..');
const SITE = 'https://laowaitown.com';
const errors = [];

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/');
}

function walk(dir, predicate = () => true) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, predicate));
    else if (predicate(full)) out.push(full);
  }
  return out;
}

function fail(message) {
  errors.push(message);
}

function existsTarget(url, fromFile) {
  if (!url || url.startsWith('#')) return true;
  if (url.includes('${')) return true;
  if (/^(https?:)?\/\//i.test(url)) return true;
  if (/^(mailto|tel|javascript|data):/i.test(url)) return true;

  const clean = url.split('#')[0].split('?')[0];
  if (!clean) return true;

  let target;
  if (clean.startsWith('/')) {
    const trimmed = clean.replace(/^\/+/, '');
    target = trimmed ? path.join(ROOT, trimmed) : path.join(ROOT, 'index.html');
  } else {
    target = path.resolve(path.dirname(fromFile), clean);
  }

  if (clean !== '/' && clean.endsWith('/')) target = path.join(target, 'index.html');
  if (!path.extname(target) && !fs.existsSync(target)) {
    target = path.join(target, 'index.html');
  }
  return fs.existsSync(target);
}

function checkJsSyntax() {
  if (!fs.existsSync(ROOT)) {
    fail(`Site root does not exist: ${ROOT}`);
    return;
  }
  const jsFiles = walk(ROOT, file => file.endsWith('.js'));
  for (const file of jsFiles) {
    try {
      new vm.Script(fs.readFileSync(file, 'utf8'), { filename: rel(file) });
    } catch (error) {
      fail(`JS syntax error in ${rel(file)}: ${error.message}`);
    }
  }

  const htmlFiles = walk(ROOT, file => file.endsWith('.html'));
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const scripts = html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi);
    let index = 0;
    for (const match of scripts) {
      const attrs = match[1] || '';
      if (/src\s*=|application\/ld\+json/i.test(attrs)) continue;
      index += 1;
      try {
        new vm.Script(match[2], { filename: `${rel(file)}#inline-script-${index}` });
      } catch (error) {
        fail(`Inline JS syntax error in ${rel(file)} script ${index}: ${error.message}`);
      }
    }
  }
}

function checkLinks() {
  const htmlFiles = walk(ROOT, file => file.endsWith('.html'));
  const attrPattern = /\b(?:href|src)=["']([^"']+)["']/gi;
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    for (const match of html.matchAll(attrPattern)) {
      const target = match[1];
      if (!existsTarget(target, file)) {
        fail(`Broken internal link in ${rel(file)} -> ${target}`);
      }
    }
  }

  const forbidden = ['/travel/', '/business/', '/education/'];
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    for (const target of forbidden) {
      if (html.includes(`href="${target}"`) || html.includes(`href='${target}'`)) {
        fail(`Future section is publicly linked in ${rel(file)} -> ${target}`);
      }
    }
  }
}

function checkSitemap() {
  const sitemapPath = path.join(ROOT, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    fail('Missing sitemap.xml');
    return;
  }
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map(m => m[1]);
  if (!locs.length) fail('sitemap.xml has no <loc> entries');
  for (const loc of locs) {
    if (!loc.startsWith(SITE)) continue;
    const url = new URL(loc);
    if (!existsTarget(url.pathname + url.hash, path.join(ROOT, 'sitemap.xml'))) {
      fail(`Sitemap target does not exist: ${loc}`);
    }
  }
}

function checkToolEntrypoints() {
  const index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const toolData = fs.readFileSync(path.join(ROOT, 'shared', 'tool-config.js'), 'utf8');
  const requiredHashes = ['calculator', 'stay', 'timezone', 'currency', 'phrasebook', 'phrases'];
  for (const hash of requiredHashes) {
    if (!index.includes(`${hash}:`) && !index.includes(`${hash}'`) && !index.includes(`${hash}"`)) {
      fail(`Missing homepage tool hash alias: #${hash}`);
    }
  }
  for (const tool of ['stay', 'currency', 'timezone', 'phrases', 'weather', 'emergency', 'sim', 'vpn', 'translate', 'maps']) {
    if (!toolData.includes(`id: '${tool}'`) && !toolData.includes(`id: "${tool}"`)) {
      fail(`Missing tool data entry: ${tool}`);
    }
  }
  for (const fn of ['calculateStay', 'convertCurrency', 'convertTimezone', 'renderPhrasesTool', 'openPhraseFullscreen', 'getFlag']) {
    if (!index.includes(fn)) fail(`Missing core tool function reference: ${fn}`);
  }
  for (const homepageName of ['PURPOSES', 'POLICIES', 'allCountries', 'getFlag']) {
    if (!index.includes(homepageName)) fail(`Missing homepage search/policy helper: ${homepageName}`);
  }
  if (index.includes('12308') || toolData.includes('12308')) {
    fail('Emergency content still references 12308; use 12367 for immigration service.');
  }
}

function checkPolicyTrust() {
  const visaFiles = walk(path.join(ROOT, 'visa'), file => file.endsWith('.html'));
  for (const file of visaFiles) {
    const name = path.basename(file);
    if (name === 'index.html') continue;
    const html = fs.readFileSync(file, 'utf8');
    if (!html.includes('lw-sources')) {
      fail(`Visa page missing source/trust module: ${rel(file)}`);
    }
    if (!html.includes('canonical')) {
      fail(`Visa page missing canonical: ${rel(file)}`);
    }
  }
  const navData = fs.readFileSync(path.join(ROOT, 'shared', 'nav-data.js'), 'utf8');
  for (const token of ['LWDefaultLastVerified', 'LWSourceLinks', 'LWRenderStatus']) {
    if (!navData.includes(token)) fail(`Policy trust renderer missing ${token}`);
  }
}

function readVisaData() {
  const file = path.join(ROOT, 'shared', 'visa-data.js');
  if (!fs.existsSync(file)) {
    fail('Missing shared/visa-data.js');
    return null;
  }
  try {
    const code = fs.readFileSync(file, 'utf8') +
      '\nthis.__data = { transit240Countries, transit240Provinces };';
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox, { filename: rel(file) });
    return sandbox.__data;
  } catch (error) {
    fail(`Unable to read visa data: ${error.message}`);
    return null;
  }
}

function checkVisaDataConsistency() {
  const data = readVisaData();
  if (!data) return;

  const expectedTransit240 = [
    'AL', 'AR', 'AT', 'AU', 'BA', 'BE', 'BG', 'BN', 'BR', 'BY', 'CA',
    'CH', 'CL', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GB',
    'GR', 'HR', 'HU', 'ID', 'IE', 'IS', 'IT', 'JP', 'KR', 'LT', 'LU',
    'LV', 'MC', 'ME', 'MK', 'MT', 'MX', 'NL', 'NO', 'NZ', 'PL', 'PT',
    'QA', 'RO', 'RS', 'RU', 'SE', 'SG', 'SI', 'SK', 'UA', 'US', 'AE'
  ].sort();

  const actual = data.transit240Countries.map(c => c.code).sort();
  const missing = expectedTransit240.filter(code => !actual.includes(code));
  const extra = actual.filter(code => !expectedTransit240.includes(code));
  if (missing.length || extra.length) {
    fail(`240h country list mismatch against NIA 2025-11-03 source. Missing: ${missing.join(', ') || 'none'}; extra: ${extra.join(', ') || 'none'}`);
  }

  const provinceCount = data.transit240Provinces.length;
  const portCount = data.transit240Provinces.reduce((count, province) => count + province.ports.length, 0);
  if (provinceCount !== 24) fail(`240h province count should be 24, got ${provinceCount}`);
  if (portCount !== 65) fail(`240h port count should be 65, got ${portCount}`);
}

checkJsSyntax();
checkLinks();
checkSitemap();
checkToolEntrypoints();
checkPolicyTrust();
checkVisaDataConsistency();

if (errors.length) {
  console.error(`Site check failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Site check passed: JS syntax, internal links, sitemap, tools, and trust modules look good.');
