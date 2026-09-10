import { siteConfig } from './config';

let isInitialized = false;

function send(...args) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
}

export function initializeAnalytics() {
  const measurementId = siteConfig.gaMeasurementId;

  if (!measurementId || typeof document === 'undefined' || isInitialized) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  send('js', new Date());
  send('config', measurementId, { send_page_view: false });
  isInitialized = true;
}

export function trackPageView(path) {
  if (!siteConfig.gaMeasurementId) return;

  send('event', 'page_view', {
    page_title: document.title,
    page_location: `${window.location.origin}${path}`,
    page_path: path,
  });
}

export function trackEvent(name, parameters = {}) {
  if (!siteConfig.gaMeasurementId) return;
  send('event', name, parameters);
}