import React from 'react';
import LottieView from 'lottie-react-native';
import { Platform } from 'react-native';

export function AnimatedLogo() {
  // For web, use lottie-react via a dynamic import fallback if needed in the screen
  return (
    <LottieView
      source={require('../../assets/animations/welcome.json')}
      autoPlay
      loop
      style={{ width: 180, height: 180 }}
    />
  );
}
