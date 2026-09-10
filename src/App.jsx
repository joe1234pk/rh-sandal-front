import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { siteConfig } from './config';
import { trackPageView } from './analytics';

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
  return <section className="section-shell"><p className="eyebrow">404 / Page not found</p><h1>That page<br /><em>has moved.</em></h1><a className="button button-dark" href="/catalog">Browse the catalog <span>↗</span></a></section>;
}

export default function App() {
  return <BrowserRouter><AnalyticsPageView /><div className={`app-shell theme-${siteConfig.theme}`}><Navbar /><main><Suspense fallback={<section className="section-shell" aria-busy="true"><p className="eyebrow">Loading catalog</p></section>}><Routes><Route path="/" element={<Navigate replace to="/catalog" />} /><Route path="/home" element={<Home />} /><Route path="/catalog" element={<Catalog />} /><Route path="/product/:id" element={<ProductDetail />} /><Route path="/about" element={<AboutUs />} /><Route path="/agent" element={<BecomeAgent />} /><Route path="*" element={<NotFound />} /></Routes></Suspense></main><Footer /></div></BrowserRouter>;
}
