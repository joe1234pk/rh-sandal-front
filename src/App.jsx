import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';

function NotFound() {
  return <section className="section-shell"><p className="eyebrow">404 / Page not found</p><h1>That page<br /><em>has moved.</em></h1><a className="button button-dark" href="/catalog">Browse the catalog <span>↗</span></a></section>;
}

export default function App() {
  return <BrowserRouter><div className="app-shell"><Navbar /><main><Routes><Route path="/" element={<Navigate replace to="/catalog" />} /><Route path="/catalog" element={<Catalog />} /><Route path="/product/:id" element={<ProductDetail />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /></div></BrowserRouter>;
}
