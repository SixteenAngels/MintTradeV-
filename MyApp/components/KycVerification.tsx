import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const KycVerification = () => {
  // TODO: Implement Smile ID integration

  return (
    <View style={styles.container}>
        <Text style={styles.status}>Status: <Text style={styles.pending}>Pending</Text></Text>
        <Pressable style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Verify ID</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Upload Documents</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    alignItems: 'center'
  },
  status: {
      color: '#fff',
      fontSize: 18,
      marginBottom: 20
  },
  pending: {
      color: '#FFA500'
  },
  button: {
    backgroundColor: '#1C1C1E',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default KycVerification;
