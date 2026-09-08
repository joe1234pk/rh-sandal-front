import { NavLink, Link } from 'react-router-dom';
import { siteConfig } from '../config';

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label={`${siteConfig.brandName} home`}>
          <span className="brand-mark">{siteConfig.brandShortName}</span>
          <span>{siteConfig.brandName.replace(`${siteConfig.brandShortName} `, '')}</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/catalog">Catalog</NavLink>
        </nav>
      </div>
    </header>
  );
}
