import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppContent } from './App';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import AboutUs from './pages/AboutUs';
import BecomeAgent from './pages/BecomeAgent';

const pages = { Home, Catalog, ProductDetail, AboutUs, BecomeAgent };

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <AppContent pages={pages} />
    </StaticRouter>,
  );
}