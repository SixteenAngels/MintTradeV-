import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, MD3LightTheme as DefaultTheme, MD3DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../store/useAuthStore';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const { user, initializing, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, []);

  useEffect(() => {
    if (!initializing) {
      SplashScreen.hideAsync();
    }
  }, [initializing]);

  if (initializing) {
    return null;
  }

  const inAuthGroup = segments[0] === 'auth';

  if (!user && !inAuthGroup) {
    router.replace('/auth/login');
    return null;
  }
  if (user && inAuthGroup) {
    router.replace('/(tabs)/home');
    return null;
  }

  return <>{children}</>;
}

/**
 * Applies the custom font theme to a paper theme.
 * @param {any} theme - The react-native-paper theme object.
 * @returns {any} A new theme object with custom fonts applied.
 */
function applyFonts(theme: any): any {
  const fonts = Object.fromEntries(
    Object.entries(theme.fonts).map(([key, value]: any) => {
      const isTitle = ['display', 'headline', 'title'].some(s => key.toLowerCase().includes(s));
      const fontFamily = isTitle ? 'Poppins-SemiBold' : 'Inter-Regular';
      return [key, { ...value, fontFamily }];
    })
  );
  return { ...theme, fonts };
}

export default function RootLayout() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const lightTheme = applyFonts({
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, primary: '#00B67A', secondary: '#10B981', background: '#FFFFFF', surface: '#FFFFFF' },
    roundness: 16,
  });

  const darkTheme = applyFonts({
    ...MD3DarkTheme,
    colors: { ...MD3DarkTheme.colors, primary: '#00B67A', secondary: '#10B981' },
    roundness: 16,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={isDark ? darkTheme : lightTheme}>
          <StatusBar style={isDark ? 'light' : 'dark'} />
          <AuthGate>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="auth/login" />
              <Stack.Screen name="auth/signup" />
            </Stack>
          </AuthGate>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
