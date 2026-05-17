/* =========================================================
   LAOWAITOWN Navigation Data
   Six top categories + sub-page lists for left sidebar
   Used by sub-pages to render unified navigation
   ========================================================= */

window.LWNavData = {
    categories: [
        { id: 'visa',      label: 'Visa',     href: '/visa/',      desc: 'Visa-free entry, transit, residence' },
        { id: 'life',      label: 'Life',     href: '/life/',      desc: 'SIM, payment, transport, housing' },
        { id: 'travel',    label: 'Travel',   href: '/travel/',    desc: 'Hotels, trains, attractions' },
        { id: 'business',  label: 'Business', href: '/business/',  desc: 'Trade, jobs, company setup' },
        { id: 'education', label: 'Study',    href: '/education/', desc: 'HSK, scholarships, schools' },
        { id: 'legal',     label: 'Legal',    href: '/legal/',     desc: 'Laws, IP, lawyers' }
    ],

    /* Visa subpages — used on /visa/* pages for left sidebar */
    visa: [
        { href: '/visa/visa-free-entry.html',         label: 'Visa-Free Entry' },
        { href: '/visa/240-hour-transit-visa.html',   label: '240h Transit Visa' },
        { href: '/visa/24-hour-transit-visa.html',    label: '24h Transit Visa' },
        { href: '/visa/hainan-visa-free.html',        label: 'Hainan 30-Day' },
        { href: '/visa/cruise-visa-free.html',        label: 'Cruise Visa-Free' },
        { href: '/visa/visa-types-comparison.html',   label: 'Visa Types L/M/Z/X/S/Q/K' },
        { href: '/visa/residence-permit.html',        label: 'Residence Permit' },
        { href: '/visa/permanent-residence.html',     label: 'Permanent Residence' },
        { href: '/visa/arrival-card.html',            label: 'Arrival Card' },
        { href: '/visa/entry-medical-exam.html',      label: 'Entry Medical Exam' },
        { href: '/visa/visa-extension-overstay.html', label: 'Extension & Overstay' }
    ]
};

/* =========================================================
   Policy Status Data (per page) — 3 states only
   status: 'active' | 'recently-updated' | 'outdated'
     - active           : policy in effect and stable (default if effectiveSince > 365 days ago)
     - recently-updated : policy changed within last 365 days (auto if effectiveSince <= 365 days ago)
     - outdated         : policy discontinued / under review / superseded — manually set
   You can override the auto rule by setting `status` explicitly.
   changelog: list of {date, text}; empty array hides the block.
   sources: array of plain-text source names (NO hyperlinks — see decision log)
   ========================================================= */
