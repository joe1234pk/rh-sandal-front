import { useEffect, useRef, useState } from 'react';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard';
import WhatsAppButton from '../components/WhatsAppButton';
import { siteConfig } from '../config';
import { getTier2Keys, getTierLabel } from '../data/catalogTaxonomy';

const PRODUCTS_PER_BATCH = 12;

export default function Catalog() {
  const [tier1, setTier1] = useState(siteConfig.visibleTier1);
  const [tier2, setTier2] = useState(siteConfig.allCollectionsLabel);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_BATCH);
  const loadMoreRef = useRef(null);
  const isLoadingMore = useRef(false);
  const tier1Categories = [siteConfig.visibleTier1];
  const tier2Categories = [siteConfig.allCollectionsLabel, ...getTier2Keys(tier1).filter((key) => products.some((product) => product.tier1 === tier1 && product.tier2 === key))];
  const visibleProducts = products.filter((product) => product.tier1 === tier1 && (tier2 === siteConfig.allCollectionsLabel || product.tier2 === tier2));
  const productsToRender = visibleProducts.slice(0, visibleCount);
  const hasMoreProducts = productsToRender.length < visibleProducts.length;

  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_BATCH);
    isLoadingMore.current = false;
  }, [tier1, tier2]);

  useEffect(() => {
    const loadMore = loadMoreRef.current;
    if (!loadMore || !hasMoreProducts) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        isLoadingMore.current = false;
        return;
      }
      if (isLoadingMore.current) return;

      isLoadingMore.current = true;
      setVisibleCount((current) => Math.min(current + PRODUCTS_PER_BATCH, visibleProducts.length));
    }, { rootMargin: '300px 0px', threshold: 1 });

    observer.observe(loadMore);
    return () => {
      observer.disconnect();
    };
  }, [hasMoreProducts, visibleProducts.length]);

  function showMoreProducts() {
    isLoadingMore.current = true;
    setVisibleCount((current) => Math.min(current + PRODUCTS_PER_BATCH, visibleProducts.length));
  }

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
        {productsToRender.map((product, index) => <ProductCard key={product.id} product={product} priority={index === 0} />)}
      </div>
      {hasMoreProducts && (
        <div className="catalog-load-more">
          <div ref={loadMoreRef} aria-hidden="true" />
          <button className="button button-dark" type="button" onClick={showMoreProducts}>
            Show more <span>↓</span>
          </button>
          <p>{visibleProducts.length - productsToRender.length} models remaining</p>
        </div>
      )}
    </section>
  );
}
