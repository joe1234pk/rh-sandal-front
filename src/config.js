const env = import.meta.env;

export const siteConfig = {
  brandName: env.VITE_BRAND_NAME || 'RH Luxury Footwear',
  brandShortName: env.VITE_BRAND_SHORT_NAME || 'RH',
  contactEmail: env.VITE_CONTACT_EMAIL || 'info@rhluxuryfootwear.com',
  whatsappNumber: (env.VITE_WHATSAPP_NUMBER || '8613800000000').replace(/\D/g, ''),
  assetBaseUrl: (env.VITE_ASSET_BASE_URL || 'https://assets.rhluxuryfootwear.com').replace(/\/$/, ''),
  catalogYear: env.VITE_CATALOG_YEAR || new Date().getFullYear().toString(),
  visibleTier1: env.VITE_VISIBLE_TIER1 || 'Sandals',
  allCollectionsLabel: env.VITE_ALL_COLLECTIONS_LABEL || 'All collections',
  heroImage: env.VITE_HERO_IMAGE || 'sl-001.webp',
  whatsappDefaultMessage: env.VITE_WHATSAPP_DEFAULT_MESSAGE || 'Hi, I would like to discuss a wholesale footwear order.',
  whatsappProductMessage: env.VITE_WHATSAPP_PRODUCT_MESSAGE || 'Hi, I am interested in Model: {productId}',
};

export function assetUrl(path) {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.assetBaseUrl}/${path.replace(/^\/+/, '')}`;
}
