import { getFirebaseAuth } from '../store/useAuthStore';

export async function apiFetch(path: string, init?: RequestInit, retries = 2): Promise<Response> {
  const base = process.env.EXPO_PUBLIC_API_BASE ?? '';
  const auth = await getFirebaseAuth();
  const token = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
  });
  if (res.ok) return res;
  if (retries > 0 && res.status >= 500) {
    await new Promise((r) => setTimeout(r, 400));
    return apiFetch(path, init, retries - 1);
  }
  return res;
}
