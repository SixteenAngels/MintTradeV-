import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Text, TextInput, Button, List, ActivityIndicator } from 'react-native-paper';
import { initiateDeposit, requestWithdrawal, getTransactions, type WalletTx } from '../services/walletService';

export default function WalletScreen() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawDest, setWithdrawDest] = useState('');

  const onDeposit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const r = await initiateDeposit(Number(amount || 0), 'momo');
      setResult(JSON.stringify(r));
    } catch (e: any) {
      setResult(e?.message || 'Failed');
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
    <View style={{ flex: 1, padding: 20 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>Wallet</Text>
      <TextInput
        label="Amount (GHS)"
        mode="outlined"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{ marginBottom: 12 }}
      />
      <Button mode="contained" onPress={onDeposit} loading={loading} disabled={!amount}>
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
          style={{ marginBottom: 8 }}
        />
        <TextInput
          label="Destination (MoMo number or Bank acct)"
          mode="outlined"
          value={withdrawDest}
          onChangeText={setWithdrawDest}
          style={{ marginBottom: 8 }}
        />
        <Button
          mode="outlined"
          disabled={!withdrawAmount || !withdrawDest}
          onPress={async () => {
            setLoading(true);
            setResult(null);
            try {
              const r = await requestWithdrawal(Number(withdrawAmount), { type: 'momo', account: withdrawDest });
              setResult(JSON.stringify(r));
            } catch (e: any) {
              setResult(e?.message || 'Failed');
            } finally {
              setLoading(false);
            }
          }}
        >
          Request Withdrawal
        </Button>
      </View>

      <Text variant="titleMedium" style={{ marginVertical: 12 }}>Transactions</Text>
      {loadingTx ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={txs}
          keyExtractor={(i) => i.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async () => { setRefreshing(true); await loadTx(); setRefreshing(false); }} />}
          renderItem={({ item }) => (
            <List.Item
              title={`${item.type.toUpperCase()} · GHS ${item.amount.toFixed(2)}`}
              description={`${item.status} · ${new Date(item.createdAt).toLocaleString()}`}
            />
          )}
        />
      )}
    </View>
  );
}
