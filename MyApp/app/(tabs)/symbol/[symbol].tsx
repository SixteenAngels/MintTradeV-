import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, SegmentedButtons, ActivityIndicator } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { fetchSymbolHistory } from '../../services/marketService';
import { PriceChart } from '../../components/PriceChart';

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
  const [data, setData] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchSymbolHistory(symbol!, range)
      .then((d) => {
        if (!mounted) return;
        // Expect array of [timestamp, price] or objects; normalize
        const points: Array<{ x: number; y: number }> = (d ?? []).map((p: any) => {
          if (Array.isArray(p)) return { x: Number(p[0]), y: Number(p[1]) };
          return { x: Number(p.t ?? p.time ?? p.x ?? 0), y: Number(p.p ?? p.price ?? p.y ?? 0) };
        }).filter((p: any) => Number.isFinite(p.x) && Number.isFinite(p.y));
        setData(points);
      })
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
      {loading ? <ActivityIndicator /> : <PriceChart data={data} />}
    </View>
  );
}
