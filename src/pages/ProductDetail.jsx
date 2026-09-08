import { Link, useParams } from 'react-router-dom';
import products from '../data/products.json';
import WhatsAppButton from '../components/WhatsAppButton';
import { assetUrl } from '../config';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  if (!product) return <section className="section-shell"><p className="eyebrow">Product / Not found</p><h1>That model<br /><em>is unavailable.</em></h1><Link className="button button-dark" to="/catalog">Browse the catalog <span>↗</span></Link></section>;
  return <section className="detail-page section-shell"><Link className="back-link" to="/catalog">← Back to catalog</Link><div className="detail-layout"><div className="detail-image"><img src={assetUrl(product.image)} alt={product.name} loading="lazy" /></div><div className="detail-copy"><p className="eyebrow">{product.tier1} / {product.tier2} / {product.id}</p><h1>{product.name}</h1><p className="detail-description">{product.description}</p><dl className="spec-list"><div><dt>Collection</dt><dd>{product.tier2}</dd></div><div><dt>Material</dt><dd>{product.material}</dd></div><div><dt>Minimum order</dt><dd>{product.moq}</dd></div><div><dt>Production</dt><dd>Made to order</dd></div></dl><WhatsAppButton productId={product.id} /><p className="detail-note">Get pricing, color options and lead times directly from our sales team.</p></div></div></section>;
}
