import { create } from 'zustand';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

const PIN_KEY = 'user_pin_hash_v1';
const BIO_KEY = 'biometrics_enabled_v1';

async function hashPin(pin: string): Promise<string> {
  // Simple SHA-256 hash; in production, prefer a server-assisted KDF
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, pin);
}

export type SecurityState = {
  biometricsAvailable: boolean;
  biometricsEnabled: boolean;
  hasPin: boolean;
  loading: boolean;
  init: () => Promise<void>;
  setPin: (pin: string) => Promise<void>;
  verifyPin: (pin: string) => Promise<boolean>;
  setBiometricsEnabled: (enabled: boolean) => Promise<void>;
  authenticateBiometric: () => Promise<boolean>;
};

export const useSecurityStore = create<SecurityState>((set, get) => ({
  biometricsAvailable: false,
  biometricsEnabled: false,
  hasPin: false,
  loading: true,
  async init() {
    const hw = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    const biometricsAvailable = hw && enrolled;
    const biometricsEnabled = (await SecureStore.getItemAsync(BIO_KEY)) === '1';
    const pinHash = await SecureStore.getItemAsync(PIN_KEY);
    set({
      biometricsAvailable,
      biometricsEnabled: biometricsAvailable && biometricsEnabled,
      hasPin: !!pinHash,
      loading: false,
    });
  },
  async setPin(pin) {
    const hashed = await hashPin(pin);
    await SecureStore.setItemAsync(PIN_KEY, hashed, { keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK });
    set({ hasPin: true });
  },
  async verifyPin(pin) {
    const stored = await SecureStore.getItemAsync(PIN_KEY);
    if (!stored) return false;
    const input = await hashPin(pin);
    return stored === input;
  },
  async setBiometricsEnabled(enabled) {
    await SecureStore.setItemAsync(BIO_KEY, enabled ? '1' : '0');
    set({ biometricsEnabled: enabled });
  },
  async authenticateBiometric() {
    const res = await LocalAuthentication.authenticateAsync({ promptMessage: 'Authenticate' });
    return res.success;
  },
}));
