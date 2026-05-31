const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://laowaitown.com';
const LASTMOD = '2026-05-27';

function readVisaData() {
  const code = fs.readFileSync(path.join(ROOT, 'shared', 'visa-data.js'), 'utf8') +
    '\nthis.__data = { visaFreeCountries, transit240Countries, transit240Provinces, hainan59Countries };';
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.__data;
}

const data = readVisaData();

const SOURCES = {
  nia240: {
    name: 'National Immigration Administration - 240-hour transit notice',
    href: 'https://en.nia.gov.cn/n147418/n147468/c187308/content.html'
  },
  nia240Guide: {
    name: 'National Immigration Administration - 240-hour policy interpretation',
    href: 'https://en.nia.gov.cn/n147418/n147463/c183412/content.html'
  },
  visaFree: {
    name: 'National Immigration Administration - unilateral visa exemption list',
    href: 'https://en.nia.gov.cn/n147418/n147463/c183390/content.html'
  },
  hainan: {
    name: 'Hainan Provincial Government visa-free entry guide',
    href: 'https://en.hainan.gov.cn/englishsite/TTravel/202506/c7cc60e9b7964abe9721a5e601f27506.shtml?ddtab=true'
  },
  consular: {
    name: 'China Consular Service',
    href: 'https://cs.mfa.gov.cn/'
  }
};

const COUNTRY_PAGES = [
  { code: 'US', slug: 'us-citizens', name: 'United States', demonym: 'US citizens' },
  { code: 'GB', slug: 'uk-citizens', name: 'United Kingdom', demonym: 'UK citizens' },
  { code: 'CA', slug: 'canada-citizens', name: 'Canada', demonym: 'Canadian citizens' },
  { code: 'AU', slug: 'australia-citizens', name: 'Australia', demonym: 'Australian citizens' },
  { code: 'DE', slug: 'germany-citizens', name: 'Germany', demonym: 'German citizens' },
  { code: 'FR', slug: 'france-citizens', name: 'France', demonym: 'French citizens' },
  { code: 'IT', slug: 'italy-citizens', name: 'Italy', demonym: 'Italian citizens' },
  { code: 'ES', slug: 'spain-citizens', name: 'Spain', demonym: 'Spanish citizens' },
  { code: 'JP', slug: 'japan-citizens', name: 'Japan', demonym: 'Japanese citizens' },
  { code: 'KR', slug: 'south-korea-citizens', name: 'South Korea', demonym: 'South Korean citizens' }
];

const PORT_PAGES = [
  { slug: 'shanghai-240-hour-transit', titleCity: 'Shanghai', provinceId: 'shanghai' },
  { slug: 'beijing-240-hour-transit', titleCity: 'Beijing', provinceId: 'beijing' },
  { slug: 'guangzhou-240-hour-transit', titleCity: 'Guangzhou', provinceId: 'guangdong', highlightPort: 'Guangzhou' },
  { slug: 'shenzhen-guangdong-240-hour-transit', titleCity: 'Shenzhen / Guangdong', provinceId: 'guangdong', highlightPort: 'Shenzhen' },
  { slug: 'chengdu-240-hour-transit', titleCity: 'Chengdu', provinceId: 'sichuan' },
  { slug: 'xiamen-240-hour-transit', titleCity: 'Xiamen', provinceId: 'fujian', highlightPort: 'Xiamen' }
];

const ROUTE_PAGES = [
  {
    slug: 'singapore-shanghai-japan-240-hour-transit',
    title: 'Singapore to Shanghai to Japan: 240-Hour Transit Guide',
    origin: 'Singapore',
    city: 'Shanghai',
    destination: 'Japan',
    note: 'This is a classic third-country transit pattern when the traveler uses an eligible passport and holds confirmed onward transport.'
  },
  {
    slug: 'us-beijing-thailand-240-hour-transit',
    title: 'US to Beijing to Thailand: 240-Hour Transit Guide',
    origin: 'United States',
    city: 'Beijing',
    destination: 'Thailand',
    note: 'US passport holders are in LAOWAITOWN\'s current 240-hour transit dataset, but they are not in the unilateral 30-day visa-free list.'
  },
  {
    slug: 'uk-guangzhou-hong-kong-240-hour-transit',
    title: 'UK to Guangzhou to Hong Kong: 240-Hour Transit Guide',
    origin: 'United Kingdom',
    city: 'Guangzhou',
    destination: 'Hong Kong',
    note: 'Hong Kong is commonly handled as a separate destination region for transit routing, but travelers should confirm with the airline before ticketing.'
  },
  {
    slug: 'australia-chengdu-korea-240-hour-transit',
    title: 'Australia to Chengdu to Korea: 240-Hour Transit Guide',
    origin: 'Australia',
    city: 'Chengdu',
    destination: 'South Korea',
    note: 'Chengdu has two eligible airports in the Sichuan 240-hour transit area; the allowed stay area is not all of China.'
  },
  {
    slug: 'germany-shanghai-singapore-240-hour-transit',
    title: 'Germany to Shanghai to Singapore: 240-Hour Transit Guide',
    origin: 'Germany',
    city: 'Shanghai',
    destination: 'Singapore',
    note: 'German passport holders may also have 30-day visa-free options, so compare the transit route with the simpler visa-free entry route.'
  }
];

