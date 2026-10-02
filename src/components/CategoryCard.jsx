import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Icon } from './ui/Bits';

export default function CategoryCard({ category, count }) {
  const { tr } = useLanguage();
  const rx = category.id === 'prescription';
  return (
    <Link to={`/shop?cat=${category.id}`} className="card-light lift group" style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '.9rem', minHeight: 190 }}>
      <div style={{ width: 52, height: 52, borderRadius: 16, display: 'grid', placeItems: 'center', color: rx ? '#B45309' : '#2F6A17', background: rx ? 'rgba(245,158,11,.15)' : 'rgba(74,140,42,.12)', border: `1px solid ${rx ? 'rgba(245,158,11,.3)' : 'rgba(74,140,42,.22)'}` }}>
        <Icon name={category.icon || 'solar:pills-linear'} size={26} />
      </div>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.08rem', letterSpacing: '-.04em', color: 'var(--text-dark)' }}>{tr(category.name)}</h3>
        <p className="line-clamp-2" style={{ margin: '.4rem 0 0', fontSize: '.8rem', color: 'var(--text-muted-dark)', lineHeight: 1.5 }}>{tr(category.description)}</p>
      </div>
      <span style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '.72rem', fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: '#2F6A17' }}>
        {count != null ? `${count} ${tr(count === 1 ? 'product' : 'products')}` : tr('Browse')}
        <Icon name="solar:arrow-right-linear" size={15} className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
