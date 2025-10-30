import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Link } from 'expo-router';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { useAuthStore } from '../../store/useAuthStore';
import * as Haptics from 'expo-haptics';
import { useSnackbarStore } from '../../store/useSnackbarStore';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const show = useSnackbarStore((s) => s.show);
  const signIn = useAuthStore((s) => s.signIn);

  const onLogin = async () => {
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      show('Logged in');
    } catch (e: any) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      show(e?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>Welcome back</Text>
      <InputField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <InputField label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button onPress={onLogin} loading={loading} style={{ marginTop: 8 }} accessibilityLabel="Log in" accessibilityHint="Authenticate with email and password">Login</Button>
      <Text style={{ marginTop: 16 }}>
        Don't have an account? <Link href="/auth/signup">Sign up</Link>
      </Text>
      <Text style={{ marginTop: 12 }}>
        Prefer phone? <Link href="/auth/phone">Use phone OTP</Link>
      </Text>
    </View>
  );
}