const LIFE_PAGES = [
  {
    slug: 'pay-in-china-as-foreigner',
    title: 'How to Pay in China as a Foreigner',
    description: 'A practical payment checklist for foreign travelers in China: cards, Alipay, WeChat Pay, cash, ATMs, and common payment problems.',
    quick: 'Most foreign visitors should set up Alipay or WeChat Pay before arrival, carry a backup bank card, and keep a small amount of cash for edge cases.',
    steps: [
      'Install Alipay and WeChat before departure.',
      'Link an international Visa, Mastercard, or supported bank card.',
      'Complete identity verification if the app asks for it.',
      'Keep your passport name consistent across booking, payment, and hotel registration.',
      'Carry a backup card and some cash for small shops or system outages.'
    ],
    mistakes: [
      'Arriving with only Apple Pay or Google Pay and no China payment app.',
      'Using a card blocked for overseas transactions.',
      'Ignoring passport-name mismatch during payment-app verification.'
    ],
    relatedPhrase: 'Can I pay by Alipay or WeChat Pay?',
    next: '/#currency'
  },
  {
    slug: 'china-esim-travel',
    title: 'Best eSIM for China Travel: What to Check Before You Buy',
    description: 'How foreign travelers should choose a China eSIM: coverage, data amount, hotspot rules, identity checks, and app access.',
    quick: 'Choose an eSIM based on coverage, data size, hotspot support, and whether it works with the apps you need during your trip.',
    steps: [
      'Check whether your phone supports eSIM and is unlocked.',
      'Buy before departure so you can install over stable Wi-Fi.',
      'Keep the QR code or activation instructions offline.',
      'Test data after landing before leaving the airport.',
      'Keep hotel Wi-Fi as a backup for maps, payments, and ride hailing.'
    ],
    mistakes: [
      'Buying an eSIM for an unsupported or carrier-locked phone.',
      'Forgetting that some eSIMs are data-only and do not include a local phone number.',
      'Waiting until arrival without reliable Wi-Fi to activate.'
    ],
    relatedPhrase: 'Do you have Wi-Fi?',
    next: '/#tools'
  },
  {
    slug: 'maps-in-china',
    title: 'How to Use Maps in China as a Foreigner',
    description: 'Map and navigation tips for foreign travelers in China: Chinese place names, hotel addresses, taxis, walking routes, and offline backups.',
    quick: 'Save Chinese addresses for hotels and stations, keep screenshots offline, and use the map app that works best on your phone in China.',
    steps: [
      'Save hotel and airport names in Chinese and English.',
      'Take screenshots of key addresses before moving between cities.',
      'Use the map tool to open your destination in a supported app.',
      'Show the Chinese address to taxi drivers or hotel staff when needed.',
      'Keep battery and mobile data backups for late-night arrivals.'
    ],
    mistakes: [
      'Only saving an English hotel name that local drivers do not recognize.',
      'Trusting a pin without checking the Chinese address.',
      'Forgetting that some international map data can be incomplete.'
    ],
    relatedPhrase: 'Please take me to this address.',
    next: '/#maps'
  },
  {
    slug: 'emergency-numbers-china',
    title: 'China Emergency Numbers for Foreigners',
    description: 'Key China emergency and service numbers for foreign visitors, including police, fire, ambulance, traffic accident, and immigration service hotline 12367.',
    quick: 'For immediate danger use 110 police, 119 fire, 120 ambulance, and 122 traffic accident. For immigration and exit-entry questions, use 12367.',
    steps: [
      'Call 110 for police or immediate personal-safety issues.',
      'Call 119 for fire rescue.',
      'Call 120 for ambulance and medical emergencies.',
      'Call 122 for traffic accidents.',
      'Call 12367 for immigration, visa, stay, and exit-entry service questions.'
    ],
    mistakes: [
      'Using travel-assistance hotlines for questions meant for China immigration service.',
      'Not keeping your hotel address written in Chinese.',
      'Waiting to contact your hotel or airline when documents are lost.'
    ],
    relatedPhrase: 'I need help. Please call the police.',
    next: '/#emergency'
  },
  {
    slug: 'hotel-registration-china',
    title: 'Hotel Registration in China Explained for Foreign Visitors',
    description: 'What foreign visitors should know about accommodation registration in China: hotels, apartments, staying with friends, and passport checks.',
    quick: 'Hotels normally register foreign guests with your passport. If you stay outside a hotel, ask the host how local accommodation registration should be completed.',
    steps: [
      'Book accommodation that can accept foreign guests and register passports.',
      'Bring the same passport used for booking and entry.',
      'Ask the front desk to complete temporary accommodation registration.',
      'For private stays, ask the host about local police-station or online registration rules.',
      'Keep your hotel address available for arrival-card and immigration questions.'
    ],
    mistakes: [
      'Booking a property that cannot complete foreigner registration.',
      'Using a different document from the one used to enter China.',
      'Assuming private stays have no registration requirement.'
    ],
    relatedPhrase: 'I need to register my accommodation.',
    next: '/visa/arrival-card.html'
  }
];

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
}

function yn(value) {
  return value ? 'Yes' : 'No';
}

function yesNoCell(value, text) {
  return `<td><strong class="${value ? 'ok' : 'warn'}">${yn(value)}</strong><br><span>${esc(text)}</span></td>`;
}

function ensureDir(dir) {
  fs.mkdirSync(path.join(ROOT, dir), { recursive: true });
}

function writeFile(rel, html) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html.replace(/[ \t]+$/gm, ''), 'utf8');
}

function sourcesBlock(sources) {
  const links = sources.map(s => `<a class="lw-source-link" href="${s.href}" target="_blank" rel="noopener">${esc(s.name)}</a>`).join(' <span class="sep">/</span> ');
  return `
    <div class="vm-sources lw-sources">
      <div class="lw-trust-grid">
        <div><strong>Status</strong><span>Active reference</span></div>
        <div><strong>Last verified</strong><span>${LASTMOD}</span></div>
        <div><strong>Effective since</strong><span>See official source</span></div>
      </div>
      <div class="lw-source-row"><strong>Sources</strong><span class="src-list">${links}</span></div>
      <div class="lw-source-row"><strong>Disclaimer</strong><span class="disclaimer">LAOWAITOWN is an independent reference site, not a Chinese government authority. Always verify final requirements with the airline, border inspection authority, embassy, or consulate before travel.</span></div>
    </div>
  `;
}

function defaultSummaryCard() {
  return `
        <div class="vm-card-head">
          <div>
            <h2>Guide summary</h2>
            <p>Fast answer first, supporting details below.</p>
          </div>
          <span class="vm-badge">Source-backed</span>
        </div>
        <div class="vm-field-stack">
          <div class="vm-field"><label>Status</label><strong>Active reference</strong></div>
          <div class="vm-field"><label>Verified</label><strong>${LASTMOD}</strong></div>
          <div class="vm-field"><label>Next step</label><strong>Use the related LAOWAITOWN tool</strong></div>
        </div>
  `;
}

