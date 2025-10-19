import React, { useEffect, useMemo, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Text, List, ActivityIndicator } from 'react-native-paper';
import { getHoldings, type Holding } from '../services/portfolioService';

function formatCurrency(v: number) {
  return `GHS ${v.toFixed(2)}`;
}

export default function PortfolioScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [holdings, setHoldings] = useState<Holding[]>([]);

  async function load() {
    setLoading(true);
    try {
      const data = await getHoldings();
      setHoldings(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const totals = useMemo(() => {
    const marketValue = holdings.reduce((sum, h) => sum + (h.lastPrice ?? h.avgCost) * h.quantity, 0);
    const cost = holdings.reduce((sum, h) => sum + h.avgCost * h.quantity, 0);
    const pnl = marketValue - cost;
    const pnlPct = cost > 0 ? (pnl / cost) * 100 : 0;
    return { marketValue, cost, pnl, pnlPct };
  }, [holdings]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await load();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text variant="headlineMedium" style={{ margin: 8 }}>Portfolio</Text>
      <Text style={{ marginHorizontal: 8, marginBottom: 8 }}>
        Value: {formatCurrency(totals.marketValue)}  |  P&L: {formatCurrency(totals.pnl)} ({totals.pnlPct.toFixed(2)}%)
      </Text>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 24 }} />
      ) : (
        <FlatList
          data={holdings}
          keyExtractor={(item) => item.symbol}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => {
            const mv = (item.lastPrice ?? item.avgCost) * item.quantity;
            const cost = item.avgCost * item.quantity;
            const pnl = mv - cost;
            return (
              <List.Item
                title={`${item.symbol} · ${item.quantity} sh`}
                description={`Avg ${formatCurrency(item.avgCost)} · MV ${formatCurrency(mv)}`}
                right={() => (
                  <Text style={{ color: pnl >= 0 ? '#10B981' : '#ef4444' }}>
                    {pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}
                  </Text>
                )}
              />
            );
          }}
        />
      )}
    </View>
  );
}
