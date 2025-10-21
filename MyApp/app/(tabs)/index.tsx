import React from 'react';
import { View, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { Button } from '../components/Button';
import { useAuthStore } from '../store/useAuthStore';
import { MotiView } from 'moti';
import { AnimatedLogo } from '../components/AnimatedLogo';
import { BlurView } from 'expo-blur';

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  return (
    <View
      style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}
      accessibilityLabel="Home Screen"
      accessibilityHint="Shows balance and quick actions"
    >
      <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 500 }}>
        <Text variant="headlineLarge" style={{ textAlign: 'center', marginBottom: 16 }}>Mint Trade</Text>
      </MotiView>

      <BlurView intensity={30} tint="light" style={{ borderRadius: 16, overflow: 'hidden', padding: 16, marginBottom: 16 }}>
        {Platform.OS === 'web' ? (
          <View style={{ width: 200, height: 200, marginBottom: 8 }} />
        ) : (
          <AnimatedLogo />
        )}
      </BlurView>

      {user?.email ? (
        <>
          <Text style={{ marginVertical: 16 }}>Signed in as {user.email}</Text>
          <Button onPress={signOut} accessibilityLabel="Sign out" accessibilityHint="Signs out of your session">Sign out</Button>
        </>
      ) : null}
    </View>
  );
}