function sideRail({ section, toc = [], sources = [] }) {
  const toolHref = section === 'life' ? '/#tools' : '/#calculator';
  const toolLabel = section === 'life' ? 'Open tools' : 'Check dates';
  const tocLinks = toc.length
    ? `
      <nav class="vm-rail-card vm-toc" aria-label="On this page">
        <h2>On this page</h2>
        <div class="vm-rail-links">
          ${toc.map(item => `<a href="#${esc(item.id)}">${esc(item.label)}</a>`).join('\n          ')}
        </div>
      </nav>`
    : '';
  const sourceNames = sources.slice(0, 3).map(source => esc(source.name)).join(' / ');
  return `
        <aside class="vm-side-rail">
          ${tocLinks}
          <div class="vm-rail-card">
            <h2>Quick check</h2>
            <p>Use the tools after reading the answer, especially when dates, route, or passport details matter.</p>
            <div class="vm-rail-actions">
              <a class="vm-button primary" href="${toolHref}">${toolLabel}</a>
              <a class="vm-button" href="/visa/">Visa hub</a>
            </div>
          </div>
          <div class="vm-rail-card">
            <h2>Trust notes</h2>
            <dl class="vm-rail-meta">
              <div><dt>Updated</dt><dd>${LASTMOD}</dd></div>
              <div><dt>Source type</dt><dd>${sourceNames || 'Official references'}</dd></div>
              <div><dt>Publisher</dt><dd>Independent reference site</dd></div>
            </dl>
          </div>
        </aside>
  `;
}

function faqJson(title, faqs) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  });
}

function articleJson(title, description, url) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: 'LAOWAITOWN' },
    publisher: { '@type': 'Organization', name: 'LAOWAITOWN' },
    dateModified: LASTMOD,
    mainEntityOfPage: url
  });
}

function layout({ section, relDepth = '..', urlPath, title, description, currentHref = '', body, toc = [], faqs = [], sources = [], eyebrow = 'China entry guide', summaryHtml = '' }) {
  const canonical = SITE + urlPath;
  const faqScript = faqs.length ? `<script type="application/ld+json">${faqJson(title, faqs)}</script>` : '';
  const navCta = section === 'life' ? '/#tools' : '/#calculator';
  const rail = sideRail({ section, toc, sources });
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)} | LAOWAITOWN</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <link rel="stylesheet" href="${relDepth}/style.css">
  <link rel="stylesheet" href="${relDepth}/shared/site.css">
  <script type="application/ld+json">${articleJson(title, description, canonical)}</script>
  ${faqScript}
</head>
<body class="vm-page">
  <div class="vm-shell">
    <header class="vm-topbar">
      <a class="vm-brand" href="/">
        <span class="vm-brand-mark">LW</span>
        <span>LAOWAITOWN</span>
      </a>
      <ul class="vm-nav" id="lw-nav-links" role="menubar"></ul>
      <a class="vm-top-cta" href="${navCta}">${section === 'life' ? 'Open tools' : 'Start check'}</a>
    </header>

    <main class="vm-main">
      <section class="vm-answer-hero">
        <p class="vm-eyebrow">${esc(eyebrow)}</p>
        <h1>${esc(title)}</h1>
        <p class="vm-lead">${esc(description)}</p>
        <div class="vm-answer-box">
          <h2>Quick answer</h2>
          ${summaryHtml || defaultSummaryCard()}
        </div>
      </section>

      <section class="vm-detail-layout">
        <article class="vm-panel vm-content-panel">
          ${body}
        </article>
        ${rail}
      </section>

      ${sourcesBlock(sources)}
    </main>

    <footer class="vm-footer">
      <a href="/">Home</a>
      <a href="/visa/">Visa</a>
      <a href="/life/">Life</a>
      <a href="/#tools">Tools</a>
      <a href="/about.html">About</a>
      <p>&copy; 2026 LAOWAITOWN. Independent reference site. <a href="mailto:contact@laowaitown.com" style="color:inherit;">contact@laowaitown.com</a></p>
    </footer>
  </div>

  <script src="${relDepth}/shared/nav-data.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      LWRenderNav('${section}');
    });
  </script>
