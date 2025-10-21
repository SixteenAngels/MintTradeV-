import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';
import express from 'express';
import cors from 'cors';
import { assertAuth, db, writeLedger } from './util';

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/initiate-payment', async (req, res) => {
  try {
    const userId = await assertAuth(req);
    const { amount, channel } = req.body as { amount: number; channel: 'momo' | 'card' };
    // TODO: Call Zeepay to create payment and return checkout info
    const providerRef = `demo-${Date.now()}`;
    await writeLedger({ userId, amount, currency: 'GHS', type: 'deposit', status: 'pending', provider: 'zeepay', providerRef });
    res.json({ reference: providerRef, checkoutUrl: 'https://example.com/pay' });
  } catch (e: any) {
    res.status(400).send(e.message || 'initiate failed');
  }
});

app.post('/verify-payment', async (req, res) => {
  try {
    const userId = await assertAuth(req);
    const { reference } = req.body as { reference: string };
    // TODO: Verify Zeepay reference then credit wallet and ledger status
    await writeLedger({ userId, amount: 0, currency: 'GHS', type: 'deposit', status: 'completed', provider: 'zeepay', providerRef: reference });
    res.json({ ok: true });
  } catch (e: any) {
    res.status(400).send(e.message || 'verify failed');
  }
});

app.post('/withdraw', async (req, res) => {
  try {
    const userId = await assertAuth(req);
    const { amount, destination } = req.body as { amount: number; destination: { type: 'momo' | 'bank'; account: string } };
    // TODO: Validate KYC & balance, call Zeepay payout
    await writeLedger({ userId, amount: -Math.abs(amount), currency: 'GHS', type: 'withdraw', status: 'pending', provider: 'zeepay' });
    res.json({ ok: true });
  } catch (e: any) {
    res.status(400).send(e.message || 'withdraw failed');
  }
});

app.post('/kyc/submit', async (req, res) => {
  try {
    const userId = await assertAuth(req);
    // TODO: Handle multipart, send to Smile ID, store references
    await db.collection('users').doc(userId).set({ kycStatus: 'pending' }, { merge: true });
    res.json({ status: 'pending' });
  } catch (e: any) {
    res.status(400).send(e.message || 'kyc submit failed');
  }
});

app.get('/kyc/status', async (req, res) => {
  try {
    const userId = await assertAuth(req);
    const doc = await db.collection('users').doc(userId).get();
    res.json({ status: (doc.get('kycStatus') as string) || 'not_started' });
  } catch (e: any) {
    res.status(400).send(e.message || 'kyc status failed');
  }
});

app.get('/portfolio', async (req, res) => {
  try {
    const userId = await assertAuth(req);
    const snap = await db.collection('portfolios').doc(userId).collection('holdings').get();
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.json(data);
  } catch (e: any) {
    res.status(400).send(e.message || 'portfolio failed');
  }
});

app.get('/transactions', async (req, res) => {
  try {
    const userId = await assertAuth(req);
    const snap = await db.collection('wallets').doc(userId).collection('transactions').orderBy('createdAt', 'desc').limit(100).get();
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.json(data);
  } catch (e: any) {
    res.status(400).send(e.message || 'transactions failed');
  }
});

app.post('/submit-order', async (req, res) => {
  try {
    const userId = await assertAuth(req);
    const { symbol, side, qty } = req.body as { symbol: string; side: 'buy' | 'sell'; qty: number };
    // TODO: Validate funds and route to broker adapter; record order
    await db.collection('orders').add({ userId, symbol, side, qty, status: 'pending', createdAt: admin.firestore.FieldValue.serverTimestamp() });
    res.json({ ok: true });
  } catch (e: any) {
    res.status(400).send(e.message || 'order failed');
  }
});

app.get('/market', async (req, res) => {
  try {
    const base = 'https://dev.kwayisi.org/apis/gse';
    const path = (req.query.path as string) || 'live';
    const url = `${base}/${path}`;
    const r = await axios.get(url);
    res.json(r.data);
  } catch (e: any) {
    res.status(400).send(e.message || 'market failed');
  }
});

export const api = functions.https.onRequest(app);

// Webhook for Zeepay to confirm payments
export const zeepayWebhook = functions.https.onRequest(async (req, res) => {
  try {
    // TODO: validate signature
    const { userId, reference, amount, status } = req.body || {};
    await writeLedger({ userId, amount: Number(amount || 0), currency: 'GHS', type: 'deposit', status: status === 'success' ? 'completed' : 'failed', provider: 'zeepay', providerRef: reference });
    await db.collection('wallets').doc(userId).collection('transactions').add({ amount: Number(amount || 0), type: 'deposit', status, providerRef: reference, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    res.json({ ok: true });
  } catch (e: any) {
    res.status(400).send(e.message || 'webhook failed');
  }
});

// Finnhub proxy for real-time quotes (supports international + Ghana via .GH suffix)
export const finnhubQuote = functions.https.onRequest(async (req, res) => {
  try {
    const symbol = (req.query.symbol as string) || '';
    if (!symbol) {
      res.status(400).send('symbol required');
      return;
    }
    const token = process.env.FINNHUB_API_KEY;
    if (!token) {
      res.status(500).send('server missing FINNHUB_API_KEY');
      return;
    }
    const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${token}`;
    const r = await axios.get(url);
    res.json(r.data);
    return;
  } catch (e: any) {
    res.status(400).send(e.message || 'quote failed');
  }
});
