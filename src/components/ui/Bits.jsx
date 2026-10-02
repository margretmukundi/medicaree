import { Link } from 'react-router-dom';

export function Icon({ name, size = 18, className, style }) {
  return <iconify-icon icon={name} width={size} className={className} style={style}></iconify-icon>;
}

export function SectionHeader({ eyebrow, title, sub, dark = true, center = false, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'end', justifyContent: center ? 'center' : 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '2.5rem', textAlign: center ? 'center' : 'left' }}>
      <div style={{ maxWidth: 720 }}>
        {eyebrow && <div className={`eyebrow ${dark ? '' : 'dark'}`} style={center ? { justifyContent: 'center' } : undefined}><span className="eyebrow-dot"></span>{eyebrow}</div>}
        <h2 className="h-display" style={{ color: dark ? 'var(--text-light)' : 'var(--text-dark)' }}>{title}</h2>
        {sub && <p style={{ margin: '1rem 0 0', color: dark ? 'rgba(244,250,240,.64)' : 'var(--text-muted-dark)', fontSize: '1rem' }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

// Internal paths use the router, anything else is a normal anchor.
export function SmartLink({ to, children, ...rest }) {
  if (!to) return <span {...rest}>{children}</span>;
  return /^https?:/.test(to) ? <a href={to} target="_blank" rel="noreferrer" {...rest}>{children}</a> : <Link to={to} {...rest}>{children}</Link>;
}

export function Skeleton({ h = 200, className = '' }) {
  return <div className={`skeleton ${className}`} style={{ height: h }}></div>;
}

export function ErrorNote({ error }) {
  return (
    <div className="card-dark" style={{ padding: '1.25rem', color: 'rgba(244,250,240,.75)', fontSize: '.9rem' }}>
      <strong style={{ color: '#FCA5A5' }}>Couldn't load this section.</strong> {error?.message || 'Please refresh the page.'}
    </div>
  );
}

export function PageHead({ eyebrow, title, sub, children }) {
  return (
    <div className="section-dark" style={{ paddingTop: 'calc(72px + 3.2rem)', paddingBottom: '3rem' }}>
      <div className="container-x">
        {eyebrow && <div className="eyebrow"><span className="eyebrow-dot"></span>{eyebrow}</div>}
        <h1 style={{ margin: 0, fontSize: 'clamp(2.2rem,4.6vw,4.4rem)', letterSpacing: '-.07em', lineHeight: .98 }}>{title}</h1>
        {sub && <p style={{ margin: '.8rem 0 0', color: 'rgba(244,250,240,.6)', fontSize: '.95rem', maxWidth: 620 }}>{sub}</p>}
        {children}
      </div>
    </div>
  );
}

export function RxNotice({ children }) {
  return (
    <div style={{ display: 'flex', gap: '.8rem', padding: '1rem 1.1rem', borderRadius: 16, background: 'rgba(245,158,11,.1)', border: '1px solid rgba(245,158,11,.3)', color: '#FDE68A', fontSize: '.86rem', lineHeight: 1.55 }}>
      <Icon name="solar:document-medicine-linear" size={22} style={{ color: '#FBBF24', flexShrink: 0 }} />
      <div>{children}</div>
    </div>
  );
}