</body>
</html>
`;
}

function countryFlags(country) {
  return {
    visaFree: data.visaFreeCountries.some(c => c.code === country.code),
    transit240: data.transit240Countries.some(c => c.code === country.code),
    hainan: data.hainan59Countries.some(c => c.code === country.code)
  };
}

function countrySummaryCard(country, flags) {
  return `
        <div class="vm-card-head">
          <div>
            <h2>${esc(country.name)} passport quick answer</h2>
            <p>Use this as a first check before booking flights or hotels.</p>
          </div>
          <span class="vm-badge">Verified</span>
        </div>
        <div class="vm-result">
          <h3>Likely paths to review</h3>
          <div class="vm-result-grid">
            <div class="vm-result-chip ${flags.visaFree ? '' : 'no'}">30-day visa-free: ${yn(flags.visaFree)}</div>
            <div class="vm-result-chip ${flags.transit240 ? '' : 'no'}">240h transit: ${yn(flags.transit240)}</div>
            <div class="vm-result-chip maybe">24h transit: Usually</div>
            <div class="vm-result-chip ${flags.hainan ? '' : 'no'}">Hainan: ${yn(flags.hainan)}</div>
          </div>
        </div>
        <div class="vm-actions" style="margin-top:16px;">
          <a class="vm-button primary" href="/#calculator">Calculate stay</a>
          <a class="vm-button" href="/#phrasebook">Entry phrases</a>
        </div>
  `;
}

function portSummaryCard(page, province, ports) {
  return `
        <div class="vm-card-head">
          <div>
            <h2>${esc(page.titleCity)} transit quick check</h2>
            <p>Designed for city and airport searches.</p>
          </div>
          <span class="vm-badge">240h guide</span>
        </div>
        <div class="vm-fact-grid">
          <div class="vm-fact"><span>Policy</span><strong>240-hour transit</strong></div>
          <div class="vm-fact"><span>Area</span><strong>${esc(province.area_en)}</strong></div>
          <div class="vm-fact"><span>Ports</span><strong>${ports.length} listed port${ports.length === 1 ? '' : 's'}</strong></div>
          <div class="vm-fact"><span>Key document</span><strong>Confirmed onward ticket</strong></div>
        </div>
        <div class="vm-actions" style="margin-top:16px;">
          <a class="vm-button primary" href="/#calculator">Calculate stay</a>
          <a class="vm-button" href="/visa/240-hour-transit-visa.html">Full 240h guide</a>
        </div>
  `;
}

function routeSummaryCard(route) {
  return `
        <div class="vm-card-head">
          <div>
            <h2>Route check preview</h2>
            <p>Built around the itinerary a traveler actually booked.</p>
          </div>
          <span class="vm-badge">Route logic</span>
        </div>
        <div class="vm-field-stack">
          <div class="vm-field"><label>Origin</label><strong>${esc(route.origin)}</strong></div>
          <div class="vm-field"><label>China stop</label><strong>${esc(route.city)}</strong></div>
          <div class="vm-field"><label>Next stop</label><strong>${esc(route.destination)}</strong></div>
          <div class="vm-field"><label>Likely path</label><strong>Review 240h transit</strong></div>
        </div>
        <div class="vm-actions" style="margin-top:16px;">
          <a class="vm-button primary" href="/#calculator">Calculate stay</a>
          <a class="vm-button" href="/#phrasebook">Show route phrase</a>
        </div>
  `;
}

function lifeSummaryCard(page) {
  return `
        <div class="vm-card-head">
          <div>
            <h2>Arrival task card</h2>
            <p>Practical next steps for the first week in China.</p>
          </div>
          <span class="vm-badge">Travel-ready</span>
        </div>
        <div class="vm-field-stack">
          <div class="vm-field"><label>Topic</label><strong>${esc(page.title)}</strong></div>
          <div class="vm-field"><label>Useful phrase</label><strong>${esc(page.relatedPhrase)}</strong></div>
          <div class="vm-field"><label>Next tool</label><strong>Open related LAOWAITOWN tool</strong></div>
        </div>
        <div class="vm-actions" style="margin-top:16px;">
          <a class="vm-button primary" href="${page.next}">Open related tool</a>
          <a class="vm-button" href="/#phrasebook">Phrasebook</a>
        </div>
  `;
}

function generateCountryPage(country) {
  const flags = countryFlags(country);
  const title = `China Visa-Free Entry for ${country.name} Citizens 2026`;
  const description = `Visa-free China entry options for ${country.demonym}: 30-day visa-free entry, 240-hour transit, 24-hour transit, Hainan visa-free entry, common mistakes, and next steps.`;
  const pathName = `/visa/china-visa-free-entry-for-${country.slug}.html`;
  const faqs = [
    { q: `Can ${country.demonym} enter China without a visa in 2026?`, a: flags.visaFree ? `${country.demonym} are listed in LAOWAITOWN's current 30-day visa-free dataset for ordinary passports, subject to purpose and stay limits.` : `${country.demonym} are not listed in LAOWAITOWN's current unilateral 30-day visa-free dataset, but other routes such as 240-hour transit may apply.` },
    { q: `Can ${country.demonym} use China's 240-hour transit policy?`, a: flags.transit240 ? `Yes, LAOWAITOWN's current dataset includes ${country.name} in the 240-hour transit country list, provided the route, port, documents, and onward-ticket conditions are met.` : `Not according to LAOWAITOWN's current 240-hour transit dataset.` },
    { q: `Can ${country.demonym} use Hainan's 30-day visa-free policy?`, a: flags.hainan ? `Yes, LAOWAITOWN's current Hainan dataset includes ${country.name}, but travel is limited to Hainan and subject to the official Hainan policy conditions.` : `Not according to LAOWAITOWN's current Hainan dataset.` }
  ];
  const body = `
      <article class="lw-article">
        <nav class="lw-breadcrumb"><a href="/">Home</a> / <a href="/visa/">Visa</a> / ${esc(country.name)}</nav>
        <h1>${esc(title)}</h1>
        <p class="lead">Quick answer for ${esc(country.demonym)}: ${flags.visaFree ? 'the 30-day visa-free route may be available' : 'the 30-day unilateral visa-free route is not shown as available in the current dataset'}, ${flags.transit240 ? '240-hour transit may be available' : '240-hour transit is not shown as available'}, 24-hour transit is generally possible when transit conditions are met, and ${flags.hainan ? 'Hainan visa-free entry may be available' : 'Hainan visa-free entry is not shown as available'}.</p>

        <section id="answer">
          <h2>One-page answer</h2>
          <table>
            <thead><tr><th>Option</th><th>Availability</th><th>Best used for</th></tr></thead>
            <tbody>
              <tr><td>30-day visa-free entry</td>${yesNoCell(flags.visaFree, flags.visaFree ? 'Ordinary passport, approved purposes, up to 30 days.' : 'Use a visa or another eligible exemption route.') }<td>Normal tourism, business visits, family visits, exchange, transit.</td></tr>
              <tr><td>240-hour transit</td>${yesNoCell(flags.transit240, flags.transit240 ? 'Requires eligible route, port, passport, and onward ticket.' : 'Not listed for this passport in current data.') }<td>Multi-country trips through a designated China port.</td></tr>
              <tr><td>24-hour transit</td><td><strong class="ok">Usually possible</strong><br><span>Subject to airline and border inspection handling.</span></td><td>Short international connections.</td></tr>
              <tr><td>Hainan 30-day visa-free</td>${yesNoCell(flags.hainan, flags.hainan ? 'Hainan-only travel under Hainan policy conditions.' : 'Not listed for this passport in current data.') }<td>Short Hainan trips.</td></tr>
            </tbody>
          </table>
        </section>

        <section id="who">
          <h2>Who this page is for</h2>
          <p>This page is for travelers holding an ordinary ${esc(country.name)} passport who want a fast first check before booking flights or hotels. It is not a substitute for official advice from the airline, Chinese embassy, consulate, or border inspection authority.</p>
        </section>

        <section id="conditions">
          <h2>Conditions checklist</h2>
          <ul>
            <li>Your passport must be valid and match your booking details.</li>
            <li>Your purpose must fit the specific exemption route you plan to use.</li>
            <li>For transit, your route must continue to a third country or region, with confirmed onward transport.</li>
            <li>For Hainan, your activity area is normally limited to Hainan Province.</li>
            <li>Keep hotel booking, itinerary, and return or onward ticket ready for inspection.</li>
          </ul>
        </section>

        <section id="steps">
          <h2>Recommended next steps</h2>
          <ol>
            <li>Use the LAOWAITOWN homepage checker to confirm the current policy match.</li>
            <li>Open the stay calculator before booking the return or onward ticket.</li>
            <li>Check your exact airport or port if you are relying on 240-hour transit.</li>
            <li>Prepare a simple English and Chinese explanation of your route.</li>
          </ol>
          <p><a class="lw-cta" href="/#calculator">Open stay calculator</a> <a class="lw-cta ghost" href="/#phrasebook">Open phrasebook</a></p>
        </section>

        <section id="mistakes">
          <h2>Common mistakes</h2>
          <ul>
            <li>Counting the stay from the wrong date.</li>
            <li>Assuming 240-hour transit allows travel anywhere in China.</li>
            <li>Booking a round trip that is not actually a third-country transit.</li>
            <li>Arriving without hotel address, onward ticket, or a clear itinerary.</li>
          </ul>
        </section>

        <section id="faq">
          <h2>FAQ</h2>
          ${faqs.map(f => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('\n          ')}
        </section>
      </article>
  `;
  return {
    rel: pathName.slice(1),
    urlPath: pathName,
    title,
    description,
    html: layout({
      section: 'visa',
      urlPath: pathName,
      title,
      description,
      currentHref: pathName,
      toc: [
        { id: 'answer', label: 'One-page answer' },
        { id: 'who', label: 'Who this is for' },
        { id: 'conditions', label: 'Conditions' },
        { id: 'steps', label: 'Next steps' },
        { id: 'mistakes', label: 'Mistakes' },
        { id: 'faq', label: 'FAQ' }
      ],
      faqs,
      sources: [SOURCES.visaFree, SOURCES.nia240, SOURCES.hainan, SOURCES.consular],
      eyebrow: 'Passport-specific China entry check',
      summaryHtml: countrySummaryCard(country, flags),
      body
    })
  };
}

