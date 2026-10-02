import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { getCategories, getProducts, getPromotions } from '../lib/api';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import PromoCard from '../components/PromoCard';
import { Icon, PageHead, Skeleton, ErrorNote } from '../components/ui/Bits';

export default function Shop() {
  const { tr, language } = useLanguage();
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState('default');
  const cats = useAsync(getCategories, []);
  const prods = useAsync(getProducts, []);
  const banner = useAsync(() => getPromotions('shop_banner'), []);

  const cat = params.get('cat') || 'all';
  const query = params.get('q') || '';
  const type = params.get('type') || 'all'; // all | otc | rx

  const set = (k, v) => {
    const p = new URLSearchParams(params);
    if (!v || v === 'all') p.delete(k); else p.set(k, v);
    setParams(p);
  };

  const list = useMemo(() => {
    let l = prods.data || [];
    if (cat !== 'all') l = l.filter(p => p.category_id === cat);
    if (type === 'rx') l = l.filter(p => p.requires_prescription);
    if (type === 'otc') l = l.filter(p => !p.requires_prescription);
    if (query) {
      const q = query.toLowerCase();
      l = l.filter(p => [p.name, p.generic_name, p.brand, p.description].some(v => v?.toLowerCase().includes(q)));
    }
    if (sort === 'price-asc') l = [...l].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') l = [...l].sort((a, b) => b.price - a.price);
    if (sort === 'name') l = [...l].sort((a, b) => a.name.localeCompare(b.name));
    return l;
  }, [prods.data, cat, type, query, sort]);

  const allCats = [{ id: 'all', name: tr('All products') }, ...(cats.data || [])];
  const activeName = tr(allCats.find(c => c.id === cat)?.name);
  const chip = active => ({ flexShrink: 0, padding: '.5rem .95rem', borderRadius: 999, fontSize: '.76rem', fontWeight: 700, cursor: 'pointer', border: `1px solid ${active ? '#4A8C2A' : 'rgba(244,250,240,.14)'}`, background: active ? 'rgba(74,140,42,.18)' : 'transparent', color: active ? '#9FD96A' : 'rgba(244,250,240,.7)' });

  return (
    <div style={{ background: 'var(--bg-ink)', minHeight: '100vh' }}>
      <PageHead eyebrow={tr('Shop')} title={query ? `${tr('Results for')} "${query}"` : activeName || tr('All products')}
        sub={prods.loading ? tr('Loading…') : language === 'sw' ? `${list.length} ${tr('products')} ${tr(list.length === 1 ? 'found singular' : 'found')}` : `${list.length} ${tr(list.length === 1 ? 'product' : 'products')} found`}>
        <form onSubmit={e => { e.preventDefault(); set('q', new FormData(e.target).get('q').trim()); }} style={{ marginTop: '1.5rem', maxWidth: 520, position: 'relative' }}>
          <Icon name="solar:magnifer-linear" size={18} style={{ position: 'absolute', left: 16, top: 15, color: 'rgba(244,250,240,.5)' }} />
          <input name="q" key={query} defaultValue={query} className="field" placeholder={tr('Search by name or active ingredient…')} style={{ paddingLeft: '2.75rem', borderRadius: 999 }} />
        </form>
      </PageHead>

      <div className="container-x" style={{ padding: '2.5rem 1.5rem 5rem' }}>
        {banner.data?.[0] && <div style={{ marginBottom: '2rem' }}><PromoCard promo={banner.data[0]} /></div>}

        <div className="no-scrollbar" style={{ display: 'flex', gap: '.5rem', overflowX: 'auto', paddingBottom: '1rem' }}>
          {allCats.map(c => <button key={c.id} onClick={() => set('cat', c.id)} style={chip(cat === c.id)}>{tr(c.name)}</button>)}
        </div>

        <div style={{ display: 'flex', gap: '.7rem', flexWrap: 'wrap', alignItems: 'center', margin: '.5rem 0 1.6rem' }}>
          <select value={type} onChange={e => set('type', e.target.value)} className="field" style={{ width: 'auto' }} aria-label={tr('Medicine type')}>
            <option value="all">{tr('All medicine types')}</option>
            <option value="otc">{tr('Over the counter')}</option>
            <option value="rx">{tr('Prescription only')}</option>
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)} className="field" style={{ width: 'auto' }} aria-label={tr('Sort')}>
            <option value="default">{tr('Sort: Featured')}</option>
            <option value="price-asc">{tr('Price: low to high')}</option>
            <option value="price-desc">{tr('Price: high to low')}</option>
            <option value="name">{tr('Name A–Z')}</option>
          </select>
        </div>

        {prods.error ? <ErrorNote error={prods.error} /> : prods.loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: '1.25rem' }}>{[...Array(8)].map((_, i) => <Skeleton key={i} h={380} />)}</div>
        ) : list.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'rgba(244,250,240,.5)' }}>
            <Icon name="solar:box-minimalistic-linear" size={52} />
            <p style={{ fontWeight: 700, fontSize: '1.1rem', margin: '1rem 0 .3rem' }}>{tr('No products found')}</p>
            <p style={{ fontSize: '.88rem', margin: 0 }}>{tr('Try a different search or category, or ')}<Link to="/contact" style={{ color: '#9FD96A' }}>{tr('ask our pharmacist')}</Link> {tr("if you can't find something.")}</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: '1.25rem' }}>
            {list.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
