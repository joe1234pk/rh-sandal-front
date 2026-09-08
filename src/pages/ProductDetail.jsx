import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import products from '../data/products.json';
import WhatsAppButton from '../components/WhatsAppButton';
import { assetUrl } from '../config';
import { getTierLabel } from '../data/catalogTaxonomy';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const gallery = product ? [product.image, ...(product.gallery || [])] : [];
  const [selectedImage, setSelectedImage] = useState(gallery[0] || '');
  useEffect(() => setSelectedImage(gallery[0] || ''), [id]);
  if (!product) return <section className="section-shell"><p className="eyebrow">Product / Not found</p><h1>That model<br /><em>is unavailable.</em></h1><Link className="button button-dark" to="/catalog">Browse the catalog <span>↗</span></Link></section>;
  return <section className="detail-page section-shell"><Link className="back-link" to="/catalog">← Back to catalog</Link><div className="detail-layout"><div><div className="detail-image"><img src={assetUrl(selectedImage)} alt={product.name} /></div>{gallery.length > 1 && <div className="detail-gallery" aria-label="Product image gallery">{gallery.map((image, index) => <button key={image} className={selectedImage === image ? 'selected' : ''} onClick={() => setSelectedImage(image)} aria-label={`View ${product.name} image ${index + 1}`}><img src={assetUrl(image)} alt="" loading="lazy" /></button>)}</div>}</div><div className="detail-copy"><p className="eyebrow">{getTierLabel('tier1', product.tier1)} / {getTierLabel('tier2', product.tier2)} / {product.id}</p><h1>{product.name}</h1><p className="detail-description">{product.description}</p><dl className="spec-list"><div><dt>Collection</dt><dd>{getTierLabel('tier2', product.tier2)}</dd></div><div><dt>Material</dt><dd>{product.material}</dd></div><div><dt>Minimum order</dt><dd>{product.moq}</dd></div><div><dt>Production</dt><dd>Made to order</dd></div></dl><WhatsAppButton productId={product.id} /><p className="detail-note">Get pricing, color options and lead times directly from our sales team.</p></div></div></section>;
}
