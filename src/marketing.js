import { siteConfig } from './config';

const UTM_SOURCE_KEY = 'rh_utm_source';

export function captureUtmSource() {
  if (typeof window === 'undefined') return '';

  const source = new URLSearchParams(window.location.search).get('utm_source');
  if (source) {
    sessionStorage.setItem(UTM_SOURCE_KEY, source.toLowerCase());
    return source.toLowerCase();
  }

  return sessionStorage.getItem(UTM_SOURCE_KEY) || '';
}

export function getUtmSource() {
  if (typeof window === 'undefined') return '';
  return sessionStorage.getItem(UTM_SOURCE_KEY) || '';
}

export function campaignUrl(source, path = '/catalog') {
  const url = new URL(path, siteConfig.siteUrl);
  url.searchParams.set('utm_source', source);
  return url.toString();
}

export const campaignUrls = {
  google: campaignUrl('google'),
  whatsapp: campaignUrl('whatsapp'),
  facebook: campaignUrl('facebook'),
};
