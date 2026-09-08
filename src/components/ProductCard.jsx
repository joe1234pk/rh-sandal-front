import { Link } from 'react-router-dom';
import WhatsAppButton from './WhatsAppButton';
import { assetUrl } from '../config';

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link className="product-image-wrap" to={`/product/${product.id}`}>
        <img src={assetUrl(product.image)} alt={product.name} loading="lazy" />
        <span className="product-category">{product.tier1} / {product.tier2}</span>
        <span className="image-arrow">↗</span>
      </Link>
      <div className="product-info">
        <div className="product-title-row"><span className="product-id">{product.id}</span><span className="product-moq">MOQ {product.moq}</span></div>
        <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <p>{product.description}</p>
        <WhatsAppButton productId={product.id} compact />
      </div>
    </article>
  );
}
