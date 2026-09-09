import { Link } from 'react-router-dom';
import { siteConfig } from '../config';
import WhatsAppButton from './WhatsAppButton';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link className="brand footer-brand" to="/"><span className="brand-mark">{siteConfig.brandShortName}</span> <span>{siteConfig.brandName.replace(`${siteConfig.brandShortName} `, '')}</span></Link>
          <p>Factory-made footwear for markets<br />that move with purpose.</p>
        </div>
        <div className="footer-links">
          <Link to="/catalog">Browse catalog</Link>
          <Link to="/about">About us</Link>
        </div>
        <div className="footer-contact"><a className="footer-email" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail} <span>↗</span></a><WhatsAppButton compact /></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.brandName}</span><span>Made at source / built to last</span></div>
    </footer>
  );
}
