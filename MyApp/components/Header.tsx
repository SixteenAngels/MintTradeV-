import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/useAuthStore';
import { RootNavigationProp } from '../types';

export default function Header() {
  const navigation = useNavigation<RootNavigationProp>();
  const user = useAuthStore((s) => s.user);

  // Function to get the greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>{getGreeting()}, {user?.displayName || 'Prosper'} 👋</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable onPress={() => navigation.navigate('profile')}>
          <Image
            source={{ uri: user?.photoURL || 'https://example.com/default-avatar.png' }}
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 16 }}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('alerts')}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}
