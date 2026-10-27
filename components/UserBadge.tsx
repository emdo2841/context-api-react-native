import { SymbolView } from 'expo-symbols';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useUser } from '@/context/UserContext';

export function UserBadge() {
  const { user, signOut } = useUser();
  if (!user) return null;

  function handleSignOut() {
    signOut();
    router.replace('/login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}><Text style={styles.initial}>{user.name.trim().charAt(0).toUpperCase()}</Text></View>
      <View style={styles.profile}>
        <Text style={styles.name} numberOfLines={1}>{user.name}</Text>
        <Text style={styles.email} numberOfLines={1}>{user.email}</Text>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel="Sign out" onPress={handleSignOut} style={styles.signOut}>
        <SymbolView name="rectangle.portrait.and.arrow.right" tintColor="#52614A" size={17} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ECECE4', padding: 6, borderRadius: 4, maxWidth: 150 },
  avatar: { width: 30, height: 30, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: '#354A3D' },
  initial: { color: '#F9F7F1', fontSize: 13, fontWeight: '700' },
  profile: { flex: 1, minWidth: 0, marginHorizontal: 8 },
  name: { color: '#29382E', fontSize: 10, fontWeight: '700' },
  email: { color: '#758071', fontSize: 8, marginTop: 2 },
  signOut: { width: 28, height: 30, alignItems: 'center', justifyContent: 'center' },
});
