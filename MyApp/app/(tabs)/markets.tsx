import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import StockListItem from '../../components/StockListItem'; // Adjusted path

// Mock data - replace with API calls
const stockData = {
  '🇬🇭 Ghana': [
    { id: 'MTNGH', logoUrl: 'https://i.imgur.com/T5t2p4f.png', name: 'MTN Ghana', ticker: 'MTNGH', price: '1.45', change: '+1.5%', isUp: true, sparklineData: [5, 10, 8, 12, 11, 15, 13] },
    { id: 'CAL', logoUrl: 'https://i.imgur.com/A5T4v41.png', name: 'CalBank', ticker: 'CAL', price: '0.92', change: '-0.8%', isUp: false, sparklineData: [10, 8, 9, 7, 8, 6, 7] },
    { id: 'GOIL', logoUrl: 'https://i.imgur.com/Jjw7b4s.png', name: 'GOIL Plc', ticker: 'GOIL', price: '1.50', change: '+0.0%', isUp: true, sparklineData: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5] },
    { id: 'GCB', logoUrl: 'https://i.imgur.com/wP6X2L6.png', name: 'GCB Bank', ticker: 'GCB', price: '4.80', change: '+2.1%', isUp: true, sparklineData: [4.6, 4.65, 4.7, 4.72, 4.75, 4.78, 4.8] },
  ],
  '🇺🇸 US': [],
  '💰 Crypto': [],
  '📈 ETFs': [],
};

const tabs = ['🇬🇭 Ghana', '🇺🇸 US', '💰 Crypto', '📈 ETFs'];

const MarketsScreen = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const router = useRouter();

  const handleStockPress = (stockId: string) => {
    router.push(`/stock-detail?id=${stockId}`);
  };

  return (
    <View style={styles.container}>
      <MotiView 
        style={styles.header}
        from={{ translateY: -50, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 400 }}
      >
        <View style={styles.searchBarContainer}>
            <Ionicons name="search" size={20} color="#888" style={{ marginLeft: 10 }} />
            <TextInput placeholder="Search stocks, crypto, or ETFs..." placeholderTextColor="#888" style={styles.searchBar} />
            <Ionicons name="mic-outline" size={24} color="#888" style={{ marginRight: 10 }} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
          {tabs.map(tab => (
            <Pressable key={tab} onPress={() => setActiveTab(tab)} style={styles.tab}>
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              {activeTab === tab && <MotiView style={styles.activeTabIndicator} from={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ type: 'timing', duration: 300 }}/>}
            </Pressable>
          ))}
        </ScrollView>
      </MotiView>

      <FlatList
        data={stockData[activeTab as keyof typeof stockData]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 300 }}
            >
                <StockListItem 
                    {...item} 
                    onPress={() => handleStockPress(item.id)} 
                />
            </MotiView>
        )}
        contentContainerStyle={styles.stockListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: 50, // Added for safe area
        paddingHorizontal: 16,
        paddingBottom: 8,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 16,
    },
    searchBar: {
        flex: 1,
        padding: 12,
        fontSize: 16,
        color: '#000',
    },
    tabsContainer: {
        flexDirection: 'row',
    },
    tab: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginRight: 8,
        alignItems: 'center',
    },
    tabText: {
        fontSize: 16,
        color: '#888',
        fontWeight: '600',
    },
    activeTabText: {
        color: '#000',
    },
    activeTabIndicator: {
        height: 3,
        width: '80%',
        backgroundColor: '#00D09C',
        borderRadius: 3,
        marginTop: 6,
    },
    stockListContainer: {
        paddingHorizontal: 16,
    }
});

export default MarketsScreen;
