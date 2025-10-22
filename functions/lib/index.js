"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.finnhubQuote = exports.zeepayWebhook = exports.api = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const util_1 = require("./util");
admin.initializeApp();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post('/initiate-payment', async (req, res) => {
    try {
        const userId = await (0, util_1.assertAuth)(req);
        const { amount, channel } = req.body;
        // TODO: Call Zeepay to create payment and return checkout info
        const providerRef = `demo-${Date.now()}`;
        await (0, util_1.writeLedger)({ userId, amount, currency: 'GHS', type: 'deposit', status: 'pending', provider: 'zeepay', providerRef });
        res.json({ reference: providerRef, checkoutUrl: 'https://example.com/pay' });
    }
    catch (e) {
        res.status(400).send(e.message || 'initiate failed');
    }
});
app.post('/verify-payment', async (req, res) => {
    try {
        const userId = await (0, util_1.assertAuth)(req);
        const { reference } = req.body;
        // TODO: Verify Zeepay reference then credit wallet and ledger status
        await (0, util_1.writeLedger)({ userId, amount: 0, currency: 'GHS', type: 'deposit', status: 'completed', provider: 'zeepay', providerRef: reference });
        res.json({ ok: true });
    }
    catch (e) {
        res.status(400).send(e.message || 'verify failed');
    }
});
app.post('/withdraw', async (req, res) => {
    try {
        const userId = await (0, util_1.assertAuth)(req);
        const { amount, destination } = req.body;
        // TODO: Validate KYC & balance, call Zeepay payout
        await (0, util_1.writeLedger)({ userId, amount: -Math.abs(amount), currency: 'GHS', type: 'withdraw', status: 'pending', provider: 'zeepay' });
        res.json({ ok: true });
    }
    catch (e) {
        res.status(400).send(e.message || 'withdraw failed');
    }
});
app.post('/kyc/submit', async (req, res) => {
    try {
        const userId = await (0, util_1.assertAuth)(req);
        // TODO: Handle multipart, send to Smile ID, store references
        await util_1.db.collection('users').doc(userId).set({ kycStatus: 'pending' }, { merge: true });
        res.json({ status: 'pending' });
    }
    catch (e) {
        res.status(400).send(e.message || 'kyc submit failed');
    }
});
app.get('/kyc/status', async (req, res) => {
    try {
        const userId = await (0, util_1.assertAuth)(req);
        const doc = await util_1.db.collection('users').doc(userId).get();
        res.json({ status: doc.get('kycStatus') || 'not_started' });
    }
    catch (e) {
        res.status(400).send(e.message || 'kyc status failed');
    }
});
app.get('/portfolio', async (req, res) => {
    try {
        const userId = await (0, util_1.assertAuth)(req);
        const snap = await util_1.db.collection('portfolios').doc(userId).collection('holdings').get();
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        res.json(data);
    }
    catch (e) {
        res.status(400).send(e.message || 'portfolio failed');
    }
});
app.get('/transactions', async (req, res) => {
    try {
        const userId = await (0, util_1.assertAuth)(req);
        const snap = await util_1.db.collection('wallets').doc(userId).collection('transactions').orderBy('createdAt', 'desc').limit(100).get();
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        res.json(data);
    }
    catch (e) {
        res.status(400).send(e.message || 'transactions failed');
    }
});
app.post('/submit-order', async (req, res) => {
    try {
        const userId = await (0, util_1.assertAuth)(req);
        const { symbol, side, qty } = req.body;
        // TODO: Validate funds and route to broker adapter; record order
        await util_1.db.collection('orders').add({ userId, symbol, side, qty, status: 'pending', createdAt: admin.firestore.FieldValue.serverTimestamp() });
        res.json({ ok: true });
    }
    catch (e) {
        res.status(400).send(e.message || 'order failed');
    }
});
app.get('/market', async (req, res) => {
    try {
        const base = 'https://dev.kwayisi.org/apis/gse';
        const path = req.query.path || 'live';
        const url = `${base}/${path}`;
        const r = await axios_1.default.get(url);
        res.json(r.data);
    }
    catch (e) {
        res.status(400).send(e.message || 'market failed');
    }
});
exports.api = functions.https.onRequest(app);
// Webhook for Zeepay to confirm payments
exports.zeepayWebhook = functions.https.onRequest(async (req, res) => {
    try {
        // TODO: validate signature
        const { userId, reference, amount, status } = req.body || {};
        await (0, util_1.writeLedger)({ userId, amount: Number(amount || 0), currency: 'GHS', type: 'deposit', status: status === 'success' ? 'completed' : 'failed', provider: 'zeepay', providerRef: reference });
        await util_1.db.collection('wallets').doc(userId).collection('transactions').add({ amount: Number(amount || 0), type: 'deposit', status, providerRef: reference, createdAt: admin.firestore.FieldValue.serverTimestamp() });
        res.json({ ok: true });
    }
    catch (e) {
        res.status(400).send(e.message || 'webhook failed');
    }
});
// Finnhub proxy for real-time quotes (supports international + Ghana via .GH suffix)
exports.finnhubQuote = functions.runWith({ secrets: ['FINNHUB_API_KEY'] }).https.onRequest(async (req, res) => {
    try {
        const symbol = req.query.symbol || '';
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
        const r = await axios_1.default.get(url);
        res.json(r.data);
        return;
    }
    catch (e) {
        res.status(400).send(e.message || 'quote failed');
    }
});
