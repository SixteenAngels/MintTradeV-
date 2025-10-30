import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const holdings = [
  {
    logo: 'https://example.com/gcb-logo.png',
    name: 'GCB Bank',
    ticker: 'GCB',
    value: '₵3,250.00',
    change: '+3.2%',
    isPositive: true,
    chartData: [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80],
  },
  {
    logo: 'https://example.com/mtn-logo.png',
    name: 'MTN Ghana',
    ticker: 'MTNGH',
    value: '₵1,180.00',
    change: '-0.5%',
    isPositive: false,
    chartData: [24, 50, -20, -80, 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53],
  },
  {
    logo: 'https://example.com/aapl-logo.png',
    name: 'Apple Inc',
    ticker: 'AAPL',
    value: '₵8,020.00',
    change: '+2.1%',
    isPositive: true,
    chartData: [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80],
  },
];

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1, isPositive: boolean) => `rgba(${isPositive ? '0, 182, 122' : '255, 0, 0'}, ${opacity})`,
  strokeWidth: 2,
};

const StockCard = ({ item }: { item: typeof holdings[0] }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#333' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={{ uri: item.logo }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 16 }} />
      <View>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.name}</Text>
        <Text style={{ color: '#888' }}>{item.ticker}</Text>
      </View>
    </View>
    <View style={{ width: 100 }}>
      <LineChart
        data={{ labels: [], datasets: [{ data: item.chartData }] }}
        width={100}
        height={50}
        chartConfig={{
          ...chartConfig,
          color: (opacity = 1) => chartConfig.color(opacity, item.isPositive)
        }}
        withHorizontalLabels={false}
        withVerticalLabels={false}
        withDots={false}
        withShadow={false}
        withInnerLines={false}
        withOuterLines={false}
        bezier
      />
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.value}</Text>
      <Text style={{ color: item.isPositive ? '#00B67A' : 'red' }}>{item.change}</Text>
    </View>
  </View>
);

export default function Holdings() {
  return (
    <View style={{ margin: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 8 }}>Holdings</Text>
      <FlatList
        data={holdings}
        renderItem={({ item }) => <StockCard item={item} />}
        keyExtractor={(item) => item.ticker}
        scrollEnabled={false}
      />
    </View>
  );
}
