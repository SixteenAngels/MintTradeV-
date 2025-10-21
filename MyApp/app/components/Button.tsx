import React from 'react';
import { Button as PaperButton } from 'react-native-paper';

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  mode?: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export function Button({ children, onPress, mode = 'contained', disabled, loading, style, accessibilityLabel, accessibilityHint }: Props) {
  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      disabled={disabled}
      loading={loading}
      style={style}
      contentStyle={{ paddingVertical: 8 }}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      {children}
    </PaperButton>
  );
}
