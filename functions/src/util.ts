import * as admin from 'firebase-admin';

admin.initializeApp();

export const db = admin.firestore();

export async function assertAuth(req: any): Promise<string> {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
  if (!token) throw new Error('unauthenticated');
  const decoded = await admin.auth().verifyIdToken(token);
  return decoded.uid;
}

export async function writeLedger(entry: {
  userId: string;
  amount: number;
  currency: 'GHS';
  type: 'deposit' | 'withdraw' | 'trade' | 'fee';
  status: 'pending' | 'completed' | 'failed';
  provider?: 'zeepay';
  providerRef?: string;
}) {
  const ref = db.collection('ledger').doc();
  await ref.set({ ...entry, createdAt: admin.firestore.FieldValue.serverTimestamp() });
  return ref.id;
}
