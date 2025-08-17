import React, { useState } from 'react';
import { View, Image, StyleSheet, Pressable, Text, Dimensions } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

export default function CropScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Crop'>) {
  const uri = route.params?.uri as string;
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const onDone = async () => {
    // Simple center square crop for MVP
    const { width, height } = Dimensions.get('window');
    const size = Math.min(width * 0.8, height * 0.5);
    const cropAction = { crop: { originX: 0, originY: 0, width: size, height: size } } as any;
    const res = await ImageManipulator.manipulateAsync(uri, [cropAction], { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG });
    navigation.replace('Loading', { searchId: 0, uploaded: { uri: res.uri } });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      <View style={styles.bottom}>
        <Pressable style={styles.primary} onPress={onDone}><Text style={styles.primaryText}>Done</Text></Pressable>
        <Pressable style={styles.secondary} onPress={() => navigation.goBack()}><Text style={styles.secondaryText}>Cancel</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  image: { width: '100%', height: '80%' },
  bottom: { padding: 16, backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  primary: { backgroundColor: '#0f3b7a', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  primaryText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  secondary: { backgroundColor: '#eef2f7', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  secondaryText: { color: '#333', fontWeight: '600', fontSize: 16 }
});
