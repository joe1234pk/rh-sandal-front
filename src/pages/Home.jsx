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
          <p className="eyebrow">Data-proven designs / Guangzhou factory</p>
          <h1>Proven to sell.<br /><em>Made at source.</em></h1>
          <p className="hero-description">Source fast-selling sandals with less guesswork. Our proven designs, premium finishing and direct factory communication help your business move with confidence in Africa and the Gulf.</p>
          <div className="hero-actions">
            <Link className="button button-dark" to="/catalog">Explore the catalog <span>↗</span></Link>
            <WhatsAppButton label="Talk to the factory" />
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-frame">
            <img src={assetUrl(siteConfig.heroImage)} alt="Classic leather slide sandal" loading="lazy" />
          </div>
          <div className="hero-stamp">RH<br /><span>FACTORY<br />DIRECT</span></div>
          <div className="hero-note"><span>01</span><p>Proven designs<br />for fast turnover</p></div>
        </div>
      </section>
      <section className="trust-strip">
        <span>Data-proven designs</span>
        <span>Direct factory communication</span>
        <span>Premium materials & finishing</span>
        <span>Built for repeat demand</span>
      </section>
      <section className="featured-section section-shell">
        <div className="section-heading">
          <div><p className="eyebrow">Proven collection</p><h2>Chosen by data.<br /><em>Ready to sell.</em></h2></div>
          <Link className="text-link" to="/catalog">View all models <span>↗</span></Link>
        </div>
        <div className="product-grid">
          {featured.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
      <section className="statement-section">
        <p className="eyebrow">The direct factory advantage</p>
        <h2>Talk direct.<br /><em>Order with certainty.</em></h2>
        <Link className="button button-light" to="/about">Meet the factory <span>↗</span></Link>
      </section>
    </>
  );
}
