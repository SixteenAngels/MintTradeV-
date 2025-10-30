import React from 'react';
import { View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function PortfolioSummaryCard() {
  return (
    <BlurView intensity={100} tint="dark" style={{ borderRadius: 20, overflow: 'hidden', margin: 16 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 16, color: '#fff' }}>Total Portfolio Value</Text>
        <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#fff', marginVertical: 8 }}>₵12,450.25</Text>
        <Text style={{ fontSize: 16, color: '#00B67A' }}>+₵532.12 (+4.5%)</Text>
        <LineChart
          data={{
            labels: ['1D', '1W', '1M', '1Y'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={screenWidth - 64} // from react-native
          height={100}
          yAxisLabel="₵"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#0F172A',
            backgroundGradientFrom: '#0F172A',
            backgroundGradientTo: '#00B67A',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#00B67A',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </BlurView>
  );
}
