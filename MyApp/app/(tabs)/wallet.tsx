import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import BalanceCard from '../../components/BalanceCard';
import BankCarousel from '../../components/BankCarousel';
import TransactionList from '../../components/TransactionList';

const WalletScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <BalanceCard />
      <BankCarousel />
      <TransactionList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    paddingBottom: 40,
  },
});

export default WalletScreen;
