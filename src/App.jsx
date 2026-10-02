import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { LanguageProvider } from './context/LanguageContext';
import { useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function StoreLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}

function NotFound() {
  const { tr } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center py-40 text-center px-4">
      <h1 className="text-6xl font-bold text-white/20 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>404</h1>
      <p className="text-white/60 mb-6">{tr('Page not found.')}</p>
      <Link to="/" className="btn-primary">{tr('Go home')}</Link>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <SettingsProvider>
        <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
              <Route element={<StoreLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
          </Routes>
        </BrowserRouter>
        </CartProvider>
      </SettingsProvider>
    </LanguageProvider>
  );
}
