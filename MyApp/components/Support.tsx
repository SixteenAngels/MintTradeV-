import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const Support = () => {
  return (
    <View style={styles.container}>
        <Pressable style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Chat with us</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Email Support</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#1C1C1E',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Support;
