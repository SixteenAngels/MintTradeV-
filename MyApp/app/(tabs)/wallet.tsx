import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Text, TextInput, Button, List, ActivityIndicator } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import { useSnackbarStore } from '../store/useSnackbarStore';
import { initiateDeposit, requestWithdrawal, getTransactions, type WalletTx } from '../services/walletService';
import { BlurView } from 'expo-blur';
import { useResponsive } from '../hooks/useResponsive';

export default function WalletScreen() {
  const { containerPadding, twoPane } = useResponsive();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawDest, setWithdrawDest] = useState('');

  const show = useSnackbarStore((s) => s.show);
  const onDeposit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const r = await initiateDeposit(Number(amount || 0), 'momo');
      setResult(JSON.stringify(r));
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      show('Deposit initiated');
    } catch (e: any) {
      setResult(e?.message || 'Failed');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      show('Deposit failed');
    } finally {
      setLoading(false);
    }
  };

  const [txs, setTxs] = useState<WalletTx[]>([]);
  const [loadingTx, setLoadingTx] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadTx() {
    setLoadingTx(true);
    try {
      const data = await getTransactions();
      setTxs(data);
    } finally {
      setLoadingTx(false);
    }
  }
  useEffect(() => {
    loadTx();
  }, []);

  return (
    <View style={{ flex: 1, paddingHorizontal: containerPadding, paddingTop: 16 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>Wallet</Text>
      <View style={{ flex: 1, flexDirection: twoPane ? 'row' : 'column', gap: 16 }}>
        <BlurView intensity={20} tint="light" style={{ flex: 1, borderRadius: 16, overflow: 'hidden', padding: 16 }}>
          <Text variant="titleMedium" style={{ marginBottom: 8 }}>Deposit</Text>
          <TextInput
            label="Amount (GHS)"
            mode="outlined"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            accessibilityLabel="Deposit amount in Ghana Cedis"
            style={{ marginBottom: 12 }}
          />
          <Button mode="contained" onPress={onDeposit} loading={loading} disabled={!amount} accessibilityLabel="Initiate deposit">
            Initiate MoMo Deposit
          </Button>
          {result && <Text style={{ marginTop: 12 }}>{result}</Text>}

          <View style={{ marginTop: 24 }}>
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Withdraw</Text>
            <TextInput
              label="Amount (GHS)"
              mode="outlined"
              keyboardType="numeric"
              value={withdrawAmount}
              onChangeText={setWithdrawAmount}
              accessibilityLabel="Withdrawal amount in Ghana Cedis"
              style={{ marginBottom: 8 }}
            />
            <TextInput
              label="Destination (MoMo number or Bank acct)"
              mode="outlined"
              value={withdrawDest}
              onChangeText={setWithdrawDest}
              accessibilityLabel="Withdrawal destination account"
              style={{ marginBottom: 8 }}
            />
            <Button
              mode="outlined"
              accessibilityLabel="Request withdrawal"
              disabled={!withdrawAmount || !withdrawDest}
              onPress={async () => {
                setLoading(true);
                setResult(null);
                try {
                  const r = await requestWithdrawal(Number(withdrawAmount), { type: 'momo', account: withdrawDest });
                  setResult(JSON.stringify(r));
                  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                  show('Withdrawal requested');
                } catch (e: any) {
                  setResult(e?.message || 'Failed');
                  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                  show('Withdrawal failed');
                } finally {
                  setLoading(false);
                }
              }}
            >
              Request Withdrawal
            </Button>
          </View>
        </BlurView>

        <BlurView intensity={20} tint="light" style={{ flex: 1, borderRadius: 16, overflow: 'hidden', padding: 8 }}>
          <Text variant="titleMedium" style={{ margin: 8 }}>Transactions</Text>
          {loadingTx ? (
            <ActivityIndicator style={{ marginTop: 8 }} />
          ) : (
            <FlatList
              data={txs}
              keyExtractor={(i) => i.id}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async () => { setRefreshing(true); await loadTx(); setRefreshing(false); }} />}
              renderItem={({ item }) => (
                <List.Item
                  title={`${item.type.toUpperCase()} · GHS ${item.amount.toFixed(2)}`}
                  description={`${item.status} · ${new Date(item.createdAt).toLocaleString()}`}
                  accessibilityLabel={`${item.type} ${item.amount.toFixed(2)} Ghana Cedis, status ${item.status}`}
                />
              )}
            />
          )}
        </BlurView>
      </View>
    </View>
  );
}
