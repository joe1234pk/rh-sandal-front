import { FaWhatsapp } from 'react-icons/fa';
import { siteConfig } from '../config';
import { trackEvent } from '../analytics';

export default function WhatsAppButton({ productId, compact = false, label }) {
  const message = productId
    ? siteConfig.whatsappProductMessage.replace('{productId}', productId)
    : siteConfig.whatsappDefaultMessage;
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
  const linkLabel = label || (compact ? 'WhatsApp' : 'Chat on WhatsApp');

  function handleClick() {
    trackEvent('whatsapp_click', { product_id: productId || undefined });
  }

  return (
    <a className={`whatsapp-link${compact ? ' compact' : ''}`} href={href} target="_blank" rel="noreferrer" aria-label={linkLabel} onClick={handleClick}>
      <span className="whatsapp-mark"><FaWhatsapp aria-hidden="true" /></span>
      <span>{linkLabel}</span>
    </a>
  );
}
