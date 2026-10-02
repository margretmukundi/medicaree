import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import { useAsync } from '../hooks/useAsync';
import { getCategories } from '../lib/api';
import { Icon } from './ui/Bits';

export default function Footer() {
  const s = useSettings();
  const { tr } = useLanguage();
  const { data: cats } = useAsync(getCategories, []);
  const contact = [
    s.phone && { icon: 'solar:phone-linear', text: s.phone, href: `tel:${s.phone}` },
    s.whatsapp && { icon: 'solar:chat-round-dots-linear', text: `WhatsApp ${s.whatsapp}`, href: `https://wa.me/${String(s.whatsapp).replace(/\D/g, '')}` },
    s.email && { icon: 'solar:letter-linear', text: s.email, href: `mailto:${s.email}` },
    s.address && { icon: 'solar:map-point-linear', text: s.address },
    s.opening_hours && { icon: 'solar:clock-circle-linear', text: s.opening_hours },
  ].filter(Boolean);
  const head = { display: 'block', marginBottom: '.9rem', color: 'rgba(17,26,12,.46)', fontSize: '.7rem', fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase' };
  const link = 'block my-2 text-[.88rem] text-[#111A0C]/70 hover:text-[#111A0C] transition-colors';

  return (
    <footer style={{ background: 'linear-gradient(135deg,#F2F7EE 0%,#E5EFD9 100%)', color: '#111A0C', borderTop: '1px solid rgba(17,26,12,.08)' }}>
      <div className="container-x" style={{ padding: '3rem 1.5rem 2rem' }}>
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(17,26,12,.10)' }}>
          <div style={{ maxWidth: 400 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.55rem', marginBottom: '1rem' }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#9FD96A,#4A8C2A)', display: 'grid', placeItems: 'center' }}><Icon name="solar:health-bold" size={18} style={{ color: '#fff' }} /></div>
              <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-.06em' }}>{s.brand_name}</span>
            </div>
            <p style={{ margin: 0, color: 'rgba(17,26,12,.62)', fontSize: '.9rem' }}>{tr(s.tagline)} {tr('Browse medicines and health essentials, and check product information before use.')}</p>
            {s.ppb_license && <p style={{ margin: '1rem 0 0', fontSize: '.78rem', color: 'rgba(17,26,12,.55)', display: 'flex', gap: '.4rem', alignItems: 'center' }}><Icon name="solar:shield-check-linear" size={14} style={{ color: '#4A8C2A' }} />{tr('Pharmacy & Poisons Board licence:')} {s.ppb_license}</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '1.5rem' }}>
            <div>
              <span style={head}>{tr('Shop')}</span>
              {(cats || []).slice(0, 6).map(c => <Link key={c.id} to={`/shop?cat=${c.id}`} className={link}>{tr(c.name)}</Link>)}
            </div>
            <div>
              <span style={head}>{tr('Help')}</span>
              <Link to="/contact" className={link}>{tr('FAQ')}</Link>
              <Link to="/contact" className={link}>{tr('Ask a pharmacist')}</Link>
              <Link to="/about" className={link}>{tr('About us')}</Link>
            </div>
            {contact.length > 0 && (
              <div>
                <span style={head}>{tr('Contact')}</span>
                {contact.map(c => (
                  <div key={c.text} style={{ display: 'flex', gap: '.55rem', margin: '.5rem 0', fontSize: '.84rem', color: 'rgba(17,26,12,.72)' }}>
                    <Icon name={c.icon} size={16} style={{ color: '#4A8C2A', flexShrink: 0, marginTop: 2 }} />
                    {c.href ? <a href={c.href} className="hover:text-[#111A0C]">{c.text}</a> : c.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', paddingTop: '1.2rem', flexWrap: 'wrap', fontSize: '.76rem', color: 'rgba(17,26,12,.5)' }}>
          <span>© {new Date().getFullYear()} {s.brand_name}. {tr('All rights reserved.')}</span>
          <span>{tr('Information on this site is not a substitute for professional medical advice. In an emergency, go to the nearest hospital.')}</span>
        </div>
      </div>
    </footer>
  );
}
