import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { getCategories, getProducts, getPromotions, getServices, getFaqs } from '../lib/api';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import { Icon, SectionHeader, Skeleton, ErrorNote } from '../components/ui/Bits';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import PromoCard from '../components/PromoCard';

export const steps = [
  { icon: 'solar:magnifer-linear', title: 'Browse the catalog', desc: 'Explore products by category or search by name and active ingredient.' },
  { icon: 'solar:document-text-linear', title: 'Check product details', desc: 'Review ingredients, strengths, pack sizes, and prescription information.' },
  { icon: 'solar:user-check-rounded-linear', title: 'Ask a pharmacist', desc: 'Consult a qualified pharmacist or doctor about medicines and safe use.' },
  { icon: 'solar:chat-round-dots-linear', title: 'Contact the pharmacy', desc: 'Use the contact information published on this site to ask about availability.' },
];

function Hero() {
  const s = useSettings();
  const { tr } = useLanguage();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const { data: heroPromos } = useAsync(() => getPromotions('hero'), []);
  const featured = heroPromos?.[0];
  const trust = [
    { icon: 'solar:widget-4-linear', label: tr('Browse the catalog') },
    { icon: 'solar:document-text-linear', label: tr('Detailed product information') },
    { icon: 'solar:user-check-rounded-linear', label: tr('Ask a pharmacist') },
  ];
  return (
    <section className="section-dark" style={{ clipPath: 'polygon(0 0,100% 0,100% calc(100% - 4vw),0 100%)', paddingBottom: '9vw', marginBottom: '-4vw' }}>
      <div className="container-x" style={{ paddingTop: '9rem' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.3fr) minmax(300px,.7fr)', gap: '3.5rem', alignItems: 'center' }}>
          <div>
            <div className="eyebrow"><span className="eyebrow-dot"></span>{s.brand_name || 'MediCare'} · {tr('Online pharmacy')}</div>
            <h1 style={{ margin: 0, fontSize: 'clamp(2.8rem,6.4vw,6rem)', fontWeight: 500, letterSpacing: '-.075em', lineHeight: 1 }}>{tr(s.hero_title || 'Medicines and health essentials, delivered to you.')}</h1>
            <p style={{ margin: '1.4rem 0 0', maxWidth: 560, color: 'rgba(244,250,240,.76)', fontSize: '1.08rem' }}>{tr(s.hero_subtitle)}</p>
            <form onSubmit={e => { e.preventDefault(); navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop'); }}
              style={{ marginTop: '2rem', display: 'flex', gap: '.6rem', maxWidth: 560, padding: '.4rem', borderRadius: 999, background: 'rgba(244,250,240,.08)', border: '1px solid rgba(244,250,240,.16)', backdropFilter: 'blur(12px)' }}>
              <Icon name="solar:magnifer-linear" size={20} style={{ alignSelf: 'center', marginLeft: '.9rem', color: 'rgba(244,250,240,.55)' }} />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder={tr('Search medicines, vitamins, skincare…')} aria-label={tr('Search products')}
                style={{ flex: 1, minWidth: 0, background: 'transparent', border: 0, outline: 0, color: 'var(--text-light)', fontSize: '.95rem' }} />
              <button className="btn-primary" type="submit">{tr('Search')}</button>
            </form>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem', marginTop: '1.6rem' }}>
              {trust.map(t => (
                <span key={t.label} className="pill" style={{ border: '1px solid rgba(244,250,240,.14)', background: 'rgba(12,18,8,.5)', color: 'rgba(244,250,240,.72)', padding: '.5rem .8rem' }}>
                  <Icon name={t.icon} size={14} />{t.label}
                </span>
              ))}
            </div>
          </div>
          <div className="card-dark" style={{ padding: '1.6rem', borderRadius: 28 }}>
            {featured ? (
              <>
                <span className="pill pill-green" style={{ marginBottom: '1rem' }}>{tr(featured.badge_text || 'Featured')}</span>
                <h2 style={{ margin: 0, fontSize: '1.7rem', letterSpacing: '-.05em' }}>{tr(featured.title)}</h2>
                <p style={{ margin: '.7rem 0 1.4rem', color: 'rgba(244,250,240,.66)', fontSize: '.92rem' }}>{tr(featured.subtitle)}</p>
                <Link to={featured.cta_link || '/shop'} className="btn-primary">{tr(featured.cta_label || 'Shop now')}<Icon name="solar:arrow-right-up-linear" size={15} /></Link>
              </>
            ) : (
              <>
                <span className="pill pill-green" style={{ marginBottom: '1rem' }}>{tr('Browse the catalog')}</span>
                <h2 style={{ margin: 0, fontSize: '1.7rem', letterSpacing: '-.05em' }}>{tr('Find everyday health essentials')}</h2>
                <Link to="/shop" className="btn-primary" style={{ marginTop: '1.4rem' }}>{tr('Shop now')}</Link>
              </>
            )}
            <div style={{ display: 'grid', gap: '.8rem', marginTop: '1.6rem', paddingTop: '1.4rem', borderTop: '1px solid rgba(244,250,240,.1)' }}>
              {['Browse categories and product information', 'Check product availability with the pharmacy', 'Ask a qualified pharmacist about medicines'].map(item => (
                <div key={item} style={{ display: 'flex', gap: '.6rem', fontSize: '.84rem', color: 'rgba(244,250,240,.74)' }}>
                  <Icon name="solar:check-circle-linear" size={17} style={{ color: '#6DB33F', flexShrink: 0 }} />{tr(item)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { tr } = useLanguage();
  const cats = useAsync(getCategories, []);
  const prods = useAsync(getProducts, []);
  const promos = useAsync(() => getPromotions('home_card'), []);
  const services = useAsync(getServices, []);
  const faqs = useAsync(getFaqs, []);

  const counts = {};
  (prods.data || []).forEach(p => { counts[p.category_id] = (counts[p.category_id] || 0) + 1; });
  const featured = (prods.data || []).filter(p => p.is_featured).slice(0, 8);
  const grid = 'repeat(auto-fill,minmax(250px,1fr))';

  return (
    <div style={{ background: 'var(--bg-ink)' }}>
      <Hero />

      {/* CATEGORIES */}
      <section className="section-light" style={{ position: 'relative', zIndex: 3, padding: '7rem 0 5.5rem' }}>
        <div className="container-x">
          <SectionHeader dark={false} eyebrow={tr('Shop by category')} title={tr('Everything your family needs, in one pharmacy.')}
            sub={tr('Browse by what you need relief for. Every product shows its strength, pack size and whether a prescription is required.')}
            action={<Link to="/shop" className="btn-primary">{tr('All products')} <Icon name="solar:arrow-right-linear" size={15} /></Link>} />
          {cats.error ? <ErrorNote error={cats.error} /> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: '1.1rem' }}>
              {cats.loading ? [...Array(6)].map((_, i) => <Skeleton key={i} h={190} />)
                : cats.data.map(c => <CategoryCard key={c.id} category={c} count={counts[c.id] ?? 0} />)}
            </div>
          )}
        </div>
      </section>

      {/* ADVERTISEMENT CARDS */}
      {(promos.loading || promos.data?.length > 0) && (
        <section className="section-light" style={{ position: 'relative', zIndex: 3, padding: '0 0 6rem' }}>
          <div className="container-x">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.1rem' }}>
              {promos.loading ? [...Array(4)].map((_, i) => <Skeleton key={i} h={230} />)
                : promos.data.map((p, i) => <PromoCard key={p.id} promo={p} large={i === 0 && promos.data.length > 3} />)}
            </div>
          </div>
        </section>
      )}

      {/* FEATURED PRODUCTS */}
      <section className="section-dark" style={{ padding: '7rem 0 6rem' }}>
        <div className="container-x">
          <SectionHeader eyebrow={tr('Featured products')} title={tr('Popular products to explore.')}
            action={<Link to="/shop" className="btn-ghost">{tr('View all')} <Icon name="solar:arrow-right-linear" size={15} /></Link>} />
          {prods.error ? <ErrorNote error={prods.error} /> : (
            <div style={{ display: 'grid', gridTemplateColumns: grid, gap: '1.25rem' }}>
              {prods.loading ? [...Array(4)].map((_, i) => <Skeleton key={i} h={380} />)
                : featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* HOW TO USE THE CATALOG */}
      <section className="section-light" style={{ padding: '6.5rem 0' }}>
        <div className="container-x">
          <SectionHeader dark={false} center eyebrow={tr('How it works')} title={tr('A simple guide to browsing medicines.')}
            sub={tr('Use the catalog to review product information. For medical advice or availability, contact a qualified pharmacy professional.')} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.1rem' }}>
            {steps.map((st, i) => (
              <div key={st.title} className="card-light" style={{ padding: '1.6rem', position: 'relative' }}>
                <span style={{ position: 'absolute', top: 14, right: 20, fontFamily: 'Sora,sans-serif', fontSize: '3rem', fontWeight: 700, letterSpacing: '-.08em', color: 'rgba(74,140,42,.14)' }}>{i + 1}</span>
                <div style={{ width: 48, height: 48, borderRadius: 14, display: 'grid', placeItems: 'center', background: 'rgba(74,140,42,.12)', color: '#2F6A17', marginBottom: '1rem' }}><Icon name={st.icon} size={24} /></div>
                <h3 style={{ margin: '0 0 .45rem', fontSize: '1.05rem', letterSpacing: '-.04em', color: 'var(--text-dark)' }}>{tr(st.title)}</h3>
                <p style={{ margin: 0, fontSize: '.86rem', color: 'var(--text-muted-dark)', lineHeight: 1.6 }}>{tr(st.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      {services.data?.length > 0 && (
        <section className="section-dark" style={{ padding: '6.5rem 0' }}>
          <div className="container-x">
            <SectionHeader eyebrow={tr('Our services')} title={tr('Health information for everyday needs.')} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1.1rem' }}>
              {services.data.map(sv => (
                <Link key={sv.id} to={sv.link || '/shop'} className="card-dark lift" style={{ padding: '1.5rem', display: 'block' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, display: 'grid', placeItems: 'center', background: 'rgba(74,140,42,.14)', border: '1px solid rgba(74,140,42,.24)', color: '#6DB33F', marginBottom: '1rem' }}><Icon name={sv.icon} size={22} /></div>
                  {sv.tag && <div style={{ fontSize: '.64rem', fontWeight: 800, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(109,179,63,.8)', marginBottom: '.35rem' }}>{tr(sv.tag)}</div>}
                  <h3 style={{ margin: '0 0 .45rem', fontSize: '1.08rem', letterSpacing: '-.04em' }}>{tr(sv.title)}</h3>
                  <p style={{ margin: 0, fontSize: '.86rem', color: 'rgba(244,250,240,.58)', lineHeight: 1.6 }}>{tr(sv.description)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ + CTA */}
      <section className="section-light" style={{ padding: '6.5rem 0' }}>
        <div className="container-x two-col" style={{ display: 'grid', gridTemplateColumns: '.9fr 1.1fr', gap: '3.5rem', alignItems: 'start' }}>
          <div>
            <div className="eyebrow dark"><span className="eyebrow-dot"></span>{tr('Good to know')}</div>
            <h2 className="h-display" style={{ color: 'var(--text-dark)' }}>{tr('Quick answers about medicines.')}</h2>
            <p style={{ margin: '1rem 0 1.6rem', color: 'var(--text-muted-dark)' }}>{tr('Product information, prescription guidance, and pharmacist questions — explained simply.')}</p>
            <div style={{ display: 'flex', gap: '.7rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">{tr('All FAQs & contact')}</Link>
              <Link to="/shop" className="btn-primary" style={{ background: '#111A0C', color: '#F0F4EC', boxShadow: 'none' }}>{tr('Browse the catalog')}</Link>
            </div>
          </div>
          <div style={{ display: 'grid', gap: '.8rem' }}>
            {faqs.loading && [...Array(3)].map((_, i) => <Skeleton key={i} h={70} />)}
            {(faqs.data || []).slice(0, 4).map(f => (
              <details key={f.id} className="card-light" style={{ padding: '1.1rem 1.3rem' }}>
                <summary style={{ cursor: 'pointer', fontFamily: 'Sora,sans-serif', fontWeight: 600, letterSpacing: '-.03em', color: 'var(--text-dark)', listStyle: 'none' }}>{tr(f.question)}</summary>
                <p style={{ margin: '.8rem 0 0', color: 'var(--text-muted-dark)', fontSize: '.92rem' }}>{tr(f.answer)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
