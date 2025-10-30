import React from 'react';
import { TextInput } from 'react-native-paper';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
};

export function InputField(props: Props) {
  return (
    <TextInput
      mode="outlined"
      dense
      style={{ marginBottom: 12 }}
      autoComplete="off"
      {...props}
    />
  );
}
