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
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export type OrderSide = 'buy' | 'sell';
export async function submitOrder(params: { symbol: string; side: OrderSide; qty: number; price?: number }) {
  return api('/api/submit-order', { method: 'POST', body: JSON.stringify(params) });
}
