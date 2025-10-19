import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput as PaperInput, Button as PaperButton } from 'react-native-paper';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { useAuthStore } from '../store/useAuthStore';
import { getAppOptions } from 'expo-firebase-recaptcha';
import { getFirebaseAuth } from '../store/useAuthStore';
import { signInWithPhoneNumber, PhoneAuthProvider, RecaptchaVerifier, signInWithCredential } from 'firebase/auth';

export default function PhoneAuthScreen() {
  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
  const [phone, setPhone] = useState('');
  const [codeSent, setCodeSent] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const appOptions = getAppOptions();

  const sendCode = async () => {
    setLoading(true);
    try {
      const auth = await getFirebaseAuth();
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(phone, recaptchaVerifier.current as any);
      setCodeSent(verificationId);
    } finally {
      setLoading(false);
    }
  };

  const confirmCode = async () => {
    if (!codeSent) return;
    setLoading(true);
    try {
      const auth = await getFirebaseAuth();
      const credential = PhoneAuthProvider.credential(codeSent, code);
      await signInWithCredential(auth, credential);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={appOptions} />
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>Phone Sign-in</Text>
      <PaperInput
        mode="outlined"
        label="Phone (+233...)"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={{ marginBottom: 12 }}
      />
      {codeSent ? (
        <>
          <PaperInput
            mode="outlined"
            label="Verification code"
            keyboardType="number-pad"
            value={code}
            onChangeText={setCode}
            style={{ marginBottom: 12 }}
          />
          <PaperButton mode="contained" onPress={confirmCode} loading={loading}>
            Confirm Code
          </PaperButton>
        </>
      ) : (
        <PaperButton mode="contained" onPress={sendCode} loading={loading} disabled={!phone}>
          Send Code
        </PaperButton>
      )}
    </View>
  );
}
