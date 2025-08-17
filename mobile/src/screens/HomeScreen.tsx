import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

export default function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.logo}>Snapped</Text>
        <Pressable style={styles.primary} onPress={() => navigation.navigate('Permission')}>
          <Text style={styles.primaryText}>+ Upload a New Image</Text>
        </Pressable>
      </View>
      <Pressable style={styles.footer} onPress={() => navigation.navigate('Uploads')}>
        <Text style={{ fontWeight: '600' }}>My Uploads</Text>
        <Text style={{ color: '#7a8594' }}>Browse saved searches</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e4ecfb' },
  logo: { fontSize: 42, fontWeight: '600', marginBottom: 24 },
  primary: { backgroundColor: '#184c96', paddingVertical: 16, paddingHorizontal: 20, borderRadius: 24 },
  primaryText: { color: '#fff', fontWeight: '600' },
  footer: { backgroundColor: '#fff', padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 }
});
