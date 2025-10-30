import React from 'react';
import { View, ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import { Avatar, Switch, Title, Caption, Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'expo-router';

// Placeholder for Lottie animation
const ProfileAvatar = () => (
  <Avatar.Image size={80} source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }} />
);

const ProfileScreen = () => {
  const { user, signOut } = useAuthStore((s) => ({ user: s.user, signOut: s.signOut }));
  const [isBiometricsEnabled, setIsBiometricsEnabled] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ProfileAvatar />
        <Title style={styles.greeting}>Good evening, {user?.displayName ?? 'Prosper'} 🌙</Title>
        <Caption style={styles.subGreeting}>Investor since 2025</Caption>
      </View>

      <View style={styles.menuContainer}>
        <Card style={styles.card}>
          <Card.Title title="🔒 Security" />
          <Card.Content>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>Change PIN</Text>
              <Ionicons name="chevron-forward" size={24} color="#ccc" />
            </Pressable>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>Enable biometrics</Text>
              <Switch value={isBiometricsEnabled} onValueChange={setIsBiometricsEnabled} />
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="🪪 KYC Verification" />
          <Card.Content>
            <Link href="/profile/kyc" asChild>
              <Pressable style={styles.menuItem}>
                <Text style={styles.menuText}>Verify ID</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.statusBadge}>Pending</Text>
                  <Ionicons name="chevron-forward" size={24} color="#ccc" />
                </View>
              </Pressable>
            </Link>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="⚙️ App Settings" />
          <Card.Content>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>Dark mode</Text>
              <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
            </View>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>Language</Text>
              <Ionicons name="chevron-forward" size={24} color="#ccc" />
            </Pressable>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>Notification preferences</Text>
              <Ionicons name="chevron-forward" size={24} color="#ccc" />
            </Pressable>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="💬 Support" />
          <Card.Content>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>Chat with us</Text>
              <Ionicons name="chevron-forward" size={24} color="#ccc" />
            </Pressable>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="📜 Terms & Privacy" />
          <Card.Content>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>Read our terms</Text>
              <Ionicons name="chevron-forward" size={24} color="#ccc" />
            </Pressable>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.footer}>
        <Pressable onPress={signOut}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
        <Text style={styles.versionText}>Version 1.0.0 (Build 1)</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  greeting: {
    color: '#fff',
    marginTop: 10,
  },
  subGreeting: {
    color: '#ccc',
  },
  menuContainer: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#1C1C1E',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
  statusBadge: {
    backgroundColor: '#FFA500',
    color: '#000',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 8,
    overflow: 'hidden',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
  },
  versionText: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 8,
  },
});

export default ProfileScreen;
