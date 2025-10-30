import { useMemo } from 'react';
import { useWindowDimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const orientation = width >= height ? 'landscape' : 'portrait';

  // Breakpoints
  const isSplit = Platform.OS === 'ios' && width >= 600 && width < 900; // iPad split view heuristic
  const isTabletFull = width >= 900 && width < 1200;
  const isDesktop = width >= 1200;
  const isTablet = isTabletFull || isSplit;

  const numColumns = isDesktop ? 3 : isTabletFull ? 2 : 1; // keep 1 in split

  const spacing = isDesktop ? 24 : isTabletFull ? 20 : isSplit ? 14 : 12;
  const containerPadding = Math.max(spacing, insets.left, insets.right);
  const cardGap = isDesktop ? 16 : isTabletFull ? 12 : 8;
  const cardPadding = isDesktop ? 16 : isTabletFull ? 14 : 12;
  const cardRadius = isDesktop ? 20 : 16;
  const twoPane = isTabletFull || isDesktop; // enable two-pane layouts only when full width

  return useMemo(
    () => ({
      width,
      height,
      insets,
      orientation,
      isTablet,
      isSplit,
      isTabletFull,
      isDesktop,
      spacing,
      containerPadding,
      numColumns,
      twoPane,
      cardGap,
      cardPadding,
      cardRadius,
    }),
    [width, height, insets, orientation, isTablet, isSplit, isTabletFull, isDesktop, spacing, containerPadding, numColumns, twoPane, cardGap, cardPadding, cardRadius]
  );
}
