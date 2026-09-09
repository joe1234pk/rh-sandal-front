import { useState } from 'react';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard';
import WhatsAppButton from '../components/WhatsAppButton';
import { siteConfig } from '../config';
import { getTier2Keys, getTierLabel } from '../data/catalogTaxonomy';

export default function Catalog() {
  const [tier1, setTier1] = useState(siteConfig.visibleTier1);
  const [tier2, setTier2] = useState(siteConfig.allCollectionsLabel);
  const tier1Categories = [siteConfig.visibleTier1];
  const tier2Categories = [siteConfig.allCollectionsLabel, ...getTier2Keys(tier1).filter((key) => products.some((product) => product.tier1 === tier1 && product.tier2 === key))];
  const visibleProducts = products.filter((product) => product.tier1 === tier1 && (tier2 === siteConfig.allCollectionsLabel || product.tier2 === tier2));

  function selectTier1(category) {
    setTier1(category);
    setTier2(siteConfig.allCollectionsLabel);
  }

  return (
    <section className="catalog-page section-shell">
      <div className="catalog-intro">
        <div>
          <p className="eyebrow">Guangzhou factory catalog / {siteConfig.catalogYear}</p>
          <h1>Premium sandals.<br /><em>Chosen to move.</em></h1>
        </div>
        <div className="catalog-intro-side">
          <p>Explore premium sandals selected for African and Gulf markets. Every style is built for confident retail, premium presentation and dependable supply.</p>
          <WhatsAppButton />
        </div>
      </div>
      <div className="catalog-controls">
        <div className="tier-control">
          <span className="tier-label">01 / Product category</span>
          <div className="tier-options" role="group" aria-label="Choose product category">
            {tier1Categories.map((item) => <button key={item} className={tier1 === item ? 'selected' : ''} onClick={() => selectTier1(item)}>{getTierLabel('tier1', item)}</button>)}
          </div>
        </div>
        <div className="tier-control">
          <span className="tier-label">02 / Collection</span>
          <div className="tier-options collection-options" role="group" aria-label="Choose collection">
            {tier2Categories.map((item) => <button key={item} className={tier2 === item ? 'selected' : ''} onClick={() => setTier2(item)}>{item === siteConfig.allCollectionsLabel ? item : getTierLabel('tier2', item)}</button>)}
          </div>
        </div>
      </div>
      <div className="catalog-result-bar">
        <span>{getTierLabel('tier1', tier1)} / {tier2 === siteConfig.allCollectionsLabel ? tier2 : getTierLabel('tier2', tier2)}</span>
        <span>{visibleProducts.length} {visibleProducts.length === 1 ? 'model' : 'models'}</span>
      </div>
      <div className="product-grid catalog-grid">
        {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
