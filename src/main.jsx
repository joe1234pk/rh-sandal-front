import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { captureUtmSource } from './marketing';
import { initializeAnalytics } from './analytics';

captureUtmSource();
initializeAnalytics();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
