import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function PortfolioScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>Portfolio</Text>
      <Text>Your holdings and P&L will appear here.</Text>
    </View>
  );
}
