import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const SecuritySettings = () => {
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false);

  const toggleBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (hasHardware) {
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (isEnrolled) {
        setIsBiometricsEnabled(previousState => !previousState);
      } else {
        alert('No biometrics are enrolled on this device.');
      }
    } else {
      alert('This device does not support biometric authentication.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Biometrics</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#00D09C' }}
          thumbColor={isBiometricsEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleBiometrics}
          value={isBiometricsEnabled}
        />
      </View>
      <Pressable style={styles.settingItem} onPress={() => {}}>
        <Text style={styles.settingText}>Change PIN</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  settingText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SecuritySettings;