function generatePortPage(page) {
  const province = data.transit240Provinces.find(p => p.id === page.provinceId);
  if (!province) throw new Error(`Missing province ${page.provinceId}`);
  const title = `${page.titleCity} 240-Hour Visa-Free Transit Guide 2026`;
  const description = `How to use China's 240-hour visa-free transit in ${page.titleCity}: eligible ports, permitted stay area, documents, common refusal reasons, and route examples.`;
  const pathName = `/visa/${page.slug}.html`;
  const ports = province.ports.map(p => p.en || String(p));
  const shownPorts = page.highlightPort ? ports.filter(p => p.includes(page.highlightPort)) : ports;
  const faqs = [
    { q: `Can I use 240-hour visa-free transit in ${page.titleCity}?`, a: `Yes, if your passport nationality, route, port, onward ticket, and stay area meet the official 240-hour transit rules.` },
    { q: `Can I travel outside ${province.area_en}?`, a: `Do not assume so. Stay within the permitted area shown by the local 240-hour transit rules and confirm with border inspection if your route crosses administrative boundaries.` },
    { q: `What documents should I prepare?`, a: `Prepare a valid passport, confirmed onward ticket to a third country or region, hotel address, and a clear itinerary.` }
  ];
  const body = `
      <article class="lw-article">
        <nav class="lw-breadcrumb"><a href="/">Home</a> / <a href="/visa/">Visa</a> / ${esc(page.titleCity)}</nav>
        <h1>${esc(title)}</h1>
        <p class="lead">${esc(page.titleCity)} can be a strong 240-hour transit option when you hold an eligible passport and continue to a third country or region within the permitted stay time.</p>

        <section id="answer">
          <h2>One-page answer</h2>
          <p>You may be able to use 240-hour visa-free transit through ${esc(page.titleCity)} if your passport is in the eligible-country list, you enter through a designated port, and you hold confirmed onward transport to a third country or region.</p>
        </section>

        <section id="ports">
          <h2>Eligible ports</h2>
          <ul>
            ${shownPorts.map(p => `<li>${esc(p)}</li>`).join('\n            ')}
          </ul>
          ${shownPorts.length !== ports.length ? `<p>Other Guangdong ports may also be listed for the province-level policy: ${ports.map(esc).join(', ')}.</p>` : ''}
        </section>

        <section id="area">
          <h2>Permitted stay area</h2>
          <p>Current LAOWAITOWN data lists the permitted area as: <strong>${esc(province.area_en)}</strong>.</p>
          <p>For trips involving multiple cities, keep the itinerary simple and confirm whether each city is within the permitted area.</p>
        </section>

        <section id="documents">
          <h2>Documents checklist</h2>
          <ul>
            <li>Valid passport from an eligible 240-hour transit country.</li>
            <li>Confirmed onward ticket with a fixed date and seat to a third country or region.</li>
            <li>Hotel address or accommodation plan.</li>
            <li>Clear itinerary that stays inside the permitted transit area.</li>
          </ul>
        </section>

        <section id="mistakes">
          <h2>Common refusal risks</h2>
          <ul>
            <li>The route is not a real third-country transit.</li>
            <li>The onward ticket is missing, open-ended, or not confirmed.</li>
            <li>The traveler plans to leave the permitted area.</li>
            <li>The airline is not comfortable boarding the passenger without a visa.</li>
          </ul>
        </section>

        <section id="route">
          <h2>Example route</h2>
          <p>A simple pattern is: Country A -> ${esc(page.titleCity)} -> Country B, where Country A and Country B are different countries or regions and the traveler has a confirmed onward ticket.</p>
          <p><a class="lw-cta" href="/#calculator">Calculate stay dates</a> <a class="lw-cta ghost" href="/visa/240-hour-transit-visa.html">Read full 240h guide</a></p>
        </section>

        <section id="faq">
          <h2>FAQ</h2>
          ${faqs.map(f => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('\n          ')}
        </section>
      </article>
  `;
  return {
    rel: pathName.slice(1),
    urlPath: pathName,
    title,
    description,
    html: layout({
      section: 'visa',
      urlPath: pathName,
      title,
      description,
      currentHref: pathName,
      toc: [
        { id: 'answer', label: 'Answer' },
        { id: 'ports', label: 'Ports' },
        { id: 'area', label: 'Stay area' },
        { id: 'documents', label: 'Documents' },
        { id: 'mistakes', label: 'Risks' },
        { id: 'route', label: 'Example route' },
        { id: 'faq', label: 'FAQ' }
      ],
      faqs,
      sources: [SOURCES.nia240, SOURCES.nia240Guide, SOURCES.consular],
      eyebrow: '240-hour transit city guide',
      summaryHtml: portSummaryCard(page, province, ports),
      body
    })
  };
}

