(function () {
  'use strict';

  const config = {
    gaMeasurementId: 'G-YY4T3B3MHR',
    clarityProjectId: '',
    linkedDomains: ['laowaitown.com', 'www.laowaitown.com', 'laowaitown.cn', 'www.laowaitown.cn']
  };

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  function loadScript(src, async = true) {
    if (!src || document.querySelector(`script[src="${src}"]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    document.head.appendChild(script);
  }

  function pathSection() {
    const path = window.location.pathname;
    if (path.startsWith('/visa/')) return 'visa';
    if (path.startsWith('/life/')) return 'life';
    if (path.startsWith('/legal/')) return 'legal';
    if (path.startsWith('/about')) return 'about';
    return 'home';
  }

  function baseParams(params) {
    return Object.assign({
      page_path: window.location.pathname,
      page_title: document.title,
      page_section: pathSection()
    }, params || {});
  }

  function track(eventName, params) {
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, baseParams(params));
      }
    } catch (error) {}
  }

  window.__track = track;
  window.__lwAnalyticsConfig = config;

  if (config.gaMeasurementId) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.gaMeasurementId)}`);
    window.gtag('js', new Date());
    window.gtag('config', config.gaMeasurementId, {
      linker: { domains: config.linkedDomains },
      anonymize_ip: true
    });
  }

  if (config.clarityProjectId) {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r);
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', config.clarityProjectId);
  }

  function trackAnchor(anchor) {
    const href = anchor.getAttribute('href') || '';
    if (!href || href.startsWith('#')) return;

    const text = (anchor.textContent || '').trim().slice(0, 80);
    if (href.startsWith('mailto:')) {
      track('email_click', { link_url: href, link_text: text });
      return;
    }
    if (href.startsWith('tel:')) {
      track('phone_click', { link_url: href, link_text: text });
      return;
    }

    const url = new URL(href, window.location.href);
    const params = {
      link_url: url.href,
      link_text: text,
      link_domain: url.hostname
    };

    if (url.hostname && url.hostname !== window.location.hostname) {
      const sourceHost = anchor.closest('.lw-sources, .vm-sources, #lw-sources');
      track(sourceHost ? 'official_source_click' : 'outbound_click', params);
      return;
    }

    if (anchor.matches('.vm-button, .vm-top-cta, .lw-cta, .lw-link-btn, .lw-law-preview, .lw-card')) {
      track('cta_click', Object.assign(params, {
        cta_location: anchor.closest('header') ? 'header' : anchor.closest('footer') ? 'footer' : 'body'
      }));
    }
  }

  function initAutoTracking() {
    document.addEventListener('click', event => {
      const anchor = event.target.closest && event.target.closest('a[href]');
      if (anchor) trackAnchor(anchor);
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAutoTracking);
  } else {
    initAutoTracking();
  }
})();
