import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Switch, TextInput, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { getKycStatus, submitKyc } from '../../services/kycService';
import { useSecurityStore } from '../../store/useSecurityStore';
import { BlurView } from 'expo-blur';
import { useResponsive } from '../../hooks/useResponsive';

export default function ProfileScreen() {
  const { containerPadding, twoPane } = useResponsive();
  const { init, loading, biometricsAvailable, biometricsEnabled, setBiometricsEnabled, hasPin, setPin } = useSecurityStore();
  const [kyc, setKyc] = useState<{ status: string; reason?: string } | null>(null);
  const [pin, setPinLocal] = useState('');

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    (async () => {
      try {
        const s = await getKycStatus();
        setKyc(s);
      } catch {}
    })();
  }, []);

  return (
    <View style={{ flex: 1, paddingHorizontal: containerPadding, paddingTop: 16 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>Profile</Text>
      <View style={{ flex: 1, flexDirection: twoPane ? 'row' : 'column', gap: 16 }}>
        <BlurView intensity={20} tint="light" style={{ flex: 1, borderRadius: 16, overflow: 'hidden', padding: 16 }}>
          <Text style={{ marginBottom: 8 }}>Security</Text>
          <TextInput
            mode="outlined"
            label={hasPin ? 'Update PIN' : 'Set 4-digit PIN'}
            value={pin}
            onChangeText={setPinLocal}
            secureTextEntry
            keyboardType="number-pad"
            style={{ marginBottom: 12 }}
          />
          <Text onPress={async () => { if (pin.length >= 4) { await setPin(pin); setPinLocal(''); } }} style={{ color: '#2563eb', marginBottom: 16 }}>
            {hasPin ? 'Save new PIN' : 'Save PIN'}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>Enable biometrics</Text>
            <Switch
              disabled={!biometricsAvailable}
              value={biometricsEnabled}
              onValueChange={(v) => setBiometricsEnabled(v)}
            />
          </View>
          {!biometricsAvailable && (
            <Text style={{ marginTop: 8, color: '#6b7280' }}>Biometrics not available or not enrolled.</Text>
          )}
        </BlurView>

        <BlurView intensity={20} tint="light" style={{ flex: 1, borderRadius: 16, overflow: 'hidden', padding: 16 }}>
          <Text style={{ marginBottom: 8 }}>KYC</Text>
          <Text>Status: {kyc?.status ?? 'unknown'}</Text>
          {kyc?.reason ? <Text>Reason: {kyc.reason}</Text> : null}
         <Link href="/profile/kyc" asChild>
          <Button>Go to KYC</Button>
        </Link>
        </BlurView>

        <BlurView intensity={20} tint="light" style={{ flex: 1, borderRadius: 16, overflow: 'hidden', padding: 16 }}>
          <Text style={{ marginBottom: 8 }}>Symbol</Text>
          <Link href="/profile/BTC" asChild>
            <Button>Go to BTC Symbol</Button>
          </Link>
        </BlurView>
      </View>
    </View>
  );
}
