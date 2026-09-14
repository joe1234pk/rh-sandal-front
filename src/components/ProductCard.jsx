import { Link } from 'react-router-dom';
import WhatsAppButton from './WhatsAppButton';
import { assetUrl } from '../config';
import { getTierLabel } from '../data/catalogTaxonomy';

export default function ProductCard({ product, priority = false }) {
  const modelName = product.name || `Model ${product.id}`;

  return (
    <article className="product-card">
      <Link className="product-image-wrap" to={`/product/${product.id}`} aria-label={`View ${modelName}`}>
        <img src={assetUrl(product.image)} alt={modelName} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
        <span className="product-category">{getTierLabel('tier1', product.tier1)} / {getTierLabel('tier2', product.tier2)}</span>
        <span className="image-arrow">↗</span>
      </Link>
      <div className="product-info">
        <div className="product-title-row"><span className="product-id">{product.id}</span><span className="product-moq">MOQ {product.moq}</span></div>
        <h2><Link to={`/product/${product.id}`}>{modelName}</Link></h2>
        <p>{product.description}</p>
        <WhatsAppButton productId={product.id} compact />
      </div>
    </article>
  );
}
