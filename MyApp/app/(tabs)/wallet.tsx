import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function WalletScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>Wallet</Text>
      <Text>Deposit and withdraw flows will be added.</Text>
    </View>
  );
}
