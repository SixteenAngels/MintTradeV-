import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function MarketsScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>Markets</Text>
      <Text>Market list and charts coming next.</Text>
    </View>
  );
}
