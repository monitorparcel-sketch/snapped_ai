import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

type Props = {
  image: any;
  title: string;
  subtitle: string;
  buttonText: string;
  onNext: () => void;
};

export default function OnboardShell({ image, title, subtitle, buttonText, onNext }: Props) {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Pressable onPress={onNext} style={styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb' },
  image: { width: '100%', height: '55%' },
  card: { flex: 1, backgroundColor: '#fff', marginTop: -24, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 8 },
  subtitle: { color: '#5c6470', marginBottom: 24 },
  button: { backgroundColor: '#0f3b7a', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 }
});
