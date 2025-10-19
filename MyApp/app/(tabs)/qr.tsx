import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : ({ data }) => { setScanned(true); setResult(data); }}
        style={{ flex: 1 }}
      />
      {result && <Text style={{ padding: 12 }}>Scanned: {result}</Text>}
      {scanned && <Button onPress={() => { setScanned(false); setResult(null); }}>Scan again</Button>}
    </View>
  );
}
