import React from 'react';
import { View, Text } from 'react-native';
import { BlurView } from 'expo-blur';

const insights = [
  {
    title: 'AI Predicts: GCB to Outperform Market',
    summary: 'Our AI model suggests a strong buy signal for GCB stock, with a projected 15% upside in the next quarter.',
    source: 'Mintrade AI',
  },
  {
    title: 'Market Movers: MTN Ghana Hits All-Time High',
    summary: 'MTN Ghana continues its bullish run, reaching a new peak as investors cheer its latest earnings report.',
    source: 'Ghana Stock Exchange',
  },
];

const InsightCard = ({ item }: { item: typeof insights[0] }) => (
  <BlurView intensity={100} tint="dark" style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 16 }}>
    <View style={{ padding: 16 }}>
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
      <Text style={{ color: '#888', marginTop: 8 }}>{item.summary}</Text>
      <Text style={{ color: '#00B67A', marginTop: 8, fontStyle: 'italic' }}>{item.source}</Text>
    </View>
  </BlurView>
);

export default function Insights() {
  return (
    <View style={{ margin: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 8 }}>Insights</Text>
      {insights.map((item, index) => (
        <InsightCard key={index} item={item} />
      ))}
    </View>
  );
}
