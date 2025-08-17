import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Onboarding1'), 1200);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <ImageBackground style={styles.container} source={require('../../assets/splash.png')} resizeMode="cover">
      <View style={styles.center}>
        <Text style={styles.title}>Snap{"\n"}Compare{"\n"}Save</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f3b7a' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 48
  }
});
