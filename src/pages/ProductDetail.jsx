import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { getProduct, getProducts } from '../lib/api';
import { useLanguage } from '../context/LanguageContext';
import { kes, discountPct } from '../lib/format';
import { Icon, RxNotice, Skeleton } from '../components/ui/Bits';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { tr } = useLanguage();
  const { id } = useParams();
  const { add } = useCart();
  const navigate = useNavigate();
  const { data: product, loading } = useAsync(() => getProduct(id), [id]);
  const { data: all } = useAsync(getProducts, []);

  if (loading) return <div className="container-x" style={{ paddingTop: 120 }}><Skeleton h={480} /></div>;
  if (!product) return (
    <div style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: '8rem 1.5rem 4rem' }}>
      <div><h1 style={{ fontSize: '2.4rem', margin: 0 }}>{tr('Product not found')}</h1>
        <p style={{ color: 'rgba(244,250,240,.6)' }}>{tr('It may have been removed or is no longer available.')}</p>
        <Link to="/shop" className="btn-primary">{tr('Back to shop')}</Link></div>
    </div>
  );

  const pct = discountPct(product);
  const related = (all || []).filter(p => p.category_id === product.category_id && p.id !== product.id).slice(0, 4);
  const specs = [['Active ingredient', product.generic_name], ['Brand', product.brand], ['Form', product.dosage_form], ['Strength', product.strength], ['Pack size', product.pack_size]].filter(([, v]) => v);

  return (
    <div style={{ background: 'var(--bg-ink)', minHeight: '100vh', paddingTop: 72 }}>
      <div className="container-x" style={{ padding: '2rem 1.5rem 5rem' }}>
        <nav style={{ display: 'flex', gap: '.5rem', alignItems: 'center', fontSize: '.8rem', color: 'rgba(244,250,240,.45)', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <Link to="/shop" className="hover:text-white">{tr('Shop')}</Link><Icon name="solar:alt-arrow-right-linear" size={12} />
          {product.category_id && <><Link to={`/shop?cat=${product.category_id}`} className="hover:text-white">{tr(product.category_id.replace('-', ' '))}</Link><Icon name="solar:alt-arrow-right-linear" size={12} /></>}
          <span style={{ color: 'rgba(244,250,240,.75)', fontWeight: 600 }}>{tr(product.name)}</span>
        </nav>

        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '5rem' }}>
          <div className="card-dark" style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1', borderRadius: 28 }}>
            {product.image_url ? <img src={product.image_url} alt={tr(product.name)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ display: 'grid', placeItems: 'center', height: '100%', color: 'rgba(244,250,240,.2)' }}><Icon name="solar:pills-3-linear" size={96} /></div>}
            <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8 }}>
              {product.requires_prescription && <span className="pill pill-rx"><Icon name="solar:document-medicine-linear" size={13} />{tr('Prescription only')}</span>}
              {product.badge && <span className="pill" style={{ background: 'linear-gradient(135deg,#9FD96A,#4A8C2A)', color: '#111A0C' }}>{tr(product.badge)}</span>}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <h1 style={{ margin: 0, fontSize: 'clamp(1.9rem,3.2vw,3rem)', letterSpacing: '-.055em' }}>{tr(product.name)}</h1>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '.85rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '2.3rem', fontWeight: 700, letterSpacing: '-.06em' }}>{kes(product.price)}</span>
              {pct && <><span style={{ fontSize: '1.1rem', color: 'rgba(244,250,240,.35)', textDecoration: 'line-through' }}>{kes(product.compare_at_price)}</span><span className="pill pill-green">{tr('You save')} {pct}%</span></>}
            </div>
            <p style={{ margin: 0, color: 'rgba(244,250,240,.7)', lineHeight: 1.7 }}>{tr(product.description)}</p>

            {product.requires_prescription && (
              <RxNotice><strong>{tr('Prescription required.')}</strong> {tr('Ask a qualified pharmacist about prescription requirements before use.')}</RxNotice>
            )}

            {specs.length > 0 && (
              <div className="card-dark" style={{ padding: '1.1rem 1.2rem', borderRadius: 18 }}>
                <div className="label">{tr('Product information')}</div>
                {specs.map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '.5rem 0', borderBottom: '1px solid rgba(244,250,240,.06)', fontSize: '.88rem' }}>
                    <span style={{ color: 'rgba(244,250,240,.5)' }}>{tr(k)}</span><span style={{ fontWeight: 600, textAlign: 'right' }}>{tr(v)}</span>
                  </div>
                ))}
              </div>
            )}

            {product.details?.length > 0 && (
              <div style={{ display: 'grid', gap: '.5rem' }}>
                {product.details.map(d => (
                  <div key={d} style={{ display: 'flex', gap: '.6rem', fontSize: '.88rem', color: 'rgba(244,250,240,.74)' }}>
                    <Icon name="solar:check-circle-linear" size={16} style={{ color: '#6DB33F', flexShrink: 0, marginTop: 2 }} />{tr(d)}
                  </div>
                ))}
              </div>
            )}

            <button onClick={() => { add(product); navigate('/cart'); }} className="btn-primary" style={{ alignSelf: 'flex-start', cursor: 'pointer' }}><Icon name="solar:cart-large-2-linear" size={16} /> {tr('Buy now')}</button>
            <Link to={`/contact?product=${product.id}`} className="btn-primary" style={{ alignSelf: 'flex-start' }}>{tr('Ask about this product')}</Link>
            <p style={{ margin: 0, fontSize: '.74rem', color: 'rgba(244,250,240,.4)' }}>{tr('Always read the label and follow the directions for use. If symptoms persist, speak to a pharmacist or doctor.')}</p>
          </div>
        </div>

        {related.length > 0 && (
          <>
            <h2 style={{ fontSize: '1.8rem', letterSpacing: '-.05em', margin: '0 0 1.5rem' }}>{tr('You may also need')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: '1.25rem' }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
