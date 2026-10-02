import { useState } from 'react';
import { useAsync } from '../hooks/useAsync';
import { getFaqs, submitContact } from '../lib/api';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import { Icon, PageHead, Skeleton } from '../components/ui/Bits';

const TOPICS = ['Product information', 'Ask a pharmacist', 'General enquiry'];

export default function Contact() {
  const s = useSettings();
  const { tr } = useLanguage();
  const faqs = useAsync(getFaqs, []);
  const [open, setOpen] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: TOPICS[0], message: '' });
  const [state, setState] = useState({ sending: false, sent: false, error: '' });
  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    if (!s.email) { setState(x => ({ ...x, error: 'Contact email has not been configured yet.' })); return; }
    setState({ sending: true, sent: false, error: '' });
    try {
      await submitContact({ ...form, email: form.email.trim() || null, phone: form.phone.trim() || null });
      setState({ sending: false, sent: true, error: '' });
      setForm({ name: '', email: '', phone: '', topic: TOPICS[0], message: '' });
    } catch (err) {
      setState({ sending: false, sent: false, error: err.message || 'Could not open your email app.' });
    }
  }

  const details = [
    s.phone && ['solar:phone-linear', s.phone], s.email && ['solar:letter-linear', s.email],
    s.address && ['solar:map-point-linear', s.address], s.opening_hours && ['solar:clock-circle-linear', s.opening_hours],
  ].filter(Boolean);

  return (
    <div style={{ background: 'var(--bg-ink)' }}>
      <PageHead eyebrow={tr('FAQ & Contact')} title={tr("Questions? We're here to help.")} sub={tr('Browse common questions or use the pharmacy contact details shown below.')} />

      <section className="section-light" style={{ padding: '4.5rem 0' }}>
        <div className="container-x">
          <h2 className="h-display" style={{ color: 'var(--text-dark)', marginBottom: '2rem' }}>{tr('Frequently asked questions')}</h2>
          <div style={{ display: 'grid', gap: '.8rem', maxWidth: 860 }}>
            {faqs.loading && [...Array(4)].map((_, i) => <Skeleton key={i} h={64} />)}
            {(faqs.data || []).map((f, i) => (
              <div key={f.id} className="card-light" style={{ overflow: 'hidden' }}>
                <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', padding: '1.15rem 1.3rem', background: 'none', border: 0, textAlign: 'left', cursor: 'pointer', fontFamily: 'Sora,sans-serif', fontWeight: 600, fontSize: '1rem', letterSpacing: '-.03em', color: 'var(--text-dark)' }}>
                  {tr(f.question)}
                  <span style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 999, display: 'grid', placeItems: 'center', background: 'rgba(74,140,42,.12)', color: '#2F6A17', transition: 'transform 220ms', transform: open === i ? 'rotate(45deg)' : 'none' }}><Icon name="solar:add-linear" size={16} /></span>
                </button>
                {open === i && <div style={{ padding: '0 1.3rem 1.3rem', color: 'var(--text-muted-dark)', lineHeight: 1.75 }}>{tr(f.answer)}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark" style={{ padding: '5rem 0' }}>
        <div className="container-x two-col" style={{ display: 'grid', gridTemplateColumns: '1fr minmax(0,460px)', gap: '3.5rem', alignItems: 'start' }}>
          <div>
            <div className="eyebrow"><span className="eyebrow-dot"></span>{tr('Get in touch')}</div>
            <h2 className="h-display">{tr('Ask our pharmacy team.')}</h2>
            <p style={{ margin: '1rem 0 1.8rem', color: 'rgba(244,250,240,.66)', maxWidth: 480 }}>{tr('Questions about product information or medicine use? Contact details are listed here when provided by the pharmacy.')}</p>
            {details.length > 0 && <div style={{ display: 'grid', gap: '.9rem', marginBottom: '1.8rem' }}>
              {details.map(([icon, text]) => <div key={text} style={{ display: 'flex', gap: '.8rem', alignItems: 'center', color: 'rgba(244,250,240,.8)' }}><Icon name={icon} size={20} style={{ color: '#6DB33F' }} />{text}</div>)}
            </div>}
            <div style={{ padding: '1rem 1.2rem', borderRadius: 16, background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.25)', color: '#FDE68A', fontSize: '.84rem', maxWidth: 480 }}>
              <strong>{tr('Medical emergency?')}</strong> {tr("Don't wait for a reply — go to the nearest hospital.")}
            </div>
          </div>

          <div className="card-dark" style={{ padding: '1.8rem', borderRadius: 26 }}>
            {!s.email ? (
              <div>
                <h3 style={{ margin: '0 0 .5rem' }}>{tr('Contact details are not available yet')}</h3>
                <p style={{ margin: 0, color: 'rgba(244,250,240,.65)' }}>{tr('The pharmacy has not added a contact email. Please check back later.')}</p>
              </div>
            ) : state.sent ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
                <Icon name="solar:check-circle-bold" size={52} style={{ color: '#6DB33F' }} />
                <h3 style={{ margin: '1rem 0 .4rem', fontSize: '1.3rem' }}>{tr('Email draft opened')}</h3>
                <p style={{ margin: 0, color: 'rgba(244,250,240,.6)', fontSize: '.9rem' }}>{tr('Review and send the message from your email app.')}</p>
                <button onClick={() => setState({ sending: false, sent: false, error: '' })} style={{ marginTop: '1.2rem', background: 'none', border: 0, color: '#9FD96A', fontWeight: 700, cursor: 'pointer' }}>{tr('Send another message')}</button>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: 'grid', gap: '.8rem' }}>
                <input className="field" name="name" required value={form.name} onChange={set} placeholder={tr('Your name')} maxLength={120} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.8rem' }}>
                  <input className="field" type="email" name="email" value={form.email} onChange={set} placeholder={tr('Email')} />
                  <input className="field" type="tel" name="phone" value={form.phone} onChange={set} placeholder={tr('Phone')} />
                </div>
                <select className="field" name="topic" value={form.topic} onChange={set}>{TOPICS.map(topic => <option key={topic} value={topic}>{tr(topic)}</option>)}</select>
                <textarea className="field" name="message" required rows={5} value={form.message} onChange={set} placeholder={tr('How can we help?')} maxLength={4000} style={{ resize: 'vertical' }} />
                {state.error && <div style={{ color: '#FCA5A5', fontSize: '.84rem' }}>{tr(state.error)}</div>}
                <button className="btn-primary" disabled={state.sending} style={{ opacity: state.sending ? .7 : 1 }}>{tr(state.sending ? 'Sending…' : 'Send message')}</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
