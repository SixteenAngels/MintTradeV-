import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Action = {
  name: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
};

const actions: Action[] = [
  { name: 'Buy', icon: 'add-circle-outline' },
  { name: 'Sell', icon: 'remove-circle-outline' },
  { name: 'Deposit', icon: 'arrow-down-circle-outline' },
  { name: 'Withdraw', icon: 'arrow-up-circle-outline' },
];

export default function QuickActions() {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 16 }}>
      {actions.map((action) => (
        <Pressable key={action.name} style={{ alignItems: 'center' }}>
          <Ionicons name={action.icon} size={32} color="#fff" />
          <Text style={{ color: '#fff', marginTop: 4 }}>{action.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}
