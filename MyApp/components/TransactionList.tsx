import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';


type Transaction = {
    type: 'deposit' | 'withdrawal';
    amount: string;
    source: string;
    status: string;
    time: string;
  };
  
  const transactions: Transaction[] = [
    { type: 'deposit', amount: '₵500', source: 'Fidelity Bank', status: 'Success', time: 'Today, 3:20PM' },
    { type: 'withdrawal', amount: '₵200', source: 'GCB Bank', status: 'Pending', time: 'Yesterday, 10:00AM' },
    { type: 'deposit', amount: '₵1000', source: 'Stanbic Bank', status: 'Success', time: '2 days ago, 5:30PM' },
  ];

const TransactionList = () => {
  const renderItem = ({ item, index }: { item: Transaction, index: number}) => (
    <MotiView 
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: index * 200 }}
        style={styles.transactionItem}
    >
      <View style={styles.timelineContainer}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineLine} />
      </View>
      <View style={styles.transactionDetails}>
        <Ionicons 
          name={item.type === 'deposit' ? 'arrow-down-circle' : 'arrow-up-circle'} 
          size={32} 
          color={item.type === 'deposit' ? '#00D09C' : '#FF3B30'} 
        />
        <View style={styles.transactionTextContainer}>
            <Text style={styles.transactionTitle}>{`${item.type.charAt(0).toUpperCase() + item.type.slice(1)} ${item.amount}`}</Text>
            <Text style={styles.transactionSubtitle}>{`${item.source} — ${item.status}`}</Text>
        </View>
        <Text style={styles.transactionTime}>{item.time}</Text>
      </View>
    </MotiView>
  );

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Recent Transactions</Text>
        <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 15,
  },
  timelineContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#333',
    zIndex: 1
  },
  timelineLine: {
    position: 'absolute',
    top: 12,
    bottom: -15, // to extend below the dot for the next item
    width: 2,
    backgroundColor: '#333',
  },
  transactionDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionTextContainer: {
      flex: 1,
      marginLeft: 10
  },
  transactionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionSubtitle: {
    color: '#888',
    marginTop: 4,
  },
  transactionTime: {
    color: '#888',
    fontSize: 12,
  },
});

export default TransactionList;
