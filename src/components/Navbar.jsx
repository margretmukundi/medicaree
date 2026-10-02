import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Icon } from './ui/Bits';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { brand_name } = useSettings();
  const { language, setLanguage, tr } = useLanguage();
  const navigate = useNavigate();
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/shop', label: tr('Shop') },
    { to: '/about', label: tr('About') },
    { to: '/contact', label: tr('FAQ & Contact') },
  ];
  const linkCls = ({ isActive }) => `text-sm font-bold transition-colors ${isActive ? 'text-[#111A0C]' : 'text-[#111A0C]/65 hover:text-[#111A0C]'}`;
  const iconBtn = { position: 'relative', width: 42, height: 42, border: '1px solid rgba(17,26,12,.12)', borderRadius: 999, background: 'transparent', color: '#111A0C', display: 'grid', placeItems: 'center', cursor: 'pointer' };

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 80, background: 'rgba(240,244,236,.96)', borderBottom: '1px solid rgba(17,26,12,.08)', backdropFilter: 'blur(18px)', boxShadow: scrolled ? '0 16px 50px rgba(17,26,12,.08)' : 'none', transition: 'box-shadow 220ms', color: '#111A0C' }}>
      <div style={{ maxWidth: 1440, height: 72, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <Link to="/" className="flex items-center gap-2" aria-label={`${brand_name} home`}>
          <div style={{ width: 34, height: 34, borderRadius: 11, background: 'linear-gradient(135deg,#9FD96A,#4A8C2A)', display: 'grid', placeItems: 'center' }}>
            <Icon name="solar:health-bold" size={19} style={{ color: '#fff' }} />
          </div>
          <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-.06em' }}>{brand_name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => <NavLink key={l.to} to={l.to} className={linkCls}>{l.label}</NavLink>)}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/shop')} aria-label={tr('Search products')} style={iconBtn} className="hidden sm:grid"><Icon name="solar:magnifer-linear" size={19} /></button>
          <button onClick={() => navigate('/cart')} aria-label={tr('Cart')} style={iconBtn}>
            <Icon name="solar:cart-large-2-linear" size={19} />
            {count > 0 && <span style={{ position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, borderRadius: 9, background: '#4A8C2A', color: '#fff', fontSize: '.65rem', fontWeight: 800, display: 'grid', placeItems: 'center' }}>{count}</span>}
          </button>
          <button onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')} title={tr(language === 'en' ? 'Change language to Swahili' : 'Change language to English')} aria-label={tr(language === 'en' ? 'Change language to Swahili' : 'Change language to English')} style={{ ...iconBtn, width: 42, fontSize: '.72rem', fontWeight: 800 }}>{language === 'en' ? 'SW' : 'EN'}</button>
          <button className="md:hidden" onClick={() => setMenuOpen(o => !o)} aria-label={tr('Menu')} style={iconBtn}>
            <Icon name={menuOpen ? 'solar:close-linear' : 'solar:hamburger-menu-linear'} size={20} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{ background: 'rgba(240,244,236,.98)', borderTop: '1px solid rgba(17,26,12,.08)', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          {links.map(l => <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className={({ isActive }) => `text-sm font-bold py-1 ${isActive ? 'text-[#4A8C2A]' : 'text-[#111A0C]/75'}`}>{l.label}</NavLink>)}
        </div>
      )}
    </header>
  );
}