window.LWPolicyStatus = {
    'visa-240-hour-transit': {
        effectiveSince: '2024-12-17',
        changelog: [
            { date: '2024-12-17', text: 'Extended from 144 hours to 240 hours', isNew: true },
            { date: '2024-12-17', text: 'Ports expanded from 53 to 60+ across 24 provinces', isNew: true },
            { date: '2023-11-01', text: 'Country list updated to 54' }
        ],
        sources: [
            'National Immigration Administration (NIA)',
            'China Consular Service'
        ]
    },

    'visa-visa-free-entry': {
        effectiveSince: '2024-11-01',
        changelog: [
            { date: '2024-11-01', text: 'Country list expanded to 50' },
            { date: '2024-07-01', text: 'Stay duration extended from 15 to 30 days' },
            { date: '2023-12-01', text: 'Initial unilateral visa-free pilot launched' }
        ],
        sources: [
            'National Immigration Administration (NIA)',
            'Ministry of Foreign Affairs (MFA)',
            'China Consular Service'
        ]
    },

    'visa-24-hour-transit': {
        effectiveSince: '1990-01-01',
        changelog: [
            { date: '1990-01-01', text: 'Long-standing universal 24-hour transit policy' }
        ],
        sources: [
            'National Immigration Administration (NIA)',
            'China Consular Service'
        ]
    },

    'visa-hainan-visa-free': {
        effectiveSince: '2018-05-01',
        changelog: [
            { date: '2024-02-09', text: 'Country list expanded to 59 nations' },
            { date: '2018-05-01', text: 'Stay duration expanded to 30 days for all eligible nationals' }
        ],
        sources: [
            'National Immigration Administration (NIA)',
            'Hainan Provincial Government'
        ]
    },

    'visa-cruise-visa-free': {
        effectiveSince: '2024-05-15',
        changelog: [
            { date: '2024-05-15', text: 'Initial 15-day cruise tourism visa-free policy launched at 13 ports' }
        ],
        sources: [
            'National Immigration Administration (NIA)',
            'State Council Information Office'
        ]
    },

    'visa-types-comparison': {
        effectiveSince: '2025-10-01',
        changelog: [
            { date: '2025-10-01', text: 'New K visa added for young foreign STEM talent (State Council decision Aug 2025)', isNew: true },
            { date: '2024-09-01', text: 'M visa validity extended; L visa application process simplified' }
        ],
        sources: [
            'National Immigration Administration (NIA)',
            'Ministry of Foreign Affairs (MFA) Consular Department',
            'State Council Gazette'
        ]
    },

    'visa-residence-permit': {
        effectiveSince: '2024-07-01',
        changelog: [
            { date: '2024-07-01', text: 'Online pre-application extended to all major cities' }
        ],
        sources: [
            'National Immigration Administration (NIA)',
            'Public Security Bureau Exit & Entry Administration (EEA)'
        ]
    },

    'visa-permanent-residence': {
        effectiveSince: '2024-12-01',
        changelog: [
            { date: '2024-12-01', text: 'New 5-year validity format introduced; foreign-talent criteria relaxed' }
        ],
        sources: [
            'National Immigration Administration (NIA)',
            'State Council'
        ]
    },

    'visa-arrival-card': {
        effectiveSince: '2025-11-20',
        changelog: [
            { date: '2025-11-20', text: 'NIA online arrival card filling system launched (s.nia.gov.cn) — fill in 24 h before entry, no more paper at most ports', isNew: true },
            { date: '2023-08-01', text: 'Customs digital health declaration applet updated for fingertip filing' }
        ],
        sources: [
            'National Immigration Administration (NIA)',
            'General Administration of Customs (GAC)',
            'NIA Online Arrival Card portal (s.nia.gov.cn)'
        ]
    },

    'visa-entry-medical-exam': {
        effectiveSince: '2025-11-01',
        changelog: [
            { date: '2025-11-01', text: 'Foreigner Physical Examination Form template republished by Chinese embassies (PDF, 2025-11)', isNew: true },
            { date: '2024-01-01', text: 'List of approved ITHC medical institutions updated' }
        ],
        sources: [
            'General Administration of Customs (GAC) International Travel Healthcare Centers',
            'National Health Commission (NHC)',
            'Chinese Embassy Foreigner Physical Examination Form (2025-11)'
        ]
    },

    'visa-extension-overstay': {
        effectiveSince: '2024-05-01',
        changelog: [
            { date: '2024-05-01', text: 'Overstay fine structure clarified (¥500/day, capped at ¥10,000); extension window unified' }
        ],
        sources: [
            'National Immigration Administration (NIA)',
            'Public Security Bureau Exit & Entry Administration (EEA)'
        ]
    }
    /* Other pages will be added as they are built */
};

/* Disclaimer shown on every sub-page (legal protection from "impersonation" claims) */
window.LWDisclaimer =
    'LAOWAITOWN is an independent reference site. We curate publicly available official ' +
    'announcements but are not affiliated with, endorsed by, or operated on behalf of any ' +
    'Chinese government authority. Always verify with the Chinese embassy or consulate before travel.';

/* =========================================================
   Render policy status: pill, changelog, sources + disclaimer
   Call: window.LWRenderStatus('visa-240-hour-transit');
   Pure data-driven — empty fields are skipped silently.
   ========================================================= */
