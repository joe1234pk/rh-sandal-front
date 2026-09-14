import { siteConfig } from './config';

const UTM_SOURCE_KEY = 'rh_utm_source';

export const marketingQueryKeys = new Set([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_id',
  'utm_term',
  'utm_content',
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'msclkid',
]);

export function marketingSearch(search = '') {
  const input = new URLSearchParams(search);
  const output = new URLSearchParams();

  for (const [key, value] of input) {
    if (marketingQueryKeys.has(key.toLowerCase())) output.append(key, value);
  }

  const query = output.toString();
  return query ? `?${query}` : '';
}

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
