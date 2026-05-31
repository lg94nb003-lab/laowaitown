const fs = require('fs');
const path = require('path');

const sourcePath = process.argv[2];
const outputPath = path.join(
  __dirname,
  '..',
  'legal',
  'laws-for-foreigners',
  'exit-entry-administration-law-fulltext.js'
);

if (!sourcePath) {
  throw new Error('Usage: node scripts/generate-exit-entry-law-fulltext.js <source txt>');
}

let raw = fs.readFileSync(sourcePath, 'utf8');
raw = raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');

const englishStart = raw.search(/Order of the President|Exit and Entry Administration Law\s+of the People/);
if (englishStart < 0) {
  throw new Error('Could not locate the English section.');
}

const chineseText = raw.slice(0, englishStart).trim();
const englishText = raw.slice(englishStart).trim();
const chineseDigits = { '零': 0, '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9 };

function chineseArticleNumber(label) {
  const text = label.replace(/[第条]/g, '');
  if (text === '十') return 10;
  const tenIndex = text.indexOf('十');
  if (tenIndex >= 0) {
    const before = text.slice(0, tenIndex);
    const after = text.slice(tenIndex + 1);
    return (before ? chineseDigits[before] : 1) * 10 + (after ? chineseDigits[after] : 0);
  }
  return chineseDigits[text];
}

function normalizeBlock(text) {
  return text
    .replace(/[ \t]*\n[ \t]*/g, '\n')
    .split(/\n+/)
    .map((line) => line.replace(/^[\s　]+/, '').replace(/[\s　]+$/g, ''))
    .filter(Boolean)
    .join('\n');
}

function parseChineseArticles(text) {
  const marker = /第[一二三四五六七八九十]+条/g;
  const hits = [...text.matchAll(marker)];
  const articles = new Map();
  const accepted = [];
  let expected = 1;

  hits.forEach((hit) => {
    const number = chineseArticleNumber(hit[0]);
    if (number === expected) {
      accepted.push({ number, index: hit.index });
      expected += 1;
    }
  });

  accepted.forEach((hit, index) => {
    const end = index + 1 < accepted.length ? accepted[index + 1].index : text.length;
    articles.set(hit.number, normalizeBlock(text.slice(hit.index, end)));
  });

  return articles;
}

function parseEnglishArticles(text) {
  const marker = /Article\s+(\d+)/g;
  const hits = [...text.matchAll(marker)];
  const articles = new Map();
  const accepted = [];
  let expected = 1;

  hits.forEach((hit) => {
    const number = Number(hit[1]);
    if (number === expected) {
      accepted.push({ number, index: hit.index });
      expected += 1;
    }
  });

  accepted.forEach((hit, index) => {
    const end = index + 1 < accepted.length ? accepted[index + 1].index : text.length;
    articles.set(hit.number, normalizeBlock(text.slice(hit.index, end)));
  });

  return articles;
}

const chineseArticles = parseChineseArticles(chineseText);
const englishArticles = parseEnglishArticles(englishText);
const pairs = [];

for (let article = 1; article <= 93; article += 1) {
  if (!chineseArticles.has(article) || !englishArticles.has(article)) {
    throw new Error(`Missing article ${article}: zh=${chineseArticles.has(article)} en=${englishArticles.has(article)}`);
  }

  pairs.push({
    article,
    zh: chineseArticles.get(article),
    en: englishArticles.get(article)
  });
}

fs.writeFileSync(
  outputPath,
  `window.LW_EXIT_ENTRY_FULLTEXT = ${JSON.stringify(pairs, null, 2)};\n`,
  'utf8'
);

console.log(`Generated ${pairs.length} article pairs at ${outputPath}`);
