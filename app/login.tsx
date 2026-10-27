import { SymbolView } from 'expo-symbols';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { useUser } from '@/context/UserContext';

export default function LoginScreen() {
  const { signIn } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleContinue() {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanName) {
      setError('Enter your name to continue.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('Enter a valid email address.');
      return;
    }

    signIn({ name: cleanName, email: cleanEmail });
    router.replace('/(tabs)');
  }

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.brandRow}>
          <View style={styles.brandMark}><SymbolView name="figure.walk" tintColor="#F9F7F1" size={19} /></View>
          <Text style={styles.brand}>SIDEQUEST</Text>
        </View>

        <View style={styles.art}>
          <View style={styles.sun} />
          <View style={styles.hillOne} />
          <View style={styles.hillTwo} />
          <View style={styles.artPath} />
          <View style={styles.artLabel}><Text style={styles.artLabelText}>YOUR NEXT WALK STARTS HERE</Text></View>
        </View>

        <Text style={styles.kicker}>A GOOD WALK HAS YOUR NAME ON IT</Text>
        <Text style={styles.title}>Come on{ '\n' }outside.</Text>
        <Text style={styles.copy}>Tell us who’s walking. We’ll keep your details here while you explore.</Text>

        <View style={styles.form}>
          <Text style={styles.label}>YOUR NAME</Text>
          <TextInput
            accessibilityLabel="Your name"
            autoCapitalize="words"
            autoComplete="name"
            onChangeText={(value) => { setName(value); setError(''); }}
            placeholder="e.g. Alex Morgan"
            placeholderTextColor="#A0A59D"
            returnKeyType="next"
            style={styles.input}
            value={name}
          />
          <Text style={[styles.label, styles.emailLabel]}>EMAIL ADDRESS</Text>
          <TextInput
            accessibilityLabel="Email address"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            onChangeText={(value) => { setEmail(value); setError(''); }}
            onSubmitEditing={handleContinue}
            placeholder="you@example.com"
            placeholderTextColor="#A0A59D"
            returnKeyType="go"
            style={styles.input}
            value={email}
          />
          {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
          <Pressable accessibilityRole="button" onPress={handleContinue} style={styles.button}>
            <Text style={styles.buttonText}>LET’S GO</Text>
            <SymbolView name="arrow.right" tintColor="#F9F7F1" size={16} />
          </Pressable>
        </View>
        <Text style={styles.footnote}>NO PASSWORD. JUST GOOD WALKS.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F7F6F0' },
  content: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 22, paddingBottom: 28 },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 21 },
  brandMark: { width: 31, height: 31, borderRadius: 16, backgroundColor: '#354A3D', alignItems: 'center', justifyContent: 'center', marginRight: 9 },
  brand: { color: '#29382E', fontSize: 12, fontWeight: '800', letterSpacing: 1.6 },
  art: { height: 158, backgroundColor: '#354A3D', borderRadius: 4, overflow: 'hidden', marginBottom: 24 },
  sun: { position: 'absolute', width: 52, height: 52, borderRadius: 26, right: 46, top: 24, backgroundColor: '#E5B16E' },
  hillOne: { position: 'absolute', height: 95, width: 235, borderRadius: 130, backgroundColor: '#78876A', bottom: -57, right: -25, transform: [{ rotate: '-13deg' }] },
  hillTwo: { position: 'absolute', height: 84, width: 260, borderRadius: 130, backgroundColor: '#536B55', bottom: -61, left: -32, transform: [{ rotate: '9deg' }] },
  artPath: { position: 'absolute', width: 38, height: 69, borderTopLeftRadius: 35, borderTopRightRadius: 30, borderLeftWidth: 10, borderTopWidth: 9, borderColor: '#E6D7B5', bottom: -35, right: 95, transform: [{ rotate: '29deg' }] },
  artLabel: { position: 'absolute', top: 14, left: 14, borderWidth: 1, borderColor: 'rgba(249,247,241,0.5)', paddingVertical: 5, paddingHorizontal: 7 },
  artLabelText: { color: '#F9F7F1', fontSize: 7, fontWeight: '800', letterSpacing: 1.1 },
  kicker: { color: '#C26448', fontSize: 9, fontWeight: '800', letterSpacing: 1.4 },
  title: { color: '#26372E', fontSize: 43, lineHeight: 45, fontWeight: '700', marginTop: 7, letterSpacing: -0.5 },
  copy: { color: '#687267', fontSize: 12, lineHeight: 18, marginTop: 9, maxWidth: 300 },
  form: { marginTop: 22 },
  label: { color: '#52614A', fontSize: 9, fontWeight: '800', letterSpacing: 1.2, marginBottom: 7 },
  emailLabel: { marginTop: 14 },
  input: { height: 48, borderWidth: 1, borderColor: '#D8DDD4', borderRadius: 3, backgroundColor: '#FCFBF7', paddingHorizontal: 13, color: '#29382E', fontSize: 13 },
  error: { color: '#B64F3B', fontSize: 11, marginTop: 8 },
  button: { height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#354A3D', paddingHorizontal: 15, marginTop: 18, borderRadius: 3 },
  buttonText: { color: '#F9F7F1', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  footnote: { color: '#A0A59D', fontSize: 8, fontWeight: '800', letterSpacing: 1.2, textAlign: 'center', marginTop: 20 },
});
