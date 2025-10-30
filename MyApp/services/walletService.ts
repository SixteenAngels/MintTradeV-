import { getFirebaseAuth } from '../store/useAuthStore';

const API_BASE = process.env.EXPO_PUBLIC_API_BASE ?? '';

async function api(path: string, init?: RequestInit) {
  const auth = await getFirebaseAuth();
  const user = auth.currentUser;
  const token = user ? await user.getIdToken() : undefined;
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function initiateDeposit(amount: number, channel: 'momo' | 'card') {
  return api('/api/initiate-payment', { method: 'POST', body: JSON.stringify({ amount, channel }) });
}
export async function verifyPayment(reference: string) {
  return api('/api/verify-payment', { method: 'POST', body: JSON.stringify({ reference }) });
}
export async function requestWithdrawal(amount: number, destination: { type: 'momo' | 'bank'; account: string }) {
  return api('/api/withdraw', { method: 'POST', body: JSON.stringify({ amount, destination }) });
}

export type WalletTx = {
  id: string;
  amount: number;
  type: 'deposit' | 'withdraw' | 'trade' | 'fee';
  status: string;
  createdAt: string | number;
};

export async function getTransactions(): Promise<WalletTx[]> {
  return api('/api/transactions', { method: 'GET' });
}
