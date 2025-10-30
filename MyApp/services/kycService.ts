import { getFirebaseAuth } from '../store/useAuthStore';

const API_BASE = process.env.EXPO_PUBLIC_API_BASE ?? '';

async function api(path: string, init?: RequestInit) {
  const auth = await getFirebaseAuth();
  const user = auth.currentUser;
  const token = user ? await user.getIdToken() : undefined;
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export type KycStatus = 'pending' | 'verified' | 'rejected' | 'not_started';

export async function submitKyc(formData: FormData) {
  return api('/api/kyc/submit', { method: 'POST', body: formData });
}

export async function getKycStatus(): Promise<{ status: KycStatus; reason?: string }> {
  return api('/api/kyc/status', { method: 'GET' });
}
