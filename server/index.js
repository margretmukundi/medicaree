// Minimal M-Pesa (Daraja) STK Push backend. Run: node server/index.js
import http from 'node:http';
import fs from 'node:fs';

const envFile = new URL('./.env', import.meta.url);
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
}
const e = process.env;
const BASE = e.MPESA_ENV === 'production' ? 'https://api.safaricom.co.ke' : 'https://sandbox.safaricom.co.ke';
const payments = new Map(); // CheckoutRequestID -> { status, message, receipt }

const send = (res, code, body) => { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(body)); };
const readJson = req => new Promise(r => { let d = ''; req.on('data', c => d += c); req.on('end', () => { try { r(JSON.parse(d || '{}')); } catch { r({}); } }); });

async function token() {
  const auth = Buffer.from(`${e.MPESA_CONSUMER_KEY}:${e.MPESA_CONSUMER_SECRET}`).toString('base64');
  const r = await fetch(`${BASE}/oauth/v1/generate?grant_type=client_credentials`, { headers: { Authorization: `Basic ${auth}` } });
  if (!r.ok) throw new Error('M-Pesa auth failed');
  return (await r.json()).access_token;
}

function normalizePhone(p = '') {
  const d = String(p).replace(/\D/g, '');
  if (/^0[17]\d{8}$/.test(d)) return '254' + d.slice(1);
  if (/^254[17]\d{8}$/.test(d)) return d;
  if (/^[17]\d{8}$/.test(d)) return '254' + d;
  return null;
}

http.createServer(async (req, res) => {
  try {
    if (req.method === 'POST' && req.url === '/api/mpesa/stkpush') {
      const { phone, amount, items } = await readJson(req);
      const msisdn = normalizePhone(phone);
      const amt = Math.round(Number(amount));
      if (!msisdn) return send(res, 400, { error: 'Enter a valid Safaricom number, e.g. 0712345678' });
      if (!(amt >= 1)) return send(res, 400, { error: 'Invalid amount' });
      const ts = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
      const password = Buffer.from(e.MPESA_SHORTCODE + e.MPESA_PASSKEY + ts).toString('base64');
      const r = await fetch(`${BASE}/mpesa/stkpush/v1/processrequest`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${await token()}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          BusinessShortCode: e.MPESA_SHORTCODE, Password: password, Timestamp: ts,
          TransactionType: 'CustomerPayBillOnline', Amount: amt, PartyA: msisdn, PartyB: e.MPESA_SHORTCODE,
          PhoneNumber: msisdn, CallBackURL: e.MPESA_CALLBACK_URL,
          AccountReference: 'Medicare', TransactionDesc: `Order (${(items || []).length} items)`,
        }),
      });
      const data = await r.json();
      if (data.ResponseCode !== '0') return send(res, 502, { error: data.errorMessage || data.ResponseDescription || 'STK push failed' });
      payments.set(data.CheckoutRequestID, { status: 'pending' });
      return send(res, 200, { checkoutRequestId: data.CheckoutRequestID, message: data.CustomerMessage });
    }

    if (req.method === 'POST' && req.url === '/api/mpesa/callback') {
      const cb = (await readJson(req))?.Body?.stkCallback;
      if (cb) {
        const receipt = cb.CallbackMetadata?.Item?.find(i => i.Name === 'MpesaReceiptNumber')?.Value;
        payments.set(cb.CheckoutRequestID, { status: cb.ResultCode === 0 ? 'success' : 'failed', message: cb.ResultDesc, receipt });
      }
      return send(res, 200, { ResultCode: 0, ResultDesc: 'Accepted' });
    }

    const m = req.method === 'GET' && req.url.match(/^\/api\/mpesa\/status\/([\w-]+)/);
    if (m) return send(res, 200, payments.get(m[1]) || { status: 'pending' });

    send(res, 404, { error: 'Not found' });
  } catch (err) {
    console.error(err);
    send(res, 500, { error: err.message });
  }
}).listen(e.PORT || 3001, () => console.log(`M-Pesa server on :${e.PORT || 3001} (${e.MPESA_ENV})`));
