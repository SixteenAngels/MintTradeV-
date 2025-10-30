import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { MotiView } from 'moti';

const { width: screenWidth } = Dimensions.get('window');

type Card = {
  bankName: string;
  maskedNumber: string;
  balance: string;
  status: string;
};

const cards: Card[] = [
  { bankName: 'Fidelity Bank', maskedNumber: '**** 1234', balance: '₵1,500.00', status: 'Active' },
  { bankName: 'GCB Bank', maskedNumber: '**** 5678', balance: '₵850.00', status: 'Active' },
  { bankName: 'Stanbic Bank', maskedNumber: '**** 9012', balance: '₵3,200.00', status: 'Inactive' },
];

const BankCarousel = () => {
  const renderItem = ({ item }: { item: Card }) => (
    <MotiView
      from={{ opacity: 0, scale: 0.9, rotateY: '20deg' }}
      animate={{ opacity: 1, scale: 1, rotateY: '0deg' }}
      transition={{ type: 'timing', duration: 500 }}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.bankName}>{item.bankName}</Text>
        <Text style={styles.maskedNumber}>{item.maskedNumber}</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balance}>{item.balance}</Text>
        <View style={[styles.statusBadge, item.status === 'Active' ? styles.activeBadge : styles.inactiveBadge]}>
          <Text style={[styles.statusText, item.status === 'Active' ? styles.activeStatusText : styles.inactiveStatusText]}>
            {item.status}
          </Text>
        </View>
      </View>
    </MotiView>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Linked Accounts</Text>
      <Carousel
        loop
        width={screenWidth * 0.75}
        height={200}
        autoPlay={false}
        data={cards}
        renderItem={renderItem}
        scrollAnimationDuration={1000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center', // Center the carousel
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start', // Align header to the left
    marginLeft: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  cardHeader: {},
  bankName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  maskedNumber: {
    color: '#888',
    fontSize: 16,
    marginTop: 4,
  },
  cardFooter: {},
  balanceLabel: {
    color: '#888',
    fontSize: 14,
  },
  balance: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: 'rgba(0, 208, 156, 0.2)',
  },
  inactiveBadge: {
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeStatusText: {
    color: '#00D09C',
  },
  inactiveStatusText: {
    color: '#FF3B30',
  },
});

export default BankCarousel;
