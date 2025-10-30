import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Dimensions } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { LineChart } from 'react-native-chart-kit';

type StockListItemProps = {
  logoUrl: string;
  name: string;
  ticker: string;
  price: string;
  change: string;
  isUp: boolean;
  sparklineData: number[];
  onPress: () => void;
};

const StockListItem = ({
  logoUrl,
  name,
  ticker,
  price,
  change,
  isUp,
  sparklineData,
  onPress,
}: StockListItemProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: logoUrl }} style={styles.logo} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.ticker}>{ticker}</Text>
        </View>
      </View>
      
      <View style={styles.middleContainer}>
        <LineChart
            data={{
                labels: [],
                datasets: [{ data: sparklineData }]
            }}
            width={80}
            height={40}
            withDots={false}
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLabels={false}
            withHorizontalLabels={false}
            withShadow={false}
            chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 2,
                color: (opacity = 1) => isUp ? `rgba(0, 208, 156, ${opacity})` : `rgba(255, 59, 48, ${opacity})`,
            }}
            style={styles.sparkline}
        />
      </View>

      <View style={styles.rightContainer}>
        <AnimatePresence>
            <MotiView
                from={{ opacity: 0, translateY: isUp ? 10 : -10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 300 }}
                key={price+change} // Animate when price or change updates
            >
                <Text style={styles.price}>${price}</Text>
                <Text style={[styles.change, { color: isUp ? '#00D09C' : '#FF3B30' }]}>
                    {change}
                </Text>
            </MotiView>
        </AnimatePresence>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1.5, // Give more space to the name/ticker
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
        backgroundColor: '#eee'
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    ticker: {
        fontSize: 14,
        color: '#888',
    },
    middleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    sparkline: {
        paddingRight: 0,
        paddingBottom: 0,
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        textAlign: 'right'
    },
    change: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'right'
    },
});

export default StockListItem;
