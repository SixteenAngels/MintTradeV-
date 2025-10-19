import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Text, List, ActivityIndicator } from 'react-native-paper';
import { fetchMarketList, type GseQuote } from '../services/marketService';
import { Link } from 'expo-router';
import { BlurView } from 'expo-blur';

export default function MarketsScreen() {
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState<GseQuote[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchMarketList();
      setQuotes(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await fetchMarketList();
      setQuotes(data);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text variant="headlineMedium" style={{ margin: 8 }}>Markets</Text>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 24 }} />
      ) : (
        <FlatList
          data={quotes}
          keyExtractor={(item) => item.symbol}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <BlurView intensity={20} tint="light" style={{ borderRadius: 12, overflow: 'hidden', marginHorizontal: 8, marginVertical: 6 }}>
              <Link href={`/(tabs)/symbol/${item.symbol}`} asChild>
                <List.Item
                  title={`${item.symbol}`}
                  description={`GHS ${item.price.toFixed(2)}  (${item.change >= 0 ? '+' : ''}${item.change.toFixed(2)} | ${item.changePercent.toFixed(2)}%)`}
                  accessibilityLabel={`${item.symbol} ${item.price.toFixed(2)} Ghana Cedis`}
                  right={() => (
                    <Text style={{ color: item.change >= 0 ? '#10B981' : '#ef4444' }}>
                      {item.change >= 0 ? '▲' : '▼'} {item.price.toFixed(2)}
                    </Text>
                  )}
                />
              </Link>
            </BlurView>
          )}
        />
      )}
    </View>
  );
}