function generateRoutePage(route) {
  const pathName = `/visa/${route.slug}.html`;
  const description = `${route.title}: whether this route can fit China's 240-hour transit rules, what documents to prepare, and what mistakes to avoid.`;
  const faqs = [
    { q: `Can the ${route.origin} -> ${route.city} -> ${route.destination} route use 240-hour transit?`, a: `It may be eligible if the traveler uses an eligible passport, the route is a true third-country or region transit, and the onward ticket is confirmed.` },
    { q: `What is the most important document?`, a: `The onward ticket to the next country or region is usually the key document, together with a valid passport and accommodation details.` },
    { q: `Can I change my route after arrival?`, a: `Avoid changing the route without checking the immigration and airline implications, because the exemption is tied to the declared transit plan.` }
  ];
  const body = `
      <article class="lw-article">
        <nav class="lw-breadcrumb"><a href="/">Home</a> / <a href="/visa/">Visa</a> / Route guide</nav>
        <h1>${esc(route.title)}</h1>
        <p class="lead">${esc(route.note)}</p>

        <section id="answer">
          <h2>One-sentence answer</h2>
          <p>${esc(route.origin)} -> ${esc(route.city)} -> ${esc(route.destination)} can fit the 240-hour transit pattern when the traveler has an eligible passport, enters through an eligible port, stays in the permitted area, and holds a confirmed onward ticket.</p>
        </section>

        <section id="applies">
          <h2>Who this applies to</h2>
          <p>This page is for travelers planning a short China stopover in ${esc(route.city)} as part of a larger international itinerary. If China is your final destination or you plan a normal round trip, a different visa-free or visa route may be more appropriate.</p>
        </section>

        <section id="checklist">
          <h2>Conditions checklist</h2>
          <ul>
            <li>Eligible passport nationality for 240-hour transit.</li>
            <li>Entry through a designated port in or near ${esc(route.city)}.</li>
            <li>Confirmed onward ticket from ${esc(route.city)} to ${esc(route.destination)}.</li>
            <li>Stay within the permitted transit area.</li>
            <li>Clear hotel address and travel plan.</li>
          </ul>
        </section>

        <section id="explain">
          <h2>How to explain it at entry</h2>
          <p>Keep the explanation short: "I am transiting from ${esc(route.origin)} to ${esc(route.destination)} through ${esc(route.city)}. Here is my onward ticket and hotel reservation."</p>
          <p><a class="lw-cta" href="/#phrasebook">Show travel phrases</a> <a class="lw-cta ghost" href="/#calculator">Check stay dates</a></p>
        </section>

        <section id="mistakes">
          <h2>Common mistakes</h2>
          <ul>
            <li>Using the same country or region before and after China.</li>
            <li>Booking a ticket without confirmed date or seat.</li>
            <li>Planning side trips outside the permitted area.</li>
            <li>Assuming the airline will interpret the rule the same way as border inspection.</li>
          </ul>
        </section>

        <section id="faq">
          <h2>FAQ</h2>
          ${faqs.map(f => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('\n          ')}
        </section>
      </article>
  `;
  return {
    rel: pathName.slice(1),
    urlPath: pathName,
    title: route.title,
    description,
    html: layout({
      section: 'visa',
      urlPath: pathName,
      title: route.title,
      description,
      currentHref: pathName,
      toc: [
        { id: 'answer', label: 'Answer' },
        { id: 'applies', label: 'Applies to' },
        { id: 'checklist', label: 'Checklist' },
        { id: 'explain', label: 'Explain route' },
        { id: 'mistakes', label: 'Mistakes' },
        { id: 'faq', label: 'FAQ' }
      ],
      faqs,
      sources: [SOURCES.nia240, SOURCES.nia240Guide, SOURCES.consular],
      eyebrow: 'Real route judgment',
      summaryHtml: routeSummaryCard(route),
      body
    })
  };
}

