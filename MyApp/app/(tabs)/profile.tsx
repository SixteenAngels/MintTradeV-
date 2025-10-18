import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Switch, TextInput } from 'react-native-paper';
import { useSecurityStore } from '../store/useSecurityStore';

export default function ProfileScreen() {
  const { init, loading, biometricsAvailable, biometricsEnabled, setBiometricsEnabled, hasPin, setPin } = useSecurityStore();
  const [pin, setPinLocal] = useState('');

  useEffect(() => {
    init();
  }, [init]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>Profile</Text>
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
    </View>
  );
}
