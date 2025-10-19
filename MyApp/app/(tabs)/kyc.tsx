import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { submitKyc, getKycStatus } from '../services/kycService';

export default function KycScreen() {
  const [docUri, setDocUri] = useState<string | null>(null);
  const [selfieUri, setSelfieUri] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('not_started');
  const [loading, setLoading] = useState(false);

  const pick = async (setter: (v: string) => void) => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
    if (!res.canceled && res.assets?.[0]?.uri) setter(res.assets[0].uri);
  };

  const onSubmit = async () => {
    if (!docUri || !selfieUri) return;
    setLoading(true);
    try {
      const fd = new FormData();
      const docInfo = await FileSystem.getInfoAsync(docUri);
      const selfieInfo = await FileSystem.getInfoAsync(selfieUri);
      fd.append('document', { uri: docUri, name: 'document.jpg', type: 'image/jpeg' } as any);
      fd.append('selfie', { uri: selfieUri, name: 'selfie.jpg', type: 'image/jpeg' } as any);
      await submitKyc(fd);
      const s = await getKycStatus();
      setStatus(s.status);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 12 }}>KYC Verification</Text>
      <Button mode="outlined" style={{ marginBottom: 8 }} onPress={() => pick((v) => setDocUri(v))}>
        Pick Ghana Card (Front)
      </Button>
      {docUri && <Image source={{ uri: docUri }} style={{ width: '100%', height: 160, borderRadius: 12, marginBottom: 8 }} />}
      <Button mode="outlined" style={{ marginBottom: 8 }} onPress={() => pick((v) => setSelfieUri(v))}>
        Pick Selfie
      </Button>
      {selfieUri && <Image source={{ uri: selfieUri }} style={{ width: '100%', height: 160, borderRadius: 12, marginBottom: 8 }} />}

      <Button mode="contained" disabled={!docUri || !selfieUri} loading={loading} onPress={onSubmit}>
        Submit for Verification
      </Button>
      <Text style={{ marginTop: 12 }}>Status: {status}</Text>
    </View>
  );
}
