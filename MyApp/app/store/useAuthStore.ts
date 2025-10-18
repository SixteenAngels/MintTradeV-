import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
  type Auth,
} from 'firebase/auth';

let firebaseApp: FirebaseApp | undefined;
let authInstance: Auth | undefined;
let authListenerInitialized = false;

async function ensureAuth(): Promise<Auth> {
  if (!firebaseApp) {
    const firebaseConfig = {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    } as const;
    firebaseApp = initializeApp(firebaseConfig);
  }

  if (authInstance) return authInstance;

  if (Platform.OS === 'web') {
    const { getAuth, setPersistence, browserLocalPersistence } = await import('firebase/auth');
    const webAuth = getAuth(firebaseApp!);
    await setPersistence(webAuth, browserLocalPersistence);
    authInstance = webAuth;
  } else {
    const { initializeAuth, getReactNativePersistence } = await import('firebase/auth/react-native');
    authInstance = initializeAuth(firebaseApp!, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }
  return authInstance!;
}

export type AuthState = {
  user: User | null;
  initializing: boolean;
  error?: string;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  initAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      initializing: true,
      error: undefined,
      initAuth: () => {
        if (authListenerInitialized) return;
        ensureAuth().then((auth) => {
          onAuthStateChanged(auth, (user) => {
            set({ user: user ?? null, initializing: false, error: undefined });
          });
          authListenerInitialized = true;
        });
      },
      async signUp(email, password) {
        const auth = await ensureAuth();
        set({ error: undefined });
        await createUserWithEmailAndPassword(auth, email, password);
      },
      async signIn(email, password) {
        const auth = await ensureAuth();
        set({ error: undefined });
        await signInWithEmailAndPassword(auth, email, password);
      },
      async signOut() {
        const auth = await ensureAuth();
        await firebaseSignOut(auth);
      },
    }),
    {
      name: 'auth-store',
      storage: {
        getItem: async (name) => {
          const str = await AsyncStorage.getItem(name);
          return str ?? null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, value);
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
      // Only persist minimal UI state; user session comes from Firebase persistence
      partialize: (state) => ({ initializing: state.initializing }),
    }
  )
);

export async function getFirebaseAuth(): Promise<Auth> {
  return ensureAuth();
}
