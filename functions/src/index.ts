import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';

admin.initializeApp();
const db = admin.firestore();

export const initiatePayment = functions.https.onRequest(async (req, res) => {
  // TODO: Implement Zeepay initiation securely
  res.json({ ok: true, reference: 'demo-ref' });
});

export const verifyPayment = functions.https.onRequest(async (req, res) => {
  res.json({ ok: true });
});

export const withdraw = functions.https.onRequest(async (req, res) => {
  res.json({ ok: true });
});

export const kycSubmit = functions.https.onRequest(async (req, res) => {
  res.json({ status: 'pending' });
});

export const kycStatus = functions.https.onRequest(async (req, res) => {
  res.json({ status: 'pending' });
});

export const marketProxy = functions.https.onRequest(async (req, res) => {
  const base = 'https://dev.kwayisi.org/apis/gse';
  const path = req.query.path as string;
  const url = `${base}/${path || 'live'}`;
  const r = await axios.get(url);
  res.json(r.data);
});
