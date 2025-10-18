import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, SegmentedButtons, ActivityIndicator } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { fetchSymbolHistory } from '../../services/marketService';

const ranges = [
  { value: '1d', label: '1D' },
  { value: '1w', label: '1W' },
  { value: '1m', label: '1M' },
  { value: '3m', label: '3M' },
  { value: '1y', label: '1Y' },
];

export default function SymbolScreen() {
  const { symbol } = useLocalSearchParams<{ symbol: string }>();
  const [range, setRange] = useState<'1d'|'1w'|'1m'|'3m'|'1y'>('1m');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchSymbolHistory(symbol!, range)
      .then((d) => mounted && setData(d))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [symbol, range]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 8 }}>{symbol}</Text>
      <SegmentedButtons
        value={range}
        onValueChange={(v) => setRange(v as any)}
        buttons={ranges}
        style={{ marginBottom: 12 }}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text>Data points: {Array.isArray(data) ? data.length : 0}</Text>
      )}
    </View>
  );
}
