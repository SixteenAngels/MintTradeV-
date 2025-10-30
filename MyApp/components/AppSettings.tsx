import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const AppSettings = () => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(true);
  const [areNotificationsEnabled, setAreNotificationsEnabled] = useState(true);

  const toggleDarkMode = () => setIsDarkModeEnabled(previousState => !previousState);
  const toggleNotifications = () => setAreNotificationsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#00D09C' }}
          thumbColor={isDarkModeEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={isDarkModeEnabled}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notifications</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#00D09C' }}
          thumbColor={areNotificationsEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotifications}
          value={areNotificationsEnabled}
        />
      </View>
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

export default AppSettings;
