import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

export default function PermissionScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Permission'>) {
  const ask = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      navigation.replace('Picker');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/perm.png')} style={{ width: '100%', height: 320 }} resizeMode="cover" />
      <View style={{ flex: 1, backgroundColor: '#fff', marginTop: -18, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 }}>
        <Text style={{ textAlign: 'center', color: '#6b7280', marginVertical: 12 }}>Allow access to your screenshots to find dupes.</Text>
        <Pressable style={styles.primary} onPress={ask}>
          <Text style={styles.primaryText}>Pick Screenshots</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb' },
  primary: { backgroundColor: '#0f3b7a', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '600', fontSize: 16 }
});
