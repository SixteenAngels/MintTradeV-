import React from 'react';
import { ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import PortfolioSummaryCard from '../../components/PortfolioSummaryCard';
import QuickActions from '../../components/QuickActions';
import Holdings from '../../components/Holdings';
import MarketHighlights from '../../components/MarketHighlights';
import Insights from '../../components/Insights';

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#00B67A', '#0F172A']} style={{ flex: 1 }}>
      <ScrollView>
        <Header />
        <PortfolioSummaryCard />
        <QuickActions />
        <Holdings />
        <MarketHighlights />
        <Insights />
      </ScrollView>
    </LinearGradient>
  );
}
