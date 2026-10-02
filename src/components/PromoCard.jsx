import { Icon, SmartLink } from './ui/Bits';
import { useLanguage } from '../context/LanguageContext';

export default function PromoCard({ promo, large = false }) {
  const { tr } = useLanguage();
  const t = promo.theme || 'green';
  const onLight = t === 'green' || t === 'amber' || t === 'light';
  return (
    <SmartLink to={promo.cta_link} className={`promo-${t} lift`}
      style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem', borderRadius: 26, padding: large ? '2rem' : '1.5rem', minHeight: large ? 260 : 230, boxShadow: '0 18px 44px rgba(0,0,0,.14)' }}>
      <Icon name={promo.icon || 'solar:tag-linear'} size={large ? 180 : 140} style={{ position: 'absolute', right: -24, bottom: -28, opacity: onLight ? .16 : .08 }} />
      {promo.image_url && <img src={promo.image_url} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .25 }} />}
      <div style={{ position: 'relative' }}>
        {promo.badge_text && (
          <span className="pill" style={{ background: onLight ? 'rgba(12,18,8,.12)' : 'rgba(244,250,240,.12)', marginBottom: '.9rem' }}>{tr(promo.badge_text)}</span>
        )}
        <h3 style={{ margin: 0, fontSize: large ? 'clamp(1.6rem,2.4vw,2.2rem)' : '1.35rem', letterSpacing: '-.045em', maxWidth: 360 }}>{tr(promo.title)}</h3>
        {promo.subtitle && <p style={{ margin: '.6rem 0 0', fontSize: '.9rem', opacity: .78, maxWidth: 340, lineHeight: 1.55 }}>{tr(promo.subtitle)}</p>}
      </div>
      {promo.cta_label && (
        <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '.45rem', fontSize: '.76rem', fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase' }}>
          {tr(promo.cta_label)} <Icon name="solar:arrow-right-up-linear" size={15} />
        </span>
      )}
    </SmartLink>
  );
}
