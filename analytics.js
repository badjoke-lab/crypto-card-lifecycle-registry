(() => {
  const measurementId = document.querySelector('meta[name="ga4-measurement-id"]')?.content?.trim();
  if (!measurementId) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-analytics-event]');
    if (!target) return;
    window.gtag('event', target.dataset.analyticsEvent, {
      source: target.dataset.analyticsSource || undefined,
      label: target.dataset.analyticsLabel || target.textContent?.trim() || undefined,
      link_url: target.href || undefined,
    });
  });

  window.cclrTrack = (eventName, params = {}) => window.gtag('event', eventName, params);
})();
