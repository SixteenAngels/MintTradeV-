import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, MD3LightTheme as DefaultTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';
import { Platform, useColorScheme, useWindowDimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from './store/useAuthStore';
import * as Sentry from 'sentry-expo';
import { Snackbar } from 'react-native-paper';
import { useSnackbarStore } from './store/useSnackbarStore';

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  enableInExpoDevelopment: true,
  debug: false,
});

function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const { user, initializing, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    if (initializing) return;
    const inAuthGroup = segments[0] === 'auth';
    if (!user && !inAuthGroup) {
      router.replace('/auth/login');
    } else if (user && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [user, initializing, segments, router]);

  return <>{children}</>;
}

export default function RootLayout() {
  const { visible, message, hide } = useSnackbarStore();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const fontScale = isTablet ? 1.15 : 1.0;
  const baseLight = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, primary: '#00B67A', secondary: '#10B981', background: '#FFFFFF', surface: '#FFFFFF' },
    roundness: 16,
  };
  const baseDark = {
    ...MD3DarkTheme,
    colors: { ...MD3DarkTheme.colors, primary: '#00B67A', secondary: '#10B981' },
    roundness: 16,
  };

  function withScaledFonts(theme: typeof baseLight) {
    const fonts = Object.fromEntries(
      Object.entries(theme.fonts).map(([k, v]: any) => [k, { ...v, fontSize: Math.round((v.fontSize || 14) * fontScale), lineHeight: v.lineHeight ? Math.round(v.lineHeight * fontScale) : undefined }])
    );
    return { ...theme, fonts } as typeof theme;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={isDark ? withScaledFonts(baseDark) : withScaledFonts(baseLight)}>
          <StatusBar style={isDark ? 'light' : 'dark'} />
          <AuthGate>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="auth/login" />
              <Stack.Screen name="auth/signup" />
            </Stack>
            <Snackbar visible={visible} onDismiss={hide} duration={3000} style={{ marginBottom: 24 }}>
              {message}
            </Snackbar>
          </AuthGate>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
