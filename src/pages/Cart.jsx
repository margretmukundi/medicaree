import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { kes } from '../lib/format';
import { Icon } from '../components/ui/Bits';

export default function Cart() {
  const { tr } = useLanguage();
  const { items, setQty, remove, clear, total } = useCart();
  const [phone, setPhone] = useState('');
  const [state, setState] = useState({ step: 'idle', msg: '' }); // idle | sending | waiting | success | failed
  const timer = useRef();
  useEffect(() => () => clearInterval(timer.current), []);

  const pay = async e => {
    e.preventDefault();
    setState({ step: 'sending', msg: '' });
    try {
      const r = await fetch('/api/mpesa/stkpush', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone, amount: total, items: items.map(i => ({ id: i.id, qty: i.qty })) }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Payment request failed');
      setState({ step: 'waiting', msg: d.message });
      let tries = 0;
      timer.current = setInterval(async () => {
        tries++;
        try {
          const s = await (await fetch(`/api/mpesa/status/${d.checkoutRequestId}`)).json();
          if (s.status === 'success') { clearInterval(timer.current); clear(); setState({ step: 'success', msg: s.receipt }); }
          else if (s.status === 'failed') { clearInterval(timer.current); setState({ step: 'failed', msg: s.message }); }
        } catch { /* keep polling */ }
        if (tries > 40) { clearInterval(timer.current); setState({ step: 'failed', msg: 'Timed out waiting for payment.' }); }
      }, 3000);
    } catch (err) { setState({ step: 'failed', msg: err.message }); }
  };

  const wrap = { background: 'var(--bg-ink)', minHeight: '100vh', paddingTop: 72 };
  if (state.step === 'success') return (
    <div style={wrap}><div className="container-x" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
      <Icon name="solar:check-circle-linear" size={64} style={{ color: '#6DB33F' }} />
      <h1>{tr('Payment received')}</h1>
      <p style={{ color: 'rgba(244,250,240,.7)' }}>M-Pesa {tr('receipt')}: <strong>{state.msg}</strong></p>
      <Link to="/shop" className="btn-primary">{tr('Continue shopping')}</Link>
    </div></div>
  );

  return (
    <div style={wrap}>
      <div className="container-x" style={{ padding: '2rem 1.5rem 5rem' }}>
        <h1 style={{ letterSpacing: '-.05em' }}>{tr('Your cart')}</h1>
        {items.length === 0 ? (
          <p style={{ color: 'rgba(244,250,240,.6)' }}>{tr('Your cart is empty.')} <Link to="/shop" style={{ color: '#9FD96A' }}>{tr('Back to shop')}</Link></p>
        ) : (
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2rem', alignItems: 'start' }}>
            <div style={{ display: 'grid', gap: '.8rem' }}>
              {items.map(i => (
                <div key={i.id} className="card-dark" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '.8rem 1rem' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden', background: 'rgba(255,255,255,.05)', flexShrink: 0 }}>
                    {i.image_url && <img src={i.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link to={`/product/${i.id}`} style={{ fontWeight: 700 }}>{tr(i.name)}</Link>
                    <div style={{ fontSize: '.85rem', color: 'rgba(244,250,240,.55)' }}>{kes(i.price)}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <button onClick={() => setQty(i.id, i.qty - 1)} aria-label="Decrease" className="field" style={{ width: 34, padding: '.3rem', cursor: 'pointer' }}>−</button>
                    <span style={{ minWidth: 20, textAlign: 'center' }}>{i.qty}</span>
                    <button onClick={() => setQty(i.id, i.qty + 1)} aria-label="Increase" className="field" style={{ width: 34, padding: '.3rem', cursor: 'pointer' }}>+</button>
                  </div>
                  <div style={{ width: 90, textAlign: 'right', fontWeight: 700 }}>{kes(i.price * i.qty)}</div>
                  <button onClick={() => remove(i.id)} aria-label="Remove" style={{ color: 'rgba(244,250,240,.5)', cursor: 'pointer' }}><Icon name="solar:trash-bin-trash-linear" size={18} /></button>
                </div>
              ))}
            </div>

            <form onSubmit={pay} className="card-dark" style={{ padding: '1.3rem', display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700 }}><span>{tr('Total')}</span><span>{kes(total)}</span></div>
              {items.some(i => i.requires_prescription) && <p style={{ margin: 0, fontSize: '.8rem', color: '#F5B94A' }}>{tr('Prescription items require a valid prescription at pickup or delivery.')}</p>}
              <label className="label" htmlFor="phone">{tr('M-Pesa phone number')}</label>
              <input id="phone" className="field" type="tel" required placeholder="0712345678" value={phone} onChange={e => setPhone(e.target.value)} disabled={state.step === 'waiting' || state.step === 'sending'} />
              <button className="btn-primary" disabled={state.step === 'sending' || state.step === 'waiting'} style={{ justifyContent: 'center', width: '100%' }}>
                {state.step === 'sending' ? tr('Sending request…') : state.step === 'waiting' ? tr('Check your phone and enter PIN…') : `${tr('Pay with M-Pesa')} · ${kes(total)}`}
              </button>
              {state.step === 'failed' && <p role="alert" style={{ margin: 0, color: '#f87171', fontSize: '.85rem' }}>{state.msg}</p>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