function generateLifePage(page) {
  const pathName = `/life/${page.slug}.html`;
  const faqs = [
    { q: `What is the short answer?`, a: page.quick },
    { q: `What phrase should I keep ready?`, a: page.relatedPhrase },
    { q: `What should I do next?`, a: `Use the related LAOWAITOWN tool or guide linked from this page, then verify any official requirement before travel.` }
  ];
  const body = `
      <article class="lw-article">
        <nav class="lw-breadcrumb"><a href="/">Home</a> / <a href="/life/">Life</a> / ${esc(page.title)}</nav>
        <h1>${esc(page.title)}</h1>
        <p class="lead">${esc(page.quick)}</p>

        <section id="answer">
          <h2>Simple answer</h2>
          <p>${esc(page.quick)}</p>
        </section>

        <section id="steps">
          <h2>Steps</h2>
          <ol>
            ${page.steps.map(step => `<li>${esc(step)}</li>`).join('\n            ')}
          </ol>
        </section>

        <section id="mistakes">
          <h2>Common mistakes</h2>
          <ul>
            ${page.mistakes.map(item => `<li>${esc(item)}</li>`).join('\n            ')}
          </ul>
        </section>

        <section id="phrases">
          <h2>Useful phrase</h2>
          <p><strong>${esc(page.relatedPhrase)}</strong></p>
          <p><a class="lw-cta" href="/#phrasebook">Open phrasebook</a> <a class="lw-cta ghost" href="${page.next}">Open related tool</a></p>
        </section>

        <section id="faq">
          <h2>FAQ</h2>
          ${faqs.map(f => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('\n          ')}
        </section>
      </article>
  `;
  return {
    rel: pathName.slice(1),
    urlPath: pathName,
    title: page.title,
    description: page.description,
    html: layout({
      section: 'life',
      urlPath: pathName,
      title: page.title,
      description: page.description,
      currentHref: pathName,
      toc: [
        { id: 'answer', label: 'Answer' },
        { id: 'steps', label: 'Steps' },
        { id: 'mistakes', label: 'Mistakes' },
        { id: 'phrases', label: 'Phrase' },
        { id: 'faq', label: 'FAQ' }
      ],
      faqs,
      sources: [SOURCES.consular],
      eyebrow: 'Arrival and daily life guide',
      summaryHtml: lifeSummaryCard(page),
      body
    })
  };
}

function card(title, href, text) {
  return `<a class="lw-card" href="${href}"><h3>${esc(title)}</h3><p>${esc(text)}</p></a>`;
}

function generateVisaIndex(pages) {
  const countryChips = COUNTRY_PAGES.map(c => `<a class="chip" href="/visa/china-visa-free-entry-for-${c.slug}.html">${esc(c.name)}</a>`).join('\n        ');
  const portCards = PORT_PAGES.map(p => `
        <a class="vm-card" href="/visa/${p.slug}.html">
          <small>City guide</small>
          <h3>${esc(p.titleCity)} 240h transit</h3>
          <p>Ports, stay area, documents, and route risks.</p>
        </a>`).join('\n');
  const routeCards = ROUTE_PAGES.map(r => `
        <a class="vm-card" href="/visa/${r.slug}.html">
          <small>Route example</small>
          <h3>${esc(r.origin)} -> ${esc(r.city)} -> ${esc(r.destination)}</h3>
          <p>Check third-country logic and entry explanation.</p>
        </a>`).join('\n');
  const body = `
      <section class="vm-section" style="margin-top:0;">
        <div class="vm-section-head">
          <div>
            <h2>Built around visitor intent.</h2>
            <p class="vm-section-note">Tourists and business visitors usually do not know the policy name. They know the trip they are trying to take.</p>
          </div>
        </div>
        <div class="vm-persona-grid">
          <article class="vm-card">
            <small>Tourist</small>
            <h3>Can I enter China without a visa?</h3>
            <ul>
              <li>Passport quick check.</li>
              <li>Stay-date calculator.</li>
              <li>Hotel and payment reminders.</li>
            </ul>
          </article>
          <article class="vm-card">
            <small>Business</small>
            <h3>Can I attend meetings or trade visits?</h3>
            <ul>
              <li>Purpose eligibility.</li>
              <li>Document checklist.</li>
              <li>Conservative disclaimers.</li>
            </ul>
          </article>
          <article class="vm-card">
            <small>Transit</small>
            <h3>Does my route qualify for 240h?</h3>
            <ul>
              <li>Third-country logic.</li>
              <li>Port and city area limits.</li>
              <li>Airline-ready explanation.</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="vm-section">
        <div class="vm-section-head">
          <div>
            <h2>Core policy paths.</h2>
            <p class="vm-section-note">Four simple doors for the most common China entry questions.</p>
          </div>
        </div>
        <div class="vm-guide-grid">
          <a class="vm-card" href="/visa/visa-free-entry.html"><small>Entry</small><h3>30-day visa-free</h3><p>Eligible passports, permitted purposes, and stay counting.</p></a>
          <a class="vm-card" href="/visa/240-hour-transit-visa.html"><small>Transit</small><h3>240-hour transit</h3><p>Passport list, ports, stay areas, and onward-ticket rules.</p></a>
          <a class="vm-card" href="/visa/24-hour-transit-visa.html"><small>Layover</small><h3>24-hour transit</h3><p>Short international connections and temporary entry basics.</p></a>
          <a class="vm-card" href="/visa/hainan-visa-free.html"><small>Hainan</small><h3>Hainan visa-free</h3><p>Island-only travel, eligible countries, and practical limits.</p></a>
        </div>
      </section>

      <section class="vm-section">
        <div class="vm-section-head">
          <div>
            <h2>Popular country checks.</h2>
            <p class="vm-section-note">Fast entry points for high-intent Google searches.</p>
          </div>
        </div>
        <div class="chips">${countryChips}</div>
      </section>

      <section class="vm-section">
        <div class="vm-section-head">
          <div>
            <h2>240h transit by city.</h2>
            <p class="vm-section-note">Designed for people who search by airport or city.</p>
          </div>
        </div>
        <div class="vm-route-grid">${portCards}</div>
      </section>

      <section class="vm-section">
        <div class="vm-section-head">
          <div>
            <h2>Examples that feel like real trips.</h2>
            <p class="vm-section-note">Route pages are easier for travelers than policy names alone.</p>
          </div>
        </div>
        <div class="vm-route-grid">${routeCards}</div>
      </section>
  `;
  return layout({
    section: 'visa',
    urlPath: '/visa/',
    title: 'Plan your China entry with fewer policy surprises',
    description: 'Start with passport, route, dates, and purpose, then review the China visa-free or transit path that fits your trip.',
    currentHref: '/visa/',
    toc: [
      { id: 'core', label: 'Core guides' },
      { id: 'countries', label: 'Country pages' },
      { id: 'ports', label: 'Port pages' },
      { id: 'routes', label: 'Route pages' }
    ],
    sources: [SOURCES.visaFree, SOURCES.nia240, SOURCES.hainan, SOURCES.consular],
    eyebrow: 'For tourists, business visitors, and transit travelers',
    summaryHtml: `
        <div class="vm-card-head">
          <div>
            <h2>Entry check preview</h2>
            <p>Start from the trip, then review the policy path.</p>
          </div>
          <span class="vm-badge">Source-backed</span>
        </div>
        <div class="vm-field-stack">
          <div class="vm-field"><label>Passport</label><strong>United States</strong></div>
          <div class="vm-field"><label>Purpose</label><strong>Transit and short visit</strong></div>
          <div class="vm-field"><label>Route</label><strong>US -> Beijing -> Thailand</strong></div>
          <div class="vm-field"><label>Entry date</label><strong>June 18, 2026</strong></div>
        </div>
        <div class="vm-result">
          <h3>Likely paths to review</h3>
          <div class="vm-result-grid">
            <div class="vm-result-chip no">30-day visa-free: No</div>
            <div class="vm-result-chip">240h transit: Yes</div>
            <div class="vm-result-chip maybe">24h transit: Usually</div>
            <div class="vm-result-chip">Hainan: Possible</div>
          </div>
        </div>
    `,
    body
  });
}

