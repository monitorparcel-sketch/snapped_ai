import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { uploadImage, searchProducts } from '../services/api';
import { saveUpload } from '../store/storage';

export default function LoadingScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Loading'>) {
  const [error, setError] = useState<string | null>(null);
  const { uploaded } = route.params;

  useEffect(() => {
    (async () => {
      try {
        const up = await uploadImage(uploaded.uri);
        const search = await searchProducts({ image_path: up.image_path, cloudinary_public_id: up.cloudinary_public_id, cloudinary_url: up.cloudinary_url, is_clipped: false });
        await saveUpload({ uri: uploaded.uri, serverPath: up.image_path, searchId: search.search_id });
        navigation.replace('Results', { searchId: search.search_id });
      } catch (e: any) {
        setError(e?.message || 'Failed');
      }
    })();
  }, [uploaded, navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={styles.text}>{error ? error : 'Finding matches...'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0008' },
  text: { color: '#fff', marginTop: 12 }
});
