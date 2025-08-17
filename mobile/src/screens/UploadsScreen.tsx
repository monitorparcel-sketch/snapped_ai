import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { getUploads } from '../store/storage';

export default function UploadsScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Uploads'>) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => setItems(await getUploads()))();
  }, []);

  const render = ({ item }: { item: any }) => (
    <Pressable style={styles.card} onPress={() => item.searchId && navigation.navigate('Results', { searchId: item.searchId })}>
      <Image source={{ uri: item.uri }} style={styles.thumb} />
      <Text style={styles.meta}>{new Date(item.date).toDateString()}</Text>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}><Text style={{ fontSize: 18, fontWeight: '600' }}>My Uploads</Text></View>
      <FlatList data={items} contentContainerStyle={{ padding: 12 }} numColumns={2} columnWrapperStyle={{ gap: 12 }} keyExtractor={(_, i) => String(i)} renderItem={render} />
      {items.length > 0 ? (
        <Pressable style={styles.cta} onPress={() => navigation.navigate('Results', { searchId: items[0].searchId })}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>View Results</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: 60, padding: 16 },
  card: { width: '48%', backgroundColor: '#f8fafc', borderRadius: 12, padding: 6, marginBottom: 12 },
  thumb: { width: '100%', height: 140, borderRadius: 10 },
  meta: { marginTop: 6, color: '#6b7280' },
  cta: { position: 'absolute', bottom: 24, left: 16, right: 16, backgroundColor: '#0f3b7a', paddingVertical: 14, borderRadius: 12, alignItems: 'center' }
});
