import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Button } from 'react-native-paper';

const BalanceCard = () => {
  return (
    <View style={styles.container}>
      <BlurView intensity={100} tint="dark" style={styles.blurView}>
        <LinearGradient
          colors={['rgba(0, 208, 156, 0.2)', 'rgba(0, 0, 0, 0.1)']}
          style={styles.gradient}
        >
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balance}>₵2,350.00</Text>
          <View style={styles.buttonContainer}>
            <Button onPress={() => {}} mode="contained" style={{marginRight: 10}}>Add Money</Button>
            <Button onPress={() => {}} mode="outlined">Withdraw</Button>
          </View>
        </LinearGradient>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    margin: 16,
  },
  blurView: {
    padding: 20,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#888',
    fontSize: 16,
  },
  balance: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default BalanceCard;
