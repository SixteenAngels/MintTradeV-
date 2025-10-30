import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Link } from 'expo-router';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { useAuthStore } from '../../store/useAuthStore';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const signUp = useAuthStore((s) => s.signUp);

  const onSignup = async () => {
    setLoading(true);
    try {
      await signUp(email.trim(), password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>Create your account</Text>
      <InputField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <InputField label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button onPress={onSignup} loading={loading} style={{ marginTop: 8 }}>Sign up</Button>
      <Text style={{ marginTop: 16 }}>
        Already have an account? <Link href="/auth/login">Log in</Link>
      </Text>
    </View>
  );
}
