import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Pressable, Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { getSearch, SearchResult } from '../services/api';

export default function ResultsScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Results'>) {
  const { searchId } = route.params;
  const [data, setData] = useState<SearchResult[]>([]);
  const [headerImage, setHeaderImage] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const res = await getSearch(searchId);
      setData(res.results);
      setHeaderImage(res.cloudinary_url || (res.image_path.startsWith('http') ? res.image_path : undefined));
    })();
  }, [searchId]);

  const renderItem = ({ item }: { item: SearchResult }) => (
    <Pressable style={styles.card} onPress={() => item.link && Linking.openURL(item.link!)}>
      {item.image_url ? <Image source={{ uri: item.image_url }} style={styles.thumb} /> : null}
      <Text numberOfLines={2} style={styles.title}>{item.title || 'Item'}</Text>
      {item.price ? <Text style={styles.price}>{item.price}</Text> : null}
      {item.brand ? <Text style={styles.brand}>{item.brand}</Text> : null}
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}><Text>{'<'} Back</Text></Pressable>
        <Text style={{ fontWeight: '600' }}>{data.length} Result</Text>
      </View>
      {headerImage ? <Image source={{ uri: headerImage }} style={styles.headerImage} /> : null}
      <FlatList
        contentContainerStyle={{ padding: 12 }}
        numColumns={2}
        data={data}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        columnWrapperStyle={{ gap: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: 60, paddingHorizontal: 12, paddingBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerImage: { width: '92%', height: 200, borderRadius: 16, alignSelf: 'center' },
  card: { width: '48%', backgroundColor: '#f8fafc', borderRadius: 12, padding: 8 },
  thumb: { width: '100%', height: 120, borderRadius: 8, marginBottom: 6 },
  title: { fontWeight: '600' },
  price: { color: '#111827', marginTop: 2 },
  brand: { color: '#6b7280' }
});
