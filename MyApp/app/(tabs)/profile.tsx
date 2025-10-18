import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>Profile</Text>
      <Text>Account settings and KYC status will appear here.</Text>
    </View>
  );
}
