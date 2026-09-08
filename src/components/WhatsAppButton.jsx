import { FaWhatsapp } from 'react-icons/fa';
import { siteConfig } from '../config';

export default function WhatsAppButton({ productId, compact = false }) {
  const message = productId
    ? siteConfig.whatsappProductMessage.replace('{productId}', productId)
    : siteConfig.whatsappDefaultMessage;
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a className={`whatsapp-link${compact ? ' compact' : ''}`} href={href} target="_blank" rel="noreferrer" aria-label={`${compact ? 'WhatsApp' : 'Chat on WhatsApp'}`}>
      <span className="whatsapp-mark"><FaWhatsapp aria-hidden="true" /></span>
      <span>{compact ? 'WhatsApp' : 'Chat on WhatsApp'}</span>
    </a>
  );
}