function generateLifeIndex() {
  const lifeCards = LIFE_PAGES.map(p => card(p.title, `/life/${p.slug}.html`, p.quick)).join('\n          ');
  const body = `
      <article class="lw-article">
        <nav class="lw-breadcrumb"><a href="/">Home</a> / Life</nav>
        <h1>China Arrival and Daily Life Guides</h1>
        <p class="lead">Practical first-week guides for foreign visitors: payments, internet, maps, emergency numbers, and accommodation registration.</p>

        <section id="guides">
          <h2>Guides</h2>
          <div class="lw-card-grid">${lifeCards}</div>
        </section>
      </article>
  `;
  return layout({
    section: 'life',
    urlPath: '/life/',
    title: 'China Arrival and Daily Life Guides',
    description: 'Practical China arrival guides for foreigners: payment, eSIM, maps, emergency numbers, and hotel registration.',
    currentHref: '/life/',
    toc: [{ id: 'guides', label: 'Guides' }],
    sources: [SOURCES.consular],
    eyebrow: 'Arrival preparation hub',
    summaryHtml: `
        <div class="vm-card-head">
          <div>
            <h2>First-week checklist</h2>
            <p>Open the guide that matches the next practical problem.</p>
          </div>
          <span class="vm-badge">Travel-ready</span>
        </div>
        <div class="vm-result">
          <h3>Most visitors should prepare these before arrival</h3>
          <div class="vm-result-grid">
            <div class="vm-result-chip">Payment app</div>
            <div class="vm-result-chip">Mobile data</div>
            <div class="vm-result-chip">Chinese address</div>
            <div class="vm-result-chip maybe">Emergency numbers</div>
          </div>
        </div>
        <div class="vm-actions" style="margin-top:16px;">
          <a class="vm-button primary" href="/#tools">Open tools</a>
          <a class="vm-button" href="/life/pay-in-china-as-foreigner.html">Payment guide</a>
        </div>
    `,
    body
  });
}

function sitemapXml(paths) {
  const urls = Array.from(new Set(paths)).map(urlPath => {
    const priority = urlPath === '/' ? '1.00' : urlPath.includes('#') ? '0.70' : '0.80';
    return `  <url>
    <loc>${SITE}${urlPath}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${urlPath.includes('#') ? 'monthly' : 'weekly'}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function main() {
  ensureDir('visa');
  ensureDir('life');

  const pages = [
    ...COUNTRY_PAGES.map(generateCountryPage),
    ...PORT_PAGES.map(generatePortPage),
    ...ROUTE_PAGES.map(generateRoutePage),
    ...LIFE_PAGES.map(generateLifePage)
  ];

  for (const page of pages) writeFile(page.rel, page.html);
  writeFile('visa/index.html', generateVisaIndex(pages));
  writeFile('life/index.html', generateLifeIndex());

  const coreVisa = [
    '/visa/',
    '/visa/visa-free-entry.html',
    '/visa/240-hour-transit-visa.html',
    '/visa/24-hour-transit-visa.html',
    '/visa/hainan-visa-free.html',
    '/visa/cruise-visa-free.html',
    '/visa/visa-types-comparison.html',
    '/visa/residence-permit.html',
    '/visa/permanent-residence.html',
    '/visa/arrival-card.html',
    '/visa/entry-medical-exam.html',
    '/visa/visa-extension-overstay.html'
  ];
  const sitemapPaths = [
    '/',
    '/#tools',
    '/#law',
    '/#calculator',
    '/#stay',
    '/#timezone',
    '/#currency',
    '/#phrasebook',
    '/#phrases',
    '/about.html',
    ...coreVisa,
    ...pages.map(p => p.urlPath),
    '/life/',
    '/legal/',
    '/legal/questions/',
    '/legal/questions/can-i-work-on-tourist-visa.html',
    '/legal/questions/what-happens-if-i-overstay.html',
    '/legal/questions/do-i-need-to-register-my-address.html',
    '/legal/questions/what-if-i-lose-my-passport.html',
    '/legal/questions/can-police-check-my-passport.html',
    '/legal/questions/can-foreigners-get-married-in-china.html',
    '/legal/laws-for-foreigners/',
    '/legal/laws-for-foreigners/exit-entry-administration-law.html',
    '/legal/laws-for-foreigners/foreigner-accommodation-registration.html',
    '/legal/laws-for-foreigners/nationality-law.html',
    '/legal/laws-for-foreigners/work-permit-and-illegal-employment.html',
    '/legal/laws-for-foreigners/public-security-key-articles.html',
    '/legal/library/',
    '/legal/library/civil-code.html',
    '/legal/library/public-security-administration-punishments-law.html'
  ];
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemapXml(sitemapPaths), 'utf8');
  console.log(`Generated ${pages.length + 2} pages and sitemap.xml`);
}

main();
