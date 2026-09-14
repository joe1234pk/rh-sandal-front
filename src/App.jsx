import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { siteConfig } from './config';
import { trackPageView } from './analytics';
import { marketingSearch } from './marketing';

const Home = lazy(() => import('./pages/Home'));
const Catalog = lazy(() => import('./pages/Catalog'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const BecomeAgent = lazy(() => import('./pages/BecomeAgent'));

function AnalyticsPageView() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  return null;
}

function NotFound() {
  const location = useLocation();
  const catalogUrl = `/catalog${marketingSearch(location.search)}`;

  return <section className="section-shell"><p className="eyebrow">404 / Page not found</p><h1>That page<br /><em>has moved.</em></h1><a className="button button-dark" href={catalogUrl}>Browse the catalog <span>↗</span></a></section>;
}

export function AppContent({ pages }) {
  const { Home: HomePage, Catalog: CatalogPage, ProductDetail: ProductDetailPage, AboutUs: AboutUsPage, BecomeAgent: BecomeAgentPage } = pages;

  return <div className={`app-shell theme-${siteConfig.theme}`}><Navbar /><main><Suspense fallback={<section className="section-shell" aria-busy="true"><p className="eyebrow">Loading catalog</p></section>}><Routes><Route path="/" element={<CatalogPage />} /><Route path="/home" element={<HomePage />} /><Route path="/catalog" element={<CatalogPage />} /><Route path="/product/:id" element={<ProductDetailPage />} /><Route path="/about" element={<AboutUsPage />} /><Route path="/agent" element={<BecomeAgentPage />} /><Route path="*" element={<NotFound />} /></Routes></Suspense></main><Footer /></div>;
}

const clientPages = { Home, Catalog, ProductDetail, AboutUs, BecomeAgent };

export default function App() {
  return <BrowserRouter><AnalyticsPageView /><AppContent pages={clientPages} /></BrowserRouter>;
}
