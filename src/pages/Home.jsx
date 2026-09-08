import { Link } from 'react-router-dom';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard';
import WhatsAppButton from '../components/WhatsAppButton';
import { assetUrl, siteConfig } from '../config';

export default function Home() {
  const featured = products.filter((product) => product.featured);
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Direct factory / since 2008</p>
          <h1>Footwear that<br /><em>moves markets.</em></h1>
          <p className="hero-description">Reliable, well-designed sandals made for the pace, heat and ambition of Africa and the Middle East.</p>
          <div className="hero-actions"><Link className="button button-dark" to="/catalog">Explore the catalog <span>↗</span></Link><WhatsAppButton /></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-frame"><img src={assetUrl(siteConfig.heroImage)} alt="Classic leather slide sandal" loading="lazy" /></div>
          <div className="hero-stamp">RH<br /><span>FACTORY<br />DIRECT</span></div>
          <div className="hero-note"><span>01</span><p>Built for<br />everyday volume</p></div>
        </div>
      </section>
      <section className="trust-strip"><span>Designed in-house</span><span>Low-impact logistics</span><span>Wholesale-ready MOQs</span><span>R2 image delivery</span></section>
      <section className="featured-section section-shell">
        <div className="section-heading"><div><p className="eyebrow">The current edit</p><h2>Made to be<br /><em>chosen.</em></h2></div><Link className="text-link" to="/catalog">View all models <span>↗</span></Link></div>
        <div className="product-grid">{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>
      <section className="statement-section"><p className="eyebrow">A better way to source</p><h2>Thoughtful design.<br /><em>Industrial discipline.</em></h2><Link className="button button-light" to="/about">Meet the factory <span>↗</span></Link></section>
    </>
  );
}
