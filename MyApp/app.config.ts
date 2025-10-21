import type { ExpoConfig } from 'expo/config';

export default ({ config }: { config: ExpoConfig }): ExpoConfig => ({
  ...config,
  name: 'MyApp',
  slug: 'MyApp',
  extra: {
    firebase: {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDEwB8ekurx17GIvunBhEQcp-3xL8cU9i4',
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 'minttrade-e8410.firebaseapp.com',
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'minttrade-e8410',
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'minttrade-e8410.firebasestorage.app',
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '276267817525',
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '1:276267817525:web:0f0f2a5136d05ca5d96f7c',
    },
    gseApiBaseUrl: process.env.EXPO_PUBLIC_GSE_API_BASE_URL ?? 'https://dev.kwayisi.org/apis/gse',
  },
});