window.LWRenderStatus = function (pageId) {
    const data = (window.LWPolicyStatus || {})[pageId];
    if (!data) return;

    /* Auto-classify by effectiveSince if status not explicitly set */
    let status = data.status;
    if (!status) {
        if (data.effectiveSince) {
            const days = Math.floor((Date.now() - new Date(data.effectiveSince).getTime()) / 86400000);
            status = days <= 365 ? 'recently-updated' : 'active';
        } else {
            status = 'active';
        }
    }
    const statusMap = {
        'active':           { cls: '',         label: 'Active' },
        'recently-updated': { cls: 'recent',   label: 'Recently updated' },
        'outdated':         { cls: 'outdated', label: 'Outdated · do not rely on' }
    };
    const s = statusMap[status] || statusMap.active;

    /* 1. Pill next to H1 */
    const pillHost = document.getElementById('lw-status-pill');
    if (pillHost) {
        const since = data.effectiveSince ? `Effective since ${data.effectiveSince}` : '';
        pillHost.className = 'lw-status-pill' + (s.cls ? ' ' + s.cls : '');
        pillHost.innerHTML = `<span class="dot"></span>${s.label}${since ? ' · ' + since : ''}`;
        pillHost.style.display = 'inline-flex';
    }

    /* 2. What's new changelog */
    const cl = document.getElementById('lw-changelog');
    if (cl && data.changelog && data.changelog.length) {
        cl.innerHTML = `
            <h4>✏ What's new</h4>
            <ul>
                ${data.changelog.map(c =>
                    `<li class="${c.isNew ? 'new' : ''}"><time>${c.date}</time><span>${c.text}</span></li>`
                ).join('')}
            </ul>
        `;
        cl.style.display = 'block';
    }

    /* 3. Sources (plain text, no hyperlinks) + disclaimer */
    const src = document.getElementById('lw-sources');
    if (src) {
        const sourcesLine = (data.sources && data.sources.length)
            ? `<strong>Sources:</strong><span class="src-list">${data.sources.join(' · ')}</span> · <em>Cross-checked monthly against official announcements.</em>`
            : '';
        const disclaimer = window.LWDisclaimer
            ? `<span class="disclaimer">${window.LWDisclaimer}</span>`
            : '';
        if (sourcesLine || disclaimer) {
            src.innerHTML = sourcesLine + disclaimer;
            src.style.display = 'block';
        }
    }
};

/* =========================================================
   Helper: render top-nav links and side-category list
   Call after DOMContentLoaded with current page id.
   ========================================================= */
window.LWRenderNav = function (currentId) {
    const navUl = document.getElementById('lw-nav-links');
    if (navUl) {
        navUl.innerHTML = window.LWNavData.categories.map(c =>
            `<li><a href="${c.href}"${c.id === currentId ? ' aria-current="page"' : ''}>${c.label}</a></li>`
        ).join('');
    }
};

window.LWRenderSideCats = function (groupId, currentHref) {
    const wrap = document.getElementById('lw-side-cats');
    if (!wrap || !window.LWNavData[groupId]) return;
    const items = window.LWNavData[groupId];
    const groupLabel = (window.LWNavData.categories.find(c => c.id === groupId) || {}).label || groupId;
    wrap.innerHTML = `
        <h3>${groupLabel}</h3>
        <ul>
            ${items.map(it =>
                `<li><a href="${it.href}"${it.href === currentHref ? ' aria-current="page"' : ''}>${it.label}</a></li>`
            ).join('')}
        </ul>
    `;
};

/* =========================================================
   Theme toggle (light/dark) — persists in localStorage
   ========================================================= */
window.LWInitTheme = function () {
    const saved = localStorage.getItem('lw-theme');
    if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    const btn = document.getElementById('lw-theme-btn');
    if (btn) {
        const sync = () => {
            btn.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀' : '🌙';
        };
        sync();
        btn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('lw-theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('lw-theme', 'dark');
            }
            sync();
        });
    }
};

/* =========================================================
   TOC scroll-spy — highlights current section in right TOC
   ========================================================= */
window.LWInitTocSpy = function () {
    const tocLinks = document.querySelectorAll('.lw-toc a[href^="#"]');
    if (!tocLinks.length) return;
    const targets = Array.from(tocLinks)
        .map(a => document.getElementById(a.getAttribute('href').slice(1)))
        .filter(Boolean);
    const setActive = (id) => {
        tocLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    };
    const onScroll = () => {
        const top = window.scrollY + 120;
        let cur = targets[0] && targets[0].id;
        for (const t of targets) { if (t.offsetTop <= top) cur = t.id; }
        if (cur) setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
};

/* =========================================================
   Feedback widget — sends GA event, shows thanks
   ========================================================= */
window.LWInitFeedback = function (pageId) {
    document.querySelectorAll('.lw-feedback button').forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.dataset.value;
            try { if (typeof gtag === 'function') gtag('event', 'page_feedback', { page_id: pageId, value }); } catch (e) {}
            const wrap = btn.closest('.lw-feedback');
            if (wrap) wrap.innerHTML = '<span class="thanks">Thanks for your feedback!</span>';
        });
    });
};
