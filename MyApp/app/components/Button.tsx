import React from 'react';
import { Button as PaperButton } from 'react-native-paper';

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  mode?: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
};

export function Button({ children, onPress, mode = 'contained', disabled, loading, style }: Props) {
  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      disabled={disabled}
      loading={loading}
      style={style}
      contentStyle={{ paddingVertical: 8 }}
    >
      {children}
    </PaperButton>
  );
}
