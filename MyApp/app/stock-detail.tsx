import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';

// Mock data for detail page
const stockDetailData: any = {
    MTNGH: {
        price: '1.45', change: '+1.5%', isUp: true,
        chartData: { 
            '1D': [1.42, 1.43, 1.41, 1.44, 1.45], 
            '1W': [1.35, 1.38, 1.40, 1.39, 1.42, 1.43, 1.45], 
            '1M': [1.20, 1.25, 1.30, 1.28, 1.35, 1.40, 1.45],
            '1Y': [0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.45],
            'ALL': [0.5, 0.7, 0.6, 0.8, 1.0, 1.2, 1.45],
        },
        companyName: "MTN Ghana",
        bio: "MTN Ghana is the leading telecommunications provider in Ghana, offering a wide range of mobile and data services.",
        aiSummary: "The company shows stable growth with strong market positioning. It has good dividend potential for long-term investors.",
    }
}

const timePeriods = ['1D', '1W', '1M', '1Y', 'ALL'];

const StockDetailPage = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activePeriod, setActivePeriod] = useState('1D');

  const stock = stockDetailData[id as string];

  if (!stock) {
    return <View style={styles.container}><Text style={styles.price}>Stock not found</Text></View>;
  }

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => stock.isUp ? `rgba(0, 208, 156, ${opacity})` : `rgba(255, 59, 48, ${opacity})`,
    style: { borderRadius: 16 }
  };

  return (
    <View style={styles.container}>
        <Pressable style={styles.closeButton} onPress={() => router.back()}>
            <Ionicons name="close-circle" size={32} color="#ccc" />
        </Pressable>
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <MotiView from={{opacity: 0, translateY: 20}} animate={{opacity: 1, translateY: 0}} transition={{type: 'timing'}}>
                <Text style={styles.companyName}>{stock.companyName}</Text>
                <Text style={styles.price}>₵{stock.price}</Text>
                <Text style={[styles.change, {color: stock.isUp ? '#00D09C' : '#FF3B30'}]}>{stock.change} Today</Text>
            </MotiView>

            <View>
                <LineChart
                    data={{ labels: [], datasets: [{ data: stock.chartData[activePeriod] }] }}
                    width={Dimensions.get('window').width - 32}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                    withInnerLines={false}
                    withOuterLines={false}
                    withVerticalLabels={false}
                    withHorizontalLabels={false}
                    style={{ marginTop: 20 }}
                />
                <View style={styles.timePeriodContainer}>
                    {timePeriods.map(period => (
                    <Pressable key={period} onPress={() => {
                        setActivePeriod(period);
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }} style={[styles.timePeriodButton, activePeriod === period && styles.activeTimePeriod]}>
                        <Text style={[styles.timePeriodText, activePeriod === period && styles.activeTimePeriodText]}>{period}</Text>
                    </Pressable>
                    ))}
                </View>
            </View>

            <View style={styles.buttonRow}>
                <Pressable style={[styles.actionButton, styles.buyButton]}><Text style={styles.buttonText}>Buy</Text></Pressable>
                <Pressable style={[styles.actionButton, styles.sellButton]}><Text style={styles.buttonText}>Sell</Text></Pressable>
            </View>

            {/* AI Insight Section */}
            <Pressable style={styles.aiInsightCard}>
                <View style={{flex: 1}}>
                    <Text style={styles.aiInsightTitle}>🤖 AI Insight</Text>
                    <Text style={styles.aiInsightSubtitle}>Learn about this company</Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={24} color="#888" />
            </Pressable>
            
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingTop: 20 },
    closeButton: { position: 'absolute', top: 50, right: 20, zIndex: 10 },
    scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
    companyName: { fontSize: 22, fontWeight: '600', color: '#888', marginTop: 70 },
    price: { fontSize: 48, fontWeight: 'bold', color: '#000', marginTop: 4 },
    change: { fontSize: 18, fontWeight: '600', marginTop: 4 },
    timePeriodContainer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#f0f0f0', borderRadius: 20, padding: 4, marginTop: 16 },
    timePeriodButton: { paddingVertical: 8, paddingHorizontal: 18, borderRadius: 16 },
    activeTimePeriod: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 5 },
    timePeriodText: { fontSize: 14, fontWeight: 'bold', color: '#888' },
    activeTimePeriodText: { color: '#000' },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 24 },
    actionButton: { flex: 1, padding: 18, borderRadius: 15, alignItems: 'center', marginHorizontal: 8 },
    buyButton: { backgroundColor: '#00D09C' },
    sellButton: { backgroundColor: '#FF3B30' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    aiInsightCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', padding: 16, borderRadius: 15, borderWidth: 1, borderColor: '#f0f0f0' },
    aiInsightTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
    aiInsightSubtitle: { fontSize: 14, color: '#888', marginTop: 4 },
});

export default StockDetailPage;
