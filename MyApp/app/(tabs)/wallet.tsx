import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { initiateDeposit } from '../services/walletService';

export default function WalletScreen() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

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
    </View>
  );
}
