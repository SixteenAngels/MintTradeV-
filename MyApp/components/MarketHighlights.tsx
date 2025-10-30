import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const trending = [
  { logo: '🔥', name: 'CalBank', trend: 'Up 4.3% today' },
  { logo: '📈', name: 'MTN Ghana', trend: 'Top Gainer' },
  { logo: '📰', name: 'GOIL', trend: 'News Highlight' },
];

const HighlightCard = ({ item }: { item: typeof trending[0] }) => (
  <BlurView intensity={100} tint="dark" style={{ borderRadius: 20, overflow: 'hidden', width: 150, marginRight: 16 }}>
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24 }}>{item.logo}</Text>
      <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: 8 }}>{item.name}</Text>
      <Text style={{ color: '#888' }}>{item.trend}</Text>
      <View style={{ marginTop: 8 }}>
        <Ionicons name="arrow-forward-circle" size={24} color="#00B67A" />
      </View>
    </View>
  </BlurView>
);

export default function MarketHighlights() {
  return (
    <View style={{ margin: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 8 }}>Market Highlights</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {trending.map((item, index) => (
          <HighlightCard key={index} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}
