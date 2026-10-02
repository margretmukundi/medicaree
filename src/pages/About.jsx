import { Link } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { getServices, getTeam } from '../lib/api';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import { Icon, PageHead, SectionHeader } from '../components/ui/Bits';
import { steps } from './Home';

export default function About() {
  const s = useSettings();
  const { tr } = useLanguage();
  const team = useAsync(getTeam, []);
  const services = useAsync(getServices, []);

  return (
    <div style={{ background: 'var(--bg-ink)' }}>
      <PageHead eyebrow={`${tr('About')} ${s.brand_name}`} title={tr(s.about_title || 'About us')} sub={tr(s.about_intro)} />

      <section className="section-light" style={{ padding: '5rem 0' }}>
        <div className="container-x">
          {s.about_stats.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1.1rem', marginBottom: '4.5rem' }}>
              {s.about_stats.map(st => (
                <div key={st.label} className="card-light" style={{ textAlign: 'center', padding: '1.8rem 1rem' }}>
                  <div style={{ fontFamily: 'Sora,sans-serif', fontSize: 'clamp(1.8rem,3.4vw,2.6rem)', fontWeight: 700, letterSpacing: '-.06em', color: 'var(--text-dark)' }}>{st.value}</div>
                  <div style={{ color: 'var(--text-muted-dark)', fontSize: '.84rem', marginTop: '.3rem' }}>{tr(st.label)}</div>
                </div>
              ))}
            </div>
          )}
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <div className="eyebrow dark"><span className="eyebrow-dot"></span>{tr('Our approach')}</div>
              <h2 className="h-display" style={{ color: 'var(--text-dark)' }}>{tr(s.about_mission_title)}</h2>
              <p style={{ margin: '1rem 0 1.6rem', color: 'var(--text-muted-dark)' }}>{tr(s.about_mission_body)}</p>
              <div style={{ display: 'grid', gap: '.75rem' }}>
                {s.about_points.map(p => (
                  <div key={p} style={{ display: 'flex', gap: '.75rem', fontSize: '.94rem', color: 'rgba(17,26,12,.82)' }}>
                    <Icon name="solar:check-circle-linear" size={19} style={{ color: '#4A8C2A', flexShrink: 0 }} />{tr(p)}
                  </div>
                ))}
              </div>
            </div>
            <div className="card-light" style={{ padding: '2rem', borderRadius: 30 }}>
              <div className="label" style={{ color: 'rgba(17,26,12,.5)' }}>{tr('How to browse this catalog')}</div>
              {steps.map((st, i) => (
                <div key={st.title} style={{ display: 'flex', gap: '1rem', padding: '1rem 0', borderBottom: i < steps.length - 1 ? '1px solid rgba(17,26,12,.08)' : 0 }}>
                  <div style={{ width: 42, height: 42, flexShrink: 0, borderRadius: 13, display: 'grid', placeItems: 'center', background: 'rgba(74,140,42,.12)', color: '#2F6A17' }}><Icon name={st.icon} size={21} /></div>
                  <div><strong style={{ color: 'var(--text-dark)' }}>{tr(st.title)}</strong><p style={{ margin: '.2rem 0 0', fontSize: '.84rem', color: 'var(--text-muted-dark)' }}>{tr(st.desc)}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {services.data?.length > 0 && (
        <section className="section-dark" style={{ padding: '5.5rem 0' }}>
          <div className="container-x">
            <SectionHeader eyebrow={tr('What we offer')} title={tr('Our services')} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1.1rem' }}>
              {services.data.map(sv => (
                <div key={sv.id} className="card-dark" style={{ padding: '1.5rem' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, display: 'grid', placeItems: 'center', background: 'rgba(74,140,42,.14)', color: '#6DB33F', marginBottom: '1rem' }}><Icon name={sv.icon} size={22} /></div>
                  <h3 style={{ margin: '0 0 .4rem', fontSize: '1.05rem', letterSpacing: '-.04em' }}>{tr(sv.title)}</h3>
                  <p style={{ margin: 0, fontSize: '.86rem', color: 'rgba(244,250,240,.58)' }}>{tr(sv.description)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {team.data?.length > 0 && (
        <section className="section-light" style={{ padding: '5.5rem 0' }}>
          <div className="container-x">
            <SectionHeader dark={false} center eyebrow={tr('Our team')} title={tr('The people behind your pharmacy')} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1.1rem' }}>
              {team.data.map(m => (
                <div key={m.id} className="card-light" style={{ padding: '2rem', textAlign: 'center' }}>
                  {m.photo_url ? <img src={m.photo_url} alt={m.name} style={{ width: 88, height: 88, borderRadius: 999, objectFit: 'cover', margin: '0 auto 1rem', display: 'block', border: '3px solid rgba(74,140,42,.3)' }} />
                    : <div style={{ width: 88, height: 88, borderRadius: 999, margin: '0 auto 1rem', display: 'grid', placeItems: 'center', background: 'rgba(74,140,42,.12)', color: '#2F6A17' }}><Icon name="solar:user-linear" size={36} /></div>}
                  <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-dark)' }}>{m.name}</h3>
                  <p style={{ margin: '.25rem 0 0', color: '#2F6A17', fontSize: '.84rem', fontWeight: 600 }}>{tr(m.role)}</p>
                  {m.bio && <p style={{ margin: '.7rem 0 0', fontSize: '.84rem', color: 'var(--text-muted-dark)' }}>{tr(m.bio)}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-dark" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <div className="container-x" style={{ maxWidth: 640 }}>
          <h2 className="h-display">{tr('Looking for a product?')}</h2>
          <p style={{ color: 'rgba(244,250,240,.64)', margin: '1rem 0 1.8rem' }}>{tr('Browse the catalog, or contact the pharmacy about a product.')}</p>
          <div style={{ display: 'flex', gap: '.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn-primary">{tr('Shop now')}</Link><Link to="/contact" className="btn-ghost">{tr('Ask a pharmacist')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
