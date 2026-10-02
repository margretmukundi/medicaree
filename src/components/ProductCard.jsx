import { Link } from 'react-router-dom';
import { kes, discountPct } from '../lib/format';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Icon } from './ui/Bits';

export default function ProductCard({ product }) {
  const { tr } = useLanguage();
  const { add } = useCart();
  const pct = discountPct(product);
  const sub = [product.strength, product.dosage_form, product.pack_size].filter(Boolean).map(tr).join(' · ');

  return (
    <div className="card-dark lift group" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Link to={`/product/${product.id}`} style={{ position: 'relative', display: 'block', overflow: 'hidden', aspectRatio: '4 / 3', background: 'rgba(255,255,255,.04)' }}>
        {product.image_url
          ? <img src={product.image_url} alt={tr(product.name)} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 700ms ease' }} className="group-hover:scale-105" />
          : <div style={{ display: 'grid', placeItems: 'center', height: '100%', color: 'rgba(244,250,240,.25)' }}><Icon name="solar:pills-3-linear" size={56} /></div>}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,10,4,.62), transparent 55%)' }}></div>
        <div style={{ position: 'absolute', top: 10, left: 10, right: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {product.requires_prescription && <span className="pill pill-rx"><Icon name="solar:document-medicine-linear" size={12} />{tr('Rx only')}</span>}
          {product.badge && <span className="pill" style={{ background: product.badge === 'Sale' ? 'rgba(239,68,68,.92)' : 'linear-gradient(135deg,#9FD96A,#4A8C2A)', color: product.badge === 'Sale' ? '#fff' : '#111A0C' }}>{tr(product.badge)}</span>}
        </div>
      </Link>

      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: '.64rem', fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', color: '#6DB33F', marginBottom: '.35rem' }}>{tr(product.generic_name || product.brand || ' ')}</div>
        <Link to={`/product/${product.id}`}>
          <h3 className="line-clamp-2 hover:text-[#9FD96A] transition-colors" style={{ margin: '0 0 .35rem', fontSize: '.95rem', fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.3, color: 'var(--text-light)' }}>{tr(product.name)}</h3>
        </Link>
        <p style={{ margin: '0 0 .75rem', fontSize: '.74rem', color: 'rgba(244,250,240,.46)', lineHeight: 1.45 }}>{sub}</p>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '.55rem', marginTop: 'auto', marginBottom: '.2rem', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: '1.15rem', letterSpacing: '-.04em' }}>{kes(product.price)}</span>
          {pct && <>
            <span style={{ fontSize: '.78rem', color: 'rgba(244,250,240,.38)', textDecoration: 'line-through' }}>{kes(product.compare_at_price)}</span>
            <span className="pill pill-green" style={{ padding: '.15rem .45rem' }}>-{pct}%</span>
          </>}
        </div>
        <div style={{ minHeight: 18, marginBottom: '.7rem' }}></div>

        <button onClick={() => add(product)} className="btn-primary" style={{ width: '100%', padding: '.7rem', justifyContent: 'center', cursor: 'pointer' }}>
          <Icon name="solar:cart-large-2-linear" size={16} /> {tr('Add to cart')}
        </button>
        <Link to={`/product/${product.id}`} style={{ textAlign: 'center', marginTop: '.6rem', fontSize: '.78rem', color: 'rgba(244,250,240,.55)' }}>{tr('View details')}</Link>
      </div>
    </div>
  );
}
