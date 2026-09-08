Markdown
# Project Foundation: RH Luxury Footwear Frontend (`rh-sandal-front`)

## Project Overview
This repository contains the source code for the primary B2B digital footprint of **RH Luxury Footwear** (`rhluxuryfootwear.com`). The site is built for high speed, minimal bandwidth consumption, and seamless viewing across African and Middle Eastern regional markets.

- **Stack:** React 18 + Vite + Tailwind CSS + React Router DOM (v6)
- **Deployment Target:** Cloudflare Pages (Static Site Build via Vite)
- **Asset Pipeline:** Images and media assets are hosted externally on Cloudflare R2 (`https://assets.rhluxuryfootwear.com/`)
- **Primary Conversion:** Direct WhatsApp inquiry links pre-filled with product SKUs and model IDs

---

## Repository File Tree Specification

```text
rh-sandal-front/
├── public/
│   ├── favicon.ico
│   └── _redirects                # Serves client-side SPA routes on Cloudflare Pages
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx            # Sticky navigation bar
│   │   ├── Footer.jsx            # Footer with company info & email links
│   │   ├── ProductCard.jsx       # Reusable card with lazy-loaded WebP images
│   │   └── WhatsAppButton.jsx    # WhatsApp deep-link trigger
│   ├── data/
│   │   └── products.json         # Master product database linking to R2
│   ├── pages/
│   │   ├── Home.jsx              # Hero banner + featured sandals
│   │   ├── Catalog.jsx           # Filterable gallery view
│   │   ├── ProductDetail.jsx     # Full specs, MOQ, and inquiry triggers
│   │   ├── AboutUs.jsx           # Factory credentials and supply capability
│   │   └── BecomeAgent.jsx       # Agent/distributor lead generation form
│   ├── App.jsx                   # Central React Router setup
│   ├── index.css                 # Tailwind directives
│   └── main.jsx                  # Application entry point
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
Key Technical Requirements & Constraints
SPA Routing on Cloudflare Pages:
The public/_redirects file MUST contain:
/*    /index.html   200
This ensures deep URLs (e.g., /catalog, /product/SL-001) resolve correctly without returning Cloudflare 404 errors.

Asset CDN Protocol:
All product image references MUST pull directly from the external R2 bucket custom domain:
https://assets.rhluxuryfootwear.com/[file-name].webp
Images must use native HTML lazy loading (loading="lazy").

B2B WhatsApp Integration:
All product cards and detail pages must include a dynamic WhatsApp redirect URL formatted as:
https://wa.me/8613800000000?text=Hi%2C%20I%20am%20interested%20in%20Model%3A%20[PRODUCT_ID]

Zero Heavy Third-Party Libraries:
Keep the JS bundle minimal to maintain sub-second load times on low-bandwidth 3G/4G networks.

Ready-To-Use File Foundations
package.json
JSON
{
  "name": "rh-sandal-front",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "vite": "^5.3.1"
  }
}
vite.config.js
JavaScript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
src/data/products.json
JSON
[
  {
    "id": "SL-001",
    "name": "Classic Genuine Leather Slide Sandal",
    "category": "Leather Sandals",
    "moq": "500 Pairs",
    "material": "Genuine Upper / High-Density Rubber Sole",
    "image": "[https://assets.rhluxuryfootwear.com/sl-001.webp](https://assets.rhluxuryfootwear.com/sl-001.webp)",
    "description": "Premium durably stitched sandal designed for everyday wear in high-temperature climates."
  },
  {
    "id": "SL-002",
    "name": "Ultra-Lightweight EVA Comfort Sandal",
    "category": "Casual Sandals",
    "moq": "1000 Pairs",
    "material": "High-Grade EVA Foam",
    "image": "[https://assets.rhluxuryfootwear.com/sl-002.webp](https://assets.rhluxuryfootwear.com/sl-002.webp)",
    "description": "Waterproof, highly flexible foam sandal engineered for bulk distribution."
  }
]
src/App.jsx
JavaScript
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import products from './data/products.json';

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100 mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Direct Factory Wholesale Footwear
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          High-performance, ultra-durable sandals built for African and Middle Eastern markets.
        </p>
        <div className="mt-6">
          <Link className="inline-block bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition" to="/catalog">
            Explore Full Catalog
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Featured Models</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <div key={item.id} className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-64 object-cover" 
              loading="lazy"
            />
            <div className="p-5">
              <span className="text-xs font-semibold uppercase px-2 py-1 bg-gray-100 rounded text-gray-600">
                SKU: {item.id}
              </span>
              <h3 className="text-lg font-bold mt-2 text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500 mt-1">MOQ: {item.moq}</p>
              <a 
                href={`[https://wa.me/8613800000000?text=$](https://wa.me/8613800000000?text=$){encodeURIComponent(`Hello RH Luxury, I want to inquire about model: ${item.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full text-center bg-emerald-600 text-white py-2 rounded-md font-medium text-sm hover:bg-emerald-700 transition"
              >
                Inquire via WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between font-sans">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link className="text-xl font-black tracking-tight text-gray-900" to="/">
              RH LUXURY FOOTWEAR
            </Link>
            <nav className="space-x-6 text-sm font-semibold">
              <Link className="hover:text-blue-600" to="/">Home</Link>
              <Link className="hover:text-blue-600" to="/catalog">Catalog</Link>
              <a href="mailto:info@rhluxuryfootwear.com" className="text-blue-600 border border-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-50">
                Contact Sales
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route element="{<Home" path="/"/>} />
            <Route element="{<Home" path="/catalog"/>} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} RH Luxury Footwear. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}
AI Execution Prompt for Copilot / Composer