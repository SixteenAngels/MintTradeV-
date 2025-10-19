import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isTablet = width >= 768;
  const isDesktop = width >= 1024;

  const spacing = isTablet ? 16 : 12;
  const containerPadding = Math.max(spacing, insets.left, insets.right);

  const numColumns = isDesktop ? 3 : isTablet ? 2 : 1;

  return useMemo(
    () => ({ width, height, insets, isTablet, isDesktop, spacing, containerPadding, numColumns }),
    [width, height, insets, isTablet, isDesktop, spacing, containerPadding, numColumns]
  );
}
