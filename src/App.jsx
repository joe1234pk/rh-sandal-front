import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import AboutUs from './pages/AboutUs';
import BecomeAgent from './pages/BecomeAgent';
import { siteConfig } from './config';
import { trackPageView } from './analytics';

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
  return <BrowserRouter><AnalyticsPageView /><div className={`app-shell theme-${siteConfig.theme}`}><Navbar /><main><Routes><Route path="/" element={<Navigate replace to="/catalog" />} /><Route path="/home" element={<Home />} /><Route path="/catalog" element={<Catalog />} /><Route path="/product/:id" element={<ProductDetail />} /><Route path="/about" element={<AboutUs />} /><Route path="/agent" element={<BecomeAgent />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /></div></BrowserRouter>;
}
